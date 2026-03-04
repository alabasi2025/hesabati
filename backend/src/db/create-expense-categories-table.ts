/**
 * إنشاء جدول expense_categories إذا لم يكن موجوداً
 * تشغيل: npx tsx src/db/create-expense-categories-table.ts
 */
import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';
const sql = postgres(connectionString);

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS expense_categories (
  id serial PRIMARY KEY,
  business_id integer NOT NULL REFERENCES businesses(id),
  name varchar(200) NOT NULL,
  description text,
  icon varchar(50) DEFAULT 'receipt_long',
  color varchar(20) DEFAULT '#3b82f6',
  sort_order integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
`;

async function main() {
  try {
    await sql.unsafe(CREATE_TABLE);
    console.log('✅ تم إنشاء جدول expense_categories بنجاح (أو كان موجوداً مسبقاً).');
  } catch (e) {
    console.error('❌ خطأ:', e);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
