# تحليل النظام — حساباتي

**تاريخ التحليل:** 2026-03-05  
**نطاق:** Backend، Frontend، التكامل، الإعدادات، الاختبارات، الأمان.

---

## 1. هيكل النظام (الواقع الفعلي)

### 1.1 الخادم (Backend)

| البند | الواقع |
|--------|--------|
| **الإطار** | Hono، TypeScript، Drizzle، PostgreSQL |
| **ملفات المسارات** | `auth.ts`، `dashboard.ts`، `maintenance.ts`، `enhancements.ts`، `api/index.ts`، `api/businesses.routes.ts`، `api/stations.routes.ts`، `api/employees.routes.ts`، `api/funds.routes.ts`، **`api/api.rest.ts`** (الملف الأضخم) |
| **عدد نقاط النهاية التقريبي** | ~140؛ أغلبها (~100) في ملف واحد: `api.rest.ts` |
| **الخدمات** | transaction، reporting، workflow، ui-builder، inventory، currency، websocket |
| **السكما** | ملف واحد: `db/schema/core.ts` — 50+ جدولًا، بدون تقسيم حسب المجال |

### 1.2 الواجهة (Frontend)

| البند | الواقع |
|--------|--------|
| **الإطار** | Angular 21، Signals، standalone، SCSS |
| **الصفحات** | 38 مكون صفحة: 3 عامة (login، register، business-select)، 1 layout، 34 صفحة تحت `biz/:bizId` |
| **الخدمات** | 7: api، auth، business، websocket، theme، three، toast |
| **المكونات المشتركة** | sidebar، header، breadcrumbs، toast، confirm-modal، three-background، three-stat-card، three-chart، three-network |
| **الحماية** | authGuard، loginGuard؛ لا يوجد حارس خاص بـ bizId (التحقق من الجانب الخادم فقط) |

### 1.3 الإعداد والاختبارات

| البند | الواقع |
|--------|--------|
| **جذر المشروع** | لا يوجد `package.json` في الجذر — فقط في `backend/` و `frontend/` |
| **الاختبارات التي تُشغّل** | E2E فقط: `frontend/e2e/sidebar.spec.ts` عبر `pnpm e2e` |
| **اختبارات لا تُشغّل** | اختبارات تكامل/وحدة في الـ backend (Vitest) — لا سكريبت `test` ولا vitest في `backend/package.json`؛ الواجهة بدون `*.spec.ts` (skipTests: true) |
| **TDAD** | 67 ملف workflow؛ سكريبت التحقق: `node .tdad/scripts/validate-workflows.mjs` — غير مذكور في أي package.json |
| **Docker** | `docker-compose.yml` مع postgres، backend، frontend؛ وجود `.env.docker` و `backend/.env.example` |

---

## 2. المشاكل الحقيقية (يجب معالجتها)

### 2.1 أمان

| المشكلة | الموقع | الوصف |
|---------|--------|--------|
| **مسارات الصيانة مفتوحة** | `backend/src/index.ts`، `maintenance.ts` | `/api/maintenance/cleanup-extra-tables` و `/api/maintenance/check-schema` مُسجَّلة قبل `authMiddleware()` — أي شخص يمكنه حذف جداول وفحص السكما. |
| **مخاطر IDOR** | `api.rest.ts` وجزئيًا stations/employees/funds | عشرات المسارات تستخدم `/resource/:id` بدون `bizId` في المسار وبدون التحقق من انتماء المورد للعمل (مثلاً accounts، employees، partners، suppliers، warehouses، vouchers، salaries، operation-types، إلخ). مستخدم مصادق يمكنه تعديل/عرض بيانات أعمال أخرى بمعرف الموارد فقط. |
| **employee-billing-accounts** | `api.rest.ts` | POST/PUT/DELETE لـ employee-billing-accounts بدون `bizAuthMiddleware()` — غير مقيدة بعمل معيّن. |
| **bizAuth للمستخدمين العاديين** | `middleware/bizAuth.ts` | التعليق: "TODO: في المستقبل، أضف جدول user_business_access". حاليًا أي مستخدم مصادق يمكنه اختيار أي `bizId` والمرور — مع مسارات الـ IDOR يزيد الخطر. |
| **تسجيل المستخدمين (Register)** | `routes/auth.ts` | لا يوجد rate limiting على التسجيل (بخلاف تسجيل الدخول) — قابل للإسهاب أو التعداد. |
| **JWT_SECRET** | `index.ts` / env | إن لم يُعيّن يُستخدم قيمة مولّدة مع تحذير في الـ console — في الإنتاج يجب أن يكون دائمًا معيّنًا. |

