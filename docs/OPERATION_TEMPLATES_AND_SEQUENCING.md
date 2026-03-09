# قوالب أنواع العمليات ومحرك الترقيم

## 1. ما هي قوالب أنواع العمليات؟

**قوالب أنواع العمليات** (`operation_types`) هي تعريفات لأنواع العمليات في النظام، مثل:
- "تحصيل من عميل"
- "صرف لمورد"
- "تحويل بين حسابات"

كل قالب يحتوي على:
- **اسم، وصف، أيقونة، لون**
- **تصنيف (category)** مثل "عام"، "تحصيلات"، "مصروفات"
- **رقم تسلسلي داخل التصنيف (sequenceNumber)** و**رمز (code)** مثل `عام-001`
- **نوع السند (voucherType):** قبض | صرف | قيد
- **الحسابات المرتبطة** (من/إلى، عبر `operation_type_accounts`)
- **مصدر افتراضي** (صندوق، حساب بنك، مخزن...)

---

## 2. ترقيم إنشاء القوالب نفسها (عند إضافة نوع عملية جديد)

| ماذا يحدث | أين في الكود |
|-----------|----------------|
| عند **إضافة قالب** جديد عبر `POST /businesses/:bizId/operation-types` | `operation-types.routes.ts` |
| **معرّف التصنيف:** جدول `operation_categories` يربط اسم التصنيف (مثل "عام") بمعرّف رقمي. يُستدعى `getOrCreateOperationCategoryId(bizId, category)` للحصول على أو إنشاء السجل. | ضروري لمحرك الترقيم (entityId) |
| **sequenceNumber و code:** يُستدعى `getNextItemInCategorySequence(bizId, 'operation', categoryId)` من محرك الترقيم. العداد المستخدم: `item_in_operation_category` مع `entityId = categoryId`. | `sequence_counters` + ترقيم متسق داخل كل تصنيف |
| **code** يُولَّد مثل `عام-001` من أول 3 أحرف من التصنيف + الرقم التسلسلي من المحرك | |

**ملاحظة:** ترقيم القوالب **يمر عبر محرك الترقيم** منذ ربطه: كل تصنيف (category) له معرّف في `operation_categories`، والقالب الجديد يحصل على الرقم التالي من العداد `item_in_operation_category` لهذا التصنيف، مما يضمن عدم التكرار حتى مع التزامن.

---

## 3. كيف يتفاعل القالب مع محرك الترقيم عند تنفيذ العمليات؟

### أ) السندات (قبض / صرف)

| العنصر | المصدر | ملاحظة |
|--------|--------|--------|
| **رقم السند الرئيسي** | محرك الترقيم حسب **الخزينة + نوع السند** (قبض/صرف) | `transaction.service` → `generateVoucherNumberByTreasury` → عداد مثل `treasury_fund_receipt` مع `entityId = treasuryId` |
| **templateSequence** (تسلسل القالب) | إذا وُجد **operationTypeId** يُستدعى `getNextSequence(bizId, 'template_voucher_receipt' أو 'template_voucher_payment', operationTypeId, year)` | يُخزَّن في الحقل `template_sequence` على السند؛ يربط السند بالقالب وترتيبه ضمن هذا القالب في السنة |
| **operationTypeId** | يُمرَّر من الواجهة ويُخزَّن في جدول **vouchers** | للربط والفلترة والتقارير فقط؛ لا يتحكم في رقم السند الرئيسي |

الخلاصة: رقم السند يُولَّد حسب **من أين صرف/قبض** (أي الخزينة)، والقالب يُخزَّن للربط ويحصل على **تسلسل خاص به** (templateSequence) ضمن نفس السنة.

---

### ب) القيود المحاسبية (journal entries)

| العنصر | المصدر | ملاحظة |
|--------|--------|--------|
| **full_sequence_number و entry_number** | محرك الترقيم حسب **التصنيف + القالب (operationTypeId)** | `journal-entries.routes.ts` → `generateJournalEntryFullSequence(bizId, categorySeqNum, **operationTypeId**, year)` |
| **entityId في العداد** | = **operationTypeId** (معرّف القالب) | نوع العداد: `journal_entry` → كل **قالب** له تسلسل قيود مستقل سنوياً |
| **categorySeqNum** | من جدول **journal_entry_categories** بمطابقة `category` القالب | يُستخدم في شكل الرقم المنسق: `تصنيف-سنة-تسلسل` |

الخلاصة: في القيود، **القالب (operationTypeId) هو أساس الترقيم**: كل قالب له تسلسل قيود سنوي خاص به، والرقم المنسق يعكس تصنيف القيد + السنة + هذا التسلسل.

---

### ج) عمليات المخازن (warehouse_operations)

