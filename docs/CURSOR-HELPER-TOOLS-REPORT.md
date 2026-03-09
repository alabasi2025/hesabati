# فحص الأدوات المساعدة في Cursor وما المتبقي

تاريخ التقرير: 2026-03-07

---

## 1. ما هو موجود في المشروع (حساباتي)

### 1.1 قواعد Cursor (Rules)

| الملف | الوصف |
|-------|--------|
| `.cursor/rules/build-output-no-split.mdc` | عدم اقتراح تقسيم ملفات البناء في `backend/public/**/*.js` (مخرجات Angular المُولَّدة). |
| `.cursor/rules/drizzle-migrations.mdc` | عدم تقسيم ملفات الهجرات في `backend/drizzle/**/*.sql`؛ كل ملف هجرة وحدة واحدة. |

**الخلاصة:** قاعدتان فعّالتان لمنع الـ AI من اقتراح تقسيم ملفات مولَّدة أو هجرات.

---

### 1.2 توثيق الأدوات

| الملف | المحتوى |
|-------|---------|
| `.cursor/TOOLS_FROM_PROJECT.md` | استنتاج أدوات Cursor من المشروع: امتدادات، مهام، MCP، تشغيل وتصحيح، ما لا يوجد (ESLint/Jest). |
| `.vscode/README.md` | أدوات مساعدة: فتح الـ Workspace لتجنب "No config file" لـ Angular، إضافات موصى بها، مهام، Simple Browser. |

---

### 1.3 إعدادات VS Code / Cursor على مستوى المشروع

| المسار | المحتوى |
|--------|---------|
| `frontend/.vscode/extensions.json` | اقتراح تثبيت Angular Language Service. |
| `frontend/.vscode/tasks.json` | مهام: `npm: start` (واجهة)، `npm: test` (اختبارات). |
| `frontend/.vscode/launch.json` | تشغيل مع تصحيح: ng serve، ng test. |
| `frontend/.vscode/mcp.json` | خادم MCP: **angular-cli** (`npx -y @angular/cli mcp`). |
| `.vscode/tasks.json` | مهمة: فتح Simple Browser على http://localhost:4200. |
| `.vscode/settings.json` | إعدادات المشروع. |
| `.vscode/extensions.json` | امتدادات موصى بها (إن وُجدت). |

---

### 1.4 Workspace

- **`hesabati.code-workspace`** — لفتح المشروع كـ Workspace (Frontend + Backend) وتقليل أخطاء Angular "No config file".

---

## 2. ما هو موجود على مستوى المجلد الأب (d:\Hhhh)

هذه أدوات Cursor عامة (ليست خاصة بحساباتي فقط):

| النوع | الملفات | الغرض |
|-------|---------|--------|
| **ACE** | `.cursor/commands/ace-*.md`, `.cursor/rules/ace-*.mdc`, `.cursor/scripts/ace_*.ps1`, `.cursor/ace/*.jsonl` | أوامر وقيود وتتبع لـ ACE (أنماط، تعلم، حالة). |
| **أوامر Slash** | `/ace-status`, `/ace-search`, `/ace-configure`, `/ace-bootstrap`, `/ace-learn`, `/ace-help` | استخدام من داخل المحادثة. |
| **MCP (ACE)** | `ace_get_playbook`, `ace_search`, `ace_learn`, `ace_bootstrap`, `ace_status` | أدوات MCP للأنماط والتعلم. |

---

## 3. المتبقي أو المنقوص (حسب التوثيق الحالي)

### 3.1 في المشروع

| البند | الحالة | التوصية |
|-------|--------|---------|
| **AGENTS.md** | غير موجود | إضافة ملف `AGENTS.md` في الجذر يوجّه الـ Agent: بنية المشروع، المسارات المهمة، اصطلاحات الكود، متى يستخدم المحركات (transaction, workflow, permissions). |
| **قواعد إضافية للـ AI** | اختياري | قواعد لـ `backend/src/services/*.ts` أو `backend/src/routes/api/api.rest.ts` (مثلاً: "لا تكرر منطق القيد والأرصدة؛ استخدم المحرك المالي"). |
| **مهام Backend في .vscode** | مهام Backend مذكورة في التوثيق فقط | إضافة `backend/.vscode/tasks.json` (أو مهام في جذر `.vscode`) لـ `pnpm run dev`, `db:push`, `db:seed` لراحة التشغيل من Cursor. |
| **توحيد npm vs pnpm في التوثيق** | في `.cursor/TOOLS_FROM_PROJECT.md` و`.vscode/README.md` يُذكر أحياناً `npm` | المشروع يستخدم **pnpm**؛ تحديث الوثائق إلى `pnpm start` و `pnpm run dev` حيث ينطبق. |
| **MCP angular-cli** | مضبوط في `frontend/.vscode/mcp.json` | يعمل عند فتح مجلد `frontend`؛ عند فتح الـ Workspace كاملاً التحقق من أن Cursor يقرأ MCP من مجلد الواجهة. |

### 3.2 على مستوى Cursor العام

- أدوات **ACE** تعمل على مستوى المجلد الأب؛ لا توجد إعدادات ACE داخل مشروع حساباتي — وهذا متوقع إن لم تُضف لاحقاً.
- لا يوجد شيء "متبقي" إلزامي على مستوى Cursor خارج المشروع.

---

## 4. ملخص تنفيذي

| الفئة | الموجود | المتبقي (اختياري أو موصى به) |
|-------|---------|-------------------------------|
| **قواعد Cursor** | قاعدتان (build output، drizzle migrations) | قاعدة موجهة للمحركات/المسارات الحرجة؛ AGENTS.md. |
| **أدوات المشروع** | توثيق TOOLS + .vscode + workspace + MCP angular-cli | مهام backend في .vscode؛ توحيد صياغة pnpm في الوثائق. |
| **ACE (مجلد الأب)** | أوامر وقواعد و MCP لـ ACE | لا متطلب إضافي للمشروع. |

---

تم إعداد هذا التقرير بناءً على فحص مجلدات `.cursor` و `.vscode` وملفات التوثيق في المشروع ومجلد الأب.
