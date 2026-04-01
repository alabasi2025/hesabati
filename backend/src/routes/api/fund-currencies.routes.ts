/**
 * fund-currencies.routes.ts
 * إدارة عملات الصناديق
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, inArray } from "drizzle-orm";
import {
  funds,
  fundBalances,
  accountCurrencies,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler, getBody, parseId } from "../../middleware/helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const fundCurrenciesRoutes = new Hono();

// تحديث عملات صندوق محدد
fundCurrenciesRoutes.post(
  "/funds/:fundId/currencies",
  bizAuthMiddleware(),
  safeHandler("تحديث عملات الصندوق", async (c: AppContext) => {
    const fundId = parseId(c.req.param("fundId"));
    if (!fundId) return c.json({ error: "معرّف الصندوق غير صالح" }, 400);

    const body = (await getBody(c)) as Record<string, unknown>;
    const currencyIds = Array.isArray(body.currencyIds) 
      ? body.currencyIds.map((id: any) => Number(id)).filter((id: number) => id > 0)
      : [];

    if (currencyIds.length === 0) {
      return c.json({ error: "يجب تحديد عملة واحدة على الأقل" }, 400);
    }

    // التحقق من وجود الصندوق
    const [fund] = await db
      .select({ id: funds.id, accountId: funds.accountId })
      .from(funds)
      .where(eq(funds.id, fundId))
      .limit(1);

    if (!fund) {
      return c.json({ error: "الصندوق غير موجود" }, 404);
    }

    // التحقق من أن العملات موجودة في الحساب المرتبط
    if (fund.accountId) {
      const accountCurrs = await db
        .select({ currencyId: accountCurrencies.currencyId })
        .from(accountCurrencies)
        .where(eq(accountCurrencies.accountId, fund.accountId));
      
      const allowedCurrencyIds = accountCurrs.map((ac) => ac.currencyId);
      const invalidCurrencies = currencyIds.filter((id) => !allowedCurrencyIds.includes(id));
      
      if (invalidCurrencies.length > 0) {
        return c.json({ 
          error: `العملات التالية غير مسموحة للحساب المرتبط: ${invalidCurrencies.join(', ')}` 
        }, 400);
      }
    }

    // حذف العملات الحالية
    await db.delete(fundBalances).where(eq(fundBalances.fundId, fundId));

    // إضافة العملات الجديدة
    const balanceValues = currencyIds.map((currencyId) => ({
      fundId: fundId,
      currencyId: currencyId,
      balance: '0',
      updatedAt: new Date(),
    }));

    await db.insert(fundBalances).values(balanceValues);

    return c.json({ 
      success: true, 
      fundId: fundId,
      currenciesCount: currencyIds.length 
    });
  })
);

export { fundCurrenciesRoutes };
