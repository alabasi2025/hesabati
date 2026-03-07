/**
 * مسارات الشركاء والموردين
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq } from 'drizzle-orm';
import { businessPartners, suppliers } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { partnerSchema, supplierSchema, validateBody } from '../../middleware/validation.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';

const partnersRoutes = new Hono();

// ===================== الشركاء =====================
partnersRoutes.get('/businesses/:bizId/partners', bizAuthMiddleware(), safeHandler('جلب الشركاء', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(businessPartners).where(eq(businessPartners.businessId, bizId));
  return c.json(rows);
}));

partnersRoutes.post('/businesses/:bizId/partners', bizAuthMiddleware(), safeHandler('إضافة شريك', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(partnerSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(businessPartners).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

partnersRoutes.put('/partners/:id', safeHandler('تعديل شريك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشريك غير صالح' }, 400);
  const [partner] = await db.select().from(businessPartners).where(eq(businessPartners.id, id));
  const err = await requireResourceOwnership(c, partner ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(businessPartners).set({ ...body, updatedAt: new Date() }).where(eq(businessPartners.id, id)).returning();
  if (!updated) return c.json({ error: 'شريك غير موجود' }, 404);
  return c.json(updated);
}));

partnersRoutes.delete('/partners/:id', safeHandler('حذف شريك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشريك غير صالح' }, 400);
  const [partner] = await db.select().from(businessPartners).where(eq(businessPartners.id, id));
  const err = await requireResourceOwnership(c, partner ?? null);
  if (err) return err;
  await db.delete(businessPartners).where(eq(businessPartners.id, id));
  return c.json({ success: true });
}));

// ===================== الموردين =====================
partnersRoutes.get('/businesses/:bizId/suppliers', bizAuthMiddleware(), safeHandler('جلب الموردين', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(suppliers).where(eq(suppliers.businessId, bizId)).orderBy(suppliers.id);
  return c.json(rows);
}));

partnersRoutes.post('/businesses/:bizId/suppliers', bizAuthMiddleware(), safeHandler('إضافة مورد', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(supplierSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(suppliers).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

partnersRoutes.put('/suppliers/:id', safeHandler('تعديل مورد', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المورد غير صالح' }, 400);
  const [supplier] = await db.select().from(suppliers).where(eq(suppliers.id, id));
  const err = await requireResourceOwnership(c, supplier ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(suppliers).set({ ...body, updatedAt: new Date() }).where(eq(suppliers.id, id)).returning();
  if (!updated) return c.json({ error: 'مورد غير موجود' }, 404);
  return c.json(updated);
}));

partnersRoutes.delete('/suppliers/:id', safeHandler('حذف مورد', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المورد غير صالح' }, 400);
  const [supplier] = await db.select().from(suppliers).where(eq(suppliers.id, id));
  const err = await requireResourceOwnership(c, supplier ?? null);
  if (err) return err;
  await db.delete(suppliers).where(eq(suppliers.id, id));
  return c.json({ success: true });
}));

// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/suppliers بدلاً من هذا المسار
partnersRoutes.get('/suppliers', safeHandler('جلب الموردين (legacy)', async (c) => {
  const rows = await db.select().from(suppliers).orderBy(suppliers.id);
  return c.json(rows);
}));

export default partnersRoutes;
