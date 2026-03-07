/**
 * فحص قالب عملية (بالاسم أو بالمعرف).
 * التشغيل: من مجلد backend: npx tsx src/db/inspect-template.ts
 */
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import * as schema from './schema/index.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

// فحص أول قالب نشط إن لم يُمرّر اسم أو معرف
const TEMPLATE_NAME_OR_ID: string | number | undefined = undefined; // أو 'قالب العباسي الافتراضي' أو 28

async function inspect() {
  let ot: typeof schema.operationTypes.$inferSelect | undefined;
  if (TEMPLATE_NAME_OR_ID !== undefined) {
    if (typeof TEMPLATE_NAME_OR_ID === 'number') {
      const rows = await db.select().from(schema.operationTypes).where(eq(schema.operationTypes.id, TEMPLATE_NAME_OR_ID));
      ot = rows[0];
    } else {
      const rows = await db.select().from(schema.operationTypes).where(eq(schema.operationTypes.name, TEMPLATE_NAME_OR_ID));
      ot = rows[0];
    }
  }
  if (!ot) {
    const active = await db.select().from(schema.operationTypes).where(eq(schema.operationTypes.isActive, true)).orderBy(schema.operationTypes.id).limit(1);
    ot = active[0];
  }
  if (!ot) {
    const anyOt = await db.select().from(schema.operationTypes).orderBy(schema.operationTypes.id).limit(1);
    ot = anyOt[0];
  }
  if (!ot) {
    console.log('لا يوجد أي قالب في القاعدة.');
    process.exit(1);
  }

  console.log('═══════════════════════════════════════════════════════════');
  console.log('قالب:', ot.name);
  console.log('═══════════════════════════════════════════════════════════');
  console.log('المعرف (id):', ot.id);
  console.log('العمل (businessId):', ot.businessId);
  console.log('التصنيف (category):', ot.category);
  console.log('الرمز (code):', ot.code);
  console.log('رقم تسلسلي (sequenceNumber):', ot.sequenceNumber);
  console.log('نوع السند (voucherType):', ot.voucherType);
  console.log('طريقة الدفع (paymentMethod):', ot.paymentMethod);
  console.log('حساب مصدر (sourceAccountId):', ot.sourceAccountId);
  console.log('صندوق مصدر (sourceFundId):', ot.sourceFundId);
  console.log('مخزن مصدر (sourceWarehouseId):', ot.sourceWarehouseId);
  console.log('حساب رئيسي (mainAccountId):', ot.mainAccountId);
  console.log('صندوق رئيسي (mainFundId):', ot.mainFundId);
  console.log('متعدد الأسطر (hasMultiLines):', ot.hasMultiLines);
  console.log('مرفق مطلوب (requiresAttachment):', ot.requiresAttachment);
  console.log('نشط (isActive):', ot.isActive);
  console.log('الوصف:', ot.description ?? '—');
  console.log('ملاحظات:', ot.notes ?? '—');

  // 2) الحسابات المرتبطة مع أسماء الحسابات
  const links = await db
    .select({
      otaId: schema.operationTypeAccounts.id,
      accountId: schema.operationTypeAccounts.accountId,
      employeeBillingAccountId: schema.operationTypeAccounts.employeeBillingAccountId,
      label: schema.operationTypeAccounts.label,
      permission: schema.operationTypeAccounts.permission,
      sortOrder: schema.operationTypeAccounts.sortOrder,
      accountName: schema.accounts.name,
      accountType: schema.accounts.accountType,
      billingLabel: schema.employeeBillingAccounts.label,
    })
    .from(schema.operationTypeAccounts)
    .leftJoin(schema.accounts, eq(schema.operationTypeAccounts.accountId, schema.accounts.id))
    .leftJoin(schema.employeeBillingAccounts, eq(schema.operationTypeAccounts.employeeBillingAccountId, schema.employeeBillingAccounts.id))
    .where(eq(schema.operationTypeAccounts.operationTypeId, ot.id))
    .orderBy(schema.operationTypeAccounts.sortOrder);

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('الحسابات المرتبطة بالقالب (operation_type_accounts)');
  console.log('═══════════════════════════════════════════════════════════');
  if (links.length === 0) {
    console.log('لا توجد حسابات مرتبطة.');
  } else {
    links.forEach((row, i) => {
      const source = row.accountId
        ? `حساب عادي: ${row.accountName ?? '—'} (id=${row.accountId}, نوع=${row.accountType ?? '—'})`
        : row.employeeBillingAccountId
          ? `حساب فوترة: ${row.billingLabel ?? '—'} (id=${row.employeeBillingAccountId})`
          : '⚠ لا حساب ولا حساب فوترة';
      console.log(`${i + 1}. [ota.id=${row.otaId}] ${row.label ?? '—'}`);
      console.log(`   المصدر: ${source}`);
      console.log(`   permission=${row.permission}, sortOrder=${row.sortOrder}`);
    });
  }

  // 3) التحقق: هل accountId يشير إلى حسابات من نوع billing؟
  const accountIds = links.map((l) => l.accountId).filter(Boolean) as number[];
  if (accountIds.length > 0) {
    const accountsInfo = await db
      .select({ id: schema.accounts.id, name: schema.accounts.name, accountType: schema.accounts.accountType })
      .from(schema.accounts)
      .where(eq(schema.accounts.businessId, ot.businessId));
    const linkedAccountTypes = accountsInfo.filter((a) => accountIds.includes(a.id));
    const billingLinked = linkedAccountTypes.filter((a) => a.accountType === 'billing');
    if (billingLinked.length > 0) {
      console.log('\n⚠ ملاحظة: بعض الحسابات المرتبطة من نوع "billing":', billingLinked.map((a) => a.name).join(', '));
    } else {
      console.log('\n✓ جميع الحسابات المرتبطة ليست من نوع billing (هي حسابات عادية مثل محافظ/بنوك).');
    }
  }

  // 4) عمليات مرتبطة بالقالب: سندات، قيود، عمليات مخزنية، إلخ
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('عمليات مرتبطة بالقالب (operationTypeId = ' + ot.id + ')');
  console.log('═══════════════════════════════════════════════════════════');

  const voucherCount = await db
    .select()
    .from(schema.vouchers)
    .where(eq(schema.vouchers.operationTypeId, ot.id));
  console.log('سندات (vouchers):', voucherCount.length, 'سند');
  if (voucherCount.length > 0) {
    const sample = voucherCount.slice(0, 5).map((v) => ({ id: v.id, voucherNumber: v.voucherNumber, amount: v.amount, date: v.voucherDate, status: v.status }));
    console.table(sample);
    if (voucherCount.length > 5) console.log('... و', voucherCount.length - 5, 'سنداً آخر');
  }

  const journalForOt = await db
    .select()
    .from(schema.journalEntries)
    .where(eq(schema.journalEntries.operationTypeId, ot.id));
  console.log('قيود محاسبية (journal_entries):', journalForOt.length, 'قيد');
  if (journalForOt.length > 0) {
    const sample = journalForOt.slice(0, 5).map((j) => ({ id: j.id, entryNumber: j.entryNumber, date: j.entryDate }));
    console.table(sample);
    if (journalForOt.length > 5) console.log('... و', journalForOt.length - 5, 'قيداً آخر');
  }

  const warehouseOps = await db
    .select()
    .from(schema.warehouseOperations)
    .where(eq(schema.warehouseOperations.operationTypeId, ot.id));
  console.log('عمليات مخزنية (warehouse_operations):', warehouseOps.length);

  const screenWidgets = await db
    .select()
    .from(schema.screenWidgetTemplates)
    .where(eq(schema.screenWidgetTemplates.operationTypeId, ot.id));
  console.log('عناصر شاشات مرتبطة (screen_widget_templates):', screenWidgets.length);

  process.exit(0);
}

inspect().catch((err) => {
  console.error('خطأ:', err);
  process.exit(1);
});
