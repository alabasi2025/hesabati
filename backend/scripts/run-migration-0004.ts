/**
 * تشغيل migration 0004 فقط (تحويل الفوترة لديناميكية).
 * الاستخدام: من مجلد backend: npx tsx scripts/run-migration-0004.ts
 */
import 'dotenv/config';
import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join } from 'path';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:774424555@localhost:5432/hesabati';

async function run() {
  const sql = postgres(connectionString);
  const path = join(process.cwd(), 'drizzle', '0004_billing_dynamic_and_custody_filter.sql');
  const content = readFileSync(path, 'utf-8');
  const statements = content
    .split(/-->\s*statement-breakpoint\s*/)
    .map((s) => s.replace(/--[^\n]*/g, '').trim())
    .filter((s) => s.length > 0);

  console.log(`تشغيل ${statements.length} جملة من migration 0004...`);
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    if (!stmt) continue;
    try {
      await sql.unsafe(stmt);
      console.log(`  ✓ ${i + 1}/${statements.length}`);
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      if (e.code === '42701' && e.message?.includes('already exists')) {
        console.log(`  ⏭ ${i + 1}/${statements.length} (العمود/القيد موجود مسبقاً)`);
      } else if (e.code === '42P07' && e.message?.includes('already exists')) {
        console.log(`  ⏭ ${i + 1}/${statements.length} (موجود مسبقاً)`);
      } else {
        console.error(`  ✗ ${i + 1}/${statements.length}:`, e.message);
        throw err;
      }
    }
  }
  console.log('تم تطبيق migration 0004 بنجاح.');
  await sql.end();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
