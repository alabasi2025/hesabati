/**
 * vouchers-update.routes.ts â€” Phase 13
 * طھط¹ط¯ظٹظ„ + طھط؛ظٹظٹط± ط­ط§ظ„ط© ط§ظ„ط³ظ†ط¯ط§طھ: PUT + POST /status
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc, sql, and, inArray, asc, count } from 'drizzle-orm';
import {
  businesses, vouchers, voucherLines, currencies, operationTypes, operationTypeAccounts,
  accounts, accountBalances, funds, fundBalances,
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
import { validateEntityAccountLinks, validateSubledgerAccountEntries } from './_shared/account-guards.ts';

const vouchersUpdateRouter = new Hono();

vouchersUpdateRouter.put('/businesses/:bizId/vouchers/:id', bizAuthMiddleware(), safeHandler('طھط¹ط¯ظٹظ„ ط³ظ†ط¯', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c) ?? 0;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ط³ظ†ط¯ ط؛ظٹط± طµط§ظ„ط­' }, 400);

  const [existing] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!existing) return c.json({ error: 'ط§ظ„ط³ظ†ط¯ ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  if (existing.status === 'reviewed') return c.json({ error: 'ظ„ط§ ظٹظ…ظƒظ† طھط¹ط¯ظٹظ„ ط³ظ†ط¯ ظ…ط±ط§ط¬ط¹طŒ ظ‚ظ… ط¨ط¥ظ„ط؛ط§ط، ط§ظ„ظ…ط±ط§ط¬ط¹ط© ط£ظˆظ„ط§ظ‹' }, 400);

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

  // طھط­ط¯ظٹط« ط¨ط³ظٹط· (ط¨ظٹط§ظ†ط§طھ ط§ظ„ط±ط£ط³ ظپظ‚ط·)
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
    return c.json({ error: 'ظ†ظˆط¹ ط§ظ„ط³ظ†ط¯ ط؛ظٹط± ظ…ط¯ط¹ظˆظ… ظ„ظ„طھط¹ط¯ظٹظ„ ط§ظ„ظ‡ظٹظƒظ„ظٹ' }, 400);
  }

  const baseDescription = String(body.description ?? existing.description ?? '').trim();
  const reference = body.reference !== undefined ? (String(body.reference || '').trim() || null) : (existing.reference ?? null);
  const voucherDate = body.voucherDate ? new Date(String(body.voucherDate)) : new Date(existing.voucherDate || new Date());
  if (Number.isNaN(voucherDate.getTime())) return c.json({ error: 'طھط§ط±ظٹط® ط§ظ„ط³ظ†ط¯ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const currencyId = parseOptionalId(body.currencyId) || existing.currencyId || 1;

  const providedEntries = Array.isArray(body.entries) ? body.entries : [];
  const counterpartEntries = providedEntries
    .map((entry: any) => ({
      accountId: parseOptionalId(entry?.accountId ?? entry?.toAccountId),
      amount: parseOptionalAmount(entry?.amount),
      notes: String(entry?.notes || '').trim() || null,
      entityType: entry?.entityType || null,
      entityId: entry?.entityId ? Number(entry.entityId) : null,
    }))
    .filter((entry: any) => Number.isInteger(entry.accountId) && Number.isFinite(entry.amount) && entry.amount > 0);
  if (counterpartEntries.length === 0) {
    return c.json({ error: 'ط£ط¯ط®ظ„ ط³ط·ط±ط§ظ‹ ظˆط§ط­ط¯ط§ظ‹ ط¹ظ„ظ‰ ط§ظ„ط£ظ‚ظ„ ظپظٹ ط¨ظ†ظˆط¯ ط§ظ„ط³ظ†ط¯' }, 400);
  }

  // ⛔ القاعدة الصارمة: حسابات subledger تتطلب entityId
  const subledgerError = await validateSubledgerAccountEntries(
    counterpartEntries.map((e: any) => ({ accountId: e.accountId, entityId: e.entityId }))
  );
  if (subledgerError) return c.json({ error: subledgerError }, 400);
  const totalAmount = counterpartEntries.reduce((sum: number, entry: any) => sum + Number(entry.amount), 0);
  if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
    return c.json({ error: 'ظ…ط¬ظ…ظˆط¹ ط§ظ„ط¨ظ†ظˆط¯ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  }
  const requestedAmount = parseOptionalAmount(body.amount);
  if (requestedAmount && Math.abs(requestedAmount - totalAmount) > 0.001) {
    return c.json({ error: 'ظ…ط¬ظ…ظˆط¹ ط§ظ„ط¨ظ†ظˆط¯ ظٹط¬ط¨ ط£ظ† ظٹط³ط§ظˆظٹ ظ…ط¨ظ„ط؛ ط§ظ„ط³ظ†ط¯' }, 400);
  }

  const fundTreasuryId = voucherType === 'payment'
    ? parseOptionalId(body.fromFundId) ?? (existing.fromFundId ?? null)
    : parseOptionalId(body.toFundId) ?? (existing.toFundId ?? null);
  let accountTreasuryId = voucherType === 'payment'
    ? parseOptionalId(body.fromAccountId) ?? (existing.fromAccountId ?? null)
    : parseOptionalId(body.toAccountId) ?? (existing.toAccountId ?? null);

  // عند اختيار صندوق كخزينة، نجلب الحساب المحاسبي المرتبط به مباشرة
  if (fundTreasuryId && !accountTreasuryId) {
    const [fundRow] = await db
      .select({ accountId: funds.accountId })
      .from(funds)
      .where(and(eq(funds.id, fundTreasuryId), eq(funds.businessId, bizId)))
      .limit(1);
    if (fundRow?.accountId) {
      accountTreasuryId = fundRow.accountId;
    } else {
      return c.json({ error: 'الصندوق المحدد غير مرتبط بحساب محاسبي. يرجى ربطه بحساب من شاشة الصناديق أولاً' }, 400);
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
    return c.json({ error: 'ط£ط­ط¯ ط§ظ„ط­ط³ط§ط¨ط§طھ ط§ظ„ظ…ط®طھط§ط±ط© ظ„ط§ ظٹظ†طھظ…ظٹ ظ„ظ†ظپط³ ط§ظ„ط¹ظ…ظ„' }, 400);
  }
  if (fundTreasuryId) {
    const [fundRow] = await db
      .select({ id: funds.id })
      .from(funds)
      .where(and(eq(funds.businessId, bizId), eq(funds.id, fundTreasuryId)))
      .limit(1);
    if (!fundRow) return c.json({ error: 'ط§ظ„ط®ط²ظٹظ†ط© ط§ظ„ظ…ط®طھط§ط±ط© ط؛ظٹط± طµط§ظ„ط­ط©' }, 400);
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

    // --- تحديث سطور السند (voucher_lines) مع بيانات الكيان ---
    await tx.delete(voucherLines).where(eq(voucherLines.voucherId, id));
    for (let i = 0; i < counterpartEntries.length; i++) {
      const ce = counterpartEntries[i];
      await tx.insert(voucherLines).values({
        voucherId: id,
        accountId: ce.accountId,
        entityType: ce.entityType || null,
        entityId: ce.entityId || null,
        amount: String(ce.amount),
        description: ce.notes || null,
        currencyId,
        sortOrder: i,
      });
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

// 3. طھط؛ظٹظٹط± ط­ط§ظ„ط© ط§ظ„ط³ظ†ط¯ (ظ…ط³ظˆط¯ط© â†’ ظ…ط¹طھظ…ط¯ â†’ ظ…ظ„ط؛ظٹ)

vouchersUpdateRouter.post('/businesses/:bizId/vouchers/:id/status', bizAuthMiddleware(), safeHandler('طھط؛ظٹظٹط± ط­ط§ظ„ط© ط§ظ„ط³ظ†ط¯', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c) ?? 0;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ط³ظ†ط¯ ط؛ظٹط± طµط§ظ„ط­' }, 400);

  const body = await getBody(c);
  const newStatus = body.status;
  if (!['unreviewed', 'reviewed'].includes(newStatus)) {
    return c.json({ error: 'ط§ظ„ط­ط§ظ„ط© ط؛ظٹط± طµط§ظ„ط­ط©. ط§ظ„ظ‚ظٹظ… ط§ظ„ظ…ط³ظ…ظˆط­ط©: unreviewed, reviewed' }, 400);
  }

  const [existing] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!existing) return c.json({ error: 'ط§ظ„ط³ظ†ط¯ ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);

  // ط§ظ„طھط­ظ‚ظ‚ ظ…ظ† طµط­ط© ط§ظ„طھط­ظˆظ„
  // ظ„ط§ ظ‚ظٹظˆط¯ ط¹ظ„ظ‰ طھط؛ظٹظٹط± ط§ظ„ط­ط§ظ„ط© ط¨ظٹظ† unreviewed ظˆ reviewed

  try {
    if (existing.status === newStatus) {
      return c.json(existing);
    }

    // ظ†ظ‚ط·ط© ط§ظ„طھط±ط­ظٹظ„ ط§ظ„ظ…ظˆط­ط¯ط©: ط§ط¹طھظ…ط§ط¯ ط§ظ„ظ…ط³ظˆط¯ط© ظپظ‚ط· ط¹ط¨ط± ط§ظ„ظ…ط­ط±ظƒ ط§ظ„ظ…ط§ظ„ظٹ.
    if (existing.status === 'unreviewed' && newStatus === 'reviewed') {
      const result = await confirmDraftTransaction(bizId, userId, id);
      return c.json(result.voucher);
    }

    // ط§ظ„ط³ظ…ط§ط­ ط¨ط§ظ„ط±ط¬ظˆط¹ ظ…ظ† reviewed ط¥ظ„ظ‰ unreviewed (ط¥ظ„ط؛ط§ط، ط§ظ„ظ…ط±ط§ط¬ط¹ط©)
    if (existing.status === 'reviewed' && newStatus === 'unreviewed') {
      const [updated] = await db.update(vouchers).set({
        status: newStatus as 'unreviewed', updatedAt: new Date(),
      }).where(eq(vouchers.id, id)).returning();
      await logAction({ userId, businessId: bizId, action: 'update', tableName: 'vouchers', recordId: id!, oldData: { status: 'reviewed' }, newData: { status: 'unreviewed' } }).catch(() => {});
      return c.json(updated);
    }

    // ط¥ظ„ط؛ط§ط، ط§ظ„ط³ظ†ط¯ ط§ظ„ظ…ط¹طھظ…ط¯ ط¹ط¨ط± ط§ظ„ظ…ط­ط±ظƒ ط§ظ„ظ…ط§ظ„ظٹ (ظٹط¹ظƒط³ ط§ظ„ط£ط«ط± ط¯ظˆظ† ط¥ظ†ط´ط§ط، ط³ظ†ط¯ ط¹ظƒط³ظٹ).
    // ظ…ظ†ط·ظ‚ ط§ظ„ط¥ظ„ط؛ط§ط، ظ…ط­ط°ظˆظپ - ظ„ط§ ظٹظˆط¬ط¯ ط­ط§ظ„ط© ط«ط§ظ„ط«ط©

    // ط­ط§ظ„ط§طھ ظ„ط§ طھطھط·ظ„ط¨ ط£ط«ط± ظ…ط§ظ„ظٹ (ظ…ط«ظ„ draft -> cancelled).
    const [updated] = await db.update(vouchers).set({
      status: newStatus, updatedAt: new Date(),
    }).where(eq(vouchers.id, id!)).returning();

    await logAction({ userId, businessId: bizId, action: 'update', tableName: 'vouchers', recordId: id!, oldData: { status: existing.status }, newData: { status: newStatus } }).catch(() => {});
    return c.json(updated);
  } catch (err: unknown) {
    return c.json({ error: toErrorMessage(err) || 'ظپط´ظ„ ظپظٹ طھط؛ظٹظٹط± ط­ط§ظ„ط© ط§ظ„ط³ظ†ط¯' }, 400);
  }
}));

// 4. ط¬ظ„ط¨ ط±طµظٹط¯ ط­ط³ط§ط¨ (ظ„ط¹ط±ط¶ظ‡ ط£ط«ظ†ط§ط، ط¥ظ†ط´ط§ط، ط§ظ„ط¹ظ…ظ„ظٹط©)


export { vouchersUpdateRouter };


