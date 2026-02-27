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

  // Wizard state
  wizardStep = signal(1);

  // Wizard form
  wiz = signal<any>({
    name: '',
    description: '',
    icon: 'receipt_long',
    color: '#3b82f6',
    // Step 1: نوع العملية
    voucherType: '', // receipt | payment | journal
    // Step 2: طريقة القبض/الصرف
    paymentMethod: '', // cash | bank | exchange | e_wallet
    // Step 3: الحساب الرئيسي
    mainAccountId: null,
    // Step 4: الحسابات المقابلة
    linkedAccounts: [] as { accountId: number; accountName: string; accountType: string; permission: string }[],
    // Step 5: الشاشات
    screens: [] as string[],
    // Other
    category: 'voucher',
    requiresAttachment: false,
    hasMultiLines: true,
    isActive: true,
    sortOrder: 0,
  });

  // Step 4: filter by account type
  selectedAccountType = signal('');

  categories = [
    { value: 'all', label: 'الكل', icon: 'apps' },
    { value: 'collection', label: 'تحصيل', icon: 'payments' },
    { value: 'delivery', label: 'توريد', icon: 'local_shipping' },
    { value: 'voucher', label: 'سندات', icon: 'receipt_long' },
    { value: 'journal', label: 'قيود', icon: 'book' },
  ];

  operationTypeOptions = [
    { value: 'receipt', label: 'سند قبض', icon: 'call_received', desc: 'استلام أموال من حساب إلى صندوق/بنك/صراف/محفظة', color: '#10b981' },
    { value: 'payment', label: 'سند صرف', icon: 'call_made', desc: 'صرف أموال من صندوق/بنك/صراف/محفظة إلى حساب', color: '#ef4444' },
    { value: 'journal', label: 'قيد محاسبي', icon: 'book', desc: 'تحويل بين حسابات بدون صندوق (مثل إقفال فواتير)', color: '#f59e0b' },
  ];

  paymentMethods = [
    { value: 'cash', label: 'نقداً', icon: 'payments', desc: 'تحصيل أو صرف نقدي مباشر' },
    { value: 'bank', label: 'بنك', icon: 'account_balance', desc: 'إيداع أو سحب بنكي' },
    { value: 'exchange', label: 'صراف', icon: 'currency_exchange', desc: 'عبر صراف أو حوالة' },
    { value: 'e_wallet', label: 'محفظة إلكترونية', icon: 'phone_android', desc: 'تحويل عبر محفظة إلكترونية (جوالي، ون كاش، جيب...)' },
  ];

  screenOptions = [
    { value: 'collection', label: 'تسجيل التحصيل', icon: 'payments', desc: 'صفحة التحصيل والتوريد → تبويب التحصيل' },
    { value: 'delivery', label: 'توريد الأموال', icon: 'local_shipping', desc: 'صفحة التحصيل والتوريد → تبويب التوريد' },
    { value: 'voucher', label: 'السندات', icon: 'receipt_long', desc: 'صفحة السندات (قبض/صرف)' },
    { value: 'journal', label: 'القيود المحاسبية', icon: 'book', desc: 'صفحة القيود المحاسبية' },
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

  // Computed: account types available in accounts
  accountTypes = computed(() => {
    const types = new Set<string>();
    this.accounts().forEach(a => { if (a.accountType) types.add(a.accountType); });
    return Array.from(types);
  });

  accountTypeLabels: Record<string, string> = {
    billing: 'فوترة', fund: 'صندوق', bank: 'بنك', exchange: 'صراف',
    wallet: 'محفظة', cash: 'نقد', service: 'خدمة', custody: 'عهدة',
    accounting: 'محاسبي', intermediary: 'وسيط',
  };

  // Computed: main account options (step 3) - filtered by voucher type
  mainAccountOptions = computed(() => {
    const vt = this.wiz().voucherType;
    const all = this.accounts();
    if (vt === 'receipt' || vt === 'payment') {
      // سند قبض/صرف → صندوق/بنك/صراف/محفظة فقط
      return all.filter(a => ['fund', 'bank', 'exchange', 'wallet', 'cash'].includes(a.accountType));
    }
    // قيد → كل الحسابات
    return all;
  });

  // Computed: counter accounts (step 4) - filtered by selected type
  counterAccountOptions = computed(() => {
    const selType = this.selectedAccountType();
    if (!selType) return [];
    return this.accounts().filter(a => a.accountType === selType);
  });

  // Computed: already linked account IDs
  linkedAccountIds = computed(() => {
    return new Set(this.wiz().linkedAccounts.map((la: any) => la.accountId));
  });

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

  // ===================== Wizard =====================
  openWizard() {
    this.editingId.set(null);
    this.wiz.set({
      name: '', description: '', icon: 'receipt_long', color: '#3b82f6',
      voucherType: '', paymentMethod: '', mainAccountId: null,
      linkedAccounts: [], screens: [],
      category: 'voucher', requiresAttachment: false, hasMultiLines: true,
      isActive: true, sortOrder: 0,
    });
    this.wizardStep.set(1);
    this.selectedAccountType.set('');
    this.showWizard.set(true);
  }

  openEditWizard(ot: any) {
    this.editingId.set(ot.id);
    const screens = ot.screens ? (typeof ot.screens === 'string' ? JSON.parse(ot.screens) : ot.screens) : [ot.category];
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
      voucherType: ot.voucherType || '',
      paymentMethod: ot.paymentMethod || '',
      mainAccountId: ot.mainAccountId || null,
      linkedAccounts: linked,
      screens: screens,
      category: ot.category || 'voucher',
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

  selectVoucherType(vt: string) {
    this.wiz.update(w => ({
      ...w,
      voucherType: vt,
      // Auto-set category based on voucher type
      category: vt === 'journal' ? 'journal' : 'voucher',
      // Reset payment method if journal
      paymentMethod: vt === 'journal' ? '' : w.paymentMethod,
      // Reset main account
      mainAccountId: null,
    }));
  }

  selectPaymentMethod(pm: string) {
    this.setWizField('paymentMethod', pm);
  }

  selectMainAccount(accId: number) {
    this.setWizField('mainAccountId', accId);
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

  // Select all accounts of a type
  selectAllOfType() {
    const opts = this.counterAccountOptions();
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

  // Step 5: Toggle screen
  toggleScreen(screen: string) {
    this.wiz.update(w => {
      const screens = [...w.screens];
      const idx = screens.indexOf(screen);
      if (idx >= 0) {
        screens.splice(idx, 1);
      } else {
        screens.push(screen);
      }
      // Auto-update category based on first screen
      let category = w.category;
      if (screens.length > 0) {
        category = screens[0];
      }
      return { ...w, screens, category };
    });
  }

  // Wizard navigation
  canGoNext(): boolean {
    const w = this.wiz();
    const step = this.wizardStep();
    if (step === 1) return !!w.voucherType;
    if (step === 2) return w.voucherType === 'journal' || !!w.paymentMethod;
    if (step === 3) return w.voucherType === 'journal' || !!w.mainAccountId;
    if (step === 4) return w.linkedAccounts.length > 0;
    if (step === 5) return w.screens.length > 0 && !!w.name.trim();
    return true;
  }

  nextStep() {
    const step = this.wizardStep();
    const w = this.wiz();
    // Skip step 2 (payment method) if journal
    if (step === 1 && w.voucherType === 'journal') {
      this.wizardStep.set(3);
      return;
    }
    // Skip step 3 (main account) if journal
    if (step === 2) {
      this.wizardStep.set(3);
      return;
    }
    if (step === 3 && w.voucherType === 'journal') {
      this.wizardStep.set(4);
      return;
    }
    this.wizardStep.set(step + 1);
  }

  prevStep() {
    const step = this.wizardStep();
    const w = this.wiz();
    // Skip back over step 2/3 if journal
    if (step === 4 && w.voucherType === 'journal') {
      this.wizardStep.set(1);
      return;
    }
    if (step === 3 && w.voucherType === 'journal') {
      this.wizardStep.set(1);
      return;
    }
    this.wizardStep.set(step - 1);
  }

  async saveWizard() {
    const w = this.wiz();
    if (!w.name.trim()) { this.showError('اسم القالب مطلوب'); return; }
    if (w.screens.length === 0) { this.showError('اختر شاشة واحدة على الأقل'); return; }

    this.saving.set(true);
    try {
      const payload: any = {
        name: w.name,
        description: w.description,
        icon: w.icon,
        color: w.color,
        category: w.screens[0], // Primary category from first screen
        voucherType: w.voucherType,
        paymentMethod: w.paymentMethod || null,
        mainAccountId: w.mainAccountId || null,
        screens: JSON.stringify(w.screens),
        requiresAttachment: w.requiresAttachment,
        hasMultiLines: w.hasMultiLines,
        isActive: w.isActive,
        sortOrder: w.sortOrder,
      };

      let otId: number;
      if (this.editingId()) {
        await this.api.updateOperationType(this.editingId()!, payload);
        otId = this.editingId()!;
      } else {
        const created = await this.api.createOperationType(this.bizId, payload);
        otId = created.id;
      }

      // Sync linked accounts: remove all existing, then add new ones
      if (this.editingId()) {
        const existingOT = this.operationTypes().find(ot => ot.id === otId);
        if (existingOT?.linkedAccounts) {
          for (const la of existingOT.linkedAccounts) {
            await this.api.removeOperationTypeAccount(la.id);
          }
        }
      }
      for (const la of w.linkedAccounts) {
        await this.api.addOperationTypeAccount(otId, {
          accountId: la.accountId,
          label: la.accountName,
          permission: la.permission,
          sortOrder: 0,
        });
      }

      this.showWizard.set(false);
      this.success.set(this.editingId() ? 'تم تعديل القالب بنجاح' : 'تم إنشاء القالب بنجاح');
      setTimeout(() => this.success.set(''), 4000);
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

  // ===================== Accounts Modal (view only) =====================
  openAccountsView(ot: any) {
    this.selectedOT.set(ot);
    this.showAccountsModal.set(true);
  }

  // ===================== Helpers =====================
  showError(msg: string) {
    this.error.set(msg);
    setTimeout(() => this.error.set(''), 5000);
  }

  getAccountName(id: number): string {
    return this.accounts().find(a => a.id === id)?.name || '—';
  }

  getAccountTypeLabel(t: string): string {
    return this.accountTypeLabels[t] || t;
  }

  getCategoryLabel(c: string): string {
    return this.categories.find(x => x.value === c)?.label || c;
  }

  getVoucherTypeLabel(t: string): string {
    const m: Record<string, string> = { receipt: 'سند قبض', payment: 'سند صرف', journal: 'قيد محاسبي', transfer: 'تحويل' };
    return m[t] || t;
  }

  getPaymentMethodLabel(pm: string): string {
    return this.paymentMethods.find(x => x.value === pm)?.label || pm || '—';
  }

  getScreenLabels(ot: any): string {
    const screens = ot.screens ? (typeof ot.screens === 'string' ? JSON.parse(ot.screens) : ot.screens) : [ot.category];
    return screens.map((s: string) => this.screenOptions.find(x => x.value === s)?.label || s).join('، ');
  }

  getPermissionLabel(p: string): string {
    return this.permissions.find(x => x.value === p)?.label || p;
  }

  countByCategory(category: string): number {
    return this.operationTypes().filter(ot => ot.category === category).length;
  }

  trackById(_: number, item: any) { return item.id; }
}
