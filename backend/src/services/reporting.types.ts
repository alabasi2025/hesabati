/**
 * reporting.types.ts — Phase 9
 * أنواع بيانات التقارير + وظائف التخزين المؤقت
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

