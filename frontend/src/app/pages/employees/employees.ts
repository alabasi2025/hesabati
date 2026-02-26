import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
})
export class EmployeesComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  biz = inject(BusinessService);

  bizId = 0;
  employees = signal<any[]>([]);
  stations = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  filterStation = signal<string>('all');

  form: any = { fullName: '', jobTitle: '', stationId: null, department: '', salary: 0, salaryCurrency: 'YER', phone: '', status: 'active', notes: '' };

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try {
      const [emps, sts] = await Promise.all([this.api.getEmployees(this.bizId), this.api.getStations(this.bizId)]);
      this.employees.set(emps); this.stations.set(sts);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  filteredEmployees() {
    const f = this.filterStation();
    if (f === 'all') return this.employees();
    return this.employees().filter(e => String(e.stationId) === f || (!e.stationId && f === 'admin'));
  }

  totalSalaries() { return this.filteredEmployees().reduce((s, e) => s + Number(e.salary || 0), 0); }

  openAdd() {
    this.form = { fullName: '', jobTitle: '', stationId: null, department: '', salary: 0, salaryCurrency: 'YER', phone: '', status: 'active', notes: '' };
    this.editingId.set(null); this.showForm.set(true);
  }

  openEdit(emp: any) {
    this.form = { fullName: emp.fullName, jobTitle: emp.jobTitle || '', stationId: emp.stationId, department: emp.department || '', salary: Number(emp.salary), salaryCurrency: emp.salaryCurrency || 'YER', phone: emp.phone || '', status: emp.status, notes: emp.notes || '' };
    this.editingId.set(emp.id); this.showForm.set(true);
  }

  async save() {
    try {
      const data = { ...this.form, salary: String(this.form.salary) };
      if (this.editingId()) await this.api.updateEmployee(this.editingId()!, data);
      else await this.api.createEmployee(this.bizId, data);
      this.showForm.set(false); await this.load();
    } catch (e) { console.error(e); }
  }

  async remove(id: number) {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) { await this.api.deleteEmployee(id); await this.load(); }
  }

  getStatusLabel(s: string) { return s === 'active' ? 'نشط' : s === 'suspended' ? 'موقوف' : 'غير نشط'; }
  getStatusClass(s: string) { return s === 'active' ? 'active' : 'inactive'; }
}
