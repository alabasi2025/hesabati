/**
 * نظام الترقيم الذكي - النسخة الجديدة
 * ============================================
 * 
 * الهيكل: عمل → تصنيف → خزينة/مخزن → سنة → نوع العملية → رقم تسلسلي
 * 
 * أمثلة:
 *   سند صرف: تصنيف1-صندوق1-2025-صرف-0001
 *   سند قبض: تصنيف2-بنك3-2026-قبض-0015
 *   عملية مخزن: تصنيف1-مخزن2-2025-توريد-0003
 *   قيد يومية: تصنيف1-قيد-2025-0001
 *   قالب عملية: تصنيف1-قالب-2025-0001
 * 
 * القواعد:
 * 1. كل عمل (منشأة) نظام مستقل بالكامل
 * 2. السندات (صرف/قبض) محصورة على: صناديق، بنوك، محافظ، صرافين
 * 3. التصنيفات مرقمة حسب نوعها داخل كل عمل
 * 4. الخزائن/المخازن مرقمة داخل تصنيفها
 * 5. السندات/العمليات مرقمة حسب: تصنيف + خزينة/مخزن + سنة + نوع
 * 6. قيود اليومية: تصنيف + سنة + تسلسل
 * 7. قوالب العمليات: تصنيف + سنة + تسلسل
 */

import { db } from '../db/index.ts';
import { sequenceCounters } from '../db/schema/core.ts';
import { eq, and, sql } from 'drizzle-orm';
import { getFirstRow } from '../utils/db-result.ts';

// ===================== الأنواع والثوابت =====================

/** أنواع العدادات */
export type CounterType =
  // ترقيم التصنيفات (بدون سنة)
  | 'category_fund_type'        // تصنيفات الصناديق
  | 'category_bank_type'        // تصنيفات البنوك
  | 'category_exchange_type'    // تصنيفات الصرافين
  | 'category_ewallet_type'     // تصنيفات المحافظ
  | 'category_warehouse_type'   // تصنيفات المخازن
  | 'category_journal'          // تصنيفات قيود اليومية
  // ترقيم العناصر داخل التصنيف (بدون سنة)
  | 'item_in_fund_type'         // صندوق داخل تصنيف
  | 'item_in_bank_type'         // بنك داخل تصنيف
  | 'item_in_exchange_type'     // صراف داخل تصنيف
  | 'item_in_ewallet_type'      // محفظة داخل تصنيف
  | 'item_in_warehouse_type'    // مخزن داخل تصنيف
  | 'item_in_operation_category'// قالب عملية داخل تصنيف
  // ترقيم السندات (سنوي) — المفتاح: تصنيف+خزينة+نوع
  | 'voucher_receipt'           // سند قبض
  | 'voucher_payment'           // سند صرف
  | 'voucher_transfer'          // سند تحويل
  // ترقيم عمليات المخازن (سنوي) — المفتاح: تصنيف+مخزن+نوع
  | 'warehouse_supply_invoice'
  | 'warehouse_supply_order'
  | 'warehouse_dispatch'
  | 'warehouse_transfer_out'
  | 'warehouse_receive_transfer'
  // ترقيم قيود اليومية (سنوي) — المفتاح: تصنيف
  | 'journal_entry'
  // ترقيم قوالب العمليات (سنوي) — المفتاح: تصنيف
  | 'operation_template';

/** بادئات الأنواع بالعربي */
export const ARABIC_LABELS: Record<string, string> = {
  // أنواع الخزائن
  fund: 'صندوق',
  bank: 'بنك',
  exchange: 'صراف',
  e_wallet: 'محفظة',
  // أنواع السندات
  receipt: 'قبض',
  payment: 'صرف',
  transfer: 'تحويل',
  // أنواع عمليات المخازن
  supply_invoice: 'توريد',
  supply_order: 'طلب',
  dispatch: 'صرف-مخزن',
  transfer_out: 'تحويل-مخزن',
  receive_transfer: 'استلام',
  // قيود ومخازن
  journal: 'قيد',
  warehouse: 'مخزن',
  template: 'قالب',
};

