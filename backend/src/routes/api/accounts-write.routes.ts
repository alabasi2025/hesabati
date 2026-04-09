/**
 * accounts-write.routes.ts — Phase 11
 * مسارات كتابة الحسابات (إنشاء + تحديث + حذف)
 */
import { Hono } from "hono";
import { PostgresError } from "postgres";
import { db } from "../../db/index.ts";
import { eq, and, isNotNull } from "drizzle-orm";
import {
  accounts,
  accountSubNatures,
  funds,
  banks,
  wallets,
  exchanges,
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
  generateTreeAccountCode,
  generateLeafAccountCode,
  getNextChildAccountSequence,
  getNextItemInCategorySequence,
} from "../../middleware/sequencing.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import {
  auditCreate,
  auditUpdate,
  auditDelete,
  makeAuditCtx,
} from "../../engines/audit-middleware.engine.ts";

const accountsWriteRoutes = new Hono();

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

function toAccountTypeFromNature(natureKey: string): string | null {
  return NATURE_TO_ACCOUNT_TYPE[natureKey] || null;
}

// ===================== Endpoints مخصصة للأداء =====================

accountsWriteRoutes.post(
  "/businesses/:bizId/accounts",
  bizAuthMiddleware(),
  checkPermission("accounts", "create"),
  safeHandler("إضافة حساب", async (c) => {
    const bizId = getBizId(c);
    const body = ((await getBody(c)) || {}) as Record<string, unknown>;
    const isLeafAccount = body.isLeafAccount !== false;
    const parentAccountId =
      body.parentAccountId == null ? null : Number(body.parentAccountId);
    const accountSubNatureId =
      body.accountSubNatureId == null ? null : Number(body.accountSubNatureId);
    const accountName = typeof body.name === "string" ? body.name.trim() : "";

    if (!accountName) return c.json({ error: "اسم الحساب مطلوب" }, 400);
    if (
      isLeafAccount &&
      (!Number.isInteger(accountSubNatureId) || Number(accountSubNatureId) <= 0)
    ) {
      return c.json({ error: "النوع الفرعي للحساب مطلوب" }, 400);
    }

    const [parent] = parentAccountId
      ? await db
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.id, parentAccountId),
              eq(accounts.businessId, bizId),
            ),
          )
          .limit(1)
      : [null];
    if (parentAccountId && !parent)
      return c.json({ error: "الحساب الأب غير موجود" }, 400);

    const [subNature] = accountSubNatureId
      ? await db
          .select({
            id: accountSubNatures.id,
            natureKey: accountSubNatures.natureKey,
          })
          .from(accountSubNatures)
          .where(
            and(
              eq(accountSubNatures.id, accountSubNatureId),
              eq(accountSubNatures.businessId, bizId),
            ),
          )
          .limit(1)
      : [null];
    if (accountSubNatureId && !subNature)
      return c.json({ error: "نوع الحساب الفرعي غير موجود" }, 400);

    const accountType = subNature
      ? toAccountTypeFromNature(String(subNature.natureKey))
      : typeof body.accountType === "string"
        ? body.accountType
        : null;
    const hasManualCode =
      typeof body.code === "string" && body.code.trim().length > 0;

    let sequenceNumber: number;
    let generatedCode: string;

    // آلية الترقيم الصحيحة:
    // 1. الحسابات الفرعية (isLeafAccount = true): تأخذ كود حسب النوع الفرعي (FND-01, BNK-01, إلخ)
    // 2. الحسابات الرئيسية (isLeafAccount = false): تأخذ كود شجري للتنظيم (1, 1.1, 2.3, إلخ)
    if (isLeafAccount && subNature) {
      // حساب فرعي: استخدم آلية الكود حسب النوع الفرعي
      const result = await generateLeafAccountCode(
        bizId,
        subNature.natureKey,
        db,
      );
      sequenceNumber = result.sequenceNumber;
      generatedCode = result.code;
    } else {
      // حساب رئيسي: استخدم آلية الترقيم الشجري
      sequenceNumber = await getNextChildAccountSequence(
        bizId,
        parentAccountId,
        db,
      );
      generatedCode = generateTreeAccountCode(
        parent?.code ?? null,
        sequenceNumber,
      );

      // التحقق من عدم تكرار الكود للحسابات الرئيسية
      const resolveAvailableTreeCode = async (
        startSequence: number,
      ): Promise<{ seq: number; code: string }> => {
        let seq = startSequence;
        for (let i = 0; i < 2000; i++) {
          const code = generateTreeAccountCode(parent?.code ?? null, seq);
          const [exists] = await db
            .select({ id: accounts.id })
            .from(accounts)
            .where(and(eq(accounts.businessId, bizId), eq(accounts.code, code)))
            .limit(1);
          if (!exists) return { seq, code };
          seq += 1;
        }
        throw new Error("تعذر إيجاد كود حساب متاح");
      };

      if (!hasManualCode) {
        const available = await resolveAvailableTreeCode(sequenceNumber);
        sequenceNumber = available.seq;
        generatedCode = available.code;
      }
    }

    if (isLeafAccount && subNature) {
      // ledgerCode removed — code is sufficient
    }

    let created: typeof accounts.$inferSelect | undefined;
    const payload: Record<string, unknown> = {
      ...body,
      businessId: bizId,
      name: accountName,
      accountType,
      parentAccountId,
      accountSubNatureId,
      isLeafAccount,
      sequenceNumber,
      code: hasManualCode ? String(body.code).trim() : generatedCode,
      updatedAt: new Date(),
    };
    delete payload.linkedEntityType;
    delete payload.linkedEntityId;

    try {
      [created] = await db
        .insert(accounts)
        .values(payload as typeof accounts.$inferInsert)
        .returning();
    } catch (error) {
      const pgError = error as PostgresError;
      const isCodeConflict =
        pgError?.code === "23505" &&
        String(pgError?.constraint_name || "").includes(
          "accounts_biz_code_unique",
        );
      if (!isCodeConflict || hasManualCode) throw error;

      // في حالة التكرار (نادر جداً مع آلية التسلسل الجديدة)، ارجع خطأ واضح
      return c.json(
        { error: "حدث تعارض في الكود، يرجى المحاولة مرة أخرى" },
        409,
      );
    }
    if (!created) return c.json({ error: "تعذر إنشاء الحساب" }, 500);

    // الموردون والمخازن تُنشأ من صفحاتهم المخصصة وتُربط بحساب موجود (Phase 12)
    if (created && body.linkedEntityId && body.linkedEntityType) {
      const linkedEntityId = Number(body.linkedEntityId);
      const linkedEntityType =
        typeof body.linkedEntityType === "string" ? body.linkedEntityType : "";
      if (linkedEntityType === "fund") {
        await db
          .update(funds)
          .set({ accountId: created.id, updatedAt: new Date() })
          .where(
            and(eq(funds.id, linkedEntityId), eq(funds.businessId, bizId)),
          );
      } else if (linkedEntityType === "supplier") {
        await db
          .update(suppliers)
          .set({ accountId: created.id, updatedAt: new Date() })
          .where(
            and(
              eq(suppliers.id, linkedEntityId),
              eq(suppliers.businessId, bizId),
            ),
          );
      } else if (linkedEntityType === "billing") {
        await db
          .update(employeeBillingAccounts)
          .set({ accountId: created.id })
          .where(eq(employeeBillingAccounts.id, linkedEntityId));
      } else if (linkedEntityType === "warehouse") {
        await db
          .update(warehouses)
          .set({ accountId: created.id, updatedAt: new Date() })
          .where(
            and(
              eq(warehouses.id, linkedEntityId),
              eq(warehouses.businessId, bizId),
            ),
          );
      } else if (linkedEntityType === "partner") {
        await db
          .update(businessPartners)
          .set({ accountId: created.id })
          .where(
            and(
              eq(businessPartners.id, linkedEntityId),
              eq(businessPartners.businessId, bizId),
            ),
          );
      }
    }

    return c.json(created, 201);
  }),
);

