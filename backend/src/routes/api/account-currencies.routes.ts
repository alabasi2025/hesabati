/**
 * Account Currencies Routes — مسارات عملات الحسابات
 * @module routes/api/account-currencies.routes
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { accountCurrencies, currencies } from '../../db/schema/index.ts';
import { eq, and } from 'drizzle-orm';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';
import { getAccountCurrencies } from '../../engines/currency.engine.ts';

export const accountCurrenciesRoutes = new Hono();

// جلب العملات المرتبطة بحساب
accountCurrenciesRoutes.get('/accounts/:accountId/currencies', safeHandler('جلب عملات الحساب', async (c) => {
  const accountId = parseId(c.req.param('accountId'));
  if (!accountId) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const rows = await getAccountCurrencies(accountId);
  return c.json(rows);
}));

// ربط عملة بحساب
accountCurrenciesRoutes.post('/accounts/:accountId/currencies', safeHandler('ربط عملة بحساب', async (c) => {
  const accountId = parseId(c.req.param('accountId'));
  if (!accountId) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const body = await getBody(c);
  if (!body.currencyId) return c.json({ error: 'currencyId مطلوب' }, 400);

  const currencyId = Number(body.currencyId);
  const existing = await db.select({ id: accountCurrencies.id }).from(accountCurrencies)
    .where(and(eq(accountCurrencies.accountId, accountId), eq(accountCurrencies.currencyId, currencyId))).limit(1);
  if (existing.length > 0) return c.json({ error: 'العملة مرتبطة بالحساب مسبقاً' }, 400);

  const [created] = await db.insert(accountCurrencies).values({
    accountId,
    currencyId,
    isDefault: body.isDefault === true,
  }).returning();
  return c.json(created, 201);
}));

// ربط عملات متعددة بحساب دفعة واحدة
accountCurrenciesRoutes.post('/accounts/:accountId/currencies/bulk', safeHandler('ربط عملات متعددة بحساب', async (c) => {
  const accountId = parseId(c.req.param('accountId'));
  if (!accountId) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const body = await getBody(c);
  if (!body.currencyIds || !Array.isArray(body.currencyIds)) {
    return c.json({ error: 'currencyIds مطلوب كمصفوفة' }, 400);
  }

  // حذف العملات الحالية وإعادة الربط
  await db.delete(accountCurrencies).where(eq(accountCurrencies.accountId, accountId));

  const values = (body.currencyIds as number[]).map((cid: number, idx: number) => ({
    accountId,
    currencyId: cid,
    isDefault: body.defaultCurrencyId ? cid === Number(body.defaultCurrencyId) : idx === 0,
  }));

  if (values.length > 0) {
    await db.insert(accountCurrencies).values(values);
  }

  const rows = await getAccountCurrencies(accountId);
  return c.json(rows);
}));

// حذف ربط عملة من حساب
accountCurrenciesRoutes.delete('/accounts/:accountId/currencies/:currencyId', safeHandler('حذف عملة من حساب', async (c) => {
  const accountId = parseId(c.req.param('accountId'));
  const currencyId = parseId(c.req.param('currencyId'));
  if (!accountId || !currencyId) return c.json({ error: 'معرّف غير صالح' }, 400);

  await db.delete(accountCurrencies).where(
    and(eq(accountCurrencies.accountId, accountId), eq(accountCurrencies.currencyId, currencyId))
  );
  return c.json({ success: true });
}));
