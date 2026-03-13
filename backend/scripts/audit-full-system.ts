import "dotenv/config";
import { and, eq, isNull, isNotNull, count, sql } from "drizzle-orm";
import { db } from "../src/db/index.ts";
import {
  accounts,
  funds,
  suppliers,
  warehouses,
  businessPartners,
  employeeBillingAccounts,
  employees,
  accountSubNatures,
} from "../src/db/schema/index.ts";

interface FullAudit {
  entities: {
    totalAccounts: number;
    leafAccounts: number;
    mainAccounts: number;
    totalFunds: number;
    totalSuppliers: number;
    totalWarehouses: number;
    totalPartners: number;
    totalBillingAccounts: number;
  };
  accountsByType: Record<string, number>;
  missingLinks: {
    partnersWithoutAccount: number;
    partnerAccountsWithoutPartner: number;
    billingAccountsWithoutLink: number;
    billingLinksWithoutAccount: number;
  };
  apiConsistency: {
    banksReadFromAccounts: boolean;
    exchangesReadFromAccounts: boolean;
    walletsReadFromAccounts: boolean;
    fundsHaveSeparateTable: boolean;
    suppliersHaveSeparateTable: boolean;
    warehousesHaveSeparateTable: boolean;
  };
  dataIntegrity: {
    employeesWithoutDepartment: number;
    employeesLinkedToAccounts: number;
    accountsLinkedToEmployees: number;
  };
}

