/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║       HESABATI — Shared TypeScript Interfaces               ║
 * ║  الواجهات المشتركة بين backend و frontend                  ║
 * ║  لا تعتمد على أي مكتبة خارجية أو APIs خاصة بـ Node/Browser ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import type {
  AccountType,
  AccountNature,
  VoucherStatus,
  VoucherType,
  PurchaseInvoiceStatus,
  EmployeeStatus,
  ReconciliationStatus,
  PendingStatus,
  CurrencyCode,
  UserRole,
} from './enums.ts';

// ═══════════════════════════════════════════════════════════════
// § 1. Common API Patterns
// ═══════════════════════════════════════════════════════════════

/** نتيجة API قياسية - تُستخدم في جميع الـ routes */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

/** نتيجة مُقسَّمة على صفحات */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/** معاملات الـ pagination في الـ query */
export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
}

/** خطأ API قياسي */
export interface ApiError {
  error: string;
  details?: string;
  location?: string;
  code?: string;
}

// ═══════════════════════════════════════════════════════════════
// § 2. Business (المنشأة)
// ═══════════════════════════════════════════════════════════════

/** معلومات المنشأة الأساسية */
export interface BusinessInfo {
  id: number;
  name: string;
  code: string;
  type: 'stations' | 'single_station' | 'personal';
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  isActive: boolean;
}

// ═══════════════════════════════════════════════════════════════
// § 3. Accounts (الحسابات)
// ═══════════════════════════════════════════════════════════════

/** عقدة شجرة الحسابات - تُستخدم في frontend و backend */
export interface AccountNode {
  id: number;
  name: string;
  accountNumber: string | null;
  accountType: AccountType | string;
  natureKey: AccountNature | string;
  isLeafAccount: boolean;
  parentAccountId: number | null;
  isActive: boolean;
  children?: AccountNode[];
}

/** ملخص حساب للـ dropdowns */
export interface AccountSummary {
  id: number;
  name: string;
  accountNumber: string | null;
  accountType: AccountType | string;
  natureKey: AccountNature | string;
}

// ═══════════════════════════════════════════════════════════════
// § 4. Vouchers (السندات)
// ═══════════════════════════════════════════════════════════════

/** سطر قيد محاسبي */
export interface VoucherLine {
  id?: number;
  accountId: number;
  accountName?: string | null;
  lineType: 'debit' | 'credit';
  amount: number | string;
  notes?: string | null;
  reference?: string | null;
}

/** ملخص سند للقوائم */
export interface VoucherSummary {
  id: number;
  voucherNumber: string | null;
  voucherType: VoucherType | string;
  status: VoucherStatus | string;
  amount: number | string;
  description: string | null;
  voucherDate: string | null;
  createdAt: string | Date | null;
}

// ═══════════════════════════════════════════════════════════════
// § 5. Purchase Invoices (فواتير الشراء)
// ═══════════════════════════════════════════════════════════════

/** بند فاتورة شراء */
export interface PurchaseInvoiceItem {
  id?: number;
  itemId: number;
  itemName?: string | null;
  quantity: number | string;
  unitCost: number | string;
  totalCost?: number | string;
  notes?: string | null;
}

/** ملخص فاتورة شراء للقوائم */
export interface PurchaseInvoiceSummary {
  id: number;
  invoiceNumber: string | null;
  status: PurchaseInvoiceStatus | string;
  totalAmount: number | string;
  supplierId: number | null;
  supplierName?: string | null;
  invoiceDate: string | null;
}

// ═══════════════════════════════════════════════════════════════
// § 6. Employees & HR (الموظفون والرواتب)
// ═══════════════════════════════════════════════════════════════

/** معلومات موظف للـ dropdowns */
export interface EmployeeSummary {
  id: number;
  fullName: string;
  status: EmployeeStatus | string;
  departmentId: number | null;
  stationId: number | null;
}

// ═══════════════════════════════════════════════════════════════
// § 7. Reconciliation (التسويات)
// ═══════════════════════════════════════════════════════════════

/** ملخص تسوية */
export interface ReconciliationSummary {
  id: number;
  reconciliationNumber: string | null;
  status: ReconciliationStatus | string;
  totalAmount: number | string;
  createdAt: string | Date | null;
}

// ═══════════════════════════════════════════════════════════════
// § 8. Pending Accounts (الحسابات المعلقة)
// ═══════════════════════════════════════════════════════════════

/** ملخص حساب معلق */
export interface PendingAccountSummary {
  id: number;
  status: PendingStatus | string;
  amount: number | string;
  description: string | null;
  createdAt: string | Date | null;
}

// ═══════════════════════════════════════════════════════════════
// § 9. Currency (العملات)
// ═══════════════════════════════════════════════════════════════

/** معلومات عملة */
export interface CurrencyInfo {
  id: number;
  code: CurrencyCode | string;
  name: string;
  symbol: string;
  exchangeRate: number | string;
  isBase: boolean;
}

// ═══════════════════════════════════════════════════════════════
// § 10. User & Auth (المستخدمون والمصادقة)
// ═══════════════════════════════════════════════════════════════

/** معلومات المستخدم الحالي */
export interface CurrentUser {
  id: number;
  username: string;
  fullName: string | null;
  role: UserRole | string;
  businessIds: number[];
}

/** نتيجة تسجيل الدخول */
export interface LoginResult {
  token: string;
  user: CurrentUser;
}

// ═══════════════════════════════════════════════════════════════
// § 11. Common Entity Shape
// ═══════════════════════════════════════════════════════════════

/** الحقول المشتركة في كل الكيانات */
export interface BaseEntity {
  id: number;
  createdAt: string | Date | null;
  updatedAt?: string | Date | null;
}

/** كيان يخص منشأة معينة */
export interface BizEntity extends BaseEntity {
  businessId: number;
}

/** كيان بسيط للـ dropdowns (id + name) */
export interface SimpleOption {
  id: number;
  name: string;
  code?: string | null;
}
