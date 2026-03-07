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

import { db } from '../db/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import {
  accounts, funds, fundTypes, bankTypes, exchangeTypes, eWalletTypes, operationTypes, vouchers,
  journalEntries, journalEntryLines,
  auditLog,
} from '../db/schema/index.ts';
import { getNextSequence, TYPE_PREFIXES } from '../middleware/sequencing.ts';
import { verifyAccountOwnership, verifyFundOwnership } from '../routes/api/_shared/ownership.ts';

// ===================== الأنواع (Types) =====================

/** بيانات المعاملة التي يستقبلها المحرك */
export interface TransactionData {
  /** نوع المعاملة: سند قبض، سند صرف، تحويل، قيد يومية */
  voucherType: 'receipt' | 'payment' | 'transfer' | 'journal';
  /** المبلغ */
  amount: number;
  /** معرّف العملة */
  currencyId: number;
  /** حساب المدين (الذي يزيد رصيده) */
  debitAccountId: number;
  /** حساب الدائن (الذي ينقص رصيده) - اختياري */
  creditAccountId?: number | null;
  /** صندوق الوارد (يزيد رصيده) - اختياري */
  toFundId?: number | null;
  /** صندوق الصادر (ينقص رصيده) - اختياري */
  fromFundId?: number | null;
  /** معرّف المحطة - اختياري */
  stationId?: number | null;
  /** معرّف الموظف - اختياري */
  employeeId?: number | null;
  /** معرّف المورد - اختياري */
  supplierId?: number | null;
  /** معرّف نوع العملية (القالب) - اختياري */
  operationTypeId?: number | null;
  /** اسم نوع العملية (للوصف) - اختياري */
  operationTypeName?: string | null;
  /** الوصف */
  description?: string;
  /** المرجع */
  reference?: string | null;
  /** تاريخ السند */
  voucherDate?: Date | null;
  /** رقم السند (إذا كان محدداً مسبقاً) */
  voucherNumber?: string | null;
}

/** نتيجة تنفيذ المعاملة */
export interface TransactionResult {
  voucher: any;
  journalEntry: any;
}

/** سطر قيد محاسبي (مدين/دائن) */
export interface TransactionLine {
  accountId: number;
  lineType: 'debit' | 'credit';
  amount: number;
  description?: string | null;
}

/** بيانات معاملة متعددة السطور (سند واحد بعدة سطور قيد) */
export interface MultiTransactionData {
  /** نوع المعاملة/السند */
  voucherType: 'receipt' | 'payment' | 'transfer' | 'journal';
  /** معرّف العملة */
  currencyId: number;
  /** سطور القيد */
  lines: TransactionLine[];
  /** صندوق الوارد (يزيد رصيده) - اختياري */
  toFundId?: number | null;
  /** صندوق الصادر (ينقص رصيده) - اختياري */
  fromFundId?: number | null;
  /** معرّف المحطة - اختياري */
  stationId?: number | null;
  /** معرّف الموظف - اختياري */
  employeeId?: number | null;
  /** معرّف المورد - اختياري */
  supplierId?: number | null;
  /** معرّف نوع العملية (القالب) - اختياري */
  operationTypeId?: number | null;
  /** اسم نوع العملية (للوصف) - اختياري */
  operationTypeName?: string | null;
  /** الوصف */
  description?: string;
  /** المرجع */
  reference?: string | null;
  /** تاريخ السند */
  voucherDate?: Date | null;
  /** رقم السند (إذا كان محدداً مسبقاً) */
  voucherNumber?: string | null;
  /** حقول عرضية داخل جدول vouchers (قد تكون متعددة في الواقع) */
  fromAccountId?: number | null;
  toAccountId?: number | null;
}

/** نتيجة عكس المعاملة */
export interface ReversalResult {
  originalVoucher: any;
  reversalVoucher: any;
  journalEntry: any;
}

