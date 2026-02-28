import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function seedSidebar() {
  console.log('🌱 إضافة أقسام وعناصر القائمة الجانبية...');

  // جلب الأعمال الموجودة
  const businesses = await db.query.businesses.findMany({ orderBy: (b, { asc }) => [asc(b.id)] });
  console.log(`وجدت ${businesses.length} أعمال:`, businesses.map(b => `${b.id}: ${b.name}`));

  for (const biz of businesses) {
    // التحقق من عدم وجود أقسام مسبقاً لهذا العمل (غير الأقسام التجريبية)
    const existingSections = await db.query.sidebarSections.findMany({
      where: (s, { eq }) => eq(s.businessId, biz.id)
    });
    
    // حذف الأقسام القديمة التجريبية إن وجدت وإعادة البناء
    // نتحقق من وجود الأقسام الأساسية
    const hasMainSection = existingSections.some(s => s.name === 'الرئيسية');
    if (hasMainSection) {
      console.log(`⏭️ العمل ${biz.name} (${biz.id}) لديه أقسام مسبقاً - تخطي`);
      continue;
    }

    const bizType = biz.id === 1 ? 'stations' : biz.id === 2 ? 'single_station' : 'personal';
    console.log(`\n📦 إضافة أقسام للعمل: ${biz.name} (${biz.id}) - النوع: ${bizType}`);

    // --- الأقسام ---
    const [secMain] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: 'الرئيسية', icon: 'home', sortOrder: 1 }).returning();
    const [secSetup] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: 'الإعداد', icon: 'settings', sortOrder: 2 }).returning();
    const [secFinance] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: 'العمليات المالية', icon: 'account_balance_wallet', sortOrder: 3 }).returning();
    const [secPeople] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: 'الأشخاص', icon: 'group', sortOrder: 4 }).returning();
    const [secWarehouse] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: 'المخزن والموردين', icon: 'warehouse', sortOrder: 5 }).returning();
    const [secReports] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: 'التصفيات والتقارير', icon: 'assessment', sortOrder: 6 }).returning();

    console.log(`  ✅ أقسام: ${secMain.id}, ${secSetup.id}, ${secFinance.id}, ${secPeople.id}, ${secWarehouse.id}, ${secReports.id}`);

    // --- عناصر القسم الرئيسي ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: secMain.id, screenKey: 'dashboard', label: 'لوحة التحكم', icon: 'dashboard', route: '/biz/{bizId}', sortOrder: 1 },
      { sectionId: secMain.id, screenKey: 'back_to_businesses', label: 'العودة للأعمال', icon: 'arrow_forward', route: '/businesses', sortOrder: 2 },
    ]);

    // --- عناصر قسم الإعداد ---
    const setupItems: any[] = [
      { sectionId: secSetup.id, screenKey: 'accounts', label: 'الحسابات', icon: 'account_balance_wallet', route: '/biz/{bizId}/accounts', sortOrder: 1 },
      { sectionId: secSetup.id, screenKey: 'operation_types', label: 'أنواع العمليات', icon: 'category', route: '/biz/{bizId}/operation-types', sortOrder: 2 },
      { sectionId: secSetup.id, screenKey: 'sidebar_settings', label: 'إعدادات التبويب', icon: 'tune', route: '/biz/{bizId}/sidebar-settings', sortOrder: 3 },
      { sectionId: secSetup.id, screenKey: 'custom_screens', label: 'الشاشات المخصصة', icon: 'space_dashboard', route: '/biz/{bizId}/custom-screens', sortOrder: 4 },
    ];
    if (bizType === 'stations') {
      setupItems.push(
        { sectionId: secSetup.id, screenKey: 'funds', label: 'إدارة الصناديق', icon: 'savings', route: '/biz/{bizId}/funds', sortOrder: 5 },
        { sectionId: secSetup.id, screenKey: 'banks', label: 'إدارة البنوك', icon: 'account_balance', route: '/biz/{bizId}/banks', sortOrder: 6 },
        { sectionId: secSetup.id, screenKey: 'exchangers', label: 'إدارة الصرافين', icon: 'currency_exchange', route: '/biz/{bizId}/exchangers', sortOrder: 7 },
        { sectionId: secSetup.id, screenKey: 'wallets', label: 'إدارة المحافظ', icon: 'wallet', route: '/biz/{bizId}/wallets', sortOrder: 8 },
      );
    }
    await db.insert(schema.sidebarItems).values(setupItems);

    // --- عناصر قسم العمليات المالية ---
    const financeItems: any[] = [
      { sectionId: secFinance.id, screenKey: 'vouchers', label: 'سندات الصرف والقبض', icon: 'receipt_long', route: '/biz/{bizId}/vouchers', sortOrder: 1 },
      { sectionId: secFinance.id, screenKey: 'journal', label: 'القيود المحاسبية', icon: 'menu_book', route: '/biz/{bizId}/journal', sortOrder: 2 },
    ];
    if (bizType === 'stations') {
      financeItems.push(
        { sectionId: secFinance.id, screenKey: 'stations', label: 'المحطات', icon: 'bolt', route: '/biz/{bizId}/stations', sortOrder: 3 },
        { sectionId: secFinance.id, screenKey: 'collections', label: 'التحصيل والتوريد', icon: 'receipt_long', route: '/biz/{bizId}/collections', sortOrder: 4 },
        { sectionId: secFinance.id, screenKey: 'billing_systems', label: 'أنظمة الفوترة', icon: 'receipt', route: '/biz/{bizId}/billing-systems', sortOrder: 5 },
      );
    } else if (bizType === 'single_station') {
      financeItems.push(
        { sectionId: secFinance.id, screenKey: 'funds', label: 'الصناديق', icon: 'savings', route: '/biz/{bizId}/funds', sortOrder: 3 },
      );
    }
    await db.insert(schema.sidebarItems).values(financeItems);

    // --- عناصر قسم الأشخاص ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: secPeople.id, screenKey: 'employees', label: 'الموظفين والرواتب', icon: 'groups', route: '/biz/{bizId}/employees', sortOrder: 1 },
      { sectionId: secPeople.id, screenKey: 'partners', label: 'الشركاء', icon: 'handshake', route: '/biz/{bizId}/partners', sortOrder: 2 },
    ]);

    // --- عناصر قسم المخزن والموردين ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: secWarehouse.id, screenKey: 'warehouse', label: 'المخزن', icon: 'warehouse', route: '/biz/{bizId}/warehouse', sortOrder: 1 },
      { sectionId: secWarehouse.id, screenKey: 'suppliers', label: 'الموردين', icon: 'local_shipping', route: '/biz/{bizId}/suppliers', sortOrder: 2 },
    ]);

    // --- عناصر قسم التصفيات والتقارير ---
    const reportItems: any[] = [
      { sectionId: secReports.id, screenKey: 'settlements', label: 'التصفيات', icon: 'balance', route: '/biz/{bizId}/settlements', sortOrder: 1 },
      { sectionId: secReports.id, screenKey: 'reports', label: 'التقارير', icon: 'assessment', route: '/biz/{bizId}/reports', sortOrder: 2 },
    ];
    if (bizType === 'stations') {
      reportItems.push(
        { sectionId: secReports.id, screenKey: 'pending_accounts', label: 'حسابات معلقة', icon: 'warning', route: '/biz/{bizId}/pending', badge: 3, badgeColor: 'red', sortOrder: 3 },
      );
    }
    await db.insert(schema.sidebarItems).values(reportItems);

    console.log(`  ✅ تم إضافة عناصر القائمة الجانبية للعمل: ${biz.name}`);
  }

  // إحصائيات نهائية
  const totalSections = await db.query.sidebarSections.findMany();
  const totalItems = await db.query.sidebarItems.findMany();
  console.log(`\n🎉 الإجمالي: ${totalSections.length} قسم، ${totalItems.length} عنصر`);
  process.exit(0);
}

seedSidebar().catch((err) => {
  console.error('❌ خطأ:', err);
  process.exit(1);
});
