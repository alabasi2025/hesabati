/**
 * banks-read.routes.ts
 * قراءة البنوك: جلب القائمة + التفاصيل
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, inArray } from "drizzle-orm";
import {
  accounts,
  banks,
  bankBalances,
  currencies,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import {
  safeHandler,
} from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const banksRoutes = new Hono();

banksRoutes.get(
  "/businesses/:bizId/banks",
  bizAuthMiddleware(),
  safeHandler("جلب البنوك", async (c: AppContext) => {
    const bizId = getBizId(c);
    const rows = await db
      .select({
        id: banks.id,
        name: banks.name,
        sequenceNumber: banks.sequenceNumber,
        code: banks.code,
        accountId: banks.accountId,
        accountNumber: banks.accountNumber,
        provider: banks.provider,
        responsiblePerson: banks.responsiblePerson,
        description: banks.description,
        isActive: banks.isActive,
        notes: banks.notes,
        createdAt: banks.createdAt,
        accountName: accounts.name,
        accountCode: accounts.code,
      })
      .from(banks)
      .leftJoin(accounts, eq(banks.accountId, accounts.id))
      .where(eq(banks.businessId, bizId))
      .orderBy(accounts.sequenceNumber, banks.code);

    const bankIds = rows.map((b) => b.id);
    let balancesArr: {
      bankId: number;
      currencyId: number;
      balance: string;
      currencyCode: string | null;
      currencySymbol: string | null;
    }[] = [];
    if (bankIds.length > 0) {
      balancesArr = await db
        .select({
          bankId: bankBalances.bankId,
          currencyId: bankBalances.currencyId,
          balance: bankBalances.balance,
          currencyCode: currencies.code,
          currencySymbol: currencies.symbol,
        })
        .from(bankBalances)
        .leftJoin(currencies, eq(bankBalances.currencyId, currencies.id))
        .where(inArray(bankBalances.bankId, bankIds));
    }
    const balanceMap: Record<number, typeof balancesArr> = {};
    for (const b of balancesArr) {
      if (!balanceMap[b.bankId]) balanceMap[b.bankId] = [];
      balanceMap[b.bankId].push(b);
    }
    return c.json(
      rows.map((b) => ({ ...b, balances: balanceMap[b.id] || [] })),
    );
  }),
);

export { banksRoutes as banksReadRoutes };
