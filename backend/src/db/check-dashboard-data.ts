/**
 * التحقق من وجود الجداول والبيانات في قاعدة البيانات لعمل معيّن (مثلاً bizId=1).
 * التشغيل: pnpm exec tsx src/db/check-dashboard-data.ts
 */
import 'dotenv/config';
import { db } from './index.ts';
import {
  businesses,
  stations,
  employees,
  accounts,
  funds,
  suppliers,
  pendingAccounts,
  warehouses,
} from './schema/index.ts';
import { eq, sql } from 'drizzle-orm';

const BIZ_ID = parseInt(process.env.BIZ_ID || '1', 10);

async function main() {
  console.log(`\n🔍 التحقق من بيانات لوحة التحكم للعمل (business_id = ${BIZ_ID})...\n`);

  try {
    const [biz] = await db.select().from(businesses).where(eq(businesses.id, BIZ_ID));
    if (!biz) {
      console.log('❌ لا يوجد عمل بالمعرّف', BIZ_ID);
      process.exit(1);
    }
    console.log('✅ العمل:', biz.name, '(id=', biz.id, ')');

    const [stationsCount] = await db.select({ count: sql<number>`count(*)::int` }).from(stations).where(eq(stations.businessId, BIZ_ID));
    const [employeesCount] = await db.select({ count: sql<number>`count(*)::int` }).from(employees).where(eq(employees.businessId, BIZ_ID));
    const [accountsCount] = await db.select({ count: sql<number>`count(*)::int` }).from(accounts).where(eq(accounts.businessId, BIZ_ID));
    const [fundsCount] = await db.select({ count: sql<number>`count(*)::int` }).from(funds).where(eq(funds.businessId, BIZ_ID));
    const [suppliersCount] = await db.select({ count: sql<number>`count(*)::int` }).from(suppliers).where(eq(suppliers.businessId, BIZ_ID));
    const [pendingCount] = await db.select({ count: sql<number>`count(*)::int` }).from(pendingAccounts).where(eq(pendingAccounts.businessId, BIZ_ID));
    const [warehousesCount] = await db.select({ count: sql<number>`count(*)::int` }).from(warehouses).where(eq(warehouses.businessId, BIZ_ID));

    console.log('  المحطات (stations):        ', stationsCount?.count ?? 0);
    console.log('  الموظفين (employees):      ', employeesCount?.count ?? 0);
    console.log('  الحسابات (accounts):       ', accountsCount?.count ?? 0);
    console.log('  الصناديق (funds):          ', fundsCount?.count ?? 0);
    console.log('  الموردين (suppliers):      ', suppliersCount?.count ?? 0);
    console.log('  الحسابات المعلقة (pending): ', pendingCount?.count ?? 0);
    console.log('  المخازن (warehouses):      ', warehousesCount?.count ?? 0);

    const stationsRows = await db.select().from(stations).where(eq(stations.businessId, BIZ_ID)).limit(3);
    console.log('\n  عينة محطات (أول 3):', stationsRows.map((s) => ({ id: s.id, name: s.name, code: s.code })));

    console.log('\n✅ قاعدة البيانات تحتوي على البيانات المطلوبة للوحة التحكم.\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ خطأ:', err);
    process.exit(1);
  }
}

main();
