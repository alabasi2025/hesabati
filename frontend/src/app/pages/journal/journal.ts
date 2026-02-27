import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface JournalLine {
  accountId: number | null;
  lineType: 'debit' | 'credit';
  amount: number;
  description: string;
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

  bizId = 0;
  entries = signal<any[]>([]);
  accounts = signal<any[]>([]);
  operationTypes = signal<any[]>([]);
  loading = signal(true);
  saving = signal(false);
  showForm = signal(false);
  showHowItWorks = signal(false);
  error = signal('');

  // Journal entry type: simple or compound
  journalType = signal<'simple' | 'compound'>('simple');
  compoundDirection = signal<'one_credit_many_debit' | 'one_debit_many_credit'>('one_credit_many_debit');

  // Simple form
  simpleForm = {
    debitAccountId: null as number | null,
    creditAccountId: null as number | null,
    amount: 0,
    description: '',
    reference: '',
    date: new Date().toISOString().split('T')[0],
    operationTypeId: null as number | null,
  };

  // Compound form
  compoundForm = {
    mainAccountId: null as number | null,
    totalAmount: 0,
    description: '',
    reference: '',
    date: new Date().toISOString().split('T')[0],
    operationTypeId: null as number | null,
    lines: [{ accountId: null as number | null, amount: 0, description: '' }],
  };

  // Journal operation types
  journalOpTypes = computed(() => {
    return this.operationTypes().filter(ot => ot.category === 'journal');
  });

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    this.error.set('');
    try {
      const [entries, accounts, opTypes] = await Promise.all([
        this.api.getJournalEntries(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getOperationTypes(this.bizId),
      ]);
      this.entries.set(entries);
      this.accounts.set(accounts);
      this.operationTypes.set(opTypes);
    } catch (e: any) {
      this.error.set(e.message || 'حدث خطأ في تحميل البيانات');
    }
    this.loading.set(false);
  }

  // ===================== فلترة الحسابات =====================
  getAllAccounts(): any[] {
    return this.accounts();
  }

  getAccountsExcluding(excludeId: number | null): any[] {
    if (!excludeId) return this.accounts();
    return this.accounts().filter(a => a.id !== excludeId);
  }

  // ===================== Compound Lines =====================
  addLine() {
    this.compoundForm.lines.push({ accountId: null, amount: 0, description: '' });
  }

  removeLine(index: number) {
    if (this.compoundForm.lines.length > 1) {
      this.compoundForm.lines.splice(index, 1);
    }
  }

  getLinesTotal(): number {
    return this.compoundForm.lines.reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
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
      date: new Date().toISOString().split('T')[0],
      operationTypeId: null,
    };
    this.error.set('');
    this.showForm.set(true);
  }

  openCompound() {
    this.journalType.set('compound');
    this.compoundForm = {
      mainAccountId: null, totalAmount: 0,
      description: '', reference: '',
      date: new Date().toISOString().split('T')[0],
      operationTypeId: null,
      lines: [{ accountId: null, amount: 0, description: '' }],
    };
    this.error.set('');
    this.showForm.set(true);
  }

  async saveSimple() {
    if (!this.simpleForm.amount || this.simpleForm.amount <= 0) { this.error.set('أدخل المبلغ'); return; }
    if (!this.simpleForm.debitAccountId) { this.error.set('اختر الحساب المدين'); return; }
    if (!this.simpleForm.creditAccountId) { this.error.set('اختر الحساب الدائن'); return; }
    if (!this.simpleForm.description) { this.error.set('أدخل البيان'); return; }

    this.saving.set(true);
    this.error.set('');
    try {
      await this.api.createJournalEntry(this.bizId, {
        description: this.simpleForm.description,
        date: this.simpleForm.date,
        reference: this.simpleForm.reference,
        operationTypeId: this.simpleForm.operationTypeId,
        lines: [
          { accountId: this.simpleForm.creditAccountId, lineType: 'credit', amount: this.simpleForm.amount, description: 'دائن' },
          { accountId: this.simpleForm.debitAccountId, lineType: 'debit', amount: this.simpleForm.amount, description: 'مدين' },
        ],
      });
      this.showForm.set(false);
      await this.load();
    } catch (e: any) {
      this.error.set(e.message || 'حدث خطأ');
    }
    this.saving.set(false);
  }

  async saveCompound() {
    if (!this.compoundForm.totalAmount || this.compoundForm.totalAmount <= 0) { this.error.set('أدخل المبلغ الإجمالي'); return; }
    if (!this.compoundForm.mainAccountId) { this.error.set('اختر الحساب الرئيسي'); return; }
    if (!this.isBalanced()) { this.error.set('المجموع غير متساوي - تأكد من توزيع المبلغ بالكامل'); return; }
    if (!this.compoundForm.description) { this.error.set('أدخل البيان'); return; }

    const dir = this.compoundDirection();
    const lines: JournalLine[] = [];

    // Main account line
    lines.push({
      accountId: this.compoundForm.mainAccountId,
      lineType: dir === 'one_credit_many_debit' ? 'credit' : 'debit',
      amount: this.compoundForm.totalAmount,
      description: this.compoundForm.description,
    });

    // Sub lines
    for (const line of this.compoundForm.lines) {
      if (!line.accountId || line.amount <= 0) continue;
      lines.push({
        accountId: line.accountId,
        lineType: dir === 'one_credit_many_debit' ? 'debit' : 'credit',
        amount: line.amount,
        description: line.description || this.compoundForm.description,
      });
    }

    this.saving.set(true);
    this.error.set('');
    try {
      await this.api.createJournalEntry(this.bizId, {
        description: this.compoundForm.description,
        date: this.compoundForm.date,
        reference: this.compoundForm.reference,
        operationTypeId: this.compoundForm.operationTypeId,
        lines,
      });
      this.showForm.set(false);
      await this.load();
    } catch (e: any) {
      this.error.set(e.message || 'حدث خطأ');
    }
    this.saving.set(false);
  }

  async deleteEntry(id: number) {
    if (!confirm('هل أنت متأكد من حذف هذا القيد؟')) return;
    try {
      await this.api.deleteJournalEntry(id);
      await this.load();
    } catch (e: any) {
      this.error.set(e.message || 'حدث خطأ');
    }
  }

  // ===================== Helpers =====================
  getAccountName(id: number | null): string {
    if (!id) return '-';
    return this.accounts().find(a => a.id === id)?.name || '-';
  }

  formatDate(d: string): string {
    if (!d) return '';
    return new Date(d).toLocaleDateString('ar-YE', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  formatAmount(amount: any): string {
    return Number(amount || 0).toLocaleString('ar-YE');
  }

  getStatusLabel(s: string): string {
    return s === 'confirmed' ? 'مؤكد' : s === 'draft' ? 'مسودة' : 'ملغي';
  }

  getStatusClass(s: string): string {
    return s === 'confirmed' ? 'confirmed' : s === 'draft' ? 'draft' : 'cancelled';
  }

  trackById(_: number, item: any) { return item.id; }
}
