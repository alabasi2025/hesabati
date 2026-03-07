/**
 * حذف كل العمليات المرتبطة بقالب "تحصيل يومي الدهمية" (operationTypeId = 25):
 * - سندات (vouchers) والجداول التابعة
 * - قيود محاسبية (journal_entries) وأسطرها
 * التشغيل: من مجلد backend: npx tsx src/db/delete-template-operations.ts
 */
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, inArray } from 'drizzle-orm';
import postgres from 'postgres';
import * as schema from './schema/index.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

const OPERATION_TYPE_ID = 25; // تحصيل يومي الدهمية

async function run() {
  console.log('جاري حذف العمليات المرتبطة بالقالب id =', OPERATION_TYPE_ID, '...\n');

  const vouchersToDelete = await db
    .select({ id: schema.vouchers.id })
    .from(schema.vouchers)
    .where(eq(schema.vouchers.operationTypeId, OPERATION_TYPE_ID));
  const voucherIds = vouchersToDelete.map((v) => v.id);

  const journalEntriesToDelete = await db
    .select({ id: schema.journalEntries.id })
    .from(schema.journalEntries)
    .where(eq(schema.journalEntries.operationTypeId, OPERATION_TYPE_ID));
  const journalIds = journalEntriesToDelete.map((j) => j.id);

  if (voucherIds.length === 0 && journalIds.length === 0) {
    console.log('لا توجد عمليات مرتبطة بالقالب.');
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
    console.log('إلغاء ربط warehouse_operations بالسندات:', updatedWo.length);

    await db.update(schema.vouchers).set({ reversedVoucherId: null }).where(inArray(schema.vouchers.reversedVoucherId, voucherIds));
    console.log('إلغاء reversedVoucherId من السندات الأخرى.');
  }

  if (journalIds.length > 0) {
    const deletedLines = await db.delete(schema.journalEntryLines).where(inArray(schema.journalEntryLines.journalEntryId, journalIds)).returning({ id: schema.journalEntryLines.id });
    console.log('حذف journal_entry_lines:', deletedLines.length);
  }

  const deletedJe = await db.delete(schema.journalEntries).where(eq(schema.journalEntries.operationTypeId, OPERATION_TYPE_ID)).returning({ id: schema.journalEntries.id });
  console.log('حذف journal_entries:', deletedJe.length);

  const deletedVouchers = await db.delete(schema.vouchers).where(eq(schema.vouchers.operationTypeId, OPERATION_TYPE_ID)).returning({ id: schema.vouchers.id });
  console.log('حذف vouchers:', deletedVouchers.length);

  console.log('\nتم الحذف بنجاح.');
  process.exit(0);
}

run().catch((err) => {
  console.error('خطأ:', err);
  process.exit(1);
});
