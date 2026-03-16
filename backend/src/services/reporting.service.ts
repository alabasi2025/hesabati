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

import { db } from '../db/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import {
  accounts, accountBalances, funds, fundBalances, currencies,
  businesses, analyticsSnapshots,
} from '../db/schema/index.ts';

// ===================== أنواع البيانات =====================

export interface ReportFilters {
  dateFrom?: string;
  dateTo?: string;
  currencyId?: number;
  stationId?: number;
  operationTypeId?: number;
  sourceType?: 'all' | 'payment_voucher' | 'receipt_voucher' | 'journal_manual' | 'inventory_txn';
}

export interface ProfitLossResult {
  dateFrom: string;
  dateTo: string;
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
    totalOperations: number;
  };
  byCategory: any[];
}

export interface TrialBalanceResult {
  dateFrom?: string;
  dateTo?: string;
  accounts: any[];
  totals: {
    totalDebit: number;
    totalCredit: number;
    isBalanced: boolean;
  };
}

export interface AccountStatementResult {
  account: any;
  dateFrom: string;
  dateTo: string;
  entries: any[];
  balances: any[];
  totalEntries: number;
}

// ===================== التخزين المؤقت =====================

function generateFiltersHash(reportKey: string, bizId: number, filters: any): string {
  // Simple hash without crypto dependency
  const data = JSON.stringify({ reportKey, bizId, ...filters });
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36).padStart(12, '0');
}

export async function getCachedReport(bizId: number, reportKey: string, filters: any): Promise<any | null> {
  try {
    const hash = generateFiltersHash(reportKey, bizId, filters);
    const result = await db.execute(sql`
      SELECT data FROM analytics_snapshots
      WHERE business_id = ${bizId} AND report_key = ${reportKey} AND filters_hash = ${hash}
      AND (expires_at IS NULL OR expires_at > NOW())
      ORDER BY generated_at DESC LIMIT 1
    `);
    const rows = Array.isArray(result) ? result : (result as any).rows || [];
    return rows.length > 0 ? (rows[0] as any).data : null;
  } catch {
    return null; // الجدول قد لا يكون موجوداً بعد
  }
}

export async function cacheReport(bizId: number, reportKey: string, filters: any, data: any, userId?: number, ttlMinutes: number = 15): Promise<void> {
  try {
    const hash = generateFiltersHash(reportKey, bizId, filters);
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    // حذف النسخ القديمة
    await db.execute(sql`
      DELETE FROM analytics_snapshots
      WHERE business_id = ${bizId} AND report_key = ${reportKey} AND filters_hash = ${hash}
    `);

    await db.insert(analyticsSnapshots).values({
      businessId: bizId,
      reportKey,
      filtersHash: hash,
      data,
      expiresAt,
      createdBy: userId || null,
    });
  } catch {
    // تجاهل أخطاء الكاش - لا تؤثر على التقرير
  }
}

// ===================== تقرير الأرباح والخسائر =====================

