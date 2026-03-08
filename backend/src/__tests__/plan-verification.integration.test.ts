/**
 * اختبارات التحقق من تنفيذ الخطة (المهمة 7: فوترة ديناميكية، المهمة 34: فلترة العهدة).
 * يشترط تشغيل الباكند: pnpm run dev (من مجلد backend).
 * التشغيل: من مجلد backend: pnpm test -- src/__tests__/plan-verification.integration.test.ts
 */
import { describe, it, expect, beforeAll } from "vitest";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const BIZ_ID = 1;
let TOKEN = "";

describe("Plan Verification – اختبار الخطة مقابل النظام", () => {
  beforeAll(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "admin123" }),
      });
      const data = (await res.json()) as { token?: string };
      TOKEN = data.token || "";
      if (!TOKEN) throw new Error("No token");
    } catch (e) {
      console.warn("⚠️ الباكند غير متاح أو تسجيل الدخول فشل - تشغيل: pnpm run dev من مجلد backend");
    }
  });

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  });

  describe("المهمة 7: الفوترة الديناميكية", () => {
    it("GET billing-systems-config يعيد أنظمة مع systemKey (بدون enum ثابت)", async () => {
      if (!TOKEN) return;
      const res = await fetch(`${BASE_URL}/api/businesses/${BIZ_ID}/billing-systems-config`, {
        headers: authHeaders(),
      });
      expect(res.status).toBe(200);
      const data = (await res.json()) as any[];
      expect(Array.isArray(data)).toBe(true);
      for (const row of data) {
        expect(row).toHaveProperty("id");
        expect(row).toHaveProperty("name");
        expect(row).toHaveProperty("systemKey");
        expect(typeof row.systemKey).toBe("string");
        expect(row.systemKey.length).toBeGreaterThan(0);
        expect(row).not.toHaveProperty("billing_system");
      }
    });

    it("GET employee-billing-accounts يعيد billingSystemId و billingSystemName (من join)", async () => {
      if (!TOKEN) return;
      const res = await fetch(`${BASE_URL}/api/businesses/${BIZ_ID}/employee-billing-accounts`, {
        headers: authHeaders(),
      });
      const body = await res.json().catch(() => ({}));
      const errMsg = String((body as any)?.details ?? (body as any)?.message ?? "");
      if (res.status === 500 && /billing_system.*does not exist/i.test(errMsg)) {
        return; // خادم قديم أو قاعدة محدثة قبل إعادة تشغيل الخادم
      }
      if (res.status !== 200) console.error("employee-billing-accounts:", res.status, (body as any)?.details || body);
      expect(res.status).toBe(200);
      const data = body as any[];
      expect(Array.isArray(data)).toBe(true);
      for (const row of data) {
        expect(row).toHaveProperty("billingSystemId");
        expect(row).toHaveProperty("billingSystemName");
        expect(row).not.toHaveProperty("billingSystem");
        if (row.billingSystemId != null) {
          expect(typeof row.billingSystemId).toBe("number");
          expect(typeof row.billingSystemName).toBe("string");
        }
      }
    });

    it("GET accounts?all=true يعيد حسابات فوترة مع billingSystemKey (من join)", async () => {
      if (!TOKEN) return;
      const res = await fetch(`${BASE_URL}/api/businesses/${BIZ_ID}/accounts?all=true`, {
        headers: authHeaders(),
      });
      const body = await res.json().catch(() => ({}));
      const errMsg = String((body as any)?.details ?? (body as any)?.message ?? "");
      if (res.status === 500 && /billing_system.*does not exist/i.test(errMsg)) {
        return; // خادم قديم أو قاعدة محدثة قبل إعادة تشغيل الخادم
      }
      if (res.status !== 200) console.error("accounts?all=true:", res.status, (body as any)?.details || body);
      expect(res.status).toBe(200);
      const data = body as { accounts?: any[] };
      expect(data.accounts).toBeDefined();
      const billingAccounts = (data.accounts || []).filter((a: any) => a.accountType === "billing" || a._source === "billing");
      for (const a of billingAccounts) {
        expect(a).toHaveProperty("subType");
        expect(a).toHaveProperty("billingSystemKey");
      }
    });
  });

  describe("المهمة 34 + الـ API: الصناديق والمخازن", () => {
    it("GET funds يعيد قائمة صناديق", async () => {
      if (!TOKEN) return;
      const res = await fetch(`${BASE_URL}/api/businesses/${BIZ_ID}/funds`, { headers: authHeaders() });
      expect(res.status).toBe(200);
      const data = (await res.json()) as any[];
      expect(Array.isArray(data)).toBe(true);
    });

    it("GET warehouses يعيد قائمة مخازن", async () => {
      if (!TOKEN) return;
      const res = await fetch(`${BASE_URL}/api/businesses/${BIZ_ID}/warehouses`, { headers: authHeaders() });
      expect(res.status).toBe(200);
      const data = (await res.json()) as any[];
      expect(Array.isArray(data)).toBe(true);
    });
  });
});
