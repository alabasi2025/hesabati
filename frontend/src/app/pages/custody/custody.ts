import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-custody',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custody.html',
  styleUrl: './custody.scss',
})
export class CustodyComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  records = signal<any[]>([]);
  custodyAccounts = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  activeTab = signal<'permanent' | 'temporary'>('permanent');
  viewingRecord = signal<any | null>(null);
  settlements = signal<any[]>([]);
  showSettleForm = signal(false);

  form: any = {
    custodyType: 'permanent', contentType: 'cash', partyName: '', partyType: 'employee',
    employeeId: null, description: '', amount: 0,
  };

  settleForm: any = { amount: 0, notes: '', settledAt: '' };

  partyTypes = [
    { key: 'employee', label: 'موظف' },
    { key: 'supplier', label: 'مورد' },
    { key: 'external', label: 'طرف خارجي' },
  ];

  contentTypes = [
    { key: 'cash', label: 'نقدية' },
    { key: 'material', label: 'عينية' },
    { key: 'mixed', label: 'مختلطة' },
  ];

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  get filteredRecords(): any[] {
    return this.records().filter(r => r.custodyType === this.activeTab());
  }

  switchTab(tab: 'permanent' | 'temporary') {
    this.activeTab.set(tab);
  }

  async load() {
    this.loading.set(true);
    try {
      const [custodyRecordsData, accountsData] = await Promise.all([
        this.api.getCustodyRecords(this.bizId),
        this.api.getAccounts(this.bizId),
      ]);
      this.records.set(custodyRecordsData || []);
      
      // معالجة البيانات - قد تكون array أو object
      let accountsList: any[] = [];
      if (Array.isArray(accountsData)) {
        accountsList = accountsData;
      } else if (accountsData && typeof accountsData === 'object' && Array.isArray(accountsData.accounts)) {
        accountsList = accountsData.accounts;
      }
      
      // فلترة الحسابات من نوع عهدة
      const custodyAccs = accountsList.filter((a: any) => 
        a.accountType === 'custody' || a.account_type === 'custody'
      );
      this.custodyAccounts.set(custodyAccs);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  openAdd() {
    this.form = {
      custodyType: this.activeTab(), contentType: 'cash', partyName: '', partyType: 'employee',
      employeeId: null, description: '', amount: 0,
    };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(c: any) {
    this.form = {
      custodyType: c.custodyType || 'permanent', contentType: c.contentType || 'cash',
      partyName: c.partyName || '', partyType: c.partyType || 'employee',
      employeeId: c.employeeId, description: c.description || '', amount: c.amount || 0,
    };
    this.editingId.set(c.id);
    this.showForm.set(true);
  }

  async save() {
    if (!this.form.partyName?.trim()) {
      this.toast.error('يرجى إدخال اسم الطرف');
      return;
    }
    try {
      if (this.editingId()) {
        await this.api.updateCustodyRecord(this.bizId, this.editingId()!, this.form);
        this.toast.success('تم تعديل سجل العهدة بنجاح');
      } else {
        await this.api.createCustodyRecord(this.bizId, this.form);
        this.toast.success('تم إنشاء سجل العهدة بنجاح');
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
    }
  }

  async remove(c: any) {
    const confirmed = await this.toast.confirm({
      title: 'تأكيد الحذف',
      message: `هل أنت متأكد من حذف عهدة "${c.partyName}"؟`,
      type: 'danger',
    });
    if (confirmed) {
      try {
        await this.api.deleteCustodyRecord(this.bizId, c.id);
        this.toast.success('تم حذف سجل العهدة');
        await this.load();
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
      }
    }
  }

  async viewDetails(c: any) {
    this.viewingRecord.set(c);
    try {
      const detail = await this.api.getCustodyRecord(this.bizId, c.id);
      this.settlements.set(detail.settlements || []);
    } catch { this.settlements.set([]); }
  }

  openSettle() {
    this.settleForm = { amount: 0, notes: '', settledAt: new Date().toISOString().split('T')[0] };
    this.showSettleForm.set(true);
  }

  async submitSettle() {
    if (!this.settleForm.amount || this.settleForm.amount <= 0) {
      this.toast.error('يرجى إدخال مبلغ التسوية');
      return;
    }
    try {
      await this.api.addCustodySettlement(this.bizId, this.viewingRecord().id, this.settleForm);
      this.toast.success('تم إضافة التسوية بنجاح');
      this.showSettleForm.set(false);
      await this.viewDetails(this.viewingRecord());
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
    }
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      active: 'نشطة', partially_settled: 'مسوّاة جزئياً',
      settled: 'مسوّاة', cancelled: 'ملغاة',
    };
    return map[status] || status;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      active: 'st-active', partially_settled: 'st-partial',
      settled: 'st-settled', cancelled: 'st-cancelled',
    };
    return map[status] || '';
  }

  getPartyTypeLabel(type: string): string {
    return this.partyTypes.find(t => t.key === type)?.label || type;
  }

  getContentTypeLabel(type: string): string {
    return this.contentTypes.find(t => t.key === type)?.label || type;
  }
}
