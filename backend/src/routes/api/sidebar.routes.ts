/**
 * Sidebar Routes — مسارات التبويب الجانبي
 * @module routes/api/sidebar.routes
 * @since Phase 4
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import {
  sidebarSections,
  sidebarItems,
  userSidebarConfig,
} from "../../db/schema/core.ts";
import { users } from "../../db/schema/index.ts";
import { screenTemplates } from "../../db/schema/schema-warehouse.ts";
import { businesses } from "../../db/schema/schema-business.ts";
import { eq, and } from "drizzle-orm";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { getBizId, getUserId } from "./_shared/context-helpers.ts";
import { safeHandler, parseId, getBody } from "../../middleware/helpers.ts";
import {
  validateBody,
  sidebarSectionSchema,
} from "../../middleware/validation.ts";
import { requireResourceOwnership } from "./_shared/ownership.ts";

export const sidebarRoutes = new Hono();
const api = sidebarRoutes;

// ===================== التبويب الجانبي - الأقسام =====================
api.get(
  "/businesses/:bizId/sidebar-sections",
  bizAuthMiddleware(),
  safeHandler("جلب أقسام السايدبار", async (c) => {
    const bizId = getBizId(c);
    const rows = await db
      .select()
      .from(sidebarSections)
      .where(eq(sidebarSections.businessId, bizId))
      .orderBy(sidebarSections.sortOrder);
    return c.json(rows);
  }),
);

api.post(
  "/businesses/:bizId/sidebar-sections",
  bizAuthMiddleware(),
  safeHandler("إضافة قسم سايدبار", async (c) => {
    const bizId = getBizId(c);
    const body = await getBody(c);
    const validation = validateBody(sidebarSectionSchema, body);
    if (!validation.success) return c.json({ error: validation.error }, 400);
    const [created] = await db
      .insert(sidebarSections)
      .values({ ...validation.data, businessId: bizId })
      .returning();
    return c.json(created, 201);
  }),
);

api.put(
  "/sidebar-sections/:id",
  safeHandler("تعديل قسم سايدبار", async (c) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف القسم غير صالح" }, 400);
    const [rec] = await db
      .select()
      .from(sidebarSections)
      .where(eq(sidebarSections.id, id));
    const err = await requireResourceOwnership(c, rec ?? null);
    if (err) return err;
    const body = await getBody(c);
    const [updated] = await db
      .update(sidebarSections)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(sidebarSections.id, id))
      .returning();
    if (!updated) return c.json({ error: "قسم غير موجود" }, 404);
    return c.json(updated);
  }),
);

api.delete(
  "/sidebar-sections/:id",
  safeHandler("حذف قسم سايدبار", async (c) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف القسم غير صالح" }, 400);
    const [rec] = await db
      .select()
      .from(sidebarSections)
      .where(eq(sidebarSections.id, id));
    const err = await requireResourceOwnership(c, rec ?? null);
    if (err) return err;
    const items = await db
      .select()
      .from(sidebarItems)
      .where(eq(sidebarItems.sectionId, id));
    for (const item of items) {
      await db
        .delete(userSidebarConfig)
        .where(eq(userSidebarConfig.sidebarItemId, item.id));
    }
    await db.delete(sidebarItems).where(eq(sidebarItems.sectionId, id));
    await db.delete(sidebarSections).where(eq(sidebarSections.id, id));
    return c.json({ success: true });
  }),
);

// ===================== التبويب الجانبي - العناصر =====================
api.get(
  "/businesses/:bizId/sidebar-items",
  bizAuthMiddleware(),
  safeHandler("جلب عناصر السايدبار", async (c) => {
    const bizId = getBizId(c);
    const rows = await db
      .select({
        id: sidebarItems.id,
        sectionId: sidebarItems.sectionId,
        screenKey: sidebarItems.screenKey,
        label: sidebarItems.label,
        icon: sidebarItems.icon,
        color: sidebarItems.color,
        route: sidebarItems.route,
        sortOrder: sidebarItems.sortOrder,
        isActive: sidebarItems.isActive,
        badge: sidebarItems.badge,
        badgeColor: sidebarItems.badgeColor,
        sectionName: sidebarSections.name,
        sectionIcon: sidebarSections.icon,
        sectionColor: sidebarSections.color,
        sectionSortOrder: sidebarSections.sortOrder,
      })
      .from(sidebarItems)
      .leftJoin(sidebarSections, eq(sidebarItems.sectionId, sidebarSections.id))
      .where(eq(sidebarSections.businessId, bizId))
      .orderBy(sidebarSections.sortOrder, sidebarItems.sortOrder);
    return c.json(rows);
  }),
);

api.post(
  "/sidebar-items",
  safeHandler("إضافة عنصر سايدبار", async (c) => {
    const body = await getBody(c);

    // إصلاح #1: التحقق من sectionId (حقل إلزامي)
    if (!body.sectionId) {
      return c.json(
        {
          error:
            "معرّف القسم (sectionId) مطلوب - يجب تحديد القسم الذي سيُضاف إليه العنصر",
        },
        400,
      );
    }
    if (!body.screenKey)
      return c.json({ error: "مفتاح الشاشة (screenKey) مطلوب" }, 400);
    if (!body.label) return c.json({ error: "التسمية (label) مطلوبة" }, 400);
    if (!body.icon) return c.json({ error: "الأيقونة (icon) مطلوبة" }, 400);
    if (!body.route) return c.json({ error: "المسار (route) مطلوب" }, 400);

    // التحقق من وجود القسم وملكيته
    const [section] = await db
      .select()
      .from(sidebarSections)
      .where(eq(sidebarSections.id, body.sectionId));
    if (!section) return c.json({ error: "القسم المحدد غير موجود" }, 404);
    const sectionErr = await requireResourceOwnership(c, section);
    if (sectionErr) return sectionErr;

    const [created] = await db.insert(sidebarItems).values(body).returning();

    // إضافة العنصر لجميع المستخدمين المرتبطين بالعمل
    const bizId = section.businessId;
    const configs = await db
      .select()
      .from(userSidebarConfig)
      .where(eq(userSidebarConfig.businessId, bizId));
    const userIds = [...new Set(configs.map((c) => c.userId))];
    for (const userId of userIds) {
      await db.insert(userSidebarConfig).values({
        userId,
        businessId: bizId,
        sidebarItemId: created.id,
        isVisible: false,
        customSortOrder: body.sortOrder || 0,
      });
    }

    return c.json(created, 201);
  }),
);

api.put(
  "/sidebar-items/:id",
  safeHandler("تعديل عنصر سايدبار", async (c) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف العنصر غير صالح" }, 400);
    // التحقق من الملكية عبر القسم الأب
    const [item] = await db
      .select()
      .from(sidebarItems)
      .where(eq(sidebarItems.id, id));
    if (!item) return c.json({ error: "عنصر غير موجود" }, 404);
    const [section] = await db
      .select()
      .from(sidebarSections)
      .where(eq(sidebarSections.id, item.sectionId));
    const err = await requireResourceOwnership(c, section ?? null);
    if (err) return err;
    const body = await getBody(c);
    const [updated] = await db
      .update(sidebarItems)
      .set(body)
      .where(eq(sidebarItems.id, id))
      .returning();
    if (!updated) return c.json({ error: "عنصر غير موجود" }, 404);
    return c.json(updated);
  }),
);

api.delete(
  "/sidebar-items/:id",
  safeHandler("حذف عنصر سايدبار", async (c) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف العنصر غير صالح" }, 400);
    // التحقق من الملكية عبر القسم الأب
    const [item] = await db
      .select()
      .from(sidebarItems)
      .where(eq(sidebarItems.id, id));
    if (!item) return c.json({ error: "عنصر غير موجود" }, 404);
    const [section] = await db
      .select()
      .from(sidebarSections)
      .where(eq(sidebarSections.id, item.sectionId));
    const err = await requireResourceOwnership(c, section ?? null);
    if (err) return err;
    await db
      .delete(userSidebarConfig)
      .where(eq(userSidebarConfig.sidebarItemId, id));
    await db.delete(sidebarItems).where(eq(sidebarItems.id, id));
    return c.json({ success: true });
  }),
);

// ===================== إعدادات السايدبار للمستخدم =====================
api.get(
  "/businesses/:bizId/users/:userId/sidebar",
  bizAuthMiddleware(),
  safeHandler("جلب سايدبار المستخدم", async (c) => {
    const bizId = getBizId(c);
    const userId = parseId(c.req.param("userId"));
    if (!userId) return c.json({ error: "معرّف المستخدم غير صالح" }, 400);

    // دالة مساعدة لجلب configs بالأسماء الصحيحة التي يتوقعها الفرونت إند
    const fetchConfigs = async () => {
      const rows = await db
        .select({
          configId: userSidebarConfig.id,
          itemId: userSidebarConfig.sidebarItemId,
          isVisible: userSidebarConfig.isVisible,
          customSortOrder: userSidebarConfig.customSortOrder,
          label: sidebarItems.label,
          icon: sidebarItems.icon,
          color: sidebarItems.color,
          route: sidebarItems.route,
          screenKey: sidebarItems.screenKey,
          sectionId: sidebarItems.sectionId,
          sectionName: sidebarSections.name,
          sectionIcon: sidebarSections.icon,
          sectionColor: sidebarSections.color,
          sectionSortOrder: sidebarSections.sortOrder,
          itemSortOrder: sidebarItems.sortOrder,
        })
        .from(userSidebarConfig)
        .leftJoin(
          sidebarItems,
          eq(userSidebarConfig.sidebarItemId, sidebarItems.id),
        )
        .leftJoin(
          sidebarSections,
          eq(sidebarItems.sectionId, sidebarSections.id),
        )
        .where(
          and(
            eq(userSidebarConfig.businessId, bizId),
            eq(userSidebarConfig.userId, userId),
          ),
        )
        .orderBy(sidebarSections.sortOrder, userSidebarConfig.customSortOrder);
      return rows;
    };

    // جلب المستخدم لمعرفة دوره
    const userRow = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    const isOwner = userRow[0]?.role === "admin";

    // جلب كل عناصر هذا العمل
    const allBizItems = await db
      .select({ id: sidebarItems.id, sortOrder: sidebarItems.sortOrder })
      .from(sidebarItems)
      .leftJoin(sidebarSections, eq(sidebarItems.sectionId, sidebarSections.id))
      .where(eq(sidebarSections.businessId, bizId));

    // جلب العناصر الموجودة في config المستخدم
    const existingConfigs = await db
      .select({ sidebarItemId: userSidebarConfig.sidebarItemId })
      .from(userSidebarConfig)
      .where(
        and(
          eq(userSidebarConfig.businessId, bizId),
          eq(userSidebarConfig.userId, userId),
        ),
      );
    const existingItemIds = new Set(
      existingConfigs.map((e) => e.sidebarItemId),
    );

    // إضافة العناصر الجديدة التي لم تُضف بعد لـ config المستخدم
    const newItems = allBizItems.filter(
      (item) => !existingItemIds.has(item.id),
    );
    if (newItems.length > 0) {
      // المالك يرى كل شيء تلقائياً، غيره لا يرى العناصر الجديدة حتى يُفعّلها المالك
      for (const item of newItems) {
        await db.insert(userSidebarConfig).values({
          userId,
          businessId: bizId,
          sidebarItemId: item.id,
          isVisible: isOwner, // المالك يرى كل شيء، غيره لا يرى الجديد تلقائياً
          customSortOrder: item.sortOrder || 0,
        });
      }
    }

    const configs = await fetchConfigs();

    // === فلتر العناصر الوهمية: استبعاد عناصر الشاشات المخصصة المحذوفة ===
    const existingScreens = await db
      .select({ id: screenTemplates.id })
      .from(screenTemplates)
      .where(eq(screenTemplates.businessId, bizId));
    const existingScreenIds = new Set(existingScreens.map((s) => s.id));

    let filteredConfigs = configs.filter((cfg: any) => {
      if (!cfg.screenKey?.startsWith("custom-screen-")) return true;
      const screenId = Number.parseInt(
        cfg.screenKey.replace("custom-screen-", ""),
      );
      return !Number.isNaN(screenId) && existingScreenIds.has(screenId);
    });

    // === ملخص الأعمال: يظهر فقط لأعمال شخصية (حسابات المالك وأعماله الخاصة) ===
    const [bizRow] = await db
      .select({ type: businesses.type })
      .from(businesses)
      .where(eq(businesses.id, bizId))
      .limit(1);
    let bizType: "personal" | "single_station" | "stations" = "stations";
    if (bizRow?.type === "personal") bizType = "personal";
    else if (bizRow?.type === "single_station") bizType = "single_station";
    if (bizType !== "personal") {
      filteredConfigs = filteredConfigs.filter(
        (cfg: any) => cfg.screenKey !== "summary",
      );
    }

    return c.json(filteredConfigs);
  }),
);

api.put(
  "/businesses/:bizId/users/:userId/sidebar",
  bizAuthMiddleware(),
  safeHandler("تحديث سايدبار المستخدم", async (c) => {
    const userId = parseId(c.req.param("userId"));
    if (!userId) return c.json({ error: "معرّف المستخدم غير صالح" }, 400);
    const body = await getBody(c);
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return c.json({ error: "قائمة العناصر (items) مطلوبة" }, 400);
    }

    for (const item of items) {
      if (item.id) {
        await db
          .update(userSidebarConfig)
          .set({
            isVisible: item.isVisible,
            customSortOrder: item.customSortOrder,
          })
          .where(eq(userSidebarConfig.id, item.id));
      }
    }

    return c.json({ success: true });
  }),
);

// ===================== جلب جميع المستخدمين =====================
api.get(
  "/users",
  safeHandler("جلب المستخدمين", async (c) => {
    const rows = await db
      .select({
        id: users.id,
        username: users.username,
        fullName: users.fullName,
        role: users.role,
        isActive: users.isActive,
      })
      .from(users)
      .orderBy(users.username);
    return c.json(rows);
  }),
);
