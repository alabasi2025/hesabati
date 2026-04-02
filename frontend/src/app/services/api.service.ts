/**
 * ApiService — Facade رئيسي يجمع كل خدمات API
 *
 * Phase 3: تم تقسيم الـ 867 سطر إلى 6 ملفات متخصصة:
 *   - base-api.service.ts     — HTTP core + error handling
 *   - business-api.service.ts — businesses, stations, dashboard
 *   - employee-api.service.ts — employees, salaries, billing config
 *   - account-api.service.ts  — accounts, funds, partners, pending
 *   - voucher-api.service.ts  — vouchers, collections, journal, custody
 *   - inventory-api.service.ts — warehouses, items, operations, purchases
 *   - screen-api.service.ts   — screens, widgets, workflow, sidebar, reports
 *
 * هذا الـ Facade يبقي التوافق الكامل مع كل الصفحات الحالية
 * لا حاجة لتغيير أي import في الصفحات
 */
import { Injectable, inject } from '@angular/core';
import { BaseApiService } from './api/base-api.service';
import { BusinessApiService } from './api/business-api.service';
import { EmployeeApiService } from './api/employee-api.service';
import { AccountApiService } from './api/account-api.service';
import { VoucherApiService } from './api/voucher-api.service';
import { InventoryApiService } from './api/inventory-api.service';
import { ScreenApiService } from './api/screen-api.service';
import type {
  BusinessPayload,
  StationPayload,
  EmployeePayload,
  AccountPayload,
  FundPayload,
  VoucherPayload,
  VoucherFilters,
  ScreenPayload,
  SidebarSectionPayload,
  SidebarItemPayload,
} from '../shared/types/api.types';

