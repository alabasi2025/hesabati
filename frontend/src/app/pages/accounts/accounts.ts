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

// ترجمة أنواع الصناديق
const FUND_TYPE_LABELS: Record<string, string> = {
  collection: 'تحصيل وتوريد', salary_advance: 'سلف', custody: 'عهدة',
  safe: 'خزنة', expense: 'مصروفات', deposit: 'إيداع', personal: 'شخصي',
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
  allStations = signal<any[]>([]);
  error = signal('');

  // UI State
  showHowItWorks = signal(false);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  activeType = signal('all');
  searchQuery = signal('');

  // فلاتر فرعية - تعمل فقط عند اختيار نوع معين
  activeSubFilters = signal<Record<string, string[]>>({});

  // فلتر المحطة
  activeStationFilter = signal<number | null>(null);

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
    // ترتيب: فوترة أولاً، ثم صندوق، ثم بنك، ثم صراف، ثم محفظة، ثم الباقي
    const priority = ['billing', 'fund', 'bank', 'exchange', 'e_wallet'];
    const sorted = typesInDB.sort((a, b) => {
      const ia = priority.indexOf(a);
      const ib = priority.indexOf(b);
      if (ia >= 0 && ib >= 0) return ia - ib;
      if (ia >= 0) return -1;
      if (ib >= 0) return 1;
      return getTypeMeta(a).label.localeCompare(getTypeMeta(b).label, 'ar');
    });
    return sorted.map(type => ({ value: type, ...getTypeMeta(type) }));
  });

  // ===== هل النوع المختار يدعم فلتر المحطة =====
  typeHasStationFilter = computed(() => {
    const type = this.activeType();
    // الأنواع التي تدعم فلتر المحطة: صندوق، فوترة
    return ['fund', 'billing'].includes(type);
  });

  // ===== المحطات المتاحة للنوع المختار =====
  availableStations = computed(() => {
    const type = this.activeType();
    if (type === 'all') return [];
    const typeAccounts = this.accounts().filter(a => a.accountType === type && a.stationId);
    const stationIds = [...new Set(typeAccounts.map(a => a.stationId))];
    return this.allStations().filter(s => stationIds.includes(s.id));
  });

  // ===== فلاتر فرعية ديناميكية حسب النوع المختار =====
  subFilterOptions = computed(() => {
    const type = this.activeType();
    if (type === 'all') return [];
    const typeAccounts = this.accounts().filter(a => a.accountType === type);
    const dbCats = this.dbTypeCategories();

    const filters: { key: string; label: string; icon: string; values: { value: string; count: number; icon?: string; color?: string; displayName?: string }[] }[] = [];

    // === فلتر التصنيف الفرعي (subType) ===
    if (type === 'fund') {
      // الصناديق: فلتر حسب نوع الصندوق (تحصيل وتوريد، سلف، عهدة، خزنة...)
      const fundTypeMap = new Map<string, number>();
      for (const a of typeAccounts) {
        const ft = a.subType || '__none__';
        fundTypeMap.set(ft, (fundTypeMap.get(ft) || 0) + 1);
      }
      const values = [...fundTypeMap.entries()].map(([value, count]) => ({
        value,
        count,
        displayName: value === '__none__' ? 'بدون تصنيف' : (FUND_TYPE_LABELS[value] || value),
        icon: value === '__none__' ? 'label_off' : 'savings',
      }));
      if (values.length > 1 || (values.length === 1 && values[0].value !== '__none__')) {
        filters.push({ key: 'subType', label: 'نوع الصندوق', icon: 'category', values });
      }
    } else if (type === 'billing') {
      // الفوترة: فلتر حسب النظام (المغربي، صندوق الدعم، الدفع المسبق)
      const systemMap = new Map<string, number>();
      for (const a of typeAccounts) {
        const sys = a.provider || a.subType || '__none__';
        systemMap.set(sys, (systemMap.get(sys) || 0) + 1);
      }
      const values = [...systemMap.entries()].map(([value, count]) => ({
        value, count,
        displayName: value === '__none__' ? 'بدون نظام' : value,
        icon: value === '__none__' ? 'label_off' : 'receipt',
      }));
      if (values.length > 1) {
        filters.push({ key: 'provider', label: 'النظام', icon: 'receipt', values });
      }
    } else if (type === 'bank') {
      // البنوك: فلتر حسب نوع البنك (توفير، جاري...)
      const subTypes = this.extractUniqueValues(typeAccounts, 'subType');
      if (subTypes.length > 1) {
        filters.push({ key: 'subType', label: 'نوع الحساب', icon: 'category', values: subTypes });
      }
      // فلتر حسب البنك (الكريمي، الأهلي...)
      const providers = this.extractUniqueValues(typeAccounts, 'provider');
      if (providers.length > 1) {
        filters.push({ key: 'provider', label: 'البنك', icon: 'account_balance', values: providers });
      }
    } else if (type === 'exchange') {
      // الصرافين: فلتر حسب الصراف
      const providers = this.extractUniqueValues(typeAccounts, 'provider');
      if (providers.length > 1) {
        filters.push({ key: 'provider', label: 'الصراف', icon: 'currency_exchange', values: providers });
      }
    } else if (type === 'e_wallet') {
      // المحافظ: فلتر حسب نوع المحفظة (شخصي، وكيل...)
      const subTypes = this.extractUniqueValues(typeAccounts, 'subType');
      if (subTypes.length > 1) {
        filters.push({ key: 'subType', label: 'نوع المحفظة', icon: 'category', values: subTypes });
      }
      // فلتر حسب المحفظة (جوالي، جيب...)
      const providers = this.extractUniqueValues(typeAccounts, 'provider');
      if (providers.length > 1) {
        filters.push({ key: 'provider', label: 'المحفظة', icon: 'account_balance_wallet', values: providers });
      }
    } else {
      // أنواع أخرى: fallback
      const dbCatsForType = dbCats[type] || [];
      if (dbCatsForType.length > 0) {
        const catValues = dbCatsForType.map((cat: any) => {
          const count = typeAccounts.filter(a => a.subType === cat.subTypeKey).length;
          return { value: cat.subTypeKey, count, icon: cat.icon, color: cat.color, displayName: cat.name };
        });
        filters.push({ key: 'subType', label: 'التصنيف', icon: 'category', values: catValues });
      } else {
        const subTypes = this.extractUniqueValues(typeAccounts, 'subType');
        if (subTypes.length > 1) {
          filters.push({ key: 'subType', label: 'التصنيف', icon: 'label', values: subTypes });
        }
        const providers = this.extractUniqueValues(typeAccounts, 'provider');
        if (providers.length > 1) {
          filters.push({ key: 'provider', label: 'الجهة', icon: 'business', values: providers });
        }
      }
    }

    // === فلتر الموظف (للفوترة فقط) ===
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
    const stationFilter = this.activeStationFilter();

    return this.accounts().filter(a => {
      const matchType = type === 'all' || a.accountType === type;
      const matchQ = !q || a.name.toLowerCase().includes(q) ||
        (a.provider || '').toLowerCase().includes(q) ||
        (a.responsiblePerson || '').toLowerCase().includes(q) ||
        (a.stationName || '').toLowerCase().includes(q) ||
        (a.subTypeLabel || '').toLowerCase().includes(q);

      // فلتر المحطة
      const matchStation = !stationFilter || a.stationId === stationFilter;

      // فلاتر فرعية
      let matchSub = true;
      if (type !== 'all') {
        for (const [key, vals] of Object.entries(subs)) {
          if (vals.length > 0) {
            const fieldVal = a[key] || '';
            if (vals.includes('__none__')) {
              const isNone = !fieldVal;
              const otherVals = vals.filter(v => v !== '__none__');
              if (isNone || otherVals.includes(fieldVal)) continue;
              matchSub = false; break;
            }
            if (!vals.includes(fieldVal)) { matchSub = false; break; }
          }
        }
      }

      return matchType && matchQ && matchSub && matchStation;
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
      const priority = ['billing', 'fund', 'bank', 'exchange', 'e_wallet'];
      const sortedKeys = [...typeMap.keys()].sort((a, b) => {
        const ia = priority.indexOf(a);
        const ib = priority.indexOf(b);
        if (ia >= 0 && ib >= 0) return ia - ib;
        if (ia >= 0) return -1;
        if (ib >= 0) return 1;
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
      let groupVal = a[groupField] || 'بدون تصنيف';
      // ترجمة أنواع الصناديق
      if (groupField === 'subType' && type === 'fund' && FUND_TYPE_LABELS[groupVal]) {
        groupVal = FUND_TYPE_LABELS[groupVal];
      }
      if (!groupMap.has(groupVal)) groupMap.set(groupVal, []);
      groupMap.get(groupVal)!.push(a);
    }

    const meta = getTypeMeta(type);
    const sortedEntries = [...groupMap.entries()].sort((a, b) => b[1].length - a[1].length);
    return sortedEntries.map(([groupLabel, items]) => {
      return {
        key: `${type}_${groupLabel}`,
        label: groupLabel,
        icon: meta.icon,
        color: meta.color,
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
      })),
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
      const [allData, fundTypesData, bankTypesData, exchangeTypesData, walletTypesData] = await Promise.all([
        this.api.getAllAccounts(this.bizId),
        this.api.getFundTypes(this.bizId).catch(() => []),
        this.api.getBankTypes(this.bizId).catch(() => []),
        this.api.getExchangeTypes(this.bizId).catch(() => []),
        this.api.getEWalletTypes(this.bizId).catch(() => []),
      ]);
      this.accounts.set(allData.accounts);
      this.allStations.set(allData.stations || []);
      this.dbTypeCategories.set({
        fund: fundTypesData,
        bank: bankTypesData,
        exchange: exchangeTypesData,
        e_wallet: walletTypesData,
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
    this.activeStationFilter.set(null);
  }

  hasActiveSubFilters(): boolean {
    return Object.values(this.activeSubFilters()).some(v => v.length > 0) || this.activeStationFilter() !== null;
  }

  setActiveType(type: string) {
    this.activeType.set(type);
    this.activeSubFilters.set({});
    this.activeStationFilter.set(null);
    this.collapsedGroups.set(new Set());
  }

  setStationFilter(stationId: number | null) {
    this.activeStationFilter.set(this.activeStationFilter() === stationId ? null : stationId);
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
      const uniqueVals = new Set(accs.map(a => a[preferredField]).filter(Boolean));
      if (uniqueVals.size > 1) return preferredField;
    }

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
      _source: acc._source || 'accounts',
    });
    this.showForm.set(true);
  }

  async saveForm() {
    const f = this.form();
    if (!f.name.trim()) { this.error.set('اسم الحساب مطلوب'); return; }
    try {
      const source = f._source || 'accounts';
      if (source === 'funds') {
        // حفظ في جدول funds
        const fundData = {
          name: f.name,
          fundType: f.subType || 'collection',
          responsiblePerson: f.responsiblePerson,
          notes: f.notes,
          isActive: f.isActive,
        };
        if (this.editingId()) {
          await this.api.updateFund(this.bizId, this.editingId()!, fundData);
        } else {
          await this.api.createFund(this.bizId, fundData);
        }
      } else {
        // حفظ في جدول accounts
        const accountData = {
          name: f.name, accountType: f.accountType,
          accountNumber: f.accountNumber, provider: f.provider,
          subType: f.subType, responsiblePerson: f.responsiblePerson,
          notes: f.notes, isActive: f.isActive,
        };
        if (this.editingId()) {
          await this.api.updateAccount(this.editingId()!, accountData);
        } else {
          await this.api.createAccount(this.bizId, accountData);
        }
      }
      this.showForm.set(false);
      await this.loadAccounts();
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async deleteAccount(acc: any) {
    if (!confirm('هل تريد حذف هذا الحساب؟')) return;
    try {
      const source = acc._source || 'accounts';
      if (source === 'funds') {
        await this.api.deleteFund(this.bizId, acc.id);
      } else {
        await this.api.deleteAccount(acc.id);
      }
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
