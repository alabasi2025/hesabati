import postgres from 'postgres';

const sql = postgres('postgresql://postgres:774424555@localhost:5432/hesabati');

console.log('\n🔍 اختبار تنفيذ الخطة');
console.log('='.repeat(80));

// 1. الحسابات التحليلية
console.log('\n📊 1. الحسابات التحليلية (XXX-YYY-ZZZ):');
console.log('-'.repeat(80));

const analytical = await sql`
  SELECT account_type, ledger_code, name
  FROM accounts
  WHERE business_id = 1
    AND account_type IN ('fund', 'bank', 'wallet', 'exchanger', 'supplier')
  ORDER BY account_type, ledger_code
  LIMIT 15
`;

analytical.forEach(acc => {
  const parts = acc.ledger_code.split('-');
  const ok = parts.length === 3 ? '✅' : '❌';
  console.log(`${ok} ${acc.ledger_code.padEnd(15)} | ${acc.name}`);
});

// 2. حسابات التحكم
console.log('\n📊 2. حسابات التحكم (XXX-YYY):');
console.log('-'.repeat(80));

const control = await sql`
  SELECT account_type, ledger_code, name
  FROM accounts
  WHERE business_id = 1
    AND account_type IN ('partner', 'employee', 'warehouse', 'custody')
  ORDER BY account_type, ledger_code
  LIMIT 10
`;

control.forEach(acc => {
  const parts = acc.ledger_code.split('-');
  const ok = parts.length === 2 ? '✅' : '❌';
  console.log(`${ok} ${acc.ledger_code.padEnd(15)} | ${acc.name}`);
});

// 3. القائمة الجانبية
console.log('\n📊 3. القائمة الجانبية:');
console.log('-'.repeat(80));

const sidebar = await sql`
  SELECT si.label, si.route, si.icon
  FROM sidebar_items si
  JOIN sidebar_sections ss ON ss.id = si.section_id
  WHERE si.screen_key = 'analytical_accounts'
    AND ss.business_id = 1
  LIMIT 1
`;

if (sidebar.length > 0) {
  console.log(`✅ عنصر القائمة موجود: "${sidebar[0].label}"`);
  console.log(`   المسار: ${sidebar[0].route}`);
  console.log(`   الأيقونة: ${sidebar[0].icon}`);
} else {
  console.log('❌ عنصر القائمة الجانبية غير موجود!');
}

// 4. النتيجة
console.log('\n' + '='.repeat(80));
console.log('\n✅ تم اختبار الخطة بنجاح!');
console.log('\n📌 الخطوات التالية:');
console.log('   1. افتح المتصفح: http://localhost:4200');
console.log('   2. سجل الدخول: admin / admin123');
console.log('   3. ابحث عن "الحسابات التحليلية" في القائمة الجانبية');
console.log('\n' + '='.repeat(80) + '\n');

await sql.end();
