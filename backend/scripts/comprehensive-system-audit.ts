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
  fundTypes,
  bankTypes,
  exchangeTypes,
  eWalletTypes,
  supplierTypes,
  warehouseTypes,
  accountSubNatures,
} from "../src/db/schema/index.ts";

interface AuditReport {
  links: {
    fundsWithoutAccount: number;
    accountsWithoutFund: number;
    suppliersWithoutAccount: number;
    accountsWithoutSupplier: number;
    warehousesWithoutAccount: number;
    accountsWithoutWarehouse: number;
    partnersWithoutAccount: number;
    billingWithoutAccount: number;
  };
  subTypeSync: {
    fundsMismatch: number;
    suppliersMismatch: number;
    warehousesMismatch: number;
    fundsNullSubType: number;
    suppliersNullSubType: number;
    warehousesNullSubType: number;
    banksNullSubType: number;
    exchangesNullSubType: number;
    walletsNullSubType: number;
  };
  names: {
    fundNameMismatch: number;
    supplierNameMismatch: number;
    warehouseNameMismatch: number;
  };
  types: {
    missingFundTypes: number;
    missingBankTypes: number;
    missingExchangeTypes: number;
    missingWalletTypes: number;
    missingSupplierTypes: number;
    missingWarehouseTypes: number;
  };
  subNatures: {
    accountsMissingNature: number;
    accountsWithInvalidNature: number;
  };
}

async function checkLinks(): Promise<AuditReport["links"]> {
  const [fundsNoAcc] = await db.select({ c: count() }).from(funds).where(isNull(funds.accountId));
  const [accsNoFund] = await db
    .select({ c: count() })
    .from(accounts)
    .leftJoin(funds, eq(funds.accountId, accounts.id))
    .where(and(eq(accounts.accountType, "fund" as any), eq(accounts.isLeafAccount, true), isNull(funds.id)));

  const [suppliersNoAcc] = await db.select({ c: count() }).from(suppliers).where(isNull(suppliers.accountId));
  const [accsNoSupplier] = await db
    .select({ c: count() })
    .from(accounts)
    .leftJoin(suppliers, eq(suppliers.accountId, accounts.id))
    .where(and(eq(accounts.accountType, "supplier" as any), eq(accounts.isLeafAccount, true), isNull(suppliers.id)));

  const [warehousesNoAcc] = await db.select({ c: count() }).from(warehouses).where(isNull(warehouses.accountId));
  const [accsNoWarehouse] = await db
    .select({ c: count() })
    .from(accounts)
    .leftJoin(warehouses, eq(warehouses.accountId, accounts.id))
    .where(and(eq(accounts.accountType, "warehouse" as any), eq(accounts.isLeafAccount, true), isNull(warehouses.id)));

  const [partnersNoAcc] = await db.select({ c: count() }).from(businessPartners).where(isNull(businessPartners.accountId));
  const [billingNoAcc] = await db.select({ c: count() }).from(employeeBillingAccounts).where(isNull(employeeBillingAccounts.accountId));

  return {
    fundsWithoutAccount: Number(fundsNoAcc?.c || 0),
    accountsWithoutFund: Number(accsNoFund?.c || 0),
    suppliersWithoutAccount: Number(suppliersNoAcc?.c || 0),
    accountsWithoutSupplier: Number(accsNoSupplier?.c || 0),
    warehousesWithoutAccount: Number(warehousesNoAcc?.c || 0),
    accountsWithoutWarehouse: Number(accsNoWarehouse?.c || 0),
    partnersWithoutAccount: Number(partnersNoAcc?.c || 0),
    billingWithoutAccount: Number(billingNoAcc?.c || 0),
  };
}

