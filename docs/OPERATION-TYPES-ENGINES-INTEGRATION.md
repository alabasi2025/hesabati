# تكامل أنواع العمليات (Operation Types) مع المحركات

تاريخ التقرير: 2026-03-07

---

## 1. دور أنواع العمليات في النظام

**أنواع العمليات** (جدول `operation_types`) هي **قوالب** تحدد لكل عملية مالية أو مخزنية:
- التصنيف والعرض (الاسم، الأيقونة، اللون، التصنيف).
- الطرف الافتراضي (حساب مصدر، صندوق مصدر، مخزن مصدر).
- نوع السند (قبض/صرف/تحويل/قيد).
- إعدادات سير العمل (مسودة → معتمد → إلخ).
- الشاشات التي يظهر فيها النوع.
- (مخطط) قيد محاسبي تلقائي للعمليات المخزنية.

الجدول في الكود: `backend/src/db/schema/core.ts` — `operationTypes`، و`operationTypeAccounts` (الحسابات المسموحة لكل نوع).

---

## 2. تكامل كل محرك مع أنواع العمليات

### 2.1 المحرك المالي (transaction.service + مسارات السندات)

| نقطة التكامل | الوصف |
|--------------|--------|
| **إنشاء سند** | عند `POST /businesses/:bizId/vouchers` يُجلب نوع العملية (`operationTypeId`) ويُستخدم: `source_account_id` كحساب دائن افتراضي إن لم يُرسل `fromAccountId`، `source_fund_id` كصندوق صادر، `voucher_type` كنوع السند. |
| **ترقيم السند** | المحرك المالي يستدعي `getNextSequence(bizId, 'template_voucher', data.operationTypeId, year)` لترقيم تسلسلي حسب القالب. |
| **حفظ النوع في السند** | حقل `vouchers.operation_type_id` يُملأ من الطلب ويُنسخ إلى القيد (`journal_entries.operation_type_id`). |

**الخلاصة:** تكامل جيد. القالب يحدد الحساب/الصندوق الافتراضي ونوع السند والترقيم.

---

### 2.2 محرك سير العمل (workflow.service)

| نقطة التكامل | الوصف |
|--------------|--------|
| **إعدادات السير** | `getWorkflowConfig(operationTypeId)` يقرأ `operation_types.workflow_config` (enabled, initialStatus, statuses). |
| **الانتقالات المتاحة** | `getAvailableTransitions` تعتمد على `vouchers.operation_type_id`: لا نوع عملية ⇒ لا انتقالات. الانتقالات مُعرَّفة في `workflow_transitions` مرتبطة بـ `operation_type_id`. |
| **تنفيذ الانتقال** | `executeTransition` يتحقق من أن `transition.operationTypeId === voucher.operationTypeId`. |
| **إعداد افتراضي** | `setupDefaultWorkflow(bizId, operationTypeId)` يحدّث `operation_types.workflow_config` وينشئ انتقالات افتراضية. |

**الخلاصة:** تكامل كامل. سير العمل مربوط بنوع العملية ولا يعمل بدونه للسندات.

---

### 2.3 العمليات المخزنية (warehouse-operations + inventory + مالي)

| نقطة التكامل | الوصف |
|--------------|--------|
| **استخدام القالب** | عند `POST .../warehouse-operations` إن وُجد `operationTypeId` يُجلب صف `operation_types` كـ `opTemplate`. |
| **تطبيق الخصائص** | إن لم يُرسل المستخدم: `operationType` يُؤخذ من `opTemplate.voucher_type`، `sourceWarehouseId` من `opTemplate.source_warehouse_id`، `description` من `opTemplate.name`. |
| **ترقيم** | `getNextSequence(bizId, 'template', body.operationTypeId, year)` لتسلسل القالب. |
| **قيد آلي** | الكود يتحقق من `opTemplate?.auto_journal === true` و`opTemplate.source_account_id` لإنشاء قيد محاسبي عبر `postTransaction` وربط السند بـ `warehouse_operations.related_voucher_id`. |

**إصلاح مطبَّق:** تمت إضافة عمود **`auto_journal`** (boolean، افتراضي false) إلى تعريف جدول `operation_types` في Drizzle (`core.ts`). بعد تشغيل `pnpm run db:push` أو migration مكافئ، العمود سيُضاف في قاعدة البيانات وسيعمل شرط إنشاء القيد التلقائي من العمليات المخزنية عند `opTemplate.auto_journal === true` ووجود `source_account_id`.

---

### 2.4 محرك الصلاحيات (permissions)

