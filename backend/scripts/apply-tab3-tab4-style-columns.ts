/**
 * يضيف أعمدة اسم ولون وأيقونة للتبويب الثالث والرابع.
 * شغّل من مجلد backend: npx tsx scripts/apply-tab3-tab4-style-columns.ts
 */
import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';

const statements = [
  `ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab3_label" varchar(200) DEFAULT 'السجل' NOT NULL`,
  `ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab3_color" varchar(20) DEFAULT '#6366f1'`,
  `ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab3_icon" varchar(80)`,
  `ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab4_color" varchar(20) DEFAULT '#8b5cf6'`,
  `ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab4_icon" varchar(80)`,
];

async function main() {
  const sql = postgres(connectionString);
  for (const st of statements) {
    await sql.unsafe(st);
    console.log('OK:', st.slice(0, 75) + '...');
  }
  await sql.end();
  console.log('تمت إضافة أعمدة التبويب الثالث والرابع بنجاح.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
