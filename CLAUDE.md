# CLAUDE.md — دليل Claude Code لمشروع حساباتي

## سياق سريع
نظام إدارة مالية عربي شامل. Monorepo: باك إند (Hono + Drizzle + PostgreSQL) + واجهة أمامية (Angular 21).

## أوامر التشغيل والاختبار
```bash
pnpm -C backend run dev           # تشغيل الباك إند (port 3000)
pnpm -C frontend run start        # تشغيل الواجهة (port 4200)
pnpm -C backend run db:push       # دفع المخطط
pnpm -C backend run db:seed       # تهيئة البيانات
pnpm -C backend run db:fresh      # حذف + إنشاء + تهيئة
pnpm -C backend run test          # اختبارات Vitest
pnpm -C frontend run e2e          # اختبارات Playwright
```

## بنية الملفات المهمة
```
backend/src/
├── index.ts                      # نقطة الدخول (Hono server + WebSocket)
├── db/
│   ├── connection.ts             # اتصال PostgreSQL
│   ├── seed.ts                   # بيانات أولية
│   └── schema/
│       ├── index.ts              # re-export لجميع الجداول
│       ├── schema-base.ts        # Enums
│       ├── schema-users.ts       # Users, Currencies, Roles
│       ├── schema-business.ts    # Businesses, Partners, Employees, Accounts
│       ├── schema-finance.ts     # Suppliers, Vouchers, Funds, Banks
│       ├── schema-warehouse.ts   # OperationTypes, JournalEntries, Sidebar
│       └── schema-lookups.ts     # Custody, Budget, Settlements
├── routes/api/
│   ├── index.ts                  # تسجيل جميع المسارات (~50 ملف route)
│   └── _shared/                  # مساعدات (getBizId, ownership)
├── middleware/                    # auth, bizAuth, permissions, validation
├── services/                     # منطق التطبيق
├── engines/                      # محرك المعاملات المحاسبية
└── domain/                       # قواعد ملكية وتحقق

frontend/src/app/
├── pages/                        # صفحات التطبيق (~40 صفحة)
├── shared/
│   ├── components/               # مكونات مشتركة
│   └── page-imports.ts           # استيرادات موحدة للصفحات
├── services/                     # خدمات (API, Auth, Business, Toast, WebSocket)
└── app.config.ts                 # إعدادات Angular
```

## أخطاء معروفة يجب الانتباه لها
- `schema-warehouse.ts` يجب أن يستورد `currencies` من `schema-users.ts`
- هناك circular dependency بين schema-finance و schema-warehouse (عبر operationTypes/warehouses)
- المسارات تتبع نمط `/api/businesses/:bizId/<resource>` وليس `/api/<resource>?businessId=`

## نمط الكتابة
- أسماء المتغيرات والدوال بالإنجليزية، النصوص المعروضة بالعربية
- Angular: standalone components + signals (لا NgModules)
- المبالغ المالية: `decimal(precision, scale)` وليس float
- كل endpoint يتحقق من bizId ownership عبر bizAuthMiddleware
- التحقق من المدخلات: `validateBody(zodSchema, body)`

## قاعدة البيانات
- PostgreSQL 18 على localhost:5432
- اسم القاعدة: hesabati | المستخدم: postgres | كلمة المرور: 774424555
- تسجيل الدخول: admin / admin123
- العملات: YER(1), SAR(2), USD(3)
