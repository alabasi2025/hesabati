import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { PAGE_IMPORTS } from '../../shared/page-imports';

interface OperationCategoryForm { name: string; categoryKey: string; description: string; icon: string; color: string; }

@Component({
  selector: 'app-operation-categories',
  standalone: true,
  imports: [...PAGE_IMPORTS],
  templateUrl: './operation-categories.html',
  styleUrl: './operation-categories.scss',
})
export class OperationCategoriesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  categories = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);

  form: OperationCategoryForm = { name: '', categoryKey: '', description: '', icon: 'category', color: '#6366f1' };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getOperationCategories(this.bizId, true);
      this.categories.set(data || []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  openAdd() {
    this.form = { name: '', categoryKey: '', description: '', icon: 'category', color: '#6366f1' };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(c: any) {
    this.form = {
      name: c.name, categoryKey: c.categoryKey, description: c.description || '',
      icon: c.icon || 'category', color: c.color || '#6366f1',
    };
    this.editingId.set(c.id);
    this.showForm.set(true);
  }

  onNameChange() {
    if (!this.editingId()) {
      this.form.categoryKey = this.form.name
        .trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\u0621-\u064Aa-z0-9_]/g, '');
    }
  }

  async save() {
    if (!this.form.name?.trim()) {
      this.toast.error('يرجى إدخال الاسم');
      return;
    }
    if (!this.form.categoryKey?.trim()) {
      this.form.categoryKey = this.form.name.trim().toLowerCase().replace(/\s+/g, '_');
    }
    try {
      if (this.editingId()) {
        await this.api.updateOperationCategory(this.bizId, this.editingId()!, this.form);
        this.toast.success('تم تعديل التصنيف بنجاح');
      } else {
        await this.api.createOperationCategory(this.bizId, this.form);
        this.toast.success('تم إضافة التصنيف بنجاح');
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
    }
  }

  async remove(c: any) {
    const confirmed = await this.toast.confirm({
      title: 'تأكيد الحذف',
      message: `هل أنت متأكد من حذف التصنيف "${c.name}"؟`,
      type: 'danger',
    });
    if (confirmed) {
      try {
        await this.api.deleteOperationCategory(this.bizId, c.id);
        this.toast.success('تم حذف التصنيف');
        await this.load();
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
      }
    }
  }

  getTypesCount(c: any): number {
    return c.operationTypes?.length || 0;
  }

  availableIcons = [
    'category', 'label', 'sell', 'local_offer', 'style',
    'bookmark', 'flag', 'star', 'favorite', 'bolt',
    'widgets', 'dashboard', 'grid_view', 'view_module', 'apps',
  ];
}
