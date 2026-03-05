import { test, expect } from '@playwright/test';

test.describe('تسجيل الدخول والتبويب الجانبي', () => {
  test('يفتح صفحة تسجيل الدخول ثم يسجل الدخول ويعرض التبويب الجانبي', async ({ page }) => {
    await page.goto('/');

    const usernameInput = page.locator('input[name="username"], input[autocomplete="username"]');
    const passwordInput = page.locator('input[name="password"], input[type="password"]');
    await expect(usernameInput).toBeVisible({ timeout: 15000 });
    await expect(passwordInput).toBeVisible();

    await usernameInput.fill('admin');
    await passwordInput.fill('admin123');
    await page.getByRole('button', { name: 'تسجيل الدخول' }).click();

    await expect(page).toHaveURL(/\/(businesses|biz)/, { timeout: 20000 });

    // إذا كنا على صفحة اختيار العمل، ننتظر ظهور البطاقات ثم ننقر على أول عمل
    if (page.url().includes('/businesses')) {
      const firstCard = page.locator('.business-card:not(.add-card)').first();
      await expect(firstCard).toBeVisible({ timeout: 15000 });
      await Promise.all([
        page.waitForURL(/\/biz\/\d+/, { timeout: 15000 }),
        firstCard.click(),
      ]);
    }

    await expect(page).toHaveURL(/\/biz\/\d+/, { timeout: 5000 });

    const sidebar = page.locator('aside.sidebar, .sidebar');
    await expect(sidebar).toBeVisible({ timeout: 15000 });

    await expect(page.locator('body')).toContainText(/المستخدمون والصلاحيات|الرئيسية|الحسابات|العمليات المالية|التقارير|الرواتب والميزانية/i, { timeout: 8000 });
  });

  test('يحتوي التبويب الجانبي على قسم إعدادات التبويب', async ({ page }) => {
    await page.goto('/');
    await page.locator('input[name="username"]').fill('admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.getByRole('button', { name: 'تسجيل الدخول' }).click();

    await expect(page).toHaveURL(/\/(businesses|biz)/, { timeout: 20000 });

    if (page.url().includes('/businesses')) {
      const firstCard = page.locator('.business-card:not(.add-card)').first();
      await expect(firstCard).toBeVisible({ timeout: 15000 });
      await Promise.all([
        page.waitForURL(/\/biz\/\d+/, { timeout: 15000 }),
        firstCard.click(),
      ]);
    }

    await expect(page.locator('body')).toContainText(/إعدادات التبويب/i, { timeout: 10000 });
  });
});
