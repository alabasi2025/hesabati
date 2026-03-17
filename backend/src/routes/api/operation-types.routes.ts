/**
 * مسارات أنواع العمليات (قوالب العمليات)
 * ترقيم القوالب الجديدة يمر عبر محرك الترقيم (getNextItemInCategorySequence).
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, inArray, sql } from 'drizzle-orm';
import { operationTypes, operationTypeAccounts, accounts, operationCategories } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { operationTypeSchema, validateBody } from '../../middleware/validation.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getNextItemInCategorySequence } from '../../middleware/sequencing.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';
import { auditCreate, auditUpdate, auditDelete, makeAuditCtx } from '../../engines/audit-middleware.engine.ts';

const operationTypesRoutes = new Hono();

operationTypesRoutes.get('/businesses/:bizId/operation-types', bizAuthMiddleware(), safeHandler('جلب أنواع العمليات', async (c) => {
  const bizId = getBizId(c);
  const category = c.req.query('category');
  const screen = c.req.query('screen');
  const conditions = [eq(operationTypes.businessId, bizId)];
  if (category) {
    const [cat] = await db.select({ id: operationCategories.id }).from(operationCategories).where(and(eq(operationCategories.businessId, bizId), eq(operationCategories.categoryKey, category))).limit(1);
    if (cat) conditions.push(eq(operationTypes.categoryId, cat.id));
  }
  if (screen) conditions.push(sql`${screen} = ANY(${operationTypes.screens})`);

  const rows = await db.select().from(operationTypes)
    .where(and(...conditions))
    .orderBy(operationTypes.sortOrder, operationTypes.name);

  const otIds = rows.map(ot => ot.id);
  let allLinkedAccounts: { operationTypeId: number; id: number; accountId: number | null; accountName: string | null; accountType: string | null; [k: string]: unknown }[] = [];
  if (otIds.length > 0) {
    allLinkedAccounts = await db.select({
      id: operationTypeAccounts.id,
      operationTypeId: operationTypeAccounts.operationTypeId,
      accountId: operationTypeAccounts.accountId,
      employeeBillingAccountId: operationTypeAccounts.employeeBillingAccountId,
      label: operationTypeAccounts.label,
      permission: operationTypeAccounts.permission,
      sortOrder: operationTypeAccounts.sortOrder,
      isActive: operationTypeAccounts.isActive,
      accountName: accounts.name,
      accountType: accounts.accountType,
    }).from(operationTypeAccounts)
      .leftJoin(accounts, eq(operationTypeAccounts.accountId, accounts.id))
      .where(inArray(operationTypeAccounts.operationTypeId, otIds));
  }

  const linkedMap: Record<number, typeof allLinkedAccounts> = {};
  for (const la of allLinkedAccounts) {
    if (!linkedMap[la.operationTypeId]) linkedMap[la.operationTypeId] = [];
    linkedMap[la.operationTypeId].push(la);
  }

  return c.json(rows.map(ot => ({ ...ot, linkedAccounts: linkedMap[ot.id] || [] })));
}));

operationTypesRoutes.get('/operation-types/:id', safeHandler('جلب تفاصيل نوع عملية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, id));
  const err = await requireResourceOwnership(c, ot ?? null);
  if (err) return err;
  const linkedAccounts = await db.select({
    id: operationTypeAccounts.id,
    accountId: operationTypeAccounts.accountId,
    employeeBillingAccountId: operationTypeAccounts.employeeBillingAccountId,
    label: operationTypeAccounts.label,
    permission: operationTypeAccounts.permission,
    sortOrder: operationTypeAccounts.sortOrder,
    isActive: operationTypeAccounts.isActive,
    accountName: accounts.name,
    accountType: accounts.accountType,
  }).from(operationTypeAccounts)
    .leftJoin(accounts, eq(operationTypeAccounts.accountId, accounts.id))
    .where(eq(operationTypeAccounts.operationTypeId, id));
  return c.json({ ...ot, linkedAccounts });
}));

operationTypesRoutes.post('/businesses/:bizId/operation-types', bizAuthMiddleware(), safeHandler('إضافة نوع عملية', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(operationTypeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const data = validation.data as Record<string, unknown> & {
    screens?: unknown;
    linkedAccounts?: unknown[];
    category?: string;
    categoryId?: number | string;
    code?: string;
  };
  if (typeof data.screens === 'string') data.screens = [data.screens];
  const { linkedAccounts: laList, screens: _screensOt, ...otData } = data;
  const rawCategoryId = otData.categoryId;
  const parsedCategoryId = typeof rawCategoryId === 'string' ? Number.parseInt(rawCategoryId, 10) : Number(rawCategoryId);
  const [anyCategoryBeforeValidation] = await db
    .select({ id: operationCategories.id })
    .from(operationCategories)
    .where(eq(operationCategories.businessId, bizId))
    .limit(1);
  if (!Number.isInteger(parsedCategoryId) || parsedCategoryId <= 0) {
    if (!anyCategoryBeforeValidation) {
      return c.json({ error: 'لا توجد تصنيفات. أنشئ تصنيفاً أولاً ثم أنشئ القالب' }, 400);
    }
    return c.json({ error: 'اختر تصنيفاً من قائمة التصنيفات قبل إنشاء القالب' }, 400);
  }
  const [catById] = await db
    .select({ id: operationCategories.id, name: operationCategories.name })
    .from(operationCategories)
    .where(and(eq(operationCategories.id, parsedCategoryId), eq(operationCategories.businessId, bizId)))
    .limit(1);
  if (!catById) {
    if (!anyCategoryBeforeValidation) return c.json({ error: 'لا توجد تصنيفات. أنشئ تصنيفاً أولاً ثم أنشئ القالب' }, 400);
    return c.json({ error: 'التصنيف المحدد غير موجود' }, 400);
  }
  const categoryId = catById.id;
  const categoryName = catById.name || '';

  // ترقيم عبر محرك الترقيم: معرّف التصنيف ثم العداد item_in_operation_category
  const { sequenceNumber: seqNum } = await getNextItemInCategorySequence(bizId, 'operation', categoryId);
  const categoryPrefix = categoryName.substring(0, 3).toUpperCase();
  const autoCode = typeof otData.code === 'string' ? otData.code : `${categoryPrefix}-${String(seqNum).padStart(3, '0')}`;
  const name = typeof otData.name === 'string' ? otData.name : '';

  const [created] = await db.insert(operationTypes).values({
    ...otData,
    name,
    categoryId,
    businessId: bizId,
    sequenceNumber: seqNum,
    code: autoCode,
    screens: typeof _screensOt === 'string' ? _screensOt : Array.isArray(_screensOt) ? String(_screensOt) : undefined,
  } as typeof operationTypes.$inferInsert).returning();
  if (Array.isArray(laList) && laList.length > 0 && created) {
    const rows = laList
      .map((la: unknown, i: number) => {
        const accId = typeof la === 'number' ? la : (la as { accountId?: number; id?: number }).accountId ?? (la as { id?: number }).id;
        const obj = typeof la === 'object' && la !== null ? (la as Record<string, unknown>) : {};
        if (accId == null) return null;
        const accountId = Number(accId);
        if (!Number.isFinite(accountId)) return null;
        return {
          operationTypeId: created.id,
          accountId,
          label: (obj.label as string | null) ?? null,
          permission: (obj.permission as string) ?? 'both',
          sortOrder: typeof obj.sortOrder === 'number' ? obj.sortOrder : i,
        };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
    if (rows.length > 0) await db.insert(operationTypeAccounts).values(rows);
  }
  return c.json(created, 201);
}));

operationTypesRoutes.put('/operation-types/:id', safeHandler('تعديل نوع عملية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, id));
  const err = await requireResourceOwnership(c, ot ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json()) as Record<string, unknown> & { screens?: unknown; linkedAccounts?: { accountId: number; label?: string; permission?: string; sortOrder?: number }[] };
  if (typeof body.screens === 'string') body.screens = [body.screens];
  const { linkedAccounts: laList, ...otData } = body;
  const { screens: _screens, ...restOt } = otData;
  const screensVal = Array.isArray(_screens) ? String(_screens) : typeof _screens === 'string' ? _screens : undefined;
  const [updated] = await db.update(operationTypes).set({
    ...restOt,
    updatedAt: new Date(),
    ...(screensVal !== undefined ? { screens: screensVal } : {}),
  }).where(eq(operationTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع العملية غير موجود' }, 404);
  if (Array.isArray(laList)) {
    await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.operationTypeId, id));
    if (laList.length > 0) {
      await db.insert(operationTypeAccounts).values(
        laList.map((la, i) => ({
          operationTypeId: id,
          accountId: la.accountId,
          label: (la.label as string | null) ?? null,
          permission: (la.permission as string) ?? 'both',
          sortOrder: (la.sortOrder as number) ?? i,
        }))
      );
    }
  }
  return c.json(updated);
}));

operationTypesRoutes.delete('/operation-types/:id', safeHandler('حذف نوع عملية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, id));
  const err = await requireResourceOwnership(c, ot ?? null);
  if (err) return err;
  await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.operationTypeId, id));
  await db.delete(operationTypes).where(eq(operationTypes.id, id));
  return c.json({ success: true });
}));

operationTypesRoutes.post('/operation-types/:otId/accounts', safeHandler('ربط حساب بنوع عملية', async (c) => {
  const otId = parseId(c.req.param('otId'));
  if (!otId) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, otId));
  const err = await requireResourceOwnership(c, ot ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json()) as { accountId?: number; employeeBillingAccountId?: number };
  if (!body.accountId && !body.employeeBillingAccountId) {
    return c.json({ error: 'يجب تحديد حساب أو حساب فوترة' }, 400);
  }
  const [created] = await db.insert(operationTypeAccounts).values({ ...body, operationTypeId: otId }).returning();
  return c.json(created, 201);
}));

operationTypesRoutes.delete('/operation-type-accounts/:id', safeHandler('فك ربط حساب من نوع عملية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الربط غير صالح' }, 400);
  const [ota] = await db.select().from(operationTypeAccounts).where(eq(operationTypeAccounts.id, id));
  if (!ota) return c.json({ error: 'ربط غير موجود' }, 404);
  const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, ota.operationTypeId));
  const err = await requireResourceOwnership(c, ot ?? null);
  if (err) return err;
  await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.id, id));
  return c.json({ success: true });
}));

export default operationTypesRoutes;
