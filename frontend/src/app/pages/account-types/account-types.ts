import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';

interface MainAccountType {
  key: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  isSystem: boolean;
  subTypes: SubType[];
}

interface SubType {
  id: number;
  name: string;
  subTypeKey: string;
  description: string;
  icon: string;
  color: string;
  sequenceNumber: number;
  sortOrder: number;
  isActive: boolean;
}

@Component({
  selector: 'app-account-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-types.html',
  styleUrl: './account-types.scss',
})
export class AccountTypesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  loading = signal(true);
  error = signal('');

  // البيانات
  fundTypes = signal<SubType[]>([]);
  bankTypes = signal<SubType[]>([]);
  exchangeTypes = signal<SubType[]>([]);
  eWalletTypes = signal<SubType[]>([]);
  warehouseTypes = signal<SubType[]>([]);

  // UI State
  expandedTypes = signal<Set<string>>(new Set(['fund', 'bank', 'exchange', 'e_wallet']));
  showSubTypeForm = signal(false);
  editingSubType = signal<SubType | null>(null);
  activeMainType = signal<string>('');

  subTypeForm = signal({
    name: '',
    subTypeKey: '',
    description: '',
    icon: 'category',
    color: '#4CAF50',
    sequenceNumber: 0,
  });

  // أيقونات متاحة
  iconOptions = [
    'savings', 'account_balance_wallet', 'receipt_long', 'payments', 'lock',
    'person', 'inventory_2', 'request_quote', 'shopping_cart', 'move_to_inbox',
    'attach_money', 'monetization_on', 'credit_card', 'toll', 'local_atm',
    'account_balance', 'currency_exchange', 'swap_horiz', 'sync_alt', 'compare_arrows',
    'wallet', 'phone_android', 'smartphone', 'qr_code', 'contactless',
    'warehouse', 'inventory', 'category', 'label', 'folder',
  ];

  colorOptions = [
    '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63',
    '#00BCD4', '#607D8B', '#795548', '#F44336', '#3F51B5',
    '#009688', '#FFEB3B', '#FF5722', '#8BC34A', '#673AB7',
  ];

  // الأنواع الرئيسية للحسابات (حسب الخطة النهائية)
  mainAccountTypes = computed<MainAccountType[]>(() => {
    const types: MainAccountType[] = [
      // === مصادر الأموال ===
      {
        key: 'fund',
        label: 'الصناديق',
        icon: 'savings',
        color: '#4CAF50',
        description: 'صناديق التحصيل والتوريد، السلف، العهدات، الخزنات',
        isSystem: true,
        subTypes: this.fundTypes(),
      },
      {
        key: 'bank',
        label: 'البنوك',
        icon: 'account_balance',
        color: '#2196F3',
        description: 'حسابات البنوك (توفير، جاري، استثماري)',
        isSystem: true,
        subTypes: this.bankTypes(),
      },
      {
        key: 'e_wallet',
        label: 'المحافظ الإلكترونية',
        icon: 'account_balance_wallet',
        color: '#9C27B0',
        description: 'جوالي، جيب، ون كاش، وغيرها',
        isSystem: true,
        subTypes: this.eWalletTypes(),
      },
      {
        key: 'exchange',
        label: 'الصرافين',
        icon: 'currency_exchange',
        color: '#FF9800',
        description: 'حسابات الصرافين ومحلات الصرافة',
        isSystem: true,
        subTypes: this.exchangeTypes(),
      },
      // === المخازن والعهد ===
      {
        key: 'warehouse',
        label: 'المخازن',
        icon: 'warehouse',
        color: '#795548',
        description: 'المخازن الرئيسية والفرعية ومخازن المحطات',
        isSystem: true,
        subTypes: this.warehouseTypes(),
      },
      {
        key: 'custody',
        label: 'العهدات',
        icon: 'lock',
        color: '#607D8B',
        description: 'عهدات مالية ومخزنية (صناديق ومخازن خاصة بالعهدة)',
        isSystem: true,
        subTypes: [],
      },
      // === الأطراف ===
      {
        key: 'supplier',
        label: 'الموردين',
        icon: 'local_shipping',
        color: '#f97316',
        description: 'حسابات الموردين (تصنيفاتها من أنواع الموردين)',
        isSystem: true,
        subTypes: [],
      },
      {
        key: 'employee',
        label: 'الموظفين',
        icon: 'person',
        color: '#06b6d4',
        description: 'حسابات الموظفين (تصنيفاتها من الأقسام)',
        isSystem: true,
        subTypes: [],
      },
      {
        key: 'partner',
        label: 'الشركاء',
        icon: 'handshake',
        color: '#d946ef',
        description: 'حسابات الشركاء (حسب نوع الشراكة)',
        isSystem: true,
        subTypes: [],
      },
      // === الأنظمة ===
      {
        key: 'billing',
        label: 'أنظمة الفوترة',
        icon: 'receipt',
        color: '#E91E63',
        description: 'حسابات أنظمة الفوترة (المغربي، صندوق الدعم، الدفع المسبق)',
        isSystem: true,
        subTypes: [],
      },
      {
        key: 'budget',
        label: 'الميزانية',
        icon: 'account_balance_wallet',
        color: '#84cc16',
        description: 'حسابات الميزانية والمصروفات (تصنيفاتها من فئات المصروفات)',
        isSystem: true,
        subTypes: [],
      },
      {
        key: 'settlement',
        label: 'التصفية',
        icon: 'balance',
        color: '#0891b2',
        description: 'حسابات وسيطة للتصفيات والتسويات (نهاية السنة، فروقات العملة)',
        isSystem: true,
        subTypes: [],
      },
      {
        key: 'pending',
        label: 'المعلقة',
        icon: 'pending_actions',
        color: '#ef4444',
        description: 'حسابات وسيطة للعمليات المعلقة (مشتريات معلقة، تحويلات معلقة)',
        isSystem: true,
        subTypes: [],
      },
      // === عام ===
      {
        key: 'accounting',
        label: 'أخرى',
        icon: 'book',
        color: '#14b8a6',
        description: 'حسابات إضافية مرنة يضيفها المستخدم حسب حاجته',
        isSystem: false,
        subTypes: [],
      },
    ];
    return types;
  });

  // إحصائيات
  stats = computed(() => {
    const types = this.mainAccountTypes();
    return {
      mainTypes: types.length,
      subTypes: types.reduce((sum, t) => sum + t.subTypes.length, 0),
      activeSubTypes: types.reduce((sum, t) => sum + t.subTypes.filter(s => s.isActive).length, 0),
    };
  });

  protected override onBizIdChange(_bizId: number): void {
    if (this.bizId <= 0) return;
    void this.loadData();
  }

  async loadData() {
    this.loading.set(true);
    try {
      const [fundTypesData, bankTypesData, exchangeTypesData, eWalletTypesData, warehouseTypesData] = await Promise.all([
        this.api.getFundTypes(this.bizId).catch(() => []),
        this.api.getBankTypes(this.bizId).catch(() => []),
        this.api.getExchangeTypes(this.bizId).catch(() => []),
        this.api.getEWalletTypes(this.bizId).catch(() => []),
        this.api.getWarehouseTypes?.(this.bizId).catch(() => []) || Promise.resolve([]),
      ]);
      this.fundTypes.set(fundTypesData);
      this.bankTypes.set(bankTypesData);
      this.exchangeTypes.set(exchangeTypesData);
      this.eWalletTypes.set(eWalletTypesData);
      this.warehouseTypes.set(warehouseTypesData);
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : 'خطأ في تحميل البيانات');
    } finally {
      this.loading.set(false);
    }
  }

  toggleExpand(typeKey: string) {
    this.expandedTypes.update(set => {
      const newSet = new Set(set);
      if (newSet.has(typeKey)) newSet.delete(typeKey);
      else newSet.add(typeKey);
      return newSet;
    });
  }

  isExpanded(typeKey: string): boolean {
    return this.expandedTypes().has(typeKey);
  }

  expandAll() {
    const keys = this.mainAccountTypes().map(t => t.key);
    this.expandedTypes.set(new Set(keys));
  }

  collapseAll() {
    this.expandedTypes.set(new Set());
  }

  // ===== إدارة التصنيفات الفرعية =====
  openAddSubType(mainTypeKey: string) {
    this.activeMainType.set(mainTypeKey);
    this.editingSubType.set(null);
    const mainType = this.mainAccountTypes().find(t => t.key === mainTypeKey);
    const nextSeq = (mainType?.subTypes.length || 0) + 1;
    this.subTypeForm.set({
      name: '',
      subTypeKey: '',
      description: '',
      icon: mainType?.icon || 'category',
      color: mainType?.color || '#4CAF50',
      sequenceNumber: nextSeq,
    });
    this.showSubTypeForm.set(true);
  }

  openEditSubType(mainTypeKey: string, subType: SubType) {
    this.activeMainType.set(mainTypeKey);
    this.editingSubType.set(subType);
    this.subTypeForm.set({
      name: subType.name,
      subTypeKey: subType.subTypeKey,
      description: subType.description || '',
      icon: subType.icon || 'category',
      color: subType.color || '#4CAF50',
      sequenceNumber: subType.sequenceNumber || 0,
    });
    this.showSubTypeForm.set(true);
  }

  async saveSubType() {
    const form = this.subTypeForm();
    const mainType = this.activeMainType();
    
    if (!form.name.trim()) {
      this.toast.error('اسم التصنيف مطلوب');
      return;
    }
    if (!form.subTypeKey.trim()) {
      this.toast.error('مفتاح التصنيف مطلوب');
      return;
    }

    try {
      const data = {
        name: form.name,
        subTypeKey: form.subTypeKey,
        description: form.description,
        icon: form.icon,
        color: form.color,
        sequenceNumber: form.sequenceNumber,
      };

      const editing = this.editingSubType();
      
      if (mainType === 'fund') {
        if (editing) await this.api.updateFundType(editing.id, data);
        else await this.api.createFundType(this.bizId, data);
      } else if (mainType === 'bank') {
        if (editing) await this.api.updateBankType(editing.id, data);
        else await this.api.createBankType(this.bizId, data);
      } else if (mainType === 'exchange') {
        if (editing) await this.api.updateExchangeType(editing.id, data);
        else await this.api.createExchangeType(this.bizId, data);
      } else if (mainType === 'e_wallet') {
        if (editing) await this.api.updateEWalletType(editing.id, data);
        else await this.api.createEWalletType(this.bizId, data);
      } else if (mainType === 'warehouse' && this.api.createWarehouseType) {
        if (editing && this.api.updateWarehouseType) await this.api.updateWarehouseType(editing.id, data);
        else await this.api.createWarehouseType(this.bizId, data);
      }

      this.showSubTypeForm.set(false);
      this.toast.success(editing ? 'تم تحديث التصنيف بنجاح' : 'تم إنشاء التصنيف بنجاح');
      await this.loadData();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحفظ');
    }
  }

  async deleteSubType(mainTypeKey: string, subType: SubType) {
    const confirmed = await this.toast.confirm({
      title: 'تأكيد الحذف',
      message: `هل تريد حذف التصنيف "${subType.name}"؟`,
      type: 'danger',
    });
    if (!confirmed) return;

    try {
      if (mainTypeKey === 'fund') {
        await this.api.deleteFundType(subType.id);
      } else if (mainTypeKey === 'bank') {
        await this.api.deleteBankType(subType.id);
      } else if (mainTypeKey === 'exchange') {
        await this.api.deleteExchangeType(subType.id);
      } else if (mainTypeKey === 'e_wallet') {
        await this.api.deleteEWalletType(subType.id);
      } else if (mainTypeKey === 'warehouse' && this.api.deleteWarehouseType) {
        await this.api.deleteWarehouseType(subType.id);
      }

      this.toast.success('تم الحذف بنجاح');
      await this.loadData();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف');
    }
  }

  setFormField(field: string, value: any) {
    this.subTypeForm.update(f => ({ ...f, [field]: value }));
  }

  getMainTypeLabel(key: string): string {
    const type = this.mainAccountTypes().find(t => t.key === key);
    return type?.label || key;
  }

  generateSubTypeKey(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^\w\u0621-\u064A]/g, '')
      .slice(0, 50);
  }

  onNameChange(name: string) {
    this.setFormField('name', name);
    if (!this.editingSubType()) {
      this.setFormField('subTypeKey', this.generateSubTypeKey(name));
    }
  }

  trackByKey(_: number, item: MainAccountType) { return item.key; }
  trackById(_: number, item: SubType) { return item.id; }
}