async function checkSubTypeSync(): Promise<AuditReport["subTypeSync"]> {
  const fundMismatches = await db.execute(sql`
    SELECT COUNT(*) as c
    FROM accounts a
    JOIN funds f ON f.account_id = a.id
    WHERE a.account_type = 'fund'
      AND a.is_leaf_account = true
      AND (a.sub_type_id IS DISTINCT FROM f.sub_type_id OR a.sub_type IS DISTINCT FROM f.fund_type)
  `);
  const fundsMismatch = Number((fundMismatches as any).rows?.[0]?.c || 0);

  const supplierMismatches = await db.execute(sql`
    SELECT COUNT(*) as c
    FROM accounts a
    JOIN suppliers s ON s.account_id = a.id
    WHERE a.account_type = 'supplier'
      AND a.is_leaf_account = true
      AND a.sub_type_id IS DISTINCT FROM s.supplier_type_id
  `);
  const suppliersMismatch = Number((supplierMismatches as any).rows?.[0]?.c || 0);

  const warehouseMismatches = await db.execute(sql`
    SELECT COUNT(*) as c
    FROM accounts a
    JOIN warehouses w ON w.account_id = a.id
    WHERE a.account_type = 'warehouse'
      AND a.is_leaf_account = true
      AND a.sub_type_id IS DISTINCT FROM w.sub_type_id
  `);
  const warehousesMismatch = Number((warehouseMismatches as any).rows?.[0]?.c || 0);

  const [fnull] = await db.select({ c: count() }).from(funds).where(isNull(funds.subTypeId));
  const [snull] = await db.select({ c: count() }).from(suppliers).where(isNull(suppliers.supplierTypeId));
  const [wnull] = await db.select({ c: count() }).from(warehouses).where(isNull(warehouses.subTypeId));
  const [bnull] = await db
    .select({ c: count() })
    .from(accounts)
    .where(and(eq(accounts.accountType, "bank" as any), eq(accounts.isLeafAccount, true), isNull(accounts.subTypeId)));
  const [enull] = await db
    .select({ c: count() })
    .from(accounts)
    .where(and(eq(accounts.accountType, "exchange" as any), eq(accounts.isLeafAccount, true), isNull(accounts.subTypeId)));
  const [wtnull] = await db
    .select({ c: count() })
    .from(accounts)
    .where(and(eq(accounts.accountType, "e_wallet" as any), eq(accounts.isLeafAccount, true), isNull(accounts.subTypeId)));

  return {
    fundsMismatch,
    suppliersMismatch,
    warehousesMismatch,
    fundsNullSubType: Number(fnull?.c || 0),
    suppliersNullSubType: Number(snull?.c || 0),
    warehousesNullSubType: Number(wnull?.c || 0),
    banksNullSubType: Number(bnull?.c || 0),
    exchangesNullSubType: Number(enull?.c || 0),
    walletsNullSubType: Number(wtnull?.c || 0),
  };
}

async function checkNameSync(): Promise<AuditReport["names"]> {
  const fundNameMismatches = await db.execute(sql`
    SELECT COUNT(*) as c
    FROM accounts a
    JOIN funds f ON f.account_id = a.id
    WHERE a.account_type = 'fund'
      AND a.is_leaf_account = true
      AND a.name IS DISTINCT FROM f.name
  `);
  const fundNameMismatch = Number((fundNameMismatches as any).rows?.[0]?.c || 0);

  const supplierNameMismatches = await db.execute(sql`
    SELECT COUNT(*) as c
    FROM accounts a
    JOIN suppliers s ON s.account_id = a.id
    WHERE a.account_type = 'supplier'
      AND a.is_leaf_account = true
      AND NOT (a.name LIKE '%' || s.name || '%')
  `);
  const supplierNameMismatch = Number((supplierNameMismatches as any).rows?.[0]?.c || 0);

  const warehouseNameMismatches = await db.execute(sql`
    SELECT COUNT(*) as c
    FROM accounts a
    JOIN warehouses w ON w.account_id = a.id
    WHERE a.account_type = 'warehouse'
      AND a.is_leaf_account = true
      AND a.name IS DISTINCT FROM w.name
  `);
  const warehouseNameMismatch = Number((warehouseNameMismatches as any).rows?.[0]?.c || 0);

  return {
    fundNameMismatch,
    supplierNameMismatch,
    warehouseNameMismatch,
  };
}

