import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-operation-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './operation-types.html',
  styleUrl: './operation-types.scss',
})
export class OperationTypesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  bizId = 0;
  loading = signal(true);
  operationTypes = signal<any[]>([]);
  accounts = signal<any[]>([]);
  funds = signal<any[]>([]);
  employees = signal<any[]>([]);
  billingAccounts = signal<any[]>([]);
  error = signal('');

  // UI State
  showHowItWorks = signal(false);
  showForm = signal(false);
  showAccountsModal = signal(false);
  editingId = signal<number | null>(null);
  selectedOT = signal<any>(null);
  activeCategory = signal('all');

  // Form
  form = signal<any>({
    name: '', description: '', icon: 'receipt_long', color: '#3b82f6',
    category: 'voucher', voucherType: 'payment', mainAccountId: null,
    mainFundId: null, requiresAttachment: false, hasMultiLines: false,
    sortOrder: 0, isActive: true, notes: ''
  });

  // Linked accounts form
  newLinkedAccount = signal<any>({ accountId: null, label: '', permission: 'both', sortOrder: 0 });

  categories = [
    { value: 'all', label: 'الكل', icon: 'apps' },
    { value: 'voucher', label: 'سندات', icon: 'receipt_long' },
    { value: 'journal', label: 'قيود', icon: 'book' },
    { value: 'collection', label: 'تحصيل', icon: 'payments' },
    { value: 'delivery', label: 'توريد', icon: 'local_shipping' },
  ];

  voucherTypes = [
    { value: 'payment', label: 'سند صرف' },
    { value: 'receipt', label: 'سند قبض' },
    { value: 'transfer', label: 'تحويل داخلي' },
    { value: 'journal', label: 'قيد محاسبي' },
  ];

  permissions = [
    { value: 'both', label: 'يستقبل ويدفع' },
    { value: 'receive_only', label: 'يستقبل فقط' },
    { value: 'pay_only', label: 'يدفع فقط' },
  ];

  icons = [
    'receipt_long', 'payments', 'book', 'local_shipping', 'account_balance_wallet',
    'savings', 'currency_exchange', 'swap_horiz', 'trending_up', 'bolt',
    'groups', 'handshake', 'warehouse', 'local_atm', 'credit_card',
  ];

  colors = [
    '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
    '#14b8a6', '#f97316', '#ec4899', '#06b6d4', '#84cc16',
  ];

  filteredTypes = computed(() => {
    const cat = this.activeCategory();
    const all = this.operationTypes();
    if (cat === 'all') return all;
    return all.filter(ot => ot.category === cat);
  });

  async ngOnInit() {
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      await this.loadAll();
    });
  }

  async loadAll() {
    this.loading.set(true);
    try {
      const [ots, accs, fnds, emps] = await Promise.all([
        this.api.getOperationTypes(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
        this.api.getEmployees(this.bizId),
      ]);
      this.operationTypes.set(ots);
      this.accounts.set(accs);
      this.funds.set(fnds);
      this.employees.set(emps);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  openCreate() {
    this.editingId.set(null);
    this.form.set({
      name: '', description: '', icon: 'receipt_long', color: '#3b82f6',
      category: 'voucher', voucherType: 'payment', mainAccountId: null,
      mainFundId: null, requiresAttachment: false, hasMultiLines: false,
      sortOrder: 0, isActive: true, notes: ''
    });
    this.showForm.set(true);
  }

  openEdit(ot: any) {
    this.editingId.set(ot.id);
    this.form.set({ ...ot });
    this.showForm.set(true);
  }

  openAccountsModal(ot: any) {
    this.selectedOT.set(ot);
    this.newLinkedAccount.set({ accountId: null, label: '', permission: 'both', sortOrder: 0 });
    this.showAccountsModal.set(true);
  }

  async saveForm() {
    const f = this.form();
    if (!f.name.trim()) { this.error.set('اسم النوع مطلوب'); return; }
    try {
      if (this.editingId()) {
        await this.api.updateOperationType(this.editingId()!, f);
      } else {
        await this.api.createOperationType(this.bizId, f);
      }
      this.showForm.set(false);
      await this.loadAll();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async deleteOT(id: number) {
    if (!confirm('هل تريد حذف هذا النوع؟')) return;
    try {
      await this.api.deleteOperationType(id);
      await this.loadAll();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async addLinkedAccount() {
    const la = this.newLinkedAccount();
    const ot = this.selectedOT();
    if (!la.accountId) { this.error.set('اختر حساباً'); return; }
    try {
      await this.api.addOperationTypeAccount(ot.id, la);
      // Reload the selected OT
      const updated = await this.api.getOperationType(ot.id);
      this.selectedOT.set(updated);
      this.newLinkedAccount.set({ accountId: null, label: '', permission: 'both', sortOrder: 0 });
      await this.loadAll();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async removeLinkedAccount(laId: number) {
    try {
      await this.api.removeOperationTypeAccount(laId);
      const updated = await this.api.getOperationType(this.selectedOT().id);
      this.selectedOT.set(updated);
      await this.loadAll();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  setFormField(field: string, value: any) {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  setLinkedField(field: string, value: any) {
    this.newLinkedAccount.update(f => ({ ...f, [field]: value }));
  }

  getAccountName(id: number) {
    return this.accounts().find(a => a.id === id)?.name || '—';
  }

  getPermissionLabel(p: string) {
    return this.permissions.find(x => x.value === p)?.label || p;
  }

  getCategoryLabel(c: string) {
    return this.categories.find(x => x.value === c)?.label || c;
  }

  getVoucherTypeLabel(t: string) {
    return this.voucherTypes.find(x => x.value === t)?.label || t;
  }

  trackById(_: number, item: any) { return item.id; }
  countByCategory(category: string): number {
    return this.operationTypes().filter(ot => ot.category === category).length;
  }
}
