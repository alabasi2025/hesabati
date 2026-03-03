/**
 * محرك العملات وأسعار الصرف (Currency & Exchange Rate Engine)
 * ====================================
 * حسب الخطة التنفيذية - محرك 5
 * 
 * لا تغييرات DB (exchangeRates مرتبط بـ businessId بالفعل)
 * 
 * الدوال:
 * - getExchangeRate(bizId, fromCurrencyId, toCurrencyId, date?) → جلب سعر الصرف
 * - convertAmount(bizId, amount, fromCurrencyId, toCurrencyId, date?) → تحويل مبلغ
 * - getAmountInBaseCurrency(bizId, amount, currencyId, date?) → تحويل لعملة الأساس
 * - getUnifiedBalances(bizId, targetCurrencyId) → أرصدة موحدة بعملة واحدة
 * - getExchangeRateHistory(bizId, fromCurrencyId, toCurrencyId) → سجل أسعار الصرف
 * - addExchangeRate(bizId, data) → إضافة سعر صرف جديد
 */

import { db } from '../db/index.ts';
import { eq, and, desc, lte } from 'drizzle-orm';
import {
  currencies, exchangeRates, accounts, funds, businesses,
} from '../db/schema/index.ts';

// ===================== جلب سعر الصرف =====================

/**
 * جلب أحدث سعر صرف بين عملتين لعمل معين
 * يدعم البحث المباشر والعكسي
 */
export async function getExchangeRate(
  bizId: number,
  fromCurrencyId: number,
  toCurrencyId: number,
  date?: string
): Promise<{ rate: number; isDirect: boolean } | null> {
  if (fromCurrencyId === toCurrencyId) {
    return { rate: 1, isDirect: true };
  }

  const effectiveDate = date || new Date().toISOString().split('T')[0];

  // بحث مباشر
  const [direct] = await db.select()
    .from(exchangeRates)
    .where(and(
      eq(exchangeRates.businessId, bizId),
      eq(exchangeRates.fromCurrencyId, fromCurrencyId),
      eq(exchangeRates.toCurrencyId, toCurrencyId),
      lte(exchangeRates.effectiveDate, effectiveDate)
    ))
    .orderBy(desc(exchangeRates.effectiveDate))
    .limit(1);

  if (direct) {
    return { rate: Number(direct.rate), isDirect: true };
  }

  // بحث عكسي
  const [reverse] = await db.select()
    .from(exchangeRates)
    .where(and(
      eq(exchangeRates.businessId, bizId),
      eq(exchangeRates.fromCurrencyId, toCurrencyId),
      eq(exchangeRates.toCurrencyId, fromCurrencyId),
      lte(exchangeRates.effectiveDate, effectiveDate)
    ))
    .orderBy(desc(exchangeRates.effectiveDate))
    .limit(1);

  if (reverse) {
    return { rate: 1 / Number(reverse.rate), isDirect: false };
  }

  return null;
}

// ===================== تحويل مبلغ =====================

export async function convertAmount(
  bizId: number,
  amount: number,
  fromCurrencyId: number,
  toCurrencyId: number,
  date?: string
): Promise<{ convertedAmount: number; rate: number } | null> {
  const rateInfo = await getExchangeRate(bizId, fromCurrencyId, toCurrencyId, date);
  if (!rateInfo) return null;

  return {
    convertedAmount: Math.round(amount * rateInfo.rate * 100) / 100,
    rate: rateInfo.rate,
  };
}

// ===================== تحويل لعملة الأساس =====================

export async function getAmountInBaseCurrency(
  bizId: number,
  amount: number,
  currencyId: number,
  date?: string
): Promise<{ baseAmount: number; baseCurrencyId: number; rate: number }> {
  // جلب العملة الأساسية (YER كافتراضي)
  const [baseCurrency] = await db.select()
    .from(currencies)
    .where(eq(currencies.code, 'YER'))
    .limit(1);

  const baseCurrencyId = baseCurrency?.id || 1;

  if (currencyId === baseCurrencyId) {
    return { baseAmount: amount, baseCurrencyId, rate: 1 };
  }

  const conversion = await convertAmount(bizId, amount, currencyId, baseCurrencyId, date);
  if (conversion) {
    return { baseAmount: conversion.convertedAmount, baseCurrencyId, rate: conversion.rate };
  }

  return { baseAmount: amount, baseCurrencyId, rate: 1 };
}

