# تقرير مراجعة البروتوكول TDAD
**التاريخ:** 2026-03-05  
**الحالة:** ❌ البروتوكول غير محدث بالكامل

---

## ملخص النتائج

| المشكلة | العدد | الخطورة |
|---------|-------|---------|
| مسارات API مفقودة من البروتوكول | 3+ | 🔴 عالية |
| عقد عامة تحتاج تقسيم | 5+ | 🟡 متوسطة |
| أوصاف ناقصة (لا تطابق قواعد TDAD) | 10+ | 🟡 متوسطة |
| سلوكيات frontend غير موثقة | 15+ | 🟠 متوسطة-عالية |

---

## 1. مسارات API مفقودة من البروتوكول

### ❌ backend/employees/employees.workflow.json
**الموجود في البروتوكول:**
- ✅ GET /api/businesses/:bizId/salaries

**المفقود من الكود (موجود في api.ts):**
- ❌ POST /api/businesses/:bizId/salaries
- ❌ PUT /salaries/:id
- ❌ DELETE /salaries/:id

**الإصلاح المطلوب:** إضافة 3 عقد:
```json
{
  "id": "post-salary-record",
  "title": "Post Salary Record",
  "description": "POST /api/businesses/:bizId/salaries with {employeeId, month, year, baseSalary, advance, deductions}. Calculates netSalary = baseSalary - advance - deductions. Returns 201 with created record. Returns 400 if validation fails.",
  "testLayers": ["api"]
}
```

---

### ✅ backend/vouchers/vouchers.workflow.json
**تحديث:**
- ✅ تم اعتماد مسار الحالة `POST /api/businesses/:bizId/vouchers/:id/status` بدل أي مسار عكس.
- ✅ لا يوجد endpoint `/reverse` في المسارات التشغيلية الحالية.

---

### ❌ backend/accounts/accounts.workflow.json
**الموجود في البروتوكول:**
- ✅ GET /api/businesses/:bizId/accounts
- ✅ POST /api/businesses/:bizId/accounts

**المفقود:**
- ❌ PUT /api/businesses/:bizId/accounts/:id
- ❌ DELETE /api/businesses/:bizId/accounts/:id
- ❌ GET /accounts/:id/allowed-links
- ❌ POST /account-links
- ❌ DELETE /account-links/:id

---

## 2. عقد عامة تخالف قواعد TDAD (Granularity Test)

### ❌ frontend/dashboard/dashboard.workflow.json

**العقدة الحالية:**
```json
{
  "id": "fetch-and-display-dashboard-stats",
  "description": "...fetch GET /api/dashboard/stats...display stats cards...and any charts..."
}
```

**المشكلة:** 
- يحتوي على "and" → يجب تقسيمها
- السلوك الفعلي في الكود (dashboard.ts) يتضمن:
  1. تحميل stations
  2. تحميل employees
  3. تحميل accounts
  4. تحميل funds
  5. تحميل suppliers
  6. تحميل warehouses
  7. معالجة البيانات وحساب الإحصائيات
  8. عرض بطاقات Stats
  9. عرض الرسوم البيانية (chartData, waterfallData, treemapData)
  10. وضع العرض التقديمي

**الإصلاح المطلوب:** تقسيمها إلى 5-8 عقد منفصلة:
- `fetch-stations-for-dashboard`
- `fetch-employees-for-dashboard`
- `fetch-accounts-for-dashboard`
- `calculate-financial-summary`
- `render-stats-cards`
- `render-financial-charts`

---

### ❌ frontend/vouchers/vouchers.workflow.json

**العقدة الحالية:**
```json
{
  "id": "open-create-voucher-form",
  "description": "...open modal or navigate to form...Form submits POST..."
}
```

**المشكلة:** يجمع بين عرض الفورم وإرسال البيانات → يجب تقسيمها إلى:
- `render-voucher-form`
- `submit-voucher-to-api`
- `close-form-and-refresh-list`

---

## 3. أوصاف ناقصة (لا تطابق قالب TDAD)

### ❌ frontend/login/login.workflow.json

**الوصف الحالي:**
```
"pages/login/login.ts: Calls auth.login(username, password) from AuthService..."
```

**المشكلة:**
- يذكر اسم الملف (غير ضروري)
- لا يصف المحفز (Trigger) بوضوح
- لا يصف حالة التحميل (Loading state)

**الوصف المطلوب حسب TDAD:**
```
"When user clicks 'تسجيل الدخول' button on login form, validate username and password are not empty. Calls POST /api/auth/login with {username, password}. UI shows spinner on button. Success: saves JWT token to localStorage, navigates to /businesses. Failure: shows error message 'اسم المستخدم أو كلمة المرور غير صحيحة' below form, re-enables button."
```

---

### ❌ frontend/vouchers/vouchers.workflow.json - display-vouchers-list

**الوصف الحالي:**
```
"...fetch GET /api/businesses/:bizId/vouchers and display table..."
```

