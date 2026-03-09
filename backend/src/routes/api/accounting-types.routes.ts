import { Hono } from "hono";
import { and, asc, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { accountingTypes } from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { getNextSequence } from "../../middleware/sequencing.ts";
import { normalizeBody, parseId, safeHandler } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const accountingTypesRoutes = new Hono();

accountingTypesRoutes.get(
  "/businesses/:bizId/accounting-types",
  bizAuthMiddleware(),
  safeHandler("جلب تصنيفات أخرى", async (c: AppContext) => {
    const bizId = getBizId(c);
    const rows = await db
      .select()
      .from(accountingTypes)
      .where(eq(accountingTypes.businessId, bizId))
      .orderBy(asc(accountingTypes.sortOrder), asc(accountingTypes.name));
    return c.json(rows);
  }),
);

accountingTypesRoutes.post(
  "/businesses/:bizId/accounting-types",
  bizAuthMiddleware(),
  checkPermission("accounts", "create"),
  safeHandler("إنشاء تصنيف أخرى", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const subTypeKey = typeof body.subTypeKey === "string" ? body.subTypeKey.trim() : "";
    if (!name) return c.json({ error: "اسم التصنيف مطلوب" }, 400);
    if (!subTypeKey) return c.json({ error: "مفتاح التصنيف مطلوب" }, 400);

    const [existing] = await db
      .select({ id: accountingTypes.id })
      .from(accountingTypes)
      .where(and(eq(accountingTypes.businessId, bizId), eq(accountingTypes.subTypeKey, subTypeKey)))
      .limit(1);
    if (existing) return c.json({ error: "مفتاح التصنيف موجود مسبقاً" }, 400);

    const seq = await getNextSequence(bizId, "accounting_type", 0);
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
  "/businesses/:bizId/accounting-types/:id",
  bizAuthMiddleware(),
  checkPermission("accounts", "update"),
  safeHandler("تعديل تصنيف أخرى", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرف التصنيف غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(accountingTypes)
      .where(and(eq(accountingTypes.id, id), eq(accountingTypes.businessId, bizId)))
      .limit(1);
    if (!existing) return c.json({ error: "التصنيف غير موجود" }, 404);

    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
    if (typeof body.subTypeKey === "string" && body.subTypeKey !== existing.subTypeKey) {
      const [dup] = await db
        .select({ id: accountingTypes.id })
        .from(accountingTypes)
        .where(and(eq(accountingTypes.businessId, bizId), eq(accountingTypes.subTypeKey, body.subTypeKey)))
        .limit(1);
      if (dup) return c.json({ error: "مفتاح التصنيف موجود مسبقاً" }, 400);
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
  "/businesses/:bizId/accounting-types/:id",
  bizAuthMiddleware(),
  checkPermission("accounts", "delete"),
  safeHandler("حذف تصنيف أخرى", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرف التصنيف غير صالح" }, 400);

    const [existing] = await db
      .select({ id: accountingTypes.id })
      .from(accountingTypes)
      .where(and(eq(accountingTypes.id, id), eq(accountingTypes.businessId, bizId)))
      .limit(1);
    if (!existing) return c.json({ error: "التصنيف غير موجود" }, 404);

    await db.delete(accountingTypes).where(eq(accountingTypes.id, id));
    return c.json({ success: true });
  }),
);

export default accountingTypesRoutes;
