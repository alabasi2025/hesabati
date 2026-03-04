# أدوات Cursor المستخرجة من النظام

تم استنتاج التالي من الكود والإعدادات الفعلية للمشروع (بدون الاعتماد على توثيق خارجي).

---

## 1. الامتدادات (Extensions)

| الامتداد | المصدر | الغرض |
|----------|--------|--------|
| **Angular Language Service** (`angular.ng-template`) | `frontend/.vscode/extensions.json` | قوالب Angular (`.html`)، TypeScript في الواجهة، الاقتراحات والأخطاء |
| **Prettier** | `frontend/package.json` + `frontend/.prettierrc` | تنسيق الكود (يدعم `parser: angular` لملفات HTML) |
| **EditorConfig** | `frontend/.editorconfig` | توحيد المسافات، الاقتباس، نهاية الملفات |

**ملاحظة:** في Cursor يمكن تثبيت الامتدادات من سوق VS Code؛ تأكد من تفعيل "Format on Save" واختيار Prettier للواجهة.

---

## 2. المهام (Tasks) والتشغيل

- **مصدر المهام:** `frontend/.vscode/tasks.json` فقط (لا يوجد `.vscode` في الـ backend).

| المهمة | المسار | الأمر الفعلي |
|--------|--------|--------------|
| تشغيل الواجهة | `frontend/` | `pnpm start` أو `ng serve` → http://localhost:4200 |
| تشغيل الباك اند | `backend/` | `npm run dev` (tsx watch) → http://localhost:3000 |
| الاختبارات (واجهة) | `frontend/` | `pnpm test` أو `ng test` |
| قاعدة البيانات | `backend/` | `npm run db:generate` / `db:migrate` / `db:push` / `db:seed` / `db:check` |

الواجهة تستخدم **proxy** (`frontend/proxy.conf.json`) لـ `/api` و `/health` إلى `http://localhost:3000`، لذلك يشغّل الباك اند على 3000 والواجهة على 4200.

---

## 3. التشغيل مع التصحيح (Debug / Launch)

- **مصدر الإعدادات:** `frontend/.vscode/launch.json`

| التكوين | المهمة السابقة | النتيجة |
|----------|----------------|---------|
| **ng serve** | `npm: start` | Chrome على http://localhost:4200 |
| **ng test** | `npm: test` | Chrome على http://localhost:9876/debug.html |

في Cursor: افتح المجلد الذي يحتوي على `frontend` (أو workspace يشملها) حتى تُحمَّل تكوينات التشغيل.

---

## 4. MCP (Model Context Protocol)

- **مصدر الإعدادات:** `frontend/.vscode/mcp.json`

| الخادم | الأمر | الغرض |
|--------|--------|--------|
| **angular-cli** | `npx -y @angular/cli mcp` | أدوات Angular عبر MCP (إن وُجدت في Cursor) |

في Cursor قد تكون خوادم MCP مضبوطة على مستوى المستخدم؛ إذا أردت نفس سلوك المشروع أضف خادم `angular-cli` بهذا الأمر في إعدادات MCP.

---

## 5. ما لا يوجد في النظام (لا يُعتبر ناقصاً من Cursor)

- **ESLint:** غير مستخدم في المشروع (لا `eslint.config.*` ولا `.eslintrc*`).
- **Jest / Vitest:** الاختبارات عبر `ng test` (Karma افتراضي مع Angular)، ولا توجد إعدادات Jest/Vitest في الجذر أو الواجهة.
- **امتداد قاعدة بيانات:** لا يوجد في الـ package.json؛ الاتصال بـ PostgreSQL عبر Drizzle و `drizzle.config.ts`. أي عمليات استعلام أو إدارة DB تتم من طرفك (عميل خارجي أو سكربتات `db:*`).

---

## 6. خلاصة سريعة لـ Cursor

1. تثبيت **Angular Language Service** و **Prettier** و **EditorConfig** (أو الاعتماد على المدمج إن وُجد).
2. فتح المشروع من جذر يحتوي على `frontend` و `backend` لاستخدام المهام والتشغيل من `frontend/.vscode`.
3. تشغيل الباك اند: من `backend/` → `npm run dev`.
4. تشغيل الواجهة: من `frontend/` → `pnpm start` (أو المهمة "npm: start").
5. إضافة MCP لـ **angular-cli** إن رغبت في دعم Angular عبر MCP في Cursor.
