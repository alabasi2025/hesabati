import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc, sql, and, inArray, asc, count } from 'drizzle-orm';
import {
  operationTypes, operationTypeAccounts, accounts, accountBalances,
  sidebarSections, sidebarItems, userSidebarConfig,
  screenTemplates, screenWidgets, screenWidgetTemplates, screenWidgetAccounts, screenPermissions,
  users, vouchers, currencies, operationCategories,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, parseId, toErrorMessage } from '../../middleware/helpers.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getNextSequence, getNextItemInCategorySequence } from '../../middleware/sequencing.ts';
import { normalizeDbResult } from '../../utils/db-result.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';

const sidebarEnhRouter = new Hono();

// ===================== تحسينات إعدادات التبويب الجانبي =====================

// 10. نسخ إعدادات من مستخدم لآخر
sidebarEnhRouter.post('/businesses/:bizId/sidebar-config/copy', bizAuthMiddleware(), safeHandler('نسخ إعدادات السايدبار', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const { fromUserId, toUserId } = body;
  if (!fromUserId || !toUserId) return c.json({ error: 'fromUserId و toUserId مطلوبان' }, 400);
  if (fromUserId === toUserId) return c.json({ error: 'لا يمكن النسخ لنفس المستخدم' }, 400);

  // جلب إعدادات المصدر
  const sourceConfigs = await db.select().from(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, fromUserId)));

  if (sourceConfigs.length === 0) return c.json({ error: 'لا توجد إعدادات للمستخدم المصدر' }, 404);

  // حذف إعدادات المستهدف الحالية
  await db.delete(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, toUserId)));

  // نسخ الإعدادات
  for (const cfg of sourceConfigs) {
    await db.insert(userSidebarConfig).values({
      userId: toUserId,
      businessId: bizId,
      sidebarItemId: cfg.sidebarItemId,
      isVisible: cfg.isVisible,
      customSortOrder: cfg.customSortOrder,
      customSectionName: cfg.customSectionName,
      permission: cfg.permission,
    });
  }

  return c.json({ success: true, copiedCount: sourceConfigs.length });
}));

// 11. إعادة تعيين الإعدادات الافتراضية
sidebarEnhRouter.post('/businesses/:bizId/sidebar-config/reset/:userId', bizAuthMiddleware(), safeHandler('إعادة تعيين إعدادات السايدبار', async (c) => {
  const bizId = getBizId(c);
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'معرّف المستخدم غير صالح' }, 400);

  // حذف الإعدادات الحالية
  await db.delete(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, userId)));

  // جلب كل العناصر وإنشاء إعدادات افتراضية (كل شيء ظاهر)
  const allItems = await db.select({ id: sidebarItems.id, sortOrder: sidebarItems.sortOrder })
    .from(sidebarItems)
    .leftJoin(sidebarSections, eq(sidebarItems.sectionId, sidebarSections.id))
    .where(eq(sidebarSections.businessId, bizId));

  for (const item of allItems) {
    await db.insert(userSidebarConfig).values({
      userId, businessId: bizId, sidebarItemId: item.id,
      isVisible: true, customSortOrder: item.sortOrder || 0,
    });
  }

  return c.json({ success: true, itemCount: allItems.length });
}));


export default sidebarEnhRouter;