accountsWriteRoutes.put(
  "/businesses/:bizId/accounts/:id",
  bizAuthMiddleware(),
  safeHandler("تعديل حساب", async (c) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الحساب غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
    if (!existing)
      return c.json({ error: "حساب غير موجود أو لا ينتمي لهذا العمل" }, 404);
    const body = ((await getBody(c)) || {}) as Record<string, unknown>;

    // حماية عامة: منع تغيير isLeafAccount بعد الإنشاء
    if (
      "isLeafAccount" in body &&
      Boolean(body.isLeafAccount) !== (existing.isLeafAccount !== false)
    ) {
      return c.json(
        { error: "لا يمكن تغيير نوع الحساب (رئيسي/فرعي) بعد الإنشاء" },
        400,
      );
    }

    // حماية: منع تغيير النوع الفرعي و الكود للحسابات الفرعية
    if (existing.isLeafAccount !== false) {
      if (
        "accountSubNatureId" in body &&
        body.accountSubNatureId != null &&
        Number(body.accountSubNatureId) !== existing.accountSubNatureId
      ) {
        return c.json(
          { error: "لا يمكن تغيير النوع الفرعي للحساب بعد الإنشاء" },
          400,
        );
      }
      if ("accountType" in body && body.accountType !== existing.accountType) {
        return c.json({ error: "لا يمكن تغيير نوع الحساب بعد الإنشاء" }, 400);
      }
    }

    // حماية: منع تغيير الكود بعد الإنشاء
    if ("code" in body && existing.code && body.code !== existing.code) {
      return c.json({ error: "لا يمكن تغيير الكود بعد الإنشاء" }, 400);
    }

    // حذف الحقول المحمية من body لضمان عدم تسربها
    delete body.isLeafAccount;
    delete body.accountSubNatureId;
    delete body.accountType;
    delete body.code;

    const [updated] = await db
      .update(accounts)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(accounts.id, id))
      .returning();
    return c.json(updated);
  }),
);

