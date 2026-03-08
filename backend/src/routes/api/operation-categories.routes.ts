/**
 * أصناف العمليات - Operation Categories Routes
 * إدارة تصنيفات أنواع العمليات
 */

import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, asc } from "drizzle-orm";
import {
  operationCategories,
  operationTypes,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import {
  safeHandler,
  normalizeBody,
  parseId,
} from "../../middleware/helpers.ts";
import {
  getNextOperationCategorySequence,
  generateItemCode,
} from "../../middleware/sequencing.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const operationCategoriesRoutes = new Hono();

operationCategoriesRoutes.get(
  "/businesses/:bizId/operation-categories",
  bizAuthMiddleware(),
  safeHandler("جلب أصناف العمليات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const includeTypes = c.req.query("includeTypes") === "true";

    const categories = await db
      .select({
        id: operationCategories.id,
        name: operationCategories.name,
        categoryKey: operationCategories.categoryKey,
        sequenceNumber: operationCategories.sequenceNumber,
        code: operationCategories.code,
        description: operationCategories.description,
        icon: operationCategories.icon,
        color: operationCategories.color,
        sortOrder: operationCategories.sortOrder,
        isActive: operationCategories.isActive,
        createdAt: operationCategories.createdAt,
      })
      .from(operationCategories)
      .where(eq(operationCategories.businessId, bizId))
      .orderBy(asc(operationCategories.sortOrder), asc(operationCategories.name));

    if (includeTypes) {
      const types = await db
        .select({
          id: operationTypes.id,
          name: operationTypes.name,
          categoryId: operationTypes.categoryId,
          sequenceNumber: operationTypes.sequenceNumber,
          code: operationTypes.code,
          voucherType: operationTypes.voucherType,
          description: operationTypes.description,
          isActive: operationTypes.isActive,
        })
        .from(operationTypes)
        .where(eq(operationTypes.businessId, bizId))
        .orderBy(asc(operationTypes.sortOrder));

      const typesByCategory: Record<number, typeof types> = {};
      for (const t of types) {
        if (t.categoryId) {
          if (!typesByCategory[t.categoryId]) typesByCategory[t.categoryId] = [];
          typesByCategory[t.categoryId].push(t);
        }
      }

      return c.json(
        categories.map((cat) => ({
          ...cat,
          operationTypes: typesByCategory[cat.id] || [],
        }))
      );
    }

    return c.json(categories);
  })
);

operationCategoriesRoutes.get(
  "/businesses/:bizId/operation-categories/:id",
  bizAuthMiddleware(),
  safeHandler("جلب تفاصيل صنف عمليات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الصنف غير صالح" }, 400);

    const [category] = await db
      .select()
      .from(operationCategories)
      .where(
        and(
          eq(operationCategories.id, id),
          eq(operationCategories.businessId, bizId)
        )
      );

    if (!category) {
      return c.json({ error: "الصنف غير موجود" }, 404);
    }

    const types = await db
      .select()
      .from(operationTypes)
      .where(eq(operationTypes.categoryId, id))
      .orderBy(asc(operationTypes.sortOrder));

    return c.json({ ...category, operationTypes: types });
  })
);

operationCategoriesRoutes.post(
  "/businesses/:bizId/operation-categories",
  bizAuthMiddleware(),
  checkPermission("operation_types", "create"),
  safeHandler("إنشاء صنف عمليات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;

    if (!body.name) {
      return c.json({ error: "اسم الصنف مطلوب" }, 400);
    }
    if (!body.categoryKey) {
      return c.json({ error: "مفتاح الصنف مطلوب" }, 400);
    }

    const [existingKey] = await db
      .select({ id: operationCategories.id })
      .from(operationCategories)
      .where(
        and(
          eq(operationCategories.businessId, bizId),
          eq(operationCategories.categoryKey, String(body.categoryKey))
        )
      )
      .limit(1);

    if (existingKey) {
      return c.json({ error: "مفتاح الصنف موجود مسبقاً" }, 400);
    }

    const seqNum = await getNextOperationCategorySequence(bizId);
    const code = body.code
      ? String(body.code)
      : generateItemCode("OPC", seqNum);

    const [created] = await db
      .insert(operationCategories)
      .values({
        businessId: bizId,
        name: String(body.name),
        categoryKey: String(body.categoryKey),
        sequenceNumber: seqNum,
        code,
        description: body.description ? String(body.description) : null,
        icon: body.icon ? String(body.icon) : "category",
        color: body.color ? String(body.color) : "#6366f1",
        sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
        isActive: body.isActive !== false,
      })
      .returning();

    return c.json(created, 201);
  })
);

operationCategoriesRoutes.put(
  "/businesses/:bizId/operation-categories/:id",
  bizAuthMiddleware(),
  checkPermission("operation_types", "update"),
  safeHandler("تعديل صنف عمليات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الصنف غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(operationCategories)
      .where(
        and(
          eq(operationCategories.id, id),
          eq(operationCategories.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "الصنف غير موجود" }, 404);
    }

    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;

    if (body.categoryKey && body.categoryKey !== existing.categoryKey) {
      const [existingKey] = await db
        .select({ id: operationCategories.id })
        .from(operationCategories)
        .where(
          and(
            eq(operationCategories.businessId, bizId),
            eq(operationCategories.categoryKey, String(body.categoryKey))
          )
        )
        .limit(1);

      if (existingKey) {
        return c.json({ error: "مفتاح الصنف موجود مسبقاً" }, 400);
      }
    }

    const updatePayload: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (body.name !== undefined) updatePayload.name = String(body.name);
    if (body.categoryKey !== undefined)
      updatePayload.categoryKey = String(body.categoryKey);
    if (body.code !== undefined) updatePayload.code = String(body.code);
    if (body.description !== undefined)
      updatePayload.description = body.description;
    if (body.icon !== undefined) updatePayload.icon = String(body.icon);
    if (body.color !== undefined) updatePayload.color = String(body.color);
    if (body.sortOrder !== undefined) updatePayload.sortOrder = body.sortOrder;
    if (body.isActive !== undefined) updatePayload.isActive = body.isActive;

    const [updated] = await db
      .update(operationCategories)
      .set(updatePayload)
      .where(eq(operationCategories.id, id))
      .returning();

    return c.json(updated);
  })
);

operationCategoriesRoutes.delete(
  "/businesses/:bizId/operation-categories/:id",
  bizAuthMiddleware(),
  checkPermission("operation_types", "delete"),
  safeHandler("حذف صنف عمليات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الصنف غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(operationCategories)
      .where(
        and(
          eq(operationCategories.id, id),
          eq(operationCategories.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "الصنف غير موجود" }, 404);
    }

    const [hasTypes] = await db
      .select({ id: operationTypes.id })
      .from(operationTypes)
      .where(eq(operationTypes.categoryId, id))
      .limit(1);

    if (hasTypes) {
      return c.json(
        { error: "لا يمكن حذف الصنف لأنه يحتوي على أنواع عمليات" },
        400
      );
    }

    await db.delete(operationCategories).where(eq(operationCategories.id, id));

    return c.json({ success: true });
  })
);

export default operationCategoriesRoutes;