export async function getProfitAndLoss(bizId: number, filters: ReportFilters): Promise<ProfitLossResult> {
  const dateFrom = filters.dateFrom || new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];
  const dateTo = filters.dateTo || new Date().toISOString().split('T')[0];

  // التحقق من الكاش أولاً
  const cached = await getCachedReport(bizId, 'profit_loss', { dateFrom, dateTo });
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
    AND v.status IN ('unreviewed', 'reviewed')
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
    AND v.status IN ('unreviewed', 'reviewed')
    AND v.voucher_date >= ${dateFrom}::date
    AND v.voucher_date <= ${dateTo}::date
    GROUP BY ot.id, ot.name, ot.icon, ot.color, ot.voucher_type
    ORDER BY total DESC
  `);
  const byCategory = Array.isArray(categoryResult) ? categoryResult : (categoryResult as any).rows || [];

  const report: ProfitLossResult = { dateFrom, dateTo, summary, byCategory };

  // تخزين مؤقت
  await cacheReport(bizId, 'profit_loss', { dateFrom, dateTo }, report).catch(() => {});

  return report;
}

// ===================== ميزان المراجعة =====================

export async function getTrialBalance(bizId: number, filters: ReportFilters): Promise<TrialBalanceResult> {
  const { dateFrom, dateTo } = filters;

  const cached = await getCachedReport(bizId, 'trial_balance', { dateFrom, dateTo });
  if (cached) return cached as TrialBalanceResult;

  let dateCondition = sql`AND je.business_id = ${bizId}`;
  if (dateFrom) dateCondition = sql`${dateCondition} AND je.entry_date >= ${dateFrom}`;
  if (dateTo) dateCondition = sql`${dateCondition} AND je.entry_date <= ${dateTo}`;

  const result = await db.execute(sql`
    SELECT
      a.id as account_id, a.name as account_name, a.account_type,
      COALESCE(SUM(CASE WHEN jel.line_type = 'debit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) as total_debit,
      COALESCE(SUM(CASE WHEN jel.line_type = 'credit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) as total_credit,
      COALESCE(SUM(CASE WHEN jel.line_type = 'debit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) -
      COALESCE(SUM(CASE WHEN jel.line_type = 'credit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) as balance
    FROM accounts a
    LEFT JOIN journal_entry_lines jel ON jel.account_id = a.id
    LEFT JOIN journal_entries je ON je.id = jel.journal_entry_id ${dateCondition}
    WHERE a.business_id = ${bizId}
    GROUP BY a.id, a.name, a.account_type
    HAVING COALESCE(SUM(CASE WHEN jel.line_type = 'debit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) > 0
    OR COALESCE(SUM(CASE WHEN jel.line_type = 'credit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END), 0) > 0
    ORDER BY a.account_type, a.name
  `);

  const accountRows = Array.isArray(result) ? result : (result as any).rows || [];
  const totalDebit = accountRows.reduce((s: number, r: any) => s + Number(r.total_debit), 0);
  const totalCredit = accountRows.reduce((s: number, r: any) => s + Number(r.total_credit), 0);

  const report: TrialBalanceResult = {
    dateFrom,
    dateTo,
    accounts: accountRows,
    totals: { totalDebit, totalCredit, isBalanced: Math.abs(totalDebit - totalCredit) < 0.01 },
  };

  await cacheReport(bizId, 'trial_balance', { dateFrom, dateTo }, report).catch(() => {});

  return report;
}

// ===================== كشف حساب =====================

export async function getAccountStatement(bizId: number, accountId: number, filters: ReportFilters): Promise<AccountStatementResult> {
  const dateFrom = filters.dateFrom || new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];
  const dateTo = filters.dateTo || new Date().toISOString().split('T')[0];
  const sourceType = String(filters.sourceType || 'all').toLowerCase();

  // جلب بيانات الحساب
  const [account] = await db.select().from(accounts)
    .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)));
  if (!account) {
    // fallback: دعم كشف الصندوق بنفس endpoint بدون بنية جديدة.
    const [fund] = await db.select().from(funds)
      .where(and(eq(funds.id, accountId), eq(funds.businessId, bizId)));
    if (!fund) throw new Error('الحساب/الصندوق غير موجود أو لا ينتمي لهذا العمل');

    const sourceTypeCondition = sourceType === 'all'
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
      AND v.status IN ('unreviewed', 'reviewed')
      AND v.voucher_date >= ${dateFrom}
      AND v.voucher_date <= ${dateTo}
      AND (v.from_fund_id = ${accountId} OR v.to_fund_id = ${accountId})
      AND ${sourceTypeCondition}
      ORDER BY v.voucher_date ASC, v.id ASC
    `);

    const fundMovements = Array.isArray(fundResult) ? fundResult : (fundResult as any).rows || [];
    let fundRunningBalance = 0;
    const fundEntries = fundMovements.map((m: any) => {
      const amt = Number(m.amount);
      if (m.line_type === 'debit') fundRunningBalance += amt;
      else fundRunningBalance -= amt;
      return { ...m, amount: amt, runningBalance: fundRunningBalance };
    });

    const balances = await db.select({
      currencyId: fundBalances.currencyId,
      balance: fundBalances.balance,
      currencyCode: currencies.code,
      currencySymbol: currencies.symbol,
    }).from(fundBalances)
      .leftJoin(currencies, eq(fundBalances.currencyId, currencies.id))
      .where(eq(fundBalances.fundId, accountId));

    return {
      account: { ...fund, accountType: 'fund' },
      dateFrom,
      dateTo,
      entries: fundEntries,
      balances,
      totalEntries: fundEntries.length,
    };
  }

  // جلب الحركات
  const sourceTypeCondition = sourceType === 'all'
    ? sql`TRUE`
    : sql`
      (
        CASE
          WHEN je.reference LIKE 'PAY-%' THEN 'payment_voucher'
          WHEN je.reference LIKE 'REC-%' THEN 'receipt_voucher'
          WHEN je.reference LIKE 'INV-%' OR je.reference LIKE 'STK-%' THEN 'inventory_txn'
          ELSE 'journal_manual'
        END
      ) = ${sourceType}
    `;

  const result = await db.execute(sql`
    SELECT
      je.id as entry_id, je.entry_number, je.entry_date, je.description as entry_description,
      je.reference, jel.line_type, CAST(jel.amount AS NUMERIC) as amount,
      CASE WHEN jel.line_type = 'debit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END as debit,
      CASE WHEN jel.line_type = 'credit' THEN CAST(jel.amount AS NUMERIC) ELSE 0 END as credit,
      jel.description as line_description,
      CASE
        WHEN je.reference LIKE 'PAY-%' THEN 'payment_voucher'
        WHEN je.reference LIKE 'REC-%' THEN 'receipt_voucher'
        WHEN je.reference LIKE 'INV-%' OR je.reference LIKE 'STK-%' THEN 'inventory_txn'
        ELSE 'journal_manual'
      END as source_type
    FROM journal_entry_lines jel
    JOIN journal_entries je ON je.id = jel.journal_entry_id
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
    if (m.line_type === 'debit') runningBalance += amt;
    else runningBalance -= amt;
    return { ...m, amount: amt, runningBalance };
  });

  // الأرصدة الحالية
  const balances = await db.select({
    currencyId: accountBalances.currencyId,
    balance: accountBalances.balance,
    currencyCode: currencies.code,
    currencySymbol: currencies.symbol,
  }).from(accountBalances)
    .leftJoin(currencies, eq(accountBalances.currencyId, currencies.id))
    .where(eq(accountBalances.accountId, accountId));

  return { account, dateFrom, dateTo, entries, balances, totalEntries: entries.length };
}

// ===================== ملخص يومي =====================

export async function getDailySummary(bizId: number, date: string) {
  const result = await db.execute(sql`
    SELECT
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count,
      COUNT(DISTINCT v.operation_type_id) as operation_types_count
    FROM vouchers v
    LEFT JOIN operation_types ot ON ot.id = v.operation_type_id
    WHERE v.business_id = ${bizId}
    AND v.status IN ('unreviewed', 'reviewed')
    AND v.voucher_date::date = ${date}::date
  `);

  const rows = Array.isArray(result) ? result : (result as any).rows || [];
  const summary = rows[0] || { receipts: 0, payments: 0, operations_count: 0, operation_types_count: 0 };

  // تفصيل حسب نوع العملية
  const byOpType = await db.execute(sql`
    SELECT
      ot.id, ot.name, ot.icon, ot.color, ot.voucher_type,
      COALESCE(SUM(CAST(v.amount AS NUMERIC)), 0) as total,
      COUNT(*) as count
    FROM vouchers v
    JOIN operation_types ot ON ot.id = v.operation_type_id
    WHERE v.business_id = ${bizId}
    AND v.status IN ('unreviewed', 'reviewed')
    AND v.voucher_date::date = ${date}::date
    GROUP BY ot.id, ot.name, ot.icon, ot.color, ot.voucher_type
    ORDER BY total DESC
  `);
  const opTypeRows = Array.isArray(byOpType) ? byOpType : (byOpType as any).rows || [];

  return { date, summary, byOperationType: opTypeRows };
}

// ===================== تقرير تجميعي لكل الأعمال =====================

export async function getAggregatedProfitAndLoss(userId: number, filters: ReportFilters) {
  const dateFrom = filters.dateFrom || new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];
  const dateTo = filters.dateTo || new Date().toISOString().split('T')[0];

  // جلب كل الأعمال النشطة
  const allBusinesses = await db.select({
    id: businesses.id,
    name: businesses.name,
    code: businesses.code,
    type: businesses.type,
    icon: businesses.icon,
    color: businesses.color,
  }).from(businesses).where(eq(businesses.isActive, true));

  const results = [];
  let grandTotalIncome = 0;
  let grandTotalExpenses = 0;

  for (const biz of allBusinesses) {
    const report = await getProfitAndLoss(biz.id, { dateFrom, dateTo });
    grandTotalIncome += report.summary.totalIncome;
    grandTotalExpenses += report.summary.totalExpenses;
    results.push({
      business: biz,
      summary: report.summary,
    });
  }

  return {
    dateFrom,
    dateTo,
    grandTotal: {
      totalIncome: grandTotalIncome,
      totalExpenses: grandTotalExpenses,
      netProfit: grandTotalIncome - grandTotalExpenses,
    },
    businesses: results,
  };
}

// ===================== ملخص تجميعي لكل الأعمال =====================

export async function getAggregatedSummary(userId: number) {
  // جلب كل الأعمال مع إحصائيات
  const result = await db.execute(sql`
    SELECT
      b.id, b.name, b.code, b.type, b.icon, b.color,
      (SELECT COUNT(*) FROM accounts a WHERE a.business_id = b.id AND a.is_active = true) as accounts_count,
      (SELECT COUNT(*) FROM funds f WHERE f.business_id = b.id AND f.is_active = true) as funds_count,
      (SELECT COUNT(*) FROM vouchers v WHERE v.business_id = b.id AND v.status IN ('unreviewed', 'reviewed')) as vouchers_count,
      (SELECT COALESCE(SUM(CAST(v.amount AS NUMERIC)), 0) FROM vouchers v
       WHERE v.business_id = b.id AND v.status IN ('unreviewed', 'reviewed')) as total_volume,
      (SELECT COALESCE(SUM(CAST(ab.balance AS NUMERIC)), 0) FROM account_balances ab
       JOIN accounts a ON a.id = ab.account_id WHERE a.business_id = b.id) as total_balance
    FROM businesses b
    WHERE b.is_active = true
    ORDER BY b.sort_order, b.name
  `);

  const rows = Array.isArray(result) ? result : (result as any).rows || [];

  const grandTotal = {
    totalVolume: rows.reduce((s: number, r: any) => s + Number(r.total_volume || 0), 0),
    totalBalance: rows.reduce((s: number, r: any) => s + Number(r.total_balance || 0), 0),
    totalAccounts: rows.reduce((s: number, r: any) => s + Number(r.accounts_count || 0), 0),
    totalFunds: rows.reduce((s: number, r: any) => s + Number(r.funds_count || 0), 0),
    totalVouchers: rows.reduce((s: number, r: any) => s + Number(r.vouchers_count || 0), 0),
    businessCount: rows.length,
  };

  return { businesses: rows, grandTotal };
}

// ===================== تقرير الإيرادات والمصروفات الشهرية =====================

export async function getMonthlyRevenueExpenses(bizId: number, year: number) {
  const result = await db.execute(sql`
    SELECT
      EXTRACT(MONTH FROM v.voucher_date) as month,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as income,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as expenses
    FROM vouchers v
    LEFT JOIN operation_types ot ON ot.id = v.operation_type_id
    WHERE v.business_id = ${bizId}
    AND v.status IN ('unreviewed', 'reviewed')
    AND EXTRACT(YEAR FROM v.voucher_date) = ${year}
    GROUP BY EXTRACT(MONTH FROM v.voucher_date)
    ORDER BY month
  `);

  const rows = Array.isArray(result) ? result : (result as any).rows || [];

  // ملء كل الأشهر (حتى لو لا يوجد بيانات)
  const months = [];
  for (let m = 1; m <= 12; m++) {
    const found = rows.find((r: any) => Number(r.month) === m);
    months.push({
      month: m,
      income: Number(found?.income || 0),
      expenses: Number(found?.expenses || 0),
      netProfit: Number(found?.income || 0) - Number(found?.expenses || 0),
    });
  }

  return { year, months };
}
