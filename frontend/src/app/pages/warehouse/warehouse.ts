import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './warehouse.html',
  styleUrl: './warehouse.scss',
})
export class WarehouseComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  biz = inject(BusinessService);

  bizId = 0;
  warehouses = signal<any[]>([]);
  stations = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  filterType = signal<string>('all');

  form: any = { name: '', warehouseType: 'main', stationId: null, responsiblePerson: '', location: '', notes: '' };

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try {
      const [wh, sts] = await Promise.all([
        this.api.getWarehouses(this.bizId),
        this.api.getStations(this.bizId),
      ]);
      this.warehouses.set(wh);
      this.stations.set(sts);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  filteredWarehouses() {
    const f = this.filterType();
    if (f === 'all') return this.warehouses();
    return this.warehouses().filter(w => w.warehouseType === f);
  }

  mainCount() { return this.warehouses().filter(w => w.warehouseType === 'main').length; }
  stationCount() { return this.warehouses().filter(w => w.warehouseType === 'station').length; }

  getStationName(stationId: number | null): string {
    if (!stationId) return '-';
    const st = this.stations().find(s => s.id === stationId);
    return st ? st.name : '-';
  }

  openAdd() {
    this.form = { name: '', warehouseType: 'main', stationId: null, responsiblePerson: '', location: '', notes: '' };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(w: any) {
    this.form = {
      name: w.name, warehouseType: w.warehouseType, stationId: w.stationId,
      responsiblePerson: w.responsiblePerson || '', location: w.location || '', notes: w.notes || '',
    };
    this.editingId.set(w.id);
    this.showForm.set(true);
  }

  async save() {
    try {
      if (this.editingId()) {
        await this.api.updateWarehouse(this.editingId()!, this.form);
      } else {
        await this.api.createWarehouse(this.bizId, this.form);
      }
      this.showForm.set(false);
      await this.load();
    } catch (e) { console.error(e); }
  }

  async remove(w: any) {
    if (confirm(`هل أنت متأكد من حذف المخزن "${w.name}"؟`)) {
      try {
        await this.api.deleteWarehouse(w.id);
        await this.load();
      } catch (e) { console.error(e); }
    }
  }

  getTypeLabel(t: string): string { return t === 'main' ? 'رئيسي' : 'محطة'; }
  getTypeClass(t: string): string { return t === 'main' ? 'active' : 'partner'; }
}
