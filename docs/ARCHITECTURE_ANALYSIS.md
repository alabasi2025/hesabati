# تحليل معماري شامل — نظام حساباتي (Hesabati)

**نوع الوثيقة:** تحليل معماري (Software Architecture Analysis)  
**النطاق:** النظام بالكامل — Backend، Frontend، قاعدة البيانات، الأمان، والنشر  
**التاريخ:** 2026-03-07

---

## 1. نظرة عامة على النظام

**حساباتي** هو نظام إدارة مالية شاملة (Enterprise Financial Management) مصمم لدعم:

- **تعدد الأعمال (Multi-tenant):** عدة أعمال (Businesses) مع عزل بيانات صارم.
- **محطات/فروع:** محطات (Stations) تحت كل عمل مع موظفين وحسابات وصناديق.
- **محاسبة مزدوجة:** قيود يومية، سندات قبض/صرف/تحويل، أرصدة حسابات وصناديق.
- **مخزون:** مخازن، أصناف، حركات، عمليات (إدخال، صرف، تحويل).
- **تحصيل وتوريد:** تحصيل يومي، توريد، أنظمة فوترة (مغربي، صندوق دعم، مسبق الدفع).
- **صلاحيات متقدمة:** RBAC (أدوار، صلاحيات)، سير عمل (Workflow)، شاشات مخصصة وواجهات ديناميكية (UI Builder).

---

## 2. البنية التقنية (Tech Stack)

| الطبقة                 | التقنية                                        | الإصدار/الملاحظات                                |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------ |
| **Root**               | pnpm (monorepo)                                | سكربتات التحقق: build، db:check، workflows، أمان |
| **Frontend**           | Angular                                        | 21.x — standalone، lazy-loaded routes            |
| **Frontend UI**        | Tailwind CSS 4، Angular CDK، angular-gridster2 | تخطيطات قابلة للسحب                              |
| **Frontend Charts/3D** | Chart.js، ng2-charts، Three.js، GSAP           | رسوم بيانية وتأثيرات                             |
| **Backend**            | Node.js + TypeScript (ESM)                     | tsx للتطوير، tsc للبناء                          |
| **Backend Framework**  | Hono                                           | 4.x — خفيف، متوافق مع Fetch API                  |
| **Backend RPC**        | @orpc/server + @orpc/openapi                   | موجود في dependencies (قد يُستخدم لاحقاً)        |
| **ORM / DB**           | Drizzle ORM + postgres (node-postgres)         | PostgreSQL 16                                    |
| **Auth**               | JWT (jsonwebtoken)، bcryptjs                   | Bearer token، 7 أيام صلاحية                      |
| **Realtime**           | ws (WebSocket)                                 | مرفق بنفس خادم Hono                              |
| **Validation**         | Zod                                            | في الـ backend للـ request body                  |
| **Testing**            | Vitest (backend)، Playwright (frontend e2e)    |                                                  |
| **Deploy**             | Docker Compose                                 | postgres، backend، frontend (Nginx)              |

---

## 3. هيكل المشروع (Monorepo)