### 2.2 تكرار المنطق وعدم اتساق المسارات

| المشكلة | الموقع | الوصف |
|---------|--------|--------|
| **التحقق من الملكية مكرر** | `api.rest.ts`، `api/_shared/ownership.ts`، `services/transaction.service.ts` | دوال مثل `verifyOwnership`، `verifyAccountOwnership`، `verifyFundOwnership` مكررة في ثلاثة أماكن — احتمال اختلاف السلوك عند التعديل. |
| **مسارات مزدوجة (legacy + scoped)** | عدة ملفات API | نفس المورد معروض مرتين: تحت `/businesses/:bizId/...` (مع bizAuth) وتحت `/resource/:id` بدون ربط بالعمل — تكرار منطق وخطر أمان. |

### 2.3 معالجة الأخطاء وواجهة المستخدم

| المشكلة | الموقع | الوصف |
|---------|--------|--------|
| **تسجيل الدخول والتسجيل** | `auth.ts` | Register يستخدم `catch (error)` بدون نوع ويرجع 500 عامًا؛ login و `/me` أنسب — يُفضّل توحيد النمط وربما استخدام دالة ترجمة أخطاء. |
| **business-select** | `business-select.ts` | عند فشل تحميل الأعمال يُستدعى `console.error` فقط — لا إشارة خطأ ولا رسالة للمستخدم في القالب. |
| **لوحة التحكم** | `dashboard.ts` | فشل التحميل يُسجّل في الـ console فقط — لا بانر خطأ ولا toast للمستخدم. |
| **sidebar-settings** | `sidebar-settings.ts` | أخطاء في مسارات التحميل تُسجّل بـ `console.error` فقط — لا حالة خطأ واضحة في الواجهة. |

### 2.4 الواجهة — اتساق الأنماط

| المشكلة | الموقع | الوصف |
|---------|--------|--------|
| **صفحات بدون BasePageComponent** | summary، reports-advanced، roles، exchange-rates، sidebar-settings | تحت `biz/:bizId` لكنها لا تمتد القاعدة — تقرأ `bizId` يدويًا في `ngOnInit` ولا تستفيد من الاشتراك الموحّد و`onBizIdChange`. |
| **عرض الأخطاء** | عدة صفحات | مزيج بين "إشارة خطأ + شريط في القالب" و"toast فقط" — لا نمط واحد لجميع الصفحات. |
| **قالب summary** | `summary.html` | يستخدم `*ngIf` و `*ngFor` بينما باقي التطبيق يستخدم `@if` و `@for`. |

---

## 3. تحذيرات ودين تقني (يُنصح بمعالجتها)

| البند | التفاصيل |
|--------|----------|
| **ملف api.rest.ts ضخم** | ~100 مسار في ملف واحد — صيانة أصعب، تعارضات محتملة، تحميل أطول. يُفضّل تقسيم حسب المجال (مثلاً accounts، vouchers، reports، …). |
| **سكما في ملف واحد** | `core.ts` يحتوي 50+ جدولًا — لا تقسيم حسب النطاق (مثلاً auth، biz، accounting، inventory). |
| **اختبارات الـ backend لا تُشغّل** | وجود `api.integration.test.ts` واختبارات وحدة (security، currency، transaction) تعتمد على Vitest — لا سكريبت `test` ولا vitest في `backend/package.json`. |
| **اختبارات وحدة الواجهة** | لا توجد `*.spec.ts` (skipTests: true في الـ schematics) — `pnpm test` لا يجد ملفات. |
| **سكريبت التحقق TDAD** | غير مضمّن في أي سكريبت في package.json — يُفضّل إضافته (مثلاً `check:tdad` أو جزء من سكريبت تحقق عام). |
| **بدون ESLint** | الامتداد موصى به في `.vscode` لكن لا يوجد ملف إعداد eslint في المشروع — لا قواعد موحّدة للكود. |

---

## 4. ما يعمل بشكل صحيح

