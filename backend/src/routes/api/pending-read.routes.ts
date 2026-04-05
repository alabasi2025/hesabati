/**
 * pending-read.routes.ts
 * قراءة الحسابات المعلقة: جلب القائمة مع LEFT JOIN accounts
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq } from "drizzle-orm";
import { accounts, pendingAccounts } from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const pendingReadRoutes = new Hono();

pendingReadRoutes.get(
  "/businesses/:bizId/pending-accounts",
  bizAuthMiddleware(),
  safeHandler("جلب الحسابات المعلقة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const rows = await db
      .select({
        id: pendingAccounts.id,
        businessId: pendingAccounts.businessId,
        accountId: pendingAccounts.accountId,
        personOrEntity: pendingAccounts.personOrEntity,
        description: pendingAccounts.description,
        status: pendingAccounts.status,
        estimatedAmount: pendingAccounts.estimatedAmount,
        currencyId: pendingAccounts.currencyId,
        notes: pendingAccounts.notes,
        createdAt: pendingAccounts.createdAt,
        updatedAt: pendingAccounts.updatedAt,
        accountName: accounts.name,
        accountCode: accounts.code,
        accountLedgerCode: accounts.ledgerCode,
        accountSequence: accounts.sequenceNumber,
      })
      .from(pendingAccounts)
      .leftJoin(accounts, eq(pendingAccounts.accountId, accounts.id))
      .where(eq(pendingAccounts.businessId, bizId));

    return c.json(rows);
  }),
);

export { pendingReadRoutes };
