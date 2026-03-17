/**
 * sequencing-entity.engine.ts — Phase 11
 * ترقيم الكيانات: سندات + مخازن + قيود + قوالب + فواتير + الدوال الموحّدة
 * (مستخرجة من sequencing.engine.ts)
 */
import { db } from '../db/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import { type DbOrTx } from './sequencing.types.ts';
import { getNextSequence, getNextCategorySequence, getNextItemInCategorySequence } from './sequencing-core.engine.ts';

// ===================== ترقيم السندات (صرف/قبض) =====================

/**
 * توليد الرقم المنسق الكامل لسند (صرف/قبض/تحويل)
 * الشكل: تصنيفX-خزينةY-سنة-نوع-ZZZZ
 *
 * @param businessId - معرّف العمل
 * @param categorySeqNum - رقم التصنيف (sequenceNumber من جدول التصنيف)
 * @param treasurySeqNum - رقم الخزينة داخل التصنيف (sequenceNumber من جدول funds/accounts)
 * @param treasuryType - نوع الخزينة (fund/bank/exchange/e_wallet)
 * @param voucherType - نوع السند (receipt/payment/transfer)
 * @param treasuryId - معرّف الخزينة (fund_id أو account_id)
 * @param year - السنة (اختياري)
 * @param tx - اختياري: كائن المعاملة
 */
export async function generateVoucherFullSequence(
  businessId: number,
  categorySeqNum: number,
  treasurySeqNum: number,
  treasuryType: string,
  voucherType: "receipt" | "payment" | "transfer" | "journal",
  treasuryId: number,
  year?: number,
  tx?: DbOrTx,
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();

  // المفتاح الفريد: نوع السند + خزينة محددة
  const counterType = `voucher_${voucherType}`;
  // entityId = treasuryId لأن الترقيم حسب الخزينة
  const sequentialNumber = await getNextSequence(
    businessId,
    counterType,
    treasuryId,
    currentYear,
    tx,
  );

  const treasuryLabel = ARABIC_LABELS[treasuryType] || treasuryType;
  const voucherLabel = ARABIC_LABELS[voucherType] || voucherType;

  const fullSequenceNumber = `${categorySeqNum}-${treasurySeqNum}-${currentYear}-${voucherLabel}-${String(sequentialNumber).padStart(4, "0")}`;

  return { fullSequenceNumber, sequentialNumber };
}

// ===================== ترقيم عمليات المخازن =====================

/**
 * توليد الرقم المنسق الكامل لعملية مخزن
 * الشكل: تصنيفX-مخزنY-سنة-نوع-ZZZZ
 *
 * @param businessId - معرّف العمل
 * @param categorySeqNum - رقم التصنيف
 * @param warehouseSeqNum - رقم المخزن داخل التصنيف
 * @param operationType - نوع العملية (supply_invoice/supply_order/dispatch/transfer_out/receive_transfer)
 * @param warehouseId - معرّف المخزن
 * @param year - السنة (اختياري)
 * @param tx - اختياري: كائن المعاملة
 */
export async function generateWarehouseOpFullSequence(
  businessId: number,
  categorySeqNum: number,
  warehouseSeqNum: number,
  operationType: string,
  warehouseId: number,
  year?: number,
  tx?: DbOrTx,
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();

  const counterType = `warehouse_${operationType}`;
  const sequentialNumber = await getNextSequence(
    businessId,
    counterType,
    warehouseId,
    currentYear,
    tx,
  );

  const opLabel = ARABIC_LABELS[operationType] || operationType;

  const fullSequenceNumber = `${categorySeqNum}-${warehouseSeqNum}-${currentYear}-${opLabel}-${String(sequentialNumber).padStart(4, "0")}`;

  return { fullSequenceNumber, sequentialNumber };
}

// ===================== ترقيم قيود اليومية =====================

/**
 * توليد الرقم المنسق الكامل لقيد يومية
 * الشكل: تصنيفX-سنة-ZZZZ
 *
 * @param businessId - معرّف العمل
 * @param categorySeqNum - رقم التصنيف (من journalEntryCategories)
 * @param categoryId - معرّف التصنيف
 * @param year - السنة (اختياري)
 * @param tx - اختياري: كائن المعاملة
 */
