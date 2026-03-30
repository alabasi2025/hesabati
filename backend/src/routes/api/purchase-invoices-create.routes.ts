/**
 * purchase-invoices-create.routes.ts â€” Phase 13
 * ط¥ظ†ط´ط§ط، ظپظˆط§طھظٹط± ط§ظ„ط´ط±ط§ط،
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
import { getNextPurchaseInvoiceSequence } from '../../engines/sequencing-entity.engine.ts';
import { wsService } from '../../services/websocket.service.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { logAction } from '../../engines/audit.engine.ts';

const piCreateRoutes = new Hono();




piCreateRoutes.post(
  "/businesses/:bizId/purchase-invoices",
  bizAuthMiddleware(),
  checkPermission("purchase_invoices", "create"),
  safeHandler("ط¥ظ†ط´ط§ط، ظپط§طھظˆط±ط© ظ…ط´طھط±ظٹط§طھ", async (c: AppContext) => {
    const bizId = getBizId(c);
    const userId = getUserId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    const { items, ...invoiceData } = body;

    if (!invoiceData.supplierId) {
      return c.json({ error: "ط§ظ„ظ…ظˆط±ط¯ ظ…ط·ظ„ظˆط¨" }, 400);
    }
    if (!invoiceData.currencyId) {
      return c.json({ error: "ط§ظ„ط¹ظ…ظ„ط© ظ…ط·ظ„ظˆط¨ط©" }, 400);
    }
    if (!Array.isArray(items) || items.length === 0) {
      return c.json({ error: "ظٹط¬ط¨ ط¥ط¶ط§ظپط© ط¹ظ†طµط± ظˆط§ط­ط¯ ط¹ظ„ظ‰ ط§ظ„ط£ظ‚ظ„" }, 400);
    }

    const result = await db.transaction(async (tx) => {
      const [supplierRow] = await tx
        .select({ sequenceNumber: suppliers.sequenceNumber })
        .from(suppliers)
        .where(and(eq(suppliers.id, Number(invoiceData.supplierId)), eq(suppliers.businessId, bizId)))
        .limit(1);

      const supplierSeqNum = supplierRow?.sequenceNumber ?? 0;
      const { globalSequenceNumber, supplierSequenceNumber } =
        await getNextPurchaseInvoiceSequence(bizId, Number(invoiceData.supplierId), supplierSeqNum, undefined, tx);

      const invoiceNumber = invoiceData.invoiceNumber
        ? String(invoiceData.invoiceNumber)
        : globalSequenceNumber;

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
          fullSequenceNumber: globalSequenceNumber,
          supplierSequenceNumber,
          sequenceNumber: supplierSeqNum,
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


export { piCreateRoutes };


