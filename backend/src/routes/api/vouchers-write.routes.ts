/**
 * vouchers-write.routes.ts — Phase 8
 * تعديل السندات: إنشاء + تعديل + تغيير الحالة
 */
import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { eq, desc, sql, and, inArray, asc, count } from 'drizzle-orm';
import {
  businesses, vouchers, currencies, operationTypes, operationTypeAccounts,
  accounts, accountBalances, funds, fundBalances,
  fundTypes, bankTypes, exchangeTypes, eWalletTypes,
  operationCategories,
  journalEntries, journalEntryLines,
  users, auditLog,
} from '../db/schema/index.ts';
import { bizAuthMiddleware } from '../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, getBody, parseId, toErrorMessage } from '../middleware/helpers.ts';
import { validateBody, voucherMultiSchema } from '../middleware/validation.ts';
import { checkPermission } from '../middleware/permissions.ts';
import { getNextSequence, getCurrentSequence, TYPE_PREFIXES, getNextItemInCategorySequence } from '../middleware/sequencing.ts';
import { postMultiTransaction, postTransaction, confirmDraftTransaction, cancelTransaction } from '../engines/transaction.engine.ts';
import { wsService } from '../services/websocket.service.ts';
import { normalizeDbResult, getFirstRow } from '../utils/db-result.ts';
import { getBizId, getUserId } from './api/_shared/context-helpers.ts';
import { logAction } from '../engines/audit.engine.ts';
import type { AppContext } from './api/_shared/types.ts';

interface PeriodStatsRow {
  receipts: string | number;
  payments: string | number;
  operations_count: string | number;
}

interface TreasuryPreviewInfo {
  kind: 'fund' | 'bank' | 'exchange' | 'e_wallet';
  kindCode: string;
  treasuryCode: string;
  treasuryId: number;
}

function normalizeTreasuryCode(
  code: unknown,
  fallbackKind: 'fund' | 'bank' | 'exchange' | 'e_wallet',
  sequenceNumber: unknown,
): { kindCode: string; treasuryCode: string } | null {
  const normalizedCode = String(code ?? '').trim().toUpperCase();
  const matched = normalizedCode.match(/^([A-Z]+)-(\d+)$/);
  if (matched) {
    return { kindCode: matched[1]!, treasuryCode: `${matched[1]}-${matched[2]}` };
  }
  const seq = typeof sequenceNumber === 'number'
    ? sequenceNumber
    : Number.parseInt(String(sequenceNumber ?? ''), 10);
  if (!Number.isInteger(seq) || seq <= 0) return null;
  const kindCode = TYPE_PREFIXES[fallbackKind] || fallbackKind.toUpperCase().substring(0, 3);
  return { kindCode, treasuryCode: `${kindCode}-${String(seq).padStart(2, '0')}` };
}


async function resolveVoucherTreasuryInfo(
  bizId: number,
  voucherType: string,
  fromFundId?: number | null,
  toFundId?: number | null,
  fromAccountId?: number | null,
  toAccountId?: number | null,
): Promise<TreasuryPreviewInfo | null> {
  if (voucherType === 'receipt') {
    if (toFundId) {
      const [fund] = await db.select({ id: funds.id, code: funds.code, sequenceNumber: funds.sequenceNumber })
        .from(funds).where(and(eq(funds.id, toFundId), eq(funds.businessId, bizId))).limit(1);
      if (!fund) return null;
      const normalized = normalizeTreasuryCode(fund.code, 'fund', fund.sequenceNumber);
      if (!normalized) return null;
      return { kind: 'fund', treasuryId: toFundId, ...normalized };
    }
    if (toAccountId) {
      const [account] = await db.select({ id: accounts.id, code: accounts.code, accountType: accounts.accountType, sequenceNumber: accounts.sequenceNumber })
        .from(accounts).where(and(eq(accounts.id, toAccountId), eq(accounts.businessId, bizId))).limit(1);
      if (!account) return null;
      const accountType = String(account.accountType);
      if (!['bank', 'exchange', 'e_wallet'].includes(accountType)) return null;
      const normalized = normalizeTreasuryCode(account.code, accountType as 'bank' | 'exchange' | 'e_wallet', account.sequenceNumber);
      if (!normalized) return null;
      return { kind: accountType as 'bank' | 'exchange' | 'e_wallet', treasuryId: toAccountId, ...normalized };
    }
    return null;
  }
  if (voucherType === 'payment') {
    if (fromFundId) {
      const [fund] = await db.select({ id: funds.id, code: funds.code, sequenceNumber: funds.sequenceNumber })
        .from(funds).where(and(eq(funds.id, fromFundId), eq(funds.businessId, bizId))).limit(1);
      if (!fund) return null;
      const normalized = normalizeTreasuryCode(fund.code, 'fund', fund.sequenceNumber);
      if (!normalized) return null;
      return { kind: 'fund', treasuryId: fromFundId, ...normalized };
    }
    if (fromAccountId) {
      const [account] = await db.select({ id: accounts.id, code: accounts.code, accountType: accounts.accountType, sequenceNumber: accounts.sequenceNumber })
        .from(accounts).where(and(eq(accounts.id, fromAccountId), eq(accounts.businessId, bizId))).limit(1);
      if (!account) return null;
      const accountType = String(account.accountType);
      if (!['bank', 'exchange', 'e_wallet'].includes(accountType)) return null;
      const normalized = normalizeTreasuryCode(account.code, accountType as 'bank' | 'exchange' | 'e_wallet', account.sequenceNumber);
      if (!normalized) return null;
      return { kind: accountType as 'bank' | 'exchange' | 'e_wallet', treasuryId: fromAccountId, ...normalized };
    }
  }
  return null;
}

