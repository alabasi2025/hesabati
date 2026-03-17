/**
 * الأقسام - Departments Routes
 * إدارة أقسام المنشأة
 */

import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, asc } from "drizzle-orm";
import { departments } from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import {
  safeHandler,
  normalizeBody,
  parseId,
} from "../../middleware/helpers.ts";
import {
  getNextSequence,
  generateItemCode,
} from "../../middleware/sequencing.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";
import { auditCreate, auditUpdate, auditDelete, makeAuditCtx } from '../../engines/audit-middleware.engine.ts';

const departmentsRoutes = new Hono();

departmentsRoutes.get(
  "/businesses/:bizId/departments",
  bizAuthMiddleware(),
  safeHandler("جلب الأقسام", async (c: AppContext) => {
    const bizId = getBizId(c);

    const depts = await db
      .select({
        id: departments.id,
        name: departments.name,
        code: departments.code,
        sequenceNumber: departments.sequenceNumber,
        managerId: departments.managerId,
        description: departments.description,
        icon: departments.icon,
        color: departments.color,
        sortOrder: departments.sortOrder,
        isActive: departments.isActive,
        createdAt: departments.createdAt,
      })
      .from(departments)
      .where(eq(departments.businessId, bizId))
      .orderBy(asc(departments.sortOrder), asc(departments.name));

    return c.json(depts);
  })
);

departmentsRoutes.get(
  "/businesses/:bizId/departments/:id",
  bizAuthMiddleware(),
  safeHandler("جلب تفاصيل قسم", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف القسم غير صالح" }, 400);

    const [dept] = await db
      .select()
      .from(departments)
      .where(
        and(
          eq(departments.id, id),
          eq(departments.businessId, bizId)
        )
      );

    if (!dept) {
      return c.json({ error: "القسم غير موجود" }, 404);
    }

    return c.json(dept);
  })
);

departmentsRoutes.post(
  "/businesses/:bizId/departments",
  bizAuthMiddleware(),
  checkPermission("employees", "create"),
  safeHandler("إنشاء قسم", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;

    if (!body.name) {
      return c.json({ error: "اسم القسم مطلوب" }, 400);
    }

    const seqNum = await getNextSequence(bizId, "department", 0);
    const code = body.code
      ? String(body.code)
      : generateItemCode("DPT", seqNum);

    const [created] = await db
      .insert(departments)
      .values({
        businessId: bizId,
        name: String(body.name),
        code,
        sequenceNumber: seqNum,
        managerId: typeof body.managerId === "number" ? body.managerId : null,
        description: body.description ? String(body.description) : null,
        icon: body.icon ? String(body.icon) : "groups",
        color: body.color ? String(body.color) : "#06b6d4",
        sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
        isActive: body.isActive !== false,
      })
      .returning();

    return c.json(created, 201);
  })
);

departmentsRoutes.put(
  "/businesses/:bizId/departments/:id",
  bizAuthMiddleware(),
  checkPermission("employees", "update"),
  safeHandler("تعديل قسم", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف القسم غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(departments)
      .where(
        and(
          eq(departments.id, id),
          eq(departments.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "القسم غير موجود" }, 404);
    }

    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;

    if (body.code && body.code !== existing.code) {
      const [existingCode] = await db
        .select({ id: departments.id })
        .from(departments)
        .where(
          and(
            eq(departments.businessId, bizId),
            eq(departments.code, String(body.code))
          )
        )
        .limit(1);

      if (existingCode) {
        return c.json({ error: "كود القسم موجود مسبقاً" }, 400);
      }
    }

    const updatePayload: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (body.name !== undefined) updatePayload.name = String(body.name);
    if (body.code !== undefined) updatePayload.code = String(body.code);
    if (body.managerId !== undefined) updatePayload.managerId = body.managerId;
    if (body.description !== undefined)
      updatePayload.description = body.description;
    if (body.icon !== undefined) updatePayload.icon = String(body.icon);
    if (body.color !== undefined) updatePayload.color = String(body.color);
    if (body.sortOrder !== undefined) updatePayload.sortOrder = body.sortOrder;
    if (body.isActive !== undefined) updatePayload.isActive = body.isActive;

    const [updated] = await db
      .update(departments)
      .set(updatePayload)
      .where(eq(departments.id, id))
      .returning();

    return c.json(updated);
  })
);

departmentsRoutes.delete(
  "/businesses/:bizId/departments/:id",
  bizAuthMiddleware(),
  checkPermission("employees", "delete"),
  safeHandler("حذف قسم", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف القسم غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(departments)
      .where(
        and(
          eq(departments.id, id),
          eq(departments.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "القسم غير موجود" }, 404);
    }

    await db.delete(departments).where(eq(departments.id, id));

    return c.json({ success: true });
  })
);

export default departmentsRoutes;