export async function generateJournalEntryFullSequence(
  businessId: number,
  categorySeqNum: number,
  categoryId: number,
  year?: number,
  tx?: DbOrTx,
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();

  const sequentialNumber = await getNextSequence(
    businessId,
    "journal_entry",
    categoryId,
    currentYear,
    tx,
  );

  const fullSequenceNumber = `${categorySeqNum}-${currentYear}-${String(sequentialNumber).padStart(4, "0")}`;

  return { fullSequenceNumber, sequentialNumber };
}

// ===================== ترقيم قوالب العمليات =====================

/**
 * توليد الرقم المنسق الكامل لقالب عملية
 * الشكل: تصنيفX-سنة-ZZZZ
 *
 * @param businessId - معرّف العمل
 * @param categorySeqNum - رقم التصنيف (من category في operationTypes)
 * @param categoryId - معرّف التصنيف (يمكن استخدام hash للاسم)
 * @param year - السنة (اختياري)
 * @param tx - اختياري: كائن المعاملة
 */
export async function generateOperationTemplateFullSequence(
  businessId: number,
  categorySeqNum: number,
  categoryId: number,
  year?: number,
  tx?: DbOrTx,
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();

  const sequentialNumber = await getNextSequence(
    businessId,
    "operation_template",
    categoryId,
    currentYear,
    tx,
  );

  const fullSequenceNumber = `${categorySeqNum}-${currentYear}-${String(sequentialNumber).padStart(4, "0")}`;

  return { fullSequenceNumber, sequentialNumber };
}

// ===================== دوال مساعدة =====================

/**
 * تنسيق الرقم التسلسلي بصيغة موحدة (للتوافق مع الكود القديم)
 */
export function formatSequenceNumber(
  year: number,
  prefix: string,
  sequence: number,
  digits: number = 5,
): string {
  const paddedSeq = String(sequence).padStart(digits, "0");
  return `${year}-${prefix}-${paddedSeq}`;
}

/**
 * توليد كود تلقائي لعنصر جديد داخل تصنيفه (للتوافق مع الكود القديم)
 */
export function generateItemCode(
  typePrefix: string,
  sequenceNumber: number,
  digits: number = 2,
): string {
  const paddedNum = String(sequenceNumber).padStart(digits, "0");
  return `${typePrefix}${paddedNum}`;
}

/**
 * الحصول على الرقم التسلسلي التالي لعنصر جديد داخل تصنيفه
 * (صندوق جديد في تصنيف معين، حساب جديد في نوع معين، إلخ)
 *
 * @param businessId - معرّف العمل
 * @param counterType - نوع العداد
 * @param typeId - معرّف التصنيف/النوع
 * @param tx - اختياري: كائن المعاملة
 */
export async function getNextItemSequence(
  businessId: number,
  counterType: string,
  typeId: number,
  tx?: DbOrTx,
): Promise<{ sequenceNumber: number; code: string }> {
  const seq = await getNextSequence(businessId, counterType, typeId, 0, tx);
  return { sequenceNumber: seq, code: "" };
}

/**
 * توليد أرقام تسلسلية للسند/القيد/العملية المخزنية (للتوافق مع الكود القديم)
 *
 * @param businessId - معرّف العمل
 * @param accountId - معرّف الحساب
 * @param templateId - معرّف القالب (اختياري)
 * @param operationType - نوع العملية
 * @param year - السنة (اختياري)
 * @param tx - اختياري: كائن المعاملة
 */
export async function generateOperationSequences(
  businessId: number,
  accountId: number,
  templateId: number | null,
  operationType: "voucher" | "journal" | "warehouse_op",
  year?: number,
  tx?: DbOrTx,
): Promise<{ accountSequence: number; templateSequence: number | null }> {
  const opYear = year || new Date().getFullYear();

  const accountCounterType = `account_${operationType}`;
  const accountSequence = await getNextSequence(
    businessId,
    accountCounterType,
    accountId,
    opYear,
    tx,
  );

  let templateSequence: number | null = null;
  if (templateId) {
    const templateCounterType = `template_${operationType}`;
    templateSequence = await getNextSequence(
      businessId,
      templateCounterType,
      templateId,
      opYear,
      tx,
    );
  }

  return { accountSequence, templateSequence };
}

