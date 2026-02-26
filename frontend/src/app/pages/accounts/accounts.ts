import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class AccountsComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  biz = inject(BusinessService);

  bizId = 0;
  accounts = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  activeFilter = signal<string>('all');

  form = { name: '', accountType: 'e_wallet' as string, accountNumber: '', provider: '', responsiblePerson: '', notes: '' };

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try { this.accounts.set(await this.api.getAccounts(this.bizId)); }
    catch (e) { console.error(e); }
    this.loading.set(false);
  }

  filteredAccounts() {
    const f = this.activeFilter();
    if (f === 'all') return this.accounts();
    return this.accounts().filter(a => a.accountType === f);
  }

  getTypeLabel(t: string): string {
    const m: Record<string, string> = { e_wallet: 'محفظة إلكترونية', bank: 'بنك', exchange: 'صراف', service: 'خدمة', cash: 'نقد/خزنة', custody: 'عهدة' };
    return m[t] || t;
  }

  getTypeIcon(t: string): string {
    const m: Record<string, string> = { e_wallet: 'phone_android', bank: 'account_balance', exchange: 'currency_exchange', service: 'miscellaneous_services', cash: 'payments', custody: 'lock' };
    return m[t] || 'account_balance_wallet';
  }

  getTypeColor(t: string): string {
    const m: Record<string, string> = { e_wallet: 'blue', bank: 'green', exchange: 'amber', service: 'purple', cash: 'teal', custody: 'red' };
    return m[t] || 'blue';
  }

  openAdd() {
    this.form = { name: '', accountType: 'e_wallet', accountNumber: '', provider: '', responsiblePerson: '', notes: '' };
    this.editingId.set(null); this.showForm.set(true);
  }

  openEdit(a: any) {
    this.form = { name: a.name, accountType: a.accountType, accountNumber: a.accountNumber || '', provider: a.provider || '', responsiblePerson: a.responsiblePerson || '', notes: a.notes || '' };
    this.editingId.set(a.id); this.showForm.set(true);
  }

  async save() {
    try {
      if (this.editingId()) await this.api.updateAccount(this.editingId()!, this.form);
      else await this.api.createAccount(this.bizId, this.form);
      this.showForm.set(false); await this.load();
    } catch (e) { console.error(e); }
  }

  async remove(id: number) {
    if (confirm('هل أنت متأكد من الحذف؟')) { await this.api.deleteAccount(id); await this.load(); }
  }

  accountTypes = [
    { value: 'all', label: 'الكل' }, { value: 'e_wallet', label: 'محافظ إلكترونية' },
    { value: 'bank', label: 'بنوك' }, { value: 'exchange', label: 'صرافين' },
    { value: 'service', label: 'خدمات' }, { value: 'cash', label: 'نقد/خزائن' }, { value: 'custody', label: 'عهد' },
  ];
}
