# تقرير فحص الكود — حساباتي

تاريخ الفحص: 2025-03-05

---

## 1. نظرة عامة على الهيكل

| المكوّن | الملفات | الملاحظة |
|---------|---------|----------|
| **Backend** | ~30 ملف TS (routes, middleware, services, db) | Hono + Drizzle + PostgreSQL |
| **Frontend** | ~54 ملف TS (pages, services, components) | Angular مع إشارات (signals) |
| **التكامل** | مسارات `/api` و`/api/auth` و`/api/dashboard` | متطابق بين الواجهة والباك اند |

---

## 2. نقاط القوة

### 2.1 الأمان
- **JWT**: مصادقة عبر Bearer token، مع تحذير واضح إذا لم يُعيّن `JWT_SECRET`.
- **CORS**: قائمة بيضاء بـ `ALLOWED_ORIGINS`، ورفض للنطاقات غير المسموحة.
- **Rate limiting**: 1000 طلب/دقيقة للـ API، 20 محاولة/15 دقيقة لتسجيل الدخول.
- **Security headers**: `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`، و`Strict-Transport-Security` في الإنتاج.
- **محمية IDOR**: `bizAuthMiddleware()` يربط الطلبات بـ `bizId`؛ التحقق من الملكية عبر `verifyOwnership` وشرط `business_id` في الاستعلامات.
- **محرك صلاحيات**: `checkPermission` و`validateConstraints` مع كاش 5 دقائق، ودعم حدود مبالغ ومحطات وأنواع عمليات.

### 2.2 معالجة الأخطاء
- **safeHandler**: تغليف كل الـ handlers بـ try-catch مع ترجمة أخطاء DB (تكرار، مفتاح أجنبي، not-null، صيغة، enum، timeout) لرسائل عربية ورمز HTTP مناسب.
- **الواجهة**: `ApiService.request()` يترجم رموز HTTP لرسائل عربية، ويعالج 401 بتسجيل خروج تلقائي.

### 2.3 التحقق من المدخلات
- **Zod**: مخططات لـ account, voucher, employee, operationType, journal, station, supplier, warehouse, sidebar, screen, widget, fund, partner, settlement, pendingAccount, billingConfig, employeeBillingAccount.
- **normalizeBody**: دمج camelCase و snake_case لتفادي اختلاف التسمية بين الفرونت والباك اند.

### 2.4 البنية
- **إغلاق آمن**: معالجة SIGTERM/SIGINT وإغلاق WebSocket وقاعدة البيانات قبل الخروج.
- **Health**: `/health` و`/health/db` للرصد والـ proxy في الواجهة.

---

## 3. النواقص والمخاطر

### 3.1 أمان — XSS: التنظيف غير مستخدم في الـ handlers

- **الوضع الحالي**: الـ middleware `xssSanitizeMiddleware()` يقرأ الـ body، ينظّفه، ويحفظ النتيجة في `c.set('sanitizedBody', sanitized)`.
- **المشكلة**: جميع مسارات الـ API (api.ts و enhancements.ts و auth.ts) تستخدم `await c.req.json()` و`normalizeBody(await c.req.json())` ولا تستخدم أبداً `c.get('sanitizedBody')`.
- **النتيجة**: التنظيف المضاد لـ XSS **لا يُطبَّق** على البيانات التي تُخزَّن أو تُعرض.
- **التوصية**: إما استخدام `c.get('sanitizedBody')` عند وجوده في الـ handlers (للـ POST/PUT/PATCH)، أو توحيد قراءة الـ body في مكان واحد (مثلاً middleware يغيّر الـ request body إلى النسخة المنظفة) حتى لا يمرّ body خام إلى المنطق.

### 3.2 قاعدة البيانات — جدول ونسب تسمية

- **جدول ناقص**: `expense_categories` معرّف في السكما (core.ts) وفي migrations ولكنه **غير موجود** في قاعدة البيانات الحالية. الـ seed يذكره تعليقاً فقط ("تُضاف يدوياً").
- **التوصية**: تنفيذ migration لإنشاء الجدول إن كان مطلوباً، أو إزالته من السكما إذا لم يُخطط لاستخدامه.
- **جداول/أعمدة زائدة في DB** (من وثيقة التكامل): `flow_types`, `screen_collection_style_config`, `template_types`؛ وأعمدة في `operation_types`: `main_account_id`, `main_fund_id`, `template_type_id`. لا تؤثر على الكود الحالي لكنها بقايا قديمة؛ يُفضّل توثيقها أو إزالتها بعد نسخ احتياطي.

