import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

interface PurchaseInvoiceItem {
  inventoryItemId: number;
  itemName?: string;
  quantity: number;
  unitCost: number;
  totalCost?: number;
  tax: number;
  discount: number;
  notes?: string;
}

interface PurchaseInvoice {
  id: number;
  invoiceNumber: string;
  fullSequenceNumber?: string;
  supplierId: number;
  supplierName?: string;
  warehouseId?: number;
  warehouseName?: string;
  currencyId: number;
  currencyCode?: string;
  subtotal: string;
  tax: string;
  discount: string;
  totalAmount: string;
  paidAmount: string;
  remainingAmount: string;
  paymentMethod: string;
  status: string;
  receivedStatus: string;
  invoiceDate: string;
  dueDate?: string;
  externalReference?: string;
  notes?: string;
  items?: PurchaseInvoiceItem[];
}

@Component({
  selector: 'app-purchase-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent],
  templateUrl: './purchase-invoices.html',
  styleUrl: './purchase-invoices.scss',
})
export class PurchaseInvoicesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  invoices = signal<PurchaseInvoice[]>([]);
  suppliers = signal<any[]>([]);
  warehouses = signal<any[]>([]);
  currencies = signal<any[]>([]);
  inventoryItems = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  showDetails = signal(false);
  editingId = signal<number | null>(null);
  filterStatus = signal<string>('all');
  searchQuery = signal<string>('');
  selectedInvoice = signal<PurchaseInvoice | null>(null);

  form: any = {
    supplierId: null,
    warehouseId: null,
    currencyId: 1,
    paymentMethod: 'credit',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    externalReference: '',
    notes: '',
    items: [] as PurchaseInvoiceItem[],
  };

  newItem: PurchaseInvoiceItem = {
    inventoryItemId: 0,
    quantity: 1,
    unitCost: 0,
    tax: 0,
    discount: 0,
    notes: '',
  };

  formSubtotal = computed(() => {
    return this.form.items.reduce((sum: number, item: PurchaseInvoiceItem) => {
      return sum + (item.quantity * item.unitCost);
    }, 0);
  });

  formTax = computed(() => {
    return this.form.items.reduce((sum: number, item: PurchaseInvoiceItem) => sum + (item.tax || 0), 0);
  });

  formDiscount = computed(() => {
    return this.form.items.reduce((sum: number, item: PurchaseInvoiceItem) => sum + (item.discount || 0), 0);
  });

  formTotal = computed(() => {
    return this.formSubtotal() + this.formTax() - this.formDiscount();
  });

  protected override onBizIdChange(_bizId: number): void {
    this.loadAll();
  }

  async loadAll() {
    this.loading.set(true);
    try {
      const [invoicesData, suppliersData, warehousesData, currenciesData, itemsData] = await Promise.all([
        this.api.getPurchaseInvoices(this.bizId),
        this.api.getSuppliers(this.bizId),
        this.api.getWarehouses(this.bizId),
        this.api.getCurrencies(),
        this.api.getInventoryItems(this.bizId),
      ]);
      this.invoices.set(invoicesData);
      this.suppliers.set(suppliersData);
      this.warehouses.set(warehousesData);
      this.currencies.set(currenciesData);
      this.inventoryItems.set(itemsData);
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء تحميل البيانات');
    }
    this.loading.set(false);
  }

  filteredInvoices() {
    let list = this.invoices();
    const status = this.filterStatus();
    const q = this.searchQuery().toLowerCase();
    if (status !== 'all') list = list.filter(inv => inv.status === status);
    if (q) list = list.filter(inv => 
      inv.invoiceNumber.toLowerCase().includes(q) || 
      (inv.supplierName || '').toLowerCase().includes(q) ||
      (inv.externalReference || '').toLowerCase().includes(q)
    );
    return list;
  }

  statusCount(status: string) {
    if (status === 'all') return this.invoices().length;
    return this.invoices().filter(inv => inv.status === status).length;
  }

  openAdd() {
    this.form = {
      supplierId: null,
      warehouseId: null,
      currencyId: 1,
      paymentMethod: 'credit',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      externalReference: '',
      notes: '',
      items: [],
    };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  async openEdit(inv: PurchaseInvoice) {
    try {
      const details = await this.api.getPurchaseInvoice(this.bizId, inv.id);
      this.form = {
        supplierId: details.supplierId,
        warehouseId: details.warehouseId,
        currencyId: details.currencyId,
        paymentMethod: details.paymentMethod,
        invoiceDate: details.invoiceDate ? new Date(details.invoiceDate).toISOString().split('T')[0] : '',
        dueDate: details.dueDate ? new Date(details.dueDate).toISOString().split('T')[0] : '',
        externalReference: details.externalReference || '',
        notes: details.notes || '',
        items: (details.items || []).map((item: any) => ({
          inventoryItemId: item.inventoryItemId,
          itemName: item.itemName,
          quantity: parseFloat(item.quantity),
          unitCost: parseFloat(item.unitCost),
          tax: parseFloat(item.tax),
          discount: parseFloat(item.discount),
          notes: item.notes,
        })),
      };
      this.editingId.set(inv.id);
      this.showForm.set(true);
    } catch (e: unknown) {
      console.error(e);
      this.toast.error('فشل في تحميل تفاصيل الفاتورة');
    }
  }

  async viewDetails(inv: PurchaseInvoice) {
    try {
      const details = await this.api.getPurchaseInvoice(this.bizId, inv.id);
      this.selectedInvoice.set(details);
      this.showDetails.set(true);
    } catch (e: unknown) {
      console.error(e);
      this.toast.error('فشل في تحميل تفاصيل الفاتورة');
    }
  }

  addItem() {
    if (!this.newItem.inventoryItemId || this.newItem.quantity <= 0 || this.newItem.unitCost <= 0) {
      this.toast.error('يرجى تحديد الصنف والكمية والسعر');
      return;
    }
    const item = this.inventoryItems().find(i => i.id === this.newItem.inventoryItemId);
    this.form.items.push({
      ...this.newItem,
      itemName: item?.name || '',
      totalCost: this.newItem.quantity * this.newItem.unitCost,
    });
    this.newItem = { inventoryItemId: 0, quantity: 1, unitCost: 0, tax: 0, discount: 0, notes: '' };
  }

  removeItem(index: number) {
    this.form.items.splice(index, 1);
  }

  async save() {
    if (!this.form.supplierId) {
      this.toast.error('يرجى اختيار المورد');
      return;
    }
    if (!this.form.items.length) {
      this.toast.error('يرجى إضافة عنصر واحد على الأقل');
      return;
    }

    try {
      const payload = {
        ...this.form,
        items: this.form.items.map((item: PurchaseInvoiceItem) => ({
          inventoryItemId: item.inventoryItemId,
          quantity: item.quantity,
          unitCost: item.unitCost,
          tax: item.tax,
          discount: item.discount,
          notes: item.notes,
        })),
      };

      if (this.editingId()) {
        await this.api.updatePurchaseInvoice(this.bizId, this.editingId()!, payload);
        this.toast.success('تم تحديث الفاتورة بنجاح');
      } else {
        await this.api.createPurchaseInvoice(this.bizId, payload);
        this.toast.success('تم إنشاء الفاتورة بنجاح');
      }
      this.showForm.set(false);
      await this.loadAll();
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ الفاتورة');
    }
  }

  async confirm(inv: PurchaseInvoice) {
    try {
      await this.api.confirmPurchaseInvoice(this.bizId, inv.id);
      this.toast.success('تم تأكيد الفاتورة بنجاح');
      await this.loadAll();
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'فشل في تأكيد الفاتورة');
    }
  }

  async remove(inv: PurchaseInvoice) {
    const confirmed = await this.toast.confirm({
      title: 'تأكيد الحذف',
      message: `هل أنت متأكد من حذف الفاتورة "${inv.invoiceNumber}"؟`,
      type: 'danger',
    });
    if (confirmed) {
      try {
        await this.api.deletePurchaseInvoice(this.bizId, inv.id);
        this.toast.success('تم حذف الفاتورة بنجاح');
        await this.loadAll();
      } catch (e: unknown) {
        console.error(e);
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف');
      }
    }
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      draft: 'مسودة',
      confirmed: 'مؤكدة',
      partial: 'جزئية',
      completed: 'مكتملة',
      cancelled: 'ملغاة',
    };
    return map[status] || status;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      draft: 'gray',
      confirmed: 'blue',
      partial: 'amber',
      completed: 'green',
      cancelled: 'red',
    };
    return map[status] || 'gray';
  }

  getPaymentLabel(method: string): string {
    const map: Record<string, string> = { cash: 'نقداً', credit: 'آجل', partial: 'جزئي' };
    return map[method] || method;
  }

  formatNumber(val: string | number): string {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return isNaN(num) ? '0' : num.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
