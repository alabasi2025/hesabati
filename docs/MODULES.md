# تقسيم نظام "حساباتي" إلى وحدات (Modules)

## 1. نظرة عامة

| # | الوحدة | الجداول | الصفحات | المسارات (Frontend) | الحالة |
|---|--------|---------|---------|---------------------|--------|
| 1 | المستخدمون والصلاحيات | 8 | 4 | login, register, roles, sidebar-settings | ✅ |
| 2 | الأعمال والمحطات | 4 | 5 | businesses, biz/:bizId, dashboard, stations, partners, summary | ✅ |
| 3 | الحسابات والأرصدة | 9 | 5 | accounts, funds, banks, exchangers, wallets | ✅ |
| 4 | العمليات المالية | 9 | 3 | vouchers, journal, journal-categories | ✅ |
| 5 | القوالب والترقيم | 3 | 1 | operation-types | ✅ |
| 6 | المخزون والمخازن | 7 | 2 | warehouse, warehouse-operations | ✅ |
| 7 | الموردين | 2 | 1 | suppliers | ✅ |
| 8 | التحصيل والفوترة | 8 | 2 | collections, billing-systems | ✅ |
| 9 | التقارير | 1 | 2 | reports, reports-advanced | ✅ |
| 10 | بناء الواجهات | 9 | 2 | custom-screens, ui-builder | ✅ |
| 11 | العملات | 2 | 1 | exchange-rates | ✅ |
| 12 | المعلقات والتصفيات | 2 | 2 | pending, settlements | ✅ |
| 13 | الموظفين والرواتب | 2 | 2 | employees, salaries | ✅ |
| 14 | الميزانية والمصروفات | 2 | 2 | expense-categories, expense-budget | ✅ |

---

## 2. خريطة المسارات → الوحدة (Frontend)

| المسار (تحت `biz/:bizId`) | الوحدة |
|----------------------------|--------|
| `''` (الرئيسية) | 2 (لوحة التحكم) |
| `stations` | 2 |
| `employees` | 2 |
| `partners` | 2 |
| `summary` | 2 |
| `accounts` | 3 |
| `funds` | 3 |
| `banks` | 3 |
| `exchangers` | 3 |
| `wallets` | 3 |
| `vouchers`, `vouchers/receipt`, `vouchers/payment` | 4 |
| `journal` | 4 |
| `journal-categories` | 4 |
| `operation-types` | 5 |
| `warehouse` | 6 |
| `warehouse-operations` | 6 |
| `suppliers` | 7 |
| `collections` | 8 |
| `billing-systems` | 8 |
| `reports` | 9 |
| `reports-advanced` | 9 |
| `custom-screens` | 10 |
| `ui-builder` | 10 |
| `exchange-rates` | 11 |
| `pending` | 12 |
| `settlements` | 12 |
| `sidebar-settings` | 1 |
| `roles` | 1 |

**خارج `biz/:bizId`:** `login`, `register` → الوحدة 1 | `businesses` → الوحدة 2.

---

## 3. تفاصيل الوحدات

### الوحدة 1: المستخدمون والصلاحيات

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `users`, `roles`, `role_permissions`, `user_roles`, `sidebar_sections`, `sidebar_items`, `user_sidebar_config`, `screen_permissions` |
| **الصفحات** | `login`, `register`, `roles`, `sidebar-settings` |
| **مسارات الواجهة** | `/login`, `/register`, `/biz/:bizId/roles`, `/biz/:bizId/sidebar-settings` |
| **API (Backend)** | `POST/GET /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me`, `GET /users`, `GET/POST/PUT/DELETE /businesses/:bizId/roles`, `GET/POST/PUT/DELETE /businesses/:bizId/user-roles`, `GET/POST/PUT/DELETE /businesses/:bizId/sidebar-sections`, `GET/POST/PUT/DELETE /sidebar-items`, `GET/PUT /businesses/:bizId/users/:userId/sidebar`, `POST /businesses/:bizId/sidebar-config/copy`, `POST /businesses/:bizId/sidebar-config/reset/:userId`, `GET/POST/PUT/DELETE /screens/:id/permissions` |
| **الملفات (Frontend)** | `pages/login`, `pages/register`, `pages/roles`, `pages/sidebar-settings` |
| **الملفات (Backend)** | `routes/auth.ts`, جزء من `routes/api.ts`, `routes/enhancements.ts`, `middleware/auth.ts`, `middleware/permissions.ts` |

