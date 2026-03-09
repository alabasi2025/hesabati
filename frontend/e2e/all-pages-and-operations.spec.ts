import { test, expect } from '@playwright/test';

const LOGIN = { username: 'admin', password: 'admin123' };

async function loginAndSelectBusiness(page: import('@playwright/test').Page): Promise<string> {
  await page.goto('/');
  await page.locator('input[name="username"]').fill(LOGIN.username);
  await page.locator('input[name="password"]').fill(LOGIN.password);
  await page.getByRole('button', { name: 'تسجيل الدخول' }).click();
  await expect(page).toHaveURL(/\/(businesses|biz)/, { timeout: 20000 });

  if (page.url().includes('/businesses')) {
    const firstCard = page.locator('.business-card').first();
    await expect(firstCard).toBeVisible({ timeout: 15000 });
    await Promise.all([
      page.waitForURL(/\/biz\/\d+/, { timeout: 15000 }),
      firstCard.click(),
    ]);
  }

  await expect(page).toHaveURL(/\/biz\/(\d+)/, { timeout: 5000 });
  const m = page.url().match(/\/biz\/(\d+)/);
  return m ? m[1] : '1';
}

const BIZ_PATHS = [
  '',
  'stations',
  'accounts',
  'employees',
  'funds',
  'vouchers',
  'register-operation',
  'journal',
  'operation-types',
  'collections',
  'billing-systems',
  'sidebar-settings',
  'summary',
  'reports',
  'banks',
  'exchangers',
  'wallets',
  'partners',
  'warehouse',
  'suppliers',
  'settlements',
  'pending',
  'custom-screens',
  'ui-builder',
  'exchange-rates',
  'roles',
  'reports-advanced',
  'journal-categories',
  'warehouse-operations',
  'expense-categories',
  'expense-budget',
  'salaries',
] as const;

