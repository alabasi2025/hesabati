/**
 * Currency Engine – محرك العملات وأسعار الصرف
 * ===============================================
 * نقل من services/currency.service.ts إلى engines/
 * مع إضافة ربط تلقائي بالـ routes وتحسين الـ caching.
 *
 * الدوال المتاحة:
 *  - getExchangeRate()        : جلب سعر صرف بين عملتين
 *  - convertAmount()          : تحويل مبلغ من عملة إلى أخرى
 *  - getAmountInBaseCurrency(): تحويل مبلغ إلى العملة الأساسية
 *  - getUnifiedBalances()     : أرصدة جميع الحسابات بعملة موحدة
 *  - getExchangeRateHistory() : سجل أسعار الصرف
 *  - addExchangeRate()        : إضافة سعر صرف جديد
 *  - getLatestRates()         : جلب آخر أسعار صرف لجميع العملات [جديد]
 *  - validateCurrency()       : التحقق من صحة عملة لعمل تجاري [جديد]
 */

import { db } from "../db/index.ts";
import { eq, and, desc, lte, sql, ne } from "drizzle-orm";
import {
  currencies,
  exchangeRates,
  accountBalances,
  accounts,
  fundBalances,
  funds,
  bankBalances,
  banks,
  walletBalances,
  wallets,
  exchangeBalances,
  exchanges,
  accountCurrencies,
} from "../db/schema/index.ts";

