/**
 * sequencing.types.ts — Phase 11
 * الأنواع والثوابت الخاصة بنظام الترقيم التسلسلي
 * (مستخرجة من sequencing.engine.ts)
 */
/**
 * نظام الترقيم الذكي - النسخة الجديدة
 * ============================================
 *
 * ## آلية الترقيم الأساسية:
 *
 * ### 1. الحسابات:
 * - **الحسابات الرئيسية** (isLeafAccount = false): ترقيم شجري للتنظيم (1, 1.1, 2.3)
 * - **الحسابات الفرعية** (isLeafAccount = true): ترقيم حسب النوع الفرعي
 *   - صندوق (fund) → FND-01, FND-02
 *   - بنك (bank) → BNK-01, BNK-02
 *   - محفظة (e_wallet) → WLT-01, WLT-02
 *   - صراف (exchange) → EXC-01, EXC-02
 *   - مخزن (warehouse) → WHS-01, WHS-02
 *   - مورد (supplier) → SUP-01, SUP-02
 *
 * ### 2. التصنيفات (fund_types, bank_types, إلخ):
 * - تُستخدم للتنظيم والفلترة في الواجهة فقط
 * - ليس لها علاقة بآلية الترقيم
 * - الترقيم يعتمد على أنواع الحسابات الفرعية (account_sub_natures)
 *
 * ### 3. السندات والعمليات:
 * - سند صرف: صندوق1-2025-صرف-0001
 * - سند قبض: بنك2-2026-قبض-0015
 * - عملية مخزن: مخزن3-2025-توريد-0003
 * - قيد يومية: قيد-2025-0001
 *
 * ### القواعد:
 * 1. كل عمل (منشأة) نظام مستقل بالكامل
 * 2. أنواع الحسابات الفرعية (account_sub_natures) هي الأساس
 * 3. التصنيفات للتنظيم فقط وليس للترقيم
 */

import { db } from "../db/index.ts";
import { sequenceCounters } from "../db/schema/core.ts";
import { eq, and, sql } from "drizzle-orm";
import { getFirstRow } from "../utils/db-result.ts";

// ===================== الأنواع والثوابت =====================

/** نوع يقبل db أو transaction - يُصدَّر للاستخدام من ملفات أخرى */
export type DbOrTx = { execute: typeof db.execute };

/** أنواع العدادات */
export type CounterType =
  // ترقيم التصنيفات (بدون سنة)
  | "category_fund_type" // تصنيفات الصناديق
  | "category_bank_type" // تصنيفات البنوك
  | "category_exchange_type" // تصنيفات الصرافين
  | "category_ewallet_type" // تصنيفات المحافظ
  | "category_warehouse_type" // تصنيفات المخازن
  | "category_journal" // تصنيفات قيود اليومية
  // ترقيم العناصر داخل التصنيف (بدون سنة)
  | "item_in_fund_type" // صندوق داخل تصنيف
  | "item_in_bank_type" // بنك داخل تصنيف
  | "item_in_exchange_type" // صراف داخل تصنيف
  | "item_in_ewallet_type" // محفظة داخل تصنيف
  | "item_in_warehouse_type" // مخزن داخل تصنيف
  | "item_in_operation_category" // قالب عملية داخل تصنيف
  // ترقيم السندات (سنوي) — المفتاح: تصنيف+خزينة+نوع
  | "voucher_receipt" // سند قبض
  | "voucher_payment" // سند صرف
  | "voucher_transfer" // سند تحويل
  // ترقيم عمليات المخازن (سنوي) — المفتاح: تصنيف+مخزن+نوع
  | "warehouse_supply_invoice"
  | "warehouse_supply_order"
  | "warehouse_dispatch"
  | "warehouse_transfer_out"
  | "warehouse_receive_transfer"
  // ترقيم قيود اليومية (سنوي) — المفتاح: تصنيف
  | "journal_entry"
  // ترقيم قوالب العمليات (سنوي) — المفتاح: تصنيف
  | "operation_template";

