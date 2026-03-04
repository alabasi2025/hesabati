# عنصر "إعدادات التبويب" — المتحكم بالأقسام والصفحات

## ما هو عنصر إعدادات التبويب؟

**إعدادات التبويب** هو عنصر في القائمة الجانبية يفتح صفحة **إعدادات التبويب الجانبي** (`/biz/{bizId}/sidebar-settings`). هذه الصفحة هي **المركز الوحيد** لإدارة:
- **الأقسام** (مثل: الرئيسية، الإعداد، العمليات المالية، الرواتب والميزانية)
- **الشاشات/الصفحات** (العناصر تحت كل قسم، ومساراتها)
- **صلاحيات كل مستخدم** (إظهار/إخفاء عناصر، ترتيب مخصص)

---

## أين يظهر "إعدادات التبويب"؟

| المصدر | الموقع |
|--------|--------|
| **قاعدة البيانات** | عنصر في جدول `sidebar_items` مرتبط بقسم "الإعداد" (`sidebar_sections`)، بـ `screenKey: 'sidebar_settings'` و `route: '/biz/{bizId}/sidebar-settings'`. |
| **Seed** | `backend/src/db/seed.ts` و `seed_sidebar.ts`: يُضاف تحت قسم "الإعداد" (sortOrder 3). |
| **Fallback الواجهة** | في `frontend/src/app/components/sidebar/sidebar.ts` داخل `buildFallbackMenu` يظهر كعنصر ثابت تحت "الإعداد" عند عدم توفر بيانات من API. |

---

## كيف تتحكم الصفحة بالأقسام والصفحات؟

### 1) تبويب "الأقسام"

- **القراءة**: `GET /businesses/:bizId/sidebar-sections` → من جدول `sidebar_sections` (حسب `businessId` و `sortOrder`).
- **الإضافة**: زر "قسم جديد" → نموذج (اسم، أيقونة، ترتيب) → `POST /businesses/:bizId/sidebar-sections` → إدراج في `sidebar_sections`.
- **التعديل**: زر "تعديل" على بطاقة القسم → `PUT /sidebar-sections/:id` → تحديث `sidebar_sections`.
- **الحذف**: زر "حذف" → تأكيد → `DELETE /sidebar-sections/:id` → حذف عناصر القسم من `sidebar_items` و `user_sidebar_config` ثم حذف القسم من `sidebar_sections`.

**الملف في الواجهة**: `frontend/src/app/pages/sidebar-settings/sidebar-settings.ts` (الدوال: `openSectionForm`, `saveSection`, `deleteSection`) والقالب `sidebar-settings.html` (تبويب "الأقسام").

---

### 2) تبويب "الشاشات"

- **القراءة**: `GET /businesses/:bizId/sidebar-items` → من جدول `sidebar_items` مع `leftJoin` على `sidebar_sections` (مرتبة حسب قسم ثم ترتيب العنصر).
- **الإضافة**: زر "شاشة جديدة" → نموذج (القسم، screenKey، الاسم، المسار، الأيقونة، الترتيب) → `POST /sidebar-items` → إدراج في `sidebar_items` + إضافة سجلات في `user_sidebar_config` لجميع مستخدمي العمل.
- **التعديل**: زر "تعديل" على بطاقة الشاشة → `PUT /sidebar-items/:id` → تحديث `sidebar_items`.
- **الحذف**: زر "حذف" → تأكيد → `DELETE /sidebar-items/:id` → حذف من `user_sidebar_config` ثم من `sidebar_items`.

**الملف في الواجهة**: نفس المكون، الدوال: `openItemForm`, `saveItem`, `deleteItem`, `getItemsBySection`. في القالب: تبويب "الشاشات" يعرض الأقسام ثم تحت كل قسم قائمة الشاشات.

---

### 3) تبويب "صلاحيات المستخدمين"

- **القراءة**: عند اختيار مستخدم → `GET /businesses/:bizId/users/:userId/sidebar` → من `user_sidebar_config` مع `sidebar_items` و `sidebar_sections`. الصفحة تدمج "مصدر الحقيقة" (جميع الأقسام والعناصر من الـ API أعلاه) مع إعدادات المستخدم (ظهور، ترتيب).
- **التعديل**: إظهار/إخفاء عناصر، سحب وإفلات لإعادة الترتيب → زر "حفظ التغييرات" → `PUT /businesses/:bizId/users/:userId/sidebar` مع `{ items: [{ id, sidebarItemId, isVisible, customSortOrder }] }` → تحديث `user_sidebar_config` فقط (لا يغيّر الأقسام ولا عناصر السايدبار نفسها).

هذا التبويب **لا يضيف ولا يحذف أقساماً أو شاشات**؛ يتحكم فقط بما يظهر لكل مستخدم وبترتيبه.

---

## تدفق البيانات (مصدر الحقيقة)

```
قاعدة البيانات:
  sidebar_sections (لكل عمل)     → الأقسام
  sidebar_items (لكل قسم)        → الشاشات/الصفحات ومساراتها
  user_sidebar_config            → إظهار/إخفاء وترتيب لكل مستخدم

صفحة إعدادات التبويب:
  تحميل: getSidebarSections + getSidebarItems (+ getUsers للتبويب الثالث)
  إدارة الأقسام: create/update/delete SidebarSection
  إدارة الشاشات: create/update/delete SidebarItem
  صلاحيات المستخدم: getUserSidebar + updateUserSidebar
```

التبويب الجانبي الفعلي (في الهيكل الرئيسي للتطبيق) يقرأ من:
`GET /businesses/:bizId/users/:userId/sidebar` الذي يبني القائمة من `sidebar_sections` + `sidebar_items` + `user_sidebar_config`. عند غياب بيانات أو فشل الطلب يُستخدم الـ fallback في `sidebar.ts`.

---

## الملفات المرجعية

| الغرض | الملف |
|--------|--------|
| صفحة إعدادات التبويب (الواجهة) | `frontend/src/app/pages/sidebar-settings/sidebar-settings.ts` و `sidebar-settings.html` |
| API الأقسام والعناصر | `backend/src/routes/api.ts` (مسارات `sidebar-sections` و `sidebar-items`) |
| جداول قاعدة البيانات | `backend/src/db/schema/` (core): `sidebarSections`, `sidebarItems`, `userSidebarConfig` |
| إضافة عنصر "إعدادات التبويب" في الـ seed | `backend/src/db/seed.ts`, `backend/src/db/seed_sidebar.ts` |
| عرض التبويب الجانبي (وق fallback) | `frontend/src/app/components/sidebar/sidebar.ts` |

---

## الخلاصة

- **عنصر "إعدادات التبويب"** في الشريط الجانبي يفتح الصفحة التي تتحكم في **كل** أقسام وصفحات التبويب.
- **الأقسام** تُدار من تبويب "الأقسام" (إضافة/تعديل/حذف) وتُخزَّن في `sidebar_sections`.
- **الشاشات/الصفحات** تُدار من تبويب "الشاشات" (إضافة/تعديل/حذف) وتُخزَّن في `sidebar_items`.
- **من يرى ماذا** يُدار من تبويب "صلاحيات المستخدمين" ويُخزَّن في `user_sidebar_config` دون تغيير تعريف الأقسام أو الشاشات.
