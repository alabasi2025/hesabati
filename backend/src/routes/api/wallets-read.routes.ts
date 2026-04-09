/**
 * wallets-read.routes.ts
 * قراءة المحافظ الإلكترونية: جلب القائمة
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, inArray } from "drizzle-orm";
import {
  accounts,
  wallets,
  walletBalances,
  currencies,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const walletsRoutes = new Hono();

walletsRoutes.get(
  "/businesses/:bizId/wallets",
  bizAuthMiddleware(),
  safeHandler("جلب المحافظ", async (c: AppContext) => {
    const bizId = getBizId(c);
    const rows = await db
      .select({
        id: wallets.id,
        name: wallets.name,
        sequenceNumber: wallets.sequenceNumber,
        code: wallets.code,
        accountId: wallets.accountId,
        accountNumber: wallets.accountNumber,
        provider: wallets.provider,
        responsiblePerson: wallets.responsiblePerson,
        description: wallets.description,
        defaultCurrencyId: wallets.defaultCurrencyId,
        isActive: wallets.isActive,
        notes: wallets.notes,
        createdAt: wallets.createdAt,
        accountName: accounts.name,
        accountCode: accounts.code,
        accountCode: accounts.code,
      })
      .from(wallets)
      .leftJoin(accounts, eq(wallets.accountId, accounts.id))
      .where(eq(wallets.businessId, bizId))
      .orderBy(accounts.sequenceNumber, wallets.code);

    const ids = rows.map((w) => w.id);
    let balancesArr: {
      walletId: number;
      currencyId: number;
      balance: string;
      currencyCode: string | null;
      currencySymbol: string | null;
    }[] = [];
    if (ids.length > 0) {
      balancesArr = await db
        .select({
          walletId: walletBalances.walletId,
          currencyId: walletBalances.currencyId,
          balance: walletBalances.balance,
          currencyCode: currencies.code,
          currencySymbol: currencies.symbol,
        })
        .from(walletBalances)
        .leftJoin(currencies, eq(walletBalances.currencyId, currencies.id))
        .where(inArray(walletBalances.walletId, ids));
    }
    const balanceMap: Record<number, typeof balancesArr> = {};
    for (const b of balancesArr) {
      if (!balanceMap[b.walletId]) balanceMap[b.walletId] = [];
      balanceMap[b.walletId].push(b);
    }
    return c.json(
      rows.map((w) => ({ ...w, balances: balanceMap[w.id] || [] })),
    );
  }),
);

export { walletsRoutes as walletsReadRoutes };
