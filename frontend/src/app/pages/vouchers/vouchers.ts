import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { SmartFilterInputComponent } from '../../shared/components/smart-filter-input/smart-filter-input';
import {
  formatAmount as formatAmountShared,
  formatDate as formatDateShared,
  formatDateTime as formatDateTimeShared,
  getSearchHighlightParts,
  matchesSearchQuery,
  normalizeSearchText,
  resolveSearchSelection,
} from '../../shared/helpers';

interface TreasuryVoucherNumberParts {
  voucherPrefix: string;
  treasuryKindCode: string;
  treasuryCode: string;
  treasurySequence: number;
  year: number;
  serial: number;
}

type TreasuryType = 'fund' | 'bank' | 'exchange' | 'e_wallet';

interface VoucherLine {
  accountSubNatureId: number | null;
  accountId: number | null;
  amount: string;
  notes: string;
  subNatureQuery?: string;
  accountQuery?: string;
  accountNumberFilter?: string;
  showSubNatureSuggestions?: boolean;
  activeSubNatureSuggestionIndex?: number;
  showAccountSuggestions?: boolean;
  activeAccountSuggestionIndex?: number;
}

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SmartFilterInputComponent],
  templateUrl: './vouchers.html',
  styleUrl: './vouchers.scss',
})
export class VouchersComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);
  private vouchersLoadSeq = 0;

  loading = signal(true);
  saving = signal(false);
  vouchers = signal<any[]>([]);
  operationTypes = signal<any[]>([]);
  accounts = signal<any[]>([]);
  accountSubNatures = signal<any[]>([]);
  funds = signal<any[]>([]);
  currencies = signal<any[]>([]);
  error = signal('');

  // UI State
  showHowItWorks = signal(false);
  showForm = signal(false);
  activeTab = signal<string>('all');
  selectedVoucher = signal<any>(null);
  showAttachments = signal(false);
  attachmentTargetId = signal<number | null>(null);
  attachments = signal<any[]>([]);
  attachmentForm = signal<any>({ fileName: '', filePath: '', fileType: '', description: '', importance: 'عادي' });

  // ===================== Enhanced Filters =====================
  filterDateFrom = signal('');
  filterDateTo = signal('');
  filterStatus = signal('');
  filterStatusQuery = signal('');
  filterSearch = signal('');
  filterVoucherNumberQuery = signal('');
  filterMinAmount = signal<number | null>(null);
  filterMaxAmount = signal<number | null>(null);
  filterOpTypeId = signal<number | null>(null);
  filterTreasuryType = signal<TreasuryType | ''>('');
  filterTreasuryTypeQuery = signal('');
  filterTreasuryId = signal<number | null>(null);
  filterTreasuryQuery = signal('');
  showAdvancedFilters = signal(false);

  // ===================== Pagination =====================
  page = signal(1);
  pageSize = signal(20);
  totalVouchers = signal(0);
  sortBy = signal('voucher_date');
  sortDir = signal<'asc' | 'desc'>('desc');

  // ===================== Edit Mode =====================
  editingVoucher = signal<any>(null);
  isEditing = signal(false);

  // ===================== Voucher Details Modal =====================
  showDetailsModal = signal(false);
  detailsVoucher = signal<any>(null);
  detailsLoading = signal(false);
  detailsVoucherNumberParts = computed(() => this.parseTreasuryVoucherNumber(this.detailsVoucher()?.voucherNumber));

  // ===================== Account Balance Display =====================
  accountBalances = signal<Record<number, number>>({});

  // ===================== Print =====================
  printingVoucher = signal<any>(null);
  showPrintReport = signal(false);

  // Form state
  voucherType = signal<'receipt' | 'payment'>('payment');
  treasuryType = signal<TreasuryType | null>(null);
  selectedTreasuryId = signal<number | null>(null);
  treasuryNumberFilter = signal('');
  treasurySearchQuery = signal('');
  showTreasurySuggestions = signal(false);
  activeTreasurySuggestionIndex = signal(-1);
  previewLoading = signal(false);
  voucherNumberPreview = signal('');
  voucherLines = signal<VoucherLine[]>([]);
  form = signal<any>({
    amount: '',
    description: '',
    voucherDate: new Date().toISOString().split('T')[0],
    reference: '',
    currencyId: 1,
    status: 'unreviewed',
  });

  treasuryOptions = computed(() => {
    const type = this.treasuryType();
    if (!type) return [];
    if (type === 'fund') {
      return this.funds()
        .map((fund) => ({ ...fund, label: fund.name }))
        .sort((a, b) => this.compareTreasuryOptions(a, b));
    }
    return this.accounts()
      .filter((account) => this.getAccountType(account) === type && account.isLeafAccount !== false)
      .map((account) => ({ ...account, label: account.name }))
      .sort((a, b) => this.compareTreasuryOptions(a, b));
  });

  filteredTreasuryOptions = computed(() => {
    const numberFilter = String(this.treasuryNumberFilter() || '').trim();
    const textFilter = this.normalizeTreasurySearchText(this.treasurySearchQuery());
    let options = this.treasuryOptions();

    if (textFilter) {
      options = options.filter((item: any) => {
        const label = this.normalizeTreasurySearchText(item?.label || item?.name);
        const code = this.normalizeTreasurySearchText(item?.code);
        const optionText = this.normalizeTreasurySearchText(this.getTreasuryOptionText(item));
        return label.includes(textFilter) || code.includes(textFilter) || optionText.includes(textFilter);
      });
    }

    if (!numberFilter) return options;
    const parsed = Number.parseInt(numberFilter, 10);
    if (!Number.isInteger(parsed) || parsed <= 0) return options;
    return options.filter((item: any) => this.getTreasuryNumber(item) === parsed);
  });

  counterpartyAccounts = computed(() => {
    return this.accounts().filter((account) => {
      const type = this.getAccountType(account);
      return !this.isTreasuryType(type) && account.isLeafAccount !== false;
    });
  });

  counterpartySubNatures = computed(() => {
    const used = new Set(this.counterpartyAccounts().map((account) => account.accountSubNatureId).filter(Boolean));
    return this.accountSubNatures()
      .filter((nature) => used.has(nature.id))
      .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'ar'));
  });

  filteredVouchers = computed(() => {
    const tab = this.activeTab();
    const voucherNumberQuery = normalizeSearchText(this.filterVoucherNumberQuery());
    const treasuryType = this.filterTreasuryType();
    const treasuryId = this.filterTreasuryId();

    return this.vouchers().filter((voucher) => {
      if (tab !== 'all' && voucher.voucherType !== tab) return false;

      if (voucherNumberQuery) {
        const voucherNumber = String(voucher?.voucherNumber || voucher?.voucher_number || '');
        if (!matchesSearchQuery(voucherNumberQuery, voucherNumber)) return false;
      }

      const treasury = this.getVoucherTreasuryMeta(voucher);
      if (treasuryType && treasury.type !== treasuryType) return false;
      if (treasuryId && treasury.id !== treasuryId) return false;

      return true;
    });
  });

  filterTreasuryOptions = computed(() => {
    const type = this.filterTreasuryType();
    if (!type) return [];
    if (type === 'fund') {
      return this.funds().map((fund) => ({ id: fund.id, label: `${fund.name}${fund.code ? ` (${fund.code})` : ''}` }));
    }
    return this.accounts()
      .filter((account) => this.getAccountType(account) === type && account.isLeafAccount !== false)
      .map((account) => ({ id: account.id, label: `${account.name}${account.code ? ` (${account.code})` : ''}` }));
  });

  filterVoucherNumberSuggestions = computed(() => {
    const selectedType = this.filterTreasuryType();
    const selectedTreasuryId = this.filterTreasuryId();
    const unique = new Set<string>();
    for (const row of this.vouchers()) {
      const treasury = this.getVoucherTreasuryMeta(row);
      if (selectedType && treasury.type !== selectedType) continue;
      if (selectedTreasuryId && treasury.id !== selectedTreasuryId) continue;
      const value = String(row?.voucherNumber || row?.voucher_number || '').trim();
      if (!value) continue;
      unique.add(value);
    }
    return Array.from(unique).slice(0, 25);
  });

  filterTreasuryTypeItems = [
    { value: 'fund', label: 'صندوق' },
    { value: 'bank', label: 'بنك' },
    { value: 'exchange', label: 'صراف' },
    { value: 'e_wallet', label: 'محفظة' },
  ] as const;

  filterTreasuryTypeSuggestions = computed(() => {
    const query = normalizeSearchText(this.filterTreasuryTypeQuery());
    if (!query) return this.filterTreasuryTypeItems;
    return this.filterTreasuryTypeItems.filter((item) => matchesSearchQuery(query, item.label, item.value));
  });

  filterTreasuryTypeSuggestionLabels = computed(() => [
    'الكل',
    ...this.filterTreasuryTypeSuggestions().map((item) => item.label),
  ]);

  filterTreasurySuggestions = computed(() => {
    const query = normalizeSearchText(this.filterTreasuryQuery());
    const options = this.filterTreasuryOptions();
    if (!query) return options;
    return options.filter((item) => matchesSearchQuery(query, item.label, item.id));
  });

  filterTreasurySuggestionLabels = computed(() => [
    'الكل',
    ...this.filterTreasurySuggestions().map((item) => String(item.label || '')),
  ]);

  filterStatusSuggestions = computed(() => {
    const query = normalizeSearchText(this.filterStatusQuery());
    if (!query) return this.statusOptions;
    return this.statusOptions.filter((item) => matchesSearchQuery(query, item.label, item.value));
  });

  filterStatusSuggestionLabels = computed(() => [
    ...this.filterStatusSuggestions().map((item) => item.label),
  ]);

  stats = computed(() => {
    const all = this.vouchers();
    const receipts = all.filter(v => v.voucherType === 'receipt');
    const payments = all.filter(v => v.voucherType === 'payment');
    const totalReceipt = receipts.reduce((s, v) => s + Number.parseFloat(v.amount || 0), 0);
    const totalPayment = payments.reduce((s, v) => s + Number.parseFloat(v.amount || 0), 0);
    const drafts = all.filter(v => v.status === 'unreviewed').length;
    const reviewed = all.filter(v => v.status === 'reviewed').length;
    return { total: all.length, receipts: receipts.length, payments: payments.length, totalReceipt, totalPayment, net: totalReceipt - totalPayment, unreviewed: drafts, reviewed };
  });

  get totalPages(): number {
    return Math.ceil(this.totalVouchers() / this.pageSize()) || 1;
  }

  tabs = [
    { value: 'all', label: 'الكل', icon: 'receipt_long', color: '#64748b' },
    { value: 'receipt', label: 'سندات القبض', icon: 'call_received', color: '#22c55e' },
    { value: 'payment', label: 'سندات الصرف', icon: 'call_made', color: '#ef4444' },
  ];

  statusOptions = [
    { value: '', label: 'الكل', icon: 'apps', color: '#64748b' },
    { value: 'unreviewed', label: 'غير مراجع', icon: 'pending', color: '#f59e0b' },
    { value: 'reviewed', label: 'مراجع', icon: 'check_circle', color: '#22c55e' },
  ];

  protected override onBizIdChange(_bizId: number): void {
    void Promise.all([
      this.loadVouchers(),
      this.loadOperationTypes(),
      this.loadAccounts(),
      this.loadFunds(),
      this.loadAccountSubNatures(),
      this.loadCurrencies(),
    ]);
  }

  async loadVouchers(options?: { silent?: boolean }) {
    const silent = options?.silent === true;
    const requestSeq = ++this.vouchersLoadSeq;
    if (!silent) this.loading.set(true);
    try {
      const filters: any = {
        limit: this.pageSize(),
        offset: (this.page() - 1) * this.pageSize(),
        sortBy: this.sortBy(),
        sortDir: this.sortDir(),
      };
      const tab = this.activeTab();
      if (tab !== 'all') filters.type = tab;
      if (this.filterDateFrom()) filters.dateFrom = this.filterDateFrom();
      if (this.filterDateTo()) filters.dateTo = this.filterDateTo();
      if (this.filterStatus()) filters.status = this.filterStatus();
      if (this.filterSearch()) filters.search = this.filterSearch();
      if (this.filterVoucherNumberQuery()) {
        const voucherNumber = this.filterVoucherNumberQuery().trim();
        filters.voucherNumber = voucherNumber;
        // Backward-compatible fallback if backend route wasn't reloaded yet.
        if (!filters.search) filters.search = voucherNumber;
      }
      if (this.filterMinAmount()) filters.minAmount = this.filterMinAmount();
      if (this.filterMaxAmount()) filters.maxAmount = this.filterMaxAmount();
      if (this.filterOpTypeId()) filters.operationTypeId = this.filterOpTypeId();
      if (this.filterTreasuryType()) filters.treasuryType = this.filterTreasuryType();
      if (this.filterTreasuryId() !== null) filters.treasuryId = this.filterTreasuryId();

      const result = await this.api.getVouchersEnhanced(this.bizId, filters);
      if (requestSeq !== this.vouchersLoadSeq) return;
      const rawVouchers = result.vouchers || result;
      this.vouchers.set((rawVouchers || []).map((row: any) => this.normalizeVoucher(row)));
      this.totalVouchers.set(result.total || (rawVouchers || []).length);
      this.error.set('');
    } catch (e: unknown) {
      if (requestSeq !== this.vouchersLoadSeq) return;
      try {
        const data = await this.api.getVouchers(this.bizId);
        if (requestSeq !== this.vouchersLoadSeq) return;
        this.vouchers.set((data || []).map((row: any) => this.normalizeVoucher(row)));
        this.totalVouchers.set(data.length);
        this.error.set('');
      } catch (fallbackError: unknown) {
        if (requestSeq !== this.vouchersLoadSeq) return;
        this.error.set(fallbackError instanceof Error ? fallbackError.message : String(fallbackError));
      }
    } finally {
      if (!silent && requestSeq === this.vouchersLoadSeq) this.loading.set(false);
    }
  }

  async loadOperationTypes() {
    try {
      const data = await this.api.getOperationTypes(this.bizId);
      this.operationTypes.set(data);
    } catch { /* non-critical: enhanced types not available */ }
  }

  async loadAccounts() {
    try {
      const data = await this.api.getAccounts(this.bizId);
      this.accounts.set(data);
    } catch { /* non-critical: accounts list unavailable */ }
  }

  async loadAccountSubNatures() {
    try {
      const data = await this.api.getAccountSubNatures(this.bizId);
      this.accountSubNatures.set(data || []);
    } catch { /* non-critical: sub-natures unavailable */ }
  }

  async loadFunds() {
    try {
      const data = await this.api.getFunds(this.bizId);
      this.funds.set(data);
    } catch { /* non-critical: funds list unavailable */ }
  }

  async loadCurrencies() {
    try {
      const data = await this.api.getCurrencies();
      this.currencies.set(data || []);
    } catch { /* non-critical: currencies unavailable */ }
  }

  // ===================== Filters =====================
  async applyFilters() {
    // Always sync textual smart fields to their concrete ids/types before filtering.
    this.applyFilterTreasuryTypeQuery(this.filterTreasuryTypeQuery());
    this.applyFilterTreasuryQuery(this.filterTreasuryQuery());
    this.page.set(1);
    await this.loadVouchers();
  }

  async applyFiltersSilently() {
    // Same behavior as applyFilters but keep list visible (no loading skeleton flash).
    this.applyFilterTreasuryTypeQuery(this.filterTreasuryTypeQuery());
    this.applyFilterTreasuryQuery(this.filterTreasuryQuery());
    this.page.set(1);
    await this.loadVouchers({ silent: true });
  }

  async clearFilters() {
    this.filterDateFrom.set('');
    this.filterDateTo.set('');
    this.filterStatus.set('');
    this.filterStatusQuery.set('');
    this.filterSearch.set('');
    this.filterVoucherNumberQuery.set('');
    this.filterMinAmount.set(null);
    this.filterMaxAmount.set(null);
    this.filterOpTypeId.set(null);
    this.filterTreasuryType.set('');
    this.filterTreasuryTypeQuery.set('');
    this.filterTreasuryId.set(null);
    this.filterTreasuryQuery.set('');
    this.page.set(1);
    await this.loadVouchers();
  }

  setFilterTreasuryType(value: string) {
    const normalized = String(value || '').toLowerCase();
    const valid: TreasuryType[] = ['fund', 'bank', 'exchange', 'e_wallet'];
    const resolved = valid.includes(normalized as TreasuryType) ? (normalized as TreasuryType) : '';
    const previous = this.filterTreasuryType();
    this.filterTreasuryType.set(resolved);
    this.filterTreasuryTypeQuery.set(resolved ? this.getFilterTreasuryTypeLabel(resolved) : '');
    if (previous !== resolved) {
      this.filterTreasuryId.set(null);
      this.filterTreasuryQuery.set('');
    }
  }

  setFilterVoucherNumberQuery(value: string) {
    const normalized = String(value || '');
    this.filterVoucherNumberQuery.set(normalized);
    // Keep generic search in sync as a compatibility and UX fallback.
    this.filterSearch.set(normalized.trim());
  }

  async onFilterVoucherNumberCommitted(value: string) {
    this.setFilterVoucherNumberQuery(value);
    await this.applyFiltersSilently();
  }

  setFilterTreasuryTypeQuery(value: string) {
    const q = String(value || '');
    this.filterTreasuryTypeQuery.set(q);
    if (!q.trim()) this.setFilterTreasuryType('');
  }

  applyFilterTreasuryTypeQuery(value: string) {
    const raw = String(value || '').trim();
    const normalizedInput = normalizeSearchText(raw);
    if (!normalizedInput || normalizedInput === normalizeSearchText('الكل')) {
      this.setFilterTreasuryType('');
      return;
    }

    const exact = this.filterTreasuryTypeItems.find((item) => (
      normalizeSearchText(item.label) === normalizedInput || normalizeSearchText(item.value) === normalizedInput
    ));
    if (exact) {
      this.setFilterTreasuryType(exact.value);
      return;
    }

    const resolved = resolveSearchSelection(value, {
      candidates: this.filterTreasuryTypeItems,
      getPrimaryText: (item) => item.label,
      getAltTexts: (item) => [item.value],
      matchMode: 'contains',
    });
    this.setFilterTreasuryType(resolved.matchedItem?.value || '');
  }

  async onFilterTreasuryTypeCommitted(value: string) {
    this.applyFilterTreasuryTypeQuery(value);
    await this.applyFiltersSilently();
  }

  setFilterTreasuryQuery(value: string) {
    const q = String(value || '');
    this.filterTreasuryQuery.set(q);
    if (!q.trim()) this.filterTreasuryId.set(null);
  }

  applyFilterTreasuryQuery(value: string) {
    const raw = String(value || '').trim();
    const normalizedInput = normalizeSearchText(raw);
    if (!normalizedInput || normalizedInput === normalizeSearchText('الكل')) {
      this.filterTreasuryId.set(null);
      this.filterTreasuryQuery.set('');
      return;
    }

    const options = this.filterTreasuryOptions();
    const exact = options.find((item: any) => (
      normalizeSearchText(item.label) === normalizedInput || normalizeSearchText(item.id) === normalizedInput
    ));
    if (exact) {
      this.filterTreasuryId.set(exact.id ?? -1);
      this.filterTreasuryQuery.set(exact.label || raw);
      return;
    }

    const resolved = resolveSearchSelection(value, {
      candidates: options,
      getPrimaryText: (item: any) => item.label,
      getAltTexts: (item: any) => [item.id],
      matchMode: 'contains',
    });
    this.filterTreasuryId.set(resolved.matchedItem?.id ?? -1);
    this.filterTreasuryQuery.set(resolved.matchedItem?.label || raw);
  }

  async onFilterTreasuryCommitted(value: string) {
    this.applyFilterTreasuryQuery(value);
    await this.applyFiltersSilently();
  }

  setFilterStatusQuery(value: string) {
    this.filterStatusQuery.set(String(value || ''));
    if (!String(value || '').trim()) this.filterStatus.set('');
  }

  applyFilterStatusQuery(value: string) {
    const raw = String(value || '').trim();
    const normalizedInput = normalizeSearchText(raw);
    if (!normalizedInput || normalizedInput === normalizeSearchText('الكل')) {
      this.filterStatus.set('');
      this.filterStatusQuery.set('');
      return;
    }

    const exact = this.statusOptions.find((item) => (
      normalizeSearchText(item.label) === normalizedInput || normalizeSearchText(item.value) === normalizedInput
    ));
    if (exact) {
      this.filterStatus.set(String(exact.value || ''));
      this.filterStatusQuery.set(exact.label);
      return;
    }

    const resolved = resolveSearchSelection(value, {
      candidates: this.statusOptions,
      getPrimaryText: (item) => item.label,
      getAltTexts: (item) => [item.value],
      matchMode: 'contains',
    });
    this.filterStatus.set(String(resolved.matchedItem?.value || ''));
    this.filterStatusQuery.set(resolved.matchedItem?.label || raw);
  }

  async onFilterStatusCommitted(value: string) {
    this.applyFilterStatusQuery(value);
    await this.applyFiltersSilently();
  }

  async onAdvancedDateFromChange(value: string) {
    this.filterDateFrom.set(String(value || ''));
    await this.applyFiltersSilently();
  }

  async onAdvancedDateToChange(value: string) {
    this.filterDateTo.set(String(value || ''));
    await this.applyFiltersSilently();
  }

  async onAdvancedStatusChange(value: string) {
    const normalized = String(value || '');
    this.filterStatus.set(normalized);
    this.filterStatusQuery.set(normalized ? (this.statusOptions.find((item) => item.value === normalized)?.label || normalized) : '');
    await this.applyFiltersSilently();
  }

  async onAdvancedMinAmountChange(value: string | number) {
    const parsed = Number.parseFloat(String(value || ''));
    this.filterMinAmount.set(Number.isFinite(parsed) ? parsed : null);
    await this.applyFiltersSilently();
  }

  async onAdvancedMaxAmountChange(value: string | number) {
    const parsed = Number.parseFloat(String(value || ''));
    this.filterMaxAmount.set(Number.isFinite(parsed) ? parsed : null);
    await this.applyFiltersSilently();
  }

  getFilterTreasuryTypeLabel(value: string): string {
    return this.filterTreasuryTypeItems.find((item) => item.value === value)?.label || '';
  }

  getFilterHighlightParts(text: string, query: string) {
    return getSearchHighlightParts(text, query);
  }

  async switchTab(tab: string) {
    this.activeTab.set(tab);
    this.page.set(1);
    await this.loadVouchers();
  }

  // ===================== Pagination =====================
  async goToPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page.set(p);
    await this.loadVouchers();
  }

  getPageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.page();
    const pages: number[] = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  // ===================== Sort =====================
  async toggleSort(column: string) {
    if (this.sortBy() === column) {
      this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(column);
      this.sortDir.set('desc');
    }
    this.page.set(1);
    await this.loadVouchers();
  }

  // ===================== Create / Edit =====================
  openCreate(type: 'receipt' | 'payment') {
    this.voucherType.set(type);
    this.treasuryType.set(null);
    this.selectedTreasuryId.set(null);
    this.voucherNumberPreview.set('');
    this.isEditing.set(false);
    this.editingVoucher.set(null);
    this.form.set({
      amount: '',
      description: '',
      voucherDate: new Date().toISOString().split('T')[0],
      reference: '',
      currencyId: 1,
      status: 'unreviewed',
    });
    this.voucherLines.set([this.createEmptyVoucherLine()]);
    this.showForm.set(true);
  }

  openEdit(voucher: any) {
    const normalized = this.normalizeVoucher(voucher);
    const status = String(normalized?.status || '').toLowerCase();
    if (status === 'reviewed') {
      this.toast.warning('لا يمكن تعديل سند مراجع، قم بإلغاء المراجعة أولاً.');
      return;
    }

    const treasury = this.getVoucherTreasuryMeta(normalized);
    this.voucherType.set(normalized?.voucherType === 'receipt' ? 'receipt' : 'payment');
    this.treasuryType.set(treasury.type);
    this.selectedTreasuryId.set(treasury.id);
    this.treasuryNumberFilter.set('');
    this.treasurySearchQuery.set(this.getVoucherTreasuryLabel(normalized) === '-' ? '' : this.getVoucherTreasuryLabel(normalized));
    this.showTreasurySuggestions.set(false);
    this.activeTreasurySuggestionIndex.set(-1);
    this.voucherNumberPreview.set(String(normalized?.voucherNumber || ''));

    const amount = Number.parseFloat(String(normalized?.amount || 0));
    this.form.set({
      amount: Number.isFinite(amount) ? String(amount) : '',
      description: String(normalized?.description || ''),
      voucherDate: this.toDateInputValue(normalized?.voucherDate || normalized?.createdAt),
      reference: String(normalized?.reference || ''),
      currencyId: Number.parseInt(String(normalized?.currencyId || 1), 10) || 1,
      status: 'unreviewed',
    });
    this.voucherLines.set(this.buildEditableVoucherLines(normalized));
    this.editingVoucher.set(normalized);
    this.isEditing.set(true);
    this.showForm.set(true);
  }

  addVoucherLine() {
    this.voucherLines.update((rows) => [...rows, this.createEmptyVoucherLine()]);
  }

  removeVoucherLine(index: number) {
    this.voucherLines.update((rows) => rows.filter((_, i) => i !== index));
    if (this.voucherLines().length === 0) {
      this.voucherLines.set([this.createEmptyVoucherLine()]);
    }
  }

  updateVoucherLine(index: number, field: keyof VoucherLine, value: any) {
    this.voucherLines.update((rows) =>
      rows.map((row, i) => {
        if (i !== index) return row;
        if (field === 'accountSubNatureId') {
          return {
            ...row,
            accountSubNatureId: value,
            accountId: null,
            accountQuery: '',
            accountNumberFilter: '',
            showAccountSuggestions: false,
            activeAccountSuggestionIndex: -1,
          };
        }
        return { ...row, [field]: value };
      }),
    );
  }

  private patchVoucherLine(index: number, patch: Partial<VoucherLine>) {
    this.voucherLines.update((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  getLineAccounts(line: VoucherLine) {
    const selectedTreasuryId = this.selectedTreasuryId();
    return this.counterpartyAccounts().filter((account) => {
      if (line.accountSubNatureId && account.accountSubNatureId !== line.accountSubNatureId) return false;
      if (selectedTreasuryId && this.treasuryType() !== 'fund' && account.id === selectedTreasuryId) return false;
      return true;
    });
  }

  getLineSubNatureOptions(line: VoucherLine): any[] {
    const query = this.normalizeTreasurySearchText(line?.subNatureQuery || '');
    const all = this.counterpartySubNatures();
    if (!query) return all;
    return all.filter((nature) => this.normalizeTreasurySearchText(nature?.name).includes(query));
  }

  getLineAccountOptions(line: VoucherLine): any[] {
    let options = this.getLineAccounts(line);
    const query = this.normalizeTreasurySearchText(line?.accountQuery || '');
    const numberFilter = String(line?.accountNumberFilter || '').trim();

    if (query) {
      options = options.filter((account) => {
        const label = this.normalizeTreasurySearchText(account?.name);
        const code = this.normalizeTreasurySearchText(account?.code);
        const text = this.normalizeTreasurySearchText(this.getAccountOptionText(account));
        return label.includes(query) || code.includes(query) || text.includes(query);
      });
    }

    if (numberFilter) {
      const parsed = Number.parseInt(numberFilter, 10);
      if (Number.isInteger(parsed) && parsed > 0) {
        options = options.filter((account) => this.getTreasuryNumber(account) === parsed);
      }
    }
    return options;
  }

  getSubNatureOptionText(item: any): string {
    return String(item?.name || '').trim();
  }

  getAccountOptionText(item: any): string {
    if (!item) return '';
    const label = String(item?.name || '').trim();
    const code = String(item?.code || '').trim();
    return code ? `${label} (${code})` : label;
  }

  getTreasurySuggestionNameParts(item: any) {
    return this.getHighlightParts(String(item?.label || item?.name || ''), this.treasurySearchQuery());
  }

  getTreasurySuggestionCodeParts(item: any) {
    return this.getHighlightParts(String(item?.code || ''), this.treasurySearchQuery());
  }

  getLineSubNatureNameParts(line: VoucherLine, nature: any) {
    return this.getHighlightParts(String(nature?.name || ''), line?.subNatureQuery || '');
  }

  getLineAccountNameParts(line: VoucherLine, account: any) {
    return this.getHighlightParts(String(account?.name || ''), line?.accountQuery || '');
  }

  getLineAccountCodeParts(line: VoucherLine, account: any) {
    return this.getHighlightParts(String(account?.code || ''), line?.accountQuery || '');
  }

  onLineSubNatureTyping(index: number, value: string) {
    this.patchVoucherLine(index, {
      subNatureQuery: String(value || ''),
      showSubNatureSuggestions: true,
      activeSubNatureSuggestionIndex: -1,
      accountSubNatureId: null,
      accountId: null,
      accountQuery: '',
      accountNumberFilter: '',
      showAccountSuggestions: false,
      activeAccountSuggestionIndex: -1,
    });
    const line = this.voucherLines()[index];
    const options = this.getLineSubNatureOptions(line);
    if (options.length === 1) {
      this.selectLineSubNatureSuggestion(index, options[0]);
    }
  }

  onLineSubNatureFocus(index: number) {
    const line = this.voucherLines()[index];
    this.patchVoucherLine(index, { showSubNatureSuggestions: this.getLineSubNatureOptions(line).length > 0 });
  }

  onLineSubNatureBlur(index: number) {
    globalThis.setTimeout(() => {
      this.patchVoucherLine(index, { showSubNatureSuggestions: false, activeSubNatureSuggestionIndex: -1 });
    }, 120);
  }

  onLineSubNatureKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'F3') {
      event.preventDefault();
      this.copyLineFieldFromAbove(index, 'subNature');
      return;
    }

    const line = this.voucherLines()[index];
    const options = this.getLineSubNatureOptions(line);
    if (!options.length) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const current = line.activeSubNatureSuggestionIndex ?? -1;
      const dir = event.key === 'ArrowDown' ? 1 : -1;
      const next = current < 0 ? (dir > 0 ? 0 : options.length - 1) : (current + dir + options.length) % options.length;
      this.patchVoucherLine(index, { showSubNatureSuggestions: true, activeSubNatureSuggestionIndex: next });
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const idx = line.activeSubNatureSuggestionIndex ?? -1;
      if (line.showSubNatureSuggestions && idx >= 0 && idx < options.length) {
        this.selectLineSubNatureSuggestion(index, options[idx]);
      } else if (options.length === 1) {
        this.selectLineSubNatureSuggestion(index, options[0]);
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.patchVoucherLine(index, { showSubNatureSuggestions: false, activeSubNatureSuggestionIndex: -1 });
    }
  }

  selectLineSubNatureSuggestion(index: number, nature: any) {
    this.patchVoucherLine(index, {
      accountSubNatureId: nature?.id ?? null,
      subNatureQuery: this.getSubNatureOptionText(nature),
      showSubNatureSuggestions: false,
      activeSubNatureSuggestionIndex: -1,
      accountId: null,
      accountQuery: '',
      accountNumberFilter: '',
      showAccountSuggestions: false,
      activeAccountSuggestionIndex: -1,
    });
  }

  onLineAccountTyping(index: number, value: string) {
    this.patchVoucherLine(index, {
      accountQuery: String(value || ''),
      showAccountSuggestions: true,
      activeAccountSuggestionIndex: -1,
      accountId: null,
    });
    const line = this.voucherLines()[index];
    const options = this.getLineAccountOptions(line);
    if (options.length === 1) {
      this.selectLineAccountSuggestion(index, options[0]);
    }
  }

  onLineAccountFocus(index: number) {
    const line = this.voucherLines()[index];
    this.patchVoucherLine(index, { showAccountSuggestions: this.getLineAccountOptions(line).length > 0 });
  }

  onLineAccountBlur(index: number) {
    globalThis.setTimeout(() => {
      this.patchVoucherLine(index, { showAccountSuggestions: false, activeAccountSuggestionIndex: -1 });
    }, 120);
  }

  onLineAccountKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'F3') {
      event.preventDefault();
      this.copyLineFieldFromAbove(index, 'account');
      return;
    }

    const line = this.voucherLines()[index];
    const options = this.getLineAccountOptions(line);
    if (!options.length) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const current = line.activeAccountSuggestionIndex ?? -1;
      const dir = event.key === 'ArrowDown' ? 1 : -1;
      const next = current < 0 ? (dir > 0 ? 0 : options.length - 1) : (current + dir + options.length) % options.length;
      this.patchVoucherLine(index, { showAccountSuggestions: true, activeAccountSuggestionIndex: next });
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const idx = line.activeAccountSuggestionIndex ?? -1;
      if (line.showAccountSuggestions && idx >= 0 && idx < options.length) {
        this.selectLineAccountSuggestion(index, options[idx]);
      } else if (options.length === 1) {
        this.selectLineAccountSuggestion(index, options[0]);
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.patchVoucherLine(index, { showAccountSuggestions: false, activeAccountSuggestionIndex: -1 });
    }
  }

  setLineAccountNumberFilter(index: number, value: string) {
    this.patchVoucherLine(index, {
      accountNumberFilter: String(value || '').trim(),
      showAccountSuggestions: true,
      activeAccountSuggestionIndex: -1,
    });
    const line = this.voucherLines()[index];
    const options = this.getLineAccountOptions(line);
    if (options.length === 1) {
      this.selectLineAccountSuggestion(index, options[0]);
    }
  }

  selectLineAccountSuggestion(index: number, account: any) {
    const accountNumber = this.getTreasuryNumber(account);
    const resolvedSubNatureId = account?.accountSubNatureId ? Number(account.accountSubNatureId) : null;
    const resolvedSubNatureName = resolvedSubNatureId
      ? (this.accountSubNatures().find((nature) => nature.id === resolvedSubNatureId)?.name || '')
      : '';
    this.patchVoucherLine(index, {
      accountSubNatureId: resolvedSubNatureId,
      subNatureQuery: resolvedSubNatureName,
      accountId: account?.id ?? null,
      accountQuery: this.getAccountOptionText(account),
      accountNumberFilter: accountNumber !== null ? String(accountNumber) : '',
      showSubNatureSuggestions: false,
      activeSubNatureSuggestionIndex: -1,
      showAccountSuggestions: false,
      activeAccountSuggestionIndex: -1,
    });
  }

  onVoucherLineFieldKeydown(index: number, field: 'amount' | 'notes' | 'accountNumber', event: KeyboardEvent) {
    if (event.key !== 'F3') return;
    event.preventDefault();
    this.copyLineFieldFromAbove(index, field);
  }

  private copyLineFieldFromAbove(
    index: number,
    field: 'subNature' | 'account' | 'amount' | 'notes' | 'accountNumber',
  ) {
    if (index <= 0) return;
    const rows = this.voucherLines();
    const source = rows[index - 1];
    if (!source) return;

    if (field === 'subNature') {
      this.patchVoucherLine(index, {
        accountSubNatureId: source.accountSubNatureId ?? null,
        subNatureQuery: String(source.subNatureQuery || ''),
        accountId: null,
        accountQuery: '',
        accountNumberFilter: '',
        showSubNatureSuggestions: false,
        activeSubNatureSuggestionIndex: -1,
        showAccountSuggestions: false,
        activeAccountSuggestionIndex: -1,
      });
      return;
    }

    if (field === 'account') {
      const accountId = source.accountId ? Number(source.accountId) : null;
      if (!accountId || !Number.isInteger(accountId) || accountId <= 0) return;
      const account = this.counterpartyAccounts().find((item) => item.id === accountId);
      if (!account) return;
      this.selectLineAccountSuggestion(index, account);
      return;
    }

    if (field === 'amount') {
      this.updateVoucherLine(index, 'amount', String(source.amount || ''));
      return;
    }

    if (field === 'notes') {
      this.updateVoucherLine(index, 'notes', String(source.notes || ''));
      return;
    }

    this.setLineAccountNumberFilter(index, String(source.accountNumberFilter || ''));
  }

  getVoucherLinesTotal(): number {
    return this.voucherLines().reduce((sum, row) => {
      const n = Number.parseFloat(String(row.amount || 0));
      return Number.isFinite(n) ? sum + n : sum;
    }, 0);
  }

  setTreasuryType(value: string) {
    const normalized = String(value || '').toLowerCase();
    const valid: TreasuryType[] = ['fund', 'bank', 'exchange', 'e_wallet'];
    this.treasuryType.set(valid.includes(normalized as TreasuryType) ? (normalized as TreasuryType) : null);
    this.selectedTreasuryId.set(null);
    this.treasuryNumberFilter.set('');
    this.treasurySearchQuery.set('');
    this.showTreasurySuggestions.set(false);
    this.activeTreasurySuggestionIndex.set(-1);
    this.voucherNumberPreview.set('');
  }

  setSelectedTreasury(value: any) {
    this.applyTreasurySelection(value ? Number(value) : null, true);
  }

  async refreshVoucherNumberPreview() {
    const treasuryType = this.treasuryType();
    const treasuryId = this.selectedTreasuryId();
    if (!treasuryType || !treasuryId) {
      this.voucherNumberPreview.set('');
      return;
    }

    this.previewLoading.set(true);
    try {
      const params: any = {
        voucherType: this.voucherType(),
        voucherDate: this.form().voucherDate || null,
      };
      if (treasuryType === 'fund') {
        if (this.voucherType() === 'payment') params.fromFundId = treasuryId;
        else params.toFundId = treasuryId;
      } else {
        if (this.voucherType() === 'payment') params.fromAccountId = treasuryId;
        else params.toAccountId = treasuryId;
      }
      const preview = await this.api.getVoucherNumberPreview(this.bizId, params);
      this.voucherNumberPreview.set(preview?.voucherNumber || '');
    } catch {
      this.voucherNumberPreview.set('');
    } finally {
      this.previewLoading.set(false);
    }
  }

  setFormField(field: string, value: any) {
    this.form.update(f => ({ ...f, [field]: value }));
    if (field === 'voucherDate') {
      void this.refreshVoucherNumberPreview();
    }
  }

  // ===================== Account Balance =====================
  async loadAccountBalance(accountId: number) {
    if (!accountId || this.accountBalances()[accountId] !== undefined) return;
    try {
      const result = await this.api.getAccountBalance(this.bizId, accountId);
      this.accountBalances.update(b => ({ ...b, [accountId]: result.balance || 0 }));
    } catch { /* non-critical: balance fetch failed */ }
  }

  getAccountBalanceDisplay(accountId: number): string {
    const bal = this.accountBalances()[accountId];
    if (bal === undefined) return '';
    return `الرصيد: ${this.formatAmount(bal)}`;
  }

  // ===================== Save Voucher =====================
  async saveVoucher() {
    const f = this.form();
    const treasuryType = this.treasuryType();
    const treasuryId = this.selectedTreasuryId();
    const amount = Number.parseFloat(String(f.amount || 0));

    if (this.isEditing()) {
      const editing = this.editingVoucher();
      const editId = Number.parseInt(String(editing?.id ?? ''), 10);
      if (!Number.isInteger(editId) || editId <= 0) {
        this.error.set('تعذر تحديد السند المراد تعديله');
        return;
      }
      if (!treasuryType || !treasuryId) { this.error.set('اختر نوع الخزينة ثم الخزينة نفسها'); return; }
      if (!f.description?.trim()) { this.error.set('أدخل بيان السند'); return; }
      if (!Number.isFinite(amount) || amount <= 0) { this.error.set('أدخل مبلغ السند'); return; }
      if (!String(f.voucherDate || '').trim()) { this.error.set('أدخل تاريخ السند'); return; }

      const entries = this.voucherLines()
        .map((row) => ({
          accountSubNatureId: row.accountSubNatureId ? Number(row.accountSubNatureId) : null,
          accountId: row.accountId ? Number(row.accountId) : null,
          amount: Number.parseFloat(String(row.amount || 0)),
          notes: String(row.notes || '').trim() || null,
        }))
        .filter((row) => Number.isInteger(row.accountId) && (row.accountId as number) > 0 && Number.isFinite(row.amount) && row.amount > 0);

      if (entries.length === 0) {
        this.error.set('أدخل سطراً واحداً على الأقل في بنود السند');
        return;
      }

      const linesTotal = entries.reduce((sum, row) => sum + row.amount, 0);
      if (Math.abs(linesTotal - amount) > 0.001) {
        this.error.set('مجموع السطور يجب أن يساوي مبلغ السند');
        return;
      }

      this.saving.set(true);
      this.error.set('');
      try {
        const payload: any = {
          voucherType: this.voucherType(),
          description: String(f.description || '').trim(),
          reference: String(f.reference || '').trim() || null,
          amount: String(amount),
          voucherDate: String(f.voucherDate || ''),
          currencyId: f.currencyId || 1,
          entries: entries.map((row) => ({
            accountId: row.accountId,
            amount: row.amount,
            notes: row.notes,
          })),
        };
        if (treasuryType === 'fund') {
          if (this.voucherType() === 'payment') payload.fromFundId = treasuryId;
          else payload.toFundId = treasuryId;
        } else {
          if (this.voucherType() === 'payment') payload.fromAccountId = treasuryId;
          else payload.toAccountId = treasuryId;
        }
        await this.api.updateVoucher(this.bizId, editId, payload);
        this.voucherNumberPreview.set(editing?.voucherNumber || '');
        this.treasurySearchQuery.set(this.getVoucherTreasuryLabel(editing));
        this.treasuryNumberFilter.set('');
        this.selectedTreasuryId.set(null);
        this.treasuryType.set(null);
        this.voucherLines.set([this.createEmptyVoucherLine()]);
        this.form.set({
          amount: '',
          description: '',
          voucherDate: new Date().toISOString().split('T')[0],
          reference: '',
          currencyId: 1,
          status: 'unreviewed',
        });
        this.toast.success('تم تحديث السند بنجاح');
        this.showForm.set(false);
        this.isEditing.set(false);
        this.editingVoucher.set(null);
        await this.loadVouchers();
      } catch (e: unknown) {
        this.error.set(e instanceof Error ? e.message : String(e));
      } finally {
        this.saving.set(false);
      }
      return;
    }

    if (!treasuryType || !treasuryId) { this.error.set('اختر نوع الخزينة ثم الخزينة نفسها'); return; }
    if (!f.description?.trim()) { this.error.set('أدخل بيان السند'); return; }
    if (!Number.isFinite(amount) || amount <= 0) { this.error.set('أدخل مبلغ السند'); return; }

    const entries = this.voucherLines()
      .map((row) => ({
        accountSubNatureId: row.accountSubNatureId ? Number(row.accountSubNatureId) : null,
        accountId: row.accountId ? Number(row.accountId) : null,
        amount: Number.parseFloat(String(row.amount || 0)),
        notes: String(row.notes || '').trim() || null,
      }))
      .filter((row) => Number.isInteger(row.accountId) && (row.accountId as number) > 0 && Number.isFinite(row.amount) && row.amount > 0);

    if (entries.length === 0) {
      this.error.set('أدخل سطراً واحداً على الأقل في بنود السند');
      return;
    }

    const linesTotal = entries.reduce((sum, row) => sum + row.amount, 0);
    if (Math.abs(linesTotal - amount) > 0.001) {
      this.error.set('مجموع السطور يجب أن يساوي مبلغ السند');
      return;
    }

    this.saving.set(true);
    this.error.set('');
    try {
      const requestedStatus = 'unreviewed';
      const payload: any = {
        voucherType: this.voucherType(),
        amount: String(amount),
        description: String(f.description || '').trim(),
        reference: String(f.reference || '').trim() || null,
        voucherDate: f.voucherDate,
        currencyId: f.currencyId || 1,
        status: requestedStatus,
        entries: entries.map((row) => ({
          accountId: row.accountId,
          amount: row.amount,
          notes: row.notes,
        })),
      };

      if (treasuryType === 'fund') {
        if (this.voucherType() === 'payment') payload.fromFundId = treasuryId;
        else payload.toFundId = treasuryId;
      } else {
        if (this.voucherType() === 'payment') payload.fromAccountId = treasuryId;
        else payload.toAccountId = treasuryId;
      }

      await this.api.createVoucherMulti(this.bizId, payload);
      this.toast.success(`تم إنشاء ${this.getTypeLabel(this.voucherType())} بنجاح`);
      this.showForm.set(false);
      await this.loadVouchers();
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : String(e));
    } finally {
      this.saving.set(false);
    }
  }

  // ===================== Status Management =====================
  async changeStatus(voucher: any, newStatus: string): Promise<boolean> {
    const statusLabels: Record<string, string> = { unreviewed: 'غير مراجع', reviewed: 'مراجع' };
    if (!statusLabels[newStatus]) return false;
    const confirmed = await this.toast.confirm({
      title: `تغيير الحالة إلى ${statusLabels[newStatus]}`,
      message: `هل تريد تغيير حالة السند رقم ${voucher.voucherNumber} إلى "${statusLabels[newStatus]}"؟`,
      type: newStatus === 'reviewed' ? 'info' : 'warning',
    });
    if (!confirmed) return false;

    this.saving.set(true);
    try {
      await this.api.changeVoucherStatus(this.bizId, voucher.id, newStatus);
      this.toast.success(`تم تغيير الحالة إلى ${statusLabels[newStatus]}`);
      await this.loadVouchers();
      return true;
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'خطأ في تغيير الحالة');
      return false;
    } finally {
      this.saving.set(false);
    }
  }

  getStatusLabel(status: string): string {
    const m: Record<string, string> = { unreviewed: 'غير مراجع', reviewed: 'مراجع' };
    return m[status] || status;
  }

  getStatusIcon(status: string): string {
    const m: Record<string, string> = { unreviewed: 'pending', reviewed: 'check_circle' };
    return m[status] || 'help';
  }

  getStatusColor(status: string): string {
    const m: Record<string, string> = { unreviewed: '#f59e0b', reviewed: '#22c55e' };
    return m[status] || '#64748b';
  }

  // ===================== Voucher Details =====================
  async openDetails(voucher: any) {
    this.detailsLoading.set(true);
    this.showDetailsModal.set(true);
    try {
      const details = await this.api.getVoucherDetails(this.bizId, voucher.id);
      // API may return either the voucher itself OR a wrapper { voucher, ... }
      const payload = details as any;
      const normalizedVoucher = this.normalizeVoucher(payload?.voucher ?? details);
      const journalEntries = Array.isArray(payload?.journalEntries)
        ? payload.journalEntries
        : Array.isArray(payload?.journal_entries)
          ? payload.journal_entries
          : Array.isArray(normalizedVoucher?.journalEntries)
            ? normalizedVoucher.journalEntries
            : [];
      this.detailsVoucher.set({
        ...normalizedVoucher,
        journalEntries: journalEntries.map((line: any) => this.normalizeJournalLine(line)),
      });
    } catch (e: unknown) {
      this.detailsVoucher.set(this.normalizeVoucher(voucher));
    } finally {
      this.detailsLoading.set(false);
    }
  }

  closeDetails() {
    this.showDetailsModal.set(false);
    this.detailsVoucher.set(null);
  }

  async openAttachmentsFromDetails() {
    const voucher = this.detailsVoucher();
    const id = Number.parseInt(String(voucher?.id ?? ''), 10);
    if (!Number.isInteger(id) || id <= 0) return;
    this.closeDetails();
    await this.openAttachments(id);
  }

  async deleteDetailsVoucher() {
    const voucher = this.detailsVoucher();
    const id = Number.parseInt(String(voucher?.id ?? ''), 10);
    if (!Number.isInteger(id) || id <= 0) return;
    this.closeDetails();
    await this.deleteVoucher(id);
  }

  openEditFromDetails() {
    const voucher = this.detailsVoucher();
    if (!voucher) return;
    this.closeDetails();
    this.openEdit(voucher);
  }

  async changeDetailsStatus(newStatus: 'unreviewed' | 'reviewed') {
    const voucher = this.detailsVoucher();
    if (!voucher) return;
    this.closeDetails();
    await this.changeStatus(voucher, newStatus);
  }

  async onDetailsStatusSelection(newStatus: string) {
    const voucher = this.detailsVoucher();
    if (!voucher) return;
    const currentStatus = String(voucher.status || '').toLowerCase();
    const normalizedNext = String(newStatus || '').toLowerCase();
    if (!['unreviewed', 'reviewed'].includes(normalizedNext) || normalizedNext === currentStatus) return;

    const changed = await this.changeStatus(voucher, normalizedNext);
    if (!changed) return;

    this.detailsVoucher.set({
      ...voucher,
      status: normalizedNext,
    });
  }

  onVoucherRowKeydown(event: KeyboardEvent, voucher: any) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    void this.openDetails(voucher);
  }

  // ===================== Print Voucher =====================
  async printVoucher(voucher: any) {
    const normalized = this.normalizeVoucher(voucher);
    let reportVoucher = normalized;
    if (normalized?.id) {
      try {
        const details = await this.api.getVoucherDetails(this.bizId, normalized.id);
        const payload = details as any;
        const normalizedVoucher = this.normalizeVoucher(payload?.voucher ?? details);
        const journalEntries = Array.isArray(payload?.journalEntries)
          ? payload.journalEntries
          : Array.isArray(payload?.journal_entries)
            ? payload.journal_entries
            : Array.isArray(normalizedVoucher?.journalEntries)
              ? normalizedVoucher.journalEntries
              : [];
        reportVoucher = {
          ...normalizedVoucher,
          journalEntries: journalEntries.map((line: any) => this.normalizeJournalLine(line)),
        };
      } catch {
        // Use the row data if details endpoint is temporarily unavailable.
      }
    }

    this.printingVoucher.set(reportVoucher);
    this.showPrintReport.set(true);
  }

  printCurrentReport() {
    window.print();
  }

  closePrintReport() {
    this.showPrintReport.set(false);
    this.printingVoucher.set(null);
  }

  async deleteVoucher(id: number) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: 'هل تريد حذف هذا السند؟', type: 'danger' });
    if (!confirmed) return;
    try {
      await this.api.deleteVoucher(id);
      await this.loadVouchers();
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : String(e));
    }
  }

  // ========== المرفقات ==========
  async openAttachments(voucherId: number) {
    this.attachmentTargetId.set(voucherId);
    this.showAttachments.set(true);
    try {
      this.attachments.set(await this.api.getAttachments('voucher', voucherId));
    } catch { this.attachments.set([]); }
  }

  async addAttachment() {
    const f = this.attachmentForm();
    if (!f.fileName) return;
    try {
      await this.api.uploadAttachment(this.bizId, {
        entityType: 'voucher', entityId: this.attachmentTargetId(),
        fileName: f.fileName,
        filePath: f.filePath,
        fileType: f.fileType || 'application/octet-stream',
        description: f.description,
        importance: f.importance || 'عادي',
      });
      this.attachmentForm.set({ fileName: '', filePath: '', fileType: '', description: '', importance: 'عادي' });
      this.attachments.set(await this.api.getAttachments('voucher', this.attachmentTargetId()!));
    } catch (e: unknown) { this.error.set(e instanceof Error ? e.message : String(e)); }
  }

  async removeAttachment(id: number) {
    try {
      await this.api.deleteAttachment(this.bizId, id);
      this.attachments.set(await this.api.getAttachments('voucher', this.attachmentTargetId()!));
    } catch (e: unknown) { this.error.set(e instanceof Error ? e.message : String(e)); }
  }

  getAccountType(account: any): string {
    const subNature = this.accountSubNatures().find((nature) => nature.id === account?.accountSubNatureId);
    if (subNature?.natureKey) return String(subNature.natureKey).toLowerCase();
    return String(account?.accountType ?? account?.account_type ?? '').toLowerCase();
  }

  isTreasuryType(type: string): boolean {
    return type === 'fund' || type === 'bank' || type === 'exchange' || type === 'e_wallet';
  }

  getTreasuryTypeLabel(type: string | null | undefined): string {
    const labels: Record<string, string> = {
      fund: 'صندوق',
      bank: 'بنك',
      exchange: 'صراف',
      e_wallet: 'محفظة',
    };
    return labels[String(type || '')] || '-';
  }

  getTreasuryTypeObjectLabel(type: string | null | undefined): string {
    const labels: Record<string, string> = {
      fund: 'الصندوق',
      bank: 'البنك',
      exchange: 'الصراف',
      e_wallet: 'المحفظة',
    };
    return labels[String(type || '')] || 'الخزينة';
  }

  getTreasuryFieldLabel(): string {
    const type = this.treasuryType();
    return type ? `اختر ${this.getTreasuryTypeObjectLabel(type)}` : 'الخزينة';
  }

  getTreasuryFieldPlaceholder(): string {
    const type = this.treasuryType();
    return type ? `اختر ${this.getTreasuryTypeObjectLabel(type)}...` : 'اختر الخزينة...';
  }

  setTreasuryNumberFilter(value: string) {
    this.treasuryNumberFilter.set(String(value || '').trim());
  }

  setTreasurySearchQuery(value: string) {
    this.treasurySearchQuery.set(String(value || '').trim());
  }

  onTreasuryTyping(value: string) {
    const typed = String(value || '');
    this.treasurySearchQuery.set(typed);
    this.showTreasurySuggestions.set(true);
    this.activeTreasurySuggestionIndex.set(-1);
    const needle = this.normalizeTreasurySearchText(typed);
    if (!needle) {
      this.applyTreasurySelection(null, false);
      return;
    }

    const options = this.filteredTreasuryOptions();
    if (options.length === 1) {
      this.applyTreasurySelection(options[0]?.id ?? null, false);
      return;
    }

    this.applyTreasurySelection(null, false);
  }

  onTreasuryInputCommit(value: string) {
    const typed = String(value || '').trim();
    this.treasurySearchQuery.set(typed);
    if (!typed) {
      this.setSelectedTreasury(null);
      this.showTreasurySuggestions.set(false);
      this.activeTreasurySuggestionIndex.set(-1);
      return;
    }

    const needle = this.normalizeTreasurySearchText(typed);
    const exact = this.treasuryOptions().find((item) => {
      const optionText = this.normalizeTreasurySearchText(this.getTreasuryOptionText(item));
      const label = this.normalizeTreasurySearchText(item?.label || item?.name);
      const code = this.normalizeTreasurySearchText(item?.code);
      return optionText === needle || label === needle || code === needle;
    });

    if (exact?.id) {
      this.applyTreasurySelection(exact.id, true);
      this.showTreasurySuggestions.set(false);
      this.activeTreasurySuggestionIndex.set(-1);
      return;
    }

    const options = this.filteredTreasuryOptions();
    if (options.length === 1) {
      this.applyTreasurySelection(options[0]?.id ?? null, true);
      this.showTreasurySuggestions.set(false);
      this.activeTreasurySuggestionIndex.set(-1);
      return;
    }

    this.applyTreasurySelection(null, false);
    this.showTreasurySuggestions.set(true);
  }

  onTreasuryInputFocus() {
    this.showTreasurySuggestions.set(this.filteredTreasuryOptions().length > 0);
  }

  onTreasuryInputBlur() {
    globalThis.setTimeout(() => {
      this.showTreasurySuggestions.set(false);
      this.activeTreasurySuggestionIndex.set(-1);
    }, 120);
  }

  onTreasuryInputKeydown(event: KeyboardEvent) {
    const options = this.filteredTreasuryOptions();
    if (!options.length) {
      if (event.key === 'Enter') this.onTreasuryInputCommit(this.treasurySearchQuery());
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.showTreasurySuggestions.set(true);
      const current = this.activeTreasurySuggestionIndex();
      const dir = event.key === 'ArrowDown' ? 1 : -1;
      const next = current < 0 ? (dir > 0 ? 0 : options.length - 1) : (current + dir + options.length) % options.length;
      this.activeTreasurySuggestionIndex.set(next);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const idx = this.activeTreasurySuggestionIndex();
      if (this.showTreasurySuggestions() && idx >= 0 && idx < options.length) {
        this.selectTreasurySuggestion(options[idx]);
      } else {
        this.onTreasuryInputCommit(this.treasurySearchQuery());
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.showTreasurySuggestions.set(false);
      this.activeTreasurySuggestionIndex.set(-1);
    }
  }

  selectTreasurySuggestion(item: any) {
    this.applyTreasurySelection(item?.id ?? null, true);
    this.showTreasurySuggestions.set(false);
    this.activeTreasurySuggestionIndex.set(-1);
  }

  getTreasurySearchSummary(): string {
    const query = String(this.treasurySearchQuery() || '').trim();
    if (!query) return '';
    const count = this.filteredTreasuryOptions().length;
    if (count === 0) return 'لا توجد نتائج مطابقة';
    if (count === 1) return 'مطابقة واحدة - سيتم الاختيار تلقائياً';
    return `${count} نتائج مطابقة`;
  }

  shouldShowTreasurySearchSummary(): boolean {
    const query = String(this.treasurySearchQuery() || '').trim();
    if (!query) return false;
    if (this.selectedTreasuryId()) return false;
    return true;
  }

  applyTreasuryNumberQuickPick() {
    const options = this.filteredTreasuryOptions();
    if (options.length === 1) {
      this.setSelectedTreasury(options[0]?.id ?? null);
    }
  }

  getSelectedTreasuryLabel(): string {
    const type = this.treasuryType();
    const id = this.selectedTreasuryId();
    if (!type || !id) return '-';
    const item = this.treasuryOptions().find((option) => option.id === id);
    return item?.name || item?.label || '-';
  }

  getSubNatureName(id: number | null | undefined): string {
    if (!id) return '-';
    return this.accountSubNatures().find((nature) => nature.id === id)?.name || '-';
  }

  getCurrencyLabel(currencyId: number | null | undefined): string {
    const currency = this.currencies().find((item) => item.id === currencyId);
    return currency?.nameAr || currency?.code || 'العملة الافتراضية';
  }

  getVoucherAmountDifference(): number {
    const amount = Number.parseFloat(String(this.form().amount || 0));
    if (!Number.isFinite(amount)) return 0;
    return amount - this.getVoucherLinesTotal();
  }

  getAccountName(id: number): string {
    const acc = this.accounts().find(a => a.id === id);
    return acc?.name || '-';
  }

  getFundName(id: number): string {
    const fund = this.funds().find(f => f.id === id);
    return fund?.name || '-';
  }

  getOpTypeName(id: number): string {
    const ot = this.operationTypes().find(o => o.id === id);
    return ot?.name || '';
  }

  getTypeLabel(t: string): string {
    const m: Record<string, string> = { receipt: 'سند قبض', payment: 'سند صرف', transfer: 'تحويل' };
    return m[t] || t;
  }

  getTypeIcon(t: string): string {
    const m: Record<string, string> = { receipt: 'call_received', payment: 'call_made', transfer: 'swap_horiz' };
    return m[t] || 'receipt_long';
  }

  getTypeColor(t: string): string {
    const m: Record<string, string> = { receipt: '#22c55e', payment: '#ef4444', transfer: '#3b82f6' };
    return m[t] || '#64748b';
  }

  getVoucherTreasuryLabel(voucher: any): string {
    if (!voucher) return '-';
    if (voucher.voucherType === 'payment') {
      return (
        voucher.fromFundName ||
        voucher.fromAccountName ||
        (voucher.fromFundId ? this.getFundName(voucher.fromFundId) : '') ||
        (voucher.fromAccountId ? this.getAccountName(voucher.fromAccountId) : '') ||
        '-'
      );
    }
    return (
      voucher.toFundName ||
      voucher.toAccountName ||
      (voucher.toFundId ? this.getFundName(voucher.toFundId) : '') ||
      (voucher.toAccountId ? this.getAccountName(voucher.toAccountId) : '') ||
      '-'
    );
  }

  getVoucherJournalLines(voucher: any): any[] {
    if (!voucher) return [];
    return Array.isArray(voucher.journalEntries) ? voucher.journalEntries : [];
  }

  isSystemCashAccount(accountName: string | null | undefined): boolean {
    const name = String(accountName || '').trim();
    if (!name) return false;
    return name.includes('حساب الصناديق (آلي)') || name.toLowerCase().includes('system_cash_treasury');
  }

  getVoucherCounterpartyLines(voucher: any): any[] {
    const lines = this.getVoucherJournalLines(voucher);
    if (!Array.isArray(lines) || lines.length === 0) return [];
    const desiredLineType = voucher?.voucherType === 'payment' ? 'debit' : 'credit';
    return lines.filter((line) => {
      const lineType = String(line?.lineType || '').toLowerCase();
      const accountName = String(line?.accountName || '');
      if (this.isSystemCashAccount(accountName)) return false;
      return lineType === desiredLineType;
    });
  }

  getVoucherCounterpartySummary(voucher: any): string {
    const names = Array.from(
      new Set(
        this.getVoucherCounterpartyLines(voucher)
          .map((line) => String(line?.accountName || '').trim())
          .filter(Boolean),
      ),
    );
    if (names.length === 0) return '-';
    if (names.length <= 2) return names.join(' ، ');
    return `${names.slice(0, 2).join(' ، ')} +${names.length - 2}`;
  }

  getVoucherDocumentTitle(voucher: any): string {
    const type = String(voucher?.voucherType || '').toLowerCase();
    if (type === 'payment') return 'سند صرف';
    if (type === 'receipt') return 'سند قبض';
    if (type === 'transfer') return 'سند تحويل';
    return 'سند مالي';
  }

  getVoucherDirectionLabel(voucher: any): string {
    const type = String(voucher?.voucherType || '').toLowerCase();
    if (type === 'payment') return 'صرف من خزينة';
    if (type === 'receipt') return 'قبض إلى خزينة';
    if (type === 'transfer') return 'تحويل بين حسابات';
    return 'حركة مالية';
  }

  parseTreasuryVoucherNumber(voucherNumber: string | null | undefined): TreasuryVoucherNumberParts | null {
    if (!voucherNumber) return null;
    const parts = String(voucherNumber).split('-');
    if (parts.length !== 5) return null;
    const [voucherPrefix, treasuryKindCode, treasurySequence, year, serial] = parts;
    const vaultNo = Number.parseInt(treasurySequence, 10);
    const y = Number.parseInt(year, 10);
    const s = Number.parseInt(serial, 10);
    if (!Number.isInteger(vaultNo) || !Number.isInteger(y) || !Number.isInteger(s)) return null;
    if (vaultNo <= 0 || y <= 0 || s <= 0) return null;
    return {
      voucherPrefix,
      treasuryKindCode,
      treasuryCode: `${treasuryKindCode}-${treasurySequence}`,
      treasurySequence: vaultNo,
      year: y,
      serial: s,
    };
  }

  getTreasuryKindLabel(kindCode: string): string {
    const m: Record<string, string> = { FND: 'صندوق', BNK: 'بنك', EXC: 'صراف', WLT: 'محفظة' };
    return m[kindCode] || kindCode;
  }

  formatAmount(amount: unknown): string {
    return formatAmountShared(amount);
  }

  formatDate(d: string): string {
    return formatDateShared(d || '');
  }

  formatDateTime(d: string): string {
    return formatDateTimeShared(d || '');
  }

  trackById(_: number, item: any) { return item.id; }

  private getVoucherField(voucher: any, camel: string, snake?: string) {
    if (!voucher) return undefined;
    if (voucher[camel] !== undefined && voucher[camel] !== null) return voucher[camel];
    if (snake && voucher[snake] !== undefined && voucher[snake] !== null) return voucher[snake];
    return undefined;
  }

  private toDateInputValue(value: unknown): string {
    const raw = String(value || '').trim();
    if (!raw) return new Date().toISOString().split('T')[0];
    if (raw.length >= 10 && raw[4] === '-' && raw[7] === '-') return raw.slice(0, 10);
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return new Date().toISOString().split('T')[0];
    return parsed.toISOString().slice(0, 10);
  }

  private buildEditableVoucherLines(voucher: any): VoucherLine[] {
    const lines = this.getVoucherCounterpartyLines(voucher);
    const mapped = lines
      .map((line: any) => {
        const accountId = Number.parseInt(String(line?.accountId ?? ''), 10);
        if (!Number.isInteger(accountId) || accountId <= 0) return null;
        const account = this.accounts().find((item) => item.id === accountId);
        const subNature = this.accountSubNatures().find((nature) => nature.id === account?.accountSubNatureId);
        const amount = Number.parseFloat(String(line?.amount ?? 0));
        return {
          accountSubNatureId: account?.accountSubNatureId ?? null,
          accountId,
          amount: Number.isFinite(amount) && amount > 0 ? String(amount) : '',
          notes: String(line?.description || ''),
          subNatureQuery: String(subNature?.name || ''),
          accountQuery: String(account?.name || line?.accountName || ''),
          accountNumberFilter: '',
          showSubNatureSuggestions: false,
          activeSubNatureSuggestionIndex: -1,
          showAccountSuggestions: false,
          activeAccountSuggestionIndex: -1,
        } as VoucherLine;
      })
      .filter((line): line is VoucherLine => line !== null);
    return mapped.length > 0 ? mapped : [this.createEmptyVoucherLine()];
  }

  private normalizeVoucher(voucher: any) {
    if (!voucher) return voucher;
    const normalized = {
      ...voucher,
      id: this.getVoucherField(voucher, 'id', 'id'),
      voucherNumber: this.getVoucherField(voucher, 'voucherNumber', 'voucher_number') || '',
      voucherType: this.getVoucherField(voucher, 'voucherType', 'voucher_type') || '',
      voucherDate: this.getVoucherField(voucher, 'voucherDate', 'voucher_date') || null,
      createdAt: this.getVoucherField(voucher, 'createdAt', 'created_at') || null,
      fromAccountId: this.getVoucherField(voucher, 'fromAccountId', 'from_account_id') || null,
      toAccountId: this.getVoucherField(voucher, 'toAccountId', 'to_account_id') || null,
      fromFundId: this.getVoucherField(voucher, 'fromFundId', 'from_fund_id') || null,
      toFundId: this.getVoucherField(voucher, 'toFundId', 'to_fund_id') || null,
      fromAccountName: this.getVoucherField(voucher, 'fromAccountName', 'from_account_name') || null,
      toAccountName: this.getVoucherField(voucher, 'toAccountName', 'to_account_name') || null,
      fromAccountType: this.getVoucherField(voucher, 'fromAccountType', 'from_account_type') || null,
      toAccountType: this.getVoucherField(voucher, 'toAccountType', 'to_account_type') || null,
      fromFundName: this.getVoucherField(voucher, 'fromFundName', 'from_fund_name') || null,
      toFundName: this.getVoucherField(voucher, 'toFundName', 'to_fund_name') || null,
      reference: this.getVoucherField(voucher, 'reference', 'reference') || null,
      status: this.getVoucherField(voucher, 'status', 'status') || null,
      amount: this.getVoucherField(voucher, 'amount', 'amount') || 0,
      fullSequenceNumber: this.getVoucherField(voucher, 'fullSequenceNumber', 'full_sequence_number') || null,
      accountSequence: this.getVoucherField(voucher, 'accountSequence', 'account_sequence') || null,
      operationTypeId: this.getVoucherField(voucher, 'operationTypeId', 'operation_type_id') || null,
      description: this.getVoucherField(voucher, 'description', 'description') || '',
      journalEntries: this.getVoucherField(voucher, 'journalEntries', 'journal_entries') || [],
    };
    return normalized;
  }

  private getVoucherTreasuryMeta(voucher: any): { type: TreasuryType | null; id: number | null } {
    if (!voucher) return { type: null, id: null };
    const normalized = this.normalizeVoucher(voucher);
    const vType = String(normalized.voucherType || '').toLowerCase();
    const isPayment = vType === 'payment';

    const fundIdRaw = isPayment ? normalized.fromFundId : normalized.toFundId;
    const accountIdRaw = isPayment ? normalized.fromAccountId : normalized.toAccountId;
    const accountTypeRaw = isPayment ? normalized.fromAccountType : normalized.toAccountType;

    const fundId = Number.parseInt(String(fundIdRaw ?? ''), 10);
    if (Number.isInteger(fundId) && fundId > 0) {
      return { type: 'fund', id: fundId };
    }

    const accountId = Number.parseInt(String(accountIdRaw ?? ''), 10);
    if (!Number.isInteger(accountId) || accountId <= 0) {
      return { type: null, id: null };
    }

    let resolvedType = String(accountTypeRaw || '').toLowerCase();
    if (!resolvedType) {
      const account = this.accounts().find((item) => item.id === accountId);
      if (account) resolvedType = this.getAccountType(account);
    }

    if (resolvedType === 'bank' || resolvedType === 'exchange' || resolvedType === 'e_wallet') {
      return { type: resolvedType as TreasuryType, id: accountId };
    }
    return { type: null, id: accountId };
  }

  private normalizeJournalLine(line: any) {
    if (!line) return line;
    return {
      ...line,
      accountName: line.accountName ?? line.account_name ?? '-',
      lineType: line.lineType ?? line.line_type ?? '-',
      amount: line.amount ?? line.lineAmount ?? line.line_amount ?? 0,
      description: line.description ?? line.lineDescription ?? line.line_description ?? '',
    };
  }

  private getTreasuryNumber(item: any): number | null {
    if (!item) return null;
    const code = String(item.code || '');
    const codeMatch = code.match(/-(\d+)$/);
    if (codeMatch?.[1]) {
      const n = Number.parseInt(codeMatch[1], 10);
      if (Number.isInteger(n) && n > 0) return n;
    }
    const seq = Number.parseInt(String(item.sequenceNumber ?? ''), 10);
    if (Number.isInteger(seq) && seq > 0) return seq;
    const id = Number.parseInt(String(item.id ?? ''), 10);
    if (Number.isInteger(id) && id > 0) return id;
    return null;
  }

  getTreasuryOptionText(item: any): string {
    if (!item) return '';
    const label = String(item?.label || item?.name || '').trim();
    const code = String(item?.code || '').trim();
    return code ? `${label} (${code})` : label;
  }

  private applyTreasurySelection(rawId: number | null, syncInputText: boolean) {
    const treasuryId = rawId ? Number(rawId) : null;
    const selectedId = Number.isInteger(treasuryId) && (treasuryId as number) > 0 ? (treasuryId as number) : null;
    this.selectedTreasuryId.set(selectedId);

    const selectedItem = selectedId ? this.treasuryOptions().find((option) => option.id === selectedId) : null;
    const selectedNumber = this.getTreasuryNumber(selectedItem);
    this.treasuryNumberFilter.set(selectedNumber !== null ? String(selectedNumber) : '');
    if (syncInputText) {
      this.treasurySearchQuery.set(selectedItem ? this.getTreasuryOptionText(selectedItem) : '');
    }

    if (this.treasuryType() !== 'fund' && selectedId) {
      // Load balance in background; do not block voucher number preview.
      void this.loadAccountBalance(selectedId);
    }
    void this.refreshVoucherNumberPreview();
  }

  private normalizeTreasurySearchText(value: any): string {
    return normalizeSearchText(value);
  }

  private getHighlightParts(text: string, query: string): { before: string; match: string; after: string } {
    return getSearchHighlightParts(text, query);
  }

  private createEmptyVoucherLine(): VoucherLine {
    return {
      accountSubNatureId: null,
      accountId: null,
      amount: '',
      notes: '',
      subNatureQuery: '',
      accountQuery: '',
      accountNumberFilter: '',
      showSubNatureSuggestions: false,
      activeSubNatureSuggestionIndex: -1,
      showAccountSuggestions: false,
      activeAccountSuggestionIndex: -1,
    };
  }

  private compareTreasuryOptions(a: any, b: any): number {
    const na = this.getTreasuryNumber(a);
    const nb = this.getTreasuryNumber(b);
    if (na !== null && nb !== null && na !== nb) return na - nb;
    if (na !== null && nb === null) return -1;
    if (na === null && nb !== null) return 1;
    return String(a?.label || a?.name || '').localeCompare(String(b?.label || b?.name || ''), 'ar');
  }

}
