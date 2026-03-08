DO $$ BEGIN CREATE TYPE "public"."payment_method" AS ENUM('cash', 'credit', 'partial'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
DO $$ BEGIN CREATE TYPE "public"."purchase_invoice_status" AS ENUM('draft', 'confirmed', 'partial', 'completed', 'cancelled'); EXCEPTION WHEN duplicate_object THEN null; END $$;--> statement-breakpoint
ALTER TYPE "public"."movement_type" ADD VALUE IF NOT EXISTS 'supply_invoice';--> statement-breakpoint
ALTER TYPE "public"."movement_type" ADD VALUE IF NOT EXISTS 'supply_order';--> statement-breakpoint
ALTER TYPE "public"."movement_type" ADD VALUE IF NOT EXISTS 'dispatch';--> statement-breakpoint
ALTER TYPE "public"."movement_type" ADD VALUE IF NOT EXISTS 'transfer_out';--> statement-breakpoint
ALTER TYPE "public"."movement_type" ADD VALUE IF NOT EXISTS 'receive_transfer';--> statement-breakpoint
ALTER TYPE "public"."voucher_status" ADD VALUE IF NOT EXISTS 'pending_approval';--> statement-breakpoint
ALTER TYPE "public"."voucher_status" ADD VALUE IF NOT EXISTS 'approved';--> statement-breakpoint
ALTER TYPE "public"."voucher_status" ADD VALUE IF NOT EXISTS 'rejected';--> statement-breakpoint
ALTER TYPE "public"."voucher_status" ADD VALUE IF NOT EXISTS 'reversed';--> statement-breakpoint
ALTER TYPE "public"."voucher_type" ADD VALUE IF NOT EXISTS 'journal';--> statement-breakpoint
ALTER TYPE "public"."voucher_type" ADD VALUE IF NOT EXISTS 'supply_invoice';--> statement-breakpoint
ALTER TYPE "public"."voucher_type" ADD VALUE IF NOT EXISTS 'supply_order';--> statement-breakpoint
ALTER TYPE "public"."voucher_type" ADD VALUE IF NOT EXISTS 'dispatch';--> statement-breakpoint
ALTER TYPE "public"."voucher_type" ADD VALUE IF NOT EXISTS 'transfer_out';--> statement-breakpoint
ALTER TYPE "public"."voucher_type" ADD VALUE IF NOT EXISTS 'receive_transfer';--> statement-breakpoint
ALTER TYPE "public"."warehouse_type" ADD VALUE IF NOT EXISTS 'sub';--> statement-breakpoint
CREATE TABLE "analytics_snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"report_key" varchar(100) NOT NULL,
	"filters_hash" varchar(64) NOT NULL,
	"data" jsonb NOT NULL,
	"generated_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp,
	"created_by" integer
);
--> statement-breakpoint
CREATE TABLE "journal_entry_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"category_key" varchar(100) NOT NULL,
	"sequence_number" integer,
	"description" text,
	"icon" varchar(100) DEFAULT 'book',
	"color" varchar(50) DEFAULT '#6366f1',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "journal_entry_cat_biz_key_unique" UNIQUE("business_id","category_key"),
	CONSTRAINT "journal_entry_cat_biz_seq_unique" UNIQUE("business_id","sequence_number")
);
--> statement-breakpoint
CREATE TABLE "operation_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"category_key" varchar(100) NOT NULL,
	"sequence_number" integer,
	"code" varchar(30),
	"description" text,
	"icon" varchar(50) DEFAULT 'category',
	"color" varchar(20) DEFAULT '#6366f1',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "op_categories_biz_key_unique" UNIQUE("business_id","category_key"),
	CONSTRAINT "op_categories_biz_code_unique" UNIQUE("business_id","code"),
	CONSTRAINT "op_categories_biz_seq_unique" UNIQUE("business_id","sequence_number")
);
--> statement-breakpoint
CREATE TABLE "purchase_invoice_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoice_id" integer NOT NULL,
	"inventory_item_id" integer NOT NULL,
	"quantity" numeric(20, 4) NOT NULL,
	"unit_cost" numeric(20, 2) NOT NULL,
	"total_cost" numeric(20, 2) NOT NULL,
	"tax" numeric(20, 2) DEFAULT '0' NOT NULL,
	"discount" numeric(20, 2) DEFAULT '0' NOT NULL,
	"received_quantity" numeric(20, 4) DEFAULT '0' NOT NULL,
	"sort_order" integer DEFAULT 0,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchase_invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"invoice_number" varchar(50) NOT NULL,
	"supplier_id" integer NOT NULL,
	"supplier_account_id" integer,
	"warehouse_id" integer,
	"currency_id" integer NOT NULL,
	"subtotal" numeric(20, 2) DEFAULT '0' NOT NULL,
	"tax" numeric(20, 2) DEFAULT '0' NOT NULL,
	"discount" numeric(20, 2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(20, 2) DEFAULT '0' NOT NULL,
	"payment_method" "payment_method" DEFAULT 'credit' NOT NULL,
	"paid_amount" numeric(20, 2) DEFAULT '0' NOT NULL,
	"remaining_amount" numeric(20, 2) DEFAULT '0' NOT NULL,
	"voucher_id" integer,
	"warehouse_operation_id" integer,
	"status" "purchase_invoice_status" DEFAULT 'draft' NOT NULL,
	"invoice_date" timestamp DEFAULT now() NOT NULL,
	"due_date" timestamp,
	"external_reference" varchar(100),
	"notes" text,
	"received_quantity" numeric(20, 4) DEFAULT '0' NOT NULL,
	"received_status" varchar(20) DEFAULT 'pending' NOT NULL,
	"sequence_number" integer,
	"full_sequence_number" varchar(100),
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "purchase_invoices_biz_num_unique" UNIQUE("business_id","invoice_number")
);
--> statement-breakpoint
CREATE TABLE "screen_widget_warehouses" (
	"id" serial PRIMARY KEY NOT NULL,
	"widget_id" integer NOT NULL,
	"warehouse_id" integer NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sequence_counters" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"counter_type" varchar(50) NOT NULL,
	"entity_id" integer NOT NULL,
	"year" integer NOT NULL,
	"last_number" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sequence_counters_unique" UNIQUE("business_id","counter_type","entity_id","year")
);
--> statement-breakpoint
CREATE TABLE "ui_components" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"page_id" integer NOT NULL,
	"component_type" varchar(50) NOT NULL,
	"title" varchar(200),
	"config" jsonb DEFAULT '{}'::jsonb,
	"data_source_id" integer,
	"position_x" integer DEFAULT 0 NOT NULL,
	"position_y" integer DEFAULT 0 NOT NULL,
	"width" integer DEFAULT 6 NOT NULL,
	"height" integer DEFAULT 4 NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ui_data_sources" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"source_type" varchar(30) NOT NULL,
	"table_name" varchar(100),
	"query_template" text,
	"filters" jsonb DEFAULT '{}'::jsonb,
	"sorting" jsonb DEFAULT '{}'::jsonb,
	"config" jsonb DEFAULT '{}'::jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ui_pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"page_key" varchar(100) NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"icon" varchar(50) DEFAULT 'dashboard',
	"color" varchar(20) DEFAULT '#3b82f6',
	"layout" varchar(30) DEFAULT 'grid',
	"config" jsonb DEFAULT '{}'::jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voucher_lines" (
	"id" serial PRIMARY KEY NOT NULL,
	"voucher_id" integer NOT NULL,
	"account_id" integer NOT NULL,
	"amount" numeric(20, 2) NOT NULL,
	"description" text,
	"currency_id" integer,
	"exchange_rate" numeric(15, 4),
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "warehouse_operation_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"operation_id" integer NOT NULL,
	"item_name" varchar(200) NOT NULL,
	"item_code" varchar(50),
	"quantity" numeric(15, 2) NOT NULL,
	"unit_cost" numeric(15, 2),
	"total_cost" numeric(20, 2),
	"unit" varchar(50),
	"currency_id" integer,
	"notes" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "warehouse_operations" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"operation_number" varchar(50) NOT NULL,
	"operation_type" varchar(30) NOT NULL,
	"operation_type_id" integer,
	"source_warehouse_id" integer,
	"destination_warehouse_id" integer,
	"related_operation_id" integer,
	"related_voucher_id" integer,
	"supplier_id" integer,
	"purchase_invoice_id" integer,
	"account_id" integer,
	"total_cost" numeric(20, 2) DEFAULT '0' NOT NULL,
	"total_items" integer DEFAULT 0 NOT NULL,
	"currency_id" integer,
	"operation_date" varchar(20) NOT NULL,
	"description" text,
	"reference" varchar(200),
	"status" varchar(20) DEFAULT 'confirmed' NOT NULL,
	"warehouse_sequence" integer,
	"template_sequence" integer,
	"full_sequence_number" varchar(100),
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "warehouse_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"sub_type_key" varchar(100) NOT NULL,
	"sequence_number" integer,
	"description" text,
	"icon" varchar(100) DEFAULT 'warehouse',
	"color" varchar(50) DEFAULT '#4CAF50',
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "warehouse_types_biz_key_unique" UNIQUE("business_id","sub_type_key"),
	CONSTRAINT "warehouse_types_biz_seq_unique" UNIQUE("business_id","sequence_number")
);
--> statement-breakpoint
CREATE TABLE "workflow_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"voucher_id" integer NOT NULL,
	"transition_id" integer,
	"from_status" varchar(30) NOT NULL,
	"to_status" varchar(30) NOT NULL,
	"action_name" varchar(100) NOT NULL,
	"note" text,
	"executed_by" integer,
	"executed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workflow_transitions" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"operation_type_id" integer NOT NULL,
	"from_status" varchar(30) NOT NULL,
	"to_status" varchar(30) NOT NULL,
	"action_name" varchar(100) NOT NULL,
	"action_icon" varchar(50) DEFAULT 'check_circle',
	"action_color" varchar(20) DEFAULT '#3b82f6',
	"required_role" varchar(100),
	"requires_note" boolean DEFAULT false NOT NULL,
	"auto_execute" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "sub_type_id" integer;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "code" varchar(30);--> statement-breakpoint
