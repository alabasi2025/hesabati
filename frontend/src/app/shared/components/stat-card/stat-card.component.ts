import {
  Component, Input, inject, ChangeDetectionStrategy
} from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

/**
 * بطاقة إحصائيات — تصميم Valex
 * تدعم: عنوان، قيمة، أيقونة في دائرة ملونة، نسبة التغيير
 */
@Component({
  selector: 'app-stat-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stat-card-valex" [class.light-mode]="!isDark"
         (mouseenter)="isHovered = true" (mouseleave)="isHovered = false"
         [class.hovered]="isHovered">

      <!-- Background Effects -->
      <div class="card-bg-effect">
        <div class="floating-shape shape-1" [style.background]="color + '33'"></div>
        <div class="floating-shape shape-2" [style.background]="color + '22'"></div>
        <div class="particle-dots">
          @for (d of dots; track $index) {
            <span class="dot" [style.left.%]="d.x" [style.top.%]="d.y"
                  [style.animation-delay]="d.delay + 's'" [style.background]="color + '44'"></span>
          }
        </div>
      </div>

      <!-- Content -->
      <div class="stat-content">
        <!-- Icon Circle -->
        <div class="stat-icon-wrap" [style.background]="color + '22'">
          <span class="material-icons-round" [style.color]="color">{{ icon }}</span>
        </div>

        <!-- Info -->
        <div class="stat-info">
          <span class="stat-value">{{ formattedValue }}</span>
          <span class="stat-label">{{ title || label }}</span>

          @if (change !== undefined) {
            <div class="stat-change" [class.up]="changeType === 'up'" [class.down]="changeType === 'down'">
              <span class="material-icons-round change-icon">
                {{ changeType === 'up' ? 'trending_up' : changeType === 'down' ? 'trending_down' : 'trending_flat' }}
              </span>
              <span>{{ change }}%</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes floatShape1 {
      0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
      25% { transform: translate(10px, -15px) rotate(45deg) scale(1.1); }
      50% { transform: translate(-5px, -25px) rotate(90deg) scale(0.95); }
      75% { transform: translate(15px, -10px) rotate(135deg) scale(1.05); }
    }
    @keyframes floatShape2 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(-12px, 10px) rotate(-60deg); }
      66% { transform: translate(8px, -8px) rotate(60deg); }
    }
    @keyframes dotPulse {
      0%, 100% { opacity: 0.2; transform: scale(0.8); }
      50% { opacity: 0.7; transform: scale(1.2); }
    }

    :host { display: block; }

    .stat-card-valex {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(99, 102, 241, 0.15);
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
      cursor: pointer;
    }
    .stat-card-valex.light-mode {
      background: rgba(255, 255, 255, 0.92);
      border-color: rgba(99, 102, 241, 0.12);
    }
    .stat-card-valex.hovered {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
      border-color: rgba(99, 102, 241, 0.3);
    }
    .stat-card-valex.light-mode.hovered {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    }

    .card-bg-effect {
      position: absolute; inset: 0; z-index: 0;
      opacity: 0.35; transition: opacity 0.3s ease; overflow: hidden;
    }
    .stat-card-valex.hovered .card-bg-effect { opacity: 0.65; }

    .floating-shape { position: absolute; border-radius: 30%; filter: blur(8px); }
    .shape-1 { width: 60px; height: 60px; top: -10px; right: -10px; animation: floatShape1 8s ease-in-out infinite; }
    .shape-2 { width: 45px; height: 45px; bottom: -5px; left: 10px; animation: floatShape2 10s ease-in-out infinite; }

    .particle-dots { position: absolute; inset: 0; }
    .dot { position: absolute; width: 3px; height: 3px; border-radius: 50%; animation: dotPulse 3s ease-in-out infinite; }

    .stat-content { position: relative; z-index: 1; display: flex; align-items: center; gap: 16px; padding: 20px 24px; }

    .stat-icon-wrap {
      width: 54px; height: 54px; border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: transform 0.3s ease;
    }
    .stat-card-valex.hovered .stat-icon-wrap { transform: scale(1.1) rotate(-5deg); }
    .stat-icon-wrap .material-icons-round { font-size: 28px; }

    .stat-info { display: flex; flex-direction: column; gap: 3px; }
    .stat-value { font-size: 1.65rem; font-weight: 700; color: #f1f5f9; letter-spacing: -0.02em; line-height: 1; }
    .light-mode .stat-value { color: #0f172a; }
    .stat-label { font-size: 0.84rem; color: #94a3b8; font-weight: 500; }
    .light-mode .stat-label { color: #64748b; }

    .stat-change {
      display: flex; align-items: center; gap: 4px;
      font-size: 0.78rem; font-weight: 600; margin-top: 2px;
      color: #94a3b8;
    }
    .stat-change.up { color: #22c55e; }
    .stat-change.down { color: #ef4444; }
    .change-icon { font-size: 15px; }
  `],
})
export class StatCardComponent {
  /** عنوان البطاقة */
  @Input() title = '';
  /** للتوافق مع الاستخدام القديم */
  @Input() label = '';
  /** القيمة الرقمية */
  @Input() value = 0;
  /** اسم الأيقونة (Material Icons) */
  @Input() icon = 'analytics';
  /** لون الأيقونة والتأثيرات (hex) */
  @Input() color = '#6366f1';
  /** نسبة التغيير (اختياري) */
  @Input() change?: number;
  /** اتجاه التغيير: up | down | neutral */
  @Input() changeType: 'up' | 'down' | 'neutral' = 'neutral';

  private theme = inject(ThemeService);
  isHovered = false;

  dots = Array.from({ length: 6 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  get isDark(): boolean {
    return this.theme.isDark?.() ?? true;
  }

  get formattedValue(): string {
    return new Intl.NumberFormat('ar-YE').format(this.value);
  }
}

/** @deprecated استخدم StatCardComponent بدلاً منه */
export { StatCardComponent as ThreeStatCardComponent };
