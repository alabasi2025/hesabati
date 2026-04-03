/**
 * transaction-multi.service.ts — Phase 15
 * تنفيذ معاملة مالية متعددة الأطراف (postMultiTransaction)
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
  voucherLines,
  journalEntries,
  journalEntryLines,
  auditLog,
} from "../db/schema/index.ts";
import { getNextSequence, TYPE_PREFIXES } from "../middleware/sequencing.ts";
import {
  verifyAccountOwnership,
  verifyFundOwnership,
} from "../routes/api/_shared/ownership.ts";

import { validateMultiTransactionOwnership, computeBalancedTotals, getSequenceYear, generateVoucherNumberByTreasuryMulti, resolveTemplatePrefix, resolveTreasuryForMulti } from "./transaction-helpers.ts";
import type { TransactionData, TransactionResult, TransactionLine, MultiTransactionData } from './transaction.types';
import { updateSubledgerBalance } from '../engines/subledger.engine.ts';

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

export async function postMultiTransaction(
  bizId: number,
  userId: number,
  data: MultiTransactionData,
): Promise<TransactionResult> {
  if (!Array.isArray(data.lines) || data.lines.length < 2) {
    throw new Error("المعاملة متعددة السطور تتطلب سطرين على الأقل");
  }
  for (const l of data.lines) {
    if (!l.accountId) throw new Error("معرّف الحساب مطلوب لكل سطر");
    if (!["debit", "credit"].includes(l.lineType))
      throw new Error("نوع السطر غير صالح (debit/credit)");
    if (!Number.isFinite(l.amount) || l.amount <= 0)
      throw new Error("المبلغ يجب أن يكون رقماً موجباً");
  }

  const ownershipError = await validateMultiTransactionOwnership(bizId, data);
  if (ownershipError) throw new Error(ownershipError);

  const totals = computeBalancedTotals(data.lines);

  const result = await db.transaction(async (tx) => {
    // --- 1. توليد رقم السند ---
    const seqYear = getSequenceYear(data.voucherDate);
    let voucherNumber = data.voucherNumber || null;
    let accountSequence: string | null = null;
    let templateSequence: string | null = null;

    if (data.voucherType === "receipt" || data.voucherType === "payment") {
      const gen = await generateVoucherNumberByTreasuryMulti(tx, bizId, data);
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
      // fallback للأنواع الأخرى باستخدام محرك الترقيم
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
        amount: String(totals.total),
        currencyId: data.currencyId,
        fromAccountId: data.fromAccountId || null,
        toAccountId: data.toAccountId || null,
        fromFundId: data.fromFundId || null,
        toFundId: data.toFundId || null,
        stationId: data.stationId || null,
        employeeId: data.employeeId || null,
        supplierId: data.supplierId || null,
        operationTypeId: data.operationTypeId || null,
        description: data.description || "",
        reference: data.reference || null,
        voucherDate: data.voucherDate || new Date(),
        exchangeRate: data.exchangeRate ? String(data.exchangeRate) : null,
        createdBy: userId,
        accountSequence,
        templateSequence,
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
        totalDebit: String(totals.totalDebit),
        totalCredit: String(totals.totalCredit),
        isBalanced: true,
        createdBy: userId,
      })
      .returning();

    // --- 4. إدخال السطور + تحديث الأرصدة ---
    for (let i = 0; i < data.lines.length; i++) {
      const line = data.lines[i]!;
      await tx.insert(journalEntryLines).values({
        journalEntryId: entry.id,
        accountId: line.accountId,
        lineType: line.lineType,
        amount: String(line.amount),
        description: line.description ?? entryDesc,
        sortOrder: i,
      });

      const delta = line.lineType === "debit" ? line.amount : -line.amount;
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${line.accountId}, ${data.currencyId}, ${delta})
        ON CONFLICT (account_id, currency_id) DO UPDATE SET
          balance = account_balances.balance + ${delta},
          updated_at = NOW()
      `);

      // تحديث الدفتر الفرعي (subledger) للكيان المرتبط بالحساب
      await updateSubledgerBalance(tx, line.accountId, data.currencyId, delta);
    }

    // --- 4b. إدخال سطور السند (voucher_lines) مع بيانات الكيان ---
    if (data.voucherLineEntries && data.voucherLineEntries.length > 0) {
      for (const vle of data.voucherLineEntries) {
        await tx.insert(voucherLines).values({
          voucherId: created.id,
          accountId: vle.accountId,
          entityType: vle.entityType || null,
          entityId: vle.entityId || null,
          amount: String(vle.amount),
          description: vle.description || null,
          currencyId: data.currencyId,
          sortOrder: vle.sortOrder ?? 0,
        });
      }
    }

    // --- 5. تحديث أرصدة الصناديق إن وجدت ---
    if (data.toFundId) {
      await tx.execute(sql`
        INSERT INTO fund_balances (fund_id, currency_id, balance)
        VALUES (${data.toFundId}, ${data.currencyId}, ${totals.total})
        ON CONFLICT (fund_id, currency_id) DO UPDATE SET
          balance = fund_balances.balance + ${totals.total},
          updated_at = NOW()
      `);
    }
    if (data.fromFundId) {
      await tx.execute(sql`
        INSERT INTO fund_balances (fund_id, currency_id, balance)
        VALUES (${data.fromFundId}, ${data.currencyId}, ${-totals.total})
        ON CONFLICT (fund_id, currency_id) DO UPDATE SET
          balance = fund_balances.balance - ${totals.total},
          updated_at = NOW()
      `);
    }

    // --- 6. سجل التدقيق ---
    await tx.insert(auditLog).values({
      userId,
      businessId: bizId,
      action: "create_voucher",
      tableName: "vouchers",
      recordId: created.id,
      newData: {
        voucherNumber,
        voucherType: data.voucherType,
        amount: String(totals.total),
        operationTypeId: data.operationTypeId,
        journalEntryId: entry.id,
        linesCount: data.lines.length,
      },
    });

    return { voucher: created, journalEntry: entry };
  });

  return result;
}