accountsWriteRoutes.delete(
  "/businesses/:bizId/accounts/:id",
  bizAuthMiddleware(),
  checkPermission("accounts", "delete"),
  safeHandler("حذف حساب", async (c) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الحساب غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
    if (!existing)
      return c.json({ error: "حساب غير موجود أو لا ينتمي لهذا العمل" }, 404);

    // حماية: لا يمكن حذف حساب مرتبط بكيانات
    const [linkedFund] = await db
      .select({ id: funds.id })
      .from(funds)
      .where(eq(funds.accountId, id))
      .limit(1);
    if (linkedFund)
      return c.json(
        { error: "لا يمكن حذف الحساب لأنه مرتبط بصندوق. احذف الصندوق أولاً" },
        400,
      );

    const [linkedBank] = await db
      .select({ id: banks.id })
      .from(banks)
      .where(eq(banks.accountId, id))
      .limit(1);
    if (linkedBank)
      return c.json(
        { error: "لا يمكن حذف الحساب لأنه مرتبط ببنك. احذف البنك أولاً" },
        400,
      );

    const [linkedWallet] = await db
      .select({ id: wallets.id })
      .from(wallets)
      .where(eq(wallets.accountId, id))
      .limit(1);
    if (linkedWallet)
      return c.json(
        { error: "لا يمكن حذف الحساب لأنه مرتبط بمحفظة. احذف المحفظة أولاً" },
        400,
      );

    const [linkedExchange] = await db
      .select({ id: exchanges.id })
      .from(exchanges)
      .where(eq(exchanges.accountId, id))
      .limit(1);
    if (linkedExchange)
      return c.json(
        { error: "لا يمكن حذف الحساب لأنه مرتبط بصراف. احذف الصراف أولاً" },
        400,
      );

    await db.delete(accounts).where(eq(accounts.id, id));
    return c.json({ success: true });
  }),
);

export default accountsWriteRoutes;
