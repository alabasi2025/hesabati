/**
 * schema-lookups.ts — Phase 12
 * الشاشات + العدادات + أنواع البحث + واجهة المستخدم
 * (مستخرجة من schema/core.ts)
 */
import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal, pgEnum, jsonb, date, unique, uniqueIndex } from 'drizzle-orm/pg-core';
import { businesses, accounts, employees, funds } from './schema-business.ts';
import { users, currencies } from './schema-users.ts';
import { reconciliations, vouchers, suppliers, warehouses, inventoryItems } from './schema-finance.ts';
import { operationTypes } from './schema-warehouse.ts';

// ===================== SEQUENCE COUNTERS (عدادات التسلسل الذكي) =====================

export const sequenceCounters = pgTable('sequence_counters', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  counterType: varchar('counter_type', { length: 50 }).notNull(), // 'account' | 'template' | 'journal_category' | 'warehouse'
  entityId: integer('entity_id').notNull(), // معرف الحساب أو القالب أو التصنيف
  year: integer('year').notNull(), // السنة الميلادية
  lastNumber: integer('last_number').notNull().default(0), // آخر رقم تسلسلي
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  uniqueCounter: unique('sequence_counters_unique').on(table.businessId, table.counterType, table.entityId, table.year),
}));

// ===================== WAREHOUSE TYPES (أنواع/تصنيفات المخازن) =====================