### 3.3 اختبارات التكامل — طريقة HTTP خاطئة

- **الملف**: `backend/src/__tests__/api.integration.test.ts`
- **المشكلة**: اختبارات "Enhanced APIs" تستدعي:
  - `POST /api/widget-stats-enhanced` مع body
  - `POST /api/widget-log-enhanced` مع body  
  بينما الباك اند والواجهة يستخدمون **GET** مع query params (مثلاً `?period=month&dateFrom=...`).
- **النتيجة**: الاختبارات لا تطابق السلوك الفعلي وقد تفشل أو تختبر مساراً مختلفاً.
- **التوصية**: تعديل الاختبارات لاستخدام GET مع نفس الـ query parameters التي يستخدمها الفرونت (وإضافة `bizId` في المسار).

### 3.4 bizAuth — التحقق من صلاحية المستخدم على العمل

- **الوضع الحالي**: للمستخدمين غير الـ admin، الكود يتحقق من وجود سجل في `business_partners` للـ `businessId` فقط، دون ربطه بـ `userId`. ثم يُسمح بالمرور لأي مستخدم مصادق عليه.
- **التعليق في الكود**: "TODO: في المستقبل، أضف جدول user_business_access لربط المستخدمين بالأعمال مباشرة".
- **النتيجة**: أي مستخدم مسجّل دخوله يمكنه حالياً الوصول لجميع الأعمال (ما عدا إن وُجد تحقق إضافي في واجهة اختيار العمل).
- **التوصية**: عند نمو النظام، تنفيذ ربط صريح (مثلاً `user_business_access` أو ربط المستخدم بجدول الشركاء) والتحقق من `bizId` مقابل هذا الربط.

### 3.5 Rate limiting — مصدر عنوان IP

- **الوضع الحالي**: `c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown'`.
- **المشكلة**: في بيئة تطوير بدون proxy، قد يكون المصدر دائماً `'unknown'` فيُحسب كل الطلبات تحت مفتاح واحد.
- **التوصية**: توثيق أن الإنتاج يجب أن يمرّ عبر reverse proxy يضبط `X-Forwarded-For`/`X-Real-IP`؛ واختيارياً في التطوير استخدام عنوان اتصال الخادم إن وُجد لتفادي دمج كل العملاء في سقف واحد.

### 3.6 حجم ملف api.ts

- **الوضع الحالي**: `backend/src/routes/api.ts` يتجاوز 4100 سطر ويحتوي عشرات المسارات.
- **المخاطر**: صعوبة الصيانة، احتمال تعارض عند الدمج، وقت تحميل أطول.
- **التوصية**: تقسيم المسارات إلى ملفات حسب المجال (مثلاً businesses.ts, stations.ts, vouchers.ts, reports.ts, …) وإعادة تصديرها من api.ts أو من router مركزي.

### 3.7 الأنواع (TypeScript) في الواجهة

- **الوضع الحالي**: استخدام `any` في أماكن كثيرة (مثلاً `Business.stats`, استجابات الـ API، ومعاملات دوال مثل `d: any`).
- **التوصية**: استبدال تدريجي بـ interfaces/types مناسبة لاستجابات الـ API ونماذج الصفحات لتحسين الأمان والاستكمال التلقائي.

---

## 4. ملخص التوصيات ذات الأولوية

| # | البند | الأولوية | الإجراء المقترح |
|---|--------|----------|------------------|
| 1 | XSS | عالية | استخدام body منظّف (sanitizedBody) في كل الـ handlers أو توحيد قراءة body في middleware |
| 2 | جدول expense_categories | متوسطة | إنشاء migration للجدول أو إزالته من السكما |
| 3 | اختبارات التكامل | متوسطة | تصحيح طريقة HTTP ومسارات/widget-stats و widget-log لـ GET مع query params |
| 4 | تقسيم api.ts | متوسطة | تقسيم المسارات إلى ملفات حسب المجال |
| 5 | bizAuth وربط المستخدم بالأعمال | منخفضة حالياً | تنفيذ عند توسيع المستخدمين (user_business_access أو ما شابه) |
| 6 | توثيق Rate limit و IP | منخفضة | توثيق متطلبات الـ proxy في الإنتاج واختياريًا سلوك التطوير |

---

## 5. مراجع ذات صلة

- `docs/INTEGRATION_COMPARISON.md` — مقارنة الواجهة × الباك اند × قاعدة البيانات.
- `backend/docs/SCHEMA_TABLES_COLUMNS.md` — مرجع الجداول والأعمدة.
- تشغيل فحص السكما مقابل DB: `cd backend && npm run db:check`.