// ===================== أرصدة موحدة =====================

export async function getUnifiedBalances(bizId: number, targetCurrencyId: number) {
  const accountsList = await db.select({
    id: accounts.id,
    name: accounts.name,
    balance: accounts.balance,
    currencyId: accounts.currencyId,
  })
    .from(accounts)
    .where(eq(accounts.businessId, bizId));

  const fundsList = await db.select({
    id: funds.id,
    name: funds.name,
    balance: funds.balance,
    currencyId: funds.currencyId,
  })
    .from(funds)
    .where(eq(funds.businessId, bizId));

  const unifiedAccounts = await Promise.all(
    accountsList.map(async (acc) => {
      const balance = Number(acc.balance || 0);
      if (acc.currencyId === targetCurrencyId) {
        return { ...acc, originalBalance: balance, unifiedBalance: balance, rate: 1 };
      }
      const conversion = await convertAmount(bizId, balance, acc.currencyId, targetCurrencyId);
      return {
        ...acc,
        originalBalance: balance,
        unifiedBalance: conversion?.convertedAmount || balance,
        rate: conversion?.rate || 1,
      };
    })
  );

  const unifiedFunds = await Promise.all(
    fundsList.map(async (fund) => {
      const balance = Number(fund.balance || 0);
      if (fund.currencyId === targetCurrencyId) {
        return { ...fund, originalBalance: balance, unifiedBalance: balance, rate: 1 };
      }
      const conversion = await convertAmount(bizId, balance, fund.currencyId, targetCurrencyId);
      return {
        ...fund,
        originalBalance: balance,
        unifiedBalance: conversion?.convertedAmount || balance,
        rate: conversion?.rate || 1,
      };
    })
  );

  const totalAccounts = unifiedAccounts.reduce((sum, a) => sum + a.unifiedBalance, 0);
  const totalFunds = unifiedFunds.reduce((sum, f) => sum + f.unifiedBalance, 0);

  return {
    targetCurrencyId,
    accounts: unifiedAccounts,
    funds: unifiedFunds,
    totals: {
      accounts: Math.round(totalAccounts * 100) / 100,
      funds: Math.round(totalFunds * 100) / 100,
      total: Math.round((totalAccounts + totalFunds) * 100) / 100,
    },
  };
}

// ===================== سجل أسعار الصرف =====================

export async function getExchangeRateHistory(
  bizId: number,
  fromCurrencyId: number,
  toCurrencyId: number,
  limit: number = 30
) {
  return db.select()
    .from(exchangeRates)
    .where(and(
      eq(exchangeRates.businessId, bizId),
      eq(exchangeRates.fromCurrencyId, fromCurrencyId),
      eq(exchangeRates.toCurrencyId, toCurrencyId)
    ))
    .orderBy(desc(exchangeRates.effectiveDate))
    .limit(limit);
}

// ===================== إضافة سعر صرف =====================

export async function addExchangeRate(
  bizId: number,
  data: {
    fromCurrencyId: number;
    toCurrencyId: number;
    rate: number;
    effectiveDate: string;
    source?: string;
    notes?: string;
    createdBy?: number;
  }
) {
  const [rate] = await db.insert(exchangeRates).values({
    businessId: bizId,
    fromCurrencyId: data.fromCurrencyId,
    toCurrencyId: data.toCurrencyId,
    rate: String(data.rate),
    effectiveDate: data.effectiveDate,
    source: data.source || 'manual',
    notes: data.notes || null,
    createdBy: data.createdBy || null,
  }).returning();

  return rate;
}
