-- جدول إعداد الشاشة الثابتة (لون وأيقونة التبويبين، قوالب، حسابات)
CREATE TABLE IF NOT EXISTS "screen_collection_style_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"screen_id" integer NOT NULL UNIQUE,
	"tab1_label" varchar(200) DEFAULT 'تحصيل' NOT NULL,
	"tab1_color" varchar(20) DEFAULT '#0d9488',
	"tab1_icon" varchar(80),
	"tab1_operation_type_ids" jsonb DEFAULT '[]'::jsonb,
	"tab2_label" varchar(200) DEFAULT 'توريد' NOT NULL,
	"tab2_color" varchar(20) DEFAULT '#3b82f6',
	"tab2_icon" varchar(80),
	"tab2_operation_type_ids" jsonb DEFAULT '[]'::jsonb,
	"accounts_section_label" varchar(200) DEFAULT 'الصناديق' NOT NULL,
	"account_ids" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "screen_collection_style_config" ADD CONSTRAINT "screen_collection_style_config_screen_id_screen_templates_id_fk" FOREIGN KEY ("screen_id") REFERENCES "public"."screen_templates"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
