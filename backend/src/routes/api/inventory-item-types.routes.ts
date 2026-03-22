/**
 * أنواع الأصناف - Inventory Item Types Routes
 * إدارة تصنيفات أنواع الأصناف المخزنية
 */

import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, asc } from "drizzle-orm";
import { inventoryItemTypes } from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import {
  safeHandler,
  parseId,
  getBody,
} from "../../middleware/helpers.ts";
import {
  getNextSequence,
  generateItemCode,
} from "../../middleware/sequencing.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const inventoryItemTypesRoutes = new Hono();

inventoryItemTypesRoutes.get(
  "/businesses/:bizId/inventory-item-types",
  bizAuthMiddleware(),
  safeHandler("جلب أنواع الأصناف", async (c: AppContext) => {
    const bizId = getBizId(c);

    const types = await db
      .select({
        id: inventoryItemTypes.id,
        name: inventoryItemTypes.name,
        subTypeKey: inventoryItemTypes.subTypeKey,
        sequenceNumber: inventoryItemTypes.sequenceNumber,
        description: inventoryItemTypes.description,
        icon: inventoryItemTypes.icon,
        color: inventoryItemTypes.color,
        sortOrder: inventoryItemTypes.sortOrder,
        isActive: inventoryItemTypes.isActive,
        createdAt: inventoryItemTypes.createdAt,
      })
      .from(inventoryItemTypes)
      .where(eq(inventoryItemTypes.businessId, bizId))
      .orderBy(asc(inventoryItemTypes.sortOrder), asc(inventoryItemTypes.name));

    return c.json(types);
  })
);

inventoryItemTypesRoutes.get(
  "/businesses/:bizId/inventory-item-types/:id",
  bizAuthMiddleware(),
  safeHandler("جلب تفاصيل نوع صنف", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف النوع غير صالح" }, 400);

    const [type] = await db
      .select()
      .from(inventoryItemTypes)
      .where(
        and(
          eq(inventoryItemTypes.id, id),
          eq(inventoryItemTypes.businessId, bizId)
        )
      );

    if (!type) {
      return c.json({ error: "النوع غير موجود" }, 404);
    }

    return c.json(type);
  })
);

inventoryItemTypesRoutes.post(
  "/businesses/:bizId/inventory-item-types",
  bizAuthMiddleware(),
  checkPermission("inventory", "create"),
  safeHandler("إنشاء نوع صنف", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    if (!body.name) {
      return c.json({ error: "اسم النوع مطلوب" }, 400);
    }
    if (!body.subTypeKey) {
      return c.json({ error: "مفتاح النوع مطلوب" }, 400);
    }

    const [existingKey] = await db
      .select({ id: inventoryItemTypes.id })
      .from(inventoryItemTypes)
      .where(
        and(
          eq(inventoryItemTypes.businessId, bizId),
          eq(inventoryItemTypes.subTypeKey, String(body.subTypeKey))
        )
      )
      .limit(1);

    if (existingKey) {
      return c.json({ error: "مفتاح النوع موجود مسبقاً" }, 400);
    }

    const seqNum = await getNextSequence(bizId, "inventory_item_type", 0);

    const [created] = await db
      .insert(inventoryItemTypes)
      .values({
        businessId: bizId,
        name: String(body.name),
        subTypeKey: String(body.subTypeKey),
        sequenceNumber: seqNum,
        description: body.description ? String(body.description) : null,
        icon: body.icon ? String(body.icon) : "inventory_2",
        color: body.color ? String(body.color) : "#78716c",
        sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
        isActive: body.isActive !== false,
      })
      .returning();

    return c.json(created, 201);
  })
);

inventoryItemTypesRoutes.put(
  "/businesses/:bizId/inventory-item-types/:id",
  bizAuthMiddleware(),
  checkPermission("inventory", "update"),
  safeHandler("تعديل نوع صنف", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف النوع غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(inventoryItemTypes)
      .where(
        and(
          eq(inventoryItemTypes.id, id),
          eq(inventoryItemTypes.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "النوع غير موجود" }, 404);
    }

    const body = (await getBody(c)) as Record<string, unknown>;

    if (body.subTypeKey && body.subTypeKey !== existing.subTypeKey) {
      const [existingKey] = await db
        .select({ id: inventoryItemTypes.id })
        .from(inventoryItemTypes)
        .where(
          and(
            eq(inventoryItemTypes.businessId, bizId),
            eq(inventoryItemTypes.subTypeKey, String(body.subTypeKey))
          )
        )
        .limit(1);

      if (existingKey) {
        return c.json({ error: "مفتاح النوع موجود مسبقاً" }, 400);
      }
    }

    const updatePayload: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (body.name !== undefined) updatePayload.name = String(body.name);
    if (body.subTypeKey !== undefined)
      updatePayload.subTypeKey = String(body.subTypeKey);
    if (body.description !== undefined)
      updatePayload.description = body.description;
    if (body.icon !== undefined) updatePayload.icon = String(body.icon);
    if (body.color !== undefined) updatePayload.color = String(body.color);
    if (body.sortOrder !== undefined) updatePayload.sortOrder = body.sortOrder;
    if (body.isActive !== undefined) updatePayload.isActive = body.isActive;

    const [updated] = await db
      .update(inventoryItemTypes)
      .set(updatePayload)
      .where(eq(inventoryItemTypes.id, id))
      .returning();

    return c.json(updated);
  })
);

inventoryItemTypesRoutes.delete(
  "/businesses/:bizId/inventory-item-types/:id",
  bizAuthMiddleware(),
  checkPermission("inventory", "delete"),
  safeHandler("حذف نوع صنف", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف النوع غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(inventoryItemTypes)
      .where(
        and(
          eq(inventoryItemTypes.id, id),
          eq(inventoryItemTypes.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "النوع غير موجود" }, 404);
    }

    await db
      .delete(inventoryItemTypes)
      .where(eq(inventoryItemTypes.id, id));

    return c.json({ success: true });
  })
);

export default inventoryItemTypesRoutes;
