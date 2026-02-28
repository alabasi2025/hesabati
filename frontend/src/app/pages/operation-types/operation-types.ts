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
  saving = signal(false);
  error = signal('');
  success = signal('');

  // Data
  operationTypes = signal<any[]>([]);
  accounts = signal<any[]>([]);
  funds = signal<any[]>([]);

  // UI State
  showHowItWorks = signal(false);
  showWizard = signal(false);
  editingId = signal<number | null>(null);
  activeCategory = signal('all');
  selectedOT = signal<any>(null);
  showAccountsModal = signal(false);

  // Category management
  showCategoryForm = signal(false);
  newCategoryName = signal('');
  editingCategoryOld = signal<string | null>(null);
  editingCategoryNew = signal('');

  // Wizard state
  wizardStep = signal(1);

  // Wizard form - بدون mainAccountId
  wiz = signal<any>({
    name: '',
    description: '',
    icon: 'receipt_long',
    color: '#3b82f6',
    // Step 1: نوع القالب (التصنيف الديناميكي)
    category: '',
    // Step 2: نوع السند
    voucherType: '', // receipt | payment | journal
    // Step 3: طريقة الدفع (للقبض والصرف فقط)
    paymentMethod: '', // cash | bank | exchange | e_wallet
    // Step 4: الحسابات المرتبطة
    linkedAccounts: [] as { accountId: number; accountName: string; accountType: string; permission: string }[],
    // Other
    screens: [] as string[],
    requiresAttachment: false,
    hasMultiLines: true,
    isActive: true,
    sortOrder: 0,
  });

  // Step 4: filter by account type
  selectedAccountType = signal('');

  // الفئات الديناميكية - تُحسب من القوالب الموجودة
  dynamicCategories = computed(() => {
    const cats = new Set<string>();
    this.operationTypes().forEach(ot => {
      if (ot.category) cats.add(ot.category);
    });
    return Array.from(cats).sort();
  });

  // فلتر الفئات مع "الكل"
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

  permissions = [
    { value: 'both', label: 'يستقبل ويدفع' },
    { value: 'receive_only', label: 'يستقبل فقط' },
    { value: 'pay_only', label: 'يدفع فقط' },
  ];

  accountTypeLabels: Record<string, string> = {
    billing: 'فوترة', fund: 'صندوق', bank: 'بنك', exchange: 'صراف',
    wallet: 'محفظة', cash: 'نقد', service: 'خدمة', custody: 'عهدة',
    accounting: 'محاسبي', intermediary: 'وسيط',
  };

  // الحسابات المتاحة حسب طريقة الدفع أو نوع السند
  availableAccounts = computed(() => {
    const w = this.wiz();
    const all = this.accounts();

    if (w.voucherType === 'journal') {
      // قيد → حسابات دليل الحسابات (ليس صناديق ولا بنوك)
      return all.filter(a => !['fund', 'bank', 'exchange', 'wallet', 'cash'].includes(a.accountType));
    }

    // قبض أو صرف → حسب طريقة الدفع
    if (w.paymentMethod) {
      const pm = this.paymentMethods.find(p => p.value === w.paymentMethod);
      if (pm) {
        if (pm.accountType === 'fund') {
          return all.filter(a => a.accountType === 'fund' || a.accountType === 'cash');
        }
        return all.filter(a => a.accountType === pm.accountType);
      }
    }
    return [];
  });

  // أنواع الحسابات المتاحة للخطوة 4
  availableAccountTypes = computed(() => {
    const types = new Set<string>();
    this.availableAccounts().forEach(a => { if (a.accountType) types.add(a.accountType); });
    return Array.from(types);
  });

  // الحسابات المفلترة حسب النوع المختار
  filteredAccountsByType = computed(() => {
    const selType = this.selectedAccountType();
    if (!selType) return this.availableAccounts();
    return this.availableAccounts().filter(a => a.accountType === selType);
  });

  // IDs الحسابات المرتبطة حالياً
  linkedAccountIds = computed(() => {
    return new Set(this.wiz().linkedAccounts.map((la: any) => la.accountId));
  });

  filteredTypes = computed(() => {
    const cat = this.activeCategory();
    const all = this.operationTypes();
    if (cat === 'all') return all;
    return all.filter(ot => ot.category === cat);
  });

  // تجميع القوالب حسب الفئة
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

  async ngOnInit() {
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      await this.loadAll();
    });
  }

  async loadAll() {
    this.loading.set(true);
    try {
      const [ots, accs, fnds] = await Promise.all([
        this.api.getOperationTypes(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
      ]);
      this.operationTypes.set(ots);
      this.accounts.set(accs);
      this.funds.set(fnds);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  // ===================== Category Management =====================
  getCategoryIcon(cat: string): string {
    const iconMap: Record<string, string> = {
      'تحصيل': 'payments', 'توريد': 'local_shipping', 'سندات': 'receipt_long',
      'قيود': 'book', 'عام': 'folder',
    };
    return iconMap[cat] || 'label';
  }

  openCategoryForm() {
    this.newCategoryName.set('');
    this.editingCategoryOld.set(null);
    this.showCategoryForm.set(true);
  }

  async saveCategory() {
    const name = this.newCategoryName().trim();
    if (!name) { this.showError('اسم التصنيف مطلوب'); return; }

    if (this.editingCategoryOld()) {
      // تعديل اسم تصنيف - نعدل كل القوالب اللي تحته
      const oldName = this.editingCategoryOld()!;
      const otsToUpdate = this.operationTypes().filter(ot => ot.category === oldName);
      for (const ot of otsToUpdate) {
        await this.api.updateOperationType(ot.id, { category: name });
      }
      this.showSuccess(`تم تعديل التصنيف من "${oldName}" إلى "${name}"`);
    }
    // إذا تصنيف جديد - ما نحتاج نسوي شي، بس يظهر في القائمة لما ينشئ قالب تحته
    this.showCategoryForm.set(false);
    this.editingCategoryOld.set(null);
    await this.loadAll();
  }

  startEditCategory(cat: string) {
    this.editingCategoryOld.set(cat);
    this.editingCategoryNew.set(cat);
    this.newCategoryName.set(cat);
    this.showCategoryForm.set(true);
  }

  // ===================== Wizard =====================
  openWizard() {
    this.editingId.set(null);
    this.wiz.set({
      name: '', description: '', icon: 'receipt_long', color: '#3b82f6',
      category: '',
      voucherType: '', paymentMethod: '',
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

  setCustomCategory(name: string) {
    this.setWizField('category', name);
  }

  selectVoucherType(vt: string) {
    this.wiz.update(w => ({
      ...w,
      voucherType: vt,
      paymentMethod: vt === 'journal' ? '' : w.paymentMethod,
      linkedAccounts: [], // reset linked accounts when type changes
    }));
    this.selectedAccountType.set('');
  }

  selectPaymentMethod(pm: string) {
    this.wiz.update(w => ({
      ...w,
      paymentMethod: pm,
      linkedAccounts: [], // reset linked accounts when payment method changes
    }));
    this.selectedAccountType.set('');
  }

  // Step 4: Toggle linked account
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

  // Wizard navigation - 4 خطوات بدلاً من 5
  // Step 1: نوع القالب (التصنيف)
  // Step 2: نوع السند
  // Step 3: طريقة الدفع + الحسابات المرتبطة
  // Step 4: الاسم والتفاصيل
  canGoNext(): boolean {
    const w = this.wiz();
    const step = this.wizardStep();
    if (step === 1) return !!w.category.trim();
    if (step === 2) return !!w.voucherType;
    if (step === 3) {
      if (w.voucherType === 'journal') return w.linkedAccounts.length > 0;
      return !!w.paymentMethod && w.linkedAccounts.length > 0;
    }
    if (step === 4) return !!w.name.trim();
    return true;
  }

  nextStep() {
    this.wizardStep.update(s => s + 1);
  }

  prevStep() {
    this.wizardStep.update(s => s - 1);
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

  // ===================== Delete =====================
  async deleteOT(id: number) {
    if (!confirm('هل تريد حذف هذا القالب؟ سيتم حذف كل الحسابات المرتبطة به.')) return;
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

  countByCategory(category: string): number {
    return this.operationTypes().filter(ot => ot.category === category).length;
  }

  trackById(_: number, item: any) { return item.id; }
}
