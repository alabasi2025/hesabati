import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

interface JournalLine {
  accountId: number | null;
  amount: number;
  notes: string;
}

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './journal.html',
  styleUrl: './journal.scss',
})
export class JournalComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  biz = inject(BusinessService);

  bizId = 0;
  vouchers = signal<any[]>([]);
  accounts = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  showHowItWorks = signal(false);

  // Journal entry type: simple or compound
  journalType = signal<'simple' | 'compound'>('simple');
  compoundDirection = signal<'one_debit_many_credit' | 'one_credit_many_debit'>('one_credit_many_debit');

  // Simple form
  simpleForm = {
    debitAccountId: null as number | null,
    creditAccountId: null as number | null,
    amount: 0,
    description: '',
    reference: '',
    voucherDate: new Date().toISOString().split('T')[0],
  };

  // Compound form
  compoundForm = {
    mainAccountId: null as number | null,
    totalAmount: 0,
    description: '',
    reference: '',
    voucherDate: new Date().toISOString().split('T')[0],
    lines: [{ accountId: null, amount: 0, notes: '' }] as JournalLine[],
  };

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try {
      const [v, a] = await Promise.all([
        this.api.getVouchers(this.bizId, 'journal'),
        this.api.getAccounts(this.bizId),
      ]);
      this.vouchers.set(v);
      this.accounts.set(a);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  // ===================== فلترة حسابات القيود =====================
  getAccountingAccounts(): any[] {
    // Only show accounts that can be in journal entries (accounting, intermediary, service)
    return this.accounts().filter(a =>
      ['accounting', 'intermediary', 'service', 'custody'].includes(a.accountType)
      || a.canCreateVoucher
    );
  }

  getAllowedDebitAccounts(creditAccountId: number | null): any[] {
    if (!creditAccountId) return this.getAccountingAccounts();
    const acc = this.accounts().find(a => a.id === creditAccountId);
    if (acc?.allowedLinks?.length > 0) {
      const allowedIds = acc.allowedLinks.map((l: any) => l.toAccountId);
      return this.accounts().filter(a => allowedIds.includes(a.id));
    }
    return this.getAccountingAccounts().filter(a => a.id !== creditAccountId);
  }

  getAllowedCreditAccounts(debitAccountId: number | null): any[] {
    if (!debitAccountId) return this.getAccountingAccounts();
    const acc = this.accounts().find(a => a.id === debitAccountId);
    if (acc?.allowedLinks?.length > 0) {
      const allowedIds = acc.allowedLinks.map((l: any) => l.toAccountId);
      return this.accounts().filter(a => allowedIds.includes(a.id));
    }
    return this.getAccountingAccounts().filter(a => a.id !== debitAccountId);
  }

  // ===================== Compound Lines =====================
  addLine() {
    this.compoundForm.lines.push({ accountId: null, amount: 0, notes: '' });
  }

  removeLine(index: number) {
    if (this.compoundForm.lines.length > 1) {
      this.compoundForm.lines.splice(index, 1);
    }
  }

  getLinesTotal(): number {
    return this.compoundForm.lines.reduce((sum, l) => sum + (l.amount || 0), 0);
  }

  getRemaining(): number {
    return this.compoundForm.totalAmount - this.getLinesTotal();
  }

  isBalanced(): boolean {
    return Math.abs(this.getRemaining()) < 0.01;
  }

  // ===================== CRUD =====================
  openSimple() {
    this.journalType.set('simple');
    this.simpleForm = {
      debitAccountId: null, creditAccountId: null, amount: 0,
      description: '', reference: '',
      voucherDate: new Date().toISOString().split('T')[0],
    };
    this.showForm.set(true);
  }

  openCompound() {
    this.journalType.set('compound');
    this.compoundForm = {
      mainAccountId: null, totalAmount: 0,
      description: '', reference: '',
      voucherDate: new Date().toISOString().split('T')[0],
      lines: [{ accountId: null, amount: 0, notes: '' }],
    };
    this.showForm.set(true);
  }

  async saveSimple() {
    if (!this.simpleForm.amount || this.simpleForm.amount <= 0) { alert('أدخل المبلغ'); return; }
    if (!this.simpleForm.debitAccountId) { alert('اختر الحساب المدين'); return; }
    if (!this.simpleForm.creditAccountId) { alert('اختر الحساب الدائن'); return; }

    try {
      await this.api.createVoucher(this.bizId, {
        voucherType: 'journal',
        amount: String(this.simpleForm.amount),
        fromAccountId: this.simpleForm.creditAccountId, // Credit = from
        toAccountId: this.simpleForm.debitAccountId, // Debit = to
        description: this.simpleForm.description,
        reference: this.simpleForm.reference,
        voucherDate: this.simpleForm.voucherDate,
        currencyId: 1,
      });
      this.showForm.set(false);
      await this.load();
    } catch (e: any) { alert(e.message || 'حدث خطأ'); }
  }

  async saveCompound() {
    if (!this.compoundForm.totalAmount || this.compoundForm.totalAmount <= 0) { alert('أدخل المبلغ الإجمالي'); return; }
    if (!this.compoundForm.mainAccountId) { alert('اختر الحساب الرئيسي'); return; }
    if (!this.isBalanced()) { alert('المجموع غير متساوي - تأكد من توزيع المبلغ بالكامل'); return; }

    try {
      // Create multiple vouchers for compound journal
      for (const line of this.compoundForm.lines) {
        if (!line.accountId || line.amount <= 0) continue;
        const dir = this.compoundDirection();
        await this.api.createVoucher(this.bizId, {
          voucherType: 'journal',
          amount: String(line.amount),
          fromAccountId: dir === 'one_credit_many_debit' ? this.compoundForm.mainAccountId : line.accountId,
          toAccountId: dir === 'one_credit_many_debit' ? line.accountId : this.compoundForm.mainAccountId,
          description: `${this.compoundForm.description} ${line.notes ? '- ' + line.notes : ''}`.trim(),
          reference: this.compoundForm.reference,
          voucherDate: this.compoundForm.voucherDate,
          currencyId: 1,
        });
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: any) { alert(e.message || 'حدث خطأ'); }
  }

  async cancelVoucher(id: number) {
    if (confirm('هل أنت متأكد من إلغاء هذا القيد؟')) {
      await this.api.deleteVoucher(id);
      await this.load();
    }
  }

  // ===================== Helpers =====================
  getAccountName(id: number | null): string {
    if (!id) return '-';
    return this.accounts().find(a => a.id === id)?.name || '-';
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('ar-YE', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  formatAmount(amount: any): string {
    return Number(amount).toLocaleString('ar-YE');
  }

  getStatusLabel(s: string): string {
    return s === 'confirmed' ? 'مؤكد' : s === 'draft' ? 'مسودة' : 'ملغي';
  }
  getStatusClass(s: string): string {
    return s === 'confirmed' ? 'active' : s === 'draft' ? 'partner' : 'inactive';
  }
}
