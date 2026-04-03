import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { formatAmount as formatAmountShared, formatDate as formatDateShared } from '../../shared/helpers';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

/** سطر قيد واحد في النموذج الحر */
export interface JournalLineForm {
  lineType: 'debit' | 'credit';
  accountId: number | null;
  entityType: string;         // supplier | employee | partner | fund | custody | warehouse | ''
  entityId: number | null;
  description: string;
  currencyId: number;
  amount: number;             // المبلغ بالعملة المحلية
  foreignAmount: number | null;
  exchangeRate: number | null;
}

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent, DecimalPipe],
  templateUrl: './journal.html',
  styleUrl: './journal.scss',
})
export class JournalComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  // ===== State =====
  entries       = signal<any[]>([]);
  accounts      = signal<any[]>([]);
  operationTypes= signal<any[]>([]);
  currencies    = signal<any[]>([]);
  suppliers     = signal<any[]>([]);
  employees     = signal<any[]>([]);
  partners      = signal<any[]>([]);
  funds         = signal<any[]>([]);
  custodies     = signal<any[]>([]);
  warehouses    = signal<any[]>([]);
  loading       = signal(true);
  saving        = signal(false);
  showForm      = signal(false);
  expandedId    = signal<number | null>(null);
  error         = signal('');
  editingId     = signal<number | null>(null);

  // ===== نموذج القيد (رأس) =====
  formHeader = signal({
    date:            new Date().toISOString().split('T')[0],
    description:     '',
    reference:       '',
    operationTypeId: null as number | null,
    status:          'draft' as 'draft' | 'unreviewed' | 'reviewed',
  });

  // ===== سطور القيد الحرة =====
  formLines = signal<JournalLineForm[]>([]);

  // ===== Computed =====
  journalOpTypes = computed(() =>
    this.operationTypes().filter((ot: any) => ot.category === 'journal' || !ot.category)
  );

  totalDebit = computed(() =>
    this.formLines().reduce((s, l) => s + (l.lineType === 'debit' ? (Number(l.amount) || 0) : 0), 0)
  );
  totalCredit = computed(() =>
    this.formLines().reduce((s, l) => s + (l.lineType === 'credit' ? (Number(l.amount) || 0) : 0), 0)
  );
  difference = computed(() => Math.abs(this.totalDebit() - this.totalCredit()));
  isBalanced  = computed(() => this.difference() < 0.01);
  hasForeignCurrency = computed(() =>
    this.formLines().some(l => l.currencyId && l.currencyId !== 1)
  );

  // أنواع الكيانات التحليلية
  readonly entityTypes = [
    { key: '',          label: '— بدون —' },
    { key: 'supplier',  label: 'مورد' },
    { key: 'employee',  label: 'موظف' },
    { key: 'partner',   label: 'شريك' },
    { key: 'fund',      label: 'صندوق / حساب مالي' },
    { key: 'custody',   label: 'عهدة' },
    { key: 'warehouse', label: 'مخزن' },
  ];

  readonly statusOptions = [
    { key: 'draft',      label: 'مسودة',       icon: 'edit_note',    color: '#64748b' },
    { key: 'unreviewed', label: 'غير مراجع',   icon: 'pending',      color: '#f59e0b' },
    { key: 'reviewed',   label: 'مراجع',       icon: 'check_circle', color: '#10b981' },
  ];

  protected override onBizIdChange(_bizId: number): void { this.load(); }

  // ===== Loading =====
  async load() {
    this.loading.set(true);
    this.error.set('');
    try {
      const [entries, accs, opTypes, currs, sups, emps, parts, fds, custs, whs] = await Promise.all([
        this.api.getJournalEntries(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getOperationTypes(this.bizId),
        this.api.getAllCurrencies(),
        this.api.getSuppliers(this.bizId).catch(() => []),
        this.api.getEmployees(this.bizId).catch(() => []),
        this.api.getPartners(this.bizId).catch(() => []),
        this.api.getFunds(this.bizId).catch(() => []),
        this.api.getCustodyRecords(this.bizId).catch(() => []),
        this.api.getWarehouses(this.bizId).catch(() => []),
      ]);
      this.entries.set(entries);
      this.accounts.set(accs);
      this.operationTypes.set(opTypes);
      this.currencies.set((currs || []).filter((c: any) => c.isActive !== false));
      this.suppliers.set(sups || []);
      this.employees.set(emps || []);
      this.partners.set(parts || []);
      this.funds.set(fds || []);
      this.custodies.set(custs || []);
      this.warehouses.set(whs || []);
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'حدث خطأ في تحميل البيانات');
    }
    this.loading.set(false);
  }

  // ===== Form Lines =====
  newLine(): JournalLineForm {
    return { lineType: 'debit', accountId: null, entityType: '', entityId: null,
             description: '', currencyId: 1, amount: 0, foreignAmount: null, exchangeRate: null };
  }

  openNew() {
    this.editingId.set(null);
    this.formHeader.set({ date: new Date().toISOString().split('T')[0],
      description: '', reference: '', operationTypeId: null, status: 'draft' });
    this.formLines.set([this.newLine(), this.newLine()]);
    this.error.set('');
    this.showForm.set(true);
  }

  addLine() {
    this.formLines.update(ls => [...ls, this.newLine()]);
  }

  removeLine(i: number) {
    if (this.formLines().length <= 2) return;
    this.formLines.update(ls => ls.filter((_, idx) => idx !== i));
  }

  duplicateLine(i: number) {
    const src = this.formLines()[i];
    this.formLines.update(ls => {
      const copy = [...ls];
      copy.splice(i + 1, 0, { ...src, amount: 0, foreignAmount: null });
      return copy;
    });
  }

  updateLine(i: number, field: keyof JournalLineForm, value: any) {
    this.formLines.update(ls => {
      const copy = [...ls];
      copy[i] = { ...copy[i], [field]: value };
      // عند تغيير نوع الكيان: أعد ضبط entityId
      if (field === 'entityType') copy[i].entityId = null;
      // عند تغيير العملة لعملة محلية: امسح المبالغ الأجنبية
      if (field === 'currencyId' && value === 1) {
        copy[i].foreignAmount = null;
        copy[i].exchangeRate = null;
      }
      return copy;
    });
  }

  getEntityList(entityType: string): any[] {
    switch (entityType) {
      case 'supplier':  return this.suppliers();
      case 'employee':  return this.employees();
      case 'partner':   return this.partners();
      case 'fund':      return this.funds();
      case 'custody':   return this.custodies();
      case 'warehouse': return this.warehouses();
      default: return [];
    }
  }

  getEntityLabel(entityType: string, entityId: number | null): string {
    if (!entityType || !entityId) return '—';
    const list = this.getEntityList(entityType);
    const e = list.find((x: any) => x.id === entityId);
    return e ? (e.name || e.fullName || e.fundName || String(entityId)) : String(entityId);
  }

  // ===== Save =====
  async save() {
    const h = this.formHeader();
    if (!h.operationTypeId) { this.error.set('اختر القالب / نوع العملية'); return; }
    if (!h.description)     { this.error.set('أدخل البيان العام للقيد'); return; }
    const lines = this.formLines();
    const valid = lines.filter(l => l.accountId && Number(l.amount) > 0);
    if (valid.length < 2)   { this.error.set('يجب إدخال سطرين على الأقل بحسابات ومبالغ صحيحة'); return; }
    if (!this.isBalanced())  { this.error.set('القيد غير متوازن — مجموع المدين ≠ مجموع الدائن'); return; }

    this.saving.set(true);
    this.error.set('');
    try {
      const payload = {
        description:     h.description,
        date:            h.date,
        reference:       h.reference,
        operationTypeId: h.operationTypeId,
        status:          h.status,
        lines: valid.map(l => ({
          accountId:     l.accountId,
          lineType:      l.lineType,
          amount:        l.amount,
          description:   l.description,
          entityType:    l.entityType || null,
          entityId:      l.entityId || null,
          currencyId:    l.currencyId || 1,
          foreignAmount: l.foreignAmount || null,
          exchangeRate:  l.exchangeRate || null,
        })),
      };
      if (this.editingId()) {
        await this.api.updateJournalEntry(this.bizId, this.editingId()!, payload);
        this.toast.success('تم تحديث القيد');
      } else {
        await this.api.createJournalEntry(this.bizId, payload);
        this.toast.success('تم حفظ القيد');
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'حدث خطأ');
    }
    this.saving.set(false);
  }

  async deleteEntry(id: number) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: 'هل أنت متأكد من حذف هذا القيد؟', type: 'danger' });
    if (!confirmed) return;
    try {
      await this.api.deleteJournalEntry(id);
      await this.load();
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'حدث خطأ');
    }
  }

  toggleExpand(id: number) {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  // ===== Helpers =====
  getAccountName(id: number | null): string {
    if (!id) return '—';
    return this.accounts().find((a: any) => a.id === id)?.name || '—';
  }

  getCurrencyCode(id: number): string {
    return this.currencies().find((c: any) => c.id === id)?.code || 'ر.ع';
  }

  getStatusInfo(key: string) {
    return this.statusOptions.find(s => s.key === key) || this.statusOptions[0];
  }

  formatDate(d: string): string  { return formatDateShared(d || ''); }
  fmt(amount: unknown): string   { return formatAmountShared(amount); }
  trackById(_: number, item: any){ return item.id; }
}
