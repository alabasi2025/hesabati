import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { formatDate as formatDateShared } from '../../shared/helpers';

interface OperationItem {
  itemName: string;
  itemCode: string;
  quantity: number;
  unitCost: number;
  unit: string;
  notes: string;
}

const OPERATION_TYPE_META: Record<string, { label: string; icon: string; color: string; description: string }> = {
  supply_invoice:   { label: 'توريد فاتورة',   icon: 'receipt_long',    color: '#22c55e', description: 'إدخال بضاعة بفاتورة مشتريات من مورد' },
  supply_order:     { label: 'توريد أمر',       icon: 'assignment',      color: '#3b82f6', description: 'إدخال بضاعة بأمر توريد داخلي' },
  dispatch:         { label: 'صرف مخزني',       icon: 'outbox',          color: '#ef4444', description: 'صرف بضاعة من المخزن' },
  transfer_out:     { label: 'تحويل مخزني',     icon: 'swap_horiz',      color: '#8b5cf6', description: 'تحويل بضاعة من مخزن إلى آخر' },
  receive_transfer: { label: 'استلام تحويل',    icon: 'move_to_inbox',   color: '#f59e0b', description: 'استلام بضاعة محولة من مخزن آخر' },
};

@Component({
  selector: 'app-warehouse-operations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './warehouse-operations.html',
  styleUrl: './warehouse-operations.scss',
})
export class WarehouseOperationsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  operations = signal<any[]>([]);
  warehouses = signal<any[]>([]);
  suppliers = signal<any[]>([]);
  operationTypes = signal<any[]>([]);
  loading = signal(true);
  saving = signal(false);

  // فلاتر
  filterType = signal<string>('all');
  filterWarehouse = signal<number | null>(null);

  // نموذج العملية
  showForm = signal(false);
  showDetail = signal(false);
  selectedOperation = signal<any>(null);

  form = {
    operationType: 'supply_invoice' as string,
    sourceWarehouseId: null as number | null,
    destinationWarehouseId: null as number | null,
    operationTypeId: null as number | null,
    supplierId: null as number | null,
    relatedOperationId: null as number | null,
    operationDate: new Date().toISOString().split('T')[0],
    description: '',
    reference: '',
    items: [this.newItem()] as OperationItem[],
  };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const [ops, whs, supps, ots] = await Promise.allSettled([
        this.api.getWarehouseOperations(this.bizId),
        this.api.getWarehouses(this.bizId),
        this.api.getSuppliers(this.bizId),
        this.api.getOperationTypes(this.bizId),
      ]);
      this.operations.set(ops.status === 'fulfilled' ? ops.value : []);
      this.warehouses.set(whs.status === 'fulfilled' ? whs.value : []);
      this.suppliers.set(supps.status === 'fulfilled' ? supps.value : []);
      this.operationTypes.set(ots.status === 'fulfilled' ? ots.value : []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  // ===== الفلترة =====
  filteredOperations() {
    const ft = this.filterType();
    const fw = this.filterWarehouse();
    let list = this.operations();
    if (ft !== 'all') list = list.filter(o => o.operationType === ft);
    if (fw) list = list.filter(o => o.sourceWarehouseId === fw || o.destinationWarehouseId === fw);
    return list;
  }

  // إحصائيات حسب النوع
  countByType(type: string): number {
    return this.operations().filter(o => o.operationType === type).length;
  }

  // ===== نموذج العملية =====
  newItem(): OperationItem {
    return { itemName: '', itemCode: '', quantity: 1, unitCost: 0, unit: '', notes: '' };
  }

  openAdd(type?: string) {
    this.form = {
      operationType: type || 'supply_invoice',
      sourceWarehouseId: null,
      destinationWarehouseId: null,
      operationTypeId: null,
      supplierId: null,
      relatedOperationId: null,
      operationDate: new Date().toISOString().split('T')[0],
      description: '',
      reference: '',
      items: [this.newItem()],
    };
    this.showForm.set(true);
  }

  addItem() {
    this.form.items.push(this.newItem());
  }

  removeItem(index: number) {
    if (this.form.items.length > 1) {
      this.form.items.splice(index, 1);
    }
  }

  getItemTotal(item: OperationItem): number {
    return (item.quantity || 0) * (item.unitCost || 0);
  }

  getGrandTotal(): number {
    return this.form.items.reduce((sum, item) => sum + this.getItemTotal(item), 0);
  }

  getTotalQuantity(): number {
    return this.form.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  }

  // هل النوع يحتاج مخزن مصدر
  needsSource(): boolean {
    return ['dispatch', 'transfer_out'].includes(this.form.operationType);
  }

  // هل النوع يحتاج مخزن وجهة
  needsDestination(): boolean {
    return ['supply_invoice', 'supply_order', 'transfer_out', 'receive_transfer'].includes(this.form.operationType);
  }

  // هل النوع يحتاج مورد
  needsSupplier(): boolean {
    return this.form.operationType === 'supply_invoice';
  }

  // هل النوع يحتاج عملية مرتبطة
  needsRelated(): boolean {
    return this.form.operationType === 'receive_transfer';
  }

  // القوالب المخزنية فقط
  warehouseTemplates = computed(() => {
    return this.operationTypes().filter((ot: any) =>
      ot.voucherType && ['supply_invoice', 'supply_order', 'dispatch', 'transfer_out', 'receive_transfer'].includes(ot.voucherType)
    );
  });

  // عمليات التحويل المتاحة للاستلام
  pendingTransfers = computed(() => {
    return this.operations().filter(o =>
      o.operationType === 'transfer_out' && o.status === 'confirmed'
    );
  });

  async save() {
    // التحقق
    if (this.needsDestination() && !this.form.destinationWarehouseId) {
      this.toast.error('يرجى تحديد المخزن الوجهة');
      return;
    }
    if (this.needsSource() && !this.form.sourceWarehouseId) {
      this.toast.error('يرجى تحديد المخزن المصدر');
      return;
    }
    if (this.needsSupplier() && !this.form.supplierId) {
      this.toast.error('يرجى تحديد المورد');
      return;
    }
    if (this.needsRelated() && !this.form.relatedOperationId) {
      this.toast.error('يرجى تحديد عملية التحويل المرتبطة');
      return;
    }

    const validItems = this.form.items.filter(i => i.itemName?.trim());
    if (validItems.length === 0) {
      this.toast.error('يجب إضافة صنف واحد على الأقل');
      return;
    }

    this.saving.set(true);
    try {
      await this.api.createWarehouseOperation(this.bizId, {
        ...this.form,
        items: validItems,
      });
      this.toast.success('تم إنشاء العملية المخزنية بنجاح');
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء إنشاء العملية');
    }
    this.saving.set(false);
  }

  async viewDetail(op: any) {
    try {
      const detail = await this.api.getWarehouseOperation(op.id);
      this.selectedOperation.set(detail);
      this.showDetail.set(true);
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
    }
  }

  // ===== مساعدات =====
  getTypeMeta(type: string) {
    return OPERATION_TYPE_META[type] || { label: type, icon: 'inventory_2', color: '#64748b', description: '' };
  }

  getWarehouseName(id: number | null): string {
    if (!id) return '-';
    const w = this.warehouses().find(w => w.id === id);
    return w ? w.name : '-';
  }

  getSupplierName(id: number | null): string {
    if (!id) return '-';
    const s = this.suppliers().find(s => s.id === id);
    return s ? s.name : '-';
  }

  formatNumber(n: number): string {
    return new Intl.NumberFormat('ar-YE').format(n);
  }

  formatDate(d: string): string {
    if (!d) return '-';
    try {
      return formatDateShared(d);
    } catch { return d; }
  }

  getStatusLabel(s: string): string {
    const map: Record<string, string> = { draft: 'مسودة', confirmed: 'مؤكد', cancelled: 'ملغي' };
    return map[s] || s;
  }

  getStatusClass(s: string): string {
    const map: Record<string, string> = { draft: 'draft', confirmed: 'confirmed', cancelled: 'cancelled' };
    return map[s] || 'default';
  }

  allTypes = Object.entries(OPERATION_TYPE_META).map(([key, meta]) => ({ key, ...meta }));
}
