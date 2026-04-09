/**
 * reporting-core.service.ts — Phase 9
 * التقارير الأساسية: الأرباح والخسائر + ميزان المراجعة + كشف الحساب
 */
/**
 * محرك التقارير والتحليلات المركزي
 * ====================================
 * حسب الخطة التنفيذية - محرك 4
 *
 * الدوال:
 * - getProfitAndLoss(bizId, filters) → تقرير الأرباح والخسائر
 * - getTrialBalance(bizId, filters) → ميزان المراجعة
 * - getAccountStatement(bizId, accountId, filters) → كشف حساب
 * - getDailySummary(bizId, date) → ملخص يومي
 * - getAggregatedProfitAndLoss(userId) → تقرير تجميعي لكل الأعمال
 * - getAggregatedSummary(userId) → ملخص تجميعي لكل الأعمال
 * - getCachedReport / cacheReport → التخزين المؤقت
 */

import { db } from "../db/index.ts";
import { eq, and, sql } from "drizzle-orm";
import {
  accounts,
  accountBalances,
  funds,
  fundBalances,
  currencies,
  businesses,
  analyticsSnapshots,
  vouchers,
} from "../db/schema/index.ts";

import type {
  ReportFilters,
  ProfitLossResult,
  TrialBalanceResult,
  AccountStatementResult,
} from "./reporting.types";
import { getCachedReport, cacheReport } from "./reporting.types";

// ===================== تقرير الأرباح والخسائر =====================

export async function getProfitAndLoss(
  bizId: number,
  filters: ReportFilters,
): Promise<ProfitLossResult> {
  const dateFrom =
    filters.dateFrom ||
    new Date(new Date().getFullYear(), 0, 1).toISOString().split("T")[0];
  const dateTo = filters.dateTo || new Date().toISOString().split("T")[0];

  // التحقق من الكاش أولاً
  const cached = await getCachedReport(bizId, "profit_loss", {
    dateFrom,
    dateTo,
  });
  if (cached) return cached as ProfitLossResult;

  const result = await db.execute(sql`
    SELECT
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as total_income,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as total_expenses,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) -
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as net_profit,
      COUNT(*) as total_operations
    FROM vouchers v
    LEFT JOIN operation_types ot ON ot.id = v.operation_type_id
    WHERE v.business_id = ${bizId}
    AND v.status IN ('draft', 'confirmed')
    AND v.voucher_date >= ${dateFrom}::date
    AND v.voucher_date <= ${dateTo}::date
  `);

  const rows = Array.isArray(result) ? result : (result as any).rows || [];
  const summary = {
    totalIncome: Number(rows[0]?.total_income || 0),
    totalExpenses: Number(rows[0]?.total_expenses || 0),
    netProfit: Number(rows[0]?.net_profit || 0),
    totalOperations: Number(rows[0]?.total_operations || 0),
  };

  // تفصيل حسب نوع العملية
  const categoryResult = await db.execute(sql`
    SELECT
      ot.id, ot.name, ot.icon, ot.color, ot.voucher_type,
      COALESCE(SUM(CAST(v.amount AS NUMERIC)), 0) as total,
      COUNT(*) as count
    FROM vouchers v
    JOIN operation_types ot ON ot.id = v.operation_type_id
    WHERE v.business_id = ${bizId}
    AND v.status IN ('draft', 'confirmed')
    AND v.voucher_date >= ${dateFrom}::date
    AND v.voucher_date <= ${dateTo}::date
    GROUP BY ot.id, ot.name, ot.icon, ot.color, ot.voucher_type
    ORDER BY total DESC
  `);
  const byCategory = Array.isArray(categoryResult)
    ? categoryResult
    : (categoryResult as any).rows || [];

  const report: ProfitLossResult = { dateFrom, dateTo, summary, byCategory };

  // تخزين مؤقت
  await cacheReport(bizId, "profit_loss", { dateFrom, dateTo }, report).catch(
    () => {},
  );

  return report;
}

// ===================== ميزان المراجعة =====================