| العنصر | المصدر | ملاحظة |
|--------|--------|--------|
| **full_sequence_number (operationNumber)** | محرك الترقيم حسب **المخزن + نوع العملية المخزنية** (توريد، صرف، تحويل...) | `warehouse.routes.ts` → `generateWarehouseOpFullSequence(bizId, categorySeqNum, warehouseSeqNum, **body.operationType**, warehouseId, year)` — هنا `operationType` = نوع العملية (supply_invoice, dispatch...) وليس معرّف القالب |
| **templateSequence** | إذا وُجد **operationTypeId** (القالب): `getNextSequence(bizId, 'template', operationTypeId, year)` | يُخزَّن في الحقل `template_sequence` على العملية |
| **operationTypeId** | يُخزَّن في **warehouse_operations** | يربط العملية بقالب نوع العملية (للربط والتقارير) |

الخلاصة: الرقم المنسق للعملية يُبنى من **المخزن + نوع العملية المخزنية**؛ القالب (operationTypeId) يُخزَّن ويحصل على تسلسل قالب سنوي (templateSequence) فقط.

---

## 4. ملخص التكامل

| الكيان | ما الذي يتحكم في الترقيم؟ | دور القالب (operation_type) |
|--------|---------------------------|-----------------------------|
| **إنشاء قالب جديد** | محرك الترقيم: `item_in_operation_category` + معرّف التصنيف من `operation_categories` | — |
| **سند (قبض/صرف)** | الخزينة + نوع السند | ربط (operationTypeId) + تسلسل قالب سنوي (template_sequence) |
| **قيد محاسبي** | التصنيف + **القالب (operationTypeId)** | أساس الترقيم: كل قالب له تسلسل قيود سنوي |
| **عملية مخزن** | المخزن + نوع العملية المخزنية | ربط (operationTypeId) + تسلسل قالب سنوي (template_sequence) |

---

## 5. دوال محرك الترقيم ذات الصلة

| الدالة | الاستخدام |
|--------|-----------|
| `getNextCategorySequence(bizId, treasuryType)` | ترقيم **التصنيفات** (صناديق، بنوك، صرافين، محافظ، مخازن، قيود) — **لا يُستدعى** عند إنشاء قالب عملية. |
| `getNextItemInCategorySequence(bizId, treasuryType, categoryId)` | ترقيم **عنصر داخل تصنيف** (صندوق، بنك، قالب داخل تصنيف...). يُستدعى من مسار إنشاء أنواع العمليات مع `treasuryType = 'operation'` و `categoryId` من جدول `operation_categories`. |
| `generateVoucherFullSequence(...)` | توليد الرقم المنسق لسند (قبض/صرف/تحويل) حسب خزينة + نوع — يُستخدم في مسارات أخرى؛ في `transaction.service` يُستخدم منطق مشابه مع عداد `treasury_*`. |
| `generateJournalEntryFullSequence(bizId, categorySeqNum, categoryId, year)` | توليد الرقم المنسق للقيد — **categoryId = operationTypeId** هنا، فكل قالب له تسلسل قيود مستقل. |
| `generateWarehouseOpFullSequence(...)` | توليد الرقم المنسق لعملية مخزن حسب مخزن + نوع العملية. |
| `generateOperationTemplateFullSequence(...)` | توليد رقم منسق لقالب عملية (تصنيف-سنة-تسلسل) — **موجودة في المحرك لكن غير مستدعاة** من واجهة إنشاء أنواع العمليات. |

---

## 6. خريطة تدفق مختصرة

```
[إضافة قالب نوع عملية]
  → categoryId = getOrCreateOperationCategoryId(bizId, category)  // من جدول operation_categories
  → { sequenceNumber } = getNextItemInCategorySequence(bizId, 'operation', categoryId)  // محرك الترقيم
  → code = مثل "عام-001" من بادئة التصنيف + sequenceNumber

[إنشاء سند قبض/صرف]
  → رقم السند من: الخزينة + نوع السند (محرك الترقيم)
  → إذا وُجد operationTypeId: template_sequence من عداد template_voucher_* (محرك الترقيم)
  → operationTypeId يُخزَّن على السند

[إنشاء قيد محاسبي]
  → full_sequence_number من: generateJournalEntryFullSequence(bizId, categorySeqNum, operationTypeId, year)
  → أي الترقيم مرتبط بالقالب (operationTypeId) مباشرة

[إنشاء عملية مخزن]
  → full_sequence_number من: المخزن + نوع العملية (محرك الترقيم)
  → إذا وُجد operationTypeId: template_sequence من عداد 'template' (محرك الترقيم)
  → operationTypeId يُخزَّن على العملية
```

تمت كتابة هذا الملف لشرح كيف تعمل قوالب أنواع العمليات مع محرك الترقيم في النظام.
