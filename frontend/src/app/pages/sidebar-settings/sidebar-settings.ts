import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';

interface SidebarSection {
  id: number;
  name: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
}

interface SidebarItem {
  id: number;
  sectionId: number;
  screenKey: string;
  label: string;
  icon: string;
  route: string;
  sortOrder: number;
  sectionName: string;
}

interface UserConfig {
  configId: number;
  itemId: number;
  label: string;
  icon: string;
  screenKey: string;
  sectionName: string;
  sectionId: number;
  isVisible: boolean;
  customSortOrder: number;
}

interface AppUser {
  id: number;
  username: string;
  fullName: string;
  role: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar-settings',
  standalone: true,
  templateUrl: './sidebar-settings.html',
  styleUrl: './sidebar-settings.scss',
})
export class SidebarSettingsComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  bizId = 0;
  activeTab = signal<'users' | 'sections' | 'items'>('users');

  // Users tab
  users = signal<AppUser[]>([]);
  selectedUser = signal<AppUser | null>(null);
  userConfigs = signal<UserConfig[]>([]);
  savingUser = signal(false);

  // Sections tab
  sections = signal<SidebarSection[]>([]);
  showSectionForm = signal(false);
  editingSection = signal<SidebarSection | null>(null);
  sectionForm = signal({ name: '', icon: 'folder', sortOrder: 0 });

  // Items tab
  allItems = signal<SidebarItem[]>([]);
  showItemForm = signal(false);
  editingItem = signal<SidebarItem | null>(null);
  itemForm = signal({ sectionId: 0, screenKey: '', label: '', icon: 'circle', route: '', sortOrder: 0 });

  // Drag state
  draggedIndex = signal<number | null>(null);
  dragOverIndex = signal<number | null>(null);

  loading = signal(true);
  message = signal('');
  messageType = signal<'success' | 'error'>('success');

  ngOnInit() {
    this.bizId = Number(this.route.parent?.snapshot.paramMap.get('bizId') || 1);
    this.loadData();
  }

  async loadData() {
    this.loading.set(true);
    try {
      const [users, sections, items] = await Promise.all([
        this.api.getUsers(),
        this.api.getSidebarSections(this.bizId),
        this.api.getSidebarItems(this.bizId),
      ]);
      this.users.set(users);
      this.sections.set(sections);
      this.allItems.set(items);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  // ==================== Users Tab ====================
  async selectUser(user: AppUser) {
    this.selectedUser.set(user);
    try {
      const configs = await this.api.getUserSidebar(this.bizId, user.id);
      this.userConfigs.set(configs.map((c: any) => ({
        configId: c.configId,
        itemId: c.itemId,
        label: c.label,
        icon: c.icon,
        screenKey: c.screenKey,
        sectionName: c.sectionName,
        sectionId: c.sectionId,
        isVisible: c.isVisible,
        customSortOrder: c.customSortOrder || 0,
      })));
    } catch (err) {
      console.error(err);
    }
  }

  toggleItemVisibility(itemId: number) {
    const configs = this.userConfigs().map(c =>
      c.itemId === itemId ? { ...c, isVisible: !c.isVisible } : c
    );
    this.userConfigs.set(configs);
  }

  toggleAllInSection(sectionId: number, visible: boolean) {
    const configs = this.userConfigs().map(c =>
      c.sectionId === sectionId ? { ...c, isVisible: visible } : c
    );
    this.userConfigs.set(configs);
  }

  getSectionNames(): string[] {
    const names: string[] = [];
    for (const c of this.userConfigs()) {
      if (!names.includes(c.sectionName)) names.push(c.sectionName);
    }
    return names;
  }

  getItemsForSection(sectionName: string): UserConfig[] {
    return this.userConfigs()
      .filter(c => c.sectionName === sectionName)
      .sort((a, b) => a.customSortOrder - b.customSortOrder);
  }

  getSectionId(sectionName: string): number {
    const item = this.userConfigs().find(c => c.sectionName === sectionName);
    return item?.sectionId || 0;
  }

  isSectionAllVisible(sectionName: string): boolean {
    return this.getItemsForSection(sectionName).every(c => c.isVisible);
  }

  isSectionNoneVisible(sectionName: string): boolean {
    return this.getItemsForSection(sectionName).every(c => !c.isVisible);
  }

  // Drag & Drop for reordering items within a section
  onDragStart(event: DragEvent, index: number, sectionName: string) {
    this.draggedIndex.set(index);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', `${sectionName}:${index}`);
    }
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    this.dragOverIndex.set(index);
  }

  onDragLeave() {
    this.dragOverIndex.set(null);
  }

  onDrop(event: DragEvent, dropIndex: number, sectionName: string) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    if (!data) return;

    const [sourceSec, sourceIdxStr] = data.split(':');
    if (sourceSec !== sectionName) return; // Only reorder within same section

    const sourceIdx = parseInt(sourceIdxStr);
    const sectionItems = this.getItemsForSection(sectionName);
    const item = sectionItems[sourceIdx];
    if (!item) return;

    // Reorder
    const newItems = [...sectionItems];
    newItems.splice(sourceIdx, 1);
    newItems.splice(dropIndex, 0, item);

    // Update sort orders
    const updatedConfigs = this.userConfigs().map(c => {
      if (c.sectionName === sectionName) {
        const newIdx = newItems.findIndex(ni => ni.itemId === c.itemId);
        return { ...c, customSortOrder: newIdx };
      }
      return c;
    });

    this.userConfigs.set(updatedConfigs);
    this.draggedIndex.set(null);
    this.dragOverIndex.set(null);
  }

  onDragEnd() {
    this.draggedIndex.set(null);
    this.dragOverIndex.set(null);
  }

  async saveUserConfig() {
    const user = this.selectedUser();
    if (!user) return;

    this.savingUser.set(true);
    try {
      const items = this.userConfigs().map(c => ({
        sidebarItemId: c.itemId,
        isVisible: c.isVisible,
        customSortOrder: c.customSortOrder,
      }));
      await this.api.updateUserSidebar(this.bizId, user.id, { items });
      this.showMessage('تم حفظ إعدادات التبويب بنجاح', 'success');
    } catch (err) {
      this.showMessage('حدث خطأ أثناء الحفظ', 'error');
    } finally {
      this.savingUser.set(false);
    }
  }

  // ==================== Sections Tab ====================
  openSectionForm(section?: SidebarSection) {
    if (section) {
      this.editingSection.set(section);
      this.sectionForm.set({ name: section.name, icon: section.icon, sortOrder: section.sortOrder });
    } else {
      this.editingSection.set(null);
      const maxOrder = Math.max(0, ...this.sections().map(s => s.sortOrder));
      this.sectionForm.set({ name: '', icon: 'folder', sortOrder: maxOrder + 1 });
    }
    this.showSectionForm.set(true);
  }

  closeSectionForm() {
    this.showSectionForm.set(false);
    this.editingSection.set(null);
  }

  async saveSection() {
    const form = this.sectionForm();
    if (!form.name.trim()) return;

    try {
      const editing = this.editingSection();
      if (editing) {
        await this.api.updateSidebarSection(editing.id, form);
        this.showMessage('تم تحديث القسم بنجاح', 'success');
      } else {
        await this.api.createSidebarSection(this.bizId, form);
        this.showMessage('تم إضافة القسم بنجاح', 'success');
      }
      this.closeSectionForm();
      await this.loadData();
    } catch (err) {
      this.showMessage('حدث خطأ', 'error');
    }
  }

  async deleteSection(section: SidebarSection) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: `هل تريد حذف القسم "${section.name}"؟ سيتم حذف جميع العناصر بداخله.`, type: 'danger' });
    if (!confirmed) return;
    try {
      await this.api.deleteSidebarSection(section.id);
      this.showMessage('تم حذف القسم', 'success');
      await this.loadData();
    } catch (err) {
      this.showMessage('حدث خطأ أثناء الحذف', 'error');
    }
  }

  // ==================== Items Tab ====================
  openItemForm(item?: SidebarItem) {
    if (item) {
      this.editingItem.set(item);
      this.itemForm.set({
        sectionId: item.sectionId,
        screenKey: item.screenKey,
        label: item.label,
        icon: item.icon,
        route: item.route,
        sortOrder: item.sortOrder,
      });
    } else {
      this.editingItem.set(null);
      this.itemForm.set({
        sectionId: this.sections().length > 0 ? this.sections()[0].id : 0,
        screenKey: '', label: '', icon: 'circle', route: '', sortOrder: 0,
      });
    }
    this.showItemForm.set(true);
  }

  closeItemForm() {
    this.showItemForm.set(false);
    this.editingItem.set(null);
  }

  async saveItem() {
    const form = this.itemForm();
    if (!form.label.trim() || !form.screenKey.trim()) return;

    try {
      const editing = this.editingItem();
      if (editing) {
        await this.api.updateSidebarItem(editing.id, form);
        this.showMessage('تم تحديث العنصر بنجاح', 'success');
      } else {
        await this.api.createSidebarItem(form);
        this.showMessage('تم إضافة العنصر بنجاح', 'success');
      }
      this.closeItemForm();
      await this.loadData();
    } catch (err) {
      this.showMessage('حدث خطأ', 'error');
    }
  }

  async deleteItem(item: SidebarItem) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: `هل تريد حذف العنصر "${item.label}"؟`, type: 'danger' });
    if (!confirmed) return;
    try {
      await this.api.deleteSidebarItem(item.id);
      this.showMessage('تم حذف العنصر', 'success');
      await this.loadData();
    } catch (err) {
      this.showMessage('حدث خطأ أثناء الحذف', 'error');
    }
  }

  getItemsBySection(sectionId: number): SidebarItem[] {
    return this.allItems().filter(i => i.sectionId === sectionId);
  }

  getSectionNameById(id: number): string {
    return this.sections().find(s => s.id === id)?.name || '';
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'admin': return 'مدير النظام';
      case 'accountant': return 'محاسب';
      case 'manager': return 'مدير محطة';
      case 'viewer': return 'مشاهد';
      default: return 'مستخدم';
    }
  }

  getRoleIcon(role: string): string {
    switch (role) {
      case 'admin': return 'admin_panel_settings';
      case 'accountant': return 'calculate';
      case 'manager': return 'manage_accounts';
      case 'viewer': return 'visibility';
      default: return 'person';
    }
  }

  // Common icons list for selection
  commonIcons = [
    'dashboard', 'bolt', 'receipt_long', 'receipt', 'account_balance_wallet',
    'category', 'savings', 'menu_book', 'currency_exchange', 'groups',
    'handshake', 'warehouse', 'local_shipping', 'balance', 'assessment',
    'warning', 'tune', 'settings', 'home', 'folder', 'circle',
    'payments', 'people', 'summarize', 'arrow_forward',
  ];

  private showMessage(text: string, type: 'success' | 'error') {
    this.message.set(text);
    this.messageType.set(type);
    setTimeout(() => this.message.set(''), 3000);
  }
}
