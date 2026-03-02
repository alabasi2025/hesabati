/**
 * اختبار سريع لـ API السندات (التحقق من رفض السند عند غياب الحساب المصدر).
 * يشترط تشغيل الخادم: pnpm run dev
 * التشغيل: pnpm run test:voucher-gaps
 */
const BASE = process.env.API_URL || 'http://localhost:3000/api';

async function login() {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const data = await res.json();
  return data.token;
}

async function testVoucherWithoutCreditAccount(token) {
  const res = await fetch(`${BASE}/businesses/1/vouchers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      voucherType: 'receipt',
      toAccountId: 1,
      amount: 100,
      currencyId: 1,
    }),
  });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

async function main() {
  console.log('اختبار فجوات السندات...\n');

  // صحة الخادم
  try {
    const health = await fetch('http://localhost:3000/health').then(r => r.json());
    if (health.status !== 'ok') throw new Error('Health not ok');
    console.log('✓ الخادم يعمل');
  } catch (e) {
    console.error('✗ الخادم غير متاح. شغّل: cd backend && pnpm run dev');
    process.exit(1);
  }

  let token;
  try {
    token = await login();
    console.log('✓ تسجيل الدخول (admin)');
  } catch (e) {
    console.error('✗ فشل تسجيل الدخول:', e.message);
    process.exit(1);
  }

  // اختبار: سند تحصيل بدون حساب مصدر يُرفض 400
  const { status, body } = await testVoucherWithoutCreditAccount(token);
  if (status === 400 && (body.error && body.error.includes('الحساب المصدر'))) {
    console.log('✓ رفض سند التحصيل عند غياب الحساب المصدر (400)');
  } else {
    console.error('✗ متوقع: 400 مع رسالة الحساب المصدر. حصل:', status, body);
    process.exit(1);
  }

  console.log('\nجميع الاختبارات نجحت.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
