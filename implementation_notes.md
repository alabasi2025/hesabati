# ملاحظات التحليل للتنفيذ الاحترافي

## البنية الحالية
- Backend: Hono + Drizzle ORM + PostgreSQL (2476 سطر في api.ts)
- Frontend: Angular + Material Design + TailwindCSS
- Schema: 844 سطر في core.ts

## ما هو موجود بالفعل في Schema:
1. currencies table (YER, SAR, USD) + exchangeRate ✓
2. attachments table ✓ (لكن بدون API upload)
3. screenPermissions table ✓ (لكن بدون RBAC حقيقي)
4. auditLog table ✓
5. vouchers.status يدعم 'cancelled' ✓

## المطلوب تنفيذه:

### 1. دعم العملات المتعددة
- جدول exchange_rates (أسعار صرف يومية)
- تحويل آلي عند إنشاء سند بعملة مختلفة
- عرض الأرصدة بعملات متعددة
- Backend: API لأسعار الصرف + تعديل voucher creation
- Frontend: اختيار العملة في نموذج السند

### 2. نظام الصلاحيات RBAC
- جدول roles + role_permissions
- ربط المستخدم بالأدوار
- سقوف مالية لكل دور
- Middleware للتحقق من الصلاحيات
- Frontend: إدارة الأدوار والصلاحيات

### 3. المرفقات
- API upload/download
- ربط بالسندات
- عرض في الواجهة

### 4. عكس العمليات
- API void/reverse voucher
- إنشاء قيد عكسي
- تحديث الأرصدة
- Frontend: زر عكس في تفاصيل السند

### 5. التقارير والرسوم البيانية
- Widget chart data API (موجود جزئياً)
- تحسين بيانات الرسم البياني
- Frontend: تفعيل Chart.js في الويدجت
