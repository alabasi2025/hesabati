/**
 * screens-perm.engine.ts — Phase 11
 * الصلاحيات + شاشات المستخدم + الإعدادات + الشريط الجانبي
 */
import { db } from '../db/index.ts';
import { eq, and, inArray } from 'drizzle-orm';
import {
  screenTemplates, screenWidgets, screenWidgetTemplates,
  screenWidgetAccounts, screenPermissions, customScreenConfig,
  sidebarSections, sidebarItems,
} from '../db/schema/index.ts';
import { type WidgetInput, type ScreenInput, type PermissionInput } from './screens.types.ts';

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