// ===================== التحقق من الملكية (مستورد من _shared/ownership) =====================
// re-export للاستخدام الخارجي إن لزم
export { verifyAccountOwnership, verifyFundOwnership } from '../routes/api/_shared/ownership.ts';

/**
 * التحقق الصارم من ملكية كل الكيانات المالية في المعاملة لنفس bizId
 * يمنع أي معاملة تتضمن حسابات أو صناديق من عمل آخر
 */
async function validateTransactionOwnership(bizId: number, data: TransactionData): Promise<string | null> {
  if (data.debitAccountId) {
    const valid = await verifyAccountOwnership(data.debitAccountId, bizId);
    if (!valid) return `الحساب المدين (${data.debitAccountId}) لا ينتمي لهذا العمل`;
  }
  if (data.creditAccountId) {
    const valid = await verifyAccountOwnership(data.creditAccountId, bizId);
    if (!valid) return `الحساب الدائن (${data.creditAccountId}) لا ينتمي لهذا العمل`;
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

async function validateMultiTransactionOwnership(bizId: number, data: MultiTransactionData): Promise<string | null> {
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

function toCents(n: number): number {
  return Math.round((Number.isFinite(n) ? n : 0) * 100);
}

function computeBalancedTotals(lines: TransactionLine[]): { total: number; totalDebit: number; totalCredit: number } {
  const debitCents = lines
    .filter(l => l.lineType === 'debit')
    .reduce((s, l) => s + toCents(l.amount), 0);
  const creditCents = lines
    .filter(l => l.lineType === 'credit')
    .reduce((s, l) => s + toCents(l.amount), 0);

  if (debitCents <= 0) throw new Error('القيد يجب أن يحتوي على سطر مدين واحد على الأقل');
  if (creditCents <= 0) throw new Error('القيد يجب أن يحتوي على سطر دائن واحد على الأقل');
  if (debitCents !== creditCents) throw new Error('القيد غير متوازن: مجموع المدين لا يساوي مجموع الدائن');

  const total = debitCents / 100;
  return { total, totalDebit: total, totalCredit: total };
}

function getSequenceYear(d?: Date | null): number {
  return (d ?? new Date()).getFullYear();
}

type TreasuryKind = 'fund' | 'bank' | 'exchange' | 'e_wallet';

type TreasuryAccountType = 'bank' | 'exchange' | 'e_wallet';

interface TreasuryInfo {
  kind: TreasuryKind;
  kindCode: string;
  categoryNo: number;
  vaultNo: number;
  treasuryId: number;
}

function isTreasuryAccountType(t: unknown): t is TreasuryAccountType {
  return t === 'bank' || t === 'exchange' || t === 'e_wallet';
}

function requirePositiveInt(label: string, v: unknown): number {
  const n = typeof v === 'number' ? v : Number.parseInt(String(v ?? ''), 10);
  if (!Number.isInteger(n) || n <= 0) throw new Error(`${label} غير صالح`);
  return n;
}

/** التحقق من وجود رقم خزينة صالح مع رسالة تنبيه واضحة */
function requireVaultNumber(sequenceNumber: unknown, accountOrFundName: string, fromPage: string): number {
  const n = typeof sequenceNumber === 'number' ? sequenceNumber : Number.parseInt(String(sequenceNumber ?? ''), 10);
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error(
      `رقم الخزينة إلزامي ولا يمكن تركّه فارغاً. من فضلك عيّن رقماً تسلسلياً صحيحاً (عدد صحيح أكبر من 0) من صفحة «${fromPage}» للحساب/الصندوق «${accountOrFundName}».`
    );
  }
  return n;
}

async function resolveFundTreasury(tx: any, bizId: number, fundId: number): Promise<TreasuryInfo> {
  const [fund] = await tx.select({
    id: funds.id,
    name: funds.name,
    fundType: funds.fundType,
    sequenceNumber: funds.sequenceNumber,
  }).from(funds).where(and(eq(funds.id, fundId), eq(funds.businessId, bizId))).limit(1);
  if (!fund) throw new Error('الصندوق غير موجود أو لا ينتمي لهذا العمل');

  const vaultNo = requireVaultNumber(fund.sequenceNumber, fund.name, 'الصناديق');

  const [ft] = await tx.select({ sortOrder: fundTypes.sortOrder })
    .from(fundTypes)
    .where(and(eq(fundTypes.businessId, bizId), eq(fundTypes.subTypeKey, fund.fundType)))
    .limit(1);
  const categoryNo = requirePositiveInt('رقم تصنيف الصندوق', ft?.sortOrder);

  return {
    kind: 'fund',
    kindCode: TYPE_PREFIXES.fund || 'FND',
    categoryNo,
    vaultNo,
    treasuryId: fundId,
  };
}

async function resolveAccountTreasury(tx: any, bizId: number, accountId: number): Promise<TreasuryInfo> {
  const [acc] = await tx.select({
    id: accounts.id,
    name: accounts.name,
    accountType: accounts.accountType,
    subType: accounts.subType,
    sequenceNumber: accounts.sequenceNumber,
  }).from(accounts).where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId))).limit(1);
  if (!acc) throw new Error('الحساب غير موجود أو لا ينتمي لهذا العمل');
  if (!isTreasuryAccountType(acc.accountType)) {
    throw new Error('سندات القبض/الصرف يجب أن تكون مرتبطة بخزينة: صندوق/بنك/صراف/محفظة');
  }
  const subTypeKey = String(acc.subType ?? '').trim();
  if (!subTypeKey) throw new Error('تصنيف الخزينة مطلوب (subType)');
  const vaultNo = requireVaultNumber(acc.sequenceNumber, acc.name, 'الحسابات');

  let categoryNo = 0;
  let kind: TreasuryKind = 'bank';
  let kindCode = TYPE_PREFIXES.bank || 'BNK';

  if (acc.accountType === 'bank') {
    kind = 'bank';
    kindCode = TYPE_PREFIXES.bank || 'BNK';
    const [t] = await tx.select({ sortOrder: bankTypes.sortOrder }).from(bankTypes)
      .where(and(eq(bankTypes.businessId, bizId), eq(bankTypes.subTypeKey, subTypeKey))).limit(1);
    categoryNo = requirePositiveInt('رقم تصنيف البنك', t?.sortOrder);
  } else if (acc.accountType === 'exchange') {
    kind = 'exchange';
    kindCode = TYPE_PREFIXES.exchange || 'EXC';
    const [t] = await tx.select({ sortOrder: exchangeTypes.sortOrder }).from(exchangeTypes)
      .where(and(eq(exchangeTypes.businessId, bizId), eq(exchangeTypes.subTypeKey, subTypeKey))).limit(1);
    categoryNo = requirePositiveInt('رقم تصنيف الصراف', t?.sortOrder);
  } else {
    kind = 'e_wallet';
    kindCode = TYPE_PREFIXES.e_wallet || 'WLT';
    const [t] = await tx.select({ sortOrder: eWalletTypes.sortOrder }).from(eWalletTypes)
      .where(and(eq(eWalletTypes.businessId, bizId), eq(eWalletTypes.subTypeKey, subTypeKey))).limit(1);
    categoryNo = requirePositiveInt('رقم تصنيف المحفظة', t?.sortOrder);
  }

  return { kind, kindCode, categoryNo, vaultNo, treasuryId: accountId };
}

