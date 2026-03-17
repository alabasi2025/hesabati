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
  fundTypes = signal<any[]>([]);
  stations = signal<any[]>([]);
  loading = signal(true);
  activeFilter = signal<string>('all');

  // Fund form
  showFundForm = signal(false);
  editingFundId = signal<number | null>(null);
  fundForm: any = { name: '', fundType: '', sequenceNumber: '', responsiblePerson: '', stationId: null, description: '', notes: '' };

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
      // إصلاح #4: جلب الصناديق من endpoint الصحيح (GET /api/businesses/:bizId/funds)
      const [fundsList, types, sts] = await Promise.all([
        this.api.getFunds(this.bizId, true),
        this.api.getFundTypes(this.bizId),
        this.api.getStations(this.bizId),
      ]);
      this.fundsData.set(fundsList);
      this.fundTypes.set(types);
      this.stations.set(sts);
      this.activeFilter.set('all');
      const allowedFilters = new Set<string>([
        'all',
        ...types
          .filter((t: any) => t.subTypeKey !== 'custody')
          .map((t: any) => String(t.subTypeKey)),
      ]);
      if (!allowedFilters.has(this.activeFilter())) {
        this.activeFilter.set('all');
      }
    } catch (e: unknown) { console.error(e); }
    this.loading.set(false);
  }

  getFilterTabs() {
    return [{ value: 'all', label: 'الكل', icon: 'apps', count: this.fundsData().length },
      ...this.fundTypes().map(t => ({
        value: t.subTypeKey, label: t.name, icon: t.icon,
        count: this.fundsData().filter(f => f.fundType === t.subTypeKey).length,
      }))
    ];
  }

  filteredAccounts() {
    const f = this.activeFilter();
    if (f === 'all') return this.fundsData();
    return this.fundsData().filter(fund => fund.fundType === f);
  }

  getTypeInfo(fundType: string) {
    const t = this.fundTypes().find(ft => ft.subTypeKey === fundType);
    return t || { name: fundType || 'غير مصنف', icon: 'inventory_2', color: '#607D8B' };
  }

  // ============ Fund CRUD ============
  openAddAccount(subType?: string) {
    if (!this.fundTypes().length) {
      this.toast.error('لا يمكن إضافة صندوق بدون تصنيف. أضف تصنيف صندوق أولاً.');
      return;
    }
    this.fundForm = {
      name: '',
      fundType: subType || (this.fundTypes().length ? this.fundTypes()[0].subTypeKey : ''),
      sequenceNumber: '',
      responsiblePerson: '',
      stationId: null,
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
      description: fund.description || '',
      notes: fund.notes || '',
    };
    this.editingFundId.set(fund.id);
    this.showFundForm.set(true);
  }

  async saveAccount() {
    try {
      const data = { ...this.fundForm };
      const selectedType = String(data.fundType || '').trim();
      const hasType = this.fundTypes().some((t) => String(t.subTypeKey) === selectedType);
      if (!selectedType || !hasType) {
        this.toast.error('اختيار تصنيف صندوق صحيح إلزامي قبل الحفظ');
        return;
      }
      if (data.stationId === '' || data.stationId === null) delete data.stationId;
      if (data.sequenceNumber === '' || data.sequenceNumber === null || data.sequenceNumber === undefined) {
        delete data.sequenceNumber;
      } else {
        const n = Number.parseInt(String(data.sequenceNumber), 10);
        if (!Number.isInteger(n) || n <= 0) {
          this.toast.error('رقم الصندوق غير صالح');
          return;
        }
        data.sequenceNumber = n;
      }

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
