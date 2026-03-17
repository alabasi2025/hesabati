import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-job-titles',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent],
  templateUrl: './job-titles.html',
  styleUrl: './job-titles.scss',
})
export class JobTitlesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  jobTitles = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);

  form: any = {
    name: '', description: '', icon: 'badge', color: '#f59e0b',
  };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getJobTitles(this.bizId);
      this.jobTitles.set(data || []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  openAdd() {
    this.form = { name: '', description: '', icon: 'badge', color: '#f59e0b' };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(j: any) {
    this.form = {
      name: j.name, description: j.description || '',
      icon: j.icon || 'badge', color: j.color || '#f59e0b',
    };
    this.editingId.set(j.id);
    this.showForm.set(true);
  }

  async save() {
    if (!this.form.name?.trim()) {
      this.toast.error('يرجى إدخال المسمى الوظيفي');
      return;
    }
    try {
      if (this.editingId()) {
        await this.api.updateJobTitle(this.editingId()!, this.form);
        this.toast.success('تم تعديل المسمى الوظيفي بنجاح');
      } else {
        await this.api.createJobTitle(this.bizId, this.form);
        this.toast.success('تم إضافة المسمى الوظيفي بنجاح');
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
    }
  }

  async remove(j: any) {
    const confirmed = await this.toast.confirm({
      title: 'تأكيد الحذف',
      message: `هل أنت متأكد من حذف المسمى الوظيفي "${j.name}"؟`,
      type: 'danger',
    });
    if (confirmed) {
      try {
        await this.api.deleteJobTitle(j.id);
        this.toast.success('تم حذف المسمى الوظيفي');
        await this.load();
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
      }
    }
  }

  availableIcons = [
    'badge', 'person', 'work', 'engineering', 'supervisor_account',
    'manage_accounts', 'admin_panel_settings', 'support_agent', 'school', 'military_tech',
    'local_police', 'health_and_safety', 'construction', 'precision_manufacturing', 'science',
  ];
}