**المشكلة:** لا يصف:
- أعمدة الجدول بالتفصيل
- فلترة حسب النوع (receipt/payment/transfer)
- حالة التحميل (loading state)

**الوصف المطلوب:**
```
"When user navigates to /biz/:bizId/vouchers, show loading skeleton. Fetch GET /api/businesses/:bizId/vouchers. Success: display table with columns [رقم السند, النوع (قبض/صرف), المبلغ, الحالة, التاريخ, إجراءات]. User can filter by type using tabs. Empty: show 'لا توجد سندات - ابدأ بإنشاء سند جديد' message with create button. Failure: show error toast 'فشل تحميل السندات'."
```

---

## 4. عقد مفقودة للسلوكيات الموجودة في الكود

### ❌ frontend/login/login.ts
**السلوكيات في الكود بدون عقد:**
- `togglePassword()` - إظهار/إخفاء كلمة المرور
- Form validation قبل الإرسال

**العقد المطلوبة:**
```json
{
  "id": "validate-login-form-fields",
  "description": "When user clicks submit, validate username and password are not empty. Success: proceed to login API call. Failure: show error 'يرجى إدخال اسم المستخدم وكلمة المرور'."
}
```

---

### ❌ frontend/dashboard/dashboard.ts
**السلوكيات المفقودة:**
- `handleChartClick()` - التنقل عند النقر على الرسم البياني
- `togglePresentationMode()` - وضع العرض التقديمي
- حساب `totalReceipts`, `totalPayments`, `netBalance`

---

## 5. مشاكل في workflowId

### ✅ صحيح حالياً
جميع الـ `workflowId` صحيحة:
- `backend/auth` للملفات في `.tdad/workflows/backend/auth/`
- `frontend/login` للملفات في `.tdad/workflows/frontend/login/`

---

## 6. مشاكل في testLayers

### ⚠️ تحتاج مراجعة
بعض العقد لا تحدد `testLayers` بوضوح:
- عقد الـ UI التي تستدعي API يجب أن تكون `["ui", "api"]`
- عقد الـ Backend يجب أن تكون `["api"]`

**مثال صحيح:**
```json
{
  "id": "submit-login",
  "testLayers": ["ui", "api"]  // ✅ صحيح - UI action + API call
}
```

---

## 7. dependencies غير دقيقة

### ❌ backend/auth/auth.workflow.json

**الوضع الحالي:**
```json
{
  "id": "create-user-record",
  "dependencies": ["hash-password-on-register", "check-username-uniqueness"]
}
```

**المشكلة:** العقد في نفس الملف لكن الحواف لا تعكس التسلسل الفعلي - `create-user-record` يحتاج كلا السلوكين **قبله**.

**الإصلاح:** الـ dependencies صحيحة، والـ edges موجودة.

---

## 8. edges مفقودة

### ⚠️ frontend/login/login.workflow.json

**الحالي:**
```json
"edges": [
  { "id": "render-login-form-to-submit-login", ... }
]
```

**المفقود:** إذا أضفنا `validate-login-form-fields` يجب إضافة حافة من `render-login-form` إلى `validate-login-form-fields`.

---

## خطة الإصلاح الموصى بها

### المرحلة 1: إصلاح المسارات المفقودة (أولوية عالية)
1. إضافة عقد POST/PUT/DELETE للـ salaries في `backend/employees/`
2. إضافة عقد PUT/DELETE للـ accounts في `backend/accounts/`
3. توثيق مسار الحالة `POST /vouchers/:id/status` للإلغاء باتجاه واحد في `backend/vouchers/`

### المرحلة 2: تقسيم العقد العامة (أولوية متوسطة)
1. تقسيم `fetch-and-display-dashboard-stats` إلى 6-8 عقد
2. تقسيم `open-create-voucher-form` إلى 3 عقد
3. إضافة عقد validation منفصلة للـ forms

### المرحلة 3: تحديث الأوصاف (أولوية متوسطة)
1. إعادة كتابة أوصاف frontend حسب قالب TDAD
2. إضافة تفاصيل Loading/Success/Failure states
3. إضافة تفاصيل Error codes وresponse format

### المرحلة 4: توثيق السلوكيات المفقودة (أولوية منخفضة)
1. إضافة عقد `togglePassword`، `handleChartClick`
2. إضافة عقد الحسابات المالية في Dashboard

---

## تقدير الحجم

- **عقد مفقودة:** ~25-30 عقدة
- **عقد تحتاج إعادة كتابة:** ~15 عقدة
- **ملفات workflow تحتاج تحديث:** ~12 ملف

**الوقت المقدر:** 3-4 ساعات عمل لإصلاح كامل البروتوكول.

---

## الخلاصة

البروتوكول **قديم وغير محدث** بالنسبة للكود الفعلي:
- ❌ مسارات API مفقودة
- ❌ عقد عامة تخالف قواعد TDAD
- ❌ أوصاف غير كاملة
- ❌ سلوكيات موجودة في الكود بدون توثيق

**التوصية:** تنفيذ خطة الإصلاح بالترتيب المذكور أعلاه.
