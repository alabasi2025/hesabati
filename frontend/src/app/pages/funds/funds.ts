import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

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

  bizId = 0;
  accounts = signal<any[]>([]);
  fundTypes = signal<any[]>([]);
  stations = signal<any[]>([]);
  loading = signal(true);
  activeFilter = signal<string>('all');

  // Account form
  showAccountForm = signal(false);
  editingAccountId = signal<number | null>(null);
  accountForm: any = { name: '', subType: '', responsiblePerson: '', notes: '' };

  // Type form
  showTypeForm = signal(false);
  editingTypeId = signal<number | null>(null);
  typeForm: any = { name: '', subTypeKey: '', description: '', icon: 'savings', color: '#4CAF50' };

  // Delete confirm
  showDeleteConfirm = signal(false);
  deleteTarget = signal<{ type: 'account' | 'type'; id: number; name: string } | null>(null);

  iconOptions = [
    'savings', 'account_balance_wallet', 'receipt_long', 'payments', 'lock',
    'person', 'inventory_2', 'request_quote', 'shopping_cart', 'move_to_inbox',
    'attach_money', 'monetization_on', 'credit_card', 'toll', 'local_atm',
  ];

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try {
      const [accs, types, sts] = await Promise.all([
        this.api.getAccounts(this.bizId),
        this.api.getFundTypes(this.bizId),
        this.api.getStations(this.bizId),
      ]);
      this.accounts.set(accs.filter((a: any) => a.accountType === 'fund'));
      this.fundTypes.set(types);
      this.stations.set(sts);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  getFilterTabs() {
    return [{ value: 'all', label: 'الكل', icon: 'apps', count: this.accounts().length },
      ...this.fundTypes().map(t => ({
        value: t.subTypeKey, label: t.name, icon: t.icon,
        count: this.accounts().filter(a => a.subType === t.subTypeKey).length,
      }))
    ];
  }

  filteredAccounts() {
    const f = this.activeFilter();
    if (f === 'all') return this.accounts();
    return this.accounts().filter(a => a.subType === f);
  }

  getTypeInfo(subType: string) {
    const t = this.fundTypes().find(ft => ft.subTypeKey === subType);
    return t || { name: subType || 'عام', icon: 'inventory_2', color: '#607D8B' };
  }

  // ============ Account CRUD ============
  openAddAccount(subType?: string) {
    this.accountForm = { name: '', subType: subType || (this.fundTypes().length ? this.fundTypes()[0].subTypeKey : ''), responsiblePerson: '', notes: '' };
    this.editingAccountId.set(null);
    this.showAccountForm.set(true);
  }

  openEditAccount(acc: any) {
    this.accountForm = { name: acc.name, subType: acc.subType || '', responsiblePerson: acc.responsiblePerson || '', notes: acc.notes || '' };
    this.editingAccountId.set(acc.id);
    this.showAccountForm.set(true);
  }

  async saveAccount() {
    try {
      const data = {
        ...this.accountForm,
        accountType: 'fund',
      };
      if (this.editingAccountId()) {
        await this.api.updateAccount(this.editingAccountId()!, data);
      } else {
        await this.api.createAccount(this.bizId, data);
      }
      this.showAccountForm.set(false);
      await this.load();
    } catch (e) { console.error(e); }
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
      await this.load();
    } catch (e) { console.error(e); }
  }

  // ============ Delete ============
  confirmDelete(type: 'account' | 'type', id: number, name: string) {
    this.deleteTarget.set({ type, id, name });
    this.showDeleteConfirm.set(true);
  }

  async executeDelete() {
    const target = this.deleteTarget();
    if (!target) return;
    try {
      if (target.type === 'account') {
        await this.api.deleteAccount(target.id);
      } else {
        await this.api.deleteFundType(target.id);
      }
      this.showDeleteConfirm.set(false);
      this.deleteTarget.set(null);
      await this.load();
    } catch (e) { console.error(e); }
  }

  getBalanceDisplay(acc: any): string {
    if (!acc.balances || acc.balances.length === 0) return '0';
    return acc.balances.map((b: any) => `${Number(b.balance).toLocaleString()} ${b.currencySymbol || ''}`).join(' | ');
  }
}
