# نتيجة اختبار صفحة العهد في المتصفح

## ✅ الصفحة تفتح بنجاح

**المسار:** `http://localhost:4200/biz/1/custody`

---

## 📊 ما تم مشاهدته:

### ✅ العناصر الموجودة:
- ✅ العنوان: "العهد" 🔒
- ✅ زر "إنشاء عهدة"
- ✅ تبويبات: دائمة / مؤقتة
- ✅ الملخصات:
  - إجمالي العهد: 0
  - عهد نشطة: 0
  - مسوّاة: 0
- ✅ الرسالة: "لا توجد عهد دائمة بعد"

### ❌ العنصر المفقود:
- ❌ قسم "حسابات العهد" (CUS-01, CUS-02) **لا يظهر!**

---

## 🔍 التحليل

### المشكلة:
الشرط في HTML لا يتحقق:
```html
@if (custodyAccounts().length > 0) {
  <!-- هذا القسم لا يظهر -->
}
```

### الأسباب المحتملة:

#### 1️⃣ الفلتر لا يعمل:
```typescript
const custodyAccs = (accountsData || []).filter((a: any) => 
  a.accountType === 'custody' || a.account_type === 'custody'
);
```

#### 2️⃣ الـ API لا ترجع account_type:
- قد تكون Drizzle تحول الأسماء بطريقة مختلفة
- أو هناك transformation layer

#### 3️⃣ الـ Response قد تكون wrapped:
```typescript
// قد يكون
{ accounts: [...], stations: [] }
// بدلاً من
[...]
```

---

## ✅ الحل المقترح

### إضافة console.log للتشخيص:

```typescript
async load() {
  this.loading.set(true);
  try {
    const [custodyRecordsData, accountsData] = await Promise.all([
      this.api.getCustodyRecords(this.bizId),
      this.api.getAccounts(this.bizId),
    ]);
    
    // تشخيص
    console.log('🔍 accountsData:', accountsData);
    console.log('🔍 نوع البيانات:', typeof accountsData);
    console.log('🔍 هل هو array؟', Array.isArray(accountsData));
    if (Array.isArray(accountsData) && accountsData.length > 0) {
      console.log('🔍 أول عنصر:', accountsData[0]);
      console.log('🔍 حقول أول عنصر:', Object.keys(accountsData[0]));
    }
    
    this.records.set(custodyRecordsData || []);
    const custodyAccs = (accountsData || []).filter((a: any) => 
      a.accountType === 'custody' || a.account_type === 'custody'
    );
    
    console.log('🔍 حسابات العهد بعد الفلتر:', custodyAccs);
    console.log('🔍 عدد حسابات العهد:', custodyAccs.length);
    
    this.custodyAccounts.set(custodyAccs);
  } catch (e) { 
    console.error('❌ خطأ:', e); 
  }
  this.loading.set(false);
}
```

---

## 🎯 الخطوات التالية

1. أضف console.log للتشخيص (كما أعلاه)
2. أعد تحميل الصفحة
3. افتح Console (F12)
4. أرسل لي ما يطبعه console.log

هذا سيساعدني أعرف بالضبط ما المشكلة!
