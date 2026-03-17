/**
 * reporting-summary.service.ts — Phase 9
 * التقارير التجميعية: الملخص اليومي + تقارير الأعمال + الإيرادات الشهرية
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

import { db } from '../db/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import {
  accounts, accountBalances, funds, fundBalances, currencies,
  businesses, analyticsSnapshots,
} from '../db/schema/index.ts';

import type { ReportFilters } from './reporting.types';
import { getCachedReport, cacheReport } from './reporting.types';

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

