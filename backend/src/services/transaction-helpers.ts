import { db } from '../db/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import { accounts, funds, operationTypes, vouchers, journalEntries, journalEntryLines, auditLog } from '../db/schema/index.ts';
import { getNextSequence, TYPE_PREFIXES } from '../middleware/sequencing.ts';
import type { TransactionData, TransactionLine, MultiTransactionData } from './transaction.types.ts';

export async function validateTransactionOwnership(
  bizId: number,
  data: TransactionData,
): Promise<string | null> {
  if (data.debitAccountId) {
    const valid = await verifyAccountOwnership(data.debitAccountId, bizId);
    if (!valid)
      return `الحساب المدين (${data.debitAccountId}) لا ينتمي لهذا العمل`;
  }
  if (data.creditAccountId) {
    const valid = await verifyAccountOwnership(data.creditAccountId, bizId);
    if (!valid)
      return `الحساب الدائن (${data.creditAccountId}) لا ينتمي لهذا العمل`;
  }
  if (data.toFundId) {
    const valid = await verifyFundOwnership(data.toFundId, bizId);
    if (!valid) return `صندوق الوارد (${data.toFundId}) لا ينتمي لهذا العمل`;
  }
  if (data.fromFundId) {
    const valid = await verifyFundOwnership(data.fromFundId, bizId);
    if (!valid) return `صندوق الصادر (${data.fromFundId}) لا ينتمي لهذا العمل`;
  }
  return null;
}

export async function validateMultiTransactionOwnership(
  bizId: number,
  data: MultiTransactionData,
): Promise<string | null> {
  const accountIds = new Set<number>();
  for (const l of data.lines) accountIds.add(l.accountId);
  if (data.fromAccountId) accountIds.add(data.fromAccountId);
  if (data.toAccountId) accountIds.add(data.toAccountId);

  for (const id of accountIds) {
    const valid = await verifyAccountOwnership(id, bizId);
    if (!valid) return `الحساب (${id}) لا ينتمي لهذا العمل`;
  }
  if (data.toFundId) {
    const valid = await verifyFundOwnership(data.toFundId, bizId);
    if (!valid) return `صندوق الوارد (${data.toFundId}) لا ينتمي لهذا العمل`;
  }
  if (data.fromFundId) {
    const valid = await verifyFundOwnership(data.fromFundId, bizId);
    if (!valid) return `صندوق الصادر (${data.fromFundId}) لا ينتمي لهذا العمل`;
  }
  return null;
}

export function toCents(n: number): number {
  return Math.round((Number.isFinite(n) ? n : 0) * 100);
}

export function computeBalancedTotals(lines: TransactionLine[]): {
  total: number;
  totalDebit: number;
  totalCredit: number;
} {
  const debitCents = lines
    .filter((l) => l.lineType === "debit")
    .reduce((s, l) => s + toCents(l.amount), 0);
  const creditCents = lines
    .filter((l) => l.lineType === "credit")
    .reduce((s, l) => s + toCents(l.amount), 0);

  if (debitCents <= 0)
    throw new Error("القيد يجب أن يحتوي على سطر مدين واحد على الأقل");
  if (creditCents <= 0)
    throw new Error("القيد يجب أن يحتوي على سطر دائن واحد على الأقل");
  if (debitCents !== creditCents)
    throw new Error("القيد غير متوازن: مجموع المدين لا يساوي مجموع الدائن");

  const total = debitCents / 100;
  return { total, totalDebit: total, totalCredit: total };
}

export function getSequenceYear(d?: Date | null): number {
  return (d ?? new Date()).getFullYear();
}

type TreasuryKind = "fund" | "bank" | "exchange" | "e_wallet";

type TreasuryAccountType = "bank" | "exchange" | "e_wallet";

interface TreasuryInfo {
  kind: TreasuryKind;
  kindCode: string;
  treasuryCode: string;
  treasuryId: number;
}

export function isTreasuryAccountType(t: unknown): t is TreasuryAccountType {
  return t === "bank" || t === "exchange" || t === "e_wallet";
}

