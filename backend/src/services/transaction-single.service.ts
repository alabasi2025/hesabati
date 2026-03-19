/**
 * transaction-single.service.ts — Phase 15
 * تنفيذ معاملة مالية واحدة (postTransaction)
 */
/**
 * transaction-post.service.ts — Phase 7
 * تنفيذ المعاملات المالية (postTransaction + postMultiTransaction)
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

import { validateTransactionOwnership, getSequenceYear, generateVoucherNumberByTreasury, resolveTemplatePrefix, resolveTreasuryForVoucher } from "./transaction-helpers.ts";
import type { TransactionData, TransactionResult, TransactionLine, MultiTransactionData } from './transaction.types';

// ===================== الدالة الرئيسية: تنفيذ المعاملة =====================

/**
 * postTransaction - الدالة الرئيسية لتنفيذ أي معاملة مالية
 *
 * تنفذ كل الخطوات داخل Drizzle transaction لضمان Atomicity:
 *   1. إنشاء المستند المصدر (voucher)
 *   2. إنشاء القيد الرئيسي (journalEntry)
 *   3. إنشاء سطور القيد (journalEntryLines)
 *   4. تحديث أرصدة الحسابات (accountBalances)
 *   5. تحديث أرصدة الصناديق (fundBalances)
 *   6. تسجيل في سجل التدقيق (auditLog)
 */

