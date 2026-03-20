/**
 * schema-business.ts — Phase 12
 * الأعمال + الشركاء + المحطات + الموظفون + الحسابات + الفوترة
 * (مستخرجة من schema/core.ts)
 */
import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal, pgEnum, jsonb, date, unique, uniqueIndex } from 'drizzle-orm/pg-core';
import { accountTypeEnum, employeeStatusEnum, collectionMethodEnum } from './schema-base.ts';
import { currencies } from './schema-users.ts';

// ===================== BUSINESSES (الأعمال) =====================

export const businesses = pgTable('businesses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  type: varchar('type', { length: 30 }).default('stations'),
  description: text('description'),
  icon: varchar('icon', { length: 50 }).default('business'),
  color: varchar('color', { length: 20 }).default('#3b82f6'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== BUSINESS PARTNERS =====================

export const businessPartners = pgTable('business_partners', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  sequenceNumber: integer('sequence_number'),
  code: varchar('code', { length: 30 }),
  accountId: integer('account_id'),
  fullName: varchar('full_name', { length: 200 }).notNull(),
  sharePercentage: decimal('share_percentage', { precision: 5, scale: 2 }),
  phone: varchar('phone', { length: 20 }),
  role: varchar('role', { length: 100 }),
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== STATIONS =====================

export const stations = pgTable('stations', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  sequenceNumber: integer('sequence_number'),
  location: varchar('location', { length: 300 }),
  managerId: integer('manager_id'),
  billingSystems: jsonb('billing_systems').$type<string[]>().default([]),
  hasEmployees: boolean('has_employees').notNull().default(true),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== EMPLOYEES =====================

export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  departmentId: integer('department_id'),
  jobTitleId: integer('job_title_id'),
  sequenceNumber: integer('sequence_number'),
  code: varchar('code', { length: 30 }),
  fullName: varchar('full_name', { length: 200 }).notNull(),
  jobTitle: varchar('job_title', { length: 200 }),
  stationId: integer('station_id').references(() => stations.id),
  department: varchar('department', { length: 100 }),
  salary: decimal('salary', { precision: 15, scale: 2 }).notNull().default('0'),
  salaryCurrency: varchar('salary_currency', { length: 10 }).default('YER'),
  phone: varchar('phone', { length: 20 }),
  status: employeeStatusEnum('status').notNull().default('active'),
  hireDate: date('hire_date'),
  monthlyAllowance: decimal('monthly_allowance', { precision: 15, scale: 2 }).default('0'),
  isManager: boolean('is_manager').notNull().default(false),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== ACCOUNTS (الحسابات) =====================

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  accountType: accountTypeEnum('account_type'),
  accountSubNatureId: integer('account_sub_nature_id'),
  accountNumber: varchar('account_number', { length: 100 }),
  provider: varchar('provider', { length: 200 }),
  subType: varchar('sub_type', { length: 100 }),
  subTypeId: integer('sub_type_id'),
  sequenceNumber: integer('sequence_number'),
  code: varchar('code', { length: 30 }),
  responsiblePerson: varchar('responsible_person', { length: 200 }),
  parentAccountId: integer('parent_account_id'),
  isLeafAccount: boolean('is_leaf_account').notNull().default(true),
  linkedEmployeeId: integer('linked_employee_id'),
  supportedCurrencies: jsonb('supported_currencies').$type<string[]>().default(['YER', 'SAR', 'USD']),
  
  canInitiateReceipt: boolean('can_initiate_receipt').notNull().default(true),
  canInitiatePayment: boolean('can_initiate_payment').notNull().default(true),
  canReceivePayment: boolean('can_receive_payment').notNull().default(true),
  canBeDebitedByReceipt: boolean('can_be_debited_by_receipt').notNull().default(true),
  
  canCreateVoucher: boolean('can_create_voucher').notNull().default(false),
  canApproveVoucher: boolean('can_approve_voucher').notNull().default(false),
  
  receivesFromStations: boolean('receives_from_stations').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  codeUnique: unique('accounts_biz_code_unique').on(table.businessId, table.code),
}));

// ===================== ACCOUNT ALLOWED LINKS (الحسابات المسموح التعامل بينها) =====================

export const accountAllowedLinks = pgTable('account_allowed_links', {
  id: serial('id').primaryKey(),
  fromAccountId: integer('from_account_id').notNull().references(() => accounts.id),
  toAccountId: integer('to_account_id').notNull().references(() => accounts.id),
  linkType: varchar('link_type', { length: 30 }).notNull(), // 'receipt' | 'payment' | 'transfer'
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== ACCOUNT BALANCES =====================

export const accountBalances = pgTable('account_balances', {
  id: serial('id').primaryKey(),
  accountId: integer('account_id').notNull().references(() => accounts.id),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  balance: decimal('balance', { precision: 20, scale: 2 }).notNull().default('0'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  accountCurrencyUnique: uniqueIndex('account_balances_account_currency_unique').on(table.accountId, table.currencyId),
}));

// ===================== EMPLOYEE BILLING ACCOUNTS (حسابات الموظفين في أنظمة الفوترة) =====================

export const employeeBillingAccounts = pgTable('employee_billing_accounts', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id').notNull().references(() => employees.id),
  stationId: integer('station_id').notNull().references(() => stations.id),
  billingSystemId: integer('billing_system_id').references(() => billingSystemsConfig.id),
  accountId: integer('account_id').references(() => accounts.id),
  collectionMethod: collectionMethodEnum('collection_method').notNull(),
  label: varchar('label', { length: 200 }).notNull(), // مثل: "المغربي - نقدي جوال"
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== BILLING SYSTEMS CONFIG =====================

export const billingSystemsConfig = pgTable('billing_systems_config', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  systemKey: varchar('system_key', { length: 100 }).notNull(),
  icon: varchar('icon', { length: 50 }).default('receipt'),
  color: varchar('color', { length: 20 }).default('#3b82f6'),
  stationMode: varchar('station_mode', { length: 20 }).notNull().default('per_station'),
  stationIds: jsonb('station_ids').$type<number[]>().default([]),
  supportedMethodIds: jsonb('supported_method_ids').$type<number[]>().default([]),
  collectionMethod: collectionMethodEnum('collection_method'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('billing_systems_config_biz_key_unique').on(table.businessId, table.systemKey),
}));

// ===================== BILLING ACCOUNT TYPES =====================

export const billingAccountTypes = pgTable('billing_account_types', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }).default('receipt'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== FUNDS =====================

export const funds = pgTable('funds', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  accountId: integer('account_id').references(() => accounts.id),
  // ديناميكي: يعتمد على fund_types.sub_type_key وليس enum ثابت.
  fundType: varchar('fund_type', { length: 100 }).notNull(),
  subType: varchar('sub_type', { length: 100 }),
  subTypeId: integer('sub_type_id'),
  sequenceNumber: integer('sequence_number'),
  code: varchar('code', { length: 30 }),
  stationId: integer('station_id').references(() => stations.id),
  responsiblePerson: varchar('responsible_person', { length: 200 }),
  description: text('description'),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  codeUnique: unique('funds_biz_code_unique').on(table.businessId, table.code),
  seqUnique: unique('funds_biz_subtype_seq_unique').on(table.businessId, table.subTypeId, table.sequenceNumber),
}));

// ===================== FUND BALANCES =====================

export const fundBalances = pgTable('fund_balances', {
  id: serial('id').primaryKey(),
  fundId: integer('fund_id').notNull().references(() => funds.id),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  balance: decimal('balance', { precision: 20, scale: 2 }).notNull().default('0'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  fundCurrencyUnique: uniqueIndex('fund_balances_fund_currency_unique').on(table.fundId, table.currencyId),
}));
