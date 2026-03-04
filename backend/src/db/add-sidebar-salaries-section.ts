/**
 * إضافة قسم "الرواتب والميزانية" (الوحدة 13) للأعمال التي لديها أقسام جانبية قديمة ولا تحتوي هذا القسم.
 * تشغيل: npx tsx src/db/add-sidebar-salaries-section.ts
 */
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import * as schema from './schema/index.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

const SECTION_NAME = 'الرواتب والميزانية';

async function main() {
  const businesses = await db.select().from(schema.businesses).orderBy(schema.businesses.id);
  let added = 0;

  for (const biz of businesses) {
    const sections = await db.select().from(schema.sidebarSections).where(eq(schema.sidebarSections.businessId, biz.id));
    const hasSalariesSection = sections.some(s => s.name === SECTION_NAME);
    if (hasSalariesSection) {
      console.log(`⏭️ العمل ${biz.name} (${biz.id}) لديه قسم "${SECTION_NAME}" مسبقاً - تخطي`);
      continue;
    }
    if (sections.length === 0) {
      console.log(`⏭️ العمل ${biz.name} (${biz.id}) لا يملك أقساماً - تشغيل seed_sidebar أو seed أولاً`);
      continue;
    }

    const maxSort = Math.max(0, ...sections.map(s => s.sortOrder ?? 0));
    const [sec] = await db.insert(schema.sidebarSections).values({
      businessId: biz.id,
      name: SECTION_NAME,
      icon: 'payments',
      sortOrder: maxSort + 1,
    }).returning();

    if (!sec) continue;

    await db.insert(schema.sidebarItems).values([
      { sectionId: sec.id, screenKey: 'expense_categories', label: 'تصنيفات المصروفات', icon: 'category', route: '/biz/{bizId}/expense-categories', sortOrder: 1 },
      { sectionId: sec.id, screenKey: 'expense_budget', label: 'ميزانية المصروفات', icon: 'account_balance_wallet', route: '/biz/{bizId}/expense-budget', sortOrder: 2 },
      { sectionId: sec.id, screenKey: 'salaries', label: 'الرواتب', icon: 'payments', route: '/biz/{bizId}/salaries', sortOrder: 3 },
    ]);

    console.log(`✅ تم إضافة قسم "${SECTION_NAME}" للعمل: ${biz.name} (${biz.id})`);
    added++;
  }

  console.log(`\n🎉 انتهى. تمت إضافة القسم إلى ${added} عمل.`);
  if (added > 0) {
    console.log('   عند فتح التبويب الجانبي سيتم ربط العناصر الجديدة تلقائياً بإعدادات المستخدم.');
  }
  await client.end();
  process.exit(0);
}

try {
  await main();
} catch (err) {
  console.error('❌ خطأ:', err);
  await client.end();
  process.exit(1);
}
