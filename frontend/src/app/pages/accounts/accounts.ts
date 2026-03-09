import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { ACCOUNT_TYPE_META, getAccTypeMeta } from '../../shared/constants/account-types';
import { ThreeNetworkComponent, NetworkNode, NetworkLink } from '../../components/three-network/three-network';

function getTypeMeta(type: string) {
  return getAccTypeMeta(type);
}

/** ترتيب عرض أنواع الحسابات ثابت في كل الصفحة (شجرة، مجمّع، إحصائيات) */
const ACCOUNT_TYPE_DISPLAY_ORDER = [
  'billing',
  'fund',
  'bank',
  'exchange',
  'e_wallet',
  'warehouse',
  'custody',
  'supplier',
  'employee',
  'partner',
  'budget',
  'settlement',
  'pending',
  'accounting',
] as const;

function accountTypeSortIndex(type: string): number {
  const i = ACCOUNT_TYPE_DISPLAY_ORDER.indexOf(type as any);
  return i >= 0 ? i : ACCOUNT_TYPE_DISPLAY_ORDER.length;
}

/** ترتيب عنصر حساب: رقم تسلسلي ثم رمز ثم اسم */
function accountItemSortKey(a: any): string {
  const seq = a.sequenceNumber != null && a.sequenceNumber !== '' ? String(a.sequenceNumber).padStart(8, '0') : '99999999';
  const code = (a.code != null && a.code !== '') ? a.code : '';
  const name = (a.name != null && a.name !== '') ? a.name : '';
  return `${seq}_${code}_${name}`;
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

interface MainAccountType {
  key: string;
  label: string;
  icon: string;
  color: string;
  description: string;
}

interface SubType {
  id: number;
  name: string;
  subTypeKey: string;
  description: string;
  icon: string;
  color: string;
  sequenceNumber: number;
}

/** عقدة شجرية لحساب (من جدول accounts فقط) */
export interface AccountTreeNode {
  item: any;
  children: AccountTreeNode[];
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, ThreeNetworkComponent],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class AccountsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);
  loading = signal(true);
  accounts = signal<any[]>([]);
  allStations = signal<any[]>([]);
  error = signal('');

  // UI State
  showHowItWorks = signal(false);
  showNetworkView = signal(false);
  networkNodes = signal<NetworkNode[]>([]);
  networkLinks = signal<NetworkLink[]>([]);
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

  // عرض القائمة: مجمّع حسب النوع | شجري (حسب parent)
  viewMode = signal<'grouped' | 'tree'>('grouped');
  // طي/فتح العقد في العرض الشجري (معرّف الحساب)
  expandedTreeIds = signal<Set<number>>(new Set());

  form = signal<any>({
    name: '', accountType: 'fund', accountNumber: '', provider: '',
    subType: '', subTypeId: null, subTypeTouched: false, responsiblePerson: '', notes: '', isActive: true,
  });

  // قائمة ثابتة لأنواع الحسابات المعروفة - تُستخدم في نموذج الإضافة فقط
  knownAccountTypes = Object.entries(ACCOUNT_TYPE_META).map(([value, meta]) => ({ value, ...meta }));

  // ===== أنواع الحسابات الرئيسية والفرعية =====
  mainAccountTypes: MainAccountType[] = [
    { key: 'fund', label: 'صندوق', icon: 'savings', color: '#4CAF50', description: 'صناديق التحصيل والتوريد، السلف، العهدات' },
    { key: 'bank', label: 'بنك', icon: 'account_balance', color: '#2196F3', description: 'حسابات البنوك (توفير، جاري)' },
    { key: 'exchange', label: 'صراف', icon: 'currency_exchange', color: '#FF9800', description: 'حسابات الصرافين' },
    { key: 'e_wallet', label: 'محفظة إلكترونية', icon: 'account_balance_wallet', color: '#9C27B0', description: 'جوالي، جيب، ون كاش' },
    { key: 'warehouse', label: 'مخزن', icon: 'warehouse', color: '#795548', description: 'المخازن الرئيسية والفرعية' },
    { key: 'billing', label: 'فوترة', icon: 'receipt', color: '#E91E63', description: 'أنظمة الفوترة' },
    { key: 'custody', label: 'عهدة', icon: 'lock', color: '#607D8B', description: 'العهدات الشخصية' },
    { key: 'supplier', label: 'مورد', icon: 'local_shipping', color: '#f97316', description: 'حسابات الموردين' },
    { key: 'employee', label: 'موظف', icon: 'person', color: '#06b6d4', description: 'حسابات الموظفين' },
    { key: 'partner', label: 'شريك', icon: 'handshake', color: '#d946ef', description: 'حسابات الشركاء' },
    { key: 'budget', label: 'ميزانية', icon: 'account_balance_wallet', color: '#84cc16', description: 'حسابات الميزانية والمصروفات' },
    { key: 'settlement', label: 'تصفية', icon: 'balance', color: '#0891b2', description: 'حسابات التسويات والتصفية' },
    { key: 'pending', label: 'معلقة', icon: 'pending_actions', color: '#ef4444', description: 'حسابات العمليات المعلقة' },
    { key: 'accounting', label: 'أخرى', icon: 'book', color: '#14b8a6', description: 'حسابات مرنة يحددها المستخدم' },
  ];

  // التصنيفات الفرعية للنوع المختار في النموذج
  availableSubTypes = computed<SubType[]>(() => {
    const type = this.form().accountType;
    const categories = this.dbTypeCategories();
    const raw = categories[type] || [];
    return raw.filter((s: SubType) => {
      const key = String(s?.subTypeKey || '').trim().toLowerCase();
      // إخفاء أي خيار يمثل "بدون تصنيف"
      if (!Number.isInteger(s?.id) || Number(s.id) <= 0) return false;
      if (!key) return false;
      if (key === 'default' || key === '__none__' || key === 'none' || key === 'without_subtype') return false;
      return true;
    });
  });

  hasValidSubTypeSelection = computed(() => {
    const selectedSubTypeId = Number(this.form().subTypeId);
    return Number.isInteger(selectedSubTypeId) && selectedSubTypeId > 0;
  });

  // ===== فلاتر ديناميكية: تُحسب من البيانات الفعلية =====
  dynamicFilters = computed(() => {
    const all = this.accounts();
    const typesInDB = [...new Set(all.map(a => a.accountType).filter(Boolean))] as string[];

    // اعرض دائمًا الأنواع الرئيسية المعتمدة بالخطة حتى لو لا توجد بيانات منها حاليًا.
    const plannedTypes = [...ACCOUNT_TYPE_DISPLAY_ORDER] as string[];
    const unknownTypes = typesInDB
      .filter((t) => !plannedTypes.includes(t))
      .sort((a, b) => accountTypeSortIndex(a) - accountTypeSortIndex(b));

    const allTypes = [...plannedTypes, ...unknownTypes];
    return allTypes.map(type => ({ value: type, ...getTypeMeta(type) }));
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
    const stationIds = new Set(typeAccounts.map(a => a.stationId));
    return this.allStations().filter(s => stationIds.has(s.id));
  });

  // ===== فلاتر فرعية ديناميكية حسب النوع المختار =====
  subFilterOptions = computed(() => {
    const type = this.activeType();
    if (type === 'all') return [];
    const typeAccounts = this.accounts().filter(a => a.accountType === type);
    const dbCats = this.dbTypeCategories();

    const filters: { key: string; label: string; icon: string; values: { value: string; count: number; icon?: string; color?: string; displayName?: string }[] }[] = [];

    // === فلتر التصنيف الفرعي (subType) - يستخدم البيانات من قاعدة البيانات ===
    const dbCatsForType = dbCats[type] || [];
    if (dbCatsForType.length > 0) {
      // استخدام التصنيفات من قاعدة البيانات
      const subTypeMap = new Map<string, number>();
      for (const a of typeAccounts) {
        const st = a.subType || '__none__';
        subTypeMap.set(st, (subTypeMap.get(st) || 0) + 1);
      }
      
      const values = [...subTypeMap.entries()].map(([value, count]) => {
        const dbCat = dbCatsForType.find((c: any) => c.subTypeKey === value);
        return {
          value,
          count,
          displayName: value === '__none__' ? 'بدون تصنيف' : (dbCat?.name || value),
          icon: value === '__none__' ? 'label_off' : (dbCat?.icon || 'category'),
          color: dbCat?.color,
        };
      });
      
      if (values.length > 1 || (values.length === 1 && values[0].value !== '__none__')) {
        const filterLabel = type === 'fund' ? 'نوع الصندوق' :
                           type === 'bank' ? 'نوع الحساب' :
                           type === 'e_wallet' ? 'نوع المحفظة' :
                           type === 'exchange' ? 'نوع الصراف' :
                           type === 'warehouse' ? 'نوع المخزن' : 'التصنيف';
        filters.push({ key: 'subType', label: filterLabel, icon: 'category', values });
      }
    }
    
    if (type === 'billing') {
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
      
      // فلتر الموظف (للفوترة فقط)
      const persons = this.extractUniqueValues(typeAccounts, 'responsiblePerson');
      if (persons.length > 1) {
        filters.push({ key: 'responsiblePerson', label: 'الموظف', icon: 'person', values: persons });
      }
    } else {
      // فلتر الجهة/المزود (provider) - للأنواع غير الفوترة
      const providerLabel = type === 'bank' ? 'البنك' :
                           type === 'exchange' ? 'الصراف' :
                           type === 'e_wallet' ? 'المحفظة' : 'الجهة';
      const providerIcon = type === 'bank' ? 'account_balance' :
                          type === 'exchange' ? 'currency_exchange' :
                          type === 'e_wallet' ? 'account_balance_wallet' : 'business';
      const providers = this.extractUniqueValues(typeAccounts, 'provider');
      if (providers.length > 1) {
        filters.push({ key: 'provider', label: providerLabel, icon: providerIcon, values: providers });
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

  // ===== الشجرة للحسابات (من جدول accounts فقط) — مرتبة: نوع ثم تسلسل/رمز/اسم =====
  accountsTree = computed<AccountTreeNode[]>(() => {
    const accs = this.filteredAccounts().filter((a: any) => a._source === 'accounts');
    if (accs.length === 0) return [];
    const byId = new Map<number, any>();
    for (const a of accs) {
      const id = Number(a.id);
      if (!Number.isNaN(id)) byId.set(id, a);
    }
    const buildChildren = (parentId: number | null): AccountTreeNode[] => {
      const list = accs
        .filter((a: any) => {
          const pid = a.parentAccountId != null ? Number(a.parentAccountId) : null;
          return pid === parentId;
        })
        .map((a: any) => ({
          item: a,
          children: buildChildren(Number(a.id)),
        }));
      list.sort((na, nb) => accountItemSortKey(na.item).localeCompare(accountItemSortKey(nb.item), 'ar'));
      return list;
    };
    // جذور: بدون parent أو parent غير موجود في القائمة، مرتبة: نوع ثم تسلسل/رمز/اسم
    const roots = accs.filter((a: any) => {
      const pid = a.parentAccountId != null ? Number(a.parentAccountId) : null;
      return pid == null || !byId.has(pid);
    });
    roots.sort((a, b) => {
      const ti = accountTypeSortIndex(a.accountType) - accountTypeSortIndex(b.accountType);
      if (ti !== 0) return ti;
      return accountItemSortKey(a).localeCompare(accountItemSortKey(b), 'ar');
    });
    return roots.map((a: any) => ({
      item: a,
      children: buildChildren(Number(a.id)),
    }));
  });

  // عند العرض الشجري: حسابات غير من جدول accounts (صناديق، فوترة) — مرتبة: نوع ثم اسم
  nonTreeAccounts = computed(() => {
    const list = this.filteredAccounts().filter((a: any) => a._source !== 'accounts');
    list.sort((a, b) => {
      const ti = accountTypeSortIndex(a.accountType) - accountTypeSortIndex(b.accountType);
      if (ti !== 0) return ti;
      return (a.name || '').localeCompare(b.name || '', 'ar');
    });
    return list;
  });

  /** تسطيح الشجرة إلى قائمة (عقدة + عمق) مع احترام طي/فتح العقد */
  treeList = computed<{ node: AccountTreeNode; depth: number }[]>(() => {
    const tree = this.accountsTree();
    const expanded = this.expandedTreeIds();
    const out: { node: AccountTreeNode; depth: number }[] = [];
    const walk = (nodes: AccountTreeNode[], depth: number) => {
      for (const n of nodes) {
        out.push({ node: n, depth });
        if (n.children.length > 0 && expanded.has(Number(n.item.id))) {
          walk(n.children, depth + 1);
        }
      }
    };
    walk(tree, 0);
    return out;
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
      const sortedKeys = [...typeMap.keys()].sort((a, b) => accountTypeSortIndex(a) - accountTypeSortIndex(b));
      return sortedKeys.map(key => {
        const meta = getTypeMeta(key);
        const items = [...(typeMap.get(key)!)];
        items.sort((a: any, b: any) => accountItemSortKey(a).localeCompare(accountItemSortKey(b), 'ar'));
        return {
          key,
          label: meta.label,
          icon: meta.icon,
          color: meta.color,
          accounts: items,
          count: items.length,
          collapsed: collapsed.has(key),
        };
      });
    }

    // في وضع نوع محدد: نجمع حسب الحقل الأنسب لكل نوع
    const groupField = this.getBestGroupField(type, accs);
    const groupMap = new Map<string, any[]>();
    const dbCats = this.dbTypeCategories()[type] || [];
    
    for (const a of accs) {
      let groupVal = a[groupField] || 'بدون تصنيف';
      // ترجمة التصنيفات من قاعدة البيانات
      if (groupField === 'subType') {
        const dbCat = dbCats.find((c: any) => c.subTypeKey === groupVal);
        if (dbCat) {
          groupVal = dbCat.name;
        }
      }
      if (!groupMap.has(groupVal)) groupMap.set(groupVal, []);
      groupMap.get(groupVal)!.push(a);
    }

    const meta = getTypeMeta(type);
    const sortedEntries = [...groupMap.entries()].sort((a, b) => b[1].length - a[1].length);
    return sortedEntries.map(([groupLabel, items]) => {
      const sortedItems = [...items].sort((a: any, b: any) => accountItemSortKey(a).localeCompare(accountItemSortKey(b), 'ar'));
      return {
        key: `${type}_${groupLabel}`,
        label: groupLabel,
        icon: meta.icon,
        color: meta.color,
        accounts: sortedItems,
        count: sortedItems.length,
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

  protected override onBizIdChange(_bizId: number): void {
    if (this.bizId <= 0) return;
    void this.loadAccounts();
  }

  async loadAccounts() {
    if (this.bizId <= 0) {
      this.loading.set(false);
      return;
    }
    this.loading.set(true);
    try {
      const [allData, fundTypesData, bankTypesData, exchangeTypesData, walletTypesData, warehouseTypesData, accountingTypesData] = await Promise.all([
        this.api.getAllAccounts(this.bizId),
        this.api.getFundTypes(this.bizId).catch(() => []),
        this.api.getBankTypes(this.bizId).catch(() => []),
        this.api.getExchangeTypes(this.bizId).catch(() => []),
        this.api.getEWalletTypes(this.bizId).catch(() => []),
        this.api.getWarehouseTypes(this.bizId).catch(() => []),
        this.api.getAccountingTypes(this.bizId).catch(() => []),
      ]);
      this.accounts.set(allData.accounts);
      this.allStations.set(allData.stations || []);
      this.dbTypeCategories.set({
        fund: fundTypesData,
        bank: bankTypesData,
        exchange: exchangeTypesData,
        e_wallet: walletTypesData,
        warehouse: warehouseTypesData,
        accounting: accountingTypesData,
      });
      this.buildNetworkData();
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : JSON.stringify(e));
    } finally {
      this.loading.set(false);
    }
  }

  /** بناء بيانات شبكة العلاقات ثلاثية الأبعاد */
  private buildNetworkData(): void {
    const accs = this.accounts();
    if (accs.length === 0) return;

    const nodes: NetworkNode[] = [];
    const links: NetworkLink[] = [];
    const typeGroups = new Map<string, string[]>();

    accs.forEach(acc => {
      const meta = getTypeMeta(acc.accountType);
      nodes.push({
        id: `acc-${acc.id}`,
        label: acc.name,
        value: 1,
        color: meta.color,
        group: acc.accountType,
      });

      if (!typeGroups.has(acc.accountType)) typeGroups.set(acc.accountType, []);
      typeGroups.get(acc.accountType)!.push(`acc-${acc.id}`);
    });

    // إنشاء عقد مركزية لكل نوع
    typeGroups.forEach((ids, type) => {
      const meta = getTypeMeta(type);
      const hubId = `hub-${type}`;
      nodes.push({
        id: hubId,
        label: meta.label,
        value: ids.length,
        color: meta.color,
        group: type,
      });
      ids.forEach(id => {
        links.push({ source: hubId, target: id });
      });
    });

    this.networkNodes.set(nodes);
    this.networkLinks.set(links);
  }

  toggleNetworkView(): void {
    this.showNetworkView.update(v => !v);
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

  toggleTreeExpand(id: number) {
    this.expandedTreeIds.update(set => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  expandAllTree() {
    const collectIds = (nodes: AccountTreeNode[]): number[] => {
      let ids: number[] = [];
      for (const n of nodes) {
        if (n.children.length > 0) ids.push(Number(n.item.id));
        ids = ids.concat(collectIds(n.children));
      }
      return ids;
    };
    this.expandedTreeIds.set(new Set(collectIds(this.accountsTree())));
  }

  collapseAllTree() {
    this.expandedTreeIds.set(new Set());
  }

  // ===== تحديد حقل التجميع الأنسب لكل نوع حساب =====
  private getBestGroupField(type: string, accs: any[]): string {
    const typeToField: Record<string, string> = {
      billing: 'provider',
      fund: 'subType',
      exchange: 'provider',
      bank: 'provider',
      e_wallet: 'provider',
      custody: 'subType',
      supplier: 'subType',
      employee: 'subType',
      partner: 'subType',
      budget: 'subType',
      settlement: 'subType',
      pending: 'subType',
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
      name: '', accountType: this.activeType() === 'all' ? 'fund' : this.activeType(),
      accountNumber: '', provider: '', subType: '', responsiblePerson: '',
      subTypeId: null, subTypeTouched: false, notes: '', isActive: true,
    });
    this.showForm.set(true);
  }

  openEdit(acc: any) {
    this.editingId.set(acc.id);
    this.form.set({
      name: acc.name, accountType: acc.accountType,
      accountNumber: acc.accountNumber || '', provider: acc.provider || '',
      subType: acc.subType || '', responsiblePerson: acc.responsiblePerson || '',
      subTypeId: acc.subTypeId ?? null,
      subTypeTouched: true,
      notes: acc.notes || '', isActive: acc.isActive ?? true,
      _source: acc._source || 'accounts',
    });
    this.showForm.set(true);
  }

  async saveForm() {
    const f = this.form();
    if (!f.name.trim()) { this.error.set('اسم الحساب مطلوب'); return; }
    if (!f.subTypeTouched) {
      this.error.set('اختيار التصنيف الفرعي إلزامي قبل حفظ الحساب');
      return;
    }
    const selectedSubTypeId = Number(f.subTypeId);
    const hasSubTypesForType = this.availableSubTypes().length > 0;
    if (!Number.isInteger(selectedSubTypeId) || selectedSubTypeId <= 0) {
      this.error.set(
        hasSubTypesForType
          ? 'اختيار التصنيف الفرعي إلزامي قبل حفظ الحساب'
          : `لا يمكن حفظ الحساب من نوع "${getTypeMeta(f.accountType).label}" بدون تصنيف. أضف تصنيفًا أولاً من صفحة أنواع الحسابات.`,
      );
      return;
    }
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
          subType: f.subType, subTypeId: selectedSubTypeId, responsiblePerson: f.responsiblePerson,
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
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : JSON.stringify(e));
    }
  }

  async deleteAccount(acc: any) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: 'هل تريد حذف هذا الحساب؟', type: 'danger' });
    if (!confirmed) return;
    try {
      const source = acc._source || 'accounts';
      if (source === 'funds') {
        await this.api.deleteFund(this.bizId, acc.id);
      } else {
        await this.api.deleteAccount(acc.id);
      }
      await this.loadAccounts();
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : JSON.stringify(e));
    }
  }

  setFormField(field: string, value: any) {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  // عند تغيير النوع الرئيسي، نمسح التصنيف الفرعي
  onAccountTypeChange(type: string) {
    this.form.update(f => ({
      ...f,
      accountType: type,
      subType: '',
      subTypeId: null,
      subTypeTouched: false,
    }));
  }

  // عند اختيار تصنيف فرعي
  onSubTypeChange(subTypeId: number | null) {
    const subTypes = this.availableSubTypes();
    const selected = subTypes.find(s => s.id === subTypeId);
    if (!selected) {
      this.form.update(f => ({
        ...f,
        subTypeId: null,
        subType: '',
        subTypeTouched: false,
      }));
      return;
    }
    this.form.update(f => ({
      ...f,
      subTypeId: subTypeId,
      subType: selected.subTypeKey || '',
      subTypeTouched: true,
    }));
  }

  // الحصول على معلومات النوع الرئيسي
  getMainTypeInfo(key: string): MainAccountType | undefined {
    return this.mainAccountTypes.find(t => t.key === key);
  }

  getTypeInfo(type: string) {
    return { value: type, ...getTypeMeta(type) };
  }

  trackById(_: number, item: any) { return item.id; }
  trackByKey(_: number, item: AccountGroup) { return item.key; }
}
