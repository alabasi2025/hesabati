/**
 * Currency Routes — مسارات العملات وأسعار الصرف
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
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';

export const currencyRoutes = new Hono();
const api = currencyRoutes;

// ===================== أسعار الصرف اليومية (مُحوَّل إلى currency.engine) =====================
api.get('/businesses/:bizId/exchange-rates', bizAuthMiddleware(), safeHandler('جلب أسعار الصرف', async (c) => {
  const bizId = getBizId(c);
  const dateParam = c.req.query('date');
  // استخدام currency engine لجلب السجل
  const rows = await getExchangeRateHistory(bizId, undefined, undefined, 200);
  // فلترة بالتاريخ إذا طُلب
  const result = dateParam
    ? rows.filter(r => {
        const d = r.effectiveDate instanceof Date ? r.effectiveDate.toISOString().split('T')[0] : String(r.effectiveDate).split('T')[0];
        return d === dateParam;
      })
    : rows;
  return c.json(result);
}));

api.post('/businesses/:bizId/exchange-rates', bizAuthMiddleware(), safeHandler('إضافة سعر صرف', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = await getBody(c);
  if (!body.fromCurrencyId || !body.toCurrencyId || !body.rate || !body.effectiveDate) {
    return c.json({ error: 'جميع الحقول مطلوبة: fromCurrencyId, toCurrencyId, rate, effectiveDate' }, 400);
  }
  // استخدام currency engine لإضافة سعر الصرف مع مسح الـ cache تلقائياً
  const created = await addExchangeRate(bizId, {
    fromCurrencyId: Number(body.fromCurrencyId),
    toCurrencyId: Number(body.toCurrencyId),
    rate: Number(body.rate),
    effectiveDate: new Date(String(body.effectiveDate)),
    createdBy: userId,
  });
  return c.json(created, 201);
}));

api.put('/businesses/:bizId/exchange-rates/:id', bizAuthMiddleware(), safeHandler('تعديل سعر صرف', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = await getBody(c);
  // مسح cache عند التعديل
  clearRateCache();
  const [updated] = await db.update(exchangeRates).set({
    rate: body.rate ? String(body.rate) : undefined,
    effectiveDate: body.effectiveDate, source: body.source, notes: body.notes,
  }).where(and(eq(exchangeRates.id, id), eq(exchangeRates.businessId, bizId))).returning();
  if (!updated) return c.json({ error: 'سعر الصرف غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/businesses/:bizId/exchange-rates/:id', bizAuthMiddleware(), safeHandler('حذف سعر صرف', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  // مسح cache عند الحذف
  clearRateCache();
  await db.delete(exchangeRates).where(and(eq(exchangeRates.id, id), eq(exchangeRates.businessId, bizId)));
  return c.json({ success: true });
}));

// Helper: تحويل عملة عبر currency.engine
api.get('/businesses/:bizId/exchange-rates/convert', bizAuthMiddleware(), safeHandler('تحويل عملة', async (c) => {
  const bizId = getBizId(c);
  const fromId = Number.parseInt(c.req.query('from') || '0');
  const toId = Number.parseInt(c.req.query('to') || '0');
  const amountStr = c.req.query('amount') || '1';
  if (!fromId || !toId) return c.json({ error: 'from و to مطلوبان' }, 400);
  const amount = Number.parseFloat(amountStr);
  const rate = await getExchangeRate(bizId, fromId, toId);
  return c.json({
    rate,
    convertedAmount: amount * rate,
    fromCurrencyId: fromId,
    toCurrencyId: toId,
  });
}));

// [جديد] جلب الأرصدة الموحدة بعملة واحدة عبر currency.engine
api.get('/businesses/:bizId/unified-balances', bizAuthMiddleware(), safeHandler('الأرصدة الموحدة', async (c) => {
  const bizId = getBizId(c);
  const targetCurrencyId = Number.parseInt(c.req.query('currencyId') || '0');
  if (!targetCurrencyId) return c.json({ error: 'currencyId مطلوب' }, 400);
  const balances = await getUnifiedBalances(bizId, targetCurrencyId);
  return c.json(balances);
}));

