import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-exchanges',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent],
  templateUrl: './exchanges.html',
  styleUrl: './exchanges.scss',
})
export class ExchangesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  exchangesData = signal<any[]>([]);
  exchangeAccounts = signal<any[]>([]);
  loading = signal(true);
  activeFilter = signal<string>('all');
  accountFilter = signal<number | null>(null);

  showExchangeForm = signal(false);
  editingExchangeId = signal<number | null>(null);
  exchangeForm: any = { name: '', accountId: null, accountNumber: '', provider: '', responsiblePerson: '', description: '', notes: '' };

  showDeleteConfirm = signal(false);
  deleteTarget = signal<{ type: 'exchange'; id: number; name: string } | null>(null);

  // Backward compatibility
  get accounts() { return this.exchangesData; }
  showAccountForm = this.showExchangeForm;
  editingAccountId = this.editingExchangeId;
  get accountForm() { return this.exchangeForm; }
  set accountForm(v: any) { this.exchangeForm = v; }

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const exchangesList = await this.api.getExchanges(this.bizId);
      this.exchangesData.set(exchangesList);
      this.activeFilter.set('all');
      try {
        const allAccounts = await this.api.getAccounts(this.bizId);
        this.exchangeAccounts.set((allAccounts || []).filter((a: any) => a.accountType === 'exchange'));
      } catch { this.exchangeAccounts.set([]); }
    } catch (e: unknown) { console.error(e); }
    this.loading.set(false);
  }

  getFilterTabs() {
    return [
      { value: 'all', label: 'الكل', icon: 'apps', count: this.exchangesData().length },
      { value: 'active', label: 'نشط', icon: 'check_circle', count: this.exchangesData().filter(e => e.isActive).length },
      { value: 'inactive', label: 'غير نشط', icon: 'cancel', count: this.exchangesData().filter(e => !e.isActive).length },
    ];
  }

  get filteredData() {
    let data = this.exchangesData();
    const filter = this.activeFilter();
    if (filter === 'active') data = data.filter(e => e.isActive);
    else if (filter === 'inactive') data = data.filter(e => !e.isActive);
    const accId = this.accountFilter();
    if (accId) data = data.filter(e => e.accountId === accId);
    return data;
  }

  get uniqueAccounts() {
    const seen = new Map<number, { id: number; name: string; code: string }>();
    for (const e of this.exchangesData()) {
      if (e.accountId && !seen.has(e.accountId)) {
        seen.set(e.accountId, { id: e.accountId, name: e.accountName || e.name, code: e.accountCode || e.code });
      }
    }
    return Array.from(seen.values());
  }

  openAddAccount(subType?: string) {
    this.exchangeForm = { name: '', accountId: null, accountNumber: '', provider: '', responsiblePerson: '', description: '', notes: '' };
    this.editingExchangeId.set(null);
    this.showExchangeForm.set(true);
  }

  openEditAccount(exchange: any) {
    this.exchangeForm = {
      name: exchange.name,
      accountId: exchange.accountId || null,
      accountNumber: exchange.accountNumber || '',
      provider: exchange.provider || '',
      responsiblePerson: exchange.responsiblePerson || '',
      description: exchange.description || '',
      notes: exchange.notes || '',
    };
    this.editingExchangeId.set(exchange.id);
    this.showExchangeForm.set(true);
  }

  async saveAccount() {
    try {
      if (!this.exchangeForm.name?.trim()) {
        this.toast.error('اسم الصراف مطلوب');
        return;
      }

      const data = { ...this.exchangeForm };
      delete data.sequenceNumber;
      if (this.editingExchangeId()) {
        await this.api.updateExchange(this.bizId, this.editingExchangeId()!, data);
      } else {
        await this.api.createExchange(this.bizId, data);
      }
      this.showExchangeForm.set(false);
      this.toast.success(this.editingExchangeId() ? 'تم تحديث الصراف بنجاح' : 'تم إنشاء الصراف بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ الصراف'); }
  }

  confirmDelete(type: 'exchange', id: number, name: string) {
    this.deleteTarget.set({ type, id, name });
    this.showDeleteConfirm.set(true);
  }

  async executeDelete() {
    const target = this.deleteTarget();
    if (!target) return;
    try {
      await this.api.deleteExchange(this.bizId, target.id);
      this.showDeleteConfirm.set(false);
      this.deleteTarget.set(null);
      this.toast.success('تم الحذف بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف'); }
  }

  getBalanceDisplay(acc: any): string {
    if (!acc.balances || acc.balances.length === 0) return '0';
    return acc.balances.map((b: any) => `${Number(b.balance).toLocaleString()} ${b.currencySymbol || ''}`).join(' | ');
  }
}