async function checkTypes(): Promise<AuditReport["types"]> {
  const missingFundTypes = await db.execute(sql`
    SELECT COUNT(DISTINCT f.fund_type) as c
    FROM funds f
    LEFT JOIN fund_types ft ON ft.business_id = f.business_id AND ft.sub_type_key = f.fund_type
    WHERE ft.id IS NULL
  `);

  const missingBankTypes = await db.execute(sql`
    SELECT COUNT(DISTINCT a.sub_type) as c
    FROM accounts a
    LEFT JOIN bank_types bt ON bt.business_id = a.business_id AND bt.sub_type_key = a.sub_type
    WHERE a.account_type = 'bank' AND a.is_leaf_account = true AND a.sub_type IS NOT NULL AND bt.id IS NULL
  `);

  const missingExchangeTypes = await db.execute(sql`
    SELECT COUNT(DISTINCT a.sub_type) as c
    FROM accounts a
    LEFT JOIN exchange_types et ON et.business_id = a.business_id AND et.sub_type_key = a.sub_type
    WHERE a.account_type = 'exchange' AND a.is_leaf_account = true AND a.sub_type IS NOT NULL AND et.id IS NULL
  `);

  const missingWalletTypes = await db.execute(sql`
    SELECT COUNT(DISTINCT a.sub_type) as c
    FROM accounts a
    LEFT JOIN e_wallet_types wt ON wt.business_id = a.business_id AND wt.sub_type_key = a.sub_type
    WHERE a.account_type = 'e_wallet' AND a.is_leaf_account = true AND a.sub_type IS NOT NULL AND wt.id IS NULL
  `);

  const missingSupplierTypes = await db.execute(sql`
    SELECT COUNT(DISTINCT s.category) as c
    FROM suppliers s
    LEFT JOIN supplier_types st ON st.business_id = s.business_id AND st.sub_type_key = s.category
    WHERE s.category IS NOT NULL AND st.id IS NULL
  `);

  const missingWarehouseTypes = await db.execute(sql`
    SELECT COUNT(DISTINCT w.sub_type) as c
    FROM warehouses w
    LEFT JOIN warehouse_types wt ON wt.business_id = w.business_id AND wt.sub_type_key = w.sub_type
    WHERE w.sub_type IS NOT NULL AND wt.id IS NULL
  `);

  return {
    missingFundTypes: Number((missingFundTypes as any).rows?.[0]?.c || 0),
    missingBankTypes: Number((missingBankTypes as any).rows?.[0]?.c || 0),
    missingExchangeTypes: Number((missingExchangeTypes as any).rows?.[0]?.c || 0),
    missingWalletTypes: Number((missingWalletTypes as any).rows?.[0]?.c || 0),
    missingSupplierTypes: Number((missingSupplierTypes as any).rows?.[0]?.c || 0),
    missingWarehouseTypes: Number((missingWarehouseTypes as any).rows?.[0]?.c || 0),
  };
}

async function checkSubNatures(): Promise<AuditReport["subNatures"]> {
  const [accsNoNature] = await db
    .select({ c: count() })
    .from(accounts)
    .where(and(eq(accounts.isLeafAccount, true), isNull(accounts.accountSubNatureId)));

  const invalidNatures = await db.execute(sql`
    SELECT COUNT(*) as c
    FROM accounts a
    LEFT JOIN account_sub_natures sn ON sn.id = a.account_sub_nature_id
    WHERE a.is_leaf_account = true
      AND a.account_sub_nature_id IS NOT NULL
      AND sn.id IS NULL
  `);

  return {
    accountsMissingNature: Number(accsNoNature?.c || 0),
    accountsWithInvalidNature: Number((invalidNatures as any).rows?.[0]?.c || 0),
  };
}

