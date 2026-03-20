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
import { safeHandler, normalizeBody, getBody, parseId, toErrorMessage } from '../../middleware/helpers.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getNextSequence, getNextItemInCategorySequence } from '../../middleware/sequencing.ts';
import { normalizeDbResult } from '../../utils/db-result.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';

const sidebarEnhRouter = new Hono();

// ===================== طھط­ط³ظٹظ†ط§طھ ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„طھط¨ظˆظٹط¨ ط§ظ„ط¬ط§ظ†ط¨ظٹ =====================

// 10. ظ†ط³ط® ط¥ط¹ط¯ط§ط¯ط§طھ ظ…ظ† ظ…ط³طھط®ط¯ظ… ظ„ط¢ط®ط±
sidebarEnhRouter.post('/businesses/:bizId/sidebar-config/copy', bizAuthMiddleware(), safeHandler('ظ†ط³ط® ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط³ط§ظٹط¯ط¨ط§ط±', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const { fromUserId, toUserId } = body;
  if (!fromUserId || !toUserId) return c.json({ error: 'fromUserId ظˆ toUserId ظ…ط·ظ„ظˆط¨ط§ظ†' }, 400);
  if (fromUserId === toUserId) return c.json({ error: 'ظ„ط§ ظٹظ…ظƒظ† ط§ظ„ظ†ط³ط® ظ„ظ†ظپط³ ط§ظ„ظ…ط³طھط®ط¯ظ…' }, 400);

  // ط¬ظ„ط¨ ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظ…طµط¯ط±
  const sourceConfigs = await db.select().from(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, fromUserId)));

  if (sourceConfigs.length === 0) return c.json({ error: 'ظ„ط§ طھظˆط¬ط¯ ط¥ط¹ط¯ط§ط¯ط§طھ ظ„ظ„ظ…ط³طھط®ط¯ظ… ط§ظ„ظ…طµط¯ط±' }, 404);

  // ط­ط°ظپ ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظ…ط³طھظ‡ط¯ظپ ط§ظ„ط­ط§ظ„ظٹط©
  await db.delete(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, toUserId)));

  // ظ†ط³ط® ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ
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

// 11. ط¥ط¹ط§ط¯ط© طھط¹ظٹظٹظ† ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط§ظپطھط±ط§ط¶ظٹط©
sidebarEnhRouter.post('/businesses/:bizId/sidebar-config/reset/:userId', bizAuthMiddleware(), safeHandler('ط¥ط¹ط§ط¯ط© طھط¹ظٹظٹظ† ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط³ط§ظٹط¯ط¨ط§ط±', async (c) => {
  const bizId = getBizId(c);
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ظ…ط³طھط®ط¯ظ… ط؛ظٹط± طµط§ظ„ط­' }, 400);

  // ط­ط°ظپ ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط­ط§ظ„ظٹط©
  await db.delete(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, userId)));

  // ط¬ظ„ط¨ ظƒظ„ ط§ظ„ط¹ظ†ط§طµط± ظˆط¥ظ†ط´ط§ط، ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظپطھط±ط§ط¶ظٹط© (ظƒظ„ ط´ظٹط، ط¸ط§ظ‡ط±)
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