---

### الوحدة 2: الأعمال والمحطات

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `businesses`, `business_partners`, `stations`, `employees` |
| **الصفحات** | `business-select`, `business-layout`, `dashboard`, `stations`, `employees`, `partners`, `summary` |
| **مسارات الواجهة** | `/businesses`, `/biz/:bizId`, `/biz/:bizId/stations`, `/biz/:bizId/employees`, `/biz/:bizId/partners`, `/biz/:bizId/summary` |
| **API (Backend)** | `GET /businesses`, `GET /businesses/:id`, `GET/POST/PUT/DELETE /businesses/:bizId/stations`, `GET/POST/PUT/DELETE /businesses/:bizId/employees`, `GET/POST/PUT/DELETE /businesses/:bizId/partners` |
| **الملفات (Frontend)** | `pages/business-select`, `pages/business-layout`, `pages/dashboard`, `pages/stations`, `pages/employees`, `pages/partners`, `pages/summary` |
| **الملفات (Backend)** | `routes/dashboard.ts`, جزء من `routes/api.ts` (businesses, stations, employees, partners) |

---

### الوحدة 3: الحسابات والأرصدة

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `accounts`, `account_balances`, `account_allowed_links`, `funds`, `fund_balances`, `fund_types`, `bank_types`, `exchange_types`, `e_wallet_types` |
| **الصفحات** | `accounts`, `funds`, `banks`, `exchanges`, `wallets` |
| **مسارات الواجهة** | `/biz/:bizId/accounts`, `/biz/:bizId/funds`, `/biz/:bizId/banks`, `/biz/:bizId/exchangers`, `/biz/:bizId/wallets` |
| **API (Backend)** | `GET/POST/PUT/DELETE /businesses/:bizId/accounts`, `GET /accounts/:id`, `GET/POST/DELETE /accounts/:id/allowed-links`, `GET /accounts/:id/allowed-targets`, `GET/POST/PUT/DELETE /businesses/:bizId/funds`, `GET /funds/:id`, `GET/POST/PUT/DELETE /businesses/:bizId/fund-types`, `GET/POST/PUT/DELETE /businesses/:bizId/bank-types`, `GET/POST/PUT/DELETE /businesses/:bizId/exchange-types`, `GET/POST/PUT/DELETE /businesses/:bizId/e-wallet-types` |
| **الملفات (Frontend)** | `pages/accounts`, `pages/funds`, `pages/banks`, `pages/exchanges`, `pages/wallets` |

---

### الوحدة 4: العمليات المالية

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `vouchers`, `voucher_categories`, `journal_entries`, `journal_entry_lines`, `journal_entry_categories`, `attachments`, `audit_log`, `workflow_transitions`, `workflow_history` |
| **الصفحات** | `vouchers`, `journal`, `journal-categories` |
| **مسارات الواجهة** | `/biz/:bizId/vouchers`, `/biz/:bizId/journal`, `/biz/:bizId/journal-categories` |
| **API (Backend)** | `GET/POST/DELETE /businesses/:bizId/vouchers`, `GET /businesses/:bizId/vouchers-enhanced`, `PUT /businesses/:bizId/vouchers/:id`, `POST /businesses/:bizId/vouchers/:id/status`, `POST /businesses/:bizId/vouchers/:id/reverse`, `GET /businesses/:bizId/vouchers/:id/details`, `POST /businesses/:bizId/vouchers-draft`, `GET/POST/DELETE /businesses/:bizId/journal-entries`, `GET/POST/PUT/DELETE /businesses/:bizId/journal-entry-categories`, `GET /businesses/:bizId/voucher-categories`, `GET/POST/DELETE /attachments/*` |
| **الملفات (Backend)** | `services/transaction.service.ts`, `services/workflow.service.ts`, `routes/enhancements.ts` |

---

### الوحدة 5: القوالب والترقيم

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `operation_types`, `operation_type_accounts`, `sequence_counters` |
| **الصفحات** | `operation-types` |
| **مسارات الواجهة** | `/biz/:bizId/operation-types` |
| **API (Backend)** | `GET/POST/PUT/DELETE /businesses/:bizId/operation-types`, `GET /operation-types/:id`, `POST/DELETE /operation-types/:otId/accounts`, `POST /businesses/:bizId/operation-types/:id/clone`, `POST /businesses/:bizId/operation-types/:id/toggle`, `GET /businesses/:bizId/operation-types-stats` |
| **الملفات (Backend)** | `middleware/sequencing.ts` |

