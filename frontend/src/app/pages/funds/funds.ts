import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funds.html',
  styleUrl: './funds.scss',
})
export class FundsComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  biz = inject(BusinessService);
  private toast = inject(ToastService);

  bizId = 0;
  // إصلاح #4: استخدام funds بدلاً من accounts
  fundsData = signal<any[]>([]);
  fundTypes = signal<any[]>([]);
  stations = signal<any[]>([]);
  loading = signal(true);
  activeFilter = signal<string>('all');

  // Fund form
  showFundForm = signal(false);
  editingFundId = signal<number | null>(null);
  fundForm: any = { name: '', fundType: '', responsiblePerson: '', stationId: null, description: '', notes: '' };

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

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try {
      // إصلاح #4: جلب الصناديق من endpoint الصحيح (GET /api/businesses/:bizId/funds)
      const [fundsList, types, sts] = await Promise.all([
        this.api.getFunds(this.bizId),
        this.api.getFundTypes(this.bizId),
        this.api.getStations(this.bizId),
      ]);
      this.fundsData.set(fundsList);
      this.fundTypes.set(types);
      this.stations.set(sts);
    } catch (e) { console.error(e); }
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
    return t || { name: fundType || 'عام', icon: 'inventory_2', color: '#607D8B' };
  }

  // ============ Fund CRUD ============
  openAddAccount(subType?: string) {
    this.fundForm = {
      name: '',
      fundType: subType || (this.fundTypes().length ? this.fundTypes()[0].subTypeKey : 'collection'),
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
      if (data.stationId === '' || data.stationId === null) delete data.stationId;
      
      if (this.editingFundId()) {
        await this.api.updateFund(this.bizId, this.editingFundId()!, data);
      } else {
        await this.api.createFund(this.bizId, data);
      }
      this.showFundForm.set(false);
      this.toast.success(this.editingFundId() ? 'تم تحديث الصندوق بنجاح' : 'تم إنشاء الصندوق بنجاح');
      await this.load();
    } catch (e: any) { console.error(e); this.toast.error(e?.message || 'حدث خطأ أثناء حفظ الصندوق'); }
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
    } catch (e: any) { console.error(e); this.toast.error(e?.message || 'حدث خطأ أثناء حفظ النوع'); }
  }

  // ============ Delete ============
  confirmDelete(type: 'fund' | 'type' | 'account', id: number, name: string) {
    const actualType = type === 'account' ? 'fund' : type;
    this.deleteTarget.set({ type: actualType as 'fund' | 'type', id, name });
    this.showDeleteConfirm.set(true);
  }

  async executeDelete() {
    const target = this.deleteTarget();
    if (!target) return;
    try {
      if (target.type === 'fund') {
        // TODO: Add deleteFund to API service when backend supports it
        // For now, we'll use the account delete as fallback
        await this.api.deleteAccount(target.id);
      } else {
        await this.api.deleteFundType(target.id);
      }
      this.showDeleteConfirm.set(false);
      this.deleteTarget.set(null);
      this.toast.success('تم الحذف بنجاح');
      await this.load();
    } catch (e: any) { console.error(e); this.toast.error(e?.message || 'حدث خطأ أثناء الحذف'); }
  }

  getBalanceDisplay(fund: any): string {
    if (!fund.balances || fund.balances.length === 0) return '0';
    return fund.balances.map((b: any) => `${Number(b.balance).toLocaleString()} ${b.currencySymbol || ''}`).join(' | ');
  }
}
