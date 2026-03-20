/**
 * أنواع الموردين - Supplier Types Routes
 * إدارة تصنيفات الموردين
 */

import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, asc } from "drizzle-orm";
import { supplierTypes } from "../../db/schema/index.ts";
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

const supplierTypesRoutes = new Hono();

supplierTypesRoutes.get(
  "/businesses/:bizId/supplier-types",
  bizAuthMiddleware(),
  safeHandler("جلب أنواع الموردين", async (c: AppContext) => {
    const bizId = getBizId(c);

    const types = await db
      .select({
        id: supplierTypes.id,
        name: supplierTypes.name,
        subTypeKey: supplierTypes.subTypeKey,
        sequenceNumber: supplierTypes.sequenceNumber,
        description: supplierTypes.description,
        icon: supplierTypes.icon,
        color: supplierTypes.color,
        sortOrder: supplierTypes.sortOrder,
        isActive: supplierTypes.isActive,
        createdAt: supplierTypes.createdAt,
      })
      .from(supplierTypes)
      .where(eq(supplierTypes.businessId, bizId))
      .orderBy(asc(supplierTypes.sortOrder), asc(supplierTypes.name));

    return c.json(types);
  })
);

supplierTypesRoutes.get(
  "/businesses/:bizId/supplier-types/:id",
  bizAuthMiddleware(),
  safeHandler("جلب تفاصيل نوع مورد", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف النوع غير صالح" }, 400);

    const [type] = await db
      .select()
      .from(supplierTypes)
      .where(
        and(
          eq(supplierTypes.id, id),
          eq(supplierTypes.businessId, bizId)
        )
      );

    if (!type) {
      return c.json({ error: "النوع غير موجود" }, 404);
    }

    return c.json(type);
  })
);

supplierTypesRoutes.post(
  "/businesses/:bizId/supplier-types",
  bizAuthMiddleware(),
  checkPermission("suppliers", "create"),
  safeHandler("إنشاء نوع مورد", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    if (!body.name) {
      return c.json({ error: "اسم النوع مطلوب" }, 400);
    }
    if (!body.subTypeKey) {
      return c.json({ error: "مفتاح النوع مطلوب" }, 400);
    }

    const [existingKey] = await db
      .select({ id: supplierTypes.id })
      .from(supplierTypes)
      .where(
        and(
          eq(supplierTypes.businessId, bizId),
          eq(supplierTypes.subTypeKey, String(body.subTypeKey))
        )
      )
      .limit(1);

    if (existingKey) {
      return c.json({ error: "مفتاح النوع موجود مسبقاً" }, 400);
    }

    const seqNum = await getNextSequence(bizId, "supplier_type", 0);

    const [created] = await db
      .insert(supplierTypes)
      .values({
        businessId: bizId,
        name: String(body.name),
        subTypeKey: String(body.subTypeKey),
        sequenceNumber: seqNum,
        description: body.description ? String(body.description) : null,
        icon: body.icon ? String(body.icon) : "local_shipping",
        color: body.color ? String(body.color) : "#f97316",
        sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
        isActive: body.isActive !== false,
      })
      .returning();

    return c.json(created, 201);
  })
);

supplierTypesRoutes.put(
  "/businesses/:bizId/supplier-types/:id",
  bizAuthMiddleware(),
  checkPermission("suppliers", "update"),
  safeHandler("تعديل نوع مورد", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف النوع غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(supplierTypes)
      .where(
        and(
          eq(supplierTypes.id, id),
          eq(supplierTypes.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "النوع غير موجود" }, 404);
    }

    const body = (await getBody(c)) as Record<string, unknown>;

    if (body.subTypeKey && body.subTypeKey !== existing.subTypeKey) {
      const [existingKey] = await db
        .select({ id: supplierTypes.id })
        .from(supplierTypes)
        .where(
          and(
            eq(supplierTypes.businessId, bizId),
            eq(supplierTypes.subTypeKey, String(body.subTypeKey))
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
      .update(supplierTypes)
      .set(updatePayload)
      .where(eq(supplierTypes.id, id))
      .returning();

    return c.json(updated);
  })
);

supplierTypesRoutes.delete(
  "/businesses/:bizId/supplier-types/:id",
  bizAuthMiddleware(),
  checkPermission("suppliers", "delete"),
  safeHandler("حذف نوع مورد", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف النوع غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(supplierTypes)
      .where(
        and(
          eq(supplierTypes.id, id),
          eq(supplierTypes.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "النوع غير موجود" }, 404);
    }

    await db.delete(supplierTypes).where(eq(supplierTypes.id, id));

    return c.json({ success: true });
  })
);

export default supplierTypesRoutes;
