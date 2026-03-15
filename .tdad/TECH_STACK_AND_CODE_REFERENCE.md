# مرجع التقنيات والمحركات والقاعدة (مستخرج من الكود)

هذا الملف يعكس **بالضبط** ما في المشروع من كود. يُحدَّث عند تغيير التقنيات أو المسارات أو المحركات.

---

## 1. التقنيات الفعلية

### Frontend (من `frontend/package.json`)
| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| Angular | ^21.2.0 | إطار الواجهة |
| TypeScript | ~5.9.2 | لغة الكود |
| pnpm | 10.29.2 | مدير الحزم |
| Tailwind CSS | ^4.2.1 | التنسيقات |
| Chart.js | ^4.5.1 | الرسوم البيانية |
| ng2-charts | ^9.0.0 | تكامل Chart مع Angular |
| GSAP | ^3.14.2 | الحركات |
| Three.js | ^0.183.2 | التصورات ثلاثية الأبعاد |
| angular-gridster2 | ^21.0.1 | شبكة لوحة التحكم |
| ngx-color-picker | ^20.1.1 | منتقي الألوان |
| RxJS | ~7.8.0 | التفاعل غير المتزامن |
| Playwright | ^1.58.2 | اختبارات E2E (devDependencies) |

- **تشغيل التطوير:** `pnpm start` → `ng serve` (من `frontend/angular.json` المنفذ الافتراضي 4200).
- **المسارات:** معرّفة في `frontend/src/app/app.routes.ts` (انظر القسم 4).

### Backend (من `backend/package.json`)
| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| Hono | ^4.7.6 | إطار الـ API |
| @hono/node-server | ^1.13.8 | خادم Node |
| Drizzle ORM | ^0.39.3 | الوصول لقاعدة البيانات |
| postgres (postgres.js) | ^3.4.5 | عميل PostgreSQL |
| bcryptjs | ^2.4.3 | تشفير كلمات المرور |
| jsonwebtoken | ^9.0.2 | JWT للمصادقة |
| zod | ^3.24.2 | التحقق من المدخلات |
| dotenv | ^16.4.7 | متغيرات البيئة |
| ws | ^8.19.0 | WebSocket |
| tsx | ^4.19.2 | تشغيل TypeScript (dev) |
| drizzle-kit | ^0.30.5 | migrations و push (dev) |

- **تشغيل التطوير:** `npm run dev` → `tsx watch src/index.ts` (المنفذ من `process.env.PORT` أو 3000).
- **نقطة الدخول:** `backend/src/index.ts`.

### قاعدة البيانات
| البند | القيمة من الكود |
|-------|-----------------|
| المحرك | PostgreSQL |
| عميل الاتصال | `postgres` (postgres.js) من `backend/src/db/index.ts` |
| متغير الاتصال | `process.env.DATABASE_URL` أو الافتراضي `postgresql://postgres:postgres@localhost:5432/hesabati` |
| الاتصال | `drizzle(client, { schema })` مع استيراد `* as schema from './schema/index.ts'` |
| إعدادات الـ pool | max من `DB_MAX_CONNECTIONS` أو 20، idle_timeout من `DB_IDLE_TIMEOUT` أو 20، connect_timeout من `DB_CONNECT_TIMEOUT` أو 10، max_lifetime 30 دقيقة، prepare: true |

---

## 2. هيكل الـ API من الكود

### Base URL
- من الـ Frontend: `ApiService` يستخدم `private readonly API_URL = '/api'` (`frontend/src/app/services/api.service.ts`).
- الـ proxy في التطوير: `frontend/proxy.conf.json` يوجّه `/api` و `/health` إلى `http://localhost:3000`.

### تسلسل المسارات والـ Middleware (من `backend/src/index.ts`)
1. CORS (قائمة بيضاء من `ALLOWED_ORIGINS` أو localhost).
2. Logger.
3. Rate limit: `/api/auth/login` → 20 طلب/15 دقيقة؛ `/api/*` → 1000 طلب/دقيقة.
4. XSS Sanitize على `/api/*`.
5. Security headers (X-Frame-Options, X-Content-Type-Options، إلخ).
6. **عام بدون مصادقة:** `app.route('/api/auth', authRoutes)`.
7. **باقي الـ API محمي:** `app.use('/api/*', authMiddleware())` ثم:
   - `app.route('/api/dashboard', dashboardRoutes)`
   - `app.route('/api', apiRoutes)`
   - `app.route('/api', enhancementRoutes)`

