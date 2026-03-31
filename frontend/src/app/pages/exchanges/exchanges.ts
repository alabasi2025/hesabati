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

  accounts = signal<any[]>([]);
  loading = signal(true);
  activeFilter = signal<string>('all');

  showAccountForm = signal(false);
  editingAccountId = signal<number | null>(null);
  accountForm: any = { name: '', subType: '', accountNumber: '', provider: '', responsiblePerson: '', notes: '' };

  showTypeForm = signal(false);
  editingTypeId = signal<number | null>(null);
  typeForm: any = { name: '', subTypeKey: '', description: '', icon: 'currency_exchange', color: '#FF9800' };

  showDeleteConfirm = signal(false);
  deleteTarget = signal<{ type: 'account' | 'type'; id: number; name: string } | null>(null);

  iconOptions = [
    'currency_exchange', 'swap_horiz', 'sync_alt', 'compare_arrows', 'public',
    'language', 'store', 'storefront', 'local_atm', 'payments',
    'attach_money', 'monetization_on', 'toll', 'credit_card', 'account_balance',
  ];

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const accs = await this.api.getAccounts(this.bizId);
      this.accounts.set(accs.filter((a: any) => a.accountType === 'exchange'));
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  getFilterTabs() {
    return [
      { value: 'all', label: 'الكل', icon: 'apps', count: this.accounts().length },
      { value: 'active', label: 'نشط', icon: 'check_circle', count: this.accounts().filter(a => a.isActive).length },
      { value: 'inactive', label: 'غير نشط', icon: 'cancel', count: this.accounts().filter(a => !a.isActive).length },
    ];
  }

  get filteredData() {
    const filter = this.activeFilter();
    if (filter === 'all') return this.accounts();
    if (filter === 'active') return this.accounts().filter(a => a.isActive);
    if (filter === 'inactive') return this.accounts().filter(a => !a.isActive);
    return this.accounts();
  }

  openAddAccount(subType?: string) {
    this.accountForm = { name: '', accountNumber: '', provider: '', responsiblePerson: '', notes: '' };
    this.editingAccountId.set(null);
    this.showAccountForm.set(true);
  }

  openEditAccount(acc: any) {
    this.accountForm = { name: acc.name, subType: acc.subType || '', accountNumber: acc.accountNumber || '', provider: acc.provider || '', responsiblePerson: acc.responsiblePerson || '', notes: acc.notes || '' };
    this.editingAccountId.set(acc.id);
    this.showAccountForm.set(true);
  }

  async saveAccount() {
    try {
      if (!this.accountForm.name?.trim()) {
        this.toast.error('اسم الصراف مطلوب');
        return;
      }

      const data = { ...this.accountForm, accountType: 'exchange', isLeafAccount: true };
      if (this.editingAccountId()) {
        await this.api.updateAccount(this.bizId, this.editingAccountId()!, data);
      } else {
        await this.api.createAccount(this.bizId, data);
      }
      this.showAccountForm.set(false);
      this.toast.success(this.editingAccountId() ? 'تم تحديث الحساب بنجاح' : 'تم إنشاء الحساب بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ الحساب'); }
  }

  openAddType() {
    this.typeForm = { name: '', subTypeKey: '', description: '', icon: 'currency_exchange', color: '#FF9800' };
    this.editingTypeId.set(null);
    this.showTypeForm.set(true);
  }

  openEditType(t: any) {
    this.typeForm = { name: t.name, subTypeKey: t.subTypeKey, description: t.description || '', icon: t.icon || 'currency_exchange', color: t.color || '#FF9800' };
    this.editingTypeId.set(t.id);
    this.showTypeForm.set(true);
  }

  async saveType() {
    try {
      if (this.editingTypeId()) {
        await this.api.updateExchangeType(this.editingTypeId()!, this.typeForm);
      } else {
        await this.api.createExchangeType(this.bizId, this.typeForm);
      }
      this.showTypeForm.set(false);
      this.toast.success(this.editingTypeId() ? 'تم تحديث النوع بنجاح' : 'تم إنشاء النوع بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ النوع'); }
  }

  confirmDelete(type: 'account' | 'type', id: number, name: string) {
    this.deleteTarget.set({ type, id, name });
    this.showDeleteConfirm.set(true);
  }

  async executeDelete() {
    const target = this.deleteTarget();
    if (!target) return;
    try {
      if (target.type === 'account') await this.api.deleteAccount(this.bizId, target.id);
      else await this.api.deleteExchangeType(target.id);
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
