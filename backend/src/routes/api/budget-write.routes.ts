/**
 * budget-write.routes.ts
 * كتابة ميزانية المصروفات: إنشاء + تعديل + حذف مع accountId إلزامي
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and } from "drizzle-orm";
import {
  accounts,
  expenseBudget,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { safeHandler, parseId, getBody } from "../../middleware/helpers.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import { requireResourceOwnership } from "./_shared/ownership.ts";
import type { AppContext } from "./_shared/types.ts";

const budgetWriteRoutes = new Hono();

// ============ إنشاء بند ميزانية ============
budgetWriteRoutes.post(
  "/businesses/:bizId/expense-budget",
  bizAuthMiddleware(),
  safeHandler("إضافة بند ميزانية", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    // الحساب المرتبط إلزامي
    const accountId = body.accountId != null && Number(body.accountId) > 0 ? Number(body.accountId) : null;
    if (!accountId) return c.json({ error: 'يجب اختيار حساب مرتبط بالميزانية' }, 400);

    const [acc] = await db.select({ id: accounts.id, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'الحساب المحدد غير موجود' }, 400);

    const [created] = await db.insert(expenseBudget).values({
      businessId: bizId,
      accountId,
      name: String(body.name ?? ''),
      stationId: (body.stationId as number | null) ?? null,
      amount: String(body.amount ?? 0),
      currencyId: Number(body.currencyId ?? 1),
      expenseType: (body.expenseType as 'fixed' | 'variable' | 'annual') ?? 'variable',
      month: (body.month as number | null) ?? null,
      year: (body.year as number | null) ?? null,
      notes: (body.notes as string | null) ?? null,
    }).returning();

    return c.json(created, 201);
  })
);

// ============ تعديل بند ميزانية ============
budgetWriteRoutes.put(
  "/expense-budget/:id",
  safeHandler("تعديل بند ميزانية", async (c: AppContext) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف غير صالح" }, 400);
    const [rec] = await db.select().from(expenseBudget).where(eq(expenseBudget.id, id));
    const err = await requireResourceOwnership(c, rec ?? null);
    if (err) return err;
    const body = (await getBody(c)) as Record<string, unknown>;
    const [updated] = await db.update(expenseBudget).set({
      name: body.name as string,
      stationId: (body.stationId as number | null) ?? null,
      amount: body.amount == null ? undefined : String(body.amount),
      currencyId: body.currencyId as number,
      expenseType: body.expenseType as 'fixed' | 'variable' | 'annual',
      month: (body.month as number | null) ?? null,
      year: (body.year as number | null) ?? null,
      notes: (body.notes as string | null) ?? null,
    }).where(eq(expenseBudget.id, id)).returning();
    if (updated) return c.json(updated);
    return c.json({ error: "بند غير موجود" }, 404);
  })
);

// ============ حذف بند ميزانية ============
budgetWriteRoutes.delete(
  "/expense-budget/:id",
  safeHandler("حذف بند ميزانية", async (c: AppContext) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف غير صالح" }, 400);
    const [rec] = await db.select().from(expenseBudget).where(eq(expenseBudget.id, id));
    const err = await requireResourceOwnership(c, rec ?? null);
    if (err) return err;
    await db.delete(expenseBudget).where(eq(expenseBudget.id, id));
    return c.json({ success: true });
  })
);

export { budgetWriteRoutes };
