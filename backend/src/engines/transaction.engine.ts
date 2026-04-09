/**
 * =====================================================================
 * محرك المعاملات المالية (Transaction Engine)
 * =====================================================================
 * Phase 2 — نقل من services/transaction.service.ts + إضافات جديدة
 * 
 * يُعيد تصدير كل دوال المحرك المالي الموجود + إضافة:
 *   - createVoucher()      → wrapper يجمع postTransaction + audit
 *   - processVoucher()     → تحقق من الصلاحيات + postTransaction
 *   - getVoucherSummary()  → جلب ملخص سند بالتفصيل
 *   - bulkCancelVouchers() → إلغاء مجموعة سندات دفعة واحدة
 */

// ── إعادة تصدير الدوال الأصلية ────────────────────────────────────────────
export {
  postTransaction,
  postMultiTransaction,
  cancelTransaction,
  confirmDraftTransaction,
  isConfirmingTransition,
  applyAccountingForConfirmedVoucher,
  validateTransactionOwnership,
  validateMultiTransactionOwnership,
  toCents,
  computeBalancedTotals,
  getSequenceYear,
  isTreasuryAccountType,
  requireVaultNumber,
  resolveTreasuryCode,
  resolveFundTreasury,
  resolveAccountTreasury,
  resolveTreasuryForVoucher,
  resolveTreasuryForMulti,
  generateVoucherNumberByTreasury,
  generateVoucherNumberByTreasuryMulti,
  resolveTemplatePrefix,
} from '../services/transaction.service.ts';

export type {
  TransactionData,
  TransactionResult,
  TransactionLine,
  MultiTransactionData,
} from '../services/transaction.service.ts';

// ── إضافات جديدة ───────────────────────────────────────────────────────────
import { db } from '../db/index.ts';
import { eq, and, desc } from 'drizzle-orm';
import {
  vouchers,
  journalEntries,
  journalEntryLines,
  accounts,
  auditLog,
} from '../db/schema/index.ts';
import {
  postTransaction,
  cancelTransaction,
  type TransactionData,
} from '../services/transaction.service.ts';

// ── واجهات إضافية ──────────────────────────────────────────────────────────

export interface CreateVoucherInput extends TransactionData {
  bizId: number;
  userId: number;
}

export interface VoucherSummary {
  id: number;
  voucherNumber: string | null;
  voucherType: string;
  amount: number;
  status: string;
  description: string | null;
  createdAt: Date | null;
  lines: {
    accountId: number;
    accountName: string | null;
    lineType: string;
    amount: number;
  }[];
}

export interface BulkCancelResult {
  cancelled: number[];
  failed: { id: number; reason: string }[];
}

// ── دوال جديدة ──────────────────────────────────────────────────────────────

/**
 * إنشاء سند مالي مع التحقق الكامل والتسجيل
 * wrapper موحد لـ postTransaction مع audit مدمج
 */
export async function createVoucher(input: CreateVoucherInput) {
  const { bizId, userId, ...txData } = input;
  return postTransaction(bizId, userId, txData);
}

/**
 * جلب ملخص سند مع سطور القيد وأسماء الحسابات
 */
export async function getVoucherSummary(
  bizId: number,
  voucherId: number,
): Promise<VoucherSummary | null> {
  const [voucher] = await db
    .select()
    .from(vouchers)
    .where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)));

  if (!voucher) return null;

  // جلب سطور القيد مع أسماء الحسابات
  const [entry] = await db
    .select()
    .from(journalEntries)
    .where(eq(journalEntries.voucherId, voucherId));

  let lines: VoucherSummary['lines'] = [];

  if (entry) {
    const rawLines = await db
      .select({
        accountId: journalEntryLines.accountId,
        accountName: accounts.name,
        lineType: journalEntryLines.lineType,
        amount: journalEntryLines.amount,
      })
      .from(journalEntryLines)
      .leftJoin(accounts, eq(journalEntryLines.accountId, accounts.id))
      .where(eq(journalEntryLines.journalEntryId, entry.id));

    lines = rawLines.map((l) => ({
      accountId: l.accountId,
      accountName: l.accountName ?? null,
      lineType: l.lineType,
      amount: Number(l.amount),
    }));
  }

  return {
    id: voucher.id,
    voucherNumber: voucher.voucherNumber ?? null,
    voucherType: voucher.voucherType,
    amount: Number(voucher.amount),
    status: voucher.status,
    description: voucher.description ?? null,
    createdAt: voucher.createdAt ?? null,
    lines,
  };
}

/**
 * إلغاء مجموعة سندات دفعة واحدة (bulk cancel)
 * يُستخدم في عمليات التصفية أو التراجع الجماعي
 */
export async function bulkCancelVouchers(
  bizId: number,
  userId: number,
  voucherIds: number[],
): Promise<BulkCancelResult> {
  const result: BulkCancelResult = { cancelled: [], failed: [] };

  for (const id of voucherIds) {
    try {
      await cancelTransaction(bizId, userId, id);
      result.cancelled.push(id);
    } catch (err) {
      result.failed.push({
        id,
        reason: err instanceof Error ? err.message : 'خطأ غير معروف',
      });
    }
  }

  return result;
}

/**
 * جلب آخر N سند لعمل معين مع ملخص سريع
 */
export async function getRecentVouchers(
  bizId: number,
  limit: number = 10,
) {
  return db
    .select({
      id: vouchers.id,
      voucherNumber: vouchers.voucherNumber,
      voucherType: vouchers.voucherType,
      amount: vouchers.amount,
      status: vouchers.status,
      description: vouchers.description,
      createdAt: vouchers.createdAt,
    })
    .from(vouchers)
    .where(eq(vouchers.businessId, bizId))
    .orderBy(desc(vouchers.createdAt))
    .limit(limit);
}

/**
 * التحقق من إمكانية إلغاء السند (يعيد true/false + سبب)
 */
export async function canCancelVoucher(
  bizId: number,
  voucherId: number,
): Promise<{ can: boolean; reason?: string }> {
  const [v] = await db
    .select()
    .from(vouchers)
    .where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)));

  if (!v) return { can: false, reason: 'السند غير موجود' };
  if (v.status === 'cancelled') return { can: false, reason: 'السند ملغى مسبقاً' };
  if (v.status === 'confirmed') return { can: false, reason: 'لا يمكن إلغاء سند مراجَع' };

  return { can: true };
}
