# خطة تحديث نظام حساباتي — التوحيد الشامل

خطة شاملة لتوحيد التقنيات، حذف Three.js بالكامل، إنشاء مكتبة مشتركات، تحويل Modal إلى Inline Form، وتحسين الأداء والصيانة.

---

## الوضع الحالي — ملخص الفحص

| البند | الحالة |
|-------|--------|
| 48 صفحة frontend | Signals + ngModel ✅ |
| SCSS | `shared-page.scss` قاعدة جيدة، لكن ~500 سطر CSS مكرر |
| Three.js (~600KB) | مستخدمة في 4 صفحات فقط (login, register, dashboard) |
| ApexCharts | **مثبتة ومستخدمة فعلاً** في reports-advanced ✅ |
| Chart.js + ng2-charts | مثبتة لكن **غير مستخدمة** — يجب حذفها |
| Forms | `form: any` في 25+ صفحة — لا type safety |
| Modal | 25+ صفحة تستخدم modal-overlay — المطلوب: Inline Form |

---

## المرحلة 1: حذف Three.js بالكامل

### 1.1 استبدال Three.js Background بـ CSS Animations
**الملفات المتأثرة:** login.html, login.ts, register.html, register.ts, dashboard.html, dashboard.ts

- إنشاء `css-background.component.ts` — تأثيرات CSS pure (particles, gradients, floating shapes)
- نفس التأثير البصري لكن بدون WebGL canvas
- **التوفير:** ~600KB أقل + لا WebGL contexts

### 1.2 استبدال Three.js Charts بـ ApexCharts (المثبتة فعلاً)
**الملفات المتأثرة:** dashboard.html, dashboard.ts

- ApexCharts تدعم: bar, donut, line, area, treemap, radialBar (gauge)
- نفس أنواع الرسوم البيانية المستخدمة حالياً
- **ميزة:** ApexCharts مستخدمة فعلاً في reports-advanced — توحيد

### 1.3 الإبقاء على Stat Cards كما هي
`three-stat-card` يستخدم CSS فقط (لا WebGL) — لا يحتاج تغيير، فقط إعادة تسمية

### 1.4 حذف الملفات والمكتبات
- حذف: `three-chart/`, `three-background/`, `three-network/`, `three.service.ts`
- حذف من package.json: `three`, `@types/three`, `chart.js`, `ng2-charts`
- الإبقاء على: `apexcharts`, `ng-apexcharts`, `gsap`

---

## المرحلة 2: إنشاء مكتبة المشتركات الشاملة

### 2.1 هيكل المكتبة الجديد
```
shared/
├── components/
│   ├── loading-state/          (موجود ✅)
│   ├── empty-state/            (موجود ✅)
│   ├── status-badge/           (موجود ✅)
│   ├── smart-filter-input/     (موجود ✅)
│   ├── amount-display/         (موجود ✅)
│   ├── css-background/         (جديد — بديل Three.js)
│   ├── stat-card/              (نقل من three-stat-card)
│   ├── summary-row/            (جديد — بدل تكرار CSS)
│   ├── filter-tabs/            (جديد — بدل تكرار CSS)
│   ├── search-box/             (جديد — بدل تكرار CSS)
│   ├── currency-chips/         (جديد — بدل تكرار CSS)
│   ├── inline-form/            (جديد — container الموحد للنماذج)
│   └── confirm-dialog/         (نقل من components/)
├── base-page.component.ts      (موجود ✅)
├── base-crud-page.component.ts (جديد — يرث من base-page)
├── page-imports.ts             (جديد — مصفوفة imports مشتركة)
├── helpers.ts                  (موجود ✅)
├── constants/                  (موجود ✅)
├── types/
│   ├── api.types.ts            (موجود ✅)
│   └── form.types.ts           (جديد — interfaces للنماذج)
└── index.ts                    (barrel export)
```

### 2.2 `page-imports.ts` — تقليل الاستيرادات المكررة
```typescript
export const PAGE_IMPORTS = [
  FormsModule,
  DecimalPipe,
  LoadingStateComponent,
  EmptyStateComponent,
  StatusBadgeComponent,
  SummaryRowComponent,
  FilterTabsComponent,
  SearchBoxComponent,
];
```

### 2.3 مكوّنات مشتركة جديدة (بدل CSS المكرر)

| المكوّن | يستبدل | مكرر في |
|---------|--------|---------|
| `<app-summary-row>` | `.summary-row` + `.summary-card` CSS | 10+ صفحة |
| `<app-filter-tabs>` | `.filter-tabs` + `.filter-tab` CSS | 12+ صفحة |
| `<app-search-box>` | `.toolbar` + `.search-box` CSS | 8+ صفحة |
| `<app-currency-chips>` | `.currency-chips` CSS | 8+ صفحة |

---

## المرحلة 3: نقل CSS المكرر إلى `shared-page.scss`

الكلاسات التالية مكررة في 10+ ملف SCSS ويجب نقلها:
- `.summary-row`, `.summary-card` (+ ألوان: `.amber`, `.blue`, `.green`, `.red`)
- `.filter-tabs`, `.filter-tab`
- `.toolbar`, `.search-box`
- `.currency-chips`, `.currency-chip`
- `.code-badge`

---

## المرحلة 4: إزالة `CommonModule` + توحيد الاستيرادات

- حذف `CommonModule` من كل الصفحات (28+ صفحة)
- استيراد `DecimalPipe` مباشرة حيث يُستخدم `| number`
- استبدال 9 أسطر import بـ `...PAGE_IMPORTS` واحد

---

## المرحلة 5: تحويل Modal → Inline Form (احترافي)

