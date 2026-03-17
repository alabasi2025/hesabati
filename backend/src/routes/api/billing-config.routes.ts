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
import { auditCreate, auditUpdate, auditDelete, makeAuditCtx } from '../../engines/audit-middleware.engine.ts';

const billingConfigRoutes = new Hono();

function toSystemKey(name: string): string {
  const compact = name.trim().toLowerCase().split(/\s+/).join('_');
  return compact.split('').filter((ch) => /[a-z0-9_]/.test(ch)).join('');
}

// ===================== إعدادات أنظمة الفوترة =====================
billingConfigRoutes.get('/businesses/:bizId/billing-systems-config', bizAuthMiddleware(), safeHandler('جلب إعدادات أنظمة الفوترة', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(billingSystemsConfig)
    .where(eq(billingSystemsConfig.businessId, bizId))
    .orderBy(billingSystemsConfig.sortOrder);
  const types = await db.select({
    id: billingAccountTypes.id,
    name: billingAccountTypes.name,
  }).from(billingAccountTypes).where(eq(billingAccountTypes.businessId, bizId));
  const typeNameById = new Map(types.map((t) => [t.id, t.name]));
  return c.json(rows.map((row) => ({
    ...row,
    // ضمان التوافق مع البيانات القديمة التي قد تحتوي systemKey = null
    systemKey: (typeof row.systemKey === 'string' && row.systemKey.trim().length > 0)
      ? row.systemKey
      : toSystemKey(`${row.name || 'billing'}_${row.id}`),
    stationScope: row.stationMode,
    supportedTypes: (row.supportedMethodIds || [])
      .map((id) => typeNameById.get(id))
      .filter((name): name is string => Boolean(name)),
  })));
}));

billingConfigRoutes.post('/businesses/:bizId/billing-systems-config', bizAuthMiddleware(), safeHandler('إضافة إعداد نظام فوترة', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(billingSystemConfigSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const data = validation.data as Record<string, unknown> & {
    stationScope?: string;
    stationMode?: string;
    supportedTypes?: string[];
    supportedMethodIds?: number[];
    name: string;
    systemKey?: string;
  };
  const types = await db.select({
    id: billingAccountTypes.id,
    name: billingAccountTypes.name,
  }).from(billingAccountTypes).where(eq(billingAccountTypes.businessId, bizId));
  const typeIdByName = new Map(types.map((t) => [t.name, t.id]));
  let supportedMethodIds: number[] = [];
  if (Array.isArray(data.supportedMethodIds)) {
    supportedMethodIds = data.supportedMethodIds;
  } else if (Array.isArray(data.supportedTypes)) {
    supportedMethodIds = data.supportedTypes
      .map((name) => typeIdByName.get(name))
      .filter((id): id is number => typeof id === 'number');
  }
  const stationMode = data.stationMode || data.stationScope || 'per_station';
  const systemKey = (typeof data.systemKey === 'string' && data.systemKey.trim().length > 0)
    ? data.systemKey
    : toSystemKey(data.name || 'default');
  const [created] = await db.insert(billingSystemsConfig).values({
    businessId: bizId,
    name: data.name,
    systemKey,
    icon: data.icon as string | undefined,
    color: data.color as string | undefined,
    stationMode,
    stationIds: Array.isArray(data.stationIds) ? data.stationIds : [],
    supportedMethodIds,
    sortOrder: data.sortOrder as number | undefined,
    isActive: data.isActive as boolean | undefined,
    notes: data.notes as string | null | undefined,
  }).returning();
  return c.json(created, 201);
}));

billingConfigRoutes.put('/billing-systems-config/:id', safeHandler('تعديل إعداد نظام فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الإعداد غير صالح' }, 400);
  const [rec] = await db.select().from(billingSystemsConfig).where(eq(billingSystemsConfig.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const bizId = rec?.businessId;
  const types = await db.select({
    id: billingAccountTypes.id,
    name: billingAccountTypes.name,
  }).from(billingAccountTypes).where(eq(billingAccountTypes.businessId, bizId));
  const typeIdByName = new Map(types.map((t) => [t.name, t.id]));
  const patch = body as Record<string, unknown> & {
    stationScope?: string;
    stationMode?: string;
    supportedTypes?: string[];
    supportedMethodIds?: number[];
  };
  const updateData: Record<string, unknown> = { ...patch, updatedAt: new Date() };
  if (typeof patch.stationScope === 'string' && !patch.stationMode) {
    updateData.stationMode = patch.stationScope;
  }
  if (!Array.isArray(patch.supportedMethodIds) && Array.isArray(patch.supportedTypes)) {
    updateData.supportedMethodIds = patch.supportedTypes
      .map((name) => typeIdByName.get(name))
      .filter((typeId): typeId is number => typeof typeId === 'number');
  }
  delete updateData.stationScope;
  delete updateData.supportedTypes;
  const [updated] = await db.update(billingSystemsConfig).set(updateData as any).where(eq(billingSystemsConfig.id, id)).returning();
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
  const [created] = await db.insert(billingAccountTypes).values({ businessId: bizId, name: body.name, ...body }).returning();
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
