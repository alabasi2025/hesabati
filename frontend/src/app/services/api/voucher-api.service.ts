import { Injectable, inject } from '@angular/core';
import { BaseApiService } from './base-api.service';

/** خدمة السندات والتحصيل والتسويات */
@Injectable({ providedIn: 'root' })
export class VoucherApiService {
  private readonly api = inject(BaseApiService);

  // ===================== السندات الأساسية =====================
  getVouchers(bizId: number, type?: string) {
    return this.api.request<any[]>(`/businesses/${bizId}/vouchers${type ? '?type=' + type : ''}`);
  }
  createVoucher(bizId: number, d: any)      { return this.api.request<any>(`/businesses/${bizId}/vouchers`, { method: 'POST', body: JSON.stringify(d) }); }
  createVoucherMulti(bizId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/vouchers-multi`, { method: 'POST', body: JSON.stringify(d) }); }
  createVoucherDraft(bizId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/vouchers-draft`, { method: 'POST', body: JSON.stringify(d) }); }
  deleteVoucher(id: number)                 { return this.api.request<any>(`/vouchers/${id}`, { method: 'DELETE' }); }

  getVoucherNumberPreview(bizId: number, params: {
    voucherType: 'receipt' | 'payment';
    voucherDate?: string | null;
    fromAccountId?: number | null;
    toAccountId?: number | null;
    fromFundId?: number | null;
    toFundId?: number | null;
  }) {
    const search = new URLSearchParams();
    search.set('voucherType', params.voucherType);
    if (params.voucherDate) search.set('voucherDate', params.voucherDate);
    if (params.fromAccountId) search.set('fromAccountId', String(params.fromAccountId));
    if (params.toAccountId) search.set('toAccountId', String(params.toAccountId));
    if (params.fromFundId) search.set('fromFundId', String(params.fromFundId));
    if (params.toFundId) search.set('toFundId', String(params.toFundId));
    return this.api.request<any>(`/businesses/${bizId}/voucher-number-preview?${search.toString()}`);
  }

  getVouchersAdvanced(bizId: number, filters?: {
    type?: string; status?: string; dateFrom?: string; dateTo?: string;
    search?: string; voucherNumber?: string; minAmount?: number; maxAmount?: number;
    operationTypeId?: number; treasuryType?: string; treasuryId?: number;
    limit?: number; offset?: number; sortBy?: string; sortDir?: string;
  }) {
    let url = `/businesses/${bizId}/vouchers-enhanced`;
    const params: string[] = [];
    if (filters?.type) params.push(`type=${filters.type}`);
    if (filters?.status) params.push(`status=${filters.status}`);
    if (filters?.dateFrom) params.push(`dateFrom=${filters.dateFrom}`);
    if (filters?.dateTo) params.push(`dateTo=${filters.dateTo}`);
    if (filters?.search) params.push(`search=${encodeURIComponent(filters.search)}`);
    if (filters?.voucherNumber) params.push(`voucherNumber=${encodeURIComponent(filters.voucherNumber)}`);
    if (filters?.minAmount) params.push(`minAmount=${filters.minAmount}`);
    if (filters?.maxAmount) params.push(`maxAmount=${filters.maxAmount}`);
    if (filters?.operationTypeId) params.push(`operationTypeId=${filters.operationTypeId}`);
    if (filters?.treasuryType) params.push(`treasuryType=${filters.treasuryType}`);
    if (filters?.treasuryId) params.push(`treasuryId=${filters.treasuryId}`);
    if (filters?.limit) params.push(`limit=${filters.limit}`);
    if (filters?.offset !== undefined) params.push(`offset=${filters.offset}`);
    if (filters?.sortBy) params.push(`sortBy=${filters.sortBy}`);
    if (filters?.sortDir) params.push(`sortDir=${filters.sortDir}`);
    if (params.length) url += '?' + params.join('&');
    return this.api.request<any>(url);
  }

  updateVoucher(bizId: number, id: number, d: any) {
    return this.api.request<any>(`/businesses/${bizId}/vouchers/${id}`, { method: 'PUT', body: JSON.stringify(d) });
  }
  changeVoucherStatus(bizId: number, id: number, status: string) {
    return this.api.request<any>(`/businesses/${bizId}/vouchers/${id}/status`, { method: 'POST', body: JSON.stringify({ status }) });
  }
  getVoucherDetails(bizId: number, id: number) {
    return this.api.request<any>(`/businesses/${bizId}/vouchers/${id}/details`);
  }
  getVoucherCategories(bizId: number) { return this.api.request<any[]>(`/businesses/${bizId}/voucher-categories`); }

  // ===================== التحصيل اليومي =====================
  getCollections(bizId: number, stationId?: number, date?: string) {
    let url = `/businesses/${bizId}/collections`;
    const params: string[] = [];
    if (stationId) params.push(`stationId=${stationId}`);
    if (date) params.push(`date=${date}`);
    if (params.length) url += '?' + params.join('&');
    return this.api.request<any[]>(url);
  }
  getCollection(id: number)                     { return this.api.request<any>(`/collections/${id}`); }
  createCollection(bizId: number, d: any)       { return this.api.request<any>(`/businesses/${bizId}/collections`, { method: 'POST', body: JSON.stringify(d) }); }
  createDelivery(collectionId: number, d: any)  { return this.api.request<any>(`/collections/${collectionId}/deliveries`, { method: 'POST', body: JSON.stringify(d) }); }

  // ===================== التصفيات =====================
  getSettlements(bizId: number)              { return this.api.request<any[]>(`/businesses/${bizId}/settlements`); }
  createSettlement(bizId: number, d: any)    { return this.api.request<any>(`/businesses/${bizId}/settlements`, { method: 'POST', body: JSON.stringify(d) }); }
  updateSettlement(id: number, d: any)       { return this.api.request<any>(`/settlements/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteSettlement(id: number)               { return this.api.request<any>(`/settlements/${id}`, { method: 'DELETE' }); }

  // ===================== القيود المحاسبية =====================
  getJournalEntries(bizId: number)           { return this.api.request<any[]>(`/businesses/${bizId}/journal-entries`); }
  createJournalEntry(bizId: number, d: any)  { return this.api.request<any>(`/businesses/${bizId}/journal-entries`, { method: 'POST', body: JSON.stringify(d) }); }
  deleteJournalEntry(id: number)             { return this.api.request<any>(`/journal-entries/${id}`, { method: 'DELETE' }); }

  getJournalEntryCategories(bizId: number)          { return this.api.request<any[]>(`/businesses/${bizId}/journal-entry-categories`); }
  createJournalEntryCategory(bizId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/journal-entry-categories`, { method: 'POST', body: JSON.stringify(d) }); }
  updateJournalEntryCategory(id: number, d: any)    { return this.api.request<any>(`/journal-entry-categories/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteJournalEntryCategory(id: number)            { return this.api.request<any>(`/journal-entry-categories/${id}`, { method: 'DELETE' }); }

  // ===================== المطابقات =====================
  getReconciliations(bizId: number)                       { return this.api.request<any[]>(`/businesses/${bizId}/reconciliations`); }
  getReconciliation(bizId: number, id: number)            { return this.api.request<any>(`/businesses/${bizId}/reconciliations/${id}`); }
  createReconciliation(bizId: number, d: any)             { return this.api.request<any>(`/businesses/${bizId}/reconciliations`, { method: 'POST', body: JSON.stringify(d) }); }
  updateReconciliation(bizId: number, id: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/reconciliations/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }

  // ===================== العهد =====================
  getCustodyRecords(bizId: number)                           { return this.api.request<any[]>(`/businesses/${bizId}/custody`); }
  getCustodyRecord(bizId: number, id: number)                { return this.api.request<any>(`/businesses/${bizId}/custody/${id}`); }
  createCustodyRecord(bizId: number, d: any)                 { return this.api.request<any>(`/businesses/${bizId}/custody`, { method: 'POST', body: JSON.stringify(d) }); }
  updateCustodyRecord(bizId: number, id: number, d: any)     { return this.api.request<any>(`/businesses/${bizId}/custody/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteCustodyRecord(bizId: number, id: number)             { return this.api.request<any>(`/businesses/${bizId}/custody/${id}`, { method: 'DELETE' }); }
  addCustodySettlement(bizId: number, custodyId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/custody/${custodyId}/settle`, { method: 'POST', body: JSON.stringify(d) }); }
}
