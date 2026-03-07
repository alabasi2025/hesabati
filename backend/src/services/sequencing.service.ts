/**
 * نظام الترقيم الذكي — طبقة خدمة (domain/application).
 * ============================================
 *
 * الهيكل: عمل → تصنيف → خزينة/مخزن → سنة → نوع العملية → رقم تسلسلي
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
import { sequenceCounters } from '../db/schema/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import { getFirstRow } from '../utils/db-result.ts';

// ===================== الأنواع والثوابت =====================

export type CounterType =
  | 'category_fund_type'
  | 'category_bank_type'
  | 'category_exchange_type'
  | 'category_ewallet_type'
  | 'category_warehouse_type'
  | 'category_journal'
  | 'item_in_fund_type'
  | 'item_in_bank_type'
  | 'item_in_exchange_type'
  | 'item_in_ewallet_type'
  | 'item_in_warehouse_type'
  | 'item_in_operation_category'
  | 'voucher_receipt'
  | 'voucher_payment'
  | 'voucher_transfer'
  | 'warehouse_supply_invoice'
  | 'warehouse_supply_order'
  | 'warehouse_dispatch'
  | 'warehouse_transfer_out'
  | 'warehouse_receive_transfer'
  | 'journal_entry'
  | 'operation_template';

export const ARABIC_LABELS: Record<string, string> = {
  fund: 'صندوق',
  bank: 'بنك',
  exchange: 'صراف',
  e_wallet: 'محفظة',
  receipt: 'قبض',
  payment: 'صرف',
  transfer: 'تحويل',
  supply_invoice: 'توريد',
  supply_order: 'طلب',
  dispatch: 'صرف-مخزن',
  transfer_out: 'تحويل-مخزن',
  receive_transfer: 'استلام',
  journal: 'قيد',
  warehouse: 'مخزن',
  template: 'قالب',
};

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

export async function getNextCategorySequence(
  businessId: number,
  treasuryType: 'fund' | 'bank' | 'exchange' | 'e_wallet' | 'warehouse' | 'journal'
): Promise<number> {
  const counterType = `category_${treasuryType === 'e_wallet' ? 'ewallet' : treasuryType}_type`;
  return getNextSequence(businessId, counterType, 0, 0);
}

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
  const counterType = `voucher_${voucherType}`;
  const sequentialNumber = await getNextSequence(businessId, counterType, treasuryId, currentYear);
  const treasuryLabel = ARABIC_LABELS[treasuryType] || treasuryType;
  const voucherLabel = ARABIC_LABELS[voucherType] || voucherType;
  const fullSequenceNumber = `${categorySeqNum}-${treasurySeqNum}-${currentYear}-${voucherLabel}-${String(sequentialNumber).padStart(4, '0')}`;
  return { fullSequenceNumber, sequentialNumber };
}

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

export function formatSequenceNumber(
  year: number,
  prefix: string,
  sequence: number,
  digits: number = 5
): string {
  const paddedSeq = String(sequence).padStart(digits, '0');
  return `${year}-${prefix}-${paddedSeq}`;
}

export function generateItemCode(
  typePrefix: string,
  sequenceNumber: number,
  digits: number = 2
): string {
  const paddedNum = String(sequenceNumber).padStart(digits, '0');
  return `${typePrefix}${paddedNum}`;
}

export async function getNextItemSequence(
  businessId: number,
  counterType: string,
  typeId: number
): Promise<{ sequenceNumber: number; code: string }> {
  const seq = await getNextSequence(businessId, counterType, typeId, 0);
  return { sequenceNumber: seq, code: '' };
}

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
