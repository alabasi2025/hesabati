# فحص النظام — تقرير المهندس المعماري

**التاريخ:** 2026-03-07  
**النطاق:** فحص شامل للمشروع (Frontend + Backend + أمان، اعتماديات، اختبارات، إعدادات)

---

## 1. الملخص التنفيذي

| المجال | الحالة | ملاحظات |
|--------|--------|---------|
| **البنية** | ✅ جيدة | فصل واضح بين واجهة/API/بيانات، multi-tenant و RBAC |
| **الأمان** | ⚠️ يحتاج تحسين | JWT مُلزم في الإنتاج؛ كلمة مرور افتراضية في سكربتات DB |
| **الاعتماديات** | ✅ مستقرة | pnpm، إصدارات محددة، overrides لأمان (tar, immutable, hono) |
| **الاختبارات** | ⚠️ ناقصة | Backend: 4 ملفات Vitest؛ Frontend: وحدة e2e واحدة فقط |
| **التوثيق** | ✅ جيد | معمارية، إعدادات Cursor، .env.example |
| **الإعدادات** | ⚠️ ملاحظات | Backend tsconfig noEmit؛ WebSocket منفذ ثابت في الواجهة |

---

## 2. الأمان

### 2.1 ما تم فحصه

| البند | النتيجة |
|--------|--------|
| **JWT_SECRET** | ✅ في الإنتاج يُجبَر التعيين (process.exit(1))؛ في التطوير يُولَّد مفتاح عشوائي مع تحذير |
| **CORS** | ✅ قائمة بيضاء عبر `ALLOWED_ORIGINS`؛ في التطوير localhost مسموح |
| **Rate limiting** | ✅ login 20/15min، register 10/15min، API 1000/min |
| **XSS** | ✅ Middleware لتنظيف body (POST/PUT/PATCH) + Zod للتحقق |
| **Security headers** | ✅ X-Frame-Options، X-Content-Type-Options، X-XSS-Protection، Referrer-Policy؛ HSTS في الإنتاج |
| **صلاحيات** | ✅ authMiddleware، adminMiddleware، bizAuth وفحص ملكية الموارد (ownership) |

### 2.2 مخاطر وتوصيات

1. **كلمة مرور افتراضية في سكربتات DB**  
   الملفات التالية تستخدم fallback لـ `DATABASE_URL` يتضمن كلمة مرور ثابتة (`774424555`):
   - `src/db/index.ts`
   - `src/db/seed.ts`, `seed_sidebar.ts`, `reset-sidebar.ts`, `add-sidebar-salaries-section.ts`, `create-expense-categories-table.ts`, `check-operations.ts`, `check-schema-match.ts`  
   **التوصية:** في سكربتات التشغيل (غير index.ts) إما عدم استخدام fallback أو استخدام قيمة من .env فقط؛ أو تحذير صريح وعدم التشغيل في بيئة إنتاج إذا لم يُعيَّن `DATABASE_URL`.

2. **`.env.example`**  
   يحتوي على مثال كلمة مرور في التعليق — مقبول كتوثيق؛ التأكد من أن `.env` الفعلي غير مُرفَق في Git.

---

## 3. الواجهة الأمامية (Frontend)

| البند | الحالة |
|--------|--------|
| **الإطار** | Angular 21، standalone، lazy loading لجميع الصفحات |
| **التوجيه** | authGuard، loginGuard؛ مسار `biz/:bizId` مع أطفال متعددين |
| **API** | ApiService موحّد مع معالجة 401 (تسجيل خروج)، رسائل أخطاء عربية، رموز حالة |
| **WebSocket** | اتصال مباشر بـ `host:3000/ws` — يعمل في التطوير مع نفس المضيف |
| **Proxy** | `/api` و `/health` → localhost:3000 (لا مسار لـ `/ws`؛ WS يذهب مباشرة للمنفذ 3000) |

**ملاحظة WebSocket:** في بيئة إنتاج قد يكون الواجهة والخلفية على نفس النطاق/المنفذ؛ إن كان الـ API خلف reverse proxy منفصل، يُفضّل جعل عنوان WS قابلاً للضبط (مثلاً عبر environment أو config).

