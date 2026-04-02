/**
 * pending-write.routes.ts
 * كتابة الحسابات المعلقة: إنشاء + تعديل + حذف مع accountId إلزامي
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and } from "drizzle-orm";
import {
  accounts,
  pendingAccounts,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { pendingAccountSchema, validateBody } from "../../middleware/validation.ts";
import { safeHandler, parseId, getBody } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import { requireResourceOwnership } from "./_shared/ownership.ts";
import type { AppContext } from "./_shared/types.ts";

const pendingWriteRoutes = new Hono();

// ============ إنشاء حساب معلق ============
pendingWriteRoutes.post(
  "/businesses/:bizId/pending-accounts",
  bizAuthMiddleware(),
  safeHandler("إضافة حساب معلق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = await getBody(c);
    const validation = validateBody(pendingAccountSchema, body);
    if (!validation.success) return c.json({ error: validation.error }, 400);
    const d = validation.data as Record<string, unknown> & {
      personOrEntity?: string;
      estimatedAmount?: string | number | null;
    };

    // الحساب المرتبط إلزامي — يُختار من dropdown
    const accountId = (body as any).accountId != null && Number((body as any).accountId) > 0 ? Number((body as any).accountId) : null;
    if (!accountId) return c.json({ error: 'يجب اختيار حساب مرتبط بالحساب المعلق' }, 400);

    const [acc] = await db.select({ id: accounts.id, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'الحساب المحدد غير موجود' }, 400);

    // كود مركّب: كود الحساب/رقم فرعي
    const existingUnderAccount = await db.select({ id: pendingAccounts.id }).from(pendingAccounts)
      .where(and(eq(pendingAccounts.businessId, bizId), eq(pendingAccounts.accountId, accountId)));
    const subSeq = existingUnderAccount.length + 1;

    const [created] = await db.insert(pendingAccounts).values({
      ...validation.data,
      businessId: bizId,
      accountId,
      estimatedAmount: d.estimatedAmount != null ? String(d.estimatedAmount) : null,
    }).returning();

    return c.json(created, 201);
  })
);

// ============ تعديل حساب معلق ============
pendingWriteRoutes.put(
  "/pending-accounts/:id",
  safeHandler("تعديل حساب معلق", async (c: AppContext) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الحساب المعلق غير صالح" }, 400);
    const [pending] = await db.select().from(pendingAccounts).where(eq(pendingAccounts.id, id));
    const err = await requireResourceOwnership(c, pending ?? null);
    if (err) return err;
    const body = await getBody(c);
    const [updated] = await db.update(pendingAccounts).set({ ...body, updatedAt: new Date() }).where(eq(pendingAccounts.id, id)).returning();
    if (!updated) return c.json({ error: "حساب معلق غير موجود" }, 404);
    return c.json(updated);
  })
);

// ============ حذف حساب معلق ============
pendingWriteRoutes.delete(
  "/pending-accounts/:id",
  safeHandler("حذف حساب معلق", async (c: AppContext) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الحساب المعلق غير صالح" }, 400);
    const [pending] = await db.select().from(pendingAccounts).where(eq(pendingAccounts.id, id));
    const err = await requireResourceOwnership(c, pending ?? null);
    if (err) return err;
    await db.delete(pendingAccounts).where(eq(pendingAccounts.id, id));
    return c.json({ success: true });
  })
);

export { pendingWriteRoutes };