```
hesabati/
├── package.json              # جذر: pnpm، سكربتات check/security
├── docker-compose.yml        # postgres + backend + frontend
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── index.ts          # نقطة الدخول، CORS، rate limit، auth، routes، static، WS، graceful shutdown
│   │   ├── db/
│   │   │   ├── index.ts      # اتصال Drizzle + postgres، closeDatabase
│   │   │   ├── schema/
│   │   │   │   ├── index.ts
│   │   │   │   └── core.ts   # كل الجداول والـ enums (حوالي 70+ جدول)
│   │   │   ├── seed.ts, check-schema-match.ts, ...
│   │   ├── middleware/       # auth، bizAuth، rateLimit، validation، permissions، sequencing، helpers
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── dashboard.ts
│   │   │   ├── api/
│   │   │   │   ├── index.ts        # تجميع: businesses, stations, employees, funds, api.rest
│   │   │   │   ├── api.rest.ts     # الجزء الأضخم: كل REST تحت /api (بعد bizAuth)
│   │   │   │   ├── businesses.routes.ts, stations.routes.ts, ...
│   │   │   │   └── _shared/        # ownership، context-helpers، db-helpers، types
│   │   │   ├── enhancements.ts     # تحسينات سندات، واجهات، إلخ
│   │   │   └── maintenance.ts      # صيانة (admin فقط)
│   │   └── services/
│   │       ├── transaction.service.ts   # محرك القيود والمعاملات المركزي
│   │       ├── workflow.service.ts
│   │       ├── reporting.service.ts
│   │       ├── currency.service.ts
│   │       ├── inventory.service.ts
│   │       ├── ui-builder.service.ts
│   │       └── websocket.service.ts
│   └── public/               # يُخدم منه الـ SPA بعد البناء
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── main.ts, app.config.ts, app.ts
│   │   ├── app/
│   │   │   ├── app.routes.ts        # login, register, businesses, biz/:bizId/...
│   │   │   ├── guards/              # authGuard, loginGuard
│   │   │   ├── services/            # api.service, auth.service, business.service, websocket, theme, toast
│   │   │   ├── components/          # header, sidebar, confirm-modal, three-*, breadcrumbs, toast
│   │   │   ├── pages/               # صفحة لكل وحدة (dashboard, stations, accounts, vouchers, ...)
│   │   │   └── shared/              # constants, helpers, types, base-page
│   └── ...
├── .tdad/                   # سير عمل/تحقق (workflows)
├── docs/, scripts/, .cursor, .vscode
└── nginx-ssl.conf, serve-frontend.js
```

---

## 4. المعمارية المنطقية

### 4.1 نمط التدفق (Request Flow)

1. **عميل (متصفح)** → طلب إلى نفس النطاق (أو عبر Nginx إلى Backend).
2. **CORS:** قائمة بيضاء (ALLOWED_ORIGINS)، مع السماح بـ localhost في التطوير.
3. **Rate limiting:**
   - `/api/auth/login`: 20 طلب/15 دقيقة.
   - `/api/auth/register`: 10 طلب/15 دقيقة.
   - `/api/*`: 1000 طلب/دقيقة.
4. **XSS:** تطهير مدخلات على `/api/*`.
5. **Security headers:** X-Frame-Options، X-Content-Type-Options، X-XSS-Protection، Referrer-Policy، وإزالة X-Powered-By؛ في الإنتاج HSTS.
6. **المسارات العامة:** `/api/auth/*` (تسجيل دخول، تسجيل مستخدم) بدون auth.
7. **المسارات المحمية:** كل `/api/*` (ما عدا auth) تمر بـ `authMiddleware()` (JWT).
8. **مسارات الصيانة:** `/api/maintenance` تتطلب بعد الـ auth دور `admin` عبر `adminMiddleware()`.
9. **توجيه حسب المسار:**
   - `/api/dashboard` → dashboardRoutes
   - `/api` → apiRoutes (businesses, stations, employees, funds, rest) + enhancementRoutes
   - `/health`, `/health/db` → صحة الخادم وقاعدة البيانات
   - `*` → تقديم الملفات الثابتة من `public` (SPA fallback لـ index.html).

### 4.2 تعدد الأعمال (Multi-Tenancy) وعزل البيانات

- **مفتاح العزل:** `businessId` (bizId) موجود في كل الجداول ذات الصلة (حسابات، صناديق، سندات، محطات، موظفين، إلخ).
- **التحقق من الصلاحية:**
  - **bizAuthMiddleware():** يقرأ `bizId` من الـ path (مثل `/businesses/:bizId/...`) ويتحقق أن المستخدم له حق على هذا العمل:
    - دور `admin` → مسموح لجميع الأعمال.
    - غير ذلك → التحقق من جدول `user_roles`: وجود سجل (userId, businessId).
  - بعد التحقق يتم تعيين `c.set('bizId', bizId)` لاستخدامه في الـ handlers.
- **ملكية السجلات:**
  - دوال مثل `verifyAccountOwnership`, `verifyFundOwnership`, `requireResourceOwnership` تضمن أن المورد (حساب، صندوق، سند، إلخ) ينتمي للـ business الحالي ولمستخدم له صلاحية.
