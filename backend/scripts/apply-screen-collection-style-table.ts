/**
 * يطبق فقط هجرة جدول screen_collection_style_config (إنشاء الجدول إن لم يكن موجوداً).
 * شغّل من مجلد backend: npx tsx scripts/apply-screen-collection-style-table.ts
 */
import 'dotenv/config';
import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';

async function main() {
  const sql = postgres(connectionString);
  const path = join(__dirname, '../drizzle/0002_screen_collection_style_config.sql');
  const content = readFileSync(path, 'utf-8');
  const statements = content
    .split(/--> statement-breakpoint\n?/)
    .map((s) => s.replace(/^[\s\n]*--[^\n]*\n?/gm, '').trim())
    .filter(Boolean);
  for (const st of statements) {
    if (!st) continue;
    try {
      await sql.unsafe(st);
      console.log('OK:', st.slice(0, 60) + '...');
    } catch (e: any) {
      if (e?.code === '42P07' && e?.message?.includes('already exists')) {
        console.log('الجدول موجود مسبقاً، تخطي إنشاء الجدول.');
      } else if (e?.code === '42710' && e?.message?.includes('duplicate_object')) {
        console.log('القيد موجود مسبقاً، تخطي.');
      } else {
        throw e;
      }
    }
  }
  await sql.end();
  console.log('تم تطبيق الهجرة بنجاح.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
