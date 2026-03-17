/**
 * screens.types.ts — Phase 11
 * الأنواع والواجهات لنظام الشاشات الديناميكية
 */
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
