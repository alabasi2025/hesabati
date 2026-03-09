import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stations.html',
  styleUrl: './stations.scss',
})
export class StationsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  stations = signal<any[]>([]);
  billingSystems = signal<any[]>([]);
  loading = signal(true);
  saving = signal(false);

  showForm = signal(false);
  editingStation = signal<any>(null);
  form = signal<{
    name: string;
    code: string;
    location: string;
    isActive: boolean;
    notes: string;
    billingSystemsStr: string;
  }>({
    name: '',
    code: '',
    location: '',
    isActive: true,
    notes: '',
    billingSystemsStr: '',
  });

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const [data, systems] = await Promise.all([
        this.api.getStations(this.bizId),
        this.api.getBillingSystemsConfig(this.bizId).catch(() => []),
      ]);
      this.stations.set(data);
      this.billingSystems.set(systems);
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء تحميل المحطات');
    }
    this.loading.set(false);
  }

  openCreate() {
    this.editingStation.set(null);
    this.form.set({
      name: '',
      code: '',
      location: '',
      isActive: true,
      notes: '',
      billingSystemsStr: '',
    });
    this.showForm.set(true);
  }

  openEdit(s: any) {
    this.editingStation.set(s);
    const billingStr = Array.isArray(s.billingSystems) ? s.billingSystems.join(', ') : (s.billingSystems || '');
    this.form.set({
      name: s.name || '',
      code: s.code || '',
      location: s.location || '',
      isActive: s.isActive !== false,
      notes: s.notes || '',
      billingSystemsStr: billingStr,
    });
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.editingStation.set(null);
  }

  getBillingSystemsArray(str: string): string[] {
    if (!str || !str.trim()) return [];
    return str.split(',').map(s => s.trim()).filter(Boolean);
  }

  async save() {
    const f = this.form();
    if (!f.name?.trim()) {
      this.toast.warning('اسم المحطة مطلوب');
      return;
    }
    if (!f.code?.trim()) {
      this.toast.warning('رمز المحطة مطلوب');
      return;
    }

    this.saving.set(true);
    try {
      const payload = {
        name: f.name.trim(),
        code: f.code.trim(),
        location: f.location?.trim() || null,
        isActive: f.isActive,
        notes: f.notes?.trim() || null,
        billingSystems: this.getBillingSystemsArray(f.billingSystemsStr),
      };

      const editing = this.editingStation();
      if (editing) {
        await this.api.updateStationByBiz(this.bizId, editing.id, payload);
        this.toast.success('تم تحديث المحطة بنجاح');
      } else {
        await this.api.createStation(this.bizId, payload);
        this.toast.success('تم إضافة المحطة بنجاح');
      }
      this.closeForm();
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحفظ');
    } finally {
      this.saving.set(false);
    }
  }

  async deleteStation(s: any) {
    const confirmed = await this.toast.confirm({
      title: 'تأكيد الحذف',
      message: `هل تريد حذف المحطة "${s.name}"؟`,
      type: 'danger',
    });
    if (!confirmed) return;

    try {
      await this.api.deleteStation(this.bizId, s.id);
      this.toast.success('تم حذف المحطة');
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف');
    }
  }

  getBillingLabel(sysKey: string): string {
    const sys = this.billingSystems().find((s: any) => s.systemKey === sysKey);
    return sys?.name ?? sysKey;
  }

  setFormField(field: string, value: any) {
    this.form.update(f => ({ ...f, [field]: value }));
  }
}
