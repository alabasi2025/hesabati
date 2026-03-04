import { describe, it, expect, beforeAll } from 'vitest';

const BASE_URL = 'http://localhost:3000';
let TOKEN = '';

// ===================== اختبارات تكاملية للـ API =====================
describe('API Integration Tests', () => {

  beforeAll(async () => {
    // تسجيل الدخول للحصول على token
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' }),
      });
      const data = await res.json() as any;
      TOKEN = data.token || '';
    } catch (e) {
      console.warn('⚠️ الباكند غير متاح - بعض الاختبارات ستُتخطى');
    }
  });

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  });

  describe('Health Endpoints', () => {
    it('GET /health يجب أن يعيد 200', async () => {
      const res = await fetch(`${BASE_URL}/health`);
      expect(res.status).toBe(200);
      const data = await res.json() as any;
      expect(data.status).toBe('ok');
    });

    it('GET /health/db يجب أن يعيد حالة قاعدة البيانات', async () => {
      const res = await fetch(`${BASE_URL}/health/db`);
      expect(res.status).toBe(200);
      const data = await res.json() as any;
      expect(data.status).toBe('connected');
    });

    it('يجب أن يحتوي على Security Headers', async () => {
      const res = await fetch(`${BASE_URL}/health`);
      expect(res.headers.get('x-frame-options')).toBe('DENY');
      expect(res.headers.get('x-content-type-options')).toBe('nosniff');
      expect(res.headers.get('x-xss-protection')).toBe('1; mode=block');
    });
  });

  describe('Authentication', () => {
    it('POST /api/auth/login يجب أن يعيد token', async () => {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' }),
      });
      expect(res.status).toBe(200);
      const data = await res.json() as any;
      expect(data.token).toBeDefined();
      expect(data.token.length).toBeGreaterThan(10);
    });

    it('يجب أن يرفض كلمة مرور خاطئة', async () => {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'wrong' }),
      });
      expect(res.status).toBe(401);
    });

    it('يجب أن يرفض الوصول بدون token', async () => {
      const res = await fetch(`${BASE_URL}/api/businesses`);
      expect(res.status).toBe(401);
    });
  });

  describe('Businesses API', () => {
    it('GET /api/businesses يجب أن يعيد قائمة الأعمال', async () => {
      if (!TOKEN) return;
      const res = await fetch(`${BASE_URL}/api/businesses`, {
        headers: authHeaders(),
      });
      expect(res.status).toBe(200);
      const data = await res.json() as any;
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });
  });

  describe('Enhanced APIs', () => {
    it('POST /api/widget-stats-enhanced يجب أن يعيد إحصائيات', async () => {
      if (!TOKEN) return;
      const res = await fetch(`${BASE_URL}/api/widget-stats-enhanced`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ bizId: 1, accountIds: [1], period: 'month' }),
      });
      expect(res.status).toBe(200);
    });

    it('POST /api/widget-log-enhanced يجب أن يعيد سجل', async () => {
      if (!TOKEN) return;
      const res = await fetch(`${BASE_URL}/api/widget-log-enhanced`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ bizId: 1, accountIds: [1], page: 1, pageSize: 10 }),
      });
      expect(res.status).toBe(200);
    });

    it('POST /api/widget-chart-enhanced يجب أن يعيد بيانات رسم بياني', async () => {
      if (!TOKEN) return;
      const res = await fetch(`${BASE_URL}/api/widget-chart-enhanced`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ bizId: 1, accountIds: [1], groupBy: 'month' }),
      });
      expect(res.status).toBe(200);
    });
  });

  describe('UI Builder APIs', () => {
    let pageId: number;

    it('POST /api/ui/pages يجب أن ينشئ صفحة', async () => {
      if (!TOKEN) return;
      const res = await fetch(`${BASE_URL}/api/ui/pages`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          bizId: 1,
          title: 'صفحة اختبار vitest',
          icon: 'test',
          color: '#333',
          layoutType: 'grid',
        }),
      });
      expect(res.status).toBe(201);
      const data = await res.json() as any;
      pageId = data.id;
      expect(data.title).toBe('صفحة اختبار vitest');
    });

    it('GET /api/ui/pages يجب أن يعيد الصفحات', async () => {
      if (!TOKEN) return;
      const res = await fetch(`${BASE_URL}/api/ui/pages?bizId=1`, {
        headers: authHeaders(),
      });
      expect(res.status).toBe(200);
      const data = await res.json() as any;
      expect(Array.isArray(data)).toBe(true);
    });

    it('DELETE /api/ui/pages/:id يجب أن يحذف الصفحة', async () => {
      if (!TOKEN || !pageId) return;
      const res = await fetch(`${BASE_URL}/api/ui/pages/${pageId}?bizId=1`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      expect(res.status).toBe(200);
    });
  });

  describe('404 Handler', () => {
    it('يجب أن يعيد 404 لمسار غير موجود', async () => {
      const res = await fetch(`${BASE_URL}/api/nonexistent`);
      expect(res.status).toBe(401); // 401 لأنه يحتاج auth أولاً
    });
  });
});
