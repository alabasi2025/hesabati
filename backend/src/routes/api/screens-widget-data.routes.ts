/**
 * screens-widget-data.routes.ts — Phase 7
 * واجهات بيانات الويدجت الحقيقية (Widget Data APIs + Enhanced Widget APIs)
 */
/**
 * Screens Routes — مسارات الشاشات المخصصة والـ Widgets
 * @module routes/api/screens.routes
 * @since Phase 4
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import {
  screenTemplates, screenWidgets, screenWidgetTemplates,
  screenWidgetAccounts, screenPermissions, customScreenConfig,
  sidebarItems, sidebarSections, uiPages, uiComponents
} from '../../db/schema/core.ts';
import { eq, and, inArray, desc } from 'drizzle-orm';
import { bizAuthMiddleware, getBizId, getUserId, safeHandler, normalizeBody, parseId } from '../../middleware/auth.ts';
import * as ScreensEng from '../../engines/screens.engine.ts';

export const screensWidgetData = new Hono();
const api = screensWidgetData;


// ===================== بيانات العناصر الحقيقية (Widget Data APIs) =====================

// جلب إحصائيات الشاشة المخصصة (KPIs)
api.get('/businesses/:bizId/widget-stats', bizAuthMiddleware(), safeHandler('جلب إحصائيات العناصر', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  // إجمالي التحصيل (receipt vouchers)
  const receiptResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(total_debit AS NUMERIC)), 0) as total
    FROM journal_entries
    WHERE business_id = ${bizId}
    AND EXISTS (
      SELECT 1 FROM operation_types ot
      WHERE ot.id = journal_entries.operation_type_id
      AND (ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%')
    )
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // إجمالي الصرف (payment vouchers)
  const paymentResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(total_debit AS NUMERIC)), 0) as total
    FROM journal_entries
    WHERE business_id = ${bizId}
    AND EXISTS (
      SELECT 1 FROM operation_types ot
      WHERE ot.id = journal_entries.operation_type_id
      AND (ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%')
    )
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // عدد العمليات
  const opsResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM journal_entries
    WHERE business_id = ${bizId}
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // صافي الرصيد (مجموع أرصدة الحسابات)
  const balanceResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(ab.balance AS NUMERIC)), 0) as total
    FROM account_balances ab
    INNER JOIN accounts a ON a.id = ab.account_id
    WHERE a.business_id = ${bizId}
  `);

  const receiptRows = normalizeDbResult(receiptResult);
  const paymentRows = normalizeDbResult(paymentResult);
  const opsRows = normalizeDbResult(opsResult);
  const balanceRows = normalizeDbResult(balanceResult);

  return c.json({
    totalReceipts: Number((receiptRows[0] as any)?.total || 0),
    totalPayments: Number((paymentRows[0] as any)?.total || 0),
    operationsCount: Number((opsRows[0] as any)?.total || 0),
    netBalance: Number(getFirstRow<{ total: string }>(balanceRows)?.total || 0),
  });
}));

// جلب سجل العمليات الحقيقي
api.get('/businesses/:bizId/widget-log', bizAuthMiddleware(), safeHandler('جلب سجل العمليات للعنصر', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const opTypeId = c.req.query('operationTypeId');
  const limitParam = c.req.query('limit') || '50';
  const offsetParam = c.req.query('offset') || '0';

  let conditions = sql`je.business_id = ${bizId}`;
  if (dateFrom) conditions = sql`${conditions} AND je.entry_date >= ${dateFrom}`;
  if (dateTo) conditions = sql`${conditions} AND je.entry_date <= ${dateTo}`;
  if (opTypeId) conditions = sql`${conditions} AND je.operation_type_id = ${Number.parseInt(opTypeId)}`;

  const rows = await db.execute(sql`
    SELECT
      je.id,
      je.entry_number,
      je.description,
      je.entry_date,
      je.reference,
      je.total_debit,
      je.total_credit,
      je.status,
      je.created_at,
      ot.name as operation_type_name,
      ot.icon as operation_type_icon,
      ot.color as operation_type_color,
      ot.voucher_type,
      je.category as operation_category
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE ${conditions}
    ORDER BY je.created_at DESC
    LIMIT ${Number.parseInt(limitParam)} OFFSET ${Number.parseInt(offsetParam)}
  `);

  const countResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM journal_entries je WHERE ${conditions}
  `);
  const countRows = normalizeDbResult(countResult);

  const resultRows = normalizeDbResult(rows);
  return c.json({
    entries: resultRows,
    total: Number((countRows[0] as any)?.total || 0),
  });
}));

// جلب بيانات مراقبة الحسابات (أرصدة حقيقية + آخر حركات)
api.get('/businesses/:bizId/widget-accounts', bizAuthMiddleware(), safeHandler('جلب بيانات مراقبة الحسابات', async (c) => {
  const bizId = getBizId(c);
  const accountIdsParam = c.req.query('accountIds');

  let accountFilter = sql`a.business_id = ${bizId}`;
  if (accountIdsParam) {
    const ids = accountIdsParam.split(',').map(Number).filter((n: number) => !Number.isNaN(n));
    if (ids.length > 0) {
      const idFragments = ids.map((id: number) => sql`${id}`);
      const inClause = sql.join(idFragments, sql`, `);
      accountFilter = sql`a.business_id = ${bizId} AND a.id IN (${inClause})`;
    }
  }

  const rows = await db.execute(sql`
    SELECT
      a.id,
      a.name,
      a.account_type,
      a.is_active,
      COALESCE((
        SELECT SUM(CAST(ab.balance AS NUMERIC))
        FROM account_balances ab WHERE ab.account_id = a.id
      ), 0) as total_balance,
      (
        SELECT json_agg(bal_row) FROM (
          SELECT ab.id, ab.currency_id, ab.balance, c.code as currency_code, c.symbol as currency_symbol
          FROM account_balances ab
          LEFT JOIN currencies c ON c.id = ab.currency_id
          WHERE ab.account_id = a.id
        ) bal_row
      ) as balances,
      (
        SELECT json_agg(last_mov) FROM (
          SELECT jel.id, jel.line_type, jel.amount, jel.description, je.entry_date, je.entry_number
          FROM journal_entry_lines jel
          INNER JOIN journal_entries je ON je.id = jel.journal_entry_id
          WHERE jel.account_id = a.id
          ORDER BY je.created_at DESC
          LIMIT 5
        ) last_mov
      ) as last_movements
    FROM accounts a
    WHERE ${accountFilter}
    ORDER BY a.name
  `);

  const resultRows = normalizeDbResult(rows);
  return c.json(resultRows);
}));

// جلب بيانات الرسم البياني (حركات شهرية)
api.get('/businesses/:bizId/widget-chart', bizAuthMiddleware(), safeHandler('جلب بيانات الرسم البياني', async (c) => {
  const bizId = getBizId(c);
  const months = Number.parseInt(c.req.query('months') || '6');

  const rows = await db.execute(sql`
    SELECT
      TO_CHAR(je.entry_date, 'YYYY-MM') as period,
      TO_CHAR(je.entry_date, 'Mon') as period_label,
      EXTRACT(MONTH FROM je.entry_date) as month_num,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE je.business_id = ${bizId}
    AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 month' * ${months})
    GROUP BY TO_CHAR(je.entry_date, 'YYYY-MM'), TO_CHAR(je.entry_date, 'Mon'), EXTRACT(MONTH FROM je.entry_date)
    ORDER BY period
  `);

  const resultRows = normalizeDbResult(rows);

  const arabicMonths: Record<number, string> = {
    1: 'يناير', 2: 'فبراير', 3: 'مارس', 4: 'أبريل', 5: 'مايو', 6: 'يونيو',
    7: 'يوليو', 8: 'أغسطس', 9: 'سبتمبر', 10: 'أكتوبر', 11: 'نوفمبر', 12: 'ديسمبر',
  };

  return c.json({
    labels: (resultRows as any[]).map((r: any) => arabicMonths[Number(r.month_num)] || r.period_label),
    receipts: (resultRows as any[]).map((r: any) => Number(r.receipts)),
    payments: (resultRows as any[]).map((r: any) => Number(r.payments)),
    operationsCounts: (resultRows as any[]).map((r: any) => Number(r.operations_count)),
  });
}));

// ===================== Enhanced Widget APIs =====================

// إحصائيات محسّنة مع فلتر فترة زمنية
api.get('/businesses/:bizId/widget-stats-enhanced', bizAuthMiddleware(), safeHandler('جلب إحصائيات محسّنة', async (c) => {
  const bizId = getBizId(c);
  const period = c.req.query('period'); // today | week | month | year
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  // حساب نطاق التاريخ بناءً على الفترة
  let dateCondition = sql``;
  if (dateFrom && dateTo) {
    dateCondition = sql`AND je.entry_date >= ${dateFrom} AND je.entry_date <= ${dateTo}`;
  } else if (period === 'today') {
    dateCondition = sql`AND je.entry_date = CURRENT_DATE`;
  } else if (period === 'week') {
    dateCondition = sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '7 days')`;
  } else if (period === 'month') {
    dateCondition = sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 month')`;
  } else if (period === 'year') {
    dateCondition = sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 year')`;
  }

  const result = await db.execute(sql`
    SELECT
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as total_receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as total_payments,
      COUNT(*) as operations_count
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE je.business_id = ${bizId}
    ${dateCondition}
  `);

  const balanceResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(ab.balance AS NUMERIC)), 0) as total
    FROM account_balances ab
    INNER JOIN accounts a ON a.id = ab.account_id
    WHERE a.business_id = ${bizId}
  `);

  const rows = normalizeDbResult(result);
  const balanceRows = normalizeDbResult(balanceResult);
  const r = getFirstRow<Record<string, unknown>>(rows) || {};

  return c.json({
    totalReceipts: Number(r.total_receipts || 0),
    totalPayments: Number(r.total_payments || 0),
    operationsCount: Number(r.operations_count || 0),
    netBalance: Number(getFirstRow<{ total: string }>(balanceRows)?.total || 0),
  });
}));

// سجل عمليات محسّن مع بحث نصي وفلتر مبلغ وترقيم صفحات
api.get('/businesses/:bizId/widget-log-enhanced', bizAuthMiddleware(), safeHandler('جلب سجل عمليات محسّن', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const opTypeId = c.req.query('operationTypeId');
  const search = c.req.query('search');
  const minAmount = c.req.query('minAmount');
  const maxAmount = c.req.query('maxAmount');
  const status = c.req.query('status');
  const limitParam = c.req.query('limit') || '20';
  const offsetParam = c.req.query('offset') || '0';
  const sortBy = c.req.query('sortBy') || 'entry_date';
  const sortDir = c.req.query('sortDir') || 'desc';

  let conditions = sql`je.business_id = ${bizId}`;
  if (dateFrom) conditions = sql`${conditions} AND je.entry_date >= ${dateFrom}`;
  if (dateTo) conditions = sql`${conditions} AND je.entry_date <= ${dateTo}`;
  if (opTypeId) conditions = sql`${conditions} AND je.operation_type_id = ${Number.parseInt(opTypeId)}`;
  if (status) conditions = sql`${conditions} AND je.status = ${status}`;
  if (search) {
    conditions = sql`${conditions} AND (
      je.description ILIKE ${'%' + search + '%'}
      OR je.entry_number ILIKE ${'%' + search + '%'}
      OR je.reference ILIKE ${'%' + search + '%'}
      OR ot.name ILIKE ${'%' + search + '%'}
    )`;
  }
  if (minAmount) conditions = sql`${conditions} AND CAST(je.total_debit AS NUMERIC) >= ${Number.parseFloat(minAmount)}`;
  if (maxAmount) conditions = sql`${conditions} AND CAST(je.total_debit AS NUMERIC) <= ${Number.parseFloat(maxAmount)}`;

  // ترتيب ديناميكي
  const validSortColumns: Record<string, any> = {
    'entry_date': sql`je.entry_date`,
    'created_at': sql`je.created_at`,
    'total_debit': sql`CAST(je.total_debit AS NUMERIC)`,
    'entry_number': sql`je.entry_number`,
  };
  const sortColumn = validSortColumns[sortBy] || sql`je.entry_date`;
  const orderClause = sortDir === 'asc' ? sql`${sortColumn} ASC` : sql`${sortColumn} DESC`;

  const rows = await db.execute(sql`
    SELECT
      je.id, je.entry_number, je.description, je.entry_date, je.reference,
      je.total_debit, je.total_credit, je.status, je.created_at,
      ot.name as operation_type_name, ot.icon as operation_type_icon,
      ot.color as operation_type_color, ot.voucher_type, je.category as operation_category
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE ${conditions}
    ORDER BY ${orderClause}
    LIMIT ${Number.parseInt(limitParam)} OFFSET ${Number.parseInt(offsetParam)}
  `);

  const countResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE ${conditions}
  `);
  const countRows = normalizeDbResult(countResult);
  const resultRows = normalizeDbResult(rows);

  return c.json({
    entries: resultRows,
    total: Number(getFirstRow<{ total: string }>(countRows)?.total || 0),
  });
}));

// رسم بياني محسّن مع تجميع أسبوعي/شهري/سنوي وتواريخ مخصصة
api.get('/businesses/:bizId/widget-chart-enhanced', bizAuthMiddleware(), safeHandler('جلب بيانات رسم بياني محسّن', async (c) => {
  const bizId = getBizId(c);
  const groupBy = c.req.query('groupBy') || 'monthly'; // weekly | monthly | yearly
  const months = Number.parseInt(c.req.query('months') || '6');
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  const dateCondition = (dateFrom && dateTo)
    ? sql`AND je.entry_date >= ${dateFrom} AND je.entry_date <= ${dateTo}`
    : sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 month' * ${months})`;

  const arabicMonths: Record<number, string> = {
    1: 'يناير', 2: 'فبراير', 3: 'مارس', 4: 'أبريل', 5: 'مايو', 6: 'يونيو',
    7: 'يوليو', 8: 'أغسطس', 9: 'سبتمبر', 10: 'أكتوبر', 11: 'نوفمبر', 12: 'ديسمبر',
  };

  let periodExpr: any, periodLabel: any, orderExpr: any;

  if (groupBy === 'weekly') {
    periodExpr = sql`TO_CHAR(je.entry_date, 'IYYY-IW')`;
    periodLabel = sql`'أسبوع ' || TO_CHAR(je.entry_date, 'IW')`;
    orderExpr = sql`TO_CHAR(je.entry_date, 'IYYY-IW')`;
  } else if (groupBy === 'yearly') {
    periodExpr = sql`TO_CHAR(je.entry_date, 'YYYY')`;
    periodLabel = sql`TO_CHAR(je.entry_date, 'YYYY')`;
    orderExpr = sql`TO_CHAR(je.entry_date, 'YYYY')`;
  } else {
    periodExpr = sql`TO_CHAR(je.entry_date, 'YYYY-MM')`;
    periodLabel = sql`EXTRACT(MONTH FROM je.entry_date)`;
    orderExpr = sql`TO_CHAR(je.entry_date, 'YYYY-MM')`;
  }

  const rows = await db.execute(sql`
    SELECT
      ${periodExpr} as period,
      ${periodLabel} as period_label,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE je.business_id = ${bizId}
    ${dateCondition}
    GROUP BY ${periodExpr}, ${periodLabel}
    ORDER BY ${orderExpr}
  `);

  const resultRows = normalizeDbResult(rows);

  const labels = (resultRows as any[]).map((r: any) => {
    if (groupBy === 'monthly') {
      const monthNum = Number(r.period_label);
      return arabicMonths[monthNum] || r.period;
    }
    return String(r.period_label);
  });

  return c.json({
    labels,
    receipts: (resultRows as any[]).map((r: any) => Number(r.receipts)),
    payments: (resultRows as any[]).map((r: any) => Number(r.payments)),
    operationsCounts: (resultRows as any[]).map((r: any) => Number(r.operations_count)),
  });
}));

// حفظ/جلب ملاحظات العنصر
api.get('/widgets/:widgetId/notes', safeHandler('جلب ملاحظات العنصر', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const [widget] = await db.select({ config: screenWidgets.config }).from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!widget) return c.json({ error: 'عنصر غير موجود' }, 404);
  return c.json({ text: (widget.config as any)?.text || '' });
}));

api.put('/widgets/:widgetId/notes', safeHandler('حفظ ملاحظات العنصر', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [widget] = await db.select({ config: screenWidgets.config }).from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!widget) return c.json({ error: 'عنصر غير موجود' }, 404);
  const baseConfig = widget.config && typeof widget.config === 'object' ? widget.config : {};
  const newConfig = { ...baseConfig, text: body.text || '' };
  const [updated] = await db.update(screenWidgets).set({ config: newConfig, updatedAt: new Date() }).where(eq(screenWidgets.id, widgetId)).returning();
  return c.json(updated);
}));

// جلب قوالب العمليات مع تفاصيلها لعنصر القوالب
api.get('/businesses/:bizId/widget-operation-types', bizAuthMiddleware(), safeHandler('جلب قوالب العمليات للعنصر', async (c) => {
  const bizId = getBizId(c);
  const idsParam = c.req.query('ids');

  let rows: any[] = [];
  if (idsParam) {
    const ids = idsParam.split(',').map(Number).filter((n: number) => !Number.isNaN(n));
    if (ids.length > 0) {
      rows = await db.select().from(operationTypes)
        .where(and(eq(operationTypes.businessId, bizId), inArray(operationTypes.id, ids)))
        .orderBy(operationTypes.sortOrder);
    } else {
      rows = [];
    }
  } else {
    rows = await db.select().from(operationTypes)
      .where(and(eq(operationTypes.businessId, bizId), eq(operationTypes.isActive, true)))
      .orderBy(operationTypes.sortOrder);
  }

  // جلب الحسابات المرتبطة بكل نوع عملية
  const opTypeIds = rows.map(r => r.id);
  let opAccounts: any[] = [];
  if (opTypeIds.length > 0) {
    opAccounts = await db.select({
      id: operationTypeAccounts.id,
      operationTypeId: operationTypeAccounts.operationTypeId,
      accountId: operationTypeAccounts.accountId,
      label: operationTypeAccounts.label,
      permission: operationTypeAccounts.permission,
      accountName: accounts.name,
      accountType: accounts.accountType,
    }).from(operationTypeAccounts)
      .leftJoin(accounts, eq(operationTypeAccounts.accountId, accounts.id))
      .where(inArray(operationTypeAccounts.operationTypeId, opTypeIds));
  }

  const accMap: Record<number, any[]> = {};
  for (const a of opAccounts) {
    if (!accMap[a.operationTypeId]) accMap[a.operationTypeId] = [];
    accMap[a.operationTypeId].push(a);
  }

  return c.json(rows.map(r => ({ ...r, accounts: accMap[r.id] || [] })));
}));
// ── المسارات المستخرجة (Phase 3) ──────────────────────────────────────────────
// currency.routes.ts    → /businesses/:bizId/exchange-rates
// rbac.routes.ts        → /businesses/:bizId/roles
// attachments-enhanced  → /businesses/:bizId/attachments
// misc-categories       → /businesses/:bizId/warehouse-types
// screens.engine.ts     → يُستخدم مباشرة من engines/

