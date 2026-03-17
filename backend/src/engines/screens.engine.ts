/**
 * =====================================================================
 * محرك الشاشات المخصصة (Screens Engine)
 * =====================================================================
 * Phase 3 — استخراج من api.rest.ts (سطور 1072-2030 + 2532-2600)
 * 
 * يوحّد منطق الشاشات المخصصة والويدجتس:
 *   - getScreens()              → جلب شاشات العمل
 *   - createScreen()            → إنشاء شاشة مع ويدجتس
 *   - updateScreen()            → تعديل شاشة
 *   - deleteScreen()            → حذف شاشة وكل بياناتها
 *   - cloneScreen()             → نسخ شاشة كاملة
 *   - getScreenWithWidgets()    → شاشة مع ويدجتساتها
 *   - getWidgets()              → جلب ويدجتس شاشة
 *   - addWidget()               → إضافة ويدجت
 *   - updateWidget()            → تعديل ويدجت
 *   - deleteWidget()            → حذف ويدجت
 *   - batchUpdateWidgets()      → تحديث دفعي للويدجتس
 *   - getScreenPermissions()    → جلب صلاحيات شاشة
 *   - setScreenPermissions()    → تعيين صلاحيات
 *   - batchSetPermissions()     → تعيين دفعي للصلاحيات
 *   - getUserScreens()          → الشاشات المتاحة لمستخدم
 *   - addScreenToSidebar()      → إضافة شاشة للسايدبار
 *   - getScreenConfig()         → جلب إعداد الشاشة (collection-style)
 *   - saveScreenConfig()        → حفظ إعداد الشاشة
 */

import { db } from '../db/index.ts';
import { eq, and, inArray } from 'drizzle-orm';
import {
  screenTemplates,
  screenWidgets,
  screenWidgetTemplates,
  screenWidgetAccounts,
  screenWidgetWarehouses,
  screenPermissions,
  customScreenConfig,
  sidebarItems,
  sidebarSections,
} from '../db/schema/index.ts';

// ── واجهات ─────────────────────────────────────────────────────────────────

export interface WidgetInput {
  widgetType?: string;
  type?: string;
  title?: string;
  config?: Record<string, unknown>;
  positionX?: number;
  positionY?: number;
  width?: number;
  height?: number;
  sortOrder?: number;
}

export interface ScreenInput {
  name: string;
  description?: string | null;
  layoutType?: string | null;
  layoutConfig?: Record<string, unknown> | null;
  isActive?: boolean;
  isPublic?: boolean;
  widgets?: WidgetInput[];
  addToSidebar?: boolean;
  sidebarSectionId?: number | null;
  sidebarSortOrder?: number | null;
}

export interface PermissionInput {
  roleId?: number | null;
  userId?: number | null;
  canView?: boolean;
  canEdit?: boolean;
}

// ── دوال الشاشات ──────────────────────────────────────────────────────────

/**
 * جلب جميع شاشات العمل
 */
export async function getScreens(bizId: number) {
  return db
    .select()
    .from(screenTemplates)
    .where(eq(screenTemplates.businessId, bizId))
    .orderBy(screenTemplates.name);
}

/**
 * جلب شاشة مع ويدجتساتها
 */
export async function getScreenWithWidgets(bizId: number, screenId: number) {
  const [screen] = await db
    .select()
    .from(screenTemplates)
    .where(and(eq(screenTemplates.id, screenId), eq(screenTemplates.businessId, bizId)));

  if (!screen) return null;

  const widgets = await db
    .select()
    .from(screenWidgets)
    .where(eq(screenWidgets.screenId, screenId))
    .orderBy(screenWidgets.sortOrder);

  return { ...screen, widgets };
}

/**
 * جلب جميع الشاشات مع ويدجتساتها (للواجهة)
 */
export async function getScreensWithWidgets(bizId: number) {
  const screensArr = await db
    .select()
    .from(screenTemplates)
    .where(eq(screenTemplates.businessId, bizId))
    .orderBy(screenTemplates.name);

  const screenIds = screensArr.map((s) => s.id);
  let widgetMap: Record<number, typeof screenWidgets.$inferSelect[]> = {};

  if (screenIds.length > 0) {
    const allWidgets = await db
      .select()
      .from(screenWidgets)
      .where(inArray(screenWidgets.screenId, screenIds))
      .orderBy(screenWidgets.sortOrder);

    for (const w of allWidgets) {
      if (!widgetMap[w.screenId]) widgetMap[w.screenId] = [];
      widgetMap[w.screenId].push(w);
    }
  }

  return screensArr.map((s) => ({ ...s, widgets: widgetMap[s.id] || [] }));
}

/**
 * إنشاء شاشة جديدة مع ويدجتس اختيارية وإضافة للسايدبار
 */
