/**
 * العهد والتصفيات - Custody Routes
 * إدارة سجلات العهد وتصفياتها
 */

import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, asc, desc } from "drizzle-orm";
import {
  custodyRecords,
  custodySettlements,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import {
  safeHandler,
  parseId,
  getBody,
} from "../../middleware/helpers.ts";
import {
  getNextSequence,
  generateItemCode,
} from "../../middleware/sequencing.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import { getUserId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const custodyRoutes = new Hono();

custodyRoutes.get(
  "/businesses/:bizId/custody",
  bizAuthMiddleware(),
  safeHandler("جلب سجلات العهد", async (c: AppContext) => {
    const bizId = getBizId(c);
    const custodyType = c.req.query("custodyType");
    const status = c.req.query("status");
    const partyType = c.req.query("partyType");

    const conditions = [eq(custodyRecords.businessId, bizId)];

    if (custodyType) {
      conditions.push(eq(custodyRecords.custodyType, custodyType));
    }
    if (status) {
      conditions.push(eq(custodyRecords.status, status));
    }
    if (partyType) {
      conditions.push(eq(custodyRecords.partyType, partyType));
    }

    const records = await db
      .select({
        id: custodyRecords.id,
        custodyNumber: custodyRecords.custodyNumber,
        custodyType: custodyRecords.custodyType,
        contentType: custodyRecords.contentType,
        partyName: custodyRecords.partyName,
        partyType: custodyRecords.partyType,
        employeeId: custodyRecords.employeeId,
        supplierId: custodyRecords.supplierId,
        fundId: custodyRecords.fundId,
        warehouseId: custodyRecords.warehouseId,
        description: custodyRecords.description,
        status: custodyRecords.status,
        createdBy: custodyRecords.createdBy,
        createdAt: custodyRecords.createdAt,
      })
      .from(custodyRecords)
      .where(and(...conditions))
      .orderBy(desc(custodyRecords.createdAt));

    return c.json(records);
  })
);

custodyRoutes.get(
  "/businesses/:bizId/custody/:id",
  bizAuthMiddleware(),
  safeHandler("جلب تفاصيل عهدة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف العهدة غير صالح" }, 400);

    const [record] = await db
      .select()
      .from(custodyRecords)
      .where(
        and(
          eq(custodyRecords.id, id),
          eq(custodyRecords.businessId, bizId)
        )
      );

    if (!record) {
      return c.json({ error: "العهدة غير موجودة" }, 404);
    }

    const settlements = await db
      .select()
      .from(custodySettlements)
      .where(eq(custodySettlements.custodyId, id))
      .orderBy(desc(custodySettlements.createdAt));

    return c.json({ ...record, settlements });
  })
);

custodyRoutes.post(
  "/businesses/:bizId/custody",
  bizAuthMiddleware(),
  checkPermission("custody", "create"),
  safeHandler("إنشاء عهدة", async (c: AppContext) => {
    const bizId = getBizId(c);
    const userId = getUserId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    if (!body.custodyType) {
      return c.json({ error: "نوع العهدة مطلوب" }, 400);
    }
    if (!body.contentType) {
      return c.json({ error: "نوع المحتوى مطلوب" }, 400);
    }
    if (!body.partyName) {
      return c.json({ error: "اسم الطرف مطلوب" }, 400);
    }
    if (!body.partyType) {
      return c.json({ error: "نوع الطرف مطلوب" }, 400);
    }

    const seqNum = await getNextSequence(bizId, "custody", 0);
    const custodyNumber = body.custodyNumber
      ? String(body.custodyNumber)
      : generateItemCode("CUS", seqNum);

    const [created] = await db
      .insert(custodyRecords)
      .values({
        businessId: bizId,
        custodyNumber,
        custodyType: String(body.custodyType),
        contentType: String(body.contentType),
        partyName: String(body.partyName),
        partyType: String(body.partyType),
        employeeId: typeof body.employeeId === "number" ? body.employeeId : null,
        supplierId: typeof body.supplierId === "number" ? body.supplierId : null,
        fundId: typeof body.fundId === "number" ? body.fundId : null,
        warehouseId: typeof body.warehouseId === "number" ? body.warehouseId : null,
        description: body.description ? String(body.description) : null,
        status: "active",
        createdBy: userId ?? null,
      })
      .returning();

    return c.json(created, 201);
  })
);

custodyRoutes.put(
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
      .where(
        and(
          eq(custodyRecords.id, id),
          eq(custodyRecords.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "العهدة غير موجودة" }, 404);
    }

    const body = (await getBody(c)) as Record<string, unknown>;

    const updatePayload: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (body.custodyType !== undefined)
      updatePayload.custodyType = String(body.custodyType);
    if (body.contentType !== undefined)
      updatePayload.contentType = String(body.contentType);
    if (body.partyName !== undefined)
      updatePayload.partyName = String(body.partyName);
    if (body.partyType !== undefined)
      updatePayload.partyType = String(body.partyType);
    if (body.employeeId !== undefined)
      updatePayload.employeeId = body.employeeId;
    if (body.supplierId !== undefined)
      updatePayload.supplierId = body.supplierId;
    if (body.fundId !== undefined) updatePayload.fundId = body.fundId;
    if (body.warehouseId !== undefined)
      updatePayload.warehouseId = body.warehouseId;
    if (body.description !== undefined)
      updatePayload.description = body.description;
    if (body.status !== undefined) updatePayload.status = String(body.status);

    const [updated] = await db
      .update(custodyRecords)
      .set(updatePayload)
      .where(eq(custodyRecords.id, id))
      .returning();

    return c.json(updated);
  })
);

custodyRoutes.post(
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
      .where(
        and(
          eq(custodyRecords.id, id),
          eq(custodyRecords.businessId, bizId)
        )
      );

    if (!custody) {
      return c.json({ error: "العهدة غير موجودة" }, 404);
    }

    const body = (await getBody(c)) as Record<string, unknown>;

    if (!body.settlementDate) {
      return c.json({ error: "تاريخ التصفية مطلوب" }, 400);
    }
    if (!body.settlementType) {
      return c.json({ error: "نوع التصفية مطلوب" }, 400);
    }

    const [settlement] = await db
      .insert(custodySettlements)
      .values({
        custodyId: id,
        settlementDate: String(body.settlementDate),
        settlementType: String(body.settlementType),
        amount: body.amount ? String(body.amount) : null,
        voucherId: typeof body.voucherId === "number" ? body.voucherId : null,
        inventoryItemId:
          typeof body.inventoryItemId === "number"
            ? body.inventoryItemId
            : null,
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

custodyRoutes.delete(
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
      .where(
        and(
          eq(custodyRecords.id, id),
          eq(custodyRecords.businessId, bizId)
        )
      );

    if (!existing) {
      return c.json({ error: "العهدة غير موجودة" }, 404);
    }

    const [hasSettlements] = await db
      .select({ id: custodySettlements.id })
      .from(custodySettlements)
      .where(eq(custodySettlements.custodyId, id))
      .limit(1);

    if (hasSettlements) {
      return c.json(
        { error: "لا يمكن حذف العهدة لأنها تحتوي على تصفيات" },
        400
      );
    }

    await db.delete(custodyRecords).where(eq(custodyRecords.id, id));

    return c.json({ success: true });
  })
);

export default custodyRoutes;
