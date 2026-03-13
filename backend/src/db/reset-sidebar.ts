import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:774424555@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function resetSidebar() {
  console.log('🔄 بدء إعادة تهيئة التبويب الجانبي...');

  // حذف البيانات القديمة (بترتيب معكوس لتجنب مشاكل المفاتيح الأجنبية)
  console.log('🗑️ حذف البيانات القديمة...');
  await db.delete(schema.userSidebarConfig);
  await db.delete(schema.sidebarItems);
  await db.delete(schema.sidebarSections);
  console.log('✅ تم حذف البيانات القديمة');

  // الحصول على جميع الأعمال
  const businesses = await db.select().from(schema.businesses);
  console.log(`📋 وجدت ${businesses.length} أعمال`);

  // إنشاء الأقسام والعناصر لكل عمل
  for (const biz of businesses) {
    console.log(`\n📌 إنشاء أقسام لـ: ${biz.name}`);
    const bizType = biz.id === 1 ? 'stations' : biz.id === 2 ? 'single_station' : 'personal';

    // --- الأقسام (14 قسم) ---
    const [sec1] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '1. المستخدمون والصلاحيات', icon: 'admin_panel_settings', sortOrder: 1 }).returning();
    const [sec2] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '2. الرئيسية والأعمال', icon: 'home', sortOrder: 2 }).returning();
    const [sec3] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '3. الحسابات والأرصدة', icon: 'account_balance_wallet', sortOrder: 3 }).returning();
    const [sec4] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '4. العمليات المالية', icon: 'receipt_long', sortOrder: 4 }).returning();
    const [sec5] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '5. القوالب والترقيم', icon: 'category', sortOrder: 5 }).returning();
    const [sec6] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '6. المخزون والمخازن', icon: 'warehouse', sortOrder: 6 }).returning();
    const [sec7] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '7. الموردين', icon: 'local_shipping', sortOrder: 7 }).returning();
    const [sec8] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '8. المطابقات والعهد', icon: 'fact_check', sortOrder: 8 }).returning();
    const [sec9] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '9. التقارير', icon: 'assessment', sortOrder: 9 }).returning();
    const [sec10] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '10. بناء الواجهات', icon: 'space_dashboard', sortOrder: 10 }).returning();
    const [sec11] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '11. العملات وأسعار الصرف', icon: 'currency_exchange', sortOrder: 11 }).returning();
    const [sec12] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '12. المعلقات والتصفيات', icon: 'balance', sortOrder: 12 }).returning();
    const [sec13] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '13. الموظفين والرواتب', icon: 'groups', sortOrder: 13 }).returning();
    const [sec14] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '14. الميزانية والمصروفات', icon: 'account_balance_wallet', sortOrder: 14 }).returning();

    // --- الوحدة 1: المستخدمون والصلاحيات ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec1.id, screenKey: 'roles', label: 'الصلاحيات والأدوار', icon: 'admin_panel_settings', route: '/biz/{bizId}/roles', sortOrder: 1 },
      { sectionId: sec1.id, screenKey: 'sidebar_settings', label: 'إعدادات التبويب', icon: 'tune', route: '/biz/{bizId}/sidebar-settings', sortOrder: 2 },
    ]);

    // --- الوحدة 2: الرئيسية والأعمال ---
    const mainItems: any[] = [
      { sectionId: sec2.id, screenKey: 'dashboard', label: 'لوحة التحكم', icon: 'dashboard', route: '/biz/{bizId}', sortOrder: 1 },
      { sectionId: sec2.id, screenKey: 'back_to_businesses', label: 'العودة للأعمال', icon: 'arrow_forward', route: '/businesses', sortOrder: 2 },
    ];
    if (bizType === 'stations') {
      mainItems.push(
        { sectionId: sec2.id, screenKey: 'stations', label: 'المحطات', icon: 'bolt', route: '/biz/{bizId}/stations', sortOrder: 3 },
        { sectionId: sec2.id, screenKey: 'partners', label: 'الشركاء', icon: 'handshake', route: '/biz/{bizId}/partners', sortOrder: 4 },
      );
    } else if (bizType === 'single_station') {
      mainItems.push(
        { sectionId: sec2.id, screenKey: 'partners', label: 'الشركاء', icon: 'handshake', route: '/biz/{bizId}/partners', sortOrder: 3 },
      );
    } else {
      mainItems.push(
        { sectionId: sec2.id, screenKey: 'partners', label: 'الشركاء', icon: 'handshake', route: '/biz/{bizId}/partners', sortOrder: 3 },
        { sectionId: sec2.id, screenKey: 'summary', label: 'ملخص الأعمال', icon: 'summarize', route: '/biz/{bizId}/summary', sortOrder: 4 },
      );
    }
    await db.insert(schema.sidebarItems).values(mainItems);

    // --- الوحدة 3: الحسابات والأرصدة ---
    const accountItems: any[] = [
      { sectionId: sec3.id, screenKey: 'accounts', label: 'الحسابات', icon: 'account_balance_wallet', route: '/biz/{bizId}/accounts', sortOrder: 1 },
      { sectionId: sec3.id, screenKey: 'account_sub_natures', label: 'أنواع الحسابات الفرعية', icon: 'label', route: '/biz/{bizId}/account-sub-natures', sortOrder: 2 },
    ];
    if (bizType === 'stations' || bizType === 'single_station') {
      accountItems.push(
        { sectionId: sec3.id, screenKey: 'funds', label: 'الصناديق', icon: 'savings', route: '/biz/{bizId}/funds', sortOrder: 3 },
        { sectionId: sec3.id, screenKey: 'banks', label: 'البنوك', icon: 'account_balance', route: '/biz/{bizId}/banks', sortOrder: 4 },
        { sectionId: sec3.id, screenKey: 'exchangers', label: 'الصرافين', icon: 'currency_exchange', route: '/biz/{bizId}/exchangers', sortOrder: 5 },
        { sectionId: sec3.id, screenKey: 'wallets', label: 'المحافظ الإلكترونية', icon: 'wallet', route: '/biz/{bizId}/wallets', sortOrder: 6 },
      );
    }
    await db.insert(schema.sidebarItems).values(accountItems);

    // --- الوحدة 4: العمليات المالية ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec4.id, screenKey: 'vouchers', label: 'سندات الصرف والقبض', icon: 'receipt_long', route: '/biz/{bizId}/vouchers', sortOrder: 1 },
      { sectionId: sec4.id, screenKey: 'journal', label: 'القيود المحاسبية', icon: 'menu_book', route: '/biz/{bizId}/journal', sortOrder: 2 },
      { sectionId: sec4.id, screenKey: 'journal_categories', label: 'تصنيفات القيود', icon: 'label', route: '/biz/{bizId}/journal-categories', sortOrder: 3 },
    ]);

    // --- الوحدة 5: القوالب والترقيم ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec5.id, screenKey: 'operation_categories', label: 'تصنيفات العمليات', icon: 'folder_special', route: '/biz/{bizId}/operation-categories', sortOrder: 1 },
      { sectionId: sec5.id, screenKey: 'supplier_types', label: 'أنواع الموردين', icon: 'local_shipping', route: '/biz/{bizId}/supplier-types', sortOrder: 2 },
      { sectionId: sec5.id, screenKey: 'inventory_item_types', label: 'أنواع الأصناف', icon: 'inventory_2', route: '/biz/{bizId}/inventory-item-types', sortOrder: 3 },
      { sectionId: sec5.id, screenKey: 'departments', label: 'الأقسام', icon: 'groups', route: '/biz/{bizId}/departments', sortOrder: 4 },
      { sectionId: sec5.id, screenKey: 'job_titles', label: 'المسميات الوظيفية', icon: 'badge', route: '/biz/{bizId}/job-titles', sortOrder: 5 },
      { sectionId: sec5.id, screenKey: 'operation_types', label: 'أنواع العمليات', icon: 'category', route: '/biz/{bizId}/operation-types', sortOrder: 6 },
    ]);

    // --- الوحدة 6: المخزون والمخازن ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec6.id, screenKey: 'warehouse', label: 'المخزن', icon: 'warehouse', route: '/biz/{bizId}/warehouse', sortOrder: 1 },
      { sectionId: sec6.id, screenKey: 'warehouse_operations', label: 'العمليات المخزنية', icon: 'inventory_2', route: '/biz/{bizId}/warehouse-operations', sortOrder: 2 },
    ]);

    // --- الوحدة 7: الموردين ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec7.id, screenKey: 'suppliers', label: 'الموردين', icon: 'local_shipping', route: '/biz/{bizId}/suppliers', sortOrder: 1 },
    ]);

    // --- الوحدة 8: المطابقات والعهد ---
    const reconciliationAndCustodyItems: any[] = [
      { sectionId: sec8.id, screenKey: 'reconciliations', label: 'المطابقات', icon: 'fact_check', route: '/biz/{bizId}/reconciliations', sortOrder: 1 },
    ];
    if (bizType === 'stations' || bizType === 'single_station') {
      reconciliationAndCustodyItems.push(
        { sectionId: sec8.id, screenKey: 'custody', label: 'العهد', icon: 'lock', route: '/biz/{bizId}/custody', sortOrder: 2 },
      );
    }
    await db.insert(schema.sidebarItems).values(reconciliationAndCustodyItems);

    // --- الوحدة 9: التقارير ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec9.id, screenKey: 'reports', label: 'التقارير', icon: 'assessment', route: '/biz/{bizId}/reports', sortOrder: 1 },
      { sectionId: sec9.id, screenKey: 'reports_advanced', label: 'التقارير المتقدمة', icon: 'analytics', route: '/biz/{bizId}/reports-advanced', sortOrder: 2 },
    ]);

    // --- الوحدة 10: بناء الواجهات ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec10.id, screenKey: 'custom_screens', label: 'الشاشات المخصصة', icon: 'space_dashboard', route: '/biz/{bizId}/custom-screens', sortOrder: 1 },
      { sectionId: sec10.id, screenKey: 'ui_builder', label: 'بناء الواجهات', icon: 'dashboard_customize', route: '/biz/{bizId}/ui-builder', sortOrder: 2 },
    ]);

    // --- الوحدة 11: العملات وأسعار الصرف ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec11.id, screenKey: 'exchange_rates', label: 'أسعار الصرف', icon: 'currency_exchange', route: '/biz/{bizId}/exchange-rates', sortOrder: 1 },
    ]);

    // --- الوحدة 12: المعلقات والتصفيات ---
    const pendingItems: any[] = [
      { sectionId: sec12.id, screenKey: 'settlements', label: 'التصفيات', icon: 'balance', route: '/biz/{bizId}/settlements', sortOrder: 1 },
    ];
    if (bizType === 'stations') {
      pendingItems.push(
        { sectionId: sec12.id, screenKey: 'pending_accounts', label: 'حسابات معلقة', icon: 'warning', route: '/biz/{bizId}/pending', badge: 3, badgeColor: 'red', sortOrder: 2 },
      );
    }
    await db.insert(schema.sidebarItems).values(pendingItems);

    // --- الوحدة 13: الموظفين والرواتب ---
    if (bizType === 'stations' || bizType === 'single_station') {
      await db.insert(schema.sidebarItems).values([
        { sectionId: sec13.id, screenKey: 'employees', label: 'الموظفين', icon: 'groups', route: '/biz/{bizId}/employees', sortOrder: 1 },
        { sectionId: sec13.id, screenKey: 'salaries', label: 'الرواتب', icon: 'payments', route: '/biz/{bizId}/salaries', sortOrder: 2 },
      ]);
    }

    // --- الوحدة 14: الميزانية والمصروفات ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec14.id, screenKey: 'expense_categories', label: 'تصنيفات المصروفات', icon: 'category', route: '/biz/{bizId}/expense-categories', sortOrder: 1 },
      { sectionId: sec14.id, screenKey: 'expense_budget', label: 'ميزانية المصروفات', icon: 'account_balance_wallet', route: '/biz/{bizId}/expense-budget', sortOrder: 2 },
    ]);

    console.log(`✅ تم إنشاء ${14} قسم و عناصر التبويب للعمل: ${biz.name}`);
  }

  console.log('\n🎉 تمت إعادة تهيئة التبويب الجانبي بنجاح!');
  console.log('💡 قد تحتاج لتحديث الصفحة في المتصفح لرؤية التغييرات.');
  process.exit(0);
}

resetSidebar().catch((err) => {
  console.error('❌ خطأ:', err);
  process.exit(1);
});
