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

const ACCOUNT_TYPES_PAGE_MAIN_SEQUENCE_ORDER = [
  'fund',
  'bank',
  'e_wallet',
  'exchange',
  'warehouse',
  'custody',
  'supplier',
  'employee',
  'partner',
  'billing',
  'budget',
  'settlement',
  'pending',
] as const;

const ACCOUNT_TYPE_FALLBACK_ORDER = [
  ...ACCOUNT_TYPES_PAGE_MAIN_SEQUENCE_ORDER,
  'accounting',
] as const;

function accountTypeSortIndex(type: string): number {
  const normalized = type.startsWith('accounting:') ? 'accounting' : type;
  const i = ACCOUNT_TYPE_FALLBACK_ORDER.indexOf(normalized as any);
  return i >= 0 ? i : ACCOUNT_TYPE_FALLBACK_ORDER.length;
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

interface SubtypeGroup {
  key: string;
  label: string;
  icon: string;
  color: string;
  accounts: any[];
  count: number;
  collapsed: boolean;
  sequenceNumber?: number | null;
}

interface TypeSubtypeGroup {
  key: string;
  label: string;
  icon: string;
  color: string;
  count: number;
  collapsed: boolean;
  subGroups: SubtypeGroup[];
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
  mainTypeId?: number | null;
}

interface FormMainTypeOption {
  key: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  accountType: string;
  accountingMainTypeId: number | null;
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
  accountingMainTypes = signal<any[]>([]);

  // حالة طي/فتح المجموعات
  collapsedGroups = signal<Set<string>>(new Set());

  // عرض القائمة: حسب النوع | حسب التصنيف الفرعي | (legacy) شجري
  viewMode = signal<'grouped' | 'subtype' | 'tree'>('grouped');
  // طي/فتح العقد في العرض الشجري (معرّف الحساب)
  expandedTreeIds = signal<Set<number>>(new Set());

  form = signal<any>({
    name: '', accountType: 'fund', accountNumber: '', provider: '',
    subType: '', subTypeId: null, accountingMainTypeId: null, subTypeTouched: false, responsiblePerson: '', notes: '', isActive: true,
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
    const selectedAccountingMainTypeId = Number(this.form().accountingMainTypeId);
    const categories = this.dbTypeCategories();
    const raw = categories[type] || [];
    return raw.filter((s: SubType) => {
      if (
        type === 'accounting' &&
        Number.isInteger(selectedAccountingMainTypeId) &&
        selectedAccountingMainTypeId > 0 &&
        Number(s?.mainTypeId || 0) !== selectedAccountingMainTypeId
      ) {
        return false;
      }
      const key = String(s?.subTypeKey || '').trim().toLowerCase();
      // إخفاء أي خيار يمثل "بدون تصنيف"
      if (!Number.isInteger(s?.id) || Number(s.id) <= 0) return false;
      if (!key) return false;
      if (key === 'default' || key === '__none__' || key === 'none' || key === 'without_subtype') return false;
      return true;
    });
  });

  formMainTypeOptions = computed<FormMainTypeOption[]>(() => {
    const base = this.mainAccountTypes
      .filter((t) => t.key !== 'accounting')
      .map((t) => ({
        key: t.key,
        label: t.label,
        icon: t.icon,
        color: t.color,
        description: t.description,
        accountType: t.key,
        accountingMainTypeId: null,
      }));

    const systemAccounting = this.mainAccountTypes.find((t) => t.key === 'accounting');
    if (systemAccounting) {
      base.push({
        key: systemAccounting.key,
        label: systemAccounting.label,
        icon: systemAccounting.icon,
        color: systemAccounting.color,
        description: systemAccounting.description,
        accountType: systemAccounting.key,
        accountingMainTypeId: null,
      });
    }

    const customAccounting = (this.accountingMainTypes() || [])
      .filter((m: any) => m?.isActive !== false)
      .map((m: any) => ({
        key: `accounting:${m.id}`,
        label: String(m.name || 'نوع رئيسي'),
        icon: String(m.icon || 'book'),
        color: String(m.color || '#14b8a6'),
        description: String(m.description || 'نوع رئيسي مرتبط بالحسابات المرنة'),
        accountType: 'accounting',
        accountingMainTypeId: Number(m.id) || null,
      }));

    return [...base, ...customAccounting];
  });

  selectedFormMainType = computed<FormMainTypeOption | null>(() => {
    const currentType = this.form().accountType;
    const currentAccountingMainTypeId = Number(this.form().accountingMainTypeId);
    return (
      this.formMainTypeOptions().find((opt) => {
        if (opt.accountType !== currentType) return false;
        if (currentType !== 'accounting') return true;
        if (Number.isInteger(currentAccountingMainTypeId) && currentAccountingMainTypeId > 0) {
          return opt.accountingMainTypeId === currentAccountingMainTypeId;
        }
        return opt.accountingMainTypeId === null;
      }) || null
    );
  });

  private parseAccountingMainTypeId(type: string): number | null {
    if (!type.startsWith('accounting:')) return null;
    const id = Number(type.split(':')[1] || 0);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  private effectiveAccountType(type: string): string {
    return type.startsWith('accounting:') ? 'accounting' : type;
  }

  private accountMatchesTypeFilter(account: any, type: string): boolean {
    if (type === 'all') return true;
    const accountingMainTypeId = this.parseAccountingMainTypeId(type);
    if (accountingMainTypeId == null) {
      return account.accountType === type;
    }
    if (account.accountType !== 'accounting') return false;
    const accountingCategories = this.dbTypeCategories()['accounting'] || [];
    const cat = accountingCategories.find((c: any) => c.subTypeKey === account.subType);
    return Number(cat?.mainTypeId || 0) === accountingMainTypeId;
  }

  private getAccountTypeGroupKey(account: any): string {
    const accountType = this.effectiveAccountType(String(account?.accountType || ''));
    if (accountType !== 'accounting') return accountType;
    const accountingCategories = this.dbTypeCategories()['accounting'] || [];
    const cat = accountingCategories.find((c: any) => c.subTypeKey === account?.subType);
    const mainTypeId = Number(cat?.mainTypeId || 0);
    if (Number.isInteger(mainTypeId) && mainTypeId > 0) return `accounting:${mainTypeId}`;
    return 'accounting';
  }

  getTypeSequence(type: string): number | null {
    const accountingMainTypeId = this.parseAccountingMainTypeId(type);
    if (accountingMainTypeId != null) {
      const allCustom = this.accountingMainTypes() || [];
      const idx = allCustom.findIndex((m: any) => Number(m.id) === accountingMainTypeId);
      if (idx >= 0) return ACCOUNT_TYPES_PAGE_MAIN_SEQUENCE_ORDER.length + idx + 1;
      return null;
    }
    const effectiveType = this.effectiveAccountType(type);
    const idx = ACCOUNT_TYPES_PAGE_MAIN_SEQUENCE_ORDER.indexOf(effectiveType as any);
    if (idx >= 0) return idx + 1;
    return null;
  }

  withTypeSequence(type: string, label: string): string {
    const seq = this.getTypeSequence(type);
    return seq ? `${seq} ${label}` : label;
  }

  hasValidSubTypeSelection = computed(() => {
    const selectedSubTypeId = Number(this.form().subTypeId);
    return Number.isInteger(selectedSubTypeId) && selectedSubTypeId > 0;
  });

  // ===== فلاتر ديناميكية: تُحسب من البيانات الفعلية =====
  dynamicFilters = computed(() => {
    // مطابق تماماً لصفحة أنواع الحسابات (الأنواع النظامية الرئيسية فقط)
    const plannedTypes = [...ACCOUNT_TYPES_PAGE_MAIN_SEQUENCE_ORDER] as string[];
    const allTypes = plannedTypes.map((type) => ({ value: type, ...getTypeMeta(type) }));
    const customMainTypes = (this.accountingMainTypes() || [])
      .map((m: any) => ({
        value: `accounting:${m.id}`,
        label: String(m.name || 'نوع رئيسي'),
        icon: String(m.icon || 'category'),
        color: String(m.color || '#14b8a6'),
      }));
    return [...allTypes, ...customMainTypes];
  });

  // ===== هل النوع المختار يدعم فلتر المحطة =====
  typeHasStationFilter = computed(() => {
    const type = this.effectiveAccountType(this.activeType());
    // الأنواع التي تدعم فلتر المحطة: صندوق، فوترة
    return ['fund', 'billing'].includes(type);
  });

  // ===== المحطات المتاحة للنوع المختار =====
  availableStations = computed(() => {
    const type = this.activeType();
    if (type === 'all') return [];
    const typeAccounts = this.accounts().filter(a => this.accountMatchesTypeFilter(a, type) && a.stationId);
    const stationIds = new Set(typeAccounts.map(a => a.stationId));
    return this.allStations().filter(s => stationIds.has(s.id));
  });

  // ===== فلاتر فرعية ديناميكية حسب النوع المختار =====
  subFilterOptions = computed(() => {
    const type = this.activeType();
    if (type === 'all') return [];
    const effectiveType = this.effectiveAccountType(type);
    const typeAccounts = this.accounts().filter(a => this.accountMatchesTypeFilter(a, type));
    const dbCats = this.dbTypeCategories();

    const filters: { key: string; label: string; icon: string; values: { value: string; count: number; icon?: string; color?: string; displayName?: string }[] }[] = [];

    // === فلتر التصنيف الفرعي (subType) - يستخدم البيانات من قاعدة البيانات ===
    const dbCatsForType = dbCats[effectiveType] || [];
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
        const filterLabel = effectiveType === 'fund' ? 'نوع الصندوق' :
                           effectiveType === 'bank' ? 'نوع الحساب' :
                           effectiveType === 'e_wallet' ? 'نوع المحفظة' :
                           effectiveType === 'exchange' ? 'نوع الصراف' :
                           effectiveType === 'warehouse' ? 'نوع المخزن' : 'التصنيف';
        filters.push({ key: 'subType', label: filterLabel, icon: 'category', values });
      }
    }
    
    if (effectiveType === 'billing') {
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
      const providerLabel = effectiveType === 'bank' ? 'البنك' :
                           effectiveType === 'exchange' ? 'الصراف' :
                           effectiveType === 'e_wallet' ? 'المحفظة' : 'الجهة';
      const providerIcon = effectiveType === 'bank' ? 'account_balance' :
                          effectiveType === 'exchange' ? 'currency_exchange' :
                          effectiveType === 'e_wallet' ? 'account_balance_wallet' : 'business';
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
      const matchType = this.accountMatchesTypeFilter(a, type);
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
    const effectiveType = this.effectiveAccountType(type);
    const groupField = this.getBestGroupField(effectiveType, accs);
    const groupMap = new Map<string, any[]>();
    const dbCats = this.dbTypeCategories()[effectiveType] || [];
    
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

    const meta = getTypeMeta(effectiveType);
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

  subtypeGroupedAccounts = computed<AccountGroup[]>(() => {
    const type = this.activeType();
    const accs = this.filteredAccounts();
    const collapsed = this.collapsedGroups();
    const groupMap = new Map<string, AccountGroup>();

    const readSubTypeLabel = (a: any): string => {
      const key = a.subType || '__none__';
      const effectiveType = this.effectiveAccountType(a.accountType || '');
      const dbCats = this.dbTypeCategories()[effectiveType] || [];
      const dbCat = dbCats.find((c: any) => c.subTypeKey === key);
      if (dbCat?.name) return dbCat.name;
      return key === '__none__' ? 'بدون تصنيف' : key;
    };

    for (const a of accs) {
      const effectiveType = this.effectiveAccountType(a.accountType || '');
      const typeMeta = getTypeMeta(effectiveType);
      const subTypeLabel = readSubTypeLabel(a);
      const key = type === 'all'
        ? `${effectiveType}::${subTypeLabel}`
        : `${type}::${subTypeLabel}`;
      const label = type === 'all'
        ? `${typeMeta.label} / ${subTypeLabel}`
        : subTypeLabel;

      if (!groupMap.has(key)) {
        groupMap.set(key, {
          key,
          label,
          icon: 'category',
          color: typeMeta.color,
          accounts: [],
          count: 0,
          collapsed: false,
        });
      }
      const g = groupMap.get(key)!;
      g.accounts.push(a);
      g.count += 1;
    }

    const groups = [...groupMap.values()]
      .sort((a, b) => b.count - a.count)
      .map((g) => ({
        ...g,
        accounts: [...g.accounts].sort((a: any, b: any) => accountItemSortKey(a).localeCompare(accountItemSortKey(b), 'ar')),
        collapsed: collapsed.has(g.key),
      }));
    return groups;
  });

  typeSubtypeGroups = computed<TypeSubtypeGroup[]>(() => {
    const accs = this.filteredAccounts();
    const collapsed = this.collapsedGroups();
    const groupedByType = new Map<string, any[]>();

    for (const a of accs) {
      const typeKey = this.getAccountTypeGroupKey(a);
      if (!groupedByType.has(typeKey)) groupedByType.set(typeKey, []);
      groupedByType.get(typeKey)!.push(a);
    }

    const typeKeys = [...groupedByType.keys()].sort((a, b) => {
      const sa = this.getTypeSequence(a) ?? 999999;
      const sb = this.getTypeSequence(b) ?? 999999;
      if (sa !== sb) return sa - sb;
      return accountTypeSortIndex(a) - accountTypeSortIndex(b);
    });
    return typeKeys.map((typeKey) => {
      const typeMeta = this.getTypeInfo(typeKey);
      const typeGroupKey = `type::${typeKey}`;
      const typeAccounts = groupedByType.get(typeKey) || [];

      const subMap = new Map<string, any[]>();
      for (const a of typeAccounts) {
        const dbCats = this.dbTypeCategories()[typeKey] || [];
        const dbCat = dbCats.find((c: any) => c.subTypeKey === (a.subType || ''));
        const subLabel = dbCat?.name || (a.subTypeLabel || a.subType || 'بدون تصنيف');
        const subMapKey = `${String(a.subType || '__none__')}||${subLabel}`;
        if (!subMap.has(subMapKey)) subMap.set(subMapKey, []);
        subMap.get(subMapKey)!.push(a);
      }

      const subGroups: SubtypeGroup[] = [...subMap.entries()]
        .map(([compoundKey, list]) => {
          const [subTypeKey, subLabel] = compoundKey.split('||');
          const dbCats = this.dbTypeCategories()[typeKey] || [];
          const dbCat = dbCats.find((c: any) => c.subTypeKey === subTypeKey);
          const subSeq = Number(dbCat?.sequenceNumber || 0);
          const validSeq = Number.isInteger(subSeq) && subSeq > 0 ? subSeq : null;
          const subKey = `sub::${typeKey}::${subTypeKey}`;
          return {
            key: subKey,
            label: validSeq ? `${validSeq} ${subLabel}` : subLabel,
            icon: 'category',
            color: typeMeta.color,
            accounts: [...list].sort((x: any, y: any) => accountItemSortKey(x).localeCompare(accountItemSortKey(y), 'ar')),
            count: list.length,
            collapsed: collapsed.has(subKey),
            sequenceNumber: validSeq,
          };
        })
        .sort((a, b) => {
          const sa = a.sequenceNumber ?? 999999;
          const sb = b.sequenceNumber ?? 999999;
          if (sa !== sb) return sa - sb;
          if (a.count !== b.count) return b.count - a.count;
          return a.label.localeCompare(b.label, 'ar');
        });

      return {
        key: typeGroupKey,
        label: this.withTypeSequence(typeKey, String(typeMeta.label)),
        icon: String(typeMeta.icon),
        color: String(typeMeta.color),
        count: typeAccounts.length,
        collapsed: collapsed.has(typeGroupKey),
        subGroups,
      };
    });
  });

  displayGroups = computed<AccountGroup[]>(() => this.groupedAccounts());

  stats = computed(() => {
    const all = this.accounts();
    return {
      total: all.length,
      active: all.filter(a => a.isActive).length,
      byType: this.dynamicFilters().map(t => ({
        ...t,
        count: all.filter(a => this.accountMatchesTypeFilter(a, t.value)).length,
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
      const [
        allData,
        fundTypesData,
        bankTypesData,
        exchangeTypesData,
        walletTypesData,
        warehouseTypesData,
        accountingTypesData,
        accountingMainTypesData,
      ] = await Promise.all([
        this.api.getAllAccounts(this.bizId),
        this.api.getFundTypes(this.bizId).catch(() => []),
        this.api.getBankTypes(this.bizId).catch(() => []),
        this.api.getExchangeTypes(this.bizId).catch(() => []),
        this.api.getEWalletTypes(this.bizId).catch(() => []),
        this.api.getWarehouseTypes(this.bizId).catch(() => []),
        this.api.getAccountingTypes(this.bizId).catch(() => []),
        this.api.getAccountingMainTypes(this.bizId).catch(() => []),
      ]);
      this.accounts.set(allData.accounts);
      this.allStations.set(allData.stations || []);
      this.accountingMainTypes.set(accountingMainTypesData || []);
      this.dbTypeCategories.set({
        fund: fundTypesData,
        bank: bankTypesData,
        exchange: exchangeTypesData,
        e_wallet: walletTypesData,
        warehouse: warehouseTypesData,
        accounting: (accountingTypesData || []).map((s: any) => ({
          ...s,
          name: s.mainTypeName ? `${s.mainTypeName} / ${s.name}` : s.name,
        })),
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

  collapseAllSubtype() {
    const keys: string[] = [];
    for (const typeGroup of this.typeSubtypeGroups()) {
      keys.push(typeGroup.key);
      for (const sub of typeGroup.subGroups) keys.push(sub.key);
    }
    this.collapsedGroups.set(new Set(keys));
  }

  expandAllSubtype() {
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
    const firstAccountingMainTypeId = Number((this.accountingMainTypes()[0] || {}).id) || null;
    const activeType = this.activeType();
    const parsedActiveAccountingMainTypeId = this.parseAccountingMainTypeId(activeType);
    const defaultType = activeType === 'all' ? 'fund' : this.effectiveAccountType(activeType);
    this.form.set({
      name: '', accountType: defaultType,
      accountNumber: '', provider: '', subType: '', responsiblePerson: '',
      subTypeId: null,
      accountingMainTypeId: defaultType === 'accounting' ? (parsedActiveAccountingMainTypeId || firstAccountingMainTypeId) : null,
      subTypeTouched: false, notes: '', isActive: true,
    });
    this.showForm.set(true);
  }

  openEdit(acc: any) {
    this.editingId.set(acc.id);
    const accountingCategories = this.dbTypeCategories()['accounting'] || [];
    const categoryForAccounting = acc.accountType === 'accounting'
      ? accountingCategories.find((c: any) => Number(c.id) === Number(acc.subTypeId))
      : null;
    this.form.set({
      name: acc.name, accountType: acc.accountType,
      accountNumber: acc.accountNumber || '', provider: acc.provider || '',
      subType: acc.subType || '', responsiblePerson: acc.responsiblePerson || '',
      subTypeId: acc.subTypeId ?? null,
      accountingMainTypeId: Number(categoryForAccounting?.mainTypeId || 0) || null,
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
          fundType: f.subType || '',
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
    const isAccountingOption = typeof type === 'string' && type.startsWith('accounting:');
    const parsedAccountingMainTypeId = isAccountingOption ? Number(type.split(':')[1] || 0) : 0;
    const nextAccountType = isAccountingOption ? 'accounting' : type;
    this.form.update(f => ({
      ...f,
      accountType: nextAccountType,
      accountingMainTypeId:
        nextAccountType === 'accounting'
          ? ((Number.isInteger(parsedAccountingMainTypeId) && parsedAccountingMainTypeId > 0) ? parsedAccountingMainTypeId : null)
          : null,
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
      accountingMainTypeId:
        f.accountType === 'accounting'
          ? (Number(selected.mainTypeId || 0) || f.accountingMainTypeId || null)
          : f.accountingMainTypeId,
      subTypeTouched: true,
    }));
  }

  // الحصول على معلومات النوع الرئيسي
  getMainTypeInfo(key: string): MainAccountType | undefined {
    return this.mainAccountTypes.find(t => t.key === key);
  }

  getTypeInfo(type: string) {
    const accountingMainTypeId = this.parseAccountingMainTypeId(type);
    if (accountingMainTypeId != null) {
      const main = (this.accountingMainTypes() || []).find((m: any) => Number(m.id) === accountingMainTypeId);
      if (main) {
        return {
          value: type,
          label: String(main.name || 'نوع رئيسي'),
          icon: String(main.icon || 'category'),
          color: String(main.color || '#14b8a6'),
        };
      }
    }
    const effectiveType = this.effectiveAccountType(type);
    return { value: type, ...getTypeMeta(effectiveType) };
  }

  trackById(_: number, item: any) { return item.id; }
  trackByKey(_: number, item: AccountGroup) { return item.key; }
}
