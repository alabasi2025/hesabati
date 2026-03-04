/**
 * تسجيل الدخول وجلب التبويب الجانبي من API — تشغيل: node scripts/check-sidebar.mjs
 * يتطلب تشغيل الـ backend على المنفذ 3000
 */
const API = 'http://localhost:3000/api';

async function main() {
  console.log('🔐 تسجيل الدخول...');
  const loginRes = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  });

  if (!loginRes.ok) {
    const err = await loginRes.text();
    console.error('❌ فشل تسجيل الدخول:', loginRes.status, err);
    process.exit(1);
  }

  const { token, user } = await loginRes.json();
  console.log('✅ تم تسجيل الدخول:', user.fullName, `(id: ${user.id})`);

  const bizId = 1;
  const userId = user.id;
  console.log('\n📋 جلب التبويب الجانبي (العمل', bizId + ', المستخدم', userId + ')...');

  const sidebarRes = await fetch(`${API}/businesses/${bizId}/users/${userId}/sidebar`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!sidebarRes.ok) {
    console.error('❌ فشل جلب التبويب:', sidebarRes.status, await sidebarRes.text());
    process.exit(1);
  }

  const sidebar = await sidebarRes.json();
  const sections = [];
  let lastSection = null;
  for (const row of sidebar) {
    const sec = row.sectionName || row.section;
    if (sec !== lastSection) {
      sections.push({ name: sec, items: [] });
      lastSection = sec;
    }
    if (sections.length) sections[sections.length - 1].items.push({ label: row.label, route: row.route });
  }

  console.log('\n📂 أقسام التبويب الجانبي (' + sections.length + ' أقسام):\n');
  sections.forEach((s, i) => {
    console.log(`${i + 1}. ${s.name}`);
    s.items.forEach((it) => console.log('   —', it.label, it.route ? `(${it.route})` : ''));
    console.log('');
  });

  console.log('✅ انتهى الفحص — التبويب الجانبي يعمل من الـ API.');
}

main().catch((e) => {
  console.error('❌ خطأ:', e.message);
  process.exit(1);
});
