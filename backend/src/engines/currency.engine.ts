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
import { eq, and, desc, lte, sql } from "drizzle-orm";
import {
  currencies,
  exchangeRates,
  accountBalances,
  accounts,
  fundBalances,
  funds,
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

  return 1; // fallback: لا تحويل
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
    .where(and(eq(currencies.businessId, bizId), eq(currencies.isBase, true)))
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
      accountId: accounts.id,
      name: accounts.name,
      type: accounts.accountType,
      balance: accountBalances.balance,
      currencyId: accounts.currencyId,
    })
    .from(accounts)
    .leftJoin(
      accountBalances,
      and(
        eq(accountBalances.accountId, accounts.id),
        eq(accountBalances.businessId, bizId)
      )
    )
    .where(eq(accounts.businessId, bizId));

  const fundRows = await db
    .select({
      fundId: funds.id,
      name: funds.name,
      type: funds.fundType,
      balance: fundBalances.balance,
      currencyId: funds.currencyId,
    })
    .from(funds)
    .leftJoin(
      fundBalances,
      and(
        eq(fundBalances.fundId, funds.id),
        eq(fundBalances.businessId, bizId)
      )
    )
    .where(eq(funds.businessId, bizId));

  const currencyCodesMap = await getCurrencyCodesMap(bizId);

  const results: UnifiedBalance[] = [];

  for (const row of accountRows) {
    const balance = parseFloat(String(row.balance ?? 0));
    const currencyId = row.currencyId ?? targetCurrencyId;
    const exchangeRate = await getExchangeRate(bizId, currencyId, targetCurrencyId);
    results.push({
      accountId: row.accountId,
      name: row.name ?? "",
      type: String(row.type ?? ""),
      balance,
      originalCurrencyCode: currencyCodesMap[currencyId] ?? "—",
      convertedBalance: balance * exchangeRate,
      targetCurrencyCode: currencyCodesMap[targetCurrencyId] ?? "—",
      exchangeRate,
    });
  }

  for (const row of fundRows) {
    const balance = parseFloat(String(row.balance ?? 0));
    const currencyId = row.currencyId ?? targetCurrencyId;
    const exchangeRate = await getExchangeRate(bizId, currencyId, targetCurrencyId);
    results.push({
      fundId: row.fundId,
      name: row.name ?? "",
      type: String(row.type ?? ""),
      balance,
      originalCurrencyCode: currencyCodesMap[currencyId] ?? "—",
      convertedBalance: balance * exchangeRate,
      targetCurrencyCode: currencyCodesMap[targetCurrencyId] ?? "—",
      exchangeRate,
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
  bizId: number,
  currencyId: number
): Promise<boolean> {
  const [currency] = await db
    .select({ id: currencies.id })
    .from(currencies)
    .where(and(eq(currencies.id, currencyId), eq(currencies.businessId, bizId)))
    .limit(1);

  return !!currency;
}

/**
 * مساعد داخلي: خريطة id → code للعملات
 */
async function getCurrencyCodesMap(bizId: number): Promise<Record<number, string>> {
  const rows = await db
    .select({ id: currencies.id, code: currencies.code })
    .from(currencies)
    .where(eq(currencies.businessId, bizId));

  return Object.fromEntries(rows.map((r) => [r.id, r.code]));
}

/**
 * مسح جميع الـ cache (للاستخدام في الاختبارات)
 */
export function clearRateCache() {
  rateCache.clear();
}
