import { Injectable, inject } from '@angular/core';
import { BaseApiService } from './base-api.service';

/** خدمة الشاشات المخصصة وسير العمل وإعدادات السايدبار والتقارير */
@Injectable({ providedIn: 'root' })
export class ScreenApiService {
  private readonly api = inject(BaseApiService);

  // ===================== الشاشات المخصصة =====================
  getScreens(bizId: number)                     { return this.api.request<any[]>(`/businesses/${bizId}/screens`); }
  createScreen(bizId: number, d: any)           { return this.api.request<any>(`/businesses/${bizId}/screens`, { method: 'POST', body: JSON.stringify(d) }); }
  updateScreen(id: number, d: any)              { return this.api.request<any>(`/screens/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteScreen(id: number)                      { return this.api.request<any>(`/screens/${id}`, { method: 'DELETE' }); }
  cloneScreen(screenId: number, d: any)         { return this.api.request<any>(`/screens/${screenId}/clone`, { method: 'POST', body: JSON.stringify(d) }); }
  getScreensWithWidgets(bizId: number)          { return this.api.request<any[]>(`/businesses/${bizId}/screens-with-widgets`); }

  // ===================== العناصر (Widgets) =====================
  getScreenWidgets(screenId: number)            { return this.api.request<any[]>(`/screens/${screenId}/widgets`); }
  createScreenWidget(screenId: number, d: any)  { return this.api.request<any>(`/screens/${screenId}/widgets`, { method: 'POST', body: JSON.stringify(d) }); }
  updateWidget(id: number, d: any)              { return this.api.request<any>(`/widgets/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteWidget(id: number)                      { return this.api.request<any>(`/widgets/${id}`, { method: 'DELETE' }); }
  batchUpdateWidgets(screenId: number, widgets: any[]) { return this.api.request<any[]>(`/screens/${screenId}/widgets/batch`, { method: 'PUT', body: JSON.stringify({ widgets }) }); }
  copyWidgetToScreen(widgetId: number, targetScreenId: number) { return this.api.request<any>(`/widgets/${widgetId}/copy-to/${targetScreenId}`, { method: 'POST', body: JSON.stringify({}) }); }

  // ===================== ربط القوالب والحسابات بالعناصر =====================
  getWidgetTemplates(widgetId: number)          { return this.api.request<any[]>(`/widgets/${widgetId}/templates`); }
  addWidgetTemplate(widgetId: number, d: any)   { return this.api.request<any>(`/widgets/${widgetId}/templates`, { method: 'POST', body: JSON.stringify(d) }); }
  removeWidgetTemplate(id: number)              { return this.api.request<any>(`/widget-templates/${id}`, { method: 'DELETE' }); }
  getWidgetAccountLinks(widgetId: number)       { return this.api.request<any[]>(`/widgets/${widgetId}/accounts`); }
  addWidgetAccount(widgetId: number, d: any)    { return this.api.request<any>(`/widgets/${widgetId}/accounts`, { method: 'POST', body: JSON.stringify(d) }); }
  removeWidgetAccount(id: number)               { return this.api.request<any>(`/widget-accounts/${id}`, { method: 'DELETE' }); }

  // ===================== صلاحيات الشاشات =====================
  getScreenPermissions(screenId: number)        { return this.api.request<any[]>(`/screens/${screenId}/permissions`); }
  setScreenPermissions(screenId: number, d: any){ return this.api.request<any>(`/screens/${screenId}/permissions`, { method: 'PUT', body: JSON.stringify(d) }); }

  // ===================== تحسينات الشاشات =====================
  getWidgetLogEnhanced(bizId: number, filters?: {
    dateFrom?: string; dateTo?: string; operationTypeId?: number;
    search?: string; minAmount?: number; maxAmount?: number;
    status?: string; limit?: number; offset?: number;
  }) {
    let url = `/businesses/${bizId}/widget-log-enhanced`;
    const params: string[] = [];
    if (filters?.dateFrom) params.push(`dateFrom=${filters.dateFrom}`);
    if (filters?.dateTo) params.push(`dateTo=${filters.dateTo}`);
    if (filters?.operationTypeId) params.push(`operationTypeId=${filters.operationTypeId}`);
    if (filters?.search) params.push(`search=${encodeURIComponent(filters.search)}`);
    if (filters?.minAmount) params.push(`minAmount=${filters.minAmount}`);
    if (filters?.maxAmount) params.push(`maxAmount=${filters.maxAmount}`);
    if (filters?.status) params.push(`status=${filters.status}`);
    if (filters?.limit) params.push(`limit=${filters.limit}`);
    if (filters?.offset !== undefined) params.push(`offset=${filters.offset}`);
    if (params.length) url += '?' + params.join('&');
    return this.api.request<any>(url);
  }
  getWidgetStatsEnhanced(bizId: number, period?: string, dateFrom?: string, dateTo?: string) {
    let url = `/businesses/${bizId}/widget-stats-enhanced`;
    const params: string[] = [];
    if (period) params.push(`period=${period}`);
    if (dateFrom) params.push(`dateFrom=${dateFrom}`);
    if (dateTo) params.push(`dateTo=${dateTo}`);
    if (params.length) url += '?' + params.join('&');
    return this.api.request<any>(url);
  }
  getWidgetChartEnhanced(bizId: number, groupBy?: string, months?: number, dateFrom?: string, dateTo?: string) {
    let url = `/businesses/${bizId}/widget-chart-enhanced`;
    const params: string[] = [];
    if (groupBy) params.push(`groupBy=${groupBy}`);
    if (months) params.push(`months=${months}`);
    if (dateFrom) params.push(`dateFrom=${dateFrom}`);
    if (dateTo) params.push(`dateTo=${dateTo}`);
    if (params.length) url += '?' + params.join('&');
    return this.api.request<any>(url);
  }

  // ===================== سير العمل =====================
  getVoucherTransitions(bizId: number, voucherId: number)  { return this.api.request<any[]>(`/businesses/${bizId}/vouchers/${voucherId}/transitions`); }
  executeVoucherTransition(bizId: number, voucherId: number, transitionId: number, note?: string) {
    return this.api.request<any>(`/businesses/${bizId}/vouchers/${voucherId}/transition`, { method: 'POST', body: JSON.stringify({ transitionId, note }) });
  }
  getVoucherWorkflowHistory(bizId: number, voucherId: number) { return this.api.request<any[]>(`/businesses/${bizId}/vouchers/${voucherId}/workflow-history`); }
  setupDefaultWorkflow(bizId: number, opTypeId: number)    { return this.api.request<any>(`/businesses/${bizId}/operation-types/${opTypeId}/setup-workflow`, { method: 'POST' }); }
  getOperationTypeTransitions(bizId: number, opTypeId: number) { return this.api.request<any[]>(`/businesses/${bizId}/operation-types/${opTypeId}/transitions`); }
  addOperationTypeTransition(bizId: number, opTypeId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/operation-types/${opTypeId}/transitions`, { method: 'POST', body: JSON.stringify(d) }); }
  deleteTransition(bizId: number, transitionId: number)   { return this.api.request<any>(`/businesses/${bizId}/transitions/${transitionId}`, { method: 'DELETE' }); }

  // ===================== التبويب الجانبي =====================
  getSidebarSections(bizId: number)                       { return this.api.request<any[]>(`/businesses/${bizId}/sidebar-sections`); }
  createSidebarSection(bizId: number, d: any)             { return this.api.request<any>(`/businesses/${bizId}/sidebar-sections`, { method: 'POST', body: JSON.stringify(d) }); }
  updateSidebarSection(id: number, d: any)                { return this.api.request<any>(`/sidebar-sections/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteSidebarSection(id: number)                        { return this.api.request<any>(`/sidebar-sections/${id}`, { method: 'DELETE' }); }
  getSidebarItems(bizId: number)                          { return this.api.request<any[]>(`/businesses/${bizId}/sidebar-items`); }
  createSidebarItem(d: any)                               { return this.api.request<any>(`/sidebar-items`, { method: 'POST', body: JSON.stringify(d) }); }
  updateSidebarItem(id: number, d: any)                   { return this.api.request<any>(`/sidebar-items/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteSidebarItem(id: number)                           { return this.api.request<any>(`/sidebar-items/${id}`, { method: 'DELETE' }); }
  getUserSidebar(bizId: number, userId: number)           { return this.api.request<any[]>(`/businesses/${bizId}/users/${userId}/sidebar`); }
  updateUserSidebar(bizId: number, userId: number, d: any){ return this.api.request<any>(`/businesses/${bizId}/users/${userId}/sidebar`, { method: 'PUT', body: JSON.stringify(d) }); }
  copySidebarConfig(bizId: number, fromUserId: number, toUserId: number) { return this.api.request<any>(`/businesses/${bizId}/sidebar-config/copy`, { method: 'POST', body: JSON.stringify({ fromUserId, toUserId }) }); }
  resetSidebarConfig(bizId: number, userId: number)       { return this.api.request<any>(`/businesses/${bizId}/sidebar-config/reset/${userId}`, { method: 'POST', body: '{}' }); }
  getUsers()                                              { return this.api.request<any[]>('/users'); }

  // ===================== UI Builder =====================
  getUiPages(bizId: number)                               { return this.api.request<any[]>(`/businesses/${bizId}/ui/pages`); }
  getUiPageByKey(bizId: number, pageKey: string)          { return this.api.request<any>(`/businesses/${bizId}/ui/pages/key/${pageKey}`); }
  getUiPage(bizId: number, pageId: number)                { return this.api.request<any>(`/businesses/${bizId}/ui/pages/${pageId}`); }
  createUiPage(bizId: number, d: any)                     { return this.api.request<any>(`/businesses/${bizId}/ui/pages`, { method: 'POST', body: JSON.stringify(d) }); }
  updateUiPage(bizId: number, pageId: number, d: any)     { return this.api.request<any>(`/businesses/${bizId}/ui/pages/${pageId}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteUiPage(bizId: number, pageId: number)             { return this.api.request<any>(`/businesses/${bizId}/ui/pages/${pageId}`, { method: 'DELETE' }); }
  addUiComponent(bizId: number, pageId: number, d: any)   { return this.api.request<any>(`/businesses/${bizId}/ui/pages/${pageId}/components`, { method: 'POST', body: JSON.stringify(d) }); }
  updateUiComponent(bizId: number, componentId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/ui/components/${componentId}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteUiComponent(bizId: number, componentId: number)   { return this.api.request<any>(`/businesses/${bizId}/ui/components/${componentId}`, { method: 'DELETE' }); }
  getUiDataSources(bizId: number)                         { return this.api.request<any[]>(`/businesses/${bizId}/ui/data-sources`); }
  createUiDataSource(bizId: number, d: any)               { return this.api.request<any>(`/businesses/${bizId}/ui/data-sources`, { method: 'POST', body: JSON.stringify(d) }); }
  updateUiDataSource(bizId: number, dsId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/ui/data-sources/${dsId}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteUiDataSource(bizId: number, dsId: number)         { return this.api.request<any>(`/businesses/${bizId}/ui/data-sources/${dsId}`, { method: 'DELETE' }); }
  executeUiDataSource(bizId: number, dsId: number, params?: any) { return this.api.request<any>(`/businesses/${bizId}/ui/data-sources/${dsId}/execute`, { method: 'POST', body: JSON.stringify(params || {}) }); }

  // ===================== التقارير =====================
  getMonthlyRevenue(bizId: number, year?: number) {
    const q = year ? `?year=${year}` : '';
    return this.api.request<any>(`/businesses/${bizId}/reports/monthly-revenue${q}`);
  }
  getAggregatedProfitLoss(dateFrom?: string, dateTo?: string) {
    const params = new URLSearchParams();
    if (dateFrom) params.set('dateFrom', dateFrom);
    if (dateTo) params.set('dateTo', dateTo);
    const q = params.toString() ? `?${params}` : '';
    return this.api.request<any>(`/reports/aggregated-profit-loss${q}`);
  }
  getAggregatedSummary() { return this.api.request<any>(`/reports/aggregated-summary`); }
}
