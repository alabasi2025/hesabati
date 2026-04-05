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
import { Hono } from "hono";

// ── المسارات الأساسية ───────────────────────────────────────────────────────
import businessesRoutes from "./businesses.routes.ts";
import stationsRoutes from "./stations.routes.ts";
import { fundsReadRoutes, fundsWriteRoutes } from "./funds.routes.ts";
import { banksReadRoutes, banksWriteRoutes } from "./banks.routes.ts";
import { walletsReadRoutes, walletsWriteRoutes } from "./wallets.routes.ts";
import {
  exchangesReadRoutes,
  exchangesWriteRoutes,
} from "./exchanges.routes.ts";
import reportingRoutes from "./reporting.routes.ts";
import workflowRoutes from "./workflow.routes.ts";
import inventoryRoutes from "./inventory.routes.ts";
import uiBuilderRoutes from "./ui-builder.routes.ts";
import { accountsReadRoutes, accountsWriteRoutes } from "./accounts.routes.ts";
import { partnersReadRoutes, partnersWriteRoutes } from "./partners.routes.ts";
import { suppliersWriteRoutes } from "./suppliers-write.routes.ts";
import { suppliersReadRoutes } from "./suppliers-read.routes.ts";
import { employeesWriteRoutes } from "./employees-write.routes.ts";
import { employeesReadRoutes } from "./employees-read.routes.ts";
import { pendingReadRoutes, pendingWriteRoutes } from "./pending.routes.ts";
import categoriesExpensesRoutes from "./categories-expenses.routes.ts";
import operationTypesRoutes from "./operation-types.routes.ts";
import journalEntriesRoutes from "./journal-entries.routes.ts";
import {
  billingConfigReadRoutes,
  billingConfigWriteRoutes,
} from "./billing-config.routes.ts";
import {
  warehouseCrudRoutes,
  warehouseOpsRoutes,
  warehousesReadRoutes,
  warehousesWriteRoutes,
} from "./warehouse.routes.ts";
import reportsRoutes from "./reports.routes.ts";
import { api as restRoutes } from "./api.rest.ts";
import {
  purchaseInvoicesReadRoutes,
  purchaseInvoicesWriteRoutes,
} from "./purchase-invoices.routes.ts";
import operationCategoriesRoutes from "./operation-categories.routes.ts";
import supplierTypesRoutes from "./supplier-types.routes.ts";
import inventoryItemTypesRoutes from "./inventory-item-types.routes.ts";
import departmentsRoutes from "./departments.routes.ts";
import jobTitlesRoutes from "./job-titles.routes.ts";
import { custodyReadRoutes, custodyWriteRoutes } from "./custody.routes.ts";
import { budgetReadRoutes, budgetWriteRoutes } from "./budget.routes.ts";
import {
  settlementsReadRoutes,
  settlementsWriteRoutes,
} from "./settlements.routes.ts";
import accountingTypesRoutes from "./accounting-types.routes.ts";
import reconciliationsRoutes from "./reconciliations.routes.ts";
import accountSubNaturesRoutes from "./account-sub-natures.routes.ts";
import { analyticalAccountsRoutes } from "./analytical-accounts.routes.ts";

// ── مسارات Phase 3 (مستخرجة من api.rest.ts) ─────────────────────────────────
import { currencyRoutes } from "./currency.routes.ts";
import { fiscalRoutes } from "./fiscal.routes.ts";
import { accountCurrenciesRoutes } from "./account-currencies.routes.ts";
import { rbacRoutes } from "./rbac.routes.ts";
import { attachmentsEnhancedRoutes } from "./attachments-enhanced.routes.ts";
import { miscCategoriesRoutes } from "./misc-categories.routes.ts";

// ── مسارات Phase 4 (مستخرجة من api.rest.ts) ─────────────────────────────────
import { sidebarRoutes } from "./sidebar.routes.js";
import { screensManageRoutes, screensPermRoutes } from "./screens.routes.js";
import { billingEmployeesRoutes } from "./billing-employees.routes.js";
import { billingAccountsApi } from "./billing-accounts.routes.js";
import { legacyCompatRoutes } from "./legacy-compat.routes.js";
import { syncRoutes } from "./sync-currencies.routes.js";
import { fundCurrenciesRoutes } from "./fund-currencies.routes.js";

const api = new Hono();

// ── تسجيل جميع المسارات ─────────────────────────────────────────────────────
api.route("/", businessesRoutes);
api.route("/", stationsRoutes);
api.route("/", fundsReadRoutes);
api.route("/", fundsWriteRoutes);
api.route("/", banksReadRoutes);
api.route("/", banksWriteRoutes);
api.route("/", walletsReadRoutes);
api.route("/", walletsWriteRoutes);
api.route("/", exchangesReadRoutes);
api.route("/", exchangesWriteRoutes);
api.route("/", reportingRoutes);
api.route("/", workflowRoutes);
api.route("/", inventoryRoutes);
api.route("/", uiBuilderRoutes);
api.route("/", accountsReadRoutes);
api.route("/", accountsWriteRoutes);
api.route("/", partnersReadRoutes);
api.route("/", partnersWriteRoutes);
api.route("/", suppliersReadRoutes);
api.route("/", suppliersWriteRoutes);
api.route("/", warehousesReadRoutes);
api.route("/", warehousesWriteRoutes);
api.route("/", employeesReadRoutes);
api.route("/", employeesWriteRoutes);
api.route("/", pendingReadRoutes);
api.route("/", pendingWriteRoutes);
api.route("/", categoriesExpensesRoutes);
api.route("/", operationTypesRoutes);
api.route("/", journalEntriesRoutes);
api.route("/", billingConfigReadRoutes);
api.route("/", billingConfigWriteRoutes);
api.route("/", warehouseCrudRoutes);
api.route("/", warehouseOpsRoutes);
api.route("/", reportsRoutes);
api.route("/", restRoutes);
api.route("/", purchaseInvoicesReadRoutes);
api.route("/", purchaseInvoicesWriteRoutes);
api.route("/", operationCategoriesRoutes);
api.route("/", supplierTypesRoutes);
api.route("/", inventoryItemTypesRoutes);
api.route("/", departmentsRoutes);
api.route("/", jobTitlesRoutes);
api.route("/", custodyReadRoutes);
api.route("/", custodyWriteRoutes);
api.route("/", budgetReadRoutes);
api.route("/", budgetWriteRoutes);
api.route("/", settlementsReadRoutes);
api.route("/", settlementsWriteRoutes);
api.route("/", accountingTypesRoutes);
api.route("/", reconciliationsRoutes);
api.route("/", accountSubNaturesRoutes);
api.route("/", analyticalAccountsRoutes);

// ── Phase 3: المسارات الجديدة ─────────────────────────────────────────────
api.route("/", currencyRoutes);
api.route("/", fiscalRoutes);
api.route("/", accountCurrenciesRoutes);
api.route("/", rbacRoutes);
api.route("/", attachmentsEnhancedRoutes);
api.route("/", miscCategoriesRoutes);

// ── Phase 4: مسارات مستخرجة من api.rest.ts ────────────────────────────────
api.route("/", sidebarRoutes);
api.route("/", screensManageRoutes);
api.route("/", screensPermRoutes);
api.route("/", billingEmployeesRoutes);
api.route("/", billingAccountsApi);
api.route("/", legacyCompatRoutes);
api.route("/", syncRoutes);
api.route("/", fundCurrenciesRoutes);

export default api;
