// سكريبت بسيط للتحقق من تنفيذ الخطة
const postgres = require('postgres');

const sql = postgres('postgresql://postgres:774424555@localhost:5432/hesabati');

async function verifyPlan() {
  console.log('\n🔍 اختبار تنفيذ الخطة\n');
  console.log('='.repeat(80));

  try {
    // 1. التحقق من رموز الحسابات التحليلية
    console.log('\n📊 1. فحص الحسابات التحليلية (XXX-YYY-ZZZ):');
    console.log('-'.repeat(80));
    
    const analyticalAccounts = await sql`
      SELECT account_type, ledger_code, name
      FROM accounts
      WHERE business_id = 1
        AND account_type IN ('fund', 'bank', 'wallet', 'exchanger', 'supplier')
      ORDER BY account_type, ledger_code
      LIMIT 15
    `;

    let analyticalOk = true;
    analyticalAccounts.forEach(acc => {
      const parts = acc.ledger_code.split('-');
      const isCorrect = parts.length === 3;
      const icon = isCorrect ? '✅' : '❌';
      console.log(`${icon} ${acc.ledger_code.padEnd(15)} | ${acc.name}`);
      if (!isCorrect) analyticalOk = false;
    });

    // 2. التحقق من حسابات التحكم
    console.log('\n📊 2. فحص حسابات التحكم (XXX-YYY):');
    console.log('-'.repeat(80));

    const controlAccounts = await sql`
      SELECT account_type, ledger_code, name
      FROM accounts
      WHERE business_id = 1
        AND account_type IN ('partner', 'employee', 'warehouse', 'custody', 'budget')
      ORDER BY account_type, ledger_code
      LIMIT 10
    `;

    let controlOk = true;
    controlAccounts.forEach(acc => {
      const parts = acc.ledger_code.split('-');
      const isCorrect = parts.length === 2;
      const icon = isCorrect ? '✅' : '❌';
      console.log(`${icon} ${acc.ledger_code.padEnd(15)} | ${acc.name}`);
      if (!isCorrect) controlOk = false;
    });

    // 3. التحقق من عنصر القائمة الجانبية
    console.log('\n📊 3. فحص القائمة الجانبية:');
    console.log('-'.repeat(80));

    const sidebarItem = await sql`
      SELECT si.label, si.route, si.icon, ss.name as section_name
      FROM sidebar_items si
      JOIN sidebar_sections ss ON ss.id = si.section_id
      WHERE si.screen_key = 'analytical_accounts'
        AND ss.business_id = 1
      LIMIT 1
    `;

    if (sidebarItem.length > 0) {
      console.log(`✅ عنصر القائمة موجود: "${sidebarItem[0].label}"`);
      console.log(`   القسم: ${sidebarItem[0].section_name}`);
      console.log(`   المسار: ${sidebarItem[0].route}`);
      console.log(`   الأيقونة: ${sidebarItem[0].icon}`);
    } else {
      console.log('❌ عنصر القائمة الجانبية غير موجود!');
    }

    // 4. إحصائيات
    console.log('\n📊 4. الإحصائيات:');
    console.log('-'.repeat(80));

    const stats = await sql`
      SELECT 
        account_type,
        COUNT(*) as total,
        COUNT(CASE WHEN LENGTH(ledger_code) - LENGTH(REPLACE(ledger_code, '-', '')) = 2 THEN 1 END) as analytical,
        COUNT(CASE WHEN LENGTH(ledger_code) - LENGTH(REPLACE(ledger_code, '-', '')) = 1 THEN 1 END) as control
      FROM accounts
      WHERE business_id = 1
      GROUP BY account_type
      ORDER BY account_type
    `;

    console.log('\nنوع الحساب        | المجموع | تحليلية | تحكم');
    console.log('-'.repeat(60));
    stats.forEach(s => {
      console.log(`${s.account_type.padEnd(18)} | ${String(s.total).padStart(7)} | ${String(s.analytical).padStart(8)} | ${String(s.control).padStart(4)}`);
    });

    // النتيجة النهائية
    console.log('\n' + '='.repeat(80));
    console.log('\n📋 ملخص الاختبار:\n');
    
    const allOk = analyticalOk && controlOk && sidebarItem.length > 0;
    
    if (allOk) {
      console.log('✅ جميع الاختبارات نجحت! الخطة منفذة بشكل صحيح');
      console.log('\n📌 الخطوات التالية:');
      console.log('   1. افتح المتصفح: http://localhost:4200');
      console.log('   2. سجل الدخول: admin / admin123');
      console.log('   3. ابحث عن "الحسابات التحليلية" في القائمة الجانبية');
      console.log('   4. اضغط عليها لفتح الصفحة');
    } else {
      console.log('❌ بعض الاختبارات فشلت - راجع التفاصيل أعلاه');
    }

    console.log('\n' + '='.repeat(80) + '\n');

  } catch (error) {
    console.error('❌ خطأ:', error.message);
  } finally {
    await sql.end();
  }
}

verifyPlan();