async function resolveTreasuryForVoucher(tx: any, bizId: number, data: TransactionData): Promise<TreasuryInfo> {
  if (data.voucherType === 'receipt') {
    if (data.toFundId) return resolveFundTreasury(tx, bizId, data.toFundId);
    return resolveAccountTreasury(tx, bizId, data.debitAccountId);
  }
  if (data.voucherType === 'payment') {
    if (data.fromFundId) return resolveFundTreasury(tx, bizId, data.fromFundId);
    if (!data.creditAccountId) throw new Error('الخزينة المصروف منها مطلوبة (fromAccountId/fromFundId)');
    return resolveAccountTreasury(tx, bizId, data.creditAccountId);
  }
  throw new Error('هذا المسار يدعم سندات القبض/الصرف فقط');
}

async function resolveTreasuryForMulti(tx: any, bizId: number, data: MultiTransactionData): Promise<TreasuryInfo> {
  if (data.voucherType === 'receipt') {
    if (data.toFundId) return resolveFundTreasury(tx, bizId, data.toFundId);
    if (!data.toAccountId) throw new Error('الخزينة المستلمة مطلوبة (toAccountId/toFundId)');
    return resolveAccountTreasury(tx, bizId, data.toAccountId);
  }
  if (data.voucherType === 'payment') {
    if (data.fromFundId) return resolveFundTreasury(tx, bizId, data.fromFundId);
    if (!data.fromAccountId) throw new Error('الخزينة المصروف منها مطلوبة (fromAccountId/fromFundId)');
    return resolveAccountTreasury(tx, bizId, data.fromAccountId);
  }
  throw new Error('هذا المسار يدعم سندات القبض/الصرف فقط');
}