ALTER TABLE "bank_types" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "custom_screen_config" ADD COLUMN "history_icon" varchar(100) DEFAULT 'history' NOT NULL;--> statement-breakpoint
ALTER TABLE "custom_screen_config" ADD COLUMN "history_color" varchar(20) DEFAULT '#6366f1' NOT NULL;--> statement-breakpoint
ALTER TABLE "custom_screen_config" ADD COLUMN "accounts_icon" varchar(100) DEFAULT 'savings' NOT NULL;--> statement-breakpoint
ALTER TABLE "custom_screen_config" ADD COLUMN "accounts_color" varchar(20) DEFAULT '#10b981' NOT NULL;--> statement-breakpoint
ALTER TABLE "e_wallet_types" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "exchange_types" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "fund_types" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "funds" ADD COLUMN "sub_type" varchar(100);--> statement-breakpoint
ALTER TABLE "funds" ADD COLUMN "sub_type_id" integer;--> statement-breakpoint
ALTER TABLE "funds" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "funds" ADD COLUMN "code" varchar(30);--> statement-breakpoint
ALTER TABLE "inventory_stock" ADD COLUMN "costing_method" varchar(20) DEFAULT 'weighted_avg';--> statement-breakpoint
ALTER TABLE "inventory_stock" ADD COLUMN "cost_layers" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "journal_entries" ADD COLUMN "category" varchar(100);--> statement-breakpoint
ALTER TABLE "journal_entries" ADD COLUMN "category_sequence" varchar(50);--> statement-breakpoint
ALTER TABLE "journal_entries" ADD COLUMN "template_sequence" varchar(50);--> statement-breakpoint
ALTER TABLE "journal_entries" ADD COLUMN "full_sequence_number" varchar(100);--> statement-breakpoint
ALTER TABLE "operation_types" ADD COLUMN "category_id" integer;--> statement-breakpoint
ALTER TABLE "operation_types" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "operation_types" ADD COLUMN "code" varchar(30);--> statement-breakpoint
ALTER TABLE "operation_types" ADD COLUMN "source_warehouse_id" integer;--> statement-breakpoint
ALTER TABLE "operation_types" ADD COLUMN "main_account_id" integer;--> statement-breakpoint
ALTER TABLE "operation_types" ADD COLUMN "main_fund_id" integer;--> statement-breakpoint
ALTER TABLE "operation_types" ADD COLUMN "template_type_id" integer;--> statement-breakpoint
ALTER TABLE "operation_types" ADD COLUMN "workflow_config" jsonb;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD COLUMN "constraints" jsonb DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "account_sequence" varchar(50);--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "template_sequence" varchar(50);--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "full_sequence_number" varchar(100);--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "has_multiple_lines" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "warehouses" ADD COLUMN "sub_type" varchar(100);--> statement-breakpoint
ALTER TABLE "warehouses" ADD COLUMN "sub_type_id" integer;--> statement-breakpoint
ALTER TABLE "warehouses" ADD COLUMN "sequence_number" integer;--> statement-breakpoint
ALTER TABLE "warehouses" ADD COLUMN "code" varchar(30);--> statement-breakpoint
ALTER TABLE "analytics_snapshots" ADD CONSTRAINT "analytics_snapshots_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "analytics_snapshots" ADD CONSTRAINT "analytics_snapshots_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entry_categories" ADD CONSTRAINT "journal_entry_categories_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operation_categories" ADD CONSTRAINT "operation_categories_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_invoice_items" ADD CONSTRAINT "purchase_invoice_items_invoice_id_purchase_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."purchase_invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_invoice_items" ADD CONSTRAINT "purchase_invoice_items_inventory_item_id_inventory_items_id_fk" FOREIGN KEY ("inventory_item_id") REFERENCES "public"."inventory_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_invoices" ADD CONSTRAINT "purchase_invoices_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_invoices" ADD CONSTRAINT "purchase_invoices_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_invoices" ADD CONSTRAINT "purchase_invoices_supplier_account_id_accounts_id_fk" FOREIGN KEY ("supplier_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_invoices" ADD CONSTRAINT "purchase_invoices_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_invoices" ADD CONSTRAINT "purchase_invoices_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_invoices" ADD CONSTRAINT "purchase_invoices_voucher_id_vouchers_id_fk" FOREIGN KEY ("voucher_id") REFERENCES "public"."vouchers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_invoices" ADD CONSTRAINT "purchase_invoices_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screen_widget_warehouses" ADD CONSTRAINT "screen_widget_warehouses_widget_id_screen_widgets_id_fk" FOREIGN KEY ("widget_id") REFERENCES "public"."screen_widgets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screen_widget_warehouses" ADD CONSTRAINT "screen_widget_warehouses_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sequence_counters" ADD CONSTRAINT "sequence_counters_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ui_components" ADD CONSTRAINT "ui_components_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ui_components" ADD CONSTRAINT "ui_components_page_id_ui_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."ui_pages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ui_components" ADD CONSTRAINT "ui_components_data_source_id_ui_data_sources_id_fk" FOREIGN KEY ("data_source_id") REFERENCES "public"."ui_data_sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ui_data_sources" ADD CONSTRAINT "ui_data_sources_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ui_pages" ADD CONSTRAINT "ui_pages_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ui_pages" ADD CONSTRAINT "ui_pages_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voucher_lines" ADD CONSTRAINT "voucher_lines_voucher_id_vouchers_id_fk" FOREIGN KEY ("voucher_id") REFERENCES "public"."vouchers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voucher_lines" ADD CONSTRAINT "voucher_lines_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voucher_lines" ADD CONSTRAINT "voucher_lines_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operation_items" ADD CONSTRAINT "warehouse_operation_items_operation_id_warehouse_operations_id_fk" FOREIGN KEY ("operation_id") REFERENCES "public"."warehouse_operations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operation_items" ADD CONSTRAINT "warehouse_operation_items_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operations" ADD CONSTRAINT "warehouse_operations_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operations" ADD CONSTRAINT "warehouse_operations_operation_type_id_operation_types_id_fk" FOREIGN KEY ("operation_type_id") REFERENCES "public"."operation_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operations" ADD CONSTRAINT "warehouse_operations_source_warehouse_id_warehouses_id_fk" FOREIGN KEY ("source_warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operations" ADD CONSTRAINT "warehouse_operations_destination_warehouse_id_warehouses_id_fk" FOREIGN KEY ("destination_warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operations" ADD CONSTRAINT "warehouse_operations_related_voucher_id_vouchers_id_fk" FOREIGN KEY ("related_voucher_id") REFERENCES "public"."vouchers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operations" ADD CONSTRAINT "warehouse_operations_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operations" ADD CONSTRAINT "warehouse_operations_purchase_invoice_id_purchase_invoices_id_fk" FOREIGN KEY ("purchase_invoice_id") REFERENCES "public"."purchase_invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operations" ADD CONSTRAINT "warehouse_operations_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operations" ADD CONSTRAINT "warehouse_operations_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_operations" ADD CONSTRAINT "warehouse_operations_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouse_types" ADD CONSTRAINT "warehouse_types_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_history" ADD CONSTRAINT "workflow_history_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_history" ADD CONSTRAINT "workflow_history_voucher_id_vouchers_id_fk" FOREIGN KEY ("voucher_id") REFERENCES "public"."vouchers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_history" ADD CONSTRAINT "workflow_history_transition_id_workflow_transitions_id_fk" FOREIGN KEY ("transition_id") REFERENCES "public"."workflow_transitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_history" ADD CONSTRAINT "workflow_history_executed_by_users_id_fk" FOREIGN KEY ("executed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_transitions" ADD CONSTRAINT "workflow_transitions_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_transitions" ADD CONSTRAINT "workflow_transitions_operation_type_id_operation_types_id_fk" FOREIGN KEY ("operation_type_id") REFERENCES "public"."operation_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operation_types" ADD CONSTRAINT "operation_types_category_id_operation_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."operation_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operation_types" ADD CONSTRAINT "operation_types_source_warehouse_id_warehouses_id_fk" FOREIGN KEY ("source_warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operation_types" ADD CONSTRAINT "operation_types_main_account_id_accounts_id_fk" FOREIGN KEY ("main_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operation_types" ADD CONSTRAINT "operation_types_main_fund_id_funds_id_fk" FOREIGN KEY ("main_fund_id") REFERENCES "public"."funds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "account_balances_account_currency_unique" ON "account_balances" USING btree ("account_id","currency_id");--> statement-breakpoint
CREATE UNIQUE INDEX "fund_balances_fund_currency_unique" ON "fund_balances" USING btree ("fund_id","currency_id");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_biz_code_unique" UNIQUE("business_id","code");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_biz_type_subtype_seq_unique" UNIQUE("business_id","account_type","sub_type_id","sequence_number");--> statement-breakpoint
ALTER TABLE "bank_types" ADD CONSTRAINT "bank_types_biz_key_unique" UNIQUE("business_id","sub_type_key");--> statement-breakpoint
ALTER TABLE "bank_types" ADD CONSTRAINT "bank_types_biz_seq_unique" UNIQUE("business_id","sequence_number");--> statement-breakpoint
ALTER TABLE "e_wallet_types" ADD CONSTRAINT "e_wallet_types_biz_key_unique" UNIQUE("business_id","sub_type_key");--> statement-breakpoint
ALTER TABLE "e_wallet_types" ADD CONSTRAINT "e_wallet_types_biz_seq_unique" UNIQUE("business_id","sequence_number");--> statement-breakpoint
ALTER TABLE "exchange_types" ADD CONSTRAINT "exchange_types_biz_key_unique" UNIQUE("business_id","sub_type_key");--> statement-breakpoint
ALTER TABLE "exchange_types" ADD CONSTRAINT "exchange_types_biz_seq_unique" UNIQUE("business_id","sequence_number");--> statement-breakpoint
ALTER TABLE "fund_types" ADD CONSTRAINT "fund_types_biz_key_unique" UNIQUE("business_id","sub_type_key");--> statement-breakpoint
ALTER TABLE "fund_types" ADD CONSTRAINT "fund_types_biz_seq_unique" UNIQUE("business_id","sequence_number");--> statement-breakpoint
ALTER TABLE "funds" ADD CONSTRAINT "funds_biz_code_unique" UNIQUE("business_id","code");--> statement-breakpoint
ALTER TABLE "funds" ADD CONSTRAINT "funds_biz_subtype_seq_unique" UNIQUE("business_id","sub_type_id","sequence_number");--> statement-breakpoint
ALTER TABLE "operation_types" ADD CONSTRAINT "operation_types_biz_code_unique" UNIQUE("business_id","code");--> statement-breakpoint
ALTER TABLE "operation_types" ADD CONSTRAINT "operation_types_biz_cat_seq_unique" UNIQUE("business_id","category_id","sequence_number");--> statement-breakpoint
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_biz_code_unique" UNIQUE("business_id","code");--> statement-breakpoint
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_biz_subtype_seq_unique" UNIQUE("business_id","sub_type_id","sequence_number");--> statement-breakpoint
-- تحويل القيم القديمة قبل تغيير الـ enum
ALTER TABLE "public"."accounts" ALTER COLUMN "account_type" SET DATA TYPE text;--> statement-breakpoint
UPDATE "public"."accounts" SET "account_type" = 'fund' WHERE "account_type" IN ('cash', 'intermediary', 'service');--> statement-breakpoint
DROP TYPE "public"."account_type";--> statement-breakpoint
CREATE TYPE "public"."account_type" AS ENUM('fund', 'bank', 'e_wallet', 'exchange', 'accounting', 'custody', 'warehouse', 'billing', 'budget', 'supplier', 'employee', 'partner', 'settlement', 'pending');--> statement-breakpoint
ALTER TABLE "public"."accounts" ALTER COLUMN "account_type" SET DATA TYPE "public"."account_type" USING "account_type"::"public"."account_type";