- **منع IDOR:** أي طلب يتضمن معرف كيان (حساب، صندوق، سند) يُتحقق أن هذا الكيان يخص الـ bizId المسموح للمستخدم.

### 4.3 محرك المعاملات (Transaction Engine)

- **الملف المركزي:** `backend/src/services/transaction.service.ts`.
- **المبدأ:** كل الحركات المالية تمر من هذا المحرك؛ لا تحديث أرصدة خارجه (إلا مسارات legacy محددة مع تعليقات).
- **القاعدة:** معاملة واحدة معزولة داخل `businessId` واحد؛ لا معاملات بين عملين.
- **خطوات داخل transaction واحدة (قاعدة البيانات):**
  1. التحقق من ملكية كل الحسابات/الصناديق لنفس bizId.
  2. إنشاء المستند المصدر (voucher).
  3. إنشاء القيد في `journalEntries`.
  4. إنشاء السطور في `journalEntryLines`.
  5. تحديث `account_balances` و`fund_balances`.
  6. تسجيل في `audit_log`.
- **الدوال الرئيسية:**
  - `postTransaction`: سند بسيط (قبض/صرف/تحويل) — مدين واحد، دائن واحد، مع دعم صناديق.
  - `postMultiTransaction`: سند متعدد السطور (قيد يومية) مع توازن مدين/دائن.
  - `cancelTransaction`: إلغاء سند وعكس الأرصدة.
  - `confirmDraftTransaction`: اعتماد مسودة وتنفيذ القيود والأرصدة.
- **الترقيم:** تسلسلات حسب الخزينة (صندوق/بنك/صراف/محفظة)، السنة، ونوع السند؛ استخدام `sequence_counters` و`getNextSequence` وربط بـ fundTypes/bankTypes/exchangeTypes/eWalletTypes.

### 4.4 نموذج البيانات الرئيسي (ملخص)

- **المستخدمون والأعمال:** `users` (أدوار نظام: admin, accountant, manager, viewer)، `businesses`، `user_roles` (ربط مستخدم–عمل–دور).
- **الصلاحيات:** `roles`، `role_permissions` (resource/action/constraints)، `user_roles`.
- **الخزائن:**
  - **حسابات:** `accounts` (أنواع: fund, bank, e_wallet, exchange, accounting, ...) مع صلاحيات قبض/صرف/قيد، `account_balances`، `account_allowed_links`.
  - **صناديق:** `funds`، `fund_balances`، `fund_types`.
  - تصنيفات: `bank_types`, `exchange_types`, `e_wallet_types`.
- **المستندات والقيود:**
  - `vouchers` (قبض، صرف، تحويل، قيد، تحصيل، توريد، فواتير، إلخ)، `voucher_categories`.
  - `journal_entries`، `journal_entry_lines`.
  - `operation_types` (قوالب عمليات)، `operation_type_accounts`.
- **التحصيل والتوريد:** `daily_collections`، `collection_details`، `delivery_records`، `employee_billing_accounts`، `billing_systems_config`، `billing_account_types`.
- **المخزون:** `warehouses`، `warehouse_types`، `inventory_items`، `inventory_stock`، `inventory_movements`، `warehouse_operations`، `warehouse_operation_items`.
- **إضافات:** عملات، أسعار صرف، موردون، شركاء، محطات، موظفين، رواتب، ميزانيات مصروفات، تصفيات، حسابات معلقة، مرفقات، سجل تدقيق، شاشات مخصصة (screen_templates، screen_widgets، custom_screen_config)، سير العمل (workflow_transitions، workflow_history)، UI Builder (ui_pages، ui_components، ui_data_sources)، عدادات تسلسل، تصنيفات قيود يومية، إلخ.

### 4.5 الـ API (REST)

