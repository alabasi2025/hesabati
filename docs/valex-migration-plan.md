# خطة تحويل حساباتي إلى تصميم Valex Tailwind — الخطة الكاملة

> **المرجع:** https://angular.spruko.com/valex-tailwind/preview/dashboards/hrm
> **الهدف:** تحويل كامل لكل واجهات وصفحات النظام (49 صفحة) لتطابق تصميم Valex Tailwind بالحرف الواحد — نفس التقنيات، نفس الشكل، نفس الجودة.

---

## الوضع الحالي

| البند | الآن | المطلوب |
|-------|------|---------|
| CSS Framework | SCSS يدوي + Tailwind جزئي | **Tailwind CSS 4 كامل** (utility-first) |
| Component Library | لا يوجد | **Angular Material** (مخصص بالكامل) |
| أيقونات | Material Icons Round فقط | **Material Icons + Font Awesome 6 + Remix Icons** |
| خطوط | Tajawal فقط | **Tajawal (عربي) + Roboto (إنجليزي) + Inter** |
| نظام الثيم | CSS variables يدوية مبعثرة | **نظام ثيم Valex متكامل** (light/dark + CSS variables موحدة) |
| Layout | SCSS يدوي | **Tailwind Grid/Flex** مع sidebar/header Valex |
| الجداول | HTML tables يدوية بـ CSS | **Angular Material Table** أو جداول Valex المخصصة |
| النماذج (Forms) | ngModel + signal forms مختلطة | **Angular Material Forms** أو Valex styled forms |
| الرسوم البيانية | ApexCharts (جزئي) | **ApexCharts** (توسيع لكل الصفحات) |
| المودال | 20 صفحة بـ modal overlay | **Inline Forms** (مثل خطة التحديث) |
| Alerts | Toast service يدوي | **SweetAlert2** + Toast |
| RTL | جزئي | **RTL كامل ومتكامل** |
| الصفحات | 49 صفحة بتصميم غير موحد | **49 صفحة بتصميم Valex موحد** |

---

## التقنيات المطلوب إضافتها

### حزم جديدة (npm install)
```bash
# Angular Material
pnpm add @angular/material @angular/cdk

# أيقونات
pnpm add @fortawesome/fontawesome-free

# Alerts
pnpm add sweetalert2

# Scrollbar
pnpm add overlayscrollbars overlayscrollbars-ngx

# Date Picker
pnpm add flatpickr angularx-flatpickr

# Drag & Drop (لو احتجنا)
# @angular/cdk موجود بالفعل
```

### حزم موجودة نبقي عليها
- `tailwindcss` ✅ (نوسّع الاستخدام)
- `apexcharts` + `ng-apexcharts` ✅
- `gsap` ✅
- `jspdf` + `jspdf-autotable` ✅
- `xlsx` ✅

### حزم نحذفها
- `angular-gridster2` (إذا غير مستخدم فعلياً)
- `ngx-color-picker` (نستبدله بحل Tailwind)

---

## المراحل التفصيلية

---

### المرحلة 0: التأسيس — البنية التحتية للثيم (3-4 ساعات)
> **لا يُكسر أي شيء موجود — كل شيء يُبنى بالتوازي**

