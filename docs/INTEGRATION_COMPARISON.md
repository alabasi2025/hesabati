# تقرير مقارنة: الواجهة × الباك اند × التكاملات × قاعدة البيانات

تاريخ الفحص: 2025

---

## 1. نظرة عامة

| المكوّن | التقني | الحالة |
|---------|--------|--------|
| **الواجهة** | Angular، `ApiService` + `AuthService`، `/api` + `/api/auth` |
| **الباك اند** | Hono، مسارات `/api` و`/api/auth` و`/api/dashboard` |
| **التكاملات** | WebSocket فقط (نفس الخادم، منفذ 3000) |
| **قاعدة البيانات** | PostgreSQL، Drizzle، 66 جدولاً في السكما |

---

## 2. الواجهة ↔ الباك اند (API)

### 2.1 الأساسيات
- **الواجهة:** `API_URL = '/api'`، توكن في `Authorization: Bearer <token>`.
- **الباك اند:** جميع المسارات تحت `/api/*` محمية بـ `authMiddleware()` ما عدا `/api/auth/login` و`/api/auth/register`.
- **النتيجة:** متطابق — نفس الأساس والمسارات.

### 2.2 المسارات المستخدمة من الواجهة والموجودة في الباك اند

الواجهة تستدعي عبر `ApiService` و`AuthService` المسارات التالية، وهي مُعرّفة في الباك اند:

| المجموعة | أمثلة مسارات | الملف في الباك اند |
|----------|--------------|---------------------|
| Auth | `POST /api/auth/login`, `GET /api/auth/me` | `auth.ts` |
| Dashboard | `GET /api/dashboard/stats` | `dashboard.ts` |
| الأعمال | `GET/POST /api/businesses`, `GET /api/businesses/:id` | `api.ts` |
| المحطات | `GET/POST/PUT/DELETE /api/businesses/:bizId/stations*`, `PUT /api/stations/:id` | `api.ts` |
| الموظفون | `GET/POST/PUT/DELETE /api/businesses/:bizId/employees*`, `PUT/DELETE /api/employees/:id` | `api.ts` |
| حسابات الفوترة | `GET/POST/PUT/DELETE /api/employee-billing-accounts*` | `api.ts` |
| الحسابات | `GET/POST/PUT/DELETE /api/businesses/:bizId/accounts*`, روابط مسموحة | `api.ts` |
| الصناديق | `GET/POST/PUT/DELETE /api/businesses/:bizId/funds*` | `api.ts` |
| السندات | `GET/POST/DELETE /api/businesses/:bizId/vouchers*` | `api.ts` + `enhancements.ts` |
| التحصيل/التوريد | `GET/POST /api/businesses/:bizId/collections*`, `POST /api/collections/:id/deliveries` | `api.ts` |
| الشركاء/الموردون | `GET/POST/PUT/DELETE /api/businesses/:bizId/partners*`, `*suppliers*` | `api.ts` |
| المخازن | `GET/POST/PUT/DELETE /api/businesses/:bizId/warehouses*` | `api.ts` |
| الحسابات المعلقة | `GET/POST/PUT/DELETE /api/businesses/:bizId/pending-accounts*` | `api.ts` |
| التصفيات | `GET/POST/PUT/DELETE /api/businesses/:bizId/settlements*` | `api.ts` |
| أنواع العمليات | `GET/POST/PUT/DELETE /api/businesses/:bizId/operation-types*`, clone, toggle, check-name | `api.ts` + `enhancements.ts` |
| القيود/التصنيفات | `GET/POST/DELETE /api/businesses/:bizId/journal-entries*`, `*journal-entry-categories*` | `api.ts` |
| أنظمة الفوترة | `*billing-systems-config*`, `*billing-account-types*` | `api.ts` |
| أنواع (صناديق/بنوك/صراف/محفظة) | `*fund-types*`, `*bank-types*`, `*exchange-types*`, `*e-wallet-types*` | `api.ts` |
| السايدبار | `*sidebar-sections*`, `*sidebar-items*`, `*users/:userId/sidebar*`, copy, reset | `api.ts` + `enhancements.ts` |
| الشاشات المخصصة | `*screens*`, `*widgets*`, `*widget-templates*`, `*widget-accounts*`, permissions, clone, copy | `api.ts` |
| إعداد نمط التحصيل | `GET/PUT /api/businesses/:bizId/screens/:screenId/collection-style-config` | `api.ts` (customScreenConfig + layoutConfig) |
| العملات/المرفقات/أسعار الصرف | `GET /api/currencies`, `*attachments*`, `*exchange-rates*` | `api.ts` |
| الأدوار والصلاحيات | `*roles*`, `*user-roles*` | `api.ts` |
| عكس السند / سير العمل | `POST .../vouchers/:id/reverse`, `*transitions*`, `*workflow-history*` | `api.ts` + `enhancements.ts` |
| التقارير | `*reports/profit-loss*`, `*account-statement*`, `*daily-summary*`, `*trial-balance*`, monthly-revenue, aggregated | `api.ts` |
| تحسينات السندات | `GET .../vouchers-enhanced`, `PUT .../vouchers/:id`, `POST .../status`, account-balance, details, vouchers-draft | `enhancements.ts` |
| ويدجت الشاشات | `*widget-stats*`, `*widget-log*`, `*widget-accounts*`, `*widget-chart*`, `*widget-notes*`, enhanced | `api.ts` + `enhancements.ts` |
| UI Builder | `*ui/pages*`, `*ui/components*`, `*ui/data-sources*` | `api.ts` |
| المخزون | `*warehouse-types*`, `*warehouse-operations*`, `*stock-levels*`, `*stock-alerts*`, إلخ | `api.ts` |
| الصحة | `GET /health`, `GET /health/db` | `index.ts` |