async function run() {
  console.log("🔍 بدء الفحص الشامل للنظام...\n");

  const links = await checkLinks();
  console.log("📊 الروابط بين الجداول:");
  console.log(JSON.stringify(links, null, 2));

  const subTypeSync = await checkSubTypeSync();
  console.log("\n🔗 تطابق التصنيفات الفرعية:");
  console.log(JSON.stringify(subTypeSync, null, 2));

  const names = await checkNameSync();
  console.log("\n📝 تطابق الأسماء:");
  console.log(JSON.stringify(names, null, 2));

  const types = await checkTypes();
  console.log("\n🏷️ التصنيفات المفقودة:");
  console.log(JSON.stringify(types, null, 2));

  const subNatures = await checkSubNatures();
  console.log("\n🌳 الطبائع الفرعية (Sub Natures):");
  console.log(JSON.stringify(subNatures, null, 2));

  const report: AuditReport = { links, subTypeSync, names, types, subNatures };

  const totalIssues =
    Object.values(links).reduce((a, b) => a + b, 0) +
    Object.values(subTypeSync).reduce((a, b) => a + b, 0) +
    Object.values(names).reduce((a, b) => a + b, 0) +
    Object.values(types).reduce((a, b) => a + b, 0) +
    Object.values(subNatures).reduce((a, b) => a + b, 0);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`📋 إجمالي المشاكل المكتشفة: ${totalIssues}`);
  console.log(`${"=".repeat(60)}\n`);

  if (totalIssues === 0) {
    console.log("✅ النظام سليم - لا توجد مشاكل تطابق أو ربط!");
  } else {
    console.log("⚠️ توجد مشاكل تحتاج معالجة:");
    if (links.fundsWithoutAccount > 0) console.log(`   - ${links.fundsWithoutAccount} صندوق بدون حساب`);
    if (links.accountsWithoutFund > 0) console.log(`   - ${links.accountsWithoutFund} حساب صندوق بدون سجل`);
    if (links.suppliersWithoutAccount > 0) console.log(`   - ${links.suppliersWithoutAccount} مورد بدون حساب`);
    if (links.accountsWithoutSupplier > 0) console.log(`   - ${links.accountsWithoutSupplier} حساب مورد بدون سجل`);
    if (links.warehousesWithoutAccount > 0) console.log(`   - ${links.warehousesWithoutAccount} مخزن بدون حساب`);
    if (links.accountsWithoutWarehouse > 0) console.log(`   - ${links.accountsWithoutWarehouse} حساب مخزن بدون سجل`);
    if (links.partnersWithoutAccount > 0) console.log(`   - ${links.partnersWithoutAccount} شريك بدون حساب`);
    if (links.billingWithoutAccount > 0) console.log(`   - ${links.billingWithoutAccount} حساب فوترة بدون ربط`);
    
    if (subTypeSync.fundsMismatch > 0) console.log(`   - ${subTypeSync.fundsMismatch} عدم تطابق تصنيف الصناديق`);
    if (subTypeSync.suppliersMismatch > 0) console.log(`   - ${subTypeSync.suppliersMismatch} عدم تطابق تصنيف الموردين`);
    if (subTypeSync.warehousesMismatch > 0) console.log(`   - ${subTypeSync.warehousesMismatch} عدم تطابق تصنيف المخازن`);
    
    const nullSubTypes = subTypeSync.fundsNullSubType + subTypeSync.suppliersNullSubType + subTypeSync.warehousesNullSubType +
      subTypeSync.banksNullSubType + subTypeSync.exchangesNullSubType + subTypeSync.walletsNullSubType;
    if (nullSubTypes > 0) console.log(`   - ${nullSubTypes} حساب بدون تصنيف فرعي`);
    
    if (names.fundNameMismatch > 0) console.log(`   - ${names.fundNameMismatch} عدم تطابق اسم الصناديق`);
    if (names.supplierNameMismatch > 0) console.log(`   - ${names.supplierNameMismatch} عدم تطابق اسم الموردين`);
    if (names.warehouseNameMismatch > 0) console.log(`   - ${names.warehouseNameMismatch} عدم تطابق اسم المخازن`);
    
    const missingTypes = Object.values(types).reduce((a, b) => a + b, 0);
    if (missingTypes > 0) console.log(`   - ${missingTypes} تصنيف مفقود من الجداول`);
    
    if (subNatures.accountsMissingNature > 0) console.log(`   - ${subNatures.accountsMissingNature} حساب فرعي بدون طبيعة`);
    if (subNatures.accountsWithInvalidNature > 0) console.log(`   - ${subNatures.accountsWithInvalidNature} حساب بطبيعة غير موجودة`);
  }

  return report;
}

try {
  await run();
} catch (error) {
  console.error("❌ فشل الفحص الشامل:", error);
  process.exit(1);
}