async function run() {
  console.log("🔍 فحص شامل لكل أجزاء النظام...\n");

  // 1. إحصائيات الكيانات
  const [totalAcc] = await db.select({ c: count() }).from(accounts);
  const [leafAcc] = await db.select({ c: count() }).from(accounts).where(eq(accounts.isLeafAccount, true));
  const [mainAcc] = await db.select({ c: count() }).from(accounts).where(eq(accounts.isLeafAccount, false));
  const [totalFnd] = await db.select({ c: count() }).from(funds);
  const [totalSup] = await db.select({ c: count() }).from(suppliers);
  const [totalWh] = await db.select({ c: count() }).from(warehouses);
  const [totalPrt] = await db.select({ c: count() }).from(businessPartners);
  const [totalBill] = await db.select({ c: count() }).from(employeeBillingAccounts);

  const entities = {
    totalAccounts: Number(totalAcc?.c || 0),
    leafAccounts: Number(leafAcc?.c || 0),
    mainAccounts: Number(mainAcc?.c || 0),
    totalFunds: Number(totalFnd?.c || 0),
    totalSuppliers: Number(totalSup?.c || 0),
    totalWarehouses: Number(totalWh?.c || 0),
    totalPartners: Number(totalPrt?.c || 0),
    totalBillingAccounts: Number(totalBill?.c || 0),
  };

  console.log("📊 الكيانات:");
  console.log(JSON.stringify(entities, null, 2));

  // 2. توزيع الحسابات حسب النوع
  const accountTypeDistribution = await db.execute(sql`
    SELECT account_type, COUNT(*) as c
    FROM accounts
    WHERE is_leaf_account = true
    GROUP BY account_type
    ORDER BY c DESC
  `);
  const accountsByType: Record<string, number> = {};
  for (const row of (accountTypeDistribution as any).rows || []) {
    accountsByType[row.account_type || 'null'] = Number(row.c);
  }

  console.log("\n📋 توزيع الحسابات الفرعية حسب النوع:");
  console.log(JSON.stringify(accountsByType, null, 2));

  // 3. روابط الشركاء
  const [partnersNoAcc] = await db.select({ c: count() }).from(businessPartners).where(isNull(businessPartners.accountId));
  const [partnerAccsNoPartner] = await db
    .select({ c: count() })
    .from(accounts)
    .leftJoin(businessPartners, eq(businessPartners.accountId, accounts.id))
    .where(and(eq(accounts.accountType, "partner" as any), eq(accounts.isLeafAccount, true), isNull(businessPartners.id)));

  const [billingNoLink] = await db.select({ c: count() }).from(employeeBillingAccounts).where(isNull(employeeBillingAccounts.accountId));
  const [billingLinksNoAcc] = await db
    .select({ c: count() })
    .from(employeeBillingAccounts)
    .where(isNotNull(employeeBillingAccounts.accountId))
    .leftJoin(accounts, eq(accounts.id, employeeBillingAccounts.accountId))
    .where(isNull(accounts.id));

  const missingLinks = {
    partnersWithoutAccount: Number(partnersNoAcc?.c || 0),
    partnerAccountsWithoutPartner: Number(partnerAccsNoPartner?.c || 0),
    billingAccountsWithoutLink: Number(billingNoLink?.c || 0),
    billingLinksWithoutAccount: Number(billingLinksNoAcc?.c || 0),
  };

  console.log("\n🔗 روابط إضافية:");
  console.log(JSON.stringify(missingLinks, null, 2));

  // 4. اتساق الـ API
  const apiConsistency = {
    banksReadFromAccounts: true, // لا يوجد جدول banks منفصل
    exchangesReadFromAccounts: true, // لا يوجد جدول exchanges منفصل
    walletsReadFromAccounts: true, // لا يوجد جدول wallets منفصل
    fundsHaveSeparateTable: true, // يوجد جدول funds
    suppliersHaveSeparateTable: true, // يوجد جدول suppliers
    warehousesHaveSeparateTable: true, // يوجد جدول warehouses
  };

  console.log("\n🔧 اتساق الـ API:");
  console.log(JSON.stringify(apiConsistency, null, 2));

  // 5. سلامة بيانات الموظفين
  const [empsNoDept] = await db.select({ c: count() }).from(employees).where(isNull(employees.departmentId));
  const [empsWithAcc] = await db
    .select({ c: count() })
    .from(employees)
    .leftJoin(accounts, eq(accounts.linkedEmployeeId, employees.id))
    .where(isNotNull(accounts.id));
  const [accsWithEmp] = await db
    .select({ c: count() })
    .from(accounts)
    .where(and(eq(accounts.accountType, "employee" as any), isNotNull(accounts.linkedEmployeeId)));

  const dataIntegrity = {
    employeesWithoutDepartment: Number(empsNoDept?.c || 0),
    employeesLinkedToAccounts: Number(empsWithAcc?.c || 0),
    accountsLinkedToEmployees: Number(accsWithEmp?.c || 0),
  };

  console.log("\n👥 بيانات الموظفين:");
  console.log(JSON.stringify(dataIntegrity, null, 2));

  // 6. التحقق من الحسابات الفرعية بدون طبيعة
  const accountsWithoutNature = await db.execute(sql`
    SELECT account_type, COUNT(*) as c
    FROM accounts
    WHERE is_leaf_account = true
      AND account_sub_nature_id IS NULL
    GROUP BY account_type
  `);
  
  const withoutNatureByType: Record<string, number> = {};
  for (const row of (accountsWithoutNature as any).rows || []) {
    withoutNatureByType[row.account_type || 'null'] = Number(row.c);
  }

  if (Object.keys(withoutNatureByType).length > 0) {
    console.log("\n⚠️ حسابات فرعية بدون طبيعة:");
    console.log(JSON.stringify(withoutNatureByType, null, 2));
  }

  // الخلاصة
  const totalIssues =
    Object.values(missingLinks).reduce((a, b) => a + b, 0) +
    Object.values(withoutNatureByType).reduce((a, b) => a + b, 0) +
    (dataIntegrity.employeesWithoutDepartment > 0 ? 1 : 0);

  console.log(`\n${"=".repeat(70)}`);
  if (totalIssues === 0) {
    console.log("✅ كل أجزاء النظام سليمة - لا توجد مشاكل تطابق أو ربط!");
  } else {
    console.log(`⚠️ إجمالي المشاكل: ${totalIssues}`);
    if (missingLinks.partnersWithoutAccount > 0)
      console.log(`   - ${missingLinks.partnersWithoutAccount} شريك بدون حساب`);
    if (missingLinks.partnerAccountsWithoutPartner > 0)
      console.log(`   - ${missingLinks.partnerAccountsWithoutPartner} حساب شريك بدون شريك`);
    if (missingLinks.billingAccountsWithoutLink > 0)
      console.log(`   - ${missingLinks.billingAccountsWithoutLink} حساب فوترة بدون ربط`);
    if (missingLinks.billingLinksWithoutAccount > 0)
      console.log(`   - ${missingLinks.billingLinksWithoutAccount} رابط فوترة بحساب محذوف`);
    if (dataIntegrity.employeesWithoutDepartment > 0)
      console.log(`   - ${dataIntegrity.employeesWithoutDepartment} موظف بدون قسم`);
    if (Object.keys(withoutNatureByType).length > 0)
      console.log(`   - حسابات فرعية بدون طبيعة: ${JSON.stringify(withoutNatureByType)}`);
  }
  console.log(`${"=".repeat(70)}\n`);

  // معلومات إضافية
  console.log("ℹ️ ملاحظات:");
  console.log("- البنوك/الصرافين/المحافظ تقرأ من accounts مباشرة (لا توجد جداول منفصلة)");
  console.log("- الصناديق/الموردين/المخازن لها جداول منفصلة مرتبطة بـ accounts");
  console.log("- الشركاء لهم جدول منفصل مرتبط بـ accounts");
  console.log("- حسابات الفوترة (employeeBillingAccounts) مرتبطة بـ accounts");
}

try {
  await run();
} catch (error) {
  console.error("❌ فشل الفحص الشامل:", error);
  process.exit(1);
}
