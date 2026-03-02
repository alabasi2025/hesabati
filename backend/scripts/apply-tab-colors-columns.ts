/**
 * يضيف أعمدة اللون والأيقونة لجدول screen_collection_style_config إن لم تكن موجودة.
 * شغّل من مجلد backend: npx tsx scripts/apply-tab-colors-columns.ts
 */
import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';

const statements = [
  `ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab1_color" varchar(20) DEFAULT '#0d9488'`,
  `ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab1_icon" varchar(80)`,
  `ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab2_color" varchar(20) DEFAULT '#3b82f6'`,
  `ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab2_icon" varchar(80)`,
];

async function main() {
  const sql = postgres(connectionString);
  for (const st of statements) {
    await sql.unsafe(st);
    console.log('OK:', st.slice(0, 70) + '...');
  }
  await sql.end();
  console.log('تمت إضافة الأعمدة بنجاح.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
