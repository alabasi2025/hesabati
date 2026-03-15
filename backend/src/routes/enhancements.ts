import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { eq, desc, sql, and, inArray, asc, count } from 'drizzle-orm';
import {
  businesses, vouchers, currencies, operationTypes, operationTypeAccounts,
  accounts, accountBalances, funds, fundBalances,
  fundTypes, bankTypes, exchangeTypes, eWalletTypes,
  operationCategories,
  journalEntries, journalEntryLines,
  sidebarSections, sidebarItems, userSidebarConfig,
  screenTemplates, screenWidgets, screenWidgetTemplates, screenWidgetAccounts, screenPermissions,
  users, auditLog,
} from '../db/schema/index.ts';
import { bizAuthMiddleware } from '../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, getBody, parseId, toErrorMessage } from '../middleware/helpers.ts';
import { validateBody, voucherMultiSchema } from '../middleware/validation.ts';
import { checkPermission } from '../middleware/permissions.ts';
import { getNextSequence, getCurrentSequence, TYPE_PREFIXES, getNextItemInCategorySequence } from '../middleware/sequencing.ts';
import { postMultiTransaction, postTransaction } from '../services/transaction.service.ts';
import { wsService } from '../services/websocket.service.ts';
import { normalizeDbResult, getFirstRow } from '../utils/db-result.ts';
import { getBizId, getUserId } from './api/_shared/context-helpers.ts';

const enhancements = new Hono();

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
    return {
      kindCode: matched[1]!,
      treasuryCode: `${matched[1]}-${matched[2]}`,
    };
  }

  const seq = typeof sequenceNumber === 'number'
    ? sequenceNumber
    : Number.parseInt(String(sequenceNumber ?? ''), 10);
  if (!Number.isInteger(seq) || seq <= 0) return null;
  const kindCode = TYPE_PREFIXES[fallbackKind] || fallbackKind.toUpperCase().substring(0, 3);
  return {
    kindCode,
    treasuryCode: `${kindCode}-${String(seq).padStart(2, '0')}`,
  };
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

// ===================== تحسينات السندات (Vouchers) =====================

