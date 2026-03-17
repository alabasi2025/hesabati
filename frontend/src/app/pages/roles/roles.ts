import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

const ALL_RESOURCES = [
  { key: 'vouchers', label: 'السندات', icon: 'receipt_long' },
  { key: 'accounts', label: 'الحسابات', icon: 'account_balance' },
  { key: 'funds', label: 'الصناديق', icon: 'savings' },
  { key: 'employees', label: 'الموظفين', icon: 'people' },
  { key: 'stations', label: 'المحطات', icon: 'local_gas_station' },
  { key: 'reports', label: 'التقارير', icon: 'assessment' },
  { key: 'settings', label: 'الإعدادات', icon: 'settings' },
  { key: 'exchange_rates', label: 'أسعار الصرف', icon: 'currency_exchange' },
  { key: 'journal', label: 'القيود المحاسبية', icon: 'menu_book' },
  { key: 'collections', label: 'التحصيل', icon: 'point_of_sale' },
];
const ALL_ACTIONS = ['create', 'read', 'update', 'delete'];
const ACTION_LABELS: Record<string, string> = { create: 'إنشاء', read: 'عرض', update: 'تعديل', delete: 'حذف' };

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class RolesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  roles = signal<any[]>([]);
  users = signal<any[]>([]);
  userRoles = signal<any[]>([]);
  showForm = false;
  editId: number | null = null;
  form: any = { name: '', description: '', color: '#8b5cf6', maxVoucherAmount: null, maxDailyAmount: null };
  permSet = new Set<string>();
  allResources = ALL_RESOURCES;
  allActions = ALL_ACTIONS;
  assignUserId = ''; assignRoleId = '';

  protected onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    const [roles, users, userRoles] = await Promise.all([
      this.api.getRoles(this.bizId),
      this.api.getUsers(),
      this.api.getUserRoles(this.bizId),
    ]);
    this.roles.set(roles);
    this.users.set(users);
    this.userRoles.set(userRoles);
  }

  getResourceLabel(key: string) { return ALL_RESOURCES.find(r => r.key === key)?.label || key; }
  getActionLabel(key: string) { return ACTION_LABELS[key] || key; }

  hasPerm(resource: string, action: string) { return this.permSet.has(`${resource}:${action}`); }
  hasAllPerms(resource: string) { return ALL_ACTIONS.every(a => this.permSet.has(`${resource}:${a}`)); }

  togglePerm(resource: string, action: string) {
    const key = `${resource}:${action}`;
    if (this.permSet.has(key)) this.permSet.delete(key);
    else this.permSet.add(key);
  }

  toggleAllPerms(resource: string) {
    const allHave = this.hasAllPerms(resource);
    ALL_ACTIONS.forEach(a => { const k = `${resource}:${a}`; allHave ? this.permSet.delete(k) : this.permSet.add(k); });
  }

  openForm() {
    this.showForm = true; this.editId = null;
    this.form = { name: '', description: '', color: '#8b5cf6', maxVoucherAmount: null, maxDailyAmount: null };
    this.permSet.clear();
  }

  editRole(role: any) {
    this.editId = role.id;
    this.form = { name: role.name, description: role.description, color: role.color, maxVoucherAmount: role.maxVoucherAmount, maxDailyAmount: role.maxDailyAmount };
    this.permSet.clear();
    (role.permissions || []).forEach((p: any) => this.permSet.add(`${p.resource}:${p.action}`));
    this.showForm = true;
  }

  async save() {
    try {
      const permissions = Array.from(this.permSet).map(k => { const [resource, action] = k.split(':'); return { resource, action }; });
      const data = { ...this.form, permissions };
      if (this.editId) { await this.api.updateRole(this.bizId, this.editId, data); }
      else { await this.api.createRole(this.bizId, data); }
      this.toast.success('تم الحفظ بنجاح');
      this.cancelForm(); this.load();
    } catch (e: unknown) {
      this.toast.error((e as { error?: { error?: string } })?.error?.error || 'حدث خطأ');
    }
  }

  async deleteRole(id: number) {
    if (confirm('حذف هذا الدور؟')) {
      await this.api.deleteRole(this.bizId, id);
      this.toast.success('تم الحذف');
      this.load();
    }
  }

  cancelForm() { this.showForm = false; this.editId = null; }

  async assignRole() {
    if (!this.assignUserId || !this.assignRoleId) return;
    try {
      await this.api.assignUserRole(this.bizId, { userId: Number(this.assignUserId), roleId: Number(this.assignRoleId) });
      this.toast.success('تم التعيين بنجاح');
      this.load();
    } catch (e: unknown) {
      this.toast.error((e as { error?: { error?: string } })?.error?.error || 'حدث خطأ');
    }
  }

  async removeRole(userId: number) {
    await this.api.removeUserRole(this.bizId, userId);
    this.toast.success('تم الإزالة');
    this.load();
  }
}
