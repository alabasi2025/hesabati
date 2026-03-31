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
  selector: 'app-funds',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent],
  templateUrl: './funds.html',
  styleUrl: './funds.scss',
})
export class FundsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  // إصلاح #4: استخدام funds بدلاً من accounts
  fundsData = signal<any[]>([]);
  stations = signal<any[]>([]);
  fundAccounts = signal<any[]>([]);
  loading = signal(true);
  activeFilter = signal<string>('all');
  accountFilter = signal<number | null>(null);

  // Fund form
  showFundForm = signal(false);
  editingFundId = signal<number | null>(null);
  fundForm: any = { name: '', fundType: '', sequenceNumber: '', responsiblePerson: '', stationId: null, accountId: null, description: '', notes: '' };

  // Type form
  showTypeForm = signal(false);
  editingTypeId = signal<number | null>(null);
  typeForm: any = { name: '', subTypeKey: '', description: '', icon: 'savings', color: '#4CAF50' };

  // Delete confirm
  showDeleteConfirm = signal(false);
  deleteTarget = signal<{ type: 'fund' | 'type'; id: number; name: string } | null>(null);

  iconOptions = [
    'savings', 'account_balance_wallet', 'receipt_long', 'payments', 'lock',
    'person', 'inventory_2', 'request_quote', 'shopping_cart', 'move_to_inbox',
    'attach_money', 'monetization_on', 'credit_card', 'toll', 'local_atm',
  ];

  // Backward compatibility aliases
  get accounts() { return this.fundsData; }
  showAccountForm = this.showFundForm;
  editingAccountId = this.editingFundId;
  get accountForm() { return this.fundForm; }
  set accountForm(v: any) { this.fundForm = v; }

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      // جلب الصناديق والمحطات
      const [fundsList, sts] = await Promise.all([
        this.api.getFunds(this.bizId, true),
        this.api.getStations(this.bizId),
      ]);
      this.fundsData.set(fundsList);
      this.stations.set(sts);
      this.activeFilter.set('all');
      // جلب الحسابات نوع صندوق (منفصل حتى لا يؤثر فشله على عرض الصناديق)
      try {
        const allAccounts = await this.api.getAccounts(this.bizId);
        this.fundAccounts.set((allAccounts || []).filter((a: any) => a.accountType === 'fund'));
      } catch { this.fundAccounts.set([]); }
    } catch (e: unknown) { console.error(e); }
    this.loading.set(false);
  }

  getFilterTabs() {
    return [
      { value: 'all', label: 'الكل', icon: 'apps', count: this.fundsData().length },
      { value: 'active', label: 'نشط', icon: 'check_circle', count: this.fundsData().filter(f => f.isActive).length },
      { value: 'inactive', label: 'غير نشط', icon: 'cancel', count: this.fundsData().filter(f => !f.isActive).length },
    ];
  }

  get filteredData() {
    let data = this.fundsData();
    const filter = this.activeFilter();
    if (filter === 'active') data = data.filter(f => f.isActive);
    else if (filter === 'inactive') data = data.filter(f => !f.isActive);
    const accId = this.accountFilter();
    if (accId) data = data.filter(f => f.accountId === accId);
    return data;
  }

  get uniqueAccounts() {
    const seen = new Map<number, { id: number; name: string; code: string }>();
    for (const f of this.fundsData()) {
      if (f.accountId && !seen.has(f.accountId)) {
        seen.set(f.accountId, { id: f.accountId, name: f.accountName || f.name, code: f.accountCode || f.code });
      }
    }
    return Array.from(seen.values());
  }

  // ============ Fund CRUD ============
  openAddAccount(subType?: string) {
    this.fundForm = {
      name: '',
      sequenceNumber: '',
      responsiblePerson: '',
      stationId: null,
      accountId: null,
      description: '',
      notes: '',
    };
    this.editingFundId.set(null);
    this.showFundForm.set(true);
  }

  openEditAccount(fund: any) {
    this.fundForm = {
      name: fund.name,
      fundType: fund.fundType || '',
      sequenceNumber: fund.sequenceNumber ?? '',
      responsiblePerson: fund.responsiblePerson || '',
      stationId: fund.stationId || null,
      accountId: fund.accountId || null,
      description: fund.description || '',
      notes: fund.notes || '',
    };
    this.editingFundId.set(fund.id);
    this.showFundForm.set(true);
  }

  async saveAccount() {
    try {
      const data = { ...this.fundForm };
      if (!data.name?.trim()) {
        this.toast.error('اسم الصندوق مطلوب');
        return;
      }
      if (data.stationId === '' || data.stationId === null) delete data.stationId;
      delete data.sequenceNumber;

      if (this.editingFundId()) {
        await this.api.updateFund(this.bizId, this.editingFundId()!, data);
      } else {
        await this.api.createFund(this.bizId, data);
      }
      this.showFundForm.set(false);
      this.toast.success(this.editingFundId() ? 'تم تحديث الصندوق بنجاح' : 'تم إنشاء الصندوق بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ الصندوق'); }
  }

  // ============ Type CRUD ============
  openAddType() {
    this.typeForm = { name: '', subTypeKey: '', description: '', icon: 'savings', color: '#4CAF50' };
    this.editingTypeId.set(null);
    this.showTypeForm.set(true);
  }

  openEditType(t: any) {
    this.typeForm = { name: t.name, subTypeKey: t.subTypeKey, description: t.description || '', icon: t.icon || 'savings', color: t.color || '#4CAF50' };
    this.editingTypeId.set(t.id);
    this.showTypeForm.set(true);
  }

  async saveType() {
    try {
      if (this.editingTypeId()) {
        await this.api.updateFundType(this.editingTypeId()!, this.typeForm);
      } else {
        await this.api.createFundType(this.bizId, this.typeForm);
      }
      this.showTypeForm.set(false);
      this.toast.success(this.editingTypeId() ? 'تم تحديث النوع بنجاح' : 'تم إنشاء النوع بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ النوع'); }
  }

  // ============ Delete ============
  confirmDelete(type: 'fund' | 'type' | 'account', id: number, name: string) {
    const actualType = type === 'account' ? 'fund' : type;
    this.deleteTarget.set({ type: actualType === 'fund' ? 'fund' : 'type', id, name });
    this.showDeleteConfirm.set(true);
  }

  async executeDelete() {
    const target = this.deleteTarget();
    if (!target) return;
    try {
      if (target.type === 'fund') {
        await this.api.deleteFund(this.bizId, target.id);
      } else {
        await this.api.deleteFundType(target.id);
      }
      this.showDeleteConfirm.set(false);
      this.deleteTarget.set(null);
      this.toast.success('تم الحذف بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف'); }
  }

  getBalanceDisplay(fund: any): string {
    if (!fund.balances || fund.balances.length === 0) return '0';
    return fund.balances.map((b: any) => `${Number(b.balance).toLocaleString()} ${b.currencySymbol || ''}`).join(' | ');
  }
}
