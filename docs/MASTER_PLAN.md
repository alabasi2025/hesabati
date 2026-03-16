# 📋 الخطة الشاملة لإعادة هيكلة نظام حساباتي
**تاريخ الإعداد:** 2026-03-16  
**المصدر:** تحليل مباشر للكود (لا تقارير — كود حقيقي)  
**الحالة:** 🔄 قيد التنفيذ

---

## 📊 الوضع الحالي — أرقام من الكود

| المؤشر | القيمة الحقيقية |
|--------|----------------|
| جداول قاعدة البيانات | 77 جدول في `schema/core.ts` |
| endpoints API | 293 طريقة في `api.service.ts` |
| ملفات Route (Backend) | 29 ملف + `api.rest.ts` (2,662 سطر) |
| DB calls مباشرة في `api.rest.ts` | 194 استدعاء |
| صفحات Frontend | 48 صفحة (~22,000 سطر TS) |
| ملفات SCSS | 47 ملف (12,319 سطر) |
| محركات موجودة في `/services/` | 7 محركات |
| محركات في `/middleware/` (موقع خاطئ) | 2 (sequencing, permissions) |
| محركات مفقودة كلياً | 6 محركات |
| سكريبتات يدوية في `/scripts/` | 41 سكريبت |
| مهاجرات رسمية (drizzle) | 10 مهاجرات |
| اختبارات E2E | 2 ملف (284 سطر) |

---

## 🎯 الهدف الاستراتيجي

تحويل النظام من **معمارية أحادية مكررة** إلى **معمارية قائمة على محركات ومكتبة مشتركة**:

```
قبل:                              بعد:
api.rest.ts (2,662 سطر)    →    engines/ (15 محرك منظم)
194 DB call مباشر          →    ~30 DB call مباشر فقط
12,319 سطر SCSS مكرر       →    ~2,500 سطر (_shared.scss)
450 سطر/صفحة متوسط         →    50-80 سطر/صفحة (BasePage)
42+ signal مكرر            →    BasePage موحد
```

---

## ⚙️ المحركات الـ 15 — الحالة الكاملة

### المجموعة 1: P0 — حرج (يجب تنفيذه فوراً)

#### 1. CRUD Engine — `engines/crud.engine.ts` ✅ مُنشأ
| البند | التفصيل |
|-------|---------|
| **الحالة** | ✅ تم إنشاؤه في Phase 1 |
| **المشكلة كانت** | 9 route files تكرر نفس CRUD (~1,800 سطر مكرر) |
| **الدوال** | `getAll`, `getOne`, `createRecord`, `updateRecord`, `deleteRecord`, `checkDuplicate` |
| **التأثير** | كل route بسيط ستتقلص من ~200 سطر → ~30 سطر |
| **الأولوية** | P0 ✅ تم |

#### 2. Currency Engine — `engines/currency.engine.ts` ✅ مُنشأ ومربوط
| البند | التفصيل |
|-------|---------|
| **الحالة** | ✅ تم إنشاؤه وربطه بالـ routes في Phase 1 |
| **المشكلة كانت** | الكود موجود في `services/` لكن 0 route يستخدمه! |
| **الدوال** | `getExchangeRate` (مع cache), `convertAmount`, `getAmountInBaseCurrency`, `getUnifiedBalances`, `addExchangeRate`, `getLatestRates`, `validateCurrency` |
| **ما تم** | ربط `/exchange-rates` endpoints + endpoint جديد `/unified-balances` |
| **الأولوية** | P0 ✅ تم |

