# تحليل ظهور الشاشات المخصصة

## المسار في الواجهة الأمامية
- صفحة الشاشات المخصصة: `/biz/:bizId/custom-screens`
- عند إنشاء شاشة جديدة عبر الـ wizard، يتم إرسال `addToSidebar: true` مع الطلب

## المشكلة المكتشفة
في كود الباك إند (سطر 1748-1780)، عند إنشاء الشاشة:
1. يتم إنشاء الشاشة في `screen_templates`
2. يتم إنشاء الويدجتس في `screen_widgets`
3. **لكن لا يتم التعامل مع `addToSidebar`!** - الكود يقوم بـ destructuring لـ `addToSidebar` لكن لا يستخدمها

## الحل المطلوب
عند `addToSidebar === true`، يجب استدعاء منطق إضافة الشاشة للسايدبار تلقائياً (مثل ما يفعل مسار `/businesses/:bizId/screens/:screenId/add-to-sidebar`)

## أين تظهر الشاشات حالياً
1. في صفحة `/biz/:bizId/custom-screens` كقائمة بطاقات
2. عند الضغط على بطاقة شاشة، تظهر تفاصيلها مع الويدجتس
3. **لا تظهر تلقائياً في السايدبار** بسبب المشكلة أعلاه

## ملاحظة إضافية
مسار add-to-sidebar يضيف route بصيغة `/screens/${screenId}` لكن لا يوجد مسار Angular لهذا!
المسار الصحيح يجب أن يكون `/biz/${bizId}/custom-screens?screen=${screenId}`
