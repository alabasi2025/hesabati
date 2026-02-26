import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal, pgEnum, uuid, jsonb } from 'drizzle-orm/pg-core';

// ===================== ENUMS =====================

export const userRoleEnum = pgEnum('user_role', ['admin', 'accountant', 'manager', 'viewer']);
export const currencyCodeEnum = pgEnum('currency_code', ['YER', 'SAR', 'USD']);
export const accountTypeEnum = pgEnum('account_type', [
  'e_wallet',      // محفظة إلكترونية (جوالي، ون كاش، جيب)
  'bank',          // بنك (كريمي)
  'exchange',      // صراف (النجم، الحوشبي، ابن عامر، النهمي)
  'service',       // خدمة (حاسب)
  'cash',          // نقد (خزنة، كاش)
  'custody',       // عهدة مشتريات
]);
export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'expense', 'transfer']);
export const transactionStatusEnum = pgEnum('transaction_status', ['pending', 'confirmed', 'cancelled']);
export const fundTypeEnum = pgEnum('fund_type', [
  'collection',    // صندوق التحصيل والتوريد
  'salary_advance',// صندوق سلف الموظفين
  'custody',       // صندوق العهدة
  'safe',          // الخزنة
  'expense',       // صندوق الخرج
  'deposit',       // صندوق التوريدات
]);
export const expenseTypeEnum = pgEnum('expense_type', ['fixed', 'variable', 'annual']);
export const warehouseTypeEnum = pgEnum('warehouse_type', ['main', 'station']);
export const movementTypeEnum = pgEnum('movement_type', ['in', 'out', 'transfer']);
export const employeeStatusEnum = pgEnum('employee_status', ['active', 'inactive', 'suspended']);
export const billingSystemEnum = pgEnum('billing_system', [
  'moghrabi_v1',   // نظام المغربي نسخة 1
  'moghrabi_v2',   // نظام المغربي نسخة 2
  'moghrabi_v3',   // نظام المغربي نسخة 3
  'support_fund',  // صندوق الدعم
  'support_fund_west', // صندوق الدعم الساحل الغربي
  'prepaid',       // الدفع المسبق
]);
export const collectionMethodEnum = pgEnum('collection_method', [
  'cash',          // نقدي
  'jawali',        // جوالي
  'one_cash',      // ون كاش
  'jeeb',          // جيب
  'haseb',         // خدمة حاسب
  'exchange',      // صراف
]);
export const partnerTypeEnum = pgEnum('partner_type', ['main', 'station']);

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

// ===================== STATIONS (المحطات) =====================