| نقطة التكامل | الوصف |
|--------------|--------|
| **قيود الصلاحيات** | جدول `role_permissions` يدعم حقل `constraints` (JSON) يمكن أن يحتوي على `operationTypeIds: number[]`. |
| **الدالة** | `validateConstraints(userPermissions, { operationTypeId })` تتحقق من أن `operationTypeId` المسموح به للمستخدم يتضمن النوع المرسل. |

**إصلاح مطبَّق:** تُستدعى **`validateConstraints`** بعد `checkPermission` في معالجات إنشاء السندات (`POST .../vouchers`) والعمليات المخزنية (`POST .../warehouse-operations`) مع تمرير `operationTypeId` والمبلغ والحساب والمحطة عند إنشاء السند.

---

### 2.5 محرك التقارير (reporting.service)

| نقطة التكامل | الوصف |
|--------------|--------|
| **الفلاتر** | واجهات التقارير تدعم فلتر `operationTypeId` في `ReportFilters`. |
| **الاستعلامات** | يتم عمل `JOIN` مع `operation_types` وعرض اسم/أيقونة/لون النوع في نتائج التقارير (ميزان مراجعة، أرباح وخسائر، كشف حساب، إلخ). |

**الخلاصة:** تكامل سليم؛ أنواع العمليات مستخدمة للعرض والتصفية.

---

### 2.6 واجهات التحسينات (enhancements)

| نقطة التكامل | الوصف |
|--------------|--------|
| **قائمة السندات** | فلتر حسب `operationTypeId` وعرض اسم النوع من `operation_types`. |
| **اعتماد مسودة** | عند التحويل من draft → confirmed يُنسخ `existing.operationTypeId` إلى القيد المحاسبي. |
| **نسخ نوع عملية** | دالة نسخ نوع عملية مع الحسابات المرتبطة (`operation_type_accounts`). |
| **إحصائيات** | استعلامات تجميعية حسب نوع العملية. |

**الخلاصة:** تكامل جيد.

---

### 2.7 محرك المخزون (inventory.service)

محرك المخزون لا يستهلك **أنواع العمليات** مباشرة؛ يستقبل `movementType` كنص (مثل `supply_invoice`, `dispatch`). ربط نوع العملية المخزنية بالقالب يتم في **معالج الـ API** (warehouse-operations) وليس داخل inventory.service. لا فجوة هنا.

---

## 3. ملخص الفجوات والانحرافات

| # | المشكلة | الموقع | التوصية |
|---|---------|--------|---------|
| 1 | ~~عمود `auto_journal` غير موجود في schema~~ | `core.ts` (operation_types) | **تم:** إضافة عمود `autoJournal` (auto_journal) في الـ schema. تشغيل `db:push` لإنشاء العمود في الـ DB. |
| 2 | ~~`validateConstraints` لا تُستدعى~~ | معالجات POST vouchers و POST warehouse-operations | **تم:** استدعاء `validateConstraints` مع `operationTypeId` (والمبلغ والحساب والمحطة للسندات). |
| 3 | ~~مسار اعتماد السند لا يمر عبر المحرك المالي~~ | enhancements + workflow | **تم:** توحيد الاعتماد عبر `confirmDraftVoucher` و`applyAccountingForConfirmedVoucher`. |

---

## 4. خريطة التكامل (مرجع سريع)

```
                    ┌─────────────────────┐
                    │  operation_types    │
                    │  (+ operation_type_  │
                    │   accounts)         │
                    └──────────┬──────────┘
                               │
     ┌─────────────────────────┼─────────────────────────┐
     │                         │                         │
     ▼                         ▼                         ▼
┌─────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│ المحرك المالي │    │ محرك سير العمل      │    │ العمليات المخزنية    │
│ - حساب/صندوق │    │ - workflow_config   │    │ - مصدر مخزن، وصف    │
│   افتراضي    │    │ - انتقالات حسب النوع │    │ - ترقيم قالب        │
│ - voucher_type│   │ - لا انتقال بدون نوع │    │ - auto_journal؟     │
│ - ترقيم قالب │    └─────────────────────┘    │   (عمود مفقود)      │
└─────────────┘                                 └─────────────────────┘
     │                                                      │
     │                         ┌────────────────────────────┘
     │                         │
     ▼                         ▼
┌─────────────┐    ┌─────────────────────┐
│ التقارير    │    │ الصلاحيات            │
│ - فلتر حسب  │    │ - constraints.       │
│   النوع     │    │   operationTypeIds  │
│ - عرض الاسم │    │ - validateConstraints │
└─────────────┘    │   غير مستدعاة       │
                   └─────────────────────┘
```

---

تم إعداد هذا التقرير لفحص تكامل ميزة أنواع العمليات مع المحركات. يُحدَّث عند إضافة حقول جديدة لأنواع العمليات أو تغيير مسارات الاعتماد أو الصلاحيات.
