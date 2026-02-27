import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

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

interface AccountGroup {
  key: string;
  label: string;
  icon: string;
  color: string;
  accounts: any[];
  count: number;
  collapsed: boolean;
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
  biz = inject(BusinessService);

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

  // فلاتر فرعية - تعمل فقط عند اختيار نوع معين
  activeSubFilters = signal<Record<string, string[]>>({});

  // تصنيفات DB لكل نوع حساب
  dbTypeCategories = signal<Record<string, any[]>>({});

  // حالة طي/فتح المجموعات
  collapsedGroups = signal<Set<string>>(new Set());

  form = signal<any>({
    name: '', accountType: 'fund', accountNumber: '', provider: '',
    subType: '', responsiblePerson: '', notes: '', isActive: true,
  });

  // قائمة ثابتة لأنواع الحسابات المعروفة - تُستخدم في نموذج الإضافة فقط
  knownAccountTypes = Object.entries(ACCOUNT_TYPE_META).map(([value, meta]) => ({ value, ...meta }));

  // ===== فلاتر ديناميكية: تُحسب من البيانات الفعلية =====
  dynamicFilters = computed(() => {
    const all = this.accounts();
    const typesInDB = [...new Set(all.map(a => a.accountType).filter(Boolean))];
    const sorted = typesInDB.sort((a, b) => {
      if (a === 'billing') return -1;
      if (b === 'billing') return 1;
      return getTypeMeta(a).label.localeCompare(getTypeMeta(b).label, 'ar');
    });
    return sorted.map(type => ({ value: type, ...getTypeMeta(type) }));
  });

  // ===== فلاتر فرعية ديناميكية حسب النوع المختار =====
  subFilterOptions = computed(() => {
    const type = this.activeType();
    if (type === 'all') return [];
    const typeAccounts = this.accounts().filter(a => a.accountType === type);
    const dbCats = this.dbTypeCategories();

    const filters: { key: string; label: string; icon: string; values: { value: string; count: number; icon?: string; color?: string; displayName?: string }[] }[] = [];

    // فلتر التصنيفات من DB (إن وجدت)
    const typeCategories = dbCats[type] || [];
    if (typeCategories.length > 0) {
      const catValues = typeCategories.map((cat: any) => {
        const count = typeAccounts.filter(a => a.subType === cat.subTypeKey).length;
        return { value: cat.subTypeKey, count, icon: cat.icon, color: cat.color, displayName: cat.name };
      });
      // إضافة "بدون تصنيف" إن وجدت حسابات بدون subType
      const unclassified = typeAccounts.filter(a => !a.subType || !typeCategories.some((c: any) => c.subTypeKey === a.subType)).length;
      if (unclassified > 0) {
        catValues.push({ value: '__none__', count: unclassified, icon: 'label_off', color: '#607D8B', displayName: 'بدون تصنيف' });
      }
      let catLabel = 'التصنيف';
      let catIcon = 'category';
      if (type === 'fund') { catLabel = 'نوع الصندوق'; }
      else if (type === 'bank') { catLabel = 'نوع البنك'; }
      else if (type === 'exchange') { catLabel = 'نوع الصراف'; }
      else if (type === 'e_wallet') { catLabel = 'نوع المحفظة'; }
      filters.push({ key: 'subType', label: catLabel, icon: catIcon, values: catValues });
    } else {
      // fallback: استخراج subTypes الفريدة من البيانات
      const subTypes = this.extractUniqueValues(typeAccounts, 'subType');
      if (subTypes.length > 1) {
        let subLabel = 'التصنيف';
        let subIcon = 'label';
        if (type === 'billing') { subLabel = 'نوع الحساب'; subIcon = 'category'; }
        filters.push({ key: 'subType', label: subLabel, icon: subIcon, values: subTypes });
      }
    }

    // استخراج providers الفريدة
    const providers = this.extractUniqueValues(typeAccounts, 'provider');
    if (providers.length > 1) {
      let providerLabel = 'الجهة';
      let providerIcon = 'business';
      if (type === 'billing') { providerLabel = 'النظام'; providerIcon = 'receipt'; }
      else if (type === 'exchange') { providerLabel = 'الصراف'; providerIcon = 'currency_exchange'; }
      else if (type === 'bank') { providerLabel = 'البنك'; providerIcon = 'account_balance'; }
      else if (type === 'e_wallet') { providerLabel = 'المحفظة'; providerIcon = 'account_balance_wallet'; }
      else if (type === 'service') { providerLabel = 'الخدمة'; providerIcon = 'miscellaneous_services'; }
      filters.push({ key: 'provider', label: providerLabel, icon: providerIcon, values: providers });
    }

    // استخراج responsiblePerson الفريدة (فقط للفوترة)
    if (type === 'billing') {
      const persons = this.extractUniqueValues(typeAccounts, 'responsiblePerson');
      if (persons.length > 1) {
        filters.push({ key: 'responsiblePerson', label: 'الموظف', icon: 'person', values: persons });
      }
    }

    return filters;
  });

