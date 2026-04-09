/**
 * partners-read.routes.ts
 * قراءة الشركاء: جلب القائمة مع LEFT JOIN accounts
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { and, eq } from "drizzle-orm";
import { accounts, businessPartners } from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const partnersReadRoutes = new Hono();

partnersReadRoutes.get(
  "/businesses/:bizId/partners",
  bizAuthMiddleware(),
  safeHandler("جلب الشركاء", async (c: AppContext) => {
    const bizId = getBizId(c);
    const rows = await db
      .select({
        id: businessPartners.id,
        fullName: businessPartners.fullName,
        role: businessPartners.role,
        sharePercentage: businessPartners.sharePercentage,
        phone: businessPartners.phone,
        notes: businessPartners.notes,
        accountId: businessPartners.accountId,
        sequenceNumber: businessPartners.sequenceNumber,
        code: businessPartners.code,
        createdAt: businessPartners.createdAt,
        accountName: accounts.name,
        accountCode: accounts.code,
        accountCode: accounts.code,
        accountSequence: accounts.sequenceNumber,
      })
      .from(businessPartners)
      .leftJoin(accounts, eq(accounts.id, businessPartners.accountId))
      .where(eq(businessPartners.businessId, bizId));

    return c.json(rows);
  }),
);

export { partnersReadRoutes };
