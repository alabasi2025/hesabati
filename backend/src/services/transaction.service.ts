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
  accounts, funds, vouchers,
  journalEntries, journalEntryLines,
  accountBalances, fundBalances,
  auditLog,
} from '../db/schema/index.ts';
import { generateOperationSequences, TYPE_PREFIXES } from '../middleware/sequencing.ts';

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

/** نتيجة عكس المعاملة */
export interface ReversalResult {
  originalVoucher: any;
  reversalVoucher: any;
  journalEntry: any;
}

// ===================== دوال التحقق من الملكية =====================

/**
 * التحقق من أن الحساب ينتمي لنفس العمل (bizId)
 * هذه القاعدة الأساسية لمنع تسرب البيانات بين الأعمال
 */
export async function verifyAccountOwnership(accountId: number, bizId: number): Promise<boolean> {
  const [acc] = await db.select({ id: accounts.id }).from(accounts)
    .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)));
  return !!acc;
}

/**
 * التحقق من أن الصندوق ينتمي لنفس العمل (bizId)
 */
export async function verifyFundOwnership(fundId: number, bizId: number): Promise<boolean> {
  const [f] = await db.select({ id: funds.id }).from(funds)
    .where(and(eq(funds.id, fundId), eq(funds.businessId, bizId)));
  return !!f;
}

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
    let voucherNumber = data.voucherNumber;
    if (!voucherNumber) {
      const seqName = data.voucherType === 'receipt' ? 'voucher_receipt_seq'
        : data.voucherType === 'payment' ? 'voucher_payment_seq'
        : 'voucher_transfer_seq';
      const prefix = TYPE_PREFIXES[data.voucherType] || 'VCH';
      const seqResult = await tx.execute(sql.raw(`SELECT nextval('${seqName}')`));
      const seqRows = Array.isArray(seqResult) ? seqResult : (seqResult as any).rows || [];
      const seqVal = parseInt(String((seqRows[0] as any)?.nextval || 1));
      voucherNumber = `${prefix}-${String(seqVal).padStart(6, '0')}`;
    }

    // --- 1.1 توليد الأرقام التسلسلية الذكية (حساب + قالب) ---
    let accountSequence: string | null = null;
    let templateSequence: string | null = null;
    const primaryAccountId = data.debitAccountId;
    if (primaryAccountId) {
      const seqs = await generateOperationSequences(
        bizId, primaryAccountId, data.operationTypeId || null, 'voucher'
      );
      accountSequence = seqs.accountSequence ? String(seqs.accountSequence) : null;
      templateSequence = seqs.templateSequence ? String(seqs.templateSequence) : null;
    }

    // --- 2. إنشاء المستند المصدر (السند) ---
    const [created] = await tx.insert(vouchers).values({
      businessId: bizId,
      voucherNumber,
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

    if (existing.toAccountId) {
      await tx.execute(sql`
        UPDATE account_balances SET balance = balance - ${amount}, updated_at = NOW()
        WHERE account_id = ${existing.toAccountId} AND currency_id = ${currencyId}
      `);
    }
    if (existing.fromAccountId) {
      await tx.execute(sql`
        UPDATE account_balances SET balance = balance + ${amount}, updated_at = NOW()
        WHERE account_id = ${existing.fromAccountId} AND currency_id = ${currencyId}
      `);
    }
    if (existing.toFundId) {
      await tx.execute(sql`
        UPDATE fund_balances SET balance = balance - ${amount}, updated_at = NOW()
        WHERE fund_id = ${existing.toFundId} AND currency_id = ${currencyId}
      `);
    }
    if (existing.fromFundId) {
      await tx.execute(sql`
        UPDATE fund_balances SET balance = balance + ${amount}, updated_at = NOW()
        WHERE fund_id = ${existing.fromFundId} AND currency_id = ${currencyId}
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

    if (original.toAccountId) {
      await tx.insert(journalEntryLines).values({
        journalEntryId: entry.id,
        accountId: original.toAccountId,
        lineType: 'credit',
        amount: String(amount),
        description: `عكس - ${reason}`,
        sortOrder: 0,
      });
    }
    if (original.fromAccountId) {
      await tx.insert(journalEntryLines).values({
        journalEntryId: entry.id,
        accountId: original.fromAccountId,
        lineType: 'debit',
        amount: String(amount),
        description: `عكس - ${reason}`,
        sortOrder: 1,
      });
    }

    if (original.toAccountId) {
      await tx.execute(sql`
        UPDATE account_balances SET balance = balance - ${amount}, updated_at = NOW()
        WHERE account_id = ${original.toAccountId} AND currency_id = ${currencyId}
      `);
    }
    if (original.fromAccountId) {
      await tx.execute(sql`
        UPDATE account_balances SET balance = balance + ${amount}, updated_at = NOW()
        WHERE account_id = ${original.fromAccountId} AND currency_id = ${currencyId}
      `);
    }
    if (original.toFundId) {
      await tx.execute(sql`
        UPDATE fund_balances SET balance = balance - ${amount}, updated_at = NOW()
        WHERE fund_id = ${original.toFundId} AND currency_id = ${currencyId}
      `);
    }
    if (original.fromFundId) {
      await tx.execute(sql`
        UPDATE fund_balances SET balance = balance + ${amount}, updated_at = NOW()
        WHERE fund_id = ${original.fromFundId} AND currency_id = ${currencyId}
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