/** بادئات الأنواع بالإنجليزي (للكود) */
export const TYPE_PREFIXES: Record<string, string> = {
  fund: 'FND',
  bank: 'BNK',
  e_wallet: 'WLT',
  exchange: 'EXC',
  warehouse: 'WHS',
  accounting: 'ACC',
  intermediary: 'INT',
  cash: 'CSH',
  custody: 'CUS',
  service: 'SRV',
  receipt: 'RCV',
  payment: 'PAY',
  transfer: 'TRF',
  journal: 'JRN',
  supply_invoice: 'SIN',
  supply_order: 'SOR',
  dispatch: 'DSP',
  transfer_out: 'WTO',
  receive_transfer: 'WRC',
};

// ===================== الدوال الأساسية =====================

/**
 * الحصول على الرقم التسلسلي التالي لعداد معين
 * يستخدم UPSERT مع UNIQUE constraint لضمان عدم التكرار
 * 
 * @param businessId - معرّف العمل (المنشأة)
 * @param counterType - نوع العداد
 * @param entityId - معرّف الكيان (تصنيف، خزينة، مخزن، إلخ)
 * @param year - السنة (0 للعدادات غير السنوية)
 */
export async function getNextSequence(
  businessId: number,
  counterType: string,
  entityId: number,
  year: number = 0
): Promise<number> {
  const result = await db.execute(sql`
    INSERT INTO sequence_counters (business_id, counter_type, entity_id, year, last_number)
    VALUES (${businessId}, ${counterType}, ${entityId}, ${year}, 1)
    ON CONFLICT (business_id, counter_type, entity_id, year)
    DO UPDATE SET last_number = sequence_counters.last_number + 1, updated_at = NOW()
    RETURNING last_number
  `);

  const row = getFirstRow<{ last_number: number }>(result);
  return row?.last_number ?? 1;
}

/**
 * الحصول على العداد الحالي بدون زيادة
 */
export async function getCurrentSequence(
  businessId: number,
  counterType: string,
  entityId: number,
  year: number = 0
): Promise<number> {
  const [row] = await db.select({ lastNumber: sequenceCounters.lastNumber })
    .from(sequenceCounters)
    .where(and(
      eq(sequenceCounters.businessId, businessId),
      eq(sequenceCounters.counterType, counterType),
      eq(sequenceCounters.entityId, entityId),
      eq(sequenceCounters.year, year)
    ));
  
  return row?.lastNumber || 0;
}

// ===================== ترقيم التصنيفات =====================

/**
 * ترقيم تصنيف جديد (صناديق/بنوك/صرافين/محافظ/مخازن/قيود)
 * يعطي رقم تسلسلي للتصنيف داخل نوعه في العمل
 * 
 * @param businessId - معرّف العمل
 * @param treasuryType - نوع الخزينة: fund | bank | exchange | e_wallet | warehouse | journal
 */
export async function getNextCategorySequence(
  businessId: number,
  treasuryType: 'fund' | 'bank' | 'exchange' | 'e_wallet' | 'warehouse' | 'journal'
): Promise<number> {
  const counterType = `category_${treasuryType === 'e_wallet' ? 'ewallet' : treasuryType}_type`;
  // entityId = 0 لأن التصنيفات مرقمة على مستوى العمل+النوع فقط
  return getNextSequence(businessId, counterType, 0, 0);
}

// ===================== ترقيم العناصر داخل التصنيف =====================

/**
 * ترقيم عنصر جديد داخل تصنيفه (صندوق/بنك/صراف/محفظة/مخزن/قالب)
 * 
 * @param businessId - معرّف العمل
 * @param treasuryType - نوع الخزينة
 * @param categoryId - معرّف التصنيف (subTypeId)
 */
export async function getNextItemInCategorySequence(
  businessId: number,
  treasuryType: 'fund' | 'bank' | 'exchange' | 'e_wallet' | 'warehouse' | 'operation',
  categoryId: number
): Promise<{ sequenceNumber: number; code: string }> {
  const counterTypeMap: Record<string, string> = {
    fund: 'item_in_fund_type',
    bank: 'item_in_bank_type',
    exchange: 'item_in_exchange_type',
    e_wallet: 'item_in_ewallet_type',
    warehouse: 'item_in_warehouse_type',
    operation: 'item_in_operation_category',
  };
  const counterType = counterTypeMap[treasuryType];
  const seq = await getNextSequence(businessId, counterType, categoryId, 0);
  
  const prefix = TYPE_PREFIXES[treasuryType] || treasuryType.toUpperCase().substring(0, 3);
  const code = `${prefix}${String(seq).padStart(2, '0')}`;
  
  return { sequenceNumber: seq, code };
}

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
 */
