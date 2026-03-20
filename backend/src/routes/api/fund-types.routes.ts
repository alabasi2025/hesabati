/**
 * Fund Types Routes — مسارات أنواع الصناديق والبنوك والصرافين والمحافظ
 * @module routes/api/fund-types.routes
 * @since Phase 4
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { fundTypes, bankTypes, exchangeTypes, eWalletTypes } from '../../db/schema/core.ts';
import { eq, and } from 'drizzle-orm';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';

export const fundTypesRoutes = new Hono();
const api = fundTypesRoutes;

// ===================== أنواع الصناديق =====================
async function getNextUniqueFundTypeSequence(bizId: number): Promise<number> {
  const rows = await db
    .select({ sequenceNumber: fundTypes.sequenceNumber })
    .from(fundTypes)
    .where(eq(fundTypes.businessId, bizId));
  const maxSeq = rows.reduce((m, r) => {
    const seq = Number(r.sequenceNumber);
    if (!Number.isInteger(seq) || seq <= 0) return m;
    return Math.max(m, seq);
  }, 0);
  return maxSeq + 1;
}

api.get('/businesses/:bizId/fund-types', bizAuthMiddleware(), safeHandler('جلب أنواع الصناديق', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(fundTypes).where(eq(fundTypes.businessId, bizId)).orderBy(fundTypes.sequenceNumber, fundTypes.sortOrder, fundTypes.id);
  return c.json(rows);
}));

api.post('/businesses/:bizId/fund-types', bizAuthMiddleware(), safeHandler('إضافة نوع صندوق', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);

  const payload = validation.data as { subTypeKey: string };
  const [existingKey] = await db
    .select({ id: fundTypes.id })
    .from(fundTypes)
    .where(and(eq(fundTypes.businessId, bizId), eq(fundTypes.subTypeKey, payload.subTypeKey)));
  if (existingKey) return c.json({ error: 'مفتاح التصنيف موجود مسبقاً لهذا العمل' }, 400);

  const seqNum = await getNextUniqueFundTypeSequence(bizId);
  const [created] = await db.insert(fundTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/fund-types/:id', safeHandler('تعديل نوع صندوق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(fundTypes).where(eq(fundTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  if (typeof (body as any).sequenceNumber !== 'undefined') {
    const nextSeq = Number((body as any).sequenceNumber);
    if (!Number.isInteger(nextSeq) || nextSeq <= 0) {
      return c.json({ error: 'رقم التصنيف غير صالح' }, 400);
    }
    const [dupSeq] = await db
      .select({ id: fundTypes.id })
      .from(fundTypes)
      .where(and(eq(fundTypes.businessId, rec!.businessId), eq(fundTypes.sequenceNumber, nextSeq)));
    if (dupSeq && dupSeq.id !== id) {
      return c.json({ error: 'رقم التصنيف مستخدم مسبقاً داخل نفس العمل' }, 400);
    }
  }

  if (typeof (body as any).subTypeKey === 'string' && (body as any).subTypeKey.trim()) {
    const nextKey = (body as any).subTypeKey.trim();
    const [dupKey] = await db
      .select({ id: fundTypes.id })
      .from(fundTypes)
      .where(and(eq(fundTypes.businessId, rec!.businessId), eq(fundTypes.subTypeKey, nextKey)));
    if (dupKey && dupKey.id !== id) {
      return c.json({ error: 'مفتاح التصنيف مستخدم مسبقاً داخل نفس العمل' }, 400);
    }
  }

  const [updated] = await db.update(fundTypes).set({ ...body, updatedAt: new Date() }).where(eq(fundTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/fund-types/:id', safeHandler('حذف نوع صندوق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(fundTypes).where(eq(fundTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(fundTypes).where(eq(fundTypes.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع البنوك =====================
api.get('/businesses/:bizId/bank-types', bizAuthMiddleware(), safeHandler('جلب أنواع البنوك', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(bankTypes).where(eq(bankTypes.businessId, bizId)).orderBy(bankTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/bank-types', bizAuthMiddleware(), safeHandler('إضافة نوع بنك', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'bank');
  const [created] = await db.insert(bankTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/bank-types/:id', safeHandler('تعديل نوع بنك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(bankTypes).where(eq(bankTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(bankTypes).set({ ...body, updatedAt: new Date() }).where(eq(bankTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/bank-types/:id', safeHandler('حذف نوع بنك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(bankTypes).where(eq(bankTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(bankTypes).where(eq(bankTypes.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع الصرافين =====================
api.get('/businesses/:bizId/exchange-types', bizAuthMiddleware(), safeHandler('جلب أنواع الصرافين', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(exchangeTypes).where(eq(exchangeTypes.businessId, bizId)).orderBy(exchangeTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/exchange-types', bizAuthMiddleware(), safeHandler('إضافة نوع صراف', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'exchange');
  const [created] = await db.insert(exchangeTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/exchange-types/:id', safeHandler('تعديل نوع صراف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(exchangeTypes).where(eq(exchangeTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(exchangeTypes).set({ ...body, updatedAt: new Date() }).where(eq(exchangeTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/exchange-types/:id', safeHandler('حذف نوع صراف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(exchangeTypes).where(eq(exchangeTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(exchangeTypes).where(eq(exchangeTypes.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع المحافظ الإلكترونية =====================
api.get('/businesses/:bizId/e-wallet-types', bizAuthMiddleware(), safeHandler('جلب أنواع المحافظ', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(eWalletTypes).where(eq(eWalletTypes.businessId, bizId)).orderBy(eWalletTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/e-wallet-types', bizAuthMiddleware(), safeHandler('إضافة نوع محفظة', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'e_wallet');
  const [created] = await db.insert(eWalletTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/e-wallet-types/:id', safeHandler('تعديل نوع محفظة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(eWalletTypes).where(eq(eWalletTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(eWalletTypes).set({ ...body, updatedAt: new Date() }).where(eq(eWalletTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/e-wallet-types/:id', safeHandler('حذف نوع محفظة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(eWalletTypes).where(eq(eWalletTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(eWalletTypes).where(eq(eWalletTypes.id, id));
  return c.json({ success: true });
}));

