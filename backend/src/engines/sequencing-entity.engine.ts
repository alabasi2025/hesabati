/**
 * sequencing-entity.engine.ts — Phase 11
 * ترقيم الكيانات: سندات + مخازن + قيود + قوالب + فواتير + الدوال الموحّدة
 * (مستخرجة من sequencing.engine.ts)
 */
import { type DbOrTx, ARABIC_LABELS, TYPE_PREFIXES } from './sequencing.types.ts';
import { getNextSequence, getCurrentSequence } from './sequencing-core.engine.ts';
import { db } from '../db/index.ts';
import { sql } from 'drizzle-orm';
import { getFirstRow } from '../utils/db-result.ts';

// ===================== ترقيم السندات (صرف/قبض) =====================

/**
 * توليد الرقم المنسق الكامل لسند (صرف/قبض)
 * الشكل: PREFIX-CODE-سنة-نوع-ZZZZ مثال: FND-01/1-2025-صرف-0001
 *
 * @param businessId - معرّف العمل
 * @param treasuryCode - كود الخزينة الكامل (مثل: FND-01 أو FND-01/1)
 * @param treasuryType - نوع الخزينة (fund/bank/exchange/e_wallet)
 * @param voucherType - نوع السند (receipt/payment)
 * @param treasuryId - معرّف الخزينة
 * @param year - السنة (اختياري)
 * @param tx - اختياري: كائن المعاملة
 */
export async function generateVoucherFullSequence(
  businessId: number,
  treasuryCode: string,
  treasuryType: string,
  voucherType: "receipt" | "payment",
  treasuryId: number,
  year?: number,
  tx?: DbOrTx,
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();
  const counterType = `voucher_${voucherType}` as const;
  const executor = tx || db;

  // --- 1. عدّ السندات المحفوظة فعلياً لهذه الخزينة + النوع + السنة ---
  const yearStart = `${currentYear}-01-01`;
  const yearEnd   = `${currentYear + 1}-01-01`;

  let treasuryCol: string;
  if (treasuryType === 'fund') {
    treasuryCol = voucherType === 'receipt' ? 'to_fund_id' : 'from_fund_id';
  } else {
    treasuryCol = voucherType === 'receipt' ? 'to_account_id' : 'from_account_id';
  }

  const countResult = await executor.execute(sql`
    SELECT COUNT(*)::int AS cnt FROM vouchers
    WHERE business_id = ${businessId}
      AND voucher_type = ${voucherType}
      AND ${sql.raw(treasuryCol)} = ${treasuryId}
      AND voucher_date >= ${yearStart}
      AND voucher_date < ${yearEnd}
  `);
  const actualCount = getFirstRow<{ cnt: number }>(countResult)?.cnt ?? 0;

  // --- 2. زيادة ذرّية للعداد مع ضمان أنه >= عدد السندات المحفوظة + 1 ---
  //     GREATEST يحمي من أي انحراف سابق في العداد
  const seqResult = await executor.execute(sql`
    INSERT INTO sequence_counters (business_id, counter_type, entity_id, year, last_number)
    VALUES (${businessId}, ${counterType}, ${treasuryId}, ${currentYear}, ${actualCount + 1})
    ON CONFLICT (business_id, counter_type, entity_id, year)
    DO UPDATE SET
      last_number = GREATEST(sequence_counters.last_number + 1, ${actualCount + 1}),
      updated_at = NOW()
    RETURNING last_number
  `);
  const sequentialNumber = getFirstRow<{ last_number: number }>(seqResult)?.last_number ?? (actualCount + 1);

  // --- 3. تنسيق الرقم ---
  const prefix = TYPE_PREFIXES[treasuryType] || treasuryType.toUpperCase().substring(0, 3);
  const voucherLabel = ARABIC_LABELS[voucherType] || voucherType;
  const codeWithoutPrefix = treasuryCode.replace(new RegExp(`^${prefix}-?`, 'i'), '');
  const treasuryCodePart = codeWithoutPrefix || '00';

  const fullSequenceNumber = `${prefix}-${treasuryCodePart}-${currentYear}-${voucherLabel}-${String(sequentialNumber).padStart(4, "0")}`;
  return { fullSequenceNumber, sequentialNumber };
}

/**
 * معاينة الرقم التالي لسند بناءً على السندات المحفوظة فعلياً في جدول vouchers
 * لا تزيد أي عداد — تقرأ فقط عدد السندات الموجودة فعلياً وتضيف 1
 *
 * المنطق: عدّ السندات المحفوظة لنفس (العمل + نوع السند + الخزينة + السنة)
 */
