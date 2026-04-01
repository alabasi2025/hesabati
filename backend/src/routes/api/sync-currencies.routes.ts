/**
 * sync-currencies.routes.ts
 * مزامنة العملات من الحسابات إلى الكيانات المرتبطة (صناديق، بنوك، محافظ، صرافين)
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, inArray, notInArray } from "drizzle-orm";
import {
  accounts,
  accountCurrencies,
  funds,
  fundBalances,
  banks,
  bankBalances,
  wallets,
  walletBalances,
  exchanges,
  exchangeBalances,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const syncRoutes = new Hono();

// مزامنة عملات صندوق واحد
syncRoutes.post(
  "/businesses/:bizId/funds/:fundId/sync-currencies",
  bizAuthMiddleware(),
  safeHandler("مزامنة عملات الصندوق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const fundId = Number(c.req.param("fundId"));

    const [fund] = await db
      .select({ id: funds.id, accountId: funds.accountId })
      .from(funds)
      .where(and(eq(funds.id, fundId), eq(funds.businessId, bizId)))
      .limit(1);

    if (!fund || !fund.accountId) {
      return c.json({ error: "الصندوق غير موجود أو غير مرتبط بحساب" }, 404);
    }

    // جلب العملات من الحساب
    const accountCurrenciesRows = await db
      .select({ currencyId: accountCurrencies.currencyId })
      .from(accountCurrencies)
      .where(eq(accountCurrencies.accountId, fund.accountId));

    if (accountCurrenciesRows.length === 0) {
      return c.json({ message: "الحساب المرتبط ليس له عملات محددة" }, 200);
    }

    const currencyIds = accountCurrenciesRows.map((ac) => ac.currencyId);

    // جلب العملات الموجودة في fund_balances
    const existingBalances = await db
      .select({ currencyId: fundBalances.currencyId })
      .from(fundBalances)
      .where(eq(fundBalances.fundId, fundId));

    const existingCurrencyIds = existingBalances.map((b) => b.currencyId);

    // العملات المفقودة = العملات في الحساب - العملات الموجودة
    const missingCurrencyIds = currencyIds.filter(
      (cid) => !existingCurrencyIds.includes(cid)
    );

    // إضافة العملات المفقودة
    if (missingCurrencyIds.length > 0) {
      const newBalances = missingCurrencyIds.map((cid) => ({
        fundId: fundId,
        currencyId: cid,
        balance: "0",
        updatedAt: new Date(),
      }));
      await db.insert(fundBalances).values(newBalances);
    }

    return c.json({
      success: true,
      added: missingCurrencyIds.length,
      total: currencyIds.length,
    });
  })
);

// مزامنة عملات جميع الصناديق
syncRoutes.post(
  "/businesses/:bizId/funds/sync-currencies",
  bizAuthMiddleware(),
  safeHandler("مزامنة عملات جميع الصناديق", async (c: AppContext) => {
    const bizId = getBizId(c);

    const allFunds = await db
      .select({ id: funds.id, accountId: funds.accountId })
      .from(funds)
      .where(eq(funds.businessId, bizId));

    let totalAdded = 0;

    for (const fund of allFunds) {
      if (!fund.accountId) continue;

      const accountCurrenciesRows = await db
        .select({ currencyId: accountCurrencies.currencyId })
        .from(accountCurrencies)
        .where(eq(accountCurrencies.accountId, fund.accountId));

      if (accountCurrenciesRows.length === 0) continue;

      const currencyIds = accountCurrenciesRows.map((ac) => ac.currencyId);
      const existingBalances = await db
        .select({ currencyId: fundBalances.currencyId })
        .from(fundBalances)
        .where(eq(fundBalances.fundId, fund.id));

      const existingCurrencyIds = existingBalances.map((b) => b.currencyId);
      const missingCurrencyIds = currencyIds.filter(
        (cid) => !existingCurrencyIds.includes(cid)
      );

      if (missingCurrencyIds.length > 0) {
        const newBalances = missingCurrencyIds.map((cid) => ({
          fundId: fund.id,
          currencyId: cid,
          balance: "0",
          updatedAt: new Date(),
        }));
        await db.insert(fundBalances).values(newBalances);
        totalAdded += missingCurrencyIds.length;
      }
    }

    return c.json({
      success: true,
      fundsProcessed: allFunds.length,
      currenciesAdded: totalAdded,
    });
  })
);

// مزامنة عملات جميع البنوك
syncRoutes.post(
  "/businesses/:bizId/banks/sync-currencies",
  bizAuthMiddleware(),
  safeHandler("مزامنة عملات جميع البنوك", async (c: AppContext) => {
    const bizId = getBizId(c);

    const allBanks = await db
      .select({ id: banks.id, accountId: banks.accountId })
      .from(banks)
      .where(eq(banks.businessId, bizId));

    let totalAdded = 0;

    for (const bank of allBanks) {
      if (!bank.accountId) continue;

      const accountCurrenciesRows = await db
        .select({ currencyId: accountCurrencies.currencyId })
        .from(accountCurrencies)
        .where(eq(accountCurrencies.accountId, bank.accountId));

      if (accountCurrenciesRows.length === 0) continue;

      const currencyIds = accountCurrenciesRows.map((ac) => ac.currencyId);
      const existingBalances = await db
        .select({ currencyId: bankBalances.currencyId })
        .from(bankBalances)
        .where(eq(bankBalances.bankId, bank.id));

      const existingCurrencyIds = existingBalances.map((b) => b.currencyId);
      const missingCurrencyIds = currencyIds.filter(
        (cid) => !existingCurrencyIds.includes(cid)
      );

      if (missingCurrencyIds.length > 0) {
        const newBalances = missingCurrencyIds.map((cid) => ({
          bankId: bank.id,
          currencyId: cid,
          balance: "0",
          updatedAt: new Date(),
        }));
        await db.insert(bankBalances).values(newBalances);
        totalAdded += missingCurrencyIds.length;
      }
    }

    return c.json({
      success: true,
      banksProcessed: allBanks.length,
      currenciesAdded: totalAdded,
    });
  })
);

// مزامنة عملات جميع المحافظ
syncRoutes.post(
  "/businesses/:bizId/wallets/sync-currencies",
  bizAuthMiddleware(),
  safeHandler("مزامنة عملات جميع المحافظ", async (c: AppContext) => {
    const bizId = getBizId(c);

    const allWallets = await db
      .select({ id: wallets.id, accountId: wallets.accountId })
      .from(wallets)
      .where(eq(wallets.businessId, bizId));

    let totalAdded = 0;

    for (const wallet of allWallets) {
      if (!wallet.accountId) continue;

      const accountCurrenciesRows = await db
        .select({ currencyId: accountCurrencies.currencyId })
        .from(accountCurrencies)
        .where(eq(accountCurrencies.accountId, wallet.accountId));

      if (accountCurrenciesRows.length === 0) continue;

      const currencyIds = accountCurrenciesRows.map((ac) => ac.currencyId);
      const existingBalances = await db
        .select({ currencyId: walletBalances.currencyId })
        .from(walletBalances)
        .where(eq(walletBalances.walletId, wallet.id));

      const existingCurrencyIds = existingBalances.map((b) => b.currencyId);
      const missingCurrencyIds = currencyIds.filter(
        (cid) => !existingCurrencyIds.includes(cid)
      );

      if (missingCurrencyIds.length > 0) {
        const newBalances = missingCurrencyIds.map((cid) => ({
          walletId: wallet.id,
          currencyId: cid,
          balance: "0",
          updatedAt: new Date(),
        }));
        await db.insert(walletBalances).values(newBalances);
        totalAdded += missingCurrencyIds.length;
      }
    }

    return c.json({
      success: true,
      walletsProcessed: allWallets.length,
      currenciesAdded: totalAdded,
    });
  })
);

// مزامنة عملات جميع الصرافين
syncRoutes.post(
  "/businesses/:bizId/exchanges/sync-currencies",
  bizAuthMiddleware(),
  safeHandler("مزامنة عملات جميع الصرافين", async (c: AppContext) => {
    const bizId = getBizId(c);

    const allExchanges = await db
      .select({ id: exchanges.id, accountId: exchanges.accountId })
      .from(exchanges)
      .where(eq(exchanges.businessId, bizId));

    let totalAdded = 0;

    for (const exchange of allExchanges) {
      if (!exchange.accountId) continue;

      const accountCurrenciesRows = await db
        .select({ currencyId: accountCurrencies.currencyId })
        .from(accountCurrencies)
        .where(eq(accountCurrencies.accountId, exchange.accountId));

      if (accountCurrenciesRows.length === 0) continue;

      const currencyIds = accountCurrenciesRows.map((ac) => ac.currencyId);
      const existingBalances = await db
        .select({ currencyId: exchangeBalances.currencyId })
        .from(exchangeBalances)
        .where(eq(exchangeBalances.exchangeId, exchange.id));

      const existingCurrencyIds = existingBalances.map((b) => b.currencyId);
      const missingCurrencyIds = currencyIds.filter(
        (cid) => !existingCurrencyIds.includes(cid)
      );

      if (missingCurrencyIds.length > 0) {
        const newBalances = missingCurrencyIds.map((cid) => ({
          exchangeId: exchange.id,
          currencyId: cid,
          balance: "0",
          updatedAt: new Date(),
        }));
        await db.insert(exchangeBalances).values(newBalances);
        totalAdded += missingCurrencyIds.length;
      }
    }

    return c.json({
      success: true,
      exchangesProcessed: allExchanges.length,
      currenciesAdded: totalAdded,
    });
  })
);

// مزامنة الكل دفعة واحدة
syncRoutes.post(
  "/businesses/:bizId/sync-all-currencies",
  bizAuthMiddleware(),
  safeHandler("مزامنة جميع العملات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const results = {
      funds: 0,
      banks: 0,
      wallets: 0,
      exchanges: 0,
    };

    // Funds
    const allFunds = await db.select({ id: funds.id, accountId: funds.accountId }).from(funds).where(eq(funds.businessId, bizId));
    for (const fund of allFunds) {
      if (!fund.accountId) continue;
      const acRows = await db.select({ currencyId: accountCurrencies.currencyId }).from(accountCurrencies).where(eq(accountCurrencies.accountId, fund.accountId));
      if (acRows.length === 0) continue;
      const cids = acRows.map((ac) => ac.currencyId);
      const existing = await db.select({ currencyId: fundBalances.currencyId }).from(fundBalances).where(eq(fundBalances.fundId, fund.id));
      const existingIds = existing.map((b) => b.currencyId);
      const missing = cids.filter((cid) => !existingIds.includes(cid));
      if (missing.length > 0) {
        await db.insert(fundBalances).values(missing.map((cid) => ({ fundId: fund.id, currencyId: cid, balance: "0", updatedAt: new Date() })));
        results.funds += missing.length;
      }
    }

    // Banks
    const allBanks = await db.select({ id: banks.id, accountId: banks.accountId }).from(banks).where(eq(banks.businessId, bizId));
    for (const bank of allBanks) {
      if (!bank.accountId) continue;
      const acRows = await db.select({ currencyId: accountCurrencies.currencyId }).from(accountCurrencies).where(eq(accountCurrencies.accountId, bank.accountId));
      if (acRows.length === 0) continue;
      const cids = acRows.map((ac) => ac.currencyId);
      const existing = await db.select({ currencyId: bankBalances.currencyId }).from(bankBalances).where(eq(bankBalances.bankId, bank.id));
      const existingIds = existing.map((b) => b.currencyId);
      const missing = cids.filter((cid) => !existingIds.includes(cid));
      if (missing.length > 0) {
        await db.insert(bankBalances).values(missing.map((cid) => ({ bankId: bank.id, currencyId: cid, balance: "0", updatedAt: new Date() })));
        results.banks += missing.length;
      }
    }

    // Wallets
    const allWallets = await db.select({ id: wallets.id, accountId: wallets.accountId }).from(wallets).where(eq(wallets.businessId, bizId));
    for (const wallet of allWallets) {
      if (!wallet.accountId) continue;
      const acRows = await db.select({ currencyId: accountCurrencies.currencyId }).from(accountCurrencies).where(eq(accountCurrencies.accountId, wallet.accountId));
      if (acRows.length === 0) continue;
      const cids = acRows.map((ac) => ac.currencyId);
      const existing = await db.select({ currencyId: walletBalances.currencyId }).from(walletBalances).where(eq(walletBalances.walletId, wallet.id));
      const existingIds = existing.map((b) => b.currencyId);
      const missing = cids.filter((cid) => !existingIds.includes(cid));
      if (missing.length > 0) {
        await db.insert(walletBalances).values(missing.map((cid) => ({ walletId: wallet.id, currencyId: cid, balance: "0", updatedAt: new Date() })));
        results.wallets += missing.length;
      }
    }

    // Exchanges
    const allExchanges = await db.select({ id: exchanges.id, accountId: exchanges.accountId }).from(exchanges).where(eq(exchanges.businessId, bizId));
    for (const exchange of allExchanges) {
      if (!exchange.accountId) continue;
      const acRows = await db.select({ currencyId: accountCurrencies.currencyId }).from(accountCurrencies).where(eq(accountCurrencies.accountId, exchange.accountId));
      if (acRows.length === 0) continue;
      const cids = acRows.map((ac) => ac.currencyId);
      const existing = await db.select({ currencyId: exchangeBalances.currencyId }).from(exchangeBalances).where(eq(exchangeBalances.exchangeId, exchange.id));
      const existingIds = existing.map((b) => b.currencyId);
      const missing = cids.filter((cid) => !existingIds.includes(cid));
      if (missing.length > 0) {
        await db.insert(exchangeBalances).values(missing.map((cid) => ({ exchangeId: exchange.id, currencyId: cid, balance: "0", updatedAt: new Date() })));
        results.exchanges += missing.length;
      }
    }

    return c.json({
      success: true,
      currenciesAdded: results,
      total: results.funds + results.banks + results.wallets + results.exchanges,
    });
  })
);

export { syncRoutes };
