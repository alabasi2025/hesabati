import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { eq, desc, sql, and, inArray, asc, count } from 'drizzle-orm';
import {
  operationTypes, operationTypeAccounts, accounts, accountBalances,
  sidebarSections, sidebarItems, userSidebarConfig,
  screenTemplates, screenWidgets, screenWidgetTemplates, screenWidgetAccounts, screenPermissions,
  users, vouchers, currencies, operationCategories,
} from '../db/schema/index.ts';
import { bizAuthMiddleware } from '../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, getBody, parseId, toErrorMessage } from '../middleware/helpers.ts';
import { checkPermission } from '../middleware/permissions.ts';
import { getNextSequence, getNextItemInCategorySequence } from '../middleware/sequencing.ts';
import { normalizeDbResult } from '../utils/db-result.ts';
import { getBizId, getUserId } from './api/_shared/context-helpers.ts';

const screenEnhRouter = new Hono();

// ===================== تحسينات الشاشات المخصصة =====================

// 12. بحث متقدم في سجل العمليات
screenEnhRouter.get('/businesses/:bizId/widget-log-enhanced', bizAuthMiddleware(), safeHandler('سجل العمليات المحسن', async (c) => {
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
screenEnhRouter.get('/businesses/:bizId/widget-stats-enhanced', bizAuthMiddleware(), safeHandler('إحصائيات متقدمة', async (c) => {
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
    WHERE v.business_id = ${bizId} AND v.status = 'reviewed'
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
    WHERE v.business_id = ${bizId} AND v.status = 'reviewed'
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
screenEnhRouter.get('/businesses/:bizId/widget-chart-enhanced', bizAuthMiddleware(), safeHandler('رسم بياني متقدم', async (c) => {
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
    AND v.status IN ('unreviewed', 'reviewed')
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
screenEnhRouter.post('/businesses/:bizId/vouchers-draft', bizAuthMiddleware(), safeHandler('إنشاء سند كمسودة', async (c) => {
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
      status: 'unreviewed',
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
    status: 'unreviewed',
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


export default screenEnhRouter;