#### 3. Inventory Engine — `services/inventory.service.ts` 🔴 BUG مُصلَح
| البند | التفصيل |
|-------|---------|
| **الحالة** | ✅ BUG مُصلَح في Phase 1 |
| **BUG كان** | `purchase-invoices/confirm` و `/receive` لا يستدعيان `processStockMovement` → المخزون لا يتحدث! |
| **الإصلاح** | إضافة استدعاء `processStockMovement` داخل `db.transaction()` في كلا الـ endpoints |
| **الدوال الموجودة** | `calculateCOGS`, `processStockMovement`, `getStockLevels`, `getLowStockAlerts`, `getStockValuation`, `getItemMovementHistory` |
| **المطلوب لاحقاً** | نقل إلى `engines/inventory.engine.ts` + إضافة `getRealTimeStock()` |
| **الأولوية** | P0 ✅ BUG مُصلَح |

#### 4. Screens Engine — `engines/screens.engine.ts` ❌ مفقود
| البند | التفصيل |
|-------|---------|
| **الحالة** | ❌ لم يُبنَ بعد |
| **المشكلة** | 35+ endpoint منتشرة في `api.rest.ts` (سطور 1064-2026) |
| **~80 DB call مباشر** | كلها داخل `api.rest.ts` |
| **المطلوب** | استخراج: `getScreens`, `createScreen`, `cloneScreen`, `manageWidgets`, `getWidgetData`, `setScreenPermissions` |
| **التأثير** | `api.rest.ts` يتقلص من 2,662 → ~1,200 سطر |
| **الأولوية** | P0 ⏳ الأسبوع 4 |

#### 5. Transaction Engine — `services/transaction.service.ts` ⚠️ موجود لكن ناقص الربط
| البند | التفصيل |
|-------|---------|
| **الحالة** | موجود (1,104 سطر) لكن فقط 4 من 29 route تستخدمه (14%) |
| **الدوال الموجودة** | `postTransaction`, `postMultiTransaction`, `cancelTransaction`, `confirmDraftTransaction`, `applyAccountingForConfirmedVoucher` |
| **المشكلة** | 21 route تكتب DB مباشرة بدون engine → لا audit log، لا تحقق رصيد |
| **المطلوب** | نقل إلى `engines/` + ربط 25 route بالمحرك |
| **الأولوية** | P0 ⏳ الأسبوع 2 |

---

### المجموعة 2: P1 — عالي

#### 6. Sequencing Engine — `engines/sequencing.engine.ts` ✅ منقول
| البند | التفصيل |
|-------|---------|
| **الحالة** | ✅ تم نسخه إلى `engines/` في Phase 1 |
| **الموقع القديم** | `middleware/sequencing.ts` (محفوظ للتوافق) |
| **الدوال** | 30+ دالة: `generateVoucherFullSequence`, `generateWarehouseOpFullSequence`, `getNextSequence`, إلخ |
| **المستخدم من** | 20 ملف route |
| **المطلوب** | إكمال `buildAccountHierarchyCode()` و `getMainAccountTypeSequence()` (فارغتان حالياً) |
| **الأولوية** | P1 ✅ منقول |

#### 7. Permissions Engine — `engines/permissions.engine.ts` ✅ منقول
| البند | التفصيل |
|-------|---------|
| **الحالة** | ✅ تم نسخه إلى `engines/` في Phase 1 |
| **الموقع القديم** | `middleware/permissions.ts` (محفوظ للتوافق) |
| **الدوال الموجودة** | `clearPermissionsCache`, `checkPermission`, `validateConstraints` |
| **المستخدم من** | 19 ملف route |
| **المطلوب** | إضافة `getUserMaxAmounts()` + `checkResourceLimit()` |
| **الأولوية** | P1 ✅ منقول |

#### 8. Workflow Engine — `services/workflow.service.ts` ⚠️ ناقص الربط
| البند | التفصيل |
|-------|---------|
| **الحالة** | موجود (289 سطر) لكن يُستخدم في route واحد فقط |
| **الدوال** | `getWorkflowConfig`, `getAvailableTransitions`, `canTransition`, `executeTransition`, `getWorkflowHistory`, `setupDefaultWorkflow`, `addTransition`, `deleteTransition` |
| **المشكلة** | `vouchers` في `api.rest.ts` تغير status مباشرة بدون `executeTransition` |
| **المطلوب** | نقل إلى `engines/` + إلزامية `executeTransition` عند كل تغيير حالة |
| **الأولوية** | P1 ⏳ الأسبوع 3 |

