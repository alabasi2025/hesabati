/**
 * settlements-read.routes.ts
 * قراءة المطابقات/التصفيات: جلب القائمة + التفاصيل مع LEFT JOIN accounts
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, asc, desc } from "drizzle-orm";
import {
  accounts,
  reconciliations,
  reconciliationItems,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler, parseId } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const settlementsReadRoutes = new Hono();

const RECON_TYPES = ["manager", "exchange", "accountant", "supplier", "custody"] as const;
const RECON_STATUSES = ["open", "in_progress", "completed", "disputed"] as const;
type ReconType = (typeof RECON_TYPES)[number];
type ReconStatus = (typeof RECON_STATUSES)[number];

function toReconType(value: unknown, fallback: ReconType): ReconType {
  return typeof value === "string" && (RECON_TYPES as readonly string[]).includes(value)
    ? (value as ReconType) : fallback;
}
function toReconStatus(value: unknown, fallback: ReconStatus): ReconStatus {
  return typeof value === "string" && (RECON_STATUSES as readonly string[]).includes(value)
    ? (value as ReconStatus) : fallback;
}

settlementsReadRoutes.get(
  "/businesses/:bizId/reconciliations",
  bizAuthMiddleware(),
  safeHandler("جلب المطابقات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const type = c.req.query("type");
    const status = c.req.query("status");

    const conditions: any[] = [eq(reconciliations.businessId, bizId)];
    if (type) {
      conditions.push(eq(reconciliations.reconciliationType, toReconType(type, "manager")));
    }
    if (status) {
      conditions.push(eq(reconciliations.status, toReconStatus(status, "open")));
    }

    const rows = await db
      .select({
        id: reconciliations.id,
        businessId: reconciliations.businessId,
        title: reconciliations.title,
        reconciliationType: reconciliations.reconciliationType,
        status: reconciliations.status,
        withPerson: reconciliations.withPerson,
        accountId: reconciliations.accountId,
        fundId: reconciliations.fundId,
        stationId: reconciliations.stationId,
        employeeId: reconciliations.employeeId,
        supplierId: reconciliations.supplierId,
        periodStart: reconciliations.periodStart,
        periodEnd: reconciliations.periodEnd,
        expectedAmount: reconciliations.expectedAmount,
        actualAmount: reconciliations.actualAmount,
        difference: reconciliations.difference,
        currencyId: reconciliations.currencyId,
        notes: reconciliations.notes,
        createdAt: reconciliations.createdAt,
        updatedAt: reconciliations.updatedAt,
        accountName: accounts.name,
        accountCode: accounts.code,
      })
      .from(reconciliations)
      .leftJoin(accounts, eq(reconciliations.accountId, accounts.id))
      .where(and(...conditions))
      .orderBy(desc(reconciliations.createdAt));

    return c.json(rows);
  }),
);

settlementsReadRoutes.get(
  "/businesses/:bizId/reconciliations/:id",
  bizAuthMiddleware(),
  safeHandler("جلب مطابقة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المطابقة غير صالح" }, 400);

    const [row] = await db
      .select({
        id: reconciliations.id,
        businessId: reconciliations.businessId,
        title: reconciliations.title,
        reconciliationType: reconciliations.reconciliationType,
        status: reconciliations.status,
        withPerson: reconciliations.withPerson,
        accountId: reconciliations.accountId,
        fundId: reconciliations.fundId,
        stationId: reconciliations.stationId,
        employeeId: reconciliations.employeeId,
        supplierId: reconciliations.supplierId,
        periodStart: reconciliations.periodStart,
        periodEnd: reconciliations.periodEnd,
        expectedAmount: reconciliations.expectedAmount,
        actualAmount: reconciliations.actualAmount,
        difference: reconciliations.difference,
        currencyId: reconciliations.currencyId,
        notes: reconciliations.notes,
        createdAt: reconciliations.createdAt,
        updatedAt: reconciliations.updatedAt,
        accountName: accounts.name,
        accountCode: accounts.code,
      })
      .from(reconciliations)
      .leftJoin(accounts, eq(reconciliations.accountId, accounts.id))
      .where(and(eq(reconciliations.id, id), eq(reconciliations.businessId, bizId)));
    if (!row) return c.json({ error: "المطابقة غير موجودة" }, 404);

    const items = await db
      .select()
      .from(reconciliationItems)
      .where(eq(reconciliationItems.reconciliationId, id))
      .orderBy(asc(reconciliationItems.id));

    return c.json({ ...row, items });
  }),
);

export { settlementsReadRoutes };
