# فحص النظام — تعمق (Deep Dive)

**التاريخ:** 2026-03-07  
**يكمل:** `docs/SYSTEM_INSPECTION.md`

---

## 1. محرك المعاملات (Transaction Engine)

### 1.1 المسار الحراج

- **الدالة المركزية:** `postTransaction(bizId, userId, data)` في `transaction.service.ts`.
- **الخطوات الذرية (داخل `db.transaction`):**
  1. التحقق من ملكية كل الحسابات/الصناديق لـ `bizId` عبر `validateTransactionOwnership`.
  2. توليد رقم السند (ترقيم ذكي حسب التصنيف/الصندوق/الحساب).
  3. إدراج `vouchers`.
  4. إدراج `journalEntries` + `journalEntryLines` (مدين/دائن).
  5. تحديث `account_balances` و `fund_balances` عبر `INSERT ... ON CONFLICT DO UPDATE`.
  6. تسجيل `auditLog`.

- **الدوال المرتبطة:** `cancelTransaction`، `confirmDraftTransaction`، `postTransaction` — كلها تعمل داخل transaction وتحدّث الأرصدة بشكل متماسك.

### 1.2 نقاط القوة

- عزل تام لكل عمل (`bizId`)؛ التحقق من الملكية قبل التنفيذ.
- استخدام parameterized SQL (قوالب `sql` مع متغيرات) يمنع حقن SQL في المحرك.
- سجل تدقيق لكل عملية إنشاء/اعتماد/إلغاء.

### 1.3 ملاحظة

- تحديث الأرصدة يتم عبر `sql` خام مع قيم معاملات؛ لا استخدام لـ raw string من المستخدم داخل هذه الاستعلامات.

---

## 2. نموذج البيانات (Schema) — تعمق

### 2.1 حجم الـ Schema

- **الملف:** `backend/src/db/schema/core.ts` — قرابة 650 سطر.
- **الجداول:** أكثر من 60 جدولاً (users, businesses, stations, accounts, vouchers, journal, funds, balances, workflow, UI builder, إلخ).
- **العلاقات:** مراجع واضحة عبر `.references(() => table.id)`؛ فهارس فريدة حيث لزم (مثل `account_balances_account_currency_unique`).

### 2.2 الفهارس

- يوجد ملف `add-indexes.sql` يضيف فهارس على:
  - `business_id` للجداول الرئيسية.
  - أعمدة JOIN (مثل `account_id`, `fund_id`, `journal_entry_id`).
  - أعمدة فلترة (مثل `voucher_type`, `voucher_date`, `status`).
  - مركبة مثل `(business_id, voucher_type)` و `(account_id, currency_id)`.

- **التوصية:** التأكد من تطبيق هذا الملف على بيئات التشغيل؛ ومراجعة استعلامات التقارير البطيئة وإضافة فهارس عند الحاجة.

### 2.3 جداول الأرصدة

- `account_balances`: (account_id, currency_id) فريد؛ تحديث عبر upsert.
- `fund_balances`: (fund_id, currency_id) فريد؛ نفس النمط.
- مصدر الحقيقة للمعاملات هو `journal_entry_lines` + `vouchers`؛ الأرصدة مُشتَقّة ومحدَّثة في نفس الـ transaction.

---

## 3. الأمان — تعمق

### 3.1 المصادقة والتوكن

- **تسجيل الدخول:** مقارنة كلمة المرور عبر `bcrypt.compare`؛ إصدار JWT بـ `expiresIn: '7d'`.
- **التسجيل:** مفتوح (بدون مصادقة) — أي شخص يمكنه إنشاء حساب بدور `viewer` ما لم يُمرَّر `role` آخر. قد يكون مقصوداً للتجربة؛ في الإنتاج يُفضّل تقييد التسجيل أو تفعيله بدعوة فقط.
- **تخزين التوكن في الواجهة:** `localStorage` (`hesabati_token`, `hesabati_user`). في حال وجود XSS يمكن سرقة التوكن؛ استخدام `httpOnly` cookie يقلل هذا الخطر (يتطلب ضبط CORS و credentials).

### 3.2 صلاحية العمل (bizId)

