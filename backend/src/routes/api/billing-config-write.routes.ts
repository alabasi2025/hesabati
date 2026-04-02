/**
 * billing-config-write.routes.ts — Phase 12
 * كتابة أنظمة الفوترة: إنشاء + تعديل + حذف
 * نمط: Control Account لكل نظام فوترة (BIL-01, BIL-02, ...)
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq } from 'drizzle-orm';
import {
  billingSystemsConfig,
  billingAccountTypes,
  accounts,
  accountSubNatures,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { billingSystemConfigSchema, validateBody } from '../../middleware/validation.ts';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';
import { generateLeafAccountCode } from '../../middleware/sequencing.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';

const billingConfigWriteRoutes = new Hono();

function toSystemKey(name: string): string {
  const compact = name.trim().toLowerCase().split(/\s+/).join('_');
  return compact.split('').filter((ch) => /[a-z0-9_]/.test(ch)).join('');
}

function sanitizePositiveIntIds(values: unknown[]): number[] {
  const ids = values
    .map((v) => Number(v))
    .filter((n) => Number.isInteger(n) && n > 0) as number[];
  return Array.from(new Set(ids));
}

// ===================== إنشاء نظام فوترة =====================
billingConfigWriteRoutes.post(
  '/businesses/:bizId/billing-systems-config',
  bizAuthMiddleware(),
  safeHandler('إضافة نظام فوترة', async (c) => {
    const bizId = getBizId(c);
    const body = await getBody(c);
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

    const types = await db
      .select({ id: billingAccountTypes.id, name: billingAccountTypes.name })
      .from(billingAccountTypes)
      .where(eq(billingAccountTypes.businessId, bizId));
    const typeIdByName = new Map(types.map((t) => [t.name, t.id]));

    let supportedMethodIds: number[] = [];
    if (Array.isArray(data.supportedMethodIds)) {
      supportedMethodIds = sanitizePositiveIntIds(data.supportedMethodIds);
    } else if (Array.isArray(data.supportedTypes)) {
      supportedMethodIds = sanitizePositiveIntIds(
        data.supportedTypes
          .map((name) => typeIdByName.get(name))
          .filter((id): id is number => typeof id === 'number'),
      );
    }

    const stationMode = data.stationMode || data.stationScope || 'per_station';
    const systemKey =
      typeof data.systemKey === 'string' && data.systemKey.trim().length > 0
        ? data.systemKey
        : toSystemKey(data.name || 'default');

    // إنشاء حساب تحكم تلقائياً لنظام الفوترة
    let newAccountId: number | null = null;
    try {
      const { code: genCode, sequenceNumber: genSeq } = await generateLeafAccountCode(
        bizId,
        'billing',
        db as any,
      );
      const [billingNature] = await db
        .select({ id: accountSubNatures.id })
        .from(accountSubNatures)
        .where(eq(accountSubNatures.natureKey, 'billing'))
        .limit(1);

      const [newAcc] = await db
        .insert(accounts)
        .values({
          businessId: bizId,
          name: data.name,
          accountType: 'billing',
          accountSubNatureId: billingNature?.id ?? null,
          code: genCode,
          sequenceNumber: genSeq,
          isLeafAccount: true,
          isActive: true,
        })
        .returning({ id: accounts.id });
      newAccountId = newAcc?.id ?? null;
    } catch (e) {
      console.error('تحذير: فشل إنشاء حساب نظام الفوترة:', e);
    }

    const [created] = await db
      .insert(billingSystemsConfig)
      .values({
        businessId: bizId,
        name: data.name,
        systemKey,
        accountId: newAccountId,
        icon: data.icon as string | undefined,
        color: data.color as string | undefined,
        stationMode,
        stationIds: Array.isArray(data.stationIds) ? (data.stationIds as number[]) : [],
        supportedMethodIds,
        sortOrder: data.sortOrder as number | undefined,
        isActive: data.isActive as boolean | undefined,
        notes: data.notes as string | null | undefined,
      })
      .returning();
    return c.json(created, 201);
  }),
);

// ===================== تعديل نظام فوترة =====================
billingConfigWriteRoutes.put(
  '/billing-systems-config/:id',
  safeHandler('تعديل نظام فوترة', async (c) => {
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف الإعداد غير صالح' }, 400);
    const [rec] = await db
      .select()
      .from(billingSystemsConfig)
      .where(eq(billingSystemsConfig.id, id));
    const err = await requireResourceOwnership(c, rec ?? null);
    if (err) return err;
    const body = await getBody(c);
    const bizId = rec?.businessId;
    const types = await db
      .select({ id: billingAccountTypes.id, name: billingAccountTypes.name })
      .from(billingAccountTypes)
      .where(eq(billingAccountTypes.businessId, bizId));
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
    if (Array.isArray(patch.supportedMethodIds)) {
      updateData.supportedMethodIds = sanitizePositiveIntIds(patch.supportedMethodIds);
    }
    if (!Array.isArray(patch.supportedMethodIds) && Array.isArray(patch.supportedTypes)) {
      updateData.supportedMethodIds = sanitizePositiveIntIds(
        patch.supportedTypes
          .map((name) => typeIdByName.get(name))
          .filter((typeId): typeId is number => typeof typeId === 'number'),
      );
    }
    delete updateData.stationScope;
    delete updateData.supportedTypes;
    // حماية: لا يمكن تغيير الحساب المرتبط بعد الإنشاء
    delete updateData.accountId;
    const [updated] = await db
      .update(billingSystemsConfig)
      .set(updateData as any)
      .where(eq(billingSystemsConfig.id, id))
      .returning();
    if (!updated) return c.json({ error: 'إعداد غير موجود' }, 404);
    return c.json(updated);
  }),
);

// ===================== حذف نظام فوترة =====================
billingConfigWriteRoutes.delete(
  '/billing-systems-config/:id',
  safeHandler('حذف نظام فوترة', async (c) => {
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف الإعداد غير صالح' }, 400);
    const [rec] = await db
      .select()
      .from(billingSystemsConfig)
      .where(eq(billingSystemsConfig.id, id));
    const err = await requireResourceOwnership(c, rec ?? null);
    if (err) return err;
    await db.delete(billingSystemsConfig).where(eq(billingSystemsConfig.id, id));
    return c.json({ success: true });
  }),
);

// ===================== أنواع حسابات الفوترة =====================
billingConfigWriteRoutes.post(
  '/businesses/:bizId/billing-account-types',
  bizAuthMiddleware(),
  safeHandler('إضافة نوع حساب فوترة', async (c) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as { name?: string; [k: string]: unknown };
    if (!body.name) return c.json({ error: 'اسم النوع مطلوب' }, 400);
    const [created] = await db
      .insert(billingAccountTypes)
      .values({ businessId: bizId, name: body.name, ...body })
      .returning();
    return c.json(created, 201);
  }),
);

billingConfigWriteRoutes.put(
  '/billing-account-types/:id',
  safeHandler('تعديل نوع حساب فوترة', async (c) => {
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
    const [rec] = await db
      .select()
      .from(billingAccountTypes)
      .where(eq(billingAccountTypes.id, id));
    const err = await requireResourceOwnership(c, rec ?? null);
    if (err) return err;
    const body = await getBody(c);
    const [updated] = await db
      .update(billingAccountTypes)
      .set(body)
      .where(eq(billingAccountTypes.id, id))
      .returning();
    if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
    return c.json(updated);
  }),
);

billingConfigWriteRoutes.delete(
  '/billing-account-types/:id',
  safeHandler('حذف نوع حساب فوترة', async (c) => {
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
    const [rec] = await db
      .select()
      .from(billingAccountTypes)
      .where(eq(billingAccountTypes.id, id));
    const err = await requireResourceOwnership(c, rec ?? null);
    if (err) return err;
    await db.delete(billingAccountTypes).where(eq(billingAccountTypes.id, id));
    return c.json({ success: true });
  }),
);

export { billingConfigWriteRoutes };
