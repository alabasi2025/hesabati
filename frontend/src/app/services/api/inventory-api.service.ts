import { Injectable, inject } from '@angular/core';
import { BaseApiService } from './base-api.service';

/** خدمة الموردين والمخازن والمشتريات */
@Injectable({ providedIn: 'root' })
export class InventoryApiService {
  private readonly api = inject(BaseApiService);

  // ===================== الموردين =====================
  getSuppliers(bizId: number)           { return this.api.request<any[]>(`/businesses/${bizId}/suppliers`); }
  createSupplier(bizId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/suppliers`, { method: 'POST', body: JSON.stringify(d) }); }
  updateSupplier(id: number, d: any)    { return this.api.request<any>(`/suppliers/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteSupplier(id: number)            { return this.api.request<any>(`/suppliers/${id}`, { method: 'DELETE' }); }

  getSupplierTypes(bizId: number)           { return this.api.request<any[]>(`/businesses/${bizId}/supplier-types`); }
  createSupplierType(bizId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/supplier-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateSupplierType(id: number, d: any)    { return this.api.request<any>(`/supplier-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteSupplierType(id: number)            { return this.api.request<any>(`/supplier-types/${id}`, { method: 'DELETE' }); }

  // ===================== المخازن =====================
  getWarehouses(bizId: number)            { return this.api.request<any[]>(`/businesses/${bizId}/warehouses`); }
  getWarehouse(id: number)                { return this.api.request<any>(`/warehouses/${id}`); }
  createWarehouse(bizId: number, d: any)  { return this.api.request<any>(`/businesses/${bizId}/warehouses`, { method: 'POST', body: JSON.stringify(d) }); }
  updateWarehouse(id: number, d: any)     { return this.api.request<any>(`/warehouses/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteWarehouse(id: number)             { return this.api.request<any>(`/warehouses/${id}`, { method: 'DELETE' }); }

  getWarehouseTypes(bizId: number)            { return this.api.request<any[]>(`/businesses/${bizId}/warehouse-types`); }
  createWarehouseType(bizId: number, d: any)  { return this.api.request<any>(`/businesses/${bizId}/warehouse-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateWarehouseType(id: number, d: any)     { return this.api.request<any>(`/warehouse-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteWarehouseType(id: number)             { return this.api.request<any>(`/warehouse-types/${id}`, { method: 'DELETE' }); }

  // ===================== العمليات المخزنية =====================
  getWarehouseOperations(bizId: number, type?: string, warehouseId?: number) {
    let url = `/businesses/${bizId}/warehouse-operations`;
    const params: string[] = [];
    if (type) params.push(`type=${type}`);
    if (warehouseId) params.push(`warehouseId=${warehouseId}`);
    if (params.length) url += '?' + params.join('&');
    return this.api.request<any[]>(url);
  }
  getWarehouseOperationsByWarehouse(bizId: number, warehouseId: number) {
    return this.api.request<any[]>(`/businesses/${bizId}/warehouses/${warehouseId}/operations`);
  }
  createWarehouseOperation(bizId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/warehouse-operations`, { method: 'POST', body: JSON.stringify(d) }); }
  getWarehouseOperation(id: number)               { return this.api.request<any>(`/warehouse-operations/${id}`); }
  getWarehouseInventory(bizId: number, warehouseId: number) {
    return this.api.request<any[]>(`/businesses/${bizId}/warehouses/${warehouseId}/inventory`);
  }

  // ===================== الأصناف والمخزون =====================
  getInventoryItems(bizId: number)               { return this.api.request<any[]>(`/businesses/${bizId}/inventory-items`); }
  getInventoryItemTypes(bizId: number)           { return this.api.request<any[]>(`/businesses/${bizId}/inventory-item-types`); }
  createInventoryItemType(bizId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/inventory-item-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateInventoryItemType(id: number, d: any)    { return this.api.request<any>(`/inventory-item-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteInventoryItemType(id: number)            { return this.api.request<any>(`/inventory-item-types/${id}`, { method: 'DELETE' }); }

  getStockLevels(bizId: number, warehouseId?: number) {
    const q = warehouseId ? `?warehouseId=${warehouseId}` : '';
    return this.api.request<any>(`/businesses/${bizId}/stock-levels${q}`);
  }
  getStockAlerts(bizId: number)                  { return this.api.request<any>(`/businesses/${bizId}/stock-alerts`); }
  getStockValuation(bizId: number, warehouseId?: number) {
    const q = warehouseId ? `?warehouseId=${warehouseId}` : '';
    return this.api.request<any>(`/businesses/${bizId}/stock-valuation${q}`);
  }
  getItemMovements(bizId: number, itemId: number, limit?: number) {
    const q = limit ? `?limit=${limit}` : '';
    return this.api.request<any>(`/businesses/${bizId}/items/${itemId}/movements${q}`);
  }
  createStockMovement(bizId: number, data: any) {
    return this.api.request<any>(`/businesses/${bizId}/stock-movements`, { method: 'POST', body: JSON.stringify(data) });
  }

  // ===================== فواتير المشتريات =====================
  getPurchaseInvoices(bizId: number, status?: string) {
    const q = status ? `?status=${status}` : '';
    return this.api.request<any[]>(`/businesses/${bizId}/purchase-invoices${q}`);
  }
  getPurchaseInvoice(bizId: number, id: number) { return this.api.request<any>(`/businesses/${bizId}/purchase-invoices/${id}`); }
  createPurchaseInvoice(bizId: number, data: any) { return this.api.request<any>(`/businesses/${bizId}/purchase-invoices`, { method: 'POST', body: JSON.stringify(data) }); }
  updatePurchaseInvoice(bizId: number, id: number, data: any) { return this.api.request<any>(`/businesses/${bizId}/purchase-invoices/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  confirmPurchaseInvoice(bizId: number, id: number) { return this.api.request<any>(`/businesses/${bizId}/purchase-invoices/${id}/confirm`, { method: 'POST' }); }
  receivePurchaseInvoice(bizId: number, id: number, receivedItems: any[]) {
    return this.api.request<any>(`/businesses/${bizId}/purchase-invoices/${id}/receive`, { method: 'POST', body: JSON.stringify({ receivedItems }) });
  }
  deletePurchaseInvoice(bizId: number, id: number) { return this.api.request<any>(`/businesses/${bizId}/purchase-invoices/${id}`, { method: 'DELETE' }); }

  // ===================== أصناف العمليات =====================
  getOperationCategories(bizId: number, includeTypes = false) {
    const q = includeTypes ? '?includeTypes=true' : '';
    return this.api.request<any[]>(`/businesses/${bizId}/operation-categories${q}`);
  }
  getOperationCategory(bizId: number, id: number)         { return this.api.request<any>(`/businesses/${bizId}/operation-categories/${id}`); }
  createOperationCategory(bizId: number, data: any)       { return this.api.request<any>(`/businesses/${bizId}/operation-categories`, { method: 'POST', body: JSON.stringify(data) }); }
  updateOperationCategory(bizId: number, id: number, data: any) { return this.api.request<any>(`/businesses/${bizId}/operation-categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteOperationCategory(bizId: number, id: number)      { return this.api.request<any>(`/businesses/${bizId}/operation-categories/${id}`, { method: 'DELETE' }); }

  // ===================== أنواع العمليات =====================
  getOperationTypes(bizId: number, category?: string, screen?: string) {
    let url = `/businesses/${bizId}/operation-types`;
    const params: string[] = [];
    if (category) params.push(`category=${category}`);
    if (screen) params.push(`screen=${screen}`);
    if (params.length) url += `?${params.join('&')}`;
    return this.api.request<any[]>(url);
  }
  getOperationType(id: number)                      { return this.api.request<any>(`/operation-types/${id}`); }
  createOperationType(bizId: number, d: any)        { return this.api.request<any>(`/businesses/${bizId}/operation-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateOperationType(id: number, d: any)           { return this.api.request<any>(`/operation-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteOperationType(id: number)                   { return this.api.request<any>(`/operation-types/${id}`, { method: 'DELETE' }); }
  addOperationTypeAccount(otId: number, d: any)     { return this.api.request<any>(`/operation-types/${otId}/accounts`, { method: 'POST', body: JSON.stringify(d) }); }
  removeOperationTypeAccount(id: number)            { return this.api.request<any>(`/operation-type-accounts/${id}`, { method: 'DELETE' }); }
  cloneOperationType(bizId: number, id: number, d?: any) { return this.api.request<any>(`/businesses/${bizId}/operation-types/${id}/clone`, { method: 'POST', body: JSON.stringify(d || {}) }); }
  toggleOperationType(bizId: number, id: number)   { return this.api.request<any>(`/businesses/${bizId}/operation-types/${id}/toggle`, { method: 'POST', body: '{}' }); }
  getOperationTypesStats(bizId: number)             { return this.api.request<any[]>(`/businesses/${bizId}/operation-types-stats`); }
  checkOperationTypeName(bizId: number, name: string, excludeId?: number) {
    let url = `/businesses/${bizId}/operation-types/check-name?name=${encodeURIComponent(name)}`;
    if (excludeId) url += `&excludeId=${excludeId}`;
    return this.api.request<{ exists: boolean; name: string }>(url);
  }

  // ===================== تصنيفات المصروفات =====================
  getExpenseCategories(bizId: number)            { return this.api.request<any[]>(`/businesses/${bizId}/expense-categories`); }
  createExpenseCategory(bizId: number, d: any)   { return this.api.request<any>(`/businesses/${bizId}/expense-categories`, { method: 'POST', body: JSON.stringify(d) }); }
  updateExpenseCategory(id: number, d: any)      { return this.api.request<any>(`/expense-categories/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteExpenseCategory(id: number)              { return this.api.request<any>(`/expense-categories/${id}`, { method: 'DELETE' }); }

  // ===================== ميزانية المصروفات =====================
  getExpenseBudget(bizId: number, month?: number, year?: number) {
    let url = `/businesses/${bizId}/expense-budget`;
    const p: string[] = [];
    if (month != null) p.push(`month=${month}`);
    if (year != null) p.push(`year=${year}`);
    if (p.length) url += '?' + p.join('&');
    return this.api.request<any[]>(url);
  }
  createExpenseBudget(bizId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/expense-budget`, { method: 'POST', body: JSON.stringify(d) }); }
  updateExpenseBudget(id: number, d: any)    { return this.api.request<any>(`/expense-budget/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteExpenseBudget(id: number)            { return this.api.request<any>(`/expense-budget/${id}`, { method: 'DELETE' }); }
}
