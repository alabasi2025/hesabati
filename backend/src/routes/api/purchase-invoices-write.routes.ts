/**
 * purchase-invoices-write.routes.ts — Phase 9
 * كتابة فواتير المشتريات: إنشاء + تعديل + اعتماد + إلغاء + حذف
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
  normalizeBody,
  parseId,
} from "../../middleware/helpers.ts";
import {
  getNextPurchaseInvoiceSequence,
} from "../../middleware/sequencing.ts";
import { processStockMovement } from "../../services/inventory.service.ts";
import { getBizId, getUserId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const purchaseInvoicesRoutes = new Hono();


purchaseInvoicesRoutes.post(
  "/businesses/:bizId/purchase-invoices",
  bizAuthMiddleware(),
  checkPermission("purchase_invoices", "create"),
  safeHandler("إنشاء فاتورة مشتريات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const userId = getUserId(c);
    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;

    const { items, ...invoiceData } = body;

    if (!invoiceData.supplierId) {
      return c.json({ error: "المورد مطلوب" }, 400);
    }
    if (!invoiceData.currencyId) {
      return c.json({ error: "العملة مطلوبة" }, 400);
    }
    if (!Array.isArray(items) || items.length === 0) {
      return c.json({ error: "يجب إضافة عنصر واحد على الأقل" }, 400);
    }

    const result = await db.transaction(async (tx) => {
      const { fullSequenceNumber, sequentialNumber } =
        await getNextPurchaseInvoiceSequence(bizId, undefined, tx);

      const invoiceNumber = invoiceData.invoiceNumber
        ? String(invoiceData.invoiceNumber)
        : fullSequenceNumber;

      let subtotal = 0;
      let totalTax = 0;
      let totalDiscount = 0;

      for (const item of items as any[]) {
        const qty = parseFloat(item.quantity) || 0;
        const cost = parseFloat(item.unitCost) || 0;
        const itemTax = parseFloat(item.tax) || 0;
        const itemDiscount = parseFloat(item.discount) || 0;
        subtotal += qty * cost;
        totalTax += itemTax;
        totalDiscount += itemDiscount;
      }

      const totalAmount = subtotal + totalTax - totalDiscount;
      const paidAmount = parseFloat(String(invoiceData.paidAmount)) || 0;
      const remainingAmount = totalAmount - paidAmount;

      const [created] = await tx
        .insert(purchaseInvoices)
        .values({
          businessId: bizId,
          invoiceNumber,
          fullSequenceNumber,
          sequenceNumber: sequentialNumber,
          supplierId: Number(invoiceData.supplierId),
          supplierAccountId: invoiceData.supplierAccountId
            ? Number(invoiceData.supplierAccountId)
            : null,
          warehouseId: invoiceData.warehouseId
            ? Number(invoiceData.warehouseId)
            : null,
          currencyId: Number(invoiceData.currencyId),
          subtotal: String(subtotal),
          tax: String(totalTax),
          discount: String(totalDiscount),
          totalAmount: String(totalAmount),
          paidAmount: String(paidAmount),
          remainingAmount: String(remainingAmount),
          paymentMethod: (invoiceData.paymentMethod as any) || "credit",
          status: "draft",
          invoiceDate: invoiceData.invoiceDate
            ? new Date(String(invoiceData.invoiceDate))
            : new Date(),
          dueDate: invoiceData.dueDate
            ? new Date(String(invoiceData.dueDate))
            : null,
          externalReference: invoiceData.externalReference
            ? String(invoiceData.externalReference)
            : null,
          notes: invoiceData.notes ? String(invoiceData.notes) : null,
          receivedQuantity: "0",
          receivedStatus: "pending",
          createdBy: userId,
        })
        .returning();

      const itemsToInsert = (items as any[]).map((item, idx) => ({
        invoiceId: created.id,
        inventoryItemId: Number(item.inventoryItemId),
        quantity: String(item.quantity),
        unitCost: String(item.unitCost),
        totalCost: String(
          (parseFloat(item.quantity) || 0) * (parseFloat(item.unitCost) || 0)
        ),
        tax: String(item.tax || 0),
        discount: String(item.discount || 0),
        receivedQuantity: "0",
        sortOrder: idx,
        notes: item.notes || null,
      }));

      await tx.insert(purchaseInvoiceItems).values(itemsToInsert);

      return created;
    });

    return c.json(result, 201);
  })
);

purchaseInvoicesRoutes.put(
  "/businesses/:bizId/purchase-invoices/:id",
  bizAuthMiddleware(),
  checkPermission("purchase_invoices", "update"),
  safeHandler("تعديل فاتورة مشتريات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الفاتورة غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(purchaseInvoices)
      .where(
        and(
          eq(purchaseInvoices.id, id),
          eq(purchaseInvoices.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "الفاتورة غير موجودة" }, 404);
    }

    if (existing.status === "completed" || existing.status === "cancelled") {
      return c.json({ error: "لا يمكن تعديل فاتورة مكتملة أو ملغاة" }, 400);
    }

    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
    const { items, ...updateData } = body;

    const result = await db.transaction(async (tx) => {
      let subtotal = existing.subtotal;
      let totalTax = existing.tax;
      let totalDiscount = existing.discount;

      if (Array.isArray(items) && items.length > 0) {
        await tx
          .delete(purchaseInvoiceItems)
          .where(eq(purchaseInvoiceItems.invoiceId, id));

        subtotal = "0";
        totalTax = "0";
        totalDiscount = "0";

        let calcSubtotal = 0;
        let calcTax = 0;
        let calcDiscount = 0;

        for (const item of items as any[]) {
          const qty = parseFloat(item.quantity) || 0;
          const cost = parseFloat(item.unitCost) || 0;
          const itemTax = parseFloat(item.tax) || 0;
          const itemDiscount = parseFloat(item.discount) || 0;
          calcSubtotal += qty * cost;
          calcTax += itemTax;
          calcDiscount += itemDiscount;
        }

        subtotal = String(calcSubtotal);
        totalTax = String(calcTax);
        totalDiscount = String(calcDiscount);

        const itemsToInsert = (items as any[]).map((item, idx) => ({
          invoiceId: id,
          inventoryItemId: Number(item.inventoryItemId),
          quantity: String(item.quantity),
          unitCost: String(item.unitCost),
          totalCost: String(
            (parseFloat(item.quantity) || 0) * (parseFloat(item.unitCost) || 0)
          ),
          tax: String(item.tax || 0),
          discount: String(item.discount || 0),
          receivedQuantity: String(item.receivedQuantity || 0),
          sortOrder: idx,
          notes: item.notes || null,
        }));

        await tx.insert(purchaseInvoiceItems).values(itemsToInsert);
      }

      const totalAmount =
        parseFloat(subtotal) + parseFloat(totalTax) - parseFloat(totalDiscount);
      const paidAmount =
        updateData.paidAmount !== undefined
          ? parseFloat(String(updateData.paidAmount))
          : parseFloat(existing.paidAmount);
      const remainingAmount = totalAmount - paidAmount;

      const updatePayload: Record<string, unknown> = {
        updatedAt: new Date(),
        subtotal,
        tax: totalTax,
        discount: totalDiscount,
        totalAmount: String(totalAmount),
        paidAmount: String(paidAmount),
        remainingAmount: String(remainingAmount),
      };

      if (updateData.supplierId !== undefined)
        updatePayload.supplierId = Number(updateData.supplierId);
      if (updateData.supplierAccountId !== undefined)
        updatePayload.supplierAccountId = updateData.supplierAccountId
          ? Number(updateData.supplierAccountId)
          : null;
      if (updateData.warehouseId !== undefined)
        updatePayload.warehouseId = updateData.warehouseId
          ? Number(updateData.warehouseId)
          : null;
      if (updateData.currencyId !== undefined)
        updatePayload.currencyId = Number(updateData.currencyId);
      if (updateData.paymentMethod !== undefined)
        updatePayload.paymentMethod = updateData.paymentMethod;
      if (updateData.status !== undefined)
        updatePayload.status = updateData.status;
      if (updateData.invoiceDate !== undefined)
        updatePayload.invoiceDate = new Date(String(updateData.invoiceDate));
      if (updateData.dueDate !== undefined)
        updatePayload.dueDate = updateData.dueDate
          ? new Date(String(updateData.dueDate))
          : null;
      if (updateData.externalReference !== undefined)
        updatePayload.externalReference = updateData.externalReference;
      if (updateData.notes !== undefined)
        updatePayload.notes = updateData.notes;

      const [updated] = await tx
        .update(purchaseInvoices)
        .set(updatePayload)
        .where(eq(purchaseInvoices.id, id))
        .returning();

      return updated;
    });

    return c.json(result);
  })
);

purchaseInvoicesRoutes.post(
  "/businesses/:bizId/purchase-invoices/:id/confirm",
  bizAuthMiddleware(),
  checkPermission("purchase_invoices", "update"),
  safeHandler("تأكيد فاتورة مشتريات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const userId = getUserId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الفاتورة غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(purchaseInvoices)
      .where(
        and(
          eq(purchaseInvoices.id, id),
          eq(purchaseInvoices.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "الفاتورة غير موجودة" }, 404);
    }

    if (existing.status !== "draft") {
      return c.json({ error: "يمكن تأكيد الفواتير المسودة فقط" }, 400);
    }

    // جلب بنود الفاتورة لتحديث المخزون
    const invoiceItems = await db
      .select()
      .from(purchaseInvoiceItems)
      .where(eq(purchaseInvoiceItems.invoiceId, id));

    const result = await db.transaction(async (tx) => {
      // تحديث حالة الفاتورة
      const [updated] = await tx
        .update(purchaseInvoices)
        .set({
          status: "confirmed",
          updatedAt: new Date(),
        })
        .where(eq(purchaseInvoices.id, id))
        .returning();

      // تحديث المخزون لكل بند إن وُجد مستودع
      if (existing.warehouseId && invoiceItems.length > 0) {
        for (const item of invoiceItems) {
          if (item.inventoryItemId) {
            await processStockMovement(bizId, {
              warehouseId: existing.warehouseId,
              inventoryItemId: item.inventoryItemId,
              movementType: "in",
              quantity: parseFloat(String(item.quantity)),
              unitCost: parseFloat(String(item.unitCost)),
              referenceType: "purchase_invoice",
              referenceId: id,
              notes: `تأكيد فاتورة مشتريات #${existing.invoiceNumber}`,
              createdBy: userId,
            }, tx as any);
          }
        }
      }

      return updated;
    });

    return c.json(result);
  })
);

purchaseInvoicesRoutes.post(
  "/businesses/:bizId/purchase-invoices/:id/receive",
  bizAuthMiddleware(),
  checkPermission("purchase_invoices", "update"),
  safeHandler("استلام بضائع فاتورة مشتريات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الفاتورة غير صالح" }, 400);

    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
    const { receivedItems } = body;

    if (!Array.isArray(receivedItems) || receivedItems.length === 0) {
      return c.json({ error: "يجب تحديد الكميات المستلمة" }, 400);
    }

    const [existing] = await db
      .select()
      .from(purchaseInvoices)
      .where(
        and(
          eq(purchaseInvoices.id, id),
          eq(purchaseInvoices.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "الفاتورة غير موجودة" }, 404);
    }

    if (existing.status === "cancelled") {
      return c.json({ error: "الفاتورة ملغاة" }, 400);
    }

    const result = await db.transaction(async (tx) => {
      let totalReceived = 0;
      let allItemsFullyReceived = true;

      for (const item of receivedItems as any[]) {
        const itemId = Number(item.itemId);
        const receivedQty = parseFloat(item.receivedQuantity) || 0;

        if (receivedQty > 0) {
          const [invoiceItem] = await tx
            .select()
            .from(purchaseInvoiceItems)
            .where(
              and(
                eq(purchaseInvoiceItems.id, itemId),
                eq(purchaseInvoiceItems.invoiceId, id)
              )
            );

          if (invoiceItem) {
            const newReceivedQty =
              parseFloat(invoiceItem.receivedQuantity) + receivedQty;
            await tx
              .update(purchaseInvoiceItems)
              .set({ receivedQuantity: String(newReceivedQty) })
              .where(eq(purchaseInvoiceItems.id, itemId));

            totalReceived += receivedQty;

            if (newReceivedQty < parseFloat(invoiceItem.quantity)) {
              allItemsFullyReceived = false;
            }

            // تحديث المخزون عند الاستلام الفعلي
            if (existing.warehouseId && invoiceItem.inventoryItemId) {
              await processStockMovement(bizId, {
                warehouseId: existing.warehouseId,
                inventoryItemId: invoiceItem.inventoryItemId,
                movementType: "in",
                quantity: receivedQty,
                unitCost: parseFloat(String(invoiceItem.unitCost)),
                referenceType: "purchase_invoice_receive",
                referenceId: id,
                notes: `استلام فاتورة مشتريات #${existing.invoiceNumber}`,
                createdBy: undefined,
              }, tx as any);
            }
          }
        }
      }

      const newTotalReceived =
        parseFloat(existing.receivedQuantity) + totalReceived;
      const newStatus = allItemsFullyReceived ? "received" : "partial";

      const [updated] = await tx
        .update(purchaseInvoices)
        .set({
          receivedQuantity: String(newTotalReceived),
          receivedStatus: newStatus,
          status: allItemsFullyReceived ? "completed" : existing.status,
          updatedAt: new Date(),
        })
        .where(eq(purchaseInvoices.id, id))
        .returning();

      return updated;
    });

    return c.json(result);
  })
);

purchaseInvoicesRoutes.delete(
  "/businesses/:bizId/purchase-invoices/:id",
  bizAuthMiddleware(),
  checkPermission("purchase_invoices", "delete"),
  safeHandler("حذف فاتورة مشتريات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الفاتورة غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(purchaseInvoices)
      .where(
        and(
          eq(purchaseInvoices.id, id),
          eq(purchaseInvoices.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "الفاتورة غير موجودة" }, 404);
    }

    if (existing.status === "completed") {
      return c.json({ error: "لا يمكن حذف فاتورة مكتملة" }, 400);
    }

    await db.transaction(async (tx) => {
      await tx
        .delete(purchaseInvoiceItems)
        .where(eq(purchaseInvoiceItems.invoiceId, id));
      await tx.delete(purchaseInvoices).where(eq(purchaseInvoices.id, id));
    });

    return c.json({ success: true });
  })
);

export default purchaseInvoicesRoutes;

export { purchaseInvoicesRoutes as purchaseInvoicesWriteRoutes };