export async function getTrialBalance(
  bizId: number,
  filters: ReportFilters,
): Promise<TrialBalanceResult> {
  const { dateFrom, dateTo } = filters;

  const cached = await getCachedReport(bizId, "trial_balance", {
    dateFrom,
    dateTo,
  });
  if (cached) return cached as TrialBalanceResult;

  let dateCondition = sql`AND je.business_id = ${bizId}`;
  if (dateFrom)
    dateCondition = sql`${dateCondition} AND je.entry_date >= ${dateFrom}`;
  if (dateTo)
    dateCondition = sql`${dateCondition} AND je.entry_date <= ${dateTo}`;

  const result = await db.execute(sql`
    SELECT
      a.id as account_id, a.name as account_name, a.account_type, a.code,
      COALESCE(SUM(CASE WHEN jel.line_type = 'debit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) as total_debit,
      COALESCE(SUM(CASE WHEN jel.line_type = 'credit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) as total_credit,
      COALESCE(SUM(CASE WHEN jel.line_type = 'debit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) -
      COALESCE(SUM(CASE WHEN jel.line_type = 'credit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) as balance
    FROM accounts a
    LEFT JOIN journal_entry_lines jel ON jel.account_id = a.id
    LEFT JOIN journal_entries je ON je.id = jel.journal_entry_id ${dateCondition}
    WHERE a.business_id = ${bizId}
    GROUP BY a.id, a.name, a.account_type, a.code
    HAVING COALESCE(SUM(CASE WHEN jel.line_type = 'debit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) > 0
    OR COALESCE(SUM(CASE WHEN jel.line_type = 'credit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) > 0
    ORDER BY a.code NULLS LAST, a.account_type, a.name
  `);

  const accountRows = Array.isArray(result)
    ? result
    : (result as any).rows || [];
  const totalDebit = accountRows.reduce(
    (s: number, r: any) => s + Number(r.total_debit),
    0,
  );
  const totalCredit = accountRows.reduce(
    (s: number, r: any) => s + Number(r.total_credit),
    0,
  );

  const report: TrialBalanceResult = {
    dateFrom,
    dateTo,
    accounts: accountRows,
    totals: {
      totalDebit,
      totalCredit,
      isBalanced: Math.abs(totalDebit - totalCredit) < 0.01,
    },
  };

  await cacheReport(bizId, "trial_balance", { dateFrom, dateTo }, report).catch(
    () => {},
  );

  return report;
}

// ===================== كشف حساب =====================

