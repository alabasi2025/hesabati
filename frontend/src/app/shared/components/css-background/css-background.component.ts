import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-css-background',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg" [class]="variant">
      <div class="grad"></div>
      <div class="grid"></div>
      <div class="orb o1"></div>
      <div class="orb o2"></div>
      <div class="orb o3"></div>
      @for (p of dots; track $index) {
        <span class="dot" [style.left.%]="p.x" [style.top.%]="p.y"
              [style.animationDelay]="p.d + 's'" [style.animationDuration]="p.s + 's'"></span>
      }
    </div>
  `,
  styles: [`
    :host { display: block; position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
    .bg { position: absolute; inset: 0; }

    .grad {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 30% 20%, rgba(99,102,241,.12) 0%, transparent 60%),
                  radial-gradient(ellipse at 70% 80%, rgba(14,165,233,.08) 0%, transparent 60%);
    }
    .login .grad {
      background: radial-gradient(ellipse at 50% 30%, rgba(99,102,241,.18) 0%, transparent 55%),
                  radial-gradient(ellipse at 20% 80%, rgba(236,72,153,.1) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 70%, rgba(14,165,233,.1) 0%, transparent 50%);
    }

    .grid {
      position: absolute; inset: 0; opacity: .03;
      background-image: linear-gradient(rgba(99,102,241,.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99,102,241,.5) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .login .grid { opacity: .04; background-size: 50px 50px; }

    .orb {
      position: absolute; border-radius: 50%; filter: blur(80px); opacity: .35;
      will-change: transform;
      animation: orbFloat 20s ease-in-out infinite;
    }
    .o1 { width: 300px; height: 300px; top: 10%; right: 15%; background: rgba(99,102,241,.25); animation-duration: 22s; }
    .o2 { width: 250px; height: 250px; bottom: 15%; left: 10%; background: rgba(14,165,233,.2); animation-duration: 18s; animation-delay: -5s; }
    .o3 { width: 200px; height: 200px; top: 50%; left: 50%; background: rgba(168,85,247,.15); animation-duration: 25s; animation-delay: -10s; }
    .login .orb { opacity: .45; }
    .login .o1 { background: rgba(99,102,241,.3); }
    .login .o2 { background: rgba(236,72,153,.2); }

    @keyframes orbFloat {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(30px, -20px) scale(1.05); }
      50% { transform: translate(-20px, 15px) scale(.95); }
      75% { transform: translate(15px, 25px) scale(1.02); }
    }

    .dot {
      position: absolute; width: 2px; height: 2px; border-radius: 50%;
      background: rgba(99,102,241,.3); opacity: 0;
      animation: dotPulse 4s ease-in-out infinite;
    }
    .login .dot { background: rgba(165,180,252,.4); }

    @keyframes dotPulse {
      0%, 100% { opacity: 0; transform: scale(.6); }
      50% { opacity: .7; transform: scale(1.4); }
    }
  `],
})
export class CssBackgroundComponent {
  @Input() variant: 'login' | 'dashboard' | 'page' = 'dashboard';

  readonly dots = Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    d: Math.random() * 5,
    s: 3 + Math.random() * 4,
  }));
}
