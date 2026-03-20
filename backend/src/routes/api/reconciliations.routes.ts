/**
 * المطابقات - Reconciliations Routes
 * إدارة المطابقات وبنودها
 */

import { Hono } from "hono";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import {
  reconciliations,
  reconciliationItems,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { parseId, safeHandler, getBody } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const reconciliationsRoutes = new Hono();
const RECON_TYPES = [
  "manager",
  "exchange",
  "accountant",
  "supplier",
  "custody",
] as const;
const RECON_STATUSES = ["open", "in_progress", "completed", "disputed"] as const;
type ReconType = (typeof RECON_TYPES)[number];
type ReconStatus = (typeof RECON_STATUSES)[number];

function toReconType(value: unknown, fallback: ReconType): ReconType {
  return typeof value === "string" &&
    (RECON_TYPES as readonly string[]).includes(value)
    ? (value as ReconType)
    : fallback;
}
function toReconStatus(value: unknown, fallback: ReconStatus): ReconStatus {
  return typeof value === "string" &&
    (RECON_STATUSES as readonly string[]).includes(value)
    ? (value as ReconStatus)
    : fallback;
}

reconciliationsRoutes.get(
  "/businesses/:bizId/reconciliations",
  bizAuthMiddleware(),
  safeHandler("جلب المطابقات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const type = c.req.query("type");
    const status = c.req.query("status");

    const conditions = [eq(reconciliations.businessId, bizId)];
    if (type) {
      conditions.push(eq(reconciliations.reconciliationType, toReconType(type, "manager")));
    }
    if (status) {
      conditions.push(eq(reconciliations.status, toReconStatus(status, "open")));
    }

    const rows = await db
      .select()
      .from(reconciliations)
      .where(and(...conditions))
      .orderBy(desc(reconciliations.createdAt));

    return c.json(rows);
  }),
);

reconciliationsRoutes.get(
  "/businesses/:bizId/reconciliations/:id",
  bizAuthMiddleware(),
  safeHandler("جلب مطابقة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المطابقة غير صالح" }, 400);

    const [row] = await db
      .select()
      .from(reconciliations)
      .where(
        and(eq(reconciliations.id, id), eq(reconciliations.businessId, bizId)),
      );
    if (!row) return c.json({ error: "المطابقة غير موجودة" }, 404);

    const items = await db
      .select()
      .from(reconciliationItems)
      .where(eq(reconciliationItems.reconciliationId, id))
      .orderBy(asc(reconciliationItems.id));

    return c.json({ ...row, items });
  }),
);

reconciliationsRoutes.post(
  "/businesses/:bizId/reconciliations",
  bizAuthMiddleware(),
  checkPermission("accounts", "create"),
  safeHandler("إنشاء مطابقة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    const title = typeof body.title === "string" ? body.title.trim() : "";
    if (!title) return c.json({ error: "عنوان المطابقة مطلوب" }, 400);

    const expectedAmount =
      body.expectedAmount === undefined || body.expectedAmount === null
        ? null
        : String(body.expectedAmount);
    const actualAmount =
      body.actualAmount === undefined || body.actualAmount === null
        ? null
        : String(body.actualAmount);
    const difference =
      expectedAmount === null || actualAmount === null
        ? null
        : String(Number(actualAmount) - Number(expectedAmount));

    const [created] = await db
      .insert(reconciliations)
      .values({
        businessId: bizId,
        title,
        reconciliationType: toReconType(body.reconciliationType, "manager"),
        status: toReconStatus(body.status, "open"),
        withPerson: body.withPerson ? String(body.withPerson) : null,
        accountId: typeof body.accountId === "number" ? body.accountId : null,
        fundId: typeof body.fundId === "number" ? body.fundId : null,
        stationId: typeof body.stationId === "number" ? body.stationId : null,
        employeeId:
          typeof body.employeeId === "number" ? body.employeeId : null,
        supplierId:
          typeof body.supplierId === "number" ? body.supplierId : null,
        periodStart: body.periodStart ? String(body.periodStart) : null,
        periodEnd: body.periodEnd ? String(body.periodEnd) : null,
        expectedAmount,
        actualAmount,
        difference,
        currencyId:
          typeof body.currencyId === "number" ? body.currencyId : null,
        notes: body.notes ? String(body.notes) : null,
      })
      .returning();

    return c.json(created, 201);
  }),
);

