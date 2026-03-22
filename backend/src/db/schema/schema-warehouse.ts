/**
 * schema-warehouse.ts — Phase 12
 * المخازن + الأصناف + العمليات + القيود + الشريط الجانبي
 * (مستخرجة من schema/core.ts)
 */
import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal, pgEnum, jsonb, date, unique, uniqueIndex } from 'drizzle-orm/pg-core';
import { businesses, stations, accounts, funds, employees, employeeBillingAccounts } from './schema-business.ts';
import { users } from './schema-users.ts';
import { warehouses } from './schema-finance.ts';

export const operationCategories = pgTable('operation_categories', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  categoryKey: varchar('category_key', { length: 100 }).notNull(),
  sequenceNumber: integer('sequence_number'),
  code: varchar('code', { length: 30 }),
  description: text('description'),
  icon: varchar('icon', { length: 50 }).default('category'),
  color: varchar('color', { length: 20 }).default('#6366f1'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('op_categories_biz_key_unique').on(table.businessId, table.categoryKey),
  codeUnique: unique('op_categories_biz_code_unique').on(table.businessId, table.code),
  seqUnique: unique('op_categories_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== OPERATION TYPES (أنواع العمليات - القوالب) =====================

export const operationTypes = pgTable('operation_types', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }).default('receipt_long'),
  color: varchar('color', { length: 20 }).default('#3b82f6'),
  categoryId: integer('category_id').notNull().references(() => operationCategories.id),
  sequenceNumber: integer('sequence_number'),
  code: varchar('code', { length: 30 }),
  voucherType: varchar('voucher_type', { length: 30 }),
  paymentMethod: varchar('payment_method', { length: 30 }),
  sourceAccountId: integer('source_account_id').references(() => accounts.id),
  sourceFundId: integer('source_fund_id').references(() => funds.id),
  sourceWarehouseId: integer('source_warehouse_id').references(() => warehouses.id),
  mainAccountId: integer('main_account_id').references(() => accounts.id),
  mainFundId: integer('main_fund_id').references(() => funds.id),
  templateTypeId: integer('template_type_id'),
  screens: text('screens').default('{}'),
  requiresAttachment: boolean('requires_attachment').notNull().default(false),
  hasMultiLines: boolean('has_multi_lines').notNull().default(false),
  workflowConfig: jsonb('workflow_config').$type<{ enabled: boolean; initialStatus: string; statuses: string[] }>(), // إعدادات سير العمل
  autoJournal: boolean('auto_journal').notNull().default(false), // إنشاء قيد محاسبي تلقائي من العمليات المخزنية عند true
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  codeUnique: unique('operation_types_biz_code_unique').on(table.businessId, table.code),
  seqUnique: unique('operation_types_biz_cat_seq_unique').on(table.businessId, table.categoryId, table.sequenceNumber),
}));

// ===================== OPERATION TYPE ACCOUNTS (الحسابات المرتبطة بكل نوع عملية) =====================

