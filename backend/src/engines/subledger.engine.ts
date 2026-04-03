/**
 * subledger.engine.ts — محرك الدفاتر الفرعية (Subledger Engine)
 * ================================================================
 * يتتبع أرصدة الكيانات (موردين، شركاء، موظفين، مخازن، بنوك، صرافين، محافظ، صناديق)
 * عند تنفيذ أي سند مالي يمس حساباً مرتبطاً بكيان.
 *
 * الآلية:
 *   1. يستقبل accountId + currencyId + delta
 *   2. يبحث عن نوع الحساب (accountType)
 *   3. يبحث عن الكيان المرتبط بالحساب
 *   4. يحدّث جدول أرصدة الكيان بـ UPSERT
 */

import { eq, sql } from 'drizzle-orm';
import type { PgTransaction } from 'drizzle-orm/pg-core';
import {
  accounts,
  suppliers,
  supplierBalances,
  businessPartners,
  partnerBalances,
  employees,
  employeeBalances,
  warehouses,
  warehouseBalances,
  banks,
  bankBalances,
  exchanges,
  exchangeBalances,
  wallets,
  walletBalances,
  funds,
  fundBalances,
} from '../db/schema/index.ts';

/**
 * تحديث أرصدة الكيان الفرعي المرتبط بالحساب
 * يُستدعى بعد تحديث account_balances في محرك المعاملات
 *
 * @param tx - كائن المعاملة (Drizzle transaction)
 * @param accountId - معرّف الحساب
 * @param currencyId - معرّف العملة
 * @param delta - مقدار التغيير (موجب = مدين، سالب = دائن)
 */
export async function updateSubledgerBalance(
  tx: any,
  accountId: number,
  currencyId: number,
  delta: number,
): Promise<void> {
  if (!accountId || !currencyId || delta === 0) return;

  // جلب نوع الحساب
  const [account] = await tx
    .select({ id: accounts.id, accountType: accounts.accountType })
    .from(accounts)
    .where(eq(accounts.id, accountId))
    .limit(1);

  if (!account?.accountType) return;

  const type = String(account.accountType);

  switch (type) {
    case 'supplier':
      await updateSupplierBalance(tx, accountId, currencyId, delta);
      break;
    case 'partner':
      await updatePartnerBalance(tx, accountId, currencyId, delta);
      break;
    case 'employee':
      await updateEmployeeBalance(tx, accountId, currencyId, delta);
      break;
    case 'warehouse':
      await updateWarehouseBalance(tx, accountId, currencyId, delta);
      break;
    case 'bank':
      await updateBankBalance(tx, accountId, currencyId, delta);
      break;
    case 'exchange':
      await updateExchangeBalance(tx, accountId, currencyId, delta);
      break;
    case 'e_wallet':
      await updateWalletBalance(tx, accountId, currencyId, delta);
      break;
    case 'fund':
      await updateFundBalance(tx, accountId, currencyId, delta);
      break;
    default:
      // أنواع أخرى (accounting, custody, ...) — لا يوجد subledger لها
      break;
  }
}

// ─── Supplier ───────────────────────────────────────────────────────────────
async function updateSupplierBalance(tx: any, accountId: number, currencyId: number, delta: number) {
  const [supplier] = await tx
    .select({ id: suppliers.id })
    .from(suppliers)
    .where(eq(suppliers.accountId, accountId))
    .limit(1);
  if (!supplier) return;

  await tx.execute(sql`
    INSERT INTO supplier_balances (supplier_id, currency_id, balance, updated_at)
    VALUES (${supplier.id}, ${currencyId}, ${delta}, NOW())
    ON CONFLICT (supplier_id, currency_id) DO UPDATE SET
      balance = supplier_balances.balance + ${delta},
      updated_at = NOW()
  `);
}

// ─── Partner ────────────────────────────────────────────────────────────────
async function updatePartnerBalance(tx: any, accountId: number, currencyId: number, delta: number) {
  const [partner] = await tx
    .select({ id: businessPartners.id })
    .from(businessPartners)
    .where(eq(businessPartners.accountId, accountId))
    .limit(1);
  if (!partner) return;

  await tx.execute(sql`
    INSERT INTO partner_balances (partner_id, currency_id, balance, updated_at)
    VALUES (${partner.id}, ${currencyId}, ${delta}, NOW())
    ON CONFLICT (partner_id, currency_id) DO UPDATE SET
      balance = partner_balances.balance + ${delta},
      updated_at = NOW()
  `);
}

