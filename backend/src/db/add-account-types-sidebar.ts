/**
 * إضافة عنصر "أنواع الحسابات" إلى التبويب الجانبي للأعمال الموجودة.
 * تشغيل مرة واحدة: npx tsx src/db/add-account-types-sidebar.ts
 */
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, gte } from 'drizzle-orm';
import postgres from 'postgres';
import * as schema from './schema/index.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

const ACCOUNT_TYPES_ITEM = {
  screenKey: 'account_types',
  label: 'أنواع الحسابات',
  icon: 'category',
  route: '/biz/{bizId}/account-types',
  sortOrder: 2,
  isActive: true,
};

async function main() {
  console.log('🔍 البحث عن أقسام "3. الحسابات والأرصدة"...');

  const sections = await db
    .select()
    .from(schema.sidebarSections)
    .where(eq(schema.sidebarSections.name, '3. الحسابات والأرصدة'));

  if (sections.length === 0) {
    console.log('⚠️ لم يُعثر على أي قسم بهذا الاسم. تأكد من تشغيل seed للقائمة الجانبية أولاً.');
    process.exit(0);
    return;
  }

  for (const sec of sections) {
    const existing = await db
      .select()
      .from(schema.sidebarItems)
      .where(
        and(
          eq(schema.sidebarItems.sectionId, sec.id),
          eq(schema.sidebarItems.screenKey, 'account_types')
        )
      );

    if (existing.length > 0) {
      console.log(`  ⏭️ العمل (section ${sec.id}) لديه "أنواع الحسابات" مسبقاً - تخطي`);
      continue;
    }

    // رفع ترتيب العناصر التي لها sortOrder >= 2
    const toShift = await db
      .select({ id: schema.sidebarItems.id, sortOrder: schema.sidebarItems.sortOrder })
      .from(schema.sidebarItems)
      .where(
        and(
          eq(schema.sidebarItems.sectionId, sec.id),
          gte(schema.sidebarItems.sortOrder, 2)
        )
      );
    for (const row of toShift) {
      await db
        .update(schema.sidebarItems)
        .set({ sortOrder: (row.sortOrder ?? 0) + 1 })
        .where(eq(schema.sidebarItems.id, row.id));
    }

    await db.insert(schema.sidebarItems).values({
      sectionId: sec.id,
      ...ACCOUNT_TYPES_ITEM,
    });

    console.log(`  ✅ تمت إضافة "أنواع الحسابات" للقسم (section ${sec.id}, business ${sec.businessId})`);
  }

  console.log('\n🎉 انتهى. حدّث الصفحة أو أعد تسجيل الدخول لرؤية العنصر في التبويب الجانبي.');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ خطأ:', err);
  process.exit(1);
});
