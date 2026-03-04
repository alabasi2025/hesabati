# الأدوات المساعدة للمشروع (حساباتي)

تم إضافة وتثبيت الإضافات التالية في `.vscode/extensions.json` وإعداداتها في `.vscode/settings.json`.

## الإضافات المثبتة

| الإضافة | الوظيفة |
|---------|----------|
| **Angular Language Service** (`angular.ng-template`) | دعم Angular في المحرر (قوالب، توجيهات، بناء جملة). |
| **ESLint** (`dbaeumer.vscode-eslint`) | فحص وتصحيح أخطاء JavaScript/TypeScript. |
| **Prettier** (`esbenp.prettier-vscode`) | تنسيق تلقائي للكود. |
| **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) | استكمال كلاسات Tailwind وتلميحات. |
| **TypeScript** (`ms-vscode.vscode-typescript-next`) | دعم TypeScript محدّث. |
| **Live Preview** (`ms-vscode.live-server`) | معاينة الصفحات داخل المحرر مع تحديث مباشر. |
| **Playwright Test for VS Code** (`ms-playwright.playwright`) | تشغيل اختبارات E2E وعرض المتصفح أثناء التشغيل، تسجيل الاختبارات، وتصحيحها. |
| **Cypress** (`cypress-io.cypress`) | فتح Cypress Test Runner وتشغيل اختبارات E2E من المحرر. |
| **Error Lens** (`usernamehw.errorlens`) | عرض الأخطاء والتحذيرات على نفس السطر. |
| **Path Intellisense** (`christian-kohler.path-intellisense`) | إكمال مسارات الملفات. |
| **Auto Rename Tag** (`formulahendry.auto-rename-tag`) | إعادة تسمية زوج الوسم في HTML. |
| **Auto Close Tag** (`formulahendry.auto-close-tag`) | إغلاق تلقائي للوسوم. |
| **REST Client** (`humao.rest-client`) | تنفيذ طلبات HTTP من ملفات `.http`. |
| **Database Client** (`cweijan.vscode-database-client2`) | الاتصال بقواعد البيانات (PostgreSQL وغيرها). |
| **GitLens** (`eamodio.gitlens`) | عرض تاريخ Git وتفاصيل الالتزامات. |
| **Todo Tree** (`gruntfuggly.todo-tree`) | شجرة لعرض TODO/FIXME في المشروع. |
| **Code Spell Checker** (`streetsidesoftware.code-spell-checker`) | تدقيق إملائي. |
| **Arabic Spell Checker** (`streetsidesoftware.code-spell-checker-arabic`) | تدقيق إملائي للعربية. |
| **EditorConfig** (`editorconfig.editorconfig`) | توحيد الإعدادات بين المحررات. |
| **Git Graph** (`mhutchie.git-graph`) | رسم بياني لفروع Git. |
| **TODO Highlight** (`wayou.vscode-todo-highlight`) | تمييز TODO/FIXME في الكود. |

## ملفات الإعدادات المضافة

- **`.vscode/settings.json`** — إعدادات المحرر (تنسيق عند الحفظ، Prettier، Todo، التدقيق الإملائي، REST Client).
- **`.vscode/tasks.json`** — مهمة "Open Simple Browser: حساباتي" لفتح التطبيق في المتصفح الداخلي.
- **`.editorconfig`** — قواعد للملفات (ترميز، مسافات، نهاية أسطر).
- **`docs/api-examples.http`** — أمثلة لاستدعاءات API لاستخدامها مع REST Client.

## استخدام سريع

1. **معاينة التطبيق داخل Cursor:** Ctrl+Shift+P → **Simple Browser: Show** → أدخل `http://localhost:4200` (بعد تشغيل `npm start` من مجلد frontend).
2. **اختبار API:** افتح `docs/api-examples.http` واضغط "Send Request" فوق أي طلب (بعد تشغيل الـ backend).
3. **قاعدة البيانات:** من الشريط الجانبي افتح "Database" واتصل بـ PostgreSQL باستخدام بيانات `.env`.
4. **التنسيق التلقائي:** التنسيق عند الحفظ مفعّل؛ الافتراضي هو Prettier.
5. **اختبار عبر المتصفح:** إضافة **Playwright Test for VS Code** — من الشريط الجانبي افتح "Testing" أو شغّل اختبارات Playwright؛ يمكن تفعيل "Show browser" لمشاهدة التنفيذ. لإعداد المشروع: `npm i -D @playwright/test` ثم `npx playwright install` (تحتاج اتصال شبكة لتحميل المتصفحات).
