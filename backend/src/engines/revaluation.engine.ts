/**
 * محرك إعادة تقييم العملات (Currency Revaluation Engine)
 * =========================================================
 * يحسب فروقات أسعار الصرف على أرصدة الحسابات بالعملات الأجنبية
 * وينشئ قيوداً محاسبية تلقائية لتسجيل الأرباح/الخسائر غير المحققة.
 *
 * الخطوات:
 *  1. جلب جميع أرصدة الحسابات بعملات أجنبية
 *  2. لكل رصيد: حساب القيمة بالعملة الأساسية بالسعر القديم والجديد
 *  3. الفرق = ربح/خسارة غير محققة
 *  4. إنشاء قيد: مدين/دائن حساب فروقات العملة ← دائن/مدين الحساب الأصلي
 */

import { db } from "../db/index.ts";
import { eq, and, ne, sql } from "drizzle-orm";
import {
  currencies,
  accounts,
  accountBalances,
  journalEntries,
  journalEntryLines,
} from "../db/schema/index.ts";
import {
  getExchangeRate,
  requireExchangeDiffAccount,
  getBaseCurrency,
} from "./currency.engine.ts";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface RevaluationLine {
  accountId: number;
  accountName: string;
  currencyId: number;
  currencyCode: string;
  balance: number;
  oldBaseValue: number;
  newBaseValue: number;
  difference: number;
}

export interface RevaluationResult {
  date: string;
  baseCurrencyId: number;
  baseCurrencyCode: string;
  lines: RevaluationLine[];
  totalGain: number;
  totalLoss: number;
  netDifference: number;
  journalEntryId: number | null;
  skippedReason?: string;
}

// ─── Preview (dry-run) ─────────────────────────────────────────────────────

/**
 * معاينة إعادة التقييم بدون إنشاء قيود
 */
export async function previewRevaluation(
  bizId: number,
  date?: string,
): Promise<RevaluationResult> {
  const effectiveDate = date || new Date().toISOString().split("T")[0];
  const baseCurrency = await getBaseCurrency();
  if (!baseCurrency) {
    return emptyResult(effectiveDate, 0, "—", "لا توجد عملة أساسية محددة");
  }

  const diffCheck = await requireExchangeDiffAccount(bizId);
  if (!diffCheck.exists) {
    return emptyResult(effectiveDate, baseCurrency.id, baseCurrency.code, "لا يوجد حساب فروقات عملة");
  }

  const lines = await computeRevaluationLines(bizId, baseCurrency.id, effectiveDate);
  return buildResult(effectiveDate, baseCurrency.id, baseCurrency.code, lines, null);
}

// ─── Execute ────────────────────────────────────────────────────────────────

/**
 * تنفيذ إعادة التقييم وإنشاء القيد المحاسبي
 */
export async function executeRevaluation(
  bizId: number,
  userId: number,
  date?: string,
): Promise<RevaluationResult> {
  const effectiveDate = date || new Date().toISOString().split("T")[0];
  const baseCurrency = await getBaseCurrency();
  if (!baseCurrency) {
    return emptyResult(effectiveDate, 0, "—", "لا توجد عملة أساسية محددة");
  }

  const diffCheck = await requireExchangeDiffAccount(bizId);
  if (!diffCheck.exists || !diffCheck.accountId) {
    return emptyResult(effectiveDate, baseCurrency.id, baseCurrency.code, "لا يوجد حساب فروقات عملة");
  }

  const lines = await computeRevaluationLines(bizId, baseCurrency.id, effectiveDate);
  const significantLines = lines.filter(l => Math.abs(l.difference) >= 0.01);

  if (significantLines.length === 0) {
    return buildResult(effectiveDate, baseCurrency.id, baseCurrency.code, lines, null);
  }

  // إنشاء القيد داخل transaction
  const journalEntryId = await db.transaction(async (tx) => {
    const totalDiff = significantLines.reduce((s, l) => s + l.difference, 0);
    const absTotal = significantLines.reduce((s, l) => s + Math.abs(l.difference), 0);

    // إنشاء القيد الرئيسي
    const [entry] = await tx.insert(journalEntries).values({
      businessId: bizId,
      entryNumber: `REVAL-${effectiveDate}`,
      description: `إعادة تقييم العملات الأجنبية بتاريخ ${effectiveDate}`,
      entryDate: effectiveDate,
      reference: `REVAL-${effectiveDate}`,
      totalDebit: String(Math.round(absTotal * 100) / 100),
      totalCredit: String(Math.round(absTotal * 100) / 100),
      isBalanced: true,
      createdBy: userId,
      status: "confirmed",
    }).returning();

    let sortOrder = 0;
    const diffAccountId = diffCheck.accountId!;

    for (const line of significantLines) {
      const absDiff = Math.abs(line.difference);
      const roundedDiff = Math.round(absDiff * 100) / 100;

      if (line.difference > 0) {
        // ربح: مدين الحساب الأصلي، دائن حساب فروقات العملة
        await tx.insert(journalEntryLines).values({
          journalEntryId: entry.id,
          accountId: line.accountId,
          lineType: "debit",
          amount: String(roundedDiff),
          description: `إعادة تقييم ${line.currencyCode} — ربح صرف`,
          sortOrder: sortOrder++,
        });
        await tx.insert(journalEntryLines).values({
          journalEntryId: entry.id,
          accountId: diffAccountId,
          lineType: "credit",
          amount: String(roundedDiff),
          description: `إعادة تقييم ${line.currencyCode} — ربح صرف`,
          sortOrder: sortOrder++,
        });
      } else {
        // خسارة: مدين حساب فروقات العملة، دائن الحساب الأصلي
        await tx.insert(journalEntryLines).values({
          journalEntryId: entry.id,
          accountId: diffAccountId,
          lineType: "debit",
          amount: String(roundedDiff),
          description: `إعادة تقييم ${line.currencyCode} — خسارة صرف`,
          sortOrder: sortOrder++,
        });
        await tx.insert(journalEntryLines).values({
          journalEntryId: entry.id,
          accountId: line.accountId,
          lineType: "credit",
          amount: String(roundedDiff),
          description: `إعادة تقييم ${line.currencyCode} — خسارة صرف`,
          sortOrder: sortOrder++,
        });
      }

      // تحديث رصيد الحساب الأصلي بالعملة الأساسية
      const delta = Math.round(line.difference * 100) / 100;
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${line.accountId}, ${line.currencyId}, ${delta})
        ON CONFLICT (account_id, currency_id) DO UPDATE SET
          balance = account_balances.balance + ${delta},
          updated_at = NOW()
      `);

      // تحديث رصيد حساب فروقات العملة (عكس الاتجاه)
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${diffAccountId}, ${line.currencyId}, ${-delta})
        ON CONFLICT (account_id, currency_id) DO UPDATE SET
          balance = account_balances.balance + ${-delta},
          updated_at = NOW()
      `);
    }

    return entry.id;
  });

  return buildResult(effectiveDate, baseCurrency.id, baseCurrency.code, lines, journalEntryId);
}