### المصادقة (من `backend/src/middleware/auth.ts`)
- الـ header: `Authorization: Bearer <token>`.
- التوكن: JWT من `jsonwebtoken`، الـ secret من `process.env.JWT_SECRET` أو مفتاح عشوائي عند التشغيل.
- الـ payload: `{ userId, username, role }`، مدة الصلاحية 7 أيام.
- بعد التحقق يُضاف المستخدم إلى السياق: `c.set('user', decoded)`.

### التحقق من صلاحية العمل (من `backend/src/middleware/bizAuth.ts`)
- الـ middleware: `bizAuthMiddleware()`.
- يقرأ `bizId` من `c.req.param('bizId')`.
- يتحقق من المستخدم (من `authMiddleware`)؛ admin يمر على أي عمل؛ غيره يمر حالياً (مع وضع `bizId` و `bizAccess` في السياق).

### مسارات Auth الفعلية (من `backend/src/routes/auth.ts`)
- `POST /api/auth/login` — body: `{ username, password }`. يرجع `{ token, user: { id, username, fullName, role } }` أو 400/401/403/500.
- `POST /api/auth/register` — body: `{ username, password, fullName, role? }`. يرجع 201 مع `{ user }` أو 400/500.
- `GET /api/auth/me` — يتطلب `authMiddleware()`. يرجع بيانات المستخدم أو 401/404/500.

### مسارات Dashboard (من `backend/src/routes/dashboard.ts`)
- `GET /api/dashboard/stats` — يرجع إحصائيات (businesses, stations, employees, accounts, funds, suppliers, partners, vouchers, pendingAccounts, warehouses, totalSalaries).

### مسارات API الرئيسية (من `backend/src/routes/api.ts`)
جميع المسارات التالية تحت البادئة `/api` وتخضع لـ `authMiddleware()`؛ معظم مسارات الأعمال تخضع أيضاً لـ `bizAuthMiddleware()` وتحتوي على `:bizId` في المسار. أمثلة (من الكود):
- `GET/POST /businesses`, `GET /businesses/:id`
- `GET/POST/PUT/DELETE /businesses/:bizId/stations`, `/stations/:id`
- `GET/POST/PUT/DELETE /businesses/:bizId/employees`, `/employees/:id`
- `GET/POST/PUT/DELETE /businesses/:bizId/accounts`, `/accounts/:id`, allowed-links, allowed-targets
- `GET/POST/PUT/DELETE /businesses/:bizId/funds`, `/funds/:id`
- `GET/POST /businesses/:bizId/vouchers`, `DELETE /businesses/:bizId/vouchers/:id`
- `GET/POST/PUT/DELETE /businesses/:bizId/journal-entries`
- `GET/POST/PUT/DELETE /businesses/:bizId/warehouses`, `/warehouse-operations`
- `GET/POST/PUT/DELETE /businesses/:bizId/suppliers`, `/suppliers/:id`
- `GET/POST/PUT/DELETE /businesses/:bizId/pending-accounts`, `/pending-accounts/:id`
- `GET/POST/PUT/DELETE /businesses/:bizId/settlements`, `/settlements/:id`
- `GET/POST/PUT/DELETE /businesses/:bizId/expense-categories`, `/expense-categories/:id`
- `GET/POST/PUT/DELETE /businesses/:bizId/expense-budget`, `/expense-budget/:id`
- `GET/POST/PUT/DELETE /businesses/:bizId/salaries`, `/salaries/:id`
- `GET /currencies`
- `GET /businesses/:bizId/sidebar-sections`, `/sidebar-items`, `/businesses/:bizId/users/:userId/sidebar`
- وغيرها في نفس الملف.

