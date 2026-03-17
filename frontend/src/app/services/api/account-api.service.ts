import { Injectable, inject } from '@angular/core';
import { BaseApiService } from './base-api.service';

/** خدمة الحسابات والصناديق */
@Injectable({ providedIn: 'root' })
export class AccountApiService {
  private readonly api = inject(BaseApiService);

  // ===================== الحسابات =====================
  getAccounts(bizId: number)                        { return this.api.request<any[]>(`/businesses/${bizId}/accounts`); }
  getAllAccounts(bizId: number)                      { return this.api.request<any>(`/businesses/${bizId}/accounts?all=true`); }
  getCustodyAccounts(bizId: number)                 { return this.api.request<any[]>(`/businesses/${bizId}/custody-accounts`); }
  getIntermediaryAccounts(bizId: number)            { return this.api.request<any[]>(`/businesses/${bizId}/intermediary-accounts`); }
  getPendingAccountsList(bizId: number)             { return this.api.request<any[]>(`/businesses/${bizId}/pending-accounts-list`); }
  createAccount(bizId: number, d: any)              { return this.api.request<any>(`/businesses/${bizId}/accounts`, { method: 'POST', body: JSON.stringify(d) }); }
  updateAccount(bizId: number, id: number, d: any)  { return this.api.request<any>(`/businesses/${bizId}/accounts/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteAccount(bizId: number, id: number)          { return this.api.request<any>(`/businesses/${bizId}/accounts/${id}`, { method: 'DELETE' }); }
  getAccountBalance(bizId: number, accountId: number) { return this.api.request<any>(`/businesses/${bizId}/account-balance/${accountId}`); }

  // ===================== أنواع الحسابات الفرعية =====================
  getAccountSubNatures(bizId: number)                     { return this.api.request<any[]>(`/businesses/${bizId}/account-sub-natures`); }
  createAccountSubNature(bizId: number, d: any)           { return this.api.request<any>(`/businesses/${bizId}/account-sub-natures`, { method: 'POST', body: JSON.stringify(d) }); }
  updateAccountSubNature(bizId: number, id: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/account-sub-natures/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteAccountSubNature(bizId: number, id: number)       { return this.api.request<any>(`/businesses/${bizId}/account-sub-natures/${id}`, { method: 'DELETE' }); }

  // ===================== ربط الحسابات =====================
  getAccountLinks(accountId: number)                      { return this.api.request<any[]>(`/accounts/${accountId}/allowed-links`); }
  getAccountAllowedTargets(accountId: number, type: string) { return this.api.request<any[]>(`/accounts/${accountId}/allowed-targets?type=${type}`); }
  createAccountLink(d: any)                               { return this.api.request<any>(`/account-links`, { method: 'POST', body: JSON.stringify(d) }); }
  deleteAccountLink(id: number)                           { return this.api.request<any>(`/account-links/${id}`, { method: 'DELETE' }); }

  // ===================== الصناديق =====================
  getFunds(bizId: number, includeCustody = false) {
    const query = includeCustody ? '?includeCustody=true' : '';
    return this.api.request<any[]>(`/businesses/${bizId}/funds${query}`);
  }
  getFund(id: number)                              { return this.api.request<any>(`/funds/${id}`); }
  createFund(bizId: number, d: any)               { return this.api.request<any>(`/businesses/${bizId}/funds`, { method: 'POST', body: JSON.stringify(d) }); }
  updateFund(bizId: number, id: number, d: any)   { return this.api.request<any>(`/businesses/${bizId}/funds/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteFund(bizId: number, id: number)            { return this.api.request<any>(`/businesses/${bizId}/funds/${id}`, { method: 'DELETE' }); }

  // ===================== أنواع الصناديق =====================
  getFundTypes(bizId: number)                      { return this.api.request<any[]>(`/businesses/${bizId}/fund-types`); }
  createFundType(bizId: number, d: any)            { return this.api.request<any>(`/businesses/${bizId}/fund-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateFundType(id: number, d: any)               { return this.api.request<any>(`/fund-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteFundType(id: number)                       { return this.api.request<any>(`/fund-types/${id}`, { method: 'DELETE' }); }

  // ===================== أنواع البنوك =====================
  getBankTypes(bizId: number)                      { return this.api.request<any[]>(`/businesses/${bizId}/bank-types`); }
  createBankType(bizId: number, d: any)            { return this.api.request<any>(`/businesses/${bizId}/bank-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateBankType(id: number, d: any)               { return this.api.request<any>(`/bank-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteBankType(id: number)                       { return this.api.request<any>(`/bank-types/${id}`, { method: 'DELETE' }); }

  // ===================== أنواع الصرافين =====================
  getExchangeTypes(bizId: number)                  { return this.api.request<any[]>(`/businesses/${bizId}/exchange-types`); }
  createExchangeType(bizId: number, d: any)        { return this.api.request<any>(`/businesses/${bizId}/exchange-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateExchangeType(id: number, d: any)           { return this.api.request<any>(`/exchange-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteExchangeType(id: number)                   { return this.api.request<any>(`/exchange-types/${id}`, { method: 'DELETE' }); }

  // ===================== أنواع المحافظ الإلكترونية =====================
  getEWalletTypes(bizId: number)                   { return this.api.request<any[]>(`/businesses/${bizId}/e-wallet-types`); }
  createEWalletType(bizId: number, d: any)         { return this.api.request<any>(`/businesses/${bizId}/e-wallet-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateEWalletType(id: number, d: any)            { return this.api.request<any>(`/e-wallet-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteEWalletType(id: number)                    { return this.api.request<any>(`/e-wallet-types/${id}`, { method: 'DELETE' }); }

  // ===================== الأنواع المحاسبية =====================
  getAccountingMainTypes(bizId: number)                       { return this.api.request<any[]>(`/businesses/${bizId}/accounting-main-types`); }
  createAccountingMainType(bizId: number, d: any)             { return this.api.request<any>(`/businesses/${bizId}/accounting-main-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateAccountingMainType(bizId: number, id: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/accounting-main-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteAccountingMainType(bizId: number, id: number)         { return this.api.request<any>(`/businesses/${bizId}/accounting-main-types/${id}`, { method: 'DELETE' }); }

  getAccountingTypes(bizId: number)                           { return this.api.request<any[]>(`/businesses/${bizId}/accounting-types`); }
  createAccountingType(bizId: number, d: any)                 { return this.api.request<any>(`/businesses/${bizId}/accounting-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateAccountingType(bizId: number, id: number, d: any)     { return this.api.request<any>(`/businesses/${bizId}/accounting-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteAccountingType(bizId: number, id: number)             { return this.api.request<any>(`/businesses/${bizId}/accounting-types/${id}`, { method: 'DELETE' }); }

  // ===================== الحسابات المعلقة =====================
  getPendingAccounts(bizId: number)              { return this.api.request<any[]>(`/businesses/${bizId}/pending-accounts`); }
  createPendingAccount(bizId: number, d: any)    { return this.api.request<any>(`/businesses/${bizId}/pending-accounts`, { method: 'POST', body: JSON.stringify(d) }); }
  updatePendingAccount(id: number, d: any)       { return this.api.request<any>(`/pending-accounts/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deletePendingAccount(id: number)               { return this.api.request<any>(`/pending-accounts/${id}`, { method: 'DELETE' }); }

  // ===================== الشركاء =====================
  getPartners(bizId: number)             { return this.api.request<any[]>(`/businesses/${bizId}/partners`); }
  createPartner(bizId: number, d: any)   { return this.api.request<any>(`/businesses/${bizId}/partners`, { method: 'POST', body: JSON.stringify(d) }); }
  updatePartner(id: number, d: any)      { return this.api.request<any>(`/partners/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deletePartner(id: number)              { return this.api.request<any>(`/partners/${id}`, { method: 'DELETE' }); }
}
