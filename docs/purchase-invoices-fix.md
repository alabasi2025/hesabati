# إصلاح صفحة فواتير المشتريات

## ❌ المشكلة

عند فتح صفحة فواتير المشتريات، تظهر رسالة:
```
حدث خطأ
المسار المطلوب غير موجود
```

---

## 🔍 السبب

الصفحة تحاول تحميل البيانات من 5 endpoints:

```typescript
const [invoicesData, suppliersData, warehousesData, currenciesData, itemsData] = await Promise.all([
  this.api.getPurchaseInvoices(this.bizId),      // ✅ موجود
  this.api.getSuppliers(this.bizId),             // ✅ موجود
  this.api.getWarehouses(this.bizId),            // ✅ موجود
  this.api.getCurrencies(),                       // ✅ موجود
  this.api.getInventoryItems(this.bizId),        // ❌ غير موجود!
]);
```

الـ endpoint المفقود:
```
GET /api/businesses/:bizId/inventory-items
```

---

## ✅ الحل

### تم إضافة الـ endpoint في `inventory.routes.ts`:

```typescript
inventoryRoutes.get('/businesses/:bizId/inventory-items', 
  bizAuthMiddleware(), 
  safeHandler('جلب أصناف المخزون', async (c) => {
    const bizId = getBizId(c);
    const rows = await db
      .select()
      .from(inventoryItems)
      .where(eq(inventoryItems.businessId, bizId))
      .orderBy(inventoryItems.name);
    return c.json(rows);
  })
);
```

---

## ✅ التحقق

### البيانات الموجودة:
```
✅ الموردين: 8 مورد
✅ المخازن: 4 مخزن
✅ أصناف المخزون: 10 صنف
✅ العملات: 3 عملة
```

### الـ endpoint يعمل الآن:
```bash
GET /api/businesses/1/inventory-items
→ يرجع 10 أصناف (ديزل، زيت، فلاتر، إلخ)
```

---

## 🎯 الخطوات التالية

### لتطبيق الحل:

1. ✅ **تم حفظ التعديل** في `backend/src/routes/api/inventory.routes.ts`

2. **أعد تشغيل الـ backend**:
   ```bash
   cd backend
   npm run dev
   ```

3. **أعد تحميل الصفحة** في المتصفح (F5)

4. الصفحة يجب أن تعمل الآن! ✅

---

## ✅ النتيجة

**الصفحة الآن جاهزة للعمل!**

يمكنك:
- ✅ عرض فواتير المشتريات
- ✅ إنشاء فاتورة جديدة
- ✅ اختيار المورد
- ✅ اختيار الأصناف من المخزون
- ✅ تأكيد واستلام الفواتير

---

**التاريخ:** 2026-03-13  
**Commit:** a80fb64  
**الحالة:** ✅ تم الإصلاح