#### 0.1 إعداد Tailwind CSS 4 بالكامل
- إنشاء `tailwind.config.ts` مع:
  - ألوان Valex الكاملة (`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `dark`, `light`)
  - خطوط: `Tajawal` (sans-arabic), `Roboto` (sans), `Inter` (display)
  - RTL utilities
  - مكونات مخصصة (`@layer components`)
  - أحجام ثابتة للـ sidebar والـ header

#### 0.2 نظام الثيم الجديد — Valex Variables
- إنشاء `src/app/styles/valex-theme.scss`:
  ```
  :root (light) → ألوان Valex فاتحة
  .dark         → ألوان Valex داكنة
  ```
- متغيرات موحدة:
  - `--color-bodybg`, `--color-bodybg2`
  - `--color-primary`, `--color-primaryrgb`
  - `--color-secondary`, `--color-success`, `--color-danger`, `--color-warning`, `--color-info`
  - `--color-defaulttextcolor`, `--color-defaultborder`, `--color-defaultbackground`
  - `--color-menuprimecolor`, `--color-headerprimecolor`
  - `--color-customwhite`, `--color-textmuted`, `--color-inputborder`
  - `--color-formcontrolbg`, `--color-darkbg`

#### 0.3 إعداد Angular Material
- تثبيت وإعداد Angular Material مع custom theme
- ربط المتغيرات بـ Valex palette
- تعطيل الأنماط الافتراضية واستخدام Tailwind بدلها

#### 0.4 إضافة الخطوط والأيقونات
- `index.html`: إضافة Roboto + Inter + Font Awesome 6 CDN
- الإبقاء على Tajawal كخط أساسي عربي
- إضافة Material Symbols (أحدث من Material Icons Round)

#### 0.5 هيكل الملفات الجديد
```
src/app/styles/
├── valex-theme.scss          ← النظام اللوني الكامل (light + dark)
├── valex-components.scss     ← أنماط المكونات (cards, badges, buttons...)
├── valex-layout.scss         ← sidebar, header, content area
├── valex-forms.scss          ← حقول الإدخال، selects، checkboxes
├── valex-tables.scss         ← جداول بتصميم Valex
├── valex-utilities.scss      ← utilities إضافية فوق Tailwind
└── _old/                     ← نقل الملفات القديمة هنا (لا نحذفها حتى الانتهاء)
```

**الملفات المتأثرة:** 6 ملفات جديدة + `styles.scss` + `index.html` + `angular.json` + `package.json`

---

### المرحلة 1: Layout الرئيسي — Sidebar + Header + Content (4-5 ساعات)
> **هذا أهم تغيير — يغير شكل النظام بالكامل فوراً**

#### 1.1 Sidebar — تصميم Valex العمودي
- sidebar ثابت يسار (RTL: يمين) بعرض 260px
- خلفية داكنة (dark sidebar) في الوضعين light/dark
- لوقو في الأعلى
- قائمة مع أيقونات + نص + تصنيفات (Main, General, Pages...)
- قابل للطي (toggle: أيقونات فقط / كامل)
- hover effects + active state بلون primary
- submenu قابل للفتح/الطي (accordion)

**الملفات:**
- `src/app/pages/business-layout/business-layout.ts` ← إعادة كتابة كاملة
- `src/app/pages/business-layout/business-layout.html` ← جديد
- `src/app/pages/business-layout/business-layout.scss` ← جديد (أو Tailwind فقط)
- `src/app/pages/sidebar-settings/` ← تحديث ليتوافق

#### 1.2 Header — Valex Top Bar
- شريط أعلى ثابت (sticky)
- يسار: زر toggle sidebar + شريط بحث
- يمين: أيقونات (إشعارات، ثيم، لغة) + صورة المستخدم + dropdown
- خلفية بيضاء (light) أو داكنة (dark) مع blur
- border-bottom خفيف

#### 1.3 Content Area
- padding موحد
- breadcrumb في الأعلى (مسار الصفحة)
- عرض متجاوب مع sidebar

#### 1.4 Footer
- شريط سفلي بسيط: "حساباتي © 2026"
- لا يحتاج تعقيد

**الملفات المتأثرة:** 4-6 ملفات

---

### المرحلة 2: المكونات المشتركة — Valex Component Library (5-6 ساعات)
> **بناء مكتبة مكونات موحدة يستخدمها كل الصفحات**

#### 2.1 بطاقات الإحصائيات (Stat Cards)
- نفس تصميم Valex HRM: أيقونة ملونة + رقم كبير + عنوان + نسبة تغيير
- 4-6 في صف واحد (grid responsive)
- ألوان متنوعة (primary, success, warning, danger, info, secondary)

#### 2.2 البطاقات (Cards)
- `card` class: خلفية بيضاء/داكنة، border خفيف، radius مدور، shadow ناعم
- `card-header`: عنوان + أزرار إجراءات
- `card-body`: المحتوى
- `card-footer`: أزرار أو pagination

#### 2.3 الجداول (Tables)
- تصميم Valex: header بخلفية فاتحة، صفوف متناوبة، hover effect
- أعمدة: checkbox, #, بيانات, حالة (badge), إجراءات (أزرار أيقونات)
- pagination في الأسفل
- responsive (scroll أفقي في الشاشات الصغيرة)

#### 2.4 الأزرار (Buttons)
- أزرار Valex: primary, secondary, success, danger, warning, info, outline variants
- أحجام: sm, md, lg
- مع أيقونات (Font Awesome أو Material)
- hover + focus + disabled states

#### 2.5 Badges / Status
- badges ملونة للحالات: new, active, pending, rejected, approved...
- أحجام مختلفة

#### 2.6 النماذج (Forms)
- input fields بتصميم Valex: border خفيف، focus بلون primary
- select dropdowns
- checkboxes / radio buttons
- textarea
- form groups مع labels
- validation messages بتصميم موحد

#### 2.7 Inline Form Container
- `page-form-container`: يظهر مكان القائمة
- `form-header`: أيقونة + عنوان + badge (إضافة/تعديل) + زر إغلاق
- `form-body`: grid متجاوب (2-3 أعمدة)
- `form-footer`: إلغاء + حفظ

#### 2.8 مكونات إضافية
- `app-breadcrumb` — مسار الصفحة
- `app-page-header` — عنوان + وصف + أزرار
- `app-filter-bar` — شريط فلاتر (tabs + بحث + فلاتر)
- `app-empty-state` — تحديث التصميم
- `app-loading-state` — spinner بتصميم Valex
- `app-confirm-dialog` — SweetAlert2 wrapper
- `app-toast` — toast notifications محسّنة
- `app-avatar` — صور المستخدمين مع fallback
- `app-progress-bar` — شريط تقدم

**الملفات الجديدة:** ~15 مكون جديد/محدث
```
src/app/shared/components/
├── valex-card/
├── valex-table/
├── valex-stat-card/
├── valex-badge/
├── valex-button/
├── valex-form-group/
├── valex-inline-form/
├── valex-page-header/
├── valex-breadcrumb/
├── valex-filter-bar/
├── valex-avatar/
├── valex-progress/
├── confirm-dialog/          (تحديث → SweetAlert2)
├── empty-state/             (تحديث → Valex style)
└── loading-state/           (تحديث → Valex style)
```

---

### المرحلة 3: صفحة تسجيل الدخول + التسجيل (2-3 ساعات)

#### 3.1 Login Page — Valex Sign In
- تخطيط: صورة/illustration يسار + نموذج دخول يمين (أو العكس في RTL)
- أو: full-page مع card وسط الشاشة (حسب Valex)
- خلفية: gradient أو صورة مع overlay
- حقول: اسم المستخدم + كلمة المرور
- زر تسجيل الدخول primary كبير
- روابط: نسيت كلمة المرور + إنشاء حساب
- شعار حساباتي في الأعلى

#### 3.2 Register Page — Valex Sign Up
- نفس التخطيط
- حقول إضافية: الاسم الكامل + البريد + تأكيد كلمة المرور
- موافقة على الشروط

**الملفات:** 6 ملفات (ts + html + scss × 2)

---

### المرحلة 4: لوحة التحكم (Dashboard) — Valex HRM Style (4-5 ساعات)

#### 4.1 صف البطاقات العلوي
- 4-6 stat cards: إجمالي الموظفين، المحطات، الحسابات، الصناديق، الموردين، المخازن
- كل بطاقة: أيقونة ملونة + رقم + عنوان + نسبة تغيير

#### 4.2 الرسوم البيانية
- **رسم بياني رئيسي** (Performance): ApexCharts area/bar chart
- **رسم دائري** (Jobs Summary): donut chart مع legend
- كلاهما داخل cards بعنوان + أزرار إجراءات

#### 4.3 جدول الحضور/النشاط
- جدول Valex: صور + أسماء + أدوار + حالات (badges) + إجراءات
- محاكاة بـ: آخر العمليات أو السندات أو القيود اليومية

#### 4.4 قائمة Pipeline/إحصائيات
- قائمة عمودية بأرقام ونسب (مثل Recruitment Pipeline في Valex)
- محاكاة بـ: حالات السندات أو الموظفين

#### 4.5 الإجراءات السريعة
- أزرار shortcuts للوصول السريع لأهم الصفحات

**الملفات:** 3 ملفات (dashboard.ts + .html + .scss)

---

### المرحلة 5: الصفحات البسيطة — CRUD Tables (6-8 ساعات)
> **14 صفحة بسيطة: جدول + إضافة/تعديل inline**

تحويل كل صفحة إلى نمط Valex:
- **Page Header**: breadcrumb + عنوان + زر إضافة
- **Filter Bar**: بحث + فلاتر
- **جدول Valex**: مع checkbox + pagination + badges + action buttons
- **Inline Form**: بدل modal

| # | الصفحة | تعقيد | ملاحظات |
|---|--------|-------|---------|
| 1 | departments | بسيط | جدول + form بسيط |
| 2 | job-titles | بسيط | نفس النمط |
| 3 | operation-categories | بسيط | نفس النمط |
| 4 | journal-categories | بسيط | نفس النمط |
| 5 | supplier-types | بسيط | نفس النمط |
| 6 | expense-categories | بسيط | نفس النمط |
| 7 | account-sub-natures | بسيط | نفس النمط |
| 8 | fiscal-periods | بسيط | نفس النمط |
| 9 | roles | بسيط | مع permissions matrix |
| 10 | stations | بسيط | نفس النمط |
| 11 | inventory-item-types | بسيط | نفس النمط |
| 12 | intermediary-accounts | بسيط | نفس النمط |
| 13 | exchange-rates | بسيط | جدول عملات |
| 14 | analytical-accounts | بسيط | نفس النمط |

**لكل صفحة:** 3 ملفات (ts + html + scss) = **42 ملف**

---

### المرحلة 6: الصفحات المتوسطة — CRUD مع تفاصيل (8-10 ساعات)
> **12 صفحة متوسطة التعقيد**

| # | الصفحة | تعقيد | ملاحظات |
|---|--------|-------|---------|
| 1 | suppliers | متوسط | جدول + form مع تصنيفات |
| 2 | employees | متوسط | بيانات شخصية + مالية |
| 3 | partners | متوسط | شركاء مع حصص |
| 4 | pending-accounts | متوسط | حسابات معلقة |
| 5 | settlements | متوسط | تسويات |
| 6 | reconciliations | متوسط | مطابقات |
| 7 | salaries | متوسط | رواتب مع عملات |
| 8 | custody | متوسط | عهد مع أرصدة |
| 9 | expense-budget | متوسط | ميزانيات |
| 10 | collections | متوسط | تحصيلات |
| 11 | attachments-archive | متوسط | ملفات مرفقة |
| 12 | register-operation | متوسط | تسجيل عمليات |

**لكل صفحة:** 3 ملفات = **36 ملف**

---

### المرحلة 7: الصفحات المعقدة — منطق متقدم (10-12 ساعة)
> **11 صفحة معقدة**

| # | الصفحة | تعقيد | ملاحظات |
|---|--------|-------|---------|
| 1 | accounts | عالي | شجرة حسابات + تصفية + inline form |
| 2 | funds | عالي | صناديق مع أرصدة وعملات |
| 3 | banks | عالي | بنوك مع حسابات |
| 4 | wallets | عالي | محافظ إلكترونية |
| 5 | exchanges | عالي | صرافين مع أسعار |
| 6 | vouchers | عالي | سندات قبض/صرف معقدة |
| 7 | journal | عالي | قيود يومية متعددة السطور |
| 8 | warehouse | عالي | مخازن مع عمليات |
| 9 | warehouse-operations | عالي | عمليات مخزنية |
| 10 | purchase-invoices | عالي | فواتير مشتريات مع سطور |
| 11 | operation-types | عالي جداً | أنواع عمليات مع ربط حسابات |

**لكل صفحة:** 3 ملفات = **33 ملف**

---

### المرحلة 8: الصفحات الخاصة (6-8 ساعات)

| # | الصفحة | ملاحظات |
|---|--------|---------|
| 1 | business-select | اختيار العمل — cards بتصميم Valex |
| 2 | reports | تقارير — filters + جداول + تصدير |
| 3 | reports-advanced | تقارير متقدمة — ApexCharts موسعة |
| 4 | summary | ملخص مالي — stat cards + charts |
| 5 | custom-screens | شاشات مخصصة — UI builder |
| 6 | ui-builder | باني واجهات — drag & drop |
| 7 | billing-systems | أنظمة فوترة — إعدادات معقدة |
| 8 | sidebar-settings | إعدادات القائمة الجانبية |

**لكل صفحة:** 3 ملفات = **24 ملف**

---

### المرحلة 9: التنظيف والتوحيد النهائي (3-4 ساعات)

#### 9.1 حذف الملفات القديمة
- حذف `src/app/styles/_old/` بعد التأكد
- حذف أي SCSS قديم غير مستخدم
- حذف `css-background` component (نستبدله بـ Tailwind)

#### 9.2 توحيد الكود
- كل `form: any` → `signal<TypedForm>()`
- كل `get computed()` → `computed()`
- كل `CommonModule` → حذف (Angular 21 standalone)
- كل `FormsModule` → `FormsModule` أو `ReactiveFormsModule` حسب الحاجة
- توحيد imports عبر `PAGE_IMPORTS` مشترك

#### 9.3 إزالة CSS المكرر
- كل SCSS مكرر → Tailwind utilities أو مكونات مشتركة
- الهدف: **0 سطر CSS مكرر** بين الصفحات

#### 9.4 Performance
- Lazy loading لكل الصفحات (موجود بالفعل)
- Tree shaking للمكتبات غير المستخدمة
- Font Awesome → استيراد الأيقونات المستخدمة فقط (tree-shakable)

#### 9.5 Responsive
- اختبار كل الصفحات على: desktop (1920px) + tablet (768px) + mobile (375px)
- إصلاح أي كسر في التخطيط

---

### المرحلة 10: الاختبار والتأكيد (2-3 ساعات)

#### 10.1 اختبارات بصرية
- مقارنة screenshot لكل صفحة مع Valex المرجع
- التأكد من RTL الكامل
- التأكد من Light/Dark mode

#### 10.2 اختبارات وظيفية
- تشغيل اختبارات Vitest الموجودة
- التأكد من عمل كل الـ APIs
- التأكد من تسجيل الدخول/الخروج
- التأكد من CRUD في كل صفحة

#### 10.3 اختبارات أداء
- Lighthouse score > 90
- حجم البناء النهائي
- First Contentful Paint < 1.5s

---

## الجدول الزمني

| المرحلة | المدة | الملفات | الأولوية |
|---------|-------|---------|----------|
| 0: التأسيس (ثيم + تقنيات) | 3-4 ساعات | ~15 | 🔴 حرج |
| 1: Layout (Sidebar + Header) | 4-5 ساعات | ~6 | 🔴 حرج |
| 2: مكتبة المكونات | 5-6 ساعات | ~15 مكون | 🔴 حرج |
| 3: Login + Register | 2-3 ساعات | 6 | 🟡 عالي |
| 4: Dashboard | 4-5 ساعات | 3 | 🟡 عالي |
| 5: صفحات بسيطة (14) | 6-8 ساعات | 42 | 🟡 عالي |
| 6: صفحات متوسطة (12) | 8-10 ساعات | 36 | 🟠 متوسط |
| 7: صفحات معقدة (11) | 10-12 ساعة | 33 | 🟠 متوسط |
| 8: صفحات خاصة (8) | 6-8 ساعات | 24 | 🟠 متوسط |
| 9: تنظيف وتوحيد | 3-4 ساعات | كل الملفات | 🟢 إنهاء |
| 10: اختبار | 2-3 ساعات | — | 🟢 إنهاء |
| **الإجمالي** | **~55-70 ساعة** | **~180 ملف** | |

---

## ملخص الأرقام

| المقياس | قبل | بعد |
|---------|-----|-----|
| **تقنية CSS** | SCSS يدوي (~8000 سطر) | Tailwind CSS 4 utility-first |
| **مكتبة مكونات** | لا يوجد | Angular Material + 15 مكون Valex |
| **أيقونات** | Material Icons فقط | Material + Font Awesome 6 |
| **خطوط** | Tajawal فقط | Tajawal + Roboto + Inter |
| **نظام الثيم** | CSS variables مبعثرة | Valex theme system متكامل |
| **Modal overlays** | 20 صفحة | 0 (Inline Forms) |
| **CSS مكرر** | ~2000 سطر | 0 |
| **form: any** | 25+ صفحة | 0 (typed signals) |
| **CommonModule** | بعض الصفحات | 0 (standalone) |
| **تصميم موحد** | لا | ✅ Valex Tailwind كامل |
| **Responsive** | جزئي | كامل (desktop + tablet + mobile) |
| **Light/Dark** | يعمل جزئياً | متكامل 100% |

---

## قواعد التنفيذ

1. **لا نكسر شيء يعمل** — كل مرحلة تُبنى بالتوازي وتُدمج بعد الاختبار
2. **commit بعد كل مرحلة** — سهولة الرجوع
3. **المكونات المشتركة أولاً** — قبل تحويل الصفحات
4. **الصفحات البسيطة أولاً** — لبناء النمط ثم تطبيقه على المعقدة
5. **كل صفحة تُقارن مع Valex** — نفس الشكل بالحرف الواحد
6. **RTL كامل** — كل شيء يُبنى RTL-first
7. **Tailwind أولاً** — SCSS فقط عند الضرورة القصوى
8. **TypeScript strict** — لا `any`
9. **Signal forms** — لا ngModel المباشر (Angular 21 best practice)
10. **الأداء** — لا مكتبات ثقيلة غير ضرورية

---

## ترتيب التنفيذ (للـ Claude Code)

```
المرحلة 0 → المرحلة 1 → المرحلة 2 → المرحلة 3 → المرحلة 4
    ↓
المرحلة 5 (14 صفحة بسيطة — يمكن تشغيل batch)
    ↓
المرحلة 6 (12 صفحة متوسطة)
    ↓
المرحلة 7 (11 صفحة معقدة)
    ↓
المرحلة 8 (8 صفحات خاصة)
    ↓
المرحلة 9 + 10 (تنظيف + اختبار)
```

كل مرحلة يمكن تقسيمها إلى مهام فرعية تُنفذ بالتوالي عبر Claude Code.
