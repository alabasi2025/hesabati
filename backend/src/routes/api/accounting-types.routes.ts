import { Hono } from "hono";
import { and, asc, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { accountingSubTypes, accountingTypes } from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { getNextSequence } from "../../middleware/sequencing.ts";
import { normalizeBody, parseId, safeHandler } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const accountingTypesRoutes = new Hono();

accountingTypesRoutes.get(
  "/businesses/:bizId/accounting-main-types",
  bizAuthMiddleware(),
  safeHandler("جلب الأنواع الرئيسية المرنة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const rows = await db
      .select()
      .from(accountingTypes)
      .where(eq(accountingTypes.businessId, bizId))
      .orderBy(asc(accountingTypes.sequenceNumber), asc(accountingTypes.sortOrder), asc(accountingTypes.name));
    return c.json(rows);
  }),
);

accountingTypesRoutes.post(
  "/businesses/:bizId/accounting-main-types",
  bizAuthMiddleware(),
  checkPermission("accounts", "create"),
  safeHandler("إنشاء نوع رئيسي مرن", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const subTypeKey = typeof body.subTypeKey === "string" ? body.subTypeKey.trim() : "";
    if (!name) return c.json({ error: "اسم النوع الرئيسي مطلوب" }, 400);
    if (!subTypeKey) return c.json({ error: "مفتاح النوع الرئيسي مطلوب" }, 400);

    const [existing] = await db
      .select({ id: accountingTypes.id })
      .from(accountingTypes)
      .where(and(eq(accountingTypes.businessId, bizId), eq(accountingTypes.subTypeKey, subTypeKey)))
      .limit(1);
    if (existing) return c.json({ error: "مفتاح النوع الرئيسي موجود مسبقاً" }, 400);

    const seq = await getNextSequence(bizId, "category_accounting_type", 0, 0);
    const [created] = await db
      .insert(accountingTypes)
      .values({
        businessId: bizId,
        name,
        subTypeKey,
        sequenceNumber: seq,
        description: typeof body.description === "string" ? body.description : null,
        icon: typeof body.icon === "string" && body.icon.trim().length > 0 ? body.icon : "book",
        color: typeof body.color === "string" && body.color.trim().length > 0 ? body.color : "#14b8a6",
        sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
        isActive: body.isActive !== false,
      })
      .returning();
    return c.json(created, 201);
  }),
);

accountingTypesRoutes.put(
  "/businesses/:bizId/accounting-main-types/:id",
  bizAuthMiddleware(),
  checkPermission("accounts", "update"),
  safeHandler("تعديل نوع رئيسي مرن", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرف النوع الرئيسي غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(accountingTypes)
      .where(and(eq(accountingTypes.id, id), eq(accountingTypes.businessId, bizId)))
      .limit(1);
    if (!existing) return c.json({ error: "النوع الرئيسي غير موجود" }, 404);

    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
    if (typeof body.subTypeKey === "string" && body.subTypeKey !== existing.subTypeKey) {
      const [dup] = await db
        .select({ id: accountingTypes.id })
        .from(accountingTypes)
        .where(and(eq(accountingTypes.businessId, bizId), eq(accountingTypes.subTypeKey, body.subTypeKey)))
        .limit(1);
      if (dup) return c.json({ error: "مفتاح النوع الرئيسي موجود مسبقاً" }, 400);
    }

    const payload: Record<string, unknown> = { updatedAt: new Date() };
    if (typeof body.name === "string") payload.name = body.name;
    if (typeof body.subTypeKey === "string") payload.subTypeKey = body.subTypeKey;
    if (body.description === null || typeof body.description === "string") payload.description = body.description;
    if (typeof body.icon === "string") payload.icon = body.icon;
    if (typeof body.color === "string") payload.color = body.color;
    if (body.sortOrder !== undefined) payload.sortOrder = body.sortOrder;
    if (body.isActive !== undefined) payload.isActive = body.isActive;

    const [updated] = await db.update(accountingTypes).set(payload).where(eq(accountingTypes.id, id)).returning();
    return c.json(updated);
  }),
);