export const operationTypeAccounts = pgTable('operation_type_accounts', {
  id: serial('id').primaryKey(),
  operationTypeId: integer('operation_type_id').notNull().references(() => operationTypes.id),
  accountId: integer('account_id').references(() => accounts.id),
  employeeBillingAccountId: integer('employee_billing_account_id').references(() => employeeBillingAccounts.id),
  label: varchar('label', { length: 200 }),
  permission: varchar('permission', { length: 30 }).notNull().default('both'), // 'receive_only' | 'pay_only' | 'both'
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== JOURNAL ENTRIES (القيود المحاسبية) =====================

export const journalEntries = pgTable('journal_entries', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  entryNumber: varchar('entry_number', { length: 50 }).notNull(),
  description: text('description'),
  entryDate: date('entry_date').notNull(),
  reference: varchar('reference', { length: 100 }),
  operationTypeId: integer('operation_type_id').references(() => operationTypes.id),
  category: varchar('category', { length: 100 }), // تصنيف القيد (مستقل عن تصنيف القالب)
  categorySequence: varchar('category_sequence', { length: 50 }), // تسلسل التصنيف (سنة-رمز-رقم)
  templateSequence: varchar('template_sequence', { length: 50 }), // تسلسل القالب
  fullSequenceNumber: varchar('full_sequence_number', { length: 100 }), // الرقم المنسق الكامل: تصنيف-قيد-سنة-تسلسل
  createdBy: integer('created_by').references(() => users.id),
  isBalanced: boolean('is_balanced').notNull().default(false),
  totalDebit: decimal('total_debit', { precision: 20, scale: 2 }).notNull().default('0'),
  totalCredit: decimal('total_credit', { precision: 20, scale: 2 }).notNull().default('0'),
  status: varchar('status', { length: 20 }).notNull().default('confirmed'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const journalEntryLines = pgTable('journal_entry_lines', {
  id: serial('id').primaryKey(),
  journalEntryId: integer('journal_entry_id').notNull().references(() => journalEntries.id),
  accountId: integer('account_id').notNull().references(() => accounts.id),
  lineType: varchar('line_type', { length: 10 }).notNull(), // 'debit' | 'credit'
  amount: decimal('amount', { precision: 20, scale: 2 }).notNull(),
  description: text('description'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== SIDEBAR SECTIONS (أقسام التبويب الجانبي) =====================

export const sidebarSections = pgTable('sidebar_sections', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  icon: varchar('icon', { length: 50 }).default('folder'),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== SIDEBAR ITEMS (عناصر التبويب الجانبي) =====================

export const sidebarItems = pgTable('sidebar_items', {
  id: serial('id').primaryKey(),
  sectionId: integer('section_id').notNull().references(() => sidebarSections.id),
  screenKey: varchar('screen_key', { length: 100 }).notNull(),
  label: varchar('label', { length: 200 }).notNull(),
  icon: varchar('icon', { length: 50 }).notNull(),
  route: varchar('route', { length: 300 }).notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  badge: integer('badge'),
  badgeColor: varchar('badge_color', { length: 20 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== USER SIDEBAR CONFIG (تخصيص التبويب لكل مستخدم) =====================

export const userSidebarConfig = pgTable('user_sidebar_config', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  sidebarItemId: integer('sidebar_item_id').notNull().references(() => sidebarItems.id),
  isVisible: boolean('is_visible').notNull().default(true),
  customSortOrder: integer('custom_sort_order'),
  customSectionName: varchar('custom_section_name', { length: 200 }),
  permission: varchar('permission', { length: 20 }).notNull().default('view'), // view | execute
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== FUND TYPES (أنواع الصناديق) =====================
export const fundTypes = pgTable('fund_types', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  subTypeKey: varchar('sub_type_key', { length: 100 }).notNull(),
  sequenceNumber: integer('sequence_number'),
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('savings'),
  color: varchar('color', { length: 50 }).default('#4CAF50'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('fund_types_biz_key_unique').on(table.businessId, table.subTypeKey),
  seqUnique: unique('fund_types_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== BANK TYPES (أنواع البنوك) =====================
export const bankTypes = pgTable("bank_types", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  name: varchar("name", { length: 200 }).notNull(),
  subTypeKey: varchar("sub_type_key", { length: 100 }).notNull(),
  sequenceNumber: integer("sequence_number"),
  description: text("description"),
  icon: varchar("icon", { length: 100 }).default("account_balance"),
  color: varchar("color", { length: 50 }).default("#4CAF50"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('bank_types_biz_key_unique').on(table.businessId, table.subTypeKey),
  seqUnique: unique('bank_types_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== EXCHANGE TYPES (أنواع الصرافين) =====================
export const exchangeTypes = pgTable("exchange_types", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  name: varchar("name", { length: 200 }).notNull(),
  subTypeKey: varchar("sub_type_key", { length: 100 }).notNull(),
  sequenceNumber: integer("sequence_number"),
  description: text("description"),
  icon: varchar("icon", { length: 100 }).default("currency_exchange"),
  color: varchar("color", { length: 50 }).default("#4CAF50"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('exchange_types_biz_key_unique').on(table.businessId, table.subTypeKey),
  seqUnique: unique('exchange_types_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== E-WALLET TYPES (أنواع المحافظ الإلكترونية) =====================
export const eWalletTypes = pgTable("e_wallet_types", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  name: varchar("name", { length: 200 }).notNull(),
  subTypeKey: varchar("sub_type_key", { length: 100 }).notNull(),
  sequenceNumber: integer("sequence_number"),
  description: text("description"),
  icon: varchar("icon", { length: 100 }).default("e_wallet"),
  color: varchar("color", { length: 50 }).default("#4CAF50"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  keyUnique: unique('e_wallet_types_biz_key_unique').on(table.businessId, table.subTypeKey),
  seqUnique: unique('e_wallet_types_biz_seq_unique').on(table.businessId, table.sequenceNumber),
}));

// ===================== SCREEN TEMPLATES (قوالب الشاشات المخصصة) =====================

export const screenTemplates = pgTable('screen_templates', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }).default('dashboard'),
  color: varchar('color', { length: 20 }).default('#3b82f6'),
  layoutConfig: jsonb('layout_config').$type<any>().default({}),
  templateKey: varchar('template_key', { length: 50 }), // collection | delivery | monitoring | reports | blank
  isSystem: boolean('is_system').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== SCREEN WIDGETS (عناصر الشاشة) =====================

export const screenWidgets = pgTable('screen_widgets', {
  id: serial('id').primaryKey(),
  screenId: integer('screen_id').notNull().references(() => screenTemplates.id),
  widgetType: varchar('widget_type', { length: 50 }).notNull(), // templates | log | accounts | inventory | stats | chart | reports | notes
  title: varchar('title', { length: 200 }).notNull(),
  config: jsonb('config').$type<any>().default({}),
  positionX: integer('position_x').notNull().default(0),
  positionY: integer('position_y').notNull().default(0),
  width: integer('width').notNull().default(4),
  height: integer('height').notNull().default(3),
  sortOrder: integer('sort_order').notNull().default(0),
  isVisible: boolean('is_visible').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== SCREEN WIDGET TEMPLATES (ربط عنصر القوالب بقوالب العمليات) =====================

export const screenWidgetTemplates = pgTable('screen_widget_templates', {
  id: serial('id').primaryKey(),
  widgetId: integer('widget_id').notNull().references(() => screenWidgets.id),
  operationTypeId: integer('operation_type_id').notNull().references(() => operationTypes.id),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== SCREEN WIDGET ACCOUNTS (ربط عنصر المراقبة بالحسابات) =====================

export const screenWidgetAccounts = pgTable('screen_widget_accounts', {
  id: serial('id').primaryKey(),
  widgetId: integer('widget_id').notNull().references(() => screenWidgets.id),
  accountId: integer('account_id').notNull().references(() => accounts.id),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== SCREEN WIDGET WAREHOUSES (ربط تبويب مراقبة الأصناف بالمخازن) =====================

export const screenWidgetWarehouses = pgTable('screen_widget_warehouses', {
  id: serial('id').primaryKey(),
  widgetId: integer('widget_id').notNull().references(() => screenWidgets.id),
  warehouseId: integer('warehouse_id').notNull().references(() => warehouses.id),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ==============

// ===================== SCREEN PERMISSIONS (صلاحيات الشاشات المخصصة) =====================

export const screenPermissions = pgTable('screen_permissions', {
  id: serial('id').primaryKey(),
  screenId: integer('screen_id').notNull().references(() => screenTemplates.id),
  userId: integer('user_id').notNull().references(() => users.id),
  permission: varchar('permission', { length: 20 }).notNull().default('view'), // view | execute
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});


// ===================== CUSTOM SCREEN CONFIG (إعداد الشاشة المخصصة - نمط التحصيل) =====================

export const customScreenConfig = pgTable('custom_screen_config', {
  id: serial('id').primaryKey(),
  screenId: integer('screen_id').notNull().references(() => screenTemplates.id).unique(),
  // التبويب الأول (مثلاً عمليات القبض)
  tab1Label: varchar('tab1_label', { length: 200 }).notNull().default('تحصيل'),
  tab1Icon: varchar('tab1_icon', { length: 100 }).notNull().default('arrow_downward'),
  tab1Color: varchar('tab1_color', { length: 20 }).notNull().default('#22c55e'),
  tab1OperationTypeIds: jsonb('tab1_operation_type_ids').$type<number[]>().default([]),
  // التبويب الثاني (مثلاً عمليات الصرف)
  tab2Label: varchar('tab2_label', { length: 200 }).notNull().default('توريد'),
  tab2Icon: varchar('tab2_icon', { length: 100 }).notNull().default('arrow_upward'),
  tab2Color: varchar('tab2_color', { length: 20 }).notNull().default('#ef4444'),
  tab2OperationTypeIds: jsonb('tab2_operation_type_ids').$type<number[]>().default([]),
  // تبويب السجل
  historyLabel: varchar('history_label', { length: 200 }).notNull().default('السجل'),
  historyIcon: varchar('history_icon', { length: 100 }).notNull().default('history'),
  historyColor: varchar('history_color', { length: 20 }).notNull().default('#6366f1'),
  // قسم المراقبة (صناديق/محافظ/بنوك...)
  accountsSectionLabel: varchar('accounts_section_label', { length: 200 }).notNull().default('الصناديق'),
  accountsIcon: varchar('accounts_icon', { length: 100 }).notNull().default('savings'),
  accountsColor: varchar('accounts_color', { length: 20 }).notNull().default('#10b981'),
  accountIds: jsonb('account_ids').$type<number[]>().default([]),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