---

### الوحدة 6: المخزون والمخازن

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `warehouses`, `warehouse_types`, `warehouse_operations`, `warehouse_operation_items`, `inventory_items`, `inventory_stock`, `inventory_movements` |
| **الصفحات** | `warehouse`, `warehouse-operations` |
| **مسارات الواجهة** | `/biz/:bizId/warehouse`, `/biz/:bizId/warehouse-operations` |
| **API (Backend)** | `GET/POST/PUT/DELETE /businesses/:bizId/warehouses`, `GET /warehouses/:id`, `GET/POST/PUT/DELETE /businesses/:bizId/warehouse-types`, `GET/POST /businesses/:bizId/warehouse-operations`, `GET /warehouse-operations/:id`, `GET /businesses/:bizId/warehouses/:warehouseId/inventory`, `GET /businesses/:bizId/inventory/low-stock-alerts`, `GET /businesses/:bizId/inventory/stock-valuation` |
| **الملفات (Backend)** | `services/inventory.service.ts` |

---

### الوحدة 7: الموردين

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `suppliers`, `supplier_balances` |
| **الصفحات** | `suppliers` |
| **مسارات الواجهة** | `/biz/:bizId/suppliers` |
| **API (Backend)** | `GET/POST/PUT/DELETE /businesses/:bizId/suppliers` |
| **ملاحظات** | `supplier_balances` غير مُستخدم في الواجهة. |

---

### الوحدة 8: التحصيل والفوترة

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `daily_collections`, `collection_details`, `delivery_records`, `employee_billing_accounts`, `billing_systems_config`, `billing_account_types`, `billing_periods`, `diesel_consumption` |
| **الصفحات** | `collections`, `billing-systems` |
| **مسارات الواجهة** | `/biz/:bizId/collections`, `/biz/:bizId/billing-systems` |
| **API (Backend)** | `GET/POST /businesses/:bizId/collections`, `GET /collections/:id`, `POST /collections/:id/deliveries`, `GET/POST/PUT/DELETE /employee-billing-accounts`, `GET/POST/PUT/DELETE /businesses/:bizId/billing-systems-config`, `GET/POST/PUT/DELETE /businesses/:bizId/billing-account-types` |
| **ملاحظات** | `billing_periods` و `diesel_consumption` غير مُستخدمين. |

---

### الوحدة 9: التقارير

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `analytics_snapshots` |
| **الصفحات** | `reports`, `reports-advanced` |
| **مسارات الواجهة** | `/biz/:bizId/reports`, `/biz/:bizId/reports-advanced` |
| **API (Backend)** | `GET /businesses/:bizId/reports/profit-loss`, `GET /businesses/:bizId/reports/account-statement/:accountId`, `GET /businesses/:bizId/reports/daily-summary`, `GET /businesses/:bizId/reports/trial-balance` |
| **الملفات (Backend)** | `services/reporting.service.ts` |

---

### الوحدة 10: بناء الواجهات والشاشات المخصصة

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `screen_templates`, `screen_widgets`, `screen_widget_templates`, `screen_widget_accounts`, `screen_widget_warehouses`, `custom_screen_config`, `ui_pages`, `ui_components`, `ui_data_sources` |
| **الصفحات** | `custom-screens`, `ui-builder` |
| **مسارات الواجهة** | `/biz/:bizId/custom-screens`, `/biz/:bizId/ui-builder` |
| **API (Backend)** | `GET/POST/PUT/DELETE /businesses/:bizId/screens`, `GET/POST/PUT/DELETE /screens/:id/widgets`, `GET/POST/PUT/DELETE /widgets/:id/templates`, `GET/POST/DELETE /widgets/:id/accounts`, `GET/PUT /businesses/:bizId/screens/:id/collection-style-config`, `GET/POST/PUT/DELETE /businesses/:bizId/ui-pages`, `GET/POST/PUT/DELETE /businesses/:bizId/ui-data-sources`, `GET/POST/PUT/DELETE /businesses/:bizId/ui-components`, `GET /businesses/:bizId/widget-stats`, `GET /businesses/:bizId/widget-log`, `GET /businesses/:bizId/widget-log-enhanced`, إلخ. |
| **الملفات (Backend)** | `services/ui-builder.service.ts` |

---

