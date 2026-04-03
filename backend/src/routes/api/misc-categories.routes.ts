/**
 * Misc Routes â€” طھطµظ†ظٹظپط§طھ ط§ظ„ظ…ط®ط§ط²ظ† ظˆظ‚ظٹظˆط¯ ط§ظ„ظٹظˆظ…ظٹط©
 * @module routes/api/misc-categories.routes
 * @since Phase 3
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { journalEntryCategories } from '../../db/schema/core.ts';
import { eq, and } from 'drizzle-orm';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';
import { getNextSequence } from '../../middleware/sequencing.ts';

export const miscCategoriesRoutes = new Hono();
const api = miscCategoriesRoutes;

// ملاحظة: تم حذف warehouse-types routes - نعتمد على account_sub_natures فقط

// ===================== تصنيفات قيود اليومية =====================
api.get('/businesses/:bizId/journal-entry-categories', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ طھطµظ†ظٹظپط§طھ ظ‚ظٹظˆط¯ ط§ظ„ظٹظˆظ…ظٹط©', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(journalEntryCategories).where(eq(journalEntryCategories.businessId, bizId)).orderBy(journalEntryCategories.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/journal-entry-categories', bizAuthMiddleware(), safeHandler('إضافة نوع قيد', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c) as { name?: string; categoryKey?: string; description?: string; icon?: string; color?: string };
  if (!body.name?.trim()) return c.json({ error: 'اسم النوع مطلوب' }, 400);
  if (!body.categoryKey?.trim()) return c.json({ error: 'مفتاح النوع مطلوب' }, 400);
  const seqNum = await getNextSequence(bizId, 'journal_category', 0, new Date().getFullYear());
  const [created] = await db.insert(journalEntryCategories).values({
    name: body.name.trim(),
    categoryKey: body.categoryKey.trim(),
    description: body.description || null,
    icon: body.icon || 'menu_book',
    color: body.color || '#6366f1',
    businessId: bizId,
    sequenceNumber: seqNum,
  }).returning();
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


