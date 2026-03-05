# TDAD – هيكل التبعيات والبروتوكول

## التقنيات والكود (مصدر الحقيقة)

التقنيات والمحركات وقاعدة البيانات ومسارات الـ API والواجهة **كما في الكود** موثقة في **[TECH_STACK_AND_CODE_REFERENCE.md](./TECH_STACK_AND_CODE_REFERENCE.md)**. يُحدَّث عند تغيير الـ stack أو المسارات أو الخدمات أو الجداول.

---

## التحديث أولاً بأول

عند التطوير، حدّث هيكل الـ workflow مع كل ميزة جديدة أو تغيير سلوك:

1. **اقرأ آلية التحديث**: [PROTOCOL_UPDATE.md](./PROTOCOL_UPDATE.md)
2. **عدّل الملف المناسب**: أضف أو حدّث عقدة في `.tdad/workflows/backend/...` أو `frontend/...` حسب نوع التغيير.
3. **تحقق من الصحة**: شغّل سكريبت التحقق بعد التعديل.

## تشغيل التحقق

من جذر المشروع:

```bash
node .tdad/scripts/validate-workflows.mjs
```

يتحقق السكريبت من:
- صحة JSON في كل ملف `*.workflow.json`
- وجود الحقول الإلزامية (id, workflowId, title, description, nodeType, position, dependencies)
- أن العقد من نوع `folder` تحتوي على `folderPath`
- أن العقد من نوع `feature` تحتوي على `fileName`
- أن الحواف (edges) تشير إلى عقد موجودة في نفس الملف
- عدم تكرار `id` داخل الملف نفسه

## الهيكل

- `workflows/root.workflow.json` — الجذر (مجلدات backend و frontend).
- `workflows/backend/` — مجلدات المجالات (auth, vouchers, …) وكل مجلد يحتوي على عقد الميزات.
- `workflows/frontend/` — نفس المنطق لواجهة المستخدم.

العقد = سلوك قابل للاختبار (BDD / Playwright / API). لا تضف عقداً للإعداد أو التثبيت فقط.