- البناء: Backend و Frontend يبنيان بدون أخطاء.
- التحقق من السكما: `db:check` يمرّ (الجداول والأعمدة المتوقعة موجودة).
- TDAD: 67 ملف workflow؛ `validate-workflows.mjs` يمرّ بدون انحرافات.
- cSpell: تمت إضافة الكلمات المطلوبة — 0 مشاكل في المصادر المفحوصة.
- E2E: Playwright يعمل مع تسجيل الدخول والتبويب الجانبي.
- الـ proxy و Docker ووجود `.env.example` و `.env.docker` للتوثيق.

---

## 5. التوصيات المرتبة حسب الأولوية

### أولوية عالية (أمان) — تم تنفيذها

1. **حماية مسارات الصيانة:** تم نقل `/api/maintenance` ليعمل بعد `authMiddleware()` وإضافة `adminMiddleware()` — لا يسمح إلا للمستخدمين بدور `admin`. (ملفات: `backend/src/index.ts`, `backend/src/middleware/auth.ts`)
2. **تقييد المسارات (IDOR):** يوصى بمعالجته لاحقاً — إما إضافة `bizAuthMiddleware()` والتحقق من انتماء المورد للعمل لجميع مسارات `resource/:id`, أو إيقاف المسارات القديمة.
3. **Rate limiting على التسجيل:** تم إضافة `registerRateLimitMiddleware()` (10 محاولات / 15 دقيقة) على `/api/auth/register`. (ملف: `backend/src/middleware/rateLimit.ts`, `backend/src/index.ts`)
4. **JWT_SECRET في الإنتاج:** إن لم يكن المعيّن موجوداً في الإنتاج، يتم إيقاف الخادم مع رسالة خطأ. (ملف: `backend/src/middleware/auth.ts`)

### أولوية متوسطة (جودة وصيانة) — جزء منها

5. **توحيد التحقق من الملكية:** يوصى به لاحقاً — نقل كل الاستخدامات إلى `_shared/ownership.ts`.
6. **توحيد معالجة الأخطاء وعرضها:** تم توحيد `catch (error: unknown)` في Register؛ تم إضافة عرض خطأ التحميل في business-select (إشارة `loadError` + قالب + زر إعادة محاولة) وفي sidebar-settings (رسالة + toast). لوحة التحكم كانت تعرض الخطأ مسبقاً.
7. **تقسيم api.rest.ts:** يوصى به لاحقاً — يحتاج تخطيطاً وتقسيماً حسب المجال.

### أولوية منخفضة — جزء منها

8. **صفحات تمتد BasePageComponent:** لم يُنفَّذ — (summary، reports-advanced، roles، exchange-rates، sidebar-settings) لا تزال تقرأ `bizId` يدوياً.
9. **توحيد عرض الأخطاء:** تم تحسين business-select و sidebar-settings؛ باقي الصفحات لم تُوحَّد.
10. **تفعيل اختبارات الـ backend:** تم إضافة `vitest` وسكريبتَي `test` و `test:watch` في `backend/package.json`.
11. **سكريبت تحقق عام:** تم إنشاء `package.json` في الجذر يتضمن `check` (build backend + frontend + db:check + validate-workflows) و `check:tdad` و `check:spell`. تم إضافة `check:tdad` في backend و frontend.
12. **قالب summary:** تم تحويل `*ngIf` و `*ngFor` إلى `@if` و `@for` في `frontend/src/app/pages/summary/summary.html`.

---

## 6. خلاصة صريحة

- **النظام يعمل** من ناحية البناء والتشغيل والـ E2E والبروتوكول والتهجئة في النطاق المفحوص.
- **ثغرات أمان حقيقية**: مسارات صيانة مفتوحة، مسارات IDOR كثيرة، وbizAuth لا يقيّد المستخدم بعمل معيّن — يجب معالجتها قبل الاعتماد على النظام في بيئة حساسة.
- **تكرار ومنطق مزدوج**: تحقق ملكية في ثلاثة أماكن، ومسارات legacy بجانب مسارات scoped — يزيد التعقيد ومخاطر الأمان.
- **الاختبارات غير مكتملة**: فقط E2E مُفعّلة؛ اختبارات الـ backend موجودة لكن لا تُشغّل؛ الواجهة بدون وحدة اختبار.
- **هذا التقرير يعكس تحليل الكود والهيكل الفعليين دون مراوغة.**
