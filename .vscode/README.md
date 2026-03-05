# أدوات مساعدة (حساباتي)

## تقليل أخطاء Angular Language Service ("No config file")

عند فتح **مجلد المشروع كاملاً** قد تظهر رسائل مثل: `No config file for ... backend/...` أو `... e2e/...` لأن هذه الملفات ليست جزءاً من مشروع Angular.

**الحل الموصى به:** افتح المشروع عبر **ملف الـ Workspace** حتى يعمل Angular فقط داخل Frontend:
- **File → Open Workspace from File...** ثم اختر `hesabati.code-workspace` من جذر المشروع.
- سترى مجلدين: **Frontend (Angular)** و **Backend**. خدمة لغة Angular تعمل فقط داخل Frontend، فلا تظهر رسائل "No config file" لملفات الـ Backend أو e2e.

تم أيضاً تضمين `src/**/*.html` و `src/**/*.scss` في `frontend/tsconfig.app.json` لربط القوالب والأنماط بمشروع Angular.

## إضافات مُوصى بها

عند فتح المشروع، Cursor/VS Code قد يقترح تثبيت الإضافات التالية. يُفضّل قبولها لتجربة أفضل:

| الإضافة | الفائدة |
|--------|---------|
| **Angular Language Service** (`angular.ng-template`) | دعم Angular في المحرر |
| **Live Preview** (`ms-vscode.live-server`) | فتح معاينة الصفحة **داخل المحرر** (متصفح مدمج) |
| **ESLint** (`dbaeumer.vscode-eslint`) | فحص جودة الكود |
| **Prettier** (`esbenp.prettier-vscode`) | تنسيق الكود تلقائياً |
| **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) | استكمال وتلميحات لـ Tailwind |

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
