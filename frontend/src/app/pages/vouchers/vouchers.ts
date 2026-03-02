import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vouchers.html',
  styleUrl: './vouchers.scss',
})
export class VouchersComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private toast = inject(ToastService);

  bizId = 0;
  loading = signal(true);
  saving = signal(false);
  vouchers = signal<any[]>([]);
  operationTypes = signal<any[]>([]);
  accounts = signal<any[]>([]);
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

  // ===================== Account Balance Display =====================
  accountBalances = signal<Record<number, number>>({});

  // ===================== Print =====================
  printingVoucher = signal<any>(null);

  // Form state
  voucherType = signal<'receipt' | 'payment'>('payment');
  selectedOpType = signal<any>(null);
  form = signal<any>({
    operationTypeId: null,
    fromAccountId: null,
    toAccountId: null,
    fromFundId: null,
    toFundId: null,
    amount: '',
    description: '',
    voucherDate: new Date().toISOString().split('T')[0],
    reference: '',
    currencyId: 1,
    status: 'draft',
  });

  // Linked accounts from selected operation type
  linkedAccounts = computed(() => {
    const ot = this.selectedOpType();
    if (!ot || !ot.accounts) return [];
    return ot.accounts;
  });

  // Voucher operation types only
  voucherOpTypes = computed(() => {
    return this.operationTypes().filter(ot => ot.category === 'voucher');
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
    const totalReceipt = receipts.reduce((s, v) => s + parseFloat(v.amount || 0), 0);
    const totalPayment = payments.reduce((s, v) => s + parseFloat(v.amount || 0), 0);
    const drafts = all.filter(v => v.status === 'draft').length;
    const confirmed = all.filter(v => v.status === 'confirmed').length;
    const cancelled = all.filter(v => v.status === 'cancelled').length;
    return { total: all.length, receipts: receipts.length, payments: payments.length, totalReceipt, totalPayment, drafts, confirmed, cancelled };
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

  async ngOnInit() {
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      await Promise.all([this.loadVouchers(), this.loadOperationTypes(), this.loadAccounts(), this.loadFunds()]);
    });
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
    } catch (e: any) {
      // Fallback to old API
      try {
        const data = await this.api.getVouchers(this.bizId);
        this.vouchers.set(data);
        this.totalVouchers.set(data.length);
      } catch (e2: any) {
        this.error.set(e2.message);
      }
    } finally {
      this.loading.set(false);
    }
  }

  async loadOperationTypes() {
    try {
      const data = await this.api.getOperationTypes(this.bizId);
      this.operationTypes.set(data);
    } catch (e) { /* ignore */ }
  }

  async loadAccounts() {
    try {
      const data = await this.api.getAccounts(this.bizId);
      this.accounts.set(data);
    } catch (e) { /* ignore */ }
  }

  async loadFunds() {
    try {
      const data = await this.api.getFunds(this.bizId);
      this.funds.set(data);
    } catch (e) { /* ignore */ }
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
    this.selectedOpType.set(null);
    this.isEditing.set(false);
    this.editingVoucher.set(null);
    this.form.set({
      operationTypeId: null,
      fromAccountId: null,
      toAccountId: null,
      fromFundId: null,
      toFundId: null,
      amount: '',
      description: '',
      voucherDate: new Date().toISOString().split('T')[0],
      reference: '',
      currencyId: 1,
      status: 'draft',
    });
    this.showForm.set(true);
  }

  openEdit(voucher: any) {
    if (voucher.status !== 'draft') {
      this.toast.warning('لا يمكن تعديل سند معتمد أو ملغي');
      return;
    }
    this.isEditing.set(true);
    this.editingVoucher.set(voucher);
    this.voucherType.set(voucher.voucherType);
    const ot = this.operationTypes().find(o => o.id === voucher.operationTypeId);
    this.selectedOpType.set(ot || null);
    this.form.set({
      operationTypeId: voucher.operationTypeId,
      fromAccountId: voucher.fromAccountId,
      toAccountId: voucher.toAccountId,
      fromFundId: voucher.fromFundId,
      toFundId: voucher.toFundId,
      amount: String(voucher.amount),
      description: voucher.description || '',
      voucherDate: voucher.voucherDate ? new Date(voucher.voucherDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      reference: voucher.reference || '',
      currencyId: voucher.currencyId || 1,
      status: voucher.status || 'draft',
    });
    this.showForm.set(true);
  }

  selectOpType(ot: any) {
    this.selectedOpType.set(ot);
    this.form.update(f => ({ ...f, operationTypeId: ot.id, fromAccountId: null, toAccountId: null }));
  }

  setFormField(field: string, value: any) {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  // ===================== Account Balance =====================
  async loadAccountBalance(accountId: number) {
    if (!accountId || this.accountBalances()[accountId] !== undefined) return;
    try {
      const result = await this.api.getAccountBalance(this.bizId, accountId);
      this.accountBalances.update(b => ({ ...b, [accountId]: result.balance || 0 }));
    } catch (e) { /* ignore */ }
  }

  getAccountBalanceDisplay(accountId: number): string {
    const bal = this.accountBalances()[accountId];
    if (bal === undefined) return '';
    return `الرصيد: ${this.formatAmount(bal)}`;
  }

  // ===================== Save Voucher =====================
  async saveVoucher() {
    const f = this.form();
    if (!f.amount || parseFloat(f.amount) <= 0) { this.error.set('أدخل المبلغ'); return; }
    if (!f.description) { this.error.set('أدخل البيان'); return; }

    this.saving.set(true);
    try {
      const payload = {
        ...f,
        voucherType: this.voucherType(),
        amount: String(parseFloat(f.amount)),
        currencyId: f.currencyId || 1,
      };

      if (this.isEditing() && this.editingVoucher()) {
        await this.api.updateVoucher(this.bizId, this.editingVoucher().id, payload);
        this.toast.success('تم تعديل السند بنجاح');
      } else {
        if (f.status === 'draft') {
          await this.api.createVoucherDraft(this.bizId, payload);
          this.toast.success('تم حفظ السند كمسودة');
        } else {
          await this.api.createVoucher(this.bizId, payload);
          this.toast.success('تم إنشاء السند بنجاح');
        }
      }
      this.showForm.set(false);
      await this.loadVouchers();
    } catch (e: any) {
      this.error.set(e.message);
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
    } catch (e: any) {
      this.error.set(e.message || 'خطأ في تغيير الحالة');
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
      this.detailsVoucher.set(details);
    } catch (e: any) {
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
    } catch (e: any) {
      this.error.set(e.message);
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
    } catch (e: any) {
      this.error.set(e.message);
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
    } catch (e: any) { this.error.set(e.message); }
  }

  async removeAttachment(id: number) {
    try {
      await this.api.deleteAttachment(this.bizId, id);
      this.attachments.set(await this.api.getAttachments('voucher', this.attachmentTargetId()!));
    } catch (e: any) { this.error.set(e.message); }
  }

  getAccountName(id: number): string {
    const acc = this.accounts().find(a => a.id === id);
    return acc?.name || '-';
  }

  getFundName(id: number): string {
    const fund = this.funds().find(f => f.id === id);
    return fund?.name || '-';
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

  formatAmount(amount: any): string {
    return parseFloat(amount || 0).toLocaleString('ar-YE');
  }

  formatDate(d: string): string {
    if (!d) return '';
    return new Date(d).toLocaleDateString('ar-YE');
  }

  formatDateTime(d: string): string {
    if (!d) return '';
    return new Date(d).toLocaleString('ar-YE', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  trackById(_: number, item: any) { return item.id; }
}
