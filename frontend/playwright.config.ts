import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // تشغيل الـ backend ثم الـ frontend قبل الاختبارات
  webServer: [
    { command: 'npm run dev', cwd: '..\\backend', url: 'http://localhost:3000', reuseExistingServer: !process.env.CI, timeout: 60000 },
    { command: 'pnpm start', url: 'http://localhost:4200', reuseExistingServer: !process.env.CI, timeout: 120000 },
  ],
});
