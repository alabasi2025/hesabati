/**
 * screens-crud.engine.ts — Phase 11
 * عمليات CRUD للشاشات (إنشاء + تحديث + حذف + نسخ)
 */
import { db } from '../db/index.ts';
import { eq, and, inArray } from 'drizzle-orm';
import {
  screenTemplates, screenWidgets, screenWidgetTemplates,
  screenWidgetAccounts, screenPermissions, customScreenConfig,
  sidebarSections, sidebarItems,
} from '../db/schema/index.ts';
import { type WidgetInput, type ScreenInput, type PermissionInput } from './screens.types.ts';

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
