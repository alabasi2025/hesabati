import 'dotenv/config';
import { db } from '../src/db/index.ts';
import { sidebarItems } from '../src/db/schema/index.ts';
import { or, like, eq } from 'drizzle-orm';

async function run() {
  await db.update(sidebarItems)
    .set({ screenKey: 'account_sub_natures', label: 'أنواع الحسابات الفرعية', icon: 'label', route: '/biz/{bizId}/account-sub-natures' })
    .where(or(eq(sidebarItems.screenKey, 'account_types'), like(sidebarItems.route, '%/account-types')));
  console.log('update-sidebar-account-sub-natures completed');
}

run().catch((err) => { console.error(err); process.exit(1); });
