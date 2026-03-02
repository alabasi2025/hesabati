CREATE TYPE "public"."voucher_reversal_status" AS ENUM('original', 'reversed', 'reversal');--> statement-breakpoint
CREATE TABLE "custom_screen_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"screen_id" integer NOT NULL,
	"tab1_label" varchar(200) DEFAULT 'تحصيل' NOT NULL,
	"tab1_icon" varchar(100) DEFAULT 'arrow_downward' NOT NULL,
	"tab1_color" varchar(20) DEFAULT '#22c55e' NOT NULL,
	"tab1_operation_type_ids" jsonb DEFAULT '[]'::jsonb,
	"tab2_label" varchar(200) DEFAULT 'توريد' NOT NULL,
	"tab2_icon" varchar(100) DEFAULT 'arrow_upward' NOT NULL,
	"tab2_color" varchar(20) DEFAULT '#ef4444' NOT NULL,
	"tab2_operation_type_ids" jsonb DEFAULT '[]'::jsonb,
	"history_label" varchar(200) DEFAULT 'السجل' NOT NULL,
	"accounts_section_label" varchar(200) DEFAULT 'الصناديق' NOT NULL,
	"account_ids" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "custom_screen_config_screen_id_unique" UNIQUE("screen_id")
);
--> statement-breakpoint
CREATE TABLE "exchange_rates" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"from_currency_id" integer NOT NULL,
	"to_currency_id" integer NOT NULL,
	"rate" numeric(15, 6) NOT NULL,
	"effective_date" date NOT NULL,
	"source" varchar(100) DEFAULT 'manual',
	"notes" text,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer NOT NULL,
	"resource" varchar(100) NOT NULL,
	"action" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"color" varchar(20) DEFAULT '#3b82f6',
	"max_voucher_amount" numeric(20, 2),
	"max_daily_amount" numeric(20, 2),
	"is_system" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"business_id" integer NOT NULL,
	"assigned_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "operation_type_id" integer;--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "reversal_status" varchar(20) DEFAULT 'original';--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "reversed_voucher_id" integer;--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "reversal_reason" text;--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "reversed_at" timestamp;--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "reversed_by" integer;--> statement-breakpoint
ALTER TABLE "custom_screen_config" ADD CONSTRAINT "custom_screen_config_screen_id_screen_templates_id_fk" FOREIGN KEY ("screen_id") REFERENCES "public"."screen_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_from_currency_id_currencies_id_fk" FOREIGN KEY ("from_currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_to_currency_id_currencies_id_fk" FOREIGN KEY ("to_currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_assigned_by_users_id_fk" FOREIGN KEY ("assigned_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_operation_type_id_operation_types_id_fk" FOREIGN KEY ("operation_type_id") REFERENCES "public"."operation_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_reversed_by_users_id_fk" FOREIGN KEY ("reversed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;