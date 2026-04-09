/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║       HESABATI — Shared Enums                               ║
 * ║  Single source of truth for all status/type values.        ║
 * ║  Mirrors the pgEnum definitions in schema-base.ts and       ║
 * ║  schema-lookups.ts exactly — DO NOT change values here      ║
 * ║  without a matching DB migration.                           ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * مستخدَم في: backend (validation, engines, routes) + frontend (pages, components)
 * لا يعتمد على أي مكتبة خارجية — آمن للاستخدام في المتصفح وNode.js
 */

// ═══════════════════════════════════════════════════════════════
// § 1. Voucher (السندات)
// ═══════════════════════════════════════════════════════════════

/**
 * حالات السند — pgEnum('voucher_status') في schema-base.ts
 * migration 0009 رسّخ هذين القيمين نهائياً
 */
export const VoucherStatus = {
  Draft: 'draft',
  Confirmed: 'confirmed',
  Cancelled: 'cancelled',
} as const;
export type VoucherStatus = (typeof VoucherStatus)[keyof typeof VoucherStatus];

/**
 * أنواع السند — pgEnum('voucher_type') في schema-base.ts
 */
export const VoucherType = {
  Receipt: 'receipt',
  Payment: 'payment',
  Transfer: 'transfer',
  Journal: 'journal',
  Collection: 'collection',
  Delivery: 'delivery',
  SupplyInvoice: 'supply_invoice',
  SupplyOrder: 'supply_order',
  Dispatch: 'dispatch',
  TransferOut: 'transfer_out',
  ReceiveTransfer: 'receive_transfer',
} as const;
export type VoucherType = (typeof VoucherType)[keyof typeof VoucherType];

// ═══════════════════════════════════════════════════════════════
// § 2. Purchase Invoice (فواتير الشراء)
// ═══════════════════════════════════════════════════════════════

/**
 * حالات فاتورة الشراء — pgEnum('purchase_invoice_status') في schema-lookups.ts
 */
export const PurchaseInvoiceStatus = {
  Draft: 'draft',
  Confirmed: 'confirmed',
  Partial: 'partial',
  Completed: 'completed',
  Cancelled: 'cancelled',
} as const;
export type PurchaseInvoiceStatus = (typeof PurchaseInvoiceStatus)[keyof typeof PurchaseInvoiceStatus];

/**
 * طريقة الدفع — pgEnum('payment_method') في schema-lookups.ts
 */
