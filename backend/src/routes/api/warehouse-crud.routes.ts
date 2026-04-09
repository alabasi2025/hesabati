/**
 * warehouse-crud.routes.ts — Phase 9
 * CRUD المخازن: إضافة + تعديل + حذف + جلب
 */
/**
 * مسارات المخازن (CRUD) والعمليات المخزنية (warehouse-operations) وجلب المخزون والملخصات
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, desc, sql, and } from "drizzle-orm";
import {
  businesses,
  warehouses,
  operationCategories,
  journalEntryCategories,
  warehouseOperations,
  warehouseOperationItems,
  operationTypes,
  inventoryItems,
  accounts,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { warehouseSchema, validateBody } from "../../middleware/validation.ts";
import {
  checkPermission,
  validateConstraints,
} from "../../middleware/permissions.ts";
import {
  safeHandler,
  parseId,
  toErrorMessage,
  getBody,
} from "../../middleware/helpers.ts";
import {
  getNextSequence,
  getNextItemInCategorySequence,
  generateWarehouseOpFullSequence,
} from "../../middleware/sequencing.ts";
import { postTransaction } from "../../engines/transaction.engine.ts";
import { processStockMovement } from "../../services/inventory.service.ts";
import { getBizId, getUserId } from "./_shared/context-helpers.ts";
import { normalizeDbResult, getFirstRow } from "./_shared/db-helpers.ts";
import { requireResourceOwnership } from "./_shared/ownership.ts";

const warehouseRoutes = new Hono();

// ===================== المخازن (CRUD) =====================

warehouseRoutes.get(
  "/businesses/:bizId/warehouses",
  bizAuthMiddleware(),
  safeHandler("جلب المخازن", async (c) => {
    const bizId = getBizId(c);
    const includeCustody = c.req.query("includeCustody") === "true";
    const whereCondition = includeCustody
      ? eq(warehouses.businessId, bizId)
      : and(
          eq(warehouses.businessId, bizId),
          sql`${warehouses.warehouseType}::text <> 'custody'`,
        );
    const rows = await db
      .select({
        id: warehouses.id,
        businessId: warehouses.businessId,
        name: warehouses.name,
        accountId: warehouses.accountId,
        warehouseType: warehouses.warehouseType,
        sequenceNumber: warehouses.sequenceNumber,
        code: warehouses.code,
        stationId: warehouses.stationId,
        responsiblePerson: warehouses.responsiblePerson,
        location: warehouses.location,
        isActive: warehouses.isActive,
        notes: warehouses.notes,
        createdAt: warehouses.createdAt,
        updatedAt: warehouses.updatedAt,
        accountCode: accounts.code,
        accountName: accounts.name,
      })
      .from(warehouses)
      .leftJoin(accounts, eq(accounts.id, warehouses.accountId))
      .where(whereCondition)
      .orderBy(warehouses.id);
    return c.json(rows);
  }),
);

warehouseRoutes.post(
  "/businesses/:bizId/warehouses",
  bizAuthMiddleware(),
  safeHandler("إضافة مخزن", async (c) => {
    const bizId = getBizId(c);
    const body = await getBody(c);
    const validation = validateBody(warehouseSchema, body);
    if (!validation.success) return c.json({ error: validation.error }, 400);
    const data = validation.data as Record<string, unknown> & {
      name?: string;
      warehouseType?: string;
      accountId?: number;
    };

    // حساب التحكم إلزامي
    const accountId = data.accountId != null && Number(data.accountId) > 0 ? Number(data.accountId) : null;
    if (!accountId) return c.json({ error: 'يجب اختيار حساب تحكم مرتبط بالمخزن' }, 400);

    const [acc] = await db
      .select({ id: accounts.id, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'الحساب المحدد غير موجود' }, 400);

    // كود مركّب: WHS-01/1, WHS-01/2, ...
    const existingWarehouses = await db.select({ id: warehouses.id }).from(warehouses)
      .where(and(eq(warehouses.businessId, bizId), eq(warehouses.accountId, accountId)));
    const subSeq = existingWarehouses.length + 1;
    const warehouseCode = `${acc.code}/${subSeq}`;

    const name = (data.name ?? "") as string;
    const warehouseType = (
      ["main", "station", "sub"].includes(String(data.warehouseType ?? ""))
        ? data.warehouseType
        : "main"
    ) as "main" | "station" | "sub";

    const [created] = await db
      .insert(warehouses)
      .values({
        businessId: bizId,
        name,
        warehouseType,
        accountId,
        code: warehouseCode,
        sequenceNumber: subSeq,
        stationId: data.stationId != null ? Number(data.stationId) : null,
        responsiblePerson: typeof data.responsiblePerson === 'string' ? data.responsiblePerson.trim() || null : null,
        location: typeof data.location === 'string' ? data.location.trim() || null : null,
        notes: typeof data.notes === 'string' ? data.notes.trim() || null : null,
        isActive: data.isActive !== false,
      } as any)
      .returning();
    return c.json(created, 201);
  }),
);

warehouseRoutes.get(
  "/warehouses/:id",
  safeHandler("جلب مخزن بالمعرّف", async (c) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المخزن غير صالح" }, 400);
    const [warehouse] = await db
      .select()
      .from(warehouses)
      .where(eq(warehouses.id, id));
    const err = await requireResourceOwnership(c, warehouse ?? null);
    if (err) return err;
    return c.json(warehouse);
  }),
);

warehouseRoutes.put(
  "/warehouses/:id",
  safeHandler("تعديل مخزن", async (c) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المخزن غير صالح" }, 400);
    const [warehouse] = await db
      .select()
      .from(warehouses)
      .where(eq(warehouses.id, id));
    const err = await requireResourceOwnership(c, warehouse ?? null);
    if (err) return err;
    const body = await getBody(c);
    const [updated] = await db
      .update(warehouses)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(warehouses.id, id))
      .returning();
    if (!updated) return c.json({ error: "مخزن غير موجود" }, 404);

    return c.json(updated);
  }),
);

warehouseRoutes.delete(
  "/warehouses/:id",
  safeHandler("حذف مخزن", async (c) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف المخزن غير صالح" }, 400);
    const [warehouse] = await db
      .select()
      .from(warehouses)
      .where(eq(warehouses.id, id));
    const err = await requireResourceOwnership(c, warehouse ?? null);
    if (err) return err;
    await db.delete(warehouses).where(eq(warehouses.id, id));
    return c.json({ success: true });
  }),
);

// جلب عمليات مخزن معين

export { warehouseRoutes as warehouseCrudRoutes };
