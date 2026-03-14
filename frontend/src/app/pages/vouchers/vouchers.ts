import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { formatAmount as formatAmountShared, formatDate as formatDateShared, formatDateTime as formatDateTimeShared } from '../../shared/helpers';

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
}

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './vouchers.html',
  styleUrl: './vouchers.scss',
})
export class VouchersComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

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
  showReverseDialog = signal(false);
  reverseReason = signal('');
  reverseTargetId = signal<number | null>(null);
  showAttachments = signal(false);
  attachmentTargetId = signal<number | null>(null);
  attachments = signal<any[]>([]);
  attachmentForm = signal<any>({ fileName: '', filePath: '', fileType: '', description: '' });

  // ===================== Enhanced Filters =====================
  filterDateFrom = signal('');
  filterDateTo = signal('');
  filterStatus = signal('');
  filterSearch = signal('');
  filterMinAmount = signal<number | null>(null);
  filterMaxAmount = signal<number | null>(null);
  filterOpTypeId = signal<number | null>(null);
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

  // Form state
  voucherType = signal<'receipt' | 'payment'>('payment');
  treasuryType = signal<TreasuryType | null>(null);
  selectedTreasuryId = signal<number | null>(null);
  previewLoading = signal(false);
  voucherNumberPreview = signal('');
  voucherLines = signal<VoucherLine[]>([]);
  form = signal<any>({
    amount: '',
    description: '',
    voucherDate: new Date().toISOString().split('T')[0],
    reference: '',
    currencyId: 1,
  });

  treasuryOptions = computed(() => {
    const type = this.treasuryType();
    if (!type) return [];
    if (type === 'fund') {
      return this.funds().map((fund) => ({ ...fund, label: fund.name }));
    }
    return this.accounts()
      .filter((account) => this.getAccountType(account) === type && account.isLeafAccount !== false)
      .map((account) => ({ ...account, label: account.name }));
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
    const all = this.vouchers();
    if (tab === 'all') return all;
    return all.filter(v => v.voucherType === tab);
  });

  stats = computed(() => {
    const all = this.vouchers();
    const receipts = all.filter(v => v.voucherType === 'receipt');
    const payments = all.filter(v => v.voucherType === 'payment');
    const totalReceipt = receipts.reduce((s, v) => s + Number.parseFloat(v.amount || 0), 0);
    const totalPayment = payments.reduce((s, v) => s + Number.parseFloat(v.amount || 0), 0);
    const drafts = all.filter(v => v.status === 'draft').length;
    const confirmed = all.filter(v => v.status === 'confirmed').length;
    const cancelled = all.filter(v => v.status === 'cancelled').length;
    return { total: all.length, receipts: receipts.length, payments: payments.length, totalReceipt, totalPayment, net: totalReceipt - totalPayment, drafts, confirmed, cancelled };
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
    { value: 'draft', label: 'مسودة', icon: 'edit_note', color: '#f59e0b' },
    { value: 'confirmed', label: 'معتمد', icon: 'check_circle', color: '#22c55e' },
    { value: 'cancelled', label: 'ملغي', icon: 'cancel', color: '#ef4444' },
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

  async loadVouchers() {
    this.loading.set(true);
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
      if (this.filterMinAmount()) filters.minAmount = this.filterMinAmount();
      if (this.filterMaxAmount()) filters.maxAmount = this.filterMaxAmount();
      if (this.filterOpTypeId()) filters.operationTypeId = this.filterOpTypeId();

      const result = await this.api.getVouchersEnhanced(this.bizId, filters);
      this.vouchers.set(result.vouchers || result);
      this.totalVouchers.set(result.total || (result.vouchers || result).length);
    } catch (e: unknown) {
      try {
        const data = await this.api.getVouchers(this.bizId);
        this.vouchers.set(data);
        this.totalVouchers.set(data.length);
      } catch (fallbackError: unknown) {
        this.error.set(fallbackError instanceof Error ? fallbackError.message : String(fallbackError));
      }
    } finally {
      this.loading.set(false);
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
    this.page.set(1);
    await this.loadVouchers();
  }

  async clearFilters() {
    this.filterDateFrom.set('');
    this.filterDateTo.set('');
    this.filterStatus.set('');
    this.filterSearch.set('');
    this.filterMinAmount.set(null);
    this.filterMaxAmount.set(null);
    this.filterOpTypeId.set(null);
    this.page.set(1);
    await this.loadVouchers();
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
    });
    this.voucherLines.set([{ accountSubNatureId: null, accountId: null, amount: '', notes: '' }]);
    this.showForm.set(true);
  }

  openEdit(voucher: any) {
    void voucher;
    this.toast.warning('تعديل السندات بهذا النموذج غير مدعوم حالياً بعد تحديث آلية الإدخال');
  }

  addVoucherLine() {
    this.voucherLines.update((rows) => [...rows, { accountSubNatureId: null, accountId: null, amount: '', notes: '' }]);
  }

  removeVoucherLine(index: number) {
    this.voucherLines.update((rows) => rows.filter((_, i) => i !== index));
    if (this.voucherLines().length === 0) {
      this.voucherLines.set([{ accountSubNatureId: null, accountId: null, amount: '', notes: '' }]);
    }
  }

  updateVoucherLine(index: number, field: keyof VoucherLine, value: any) {
    this.voucherLines.update((rows) =>
      rows.map((row, i) => {
        if (i !== index) return row;
        if (field === 'accountSubNatureId') {
          return { ...row, accountSubNatureId: value, accountId: null };
        }
        return { ...row, [field]: value };
      }),
    );
  }

  getLineAccounts(line: VoucherLine) {
    const selectedTreasuryId = this.selectedTreasuryId();
    return this.counterpartyAccounts().filter((account) => {
      if (line.accountSubNatureId && account.accountSubNatureId !== line.accountSubNatureId) return false;
      if (selectedTreasuryId && this.treasuryType() !== 'fund' && account.id === selectedTreasuryId) return false;
      return true;
    });
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
    this.voucherNumberPreview.set('');
  }

  async setSelectedTreasury(value: any) {
    const treasuryId = value ? Number(value) : null;
    this.selectedTreasuryId.set(Number.isInteger(treasuryId) && (treasuryId as number) > 0 ? treasuryId : null);
    if (this.treasuryType() !== 'fund' && this.selectedTreasuryId()) {
      await this.loadAccountBalance(this.selectedTreasuryId()!);
    }
    await this.refreshVoucherNumberPreview();
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
      const payload: any = {
        voucherType: this.voucherType(),
        amount: String(amount),
        description: String(f.description || '').trim(),
        reference: String(f.reference || '').trim() || null,
        voucherDate: f.voucherDate,
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
  async changeStatus(voucher: any, newStatus: string) {
    const statusLabels: Record<string, string> = { draft: 'مسودة', confirmed: 'معتمد', cancelled: 'ملغي' };
    const confirmed = await this.toast.confirm({
      title: `تغيير الحالة إلى ${statusLabels[newStatus]}`,
      message: `هل تريد تغيير حالة السند رقم ${voucher.voucherNumber} إلى "${statusLabels[newStatus]}"؟`,
      type: newStatus === 'cancelled' ? 'danger' : 'info',
    });
    if (!confirmed) return;

    this.saving.set(true);
    try {
      await this.api.changeVoucherStatus(this.bizId, voucher.id, newStatus);
      this.toast.success(`تم تغيير الحالة إلى ${statusLabels[newStatus]}`);
      await this.loadVouchers();
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'خطأ في تغيير الحالة');
    } finally {
      this.saving.set(false);
    }
  }

  getStatusLabel(status: string): string {
    const m: Record<string, string> = { draft: 'مسودة', confirmed: 'معتمد', cancelled: 'ملغي', reversed: 'معكوس' };
    return m[status] || status;
  }

  getStatusIcon(status: string): string {
    const m: Record<string, string> = { draft: 'edit_note', confirmed: 'check_circle', cancelled: 'cancel', reversed: 'undo' };
    return m[status] || 'help';
  }

  getStatusColor(status: string): string {
    const m: Record<string, string> = { draft: '#f59e0b', confirmed: '#22c55e', cancelled: '#ef4444', reversed: '#8b5cf6' };
    return m[status] || '#64748b';
  }

  // ===================== Voucher Details =====================
  async openDetails(voucher: any) {
    this.detailsLoading.set(true);
    this.showDetailsModal.set(true);
    try {
      const details = await this.api.getVoucherDetails(this.bizId, voucher.id);
      // API may return either the voucher itself OR a wrapper { voucher, ... }
      this.detailsVoucher.set((details as any)?.voucher ?? details);
    } catch (e: unknown) {
      this.detailsVoucher.set(voucher);
    } finally {
      this.detailsLoading.set(false);
    }
  }

  closeDetails() {
    this.showDetailsModal.set(false);
    this.detailsVoucher.set(null);
  }

  // ===================== Print Voucher =====================
  printVoucher(voucher: any) {
    this.printingVoucher.set(voucher);
    setTimeout(() => {
      const printContent = document.getElementById('voucher-print-area');
      if (!printContent) return;
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;
      printWindow.document.write(`
        <html dir="rtl"><head><title>سند ${this.getTypeLabel(voucher.voucherType)} - ${voucher.voucherNumber}</title>
        <style>
          body { font-family: 'Tajawal', sans-serif; padding: 20px; direction: rtl; }
          .print-header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
          .print-row { display: flex; justify-content: space-between; margin: 8px 0; padding: 4px 0; border-bottom: 1px dotted #ccc; }
          .print-label { font-weight: bold; color: #333; }
          .print-amount { font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; padding: 10px; border: 2px solid #333; border-radius: 8px; }
          .print-footer { margin-top: 40px; display: flex; justify-content: space-between; }
          .print-sig { text-align: center; border-top: 1px solid #333; padding-top: 5px; min-width: 150px; }
        </style></head><body>
        ${printContent.innerHTML}
        </body></html>
      `);
      printWindow.document.close();
      printWindow.print();
      this.printingVoucher.set(null);
    }, 100);
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

  // ========== عكس العمليات ==========
  openReverse(voucherId: number) {
    this.reverseTargetId.set(voucherId);
    this.reverseReason.set('');
    this.showReverseDialog.set(true);
  }

  async confirmReverse() {
    const id = this.reverseTargetId();
    const reason = this.reverseReason();
    if (!id || !reason) { this.error.set('يجب إدخال سبب العكس'); return; }
    try {
      await this.api.reverseVoucher(this.bizId, id, reason);
      this.showReverseDialog.set(false);
      this.toast.success('تم عكس السند بنجاح');
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
        fileName: f.fileName, filePath: f.filePath, fileType: f.fileType || 'application/octet-stream', description: f.description,
      });
      this.attachmentForm.set({ fileName: '', filePath: '', fileType: '', description: '' });
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
}
