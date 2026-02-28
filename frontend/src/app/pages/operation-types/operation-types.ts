import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

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
  private toast = inject(ToastService);

  bizId = 0;
  loading = signal(true);
  saving = signal(false);
  error = signal('');
  success = signal('');

  // ===================== التبويب الرئيسي =====================
  // 'categories' = إدارة التصنيفات | 'templates' = القوالب
  activeTab = signal<'categories' | 'templates'>('templates');

  // ===================== Data =====================
  operationTypes = signal<any[]>([]);
  accounts = signal<any[]>([]);
  funds = signal<any[]>([]);

  // ===================== UI State =====================
  showHowItWorks = signal(false);
  showWizard = signal(false);
  editingId = signal<number | null>(null);
  activeCategory = signal('all');
  selectedOT = signal<any>(null);
  showAccountsModal = signal(false);

  // ===================== إدارة التصنيفات (تبويب مستقل) =====================
  showCategoryForm = signal(false);
  newCategoryName = signal('');
  newCategoryIcon = signal('label');
  newCategoryColor = signal('#3b82f6');
  editingCategoryOld = signal<string | null>(null);

  // ===================== Wizard State =====================
  wizardStep = signal(1);

  wiz = signal<any>({
    name: '',
    description: '',
    icon: 'receipt_long',
    color: '#3b82f6',
    category: '',
    voucherType: '',
    paymentMethod: '',
    sourceAccountId: null as number | null,
    sourceFundId: null as number | null,
    linkedAccounts: [] as { accountId: number; accountName: string; accountType: string; permission: string }[],
    screens: [] as string[],
    requiresAttachment: false,
    hasMultiLines: true,
    isActive: true,
    sortOrder: 0,
  });

  selectedAccountType = signal('');

  // ===================== Computed: التصنيفات =====================
  dynamicCategories = computed(() => {
    const cats = new Set<string>();
    this.operationTypes().forEach(ot => {
      if (ot.category) cats.add(ot.category);
    });
    return Array.from(cats).sort();
  });

  // بيانات التصنيفات مع عدد القوالب والأيقونة واللون
  categoryDetails = computed(() => {
    const cats = this.dynamicCategories();
    return cats.map(cat => {
      const templates = this.operationTypes().filter(ot => ot.category === cat);
      const firstOT = templates[0];
      return {
        name: cat,
        count: templates.length,
        icon: this.getCategoryIcon(cat),
        color: firstOT?.color || '#3b82f6',
      };
    });
  });

  // فلتر الفئات في تبويب القوالب
  categoryFilters = computed(() => {
    const cats = this.dynamicCategories();
    const filters = [{ value: 'all', label: 'الكل', icon: 'apps' }];
    for (const cat of cats) {
      filters.push({ value: cat, label: cat, icon: this.getCategoryIcon(cat) });
    }
    return filters;
  });

  operationTypeOptions = [
    { value: 'receipt', label: 'سند قبض', icon: 'call_received', desc: 'استلام أموال', color: '#10b981' },
    { value: 'payment', label: 'سند صرف', icon: 'call_made', desc: 'صرف أموال', color: '#ef4444' },
    { value: 'journal', label: 'قيد محاسبي', icon: 'book', desc: 'تحويل بين حسابات بدون صندوق', color: '#f59e0b' },
  ];

  paymentMethods = [
    { value: 'cash', label: 'نقداً', icon: 'payments', desc: 'تحصيل أو صرف نقدي مباشر', accountType: 'fund' },
    { value: 'bank', label: 'بنك', icon: 'account_balance', desc: 'إيداع أو سحب بنكي', accountType: 'bank' },
    { value: 'exchange', label: 'صراف', icon: 'currency_exchange', desc: 'عبر صراف أو حوالة', accountType: 'exchange' },
    { value: 'e_wallet', label: 'محفظة إلكترونية', icon: 'phone_android', desc: 'تحويل عبر محفظة إلكترونية', accountType: 'wallet' },
  ];

  icons = [
    'receipt_long', 'payments', 'book', 'local_shipping', 'account_balance_wallet',
    'savings', 'currency_exchange', 'swap_horiz', 'trending_up', 'bolt',
    'groups', 'handshake', 'warehouse', 'local_atm', 'credit_card',
    'call_received', 'call_made', 'move_to_inbox', 'outbox', 'request_quote',
  ];

  colors = [
    '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
    '#14b8a6', '#f97316', '#ec4899', '#06b6d4', '#84cc16',
  ];

  categoryIcons = [
    'payments', 'local_shipping', 'receipt_long', 'book', 'folder',
    'label', 'category', 'sell', 'style', 'bookmark',
    'flag', 'star', 'bolt', 'diamond', 'workspace_premium',
  ];

  permissions = [
    { value: 'both', label: 'يستقبل ويدفع' },
    { value: 'receive_only', label: 'يستقبل فقط' },
    { value: 'pay_only', label: 'يدفع فقط' },
  ];

  accountTypeLabels: Record<string, string> = {
    billing: 'فوترة', fund: 'صندوق', bank: 'بنك', exchange: 'صراف',
    wallet: 'محفظة', cash: 'نقد', service: 'خدمة', custody: 'عهدة',
    accounting: 'محاسبي', intermediary: 'وسيط', e_wallet: 'محفظة إلكترونية',
    client: 'عميل', supplier: 'مورد', expense: 'مصاريف', revenue: 'إيرادات',
    loan: 'قرض', partner: 'شريك', employee: 'موظف', other: 'أخرى',
  };

  // أيقونات أنواع الحسابات
  accountTypeIcons: Record<string, string> = {
    bank: 'account_balance', cash: 'payments', exchange: 'currency_exchange',
    e_wallet: 'phone_android', wallet: 'wallet', service: 'build',
    custody: 'lock', fund: 'savings', billing: 'receipt',
    client: 'person', supplier: 'local_shipping', expense: 'trending_down',
    revenue: 'trending_up', loan: 'credit_card', partner: 'handshake',
    employee: 'badge', accounting: 'book', intermediary: 'swap_horiz',
    other: 'more_horiz',
  };

  // ===================== Computed: حسابات المصدر (الطرف الأول) =====================
  // حسب وسيلة الدفع المختارة - تعرض الحسابات أو الصناديق المتاحة
  sourceAccounts = computed(() => {
    const w = this.wiz();
    if (!w.paymentMethod) return [];

    if (w.paymentMethod === 'cash') {
      // نقداً → نعرض الصناديق
      return this.funds().map(f => ({
        id: f.id,
        name: f.name,
        type: 'fund',
        icon: 'account_balance_wallet',
        subInfo: f.fundType || '',
        stationName: f.stationName || '',
      }));
    }

    // بنك/صراف/محفظة → نعرض الحسابات من نوع معين
    const pm = this.paymentMethods.find(p => p.value === w.paymentMethod);
    if (!pm) return [];

    return this.accounts().filter(a => a.accountType === pm.accountType).map(a => ({
      id: a.id,
      name: a.name,
      type: 'account',
      icon: pm.icon,
      subInfo: a.provider || a.accountNumber || '',
      stationName: '',
    }));
  });

  // ===================== Computed: الحسابات المرتبطة (الطرف الثاني) =====================
  // نعرض كل الحسابات من API الحسابات - المستخدم يختار الطرف الثاني
  availableAccounts = computed(() => {
    const all = this.accounts();
    // نعرض كل الحسابات الموجودة في صفحة الحسابات
    return all;
  });

  availableAccountTypes = computed(() => {
    const types = new Set<string>();
    this.availableAccounts().forEach(a => { if (a.accountType) types.add(a.accountType); });
    return Array.from(types);
  });

  filteredAccountsByType = computed(() => {
    const selType = this.selectedAccountType();
    if (!selType) return this.availableAccounts();
    return this.availableAccounts().filter(a => a.accountType === selType);
  });

  linkedAccountIds = computed(() => {
    return new Set(this.wiz().linkedAccounts.map((la: any) => la.accountId));
  });

  filteredTypes = computed(() => {
    const cat = this.activeCategory();
    const all = this.operationTypes();
    if (cat === 'all') return all;
    return all.filter(ot => ot.category === cat);
  });

  groupedByCategory = computed(() => {
    const all = this.filteredTypes();
    const groups: { category: string; items: any[] }[] = [];
    const catMap = new Map<string, any[]>();
    for (const ot of all) {
      const cat = ot.category || 'عام';
      if (!catMap.has(cat)) catMap.set(cat, []);
      catMap.get(cat)!.push(ot);
    }
    for (const [cat, items] of catMap) {
      groups.push({ category: cat, items });
    }
    return groups;
  });

  // ===================== Computed: عدد خطوات الـ wizard =====================
  totalSteps = computed(() => {
    const w = this.wiz();
    // قيد محاسبي: 4 خطوات (تصنيف → نوع → حسابات → تفاصيل)
    if (w.voucherType === 'journal') return 4;
    // سند قبض/صرف: 6 خطوات (تصنيف → نوع → وسيلة → مصدر → حسابات → تفاصيل)
    return 6;
  });

  // ===================== Computed: اسم المصدر المختار =====================
  selectedSourceName = computed(() => {
    const w = this.wiz();
    if (w.paymentMethod === 'cash' && w.sourceFundId) {
      const fund = this.funds().find(f => f.id === w.sourceFundId);
      return fund?.name || '';
    }
    if (w.sourceAccountId) {
      const acc = this.accounts().find(a => a.id === w.sourceAccountId);
      return acc?.name || '';
    }
    return '';
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
      const [ots, allAccs, fnds] = await Promise.all([
        this.api.getOperationTypes(this.bizId),
        this.api.getAllAccounts(this.bizId),
        this.api.getFunds(this.bizId),
      ]);
      this.operationTypes.set(ots);
      this.accounts.set(allAccs.accounts);
      this.funds.set(fnds);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  // ===================== Tab Navigation =====================
  switchTab(tab: 'categories' | 'templates') {
    this.activeTab.set(tab);
  }

  // ===================== Category Management (تبويب مستقل) =====================
  getCategoryIcon(cat: string): string {
    const iconMap: Record<string, string> = {
      'تحصيل': 'payments', 'توريد': 'local_shipping', 'سندات': 'receipt_long',
      'قيود': 'book', 'عام': 'folder',
    };
    return iconMap[cat] || 'label';
  }

  getCategoryColor(cat: string): string {
    const colorMap: Record<string, string> = {
      'تحصيل': '#22c55e', 'توريد': '#3b82f6', 'سندات': '#f59e0b',
      'قيود': '#8b5cf6', 'عام': '#64748b',
    };
    if (colorMap[cat]) return colorMap[cat];
    const firstOT = this.operationTypes().find(ot => ot.category === cat);
    return firstOT?.color || '#3b82f6';
  }

  openCategoryForm() {
    this.newCategoryName.set('');
    this.newCategoryIcon.set('label');
    this.newCategoryColor.set('#3b82f6');
    this.editingCategoryOld.set(null);
    this.showCategoryForm.set(true);
  }

  editCategory(cat: string) {
    this.editingCategoryOld.set(cat);
    this.newCategoryName.set(cat);
    this.newCategoryIcon.set(this.getCategoryIcon(cat));
    this.newCategoryColor.set('#3b82f6');
    this.showCategoryForm.set(true);
  }

  closeCategoryForm() {
    this.showCategoryForm.set(false);
    this.editingCategoryOld.set(null);
  }

  async saveCategory() {
    const name = this.newCategoryName().trim();
    if (!name) { this.showError('اسم التصنيف مطلوب'); return; }

    this.saving.set(true);
    try {
      if (this.editingCategoryOld()) {
        const oldName = this.editingCategoryOld()!;
        if (oldName !== name) {
          const otsToUpdate = this.operationTypes().filter(ot => ot.category === oldName);
          for (const ot of otsToUpdate) {
            await this.api.updateOperationType(ot.id, { category: name });
          }
          this.showSuccess(`تم تعديل التصنيف من "${oldName}" إلى "${name}"`);
        }
      } else {
        await this.api.createOperationType(this.bizId, {
          name: `قالب ${name} الافتراضي`,
          description: `قالب افتراضي لتصنيف ${name}`,
          color: this.newCategoryColor(),
          category: name,
          voucherType: 'receipt',
          paymentMethod: 'cash',
          screens: [name],
          requiresAttachment: false,
          hasMultiLines: true,
          isActive: false,
          sortOrder: 999,
          linkedAccounts: [],
        });
        this.showSuccess(`تم إنشاء التصنيف "${name}" بنجاح`);
      }
      this.closeCategoryForm();
      await this.loadAll();
    } catch (e: any) {
      this.showError(e.message || 'خطأ في حفظ التصنيف');
    }
    this.saving.set(false);
  }

  async deleteCategory(cat: string) {
    const count = this.countByCategory(cat);
    const msg = count > 0
      ? `هل تريد حذف التصنيف "${cat}" وجميع القوالب (${count}) المرتبطة به؟`
      : `هل تريد حذف التصنيف "${cat}"؟`;
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: msg, type: 'danger' });
    if (!confirmed) return;

    this.saving.set(true);
    try {
      const otsToDelete = this.operationTypes().filter(ot => ot.category === cat);
      for (const ot of otsToDelete) {
        await this.api.deleteOperationType(ot.id);
      }
      this.showSuccess(`تم حذف التصنيف "${cat}" بنجاح`);
      await this.loadAll();
    } catch (e: any) {
      this.showError(e.message || 'خطأ في حذف التصنيف');
    }
    this.saving.set(false);
  }

  // ===================== Wizard (تبويب القوالب) =====================
  openWizard() {
    if (this.dynamicCategories().length === 0) {
      this.showError('أنشئ تصنيفاً أولاً من تبويب "التصنيفات" قبل إنشاء قالب');
      return;
    }
    this.editingId.set(null);
    this.wiz.set({
      name: '', description: '', icon: 'receipt_long', color: '#3b82f6',
      category: '',
      voucherType: '', paymentMethod: '',
      sourceAccountId: null,
      sourceFundId: null,
      linkedAccounts: [], screens: [],
      requiresAttachment: false, hasMultiLines: true,
      isActive: true, sortOrder: 0,
    });
    this.wizardStep.set(1);
    this.selectedAccountType.set('');
    this.showWizard.set(true);
  }

  openEditWizard(ot: any) {
    this.editingId.set(ot.id);
    const linked = (ot.linkedAccounts || []).map((la: any) => ({
      accountId: la.accountId || la.id,
      accountName: la.label || la.accountName || '',
      accountType: la.accountType || '',
      permission: la.permission || 'both',
    }));
    this.wiz.set({
      name: ot.name || '',
      description: ot.description || '',
      icon: ot.icon || 'receipt_long',
      color: ot.color || '#3b82f6',
      category: ot.category || '',
      voucherType: ot.voucherType || '',
      paymentMethod: ot.paymentMethod || '',
      sourceAccountId: ot.sourceAccountId || null,
      sourceFundId: ot.sourceFundId || null,
      linkedAccounts: linked,
      screens: ot.screens ? (typeof ot.screens === 'string' ? (() => { try { return JSON.parse(ot.screens); } catch { return []; } })() : ot.screens) : [],
      requiresAttachment: ot.requiresAttachment || false,
      hasMultiLines: ot.hasMultiLines || false,
      isActive: ot.isActive !== false,
      sortOrder: ot.sortOrder || 0,
    });
    this.wizardStep.set(1);
    this.selectedAccountType.set('');
    this.showWizard.set(true);
  }

  setWizField(field: string, value: any) {
    this.wiz.update(w => ({ ...w, [field]: value }));
  }

  selectCategory(cat: string) {
    this.setWizField('category', cat);
  }

  selectVoucherType(vt: string) {
    this.wiz.update(w => ({
      ...w,
      voucherType: vt,
      paymentMethod: vt === 'journal' ? '' : w.paymentMethod,
      sourceAccountId: null,
      sourceFundId: null,
      linkedAccounts: [],
    }));
    this.selectedAccountType.set('');
  }

  selectPaymentMethod(pm: string) {
    this.wiz.update(w => ({
      ...w,
      paymentMethod: pm,
      sourceAccountId: null,
      sourceFundId: null,
      linkedAccounts: [],
    }));
    this.selectedAccountType.set('');
  }

  selectSource(source: any) {
    if (source.type === 'fund') {
      this.wiz.update(w => ({
        ...w,
        sourceFundId: w.sourceFundId === source.id ? null : source.id,
        sourceAccountId: null,
      }));
    } else {
      this.wiz.update(w => ({
        ...w,
        sourceAccountId: w.sourceAccountId === source.id ? null : source.id,
        sourceFundId: null,
      }));
    }
  }

  isSourceSelected(source: any): boolean {
    const w = this.wiz();
    if (source.type === 'fund') return w.sourceFundId === source.id;
    return w.sourceAccountId === source.id;
  }

  toggleLinkedAccount(acc: any) {
    this.wiz.update(w => {
      const existing = w.linkedAccounts.find((la: any) => la.accountId === acc.id);
      if (existing) {
        return { ...w, linkedAccounts: w.linkedAccounts.filter((la: any) => la.accountId !== acc.id) };
      } else {
        return {
          ...w,
          linkedAccounts: [...w.linkedAccounts, {
            accountId: acc.id,
            accountName: acc.name,
            accountType: acc.accountType,
            permission: 'receive_only',
          }]
        };
      }
    });
  }

  selectAllAccounts() {
    const opts = this.filteredAccountsByType();
    const currentIds = this.linkedAccountIds();
    const newAccounts = opts.filter(a => !currentIds.has(a.id)).map(a => ({
      accountId: a.id,
      accountName: a.name,
      accountType: a.accountType,
      permission: 'receive_only',
    }));
    this.wiz.update(w => ({
      ...w,
      linkedAccounts: [...w.linkedAccounts, ...newAccounts],
    }));
  }

  removeLinkedAccount(accId: number) {
    this.wiz.update(w => ({
      ...w,
      linkedAccounts: w.linkedAccounts.filter((la: any) => la.accountId !== accId),
    }));
  }

  // ===================== Wizard Navigation - 6 خطوات (أو 4 للقيود) =====================
  // سند قبض/صرف:
  //   Step 1: اختيار التصنيف
  //   Step 2: نوع السند (قبض/صرف/قيد)
  //   Step 3: وسيلة الدفع (نقد/بنك/صراف/محفظة)
  //   Step 4: المصدر - الطرف الأول (أي صندوق/بنك/صراف/محفظة بالتحديد)
  //   Step 5: الحسابات المرتبطة - الطرف الثاني
  //   Step 6: الاسم والتفاصيل
  //
  // قيد محاسبي:
  //   Step 1: اختيار التصنيف
  //   Step 2: نوع السند (قيد)
  //   Step 3: الحسابات المرتبطة (دليل الحسابات)
  //   Step 4: الاسم والتفاصيل

  // تحويل رقم الخطوة الحقيقي إلى رقم العرض
  getDisplayStep(): number {
    return this.wizardStep();
  }

  canGoNext(): boolean {
    const w = this.wiz();
    const step = this.wizardStep();

    if (step === 1) return !!w.category.trim();
    if (step === 2) return !!w.voucherType;

    if (w.voucherType === 'journal') {
      // قيد: الخطوة 3 = حسابات، الخطوة 4 = تفاصيل
      if (step === 3) return w.linkedAccounts.length > 0;
      if (step === 4) return !!w.name.trim();
    } else {
      // سند قبض/صرف
      if (step === 3) return !!w.paymentMethod;
      if (step === 4) return !!(w.sourceAccountId || w.sourceFundId);
      if (step === 5) return w.linkedAccounts.length > 0;
      if (step === 6) return !!w.name.trim();
    }
    return true;
  }

  isLastStep(): boolean {
    const w = this.wiz();
    const step = this.wizardStep();
    if (w.voucherType === 'journal') return step === 4;
    return step === 6;
  }

  nextStep() {
    this.wizardStep.update(s => s + 1);
  }

  prevStep() {
    this.wizardStep.update(s => s - 1);
  }

  // تحديد أي خطوة wizard يعرض المحتوى الحالي
  // للقيود: step 3 = حسابات، step 4 = تفاصيل
  // للسندات: step 3 = وسيلة، step 4 = مصدر، step 5 = حسابات، step 6 = تفاصيل
  getContentType(): 'category' | 'voucherType' | 'paymentMethod' | 'source' | 'accounts' | 'details' {
    const w = this.wiz();
    const step = this.wizardStep();

    if (step === 1) return 'category';
    if (step === 2) return 'voucherType';

    if (w.voucherType === 'journal') {
      if (step === 3) return 'accounts';
      if (step === 4) return 'details';
    } else {
      if (step === 3) return 'paymentMethod';
      if (step === 4) return 'source';
      if (step === 5) return 'accounts';
      if (step === 6) return 'details';
    }
    return 'category';
  }

  // ===================== Step Labels for wizard header =====================
  getStepLabels(): { num: number; label: string }[] {
    const w = this.wiz();
    if (w.voucherType === 'journal') {
      return [
        { num: 1, label: 'التصنيف' },
        { num: 2, label: 'نوع السند' },
        { num: 3, label: 'الحسابات' },
        { num: 4, label: 'التفاصيل' },
      ];
    }
    return [
      { num: 1, label: 'التصنيف' },
      { num: 2, label: 'نوع السند' },
      { num: 3, label: 'الوسيلة' },
      { num: 4, label: 'المصدر' },
      { num: 5, label: 'الحسابات' },
      { num: 6, label: 'التفاصيل' },
    ];
  }

  getPaymentMethodIcon(): string {
    const pm = this.paymentMethods.find(p => p.value === this.wiz().paymentMethod);
    return pm?.icon || 'payments';
  }

  getPaymentMethodName(): string {
    const pm = this.paymentMethods.find(p => p.value === this.wiz().paymentMethod);
    return pm?.label || '';
  }

  async saveWizard() {
    const w = this.wiz();
    if (!w.name.trim()) { this.showError('اسم القالب مطلوب'); return; }
    if (!w.category.trim()) { this.showError('نوع القالب مطلوب'); return; }

    this.saving.set(true);
    try {
      const payload: any = {
        name: w.name,
        description: w.description,
        icon: w.icon,
        color: w.color,
        category: w.category,
        voucherType: w.voucherType,
        paymentMethod: w.paymentMethod || null,
        sourceAccountId: w.sourceAccountId || null,
        sourceFundId: w.sourceFundId || null,
        screens: w.screens.length > 0 ? w.screens : [w.category],
        requiresAttachment: w.requiresAttachment,
        hasMultiLines: w.hasMultiLines,
        isActive: w.isActive,
        sortOrder: w.sortOrder,
        linkedAccounts: w.linkedAccounts.map((la: any) => ({
          accountId: la.accountId,
          label: la.accountName,
          permission: la.permission,
          sortOrder: 0,
        })),
      };

      if (this.editingId()) {
        await this.api.updateOperationType(this.editingId()!, payload);
      } else {
        await this.api.createOperationType(this.bizId, payload);
      }

      this.showWizard.set(false);
      this.showSuccess(this.editingId() ? 'تم تعديل القالب بنجاح' : 'تم إنشاء القالب بنجاح');
      await this.loadAll();
    } catch (e: any) {
      this.showError(e.message || 'خطأ في الحفظ');
    }
    this.saving.set(false);
  }

  // ===================== Delete Template =====================
  async deleteOT(id: number) {
    const cfm = await this.toast.confirm({ title: 'تأكيد الحذف', message: 'هل تريد حذف هذا القالب؟ سيتم حذف كل الحسابات المرتبطة به.', type: 'danger' });
    if (!cfm) return;
    try {
      await this.api.deleteOperationType(id);
      await this.loadAll();
    } catch (e: any) {
      this.showError(e.message);
    }
  }

  // ===================== Accounts Modal =====================
  openAccountsView(ot: any) {
    this.selectedOT.set(ot);
    this.showAccountsModal.set(true);
  }

  // ===================== Helpers =====================
  showError(msg: string) {
    this.error.set(msg);
    setTimeout(() => this.error.set(''), 5000);
  }

  showSuccess(msg: string) {
    this.success.set(msg);
    setTimeout(() => this.success.set(''), 4000);
  }

  getAccountName(id: number): string {
    return this.accounts().find(a => a.id === id)?.name || '—';
  }

  getFundName(id: number): string {
    return this.funds().find(f => f.id === id)?.name || '—';
  }

  getAccountTypeLabel(t: string): string {
    return this.accountTypeLabels[t] || t;
  }

  getVoucherTypeLabel(t: string): string {
    const m: Record<string, string> = { receipt: 'سند قبض', payment: 'سند صرف', journal: 'قيد محاسبي', transfer: 'تحويل' };
    return m[t] || t;
  }

  getPaymentMethodLabel(pm: string): string {
    return this.paymentMethods.find(x => x.value === pm)?.label || pm || '—';
  }

  getPermissionLabel(p: string): string {
    return this.permissions.find(x => x.value === p)?.label || p;
  }

  getSourceLabel(ot: any): string {
    if (ot.sourceFundId) {
      return this.getFundName(ot.sourceFundId);
    }
    if (ot.sourceAccountId) {
      return this.getAccountName(ot.sourceAccountId);
    }
    return '—';
  }

  countByCategory(category: string): number {
    return this.operationTypes().filter(ot => ot.category === category).length;
  }

  countAccountsByType(accountType: string): number {
    return this.availableAccounts().filter(a => a.accountType === accountType).length;
  }

  trackById(_: number, item: any) { return item.id; }
}