export const warehouseTypes = pgTable('warehouse_types', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  subTypeKey: varchar('sub_type_key', { length: 100 }).notNull(),
  sequenceNumber: integer('sequence_number'),
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('warehouse'),
  color: varchar('color', { length: 50 }).default('#4CAF50'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('warehouse_types_biz_key_unique').on(table.businessId, table.subTypeKey),
  seqUnique: unique('warehouse_types_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== ACCOUNTING TYPES (أنواع رئيسية مرنة) =====================
export const accountingTypes = pgTable('accounting_types', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  subTypeKey: varchar('sub_type_key', { length: 100 }).notNull(),
  sequenceNumber: integer('sequence_number'),
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('book'),
  color: varchar('color', { length: 50 }).default('#14b8a6'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('accounting_types_biz_key_unique').on(table.businessId, table.subTypeKey),
  seqUnique: unique('accounting_types_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== ACCOUNTING SUB TYPES (تصنيفات فرعية للأنواع المرنة) =====================
export const accountingSubTypes = pgTable('accounting_sub_types', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  mainTypeId: integer('main_type_id').notNull().references(() => accountingTypes.id),
  name: varchar('name', { length: 200 }).notNull(),
  subTypeKey: varchar('sub_type_key', { length: 100 }).notNull(),
  sequenceNumber: integer('sequence_number'),
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('label'),
  color: varchar('color', { length: 50 }).default('#14b8a6'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('accounting_sub_types_biz_key_unique').on(table.businessId, table.subTypeKey),
  seqUnique: unique('accounting_sub_types_biz_main_seq_unique').on(table.businessId, table.mainTypeId, table.sequenceNumber),
}));

// ===================== ACCOUNT SUB NATURES (أنواع الحسابات الفرعية الوظيفية) =====================
export const accountSubNatures = pgTable('account_sub_natures', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  natureKey: varchar('nature_key', { length: 100 }).notNull(),
  isSystem: boolean('is_system').notNull().default(true),
  icon: varchar('icon', { length: 100 }).default('category'),
  color: varchar('color', { length: 50 }).default('#64748b'),
  sequenceNumber: integer('sequence_number'),
  requiresStation: boolean('requires_station').notNull().default(false),
  requiresEmployee: boolean('requires_employee').notNull().default(false),
  requiresProvider: boolean('requires_provider').notNull().default(false),
  requiresAccountNumber: boolean('requires_account_number').notNull().default(false),
  requiresSupplierType: boolean('requires_supplier_type').notNull().default(false),
  supportsCashOperations: boolean('supports_cash_operations').notNull().default(true),
  canReceivePayment: boolean('can_receive_payment').notNull().default(true),
  canMakePayment: boolean('can_make_payment').notNull().default(true),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('account_sub_natures_biz_key_unique').on(table.businessId, table.natureKey),
  seqUnique: unique('account_sub_natures_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== JOURNAL ENTRY CATEGORIES (تصنيفات قيود اليومية - مستقلة) =====================

export const journalEntryCategories = pgTable('journal_entry_categories', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  categoryKey: varchar('category_key', { length: 100 }).notNull(),
  sequenceNumber: integer('sequence_number'),
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('book'),
  color: varchar('color', { length: 50 }).default('#6366f1'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('journal_entry_cat_biz_key_unique').on(table.businessId, table.categoryKey),
  seqUnique: unique('journal_entry_cat_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== SUPPLIER TYPES (أنواع الموردين) =====================
export const supplierTypes = pgTable('supplier_types', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  subTypeKey: varchar('sub_type_key', { length: 100 }).notNull(),
  sequenceNumber: integer('sequence_number'),
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('local_shipping'),
  color: varchar('color', { length: 50 }).default('#f97316'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('supplier_types_biz_key_unique').on(table.businessId, table.subTypeKey),
  seqUnique: unique('supplier_types_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== INVENTORY ITEM TYPES (أنواع الأصناف) =====================
export const inventoryItemTypes = pgTable('inventory_item_types', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  subTypeKey: varchar('sub_type_key', { length: 100 }).notNull(),
  sequenceNumber: integer('sequence_number'),
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('inventory_2'),
  color: varchar('color', { length: 50 }).default('#78716c'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('item_types_biz_key_unique').on(table.businessId, table.subTypeKey),
  seqUnique: unique('item_types_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== DEPARTMENTS (الأقسام) =====================
export const departments = pgTable('departments', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 30 }),
  sequenceNumber: integer('sequence_number'),
  managerId: integer('manager_id'),
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('groups'),
  color: varchar('color', { length: 50 }).default('#06b6d4'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  codeUnique: unique('departments_biz_code_unique').on(table.businessId, table.code),
  seqUnique: unique('departments_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== JOB TITLES (المسميات الوظيفية) =====================
export const jobTitles = pgTable('job_titles', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  sequenceNumber: integer('sequence_number'),
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('badge'),
  color: varchar('color', { length: 50 }).default('#8b5cf6'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  seqUnique: unique('job_titles_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== RECONCILIATION ITEMS (بنود المطابقة) =====================
export const reconciliationItems = pgTable('reconciliation_items', {
  id: serial('id').primaryKey(),
  reconciliationId: integer('reconciliation_id').notNull().references(() => reconciliations.id),
  voucherId: integer('voucher_id').references(() => vouchers.id),
  externalDate: date('external_date'),
  externalAmount: decimal('external_amount', { precision: 20, scale: 2 }),
  externalDescription: text('external_description'),
  externalReference: varchar('external_reference', { length: 200 }),
  matchStatus: varchar('match_status', { length: 30 }).notNull().default('unmatched_system'),
  matchedAt: timestamp('matched_at'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== CUSTODY RECORDS (سجلات العهد) =====================
export const custodyRecords = pgTable('custody_records', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  custodyNumber: varchar('custody_number', { length: 50 }),
  custodyType: varchar('custody_type', { length: 20 }).notNull(),
  contentType: varchar('content_type', { length: 20 }).notNull(),
  partyName: varchar('party_name', { length: 200 }).notNull(),
  partyType: varchar('party_type', { length: 20 }).notNull(),
  employeeId: integer('employee_id').references(() => employees.id),
  supplierId: integer('supplier_id').references(() => suppliers.id),
  fundId: integer('fund_id').references(() => funds.id),
  warehouseId: integer('warehouse_id').references(() => warehouses.id),
  description: text('description'),
  status: varchar('status', { length: 30 }).notNull().default('active'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== CUSTODY SETTLEMENTS (تصفيات العهد) =====================
export const custodySettlements = pgTable('custody_settlements', {
  id: serial('id').primaryKey(),
  custodyId: integer('custody_id').notNull().references(() => custodyRecords.id),
  settlementDate: date('settlement_date').notNull(),
  settlementType: varchar('settlement_type', { length: 30 }).notNull(),
  amount: decimal('amount', { precision: 20, scale: 2 }),
  voucherId: integer('voucher_id').references(() => vouchers.id),
  inventoryItemId: integer('inventory_item_id').references(() => inventoryItems.id),
  quantity: decimal('quantity', { precision: 15, scale: 2 }),
  unitCost: decimal('unit_cost', { precision: 15, scale: 2 }),
  description: text('description'),
  attachments: jsonb('attachments').$type<any[]>().default([]),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== PURCHASE INVOICES (فواتير المشتريات) =====================

export const purchaseInvoiceStatusEnum = pgEnum('purchase_invoice_status', ['draft', 'confirmed', 'partial', 'completed', 'cancelled']);
export const paymentMethodEnum = pgEnum('payment_method', ['cash', 'credit', 'partial']);

export const purchaseInvoices = pgTable('purchase_invoices', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull(),
  supplierId: integer('supplier_id').notNull().references(() => suppliers.id),
  supplierAccountId: integer('supplier_account_id').references(() => accounts.id),
  warehouseId: integer('warehouse_id').references(() => warehouses.id),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  
  subtotal: decimal('subtotal', { precision: 20, scale: 2 }).notNull().default('0'),
  tax: decimal('tax', { precision: 20, scale: 2 }).notNull().default('0'),
  discount: decimal('discount', { precision: 20, scale: 2 }).notNull().default('0'),
  totalAmount: decimal('total_amount', { precision: 20, scale: 2 }).notNull().default('0'),
  
  paymentMethod: paymentMethodEnum('payment_method').notNull().default('credit'),
  paidAmount: decimal('paid_amount', { precision: 20, scale: 2 }).notNull().default('0'),
  remainingAmount: decimal('remaining_amount', { precision: 20, scale: 2 }).notNull().default('0'),
  
  voucherId: integer('voucher_id').references(() => vouchers.id),
  warehouseOperationId: integer('warehouse_operation_id'),
  
  status: purchaseInvoiceStatusEnum('status').notNull().default('draft'),
  invoiceDate: timestamp('invoice_date').notNull().defaultNow(),
  dueDate: timestamp('due_date'),
  
  externalReference: varchar('external_reference', { length: 100 }),
  notes: text('notes'),
  
  receivedQuantity: decimal('received_quantity', { precision: 20, scale: 4 }).notNull().default('0'),
  receivedStatus: varchar('received_status', { length: 20 }).notNull().default('pending'),
  
  sequenceNumber: integer('sequence_number'),
  fullSequenceNumber: varchar('full_sequence_number', { length: 100 }),
  
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  invoiceNumUnique: unique('purchase_invoices_biz_num_unique').on(table.businessId, table.invoiceNumber),
}));

// ===================== PURCHASE INVOICE ITEMS (أصناف فاتورة المشتريات) =====================

export const purchaseInvoiceItems = pgTable('purchase_invoice_items', {
  id: serial('id').primaryKey(),
  invoiceId: integer('invoice_id').notNull().references(() => purchaseInvoices.id),
  inventoryItemId: integer('inventory_item_id').notNull().references(() => inventoryItems.id),
  quantity: decimal('quantity', { precision: 20, scale: 4 }).notNull(),
  unitCost: decimal('unit_cost', { precision: 20, scale: 2 }).notNull(),
  totalCost: decimal('total_cost', { precision: 20, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 20, scale: 2 }).notNull().default('0'),
  discount: decimal('discount', { precision: 20, scale: 2 }).notNull().default('0'),
  receivedQuantity: decimal('received_quantity', { precision: 20, scale: 4 }).notNull().default('0'),
  sortOrder: integer('sort_order').default(0),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== WAREHOUSE OPERATIONS (عمليات المخازن) =====================

export const warehouseOperations = pgTable('warehouse_operations', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  operationNumber: varchar('operation_number', { length: 50 }).notNull(),
  operationType: varchar('operation_type', { length: 30 }).notNull(), // supply_invoice | supply_order | dispatch | transfer_out | receive_transfer
  operationTypeId: integer('operation_type_id').references(() => operationTypes.id), // القالب المستخدم
  sourceWarehouseId: integer('source_warehouse_id').references(() => warehouses.id), // المخزن المصدر
  destinationWarehouseId: integer('destination_warehouse_id').references(() => warehouses.id), // المخزن الوجهة
  relatedOperationId: integer('related_operation_id'),
  relatedVoucherId: integer('related_voucher_id').references(() => vouchers.id),
  supplierId: integer('supplier_id').references(() => suppliers.id),
  purchaseInvoiceId: integer('purchase_invoice_id').references(() => purchaseInvoices.id),
  accountId: integer('account_id').references(() => accounts.id),
  totalCost: decimal('total_cost', { precision: 20, scale: 2 }).notNull().default('0'),
  totalItems: integer('total_items').notNull().default(0),
  currencyId: integer('currency_id').references(() => currencies.id),
  operationDate: varchar('operation_date', { length: 20 }).notNull(), // YYYY-MM-DD
  description: text('description'),
  reference: varchar('reference', { length: 200 }),
  status: varchar('status', { length: 20 }).notNull().default('confirmed'), // draft | confirmed | cancelled

  // حقول الترقيم الذكي
  warehouseSequence: integer('warehouse_sequence'), // تسلسل المخزن
  templateSequence: integer('template_sequence'), // تسلسل القالب
  fullSequenceNumber: varchar('full_sequence_number', { length: 100 }), // الرقم المنسق الكامل: تصنيف-مخزن-سنة-نوع-تسلسل

  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== WAREHOUSE OPERATION ITEMS (أصناف عملية المخزن) =====================

export const warehouseOperationItems = pgTable('warehouse_operation_items', {
  id: serial('id').primaryKey(),
  operationId: integer('operation_id').notNull().references(() => warehouseOperations.id),
  itemName: varchar('item_name', { length: 200 }).notNull(), // اسم الصنف
  itemCode: varchar('item_code', { length: 50 }), // رمز الصنف
  quantity: decimal('quantity', { precision: 15, scale: 2 }).notNull(),
  unitCost: decimal('unit_cost', { precision: 15, scale: 2 }),
  totalCost: decimal('total_cost', { precision: 20, scale: 2 }),
  unit: varchar('unit', { length: 50 }), // الوحدة
  currencyId: integer('currency_id').references(() => currencies.id),
  notes: text('notes'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== ANALYTICS SNAPSHOTS (لقطات التقارير المؤقتة) =====================
export const analyticsSnapshots = pgTable('analytics_snapshots', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  reportKey: varchar('report_key', { length: 100 }).notNull(), // profit_loss | trial_balance | daily_summary | account_statement
  filtersHash: varchar('filters_hash', { length: 64 }).notNull(), // SHA-256 hash of filters for caching
  data: jsonb('data').notNull(), // البيانات المخزنة مؤقتاً
  generatedAt: timestamp('generated_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at'), // وقت انتهاء الصلاحية
  createdBy: integer('created_by').references(() => users.id),
});

// ===================== WORKFLOW TRANSITIONS (انتقالات سير العمل) =====================
export const workflowTransitions = pgTable('workflow_transitions', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  operationTypeId: integer('operation_type_id').notNull().references(() => operationTypes.id),
  fromStatus: varchar('from_status', { length: 30 }).notNull(), // draft | confirmed | pending_approval | approved | rejected | cancelled
  toStatus: varchar('to_status', { length: 30 }).notNull(),
  actionName: varchar('action_name', { length: 100 }).notNull(), // اسم الإجراء (مثل: اعتماد، رفض، إلغاء)
  actionIcon: varchar('action_icon', { length: 50 }).default('check_circle'),
  actionColor: varchar('action_color', { length: 20 }).default('#3b82f6'),
  requiredRole: varchar('required_role', { length: 100 }), // الدور المطلوب لتنفيذ الانتقال
  requiresNote: boolean('requires_note').notNull().default(false), // هل يتطلب ملاحظة
  autoExecute: boolean('auto_execute').notNull().default(false), // تنفيذ تلقائي عند الإنشاء
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== WORKFLOW HISTORY (سجل انتقالات سير العمل) =====================
export const workflowHistory = pgTable('workflow_history', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  voucherId: integer('voucher_id').notNull().references(() => vouchers.id),
  transitionId: integer('transition_id').references(() => workflowTransitions.id),
  fromStatus: varchar('from_status', { length: 30 }).notNull(),
  toStatus: varchar('to_status', { length: 30 }).notNull(),
  actionName: varchar('action_name', { length: 100 }).notNull(),
  note: text('note'),
  executedBy: integer('executed_by').references(() => users.id),
  executedAt: timestamp('executed_at').notNull().defaultNow(),
});

// ===================== UI DATA SOURCES (مصادر البيانات الديناميكية) =====================
export const uiDataSources = pgTable('ui_data_sources', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  sourceType: varchar('source_type', { length: 30 }).notNull(),
  tableName: varchar('table_name', { length: 100 }),
  queryTemplate: text('query_template'),
  filters: jsonb('filters').$type<any>().default({}),
  sorting: jsonb('sorting').$type<any>().default({}),
  config: jsonb('config').$type<any>().default({}),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== UI PAGES (صفحات الواجهة الديناميكية) =====================
export const uiPages = pgTable('ui_pages', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  pageKey: varchar('page_key', { length: 100 }).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }).default('dashboard'),
  color: varchar('color', { length: 20 }).default('#3b82f6'),
  layout: varchar('layout', { length: 30 }).default('grid'),
  config: jsonb('config').$type<any>().default({}),
  isActive: boolean('is_active').notNull().default(true),
  sortOrder: integer('sort_order').default(0),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== UI COMPONENTS (مكونات الواجهة الديناميكية) =====================
export const uiComponents = pgTable('ui_components', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  pageId: integer('page_id').notNull().references(() => uiPages.id),
  componentType: varchar('component_type', { length: 50 }).notNull(),
  title: varchar('title', { length: 200 }),
  config: jsonb('config').$type<any>().default({}),
  dataSourceId: integer('data_source_id').references(() => uiDataSources.id),
  positionX: integer('position_x').notNull().default(0),
  positionY: integer('position_y').notNull().default(0),
  width: integer('width').notNull().default(6),
  height: integer('height').notNull().default(4),
  sortOrder: integer('sort_order').notNull().default(0),
  isVisible: boolean('is_visible').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

