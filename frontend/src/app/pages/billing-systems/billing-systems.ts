import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

interface BillingAccount {
  id: number;
  name: string;
  accountType: string;
  provider: string;
  subType: string;
  responsiblePerson: string;
  accountNumber: string;
  notes: string;
  isActive: boolean;
}

@Component({
  selector: 'app-billing-systems',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing-systems.html',
  styleUrl: './billing-systems.scss',
})
export class BillingSystemsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  biz = inject(BusinessService);

  bizId = 0;
  loading = signal(true);
  accounts = signal<BillingAccount[]>([]);
  stations = signal<any[]>([]);
  error = signal('');
  successMsg = signal('');

  // UI State
  showHowItWorks = signal(false);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  activeSystem = signal('all');
  activeStation = signal('all');
  searchQuery = signal('');

  // Form
  form = signal<any>({
    responsiblePerson: '',
    provider: '',
    subType: 'نقدي جوال',
    stationName: '',
    notes: '',
  });

  // أنظمة الفوترة المتاحة
  billingSystems = [
    { value: 'المغربي', label: 'المغربي', icon: 'receipt', color: '#3b82f6' },
    { value: 'صندوق الدعم', label: 'صندوق الدعم', icon: 'volunteer_activism', color: '#22c55e' },
    { value: 'الدفع المسبق', label: 'الدفع المسبق', icon: 'credit_card', color: '#f59e0b' },
  ];

  // حسابات مفلترة حسب النظام والمحطة والبحث
  filteredAccounts = computed(() => {
    const sys = this.activeSystem();
    const station = this.activeStation();
    const q = this.searchQuery().toLowerCase();
    return this.accounts().filter(a => {
      const matchSys = sys === 'all' || a.provider === sys;
      const matchStation = station === 'all' || (a.notes || '').includes(station);
      const matchQ = !q || a.name.toLowerCase().includes(q) || (a.responsiblePerson || '').toLowerCase().includes(q);
      return matchSys && matchStation && matchQ;
    });
  });

  // تجميع حسب النظام ثم الموظف
  groupedBySystem = computed(() => {
    const filtered = this.filteredAccounts();
    const groups: { system: string; info: any; employees: { name: string; accounts: BillingAccount[] }[] }[] = [];

    for (const sys of this.billingSystems) {
      const sysAccounts = filtered.filter(a => a.provider === sys.value);
      if (sysAccounts.length === 0) continue;

      // تجميع حسب الموظف
      const empMap = new Map<string, BillingAccount[]>();
      for (const acc of sysAccounts) {
        const emp = acc.responsiblePerson || 'غير محدد';
        if (!empMap.has(emp)) empMap.set(emp, []);
        empMap.get(emp)!.push(acc);
      }

      const employees = Array.from(empMap.entries()).map(([name, accs]) => ({
        name,
        accounts: accs.sort((a, b) => (a.subType || '').localeCompare(b.subType || '')),
      }));

      groups.push({ system: sys.value, info: sys, employees });
    }
    return groups;
  });

  // إحصائيات
  stats = computed(() => {
    const all = this.accounts();
    const bySys = this.billingSystems.map(s => ({
      ...s,
      count: all.filter(a => a.provider === s.value).length,
    }));
    const employees = new Set(all.map(a => a.responsiblePerson).filter(Boolean)).size;
    return { total: all.length, employees, bySys };
  });

  // قائمة المحطات
  stationNames = computed(() => {
    const names = new Set<string>();
    for (const s of this.stations()) {
      names.add(s.name);
    }
    // Also extract from account notes
    for (const acc of this.accounts()) {
      if (acc.notes) {
        const match = acc.notes.match(/محطة\s+(.+)/);
        if (match) names.add(match[1].trim());
      }
    }
    return Array.from(names);
  });

  async ngOnInit() {
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      await this.loadData();
    });
  }

  async loadData() {
    this.loading.set(true);
    try {
      const [allAccounts, stations] = await Promise.all([
        this.api.getAccounts(this.bizId),
        this.api.getStations(this.bizId).catch(() => []),
      ]);
      // فلترة حسابات الفوترة فقط (نوع service أو فوترة)
      const billingAccounts = allAccounts.filter((a: any) =>
        a.accountType === 'service' || a.accountType === 'billing' ||
        (a.provider && (a.provider === 'المغربي' || a.provider === 'صندوق الدعم' || a.provider === 'الدفع المسبق'))
      );
      this.accounts.set(billingAccounts);
      this.stations.set(stations);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  openCreate() {
    this.editingId.set(null);
    this.form.set({
      responsiblePerson: '',
      provider: this.activeSystem() !== 'all' ? this.activeSystem() : 'المغربي',
      subType: 'نقدي جوال',
      stationName: this.stations().length > 0 ? this.stations()[0].name : '',
      notes: '',
    });
    this.showForm.set(true);
  }

  openEdit(acc: BillingAccount) {
    this.editingId.set(acc.id);
    // Extract station name from notes
    let stationName = '';
    if (acc.notes) {
      const match = acc.notes.match(/محطة\s+(.+)/);
      if (match) stationName = match[1].trim();
    }
    this.form.set({
      responsiblePerson: acc.responsiblePerson || '',
      provider: acc.provider || 'المغربي',
      subType: acc.subType || 'نقدي جوال',
      stationName,
      notes: acc.notes || '',
    });
    this.showForm.set(true);
  }

  async saveForm() {
    const f = this.form();
    if (!f.responsiblePerson.trim()) { this.error.set('اسم الموظف مطلوب'); return; }
    if (!f.provider.trim()) { this.error.set('نظام الفوترة مطلوب'); return; }

    // بناء اسم الحساب تلقائياً
    const name = `${f.responsiblePerson} - ${f.provider} ${f.subType}`.trim();

    const accountData: any = {
      name,
      accountType: 'service',
      provider: f.provider,
      subType: f.subType,
      responsiblePerson: f.responsiblePerson,
      notes: f.stationName ? `محطة ${f.stationName}` : (f.notes || ''),
      isActive: true,
    };

    try {
      if (this.editingId()) {
        await this.api.updateAccount(this.editingId()!, accountData);
        this.successMsg.set('تم تحديث الحساب بنجاح');
      } else {
        await this.api.createAccount(this.bizId, accountData);
        this.successMsg.set('تم إنشاء حساب الفوترة بنجاح - سيظهر تلقائياً في صفحة الحسابات');
      }
      this.showForm.set(false);
      await this.loadData();
      setTimeout(() => this.successMsg.set(''), 4000);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async toggleActive(acc: BillingAccount) {
    try {
      await this.api.updateAccount(acc.id, { isActive: !acc.isActive });
      await this.loadData();
      this.successMsg.set(acc.isActive ? 'تم إيقاف الحساب' : 'تم تفعيل الحساب');
      setTimeout(() => this.successMsg.set(''), 3000);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async deleteAccount(acc: BillingAccount) {
    if (!confirm(`هل تريد حذف حساب "${acc.name}"؟`)) return;
    try {
      await this.api.deleteAccount(acc.id);
      await this.loadData();
      this.successMsg.set('تم حذف الحساب');
      setTimeout(() => this.successMsg.set(''), 3000);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  setFormField(field: string, value: any) {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  getSystemInfo(provider: string) {
    return this.billingSystems.find(s => s.value === provider) || { value: provider, label: provider, icon: 'receipt', color: '#64748b' };
  }

  trackById(_: number, item: any) { return item.id; }
}
