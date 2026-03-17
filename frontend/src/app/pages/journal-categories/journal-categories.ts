import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-journal-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent],
  templateUrl: './journal-categories.html',
  styleUrl: './journal-categories.scss',
})
export class JournalCategoriesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  categories = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);

  form: any = {
    name: '', categoryKey: '', description: '', icon: 'book', color: '#6366f1',
  };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getJournalEntryCategories(this.bizId);
      this.categories.set(data || []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  openAdd() {
    this.form = { name: '', categoryKey: '', description: '', icon: 'book', color: '#6366f1' };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(c: any) {
    this.form = {
      name: c.name, categoryKey: c.categoryKey, description: c.description || '',
      icon: c.icon || 'book', color: c.color || '#6366f1',
    };
    this.editingId.set(c.id);
    this.showForm.set(true);
  }

  async save() {
    if (!this.form.name?.trim() || !this.form.categoryKey?.trim()) {
      this.toast.error('يرجى إدخال الاسم والمفتاح');
      return;
    }
    try {
      if (this.editingId()) {
        await this.api.updateJournalEntryCategory(this.editingId()!, this.form);
        this.toast.success('تم تعديل التصنيف بنجاح');
      } else {
        await this.api.createJournalEntryCategory(this.bizId, this.form);
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
        await this.api.deleteJournalEntryCategory(c.id);
        this.toast.success('تم حذف التصنيف');
        await this.load();
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
      }
    }
  }

  availableIcons = [
    'book', 'menu_book', 'auto_stories', 'library_books', 'receipt_long',
    'description', 'article', 'note', 'sticky_note_2', 'assignment',
    'fact_check', 'rule', 'checklist', 'task', 'summarize',
  ];
}