---

### المجموعة 3: P2 — متوسط

#### 9. Reporting Engine — `services/reporting.service.ts` ✅ يعمل جيداً
| البند | التفصيل |
|-------|---------|
| **الحالة** | موجود (512 سطر) ويعمل — أفضل المحركات |
| **الدوال** | `getProfitAndLoss`, `getTrialBalance`, `getAccountStatement`, `getDailySummary`, `getAggregatedProfitAndLoss`, `getMonthlyRevenueExpenses` |
| **المستخدم من** | `reporting.routes.ts` + `reports.routes.ts` ✅ |
| **المطلوب** | نقل إلى `engines/` + إضافة `getFundStatement()` + تحسين TTL management |
| **الأولوية** | P2 ⏳ الأسبوع 5 |

#### 10. UI-Builder Engine — `services/ui-builder.service.ts` ⚠️ ثغرة أمنية
| البند | التفصيل |
|-------|---------|
| **الحالة** | موجود (284 سطر) لكن `executeDataSource()` بدون حماية SQL Injection كافية |
| **الدوال** | `getPages`, `createPage`, `updatePage`, `deletePage`, `addComponent`, `executeDataSource` |
| **الثغرة** | `sql.raw(template)` بدون parameterization كافٍ |
| **المطلوب** | نقل إلى `engines/` + إضافة query parameterization + whitelist للجداول |
| **الأولوية** | P2 ⏳ الأسبوع 2 (أمني عاجل) |

#### 11. Notification Engine — `services/websocket.service.ts` ⚠️ استخدام جزئي
| البند | التفصيل |
|-------|---------|
| **الحالة** | موجود (124 سطر) لكن `notifyNewVoucher` غير مستدعاة تلقائياً |
| **الدوال** | `notifyBusiness`, `notifyUser`, `notifyScreenUpdate`, `notifyNewVoucher` |
| **المطلوب** | نقل إلى `engines/notification.engine.ts` + ربط بـ transaction.engine + notification queue |
| **الأولوية** | P2 ⏳ الأسبوع 3 |

#### 12. HR/Salary Engine — ❌ مفقود
| البند | التفصيل |
|-------|---------|
| **الحالة** | ❌ الكود موجود في `categories-expenses.routes.ts` (مكان خاطئ!) |
| **المشكلة** | 18 DB call مباشر لـ `salaryRecords` داخل ملف المصاريف |
| **المطلوب** | إنشاء `engines/hr.engine.ts` + `routes/api/salaries.routes.ts` مستقل + `calculateNetSalary()` |
| **الأولوية** | P2 ⏳ الأسبوع 4 |

#### 13. Billing Engine — ❌ مفقود
| البند | التفصيل |
|-------|---------|
| **الحالة** | ❌ `billing-config.routes.ts` يحتوي 15 DB call مباشر و 0 engine |
| **الجداول** | `billingSystemsConfig`, `billingAccountTypes`, `employeeBillingAccounts` |
| **المطلوب** | إنشاء `engines/billing.engine.ts` + `calculateBillingPeriod()` + `generateBillingInvoice()` |
| **الأولوية** | P2 ⏳ الأسبوع 5 |

#### 14. Attachment Engine — ❌ مفقود
| البند | التفصيل |
|-------|---------|
| **الحالة** | ❌ 9 endpoints في `api.rest.ts` (سطور 576-2320) |
| **الخطر** | مسار التخزين hardcoded: `'D:\\Archive\\Attachments'` — خطر في production! |
| **المطلوب** | إنشاء `engines/attachment.engine.ts` + `uploadFile()` + إصلاح hardcoded path |
| **الأولوية** | P2 ⏳ الأسبوع 5 |

---

### المجموعة 4: P3 — منخفض