async function generateVoucherNumberByTreasury(tx: any, bizId: number, data: TransactionData): Promise<{ voucherNumber: string; accountSequence: string }> {
  const year = getSequenceYear(data.voucherDate);
  const treasury = await resolveTreasuryForVoucher(tx, bizId, data);
  const counterType = `treasury_${treasury.kind}_${data.voucherType}`;
  const seq = await getNextSequence(bizId, counterType, treasury.treasuryId, year);
  const voucherSeq = seq; // يبدأ من 1
  const vPrefix = TYPE_PREFIXES[data.voucherType] || 'VCH';
  return {
    voucherNumber: `${vPrefix}-${treasury.kindCode}-${treasury.categoryNo}-${treasury.vaultNo}-${year}-${voucherSeq}`,
    accountSequence: `${treasury.categoryNo}-${treasury.vaultNo}-${year}-${voucherSeq}`,
  };
}

async function generateVoucherNumberByTreasuryMulti(tx: any, bizId: number, data: MultiTransactionData): Promise<{ voucherNumber: string; accountSequence: string }> {
  const year = getSequenceYear(data.voucherDate);
  const treasury = await resolveTreasuryForMulti(tx, bizId, data);
  const counterType = `treasury_${treasury.kind}_${data.voucherType}`;
  const seq = await getNextSequence(bizId, counterType, treasury.treasuryId, year);
  const voucherSeq = seq; // يبدأ من 1
  const vPrefix = TYPE_PREFIXES[data.voucherType] || 'VCH';
  return {
    voucherNumber: `${vPrefix}-${treasury.kindCode}-${treasury.categoryNo}-${treasury.vaultNo}-${year}-${voucherSeq}`,
    accountSequence: `${treasury.categoryNo}-${treasury.vaultNo}-${year}-${voucherSeq}`,
  };
}