const vouchersRouter = new Hono();


vouchersRouter.post(
  '/businesses/:bizId/vouchers-multi',
  bizAuthMiddleware(),
  checkPermission('vouchers', 'create'),
  safeHandler('إضافة سند متعدد', async (c) => {
    const bizId = getBizId(c);
    const userId = getUserId(c) ?? 0;
    const body = normalizeBody(await c.req.json());

    const validation = validateBody(voucherMultiSchema, body);
    if (!validation.success) return c.json({ error: validation.error }, 400);
    const data = validation.data as any;

    const [opType] = data.operationTypeId
      ? await db
          .select()
          .from(operationTypes)
          .where(and(eq(operationTypes.id, data.operationTypeId), eq(operationTypes.businessId, bizId)))
      : [null];
    if (data.operationTypeId && !opType) return c.json({ error: 'نوع العملية غير موجود' }, 404);
    if (opType?.isActive === false) return c.json({ error: 'نوع العملية غير مفعّل' }, 400);

    const currencyId = data.currencyId || 1;
    const vType = (opType?.voucherType as any) || data.voucherType || 'receipt';

    const treasuryFundId = vType === 'receipt'
      ? (data.toFundId ?? opType?.sourceFundId ?? null)
      : (data.fromFundId ?? opType?.sourceFundId ?? null);
    let treasuryAccountId = vType === 'receipt'
      ? (data.toAccountId ?? opType?.sourceAccountId ?? null)
      : (data.fromAccountId ?? opType?.sourceAccountId ?? null);

    // عند اختيار صندوق كخزينة، نستخدم حساب خزينة داخلي موحّد لمعالجة الأثر الداخلي
    if (!treasuryAccountId && treasuryFundId) {
      const accRows = await db.execute(sql`
        SELECT id FROM accounts
        WHERE business_id = ${bizId}
          AND account_type = 'fund'
          AND notes = 'system_cash_treasury'
        LIMIT 1
      `);
      const existing = getFirstRow<{ id: number }>(accRows);
      if (existing?.id) {
        treasuryAccountId = existing.id;
      } else {
        const [created] = await db.insert(accounts).values({
          businessId: bizId,
          name: 'حساب الصناديق (آلي)',
          accountType: 'fund',
          canCreateVoucher: false,
          canApproveVoucher: false,
          notes: 'system_cash_treasury',
        }).returning({ id: accounts.id });
        treasuryAccountId = created?.id ?? null;
      }
    }
    if (!treasuryAccountId) {
      return c.json({ error: 'الخزينة مطلوبة. اختر صندوقاً أو حساب خزينة صالحاً قبل الحفظ' }, 400);
    }

    const voucherDate = data.voucherDate ? new Date(data.voucherDate) : null;
    const baseDesc = (data.description || opType?.name || '').trim();

    const entries = (data.entries || [])
      .map((e: any) => {
        const accountId = e.accountId ?? e.toAccountId;
        const amount = typeof e.amount === 'string' ? Number.parseFloat(e.amount) : e.amount;
        return { accountId, amount, notes: e.notes ?? null, reference: e.reference ?? null };
      })
      .filter((e: any) => Number.isFinite(e.amount) && e.amount > 0);

    if (entries.length === 0) return c.json({ error: 'أدخل مبلغاً واحداً على الأقل' }, 400);

    const total = entries.reduce((s: number, e: any) => s + e.amount, 0);
    const entryLineType: 'debit' | 'credit' = vType === 'receipt' ? 'credit' : 'debit';
    const treasuryLineType: 'debit' | 'credit' = vType === 'receipt' ? 'debit' : 'credit';

    const lines = entries.map((e: any) => {
      const desc = [baseDesc, e.notes ? String(e.notes).trim() : ''].filter(Boolean).join(' - ');
      return {
        accountId: e.accountId,
        lineType: entryLineType,
        amount: e.amount,
        description: desc || null,
      };
    });

    lines.push({
      accountId: treasuryAccountId,
      lineType: treasuryLineType,
      amount: total,
      description: baseDesc || null,
    });

    const requestedStatus = 'unreviewed';

    try {
      if (requestedStatus === 'unreviewed') {
        const result = await postMultiTransaction(bizId, userId, {
          voucherType: vType,
          currencyId,
          lines,
          operationTypeId: data.operationTypeId,
          operationTypeName: opType?.name || null,
          description: baseDesc || opType?.name || '',
          reference: data.reference || null,
          voucherDate,
          stationId: data.stationId || null,
          employeeId: data.employeeId || null,
          supplierId: data.supplierId || null,
          // ربط الخزينة بالصندوق/الحساب حسب نوع السند
          toFundId: vType === 'receipt' ? treasuryFundId : null,
          fromFundId: vType === 'payment' ? treasuryFundId : null,
          fromAccountId: vType === 'payment' ? treasuryAccountId : null,
          toAccountId: vType === 'receipt' ? treasuryAccountId : null,
        });
        try { wsService.notifyNewVoucher(bizId, result.voucher); } catch { /* optional */ }
        return c.json(result.voucher, 201);
      }

      const seqYear = (voucherDate || new Date()).getFullYear();
      const treasury = await resolveVoucherTreasuryInfo(
        bizId,
        vType,
        vType === 'payment' ? treasuryFundId : null,
        vType === 'receipt' ? treasuryFundId : null,
        vType === 'payment' ? treasuryAccountId : null,
        vType === 'receipt' ? treasuryAccountId : null,
      );

      let voucherNumber = '';
      let accountSequence: string | null = null;
      if (treasury) {
        const seqVal = await getNextSequence(
          bizId,
          `treasury_${treasury.kind}_${vType}`,
          treasury.treasuryId,
          seqYear,
        );
        const voucherPrefix = TYPE_PREFIXES[vType] || 'VCH';
        voucherNumber = `${voucherPrefix}-${treasury.treasuryCode}-${seqYear}-${seqVal}`;
        accountSequence = `${treasury.treasuryCode}-${seqYear}-${seqVal}`;
      } else {
        const seqVal = await getNextSequence(bizId, `voucher_${vType}_fallback`, 0, seqYear);
        const voucherPrefix = TYPE_PREFIXES[vType] || 'VCH';
        voucherNumber = `${voucherPrefix}-${seqYear}-${String(seqVal).padStart(5, '0')}`;
      }

      const createdVoucher = await db.transaction(async (tx) => {
        const [created] = await tx.insert(vouchers).values({
          businessId: bizId,
          voucherNumber,
          voucherType: vType,
          status: 'unreviewed',
          amount: String(total),
          currencyId,
          fromAccountId: vType === 'payment' ? treasuryAccountId : null,
          toAccountId: vType === 'receipt' ? treasuryAccountId : null,
          fromFundId: vType === 'payment' ? treasuryFundId : null,
          toFundId: vType === 'receipt' ? treasuryFundId : null,
          stationId: data.stationId || null,
          employeeId: data.employeeId || null,
          supplierId: data.supplierId || null,
          operationTypeId: data.operationTypeId || null,
          description: baseDesc || opType?.name || '',
          reference: data.reference || null,
          voucherDate: voucherDate || new Date(),
          createdBy: userId,
          hasMultipleLines: true,
          accountSequence,
          fullSequenceNumber: voucherNumber,
        }).returning();

        const entryDate = created.voucherDate
          ? new Date(created.voucherDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];

        const [entry] = await tx.insert(journalEntries).values({
          businessId: bizId,
          entryNumber: `JE-${created.voucherNumber}`,
          entryDate,
          description: baseDesc || opType?.name || '',
          reference: created.voucherNumber,
          operationTypeId: data.operationTypeId || null,
          totalDebit: String(total),
          totalCredit: String(total),
          isBalanced: true,
          createdBy: userId,
        }).returning({ id: journalEntries.id });

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          await tx.insert(journalEntryLines).values({
            journalEntryId: entry.id,
            accountId: line.accountId,
            lineType: line.lineType,
            amount: String(line.amount),
            description: line.description,
            sortOrder: i,
          });
        }

        await tx.insert(auditLog).values({
          userId,
          businessId: bizId,
          action: 'create_voucher_draft',
          tableName: 'vouchers',
          recordId: created.id,
          oldData: null,
          newData: { status: 'unreviewed', voucherType: vType, linesCount: lines.length },
        });

        return created;
      });

      try { wsService.notifyNewVoucher(bizId, createdVoucher); } catch { /* optional */ }
      return c.json(createdVoucher, 201);
    } catch (err: unknown) {
      return c.json({ error: toErrorMessage(err) || 'فشل في تنفيذ المعاملة' }, 400);
    }
  })
);


vouchersRouter.put('/businesses/:bizId/vouchers/:id', bizAuthMiddleware(), safeHandler('تعديل سند', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c) ?? 0;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);

  const [existing] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!existing) return c.json({ error: 'السند غير موجود' }, 404);
  if (existing.status === 'reviewed') return c.json({ error: 'لا يمكن تعديل سند مراجع، قم بإلغاء المراجعة أولاً' }, 400);

  const body = normalizeBody(await c.req.json());
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

vouchersRouter.post('/businesses/:bizId/vouchers/:id/status', bizAuthMiddleware(), safeHandler('تغيير حالة السند', async (c) => {
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

export { vouchersRouter as vouchersWriteRouter };