#### 15. Audit Engine — ❌ مفقود
| البند | التفصيل |
|-------|---------|
| **الحالة** | ❌ جدول `auditLog` موجود لكن بدون محرك قراءة/استعلام |
| **المشكلة** | الكتابة في DB مباشرة عبر `db.insert(auditLog)` دون engine |
| **المطلوب** | `engines/audit.engine.ts` + `logAction()` موحد + `getAuditLog()` + `exportAuditReport()` |
| **الأولوية** | P3 ⏳ الأسبوع 5 |

---

## 📁 البنية المستهدفة

```
hesabati/
├── shared/                          # [جديد] مكتبة مشتركة
│   ├── types/                       # نماذج الـ 77 جدول
│   │   ├── voucher.types.ts
│   │   ├── account.types.ts
│   │   └── ...
│   ├── validators/                  # 21 مخطط Zod موحد
│   │   ├── voucher.validator.ts
│   │   └── ...
│   ├── constants/
│   │   └── enums.ts                 # VoucherStatus, AccountType, ...
│   └── utils/
│       ├── format.ts                # من helpers.ts
│       └── search.ts
│
├── backend/
│   └── src/
│       ├── engines/                 # [جديد] ✅ تم إنشاؤه
│       │   ├── index.ts             # ✅ نقطة دخول موحدة
│       │   ├── crud.engine.ts       # ✅ P0 - مُنشأ
│       │   ├── currency.engine.ts   # ✅ P0 - مُنشأ ومربوط
│       │   ├── sequencing.engine.ts # ✅ P1 - منقول
│       │   ├── permissions.engine.ts# ✅ P1 - منقول
│       │   ├── transaction.engine.ts# ⏳ P0 - الأسبوع 2 (نقل من services/)
│       │   ├── workflow.engine.ts   # ⏳ P1 - الأسبوع 3
│       │   ├── inventory.engine.ts  # ⏳ P1 - الأسبوع 1 (نقل + BUG مصلح)
│       │   ├── screens.engine.ts    # ⏳ P0 - الأسبوع 4
│       │   ├── reporting.engine.ts  # ⏳ P2 - الأسبوع 5
│       │   ├── ui-builder.engine.ts # ⏳ P2 - الأسبوع 2
│       │   ├── notification.engine.ts # ⏳ P2 - الأسبوع 3
│       │   ├── hr.engine.ts         # ⏳ P2 - الأسبوع 4
│       │   ├── billing.engine.ts    # ⏳ P2 - الأسبوع 5
│       │   ├── attachment.engine.ts # ⏳ P2 - الأسبوع 5
│       │   └── audit.engine.ts      # ⏳ P3 - الأسبوع 5
│       │
│       ├── routes/api/
│       │   ├── api.rest.ts          # 2,662 → ~400 سطر (بعد استخراج Screens)
│       │   ├── screens.routes.ts    # ⏳ جديد (من api.rest.ts)
│       │   ├── salaries.routes.ts   # ⏳ جديد (من categories-expenses)
│       │   ├── attachments.routes.ts# ⏳ جديد (من api.rest.ts)
│       │   ├── audit.routes.ts      # ⏳ جديد
│       │   └── ... (ملفات موجودة)
│       │
│       └── services/                # سيُنقل تدريجياً إلى engines/
│
└── frontend/
    └── src/app/
        ├── core/
        │   └── api/                 # [جديد] تقسيم api.service.ts (293 طريقة)
        │       ├── vouchers.api.ts
        │       ├── screens.api.ts
        │       ├── accounts.api.ts
        │       └── ... (16 ملف)
        │
        ├── shared/
        │   ├── base/
        │   │   └── base-page.component.ts  # [توسيع] يستوعب 42 signal مكررة
        │   └── components/
        │       ├── page-header/     # [جديد]
        │       ├── data-table/      # [جديد]
        │       ├── base-form/       # [جديد]
        │       ├── status-badge/    # [جديد]
        │       ├── amount-display/  # [جديد]
        │       ├── loading-state/   # [جديد]
        │       ├── empty-state/     # [جديد]
        │       └── confirm-dialog/  # [جديد]
        │
        └── shared/
            └── _shared.scss         # [جديد] 12,319 → ~2,500 سطر SCSS
```

