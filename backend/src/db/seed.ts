import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, isNull } from 'drizzle-orm';
import postgres from 'postgres';
import * as schema from './schema/index.ts';
import bcrypt from 'bcryptjs';
import { generateLeafAccountCode } from '../middleware/sequencing.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:774424555@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

/**
 * تهيئة البيانات الأولية للنظام
 * 
 * ملاحظة: تم تحديث آلية الترقيم لتعكس النظام الصحيح:
 * - الحسابات الفرعية: تأخذ كود حسب النوع (FND-01, BNK-01, WHS-01, SUP-01, إلخ)
 * - التصنيفات (fund_types, bank_types): للتنظيم والفلترة فقط
 * - الترقيم يعتمد على أنواع الحسابات الفرعية (account_sub_natures)
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
  await db.insert(schema.currencies).values([
    { code: 'YER', nameAr: 'ريال يمني', symbol: 'ر.ي', exchangeRate: '1', isDefault: true },
    { code: 'SAR', nameAr: 'ريال سعودي', symbol: 'ر.س', exchangeRate: '165' },
    { code: 'USD', nameAr: 'دولار أمريكي', symbol: '$', exchangeRate: '540' },
  ]);
  console.log('✅ العملات');

  // ===================== الأعمال (المحور الرئيسي) =====================
  const [b1] = await db.insert(schema.businesses).values({ name: 'المحطات', code: 'stations', description: 'شراكة المحطات الأربع مع محمد المراني - الدهمية، الصبالية وجمال، غليل، الساحل الغربي', icon: 'bolt', color: '#f59e0b', sortOrder: 1 }).returning();
  const [b2] = await db.insert(schema.businesses).values({ name: 'محطة معبر', code: 'mabar', description: 'شراكة محطة معبر مع عمر إسحاق وإبراهيم نجم الدين', icon: 'flash_on', color: '#22c55e', sortOrder: 2 }).returning();
  const [b3] = await db.insert(schema.businesses).values({ name: 'أعمال شخصية', code: 'personal', description: 'حسابات المالك الشخصية وأعماله الخاصة', icon: 'account_circle', color: '#6366f1', sortOrder: 3 }).returning();
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

  // ===================== شركاء العمل =====================
  await db.insert(schema.businessPartners).values([
    { businessId: b1.id, fullName: 'المالك (أنت)', sharePercentage: '50', role: 'مالك' },
    { businessId: b1.id, fullName: 'محمد المراني', sharePercentage: '50', role: 'شريك' },
    { businessId: b2.id, fullName: 'المالك (أنت)', sharePercentage: '34', role: 'مالك' },
    { businessId: b2.id, fullName: 'عمر إسحاق', sharePercentage: '33', role: 'شريك' },
    { businessId: b2.id, fullName: 'إبراهيم نجم الدين', sharePercentage: '33', role: 'شريك' },
  ]);
  console.log('✅ الشركاء');

  // ===================== المحطات =====================
  const [s1] = await db.insert(schema.stations).values({ businessId: b1.id, name: 'الدهمية', code: 'DHM', location: 'الدهمية', billingSystems: ['moghrabi_v1', 'support_fund', 'prepaid'] }).returning();
  const [s2] = await db.insert(schema.stations).values({ businessId: b1.id, name: 'الصبالية وجمال', code: 'SBL', location: 'الصبالية وجمال', billingSystems: ['moghrabi_v2', 'support_fund', 'prepaid'] }).returning();
  const [s3] = await db.insert(schema.stations).values({ businessId: b1.id, name: 'غليل', code: 'GHL', location: 'غليل', billingSystems: ['moghrabi_v3', 'support_fund', 'prepaid'] }).returning();
  const [s4] = await db.insert(schema.stations).values({ businessId: b1.id, name: 'الساحل الغربي', code: 'WST', location: 'الساحل الغربي', billingSystems: ['support_fund_west'], hasEmployees: false, notes: 'نقطة مولعة من محطة الشريك' }).returning();
  const [s5] = await db.insert(schema.stations).values({ businessId: b1.id, name: 'الإدارة', code: 'ADM', location: 'المكتب الرئيسي', billingSystems: [], notes: 'المكتب الإداري' }).returning();
  const [s6] = await db.insert(schema.stations).values({ businessId: b2.id, name: 'محطة معبر', code: 'MBR', location: 'معبر', billingSystems: ['moghrabi_v3'] }).returning();
  console.log('✅ المحطات');

  // ===================== الموظفين =====================
  // الإدارة
  await db.insert(schema.employees).values([
    { businessId: b1.id, fullName: 'علي الصعدي', jobTitle: 'محاسب ومفوتر', stationId: s5.id, department: 'الإدارة', salary: '300000', salaryCurrency: 'YER', monthlyAllowance: '3000', notes: 'محاسب + مفوتر للمحطات' },
  ]);
  // الدهمية
  await db.insert(schema.employees).values([
    { businessId: b1.id, fullName: 'رايد العباسي', jobTitle: 'مدير المحطة', stationId: s1.id, department: 'الدهمية', salary: '280000' },
    { businessId: b1.id, fullName: 'ابراهيم فارع', jobTitle: 'فني المولد', stationId: s1.id, department: 'الدهمية', salary: '170000' },
    { businessId: b1.id, fullName: 'عبدالله طالب', jobTitle: 'متحصل', stationId: s1.id, department: 'الدهمية', salary: '90000' },
    { businessId: b1.id, fullName: 'سلطان الريمي', jobTitle: 'كهربائي', stationId: s1.id, department: 'الدهمية', salary: '150000' },
    { businessId: b1.id, fullName: 'حسن فهد', jobTitle: 'كهربائي', stationId: s1.id, department: 'الدهمية', salary: '110000' },
  ]);
  // الصبالية وجمال
  await db.insert(schema.employees).values([
    { businessId: b1.id, fullName: 'علي المجهلي', jobTitle: 'مدير المحطة', stationId: s2.id, department: 'الصبالية وجمال', salary: '250000' },
    { businessId: b1.id, fullName: 'خالد أبو الرجال', stationId: s2.id, department: 'الصبالية وجمال', salary: '200000' },
    { businessId: b1.id, fullName: 'عزيز أبو الرجال', stationId: s2.id, department: 'الصبالية وجمال', salary: '180000' },
    { businessId: b1.id, fullName: 'قايد حسين العباسي', stationId: s2.id, department: 'الصبالية وجمال', salary: '180000' },
    { businessId: b1.id, fullName: 'محمد ابراهيم', stationId: s2.id, department: 'الصبالية وجمال', salary: '150000' },
    { businessId: b1.id, fullName: 'محمد صغير', stationId: s2.id, department: 'الصبالية وجمال', salary: '90000' },
    { businessId: b1.id, fullName: 'عبدالخالق المزعقي', stationId: s2.id, department: 'الصبالية وجمال', salary: '150000' },
    { businessId: b1.id, fullName: 'وائل بشر', stationId: s2.id, department: 'الصبالية وجمال', salary: '150000' },
    { businessId: b1.id, fullName: 'علاء الصعدي', stationId: s2.id, department: 'الصبالية وجمال', salary: '100000' },
    { businessId: b1.id, fullName: 'جودة', stationId: s2.id, department: 'الصبالية وجمال', salary: '90000' },
  ]);
  // غليل
  await db.insert(schema.employees).values([
    { businessId: b1.id, fullName: 'قايد حسن العباسي', jobTitle: 'مدير المحطة', stationId: s3.id, department: 'غليل', salary: '400000' },
    { businessId: b1.id, fullName: 'مهند العباسي', stationId: s3.id, department: 'غليل', salary: '100000' },
    { businessId: b1.id, fullName: 'معين العباسي', stationId: s3.id, department: 'غليل', salary: '170000' },
    { businessId: b1.id, fullName: 'أحمد المغربي', stationId: s3.id, department: 'غليل', salary: '120000' },
    { businessId: b1.id, fullName: 'مراد جريب', stationId: s3.id, department: 'غليل', salary: '150000' },
    { businessId: b1.id, fullName: 'سامي الحرازي', stationId: s3.id, department: 'غليل', salary: '130000' },
    { businessId: b1.id, fullName: 'عبدة الفيراني', stationId: s3.id, department: 'غليل', salary: '60000' },
    { businessId: b1.id, fullName: 'الأبجة', stationId: s3.id, department: 'غليل', salary: '60000' },
  ]);
  // خارجي
  await db.insert(schema.employees).values([
    { businessId: b1.id, fullName: 'قايد العباسي', jobTitle: 'متابعة مواقع فورجي وسنترال', department: 'خارجي', salary: '0', notes: 'يفوتر ويتحصل شهرياً ويودع لحسابات المالك' },
  ]);
  // معبر
  await db.insert(schema.employees).values([
    { businessId: b2.id, fullName: 'حسن المعبري', jobTitle: 'مدير محطة', stationId: s6.id, department: 'معبر', salary: '180000' },
    { businessId: b2.id, fullName: 'سعيد أحمد', jobTitle: 'محصل', stationId: s6.id, department: 'معبر', salary: '120000' },
    { businessId: b2.id, fullName: 'منصور علي', jobTitle: 'فني', stationId: s6.id, department: 'معبر', salary: '130000' },
    { businessId: b2.id, fullName: 'زياد محمد', jobTitle: 'محصل', stationId: s6.id, department: 'معبر', salary: '110000' },
  ]);
  console.log('✅ الموظفين');

  // ===================== الحسابات والمحافظ =====================
  const accountSeedRows: (typeof schema.accounts.$inferInsert)[] = [
    // محافظ إلكترونية - المحطات
    { businessId: b1.id, name: 'جوالي 1 - شخصي', accountType: 'e_wallet' as const, accountNumber: '774424555', provider: 'جوالي', subType: 'شخصي', receivesFromStations: true },
    { businessId: b1.id, name: 'جوالي 2 - شخصي', accountType: 'e_wallet' as const, accountNumber: '771506017', provider: 'جوالي', subType: 'شخصي' },
    { businessId: b1.id, name: 'جوالي 3 - وكيل', accountType: 'e_wallet' as const, accountNumber: '774424555', provider: 'جوالي', subType: 'وكيل' },
    { businessId: b1.id, name: 'جيب', accountType: 'e_wallet' as const, accountNumber: '774424555', provider: 'جيب', receivesFromStations: true },
    { businessId: b1.id, name: 'ون كاش', accountType: 'e_wallet' as const, accountNumber: '774424555', provider: 'ون كاش', receivesFromStations: true },
    // بنوك
    { businessId: b1.id, name: 'كريمي الحديدة - جاري', accountType: 'bank' as const, provider: 'الكريمي', subType: 'جاري', receivesFromStations: true },
    { businessId: b1.id, name: 'كريمي الحديدة - توفير', accountType: 'bank' as const, provider: 'الكريمي', subType: 'توفير' },
    { businessId: b1.id, name: 'كريمي صنعاء - جاري', accountType: 'bank' as const, provider: 'الكريمي', subType: 'جاري' },
    { businessId: b1.id, name: 'كريمي صنعاء - توفير', accountType: 'bank' as const, provider: 'الكريمي', subType: 'توفير' },
    // خدمة حاسب (محفظة إلكترونية)
    { businessId: b1.id, name: 'حاسب - رئيسي', accountType: 'e_wallet' as const, provider: 'خدمة حاسب', subType: 'رئيسي', supportedCurrencies: ['YER'], receivesFromStations: true },
    { businessId: b1.id, name: 'حاسب - نقطة 1', accountType: 'e_wallet' as const, provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 2', accountType: 'e_wallet' as const, provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 3', accountType: 'e_wallet' as const, provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 4', accountType: 'e_wallet' as const, provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 5', accountType: 'e_wallet' as const, provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 6', accountType: 'e_wallet' as const, provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 7', accountType: 'e_wallet' as const, provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    // الصرافين
    { businessId: b1.id, name: 'الحوشبي - باسم المحطات', accountType: 'exchange' as const, provider: 'الحوشبي', receivesFromStations: true },
    { businessId: b1.id, name: 'الحوشبي - باسم المالك', accountType: 'exchange' as const, provider: 'الحوشبي' },
    { businessId: b1.id, name: 'النجم', accountType: 'exchange' as const, provider: 'النجم', receivesFromStations: true },
    { businessId: b1.id, name: 'ابن عامر', accountType: 'exchange' as const, provider: 'ابن عامر', isActive: false },
    { businessId: b1.id, name: 'النهمي - المحطات', accountType: 'exchange' as const, provider: 'النهمي', isActive: false },
    { businessId: b1.id, name: 'النهمي - محمد المراني', accountType: 'exchange' as const, provider: 'النهمي', isActive: false },
    { businessId: b1.id, name: 'النهمي - الرئيسي', accountType: 'exchange' as const, provider: 'النهمي', isActive: false },
    // نقد وخزائن (تحت نوع fund)
    { businessId: b1.id, name: 'خزنة المالك الشخصية', accountType: 'fund' as const, subType: 'خزنة' },
    { businessId: b1.id, name: 'النقد الشخصي (كاش)', accountType: 'fund' as const, subType: 'كاش' },
    // عهد
    { businessId: b1.id, name: 'عهدة أكرم العباسي', accountType: 'custody' as const },
    { businessId: b1.id, name: 'عهدة كمال العباسي', accountType: 'custody' as const },
    // مخازن
    { businessId: b1.id, name: 'حساب المخزن الرئيسي', accountType: 'warehouse' as const, subType: 'رئيسي', responsiblePerson: 'علي الصعدي' },
    { businessId: b1.id, name: 'حساب مخزن الدهمية', accountType: 'warehouse' as const, subType: 'محطة' },
    { businessId: b1.id, name: 'حساب مخزن الصبالية وجمال', accountType: 'warehouse' as const, subType: 'محطة' },
    { businessId: b1.id, name: 'حساب مخزن غليل', accountType: 'warehouse' as const, subType: 'محطة' },
    // معبر
    { businessId: b2.id, name: 'جوالي - معبر', accountType: 'e_wallet' as const, provider: 'جوالي', receivesFromStations: true },
    { businessId: b2.id, name: 'ون كاش - معبر', accountType: 'e_wallet' as const, provider: 'ون كاش', receivesFromStations: true },
    { businessId: b2.id, name: 'خزنة معبر', accountType: 'fund' as const },
    // شخصي
    { businessId: b3.id, name: 'حساب شخصي - جوالي', accountType: 'e_wallet' as const, provider: 'جوالي' },
    { businessId: b3.id, name: 'حساب شخصي - كريمي', accountType: 'bank' as const, provider: 'بنك الكريمي' },
    { businessId: b3.id, name: 'خزنة شخصية', accountType: 'fund' as const },
  ];

  // إنشاء الحسابات باستخدام آلية الترقيم الصحيحة
  const normalizedAccounts: any[] = [];
  for (const row of accountSeedRows) {
    const natureId =
      row.accountType
        ? businessNatureByKey.get(row.businessId)?.[row.accountType]
        : undefined;

    // استخدام آلية الترقيم الصحيحة حسب النوع
    const natureKey = row.accountType || 'accounting';
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

  await db.insert(schema.accounts).values(normalizedAccounts);
  console.log('✅ الحسابات');

  // ===================== الصناديق =====================
  await db.insert(schema.funds).values([
    // المحطات
    { businessId: b1.id, name: 'صندوق التحصيل - الدهمية', fundType: 'collection', stationId: s1.id, responsiblePerson: 'رايد العباسي' },
    { businessId: b1.id, name: 'صندوق التحصيل - الصبالية وجمال', fundType: 'collection', stationId: s2.id, responsiblePerson: 'علي المجهلي' },
    { businessId: b1.id, name: 'صندوق التحصيل - غليل', fundType: 'collection', stationId: s3.id, responsiblePerson: 'قايد حسن العباسي' },
    { businessId: b1.id, name: 'صندوق سلف الموظفين - الدهمية', fundType: 'salary_advance', stationId: s1.id },
    { businessId: b1.id, name: 'صندوق سلف الموظفين - الصبالية وجمال', fundType: 'salary_advance', stationId: s2.id },
    { businessId: b1.id, name: 'صندوق سلف الموظفين - غليل', fundType: 'salary_advance', stationId: s3.id },
    { businessId: b1.id, name: 'صندوق العهدة - الدهمية', fundType: 'custody', stationId: s1.id },
    { businessId: b1.id, name: 'صندوق العهدة - الصبالية وجمال', fundType: 'custody', stationId: s2.id },
    { businessId: b1.id, name: 'صندوق العهدة - غليل', fundType: 'custody', stationId: s3.id },
    // صناديق علي صعدي
    { businessId: b1.id, name: 'صندوق 2023 - علي صعدي', fundType: 'deposit', responsiblePerson: 'علي الصعدي', description: 'صندوق مخلوط - معلق يحتاج تصفية', isActive: false },
    { businessId: b1.id, name: 'الخزنة - علي صعدي', fundType: 'safe', responsiblePerson: 'علي الصعدي' },
    { businessId: b1.id, name: 'صندوق الخرج - علي صعدي', fundType: 'expense', responsiblePerson: 'علي الصعدي' },
    { businessId: b1.id, name: 'صندوق التوريدات - علي صعدي', fundType: 'deposit', responsiblePerson: 'علي الصعدي' },
    // معبر
    { businessId: b2.id, name: 'صندوق تحصيل معبر', fundType: 'collection', stationId: s6.id, responsiblePerson: 'حسن المعبري' },
    { businessId: b2.id, name: 'خزنة معبر', fundType: 'safe', responsiblePerson: 'حسن المعبري' },
  ]);
  console.log('✅ الصناديق');

  // ===================== الموردين =====================
  await db.insert(schema.suppliers).values([
    { businessId: b1.id, name: 'محمود الحجة', category: 'ديزل' },
    { businessId: b1.id, name: 'الوتاري (لوتس)', category: 'زيت' },
    { businessId: b1.id, name: 'الحجاجي (إيني أجيب)', category: 'زيت' },
    { businessId: b1.id, name: 'أحمد هادي (بيل ون)', category: 'زيت' },
    { businessId: b1.id, name: 'أمجد الصلوي', category: 'عدادات ومواد كهربائية' },
    { businessId: b1.id, name: 'موسى الصباري', category: 'بطاريات' },
    { businessId: b1.id, name: 'المهندس محمد حسن', category: 'شاشات وقواطع' },
    { businessId: b1.id, name: 'وزارة الكهرباء', category: 'عائد شهري' },
    { businessId: b2.id, name: 'مورد ديزل معبر', category: 'ديزل' },
    { businessId: b2.id, name: 'مورد مواد كهربائية معبر', category: 'مواد كهربائية' },
  ]);
  console.log('✅ الموردين');

  // ===================== المخازن =====================
  await db.insert(schema.warehouses).values([
    { businessId: b1.id, name: 'المخزن الرئيسي', warehouseType: 'main', responsiblePerson: 'علي الصعدي' },
    { businessId: b1.id, name: 'مخزن الدهمية', warehouseType: 'station', stationId: s1.id },
    { businessId: b1.id, name: 'مخزن الصبالية وجمال', warehouseType: 'station', stationId: s2.id },
    { businessId: b1.id, name: 'مخزن غليل', warehouseType: 'station', stationId: s3.id },
    { businessId: b2.id, name: 'مخزن معبر', warehouseType: 'main', stationId: s6.id },
  ]);
  console.log('✅ المخازن');

  // ===================== أصناف المخزون =====================
  await db.insert(schema.inventoryItems).values([
    { businessId: b1.id, name: 'ديزل', code: 'DSL', category: 'وقود', unit: 'لتر' },
    { businessId: b1.id, name: 'زيت مولد - لوتس', code: 'OIL-LTS', category: 'زيوت', unit: 'برميل' },
    { businessId: b1.id, name: 'زيت مولد - إيني أجيب', code: 'OIL-ENI', category: 'زيوت', unit: 'برميل' },
    { businessId: b1.id, name: 'زيت مولد - بيل ون', code: 'OIL-BLN', category: 'زيوت', unit: 'برميل' },
    { businessId: b1.id, name: 'فلتر زيت', code: 'FLT-OIL', category: 'فلاتر', unit: 'حبة' },
    { businessId: b1.id, name: 'فلتر هواء', code: 'FLT-AIR', category: 'فلاتر', unit: 'حبة' },
    { businessId: b1.id, name: 'عداد توماس', code: 'MTR-TMS', category: 'عدادات', unit: 'حبة' },
    { businessId: b1.id, name: 'بطارية مولد', code: 'BAT', category: 'بطاريات', unit: 'حبة' },
    { businessId: b1.id, name: 'كيبل كهربائي', code: 'CBL', category: 'مواد كهربائية', unit: 'متر' },
    { businessId: b1.id, name: 'قاطع كهربائي', code: 'BRK', category: 'مواد كهربائية', unit: 'حبة' },
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
      ...item,
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

  // ===================== أنظمة الفوترة (5 أنظمة) =====================
  const billingConfigs = await db.insert(schema.billingSystemsConfig).values([
    { businessId: b1.id, name: 'المغربي نسخة 1 (الدهمية)', systemKey: 'moghrabi_v1', icon: 'receipt', color: '#10b981', stationMode: 'per_station', sortOrder: 1 },
    { businessId: b1.id, name: 'المغربي نسخة 2 (الصبالية وجمال)', systemKey: 'moghrabi_v2', icon: 'receipt', color: '#059669', stationMode: 'per_station', sortOrder: 2 },
    { businessId: b1.id, name: 'المغربي نسخة 3 (غليل)', systemKey: 'moghrabi_v3', icon: 'receipt', color: '#047857', stationMode: 'per_station', sortOrder: 3 },
    { businessId: b1.id, name: 'صندوق الدعم', systemKey: 'support_fund', icon: 'support', color: '#3b82f6', stationMode: 'per_station', sortOrder: 4 },
    { businessId: b1.id, name: 'صندوق الدعم - الساحل الغربي', systemKey: 'support_fund_west', icon: 'support', color: '#2563eb', stationMode: 'per_station', sortOrder: 5 },
    { businessId: b1.id, name: 'الدفع المسبق', systemKey: 'prepaid', icon: 'credit_card', color: '#8b5cf6', stationMode: 'multi_station', sortOrder: 6 },
  ]).returning();
  console.log('✅ أنظمة الفوترة (6 أنظمة: 3 مغربي + 2 صندوق الدعم + الدفع المسبق)');
  const billingConfigMap = Object.fromEntries(billingConfigs.map(bc => [bc.systemKey, bc.id]));

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
        await db.insert(schema.employeeBillingAccounts).values({
          employeeId: emp.id, stationId: station.id,
          billingSystemId: sysId, collectionMethod: 'cash_mobile',
          label: `${BILLING_SYSTEM_LABELS[sys] || sys} - ${emp.fullName}`,
        });
      }
    }
  }
  console.log('✅ حسابات الفوترة للموظفين');

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
      { sectionId: sec12.id, screenKey: 'settlements', label: 'التصفيات', icon: 'balance', route: '/biz/{bizId}/settlements', sortOrder: 1 },
    ];
    if (bizType === 'stations') {
      pendingItems.push(
        { sectionId: sec12.id, screenKey: 'pending_accounts', label: 'حسابات معلقة', icon: 'warning', route: '/biz/{bizId}/pending', badge: 3, badgeColor: 'red', sortOrder: 2 },
      );
    }
    await db.insert(schema.sidebarItems).values(pendingItems);

    // --- الوحدة 13: الرواتب والميزانية ---
    await db.insert(schema.sidebarItems).values([
      { sectionId: sec13.id, screenKey: 'expense_categories', label: 'تصنيفات المصروفات', icon: 'category', route: '/biz/{bizId}/expense-categories', sortOrder: 1 },
      { sectionId: sec13.id, screenKey: 'expense_budget', label: 'ميزانية المصروفات', icon: 'account_balance_wallet', route: '/biz/{bizId}/expense-budget', sortOrder: 2 },
      { sectionId: sec13.id, screenKey: 'salaries', label: 'الرواتب', icon: 'payments', route: '/biz/{bizId}/salaries', sortOrder: 3 },
    ]);
  }

  console.log('✅ أقسام وعناصر القائمة الجانبية (sidebar_sections + sidebar_items)');

  console.log('\n🎉 تم تهيئة جميع البيانات بنجاح!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ خطأ:', err);
  process.exit(1);
});
