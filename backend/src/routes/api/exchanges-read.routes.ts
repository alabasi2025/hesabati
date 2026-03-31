/**
 * exchanges-read.routes.ts
 * قراءة الصرافين: جلب القائمة
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, inArray } from "drizzle-orm";
import {
  accounts,
  exchanges,
  exchangeBalances,
  currencies,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const exchangesRoutes = new Hono();

exchangesRoutes.get(
  "/businesses/:bizId/exchanges",
  bizAuthMiddleware(),
  safeHandler("جلب الصرافين", async (c: AppContext) => {
    const bizId = getBizId(c);
    const rows = await db
      .select({
        id: exchanges.id,
        name: exchanges.name,
        sequenceNumber: exchanges.sequenceNumber,
        code: exchanges.code,
        accountId: exchanges.accountId,
        accountNumber: exchanges.accountNumber,
        provider: exchanges.provider,
        responsiblePerson: exchanges.responsiblePerson,
        description: exchanges.description,
        isActive: exchanges.isActive,
        notes: exchanges.notes,
        createdAt: exchanges.createdAt,
        accountName: accounts.name,
        accountCode: accounts.code,
      })
      .from(exchanges)
      .leftJoin(accounts, eq(exchanges.accountId, accounts.id))
      .where(eq(exchanges.businessId, bizId))
      .orderBy(accounts.sequenceNumber, exchanges.code);

    const ids = rows.map((e) => e.id);
    let balancesArr: {
      exchangeId: number;
      currencyId: number;
      balance: string;
      currencyCode: string | null;
      currencySymbol: string | null;
    }[] = [];
    if (ids.length > 0) {
      balancesArr = await db
        .select({
          exchangeId: exchangeBalances.exchangeId,
          currencyId: exchangeBalances.currencyId,
          balance: exchangeBalances.balance,
          currencyCode: currencies.code,
          currencySymbol: currencies.symbol,
        })
        .from(exchangeBalances)
        .leftJoin(currencies, eq(exchangeBalances.currencyId, currencies.id))
        .where(inArray(exchangeBalances.exchangeId, ids));
    }
    const balanceMap: Record<number, typeof balancesArr> = {};
    for (const b of balancesArr) {
      if (!balanceMap[b.exchangeId]) balanceMap[b.exchangeId] = [];
      balanceMap[b.exchangeId].push(b);
    }
    return c.json(
      rows.map((e) => ({ ...e, balances: balanceMap[e.id] || [] })),
    );
  }),
);

export { exchangesRoutes as exchangesReadRoutes };
