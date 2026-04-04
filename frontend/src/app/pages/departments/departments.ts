import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { PAGE_IMPORTS } from '../../shared/page-imports';

interface DepartmentForm {
  name: string;
  code: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [...PAGE_IMPORTS],
  templateUrl: './departments.html',
  styleUrl: './departments.scss',
})
export class DepartmentsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  departments = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);

  private readonly defaultForm: DepartmentForm = { name: '', code: '', description: '', icon: 'business', color: '#8b5cf6' };
  form: DepartmentForm = { ...this.defaultForm };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getDepartments(this.bizId);
      this.departments.set(data || []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  openAdd() {
    this.form = { ...this.defaultForm };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(d: any) {
    this.form = {
      name: d.name, code: d.code || '', description: d.description || '',
      icon: d.icon || 'business', color: d.color || '#8b5cf6',
    };
    this.editingId.set(d.id);
    this.showForm.set(true);
  }

  async save() {
    if (!this.form.name?.trim()) {
      this.toast.error('يرجى إدخال اسم القسم');
      return;
    }
    try {
      if (this.editingId()) {
        await this.api.updateDepartment(this.editingId()!, this.form);
        this.toast.success('تم تعديل القسم بنجاح');
      } else {
        await this.api.createDepartment(this.bizId, this.form);
        this.toast.success('تم إضافة القسم بنجاح');
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
    }
  }

  async remove(d: any) {
    const confirmed = await this.toast.confirm({
      title: 'تأكيد الحذف',
      message: `هل أنت متأكد من حذف القسم "${d.name}"؟`,
      type: 'danger',
    });
    if (confirmed) {
      try {
        await this.api.deleteDepartment(d.id);
        this.toast.success('تم حذف القسم');
        await this.load();
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
      }
    }
  }

  availableIcons = [
    'business', 'corporate_fare', 'apartment', 'domain', 'location_city',
    'meeting_room', 'groups', 'work', 'badge', 'hub',
    'account_tree', 'schema', 'lan', 'device_hub', 'mediation',
  ];
}