---

## 📅 الجدول الزمني — 5 أسابيع

### الأسبوع 1 — إصلاح الـ Bugs + البنية الأساسية ✅ جاري

| اليوم | المهمة | المحرك | المسؤول | الحالة |
|-------|--------|--------|---------|--------|
| 1-2 | ✅ إصلاح BUG المخزون في `/confirm` و `/receive` | Inventory | Backend Dev 1 | ✅ تم |
| 1-2 | ✅ ربط `currency.engine` بـ exchange-rates routes | Currency | Backend Dev 1 | ✅ تم |
| 1-2 | ✅ إنشاء `engines/` + CRUD Engine + index | CRUD | Backend Lead | ✅ تم |
| 3-5 | ⏳ نقل `transaction.engine` + ربط أول 5 routes | Transaction | Backend Lead | ⏳ |
| 3-5 | ⏳ إصلاح SQL Injection في `ui-builder.executeDataSource` | UI-Builder | Security Lead | ⏳ |

### الأسبوع 2 — Transaction + Permissions + Sequencing

| اليوم | المهمة | المحرك | المسؤول | الأيام |
|-------|--------|--------|---------|-------|
| 1-5 | ربط 25 route بـ `transaction.engine` بدلاً من DB مباشر | Transaction | Backend Lead | 5 أيام |
| 1-2 | تحديث `sequencing.engine` (إكمال الدوال الفارغة) | Sequencing | Backend Dev 2 | 2 أيام |
| 3-4 | إضافة `getUserMaxAmounts()` لـ `permissions.engine` | Permissions | Backend Lead | 2 أيام |
| 3-5 | نقل `inventory.engine` إلى engines/ | Inventory | Backend Dev 1 | 2 أيام |

### الأسبوع 3 — Workflow + Notification

| اليوم | المهمة | المحرك | المسؤول | الأيام |
|-------|--------|--------|---------|-------|
| 1-3 | ربط كل voucher status changes بـ `executeTransition` | Workflow | Backend Dev 1 | 3 أيام |
| 4-5 | بناء `notification.engine` + ربط بـ transaction | Notification | Backend Dev 2 | 2 أيام |

### الأسبوع 4 — Screens + HR (أكبر مهام)

| اليوم | المهمة | المحرك | المسؤول | الأيام |
|-------|--------|--------|---------|-------|
| 1-5 | استخراج 35+ endpoint من `api.rest.ts` → `screens.engine` | Screens | Backend Lead | 5-6 أيام |
| 4-5 | بناء `hr.engine` + `salaries.routes.ts` مستقل | HR | Backend Dev 2 | 3 أيام |

### الأسبوع 5 — Billing + Attachment + Reporting + Audit

| اليوم | المهمة | المحرك | المسؤول | الأيام |
|-------|--------|--------|---------|-------|
| 1-2 | بناء `billing.engine` + ربط | Billing | Backend Dev 1 | 3 أيام |
| 2-3 | بناء `attachment.engine` + إصلاح hardcoded path | Attachment | Backend Dev 2 | 2 أيام |
| 4 | إضافة `getFundStatement()` لـ `reporting.engine` | Reporting | Backend Dev 2 | 2 أيام |
| 5 | بناء `audit.engine` + استبدال `db.insert(auditLog)` | Audit | Backend Dev 1 | 3 أيام |

---

## 🔧 مراحل إعادة هيكلة الـ Frontend

### المرحلة 5 (بالتوازي مع الأسبوع 3-4): المكونات المشتركة

#### المكونات المطلوبة (8 مكونات)

