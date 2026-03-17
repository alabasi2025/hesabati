import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

type TreasuryType = 'fund' | 'bank' | 'exchange' | 'e_wallet';

interface ArchiveSettings {
  basePath: string;
  folderByType: Record<TreasuryType, string>;
  voucherFolders: { receipt: string; payment: string };
  importanceLevels: string[];
}

@Component({
  selector: 'app-attachments-archive',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent],
  templateUrl: './attachments-archive.html',
  styleUrl: './attachments-archive.scss',
})
export class AttachmentsArchiveComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  loading = signal(true);
  saving = signal(false);
  creatingTree = signal(false);
  choosingBasePath = signal(false);
  showPathPicker = signal(false);
  pathPickerLoading = signal(false);
  pathPickerCurrentPath = signal('');
  pathPickerParentPath = signal<string | null>(null);
  pathPickerEntries = signal<Array<{ name: string; fullPath: string; isDirectory: boolean }>>([]);
  newFolderName = signal('');
  creatingFolder = signal(false);
  funds = signal<any[]>([]);
  accounts = signal<any[]>([]);
  archiveItems = signal<any[]>([]);
  refreshingItems = signal(false);
  form = signal<ArchiveSettings>(this.getDefaultSettings());
  filters = signal<{ search: string; voucherType: string; treasuryType: string; importance: string }>({
    search: '',
    voucherType: '',
    treasuryType: '',
    importance: '',
  });

  protected override onBizIdChange(): void {
    void this.load();
  }

  private getDefaultSettings(): ArchiveSettings {
    return {
      basePath: String.raw`D:\Archive\Attachments`,
      folderByType: {
        fund: 'صندوق',
        bank: 'بنك',
        exchange: 'صراف',
        e_wallet: 'محفظة',
      },
      voucherFolders: {
        receipt: 'سند قبض',
        payment: 'سند صرف',
      },
      importanceLevels: ['عاجل', 'مهم', 'عادي'],
    };
  }

  private normalizeSettings(raw: any): ArchiveSettings {
    const defaults = this.getDefaultSettings();
    const importance = Array.isArray(raw?.importanceLevels)
      ? raw.importanceLevels.map((v: any) => String(v || '').trim()).filter(Boolean)
      : [];
    return {
      basePath: String(raw?.basePath || defaults.basePath),
      folderByType: {
        fund: String(raw?.folderByType?.fund || defaults.folderByType.fund),
        bank: String(raw?.folderByType?.bank || defaults.folderByType.bank),
        exchange: String(raw?.folderByType?.exchange || defaults.folderByType.exchange),
        e_wallet: String(raw?.folderByType?.e_wallet || defaults.folderByType.e_wallet),
      },
      voucherFolders: {
        receipt: String(raw?.voucherFolders?.receipt || defaults.voucherFolders.receipt),
        payment: String(raw?.voucherFolders?.payment || defaults.voucherFolders.payment),
      },
      importanceLevels: importance.length ? importance : defaults.importanceLevels,
    };
  }

  async load() {
    this.loading.set(true);
    try {
      const [settings, funds, accounts] = await Promise.all([
        this.api.getAttachmentsArchiveSettings(this.bizId),
        this.api.getFunds(this.bizId, true),
        this.api.getAccounts(this.bizId),
      ]);
      this.form.set(this.normalizeSettings(settings));
      this.funds.set(Array.isArray(funds) ? funds : []);
      this.accounts.set(Array.isArray(accounts) ? accounts : []);
      await this.loadArchiveItems();
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'تعذر تحميل إعدادات الأرشفة');
    } finally {
      this.loading.set(false);
    }
  }

  setBasePath(value: string) {
    this.form.update((prev) => ({ ...prev, basePath: value }));
  }

  async openPathPicker() {
    this.showPathPicker.set(true);
    await this.loadPathPicker('');
  }

  closePathPicker() {
    this.showPathPicker.set(false);
  }

  async loadPathPicker(dirPath: string) {
    this.pathPickerLoading.set(true);
    this.choosingBasePath.set(true);
    try {
      const result = await this.api.browseAttachmentsArchiveFs(this.bizId, dirPath || undefined);
      this.pathPickerCurrentPath.set(String(result?.currentPath || ''));
      this.pathPickerParentPath.set(result?.parentPath ? String(result.parentPath) : null);
      this.pathPickerEntries.set(Array.isArray(result?.entries) ? result.entries : []);
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'تعذر استعراض مجلدات الجهاز');
    } finally {
      this.pathPickerLoading.set(false);
      this.choosingBasePath.set(false);
    }
  }

  async goToParentPath() {
    const parent = this.pathPickerParentPath();
    if (!parent) return;
    await this.loadPathPicker(parent);
  }

  async openPathEntry(entry: { fullPath: string }) {
    await this.loadPathPicker(entry.fullPath);
  }

  chooseCurrentPathFromPicker() {
    const current = this.pathPickerCurrentPath();
    if (!current) return;
    this.setBasePath(current);
    this.showPathPicker.set(false);
    this.toast.success('تم اختيار المجلد');
  }

  setNewFolderName(value: string) {
    this.newFolderName.set(String(value || ''));
  }

  async createFolderInPicker() {
    const currentPath = this.pathPickerCurrentPath();
    const folderName = this.newFolderName().trim();
    if (!currentPath) {
      this.toast.warning('اختر مسارًا أولاً ثم أنشئ المجلد');
      return;
    }
    if (!folderName) {
      this.toast.warning('اكتب اسم المجلد الجديد');
      return;
    }
    this.creatingFolder.set(true);
    try {
      const response = await this.api.createAttachmentsArchiveFolder(this.bizId, currentPath, folderName);
      const createdPath = String(response?.createdPath || '').trim();
      this.newFolderName.set('');
      await this.loadPathPicker(currentPath);
      if (createdPath) await this.loadPathPicker(createdPath);
      this.toast.success('تم إنشاء المجلد والدخول إليه');
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'تعذر إنشاء المجلد');
    } finally {
      this.creatingFolder.set(false);
    }
  }

  setFolderByType(type: TreasuryType, value: string) {
    this.form.update((prev) => ({
      ...prev,
      folderByType: { ...prev.folderByType, [type]: value },
    }));
  }

  setVoucherFolder(kind: 'receipt' | 'payment', value: string) {
    this.form.update((prev) => ({
      ...prev,
      voucherFolders: { ...prev.voucherFolders, [kind]: value },
    }));
  }

  setImportanceLevels(value: string) {
    const levels = value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
    this.form.update((prev) => ({ ...prev, importanceLevels: levels }));
  }

  async saveSettings() {
    this.saving.set(true);
    try {
      const payload = this.form();
      const response = await this.api.saveAttachmentsArchiveSettings(this.bizId, payload);
      const dirs = Number(response?.treeResult?.directories || 0);
      this.toast.success(`تم حفظ الإعدادات وإنشاء ${dirs} مجلد تلقائياً`);
      await this.loadArchiveItems();
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'تعذر حفظ إعدادات الأرشفة');
    } finally {
      this.saving.set(false);
    }
  }

  private filterAccountsByType(type: TreasuryType): any[] {
    return this.accounts().filter((acc) => {
      const accountType = String(acc?.accountType ?? acc?.account_type ?? '').toLowerCase();
      return accountType === type;
    });
  }

  treePreview = computed(() => {
    const cfg = this.form();
    const byType = [
      { type: 'fund' as TreasuryType, label: cfg.folderByType.fund, rows: this.funds() },
      { type: 'bank' as TreasuryType, label: cfg.folderByType.bank, rows: this.filterAccountsByType('bank') },
      { type: 'exchange' as TreasuryType, label: cfg.folderByType.exchange, rows: this.filterAccountsByType('exchange') },
      { type: 'e_wallet' as TreasuryType, label: cfg.folderByType.e_wallet, rows: this.filterAccountsByType('e_wallet') },
    ];

    return byType.map((section) => ({
      ...section,
      items: section.rows.map((row: any) => ({
        id: row?.id,
        name: String(row?.name || row?.label || `عنصر ${row?.id ?? ''}`),
        receiptFolder: cfg.voucherFolders.receipt,
        paymentFolder: cfg.voucherFolders.payment,
      })),
    }));
  });

  async loadArchiveItems() {
    this.refreshingItems.set(true);
    try {
      const f = this.filters();
      const rows = await this.api.getAttachmentsArchiveItems(this.bizId, {
        search: f.search || undefined,
        voucherType: f.voucherType || undefined,
        treasuryType: f.treasuryType || undefined,
        importance: f.importance || undefined,
      });
      this.archiveItems.set(Array.isArray(rows) ? rows : []);
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'تعذر تحميل عناصر الأرشفة');
    } finally {
      this.refreshingItems.set(false);
    }
  }

  setFilter<K extends 'search' | 'voucherType' | 'treasuryType' | 'importance'>(key: K, value: string) {
    this.filters.update((prev) => ({ ...prev, [key]: String(value || '') }));
  }

  async applyFilters() {
    await this.loadArchiveItems();
  }

  async clearFilters() {
    this.filters.set({ search: '', voucherType: '', treasuryType: '', importance: '' });
    await this.loadArchiveItems();
  }

  async rebuildAttachmentPath(item: any) {
    const importance = String(item?.importance || this.form().importanceLevels[2] || 'عادي');
    try {
      await this.api.rebuildAttachmentArchivePath(this.bizId, Number(item.id), importance);
      this.toast.success('تمت إعادة توليد المسار');
      await this.loadArchiveItems();
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'تعذر إعادة توليد المسار');
    }
  }

  stats = computed(() => {
    const rows = this.archiveItems();
    const total = rows.length;
    const receipts = rows.filter((r) => r.voucherType === 'receipt').length;
    const payments = rows.filter((r) => r.voucherType === 'payment').length;
    const urgent = rows.filter((r) => r.importance === 'عاجل').length;
    return { total, receipts, payments, urgent };
  });

  async buildTreeNow() {
    this.creatingTree.set(true);
    try {
      const response = await this.api.buildAttachmentsArchiveTree(this.bizId);
      const dirs = Number(response?.treeResult?.directories || 0);
      this.toast.success(`تم إنشاء ${dirs} مجلد داخل مسار الأرشفة`);
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'تعذر إنشاء مجلدات الأرشفة');
    } finally {
      this.creatingTree.set(false);
    }
  }
}
