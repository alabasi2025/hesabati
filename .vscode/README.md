# أدوات مساعدة (حساباتي)

## تقليل أخطاء Angular Language Service ("No config file")

عند فتح **مجلد المشروع كاملاً** قد تظهر رسائل مثل: `No config file for ... backend/...` أو `... e2e/...` لأن هذه الملفات ليست جزءاً من مشروع Angular.

**الحل الموصى به:** افتح المشروع عبر **ملف الـ Workspace** حتى يعمل Angular فقط داخل Frontend:
- **File → Open Workspace from File...** ثم اختر `hesabati.code-workspace` من جذر المشروع.
- سترى مجلدين: **Frontend (Angular)** و **Backend**. خدمة لغة Angular تعمل فقط داخل Frontend، فلا تظهر رسائل "No config file" لملفات الـ Backend أو e2e.

تم أيضاً تضمين `src/**/*.html` و `src/**/*.scss` في `frontend/tsconfig.app.json` لربط القوالب والأنماط بمشروع Angular.

## إضافات مُوصى بها (احترافية)

عند فتح المشروع، Cursor/VS Code قد يقترح تثبيت الإضافات التالية. يُفضّل قبولها لتجربة أفضل.
القائمة الكاملة في `.vscode/extensions.json`. عند فتح المشروع قد يطلب Cursor تثبيتها؛ أو: **Ctrl+Shift+X** → اكتب "Recommended" واختر **Install Workspace Recommended Extensions**.

**تثبيت كل الامتدادات الموصى بها دفعة واحدة:**
- **Ctrl+Shift+P** (أو Cmd+Shift+P) → اكتب **Extensions: Show Recommended Extensions** ثم اخترها.
- أو من الشريط الجانبي: أيقونة الامتدادات → من القائمة المنسدلة اختر **Recommended**.
- ثم اضغط **Install Workspace Recommended Extensions** لتثبيت كل ما في `.vscode/extensions.json` و `frontend/.vscode/extensions.json`.

| الإضافة | الفائدة |
|--------|---------|
| **Angular Language Service** | دعم قوالب وروابط Angular |
| **ESLint** | فحص جودة الكود |
| **Prettier** | تنسيق الكود عند الحفظ |
| **Tailwind CSS IntelliSense** | استكمال وتلميحات Tailwind |
| **TypeScript** | دعم TypeScript |
| **Playwright** | تشغيل اختبارات E2E |
| **Error Lens** | عرض الأخطاء على السطر |
| **Path Intellisense** | استكمال المسارات |
| **Auto Rename/Close Tag** | إعادة تسمية وإغلاق وسوم HTML |
| **REST Client** | تنفيذ طلبات API من الملفات |
| **Database Client** | الاتصال بـ PostgreSQL وتصفح الجداول |
| **GitLens** | تاريخ Git وسهولة المقارنة |
| **Git Graph** | رسم بياني للفروع والـ commits |
| **Todo Tree / Todo Highlight** | تمييز TODO و FIXME |
| **Code Spell Checker (+ Arabic)** | تدقيق إملائي عربي وإنجليزي |
| **EditorConfig** | توحيد الترميز والمسافات بين المحررين |
| **Docker** | إدارة الحاويات والصور |
| **Remote - Containers** | فتح المشروع داخل حاوية |
| **Import Cost** | عرض حجم الـ imports |
| **Better Comments** | تمييز التعليقات المهمة |
| **Color Highlight** | عرض الألوان في الكود |
| **HTML CSS Class Completion** | استكمال أسماء الـ classes |
| **Material Icon Theme** | أيقونات للملفات |
| **Code Runner** | تشغيل مقتطفات الكود سريعاً |

## فتح التطبيق داخل Cursor

1. شغّل الخادم: **Tasks: Run Task** → **pnpm: start** (أو **Backend: pnpm run dev** للـ API)، أو من الطرفية من مجلد `frontend`: `pnpm start`.
2. افتح المتصفح المدمج بأحد الطرق:

**ملاحظة — لماذا لا يُفتح المتصفح الداخلي من الطرفية أو الـ Agent؟**  
في Cursor هناك سلوك معروف (مُوثَّق في [منتدى Cursor](https://forum.cursor.com/t/using-agent-to-open-simple-browser-in-ide/129518)): طلبات مثل "افتح المتصفح" أو فتح روابط من الطرفية تفتح **المتصفح الافتراضي للنظام** وليس المتصفح الداخلي (Simple Browser). في VS Code نفس الطلب يفتح المتصفح داخل المحرر. **الطريقة الوحيدة الموثوقة** لفتح المتصفح الداخلي في Cursor: من داخل المحرر فقط — **Ctrl+Shift+P** → **Simple Browser: Show** أو **Tasks: Run Task** → **Open Simple Browser: …**. لا يوجد URI أو أمر CLI لتنفيذ ذلك من الطرفية.
   - **Live Preview:** من Command Palette (Ctrl+Shift+P) ابحث عن **Live Preview** واختر أمر فتح معاينة بخادم خارجي وأدخل: `http://localhost:4200`
   - **Simple Browser:** Ctrl+Shift+P → **Simple Browser: Show** → أدخل: `http://localhost:4200`
   - **مهمة جاهزة:** Ctrl+Shift+P → **Tasks: Run Task** → **Open Simple Browser: حساباتي**
   - **صفحة المشتريات في المتصفح الداخلي:** Ctrl+Shift+P → **Tasks: Run Task** → **Open Simple Browser: فواتير المشتريات**

## المهام (Tasks)

**من جذر المشروع (Ctrl+Shift+P → Tasks: Run Task):**
- **Open Simple Browser: حساباتي** — يفتح http://localhost:4200 في المتصفح البسيط.
- **Open Simple Browser: فواتير المشتريات** — يفتح صفحة فواتير المشتريات في المتصفح الداخلي (http://localhost:4200/biz/1/purchase-invoices).
- **Backend: pnpm run dev** — تشغيل خادم الـ API (منفذ 3000).
- **Backend: db:push** — دفع schema قاعدة البيانات.
- **Backend: db:seed** — تهيئة البيانات الأولية.
- **Backend: db:generate** — توليد ملفات هجرة Drizzle.

**من مجلد Frontend (أو عند فتح الـ Workspace):**
- **pnpm: start** — تشغيل خادم التطوير (الواجهة).
- **pnpm: test** — تشغيل الاختبارات.
- **npm: start** / **npm: test** — نفس المهام عبر npm إن لم يكن pnpm متاحاً.

## التصحيح (Debug / Launch)

**الواجهة (Frontend):** من لوحة Run and Debug اختر **ng serve** أو **ng test** (يعتمدان على المهمة `pnpm: start` و `pnpm: test`).

**الـ Backend:** افتح مجلد `backend` أو استخدم تشغيل التصحيح من جذر المشروع:
- **Backend: تشغيل API (tsx)** — يشغّل الـ API مرة واحدة مع إمكانية وضع نقاط توقف في الكود (من `backend/.vscode/launch.json`).

## الإعدادات

- `simpleBrowser.useIntegratedBrowser: true` — يفضّل فتح المتصفح البسيط داخل المحرر إن كان مدعوماً.
