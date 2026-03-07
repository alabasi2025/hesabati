/**
 * فحص العمليات التي تمت في النظام (سندات + قيود)
 * تشغيل: npx tsx src/db/check-operations.ts
 */
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, desc, count } from 'drizzle-orm';
import postgres from 'postgres';
import * as schema from './schema/index.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:774424555@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

const VOUCHER_TYPE_LABELS: Record<string, string> = {
  receipt: 'قبض',
  payment: 'صرف',
  transfer: 'تحويل',
};

function getVoucherTypeLabel(type: string | null | undefined): string {
  return (type && VOUCHER_TYPE_LABELS[type]) ?? type ?? '';
}

async function checkOperations() {
  console.log('📊 فحص العمليات في النظام...\n');

  const bizList = await db.select({ id: schema.businesses.id, name: schema.businesses.name }).from(schema.businesses).orderBy(schema.businesses.sortOrder);

  for (const biz of bizList) {
    const bizId = biz.id;
    console.log(`\n━━━ ${biz.name} (العمل #${bizId}) ━━━`);

    // السندات حسب النوع
    const byType = await db
      .select({
        type: schema.vouchers.voucherType,
        cnt: count(),
      })
      .from(schema.vouchers)
      .where(eq(schema.vouchers.businessId, bizId))
      .groupBy(schema.vouchers.voucherType);

    const receiptCount = byType.find((r) => r.type === 'receipt')?.cnt ?? 0;
    const paymentCount = byType.find((r) => r.type === 'payment')?.cnt ?? 0;
    const transferCount = byType.find((r) => r.type === 'transfer')?.cnt ?? 0;
    const otherCount = byType.filter((r) => !['receipt', 'payment', 'transfer'].includes(r.type)).reduce((s, r) => s + Number(r.cnt), 0);
    const totalVouchers = receiptCount + paymentCount + transferCount + otherCount;

    console.log('  السندات:');
    console.log(`    سندات قبض: ${receiptCount}`);
    console.log(`    سندات صرف: ${paymentCount}`);
    console.log(`    تحويلات:   ${transferCount}`);
    if (otherCount > 0) console.log(`    أخرى:       ${otherCount}`);
    console.log(`    المجموع:   ${totalVouchers}`);

    // القيود المحاسبية
    const jeCount = await db
      .select({ cnt: count() })
      .from(schema.journalEntries)
      .where(eq(schema.journalEntries.businessId, bizId));
    const totalJournal = Number(jeCount[0]?.cnt ?? 0);
    console.log(`  القيود المحاسبية: ${totalJournal}`);

    // آخر 5 سندات
    const lastVouchers = await db
      .select({
        id: schema.vouchers.id,
        voucherType: schema.vouchers.voucherType,
        voucherNumber: schema.vouchers.voucherNumber,
        amount: schema.vouchers.amount,
        status: schema.vouchers.status,
        createdAt: schema.vouchers.createdAt,
      })
      .from(schema.vouchers)
      .where(eq(schema.vouchers.businessId, bizId))
      .orderBy(desc(schema.vouchers.createdAt))
      .limit(5);

    if (lastVouchers.length > 0) {
      console.log('  آخر 5 سندات:');
      for (const v of lastVouchers) {
        const date = v.createdAt ? new Date(v.createdAt).toLocaleDateString('ar-YE') : '-';
        const typeLabel = getVoucherTypeLabel(v.voucherType);
        console.log(`    #${v.id} | ${v.voucherNumber ?? '-'} | ${typeLabel} | ${v.amount ?? 0} | ${v.status ?? '-'} | ${date}`);
      }
    } else {
      console.log('  آخر سندات: لا توجد سندات.');
    }
  }

  // إجمالي عام
  const totalV = await db.select({ cnt: count() }).from(schema.vouchers);
  const totalJ = await db.select({ cnt: count() }).from(schema.journalEntries);
  console.log('\n━━━ إجمالي النظام ━━━');
  console.log(`  إجمالي السندات: ${totalV[0]?.cnt ?? 0}`);
  console.log(`  إجمالي القيود:  ${totalJ[0]?.cnt ?? 0}`);
  console.log('\n✅ انتهى الفحص.');
  process.exit(0);
}

try {
  await checkOperations();
} catch (err: unknown) {
  console.error('❌ خطأ:', err instanceof Error ? err.message : String(err));
  process.exit(1);
}
