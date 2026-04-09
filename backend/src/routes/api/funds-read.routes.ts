/**
 * funds-read.routes.ts — Phase 10
 * قراءة الصناديق: جلب القائمة + التفاصيل
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, inArray } from "drizzle-orm";
import {
  accounts,
  funds,
  fundBalances,
  stations,
  currencies,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const fundsRoutes = new Hono();

fundsRoutes.get(
  "/businesses/:bizId/funds",
  bizAuthMiddleware(),
  safeHandler("جلب الصناديق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const whereCondition = eq(funds.businessId, bizId);
    const rows = await db
      .select({
        id: funds.id,
        name: funds.name,
        sequenceNumber: funds.sequenceNumber,
        code: funds.code,
        accountId: funds.accountId,
        accountSubNatureId: accounts.accountSubNatureId,
        stationId: funds.stationId,
        responsiblePerson: funds.responsiblePerson,
        description: funds.description,
        defaultCurrencyId: funds.defaultCurrencyId,
        isActive: funds.isActive,
        notes: funds.notes,
        createdAt: funds.createdAt,
        stationName: stations.name,
        accountName: accounts.name,
        accountCode: accounts.code,
        accountCode: accounts.code,
      })
      .from(funds)
      .leftJoin(accounts, eq(funds.accountId, accounts.id))
      .leftJoin(stations, eq(funds.stationId, stations.id))
      .where(whereCondition)
      .orderBy(accounts.sequenceNumber, funds.code);

    const fundIds = rows.map((f) => f.id);
    let balancesArr: {
      fundId: number;
      currencyId: number;
      balance: string;
      currencyCode: string | null;
      currencySymbol: string | null;
    }[] = [];
    if (fundIds.length > 0) {
      balancesArr = await db
        .select({
          fundId: fundBalances.fundId,
          currencyId: fundBalances.currencyId,
          balance: fundBalances.balance,
          currencyCode: currencies.code,
          currencySymbol: currencies.symbol,
        })
        .from(fundBalances)
        .leftJoin(currencies, eq(fundBalances.currencyId, currencies.id))
        .where(inArray(fundBalances.fundId, fundIds));
    }
    const balanceMap: Record<number, typeof balancesArr> = {};
    for (const b of balancesArr) {
      if (!balanceMap[b.fundId]) balanceMap[b.fundId] = [];
      balanceMap[b.fundId].push(b);
    }
    return c.json(
      rows.map((f) => ({ ...f, balances: balanceMap[f.id] || [] })),
    );
  }),
);

export { fundsRoutes as fundsReadRoutes };
