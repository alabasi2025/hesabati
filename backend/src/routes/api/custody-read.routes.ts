/**
 * custody-read.routes.ts
 * قراءة سجلات العهد: جلب القائمة + التفاصيل مع LEFT JOIN accounts
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, desc } from "drizzle-orm";
import {
  accounts,
  custodyRecords,
  custodySettlements,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler, parseId } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const custodyReadRoutes = new Hono();

custodyReadRoutes.get(
  "/businesses/:bizId/custody",
  bizAuthMiddleware(),
  safeHandler("جلب سجلات العهد", async (c: AppContext) => {
    const bizId = getBizId(c);
    const custodyType = c.req.query("custodyType");
    const status = c.req.query("status");
    const partyType = c.req.query("partyType");

    const conditions: any[] = [eq(custodyRecords.businessId, bizId)];

    if (custodyType) {
      conditions.push(eq(custodyRecords.custodyType, custodyType));
    }
    if (status) {
      conditions.push(eq(custodyRecords.status, status));
    }
    if (partyType) {
      conditions.push(eq(custodyRecords.partyType, partyType));
    }

    const records = await db
      .select({
        id: custodyRecords.id,
        accountId: custodyRecords.accountId,
        custodyNumber: custodyRecords.custodyNumber,
        custodyType: custodyRecords.custodyType,
        contentType: custodyRecords.contentType,
        partyName: custodyRecords.partyName,
        partyType: custodyRecords.partyType,
        employeeId: custodyRecords.employeeId,
        supplierId: custodyRecords.supplierId,
        fundId: custodyRecords.fundId,
        warehouseId: custodyRecords.warehouseId,
        description: custodyRecords.description,
        status: custodyRecords.status,
        createdBy: custodyRecords.createdBy,
        createdAt: custodyRecords.createdAt,
        accountName: accounts.name,
        accountCode: accounts.code,
      })
      .from(custodyRecords)
      .leftJoin(accounts, eq(custodyRecords.accountId, accounts.id))
      .where(and(...conditions))
      .orderBy(desc(custodyRecords.createdAt));

    return c.json(records);
  })
);

custodyReadRoutes.get(
  "/businesses/:bizId/custody/:id",
  bizAuthMiddleware(),
  safeHandler("جلب تفاصيل عهدة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف العهدة غير صالح" }, 400);

    const [record] = await db
      .select({
        id: custodyRecords.id,
        businessId: custodyRecords.businessId,
        accountId: custodyRecords.accountId,
        custodyNumber: custodyRecords.custodyNumber,
        custodyType: custodyRecords.custodyType,
        contentType: custodyRecords.contentType,
        partyName: custodyRecords.partyName,
        partyType: custodyRecords.partyType,
        employeeId: custodyRecords.employeeId,
        supplierId: custodyRecords.supplierId,
        fundId: custodyRecords.fundId,
        warehouseId: custodyRecords.warehouseId,
        description: custodyRecords.description,
        status: custodyRecords.status,
        createdBy: custodyRecords.createdBy,
        createdAt: custodyRecords.createdAt,
        updatedAt: custodyRecords.updatedAt,
        accountName: accounts.name,
        accountCode: accounts.code,
      })
      .from(custodyRecords)
      .leftJoin(accounts, eq(custodyRecords.accountId, accounts.id))
      .where(
        and(
          eq(custodyRecords.id, id),
          eq(custodyRecords.businessId, bizId)
        )
      );

    if (!record) {
      return c.json({ error: "العهدة غير موجودة" }, 404);
    }

    const settlements = await db
      .select()
      .from(custodySettlements)
      .where(eq(custodySettlements.custodyId, id))
      .orderBy(desc(custodySettlements.createdAt));

    return c.json({ ...record, settlements });
  })
);

export { custodyReadRoutes };
