/**
 * استعلام سريع لعرض محتويات قاعدة البيانات (قوالب العمليات وغيرها).
 * التشغيل: من مجلد backend: npx tsx src/db/inspect-db.ts
 */
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function inspect() {
  console.log('=== الأعمال (businesses) ===');
  const businesses = await db.select({ id: schema.businesses.id, name: schema.businesses.name }).from(schema.businesses);
  console.table(businesses);

  console.log('\n=== قوالب العمليات (operation_types) ===');
  const operationTypes = await db
    .select({
      id: schema.operationTypes.id,
      businessId: schema.operationTypes.businessId,
      name: schema.operationTypes.name,
      category: schema.operationTypes.category,
      voucherType: schema.operationTypes.voucherType,
      code: schema.operationTypes.code,
      isActive: schema.operationTypes.isActive,
    })
    .from(schema.operationTypes)
    .orderBy(schema.operationTypes.businessId, schema.operationTypes.sortOrder);
  if (operationTypes.length === 0) {
    console.log('(لا يوجد أي قالب — الجدول فارغ)');
  } else {
    console.table(operationTypes);
    console.log('قوالب العمليات (نص خام للتشفير):');
    operationTypes.forEach((ot) => console.log(JSON.stringify({ id: ot.id, name: ot.name, category: ot.category, code: ot.code })));
  }

  console.log('\n=== الحسابات المرتبطة بالقالب (operation_type_accounts) ===');
  const ota = await db
    .select({
      id: schema.operationTypeAccounts.id,
      operationTypeId: schema.operationTypeAccounts.operationTypeId,
      accountId: schema.operationTypeAccounts.accountId,
      employeeBillingAccountId: schema.operationTypeAccounts.employeeBillingAccountId,
      label: schema.operationTypeAccounts.label,
    })
    .from(schema.operationTypeAccounts);
  if (ota.length === 0) {
    console.log('(لا توجد صفوف)');
  } else {
    console.table(ota);
  }

  console.log('\n=== تصنيفات السندات (voucher_categories) — عينة ===');
  const vc = await db
    .select({ id: schema.voucherCategories.id, businessId: schema.voucherCategories.businessId, name: schema.voucherCategories.name, type: schema.voucherCategories.type })
    .from(schema.voucherCategories)
    .limit(10);
  console.table(vc);

  console.log('\n=== ما تبقى من عمليات (عدّ فقط) ===');
  const allVouchers = await db.select({ id: schema.vouchers.id }).from(schema.vouchers);
  const allJournal = await db.select({ id: schema.journalEntries.id }).from(schema.journalEntries);
  const allJELines = await db.select({ id: schema.journalEntryLines.id }).from(schema.journalEntryLines);
  const allWhOps = await db.select({ id: schema.warehouseOperations.id }).from(schema.warehouseOperations);
  console.log('سندات (vouchers):', allVouchers.length);
  console.log('قيود محاسبية (journal_entries):', allJournal.length);
  console.log('أسطر القيود (journal_entry_lines):', allJELines.length);
  console.log('عمليات مخزنية (warehouse_operations):', allWhOps.length);

  process.exit(0);
}

inspect().catch((err) => {
  console.error('خطأ:', err);
  process.exit(1);
});
