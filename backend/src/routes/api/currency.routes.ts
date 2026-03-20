/**
 * Currency Routes â€” ظ…ط³ط§ط±ط§طھ ط§ظ„ط¹ظ…ظ„ط§طھ ظˆط£ط³ط¹ط§ط± ط§ظ„طµط±ظپ
 * @module routes/api/currency.routes
 * @since Phase 3
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { exchangeRates } from '../../db/schema/core.ts';
import { eq, and } from 'drizzle-orm';
import {
  getExchangeRateHistory, addExchangeRate, clearRateCache, getUnifiedBalances
} from '../../engines/currency.engine.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';

export const currencyRoutes = new Hono();
const api = currencyRoutes;

// ===================== ط£ط³ط¹ط§ط± ط§ظ„طµط±ظپ ط§ظ„ظٹظˆظ…ظٹط© (ظ…ظڈط­ظˆظژظ‘ظ„ ط¥ظ„ظ‰ currency.engine) =====================
api.get('/businesses/:bizId/exchange-rates', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط£ط³ط¹ط§ط± ط§ظ„طµط±ظپ', async (c) => {
  const bizId = getBizId(c);
  const dateParam = c.req.query('date');
  // ط§ط³طھط®ط¯ط§ظ… currency engine ظ„ط¬ظ„ط¨ ط§ظ„ط³ط¬ظ„
  const rows = await getExchangeRateHistory(bizId, undefined, undefined, 200);
  // ظپظ„طھط±ط© ط¨ط§ظ„طھط§ط±ظٹط® ط¥ط°ط§ ط·ظڈظ„ط¨
  const result = dateParam
    ? rows.filter(r => {
        const d = r.effectiveDate instanceof Date ? r.effectiveDate.toISOString().split('T')[0] : String(r.effectiveDate).split('T')[0];
        return d === dateParam;
      })
    : rows;
  return c.json(result);
}));

api.post('/businesses/:bizId/exchange-rates', bizAuthMiddleware(), safeHandler('ط¥ط¶ط§ظپط© ط³ط¹ط± طµط±ظپ', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = normalizeBody(await c.req.json());
  if (!body.fromCurrencyId || !body.toCurrencyId || !body.rate || !body.effectiveDate) {
    return c.json({ error: 'ط¬ظ…ظٹط¹ ط§ظ„ط­ظ‚ظˆظ„ ظ…ط·ظ„ظˆط¨ط©: fromCurrencyId, toCurrencyId, rate, effectiveDate' }, 400);
  }
  // ط§ط³طھط®ط¯ط§ظ… currency engine ظ„ط¥ط¶ط§ظپط© ط³ط¹ط± ط§ظ„طµط±ظپ ظ…ط¹ ظ…ط³ط­ ط§ظ„ظ€ cache طھظ„ظ‚ط§ط¦ظٹط§ظ‹
  const created = await addExchangeRate(bizId, {
    fromCurrencyId: Number(body.fromCurrencyId),
    toCurrencyId: Number(body.toCurrencyId),
    rate: Number(body.rate),
    effectiveDate: new Date(String(body.effectiveDate)),
    createdBy: userId,
  });
  return c.json(created, 201);
}));

api.put('/businesses/:bizId/exchange-rates/:id', bizAuthMiddleware(), safeHandler('طھط¹ط¯ظٹظ„ ط³ط¹ط± طµط±ظپ', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const body = normalizeBody(await c.req.json());
  // ظ…ط³ط­ cache ط¹ظ†ط¯ ط§ظ„طھط¹ط¯ظٹظ„
  clearRateCache();
  const [updated] = await db.update(exchangeRates).set({
    rate: body.rate ? String(body.rate) : undefined,
    effectiveDate: body.effectiveDate, source: body.source, notes: body.notes,
  }).where(and(eq(exchangeRates.id, id), eq(exchangeRates.businessId, bizId))).returning();
  if (!updated) return c.json({ error: 'ط³ط¹ط± ط§ظ„طµط±ظپ ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  return c.json(updated);
}));

api.delete('/businesses/:bizId/exchange-rates/:id', bizAuthMiddleware(), safeHandler('ط­ط°ظپ ط³ط¹ط± طµط±ظپ', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  // ظ…ط³ط­ cache ط¹ظ†ط¯ ط§ظ„ط­ط°ظپ
  clearRateCache();
  await db.delete(exchangeRates).where(and(eq(exchangeRates.id, id), eq(exchangeRates.businessId, bizId)));
  return c.json({ success: true });
}));

// Helper: طھط­ظˆظٹظ„ ط¹ظ…ظ„ط© ط¹ط¨ط± currency.engine
api.get('/businesses/:bizId/exchange-rates/convert', bizAuthMiddleware(), safeHandler('طھط­ظˆظٹظ„ ط¹ظ…ظ„ط©', async (c) => {
  const bizId = getBizId(c);
  const fromId = Number.parseInt(c.req.query('from') || '0');
  const toId = Number.parseInt(c.req.query('to') || '0');
  const amountStr = c.req.query('amount') || '1';
  if (!fromId || !toId) return c.json({ error: 'from ظˆ to ظ…ط·ظ„ظˆط¨ط§ظ†' }, 400);
  const amount = Number.parseFloat(amountStr);
  const rate = await getExchangeRate(bizId, fromId, toId);
  return c.json({
    rate,
    convertedAmount: amount * rate,
    fromCurrencyId: fromId,
    toCurrencyId: toId,
  });
}));

// [ط¬ط¯ظٹط¯] ط¬ظ„ط¨ ط§ظ„ط£ط±طµط¯ط© ط§ظ„ظ…ظˆط­ط¯ط© ط¨ط¹ظ…ظ„ط© ظˆط§ط­ط¯ط© ط¹ط¨ط± currency.engine
api.get('/businesses/:bizId/unified-balances', bizAuthMiddleware(), safeHandler('ط§ظ„ط£ط±طµط¯ط© ط§ظ„ظ…ظˆط­ط¯ط©', async (c) => {
  const bizId = getBizId(c);
  const targetCurrencyId = Number.parseInt(c.req.query('currencyId') || '0');
  if (!targetCurrencyId) return c.json({ error: 'currencyId ظ…ط·ظ„ظˆط¨' }, 400);
  const balances = await getUnifiedBalances(bizId, targetCurrencyId);
  return c.json(balances);
}));