  // ===== الحسابات المفلترة =====
  filteredAccounts = computed(() => {
    const type = this.activeType();
    const q = this.searchQuery().toLowerCase();
    const subs = this.activeSubFilters();

    return this.accounts().filter(a => {
      const matchType = type === 'all' || a.accountType === type;
      const matchQ = !q || a.name.toLowerCase().includes(q) ||
        (a.provider || '').toLowerCase().includes(q) ||
        (a.responsiblePerson || '').toLowerCase().includes(q);

      // فلاتر فرعية
      let matchSub = true;
      if (type !== 'all') {
        for (const [key, vals] of Object.entries(subs)) {
          if (vals.length > 0) {
            const fieldVal = a[key] || '';
            // دعم "بدون تصنيف"
            if (vals.includes('__none__')) {
              const dbCats = this.dbTypeCategories()[type] || [];
              const allKeys = dbCats.map((c: any) => c.subTypeKey);
              const isUnclassified = !fieldVal || !allKeys.includes(fieldVal);
              const otherVals = vals.filter(v => v !== '__none__');
              if (isUnclassified || otherVals.includes(fieldVal)) continue;
              matchSub = false; break;
            }
            if (!vals.includes(fieldVal)) { matchSub = false; break; }
          }
        }
      }

      return matchType && matchQ && matchSub;
    });
  });

