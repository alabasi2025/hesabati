import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, sql } from 'drizzle-orm';
import { businesses, businessPartners } from '../../db/schema/index.ts';
import { safeHandler, parseId } from '../../middleware/helpers.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { normalizeDbResult } from './_shared/db-helpers.ts';
import { getFirstRow } from '../../utils/db-result.ts';
import type { AppContext } from './_shared/types.ts';
import { generateItemCode } from '../../middleware/sequencing.ts';

const businessesRoutes = new Hono();

/**
 * البحث عن أول رقم biz-XX فارغ (ملء الفجوات)
 * مثال: لو موجود biz-01, biz-02, biz-05 → يرجع 3
 */
async function findNextAvailableBusinessNumber(): Promise<number> {
  const row = getFirstRow<{ next_num: string }>(
    await db.execute(sql`
      SELECT COALESCE(
        (SELECT s.n FROM generate_series(1, 999) AS s(n)
         WHERE NOT EXISTS (
           SELECT 1 FROM businesses
           WHERE code = 'biz-' || LPAD(s.n::text, 2, '0')
         )
         ORDER BY s.n LIMIT 1),
        1
      )::text AS next_num
    `)
  );
  return Number(row?.next_num ?? 1);
}

interface StatsRow {
  business_id: number;
  station_count: string;
  employee_count: string;
  account_count: string;
  fund_count: string;
  supplier_count: string;
  pending_count: string;
}

interface BusinessStats {
  stations: number;
  employees: number;
  accounts: number;
  funds: number;
  suppliers: number;
  pendingAccounts: number;
}

businessesRoutes.get('/businesses', safeHandler('جلب قائمة الأعمال', async (c: AppContext) => {
  const rows = await db.select().from(businesses).orderBy(businesses.sortOrder);

  const statsQuery = await db.execute(sql`
    SELECT
      b.id as business_id,
      (SELECT COUNT(*) FROM stations s WHERE s.business_id = b.id) as station_count,
      (SELECT COUNT(*) FROM employees e WHERE e.business_id = b.id) as employee_count,
      (SELECT COUNT(*) FROM accounts a WHERE a.business_id = b.id) as account_count,
      (SELECT COUNT(*) FROM funds f WHERE f.business_id = b.id) as fund_count,
      (SELECT COUNT(*) FROM suppliers sp WHERE sp.business_id = b.id) as supplier_count,
      (SELECT COUNT(*) FROM pending_accounts pa WHERE pa.business_id = b.id) as pending_count
    FROM businesses b
    ORDER BY b.sort_order
  `);

  const statsRows = normalizeDbResult<StatsRow>(statsQuery);
  const statsMap: Record<number, BusinessStats> = {};
  for (const row of statsRows) {
    statsMap[row.business_id] = {
      stations: Number(row.station_count),
      employees: Number(row.employee_count),
      accounts: Number(row.account_count),
      funds: Number(row.fund_count),
      suppliers: Number(row.supplier_count),
      pendingAccounts: Number(row.pending_count),
    };
  }

  let allPartnersDetailed: Array<{
    businessId: number;
    [key: string]: unknown;
  }> = [];
  try {
    allPartnersDetailed = await db.select().from(businessPartners);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    // Backward-compatibility: some old DBs miss business_partners.sequence_number.
    if (!message.includes('column "sequence_number" does not exist')) {
      throw error;
    }
  }
  const partnerDetailMap: Record<number, typeof allPartnersDetailed> = {};
  for (const p of allPartnersDetailed) {
    if (!partnerDetailMap[p.businessId]) partnerDetailMap[p.businessId] = [];
    partnerDetailMap[p.businessId].push(p);
  }

  const defaultStats: BusinessStats = { stations: 0, employees: 0, accounts: 0, funds: 0, suppliers: 0, pendingAccounts: 0 };
  return c.json(
    rows.map((biz: { id: number }) => ({
      ...biz,
      partners: partnerDetailMap[biz.id] ?? [],
      stats: statsMap[biz.id] ?? defaultStats,
    }))
  );
}));

businessesRoutes.get('/businesses/next-code', safeHandler('جلب الرقم التالي', async (c: AppContext) => {
  const next = await findNextAvailableBusinessNumber();
  const code = generateItemCode('biz', next);
  return c.json({ next, code });
}));

