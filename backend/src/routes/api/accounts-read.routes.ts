/**
 * accounts-read.routes.ts — Phase 11
 * مسارات قراءة الحسابات (قائمة + حسابات خاصة)
 */
import { Hono } from "hono";
import { PostgresError } from "postgres";
import { db } from "../../db/index.ts";
import { eq, and, isNotNull, desc, sql, count } from "drizzle-orm";
import {
  accounts,
  accountSubNatures,
  accountBalances,
  currencies,
  funds,
  suppliers,
  warehouses,
  employeeBillingAccounts,
  businessPartners,
  employees,
  billingSystemsConfig,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler, getBody, parseId } from "../../middleware/helpers.ts";
import {
  getPaginationParams,
  paginatedResult,
} from "../../middleware/pagination.ts";
import {
  generateItemCode,
  generateTreeAccountCode,
  generateLeafAccountCode,
  getNextChildAccountSequence,
  getNextItemInCategorySequence,
  getNextSupplierSequence,
  TYPE_PREFIXES,
} from "../../middleware/sequencing.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import {
  auditCreate,
  auditUpdate,
  auditDelete,
  makeAuditCtx,
} from "../../engines/audit-middleware.engine.ts";

const accountsReadRoutes = new Hono();

const NATURE_TO_ACCOUNT_TYPE: Record<string, string> = {
  fund: "fund",
  bank: "bank",
  e_wallet: "e_wallet",
  exchange: "exchange",
  custody: "custody",
  warehouse: "warehouse",
  supplier: "supplier",
  employee: "employee",
  partner: "partner",
  billing: "billing",
  intermediary: "intermediary",
  budget: "budget",
  settlement: "settlement",
  pending: "pending",
};

function toAccountTypeFromNature(natureKey: string): string {
  return NATURE_TO_ACCOUNT_TYPE[natureKey] || "accounting";
}

// ===================== Endpoints مخصصة للأداء =====================

accountsReadRoutes.get(
  "/businesses/:bizId/custody-accounts",
  bizAuthMiddleware(),
  safeHandler("جلب حسابات العهد", async (c) => {
    const bizId = getBizId(c);
    const rows = await db
      .select()
      .from(accounts)
      .innerJoin(
        accountSubNatures,
        eq(accounts.accountSubNatureId, accountSubNatures.id),
      )
      .where(
        and(
          eq(accounts.businessId, bizId),
          eq(accountSubNatures.natureKey, "custody"),
          eq(accounts.isLeafAccount, true),
        ),
      )
      .orderBy(accounts.code);
    return c.json(rows.map((r) => r.accounts));
  }),
);

accountsReadRoutes.get(
  "/businesses/:bizId/intermediary-accounts",
  bizAuthMiddleware(),
  safeHandler("جلب الحسابات الوسيطة", async (c) => {
    const bizId = getBizId(c);
    const rows = await db
      .select()
      .from(accounts)
      .innerJoin(
        accountSubNatures,
        eq(accounts.accountSubNatureId, accountSubNatures.id),
      )
      .where(
        and(
          eq(accounts.businessId, bizId),
          eq(accountSubNatures.natureKey, "intermediary"),
          eq(accounts.isLeafAccount, true),
        ),
      )
      .orderBy(accounts.code);

    const accountIds = rows.map((r) => r.accounts.id);
    let balancesMap: Record<
      number,
      {
        currencyId: number;
        balance: string;
        currencySymbol: string;
        currencyCode: string;
      }[]
    > = {};
    if (accountIds.length > 0) {
      const balRows = await db
        .select({
          accountId: accountBalances.accountId,
          currencyId: accountBalances.currencyId,
          balance: accountBalances.balance,
          currencySymbol: currencies.symbol,
          currencyCode: currencies.code,
        })
        .from(accountBalances)
        .innerJoin(currencies, eq(accountBalances.currencyId, currencies.id))
        .where(sql`${accountBalances.accountId} IN ${accountIds}`);
      for (const b of balRows) {
        if (!balancesMap[b.accountId]) balancesMap[b.accountId] = [];
        balancesMap[b.accountId].push({
          currencyId: b.currencyId,
          balance: b.balance,
          currencySymbol: b.currencySymbol || "",
          currencyCode: b.currencyCode || "",
        });
      }
    }

    return c.json(
      rows.map((r) => ({
        ...r.accounts,
        balances: balancesMap[r.accounts.id] || [],
      })),
    );
  }),
);

accountsReadRoutes.get(
  "/businesses/:bizId/pending-accounts-list",
  bizAuthMiddleware(),
  safeHandler("جلب الحسابات المعلقة", async (c) => {
    const bizId = getBizId(c);
    const rows = await db
      .select()
      .from(accounts)
      .innerJoin(
        accountSubNatures,
        eq(accounts.accountSubNatureId, accountSubNatures.id),
      )
      .where(
        and(
          eq(accounts.businessId, bizId),
          eq(accountSubNatures.natureKey, "pending"),
          eq(accounts.isLeafAccount, true),
        ),
      )
      .orderBy(accounts.code);
    return c.json(rows.map((r) => r.accounts));
  }),
);

accountsReadRoutes.get(
  "/businesses/:bizId/accounts",
  bizAuthMiddleware(),
  safeHandler("جلب الحسابات", async (c) => {
    const bizId = getBizId(c);
    const allMode = c.req.query("all") === "true";
    const usePagination = !allMode && c.req.query("page") !== undefined;

    if (usePagination) {
      const params = getPaginationParams(c, { sortBy: "code" });
      const [{ total }] = await db
        .select({ total: count() })
        .from(accounts)
        .where(eq(accounts.businessId, bizId));
      const rows = await db
        .select()
        .from(accounts)
        .where(eq(accounts.businessId, bizId))
        .orderBy(accounts.code, accounts.name)
        .limit(params.limit)
        .offset(params.offset);
      return c.json(paginatedResult(rows, total, params));
    }

    const rows = await db
      .select()
      .from(accounts)
      .where(eq(accounts.businessId, bizId))
      .orderBy(accounts.code, accounts.name);
    if (!allMode) return c.json(rows);

    const billingLinks = await db
      .select({
        accountId: employeeBillingAccounts.accountId,
        billingSystemKey: billingSystemsConfig.systemKey,
        billingSystemName: billingSystemsConfig.name,
      })
      .from(employeeBillingAccounts)
      .leftJoin(employees, eq(employeeBillingAccounts.employeeId, employees.id))
      .leftJoin(
        billingSystemsConfig,
        eq(employeeBillingAccounts.billingSystemId, billingSystemsConfig.id),
      )
      .where(
        and(
          eq(employees.businessId, bizId),
          isNotNull(employeeBillingAccounts.accountId),
        ),
      );

    const billingByAccountId = new Map<
      number,
      { billingSystemKey: string | null; billingSystemName: string | null }
    >();
    for (const row of billingLinks) {
      if (!row.accountId) continue;
      if (!billingByAccountId.has(row.accountId)) {
        billingByAccountId.set(row.accountId, {
          billingSystemKey: row.billingSystemKey ?? null,
          billingSystemName: row.billingSystemName ?? null,
        });
      }
    }

    const normalizedAccounts = rows.map((acc) => {
      if (acc.accountType !== "billing") return acc;
      const billing = billingByAccountId.get(acc.id);
      return {
        ...acc,
        billingSystemKey: billing?.billingSystemKey ?? null,
        _source: "billing",
      };
    });

    return c.json({ accounts: normalizedAccounts, stations: [] });
  }),
);

export default accountsReadRoutes;