export async function previewVoucherFullSequence(
  businessId: number,
  treasuryCode: string,
  treasuryType: string,
  voucherType: "receipt" | "payment",
  treasuryId: number,
  year?: number,
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();
  const yearStart = `${currentYear}-01-01`;
  const yearEnd   = `${currentYear + 1}-01-01`;

  // بناء شرط الخزينة حسب نوعها ونوع السند
  let treasuryCol: string;
  if (treasuryType === 'fund') {
    treasuryCol = voucherType === 'receipt' ? 'to_fund_id' : 'from_fund_id';
  } else {
    treasuryCol = voucherType === 'receipt' ? 'to_account_id' : 'from_account_id';
  }

  // عدّ السندات المحفوظة فعلياً لهذه الخزينة + النوع + السنة
  const result = await db.execute(sql`
    SELECT COUNT(*)::int AS cnt FROM vouchers
    WHERE business_id = ${businessId}
      AND voucher_type = ${voucherType}
      AND ${sql.raw(treasuryCol)} = ${treasuryId}
      AND voucher_date >= ${yearStart}
      AND voucher_date < ${yearEnd}
  `);

  const savedCount = getFirstRow<{ cnt: number }>(result)?.cnt ?? 0;
  const sequentialNumber = savedCount + 1;

  const prefix = TYPE_PREFIXES[treasuryType] || treasuryType.toUpperCase().substring(0, 3);
  const voucherLabel = ARABIC_LABELS[voucherType] || voucherType;
  const codeWithoutPrefix = treasuryCode.replace(new RegExp(`^${prefix}-?`, 'i'), '');
  const treasuryCodePart = codeWithoutPrefix || '00';

  const fullSequenceNumber = `${prefix}-${treasuryCodePart}-${currentYear}-${voucherLabel}-${String(sequentialNumber).padStart(4, "0")}`;
  return { fullSequenceNumber, sequentialNumber };
}

// ===================== ترقيم عمليات المخازن =====================

/**
 * توليد الرقم المنسق الكامل لعملية مخزن
 * الشكل: WHS-XX-سنة-نوع-ZZZZ مثال: WHS-01-2025-صرف-0001
 *
 * @param businessId - معرّف العمل
 * @param warehouseSeqNum - رقم المخزن التسلسلي
 * @param operationType - نوع العملية
 * @param warehouseId - معرّف المخزن
 * @param year - السنة (اختياري)
 * @param tx - اختياري: كائن المعاملة
 */
export async function generateWarehouseOpFullSequence(
  businessId: number,
  warehouseSeqNum: number,
  operationType: "receive_purchase" | "direct_supply" | "dispatch" | "transfer_out" | "receive_transfer",
  warehouseId: number,
  year?: number,
  tx?: DbOrTx,
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();
  const counterType = `warehouse_${operationType}` as const;
  const sequentialNumber = await getNextSequence(businessId, counterType, warehouseId, currentYear, tx);
  const opLabel = ARABIC_LABELS[operationType] || operationType;
  const fullSequenceNumber = `WHS-${String(warehouseSeqNum).padStart(2, "0")}-${currentYear}-${opLabel}-${String(sequentialNumber).padStart(4, "0")}`;
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
 * توليد رقمَي فاتورة المشتريات: عام على مستوى العمل + خاص بالمورد
 * الشكل العام:    PI-سنة-00001
 * الشكل للمورد:  SUP-XX-سنة-0001
 *
 * @param businessId - معرّف العمل
 * @param supplierId - معرّف المورد
 * @param supplierSeqNum - رقم المورد التسلسلي
 * @param year - السنة (اختياري)
 * @param tx - اختياري: كائن المعاملة
 */
export async function getNextPurchaseInvoiceSequence(
  businessId: number,
  supplierId: number,
  supplierSeqNum: number,
  year?: number,
  tx?: DbOrTx,
): Promise<{ globalSequenceNumber: string; supplierSequenceNumber: string }> {
  const currentYear = year || new Date().getFullYear();
  const [globalSeq, supplierSeq] = await Promise.all([
    getNextSequence(businessId, "purchase_invoice_global", 0, currentYear, tx),
    getNextSequence(businessId, "purchase_invoice_supplier", supplierId, currentYear, tx),
  ]);
  return {
    globalSequenceNumber: `PI-${currentYear}-${String(globalSeq).padStart(5, "0")}`,
    supplierSequenceNumber: `SUP-${String(supplierSeqNum).padStart(2, "0")}-${currentYear}-${String(supplierSeq).padStart(4, "0")}`,
  };
}

// ===================== دوال الترقيم الموحّدة للكيانات =====================

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

/**
 * الرقم التسلسلي التالي للأعمال (منشآت)
 * مفتاح العداد: (0, "business", 0, 0) — عالمي
 * الكود الناتج: biz-01, biz-02, ...
 */
export async function getNextBusinessSequence(tx?: DbOrTx): Promise<number> {
  return getNextSequence(0, "business", 0, 0, tx);
}

/**
 * الرقم الحالي لآخر عمل مُنشأ (للمعاينة بدون increment)
 */
export async function getCurrentBusinessSequence(): Promise<number> {
  return getCurrentSequence(0, "business", 0, 0);
}

// ===================== دوال التوافق (Compatibility Shims) =====================

/**
 * @deprecated استخدم generateItemCode أو generateLeafAccountCode بدلاً منها
 * دالة قديمة لتوليد كود هرمي — تُعيد null دائماً (الـ fallback في مكان الاستدعاء يُطبَّق)
 */
export function buildAccountHierarchyCode(
  _businessId: number,
  _type: string,
  _categorySeq: number,
  _seqNum: number,
): string | null {
  return null;
}

/**
 * @deprecated استخدم generateLeafAccountCode بدلاً منها
 * رقم تسلسلي عام للحسابات (legacy)
 */
export async function getNextAccountSequence(
  businessId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "account_general", 0, 0, tx);
}

/**
 * رقم تسلسلي للمورد داخل تصنيفه
 */
export async function getNextSupplierSequence(
  businessId: number,
  supplierTypeId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "item_in_supplier_type", supplierTypeId, 0, tx);
}