// ─── Internal Helpers ───────────────────────────────────────────────────────

async function computeRevaluationLines(
  bizId: number,
  baseCurrencyId: number,
  date: string,
): Promise<RevaluationLine[]> {
  // جلب أرصدة الحسابات بعملات أجنبية
  const rows = await db
    .select({
      accountId: accountBalances.accountId,
      accountName: accounts.name,
      currencyId: accountBalances.currencyId,
      currencyCode: currencies.code,
      balance: accountBalances.balance,
    })
    .from(accountBalances)
    .innerJoin(accounts, eq(accounts.id, accountBalances.accountId))
    .innerJoin(currencies, eq(currencies.id, accountBalances.currencyId))
    .where(and(
      eq(accounts.businessId, bizId),
      ne(accountBalances.currencyId, baseCurrencyId),
    ));

  const lines: RevaluationLine[] = [];

  for (const row of rows) {
    const balance = parseFloat(String(row.balance ?? 0));
    if (Math.abs(balance) < 0.01) continue;

    // سعر اليوم
    const newRate = await getExchangeRate(bizId, row.currencyId, baseCurrencyId, date);
    // سعر "أمس" أو السعر المخزن سابقاً — نستخدم rate=1 كقيمة دفترية حالية
    // القيمة الدفترية = الرصيد × 1 (بالعملة نفسها)
    // القيمة الجديدة = الرصيد × سعر الصرف الجديد
    // الفرق = القيمة الجديدة - القيمة الدفترية
    const oldBaseValue = balance; // القيمة الدفترية الحالية
    const newBaseValue = Math.round(balance * newRate * 100) / 100;
    const difference = Math.round((newBaseValue - oldBaseValue) * 100) / 100;

    lines.push({
      accountId: row.accountId,
      accountName: row.accountName ?? "",
      currencyId: row.currencyId,
      currencyCode: row.currencyCode,
      balance,
      oldBaseValue,
      newBaseValue,
      difference,
    });
  }

  return lines;
}

function emptyResult(date: string, baseCurrencyId: number, baseCurrencyCode: string, reason: string): RevaluationResult {
  return {
    date,
    baseCurrencyId,
    baseCurrencyCode,
    lines: [],
    totalGain: 0,
    totalLoss: 0,
    netDifference: 0,
    journalEntryId: null,
    skippedReason: reason,
  };
}

function buildResult(
  date: string,
  baseCurrencyId: number,
  baseCurrencyCode: string,
  lines: RevaluationLine[],
  journalEntryId: number | null,
): RevaluationResult {
  const totalGain = lines.filter(l => l.difference > 0).reduce((s, l) => s + l.difference, 0);
  const totalLoss = lines.filter(l => l.difference < 0).reduce((s, l) => s + Math.abs(l.difference), 0);
  return {
    date,
    baseCurrencyId,
    baseCurrencyCode,
    lines,
    totalGain: Math.round(totalGain * 100) / 100,
    totalLoss: Math.round(totalLoss * 100) / 100,
    netDifference: Math.round((totalGain - totalLoss) * 100) / 100,
    journalEntryId,
  };
}
