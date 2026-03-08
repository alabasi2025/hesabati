# أدوات مساعدة (حساباتي)

## تقليل أخطاء Angular Language Service ("No config file")

عند فتح **مجلد المشروع كاملاً** قد تظهر رسائل مثل: `No config file for ... backend/...` أو `... e2e/...` لأن هذه الملفات ليست جزءاً من مشروع Angular.

**الحل الموصى به:** افتح المشروع عبر **ملف الـ Workspace** حتى يعمل Angular فقط داخل Frontend:
- **File → Open Workspace from File...** ثم اختر `hesabati.code-workspace` من جذر المشروع.
- سترى مجلدين: **Frontend (Angular)** و **Backend**. خدمة لغة Angular تعمل فقط داخل Frontend، فلا تظهر رسائل "No config file" لملفات الـ Backend أو e2e.

تم أيضاً تضمين `src/**/*.html` و `src/**/*.scss` في `frontend/tsconfig.app.json` لربط القوالب والأنماط بمشروع Angular.

## إضافات مُوصى بها (احترافية)

القائمة الكاملة في `.vscode/extensions.json`. عند فتح المشروع قد يطلب Cursor تثبيتها؛ أو: **Ctrl+Shift+X** → اكتب "Recommended" واختر **Install Workspace Recommended Extensions**.

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

1. شغّل الخادم: من مجلد `frontend` نفّذ `npm start` وانتظر حتى ينجح البناء.
2. افتح المتصفح المدمج بأحد الطرق:
   - **Live Preview:** من Command Palette (Ctrl+Shift+P) ابحث عن **Live Preview** واختر أمر فتح معاينة بخادم خارجي وأدخل: `http://localhost:4200`
   - **Simple Browser:** Ctrl+Shift+P → **Simple Browser: Show** → أدخل: `http://localhost:4200`
   - **مهمة جاهزة:** Ctrl+Shift+P → **Tasks: Run Task** → **Open Simple Browser: حساباتي**

## المهام (Tasks)

- **Open Simple Browser: حساباتي** — يفتح http://localhost:4200 في المتصفح البسيط.
- من مجلد `frontend`: **npm: start** — تشغيل خادم التطوير.

## الإعدادات

- `simpleBrowser.useIntegratedBrowser: true` — يفضّل فتح المتصفح البسيط داخل المحرر إن كان مدعوماً.
