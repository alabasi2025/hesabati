/**
 * Misc Routes â€” طھطµظ†ظٹظپط§طھ ط§ظ„ظ…ط®ط§ط²ظ† ظˆظ‚ظٹظˆط¯ ط§ظ„ظٹظˆظ…ظٹط©
 * @module routes/api/misc-categories.routes
 * @since Phase 3
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { warehouseTypes, journalEntryCategories } from '../../db/schema/core.ts';
import { eq, and } from 'drizzle-orm';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';

export const miscCategoriesRoutes = new Hono();
const api = miscCategoriesRoutes;

// ===================== طھطµظ†ظٹظپط§طھ ط§ظ„ظ…ط®ط§ط²ظ† =====================
api.get('/businesses/:bizId/warehouse-types', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ طھطµظ†ظٹظپط§طھ ط§ظ„ظ…ط®ط§ط²ظ†', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(warehouseTypes).where(eq(warehouseTypes.businessId, bizId)).orderBy(warehouseTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/warehouse-types', bizAuthMiddleware(), safeHandler('ط¥ط¶ط§ظپط© طھطµظ†ظٹظپ ظ…ط®ط²ظ†', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'warehouse');
  const [created] = await db.insert(warehouseTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/warehouse-types/:id', safeHandler('طھط¹ط¯ظٹظ„ طھطµظ†ظٹظپ ظ…ط®ط²ظ†', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„طھطµظ†ظٹظپ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [rec] = await db.select().from(warehouseTypes).where(eq(warehouseTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(warehouseTypes).set({ ...body, updatedAt: new Date() }).where(eq(warehouseTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'ط§ظ„طھطµظ†ظٹظپ ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  return c.json(updated);
}));

api.delete('/warehouse-types/:id', safeHandler('ط­ط°ظپ طھطµظ†ظٹظپ ظ…ط®ط²ظ†', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„طھطµظ†ظٹظپ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [rec] = await db.select().from(warehouseTypes).where(eq(warehouseTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(warehouseTypes).where(eq(warehouseTypes.id, id));
  return c.json({ success: true });
}));

// ===================== طھطµظ†ظٹظپط§طھ ظ‚ظٹظˆط¯ ط§ظ„ظٹظˆظ…ظٹط© =====================
api.get('/businesses/:bizId/journal-entry-categories', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ طھطµظ†ظٹظپط§طھ ظ‚ظٹظˆط¯ ط§ظ„ظٹظˆظ…ظٹط©', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(journalEntryCategories).where(eq(journalEntryCategories.businessId, bizId)).orderBy(journalEntryCategories.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/journal-entry-categories', bizAuthMiddleware(), safeHandler('ط¥ط¶ط§ظپط© طھطµظ†ظٹظپ ظ‚ظٹط¯ ظٹظˆظ…ظٹط©', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(journalCategorySchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'journal');
  const [created] = await db.insert(journalEntryCategories).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/journal-entry-categories/:id', safeHandler('طھط¹ط¯ظٹظ„ طھطµظ†ظٹظپ ظ‚ظٹط¯ ظٹظˆظ…ظٹط©', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„طھطµظ†ظٹظپ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [rec] = await db.select().from(journalEntryCategories).where(eq(journalEntryCategories.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(journalEntryCategories).set({ ...body, updatedAt: new Date() }).where(eq(journalEntryCategories.id, id)).returning();
  if (!updated) return c.json({ error: 'ط§ظ„طھطµظ†ظٹظپ ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  return c.json(updated);
}));

api.delete('/journal-entry-categories/:id', safeHandler('ط­ط°ظپ طھطµظ†ظٹظپ ظ‚ظٹط¯ ظٹظˆظ…ظٹط©', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„طھطµظ†ظٹظپ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [rec] = await db.select().from(journalEntryCategories).where(eq(journalEntryCategories.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(journalEntryCategories).where(eq(journalEntryCategories.id, id));
  return c.json({ success: true });
}));

export default api;


