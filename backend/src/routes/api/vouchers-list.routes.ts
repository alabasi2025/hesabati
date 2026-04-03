/**
 * vouchers-list.routes.ts â€” Phase 8
 * ط¬ظ„ط¨ ط§ظ„ط³ظ†ط¯ط§طھ: ظ‚ط§ط¦ظ…ط© + ظ…ط¹ط§ظٹظ†ط© ط§ظ„ط±ظ‚ظ… + ط±طµظٹط¯ ط§ظ„ط­ط³ط§ط¨ + طھظپط§طµظٹظ„
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc, sql, and, inArray, asc, count } from 'drizzle-orm';
import {
  businesses, vouchers, currencies, operationTypes, operationTypeAccounts,
  accounts, accountBalances, funds, fundBalances,
  banks, exchanges, wallets,
  operationCategories,
  journalEntries, journalEntryLines,
  users, auditLog,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, parseId, toErrorMessage } from '../../middleware/helpers.ts';
import { validateBody, voucherMultiSchema } from '../../middleware/validation.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getNextSequence, getCurrentSequence, TYPE_PREFIXES, getNextItemInCategorySequence } from '../../middleware/sequencing.ts';
import { generateVoucherFullSequence, previewVoucherFullSequence } from '../../engines/sequencing-entity.engine.ts';
import { postMultiTransaction, postTransaction, confirmDraftTransaction, cancelTransaction } from '../../engines/transaction.engine.ts';
import { wsService } from '../../services/websocket.service.ts';
import { normalizeDbResult, getFirstRow } from '../../utils/db-result.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { logAction } from '../../engines/audit.engine.ts';
import type { AppContext } from './_shared/types.ts';

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
  const normalizedCode = String(code ?? '').trim();
  // دعم الأكواد المركبة (FND-01/1) والبسيطة (FND-01)
  const matched = normalizedCode.match(/^([A-Z]+)-(.+)$/i);
  if (matched) {
    return { kindCode: matched[1]!.toUpperCase(), treasuryCode: normalizedCode };
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
      const [account] = await db.select({ id: accounts.id, accountType: accounts.accountType })
        .from(accounts).where(and(eq(accounts.id, toAccountId), eq(accounts.businessId, bizId))).limit(1);
      if (!account) return null;
      const accountType = String(account.accountType);
      if (!['bank', 'exchange', 'e_wallet'].includes(accountType)) return null;

      // جلب الكود من جدول البنك/الصراف/المحفظة المناسب
      let entityCode = null;
      let entitySeq = null;
      if (accountType === 'bank') {
        const [bank] = await db.select({ code: banks.code, sequenceNumber: banks.sequenceNumber })
          .from(banks).where(and(eq(banks.accountId, toAccountId), eq(banks.businessId, bizId))).limit(1);
        if (bank) { entityCode = bank.code; entitySeq = bank.sequenceNumber; }
      } else if (accountType === 'exchange') {
        const [exchange] = await db.select({ code: exchanges.code, sequenceNumber: exchanges.sequenceNumber })
          .from(exchanges).where(and(eq(exchanges.accountId, toAccountId), eq(exchanges.businessId, bizId))).limit(1);
        if (exchange) { entityCode = exchange.code; entitySeq = exchange.sequenceNumber; }
      } else if (accountType === 'e_wallet') {
        const [wallet] = await db.select({ code: wallets.code, sequenceNumber: wallets.sequenceNumber })
          .from(wallets).where(and(eq(wallets.accountId, toAccountId), eq(wallets.businessId, bizId))).limit(1);
        if (wallet) { entityCode = wallet.code; entitySeq = wallet.sequenceNumber; }
      }

      const normalized = normalizeTreasuryCode(entityCode, accountType as 'bank' | 'exchange' | 'e_wallet', entitySeq);
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
      const [account] = await db.select({ id: accounts.id, accountType: accounts.accountType })
        .from(accounts).where(and(eq(accounts.id, fromAccountId), eq(accounts.businessId, bizId))).limit(1);
      if (!account) return null;
      const accountType = String(account.accountType);
      if (!['bank', 'exchange', 'e_wallet'].includes(accountType)) return null;

      // جلب الكود من جدول البنك/الصراف/المحفظة المناسب
      let entityCode = null;
      let entitySeq = null;
      if (accountType === 'bank') {
        const [bank] = await db.select({ code: banks.code, sequenceNumber: banks.sequenceNumber })
          .from(banks).where(and(eq(banks.accountId, fromAccountId), eq(banks.businessId, bizId))).limit(1);
        if (bank) { entityCode = bank.code; entitySeq = bank.sequenceNumber; }
      } else if (accountType === 'exchange') {
        const [exchange] = await db.select({ code: exchanges.code, sequenceNumber: exchanges.sequenceNumber })
          .from(exchanges).where(and(eq(exchanges.accountId, fromAccountId), eq(exchanges.businessId, bizId))).limit(1);
        if (exchange) { entityCode = exchange.code; entitySeq = exchange.sequenceNumber; }
      } else if (accountType === 'e_wallet') {
        const [wallet] = await db.select({ code: wallets.code, sequenceNumber: wallets.sequenceNumber })
          .from(wallets).where(and(eq(wallets.accountId, fromAccountId), eq(wallets.businessId, bizId))).limit(1);
        if (wallet) { entityCode = wallet.code; entitySeq = wallet.sequenceNumber; }
      }

      const normalized = normalizeTreasuryCode(entityCode, accountType as 'bank' | 'exchange' | 'e_wallet', entitySeq);
      if (!normalized) return null;
      return { kind: accountType as 'bank' | 'exchange' | 'e_wallet', treasuryId: fromAccountId, ...normalized };
    }
  }
  return null;
}

const vouchersRouter = new Hono();


// ===================== طھط­ط³ظٹظ†ط§طھ ط§ظ„ط³ظ†ط¯ط§طھ (Vouchers) =====================

// 1. ط¬ظ„ط¨ ط§ظ„ط³ظ†ط¯ط§طھ ظ…ط¹ ظپظ„طھط±ط© ظ…طھظ‚ط¯ظ…ط© + pagination
vouchersRouter.get('/businesses/:bizId/vouchers-enhanced', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط§ظ„ط³ظ†ط¯ط§طھ ط§ظ„ظ…ط­ط³ظ†', async (c) => {
  const bizId = getBizId(c);
  const typeFilter = c.req.query('type');
  const statusFilter = c.req.query('status');
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const search = c.req.query('search');
  const voucherNumber = c.req.query('voucherNumber');
  const minAmount = c.req.query('minAmount');
  const maxAmount = c.req.query('maxAmount');
  const operationTypeId = c.req.query('operationTypeId');
  const treasuryType = c.req.query('treasuryType');
  const treasuryIdRaw = c.req.query('treasuryId');
  const treasuryId = treasuryIdRaw ? Number.parseInt(treasuryIdRaw, 10) : null;
  const limit = parseInt(c.req.query('limit') || '20');
  const offset = parseInt(c.req.query('offset') || '0');
  const sortBy = c.req.query('sortBy') || 'created_at';
  const sortDir = c.req.query('sortDir') || 'desc';

  let conditions = sql`v.business_id = ${bizId}`;
  if (typeFilter) conditions = sql`${conditions} AND v.voucher_type = ${typeFilter}`;
  if (statusFilter) conditions = sql`${conditions} AND v.status = ${statusFilter}`;
  if (dateFrom) conditions = sql`${conditions} AND v.voucher_date >= ${dateFrom}::date`;
  if (dateTo) conditions = sql`${conditions} AND v.voucher_date <= ${dateTo}::date`;
  if (search) conditions = sql`${conditions} AND (v.description ILIKE ${'%' + search + '%'} OR v.voucher_number ILIKE ${'%' + search + '%'} OR v.reference ILIKE ${'%' + search + '%'})`;
  if (voucherNumber) conditions = sql`${conditions} AND v.voucher_number ILIKE ${'%' + voucherNumber + '%'}`;
  if (minAmount) conditions = sql`${conditions} AND CAST(v.amount AS NUMERIC) >= ${parseFloat(minAmount)}`;
  if (maxAmount) conditions = sql`${conditions} AND CAST(v.amount AS NUMERIC) <= ${parseFloat(maxAmount)}`;
  if (operationTypeId) conditions = sql`${conditions} AND v.operation_type_id = ${parseInt(operationTypeId)}`;
  if (treasuryType === 'fund') {
    conditions = sql`${conditions} AND (v.from_fund_id IS NOT NULL OR v.to_fund_id IS NOT NULL)`;
  } else if (treasuryType && ['bank', 'exchange', 'e_wallet'].includes(treasuryType)) {
    conditions = sql`${conditions} AND (
      v.from_account_id IN (
        SELECT a.id FROM accounts a WHERE a.business_id = ${bizId} AND a.account_type = ${treasuryType}
      )
      OR v.to_account_id IN (
        SELECT a.id FROM accounts a WHERE a.business_id = ${bizId} AND a.account_type = ${treasuryType}
      )
    )`;
  }
  if (Number.isInteger(treasuryId) && (treasuryId as number) > 0) {
    if (treasuryType === 'fund') {
      conditions = sql`${conditions} AND (v.from_fund_id = ${treasuryId} OR v.to_fund_id = ${treasuryId})`;
    } else if (treasuryType && ['bank', 'exchange', 'e_wallet'].includes(treasuryType)) {
      conditions = sql`${conditions} AND (v.from_account_id = ${treasuryId} OR v.to_account_id = ${treasuryId})`;
    } else {
      conditions = sql`${conditions} AND (
        v.from_fund_id = ${treasuryId}
        OR v.to_fund_id = ${treasuryId}
        OR v.from_account_id = ${treasuryId}
        OR v.to_account_id = ${treasuryId}
      )`;
    }
  }

  // طھط±طھظٹط¨ ط¢ظ…ظ† (whitelist) ظ„ظ…ظ†ط¹ ط­ظ‚ظ† SQL ط¹ط¨ط± sortBy/sortDir
  const normalizedSortDir = String(sortDir).toLowerCase() === 'asc' ? 'asc' : 'desc';
  let orderBySql = sql`v.created_at DESC`;
  if (sortBy === 'voucher_date') {
    orderBySql = normalizedSortDir === 'asc' ? sql`v.voucher_date ASC, v.id ASC` : sql`v.voucher_date DESC, v.id DESC`;
  } else if (sortBy === 'voucher_number') {
    orderBySql = normalizedSortDir === 'asc' ? sql`v.voucher_number ASC, v.id ASC` : sql`v.voucher_number DESC, v.id DESC`;
  } else if (sortBy === 'amount') {
    orderBySql =
      normalizedSortDir === 'asc'
        ? sql`CAST(v.amount AS NUMERIC) ASC, v.id ASC`
        : sql`CAST(v.amount AS NUMERIC) DESC, v.id DESC`;
  } else {
    orderBySql = normalizedSortDir === 'asc' ? sql`v.created_at ASC, v.id ASC` : sql`v.created_at DESC, v.id DESC`;
  }

  // ط¬ظ„ط¨ ط§ظ„ط¨ظٹط§ظ†ط§طھ ظ…ط¹ ط§ظ„ط­ط³ط§ط¨ط§طھ ظˆط£ظ†ظˆط§ط¹ ط§ظ„ط¹ظ…ظ„ظٹط§طھ
  const [rows, countResult, statsResult] = await Promise.all([
    db.execute(sql`
      SELECT v.*,
        ot.name as operation_type_name, ot.icon as operation_type_icon, ot.color as operation_type_color, ot.category_id as operation_category,
        fa.name as from_account_name, fa.account_type as from_account_type,
        ta.name as to_account_name, ta.account_type as to_account_type,
        ff.name as from_fund_name, ff.code as from_fund_code,
        tf.name as to_fund_name, tf.code as to_fund_code,
        c.code as currency_code, c.symbol as currency_symbol,
        u.full_name as created_by_name
      FROM vouchers v
      LEFT JOIN operation_types ot ON ot.id = v.operation_type_id
      LEFT JOIN accounts fa ON fa.id = v.from_account_id
      LEFT JOIN accounts ta ON ta.id = v.to_account_id
      LEFT JOIN funds ff ON ff.id = v.from_fund_id
      LEFT JOIN funds tf ON tf.id = v.to_fund_id
      LEFT JOIN currencies c ON c.id = v.currency_id
      LEFT JOIN users u ON u.id = v.created_by
      WHERE ${conditions}
      ORDER BY ${orderBySql}
      LIMIT ${limit} OFFSET ${offset}
    `),
    db.execute(sql`SELECT COUNT(*) as total FROM vouchers v WHERE ${conditions}`),
    db.execute(sql`
      SELECT
        COUNT(*) as total_count,
        COALESCE(SUM(CASE WHEN v.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as total_receipts,
        COALESCE(SUM(CASE WHEN v.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as total_payments,
        COUNT(CASE WHEN v.voucher_type = 'receipt' THEN 1 END) as receipt_count,
        COUNT(CASE WHEN v.voucher_type = 'payment' THEN 1 END) as payment_count,
        COUNT(CASE WHEN v.status = 'unreviewed' THEN 1 END) as unreviewed_count,
        COUNT(CASE WHEN v.status = 'reviewed' THEN 1 END) as reviewed_count
      FROM vouchers v WHERE ${conditions}
    `),
  ]);

  const total = Number(getFirstRow<{ total: string }>(countResult)?.total ?? 0);
  const stats = normalizeDbResult(statsResult)[0] || {};

  const resultRows = normalizeDbResult(rows);
  const voucherNumbers = resultRows.map((r: any) => r.voucher_number || r.voucherNumber).filter(Boolean);
  const voucherIds = resultRows.map((r: any) => r.id).filter(Boolean);

  // تشغيل استعلامات السطور بالتوازي مع count/stats
  const journalLinesPromise = (async (): Promise<Record<string, any[]>> => {
    const map: Record<string, any[]> = {};
    if (voucherNumbers.length === 0) return map;
    const placeholders = voucherNumbers.map((n: string) => `'${n.replace(/'/g, "''")}'`).join(',');
    const linesResult = await db.execute(sql`
      SELECT je.reference as voucher_ref, jel.*, a.name as account_name, a.account_type as account_type
      FROM journal_entries je
      JOIN journal_entry_lines jel ON jel.journal_entry_id = je.id
      LEFT JOIN accounts a ON a.id = jel.account_id
      WHERE je.reference IN ${sql.raw('(' + placeholders + ')')}
      ORDER BY jel.sort_order
    `);
    for (const line of normalizeDbResult(linesResult)) {
      const ref = (line as any).voucherRef || (line as any).voucher_ref;
      if (!map[ref]) map[ref] = [];
      map[ref].push({
        id: (line as any).id,
        accountId: (line as any).accountId || (line as any).account_id,
        accountName: (line as any).accountName || (line as any).account_name,
        accountType: (line as any).accountType || (line as any).account_type,
        lineType: (line as any).lineType || (line as any).line_type,
        amount: (line as any).amount,
      });
    }
    return map;
  })();

  const voucherLinesPromise = (async (): Promise<Record<number, any[]>> => {
    const map: Record<number, any[]> = {};
    if (voucherIds.length === 0) return map;
    const vIdPlaceholders = voucherIds.join(',');
    const vlResult = await db.execute(sql`
      SELECT vl.voucher_id, vl.account_id, vl.entity_type, vl.entity_id, vl.amount, vl.description,
        a.name as account_name, a.account_type as account_type
      FROM voucher_lines vl
      LEFT JOIN accounts a ON a.id = vl.account_id
      WHERE vl.voucher_id IN ${sql.raw('(' + vIdPlaceholders + ')')}
      ORDER BY vl.sort_order
    `);
    for (const vl of normalizeDbResult(vlResult)) {
      const vid = (vl as any).voucherId || (vl as any).voucher_id;
      if (!map[vid]) map[vid] = [];
      map[vid].push({
        accountId: (vl as any).accountId || (vl as any).account_id,
        accountName: (vl as any).accountName || (vl as any).account_name,
        accountType: (vl as any).accountType || (vl as any).account_type,
        entityType: (vl as any).entityType || (vl as any).entity_type || null,
        entityId: (vl as any).entityId || (vl as any).entity_id || null,
        amount: (vl as any).amount,
        description: (vl as any).description,
      });
    }
    return map;
  })();

  const [linesMap, voucherLinesMap] = await Promise.all([journalLinesPromise, voucherLinesPromise]);

  // جلب أسماء الكيانات التحليلية بالتوازي
  const allEntityRefs: { type: string; id: number }[] = [];
  for (const lines of Object.values(voucherLinesMap)) {
    for (const vl of lines) {
      if (vl.entityType && vl.entityId) allEntityRefs.push({ type: vl.entityType, id: vl.entityId });
    }
  }
  const entityNameCache: Record<string, string> = {};
  if (allEntityRefs.length > 0) {
    const partnerIds = [...new Set(allEntityRefs.filter(e => e.type === 'partner').map(e => e.id))];
    const employeeIds = [...new Set(allEntityRefs.filter(e => e.type === 'employee').map(e => e.id))];
    const supplierIds = [...new Set(allEntityRefs.filter(e => e.type === 'supplier').map(e => e.id))];
    await Promise.all([
      partnerIds.length > 0
        ? db.execute(sql`SELECT id, full_name FROM business_partners WHERE id IN ${sql.raw('(' + partnerIds.join(',') + ')')}`)
            .then(r => { for (const p of normalizeDbResult(r)) entityNameCache[`partner_${(p as any).id}`] = (p as any).fullName || (p as any).full_name || ''; })
        : Promise.resolve(),
      employeeIds.length > 0
        ? db.execute(sql`SELECT id, full_name FROM employees WHERE id IN ${sql.raw('(' + employeeIds.join(',') + ')')}`)
            .then(r => { for (const e of normalizeDbResult(r)) entityNameCache[`employee_${(e as any).id}`] = (e as any).fullName || (e as any).full_name || ''; })
        : Promise.resolve(),
      supplierIds.length > 0
        ? db.execute(sql`SELECT id, name FROM suppliers WHERE id IN ${sql.raw('(' + supplierIds.join(',') + ')')}`)
            .then(r => { for (const s of normalizeDbResult(r)) entityNameCache[`supplier_${(s as any).id}`] = (s as any).name || ''; })
        : Promise.resolve(),
    ]);
  }

  // دمج أسماء الكيانات التحليلية في سطور السند
  for (const lines of Object.values(voucherLinesMap)) {
    for (const vl of lines) {
      if (vl.entityType && vl.entityId) {
        const key = `${vl.entityType}_${vl.entityId}`;
        vl.entityName = entityNameCache[key] || null;
      }
    }
  }

  // دمج أسماء الكيانات في journalEntries أيضاً (لتوافق الفرونتند)
  // نربط كل سطر journal بسطر voucher_line المقابل عبر accountId
  for (const v of resultRows) {
    const vNum = v.voucherNumber || v.voucher_number;
    const vId = v.id;
    const jLines = linesMap[vNum] || [];
    const vlLines = voucherLinesMap[vId] || [];
    for (const jl of jLines) {
      const matchingVl = vlLines.find((vl: any) => vl.accountId === jl.accountId);
      if (matchingVl && matchingVl.entityName) {
        jl.entityType = matchingVl.entityType;
        jl.entityId = matchingVl.entityId;
        jl.entityName = matchingVl.entityName;
      }
    }
  }

  // إضافة journalEntries (سطور القيد) + voucherLineDetails لكل سند
  const enrichedVouchers = resultRows.map((v: any) => {
    const vNum = v.voucherNumber || v.voucher_number;
    const vId = v.id;
    return { ...v, journalEntries: linesMap[vNum] || [], voucherLineDetails: voucherLinesMap[vId] || [] };
  });

  return c.json({ vouchers: enrichedVouchers, total, stats, limit, offset });
}));

// 1.5 ط¥ظ†ط´ط§ط، ط³ظ†ط¯ ظ…طھط¹ط¯ط¯ ط§ظ„ط³ط·ظˆط± (ط³ظ†ط¯ ظˆط§ط­ط¯ ط¨ط¯ظ„ ط¹ط¯ط© ط³ظ†ط¯ط§طھ)

vouchersRouter.get('/businesses/:bizId/voucher-number-preview', bizAuthMiddleware(), safeHandler('ظ…ط¹ط§ظٹظ†ط© ط±ظ‚ظ… ط§ظ„ط³ظ†ط¯', async (c) => {
  const bizId = getBizId(c);
  const voucherType = String(c.req.query('voucherType') || 'receipt');
  const voucherDate = c.req.query('voucherDate') ? new Date(String(c.req.query('voucherDate'))) : new Date();
  const year = voucherDate.getFullYear();
  const fromFundId = parseId(c.req.query('fromFundId') || '');
  const toFundId = parseId(c.req.query('toFundId') || '');
  const fromAccountId = parseId(c.req.query('fromAccountId') || '');
  const toAccountId = parseId(c.req.query('toAccountId') || '');

  const treasury = await resolveVoucherTreasuryInfo(
    bizId,
    voucherType,
    fromFundId || null,
    toFundId || null,
    fromAccountId || null,
    toAccountId || null,
  );

  console.log('[preview] treasury resolved:', JSON.stringify(treasury), { bizId, voucherType, fromFundId, toFundId, fromAccountId, toAccountId });

  if (!treasury) {
    return c.json({ error: 'لا يمكن توليد رقم السند قبل اختيار خزينة صحيحة' }, 400);
  }

  // معاينة فقط: نستخدم preview لعدم زيادة العداد فعلياً
  const { fullSequenceNumber, sequentialNumber } = await previewVoucherFullSequence(
    bizId,
    treasury.treasuryCode,
    treasury.kind,
    voucherType as 'receipt' | 'payment',
    treasury.treasuryId,
    year,
  );
  console.log('[preview] result:', { fullSequenceNumber, sequentialNumber });

  return c.json({
    voucherNumber: fullSequenceNumber,
    accountSequence: fullSequenceNumber,
    treasuryKind: treasury.kind,
    treasuryKindCode: treasury.kindCode,
    treasuryCode: treasury.treasuryCode,
    year,
    serial: sequentialNumber,
  });
}));

// 2. طھط¹ط¯ظٹظ„ ط³ظ†ط¯ (ظ‚ط¨ظ„ ط§ظ„ط§ط¹طھظ…ط§ط¯)

vouchersRouter.get('/businesses/:bizId/account-balance/:accountId', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط±طµظٹط¯ ط­ط³ط§ط¨', async (c) => {
  const bizId = getBizId(c);
  const accountId = parseId(c.req.param('accountId'));
  if (!accountId) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ط­ط³ط§ط¨ ط؛ظٹط± طµط§ظ„ط­' }, 400);

  const [account] = await db.select().from(accounts).where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)));
  if (!account) return c.json({ error: 'ط§ظ„ط­ط³ط§ط¨ ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);

  const balances = await db.execute(sql`
    SELECT ab.balance, c.code as currency_code, c.symbol as currency_symbol, c.name_ar as currency_name
    FROM account_balances ab
    LEFT JOIN currencies c ON c.id = ab.currency_id
    WHERE ab.account_id = ${accountId}
  `);
  const balanceRows = normalizeDbResult(balances);

  return c.json({
    accountId, accountName: account.name, accountType: account.accountType,
    balances: balanceRows,
  });
}));

// 5. ط¬ظ„ط¨ طھظپط§طµظٹظ„ ط¹ظ…ظ„ظٹط© (drill-down)
vouchersRouter.get('/businesses/:bizId/vouchers/:id/details', bizAuthMiddleware(), safeHandler('طھظپط§طµظٹظ„ ط§ظ„ط³ظ†ط¯', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ط³ظ†ط¯ ط؛ظٹط± طµط§ظ„ط­' }, 400);

  const [voucher] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!voucher) return c.json({ error: 'ط§ظ„ط³ظ†ط¯ ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);

  // ط¬ظ„ط¨ ط§ظ„ظ‚ظٹط¯ ط§ظ„ظ…ط­ط§ط³ط¨ظٹ ط§ظ„ظ…ط±طھط¨ط·
  const journalResult = await db.execute(sql`
    SELECT je.*, jel.id as line_id, jel.account_id, jel.line_type, jel.amount as line_amount, jel.description as line_description,
      a.name as account_name, a.account_type
    FROM journal_entries je
    LEFT JOIN journal_entry_lines jel ON jel.journal_entry_id = je.id
    LEFT JOIN accounts a ON a.id = jel.account_id
    WHERE je.reference = ${voucher.voucherNumber} AND je.business_id = ${bizId}
    ORDER BY jel.sort_order
  `);
  const journalRows = normalizeDbResult(journalResult);

  // ط¬ظ„ط¨ ط³ط·ظˆط± ط§ظ„ط³ظ†ط¯ (voucher_lines) ظ…ط¹ ط¨ظٹط§ظ†ط§طھ ط§ظ„ظƒظٹط§ظ†
  const voucherLinesResult = await db.execute(sql`
    SELECT vl.*, a.name as account_name, a.account_type
    FROM voucher_lines vl
    LEFT JOIN accounts a ON a.id = vl.account_id
    WHERE vl.voucher_id = ${id}
    ORDER BY vl.sort_order
  `);
  const rawVoucherLines = normalizeDbResult(voucherLinesResult);
  const voucherLineDetails = rawVoucherLines.map((vl: any) => ({
    accountId: vl.accountId ?? vl.account_id,
    accountName: vl.accountName ?? vl.account_name ?? null,
    accountType: vl.accountType ?? vl.account_type ?? null,
    entityType: vl.entityType ?? vl.entity_type ?? null,
    entityId: vl.entityId ?? vl.entity_id ?? null,
    amount: vl.amount,
    description: vl.description ?? null,
    sortOrder: vl.sortOrder ?? vl.sort_order ?? 0,
  }));

  // ط¬ظ„ط¨ ظ†ظˆط¹ ط§ظ„ط¹ظ…ظ„ظٹط©
  let opType = null;
  if (voucher.operationTypeId) {
    const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, voucher.operationTypeId));
    opType = ot;
  }

  // ط¬ظ„ط¨ ط§ظ„ط­ط³ط§ط¨ط§طھ
  let fromAccount = null, toAccount = null;
  if (voucher.fromAccountId) {
    const [acc] = await db.select().from(accounts).where(eq(accounts.id, voucher.fromAccountId));
    fromAccount = acc;
  }
  if (voucher.toAccountId) {
    const [acc] = await db.select().from(accounts).where(eq(accounts.id, voucher.toAccountId));
    toAccount = acc;
  }

  // ط³ط¬ظ„ ط§ظ„طھط¯ظ‚ظٹظ‚
  const auditResult = await db.execute(sql`
    SELECT * FROM audit_log WHERE table_name = 'vouchers' AND record_id = ${id} ORDER BY created_at DESC
  `);
  const auditRows = normalizeDbResult(auditResult);

  return c.json({
    voucher, operationType: opType, fromAccount, toAccount,
    journalEntries: journalRows, voucherLineDetails, auditTrail: auditRows,
  });
}));


export default vouchersRouter;


export { vouchersRouter as vouchersListRouter };


