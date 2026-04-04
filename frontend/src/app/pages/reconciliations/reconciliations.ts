import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { PAGE_IMPORTS } from '../../shared/page-imports';

interface ReconciliationForm { title: string; reconciliationType: string; accountId: number | null; fundId: number | null; periodStart: string; periodEnd: string; expectedAmount: number; actualAmount: number; notes: string; }

@Component({
  selector: 'app-reconciliations',
  standalone: true,
  imports: [...PAGE_IMPORTS],
  templateUrl: './reconciliations.html',
  styleUrl: './reconciliations.scss',
})
export class ReconciliationsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  reconciliations = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  viewingItem = signal<any | null>(null);

  form: ReconciliationForm = {
    title: '', reconciliationType: 'manager', accountId: null, fundId: null,
    periodStart: '', periodEnd: '', expectedAmount: 0, actualAmount: 0, notes: '',
  };

  reconciliationTypes = [
    { key: 'manager', label: 'مدير' },
    { key: 'exchange', label: 'صراف' },
    { key: 'accountant', label: 'محاسب' },
    { key: 'supplier', label: 'مورد' },
    { key: 'custody', label: 'عهدة' },
  ];

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getReconciliations(this.bizId);
      this.reconciliations.set(data || []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  openAdd() {
    this.form = {
      title: '', reconciliationType: 'manager', accountId: null, fundId: null,
      periodStart: '', periodEnd: '', expectedAmount: 0, actualAmount: 0, notes: '',
    };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(r: any) {
    this.form = {
      title: r.title, reconciliationType: r.reconciliationType || 'manager',
      accountId: r.accountId, fundId: r.fundId,
      periodStart: r.periodStart?.split('T')[0] || '',
      periodEnd: r.periodEnd?.split('T')[0] || '',
      expectedAmount: r.expectedAmount || 0, actualAmount: r.actualAmount || 0,
      notes: r.notes || '',
    };
    this.editingId.set(r.id);
    this.showForm.set(true);
  }

  viewDetails(r: any) {
    this.viewingItem.set(r);
  }

  async save() {
    if (!this.form.title?.trim()) {
      this.toast.error('يرجى إدخال عنوان المطابقة');
      return;
    }
    try {
      if (this.editingId()) {
        await this.api.updateReconciliation(this.bizId, this.editingId()!, this.form);
        this.toast.success('تم تعديل المطابقة بنجاح');
      } else {
        await this.api.createReconciliation(this.bizId, this.form);
        this.toast.success('تم إنشاء المطابقة بنجاح');
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
    }
  }

  getDifference(r: any): number {
    return (r.actualAmount || 0) - (r.expectedAmount || 0);
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      open: 'مفتوحة', in_progress: 'قيد التنفيذ',
      completed: 'مكتملة', disputed: 'متنازع عليها',
    };
    return map[status] || status;
  }

  getTypeLabel(type: string): string {
    return this.reconciliationTypes.find(t => t.key === type)?.label || type;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      open: 'status-open', in_progress: 'status-progress',
      completed: 'status-completed', disputed: 'status-disputed',
    };
    return map[status] || '';
  }
}
