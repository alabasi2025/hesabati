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

  // Form state
  voucherType = signal<'receipt' | 'payment'>('payment');
  selectedOpType = signal<any>(null);
  form = signal<any>({
    operationTypeId: null,
    fromAccountId: null,
    toAccountId: null,
    amount: '',
    description: '',
    voucherDate: new Date().toISOString().split('T')[0],
    reference: '',
    notes: '',
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
    return { total: all.length, receipts: receipts.length, payments: payments.length, totalReceipt, totalPayment };
  });

  tabs = [
    { value: 'all', label: 'الكل', icon: 'receipt_long', color: '#64748b' },
    { value: 'receipt', label: 'سندات القبض', icon: 'call_received', color: '#22c55e' },
    { value: 'payment', label: 'سندات الصرف', icon: 'call_made', color: '#ef4444' },
  ];

  async ngOnInit() {
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      await Promise.all([this.loadVouchers(), this.loadOperationTypes(), this.loadAccounts()]);
    });
  }

  async loadVouchers() {
    this.loading.set(true);
    try {
      const data = await this.api.getVouchers(this.bizId);
      this.vouchers.set(data);
    } catch (e: any) {
      this.error.set(e.message);
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

  openCreate(type: 'receipt' | 'payment') {
    this.voucherType.set(type);
    this.selectedOpType.set(null);
    this.form.set({
      operationTypeId: null,
      fromAccountId: null,
      toAccountId: null,
      amount: '',
      description: '',
      voucherDate: new Date().toISOString().split('T')[0],
      reference: '',
      notes: '',
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

  async saveVoucher() {
    const f = this.form();
    if (!f.amount || parseFloat(f.amount) <= 0) { this.error.set('أدخل المبلغ'); return; }
    if (!f.description) { this.error.set('أدخل البيان'); return; }

    this.saving.set(true);
    try {
      await this.api.createVoucher(this.bizId, {
        ...f,
        voucherType: this.voucherType(),
        amount: String(parseFloat(f.amount)),
        currencyId: 1, // ريال يمني افتراضي
      });
      this.showForm.set(false);
      await this.loadVouchers();
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.saving.set(false);
    }
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

  trackById(_: number, item: any) { return item.id; }
}
