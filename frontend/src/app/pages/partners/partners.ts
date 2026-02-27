import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partners.html',
  styleUrl: './partners.scss',
})
export class PartnersComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  biz = inject(BusinessService);

  bizId = 0;
  business = signal<any>(null);
  partners = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  showDeleteConfirm = signal(false);
  deleteTarget = signal<any>(null);

  form: any = { fullName: '', sharePercentage: 0, phone: '', role: '', notes: '' };

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try {
      const [biz, partners] = await Promise.all([
        this.api.getBusiness(this.bizId),
        this.api.getPartners(this.bizId),
      ]);
      this.business.set(biz);
      this.partners.set(partners);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  totalShares() {
    return this.partners().reduce((s, p) => s + Number(p.sharePercentage || 0), 0);
  }

  openAdd() {
    this.form = { fullName: '', sharePercentage: 0, phone: '', role: '', notes: '' };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(p: any) {
    this.form = {
      fullName: p.fullName, sharePercentage: Number(p.sharePercentage),
      phone: p.phone || '', role: p.role || '', notes: p.notes || '',
    };
    this.editingId.set(p.id);
    this.showForm.set(true);
  }

  async save() {
    try {
      const data = { ...this.form, sharePercentage: String(this.form.sharePercentage), businessId: this.bizId };
      if (this.editingId()) {
        await this.api.updatePartner(this.editingId()!, data);
      } else {
        await this.api.createPartner(this.bizId, data);
      }
      this.showForm.set(false);
      await this.load();
    } catch (e) { console.error(e); }
  }

  confirmDelete(p: any) {
    this.deleteTarget.set(p);
    this.showDeleteConfirm.set(true);
  }

  async executeDelete() {
    const t = this.deleteTarget();
    if (!t) return;
    try {
      await this.api.deletePartner(t.id);
      this.showDeleteConfirm.set(false);
      this.deleteTarget.set(null);
      await this.load();
    } catch (e) { console.error(e); }
  }

  getShareColor(pct: number): string {
    if (pct >= 50) return '#f59e0b';
    if (pct >= 25) return '#3b82f6';
    return '#22c55e';
  }
}
