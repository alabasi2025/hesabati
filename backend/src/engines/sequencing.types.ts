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
import { getNextSequence } from "./sequencing-core.engine.ts";

// ===================== الأنواع والثوابت =====================

/** نوع يقبل db أو transaction - يُصدَّر للاستخدام من ملفات أخرى */
export type DbOrTx = { execute: typeof db.execute };

/** أنواع العدادات */
export type CounterType =
  // ===== ترقيم الحسابات الفرعية (بدون سنة) =====
  | "account_fund"         // صندوق  FND-01
  | "account_bank"         // بنك    BNK-01
  | "account_e_wallet"     // محفظة  WLT-01
  | "account_exchange"     // صراف   EXC-01
  | "account_warehouse"    // مخزن   WHS-01
  | "account_supplier"     // مورد   SUP-01
  | "account_employee"     // موظف   EMP-01
  | "account_partner"      // شريك   PRT-01
  | "account_custody"      // عهدة   CUS-01
  | "account_billing"      // فوترة  BIL-01
  | "account_intermediary" // وسيط   INT-01
  | "account_budget"       // ميزانية BDG-01
  | "account_settlement"   // تسوية  STL-01
  | "account_pending"      // انتقالي PNG-01
  | "account_accounting"   // محاسبة ACC-01
  // ===== ترقيم الحسابات الرئيسية الشجرية (بدون سنة) =====
  | "account_child"        // حساب رئيسي تحت أبيه 1 / 1.1 / 1.1.2
  // ===== ترقيم التصنيفات الهرمية (بدون سنة) =====
  | "category_child"       // تصنيف فرعي تحت أبيه
  // ===== ترقيم العناصر داخل نوعها (بدون سنة) =====
  | "item_in_fund_type"        // صندوق داخل نوع صناديق
  | "item_in_bank_type"        // بنك داخل نوع بنوك
  | "item_in_exchange_type"    // صراف داخل نوع صرافين
  | "item_in_ewallet_type"     // محفظة داخل نوع محافظ
  | "item_in_warehouse_type"   // مخزن داخل نوع مخازن
  | "item_in_operation_category" // قالب داخل نوع قوالب
  // ===== ترقيم المحطات والكيانات البسيطة (بدون سنة) =====
  | "station"              // محطة/فرع
  | "business_partner"     // شريك
  | "custody"              // عهدة
  | "reconciliation"       // مطابقة
  | "employee_in_department" // موظف داخل قسمه
  // ===== ترقيم أنواع القوالب (بدون سنة) =====
  | "operation_type_in_category" // قالب داخل تصنيفه
  // ===== ترقيم السندات (سنوي) — المفتاح: entityId=fundId/accountId =====
  | "voucher_receipt"      // سند قبض
  | "voucher_payment"      // سند صرف
  // ===== ترقيم عمليات المخازن (سنوي) — المفتاح: entityId=warehouseId =====
  | "warehouse_receive_purchase" // استلام فاتورة مشتريات
  | "warehouse_direct_supply"    // توريد مباشر
  | "warehouse_dispatch"         // صرف مخزن
  | "warehouse_transfer_out"     // تحويل خارج (entityId=sourceWarehouseId)
  | "warehouse_receive_transfer" // استلام تحويل (entityId=destWarehouseId)
  // ===== ترقيم فواتير المشتريات (سنوي) =====
  | "purchase_invoice_global"    // رقم عام على مستوى العمل (entityId=0)
  | "purchase_invoice_supplier"  // رقم خاص بالمورد (entityId=supplierId)
  // ===== ترقيم القيود المحاسبية (سنوي) — المفتاح: entityId=journalTypeId =====
  | "journal_entry"
  // ===== ترقيم قوالب العمليات عند الإنشاء (سنوي) — المفتاح: entityId=categoryId =====
  | "operation_template"
  // ===== ترقيم الأعمال (المنشآت) — بدون سنة =====
  | "business";

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
  receive_purchase: "استلام",
  direct_supply: "توريد",
  dispatch: "صرف",
  transfer_out: "تحويل",
  receive_transfer: "استلام-تحويل",
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

/**
 * توليد كود بسيط من prefix ورقم تسلسلي
 * مثال: generateItemCode('PRT', 3) → 'PRT-03'
 */
export function generateItemCode(prefix: string, sequenceNumber: number): string {
  return `${prefix}-${String(sequenceNumber).padStart(2, "0")}`;
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


