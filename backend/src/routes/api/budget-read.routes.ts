/**
 * budget-read.routes.ts
 * قراءة ميزانية المصروفات: جلب القائمة مع LEFT JOIN accounts
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, desc } from "drizzle-orm";
import { accounts, expenseBudget } from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const budgetReadRoutes = new Hono();

budgetReadRoutes.get(
  "/businesses/:bizId/expense-budget",
  bizAuthMiddleware(),
  safeHandler("جلب ميزانية المصروفات", async (c: AppContext) => {
    const bizId = getBizId(c);
    const month = c.req.query("month");
    const year = c.req.query("year");

    const rows = await db
      .select({
        id: expenseBudget.id,
        businessId: expenseBudget.businessId,
        accountId: expenseBudget.accountId,
        name: expenseBudget.name,
        stationId: expenseBudget.stationId,
        amount: expenseBudget.amount,
        currencyId: expenseBudget.currencyId,
        expenseType: expenseBudget.expenseType,
        month: expenseBudget.month,
        year: expenseBudget.year,
        notes: expenseBudget.notes,
        createdAt: expenseBudget.createdAt,
        accountName: accounts.name,
        accountCode: accounts.code,
        accountCode: accounts.code,
      })
      .from(expenseBudget)
      .leftJoin(accounts, eq(expenseBudget.accountId, accounts.id))
      .where(eq(expenseBudget.businessId, bizId))
      .orderBy(desc(expenseBudget.createdAt));

    let result = rows;
    if (month)
      result = result.filter((r) => r.month === Number.parseInt(month));
    if (year) result = result.filter((r) => r.year === Number.parseInt(year));
    return c.json(result);
  }),
);

export { budgetReadRoutes };
