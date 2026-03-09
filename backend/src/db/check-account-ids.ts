/**
 * فحص الحسابات: أرقام id متكررة بين المصادر أو ناقصة
 * عند استدعاء getAllAccounts?all=true نُدمج: accounts + funds + employee_billing_accounts
 * كل جدول له مساحة id مستقلة، فمثلاً id=1 قد يظهر في الثلاثة.
 * هذا السكربت يوضح أي أرقام مكررة وأي سجلات بدون id صالح.
 *
 * التشغيل: من مجلد backend: npx tsx src/db/check-account-ids.ts [businessId]
 * بدون businessId يفحص كل الأعمال.
 */
import 'dotenv/config';
import { db } from './index.ts';
import { eq, inArray, sql } from 'drizzle-orm';
import {
  accounts,
  funds,
  employeeBillingAccounts,
  employees,
  businesses,
} from './schema/index.ts';

type Source = 'accounts' | 'funds' | 'billing';

interface Item {
  id: number;
  source: Source;
  name: string;
  businessId: number;
}

async function run(bizId?: number) {
  const businessIds = bizId
    ? [bizId]
    : (await db.select({ id: businesses.id }).from(businesses)).map((b) => b.id);

  if (businessIds.length === 0) {
    console.log('لا توجد أعمال في قاعدة البيانات.');
    return;
  }

  for (const bid of businessIds) {
    console.log('\n========== العمل (business_id)', bid, '==========\n');

    const accRows = await db
      .select({ id: accounts.id, name: accounts.name, accountType: accounts.accountType })
      .from(accounts)
      .where(eq(accounts.businessId, bid));
    const fundRows = await db
      .select({ id: funds.id, name: funds.name, fundType: funds.fundType })
      .from(funds)
      .where(eq(funds.businessId, bid));
    const empIds = await db
      .select({ id: employees.id })
      .from(employees)
      .where(eq(employees.businessId, bid));
    const empIdList = empIds.map((e) => e.id);
    const billingRows =
      empIdList.length > 0
        ? await db
            .select({
              id: employeeBillingAccounts.id,
              label: employeeBillingAccounts.label,
            })
            .from(employeeBillingAccounts)
            .where(inArray(employeeBillingAccounts.employeeId, empIdList))
        : [];

    const items: Item[] = [
      ...accRows.map((r) => ({
        id: r.id,
        source: 'accounts' as Source,
        name: `${r.name} (${r.accountType})`,
        businessId: bid,
      })),
      ...fundRows.map((r) => ({
        id: r.id,
        source: 'funds' as Source,
        name: `${r.name} (${r.fundType})`,
        businessId: bid,
      })),
      ...billingRows.map((r) => ({
        id: r.id,
        source: 'billing' as Source,
        name: r.label,
        businessId: bid,
      })),
    ];

    // سجلات بدون id صالح (نادر مع serial)
    const invalid = items.filter((x) => x.id == null || Number.isNaN(Number(x.id)));
    if (invalid.length > 0) {
      console.log('⚠ سجلات بدون id صالح:', invalid.length);
      console.table(invalid);
    } else {
      console.log('✓ كل السجلات لديها id صالح.');
    }

    // تجميع حسب قيمة id لمعرفة التكرار بين المصادر
    const byId = new Map<number, Item[]>();
    for (const it of items) {
      const n = Number(it.id);
      if (Number.isNaN(n)) continue;
      if (!byId.has(n)) byId.set(n, []);
      byId.get(n)!.push(it);
    }

    const duplicated = Array.from(byId.entries()).filter(([, list]) => list.length > 1);
    if (duplicated.length === 0) {
      console.log('✓ لا توجد أرقام id مكررة بين المصادر (accounts / funds / billing).');
    } else {
      console.log('\n❌ أرقام id مكررة (نفس الرقم في أكثر من مصدر):');
      for (const [idVal, list] of duplicated) {
        console.log(`\n  id = ${idVal}:`);
        for (const it of list) {
          console.log(`    - [${it.source}] ${it.name}`);
        }
      }
      console.log('\nملخص: عند دمج القوائم في واجهة واحدة يجب استخدام مفتاح مركب (مثل المصدر + id) لتفادي الخلط.');
    }

    // إحصائيات
    console.log('\nإحصائيات:');
    console.log('  حسابات (accounts):', accRows.length);
    console.log('  صناديق (funds):', fundRows.length);
    console.log('  حسابات فوترة (billing):', billingRows.length);
    console.log('  المجموع المدمج:', items.length);
  }
}

const bizArg = process.argv[2];
const bid = bizArg ? parseInt(bizArg, 10) : undefined;
if (bizArg && Number.isNaN(bid!)) {
  console.error('استخدام: npx tsx src/db/check-account-ids.ts [businessId]');
  process.exit(1);
}
run(bid)
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
