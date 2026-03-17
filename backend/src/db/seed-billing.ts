/**
 * seed-billing.ts — Phase 12
 * بيانات الفوترة والربط: أنظمة فوترة + حسابات الموظفين + ربط الكيانات + القائمة الجانبية
 * (مستخرجة من seed.ts للتوثيق — يتم تشغيلها عبر seed.ts)
 */
// هذا الملف مرجعي — شغّل: npx tsx src/db/seed.ts

/*
  // ===================== ربط الكيانات التشغيلية بحسابات مالية =====================
  // ربط الصناديق وتحديث أكوادها بالآلية الصحيحة
  const missingFunds = await db.select().from(schema.funds).where(isNull(schema.funds.accountId));
  for (const fund of missingFunds) {
    const account = await createLinkedAccount(
      fund.businessId,
      fund.name,
      'fund',
      getNatureId(fund.businessId, 'fund'),
      fund.code,
      fund.sequenceNumber,
    );
    // تحديث الصندوق بالكود والترقيم من الحساب المنشأ
    await db
      .update(schema.funds)
      .set({ 
        accountId: account.id,
        code: account.code,
        sequenceNumber: account.sequenceNumber,
        updatedAt: new Date() 
      })
      .where(eq(schema.funds.id, fund.id));
  }

  const missingSuppliers = await db.select().from(schema.suppliers).where(isNull(schema.suppliers.accountId));
  for (const supplier of missingSuppliers) {
    const account = await createLinkedAccount(
      supplier.businessId,
      supplier.name,
      'supplier',
      getNatureId(supplier.businessId, 'supplier'),
      supplier.code,
      supplier.sequenceNumber,
    );
    // تحديث المورد بالكود والترقيم من الحساب المنشأ
    await db
      .update(schema.suppliers)
      .set({ 
        accountId: account.id,
        code: account.code,
        sequenceNumber: account.sequenceNumber,
        updatedAt: new Date() 
      })
      .where(eq(schema.suppliers.id, supplier.id));
  }

  const missingWarehouses = await db.select().from(schema.warehouses).where(isNull(schema.warehouses.accountId));
  for (const warehouse of missingWarehouses) {
    const account = await createLinkedAccount(
      warehouse.businessId,
      warehouse.name,
      'warehouse',
      getNatureId(warehouse.businessId, 'warehouse'),
      warehouse.code,
      warehouse.sequenceNumber,
    );
    // تحديث المخزن بالكود والترقيم من الحساب المنشأ
    await db
      .update(schema.warehouses)
      .set({ 
        accountId: account.id,
        code: account.code,
        sequenceNumber: account.sequenceNumber,
        updatedAt: new Date() 
      })
      .where(eq(schema.warehouses.id, warehouse.id));
  }

  // ربط الموظفين بحسابات مالية
  const allEmployees = await db.select().from(schema.employees);
  for (const employee of allEmployees) {
    // إنشاء حساب مالي لكل موظف
    const account = await createLinkedAccount(
      employee.businessId,
      `حساب موظف - ${employee.fullName}`,
      'employee',
      getNatureId(employee.businessId, 'employee'),
    );
    
    // ربط الحساب بالموظف
    await db
      .update(schema.accounts)
      .set({ linkedEmployeeId: employee.id, updatedAt: new Date() })
      .where(eq(schema.accounts.id, account.id));
  }

  const missingBillingAccounts = await db
    .select()
    .from(schema.employeeBillingAccounts)
    .where(isNull(schema.employeeBillingAccounts.accountId));
  for (const billingAccount of missingBillingAccounts) {
    const [employee] = await db
      .select({ businessId: schema.employees.businessId })
      .from(schema.employees)
      .where(eq(schema.employees.id, billingAccount.employeeId))
      .limit(1);

    if (!employee) continue;

    const account = await createLinkedAccount(
      employee.businessId,
      billingAccount.label,
      'billing',
      getNatureId(employee.businessId, 'billing'),
    );
    await db
      .update(schema.employeeBillingAccounts)
      .set({ accountId: account.id })
      .where(eq(schema.employeeBillingAccounts.id, billingAccount.id));
  }

  const missingPartnerAccounts = await db
    .select()
    .from(schema.businessPartners)
    .where(isNull(schema.businessPartners.accountId));
  for (const partner of missingPartnerAccounts) {
    const account = await createLinkedAccount(
      partner.businessId,
      `حساب شريك - ${partner.fullName}`,
      'partner',
      getNatureId(partner.businessId, 'partner'),
      partner.code,
      partner.sequenceNumber,
    );
    await db
      .update(schema.businessPartners)
      .set({ accountId: account.id })
      .where(eq(schema.businessPartners.id, partner.id));
  }
  console.log('✅ ربط الكيانات التشغيلية بحساباتها');

  // ===================== أنواع المخروجات (expense_categories) =====================
  // تُضاف يدوياً من واجهة المستخدم عند الحاجة
  // console.log('✅ أنواع المخروجات');

  // ===================== قوالب العمليات =====================
  // تُضاف يدوياً من واجهة المستخدم عند الحاجة
  // console.log('✅ قوالب العمليات');

  // ===================== أرصدة الموردين =====================
  // يتم إنشاؤها عبر SQL مباشرة لأنها تعتمد على IDs الموردين
  // تم إضافتها عبر SQL migration منفصل

  // ===================== أقسام وعناصر القائمة الجانبية (sidebar_sections + sidebar_items) =====================
  // الأقسام حسب الوحدات الـ13 في MODULES.md — الشاشات موزعة تحت الأقسام المتفق عليها

  for (const biz of [b1, b2, b3]) {
    const bizType = biz.id === b1.id ? 'stations' : biz.id === b2.id ? 'single_station' : 'personal';

    // --- الأقسام (13 قسم = 13 وحدة) ---
    const [sec1] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '1. المستخدمون والصلاحيات', icon: 'admin_panel_settings', sortOrder: 1 }).returning();
    const [sec2] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '2. الرئيسية والأعمال', icon: 'home', sortOrder: 2 }).returning();
    const [sec3] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '3. الحسابات والأرصدة', icon: 'account_balance_wallet', sortOrder: 3 }).returning();
    const [sec4] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '4. العمليات المالية', icon: 'receipt_long', sortOrder: 4 }).returning();
    const [sec5] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '5. القوالب والترقيم', icon: 'category', sortOrder: 5 }).returning();
    const [sec6] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '6. المخزون والمخازن', icon: 'warehouse', sortOrder: 6 }).returning();
    const [sec7] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '7. الموردين', icon: 'local_shipping', sortOrder: 7 }).returning();
    const [sec8] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '8. التحصيل والفوترة', icon: 'receipt', sortOrder: 8 }).returning();
    const [sec9] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '9. التقارير', icon: 'assessment', sortOrder: 9 }).returning();
    const [sec10] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '10. بناء الواجهات', icon: 'space_dashboard', sortOrder: 10 }).returning();
    const [sec11] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '11. العملات وأسعار الصرف', icon: 'currency_exchange', sortOrder: 11 }).returning();
    const [sec12] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '12. المعلقات والتصفيات', icon: 'balance', sortOrder: 12 }).returning();
    const [sec13] = await db.insert(schema.sidebarSections).values({ businessId: biz.id, name: '13. الرواتب والميزانية', icon: 'payments', sortOrder: 13 }).returning();

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
        { sectionId: sec2.id, screenKey: 'employees', label: 'الموظفين', icon: 'groups', route: '/biz/{bizId}/employees', sortOrder: 4 },
        { sectionId: sec2.id, screenKey: 'partners', label: 'الشركاء', icon: 'handshake', route: '/biz/{bizId}/partners', sortOrder: 5 },
      );
    } else if (bizType === 'single_station') {
      mainItems.push(
        { sectionId: sec2.id, screenKey: 'employees', label: 'الموظفين', icon: 'groups', route: '/biz/{bizId}/employees', sortOrder: 3 },
        { sectionId: sec2.id, screenKey: 'partners', label: 'الشركاء', icon: 'handshake', route: '/biz/{bizId}/partners', sortOrder: 4 },
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
      { sectionId: sec5.id, screenKey: 'operation_types', label: 'أنواع العمليات', icon: 'category', route: '/biz/{bizId}/operation-types', sortOrder: 1 },
    ]);

    // --- الوحدة 6: المخزون والمخازن ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec6.id, screenKey: 'warehouse', label: 'المخزن', icon: 'warehouse', route: '/biz/{bizId}/warehouse', sortOrder: 1 },
      { sectionId: sec6.id, screenKey: 'warehouse_operations', label: 'العمليات المخزنية', icon: 'inventory_2', route: '/biz/{bizId}/warehouse-operations', sortOrder: 2 },
    ]);

    // --- الوحدة 7: الموردين ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec7.id, screenKey: 'suppliers', label: 'الموردين', icon: 'local_shipping', route: '/biz/{bizId}/suppliers', sortOrder: 1 },
      { sectionId: sec7.id, screenKey: 'supplier_types', label: 'تصنيفات الموردين', icon: 'label', route: '/biz/{bizId}/supplier-types', sortOrder: 2 },
      { sectionId: sec7.id, screenKey: 'purchase_invoices', label: 'فواتير المشتريات', icon: 'receipt', route: '/biz/{bizId}/purchase-invoices', sortOrder: 3 },
    ]);

    // --- الوحدة 8: التحصيل والفوترة ---
    if (bizType === 'stations') {
      await db.insert(schema.sidebarItems).values([
        { sectionId: sec8.id, screenKey: 'collections', label: 'التحصيل والتوريد', icon: 'receipt_long', route: '/biz/{bizId}/collections', sortOrder: 1 },
        { sectionId: sec8.id, screenKey: 'billing_systems', label: 'أنظمة الفوترة', icon: 'receipt', route: '/biz/{bizId}/billing-systems', sortOrder: 2 },
      ]);
    }

    // --- الوحدة 9: التقارير ---
    const reportItems: any[] = [
      { sectionId: sec9.id, screenKey: 'reports', label: 'التقارير', icon: 'assessment', route: '/biz/{bizId}/reports', sortOrder: 1 },
      { sectionId: sec9.id, screenKey: 'reports_advanced', label: 'التقارير المتقدمة', icon: 'analytics', route: '/biz/{bizId}/reports-advanced', sortOrder: 2 },
    ];
    await db.insert(schema.sidebarItems).values(reportItems);

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
      { sectionId: sec12.id, screenKey: 'reconciliations', label: 'المطابقات', icon: 'fact_check', route: '/biz/{bizId}/reconciliations', sortOrder: 1 },
      { sectionId: sec12.id, screenKey: 'custody', label: 'العهد', icon: 'lock', route: '/biz/{bizId}/custody', sortOrder: 2 },
      { sectionId: sec12.id, screenKey: 'intermediary_accounts', label: 'الحسابات الوسيطة', icon: 'sync_alt', route: '/biz/{bizId}/intermediary-accounts', sortOrder: 3 },
      { sectionId: sec12.id, screenKey: 'settlements', label: 'التصفيات', icon: 'balance', route: '/biz/{bizId}/settlements', sortOrder: 4 },
    ];
    if (bizType === 'stations') {
      pendingItems.push(
        { sectionId: sec12.id, screenKey: 'pending_accounts', label: 'حسابات معلقة', icon: 'warning', route: '/biz/{bizId}/pending', badge: 3, badgeColor: 'red', sortOrder: 5 },
      );
    }
    await db.insert(schema.sidebarItems).values(pendingItems);

    // --- الوحدة 13: الرواتب والميزانية ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec13.id, screenKey: 'expense_categories', label: 'تصنيفات المصروفات', icon: 'category', route: '/biz/{bizId}/expense-categories', sortOrder: 1 },
      { sectionId: sec13.id, screenKey: 'expense_budget', label: 'ميزانية المصروفات', icon: 'account_balance_wallet', route: '/biz/{bizId}/expense-budget', sortOrder: 2 },
      { sectionId: sec13.id, screenKey: 'salaries', label: 'الرواتب', icon: 'payments', route: '/biz/{bizId}/salaries', sortOrder: 3 },
    ]);

    // --- إضافة جميع العناصر للمستخدمين تلقائياً ---
    const allItemsInBiz = await db.select({
      id: schema.sidebarItems.id,
      sectionId: schema.sidebarItems.sectionId,
      sortOrder: schema.sidebarItems.sortOrder,
    }).from(schema.sidebarItems)
      .innerJoin(schema.sidebarSections, eq(schema.sidebarItems.sectionId, schema.sidebarSections.id))
      .where(eq(schema.sidebarSections.businessId, biz.id));

    const allUsers = await db.select({ id: schema.users.id }).from(schema.users);
    
    const userConfigsToInsert: any[] = [];
    for (const user of allUsers) {
      for (const item of allItemsInBiz) {
        userConfigsToInsert.push({
          userId: user.id,
          businessId: biz.id,
          sidebarItemId: item.id,
          isVisible: true,
          customSortOrder: item.sortOrder || 0,
        });
      }
    }
    
    if (userConfigsToInsert.length > 0) {
      await db.insert(schema.userSidebarConfig).values(userConfigsToInsert);
    }
  }

  console.log('✅ أقسام وعناصر القائمة الجانبية (sidebar_sections + sidebar_items + user_sidebar_config)');

  console.log('\n🎉 تم تهيئة جميع البيانات بنجاح!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ خطأ:', err);
  process.exit(1);
});

*/
