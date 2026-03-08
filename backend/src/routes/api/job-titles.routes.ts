/**
 * المسميات الوظيفية - Job Titles Routes
 * إدارة المسميات الوظيفية للموظفين
 */

import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, asc } from "drizzle-orm";
import { jobTitles } from "../../db/schema/index.ts";
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

const jobTitlesRoutes = new Hono();

jobTitlesRoutes.get(
  "/businesses/:bizId/job-titles",
  bizAuthMiddleware(),
  safeHandler("جلب المسميات الوظيفية", async (c: AppContext) => {
    const bizId = getBizId(c);

    const titles = await db
      .select({
        id: jobTitles.id,
        name: jobTitles.name,
        sequenceNumber: jobTitles.sequenceNumber,
        description: jobTitles.description,
        icon: jobTitles.icon,
        color: jobTitles.color,
        sortOrder: jobTitles.sortOrder,
        isActive: jobTitles.isActive,
        createdAt: jobTitles.createdAt,
      })
      .from(jobTitles)
      .where(eq(jobTitles.businessId, bizId))
      .orderBy(asc(jobTitles.sortOrder), asc(jobTitles.name));

    return c.json(titles);
  })
);

jobTitlesRoutes.get(
  "/businesses/:bizId/job-titles/:id",
  bizAuthMiddleware(),
  safeHandler("جلب تفاصيل مسمى وظيفي", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المسمى غير صالح" }, 400);

    const [title] = await db
      .select()
      .from(jobTitles)
      .where(
        and(
          eq(jobTitles.id, id),
          eq(jobTitles.businessId, bizId)
        )
      );

    if (!title) {
      return c.json({ error: "المسمى الوظيفي غير موجود" }, 404);
    }

    return c.json(title);
  })
);

jobTitlesRoutes.post(
  "/businesses/:bizId/job-titles",
  bizAuthMiddleware(),
  checkPermission("employees", "create"),
  safeHandler("إنشاء مسمى وظيفي", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;

    if (!body.name) {
      return c.json({ error: "اسم المسمى الوظيفي مطلوب" }, 400);
    }

    const seqNum = await getNextSequence(bizId, "job_title", 0);

    const [created] = await db
      .insert(jobTitles)
      .values({
        businessId: bizId,
        name: String(body.name),
        sequenceNumber: seqNum,
        description: body.description ? String(body.description) : null,
        icon: body.icon ? String(body.icon) : "badge",
        color: body.color ? String(body.color) : "#8b5cf6",
        sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
        isActive: body.isActive !== false,
      })
      .returning();

    return c.json(created, 201);
  })
);

jobTitlesRoutes.put(
  "/businesses/:bizId/job-titles/:id",
  bizAuthMiddleware(),
  checkPermission("employees", "update"),
  safeHandler("تعديل مسمى وظيفي", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المسمى غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(jobTitles)
      .where(
        and(
          eq(jobTitles.id, id),
          eq(jobTitles.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "المسمى الوظيفي غير موجود" }, 404);
    }

    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;

    const updatePayload: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (body.name !== undefined) updatePayload.name = String(body.name);
    if (body.description !== undefined)
      updatePayload.description = body.description;
    if (body.icon !== undefined) updatePayload.icon = String(body.icon);
    if (body.color !== undefined) updatePayload.color = String(body.color);
    if (body.sortOrder !== undefined) updatePayload.sortOrder = body.sortOrder;
    if (body.isActive !== undefined) updatePayload.isActive = body.isActive;

    const [updated] = await db
      .update(jobTitles)
      .set(updatePayload)
      .where(eq(jobTitles.id, id))
      .returning();

    return c.json(updated);
  })
);

jobTitlesRoutes.delete(
  "/businesses/:bizId/job-titles/:id",
  bizAuthMiddleware(),
  checkPermission("employees", "delete"),
  safeHandler("حذف مسمى وظيفي", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المسمى غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(jobTitles)
      .where(
        and(
          eq(jobTitles.id, id),
          eq(jobTitles.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "المسمى الوظيفي غير موجود" }, 404);
    }

    await db.delete(jobTitles).where(eq(jobTitles.id, id));

    return c.json({ success: true });
  })
);

export default jobTitlesRoutes;