### القاعدة الذهبية:
> **لا شاشات منبثقة (Modal) إلا في الأماكن الضرورية فقط:**
> - ✅ Modal مسموح: تأكيد الحذف، تحذيرات حرجة
> - ❌ Modal ممنوع: إضافة/تعديل عناصر — يجب أن يكون Inline

### معايير التصميم:
- **الدقة:** كل عنصر في مكانه الصحيح، لا فوضى
- **الاحترافية:** تصميم نظيف بلا تعقيد، يشبه أنظمة SAP/Odoo الحديثة
- **الوضوح:** عناوين واضحة، أيقونات دالّة، ألوان موحدة
- **اللمسات:** transitions سلسة، hover effects خفيفة، focus states واضحة
- **الخفة:** لا animations ثقيلة، لا shadows مبالغة، أداء سريع

### النمط المستهدف (مثل السندات لكن أنظف):
```html
<!-- القائمة تظهر فقط عند عدم وجود نموذج -->
@if (!loading() && !showForm()) {
  <!-- filters + table/grid -->
}

<!-- النموذج يحل مكان القائمة — inline، لا modal -->
@if (showForm()) {
  <div class="page-form-container">
    <div class="form-header">
      <!-- أيقونة + عنوان + badge تعديل/إضافة + زر إغلاق -->
    </div>
    <div class="form-meta">
      <!-- حقول في grid متجاوب: 2 أو 3 أعمدة -->
    </div>
    <div class="form-footer">
      <!-- إلغاء + حفظ كمسودة (اختياري) + حفظ -->
    </div>
  </div>
}
```

### الصفحات المتأثرة (25 صفحة):
- **بسيطة (10):** departments, job-titles, operation-categories, journal-categories, supplier-types, expense-categories, account-sub-natures, billing-systems, roles, fiscal-periods
- **متوسطة (8):** suppliers, employees, partners, pending-accounts, settlements, reconciliations, salaries, custody
- **معقدة (5):** funds, banks, exchanges, wallets, warehouse
- **خاصة (2):** accounts (شجرة), purchase-invoices (سطور)

### CSS مشترك للـ Inline Form (يُضاف لـ `shared-page.scss`):
- `.page-form-container` — حاوية بخلفية ناعمة، border-radius، padding مريح
- `.form-header` — flex، عنوان بأيقونة، زر إغلاق بـ hover rotation
- `.form-meta` — grid متجاوب (2-3 أعمدة)، gap موحد
- `.form-footer` — flex-end، أزرار بـ gradients خفيفة
- `scroll-to-top` عند فتح النموذج
- `transition: all 0.2s ease` — خفيفة وسريعة، لا animations ثقيلة

---

## المرحلة 6: توحيد الأنماط البرمجية

### 6.1 `form: any` → `signal<FormType>()`
```typescript
// قبل:
form: any = { name: '', phone: '' };

// بعد:
interface SupplierForm { name: string; phone: string; ... }
form = signal<SupplierForm>({ name: '', phone: '' });
```

### 6.2 `get filteredX()` → `computed()`
```typescript
// قبل:
get filteredData() { return this.fundsData().filter(...); }

// بعد:
filteredData = computed(() => this.fundsData().filter(...));
```

### 6.3 توحيد نمط البحث → `[value]` + `(input)`
```html
<!-- بدل ngModel للبحث -->
<input [value]="searchQuery()" (input)="searchQuery.set($any($event.target).value)">
```

---

## ترتيب التنفيذ

| الخطوة | المهمة | الملفات | المخاطرة |
|--------|--------|---------|----------|
| 1 | إنشاء `css-background` (بديل Three.js) | 1 ملف جديد | منخفضة |
| 2 | استبدال Three.js في login/register/dashboard | 6 ملفات | متوسطة |
| 3 | استبدال Three.js Charts بـ ApexCharts في dashboard | 2 ملف | متوسطة |
| 4 | حذف Three.js + chart.js + ng2-charts | package.json + 5 ملفات | منخفضة |
| 5 | نقل CSS المكرر إلى shared-page.scss | 1 ملف + حذف من 12 ملف | منخفضة |
| 6 | إنشاء مكوّنات مشتركة (summary-row, filter-tabs, etc.) | 4 ملفات جديدة | منخفضة |
| 7 | إنشاء PAGE_IMPORTS + إزالة CommonModule | 1 ملف جديد + 28 ملف تعديل | منخفضة |
| 8 | إضافة CSS الـ Inline Form لـ shared-page.scss | 1 ملف | منخفضة |
| 9 | تحويل الصفحات البسيطة من Modal → Inline | 10 صفحات HTML | متوسطة |
| 10 | تحويل الصفحات المتوسطة | 8 صفحات HTML + TS | متوسطة |
| 11 | تحويل الصفحات المعقدة | 5 صفحات HTML + TS | عالية |
| 12 | توحيد form: any → signal + computed | 25 ملف TS | منخفضة |

---

## النتيجة المتوقعة

| المقياس | قبل | بعد |
|---------|-----|-----|
| حجم المكتبات | Three.js ~600KB + Chart.js ~200KB | ApexCharts ~120KB فقط |
| WebGL contexts | 6+ في Dashboard | 0 |
| CSS مكرر | ~500 سطر | 0 |
| CommonModule | 28 صفحة | 0 |
| أسطر Import مكررة | ~250 سطر | ~28 سطر |
| Modal overlays | 25 صفحة | 0 (Inline Form) |
| `form: any` | 25 صفحة | 0 (typed signals) |

**الحجم الإجمالي أقل بـ ~680KB، الكود أنظف بـ ~40%، الصيانة أسهل بكثير.**