export async function postTransaction(
  bizId: number,
  userId: number,
  data: TransactionData,
): Promise<TransactionResult> {
  // === الخطوة 0: التحقق الصارم من ملكية كل الكيانات لنفس bizId ===
  const ownershipError = await validateTransactionOwnership(bizId, data);
  if (ownershipError) {
    throw new Error(ownershipError);
  }

  // === تنفيذ العملية داخل transaction واحد ===
  const result = await db.transaction(async (tx) => {
    // --- 1. توليد رقم السند ---
    const seqYear = getSequenceYear(data.voucherDate);
    let voucherNumber = data.voucherNumber || null;
    let accountSequence: string | null = null;
    let templateSequence: string | null = null;

    if (data.voucherType === "receipt" || data.voucherType === "payment") {
      const gen = await generateVoucherNumberByTreasury(tx, bizId, data);
      voucherNumber = voucherNumber ?? gen.voucherNumber;
      accountSequence = gen.accountSequence;

      const tplPrefix = await resolveTemplatePrefix(
        tx,
        bizId,
        data.operationTypeId || null,
      );
      if (tplPrefix && data.operationTypeId) {
        const tCounter = `template_voucher_${data.voucherType}`;
        const tSeq = await getNextSequence(
          bizId,
          tCounter,
          data.operationTypeId,
          seqYear,
          tx,
        );
        templateSequence = `${tplPrefix}-${seqYear}-${tSeq}`;
      }
    } else {
      // fallback للأنواع الأخرى (transfer, journal) باستخدام محرك الترقيم
      if (!voucherNumber) {
        const prefix = TYPE_PREFIXES[data.voucherType] || "VCH";
        const counterType = `voucher_${data.voucherType}_fallback`;
        const seqVal = await getNextSequence(bizId, counterType, 0, seqYear, tx);
        voucherNumber = `${prefix}-${seqYear}-${String(seqVal).padStart(5, "0")}`;
      }
    }

    // --- 2. إنشاء المستند المصدر (السند) ---
    const [created] = await tx
      .insert(vouchers)
      .values({
        businessId: bizId,
        voucherNumber: voucherNumber!,
        voucherType: data.voucherType,
        status: "unreviewed",
        amount: String(data.amount),
        currencyId: data.currencyId,
        fromAccountId: data.creditAccountId || null,
        toAccountId: data.debitAccountId,
        fromFundId: data.fromFundId || null,
        toFundId: data.toFundId || null,
        stationId: data.stationId || null,
        employeeId: data.employeeId || null,
        supplierId: data.supplierId || null,
        operationTypeId: data.operationTypeId || null,
        description: data.description || "",
        reference: data.reference || null,
        voucherDate: data.voucherDate || new Date(),
        createdBy: userId,
        accountSequence,
        templateSequence,
        fullSequenceNumber: null,
      })
      .returning();

    // --- 3. إنشاء القيد المحاسبي المتوازن ---
    const entryDate = created.voucherDate
      ? new Date(created.voucherDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];
    const entryDesc = data.operationTypeName
      ? `${data.operationTypeName} - ${data.description || ""}`
      : `سند ${data.voucherType} - ${data.description || ""}`;

    const [entry] = await tx
      .insert(journalEntries)
      .values({
        businessId: bizId,
        entryNumber: `JE-${voucherNumber}`,
        entryDate,
        description: entryDesc,
        reference: voucherNumber,
        operationTypeId: data.operationTypeId || null,
        totalDebit: String(data.amount),
        totalCredit: String(data.amount),
        isBalanced: true,
        createdBy: userId,
      })
      .returning();

    // --- 4. إنشاء سطور القيد - الطرف المدين ---
    await tx.insert(journalEntryLines).values({
      journalEntryId: entry.id,
      accountId: data.debitAccountId,
      lineType: "debit",
      amount: String(data.amount),
      description: entryDesc,
      sortOrder: 0,
    });

    // --- 5. إنشاء سطور القيد - الطرف الدائن ---
    if (data.creditAccountId) {
      await tx.insert(journalEntryLines).values({
        journalEntryId: entry.id,
        accountId: data.creditAccountId,
        lineType: "credit",
        amount: String(data.amount),
        description: entryDesc,
        sortOrder: 1,
      });
    }

    // --- 6. تحديث أرصدة الحسابات ---
    await tx.execute(sql`
      INSERT INTO account_balances (account_id, currency_id, balance)
      VALUES (${data.debitAccountId}, ${data.currencyId}, ${data.amount})
      ON CONFLICT (account_id, currency_id) DO UPDATE SET
        balance = account_balances.balance + ${data.amount},
        updated_at = NOW()
    `);

    if (data.creditAccountId) {
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${data.creditAccountId}, ${data.currencyId}, ${-data.amount})
        ON CONFLICT (account_id, currency_id) DO UPDATE SET
          balance = account_balances.balance - ${data.amount},
          updated_at = NOW()
      `);
    }

    // --- 7. تحديث أرصدة الصناديق إن وجدت ---
    if (data.toFundId) {
      await tx.execute(sql`
        INSERT INTO fund_balances (fund_id, currency_id, balance)
        VALUES (${data.toFundId}, ${data.currencyId}, ${data.amount})
        ON CONFLICT (fund_id, currency_id) DO UPDATE SET
          balance = fund_balances.balance + ${data.amount},
          updated_at = NOW()
      `);
    }

    if (data.fromFundId) {
      await tx.execute(sql`
        INSERT INTO fund_balances (fund_id, currency_id, balance)
        VALUES (${data.fromFundId}, ${data.currencyId}, ${-data.amount})
        ON CONFLICT (fund_id, currency_id) DO UPDATE SET
          balance = fund_balances.balance - ${data.amount},
          updated_at = NOW()
      `);
    }

    // --- 8. سجل التدقيق ---
    await tx.insert(auditLog).values({
      userId,
      businessId: bizId,
      action: "create_voucher",
      tableName: "vouchers",
      recordId: created.id,
      newData: {
        voucherNumber,
        voucherType: data.voucherType,
        amount: String(data.amount),
        debitAccountId: data.debitAccountId,
        creditAccountId: data.creditAccountId,
        operationTypeId: data.operationTypeId,
        journalEntryId: entry.id,
      },
    });

    return { voucher: created, journalEntry: entry };
  });

  return result;
}

/**
 * postMultiTransaction - تنفيذ سند/معاملة متعددة السطور
 *
 * ينشئ سند واحد + قيد واحد + عدة سطور (مدين/دائن) بشكل متوازن.
 */
