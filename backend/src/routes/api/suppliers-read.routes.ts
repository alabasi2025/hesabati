/**
 * suppliers-read.routes.ts — Phase 12
 * قراءة الموردين: قائمة + تفاصيل مع join لنوع المورد والحساب
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and } from "drizzle-orm";
import { accounts, suppliers, supplierTypes } from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler, parseId } from "../../middleware/helpers.ts";
import {
  getPaginationParams,
  paginatedResult,
} from "../../middleware/pagination.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";
import { count } from "drizzle-orm";

const suppliersReadRoutes = new Hono();

const supplierSelect = {
  id: suppliers.id,
  name: suppliers.name,
  code: suppliers.code,
  sequenceNumber: suppliers.sequenceNumber,
  accountId: suppliers.accountId,
  supplierTypeId: suppliers.supplierTypeId,
  category: suppliers.category,
  phone: suppliers.phone,
  notes: suppliers.notes,
  isActive: suppliers.isActive,
  createdAt: suppliers.createdAt,
  // من نوع المورد
  typeName: supplierTypes.name,
  typeKey: supplierTypes.subTypeKey,
  typeIcon: supplierTypes.icon,
  typeColor: supplierTypes.color,
  // من حساب التحكم
  accountCode: accounts.code,
  accountName: accounts.name,
  accountLedgerCode: accounts.ledgerCode,
};

suppliersReadRoutes.get(
  "/businesses/:bizId/suppliers",
  bizAuthMiddleware(),
  safeHandler("جلب الموردين", async (c: AppContext) => {
    const bizId = getBizId(c);
    const usePagination = c.req.query("page") !== undefined;
    const typeKey = c.req.query("typeKey");
    const typeId = c.req.query("typeId") ? Number(c.req.query("typeId")) : null;

    const buildWhere = () => {
      const conditions = [eq(suppliers.businessId, bizId)];
      if (typeId) conditions.push(eq(suppliers.supplierTypeId, typeId));
      return conditions.length === 1
        ? conditions[0]
        : and(...(conditions as [any, ...any[]]));
    };

    if (usePagination) {
      const params = getPaginationParams(c);
      const [{ total }] = await db
        .select({ total: count() })
        .from(suppliers)
        .where(buildWhere());
      const rows = await db
        .select(supplierSelect)
        .from(suppliers)
        .leftJoin(supplierTypes, eq(supplierTypes.id, suppliers.supplierTypeId))
        .leftJoin(accounts, eq(accounts.id, suppliers.accountId))
        .where(buildWhere())
        .orderBy(suppliers.supplierTypeId, suppliers.sequenceNumber)
        .limit(params.limit)
        .offset(params.offset);
      return c.json(paginatedResult(rows, total, params));
    }

    const rows = await db
      .select(supplierSelect)
      .from(suppliers)
      .leftJoin(supplierTypes, eq(supplierTypes.id, suppliers.supplierTypeId))
      .leftJoin(accounts, eq(accounts.id, suppliers.accountId))
      .where(buildWhere())
      .orderBy(suppliers.supplierTypeId, suppliers.sequenceNumber);
    return c.json(rows);
  }),
);

suppliersReadRoutes.get(
  "/businesses/:bizId/suppliers/:id",
  bizAuthMiddleware(),
  safeHandler("جلب تفاصيل مورد", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المورد غير صالح" }, 400);

    const [row] = await db
      .select(supplierSelect)
      .from(suppliers)
      .leftJoin(supplierTypes, eq(supplierTypes.id, suppliers.supplierTypeId))
      .leftJoin(accounts, eq(accounts.id, suppliers.accountId))
      .where(and(eq(suppliers.id, id), eq(suppliers.businessId, bizId)))
      .limit(1);

    if (!row) return c.json({ error: "مورد غير موجود" }, 404);
    return c.json(row);
  }),
);

export { suppliersReadRoutes };
