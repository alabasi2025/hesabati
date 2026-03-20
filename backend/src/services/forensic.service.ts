/**
 * forensic.service.ts — التحليل الجنائي المالي
 * ========================================================
 * يوفر تحليلاً جنائياً شاملاً للمعاملات المالية للكشف عن:
 * - المعاملات المشبوهة (مبالغ غير معتادة، أوقات غريبة)
 * - الإدخالات المكررة المحتملة
 * - السندات غير المراجعة المتراكمة
 * - الحسابات ذات التغييرات الكبيرة في الأرصدة
 * - ملخص عام لمستوى المخاطر
 */

import { db } from '../db/index.ts';
import { sql, type SQL } from 'drizzle-orm';

export interface ForensicFilters {
  dateFrom?: string;
  dateTo?:   string;
}

export interface SuspiciousTransaction {
  id:            number;
  voucherNumber: string;
  voucherType:   string;
  amount:        number;
  description:   string | null;
  voucherDate:   string;
  createdAt:     string;
  reason:        string;
  riskLevel:     'high' | 'medium' | 'low';
}

export interface DuplicateEntry {
  amount:       number;
  voucherType:  string;
  voucherDate:  string;
  count:        number;
  ids:          number[];
  voucherNumbers: string[];
  riskLevel:    'high' | 'medium';
}

export interface LargeTransaction {
  id:            number;
  voucherNumber: string;
  voucherType:   string;
  amount:        number;
  description:   string | null;
  voucherDate:   string;
  avgAmount:     number;
  deviationFactor: number;
}

export interface UnreviewedVoucher {
  id:            number;
  voucherNumber: string;
  voucherType:   string;
  amount:        number;
  description:   string | null;
  voucherDate:   string;
  createdAt:     string;
  daysOld:       number;
}

export interface ForensicSummary {
  totalVouchers:          number;
  unreviewedCount:        number;
  unreviewedPercentage:   number;
  suspiciousCount:        number;
  duplicatesCount:        number;
  largeTransactionsCount: number;
  totalAmountAtRisk:      number;
  riskScore:              number;
  riskLevel:              'critical' | 'high' | 'medium' | 'low';
  dateFrom:               string;
  dateTo:                 string;
}

// ──────────────────────────────────────────────────────────────
// دالة مساعدة لبناء شرط التاريخ (parameterized)
// ──────────────────────────────────────────────────────────────
function buildDateCond(dateFrom?: string, dateTo?: string): SQL {
  let cond: SQL = sql``;
  if (dateFrom) cond = sql`${cond} AND v.voucher_date >= ${dateFrom}::date`;
  if (dateTo)   cond = sql`${cond} AND v.voucher_date < ${dateTo}::date + interval '1 day'`;
  return cond;
}

