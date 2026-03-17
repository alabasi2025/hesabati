/**
 * transaction.types.ts — Phase 7
 * أنواع البيانات الخاصة بخدمة المعاملات المالية
 */

// ===================== الأنواع (Types) =====================

/** بيانات المعاملة التي يستقبلها المحرك */
export interface TransactionData {
  /** نوع المعاملة: سند قبض، سند صرف، تحويل، قيد يومية */
  voucherType: "receipt" | "payment" | "transfer" | "journal";
  /** المبلغ */
  amount: number;
  /** معرّف العملة */
  currencyId: number;
  /** حساب المدين (الذي يزيد رصيده) */
  debitAccountId: number;
  /** حساب الدائن (الذي ينقص رصيده) - اختياري */
  creditAccountId?: number | null;
  /** صندوق الوارد (يزيد رصيده) - اختياري */
  toFundId?: number | null;
  /** صندوق الصادر (ينقص رصيده) - اختياري */
  fromFundId?: number | null;
  /** معرّف المحطة - اختياري */
  stationId?: number | null;
  /** معرّف الموظف - اختياري */
  employeeId?: number | null;
  /** معرّف المورد - اختياري */
  supplierId?: number | null;
  /** معرّف نوع العملية (القالب) - اختياري */
  operationTypeId?: number | null;
  /** اسم نوع العملية (للوصف) - اختياري */
  operationTypeName?: string | null;
  /** الوصف */
  description?: string;
  /** المرجع */
  reference?: string | null;
  /** تاريخ السند */
  voucherDate?: Date | null;
  /** رقم السند (إذا كان محدداً مسبقاً) */
  voucherNumber?: string | null;
}

/** نتيجة تنفيذ المعاملة */
export interface TransactionResult {
  voucher: any;
  journalEntry: any;
}

/** سطر قيد محاسبي (مدين/دائن) */
export interface TransactionLine {
  accountId: number;
  lineType: "debit" | "credit";
  amount: number;
  description?: string | null;
}

/** بيانات معاملة متعددة السطور (سند واحد بعدة سطور قيد) */
export interface MultiTransactionData {
  /** نوع المعاملة/السند */
  voucherType: "receipt" | "payment" | "transfer" | "journal";
  /** معرّف العملة */
  currencyId: number;
  /** سطور القيد */
  lines: TransactionLine[];
  /** صندوق الوارد (يزيد رصيده) - اختياري */
  toFundId?: number | null;
  /** صندوق الصادر (ينقص رصيده) - اختياري */
  fromFundId?: number | null;
  /** معرّف المحطة - اختياري */
  stationId?: number | null;
  /** معرّف الموظف - اختياري */
  employeeId?: number | null;
  /** معرّف المورد - اختياري */
  supplierId?: number | null;
  /** معرّف نوع العملية (القالب) - اختياري */
  operationTypeId?: number | null;
  /** اسم نوع العملية (للوصف) - اختياري */
  operationTypeName?: string | null;
  /** الوصف */
  description?: string;
  /** المرجع */
  reference?: string | null;
  /** تاريخ السند */
  voucherDate?: Date | null;
  /** رقم السند (إذا كان محدداً مسبقاً) */
  voucherNumber?: string | null;
  /** حقول عرضية داخل جدول vouchers (قد تكون متعددة في الواقع) */
  fromAccountId?: number | null;
  toAccountId?: number | null;
}