/** التحقق من وجود رقم خزينة صالح مع رسالة تنبيه واضحة */
export function requireVaultNumber(
  sequenceNumber: unknown,
  accountOrFundName: string,
  fromPage: string,
): number {
  const n =
    typeof sequenceNumber === "number"
      ? sequenceNumber
      : Number.parseInt(String(sequenceNumber ?? ""), 10);
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error(
      `رقم الخزينة إلزامي ولا يمكن تركّه فارغاً. من فضلك عيّن رقماً تسلسلياً صحيحاً (عدد صحيح أكبر من 0) من صفحة «${fromPage}» للحساب/الصندوق «${accountOrFundName}».`,
    );
  }
  return n;
}

export function resolveTreasuryCode(
  code: unknown,
  fallbackKind: TreasuryKind,
  sequenceNumber: unknown,
  treasuryName: string,
  fromPage: string,
): { kindCode: string; treasuryCode: string } {
  const normalizedCode = String(code ?? "").trim().toUpperCase();
  const matched = normalizedCode.match(/^([A-Z]+)-(\d+)$/);
  if (matched) {
    return {
      kindCode: matched[1]!,
      treasuryCode: `${matched[1]}-${matched[2]}`,
    };
  }

  const seq = requireVaultNumber(sequenceNumber, treasuryName, fromPage);
  const kindCode = TYPE_PREFIXES[fallbackKind] || fallbackKind.toUpperCase().substring(0, 3);
  return {
    kindCode,
    treasuryCode: `${kindCode}-${String(seq).padStart(2, "0")}`,
  };
}

export async function resolveFundTreasury(
  tx: any,
  bizId: number,
  fundId: number,
): Promise<TreasuryInfo> {
  const [fund] = await tx
    .select({
      id: funds.id,
      name: funds.name,
      code: funds.code,
      sequenceNumber: funds.sequenceNumber,
    })
    .from(funds)
    .where(and(eq(funds.id, fundId), eq(funds.businessId, bizId)))
    .limit(1);
  if (!fund) throw new Error("الصندوق غير موجود أو لا ينتمي لهذا العمل");

  const vaultNo = requireVaultNumber(
    fund.sequenceNumber,
    fund.name,
    "الصناديق",
  );
  const { kindCode, treasuryCode } = resolveTreasuryCode(
    fund.code,
    "fund",
    vaultNo,
    fund.name,
    "الصناديق",
  );

  return {
    kind: "fund",
    kindCode,
    treasuryCode,
    treasuryId: fundId,
  };
}

export async function resolveAccountTreasury(
  tx: any,
  bizId: number,
  accountId: number,
): Promise<TreasuryInfo> {
  const [acc] = await tx
    .select({
      id: accounts.id,
      name: accounts.name,
      accountType: accounts.accountType,
      code: accounts.code,
      sequenceNumber: accounts.sequenceNumber,
    })
    .from(accounts)
    .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
    .limit(1);
  if (!acc) throw new Error("الحساب غير موجود أو لا ينتمي لهذا العمل");
  if (!isTreasuryAccountType(acc.accountType)) {
    throw new Error(
      "سندات القبض/الصرف يجب أن تكون مرتبطة بخزينة: صندوق/بنك/صراف/محفظة",
    );
  }
  const vaultNo = requireVaultNumber(acc.sequenceNumber, acc.name, "الحسابات");
  let kind: TreasuryKind = "bank";
  if (acc.accountType === "bank") {
    kind = "bank";
  } else if (acc.accountType === "exchange") {
    kind = "exchange";
  } else {
    kind = "e_wallet";
  }

  const { kindCode, treasuryCode } = resolveTreasuryCode(
    acc.code,
    kind,
    vaultNo,
    acc.name,
    "الحسابات",
  );

  return { kind, kindCode, treasuryCode, treasuryId: accountId };
}

