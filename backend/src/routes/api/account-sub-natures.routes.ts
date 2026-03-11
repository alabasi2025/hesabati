import { Hono } from 'hono';
import { and, asc, eq } from 'drizzle-orm';
import { db } from '../../db/index.ts';
import { accountSubNatures } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getNextSequence } from '../../middleware/sequencing.ts';
import { getBody, parseId, safeHandler } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';
import type { AppContext } from './_shared/types.ts';

const routes = new Hono();

routes.get('/businesses/:bizId/account-sub-natures', bizAuthMiddleware(), safeHandler('جلب أنواع الحسابات الفرعية', async (c: AppContext) => {
  const bizId = getBizId(c);
  const rows = await db
    .select()
    .from(accountSubNatures)
    .where(eq(accountSubNatures.businessId, bizId))
    .orderBy(asc(accountSubNatures.sequenceNumber), asc(accountSubNatures.name));
  return c.json(rows);
}));

routes.post('/businesses/:bizId/account-sub-natures', bizAuthMiddleware(), checkPermission('accounts', 'create'), safeHandler('إضافة نوع حساب فرعي', async (c: AppContext) => {
  const bizId = getBizId(c);
  const body = ((await getBody(c)) || {}) as Record<string, unknown>;
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const natureKey = typeof body.natureKey === 'string' ? body.natureKey.trim() : '';
  if (!name) return c.json({ error: 'اسم النوع مطلوب' }, 400);
  if (!natureKey) return c.json({ error: 'مفتاح النوع مطلوب' }, 400);

  const [existing] = await db
    .select({ id: accountSubNatures.id })
    .from(accountSubNatures)
    .where(and(eq(accountSubNatures.businessId, bizId), eq(accountSubNatures.natureKey, natureKey)))
    .limit(1);
  if (existing) return c.json({ error: 'مفتاح النوع موجود مسبقاً' }, 400);

  const sequenceNumber = await getNextSequence(bizId, 'account_sub_nature', 0, 0);
  const [created] = await db
    .insert(accountSubNatures)
    .values({
      businessId: bizId,
      name,
      natureKey,
      isSystem: false,
      icon: typeof body.icon === 'string' ? body.icon : 'category',
      color: typeof body.color === 'string' ? body.color : '#64748b',
      sequenceNumber,
      requiresStation: body.requiresStation === true,
      requiresEmployee: body.requiresEmployee === true,
      requiresProvider: body.requiresProvider === true,
      requiresAccountNumber: body.requiresAccountNumber === true,
      requiresSupplierType: body.requiresSupplierType === true,
      supportsCashOperations: body.supportsCashOperations !== false,
      canReceivePayment: body.canReceivePayment !== false,
      canMakePayment: body.canMakePayment !== false,
      isActive: body.isActive !== false,
    })
    .returning();
  return c.json(created, 201);
}));

routes.put('/businesses/:bizId/account-sub-natures/:id', bizAuthMiddleware(), checkPermission('accounts', 'update'), safeHandler('تعديل نوع حساب فرعي', async (c: AppContext) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرف النوع غير صالح' }, 400);
  const [existing] = await db.select().from(accountSubNatures).where(and(eq(accountSubNatures.id, id), eq(accountSubNatures.businessId, bizId))).limit(1);
  if (!existing) return c.json({ error: 'النوع غير موجود' }, 404);

  const body = ((await getBody(c)) || {}) as Record<string, unknown>;
  if (existing.isSystem && body.natureKey && body.natureKey !== existing.natureKey) {
    return c.json({ error: 'لا يمكن تعديل المفتاح للأنواع النظامية' }, 400);
  }
  const payload: Record<string, unknown> = { updatedAt: new Date() };
  if (typeof body.name === 'string') payload.name = body.name.trim();
  if (typeof body.natureKey === 'string' && !existing.isSystem) payload.natureKey = body.natureKey.trim();
  if (typeof body.icon === 'string') payload.icon = body.icon;
  if (typeof body.color === 'string') payload.color = body.color;
  if (body.requiresStation !== undefined) payload.requiresStation = body.requiresStation === true;
  if (body.requiresEmployee !== undefined) payload.requiresEmployee = body.requiresEmployee === true;
  if (body.requiresProvider !== undefined) payload.requiresProvider = body.requiresProvider === true;
  if (body.requiresAccountNumber !== undefined) payload.requiresAccountNumber = body.requiresAccountNumber === true;
  if (body.requiresSupplierType !== undefined) payload.requiresSupplierType = body.requiresSupplierType === true;
  if (body.supportsCashOperations !== undefined) payload.supportsCashOperations = body.supportsCashOperations === true;
  if (body.canReceivePayment !== undefined) payload.canReceivePayment = body.canReceivePayment === true;
  if (body.canMakePayment !== undefined) payload.canMakePayment = body.canMakePayment === true;
  if (body.isActive !== undefined) payload.isActive = body.isActive === true;

  const [updated] = await db.update(accountSubNatures).set(payload).where(eq(accountSubNatures.id, id)).returning();
  return c.json(updated);
}));

routes.delete('/businesses/:bizId/account-sub-natures/:id', bizAuthMiddleware(), checkPermission('accounts', 'delete'), safeHandler('حذف نوع حساب فرعي', async (c: AppContext) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرف النوع غير صالح' }, 400);
  const [existing] = await db.select().from(accountSubNatures).where(and(eq(accountSubNatures.id, id), eq(accountSubNatures.businessId, bizId))).limit(1);
  if (!existing) return c.json({ error: 'النوع غير موجود' }, 404);
  if (existing.isSystem) return c.json({ error: 'لا يمكن حذف النوع النظامي' }, 400);
  await db.delete(accountSubNatures).where(eq(accountSubNatures.id, id));
  return c.json({ success: true });
}));

export default routes;
