/**
 * banks-write.routes.ts
 * تعديل البنوك: إنشاء + تعديل + حذف
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, ne } from "drizzle-orm";
import {
  accounts,
  banks,
  bankBalances,
  voucherLines,
  journalEntryLines,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { validateBody } from "../../middleware/validation.ts";
import {
  safeHandler,
  parseId,
  getBody,
} from "../../middleware/helpers.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import { requireResourceOwnership } from "./_shared/ownership.ts";
import type { AppContext } from "./_shared/types.ts";

const banksRoutes = new Hono();

// ============ إنشاء بنك ============
banksRoutes.post(
  "/businesses/:bizId/banks",
  bizAuthMiddleware(),
  checkPermission("banks", "create"),
  safeHandler("إضافة بنك", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    if (!body.name || !String(body.name).trim()) {
      return c.json({ error: 'اسم البنك مطلوب' }, 400);
    }

    // الحساب المرتبط إلزامي — يُنشأ أولاً من صفحة الحسابات
    const accountId = body.accountId != null && Number(body.accountId) > 0 ? Number(body.accountId) : null;
    if (!accountId) return c.json({ error: 'يجب اختيار حساب مرتبط بالبنك' }, 400);

    const [acc] = await db.select({ id: accounts.id, sequenceNumber: accounts.sequenceNumber, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'الحساب المحدد غير موجود' }, 400);

    // كود مركّب: كود الحساب/رقم فرعي (BNK-01/1, BNK-01/2)
    const existingBanks = await db.select({ id: banks.id }).from(banks)
      .where(and(eq(banks.businessId, bizId), eq(banks.accountId, accountId)));
    const subSeq = existingBanks.length + 1;
    const bankCode = `${acc.code}/${subSeq}`;

    const insertPayload: typeof banks.$inferInsert = {
      businessId: bizId,
      name: String(body.name).trim(),
      accountId: accountId,
      sequenceNumber: acc.sequenceNumber,
      code: bankCode,
      accountNumber: typeof body.accountNumber === 'string' && body.accountNumber.trim() ? body.accountNumber.trim() : null,
      provider: typeof body.provider === 'string' && body.provider.trim() ? body.provider.trim() : null,
      responsiblePerson: typeof body.responsiblePerson === 'string' && body.responsiblePerson.trim() ? body.responsiblePerson.trim() : null,
      description: typeof body.description === 'string' && body.description.trim() ? body.description.trim() : null,
      notes: typeof body.notes === 'string' && body.notes.trim() ? body.notes.trim() : null,
      isActive: body.isActive !== false,
    };

    const [created] = await db
      .insert(banks)
      .values(insertPayload as typeof banks.$inferInsert)
      .returning();

    return c.json(created, 201);
  }),
);

// ============ تعديل بنك ============
banksRoutes.put(
  "/businesses/:bizId/banks/:id",
  bizAuthMiddleware(),
  safeHandler("تعديل بنك", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف البنك غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(banks)
      .where(and(eq(banks.id, id), eq(banks.businessId, bizId)));
    if (!existing)
      return c.json({ error: "بنك غير موجود أو لا ينتمي لهذا العمل" }, 404);
    const body = (await getBody(c)) as Record<string, unknown>;
    const payload: Record<string, unknown> = { ...body, updatedAt: new Date() };

    const [updated] = await db
      .update(banks)
      .set(payload)
      .where(eq(banks.id, id))
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

// ============ حذف بنك ============
banksRoutes.delete(
  "/businesses/:bizId/banks/:id",
  bizAuthMiddleware(),
  checkPermission("banks", "delete"),
  safeHandler("حذف بنك", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف البنك غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(banks)
      .where(and(eq(banks.id, id), eq(banks.businessId, bizId)));
    if (!existing)
      return c.json({ error: "بنك غير موجود أو لا ينتمي لهذا العمل" }, 404);

    // حماية: لا يمكن حذف بنك تم تنفيذ عمليات فيه
    const [nonZeroBalance] = await db.select({ id: bankBalances.id }).from(bankBalances)
      .where(and(eq(bankBalances.bankId, id), ne(bankBalances.balance, '0')))
      .limit(1);
    if (nonZeroBalance) return c.json({ error: 'لا يمكن حذف البنك لأنه يحتوي على رصيد غير صفري' }, 400);

    if (existing.accountId) {
      const [linkedVoucherLine] = await db.select({ id: voucherLines.id }).from(voucherLines)
        .where(eq(voucherLines.accountId, existing.accountId)).limit(1);
      if (linkedVoucherLine) return c.json({ error: 'لا يمكن حذف البنك لأن حسابه المرتبط يحتوي على قيود' }, 400);

      const [linkedJournal] = await db.select({ id: journalEntryLines.id }).from(journalEntryLines)
        .where(eq(journalEntryLines.accountId, existing.accountId)).limit(1);
      if (linkedJournal) return c.json({ error: 'لا يمكن حذف البنك لأن حسابه المرتبط يحتوي على قيود يومية' }, 400);
    }

    await db.delete(banks).where(eq(banks.id, id));
    return c.json({ success: true });
  }),
);

export default banksRoutes;
export { banksRoutes as banksWriteRoutes };
