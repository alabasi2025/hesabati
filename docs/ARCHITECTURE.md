# معمارية نظام حساباتي — نظرة مهندس معماريات برمجية (Lead Software Architect)

**الإصدار:** 1.0  
**التاريخ:** 2026-03-07  
**النطاق:** نظام محاسبة وإدارة مالية متعدد الأعمال (Multi-tenant)

---

## 1. نظرة عامة على النظام

| البند | الوصف |
|--------|--------|
| **النوع** | تطبيق ويب SPA (Single Page Application) مع API خلفي |
| **النمط** | Multi-tenant (أعمال متعددة، مستخدمون وأدوار وصلاحيات لكل عمل) |
| **الواجهة** | Angular 21، Lazy-loaded routes، RTL وعربي |
| **الخلفية** | Hono على Node، REST + WebSocket، Drizzle ORM، PostgreSQL |

---

## 2. الطبقات والمسؤوليات

```
┌─────────────────────────────────────────────────────────────────┐
│  Presentation (Angular)                                         │
│  • صفحات: dashboard, accounts, vouchers, journal, reports, ...   │
│  • خدمات: auth, api, business, websocket, theme, toast          │
│  • حراس: authGuard, loginGuard                                  │
└───────────────────────────┬─────────────────────────────────────┘
                             │ HTTP/WS (proxy /api, /ws → :3000)
┌───────────────────────────▼─────────────────────────────────────┐
│  API Gateway / Middleware (Hono)                                 │
│  • CORS، Rate limit، XSS sanitization، Security headers         │
│  • authMiddleware، adminMiddleware، bizAuth (حسب العمل)          │
└───────────────────────────┬─────────────────────────────────────┘
                             │
┌───────────────────────────▼─────────────────────────────────────┐
│  Application (Routes + Services)                                  │
│  • auth, dashboard, api/*, enhancements, maintenance            │
│  • transaction, reporting, inventory, currency, workflow, UI     │
└───────────────────────────┬─────────────────────────────────────┘
                             │
┌───────────────────────────▼─────────────────────────────────────┐
│  Data (Drizzle ORM + PostgreSQL)                                 │
│  • schema: users, businesses, accounts, vouchers, funds, ...      │
│  • migrations: drizzle-kit                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. المكونات الرئيسية

### 3.1 Backend (Node + Hono)

| المسار | الغرض |
|--------|--------|
| `src/index.ts` | نقطة الدخول، CORS، rate limit، XSS، routes، health، SPA static، graceful shutdown |
| `src/routes/` | auth، dashboard، api (businesses, stations, employees, funds, rest)، enhancements، maintenance |
| `src/middleware/` | auth، admin، bizAuth، rateLimit، validation (XSS)، permissions، sequencing |
| `src/services/` | websocket، workflow، reporting، transaction، ui-builder، currency، inventory |
| `src/db/` | schema (core)، index، seed، migrations، سكربتات صيانة |

**الأمان:** قائمة بيضاء CORS، rate limit (login/register/API)، رؤوس أمان، إغلاق آمن، فصل مسارات الصيانة (admin فقط).

### 3.2 Frontend (Angular)

| المسار | الغرض |
|--------|--------|
| `src/app/app.routes.ts` | توجيه عام: login، register، businesses، biz/:bizId (أطفال: dashboard، accounts، vouchers، ...) |
| `src/app/pages/` | صفحات lazy-loaded (حوالي 35+ صفحة) |
| `src/app/services/` | auth، api، business، websocket، theme، toast |
| `src/app/guards/` | authGuard، loginGuard |
| `src/app/components/` | sidebar، header، toast، confirm-modal، breadcrumbs، three-* (Charts/WebGL) |

**التقنيات:** Tailwind، Chart.js، GSAP، Three.js (بصري)، ng2-charts، angular-gridster2.

### 3.3 نموذج البيانات (Domain)

- **هوية:** users، roles، role_permissions، user_roles (RBAC لكل عمل).
- **أعمال:** businesses، stations، employees، funds.
- **مالية:** accounts، currencies، exchange_rates، vouchers، voucher_lines، journal، operation_types، collections، billing_systems.
- **مستودع:** warehouses، inventory، movements.
- **إضافي:** sidebar، custom_screens، expense_categories، expense_budget، salaries، إلخ.

---

## 4. التكامل والاتصال

- **REST:** الواجهة تستدعي `/api/*` عبر proxy إلى `http://localhost:3000`.
- **WebSocket:** خدمة `wsService` في الخلفية والأمامية على `/ws` للتحديثات الفورية.
- **الإنتاج:** الخلفية يقدم الملفات الثابتة من `backend/public` (بناء Angular مُنسخ إلى public).

---

## 5. نقاط القوة المعمارية

1. **فصل واضح:** طبقة عرض، طبقة API، طبقة بيانات مع middleware موحّد.
2. **أمان:** CORS، rate limiting، XSS، رؤوس أمان، RBAC وbizAuth.
3. **قابلية التوسع:** Lazy loading في الواجهة، routes مجزأة في الخلفية.
4. **Multi-tenant:** ربط المستخدمين بالأعمال والأدوار والصلاحيات بشكل صريح في الـ schema والـ middleware.

---

## 6. توصيات مهندس المعمارية

| # | التوصية | الأولوية |
|---|----------|----------|
| 1 | توثيق واجهة API (OpenAPI/Swagger) من Hono لاستهلاك الواجهة والشركاء | عالية |
| 2 | إضافة طبقة تطبيق (Use Cases) بين الـ routes والـ services لتبسيط الاختبارات وإعادة الاستخدام | متوسطة |
| 3 | توحيد معالجة الأخطاء والرسائل (كود أخطاء، ترجمة) بين الواجهة والخلفية | عالية |
| 4 | مراجعة حدود الـ rate limit وحصص الاستخدام حسب بيئة التشغيل | متوسطة |
| 5 | سياسة نسخ احتياطي وقائمة تحقق استعادة من كوارث لقاعدة PostgreSQL | عالية |
| 6 | وضع خطة تفتيش أمني دوري (اعتماديات، حقن، صلاحيات) | عالية |

---

## 7. الملخص التنفيذي

نظام **حساباتي** مبني على معمارية ويب حديثة: واجهة Angular مع توجيه lazy-loaded، وAPI موحّد بخلفية Hono وطبقة أمان ووسطاء واضحين، وقاعدة بيانات موحّدة عبر Drizzle مع نموذج بيانات غني يدعم أعمال متعددة وصلاحيات وأدوار. المعمارية مناسبة للتطوير المستمر والنشر؛ التركيز المقترح على توثيق API، توحيد الأخطاء، والنسخ الاحتياطي والأمان.
