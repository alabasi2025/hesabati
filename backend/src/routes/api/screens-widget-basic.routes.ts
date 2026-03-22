/**
 * screens-widget-basic.routes.ts â€” Phase 15
 * ط¨ظٹط§ظ†ط§طھ ط§ظ„ط¹ظ†ط§طµط± ط§ظ„ط£ط³ط§ط³ظٹط©: stats, log, accounts, chart
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, sql, desc, between, gte, lte } from 'drizzle-orm';
import {
  businesses, accounts, accountBalances, vouchers, voucherLines,
  funds, fundBalances, screenWidgets, screenWidgetAccounts, screenWidgetWarehouses,
  warehouseOperations, warehouseOperationItems, inventoryItems,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, parseId } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';

const widgetBasicApi = new Hono();

// ط¬ظ„ط¨ ط¥ط­طµط§ط¦ظٹط§طھ ط§ظ„ط´ط§ط´ط© ط§ظ„ظ…ط®طµطµط© (KPIs)
widgetBasicApi.get('/businesses/:bizId/widget-stats', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط¥ط­طµط§ط¦ظٹط§طھ ط§ظ„ط¹ظ†ط§طµط±', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  // ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„طھط­طµظٹظ„ (receipt vouchers)
  const receiptResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(total_debit AS NUMERIC)), 0) as total
    FROM journal_entries
    WHERE business_id = ${bizId}
    AND EXISTS (
      SELECT 1 FROM operation_types ot
      WHERE ot.id = journal_entries.operation_type_id
      AND (ot.voucher_type = 'receipt' OR je.category ILIKE '%طھط­طµظٹظ„%' OR ot.name ILIKE '%طھط­طµظٹظ„%')
    )
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„طµط±ظپ (payment vouchers)
  const paymentResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(total_debit AS NUMERIC)), 0) as total
    FROM journal_entries
    WHERE business_id = ${bizId}
    AND EXISTS (
      SELECT 1 FROM operation_types ot
      WHERE ot.id = journal_entries.operation_type_id
      AND (ot.voucher_type = 'payment' OR je.category ILIKE '%طµط±ظپ%' OR je.category ILIKE '%ظ…طµط±ظˆظپط§طھ%' OR ot.name ILIKE '%طµط±ظپ%' OR ot.name ILIKE '%ظ…طµط±ظˆظپط§طھ%')
    )
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // ط¹ط¯ط¯ ط§ظ„ط¹ظ…ظ„ظٹط§طھ
  const opsResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM journal_entries
    WHERE business_id = ${bizId}
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // طµط§ظپظٹ ط§ظ„ط±طµظٹط¯ (ظ…ط¬ظ…ظˆط¹ ط£ط±طµط¯ط© ط§ظ„ط­ط³ط§ط¨ط§طھ)
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

// ط¬ظ„ط¨ ط³ط¬ظ„ ط§ظ„ط¹ظ…ظ„ظٹط§طھ ط§ظ„ط­ظ‚ظٹظ‚ظٹ
widgetBasicApi.get('/businesses/:bizId/widget-log', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط³ط¬ظ„ ط§ظ„ط¹ظ…ظ„ظٹط§طھ ظ„ظ„ط¹ظ†طµط±', async (c) => {
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

// ط¬ظ„ط¨ ط¨ظٹط§ظ†ط§طھ ظ…ط±ط§ظ‚ط¨ط© ط§ظ„ط­ط³ط§ط¨ط§طھ (ط£ط±طµط¯ط© ط­ظ‚ظٹظ‚ظٹط© + ط¢ط®ط± ط­ط±ظƒط§طھ)
widgetBasicApi.get('/businesses/:bizId/widget-accounts', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط¨ظٹط§ظ†ط§طھ ظ…ط±ط§ظ‚ط¨ط© ط§ظ„ط­ط³ط§ط¨ط§طھ', async (c) => {
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

// ط¬ظ„ط¨ ط¨ظٹط§ظ†ط§طھ ط§ظ„ط±ط³ظ… ط§ظ„ط¨ظٹط§ظ†ظٹ (ط­ط±ظƒط§طھ ط´ظ‡ط±ظٹط©)
widgetBasicApi.get('/businesses/:bizId/widget-chart', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط¨ظٹط§ظ†ط§طھ ط§ظ„ط±ط³ظ… ط§ظ„ط¨ظٹط§ظ†ظٹ', async (c) => {
  const bizId = getBizId(c);
  const months = Number.parseInt(c.req.query('months') || '6');

  const rows = await db.execute(sql`
    SELECT
      TO_CHAR(je.entry_date, 'YYYY-MM') as period,
      TO_CHAR(je.entry_date, 'Mon') as period_label,
      EXTRACT(MONTH FROM je.entry_date) as month_num,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%طھط­طµظٹظ„%' OR ot.name ILIKE '%طھط­طµظٹظ„%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%طµط±ظپ%' OR je.category ILIKE '%ظ…طµط±ظˆظپط§طھ%' OR ot.name ILIKE '%طµط±ظپ%' OR ot.name ILIKE '%ظ…طµط±ظˆظپط§طھ%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as payments,
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
    1: 'ظٹظ†ط§ظٹط±', 2: 'ظپط¨ط±ط§ظٹط±', 3: 'ظ…ط§ط±ط³', 4: 'ط£ط¨ط±ظٹظ„', 5: 'ظ…ط§ظٹظˆ', 6: 'ظٹظˆظ†ظٹظˆ',
    7: 'ظٹظˆظ„ظٹظˆ', 8: 'ط£ط؛ط³ط·ط³', 9: 'ط³ط¨طھظ…ط¨ط±', 10: 'ط£ظƒطھظˆط¨ط±', 11: 'ظ†ظˆظپظ…ط¨ط±', 12: 'ط¯ظٹط³ظ…ط¨ط±',
  };

  return c.json({
    labels: (resultRows as any[]).map((r: any) => arabicMonths[Number(r.month_num)] || r.period_label),
    receipts: (resultRows as any[]).map((r: any) => Number(r.receipts)),
    payments: (resultRows as any[]).map((r: any) => Number(r.payments)),
    operationsCounts: (resultRows as any[]).map((r: any) => Number(r.operations_count)),
  });
}));


export { widgetBasicApi };