| المكون | يحل مشكلة | صفحات تستفيد |
|--------|-----------|--------------|
| `BasePage` (توسيع) | 42 signal مكرر (loading, showForm, editingId...) | جميع الـ 48 صفحة |
| `PageHeader` | عنوان + breadcrumb مكرر | 35+ صفحة |
| `DataTable` | جدول + pagination + sort مكرر | 30+ صفحة |
| `BaseForm` | نموذج + validation مكرر | 25+ صفحة |
| `StatusBadge` | `.badge` مكرر في 37 صفحة | 37 صفحة |
| `AmountDisplay` | `formatAmount()` مكرر | 20+ صفحة |
| `LoadingState` | `.loading` مكرر في 12 صفحة | 12 صفحة |
| `EmptyState` | `.empty-state` مكرر في 11 صفحة | 11 صفحة |

#### تقليص SCSS (47 ملف → 1 ملف مشترك)

| النمط | كمية التكرار | سطور مكررة |
|-------|-------------|------------|
| `.card` | 47 صفحة | ~940 سطر |
| `.badge` | 37 صفحة | ~370 سطر |
| `.modal` | 20 صفحة | ~300 سطر |
| `.loading` | 12 صفحة | ~144 سطر |
| `.empty-state` | 11 صفحة | ~110 سطر |
| **الإجمالي** | | **~1,864 سطر مكرر** |

**الهدف:** `_shared.scss` واحد + كل صفحة تستورد فقط ما تحتاجه.

### المرحلة 6: تقسيم `api.service.ts` (867 سطر → 16 ملف)

| الملف الجديد | عدد الطرق |
|------------|----------|
| `vouchers.api.ts` | ~25 طريقة |
| `screens.api.ts` | ~20 طريقة |
| `accounts.api.ts` | ~15 طريقة |
| `operation-types.api.ts` | ~15 طريقة |
| `warehouse.api.ts` | ~15 طريقة |
| `employees.api.ts` | ~12 طريقة |
| `reports.api.ts` | ~10 طريقة |
| `currencies.api.ts` | ~8 طريقة |
| `billing.api.ts` | ~8 طريقة |
| `sidebar.api.ts` | ~8 طريقة |
| `funds.api.ts` | ~7 طريقة |
| `roles.api.ts` | ~6 طريقة |
| `attachments.api.ts` | ~5 طريقة |
| `ui-builder.api.ts` | ~5 طريقة |
| `reconciliations.api.ts` | ~4 طريقة |
| `dashboard.api.ts` | ~3 طريقة |

### المرحلة 7: تبسيط الصفحات (48 صفحة)

#### الفئة A — صفحات بسيطة (20 صفحة) — ~3 أيام
```
stations (163), banks (170), wallets (170), exchanges (170), 
employees (127), suppliers (130), departments (?) ...
```
بعد `BasePage` + `CrudPageComponent`: كل صفحة ~30-50 سطر.

#### الفئة B — صفحات متوسطة (18 صفحة) — ~5 أيام
```
accounts (278), funds (221), custody (183), settlements (158),
journal (268), warehouse (241), salaries (122) ...
```
بعد `BasePage` + مكونات مشتركة: كل صفحة ~80-120 سطر.

#### الفئة C — صفحات معقدة (10 صفحات) — ~2 أسبوع
| الصفحة | الحجم الحالي | الهدف |
|--------|-------------|-------|
| `vouchers.ts` | 1,997 سطر | ~300 سطر |
| `custom-screens.ts` | 1,547 سطر | ~250 سطر |
| `operation-types.ts` | 992 سطر | ~200 سطر |
| `sidebar-settings.ts` | 567 سطر | ~150 سطر |
| `billing-systems.ts` | 446 سطر | ~120 سطر |
| `register-operation.ts` | 314 سطر | ~100 سطر |
| `purchase-invoices.ts` | 325 سطر | ~100 سطر |
| `reports-advanced.ts` | 309 سطر | ~100 سطر |
| `warehouse-operations.ts` | 273 سطر | ~80 سطر |
| `collections.ts` | 332 سطر | ~80 سطر |