// ─── Employee ───────────────────────────────────────────────────────────────
async function updateEmployeeBalance(tx: any, accountId: number, currencyId: number, delta: number) {
  const [employee] = await tx
    .select({ id: employees.id })
    .from(employees)
    .where(eq(employees.accountId, accountId))
    .limit(1);
  if (!employee) return;

  await tx.execute(sql`
    INSERT INTO employee_balances (employee_id, currency_id, balance, updated_at)
    VALUES (${employee.id}, ${currencyId}, ${delta}, NOW())
    ON CONFLICT (employee_id, currency_id) DO UPDATE SET
      balance = employee_balances.balance + ${delta},
      updated_at = NOW()
  `);
}

// ─── Warehouse ──────────────────────────────────────────────────────────────
async function updateWarehouseBalance(tx: any, accountId: number, currencyId: number, delta: number) {
  const [warehouse] = await tx
    .select({ id: warehouses.id })
    .from(warehouses)
    .where(eq(warehouses.accountId, accountId))
    .limit(1);
  if (!warehouse) return;

  await tx.execute(sql`
    INSERT INTO warehouse_balances (warehouse_id, currency_id, balance, updated_at)
    VALUES (${warehouse.id}, ${currencyId}, ${delta}, NOW())
    ON CONFLICT (warehouse_id, currency_id) DO UPDATE SET
      balance = warehouse_balances.balance + ${delta},
      updated_at = NOW()
  `);
}

// ─── Bank ───────────────────────────────────────────────────────────────────
async function updateBankBalance(tx: any, accountId: number, currencyId: number, delta: number) {
  const [bank] = await tx
    .select({ id: banks.id })
    .from(banks)
    .where(eq(banks.accountId, accountId))
    .limit(1);
  if (!bank) return;

  await tx.execute(sql`
    INSERT INTO bank_balances (bank_id, currency_id, balance, updated_at)
    VALUES (${bank.id}, ${currencyId}, ${delta}, NOW())
    ON CONFLICT (bank_id, currency_id) DO UPDATE SET
      balance = bank_balances.balance + ${delta},
      updated_at = NOW()
  `);
}

// ─── Exchange (الصرافين) ────────────────────────────────────────────────────
async function updateExchangeBalance(tx: any, accountId: number, currencyId: number, delta: number) {
  const [exchange] = await tx
    .select({ id: exchanges.id })
    .from(exchanges)
    .where(eq(exchanges.accountId, accountId))
    .limit(1);
  if (!exchange) return;

  await tx.execute(sql`
    INSERT INTO exchange_balances (exchange_id, currency_id, balance, updated_at)
    VALUES (${exchange.id}, ${currencyId}, ${delta}, NOW())
    ON CONFLICT (exchange_id, currency_id) DO UPDATE SET
      balance = exchange_balances.balance + ${delta},
      updated_at = NOW()
  `);
}

// ─── Wallet (المحافظ) ──────────────────────────────────────────────────────
async function updateWalletBalance(tx: any, accountId: number, currencyId: number, delta: number) {
  const [wallet] = await tx
    .select({ id: wallets.id })
    .from(wallets)
    .where(eq(wallets.accountId, accountId))
    .limit(1);
  if (!wallet) return;

  await tx.execute(sql`
    INSERT INTO wallet_balances (wallet_id, currency_id, balance, updated_at)
    VALUES (${wallet.id}, ${currencyId}, ${delta}, NOW())
    ON CONFLICT (wallet_id, currency_id) DO UPDATE SET
      balance = wallet_balances.balance + ${delta},
      updated_at = NOW()
  `);
}

// ─── Fund (الصناديق) ───────────────────────────────────────────────────────
async function updateFundBalance(tx: any, accountId: number, currencyId: number, delta: number) {
  const [fund] = await tx
    .select({ id: funds.id })
    .from(funds)
    .where(eq(funds.accountId, accountId))
    .limit(1);
  if (!fund) return;

  await tx.execute(sql`
    INSERT INTO fund_balances (fund_id, currency_id, balance, updated_at)
    VALUES (${fund.id}, ${currencyId}, ${delta}, NOW())
    ON CONFLICT (fund_id, currency_id) DO UPDATE SET
      balance = fund_balances.balance + ${delta},
      updated_at = NOW()
  `);
}
