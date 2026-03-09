import { db } from "../src/db/index.ts";
import { sql } from "drizzle-orm";

const statements: string[] = [
  `CREATE TABLE IF NOT EXISTS "departments" (
    "id" serial PRIMARY KEY NOT NULL,
    "business_id" integer NOT NULL REFERENCES "businesses"("id"),
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
    "updated_at" timestamp DEFAULT now() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS "job_titles" (
    "id" serial PRIMARY KEY NOT NULL,
    "business_id" integer NOT NULL REFERENCES "businesses"("id"),
    "name" varchar(200) NOT NULL,
    "sequence_number" integer,
    "description" text,
    "icon" varchar(100) DEFAULT 'badge',
    "color" varchar(50) DEFAULT '#8b5cf6',
    "sort_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
  )`,
  `ALTER TABLE "employees" ADD COLUMN IF NOT EXISTS "department_id" integer`,
  `ALTER TABLE "employees" ADD COLUMN IF NOT EXISTS "job_title_id" integer`,
  `ALTER TABLE "employees" ADD COLUMN IF NOT EXISTS "sequence_number" integer`,
  `ALTER TABLE "employees" ADD COLUMN IF NOT EXISTS "code" varchar(30)`,
  `ALTER TABLE "employees" ADD COLUMN IF NOT EXISTS "updated_at" timestamp DEFAULT now() NOT NULL`,
  `DO $$ BEGIN
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.table_constraints
       WHERE table_schema = 'public' AND table_name = 'departments'
         AND constraint_name = 'departments_biz_code_unique'
     ) THEN
       ALTER TABLE "departments"
         ADD CONSTRAINT "departments_biz_code_unique" UNIQUE ("business_id","code");
     END IF;
   END $$;`,
  `DO $$ BEGIN
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.table_constraints
       WHERE table_schema = 'public' AND table_name = 'departments'
         AND constraint_name = 'departments_biz_seq_unique'
     ) THEN
       ALTER TABLE "departments"
         ADD CONSTRAINT "departments_biz_seq_unique" UNIQUE ("business_id","sequence_number");
     END IF;
   END $$;`,
  `DO $$ BEGIN
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.table_constraints
       WHERE table_schema = 'public' AND table_name = 'job_titles'
         AND constraint_name = 'job_titles_biz_seq_unique'
     ) THEN
       ALTER TABLE "job_titles"
         ADD CONSTRAINT "job_titles_biz_seq_unique" UNIQUE ("business_id","sequence_number");
     END IF;
   END $$;`,
];

async function main() {
  for (const statement of statements) {
    await db.execute(sql.raw(statement));
  }
  console.log("Employee schema compatibility ensured.");
}

try {
  await main();
  process.exit(0);
} catch (err) {
  console.error("Failed ensuring employee schema compatibility:", err);
  process.exit(1);
}
