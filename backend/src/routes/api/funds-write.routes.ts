/**
 * funds-write.routes.ts — Phase 10
 * تعديل الصناديق: إنشاء + تعديل + حذف + تحويل
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, ne, sql } from "drizzle-orm";
import {
  accounts,
  accountCurrencies,
  funds,
  fundBalances,
  vouchers,
  voucherLines,
  journalEntryLines,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { fundSchema, validateBody } from "../../middleware/validation.ts";
import { safeHandler, parseId, getBody } from "../../middleware/helpers.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import { requireResourceOwnership } from "./_shared/ownership.ts";
import { generateFinancialEntityCodes } from "../../engines/sequencing-entity.engine.ts";
import { accountSubNatures } from "../../db/schema/index.ts";
import type { AppContext } from "./_shared/types.ts";

const fundsRoutes = new Hono();

fundsRoutes.post(
  "/businesses/:bizId/funds",
  bizAuthMiddleware(),
  checkPermission("funds", "create"),
  safeHandler("إضافة صندوق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;
    const validation = validateBody(fundSchema, body);
    if (!validation.success) return c.json({ error: validation.error }, 400);
    const vd = validation.data as Record<string, unknown>;
    const providedAccountId =
      body.accountId != null && Number(body.accountId) > 0
        ? Number(body.accountId)
        : null;

    let accountId: number;
    let fundCode: string;
    let fundLedgerCode: string;
    let fundSeqNumber: number;

    if (providedAccountId) {
      // حساب موجود — كود مركّب حسب عدد الصناديق المرتبطة به
      const [acc] = await db
        .select({
          id: accounts.id,
          sequenceNumber: accounts.sequenceNumber,
          code: accounts.code,
          // ledgerCode removed
        })
        .from(accounts)
        .where(
          and(
            eq(accounts.id, providedAccountId),
            eq(accounts.businessId, bizId),
          ),
        )
        .limit(1);
      if (!acc) return c.json({ error: "الحساب المحدد غير موجود" }, 400);
      const existingFunds = await db
        .select({ id: funds.id })
        .from(funds)
        .where(
          and(
            eq(funds.businessId, bizId),
            eq(funds.accountId, providedAccountId),
          ),
        );
      const subSeq = existingFunds.length + 1;
      accountId = acc.id;
      const paddedFundCode = `${acc.code}/${String(subSeq).padStart(2, "0")}`;
      fundCode = paddedFundCode;
      fundLedgerCode = paddedFundCode
        .replace(
          /^([A-Z]+)/,
          (_m, p) =>
            ({
              FND: "001",
              BNK: "002",
              WLT: "003",
              EXC: "004",
              WHS: "005",
              CUS: "006",
              SUP: "007",
              EMP: "008",
              PRT: "009",
              BIL: "010",
              INT: "011",
              BDG: "012",
              STL: "013",
              PNG: "014",
            })[p] ?? "099",
        )
        .replace("/", "-");
      fundSeqNumber = acc.sequenceNumber ?? subSeq;
    } else {
      // لا يوجد حساب — ينشئ المحرك حساباً مستقلاً جديداً تلقائياً
      const [subNature] = await db
        .select({ id: accountSubNatures.id })
        .from(accountSubNatures)
        .where(
          and(
            eq(accountSubNatures.businessId, bizId),
            eq(accountSubNatures.natureKey, "fund"),
          ),
        )
        .limit(1);
      const codes = await generateFinancialEntityCodes(
        bizId,
        "fund",
        db as any,
      );
      const [newAcc] = await db
        .insert(accounts)
        .values({
          businessId: bizId,
          name: String(vd.name),
          accountType: "fund" as any,
          accountSubNatureId: subNature?.id ?? null,
          isLeafAccount: true,
          code: codes.accountCode,
          sequenceNumber: codes.sequenceNumber,
        })
        .returning();
      accountId = newAcc.id;
      fundCode = codes.entityCode;
      fundLedgerCode = codes.entityCode
        .replace(
          /^([A-Z]+)/,
          (_m, p) =>
            ({
              FND: "001",
              BNK: "002",
              WLT: "003",
              EXC: "004",
              WHS: "005",
              CUS: "006",
              SUP: "007",
              EMP: "008",
              PRT: "009",
              BIL: "010",
              INT: "011",
              BDG: "012",
              STL: "013",
              PNG: "014",
            })[p] ?? "099",
        )
        .replace("/", "-");
      fundSeqNumber = codes.sequenceNumber;
    }

    // تحديد العملة الافتراضية
    let defaultCurrencyId: number | null = null;
    if (body.defaultCurrencyId && Number(body.defaultCurrencyId) > 0) {
      defaultCurrencyId = Number(body.defaultCurrencyId);
    }

    const insertPayload: typeof funds.$inferInsert = {
      businessId: bizId,
      name: String(vd.name),
      accountId: accountId,
      defaultCurrencyId: defaultCurrencyId,
      sequenceNumber: fundSeqNumber,
      code: fundCode,
      stationId:
        vd.stationId != null && Number(vd.stationId) > 0
          ? Number(vd.stationId)
          : null,
      responsiblePerson:
        typeof vd.responsiblePerson === "string" && vd.responsiblePerson.trim()
          ? vd.responsiblePerson.trim()
          : null,
      description:
        typeof vd.description === "string" && vd.description.trim()
          ? vd.description.trim()
          : null,
      notes:
        typeof vd.notes === "string" && vd.notes.trim()
          ? vd.notes.trim()
          : null,
      isActive: vd.isActive !== false,
    };

    const [created] = await db
      .insert(funds)
      .values(insertPayload as typeof funds.$inferInsert)
      .returning();

    // نسخ العملات المحددة أو جميع عملات الحساب إلى fund_balances
    let currencyIdsToAdd: number[] = [];

    if (
      body.currencyIds &&
      Array.isArray(body.currencyIds) &&
      body.currencyIds.length > 0
    ) {
      // استخدام العملات المحددة من المستخدم
      currencyIdsToAdd = body.currencyIds
        .map((id: any) => Number(id))
        .filter((id: number) => id > 0);
    } else {
      // نسخ جميع عملات الحساب افتراضياً
      const accountCurrenciesRows = await db
        .select({ currencyId: accountCurrencies.currencyId })
        .from(accountCurrencies)
        .where(eq(accountCurrencies.accountId, accountId));
      currencyIdsToAdd = accountCurrenciesRows.map((ac) => ac.currencyId);
    }

    if (currencyIdsToAdd.length > 0) {
      const balanceValues = currencyIdsToAdd.map((currencyId) => ({
        fundId: created.id,
        currencyId: currencyId,
        balance: "0",
        updatedAt: new Date(),
      }));
      await db.insert(fundBalances).values(balanceValues);
    }

    return c.json(created, 201);
  }),
);

fundsRoutes.put(
  "/businesses/:bizId/funds/:id",
  bizAuthMiddleware(),
  safeHandler("تعديل صندوق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الصندوق غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(funds)
      .where(and(eq(funds.id, id), eq(funds.businessId, bizId)));
    if (!existing)
      return c.json({ error: "صندوق غير موجود أو لا ينتمي لهذا العمل" }, 404);
    const body = (await getBody(c)) as Record<string, unknown>;
    const payload: Record<string, unknown> = { ...body, updatedAt: new Date() };

    const [updated] = await db
      .update(funds)
      .set(payload)
      .where(eq(funds.id, id))
      .returning();

    return c.json(updated);
  }),
);

fundsRoutes.delete(
  "/businesses/:bizId/funds/:id",
  bizAuthMiddleware(),
  checkPermission("funds", "delete"),
  safeHandler("حذف صندوق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الصندوق غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(funds)
      .where(and(eq(funds.id, id), eq(funds.businessId, bizId)));
    if (!existing)
      return c.json({ error: "صندوق غير موجود أو لا ينتمي لهذا العمل" }, 404);

    // حماية: لا يمكن حذف صندوق تم تنفيذ عمليات فيه
    const [linkedVoucher] = await db
      .select({ id: vouchers.id })
      .from(vouchers)
      .where(
        and(
          eq(vouchers.businessId, bizId),
          sql`(${vouchers.fromFundId} = ${id} OR ${vouchers.toFundId} = ${id})`,
        ),
      )
      .limit(1);
    if (linkedVoucher)
      return c.json(
        { error: "لا يمكن حذف الصندوق لأنه مرتبط بسندات. احذف السندات أولاً" },
        400,
      );

    const [nonZeroBalance] = await db
      .select({ id: fundBalances.id })
      .from(fundBalances)
      .where(and(eq(fundBalances.fundId, id), ne(fundBalances.balance, "0")))
      .limit(1);
    if (nonZeroBalance)
      return c.json(
        { error: "لا يمكن حذف الصندوق لأنه يحتوي على رصيد غير صفري" },
        400,
      );

    if (existing.accountId) {
      const [linkedVoucherLine] = await db
        .select({ id: voucherLines.id })
        .from(voucherLines)
        .where(eq(voucherLines.accountId, existing.accountId))
        .limit(1);
      if (linkedVoucherLine)
        return c.json(
          { error: "لا يمكن حذف الصندوق لأن حسابه المرتبط يحتوي على قيود" },
          400,
        );

      const [linkedJournal] = await db
        .select({ id: journalEntryLines.id })
        .from(journalEntryLines)
        .where(eq(journalEntryLines.accountId, existing.accountId))
        .limit(1);
      if (linkedJournal)
        return c.json(
          {
            error: "لا يمكن حذف الصندوق لأن حسابه المرتبط يحتوي على قيود يومية",
          },
          400,
        );
    }

    await db.delete(fundBalances).where(eq(fundBalances.fundId, id));
    await db.delete(funds).where(eq(funds.id, id));
    return c.json({ success: true });
  }),
);

fundsRoutes.put(
  "/funds/:id",
  safeHandler("تعديل صندوق (legacy)", async (c: AppContext) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الصندوق غير صالح" }, 400);
    const [existing] = await db.select().from(funds).where(eq(funds.id, id));
    const err = await requireResourceOwnership(c, existing ?? null);
    if (err) return err;
    const body = (await getBody(c)) as Record<string, unknown>;
    const payload: Record<string, unknown> = { ...body, updatedAt: new Date() };
    const manualSeq =
      typeof body.sequenceNumber === "number"
        ? body.sequenceNumber
        : typeof body.sequenceNumber === "string"
          ? Number.parseInt(body.sequenceNumber, 10)
          : null;
    if (manualSeq != null && Number.isInteger(manualSeq) && manualSeq > 0) {
      const dup = await db
        .select({ id: funds.id })
        .from(funds)
        .where(
          and(
            eq(funds.businessId, existing.businessId),
            eq(funds.sequenceNumber, manualSeq),
            ne(funds.id, id),
          ),
        )
        .limit(1);
      if (dup.length > 0) {
        return c.json({ error: "رقم الصندوق مستخدم مسبقاً" }, 400);
      }
      payload.sequenceNumber = manualSeq;
    }

    const [updated] = await db
      .update(funds)
      .set(payload)
      .where(eq(funds.id, id))
      .returning();
    if (!updated) return c.json({ error: "صندوق غير موجود" }, 404);
    return c.json(updated);
  }),
);

export default fundsRoutes;

export { fundsRoutes as fundsWriteRoutes };
