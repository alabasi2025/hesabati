/**
 * schema-finance.ts — Phase 12
 * الصناديق + الموردون + السندات + المرفقات + الرواتب + المطابقة
 * (مستخرجة من schema/core.ts)
 */
import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal, pgEnum, jsonb, date, unique, uniqueIndex } from 'drizzle-orm/pg-core';
import { voucherTypeEnum, voucherStatusEnum, expenseTypeEnum, warehouseTypeEnum, movementTypeEnum, reconciliationTypeEnum, reconciliationStatusEnum, pendingStatusEnum } from './schema-base.ts';
import { currencies, users } from './schema-users.ts';
import { businesses, stations, employees, accounts, funds, billingSystemsConfig } from './schema-business.ts';
import { operationTypes } from './schema-warehouse.ts';

// ===================== SUPPLIERS =====================

export const suppliers = pgTable('suppliers', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  supplierTypeId: integer('supplier_type_id'),
  sequenceNumber: integer('sequence_number'),
  code: varchar('code', { length: 30 }),
  accountId: integer('account_id').references(() => accounts.id),
  name: varchar('name', { length: 200 }).notNull(),
  category: varchar('category', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  address: varchar('address', { length: 300 }),
  contactPerson: varchar('contact_person', { length: 200 }),
  notes: text('notes'),
  defaultCurrencyId: integer('default_currency_id').references(() => currencies.id),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== SUPPLIER BALANCES =====================

export const supplierBalances = pgTable('supplier_balances', {
  id: serial('id').primaryKey(),
  supplierId: integer('supplier_id').notNull().references(() => suppliers.id),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  balance: decimal('balance', { precision: 20, scale: 2 }).notNull().default('0'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  supplierCurrencyUnique: uniqueIndex('supplier_balances_supplier_currency_unique').on(table.supplierId, table.currencyId),
}));

// ===================== VOUCHERS (السندات) =====================

export const vouchers = pgTable('vouchers', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  voucherNumber: varchar('voucher_number', { length: 50 }).notNull(),
  voucherType: voucherTypeEnum('voucher_type').notNull(),
  status: voucherStatusEnum('status').notNull().default('unreviewed'),
  amount: decimal('amount', { precision: 20, scale: 2 }).notNull(),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  exchangeRate: decimal('exchange_rate', { precision: 15, scale: 4 }),

  fromAccountId: integer('from_account_id').references(() => accounts.id),
  toAccountId: integer('to_account_id').references(() => accounts.id),
  fromFundId: integer('from_fund_id').references(() => funds.id),
  toFundId: integer('to_fund_id').references(() => funds.id),

  stationId: integer('station_id').references(() => stations.id),
  employeeId: integer('employee_id').references(() => employees.id),
  supplierId: integer('supplier_id').references(() => suppliers.id),

  operationTypeId: integer('operation_type_id').references(() => operationTypes.id),

  description: text('description'),
  reference: varchar('reference', { length: 200 }),
  voucherDate: timestamp('voucher_date').notNull().defaultNow(),

  // حقول الترقيم الذكي
  accountSequence: varchar('account_sequence', { length: 50 }), // تسلسل الحساب (سنة-رمز-رقم)
  templateSequence: varchar('template_sequence', { length: 50 }), // تسلسل القالب (سنة-رمز-رقم)
  fullSequenceNumber: varchar('full_sequence_number', { length: 100 }), // الرقم المنسق الكامل: تصنيف-خزينة-سنة-نوع-تسلسل

  createdBy: integer('created_by').references(() => users.id),
  approvedBy: integer('approved_by').references(() => users.id),
  hasMultipleLines: boolean('has_multiple_lines').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== VOUCHER LINES (سطور السندات المتعددة) =====================

export const voucherLines = pgTable('voucher_lines', {
  id: serial('id').primaryKey(),
  voucherId: integer('voucher_id').notNull().references(() => vouchers.id),
  accountId: integer('account_id').notNull().references(() => accounts.id),
  amount: decimal('amount', { precision: 20, scale: 2 }).notNull(),
  description: text('description'),
  currencyId: integer('currency_id').references(() => currencies.id),
  exchangeRate: decimal('exchange_rate', { precision: 15, scale: 4 }),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== ATTACHMENTS (المرفقات) =====================

export const attachments = pgTable('attachments', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  tableName: varchar('table_name', { length: 100 }).notNull(), // 'vouchers' | 'employees' | etc.
  recordId: integer('record_id').notNull(),
  entityType: varchar('entity_type', { length: 50 }), // legacy compat
  entityId: integer('entity_id'), // legacy compat
  fileName: varchar('file_name', { length: 300 }).notNull(),
  filePath: varchar('file_path', { length: 500 }).notNull(),
  fileType: varchar('file_type', { length: 50 }),
  mimeType: varchar('mime_type', { length: 100 }),
  fileSize: integer('file_size'),
  description: text('description'),
  uploadedBy: integer('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== EXPENSE BUDGET =====================

export const expenseBudget = pgTable('expense_budget', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  accountId: integer('account_id').references(() => accounts.id),
  name: varchar('name', { length: 200 }).notNull(),
  stationId: integer('station_id').references(() => stations.id),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  expenseType: expenseTypeEnum('expense_type').notNull(),
  month: integer('month'),
  year: integer('year'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== SALARY RECORDS =====================

export const salaryRecords = pgTable('salary_records', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  employeeId: integer('employee_id').notNull().references(() => employees.id),
  month: integer('month').notNull(),
  year: integer('year').notNull(),
  baseSalary: decimal('base_salary', { precision: 15, scale: 2 }).notNull(),
  advance: decimal('advance', { precision: 15, scale: 2 }).default('0'),
  advanceDate: date('advance_date'),
  advancePaidVia: varchar('advance_paid_via', { length: 100 }),
  deductions: decimal('deductions', { precision: 15, scale: 2 }).default('0'),
  deductionNotes: text('deduction_notes'),
  netSalary: decimal('net_salary', { precision: 15, scale: 2 }).notNull(),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  isPaid: boolean('is_paid').notNull().default(false),
  paidDate: date('paid_date'),
  paidVia: varchar('paid_via', { length: 100 }),
  attendanceDays: integer('attendance_days'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== WAREHOUSES =====================

export const warehouses = pgTable('warehouses', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  accountId: integer('account_id').references(() => accounts.id),
  warehouseType: warehouseTypeEnum('warehouse_type').notNull(),
  sequenceNumber: integer('sequence_number'),
  code: varchar('code', { length: 30 }),
  stationId: integer('station_id').references(() => stations.id),
  responsiblePerson: varchar('responsible_person', { length: 200 }),
  location: varchar('location', { length: 300 }),
  defaultCurrencyId: integer('default_currency_id').references(() => currencies.id),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  codeUnique: unique('warehouses_biz_code_unique').on(table.businessId, table.code),
  seqUnique: unique('warehouses_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== WAREHOUSE BALANCES =====================

export const warehouseBalances = pgTable('warehouse_balances', {
  id: serial('id').primaryKey(),
  warehouseId: integer('warehouse_id').notNull().references(() => warehouses.id),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  balance: decimal('balance', { precision: 20, scale: 2 }).notNull().default('0'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  warehouseCurrencyUnique: uniqueIndex('warehouse_balances_warehouse_currency_unique').on(table.warehouseId, table.currencyId),
}));

// ===================== INVENTORY ITEMS =====================

export const inventoryItems = pgTable('inventory_items', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id),
  itemTypeId: integer('item_type_id'),
  sequenceNumber: integer('sequence_number'),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 50 }),
  category: varchar('category', { length: 100 }),
  unit: varchar('unit', { length: 50 }),
  minQuantity: decimal('min_quantity', { precision: 15, scale: 2 }),
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  codeUnique: unique('inventory_items_biz_code_unique').on(table.businessId, table.code),
}));

// ===================== INVENTORY STOCK =====================

export const inventoryStock = pgTable('inventory_stock', {
  id: serial('id').primaryKey(),
  itemId: integer('item_id').notNull().references(() => inventoryItems.id),
  warehouseId: integer('warehouse_id').notNull().references(() => warehouses.id),
  quantity: decimal('quantity', { precision: 15, scale: 2 }).notNull().default('0'),
  avgCost: decimal('avg_cost', { precision: 15, scale: 2 }),
  costingMethod: varchar('costing_method', { length: 20 }).default('weighted_avg'), // weighted_avg | fifo | lifo
  costLayers: jsonb('cost_layers').$type<Array<{qty: number; unitCost: number; date: string}>>().default([]), // طبقات التكلفة لـ FIFO/LIFO
  currencyId: integer('currency_id').references(() => currencies.id),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== INVENTORY MOVEMENTS =====================

export const inventoryMovements = pgTable('inventory_movements', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id),
  itemId: integer('item_id').notNull().references(() => inventoryItems.id),
  warehouseId: integer('warehouse_id').notNull().references(() => warehouses.id),
  movementType: movementTypeEnum('movement_type').notNull(),
  quantity: decimal('quantity', { precision: 15, scale: 2 }).notNull(),
  unitCost: decimal('unit_cost', { precision: 15, scale: 2 }),
  currencyId: integer('currency_id').references(() => currencies.id),
  toWarehouseId: integer('to_warehouse_id').references(() => warehouses.id),
  supplierId: integer('supplier_id').references(() => suppliers.id),
  stationId: integer('station_id').references(() => stations.id),
  reference: varchar('reference', { length: 200 }),
  description: text('description'),
  movementDate: date('movement_date').notNull(),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== RECONCILIATIONS =====================

export const reconciliations = pgTable('reconciliations', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  title: varchar('title', { length: 300 }).notNull(),
  reconciliationType: reconciliationTypeEnum('reconciliation_type').notNull(),
  status: reconciliationStatusEnum('status').notNull().default('open'),
  withPerson: varchar('with_person', { length: 200 }),
  accountId: integer('account_id').references(() => accounts.id),
  fundId: integer('fund_id').references(() => funds.id),
  stationId: integer('station_id').references(() => stations.id),
  employeeId: integer('employee_id').references(() => employees.id),
  supplierId: integer('supplier_id').references(() => suppliers.id),
  periodStart: date('period_start'),
  periodEnd: date('period_end'),
  expectedAmount: decimal('expected_amount', { precision: 20, scale: 2 }),
  actualAmount: decimal('actual_amount', { precision: 20, scale: 2 }),
  difference: decimal('difference', { precision: 20, scale: 2 }),
  currencyId: integer('currency_id').references(() => currencies.id),
  notes: text('notes'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== PENDING ACCOUNTS =====================

export const pendingAccounts = pgTable('pending_accounts', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id),
  accountId: integer('account_id').references(() => accounts.id),
  personOrEntity: varchar('person_or_entity', { length: 200 }).notNull(),
  description: text('description').notNull(),
  status: pendingStatusEnum('status').notNull().default('pending'),
  estimatedAmount: decimal('estimated_amount', { precision: 20, scale: 2 }),
  currencyId: integer('currency_id').references(() => currencies.id),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== BILLING PERIODS =====================

export const billingPeriods = pgTable('billing_periods', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  stationId: integer('station_id').notNull().references(() => stations.id),
  billingSystemId: integer('billing_system_id').references(() => billingSystemsConfig.id),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  totalBilled: decimal('total_billed', { precision: 20, scale: 2 }),
  totalCollected: decimal('total_collected', { precision: 20, scale: 2 }),
  totalRemaining: decimal('total_remaining', { precision: 20, scale: 2 }),
  currencyId: integer('currency_id').references(() => currencies.id),
  isClosed: boolean('is_closed').notNull().default(false),
  closedDate: date('closed_date'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== DIESEL CONSUMPTION =====================

export const dieselConsumption = pgTable('diesel_consumption', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  stationId: integer('station_id').notNull().references(() => stations.id),
  quantity: decimal('quantity', { precision: 15, scale: 2 }).notNull(),
  unit: varchar('unit', { length: 20 }).default('لتر'),
  consumptionDate: date('consumption_date').notNull(),
  billingPeriodId: integer('billing_period_id').references(() => billingPeriods.id),
  meterReading: decimal('meter_reading', { precision: 15, scale: 2 }),
  notes: text('notes'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== AUDIT LOG =====================

export const auditLog = pgTable('audit_log', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  businessId: integer('business_id').references(() => businesses.id),
  action: varchar('action', { length: 100 }).notNull(),
  tableName: varchar('table_name', { length: 100 }),
  recordId: integer('record_id'),
  oldData: jsonb('old_data'),
  newData: jsonb('new_data'),
  ipAddress: varchar('ip_address', { length: 50 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== EXPENSE CATEGORIES (أنواع المخروجات / تصنيفات المصروفات) =====================

export const expenseCategories = pgTable('expense_categories', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  sequenceNumber: integer('sequence_number'),
  code: varchar('code', { length: 30 }),
  accountId: integer('account_id'),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }).default('receipt_long'),
  color: varchar('color', { length: 20 }).default('#3b82f6'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== OPERATION CATEGORIES (تصنيفات العمليات) =====================

