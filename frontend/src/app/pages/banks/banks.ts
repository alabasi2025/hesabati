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
  selector: 'app-banks',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent],
  templateUrl: './banks.html',
  styleUrl: './banks.scss',
})
export class BanksComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  banksData = signal<any[]>([]);
  bankAccounts = signal<any[]>([]);
  loading = signal(true);
  activeFilter = signal<string>('all');
  accountFilter = signal<number | null>(null);

  showBankForm = signal(false);
  editingBankId = signal<number | null>(null);
  bankForm: any = { name: '', accountId: null, accountNumber: '', provider: '', responsiblePerson: '', description: '', notes: '' };

  showDeleteConfirm = signal(false);
  deleteTarget = signal<{ type: 'bank'; id: number; name: string } | null>(null);

  // Backward compatibility
  get accounts() { return this.banksData; }
  showAccountForm = this.showBankForm;
  editingAccountId = this.editingBankId;
  get accountForm() { return this.bankForm; }
  set accountForm(v: any) { this.bankForm = v; }

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const [banksList] = await Promise.all([
        this.api.getBanks(this.bizId),
      ]);
      this.banksData.set(banksList);
      this.activeFilter.set('all');
      try {
        const allAccounts = await this.api.getAccounts(this.bizId);
        this.bankAccounts.set((allAccounts || []).filter((a: any) => a.accountType === 'bank'));
      } catch { this.bankAccounts.set([]); }
    } catch (e: unknown) { console.error(e); }
    this.loading.set(false);
  }

  getFilterTabs() {
    return [
      { value: 'all', label: 'الكل', icon: 'apps', count: this.banksData().length },
      { value: 'active', label: 'نشط', icon: 'check_circle', count: this.banksData().filter(b => b.isActive).length },
      { value: 'inactive', label: 'غير نشط', icon: 'cancel', count: this.banksData().filter(b => !b.isActive).length },
    ];
  }

  get filteredData() {
    let data = this.banksData();
    const filter = this.activeFilter();
    if (filter === 'active') data = data.filter(b => b.isActive);
    else if (filter === 'inactive') data = data.filter(b => !b.isActive);
    const accId = this.accountFilter();
    if (accId) data = data.filter(b => b.accountId === accId);
    return data;
  }

  get uniqueAccounts() {
    const seen = new Map<number, { id: number; name: string; code: string }>();
    for (const b of this.banksData()) {
      if (b.accountId && !seen.has(b.accountId)) {
        seen.set(b.accountId, { id: b.accountId, name: b.accountName || b.name, code: b.accountCode || b.code });
      }
    }
    return Array.from(seen.values());
  }

  openAddAccount(subType?: string) {
    this.bankForm = { name: '', accountId: null, accountNumber: '', provider: '', responsiblePerson: '', description: '', notes: '' };
    this.editingBankId.set(null);
    this.showBankForm.set(true);
  }

  openEditAccount(bank: any) {
    this.bankForm = {
      name: bank.name,
      accountId: bank.accountId || null,
      accountNumber: bank.accountNumber || '',
      provider: bank.provider || '',
      responsiblePerson: bank.responsiblePerson || '',
      description: bank.description || '',
      notes: bank.notes || '',
    };
    this.editingBankId.set(bank.id);
    this.showBankForm.set(true);
  }

  async saveAccount() {
    try {
      if (!this.bankForm.name?.trim()) {
        this.toast.error('اسم البنك مطلوب');
        return;
      }

      const data = { ...this.bankForm };
      delete data.sequenceNumber;
      if (this.editingBankId()) {
        await this.api.updateBank(this.bizId, this.editingBankId()!, data);
      } else {
        await this.api.createBank(this.bizId, data);
      }
      this.showBankForm.set(false);
      this.toast.success(this.editingBankId() ? 'تم تحديث البنك بنجاح' : 'تم إنشاء البنك بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ البنك'); }
  }

  confirmDelete(type: 'bank', id: number, name: string) {
    this.deleteTarget.set({ type, id, name });
    this.showDeleteConfirm.set(true);
  }

  async executeDelete() {
    const target = this.deleteTarget();
    if (!target) return;
    try {
      await this.api.deleteBank(this.bizId, target.id);
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