---

## 🗄️ Migrations المطلوبة

| الملف | المحتوى | الأولوية |
|-------|---------|---------|
| `0010_add_indexes.sql` | فهارس `add-indexes.sql` الموجودة غير رسمية | P1 |
| `0011_unique_constraints.sql` | UNIQUE على `(account_id, currency_id)` + `(fund_id, currency_id)` | P0 |
| `0012_sequences.sql` | DB sequences للترقيم الآلي | P1 |

---

## 🔐 الثغرات الأمنية المطلوب معالجتها

| الثغرة | الموقع | الخطورة | الأسبوع |
|--------|--------|---------|---------|
| SQL Injection في `executeDataSource` | `ui-builder.service.ts` | 🔴 عالية | 1 |
| مسار التخزين hardcoded `D:\Archive` | `api.rest.ts` | 🔴 عالية | 5 |
| مسارات IDOR (بدون bizId check) | عشرات المسارات | 🔴 عالية | 2-3 |
| `bizAuth` لا يقيّد المستخدم بعمل | `middleware/bizAuth.ts` | 🟠 متوسطة | 3 |
| لا rate limiting على التسجيل | `routes/auth.ts` | 🟡 منخفضة | ✅ مُصلَح |

---

## ✅ ما تم إنجازه (Phase 1 — Commit: 3be8845)

- [x] إنشاء `backend/src/engines/` directory
- [x] بناء `crud.engine.ts` (getAll, getOne, createRecord, updateRecord, deleteRecord, checkDuplicate + hooks)
- [x] بناء `currency.engine.ts` (8 دوال + caching + endpoint جديد /unified-balances)
- [x] نقل `sequencing.engine.ts` من middleware/
- [x] نقل `permissions.engine.ts` من middleware/
- [x] إنشاء `engines/index.ts` (نقطة دخول موحدة)
- [x] **BUG FIX**: إضافة `processStockMovement` في `purchase-invoices/confirm` و `/receive`
- [x] **CONNECT**: ربط exchange-rates routes بـ `currency.engine` (مع cache تلقائي)

---

## ⏳ المطلوب (الخطوات التالية)

### الأسبوع الحالي (Phase 2):
- [ ] نقل `transaction.engine` + ربط أول 10 routes
- [ ] إصلاح `ui-builder.executeDataSource` (SQL Injection)
- [ ] إكمال دوال `sequencing.engine` الفارغة
- [ ] إضافة `getUserMaxAmounts()` لـ `permissions.engine`

### الأسبوع 3:
- [ ] ربط `workflow.engine` بجميع voucher status changes
- [ ] بناء `notification.engine` + ربط بـ transaction

### الأسبوع 4:
- [ ] استخراج `screens.engine` من `api.rest.ts`
- [ ] بناء `hr.engine` + `salaries.routes.ts`

### الأسبوع 5:
- [ ] `billing.engine` + `attachment.engine` + `audit.engine`
- [ ] إكمال `reporting.engine` (getFundStatement)
- [ ] Migrations المفقودة

---

## 📈 مقاييس النجاح

| المقياس | الآن | الهدف |
|---------|------|-------|
| سطور `api.rest.ts` | 2,662 | ~400 |
| DB calls مباشرة | ~370 | ~30 |
| تغطية audit log | ~15% | 100% |
| سطور SCSS | 12,319 | ~2,500 |
| متوسط سطور صفحة TS | 450 | 50-80 |
| محركات كاملة | 4 من 15 | 15 من 15 |
| تغطية اختبارات | 5 ملفات | 15+ ملف |

---

*آخر تحديث: 2026-03-16 — بعد تنفيذ Phase 1 (Commit: 3be8845)*  
*للتفاصيل التقنية: انظر ملفات `docs/ENGINES-REPORT.md` و `docs/ENGINES-ISSUES-REPORT.md`*
