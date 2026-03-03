import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal, pgEnum, jsonb, date, uniqueIndex } from 'drizzle-orm/pg-core';

// ===================== ENUMS =====================

export const userRoleEnum = pgEnum('user_role', ['admin', 'accountant', 'manager', 'viewer']);
export const currencyCodeEnum = pgEnum('currency_code', ['YER', 'SAR', 'USD']);

export const accountTypeEnum = pgEnum('account_type', [
  'fund', 'bank', 'e_wallet', 'exchange', 'accounting', 'intermediary', 'cash', 'custody', 'service', 'warehouse',
]);

export const fundTypeEnum = pgEnum('fund_type', [
  'collection', 'salary_advance', 'custody', 'safe', 'expense', 'deposit',
]);

export const voucherTypeEnum = pgEnum('voucher_type', [
  'receipt', 'payment', 'transfer', 'collection', 'delivery',
  'supply_invoice', 'supply_order', 'dispatch', 'transfer_out', 'receive_transfer',
]);

export const voucherStatusEnum = pgEnum('voucher_status', ['draft', 'confirmed', 'cancelled']);
export const expenseTypeEnum = pgEnum('expense_type', ['fixed', 'variable', 'annual']);
export const warehouseTypeEnum = pgEnum('warehouse_type', ['main', 'station', 'sub']);
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
  accountType: accountTypeEnum('account_type').notNull(),
  accountNumber: varchar('account_number', { length: 100 }),
  provider: varchar('provider', { length: 200 }),
  subType: varchar('sub_type', { length: 100 }),
  sequenceNumber: integer('sequence_number'), // الرقم التسلسلي داخل التصنيف
  code: varchar('code', { length: 30 }), // الرمز المركب (مثل BNK-LOC-01)
  responsiblePerson: varchar('responsible_person', { length: 200 }),
  parentAccountId: integer('parent_account_id'),
  supportedCurrencies: jsonb('supported_currencies').$type<string[]>().default(['YER', 'SAR', 'USD']),
  
  // 4 صلاحيات قبض وصرف
  canInitiateReceipt: boolean('can_initiate_receipt').notNull().default(true),    // يقدر يسوي قبض (يسحب من غيره)
  canInitiatePayment: boolean('can_initiate_payment').notNull().default(true),    // يقدر يسوي صرف (يدفع لغيره)
  canReceivePayment: boolean('can_receive_payment').notNull().default(true),      // يقدر يستقبل صرف إليه
  canBeDebitedByReceipt: boolean('can_be_debited_by_receipt').notNull().default(true), // يقدر يتنفذ عليه قبض
  
  // صلاحيات القيود
  canCreateVoucher: boolean('can_create_voucher').notNull().default(false),       // يقدر ينشئ قيد/سند
  canApproveVoucher: boolean('can_approve_voucher').notNull().default(false),     // يقدر يعتمد قيد/سند
  
  receivesFromStations: boolean('receives_from_stations').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

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
});

// ===================== EMPLOYEE BILLING ACCOUNTS (حسابات الموظفين في أنظمة الفوترة) =====================

export const employeeBillingAccounts = pgTable('employee_billing_accounts', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id').notNull().references(() => employees.id),
  stationId: integer('station_id').notNull().references(() => stations.id),
  billingSystem: billingSystemEnum('billing_system').notNull(),
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
});

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
  fundType: fundTypeEnum('fund_type').notNull(),
  subType: varchar('sub_type', { length: 100 }), // التصنيف الفرعي (يربط بجدول fundTypes)
  sequenceNumber: integer('sequence_number'), // الرقم التسلسلي داخل التصنيف
  code: varchar('code', { length: 30 }), // الرمز المركب (مثل FND-COL-01)
  stationId: integer('station_id').references(() => stations.id),
  responsiblePerson: varchar('responsible_person', { length: 200 }),
  description: text('description'),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== FUND BALANCES =====================

