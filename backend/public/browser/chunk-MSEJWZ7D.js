import {
  AuthService,
  Injectable,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-VUZEB5JS.js";

// src/app/services/api/base-api.service.ts
var BaseApiService = class _BaseApiService {
  API_URL = "/api";
  auth = inject(AuthService);
  getHeaders() {
    const token = this.auth.getToken();
    return __spreadValues({
      "Content-Type": "application/json"
    }, token ? { "Authorization": `Bearer ${token}` } : {});
  }
  async request(path, options) {
    const res = await fetch(`${this.API_URL}${path}`, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues(__spreadValues({}, this.getHeaders()), options?.headers)
    }));
    const text = await res.text();
    if (!res.ok) {
      let err = {};
      try {
        if (text?.trim())
          err = JSON.parse(text);
      } catch {
        err = { error: this.getArabicHttpError(res.status) };
      }
      if (res.status === 401) {
        this.auth.logout();
        throw new Error("\u0627\u0644\u062C\u0644\u0633\u0629 \u0645\u0646\u062A\u0647\u064A\u0629 - \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B");
      }
      let errorMsg = err.error || this.getArabicHttpError(res.status);
      if (err.details)
        errorMsg += ` (\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644: ${err.details})`;
      if (err.location)
        errorMsg += ` [\u0627\u0644\u0645\u0648\u0642\u0639: ${err.location}]`;
      const error = new Error(errorMsg);
      error.status = res.status;
      error.details = err.details;
      error.location = err.location;
      error.originalError = err;
      throw error;
    }
    if (!text?.trim())
      return void 0;
    try {
      return JSON.parse(text);
    } catch {
      return void 0;
    }
  }
  getArabicHttpError(status) {
    const errors = {
      400: "\u0637\u0644\u0628 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062F\u062E\u0644\u0629",
      401: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u2014 \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649",
      403: "\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629",
      404: "\u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F",
      409: "\u062A\u0639\u0627\u0631\u0636 \u0641\u064A \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u2014 \u0627\u0644\u0639\u0646\u0635\u0631 \u0645\u0648\u062C\u0648\u062F \u0645\u0633\u0628\u0642\u0627\u064B",
      422: "\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629 \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629",
      500: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u2014 \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B",
      502: "\u0627\u0644\u062E\u0627\u062F\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u062D\u0627\u0644\u064A\u0627\u064B",
      503: "\u0627\u0644\u062E\u062F\u0645\u0629 \u0645\u062A\u0648\u0642\u0641\u0629 \u0645\u0624\u0642\u062A\u0627\u064B"
    };
    return errors[status] || `\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 (\u0631\u0645\u0632: ${status})`;
  }
  static \u0275fac = function BaseApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BaseApiService, factory: _BaseApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/api/business-api.service.ts