export async function createScreen(
  bizId: number,
  userId: number,
  input: ScreenInput,
) {
  const { widgets, addToSidebar, sidebarSectionId, sidebarSortOrder, ...screenData } = input;

  const [created] = await db
    .insert(screenTemplates)
    .values({
      ...screenData,
      businessId: bizId,
      createdBy: userId,
    })
    .returning();

  // إنشاء الويدجتس
  const createdWidgets = [];
  if (widgets && Array.isArray(widgets)) {
    for (let i = 0; i < widgets.length; i++) {
      const w = widgets[i];
      const [widget] = await db
        .insert(screenWidgets)
        .values({
          screenId: created.id,
          widgetType: w.widgetType || w.type || 'custom',
          title: w.title || `عنصر ${i + 1}`,
          config: w.config || {},
          positionX: w.positionX || 0,
          positionY: w.positionY || i,
          width: w.width || 12,
          height: w.height || 4,
          sortOrder: w.sortOrder ?? i,
        })
        .returning();
      createdWidgets.push(widget);
    }
  }

  // إضافة للسايدبار إن طُلب
  if (addToSidebar) {
    await _addScreenToSidebarInternal(bizId, created.id, {
      sidebarSectionId: sidebarSectionId ?? null,
      sidebarSortOrder: sidebarSortOrder ?? null,
    });
  }

  return { ...created, widgets: createdWidgets };
}

/**
 * تعديل شاشة
 */
export async function updateScreen(
  id: number,
  bizId: number,
  data: Partial<ScreenInput>,
) {
  const { widgets, addToSidebar, sidebarSectionId, sidebarSortOrder, ...updateData } = data;

  const [rec] = await db
    .select()
    .from(screenTemplates)
    .where(and(eq(screenTemplates.id, id), eq(screenTemplates.businessId, bizId)));

  if (!rec) return null;

  const [updated] = await db
    .update(screenTemplates)
    .set({ ...updateData, updatedAt: new Date() })
    .where(and(eq(screenTemplates.id, id), eq(screenTemplates.businessId, bizId)))
    .returning();

  return updated;
}

/**
 * حذف شاشة وجميع بياناتها (cascade)
 */
export async function deleteScreen(id: number, bizId: number): Promise<boolean> {
  const [rec] = await db
    .select()
    .from(screenTemplates)
    .where(and(eq(screenTemplates.id, id), eq(screenTemplates.businessId, bizId)));

  if (!rec) return false;

  // حذف الويدجتس وعلاقاتها
  const widgets = await db
    .select()
    .from(screenWidgets)
    .where(eq(screenWidgets.screenId, id));

  for (const w of widgets) {
    await db.delete(screenWidgetTemplates).where(eq(screenWidgetTemplates.widgetId, w.id));
    await db.delete(screenWidgetAccounts).where(eq(screenWidgetAccounts.widgetId, w.id));
  }

  await db.delete(screenWidgets).where(eq(screenWidgets.screenId, id));
  await db.delete(screenPermissions).where(eq(screenPermissions.screenId, id));
  await db.delete(customScreenConfig).where(eq(customScreenConfig.screenId, id));

  // حذف من السايدبار
  const sidebarRoute = `custom-screens?screen=${id}`;
  const sidebarItems_ = await db
    .select()
    .from(sidebarItems)
    .where(and(eq(sidebarItems.businessId, bizId)));
  for (const item of sidebarItems_) {
    if (item.route && item.route.includes(`screen=${id}`)) {
      await db.delete(sidebarItems).where(eq(sidebarItems.id, item.id));
    }
  }

  await db.delete(screenTemplates).where(and(eq(screenTemplates.id, id), eq(screenTemplates.businessId, bizId)));
  return true;
}

/**
 * نسخ شاشة كاملة (مع ويدجتساتها)
 */
export async function cloneScreen(
  screenId: number,
  bizId: number,
  userId: number,
  newName?: string,
) {
  const screen = await getScreenWithWidgets(bizId, screenId);
  if (!screen) throw new Error('الشاشة غير موجودة');

  const [cloned] = await db
    .insert(screenTemplates)
    .values({
      businessId: bizId,
      name: newName || `نسخة من ${screen.name}`,
      description: screen.description,
      layoutType: screen.layoutType,
      layoutConfig: screen.layoutConfig,
      isActive: screen.isActive,
      isPublic: false,
      createdBy: userId,
    })
    .returning();

  // نسخ الويدجتس
  const clonedWidgets = [];
  for (const w of (screen.widgets || [])) {
    const [newWidget] = await db
      .insert(screenWidgets)
      .values({
        screenId: cloned.id,
        widgetType: w.widgetType,
        title: w.title,
        config: w.config,
        positionX: w.positionX,
        positionY: w.positionY,
        width: w.width,
        height: w.height,
        sortOrder: w.sortOrder,
      })
      .returning();

    // نسخ قوالب الويدجت
    const templates = await db
      .select()
      .from(screenWidgetTemplates)
      .where(eq(screenWidgetTemplates.widgetId, w.id));

    for (const t of templates) {
      await db.insert(screenWidgetTemplates).values({
        widgetId: newWidget.id,
        templateTypeId: t.templateTypeId,
      });
    }

    clonedWidgets.push(newWidget);
  }

  return { ...cloned, widgets: clonedWidgets };
}