export const fundBalances = pgTable('fund_balances', {
  id: serial('id').primaryKey(),
  fundId: integer('fund_id').notNull().references(() => funds.id),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  balance: decimal('balance', { precision: 20, scale: 2 }).notNull().default('0'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== SUPPLIERS =====================

export const suppliers = pgTable('suppliers', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
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

// ===================== VOUCHER CATEGORIES =====================

export const voucherCategories = pgTable('voucher_categories', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  type: voucherTypeEnum('type').notNull(),
  parentId: integer('parent_id'),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 20 }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
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

  categoryId: integer('category_id').references(() => voucherCategories.id),
  operationTypeId: integer('operation_type_id').references(() => operationTypes.id),

  description: text('description'),
  reference: varchar('reference', { length: 200 }),
  voucherDate: timestamp('voucher_date').notNull().defaultNow(),

  // حقول الترقيم الذكي
  accountSequence: varchar('account_sequence', { length: 50 }), // تسلسل الحساب (سنة-رمز-رقم)
  templateSequence: varchar('template_sequence', { length: 50 }), // تسلسل القالب (سنة-رمز-رقم)

  createdBy: integer('created_by').references(() => users.id),
  approvedBy: integer('approved_by').references(() => users.id),
  reversalStatus: varchar('reversal_status', { length: 20 }).default('original'), // original | reversed | reversal
  reversedVoucherId: integer('reversed_voucher_id'),
  reversalReason: text('reversal_reason'),
  reversedAt: timestamp('reversed_at'),
  reversedBy: integer('reversed_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
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

// ===================== DAILY COLLECTIONS (التحصيل اليومي) =====================

export const dailyCollections = pgTable('daily_collections', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  stationId: integer('station_id').notNull().references(() => stations.id),
  collectionDate: date('collection_date').notNull(),
  currencyId: integer('currency_id').references(() => currencies.id),
  totalAmount: decimal('total_amount', { precision: 20, scale: 2 }).notNull().default('0'),
  isFullyDelivered: boolean('is_fully_delivered').notNull().default(false),
  notes: text('notes'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== COLLECTION DETAILS (تفاصيل التحصيل لكل موظف) =====================

export const collectionDetails = pgTable('collection_details', {
  id: serial('id').primaryKey(),
  collectionId: integer('collection_id').notNull().references(() => dailyCollections.id),
  employeeId: integer('employee_id').notNull().references(() => employees.id),
  billingAccountId: integer('billing_account_id').notNull().references(() => employeeBillingAccounts.id),
  amount: decimal('amount', { precision: 20, scale: 2 }).notNull().default('0'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== DELIVERY RECORDS (التوريد) =====================

export const deliveryRecords = pgTable('delivery_records', {
  id: serial('id').primaryKey(),
  collectionId: integer('collection_id').notNull().references(() => dailyCollections.id),
  employeeId: integer('employee_id').notNull().references(() => employees.id),
  toAccountId: integer('to_account_id').notNull().references(() => accounts.id),
  amount: decimal('amount', { precision: 20, scale: 2 }).notNull(),
  currencyId: integer('currency_id').references(() => currencies.id),
  deliveryDate: date('delivery_date').notNull(),
  reference: varchar('reference', { length: 200 }),
  notes: text('notes'),
  createdBy: integer('created_by').references(() => users.id),
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
  warehouseType: warehouseTypeEnum('warehouse_type').notNull(),
  subType: varchar('sub_type', { length: 100 }), // التصنيف الفرعي (يربط بجدول warehouseTypes)
  sequenceNumber: integer('sequence_number'), // الرقم التسلسلي داخل التصنيف
  code: varchar('code', { length: 30 }), // الرمز المركب (مثل WH-MAIN-01)
  stationId: integer('station_id').references(() => stations.id),
  responsiblePerson: varchar('responsible_person', { length: 200 }),
  location: varchar('location', { length: 300 }),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== INVENTORY ITEMS =====================

export const inventoryItems = pgTable('inventory_items', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 50 }),
  category: varchar('category', { length: 100 }),
  unit: varchar('unit', { length: 50 }),
  minQuantity: decimal('min_quantity', { precision: 15, scale: 2 }),
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

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
  billingSystem: billingSystemEnum('billing_system').notNull(),
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
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }).default('receipt_long'),
  color: varchar('color', { length: 20 }).default('#3b82f6'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== OPERATION TYPES (أنواع العمليات - القوالب) =====================

export const operationTypes = pgTable('operation_types', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }).default('receipt_long'),
  color: varchar('color', { length: 20 }).default('#3b82f6'),
  category: varchar('category', { length: 50 }).notNull().default('عام'), // تصنيف ديناميكي ينشئه المستخدم
  sequenceNumber: integer('sequence_number'), // الرقم التسلسلي داخل التصنيف
  code: varchar('code', { length: 30 }), // الرمز المركب (مثل RCV-COL-01)
  voucherType: varchar('voucher_type', { length: 30 }), // 'payment' | 'receipt' | 'journal'
  paymentMethod: varchar('payment_method', { length: 30 }), // 'cash' | 'bank' | 'exchange' | 'e_wallet'
  sourceAccountId: integer('source_account_id').references(() => accounts.id), // الطرف الأول (المصدر) - حساب بنك/صراف/محفظة
  sourceFundId: integer('source_fund_id').references(() => funds.id), // الطرف الأول (المصدر) - صندوق
  sourceWarehouseId: integer('source_warehouse_id').references(() => warehouses.id), // الطرف الأول (المصدر) - مخزن
  screens: text('screens').default('{}'), // PostgreSQL text[] stored as text for Drizzle compat
  requiresAttachment: boolean('requires_attachment').notNull().default(false),
  hasMultiLines: boolean('has_multi_lines').notNull().default(false),
  workflowConfig: jsonb('workflow_config').$type<{ enabled: boolean; initialStatus: string; statuses: string[] }>(), // إعدادات سير العمل
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

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
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('savings'),
  color: varchar('color', { length: 50 }).default('#4CAF50'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== BANK TYPES (أنواع البنوك) =====================
export const bankTypes = pgTable("bank_types", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  name: varchar("name", { length: 200 }).notNull(),
  subTypeKey: varchar("sub_type_key", { length: 100 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }).default("account_balance"),
  color: varchar("color", { length: 50 }).default("#4CAF50"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ===================== EXCHANGE TYPES (أنواع الصرافين) =====================
export const exchangeTypes = pgTable("exchange_types", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  name: varchar("name", { length: 200 }).notNull(),
  subTypeKey: varchar("sub_type_key", { length: 100 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }).default("currency_exchange"),
  color: varchar("color", { length: 50 }).default("#4CAF50"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ===================== E-WALLET TYPES (أنواع المحافظ الإلكترونية) =====================
export const eWalletTypes = pgTable("e_wallet_types", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businesses.id),
  name: varchar("name", { length: 200 }).notNull(),
  subTypeKey: varchar("sub_type_key", { length: 100 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }).default("e_wallet"),
  color: varchar("color", { length: 50 }).default("#4CAF50"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

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
  prefix: varchar('prefix', { length: 30 }), // البادئة (مثل FND01, RCV01)
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== WAREHOUSE TYPES (أنواع/تصنيفات المخازن) =====================

export const warehouseTypes = pgTable('warehouse_types', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  subTypeKey: varchar('sub_type_key', { length: 100 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('warehouse'),
  color: varchar('color', { length: 50 }).default('#4CAF50'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== JOURNAL ENTRY CATEGORIES (تصنيفات قيود اليومية - مستقلة) =====================

export const journalEntryCategories = pgTable('journal_entry_categories', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  categoryKey: varchar('category_key', { length: 100 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }).default('book'),
  color: varchar('color', { length: 50 }).default('#6366f1'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
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
  relatedOperationId: integer('related_operation_id'), // العملية المرتبطة (استلام ← تحويل)
  relatedVoucherId: integer('related_voucher_id').references(() => vouchers.id), // السند المرتبط
  supplierId: integer('supplier_id').references(() => suppliers.id), // المورد (لفاتورة المشتريات)
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
