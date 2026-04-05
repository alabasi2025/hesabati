/**
 * analytical-accounts.routes.ts
 * مسارات الحسابات التحليلية (XXX-YYY-ZZZ)
 * - قراءة: جلب كل الحسابات التحليلية مع الأرصدة
 * - إنشاء: إنشاء حساب تحليلي جديد حسب النوع
 * - تعديل: تعديل اسم الحساب
 * - حذف: حذف حساب تحليلي
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, isNotNull, inArray } from "drizzle-orm";
import {
  accounts,
  accountSubNatures,
  accountCurrencies,
  currencies,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler, getBody, parseId } from "../../middleware/helpers.ts";
import { generateFullLedgerCode } from "../../engines/ledger-code.engine.ts";
import { generateLeafAccountCode } from "../../middleware/sequencing.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { getBizId } from "./_shared/context-helpers.ts";

const analyticalAccountsRoutes = new Hono();

// ===================== قراءة الحسابات التحليلية =====================
analyticalAccountsRoutes.get(
  "/businesses/:bizId/analytical-accounts",
  bizAuthMiddleware(),
  safeHandler("جلب الحسابات التحليلية", async (c) => {
    const bizId = getBizId(c);

    // جلب الحسابات التحليلية (XXX-YYY-ZZZ فقط)
    const leafAccounts = await db
      .select({
        id: accounts.id,
        name: accounts.name,
        code: accounts.code,
        ledgerCode: accounts.ledgerCode,
        accountType: accounts.accountType,
        accountSubNatureId: accounts.accountSubNatureId,
        sequenceNumber: accounts.sequenceNumber,
        isActive: accounts.isActive,
        createdAt: accounts.createdAt,
      })
      .from(accounts)
      .where(
        and(
          eq(accounts.businessId, bizId),
          eq(accounts.isLeafAccount, true),
          isNotNull(accounts.ledgerCode),
        ),
      )
      .orderBy(accounts.ledgerCode);

    const analyticalAccounts = leafAccounts.filter(
      (a) => (a.ledgerCode as string).split("-").length === 3,
    );

    // جلب أنواع الحسابات الفرعية
    const subNatures = await db
      .select({
        id: accountSubNatures.id,
        natureKey: accountSubNatures.natureKey,
        name: accountSubNatures.name,
        icon: accountSubNatures.icon,
        color: accountSubNatures.color,
      })
      .from(accountSubNatures)
      .where(eq(accountSubNatures.businessId, bizId));

    const subNatureMap = new Map(subNatures.map((sn) => [sn.id, sn]));

    // جلب الأرصدة (العملات المرتبطة بالحسابات)
    const accountIds = analyticalAccounts.map((a) => a.id);
    const balanceRows =
      accountIds.length > 0
        ? await db
            .select({
              accountId: accountCurrencies.accountId,
              currencyId: accountCurrencies.currencyId,
              currencyCode: currencies.code,
              currencySymbol: currencies.symbol,
            })
            .from(accountCurrencies)
            .leftJoin(
              currencies,
              eq(accountCurrencies.currencyId, currencies.id),
            )
            .where(inArray(accountCurrencies.accountId, accountIds))
        : [];

    const balanceMap = new Map<
      number,
      { currencyId: number; currencyCode: string; currencySymbol: string }[]
    >();
    for (const row of balanceRows) {
      if (!balanceMap.has(row.accountId)) balanceMap.set(row.accountId, []);
      balanceMap.get(row.accountId)!.push({
        currencyId: row.currencyId,
        currencyCode: row.currencyCode || "",
        currencySymbol: row.currencySymbol || "",
      });
    }

    const enriched = analyticalAccounts.map((acc) => {
      const subNature = acc.accountSubNatureId
        ? subNatureMap.get(acc.accountSubNatureId)
        : null;
      return {
        ...acc,
        subNatureName: subNature?.name || null,
        subNatureKey: subNature?.natureKey || acc.accountType || null,
        subNatureIcon: subNature?.icon || null,
        subNatureColor: subNature?.color || null,
        currencies: balanceMap.get(acc.id) || [],
      };
    });

    return c.json({ accounts: enriched, subNatures });
  }),
);

// ===================== إنشاء حساب تحليلي =====================
analyticalAccountsRoutes.post(
  "/businesses/:bizId/analytical-accounts",
  bizAuthMiddleware(),
  checkPermission("accounts", "create"),
  safeHandler("إنشاء حساب تحليلي", async (c) => {
    const bizId = getBizId(c);
    const body = ((await getBody(c)) || {}) as Record<string, unknown>;

    const accountName = typeof body.name === "string" ? body.name.trim() : "";
    const natureKey =
      typeof body.natureKey === "string" ? body.natureKey.trim() : "pending";

    if (!accountName) return c.json({ error: "اسم الحساب مطلوب" }, 400);

    // جلب النوع الفرعي
    const [subNature] = await db
      .select({ id: accountSubNatures.id })
      .from(accountSubNatures)
      .where(
        and(
          eq(accountSubNatures.businessId, bizId),
          eq(accountSubNatures.natureKey, natureKey),
        ),
      )
      .limit(1);

    // توليد ledgerCode مستقل (XXX-YYY-ZZZ)
    const ledgerCode = await generateFullLedgerCode(
      bizId,
      natureKey,
      db as any,
    );

    // توليد الكود التشغيلي
    const { code: generatedCode, sequenceNumber } =
      await generateLeafAccountCode(bizId, natureKey, db);

    const [created] = await db
      .insert(accounts)
      .values({
        businessId: bizId,
        name: accountName,
        accountType: natureKey as any,
        accountSubNatureId: subNature?.id || null,
        isLeafAccount: true,
        code: generatedCode,
        ledgerCode,
        sequenceNumber,
      })
      .returning();

    return c.json(created, 201);
  }),
);

// ===================== تعديل حساب تحليلي =====================
analyticalAccountsRoutes.put(
  "/businesses/:bizId/analytical-accounts/:id",
  bizAuthMiddleware(),
  checkPermission("accounts", "update"),
  safeHandler("تعديل حساب تحليلي", async (c) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الحساب غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)))
      .limit(1);

    if (!existing) return c.json({ error: "الحساب غير موجود" }, 404);

    const body = ((await getBody(c)) || {}) as Record<string, unknown>;
    const newName = typeof body.name === "string" ? body.name.trim() : null;

    if (!newName) return c.json({ error: "الاسم الجديد مطلوب" }, 400);

    const [updated] = await db
      .update(accounts)
      .set({ name: newName, updatedAt: new Date() })
      .where(eq(accounts.id, id))
      .returning();

    return c.json(updated);
  }),
);

// ===================== حذف حساب تحليلي =====================
analyticalAccountsRoutes.delete(
  "/businesses/:bizId/analytical-accounts/:id",
  bizAuthMiddleware(),
  checkPermission("accounts", "delete"),
  safeHandler("حذف حساب تحليلي", async (c) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الحساب غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)))
      .limit(1);

    if (!existing) return c.json({ error: "الحساب غير موجود" }, 404);

    // التحقق أنه حساب تحليلي (XXX-YYY-ZZZ)
    const lc = existing.ledgerCode as string;
    if (!lc || lc.split("-").length !== 3)
      return c.json({ error: "هذا ليس حساب تحليلي" }, 400);

    // TODO: التحقق من عدم وجود أرصدة أو قيود مرتبطة

    await db.delete(accounts).where(eq(accounts.id, id));
    return c.json({ success: true });
  }),
);

export { analyticalAccountsRoutes };