// ── دوال الويدجتس ─────────────────────────────────────────────────────────

/**
 * جلب ويدجتس شاشة
 */
export async function getWidgets(screenId: number) {
  return db
    .select()
    .from(screenWidgets)
    .where(eq(screenWidgets.screenId, screenId))
    .orderBy(screenWidgets.sortOrder);
}

/**
 * إضافة ويدجت لشاشة
 */
export async function addWidget(screenId: number, data: WidgetInput) {
  const [screen] = await db
    .select()
    .from(screenTemplates)
    .where(eq(screenTemplates.id, screenId));

  if (!screen) throw new Error('الشاشة غير موجودة');

  const [created] = await db
    .insert(screenWidgets)
    .values({ ...data, screenId })
    .returning();

  return created;
}

/**
 * تعديل ويدجت
 */
export async function updateWidget(id: number, data: Partial<WidgetInput>) {
  const [updated] = await db
    .update(screenWidgets)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(screenWidgets.id, id))
    .returning();

  return updated ?? null;
}

/**
 * حذف ويدجت
 */
export async function deleteWidget(id: number): Promise<boolean> {
  await db.delete(screenWidgetTemplates).where(eq(screenWidgetTemplates.widgetId, id));
  await db.delete(screenWidgetAccounts).where(eq(screenWidgetAccounts.widgetId, id));
  const result = await db
    .delete(screenWidgets)
    .where(eq(screenWidgets.id, id))
    .returning({ id: screenWidgets.id });
  return result.length > 0;
}

/**
 * تحديث دفعي للويدجتس (positions/sizes)
 */
export async function batchUpdateWidgets(
  widgets: { id: number; positionX?: number; positionY?: number; width?: number; height?: number; sortOrder?: number; config?: Record<string, unknown> }[],
) {
  const results = [];
  for (const w of widgets) {
    const { id, ...data } = w;
    const [updated] = await db
      .update(screenWidgets)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(screenWidgets.id, id))
      .returning();
    if (updated) results.push(updated);
  }
  return results;
}

/**
 * نسخ ويدجت لشاشة أخرى
 */
export async function copyWidgetToScreen(widgetId: number, targetScreenId: number) {
  const [w] = await db.select().from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!w) throw new Error('الويدجت غير موجود');

  const [copied] = await db
    .insert(screenWidgets)
    .values({
      screenId: targetScreenId,
      widgetType: w.widgetType,
      title: `نسخة - ${w.title}`,
      config: w.config,
      positionX: w.positionX,
      positionY: w.positionY,
      width: w.width,
      height: w.height,
      sortOrder: w.sortOrder,
    })
    .returning();

  return copied;
}

// ── دوال الصلاحيات ────────────────────────────────────────────────────────

/**
 * جلب صلاحيات شاشة
 */
export async function getScreenPermissions(screenId: number) {
  return db
    .select()
    .from(screenPermissions)
    .where(eq(screenPermissions.screenId, screenId));
}

/**
 * تعيين صلاحية واحدة
 */
export async function setScreenPermission(screenId: number, input: PermissionInput) {
  const [perm] = await db
    .insert(screenPermissions)
    .values({
      screenId,
      roleId: input.roleId ?? null,
      userId: input.userId ?? null,
      canView: input.canView ?? true,
      canEdit: input.canEdit ?? false,
    })
    .returning();
  return perm;
}

/**
 * تعيين دفعي للصلاحيات (يستبدل الموجود)
 */
export async function batchSetPermissions(
  screenId: number,
  permissions: PermissionInput[],
) {
  await db.delete(screenPermissions).where(eq(screenPermissions.screenId, screenId));

  if (permissions.length === 0) return [];

  return db
    .insert(screenPermissions)
    .values(
      permissions.map((p) => ({
        screenId,
        roleId: p.roleId ?? null,
        userId: p.userId ?? null,
        canView: p.canView ?? true,
        canEdit: p.canEdit ?? false,
      })),
    )
    .returning();
}

/**
 * جلب الشاشات المتاحة لمستخدم معين
 */