var BusinessApiService = class _BusinessApiService {
  api = inject(BaseApiService);
  // ===================== Dashboard =====================
  getDashboardStats() {
    return this.api.request("/dashboard/stats");
  }
  // ===================== الأعمال =====================
  getBusinesses() {
    return this.api.request("/businesses");
  }
  getBusiness(id) {
    return this.api.request(`/businesses/${id}`);
  }
  createBusiness(d) {
    return this.api.request("/businesses", { method: "POST", body: JSON.stringify(d) });
  }
  updateBusiness(id, d) {
    return this.api.request(`/businesses/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteBusiness(id) {
    return this.api.request(`/businesses/${id}`, { method: "DELETE" });
  }
  // ===================== المحطات =====================
  getStations(bizId) {
    return this.api.request(`/businesses/${bizId}/stations`);
  }
  getStation(bizId, id) {
    return this.api.request(`/businesses/${bizId}/stations/${id}`);
  }
  createStation(bizId, d) {
    return this.api.request(`/businesses/${bizId}/stations`, { method: "POST", body: JSON.stringify(d) });
  }
  updateStation(id, d) {
    return this.api.request(`/stations/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  updateStationByBiz(bizId, id, d) {
    return this.api.request(`/businesses/${bizId}/stations/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteStation(bizId, id) {
    return this.api.request(`/businesses/${bizId}/stations/${id}`, { method: "DELETE" });
  }
  // فحص الاتصال
  async checkDbHealth() {
    try {
      const res = await fetch("/health/db");
      return await res.json();
    } catch {
      return { status: "disconnected", message: "\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645" };
    }
  }
  static \u0275fac = function BusinessApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BusinessApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BusinessApiService, factory: _BusinessApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BusinessApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/api/employee-api.service.ts
var EmployeeApiService = class _EmployeeApiService {
  api = inject(BaseApiService);
  // ===================== الموظفين =====================
  getEmployees(bizId) {
    return this.api.request(`/businesses/${bizId}/employees`);
  }
  createEmployee(bizId, d) {
    return this.api.request(`/businesses/${bizId}/employees`, { method: "POST", body: JSON.stringify(d) });
  }
  updateEmployee(id, d) {
    return this.api.request(`/employees/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteEmployee(id) {
    return this.api.request(`/employees/${id}`, { method: "DELETE" });
  }
  // ===================== حسابات الموظفين في أنظمة الفوترة =====================
  getEmployeeBillingAccounts(bizId, stationId) {
    let url = `/businesses/${bizId}/employee-billing-accounts`;
    if (stationId)
      url += `?stationId=${stationId}`;
    return this.api.request(url);
  }
  createEmployeeBillingAccount(d) {
    return this.api.request(`/employee-billing-accounts`, { method: "POST", body: JSON.stringify(d) });
  }
  updateEmployeeBillingAccount(id, d) {
    return this.api.request(`/employee-billing-accounts/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteEmployeeBillingAccount(id) {
    return this.api.request(`/employee-billing-accounts/${id}`, { method: "DELETE" });
  }
  // ===================== الأقسام =====================
  getDepartments(bizId) {
    return this.api.request(`/businesses/${bizId}/departments`);
  }
  createDepartment(bizId, d) {
    return this.api.request(`/businesses/${bizId}/departments`, { method: "POST", body: JSON.stringify(d) });
  }
  updateDepartment(id, d) {
    return this.api.request(`/departments/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteDepartment(id) {
    return this.api.request(`/departments/${id}`, { method: "DELETE" });
  }
  // ===================== المسميات الوظيفية =====================
  getJobTitles(bizId) {
    return this.api.request(`/businesses/${bizId}/job-titles`);
  }
  createJobTitle(bizId, d) {
    return this.api.request(`/businesses/${bizId}/job-titles`, { method: "POST", body: JSON.stringify(d) });
  }
  updateJobTitle(id, d) {
    return this.api.request(`/job-titles/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteJobTitle(id) {
    return this.api.request(`/job-titles/${id}`, { method: "DELETE" });
  }
  // ===================== سجلات الرواتب =====================
  getSalaryRecords(bizId, month, year) {
    let url = `/businesses/${bizId}/salaries`;
    const p = [];
    if (month != null)
      p.push(`month=${month}`);
    if (year != null)
      p.push(`year=${year}`);
    if (p.length)
      url += "?" + p.join("&");
    return this.api.request(url);
  }
  createSalaryRecord(bizId, d) {
    return this.api.request(`/businesses/${bizId}/salaries`, { method: "POST", body: JSON.stringify(d) });
  }
  updateSalaryRecord(id, d) {
    return this.api.request(`/salaries/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteSalaryRecord(id) {
    return this.api.request(`/salaries/${id}`, { method: "DELETE" });
  }
  // ===================== إعدادات أنظمة الفوترة =====================
  getBillingSystemsConfig(bizId) {
    return this.api.request(`/businesses/${bizId}/billing-systems-config`);
  }
  createBillingSystemConfig(bizId, d) {
    return this.api.request(`/businesses/${bizId}/billing-systems-config`, { method: "POST", body: JSON.stringify(d) });
  }
  updateBillingSystemConfig(id, d) {
    return this.api.request(`/billing-systems-config/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteBillingSystemConfig(id) {
    return this.api.request(`/billing-systems-config/${id}`, { method: "DELETE" });
  }
  // ===================== أنواع حسابات الفوترة =====================
  getBillingAccountTypes(bizId) {
    return this.api.request(`/businesses/${bizId}/billing-account-types`);
  }
  createBillingAccountType(bizId, d) {
    return this.api.request(`/businesses/${bizId}/billing-account-types`, { method: "POST", body: JSON.stringify(d) });
  }
  updateBillingAccountType(id, d) {
    return this.api.request(`/billing-account-types/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteBillingAccountType(id) {
    return this.api.request(`/billing-account-types/${id}`, { method: "DELETE" });
  }
  static \u0275fac = function EmployeeApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmployeeApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmployeeApiService, factory: _EmployeeApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeeApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/api/account-api.service.ts
var AccountApiService = class _AccountApiService {
  api = inject(BaseApiService);
  // ===================== الحسابات =====================
  getAccounts(bizId) {
    return this.api.request(`/businesses/${bizId}/accounts`);
  }
  getAllAccounts(bizId) {
    return this.api.request(`/businesses/${bizId}/accounts?all=true`);
  }
  getCustodyAccounts(bizId) {
    return this.api.request(`/businesses/${bizId}/custody-accounts`);
  }
  getIntermediaryAccounts(bizId) {
    return this.api.request(`/businesses/${bizId}/intermediary-accounts`);
  }
  getPendingAccountsList(bizId) {
    return this.api.request(`/businesses/${bizId}/pending-accounts-list`);
  }
  createAccount(bizId, d) {
    return this.api.request(`/businesses/${bizId}/accounts`, { method: "POST", body: JSON.stringify(d) });
  }
  updateAccount(bizId, id, d) {
    return this.api.request(`/businesses/${bizId}/accounts/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteAccount(bizId, id) {
    return this.api.request(`/businesses/${bizId}/accounts/${id}`, { method: "DELETE" });
  }
  getAccountBalance(bizId, accountId) {
    return this.api.request(`/businesses/${bizId}/account-balance/${accountId}`);
  }
  // ===================== أنواع الحسابات الفرعية =====================
  getAccountSubNatures(bizId) {
    return this.api.request(`/businesses/${bizId}/account-sub-natures`);
  }
  createAccountSubNature(bizId, d) {
    return this.api.request(`/businesses/${bizId}/account-sub-natures`, { method: "POST", body: JSON.stringify(d) });
  }
  updateAccountSubNature(bizId, id, d) {
    return this.api.request(`/businesses/${bizId}/account-sub-natures/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteAccountSubNature(bizId, id) {
    return this.api.request(`/businesses/${bizId}/account-sub-natures/${id}`, { method: "DELETE" });
  }
  // ===================== ربط الحسابات =====================
  getAccountLinks(accountId) {
    return this.api.request(`/accounts/${accountId}/allowed-links`);
  }
  getAccountAllowedTargets(accountId, type) {
    return this.api.request(`/accounts/${accountId}/allowed-targets?type=${type}`);
  }
  createAccountLink(d) {
    return this.api.request(`/account-links`, { method: "POST", body: JSON.stringify(d) });
  }
  deleteAccountLink(id) {
    return this.api.request(`/account-links/${id}`, { method: "DELETE" });
  }
  // ===================== الصناديق =====================
  getFunds(bizId, includeCustody = false) {
    const query = includeCustody ? "?includeCustody=true" : "";
    return this.api.request(`/businesses/${bizId}/funds${query}`);
  }
  getFund(id) {
    return this.api.request(`/funds/${id}`);
  }
  createFund(bizId, d) {
    return this.api.request(`/businesses/${bizId}/funds`, { method: "POST", body: JSON.stringify(d) });
  }
  updateFund(bizId, id, d) {
    return this.api.request(`/businesses/${bizId}/funds/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteFund(bizId, id) {
    return this.api.request(`/businesses/${bizId}/funds/${id}`, { method: "DELETE" });
  }
  // ===================== أنواع الصناديق =====================
  getFundTypes(bizId) {
    return this.api.request(`/businesses/${bizId}/fund-types`);
  }
  createFundType(bizId, d) {
    return this.api.request(`/businesses/${bizId}/fund-types`, { method: "POST", body: JSON.stringify(d) });
  }
  updateFundType(id, d) {
    return this.api.request(`/fund-types/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteFundType(id) {
    return this.api.request(`/fund-types/${id}`, { method: "DELETE" });
  }
  // ===================== أنواع البنوك =====================
  getBankTypes(bizId) {
    return this.api.request(`/businesses/${bizId}/bank-types`);
  }
  createBankType(bizId, d) {
    return this.api.request(`/businesses/${bizId}/bank-types`, { method: "POST", body: JSON.stringify(d) });
  }
  updateBankType(id, d) {
    return this.api.request(`/bank-types/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteBankType(id) {
    return this.api.request(`/bank-types/${id}`, { method: "DELETE" });
  }
  // ===================== أنواع الصرافين =====================
  getExchangeTypes(bizId) {
    return this.api.request(`/businesses/${bizId}/exchange-types`);
  }
  createExchangeType(bizId, d) {
    return this.api.request(`/businesses/${bizId}/exchange-types`, { method: "POST", body: JSON.stringify(d) });
  }
  updateExchangeType(id, d) {
    return this.api.request(`/exchange-types/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteExchangeType(id) {
    return this.api.request(`/exchange-types/${id}`, { method: "DELETE" });
  }
  // ===================== أنواع المحافظ الإلكترونية =====================
  getEWalletTypes(bizId) {
    return this.api.request(`/businesses/${bizId}/e-wallet-types`);
  }
  createEWalletType(bizId, d) {
    return this.api.request(`/businesses/${bizId}/e-wallet-types`, { method: "POST", body: JSON.stringify(d) });
  }
  updateEWalletType(id, d) {
    return this.api.request(`/e-wallet-types/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteEWalletType(id) {
    return this.api.request(`/e-wallet-types/${id}`, { method: "DELETE" });
  }
  // ===================== الأنواع المحاسبية =====================
  getAccountingMainTypes(bizId) {
    return this.api.request(`/businesses/${bizId}/accounting-main-types`);
  }
  createAccountingMainType(bizId, d) {
    return this.api.request(`/businesses/${bizId}/accounting-main-types`, { method: "POST", body: JSON.stringify(d) });
  }
  updateAccountingMainType(bizId, id, d) {
    return this.api.request(`/businesses/${bizId}/accounting-main-types/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteAccountingMainType(bizId, id) {
    return this.api.request(`/businesses/${bizId}/accounting-main-types/${id}`, { method: "DELETE" });
  }
  getAccountingTypes(bizId) {
    return this.api.request(`/businesses/${bizId}/accounting-types`);
  }
  createAccountingType(bizId, d) {
    return this.api.request(`/businesses/${bizId}/accounting-types`, { method: "POST", body: JSON.stringify(d) });
  }
  updateAccountingType(bizId, id, d) {
    return this.api.request(`/businesses/${bizId}/accounting-types/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteAccountingType(bizId, id) {
    return this.api.request(`/businesses/${bizId}/accounting-types/${id}`, { method: "DELETE" });
  }
  // ===================== الحسابات المعلقة =====================
  getPendingAccounts(bizId) {
    return this.api.request(`/businesses/${bizId}/pending-accounts`);
  }
  createPendingAccount(bizId, d) {
    return this.api.request(`/businesses/${bizId}/pending-accounts`, { method: "POST", body: JSON.stringify(d) });
  }
  updatePendingAccount(id, d) {
    return this.api.request(`/pending-accounts/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deletePendingAccount(id) {
    return this.api.request(`/pending-accounts/${id}`, { method: "DELETE" });
  }
  // ===================== الشركاء =====================
  getPartners(bizId) {
    return this.api.request(`/businesses/${bizId}/partners`);
  }
  createPartner(bizId, d) {
    return this.api.request(`/businesses/${bizId}/partners`, { method: "POST", body: JSON.stringify(d) });
  }
  updatePartner(id, d) {
    return this.api.request(`/partners/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deletePartner(id) {
    return this.api.request(`/partners/${id}`, { method: "DELETE" });
  }
  static \u0275fac = function AccountApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccountApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AccountApiService, factory: _AccountApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccountApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/api/voucher-api.service.ts
var VoucherApiService = class _VoucherApiService {
  api = inject(BaseApiService);
  // ===================== السندات الأساسية =====================
  getVouchers(bizId, type) {
    return this.api.request(`/businesses/${bizId}/vouchers${type ? "?type=" + type : ""}`);
  }
  createVoucher(bizId, d) {
    return this.api.request(`/businesses/${bizId}/vouchers`, { method: "POST", body: JSON.stringify(d) });
  }
  createVoucherMulti(bizId, d) {
    return this.api.request(`/businesses/${bizId}/vouchers-multi`, { method: "POST", body: JSON.stringify(d) });
  }
  createVoucherDraft(bizId, d) {
    return this.api.request(`/businesses/${bizId}/vouchers-draft`, { method: "POST", body: JSON.stringify(d) });
  }
  deleteVoucher(id) {
    return this.api.request(`/vouchers/${id}`, { method: "DELETE" });
  }
  getVoucherNumberPreview(bizId, params) {
    const search = new URLSearchParams();
    search.set("voucherType", params.voucherType);
    if (params.voucherDate)
      search.set("voucherDate", params.voucherDate);
    if (params.fromAccountId)
      search.set("fromAccountId", String(params.fromAccountId));
    if (params.toAccountId)
      search.set("toAccountId", String(params.toAccountId));
    if (params.fromFundId)
      search.set("fromFundId", String(params.fromFundId));
    if (params.toFundId)
      search.set("toFundId", String(params.toFundId));
    return this.api.request(`/businesses/${bizId}/voucher-number-preview?${search.toString()}`);
  }
  getVouchersAdvanced(bizId, filters) {
    let url = `/businesses/${bizId}/vouchers`;
    const params = [];
    if (filters?.type)
      params.push(`type=${filters.type}`);
    if (filters?.status)
      params.push(`status=${filters.status}`);
    if (filters?.dateFrom)
      params.push(`dateFrom=${filters.dateFrom}`);
    if (filters?.dateTo)
      params.push(`dateTo=${filters.dateTo}`);
    if (filters?.search)
      params.push(`search=${encodeURIComponent(filters.search)}`);
    if (filters?.voucherNumber)
      params.push(`voucherNumber=${encodeURIComponent(filters.voucherNumber)}`);
    if (filters?.minAmount)
      params.push(`minAmount=${filters.minAmount}`);
    if (filters?.maxAmount)
      params.push(`maxAmount=${filters.maxAmount}`);
    if (filters?.operationTypeId)
      params.push(`operationTypeId=${filters.operationTypeId}`);
    if (filters?.treasuryType)
      params.push(`treasuryType=${filters.treasuryType}`);
    if (filters?.treasuryId)
      params.push(`treasuryId=${filters.treasuryId}`);
    if (filters?.limit)
      params.push(`limit=${filters.limit}`);
    if (filters?.offset !== void 0)
      params.push(`offset=${filters.offset}`);
    if (filters?.sortBy)
      params.push(`sortBy=${filters.sortBy}`);
    if (filters?.sortDir)
      params.push(`sortDir=${filters.sortDir}`);
    if (params.length)
      url += "?" + params.join("&");
    return this.api.request(url);
  }
  updateVoucher(bizId, id, d) {
    return this.api.request(`/businesses/${bizId}/vouchers/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  changeVoucherStatus(bizId, id, status) {
    return this.api.request(`/businesses/${bizId}/vouchers/${id}/status`, { method: "POST", body: JSON.stringify({ status }) });
  }
  getVoucherDetails(bizId, id) {
    return this.api.request(`/businesses/${bizId}/vouchers/${id}/details`);
  }
  getVoucherCategories(bizId) {
    return this.api.request(`/businesses/${bizId}/voucher-categories`);
  }
  // ===================== التحصيل اليومي =====================
  getCollections(bizId, stationId, date) {
    let url = `/businesses/${bizId}/collections`;
    const params = [];
    if (stationId)
      params.push(`stationId=${stationId}`);
    if (date)
      params.push(`date=${date}`);
    if (params.length)
      url += "?" + params.join("&");
    return this.api.request(url);
  }
  getCollection(id) {
    return this.api.request(`/collections/${id}`);
  }
  createCollection(bizId, d) {
    return this.api.request(`/businesses/${bizId}/collections`, { method: "POST", body: JSON.stringify(d) });
  }
  createDelivery(collectionId, d) {
    return this.api.request(`/collections/${collectionId}/deliveries`, { method: "POST", body: JSON.stringify(d) });
  }
  // ===================== التصفيات =====================
  getSettlements(bizId) {
    return this.api.request(`/businesses/${bizId}/settlements`);
  }
  createSettlement(bizId, d) {
    return this.api.request(`/businesses/${bizId}/settlements`, { method: "POST", body: JSON.stringify(d) });
  }
  updateSettlement(id, d) {
    return this.api.request(`/settlements/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteSettlement(id) {
    return this.api.request(`/settlements/${id}`, { method: "DELETE" });
  }
  // ===================== القيود المحاسبية =====================
  getJournalEntries(bizId) {
    return this.api.request(`/businesses/${bizId}/journal-entries`);
  }
  createJournalEntry(bizId, d) {
    return this.api.request(`/businesses/${bizId}/journal-entries`, { method: "POST", body: JSON.stringify(d) });
  }
  deleteJournalEntry(id) {
    return this.api.request(`/journal-entries/${id}`, { method: "DELETE" });
  }
  getJournalEntryCategories(bizId) {
    return this.api.request(`/businesses/${bizId}/journal-entry-categories`);
  }
  createJournalEntryCategory(bizId, d) {
    return this.api.request(`/businesses/${bizId}/journal-entry-categories`, { method: "POST", body: JSON.stringify(d) });
  }
  updateJournalEntryCategory(id, d) {
    return this.api.request(`/journal-entry-categories/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteJournalEntryCategory(id) {
    return this.api.request(`/journal-entry-categories/${id}`, { method: "DELETE" });
  }
  // ===================== المطابقات =====================
  getReconciliations(bizId) {
    return this.api.request(`/businesses/${bizId}/reconciliations`);
  }
  getReconciliation(bizId, id) {
    return this.api.request(`/businesses/${bizId}/reconciliations/${id}`);
  }
  createReconciliation(bizId, d) {
    return this.api.request(`/businesses/${bizId}/reconciliations`, { method: "POST", body: JSON.stringify(d) });
  }
  updateReconciliation(bizId, id, d) {
    return this.api.request(`/businesses/${bizId}/reconciliations/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  // ===================== العهد =====================
  getCustodyRecords(bizId) {
    return this.api.request(`/businesses/${bizId}/custody`);
  }
  getCustodyRecord(bizId, id) {
    return this.api.request(`/businesses/${bizId}/custody/${id}`);
  }
  createCustodyRecord(bizId, d) {
    return this.api.request(`/businesses/${bizId}/custody`, { method: "POST", body: JSON.stringify(d) });
  }
  updateCustodyRecord(bizId, id, d) {
    return this.api.request(`/businesses/${bizId}/custody/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteCustodyRecord(bizId, id) {
    return this.api.request(`/businesses/${bizId}/custody/${id}`, { method: "DELETE" });
  }
  addCustodySettlement(bizId, custodyId, d) {
    return this.api.request(`/businesses/${bizId}/custody/${custodyId}/settle`, { method: "POST", body: JSON.stringify(d) });
  }
  static \u0275fac = function VoucherApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VoucherApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VoucherApiService, factory: _VoucherApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VoucherApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/api/inventory-api.service.ts
var InventoryApiService = class _InventoryApiService {
  api = inject(BaseApiService);
  // ===================== الموردين =====================
  getSuppliers(bizId) {
    return this.api.request(`/businesses/${bizId}/suppliers`);
  }
  createSupplier(bizId, d) {
    return this.api.request(`/businesses/${bizId}/suppliers`, { method: "POST", body: JSON.stringify(d) });
  }
  updateSupplier(id, d) {
    return this.api.request(`/suppliers/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteSupplier(id) {
    return this.api.request(`/suppliers/${id}`, { method: "DELETE" });
  }
  getSupplierTypes(bizId) {
    return this.api.request(`/businesses/${bizId}/supplier-types`);
  }
  createSupplierType(bizId, d) {
    return this.api.request(`/businesses/${bizId}/supplier-types`, { method: "POST", body: JSON.stringify(d) });
  }
  updateSupplierType(id, d) {
    return this.api.request(`/supplier-types/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteSupplierType(id) {
    return this.api.request(`/supplier-types/${id}`, { method: "DELETE" });
  }
  // ===================== المخازن =====================
  getWarehouses(bizId) {
    return this.api.request(`/businesses/${bizId}/warehouses`);
  }
  getWarehouse(id) {
    return this.api.request(`/warehouses/${id}`);
  }
  createWarehouse(bizId, d) {
    return this.api.request(`/businesses/${bizId}/warehouses`, { method: "POST", body: JSON.stringify(d) });
  }
  updateWarehouse(id, d) {
    return this.api.request(`/warehouses/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteWarehouse(id) {
    return this.api.request(`/warehouses/${id}`, { method: "DELETE" });
  }
  getWarehouseTypes(bizId) {
    return this.api.request(`/businesses/${bizId}/warehouse-types`);
  }
  createWarehouseType(bizId, d) {
    return this.api.request(`/businesses/${bizId}/warehouse-types`, { method: "POST", body: JSON.stringify(d) });
  }
  updateWarehouseType(id, d) {
    return this.api.request(`/warehouse-types/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteWarehouseType(id) {
    return this.api.request(`/warehouse-types/${id}`, { method: "DELETE" });
  }
  // ===================== العمليات المخزنية =====================
  getWarehouseOperations(bizId, type, warehouseId) {
    let url = `/businesses/${bizId}/warehouse-operations`;
    const params = [];
    if (type)
      params.push(`type=${type}`);
    if (warehouseId)
      params.push(`warehouseId=${warehouseId}`);
    if (params.length)
      url += "?" + params.join("&");
    return this.api.request(url);
  }
  getWarehouseOperationsByWarehouse(bizId, warehouseId) {
    return this.api.request(`/businesses/${bizId}/warehouses/${warehouseId}/operations`);
  }
  createWarehouseOperation(bizId, d) {
    return this.api.request(`/businesses/${bizId}/warehouse-operations`, { method: "POST", body: JSON.stringify(d) });
  }
  getWarehouseOperation(id) {
    return this.api.request(`/warehouse-operations/${id}`);
  }
  getWarehouseInventory(bizId, warehouseId) {
    return this.api.request(`/businesses/${bizId}/warehouses/${warehouseId}/inventory`);
  }
  // ===================== الأصناف والمخزون =====================
  getInventoryItems(bizId) {
    return this.api.request(`/businesses/${bizId}/inventory-items`);
  }
  getInventoryItemTypes(bizId) {
    return this.api.request(`/businesses/${bizId}/inventory-item-types`);
  }
  createInventoryItemType(bizId, d) {
    return this.api.request(`/businesses/${bizId}/inventory-item-types`, { method: "POST", body: JSON.stringify(d) });
  }
  updateInventoryItemType(id, d) {
    return this.api.request(`/inventory-item-types/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteInventoryItemType(id) {
    return this.api.request(`/inventory-item-types/${id}`, { method: "DELETE" });
  }
  getStockLevels(bizId, warehouseId) {
    const q = warehouseId ? `?warehouseId=${warehouseId}` : "";
    return this.api.request(`/businesses/${bizId}/stock-levels${q}`);
  }
  getStockAlerts(bizId) {
    return this.api.request(`/businesses/${bizId}/stock-alerts`);
  }
  getStockValuation(bizId, warehouseId) {
    const q = warehouseId ? `?warehouseId=${warehouseId}` : "";
    return this.api.request(`/businesses/${bizId}/stock-valuation${q}`);
  }
  getItemMovements(bizId, itemId, limit) {
    const q = limit ? `?limit=${limit}` : "";
    return this.api.request(`/businesses/${bizId}/items/${itemId}/movements${q}`);
  }
  createStockMovement(bizId, data) {
    return this.api.request(`/businesses/${bizId}/stock-movements`, { method: "POST", body: JSON.stringify(data) });
  }
  // ===================== فواتير المشتريات =====================
  getPurchaseInvoices(bizId, status) {
    const q = status ? `?status=${status}` : "";
    return this.api.request(`/businesses/${bizId}/purchase-invoices${q}`);
  }
  getPurchaseInvoice(bizId, id) {
    return this.api.request(`/businesses/${bizId}/purchase-invoices/${id}`);
  }
  createPurchaseInvoice(bizId, data) {
    return this.api.request(`/businesses/${bizId}/purchase-invoices`, { method: "POST", body: JSON.stringify(data) });
  }
  updatePurchaseInvoice(bizId, id, data) {
    return this.api.request(`/businesses/${bizId}/purchase-invoices/${id}`, { method: "PUT", body: JSON.stringify(data) });
  }
  confirmPurchaseInvoice(bizId, id) {
    return this.api.request(`/businesses/${bizId}/purchase-invoices/${id}/confirm`, { method: "POST" });
  }
  receivePurchaseInvoice(bizId, id, receivedItems) {
    return this.api.request(`/businesses/${bizId}/purchase-invoices/${id}/receive`, { method: "POST", body: JSON.stringify({ receivedItems }) });
  }
  deletePurchaseInvoice(bizId, id) {
    return this.api.request(`/businesses/${bizId}/purchase-invoices/${id}`, { method: "DELETE" });
  }
  // ===================== أصناف العمليات =====================
  getOperationCategories(bizId, includeTypes = false) {
    const q = includeTypes ? "?includeTypes=true" : "";
    return this.api.request(`/businesses/${bizId}/operation-categories${q}`);
  }
  getOperationCategory(bizId, id) {
    return this.api.request(`/businesses/${bizId}/operation-categories/${id}`);
  }
  createOperationCategory(bizId, data) {
    return this.api.request(`/businesses/${bizId}/operation-categories`, { method: "POST", body: JSON.stringify(data) });
  }
  updateOperationCategory(bizId, id, data) {
    return this.api.request(`/businesses/${bizId}/operation-categories/${id}`, { method: "PUT", body: JSON.stringify(data) });
  }
  deleteOperationCategory(bizId, id) {
    return this.api.request(`/businesses/${bizId}/operation-categories/${id}`, { method: "DELETE" });
  }
  // ===================== أنواع العمليات =====================
  getOperationTypes(bizId, category, screen) {
    let url = `/businesses/${bizId}/operation-types`;
    const params = [];
    if (category)
      params.push(`category=${category}`);
    if (screen)
      params.push(`screen=${screen}`);
    if (params.length)
      url += `?${params.join("&")}`;
    return this.api.request(url);
  }
  getOperationType(id) {
    return this.api.request(`/operation-types/${id}`);
  }
  createOperationType(bizId, d) {
    return this.api.request(`/businesses/${bizId}/operation-types`, { method: "POST", body: JSON.stringify(d) });
  }
  updateOperationType(id, d) {
    return this.api.request(`/operation-types/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteOperationType(id) {
    return this.api.request(`/operation-types/${id}`, { method: "DELETE" });
  }
  addOperationTypeAccount(otId, d) {
    return this.api.request(`/operation-types/${otId}/accounts`, { method: "POST", body: JSON.stringify(d) });
  }
  removeOperationTypeAccount(id) {
    return this.api.request(`/operation-type-accounts/${id}`, { method: "DELETE" });
  }
  cloneOperationType(bizId, id, d) {
    return this.api.request(`/businesses/${bizId}/operation-types/${id}/clone`, { method: "POST", body: JSON.stringify(d || {}) });
  }
  toggleOperationType(bizId, id) {
    return this.api.request(`/businesses/${bizId}/operation-types/${id}/toggle`, { method: "POST", body: "{}" });
  }
  getOperationTypesStats(bizId) {
    return this.api.request(`/businesses/${bizId}/operation-types-stats`);
  }
  checkOperationTypeName(bizId, name, excludeId) {
    let url = `/businesses/${bizId}/operation-types/check-name?name=${encodeURIComponent(name)}`;
    if (excludeId)
      url += `&excludeId=${excludeId}`;
    return this.api.request(url);
  }
  // ===================== تصنيفات المصروفات =====================
  getExpenseCategories(bizId) {
    return this.api.request(`/businesses/${bizId}/expense-categories`);
  }
  createExpenseCategory(bizId, d) {
    return this.api.request(`/businesses/${bizId}/expense-categories`, { method: "POST", body: JSON.stringify(d) });
  }
  updateExpenseCategory(id, d) {
    return this.api.request(`/expense-categories/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteExpenseCategory(id) {
    return this.api.request(`/expense-categories/${id}`, { method: "DELETE" });
  }
  // ===================== ميزانية المصروفات =====================
  getExpenseBudget(bizId, month, year) {
    let url = `/businesses/${bizId}/expense-budget`;
    const p = [];
    if (month != null)
      p.push(`month=${month}`);
    if (year != null)
      p.push(`year=${year}`);
    if (p.length)
      url += "?" + p.join("&");
    return this.api.request(url);
  }
  createExpenseBudget(bizId, d) {
    return this.api.request(`/businesses/${bizId}/expense-budget`, { method: "POST", body: JSON.stringify(d) });
  }
  updateExpenseBudget(id, d) {
    return this.api.request(`/expense-budget/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteExpenseBudget(id) {
    return this.api.request(`/expense-budget/${id}`, { method: "DELETE" });
  }
  static \u0275fac = function InventoryApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InventoryApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InventoryApiService, factory: _InventoryApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventoryApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/api/screen-api.service.ts
var ScreenApiService = class _ScreenApiService {
  api = inject(BaseApiService);
  // ===================== الشاشات المخصصة =====================
  getScreens(bizId) {
    return this.api.request(`/businesses/${bizId}/screens`);
  }
  createScreen(bizId, d) {
    return this.api.request(`/businesses/${bizId}/screens`, { method: "POST", body: JSON.stringify(d) });
  }
  updateScreen(id, d) {
    return this.api.request(`/screens/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteScreen(id) {
    return this.api.request(`/screens/${id}`, { method: "DELETE" });
  }
  cloneScreen(screenId, d) {
    return this.api.request(`/screens/${screenId}/clone`, { method: "POST", body: JSON.stringify(d) });
  }
  getScreensWithWidgets(bizId) {
    return this.api.request(`/businesses/${bizId}/screens-with-widgets`);
  }
  // ===================== العناصر (Widgets) =====================
  getScreenWidgets(screenId) {
    return this.api.request(`/screens/${screenId}/widgets`);
  }
  createScreenWidget(screenId, d) {
    return this.api.request(`/screens/${screenId}/widgets`, { method: "POST", body: JSON.stringify(d) });
  }
  updateWidget(id, d) {
    return this.api.request(`/widgets/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteWidget(id) {
    return this.api.request(`/widgets/${id}`, { method: "DELETE" });
  }
  batchUpdateWidgets(screenId, widgets) {
    return this.api.request(`/screens/${screenId}/widgets/batch`, { method: "PUT", body: JSON.stringify({ widgets }) });
  }
  copyWidgetToScreen(widgetId, targetScreenId) {
    return this.api.request(`/widgets/${widgetId}/copy-to/${targetScreenId}`, { method: "POST", body: JSON.stringify({}) });
  }
  // ===================== ربط القوالب والحسابات بالعناصر =====================
  getWidgetTemplates(widgetId) {
    return this.api.request(`/widgets/${widgetId}/templates`);
  }
  addWidgetTemplate(widgetId, d) {
    return this.api.request(`/widgets/${widgetId}/templates`, { method: "POST", body: JSON.stringify(d) });
  }
  removeWidgetTemplate(id) {
    return this.api.request(`/widget-templates/${id}`, { method: "DELETE" });
  }
  getWidgetAccountLinks(widgetId) {
    return this.api.request(`/widgets/${widgetId}/accounts`);
  }
  addWidgetAccount(widgetId, d) {
    return this.api.request(`/widgets/${widgetId}/accounts`, { method: "POST", body: JSON.stringify(d) });
  }
  removeWidgetAccount(id) {
    return this.api.request(`/widget-accounts/${id}`, { method: "DELETE" });
  }
  // ===================== صلاحيات الشاشات =====================
  getScreenPermissions(screenId) {
    return this.api.request(`/screens/${screenId}/permissions`);
  }
  setScreenPermissions(screenId, d) {
    return this.api.request(`/screens/${screenId}/permissions`, { method: "PUT", body: JSON.stringify(d) });
  }
  // ===================== تحسينات الشاشات =====================
  getWidgetLogEnhanced(bizId, filters) {
    let url = `/businesses/${bizId}/widget-log-enhanced`;
    const params = [];
    if (filters?.dateFrom)
      params.push(`dateFrom=${filters.dateFrom}`);
    if (filters?.dateTo)
      params.push(`dateTo=${filters.dateTo}`);
    if (filters?.operationTypeId)
      params.push(`operationTypeId=${filters.operationTypeId}`);
    if (filters?.search)
      params.push(`search=${encodeURIComponent(filters.search)}`);
    if (filters?.minAmount)
      params.push(`minAmount=${filters.minAmount}`);
    if (filters?.maxAmount)
      params.push(`maxAmount=${filters.maxAmount}`);
    if (filters?.status)
      params.push(`status=${filters.status}`);
    if (filters?.limit)
      params.push(`limit=${filters.limit}`);
    if (filters?.offset !== void 0)
      params.push(`offset=${filters.offset}`);
    if (params.length)
      url += "?" + params.join("&");
    return this.api.request(url);
  }
  getWidgetStatsEnhanced(bizId, period, dateFrom, dateTo) {
    let url = `/businesses/${bizId}/widget-stats-enhanced`;
    const params = [];
    if (period)
      params.push(`period=${period}`);
    if (dateFrom)
      params.push(`dateFrom=${dateFrom}`);
    if (dateTo)
      params.push(`dateTo=${dateTo}`);
    if (params.length)
      url += "?" + params.join("&");
    return this.api.request(url);
  }
  getWidgetChartEnhanced(bizId, groupBy, months, dateFrom, dateTo) {
    let url = `/businesses/${bizId}/widget-chart-enhanced`;
    const params = [];
    if (groupBy)
      params.push(`groupBy=${groupBy}`);
    if (months)
      params.push(`months=${months}`);
    if (dateFrom)
      params.push(`dateFrom=${dateFrom}`);
    if (dateTo)
      params.push(`dateTo=${dateTo}`);
    if (params.length)
      url += "?" + params.join("&");
    return this.api.request(url);
  }
  // ===================== سير العمل =====================
  getVoucherTransitions(bizId, voucherId) {
    return this.api.request(`/businesses/${bizId}/vouchers/${voucherId}/transitions`);
  }
  executeVoucherTransition(bizId, voucherId, transitionId, note) {
    return this.api.request(`/businesses/${bizId}/vouchers/${voucherId}/transition`, { method: "POST", body: JSON.stringify({ transitionId, note }) });
  }
  getVoucherWorkflowHistory(bizId, voucherId) {
    return this.api.request(`/businesses/${bizId}/vouchers/${voucherId}/workflow-history`);
  }
  setupDefaultWorkflow(bizId, opTypeId) {
    return this.api.request(`/businesses/${bizId}/operation-types/${opTypeId}/setup-workflow`, { method: "POST" });
  }
  getOperationTypeTransitions(bizId, opTypeId) {
    return this.api.request(`/businesses/${bizId}/operation-types/${opTypeId}/transitions`);
  }
  addOperationTypeTransition(bizId, opTypeId, d) {
    return this.api.request(`/businesses/${bizId}/operation-types/${opTypeId}/transitions`, { method: "POST", body: JSON.stringify(d) });
  }
  deleteTransition(bizId, transitionId) {
    return this.api.request(`/businesses/${bizId}/transitions/${transitionId}`, { method: "DELETE" });
  }
  // ===================== التبويب الجانبي =====================
  getSidebarSections(bizId) {
    return this.api.request(`/businesses/${bizId}/sidebar-sections`);
  }
  createSidebarSection(bizId, d) {
    return this.api.request(`/businesses/${bizId}/sidebar-sections`, { method: "POST", body: JSON.stringify(d) });
  }
  updateSidebarSection(id, d) {
    return this.api.request(`/sidebar-sections/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteSidebarSection(id) {
    return this.api.request(`/sidebar-sections/${id}`, { method: "DELETE" });
  }
  getSidebarItems(bizId) {
    return this.api.request(`/businesses/${bizId}/sidebar-items`);
  }
  createSidebarItem(d) {
    return this.api.request(`/sidebar-items`, { method: "POST", body: JSON.stringify(d) });
  }
  updateSidebarItem(id, d) {
    return this.api.request(`/sidebar-items/${id}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteSidebarItem(id) {
    return this.api.request(`/sidebar-items/${id}`, { method: "DELETE" });
  }
  getUserSidebar(bizId, userId) {
    return this.api.request(`/businesses/${bizId}/users/${userId}/sidebar`);
  }
  updateUserSidebar(bizId, userId, d) {
    return this.api.request(`/businesses/${bizId}/users/${userId}/sidebar`, { method: "PUT", body: JSON.stringify(d) });
  }
  copySidebarConfig(bizId, fromUserId, toUserId) {
    return this.api.request(`/businesses/${bizId}/sidebar-config/copy`, { method: "POST", body: JSON.stringify({ fromUserId, toUserId }) });
  }
  resetSidebarConfig(bizId, userId) {
    return this.api.request(`/businesses/${bizId}/sidebar-config/reset/${userId}`, { method: "POST", body: "{}" });
  }
  getUsers() {
    return this.api.request("/users");
  }
  // ===================== UI Builder =====================
  getUiPages(bizId) {
    return this.api.request(`/businesses/${bizId}/ui/pages`);
  }
  getUiPageByKey(bizId, pageKey) {
    return this.api.request(`/businesses/${bizId}/ui/pages/key/${pageKey}`);
  }
  getUiPage(bizId, pageId) {
    return this.api.request(`/businesses/${bizId}/ui/pages/${pageId}`);
  }
  createUiPage(bizId, d) {
    return this.api.request(`/businesses/${bizId}/ui/pages`, { method: "POST", body: JSON.stringify(d) });
  }
  updateUiPage(bizId, pageId, d) {
    return this.api.request(`/businesses/${bizId}/ui/pages/${pageId}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteUiPage(bizId, pageId) {
    return this.api.request(`/businesses/${bizId}/ui/pages/${pageId}`, { method: "DELETE" });
  }
  addUiComponent(bizId, pageId, d) {
    return this.api.request(`/businesses/${bizId}/ui/pages/${pageId}/components`, { method: "POST", body: JSON.stringify(d) });
  }
  updateUiComponent(bizId, componentId, d) {
    return this.api.request(`/businesses/${bizId}/ui/components/${componentId}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteUiComponent(bizId, componentId) {
    return this.api.request(`/businesses/${bizId}/ui/components/${componentId}`, { method: "DELETE" });
  }
  getUiDataSources(bizId) {
    return this.api.request(`/businesses/${bizId}/ui/data-sources`);
  }
  createUiDataSource(bizId, d) {
    return this.api.request(`/businesses/${bizId}/ui/data-sources`, { method: "POST", body: JSON.stringify(d) });
  }
  updateUiDataSource(bizId, dsId, d) {
    return this.api.request(`/businesses/${bizId}/ui/data-sources/${dsId}`, { method: "PUT", body: JSON.stringify(d) });
  }
  deleteUiDataSource(bizId, dsId) {
    return this.api.request(`/businesses/${bizId}/ui/data-sources/${dsId}`, { method: "DELETE" });
  }
  executeUiDataSource(bizId, dsId, params) {
    return this.api.request(`/businesses/${bizId}/ui/data-sources/${dsId}/execute`, { method: "POST", body: JSON.stringify(params || {}) });
  }
  // ===================== التقارير =====================
  getMonthlyRevenue(bizId, year) {
    const q = year ? `?year=${year}` : "";
    return this.api.request(`/businesses/${bizId}/reports/monthly-revenue${q}`);
  }
  getAggregatedProfitLoss(dateFrom, dateTo) {
    const params = new URLSearchParams();
    if (dateFrom)
      params.set("dateFrom", dateFrom);
    if (dateTo)
      params.set("dateTo", dateTo);
    const q = params.toString() ? `?${params}` : "";
    return this.api.request(`/reports/aggregated-profit-loss${q}`);
  }
  getAggregatedSummary() {
    return this.api.request(`/reports/aggregated-summary`);
  }
  static \u0275fac = function ScreenApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScreenApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ScreenApiService, factory: _ScreenApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScreenApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/services/api.service.ts
var ApiService = class _ApiService {
  base = inject(BaseApiService);
  biz = inject(BusinessApiService);
  emp = inject(EmployeeApiService);
  acc = inject(AccountApiService);
  vou = inject(VoucherApiService);
  inv = inject(InventoryApiService);
  scr = inject(ScreenApiService);
  // ── generic request (used by pages that call api.request directly) ──
  request(path, options) {
    return this.base.request(path, options);
  }
  // ===================== Dashboard =====================
  getDashboardStats() {
    return this.biz.getDashboardStats();
  }
  // ===================== الأعمال =====================
  getBusinesses() {
    return this.biz.getBusinesses();
  }
  getBusiness(id) {
    return this.biz.getBusiness(id);
  }
  createBusiness(d) {
    return this.biz.createBusiness(d);
  }
  updateBusiness(id, d) {
    return this.biz.updateBusiness(id, d);
  }
  deleteBusiness(id) {
    return this.biz.deleteBusiness(id);
  }
  // ===================== المحطات =====================
  getStations(bizId) {
    return this.biz.getStations(bizId);
  }
  getStation(bizId, id) {
    return this.biz.getStation(bizId, id);
  }
  createStation(bizId, d) {
    return this.biz.createStation(bizId, d);
  }
  updateStation(id, d) {
    return this.biz.updateStation(id, d);
  }
  updateStationByBiz(bizId, id, d) {
    return this.biz.updateStationByBiz(bizId, id, d);
  }
  deleteStation(bizId, id) {
    return this.biz.deleteStation(bizId, id);
  }
  checkDbHealth() {
    return this.biz.checkDbHealth();
  }
  // ===================== الموظفين =====================
  getEmployees(bizId) {
    return this.emp.getEmployees(bizId);
  }
  createEmployee(bizId, d) {
    return this.emp.createEmployee(bizId, d);
  }
  updateEmployee(id, d) {
    return this.emp.updateEmployee(id, d);
  }
  deleteEmployee(id) {
    return this.emp.deleteEmployee(id);
  }
  getEmployeeBillingAccounts(bizId, stationId) {
    return this.emp.getEmployeeBillingAccounts(bizId, stationId);
  }
  createEmployeeBillingAccount(d) {
    return this.emp.createEmployeeBillingAccount(d);
  }
  updateEmployeeBillingAccount(id, d) {
    return this.emp.updateEmployeeBillingAccount(id, d);
  }
  deleteEmployeeBillingAccount(id) {
    return this.emp.deleteEmployeeBillingAccount(id);
  }
  getDepartments(bizId) {
    return this.emp.getDepartments(bizId);
  }
  createDepartment(bizId, d) {
    return this.emp.createDepartment(bizId, d);
  }
  updateDepartment(id, d) {
    return this.emp.updateDepartment(id, d);
  }
  deleteDepartment(id) {
    return this.emp.deleteDepartment(id);
  }
  getJobTitles(bizId) {
    return this.emp.getJobTitles(bizId);
  }
  createJobTitle(bizId, d) {
    return this.emp.createJobTitle(bizId, d);
  }
  updateJobTitle(id, d) {
    return this.emp.updateJobTitle(id, d);
  }
  deleteJobTitle(id) {
    return this.emp.deleteJobTitle(id);
  }
  getSalaryRecords(bizId, month, year) {
    return this.emp.getSalaryRecords(bizId, month, year);
  }
  createSalaryRecord(bizId, d) {
    return this.emp.createSalaryRecord(bizId, d);
  }
  updateSalaryRecord(id, d) {
    return this.emp.updateSalaryRecord(id, d);
  }
  deleteSalaryRecord(id) {
    return this.emp.deleteSalaryRecord(id);
  }
  getBillingSystemsConfig(bizId) {
    return this.emp.getBillingSystemsConfig(bizId);
  }
  createBillingSystemConfig(bizId, d) {
    return this.emp.createBillingSystemConfig(bizId, d);
  }
  updateBillingSystemConfig(id, d) {
    return this.emp.updateBillingSystemConfig(id, d);
  }
  deleteBillingSystemConfig(id) {
    return this.emp.deleteBillingSystemConfig(id);
  }
  getBillingAccountTypes(bizId) {
    return this.emp.getBillingAccountTypes(bizId);
  }
  createBillingAccountType(bizId, d) {
    return this.emp.createBillingAccountType(bizId, d);
  }
  updateBillingAccountType(id, d) {
    return this.emp.updateBillingAccountType(id, d);
  }
  deleteBillingAccountType(id) {
    return this.emp.deleteBillingAccountType(id);
  }
  // ===================== الحسابات =====================
  getAccounts(bizId) {
    return this.acc.getAccounts(bizId);
  }
  getAllAccounts(bizId) {
    return this.acc.getAllAccounts(bizId);
  }
  getCustodyAccounts(bizId) {
    return this.acc.getCustodyAccounts(bizId);
  }
  getIntermediaryAccounts(bizId) {
    return this.acc.getIntermediaryAccounts(bizId);
  }
  getPendingAccountsList(bizId) {
    return this.acc.getPendingAccountsList(bizId);
  }
  createAccount(bizId, d) {
    return this.acc.createAccount(bizId, d);
  }
  updateAccount(bizId, id, d) {
    return this.acc.updateAccount(bizId, id, d);
  }
  deleteAccount(bizId, id) {
    return this.acc.deleteAccount(bizId, id);
  }
  getAccountBalance(bizId, accountId) {
    return this.acc.getAccountBalance(bizId, accountId);
  }
  getAccountSubNatures(bizId) {
    return this.acc.getAccountSubNatures(bizId);
  }
  createAccountSubNature(bizId, d) {
    return this.acc.createAccountSubNature(bizId, d);
  }
  updateAccountSubNature(bizId, id, d) {
    return this.acc.updateAccountSubNature(bizId, id, d);
  }
  deleteAccountSubNature(bizId, id) {
    return this.acc.deleteAccountSubNature(bizId, id);
  }
  getAccountLinks(accountId) {
    return this.acc.getAccountLinks(accountId);
  }
  getAccountAllowedTargets(accountId, type) {
    return this.acc.getAccountAllowedTargets(accountId, type);
  }
  createAccountLink(d) {
    return this.acc.createAccountLink(d);
  }
  deleteAccountLink(id) {
    return this.acc.deleteAccountLink(id);
  }
  getFunds(bizId, includeCustody = false) {
    return this.acc.getFunds(bizId, includeCustody);
  }
  getFund(id) {
    return this.acc.getFund(id);
  }
  createFund(bizId, d) {
    return this.acc.createFund(bizId, d);
  }
  updateFund(bizId, id, d) {
    return this.acc.updateFund(bizId, id, d);
  }
  deleteFund(bizId, id) {
    return this.acc.deleteFund(bizId, id);
  }
  getFundTypes(bizId) {
    return this.acc.getFundTypes(bizId);
  }
  createFundType(bizId, d) {
    return this.acc.createFundType(bizId, d);
  }
  updateFundType(id, d) {
    return this.acc.updateFundType(id, d);
  }
  deleteFundType(id) {
    return this.acc.deleteFundType(id);
  }
  getBankTypes(bizId) {
    return this.acc.getBankTypes(bizId);
  }
  createBankType(bizId, d) {
    return this.acc.createBankType(bizId, d);
  }
  updateBankType(id, d) {
    return this.acc.updateBankType(id, d);
  }
  deleteBankType(id) {
    return this.acc.deleteBankType(id);
  }
  getExchangeTypes(bizId) {
    return this.acc.getExchangeTypes(bizId);
  }
  createExchangeType(bizId, d) {
    return this.acc.createExchangeType(bizId, d);
  }
  updateExchangeType(id, d) {
    return this.acc.updateExchangeType(id, d);
  }
  deleteExchangeType(id) {
    return this.acc.deleteExchangeType(id);
  }
  getEWalletTypes(bizId) {
    return this.acc.getEWalletTypes(bizId);
  }
  createEWalletType(bizId, d) {
    return this.acc.createEWalletType(bizId, d);
  }
  updateEWalletType(id, d) {
    return this.acc.updateEWalletType(id, d);
  }
  deleteEWalletType(id) {
    return this.acc.deleteEWalletType(id);
  }
  getAccountingMainTypes(bizId) {
    return this.acc.getAccountingMainTypes(bizId);
  }
  createAccountingMainType(bizId, d) {
    return this.acc.createAccountingMainType(bizId, d);
  }
  updateAccountingMainType(bizId, id, d) {
    return this.acc.updateAccountingMainType(bizId, id, d);
  }
  deleteAccountingMainType(bizId, id) {
    return this.acc.deleteAccountingMainType(bizId, id);
  }
  getAccountingTypes(bizId) {
    return this.acc.getAccountingTypes(bizId);
  }
  createAccountingType(bizId, d) {
    return this.acc.createAccountingType(bizId, d);
  }
  updateAccountingType(bizId, id, d) {
    return this.acc.updateAccountingType(bizId, id, d);
  }
  deleteAccountingType(bizId, id) {
    return this.acc.deleteAccountingType(bizId, id);
  }
  getPendingAccounts(bizId) {
    return this.acc.getPendingAccounts(bizId);
  }
  createPendingAccount(bizId, d) {
    return this.acc.createPendingAccount(bizId, d);
  }
  updatePendingAccount(id, d) {
    return this.acc.updatePendingAccount(id, d);
  }
  deletePendingAccount(id) {
    return this.acc.deletePendingAccount(id);
  }
  getPartners(bizId) {
    return this.acc.getPartners(bizId);
  }
  createPartner(bizId, d) {
    return this.acc.createPartner(bizId, d);
  }
  updatePartner(id, d) {
    return this.acc.updatePartner(id, d);
  }
  deletePartner(id) {
    return this.acc.deletePartner(id);
  }
  // ===================== السندات =====================
  getVouchers(bizId, type) {
    return this.vou.getVouchers(bizId, type);
  }
  createVoucher(bizId, d) {
    return this.vou.createVoucher(bizId, d);
  }
  createVoucherMulti(bizId, d) {
    return this.vou.createVoucherMulti(bizId, d);
  }
  createVoucherDraft(bizId, d) {
    return this.vou.createVoucherDraft(bizId, d);
  }
  deleteVoucher(id) {
    return this.vou.deleteVoucher(id);
  }
  getVoucherNumberPreview(bizId, params) {
    return this.vou.getVoucherNumberPreview(bizId, params);
  }
  getVouchersAdvanced(bizId, filters) {
    return this.vou.getVouchersAdvanced(bizId, filters);
  }
  updateVoucher(bizId, id, d) {
    return this.vou.updateVoucher(bizId, id, d);
  }
  changeVoucherStatus(bizId, id, status) {
    return this.vou.changeVoucherStatus(bizId, id, status);
  }
  getVoucherDetails(bizId, id) {
    return this.vou.getVoucherDetails(bizId, id);
  }
  getVoucherCategories(bizId) {
    return this.vou.getVoucherCategories(bizId);
  }
  getCollections(bizId, stationId, date) {
    return this.vou.getCollections(bizId, stationId, date);
  }
  getCollection(id) {
    return this.vou.getCollection(id);
  }
  createCollection(bizId, d) {
    return this.vou.createCollection(bizId, d);
  }
  createDelivery(collectionId, d) {
    return this.vou.createDelivery(collectionId, d);
  }
  getSettlements(bizId) {
    return this.vou.getSettlements(bizId);
  }
  createSettlement(bizId, d) {
    return this.vou.createSettlement(bizId, d);
  }
  updateSettlement(id, d) {
    return this.vou.updateSettlement(id, d);
  }
  deleteSettlement(id) {
    return this.vou.deleteSettlement(id);
  }
  getJournalEntries(bizId) {
    return this.vou.getJournalEntries(bizId);
  }
  createJournalEntry(bizId, d) {
    return this.vou.createJournalEntry(bizId, d);
  }
  deleteJournalEntry(id) {
    return this.vou.deleteJournalEntry(id);
  }
  getJournalEntryCategories(bizId) {
    return this.vou.getJournalEntryCategories(bizId);
  }
  createJournalEntryCategory(bizId, d) {
    return this.vou.createJournalEntryCategory(bizId, d);
  }
  updateJournalEntryCategory(id, d) {
    return this.vou.updateJournalEntryCategory(id, d);
  }
  deleteJournalEntryCategory(id) {
    return this.vou.deleteJournalEntryCategory(id);
  }
  getReconciliations(bizId) {
    return this.vou.getReconciliations(bizId);
  }
  getReconciliation(bizId, id) {
    return this.vou.getReconciliation(bizId, id);
  }
  createReconciliation(bizId, d) {
    return this.vou.createReconciliation(bizId, d);
  }
  updateReconciliation(bizId, id, d) {
    return this.vou.updateReconciliation(bizId, id, d);
  }
  getCustodyRecords(bizId) {
    return this.vou.getCustodyRecords(bizId);
  }
  getCustodyRecord(bizId, id) {
    return this.vou.getCustodyRecord(bizId, id);
  }
  createCustodyRecord(bizId, d) {
    return this.vou.createCustodyRecord(bizId, d);
  }
  updateCustodyRecord(bizId, id, d) {
    return this.vou.updateCustodyRecord(bizId, id, d);
  }
  deleteCustodyRecord(bizId, id) {
    return this.vou.deleteCustodyRecord(bizId, id);
  }
  addCustodySettlement(bizId, custodyId, d) {
    return this.vou.addCustodySettlement(bizId, custodyId, d);
  }
  // ===================== المخازن والموردين =====================
  getSuppliers(bizId) {
    return this.inv.getSuppliers(bizId);
  }
  createSupplier(bizId, d) {
    return this.inv.createSupplier(bizId, d);
  }
  updateSupplier(id, d) {
    return this.inv.updateSupplier(id, d);
  }
  deleteSupplier(id) {
    return this.inv.deleteSupplier(id);
  }
  getSupplierTypes(bizId) {
    return this.inv.getSupplierTypes(bizId);
  }
  createSupplierType(bizId, d) {
    return this.inv.createSupplierType(bizId, d);
  }
  updateSupplierType(id, d) {
    return this.inv.updateSupplierType(id, d);
  }
  deleteSupplierType(id) {
    return this.inv.deleteSupplierType(id);
  }
  getWarehouses(bizId) {
    return this.inv.getWarehouses(bizId);
  }
  getWarehouse(id) {
    return this.inv.getWarehouse(id);
  }
  createWarehouse(bizId, d) {
    return this.inv.createWarehouse(bizId, d);
  }
  updateWarehouse(id, d) {
    return this.inv.updateWarehouse(id, d);
  }
  deleteWarehouse(id) {
    return this.inv.deleteWarehouse(id);
  }
  getWarehouseTypes(bizId) {
    return this.inv.getWarehouseTypes(bizId);
  }
  createWarehouseType(bizId, d) {
    return this.inv.createWarehouseType(bizId, d);
  }
  updateWarehouseType(id, d) {
    return this.inv.updateWarehouseType(id, d);
  }
  deleteWarehouseType(id) {
    return this.inv.deleteWarehouseType(id);
  }
  getWarehouseOperations(bizId, type, warehouseId) {
    return this.inv.getWarehouseOperations(bizId, type, warehouseId);
  }
  getWarehouseOperationsByWarehouse(bizId, warehouseId) {
    return this.inv.getWarehouseOperationsByWarehouse(bizId, warehouseId);
  }
  createWarehouseOperation(bizId, d) {
    return this.inv.createWarehouseOperation(bizId, d);
  }
  getWarehouseOperation(id) {
    return this.inv.getWarehouseOperation(id);
  }
  getWarehouseInventory(bizId, warehouseId) {
    return this.inv.getWarehouseInventory(bizId, warehouseId);
  }
  getInventoryItems(bizId) {
    return this.inv.getInventoryItems(bizId);
  }
  getInventoryItemTypes(bizId) {
    return this.inv.getInventoryItemTypes(bizId);
  }
  createInventoryItemType(bizId, d) {
    return this.inv.createInventoryItemType(bizId, d);
  }
  updateInventoryItemType(id, d) {
    return this.inv.updateInventoryItemType(id, d);
  }
  deleteInventoryItemType(id) {
    return this.inv.deleteInventoryItemType(id);
  }
  getStockLevels(bizId, warehouseId) {
    return this.inv.getStockLevels(bizId, warehouseId);
  }
  getStockAlerts(bizId) {
    return this.inv.getStockAlerts(bizId);
  }
  getStockValuation(bizId, warehouseId) {
    return this.inv.getStockValuation(bizId, warehouseId);
  }
  getItemMovements(bizId, itemId, limit) {
    return this.inv.getItemMovements(bizId, itemId, limit);
  }
  createStockMovement(bizId, data) {
    return this.inv.createStockMovement(bizId, data);
  }
  getPurchaseInvoices(bizId, status) {
    return this.inv.getPurchaseInvoices(bizId, status);
  }
  getPurchaseInvoice(bizId, id) {
    return this.inv.getPurchaseInvoice(bizId, id);
  }
  createPurchaseInvoice(bizId, data) {
    return this.inv.createPurchaseInvoice(bizId, data);
  }
  updatePurchaseInvoice(bizId, id, data) {
    return this.inv.updatePurchaseInvoice(bizId, id, data);
  }
  confirmPurchaseInvoice(bizId, id) {
    return this.inv.confirmPurchaseInvoice(bizId, id);
  }
  receivePurchaseInvoice(bizId, id, receivedItems) {
    return this.inv.receivePurchaseInvoice(bizId, id, receivedItems);
  }
  deletePurchaseInvoice(bizId, id) {
    return this.inv.deletePurchaseInvoice(bizId, id);
  }
  getOperationCategories(bizId, includeTypes = false) {
    return this.inv.getOperationCategories(bizId, includeTypes);
  }
  getOperationCategory(bizId, id) {
    return this.inv.getOperationCategory(bizId, id);
  }
  createOperationCategory(bizId, data) {
    return this.inv.createOperationCategory(bizId, data);
  }
  updateOperationCategory(bizId, id, data) {
    return this.inv.updateOperationCategory(bizId, id, data);
  }
  deleteOperationCategory(bizId, id) {
    return this.inv.deleteOperationCategory(bizId, id);
  }
  getOperationTypes(bizId, category, screen) {
    return this.inv.getOperationTypes(bizId, category, screen);
  }
  getOperationType(id) {
    return this.inv.getOperationType(id);
  }
  createOperationType(bizId, d) {
    return this.inv.createOperationType(bizId, d);
  }
  updateOperationType(id, d) {
    return this.inv.updateOperationType(id, d);
  }
  deleteOperationType(id) {
    return this.inv.deleteOperationType(id);
  }
  addOperationTypeAccount(otId, d) {
    return this.inv.addOperationTypeAccount(otId, d);
  }
  removeOperationTypeAccount(id) {
    return this.inv.removeOperationTypeAccount(id);
  }
  cloneOperationType(bizId, id, d) {
    return this.inv.cloneOperationType(bizId, id, d);
  }
  toggleOperationType(bizId, id) {
    return this.inv.toggleOperationType(bizId, id);
  }
  getOperationTypesStats(bizId) {
    return this.inv.getOperationTypesStats(bizId);
  }
  checkOperationTypeName(bizId, name, excludeId) {
    return this.inv.checkOperationTypeName(bizId, name, excludeId);
  }
  getExpenseCategories(bizId) {
    return this.inv.getExpenseCategories(bizId);
  }
  createExpenseCategory(bizId, d) {
    return this.inv.createExpenseCategory(bizId, d);
  }
  updateExpenseCategory(id, d) {
    return this.inv.updateExpenseCategory(id, d);
  }
  deleteExpenseCategory(id) {
    return this.inv.deleteExpenseCategory(id);
  }
  getExpenseBudget(bizId, month, year) {
    return this.inv.getExpenseBudget(bizId, month, year);
  }
  createExpenseBudget(bizId, d) {
    return this.inv.createExpenseBudget(bizId, d);
  }
  updateExpenseBudget(id, d) {
    return this.inv.updateExpenseBudget(id, d);
  }
  deleteExpenseBudget(id) {
    return this.inv.deleteExpenseBudget(id);
  }
  // ===================== الشاشات وسير العمل =====================
  getScreens(bizId) {
    return this.scr.getScreens(bizId);
  }
  createScreen(bizId, d) {
    return this.scr.createScreen(bizId, d);
  }
  updateScreen(id, d) {
    return this.scr.updateScreen(id, d);
  }
  deleteScreen(id) {
    return this.scr.deleteScreen(id);
  }
  cloneScreen(screenId, d) {
    return this.scr.cloneScreen(screenId, d);
  }
  getScreensWithWidgets(bizId) {
    return this.scr.getScreensWithWidgets(bizId);
  }
  getScreenWidgets(screenId) {
    return this.scr.getScreenWidgets(screenId);
  }
  createScreenWidget(screenId, d) {
    return this.scr.createScreenWidget(screenId, d);
  }
  updateWidget(id, d) {
    return this.scr.updateWidget(id, d);
  }
  deleteWidget(id) {
    return this.scr.deleteWidget(id);
  }
  batchUpdateWidgets(screenId, widgets) {
    return this.scr.batchUpdateWidgets(screenId, widgets);
  }
  copyWidgetToScreen(widgetId, targetScreenId) {
    return this.scr.copyWidgetToScreen(widgetId, targetScreenId);
  }
  getWidgetTemplates(widgetId) {
    return this.scr.getWidgetTemplates(widgetId);
  }
  addWidgetTemplate(widgetId, d) {
    return this.scr.addWidgetTemplate(widgetId, d);
  }
  removeWidgetTemplate(id) {
    return this.scr.removeWidgetTemplate(id);
  }
  getWidgetAccountLinks(widgetId) {
    return this.scr.getWidgetAccountLinks(widgetId);
  }
  addWidgetAccount(widgetId, d) {
    return this.scr.addWidgetAccount(widgetId, d);
  }
  removeWidgetAccount(id) {
    return this.scr.removeWidgetAccount(id);
  }
  getScreenPermissions(screenId) {
    return this.scr.getScreenPermissions(screenId);
  }
  setScreenPermissions(screenId, d) {
    return this.scr.setScreenPermissions(screenId, d);
  }
  getWidgetLogEnhanced(bizId, filters) {
    return this.scr.getWidgetLogEnhanced(bizId, filters);
  }
  getWidgetStatsEnhanced(bizId, period, dateFrom, dateTo) {
    return this.scr.getWidgetStatsEnhanced(bizId, period, dateFrom, dateTo);
  }
  getWidgetChartEnhanced(bizId, groupBy, months, dateFrom, dateTo) {
    return this.scr.getWidgetChartEnhanced(bizId, groupBy, months, dateFrom, dateTo);
  }
  getVoucherTransitions(bizId, voucherId) {
    return this.scr.getVoucherTransitions(bizId, voucherId);
  }
  executeVoucherTransition(bizId, voucherId, transitionId, note) {
    return this.scr.executeVoucherTransition(bizId, voucherId, transitionId, note);
  }
  getVoucherWorkflowHistory(bizId, voucherId) {
    return this.scr.getVoucherWorkflowHistory(bizId, voucherId);
  }
  setupDefaultWorkflow(bizId, opTypeId) {
    return this.scr.setupDefaultWorkflow(bizId, opTypeId);
  }
  getOperationTypeTransitions(bizId, opTypeId) {
    return this.scr.getOperationTypeTransitions(bizId, opTypeId);
  }
  addOperationTypeTransition(bizId, opTypeId, d) {
    return this.scr.addOperationTypeTransition(bizId, opTypeId, d);
  }
  deleteTransition(bizId, transitionId) {
    return this.scr.deleteTransition(bizId, transitionId);
  }
  getSidebarSections(bizId) {
    return this.scr.getSidebarSections(bizId);
  }
  createSidebarSection(bizId, d) {
    return this.scr.createSidebarSection(bizId, d);
  }
  updateSidebarSection(id, d) {
    return this.scr.updateSidebarSection(id, d);
  }
  deleteSidebarSection(id) {
    return this.scr.deleteSidebarSection(id);
  }
  getSidebarItems(bizId) {
    return this.scr.getSidebarItems(bizId);
  }
  createSidebarItem(d) {
    return this.scr.createSidebarItem(d);
  }
  updateSidebarItem(id, d) {
    return this.scr.updateSidebarItem(id, d);
  }
  deleteSidebarItem(id) {
    return this.scr.deleteSidebarItem(id);
  }
  getUserSidebar(bizId, userId) {
    return this.scr.getUserSidebar(bizId, userId);
  }
  updateUserSidebar(bizId, userId, d) {
    return this.scr.updateUserSidebar(bizId, userId, d);
  }
  copySidebarConfig(bizId, fromUserId, toUserId) {
    return this.scr.copySidebarConfig(bizId, fromUserId, toUserId);
  }
  resetSidebarConfig(bizId, userId) {
    return this.scr.resetSidebarConfig(bizId, userId);
  }
  getUsers() {
    return this.scr.getUsers();
  }
  getUiPages(bizId) {
    return this.scr.getUiPages(bizId);
  }
  getUiPageByKey(bizId, pageKey) {
    return this.scr.getUiPageByKey(bizId, pageKey);
  }
  getUiPage(bizId, pageId) {
    return this.scr.getUiPage(bizId, pageId);
  }
  createUiPage(bizId, d) {
    return this.scr.createUiPage(bizId, d);
  }
  updateUiPage(bizId, pageId, d) {
    return this.scr.updateUiPage(bizId, pageId, d);
  }
  deleteUiPage(bizId, pageId) {
    return this.scr.deleteUiPage(bizId, pageId);
  }
  addUiComponent(bizId, pageId, d) {
    return this.scr.addUiComponent(bizId, pageId, d);
  }
  updateUiComponent(bizId, componentId, d) {
    return this.scr.updateUiComponent(bizId, componentId, d);
  }
  deleteUiComponent(bizId, componentId) {
    return this.scr.deleteUiComponent(bizId, componentId);
  }
  getUiDataSources(bizId) {
    return this.scr.getUiDataSources(bizId);
  }
  createUiDataSource(bizId, d) {
    return this.scr.createUiDataSource(bizId, d);
  }
  updateUiDataSource(bizId, dsId, d) {
    return this.scr.updateUiDataSource(bizId, dsId, d);
  }
  deleteUiDataSource(bizId, dsId) {
    return this.scr.deleteUiDataSource(bizId, dsId);
  }
  executeUiDataSource(bizId, dsId, params) {
    return this.scr.executeUiDataSource(bizId, dsId, params);
  }
  getMonthlyRevenue(bizId, year) {
    return this.scr.getMonthlyRevenue(bizId, year);
  }
  getAggregatedProfitLoss(dateFrom, dateTo) {
    return this.scr.getAggregatedProfitLoss(dateFrom, dateTo);
  }
  getAggregatedSummary() {
    return this.scr.getAggregatedSummary();
  }
  // ===================== توافق خلفي (واجهات مطلوبة من الصفحات) =====================
  getAttachmentsArchiveSettings(bizId) {
    return this.request(`/businesses/${bizId}/attachments-archive-settings`);
  }
  browseAttachmentsArchiveFs(bizId, dirPath = "") {
    return this.request(`/businesses/${bizId}/attachments-archive-fs?dir=${encodeURIComponent(dirPath)}`);
  }
  createAttachmentsArchiveFolder(bizId, currentPath, folderName) {
    return this.request(`/businesses/${bizId}/attachments-archive-fs/mkdir`, {
      method: "POST",
      body: JSON.stringify({ currentPath, folderName })
    });
  }
  saveAttachmentsArchiveSettings(bizId, data) {
    return this.request(`/businesses/${bizId}/attachments-archive-settings`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  getAttachmentsArchiveItems(bizId, filters) {
    const q = new URLSearchParams(filters || {}).toString();
    return this.request(`/businesses/${bizId}/attachments-archive-items${q ? `?${q}` : ""}`);
  }
  rebuildAttachmentArchivePath(bizId, attachmentId, importance) {
    return this.request(`/businesses/${bizId}/attachments/${attachmentId}/rebuild-path`, { method: "POST" });
  }
  buildAttachmentsArchiveTree(bizId) {
    return this.request(`/businesses/${bizId}/attachments-archive-build`, { method: "POST" });
  }
  getCollectionStyleConfig(bizId, screenId) {
    return this.request(`/businesses/${bizId}/screens/${screenId}/collection-style`);
  }
  saveCollectionStyleConfig(bizId, screenId, data) {
    return this.request(`/businesses/${bizId}/screens/${screenId}/collection-style`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  getWidgetLog(bizId, filters) {
    return this.scr.getWidgetLogEnhanced(bizId, filters);
  }
  getWidgetStats(bizId, period, dateFrom, dateTo) {
    return this.scr.getWidgetStatsEnhanced(bizId, period, dateFrom, dateTo);
  }
  getWidgetChart(bizId, months = 6, groupBy = "month", dateFrom, dateTo) {
    return this.scr.getWidgetChartEnhanced(bizId, groupBy, months, dateFrom, dateTo);
  }
  getWidgetAccounts(bizId, accountIds) {
    const ids = (accountIds || []).join(",");
    return this.request(`/businesses/${bizId}/widgets/accounts?accountIds=${encodeURIComponent(ids)}`);
  }
  getCurrencies() {
    return this.request("/currencies");
  }
  batchUpdateScreenPermissions(screenId, permissions) {
    return this.request(`/screens/${screenId}/permissions/batch`, {
      method: "PUT",
      body: JSON.stringify({ permissions })
    });
  }
  addScreenToSidebar(bizId, screenId, data) {
    return this.request(`/businesses/${bizId}/sidebar/items/from-screen/${screenId}`, {
      method: "POST",
      body: JSON.stringify(data || {})
    });
  }
  getAccountStatement(bizId, accountId, dateFrom, dateTo, sourceType) {
    const q = new URLSearchParams(__spreadValues(__spreadValues(__spreadValues({}, dateFrom ? { dateFrom } : {}), dateTo ? { dateTo } : {}), sourceType ? { sourceType } : {})).toString();
    return this.request(`/businesses/${bizId}/accounts/${accountId}/statement${q ? `?${q}` : ""}`);
  }
  getExchangeRates(bizId) {
    return this.request(`/businesses/${bizId}/exchange-rates`);
  }
  createExchangeRate(bizId, data) {
    return this.request(`/businesses/${bizId}/exchange-rates`, { method: "POST", body: JSON.stringify(data) });
  }
  updateExchangeRate(bizId, id, data) {
    return this.request(`/businesses/${bizId}/exchange-rates/${id}`, { method: "PUT", body: JSON.stringify(data) });
  }
  deleteExchangeRate(bizId, id) {
    return this.request(`/businesses/${bizId}/exchange-rates/${id}`, { method: "DELETE" });
  }
  convertCurrency(bizId, amount, fromCurrencyId, toCurrencyId, date) {
    return this.request(`/businesses/${bizId}/exchange-rates/convert`, {
      method: "POST",
      body: JSON.stringify({ amount, fromCurrencyId, toCurrencyId, date })
    });
  }
  getProfitLossReport(bizId, dateFrom, dateTo) {
    const q = new URLSearchParams(__spreadValues(__spreadValues({}, dateFrom ? { dateFrom } : {}), dateTo ? { dateTo } : {})).toString();
    return this.request(`/businesses/${bizId}/reports/profit-loss${q ? `?${q}` : ""}`);
  }
  getDailySummary(bizId, date) {
    return this.request(`/businesses/${bizId}/reports/daily-summary?date=${encodeURIComponent(date)}`);
  }
  getTrialBalance(bizId, dateFrom, dateTo) {
    const q = new URLSearchParams(__spreadValues(__spreadValues({}, dateFrom ? { dateFrom } : {}), dateTo ? { dateTo } : {})).toString();
    return this.request(`/businesses/${bizId}/reports/trial-balance${q ? `?${q}` : ""}`);
  }
  getRoles(bizId) {
    return this.request(`/businesses/${bizId}/roles`);
  }
  getUserRoles(bizId) {
    return this.request(`/businesses/${bizId}/user-roles`);
  }
  createRole(bizId, data) {
    return this.request(`/businesses/${bizId}/roles`, { method: "POST", body: JSON.stringify(data) });
  }
  updateRole(bizId, id, data) {
    return this.request(`/businesses/${bizId}/roles/${id}`, { method: "PUT", body: JSON.stringify(data) });
  }
  deleteRole(bizId, id) {
    return this.request(`/businesses/${bizId}/roles/${id}`, { method: "DELETE" });
  }
  assignUserRole(bizId, data) {
    return this.request(`/businesses/${bizId}/user-roles`, { method: "POST", body: JSON.stringify(data) });
  }
  removeUserRole(bizId, userId) {
    return this.request(`/businesses/${bizId}/user-roles/${userId}`, { method: "DELETE" });
  }
  getVouchersEnhanced(bizId, filters) {
    return this.getVouchersAdvanced(bizId, filters);
  }
  getAttachments(entityType, entityId) {
    return this.request(`/attachments?entityType=${encodeURIComponent(entityType)}&entityId=${entityId}`);
  }
  uploadAttachment(bizId, data) {
    return this.request(`/businesses/${bizId}/attachments`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  deleteAttachment(bizId, id) {
    return this.request(`/businesses/${bizId}/attachments/${id}`, { method: "DELETE" });
  }
  static \u0275fac = function ApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ApiService
};
//# sourceMappingURL=chunk-MSEJWZ7D.js.map
