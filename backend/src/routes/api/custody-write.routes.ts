/**
 * custody-write.routes.ts
 * كتابة سجلات العهد: إنشاء + تعديل + حذف + تصفية
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and } from "drizzle-orm";
import {
  accounts,
  custodyRecords,
  custodySettlements,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { safeHandler, parseId, getBody } from "../../middleware/helpers.ts";
import { getBizId, getUserId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const custodyWriteRoutes = new Hono();

// ============ إنشاء عهدة ============
custodyWriteRoutes.post(
  "/businesses/:bizId/custody",
  bizAuthMiddleware(),
  checkPermission("custody", "create"),
  safeHandler("إنشاء عهدة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const userId = getUserId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    // الحساب المرتبط إلزامي
    const accountId = body.accountId != null && Number(body.accountId) > 0 ? Number(body.accountId) : null;
    if (!accountId) return c.json({ error: 'يجب اختيار حساب مرتبط بالعهدة' }, 400);

    const [acc] = await db.select({ id: accounts.id, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'الحساب المحدد غير موجود' }, 400);

    if (!body.custodyType) return c.json({ error: "نوع العهدة مطلوب" }, 400);
    if (!body.contentType) return c.json({ error: "نوع المحتوى مطلوب" }, 400);
    if (!body.partyName) return c.json({ error: "اسم الطرف مطلوب" }, 400);
    if (!body.partyType) return c.json({ error: "نوع الطرف مطلوب" }, 400);

    // كود مركّب: كود الحساب/رقم فرعي
    const existingUnderAccount = await db.select({ id: custodyRecords.id }).from(custodyRecords)
      .where(and(eq(custodyRecords.businessId, bizId), eq(custodyRecords.accountId, accountId)));
    const subSeq = existingUnderAccount.length + 1;
    const custodyNumber = `${acc.code}/${subSeq}`;

    const [created] = await db
      .insert(custodyRecords)
      .values({
        businessId: bizId,
        accountId,
        custodyNumber,
        custodyType: String(body.custodyType),
        contentType: String(body.contentType),
        partyName: String(body.partyName),
        partyType: String(body.partyType),
        employeeId: typeof body.employeeId === "number" ? body.employeeId : null,
        supplierId: typeof body.supplierId === "number" ? body.supplierId : null,
        fundId: typeof body.fundId === "number" ? body.fundId : null,
        warehouseId: typeof body.warehouseId === "number" ? body.warehouseId : null,
        amount: body.amount ? String(body.amount) : '0',
        currencyId: body.currencyId && Number(body.currencyId) > 0 ? Number(body.currencyId) : null,
        description: body.description ? String(body.description) : null,
        status: "active",
        createdBy: userId ?? null,
      })
      .returning();

    return c.json(created, 201);
  })
);

// ============ تعديل عهدة ============
custodyWriteRoutes.put(
  "/businesses/:bizId/custody/:id",
  bizAuthMiddleware(),
  checkPermission("custody", "update"),
  safeHandler("تعديل عهدة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف العهدة غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(custodyRecords)
      .where(and(eq(custodyRecords.id, id), eq(custodyRecords.businessId, bizId)));

    if (!existing) return c.json({ error: "العهدة غير موجودة" }, 404);

    const body = (await getBody(c)) as Record<string, unknown>;
    const updatePayload: Record<string, unknown> = { updatedAt: new Date() };

    if (body.custodyType !== undefined) updatePayload.custodyType = String(body.custodyType);
    if (body.contentType !== undefined) updatePayload.contentType = String(body.contentType);
    if (body.partyName !== undefined) updatePayload.partyName = String(body.partyName);
    if (body.partyType !== undefined) updatePayload.partyType = String(body.partyType);
    if (body.employeeId !== undefined) updatePayload.employeeId = body.employeeId;
    if (body.supplierId !== undefined) updatePayload.supplierId = body.supplierId;
    if (body.fundId !== undefined) updatePayload.fundId = body.fundId;
    if (body.warehouseId !== undefined) updatePayload.warehouseId = body.warehouseId;
    if (body.description !== undefined) updatePayload.description = body.description;
    if (body.status !== undefined) updatePayload.status = String(body.status);
    if (body.amount !== undefined) updatePayload.amount = String(body.amount);
    if (body.currencyId !== undefined) updatePayload.currencyId = body.currencyId && Number(body.currencyId) > 0 ? Number(body.currencyId) : null;

    const [updated] = await db
      .update(custodyRecords)
      .set(updatePayload)
      .where(eq(custodyRecords.id, id))
      .returning();

    return c.json(updated);
  })
);

// ============ تصفية عهدة ============
custodyWriteRoutes.post(
  "/businesses/:bizId/custody/:id/settle",
  bizAuthMiddleware(),
  checkPermission("custody", "create"),
  safeHandler("إضافة تصفية عهدة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const userId = getUserId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف العهدة غير صالح" }, 400);

    const [custody] = await db
      .select()
      .from(custodyRecords)
      .where(and(eq(custodyRecords.id, id), eq(custodyRecords.businessId, bizId)));
    if (!custody) return c.json({ error: "العهدة غير موجودة" }, 404);

    const body = (await getBody(c)) as Record<string, unknown>;
    if (!body.settlementDate) return c.json({ error: "تاريخ التصفية مطلوب" }, 400);
    if (!body.settlementType) return c.json({ error: "نوع التصفية مطلوب" }, 400);

    const [settlement] = await db
      .insert(custodySettlements)
      .values({
        custodyId: id,
        settlementDate: String(body.settlementDate),
        settlementType: String(body.settlementType),
        amount: body.amount ? String(body.amount) : null,
        voucherId: typeof body.voucherId === "number" ? body.voucherId : null,
        inventoryItemId: typeof body.inventoryItemId === "number" ? body.inventoryItemId : null,
        quantity: body.quantity ? String(body.quantity) : null,
        unitCost: body.unitCost ? String(body.unitCost) : null,
        description: body.description ? String(body.description) : null,
        attachments: Array.isArray(body.attachments) ? body.attachments : [],
        createdBy: userId ?? null,
      })
      .returning();

    return c.json(settlement, 201);
  })
);

// ============ حذف عهدة ============
custodyWriteRoutes.delete(
  "/businesses/:bizId/custody/:id",
  bizAuthMiddleware(),
  checkPermission("custody", "delete"),
  safeHandler("حذف عهدة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف العهدة غير صالح" }, 400);

    const [existing] = await db
      .select()
      .from(custodyRecords)
      .where(and(eq(custodyRecords.id, id), eq(custodyRecords.businessId, bizId)));
    if (!existing) return c.json({ error: "العهدة غير موجودة" }, 404);

    const [hasSettlements] = await db
      .select({ id: custodySettlements.id })
      .from(custodySettlements)
      .where(eq(custodySettlements.custodyId, id))
      .limit(1);
    if (hasSettlements) return c.json({ error: "لا يمكن حذف العهدة لأنها تحتوي على تصفيات" }, 400);

    await db.delete(custodyRecords).where(eq(custodyRecords.id, id));
    return c.json({ success: true });
  })
);

export { custodyWriteRoutes };
