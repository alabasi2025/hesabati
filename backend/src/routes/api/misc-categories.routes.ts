/**
 * Misc Routes — تصنيفات المخازن وقيود اليومية
 * @module routes/api/misc-categories.routes
 * @since Phase 3
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { warehouseTypes, journalEntryCategories } from '../../db/schema/core.ts';
import { eq, and } from 'drizzle-orm';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';

export const miscCategoriesRoutes = new Hono();
const api = miscCategoriesRoutes;

// ===================== تصنيفات المخازن =====================
api.get('/businesses/:bizId/warehouse-types', bizAuthMiddleware(), safeHandler('جلب تصنيفات المخازن', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(warehouseTypes).where(eq(warehouseTypes.businessId, bizId)).orderBy(warehouseTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/warehouse-types', bizAuthMiddleware(), safeHandler('إضافة تصنيف مخزن', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'warehouse');
  const [created] = await db.insert(warehouseTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/warehouse-types/:id', safeHandler('تعديل تصنيف مخزن', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصنيف غير صالح' }, 400);
  const [rec] = await db.select().from(warehouseTypes).where(eq(warehouseTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(warehouseTypes).set({ ...body, updatedAt: new Date() }).where(eq(warehouseTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'التصنيف غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/warehouse-types/:id', safeHandler('حذف تصنيف مخزن', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصنيف غير صالح' }, 400);
  const [rec] = await db.select().from(warehouseTypes).where(eq(warehouseTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(warehouseTypes).where(eq(warehouseTypes.id, id));
  return c.json({ success: true });
}));

// ===================== تصنيفات قيود اليومية =====================
api.get('/businesses/:bizId/journal-entry-categories', bizAuthMiddleware(), safeHandler('جلب تصنيفات قيود اليومية', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(journalEntryCategories).where(eq(journalEntryCategories.businessId, bizId)).orderBy(journalEntryCategories.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/journal-entry-categories', bizAuthMiddleware(), safeHandler('إضافة تصنيف قيد يومية', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(journalCategorySchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'journal');
  const [created] = await db.insert(journalEntryCategories).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/journal-entry-categories/:id', safeHandler('تعديل تصنيف قيد يومية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصنيف غير صالح' }, 400);
  const [rec] = await db.select().from(journalEntryCategories).where(eq(journalEntryCategories.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(journalEntryCategories).set({ ...body, updatedAt: new Date() }).where(eq(journalEntryCategories.id, id)).returning();
  if (!updated) return c.json({ error: 'التصنيف غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/journal-entry-categories/:id', safeHandler('حذف تصنيف قيد يومية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصنيف غير صالح' }, 400);
  const [rec] = await db.select().from(journalEntryCategories).where(eq(journalEntryCategories.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(journalEntryCategories).where(eq(journalEntryCategories.id, id));
  return c.json({ success: true });
}));

export default api;

