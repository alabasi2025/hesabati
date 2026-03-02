/**
 * تشغيل إنشاء تتابعات سندات التحصيل والتوريد فقط (بدون تشغيل كل الترحيلات).
 * يشغّل مرة واحدة: pnpm run db:run-voucher-sequences
 */
import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';
const sql = postgres(connectionString);

async function main() {
  console.log('إنشاء تتابعات voucher_collection_seq و voucher_delivery_seq...');
  await sql.unsafe('CREATE SEQUENCE IF NOT EXISTS voucher_collection_seq START 1');
  await sql.unsafe('CREATE SEQUENCE IF NOT EXISTS voucher_delivery_seq START 1');
  console.log('تم بنجاح.');
  await sql.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
