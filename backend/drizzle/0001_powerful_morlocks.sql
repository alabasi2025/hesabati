CREATE TABLE "screen_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"screen_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"permission" varchar(20) DEFAULT 'view' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "screen_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"icon" varchar(50) DEFAULT 'dashboard',
	"color" varchar(20) DEFAULT '#3b82f6',
	"layout_config" jsonb DEFAULT '{}'::jsonb,
	"template_key" varchar(50),
	"is_system" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "screen_widget_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"widget_id" integer NOT NULL,
	"account_id" integer NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "screen_widget_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"widget_id" integer NOT NULL,
	"operation_type_id" integer NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "screen_widgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"screen_id" integer NOT NULL,
	"widget_type" varchar(50) NOT NULL,
	"title" varchar(200) NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb,
	"position_x" integer DEFAULT 0 NOT NULL,
	"position_y" integer DEFAULT 0 NOT NULL,
	"width" integer DEFAULT 4 NOT NULL,
	"height" integer DEFAULT 3 NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_sidebar_config" ADD COLUMN "permission" varchar(20) DEFAULT 'view' NOT NULL;--> statement-breakpoint
ALTER TABLE "screen_permissions" ADD CONSTRAINT "screen_permissions_screen_id_screen_templates_id_fk" FOREIGN KEY ("screen_id") REFERENCES "public"."screen_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screen_permissions" ADD CONSTRAINT "screen_permissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screen_templates" ADD CONSTRAINT "screen_templates_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screen_templates" ADD CONSTRAINT "screen_templates_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screen_widget_accounts" ADD CONSTRAINT "screen_widget_accounts_widget_id_screen_widgets_id_fk" FOREIGN KEY ("widget_id") REFERENCES "public"."screen_widgets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screen_widget_accounts" ADD CONSTRAINT "screen_widget_accounts_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screen_widget_templates" ADD CONSTRAINT "screen_widget_templates_widget_id_screen_widgets_id_fk" FOREIGN KEY ("widget_id") REFERENCES "public"."screen_widgets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screen_widget_templates" ADD CONSTRAINT "screen_widget_templates_operation_type_id_operation_types_id_fk" FOREIGN KEY ("operation_type_id") REFERENCES "public"."operation_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "screen_widgets" ADD CONSTRAINT "screen_widgets_screen_id_screen_templates_id_fk" FOREIGN KEY ("screen_id") REFERENCES "public"."screen_templates"("id") ON DELETE no action ON UPDATE no action;