**ESLint:** غير مضاف في `package.json` (موجود في `.vscode/extensions.json` فقط). إضافته في المشروع يضمن تطبيق قواعد موحدة في CI.

---

## 4. الخلفية (Backend)

| البند | الحالة |
|--------|--------|
| **الإطار** | Hono، Node، ESM |
| **المسارات** | auth (عام)، dashboard، api (businesses، stations، employees، funds، rest)، enhancements، maintenance (admin فقط) |
| **التحقق** | Zod في `validation.ts`؛ فحص ملكية في `_shared/ownership.ts` و `bizAuth` |
| **قاعدة البيانات** | Drizzle، PostgreSQL، اتصال من `db/index.ts` مع max/idle/connect timeout |

**tsconfig.json:** يحتوي على `"noEmit": true`. إذا كان `pnpm run build` يشغّل `tsc` فقط، فلن يُنتَج مجلد `dist`. التحقق من وجود `tsconfig.build.json` أو استخدام bundler (مثل esbuild) للبناء الفعلي.

---

## 5. الاختبارات

| الموقع | الأداة | الملفات |
|--------|--------|---------|
| **Backend** | Vitest | `transaction.service.test.ts`, `security.middleware.test.ts`, `currency.service.test.ts`, `api.integration.test.ts` |
| **Frontend** | Karma (ng test) | تُدار عبر Angular CLI |
| **Frontend E2E** | Playwright | `e2e/sidebar.spec.ts` فقط |

**التوصية:** زيادة تغطية E2E لسير تسجيل الدخول، اختيار عمل، وسير محاسبي أساسي؛ وإضافة اختبارات وحدة للواجهة للخدمات الحرجة (مثل ApiService، AuthService).

---

## 6. الاعتماديات

- **Frontend:** pnpm، packageManager محدد؛ overrides لـ hono، @hono/node-server، immutable، tar (أمان).
- **Backend:** overrides لـ esbuild و @orpc/client.
- لم يُراجع ثغرات معروفة (يمكن تشغيل `pnpm audit` أو أداة أمنية لاحقاً).

---

## 7. قائمة تحقق سريعة للمهندس المعماري

| # | البند | الحالة |
|---|--------|--------|
| 1 | فصل الطبقات (عرض / API / بيانات) | ✅ |
| 2 | مصادقة وتفويض (JWT + أدوار + صلاحيات عمل) | ✅ |
| 3 | حماية CORS و rate limit و XSS | ✅ |
| 4 | التحقق من المدخلات (Zod) وملكية الموارد | ✅ |
| 5 | عدم تخزين أسرار في الكود (JWT في الإنتاج) | ✅ مع تحذير سكربتات DB |
| 6 | معالجة أخطاء موحدة (عرض + API) | ✅ في ApiService و onError في Hono |
| 7 | توثيق API (OpenAPI/Swagger) | ❌ غير موجود |
| 8 | تغطية اختبارات كافية | ⚠️ ناقصة خاصة في E2E والواجهة |
| 9 | إعدادات بيئة (`.env.example`) | ✅ |
| 10 | إغلاق آمن (graceful shutdown، إغلاق DB و WS) | ✅ |

---

## 8. التوصيات ذات الأولوية

1. **أمان:** إزالة أو تقييد كلمة المرور الافتراضية في سكربتات DB (استخدام .env فقط أو رفض التشغيل بدونها).
2. **بناء Backend:** التأكد من أن `pnpm run build` ينتج فعلياً مجلد `dist` (ضبط tsconfig أو استخدام tsconfig.build / bundler).
3. **الاختبارات:** زيادة سيناريوهات E2E واختبارات وحدة للخدمات الحرجة في الواجهة.
4. **الواجهة:** إضافة ESLint في `package.json` وتشغيله في CI.
5. **توثيق:** إضافة OpenAPI/Swagger للـ API (المنصة تستخدم @orpc/openapi — يمكن استغلالها).

تم إعداد هذا التقرير بناءً على فحص الكود والإعدادات دون تشغيل بيئة كاملة أو فحص قاعدة بيانات حية.
