import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal, pgEnum, jsonb, date, unique, uniqueIndex } from 'drizzle-orm/pg-core';

// ===================== ENUMS =====================

export const userRoleEnum = pgEnum('user_role', ['admin', 'accountant', 'manager', 'viewer']);
export const currencyCodeEnum = pgEnum('currency_code', ['YER', 'SAR', 'USD']);

export const accountTypeEnum = pgEnum('account_type', [
  'fund', 'bank', 'e_wallet', 'exchange', 'accounting', 'custody', 'warehouse', 'billing',
  'budget', 'supplier', 'employee', 'partner', 'intermediary', 'settlement', 'pending',
]);

export const fundTypeEnum = pgEnum('fund_type', [
  'collection', 'salary_advance', 'custody', 'safe', 'expense', 'deposit',
]);

export const voucherTypeEnum = pgEnum('voucher_type', [
  'receipt', 'payment', 'transfer', 'journal', 'collection', 'delivery',
  'supply_invoice', 'supply_order', 'dispatch', 'transfer_out', 'receive_transfer',
]);

export const voucherStatusEnum = pgEnum('voucher_status', ['draft', 'confirmed', 'cancelled', 'pending_approval', 'approved', 'rejected', 'reversed']);
export const expenseTypeEnum = pgEnum('expense_type', ['fixed', 'variable', 'annual']);
export const warehouseTypeEnum = pgEnum('warehouse_type', ['main', 'station', 'sub', 'custody']);
export const movementTypeEnum = pgEnum('movement_type', ['in', 'out', 'transfer', 'adjustment', 'supply_invoice', 'supply_order', 'dispatch', 'transfer_out', 'receive_transfer']);
export const employeeStatusEnum = pgEnum('employee_status', ['active', 'inactive', 'suspended']);
export const voucherReversalStatusEnum = pgEnum('voucher_reversal_status', ['original', 'reversed', 'reversal']);

export const billingSystemEnum = pgEnum('billing_system', [
  'moghrabi_v1', 'moghrabi_v2', 'moghrabi_v3',
  'support_fund', 'support_fund_west', 'prepaid',
]);

export const collectionMethodEnum = pgEnum('collection_method', [
  'cash_mobile', 'manual_assign', 'electronic', 'haseb_deposit',
]);

export const reconciliationTypeEnum = pgEnum('reconciliation_type', [
  'manager', 'exchange', 'accountant', 'supplier', 'custody',
]);
export const reconciliationStatusEnum = pgEnum('reconciliation_status', ['open', 'in_progress', 'completed', 'disputed']);
export const pendingStatusEnum = pgEnum('pending_status', ['pending', 'in_progress', 'resolved', 'written_off']);

// ===================== USERS =====================

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  fullName: varchar('full_name', { length: 200 }).notNull(),
  role: userRoleEnum('role').notNull().default('viewer'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== CURRENCIES =====================

export const currencies = pgTable('currencies', {
  id: serial('id').primaryKey(),
  code: currencyCodeEnum('code').notNull().unique(),
  nameAr: varchar('name_ar', { length: 100 }).notNull(),
  symbol: varchar('symbol', { length: 10 }).notNull(),
  exchangeRate: decimal('exchange_rate', { precision: 15, scale: 4 }).notNull().default('1'),
  isDefault: boolean('is_default').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== EXCHANGE RATES (أسعار الصرف اليومية) =====================

export const exchangeRates = pgTable('exchange_rates', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  fromCurrencyId: integer('from_currency_id').notNull().references(() => currencies.id),
  toCurrencyId: integer('to_currency_id').notNull().references(() => currencies.id),
  rate: decimal('rate', { precision: 15, scale: 6 }).notNull(),
  effectiveDate: date('effective_date').notNull(),
  source: varchar('source', { length: 100 }).default('manual'), // manual | api
  notes: text('notes'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== ROLES & PERMISSIONS (RBAC) =====================

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  color: varchar('color', { length: 20 }).default('#3b82f6'),
  maxVoucherAmount: decimal('max_voucher_amount', { precision: 20, scale: 2 }),
  maxDailyAmount: decimal('max_daily_amount', { precision: 20, scale: 2 }),
  isSystem: boolean('is_system').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const rolePermissions = pgTable('role_permissions', {
  id: serial('id').primaryKey(),
  roleId: integer('role_id').notNull().references(() => roles.id),
  resource: varchar('resource', { length: 100 }).notNull(), // vouchers | accounts | funds | reports | screens | settings | inventory | workflow | ui_builder
  action: varchar('action', { length: 50 }).notNull(), // create | read | update | delete | approve | reverse | execute
  constraints: jsonb('constraints').$type<any>().default({}), // قيود إضافية: {maxAmount, stationIds, operationTypeIds, accountIds}
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const userRoles = pgTable('user_roles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  roleId: integer('role_id').notNull().references(() => roles.id),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  assignedBy: integer('assigned_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

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
});

// ===================== VOUCHERS (السندات) =====================

export const vouchers = pgTable('vouchers', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  voucherNumber: varchar('voucher_number', { length: 50 }).notNull(),
  voucherType: voucherTypeEnum('voucher_type').notNull(),
  status: voucherStatusEnum('status').notNull().default('confirmed'),
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
  reversalStatus: varchar('reversal_status', { length: 20 }).default('original'),
  reversedVoucherId: integer('reversed_voucher_id'),
  reversalReason: text('reversal_reason'),
  reversedAt: timestamp('reversed_at'),
  reversedBy: integer('reversed_by').references(() => users.id),
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
  entityType: varchar('entity_type', { length: 50 }).notNull(), // 'voucher' | 'collection' | 'delivery'
  entityId: integer('entity_id').notNull(),
  fileName: varchar('file_name', { length: 300 }).notNull(),
  filePath: varchar('file_path', { length: 500 }).notNull(),
  fileType: varchar('file_type', { length: 50 }),
  fileSize: integer('file_size'),
  description: text('description'),
  uploadedBy: integer('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== EXPENSE BUDGET =====================

export const expenseBudget = pgTable('expense_budget', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
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
  subType: varchar('sub_type', { length: 100 }),
  subTypeId: integer('sub_type_id'),
  sequenceNumber: integer('sequence_number'),
  code: varchar('code', { length: 30 }),
  stationId: integer('station_id').references(() => stations.id),
  responsiblePerson: varchar('responsible_person', { length: 200 }),
  location: varchar('location', { length: 300 }),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  codeUnique: unique('warehouses_biz_code_unique').on(table.businessId, table.code),
  seqUnique: unique('warehouses_biz_subtype_seq_unique').on(table.businessId, table.subTypeId, table.sequenceNumber),
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
