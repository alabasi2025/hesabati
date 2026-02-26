import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funds.html',
  styleUrl: './funds.scss',
})
export class FundsComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  biz = inject(BusinessService);

  bizId = 0;
  funds = signal<any[]>([]);
  stations = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  activeFilter = signal<string>('all');

  form: any = { name: '', fundType: 'collection', stationId: null, responsiblePerson: '', description: '', notes: '' };

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try {
      const [fds, sts] = await Promise.all([this.api.getFunds(this.bizId), this.api.getStations(this.bizId)]);
      this.funds.set(fds); this.stations.set(sts);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  filteredFunds() {
    const f = this.activeFilter();
    if (f === 'all') return this.funds();
    return this.funds().filter(fd => fd.fundType === f);
  }

  getTypeLabel(t: string): string {
    const m: Record<string, string> = { collection: 'تحصيل وتوريد', salary_advance: 'سلف موظفين', custody: 'عهدة', safe: 'خزنة', expense: 'خرج', deposit: 'توريدات' };
    return m[t] || t;
  }
  getTypeIcon(t: string): string {
    const m: Record<string, string> = { collection: 'receipt_long', salary_advance: 'request_quote', custody: 'lock', safe: 'savings', expense: 'shopping_cart', deposit: 'move_to_inbox' };
    return m[t] || 'inventory_2';
  }
  getTypeColor(t: string): string {
    const m: Record<string, string> = { collection: 'blue', salary_advance: 'amber', custody: 'purple', safe: 'green', expense: 'red', deposit: 'teal' };
    return m[t] || 'blue';
  }

  openAdd() {
    this.form = { name: '', fundType: 'collection', stationId: null, responsiblePerson: '', description: '', notes: '' };
    this.editingId.set(null); this.showForm.set(true);
  }
  openEdit(f: any) {
    this.form = { name: f.name, fundType: f.fundType, stationId: f.stationId, responsiblePerson: f.responsiblePerson || '', description: f.description || '', notes: f.notes || '' };
    this.editingId.set(f.id); this.showForm.set(true);
  }
  async save() {
    try {
      if (this.editingId()) await this.api.updateFund(this.editingId()!, this.form);
      else await this.api.createFund(this.bizId, this.form);
      this.showForm.set(false); await this.load();
    } catch (e) { console.error(e); }
  }

  fundTypes = [
    { value: 'all', label: 'الكل' }, { value: 'collection', label: 'تحصيل وتوريد' },
    { value: 'salary_advance', label: 'سلف موظفين' }, { value: 'custody', label: 'عهدة' },
    { value: 'safe', label: 'خزنة' }, { value: 'expense', label: 'خرج' }, { value: 'deposit', label: 'توريدات' },
  ];
}