export async function resolveTreasuryForVoucher(
  tx: any,
  bizId: number,
  data: TransactionData,
): Promise<TreasuryInfo> {
  if (data.voucherType === "receipt") {
    if (data.toFundId) return resolveFundTreasury(tx, bizId, data.toFundId);
    return resolveAccountTreasury(tx, bizId, data.debitAccountId);
  }
  if (data.voucherType === "payment") {
    if (data.fromFundId) return resolveFundTreasury(tx, bizId, data.fromFundId);
    if (!data.creditAccountId)
      throw new Error("الخزينة المصروف منها مطلوبة (fromAccountId/fromFundId)");
    return resolveAccountTreasury(tx, bizId, data.creditAccountId);
  }
  throw new Error("هذا المسار يدعم سندات القبض/الصرف فقط");
}

export async function resolveTreasuryForMulti(
  tx: any,
  bizId: number,
  data: MultiTransactionData,
): Promise<TreasuryInfo> {
  if (data.voucherType === "receipt") {
    if (data.toFundId) return resolveFundTreasury(tx, bizId, data.toFundId);
    if (!data.toAccountId)
      throw new Error("الخزينة المستلمة مطلوبة (toAccountId/toFundId)");
    return resolveAccountTreasury(tx, bizId, data.toAccountId);
  }
  if (data.voucherType === "payment") {
    if (data.fromFundId) return resolveFundTreasury(tx, bizId, data.fromFundId);
    if (!data.fromAccountId)
      throw new Error("الخزينة المصروف منها مطلوبة (fromAccountId/fromFundId)");
    return resolveAccountTreasury(tx, bizId, data.fromAccountId);
  }
  throw new Error("هذا المسار يدعم سندات القبض/الصرف فقط");
}

export async function generateVoucherNumberByTreasury(
  tx: any,
  bizId: number,
  data: TransactionData,
): Promise<{ voucherNumber: string; accountSequence: string }> {
  const year = getSequenceYear(data.voucherDate);
  const treasury = await resolveTreasuryForVoucher(tx, bizId, data);
  const counterType = `treasury_${treasury.kind}_${data.voucherType}`;
  const seq = await getNextSequence(
    bizId,
    counterType,
    treasury.treasuryId,
    year,
    tx,
  );
  const voucherSeq = seq; // يبدأ من 1
  const vPrefix = TYPE_PREFIXES[data.voucherType] || "VCH";
  return {
    voucherNumber: `${vPrefix}-${treasury.treasuryCode}-${year}-${voucherSeq}`,
    accountSequence: `${treasury.treasuryCode}-${year}-${voucherSeq}`,
  };
}

export async function generateVoucherNumberByTreasuryMulti(
  tx: any,
  bizId: number,
  data: MultiTransactionData,
): Promise<{ voucherNumber: string; accountSequence: string }> {
  const year = getSequenceYear(data.voucherDate);
  const treasury = await resolveTreasuryForMulti(tx, bizId, data);
  const counterType = `treasury_${treasury.kind}_${data.voucherType}`;
  const seq = await getNextSequence(
    bizId,
    counterType,
    treasury.treasuryId,
    year,
    tx,
  );
  const voucherSeq = seq; // يبدأ من 1
  const vPrefix = TYPE_PREFIXES[data.voucherType] || "VCH";
  return {
    voucherNumber: `${vPrefix}-${treasury.treasuryCode}-${year}-${voucherSeq}`,
    accountSequence: `${treasury.treasuryCode}-${year}-${voucherSeq}`,
  };
}

export async function resolveTemplatePrefix(
  tx: any,
  bizId: number,
  operationTypeId: number | null | undefined,
): Promise<string | null> {
  if (!operationTypeId) return null;
  const [row] = await tx
    .select({ code: operationTypes.code })
    .from(operationTypes)
    .where(
      and(
        eq(operationTypes.id, operationTypeId),
        eq(operationTypes.businessId, bizId),
      ),
    )
    .limit(1);
  return row?.code ? String(row.code) : `OT${operationTypeId}`;
}

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
