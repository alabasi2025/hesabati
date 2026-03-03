import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges,
  Input, inject, ChangeDetectionStrategy, SimpleChanges
} from '@angular/core';
import * as THREE from 'three';
import { ThreeService, ManagedScene } from '../../services/three.service';

export interface ChartDataItem {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-three-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #chartCanvas class="three-chart-canvas"></div>`,
  styles: [`
    :host { display: block; width: 100%; height: 100%; min-height: 250px; }
    .three-chart-canvas { width: 100%; height: 100%; border-radius: 12px; overflow: hidden; }
  `],
})
export class ThreeChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLElement>;

  /** نوع الرسم البياني */
  @Input() type: 'bar' | 'pie' | 'donut' | 'line' | 'area' = 'bar';

  /** بيانات الرسم البياني */
  @Input() data: ChartDataItem[] = [];

  /** عنوان الرسم البياني */
  @Input() title = '';

  /** ارتفاع أقصى للأعمدة */
  @Input() maxBarHeight = 4;

  /** تفعيل الدوران التلقائي */
  @Input() autoRotate = true;

  /** سرعة الدوران */
  @Input() rotateSpeed = 0.1;

  /** الوضع الداكن */
  @Input() darkMode = true;

  private three = inject(ThreeService);
  private sceneId = 'chart-' + Math.random().toString(36).slice(2, 8);
  private bars: THREE.Mesh[] = [];
  private labels: THREE.Sprite[] = [];
  private initialized = false;
  private managed: ManagedScene | null = null;

  private defaultColors = [
    0x6366f1, 0x06b6d4, 0x10b981, 0xf59e0b,
    0xef4444, 0x8b5cf6, 0xec4899, 0x14b8a6,
    0xf97316, 0x3b82f6,
  ];

  // ألوان مع تدرج
  private gradientPairs = [
    [0x6366f1, 0x818cf8],
    [0x06b6d4, 0x22d3ee],
    [0x10b981, 0x34d399],
    [0xf59e0b, 0xfbbf24],
    [0xef4444, 0xf87171],
    [0x8b5cf6, 0xa78bfa],
    [0xec4899, 0xf472b6],
    [0x14b8a6, 0x2dd4bf],
    [0xf97316, 0xfb923c],
    [0x3b82f6, 0x60a5fa],
  ];

  ngAfterViewInit(): void {
    this.initialized = true;
    this.buildChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized && (changes['data'] || changes['type'])) {
      this.three.destroyScene(this.sceneId);
      this.bars = [];
      this.labels = [];
      this.managed = null;
      this.buildChart();
    }
  }

  private buildChart(): void {
    const container = this.canvasRef?.nativeElement;
    if (!container || !this.data.length) return;

    switch (this.type) {
      case 'bar': this.buildBarChart(container); break;
      case 'pie':
      case 'donut': this.buildPieChart(container); break;
      case 'line':
      case 'area': this.buildLineChart(container); break;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // رسم بياني عمودي ثلاثي الأبعاد
  // ═══════════════════════════════════════════════════════════
  private buildBarChart(container: HTMLElement): void {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 0x0f172a : 0xf8fafc,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      camera: {
        fov: 45,
        position: [6, 5, 10],
        lookAt: [0, 1.5, 0],
      },
      ambient: { color: 0xffffff, intensity: this.darkMode ? 0.35 : 0.6 },
      directional: { color: 0xffffff, intensity: this.darkMode ? 1.2 : 0.8, position: [8, 12, 8] },
    });

    const { scene } = this.managed;

    // إضاءة إضافية
    const fillLight = new THREE.PointLight(0x6366f1, this.darkMode ? 0.5 : 0.2, 20);
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);

    // أرضية عاكسة
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: this.darkMode ? 0x0f172a : 0xe2e8f0,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: this.darkMode ? 0.5 : 0.3,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);

    // شبكة أرضية
    const grid = this.three.createGridLines(20, 20, this.darkMode ? 0x1e293b : 0xc7d2fe, this.darkMode ? 0x334155 : 0xe0e7ff);
    grid.position.y = 0;
    scene.add(grid);

    // حساب القيم
    const maxVal = Math.max(...this.data.map(d => d.value), 1);
    const barWidth = 0.7;
    const barDepth = 0.7;
    const gap = 0.5;
    const totalWidth = this.data.length * (barWidth + gap) - gap;
    const startX = -totalWidth / 2 + barWidth / 2;

    // إنشاء الأعمدة مع تأثيرات متقدمة
    this.data.forEach((item, i) => {
      const targetHeight = (item.value / maxVal) * this.maxBarHeight;
      const colorIdx = i % this.defaultColors.length;
      const color = item.color
        ? parseInt(item.color.replace('#', ''), 16)
        : this.defaultColors[colorIdx];
      const x = startX + i * (barWidth + gap);

      // عمود رئيسي مع مادة فيزيائية
      const geo = new THREE.BoxGeometry(barWidth, 0.01, barDepth);
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.2,
        roughness: 0.3,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        emissive: color,
        emissiveIntensity: this.darkMode ? 0.15 : 0.05,
      });
      const bar = new THREE.Mesh(geo, mat);
      bar.position.set(x, 0.005, 0);
      bar.castShadow = true;
      bar.receiveShadow = true;

      (bar as any)._targetHeight = targetHeight;
      (bar as any)._currentHeight = 0.01;
      (bar as any)._x = x;
      (bar as any)._color = color;
      (bar as any)._growing = true;
      (bar as any)._growDelay = i * 0.15; // تأخير متتالي
      (bar as any)._growStarted = false;
      this.bars.push(bar);
      scene.add(bar);

      // انعكاس العمود (mirror)
      if (this.darkMode) {
        const reflGeo = new THREE.BoxGeometry(barWidth, 0.01, barDepth);
        const reflMat = new THREE.MeshPhysicalMaterial({
          color,
          metalness: 0.2,
          roughness: 0.5,
          transparent: true,
          opacity: 0.15,
        });
        const reflection = new THREE.Mesh(reflGeo, reflMat);
        reflection.position.set(x, -0.005, 0);
        reflection.scale.y = -1;
        (bar as any)._reflection = reflection;
        scene.add(reflection);
      }

      // تسمية أسفل العمود
      const label = this.three.createTextSprite(item.label, this.darkMode ? '#94a3b8' : '#475569', 32, [x, -0.6, 0.8]);
      label.scale.set(2, 0.5, 1);
      this.labels.push(label);
      scene.add(label);

      // قيمة فوق العمود
      const valText = item.value.toLocaleString('ar-YE');
      const valLabel = this.three.createTextSprite(valText, this.darkMode ? '#e2e8f0' : '#1e293b', 28, [x, targetHeight + 0.5, 0]);
      valLabel.scale.set(1.8, 0.45, 1);
      (valLabel as any)._targetY = targetHeight + 0.5;
      (valLabel as any)._bar = bar;
      this.labels.push(valLabel);
      scene.add(valLabel);
    });

    // عنوان
    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? '#f8fafc' : '#0f172a', 40, [0, this.maxBarHeight + 1.5, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }

    // حلقة الرسم
    let cameraAngle = 0.5;
    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      // نمو الأعمدة مع تأخير متتالي
      this.bars.forEach(bar => {
        if ((bar as any)._growing) {
          if (!((bar as any)._growStarted)) {
            if (elapsed >= (bar as any)._growDelay) {
              (bar as any)._growStarted = true;
            } else {
              return;
            }
          }

          const target = (bar as any)._targetHeight;
          let current = (bar as any)._currentHeight;
          // Ease-out cubic
          const progress = 1 - Math.pow(1 - Math.min((elapsed - (bar as any)._growDelay) * 1.5, 1), 3);
          current = target * progress;

          if (progress >= 0.99) {
            current = target;
            (bar as any)._growing = false;
          }
          (bar as any)._currentHeight = current;

          bar.scale.y = Math.max(current / 0.01, 1);
          bar.position.y = current / 2;

          // تحديث الانعكاس
          if ((bar as any)._reflection) {
            (bar as any)._reflection.scale.y = -Math.max(current / 0.01, 1) * 0.3;
            (bar as any)._reflection.position.y = -current * 0.15;
          }
        }

        // نبض التوهج
        const mat = bar.material as THREE.MeshPhysicalMaterial;
        mat.emissiveIntensity = (this.darkMode ? 0.1 : 0.03) + Math.sin(elapsed * 1.5) * 0.05;
      });

      // دوران الكاميرا
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
      camera: {
        fov: 45,
        position: [0, 5, 7],
        lookAt: [0, 0, 0],
      },
      ambient: { color: 0xffffff, intensity: this.darkMode ? 0.4 : 0.6 },
      directional: { color: 0xffffff, intensity: this.darkMode ? 1.0 : 0.7, position: [5, 10, 5] },
    });

    const { scene } = this.managed;

    // إضاءة ملونة
    const rimLight = new THREE.PointLight(0x6366f1, this.darkMode ? 0.8 : 0.3, 15);
    rimLight.position.set(-3, 3, 3);
    scene.add(rimLight);

    const total = this.data.reduce((s, d) => s + d.value, 0);
    const radius = 2.8;
    const innerRadius = this.type === 'donut' ? 1.5 : 0;
    const height = 0.6;
    let startAngle = -Math.PI / 2; // البدء من الأعلى

    this.data.forEach((item, i) => {
      const angle = (item.value / total) * Math.PI * 2;
      const colorIdx = i % this.defaultColors.length;
      const color = item.color
        ? parseInt(item.color.replace('#', ''), 16)
        : this.defaultColors[colorIdx];

      // إنشاء شريحة مع bevel
      const shape = new THREE.Shape();
      const segments = 48;
      if (innerRadius > 0) {
        shape.moveTo(
          Math.cos(startAngle) * innerRadius,
          Math.sin(startAngle) * innerRadius
        );
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

      const extrudeSettings = {
        depth: height,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.06,
        bevelSegments: 4,
      };
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.15,
        roughness: 0.25,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        emissive: color,
        emissiveIntensity: this.darkMode ? 0.1 : 0.03,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.castShadow = true;

      // تأثير الانفصال (explode)
      const midAngle = startAngle + angle / 2;
      const explodeDistance = 0.15;
      mesh.position.x = Math.cos(midAngle) * explodeDistance;
      mesh.position.z = -Math.sin(midAngle) * explodeDistance;

      (mesh as any)._midAngle = midAngle;
      (mesh as any)._explodeDistance = explodeDistance;
      (mesh as any)._color = color;
      (mesh as any)._entryDelay = i * 0.2;
      (mesh as any)._entered = false;
      (mesh as any)._targetScale = 1;
      mesh.scale.set(0, 0, 0); // يبدأ مخفياً
      this.bars.push(mesh);
      scene.add(mesh);

      // تسمية مع نسبة مئوية
      const labelDist = radius + 1.2;
      const lx = Math.cos(midAngle) * labelDist;
      const lz = -Math.sin(midAngle) * labelDist;
      const pct = ((item.value / total) * 100).toFixed(1) + '%';
      const labelText = `${item.label}\n${pct}`;
      const label = this.three.createTextSprite(
        labelText,
        this.darkMode ? '#e2e8f0' : '#1e293b',
        26,
        [lx, 0.8, lz]
      );
      label.scale.set(2.5, 0.7, 1);
      this.labels.push(label);
      scene.add(label);

      startAngle += angle;
    });

    // عنوان
    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? '#f8fafc' : '#0f172a', 40, [0, 3.5, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }

    // حلقة الرسم
    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      // دخول الشرائح
      this.bars.forEach(mesh => {
        if (!(mesh as any)._entered) {
          if (elapsed >= (mesh as any)._entryDelay) {
            const progress = Math.min((elapsed - (mesh as any)._entryDelay) * 2, 1);
            // Elastic ease-out
            const elastic = 1 - Math.pow(2, -10 * progress) * Math.cos(progress * Math.PI * 2);
            const s = elastic;
            mesh.scale.set(s, s, s);
            if (progress >= 1) {
              (mesh as any)._entered = true;
              mesh.scale.set(1, 1, 1);
            }
          }
        }

        // نبض خفيف
        const pulse = Math.sin(elapsed * 0.5 + (mesh as any)._midAngle) * 0.02;
        mesh.position.y = pulse;

        // نبض التوهج
        const mat = mesh.material as THREE.MeshPhysicalMaterial;
        mat.emissiveIntensity = (this.darkMode ? 0.08 : 0.02) + Math.sin(elapsed * 0.8 + (mesh as any)._midAngle) * 0.05;
      });

      // دوران الكاميرا
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
      camera: {
        fov: 45,
        position: [0, 4, 10],
        lookAt: [0, 1.5, 0],
      },
      ambient: { color: 0xffffff, intensity: this.darkMode ? 0.35 : 0.6 },
      directional: { color: 0xffffff, intensity: this.darkMode ? 0.8 : 0.5, position: [5, 10, 5] },
    });

    const { scene } = this.managed;

    // شبكة أرضية
    const grid = this.three.createGridLines(20, 20, this.darkMode ? 0x1e293b : 0xc7d2fe, this.darkMode ? 0x334155 : 0xe0e7ff);
    grid.position.y = 0;
    scene.add(grid);

    const maxVal = Math.max(...this.data.map(d => d.value), 1);
    const totalWidth = 8;
    const spacing = totalWidth / Math.max(this.data.length - 1, 1);
    const startX = -totalWidth / 2;
    const color = this.defaultColors[0];

    // نقاط البيانات
    const points: THREE.Vector3[] = [];
    this.data.forEach((item, i) => {
      const x = startX + i * spacing;
      const y = (item.value / maxVal) * this.maxBarHeight;
      points.push(new THREE.Vector3(x, y, 0));

      // كرة عند كل نقطة
      const sphere = this.three.createGlowSphere(0.12, color, 0.8, [x, y, 0]);
      (sphere as any)._targetY = y;
      (sphere as any)._entryDelay = i * 0.1;
      sphere.position.y = 0;
      this.bars.push(sphere);
      scene.add(sphere);

      // تسمية
      const label = this.three.createTextSprite(item.label, this.darkMode ? '#94a3b8' : '#475569', 28, [x, -0.5, 0.5]);
      label.scale.set(1.5, 0.4, 1);
      this.labels.push(label);
      scene.add(label);

      // قيمة
      const valLabel = this.three.createTextSprite(
        item.value.toLocaleString('ar-YE'),
        this.darkMode ? '#e2e8f0' : '#1e293b',
        24,
        [x, y + 0.5, 0]
      );
      valLabel.scale.set(1.5, 0.4, 1);
      (valLabel as any)._targetY = y + 0.5;
      this.labels.push(valLabel);
      scene.add(valLabel);
    });

    // خط متصل
    if (points.length > 1) {
      const curve = new THREE.CatmullRomCurve3(points);
      const curvePoints = curve.getPoints(100);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.8,
        linewidth: 2,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);

      // مساحة تحت الخط (area)
      if (this.type === 'area') {
        const areaShape = new THREE.Shape();
        areaShape.moveTo(curvePoints[0].x, 0);
        curvePoints.forEach(p => areaShape.lineTo(p.x, p.y));
        areaShape.lineTo(curvePoints[curvePoints.length - 1].x, 0);
        areaShape.lineTo(curvePoints[0].x, 0);

        const areaGeo = new THREE.ShapeGeometry(areaShape);
        const areaMat = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: this.darkMode ? 0.15 : 0.1,
          side: THREE.DoubleSide,
        });
        const areaMesh = new THREE.Mesh(areaGeo, areaMat);
        scene.add(areaMesh);
      }
    }

    // عنوان
    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? '#f8fafc' : '#0f172a', 40, [0, this.maxBarHeight + 1.5, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }

    // حلقة الرسم
    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      // دخول النقاط
      this.bars.forEach((sphere, i) => {
        const delay = (sphere as any)._entryDelay || 0;
        if (elapsed >= delay) {
          const targetY = (sphere as any)._targetY;
          const progress = Math.min((elapsed - delay) * 2, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          sphere.position.y = targetY * eased;
        }

        // نبض
        const mat = sphere.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.5 + Math.sin(elapsed * 2 + i) * 0.3;
      });

      // دوران خفيف
      if (this.autoRotate) {
        managed.camera.position.x = Math.sin(elapsed * this.rotateSpeed * 0.5) * 3;
        managed.camera.position.z = 10 + Math.cos(elapsed * this.rotateSpeed * 0.3) * 2;
        managed.camera.lookAt(0, 1.5, 0);
      }
    });
  }

  ngOnDestroy(): void {
    this.three.destroyScene(this.sceneId);
  }
}
