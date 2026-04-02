/**
 * vouchers-create.routes.ts â€” Phase 13
 * ط¥ظ†ط´ط§ط، ط§ظ„ط³ظ†ط¯ط§طھ: POST /businesses/:bizId/vouchers-multi
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import {
  operationTypes, accounts,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, toErrorMessage } from '../../middleware/helpers.ts';
import { validateBody, voucherMultiSchema } from '../../middleware/validation.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { postMultiTransaction } from '../../engines/transaction.engine.ts';
import { isForeignCurrency, requireExchangeDiffAccount } from '../../engines/currency.engine.ts';
import { wsService } from '../../services/websocket.service.ts';
import { getFirstRow } from '../../utils/db-result.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { validateEntityAccountLinks } from './_shared/account-guards.ts';

const vouchersCreateRouter = new Hono();




vouchersCreateRouter.post(
  '/businesses/:bizId/vouchers-multi',
  bizAuthMiddleware(),
  checkPermission('vouchers', 'create'),
  safeHandler('ط¥ط¶ط§ظپط© ط³ظ†ط¯ ظ…طھط¹ط¯ط¯', async (c) => {
    const bizId = getBizId(c);
    const userId = getUserId(c) ?? 0;
    const body = await getBody(c);

    const validation = validateBody(voucherMultiSchema, body);
    if (!validation.success) return c.json({ error: validation.error }, 400);
    const data = validation.data as any;

    const [opType] = data.operationTypeId
      ? await db
          .select()
          .from(operationTypes)
          .where(and(eq(operationTypes.id, data.operationTypeId), eq(operationTypes.businessId, bizId)))
      : [null];
    if (data.operationTypeId && !opType) return c.json({ error: 'ظ†ظˆط¹ ط§ظ„ط¹ظ…ظ„ظٹط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
    if (opType?.isActive === false) return c.json({ error: 'ظ†ظˆط¹ ط§ظ„ط¹ظ…ظ„ظٹط© ط؛ظٹط± ظ…ظپط¹ظ‘ظ„' }, 400);

    const currencyId = data.currencyId || 1;

    // ⛔ حماية حرجة: منع العمليات بعملة أجنبية بدون حساب فروقات عملة
    if (await isForeignCurrency(currencyId)) {
      const diffCheck = await requireExchangeDiffAccount(bizId);
      if (!diffCheck.exists) {
        return c.json({ error: 'لا يمكن تنفيذ عملية بعملة أجنبية بدون وجود حساب فروقات العملة. يرجى إنشاء حساب وسيط باسم "فروقات عملة" أولاً من صفحة الحسابات.' }, 400);
      }
    }

    const vType = (opType?.voucherType as any) || data.voucherType || 'receipt';

    const treasuryFundId = vType === 'receipt'
      ? (data.toFundId ?? opType?.sourceFundId ?? null)
      : (data.fromFundId ?? opType?.sourceFundId ?? null);
    let treasuryAccountId = vType === 'receipt'
      ? (data.toAccountId ?? opType?.sourceAccountId ?? null)
      : (data.fromAccountId ?? opType?.sourceAccountId ?? null);

    // ط¹ظ†ط¯ ط§ط®طھظٹط§ط± طµظ†ط¯ظˆظ‚ ظƒط®ط²ظٹظ†ط©طŒ ظ†ط³طھط®ط¯ظ… ط­ط³ط§ط¨ ط®ط²ظٹظ†ط© ط¯ط§ط®ظ„ظٹ ظ…ظˆط­ظ‘ط¯ ظ„ظ…ط¹ط§ظ„ط¬ط© ط§ظ„ط£ط«ط± ط§ظ„ط¯ط§ط®ظ„ظٹ
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
          name: 'ط­ط³ط§ط¨ ط§ظ„طµظ†ط§ط¯ظٹظ‚ (ط¢ظ„ظٹ)',
          accountType: 'fund',
          canCreateVoucher: false,
          canApproveVoucher: false,
          notes: 'system_cash_treasury',
        }).returning({ id: accounts.id });
        treasuryAccountId = created?.id ?? null;
      }
    }
    if (!treasuryAccountId) {
      return c.json({ error: 'ط§ظ„ط®ط²ظٹظ†ط© ظ…ط·ظ„ظˆط¨ط©. ط§ط®طھط± طµظ†ط¯ظˆظ‚ط§ظ‹ ط£ظˆ ط­ط³ط§ط¨ ط®ط²ظٹظ†ط© طµط§ظ„ط­ط§ظ‹ ظ‚ط¨ظ„ ط§ظ„ط­ظپط¸' }, 400);
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

    if (entries.length === 0) return c.json({ error: 'ط£ط¯ط®ظ„ ظ…ط¨ظ„ط؛ط§ظ‹ ظˆط§ط­ط¯ط§ظ‹ ط¹ظ„ظ‰ ط§ظ„ط£ظ‚ظ„' }, 400);

    // حماية: منع تنفيذ عملية على حسابات فرعية بدون كيان مرتبط
    const allAccountIds = entries.map((e: any) => e.accountId).filter(Boolean);
    if (treasuryAccountId) allAccountIds.push(treasuryAccountId);
    const guardError = await validateEntityAccountLinks(allAccountIds);
    if (guardError) return c.json({ error: guardError }, 400);

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

    try {
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
          exchangeRate: data.exchangeRate || null,
          // ط±ط¨ط· ط§ظ„ط®ط²ظٹظ†ط© ط¨ط§ظ„طµظ†ط¯ظˆظ‚/ط§ظ„ط­ط³ط§ط¨ ط­ط³ط¨ ظ†ظˆط¹ ط§ظ„ط³ظ†ط¯
          toFundId: vType === 'receipt' ? treasuryFundId : null,
          fromFundId: vType === 'payment' ? treasuryFundId : null,
          fromAccountId: vType === 'payment' ? treasuryAccountId : null,
          toAccountId: vType === 'receipt' ? treasuryAccountId : null,
        });
      try { wsService.notifyNewVoucher(bizId, result.voucher); } catch { /* optional */ }
      return c.json(result.voucher, 201);
    } catch (err: unknown) {
      return c.json({ error: toErrorMessage(err) || 'ظپط´ظ„ ظپظٹ طھظ†ظپظٹط° ط§ظ„ظ…ط¹ط§ظ…ظ„ط©' }, 400);
    }
  })
);



export { vouchersCreateRouter };


