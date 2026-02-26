import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal, pgEnum, jsonb, date } from 'drizzle-orm/pg-core';

// ===================== ENUMS =====================

export const userRoleEnum = pgEnum('user_role', ['admin', 'accountant', 'manager', 'viewer']);
export const currencyCodeEnum = pgEnum('currency_code', ['YER', 'SAR', 'USD']);

export const accountTypeEnum = pgEnum('account_type', [
  'e_wallet', 'bank', 'exchange', 'service', 'cash', 'custody',
]);

export const fundTypeEnum = pgEnum('fund_type', [
  'collection', 'salary_advance', 'custody', 'safe', 'expense', 'deposit',
]);

export const voucherTypeEnum = pgEnum('voucher_type', [
  'receipt', 'payment', 'transfer', 'collection', 'delivery',
]);

export const voucherStatusEnum = pgEnum('voucher_status', ['draft', 'confirmed', 'cancelled']);
export const expenseTypeEnum = pgEnum('expense_type', ['fixed', 'variable', 'annual']);
export const warehouseTypeEnum = pgEnum('warehouse_type', ['main', 'station']);
export const movementTypeEnum = pgEnum('movement_type', ['in', 'out', 'transfer', 'adjustment']);
export const employeeStatusEnum = pgEnum('employee_status', ['active', 'inactive', 'suspended']);

export const billingSystemEnum = pgEnum('billing_system', [
  'moghrabi_v1', 'moghrabi_v2', 'moghrabi_v3',
  'support_fund', 'support_fund_west', 'prepaid',
]);

export const collectionMethodEnum = pgEnum('collection_method', [
  'cash', 'jawali', 'one_cash', 'jeeb', 'haseb', 'exchange', 'bank',
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

// ===================== BUSINESSES (الأعمال) - المحور الرئيسي =====================

export const businesses = pgTable('businesses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  type: varchar('type', { length: 30 }).default('stations'), // stations | single_station | personal
  description: text('description'),
  icon: varchar('icon', { length: 50 }).default('business'),
  color: varchar('color', { length: 20 }).default('#3b82f6'),
  sortOrder: integer('sort_order').default(0),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== BUSINESS PARTNERS (شركاء العمل) =====================

export const businessPartners = pgTable('business_partners', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  fullName: varchar('full_name', { length: 200 }).notNull(),
  sharePercentage: decimal('share_percentage', { precision: 5, scale: 2 }),
  phone: varchar('phone', { length: 20 }),
  role: varchar('role', { length: 100 }), // مالك، شريك، مدير
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== STATIONS (المحطات) - تابعة لعمل =====================

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

// ===================== EMPLOYEES - تابعين لعمل =====================

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
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== ACCOUNTS - تابعة لعمل =====================

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  accountType: accountTypeEnum('account_type').notNull(),
  accountNumber: varchar('account_number', { length: 100 }),
  provider: varchar('provider', { length: 200 }),
  subType: varchar('sub_type', { length: 100 }),
  responsiblePerson: varchar('responsible_person', { length: 200 }),
  parentAccountId: integer('parent_account_id'),
  supportedCurrencies: jsonb('supported_currencies').$type<string[]>().default(['YER', 'SAR', 'USD']),
  receivesFromStations: boolean('receives_from_stations').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== ACCOUNT BALANCES =====================

export const accountBalances = pgTable('account_balances', {
  id: serial('id').primaryKey(),
  accountId: integer('account_id').notNull().references(() => accounts.id),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  balance: decimal('balance', { precision: 20, scale: 2 }).notNull().default('0'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== FUNDS - تابعة لعمل =====================

export const funds = pgTable('funds', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  fundType: fundTypeEnum('fund_type').notNull(),
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

// ===================== SUPPLIERS - تابعين لعمل =====================

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

// ===================== VOUCHERS - تابعة لعمل =====================

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
  collectionMethod: collectionMethodEnum('collection_method'),

  description: text('description'),
  reference: varchar('reference', { length: 200 }),
  voucherDate: timestamp('voucher_date').notNull().defaultNow(),

  createdBy: integer('created_by').references(() => users.id),
  approvedBy: integer('approved_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== DAILY COLLECTIONS - تابعة لعمل =====================

export const dailyCollections = pgTable('daily_collections', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  stationId: integer('station_id').notNull().references(() => stations.id),
  collectorId: integer('collector_id').references(() => employees.id),
  collectionDate: date('collection_date').notNull(),
  billingSystem: billingSystemEnum('billing_system'),

  cashAmount: decimal('cash_amount', { precision: 20, scale: 2 }).default('0'),
  jawaliAmount: decimal('jawali_amount', { precision: 20, scale: 2 }).default('0'),
  oneCashAmount: decimal('one_cash_amount', { precision: 20, scale: 2 }).default('0'),
  jeebAmount: decimal('jeeb_amount', { precision: 20, scale: 2 }).default('0'),
  hasebAmount: decimal('haseb_amount', { precision: 20, scale: 2 }).default('0'),
  exchangeAmount: decimal('exchange_amount', { precision: 20, scale: 2 }).default('0'),

  totalAmount: decimal('total_amount', { precision: 20, scale: 2 }).notNull(),
  currencyId: integer('currency_id').references(() => currencies.id),

  isDelivered: boolean('is_delivered').notNull().default(false),
  deliveredTo: varchar('delivered_to', { length: 200 }),
  deliveryMethod: varchar('delivery_method', { length: 100 }),
  notes: text('notes'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== EXPENSE BUDGET - تابعة لعمل =====================

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

// ===================== WAREHOUSES - تابعة لعمل =====================

export const warehouses = pgTable('warehouses', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 200 }).notNull(),
  warehouseType: warehouseTypeEnum('warehouse_type').notNull(),
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

// ===================== RECONCILIATIONS - تابعة لعمل =====================

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

// ===================== PENDING ACCOUNTS - تابعة لعمل =====================

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
