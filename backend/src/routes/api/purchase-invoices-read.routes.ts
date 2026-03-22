/**
 * purchase-invoices-read.routes.ts — Phase 9
 * قراءة فواتير المشتريات: جلب القائمة + جلب بالمعرف
 */
/**
 * فواتير المشتريات - Purchase Invoices Routes
 * إدارة فواتير المشتريات مع ربطها بالمخزون والموردين
 */

import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, desc, sql, inArray } from "drizzle-orm";
import {
  purchaseInvoices,
  purchaseInvoiceItems,
  suppliers,
  warehouses,
  currencies,
  inventoryItems,
  accounts,
  vouchers,
  warehouseOperations,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import {
  safeHandler,
  parseId,
} from "../../middleware/helpers.ts";
import {
  getNextPurchaseInvoiceSequence,
} from "../../middleware/sequencing.ts";
import { processStockMovement } from "../../services/inventory.service.ts";
import { getBizId, getUserId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const purchaseInvoicesRoutes = new Hono();


purchaseInvoicesRoutes.get(
  "/businesses/:bizId/purchase-invoices",
  bizAuthMiddleware(),
  safeHandler("جلب فواتير المشتريات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const status = c.req.query("status");
    const supplierId = c.req.query("supplierId");

    let query = db
      .select({
        id: purchaseInvoices.id,
        invoiceNumber: purchaseInvoices.invoiceNumber,
        fullSequenceNumber: purchaseInvoices.fullSequenceNumber,
        supplierId: purchaseInvoices.supplierId,
        supplierName: suppliers.name,
        warehouseId: purchaseInvoices.warehouseId,
        warehouseName: warehouses.name,
        currencyId: purchaseInvoices.currencyId,
        currencyCode: currencies.code,
        subtotal: purchaseInvoices.subtotal,
        tax: purchaseInvoices.tax,
        discount: purchaseInvoices.discount,
        totalAmount: purchaseInvoices.totalAmount,
        paidAmount: purchaseInvoices.paidAmount,
        remainingAmount: purchaseInvoices.remainingAmount,
        paymentMethod: purchaseInvoices.paymentMethod,
        status: purchaseInvoices.status,
        receivedStatus: purchaseInvoices.receivedStatus,
        invoiceDate: purchaseInvoices.invoiceDate,
        dueDate: purchaseInvoices.dueDate,
        externalReference: purchaseInvoices.externalReference,
        notes: purchaseInvoices.notes,
        createdAt: purchaseInvoices.createdAt,
      })
      .from(purchaseInvoices)
      .leftJoin(suppliers, eq(purchaseInvoices.supplierId, suppliers.id))
      .leftJoin(warehouses, eq(purchaseInvoices.warehouseId, warehouses.id))
      .leftJoin(currencies, eq(purchaseInvoices.currencyId, currencies.id))
      .where(eq(purchaseInvoices.businessId, bizId))
      .orderBy(desc(purchaseInvoices.createdAt))
      .$dynamic();

    if (status) {
      query = query.where(
        and(
          eq(purchaseInvoices.businessId, bizId),
          eq(purchaseInvoices.status, status as any)
        )
      );
    }

    if (supplierId) {
      const sid = parseInt(supplierId, 10);
      if (!isNaN(sid)) {
        query = query.where(
          and(
            eq(purchaseInvoices.businessId, bizId),
            eq(purchaseInvoices.supplierId, sid)
          )
        );
      }
    }

    const rows = await query;
    return c.json(rows);
  })
);

purchaseInvoicesRoutes.get(
  "/businesses/:bizId/purchase-invoices/:id",
  bizAuthMiddleware(),
  safeHandler("جلب تفاصيل فاتورة مشتريات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الفاتورة غير صالح" }, 400);

    const [invoice] = await db
      .select({
        id: purchaseInvoices.id,
        invoiceNumber: purchaseInvoices.invoiceNumber,
        fullSequenceNumber: purchaseInvoices.fullSequenceNumber,
        supplierId: purchaseInvoices.supplierId,
        supplierAccountId: purchaseInvoices.supplierAccountId,
        warehouseId: purchaseInvoices.warehouseId,
        currencyId: purchaseInvoices.currencyId,
        subtotal: purchaseInvoices.subtotal,
        tax: purchaseInvoices.tax,
        discount: purchaseInvoices.discount,
        totalAmount: purchaseInvoices.totalAmount,
        paidAmount: purchaseInvoices.paidAmount,
        remainingAmount: purchaseInvoices.remainingAmount,
        paymentMethod: purchaseInvoices.paymentMethod,
        status: purchaseInvoices.status,
        receivedStatus: purchaseInvoices.receivedStatus,
        receivedQuantity: purchaseInvoices.receivedQuantity,
        invoiceDate: purchaseInvoices.invoiceDate,
        dueDate: purchaseInvoices.dueDate,
        externalReference: purchaseInvoices.externalReference,
        notes: purchaseInvoices.notes,
        voucherId: purchaseInvoices.voucherId,
        warehouseOperationId: purchaseInvoices.warehouseOperationId,
        createdAt: purchaseInvoices.createdAt,
        updatedAt: purchaseInvoices.updatedAt,
      })
      .from(purchaseInvoices)
      .where(
        and(
          eq(purchaseInvoices.id, id),
          eq(purchaseInvoices.businessId, bizId)
        )
      );

    if (!invoice) {
      return c.json({ error: "الفاتورة غير موجودة" }, 404);
    }

    const items = await db
      .select({
        id: purchaseInvoiceItems.id,
        inventoryItemId: purchaseInvoiceItems.inventoryItemId,
        itemName: inventoryItems.name,
        itemCode: inventoryItems.code,
        quantity: purchaseInvoiceItems.quantity,
        unitCost: purchaseInvoiceItems.unitCost,
        totalCost: purchaseInvoiceItems.totalCost,
        tax: purchaseInvoiceItems.tax,
        discount: purchaseInvoiceItems.discount,
        receivedQuantity: purchaseInvoiceItems.receivedQuantity,
        notes: purchaseInvoiceItems.notes,
      })
      .from(purchaseInvoiceItems)
      .leftJoin(inventoryItems, eq(purchaseInvoiceItems.inventoryItemId, inventoryItems.id))
      .where(eq(purchaseInvoiceItems.invoiceId, id))
      .orderBy(purchaseInvoiceItems.sortOrder);

    return c.json({ ...invoice, items });
  })
);


export { purchaseInvoicesRoutes as purchaseInvoicesReadRoutes };
