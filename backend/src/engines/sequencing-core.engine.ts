/**
 * sequencing-core.engine.ts — Phase 11
 * الدوال الأساسية + ترقيم التصنيفات والعناصر
 * (مستخرجة من sequencing.engine.ts)
 */
import { db } from '../db/index.ts';
import { sequenceCounters } from '../db/schema/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import { type DbOrTx, type CounterType, ARABIC_LABELS, TYPE_PREFIXES } from './sequencing.types.ts';
import { getFirstRow } from '../utils/db-result.ts';

// ===================== الدوال الأساسية =====================

/**
 * الحصول على الرقم التسلسلي التالي لعداد معين
 * يستخدم UPSERT مع UNIQUE constraint لضمان عدم التكرار
 *
 * @param businessId - معرّف العمل (المنشأة)
 * @param counterType - نوع العداد
 * @param entityId - معرّف الكيان (تصنيف، خزينة، مخزن، إلخ)
 * @param year - السنة (0 للعدادات غير السنوية)
 * @param tx - اختياري: كائن المعاملة للاستخدام داخل transaction
 */
export async function getNextSequence(
  businessId: number,
  counterType: string,
  entityId: number,
  year: number = 0,
  tx?: DbOrTx,
): Promise<number> {
  const executor = tx || db;
  const result = await executor.execute(sql`
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
  year: number = 0,
): Promise<number> {
  const [row] = await db
    .select({ lastNumber: sequenceCounters.lastNumber })
    .from(sequenceCounters)
    .where(
      and(
        eq(sequenceCounters.businessId, businessId),
        eq(sequenceCounters.counterType, counterType),
        eq(sequenceCounters.entityId, entityId),
        eq(sequenceCounters.year, year),
      ),
    );

  return row?.lastNumber || 0;
}

// ===================== ترقيم التصنيفات =====================

/**
 * ترقيم تصنيف جديد (صناديق/بنوك/صرافين/محافظ/مخازن/قيود)
 * يعطي رقم تسلسلي للتصنيف داخل نوعه في العمل
 *
 * @param businessId - معرّف العمل
 * @param treasuryType - نوع الخزينة: fund | bank | exchange | e_wallet | warehouse | journal
 * @param tx - اختياري: كائن المعاملة
 */
export async function getNextCategorySequence(
  businessId: number,
  treasuryType:
    | "fund"
    | "bank"
    | "exchange"
    | "e_wallet"
    | "warehouse"
    | "journal",
  tx?: DbOrTx,
): Promise<number> {
  const counterType = `category_${treasuryType === "e_wallet" ? "ewallet" : treasuryType}_type`;
  // entityId = 0 لأن التصنيفات مرقمة على مستوى العمل+النوع فقط
  return getNextSequence(businessId, counterType, 0, 0, tx);
}

// ===================== ترقيم العناصر داخل التصنيف =====================

/**
 * ترقيم عنصر جديد داخل تصنيفه (صندوق/بنك/صراف/محفظة/مخزن/قالب)
 *
 * @param businessId - معرّف العمل
 * @param treasuryType - نوع الخزينة
 * @param categoryId - معرّف التصنيف (subTypeId)
 * @param tx - اختياري: كائن المعاملة
 */
export async function getNextItemInCategorySequence(
  businessId: number,
  treasuryType:
    | "fund"
    | "bank"
    | "exchange"
    | "e_wallet"
    | "warehouse"
    | "operation",
  categoryId: number,
  tx?: DbOrTx,
): Promise<{ sequenceNumber: number; code: string }> {
  const counterTypeMap: Record<string, string> = {
    fund: "item_in_fund_type",
    bank: "item_in_bank_type",
    exchange: "item_in_exchange_type",
    e_wallet: "item_in_ewallet_type",
    warehouse: "item_in_warehouse_type",
    operation: "item_in_operation_category",
  };
  const counterType = counterTypeMap[treasuryType];
  const seq = await getNextSequence(businessId, counterType, categoryId, 0, tx);

  const prefix =
    TYPE_PREFIXES[treasuryType] || treasuryType.toUpperCase().substring(0, 3);
  const code = `${prefix}${String(seq).padStart(2, "0")}`;

  return { sequenceNumber: seq, code };
}

