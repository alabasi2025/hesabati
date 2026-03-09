import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, sql } from 'drizzle-orm';
import { businesses, businessPartners } from '../../db/schema/index.ts';
import { safeHandler, parseId } from '../../middleware/helpers.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { normalizeDbResult } from './_shared/db-helpers.ts';
import type { AppContext } from './_shared/types.ts';

const businessesRoutes = new Hono();

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

businessesRoutes.get('/businesses/:bizId', bizAuthMiddleware(), safeHandler('جلب تفاصيل عمل', async (c: AppContext) => {
  const id = parseId(c.req.param('bizId'));
  if (!id) return c.json({ error: 'معرّف العمل غير صالح' }, 400);
  const [biz] = await db.select().from(businesses).where(eq(businesses.id, id));
  if (!biz) return c.json({ error: 'عمل غير موجود' }, 404);
  const partners = await db.select().from(businessPartners).where(eq(businessPartners.businessId, id));
  return c.json({ ...biz, partners });
}));

export default businessesRoutes;
