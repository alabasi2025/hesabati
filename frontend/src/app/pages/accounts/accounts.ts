import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

// خريطة ثابتة لأيقونات وألوان أنواع الحسابات المعروفة
const ACCOUNT_TYPE_META: Record<string, { label: string; icon: string; color: string }> = {
  billing:      { label: 'فوترة',    icon: 'receipt',                  color: '#a855f7' },
  fund:         { label: 'صندوق',    icon: 'savings',                  color: '#22c55e' },
  bank:         { label: 'بنك',      icon: 'account_balance',          color: '#3b82f6' },
  e_wallet:     { label: 'محفظة',    icon: 'account_balance_wallet',   color: '#8b5cf6' },
  exchange:     { label: 'صراف',     icon: 'currency_exchange',        color: '#f59e0b' },
  accounting:   { label: 'محاسبي',   icon: 'book',                     color: '#14b8a6' },
  intermediary: { label: 'وسيط',     icon: 'swap_horiz',               color: '#f97316' },
  cash:         { label: 'نقد',      icon: 'payments',                 color: '#84cc16' },
  custody:      { label: 'عهدة',     icon: 'lock',                     color: '#ec4899' },
  service:      { label: 'خدمة',     icon: 'miscellaneous_services',   color: '#06b6d4' },
};

function getTypeMeta(type: string) {
  return ACCOUNT_TYPE_META[type] ?? { label: type, icon: 'account_balance_wallet', color: '#64748b' };
}

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

  // قائمة ثابتة لأنواع الحسابات المعروفة - تُستخدم في نموذج الإضافة فقط
  knownAccountTypes = Object.entries(ACCOUNT_TYPE_META).map(([value, meta]) => ({ value, ...meta }));

  // ===== فلاتر ديناميكية: تُحسب من البيانات الفعلية =====
  // تقرأ الأنواع الموجودة فعلاً في الحسابات وتعرضها تلقائياً
  dynamicFilters = computed(() => {
    const all = this.accounts();
    // استخراج الأنواع الفريدة الموجودة فعلاً
    const typesInDB = [...new Set(all.map(a => a.accountType).filter(Boolean))];
    // ترتيب: billing أولاً، ثم الباقي أبجدياً حسب الـ label
    const sorted = typesInDB.sort((a, b) => {
      if (a === 'billing') return -1;
      if (b === 'billing') return 1;
      return getTypeMeta(a).label.localeCompare(getTypeMeta(b).label, 'ar');
    });
    return sorted.map(type => ({ value: type, ...getTypeMeta(type) }));
  });

  filteredAccounts = computed(() => {
    const type = this.activeType();
    const q = this.searchQuery().toLowerCase();
    return this.accounts().filter(a => {
      const matchType = type === 'all' || a.accountType === type;
      const matchQ = !q || a.name.toLowerCase().includes(q) ||
        (a.provider || '').toLowerCase().includes(q) ||
        (a.responsiblePerson || '').toLowerCase().includes(q);
      return matchType && matchQ;
    });
  });

  stats = computed(() => {
    const all = this.accounts();
    return {
      total: all.length,
      active: all.filter(a => a.isActive).length,
      byType: this.dynamicFilters().map(t => ({
        ...t,
        count: all.filter(a => a.accountType === t.value).length,
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
    return { value: type, ...getTypeMeta(type) };
  }

  trackById(_: number, item: any) { return item.id; }
}
