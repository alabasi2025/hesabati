# معمارية المشروع — Hesabati

وثيقة موجزة لطبقات النظام واتجاه الاعتماد ومصادر الحقيقة.

---

## 1. هيكل المشروع

```
hesabati/
├── frontend/     # Angular 19 — واجهة المستخدم
├── backend/      # Hono + PostgreSQL + Drizzle — API وخدمات
└── tmp/          # ملخصات وتقارير (غير مُنشر)
```

- **الواجهة** لا تتصل بقاعدة البيانات أبداً؛ كل الطلبات تمر عبر الباك اند (`/api`, `/health`).
- **الباك اند** هو المصدر الوحيد للاتصال بقاعدة البيانات.

---

## 2. Backend — الطبقات واتجاه الاعتماد

الاعتماد المسموح: **من الأعلى إلى الأسفل فقط** (لا تعتمد الخدمات أو النطاق على الطرق).

| الطبقة | المسار النموذجي | الوصف |
|--------|-----------------|--------|
| **HTTP / Routes** | `routes/`, `middleware/` | استقبال الطلبات، مصادقة، تحقق أولي، استدعاء الخدمات أو DB مع تحقق ملكية |
| **Application / Services** | `services/*.ts` | منطق التطبيق: معاملات، تقارير، ترقيم، مخزون، عملات، WebSocket |
| **Domain** | `domain/*.ts` | قواعد نطاق خالصة (مثلاً التحقق من ملكية حساب/صندوق) |
| **Data** | `db/`, `db/schema/` | اتصال DB، Schema، استعلامات |

قواعد:

- **domain/** لا تستورد من `routes/`.
- **services/** تستورد من `domain/` و `db/` و `middleware/` (مصادقة، تحقق صلاحيات) عند الحاجة فقط.
- **routes/** تستورد من `services/` و `domain/` و `middleware/` و `_shared/`.

ملفات مشتركة للطرق:

- **routes/api/_shared/** — مساعدات خاصة بالـ API (مثلاً `requireResourceOwnership`، `getBizId`)؛ يمكن أن تستورد من `domain/` و `middleware/`.

---

## 3. مصادقة وصلاحيات

- **JWT** في `Authorization: Bearer <token>` — التحقق في `middleware/auth.ts`.
- **صلاحية على عمل (bizId)** عبر `user_roles` — التحقق في `middleware/bizAuth.ts` و `userCanAccessBusiness`.
- المسارات التي تحتوي على `:bizId` تمر عبر `bizAuthMiddleware()` أولاً.
- المسارات التي تستخدم معرّفاً فقط (مثل `PUT /employees/:id`) يجب أن تستدعي تحقق ملكية (مثلاً `requireResourceOwnership`) بعد جلب السجل من DB.

---

## 4. مصدر الحقيقة لـ "العمل الحالي" (Frontend)

- **المصدر الوحيد الموثوق:** مسار التطبيق `/biz/:bizId`.
- **BusinessService** يُحدَّث من الـ layout عند تغيّر المسار؛ الصفحات تقرأ `currentBusinessId()` من الخدمة.
- يُفضّل عدم استنتاج `bizId` من أماكن متعددة (مسار + تخزين + snapshot) في نفس الوقت لتجنب تناقض مؤقت.

---

## 5. تحقق المدخلات (Validation)

- **Backend:** استخدام `validateBody(schema, body)` (Zod) لكل طلبات POST/PUT/PATCH التي تغيّر بيانات؛ الـ schemas في `middleware/validation.ts`.
- **سياسة موحدة:** أي مسار يعدّل بيانات يجب أن يمرّ الـ body عبر schema معرّف أو قائمة حقول إلزامية موثقة.

---

## 6. الترقيم والملكية

- **الترقيم الذكي:** منطق الترقيم في `services/sequencing.service.ts`؛ يُعاد تصديره من `middleware/sequencing.ts` للتوافق مع الاستيراد الحالي.
- **التحقق من ملكية الحساب/الصندوق:** في `domain/ownership.ts`؛ تُستدعى من الخدمات (مثل `transaction.service`) ومن routes (عبر `_shared/ownership.ts`).

---

## 7. WebSocket

- الاتصال على `/ws` مع **مصادقة**: `token` (JWT) و `bizId` في query.
- الباك اند يتحقق من صلاحية الـ token ثم من صلاحية المستخدم على `bizId` قبل قبول الاتصال.

---

تم تحديث هذه الوثيقة بعد معالجة ثغرات IDOR ونقل منطق الملكية والترقيم وإضافة مصادقة WebSocket.
