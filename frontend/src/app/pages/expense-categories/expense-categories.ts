import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-expense-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-categories.html',
  styleUrl: './expense-categories.scss',
})
export class ExpenseCategoriesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  categories = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);

  form: any = { name: '', description: '', icon: 'receipt_long', color: '#3b82f6', sortOrder: 0, isActive: true };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getExpenseCategories(this.bizId);
      this.categories.set(data || []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  openAdd() {
    this.form = { name: '', description: '', icon: 'receipt_long', color: '#3b82f6', sortOrder: 0, isActive: true };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(c: any) {
    this.form = {
      name: c.name, description: c.description || '', icon: c.icon || 'receipt_long',
      color: c.color || '#3b82f6', sortOrder: c.sortOrder ?? 0, isActive: c.isActive !== false,
    };
    this.editingId.set(c.id);
    this.showForm.set(true);
  }

  async save() {
    if (!this.form.name?.trim()) {
      this.toast.warning('يرجى إدخال اسم التصنيف');
      return;
    }
    try {
      const id = this.editingId();
      if (id !== null) {
        await this.api.updateExpenseCategory(id, this.form);
        this.toast.success('تم تعديل التصنيف بنجاح');
      } else {
        await this.api.createExpenseCategory(this.bizId, this.form);
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
        await this.api.deleteExpenseCategory(c.id);
        this.toast.success('تم حذف التصنيف');
        await this.load();
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
      }
    }
  }

  availableIcons = ['receipt_long', 'receipt', 'payments', 'savings', 'account_balance', 'category', 'label', 'folder', 'description', 'attach_money'];
}