export async function generateVoucherFullSequence(
  businessId: number,
  categorySeqNum: number,
  treasurySeqNum: number,
  treasuryType: string,
  voucherType: 'receipt' | 'payment' | 'transfer' | 'journal',
  treasuryId: number,
  year?: number
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();
  
  // المفتاح الفريد: نوع السند + خزينة محددة
  const counterType = `voucher_${voucherType}`;
  // entityId = treasuryId لأن الترقيم حسب الخزينة
  const sequentialNumber = await getNextSequence(businessId, counterType, treasuryId, currentYear);
  
  const treasuryLabel = ARABIC_LABELS[treasuryType] || treasuryType;
  const voucherLabel = ARABIC_LABELS[voucherType] || voucherType;
  
  const fullSequenceNumber = `${categorySeqNum}-${treasurySeqNum}-${currentYear}-${voucherLabel}-${String(sequentialNumber).padStart(4, '0')}`;
  
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
 */
export async function generateWarehouseOpFullSequence(
  businessId: number,
  categorySeqNum: number,
  warehouseSeqNum: number,
  operationType: string,
  warehouseId: number,
  year?: number
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();
  
  const counterType = `warehouse_${operationType}`;
  const sequentialNumber = await getNextSequence(businessId, counterType, warehouseId, currentYear);
  
  const opLabel = ARABIC_LABELS[operationType] || operationType;
  
  const fullSequenceNumber = `${categorySeqNum}-${warehouseSeqNum}-${currentYear}-${opLabel}-${String(sequentialNumber).padStart(4, '0')}`;
  
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
 */
export async function generateJournalEntryFullSequence(
  businessId: number,
  categorySeqNum: number,
  categoryId: number,
  year?: number
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();
  
  const sequentialNumber = await getNextSequence(businessId, 'journal_entry', categoryId, currentYear);
  
  const fullSequenceNumber = `${categorySeqNum}-${currentYear}-${String(sequentialNumber).padStart(4, '0')}`;
  
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
 */
export async function generateOperationTemplateFullSequence(
  businessId: number,
  categorySeqNum: number,
  categoryId: number,
  year?: number
): Promise<{ fullSequenceNumber: string; sequentialNumber: number }> {
  const currentYear = year || new Date().getFullYear();
  
  const sequentialNumber = await getNextSequence(businessId, 'operation_template', categoryId, currentYear);
  
  const fullSequenceNumber = `${categorySeqNum}-${currentYear}-${String(sequentialNumber).padStart(4, '0')}`;
  
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
  digits: number = 5
): string {
  const paddedSeq = String(sequence).padStart(digits, '0');
  return `${year}-${prefix}-${paddedSeq}`;
}

/**
 * توليد كود تلقائي لعنصر جديد داخل تصنيفه (للتوافق مع الكود القديم)
 */
export function generateItemCode(
  typePrefix: string,
  sequenceNumber: number,
  digits: number = 2
): string {
  const paddedNum = String(sequenceNumber).padStart(digits, '0');
  return `${typePrefix}${paddedNum}`;
}

/**
 * الحصول على الرقم التسلسلي التالي لعنصر جديد داخل تصنيفه (للتوافق مع الكود القديم)
 */
export async function getNextItemSequence(
  businessId: number,
  counterType: string,
  typeId: number
): Promise<{ sequenceNumber: number; code: string }> {
  const seq = await getNextSequence(businessId, counterType, typeId, 0);
  return { sequenceNumber: seq, code: '' };
}

/**
 * توليد أرقام تسلسلية للسند/القيد/العملية المخزنية (للتوافق مع الكود القديم)
 */
export async function generateOperationSequences(
  businessId: number,
  accountId: number,
  templateId: number | null,
  operationType: 'voucher' | 'journal' | 'warehouse_op'
): Promise<{ accountSequence: number; templateSequence: number | null }> {
  const year = new Date().getFullYear();
  
  const accountCounterType = `account_${operationType}`;
  const accountSequence = await getNextSequence(businessId, accountCounterType, accountId, year);
  
  let templateSequence: number | null = null;
  if (templateId) {
    const templateCounterType = `template_${operationType}`;
    templateSequence = await getNextSequence(businessId, templateCounterType, templateId, year);
  }
  
  return { accountSequence, templateSequence };
}