// ─── Cache ────────────────────────────────────────────────────────────────────
const rateCache = new Map<string, { rate: number; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 دقائق

function getCacheKey(bizId: number, fromCurrencyId: number, toCurrencyId: number, date?: string) {
  return `${bizId}:${fromCurrencyId}:${toCurrencyId}:${date ?? "latest"}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ExchangeRateResult {
  rate: number;
  fromCurrencyCode: string;
  toCurrencyCode: string;
  date: string;
  source: "cache" | "db" | "fallback";
}

export interface UnifiedBalance {
  accountId?: number;
  fundId?: number;
  name: string;
  type: string;
  balance: number;
  originalCurrencyCode: string;
  convertedBalance: number;
  targetCurrencyCode: string;
  exchangeRate: number;
}

// ─── Core Functions ───────────────────────────────────────────────────────────

/**
 * جلب سعر صرف بين عملتين لعمل تجاري محدد
 */
export async function getExchangeRate(
  bizId: number,
  fromCurrencyId: number,
  toCurrencyId: number,
  date?: string
): Promise<number> {
  if (fromCurrencyId === toCurrencyId) return 1;

  const cacheKey = getCacheKey(bizId, fromCurrencyId, toCurrencyId, date);
  const cached = rateCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.rate;
  }

  const dateFilter = date ? new Date(date) : new Date();

  const [rateRow] = await db
    .select()
    .from(exchangeRates)
    .where(
      and(
        eq(exchangeRates.businessId, bizId),
        eq(exchangeRates.fromCurrencyId, fromCurrencyId),
        eq(exchangeRates.toCurrencyId, toCurrencyId),
        lte(exchangeRates.effectiveDate, dateFilter)
      )
    )
    .orderBy(desc(exchangeRates.effectiveDate))
    .limit(1);

  if (rateRow) {
    const rate = parseFloat(String(rateRow.rate));
    rateCache.set(cacheKey, { rate, timestamp: Date.now() });
    return rate;
  }

  // البحث في الاتجاه العكسي
  const [inverseRow] = await db
    .select()
    .from(exchangeRates)
    .where(
      and(
        eq(exchangeRates.businessId, bizId),
        eq(exchangeRates.fromCurrencyId, toCurrencyId),
        eq(exchangeRates.toCurrencyId, fromCurrencyId),
        lte(exchangeRates.effectiveDate, dateFilter)
      )
    )
    .orderBy(desc(exchangeRates.effectiveDate))
    .limit(1);

  if (inverseRow) {
    const rate = 1 / parseFloat(String(inverseRow.rate));
    rateCache.set(cacheKey, { rate, timestamp: Date.now() });
    return rate;
  }

  // fallback: استخدام السعر الافتراضي من جدول العملات
  const [fromCurrency] = await db
    .select({ exchangeRate: currencies.exchangeRate })
    .from(currencies)
    .where(eq(currencies.id, fromCurrencyId))
    .limit(1);
  const [toCurrency] = await db
    .select({ exchangeRate: currencies.exchangeRate })
    .from(currencies)
    .where(eq(currencies.id, toCurrencyId))
    .limit(1);

  if (fromCurrency && toCurrency) {
    const fromRate = parseFloat(String(fromCurrency.exchangeRate));
    const toRate = parseFloat(String(toCurrency.exchangeRate));
    if (fromRate > 0 && toRate > 0) {
      const rate = fromRate / toRate;
      rateCache.set(cacheKey, { rate, timestamp: Date.now() });
      return rate;
    }
  }

  return 1; // fallback أخير: لا تحويل
}

/**
 * تحويل مبلغ من عملة إلى أخرى
 */
export async function convertAmount(
  bizId: number,
  amount: number,
  fromCurrencyId: number,
  toCurrencyId: number,
  date?: string
): Promise<number> {
  if (fromCurrencyId === toCurrencyId) return amount;
  const rate = await getExchangeRate(bizId, fromCurrencyId, toCurrencyId, date);
  return amount * rate;
}

/**
 * تحويل مبلغ إلى العملة الأساسية للعمل التجاري
 */
export async function getAmountInBaseCurrency(
  bizId: number,
  amount: number,
  fromCurrencyId: number,
  date?: string
): Promise<number> {
  const [baseCurrency] = await db
    .select({ id: currencies.id })
    .from(currencies)
    .where(eq(currencies.isDefault, true))
    .limit(1);

  if (!baseCurrency) return amount;
  return convertAmount(bizId, amount, fromCurrencyId, baseCurrency.id, date);
}

/**
 * جلب أرصدة جميع الحسابات والصناديق بعملة موحدة
 */
export async function getUnifiedBalances(
  bizId: number,
  targetCurrencyId: number
): Promise<UnifiedBalance[]> {
  const accountRows = await db
    .select({
      accountId: accountBalances.accountId,
      name: accounts.name,
      type: accounts.accountType,
      balance: accountBalances.balance,
      currencyId: accountBalances.currencyId,
    })
    .from(accountBalances)
    .innerJoin(accounts, eq(accounts.id, accountBalances.accountId))
    .where(eq(accounts.businessId, bizId));

  const fundRows = await db
    .select({
      fundId: fundBalances.fundId,
      name: funds.name,
      balance: fundBalances.balance,
      currencyId: fundBalances.currencyId,
    })
    .from(fundBalances)
    .innerJoin(funds, eq(funds.id, fundBalances.fundId))
    .where(eq(funds.businessId, bizId));

  const currencyCodesMap = await getCurrencyCodesMap();

  const results: UnifiedBalance[] = [];

  for (const row of accountRows) {
    const balance = parseFloat(String(row.balance ?? 0));
    const currencyId = row.currencyId;
    const rate = await getExchangeRate(bizId, currencyId, targetCurrencyId);
    results.push({
      accountId: row.accountId,
      name: row.name ?? "",
      type: String(row.type ?? ""),
      balance,
      originalCurrencyCode: currencyCodesMap[currencyId] ?? "—",
      convertedBalance: balance * rate,
      targetCurrencyCode: currencyCodesMap[targetCurrencyId] ?? "—",
      exchangeRate: rate,
    });
  }

  for (const row of fundRows) {
    const balance = parseFloat(String(row.balance ?? 0));
    const currencyId = row.currencyId;
    const rate = await getExchangeRate(bizId, currencyId, targetCurrencyId);
    results.push({
      fundId: row.fundId,
      name: row.name ?? "",
      type: "fund",
      balance,
      originalCurrencyCode: currencyCodesMap[currencyId] ?? "—",
      convertedBalance: balance * rate,
      targetCurrencyCode: currencyCodesMap[targetCurrencyId] ?? "—",
      exchangeRate: rate,
    });
  }

  return results;
}

/**
 * سجل أسعار الصرف مع فلترة اختيارية
 */
export async function getExchangeRateHistory(
  bizId: number,
  fromCurrencyId?: number,
  toCurrencyId?: number,
  limit = 50
) {
  let conditions: any[] = [eq(exchangeRates.businessId, bizId)];

  if (fromCurrencyId) conditions.push(eq(exchangeRates.fromCurrencyId, fromCurrencyId));
  if (toCurrencyId) conditions.push(eq(exchangeRates.toCurrencyId, toCurrencyId));

  const rows = await db
    .select()
    .from(exchangeRates)
    .where(and(...conditions))
    .orderBy(desc(exchangeRates.effectiveDate))
    .limit(limit);

  return rows;
}

/**
 * إضافة سعر صرف جديد مع مسح الـ cache
 */
export async function addExchangeRate(
  bizId: number,
  data: {
    fromCurrencyId: number;
    toCurrencyId: number;
    rate: number;
    effectiveDate?: Date;
    createdBy?: number;
  }
) {
  // مسح الـ cache المرتبط
  const prefix = `${bizId}:${data.fromCurrencyId}:${data.toCurrencyId}:`;
  for (const key of rateCache.keys()) {
    if (key.startsWith(prefix)) rateCache.delete(key);
  }

  const [created] = await db
    .insert(exchangeRates)
    .values({
      businessId: bizId,
      fromCurrencyId: data.fromCurrencyId,
      toCurrencyId: data.toCurrencyId,
      rate: String(data.rate),
      effectiveDate: data.effectiveDate ?? new Date(),
      createdBy: data.createdBy ?? null,
    })
    .returning();

  return created;
}

/**
 * [جديد] جلب آخر أسعار صرف لجميع العملات
 */
export async function getLatestRates(bizId: number) {
  const rows = await db
    .select({
      fromCurrencyId: exchangeRates.fromCurrencyId,
      toCurrencyId: exchangeRates.toCurrencyId,
      rate: exchangeRates.rate,
      effectiveDate: exchangeRates.effectiveDate,
      fromCode: sql<string>`fc.code`,
      toCode: sql<string>`tc.code`,
    })
    .from(exchangeRates)
    .innerJoin(
      sql`currencies fc`,
      sql`fc.id = ${exchangeRates.fromCurrencyId}`
    )
    .innerJoin(
      sql`currencies tc`,
      sql`tc.id = ${exchangeRates.toCurrencyId}`
    )
    .where(
      sql`(${exchangeRates.businessId} = ${bizId}) AND ${exchangeRates.effectiveDate} = (
        SELECT MAX(er2.effective_date)
        FROM exchange_rates er2
        WHERE er2.business_id = ${bizId}
          AND er2.from_currency_id = ${exchangeRates.fromCurrencyId}
          AND er2.to_currency_id = ${exchangeRates.toCurrencyId}
      )`
    );

  return rows;
}

/**
 * [جديد] التحقق من صحة عملة لعمل تجاري
 */
export async function validateCurrency(
  currencyId: number
): Promise<boolean> {
  const [currency] = await db
    .select({ id: currencies.id })
    .from(currencies)
    .where(and(eq(currencies.id, currencyId), eq(currencies.isActive, true)))
    .limit(1);

  return !!currency;
}

/**
 * مساعد داخلي: خريطة id → code للعملات
 */
async function getCurrencyCodesMap(): Promise<Record<number, string>> {
  const rows = await db
    .select({ id: currencies.id, code: currencies.code })
    .from(currencies);

  return Object.fromEntries(rows.map((r) => [r.id, r.code]));
}

/**
 * مسح جميع الـ cache (للاستخدام في الاختبارات)
 */
export function clearRateCache() {
  rateCache.clear();
}

/**
 * التحقق أن سعر الصرف ضمن السقف والأرضية
 */
export async function validateRateBounds(
  currencyId: number,
  rate: number
): Promise<{ valid: boolean; minRate?: number; maxRate?: number }> {
  const [currency] = await db
    .select({
      minRate: currencies.minRate,
      maxRate: currencies.maxRate,
      isDefault: currencies.isDefault,
    })
    .from(currencies)
    .where(eq(currencies.id, currencyId))
    .limit(1);

  if (!currency || currency.isDefault) return { valid: true };

  const min = currency.minRate ? parseFloat(String(currency.minRate)) : null;
  const max = currency.maxRate ? parseFloat(String(currency.maxRate)) : null;

  if (min !== null && rate < min) return { valid: false, minRate: min, maxRate: max ?? undefined };
  if (max !== null && rate > max) return { valid: false, minRate: min ?? undefined, maxRate: max };

  return { valid: true, minRate: min ?? undefined, maxRate: max ?? undefined };
}

/**
 * جلب العملات المسموحة لحساب معين
 */
export async function getAccountCurrencies(accountId: number) {
  const rows = await db
    .select({
      currencyId: accountCurrencies.currencyId,
      isDefault: accountCurrencies.isDefault,
      code: currencies.code,
      nameAr: currencies.nameAr,
      symbol: currencies.symbol,
    })
    .from(accountCurrencies)
    .innerJoin(currencies, eq(currencies.id, accountCurrencies.currencyId))
    .where(eq(accountCurrencies.accountId, accountId));

  return rows;
}

/**
 * جلب العملة الأساسية (الافتراضية)
 */
export async function getBaseCurrency() {
  const [base] = await db
    .select()
    .from(currencies)
    .where(eq(currencies.isDefault, true))
    .limit(1);
  return base ?? null;
}

/**
 * جلب جميع العملات النشطة
 */
export async function getAllActiveCurrencies() {
  return db
    .select()
    .from(currencies)
    .where(eq(currencies.isActive, true));
}

/**
 * جلب العملات الأجنبية فقط (غير الأساسية)
 */
export async function getForeignCurrencies() {
  return db
    .select()
    .from(currencies)
    .where(and(eq(currencies.isActive, true), eq(currencies.isDefault, false)));
}

/**
 * ⛔ حماية حرجة: التحقق من وجود حساب فروقات العملة للعمل التجاري
 * يجب استدعاء هذه الدالة قبل أي عملية بعملة أجنبية
 */
export async function requireExchangeDiffAccount(bizId: number): Promise<{ exists: boolean; accountId?: number }> {
  const { accountSubNatures } = await import("../db/schema/index.ts");

  const rows = await db
    .select({ id: accounts.id, name: accounts.name })
    .from(accounts)
    .innerJoin(accountSubNatures, eq(accounts.accountSubNatureId, accountSubNatures.id))
    .where(and(
      eq(accounts.businessId, bizId),
      eq(accountSubNatures.natureKey, 'intermediary'),
      eq(accounts.isLeafAccount, true),
      sql`LOWER(${accounts.name}) LIKE '%فروقات عملة%' OR LOWER(${accounts.name}) LIKE '%فروقات صرف%' OR LOWER(${accounts.name}) LIKE '%exchange diff%'`
    ))
    .limit(1);

  if (rows.length > 0) {
    return { exists: true, accountId: rows[0].id };
  }
  return { exists: false };
}

/**
 * التحقق مما إذا كانت العملة أجنبية (غير أساسية)
 */
export async function isForeignCurrency(currencyId: number): Promise<boolean> {
  const [currency] = await db
    .select({ isDefault: currencies.isDefault })
    .from(currencies)
    .where(eq(currencies.id, currencyId))
    .limit(1);

  return currency ? !currency.isDefault : false;
}