// 1. جلب السندات مع فلترة متقدمة + pagination
enhancements.get('/businesses/:bizId/vouchers-enhanced', bizAuthMiddleware(), safeHandler('جلب السندات المحسن', async (c) => {
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

  // ترتيب آمن (whitelist) لمنع حقن SQL عبر sortBy/sortDir
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

  // جلب البيانات مع الحسابات وأنواع العمليات
  const rows = await db.execute(sql`
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
  `);

  // عدد النتائج الكلي
  const countResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM vouchers v WHERE ${conditions}
  `);
  const countRows = normalizeDbResult<{ total: string }>(countResult);
  const total = Number(getFirstRow<{ total: string }>(countResult)?.total ?? 0);

  // إحصائيات
  const statsResult = await db.execute(sql`
    SELECT
      COUNT(*) as total_count,
      COALESCE(SUM(CASE WHEN v.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as total_receipts,
      COALESCE(SUM(CASE WHEN v.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as total_payments,
      COUNT(CASE WHEN v.voucher_type = 'receipt' THEN 1 END) as receipt_count,
      COUNT(CASE WHEN v.voucher_type = 'payment' THEN 1 END) as payment_count,
      COUNT(CASE WHEN v.status = 'draft' THEN 1 END) as draft_count,
      COUNT(CASE WHEN v.status = 'confirmed' THEN 1 END) as confirmed_count,
      COUNT(CASE WHEN v.status = 'cancelled' THEN 1 END) as cancelled_count
    FROM vouchers v WHERE ${conditions}
  `);
  const statsRows = normalizeDbResult(statsResult);
  const stats = statsRows[0] || {};

  const resultRows = normalizeDbResult(rows);
  return c.json({ vouchers: resultRows, total, stats, limit, offset });
}));

// 1.5 إنشاء سند متعدد السطور (سند واحد بدل عدة سندات)
enhancements.post(
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

    const requestedStatus = String(data.status || 'draft').toLowerCase() === 'confirmed' ? 'confirmed' : 'draft';

    try {
      if (requestedStatus === 'confirmed') {
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
          status: 'draft',
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
          newData: { status: 'draft', voucherType: vType, linesCount: lines.length },
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

enhancements.get('/businesses/:bizId/voucher-number-preview', bizAuthMiddleware(), safeHandler('معاينة رقم السند', async (c) => {
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

  if (!treasury) {
    return c.json({ error: 'لا يمكن توليد رقم السند قبل اختيار خزينة صحيحة' }, 400);
  }

  const counterType = `treasury_${treasury.kind}_${voucherType}`;
  const current = await getCurrentSequence(bizId, counterType, treasury.treasuryId, year);
  const nextSerial = current + 1;
  const voucherPrefix = TYPE_PREFIXES[voucherType] || 'VCH';
  const voucherNumber = `${voucherPrefix}-${treasury.treasuryCode}-${year}-${nextSerial}`;

  return c.json({
    voucherNumber,
    accountSequence: `${treasury.treasuryCode}-${year}-${nextSerial}`,
    treasuryKind: treasury.kind,
    treasuryKindCode: treasury.kindCode,
    treasuryCode: treasury.treasuryCode,
    year,
    serial: nextSerial,
  });
}));

// 2. تعديل سند (قبل الاعتماد)
enhancements.put('/businesses/:bizId/vouchers/:id', bizAuthMiddleware(), safeHandler('تعديل سند', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);

  const [existing] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!existing) return c.json({ error: 'السند غير موجود' }, 404);
  if (existing.status === 'cancelled') return c.json({ error: 'لا يمكن تعديل سند ملغي' }, 400);

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
    await db.insert(auditLog).values({
      userId, businessId: bizId, action: 'update_voucher',
      tableName: 'vouchers', recordId: id,
      oldData: { description: existing.description, amount: existing.amount },
      newData: updateData,
    });
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
enhancements.post('/businesses/:bizId/vouchers/:id/status', bizAuthMiddleware(), safeHandler('تغيير حالة السند', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);

  const body = await getBody(c);
  const newStatus = body.status;
  if (!['draft', 'confirmed', 'cancelled'].includes(newStatus)) {
    return c.json({ error: 'الحالة غير صالحة. القيم المسموحة: draft, confirmed, cancelled' }, 400);
  }

  const [existing] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!existing) return c.json({ error: 'السند غير موجود' }, 404);

  // التحقق من صحة التحول
  if (existing.status === 'cancelled') return c.json({ error: 'لا يمكن تغيير حالة سند ملغي' }, 400);

  try {
    // إذا تم اعتماد السند من مسودة → نحدّث الأرصدة وفق سطور القيد (إن وجدت)
    if (existing.status === 'draft' && newStatus === 'confirmed') {
      const amount = Number.parseFloat(String(existing.amount || 0));
      const currencyId = existing.currencyId || 1;

      await db.transaction(async (tx) => {
        const [entry] = await tx
          .select({ id: journalEntries.id })
          .from(journalEntries)
          .where(and(eq(journalEntries.businessId, bizId), eq(journalEntries.reference, existing.voucherNumber)))
          .limit(1);

        if (entry?.id) {
          const lines = await tx
            .select({
              accountId: journalEntryLines.accountId,
              lineType: journalEntryLines.lineType,
              amount: journalEntryLines.amount,
            })
            .from(journalEntryLines)
            .where(eq(journalEntryLines.journalEntryId, entry.id));

          for (const line of lines) {
            const lineAmount = Number.parseFloat(String(line.amount || 0));
            const delta = line.lineType === 'debit' ? lineAmount : -lineAmount;
            await tx.execute(sql`
              INSERT INTO account_balances (account_id, currency_id, balance)
              VALUES (${line.accountId}, ${currencyId}, ${delta})
              ON CONFLICT (account_id, currency_id) DO UPDATE SET
                balance = account_balances.balance + ${delta},
                updated_at = NOW()
            `);
          }
        } else {
          // fallback للسندات القديمة التي لا تحتوي على سطور قيد
          if (existing.toAccountId) {
            await tx.execute(sql`
              INSERT INTO account_balances (account_id, currency_id, balance)
              VALUES (${existing.toAccountId}, ${currencyId}, ${amount})
              ON CONFLICT (account_id, currency_id) DO UPDATE SET
                balance = account_balances.balance + ${amount},
                updated_at = NOW()
            `);
          }
          if (existing.fromAccountId) {
            await tx.execute(sql`
              INSERT INTO account_balances (account_id, currency_id, balance)
              VALUES (${existing.fromAccountId}, ${currencyId}, ${-amount})
              ON CONFLICT (account_id, currency_id) DO UPDATE SET
                balance = account_balances.balance - ${amount},
                updated_at = NOW()
            `);
          }
        }

        if (existing.toFundId) {
          await tx.execute(sql`
            INSERT INTO fund_balances (fund_id, currency_id, balance)
            VALUES (${existing.toFundId}, ${currencyId}, ${amount})
            ON CONFLICT (fund_id, currency_id) DO UPDATE SET
              balance = fund_balances.balance + ${amount},
              updated_at = NOW()
          `);
        }
        if (existing.fromFundId) {
          await tx.execute(sql`
            INSERT INTO fund_balances (fund_id, currency_id, balance)
            VALUES (${existing.fromFundId}, ${currencyId}, ${-amount})
            ON CONFLICT (fund_id, currency_id) DO UPDATE SET
              balance = fund_balances.balance - ${amount},
              updated_at = NOW()
          `);
        }

        await tx.update(vouchers).set({ status: 'confirmed', updatedAt: new Date() }).where(eq(vouchers.id, id));

        await tx.insert(auditLog).values({
          userId, businessId: bizId, action: 'change_voucher_status',
          tableName: 'vouchers', recordId: id,
          oldData: { status: 'draft' }, newData: { status: 'confirmed' },
        });
      });

      const [updated] = await db.select().from(vouchers).where(eq(vouchers.id, id));
      return c.json(updated);
    }

    // إرجاع السند من "معتمد" إلى "مسودة" مع عكس الأثر المحاسبي
    if (existing.status === 'confirmed' && newStatus === 'draft') {
      const amount = Number.parseFloat(String(existing.amount || 0));
      const currencyId = existing.currencyId || 1;

      await db.transaction(async (tx) => {
        const [entry] = await tx
          .select({ id: journalEntries.id })
          .from(journalEntries)
          .where(and(eq(journalEntries.businessId, bizId), eq(journalEntries.reference, existing.voucherNumber)))
          .limit(1);

        if (entry?.id) {
          const lines = await tx
            .select({
              accountId: journalEntryLines.accountId,
              lineType: journalEntryLines.lineType,
              amount: journalEntryLines.amount,
            })
            .from(journalEntryLines)
            .where(eq(journalEntryLines.journalEntryId, entry.id));

          for (const line of lines) {
            const lineAmount = Number.parseFloat(String(line.amount || 0));
            const delta = line.lineType === 'debit' ? -lineAmount : lineAmount;
            await tx.execute(sql`
              INSERT INTO account_balances (account_id, currency_id, balance)
              VALUES (${line.accountId}, ${currencyId}, ${delta})
              ON CONFLICT (account_id, currency_id) DO UPDATE SET
                balance = account_balances.balance + ${delta},
                updated_at = NOW()
            `);
          }

          await tx.delete(journalEntryLines).where(eq(journalEntryLines.journalEntryId, entry.id));
          await tx.delete(journalEntries).where(eq(journalEntries.id, entry.id));
        } else {
          // fallback للسندات القديمة التي لا تحتوي على قيد واضح
          if (existing.toAccountId) {
            await tx.execute(sql`
              INSERT INTO account_balances (account_id, currency_id, balance)
              VALUES (${existing.toAccountId}, ${currencyId}, ${-amount})
              ON CONFLICT (account_id, currency_id) DO UPDATE SET
                balance = account_balances.balance - ${amount},
                updated_at = NOW()
            `);
          }
          if (existing.fromAccountId) {
            await tx.execute(sql`
              INSERT INTO account_balances (account_id, currency_id, balance)
              VALUES (${existing.fromAccountId}, ${currencyId}, ${amount})
              ON CONFLICT (account_id, currency_id) DO UPDATE SET
                balance = account_balances.balance + ${amount},
                updated_at = NOW()
            `);
          }
        }

        if (existing.toFundId) {
          await tx.execute(sql`
            INSERT INTO fund_balances (fund_id, currency_id, balance)
            VALUES (${existing.toFundId}, ${currencyId}, ${-amount})
            ON CONFLICT (fund_id, currency_id) DO UPDATE SET
              balance = fund_balances.balance - ${amount},
              updated_at = NOW()
          `);
        }
        if (existing.fromFundId) {
          await tx.execute(sql`
            INSERT INTO fund_balances (fund_id, currency_id, balance)
            VALUES (${existing.fromFundId}, ${currencyId}, ${amount})
            ON CONFLICT (fund_id, currency_id) DO UPDATE SET
              balance = fund_balances.balance + ${amount},
              updated_at = NOW()
          `);
        }

        await tx.update(vouchers).set({
          status: 'draft',
          updatedAt: new Date(),
        }).where(eq(vouchers.id, id));

        await tx.insert(auditLog).values({
          userId, businessId: bizId, action: 'change_voucher_status',
          tableName: 'vouchers', recordId: id,
          oldData: { status: 'confirmed' }, newData: { status: 'draft' },
        });
      });

      const [updated] = await db.select().from(vouchers).where(eq(vouchers.id, id));
      return c.json(updated);
    }

    // تغيير حالة عادي (ليس من draft إلى confirmed)
    const [updated] = await db.update(vouchers).set({
      status: newStatus, updatedAt: new Date(),
    }).where(eq(vouchers.id, id)).returning();

    await db.insert(auditLog).values({
      userId, businessId: bizId, action: 'change_voucher_status',
      tableName: 'vouchers', recordId: id,
      oldData: { status: existing.status }, newData: { status: newStatus },
    });

    return c.json(updated);
  } catch (err: unknown) {
    return c.json({ error: toErrorMessage(err) || 'فشل في تغيير حالة السند' }, 400);
  }
}));

// 4. جلب رصيد حساب (لعرضه أثناء إنشاء العملية)
enhancements.get('/businesses/:bizId/account-balance/:accountId', bizAuthMiddleware(), safeHandler('جلب رصيد حساب', async (c) => {
  const bizId = getBizId(c);
  const accountId = parseId(c.req.param('accountId'));
  if (!accountId) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);

  const [account] = await db.select().from(accounts).where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)));
  if (!account) return c.json({ error: 'الحساب غير موجود' }, 404);

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

// 5. جلب تفاصيل عملية (drill-down)
enhancements.get('/businesses/:bizId/vouchers/:id/details', bizAuthMiddleware(), safeHandler('تفاصيل السند', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);

  const [voucher] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!voucher) return c.json({ error: 'السند غير موجود' }, 404);

  // جلب القيد المحاسبي المرتبط
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

  // جلب نوع العملية
  let opType = null;
  if (voucher.operationTypeId) {
    const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, voucher.operationTypeId));
    opType = ot;
  }

  // جلب الحسابات
  let fromAccount = null, toAccount = null;
  if (voucher.fromAccountId) {
    const [acc] = await db.select().from(accounts).where(eq(accounts.id, voucher.fromAccountId));
    fromAccount = acc;
  }
  if (voucher.toAccountId) {
    const [acc] = await db.select().from(accounts).where(eq(accounts.id, voucher.toAccountId));
    toAccount = acc;
  }

  // سجل التدقيق
  const auditResult = await db.execute(sql`
    SELECT * FROM audit_log WHERE table_name = 'vouchers' AND record_id = ${id} ORDER BY created_at DESC
  `);
  const auditRows = normalizeDbResult(auditResult);

  return c.json({
    voucher, operationType: opType, fromAccount, toAccount,
    journalEntries: journalRows, auditTrail: auditRows,
  });
}));

// ===================== تحسينات أنواع العمليات =====================

// 6. نسخ/استنساخ نوع عملية
enhancements.post('/businesses/:bizId/operation-types/:id/clone', bizAuthMiddleware(), safeHandler('نسخ نوع عملية', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);

  const [original] = await db.select().from(operationTypes).where(and(eq(operationTypes.id, id), eq(operationTypes.businessId, bizId)));
  if (!original) return c.json({ error: 'نوع العملية غير موجود' }, 404);

  const body = await getBody(c);
  const newName = body.name || `${original.name} (نسخة)`;
  const normalizedCategoryId = Number.isInteger(original.categoryId) && Number(original.categoryId) > 0
    ? Number(original.categoryId)
    : 0;
  const { sequenceNumber: seqNum } = await getNextItemInCategorySequence(
    bizId,
    'operation',
    normalizedCategoryId,
  );

  let categoryPrefix = String(original.code || 'OT').split('-')[0] || 'OT';
  if (normalizedCategoryId > 0) {
    const [cat] = await db
      .select({ name: operationCategories.name })
      .from(operationCategories)
      .where(and(eq(operationCategories.id, normalizedCategoryId), eq(operationCategories.businessId, bizId)))
      .limit(1);
    if (cat?.name) {
      categoryPrefix = String(cat.name).substring(0, 3).toUpperCase();
    }
  }
  const autoCode = `${categoryPrefix}-${String(seqNum).padStart(3, '0')}`;

  // إنشاء النسخة
  const [cloned] = await db.insert(operationTypes).values({
    businessId: bizId,
    name: newName,
    description: original.description,
    icon: original.icon,
    color: original.color,
    categoryId: original.categoryId,
    sequenceNumber: seqNum,
    code: autoCode,
    voucherType: original.voucherType,
    paymentMethod: original.paymentMethod,
    sourceAccountId: original.sourceAccountId,
    sourceFundId: original.sourceFundId,
    screens: original.screens,
    requiresAttachment: original.requiresAttachment,
    hasMultiLines: original.hasMultiLines,
    sortOrder: original.sortOrder,
    isActive: true,
    notes: `نسخة من: ${original.name}`,
  }).returning();

  // نسخ الحسابات المرتبطة
  const linkedAccounts = await db.select().from(operationTypeAccounts).where(eq(operationTypeAccounts.operationTypeId, id));
  if (linkedAccounts.length > 0) {
    await db.insert(operationTypeAccounts).values(
      linkedAccounts.map(la => ({
        operationTypeId: cloned.id,
        accountId: la.accountId,
        employeeBillingAccountId: la.employeeBillingAccountId,
        label: la.label,
        permission: la.permission,
        sortOrder: la.sortOrder,
        isActive: la.isActive,
      }))
    );
  }

  return c.json(cloned, 201);
}));

// 7. تفعيل/تعطيل نوع عملية
enhancements.post('/businesses/:bizId/operation-types/:id/toggle', bizAuthMiddleware(), safeHandler('تفعيل/تعطيل نوع عملية', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);

  const [existing] = await db.select().from(operationTypes).where(and(eq(operationTypes.id, id), eq(operationTypes.businessId, bizId)));
  if (!existing) return c.json({ error: 'نوع العملية غير موجود' }, 404);

  // منع تفعيل قالب غير مكتمل: يجب تحديد الخزينة والحسابات المرتبطة أولاً
  const nextIsActive = !existing.isActive;
  if (nextIsActive) {
    const vt = String(existing.voucherType ?? '').trim();
    if (vt === 'receipt' || vt === 'payment') {
      const pm = String(existing.paymentMethod ?? '').trim();
      if (!pm) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل تحديد وسيلة الدفع والخزينة' }, 400);
      if (pm === 'cash') {
        if (!existing.sourceFundId) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل تحديد الخزينة (الصندوق)' }, 400);
      } else {
        if (!existing.sourceAccountId) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل تحديد الخزينة (حساب بنك/صراف/محفظة)' }, 400);
      }
      const [cntRow] = await db.select({ cnt: count() }).from(operationTypeAccounts)
        .where(eq(operationTypeAccounts.operationTypeId, id));
      if (!cntRow?.cnt) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل إضافة حساب واحد على الأقل في الحسابات المرتبطة' }, 400);
    }
  }

  const [updated] = await db.update(operationTypes).set({
    isActive: !existing.isActive, updatedAt: new Date(),
  }).where(eq(operationTypes.id, id)).returning();

  return c.json(updated);
}));

// 8. إحصائيات استخدام أنواع العمليات
enhancements.get('/businesses/:bizId/operation-types-stats', bizAuthMiddleware(), safeHandler('إحصائيات أنواع العمليات', async (c) => {
  const bizId = getBizId(c);

  const result = await db.execute(sql`
    SELECT
      ot.id, ot.name, ot.icon, ot.color, ot.category_id, ot.voucher_type, ot.is_active,
      COUNT(v.id) as usage_count,
      COALESCE(SUM(CAST(v.amount AS NUMERIC)), 0) as total_amount,
      MAX(v.created_at) as last_used_at
    FROM operation_types ot
    LEFT JOIN vouchers v ON v.operation_type_id = ot.id AND v.status != 'cancelled'
    WHERE ot.business_id = ${bizId}
    GROUP BY ot.id, ot.name, ot.icon, ot.color, ot.category_id, ot.voucher_type, ot.is_active
    ORDER BY usage_count DESC
  `);
  const rows = normalizeDbResult(result);
  return c.json(rows);
}));

// 9. التحقق من تكرار اسم نوع العملية
enhancements.get('/businesses/:bizId/operation-types/check-name', bizAuthMiddleware(), safeHandler('التحقق من تكرار اسم', async (c) => {
  const bizId = getBizId(c);
  const name = c.req.query('name');
  const excludeId = c.req.query('excludeId');
  if (!name) return c.json({ error: 'الاسم مطلوب' }, 400);

  let conditions = sql`business_id = ${bizId} AND LOWER(name) = LOWER(${name})`;
  if (excludeId) conditions = sql`${conditions} AND id != ${parseInt(excludeId)}`;

  const result = await db.execute(sql`SELECT COUNT(*) as cnt FROM operation_types WHERE ${conditions}`);
  const first = getFirstRow<{ cnt: string }>(result);
  const exists = Number(first?.cnt ?? 0) > 0;

  return c.json({ exists, name });
}));

// ===================== تحسينات إعدادات التبويب الجانبي =====================

// 10. نسخ إعدادات من مستخدم لآخر
enhancements.post('/businesses/:bizId/sidebar-config/copy', bizAuthMiddleware(), safeHandler('نسخ إعدادات السايدبار', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const { fromUserId, toUserId } = body;
  if (!fromUserId || !toUserId) return c.json({ error: 'fromUserId و toUserId مطلوبان' }, 400);
  if (fromUserId === toUserId) return c.json({ error: 'لا يمكن النسخ لنفس المستخدم' }, 400);

  // جلب إعدادات المصدر
  const sourceConfigs = await db.select().from(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, fromUserId)));

  if (sourceConfigs.length === 0) return c.json({ error: 'لا توجد إعدادات للمستخدم المصدر' }, 404);

  // حذف إعدادات المستهدف الحالية
  await db.delete(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, toUserId)));

  // نسخ الإعدادات
  for (const cfg of sourceConfigs) {
    await db.insert(userSidebarConfig).values({
      userId: toUserId,
      businessId: bizId,
      sidebarItemId: cfg.sidebarItemId,
      isVisible: cfg.isVisible,
      customSortOrder: cfg.customSortOrder,
      customSectionName: cfg.customSectionName,
      permission: cfg.permission,
    });
  }

  return c.json({ success: true, copiedCount: sourceConfigs.length });
}));

// 11. إعادة تعيين الإعدادات الافتراضية
enhancements.post('/businesses/:bizId/sidebar-config/reset/:userId', bizAuthMiddleware(), safeHandler('إعادة تعيين إعدادات السايدبار', async (c) => {
  const bizId = getBizId(c);
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'معرّف المستخدم غير صالح' }, 400);

  // حذف الإعدادات الحالية
  await db.delete(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, userId)));

  // جلب كل العناصر وإنشاء إعدادات افتراضية (كل شيء ظاهر)
  const allItems = await db.select({ id: sidebarItems.id, sortOrder: sidebarItems.sortOrder })
    .from(sidebarItems)
    .leftJoin(sidebarSections, eq(sidebarItems.sectionId, sidebarSections.id))
    .where(eq(sidebarSections.businessId, bizId));

  for (const item of allItems) {
    await db.insert(userSidebarConfig).values({
      userId, businessId: bizId, sidebarItemId: item.id,
      isVisible: true, customSortOrder: item.sortOrder || 0,
    });
  }

  return c.json({ success: true, itemCount: allItems.length });
}));

// ===================== تحسينات الشاشات المخصصة =====================

// 12. بحث متقدم في سجل العمليات
enhancements.get('/businesses/:bizId/widget-log-enhanced', bizAuthMiddleware(), safeHandler('سجل العمليات المحسن', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const opTypeId = c.req.query('operationTypeId');
  const search = c.req.query('search');
  const minAmount = c.req.query('minAmount');
  const maxAmount = c.req.query('maxAmount');
  const status = c.req.query('status');
  const limit = parseInt(c.req.query('limit') || '50');
  const offset = parseInt(c.req.query('offset') || '0');

  let conditions = sql`je.business_id = ${bizId}`;
  if (dateFrom) conditions = sql`${conditions} AND je.entry_date >= ${dateFrom}`;
  if (dateTo) conditions = sql`${conditions} AND je.entry_date <= ${dateTo}`;
  if (opTypeId) conditions = sql`${conditions} AND je.operation_type_id = ${parseInt(opTypeId)}`;
  if (search) conditions = sql`${conditions} AND (je.description ILIKE ${'%' + search + '%'} OR je.entry_number ILIKE ${'%' + search + '%'} OR je.reference ILIKE ${'%' + search + '%'})`;
  if (minAmount) conditions = sql`${conditions} AND CAST(je.total_debit AS NUMERIC) >= ${parseFloat(minAmount)}`;
  if (maxAmount) conditions = sql`${conditions} AND CAST(je.total_debit AS NUMERIC) <= ${parseFloat(maxAmount)}`;
  if (status) conditions = sql`${conditions} AND je.status = ${status}`;

  const rows = await db.execute(sql`
    SELECT
      je.id, je.entry_number, je.description, je.entry_date, je.reference,
      je.total_debit, je.total_credit, je.status, je.created_at,
      ot.name as operation_type_name, ot.icon as operation_type_icon,
      ot.color as operation_type_color, ot.voucher_type, ot.category_id as operation_category,
      u.full_name as created_by_name
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    LEFT JOIN users u ON u.id = je.created_by
    WHERE ${conditions}
    ORDER BY je.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `);

  const countResult = await db.execute(sql`SELECT COUNT(*) as total FROM journal_entries je WHERE ${conditions}`);
  const resultRows = normalizeDbResult(rows);
  return c.json({
    entries: resultRows,
    total: Number(getFirstRow<{ total: string }>(countResult)?.total ?? 0),
    limit, offset,
  });
}));

// 13. إحصائيات متقدمة مع مقارنة فترات
enhancements.get('/businesses/:bizId/widget-stats-enhanced', bizAuthMiddleware(), safeHandler('إحصائيات متقدمة', async (c) => {
  const bizId = getBizId(c);
  const period = c.req.query('period') || 'month'; // day, week, month, year
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  let currentFrom: string, currentTo: string, prevFrom: string, prevTo: string;
  const now = new Date();

  if (dateFrom && dateTo) {
    currentFrom = dateFrom;
    currentTo = dateTo;
    const diff = new Date(dateTo).getTime() - new Date(dateFrom).getTime();
    prevFrom = new Date(new Date(dateFrom).getTime() - diff).toISOString().split('T')[0];
    prevTo = new Date(new Date(dateFrom).getTime() - 1).toISOString().split('T')[0];
  } else {
    switch (period) {
      case 'day':
        currentFrom = now.toISOString().split('T')[0];
        currentTo = currentFrom;
        const yesterday = new Date(now.getTime() - 86400000);
        prevFrom = yesterday.toISOString().split('T')[0];
        prevTo = prevFrom;
        break;
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        currentFrom = weekStart.toISOString().split('T')[0];
        currentTo = now.toISOString().split('T')[0];
        const prevWeekStart = new Date(weekStart.getTime() - 7 * 86400000);
        prevFrom = prevWeekStart.toISOString().split('T')[0];
        prevTo = new Date(weekStart.getTime() - 86400000).toISOString().split('T')[0];
        break;
      case 'year':
        currentFrom = `${now.getFullYear()}-01-01`;
        currentTo = now.toISOString().split('T')[0];
        prevFrom = `${now.getFullYear() - 1}-01-01`;
        prevTo = `${now.getFullYear() - 1}-12-31`;
        break;
      default: // month
        currentFrom = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
        currentTo = now.toISOString().split('T')[0];
        const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        prevFrom = prevMonth.toISOString().split('T')[0];
        const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        prevTo = prevMonthEnd.toISOString().split('T')[0];
    }
  }

  // الفترة الحالية
  const currentResult = await db.execute(sql`
    SELECT
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM vouchers v
    LEFT JOIN operation_types ot ON ot.id = v.operation_type_id
    WHERE v.business_id = ${bizId} AND v.status = 'confirmed'
    AND COALESCE(v.reversal_status, 'original') = 'original'
    AND v.voucher_date >= ${currentFrom}::date AND v.voucher_date <= ${currentTo}::date
  `);
  const currentRows = normalizeDbResult<PeriodStatsRow>(currentResult);

  // الفترة السابقة
  const prevResult = await db.execute(sql`
    SELECT
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM vouchers v
    LEFT JOIN operation_types ot ON ot.id = v.operation_type_id
    WHERE v.business_id = ${bizId} AND v.status = 'confirmed'
    AND COALESCE(v.reversal_status, 'original') = 'original'
    AND v.voucher_date >= ${prevFrom}::date AND v.voucher_date <= ${prevTo}::date
  `);
  const prevRows = normalizeDbResult<PeriodStatsRow>(prevResult);

  const current = currentRows[0] || { receipts: 0, payments: 0, operations_count: 0 };
  const prev = prevRows[0] || { receipts: 0, payments: 0, operations_count: 0 };

  // حساب نسب التغيير
  const calcChange = (cur: number, prv: number) => prv === 0 ? (cur > 0 ? 100 : 0) : ((cur - prv) / prv * 100);

  return c.json({
    period, currentFrom, currentTo, prevFrom, prevTo,
    current: {
      receipts: Number(current.receipts),
      payments: Number(current.payments),
      net: Number(current.receipts) - Number(current.payments),
      operationsCount: Number(current.operations_count),
    },
    previous: {
      receipts: Number(prev.receipts),
      payments: Number(prev.payments),
      net: Number(prev.receipts) - Number(prev.payments),
      operationsCount: Number(prev.operations_count),
    },
    changes: {
      receiptsChange: calcChange(Number(current.receipts), Number(prev.receipts)),
      paymentsChange: calcChange(Number(current.payments), Number(prev.payments)),
      netChange: calcChange(Number(current.receipts) - Number(current.payments), Number(prev.receipts) - Number(prev.payments)),
      operationsChange: calcChange(Number(current.operations_count), Number(prev.operations_count)),
    },
  });
}));

// 14. رسم بياني متقدم مع فلترة فترات
enhancements.get('/businesses/:bizId/widget-chart-enhanced', bizAuthMiddleware(), safeHandler('رسم بياني متقدم', async (c) => {
  const bizId = getBizId(c);
  const groupBy = c.req.query('groupBy') || 'month'; // day, week, month
  const months = parseInt(c.req.query('months') || '6');
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  let fromDate: string, toDate: string;
  if (dateFrom && dateTo) {
    fromDate = dateFrom;
    toDate = dateTo;
  } else {
    const now = new Date();
    toDate = now.toISOString().split('T')[0];
    const from = new Date(now);
    from.setMonth(from.getMonth() - months);
    fromDate = from.toISOString().split('T')[0];
  }

  let groupExpr: any;
  let labelExpr: any;
  if (groupBy === 'day') {
    groupExpr = sql`v.voucher_date::date`;
    labelExpr = sql`TO_CHAR(v.voucher_date::date, 'YYYY-MM-DD')`;
  } else if (groupBy === 'week') {
    groupExpr = sql`DATE_TRUNC('week', v.voucher_date::date)`;
    labelExpr = sql`TO_CHAR(DATE_TRUNC('week', v.voucher_date::date), 'YYYY-MM-DD')`;
  } else {
    groupExpr = sql`DATE_TRUNC('month', v.voucher_date::date)`;
    labelExpr = sql`TO_CHAR(DATE_TRUNC('month', v.voucher_date::date), 'YYYY-MM')`;
  }

  const result = await db.execute(sql`
    SELECT
      ${labelExpr} as label,
      ${groupExpr} as period,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM vouchers v
    LEFT JOIN operation_types ot ON ot.id = v.operation_type_id
    WHERE v.business_id = ${bizId}
    AND v.status = 'confirmed'
    AND COALESCE(v.reversal_status, 'original') = 'original'
    AND v.voucher_date >= ${fromDate}::date
    AND v.voucher_date <= ${toDate}::date
    GROUP BY ${groupExpr}, ${labelExpr}
    ORDER BY period ASC
  `);
  const rows = normalizeDbResult(result);

  return c.json({
    groupBy, fromDate, toDate,
    data: rows.map((r: any) => ({
      label: r.label,
      receipts: Number(r.receipts),
      payments: Number(r.payments),
      net: Number(r.receipts) - Number(r.payments),
      operationsCount: Number(r.operations_count),
    })),
  });
}));

// 15. إنشاء سند كمسودة
enhancements.post('/businesses/:bizId/vouchers-draft', bizAuthMiddleware(), safeHandler('إنشاء سند كمسودة', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = await getBody(c);

  const amount = parseFloat(body.amount);
  if (isNaN(amount) || amount <= 0) return c.json({ error: 'المبلغ يجب أن يكون رقماً موجباً' }, 400);

  const vType = body.voucherType || 'receipt';
  const voucherDate = body.voucherDate ? new Date(body.voucherDate) : new Date();
  const year = voucherDate.getFullYear();

  if (vType !== 'receipt' && vType !== 'payment') {
    // fallback للأنواع الأخرى (transfer/journal) بترقيم معزول لكل businessId
    const prefix = TYPE_PREFIXES[vType] || 'VCH';
    const counterType = `voucher_${vType}_fallback`;
    const seqVal = await getNextSequence(bizId, counterType, 0, year);
    const voucherNumber = `${prefix}-${year}-${String(seqVal).padStart(5, '0')}`;
    const [created] = await db.insert(vouchers).values({
      businessId: bizId,
      voucherNumber,
      voucherType: vType,
      status: 'draft', // مسودة - لا تؤثر على الأرصدة
      amount: String(amount),
      currencyId: body.currencyId || 1,
      fromAccountId: body.fromAccountId || null,
      toAccountId: body.toAccountId || null,
      fromFundId: body.fromFundId || null,
      toFundId: body.toFundId || null,
      operationTypeId: body.operationTypeId || null,
      description: body.description || '',
      reference: body.reference || null,
      voucherDate,
      createdBy: userId,
    }).returning();
    return c.json(created, 201);
  }

  const treasury = await resolveVoucherTreasuryInfo(
    bizId,
    vType,
    body.fromFundId ? Number(body.fromFundId) : null,
    body.toFundId ? Number(body.toFundId) : null,
    body.fromAccountId ? Number(body.fromAccountId) : null,
    body.toAccountId ? Number(body.toAccountId) : null,
  );

  if (!treasury) {
    return c.json({ error: 'لا يمكن توليد رقم السند: تأكد من اختيار خزينة مرقمة بشكل صحيح' }, 400);
  }

  const counterType = `treasury_${treasury.kind}_${vType}`;
  const seq = await getNextSequence(bizId, counterType, treasury.treasuryId, year);
  const voucherSeq = seq; // يبدأ من 1
  const voucherPrefix = TYPE_PREFIXES[vType] || 'VCH';
  const voucherNumber = `${voucherPrefix}-${treasury.treasuryCode}-${year}-${voucherSeq}`;

  const [created] = await db.insert(vouchers).values({
    businessId: bizId,
    voucherNumber,
    voucherType: vType,
    status: 'draft', // مسودة - لا تؤثر على الأرصدة
    amount: String(amount),
    currencyId: body.currencyId || 1,
    fromAccountId: body.fromAccountId || null,
    toAccountId: body.toAccountId || null,
    fromFundId: body.fromFundId || null,
    toFundId: body.toFundId || null,
    operationTypeId: body.operationTypeId || null,
    description: body.description || '',
    reference: body.reference || null,
    voucherDate,
    createdBy: userId,
    fullSequenceNumber: voucherNumber,
  }).returning();

  return c.json(created, 201);
}));

export default enhancements;