// ──────────────────────────────────────────────────────────────
// 1. الملخص العام
// ──────────────────────────────────────────────────────────────
export async function getForensicSummary(bizId: number, filters: ForensicFilters = {}): Promise<ForensicSummary> {
  const dateFrom = filters.dateFrom || new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];
  const dateTo   = filters.dateTo   || new Date().toISOString().split('T')[0];
  const dateCond = buildDateCond(dateFrom, dateTo);

  // إجماليات
  const totalsResult = await db.execute(sql`
    SELECT
      COUNT(*)                                                      AS total,
      COUNT(*) FILTER (WHERE status = 'unreviewed')                AS unreviewed,
      COALESCE(SUM(CAST(amount AS NUMERIC)) FILTER (WHERE status = 'unreviewed'), 0) AS unreviewed_amount
    FROM vouchers v
    WHERE v.business_id = ${bizId}
    ${dateCond}
  `);

  // معاملات مشبوهة (خارج ساعات العمل: قبل 8 صباحاً أو بعد 10 مساءً)
  const suspiciousResult = await db.execute(sql`
    SELECT COUNT(*) AS cnt
    FROM vouchers v
    WHERE v.business_id = ${bizId}
      AND (EXTRACT(HOUR FROM v.voucher_date) < 8 OR EXTRACT(HOUR FROM v.voucher_date) >= 22)
    ${dateCond}
  `);

  // مكررات محتملة
  const duplicatesResult = await db.execute(sql`
    SELECT COUNT(*) AS cnt FROM (
      SELECT amount, voucher_type, DATE(voucher_date)
      FROM vouchers v
      WHERE v.business_id = ${bizId}
      ${dateCond}
      GROUP BY amount, voucher_type, DATE(voucher_date)
      HAVING COUNT(*) > 1
    ) dup
  `);

  // معاملات كبيرة (أكثر من 3 أضعاف المتوسط)
  const largeTxResult = await db.execute(sql`
    WITH avg_data AS (
      SELECT AVG(CAST(amount AS NUMERIC)) AS avg_amount
      FROM vouchers v
      WHERE v.business_id = ${bizId}
      ${dateCond}
    )
    SELECT
      COUNT(*) AS cnt,
      COALESCE(SUM(CAST(v.amount AS NUMERIC)), 0) AS total_amount
    FROM vouchers v, avg_data
    WHERE v.business_id = ${bizId}
      AND CAST(v.amount AS NUMERIC) > avg_data.avg_amount * 3
    ${dateCond}
  `);

  const totalsRows    = Array.isArray(totalsResult)    ? totalsResult    : (totalsResult    as any).rows || [];
  const suspRows      = Array.isArray(suspiciousResult) ? suspiciousResult : (suspiciousResult as any).rows || [];
  const dupRows       = Array.isArray(duplicatesResult) ? duplicatesResult : (duplicatesResult as any).rows || [];
  const largeTxRows   = Array.isArray(largeTxResult)   ? largeTxResult   : (largeTxResult   as any).rows || [];

  const totalVouchers          = Number(totalsRows[0]?.total          || 0);
  const unreviewedCount        = Number(totalsRows[0]?.unreviewed     || 0);
  const unreviewedAmount       = Number(totalsRows[0]?.unreviewed_amount || 0);
  const suspiciousCount        = Number(suspRows[0]?.cnt              || 0);
  const duplicatesCount        = Number(dupRows[0]?.cnt               || 0);
  const largeTransactionsCount = Number(largeTxRows[0]?.cnt           || 0);
  const largeTxAmount          = Number(largeTxRows[0]?.total_amount  || 0);

  const unreviewedPercentage = totalVouchers > 0
    ? Math.round((unreviewedCount / totalVouchers) * 100)
    : 0;

  // حساب درجة المخاطر (0-100)
  let riskScore = 0;
  if (totalVouchers > 0) {
    riskScore += Math.min(unreviewedPercentage * 0.4, 40);
    riskScore += Math.min((suspiciousCount  / totalVouchers) * 100 * 0.3, 30);
    riskScore += Math.min((duplicatesCount  / totalVouchers) * 100 * 0.2, 20);
    riskScore += Math.min((largeTransactionsCount / totalVouchers) * 100 * 0.1, 10);
  }
  riskScore = Math.round(riskScore);

  const riskLevel: ForensicSummary['riskLevel'] =
    riskScore >= 70 ? 'critical' :
    riskScore >= 40 ? 'high'     :
    riskScore >= 20 ? 'medium'   : 'low';

  return {
    totalVouchers,
    unreviewedCount,
    unreviewedPercentage,
    suspiciousCount,
    duplicatesCount,
    largeTransactionsCount,
    totalAmountAtRisk: unreviewedAmount + largeTxAmount,
    riskScore,
    riskLevel,
    dateFrom,
    dateTo,
  };
}

// ──────────────────────────────────────────────────────────────
// 2. المعاملات المشبوهة
// ──────────────────────────────────────────────────────────────
export async function getSuspiciousTransactions(bizId: number, filters: ForensicFilters = {}): Promise<SuspiciousTransaction[]> {
  const dateCond = buildDateCond(filters.dateFrom, filters.dateTo);

  const result = await db.execute(sql`
    SELECT
      v.id,
      v.voucher_number,
      v.voucher_type,
      CAST(v.amount AS NUMERIC)             AS amount,
      v.description,
      v.voucher_date::text                  AS voucher_date,
      v.created_at::text                    AS created_at,
      EXTRACT(HOUR FROM v.voucher_date)::int AS hour
    FROM vouchers v
    WHERE v.business_id = ${bizId}
      AND (
        EXTRACT(HOUR FROM v.voucher_date) < 8
        OR EXTRACT(HOUR FROM v.voucher_date) >= 22
        OR v.description IS NULL
        OR TRIM(v.description) = ''
      )
    ${dateCond}
    ORDER BY v.voucher_date DESC
    LIMIT 100
  `);

  const rows: any[] = Array.isArray(result) ? result : (result as any).rows || [];

  return rows.map(r => {
    const hour = Number(r.hour);
    const noDesc = !r.description || String(r.description).trim() === '';
    const offHours = hour < 8 || hour >= 22;

    let reason = '';
    let riskLevel: 'high' | 'medium' | 'low' = 'low';

    if (offHours && noDesc) {
      reason = 'معاملة خارج ساعات العمل وبدون وصف';
      riskLevel = 'high';
    } else if (offHours) {
      reason = `معاملة خارج ساعات العمل (الساعة ${hour}:00)`;
      riskLevel = 'medium';
    } else if (noDesc) {
      reason = 'معاملة بدون وصف';
      riskLevel = 'low';
    }

    return {
      id:            Number(r.id),
      voucherNumber: String(r.voucher_number),
      voucherType:   String(r.voucher_type),
      amount:        Number(r.amount),
      description:   r.description ? String(r.description) : null,
      voucherDate:   String(r.voucher_date),
      createdAt:     String(r.created_at),
      reason,
      riskLevel,
    };
  });
}

