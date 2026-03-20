/**
 * legacy-compat-vouchers.routes.ts â€” Phase 13
 * ظ…ط³ط§ط±ط§طھ طھظˆط§ظپظ‚ ط§ظ„ط³ظ†ط¯ط§طھ ط§ظ„ظ‚ط¯ظٹظ…ط© (Legacy vouchers routes)
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc, sql, and, inArray, asc } from 'drizzle-orm';
import {
  businesses, vouchers, currencies, operationTypes, operationTypeAccounts,
  accounts, accountBalances, funds, fundBalances,
  operationCategories, journalEntries, journalEntryLines,
  users, auditLog,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, parseId, toErrorMessage } from '../../middleware/helpers.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getNextSequence } from '../../middleware/sequencing.ts';
import { postTransaction, cancelTransaction } from '../../engines/transaction.engine.ts';
import { wsService } from '../../services/websocket.service.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { logAction } from '../../engines/audit.engine.ts';

const legacyVouchersApi = new Hono();

// ===================== ط¬ظ„ط¨ ط³ط¬ظ„ ظˆط§ط­ط¯ (طµظ†ط¯ظˆظ‚) =====================
legacyVouchersApi.get('/funds/:id', safeHandler('ط¬ظ„ط¨ طµظ†ط¯ظˆظ‚ ط¨ط§ظ„ظ…ط¹ط±ظ‘ظپ', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„طµظ†ط¯ظˆظ‚ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [fund] = await db.select().from(funds).where(eq(funds.id, id));
  const err = await requireResourceOwnership(c, fund ?? null);
  if (err) return err;
  const balRows = await db.select().from(fundBalances).where(eq(fundBalances.fundId, id));
  return c.json({ ...fund!, balances: balRows });
}));

// ===================== ط§ظ„ط³ظ†ط¯ط§طھ =====================
legacyVouchersApi.get('/businesses/:bizId/vouchers', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط§ظ„ط³ظ†ط¯ط§طھ', async (c) => {
  const bizId = getBizId(c);
  const typeFilter = c.req.query('type');
  const conditions = [eq(vouchers.businessId, bizId)];
  if (typeFilter) conditions.push(eq(vouchers.voucherType, typeFilter));
  const rows = await db.select().from(vouchers).where(and(...conditions)).orderBy(desc(vouchers.createdAt));
  return c.json(rows);
}));

legacyVouchersApi.post('/businesses/:bizId/vouchers', bizAuthMiddleware(), checkPermission('vouchers', 'create'), safeHandler('ط¥ط¶ط§ظپط© ط³ظ†ط¯', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(voucherSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  
  const voucherData = validation.data as any;
  const amount = typeof voucherData.amount === 'string' ? Number.parseFloat(voucherData.amount) : voucherData.amount;
  if (Number.isNaN(amount) || amount <= 0) return c.json({ error: 'ط§ظ„ظ…ط¨ظ„ط؛ ظٹط¬ط¨ ط£ظ† ظٹظƒظˆظ† ط±ظ‚ظ…ط§ظ‹ ظ…ظˆط¬ط¨ط§ظ‹' }, 400);

  const userPermissions = c.get('userPermissions') as { isAdmin?: boolean; constraints?: unknown; maxVoucherAmount?: number } | undefined;
  const constraintsCheck = validateConstraints(userPermissions ?? {}, {
    amount,
    operationTypeId: voucherData.operationTypeId,
    stationId: voucherData.stationId,
    accountId: voucherData.toAccountId || voucherData.fromAccountId,
  });
  if (!constraintsCheck.valid) return c.json({ error: constraintsCheck.error }, 403);

  // طھط­ظˆظٹظ„ voucherDate ظ…ظ† string ط¥ظ„ظ‰ Date
  if (voucherData.voucherDate && typeof voucherData.voucherDate === 'string') {
    voucherData.voucherDate = new Date(voucherData.voucherDate);
  }

  // === ط¬ظ„ط¨ ط¨ظٹط§ظ†ط§طھ ظ†ظˆط¹ ط§ظ„ط¹ظ…ظ„ظٹط© ط¥ظ† ظˆط¬ط¯ ===
  let opType: Record<string, unknown> | null = null;
  if (voucherData.operationTypeId) {
    const otRows = await db.execute(sql`SELECT * FROM operation_types WHERE id = ${voucherData.operationTypeId} AND business_id = ${bizId}`);
    opType = getFirstRow<Record<string, unknown>>(otRows) ?? null;
    if (!opType) return c.json({ error: 'ظ†ظˆط¹ ط§ظ„ط¹ظ…ظ„ظٹط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
    if (opType.is_active === false) return c.json({ error: 'ظ†ظˆط¹ ط§ظ„ط¹ظ…ظ„ظٹط© ط؛ظٹط± ظ…ظپط¹ظ‘ظ„' }, 400);
  }

  // === طھط­ط¯ظٹط¯ ط§ظ„ط­ط³ط§ط¨ط§طھ (ظ…ط¯ظٹظ† / ط¯ط§ط¦ظ†) ===
  const debitAccountId = voucherData.toAccountId;
  const creditAccountId = voucherData.fromAccountId || (opType?.source_account_id) || null;
  if (!debitAccountId) return c.json({ error: 'ط§ظ„ط­ط³ط§ط¨ ط§ظ„ظ…ط³طھظ‡ط¯ظپ (toAccountId) ظ…ط·ظ„ظˆط¨' }, 400);

  // === ط§ظ„طھط­ظ‚ظ‚ ظ…ظ† ظ…ظ„ظƒظٹط© ط§ظ„ط­ط³ط§ط¨ط§طھ ===
  if (debitAccountId && !(await verifyAccountOwnership(debitAccountId, bizId))) {
    return c.json({ error: 'ط§ظ„ط­ط³ط§ط¨ ط§ظ„ظ…ط³طھظ‡ط¯ظپ ظ„ط§ ظٹظ†طھظ…ظٹ ظ„ظ‡ط°ط§ ط§ظ„ط¹ظ…ظ„' }, 403);
  }
  if (creditAccountId && !(await verifyAccountOwnership(creditAccountId, bizId))) {
    return c.json({ error: 'ط§ظ„ط­ط³ط§ط¨ ط§ظ„ظ…طµط¯ط± ظ„ط§ ظٹظ†طھظ…ظٹ ظ„ظ‡ط°ط§ ط§ظ„ط¹ظ…ظ„' }, 403);
  }

  // === ظ…ظ†ط¹ ط§ظ„طھط­ظˆظٹظ„ ط¨ظٹظ† ط§ظ„ط®ط²ط§ط¦ظ† (safe-to-safe) ===
  if (voucherData.voucherType === 'transfer' || (opType?.voucher_type === 'transfer')) {
    // ط§ظ„طھط­ظ‚ظ‚ ظ…ظ† ظ†ظˆط¹ ط§ظ„طµظ†ط§ط¯ظٹظ‚ ط§ظ„ظ…ط±طھط¨ط·ط©
    let fromFundType: string | null = null;
    let toFundType: string | null = null;
    if (voucherData.fromFundId) {
      const fromFundResult = await db.execute(sql`SELECT fund_type FROM funds WHERE id = ${voucherData.fromFundId} AND business_id = ${bizId}`);
      const fromRow = getFirstRow<{ fund_type: string }>(fromFundResult);
      fromFundType = fromRow?.fund_type ?? null;
    }
    if (voucherData.toFundId) {
      const toFundResult = await db.execute(sql`SELECT fund_type FROM funds WHERE id = ${voucherData.toFundId} AND business_id = ${bizId}`);
      const toRow = getFirstRow<{ fund_type: string }>(toFundResult);
      toFundType = toRow?.fund_type ?? null;
    }
    
    if (fromFundType === 'safe' && toFundType === 'safe') {
      return c.json({ error: '\u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0644\u062a\u062d\u0648\u064a\u0644 \u0628\u064a\u0646 \u062e\u0632\u0627\u0626\u0646 (safe). \u0627\u0633\u062a\u062e\u062f\u0645 \u0639\u0645\u0644\u064a\u0629 \u0633\u062d\u0628/\u0625\u064a\u062f\u0627\u0639 \u0628\u062f\u0644\u0627\u064b \u0645\u0646 \u0630\u0644\u0643' }, 400);
    }
  }

  // === ط§ظ„طھط­ظ‚ظ‚ ظ…ظ† ط§ظ„ط±طµظٹط¯ ط§ظ„ظƒط§ظپظٹ ط¹ظ†ط¯ ط§ظ„طµط±ظپ (payment) ===
  const currencyId = voucherData.currencyId || 1;
  const vType = opType?.voucher_type || voucherData.voucherType || 'receipt';
  if (vType === 'payment' && debitAccountId) {
    await db.execute(sql`
      SELECT balance FROM account_balances WHERE account_id = ${debitAccountId} AND currency_id = ${currencyId}
    `);
    // ظ„ط§ ظ†ظ…ظ†ط¹ ط§ظ„طµط±ظپ ط¥ط°ط§ ظƒط§ظ† ط§ظ„ط­ط³ط§ط¨ ط§ظ„ظ…طµط¯ط± (contra) - ظپظ‚ط· ظ†ط­ط°ط±
  }

  // === طھظ†ظپظٹط° ط§ظ„ط¹ظ…ظ„ظٹط© ط¹ط¨ط± ظ…ط­ط±ظƒ ط§ظ„ظ…ط¹ط§ظ…ظ„ط§طھ ط§ظ„ظ…ط±ظƒط²ظٹ ===
  try {
    const result = await postTransaction(bizId, userId ?? 0, {
      voucherType: vType,
      amount,
      currencyId,
      debitAccountId,
      creditAccountId,
      toFundId: voucherData.toFundId || null,
      fromFundId: voucherData.fromFundId || (opType?.source_fund_id as number | undefined) || null,
      stationId: voucherData.stationId || null,
      employeeId: voucherData.employeeId || null,
      supplierId: voucherData.supplierId || null,
      operationTypeId: voucherData.operationTypeId || null,
      operationTypeName: (opType?.name as string | undefined) ?? null,
      description: voucherData.description || (opType?.name as string | undefined) || '',
      reference: voucherData.reference || null,
      voucherDate: voucherData.voucherDate || null,
      voucherNumber: voucherData.voucherNumber || null,
    });
    // ط¥ط´ط¹ط§ط± WebSocket ط¨ط§ظ„ط¹ظ…ظ„ظٹط© ط§ظ„ط¬ط¯ظٹط¯ط©
    try { wsService.notifyNewVoucher(bizId, result.voucher); } catch { /* optional: skip if notify fails */ }
    return c.json(result.voucher, 201);
  } catch (err: unknown) {
    return c.json({ error: toErrorMessage(err) || 'ظپط´ظ„ ظپظٹ طھظ†ظپظٹط° ط§ظ„ظ…ط¹ط§ظ…ظ„ط©' }, 400);
  }
}));


legacyVouchersApi.delete('/businesses/:bizId/vouchers/:id', bizAuthMiddleware(), checkPermission('vouchers', 'delete'), safeHandler('ط­ط°ظپ ط³ظ†ط¯', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ط³ظ†ط¯ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  try {
    const result = await cancelTransaction(bizId, userId ?? 0, id);
    return c.json(result);
  } catch (err: unknown) {
    const message = toErrorMessage(err);
    const status = message.includes('ط؛ظٹط± ظ…ظˆط¬ظˆط¯') ? 404 : 400;
    return c.json({ error: message }, status);
  }
}));

// Legacy
legacyVouchersApi.delete('/vouchers/:id', safeHandler('ط­ط°ظپ ط³ظ†ط¯ (legacy)', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ط³ظ†ط¯ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [existing] = await db.select().from(vouchers).where(eq(vouchers.id, id));
  const err = await requireResourceOwnership(c, existing ?? null);
  if (err) return err;
  try {
    const result = await cancelTransaction(existing!.businessId, getUserId(c) ?? 0, id);
    return c.json(result);
  } catch (err: unknown) {
    const message = toErrorMessage(err);
    return c.json({ error: message }, 400);
  }
}));


export { legacyVouchersApi };


