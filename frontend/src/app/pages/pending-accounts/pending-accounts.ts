import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-pending-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent],
  templateUrl: './pending-accounts.html',
  styleUrl: './pending-accounts.scss',
})
export class PendingAccountsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  items = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  filterStatus = signal<string>('all');

  pendingFilteredAccounts = signal<any[]>([]);
  form: any = { personOrEntity: '', description: '', status: 'pending', estimatedAmount: 0, notes: '', accountId: null as number | null };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
    this.api.getAccounts(this.bizId).then(a => this.pendingFilteredAccounts.set((a || []).filter((acc: any) => acc.accountType === 'pending')));
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getPendingAccounts(this.bizId);
      this.items.set(data);
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء تحميل الحسابات المعلقة');
    }
    this.loading.set(false);
  }

  filteredItems() {
    const f = this.filterStatus();
    if (f === 'all') return this.items();
    return this.items().filter(i => i.status === f);
  }

  totalAmount() { return this.filteredItems().reduce((s, i) => s + Number(i.estimatedAmount || 0), 0); }
  pendingCount() { return this.items().filter(i => i.status === 'pending').length; }
  resolvedCount() { return this.items().filter(i => i.status === 'resolved').length; }

  openAdd() {
    this.form = { personOrEntity: '', description: '', status: 'pending', estimatedAmount: 0, notes: '', accountId: null };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(item: any) {
    this.form = {
      personOrEntity: item.personOrEntity, description: item.description || '',
      status: item.status, estimatedAmount: Number(item.estimatedAmount || 0), notes: item.notes || '',
    };
    this.editingId.set(item.id);
    this.showForm.set(true);
  }

  async save() {
    try {
      const data = { ...this.form, estimatedAmount: String(this.form.estimatedAmount) };
      if (this.editingId()) {
        await this.api.updatePendingAccount(this.editingId()!, data);
      } else {
        await this.api.createPendingAccount(this.bizId, data);
      }
      this.showForm.set(false);
      this.toast.success(this.editingId() ? 'تم تحديث الحساب المعلق بنجاح' : 'تم إضافة الحساب المعلق بنجاح');
      await this.load();
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ الحساب المعلق');
    }
  }

  async remove(item: any) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: `هل أنت متأكد من حذف "${item.personOrEntity}"؟`, type: 'danger' });
    if (confirmed) {
      try {
        await this.api.deletePendingAccount(item.id);
        this.toast.success('تم حذف الحساب المعلق بنجاح');
        await this.load();
      } catch (e: unknown) {
        console.error(e);
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف');
      }
    }
  }

  getStatusLabel(s: string): string {
    const map: Record<string, string> = { pending: 'معلق', in_progress: 'قيد المعالجة', resolved: 'تم الحل', written_off: 'شُطب' };
    return map[s] || s;
  }
  getStatusClass(s: string): string {
    const map: Record<string, string> = { pending: 'pending', in_progress: 'progress', resolved: 'resolved', written_off: 'written-off' };
    return map[s] || '';
  }
}