// ===================== ترقيم تصنيفات العمليات =====================

/**
 * الحصول على الرقم التسلسلي التالي لتصنيف عملية جديد
 *
 * @param businessId - معرّف العمل
 * @param tx - اختياري: كائن المعاملة
 */
export async function getNextOperationCategorySequence(
  businessId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "operation_category", 0, 0, tx);
}

/**
 * الحصول على الرقم التسلسلي التالي لقالب عملية داخل تصنيفه
 *
 * @param businessId - معرّف العمل
 * @param categoryId - معرّف التصنيف
 * @param tx - اختياري: كائن المعاملة
 */
export async function getNextOperationTypeSequence(
  businessId: number,
  categoryId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "operation_type_in_category", categoryId, 0, tx);
}

// ===================== ترقيم فواتير المشتريات =====================

/**
 * توليد الرقم المنسق الكامل لفاتورة مشتريات
 * الشكل: PI-سنة-ZZZZ
 *
 * @param businessId - معرّف العمل
 * @param year - السنة (اختياري)
 * @param tx - اختياري: كائن المعاملة
 */
export async function getNextPurchaseInvoiceSequence(
  businessId: number,
  year?: number,
  tx?: DbOrTx,
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();

  const sequentialNumber = await getNextSequence(
    businessId,
    "purchase_invoice",
    0,
    currentYear,
    tx,
  );

  const fullSequenceNumber = `PI-${currentYear}-${String(sequentialNumber).padStart(5, "0")}`;

  return { fullSequenceNumber, sequentialNumber };
}

// ===================== دوال الترقيم الموحّدة للكيانات =====================

export async function getNextAccountSequence(
  businessId: number,
  accountType: string,
  subTypeId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, `account_in_${accountType}`, subTypeId || 0, 0, tx);
}

export async function getNextFundSequence(
  businessId: number,
  fundTypeId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "item_in_fund_type", fundTypeId, 0, tx);
}

export async function getNextWarehouseSequence(
  businessId: number,
  warehouseTypeId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "item_in_warehouse_type", warehouseTypeId, 0, tx);
}

export async function getNextBankSequence(
  businessId: number,
  bankTypeId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "item_in_bank_type", bankTypeId, 0, tx);
}

export async function getNextExchangeSequence(
  businessId: number,
  exchangeTypeId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "item_in_exchange_type", exchangeTypeId, 0, tx);
}

export async function getNextEWalletSequence(
  businessId: number,
  eWalletTypeId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "item_in_ewallet_type", eWalletTypeId, 0, tx);
}

export async function getNextSupplierSequence(
  businessId: number,
  supplierTypeId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "supplier_in_type", supplierTypeId, 0, tx);
}

export async function getNextInventoryItemSequence(
  businessId: number,
  itemTypeId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "inventory_item_in_type", itemTypeId, 0, tx);
}

export async function getNextEmployeeSequence(
  businessId: number,
  departmentId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "employee_in_department", departmentId, 0, tx);
}

export async function getNextStationSequence(
  businessId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "station", 0, 0, tx);
}

export async function getNextBusinessPartnerSequence(
  businessId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "business_partner", 0, 0, tx);
}

export async function getNextExpenseCategorySequence(
  businessId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "expense_category", 0, 0, tx);
}

export async function getNextCustodySequence(
  businessId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "custody", 0, 0, tx);
}

export async function getNextReconciliationSequence(
  businessId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "reconciliation", 0, 0, tx);
}

export async function getNextExpenseBudgetSequence(
  businessId: number,
  year?: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "expense_budget", 0, year || new Date().getFullYear(), tx);
}

export async function getNextSubTypeSequence(
  businessId: number,
  mainType:
    | "fund"
    | "bank"
    | "exchange"
    | "e_wallet"
    | "warehouse"
    | "supplier"
    | "item"
    | "operation",
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, `category_${mainType}`, 0, 0, tx);
}

// ── Aliases للتوافق مع index.ts ─────────────────────────────────────────
export const generateVoucherNumber = generateVoucherFullSequence;
export const generateStockNumber = generateWarehouseOpFullSequence;