businessesRoutes.get('/businesses/:bizId', bizAuthMiddleware(), safeHandler('جلب تفاصيل عمل', async (c: AppContext) => {
  const id = parseId(c.req.param('bizId'));
  if (!id) return c.json({ error: 'معرّف العمل غير صالح' }, 400);
  const [biz] = await db.select().from(businesses).where(eq(businesses.id, id));
  if (!biz) return c.json({ error: 'عمل غير موجود' }, 404);
  const partners = await db.select().from(businessPartners).where(eq(businessPartners.businessId, id));
  return c.json({ ...biz, partners });
}));

businessesRoutes.post('/businesses', safeHandler('إنشاء عمل جديد', async (c: AppContext) => {
  const body = await c.req.json().catch(() => ({}));
  const name = String(body.name || '').trim();
  if (!name) return c.json({ error: 'اسم العمل مطلوب' }, 400);

  const seqNum = await findNextAvailableBusinessNumber();
  const code = generateItemCode('biz', seqNum);

  const allBiz = await db.select({ sortOrder: businesses.sortOrder }).from(businesses).orderBy(businesses.sortOrder);
  const maxSort = allBiz.length > 0 ? Math.max(...allBiz.map((b) => b.sortOrder ?? 0)) : -1;

  const [created] = await db.insert(businesses).values({
    name,
    code,
    type: String(body.type || 'stations'),
    description: body.description ? String(body.description) : null,
    icon: String(body.icon || 'business'),
    color: String(body.color || '#3b82f6'),
    sortOrder: maxSort + 1,
    isActive: true,
  }).returning();

  return c.json({ ...created, partners: [], stats: { stations: 0, employees: 0, accounts: 0, funds: 0, suppliers: 0, pendingAccounts: 0 } }, 201);
}));

businessesRoutes.put('/businesses/:bizId', bizAuthMiddleware(), safeHandler('تعديل عمل', async (c: AppContext) => {
  const id = parseId(c.req.param('bizId'));
  if (!id) return c.json({ error: 'معرّف العمل غير صالح' }, 400);
  const body = await c.req.json().catch(() => ({}));
  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (body.name !== undefined) updates.name = String(body.name).trim();
  if (body.description !== undefined) updates.description = body.description ? String(body.description) : null;
  if (body.icon !== undefined) updates.icon = String(body.icon);
  if (body.color !== undefined) updates.color = String(body.color);
  if (body.type !== undefined) updates.type = String(body.type);
  if (body.notes !== undefined) updates.notes = body.notes ? String(body.notes) : null;
  const [updated] = await db.update(businesses).set(updates).where(eq(businesses.id, id)).returning();
  if (!updated) return c.json({ error: 'عمل غير موجود' }, 404);
  return c.json(updated);
}));

businessesRoutes.delete('/businesses/:bizId', bizAuthMiddleware(), safeHandler('حذف عمل', async (c: AppContext) => {
  const id = parseId(c.req.param('bizId'));
  if (!id) return c.json({ error: 'معرّف العمل غير صالح' }, 400);

  const [biz] = await db.select({ id: businesses.id, name: businesses.name }).from(businesses).where(eq(businesses.id, id));
  if (!biz) return c.json({ error: 'عمل غير موجود' }, 404);

  const check = await db.execute(sql`
    SELECT
      (SELECT COUNT(*) FROM stations       WHERE business_id = ${id}) AS stations,
      (SELECT COUNT(*) FROM employees      WHERE business_id = ${id}) AS employees,
      (SELECT COUNT(*) FROM accounts       WHERE business_id = ${id}) AS accounts,
      (SELECT COUNT(*) FROM vouchers       WHERE business_id = ${id}) AS vouchers,
      (SELECT COUNT(*) FROM purchase_invoices WHERE business_id = ${id}) AS invoices,
      (SELECT COUNT(*) FROM business_partners WHERE business_id = ${id}) AS partners
  `);
  const row = getFirstRow<Record<string, string | number>>(check) ?? {};
  const totals = Object.values(row).map(Number);
  const hasData = totals.some(v => v > 0);
  if (hasData) {
    const details = Object.entries(row)
      .filter(([, v]) => Number(v) > 0)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ');
    return c.json({ error: `لا يمكن حذف العمل لأنه يحتوي على بيانات (${details})` }, 409);
  }

  await db.delete(businesses).where(eq(businesses.id, id));
  return c.json({ success: true, message: `تم حذف العمل "${biz.name}" بنجاح` });
}));

export default businessesRoutes;
