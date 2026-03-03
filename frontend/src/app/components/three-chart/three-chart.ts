import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges,
  Input, Output, EventEmitter, inject, ChangeDetectionStrategy, SimpleChanges
} from '@angular/core';
import * as THREE from 'three';
import { ThreeService, ManagedScene } from '../../services/three.service';

export interface ChartDataItem {
  label: string;
  value: number;
  color?: string;
}

export interface ChartClickEvent {
  item: ChartDataItem;
  index: number;
}

@Component({
  selector: 'app-three-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="three-chart-container" #chartContainer>
      <div #chartCanvas class="three-chart-canvas"></div>
      <!-- Tooltip -->
      <div class="chart-tooltip" #tooltip
           [class.visible]="tooltipVisible"
           [style.left.px]="tooltipX"
           [style.top.px]="tooltipY">
        <div class="tooltip-label">{{ tooltipLabel }}</div>
        <div class="tooltip-value">{{ tooltipValue }}</div>
        @if (tooltipPct) { <div class="tooltip-pct">{{ tooltipPct }}</div> }
      </div>
      <!-- Export Button -->
      @if (showExport) {
        <button class="export-btn" (click)="onExport()" title="تصدير كصورة">
          <span class="material-icons-round">download</span>
        </button>
      }
      @if (showFullscreen) {
        <button class="fullscreen-btn" (click)="toggleFullscreen()" title="ملء الشاشة">
          <span class="material-icons-round">{{ isFullscreen ? 'fullscreen_exit' : 'fullscreen' }}</span>
        </button>
      }
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; min-height: 250px; }
    .three-chart-container {
      position: relative; width: 100%; height: 100%;
    }
    .three-chart-canvas {
      width: 100%; height: 100%; border-radius: 12px; overflow: hidden;
      cursor: grab;
    }
    .three-chart-canvas:active { cursor: grabbing; }

    .chart-tooltip {
      position: absolute; pointer-events: none;
      background: rgba(15, 23, 42, 0.92); backdrop-filter: blur(12px);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 10px; padding: 10px 16px;
      opacity: 0; transform: translateY(8px) scale(0.95);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 100; white-space: nowrap;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    }
    .chart-tooltip.visible {
      opacity: 1; transform: translateY(0) scale(1);
    }
    .tooltip-label {
      font-size: 13px; font-weight: 700; color: #e2e8f0; margin-bottom: 4px;
    }
    .tooltip-value {
      font-size: 18px; font-weight: 800; color: #818cf8;
    }
    .tooltip-pct {
      font-size: 12px; color: #94a3b8; margin-top: 2px;
    }

    .export-btn, .fullscreen-btn {
      position: absolute; top: 10px; background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(8px); border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 8px; padding: 6px; cursor: pointer; color: #94a3b8;
      transition: all 0.2s; z-index: 10;
      .material-icons-round { font-size: 18px; }
      &:hover { color: #818cf8; border-color: rgba(99, 102, 241, 0.4); background: rgba(15, 23, 42, 0.9); }
    }
    .export-btn { left: 10px; }
    .fullscreen-btn { left: 44px; }
  `],
})
export class ThreeChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLElement>;
  @ViewChild('chartContainer') containerRef!: ElementRef<HTMLElement>;
  @ViewChild('tooltip') tooltipRef!: ElementRef<HTMLElement>;

  @Input() type: 'bar' | 'pie' | 'donut' | 'line' | 'area' | 'waterfall' | 'gauge' | 'treemap' = 'bar';
  @Input() data: ChartDataItem[] = [];
  @Input() title = '';
  @Input() maxBarHeight = 4;
  @Input() autoRotate = true;
  @Input() rotateSpeed = 0.1;
  @Input() darkMode = true;
  @Input() showExport = true;
  @Input() showFullscreen = true;
  @Input() interactive = true;

  /** بيانات Gauge */
  @Input() gaugeValue = 0;
  @Input() gaugeMax = 100;
  @Input() gaugeLabel = '';

  @Output() chartClick = new EventEmitter<ChartClickEvent>();

  // Tooltip state
  tooltipVisible = false;
  tooltipX = 0;
  tooltipY = 0;
  tooltipLabel = '';
  tooltipValue = '';
  tooltipPct = '';
  isFullscreen = false;

  private three = inject(ThreeService);
  private sceneId = 'chart-' + Math.random().toString(36).slice(2, 8);
  private bars: THREE.Object3D[] = [];
  private labels: THREE.Sprite[] = [];
  private initialized = false;
  private managed: ManagedScene | null = null;
  private hoveredObject: THREE.Object3D | null = null;

  // Event handlers
  private mouseMoveHandler!: (e: MouseEvent) => void;
  private clickHandler!: (e: MouseEvent) => void;
  private mouseLeaveHandler!: () => void;

  private defaultColors = [
    0x6366f1, 0x06b6d4, 0x10b981, 0xf59e0b,
    0xef4444, 0x8b5cf6, 0xec4899, 0x14b8a6,
    0xf97316, 0x3b82f6,
  ];

  ngAfterViewInit(): void {
    this.initialized = true;
    this.buildChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized && (changes['data'] || changes['type'])) {
      this.cleanup();
      this.buildChart();
    }
  }

  private cleanup(): void {
    this.removeEventListeners();
    this.three.destroyScene(this.sceneId);
    this.bars = [];
    this.labels = [];
    this.managed = null;
    this.hoveredObject = null;
    this.tooltipVisible = false;
  }

  private buildChart(): void {
    const container = this.canvasRef?.nativeElement;
    if (!container || (!this.data.length && this.type !== 'gauge')) return;

    switch (this.type) {
      case 'bar': this.buildBarChart(container); break;
      case 'pie':
      case 'donut': this.buildPieChart(container); break;
      case 'line':
      case 'area': this.buildLineChart(container); break;
      case 'waterfall': this.buildWaterfallChart(container); break;
      case 'gauge': this.buildGaugeChart(container); break;
      case 'treemap': this.buildTreemapChart(container); break;
    }

    // إضافة التفاعلية
    if (this.interactive) {
      this.setupInteractivity(container);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // التفاعلية: Raycasting + Tooltip + Hover + Click
  // ═══════════════════════════════════════════════════════════

  private setupInteractivity(container: HTMLElement): void {
    this.mouseMoveHandler = (e: MouseEvent) => {
      const hit = this.three.raycast(this.sceneId, e, this.bars.filter(b => b instanceof THREE.Mesh || b instanceof THREE.Group) as THREE.Object3D[]);

      if (hit && hit.object.userData?.['chartItem']) {
        const item = hit.object.userData['chartItem'] as ChartDataItem;
        const idx = hit.object.userData['chartIndex'] as number;

        // Tooltip
        const rect = container.getBoundingClientRect();
        this.tooltipX = e.clientX - rect.left + 15;
        this.tooltipY = e.clientY - rect.top - 10;
        this.tooltipLabel = item.label;
        this.tooltipValue = new Intl.NumberFormat('ar-YE').format(item.value);

        if (this.data.length > 1) {
          const total = this.data.reduce((s, d) => s + d.value, 0);
          this.tooltipPct = ((item.value / total) * 100).toFixed(1) + '%';
        } else {
          this.tooltipPct = '';
        }
        this.tooltipVisible = true;

        // Hover effect
        if (this.hoveredObject !== hit.object) {
          this.resetHover();
          this.hoveredObject = hit.object;
          this.applyHover(hit.object);
        }

        container.style.cursor = 'pointer';
      } else {
        this.tooltipVisible = false;
        if (this.hoveredObject) {
          this.resetHover();
          this.hoveredObject = null;
        }
        container.style.cursor = 'grab';
      }
    };

    this.clickHandler = (e: MouseEvent) => {
      const hit = this.three.raycast(this.sceneId, e, this.bars as THREE.Object3D[]);
      if (hit && hit.object.userData?.['chartItem']) {
        const item = hit.object.userData['chartItem'] as ChartDataItem;
        const idx = hit.object.userData['chartIndex'] as number;
        this.chartClick.emit({ item, index: idx });
      }
    };

    this.mouseLeaveHandler = () => {
      this.tooltipVisible = false;
      this.resetHover();
      this.hoveredObject = null;
    };

    container.addEventListener('mousemove', this.mouseMoveHandler);
    container.addEventListener('click', this.clickHandler);
    container.addEventListener('mouseleave', this.mouseLeaveHandler);
  }

  private applyHover(obj: THREE.Object3D): void {
    if (obj instanceof THREE.Mesh) {
      const mat = obj.material as THREE.MeshPhysicalMaterial;
      (obj as any)._origEmissive = mat.emissiveIntensity;
      mat.emissiveIntensity = 0.5;
      obj.scale.multiplyScalar(1.08);
    }
  }

  private resetHover(): void {
    if (this.hoveredObject instanceof THREE.Mesh) {
      const mat = this.hoveredObject.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = (this.hoveredObject as any)._origEmissive ?? 0.1;
      this.hoveredObject.scale.divideScalar(1.08);
    }
  }

  private removeEventListeners(): void {
    const container = this.canvasRef?.nativeElement;
    if (!container) return;
    if (this.mouseMoveHandler) container.removeEventListener('mousemove', this.mouseMoveHandler);
    if (this.clickHandler) container.removeEventListener('click', this.clickHandler);
    if (this.mouseLeaveHandler) container.removeEventListener('mouseleave', this.mouseLeaveHandler);
  }

  // ═══════════════════════════════════════════════════════════
  // Export & Fullscreen
  // ═══════════════════════════════════════════════════════════

  onExport(): void {
    const filename = `${this.title || 'chart'}-${Date.now()}.png`;
    this.three.exportAsImage(this.sceneId, filename);
  }

  toggleFullscreen(): void {
    const container = this.containerRef?.nativeElement;
    if (!container) return;

    if (!this.isFullscreen) {
      container.requestFullscreen?.();
      this.isFullscreen = true;
    } else {
      document.exitFullscreen?.();
      this.isFullscreen = false;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // رسم بياني عمودي ثلاثي الأبعاد
  // ═══════════════════════════════════════════════════════════
  private buildBarChart(container: HTMLElement): void {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 0x0f172a : 0xf8fafc,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      preserveDrawingBuffer: true,
      camera: { fov: 45, position: [6, 5, 10], lookAt: [0, 1.5, 0] },
      ambient: { color: 0xffffff, intensity: this.darkMode ? 0.35 : 0.6 },
      directional: { color: 0xffffff, intensity: this.darkMode ? 1.2 : 0.8, position: [8, 12, 8] },
    });

    const { scene } = this.managed;

    // إضاءة Rim
    this.three.addRimLights(scene, [0x6366f1, 0x06b6d4], this.darkMode ? 0.3 : 0.1);

    // أرضية عاكسة
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: this.darkMode ? 0x0f172a : 0xe2e8f0,
      metalness: 0.8, roughness: 0.3, transparent: true,
      opacity: this.darkMode ? 0.5 : 0.3,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = this.three.createGridLines(20, 20, this.darkMode ? 0x1e293b : 0xc7d2fe, this.darkMode ? 0x334155 : 0xe0e7ff);
    scene.add(grid);

    const maxVal = Math.max(...this.data.map(d => d.value), 1);
    const barWidth = 0.7;
    const barDepth = 0.7;
    const gap = 0.5;
    const totalWidth = this.data.length * (barWidth + gap) - gap;
    const startX = -totalWidth / 2 + barWidth / 2;

    this.data.forEach((item, i) => {
      const targetHeight = (item.value / maxVal) * this.maxBarHeight;
      const color = item.color ? parseInt(item.color.replace('#', ''), 16) : this.defaultColors[i % this.defaultColors.length];
      const x = startX + i * (barWidth + gap);

      const geo = new THREE.BoxGeometry(barWidth, 0.01, barDepth);
      const mat = new THREE.MeshPhysicalMaterial({
        color, metalness: 0.2, roughness: 0.3,
        clearcoat: 0.8, clearcoatRoughness: 0.1,
        emissive: color, emissiveIntensity: this.darkMode ? 0.15 : 0.05,
      });
      const bar = new THREE.Mesh(geo, mat);
      bar.position.set(x, 0.005, 0);
      bar.castShadow = true;
      bar.receiveShadow = true;

      // بيانات التفاعلية
      bar.userData = { chartItem: item, chartIndex: i };

      (bar as any)._targetHeight = targetHeight;
      (bar as any)._currentHeight = 0.01;
      (bar as any)._growing = true;
      (bar as any)._growDelay = i * 0.15;
      (bar as any)._growStarted = false;
      this.bars.push(bar);
      scene.add(bar);

      // انعكاس
      if (this.darkMode) {
        const reflGeo = new THREE.BoxGeometry(barWidth, 0.01, barDepth);
        const reflMat = new THREE.MeshPhysicalMaterial({
          color, metalness: 0.2, roughness: 0.5, transparent: true, opacity: 0.15,
        });
        const reflection = new THREE.Mesh(reflGeo, reflMat);
        reflection.position.set(x, -0.005, 0);
        reflection.scale.y = -1;
        (bar as any)._reflection = reflection;
        scene.add(reflection);
      }

      // تسمية
      const label = this.three.createTextSprite(item.label, this.darkMode ? '#94a3b8' : '#475569', 32, [x, -0.6, 0.8]);
      label.scale.set(2, 0.5, 1);
      this.labels.push(label);
      scene.add(label);

      // قيمة
      const valText = item.value.toLocaleString('ar-YE');
      const valLabel = this.three.createTextSprite(valText, this.darkMode ? '#e2e8f0' : '#1e293b', 28, [x, targetHeight + 0.5, 0]);
      valLabel.scale.set(1.8, 0.45, 1);
      this.labels.push(valLabel);
      scene.add(valLabel);
    });

    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? '#f8fafc' : '#0f172a', 40, [0, this.maxBarHeight + 1.5, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }

    let cameraAngle = 0.5;
    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      this.bars.forEach(obj => {
        const bar = obj as THREE.Mesh;
        if ((bar as any)._growing) {
          if (!(bar as any)._growStarted) {
            if (elapsed >= (bar as any)._growDelay) (bar as any)._growStarted = true;
            else return;
          }
          const target = (bar as any)._targetHeight;
          const progress = 1 - Math.pow(1 - Math.min((elapsed - (bar as any)._growDelay) * 1.5, 1), 3);
          let current = target * progress;
          if (progress >= 0.99) { current = target; (bar as any)._growing = false; }
          (bar as any)._currentHeight = current;
          bar.scale.y = Math.max(current / 0.01, 1);
          bar.position.y = current / 2;
          if ((bar as any)._reflection) {
            (bar as any)._reflection.scale.y = -Math.max(current / 0.01, 1) * 0.3;
            (bar as any)._reflection.position.y = -current * 0.15;
          }
        }
        const mat = bar.material as THREE.MeshPhysicalMaterial;
        if (mat.emissiveIntensity !== undefined && !(bar as any)._isHovered) {
          mat.emissiveIntensity = (this.darkMode ? 0.1 : 0.03) + Math.sin(elapsed * 1.5) * 0.05;
        }
      });

      if (this.autoRotate) {
        cameraAngle += delta * this.rotateSpeed;
        managed.camera.position.x = Math.sin(cameraAngle) * 10;
        managed.camera.position.z = Math.cos(cameraAngle) * 10;
        managed.camera.position.y = 5 + Math.sin(elapsed * 0.2) * 0.5;
        managed.camera.lookAt(0, 1.5, 0);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // رسم بياني دائري ثلاثي الأبعاد
  // ═══════════════════════════════════════════════════════════
  private buildPieChart(container: HTMLElement): void {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 0x0f172a : 0xf8fafc,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      preserveDrawingBuffer: true,
      camera: { fov: 45, position: [0, 5, 7], lookAt: [0, 0, 0] },
      ambient: { color: 0xffffff, intensity: this.darkMode ? 0.4 : 0.6 },
      directional: { color: 0xffffff, intensity: this.darkMode ? 1.0 : 0.7, position: [5, 10, 5] },
    });

    const { scene } = this.managed;
    this.three.addRimLights(scene, [0x6366f1], this.darkMode ? 0.5 : 0.2);

    const total = this.data.reduce((s, d) => s + d.value, 0);
    const radius = 2.8;
    const innerRadius = this.type === 'donut' ? 1.5 : 0;
    const height = 0.6;
    let startAngle = -Math.PI / 2;

    this.data.forEach((item, i) => {
      const angle = (item.value / total) * Math.PI * 2;
      const color = item.color ? parseInt(item.color.replace('#', ''), 16) : this.defaultColors[i % this.defaultColors.length];

      const shape = new THREE.Shape();
      const segments = 48;
      if (innerRadius > 0) {
        shape.moveTo(Math.cos(startAngle) * innerRadius, Math.sin(startAngle) * innerRadius);
        for (let j = 0; j <= segments; j++) {
          const a = startAngle + (angle * j) / segments;
          shape.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
        }
        for (let j = segments; j >= 0; j--) {
          const a = startAngle + (angle * j) / segments;
          shape.lineTo(Math.cos(a) * innerRadius, Math.sin(a) * innerRadius);
        }
      } else {
        shape.moveTo(0, 0);
        for (let j = 0; j <= segments; j++) {
          const a = startAngle + (angle * j) / segments;
          shape.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
        }
        shape.lineTo(0, 0);
      }

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: height, bevelEnabled: true,
        bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 4,
      });
      const mat = new THREE.MeshPhysicalMaterial({
        color, metalness: 0.15, roughness: 0.25,
        clearcoat: 1.0, clearcoatRoughness: 0.05,
        emissive: color, emissiveIntensity: this.darkMode ? 0.1 : 0.03,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.castShadow = true;

      const midAngle = startAngle + angle / 2;
      const explodeDistance = 0.15;
      mesh.position.x = Math.cos(midAngle) * explodeDistance;
      mesh.position.z = -Math.sin(midAngle) * explodeDistance;

      // بيانات التفاعلية
      mesh.userData = { chartItem: item, chartIndex: i };

      (mesh as any)._midAngle = midAngle;
      (mesh as any)._entryDelay = i * 0.2;
      (mesh as any)._entered = false;
      mesh.scale.set(0, 0, 0);
      this.bars.push(mesh);
      scene.add(mesh);

      // تسمية
      const labelDist = radius + 1.2;
      const lx = Math.cos(midAngle) * labelDist;
      const lz = -Math.sin(midAngle) * labelDist;
      const pct = ((item.value / total) * 100).toFixed(1) + '%';
      const label = this.three.createTextSprite(
        `${item.label}\n${pct}`, this.darkMode ? '#e2e8f0' : '#1e293b', 26, [lx, 0.8, lz]
      );
      label.scale.set(2.5, 0.7, 1);
      this.labels.push(label);
      scene.add(label);

      startAngle += angle;
    });

    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? '#f8fafc' : '#0f172a', 40, [0, 3.5, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }

    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      this.bars.forEach(obj => {
        const mesh = obj as THREE.Mesh;
        if (!(mesh as any)._entered) {
          if (elapsed >= (mesh as any)._entryDelay) {
            const progress = Math.min((elapsed - (mesh as any)._entryDelay) * 2, 1);
            const elastic = 1 - Math.pow(2, -10 * progress) * Math.cos(progress * Math.PI * 2);
            mesh.scale.set(elastic, elastic, elastic);
            if (progress >= 1) { (mesh as any)._entered = true; mesh.scale.set(1, 1, 1); }
          }
        }
        mesh.position.y = Math.sin(elapsed * 0.5 + (mesh as any)._midAngle) * 0.02;
        const mat = mesh.material as THREE.MeshPhysicalMaterial;
        mat.emissiveIntensity = (this.darkMode ? 0.08 : 0.02) + Math.sin(elapsed * 0.8 + (mesh as any)._midAngle) * 0.05;
      });

      if (this.autoRotate) {
        managed.camera.position.x = Math.sin(elapsed * this.rotateSpeed) * 7;
        managed.camera.position.z = Math.cos(elapsed * this.rotateSpeed) * 7;
        managed.camera.position.y = 5 + Math.sin(elapsed * 0.15) * 0.5;
        managed.camera.lookAt(0, 0, 0);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // رسم بياني خطي ثلاثي الأبعاد
  // ═══════════════════════════════════════════════════════════
  private buildLineChart(container: HTMLElement): void {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 0x0f172a : 0xf8fafc,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      preserveDrawingBuffer: true,
      camera: { fov: 45, position: [0, 4, 10], lookAt: [0, 1.5, 0] },
      ambient: { color: 0xffffff, intensity: this.darkMode ? 0.35 : 0.6 },
      directional: { color: 0xffffff, intensity: this.darkMode ? 0.8 : 0.5, position: [5, 10, 5] },
    });

    const { scene } = this.managed;
    const grid = this.three.createGridLines(20, 20, this.darkMode ? 0x1e293b : 0xc7d2fe, this.darkMode ? 0x334155 : 0xe0e7ff);
    scene.add(grid);

    const maxVal = Math.max(...this.data.map(d => d.value), 1);
    const totalWidth = 8;
    const spacing = totalWidth / Math.max(this.data.length - 1, 1);
    const startX = -totalWidth / 2;
    const color = this.defaultColors[0];

    const points: THREE.Vector3[] = [];
    this.data.forEach((item, i) => {
      const x = startX + i * spacing;
      const y = (item.value / maxVal) * this.maxBarHeight;
      points.push(new THREE.Vector3(x, y, 0));

      const sphere = this.three.createGlowSphere(0.12, color, 0.8, [x, 0, 0]);
      sphere.userData = { chartItem: item, chartIndex: i };
      (sphere as any)._targetY = y;
      (sphere as any)._entryDelay = i * 0.1;
      this.bars.push(sphere);
      scene.add(sphere);

      const label = this.three.createTextSprite(item.label, this.darkMode ? '#94a3b8' : '#475569', 28, [x, -0.5, 0.5]);
      label.scale.set(1.5, 0.4, 1);
      this.labels.push(label);
      scene.add(label);

      const valLabel = this.three.createTextSprite(
        item.value.toLocaleString('ar-YE'), this.darkMode ? '#e2e8f0' : '#1e293b', 24, [x, y + 0.5, 0]
      );
      valLabel.scale.set(1.5, 0.4, 1);
      this.labels.push(valLabel);
      scene.add(valLabel);
    });

    if (points.length > 1) {
      const curve = new THREE.CatmullRomCurve3(points);
      const curvePoints = curve.getPoints(100);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 });
      scene.add(new THREE.Line(lineGeo, lineMat));

      if (this.type === 'area') {
        const areaShape = new THREE.Shape();
        areaShape.moveTo(curvePoints[0].x, 0);
        curvePoints.forEach(p => areaShape.lineTo(p.x, p.y));
        areaShape.lineTo(curvePoints[curvePoints.length - 1].x, 0);
        areaShape.lineTo(curvePoints[0].x, 0);
        const areaMat = new THREE.MeshBasicMaterial({
          color, transparent: true, opacity: this.darkMode ? 0.15 : 0.1, side: THREE.DoubleSide,
        });
        scene.add(new THREE.Mesh(new THREE.ShapeGeometry(areaShape), areaMat));
      }
    }

    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? '#f8fafc' : '#0f172a', 40, [0, this.maxBarHeight + 1.5, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }

    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      this.bars.forEach((sphere, i) => {
        const delay = (sphere as any)._entryDelay || 0;
        if (elapsed >= delay) {
          const targetY = (sphere as any)._targetY;
          const progress = Math.min((elapsed - delay) * 2, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          sphere.position.y = targetY * eased;
        }
        const mat = (sphere as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.5 + Math.sin(elapsed * 2 + i) * 0.3;
      });

      if (this.autoRotate) {
        managed.camera.position.x = Math.sin(elapsed * this.rotateSpeed * 0.5) * 3;
        managed.camera.position.z = 10 + Math.cos(elapsed * this.rotateSpeed * 0.3) * 2;
        managed.camera.lookAt(0, 1.5, 0);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // رسم بياني Waterfall ثلاثي الأبعاد
  // ═══════════════════════════════════════════════════════════
  private buildWaterfallChart(container: HTMLElement): void {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 0x0f172a : 0xf8fafc,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      preserveDrawingBuffer: true,
      camera: { fov: 45, position: [8, 6, 12], lookAt: [0, 1, 0] },
      ambient: { color: 0xffffff, intensity: this.darkMode ? 0.35 : 0.6 },
      directional: { color: 0xffffff, intensity: this.darkMode ? 1.0 : 0.7, position: [8, 12, 8] },
    });

    const { scene } = this.managed;
    this.three.addRimLights(scene, [0x10b981, 0xef4444], this.darkMode ? 0.3 : 0.1);

    const grid = this.three.createGridLines(20, 20, this.darkMode ? 0x1e293b : 0xc7d2fe, this.darkMode ? 0x334155 : 0xe0e7ff);
    scene.add(grid);

    // أرضية
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: this.darkMode ? 0x0f172a : 0xe2e8f0,
      metalness: 0.8, roughness: 0.3, transparent: true, opacity: 0.4,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    const maxVal = Math.max(...this.data.map(d => Math.abs(d.value)), 1);
    const barWidth = 0.6;
    const gap = 0.4;
    const totalWidth = this.data.length * (barWidth + gap) - gap;
    const startX = -totalWidth / 2 + barWidth / 2;

    let runningY = 0;

    this.data.forEach((item, i) => {
      const isPositive = item.value >= 0;
      const height = (Math.abs(item.value) / maxVal) * this.maxBarHeight;
      const color = isPositive ? 0x10b981 : 0xef4444;
      const x = startX + i * (barWidth + gap);

      const geo = new THREE.BoxGeometry(barWidth, 0.01, barWidth);
      const mat = new THREE.MeshPhysicalMaterial({
        color, metalness: 0.2, roughness: 0.3,
        clearcoat: 0.6, emissive: color, emissiveIntensity: 0.15,
      });
      const bar = new THREE.Mesh(geo, mat);
      bar.position.set(x, runningY + (isPositive ? 0 : -height), 0);
      bar.castShadow = true;

      bar.userData = { chartItem: item, chartIndex: i };
      (bar as any)._targetHeight = height;
      (bar as any)._baseY = runningY;
      (bar as any)._isPositive = isPositive;
      (bar as any)._growing = true;
      (bar as any)._growDelay = i * 0.2;
      (bar as any)._growStarted = false;

      this.bars.push(bar);
      scene.add(bar);

      // خط اتصال
      if (i > 0) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x - barWidth / 2 - gap, runningY, 0),
          new THREE.Vector3(x - barWidth / 2, runningY, 0),
        ]);
        const lineMat = new THREE.LineBasicMaterial({
          color: this.darkMode ? 0x475569 : 0x94a3b8, transparent: true, opacity: 0.5,
        });
        scene.add(new THREE.Line(lineGeo, lineMat));
      }

      // سهم اتجاه
      const arrowGeo = new THREE.ConeGeometry(0.12, 0.3, 6);
      const arrowMat = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.3, transparent: true, opacity: 0.8,
      });
      const arrow = new THREE.Mesh(arrowGeo, arrowMat);
      arrow.position.set(x, runningY + (isPositive ? height + 0.3 : -height - 0.3), 0);
      if (!isPositive) arrow.rotation.z = Math.PI;
      scene.add(arrow);

      // تسمية
      const label = this.three.createTextSprite(item.label, this.darkMode ? '#94a3b8' : '#475569', 28, [x, -0.8, 0.6]);
      label.scale.set(1.8, 0.45, 1);
      scene.add(label);

      // قيمة
      const prefix = isPositive ? '+' : '';
      const valLabel = this.three.createTextSprite(
        prefix + item.value.toLocaleString('ar-YE'),
        isPositive ? '#34d399' : '#f87171', 26,
        [x, runningY + (isPositive ? height + 0.7 : -height - 0.7), 0]
      );
      valLabel.scale.set(1.8, 0.45, 1);
      scene.add(valLabel);

      runningY += isPositive ? height : -height;
    });

    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? '#f8fafc' : '#0f172a', 40, [0, this.maxBarHeight + 2, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }

    let cameraAngle = 0.3;
    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      this.bars.forEach(obj => {
        const bar = obj as THREE.Mesh;
        if ((bar as any)._growing) {
          if (!(bar as any)._growStarted) {
            if (elapsed >= (bar as any)._growDelay) (bar as any)._growStarted = true;
            else return;
          }
          const target = (bar as any)._targetHeight;
          const progress = 1 - Math.pow(1 - Math.min((elapsed - (bar as any)._growDelay) * 1.2, 1), 3);
          const current = target * progress;
          bar.scale.y = Math.max(current / 0.01, 1);
          const baseY = (bar as any)._baseY;
          const isPos = (bar as any)._isPositive;
          bar.position.y = baseY + (isPos ? current / 2 : -current / 2);
          if (progress >= 0.99) (bar as any)._growing = false;
        }
      });

      if (this.autoRotate) {
        cameraAngle += delta * this.rotateSpeed * 0.5;
        managed.camera.position.x = Math.sin(cameraAngle) * 12;
        managed.camera.position.z = Math.cos(cameraAngle) * 12;
        managed.camera.position.y = 6 + Math.sin(elapsed * 0.15) * 0.5;
        managed.camera.lookAt(0, 1, 0);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // مقياس Gauge ثلاثي الأبعاد
  // ═══════════════════════════════════════════════════════════
  private buildGaugeChart(container: HTMLElement): void {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 0x0f172a : 0xf8fafc,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      preserveDrawingBuffer: true,
      camera: { fov: 45, position: [0, 1, 6], lookAt: [0, 0.5, 0] },
      ambient: { color: 0xffffff, intensity: this.darkMode ? 0.4 : 0.6 },
      directional: { color: 0xffffff, intensity: this.darkMode ? 0.8 : 0.5, position: [3, 8, 5] },
    });

    const { scene } = this.managed;

    // تحديد اللون حسب النسبة
    const ratio = this.gaugeMax > 0 ? this.gaugeValue / this.gaugeMax : 0;
    let gaugeColor = 0x10b981; // أخضر
    if (ratio > 0.8) gaugeColor = 0xef4444; // أحمر
    else if (ratio > 0.6) gaugeColor = 0xf59e0b; // برتقالي

    const gauge = this.three.createGauge(
      this.gaugeValue, this.gaugeMax, 2,
      gaugeColor, this.darkMode ? 0x1e293b : 0xe2e8f0
    );
    scene.add(gauge);

    // قيمة مركزية
    const valueText = new Intl.NumberFormat('ar-YE').format(this.gaugeValue);
    const valueSprite = this.three.createTextSprite(valueText, this.darkMode ? '#f8fafc' : '#0f172a', 48, [0, -0.3, 0.1]);
    valueSprite.scale.set(3, 0.8, 1);
    scene.add(valueSprite);

    // نسبة مئوية
    const pctText = (ratio * 100).toFixed(0) + '%';
    const pctSprite = this.three.createTextSprite(pctText, this.darkMode ? '#818cf8' : '#4f46e5', 36, [0, -0.9, 0.1]);
    pctSprite.scale.set(2, 0.5, 1);
    scene.add(pctSprite);

    // تسمية
    if (this.gaugeLabel || this.title) {
      const labelSprite = this.three.createTextSprite(
        this.gaugeLabel || this.title, this.darkMode ? '#94a3b8' : '#64748b', 30, [0, -1.5, 0.1]
      );
      labelSprite.scale.set(3, 0.7, 1);
      scene.add(labelSprite);
    }

    // جسيمات خلفية
    const particles = this.three.createParticleSystem(80, 10, gaugeColor, 0.03);
    scene.add(particles);

    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      // نبض خفيف للمقياس
      gauge.rotation.z = Math.sin(elapsed * 0.3) * 0.01;
      this.three.animateParticles(particles, delta, 10);

      if (this.autoRotate) {
        managed.camera.position.x = Math.sin(elapsed * this.rotateSpeed * 0.3) * 1;
        managed.camera.lookAt(0, 0.5, 0);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // Treemap ثلاثي الأبعاد
  // ═══════════════════════════════════════════════════════════
  private buildTreemapChart(container: HTMLElement): void {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 0x0f172a : 0xf8fafc,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      preserveDrawingBuffer: true,
      camera: { fov: 50, position: [0, 8, 8], lookAt: [0, 0, 0] },
      ambient: { color: 0xffffff, intensity: this.darkMode ? 0.4 : 0.6 },
      directional: { color: 0xffffff, intensity: this.darkMode ? 1.0 : 0.7, position: [5, 12, 5] },
    });

    const { scene } = this.managed;
    this.three.addRimLights(scene, [0x6366f1, 0x06b6d4, 0x10b981], this.darkMode ? 0.3 : 0.1);

    // أرضية
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: this.darkMode ? 0x0f172a : 0xe2e8f0,
      metalness: 0.7, roughness: 0.3, transparent: true, opacity: 0.4,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    const treemapData = this.data.map((item, i) => ({
      label: item.label,
      value: item.value,
      color: item.color ? parseInt(item.color.replace('#', ''), 16) : this.defaultColors[i % this.defaultColors.length],
    }));

    const treemap = this.three.createTreemapBlocks(treemapData, 8, 8, this.maxBarHeight);
    scene.add(treemap);

    // إضافة userData للتفاعلية
    treemap.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh && i < this.data.length) {
        child.userData = { chartItem: this.data[i], chartIndex: i };
        this.bars.push(child);

        // تسمية فوق كل بلوك
        const label = this.three.createTextSprite(
          this.data[i].label, this.darkMode ? '#e2e8f0' : '#1e293b', 24,
          [child.position.x, child.position.y + child.scale.y * 0.5 + 0.5, child.position.z]
        );
        label.scale.set(2, 0.5, 1);
        scene.add(label);
      }
    });

    // تأثير دخول
    treemap.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const targetY = child.position.y;
        child.position.y = -2;
        (child as any)._targetY = targetY;
        (child as any)._entryDelay = i * 0.1;
        (child as any)._entered = false;
      }
    });

    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? '#f8fafc' : '#0f172a', 40, [0, this.maxBarHeight + 1.5, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }

    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      treemap.children.forEach(child => {
        if (child instanceof THREE.Mesh && !(child as any)._entered) {
          const delay = (child as any)._entryDelay || 0;
          if (elapsed >= delay) {
            const progress = Math.min((elapsed - delay) * 1.5, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            child.position.y = -2 + ((child as any)._targetY + 2) * eased;
            if (progress >= 1) {
              child.position.y = (child as any)._targetY;
              (child as any)._entered = true;
            }
          }
        }
      });

      if (this.autoRotate) {
        managed.camera.position.x = Math.sin(elapsed * this.rotateSpeed * 0.5) * 8;
        managed.camera.position.z = Math.cos(elapsed * this.rotateSpeed * 0.5) * 8;
        managed.camera.position.y = 8 + Math.sin(elapsed * 0.1) * 0.5;
        managed.camera.lookAt(0, 0, 0);
      }
    });
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
    this.three.destroyScene(this.sceneId);
  }
}
