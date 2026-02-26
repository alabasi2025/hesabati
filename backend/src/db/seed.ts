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
  console.log('✅ تم إنشاء المستخدمين');

  // ===================== العملات =====================
  await db.insert(schema.currencies).values([
    { code: 'YER', nameAr: 'ريال يمني', symbol: 'ر.ي', exchangeRate: '1', isDefault: true },
    { code: 'SAR', nameAr: 'ريال سعودي', symbol: 'ر.س', exchangeRate: '165' },
    { code: 'USD', nameAr: 'دولار أمريكي', symbol: '$', exchangeRate: '540' },
  ]);
  console.log('✅ تم إنشاء العملات');

  // ===================== المحطات =====================
  await db.insert(schema.stations).values([
    { name: 'الدهمية', code: 'DHM', location: 'الدهمية', billingSystems: ['moghrabi_v1', 'support_fund', 'prepaid'], hasEmployees: true },
    { name: 'الصبالية وجمال', code: 'SBL', location: 'الصبالية وجمال', billingSystems: ['moghrabi_v2', 'support_fund', 'prepaid'], hasEmployees: true },
    { name: 'غليل', code: 'GHL', location: 'غليل', billingSystems: ['moghrabi_v3', 'support_fund', 'prepaid'], hasEmployees: true },
    { name: 'الساحل الغربي', code: 'WST', location: 'الساحل الغربي', billingSystems: ['support_fund_west'], hasEmployees: false, notes: 'نقطة مولعة من محطة الشريك - بدون موظفين' },
    { name: 'معبر', code: 'MBR', location: 'معبر', billingSystems: [], hasEmployees: false, notes: 'محطة بالشراكة مع عمر إسحاق وإبراهيم نجم الدين' },
  ]);
  console.log('✅ تم إنشاء المحطات');

  // ===================== الموظفين =====================
  // الإدارة
  await db.insert(schema.employees).values([
    { fullName: 'علي الصعدي', jobTitle: 'محاسب ومفوتر', department: 'الإدارة', salary: '300000', salaryCurrency: 'YER', monthlyAllowance: '3000', notes: 'محاسب + مفوتر للمحطات - ناوي يسلّم العمل' },
  ]);

  // الدهمية
  await db.insert(schema.employees).values([
    { fullName: 'رايد العباسي', jobTitle: 'مدير المحطة', department: 'الدهمية', salary: '280000', salaryCurrency: 'YER' },
    { fullName: 'ابراهيم فارع', jobTitle: 'فني المولد', department: 'الدهمية', salary: '170000', salaryCurrency: 'YER' },
    { fullName: 'عبدالله طالب', jobTitle: 'متحصل', department: 'الدهمية', salary: '90000', salaryCurrency: 'YER' },
    { fullName: 'سلطان الريمي', jobTitle: 'كهربائي', department: 'الدهمية', salary: '150000', salaryCurrency: 'YER' },
    { fullName: 'حسن فهد', jobTitle: 'كهربائي', department: 'الدهمية', salary: '110000', salaryCurrency: 'YER' },
  ]);

  // الصبالية وجمال
  await db.insert(schema.employees).values([
    { fullName: 'علي المجهلي', jobTitle: 'مدير المحطة', department: 'الصبالية وجمال', salary: '250000', salaryCurrency: 'YER' },
    { fullName: 'خالد أبو الرجال', department: 'الصبالية وجمال', salary: '200000', salaryCurrency: 'YER' },
    { fullName: 'عزيز أبو الرجال', department: 'الصبالية وجمال', salary: '180000', salaryCurrency: 'YER' },
    { fullName: 'قايد حسين العباسي', department: 'الصبالية وجمال', salary: '180000', salaryCurrency: 'YER' },
    { fullName: 'محمد ابراهيم', department: 'الصبالية وجمال', salary: '150000', salaryCurrency: 'YER' },
    { fullName: 'محمد صغير', department: 'الصبالية وجمال', salary: '90000', salaryCurrency: 'YER' },
    { fullName: 'عبدالخالق المزعقي', department: 'الصبالية وجمال', salary: '150000', salaryCurrency: 'YER' },
    { fullName: 'وائل بشر', department: 'الصبالية وجمال', salary: '150000', salaryCurrency: 'YER' },
    { fullName: 'علاء الصعدي', department: 'الصبالية وجمال', salary: '100000', salaryCurrency: 'YER' },
    { fullName: 'جودة', department: 'الصبالية وجمال', salary: '90000', salaryCurrency: 'YER' },
  ]);

  // غليل
  await db.insert(schema.employees).values([
    { fullName: 'قايد حسن العباسي', jobTitle: 'مدير المحطة', department: 'غليل', salary: '400000', salaryCurrency: 'YER' },
    { fullName: 'مهند العباسي', department: 'غليل', salary: '100000', salaryCurrency: 'YER' },
    { fullName: 'معين العباسي', department: 'غليل', salary: '170000', salaryCurrency: 'YER' },
    { fullName: 'أحمد المغربي', department: 'غليل', salary: '120000', salaryCurrency: 'YER' },
    { fullName: 'مراد جريب', department: 'غليل', salary: '150000', salaryCurrency: 'YER' },
    { fullName: 'سامي الحرازي', department: 'غليل', salary: '130000', salaryCurrency: 'YER' },
    { fullName: 'عبدة الفيراني', department: 'غليل', salary: '60000', salaryCurrency: 'YER' },
    { fullName: 'الأبجة', department: 'غليل', salary: '60000', salaryCurrency: 'YER' },
  ]);

  // متابعة خارجية
  await db.insert(schema.employees).values([
    { fullName: 'قايد العباسي', jobTitle: 'متابعة مواقع فورجي وسنترال', department: 'خارجي', salary: '0', salaryCurrency: 'YER', notes: 'يفوتر ويتحصل شهرياً ويودع لحسابات المالك' },
  ]);

  console.log('✅ تم إنشاء الموظفين');

  // ===================== الحسابات والمحافظ =====================
  await db.insert(schema.accounts).values([
    // المحافظ الإلكترونية
    { name: 'جوالي 1 - شخصي', accountType: 'e_wallet', accountNumber: '774424555', provider: 'جوالي', subType: 'شخصي', receivesFromStations: true, notes: 'تحويلات إلكترونية من مدراء المحطات نهاية اليوم' },
    { name: 'جوالي 2 - شخصي', accountType: 'e_wallet', accountNumber: '771506017', provider: 'جوالي', subType: 'شخصي', receivesFromStations: false, notes: 'لا يوصل فيه شي من المحطات' },
    { name: 'جوالي 3 - وكيل', accountType: 'e_wallet', accountNumber: '774424555', provider: 'جوالي', subType: 'وكيل', receivesFromStations: false, notes: 'لا يوصل فيه شي من المحطات' },
    { name: 'جيب', accountType: 'e_wallet', accountNumber: '774424555', provider: 'جيب', receivesFromStations: true, notes: 'تحويلات إلكترونية من مدراء المحطات نهاية اليوم' },
    { name: 'ون كاش', accountType: 'e_wallet', accountNumber: '774424555', provider: 'ون كاش', receivesFromStations: true, notes: 'تحويلات إلكترونية من مدراء المحطات نهاية اليوم' },

    // البنوك
    { name: 'كريمي الحديدة - جاري', accountType: 'bank', provider: 'الكريمي', subType: 'جاري', receivesFromStations: true, notes: 'توريدات من المحطات' },
    { name: 'كريمي الحديدة - توفير', accountType: 'bank', provider: 'الكريمي', subType: 'توفير' },
    { name: 'كريمي صنعاء - جاري', accountType: 'bank', provider: 'الكريمي', subType: 'جاري', notes: 'تحويلات (ليس من المحطات)' },
    { name: 'كريمي صنعاء - توفير', accountType: 'bank', provider: 'الكريمي', subType: 'توفير' },

    // خدمة حاسب
    { name: 'حاسب - رئيسي', accountType: 'service', provider: 'خدمة حاسب', subType: 'رئيسي', supportedCurrencies: ['YER'], receivesFromStations: true, notes: 'يتجمع فيه الكل' },
    { name: 'حاسب - نقطة 1', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { name: 'حاسب - نقطة 2', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { name: 'حاسب - نقطة 3', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { name: 'حاسب - نقطة 4', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { name: 'حاسب - نقطة 5', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { name: 'حاسب - نقطة 6', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },
    { name: 'حاسب - نقطة 7', accountType: 'service', provider: 'خدمة حاسب', subType: 'نقطة', supportedCurrencies: ['YER'] },

    // الصرافين
    { name: 'الحوشبي - باسم المحطات', accountType: 'exchange', provider: 'الحوشبي', receivesFromStations: true, notes: 'توريدات نقدية من المحطات' },
    { name: 'الحوشبي - باسم المالك', accountType: 'exchange', provider: 'الحوشبي' },
    { name: 'النجم', accountType: 'exchange', provider: 'النجم', receivesFromStations: true, notes: 'حوالات تحصيل من الموظفين عبر مجموعة واتساب مع علي صعدي' },
    { name: 'ابن عامر', accountType: 'exchange', provider: 'ابن عامر', notes: 'كان يستخدم قبل - توريدات نقدية قديمة', isActive: false },
    { name: 'النهمي - المحطات', accountType: 'exchange', provider: 'النهمي', notes: 'حساب قديم 2023-2024', isActive: false },
    { name: 'النهمي - محمد المراني', accountType: 'exchange', provider: 'النهمي', notes: 'حساب قديم باسم الشريك', isActive: false },
    { name: 'النهمي - الرئيسي', accountType: 'exchange', provider: 'النهمي', notes: 'أول حساب فتحوه - قديم', isActive: false },

    // النقد والخزائن
    { name: 'خزنة المالك الشخصية', accountType: 'cash', subType: 'خزنة', notes: 'مصروفات شخصية' },
    { name: 'النقد الشخصي (كاش)', accountType: 'cash', subType: 'كاش', notes: 'مصروفات نقدية' },

    // عهد المشتريات
    { name: 'عهدة أكرم العباسي', accountType: 'custody', notes: 'عهدة مشتريات - شراء مواد للمحطات ثم تصفية' },
    { name: 'عهدة كمال العباسي', accountType: 'custody', notes: 'عهدة مشتريات - شراء مواد للمحطات ثم تصفية' },
  ]);
  console.log('✅ تم إنشاء الحسابات والمحافظ');

  // ===================== الصناديق =====================
  // صناديق المحطات
  const stationNames = ['الدهمية', 'الصبالية وجمال', 'غليل'];
  for (const stName of stationNames) {
    await db.insert(schema.funds).values([
      { name: `صندوق التحصيل والتوريد - ${stName}`, fundType: 'collection', description: 'التحصيل اليومي من المشتركين وتوريده' },
      { name: `صندوق سلف الموظفين - ${stName}`, fundType: 'salary_advance', description: 'سلف نص الشهر 40% من المرتبات' },
      { name: `صندوق العهدة - ${stName}`, fundType: 'custody', description: 'إيجارات ومصروفات مفاجئة ومشتريات' },
    ]);
  }

  // صناديق علي صعدي
  await db.insert(schema.funds).values([
    { name: 'صندوق 2023 - علي صعدي', fundType: 'deposit', responsiblePerson: 'علي الصعدي', description: 'صندوق واحد مخلوط: توريدات + خرج + رواتب + سلف + عهد + مشتريات', isActive: false, notes: 'معلق - يحتاج تصفية كاملة - فيه عجز' },
    { name: 'الخزنة - علي صعدي', fundType: 'safe', responsiblePerson: 'علي الصعدي', description: 'احتياط مؤقت بأمر المالك - لا يخرج منها شي إلا بأمر المالك' },
    { name: 'صندوق الخرج - علي صعدي', fundType: 'expense', responsiblePerson: 'علي الصعدي', description: 'رواتب وسلف موظفين، عهد، مشتريات، صرف نقدي للمالك', notes: 'واقف من 2025/2026' },
    { name: 'صندوق التوريدات - علي صعدي', fundType: 'deposit', responsiblePerson: 'علي الصعدي', description: 'بقية عهدة المدراء، تحصيل نهاية الفاتورة', notes: 'شبه واقف - كل شي صار يروح للصراف مباشرة' },
  ]);
  console.log('✅ تم إنشاء الصناديق');

  // ===================== الشركاء =====================
  await db.insert(schema.partners).values([
    { fullName: 'محمد المراني', partnerType: 'main', stationsScope: 'المحطات الخمس', notes: 'شريك في المحطات الخمس - يستلم إيرادات مواقع الاتصالات' },
    { fullName: 'عمر إسحاق', partnerType: 'station', stationsScope: 'محطة معبر', notes: 'شريك في محطة معبر' },
    { fullName: 'إبراهيم نجم الدين', partnerType: 'station', stationsScope: 'محطة معبر', notes: 'شريك في محطة معبر' },
  ]);
  console.log('✅ تم إنشاء الشركاء');

  // ===================== الموردين =====================
  await db.insert(schema.suppliers).values([
    { name: 'محمود الحجة', category: 'ديزل', notes: 'المورد الحالي للديزل - أكبر المصروفات' },
    { name: 'الوتاري (لوتس)', category: 'زيت', notes: 'مورد زيت لوتس' },
    { name: 'الحجاجي (إيني أجيب)', category: 'زيت', notes: 'مورد زيت إيني أجيب' },
    { name: 'أحمد هادي (بيل ون)', category: 'زيت', notes: 'مورد زيت بيل ون' },
    { name: 'أمجد الصلوي', category: 'عدادات ومواد كهربائية', notes: 'وكيل عدادات توماس - حسابه فيه شعبطة كبيرة' },
    { name: 'موسى الصباري', category: 'بطاريات', notes: 'مورد بطاريات المولدات' },
    { name: 'المهندس محمد حسن', category: 'شاشات وقواطع', notes: 'شاشات، قواطع دمج، طبلونات - له سنة ما كمل' },
    { name: 'وزارة الكهرباء', category: 'عائد شهري', notes: '150 ألف لكل محطة' },
  ]);
  console.log('✅ تم إنشاء الموردين');

  // ===================== تصنيفات السندات =====================
  await db.insert(schema.voucherCategories).values([
    // سندات قبض
    { name: 'تحصيل نظام المغربي', type: 'receipt', icon: 'receipt', color: '#10b981' },
    { name: 'تحصيل صندوق الدعم', type: 'receipt', icon: 'support', color: '#3b82f6' },
    { name: 'تحصيل الدفع المسبق', type: 'receipt', icon: 'credit_card', color: '#8b5cf6' },
    { name: 'رسوم اشتراك وتأمين', type: 'receipt', icon: 'person_add', color: '#f59e0b' },
    { name: 'إيرادات فورجي وسنترال', type: 'receipt', icon: 'cell_tower', color: '#06b6d4' },
    { name: 'إيرادات مواقع الاتصالات', type: 'receipt', icon: 'signal_cellular', color: '#84cc16' },
    { name: 'مبلغ الدعم الشهري', type: 'receipt', icon: 'savings', color: '#14b8a6' },

    // سندات صرف
    { name: 'شراء ديزل', type: 'payment', icon: 'local_gas_station', color: '#ef4444' },
    { name: 'رواتب', type: 'payment', icon: 'payments', color: '#f97316' },
    { name: 'إيجارات', type: 'payment', icon: 'home', color: '#a855f7' },
    { name: 'عائد وزارة الكهرباء', type: 'payment', icon: 'account_balance', color: '#6366f1' },
    { name: 'نت واتصالات', type: 'payment', icon: 'wifi', color: '#0ea5e9' },
    { name: 'ماء', type: 'payment', icon: 'water_drop', color: '#22d3ee' },
    { name: 'بترول ومواصلات', type: 'payment', icon: 'directions_car', color: '#f43f5e' },
    { name: 'زيت مولدات', type: 'payment', icon: 'oil_barrel', color: '#d946ef' },
    { name: 'صيانة شبكة ومواد كهربائية', type: 'payment', icon: 'electrical_services', color: '#eab308' },
    { name: 'بطاريات مولدات', type: 'payment', icon: 'battery_charging_full', color: '#22c55e' },
    { name: 'صيانة مولدات', type: 'payment', icon: 'build', color: '#fb923c' },
    { name: 'تنظيف ألواح شمسية', type: 'payment', icon: 'solar_power', color: '#fbbf24' },
    { name: 'عمولة حوالات', type: 'payment', icon: 'swap_horiz', color: '#94a3b8' },
    { name: 'ضرائب', type: 'payment', icon: 'receipt_long', color: '#64748b' },
    { name: 'زكاة', type: 'payment', icon: 'volunteer_activism', color: '#059669' },
    { name: 'مصروفات شخصية', type: 'payment', icon: 'person', color: '#6b7280' },
    { name: 'سلف موظفين', type: 'payment', icon: 'request_quote', color: '#f472b6' },
    { name: 'عهدة مشتريات', type: 'payment', icon: 'shopping_cart', color: '#c084fc' },
    { name: 'مشتريات أصول', type: 'payment', icon: 'precision_manufacturing', color: '#2dd4bf' },
    { name: 'فلاتر وقرطاسية', type: 'payment', icon: 'inventory_2', color: '#a3a3a3' },

    // تحويلات
    { name: 'تحويل بين حسابات', type: 'transfer', icon: 'sync_alt', color: '#7c3aed' },
    { name: 'توريد للصراف', type: 'transfer', icon: 'upload', color: '#0891b2' },
    { name: 'عكس محفظة', type: 'transfer', icon: 'replay', color: '#4f46e5' },
  ]);
  console.log('✅ تم إنشاء تصنيفات السندات');

  // ===================== المخازن =====================
  await db.insert(schema.warehouses).values([
    { name: 'المخزن الرئيسي', warehouseType: 'main', responsiblePerson: 'علي الصعدي', location: 'مكتب الإدارة', notes: 'عدادات، مواد كهربائية، فلاتر' },
    { name: 'مخزن الدهمية', warehouseType: 'station', location: 'الدهمية' },
    { name: 'مخزن الصبالية وجمال', warehouseType: 'station', location: 'الصبالية وجمال' },
    { name: 'مخزن غليل', warehouseType: 'station', location: 'غليل' },
  ]);
  console.log('✅ تم إنشاء المخازن');

  // ===================== أصناف المخزون =====================
  await db.insert(schema.inventoryItems).values([
    { name: 'ديزل', code: 'DSL', category: 'وقود', unit: 'لتر' },
    { name: 'زيت مولد - لوتس', code: 'OIL-LTS', category: 'زيوت', unit: 'برميل' },
    { name: 'زيت مولد - إيني أجيب', code: 'OIL-ENI', category: 'زيوت', unit: 'برميل' },
    { name: 'زيت مولد - بيل ون', code: 'OIL-BLN', category: 'زيوت', unit: 'برميل' },
    { name: 'زيت مولد - شل', code: 'OIL-SHL', category: 'زيوت', unit: 'برميل' },
    { name: 'فلتر زيت', code: 'FLT-OIL', category: 'فلاتر', unit: 'حبة' },
    { name: 'فلتر هواء', code: 'FLT-AIR', category: 'فلاتر', unit: 'حبة' },
    { name: 'فلتر ديزل', code: 'FLT-DSL', category: 'فلاتر', unit: 'حبة' },
    { name: 'عداد توماس', code: 'MTR-TMS', category: 'عدادات', unit: 'حبة' },
    { name: 'بطارية مولد', code: 'BAT', category: 'بطاريات', unit: 'حبة' },
    { name: 'كيبل كهربائي', code: 'CBL', category: 'مواد كهربائية', unit: 'متر' },
    { name: 'قاطع كهربائي', code: 'BRK', category: 'مواد كهربائية', unit: 'حبة' },
  ]);
  console.log('✅ تم إنشاء أصناف المخزون');

  // ===================== الحسابات المعلقة =====================
  await db.insert(schema.pendingAccounts).values([
    { personOrEntity: 'علي الصعدي - حساب 2023', description: 'صندوق واحد مخلوط فيه عجز - يحتاج تصفية كاملة', status: 'pending', notes: 'حساب 2023 معلق بالكامل' },
    { personOrEntity: 'أمجد الصلوي', description: 'حساب العدادات والمواد الكهربائية فيه شعبطة كبيرة', status: 'pending', notes: 'وكيل عدادات توماس' },
    { personOrEntity: 'المهندس محمد حسن', description: 'شاشات وقواطع دمج وطبلونات - له سنة ما كمل', status: 'pending', notes: 'حساب معلق من سنة' },
  ]);
  console.log('✅ تم إنشاء الحسابات المعلقة');

  console.log('\n🎉 تم تهيئة جميع البيانات الأولية بنجاح!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ خطأ في تهيئة البيانات:', err);
  process.exit(1);
});
