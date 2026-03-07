# إكمال إعداد قاعدة البيانات «حساباتي»

تم ضبط المشروع لاستخدام كلمة مرور **إلزامية** لقاعدة البيانات:
- **اسم قاعدة البيانات:** `hesabati`
- **كلمة مرور المستخدم postgres:** `774424555` (إلزامية في كل الإعدادات)
- **المستخدم:** `postgres`

## الخيار 1: استخدام Docker (مُفضّل)

1. شغّل **Docker Desktop**.
2. من مجلد المشروع نفّذ:
   ```powershell
   docker compose up -d postgres
   ```
3. انتظر حتى يصبح الحاوية جاهزة (حوالي 10 ثوانٍ)، ثم نفّذ:
   ```powershell
   cd backend
   pnpm run db:migrate
   pnpm run db:seed
   ```

## الخيار 2: PostgreSQL محلي

إذا كان لديك PostgreSQL مثبّتاً محلياً:

1. في **pgAdmin** أو **psql** اتصل بالمستخدم `postgres` (بكلمة المرور الحالية).
2. نفّذ:
   ```sql
   ALTER USER postgres PASSWORD '774424555';
   CREATE DATABASE hesabati;
   ```
3. من مجلد المشروع:
   ```powershell
   cd backend
   pnpm run db:migrate
   pnpm run db:seed
   ```

## بعد تنفيذ الجداول والـ seed

- **واجهة النظام:** http://localhost:3000 (أو http://localhost:4200 إذا شغّلت الفرونتند بـ `pnpm -C frontend run start`)
- **تسجيل الدخول الافتراضي:**
  - اسم المستخدم: `admin`
  - كلمة المرور: `admin123`

الباكند يعمل حالياً في الخلفية على المنفذ **3000**.
