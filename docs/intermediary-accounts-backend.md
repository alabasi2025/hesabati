# صفحة الحسابات الوسيطة - الربط بالـ Backend

## ✅ الصفحة مرتبطة بالـ Backend

---

## 🔗 الربط الحالي

### Frontend يستخدم:
```typescript
const allAccounts = await this.api.getAccounts(this.bizId);
const intermediaryAccounts = allAccounts.filter((a: any) => 
  a.accountType === 'intermediary'
);
```

### الـ API:
```typescript
// ApiService
getAccounts(bizId: number) {
  return this.request<any[]>(`/businesses/${bizId}/accounts`);
}
```

### Backend Endpoint:
```
GET /api/businesses/:bizId/accounts
→ يرجع جميع الحسابات (fund, bank, warehouse, intermediary, إلخ)
→ Frontend يفلتر على accountType === 'intermediary'
```

---

## ✅ هذا يعمل، لكن...

### المشكلة:
- يحمّل **جميع** الحسابات (159 حساب)
- ثم يفلتر على الوسيطة (3 حسابات فقط)
- **غير فعّال** 📉

### الحل الأفضل:
إضافة endpoint مخصص للحسابات الوسيطة:

```
GET /api/businesses/:bizId/intermediary-accounts
→ يرجع الحسابات الوسيطة فقط (3 حسابات)
```

---

## 💡 التحسين المقترح

### 1. إضافة Endpoint مخصص في Backend:

```typescript
// backend/src/routes/api/accounts.routes.ts
accountsRoutes.get('/businesses/:bizId/intermediary-accounts', 
  bizAuthMiddleware(), 
  safeHandler('جلب الحسابات الوسيطة', async (c) => {
    const bizId = getBizId(c);
    const rows = await db
      .select()
      .from(accounts)
      .innerJoin(accountSubNatures, 
        eq(accounts.accountSubNatureId, accountSubNatures.id)
      )
      .where(and(
        eq(accounts.businessId, bizId),
        eq(accountSubNatures.natureKey, 'intermediary'),
        eq(accounts.isLeafAccount, true)
      ))
      .orderBy(accounts.code);
    return c.json(rows);
  })
);
```

### 2. تحديث Frontend:

```typescript
// frontend/src/app/services/api.service.ts
getIntermediaryAccounts(bizId: number) {
  return this.request<any[]>(`/businesses/${bizId}/intermediary-accounts`);
}

// frontend/src/app/pages/intermediary-accounts/intermediary-accounts.ts
const intermediaryAccounts = await this.api.getIntermediaryAccounts(this.bizId);
```

---

## 🎯 الوضع الحالي

### ✅ **يعمل:**
- الصفحة تعمل بشكل صحيح
- تعرض الحسابات الوسيطة الثلاثة
- مرتبطة بالـ backend عبر GET /accounts

### ⚠️ **يمكن تحسينه:**
- إضافة endpoint مخصص لتحسين الأداء
- تجنب تحميل جميع الـ 159 حساب

---

## ✅ الخلاصة

**الصفحة مرتبطة بالـ backend حالياً** ✅

- تستخدم `GET /businesses/:bizId/accounts`
- تفلتر Frontend على `accountType === 'intermediary'`
- **تعمل بشكل صحيح** لكن يمكن تحسينها

**هل تريد أن أضيف endpoint مخصص لتحسين الأداء؟**

---

**الحالة الحالية:** ✅ يعمل (لكن يمكن تحسينه)
