import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: number;
  type: ToastType;
  title: string;
  message: string;
  duration: number;
  removing?: boolean;
}

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;
  toasts = signal<ToastMessage[]>([]);

  /* ── confirm modal state ── */
  showConfirm = signal(false);
  confirmOptions = signal<ConfirmOptions>({ message: '' });
  private confirmResolver: ((value: boolean) => void) | null = null;

  /* ── toast helpers ── */
  success(message: string, title = 'تمت العملية بنجاح', duration = 4000) {
    this.add('success', title, message, duration);
  }

  error(message: string, title = 'حدث خطأ', duration = 0) {
    this.add('error', title, message, duration);
  }

  warning(message: string, title = 'تنبيه', duration = 4500) {
    this.add('warning', title, message, duration);
  }

  info(message: string, title = 'معلومة', duration = 4000) {
    this.add('info', title, message, duration);
  }

  private add(type: ToastType, title: string, message: string, duration: number) {
    const id = ++this.counter;
    const toast: ToastMessage = { id, type, title, message, duration };
    this.toasts.update(list => [...list, toast]);

    if (duration > 0) {
      setTimeout(() => this.startRemove(id), duration);
    }
  }

  startRemove(id: number) {
    this.toasts.update(list =>
      list.map(t => (t.id === id ? { ...t, removing: true } : t))
    );
    setTimeout(() => this.remove(id), 350);
  }

  remove(id: number) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  /* ── confirm dialog ── */
  confirm(options: ConfirmOptions | string): Promise<boolean> {
    const opts: ConfirmOptions =
      typeof options === 'string' ? { message: options } : options;

    if (!opts.title) opts.title = 'تأكيد';
    if (!opts.confirmText) opts.confirmText = 'تأكيد';
    if (!opts.cancelText) opts.cancelText = 'إلغاء';
    if (!opts.type) opts.type = 'danger';

    this.confirmOptions.set(opts);
    this.showConfirm.set(true);

    return new Promise<boolean>(resolve => {
      this.confirmResolver = resolve;
    });
  }

  resolveConfirm(result: boolean) {
    this.showConfirm.set(false);
    if (this.confirmResolver) {
      this.confirmResolver(result);
      this.confirmResolver = null;
    }
  }
}
