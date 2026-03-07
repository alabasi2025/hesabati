# الأدوات المساعدة في Cursor (الموروثة من VS Code)

Cursor مبني على **VS Code** (فورك من Code OSS)، لذلك كل أدوات المحرر المساعدة التي تعرفها من VS Code موجودة في Cursor كما هي.

---

## 1. أدوات VS Code الموروثة في Cursor

هذه الأدوات من **ستوديو كود** وتعمل داخل Cursor دون تغيير:

| الفئة | الأدوات | الوصف |
|-------|---------|--------|
| **المحرر** | IntelliSense، الاكتمال التلقائي، التظليل، التنقل (Go to Definition، Find References) | فهم الكود والاقتراحات والانتقال بين الملفات. |
| **التصحيح (Debug)** | نقاط التوقف، التنفيذ خطوة بخطوة، Watch، Call Stack، وحدة تشغيل التصحيح (Launch) | تشغيل وتصحيح التطبيق من داخل المحرر. |
| **المهام (Tasks)** | تشغيل أوامر (بناء، اختبار، سكربتات)، Run Task، أتمتة | تنفيذ `npm start` أو `pnpm run dev` من لوحة المهام. |
| **الطرفية (Terminal)** | طرفية مدمجة، عدة طرفيات، تكامل مع Shell | تشغيل الأوامر داخل Cursor. |
| **الامتدادات (Extensions)** | سوق الامتدادات نفسه (VS Code Marketplace) | ESLint، Prettier، Angular، GitLens، إلخ — تعمل كما في VS Code. |
| **الإعدادات والمفاتيح** | `settings.json`، `keybindings.json`، إعدادات على مستوى المستخدم أو المشروع | تنسيق عند الحفظ، اختصارات، إعدادات الامتدادات. |
| **Git** | الحالة، الفروقات، الـ commit، الفروع | مدمج في الشريط الجانبي. |
| **البحث والاستبدال** | بحث في الملفات، بحث بـ regex، استبدال في مجلد كامل | Ctrl+Shift+F. |
| **المناطق (Snippets)** | Snippets مدمجة ومخصصة | اكتمال قوالب الكود. |
| **Refactoring** | إعادة تسمية، استخراج دالة/متغير، إلخ | من قائمة السياق أو Command Palette. |

كل ما سبق **موجود في Cursor** لأنه جزء من نواة VS Code؛ Cursor أضاف فوقها طبقة الـ AI (Composer، Agent، Tab، Rules، إلخ) دون إزالة أدوات VS Code.

---

## 2. ما هو مضبوط في مشروع حساباتي (من أدوات VS Code)

| الأداة | أين | الحالة |
|--------|-----|--------|
| **الامتدادات الموصى بها** | `.vscode/extensions.json` و `frontend/.vscode/extensions.json` | Angular، ESLint، Prettier، Tailwind، TypeScript، Live Server، Playwright، Cypress، Error Lens، Path IntelliSense، REST Client، Database Client، GitLens، Todo Tree، تهجئة عربية/إنجليزية، EditorConfig، Git Graph، Todo Highlight. |
| **الإعدادات** | `.vscode/settings.json` | Format on Save + Prettier، Simple Browser، Todo Tree، تهجئة (en, ar)، REST Client، قواعد استثناء لـ split-or-die و dblinter و fileLengthLint. |
| **المهام** | `.vscode/tasks.json`، `frontend/.vscode/tasks.json` | مهمة فتح المتصفح البسيط (4200)، ومهمتا `npm: start` و `npm: test` في الواجهة. |
| **التصحيح (Launch)** | `frontend/.vscode/launch.json` | تشغيل "ng serve" مع Chrome، وتشغيل "ng test" مع Chrome. |

كل هذا يعمل في Cursor كما يعمل في VS Code لأن Cursor يقرأ نفس ملفات `.vscode`.

---

## 3. ما كان متبقياً — تم إنجازه

تم إعداد كل الأدوات المتبقية:

| البند | الحالة |
|-------|--------|
| **مهام الـ Backend** | تمت إضافتها في `.vscode/tasks.json`: **Backend: pnpm run dev**, **db:push**, **db:seed**, **db:generate**. وفي `backend/.vscode/tasks.json` للمستخدمين الذين يفتحون مجلد backend فقط. |
| **تشغيل التصحيح للـ Backend** | تم إضافة `backend/.vscode/launch.json`: **Backend: تشغيل API (tsx)** لتشغيل الـ API مع إمكانية وضع نقاط توقف. |
| **Workspace موحّد** | ملف `hesabati.code-workspace` موجود؛ يُفضّل فتح المشروع عبره. |
| **توحيد pnpm في المهام** | تمت إضافة مهام **pnpm: start** و **pnpm: test** في `frontend/.vscode/tasks.json` وتحديث `launch.json` لاستخدامها عند تشغيل التصحيح (ng serve، ng test). |
| **امتدادات موصى بها** | القائمة في `extensions.json`؛ لتثبيت الكل: **Ctrl+Shift+P** → **Extensions: Show Recommended Extensions** → **Install Workspace Recommended Extensions**. راجع `.vscode/README.md`. |

---

## 4. خلاصة

- **الأدوات المساعدة في Cursor التي من ستوديو كود:** كل ما في الجدول الأول (محرر، تصحيح، مهام، طرفية، امتدادات، إعدادات، Git، بحث، إلخ) — كلها موجودة وتعمل في Cursor.
- **في المشروع:** مضبوط امتدادات موصى بها، إعدادات، مهام واجهة وbackend (pnpm)، وتصحيح واجهة وbackend.
- **ما كان متبقياً:** تم تنفيذه (مهام backend، launch backend، pnpm في المهام، توثيق تثبيت الامتدادات). بقي فقط تثبيت الامتدادات من واجهة Cursor إن لم تكن مثبتة.