- **bizAuthMiddleware:** يقرأ `bizId` من المسار، يستدعي `userCanAccessBusiness(userId, role, bizId)`.
- **userCanAccessBusiness:** إذا كان المستخدم `admin` يُعاد `true`؛ وإلا يتم التحقق من وجود سجل في `user_roles` لهذا المستخدم وهذا العمل.
- **منع IDOR:** المسارات التي تستخدم `bizId` من الـ URL محمية بـ `bizAuthMiddleware`؛ والوصول للموارد (مثل حساب، صندوق) يمر عبر `requireResourceOwnership` أو فحص ملكية صريح في الـ service (مثل `verifyAccountOwnership`).

### 3.3 XSS والـ Body

- **Middleware:** `xssSanitizeMiddleware` يقرأ الـ body، ينظّفه عبر `sanitizeObject`، ويضع النتيجة في `c.set('sanitizedBody', sanitized)`.
- **تم الإصلاح (2026-03-07):** تمت إضافة دالة `getBody(c)` في `middleware/helpers.ts` التي تعيد `normalizeBody(sanitizedBody)` عند توفره، وإلا تحاول قراءة الطلب. تم استبدال `normalizeBody(await c.req.json())` بـ `await getBody(c)` في جميع المسارات التي تقرأ الـ body (auth، api.rest، enhancements، stations، employees، funds). الـ handlers تعمل الآن على النسخة المُنظَّفة فعلياً.
- ~~**الفجوة:** جميع الـ handlers تقرأ الـ body عبر `normalizeBody(await c.req.json())` ولا تستخدم `c.get('sanitizedBody')`. لذلك الـ body المُنظَّف لا يُستعمل فعلياً في المنطق.~~
- ~~**التوصية:** إما (أ) جعل الـ handlers تستخدم `c.get('sanitizedBody')` عندما يكون متوفراً، أو (ب) توحيد قراءة الـ body في مكان واحد واستخدام النسخة المُنظَّفة في كل المسارات المحمية بـ XSS middleware.~~

### 3.4 SQL

- **الغالبية:** استعلامات عبر قوالب `sql` مع قيم معاملات (مثل `sql\`... WHERE business_id = ${bizId}\``) — آمنة من الحقن.
- **استثناء مُخفَّف:** `ui-builder.service.ts` — `executeDataSource` عندما `sourceType === 'query'` يستخدم `sql.raw(template)` للـ `queryTemplate`. التخفيف:
  - السماح فقط بطلب يبدأ بـ `SELECT`.
  - منع كلمات مثل INSERT, UPDATE, DELETE, DROP, إلخ.
  - منع أنماط مثل `--`, `;`, `UNION ... SELECT`.
  - النتيجة مُقيَّدة أيضاً بـ `WHERE q.business_id = ${bizId}`.
- **الخلاصة:** الخطر محدود بمصادر البيانات التي يضيفها مدراء النظام؛ يُفضّل تقييد إنشاء/تعديل `queryTemplate` بصلاحيات عالية فقط ومراجعة دورية للمحتوى.

### 3.5 الصيانة (maintenance)

- مسارات `/api/maintenance` محمية بـ `adminMiddleware` فقط؛ أي مستخدم بدور admin يمكنه تنفيذ عمليات خطرة (مثل DROP TABLE في السكربتات الموجودة). التأكد من أن دور admin ممنوح لأشخاص موثوقين فقط.

---

## 4. اتساق معالجة الطلبات

### 4.1 قراءة الـ Body

- **النمط السائد:** `const body = normalizeBody(await c.req.json());` ثم التحقق عبر Zod أو حقل بحقل.
- **auth:** يقرأ `c.req.json()` مباشرة (بدون normalizeBody)؛ مناسب لأن الحقول قليلة ومحددة.

### 4.2 معالجة الأخطاء

- **safeHandler:** يلف معظم الـ handlers في api.rest و enhancements؛ يترجم أخطاء DB (unique, foreign key, not-null, timeout, إلخ) إلى رسائل عربية ورموز HTTP مناسبة.
- **onError في Hono:** يعيد رسالة عامة ويخفي التفاصيل في الإنتاج.

