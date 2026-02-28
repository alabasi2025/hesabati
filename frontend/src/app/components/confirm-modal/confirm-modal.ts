import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss',
})
export class ConfirmModalComponent {
  toast = inject(ToastService);

  getIcon(): string {
    const type = this.toast.confirmOptions().type;
    switch (type) {
      case 'danger':  return 'warning';
      case 'warning': return 'help_outline';
      case 'info':    return 'info';
      default:        return 'warning';
    }
  }

  getIconClass(): string {
    const type = this.toast.confirmOptions().type;
    switch (type) {
      case 'danger':  return 'red';
      case 'warning': return 'amber';
      case 'info':    return 'blue';
      default:        return 'red';
    }
  }

  onConfirm() {
    this.toast.resolveConfirm(true);
  }

  onCancel() {
    this.toast.resolveConfirm(false);
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('confirm-overlay')) {
      this.onCancel();
    }
  }
}
