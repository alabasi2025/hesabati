import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, Business } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { BusinessService, BusinessType } from '../../services/business.service';

@Component({
  selector: 'app-business-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './business-select.html',
  styleUrl: './business-select.scss',
})
export class BusinessSelectComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  private readonly bizService = inject(BusinessService);
  readonly theme = inject(ThemeService);

  businesses = signal<Business[]>([]);
  loading = signal(true);
  loadError = signal('');
  noAccessMessage = signal('');
  userName = signal('');

  showAddModal = signal(false);
  saving = signal(false);
  saveError = signal('');
  nextCode = signal('');
  newBiz = signal({
    name: '',
    type: 'stations',
    description: '',
    icon: 'business',
    color: '#3b82f6',
  });

  showEditModal = signal(false);
  editingBiz = signal<{
    id: number;
    code: string;
    name: string;
    type: string;
    description: string;
    icon: string;
    color: string;
  } | null>(null);
  editError = signal('');

  showDeleteConfirm = signal(false);
  deletingBiz = signal<{ id: number; name: string; code: string } | null>(null);
  deleting = signal(false);
  deleteError = signal('');

  readonly bizTypes = [
    { value: 'stations', label: 'محطات' },
    { value: 'single_station', label: 'محطة واحدة' },
    { value: 'personal', label: 'شخصي' },
  ];

  readonly iconOptions = [
    'business',
    'store',
    'local_gas_station',
    'warehouse',
    'factory',
    'storefront',
    'apartment',
    'corporate_fare',
    'domain',
    'work',
  ];

  ngOnInit() {
    this.userName.set(this.auth.getUserName() || 'المالك');
    this.noAccessMessage.set(
      this.route.snapshot.queryParamMap.get('error') === 'no_access'
        ? 'ليس لديك صلاحية على العمل المحدد. يرجى اختيار عمل آخر أو التواصل مع المسؤول.'
        : '',
    );
    this.loadBusinesses();
  }

  async loadBusinesses() {
    this.loadError.set('');
    if (!this.auth.isLoggedIn()) {
      this.loading.set(false);
      this.loadError.set('لم يتم تسجيل الدخول. جاري التوجيه...');
      setTimeout(() => this.auth.logout(), 800);
      return;
    }
    try {
      const data = await this.api.getBusinesses();
      this.businesses.set(Array.isArray(data) ? data : []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'فشل تحميل قائمة الأعمال';
      this.loadError.set(msg);
      this.businesses.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  enterBusiness(biz: Business) {
    const type: BusinessType = (biz.type as BusinessType) || 'stations';
    this.bizService.setBusiness(biz.id, biz.name, biz.color, biz.icon, type);
    this.router.navigate(['/biz', biz.id]);
  }

  toggleTheme() {
    this.theme.toggle();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  openEditModal(biz: any, event: Event) {
    event.stopPropagation();
    this.editingBiz.set({
      id: biz.id,
      code: biz.code,
      name: biz.name,
      type: biz.type,
      description: biz.description || '',
      icon: biz.icon,
      color: biz.color,
    });
    this.editError.set('');
    this.showEditModal.set(true);
  }

  closeEditModal() {
    this.showEditModal.set(false);
  }

  updateEditBiz(field: string, value: string) {
    this.editingBiz.update((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  async submitEditBusiness() {
    const biz = this.editingBiz();
    if (!biz) return;
    if (!biz.name.trim()) {
      this.editError.set('اسم العمل مطلوب');
      return;
    }
    this.saving.set(true);
    this.editError.set('');
    try {
      const updated = await this.api.updateBusiness(biz.id, biz);
      this.businesses.update((prev) =>
        prev.map((b) => (b.id === biz.id ? { ...b, ...updated } : b)),
      );
      this.showEditModal.set(false);
    } catch (e: unknown) {
      this.editError.set(e instanceof Error ? e.message : 'فشل تعديل العمل');
    } finally {
      this.saving.set(false);
    }
  }

  isEmptyBusiness(biz: any): boolean {
    const s = biz.stats;
    return (
      !s ||
      (s.stations === 0 &&
        s.employees === 0 &&
        s.accounts === 0 &&
        s.funds === 0 &&
        s.suppliers === 0)
    );
  }

  openDeleteConfirm(biz: any, event: Event) {
    event.stopPropagation();
    this.deletingBiz.set({ id: biz.id, name: biz.name, code: biz.code });
    this.deleteError.set('');
    this.showDeleteConfirm.set(true);
  }

  closeDeleteConfirm() {
    this.showDeleteConfirm.set(false);
  }

  async confirmDelete() {
    const biz = this.deletingBiz();
    if (!biz) return;
    this.deleting.set(true);
    this.deleteError.set('');
    try {
      await this.api.deleteBusiness(biz.id);
      this.businesses.update((prev) => prev.filter((b) => b.id !== biz.id));
      this.showDeleteConfirm.set(false);
    } catch (e: unknown) {
      this.deleteError.set(e instanceof Error ? e.message : 'فشل حذف العمل');
    } finally {
      this.deleting.set(false);
    }
  }

  async openAddModal() {
    this.newBiz.set({
      name: '',
      type: 'stations',
      description: '',
      icon: 'business',
      color: '#3b82f6',
    });
    this.saveError.set('');
    this.nextCode.set('جاري التحميل...');
    this.showAddModal.set(true);
    try {
      const res = await this.api.request<{ next: number; code: string }>('/businesses/next-code');
      this.nextCode.set(res.code);
    } catch {
      this.nextCode.set('biz-??');
    }
  }

  closeAddModal() {
    this.showAddModal.set(false);
  }

  updateNewBiz(field: string, value: string) {
    this.newBiz.update((prev) => ({ ...prev, [field]: value }));
  }

  autoFillCode() {
    // الكود يُولَّد تلقائياً من المحرك
  }

  async submitAddBusiness() {
    const biz = this.newBiz();
    if (!biz.name.trim()) {
      this.saveError.set('اسم العمل مطلوب');
      return;
    }
    this.saving.set(true);
    this.saveError.set('');
    try {
      const created = await this.api.createBusiness(biz);
      this.businesses.update((prev) => [...prev, created]);
      this.showAddModal.set(false);
    } catch (e: unknown) {
      this.saveError.set(e instanceof Error ? e.message : 'فشل إنشاء العمل');
    } finally {
      this.saving.set(false);
    }
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'مساء الخير';
    return 'مساء الخير';
  }
}
