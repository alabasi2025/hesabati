/**
 * مسارات إعدادات أنظمة الفوترة وأنواع حسابات الفوترة
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq } from 'drizzle-orm';
import { billingSystemsConfig, billingAccountTypes } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { billingSystemConfigSchema, validateBody } from '../../middleware/validation.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';

const billingConfigRoutes = new Hono();

// ===================== إعدادات أنظمة الفوترة =====================
billingConfigRoutes.get('/businesses/:bizId/billing-systems-config', bizAuthMiddleware(), safeHandler('جلب إعدادات أنظمة الفوترة', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(billingSystemsConfig)
    .where(eq(billingSystemsConfig.businessId, bizId))
    .orderBy(billingSystemsConfig.sortOrder);
  return c.json(rows);
}));

billingConfigRoutes.post('/businesses/:bizId/billing-systems-config', bizAuthMiddleware(), safeHandler('إضافة إعداد نظام فوترة', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(billingSystemConfigSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(billingSystemsConfig).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

billingConfigRoutes.put('/billing-systems-config/:id', safeHandler('تعديل إعداد نظام فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الإعداد غير صالح' }, 400);
  const [rec] = await db.select().from(billingSystemsConfig).where(eq(billingSystemsConfig.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(billingSystemsConfig).set({ ...body, updatedAt: new Date() }).where(eq(billingSystemsConfig.id, id)).returning();
  if (!updated) return c.json({ error: 'إعداد غير موجود' }, 404);
  return c.json(updated);
}));

billingConfigRoutes.delete('/billing-systems-config/:id', safeHandler('حذف إعداد نظام فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الإعداد غير صالح' }, 400);
  const [rec] = await db.select().from(billingSystemsConfig).where(eq(billingSystemsConfig.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(billingSystemsConfig).where(eq(billingSystemsConfig.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع حسابات الفوترة =====================
billingConfigRoutes.get('/businesses/:bizId/billing-account-types', bizAuthMiddleware(), safeHandler('جلب أنواع حسابات الفوترة', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(billingAccountTypes).where(eq(billingAccountTypes.businessId, bizId)).orderBy(billingAccountTypes.sortOrder);
  return c.json(rows);
}));

billingConfigRoutes.post('/businesses/:bizId/billing-account-types', bizAuthMiddleware(), safeHandler('إضافة نوع حساب فوترة', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json()) as { name?: string; [k: string]: unknown };
  if (!body.name) return c.json({ error: 'اسم النوع مطلوب' }, 400);
  const [created] = await db.insert(billingAccountTypes).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
}));

billingConfigRoutes.put('/billing-account-types/:id', safeHandler('تعديل نوع حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(billingAccountTypes).where(eq(billingAccountTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(billingAccountTypes).set(body).where(eq(billingAccountTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

billingConfigRoutes.delete('/billing-account-types/:id', safeHandler('حذف نوع حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(billingAccountTypes).where(eq(billingAccountTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(billingAccountTypes).where(eq(billingAccountTypes.id, id));
  return c.json({ success: true });
}));

export default billingConfigRoutes;
