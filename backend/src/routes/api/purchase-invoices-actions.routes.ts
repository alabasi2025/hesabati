/**
 * purchase-invoices-actions.routes.ts â€” Phase 13
 * طھط¹ط¯ظٹظ„ + ط¥ط¶ط§ظپط© ط¨ظ†ظˆط¯ + ط§ط³طھظ„ط§ظ… + ط­ط°ظپ ظپظˆط§طھظٹط± ط§ظ„ط´ط±ط§ط،
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, sql, inArray } from 'drizzle-orm';
import {
  businesses, purchaseInvoices, purchaseInvoiceItems,
  inventoryItems, warehouses, suppliers, supplierBalances,
  accounts, accountBalances, operationTypes, operationTypeAccounts,
  journalEntries, journalEntryLines, auditLog, currencies,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, parseId, toErrorMessage, getBody } from '../../middleware/helpers.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getNextSequence } from '../../middleware/sequencing.ts';
import { wsService } from '../../services/websocket.service.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { logAction } from '../../engines/audit.engine.ts';

const piActionsRoutes = new Hono();

piActionsRoutes.put(
  "/businesses/:bizId/purchase-invoices/:id",
  bizAuthMiddleware(),
  checkPermission("purchase_invoices", "update"),
  safeHandler("طھط¹ط¯ظٹظ„ ظپط§طھظˆط±ط© ظ…ط´طھط±ظٹط§طھ", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "ظ…ط¹ط±ظ‘ظپ ط§ظ„ظپط§طھظˆط±ط© ط؛ظٹط± طµط§ظ„ط­" }, 400);

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
      return c.json({ error: "ط§ظ„ظپط§طھظˆط±ط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯ط©" }, 404);
    }

    if (existing.status === "completed" || existing.status === "cancelled") {
      return c.json({ error: "ظ„ط§ ظٹظ…ظƒظ† طھط¹ط¯ظٹظ„ ظپط§طھظˆط±ط© ظ…ظƒطھظ…ظ„ط© ط£ظˆ ظ…ظ„ط؛ط§ط©" }, 400);
    }

    const body = (await getBody(c)) as Record<string, unknown>;
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

piActionsRoutes.post(
  "/businesses/:bizId/purchase-invoices/:id/confirm",
  bizAuthMiddleware(),
  checkPermission("purchase_invoices", "update"),
  safeHandler("طھط£ظƒظٹط¯ ظپط§طھظˆط±ط© ظ…ط´طھط±ظٹط§طھ", async (c: AppContext) => {
    const bizId = getBizId(c);
    const userId = getUserId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "ظ…ط¹ط±ظ‘ظپ ط§ظ„ظپط§طھظˆط±ط© ط؛ظٹط± طµط§ظ„ط­" }, 400);

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
      return c.json({ error: "ط§ظ„ظپط§طھظˆط±ط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯ط©" }, 404);
    }

    if (existing.status !== "draft") {
      return c.json({ error: "ظٹظ…ظƒظ† طھط£ظƒظٹط¯ ط§ظ„ظپظˆط§طھظٹط± ط§ظ„ظ…ط³ظˆط¯ط© ظپظ‚ط·" }, 400);
    }

    // ط¬ظ„ط¨ ط¨ظ†ظˆط¯ ط§ظ„ظپط§طھظˆط±ط© ظ„طھط­ط¯ظٹط« ط§ظ„ظ…ط®ط²ظˆظ†
    const invoiceItems = await db
      .select()
      .from(purchaseInvoiceItems)
      .where(eq(purchaseInvoiceItems.invoiceId, id));

    const result = await db.transaction(async (tx) => {
      // طھط­ط¯ظٹط« ط­ط§ظ„ط© ط§ظ„ظپط§طھظˆط±ط©
      const [updated] = await tx
        .update(purchaseInvoices)
        .set({
          status: "confirmed",
          updatedAt: new Date(),
        })
        .where(eq(purchaseInvoices.id, id))
        .returning();

      // طھط­ط¯ظٹط« ط§ظ„ظ…ط®ط²ظˆظ† ظ„ظƒظ„ ط¨ظ†ط¯ ط¥ظ† ظˆظڈط¬ط¯ ظ…ط³طھظˆط¯ط¹
      if (existing.warehouseId && invoiceItems.length > 0) {
        for (const item of invoiceItems) {
          if (item.inventoryItemId) {
            await processStockMovement(bizId, {
              warehouseId: existing.warehouseId,
              itemId: item.inventoryItemId,
              movementType: "in",
              quantity: parseFloat(String(item.quantity)),
              unitCost: parseFloat(String(item.unitCost)),
              reference: `purchase_invoice:${id}`,
              description: `تأكيد فاتورة مشتريات #${existing.invoiceNumber}`,
              createdBy: userId ?? undefined,
            });
          }
        }
      }

      return updated;
    });

    return c.json(result);
  })
);

piActionsRoutes.post(
  "/businesses/:bizId/purchase-invoices/:id/receive",
  bizAuthMiddleware(),
  checkPermission("purchase_invoices", "update"),
  safeHandler("ط§ط³طھظ„ط§ظ… ط¨ط¶ط§ط¦ط¹ ظپط§طھظˆط±ط© ظ…ط´طھط±ظٹط§طھ", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "ظ…ط¹ط±ظ‘ظپ ط§ظ„ظپط§طھظˆط±ط© ط؛ظٹط± طµط§ظ„ط­" }, 400);

    const body = (await getBody(c)) as Record<string, unknown>;
    const { receivedItems } = body;

    if (!Array.isArray(receivedItems) || receivedItems.length === 0) {
      return c.json({ error: "ظٹط¬ط¨ طھط­ط¯ظٹط¯ ط§ظ„ظƒظ…ظٹط§طھ ط§ظ„ظ…ط³طھظ„ظ…ط©" }, 400);
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
      return c.json({ error: "ط§ظ„ظپط§طھظˆط±ط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯ط©" }, 404);
    }

    if (existing.status === "cancelled") {
      return c.json({ error: "ط§ظ„ظپط§طھظˆط±ط© ظ…ظ„ط؛ط§ط©" }, 400);
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

            // طھط­ط¯ظٹط« ط§ظ„ظ…ط®ط²ظˆظ† ط¹ظ†ط¯ ط§ظ„ط§ط³طھظ„ط§ظ… ط§ظ„ظپط¹ظ„ظٹ
            if (existing.warehouseId && invoiceItem.inventoryItemId) {
              await processStockMovement(bizId, {
                warehouseId: existing.warehouseId,
                itemId: invoiceItem.inventoryItemId,
                movementType: "in",
                quantity: receivedQty,
                unitCost: parseFloat(String(invoiceItem.unitCost)),
                reference: `purchase_invoice_receive:${id}`,
                description: `استلام فاتورة مشتريات #${existing.invoiceNumber}`,
                createdBy: undefined,
              });
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

piActionsRoutes.delete(
  "/businesses/:bizId/purchase-invoices/:id",
  bizAuthMiddleware(),
  checkPermission("purchase_invoices", "delete"),
  safeHandler("ط­ط°ظپ ظپط§طھظˆط±ط© ظ…ط´طھط±ظٹط§طھ", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "ظ…ط¹ط±ظ‘ظپ ط§ظ„ظپط§طھظˆط±ط© ط؛ظٹط± طµط§ظ„ط­" }, 400);

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
      return c.json({ error: "ط§ظ„ظپط§طھظˆط±ط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯ط©" }, 404);
    }

    if (existing.status === "completed") {
      return c.json({ error: "ظ„ط§ ظٹظ…ظƒظ† ط­ط°ظپ ظپط§طھظˆط±ط© ظ…ظƒطھظ…ظ„ط©" }, 400);
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

export default piActionsRoutes;


export { piActionsRoutes };


