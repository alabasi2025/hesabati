import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class EmployeesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  employees = signal<any[]>([]);
  stations = signal<any[]>([]);
  departments = signal<any[]>([]);
  jobTitles = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  filterStation = signal<string>('all');

  form: any = { fullName: '', departmentId: null, jobTitleId: null, jobTitle: '', stationId: null, department: '', salary: 0, salaryCurrency: 'YER', phone: '', status: 'active', notes: '' };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const [emps, sts, deps, titles] = await Promise.all([
        this.api.getEmployees(this.bizId),
        this.api.getStations(this.bizId),
        this.api.getDepartments(this.bizId).catch(() => []),
        this.api.getJobTitles(this.bizId).catch(() => []),
      ]);
      this.employees.set(emps); this.stations.set(sts);
      this.departments.set(deps); this.jobTitles.set(titles);
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء تحميل بيانات الموظفين');
    }
    this.loading.set(false);
  }

  filteredEmployees() {
    const f = this.filterStation();
    if (f === 'all') return this.employees();
    return this.employees().filter(e => String(e.stationId) === f || (!e.stationId && f === 'admin'));
  }

  totalSalaries() { return this.filteredEmployees().reduce((s, e) => s + Number(e.salary || 0), 0); }

  openAdd() {
    this.form = { fullName: '', departmentId: null, jobTitleId: null, jobTitle: '', stationId: null, department: '', salary: 0, salaryCurrency: 'YER', phone: '', status: 'active', notes: '' };
    this.editingId.set(null); this.showForm.set(true);
  }

  openEdit(emp: any) {
    this.form = {
      fullName: emp.fullName,
      departmentId: emp.departmentId ?? null,
      jobTitleId: emp.jobTitleId ?? null,
      jobTitle: emp.jobTitle || '',
      stationId: emp.stationId,
      department: emp.department || '',
      salary: Number(emp.salary),
      salaryCurrency: emp.salaryCurrency || 'YER',
      phone: emp.phone || '',
      status: emp.status,
      notes: emp.notes || '',
    };
    this.editingId.set(emp.id); this.showForm.set(true);
  }

  async save() {
    try {
      const data = {
        ...this.form,
        department: this.getDepartmentName(this.form.departmentId) || this.form.department || null,
        jobTitle: this.getJobTitleName(this.form.jobTitleId) || this.form.jobTitle || null,
        salary: String(this.form.salary),
      };
      if (this.editingId()) await this.api.updateEmployee(this.editingId()!, data);
      else await this.api.createEmployee(this.bizId, data);
      this.showForm.set(false);
      this.toast.success(this.editingId() ? 'تم تحديث بيانات الموظف بنجاح' : 'تم إضافة الموظف بنجاح');
      await this.load();
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ بيانات الموظف');
    }
  }

  async remove(id: number) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: 'هل أنت متأكد من حذف هذا الموظف؟', type: 'danger' });
    if (confirmed) {
      try {
        await this.api.deleteEmployee(id);
        this.toast.success('تم حذف الموظف بنجاح');
        await this.load();
      } catch (e: unknown) {
        console.error(e);
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حذف الموظف');
      }
    }
  }

  getStatusLabel(s: string) { return s === 'active' ? 'نشط' : s === 'suspended' ? 'موقوف' : 'غير نشط'; }
  getStatusClass(s: string) { return s === 'active' ? 'active' : 'inactive'; }

  getDepartmentName(id: number | null | undefined): string {
    if (!id) return '';
    return this.departments().find((d: any) => d.id === id)?.name || '';
  }

  getJobTitleName(id: number | null | undefined): string {
    if (!id) return '';
    return this.jobTitles().find((j: any) => j.id === id)?.name || '';
  }
}
