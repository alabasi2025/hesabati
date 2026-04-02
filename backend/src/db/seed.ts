import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, isNull } from 'drizzle-orm';
import postgres from 'postgres';
import * as schema from './schema/index.ts';
import bcrypt from 'bcryptjs';
import { generateLeafAccountCode, getNextSequence, generateItemCode } from '../middleware/sequencing.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:774424555@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

/**
 * تهيئة البيانات الأولية للنظام
 *
 * ملاحظة: نظام الترقيم الموحد:
 * - الحسابات الفرعية: تأخذ كود حسب النوع (FND-01, BNK-01, WHS-01, SUP-01, إلخ)
 * - الترقيم يعتمد على أنواع الحسابات الفرعية (account_sub_natures) فقط
 */
async function seed() {
  console.log('🌱 بدء تهيئة البيانات الأولية...');

  // ===================== المستخدمين =====================
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await db.insert(schema.users).values([
    { username: 'admin', password: hashedPassword, fullName: 'المالك', role: 'admin' },
    { username: 'ali_suadi', password: await bcrypt.hash('123456', 10), fullName: 'علي الصعدي', role: 'accountant' },
  ]);
  console.log('✅ المستخدمين');

  // ===================== العملات =====================
  const insertedCurrencies = await db.insert(schema.currencies).values([
    { code: 'YER', nameAr: 'ريال يمني', symbol: 'ر.ي', exchangeRate: '1', isDefault: true },
    { code: 'SAR', nameAr: 'ريال سعودي', symbol: 'ر.س', exchangeRate: '140', minRate: '130', maxRate: '250' },
    { code: 'USD', nameAr: 'دولار أمريكي', symbol: '$', exchangeRate: '535', minRate: '500', maxRate: '600' },
  ]).returning();
  const yerCurrencyId = insertedCurrencies.find(c => c.code === 'YER')!.id;
  const sarCurrencyId = insertedCurrencies.find(c => c.code === 'SAR')!.id;
  const usdCurrencyId = insertedCurrencies.find(c => c.code === 'USD')!.id;
  const allThreeCurrencyIds = [yerCurrencyId, sarCurrencyId, usdCurrencyId];
  console.log('✅ العملات (YER=' + yerCurrencyId + ', SAR=' + sarCurrencyId + ', USD=' + usdCurrencyId + ')');

  // ===================== الأعمال (المحور الرئيسي) =====================
  const [b1] = await db.insert(schema.businesses).values({ name: 'المحطات', code: 'biz-01', description: 'شراكة المحطات الأربع مع محمد المراني - الدهمية، الصبالية وجمال، غليل، الساحل الغربي', icon: 'bolt', color: '#f59e0b', sortOrder: 1 }).returning();
  const [b2] = await db.insert(schema.businesses).values({ name: 'محطة معبر', code: 'biz-02', description: 'شراكة محطة معبر مع عمر إسحاق وإبراهيم نجم الدين', icon: 'flash_on', color: '#22c55e', sortOrder: 2 }).returning();
  const [b3] = await db.insert(schema.businesses).values({ name: 'أعمال شخصية', code: 'biz-03', description: 'حسابات المالك الشخصية وأعماله الخاصة', icon: 'account_circle', color: '#6366f1', sortOrder: 3 }).returning();
  console.log('✅ الأعمال:', b1.id, b2.id, b3.id);

  // ===================== أنواع الحسابات الفرعية الوظيفية =====================
  const systemNatures = [
    { natureKey: 'fund', name: 'صندوق', icon: 'savings', requiresStation: true },
    { natureKey: 'bank', name: 'بنك', icon: 'account_balance', requiresProvider: true, requiresAccountNumber: true },
    { natureKey: 'e_wallet', name: 'محفظة', icon: 'account_balance_wallet', requiresProvider: true },
    { natureKey: 'exchange', name: 'صراف', icon: 'currency_exchange', requiresProvider: true },
    { natureKey: 'warehouse', name: 'مخزن', icon: 'warehouse', requiresStation: true },
    { natureKey: 'custody', name: 'عهدة', icon: 'lock' },
    { natureKey: 'supplier', name: 'مورد', icon: 'local_shipping', requiresSupplierType: true },
    { natureKey: 'employee', name: 'موظف', icon: 'person', requiresEmployee: true },
    { natureKey: 'partner', name: 'شريك', icon: 'handshake' },
    { natureKey: 'billing', name: 'نظام فوترة', icon: 'receipt', requiresStation: true, requiresEmployee: true },
    { natureKey: 'intermediary', name: 'وسيطة', icon: 'sync_alt' },
    { natureKey: 'budget', name: 'ميزانية', icon: 'account_balance_wallet' },
    { natureKey: 'settlement', name: 'تصفية', icon: 'balance' },
    { natureKey: 'pending', name: 'معلق', icon: 'pending_actions' },
  ] as const;

  for (const biz of [b1, b2, b3]) {
    await db.insert(schema.accountSubNatures).values(
      systemNatures.map((n, idx) => ({
        businessId: biz.id, name: n.name, natureKey: n.natureKey, isSystem: true, icon: n.icon, color: '#64748b', sequenceNumber: idx + 1,
        requiresStation: 'requiresStation' in n && n.requiresStation === true,
        requiresEmployee: 'requiresEmployee' in n && n.requiresEmployee === true,
        requiresProvider: 'requiresProvider' in n && n.requiresProvider === true,
        requiresAccountNumber: 'requiresAccountNumber' in n && n.requiresAccountNumber === true,
        requiresSupplierType: 'requiresSupplierType' in n && n.requiresSupplierType === true,
        supportsCashOperations: true, canReceivePayment: true, canMakePayment: true, isActive: true,
      })),
    );
  }
  console.log('✅ أنواع الحسابات الفرعية الوظيفية');

  const businessNatureByKey = new Map<number, Record<string, number>>();
  for (const biz of [b1, b2, b3]) {
    const natures = await db
      .select({
        id: schema.accountSubNatures.id,
        natureKey: schema.accountSubNatures.natureKey,
      })
      .from(schema.accountSubNatures)
      .where(eq(schema.accountSubNatures.businessId, biz.id));

    businessNatureByKey.set(
      biz.id,
      Object.fromEntries(natures.map((n) => [n.natureKey, n.id])),
    );
  }

  const getNatureId = (businessId: number, natureKey: string): number | null =>
    businessNatureByKey.get(businessId)?.[natureKey] ?? null;

  /**
   * إنشاء حساب مرتبط بكيان تشغيلي (صندوق، مخزن، مورد، إلخ)
   * تطبق آلية الترقيم الصحيحة: FND-01, BNK-01, WHS-01, SUP-01, إلخ
   */
  const createLinkedAccount = async (
    businessId: number,
    name: string,
    accountType: NonNullable<(typeof schema.accounts.$inferInsert)['accountType']>,
    accountSubNatureId: number | null,
    code?: string | null,
    sequenceNumber?: number | null,
  ) => {
    // إذا كان هناك كود محدد مسبقاً، استخدمه مباشرة
    if (code) {
      const [account] = await db
        .insert(schema.accounts)
        .values({
          businessId,
          name,
          accountType,
          accountSubNatureId,
          isLeafAccount: true,
          code,
          sequenceNumber: sequenceNumber ?? null,
        })
        .returning();
      return account;
    }

    // استخدام آلية الترقيم الصحيحة حسب النوع الفرعي
    // احصل على natureKey من accountSubNatureId
    const [subNature] = accountSubNatureId
      ? await db.select({ natureKey: schema.accountSubNatures.natureKey })
          .from(schema.accountSubNatures)
          .where(eq(schema.accountSubNatures.id, accountSubNatureId))
          .limit(1)
      : [null];

    const natureKey = subNature?.natureKey || accountType;
    const { code: generatedCode, sequenceNumber: generatedSeq } = await generateLeafAccountCode(
      businessId,
      natureKey,
      db as any
    );

    const [account] = await db
      .insert(schema.accounts)
      .values({
        businessId,
        name,
        accountType,
        accountSubNatureId,
        isLeafAccount: true,
        code: generatedCode,
        sequenceNumber: generatedSeq,
      })
      .returning();

    return account;
  };

  // ===================== شركاء العمل (حساب تحكم واحد لكل عمل) =====================
  // b1: حساب PRT-01 واحد → شريكان PRT-01/1, PRT-01/2
  // b2: حساب PRT-01 واحد → ثلاثة شركاء PRT-01/1, PRT-01/2, PRT-01/3
  const partnerCtrlB1 = await createLinkedAccount(b1.id, 'حسابات الشركاء', 'partner', getNatureId(b1.id, 'partner'));
  const partnerCtrlB2 = await createLinkedAccount(b2.id, 'حسابات الشركاء', 'partner', getNatureId(b2.id, 'partner'));

  const partnerSeedData = [
    { businessId: b1.id, ctrl: partnerCtrlB1, fullName: 'المالك (أنت)', sharePercentage: '50', role: 'مالك' },
    { businessId: b1.id, ctrl: partnerCtrlB1, fullName: 'محمد المراني', sharePercentage: '50', role: 'شريك' },
    { businessId: b2.id, ctrl: partnerCtrlB2, fullName: 'المالك (أنت)', sharePercentage: '34', role: 'مالك' },
    { businessId: b2.id, ctrl: partnerCtrlB2, fullName: 'عمر إسحاق', sharePercentage: '33', role: 'شريك' },
    { businessId: b2.id, ctrl: partnerCtrlB2, fullName: 'إبراهيم نجم الدين', sharePercentage: '33', role: 'شريك' },
  ];
  const partnerSubSeq = new Map<number, number>();
  let partnerGlobalSeq = 0;
  for (const pt of partnerSeedData) {
    const subSeq = (partnerSubSeq.get(pt.ctrl.id) ?? 0) + 1;
    partnerSubSeq.set(pt.ctrl.id, subSeq);
    partnerGlobalSeq++;
    const [createdPartner] = await db.insert(schema.businessPartners).values({
      businessId: pt.businessId,
      fullName: pt.fullName,
      sharePercentage: pt.sharePercentage,
      role: pt.role,
      accountId: pt.ctrl.id,
      code: `${pt.ctrl.code}/${subSeq}`,
      sequenceNumber: partnerGlobalSeq,
      defaultCurrencyId: yerCurrencyId,
    } as any).returning();

    // إنشاء أرصدة للعملات الثلاث
    await db.insert(schema.partnerBalances).values(
      allThreeCurrencyIds.map(cid => ({ partnerId: createdPartner.id, currencyId: cid, balance: '0', updatedAt: new Date() }))
    );
  }
  console.log('✅ الشركاء (حساب تحكم واحد لكل عمل + أرصدة عملات)');

  // ===================== المحطات =====================
  const seq1 = await getNextSequence(b1.id, 'station', 0, 0, db as any);
  const [s1] = await db.insert(schema.stations).values({ businessId: b1.id, name: 'الدهمية', code: generateItemCode('STN', seq1), location: 'الدهمية', billingSystems: ['moghrabi_v1', 'support_fund', 'prepaid'], sequenceNumber: seq1 }).returning();
  const seq2 = await getNextSequence(b1.id, 'station', 0, 0, db as any);
  const [s2] = await db.insert(schema.stations).values({ businessId: b1.id, name: 'الصبالية وجمال', code: generateItemCode('STN', seq2), location: 'الصبالية وجمال', billingSystems: ['moghrabi_v2', 'support_fund', 'prepaid'], sequenceNumber: seq2 }).returning();
  const seq3 = await getNextSequence(b1.id, 'station', 0, 0, db as any);
  const [s3] = await db.insert(schema.stations).values({ businessId: b1.id, name: 'غليل', code: generateItemCode('STN', seq3), location: 'غليل', billingSystems: ['moghrabi_v3', 'support_fund', 'prepaid'], sequenceNumber: seq3 }).returning();
  const seq4 = await getNextSequence(b1.id, 'station', 0, 0, db as any);
  const [s4] = await db.insert(schema.stations).values({ businessId: b1.id, name: 'الساحل الغربي', code: generateItemCode('STN', seq4), location: 'الساحل الغربي', billingSystems: ['support_fund_west'], hasEmployees: false, notes: 'نقطة مولعة من محطة الشريك', sequenceNumber: seq4 }).returning();
  const seq5 = await getNextSequence(b1.id, 'station', 0, 0, db as any);
  const [s5] = await db.insert(schema.stations).values({ businessId: b1.id, name: 'الإدارة', code: generateItemCode('STN', seq5), location: 'المكتب الرئيسي', billingSystems: [], notes: 'المكتب الإداري', sequenceNumber: seq5 }).returning();
  const seqMabar = await getNextSequence(b2.id, 'station', 0, 0, db as any);
  const [s6] = await db.insert(schema.stations).values({ businessId: b2.id, name: 'محطة معبر', code: generateItemCode('STN', seqMabar), location: 'معبر', billingSystems: ['moghrabi_v3'], sequenceNumber: seqMabar }).returning();
  console.log('✅ المحطات');

  // ===================== الموظفين (حساب تحكم واحد لكل عمل) =====================
  // b1: حساب EMP-01 واحد → جميع موظفي المحطات EMP-01/1, EMP-01/2, ...
  // b2: حساب EMP-01 واحد → موظفو معبر EMP-01/1, EMP-01/2, ...
  const empCtrlB1 = await createLinkedAccount(b1.id, 'حسابات الموظفين', 'employee', getNatureId(b1.id, 'employee'));
  const empCtrlB2 = await createLinkedAccount(b2.id, 'حسابات الموظفين', 'employee', getNatureId(b2.id, 'employee'));

  const employeeSeedData: { businessId: number; ctrl: typeof empCtrlB1; fullName: string; jobTitle?: string; stationId?: number; department?: string; salary: string; salaryCurrency?: string; monthlyAllowance?: string; notes?: string }[] = [
    // الإدارة
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'علي الصعدي', jobTitle: 'محاسب ومفوتر', stationId: s5.id, department: 'الإدارة', salary: '300000', salaryCurrency: 'YER', monthlyAllowance: '3000', notes: 'محاسب + مفوتر للمحطات' },
    // الدهمية
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'رايد العباسي', jobTitle: 'مدير المحطة', stationId: s1.id, department: 'الدهمية', salary: '280000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'ابراهيم فارع', jobTitle: 'فني المولد', stationId: s1.id, department: 'الدهمية', salary: '170000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'عبدالله طالب', jobTitle: 'متحصل', stationId: s1.id, department: 'الدهمية', salary: '90000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'سلطان الريمي', jobTitle: 'كهربائي', stationId: s1.id, department: 'الدهمية', salary: '150000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'حسن فهد', jobTitle: 'كهربائي', stationId: s1.id, department: 'الدهمية', salary: '110000' },
    // الصبالية وجمال
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'علي المجهلي', jobTitle: 'مدير المحطة', stationId: s2.id, department: 'الصبالية وجمال', salary: '250000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'خالد أبو الرجال', stationId: s2.id, department: 'الصبالية وجمال', salary: '200000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'عزيز أبو الرجال', stationId: s2.id, department: 'الصبالية وجمال', salary: '180000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'قايد حسين العباسي', stationId: s2.id, department: 'الصبالية وجمال', salary: '180000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'محمد ابراهيم', stationId: s2.id, department: 'الصبالية وجمال', salary: '150000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'محمد صغير', stationId: s2.id, department: 'الصبالية وجمال', salary: '90000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'عبدالخالق المزعقي', stationId: s2.id, department: 'الصبالية وجمال', salary: '150000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'وائل بشر', stationId: s2.id, department: 'الصبالية وجمال', salary: '150000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'علاء الصعدي', stationId: s2.id, department: 'الصبالية وجمال', salary: '100000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'جودة', stationId: s2.id, department: 'الصبالية وجمال', salary: '90000' },
    // غليل
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'قايد حسن العباسي', jobTitle: 'مدير المحطة', stationId: s3.id, department: 'غليل', salary: '400000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'مهند العباسي', stationId: s3.id, department: 'غليل', salary: '100000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'معين العباسي', stationId: s3.id, department: 'غليل', salary: '170000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'أحمد المغربي', stationId: s3.id, department: 'غليل', salary: '120000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'مراد جريب', stationId: s3.id, department: 'غليل', salary: '150000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'سامي الحرازي', stationId: s3.id, department: 'غليل', salary: '130000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'عبدة الفيراني', stationId: s3.id, department: 'غليل', salary: '60000' },
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'الأبجة', stationId: s3.id, department: 'غليل', salary: '60000' },
    // خارجي
    { businessId: b1.id, ctrl: empCtrlB1, fullName: 'قايد العباسي', jobTitle: 'متابعة مواقع فورجي وسنترال', department: 'خارجي', salary: '0', notes: 'يفوتر ويتحصل شهرياً ويودع لحسابات المالك' },
    // معبر
    { businessId: b2.id, ctrl: empCtrlB2, fullName: 'حسن المعبري', jobTitle: 'مدير محطة', stationId: s6.id, department: 'معبر', salary: '180000' },
    { businessId: b2.id, ctrl: empCtrlB2, fullName: 'سعيد أحمد', jobTitle: 'محصل', stationId: s6.id, department: 'معبر', salary: '120000' },
    { businessId: b2.id, ctrl: empCtrlB2, fullName: 'منصور علي', jobTitle: 'فني', stationId: s6.id, department: 'معبر', salary: '130000' },
    { businessId: b2.id, ctrl: empCtrlB2, fullName: 'زياد محمد', jobTitle: 'محصل', stationId: s6.id, department: 'معبر', salary: '110000' },
  ];

  const empSubSeq = new Map<number, number>();
  let empGlobalSeq = 0;
  for (const emp of employeeSeedData) {
    const subSeq = (empSubSeq.get(emp.ctrl.id) ?? 0) + 1;
    empSubSeq.set(emp.ctrl.id, subSeq);
    empGlobalSeq++;
    const [createdEmp] = await db.insert(schema.employees).values({
      businessId: emp.businessId,
      accountId: emp.ctrl.id,
      defaultCurrencyId: yerCurrencyId,
      sequenceNumber: empGlobalSeq,
      code: `${emp.ctrl.code}/${subSeq}`,
      fullName: emp.fullName,
      jobTitle: emp.jobTitle ?? null,
      stationId: emp.stationId ?? null,
      department: emp.department ?? null,
      salary: emp.salary,
      salaryCurrency: emp.salaryCurrency ?? 'YER',
      monthlyAllowance: emp.monthlyAllowance ?? '0',
      notes: emp.notes ?? null,
    } as any).returning();

    // إنشاء أرصدة للعملات الثلاث
    await db.insert(schema.employeeBalances).values(
      allThreeCurrencyIds.map(cid => ({ employeeId: createdEmp.id, currencyId: cid, balance: '0', updatedAt: new Date() }))
    );
  }
  console.log('✅ الموظفين (حساب تحكم واحد لكل عمل + أرصدة 3 عملات)');

  // ===================== الحسابات والمحافظ =====================
  const accountSeedRows: (typeof schema.accounts.$inferInsert)[] = [
    // محافظ إلكترونية — تُنشأ من walletSeedData أدناه
    // بنوك — تُنشأ من bankSeedData أدناه
    // صرافين — تُنشأ من exchangeSeedData أدناه
    // المخازن والموردون والشركاء والموظفون والعهد: تُنشأ حساباتهم في أقسامهم المخصصة
  ];

  // إنشاء الحسابات باستخدام آلية الترقيم الصحيحة
  const normalizedAccounts: any[] = [];
  for (const row of accountSeedRows) {
    const natureId =
      row.accountType
        ? businessNatureByKey.get(row.businessId)?.[row.accountType]
        : undefined;

    // استخدام آلية الترقيم الصحيحة حسب النوع
    const natureKey = row.accountType || 'intermediary';
    const { code, sequenceNumber } = await generateLeafAccountCode(
      row.businessId,
      natureKey,
      db as any
    );

    normalizedAccounts.push({
      ...row,
      accountSubNatureId: natureId ?? null,
      isLeafAccount: true,
      sequenceNumber,
      code,
    });
  }

  if (normalizedAccounts.length > 0) {
    await db.insert(schema.accounts).values(normalizedAccounts);
  }
  console.log('✅ الحسابات');

  // ===================== الصناديق =====================
  // المنطق الجديد: لكل صندوق يُنشأ حساب fund في الدليل أولاً ثم يُنشأ الصندوق مرتبطاً به
  const fundSeedData: { businessId: number; name: string; stationId?: number; responsiblePerson?: string; description?: string; isActive?: boolean }[] = [
    // حسابات عامة
    { businessId: b1.id, name: 'خزنة المالك الشخصية' },
    { businessId: b1.id, name: 'النقد الشخصي (كاش)' },
    // المحطات
    { businessId: b1.id, name: 'صندوق رئيسي - الدهمية', stationId: s1.id },
    { businessId: b1.id, name: 'صندوق رئيسي - الصبالية وجمال', stationId: s2.id },
    { businessId: b1.id, name: 'صندوق غليل', stationId: s3.id },
    { businessId: b1.id, name: 'صندوق سلف الموظفين - الدهمية', stationId: s1.id },
    { businessId: b1.id, name: 'صندوق سلف الموظفين - الصبالية وجمال', stationId: s2.id },
    { businessId: b1.id, name: 'صندوق سلف الموظفين - غليل', stationId: s3.id },
    { businessId: b1.id, name: 'صندوق العهدة - الدهمية', stationId: s1.id },
    { businessId: b1.id, name: 'صندوق العهدة - الصبالية وجمال', stationId: s2.id },
    { businessId: b1.id, name: 'صندوق العهدة - غليل', stationId: s3.id },
    // صناديق علي صعدي
    { businessId: b1.id, name: 'صندوق 2023 - علي صعدي', responsiblePerson: 'علي الصعدي', description: 'صندوق مخلوط - معلق يحتاج تصفية', isActive: false },
    { businessId: b1.id, name: 'الخزنة - علي صعدي', responsiblePerson: 'علي الصعدي' },
    { businessId: b1.id, name: 'صندوق الخرج - علي صعدي', responsiblePerson: 'علي الصعدي' },
    { businessId: b1.id, name: 'صندوق التوريدات - علي صعدي', responsiblePerson: 'علي الصعدي' },
    // معبر
    { businessId: b2.id, name: 'صندوق تحصيل معبر', stationId: s6.id, responsiblePerson: 'حسن المعبري' },
    { businessId: b2.id, name: 'خزنة معبر', responsiblePerson: 'حسن المعبري' },
    // شخصي
    { businessId: b3.id, name: 'خزنة شخصية' },
  ];

  const accountFundCount = new Map<number, number>();
  for (const fd of fundSeedData) {
    // 1) إنشاء حساب fund في الدليل
    const fundNatureId = getNatureId(fd.businessId, 'fund');
    const account = await createLinkedAccount(fd.businessId, fd.name, 'fund', fundNatureId);

    // 2) كود مركّب: كود الحساب/رقم فرعي (FND-01/1, FND-01/2)
    const subSeq = (accountFundCount.get(account.id) ?? 0) + 1;
    accountFundCount.set(account.id, subSeq);

    const [createdFund] = await db.insert(schema.funds).values({
      businessId: fd.businessId,
      name: fd.name,
      accountId: account.id,
      defaultCurrencyId: yerCurrencyId,
      sequenceNumber: account.sequenceNumber,
      code: `${account.code}/${subSeq}`,
      stationId: fd.stationId ?? null,
      responsiblePerson: fd.responsiblePerson ?? null,
      description: fd.description ?? null,
      isActive: fd.isActive ?? true,
    }).returning();

    // إضافة أرصدة للعملات الثلاث
    await db.insert(schema.fundBalances).values(
      allThreeCurrencyIds.map(cid => ({ fundId: createdFund.id, currencyId: cid, balance: '0', updatedAt: new Date() }))
    );
  }
  console.log('✅ الصناديق (مع حساباتها المرتبطة + أرصدة 3 عملات)');

  // ===================== البنوك =====================
  const bankSeedData: { businessId: number; name: string; provider?: string; accountNumber?: string; responsiblePerson?: string; description?: string; isActive?: boolean }[] = [
    { businessId: b1.id, name: 'كريمي الحديدة - جاري', provider: 'الكريمي' },
    { businessId: b1.id, name: 'كريمي الحديدة - توفير', provider: 'الكريمي' },
    { businessId: b1.id, name: 'كريمي صنعاء - جاري', provider: 'الكريمي' },
    { businessId: b1.id, name: 'كريمي صنعاء - توفير', provider: 'الكريمي' },
    { businessId: b3.id, name: 'حساب شخصي - كريمي', provider: 'بنك الكريمي' },
  ];

  const accountBankCount = new Map<number, number>();
  for (const bk of bankSeedData) {
    // 1) إنشاء حساب bank في الدليل
    const bankNatureId = getNatureId(bk.businessId, 'bank');
    const account = await createLinkedAccount(bk.businessId, bk.name, 'bank', bankNatureId);

    // 2) كود مركّب: كود الحساب/رقم فرعي (BNK-01/1, BNK-01/2)
    const subSeq = (accountBankCount.get(account.id) ?? 0) + 1;
    accountBankCount.set(account.id, subSeq);

    const [createdBank] = await db.insert(schema.banks).values({
      businessId: bk.businessId,
      name: bk.name,
      accountId: account.id,
      defaultCurrencyId: yerCurrencyId,
      sequenceNumber: account.sequenceNumber,
      code: `${account.code}/${subSeq}`,
      provider: bk.provider ?? null,
      accountNumber: bk.accountNumber ?? null,
      responsiblePerson: bk.responsiblePerson ?? null,
      description: bk.description ?? null,
      isActive: bk.isActive ?? true,
    }).returning();

    // إضافة أرصدة للعملات الثلاث
    await db.insert(schema.bankBalances).values(
      allThreeCurrencyIds.map(cid => ({ bankId: createdBank.id, currencyId: cid, balance: '0', updatedAt: new Date() }))
    );
  }
  console.log('✅ البنوك (مع حساباتها المرتبطة + أرصدة 3 عملات)');

  // ===================== المحافظ الإلكترونية =====================
  const walletSeedData: { businessId: number; name: string; provider?: string; accountNumber?: string; responsiblePerson?: string; description?: string; isActive?: boolean }[] = [
    { businessId: b1.id, name: 'جوالي 1 - شخصي', provider: 'جوالي', accountNumber: '774424555' },
    { businessId: b1.id, name: 'جوالي 2 - شخصي', provider: 'جوالي', accountNumber: '771506017' },
    { businessId: b1.id, name: 'جوالي 3 - وكيل', provider: 'جوالي', accountNumber: '774424555' },
    { businessId: b1.id, name: 'جيب', provider: 'جيب', accountNumber: '774424555' },
    { businessId: b1.id, name: 'ون كاش', provider: 'ون كاش', accountNumber: '774424555' },
    { businessId: b1.id, name: 'حاسب - رئيسي', provider: 'خدمة حاسب' },
    { businessId: b1.id, name: 'حاسب - نقطة 1', provider: 'خدمة حاسب' },
    { businessId: b1.id, name: 'حاسب - نقطة 2', provider: 'خدمة حاسب' },
    { businessId: b1.id, name: 'حاسب - نقطة 3', provider: 'خدمة حاسب' },
    { businessId: b1.id, name: 'حاسب - نقطة 4', provider: 'خدمة حاسب' },
    { businessId: b1.id, name: 'حاسب - نقطة 5', provider: 'خدمة حاسب' },
    { businessId: b1.id, name: 'حاسب - نقطة 6', provider: 'خدمة حاسب' },
    { businessId: b1.id, name: 'حاسب - نقطة 7', provider: 'خدمة حاسب' },
    { businessId: b2.id, name: 'جوالي - معبر', provider: 'جوالي' },
    { businessId: b2.id, name: 'ون كاش - معبر', provider: 'ون كاش' },
    { businessId: b3.id, name: 'حساب شخصي - جوالي', provider: 'جوالي' },
  ];

  const accountWalletCount = new Map<number, number>();
  for (const wl of walletSeedData) {
    const walletNatureId = getNatureId(wl.businessId, 'e_wallet');
    const account = await createLinkedAccount(wl.businessId, wl.name, 'e_wallet', walletNatureId);

    const subSeq = (accountWalletCount.get(account.id) ?? 0) + 1;
    accountWalletCount.set(account.id, subSeq);

    const [createdWallet] = await db.insert(schema.wallets).values({
      businessId: wl.businessId,
      name: wl.name,
      accountId: account.id,
      defaultCurrencyId: yerCurrencyId,
      sequenceNumber: account.sequenceNumber,
      code: `${account.code}/${subSeq}`,
      provider: wl.provider ?? null,
      accountNumber: wl.accountNumber ?? null,
      responsiblePerson: wl.responsiblePerson ?? null,
      description: wl.description ?? null,
      isActive: wl.isActive ?? true,
    }).returning();

    // إضافة أرصدة للعملات الثلاث
    await db.insert(schema.walletBalances).values(
      allThreeCurrencyIds.map(cid => ({ walletId: createdWallet.id, currencyId: cid, balance: '0', updatedAt: new Date() }))
    );
  }
  console.log('✅ المحافظ الإلكترونية (مع حساباتها المرتبطة + أرصدة 3 عملات)');

  // ===================== الصرافين =====================
  const exchangeSeedData: { businessId: number; name: string; provider?: string; accountNumber?: string; responsiblePerson?: string; description?: string; isActive?: boolean }[] = [
    { businessId: b1.id, name: 'الحوشبي - باسم المحطات', provider: 'الحوشبي' },
    { businessId: b1.id, name: 'الحوشبي - باسم المالك', provider: 'الحوشبي' },
    { businessId: b1.id, name: 'النجم', provider: 'النجم' },
    { businessId: b1.id, name: 'ابن عامر', provider: 'ابن عامر', isActive: false },
    { businessId: b1.id, name: 'النهمي - المحطات', provider: 'النهمي', isActive: false },
    { businessId: b1.id, name: 'النهمي - محمد المراني', provider: 'النهمي', isActive: false },
    { businessId: b1.id, name: 'النهمي - الرئيسي', provider: 'النهمي', isActive: false },
  ];

  const accountExchangeCount = new Map<number, number>();
  for (const ex of exchangeSeedData) {
    const exchangeNatureId = getNatureId(ex.businessId, 'exchange');
    const account = await createLinkedAccount(ex.businessId, ex.name, 'exchange', exchangeNatureId);

    const subSeq = (accountExchangeCount.get(account.id) ?? 0) + 1;
    accountExchangeCount.set(account.id, subSeq);

    const [createdExchange] = await db.insert(schema.exchanges).values({
      businessId: ex.businessId,
      name: ex.name,
      accountId: account.id,
      defaultCurrencyId: yerCurrencyId,
      sequenceNumber: account.sequenceNumber,
      code: `${account.code}/${subSeq}`,
      provider: ex.provider ?? null,
      accountNumber: ex.accountNumber ?? null,
      responsiblePerson: ex.responsiblePerson ?? null,
      description: ex.description ?? null,
      isActive: ex.isActive ?? true,
    }).returning();

    // إضافة أرصدة للعملات الثلاث
    await db.insert(schema.exchangeBalances).values(
      allThreeCurrencyIds.map(cid => ({ exchangeId: createdExchange.id, currencyId: cid, balance: '0', updatedAt: new Date() }))
    );
  }
  console.log('✅ الصرافين (مع حساباتهم المرتبطة + أرصدة 3 عملات)');

  // ===================== أنواع الموردين + حساب تحكم لكل نوع =====================
  // كل نوع مورد = حساب مستقل في الدليل → الموردون تحته: SUP-01/1, SUP-01/2, ...
  type SupTypeDef = { key: string; name: string; icon?: string; color?: string };
  const supTypesB1: SupTypeDef[] = [
    { key: 'diesel',    name: 'موردو الديزل',                icon: 'local_gas_station', color: '#dc2626' },
    { key: 'oil',       name: 'موردو الزيوت',                icon: 'water_drop',        color: '#f97316' },
    { key: 'electric',  name: 'موردو العدادات والكهربائيات', icon: 'electrical_services',color: '#eab308' },
    { key: 'batteries', name: 'موردو البطاريات',             icon: 'battery_charging_full', color: '#22c55e' },
    { key: 'screens',   name: 'موردو الشاشات والقواطع',     icon: 'computer',          color: '#3b82f6' },
    { key: 'utility',   name: 'جهات العائد الشهري',          icon: 'electric_bolt',     color: '#8b5cf6' },
  ];
  const supTypesB2: SupTypeDef[] = [
    { key: 'diesel',    name: 'موردو الديزل',                icon: 'local_gas_station', color: '#dc2626' },
    { key: 'electric',  name: 'موردو المواد الكهربائية',    icon: 'electrical_services',color: '#eab308' },
  ];

  // دالة مساعدة: إنشاء نوع مورد مع حسابه
  const createSupplierType = async (
    businessId: number,
    def: SupTypeDef,
    sortOrder: number,
  ) => {
    const account = await createLinkedAccount(businessId, def.name, 'supplier', getNatureId(businessId, 'supplier'));
    const [st] = await db.insert(schema.supplierTypes).values({
      businessId,
      accountId: account.id,
      name: def.name,
      subTypeKey: def.key,
      icon: def.icon ?? 'local_shipping',
      color: def.color ?? '#f97316',
      sortOrder,
      sequenceNumber: sortOrder,
    }).returning();
    return { ...st, account };
  };

  const supTypeMapB1 = new Map<string, Awaited<ReturnType<typeof createSupplierType>>>();
  for (let i = 0; i < supTypesB1.length; i++) {
    const st = await createSupplierType(b1.id, supTypesB1[i], i + 1);
    supTypeMapB1.set(st.subTypeKey, st);
  }
  const supTypeMapB2 = new Map<string, Awaited<ReturnType<typeof createSupplierType>>>();
  for (let i = 0; i < supTypesB2.length; i++) {
    const st = await createSupplierType(b2.id, supTypesB2[i], i + 1);
    supTypeMapB2.set(st.subTypeKey, st);
  }
  console.log('✅ أنواع الموردين (مع حساباتهم)');

  // ===================== الموردين (كل مورد تحت نوعه) =====================
  const supplierSeedData: { businessId: number; typeKey: string; typeMap: typeof supTypeMapB1; name: string }[] = [
    { businessId: b1.id, typeMap: supTypeMapB1, typeKey: 'diesel',    name: 'محمود الحجة' },
    { businessId: b1.id, typeMap: supTypeMapB1, typeKey: 'oil',       name: 'الوتاري (لوتس)' },
    { businessId: b1.id, typeMap: supTypeMapB1, typeKey: 'oil',       name: 'الحجاجي (إيني أجيب)' },
    { businessId: b1.id, typeMap: supTypeMapB1, typeKey: 'oil',       name: 'أحمد هادي (بيل ون)' },
    { businessId: b1.id, typeMap: supTypeMapB1, typeKey: 'electric',  name: 'أمجد الصلوي' },
    { businessId: b1.id, typeMap: supTypeMapB1, typeKey: 'batteries', name: 'موسى الصباري' },
    { businessId: b1.id, typeMap: supTypeMapB1, typeKey: 'screens',   name: 'المهندس محمد حسن' },
    { businessId: b1.id, typeMap: supTypeMapB1, typeKey: 'utility',   name: 'وزارة الكهرباء' },
    { businessId: b2.id, typeMap: supTypeMapB2, typeKey: 'diesel',    name: 'مورد ديزل معبر' },
    { businessId: b2.id, typeMap: supTypeMapB2, typeKey: 'electric',  name: 'مورد مواد كهربائية معبر' },
  ];
  const supSubSeq = new Map<number, number>();
  let supGlobalSeq = 0;
  for (const sup of supplierSeedData) {
    const st = sup.typeMap.get(sup.typeKey)!;
    const subSeq = (supSubSeq.get(st.account.id) ?? 0) + 1;
    supSubSeq.set(st.account.id, subSeq);
    supGlobalSeq++;
    const [createdSup] = await db.insert(schema.suppliers).values({
      businessId: sup.businessId,
      accountId: st.account.id,
      supplierTypeId: st.id,
      sequenceNumber: supGlobalSeq,
      code: `${st.account.code}/${subSeq}`,
      name: sup.name,
      category: st.name,
      defaultCurrencyId: yerCurrencyId,
    } as any).returning();

    // إنشاء أرصدة للعملات الثلاث
    await db.insert(schema.supplierBalances).values(
      allThreeCurrencyIds.map(cid => ({ supplierId: createdSup.id, currencyId: cid, balance: '0', updatedAt: new Date() }))
    );
  }
  console.log('✅ الموردين (كل مورد تحت نوعه + أرصدة عملات)');

  // ===================== المخازن (حساب تحكم واحد لكل عمل) =====================
  const whsCtrlB1 = await createLinkedAccount(b1.id, 'حسابات المخازن', 'warehouse', getNatureId(b1.id, 'warehouse'));
  const whsCtrlB2 = await createLinkedAccount(b2.id, 'حسابات المخازن', 'warehouse', getNatureId(b2.id, 'warehouse'));

  const warehouseSeedData = [
    { businessId: b1.id, ctrl: whsCtrlB1, name: 'المخزن الرئيسي', warehouseType: 'main', responsiblePerson: 'علي الصعدي' },
    { businessId: b1.id, ctrl: whsCtrlB1, name: 'مخزن الدهمية', warehouseType: 'station', stationId: s1.id },
    { businessId: b1.id, ctrl: whsCtrlB1, name: 'مخزن الصبالية وجمال', warehouseType: 'station', stationId: s2.id },
    { businessId: b1.id, ctrl: whsCtrlB1, name: 'مخزن غليل', warehouseType: 'station', stationId: s3.id },
    { businessId: b2.id, ctrl: whsCtrlB2, name: 'مخزن معبر', warehouseType: 'main', stationId: s6.id },
  ];
  const whsSubSeq = new Map<number, number>();
  let whsGlobalSeq = 0;
  for (const whs of warehouseSeedData) {
    const subSeq = (whsSubSeq.get(whs.ctrl.id) ?? 0) + 1;
    whsSubSeq.set(whs.ctrl.id, subSeq);
    whsGlobalSeq++;
    const [createdWhs] = await db.insert(schema.warehouses).values({
      businessId: whs.businessId,
      accountId: whs.ctrl.id,
      sequenceNumber: whsGlobalSeq,
      code: `${whs.ctrl.code}/${subSeq}`,
      name: whs.name,
      warehouseType: whs.warehouseType as any,
      responsiblePerson: (whs as any).responsiblePerson ?? null,
      stationId: (whs as any).stationId ?? null,
      defaultCurrencyId: yerCurrencyId,
    } as any).returning();

    // إنشاء أرصدة للعملات الثلاث
    await db.insert(schema.warehouseBalances).values(
      allThreeCurrencyIds.map(cid => ({ warehouseId: createdWhs.id, currencyId: cid, balance: '0', updatedAt: new Date() }))
    );
  }
  console.log('✅ المخازن (حساب تحكم واحد لكل عمل + أرصدة عملات)');

  // ===================== العهد (حساب تحكم واحد لكل عمل) =====================
  const cusCtrlB1 = await createLinkedAccount(b1.id, 'حسابات العهد', 'custody', getNatureId(b1.id, 'custody'));

  const custodySeedData = [
    { businessId: b1.id, ctrl: cusCtrlB1, partyName: 'أكرم العباسي', partyType: 'employee', custodyType: 'permanent', contentType: 'cash', description: 'عهدة صيانة محطة الدهمية' },
    { businessId: b1.id, ctrl: cusCtrlB1, partyName: 'كمال العباسي', partyType: 'employee', custodyType: 'permanent', contentType: 'cash', description: 'عهدة مشتريات عامة' },
  ];
  const cusSubSeq = new Map<number, number>();
  for (const cus of custodySeedData) {
    const subSeq = (cusSubSeq.get(cus.ctrl.id) ?? 0) + 1;
    cusSubSeq.set(cus.ctrl.id, subSeq);
    await db.insert(schema.custodyRecords).values({
      businessId: cus.businessId,
      accountId: cus.ctrl.id,
      partyName: cus.partyName,
      partyType: cus.partyType,
      custodyType: cus.custodyType,
      contentType: cus.contentType,
      description: cus.description,
      status: 'active',
    });
  }
  console.log('✅ العهد (حساب تحكم واحد لكل عمل)');

  // ===================== ميزانية المصروفات (حساب تحكم واحد) =====================
  const bdgCtrlB1 = await createLinkedAccount(b1.id, 'حسابات الميزانية', 'budget', getNatureId(b1.id, 'budget'));

  const budgetSeedData = [
    { businessId: b1.id, ctrl: bdgCtrlB1, name: 'ميزانية الديزل الشهرية', amount: '2000000', expenseType: 'fixed' as const, month: 1, year: 2025 },
    { businessId: b1.id, ctrl: bdgCtrlB1, name: 'ميزانية الصيانة', amount: '500000', expenseType: 'variable' as const, month: 1, year: 2025 },
    { businessId: b1.id, ctrl: bdgCtrlB1, name: 'ميزانية الرواتب السنوية', amount: '30000000', expenseType: 'annual' as const, year: 2025 },
  ];
  for (const bdg of budgetSeedData) {
    await db.insert(schema.expenseBudget).values({
      businessId: bdg.businessId,
      accountId: bdg.ctrl.id,
      name: bdg.name,
      amount: bdg.amount,
      currencyId: yerCurrencyId,
      expenseType: bdg.expenseType,
      month: bdg.month ?? null,
      year: bdg.year ?? null,
    });
  }
  console.log('✅ ميزانية المصروفات (حساب تحكم واحد)');

  // ===================== أصناف المخزون =====================
  const itemSeq1 = await getNextSequence(b1.id, 'inventory_item', 0, 0, db as any);
  const itemSeq2 = await getNextSequence(b1.id, 'inventory_item', 0, 0, db as any);
  const itemSeq3 = await getNextSequence(b1.id, 'inventory_item', 0, 0, db as any);
  const itemSeq4 = await getNextSequence(b1.id, 'inventory_item', 0, 0, db as any);
  const itemSeq5 = await getNextSequence(b1.id, 'inventory_item', 0, 0, db as any);
  const itemSeq6 = await getNextSequence(b1.id, 'inventory_item', 0, 0, db as any);
  const itemSeq7 = await getNextSequence(b1.id, 'inventory_item', 0, 0, db as any);
  const itemSeq8 = await getNextSequence(b1.id, 'inventory_item', 0, 0, db as any);
  const itemSeq9 = await getNextSequence(b1.id, 'inventory_item', 0, 0, db as any);
  const itemSeq10 = await getNextSequence(b1.id, 'inventory_item', 0, 0, db as any);
  await db.insert(schema.inventoryItems).values([
    { businessId: b1.id, name: 'ديزل', code: generateItemCode('ITM', itemSeq1), category: 'وقود', unit: 'لتر' },
    { businessId: b1.id, name: 'زيت مولد - لوتس', code: generateItemCode('ITM', itemSeq2), category: 'زيوت', unit: 'برميل' },
    { businessId: b1.id, name: 'زيت مولد - إيني أجيب', code: generateItemCode('ITM', itemSeq3), category: 'زيوت', unit: 'برميل' },
    { businessId: b1.id, name: 'زيت مولد - بيل ون', code: generateItemCode('ITM', itemSeq4), category: 'زيوت', unit: 'برميل' },
    { businessId: b1.id, name: 'فلتر زيت', code: generateItemCode('ITM', itemSeq5), category: 'فلاتر', unit: 'حبة' },
    { businessId: b1.id, name: 'فلتر هواء', code: generateItemCode('ITM', itemSeq6), category: 'فلاتر', unit: 'حبة' },
    { businessId: b1.id, name: 'عداد توماس', code: generateItemCode('ITM', itemSeq7), category: 'عدادات', unit: 'حبة' },
    { businessId: b1.id, name: 'بطارية مولد', code: generateItemCode('ITM', itemSeq8), category: 'بطاريات', unit: 'حبة' },
    { businessId: b1.id, name: 'كيبل كهربائي', code: generateItemCode('ITM', itemSeq9), category: 'مواد كهربائية', unit: 'متر' },
    { businessId: b1.id, name: 'قاطع كهربائي', code: generateItemCode('ITM', itemSeq10), category: 'مواد كهربائية', unit: 'حبة' },
  ]);
  console.log('✅ أصناف المخزون');

  // ===================== الحسابات المعلقة (حسابات إدارية معلقة) =====================
  const pendingItems = [
    { businessId: b1.id, personOrEntity: 'علي الصعدي - حساب 2023', description: 'صندوق مخلوط فيه عجز - يحتاج تصفية كاملة', status: 'pending' },
    { businessId: b1.id, personOrEntity: 'أمجد الصلوي', description: 'حساب العدادات والمواد الكهربائية فيه شعبطة كبيرة', status: 'pending' },
    { businessId: b1.id, personOrEntity: 'المهندس محمد حسن', description: 'شاشات وقواطع دمج - له سنة ما كمل', status: 'pending' },
  ];

  for (const item of pendingItems) {
    // إنشاء حساب مالي فعلي لكل حساب معلق
    const account = await createLinkedAccount(
      item.businessId,
      `حساب معلق - ${item.personOrEntity}`,
      'pending',
      getNatureId(item.businessId, 'pending'),
    );

    // إنشاء سجل في pending_accounts مع ربطه بالحساب
    await db.insert(schema.pendingAccounts).values({
      businessId: item.businessId,
      personOrEntity: item.personOrEntity,
      description: item.description,
      status: item.status as 'pending' | 'in_progress' | 'resolved' | 'written_off',
      accountId: account.id,
    });
  }
  console.log('✅ الحسابات المعلقة');

  // ===================== الحسابات الوسيطة (عمليات قيد الانتظار) =====================
  // حسابات وسيطة للعمليات التشغيلية (فواتير مشتريات، تحويلات مخازن، إلخ)
  const intermediaryAccounts = [
    { name: 'فواتير مشتريات قيد الاستلام', description: 'فواتير تم تسجيلها وبانتظار إدخال المخزن' },
    { name: 'تحويلات مخزنية قيد الاستلام', description: 'تحويلات تم إرسالها وبانتظار الاستلام' },
    { name: 'طلبات توريد قيد المعالجة', description: 'طلبات توريد بانتظار وصول البضاعة' },
  ];

  for (const intAcc of intermediaryAccounts) {
    await createLinkedAccount(
      b1.id,
      intAcc.name,
      'intermediary',
      getNatureId(b1.id, 'intermediary'),
    );
  }
  console.log('✅ الحسابات الوسيطة');

  // ===================== حساب فروقات العملة (مطلوب للعمليات بعملات أجنبية) =====================
  const exchangeDiffAccounts: Record<number, number> = {};
  for (const biz of [b1, b2, b3]) {
    const diffAccount = await createLinkedAccount(
      biz.id,
      'فروقات عملة',
      'intermediary',
      getNatureId(biz.id, 'intermediary'),
    );
    exchangeDiffAccounts[biz.id] = diffAccount.id;
  }
  console.log('✅ حسابات فروقات العملة');

  // ===================== أسعار الصرف الافتراضية =====================
  {
    const today = new Date().toISOString().split('T')[0];
    for (const biz of [b1, b2, b3]) {
      await db.insert(schema.exchangeRates).values([
        { businessId: biz.id, fromCurrencyId: sarCurrencyId, toCurrencyId: yerCurrencyId, rate: '140', effectiveDate: today, source: 'seed' },
        { businessId: biz.id, fromCurrencyId: usdCurrencyId, toCurrencyId: yerCurrencyId, rate: '535', effectiveDate: today, source: 'seed' },
      ]);
    }
    console.log('✅ أسعار الصرف الافتراضية');

    // ===================== ربط العملات بالحسابات الفرعية =====================
    const leafAccounts = await db.select({ id: schema.accounts.id, businessId: schema.accounts.businessId })
      .from(schema.accounts)
      .where(eq(schema.accounts.isLeafAccount, true));

    const accountCurrencyRows: { accountId: number; currencyId: number; isDefault: boolean }[] = [];
    for (const acc of leafAccounts) {
      // كل حساب يدعم العملات الثلاث — الريال اليمني افتراضي
      accountCurrencyRows.push({ accountId: acc.id, currencyId: yerCurrencyId, isDefault: true });
      accountCurrencyRows.push({ accountId: acc.id, currencyId: sarCurrencyId, isDefault: false });
      accountCurrencyRows.push({ accountId: acc.id, currencyId: usdCurrencyId, isDefault: false });
    }
    if (accountCurrencyRows.length > 0) {
      await db.insert(schema.accountCurrencies).values(accountCurrencyRows);
    }
    console.log('✅ ربط العملات الثلاث بالحسابات (' + accountCurrencyRows.length + ' سجل = ' + leafAccounts.length + ' حساب × 3 عملات)');
  }

  // ===================== أنظمة الفوترة (6 أنظمة) مع حسابات تحكم =====================
  const billingSystems = [
    { name: 'المغربي نسخة 1 (الدهمية)',       systemKey: 'moghrabi_v1',     icon: 'receipt',      color: '#10b981', stationMode: 'per_station',   sortOrder: 1 },
    { name: 'المغربي نسخة 2 (الصبالية وجمال)', systemKey: 'moghrabi_v2',     icon: 'receipt',      color: '#059669', stationMode: 'per_station',   sortOrder: 2 },
    { name: 'المغربي نسخة 3 (غليل)',           systemKey: 'moghrabi_v3',     icon: 'receipt',      color: '#047857', stationMode: 'per_station',   sortOrder: 3 },
    { name: 'صندوق الدعم',                     systemKey: 'support_fund',    icon: 'support',      color: '#3b82f6', stationMode: 'per_station',   sortOrder: 4 },
    { name: 'صندوق الدعم - الساحل الغربي',    systemKey: 'support_fund_west',icon: 'support',      color: '#2563eb', stationMode: 'per_station',   sortOrder: 5 },
    { name: 'الدفع المسبق',                    systemKey: 'prepaid',         icon: 'credit_card',  color: '#8b5cf6', stationMode: 'multi_station', sortOrder: 6 },
  ];
  const [billingNature] = await db.select({ id: schema.accountSubNatures.id })
    .from(schema.accountSubNatures)
    .where(eq(schema.accountSubNatures.natureKey, 'billing'))
    .limit(1);

  const billingConfigs: typeof schema.billingSystemsConfig.$inferSelect[] = [];
  for (const bsys of billingSystems) {
    const { code: bCode, sequenceNumber: bSeq } = await generateLeafAccountCode(b1.id, 'billing', db as any);
    const [bAcc] = await db.insert(schema.accounts).values({
      businessId: b1.id,
      name: bsys.name,
      accountType: 'billing',
      accountSubNatureId: billingNature?.id ?? null,
      code: bCode,
      sequenceNumber: bSeq,
      isLeafAccount: true,
      isActive: true,
    }).returning();
    const [bCfg] = await db.insert(schema.billingSystemsConfig).values({
      businessId: b1.id,
      ...bsys,
      accountId: bAcc.id,
    }).returning();
    billingConfigs.push(bCfg);
  }
  console.log('✅ أنظمة الفوترة (6 أنظمة مع حسابات تحكم: BIL-01 → BIL-06)');
  const billingConfigMap = Object.fromEntries(billingConfigs.map(bc => [bc.systemKey, bc.id]));
  const billingSystemAccountMap = Object.fromEntries(billingConfigs.map(bc => [bc.systemKey, bc.accountId]));

  // ===================== أنواع حسابات الفوترة =====================
  await db.insert(schema.billingAccountTypes).values([
    { businessId: b1.id, name: 'تحصيل نقدي بالجوال', description: 'تحصيل الفواتير نقداً عبر الجوال' },
    { businessId: b1.id, name: 'تحصيل إسناد يدوي', description: 'تحصيل الفواتير بالإسناد اليدوي' },
    { businessId: b1.id, name: 'سداد إلكتروني', description: 'سداد الفواتير إلكترونياً' },
  ]);
  console.log('✅ أنواع حسابات الفوترة');

  // ===================== حسابات الفوترة للموظفين =====================
  // إنشاء حساب فوترة لكل موظف حسب أنظمة الفوترة في محطته
  const BILLING_SYSTEM_LABELS: Record<string, string> = {
    moghrabi_v1: 'المغربي', moghrabi_v2: 'المغربي', moghrabi_v3: 'المغربي',
    support_fund: 'صندوق الدعم', support_fund_west: 'صندوق الدعم - الساحل',
    prepaid: 'الدفع المسبق',
  };
  const stationsWithBilling = [
    { station: s1, systems: ['moghrabi_v1', 'support_fund', 'prepaid'] },
    { station: s2, systems: ['moghrabi_v2', 'support_fund', 'prepaid'] },
    { station: s3, systems: ['moghrabi_v3', 'support_fund', 'prepaid'] },
  ];
  const allEmps = await db.select().from(schema.employees).where(eq(schema.employees.businessId, b1.id));
  for (const { station, systems } of stationsWithBilling) {
    const stationEmps = allEmps.filter(e => e.stationId === station.id);
    for (const emp of stationEmps) {
      for (const sys of systems) {
        const sysId = billingConfigMap[sys];
        if (!sysId) continue;
        const sysAccountId = billingSystemAccountMap[sys] ?? null;
        await db.insert(schema.employeeBillingAccounts).values({
          employeeId: emp.id, stationId: station.id,
          billingSystemId: sysId, collectionMethod: 'cash_mobile',
          label: `${BILLING_SYSTEM_LABELS[sys] || sys} - ${emp.fullName}`,
          accountId: sysAccountId,
        });
      }
    }
  }
  console.log('✅ حسابات الفوترة للموظفين (مرتبطة بحسابات تحكم BIL-XX)');

  // ===================== ربط الكيانات التشغيلية بحسابات مالية =====================
  // الموردون / المخازن / الموظفون / الشركاء: يُنشأون مع حساباتهم مباشرة (Phase 12)
  // الصناديق القديمة بدون حساب: fallback للتوافق
  const missingFunds = await db.select().from(schema.funds).where(isNull(schema.funds.accountId));
  for (const fund of missingFunds) {
    const account = await createLinkedAccount(
      fund.businessId, fund.name, 'fund',
      getNatureId(fund.businessId, 'fund'), fund.code, fund.sequenceNumber,
    );
    await db.update(schema.funds)
      .set({ accountId: account.id, code: account.code, sequenceNumber: account.sequenceNumber, updatedAt: new Date() })
      .where(eq(schema.funds.id, fund.id));
  }

  // ربط حسابات الفوترة للموظفين بحسابات تحكم أنظمتها (fallback لأي سجل بدون accountId)
  const missingBillingAccounts = await db
    .select({
      id: schema.employeeBillingAccounts.id,
      billingSystemId: schema.employeeBillingAccounts.billingSystemId,
    })
    .from(schema.employeeBillingAccounts)
    .where(isNull(schema.employeeBillingAccounts.accountId));
  if (missingBillingAccounts.length > 0) {
    // جلب خريطة billingSystemId → accountId من billing_systems_config
    const sysConfigs = await db
      .select({ id: schema.billingSystemsConfig.id, accountId: schema.billingSystemsConfig.accountId })
      .from(schema.billingSystemsConfig);
    const sysToAccount = new Map(sysConfigs.map(s => [s.id, s.accountId]));
    for (const ba of missingBillingAccounts) {
      const ctrlAccountId = sysToAccount.get(ba.billingSystemId) ?? null;
      if (!ctrlAccountId) continue;
      await db
        .update(schema.employeeBillingAccounts)
        .set({ accountId: ctrlAccountId })
        .where(eq(schema.employeeBillingAccounts.id, ba.id));
    }
    console.log(`✅ ربط ${missingBillingAccounts.length} حساب فوترة بحسابات تحكم أنظمتها`);
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
      { sectionId: sec4.id, screenKey: 'register_operation', label: 'تسجيل عملية', icon: 'add_circle', route: '/biz/{bizId}/register-operation', sortOrder: 2 },
      { sectionId: sec4.id, screenKey: 'journal', label: 'القيود المحاسبية', icon: 'menu_book', route: '/biz/{bizId}/journal', sortOrder: 3 },
      { sectionId: sec4.id, screenKey: 'journal_categories', label: 'تصنيفات القيود', icon: 'label', route: '/biz/{bizId}/journal-categories', sortOrder: 4 },
      { sectionId: sec4.id, screenKey: 'attachments_archive', label: 'الأرشفة الإلكترونية', icon: 'folder_open', route: '/biz/{bizId}/attachments-archive', sortOrder: 5 },
    ]);

    // --- الوحدة 5: القوالب والترقيم ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec5.id, screenKey: 'operation_categories', label: 'أصناف العمليات', icon: 'folder_special', route: '/biz/{bizId}/operation-categories', sortOrder: 1 },
      { sectionId: sec5.id, screenKey: 'operation_types', label: 'أنواع العمليات', icon: 'category', route: '/biz/{bizId}/operation-types', sortOrder: 2 },
      { sectionId: sec5.id, screenKey: 'inventory_item_types', label: 'أنواع الأصناف', icon: 'inventory_2', route: '/biz/{bizId}/inventory-item-types', sortOrder: 3 },
      { sectionId: sec5.id, screenKey: 'departments', label: 'الأقسام', icon: 'groups', route: '/biz/{bizId}/departments', sortOrder: 4 },
      { sectionId: sec5.id, screenKey: 'job_titles', label: 'المسميات الوظيفية', icon: 'badge', route: '/biz/{bizId}/job-titles', sortOrder: 5 },
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
      { sectionId: sec9.id, screenKey: 'fiscal_periods', label: 'الفترات المالية', icon: 'date_range', route: '/biz/{bizId}/fiscal-periods', sortOrder: 3 },
    ];
    await db.insert(schema.sidebarItems).values(reportItems);

    // --- الوحدة 10: بناء الواجهات ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec10.id, screenKey: 'custom_screens', label: 'الشاشات المخصصة', icon: 'space_dashboard', route: '/biz/{bizId}/custom-screens', sortOrder: 1 },
      { sectionId: sec10.id, screenKey: 'ui_builder', label: 'بناء الواجهات', icon: 'dashboard_customize', route: '/biz/{bizId}/ui-builder', sortOrder: 2 },
    ]);

    // --- الوحدة 11: العملات وأسعار الصرف ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec11.id, screenKey: 'exchange_rates', label: 'العملات وأسعار الصرف', icon: 'currency_exchange', route: '/biz/{bizId}/exchange-rates', sortOrder: 1 },
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

  // ===================== السنوات المالية والفترات =====================
  const fiscalConfig = [
    { bizId: b1.id, startYear: 2018, endYear: 2026 }, // المحطات
    { bizId: b2.id, startYear: 2022, endYear: 2026 }, // محطة معبر
    { bizId: b3.id, startYear: 2016, endYear: 2026 }, // أعمال شخصية
  ];

  for (const cfg of fiscalConfig) {
    for (let y = cfg.startYear; y <= cfg.endYear; y++) {
      const [fy] = await db.insert(schema.fiscalYears).values({
        businessId: cfg.bizId,
        year: y,
        startDate: `${y}-01-01`,
        endDate: `${y}-12-31`,
      }).returning();

      const periods = [];
      for (let m = 1; m <= 12; m++) {
        const lastDay = new Date(y, m, 0).getDate();
        periods.push({
          businessId: cfg.bizId,
          fiscalYearId: fy.id,
          month: m,
          startDate: `${y}-${String(m).padStart(2, '0')}-01`,
          endDate: `${y}-${String(m).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`,
        });
      }
      await db.insert(schema.fiscalPeriods).values(periods);
    }
  }
  console.log('✅ السنوات المالية والفترات');

  console.log('\n🎉 تم تهيئة جميع البيانات بنجاح!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ خطأ:', err);
  process.exit(1);
});
