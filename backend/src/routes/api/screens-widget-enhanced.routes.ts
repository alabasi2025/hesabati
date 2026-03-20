/**
 * screens-widget-enhanced.routes.ts â€” Phase 15
 * ط¨ظٹط§ظ†ط§طھ ط§ظ„ط¹ظ†ط§طµط± ط§ظ„ظ…ط­ط³ظ‘ظ†ط© + ط§ظ„ظ…ظ„ط§ط­ط¸ط§طھ + ظ‚ظˆط§ظ„ط¨ ط§ظ„ط¹ظ…ظ„ظٹط§طھ
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, sql, desc, between, gte, lte } from 'drizzle-orm';
import {
  businesses, accounts, accountBalances, vouchers, voucherLines,
  funds, fundBalances, screenWidgets, screenWidgetAccounts, screenWidgetWarehouses,
  warehouseOperations, warehouseOperationItems, inventoryItems,
  operationTypes,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, parseId } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';

const widgetEnhancedApi = new Hono();

// ===================== Enhanced Widget APIs =====================

// ط¥ط­طµط§ط¦ظٹط§طھ ظ…ط­ط³ظ‘ظ†ط© ظ…ط¹ ظپظ„طھط± ظپطھط±ط© ط²ظ…ظ†ظٹط©
widgetEnhancedApi.get('/businesses/:bizId/widget-stats-enhanced', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط¥ط­طµط§ط¦ظٹط§طھ ظ…ط­ط³ظ‘ظ†ط©', async (c) => {
  const bizId = getBizId(c);
  const period = c.req.query('period'); // today | week | month | year
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  // ط­ط³ط§ط¨ ظ†ط·ط§ظ‚ ط§ظ„طھط§ط±ظٹط® ط¨ظ†ط§ط،ظ‹ ط¹ظ„ظ‰ ط§ظ„ظپطھط±ط©
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
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%طھط­طµظٹظ„%' OR ot.name ILIKE '%طھط­طµظٹظ„%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as total_receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%طµط±ظپ%' OR je.category ILIKE '%ظ…طµط±ظˆظپط§طھ%' OR ot.name ILIKE '%طµط±ظپ%' OR ot.name ILIKE '%ظ…طµط±ظˆظپط§طھ%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as total_payments,
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

// ط³ط¬ظ„ ط¹ظ…ظ„ظٹط§طھ ظ…ط­ط³ظ‘ظ† ظ…ط¹ ط¨ط­ط« ظ†طµظٹ ظˆظپظ„طھط± ظ…ط¨ظ„ط؛ ظˆطھط±ظ‚ظٹظ… طµظپط­ط§طھ
widgetEnhancedApi.get('/businesses/:bizId/widget-log-enhanced', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط³ط¬ظ„ ط¹ظ…ظ„ظٹط§طھ ظ…ط­ط³ظ‘ظ†', async (c) => {
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

  // طھط±طھظٹط¨ ط¯ظٹظ†ط§ظ…ظٹظƒظٹ
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

// ط±ط³ظ… ط¨ظٹط§ظ†ظٹ ظ…ط­ط³ظ‘ظ† ظ…ط¹ طھط¬ظ…ظٹط¹ ط£ط³ط¨ظˆط¹ظٹ/ط´ظ‡ط±ظٹ/ط³ظ†ظˆظٹ ظˆطھظˆط§ط±ظٹط® ظ…ط®طµطµط©
widgetEnhancedApi.get('/businesses/:bizId/widget-chart-enhanced', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط¨ظٹط§ظ†ط§طھ ط±ط³ظ… ط¨ظٹط§ظ†ظٹ ظ…ط­ط³ظ‘ظ†', async (c) => {
  const bizId = getBizId(c);
  const groupBy = c.req.query('groupBy') || 'monthly'; // weekly | monthly | yearly
  const months = Number.parseInt(c.req.query('months') || '6');
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  const dateCondition = (dateFrom && dateTo)
    ? sql`AND je.entry_date >= ${dateFrom} AND je.entry_date <= ${dateTo}`
    : sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 month' * ${months})`;

  const arabicMonths: Record<number, string> = {
    1: 'ظٹظ†ط§ظٹط±', 2: 'ظپط¨ط±ط§ظٹط±', 3: 'ظ…ط§ط±ط³', 4: 'ط£ط¨ط±ظٹظ„', 5: 'ظ…ط§ظٹظˆ', 6: 'ظٹظˆظ†ظٹظˆ',
    7: 'ظٹظˆظ„ظٹظˆ', 8: 'ط£ط؛ط³ط·ط³', 9: 'ط³ط¨طھظ…ط¨ط±', 10: 'ط£ظƒطھظˆط¨ط±', 11: 'ظ†ظˆظپظ…ط¨ط±', 12: 'ط¯ظٹط³ظ…ط¨ط±',
  };

  let periodExpr: any, periodLabel: any, orderExpr: any;

  if (groupBy === 'weekly') {
    periodExpr = sql`TO_CHAR(je.entry_date, 'IYYY-IW')`;
    periodLabel = sql`'ط£ط³ط¨ظˆط¹ ' || TO_CHAR(je.entry_date, 'IW')`;
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
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%طھط­طµظٹظ„%' OR ot.name ILIKE '%طھط­طµظٹظ„%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%طµط±ظپ%' OR je.category ILIKE '%ظ…طµط±ظˆظپط§طھ%' OR ot.name ILIKE '%طµط±ظپ%' OR ot.name ILIKE '%ظ…طµط±ظˆظپط§طھ%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as payments,
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

// ط­ظپط¸/ط¬ظ„ط¨ ظ…ظ„ط§ط­ط¸ط§طھ ط§ظ„ط¹ظ†طµط±
widgetEnhancedApi.get('/widgets/:widgetId/notes', safeHandler('ط¬ظ„ط¨ ظ…ظ„ط§ط­ط¸ط§طھ ط§ظ„ط¹ظ†طµط±', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ط¹ظ†طµط± ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [widget] = await db.select({ config: screenWidgets.config }).from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!widget) return c.json({ error: 'ط¹ظ†طµط± ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  return c.json({ text: (widget.config as any)?.text || '' });
}));

widgetEnhancedApi.put('/widgets/:widgetId/notes', safeHandler('ط­ظپط¸ ظ…ظ„ط§ط­ط¸ط§طھ ط§ظ„ط¹ظ†طµط±', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ط¹ظ†طµط± ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const body = normalizeBody(await c.req.json());
  const [widget] = await db.select({ config: screenWidgets.config }).from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!widget) return c.json({ error: 'ط¹ظ†طµط± ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  const baseConfig = widget.config && typeof widget.config === 'object' ? widget.config : {};
  const newConfig = { ...baseConfig, text: body.text || '' };
  const [updated] = await db.update(screenWidgets).set({ config: newConfig, updatedAt: new Date() }).where(eq(screenWidgets.id, widgetId)).returning();
  return c.json(updated);
}));

// ط¬ظ„ط¨ ظ‚ظˆط§ظ„ط¨ ط§ظ„ط¹ظ…ظ„ظٹط§طھ ظ…ط¹ طھظپط§طµظٹظ„ظ‡ط§ ظ„ط¹ظ†طµط± ط§ظ„ظ‚ظˆط§ظ„ط¨
widgetEnhancedApi.get('/businesses/:bizId/widget-operation-types', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ظ‚ظˆط§ظ„ط¨ ط§ظ„ط¹ظ…ظ„ظٹط§طھ ظ„ظ„ط¹ظ†طµط±', async (c) => {
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

  // ط¬ظ„ط¨ ط§ظ„ط­ط³ط§ط¨ط§طھ ط§ظ„ظ…ط±طھط¨ط·ط© ط¨ظƒظ„ ظ†ظˆط¹ ط¹ظ…ظ„ظٹط©
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
// â”€â”€ ط§ظ„ظ…ط³ط§ط±ط§طھ ط§ظ„ظ…ط³طھط®ط±ط¬ط© (Phase 3) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// currency.routes.ts    â†’ /businesses/:bizId/exchange-rates
// rbac.routes.ts        â†’ /businesses/:bizId/roles
// attachments-enhanced  â†’ /businesses/:bizId/attachments
// misc-categories       â†’ /businesses/:bizId/warehouse-types
// screens.engine.ts     â†’ ظٹظڈط³طھط®ط¯ظ… ظ…ط¨ط§ط´ط±ط© ظ…ظ† engines/


export { widgetEnhancedApi };