export const PaymentMethod = {
  Cash: 'cash',
  Credit: 'credit',
  Partial: 'partial',
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

// ═══════════════════════════════════════════════════════════════
// § 3. Account (الحسابات)
// ═══════════════════════════════════════════════════════════════

/**
 * أنواع الحسابات — pgEnum('account_type') في schema-base.ts
 * يشمل أنواع الحسابات الـ 15 المدعومة في النظام
 */
export const AccountType = {
  Fund: 'fund',
  Bank: 'bank',
  EWallet: 'e_wallet',
  Exchange: 'exchange',
  Accounting: 'accounting',
  Custody: 'custody',
  Warehouse: 'warehouse',
  Billing: 'billing',
  Budget: 'budget',
  Supplier: 'supplier',
  Employee: 'employee',
  Partner: 'partner',
  Intermediary: 'intermediary',
  Settlement: 'settlement',
  Pending: 'pending',
} as const;
export type AccountType = (typeof AccountType)[keyof typeof AccountType];

/**
 * طبيعة الحساب (مدين/دائن) — مستخدم في الحسابات والقيود
 */
export const AccountNature = {
  Debit: 'debit',
  Credit: 'credit',
} as const;
export type AccountNature = (typeof AccountNature)[keyof typeof AccountNature];

// ═══════════════════════════════════════════════════════════════
// § 4. Fund (الصناديق والمحافظ)
// ═══════════════════════════════════════════════════════════════

/**
 * أنواع الصناديق — pgEnum('fund_type') في schema-base.ts
 */
export const FundType = {
  Collection: 'collection',
  SalaryAdvance: 'salary_advance',
  Custody: 'custody',
  Safe: 'safe',
  Expense: 'expense',
  Deposit: 'deposit',
} as const;
export type FundType = (typeof FundType)[keyof typeof FundType];

// ═══════════════════════════════════════════════════════════════
// § 5. Warehouse (المستودعات)
// ═══════════════════════════════════════════════════════════════

/**
 * أنواع المستودعات — pgEnum('warehouse_type') في schema-base.ts
 */
export const WarehouseType = {
  Main: 'main',
  Station: 'station',
  Sub: 'sub',
  Custody: 'custody',
} as const;
export type WarehouseType = (typeof WarehouseType)[keyof typeof WarehouseType];

/**
 * أنواع حركات المخزون — pgEnum('movement_type') في schema-base.ts
 */
export const MovementType = {
  In: 'in',
  Out: 'out',
  Transfer: 'transfer',
  Adjustment: 'adjustment',
  SupplyInvoice: 'supply_invoice',
  SupplyOrder: 'supply_order',
  Dispatch: 'dispatch',
  TransferOut: 'transfer_out',
  ReceiveTransfer: 'receive_transfer',
} as const;
export type MovementType = (typeof MovementType)[keyof typeof MovementType];

// ═══════════════════════════════════════════════════════════════
// § 6. HR & Employees (الموارد البشرية)
// ═══════════════════════════════════════════════════════════════

/**
 * حالات الموظفين — pgEnum('employee_status') في schema-base.ts
 */
export const EmployeeStatus = {
  Active: 'active',
  Inactive: 'inactive',
  Suspended: 'suspended',
} as const;
export type EmployeeStatus = (typeof EmployeeStatus)[keyof typeof EmployeeStatus];

/**
 * أنواع المصروفات — pgEnum('expense_type') في schema-base.ts
 */
export const ExpenseType = {
  Fixed: 'fixed',
  Variable: 'variable',
  Annual: 'annual',
} as const;
export type ExpenseType = (typeof ExpenseType)[keyof typeof ExpenseType];

// ═══════════════════════════════════════════════════════════════
// § 7. Reconciliation & Pending (التسويات والمعلقات)
// ═══════════════════════════════════════════════════════════════

/**
 * حالات التسوية — pgEnum('reconciliation_status') في schema-base.ts
 */
export const ReconciliationStatus = {
  Open: 'open',
  InProgress: 'in_progress',
  Completed: 'completed',
  Disputed: 'disputed',
} as const;
export type ReconciliationStatus = (typeof ReconciliationStatus)[keyof typeof ReconciliationStatus];

/**
 * أنواع التسوية — pgEnum('reconciliation_type') في schema-base.ts
 */
export const ReconciliationType = {
  Manager: 'manager',
  Exchange: 'exchange',
  Accountant: 'accountant',
  Supplier: 'supplier',
  Custody: 'custody',
} as const;
export type ReconciliationType = (typeof ReconciliationType)[keyof typeof ReconciliationType];

/**
 * حالات الحسابات المعلقة — pgEnum('pending_status') في schema-base.ts
 */
export const PendingStatus = {
  Pending: 'pending',
  InProgress: 'in_progress',
  Resolved: 'resolved',
  WrittenOff: 'written_off',
} as const;
export type PendingStatus = (typeof PendingStatus)[keyof typeof PendingStatus];

// ═══════════════════════════════════════════════════════════════
// § 8. Billing (الفوترة)
// ═══════════════════════════════════════════════════════════════

/**
 * أنظمة الفوترة — pgEnum('billing_system') في schema-base.ts
 */
export const BillingSystem = {
  MoghrabiV1: 'moghrabi_v1',
  MoghrabiV2: 'moghrabi_v2',
  MoghrabiV3: 'moghrabi_v3',
  SupportFund: 'support_fund',
  SupportFundWest: 'support_fund_west',
  Prepaid: 'prepaid',
} as const;
export type BillingSystem = (typeof BillingSystem)[keyof typeof BillingSystem];

/**
 * طرق التحصيل — pgEnum('collection_method') في schema-base.ts
 */
export const CollectionMethod = {
  CashMobile: 'cash_mobile',
  ManualAssign: 'manual_assign',
  Electronic: 'electronic',
  HasebDeposit: 'haseb_deposit',
} as const;
export type CollectionMethod = (typeof CollectionMethod)[keyof typeof CollectionMethod];

// ═══════════════════════════════════════════════════════════════
// § 9. Users & Roles (المستخدمون والأدوار)
// ═══════════════════════════════════════════════════════════════

/**
 * أدوار المستخدمين — pgEnum('user_role') في schema-base.ts
 */
export const UserRole = {
  Admin: 'admin',
  Accountant: 'accountant',
  Manager: 'manager',
  Viewer: 'viewer',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// ═══════════════════════════════════════════════════════════════
// § 10. Currency (العملات)
// ═══════════════════════════════════════════════════════════════

/**
 * رموز العملات المدعومة — pgEnum('currency_code') في schema-base.ts
 */
export const CurrencyCode = {
  YER: 'YER',
  SAR: 'SAR',
  USD: 'USD',
} as const;
export type CurrencyCode = (typeof CurrencyCode)[keyof typeof CurrencyCode];
