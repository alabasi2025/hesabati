# تحليل المشاكل المكتشفة

## المشاكل الرئيسية:

### 1. عدم وجود Sequences للترقيم الآلي
- الكود يستخدم `voucher_receipt_seq`, `voucher_payment_seq`, `voucher_transfer_seq`
- هذه الـ sequences غير موجودة في قاعدة البيانات
- **الحل:** إنشاء الـ sequences يدوياً

### 2. عدم وجود أنواع عمليات (operation_types) في البيانات الأولية
- الـ seed لا يُنشئ أنواع عمليات
- الاختبار يتوقع وجود أنواع عمليات مسبقة (مثل ID=1 و ID=26)
- **الحل:** إضافة أنواع عمليات في الـ seed

### 3. عدم وجود شاشات مخصصة (screen_templates) في البيانات الأولية
- الـ seed لا يُنشئ شاشات مخصصة
- **الحل:** إضافة شاشات مخصصة في الـ seed

### 4. عدم وجود UNIQUE constraint على account_balances (account_id, currency_id)
- الكود يستخدم ON CONFLICT (account_id, currency_id) DO UPDATE
- لكن لا يوجد unique constraint
- **الحل:** إضافة unique constraint

### 5. نفس المشكلة في fund_balances (fund_id, currency_id)