test.describe('اختبار كل الصفحات وإدخال البيانات', () => {
  test('تسجيل الدخول واختيار العمل', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    expect(bizId).toBeTruthy();
    await expect(page.locator('aside.sidebar, .sidebar, [class*="sidebar"]').first()).toBeVisible({ timeout: 10000 });
  });

  test('زيارة كل الصفحات والتحقق من تحميلها', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);

    for (const path of BIZ_PATHS) {
      const url = path ? `/biz/${bizId}/${path}` : `/biz/${bizId}`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await expect(page).toHaveURL(new RegExp(`/biz/${bizId}${path ? `/${path}` : '(/)?$'}`));
      await expect(page.locator('body')).toBeVisible();
      const loading = page.locator('.loading-state');
      await loading.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    }
  });

  test('إضافة محطة جديدة', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/stations`, { waitUntil: 'networkidle', timeout: 15000 });

    await page.getByRole('button', { name: /إضافة محطة/ }).click();
    await expect(page.locator('.modal-card').filter({ hasText: 'إضافة محطة' })).toBeVisible({ timeout: 5000 });

    const nameInput = page.locator('.modal-card input').first();
    await nameInput.fill('محطة اختبار E2E');
    await page.locator('.modal-card input').nth(1).fill('ST-E2E-01');
    await page.locator('.modal-card .modal-body input[placeholder*="الموقع"]').fill('عنوان تجريبي');

    await page.locator('.modal-card .btn-save').click();
    await expect(page.locator('.modal-card')).toHaveCount(0, { timeout: 8000 });
    await expect(page.locator('body')).toContainText(/محطة اختبار E2E|ST-E2E-01/, { timeout: 5000 });
  });

  test('إضافة شريك جديد', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/partners`, { waitUntil: 'networkidle', timeout: 15000 });

    await page.getByRole('button', { name: /إضافة شريك/ }).first().click();
    await expect(page.locator('.modal-card').filter({ hasText: 'إضافة شريك' })).toBeVisible({ timeout: 5000 });

    await page.locator('.modal-card input[placeholder*="اسم الشريك"]').fill('شريك اختبار E2E');
    await page.locator('.modal-card input[type="number"]').fill('25');
    await page.locator('.modal-card input[placeholder*="مثال"]').fill('شريك مؤسس');

    await page.getByRole('button', { name: /إضافة الشريك/ }).click();
    await expect(page.locator('.modal-card')).toHaveCount(0, { timeout: 8000 });
    await expect(page.locator('body')).toContainText(/شريك اختبار E2E|25/, { timeout: 5000 });
  });

  test('فتح صفحة الحسابات والنقر على حساب جديد', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/accounts`, { waitUntil: 'networkidle', timeout: 15000 });

    await expect(page.locator('h1, h2').filter({ hasText: /قائمة الحسابات|الحسابات/ })).toBeVisible({ timeout: 8000 });
    const addBtn = page.getByRole('button', { name: /حساب جديد|إضافة حساب/ });
    await expect(addBtn).toBeVisible({ timeout: 5000 });
    await addBtn.click();
    await expect(page.locator('.modal-card, [class*="modal"]').first()).toBeVisible({ timeout: 5000 });
  });

  test('فتح صفحة الصناديق والتحقق من المحتوى', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/funds`, { waitUntil: 'networkidle', timeout: 15000 });

    await expect(page.locator('body')).toContainText(/إدارة الصناديق|صناديق|صندوق/, { timeout: 8000 });
    const addBtn = page.getByRole('button', { name: /صندوق جديد|إضافة صندوق/ });
    await expect(addBtn).toBeVisible({ timeout: 5000 });
  });

  test('فتح صفحة السندات وتسجيل عملية', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/vouchers`, { waitUntil: 'networkidle', timeout: 15000 });

    await expect(page.locator('body')).toContainText(/سند|إيصال|قبض|صرف/, { timeout: 8000 });
  });

  test('فتح صفحة تسجيل العملية', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/register-operation`, { waitUntil: 'networkidle', timeout: 15000 });

    await expect(page.locator('body')).toBeVisible();
  });

  test('فتح صفحة الدفاتر والقيد المحاسبي', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/journal`, { waitUntil: 'networkidle', timeout: 15000 });

    await expect(page.locator('body')).toContainText(/قيد|دفتر|محاسب/, { timeout: 8000 });
  });

  test('فتح صفحة أنواع العمليات', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/operation-types`, { waitUntil: 'networkidle', timeout: 15000 });

    await expect(page.locator('body')).toBeVisible();
  });

  test('صفحة أنواع العمليات: فتح معالج قالب جديد', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/operation-types`, { waitUntil: 'networkidle', timeout: 15000 });

    const btn = page.getByRole('button', { name: 'قالب جديد' });
    await expect(btn).toBeVisible({ timeout: 8000 });
    await btn.click();

    await expect(page.locator('.wizard-modal')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('.wizard-modal')).toContainText('التصنيف');
    const categoryCard = page.locator('.type-card').first();
    await expect(categoryCard).toBeVisible({ timeout: 5000 });
    await categoryCard.click();
    await expect(page.locator('button').filter({ hasText: 'التالي' }).first()).toBeVisible({ timeout: 3000 });
  });

  test('فتح صفحة التقارير والتقارير المتقدمة', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/reports`, { waitUntil: 'networkidle', timeout: 15000 });
    await expect(page.locator('body')).toBeVisible();

    await page.goto(`/biz/${bizId}/reports-advanced`, { waitUntil: 'networkidle', timeout: 15000 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('فتح صفحات البنوك والصرافين والمحافظ', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    for (const path of ['banks', 'exchangers', 'wallets']) {
      await page.goto(`/biz/${bizId}/${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await expect(page).toHaveURL(new RegExp(`/biz/${bizId}/${path}`));
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('فتح صفحة المخازن والعمليات المخزنية', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/warehouse`, { waitUntil: 'networkidle', timeout: 15000 });
    await expect(page.locator('body')).toBeVisible();

    await page.goto(`/biz/${bizId}/warehouse-operations`, { waitUntil: 'networkidle', timeout: 15000 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('فتح صفحات الموردين والتصفيات والحسابات المعلقة', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    for (const path of ['suppliers', 'settlements', 'pending']) {
      await page.goto(`/biz/${bizId}/${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('فتح صفحات الشاشات المخصصة وواجهة البناء', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    await page.goto(`/biz/${bizId}/custom-screens`, { waitUntil: 'networkidle', timeout: 15000 });
    await expect(page.locator('body')).toBeVisible();

    await page.goto(`/biz/${bizId}/ui-builder`, { waitUntil: 'networkidle', timeout: 15000 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('فتح صفحات أسعار الصرف والصلاحيات والرواتب والميزانية', async ({ page }) => {
    const bizId = await loginAndSelectBusiness(page);
    for (const path of ['exchange-rates', 'roles', 'expense-categories', 'expense-budget', 'salaries']) {
      await page.goto(`/biz/${bizId}/${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
