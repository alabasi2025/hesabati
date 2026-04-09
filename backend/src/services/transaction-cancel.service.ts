/**
 * transaction-cancel.service.ts — Phase 7
 * إلغاء المعاملات واعتماد المسودات (cancelTransaction + confirmDraftTransaction)
 */
/**
 * =====================================================================
 * محرك القيود والمعاملات المركزي (Central Journaling & Transaction Engine)
 * =====================================================================
 *
 * الهدف: توحيد جميع العمليات المالية في مكان واحد لضمان الدقة والاتساق
 * ومنع تكرار الكود. كل العمليات المالية في النظام يجب أن تمر من هنا.
 *
 * القاعدة الأساسية: كل معاملة معزولة تمامًا داخل businessId واحد.
 * لا يمكن إجراء معاملة بين عملين مختلفين مباشرة.
 *
 * الخطوات الداخلية لكل معاملة (Atomic Transaction):
 *   1. التحقق من ملكية كل الحسابات والصناديق لنفس bizId
 *   2. إنشاء المستند المصدر (e.g., voucher)
 *   3. إنشاء القيد الرئيسي في journalEntries
 *   4. إنشاء سطور القيد في journalEntryLines
 *   5. تحديث الأرصدة في accountBalances و fundBalances
 *   6. تسجيل العملية في auditLog
 */

import { db } from "../db/index.ts";
import { eq, and, sql } from "drizzle-orm";
import {
  accounts,
  funds,
  operationTypes,
  vouchers,
  journalEntries,
  journalEntryLines,
  auditLog,
} from "../db/schema/index.ts";
import { getNextSequence, TYPE_PREFIXES } from "../middleware/sequencing.ts";
import {
  verifyAccountOwnership,
  verifyFundOwnership,
} from "../routes/api/_shared/ownership.ts";

import { validateTransactionOwnership, getSequenceYear, generateVoucherNumberByTreasury, resolveTemplatePrefix, computeBalancedTotals, resolveTreasuryForVoucher } from "./transaction-helpers.ts";
import type { TransactionData, TransactionResult } from './transaction.types';
import { applyAccountingForConfirmedVoucher } from './transaction-post.service';
import { updateSubledgerBalance } from '../engines/subledger.engine.ts';
import { fiscalPeriods } from '../db/schema/index.ts';

// ===================== إلغاء معاملة (Cancel) =====================

/**
 * cancelTransaction - إلغاء سند وعكس كل أرصدته
 */
