/**
 * حذف كل العمليات المتبقية: كل السندات والقيود المحاسبية وأسطرها.
 * التشغيل: من مجلد backend: npx tsx src/db/delete-all-operations.ts
 */
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { inArray } from 'drizzle-orm';
import postgres from 'postgres';
import * as schema from './schema/index.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function run() {
  console.log('جاري حذف كل العمليات المتبقية (سندات + قيود)...\n');

  const allVouchers = await db.select({ id: schema.vouchers.id }).from(schema.vouchers);
  const voucherIds = allVouchers.map((v) => v.id);

  const allJournal = await db.select({ id: schema.journalEntries.id }).from(schema.journalEntries);
  const journalIds = allJournal.map((j) => j.id);

  if (voucherIds.length === 0 && journalIds.length === 0) {
    console.log('لا توجد عمليات لحذفها.');
    process.exit(0);
  }

  if (voucherIds.length > 0) {
    const deletedWh = await db.delete(schema.workflowHistory).where(inArray(schema.workflowHistory.voucherId, voucherIds)).returning({ id: schema.workflowHistory.id });
    console.log('حذف workflow_history:', deletedWh.length);

    const updatedWo = await db
      .update(schema.warehouseOperations)
      .set({ relatedVoucherId: null })
      .where(inArray(schema.warehouseOperations.relatedVoucherId, voucherIds))
      .returning({ id: schema.warehouseOperations.id });
    console.log('إلغاء ربط warehouse_operations:', updatedWo.length);

    await db.update(schema.vouchers).set({ reversedVoucherId: null }).where(inArray(schema.vouchers.reversedVoucherId, voucherIds));
    console.log('إلغاء reversedVoucherId.');
  }

  if (journalIds.length > 0) {
    const deletedLines = await db.delete(schema.journalEntryLines).where(inArray(schema.journalEntryLines.journalEntryId, journalIds)).returning({ id: schema.journalEntryLines.id });
    console.log('حذف journal_entry_lines:', deletedLines.length);
  }

  const deletedJe = await db.delete(schema.journalEntries).returning({ id: schema.journalEntries.id });
  console.log('حذف journal_entries:', deletedJe.length);

  const deletedVouchers = await db.delete(schema.vouchers).returning({ id: schema.vouchers.id });
  console.log('حذف vouchers:', deletedVouchers.length);

  console.log('\nتم حذف كل العمليات بنجاح.');
  process.exit(0);
}

run().catch((err) => {
  console.error('خطأ:', err);
  process.exit(1);
});