accountingTypesRoutes.delete(
  "/businesses/:bizId/accounting-main-types/:id",
  bizAuthMiddleware(),
  checkPermission("accounts", "delete"),
  safeHandler("حذف نوع رئيسي مرن", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرف النوع الرئيسي غير صالح" }, 400);

    const [existing] = await db
      .select({ id: accountingTypes.id })
      .from(accountingTypes)
      .where(and(eq(accountingTypes.id, id), eq(accountingTypes.businessId, bizId)))
      .limit(1);
    if (!existing) return c.json({ error: "النوع الرئيسي غير موجود" }, 404);

    const [hasSubTypes] = await db
      .select({ id: accountingSubTypes.id })
      .from(accountingSubTypes)
      .where(and(eq(accountingSubTypes.businessId, bizId), eq(accountingSubTypes.mainTypeId, id)))
      .limit(1);
    if (hasSubTypes) {
      return c.json({ error: "لا يمكن حذف النوع الرئيسي قبل حذف تصنيفاته الفرعية" }, 400);
    }

    await db.delete(accountingTypes).where(eq(accountingTypes.id, id));
    return c.json({ success: true });
  }),
);

accountingTypesRoutes.get(
  "/businesses/:bizId/accounting-types",
  bizAuthMiddleware(),
  safeHandler("جلب التصنيفات الفرعية للأنواع المرنة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const rows = await db
      .select({
        id: accountingSubTypes.id,
        businessId: accountingSubTypes.businessId,
        mainTypeId: accountingSubTypes.mainTypeId,
        mainTypeName: accountingTypes.name,
        mainTypeKey: accountingTypes.subTypeKey,
        name: accountingSubTypes.name,
        subTypeKey: accountingSubTypes.subTypeKey,
        sequenceNumber: accountingSubTypes.sequenceNumber,
        description: accountingSubTypes.description,
        icon: accountingSubTypes.icon,
        color: accountingSubTypes.color,
        sortOrder: accountingSubTypes.sortOrder,
        isActive: accountingSubTypes.isActive,
        createdAt: accountingSubTypes.createdAt,
        updatedAt: accountingSubTypes.updatedAt,
      })
      .from(accountingSubTypes)
      .innerJoin(accountingTypes, eq(accountingTypes.id, accountingSubTypes.mainTypeId))
      .where(eq(accountingSubTypes.businessId, bizId))
      .orderBy(
        asc(accountingTypes.sequenceNumber),
        asc(accountingSubTypes.sequenceNumber),
        asc(accountingSubTypes.sortOrder),
        asc(accountingSubTypes.name),
      );
    return c.json(rows);
  }),
);

accountingTypesRoutes.post(
  "/businesses/:bizId/accounting-types",
  bizAuthMiddleware(),
  checkPermission("accounts", "create"),
  safeHandler("إنشاء تصنيف فرعي مرن", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const subTypeKey = typeof body.subTypeKey === "string" ? body.subTypeKey.trim() : "";
    const mainTypeId = Number(body.mainTypeId);
    if (!name) return c.json({ error: "اسم التصنيف الفرعي مطلوب" }, 400);
    if (!subTypeKey) return c.json({ error: "مفتاح التصنيف الفرعي مطلوب" }, 400);
    if (!Number.isInteger(mainTypeId) || mainTypeId <= 0) {
      return c.json({ error: "يجب اختيار نوع رئيسي صالح قبل إنشاء التصنيف الفرعي" }, 400);
    }

    const [mainType] = await db
      .select({ id: accountingTypes.id })
      .from(accountingTypes)
      .where(and(eq(accountingTypes.businessId, bizId), eq(accountingTypes.id, mainTypeId)))
      .limit(1);
    if (!mainType) {
      return c.json({ error: "النوع الرئيسي غير موجود أو لا يتبع هذا العمل" }, 400);
    }

    const [existing] = await db
      .select({ id: accountingSubTypes.id })
      .from(accountingSubTypes)
      .where(and(eq(accountingSubTypes.businessId, bizId), eq(accountingSubTypes.subTypeKey, subTypeKey)))
      .limit(1);
    if (existing) return c.json({ error: "مفتاح التصنيف الفرعي موجود مسبقاً" }, 400);

    const seq = await getNextSequence(bizId, "item_in_accounting_main_type", mainTypeId, 0);
    const [created] = await db
      .insert(accountingSubTypes)
      .values({
        businessId: bizId,
        mainTypeId,
        name,
        subTypeKey,
        sequenceNumber: seq,
        description: typeof body.description === "string" ? body.description : null,
        icon: typeof body.icon === "string" && body.icon.trim().length > 0 ? body.icon : "label",
        color: typeof body.color === "string" && body.color.trim().length > 0 ? body.color : "#14b8a6",
        sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
        isActive: body.isActive !== false,
      })
      .returning();
    return c.json(created, 201);
  }),
);

