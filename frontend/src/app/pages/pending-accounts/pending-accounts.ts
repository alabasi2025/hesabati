import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-pending-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pending-accounts.html',
  styleUrl: './pending-accounts.scss',
})
export class PendingAccountsComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  biz = inject(BusinessService);
  private toast = inject(ToastService);

  bizId = 0;
  items = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  filterStatus = signal<string>('all');

  form: any = { personOrEntity: '', description: '', status: 'pending', estimatedAmount: 0, notes: '' };

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getPendingAccounts(this.bizId);
      this.items.set(data);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  filteredItems() {
    const f = this.filterStatus();
    if (f === 'all') return this.items();
    return this.items().filter(i => i.status === f);
  }

  totalAmount() { return this.filteredItems().reduce((s, i) => s + Number(i.estimatedAmount || 0), 0); }
  pendingCount() { return this.items().filter(i => i.status === 'pending').length; }
  resolvedCount() { return this.items().filter(i => i.status === 'resolved').length; }

  openAdd() {
    this.form = { personOrEntity: '', description: '', status: 'pending', estimatedAmount: 0, notes: '' };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(item: any) {
    this.form = {
      personOrEntity: item.personOrEntity, description: item.description || '',
      status: item.status, estimatedAmount: Number(item.estimatedAmount || 0), notes: item.notes || '',
    };
    this.editingId.set(item.id);
    this.showForm.set(true);
  }

  async save() {
    try {
      const data = { ...this.form, estimatedAmount: String(this.form.estimatedAmount) };
      if (this.editingId()) {
        await this.api.updatePendingAccount(this.editingId()!, data);
      } else {
        await this.api.createPendingAccount(this.bizId, data);
      }
      this.showForm.set(false);
      await this.load();
    } catch (e) { console.error(e); }
  }

  async remove(item: any) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: `هل أنت متأكد من حذف "${item.personOrEntity}"؟`, type: 'danger' });
    if (confirmed) {
      try {
        await this.api.deletePendingAccount(item.id);
        await this.load();
      } catch (e) { console.error(e); }
    }
  }

  getStatusLabel(s: string): string {
    const map: Record<string, string> = { pending: 'معلق', in_progress: 'قيد المعالجة', resolved: 'تم الحل', written_off: 'شُطب' };
    return map[s] || s;
  }
  getStatusClass(s: string): string {
    const map: Record<string, string> = { pending: 'pending', in_progress: 'progress', resolved: 'resolved', written_off: 'written-off' };
    return map[s] || '';
  }
}
