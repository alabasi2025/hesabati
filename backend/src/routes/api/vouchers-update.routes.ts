/**
 * vouchers-update.routes.ts — Phase 13
 * تعديل + تغيير حالة السندات: PUT + POST /status
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc, sql, and, inArray, asc, count } from 'drizzle-orm';
import {
  businesses, vouchers, currencies, operationTypes, operationTypeAccounts,
  accounts, accountBalances, funds, fundBalances,
  fundTypes, bankTypes, exchangeTypes, eWalletTypes,
  operationCategories,
  journalEntries, journalEntryLines,
  users, auditLog,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, parseId, toErrorMessage } from '../../middleware/helpers.ts';
import { validateBody, voucherMultiSchema } from '../../middleware/validation.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getNextSequence, getCurrentSequence, TYPE_PREFIXES, getNextItemInCategorySequence } from '../../middleware/sequencing.ts';
import { postMultiTransaction, postTransaction, confirmDraftTransaction, cancelTransaction } from '../../engines/transaction.engine.ts';
import { wsService } from '../../services/websocket.service.ts';
import { normalizeDbResult, getFirstRow } from '../../utils/db-result.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { logAction } from '../../engines/audit.engine.ts';
import type { AppContext } from './_shared/types.ts';
import { normalizeTreasuryCode, resolveVoucherTreasuryInfo } from './_vouchers-helpers.ts';

const vouchersUpdateRouter = new Hono();

vouchersUpdateRouter.put('/businesses/:bizId/vouchers/:id', bizAuthMiddleware(), safeHandler('تعديل سند', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c) ?? 0;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);

  const [existing] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!existing) return c.json({ error: 'السند غير موجود' }, 404);
  if (existing.status === 'reviewed') return c.json({ error: 'لا يمكن تعديل سند مراجع، قم بإلغاء المراجعة أولاً' }, 400);

  const body = await getBody(c);
  const parseOptionalId = (value: unknown): number | null => {
    const n = Number.parseInt(String(value ?? ''), 10);
    return Number.isInteger(n) && n > 0 ? n : null;
  };
  const parseOptionalAmount = (value: unknown): number | null => {
    const n = Number.parseFloat(String(value ?? ''));
    return Number.isFinite(n) && n > 0 ? n : null;
  };
  const addMapDelta = (map: Map<number, number>, idValue: number | null | undefined, amount: number) => {
    if (!idValue || !Number.isFinite(amount) || Math.abs(amount) < 0.000001) return;
    map.set(idValue, (map.get(idValue) || 0) + amount);
  };

  const wantsStructuralUpdate =
    Array.isArray(body.entries) ||
    body.voucherType !== undefined ||
    body.fromFundId !== undefined ||
    body.toFundId !== undefined ||
    body.fromAccountId !== undefined ||
    body.toAccountId !== undefined;

  // تحديث بسيط (بيانات الرأس فقط)
  if (!wantsStructuralUpdate) {
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (body.description !== undefined) updateData.description = body.description;
    if (body.reference !== undefined) updateData.reference = body.reference;
    if (body.amount !== undefined) updateData.amount = String(body.amount);
    if (body.voucherDate !== undefined) updateData.voucherDate = new Date(body.voucherDate);
    if (body.currencyId !== undefined) updateData.currencyId = parseOptionalId(body.currencyId) || existing.currencyId;

    const [updated] = await db.update(vouchers).set(updateData).where(eq(vouchers.id, id)).returning();
    await logAction({ userId, businessId: bizId, action: 'update', tableName: 'vouchers', recordId: id, oldData: { description: existing.description, amount: existing.amount }, newData: updateData }).catch(() => {});
    return c.json(updated);
  }

  const voucherType = String(body.voucherType || existing.voucherType || '').toLowerCase();
  if (voucherType !== 'receipt' && voucherType !== 'payment') {
    return c.json({ error: 'نوع السند غير مدعوم للتعديل الهيكلي' }, 400);
  }

  const baseDescription = String(body.description ?? existing.description ?? '').trim();
  const reference = body.reference !== undefined ? (String(body.reference || '').trim() || null) : (existing.reference ?? null);
  const voucherDate = body.voucherDate ? new Date(String(body.voucherDate)) : new Date(existing.voucherDate || new Date());
  if (Number.isNaN(voucherDate.getTime())) return c.json({ error: 'تاريخ السند غير صالح' }, 400);
  const currencyId = parseOptionalId(body.currencyId) || existing.currencyId || 1;

  const providedEntries = Array.isArray(body.entries) ? body.entries : [];
  const counterpartEntries = providedEntries
    .map((entry: any) => ({
      accountId: parseOptionalId(entry?.accountId ?? entry?.toAccountId),
      amount: parseOptionalAmount(entry?.amount),
      notes: String(entry?.notes || '').trim() || null,
    }))
    .filter((entry: any) => Number.isInteger(entry.accountId) && Number.isFinite(entry.amount) && entry.amount > 0);
  if (counterpartEntries.length === 0) {
    return c.json({ error: 'أدخل سطراً واحداً على الأقل في بنود السند' }, 400);
  }
  const totalAmount = counterpartEntries.reduce((sum: number, entry: any) => sum + Number(entry.amount), 0);
  if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
    return c.json({ error: 'مجموع البنود غير صالح' }, 400);
  }
  const requestedAmount = parseOptionalAmount(body.amount);
  if (requestedAmount && Math.abs(requestedAmount - totalAmount) > 0.001) {
    return c.json({ error: 'مجموع البنود يجب أن يساوي مبلغ السند' }, 400);
  }

  const fundTreasuryId = voucherType === 'payment'
    ? parseOptionalId(body.fromFundId) ?? (existing.fromFundId ?? null)
    : parseOptionalId(body.toFundId) ?? (existing.toFundId ?? null);
  let accountTreasuryId = voucherType === 'payment'
    ? parseOptionalId(body.fromAccountId) ?? (existing.fromAccountId ?? null)
    : parseOptionalId(body.toAccountId) ?? (existing.toAccountId ?? null);

  const [systemFundAccount] = fundTreasuryId && !accountTreasuryId
    ? await db.select({ id: accounts.id })
      .from(accounts)
      .where(and(eq(accounts.businessId, bizId), eq(accounts.accountType, 'fund'), eq(accounts.notes, 'system_cash_treasury')))
      .limit(1)
    : [null];
  if (fundTreasuryId && !accountTreasuryId) {
    if (systemFundAccount?.id) {
      accountTreasuryId = systemFundAccount.id;
    } else {
      const [createdSystemAccount] = await db.insert(accounts).values({
        businessId: bizId,
        name: 'حساب الصناديق (آلي)',
        accountType: 'fund',
        canCreateVoucher: false,
        canApproveVoucher: false,
        isLeafAccount: true,
        notes: 'system_cash_treasury',
      }).returning({ id: accounts.id });
      accountTreasuryId = createdSystemAccount?.id ?? null;
    }
  }
  if (!accountTreasuryId) {
    return c.json({ error: 'الخزينة مطلوبة للتعديل' }, 400);
  }

  const accountIdsToValidate = Array.from(new Set<number>([
    accountTreasuryId,
    ...counterpartEntries.map((entry: any) => entry.accountId),
  ]));
  const validAccounts = await db
    .select({ id: accounts.id })
    .from(accounts)
    .where(and(eq(accounts.businessId, bizId), inArray(accounts.id, accountIdsToValidate)));
  if (validAccounts.length !== accountIdsToValidate.length) {
    return c.json({ error: 'أحد الحسابات المختارة لا ينتمي لنفس العمل' }, 400);
  }
  if (fundTreasuryId) {
    const [fundRow] = await db
      .select({ id: funds.id })
      .from(funds)
      .where(and(eq(funds.businessId, bizId), eq(funds.id, fundTreasuryId)))
      .limit(1);
    if (!fundRow) return c.json({ error: 'الخزينة المختارة غير صالحة' }, 400);
  }

  const counterpartLineType: 'debit' | 'credit' = voucherType === 'payment' ? 'debit' : 'credit';
  const treasuryLineType: 'debit' | 'credit' = voucherType === 'payment' ? 'credit' : 'debit';
  const newLines = [
    ...counterpartEntries.map((entry: any, index: number) => ({
      accountId: entry.accountId as number,
      lineType: counterpartLineType,
      amount: Number(entry.amount),
      description: [baseDescription, entry.notes].filter(Boolean).join(' - ') || null,
      sortOrder: index,
    })),
    {
      accountId: accountTreasuryId,
      lineType: treasuryLineType,
      amount: totalAmount,
      description: baseDescription || null,
      sortOrder: counterpartEntries.length,
    },
  ];

  const [existingEntry] = await db
    .select({ id: journalEntries.id })
    .from(journalEntries)
    .where(and(eq(journalEntries.businessId, bizId), eq(journalEntries.reference, existing.voucherNumber)))
    .limit(1);
  const oldLines = existingEntry?.id
    ? await db
      .select({
        accountId: journalEntryLines.accountId,
        lineType: journalEntryLines.lineType,
        amount: journalEntryLines.amount,
      })
      .from(journalEntryLines)
      .where(eq(journalEntryLines.journalEntryId, existingEntry.id))
    : [];
  const oldTotal = Number.parseFloat(String(existing.amount || 0));

  const result = await db.transaction(async (tx) => {
    const accountDelta = new Map<number, number>();
    for (const line of oldLines) {
      const amount = Number.parseFloat(String(line.amount || 0));
      const signed = line.lineType === 'debit' ? amount : -amount;
      addMapDelta(accountDelta, line.accountId, -signed);
    }
    if (oldLines.length === 0) {
      if (existing.toAccountId) addMapDelta(accountDelta, existing.toAccountId, -oldTotal);
      if (existing.fromAccountId) addMapDelta(accountDelta, existing.fromAccountId, oldTotal);
    }
    for (const line of newLines) {
      const signed = line.lineType === 'debit' ? line.amount : -line.amount;
      addMapDelta(accountDelta, line.accountId, signed);
    }

    const fundDelta = new Map<number, number>();
    if (existing.toFundId) addMapDelta(fundDelta, existing.toFundId, -oldTotal);
    if (existing.fromFundId) addMapDelta(fundDelta, existing.fromFundId, oldTotal);
    if (voucherType === 'receipt' && fundTreasuryId) addMapDelta(fundDelta, fundTreasuryId, totalAmount);
    if (voucherType === 'payment' && fundTreasuryId) addMapDelta(fundDelta, fundTreasuryId, -totalAmount);

    for (const [accountId, delta] of accountDelta.entries()) {
      if (Math.abs(delta) < 0.000001) continue;
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${accountId}, ${currencyId}, ${delta})
        ON CONFLICT (account_id, currency_id) DO UPDATE SET
          balance = account_balances.balance + ${delta},
          updated_at = NOW()
      `);
    }
    for (const [fundId, delta] of fundDelta.entries()) {
      if (Math.abs(delta) < 0.000001) continue;
      await tx.execute(sql`
        INSERT INTO fund_balances (fund_id, currency_id, balance)
        VALUES (${fundId}, ${currencyId}, ${delta})
        ON CONFLICT (fund_id, currency_id) DO UPDATE SET
          balance = fund_balances.balance + ${delta},
          updated_at = NOW()
      `);
    }

    const voucherUpdateData: Record<string, unknown> = {
      updatedAt: new Date(),
      voucherType,
      amount: String(totalAmount),
      currencyId,
      description: baseDescription,
      reference,
      voucherDate,
      fromAccountId: voucherType === 'payment' ? accountTreasuryId : null,
      toAccountId: voucherType === 'receipt' ? accountTreasuryId : null,
      fromFundId: voucherType === 'payment' ? fundTreasuryId : null,
      toFundId: voucherType === 'receipt' ? fundTreasuryId : null,
      hasMultipleLines: true,
    };
    const [updatedVoucher] = await tx.update(vouchers).set(voucherUpdateData).where(eq(vouchers.id, id)).returning();

    const entryDate = voucherDate.toISOString().slice(0, 10);
    let entryId = existingEntry?.id ?? null;
    if (entryId) {
      await tx.update(journalEntries).set({
        entryDate,
        description: baseDescription || existing.description || '',
        totalDebit: String(totalAmount),
        totalCredit: String(totalAmount),
        updatedAt: new Date(),
      }).where(eq(journalEntries.id, entryId));
      await tx.delete(journalEntryLines).where(eq(journalEntryLines.journalEntryId, entryId));
    } else {
      const [createdEntry] = await tx.insert(journalEntries).values({
        businessId: bizId,
        entryNumber: `JE-${existing.voucherNumber}`,
        entryDate,
        description: baseDescription || '',
        reference: existing.voucherNumber,
        operationTypeId: updatedVoucher.operationTypeId || null,
        totalDebit: String(totalAmount),
        totalCredit: String(totalAmount),
        isBalanced: true,
        createdBy: userId,
      }).returning({ id: journalEntries.id });
      entryId = createdEntry?.id ?? null;
    }
    if (entryId) {
      for (const line of newLines) {
        await tx.insert(journalEntryLines).values({
          journalEntryId: entryId,
          accountId: line.accountId,
          lineType: line.lineType,
          amount: String(line.amount),
          description: line.description,
          sortOrder: line.sortOrder,
        });
      }
    }

    await tx.insert(auditLog).values({
      userId,
      businessId: bizId,
      action: 'update_voucher',
      tableName: 'vouchers',
      recordId: id,
      oldData: {
        amount: String(existing.amount),
        voucherType: existing.voucherType,
        fromAccountId: existing.fromAccountId,
        toAccountId: existing.toAccountId,
        fromFundId: existing.fromFundId,
        toFundId: existing.toFundId,
      },
      newData: {
        amount: String(totalAmount),
        voucherType,
        fromAccountId: voucherUpdateData.fromAccountId,
        toAccountId: voucherUpdateData.toAccountId,
        fromFundId: voucherUpdateData.fromFundId,
        toFundId: voucherUpdateData.toFundId,
        entriesCount: counterpartEntries.length,
      },
    });

    return updatedVoucher;
  });

  return c.json(result);
}));

// 3. تغيير حالة السند (مسودة → معتمد → ملغي)

vouchersUpdateRouter.post('/businesses/:bizId/vouchers/:id/status', bizAuthMiddleware(), safeHandler('تغيير حالة السند', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c) ?? 0;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);

  const body = await getBody(c);
  const newStatus = body.status;
  if (!['unreviewed', 'reviewed'].includes(newStatus)) {
    return c.json({ error: 'الحالة غير صالحة. القيم المسموحة: unreviewed, reviewed' }, 400);
  }

  const [existing] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!existing) return c.json({ error: 'السند غير موجود' }, 404);

  // التحقق من صحة التحول
  // لا قيود على تغيير الحالة بين unreviewed و reviewed

  try {
    if (existing.status === newStatus) {
      return c.json(existing);
    }

    // نقطة الترحيل الموحدة: اعتماد المسودة فقط عبر المحرك المالي.
    if (existing.status === 'unreviewed' && newStatus === 'reviewed') {
      const result = await confirmDraftTransaction(bizId, userId, id);
      return c.json(result.voucher);
    }

    // السماح بالرجوع من reviewed إلى unreviewed (إلغاء المراجعة)
    if (existing.status === 'reviewed' && newStatus === 'unreviewed') {
      const [updated] = await db.update(vouchers).set({
        status: newStatus as 'unreviewed', updatedAt: new Date(),
      }).where(eq(vouchers.id, id)).returning();
      await logAction({ userId, businessId: bizId, action: 'update', tableName: 'vouchers', recordId: id!, oldData: { status: 'reviewed' }, newData: { status: 'unreviewed' } }).catch(() => {});
      return c.json(updated);
    }

    // إلغاء السند المعتمد عبر المحرك المالي (يعكس الأثر دون إنشاء سند عكسي).
    // منطق الإلغاء محذوف - لا يوجد حالة ثالثة

    // حالات لا تتطلب أثر مالي (مثل draft -> cancelled).
    const [updated] = await db.update(vouchers).set({
      status: newStatus, updatedAt: new Date(),
    }).where(eq(vouchers.id, id!)).returning();

    await logAction({ userId, businessId: bizId, action: 'update', tableName: 'vouchers', recordId: id!, oldData: { status: existing.status }, newData: { status: newStatus } }).catch(() => {});
    return c.json(updated);
  } catch (err: unknown) {
    return c.json({ error: toErrorMessage(err) || 'فشل في تغيير حالة السند' }, 400);
  }
}));

// 4. جلب رصيد حساب (لعرضه أثناء إنشاء العملية)


export { vouchersUpdateRouter };
