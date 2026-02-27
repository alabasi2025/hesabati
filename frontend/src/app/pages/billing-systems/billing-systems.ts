import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

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

  bizId = 0;
  loading = signal(true);
  error = signal('');
  successMsg = signal('');

  // ===== البيانات =====
  billingAccounts = signal<any[]>([]);   // حسابات الفوترة من accounts
  billingSystems = signal<any[]>([]);    // أنظمة الفوترة من billing_systems_config
  accountTypes = signal<any[]>([]);      // أنواع حسابات الفوترة من billing_account_types
  stations = signal<any[]>([]);          // المحطات

  // ===== حالة الواجهة =====
  activeTab = signal<'accounts' | 'systems' | 'types'>('accounts');
  activeSystem = signal('all');
  activeStation = signal('all');
  searchQuery = signal('');
  showHowItWorks = signal(false);

  // ===== نموذج إضافة حساب فوترة =====
  showAccountForm = signal(false);
  editingAccountId = signal<number | null>(null);
  accountForm = signal<any>({
    responsiblePerson: '',
    provider: '',
    subType: '',
    stationId: '',
    notes: '',
  });

  // ===== wizard إضافة نظام فوترة جديد =====
  showSystemWizard = signal(false);
  wizardStep = signal(1); // 1: الاسم، 2: المحطات، 3: أنواع الحسابات
  systemForm = signal<any>({
    name: '',
    color: '#3b82f6',
    icon: 'receipt',
    stationScope: 'per_station', // per_station | multi_station
    stationIds: [] as number[],
    supportedTypes: [] as string[],
  });

  // ===== نموذج إضافة نوع حساب =====
  showTypeForm = signal(false);
  editingTypeId = signal<number | null>(null);
  typeForm = signal<any>({ name: '', description: '' });

  // ===== حسابات مفلترة =====
  filteredAccounts = computed(() => {
    const sys = this.activeSystem();
    const station = this.activeStation();
    const q = this.searchQuery().toLowerCase();
    return this.billingAccounts().filter(a => {
      const matchSys = sys === 'all' || a.provider === sys;
      const matchStation = station === 'all' || (a.notes || '').includes(station);
      const matchQ = !q || a.name.toLowerCase().includes(q) ||
        (a.responsiblePerson || '').toLowerCase().includes(q);
      return matchSys && matchStation && matchQ;
    });
  });

  // ===== تجميع حسب النظام ثم الموظف =====
  groupedBySystem = computed(() => {
    const filtered = this.filteredAccounts();
    const systems = this.billingSystems();
    const groups: any[] = [];

    for (const sys of systems) {
      const sysAccounts = filtered.filter(a => a.provider === sys.name);
      if (sysAccounts.length === 0) continue;

      const empMap = new Map<string, any[]>();
      for (const acc of sysAccounts) {
        const emp = acc.responsiblePerson || 'غير محدد';
        if (!empMap.has(emp)) empMap.set(emp, []);
        empMap.get(emp)!.push(acc);
      }

      const employees = Array.from(empMap.entries()).map(([name, accs]) => ({
        name,
        accounts: accs.sort((a: any, b: any) => (a.subType || '').localeCompare(b.subType || '', 'ar')),
      }));

      groups.push({ system: sys.name, info: sys, employees });
    }
    return groups;
  });

  // ===== إحصائيات =====
  stats = computed(() => {
    const all = this.billingAccounts();
    const systems = this.billingSystems();
    const bySys = systems.map(s => ({
      ...s,
      count: all.filter(a => a.provider === s.name).length,
    }));
    const employees = new Set(all.map((a: any) => a.responsiblePerson).filter(Boolean)).size;
    return { total: all.length, employees, bySys };
  });

  // ===== قائمة المحطات المتاحة =====
  stationNames = computed(() => this.stations().map(s => s.name));

  // ===== أيقونات متاحة للنظام =====
  availableIcons = [
    'receipt', 'credit_card', 'volunteer_activism', 'payments', 'account_balance',
    'savings', 'currency_exchange', 'monetization_on', 'attach_money', 'wallet',
  ];

  availableColors = [
    '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
    '#14b8a6', '#f97316', '#ec4899', '#06b6d4', '#84cc16',
  ];

  async ngOnInit() {
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      await this.loadAll();
    });
  }

  async loadAll() {
    this.loading.set(true);
    try {
      const [allAccounts, systems, types, stations] = await Promise.all([
        this.api.getAccounts(this.bizId),
        this.api.getBillingSystemsConfig(this.bizId).catch(() => []),
        this.api.getBillingAccountTypes(this.bizId).catch(() => []),
        this.api.getStations(this.bizId).catch(() => []),
      ]);
      const billingAccounts = allAccounts.filter((a: any) => a.accountType === 'billing');
      this.billingAccounts.set(billingAccounts);
      this.billingSystems.set(systems);
      this.accountTypes.set(types);
      this.stations.set(stations);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  // ===== إدارة حسابات الفوترة =====
  openCreateAccount() {
    this.editingAccountId.set(null);
    this.accountForm.set({
      responsiblePerson: '',
      provider: this.activeSystem() !== 'all' ? this.activeSystem() : (this.billingSystems()[0]?.name || ''),
      subType: this.accountTypes()[0]?.name || '',
      stationId: this.stations()[0]?.id || '',
      notes: '',
    });
    this.showAccountForm.set(true);
  }

  openEditAccount(acc: any) {
    this.editingAccountId.set(acc.id);
    let stationId = '';
    if (acc.notes) {
      const match = acc.notes.match(/station_id:(\d+)/);
      if (match) stationId = match[1];
    }
    this.accountForm.set({
      responsiblePerson: acc.responsiblePerson || '',
      provider: acc.provider || '',
      subType: acc.subType || '',
      stationId,
      notes: acc.notes || '',
    });
    this.showAccountForm.set(true);
  }

  async saveAccountForm() {
    const f = this.accountForm();
    if (!f.responsiblePerson.trim()) { this.error.set('اسم الموظف مطلوب'); return; }
    if (!f.provider.trim()) { this.error.set('نظام الفوترة مطلوب'); return; }
    if (!f.subType.trim()) { this.error.set('نوع الحساب مطلوب'); return; }

    const stationName = this.stations().find((s: any) => s.id == f.stationId)?.name || '';
    const name = `${f.responsiblePerson} - ${f.provider} ${f.subType}`.trim();
    const notesValue = f.stationId ? `station_id:${f.stationId} محطة ${stationName}` : (f.notes || '');

    const accountData: any = {
      name,
      accountType: 'billing',
      provider: f.provider,
      subType: f.subType,
      responsiblePerson: f.responsiblePerson,
      notes: notesValue,
      isActive: true,
    };

    try {
      if (this.editingAccountId()) {
        await this.api.updateAccount(this.editingAccountId()!, accountData);
        this.successMsg.set('تم تحديث حساب الفوترة');
      } else {
        await this.api.createAccount(this.bizId, accountData);
        this.successMsg.set('تم إنشاء حساب الفوترة - يظهر تلقائياً في صفحة الحسابات');
      }
      this.showAccountForm.set(false);
      await this.loadAll();
      setTimeout(() => this.successMsg.set(''), 4000);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async toggleAccountActive(acc: any) {
    try {
      await this.api.updateAccount(acc.id, { isActive: !acc.isActive });
      await this.loadAll();
      this.successMsg.set(acc.isActive ? 'تم إيقاف الحساب' : 'تم تفعيل الحساب');
      setTimeout(() => this.successMsg.set(''), 3000);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async deleteAccount(acc: any) {
    if (!confirm(`هل تريد حذف حساب "${acc.name}"؟`)) return;
    try {
      await this.api.deleteAccount(acc.id);
      await this.loadAll();
      this.successMsg.set('تم حذف الحساب');
      setTimeout(() => this.successMsg.set(''), 3000);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  // ===== wizard إضافة نظام فوترة =====
  openSystemWizard() {
    this.wizardStep.set(1);
    this.systemForm.set({
      name: '',
      color: '#3b82f6',
      icon: 'receipt',
      stationScope: 'per_station',
      stationIds: [],
      supportedTypes: this.accountTypes().map((t: any) => t.name),
    });
    this.showSystemWizard.set(true);
  }

  wizardNext() {
    const step = this.wizardStep();
    const f = this.systemForm();
    if (step === 1 && !f.name.trim()) { this.error.set('اسم النظام مطلوب'); return; }
    this.error.set('');
    this.wizardStep.set(step + 1);
  }

  wizardBack() {
    this.wizardStep.set(this.wizardStep() - 1);
  }

  toggleWizardStation(stationId: number) {
    this.systemForm.update(f => {
      const ids: number[] = [...f.stationIds];
      const idx = ids.indexOf(stationId);
      if (idx >= 0) ids.splice(idx, 1);
      else ids.push(stationId);
      return { ...f, stationIds: ids };
    });
  }

  toggleWizardType(typeName: string) {
    this.systemForm.update(f => {
      const types: string[] = [...f.supportedTypes];
      const idx = types.indexOf(typeName);
      if (idx >= 0) types.splice(idx, 1);
      else types.push(typeName);
      return { ...f, supportedTypes: types };
    });
  }

  async saveSystemWizard() {
    const f = this.systemForm();
    if (!f.name.trim()) { this.error.set('اسم النظام مطلوب'); return; }
    if (f.supportedTypes.length === 0) { this.error.set('اختر نوع حساب واحد على الأقل'); return; }

    try {
      await this.api.createBillingSystemConfig(this.bizId, {
        name: f.name,
        color: f.color,
        icon: f.icon,
        stationScope: f.stationScope,
        stationIds: f.stationIds,
        supportedTypes: f.supportedTypes,
      });
      this.showSystemWizard.set(false);
      await this.loadAll();
      this.successMsg.set(`تم إضافة نظام "${f.name}" بنجاح`);
      setTimeout(() => this.successMsg.set(''), 4000);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async deleteSystem(sys: any) {
    if (!confirm(`هل تريد حذف نظام "${sys.name}"؟`)) return;
    try {
      await this.api.deleteBillingSystemConfig(sys.id);
      await this.loadAll();
      this.successMsg.set('تم حذف النظام');
      setTimeout(() => this.successMsg.set(''), 3000);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  // ===== إدارة أنواع الحسابات =====
  openCreateType() {
    this.editingTypeId.set(null);
    this.typeForm.set({ name: '', description: '' });
    this.showTypeForm.set(true);
  }

  openEditType(type: any) {
    this.editingTypeId.set(type.id);
    this.typeForm.set({ name: type.name, description: type.description || '' });
    this.showTypeForm.set(true);
  }

  async saveTypeForm() {
    const f = this.typeForm();
    if (!f.name.trim()) { this.error.set('اسم النوع مطلوب'); return; }
    try {
      if (this.editingTypeId()) {
        await this.api.updateBillingAccountType(this.editingTypeId()!, f);
        this.successMsg.set('تم تحديث نوع الحساب');
      } else {
        await this.api.createBillingAccountType(this.bizId, f);
        this.successMsg.set('تم إضافة نوع الحساب الجديد');
      }
      this.showTypeForm.set(false);
      await this.loadAll();
      setTimeout(() => this.successMsg.set(''), 3000);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  async deleteType(type: any) {
    if (!confirm(`هل تريد حذف نوع "${type.name}"؟`)) return;
    try {
      await this.api.deleteBillingAccountType(type.id);
      await this.loadAll();
      this.successMsg.set('تم حذف النوع');
      setTimeout(() => this.successMsg.set(''), 3000);
    } catch (e: any) {
      this.error.set(e.message);
    }
  }

  setFormField(form: 'account' | 'type', field: string, value: any) {
    if (form === 'account') this.accountForm.update(f => ({ ...f, [field]: value }));
    else this.typeForm.update(f => ({ ...f, [field]: value }));
  }

  setSystemFormField(field: string, value: any) {
    this.systemForm.update(f => ({ ...f, [field]: value }));
  }

  getSystemInfo(name: string) {
    return this.billingSystems().find(s => s.name === name) ||
      { name, color: '#64748b', icon: 'receipt' };
  }

  getSysCount(sysName: string): number {
    return this.billingAccounts().filter((a: any) => a.provider === sysName).length;
  }

  trackById(_: number, item: any) { return item.id; }
  trackByName(_: number, item: any) { return item.name; }
}
