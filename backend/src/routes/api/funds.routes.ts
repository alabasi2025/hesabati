import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, inArray } from 'drizzle-orm';
import { funds, fundBalances, stations, currencies } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { fundSchema, validateBody } from '../../middleware/validation.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getNextItemInCategorySequence, TYPE_PREFIXES, generateItemCode, getNextSequence } from '../../middleware/sequencing.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getBizId } from './_shared/context-helpers.ts';
import type { AppContext } from './_shared/types.ts';

const fundsRoutes = new Hono();

fundsRoutes.get('/businesses/:bizId/funds', bizAuthMiddleware(), safeHandler('جلب الصناديق', async (c: AppContext) => {
  const bizId = getBizId(c);
  const rows = await db
    .select({
      id: funds.id,
      name: funds.name,
      fundType: funds.fundType,
      stationId: funds.stationId,
      responsiblePerson: funds.responsiblePerson,
      description: funds.description,
      isActive: funds.isActive,
      notes: funds.notes,
      createdAt: funds.createdAt,
      stationName: stations.name,
    })
    .from(funds)
    .leftJoin(stations, eq(funds.stationId, stations.id))
    .where(eq(funds.businessId, bizId))
    .orderBy(funds.fundType, funds.name);

  const fundIds = rows.map((f) => f.id);
  let balancesArr: { fundId: number; currencyId: number; balance: string; currencyCode: string | null; currencySymbol: string | null }[] = [];
  if (fundIds.length > 0) {
    balancesArr = await db
      .select({
        fundId: fundBalances.fundId,
        currencyId: fundBalances.currencyId,
        balance: fundBalances.balance,
        currencyCode: currencies.code,
        currencySymbol: currencies.symbol,
      })
      .from(fundBalances)
      .leftJoin(currencies, eq(fundBalances.currencyId, currencies.id))
      .where(inArray(fundBalances.fundId, fundIds));
  }
  const balanceMap: Record<number, typeof balancesArr> = {};
  for (const b of balancesArr) {
    if (!balanceMap[b.fundId]) balanceMap[b.fundId] = [];
    balanceMap[b.fundId].push(b);
  }
  return c.json(rows.map((f) => ({ ...f, balances: balanceMap[f.id] || [] })));
}));

fundsRoutes.post('/businesses/:bizId/funds', bizAuthMiddleware(), checkPermission('funds', 'create'), safeHandler('إضافة صندوق', async (c: AppContext) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
  const validation = validateBody(fundSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const insertPayload: Record<string, unknown> = { ...validation.data, businessId: bizId };
  const subTypeRaw = body.subType ?? body.subTypeId;
  if (subTypeRaw != null) {
    const subTypeId = Number.parseInt(String(subTypeRaw), 10);
    if (!Number.isNaN(subTypeId)) {
      insertPayload.subTypeId = subTypeId;
      const { sequenceNumber, code } = await getNextItemInCategorySequence(bizId, 'fund', subTypeId);
      insertPayload.sequenceNumber = sequenceNumber;
      insertPayload.code = code;
    }
  }
  const [created] = await db.insert(funds).values(insertPayload as typeof funds.$inferInsert).returning();
  return c.json(created, 201);
}));

fundsRoutes.put('/businesses/:bizId/funds/:id', bizAuthMiddleware(), safeHandler('تعديل صندوق', async (c: AppContext) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصندوق غير صالح' }, 400);
  const [existing] = await db.select().from(funds).where(and(eq(funds.id, id), eq(funds.businessId, bizId)));
  if (!existing) return c.json({ error: 'صندوق غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(funds).set({ ...body, updatedAt: new Date() }).where(eq(funds.id, id)).returning();
  return c.json(updated);
}));

fundsRoutes.delete('/businesses/:bizId/funds/:id', bizAuthMiddleware(), checkPermission('funds', 'delete'), safeHandler('حذف صندوق', async (c: AppContext) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصندوق غير صالح' }, 400);
  const [existing] = await db.select().from(funds).where(and(eq(funds.id, id), eq(funds.businessId, bizId)));
  if (!existing) return c.json({ error: 'صندوق غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(funds).where(eq(funds.id, id));
  return c.json({ success: true });
}));

fundsRoutes.put('/funds/:id', safeHandler('تعديل صندوق (legacy)', async (c: AppContext) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصندوق غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(funds).set({ ...body, updatedAt: new Date() }).where(eq(funds.id, id)).returning();
  if (!updated) return c.json({ error: 'صندوق غير موجود' }, 404);
  return c.json(updated);
}));

export default fundsRoutes;