لا توجد استدعاءات من الواجهة لمسارات غير موجودة في الباك اند في الكود الحالي.

### 2.3 ما في الباك اند وليس في الواجهة (مسارات لا يستدعيها ApiService / AuthService)

هذه المسارات مُعرّفة في الباك اند لكن **لا يوجد لها استدعاء** في `ApiService` أو `AuthService`:

| النوع | المسار / الوظيفة | الملاحظة |
|-------|------------------|----------|
| **Auth** | `POST /api/auth/register` | تسجيل مستخدم جديد — الواجهة لا تعرض شاشة تسجيل أو لا تستدعيها من ApiService. |
| **حساب واحد** | `GET /api/accounts/:id` | جلب حساب بالمعرّف — الواجهة تستخدم `getAccounts(bizId)` و`getAccountLinks` فقط، ولا توجد `getAccount(id)`. |
| **مخزن واحد** | `GET /api/warehouses/:id` | جلب مخزن بالمعرّف — لا توجد `getWarehouse(id)` في ApiService. |
| **صندوق واحد** | `GET /api/funds/:id` | جلب صندوق بالمعرّف — لا توجد `getFund(id)` في ApiService. |
| **المحطات** | `POST /api/businesses/:bizId/stations` | إضافة محطة — لا توجد `createStation()` في ApiService. |
| **المحطات** | `DELETE /api/businesses/:bizId/stations/:id` | حذف محطة — لا توجد `deleteStation()` في ApiService. |
| **مسارات Legacy (بدون bizId)** | `GET /api/stations`, `GET /api/employees`, `GET /api/accounts`, `GET /api/funds`, `GET /api/voucher-categories`, `GET /api/suppliers` | قوائم عامة بدون ربط بعمل — الواجهة تستدعي دائماً المسارات المرتبطة بـ `bizId`، فلا استخدام لهذه من ApiService. |

**ملاحظة:** مسارات التعديل/الحذف التي تستخدم `bizId` في الباك اند (مثل `PUT /api/businesses/:bizId/accounts/:id`) موجودة؛ الواجهة تستخدم أحياناً النسخة بدون `bizId` (مثل `PUT /api/accounts/:id`) والموجودة كـ legacy في الباك اند، لذلك التكامل يعمل. الفرق أعلاه = مسارات إضافية في الباك اند لا تُستدعى من الواجهة حالياً.

### 2.4 ما في الواجهة وليس في الباك اند (استدعاءات بدون route مطابق)

تمت مراجعة كل دوال `ApiService` و`AuthService` ومساراتها:

- **النتيجة:** لا يوجد استدعاء من الواجهة لمسار **لا يطابق** route معرّفاً في الباك اند. كل المسارات المستخدمة (بما فيها `/api/auth/login`, `/api/dashboard/stats`, `/api/businesses/...`, `/api/.../vouchers`, `/api/.../collections`, إلخ) لها مقابل في `api.ts` أو `enhancements.ts` أو `dashboard.ts` أو `auth.ts`.

