import { Injectable, inject } from '@angular/core';
import { BaseApiService } from './base-api.service';

/** خدمة الموظفين والرواتب */
@Injectable({ providedIn: 'root' })
export class EmployeeApiService {
  private readonly api = inject(BaseApiService);

  // ===================== الموظفين =====================
  getEmployees(bizId: number)           { return this.api.request<any[]>(`/businesses/${bizId}/employees`); }
  createEmployee(bizId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/employees`, { method: 'POST', body: JSON.stringify(d) }); }
  updateEmployee(id: number, d: any)    { return this.api.request<any>(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteEmployee(id: number)            { return this.api.request<any>(`/employees/${id}`, { method: 'DELETE' }); }

  // ===================== حسابات الموظفين في أنظمة الفوترة =====================
  getEmployeeBillingAccounts(bizId: number, stationId?: number) {
    let url = `/businesses/${bizId}/employee-billing-accounts`;
    if (stationId) url += `?stationId=${stationId}`;
    return this.api.request<any[]>(url);
  }
  createEmployeeBillingAccount(d: any)             { return this.api.request<any>(`/employee-billing-accounts`, { method: 'POST', body: JSON.stringify(d) }); }
  updateEmployeeBillingAccount(id: number, d: any) { return this.api.request<any>(`/employee-billing-accounts/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteEmployeeBillingAccount(id: number)         { return this.api.request<any>(`/employee-billing-accounts/${id}`, { method: 'DELETE' }); }

  // ===================== الأقسام =====================
  getDepartments(bizId: number)          { return this.api.request<any[]>(`/businesses/${bizId}/departments`); }
  createDepartment(bizId: number, d: any){ return this.api.request<any>(`/businesses/${bizId}/departments`, { method: 'POST', body: JSON.stringify(d) }); }
  updateDepartment(id: number, d: any)   { return this.api.request<any>(`/departments/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteDepartment(id: number)           { return this.api.request<any>(`/departments/${id}`, { method: 'DELETE' }); }

  // ===================== المسميات الوظيفية =====================
  getJobTitles(bizId: number)            { return this.api.request<any[]>(`/businesses/${bizId}/job-titles`); }
  createJobTitle(bizId: number, d: any)  { return this.api.request<any>(`/businesses/${bizId}/job-titles`, { method: 'POST', body: JSON.stringify(d) }); }
  updateJobTitle(id: number, d: any)     { return this.api.request<any>(`/job-titles/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteJobTitle(id: number)             { return this.api.request<any>(`/job-titles/${id}`, { method: 'DELETE' }); }

  // ===================== سجلات الرواتب =====================
  getSalaryRecords(bizId: number, month?: number, year?: number) {
    let url = `/businesses/${bizId}/salaries`;
    const p: string[] = [];
    if (month != null) p.push(`month=${month}`);
    if (year != null) p.push(`year=${year}`);
    if (p.length) url += '?' + p.join('&');
    return this.api.request<any[]>(url);
  }
  createSalaryRecord(bizId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/salaries`, { method: 'POST', body: JSON.stringify(d) }); }
  updateSalaryRecord(id: number, d: any)    { return this.api.request<any>(`/salaries/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteSalaryRecord(id: number)            { return this.api.request<any>(`/salaries/${id}`, { method: 'DELETE' }); }

  // ===================== إعدادات أنظمة الفوترة =====================
  getBillingSystemsConfig(bizId: number)           { return this.api.request<any[]>(`/businesses/${bizId}/billing-systems-config`); }
  createBillingSystemConfig(bizId: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/billing-systems-config`, { method: 'POST', body: JSON.stringify(d) }); }
  updateBillingSystemConfig(id: number, d: any)    { return this.api.request<any>(`/billing-systems-config/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteBillingSystemConfig(id: number)            { return this.api.request<any>(`/billing-systems-config/${id}`, { method: 'DELETE' }); }

  // ===================== أنواع حسابات الفوترة =====================
  getBillingAccountTypes(bizId: number)            { return this.api.request<any[]>(`/businesses/${bizId}/billing-account-types`); }
  createBillingAccountType(bizId: number, d: any)  { return this.api.request<any>(`/businesses/${bizId}/billing-account-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateBillingAccountType(id: number, d: any)     { return this.api.request<any>(`/billing-account-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteBillingAccountType(id: number)             { return this.api.request<any>(`/billing-account-types/${id}`, { method: 'DELETE' }); }
}