export async function cancelTransaction(
  bizId: number,
  userId: number,
  voucherId: number,
): Promise<{ success: boolean }> {
  const [existing] = await db
    .select()
    .from(vouchers)
    .where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)));

  if (!existing) throw new Error("سند غير موجود أو لا ينتمي لهذا العمل");
  if (existing.status === "confirmed") throw new Error("لا يمكن إلغاء سند مراجع، قم بإلغاء المراجعة أولاً");

  const amount = parseFloat(String(existing.amount));
  const currencyId = existing.currencyId || 1;

  await db.transaction(async (tx) => {
    await tx
      .update(vouchers)
      .set({
        status: "cancelled",
        updatedAt: new Date(),
      })
      .where(eq(vouchers.id, voucherId));

    // نستخدم سطور القيد إن وجدت (تدعم السندات متعددة السطور)
    const [entry] = await tx
      .select({ id: journalEntries.id })
      .from(journalEntries)
      .where(
        and(
          eq(journalEntries.businessId, bizId),
          eq(journalEntries.reference, existing.voucherNumber),
        ),
      )
      .limit(1);

    if (entry?.id) {
      const lines = await tx
        .select({
          accountId: journalEntryLines.accountId,
          lineType: journalEntryLines.lineType,
          lineAmount: journalEntryLines.amount,
        })
        .from(journalEntryLines)
        .where(eq(journalEntryLines.journalEntryId, entry.id));

      for (const l of lines) {
        const lineAmount = parseFloat(String(l.lineAmount));
        const delta = l.lineType === "debit" ? -lineAmount : lineAmount;
        await tx.execute(sql`
          INSERT INTO account_balances (account_id, currency_id, balance)
          VALUES (${l.accountId}, ${currencyId}, ${delta})
          ON CONFLICT (account_id, currency_id) DO UPDATE SET
            balance = account_balances.balance + ${delta},
            updated_at = NOW()
        `);
        // ✅ إصلاح: عكس الدفاتر الفرعية (subledger) عند الإلغاء
        await updateSubledgerBalance(tx, l.accountId, currencyId, delta);
      }
    } else {
      // fallback للسندات القديمة/غير المتوقعة
      if (existing.toAccountId) {
        await tx.execute(sql`
          INSERT INTO account_balances (account_id, currency_id, balance)
          VALUES (${existing.toAccountId}, ${currencyId}, ${-amount})
          ON CONFLICT (account_id, currency_id) DO UPDATE SET
            balance = account_balances.balance - ${amount}, updated_at = NOW()
        `);
      }
      if (existing.fromAccountId) {
        await tx.execute(sql`
          INSERT INTO account_balances (account_id, currency_id, balance)
          VALUES (${existing.fromAccountId}, ${currencyId}, ${amount})
          ON CONFLICT (account_id, currency_id) DO UPDATE SET
            balance = account_balances.balance + ${amount}, updated_at = NOW()
        `);
      }
    }

    if (existing.toFundId) {
      await tx.execute(sql`
        INSERT INTO fund_balances (fund_id, currency_id, balance)
        VALUES (${existing.toFundId}, ${currencyId}, ${-amount})
        ON CONFLICT (fund_id, currency_id) DO UPDATE SET
          balance = fund_balances.balance - ${amount}, updated_at = NOW()
      `);
    }
    if (existing.fromFundId) {
      await tx.execute(sql`
        INSERT INTO fund_balances (fund_id, currency_id, balance)
        VALUES (${existing.fromFundId}, ${currencyId}, ${amount})
        ON CONFLICT (fund_id, currency_id) DO UPDATE SET
          balance = fund_balances.balance + ${amount}, updated_at = NOW()
      `);
    }

    await tx.insert(auditLog).values({
      userId,
      businessId: bizId,
      action: "cancel_voucher",
      tableName: "vouchers",
      recordId: voucherId,
      oldData: {
        voucherNumber: existing.voucherNumber,
        amount: String(amount),
        status: "cancelled",
      },
      newData: { status: "cancelled" },
    });
  });

  return { success: true };
}

// ===================== اعتماد مسودة (Confirm Draft) =====================

/**
 * confirmDraftTransaction - اعتماد سند مسودة وتنفيذ القيود المحاسبية
 *
 * يصحح الخلل الموجود في enhancements.ts حيث لم يكن يحدث أرصدة الصناديق
 */
