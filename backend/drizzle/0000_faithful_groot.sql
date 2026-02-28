CREATE TYPE "public"."account_type" AS ENUM('fund', 'bank', 'e_wallet', 'exchange', 'accounting', 'intermediary', 'cash', 'custody', 'service');--> statement-breakpoint
CREATE TYPE "public"."billing_system" AS ENUM('moghrabi_v1', 'moghrabi_v2', 'moghrabi_v3', 'support_fund', 'support_fund_west', 'prepaid');--> statement-breakpoint
CREATE TYPE "public"."collection_method" AS ENUM('cash_mobile', 'manual_assign', 'electronic', 'haseb_deposit');--> statement-breakpoint
CREATE TYPE "public"."currency_code" AS ENUM('YER', 'SAR', 'USD');--> statement-breakpoint
CREATE TYPE "public"."employee_status" AS ENUM('active', 'inactive', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."expense_type" AS ENUM('fixed', 'variable', 'annual');--> statement-breakpoint
CREATE TYPE "public"."fund_type" AS ENUM('collection', 'salary_advance', 'custody', 'safe', 'expense', 'deposit');--> statement-breakpoint
CREATE TYPE "public"."movement_type" AS ENUM('in', 'out', 'transfer', 'adjustment');--> statement-breakpoint
CREATE TYPE "public"."pending_status" AS ENUM('pending', 'in_progress', 'resolved', 'written_off');--> statement-breakpoint
CREATE TYPE "public"."reconciliation_status" AS ENUM('open', 'in_progress', 'completed', 'disputed');--> statement-breakpoint
CREATE TYPE "public"."reconciliation_type" AS ENUM('manager', 'exchange', 'accountant', 'supplier', 'custody');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'accountant', 'manager', 'viewer');--> statement-breakpoint
CREATE TYPE "public"."voucher_status" AS ENUM('draft', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."voucher_type" AS ENUM('receipt', 'payment', 'transfer', 'collection', 'delivery');--> statement-breakpoint
CREATE TYPE "public"."warehouse_type" AS ENUM('main', 'station');--> statement-breakpoint
CREATE TABLE "account_allowed_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_account_id" integer NOT NULL,
	"to_account_id" integer NOT NULL,
	"link_type" varchar(30) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account_balances" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer NOT NULL,
	"currency_id" integer NOT NULL,
	"balance" numeric(20, 2) DEFAULT '0' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"account_type" "account_type" NOT NULL,
	"account_number" varchar(100),
	"provider" varchar(200),
	"sub_type" varchar(100),
	"responsible_person" varchar(200),
	"parent_account_id" integer,
	"supported_currencies" jsonb DEFAULT '["YER","SAR","USD"]'::jsonb,
	"can_initiate_receipt" boolean DEFAULT true NOT NULL,
	"can_initiate_payment" boolean DEFAULT true NOT NULL,
	"can_receive_payment" boolean DEFAULT true NOT NULL,
	"can_be_debited_by_receipt" boolean DEFAULT true NOT NULL,
	"can_create_voucher" boolean DEFAULT false NOT NULL,
	"can_approve_voucher" boolean DEFAULT false NOT NULL,
	"receives_from_stations" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" integer NOT NULL,
	"file_name" varchar(300) NOT NULL,
	"file_path" varchar(500) NOT NULL,
	"file_type" varchar(50),
	"file_size" integer,
	"description" text,
	"uploaded_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"business_id" integer,
	"action" varchar(100) NOT NULL,
	"table_name" varchar(100),
	"record_id" integer,
	"old_data" jsonb,
	"new_data" jsonb,
	"ip_address" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bank_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"sub_type_key" varchar(100) NOT NULL,
	"description" text,
	"icon" varchar(100) DEFAULT 'account_balance',
	"color" varchar(50) DEFAULT '#4CAF50',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing_account_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"icon" varchar(50) DEFAULT 'receipt',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing_periods" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"station_id" integer NOT NULL,
	"billing_system" "billing_system" NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"total_billed" numeric(20, 2),
	"total_collected" numeric(20, 2),
	"total_remaining" numeric(20, 2),
	"currency_id" integer,
	"is_closed" boolean DEFAULT false NOT NULL,
	"closed_date" date,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing_systems_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"icon" varchar(50) DEFAULT 'receipt',
	"color" varchar(20) DEFAULT '#3b82f6',
	"station_mode" varchar(20) DEFAULT 'per_station' NOT NULL,
	"station_ids" jsonb DEFAULT '[]'::jsonb,
	"supported_method_ids" jsonb DEFAULT '[]'::jsonb,
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_partners" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"full_name" varchar(200) NOT NULL,
	"share_percentage" numeric(5, 2),
	"phone" varchar(20),
	"role" varchar(100),
	"notes" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "businesses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"code" varchar(50) NOT NULL,
	"type" varchar(30) DEFAULT 'stations',
	"description" text,
	"icon" varchar(50) DEFAULT 'business',
	"color" varchar(20) DEFAULT '#3b82f6',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "businesses_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "collection_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"collection_id" integer NOT NULL,
	"employee_id" integer NOT NULL,
	"billing_account_id" integer NOT NULL,
	"amount" numeric(20, 2) DEFAULT '0' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" "currency_code" NOT NULL,
	"name_ar" varchar(100) NOT NULL,
	"symbol" varchar(10) NOT NULL,
	"exchange_rate" numeric(15, 4) DEFAULT '1' NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "currencies_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "daily_collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"station_id" integer NOT NULL,
	"collection_date" date NOT NULL,
	"currency_id" integer,
	"total_amount" numeric(20, 2) DEFAULT '0' NOT NULL,
	"is_fully_delivered" boolean DEFAULT false NOT NULL,
	"notes" text,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "delivery_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"collection_id" integer NOT NULL,
	"employee_id" integer NOT NULL,
	"to_account_id" integer NOT NULL,
	"amount" numeric(20, 2) NOT NULL,
	"currency_id" integer,
	"delivery_date" date NOT NULL,
	"reference" varchar(200),
	"notes" text,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "diesel_consumption" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"station_id" integer NOT NULL,
	"quantity" numeric(15, 2) NOT NULL,
	"unit" varchar(20) DEFAULT 'لتر',
	"consumption_date" date NOT NULL,
	"billing_period_id" integer,
	"meter_reading" numeric(15, 2),
	"notes" text,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "e_wallet_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"sub_type_key" varchar(100) NOT NULL,
	"description" text,
	"icon" varchar(100) DEFAULT 'e_wallet',
	"color" varchar(50) DEFAULT '#4CAF50',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employee_billing_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"employee_id" integer NOT NULL,
	"station_id" integer NOT NULL,
	"billing_system" "billing_system" NOT NULL,
	"collection_method" "collection_method" NOT NULL,
	"label" varchar(200) NOT NULL,
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"full_name" varchar(200) NOT NULL,
	"job_title" varchar(200),
	"station_id" integer,
	"department" varchar(100),
	"salary" numeric(15, 2) DEFAULT '0' NOT NULL,
	"salary_currency" varchar(10) DEFAULT 'YER',
	"phone" varchar(20),
	"status" "employee_status" DEFAULT 'active' NOT NULL,
	"hire_date" date,
	"monthly_allowance" numeric(15, 2) DEFAULT '0',
	"is_manager" boolean DEFAULT false NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exchange_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"sub_type_key" varchar(100) NOT NULL,
	"description" text,
	"icon" varchar(100) DEFAULT 'currency_exchange',
	"color" varchar(50) DEFAULT '#4CAF50',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense_budget" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"station_id" integer,
	"amount" numeric(15, 2) NOT NULL,
	"currency_id" integer NOT NULL,
	"expense_type" "expense_type" NOT NULL,
	"month" integer,
	"year" integer,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"icon" varchar(50) DEFAULT 'receipt_long',
	"color" varchar(20) DEFAULT '#3b82f6',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fund_balances" (
	"id" serial PRIMARY KEY NOT NULL,
	"fund_id" integer NOT NULL,
	"currency_id" integer NOT NULL,
	"balance" numeric(20, 2) DEFAULT '0' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fund_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"sub_type_key" varchar(100) NOT NULL,
	"description" text,
	"icon" varchar(100) DEFAULT 'savings',
	"color" varchar(50) DEFAULT '#4CAF50',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "funds" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"fund_type" "fund_type" NOT NULL,
	"station_id" integer,
	"responsible_person" varchar(200),
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventory_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer,
	"name" varchar(200) NOT NULL,
	"code" varchar(50),
	"category" varchar(100),
	"unit" varchar(50),
	"min_quantity" numeric(15, 2),
	"notes" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventory_movements" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer,
	"item_id" integer NOT NULL,
	"warehouse_id" integer NOT NULL,
	"movement_type" "movement_type" NOT NULL,
	"quantity" numeric(15, 2) NOT NULL,
	"unit_cost" numeric(15, 2),
	"currency_id" integer,
	"to_warehouse_id" integer,
	"supplier_id" integer,
	"station_id" integer,
	"reference" varchar(200),
	"description" text,
	"movement_date" date NOT NULL,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventory_stock" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"warehouse_id" integer NOT NULL,
	"quantity" numeric(15, 2) DEFAULT '0' NOT NULL,
	"avg_cost" numeric(15, 2),
	"currency_id" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"entry_number" varchar(50) NOT NULL,
	"description" text,
	"entry_date" date NOT NULL,
	"reference" varchar(100),
	"operation_type_id" integer,
	"created_by" integer,
	"is_balanced" boolean DEFAULT false NOT NULL,
	"total_debit" numeric(20, 2) DEFAULT '0' NOT NULL,
	"total_credit" numeric(20, 2) DEFAULT '0' NOT NULL,
	"status" varchar(20) DEFAULT 'confirmed' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_entry_lines" (
	"id" serial PRIMARY KEY NOT NULL,
	"journal_entry_id" integer NOT NULL,
	"account_id" integer NOT NULL,
	"line_type" varchar(10) NOT NULL,
	"amount" numeric(20, 2) NOT NULL,
	"description" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "operation_type_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"operation_type_id" integer NOT NULL,
	"account_id" integer,
	"employee_billing_account_id" integer,
	"label" varchar(200),
	"permission" varchar(30) DEFAULT 'both' NOT NULL,
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "operation_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"icon" varchar(50) DEFAULT 'receipt_long',
	"color" varchar(20) DEFAULT '#3b82f6',
	"category" varchar(50) DEFAULT 'عام' NOT NULL,
	"voucher_type" varchar(30),
	"payment_method" varchar(30),
	"source_account_id" integer,
	"source_fund_id" integer,
	"screens" text DEFAULT '{}',
	"requires_attachment" boolean DEFAULT false NOT NULL,
	"has_multi_lines" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pending_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer,
	"person_or_entity" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"status" "pending_status" DEFAULT 'pending' NOT NULL,
	"estimated_amount" numeric(20, 2),
	"currency_id" integer,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reconciliations" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"title" varchar(300) NOT NULL,
	"reconciliation_type" "reconciliation_type" NOT NULL,
	"status" "reconciliation_status" DEFAULT 'open' NOT NULL,
	"with_person" varchar(200),
	"account_id" integer,
	"fund_id" integer,
	"station_id" integer,
	"employee_id" integer,
	"supplier_id" integer,
	"period_start" date,
	"period_end" date,
	"expected_amount" numeric(20, 2),
	"actual_amount" numeric(20, 2),
	"difference" numeric(20, 2),
	"currency_id" integer,
	"notes" text,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "salary_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"employee_id" integer NOT NULL,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"base_salary" numeric(15, 2) NOT NULL,
	"advance" numeric(15, 2) DEFAULT '0',
	"advance_date" date,
	"advance_paid_via" varchar(100),
	"deductions" numeric(15, 2) DEFAULT '0',
	"deduction_notes" text,
	"net_salary" numeric(15, 2) NOT NULL,
	"currency_id" integer NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	"paid_date" date,
	"paid_via" varchar(100),
	"attendance_days" integer,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sidebar_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"screen_key" varchar(100) NOT NULL,
	"label" varchar(200) NOT NULL,
	"icon" varchar(50) NOT NULL,
	"route" varchar(300) NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"badge" integer,
	"badge_color" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sidebar_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"icon" varchar(50) DEFAULT 'folder',
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stations" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"code" varchar(50) NOT NULL,
	"location" varchar(300),
	"manager_id" integer,
	"billing_systems" jsonb DEFAULT '[]'::jsonb,
	"has_employees" boolean DEFAULT true NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "stations_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "supplier_balances" (
	"id" serial PRIMARY KEY NOT NULL,
	"supplier_id" integer NOT NULL,
	"currency_id" integer NOT NULL,
	"balance" numeric(20, 2) DEFAULT '0' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "suppliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"category" varchar(100),
	"phone" varchar(20),
	"address" varchar(300),
	"contact_person" varchar(200),
	"notes" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_sidebar_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"business_id" integer NOT NULL,
	"sidebar_item_id" integer NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"custom_sort_order" integer,
	"custom_section_name" varchar(200),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"full_name" varchar(200) NOT NULL,
	"role" "user_role" DEFAULT 'viewer' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "voucher_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer,
	"name" varchar(200) NOT NULL,
	"type" "voucher_type" NOT NULL,
	"parent_id" integer,
	"icon" varchar(50),
	"color" varchar(20),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vouchers" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"voucher_number" varchar(50) NOT NULL,
	"voucher_type" "voucher_type" NOT NULL,
	"status" "voucher_status" DEFAULT 'confirmed' NOT NULL,
	"amount" numeric(20, 2) NOT NULL,
	"currency_id" integer NOT NULL,
	"exchange_rate" numeric(15, 4),
	"from_account_id" integer,
	"to_account_id" integer,
	"from_fund_id" integer,
	"to_fund_id" integer,
	"station_id" integer,
	"employee_id" integer,
	"supplier_id" integer,
	"category_id" integer,
	"description" text,
	"reference" varchar(200),
	"voucher_date" timestamp DEFAULT now() NOT NULL,
	"created_by" integer,
	"approved_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "warehouses" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"warehouse_type" "warehouse_type" NOT NULL,
	"station_id" integer,
	"responsible_person" varchar(200),
	"location" varchar(300),
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account_allowed_links" ADD CONSTRAINT "account_allowed_links_from_account_id_accounts_id_fk" FOREIGN KEY ("from_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_allowed_links" ADD CONSTRAINT "account_allowed_links_to_account_id_accounts_id_fk" FOREIGN KEY ("to_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_balances" ADD CONSTRAINT "account_balances_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account_balances" ADD CONSTRAINT "account_balances_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_types" ADD CONSTRAINT "bank_types_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "billing_account_types" ADD CONSTRAINT "billing_account_types_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "billing_periods" ADD CONSTRAINT "billing_periods_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "billing_periods" ADD CONSTRAINT "billing_periods_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "billing_periods" ADD CONSTRAINT "billing_periods_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "billing_systems_config" ADD CONSTRAINT "billing_systems_config_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_partners" ADD CONSTRAINT "business_partners_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_details" ADD CONSTRAINT "collection_details_collection_id_daily_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."daily_collections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_details" ADD CONSTRAINT "collection_details_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_details" ADD CONSTRAINT "collection_details_billing_account_id_employee_billing_accounts_id_fk" FOREIGN KEY ("billing_account_id") REFERENCES "public"."employee_billing_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_collections" ADD CONSTRAINT "daily_collections_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_collections" ADD CONSTRAINT "daily_collections_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_collections" ADD CONSTRAINT "daily_collections_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_collections" ADD CONSTRAINT "daily_collections_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery_records" ADD CONSTRAINT "delivery_records_collection_id_daily_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."daily_collections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery_records" ADD CONSTRAINT "delivery_records_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery_records" ADD CONSTRAINT "delivery_records_to_account_id_accounts_id_fk" FOREIGN KEY ("to_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery_records" ADD CONSTRAINT "delivery_records_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery_records" ADD CONSTRAINT "delivery_records_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diesel_consumption" ADD CONSTRAINT "diesel_consumption_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diesel_consumption" ADD CONSTRAINT "diesel_consumption_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diesel_consumption" ADD CONSTRAINT "diesel_consumption_billing_period_id_billing_periods_id_fk" FOREIGN KEY ("billing_period_id") REFERENCES "public"."billing_periods"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diesel_consumption" ADD CONSTRAINT "diesel_consumption_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "e_wallet_types" ADD CONSTRAINT "e_wallet_types_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_billing_accounts" ADD CONSTRAINT "employee_billing_accounts_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_billing_accounts" ADD CONSTRAINT "employee_billing_accounts_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_types" ADD CONSTRAINT "exchange_types_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_budget" ADD CONSTRAINT "expense_budget_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_budget" ADD CONSTRAINT "expense_budget_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_budget" ADD CONSTRAINT "expense_budget_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense_categories" ADD CONSTRAINT "expense_categories_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fund_balances" ADD CONSTRAINT "fund_balances_fund_id_funds_id_fk" FOREIGN KEY ("fund_id") REFERENCES "public"."funds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fund_balances" ADD CONSTRAINT "fund_balances_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fund_types" ADD CONSTRAINT "fund_types_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "funds" ADD CONSTRAINT "funds_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "funds" ADD CONSTRAINT "funds_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_items" ADD CONSTRAINT "inventory_items_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_item_id_inventory_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."inventory_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_to_warehouse_id_warehouses_id_fk" FOREIGN KEY ("to_warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_movements" ADD CONSTRAINT "inventory_movements_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_stock" ADD CONSTRAINT "inventory_stock_item_id_inventory_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."inventory_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_stock" ADD CONSTRAINT "inventory_stock_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory_stock" ADD CONSTRAINT "inventory_stock_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_operation_type_id_operation_types_id_fk" FOREIGN KEY ("operation_type_id") REFERENCES "public"."operation_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entry_lines" ADD CONSTRAINT "journal_entry_lines_journal_entry_id_journal_entries_id_fk" FOREIGN KEY ("journal_entry_id") REFERENCES "public"."journal_entries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entry_lines" ADD CONSTRAINT "journal_entry_lines_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operation_type_accounts" ADD CONSTRAINT "operation_type_accounts_operation_type_id_operation_types_id_fk" FOREIGN KEY ("operation_type_id") REFERENCES "public"."operation_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operation_type_accounts" ADD CONSTRAINT "operation_type_accounts_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operation_type_accounts" ADD CONSTRAINT "operation_type_accounts_employee_billing_account_id_employee_billing_accounts_id_fk" FOREIGN KEY ("employee_billing_account_id") REFERENCES "public"."employee_billing_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operation_types" ADD CONSTRAINT "operation_types_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operation_types" ADD CONSTRAINT "operation_types_source_account_id_accounts_id_fk" FOREIGN KEY ("source_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operation_types" ADD CONSTRAINT "operation_types_source_fund_id_funds_id_fk" FOREIGN KEY ("source_fund_id") REFERENCES "public"."funds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pending_accounts" ADD CONSTRAINT "pending_accounts_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pending_accounts" ADD CONSTRAINT "pending_accounts_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliations" ADD CONSTRAINT "reconciliations_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliations" ADD CONSTRAINT "reconciliations_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliations" ADD CONSTRAINT "reconciliations_fund_id_funds_id_fk" FOREIGN KEY ("fund_id") REFERENCES "public"."funds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliations" ADD CONSTRAINT "reconciliations_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliations" ADD CONSTRAINT "reconciliations_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliations" ADD CONSTRAINT "reconciliations_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliations" ADD CONSTRAINT "reconciliations_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reconciliations" ADD CONSTRAINT "reconciliations_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salary_records" ADD CONSTRAINT "salary_records_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salary_records" ADD CONSTRAINT "salary_records_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salary_records" ADD CONSTRAINT "salary_records_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sidebar_items" ADD CONSTRAINT "sidebar_items_section_id_sidebar_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sidebar_sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sidebar_sections" ADD CONSTRAINT "sidebar_sections_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stations" ADD CONSTRAINT "stations_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_balances" ADD CONSTRAINT "supplier_balances_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_balances" ADD CONSTRAINT "supplier_balances_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sidebar_config" ADD CONSTRAINT "user_sidebar_config_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sidebar_config" ADD CONSTRAINT "user_sidebar_config_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sidebar_config" ADD CONSTRAINT "user_sidebar_config_sidebar_item_id_sidebar_items_id_fk" FOREIGN KEY ("sidebar_item_id") REFERENCES "public"."sidebar_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voucher_categories" ADD CONSTRAINT "voucher_categories_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_from_account_id_accounts_id_fk" FOREIGN KEY ("from_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_to_account_id_accounts_id_fk" FOREIGN KEY ("to_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_from_fund_id_funds_id_fk" FOREIGN KEY ("from_fund_id") REFERENCES "public"."funds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_to_fund_id_funds_id_fk" FOREIGN KEY ("to_fund_id") REFERENCES "public"."funds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_category_id_voucher_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."voucher_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_approved_by_users_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;