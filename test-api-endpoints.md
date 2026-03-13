# اختبار API Endpoints لفواتير المشتريات

## الـ endpoints المطلوبة:

1. `GET /api/businesses/1/purchase-invoices` - جلب الفواتير
2. `GET /api/businesses/1/suppliers` - جلب الموردين
3. `GET /api/businesses/1/warehouses` - جلب المخازن
4. `GET /api/businesses/1/inventory-items` - جلب الأصناف
5. `GET /api/currencies` - جلب العملات

## للاختبار:

1. افتح المتصفح على: `http://localhost:3000/biz/1/purchase-invoices`
2. افتح Console (F12)
3. انظر للأخطاء

## الأخطاء الشائعة:

- `404 Not Found` - الـ route غير موجود في backend
- `401 Unauthorized` - مشكلة في التوثيق
- `500 Internal Server Error` - خطأ في الـ backend

أرسل لي رسالة الخطأ من Console.
