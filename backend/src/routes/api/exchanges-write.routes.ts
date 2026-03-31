/**
 * exchanges-write.routes.ts
 * تعديل الصرافين: إنشاء + تعديل + حذف
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, ne } from "drizzle-orm";
import {
  accounts,
  exchanges,
  exchangeBalances,
  voucherLines,
  journalEntryLines,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import {
  safeHandler,
  parseId,
  getBody,
} from "../../middleware/helpers.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const exchangesRoutes = new Hono();

// ============ إنشاء صراف ============
exchangesRoutes.post(
  "/businesses/:bizId/exchanges",
  bizAuthMiddleware(),
  checkPermission("exchanges", "create"),
  safeHandler("إضافة صراف", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    if (!body.name || !String(body.name).trim()) {
      return c.json({ error: 'اسم الصراف مطلوب' }, 400);
    }

    const accountId = body.accountId != null && Number(body.accountId) > 0 ? Number(body.accountId) : null;
    if (!accountId) return c.json({ error: 'يجب اختيار حساب مرتبط بالصراف' }, 400);

    const [acc] = await db.select({ id: accounts.id, sequenceNumber: accounts.sequenceNumber, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'الحساب المحدد غير موجود' }, 400);

    const existingExchanges = await db.select({ id: exchanges.id }).from(exchanges)
      .where(and(eq(exchanges.businessId, bizId), eq(exchanges.accountId, accountId)));
    const subSeq = existingExchanges.length + 1;
    const exchangeCode = `${acc.code}/${subSeq}`;

    const insertPayload: typeof exchanges.$inferInsert = {
      businessId: bizId,
      name: String(body.name).trim(),
      accountId: accountId,
      sequenceNumber: acc.sequenceNumber,
      code: exchangeCode,
      accountNumber: typeof body.accountNumber === 'string' && body.accountNumber.trim() ? body.accountNumber.trim() : null,
      provider: typeof body.provider === 'string' && body.provider.trim() ? body.provider.trim() : null,
      responsiblePerson: typeof body.responsiblePerson === 'string' && body.responsiblePerson.trim() ? body.responsiblePerson.trim() : null,
      description: typeof body.description === 'string' && body.description.trim() ? body.description.trim() : null,
      notes: typeof body.notes === 'string' && body.notes.trim() ? body.notes.trim() : null,
      isActive: body.isActive !== false,
    };

    const [created] = await db
      .insert(exchanges)
      .values(insertPayload as typeof exchanges.$inferInsert)
      .returning();

    return c.json(created, 201);
  }),
);

// ============ تعديل صراف ============
exchangesRoutes.put(
  "/businesses/:bizId/exchanges/:id",
  bizAuthMiddleware(),
  safeHandler("تعديل صراف", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الصراف غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(exchanges)
      .where(and(eq(exchanges.id, id), eq(exchanges.businessId, bizId)));
    if (!existing)
      return c.json({ error: "صراف غير موجود أو لا ينتمي لهذا العمل" }, 404);
    const body = (await getBody(c)) as Record<string, unknown>;
    const payload: Record<string, unknown> = { ...body, updatedAt: new Date() };

    const [updated] = await db
      .update(exchanges)
      .set(payload)
      .where(eq(exchanges.id, id))
      .returning();

    if (updated.accountId) {
      await db.update(accounts).set({
        name: updated.name,
        code: updated.code,
        sequenceNumber: updated.sequenceNumber,
        responsiblePerson: updated.responsiblePerson,
        notes: updated.notes,
        isActive: updated.isActive,
        updatedAt: new Date(),
      }).where(eq(accounts.id, updated.accountId));
    }

    return c.json(updated);
  }),
);

// ============ حذف صراف ============
exchangesRoutes.delete(
  "/businesses/:bizId/exchanges/:id",
  bizAuthMiddleware(),
  checkPermission("exchanges", "delete"),
  safeHandler("حذف صراف", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الصراف غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(exchanges)
      .where(and(eq(exchanges.id, id), eq(exchanges.businessId, bizId)));
    if (!existing)
      return c.json({ error: "صراف غير موجود أو لا ينتمي لهذا العمل" }, 404);

    // حماية: لا يمكن حذف صراف تم تنفيذ عمليات فيه
    const [nonZeroBalance] = await db.select({ id: exchangeBalances.id }).from(exchangeBalances)
      .where(and(eq(exchangeBalances.exchangeId, id), ne(exchangeBalances.balance, '0')))
      .limit(1);
    if (nonZeroBalance) return c.json({ error: 'لا يمكن حذف الصراف لأنه يحتوي على رصيد غير صفري' }, 400);

    if (existing.accountId) {
      const [linkedVoucherLine] = await db.select({ id: voucherLines.id }).from(voucherLines)
        .where(eq(voucherLines.accountId, existing.accountId)).limit(1);
      if (linkedVoucherLine) return c.json({ error: 'لا يمكن حذف الصراف لأن حسابه المرتبط يحتوي على قيود' }, 400);

      const [linkedJournal] = await db.select({ id: journalEntryLines.id }).from(journalEntryLines)
        .where(eq(journalEntryLines.accountId, existing.accountId)).limit(1);
      if (linkedJournal) return c.json({ error: 'لا يمكن حذف الصراف لأن حسابه المرتبط يحتوي على قيود يومية' }, 400);
    }

    await db.delete(exchanges).where(eq(exchanges.id, id));
    return c.json({ success: true });
  }),
);

export default exchangesRoutes;
export { exchangesRoutes as exchangesWriteRoutes };