### 4.3 التحقق من المدخلات

- **Zod:** مُستخدم في validation.ts (accountSchema, voucherSchema, employeeSchema, إلخ) ويُستدعى عبر `validateBody(schema, body)` في العديد من المسارات.
- ليست كل الـ endpoints تمرر الـ body عبر Zod؛ مراجعة المسارات الحرجة (إنشاء سند، قيد، مستخدم) تؤكد استخدام التحقق.

---

## 5. الأداء والديون التقنية

### 5.1 حجم الملفات

- **api.rest.ts:** أكثر من 4000 سطر — يجمع عشرات المسارات في ملف واحد. يصعّب الصيانة والاختبار.
- **التوصية:** تقسيم حسب المجال (مثلاً accounts.routes، vouchers.routes، reports.routes) مع الإبقاء على استخدام مشترك لـ bizAuth و safeHandler و helpers.

### 5.2 استعلامات N+1

- في مسارات مثل جلب الحسابات مع الأرصدة والروابط: يتم جلب الحسابات ثم جلب الأرصدة والروابط بـ `inArray(accountIds)` — أي تحميل دفعي وليس N+1. نمط جيد.

### 5.3 التقارير والـ SQL الخام

- **reporting.service.ts** و **enhancements.ts** يستخدمان `db.execute(sql\`...\`)` مع بناء ديناميكي للشروط عبر `sql` مقسم (مثل `conditions = sql\`${conditions} AND ...\``). القيم دائماً معاملات، وليس تركيب strings — آمن. مراقبة زمن تنفيذ التقارير الكبيرة والتفكير في pagination أو cache (مثل analytics_snapshots) مفيد.

---

## 6. الواجهة الأمامية — تعمق

### 6.1 حالة المصادقة

- **AuthService:** إشارات `token` و `currentUser`؛ التحميل من `localStorage` عند البداية.
- **authGuard:** يتحقق من وجود توكن؛ إن لم يوجد يُوجّه إلى تسجيل الدخول.
- **ApiService:** يضيف `Authorization: Bearer <token>` من AuthService؛ عند 401 يستدعي `logout()` ويعيد التوجيه.

### 6.2 WebSocket

- الاتصال إلى `ws://host:3000/ws?userId=&bizId=` — المنفذ ثابت (3000). في بيئة يكون فيها الواجهة على منفذ/نطاق مختلف، جعل عنوان WS قابلاً للضبط (مثلاً من environment أو config) يسهل النشر.

### 6.3 حجم ApiService

- خدمة واحدة تضم عشرات الدوال (dashboard، businesses، accounts، vouchers، reports، إلخ). من ناحية معمارية يمكن لاحقاً فصلها إلى خدمات حسب المجال (AccountApiService، VoucherApiService) لتحسين القراءة والاختبار، دون تغيير سلوك الـ API.

---

## 7. خلاصة التعمق

| المجال | الحالة | إجراء مقترح |
|--------|--------|-------------|
| محرك المعاملات | قوي، ذري، ومرتبط بملكية العمل | مراقبة أداء مع زيادة الحمل |
| Schema والفهارس | غني، مع فهارس مُعرَّفة | التأكد من تطبيق add-indexes.sql وقياس استعلامات التقارير |
| JWT وbizId | مُطبَّق بشكل صحيح ضد IDOR | اختياري: نقل التوكن إلى httpOnly cookie |
| XSS و body | Middleware موجود؛ تم إصلاح الاستخدام عبر getBody() | — تم |
| SQL | معاملات آمنة؛ استثناء queryTemplate مع تخفيف | تقييد صلاحيات إنشاء مصادر الاستعلام المخصص |
| التسجيل | مفتوح بدون مصادقة | تقييد في الإنتاج أو دعوات فقط |
| حجم api.rest.ts | ملف ضخم جداً | تقسيم إلى routes حسب المجال |
| الواجهة | ApiService موحّد، WS بمنفذ ثابت | جعل عنوان WS قابلاً للضبط؛ اختياري: تقسيم الخدمات |

تم إعداد هذا التعمق بناءً على قراءة الكود دون تشغيل بيئة كاملة أو تنفيذ هجمات فعلية.
