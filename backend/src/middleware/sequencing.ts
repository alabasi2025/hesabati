/**
 * نظام الترقيم الذكي
 * يوفر ترقيم تسلسلي تلقائي حسب:
 * 1. الحساب/الخزينة (صندوق/بنك/محفظة/صراف/مخزن) — تسلسل سنوي لكل حساب
 * 2. القالب (نوع العملية) — تسلسل سنوي لكل قالب
 * 3. التصنيف — ترقيم تلقائي داخل كل تصنيف
 */

import { db } from '../db/index.ts';
import { sequenceCounters } from '../db/schema/core.ts';
import { eq, and, sql } from 'drizzle-orm';
import { getFirstRow } from '../utils/db-result.ts';

/**
 * الحصول على الرقم التسلسلي التالي لعداد معين
 * يستخدم UPSERT لضمان عدم التكرار حتى مع الطلبات المتزامنة
 * 
 * @param businessId - معرّف العمل
 * @param counterType - نوع العداد (account_voucher, template_voucher, account_journal, template_journal, 
 *                      account_warehouse_op, template_warehouse_op, fund_in_type, account_in_type, 
 *                      warehouse_in_type, template_in_category)
 * @param referenceId - معرّف المرجع (حساب، قالب، تصنيف)
 * @param year - السنة (اختياري، الافتراضي السنة الحالية)
 * @returns الرقم التسلسلي التالي
 */
export async function getNextSequence(
  businessId: number,
  counterType: string,
  referenceId: number,
  year?: number
): Promise<number> {
  const currentYear = year || new Date().getFullYear();
  
  // محاولة زيادة العداد الموجود
  const result = await db.execute(sql`
    INSERT INTO sequence_counters (business_id, counter_type, entity_id, year, last_number)
    VALUES (${businessId}, ${counterType}, ${referenceId}, ${currentYear}, 1)
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
  referenceId: number,
  year?: number
): Promise<number> {
  const currentYear = year || new Date().getFullYear();
  
  const [row] = await db.select({ lastNumber: sequenceCounters.lastNumber })
    .from(sequenceCounters)
    .where(and(
      eq(sequenceCounters.businessId, businessId),
      eq(sequenceCounters.counterType, counterType),
      eq(sequenceCounters.entityId, referenceId),
      eq(sequenceCounters.year, currentYear)
    ));
  
  return row?.lastNumber || 0;
}

/**
 * تنسيق الرقم التسلسلي بصيغة موحدة
 * مثال: formatSequenceNumber(2026, 'FND01', 5) → '2026-FND01-00005'
 * 
 * @param year - السنة
 * @param prefix - رمز الحساب أو القالب
 * @param sequence - الرقم التسلسلي
 * @param digits - عدد خانات الرقم (الافتراضي 5)
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
 * توليد كود تلقائي لعنصر جديد داخل تصنيفه
 * مثال: generateItemCode('FND', 3) → 'FND03'
 * 
 * @param typePrefix - بادئة النوع (FND, BNK, WLT, EXC, WHS, OT)
 * @param sequenceNumber - الرقم التسلسلي داخل التصنيف
 * @param digits - عدد خانات الرقم (الافتراضي 2)
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
 * بادئات الأنواع المختلفة
 */
export const TYPE_PREFIXES: Record<string, string> = {
  // أنواع الحسابات
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
  
  // أنواع السندات
  receipt: 'QBD',
  payment: 'SRF',
  transfer: 'TRF',
  journal: 'QYD',
  
  // أنواع العمليات المخزنية
  supply_invoice: 'SIN',
  supply_order: 'SOR',
  dispatch: 'DSP',
  // أسماء الأنواع في الواجهة/API
  transfer_out: 'WTR',
  receive_transfer: 'WRC',
  // أسماء قديمة/بديلة (للتوافق)
  warehouse_transfer: 'WTR',
  warehouse_receive: 'WRC',
};

/**
 * الحصول على الرقم التسلسلي التالي لعنصر جديد داخل تصنيفه
 * (صندوق جديد في تصنيف معين، حساب جديد في نوع معين، إلخ)
 * 
 * @param businessId - معرّف العمل
 * @param counterType - نوع العداد
 * @param typeId - معرّف التصنيف/النوع
 */
export async function getNextItemSequence(
  businessId: number,
  counterType: string,
  typeId: number
): Promise<{ sequenceNumber: number; code: string }> {
  // نستخدم سنة 0 للعدادات غير السنوية (ترقيم العناصر)
  const seq = await getNextSequence(businessId, counterType, typeId, 0);
  return { sequenceNumber: seq, code: '' }; // الكود يُحسب لاحقاً مع البادئة
}

/**
 * توليد أرقام تسلسلية للسند/القيد/العملية المخزنية
 * يولد رقمين: واحد للحساب وواحد للقالب
 * 
 * @param businessId - معرّف العمل
 * @param accountId - معرّف الحساب/الصندوق/المخزن
 * @param templateId - معرّف القالب (نوع العملية)
 * @param operationType - نوع العملية (voucher, journal, warehouse_op)
 */
export async function generateOperationSequences(
  businessId: number,
  accountId: number,
  templateId: number | null,
  operationType: 'voucher' | 'journal' | 'warehouse_op',
  year?: number
): Promise<{ accountSequence: number; templateSequence: number | null }> {
  const opYear = year || new Date().getFullYear();
  
  // تسلسل الحساب
  const accountCounterType = `account_${operationType}`;
  const accountSequence = await getNextSequence(businessId, accountCounterType, accountId, opYear);
  
  // تسلسل القالب (إذا وُجد)
  let templateSequence: number | null = null;
  if (templateId) {
    const templateCounterType = `template_${operationType}`;
    templateSequence = await getNextSequence(businessId, templateCounterType, templateId, opYear);
  }
  
  return { accountSequence, templateSequence };
}
