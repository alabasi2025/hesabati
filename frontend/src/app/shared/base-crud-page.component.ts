import { signal } from '@angular/core';
import { BasePageComponent } from './base-page.component';

/**
 * قاعدة للصفحات التي تحتوي CRUD (إضافة/تعديل/حذف).
 * ترث من BasePageComponent وتضيف:
 * - showForm signal للتحكم في عرض/إخفاء النموذج
 * - editingId signal لتتبع العنصر الجاري تعديله
 * - loading, saving signals
 * - دوال مساعدة (openAdd, openEdit, closeForm, scrollToTop)
 */
export abstract class BaseCrudPageComponent extends BasePageComponent {
  loading = signal(true);
  saving = signal(false);
  showForm = signal(false);
  editingId = signal<number | null>(null);

  /** فتح نموذج إضافة جديد */
  openAdd(): void {
    this.resetForm();
    this.editingId.set(null);
    this.showForm.set(true);
    this.scrollToTop();
  }

  /** فتح نموذج تعديل */
  openEdit(id: number): void {
    this.editingId.set(id);
    this.showForm.set(true);
    this.scrollToTop();
  }

  /** إغلاق النموذج */
  closeForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.resetForm();
  }

  /** تمرير للأعلى عند فتح النموذج */
  protected scrollToTop(): void {
    globalThis.window?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** يجب أن تعيد الصفحة تعيين حقول النموذج */
  protected abstract resetForm(): void;
}