export async function getUserScreens(bizId: number, userId: number) {
  const allScreens = await db
    .select()
    .from(screenTemplates)
    .where(eq(screenTemplates.businessId, bizId));

  const perms = await db
    .select()
    .from(screenPermissions)
    .where(eq(screenPermissions.userId, userId));

  const screensWithPerms = new Set(perms.map((p) => p.screenId));

  return allScreens.filter((s) => {
    if (!screensWithPerms.has(s.id)) return true; // شاشة بدون قيود = عامة
    const perm = perms.find((p) => p.screenId === s.id);
    return perm?.canView ?? true;
  });
}

// ── إعداد الشاشة (collection style) ──────────────────────────────────────

/**
 * جلب إعداد الشاشة المخصصة (collection-style-config)
 */
export async function getScreenConfig(bizId: number, screenId: number) {
  const [screen] = await db
    .select()
    .from(screenTemplates)
    .where(and(eq(screenTemplates.id, screenId), eq(screenTemplates.businessId, bizId)));

  if (!screen) return null;

  // إذا كان layoutConfig يحتوي tabs → استخدمه مباشرة
  const layoutConfig = screen.layoutConfig as Record<string, unknown> | null;
  if (layoutConfig?.tabs) {
    return { tabs: layoutConfig.tabs, source: 'layoutConfig' };
  }

  // التوافق مع النظام القديم
  const [oldConfig] = await db
    .select()
    .from(customScreenConfig)
    .where(eq(customScreenConfig.screenId, screenId));

  if (oldConfig) {
    const tabs = oldConfig.config ? [{ id: 'main', label: 'رئيسي', config: oldConfig.config }] : [];
    return { tabs, source: 'legacy' };
  }

  return { tabs: [], source: 'none' };
}

/**
 * حفظ إعداد الشاشة المخصصة
 */
export async function saveScreenConfig(
  bizId: number,
  screenId: number,
  config: { tabs?: unknown[]; [key: string]: unknown },
) {
  const [screen] = await db
    .select()
    .from(screenTemplates)
    .where(and(eq(screenTemplates.id, screenId), eq(screenTemplates.businessId, bizId)));

  if (!screen) return null;

  const existingLayout = (screen.layoutConfig || {}) as Record<string, unknown>;
  const newLayout = { ...existingLayout, ...config };

  const [updated] = await db
    .update(screenTemplates)
    .set({ layoutConfig: newLayout, updatedAt: new Date() })
    .where(eq(screenTemplates.id, screenId))
    .returning();

  return updated;
}

// ── السايدبار ──────────────────────────────────────────────────────────────

/**
 * إضافة شاشة للسايدبار
 */
export async function addScreenToSidebar(
  bizId: number,
  screenId: number,
  options?: {
    sidebarSectionId?: number | null;
    sidebarSortOrder?: number | null;
    route?: string | null;
    icon?: string | null;
    label?: string | null;
  },
) {
  const [screen] = await db
    .select()
    .from(screenTemplates)
    .where(and(eq(screenTemplates.id, screenId), eq(screenTemplates.businessId, bizId)));

  if (!screen) throw new Error('الشاشة غير موجودة');

  return _addScreenToSidebarInternal(bizId, screenId, {
    sidebarSectionId: options?.sidebarSectionId ?? null,
    sidebarSortOrder: options?.sidebarSortOrder ?? null,
    route: options?.route ?? `/biz/${bizId}/custom-screens?screen=${screenId}`,
    icon: options?.icon ?? 'dashboard_customize',
    label: options?.label ?? screen.name,
  });
}

async function _addScreenToSidebarInternal(
  bizId: number,
  screenId: number,
  options: {
    sidebarSectionId?: number | null;
    sidebarSortOrder?: number | null;
    route?: string | null;
    icon?: string | null;
    label?: string | null;
  },
) {
  // جلب أول section إن لم تُحدد
  let sectionId = options.sidebarSectionId;
  if (!sectionId) {
    const [firstSection] = await db
      .select()
      .from(sidebarSections)
      .where(eq(sidebarSections.businessId, bizId))
      .orderBy(sidebarSections.sortOrder)
      .limit(1);
    sectionId = firstSection?.id ?? null;
  }

  if (!sectionId) return null;

  const [screen] = await db
    .select({ name: screenTemplates.name })
    .from(screenTemplates)
    .where(eq(screenTemplates.id, screenId));

  const [created] = await db
    .insert(sidebarItems)
    .values({
      businessId: bizId,
      sectionId,
      label: options.label ?? screen?.name ?? 'شاشة مخصصة',
      icon: options.icon ?? 'dashboard_customize',
      route: options.route ?? `/biz/${bizId}/custom-screens?screen=${screenId}`,
      sortOrder: options.sidebarSortOrder ?? 99,
      isActive: true,
      screenKey: `custom_screen_${screenId}`,
    })
    .returning();

  return created;
}
