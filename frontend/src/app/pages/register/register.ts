import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ThreeBackgroundComponent } from '../../components/three-background/three-background';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, ThreeBackgroundComponent],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  username = signal('');
  password = signal('');
  fullName = signal('');
  role = signal('viewer');
  isLoading = signal(false);
  error = signal('');
  showPassword = signal(false);

  roleOptions = [
    { value: 'viewer', label: 'مشاهد' },
    { value: 'accountant', label: 'محاسب' },
    { value: 'manager', label: 'مدير' },
    { value: 'admin', label: 'مدير النظام' },
  ];

  async onRegister() {
    const u = this.username().trim();
    const p = this.password();
    const name = this.fullName().trim();

    if (!u || !p || !name) {
      this.error.set('يرجى تعبئة جميع الحقول المطلوبة');
      return;
    }
    if (p.length < 6) {
      this.error.set('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    try {
      await this.auth.register(u, p, name, this.role());
      this.router.navigate(['/login']);
      // يمكن عرض رسالة نجاح عبر خدمة أو query param
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'فشل إنشاء الحساب');
    } finally {
      this.isLoading.set(false);
    }
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }
}