- **الأساس:** Hono مع مسارات تحت `/api`؛ الجزء الأكبر في `api.rest.ts` (آلاف الأسطر).
- **نمط المسارات:**
  - `/api/auth/*` — بدون bizId.
  - `/api/dashboard/*` — إحصائيات عامة.
  - `/api/businesses/:bizId/*` — كل الموارد المرتبطة بعمل (stations, accounts, funds, vouchers, collections, operation-types, journal-entries, sidebar, screens, reports, ...).
  - مسارات بدون bizId في الـ path لكن مع التحقق من ملكية المورد عبر body/query (مثل `/accounts/:id`، `/vouchers/:id`) باستخدام `requireResourceOwnership` أو ما يكافئه.
- **المعالجة:**
  - `bizAuthMiddleware()` حيث يُستخرج bizId.
  - `safeHandler` للالتفاف حول الـ handlers وتوحيد معالجة الأخطاء.
  - `normalizeBody`، `validateBody` (Zod)، `parseId`، `checkPermission` (RBAC) حيث ينطبق.
  - استدعاء خدمات مثل `postTransaction`، `confirmDraftTransaction`، `getProfitAndLoss`، إلخ.
- **الفرونت اند:** `ApiService` (Angular) يستدعي نفس المسارات مع `Authorization: Bearer <token>` ويمرر `bizId` من سياق العمل الحالي.

### 4.6 الواجهة الأمامية (Frontend)

- **التوجيه:**
  - `login`، `register` مع `loginGuard` (منع الدخول إن كان المستخدم مسجلاً).
  - `businesses` لاختيار العمل (بعد auth).
  - `biz/:bizId` مع `BusinessLayout` و`authGuard`، وأطفال: dashboard، stations، accounts، funds، vouchers، register-operation، journal، operation-types، collections، sidebar-settings، summary، reports، banks، exchangers، wallets، partners، warehouse، suppliers، settlements، pending، custom-screens، ui-builder، exchange-rates، roles، reports-advanced، journal-categories، warehouse-operations، expense-categories، expense-budget، salaries، إلخ.
- **الحالة والسياق:**
  - `AuthService`: تخزين/استرجاع JWT، تسجيل خروج عند 401.
  - `BusinessService` (أو ما يكافئه): العمل المختار حالياً (bizId) للاستدعاءات والـ routing.
  - `ApiService`: نقطة مركزية لجميع استدعاءات الـ API مع الـ headers والـ error handling.
- **المكونات:** header، sidebar (ديناميكي حسب الصلاحيات/الإعدادات)، breadcrumbs، confirm-modal، toast؛ مكونات Three.js للخلفيات/الرسوم (three-background، three-chart، three-stat-card، three-network).
- **الصفحات:** كل صفحة مرتبطة بوحدة عمل (مثلاً stations، accounts، vouchers، collections) وتستخدم `ApiService` و`BusinessService` وتتوارث من `BasePageComponent` حيث وُجد.

### 4.7 WebSocket

- **الملف:** `websocket.service.ts` (backend)؛ يُهيأ على نفس الـ HTTP server في `index.ts`.
- **الاستخدام:** إشعارات فورية (مثل تحديث لوحة، إشعارات للمستخدم) دون فحص تفصيلي للملف في هذا التحليل.

### 4.8 الأمان

- **المصادقة:** JWT مع `JWT_SECRET` (إجباري في الإنتاج؛ إن لم يُعيّن يُولَّد عشوائي في التطوير مع تحذير).
- **كلمة المرور:** bcrypt (مضمن في auth).
- **الصلاحيات:** RBAC عبر `user_roles` و`role_permissions` و`checkPermission` في المسارات الحساسة.
- **العزل:** كل طلب مرتبط بعمل يُتحقق فيه من bizId ومالكية الموارد.
- **Rate limiting و XSS و Security headers:** كما في قسم التدفق أعلاه.
- **CORS:** قائمة بيضاء صارمة.

---

## 5. قاعدة البيانات

- **المحرك:** PostgreSQL 16.
- **الاتصال:** `postgres` (node-postgres) مع connection pool (max، idle_timeout، connect_timeout، max_lifetime، prepare).
- **الوصف:** عبر Drizzle في `schema/core.ts`؛ جداول مع علاقات مرجعية، وunique indices حيث يلزم (مثل account_balances، fund_balances، sequence_counters)، وعدد كبير من الـ enums لضبط القيم المسموحة.
- **الترحيلات:** Drizzle Kit (`db:generate`, `db:migrate`, `db:push`); سكربتات إضافية مثل `check-schema-match.ts` للتحقق من تطابق المخطط.

