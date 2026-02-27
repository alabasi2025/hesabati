import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class AccountsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  bizId = 0;
  loading = signal(true);
  accounts = signal<any[]>([]);
  error = signal('');

  // UI State
  showHowItWorks = signal(false);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  activeType = signal('all');
  searchQuery = signal('');

  form = signal<any>({
    name: '', accountType: 'fund', accountNumber: '', provider: '',
    subType: '', responsiblePerson: '', notes: '', isActive: true,
  });

  accountTypes = [
    { value: 'all', label: 'الكل', icon: 'apps', color: '#64748b' },
    { value: 'fund', label: 'صندوق', icon: 'savings', color: '#22c55e' },
    { value: 'bank', label: 'بنك', icon: 'account_balance', color: '#3b82f6' },
    { value: 'e_wallet', label: 'محفظة', icon: 'account_balance_wallet', color: '#8b5cf6' },
    { value: 'exchange', label: 'صراف', icon: 'currency_exchange', color: '#f59e0b' },
    { value: 'accounting', label: 'محاسبي', icon: 'book', color: '#14b8a6' },
    { value: 'intermediary', label: 'وسيط', icon: 'swap_horiz', color: '#f97316' },
    { value: 'cash', label: 'نقد', icon: 'payments', color: '#84cc16' },
    { value: 'custody', label: 'عهدة', icon: 'lock', color: '#ec4899' },
    { value: 'service', label: 'خدمة', icon: 'miscellaneous_services', color: '#06b6d4' },
  ];

  filteredAccounts = computed(() => {
    const type = this.activeType();
    const q = this.searchQuery().toLowerCase();
    return this.accounts().filter(a => {
      const matchType = type === 'all' || a.accountType === type;
      const matchQ = !q || a.name.toLowerCase().includes(q) || (a.provider || '').toLowerCase().includes(q);
      return matchType && matchQ;
    });
  });

  stats = computed(() => {
    const all = this.accounts();
    return {
      total: all.length,
      active: all.filter(a => a.isActive).length,
      byType: this.accountTypes.slice(1).map(t => ({
        ...t,
        count: all.filter(a => a.accountType === t.value).length
      })).filter(t => t.count > 0),
    };
  });

  async ngOnInit() {
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      await this.loadAccounts();
    });
  }

  async loadAccounts() {
    this.loading.set(true);
    try {
      const data = await this.api.getAccounts(this.bizId);
      this.accounts.set(data);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  openCreate() {
    this.editingId.set(null);
    this.form.set({
      name: '', accountType: this.activeType() !== 'all' ? this.activeType() : 'fund',
      accountNumber: '', provider: '', subType: '', responsiblePerson: '',
      notes: '', isActive: true,
    });
    this.showForm.set(true);
  }

  openEdit(acc: any) {
    this.editingId.set(acc.id);
    this.form.set({
      name: acc.name, accountType: acc.accountType,
      accountNumber: acc.accountNumber || '', provider: acc.provider || '',
      subType: acc.subType || '', responsiblePerson: acc.responsiblePerson || '',
      notes: acc.notes || '', isActive: acc.isActive ?? true,
    });
    this.showForm.set(true);
  }

  async saveForm() {
    const f = this.form();
    if (!f.name.trim()) { this.error.set('اسم الحساب مطلوب'); return; }
    try {
      if (this.editingId()) {
        await this.api.updateAccount(this.editingId()!, f);
      } else {
        await this.api.createAccount(this.bizId, f);
      }
      this.showForm.set(false);
      await this.loadAccounts();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async deleteAccount(id: number) {
    if (!confirm('هل تريد حذف هذا الحساب؟')) return;
    try {
      await this.api.deleteAccount(id);
      await this.loadAccounts();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  setFormField(field: string, value: any) {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  getTypeInfo(type: string) {
    return this.accountTypes.find(t => t.value === type) || { value: type, label: type, icon: 'account_balance_wallet', color: '#64748b' };
  }

  trackById(_: number, item: any) { return item.id; }
}