// ──────────────────────────────────────────────────────────────
// 3. الإدخالات المكررة المحتملة
// ──────────────────────────────────────────────────────────────
export async function getDuplicateEntries(bizId: number, filters: ForensicFilters = {}): Promise<DuplicateEntry[]> {
  const dateCond = buildDateCond(filters.dateFrom, filters.dateTo);

  const result = await db.execute(sql`
    SELECT
      CAST(amount AS NUMERIC)                                  AS amount,
      voucher_type,
      DATE(voucher_date)::text                                 AS voucher_date,
      COUNT(*)                                                 AS cnt,
      JSON_AGG(id ORDER BY id)                                AS ids,
      JSON_AGG(voucher_number ORDER BY id)                    AS voucher_numbers
    FROM vouchers v
    WHERE v.business_id = ${bizId}
    ${dateCond}
    GROUP BY CAST(amount AS NUMERIC), voucher_type, DATE(voucher_date)
    HAVING COUNT(*) > 1
    ORDER BY cnt DESC, CAST(amount AS NUMERIC) DESC
    LIMIT 50
  `);

  const rows: any[] = Array.isArray(result) ? result : (result as any).rows || [];

  return rows.map(r => {
    const count = Number(r.cnt);
    const ids: number[] = Array.isArray(r.ids) ? r.ids.map(Number) : [];
    const voucherNumbers: string[] = Array.isArray(r.voucher_numbers) ? r.voucher_numbers.map(String) : [];
    return {
      amount:         Number(r.amount),
      voucherType:    String(r.voucher_type),
      voucherDate:    String(r.voucher_date),
      count,
      ids,
      voucherNumbers,
      riskLevel:      count >= 3 ? 'high' : 'medium',
    };
  });
}

// ──────────────────────────────────────────────────────────────
// 4. المعاملات الكبيرة غير المعتادة
// ──────────────────────────────────────────────────────────────
export async function getLargeTransactions(bizId: number, filters: ForensicFilters = {}): Promise<LargeTransaction[]> {
  const dateCond = buildDateCond(filters.dateFrom, filters.dateTo);

  const result = await db.execute(sql`
    WITH stats AS (
      SELECT AVG(CAST(amount AS NUMERIC)) AS avg_amount
      FROM vouchers
      WHERE business_id = ${bizId}
      ${dateCond}
    )
    SELECT
      v.id,
      v.voucher_number,
      v.voucher_type,
      CAST(v.amount AS NUMERIC)            AS amount,
      v.description,
      v.voucher_date::text                 AS voucher_date,
      ROUND(stats.avg_amount, 2)           AS avg_amount,
      ROUND(CAST(v.amount AS NUMERIC) / NULLIF(stats.avg_amount, 0), 2) AS deviation_factor
    FROM vouchers v, stats
    WHERE v.business_id = ${bizId}
      AND CAST(v.amount AS NUMERIC) > stats.avg_amount * 3
    ${dateCond}
    ORDER BY CAST(v.amount AS NUMERIC) DESC
    LIMIT 50
  `);

  const rows: any[] = Array.isArray(result) ? result : (result as any).rows || [];

  return rows.map(r => ({
    id:              Number(r.id),
    voucherNumber:   String(r.voucher_number),
    voucherType:     String(r.voucher_type),
    amount:          Number(r.amount),
    description:     r.description ? String(r.description) : null,
    voucherDate:     String(r.voucher_date),
    avgAmount:       Number(r.avg_amount),
    deviationFactor: Number(r.deviation_factor),
  }));
}

// ──────────────────────────────────────────────────────────────
// 5. السندات غير المراجعة
// ──────────────────────────────────────────────────────────────
export async function getUnreviewedVouchers(bizId: number, filters: ForensicFilters = {}): Promise<UnreviewedVoucher[]> {
  const dateCond = buildDateCond(filters.dateFrom, filters.dateTo);

  const result = await db.execute(sql`
    SELECT
      v.id,
      v.voucher_number,
      v.voucher_type,
      CAST(v.amount AS NUMERIC)                      AS amount,
      v.description,
      v.voucher_date::text                           AS voucher_date,
      v.created_at::text                             AS created_at,
      EXTRACT(DAY FROM NOW() - v.created_at)::int    AS days_old
    FROM vouchers v
    WHERE v.business_id = ${bizId}
      AND v.status = 'unreviewed'
    ${dateCond}
    ORDER BY v.created_at ASC
    LIMIT 100
  `);

  const rows: any[] = Array.isArray(result) ? result : (result as any).rows || [];

  return rows.map(r => ({
    id:            Number(r.id),
    voucherNumber: String(r.voucher_number),
    voucherType:   String(r.voucher_type),
    amount:        Number(r.amount),
    description:   r.description ? String(r.description) : null,
    voucherDate:   String(r.voucher_date),
    createdAt:     String(r.created_at),
    daysOld:       Number(r.days_old),
  }));
}
