import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.ts';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hesabati';
const client = postgres(connectionString);
const db = drizzle(client, { schema });

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
  await db.insert(schema.accounts).values([
    // محافظ إلكترونية - المحطات
    { businessId: b1.id, name: 'جوالي 1 - شخصي', accountType: 'e_wallet', accountNumber: '774424555', provider: 'جوالي', subType: 'شخصي', receivesFromStations: true },
    { businessId: b1.id, name: 'جوالي 2 - شخصي', accountType: 'e_wallet', accountNumber: '771506017', provider: 'جوالي', subType: 'شخصي' },
    { businessId: b1.id, name: 'جوالي 3 - وكيل', accountType: 'e_wallet', accountNumber: '774424555', provider: 'جوالي', subType: 'وكيل' },
    { businessId: b1.id, name: 'جيب', accountType: 'e_wallet', accountNumber: '774424555', provider: 'جيب', receivesFromStations: true },
    { businessId: b1.id, name: 'ون كاش', accountType: 'e_wallet', accountNumber: '774424555', provider: 'ون كاش', receivesFromStations: true },
    // بنوك
    { businessId: b1.id, name: 'كريمي الحديدة - جاري', accountType: 'bank', provider: 'الكريمي', subType: 'جاري', receivesFromStations: true },
    { businessId: b1.id, name: 'كريمي الحديدة - توفير', accountType: 'bank', provider: 'الكريمي', subType: 'توفير' },
    { businessId: b1.id, name: 'كريمي صنعاء - جاري', accountType: 'bank', provider: 'الكريمي', subType: 'جاري' },
    { businessId: b1.id, name: 'كريمي صنعاء - توفير', accountType: 'bank', provider: 'الكريمي', subType: 'توفير' },
    // خدمة حاسب
    { businessId: b1.id, name: 'حاسب - رئيسي', accountType: 'service', provider: 'خدمة حاسب', subType: 'رئيسي', supportedCurrencies: ['YER'], receivesFromStations: true },
    { businessId: b1.id, name: 'حاسب - نقطة 1', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 2', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 3', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 4', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 5', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 6', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { businessId: b1.id, name: 'حاسب - نقطة 7', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    // الصرافين
    { businessId: b1.id, name: 'الحوشبي - باسم المحطات', accountType: 'exchange', provider: 'الحوشبي', receivesFromStations: true },
    { businessId: b1.id, name: 'الحوشبي - باسم المالك', accountType: 'exchange', provider: 'الحوشبي' },
    { businessId: b1.id, name: 'النجم', accountType: 'exchange', provider: 'النجم', receivesFromStations: true },
    { businessId: b1.id, name: 'ابن عامر', accountType: 'exchange', provider: 'ابن عامر', isActive: false },
    { businessId: b1.id, name: 'النهمي - المحطات', accountType: 'exchange', provider: 'النهمي', isActive: false },
    { businessId: b1.id, name: 'النهمي - محمد المراني', accountType: 'exchange', provider: 'النهمي', isActive: false },
    { businessId: b1.id, name: 'النهمي - الرئيسي', accountType: 'exchange', provider: 'النهمي', isActive: false },
    // نقد وخزائن
    { businessId: b1.id, name: 'خزنة المالك الشخصية', accountType: 'cash', subType: 'خزنة' },
    { businessId: b1.id, name: 'النقد الشخصي (كاش)', accountType: 'cash', subType: 'كاش' },
    // عهد
    { businessId: b1.id, name: 'عهدة أكرم العباسي', accountType: 'custody' },
    { businessId: b1.id, name: 'عهدة كمال العباسي', accountType: 'custody' },
    // معبر
    { businessId: b2.id, name: 'جوالي - معبر', accountType: 'e_wallet', provider: 'جوالي', receivesFromStations: true },
    { businessId: b2.id, name: 'ون كاش - معبر', accountType: 'e_wallet', provider: 'ون كاش', receivesFromStations: true },
    { businessId: b2.id, name: 'خزنة معبر', accountType: 'cash' },
    // شخصي
    { businessId: b3.id, name: 'حساب شخصي - جوالي', accountType: 'e_wallet', provider: 'جوالي' },
    { businessId: b3.id, name: 'حساب شخصي - كريمي', accountType: 'bank', provider: 'بنك الكريمي' },
    { businessId: b3.id, name: 'خزنة شخصية', accountType: 'cash' },
  ]);
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

  // ===================== تصنيفات السندات =====================
  await db.insert(schema.voucherCategories).values([
    // سندات قبض
    { businessId: b1.id, name: 'تحصيل نظام المغربي', type: 'receipt', icon: 'receipt', color: '#10b981' },
    { businessId: b1.id, name: 'تحصيل صندوق الدعم', type: 'receipt', icon: 'support', color: '#3b82f6' },
    { businessId: b1.id, name: 'تحصيل الدفع المسبق', type: 'receipt', icon: 'credit_card', color: '#8b5cf6' },
    { businessId: b1.id, name: 'رسوم اشتراك وتأمين', type: 'receipt', icon: 'person_add', color: '#f59e0b' },
    { businessId: b1.id, name: 'إيرادات فورجي وسنترال', type: 'receipt', icon: 'cell_tower', color: '#06b6d4' },
    { businessId: b1.id, name: 'إيرادات مواقع الاتصالات', type: 'receipt', icon: 'signal_cellular', color: '#84cc16' },
    { businessId: b1.id, name: 'مبلغ الدعم الشهري', type: 'receipt', icon: 'savings', color: '#14b8a6' },
    // سندات صرف
    { businessId: b1.id, name: 'شراء ديزل', type: 'payment', icon: 'local_gas_station', color: '#ef4444' },
    { businessId: b1.id, name: 'رواتب', type: 'payment', icon: 'payments', color: '#f97316' },
    { businessId: b1.id, name: 'إيجارات', type: 'payment', icon: 'home', color: '#a855f7' },
    { businessId: b1.id, name: 'عائد وزارة الكهرباء', type: 'payment', icon: 'account_balance', color: '#6366f1' },
    { businessId: b1.id, name: 'نت واتصالات', type: 'payment', icon: 'wifi', color: '#0ea5e9' },
    { businessId: b1.id, name: 'ماء', type: 'payment', icon: 'water_drop', color: '#22d3ee' },
    { businessId: b1.id, name: 'بترول ومواصلات', type: 'payment', icon: 'directions_car', color: '#f43f5e' },
    { businessId: b1.id, name: 'زيت مولدات', type: 'payment', icon: 'oil_barrel', color: '#d946ef' },
    { businessId: b1.id, name: 'صيانة شبكة ومواد كهربائية', type: 'payment', icon: 'electrical_services', color: '#eab308' },
    { businessId: b1.id, name: 'بطاريات مولدات', type: 'payment', icon: 'battery_charging_full', color: '#22c55e' },
    { businessId: b1.id, name: 'صيانة مولدات', type: 'payment', icon: 'build', color: '#fb923c' },
    { businessId: b1.id, name: 'سلف موظفين', type: 'payment', icon: 'request_quote', color: '#f472b6' },
    { businessId: b1.id, name: 'عهدة مشتريات', type: 'payment', icon: 'shopping_cart', color: '#c084fc' },
    { businessId: b1.id, name: 'مصروفات شخصية', type: 'payment', icon: 'person', color: '#6b7280' },
    // تحويلات
    { businessId: b1.id, name: 'تحويل بين حسابات', type: 'transfer', icon: 'sync_alt', color: '#7c3aed' },
    { businessId: b1.id, name: 'توريد للصراف', type: 'transfer', icon: 'upload', color: '#0891b2' },
  ]);
  console.log('✅ تصنيفات السندات');

  // ===================== الحسابات المعلقة =====================
  await db.insert(schema.pendingAccounts).values([
    { businessId: b1.id, personOrEntity: 'علي الصعدي - حساب 2023', description: 'صندوق مخلوط فيه عجز - يحتاج تصفية كاملة', status: 'pending' },
    { businessId: b1.id, personOrEntity: 'أمجد الصلوي', description: 'حساب العدادات والمواد الكهربائية فيه شعبطة كبيرة', status: 'pending' },
    { businessId: b1.id, personOrEntity: 'المهندس محمد حسن', description: 'شاشات وقواطع دمج - له سنة ما كمل', status: 'pending' },
  ]);
  console.log('✅ الحسابات المعلقة');

  // ===================== أنظمة الفوترة (5 أنظمة) =====================
  await db.insert(schema.billingSystemsConfig).values([
    { businessId: b1.id, name: 'المغربي نسخة 1 (الدهمية)', icon: 'receipt', color: '#10b981', stationScope: 'per_station', supportedTypes: ['تحصيل نقدي بالجوال', 'تحصيل إسناد يدوي', 'سداد إلكتروني'], sortOrder: 1 },
    { businessId: b1.id, name: 'المغربي نسخة 2 (الصبالية وجمال)', icon: 'receipt', color: '#059669', stationScope: 'per_station', supportedTypes: ['تحصيل نقدي بالجوال', 'تحصيل إسناد يدوي', 'سداد إلكتروني'], sortOrder: 2 },
    { businessId: b1.id, name: 'المغربي نسخة 3 (غليل)', icon: 'receipt', color: '#047857', stationScope: 'per_station', supportedTypes: ['تحصيل نقدي بالجوال', 'تحصيل إسناد يدوي', 'سداد إلكتروني'], sortOrder: 3 },
    { businessId: b1.id, name: 'صندوق الدعم', icon: 'support', color: '#3b82f6', stationScope: 'per_station', supportedTypes: ['تحصيل نقدي بالجوال', 'تحصيل إسناد يدوي'], sortOrder: 4 },
    { businessId: b1.id, name: 'الدفع المسبق', icon: 'credit_card', color: '#8b5cf6', stationScope: 'multi_station', supportedTypes: ['تحصيل نقدي بالجوال'], sortOrder: 5 },
  ]);
  console.log('✅ أنظمة الفوترة (5 أنظمة: 3 مغربي + صندوق الدعم + الدفع المسبق)');

  // ===================== أنواع حسابات الفوترة =====================
  await db.insert(schema.billingAccountTypes).values([
    { businessId: b1.id, name: 'تحصيل نقدي بالجوال', description: 'تحصيل الفواتير نقداً عبر الجوال' },
    { businessId: b1.id, name: 'تحصيل إسناد يدوي', description: 'تحصيل الفواتير بالإسناد اليدوي' },
    { businessId: b1.id, name: 'سداد إلكتروني', description: 'سداد الفواتير إلكترونياً' },
  ]);
  console.log('✅ أنواع حسابات الفوترة');

  // ===================== حسابات الفوترة للموظفين =====================
  // يتم إنشاؤها عبر SQL مباشرة لأنها تعتمد على IDs الموظفين
  // تم إضافتها عبر SQL migration منفصل

  // ===================== قوالب العمليات =====================
  await db.insert(schema.operationTypes).values([
    { businessId: b1.id, name: 'تحويل حق الديزل', category: 'voucher', voucherType: 'payment', icon: 'local_gas_station', color: '#ef4444', description: 'تحويل مبالغ لمورد الديزل - محمود الحجة', sortOrder: 1 },
    { businessId: b1.id, name: 'تحويل حق مشتريات مباشرة', category: 'voucher', voucherType: 'payment', icon: 'shopping_cart', color: '#f97316', sortOrder: 2 },
    { businessId: b1.id, name: 'تحويل عهد مشتريات', category: 'voucher', voucherType: 'payment', icon: 'shopping_bag', color: '#fb923c', sortOrder: 3 },
    { businessId: b1.id, name: 'صرف سلف وعهد للمحطات', category: 'voucher', voucherType: 'payment', icon: 'request_quote', color: '#f472b6', sortOrder: 4 },
    { businessId: b1.id, name: 'صرف عهدة معلقة لعمل خارجي', category: 'voucher', voucherType: 'payment', icon: 'pending_actions', color: '#a855f7', sortOrder: 5 },
    { businessId: b1.id, name: 'تحويل حق الزيت', category: 'voucher', voucherType: 'payment', icon: 'oil_barrel', color: '#d946ef', sortOrder: 6 },
    { businessId: b1.id, name: 'تحويل حق عدادات ومواد كهربائية', category: 'voucher', voucherType: 'payment', icon: 'electrical_services', color: '#eab308', sortOrder: 7 },
    { businessId: b1.id, name: 'تحويل حق العائد الشهري', category: 'voucher', voucherType: 'payment', icon: 'account_balance', color: '#6366f1', sortOrder: 8 },
    { businessId: b1.id, name: 'تحويل إيجار حوش الباشا', category: 'voucher', voucherType: 'payment', icon: 'home', color: '#0891b2', sortOrder: 9 },
    { businessId: b1.id, name: 'تحويل إيجار حوش الضحوي', category: 'voucher', voucherType: 'payment', icon: 'home', color: '#14b8a6', sortOrder: 10 },
    { businessId: b1.id, name: 'تحويل حق الضرائب', category: 'voucher', voucherType: 'payment', icon: 'receipt_long', color: '#64748b', sortOrder: 11 },
    { businessId: b1.id, name: 'تحويل حق البطاريات', category: 'voucher', voucherType: 'payment', icon: 'battery_charging_full', color: '#22c55e', sortOrder: 12 },
    { businessId: b1.id, name: 'تحويل حق قطع غيار المولدات', category: 'voucher', voucherType: 'payment', icon: 'build', color: '#f59e0b', sortOrder: 13 },
    { businessId: b1.id, name: 'تحويل حق تكاليف التطوير والأصول', category: 'voucher', voucherType: 'payment', icon: 'engineering', color: '#7c3aed', sortOrder: 14 },
    { businessId: b1.id, name: 'تحويل للمهندس محمد حسن', category: 'voucher', voucherType: 'payment', icon: 'person', color: '#0ea5e9', sortOrder: 15 },
    { businessId: b1.id, name: 'مصروفات شخصية', category: 'voucher', voucherType: 'payment', icon: 'wallet', color: '#6b7280', sortOrder: 16 },
  ]);
  console.log('✅ قوالب العمليات');

  // ===================== أرصدة الموردين =====================
  // يتم إنشاؤها عبر SQL مباشرة لأنها تعتمد على IDs الموردين
  // تم إضافتها عبر SQL migration منفصل

  console.log('\n🎉 تم تهيئة جميع البيانات بنجاح!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ خطأ:', err);
  process.exit(1);
});