  // ===== التجميع حسب التصنيف الفرعي =====
  groupedAccounts = computed<AccountGroup[]>(() => {
    const type = this.activeType();
    const accs = this.filteredAccounts();
    const collapsed = this.collapsedGroups();

    if (type === 'all' || accs.length === 0) {
      // في وضع "الكل" نجمع حسب النوع
      const typeMap = new Map<string, any[]>();
      for (const a of accs) {
        const t = a.accountType || 'other';
        if (!typeMap.has(t)) typeMap.set(t, []);
        typeMap.get(t)!.push(a);
      }
      // ترتيب: billing أولاً
      const sortedKeys = [...typeMap.keys()].sort((a, b) => {
        if (a === 'billing') return -1;
        if (b === 'billing') return 1;
        return getTypeMeta(a).label.localeCompare(getTypeMeta(b).label, 'ar');
      });
      return sortedKeys.map(key => {
        const meta = getTypeMeta(key);
        return {
          key,
          label: meta.label,
          icon: meta.icon,
          color: meta.color,
          accounts: typeMap.get(key)!,
          count: typeMap.get(key)!.length,
          collapsed: collapsed.has(key),
        };
      });
    }

    // في وضع نوع محدد: نجمع حسب الحقل الأنسب لكل نوع
    const groupField = this.getBestGroupField(type, accs);
    const groupMap = new Map<string, any[]>();
    for (const a of accs) {
      const groupVal = a[groupField] || 'بدون تصنيف';
      if (!groupMap.has(groupVal)) groupMap.set(groupVal, []);
      groupMap.get(groupVal)!.push(a);
    }

    // خريطة لترجمة subTypeKey إلى اسم عربي من DB
    const dbCats = this.dbTypeCategories()[type] || [];
    const catNameMap = new Map<string, { name: string; icon: string; color: string }>();
    for (const cat of dbCats) {
      catNameMap.set(cat.subTypeKey, { name: cat.name, icon: cat.icon, color: cat.color });
    }

    const meta = getTypeMeta(type);
    // ترتيب المجموعات: الأكبر أولاً
    const sortedEntries = [...groupMap.entries()].sort((a, b) => b[1].length - a[1].length);
    return sortedEntries.map(([groupLabel, items]) => {
      // استخدام الاسم العربي من DB إن وجد
      const catInfo = groupField === 'subType' ? catNameMap.get(groupLabel) : null;
      return {
        key: `${type}_${groupLabel}`,
        label: catInfo?.name || groupLabel,
        icon: catInfo?.icon || meta.icon,
        color: catInfo?.color || meta.color,
        accounts: items.sort((a: any, b: any) => (a.name || '').localeCompare(b.name || '', 'ar')),
        count: items.length,
        collapsed: collapsed.has(`${type}_${groupLabel}`),
      };
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
      const [data, fundTypes, bankTypes, exchangeTypes, walletTypes] = await Promise.all([
        this.api.getAccounts(this.bizId),
        this.api.getFundTypes(this.bizId).catch(() => []),
        this.api.getBankTypes(this.bizId).catch(() => []),
        this.api.getExchangeTypes(this.bizId).catch(() => []),
        this.api.getEWalletTypes(this.bizId).catch(() => []),
      ]);
      this.accounts.set(data);
      this.dbTypeCategories.set({
        fund: fundTypes,
        bank: bankTypes,
        exchange: exchangeTypes,
        e_wallet: walletTypes,
      });
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  // ===== فلاتر فرعية =====
  toggleSubFilter(key: string, value: string) {
    this.activeSubFilters.update(subs => {
      const current = subs[key] || [];
      const idx = current.indexOf(value);
      const newVals = idx >= 0 ? current.filter(v => v !== value) : [...current, value];
      return { ...subs, [key]: newVals };
    });
  }

  isSubFilterActive(key: string, value: string): boolean {
    return (this.activeSubFilters()[key] || []).includes(value);
  }

  clearSubFilters() {
    this.activeSubFilters.set({});
  }

  hasActiveSubFilters(): boolean {
    return Object.values(this.activeSubFilters()).some(v => v.length > 0);
  }

  setActiveType(type: string) {
    this.activeType.set(type);
    this.activeSubFilters.set({});
    this.collapsedGroups.set(new Set());
  }

  // ===== طي/فتح المجموعات =====
  toggleGroup(key: string) {
    this.collapsedGroups.update(set => {
      const newSet = new Set(set);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  }

  collapseAll() {
    const keys = this.groupedAccounts().map(g => g.key);
    this.collapsedGroups.set(new Set(keys));
  }

  expandAll() {
    this.collapsedGroups.set(new Set());
  }

  // ===== تحديد حقل التجميع الأنسب لكل نوع حساب =====
  private getBestGroupField(type: string, accs: any[]): string {
    // قواعد التجميع حسب النوع:
    // - billing (فوترة): حسب provider (النظام: المغربي، صندوق الدعم، الدفع المسبق)
    // - fund (صندوق): حسب subType (تحصيل وتوريد، سلف، عهدة)
    // - exchange (صراف): حسب provider (الصراف)
    // - bank (بنك): حسب provider (البنك)
    // - e_wallet (محفظة): حسب provider (المحفظة)
    // - service (خدمة): حسب provider (الخدمة)
    // - cash (نقد): حسب subType (كاش، خزنة)
    // - custody (عهدة): حسب subType
    // - غيره: نختار الحقل الأكثر تنوعاً

    const typeToField: Record<string, string> = {
      billing: 'provider',
      fund: 'subType',
      exchange: 'provider',
      bank: 'provider',
      e_wallet: 'provider',
      service: 'provider',
      cash: 'subType',
      custody: 'subType',
      accounting: 'subType',
    };

    const preferredField = typeToField[type];
    if (preferredField) {
      // نتحقق إن الحقل فيه قيم متنوعة
      const uniqueVals = new Set(accs.map(a => a[preferredField]).filter(Boolean));
      if (uniqueVals.size > 1) return preferredField;
    }

    // fallback: نختار الحقل الأكثر تنوعاً بين provider و subType
    const providerUnique = new Set(accs.map(a => a.provider).filter(Boolean)).size;
    const subTypeUnique = new Set(accs.map(a => a.subType).filter(Boolean)).size;

    if (providerUnique > 1 && providerUnique >= subTypeUnique) return 'provider';
    if (subTypeUnique > 1) return 'subType';
    if (providerUnique > 0) return 'provider';
    return 'subType';
  }

  // ===== مساعدات =====
  private extractUniqueValues(accs: any[], field: string): { value: string; count: number }[] {
    const map = new Map<string, number>();
    for (const a of accs) {
      const val = a[field] || '';
      if (val) map.set(val, (map.get(val) || 0) + 1);
    }
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, count }));
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
  trackByKey(_: number, item: AccountGroup) { return item.key; }
}
