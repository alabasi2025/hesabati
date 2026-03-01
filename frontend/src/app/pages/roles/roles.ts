import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-6xl mx-auto" dir="rtl">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span class="material-icons text-purple-600">admin_panel_settings</span>
            الأدوار والصلاحيات
          </h1>
          <p class="text-gray-500 text-sm mt-1">إدارة أدوار المستخدمين وصلاحياتهم والسقوف المالية</p>
        </div>
        <button (click)="openForm()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-1">
          <span class="material-icons text-sm">add</span>
          دور جديد
        </button>
      </div>

      <!-- قائمة الأدوار -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6" *ngIf="!showForm">
        <div *ngFor="let role of roles" class="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" [style.background]="role.color"></div>
              <h3 class="font-bold text-gray-800">{{role.name}}</h3>
            </div>
            <div class="flex gap-1">
              <button (click)="editRole(role)" class="text-blue-600 hover:text-blue-800"><span class="material-icons text-sm">edit</span></button>
              <button *ngIf="!role.isSystem" (click)="deleteRole(role.id)" class="text-red-600 hover:text-red-800"><span class="material-icons text-sm">delete</span></button>
            </div>
          </div>
          <p class="text-sm text-gray-500 mb-3">{{role.description || 'بدون وصف'}}</p>
          <div class="flex flex-wrap gap-1 mb-3">
            <span *ngFor="let p of role.permissions" class="px-2 py-0.5 rounded text-xs bg-purple-50 text-purple-700">
              {{getResourceLabel(p.resource)}} - {{getActionLabel(p.action)}}
            </span>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400 border-t pt-2">
            <span>{{role.userCount}} مستخدم</span>
            <div class="flex gap-2">
              <span *ngIf="role.maxVoucherAmount">سقف: {{role.maxVoucherAmount}}</span>
              <span *ngIf="role.isSystem" class="text-orange-500">نظام</span>
            </div>
          </div>
        </div>
      </div>

      <!-- نموذج إنشاء/تعديل دور -->
      <div *ngIf="showForm" class="bg-white rounded-xl shadow-sm border p-6">
        <h3 class="font-bold text-gray-800 mb-4">{{editId ? 'تعديل' : 'إنشاء'}} دور</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="text-sm text-gray-600 block mb-1">اسم الدور</label>
            <input type="text" [(ngModel)]="form.name" class="border rounded-lg px-3 py-2 w-full" placeholder="مثال: محاسب">
          </div>
          <div>
            <label class="text-sm text-gray-600 block mb-1">الوصف</label>
            <input type="text" [(ngModel)]="form.description" class="border rounded-lg px-3 py-2 w-full" placeholder="وصف اختياري">
          </div>
          <div>
            <label class="text-sm text-gray-600 block mb-1">اللون</label>
            <input type="color" [(ngModel)]="form.color" class="border rounded h-10 w-full">
          </div>
          <div>
            <label class="text-sm text-gray-600 block mb-1">سقف السند الواحد</label>
            <input type="number" [(ngModel)]="form.maxVoucherAmount" class="border rounded-lg px-3 py-2 w-full" placeholder="0 = بدون حد">
          </div>
          <div>
            <label class="text-sm text-gray-600 block mb-1">سقف يومي</label>
            <input type="number" [(ngModel)]="form.maxDailyAmount" class="border rounded-lg px-3 py-2 w-full" placeholder="0 = بدون حد">
          </div>
        </div>

        <h4 class="font-semibold text-gray-700 mb-3">الصلاحيات</h4>
        <div class="overflow-x-auto">
          <table class="w-full border rounded-lg">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-right px-4 py-2 text-sm">المورد</th>
                <th *ngFor="let a of allActions" class="text-center px-3 py-2 text-sm">{{getActionLabel(a)}}</th>
                <th class="text-center px-3 py-2 text-sm">الكل</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let res of allResources" class="border-t">
                <td class="px-4 py-2 text-sm flex items-center gap-1">
                  <span class="material-icons text-gray-400 text-sm">{{res.icon}}</span>
                  {{res.label}}
                </td>
                <td *ngFor="let a of allActions" class="text-center px-3 py-2">
                  <input type="checkbox" [checked]="hasPerm(res.key, a)" (change)="togglePerm(res.key, a)" class="w-4 h-4 accent-purple-600">
                </td>
                <td class="text-center px-3 py-2">
                  <input type="checkbox" [checked]="hasAllPerms(res.key)" (change)="toggleAllPerms(res.key)" class="w-4 h-4 accent-purple-600">
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex gap-2 mt-6">
          <button (click)="save()" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">{{editId ? 'تحديث' : 'حفظ'}}</button>
          <button (click)="cancelForm()" class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">إلغاء</button>
        </div>
      </div>

      <!-- تعيين الأدوار للمستخدمين -->
      <div class="bg-white rounded-xl shadow-sm border p-5 mt-6" *ngIf="!showForm">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span class="material-icons text-gray-500">person_add</span>
          تعيين الأدوار للمستخدمين
        </h3>
        <div class="flex gap-3 items-end mb-4">
          <div>
            <label class="text-xs text-gray-600 block mb-1">المستخدم</label>
            <select [(ngModel)]="assignUserId" class="border rounded-lg px-3 py-2 w-48">
              <option *ngFor="let u of users" [value]="u.id">{{u.username}}</option>
            </select>
          </div>
          <div>
            <label class="text-xs text-gray-600 block mb-1">الدور</label>
            <select [(ngModel)]="assignRoleId" class="border rounded-lg px-3 py-2 w-48">
              <option *ngFor="let r of roles" [value]="r.id">{{r.name}}</option>
            </select>
          </div>
          <button (click)="assignRole()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">تعيين</button>
        </div>
        <table class="w-full" *ngIf="userRoles.length > 0">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="text-right px-4 py-2 text-sm">المستخدم</th>
              <th class="text-right px-4 py-2 text-sm">الدور</th>
              <th class="text-center px-4 py-2 text-sm">إجراء</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let ur of userRoles" class="border-b">
              <td class="px-4 py-2 text-sm">{{ur.userName}}</td>
              <td class="px-4 py-2 text-sm">
                <span class="px-2 py-0.5 rounded text-xs text-white" [style.background]="ur.roleColor">{{ur.roleName}}</span>
              </td>
              <td class="text-center px-4 py-2">
                <button (click)="removeRole(ur.userId)" class="text-red-600 hover:text-red-800"><span class="material-icons text-sm">close</span></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class RolesComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  bizId = 0;
  roles: any[] = [];
  users: any[] = [];
  userRoles: any[] = [];
  showForm = false;
  editId: number | null = null;
  form: any = { name: '', description: '', color: '#8b5cf6', maxVoucherAmount: null, maxDailyAmount: null };
  permSet = new Set<string>();
  allResources = ALL_RESOURCES;
  allActions = ALL_ACTIONS;
  assignUserId = ''; assignRoleId = '';

  ngOnInit() {
    this.bizId = Number(this.route.parent?.snapshot.paramMap.get('bizId'));
    this.load();
  }

  async load() {
    this.roles = await this.api.getRoles(this.bizId);
    this.users = await this.api.getUsers();
    this.userRoles = await this.api.getUserRoles(this.bizId);
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

  openForm() { this.showForm = true; this.editId = null; this.form = { name: '', description: '', color: '#8b5cf6', maxVoucherAmount: null, maxDailyAmount: null }; this.permSet.clear(); }

  editRole(role: any) {
    this.editId = role.id;
    this.form = { name: role.name, description: role.description, color: role.color, maxVoucherAmount: role.maxVoucherAmount, maxDailyAmount: role.maxDailyAmount };
    this.permSet.clear();
    (role.permissions || []).forEach((p: any) => this.permSet.add(`${p.resource}:${p.action}`));
    this.showForm = true;
  }

  async save() {
    const permissions = Array.from(this.permSet).map(k => { const [resource, action] = k.split(':'); return { resource, action }; });
    const data = { ...this.form, permissions };
    if (this.editId) { await this.api.updateRole(this.bizId, this.editId, data); }
    else { await this.api.createRole(this.bizId, data); }
    this.cancelForm(); this.load();
  }

  async deleteRole(id: number) { if (confirm('حذف هذا الدور؟')) { await this.api.deleteRole(this.bizId, id); this.load(); } }

  cancelForm() { this.showForm = false; this.editId = null; }

  async assignRole() {
    if (!this.assignUserId || !this.assignRoleId) return;
    await this.api.assignUserRole(this.bizId, { userId: Number(this.assignUserId), roleId: Number(this.assignRoleId) });
    this.load();
  }

  async removeRole(userId: number) { await this.api.removeUserRole(this.bizId, userId); this.load(); }
}