/** بادئات الأنواع بالعربي */
export const ARABIC_LABELS: Record<string, string> = {
  // أنواع الخزائن
  fund: "صندوق",
  bank: "بنك",
  exchange: "صراف",
  e_wallet: "محفظة",
  // أنواع السندات
  receipt: "قبض",
  payment: "صرف",
  transfer: "تحويل",
  // أنواع عمليات المخازن
  supply_invoice: "توريد",
  supply_order: "طلب",
  dispatch: "صرف-مخزن",
  transfer_out: "تحويل-مخزن",
  receive_transfer: "استلام",
  // قيود ومخازن
  journal: "قيد",
  warehouse: "مخزن",
  template: "قالب",
};

/** بادئات الأنواع بالإنجليزي (للكود) */
export const TYPE_PREFIXES: Record<string, string> = {
  // أنواع الحسابات الفرعية (Account Sub-Natures)
  fund: "FND",
  bank: "BNK",
  e_wallet: "WLT",
  exchange: "EXC",
  warehouse: "WHS",
  custody: "CUS",
  supplier: "SUP",
  employee: "EMP",
  partner: "PRT",
  billing: "BIL",
  intermediary: "INT",
  budget: "BDG",
  settlement: "STL",
  pending: "PNG",
  accounting: "ACC",
  // أنواع العمليات
  receipt: "RCV",
  payment: "PAY",
  transfer: "TRF",
  journal: "JRN",
  supply_invoice: "SIN",
  supply_order: "SOR",
  dispatch: "DSP",
  transfer_out: "WTO",
  receive_transfer: "WRC",
};

/**
 * النظام الجديد للترقيم: شجري بسيط parent.child (مثال: 1.1.2)
 * يُستخدم للحسابات الرئيسية فقط (isLeafAccount = false)
 */
export function generateTreeAccountCode(
  parentCode: string | null,
  sequenceNumber: number,
): string {
  if (!parentCode) return String(sequenceNumber);
  return `${parentCode}.${sequenceNumber}`;
}

export async function getNextChildAccountSequence(
  businessId: number,
  parentId: number | null,
  tx?: DbOrTx,
): Promise<number> {
  return getNextSequence(businessId, "account_child", parentId || 0, 0, tx);
}

/**
 * توليد كود للحساب الفرعي بناءً على نوع الحساب الفرعي
 * يُستخدم للحسابات الفرعية فقط (isLeafAccount = true)
 * 
 * الآلية:
 * - الحسابات الفرعية تأخذ كود حسب النوع الفرعي (fund → FND-01, bank → BNK-01, إلخ)
 * - التصنيفات (fund_types, bank_types) للتنظيم فقط وليس لها علاقة بالترقيم
 * - أنواع الحسابات الفرعية (account_sub_natures) هي التي تحدد الكود
 * 
 * @param businessId - معرّف العمل
 * @param natureKey - مفتاح النوع الفرعي (fund, bank, e_wallet, warehouse, supplier, إلخ)
 * @param tx - اختياري: كائن المعاملة
 * @returns الكود المولد (مثل: FND-01, BNK-02)
 */
export async function generateLeafAccountCode(
  businessId: number,
  natureKey: string,
  tx?: DbOrTx,
): Promise<{ code: string; sequenceNumber: number }> {
  const counterType = `account_${natureKey}`;
  const sequenceNumber = await getNextSequence(businessId, counterType, 0, 0, tx);
  const prefix = TYPE_PREFIXES[natureKey] || natureKey.toUpperCase().substring(0, 3);
  const code = `${prefix}-${String(sequenceNumber).padStart(2, "0")}`;
  return { code, sequenceNumber };
}

/**
 * @deprecated - Legacy hierarchical code builder (kept for compatibility)
 */
export const MAIN_ACCOUNT_TYPE_SEQUENCE: Record<string, number> = {};
export function getMainAccountTypeSequence(_accountType: string): number { return 0; }
export function buildAccountHierarchyCode(_a: number, _b: string, _c: number, _d: number): string { return ""; }

