/**
 * screens-widget.engine.ts — Phase 11
 * عمليات الودجات (إضافة + تحديث + حذف + نسخ بالجملة)
 */
import { db } from '../db/index.ts';
import { eq, and, inArray } from 'drizzle-orm';
import {
  screenTemplates, screenWidgets, screenWidgetTemplates,
  screenWidgetAccounts, screenPermissions, customScreenConfig,
  sidebarSections, sidebarItems,
} from '../db/schema/index.ts';
import { type WidgetInput, type ScreenInput, type PermissionInput } from './screens.types.ts';

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