reconciliationsRoutes.put(
  "/businesses/:bizId/reconciliations/:id",
  bizAuthMiddleware(),
  checkPermission("accounts", "update"),
  safeHandler("تعديل مطابقة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المطابقة غير صالح" }, 400);

    const [existing] = await db
      .select({ id: reconciliations.id })
      .from(reconciliations)
      .where(
        and(eq(reconciliations.id, id), eq(reconciliations.businessId, bizId)),
      )
      .limit(1);
    if (!existing) return c.json({ error: "المطابقة غير موجودة" }, 404);

    const body = (await getBody(c)) as Record<string, unknown>;
    const updatePayload: Record<string, unknown> = { updatedAt: new Date() };

    if (body.title !== undefined) updatePayload.title = String(body.title);
    if (body.reconciliationType !== undefined) {
      updatePayload.reconciliationType = toReconType(
        body.reconciliationType,
        "manager",
      );
    }
    if (body.status !== undefined) {
      updatePayload.status = toReconStatus(body.status, "open");
    }
    if (body.withPerson !== undefined) updatePayload.withPerson = body.withPerson;
    if (body.accountId !== undefined) updatePayload.accountId = body.accountId;
    if (body.fundId !== undefined) updatePayload.fundId = body.fundId;
    if (body.stationId !== undefined) updatePayload.stationId = body.stationId;
    if (body.employeeId !== undefined) {
      updatePayload.employeeId = body.employeeId;
    }
    if (body.supplierId !== undefined) {
      updatePayload.supplierId = body.supplierId;
    }
    if (body.periodStart !== undefined) {
      updatePayload.periodStart = body.periodStart;
    }
    if (body.periodEnd !== undefined) updatePayload.periodEnd = body.periodEnd;
    if (body.expectedAmount !== undefined) {
      updatePayload.expectedAmount =
        body.expectedAmount === null ? null : String(body.expectedAmount);
    }
    if (body.actualAmount !== undefined) {
      updatePayload.actualAmount =
        body.actualAmount === null ? null : String(body.actualAmount);
    }
    if (body.currencyId !== undefined) updatePayload.currencyId = body.currencyId;
    if (body.notes !== undefined) updatePayload.notes = body.notes;

    if (
      updatePayload.expectedAmount !== undefined ||
      updatePayload.actualAmount !== undefined
    ) {
      const nextExpected =
        updatePayload.expectedAmount !== undefined
          ? updatePayload.expectedAmount
          : (await db
              .select({ expectedAmount: reconciliations.expectedAmount })
              .from(reconciliations)
              .where(eq(reconciliations.id, id))
              .then((r) => r[0]?.expectedAmount ?? null));
      const nextActual =
        updatePayload.actualAmount !== undefined
          ? updatePayload.actualAmount
          : (await db
              .select({ actualAmount: reconciliations.actualAmount })
              .from(reconciliations)
              .where(eq(reconciliations.id, id))
              .then((r) => r[0]?.actualAmount ?? null));
      updatePayload.difference =
        nextExpected == null || nextActual == null
          ? null
          : String(Number(nextActual) - Number(nextExpected));
    }

    const [updated] = await db
      .update(reconciliations)
      .set(updatePayload)
      .where(eq(reconciliations.id, id))
      .returning();

    return c.json(updated);
  }),
);

reconciliationsRoutes.delete(
  "/businesses/:bizId/reconciliations/:id",
  bizAuthMiddleware(),
  checkPermission("accounts", "delete"),
  safeHandler("حذف مطابقة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المطابقة غير صالح" }, 400);

    const [existing] = await db
      .select({ id: reconciliations.id })
      .from(reconciliations)
      .where(
        and(eq(reconciliations.id, id), eq(reconciliations.businessId, bizId)),
      )
      .limit(1);
    if (!existing) return c.json({ error: "المطابقة غير موجودة" }, 404);

    await db
      .delete(reconciliationItems)
      .where(eq(reconciliationItems.reconciliationId, id));
    await db.delete(reconciliations).where(eq(reconciliations.id, id));
    return c.json({ success: true });
  }),
);

reconciliationsRoutes.post(
  "/businesses/:bizId/reconciliations/:id/items",
  bizAuthMiddleware(),
  checkPermission("accounts", "update"),
  safeHandler("إضافة بند مطابقة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المطابقة غير صالح" }, 400);

    const [existing] = await db
      .select({ id: reconciliations.id })
      .from(reconciliations)
      .where(
        and(eq(reconciliations.id, id), eq(reconciliations.businessId, bizId)),
      )
      .limit(1);
    if (!existing) return c.json({ error: "المطابقة غير موجودة" }, 404);

    const body = (await getBody(c)) as Record<string, unknown>;
    const [item] = await db
      .insert(reconciliationItems)
      .values({
        reconciliationId: id,
        voucherId: typeof body.voucherId === "number" ? body.voucherId : null,
        externalDate: body.externalDate ? String(body.externalDate) : null,
        externalAmount: body.externalAmount ? String(body.externalAmount) : null,
        externalDescription: body.externalDescription
          ? String(body.externalDescription)
          : null,
        externalReference: body.externalReference
          ? String(body.externalReference)
          : null,
        matchStatus: body.matchStatus ? String(body.matchStatus) : "unmatched_external",
        matchedAt: body.matchedAt ? new Date(String(body.matchedAt)) : null,
        notes: body.notes ? String(body.notes) : null,
      })
      .returning();

    return c.json(item, 201);
  }),
);

export default reconciliationsRoutes;