### مسارات التحسينات (من `backend/src/routes/enhancements.ts`)
- مثلاً: `GET /businesses/:bizId/vouchers-enhanced`، وتفاصيل سند مع سجل تدقيق، إلخ (تحت `/api`).

---

## 3. المحركات (الخدمات) الفعلية

جميعها في `backend/src/services/`:

| الملف | الوظيفة من الاستخدام في الكود |
|-------|-------------------------------|
| `transaction.service.ts` | إنشاء السندات والقيود وإلغاء السندات (postTransaction, cancelTransaction, confirmDraftTransaction) وتحديث الأرصدة. |
| `workflow.service.ts` | سير عمل السندات (getAvailableTransitions, executeTransition, getWorkflowHistory، إلخ). |
| `reporting.service.ts` | التقارير المالية (getProfitAndLoss, getTrialBalance, getAccountStatement, getDailySummary، إلخ). |
| `inventory.service.ts` | حركة المخزون وتقاريره (processStockMovement, getStockLevels, getLowStockAlerts, getStockValuation، إلخ). |
| `currency.service.ts` | تحويل العملات وأسعار الصرف. |
| `ui-builder.service.ts` | الصفحات والمكونات ومصادر البيانات (getPages, getPage, createPage, addComponent, getDataSources, executeDataSource، إلخ). |
| `websocket.service.ts` | اتصال WebSocket؛ يُهيَّأ في `index.ts` مع الخادم HTTP. |

---

## 4. الجداول (من `backend/src/db/schema/core.ts`)

أسماء الجداول كما في PostgreSQL (snake_case في DB، camelCase في Drizzle):

users, currencies, exchange_rates, roles, role_permissions, user_roles, businesses, business_partners, stations, employees, accounts, account_allowed_links, account_balances, employee_billing_accounts, billing_systems_config, billing_account_types, funds, fund_balances, suppliers, supplier_balances, voucher_categories, vouchers, attachments, daily_collections, collection_details, delivery_records, expense_budget, expense_categories, salary_records, warehouses, inventory_items, inventory_stock, inventory_movements, reconciliations, pending_accounts, billing_periods, diesel_consumption, audit_log, operation_types, operation_type_accounts, journal_entries, journal_entry_lines, sidebar_sections, sidebar_items, user_sidebar_config, fund_types, bank_types, exchange_types, e_wallet_types, screen_templates, screen_widgets, screen_widget_templates, screen_widget_accounts, screen_widget_warehouses, screen_permissions, custom_screen_config, sequence_counters, warehouse_types, journal_entry_categories, warehouse_operations, warehouse_operation_items, analytics_snapshots, workflow_transitions, workflow_history, ui_data_sources, ui_pages, ui_components.

---

## 5. مسارات الواجهة (من `frontend/src/app/app.routes.ts`)

- عام: `login`, `register`, `businesses`, `biz/:bizId` (مع children).
- الحراس: `loginGuard` لصفحتي login و register؛ `authGuard` لـ businesses وكل مسارات `biz/:bizId`.
- أطفال `biz/:bizId`: `''` (dashboard), `stations`, `accounts`, `employees`, `funds`, `vouchers`, `vouchers/receipt`, `vouchers/payment`, `journal`, `operation-types`, `collections`, `billing-systems`, `sidebar-settings`, `summary`, `reports`, `banks`, `exchangers`, `wallets`, `partners`, `warehouse`, `suppliers`, `settlements`, `pending`, `custom-screens`, `ui-builder`, `exchange-rates`, `roles`, `reports-advanced`, `journal-categories`, `warehouse-operations`, `expense-categories`, `expense-budget`, `salaries`.
- إعادة التوجيه: `''` → login، `**` → login.

---

## 6. تخزين الجلسة في الواجهة (من `frontend/src/app/services/auth.service.ts`)

- التوكن: `localStorage.getItem('hesabati_token')`.
- المستخدم: `localStorage.getItem('hesabati_user')` (JSON).
- تسجيل الدخول: طلب إلى `/api/auth/login`، ثم حفظ التوكن والمستخدم في الـ signals وفي localStorage.

---

يُحدَّث هذا الملف عند أي تغيير في التقنيات أو المسارات أو المحركات أو الجداول في الكود.
