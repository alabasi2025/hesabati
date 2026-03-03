import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy,
  Input, inject, ChangeDetectionStrategy
} from '@angular/core';
import { Mesh, Vector3 } from 'three';
import { ThreeService } from '../../services/three.service';

export interface NetworkNode {
  id: string;
  label: string;
  value?: number;
  color?: string;
  group?: string;
}

export interface NetworkLink {
  source: string;
  target: string;
  value?: number;
}

@Component({
  selector: 'app-three-network',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #networkCanvas class="three-network-canvas"></div>`,
  styles: [`
    :host { display: block; width: 100%; height: 100%; min-height: 300px; }
    .three-network-canvas { width: 100%; height: 100%; border-radius: 12px; overflow: hidden; }
  `],
})
export class ThreeNetworkComponent implements AfterViewInit, OnDestroy {
  @ViewChild('networkCanvas') canvasRef!: ElementRef<HTMLElement>;

  @Input() nodes: NetworkNode[] = [];
  @Input() links: NetworkLink[] = [];
  @Input() title = '';

  private three = inject(ThreeService);
  private sceneId = 'network-' + Math.random().toString(36).slice(2, 8);
  private nodeMeshes = new Map<string, Mesh>();

  private defaultColors = [
    0x6366f1, 0x06b6d4, 0x10b981, 0xf59e0b,
    0xef4444, 0x8b5cf6, 0xec4899, 0x14b8a6,
  ];

  ngAfterViewInit(): void {
    const container = this.canvasRef?.nativeElement;
    if (!container || !this.nodes.length) return;

    const managed = this.three.createScene(this.sceneId, container, {
      clearColor: 0x0a0e1a,
      clearAlpha: 0.95,
      pixelRatio: 1.0,
      fog: { color: 0x0a0e1a, near: 10, far: 50 },
      camera: { fov: 55, position: [0, 5, 15], lookAt: [0, 0, 0] },
      ambient: { color: 0xffffff, intensity: 0.4 },
      directional: { color: 0xffffff, intensity: 0.7, position: [5, 10, 5] },
    });

    const { scene } = managed;

    // توزيع العقد في فضاء ثلاثي الأبعاد
    const groupColors = new Map<string, number>();
    let groupIdx = 0;

    this.nodes.forEach((node, i) => {
      const angle = (i / this.nodes.length) * Math.PI * 2;
      const radius = 3 + Math.random() * 3;
      const y = (Math.random() - 0.5) * 4;

      const color = node.color
        ? parseInt(node.color.replace('#', ''), 16)
        : (() => {
            if (node.group && !groupColors.has(node.group)) {
              groupColors.set(node.group, this.defaultColors[groupIdx++ % this.defaultColors.length]);
            }
            return groupColors.get(node.group || '') || this.defaultColors[i % this.defaultColors.length];
          })();

      const size = 0.3 + (node.value || 1) * 0.1;
      const sphere = this.three.createGlowSphere(
        Math.min(size, 1),
        color,
        0.6,
        [Math.cos(angle) * radius, y, Math.sin(angle) * radius]
      );
      (sphere as any)._basePos = sphere.position.clone();
      (sphere as any)._floatOffset = Math.random() * Math.PI * 2;
      this.nodeMeshes.set(node.id, sphere);
      scene.add(sphere);

      // تسمية
      const label = this.three.createTextSprite(
        node.label,
        '#e2e8f0',
        28,
        [sphere.position.x, sphere.position.y + size + 0.4, sphere.position.z]
      );
      label.scale.set(2, 0.5, 1);
      scene.add(label);
    });

    // إنشاء الروابط
    this.links.forEach(link => {
      const srcMesh = this.nodeMeshes.get(link.source);
      const tgtMesh = this.nodeMeshes.get(link.target);
      if (srcMesh && tgtMesh) {
        const line = this.three.createCurvedLine(
          srcMesh.position,
          tgtMesh.position,
          0x475569,
          0.5 + Math.random() * 1
        );
        scene.add(line);
      }
    });

    // جسيمات خلفية — مخفضة من 200 إلى 80
    const particles = this.three.createParticleSystem(80, 25, 0x475569, 0.02);
    scene.add(particles);

    // عنوان
    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, '#f8fafc', 44, [0, 6, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }

    // حلقة الرسم
    this.three.animate(this.sceneId, (delta, elapsed) => {
      // تحريك العقد
      this.nodeMeshes.forEach(mesh => {
        const base = (mesh as any)._basePos as Vector3;
        const offset = (mesh as any)._floatOffset as number;
        mesh.position.y = base.y + Math.sin(elapsed * 0.5 + offset) * 0.3;
        mesh.rotation.y += delta * 0.3;
      });

      // تحريك الجسيمات
      this.three.animateParticles(particles, delta, 25);

      // دوران الكاميرا
      managed.camera.position.x = Math.sin(elapsed * 0.08) * 15;
      managed.camera.position.z = Math.cos(elapsed * 0.08) * 15;
      managed.camera.lookAt(0, 0, 0);
    });
  }

  ngOnDestroy(): void {
    this.three.destroyScene(this.sceneId);
  }
}