async function resolveTemplatePrefix(tx: any, bizId: number, operationTypeId: number | null | undefined): Promise<string | null> {
  if (!operationTypeId) return null;
  const [row] = await tx.select({ code: operationTypes.code })
    .from(operationTypes)
    .where(and(eq(operationTypes.id, operationTypeId), eq(operationTypes.businessId, bizId)))
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
export async function postTransaction(
  bizId: number,
  userId: number,
  data: TransactionData
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

    if (data.voucherType === 'receipt' || data.voucherType === 'payment') {
      const gen = await generateVoucherNumberByTreasury(tx, bizId, data);
      voucherNumber = voucherNumber ?? gen.voucherNumber;
      accountSequence = gen.accountSequence;

      const tplPrefix = await resolveTemplatePrefix(tx, bizId, data.operationTypeId || null);
      if (tplPrefix && data.operationTypeId) {
        const tCounter = `template_voucher_${data.voucherType}`;
        const tSeq = await getNextSequence(bizId, tCounter, data.operationTypeId, seqYear);
        templateSequence = `${tplPrefix}-${seqYear}-${tSeq}`;
      }
    } else {
      // fallback (legacy) للأنواع الأخرى
      if (!voucherNumber) {
        const seqName = data.voucherType === 'transfer' ? 'voucher_transfer_seq' : 'voucher_receipt_seq';
        const prefix = TYPE_PREFIXES[data.voucherType] || 'VCH';
        const seqResult = await tx.execute(sql.raw(`SELECT nextval('${seqName}')`));
        const seqRows = Array.isArray(seqResult) ? seqResult : (seqResult as any).rows || [];
        const seqVal = Number.parseInt(String((seqRows[0] as any)?.nextval || 1), 10);
        voucherNumber = `${prefix}-${String(seqVal).padStart(5, '0')}`;
      }
    }

    // --- 2. إنشاء المستند المصدر (السند) ---
    const [created] = await tx.insert(vouchers).values({
      businessId: bizId,
      voucherNumber: voucherNumber!,
      voucherType: data.voucherType,
      status: 'confirmed',
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
      description: data.description || '',
      reference: data.reference || null,
      voucherDate: data.voucherDate || new Date(),
      createdBy: userId,
      accountSequence,
      templateSequence,
    }).returning();

    // --- 3. إنشاء القيد المحاسبي المتوازن ---
    const entryDate = created.voucherDate
      ? new Date(created.voucherDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
    const entryDesc = data.operationTypeName
      ? `${data.operationTypeName} - ${data.description || ''}`
      : `سند ${data.voucherType} - ${data.description || ''}`;

    const [entry] = await tx.insert(journalEntries).values({
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
    }).returning();

    // --- 4. إنشاء سطور القيد - الطرف المدين ---
    await tx.insert(journalEntryLines).values({
      journalEntryId: entry.id,
      accountId: data.debitAccountId,
      lineType: 'debit',
      amount: String(data.amount),
      description: entryDesc,
      sortOrder: 0,
    });

    // --- 5. إنشاء سطور القيد - الطرف الدائن ---
    if (data.creditAccountId) {
      await tx.insert(journalEntryLines).values({
        journalEntryId: entry.id,
        accountId: data.creditAccountId,
        lineType: 'credit',
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
      action: 'create_voucher',
      tableName: 'vouchers',
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
export async function postMultiTransaction(
  bizId: number,
  userId: number,
  data: MultiTransactionData
): Promise<TransactionResult> {
  if (!Array.isArray(data.lines) || data.lines.length < 2) {
    throw new Error('المعاملة متعددة السطور تتطلب سطرين على الأقل');
  }
  for (const l of data.lines) {
    if (!l.accountId) throw new Error('معرّف الحساب مطلوب لكل سطر');
    if (!['debit', 'credit'].includes(l.lineType)) throw new Error('نوع السطر غير صالح (debit/credit)');
    if (!Number.isFinite(l.amount) || l.amount <= 0) throw new Error('المبلغ يجب أن يكون رقماً موجباً');
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

    if (data.voucherType === 'receipt' || data.voucherType === 'payment') {
      const gen = await generateVoucherNumberByTreasuryMulti(tx, bizId, data);
      voucherNumber = voucherNumber ?? gen.voucherNumber;
      accountSequence = gen.accountSequence;

      const tplPrefix = await resolveTemplatePrefix(tx, bizId, data.operationTypeId || null);
      if (tplPrefix && data.operationTypeId) {
        const tCounter = `template_voucher_${data.voucherType}`;
        const tSeq = await getNextSequence(bizId, tCounter, data.operationTypeId, seqYear);
        templateSequence = `${tplPrefix}-${seqYear}-${tSeq}`;
      }
    } else {
      if (!voucherNumber) {
        const seqName = data.voucherType === 'transfer' ? 'voucher_transfer_seq' : 'voucher_receipt_seq';
        const prefix = TYPE_PREFIXES[data.voucherType] || 'VCH';
        const seqResult = await tx.execute(sql.raw(`SELECT nextval('${seqName}')`));
        const seqRows = Array.isArray(seqResult) ? seqResult : (seqResult as any).rows || [];
        const seqVal = Number.parseInt(String((seqRows[0] as any)?.nextval || 1), 10);
        voucherNumber = `${prefix}-${String(seqVal).padStart(5, '0')}`;
      }
    }

    // --- 2. إنشاء المستند المصدر (السند) ---
    const [created] = await tx.insert(vouchers).values({
      businessId: bizId,
      voucherNumber: voucherNumber!,
      voucherType: data.voucherType,
      status: 'confirmed',
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
      description: data.description || '',
      reference: data.reference || null,
      voucherDate: data.voucherDate || new Date(),
      createdBy: userId,
      accountSequence,
      templateSequence,
    }).returning();

    // --- 3. إنشاء القيد المحاسبي المتوازن ---
    const entryDate = created.voucherDate
      ? new Date(created.voucherDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
    const entryDesc = data.operationTypeName
      ? `${data.operationTypeName} - ${data.description || ''}`
      : `سند ${data.voucherType} - ${data.description || ''}`;

    const [entry] = await tx.insert(journalEntries).values({
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
    }).returning();

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

      const delta = line.lineType === 'debit' ? line.amount : -line.amount;
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${line.accountId}, ${data.currencyId}, ${delta})
        ON CONFLICT (account_id, currency_id) DO UPDATE SET
          balance = account_balances.balance + ${delta},
          updated_at = NOW()
      `);
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
      action: 'create_voucher',
      tableName: 'vouchers',
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

// ===================== إلغاء معاملة (Cancel) =====================

/**
 * cancelTransaction - إلغاء سند وعكس كل أرصدته
 */
export async function cancelTransaction(
  bizId: number,
  userId: number,
  voucherId: number
): Promise<{ success: boolean }> {

  const [existing] = await db.select().from(vouchers)
    .where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)));

  if (!existing) throw new Error('سند غير موجود أو لا ينتمي لهذا العمل');
  if (existing.status === 'cancelled') throw new Error('السند ملغي مسبقاً');

  const amount = parseFloat(String(existing.amount));
  const currencyId = existing.currencyId || 1;

  await db.transaction(async (tx) => {
    await tx.update(vouchers).set({
      status: 'cancelled',
      updatedAt: new Date(),
    }).where(eq(vouchers.id, voucherId));

    // نستخدم سطور القيد إن وجدت (تدعم السندات متعددة السطور)
    const [entry] = await tx.select({ id: journalEntries.id }).from(journalEntries)
      .where(and(eq(journalEntries.businessId, bizId), eq(journalEntries.reference, existing.voucherNumber)))
      .limit(1);

    if (entry?.id) {
      const lines = await tx.select({
        accountId: journalEntryLines.accountId,
        lineType: journalEntryLines.lineType,
        lineAmount: journalEntryLines.amount,
      }).from(journalEntryLines).where(eq(journalEntryLines.journalEntryId, entry.id));

      for (const l of lines) {
        const lineAmount = parseFloat(String(l.lineAmount));
        const delta = l.lineType === 'debit' ? -lineAmount : lineAmount;
        await tx.execute(sql`
          INSERT INTO account_balances (account_id, currency_id, balance)
          VALUES (${l.accountId}, ${currencyId}, ${delta})
          ON CONFLICT (account_id, currency_id) DO UPDATE SET
            balance = account_balances.balance + ${delta},
            updated_at = NOW()
        `);
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
      action: 'cancel_voucher',
      tableName: 'vouchers',
      recordId: voucherId,
      oldData: {
        voucherNumber: existing.voucherNumber,
        amount: String(amount),
        status: 'confirmed',
      },
      newData: { status: 'cancelled' },
    });
  });

  return { success: true };
}

// ===================== عكس معاملة (Reverse) =====================

/**
 * reverseTransaction - إنشاء سند عكسي لسند موجود
 */
export async function reverseTransaction(
  bizId: number,
  userId: number,
  voucherId: number,
  reason: string
): Promise<ReversalResult> {

  const [original] = await db.select().from(vouchers)
    .where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)));

  if (!original) throw new Error('سند غير موجود أو لا ينتمي لهذا العمل');
  if (original.status === 'cancelled') throw new Error('لا يمكن عكس سند ملغي');
  if (original.reversalStatus === 'reversed') throw new Error('هذا السند معكوس مسبقاً');

  const amount = parseFloat(String(original.amount));
  const currencyId = original.currencyId || 1;

  const result = await db.transaction(async (tx) => {
    const [origEntry] = await tx.select({ id: journalEntries.id }).from(journalEntries)
      .where(and(eq(journalEntries.businessId, bizId), eq(journalEntries.reference, original.voucherNumber)))
      .limit(1);
    if (!origEntry?.id) throw new Error('القيد المحاسبي المرتبط غير موجود');

    const origLines = await tx.select({
      accountId: journalEntryLines.accountId,
      lineType: journalEntryLines.lineType,
      lineAmount: journalEntryLines.amount,
    }).from(journalEntryLines).where(eq(journalEntryLines.journalEntryId, origEntry.id));
    if (origLines.length < 2) throw new Error('القيد المحاسبي غير مكتمل ولا يمكن عكسه');

    const seqResult = await tx.execute(sql.raw(`SELECT nextval('voucher_reversal_seq')`));
    const seqRows = Array.isArray(seqResult) ? seqResult : (seqResult as any).rows || [];
    const seqVal = parseInt(String((seqRows[0] as any)?.nextval || 1));
    const voucherNumber = `REV-${String(seqVal).padStart(6, '0')}`;

    const [reversalVoucher] = await tx.insert(vouchers).values({
      businessId: bizId,
      voucherNumber,
      voucherType: original.voucherType,
      status: 'confirmed',
      amount: String(amount),
      currencyId,
      fromAccountId: original.toAccountId,
      toAccountId: original.fromAccountId,
      fromFundId: original.toFundId,
      toFundId: original.fromFundId,
      stationId: original.stationId,
      operationTypeId: original.operationTypeId,
      description: `عكس: ${original.description || ''} - ${reason}`,
      reference: original.voucherNumber,
      voucherDate: new Date(),
      createdBy: userId,
      reversalStatus: 'reversal',
      reversedVoucherId: original.id,
    }).returning();

    await tx.update(vouchers).set({
      reversalStatus: 'reversed',
      reversedVoucherId: reversalVoucher.id,
      reversalReason: reason,
      reversedAt: new Date(),
      reversedBy: userId,
      updatedAt: new Date(),
    }).where(eq(vouchers.id, voucherId));

    const entryDate = new Date().toISOString().split('T')[0];
    const [entry] = await tx.insert(journalEntries).values({
      businessId: bizId,
      entryNumber: `JE-${voucherNumber}`,
      entryDate,
      description: `عكس قيد: ${original.description || ''} - ${reason}`,
      reference: voucherNumber,
      operationTypeId: original.operationTypeId,
      totalDebit: String(amount),
      totalCredit: String(amount),
      isBalanced: true,
      createdBy: userId,
    }).returning();

    // إدخال سطور عكسية: قلب نوع السطر لكل حساب
    for (let i = 0; i < origLines.length; i++) {
      const l = origLines[i]!;
      const lineAmount = parseFloat(String(l.lineAmount));
      const reversedType = l.lineType === 'debit' ? 'credit' : 'debit';
      await tx.insert(journalEntryLines).values({
        journalEntryId: entry.id,
        accountId: l.accountId,
        lineType: reversedType,
        amount: String(lineAmount),
        description: `عكس - ${reason}`,
        sortOrder: i,
      });

      // تحديث الأرصدة: عكس أثر السطر الأصلي
      const delta = l.lineType === 'debit' ? -lineAmount : lineAmount;
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${l.accountId}, ${currencyId}, ${delta})
        ON CONFLICT (account_id, currency_id) DO UPDATE SET
          balance = account_balances.balance + ${delta},
          updated_at = NOW()
      `);
    }

    if (original.toFundId) {
      await tx.execute(sql`
        INSERT INTO fund_balances (fund_id, currency_id, balance)
        VALUES (${original.toFundId}, ${currencyId}, ${-amount})
        ON CONFLICT (fund_id, currency_id) DO UPDATE SET
          balance = fund_balances.balance - ${amount}, updated_at = NOW()
      `);
    }
    if (original.fromFundId) {
      await tx.execute(sql`
        INSERT INTO fund_balances (fund_id, currency_id, balance)
        VALUES (${original.fromFundId}, ${currencyId}, ${amount})
        ON CONFLICT (fund_id, currency_id) DO UPDATE SET
          balance = fund_balances.balance + ${amount}, updated_at = NOW()
      `);
    }

    await tx.insert(auditLog).values({
      userId,
      businessId: bizId,
      action: 'reverse_voucher',
      tableName: 'vouchers',
      recordId: original.id,
      oldData: {
        voucherNumber: original.voucherNumber,
        amount: String(amount),
        status: 'original',
      },
      newData: {
        reversalVoucherId: reversalVoucher.id,
        reversalVoucherNumber: voucherNumber,
        reason,
      },
    });

    return {
      originalVoucher: { ...original, reversalStatus: 'reversed' },
      reversalVoucher,
      journalEntry: entry,
    };
  });

  return result;
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
  voucherId: number
): Promise<{ voucher: any; journalEntry: any }> {

  const [existing] = await db.select().from(vouchers)
    .where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)));

  if (!existing) throw new Error('سند غير موجود أو لا ينتمي لهذا العمل');
  if (existing.status !== 'draft') throw new Error('يمكن اعتماد المسودات فقط');

  const amount = parseFloat(String(existing.amount));
  const currencyId = existing.currencyId || 1;
  const debitAccountId = existing.toAccountId;
  const creditAccountId = existing.fromAccountId;

  const result = await db.transaction(async (tx) => {
    const [updated] = await tx.update(vouchers).set({
      status: 'confirmed',
      updatedAt: new Date(),
    }).where(eq(vouchers.id, voucherId)).returning();

    const entryDate = existing.voucherDate
      ? new Date(existing.voucherDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    const [entry] = await tx.insert(journalEntries).values({
      businessId: bizId,
      entryNumber: `JE-${existing.voucherNumber}`,
      entryDate,
      description: existing.description || '',
      reference: existing.voucherNumber,
      operationTypeId: existing.operationTypeId || null,
      totalDebit: String(amount),
      totalCredit: String(amount),
      isBalanced: true,
      createdBy: userId,
    }).returning();

    if (debitAccountId) {
      await tx.insert(journalEntryLines).values({
        journalEntryId: entry.id,
        accountId: debitAccountId,
        lineType: 'debit',
        amount: String(amount),
        description: existing.description || '',
        sortOrder: 0,
      });
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${debitAccountId}, ${currencyId}, ${amount})
        ON CONFLICT (account_id, currency_id) DO UPDATE SET
          balance = account_balances.balance + ${amount}, updated_at = NOW()
      `);
    }

    if (creditAccountId) {
      await tx.insert(journalEntryLines).values({
        journalEntryId: entry.id,
        accountId: creditAccountId,
        lineType: 'credit',
        amount: String(amount),
        description: existing.description || '',
        sortOrder: 1,
      });
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${creditAccountId}, ${currencyId}, ${-amount})
        ON CONFLICT (account_id, currency_id) DO UPDATE SET
          balance = account_balances.balance - ${amount}, updated_at = NOW()
      `);
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
      action: 'confirm_draft_voucher',
      tableName: 'vouchers',
      recordId: voucherId,
      oldData: { status: 'draft' },
      newData: { status: 'confirmed' },
    });

    return { voucher: updated, journalEntry: entry };
  });

  return result;
}
