import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

/**
 * خدمة حوارات التأكيد — تصميم Valex + RTL
 * الاستخدام:
 *   const ok = await confirmDialog.confirm('حذف السجل', 'هل أنت متأكد من الحذف؟');
 *   if (ok) { ... }
 */
@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {

  /** إعدادات أساسية مشتركة RTL */
  private baseConfig() {
    return {
      customClass: {
        popup:          'valex-swal-popup',
        title:          'valex-swal-title',
        htmlContainer:  'valex-swal-html',
        confirmButton:  'valex-swal-confirm',
        cancelButton:   'valex-swal-cancel',
        icon:           'valex-swal-icon',
      },
      reverseButtons: true,
      focusCancel: true,
    };
  }

  /** حوار تأكيد عام — زر أزرق */
  async confirm(title: string, message: string): Promise<boolean> {
    const result: SweetAlertResult = await Swal.fire({
      ...this.baseConfig(),
      title,
      html: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText:  'إلغاء',
      confirmButtonColor: '#6366f1',
      cancelButtonColor:  '#94a3b8',
    });
    return result.isConfirmed;
  }

  /** حوار خطر — زر أحمر (للحذف وغيره) */
  async danger(title: string, message: string): Promise<boolean> {
    const result: SweetAlertResult = await Swal.fire({
      ...this.baseConfig(),
      title,
      html: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، تأكيد',
      cancelButtonText:  'إلغاء',
      confirmButtonColor: '#ef4444',
      cancelButtonColor:  '#94a3b8',
    });
    return result.isConfirmed;
  }

  /** إشعار نجاح */
  async success(title: string, message?: string): Promise<void> {
    await Swal.fire({
      ...this.baseConfig(),
      title,
      html: message,
      icon: 'success',
      confirmButtonText: 'حسناً',
      confirmButtonColor: '#22c55e',
      timer: message ? undefined : 1800,
      timerProgressBar: !message,
    });
  }

  /** إشعار معلومات */
  async info(title: string, message: string): Promise<void> {
    await Swal.fire({
      ...this.baseConfig(),
      title,
      html: message,
      icon: 'info',
      confirmButtonText: 'حسناً',
      confirmButtonColor: '#6366f1',
    });
  }
}
