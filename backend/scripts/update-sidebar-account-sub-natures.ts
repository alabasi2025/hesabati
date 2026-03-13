import 'dotenv/config';
import { db } from '../src/db/index.ts';
import { businesses, sidebarItems, sidebarSections, userSidebarConfig, users } from '../src/db/schema/index.ts';
import { and, or, like, eq, desc } from 'drizzle-orm';

async function run() {
  const targetLabel = 'أنواع الحسابات الفرعية';
  const targetRoute = '/biz/{bizId}/account-sub-natures';

  // 1) تحويل العناصر القديمة إن وجدت
  await db.update(sidebarItems)
    .set({ screenKey: 'account_sub_natures', label: targetLabel, icon: 'label', route: targetRoute })
    .where(or(eq(sidebarItems.screenKey, 'account_types'), like(sidebarItems.route, '%/account-types')));

  // 2) إضافة عنصر "أنواع الحسابات الفرعية" إذا كان ناقصاً في أي عمل
  const allBusinesses = await db.select({ id: businesses.id }).from(businesses);
  for (const biz of allBusinesses) {
    const [accountsSection] = await db
      .select({ id: sidebarSections.id })
      .from(sidebarSections)
      .where(and(eq(sidebarSections.businessId, biz.id), like(sidebarSections.name, '3.%')))
      .limit(1);

    if (!accountsSection) continue;

    const [existingItem] = await db
      .select({ id: sidebarItems.id })
      .from(sidebarItems)
      .where(
        and(
          eq(sidebarItems.sectionId, accountsSection.id),
          eq(sidebarItems.screenKey, 'account_sub_natures'),
        ),
      )
      .limit(1);

    const [maxSort] = await db
      .select({ sortOrder: sidebarItems.sortOrder })
      .from(sidebarItems)
      .where(eq(sidebarItems.sectionId, accountsSection.id))
      .orderBy(desc(sidebarItems.sortOrder));

    const sortOrder = (maxSort?.sortOrder ?? 1) + 1;

    const itemId = existingItem?.id ?? (await db.insert(sidebarItems).values({
      sectionId: accountsSection.id,
      screenKey: 'account_sub_natures',
      label: targetLabel,
      icon: 'label',
      route: targetRoute,
      sortOrder,
      isActive: true,
    }).returning())[0].id;

    // 3) ضمان وجود إعدادات هذا العنصر لكل مستخدم في نفس العمل
    const bizUsers = await db.select({ id: users.id, role: users.role }).from(users);
    for (const user of bizUsers) {
      const [cfg] = await db
        .select({ id: userSidebarConfig.id })
        .from(userSidebarConfig)
        .where(
          and(
            eq(userSidebarConfig.businessId, biz.id),
            eq(userSidebarConfig.userId, user.id),
            eq(userSidebarConfig.sidebarItemId, itemId),
          ),
        )
        .limit(1);

      if (!cfg) {
        await db.insert(userSidebarConfig).values({
          businessId: biz.id,
          userId: user.id,
          sidebarItemId: itemId,
          isVisible: true,
          customSortOrder: sortOrder,
        });
      } else {
        await db.update(userSidebarConfig)
          .set({ isVisible: true })
          .where(eq(userSidebarConfig.id, cfg.id));
      }
    }
  }

  console.log('update-sidebar-account-sub-natures completed');
}

run().catch((err) => { console.error(err); process.exit(1); });
