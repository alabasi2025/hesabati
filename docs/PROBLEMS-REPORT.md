# تقرير فحص المشاكل وأسبابها

**تاريخ الفحص:** 2026-03-08

---

## 1. مشاكل الـ Backend (TypeScript / Schema) — تم إصلاحها

### 1.1 استخدام `billingSystem` بدل `billingSystemId`

| الملف | السبب | الإصلاح |
|-------|--------|---------|
| `accounts.routes.ts` | جدول `employee_billing_accounts` لا يحتوي عمود `billing_system`؛ العمود الموجود هو `billing_system_id` (FK إلى `billing_systems_config`). | استبدال كل استخدام لـ `billingSystem` بـ `billingSystemId`، وإضافة `leftJoin` مع `billingSystemsConfig` لاختيار `systemKey` لعرض الاسم. |
| `api.rest.ts` | نفس السبب. | استبدال `billingSystem` بـ `billingSystemId` في الاستعلام. |

**السبب الجذري:** بعد الدمج، السكيما تعتمد على علاقة (FK) مع جدول أنظمة الفوترة وليس على نص حر، والكود كان ما زال يعتمد على عمود قديم أو افتراضي اسمه `billing_system`.

---

### 1.2 إدراج `billing_systems_config` بدون `systemKey`

| الملف | السبب | الإصلاح |
|-------|--------|---------|
| `billing-config.routes.ts` | عمود `system_key` مطلوب (NOT NULL) في الجدول، بينما الـ schema في Zod يجعله `optional()`. عند الإدراج بدون `systemKey` يحدث خطأ نوع. | ضمان وجود `systemKey` عند الإدراج: إما من الجسم أو توليده من `name` (مثل slug). |

**السبب الجذري:** عدم توافق بين متطلبات قاعدة البيانات (حقل إلزامي) واختيارية الحقل في التحقق من المدخلات.

---

### 1.3 استخدام `operationTypes.category` بينما السكيما تعتمد على `categoryId`

| الملف | السبب | الإصلاح |
|-------|--------|---------|
| `journal-entries.routes.ts` | جدول `operation_types` لا يحتوي عمود `category`؛ العلاقة عبر `category_id` (FK إلى `operation_categories`). | جلب مفتاح التصنيف من جدول `operation_categories` باستخدام `categoryId`، واستخدام هذا المفتاح في منطق الترقيم. |
| `operation-types.routes.ts` | فلترة بـ `operationTypes.category` غير موجود. | تحويل فلتر "category" (مفتاح التصنيف) إلى بحث في `operation_categories` ثم فلترة بـ `operationTypes.categoryId`. |

**السبب الجذري:** بعد دمج السكيما، تم استبدال عمود نصي `category` بعلاقة `categoryId` مع جدول التصنيفات، والكود لم يُحدَّث بالكامل.

---

### 1.4 إدراج `operation_categories` بدون العمود الإلزامي `name`

| الملف | السبب | الإصلاح |
|-------|--------|---------|
| `operation-types.routes.ts` | جدول `operation_categories` (من فرع الريموت) يتطلب `name` و`categoryKey`. الدالة كانت تُدرج فقط `businessId` و`categoryKey`. | إضافة `name: key` عند الإدراج (استخدام نفس قيمة `categoryKey` كاسم افتراضي). |

**السبب الجذري:** اختلاف تعريف الجدول بعد الدمج (جدول كامل مع أعمدة إضافية مثل `name`) عن النسخة المحلية الأبسط.

---

## 2. مشاكل الواجهة (Frontend) — تحذيرات فقط (لا أخطاء بناء)

| النوع | الملف | الوصف |
|-------|-------|--------|
| **NG8107** | `accounts/accounts.html` | استخدام `?.` (optional chaining) على تعبيرات TypeScript لا تحتوي `null` أو `undefined` في نوعها؛ يمكن استبدالها بـ `.` العادي. |
| **Sass deprecation** | `account-types/account-types.scss` | استخدام `@import` قديم؛ يُفضّل استخدام `@use` لأن `@import` سيُزال في Dart Sass 3.0. |

لا توجد أخطاء بناء في الواجهة؛ التطبيق يبنى بنجاح.

---

## 3. ملخص الإصلاحات المطبقة

- استبدال كل استخدامات `billingSystem` بـ `billingSystemId` مع ربط `billingSystemsConfig` لعرض المفتاح/الاسم حيث لزم.
- ضمان تمرير `systemKey` (أو توليده من `name`) عند إدراج سجل في `billing_systems_config`.
- استبدال الاعتماد على `operationTypes.category` بجلب المفتاح من `operation_categories` عبر `categoryId` في القيود والترقيم.
- إضافة `name` عند إدراج سجل في `operation_categories` في مسارات أنواع العمليات.

**حالة البناء بعد الإصلاح:**  
- Backend: `pnpm run build` ينجح بدون أخطاء.  
- Frontend: `pnpm run build` ينجح مع تحذيرات فقط.
