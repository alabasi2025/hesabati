/**
 * wallets-write.routes.ts
 * تعديل المحافظ الإلكترونية: إنشاء + تعديل + حذف
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, ne } from "drizzle-orm";
import {
  accounts,
  accountCurrencies,
  wallets,
  walletBalances,
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

const walletsRoutes = new Hono();

// ============ إنشاء محفظة ============
walletsRoutes.post(
  "/businesses/:bizId/wallets",
  bizAuthMiddleware(),
  checkPermission("wallets", "create"),
  safeHandler("إضافة محفظة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    if (!body.name || !String(body.name).trim()) {
      return c.json({ error: 'اسم المحفظة مطلوب' }, 400);
    }

    const accountId = body.accountId != null && Number(body.accountId) > 0 ? Number(body.accountId) : null;
    if (!accountId) return c.json({ error: 'يجب اختيار حساب مرتبط بالمحفظة' }, 400);

    const [acc] = await db.select({ id: accounts.id, sequenceNumber: accounts.sequenceNumber, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'الحساب المحدد غير موجود' }, 400);

    const existingWallets = await db.select({ id: wallets.id }).from(wallets)
      .where(and(eq(wallets.businessId, bizId), eq(wallets.accountId, accountId)));
    const subSeq = existingWallets.length + 1;
    const walletCode = `${acc.code}/${subSeq}`;

    // تحديد العملة الافتراضية
    let defaultCurrencyId: number | null = null;
    if (body.defaultCurrencyId && Number(body.defaultCurrencyId) > 0) {
      defaultCurrencyId = Number(body.defaultCurrencyId);
    }

    const insertPayload: typeof wallets.$inferInsert = {
      businessId: bizId,
      name: String(body.name).trim(),
      accountId: accountId,
      defaultCurrencyId: defaultCurrencyId,
      sequenceNumber: acc.sequenceNumber,
      code: walletCode,
      accountNumber: typeof body.accountNumber === 'string' && body.accountNumber.trim() ? body.accountNumber.trim() : null,
      provider: typeof body.provider === 'string' && body.provider.trim() ? body.provider.trim() : null,
      responsiblePerson: typeof body.responsiblePerson === 'string' && body.responsiblePerson.trim() ? body.responsiblePerson.trim() : null,
      description: typeof body.description === 'string' && body.description.trim() ? body.description.trim() : null,
      notes: typeof body.notes === 'string' && body.notes.trim() ? body.notes.trim() : null,
      isActive: body.isActive !== false,
    };

    const [created] = await db
      .insert(wallets)
      .values(insertPayload as typeof wallets.$inferInsert)
      .returning();

    // نسخ العملات المحددة أو جميع عملات الحساب إلى wallet_balances
    let currencyIdsToAdd: number[] = [];

    if (body.currencyIds && Array.isArray(body.currencyIds) && body.currencyIds.length > 0) {
      currencyIdsToAdd = body.currencyIds.map((id: any) => Number(id)).filter((id: number) => id > 0);
    } else {
      const accountCurrenciesRows = await db
        .select({ currencyId: accountCurrencies.currencyId })
        .from(accountCurrencies)
        .where(eq(accountCurrencies.accountId, accountId));
      currencyIdsToAdd = accountCurrenciesRows.map((ac) => ac.currencyId);
    }

    if (currencyIdsToAdd.length > 0) {
      const balanceValues = currencyIdsToAdd.map((currencyId) => ({
        walletId: created.id,
        currencyId: currencyId,
        balance: '0',
        updatedAt: new Date(),
      }));
      await db.insert(walletBalances).values(balanceValues);
    }

    return c.json(created, 201);
  }),
);

// ============ تعديل محفظة ============
walletsRoutes.put(
  "/businesses/:bizId/wallets/:id",
  bizAuthMiddleware(),
  safeHandler("تعديل محفظة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المحفظة غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(wallets)
      .where(and(eq(wallets.id, id), eq(wallets.businessId, bizId)));
    if (!existing)
      return c.json({ error: "محفظة غير موجودة أو لا تنتمي لهذا العمل" }, 404);
    const body = (await getBody(c)) as Record<string, unknown>;
    const payload: Record<string, unknown> = { ...body, updatedAt: new Date() };

    const [updated] = await db
      .update(wallets)
      .set(payload)
      .where(eq(wallets.id, id))
      .returning();

    return c.json(updated);
  }),
);

// ============ حذف محفظة ============
walletsRoutes.delete(
  "/businesses/:bizId/wallets/:id",
  bizAuthMiddleware(),
  checkPermission("wallets", "delete"),
  safeHandler("حذف محفظة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المحفظة غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(wallets)
      .where(and(eq(wallets.id, id), eq(wallets.businessId, bizId)));
    if (!existing)
      return c.json({ error: "محفظة غير موجودة أو لا تنتمي لهذا العمل" }, 404);

    // حماية: لا يمكن حذف محفظة تم تنفيذ عمليات فيها
    const [nonZeroBalance] = await db.select({ id: walletBalances.id }).from(walletBalances)
      .where(and(eq(walletBalances.walletId, id), ne(walletBalances.balance, '0')))
      .limit(1);
    if (nonZeroBalance) return c.json({ error: 'لا يمكن حذف المحفظة لأنها تحتوي على رصيد غير صفري' }, 400);

    if (existing.accountId) {
      const [linkedVoucherLine] = await db.select({ id: voucherLines.id }).from(voucherLines)
        .where(eq(voucherLines.accountId, existing.accountId)).limit(1);
      if (linkedVoucherLine) return c.json({ error: 'لا يمكن حذف المحفظة لأن حسابها المرتبط يحتوي على قيود' }, 400);

      const [linkedJournal] = await db.select({ id: journalEntryLines.id }).from(journalEntryLines)
        .where(eq(journalEntryLines.accountId, existing.accountId)).limit(1);
      if (linkedJournal) return c.json({ error: 'لا يمكن حذف المحفظة لأن حسابها المرتبط يحتوي على قيود يومية' }, 400);
    }

    await db.delete(wallets).where(eq(wallets.id, id));
    return c.json({ success: true });
  }),
);

export default walletsRoutes;
export { walletsRoutes as walletsWriteRoutes };