export type { DashboardStats, Business } from './api/base-api.service';
export type {
  BusinessPayload,
  StationPayload,
  EmployeePayload,
  AccountPayload,
  FundPayload,
  VoucherPayload,
  VoucherFilters,
  ScreenPayload,
  SidebarSectionPayload,
  SidebarItemPayload,
} from '../shared/types/api.types';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = inject(BaseApiService);
  private readonly biz = inject(BusinessApiService);
  private readonly emp = inject(EmployeeApiService);
  private readonly acc = inject(AccountApiService);
  private readonly vou = inject(VoucherApiService);
  private readonly inv = inject(InventoryApiService);
  private readonly scr = inject(ScreenApiService);

  // ── generic request (used by pages that call api.request directly) ──
  request<T>(path: string, options?: RequestInit): Promise<T> {
    return this.base.request<T>(path, options);
  }

  // ===================== Dashboard =====================
  getDashboardStats() {
    return this.biz.getDashboardStats();
  }

  // ===================== الأعمال =====================
  getBusinesses() {
    return this.biz.getBusinesses();
  }
  getBusiness(id: number) {
    return this.biz.getBusiness(id);
  }
  createBusiness(d: BusinessPayload) {
    return this.biz.createBusiness(d);
  }
  updateBusiness(id: number, d: Partial<BusinessPayload>) {
    return this.biz.updateBusiness(id, d);
  }
  deleteBusiness(id: number) {
    return this.biz.deleteBusiness(id);
  }

  // ===================== المحطات =====================
  getStations(bizId: number) {
    return this.biz.getStations(bizId);
  }
  getStation(bizId: number, id: number) {
    return this.biz.getStation(bizId, id);
  }
  createStation(bizId: number, d: StationPayload) {
    return this.biz.createStation(bizId, d);
  }
  updateStation(id: number, d: Partial<StationPayload>) {
    return this.biz.updateStation(id, d);
  }
  updateStationByBiz(bizId: number, id: number, d: Partial<StationPayload>) {
    return this.biz.updateStationByBiz(bizId, id, d);
  }
  deleteStation(bizId: number, id: number) {
    return this.biz.deleteStation(bizId, id);
  }
  checkDbHealth() {
    return this.biz.checkDbHealth();
  }

  // ===================== الموظفين =====================
  getEmployees(bizId: number) {
    return this.emp.getEmployees(bizId);
  }
  createEmployee(bizId: number, d: EmployeePayload) {
    return this.emp.createEmployee(bizId, d);
  }
  updateEmployee(id: number, d: Partial<EmployeePayload>) {
    return this.emp.updateEmployee(id, d);
  }
  deleteEmployee(id: number) {
    return this.emp.deleteEmployee(id);
  }
  getEmployeeBillingAccounts(bizId: number, stationId?: number) {
    return this.emp.getEmployeeBillingAccounts(bizId, stationId);
  }
  createEmployeeBillingAccount(d: any) {
    return this.emp.createEmployeeBillingAccount(d);
  }
  updateEmployeeBillingAccount(id: number, d: any) {
    return this.emp.updateEmployeeBillingAccount(id, d);
  }
  deleteEmployeeBillingAccount(id: number) {
    return this.emp.deleteEmployeeBillingAccount(id);
  }
  getDepartments(bizId: number) {
    return this.emp.getDepartments(bizId);
  }
  createDepartment(bizId: number, d: any) {
    return this.emp.createDepartment(bizId, d);
  }
  updateDepartment(id: number, d: any) {
    return this.emp.updateDepartment(id, d);
  }
  deleteDepartment(id: number) {
    return this.emp.deleteDepartment(id);
  }
  getJobTitles(bizId: number) {
    return this.emp.getJobTitles(bizId);
  }
  createJobTitle(bizId: number, d: any) {
    return this.emp.createJobTitle(bizId, d);
  }
  updateJobTitle(id: number, d: any) {
    return this.emp.updateJobTitle(id, d);
  }
  deleteJobTitle(id: number) {
    return this.emp.deleteJobTitle(id);
  }
  getSalaryRecords(bizId: number, month?: number, year?: number) {
    return this.emp.getSalaryRecords(bizId, month, year);
  }
  createSalaryRecord(bizId: number, d: any) {
    return this.emp.createSalaryRecord(bizId, d);
  }
  updateSalaryRecord(id: number, d: any) {
    return this.emp.updateSalaryRecord(id, d);
  }
  deleteSalaryRecord(id: number) {
    return this.emp.deleteSalaryRecord(id);
  }
  getBillingSystemsConfig(bizId: number) {
    return this.emp.getBillingSystemsConfig(bizId);
  }
  createBillingSystemConfig(bizId: number, d: any) {
    return this.emp.createBillingSystemConfig(bizId, d);
  }
  updateBillingSystemConfig(id: number, d: any) {
    return this.emp.updateBillingSystemConfig(id, d);
  }
  deleteBillingSystemConfig(id: number) {
    return this.emp.deleteBillingSystemConfig(id);
  }
  getBillingAccountTypes(bizId: number) {
    return this.emp.getBillingAccountTypes(bizId);
  }
  createBillingAccountType(bizId: number, d: any) {
    return this.emp.createBillingAccountType(bizId, d);
  }
  updateBillingAccountType(id: number, d: any) {
    return this.emp.updateBillingAccountType(id, d);
  }
  deleteBillingAccountType(id: number) {
    return this.emp.deleteBillingAccountType(id);
  }

  // ===================== الحسابات =====================
  getAccounts(bizId: number) {
    return this.acc.getAccounts(bizId);
  }
  getAllAccounts(bizId: number) {
    return this.acc.getAllAccounts(bizId);
  }
  getCustodyAccounts(bizId: number) {
    return this.acc.getCustodyAccounts(bizId);
  }
  getIntermediaryAccounts(bizId: number) {
    return this.acc.getIntermediaryAccounts(bizId);
  }
  getPendingAccountsList(bizId: number) {
    return this.acc.getPendingAccountsList(bizId);
  }
  createAccount(bizId: number, d: AccountPayload) {
    return this.acc.createAccount(bizId, d);
  }
  updateAccount(bizId: number, id: number, d: Partial<AccountPayload>) {
    return this.acc.updateAccount(bizId, id, d);
  }
  deleteAccount(bizId: number, id: number) {
    return this.acc.deleteAccount(bizId, id);
  }
  getAccountBalance(bizId: number, accountId: number) {
    return this.acc.getAccountBalance(bizId, accountId);
  }
  getAccountSubNatures(bizId: number) {
    return this.acc.getAccountSubNatures(bizId);
  }
  createAccountSubNature(bizId: number, d: any) {
    return this.acc.createAccountSubNature(bizId, d);
  }
  updateAccountSubNature(bizId: number, id: number, d: any) {
    return this.acc.updateAccountSubNature(bizId, id, d);
  }
  deleteAccountSubNature(bizId: number, id: number) {
    return this.acc.deleteAccountSubNature(bizId, id);
  }
  getAccountLinks(accountId: number) {
    return this.acc.getAccountLinks(accountId);
  }
  getAccountAllowedTargets(accountId: number, type: string) {
    return this.acc.getAccountAllowedTargets(accountId, type);
  }
  createAccountLink(d: any) {
    return this.acc.createAccountLink(d);
  }
  deleteAccountLink(id: number) {
    return this.acc.deleteAccountLink(id);
  }
  getFunds(bizId: number, includeCustody = false) {
    return this.acc.getFunds(bizId, includeCustody);
  }
  getFund(id: number) {
    return this.acc.getFund(id);
  }
  createFund(bizId: number, d: FundPayload) {
    return this.acc.createFund(bizId, d);
  }
  updateFund(bizId: number, id: number, d: Partial<FundPayload>) {
    return this.acc.updateFund(bizId, id, d);
  }
  deleteFund(bizId: number, id: number) {
    return this.acc.deleteFund(bizId, id);
  }
  getFundTypes(bizId: number) {
    return this.acc.getFundTypes(bizId);
  }
  createFundType(bizId: number, d: any) {
    return this.acc.createFundType(bizId, d);
  }
  updateFundType(id: number, d: any) {
    return this.acc.updateFundType(id, d);
  }
  deleteFundType(id: number) {
    return this.acc.deleteFundType(id);
  }
  getBanks(bizId: number) {
    return this.acc.getBanks(bizId);
  }
  createBank(bizId: number, d: any) {
    return this.acc.createBank(bizId, d);
  }
  updateBank(bizId: number, id: number, d: any) {
    return this.acc.updateBank(bizId, id, d);
  }
  deleteBank(bizId: number, id: number) {
    return this.acc.deleteBank(bizId, id);
  }
  getWallets(bizId: number) {
    return this.acc.getWallets(bizId);
  }
  createWallet(bizId: number, d: any) {
    return this.acc.createWallet(bizId, d);
  }
  updateWallet(bizId: number, id: number, d: any) {
    return this.acc.updateWallet(bizId, id, d);
  }
  deleteWallet(bizId: number, id: number) {
    return this.acc.deleteWallet(bizId, id);
  }
  getExchanges(bizId: number) {
    return this.acc.getExchanges(bizId);
  }
  createExchange(bizId: number, d: any) {
    return this.acc.createExchange(bizId, d);
  }
  updateExchange(bizId: number, id: number, d: any) {
    return this.acc.updateExchange(bizId, id, d);
  }
  deleteExchange(bizId: number, id: number) {
    return this.acc.deleteExchange(bizId, id);
  }
  getBankTypes(bizId: number) {
    return this.acc.getBankTypes(bizId);
  }
  createBankType(bizId: number, d: any) {
    return this.acc.createBankType(bizId, d);
  }
  updateBankType(id: number, d: any) {
    return this.acc.updateBankType(id, d);
  }
  deleteBankType(id: number) {
    return this.acc.deleteBankType(id);
  }
  getExchangeTypes(bizId: number) {
    return this.acc.getExchangeTypes(bizId);
  }
  createExchangeType(bizId: number, d: any) {
    return this.acc.createExchangeType(bizId, d);
  }
  updateExchangeType(id: number, d: any) {
    return this.acc.updateExchangeType(id, d);
  }
  deleteExchangeType(id: number) {
    return this.acc.deleteExchangeType(id);
  }
  getEWalletTypes(bizId: number) {
    return this.acc.getEWalletTypes(bizId);
  }
  createEWalletType(bizId: number, d: any) {
    return this.acc.createEWalletType(bizId, d);
  }
  updateEWalletType(id: number, d: any) {
    return this.acc.updateEWalletType(id, d);
  }
  deleteEWalletType(id: number) {
    return this.acc.deleteEWalletType(id);
  }
  getAccountingMainTypes(bizId: number) {
    return this.acc.getAccountingMainTypes(bizId);
  }
  createAccountingMainType(bizId: number, d: any) {
    return this.acc.createAccountingMainType(bizId, d);
  }
  updateAccountingMainType(bizId: number, id: number, d: any) {
    return this.acc.updateAccountingMainType(bizId, id, d);
  }
  deleteAccountingMainType(bizId: number, id: number) {
    return this.acc.deleteAccountingMainType(bizId, id);
  }
  getAccountingTypes(bizId: number) {
    return this.acc.getAccountingTypes(bizId);
  }
  createAccountingType(bizId: number, d: any) {
    return this.acc.createAccountingType(bizId, d);
  }
  updateAccountingType(bizId: number, id: number, d: any) {
    return this.acc.updateAccountingType(bizId, id, d);
  }
  deleteAccountingType(bizId: number, id: number) {
    return this.acc.deleteAccountingType(bizId, id);
  }
  getPendingAccounts(bizId: number) {
    return this.acc.getPendingAccounts(bizId);
  }
  createPendingAccount(bizId: number, d: any) {
    return this.acc.createPendingAccount(bizId, d);
  }
  updatePendingAccount(id: number, d: any) {
    return this.acc.updatePendingAccount(id, d);
  }
  deletePendingAccount(id: number) {
    return this.acc.deletePendingAccount(id);
  }
  getPartners(bizId: number) {
    return this.acc.getPartners(bizId);
  }
  createPartner(bizId: number, d: any) {
    return this.acc.createPartner(bizId, d);
  }
  updatePartner(id: number, d: any) {
    return this.acc.updatePartner(id, d);
  }
  deletePartner(id: number) {
    return this.acc.deletePartner(id);
  }

  // ===================== السندات =====================
  getVouchers(bizId: number, type?: string) {
    return this.vou.getVouchers(bizId, type);
  }
  createVoucher(bizId: number, d: VoucherPayload) {
    return this.vou.createVoucher(bizId, d);
  }
  createVoucherMulti(bizId: number, d: VoucherPayload) {
    return this.vou.createVoucherMulti(bizId, d);
  }
  createVoucherDraft(bizId: number, d: VoucherPayload) {
    return this.vou.createVoucherDraft(bizId, d);
  }
  deleteVoucher(id: number) {
    return this.vou.deleteVoucher(id);
  }
  getVoucherNumberPreview(
    bizId: number,
    params: {
      voucherType: 'receipt' | 'payment';
      voucherDate?: string | null;
      fromAccountId?: number | null;
      toAccountId?: number | null;
      fromFundId?: number | null;
      toFundId?: number | null;
    },
  ) {
    return this.vou.getVoucherNumberPreview(bizId, params);
  }
  getVouchersAdvanced(bizId: number, filters?: VoucherFilters) {
    return this.vou.getVouchersAdvanced(bizId, filters);
  }
  updateVoucher(bizId: number, id: number, d: Partial<VoucherPayload>) {
    return this.vou.updateVoucher(bizId, id, d);
  }
  changeVoucherStatus(bizId: number, id: number, status: string) {
    return this.vou.changeVoucherStatus(bizId, id, status);
  }
  getVoucherDetails(bizId: number, id: number) {
    return this.vou.getVoucherDetails(bizId, id);
  }
  getVoucherCategories(bizId: number) {
    return this.vou.getVoucherCategories(bizId);
  }
  getCollections(bizId: number, stationId?: number, date?: string) {
    return this.vou.getCollections(bizId, stationId, date);
  }
  getCollection(id: number) {
    return this.vou.getCollection(id);
  }
  createCollection(bizId: number, d: any) {
    return this.vou.createCollection(bizId, d);
  }
  createDelivery(collectionId: number, d: any) {
    return this.vou.createDelivery(collectionId, d);
  }
  getSettlements(bizId: number) {
    return this.vou.getSettlements(bizId);
  }
  createSettlement(bizId: number, d: any) {
    return this.vou.createSettlement(bizId, d);
  }
  updateSettlement(id: number, d: any) {
    return this.vou.updateSettlement(id, d);
  }
  deleteSettlement(id: number) {
    return this.vou.deleteSettlement(id);
  }
  getJournalEntries(bizId: number) {
    return this.vou.getJournalEntries(bizId);
  }
  createJournalEntry(bizId: number, d: any) {
    return this.vou.createJournalEntry(bizId, d);
  }
  deleteJournalEntry(id: number) {
    return this.vou.deleteJournalEntry(id);
  }
  getJournalEntryCategories(bizId: number) {
    return this.vou.getJournalEntryCategories(bizId);
  }
  createJournalEntryCategory(bizId: number, d: any) {
    return this.vou.createJournalEntryCategory(bizId, d);
  }
  updateJournalEntryCategory(id: number, d: any) {
    return this.vou.updateJournalEntryCategory(id, d);
  }
  deleteJournalEntryCategory(id: number) {
    return this.vou.deleteJournalEntryCategory(id);
  }
  getReconciliations(bizId: number) {
    return this.vou.getReconciliations(bizId);
  }
  getReconciliation(bizId: number, id: number) {
    return this.vou.getReconciliation(bizId, id);
  }
  createReconciliation(bizId: number, d: any) {
    return this.vou.createReconciliation(bizId, d);
  }
  updateReconciliation(bizId: number, id: number, d: any) {
    return this.vou.updateReconciliation(bizId, id, d);
  }
  getCustodyRecords(bizId: number) {
    return this.vou.getCustodyRecords(bizId);
  }
  getCustodyRecord(bizId: number, id: number) {
    return this.vou.getCustodyRecord(bizId, id);
  }
  createCustodyRecord(bizId: number, d: any) {
    return this.vou.createCustodyRecord(bizId, d);
  }
  updateCustodyRecord(bizId: number, id: number, d: any) {
    return this.vou.updateCustodyRecord(bizId, id, d);
  }
  deleteCustodyRecord(bizId: number, id: number) {
    return this.vou.deleteCustodyRecord(bizId, id);
  }
  addCustodySettlement(bizId: number, custodyId: number, d: any) {
    return this.vou.addCustodySettlement(bizId, custodyId, d);
  }

  // ===================== المخازن والموردين =====================
  getSuppliers(bizId: number) {
    return this.inv.getSuppliers(bizId);
  }
  createSupplier(bizId: number, d: any) {
    return this.inv.createSupplier(bizId, d);
  }
  updateSupplier(id: number, d: any) {
    return this.inv.updateSupplier(id, d);
  }
  deleteSupplier(id: number) {
    return this.inv.deleteSupplier(id);
  }
  getSupplierTypes(bizId: number) {
    return this.inv.getSupplierTypes(bizId);
  }
  createSupplierType(bizId: number, d: any) {
    return this.inv.createSupplierType(bizId, d);
  }
  updateSupplierType(id: number, d: any) {
    return this.inv.updateSupplierType(id, d);
  }
  deleteSupplierType(id: number) {
    return this.inv.deleteSupplierType(id);
  }
  getWarehouses(bizId: number) {
    return this.inv.getWarehouses(bizId);
  }
  getWarehouse(id: number) {
    return this.inv.getWarehouse(id);
  }
  createWarehouse(bizId: number, d: any) {
    return this.inv.createWarehouse(bizId, d);
  }
  updateWarehouse(id: number, d: any) {
    return this.inv.updateWarehouse(id, d);
  }
  deleteWarehouse(id: number) {
    return this.inv.deleteWarehouse(id);
  }
  getWarehouseTypes(bizId: number) {
    return this.inv.getWarehouseTypes(bizId);
  }
  createWarehouseType(bizId: number, d: any) {
    return this.inv.createWarehouseType(bizId, d);
  }
  updateWarehouseType(id: number, d: any) {
    return this.inv.updateWarehouseType(id, d);
  }
  deleteWarehouseType(id: number) {
    return this.inv.deleteWarehouseType(id);
  }
  getWarehouseOperations(bizId: number, type?: string, warehouseId?: number) {
    return this.inv.getWarehouseOperations(bizId, type, warehouseId);
  }
  getWarehouseOperationsByWarehouse(bizId: number, warehouseId: number) {
    return this.inv.getWarehouseOperationsByWarehouse(bizId, warehouseId);
  }
  createWarehouseOperation(bizId: number, d: any) {
    return this.inv.createWarehouseOperation(bizId, d);
  }
  getWarehouseOperation(id: number) {
    return this.inv.getWarehouseOperation(id);
  }
  getWarehouseInventory(bizId: number, warehouseId: number) {
    return this.inv.getWarehouseInventory(bizId, warehouseId);
  }
  getInventoryItems(bizId: number) {
    return this.inv.getInventoryItems(bizId);
  }
  getInventoryItemTypes(bizId: number) {
    return this.inv.getInventoryItemTypes(bizId);
  }
  createInventoryItemType(bizId: number, d: any) {
    return this.inv.createInventoryItemType(bizId, d);
  }
  updateInventoryItemType(id: number, d: any) {
    return this.inv.updateInventoryItemType(id, d);
  }
  deleteInventoryItemType(id: number) {
    return this.inv.deleteInventoryItemType(id);
  }
  getStockLevels(bizId: number, warehouseId?: number) {
    return this.inv.getStockLevels(bizId, warehouseId);
  }
  getStockAlerts(bizId: number) {
    return this.inv.getStockAlerts(bizId);
  }
  getStockValuation(bizId: number, warehouseId?: number) {
    return this.inv.getStockValuation(bizId, warehouseId);
  }
  getItemMovements(bizId: number, itemId: number, limit?: number) {
    return this.inv.getItemMovements(bizId, itemId, limit);
  }
  createStockMovement(bizId: number, data: any) {
    return this.inv.createStockMovement(bizId, data);
  }
  getPurchaseInvoices(bizId: number, status?: string) {
    return this.inv.getPurchaseInvoices(bizId, status);
  }
  getPurchaseInvoice(bizId: number, id: number) {
    return this.inv.getPurchaseInvoice(bizId, id);
  }
  createPurchaseInvoice(bizId: number, data: any) {
    return this.inv.createPurchaseInvoice(bizId, data);
  }
  updatePurchaseInvoice(bizId: number, id: number, data: any) {
    return this.inv.updatePurchaseInvoice(bizId, id, data);
  }
  confirmPurchaseInvoice(bizId: number, id: number) {
    return this.inv.confirmPurchaseInvoice(bizId, id);
  }
  receivePurchaseInvoice(bizId: number, id: number, receivedItems: any[]) {
    return this.inv.receivePurchaseInvoice(bizId, id, receivedItems);
  }
  deletePurchaseInvoice(bizId: number, id: number) {
    return this.inv.deletePurchaseInvoice(bizId, id);
  }
  getOperationCategories(bizId: number, includeTypes = false) {
    return this.inv.getOperationCategories(bizId, includeTypes);
  }
  getOperationCategory(bizId: number, id: number) {
    return this.inv.getOperationCategory(bizId, id);
  }
  createOperationCategory(bizId: number, data: any) {
    return this.inv.createOperationCategory(bizId, data);
  }
  updateOperationCategory(bizId: number, id: number, data: any) {
    return this.inv.updateOperationCategory(bizId, id, data);
  }
  deleteOperationCategory(bizId: number, id: number) {
    return this.inv.deleteOperationCategory(bizId, id);
  }
  getOperationTypes(bizId: number, category?: string, screen?: string) {
    return this.inv.getOperationTypes(bizId, category, screen);
  }
  getOperationType(id: number) {
    return this.inv.getOperationType(id);
  }
  createOperationType(bizId: number, d: any) {
    return this.inv.createOperationType(bizId, d);
  }
  updateOperationType(id: number, d: any) {
    return this.inv.updateOperationType(id, d);
  }
  deleteOperationType(id: number) {
    return this.inv.deleteOperationType(id);
  }
  addOperationTypeAccount(otId: number, d: any) {
    return this.inv.addOperationTypeAccount(otId, d);
  }
  removeOperationTypeAccount(id: number) {
    return this.inv.removeOperationTypeAccount(id);
  }
  cloneOperationType(bizId: number, id: number, d?: any) {
    return this.inv.cloneOperationType(bizId, id, d);
  }
  toggleOperationType(bizId: number, id: number) {
    return this.inv.toggleOperationType(bizId, id);
  }
  getOperationTypesStats(bizId: number) {
    return this.inv.getOperationTypesStats(bizId);
  }
  checkOperationTypeName(bizId: number, name: string, excludeId?: number) {
    return this.inv.checkOperationTypeName(bizId, name, excludeId);
  }
  getExpenseCategories(bizId: number) {
    return this.inv.getExpenseCategories(bizId);
  }
  createExpenseCategory(bizId: number, d: any) {
    return this.inv.createExpenseCategory(bizId, d);
  }
  updateExpenseCategory(id: number, d: any) {
    return this.inv.updateExpenseCategory(id, d);
  }
  deleteExpenseCategory(id: number) {
    return this.inv.deleteExpenseCategory(id);
  }
  getExpenseBudget(bizId: number, month?: number, year?: number) {
    return this.inv.getExpenseBudget(bizId, month, year);
  }
  createExpenseBudget(bizId: number, d: any) {
    return this.inv.createExpenseBudget(bizId, d);
  }
  updateExpenseBudget(id: number, d: any) {
    return this.inv.updateExpenseBudget(id, d);
  }
  deleteExpenseBudget(id: number) {
    return this.inv.deleteExpenseBudget(id);
  }

  // ===================== الشاشات وسير العمل =====================
  getScreens(bizId: number) {
    return this.scr.getScreens(bizId);
  }
  createScreen(bizId: number, d: ScreenPayload) {
    return this.scr.createScreen(bizId, d);
  }
  updateScreen(id: number, d: Partial<ScreenPayload>) {
    return this.scr.updateScreen(id, d);
  }
  deleteScreen(id: number) {
    return this.scr.deleteScreen(id);
  }
  cloneScreen(screenId: number, d: any) {
    return this.scr.cloneScreen(screenId, d);
  }
  getScreensWithWidgets(bizId: number) {
    return this.scr.getScreensWithWidgets(bizId);
  }
  getScreenWidgets(screenId: number) {
    return this.scr.getScreenWidgets(screenId);
  }
  createScreenWidget(screenId: number, d: any) {
    return this.scr.createScreenWidget(screenId, d);
  }
  updateWidget(id: number, d: any) {
    return this.scr.updateWidget(id, d);
  }
  deleteWidget(id: number) {
    return this.scr.deleteWidget(id);
  }
  batchUpdateWidgets(screenId: number, widgets: any[]) {
    return this.scr.batchUpdateWidgets(screenId, widgets);
  }
  copyWidgetToScreen(widgetId: number, targetScreenId: number) {
    return this.scr.copyWidgetToScreen(widgetId, targetScreenId);
  }
  getWidgetTemplates(widgetId: number) {
    return this.scr.getWidgetTemplates(widgetId);
  }
  addWidgetTemplate(widgetId: number, d: any) {
    return this.scr.addWidgetTemplate(widgetId, d);
  }
  removeWidgetTemplate(id: number) {
    return this.scr.removeWidgetTemplate(id);
  }
  getWidgetAccountLinks(widgetId: number) {
    return this.scr.getWidgetAccountLinks(widgetId);
  }
  addWidgetAccount(widgetId: number, d: any) {
    return this.scr.addWidgetAccount(widgetId, d);
  }
  removeWidgetAccount(id: number) {
    return this.scr.removeWidgetAccount(id);
  }
  getScreenPermissions(screenId: number) {
    return this.scr.getScreenPermissions(screenId);
  }
  setScreenPermissions(screenId: number, d: any) {
    return this.scr.setScreenPermissions(screenId, d);
  }
  getWidgetLogEnhanced(bizId: number, filters?: any) {
    return this.scr.getWidgetLogEnhanced(bizId, filters);
  }
  getWidgetStatsEnhanced(bizId: number, period?: string, dateFrom?: string, dateTo?: string) {
    return this.scr.getWidgetStatsEnhanced(bizId, period, dateFrom, dateTo);
  }
  getWidgetChartEnhanced(
    bizId: number,
    groupBy?: string,
    months?: number,
    dateFrom?: string,
    dateTo?: string,
  ) {
    return this.scr.getWidgetChartEnhanced(bizId, groupBy, months, dateFrom, dateTo);
  }
  getVoucherTransitions(bizId: number, voucherId: number) {
    return this.scr.getVoucherTransitions(bizId, voucherId);
  }
  executeVoucherTransition(bizId: number, voucherId: number, transitionId: number, note?: string) {
    return this.scr.executeVoucherTransition(bizId, voucherId, transitionId, note);
  }
  getVoucherWorkflowHistory(bizId: number, voucherId: number) {
    return this.scr.getVoucherWorkflowHistory(bizId, voucherId);
  }
  setupDefaultWorkflow(bizId: number, opTypeId: number) {
    return this.scr.setupDefaultWorkflow(bizId, opTypeId);
  }
  getOperationTypeTransitions(bizId: number, opTypeId: number) {
    return this.scr.getOperationTypeTransitions(bizId, opTypeId);
  }
  addOperationTypeTransition(bizId: number, opTypeId: number, d: any) {
    return this.scr.addOperationTypeTransition(bizId, opTypeId, d);
  }
  deleteTransition(bizId: number, transitionId: number) {
    return this.scr.deleteTransition(bizId, transitionId);
  }
  getSidebarSections(bizId: number) {
    return this.scr.getSidebarSections(bizId);
  }
  createSidebarSection(bizId: number, d: SidebarSectionPayload) {
    return this.scr.createSidebarSection(bizId, d);
  }
  updateSidebarSection(id: number, d: Partial<SidebarSectionPayload>) {
    return this.scr.updateSidebarSection(id, d);
  }
  deleteSidebarSection(id: number) {
    return this.scr.deleteSidebarSection(id);
  }
  getSidebarItems(bizId: number) {
    return this.scr.getSidebarItems(bizId);
  }
  createSidebarItem(d: SidebarItemPayload) {
    return this.scr.createSidebarItem(d);
  }
  updateSidebarItem(id: number, d: Partial<SidebarItemPayload>) {
    return this.scr.updateSidebarItem(id, d);
  }
  deleteSidebarItem(id: number) {
    return this.scr.deleteSidebarItem(id);
  }
  getUserSidebar(bizId: number, userId: number) {
    return this.scr.getUserSidebar(bizId, userId);
  }
  updateUserSidebar(bizId: number, userId: number, d: any) {
    return this.scr.updateUserSidebar(bizId, userId, d);
  }
  copySidebarConfig(bizId: number, fromUserId: number, toUserId: number) {
    return this.scr.copySidebarConfig(bizId, fromUserId, toUserId);
  }
  resetSidebarConfig(bizId: number, userId: number) {
    return this.scr.resetSidebarConfig(bizId, userId);
  }
  getUsers() {
    return this.scr.getUsers();
  }
  getUiPages(bizId: number) {
    return this.scr.getUiPages(bizId);
  }
  getUiPageByKey(bizId: number, pageKey: string) {
    return this.scr.getUiPageByKey(bizId, pageKey);
  }
  getUiPage(bizId: number, pageId: number) {
    return this.scr.getUiPage(bizId, pageId);
  }
  createUiPage(bizId: number, d: any) {
    return this.scr.createUiPage(bizId, d);
  }
  updateUiPage(bizId: number, pageId: number, d: any) {
    return this.scr.updateUiPage(bizId, pageId, d);
  }
  deleteUiPage(bizId: number, pageId: number) {
    return this.scr.deleteUiPage(bizId, pageId);
  }
  addUiComponent(bizId: number, pageId: number, d: any) {
    return this.scr.addUiComponent(bizId, pageId, d);
  }
  updateUiComponent(bizId: number, componentId: number, d: any) {
    return this.scr.updateUiComponent(bizId, componentId, d);
  }
  deleteUiComponent(bizId: number, componentId: number) {
    return this.scr.deleteUiComponent(bizId, componentId);
  }
  getUiDataSources(bizId: number) {
    return this.scr.getUiDataSources(bizId);
  }
  createUiDataSource(bizId: number, d: any) {
    return this.scr.createUiDataSource(bizId, d);
  }
  updateUiDataSource(bizId: number, dsId: number, d: any) {
    return this.scr.updateUiDataSource(bizId, dsId, d);
  }
  deleteUiDataSource(bizId: number, dsId: number) {
    return this.scr.deleteUiDataSource(bizId, dsId);
  }
  executeUiDataSource(bizId: number, dsId: number, params?: any) {
    return this.scr.executeUiDataSource(bizId, dsId, params);
  }
  getMonthlyRevenue(bizId: number, year?: number) {
    return this.scr.getMonthlyRevenue(bizId, year);
  }
  getAggregatedProfitLoss(dateFrom?: string, dateTo?: string) {
    return this.scr.getAggregatedProfitLoss(dateFrom, dateTo);
  }
  getAggregatedSummary() {
    return this.scr.getAggregatedSummary();
  }

  // ===================== توافق خلفي (واجهات مطلوبة من الصفحات) =====================
  getAttachmentsArchiveSettings(bizId: number) {
    return this.request<any>(`/businesses/${bizId}/attachments-archive-settings`);
  }
  browseAttachmentsArchiveFs(bizId: number, dirPath = '') {
    return this.request<any>(
      `/businesses/${bizId}/attachments-archive-fs?dir=${encodeURIComponent(dirPath)}`,
    );
  }
  createAttachmentsArchiveFolder(bizId: number, currentPath: string, folderName: string) {
    return this.request<any>(`/businesses/${bizId}/attachments-archive-fs/mkdir`, {
      method: 'POST',
      body: JSON.stringify({ currentPath, folderName }),
    });
  }
  saveAttachmentsArchiveSettings(bizId: number, data: any) {
    return this.request<any>(`/businesses/${bizId}/attachments-archive-settings`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  getAttachmentsArchiveItems(bizId: number, filters?: any) {
    const q = new URLSearchParams(filters || {}).toString();
    return this.request<any>(`/businesses/${bizId}/attachments-archive-items${q ? `?${q}` : ''}`);
  }
  rebuildAttachmentArchivePath(bizId: number, attachmentId: number, importance?: string) {
    return this.request<any>(`/businesses/${bizId}/attachments/${attachmentId}/rebuild-path`, {
      method: 'POST',
    });
  }
  buildAttachmentsArchiveTree(bizId: number) {
    return this.request<any>(`/businesses/${bizId}/attachments-archive-build`, { method: 'POST' });
  }

  getCollectionStyleConfig(bizId: number, screenId: number) {
    return this.request<any>(`/businesses/${bizId}/screens/${screenId}/collection-style`);
  }
  saveCollectionStyleConfig(bizId: number, screenId: number, data: any) {
    return this.request<any>(`/businesses/${bizId}/screens/${screenId}/collection-style`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  getWidgetLog(bizId: number, filters?: any) {
    return this.scr.getWidgetLogEnhanced(bizId, filters);
  }
  getWidgetStats(bizId: number, period?: string, dateFrom?: string, dateTo?: string) {
    return this.scr.getWidgetStatsEnhanced(bizId, period, dateFrom, dateTo);
  }
  getWidgetChart(bizId: number, months = 6, groupBy = 'month', dateFrom?: string, dateTo?: string) {
    return this.scr.getWidgetChartEnhanced(bizId, groupBy, months, dateFrom, dateTo);
  }
  getWidgetAccounts(bizId: number, accountIds: number[]) {
    const ids = (accountIds || []).join(',');
    return this.request<any>(
      `/businesses/${bizId}/widgets/accounts?accountIds=${encodeURIComponent(ids)}`,
    );
  }
  getCurrencies() {
    return this.request<any[]>('/currencies');
  }
  getAllCurrencies() {
    return this.request<any[]>('/currencies/all');
  }
  createCurrency(data: any) {
    return this.request<any>('/currencies', { method: 'POST', body: JSON.stringify(data) });
  }
  updateCurrency(id: number, data: any) {
    return this.request<any>(`/currencies/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }
  deleteCurrency(id: number) {
    return this.request<any>(`/currencies/${id}`, { method: 'DELETE' });
  }
  validateRate(currencyId: number, rate: number) {
    return this.request<any>(`/currencies/${currencyId}/validate-rate`, {
      method: 'POST',
      body: JSON.stringify({ rate }),
    });
  }
  getExchangeDiffAccount(bizId: number) {
    return this.request<any>(`/businesses/${bizId}/exchange-diff-account`);
  }
  getFiscalYears(bizId: number) {
    return this.request<any[]>(`/businesses/${bizId}/fiscal-years`);
  }
  createFiscalYear(bizId: number, data: any) {
    return this.request<any>(`/businesses/${bizId}/fiscal-years`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  createFiscalYearsBulk(bizId: number, data: any) {
    return this.request<any>(`/businesses/${bizId}/fiscal-years/bulk`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  getFiscalPeriods(bizId: number, yearId: number) {
    return this.request<any[]>(`/businesses/${bizId}/fiscal-years/${yearId}/periods`);
  }
  closeFiscalPeriod(bizId: number, periodId: number) {
    return this.request<any>(`/businesses/${bizId}/fiscal-periods/${periodId}/close`, {
      method: 'POST',
    });
  }
  closeFiscalYear(bizId: number, yearId: number) {
    return this.request<any>(`/businesses/${bizId}/fiscal-years/${yearId}/close`, {
      method: 'POST',
    });
  }
  getAccountCurrencies(accountId: number) {
    return this.request<any[]>(`/accounts/${accountId}/currencies`);
  }
  setAccountCurrencies(accountId: number, currencyIds: number[], defaultCurrencyId?: number) {
    return this.request<any>(`/accounts/${accountId}/currencies/bulk`, {
      method: 'POST',
      body: JSON.stringify({ currencyIds, defaultCurrencyId }),
    });
  }
  setFundCurrencies(fundId: number, currencyIds: number[]) {
    return this.request<any>(`/funds/${fundId}/currencies`, {
      method: 'POST',
      body: JSON.stringify({ currencyIds }),
    });
  }
  previewRevaluation(bizId: number, date?: string) {
    return this.request<any>(
      `/businesses/${bizId}/revaluation/preview${date ? '?date=' + date : ''}`,
    );
  }
  executeRevaluation(bizId: number, date?: string) {
    return this.request<any>(`/businesses/${bizId}/revaluation/execute`, {
      method: 'POST',
      body: JSON.stringify({ date }),
    });
  }
  batchUpdateScreenPermissions(screenId: number, permissions: any[]) {
    return this.request<any>(`/screens/${screenId}/permissions/batch`, {
      method: 'PUT',
      body: JSON.stringify({ permissions }),
    });
  }
  addScreenToSidebar(bizId: number, screenId: number, data?: any) {
    return this.request<any>(`/businesses/${bizId}/sidebar/items/from-screen/${screenId}`, {
      method: 'POST',
      body: JSON.stringify(data || {}),
    });
  }

  getAccountStatement(
    bizId: number,
    accountId: number,
    dateFrom?: string,
    dateTo?: string,
    sourceType?: string,
  ) {
    const q = new URLSearchParams({
      ...(dateFrom ? { dateFrom } : {}),
      ...(dateTo ? { dateTo } : {}),
      ...(sourceType ? { sourceType } : {}),
    }).toString();
    return this.request<any>(
      `/businesses/${bizId}/accounts/${accountId}/statement${q ? `?${q}` : ''}`,
    );
  }

  getExchangeRates(bizId: number) {
    return this.request<any[]>(`/businesses/${bizId}/exchange-rates`);
  }
  createExchangeRate(bizId: number, data: any) {
    return this.request<any>(`/businesses/${bizId}/exchange-rates`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  updateExchangeRate(bizId: number, id: number, data: any) {
    return this.request<any>(`/businesses/${bizId}/exchange-rates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  deleteExchangeRate(bizId: number, id: number) {
    return this.request<any>(`/businesses/${bizId}/exchange-rates/${id}`, { method: 'DELETE' });
  }
  convertCurrency(
    bizId: number,
    amount: number,
    fromCurrencyId: number,
    toCurrencyId: number,
    date?: string,
  ) {
    return this.request<any>(`/businesses/${bizId}/exchange-rates/convert`, {
      method: 'POST',
      body: JSON.stringify({ amount, fromCurrencyId, toCurrencyId, date }),
    });
  }

  getProfitLossReport(bizId: number, dateFrom?: string, dateTo?: string) {
    const q = new URLSearchParams({
      ...(dateFrom ? { dateFrom } : {}),
      ...(dateTo ? { dateTo } : {}),
    }).toString();
    return this.request<any>(`/businesses/${bizId}/reports/profit-loss${q ? `?${q}` : ''}`);
  }
  getDailySummary(bizId: number, date: string) {
    return this.request<any>(
      `/businesses/${bizId}/reports/daily-summary?date=${encodeURIComponent(date)}`,
    );
  }
  getTrialBalance(bizId: number, dateFrom?: string, dateTo?: string) {
    const q = new URLSearchParams({
      ...(dateFrom ? { dateFrom } : {}),
      ...(dateTo ? { dateTo } : {}),
    }).toString();
    return this.request<any>(`/businesses/${bizId}/reports/trial-balance${q ? `?${q}` : ''}`);
  }

  getRoles(bizId: number) {
    return this.request<any[]>(`/businesses/${bizId}/roles`);
  }
  getUserRoles(bizId: number) {
    return this.request<any[]>(`/businesses/${bizId}/user-roles`);
  }
  createRole(bizId: number, data: any) {
    return this.request<any>(`/businesses/${bizId}/roles`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  updateRole(bizId: number, id: number, data: any) {
    return this.request<any>(`/businesses/${bizId}/roles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  deleteRole(bizId: number, id: number) {
    return this.request<any>(`/businesses/${bizId}/roles/${id}`, { method: 'DELETE' });
  }
  assignUserRole(bizId: number, data: any) {
    return this.request<any>(`/businesses/${bizId}/user-roles`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  removeUserRole(bizId: number, userId: number) {
    return this.request<any>(`/businesses/${bizId}/user-roles/${userId}`, { method: 'DELETE' });
  }

  getVouchersEnhanced(bizId: number, filters?: any) {
    return this.getVouchersAdvanced(bizId, filters);
  }

  getAttachments(entityType: string, entityId: number) {
    return this.request<any[]>(
      `/attachments?entityType=${encodeURIComponent(entityType)}&entityId=${entityId}`,
    );
  }
  uploadAttachment(bizId: number, data: any) {
    return this.request<any>(`/businesses/${bizId}/attachments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  deleteAttachment(bizId: number, id: number) {
    return this.request<any>(`/businesses/${bizId}/attachments/${id}`, { method: 'DELETE' });
  }
}