export async function getAccountStatement(
  bizId: number,
  accountId: number,
  filters: ReportFilters,
): Promise<AccountStatementResult> {
  const dateFrom =
    filters.dateFrom ||
    new Date(new Date().getFullYear(), 0, 1).toISOString().split("T")[0];
  const dateTo = filters.dateTo || new Date().toISOString().split("T")[0];
  const sourceType = String(filters.sourceType || "all").toLowerCase();

  // جلب بيانات الحساب
  const [account] = await db
    .select()
    .from(accounts)
    .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)));
  if (!account) {
    // fallback: دعم كشف الصندوق بنفس endpoint بدون بنية جديدة.
    const [fund] = await db
      .select()
      .from(funds)
      .where(and(eq(funds.id, accountId), eq(funds.businessId, bizId)));
    if (!fund)
      throw new Error("الحساب/الصندوق غير موجود أو لا ينتمي لهذا العمل");

    const sourceTypeCondition =
      sourceType === "all"
        ? sql`TRUE`
        : sql`
        (
          CASE
            WHEN v.voucher_type = 'payment' THEN 'payment_voucher'
            WHEN v.voucher_type = 'receipt' THEN 'receipt_voucher'
            ELSE 'journal_manual'
          END
        ) = ${sourceType}
      `;

    const fundResult = await db.execute(sql`
      SELECT
        v.id as entry_id,
        v.voucher_number as entry_number,
        v.voucher_date as entry_date,
        v.description as entry_description,
        v.reference,
        CASE WHEN v.to_fund_id = ${accountId} THEN 'debit' ELSE 'credit' END as line_type,
        CAST(v.amount AS NUMERIC) as amount,
        CASE WHEN v.to_fund_id = ${accountId} THEN CAST(v.amount AS NUMERIC) ELSE 0 END as debit,
        CASE WHEN v.from_fund_id = ${accountId} THEN CAST(v.amount AS NUMERIC) ELSE 0 END as credit,
        v.description as line_description,
        CASE
          WHEN v.voucher_type = 'payment' THEN 'payment_voucher'
          WHEN v.voucher_type = 'receipt' THEN 'receipt_voucher'
          ELSE 'journal_manual'
        END as source_type
      FROM vouchers v
      WHERE v.business_id = ${bizId}
      AND v.status IN ('draft', 'confirmed')
      AND v.voucher_date >= ${dateFrom}
      AND v.voucher_date <= ${dateTo}
      AND (v.from_fund_id = ${accountId} OR v.to_fund_id = ${accountId})
      AND ${sourceTypeCondition}
      ORDER BY v.voucher_date ASC, v.id ASC
    `);

    const fundMovements = Array.isArray(fundResult)
      ? fundResult
      : (fundResult as any).rows || [];
    let fundRunningBalance = 0;
    const fundEntries = fundMovements.map((m: any) => {
      const amt = Number(m.amount);
      if (m.line_type === "debit") fundRunningBalance += amt;
      else fundRunningBalance -= amt;
      return { ...m, amount: amt, runningBalance: fundRunningBalance };
    });

    const balances = await db
      .select({
        currencyId: fundBalances.currencyId,
        balance: fundBalances.balance,
        currencyCode: currencies.code,
        currencySymbol: currencies.symbol,
      })
      .from(fundBalances)
      .leftJoin(currencies, eq(fundBalances.currencyId, currencies.id))
      .where(eq(fundBalances.fundId, accountId));

    return {
      account: { ...fund, accountType: "fund" },
      dateFrom,
      dateTo,
      entries: fundEntries,
      balances,
      totalEntries: fundEntries.length,
    };
  }

  // جلب الحركات
  // تصنيف نوع الحركة: نستخدم JOIN مع vouchers للحصول على نوع السند الفعلي
  const sourceTypeCondition =
    sourceType === "all"
      ? sql`TRUE`
      : sql`
      (
        CASE
          WHEN v.voucher_type = 'payment' THEN 'payment_voucher'
          WHEN v.voucher_type = 'receipt' THEN 'receipt_voucher'
          WHEN je.reference LIKE 'INV-%' OR je.reference LIKE 'STK-%' THEN 'inventory_txn'
          WHEN v.id IS NULL AND (je.reference LIKE 'INV-%' OR je.reference LIKE 'STK-%') THEN 'inventory_txn'
          WHEN v.id IS NOT NULL THEN
            CASE WHEN v.voucher_type = 'payment' THEN 'payment_voucher'
                 WHEN v.voucher_type = 'receipt' THEN 'receipt_voucher'
                 ELSE 'journal_manual' END
          ELSE 'journal_manual'
        END
      ) = ${sourceType}
    `;

  const result = await db.execute(sql`
    SELECT
      je.id as entry_id,
      COALESCE(v.voucher_number, je.entry_number, je.reference) as entry_number,
      je.entry_date,
      COALESCE(v.description, je.description) as entry_description,
      je.reference, jel.line_type, CAST(jel.amount AS NUMERIC) as amount,
      CASE WHEN jel.line_type = 'debit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END as debit,
      CASE WHEN jel.line_type = 'credit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END as credit,
      jel.description as line_description,
      CASE
        WHEN v.voucher_type = 'payment' THEN 'payment_voucher'
        WHEN v.voucher_type = 'receipt' THEN 'receipt_voucher'
        WHEN je.reference LIKE 'INV-%' OR je.reference LIKE 'STK-%' THEN 'inventory_txn'
        WHEN v.id IS NOT NULL THEN
          CASE WHEN v.voucher_type = 'payment' THEN 'payment_voucher'
               WHEN v.voucher_type = 'receipt' THEN 'receipt_voucher'
               ELSE 'journal_manual' END
        ELSE 'journal_manual'
      END as source_type,
      v.id as voucher_id,
      v.voucher_number,
      v.voucher_type
    FROM journal_entry_lines jel
    JOIN journal_entries je ON je.id = jel.journal_entry_id
    LEFT JOIN vouchers v ON v.voucher_number = je.reference AND v.business_id = ${bizId}
    WHERE jel.account_id = ${accountId}
    AND je.business_id = ${bizId}
    AND je.entry_date >= ${dateFrom}
    AND je.entry_date <= ${dateTo}
    AND ${sourceTypeCondition}
    ORDER BY je.entry_date ASC, je.id ASC
  `);

  const movements = Array.isArray(result) ? result : (result as any).rows || [];

  // حساب الرصيد التراكمي
  let runningBalance = 0;
  const entries = movements.map((m: any) => {
    const amt = Number(m.amount);
    if (m.line_type === "debit") runningBalance += amt;
    else runningBalance -= amt;
    return { ...m, amount: amt, runningBalance };
  });

  // الأرصدة الحالية
  const balances = await db
    .select({
      currencyId: accountBalances.currencyId,
      balance: accountBalances.balance,
      currencyCode: currencies.code,
      currencySymbol: currencies.symbol,
    })
    .from(accountBalances)
    .leftJoin(currencies, eq(accountBalances.currencyId, currencies.id))
    .where(eq(accountBalances.accountId, accountId));

  return {
    account,
    dateFrom,
    dateTo,
    entries,
    balances,
    totalEntries: entries.length,
  };
}
