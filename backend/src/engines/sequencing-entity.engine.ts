/**
 * sequencing-entity.engine.ts — Phase 11
 * ترقيم الكيانات: سندات + مخازن + قيود + قوالب + فواتير + الدوال الموحّدة
 * (مستخرجة من sequencing.engine.ts)
 */
import {
  type DbOrTx,
  ARABIC_LABELS,
  TYPE_PREFIXES,
  generateLeafAccountCode,
} from "./sequencing.types.ts";
import { NATURE_PREFIXES } from "./ledger-code.engine.ts";
import {
  getNextSequence,
  getCurrentSequence,
} from "./sequencing-core.engine.ts";
import { db } from "../db/index.ts";
import { sql } from "drizzle-orm";
import { getFirstRow } from "../utils/db-result.ts";

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
  const executor = tx || db;

  // --- تنسيق أجزاء الرقم ---
  const prefix =
    TYPE_PREFIXES[treasuryType] || treasuryType.toUpperCase().substring(0, 3);
  const voucherLabel = ARABIC_LABELS[voucherType] || voucherType;
  const codeWithoutPrefix = treasuryCode.replace(
    new RegExp(`^${prefix}-?`, "i"),
    "",
  );
  const treasuryCodePart = codeWithoutPrefix || "00";

  // --- البحث عن أول فجوة في التسلسل ---
  // جلب كل الأرقام التسلسلية المستخدمة لهذه الخزينة + النوع + السنة
  const patternPrefix = `${prefix}-${treasuryCodePart}-${currentYear}-${voucherLabel}-`;
  const usedResult = await executor.execute(sql`
    SELECT voucher_number FROM vouchers
    WHERE business_id = ${businessId}
      AND voucher_type = ${voucherType}
      AND voucher_number LIKE ${patternPrefix + "%"}
    ORDER BY voucher_number
  `);

  // استخراج الأرقام التسلسلية المستخدمة
  const rows = Array.isArray(usedResult)
    ? usedResult
    : (usedResult as any)?.rows || [];
  const usedNumbers = new Set<number>();
  for (const row of rows) {
    const vn = String(
      (row as any).voucher_number || (row as any).voucherNumber || "",
    );
    const match = vn.match(/-(\d{4})$/);
    if (match) usedNumbers.add(parseInt(match[1], 10));
  }

  // البحث عن أول رقم غير مستخدم بدءاً من 1
  let sequentialNumber = 1;
  while (usedNumbers.has(sequentialNumber)) {
    sequentialNumber++;
  }

  const fullSequenceNumber = `${prefix}-${treasuryCodePart}-${currentYear}-${voucherLabel}-${String(sequentialNumber).padStart(4, "0")}`;
  return { fullSequenceNumber, sequentialNumber };
}

/**
 * معاينة الرقم التالي لسند — نفس منطق generate (بحث عن أول فجوة)
 * لا تزيد أي عداد — للمعاينة فقط
 */
export async function previewVoucherFullSequence(
  businessId: number,
  treasuryCode: string,
  treasuryType: string,
  voucherType: "receipt" | "payment",
  treasuryId: number,
  year?: number,
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  // نستخدم نفس منطق generate بدون tx
  return generateVoucherFullSequence(
    businessId,
    treasuryCode,
    treasuryType,
    voucherType,
    treasuryId,
    year,
  );
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
  operationType:
    | "receive_purchase"
    | "direct_supply"
    | "dispatch"
    | "transfer_out"
    | "receive_transfer",
  warehouseId: number,
  year?: number,
  tx?: DbOrTx,
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();
  const counterType = `warehouse_${operationType}` as const;
  const sequentialNumber = await getNextSequence(
    businessId,
    counterType,
    warehouseId,
    currentYear,
    tx,
  );
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
  return getNextSequence(
    businessId,
    "operation_type_in_category",
    categoryId,
    0,
    tx,
  );
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
    getNextSequence(
      businessId,
      "purchase_invoice_supplier",
      supplierId,
      currentYear,
      tx,
    ),
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
  return getNextSequence(
    businessId,
    "item_in_warehouse_type",
    warehouseTypeId,
    0,
    tx,
  );
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
  return getNextSequence(
    businessId,
    "item_in_exchange_type",
    exchangeTypeId,
    0,
    tx,
  );
}

export async function getNextEWalletSequence(
  businessId: number,
  eWalletTypeId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(
    businessId,
    "item_in_ewallet_type",
    eWalletTypeId,
    0,
    tx,
  );
}

export async function getNextEmployeeSequence(
  businessId: number,
  departmentId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(
    businessId,
    "employee_in_department",
    departmentId,
    0,
    tx,
  );
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
 * توليد أكواد الكيان المالي (صندوق/بنك/محفظة/صراف) مع إنشاء حساب مستقل تلقائياً
 *
 * الآلية: كل كيان يحصل على حسابه المستقل + كود مركّب + ledgerCode
 *   - كود الحساب:  FND-01, FND-02, FND-03...  (عداد مستقل لكل نوع)
 *   - كود الكيان:  FND-01/1  (دائماً /1 لحساب جديد مستقل)
 *   - ledgerCode:  FND-01-01 (للتقارير — نفس البادئة والـ padding)
 *
 * @param bizId      - معرّف العمل
 * @param natureKey  - نوع الكيان: fund | bank | e_wallet | exchange
 * @param tx         - اختياري: كائن المعاملة
 */
export async function generateFinancialEntityCodes(
  bizId: number,
  natureKey: string,
  tx?: DbOrTx,
): Promise<{
  accountCode: string;
  entityCode: string;
  ledgerCode: string;
  sequenceNumber: number;
}> {
  const { code: accountCode, sequenceNumber } = await generateLeafAccountCode(
    bizId,
    natureKey,
    tx,
  );
  const entityCode = `${accountCode}/1`;
  // ledgerCode يستخدم البادئة الرقمية (001-XX-01، 002-XX-01...)
  const numericPrefix = NATURE_PREFIXES[natureKey] || "099";
  const ledgerCode = `${numericPrefix}-${String(sequenceNumber).padStart(2, "0")}-01`;
  return { accountCode, entityCode, ledgerCode, sequenceNumber };
}

/**
 * رقم تسلسلي للمورد داخل تصنيفه
 */
export async function getNextSupplierSequence(
  businessId: number,
  supplierTypeId: number,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(
    businessId,
    "item_in_supplier_type",
    supplierTypeId,
    0,
    tx,
  );
}
