ALTER TYPE "public"."account_type" ADD VALUE 'intermediary' BEFORE 'settlement';--> statement-breakpoint
ALTER TYPE "public"."warehouse_type" ADD VALUE 'custody';--> statement-breakpoint
CREATE TABLE "account_currencies" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer NOT NULL,
	"currency_id" integer NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bank_balances" (
	"id" serial PRIMARY KEY NOT NULL,
	"bank_id" integer NOT NULL,
	"currency_id" integer NOT NULL,
	"balance" numeric(20, 2) DEFAULT '0' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "banks" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"account_id" integer,
	"default_currency_id" integer,
	"sequence_number" integer,
	"code" varchar(30),
	"account_number" varchar(100),
	"provider" varchar(200),
	"responsible_person" varchar(200),
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "banks_biz_code_unique" UNIQUE("business_id","code")
);
--> statement-breakpoint
CREATE TABLE "exchange_balances" (
	"id" serial PRIMARY KEY NOT NULL,
	"exchange_id" integer NOT NULL,
	"currency_id" integer NOT NULL,
	"balance" numeric(20, 2) DEFAULT '0' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exchanges" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"account_id" integer,
	"default_currency_id" integer,
	"sequence_number" integer,
	"code" varchar(30),
	"account_number" varchar(100),
	"provider" varchar(200),
	"responsible_person" varchar(200),
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "exchanges_biz_code_unique" UNIQUE("business_id","code")
);
--> statement-breakpoint
CREATE TABLE "fiscal_periods" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"fiscal_year_id" integer NOT NULL,
	"month" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"is_closed" boolean DEFAULT false NOT NULL,
	"closed_at" timestamp,
	"closed_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fiscal_years" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"year" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"is_closed" boolean DEFAULT false NOT NULL,
	"closed_at" timestamp,
	"closed_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallet_balances" (
	"id" serial PRIMARY KEY NOT NULL,
	"wallet_id" integer NOT NULL,
	"currency_id" integer NOT NULL,
	"balance" numeric(20, 2) DEFAULT '0' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"account_id" integer,
	"default_currency_id" integer,
	"sequence_number" integer,
	"code" varchar(30),
	"account_number" varchar(100),
	"provider" varchar(200),
	"responsible_person" varchar(200),
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wallets_biz_code_unique" UNIQUE("business_id","code")
);
--> statement-breakpoint
CREATE TABLE "account_sub_natures" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"nature_key" varchar(100) NOT NULL,
	"is_system" boolean DEFAULT true NOT NULL,
	"icon" varchar(100) DEFAULT 'category',
	"color" varchar(50) DEFAULT '#64748b',
	"sequence_number" integer,
	"requires_station" boolean DEFAULT false NOT NULL,
	"requires_employee" boolean DEFAULT false NOT NULL,
	"requires_provider" boolean DEFAULT false NOT NULL,
	"requires_account_number" boolean DEFAULT false NOT NULL,
	"requires_supplier_type" boolean DEFAULT false NOT NULL,
	"supports_cash_operations" boolean DEFAULT true NOT NULL,
	"can_receive_payment" boolean DEFAULT true NOT NULL,
	"can_make_payment" boolean DEFAULT true NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "account_sub_natures_biz_key_unique" UNIQUE("business_id","nature_key"),
	CONSTRAINT "account_sub_natures_biz_seq_unique" UNIQUE("business_id","sequence_number")
);
--> statement-breakpoint
CREATE TABLE "accounting_sub_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"main_type_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"sub_type_key" varchar(100) NOT NULL,
	"sequence_number" integer,
	"description" text,
	"icon" varchar(100) DEFAULT 'label',
	"color" varchar(50) DEFAULT '#14b8a6',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "accounting_sub_types_biz_key_unique" UNIQUE("business_id","sub_type_key"),
	CONSTRAINT "accounting_sub_types_biz_main_seq_unique" UNIQUE("business_id","main_type_id","sequence_number")
);
--> statement-breakpoint
CREATE TABLE "accounting_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"sub_type_key" varchar(100) NOT NULL,
	"sequence_number" integer,
	"description" text,
	"icon" varchar(100) DEFAULT 'book',
	"color" varchar(50) DEFAULT '#14b8a6',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "accounting_types_biz_key_unique" UNIQUE("business_id","sub_type_key"),
	CONSTRAINT "accounting_types_biz_seq_unique" UNIQUE("business_id","sequence_number")
);
--> statement-breakpoint
CREATE TABLE "custody_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"custody_number" varchar(50),
	"custody_type" varchar(20) NOT NULL,
	"content_type" varchar(20) NOT NULL,
	"party_name" varchar(200) NOT NULL,
	"party_type" varchar(20) NOT NULL,
	"employee_id" integer,
	"supplier_id" integer,
	"fund_id" integer,
	"warehouse_id" integer,
	"description" text,
	"status" varchar(30) DEFAULT 'active' NOT NULL,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "custody_settlements" (
	"id" serial PRIMARY KEY NOT NULL,
	"custody_id" integer NOT NULL,
	"settlement_date" date NOT NULL,
	"settlement_type" varchar(30) NOT NULL,
	"amount" numeric(20, 2),
	"voucher_id" integer,
	"inventory_item_id" integer,
	"quantity" numeric(15, 2),
	"unit_cost" numeric(15, 2),
	"description" text,
	"attachments" jsonb DEFAULT '[]'::jsonb,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"code" varchar(30),
	"sequence_number" integer,
	"manager_id" integer,
	"description" text,
	"icon" varchar(100) DEFAULT 'groups',
	"color" varchar(50) DEFAULT '#06b6d4',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "departments_biz_code_unique" UNIQUE("business_id","code"),
	CONSTRAINT "departments_biz_seq_unique" UNIQUE("business_id","sequence_number")
);
--> statement-breakpoint
CREATE TABLE "inventory_item_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"sub_type_key" varchar(100) NOT NULL,
	"sequence_number" integer,
	"description" text,
	"icon" varchar(100) DEFAULT 'inventory_2',
	"color" varchar(50) DEFAULT '#78716c',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "item_types_biz_key_unique" UNIQUE("business_id","sub_type_key"),
	CONSTRAINT "item_types_biz_seq_unique" UNIQUE("business_id","sequence_number")
);
--> statement-breakpoint
CREATE TABLE "job_titles" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"sequence_number" integer,
	"description" text,
	"icon" varchar(100) DEFAULT 'badge',
	"color" varchar(50) DEFAULT '#8b5cf6',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "job_titles_biz_seq_unique" UNIQUE("business_id","sequence_number")
);
--> statement-breakpoint
CREATE TABLE "reconciliation_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"reconciliation_id" integer NOT NULL,
	"voucher_id" integer,
	"external_date" date,
	"external_amount" numeric(20, 2),
	"external_description" text,
	"external_reference" varchar(200),
	"match_status" varchar(30) DEFAULT 'unmatched_system' NOT NULL,
	"matched_at" timestamp,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supplier_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"sub_type_key" varchar(100) NOT NULL,
	"sequence_number" integer,
	"description" text,
	"icon" varchar(100) DEFAULT 'local_shipping',
	"color" varchar(50) DEFAULT '#f97316',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "supplier_types_biz_key_unique" UNIQUE("business_id","sub_type_key"),
	CONSTRAINT "supplier_types_biz_seq_unique" UNIQUE("business_id","sequence_number")
);
--> statement-breakpoint
ALTER TABLE "bank_types" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "collection_details" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "daily_collections" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "delivery_records" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "e_wallet_types" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "exchange_types" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "fund_types" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "voucher_categories" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "warehouse_types" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "bank_types" CASCADE;--> statement-breakpoint
DROP TABLE "collection_details" CASCADE;--> statement-breakpoint
DROP TABLE "daily_collections" CASCADE;--> statement-breakpoint
DROP TABLE "delivery_records" CASCADE;--> statement-breakpoint
DROP TABLE "e_wallet_types" CASCADE;--> statement-breakpoint
DROP TABLE "exchange_types" CASCADE;--> statement-breakpoint
DROP TABLE "fund_types" CASCADE;--> statement-breakpoint
DROP TABLE "voucher_categories" CASCADE;--> statement-breakpoint
DROP TABLE "warehouse_types" CASCADE;--> statement-breakpoint
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_biz_type_subtype_seq_unique";--> statement-breakpoint
ALTER TABLE "funds" DROP CONSTRAINT "funds_biz_subtype_seq_unique";--> statement-breakpoint
ALTER TABLE "stations" DROP CONSTRAINT "stations_code_unique";--> statement-breakpoint
ALTER TABLE "warehouses" DROP CONSTRAINT "warehouses_biz_subtype_seq_unique";--> statement-breakpoint
ALTER TABLE "vouchers" DROP CONSTRAINT "vouchers_category_id_voucher_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "vouchers" DROP CONSTRAINT "vouchers_reversed_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "account_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ALTER COLUMN "entity_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ALTER COLUMN "entity_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "currencies" ALTER COLUMN "code" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "operation_types" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "vouchers" ALTER COLUMN "status" SET DEFAULT 'unreviewed';--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "account_sub_nature_id" integer;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "is_leaf_account" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "linked_employee_id" integer;--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "business_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "table_name" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "record_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "attachments" ADD COLUMN "mime_type" varchar(100);--> statement-breakpoint
ALTER TABLE "billing_periods" ADD COLUMN "billing_system_id" integer;--> statement-breakpoint
ALTER TABLE "billing_systems_config" ADD COLUMN "system_key" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "billing_systems_config" ADD COLUMN "collection_method" "collection_method";--> statement-breakpoint
ALTER TABLE "business_partners" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "business_partners" ADD COLUMN "code" varchar(30);--> statement-breakpoint
ALTER TABLE "business_partners" ADD COLUMN "account_id" integer;--> statement-breakpoint
ALTER TABLE "currencies" ADD COLUMN "min_rate" numeric(15, 4);--> statement-breakpoint
ALTER TABLE "currencies" ADD COLUMN "max_rate" numeric(15, 4);--> statement-breakpoint
ALTER TABLE "currencies" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "employee_billing_accounts" ADD COLUMN "billing_system_id" integer;--> statement-breakpoint
ALTER TABLE "employee_billing_accounts" ADD COLUMN "account_id" integer;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "department_id" integer;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "job_title_id" integer;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "code" varchar(30);--> statement-breakpoint
ALTER TABLE "expense_categories" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "expense_categories" ADD COLUMN "code" varchar(30);--> statement-breakpoint
ALTER TABLE "expense_categories" ADD COLUMN "account_id" integer;--> statement-breakpoint
ALTER TABLE "funds" ADD COLUMN "account_id" integer;--> statement-breakpoint
ALTER TABLE "funds" ADD COLUMN "default_currency_id" integer;--> statement-breakpoint
ALTER TABLE "inventory_items" ADD COLUMN "item_type_id" integer;--> statement-breakpoint
ALTER TABLE "inventory_items" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "operation_types" ADD COLUMN "auto_journal" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "pending_accounts" ADD COLUMN "account_id" integer;--> statement-breakpoint
ALTER TABLE "purchase_invoices" ADD COLUMN "supplier_sequence_number" varchar(100);--> statement-breakpoint
ALTER TABLE "stations" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "suppliers" ADD COLUMN "supplier_type_id" integer;--> statement-breakpoint
ALTER TABLE "suppliers" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "suppliers" ADD COLUMN "code" varchar(30);--> statement-breakpoint
ALTER TABLE "suppliers" ADD COLUMN "account_id" integer;--> statement-breakpoint
ALTER TABLE "warehouses" ADD COLUMN "account_id" integer;--> statement-breakpoint
ALTER TABLE "account_currencies" ADD CONSTRAINT "account_currencies_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_currencies" ADD CONSTRAINT "account_currencies_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_balances" ADD CONSTRAINT "bank_balances_bank_id_banks_id_fk" FOREIGN KEY ("bank_id") REFERENCES "public"."banks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_balances" ADD CONSTRAINT "bank_balances_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "banks" ADD CONSTRAINT "banks_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "banks" ADD CONSTRAINT "banks_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "banks" ADD CONSTRAINT "banks_default_currency_id_currencies_id_fk" FOREIGN KEY ("default_currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_balances" ADD CONSTRAINT "exchange_balances_exchange_id_exchanges_id_fk" FOREIGN KEY ("exchange_id") REFERENCES "public"."exchanges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_balances" ADD CONSTRAINT "exchange_balances_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchanges" ADD CONSTRAINT "exchanges_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchanges" ADD CONSTRAINT "exchanges_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchanges" ADD CONSTRAINT "exchanges_default_currency_id_currencies_id_fk" FOREIGN KEY ("default_currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fiscal_periods" ADD CONSTRAINT "fiscal_periods_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fiscal_periods" ADD CONSTRAINT "fiscal_periods_fiscal_year_id_fiscal_years_id_fk" FOREIGN KEY ("fiscal_year_id") REFERENCES "public"."fiscal_years"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fiscal_years" ADD CONSTRAINT "fiscal_years_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_balances" ADD CONSTRAINT "wallet_balances_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_balances" ADD CONSTRAINT "wallet_balances_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_default_currency_id_currencies_id_fk" FOREIGN KEY ("default_currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_sub_natures" ADD CONSTRAINT "account_sub_natures_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounting_sub_types" ADD CONSTRAINT "accounting_sub_types_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounting_sub_types" ADD CONSTRAINT "accounting_sub_types_main_type_id_accounting_types_id_fk" FOREIGN KEY ("main_type_id") REFERENCES "public"."accounting_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounting_types" ADD CONSTRAINT "accounting_types_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custody_records" ADD CONSTRAINT "custody_records_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custody_records" ADD CONSTRAINT "custody_records_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custody_records" ADD CONSTRAINT "custody_records_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custody_records" ADD CONSTRAINT "custody_records_fund_id_funds_id_fk" FOREIGN KEY ("fund_id") REFERENCES "public"."funds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custody_records" ADD CONSTRAINT "custody_records_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custody_records" ADD CONSTRAINT "custody_records_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custody_settlements" ADD CONSTRAINT "custody_settlements_custody_id_custody_records_id_fk" FOREIGN KEY ("custody_id") REFERENCES "public"."custody_records"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custody_settlements" ADD CONSTRAINT "custody_settlements_voucher_id_vouchers_id_fk" FOREIGN KEY ("voucher_id") REFERENCES "public"."vouchers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custody_settlements" ADD CONSTRAINT "custody_settlements_inventory_item_id_inventory_items_id_fk" FOREIGN KEY ("inventory_item_id") REFERENCES "public"."inventory_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custody_settlements" ADD CONSTRAINT "custody_settlements_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_item_types" ADD CONSTRAINT "inventory_item_types_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_titles" ADD CONSTRAINT "job_titles_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_items" ADD CONSTRAINT "reconciliation_items_reconciliation_id_reconciliations_id_fk" FOREIGN KEY ("reconciliation_id") REFERENCES "public"."reconciliations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliation_items" ADD CONSTRAINT "reconciliation_items_voucher_id_vouchers_id_fk" FOREIGN KEY ("voucher_id") REFERENCES "public"."vouchers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_types" ADD CONSTRAINT "supplier_types_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "account_currencies_unique" ON "account_currencies" USING btree ("account_id","currency_id");--> statement-breakpoint
CREATE UNIQUE INDEX "bank_balances_bank_currency_unique" ON "bank_balances" USING btree ("bank_id","currency_id");--> statement-breakpoint
CREATE UNIQUE INDEX "exchange_balances_exchange_currency_unique" ON "exchange_balances" USING btree ("exchange_id","currency_id");--> statement-breakpoint
CREATE UNIQUE INDEX "fiscal_periods_year_month_unique" ON "fiscal_periods" USING btree ("fiscal_year_id","month");--> statement-breakpoint
CREATE UNIQUE INDEX "fiscal_years_biz_year_unique" ON "fiscal_years" USING btree ("business_id","year");--> statement-breakpoint
CREATE UNIQUE INDEX "wallet_balances_wallet_currency_unique" ON "wallet_balances" USING btree ("wallet_id","currency_id");--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "billing_periods" ADD CONSTRAINT "billing_periods_billing_system_id_billing_systems_config_id_fk" FOREIGN KEY ("billing_system_id") REFERENCES "public"."billing_systems_config"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_billing_accounts" ADD CONSTRAINT "employee_billing_accounts_billing_system_id_billing_systems_config_id_fk" FOREIGN KEY ("billing_system_id") REFERENCES "public"."billing_systems_config"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_billing_accounts" ADD CONSTRAINT "employee_billing_accounts_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "funds" ADD CONSTRAINT "funds_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "funds" ADD CONSTRAINT "funds_default_currency_id_currencies_id_fk" FOREIGN KEY ("default_currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pending_accounts" ADD CONSTRAINT "pending_accounts_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN "sub_type";--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN "sub_type_id";--> statement-breakpoint
ALTER TABLE "billing_periods" DROP COLUMN "billing_system";--> statement-breakpoint
ALTER TABLE "employee_billing_accounts" DROP COLUMN "billing_system";--> statement-breakpoint
ALTER TABLE "funds" DROP COLUMN "fund_type";--> statement-breakpoint
ALTER TABLE "funds" DROP COLUMN "sub_type";--> statement-breakpoint
ALTER TABLE "funds" DROP COLUMN "sub_type_id";--> statement-breakpoint
ALTER TABLE "operation_types" DROP COLUMN "category";--> statement-breakpoint
ALTER TABLE "vouchers" DROP COLUMN "category_id";--> statement-breakpoint
ALTER TABLE "vouchers" DROP COLUMN "reversal_status";--> statement-breakpoint
ALTER TABLE "vouchers" DROP COLUMN "reversed_voucher_id";--> statement-breakpoint
ALTER TABLE "vouchers" DROP COLUMN "reversal_reason";--> statement-breakpoint
ALTER TABLE "vouchers" DROP COLUMN "reversed_at";--> statement-breakpoint
ALTER TABLE "vouchers" DROP COLUMN "reversed_by";--> statement-breakpoint
ALTER TABLE "warehouses" DROP COLUMN "sub_type";--> statement-breakpoint
ALTER TABLE "warehouses" DROP COLUMN "sub_type_id";--> statement-breakpoint
ALTER TABLE "billing_systems_config" ADD CONSTRAINT "billing_systems_config_biz_key_unique" UNIQUE("business_id","system_key");--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_biz_code_unique" UNIQUE("business_id","code");--> statement-breakpoint
ALTER TABLE "stations" ADD CONSTRAINT "stations_biz_code_unique" UNIQUE("business_id","code");--> statement-breakpoint
ALTER TABLE "stations" ADD CONSTRAINT "stations_biz_seq_unique" UNIQUE("business_id","sequence_number");--> statement-breakpoint
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_biz_seq_unique" UNIQUE("business_id","sequence_number");--> statement-breakpoint
ALTER TABLE "public"."vouchers" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."voucher_status";--> statement-breakpoint
CREATE TYPE "public"."voucher_status" AS ENUM('unreviewed', 'reviewed');--> statement-breakpoint
ALTER TABLE "public"."vouchers" ALTER COLUMN "status" SET DATA TYPE "public"."voucher_status" USING "status"::"public"."voucher_status";--> statement-breakpoint
DROP TYPE "public"."fund_type";--> statement-breakpoint
DROP TYPE "public"."voucher_reversal_status";