---

## 6. النشر (Deployment)

- **Docker Compose:**
  - **postgres:** حجم بيانات ونسخ احتياطي في `/backups`.
  - **backend:** يعتمد على صحة postgres؛ يعرض المنفذ 3000؛ متغيرات بيئة: DATABASE_URL، JWT_SECRET، NODE_ENV، ALLOWED_ORIGINS، إعدادات الـ pool.
  - **frontend:** بناء Angular ثم تقديمه عبر Nginx (منفذ 80/443)، مع إمكانية SSL عبر volumes.
- **الصحة:** healthcheck للـ backend وfrontend وpostgres لضمان الجاهزية.

---

## 7. نقاط القوة في المعمارية

1. **عزل بيانات واضح:** تعدد أعمال مع bizId وطبقة تحقق صلاحيات (bizAuth + ownership).
2. **محرك معاملات مركزي:** توحيد القيود والأرصدة في خدمة واحدة يقلل الأخطاء ويضمن الاتساق.
3. **معاملات DB ذرية:** استخدام `db.transaction()` لكل عملية مالية كاملة.
4. **ترقيم منظم:** تسلسلات مرتبطة بالخزينة والسنة ونوع السند مع دعم قوالب العمليات.
5. **أمان متعدد المستويات:** JWT، rate limit، XSS، CORS، RBAC، وتحقق ملكية الموارد.
6. **واجهة غنية:** شاشات مخصصة، واجهات ديناميكية (UI Builder)، وسير عمل قابل للإعداد.
7. **قابلية النشر:** Docker Compose جاهز مع healthchecks وبيئة إنتاج.

---

## 8. توصيات معمارية (مختصرة)

1. **تقسيم api.rest.ts:** الملف كبير جداً؛ تقسيمه إلى ملفات حسب المجال (vouchers، accounts، funds، collections، screens، إلخ) مع الحفاظ على نفس الـ middleware والـ shared helpers.
2. **توثيق API رسمي:** إنشاء OpenAPI (Swagger) من المسارات الحالية (أو استخدام @orpc/openapi إن كان معتمداً) لسهولة التكامل والاختبار.
3. **تحسين استعلامات القوائم:** مراجعة استعلامات القوائم الكبيرة (مثل vouchers، journal entries) وإضافة pagination/فهارس حيث يلزم.
4. **نسخ احتياطي وآلية استعادة:** توثيق واست automatization للـ backups في `/backups` وآلية استعادة موحدة.
5. **مراقبة وتتبع:** إضافة تتبع طلبات (request id) وسجلات منظمة (structured logging) لتسهيل تتبع الأخطاء والأداء في الإنتاج.
6. **اختبارات تكامل:** زيادة تغطية اختبارات التكامل للمسارات الحرجة (إنشاء سند، إلغاء سند، تحقق صلاحيات، عزل bizId).

---

## 9. خلاصة

نظام **حساباتي** مبني كتطبيق ويب حديث متعدد الأعمال، مع:

- **Backend:** Hono + Drizzle + PostgreSQL، محرك معاملات مركزي، صلاحيات وملكية واضحة، وطبقات أمان متعددة.
- **Frontend:** Angular 21 مع توجيه حسب العمل، وواجهات غنية (شاشات مخصصة، قوالب عمليات، تقارير).
- **قاعدة البيانات:** مخطط غني يدعم محاسبة مزدوجة، صناديق، حسابات، مخزون، تحصيل، توريد، رواتب، وميزانيات مع تتبع تدقيق وترقيم منظم.

هذا التحليل يغطي النظام «بالحرف» من نقطة الدخول إلى قاعدة البيانات والواجهة والنشر، ويمكن استخدامه كمرجع لاتخاذ قرارات معمارية وتطويرية لاحقة.