export async function confirmDraftTransaction(
  bizId: number,
  userId: number,
  voucherId: number,
): Promise<{ voucher: any; journalEntry: any }> {
  const [existing] = await db
    .select()
    .from(vouchers)
    .where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)));

  if (!existing) throw new Error("سند غير موجود أو لا ينتمي لهذا العمل");
  if (existing.status === "confirmed") {
    const [existingEntry] = await db
      .select()
      .from(journalEntries)
      .where(
        and(
          eq(journalEntries.businessId, bizId),
          eq(journalEntries.reference, existing.voucherNumber),
        ),
      )
      .limit(1);
    return { voucher: existing, journalEntry: existingEntry ?? null };
  }
  if (existing.status !== "draft") throw new Error("السند ليس في حالة مسودة");

  const amount = parseFloat(String(existing.amount));
  const currencyId = existing.currencyId || 1;
  const debitAccountId = existing.toAccountId;
  const creditAccountId = existing.fromAccountId;

  const result = await db.transaction(async (tx) => {
    const [updated] = await tx
      .update(vouchers)
      .set({
        status: "confirmed",
        updatedAt: new Date(),
      })
      .where(eq(vouchers.id, voucherId))
      .returning();

    const entryDate = existing.voucherDate
      ? new Date(existing.voucherDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

    const [entry] = await tx
      .insert(journalEntries)
      .values({
        businessId: bizId,
        entryNumber: `JE-${existing.voucherNumber}`,
        entryDate,
        description: existing.description || "",
        reference: existing.voucherNumber,
        operationTypeId: existing.operationTypeId || null,
        totalDebit: String(amount),
        totalCredit: String(amount),
        isBalanced: true,
        createdBy: userId,
      })
      .returning();

    if (debitAccountId) {
      await tx.insert(journalEntryLines).values({
        journalEntryId: entry.id,
        accountId: debitAccountId,
        lineType: "debit",
        amount: String(amount),
        description: existing.description || "",
        sortOrder: 0,
      });
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${debitAccountId}, ${currencyId}, ${amount})
        ON CONFLICT (account_id, currency_id) DO UPDATE SET
          balance = account_balances.balance + ${amount}, updated_at = NOW()
      `);
      // ✅ إصلاح: تحديث الدفاتر الفرعية عند اعتماد المسودة
      await updateSubledgerBalance(tx, debitAccountId, currencyId, amount);
    }

    if (creditAccountId) {
      await tx.insert(journalEntryLines).values({
        journalEntryId: entry.id,
        accountId: creditAccountId,
        lineType: "credit",
        amount: String(amount),
        description: existing.description || "",
        sortOrder: 1,
      });
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${creditAccountId}, ${currencyId}, ${-amount})
        ON CONFLICT (account_id, currency_id) DO UPDATE SET
          balance = account_balances.balance - ${amount}, updated_at = NOW()
      `);
      // ✅ إصلاح: تحديث الدفاتر الفرعية عند اعتماد المسودة
      await updateSubledgerBalance(tx, creditAccountId, currencyId, -amount);
    }

    // تحديث أرصدة الصناديق (كان ناقصاً في enhancements.ts!)
    if (existing.toFundId) {
      await tx.execute(sql`
        INSERT INTO fund_balances (fund_id, currency_id, balance)
        VALUES (${existing.toFundId}, ${currencyId}, ${amount})
        ON CONFLICT (fund_id, currency_id) DO UPDATE SET
          balance = fund_balances.balance + ${amount}, updated_at = NOW()
      `);
    }
    if (existing.fromFundId) {
      await tx.execute(sql`
        INSERT INTO fund_balances (fund_id, currency_id, balance)
        VALUES (${existing.fromFundId}, ${currencyId}, ${-amount})
        ON CONFLICT (fund_id, currency_id) DO UPDATE SET
          balance = fund_balances.balance - ${amount}, updated_at = NOW()
      `);
    }

    await tx.insert(auditLog).values({
      userId,
      businessId: bizId,
      action: "confirm_draft_voucher",
      tableName: "vouchers",
      recordId: voucherId,
      oldData: { status: "draft" },
      newData: { status: "confirmed" },
    });

    return { voucher: updated, journalEntry: entry };
  });

  return result;
}

/** يُستخدم من workflow: هل الانتقال من مسودة إلى معتمد؟ */
export function isConfirmingTransition(fromStatus: string, toStatus: string): boolean {
  return fromStatus === "draft" && toStatus === "confirmed";
}

/** يُستخدم من workflow: تنفيذ القيد المحاسبي بعد اعتماد السند عبر سير العمل */
export async function applyAccountingForConfirmedVoucher(
  bizId: number,
  userId: number,
  voucherId: number,
): Promise<{ voucher: any; journalEntry: any }> {
  return confirmDraftTransaction(bizId, userId, voucherId);
}