**استثناء محتمل:** إذا كانت إحدى الصفحات تبني مساراً يدوياً (بدون استخدام ApiService) لطلب معيّن، فلن يظهر في هذه المراجعة؛ التقرير يعتمد على ما في `api.service.ts` و`auth.service.ts` فقط.

### 2.5 ملاحظات التكامل

- الواجهة تستخدم أحياناً مسارات بدون `bizId` (مثل `PUT /accounts/:id`)؛ الباك اند يوفّر مسارات "legacy" مطابقة.
- إعداد الشاشة المخصصة (collection-style): الواجهة تستدعي `collection-style-config`؛ الباك اند يخدمها من جدول `custom_screen_config` والنظام الجديد `screen_templates.layout_config` — متكامل.

---

## 3. الباك اند ↔ قاعدة البيانات

### 3.1 الجداول المستخدمة في الباك اند
الباك اند يستخدم جداول السكما (من `db/schema/index.ts`) مثل:  
`users`, `businesses`, `stations`, `employees`, `accounts`, `funds`, `vouchers`, `customScreenConfig`, `screenTemplates`, `workflowTransitions`, `journalEntryCategories`, `warehouseTypes`, إلخ.

### 3.2 فروقات قاعدة البيانات (من فحص db:check)

| النوع | التفاصيل |
|-------|----------|
| **جدول ناقص** | `expense_categories` — موجود في السكما وغير موجود في القاعدة. لا يوجد حالياً route في الباك اند ولا استدعاء في الواجهة لتصنيفات المصروفات؛ الجدول مُعدّ للاستخدام لاحقاً أو في seed. |
| **جداول زائدة في DB** | `flow_types`, `screen_collection_style_config`, `template_types` — ليست في السكما الحالي (بقايا إعداد قديم أو هجرات سابقة). |
| **أعمدة زائدة في `operation_types`** | `main_account_id`, `main_fund_id`, `template_type_id` — غير معرّفة في السكما الحالي. |

التكامل بين الباك اند وقاعدة البيانات يعمل للجداول والأعمدة المعرّفة في السكما؛ الجدول الناقص والأشياء الزائدة لا تمنع المسارات الحالية من العمل.

---

## 4. التكاملات (خارج النظام)

| التكامل | الوصف | الحالة |
|---------|--------|--------|
| **WebSocket** | الواجهة تتصل بـ `ws://host:3000/ws?userId=...&bizId=...` للإشعارات. الخادم يقدّم `wsService` على نفس المنفذ. | متكامل — نفس المنفذ والنطاق. |
| **APIs خارجية** | لا يوجد في الكود استدعاءات لخدمات خارجية (دفع، بريد، إلخ). | لا يوجد تكامل خارجي. |

---

## 5. خلاصة التكامل

| المحور | الحالة | ملاحظات |
|--------|--------|----------|
| **واجهة ↔ باك اند** | متطابق | مسارات API المستخدمة من الواجهة موجودة ومحمية في الباك اند. |
| **باك اند ↔ قاعدة البيانات** | متطابق مع تحفظات | يعمل على كل الجداول/الأعمدة المعرّفة في السكما؛ جدول `expense_categories` ناقص في DB، وجداول/أعمدة زائدة قديمة لا يستخدمها الكود. |
| **واجهة ↔ قاعدة البيانات** | غير مباشر | عبر الباك اند فقط؛ لا اتصال مباشر من الواجهة بالـ DB. |
| **التكاملات** | WebSocket فقط | متكامل مع الخادم الحالي؛ لا تكاملات خارجية. |

---

## 6. توصيات

1. **قاعدة البيانات:** إنشاء جدول `expense_categories` إذا كان مخططاً استخدامه (مثلاً من هجرة أو `drizzle-kit push`)، أو إزالته من السكما إن لم يكن مطلوباً.
2. **الجداول/الأعمدة الزائدة:** يمكن تركها كما هي إن لم تسبب أخطاء، أو حذفها بعد نسخ احتياطي إذا رغبت في تطهير القاعدة من بقايا قديمة.
3. **الواجهة/الباك اند:** لا يلزم تغيير للتكامل الحالي؛ الاستدعاءات والمسارات متوافقة.
