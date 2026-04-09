/**
 * warehouses-read.routes.ts
 * قراءة المخازن: جلب القائمة مع LEFT JOIN accounts
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, sql } from "drizzle-orm";
import { accounts, warehouses } from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler, parseId } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import { requireResourceOwnership } from "./_shared/ownership.ts";
import type { AppContext } from "./_shared/types.ts";

const warehousesReadRoutes = new Hono();

warehousesReadRoutes.get(
  "/businesses/:bizId/warehouses",
  bizAuthMiddleware(),
  safeHandler("جلب المخازن", async (c: AppContext) => {
    const bizId = getBizId(c);
    const includeCustody = c.req.query("includeCustody") === "true";
    const whereCondition = includeCustody
      ? eq(warehouses.businessId, bizId)
      : and(
          eq(warehouses.businessId, bizId),
          sql`${warehouses.warehouseType}::text <> 'custody'`,
        );
    const rows = await db
      .select({
        id: warehouses.id,
        businessId: warehouses.businessId,
        name: warehouses.name,
        accountId: warehouses.accountId,
        warehouseType: warehouses.warehouseType,
        sequenceNumber: warehouses.sequenceNumber,
        code: warehouses.code,
        stationId: warehouses.stationId,
        responsiblePerson: warehouses.responsiblePerson,
        location: warehouses.location,
        isActive: warehouses.isActive,
        notes: warehouses.notes,
        createdAt: warehouses.createdAt,
        updatedAt: warehouses.updatedAt,
        accountCode: accounts.code,
        accountName: accounts.name,
        accountCode: accounts.code,
      })
      .from(warehouses)
      .leftJoin(accounts, eq(accounts.id, warehouses.accountId))
      .where(whereCondition)
      .orderBy(warehouses.id);
    return c.json(rows);
  }),
);

warehousesReadRoutes.get(
  "/warehouses/:id",
  safeHandler("جلب مخزن بالمعرّف", async (c: AppContext) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المخزن غير صالح" }, 400);
    const [warehouse] = await db
      .select({
        id: warehouses.id,
        businessId: warehouses.businessId,
        name: warehouses.name,
        accountId: warehouses.accountId,
        warehouseType: warehouses.warehouseType,
        sequenceNumber: warehouses.sequenceNumber,
        code: warehouses.code,
        stationId: warehouses.stationId,
        responsiblePerson: warehouses.responsiblePerson,
        location: warehouses.location,
        isActive: warehouses.isActive,
        notes: warehouses.notes,
        createdAt: warehouses.createdAt,
        updatedAt: warehouses.updatedAt,
        accountCode: accounts.code,
        accountName: accounts.name,
        accountCode: accounts.code,
      })
      .from(warehouses)
      .leftJoin(accounts, eq(accounts.id, warehouses.accountId))
      .where(eq(warehouses.id, id));
    const err = await requireResourceOwnership(c, warehouse ?? null);
    if (err) return err;
    return c.json(warehouse);
  }),
);

export { warehousesReadRoutes };
