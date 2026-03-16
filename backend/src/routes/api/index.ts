/**
 * API Routes Index — نقطة الدخول الموحدة للمسارات
 * ══════════════════════════════════════════════════════════════
 * Phase 3: تم فصل المسارات إلى ملفات مخصصة
 * 
 * الإحصائيات:
 *   - Phase 1+2: 22 ملف route
 *   - Phase 3: +4 ملفات جديدة (currency, rbac, attachments-enhanced, misc-categories)
 *   - api.rest.ts: من 2670 → 2039 سطر (تقليص 24%)
 */
import { Hono } from 'hono';

// ── المسارات الأساسية ───────────────────────────────────────────────────────
import businessesRoutes         from './businesses.routes.ts';
import stationsRoutes           from './stations.routes.ts';
import employeesRoutes          from './employees.routes.ts';
import fundsRoutes              from './funds.routes.ts';
import reportingRoutes          from './reporting.routes.ts';
import workflowRoutes           from './workflow.routes.ts';
import inventoryRoutes          from './inventory.routes.ts';
import uiBuilderRoutes          from './ui-builder.routes.ts';
import accountsRoutes           from './accounts.routes.ts';
import partnersRoutes           from './partners.routes.ts';
import pendingSettlementsRoutes from './pending-settlements.routes.ts';
import categoriesExpensesRoutes from './categories-expenses.routes.ts';
import operationTypesRoutes     from './operation-types.routes.ts';
import journalEntriesRoutes     from './journal-entries.routes.ts';
import billingConfigRoutes      from './billing-config.routes.ts';
import warehouseRoutes          from './warehouse.routes.ts';
import reportsRoutes            from './reports.routes.ts';
import restRoutes               from './api.rest.ts';
import purchaseInvoicesRoutes   from './purchase-invoices.routes.ts';
import operationCategoriesRoutes from './operation-categories.routes.ts';
import supplierTypesRoutes      from './supplier-types.routes.ts';
import inventoryItemTypesRoutes from './inventory-item-types.routes.ts';
import departmentsRoutes        from './departments.routes.ts';
import jobTitlesRoutes          from './job-titles.routes.ts';
import custodyRoutes            from './custody.routes.ts';
import accountingTypesRoutes    from './accounting-types.routes.ts';
import reconciliationsRoutes    from './reconciliations.routes.ts';
import accountSubNaturesRoutes  from './account-sub-natures.routes.ts';

// ── مسارات Phase 3 (مستخرجة من api.rest.ts) ─────────────────────────────────
import { currencyRoutes }             from './currency.routes.ts';
import { rbacRoutes }                 from './rbac.routes.ts';
import { attachmentsEnhancedRoutes }  from './attachments-enhanced.routes.ts';
import { miscCategoriesRoutes }       from './misc-categories.routes.ts';

const api = new Hono();

// ── تسجيل جميع المسارات ─────────────────────────────────────────────────────
api.route('/', businessesRoutes);
api.route('/', stationsRoutes);
api.route('/', employeesRoutes);
api.route('/', fundsRoutes);
api.route('/', reportingRoutes);
api.route('/', workflowRoutes);
api.route('/', inventoryRoutes);
api.route('/', uiBuilderRoutes);
api.route('/', accountsRoutes);
api.route('/', partnersRoutes);
api.route('/', pendingSettlementsRoutes);
api.route('/', categoriesExpensesRoutes);
api.route('/', operationTypesRoutes);
api.route('/', journalEntriesRoutes);
api.route('/', billingConfigRoutes);
api.route('/', warehouseRoutes);
api.route('/', reportsRoutes);
api.route('/', restRoutes);
api.route('/', purchaseInvoicesRoutes);
api.route('/', operationCategoriesRoutes);
api.route('/', supplierTypesRoutes);
api.route('/', inventoryItemTypesRoutes);
api.route('/', departmentsRoutes);
api.route('/', jobTitlesRoutes);
api.route('/', custodyRoutes);
api.route('/', accountingTypesRoutes);
api.route('/', reconciliationsRoutes);
api.route('/', accountSubNaturesRoutes);

// ── Phase 3: المسارات الجديدة ─────────────────────────────────────────────
api.route('/', currencyRoutes);
api.route('/', rbacRoutes);
api.route('/', attachmentsEnhancedRoutes);
api.route('/', miscCategoriesRoutes);

export default api;
