/**
 * Currency Routes â€” ظ…ط³ط§ط±ط§طھ ط§ظ„ط¹ظ…ظ„ط§طھ ظˆط£ط³ط¹ط§ط± ط§ظ„طµط±ظپ
 * @module routes/api/currency.routes
 * @since Phase 3
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { currencies, exchangeRates } from '../../db/schema/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import {
  getExchangeRate,
  getExchangeRateHistory, addExchangeRate, clearRateCache, getUnifiedBalances,
  getAllActiveCurrencies, validateRateBounds, requireExchangeDiffAccount,
} from '../../engines/currency.engine.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';

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
        const d = String(r.effectiveDate).split('T')[0];
        return d === dateParam;
      })
    : rows;
  return c.json(result);
}));

api.post('/businesses/:bizId/exchange-rates', bizAuthMiddleware(), safeHandler('ط¥ط¶ط§ظپط© ط³ط¹ط± طµط±ظپ', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = await getBody(c);
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
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = await getBody(c);
  // مسح cache عند التعديل
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

// ===================== CRUD العملات =====================
api.get('/currencies', safeHandler('جلب العملات', async (c) => {
  const rows = await getAllActiveCurrencies();
  return c.json(rows);
}));

api.get('/currencies/all', safeHandler('جلب كل العملات', async (c) => {
  const rows = await db.select().from(currencies);
  return c.json(rows);
}));

api.post('/currencies', safeHandler('إضافة عملة', async (c) => {
  const body = await getBody(c);
  if (!body.code || !body.nameAr || !body.symbol) {
    return c.json({ error: 'الحقول المطلوبة: code, nameAr, symbol' }, 400);
  }
  const code = String(body.code).toUpperCase().trim();
  const existing = await db.select({ id: currencies.id }).from(currencies).where(eq(currencies.code, code)).limit(1);
  if (existing.length > 0) return c.json({ error: 'رمز العملة موجود مسبقاً' }, 400);

  const [created] = await db.insert(currencies).values({
    code,
    nameAr: String(body.nameAr).trim(),
    symbol: String(body.symbol).trim(),
    exchangeRate: body.exchangeRate ? String(body.exchangeRate) : '1',
    minRate: body.minRate ? String(body.minRate) : null,
    maxRate: body.maxRate ? String(body.maxRate) : null,
    isDefault: body.isDefault === true,
    isActive: body.isActive !== false,
  }).returning();
  return c.json(created, 201);
}));

api.put('/currencies/:id', safeHandler('تعديل عملة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = await getBody(c);

  const updateData: Record<string, any> = {};
  if (body.nameAr !== undefined) updateData.nameAr = String(body.nameAr).trim();
  if (body.symbol !== undefined) updateData.symbol = String(body.symbol).trim();
  if (body.exchangeRate !== undefined) updateData.exchangeRate = String(body.exchangeRate);
  if (body.minRate !== undefined) updateData.minRate = body.minRate ? String(body.minRate) : null;
  if (body.maxRate !== undefined) updateData.maxRate = body.maxRate ? String(body.maxRate) : null;
  if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);

  if (Object.keys(updateData).length === 0) return c.json({ error: 'لا توجد بيانات للتحديث' }, 400);

  const [updated] = await db.update(currencies).set(updateData).where(eq(currencies.id, id)).returning();
  if (!updated) return c.json({ error: 'العملة غير موجودة' }, 404);
  clearRateCache();
  return c.json(updated);
}));

api.delete('/currencies/:id', safeHandler('حذف عملة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [currency] = await db.select().from(currencies).where(eq(currencies.id, id)).limit(1);
  if (!currency) return c.json({ error: 'العملة غير موجودة' }, 404);
  if (currency.isDefault) return c.json({ error: 'لا يمكن حذف العملة الأساسية' }, 400);
  await db.update(currencies).set({ isActive: false }).where(eq(currencies.id, id));
  return c.json({ success: true });
}));

// ===================== التحقق من حساب فروقات العملة =====================
api.get('/businesses/:bizId/exchange-diff-account', bizAuthMiddleware(), safeHandler('التحقق من حساب فروقات العملة', async (c) => {
  const bizId = getBizId(c);
  const result = await requireExchangeDiffAccount(bizId);
  return c.json(result);
}));

// ===================== التحقق من سعر الصرف ضمن الحدود =====================
api.post('/currencies/:id/validate-rate', safeHandler('التحقق من سعر الصرف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = await getBody(c);
  if (!body.rate) return c.json({ error: 'rate مطلوب' }, 400);
  const result = await validateRateBounds(id, Number(body.rate));
  return c.json(result);
}));

// ===================== إعادة تقييم العملات =====================
api.get('/businesses/:bizId/revaluation/preview', bizAuthMiddleware(), safeHandler('معاينة إعادة التقييم', async (c) => {
  const bizId = getBizId(c);
  const date = c.req.query('date') || undefined;
  const { previewRevaluation } = await import('../../engines/revaluation.engine.ts');
  const result = await previewRevaluation(bizId, date);
  return c.json(result);
}));

api.post('/businesses/:bizId/revaluation/execute', bizAuthMiddleware(), safeHandler('تنفيذ إعادة التقييم', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = await getBody(c);
  const date = body.date || undefined;
  const { executeRevaluation } = await import('../../engines/revaluation.engine.ts');
  const result = await executeRevaluation(bizId, userId ?? 0, date);
  return c.json(result);
}));