export const stations = pgTable('stations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  location: varchar('location', { length: 300 }),
  managerId: integer('manager_id').references(() => employees.id),
  billingSystem: billingSystemEnum('billing_system'),
  hasEmployees: boolean('has_employees').notNull().default(true),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== EMPLOYEES (الموظفين) =====================

export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 200 }).notNull(),
  jobTitle: varchar('job_title', { length: 200 }),
  stationId: integer('station_id').references(() => stations.id),
  salary: decimal('salary', { precision: 15, scale: 2 }).notNull().default('0'),
  salaryCurrencyId: integer('salary_currency_id').references(() => currencies.id),
  phone: varchar('phone', { length: 20 }),
  status: employeeStatusEnum('status').notNull().default('active'),
  hireDate: timestamp('hire_date'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== ACCOUNTS & WALLETS (الحسابات والمحافظ) =====================

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  accountType: accountTypeEnum('account_type').notNull(),
  accountNumber: varchar('account_number', { length: 100 }),
  provider: varchar('provider', { length: 200 }),  // مزود الخدمة (جوالي، كريمي، الحوشبي...)
  subType: varchar('sub_type', { length: 100 }),    // فرعي (جاري، توفير، وكيل...)
  responsibleId: integer('responsible_id').references(() => employees.id),
  parentAccountId: integer('parent_account_id'),
  supportedCurrencies: jsonb('supported_currencies').$type<string[]>().default(['YER', 'SAR', 'USD']),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== ACCOUNT BALANCES (أرصدة الحسابات) =====================

export const accountBalances = pgTable('account_balances', {
  id: serial('id').primaryKey(),
  accountId: integer('account_id').notNull().references(() => accounts.id),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  balance: decimal('balance', { precision: 20, scale: 2 }).notNull().default('0'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== FUNDS (الصناديق) =====================

export const funds = pgTable('funds', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  fundType: fundTypeEnum('fund_type').notNull(),
  stationId: integer('station_id').references(() => stations.id),
  responsibleId: integer('responsible_id').references(() => employees.id),
  description: text('description'),
  isActive: boolean('is_active').notNull().default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== FUND BALANCES (أرصدة الصناديق) =====================

export const fundBalances = pgTable('fund_balances', {
  id: serial('id').primaryKey(),
  fundId: integer('fund_id').notNull().references(() => funds.id),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  balance: decimal('balance', { precision: 20, scale: 2 }).notNull().default('0'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== PARTNERS (الشركاء) =====================

export const partners = pgTable('partners', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 200 }).notNull(),
  partnerType: partnerTypeEnum('partner_type').notNull().default('main'),
  sharePercentage: decimal('share_percentage', { precision: 5, scale: 2 }),
  phone: varchar('phone', { length: 20 }),
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== PARTNER STATIONS (ربط الشركاء بالمحطات) =====================

export const partnerStations = pgTable('partner_stations', {
  id: serial('id').primaryKey(),
  partnerId: integer('partner_id').notNull().references(() => partners.id),
  stationId: integer('station_id').notNull().references(() => stations.id),
  sharePercentage: decimal('share_percentage', { precision: 5, scale: 2 }),
});

// ===================== SUPPLIERS (الموردين) =====================

export const suppliers = pgTable('suppliers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  category: varchar('category', { length: 100 }),  // ديزل، زيت، عدادات، مواد كهربائية...
  phone: varchar('phone', { length: 20 }),
  address: varchar('address', { length: 300 }),
  contactPerson: varchar('contact_person', { length: 200 }),
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== SUPPLIER BALANCES (أرصدة الموردين) =====================

export const supplierBalances = pgTable('supplier_balances', {
  id: serial('id').primaryKey(),
  supplierId: integer('supplier_id').notNull().references(() => suppliers.id),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  balance: decimal('balance', { precision: 20, scale: 2 }).notNull().default('0'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== TRANSACTIONS (الحركات المالية) =====================

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  status: transactionStatusEnum('status').notNull().default('confirmed'),
  amount: decimal('amount', { precision: 20, scale: 2 }).notNull(),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  exchangeRate: decimal('exchange_rate', { precision: 15, scale: 4 }),
  
  // المصدر والوجهة
  fromAccountId: integer('from_account_id').references(() => accounts.id),
  toAccountId: integer('to_account_id').references(() => accounts.id),
  fromFundId: integer('from_fund_id').references(() => funds.id),
  toFundId: integer('to_fund_id').references(() => funds.id),
  
  // الربط بالمحطة والموظف والمورد
  stationId: integer('station_id').references(() => stations.id),
  employeeId: integer('employee_id').references(() => employees.id),
  supplierId: integer('supplier_id').references(() => suppliers.id),
  partnerId: integer('partner_id').references(() => partners.id),
  
  // التصنيف
  categoryId: integer('category_id').references(() => transactionCategories.id),
  collectionMethod: collectionMethodEnum('collection_method'),
  
  // التفاصيل
  description: text('description'),
  reference: varchar('reference', { length: 200 }),
  transactionDate: timestamp('transaction_date').notNull().defaultNow(),
  
  // المستخدم والتدقيق
  createdBy: integer('created_by').references(() => users.id),
  approvedBy: integer('approved_by').references(() => users.id),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== TRANSACTION CATEGORIES (تصنيفات الحركات) =====================

export const transactionCategories = pgTable('transaction_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  type: transactionTypeEnum('type').notNull(),
  parentId: integer('parent_id'),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 20 }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== EXPENSE BUDGET (الميزانية) =====================

export const expenseBudget = pgTable('expense_budget', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  categoryId: integer('category_id').references(() => transactionCategories.id),
  stationId: integer('station_id').references(() => stations.id),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  expenseType: expenseTypeEnum('expense_type').notNull(),
  month: integer('month'),
  year: integer('year'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== WAREHOUSES (المخازن) =====================

export const warehouses = pgTable('warehouses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  warehouseType: warehouseTypeEnum('warehouse_type').notNull(),
  stationId: integer('station_id').references(() => stations.id),
  responsibleId: integer('responsible_id').references(() => employees.id),
  location: varchar('location', { length: 300 }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== INVENTORY ITEMS (أصناف المخزون) =====================

export const inventoryItems = pgTable('inventory_items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 50 }),
  category: varchar('category', { length: 100 }),
  unit: varchar('unit', { length: 50 }),
  minQuantity: decimal('min_quantity', { precision: 15, scale: 2 }),
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== INVENTORY STOCK (مخزون فعلي) =====================

export const inventoryStock = pgTable('inventory_stock', {
  id: serial('id').primaryKey(),
  itemId: integer('item_id').notNull().references(() => inventoryItems.id),
  warehouseId: integer('warehouse_id').notNull().references(() => warehouses.id),
  quantity: decimal('quantity', { precision: 15, scale: 2 }).notNull().default('0'),
  avgCost: decimal('avg_cost', { precision: 15, scale: 2 }),
  currencyId: integer('currency_id').references(() => currencies.id),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== INVENTORY MOVEMENTS (حركات المخزون) =====================

export const inventoryMovements = pgTable('inventory_movements', {
  id: serial('id').primaryKey(),
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
  movementDate: timestamp('movement_date').notNull().defaultNow(),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== DIESEL CONSUMPTION (استهلاك الديزل) =====================

export const dieselConsumption = pgTable('diesel_consumption', {
  id: serial('id').primaryKey(),
  stationId: integer('station_id').notNull().references(() => stations.id),
  quantity: decimal('quantity', { precision: 15, scale: 2 }).notNull(),
  consumptionDate: timestamp('consumption_date').notNull(),
  billingPeriod: varchar('billing_period', { length: 100 }),
  notes: text('notes'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== SALARY RECORDS (سجل الرواتب) =====================

export const salaryRecords = pgTable('salary_records', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id').notNull().references(() => employees.id),
  month: integer('month').notNull(),
  year: integer('year').notNull(),
  baseSalary: decimal('base_salary', { precision: 15, scale: 2 }).notNull(),
  advance: decimal('advance', { precision: 15, scale: 2 }).default('0'),
  deductions: decimal('deductions', { precision: 15, scale: 2 }).default('0'),
  netSalary: decimal('net_salary', { precision: 15, scale: 2 }).notNull(),
  currencyId: integer('currency_id').notNull().references(() => currencies.id),
  isPaid: boolean('is_paid').notNull().default(false),
  paidDate: timestamp('paid_date'),
  paidVia: varchar('paid_via', { length: 100 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== BILLING PERIODS (فترات الفوترة) =====================

export const billingPeriods = pgTable('billing_periods', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  stationId: integer('station_id').notNull().references(() => stations.id),
  billingSystem: billingSystemEnum('billing_system').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  totalAmount: decimal('total_amount', { precision: 20, scale: 2 }),
  collectedAmount: decimal('collected_amount', { precision: 20, scale: 2 }),
  currencyId: integer('currency_id').references(() => currencies.id),
  isClosed: boolean('is_closed').notNull().default(false),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== RECONCILIATION (التصفيات) =====================

export const reconciliations = pgTable('reconciliations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  accountId: integer('account_id').references(() => accounts.id),
  fundId: integer('fund_id').references(() => funds.id),
  employeeId: integer('employee_id').references(() => employees.id),
  supplierId: integer('supplier_id').references(() => suppliers.id),
  periodStart: timestamp('period_start'),
  periodEnd: timestamp('period_end'),
  expectedAmount: decimal('expected_amount', { precision: 20, scale: 2 }),
  actualAmount: decimal('actual_amount', { precision: 20, scale: 2 }),
  difference: decimal('difference', { precision: 20, scale: 2 }),
  currencyId: integer('currency_id').references(() => currencies.id),
  status: varchar('status', { length: 50 }).default('pending'),
  notes: text('notes'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== AUDIT LOG (سجل التدقيق) =====================

export const auditLog = pgTable('audit_log', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  tableName: varchar('table_name', { length: 100 }),
  recordId: integer('record_id'),
  oldData: jsonb('old_data'),
  newData: jsonb('new_data'),
  ipAddress: varchar('ip_address', { length: 50 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