accountingTypesRoutes.put(
  "/businesses/:bizId/accounting-types/:id",
  bizAuthMiddleware(),
  checkPermission("accounts", "update"),
  safeHandler("تعديل تصنيف فرعي مرن", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرف التصنيف غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(accountingSubTypes)
      .where(and(eq(accountingSubTypes.id, id), eq(accountingSubTypes.businessId, bizId)))
      .limit(1);
    if (!existing) return c.json({ error: "التصنيف غير موجود" }, 404);

    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
    if (typeof body.subTypeKey === "string" && body.subTypeKey !== existing.subTypeKey) {
      const [dup] = await db
        .select({ id: accountingSubTypes.id })
        .from(accountingSubTypes)
        .where(and(eq(accountingSubTypes.businessId, bizId), eq(accountingSubTypes.subTypeKey, body.subTypeKey)))
        .limit(1);
      if (dup) return c.json({ error: "مفتاح التصنيف موجود مسبقاً" }, 400);
    }

    if (body.mainTypeId !== undefined) {
      const nextMainTypeId = Number(body.mainTypeId);
      if (!Number.isInteger(nextMainTypeId) || nextMainTypeId <= 0) {
        return c.json({ error: "النوع الرئيسي غير صالح" }, 400);
      }
      const [mainType] = await db
        .select({ id: accountingTypes.id })
        .from(accountingTypes)
        .where(and(eq(accountingTypes.businessId, bizId), eq(accountingTypes.id, nextMainTypeId)))
        .limit(1);
      if (!mainType) {
        return c.json({ error: "النوع الرئيسي غير موجود أو لا يتبع هذا العمل" }, 400);
      }
    }

    const payload: Record<string, unknown> = { updatedAt: new Date() };
    if (typeof body.name === "string") payload.name = body.name;
    if (body.mainTypeId !== undefined) payload.mainTypeId = Number(body.mainTypeId);
    if (typeof body.subTypeKey === "string") payload.subTypeKey = body.subTypeKey;
    if (body.description === null || typeof body.description === "string") payload.description = body.description;
    if (typeof body.icon === "string") payload.icon = body.icon;
    if (typeof body.color === "string") payload.color = body.color;
    if (body.sortOrder !== undefined) payload.sortOrder = body.sortOrder;
    if (body.isActive !== undefined) payload.isActive = body.isActive;

    const [updated] = await db.update(accountingSubTypes).set(payload).where(eq(accountingSubTypes.id, id)).returning();
    return c.json(updated);
  }),
);

accountingTypesRoutes.delete(
  "/businesses/:bizId/accounting-types/:id",
  bizAuthMiddleware(),
  checkPermission("accounts", "delete"),
  safeHandler("حذف تصنيف فرعي مرن", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرف التصنيف غير صالح" }, 400);

    const [existing] = await db
      .select({ id: accountingSubTypes.id })
      .from(accountingSubTypes)
      .where(and(eq(accountingSubTypes.id, id), eq(accountingSubTypes.businessId, bizId)))
      .limit(1);
    if (!existing) return c.json({ error: "التصنيف غير موجود" }, 404);

    await db.delete(accountingSubTypes).where(eq(accountingSubTypes.id, id));
    return c.json({ success: true });
  }),
);

export default accountingTypesRoutes;