### الوحدة 11: العملات وأسعار الصرف

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `currencies`, `exchange_rates` |
| **الصفحات** | `exchange-rates` |
| **مسارات الواجهة** | `/biz/:bizId/exchange-rates` |
| **API (Backend)** | `GET /currencies`, `GET/POST/PUT/DELETE /businesses/:bizId/exchange-rates`, `GET /businesses/:bizId/exchange-rates/convert` |
| **الملفات (Backend)** | `services/currency.service.ts` |

---

### الوحدة 12: المعلقات والتصفيات

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `pending_accounts`, `reconciliations` |
| **الصفحات** | `pending-accounts`, `settlements` |
| **مسارات الواجهة** | `/biz/:bizId/pending`, `/biz/:bizId/settlements` |
| **API (Backend)** | `GET/POST/PUT/DELETE /businesses/:bizId/pending-accounts`, `GET/POST/PUT/DELETE /businesses/:bizId/settlements` |
| **ملاحظات** | `reconciliations` غير مُستخدم. |

---

### الوحدة 13: الموظفين والرواتب

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `employees`, `salary_records` |
| **الصفحات** | `employees`, `salaries` |
| **مسارات الواجهة** | `/biz/:bizId/employees`, `/biz/:bizId/salaries` |
| **API (Backend)** | `GET/POST/PUT/DELETE /businesses/:bizId/employees`, `GET/POST/PUT/DELETE /businesses/:bizId/salaries` |
| **الملفات (Frontend)** | `pages/employees`, `pages/salaries` |
| **الحالة** | ✅ مُفعّلة ومكتملة |

---

### الوحدة 14: الميزانية والمصروفات

| البند | التفاصيل |
|--------|-----------|
| **الجداول** | `expense_budget`, `expense_categories` |
| **الصفحات** | `expense-categories`, `expense-budget` |
| **مسارات الواجهة** | `/biz/:bizId/expense-categories`, `/biz/:bizId/expense-budget` |
| **API (Backend)** | `GET/POST/PUT/DELETE /businesses/:bizId/expense-categories`, `GET/POST/PUT/DELETE /businesses/:bizId/expense-budget` |
| **الملفات (Frontend)** | `pages/expense-categories`, `pages/expense-budget` |
| **الحالة** | ✅ مُفعّلة ومكتملة |

---

## 4. هيكل مقترح للملفات (للمرجع)

### Frontend (تحت `src/app`)

```
pages/
  auth/           → الوحدة 1 (login, register)
  permissions/    → الوحدة 1 (roles, sidebar-settings)
  business/       → الوحدة 2 (business-select, business-layout, dashboard, stations, employees, partners, summary)
  accounts/       → الوحدة 3 (accounts, funds, banks, exchanges, wallets)
  financial/      → الوحدة 4 (vouchers, journal, journal-categories)
  templates/      → الوحدة 5 (operation-types)
  inventory/      → الوحدة 6 (warehouse, warehouse-operations)
  suppliers/      → الوحدة 7
  collections/    → الوحدة 8 (collections, billing-systems)
  reports/        → الوحدة 9
  screens/        → الوحدة 10 (custom-screens, ui-builder)
  currency/       → الوحدة 11 (exchange-rates)
  pending/        → الوحدة 12 (pending-accounts, settlements)
```

*(الهيكل الحالي مسطح تحت `pages/`؛ إعادة التنظيم اختيارية.)*

### Backend (تحت `src`)

```
routes/
  auth.ts         → الوحدة 1
  api.ts          → معظم الوحدات (مجمّع)
  enhancements.ts → وحدات 1، 4، 5، 10
  dashboard.ts    → الوحدة 2
services/
  transaction.service.ts → الوحدة 4
  workflow.service.ts    → الوحدة 4
  reporting.service.ts  → الوحدة 9
  currency.service.ts   → الوحدة 11
  inventory.service.ts → الوحدة 6
  ui-builder.service.ts→ الوحدة 10
middleware/
  sequencing.ts   → الوحدة 5
  permissions.ts  → الوحدة 1
```

---

## 5. ملخص التقسيم

- **13 وحدة** تغطي كل الجداول والصفحات والـ API الحالية.
- **خريطة المسارات** تربط كل مسار frontend بالوحدة المناسبة.
- **تفاصيل كل وحدة** تشمل الجداول، الصفحات، المسارات، وملخص الـ API والملفات.
- **الوحدة 13** (الرواتب والميزانية) غير مُفعّلة وتحتاج تطوير لاحق.

*آخر تحديث: إكمال التقسيم مع خريطة المسارات وربط API والملفات.*
