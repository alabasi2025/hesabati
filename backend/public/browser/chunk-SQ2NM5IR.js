import {
  BoxGeometry,
  BufferGeometry,
  CatmullRomCurve3,
  ConeGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Shape,
  ShapeGeometry,
  ThreeBackgroundComponent,
  ThreeService,
  Vector3
} from "./chunk-NCLK3RL4.js";
import {
  ThemeService
} from "./chunk-WIHW6D6J.js";
import {
  BasePageComponent
} from "./chunk-S7GVNVWQ.js";
import {
  ToastService
} from "./chunk-O5GO2TIE.js";
import "./chunk-5SFBIGEU.js";
import {
  ApiService
} from "./chunk-MSEJWZ7D.js";
import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-VUZEB5JS.js";

// src/app/components/three-chart/three-chart.ts
var _c0 = ["chartCanvas"];
var _c1 = ["chartContainer"];
var _c2 = ["tooltip"];
function ThreeChartComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.tooltipPct);
  }
}
function ThreeChartComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 11);
    \u0275\u0275domListener("click", function ThreeChartComponent_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onExport());
    });
    \u0275\u0275domElementStart(1, "span", 12);
    \u0275\u0275text(2, "download");
    \u0275\u0275domElementEnd()();
  }
}
function ThreeChartComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 13);
    \u0275\u0275domListener("click", function ThreeChartComponent_Conditional_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleFullscreen());
    });
    \u0275\u0275domElementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.isFullscreen ? "fullscreen_exit" : "fullscreen");
  }
}
var ThreeChartComponent = class _ThreeChartComponent {
  canvasRef;
  containerRef;
  tooltipRef;
  type = "bar";
  data = [];
  title = "";
  maxBarHeight = 4;
  autoRotate = true;
  rotateSpeed = 0.1;
  darkMode = true;
  showExport = true;
  showFullscreen = true;
  interactive = true;
  /** بيانات Gauge */
  gaugeValue = 0;
  gaugeMax = 100;
  gaugeLabel = "";
  chartClick = new EventEmitter();
  // Tooltip state
  tooltipVisible = false;
  tooltipX = 0;
  tooltipY = 0;
  tooltipLabel = "";
  tooltipValue = "";
  tooltipPct = "";
  isFullscreen = false;
  three = inject(ThreeService);
  sceneId = "chart-" + Math.random().toString(36).slice(2, 8);
  bars = [];
  labels = [];
  initialized = false;
  managed = null;
  hoveredObject = null;
  // Event handlers
  mouseMoveHandler;
  clickHandler;
  mouseLeaveHandler;
  defaultColors = [
    6514417,
    440020,
    1096065,
    16096779,
    15680580,
    9133302,
    15485081,
    1357990,
    16347926,
    3900150
  ];
  ngAfterViewInit() {
    this.initialized = true;
    this.buildChart();
  }
  ngOnChanges(changes) {
    if (this.initialized && (changes["data"] || changes["type"])) {
      this.cleanup();
      this.buildChart();
    }
  }
  cleanup() {
    this.removeEventListeners();
    this.three.destroyScene(this.sceneId);
    this.bars = [];
    this.labels = [];
    this.managed = null;
    this.hoveredObject = null;
    this.tooltipVisible = false;
  }
  buildChart() {
    const container = this.canvasRef?.nativeElement;
    if (!container || !this.data.length && this.type !== "gauge")
      return;
    switch (this.type) {
      case "bar":
        this.buildBarChart(container);
        break;
      case "pie":
      case "donut":
        this.buildPieChart(container);
        break;
      case "line":
      case "area":
        this.buildLineChart(container);
        break;
      case "waterfall":
        this.buildWaterfallChart(container);
        break;
      case "gauge":
        this.buildGaugeChart(container);
        break;
      case "treemap":
        this.buildTreemapChart(container);
        break;
    }
    if (this.interactive) {
      this.setupInteractivity(container);
    }
  }
  // ═══════════════════════════════════════════════════════════
  // التفاعلية: Raycasting + Tooltip + Hover + Click
  // ═══════════════════════════════════════════════════════════
  setupInteractivity(container) {
    this.mouseMoveHandler = (e) => {
      const hit = this.three.raycast(this.sceneId, e, this.bars.filter((b) => b instanceof Mesh || b instanceof Group));
      if (hit && hit.object.userData?.["chartItem"]) {
        const item = hit.object.userData["chartItem"];
        const rect = container.getBoundingClientRect();
        this.tooltipX = e.clientX - rect.left + 15;
        this.tooltipY = e.clientY - rect.top - 10;
        this.tooltipLabel = item.label;
        this.tooltipValue = new Intl.NumberFormat("ar-YE").format(item.value);
        if (this.data.length > 1) {
          const total = this.data.reduce((s, d) => s + d.value, 0);
          this.tooltipPct = (item.value / total * 100).toFixed(1) + "%";
        } else {
          this.tooltipPct = "";
        }
        this.tooltipVisible = true;
        if (this.hoveredObject !== hit.object) {
          this.resetHover();
          this.hoveredObject = hit.object;
          this.applyHover(hit.object);
        }
        container.style.cursor = "pointer";
      } else {
        this.tooltipVisible = false;
        if (this.hoveredObject) {
          this.resetHover();
          this.hoveredObject = null;
        }
        container.style.cursor = "grab";
      }
    };
    this.clickHandler = (e) => {
      const hit = this.three.raycast(this.sceneId, e, this.bars);
      if (hit && hit.object.userData?.["chartItem"]) {
        const item = hit.object.userData["chartItem"];
        const idx = hit.object.userData["chartIndex"];
        this.chartClick.emit({ item, index: idx });
      }
    };
    this.mouseLeaveHandler = () => {
      this.tooltipVisible = false;
      this.resetHover();
      this.hoveredObject = null;
    };
    container.addEventListener("mousemove", this.mouseMoveHandler);
    container.addEventListener("click", this.clickHandler);
    container.addEventListener("mouseleave", this.mouseLeaveHandler);
  }
  applyHover(obj) {
    if (obj instanceof Mesh) {
      const mesh = obj;
      const mat = mesh.material;
      mesh._origEmissive = mat.emissiveIntensity;
      mat.emissiveIntensity = 0.5;
      mesh.scale.multiplyScalar(1.08);
      mesh._isHovered = true;
    }
  }
  resetHover() {
    if (this.hoveredObject instanceof Mesh) {
      const mesh = this.hoveredObject;
      const mat = mesh.material;
      mat.emissiveIntensity = mesh._origEmissive ?? 0.1;
      mesh._isHovered = false;
      this.hoveredObject.scale.divideScalar(1.08);
    }
  }
  removeEventListeners() {
    const container = this.canvasRef?.nativeElement;
    if (!container)
      return;
    if (this.mouseMoveHandler)
      container.removeEventListener("mousemove", this.mouseMoveHandler);
    if (this.clickHandler)
      container.removeEventListener("click", this.clickHandler);
    if (this.mouseLeaveHandler)
      container.removeEventListener("mouseleave", this.mouseLeaveHandler);
  }
  // ═══════════════════════════════════════════════════════════
  // Export & Fullscreen
  // ═══════════════════════════════════════════════════════════
  onExport() {
    const filename = `${this.title || "chart"}-${Date.now()}.png`;
    this.three.exportAsImage(this.sceneId, filename);
  }
  toggleFullscreen() {
    const container = this.containerRef?.nativeElement;
    if (!container)
      return;
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
  buildBarChart(container) {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 988970 : 16317180,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      camera: { fov: 45, position: [6, 5, 10], lookAt: [0, 1.5, 0] },
      ambient: { color: 16777215, intensity: this.darkMode ? 0.35 : 0.6 },
      directional: { color: 16777215, intensity: this.darkMode ? 1.2 : 0.8, position: [8, 12, 8] }
    });
    const { scene } = this.managed;
    this.three.addRimLights(scene, [6514417, 440020], this.darkMode ? 0.3 : 0.1);
    const floorGeo = new PlaneGeometry(20, 20);
    const floorMat = new MeshStandardMaterial({
      color: this.darkMode ? 988970 : 14870768,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: this.darkMode ? 0.5 : 0.3
    });
    const floor = new Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);
    const grid = this.three.createGridLines(20, 20, this.darkMode ? 1976635 : 13095678, this.darkMode ? 3359061 : 14739455);
    scene.add(grid);
    const maxVal = Math.max(...this.data.map((d) => d.value), 1);
    const barWidth = 0.7;
    const barDepth = 0.7;
    const gap = 0.5;
    const totalWidth = this.data.length * (barWidth + gap) - gap;
    const startX = -totalWidth / 2 + barWidth / 2;
    this.data.forEach((item, i) => {
      const targetHeight = item.value / maxVal * this.maxBarHeight;
      const color = item.color ? parseInt(item.color.replace("#", ""), 16) : this.defaultColors[i % this.defaultColors.length];
      const x = startX + i * (barWidth + gap);
      const geo = new BoxGeometry(barWidth, 0.01, barDepth);
      const mat = new MeshPhysicalMaterial({
        color,
        metalness: 0.2,
        roughness: 0.3,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        emissive: color,
        emissiveIntensity: this.darkMode ? 0.15 : 0.05
      });
      const bar = new Mesh(geo, mat);
      bar.position.set(x, 5e-3, 0);
      bar.castShadow = true;
      bar.receiveShadow = true;
      bar.userData = { chartItem: item, chartIndex: i };
      bar._targetHeight = targetHeight;
      bar._currentHeight = 0.01;
      bar._growing = true;
      bar._growDelay = i * 0.15;
      bar._growStarted = false;
      this.bars.push(bar);
      scene.add(bar);
      if (this.darkMode) {
        const reflGeo = new BoxGeometry(barWidth, 0.01, barDepth);
        const reflMat = new MeshPhysicalMaterial({
          color,
          metalness: 0.2,
          roughness: 0.5,
          transparent: true,
          opacity: 0.15
        });
        const reflection = new Mesh(reflGeo, reflMat);
        reflection.position.set(x, -5e-3, 0);
        reflection.scale.y = -1;
        bar._reflection = reflection;
        scene.add(reflection);
      }
      const label = this.three.createTextSprite(item.label, this.darkMode ? "#94a3b8" : "#475569", 32, [x, -0.6, 0.8]);
      label.scale.set(2, 0.5, 1);
      this.labels.push(label);
      scene.add(label);
      const valText = item.value.toLocaleString("ar-YE");
      const valLabel = this.three.createTextSprite(valText, this.darkMode ? "#e2e8f0" : "#1e293b", 28, [x, targetHeight + 0.5, 0]);
      valLabel.scale.set(1.8, 0.45, 1);
      this.labels.push(valLabel);
      scene.add(valLabel);
    });
    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? "#f8fafc" : "#0f172a", 40, [0, this.maxBarHeight + 1.5, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }
    let cameraAngle = 0.5;
    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      this.bars.forEach((obj) => {
        const bar = obj;
        if (bar._growing) {
          if (!bar._growStarted) {
            if (elapsed >= (bar._growDelay ?? 0))
              bar._growStarted = true;
            else
              return;
          }
          const target = bar._targetHeight ?? 0.01;
          const progress = 1 - Math.pow(1 - Math.min((elapsed - (bar._growDelay ?? 0)) * 1.5, 1), 3);
          let current = target * progress;
          if (progress >= 0.99) {
            current = target;
            bar._growing = false;
          }
          bar._currentHeight = current;
          bar.scale.y = Math.max(current / 0.01, 1);
          bar.position.y = current / 2;
          if (bar._reflection) {
            bar._reflection.scale.y = -Math.max(current / 0.01, 1) * 0.3;
            bar._reflection.position.y = -current * 0.15;
          }
        }
        const mat = bar.material;
        if (mat.emissiveIntensity !== void 0 && !bar._isHovered) {
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
  buildPieChart(container) {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 988970 : 16317180,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      camera: { fov: 45, position: [0, 5, 7], lookAt: [0, 0, 0] },
      ambient: { color: 16777215, intensity: this.darkMode ? 0.4 : 0.6 },
      directional: { color: 16777215, intensity: this.darkMode ? 1 : 0.7, position: [5, 10, 5] }
    });
    const { scene } = this.managed;
    this.three.addRimLights(scene, [6514417], this.darkMode ? 0.5 : 0.2);
    const total = this.data.reduce((s, d) => s + d.value, 0);
    const radius = 2.8;
    const innerRadius = this.type === "donut" ? 1.5 : 0;
    const height = 0.6;
    let startAngle = -Math.PI / 2;
    this.data.forEach((item, i) => {
      const angle = item.value / total * Math.PI * 2;
      const color = item.color ? parseInt(item.color.replace("#", ""), 16) : this.defaultColors[i % this.defaultColors.length];
      const shape = new Shape();
      const segments = 48;
      if (innerRadius > 0) {
        shape.moveTo(Math.cos(startAngle) * innerRadius, Math.sin(startAngle) * innerRadius);
        for (let j = 0; j <= segments; j++) {
          const a = startAngle + angle * j / segments;
          shape.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
        }
        for (let j = segments; j >= 0; j--) {
          const a = startAngle + angle * j / segments;
          shape.lineTo(Math.cos(a) * innerRadius, Math.sin(a) * innerRadius);
        }
      } else {
        shape.moveTo(0, 0);
        for (let j = 0; j <= segments; j++) {
          const a = startAngle + angle * j / segments;
          shape.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
        }
        shape.lineTo(0, 0);
      }
      const geo = new ExtrudeGeometry(shape, {
        depth: height,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.06,
        bevelSegments: 4
      });
      const mat = new MeshPhysicalMaterial({
        color,
        metalness: 0.15,
        roughness: 0.25,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        emissive: color,
        emissiveIntensity: this.darkMode ? 0.1 : 0.03
      });
      const mesh = new Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.castShadow = true;
      const midAngle = startAngle + angle / 2;
      const explodeDistance = 0.15;
      mesh.position.x = Math.cos(midAngle) * explodeDistance;
      mesh.position.z = -Math.sin(midAngle) * explodeDistance;
      mesh.userData = { chartItem: item, chartIndex: i };
      mesh._midAngle = midAngle;
      mesh._entryDelay = i * 0.2;
      mesh._entered = false;
      mesh.scale.set(0, 0, 0);
      this.bars.push(mesh);
      scene.add(mesh);
      const labelDist = radius + 1.2;
      const lx = Math.cos(midAngle) * labelDist;
      const lz = -Math.sin(midAngle) * labelDist;
      const pct = (item.value / total * 100).toFixed(1) + "%";
      const label = this.three.createTextSprite(`${item.label}
${pct}`, this.darkMode ? "#e2e8f0" : "#1e293b", 26, [lx, 0.8, lz]);
      label.scale.set(2.5, 0.7, 1);
      this.labels.push(label);
      scene.add(label);
      startAngle += angle;
    });
    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? "#f8fafc" : "#0f172a", 40, [0, 3.5, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }
    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      this.bars.forEach((obj) => {
        const mesh = obj;
        if (!mesh._entered) {
          if (elapsed >= mesh._entryDelay) {
            const progress = Math.min((elapsed - mesh._entryDelay) * 2, 1);
            const elastic = 1 - Math.pow(2, -10 * progress) * Math.cos(progress * Math.PI * 2);
            mesh.scale.set(elastic, elastic, elastic);
            if (progress >= 1) {
              mesh._entered = true;
              mesh.scale.set(1, 1, 1);
            }
          }
        }
        mesh.position.y = Math.sin(elapsed * 0.5 + mesh._midAngle) * 0.02;
        const mat = mesh.material;
        mat.emissiveIntensity = (this.darkMode ? 0.08 : 0.02) + Math.sin(elapsed * 0.8 + mesh._midAngle) * 0.05;
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
  buildLineChart(container) {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 988970 : 16317180,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      camera: { fov: 45, position: [0, 4, 10], lookAt: [0, 1.5, 0] },
      ambient: { color: 16777215, intensity: this.darkMode ? 0.35 : 0.6 },
      directional: { color: 16777215, intensity: this.darkMode ? 0.8 : 0.5, position: [5, 10, 5] }
    });
    const { scene } = this.managed;
    const grid = this.three.createGridLines(20, 20, this.darkMode ? 1976635 : 13095678, this.darkMode ? 3359061 : 14739455);
    scene.add(grid);
    const maxVal = Math.max(...this.data.map((d) => d.value), 1);
    const totalWidth = 8;
    const spacing = totalWidth / Math.max(this.data.length - 1, 1);
    const startX = -totalWidth / 2;
    const color = this.defaultColors[0];
    const points = [];
    this.data.forEach((item, i) => {
      const x = startX + i * spacing;
      const y = item.value / maxVal * this.maxBarHeight;
      points.push(new Vector3(x, y, 0));
      const sphere = this.three.createGlowSphere(0.12, color, 0.8, [x, 0, 0]);
      sphere.userData = { chartItem: item, chartIndex: i };
      sphere._targetY = y;
      sphere._entryDelay = i * 0.1;
      this.bars.push(sphere);
      scene.add(sphere);
      const label = this.three.createTextSprite(item.label, this.darkMode ? "#94a3b8" : "#475569", 28, [x, -0.5, 0.5]);
      label.scale.set(1.5, 0.4, 1);
      this.labels.push(label);
      scene.add(label);
      const valLabel = this.three.createTextSprite(item.value.toLocaleString("ar-YE"), this.darkMode ? "#e2e8f0" : "#1e293b", 24, [x, y + 0.5, 0]);
      valLabel.scale.set(1.5, 0.4, 1);
      this.labels.push(valLabel);
      scene.add(valLabel);
    });
    if (points.length > 1) {
      const curve = new CatmullRomCurve3(points);
      const curvePoints = curve.getPoints(100);
      const lineGeo = new BufferGeometry().setFromPoints(curvePoints);
      const lineMat = new LineBasicMaterial({ color, transparent: true, opacity: 0.8 });
      scene.add(new Line(lineGeo, lineMat));
      if (this.type === "area") {
        const areaShape = new Shape();
        areaShape.moveTo(curvePoints[0].x, 0);
        curvePoints.forEach((p) => areaShape.lineTo(p.x, p.y));
        areaShape.lineTo(curvePoints[curvePoints.length - 1].x, 0);
        areaShape.lineTo(curvePoints[0].x, 0);
        const areaMat = new MeshBasicMaterial({
          color,
          transparent: true,
          opacity: this.darkMode ? 0.15 : 0.1,
          side: DoubleSide
        });
        scene.add(new Mesh(new ShapeGeometry(areaShape), areaMat));
      }
    }
    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? "#f8fafc" : "#0f172a", 40, [0, this.maxBarHeight + 1.5, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }
    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      this.bars.forEach((sphere, i) => {
        const delay = sphere._entryDelay || 0;
        if (elapsed >= delay) {
          const targetY = sphere._targetY;
          const progress = Math.min((elapsed - delay) * 2, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          sphere.position.y = targetY * eased;
        }
        const mat = sphere.material;
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
  buildWaterfallChart(container) {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 988970 : 16317180,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      camera: { fov: 45, position: [8, 6, 12], lookAt: [0, 1, 0] },
      ambient: { color: 16777215, intensity: this.darkMode ? 0.35 : 0.6 },
      directional: { color: 16777215, intensity: this.darkMode ? 1 : 0.7, position: [8, 12, 8] }
    });
    const { scene } = this.managed;
    this.three.addRimLights(scene, [1096065, 15680580], this.darkMode ? 0.3 : 0.1);
    const grid = this.three.createGridLines(20, 20, this.darkMode ? 1976635 : 13095678, this.darkMode ? 3359061 : 14739455);
    scene.add(grid);
    const floorGeo = new PlaneGeometry(20, 20);
    const floorMat = new MeshStandardMaterial({
      color: this.darkMode ? 988970 : 14870768,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.4
    });
    const floor = new Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);
    const maxVal = Math.max(...this.data.map((d) => Math.abs(d.value)), 1);
    const barWidth = 0.6;
    const gap = 0.4;
    const totalWidth = this.data.length * (barWidth + gap) - gap;
    const startX = -totalWidth / 2 + barWidth / 2;
    let runningY = 0;
    this.data.forEach((item, i) => {
      const isPositive = item.value >= 0;
      const height = Math.abs(item.value) / maxVal * this.maxBarHeight;
      const color = isPositive ? 1096065 : 15680580;
      const x = startX + i * (barWidth + gap);
      const geo = new BoxGeometry(barWidth, 0.01, barWidth);
      const mat = new MeshPhysicalMaterial({
        color,
        metalness: 0.2,
        roughness: 0.3,
        clearcoat: 0.6,
        emissive: color,
        emissiveIntensity: 0.15
      });
      const bar = new Mesh(geo, mat);
      bar.position.set(x, runningY + (isPositive ? 0 : -height), 0);
      bar.castShadow = true;
      bar.userData = { chartItem: item, chartIndex: i };
      bar._targetHeight = height;
      bar._baseY = runningY;
      bar._isPositive = isPositive;
      bar._growing = true;
      bar._growDelay = i * 0.2;
      bar._growStarted = false;
      this.bars.push(bar);
      scene.add(bar);
      if (i > 0) {
        const lineGeo = new BufferGeometry().setFromPoints([
          new Vector3(x - barWidth / 2 - gap, runningY, 0),
          new Vector3(x - barWidth / 2, runningY, 0)
        ]);
        const lineMat = new LineBasicMaterial({
          color: this.darkMode ? 4674921 : 9741240,
          transparent: true,
          opacity: 0.5
        });
        scene.add(new Line(lineGeo, lineMat));
      }
      const arrowGeo = new ConeGeometry(0.12, 0.3, 6);
      const arrowMat = new MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.8
      });
      const arrow = new Mesh(arrowGeo, arrowMat);
      arrow.position.set(x, runningY + (isPositive ? height + 0.3 : -height - 0.3), 0);
      if (!isPositive)
        arrow.rotation.z = Math.PI;
      scene.add(arrow);
      const label = this.three.createTextSprite(item.label, this.darkMode ? "#94a3b8" : "#475569", 28, [x, -0.8, 0.6]);
      label.scale.set(1.8, 0.45, 1);
      scene.add(label);
      const prefix = isPositive ? "+" : "";
      const valLabel = this.three.createTextSprite(prefix + item.value.toLocaleString("ar-YE"), isPositive ? "#34d399" : "#f87171", 26, [x, runningY + (isPositive ? height + 0.7 : -height - 0.7), 0]);
      valLabel.scale.set(1.8, 0.45, 1);
      scene.add(valLabel);
      runningY += isPositive ? height : -height;
    });
    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? "#f8fafc" : "#0f172a", 40, [0, this.maxBarHeight + 2, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }
    let cameraAngle = 0.3;
    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      this.bars.forEach((obj) => {
        const bar = obj;
        if (bar._growing) {
          if (!bar._growStarted) {
            if (elapsed >= bar._growDelay)
              bar._growStarted = true;
            else
              return;
          }
          const target = bar._targetHeight;
          const progress = 1 - Math.pow(1 - Math.min((elapsed - bar._growDelay) * 1.2, 1), 3);
          const current = target * progress;
          bar.scale.y = Math.max(current / 0.01, 1);
          const baseY = bar._baseY;
          const isPos = bar._isPositive;
          bar.position.y = baseY + (isPos ? current / 2 : -current / 2);
          if (progress >= 0.99)
            bar._growing = false;
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
  buildGaugeChart(container) {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 988970 : 16317180,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      camera: { fov: 45, position: [0, 1, 6], lookAt: [0, 0.5, 0] },
      ambient: { color: 16777215, intensity: this.darkMode ? 0.4 : 0.6 },
      directional: { color: 16777215, intensity: this.darkMode ? 0.8 : 0.5, position: [3, 8, 5] }
    });
    const { scene } = this.managed;
    const ratio = this.gaugeMax > 0 ? this.gaugeValue / this.gaugeMax : 0;
    let gaugeColor = 1096065;
    if (ratio > 0.8)
      gaugeColor = 15680580;
    else if (ratio > 0.6)
      gaugeColor = 16096779;
    const gauge = this.three.createGauge(this.gaugeValue, this.gaugeMax, 2, gaugeColor, this.darkMode ? 1976635 : 14870768);
    scene.add(gauge);
    const valueText = new Intl.NumberFormat("ar-YE").format(this.gaugeValue);
    const valueSprite = this.three.createTextSprite(valueText, this.darkMode ? "#f8fafc" : "#0f172a", 48, [0, -0.3, 0.1]);
    valueSprite.scale.set(3, 0.8, 1);
    scene.add(valueSprite);
    const pctText = (ratio * 100).toFixed(0) + "%";
    const pctSprite = this.three.createTextSprite(pctText, this.darkMode ? "#818cf8" : "#4f46e5", 36, [0, -0.9, 0.1]);
    pctSprite.scale.set(2, 0.5, 1);
    scene.add(pctSprite);
    if (this.gaugeLabel || this.title) {
      const labelSprite = this.three.createTextSprite(this.gaugeLabel || this.title, this.darkMode ? "#94a3b8" : "#64748b", 30, [0, -1.5, 0.1]);
      labelSprite.scale.set(3, 0.7, 1);
      scene.add(labelSprite);
    }
    const particles = this.three.createParticleSystem(40, 10, gaugeColor, 0.03);
    scene.add(particles);
    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
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
  buildTreemapChart(container) {
    this.managed = this.three.createScene(this.sceneId, container, {
      clearColor: this.darkMode ? 988970 : 16317180,
      clearAlpha: this.darkMode ? 0.95 : 0.9,
      camera: { fov: 50, position: [0, 8, 8], lookAt: [0, 0, 0] },
      ambient: { color: 16777215, intensity: this.darkMode ? 0.4 : 0.6 },
      directional: { color: 16777215, intensity: this.darkMode ? 1 : 0.7, position: [5, 12, 5] }
    });
    const { scene } = this.managed;
    this.three.addRimLights(scene, [6514417, 440020, 1096065], this.darkMode ? 0.3 : 0.1);
    const floorGeo = new PlaneGeometry(12, 12);
    const floorMat = new MeshStandardMaterial({
      color: this.darkMode ? 988970 : 14870768,
      metalness: 0.7,
      roughness: 0.3,
      transparent: true,
      opacity: 0.4
    });
    const floor = new Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    scene.add(floor);
    const treemapData = this.data.map((item, i) => ({
      label: item.label,
      value: item.value,
      color: item.color ? parseInt(item.color.replace("#", ""), 16) : this.defaultColors[i % this.defaultColors.length]
    }));
    const treemap = this.three.createTreemapBlocks(treemapData, 8, 8, this.maxBarHeight);
    scene.add(treemap);
    treemap.children.forEach((child, i) => {
      if (child instanceof Mesh && i < this.data.length) {
        child.userData = { chartItem: this.data[i], chartIndex: i };
        this.bars.push(child);
        const label = this.three.createTextSprite(this.data[i].label, this.darkMode ? "#e2e8f0" : "#1e293b", 24, [child.position.x, child.position.y + child.scale.y * 0.5 + 0.5, child.position.z]);
        label.scale.set(2, 0.5, 1);
        scene.add(label);
      }
    });
    treemap.children.forEach((child, i) => {
      if (child instanceof Mesh) {
        const targetY = child.position.y;
        child.position.y = -2;
        child._targetY = targetY;
        child._entryDelay = i * 0.1;
        child._entered = false;
      }
    });
    if (this.title) {
      const titleSprite = this.three.createTextSprite(this.title, this.darkMode ? "#f8fafc" : "#0f172a", 40, [0, this.maxBarHeight + 1.5, 0]);
      titleSprite.scale.set(5, 1.2, 1);
      scene.add(titleSprite);
    }
    const managed = this.managed;
    this.three.animate(this.sceneId, (delta, elapsed) => {
      treemap.children.forEach((child) => {
        if (child instanceof Mesh && !child._entered) {
          const delay = child._entryDelay || 0;
          if (elapsed >= delay) {
            const progress = Math.min((elapsed - delay) * 1.5, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            child.position.y = -2 + (child._targetY + 2) * eased;
            if (progress >= 1) {
              child.position.y = child._targetY;
              child._entered = true;
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
  ngOnDestroy() {
    this.removeEventListeners();
    this.three.destroyScene(this.sceneId);
  }
  static \u0275fac = function ThreeChartComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThreeChartComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ThreeChartComponent, selectors: [["app-three-chart"]], viewQuery: function ThreeChartComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5)(_c1, 5)(_c2, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.canvasRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.containerRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tooltipRef = _t.first);
    }
  }, inputs: { type: "type", data: "data", title: "title", maxBarHeight: "maxBarHeight", autoRotate: "autoRotate", rotateSpeed: "rotateSpeed", darkMode: "darkMode", showExport: "showExport", showFullscreen: "showFullscreen", interactive: "interactive", gaugeValue: "gaugeValue", gaugeMax: "gaugeMax", gaugeLabel: "gaugeLabel" }, outputs: { chartClick: "chartClick" }, features: [\u0275\u0275NgOnChangesFeature], decls: 13, vars: 11, consts: [["chartContainer", ""], ["chartCanvas", ""], ["tooltip", ""], [1, "three-chart-container"], [1, "three-chart-canvas"], [1, "chart-tooltip"], [1, "tooltip-label"], [1, "tooltip-value"], [1, "tooltip-pct"], ["title", "\u062A\u0635\u062F\u064A\u0631 \u0643\u0635\u0648\u0631\u0629", 1, "export-btn"], ["title", "\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629", 1, "fullscreen-btn"], ["title", "\u062A\u0635\u062F\u064A\u0631 \u0643\u0635\u0648\u0631\u0629", 1, "export-btn", 3, "click"], [1, "material-icons-round"], ["title", "\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629", 1, "fullscreen-btn", 3, "click"]], template: function ThreeChartComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 3, 0);
      \u0275\u0275domElement(2, "div", 4, 1);
      \u0275\u0275domElementStart(4, "div", 5, 2)(6, "div", 6);
      \u0275\u0275text(7);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "div", 7);
      \u0275\u0275text(9);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(10, ThreeChartComponent_Conditional_10_Template, 2, 1, "div", 8);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(11, ThreeChartComponent_Conditional_11_Template, 3, 0, "button", 9);
      \u0275\u0275conditionalCreate(12, ThreeChartComponent_Conditional_12_Template, 3, 1, "button", 10);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275styleProp("left", ctx.tooltipX, "px")("top", ctx.tooltipY, "px");
      \u0275\u0275classProp("visible", ctx.tooltipVisible);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.tooltipLabel);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.tooltipValue);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.tooltipPct ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showExport ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showFullscreen ? 12 : -1);
    }
  }, styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  min-height: 250px;\n}\n.three-chart-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.three-chart-canvas[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 12px;\n  overflow: hidden;\n  cursor: grab;\n}\n.three-chart-canvas[_ngcontent-%COMP%]:active {\n  cursor: grabbing;\n}\n.chart-tooltip[_ngcontent-%COMP%] {\n  position: absolute;\n  pointer-events: none;\n  background: rgba(15, 23, 42, 0.92);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(99, 102, 241, 0.3);\n  border-radius: 10px;\n  padding: 10px 16px;\n  opacity: 0;\n  transform: translateY(8px) scale(0.95);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  z-index: 100;\n  white-space: nowrap;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n}\n.chart-tooltip.visible[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateY(0) scale(1);\n}\n.tooltip-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: #e2e8f0;\n  margin-bottom: 4px;\n}\n.tooltip-value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: #818cf8;\n}\n.tooltip-pct[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n  margin-top: 2px;\n}\n.export-btn[_ngcontent-%COMP%], \n.fullscreen-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  background: rgba(15, 23, 42, 0.7);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(99, 102, 241, 0.2);\n  border-radius: 8px;\n  padding: 6px;\n  cursor: pointer;\n  color: #94a3b8;\n  transition: all 0.2s;\n  z-index: 10;\n}\n.export-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%], \n.fullscreen-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.export-btn[_ngcontent-%COMP%]:hover, \n.fullscreen-btn[_ngcontent-%COMP%]:hover {\n  color: #818cf8;\n  border-color: rgba(99, 102, 241, 0.4);\n  background: rgba(15, 23, 42, 0.9);\n}\n.export-btn[_ngcontent-%COMP%] {\n  left: 10px;\n}\n.fullscreen-btn[_ngcontent-%COMP%] {\n  left: 44px;\n}\n/*# sourceMappingURL=three-chart.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThreeChartComponent, [{
    type: Component,
    args: [{ selector: "app-three-chart", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
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
        <button class="export-btn" (click)="onExport()" title="\u062A\u0635\u062F\u064A\u0631 \u0643\u0635\u0648\u0631\u0629">
          <span class="material-icons-round">download</span>
        </button>
      }
      @if (showFullscreen) {
        <button class="fullscreen-btn" (click)="toggleFullscreen()" title="\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629">
          <span class="material-icons-round">{{ isFullscreen ? 'fullscreen_exit' : 'fullscreen' }}</span>
        </button>
      }
    </div>
  `, styles: ["/* angular:styles/component:scss;558202c4da4696281a6eb6facebdb64911d9851ce4a304cd68d22e7bbd70b3ca;F:/Hhhhh/hesabati/frontend/src/app/components/three-chart/three-chart.ts */\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  min-height: 250px;\n}\n.three-chart-container {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.three-chart-canvas {\n  width: 100%;\n  height: 100%;\n  border-radius: 12px;\n  overflow: hidden;\n  cursor: grab;\n}\n.three-chart-canvas:active {\n  cursor: grabbing;\n}\n.chart-tooltip {\n  position: absolute;\n  pointer-events: none;\n  background: rgba(15, 23, 42, 0.92);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(99, 102, 241, 0.3);\n  border-radius: 10px;\n  padding: 10px 16px;\n  opacity: 0;\n  transform: translateY(8px) scale(0.95);\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  z-index: 100;\n  white-space: nowrap;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n}\n.chart-tooltip.visible {\n  opacity: 1;\n  transform: translateY(0) scale(1);\n}\n.tooltip-label {\n  font-size: 13px;\n  font-weight: 700;\n  color: #e2e8f0;\n  margin-bottom: 4px;\n}\n.tooltip-value {\n  font-size: 18px;\n  font-weight: 800;\n  color: #818cf8;\n}\n.tooltip-pct {\n  font-size: 12px;\n  color: #94a3b8;\n  margin-top: 2px;\n}\n.export-btn,\n.fullscreen-btn {\n  position: absolute;\n  top: 10px;\n  background: rgba(15, 23, 42, 0.7);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(99, 102, 241, 0.2);\n  border-radius: 8px;\n  padding: 6px;\n  cursor: pointer;\n  color: #94a3b8;\n  transition: all 0.2s;\n  z-index: 10;\n}\n.export-btn .material-icons-round,\n.fullscreen-btn .material-icons-round {\n  font-size: 18px;\n}\n.export-btn:hover,\n.fullscreen-btn:hover {\n  color: #818cf8;\n  border-color: rgba(99, 102, 241, 0.4);\n  background: rgba(15, 23, 42, 0.9);\n}\n.export-btn {\n  left: 10px;\n}\n.fullscreen-btn {\n  left: 44px;\n}\n/*# sourceMappingURL=three-chart.css.map */\n"] }]
  }], null, { canvasRef: [{
    type: ViewChild,
    args: ["chartCanvas"]
  }], containerRef: [{
    type: ViewChild,
    args: ["chartContainer"]
  }], tooltipRef: [{
    type: ViewChild,
    args: ["tooltip"]
  }], type: [{
    type: Input
  }], data: [{
    type: Input
  }], title: [{
    type: Input
  }], maxBarHeight: [{
    type: Input
  }], autoRotate: [{
    type: Input
  }], rotateSpeed: [{
    type: Input
  }], darkMode: [{
    type: Input
  }], showExport: [{
    type: Input
  }], showFullscreen: [{
    type: Input
  }], interactive: [{
    type: Input
  }], gaugeValue: [{
    type: Input
  }], gaugeMax: [{
    type: Input
  }], gaugeLabel: [{
    type: Input
  }], chartClick: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ThreeChartComponent, { className: "ThreeChartComponent", filePath: "src/app/components/three-chart/three-chart.ts", lineNumber: 104 });
})();

// src/app/components/three-stat-card/three-stat-card.ts
function ThreeStatCardComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 13);
  }
  if (rf & 2) {
    const d_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", d_r1.x, "%")("top", d_r1.y, "%")("animation-delay", d_r1.delay + "s")("background", ctx_r1.color + "44");
  }
}
var ThreeStatCardComponent = class _ThreeStatCardComponent {
  value = 0;
  label = "";
  icon = "analytics";
  color = "#6366f1";
  theme = inject(ThemeService);
  isHovered = false;
  // نقاط عشوائية للتأثير البصري
  dots = Array.from({ length: 8 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3
  }));
  get isDark() {
    return this.theme.isDark?.() ?? true;
  }
  get formattedValue() {
    return new Intl.NumberFormat("ar-YE").format(this.value);
  }
  get iconBg() {
    return this.color + "22";
  }
  static \u0275fac = function ThreeStatCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThreeStatCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ThreeStatCardComponent, selectors: [["app-three-stat-card"]], inputs: { value: "value", label: "label", icon: "icon", color: "color" }, decls: 17, vars: 17, consts: [[1, "stat-card-3d", 3, "mouseenter", "mouseleave"], [1, "card-bg-effect"], [1, "floating-shape", "shape-1"], [1, "floating-shape", "shape-2"], [1, "floating-shape", "shape-3"], [1, "particle-dots"], [1, "dot", 3, "left", "top", "animation-delay", "background"], [1, "stat-content"], [1, "stat-icon-wrap"], [1, "material-icons-round"], [1, "stat-info"], [1, "stat-value"], [1, "stat-label"], [1, "dot"]], template: function ThreeStatCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275domListener("mouseenter", function ThreeStatCardComponent_Template_div_mouseenter_0_listener() {
        return ctx.isHovered = true;
      })("mouseleave", function ThreeStatCardComponent_Template_div_mouseleave_0_listener() {
        return ctx.isHovered = false;
      });
      \u0275\u0275domElementStart(1, "div", 1);
      \u0275\u0275domElement(2, "div", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275domElementStart(5, "div", 5);
      \u0275\u0275repeaterCreate(6, ThreeStatCardComponent_For_7_Template, 1, 8, "span", 6, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "div", 7)(9, "div", 8)(10, "span", 9);
      \u0275\u0275text(11);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(12, "div", 10)(13, "span", 11);
      \u0275\u0275text(14);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "span", 12);
      \u0275\u0275text(16);
      \u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("light-mode", !ctx.isDark)("hovered", ctx.isHovered);
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("background", ctx.color + "33");
      \u0275\u0275advance();
      \u0275\u0275styleProp("background", ctx.color + "22");
      \u0275\u0275advance();
      \u0275\u0275styleProp("background", ctx.color + "18");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.dots);
      \u0275\u0275advance(3);
      \u0275\u0275styleProp("background", ctx.iconBg);
      \u0275\u0275advance();
      \u0275\u0275styleProp("color", ctx.color);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.icon);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.formattedValue);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.label);
    }
  }, styles: ["\n\n@keyframes _ngcontent-%COMP%_floatShape1 {\n  0%, 100% {\n    transform: translate(0, 0) rotate(0deg) scale(1);\n  }\n  25% {\n    transform: translate(10px, -15px) rotate(45deg) scale(1.1);\n  }\n  50% {\n    transform: translate(-5px, -25px) rotate(90deg) scale(0.95);\n  }\n  75% {\n    transform: translate(15px, -10px) rotate(135deg) scale(1.05);\n  }\n}\n@keyframes _ngcontent-%COMP%_floatShape2 {\n  0%, 100% {\n    transform: translate(0, 0) rotate(0deg);\n  }\n  33% {\n    transform: translate(-12px, 10px) rotate(-60deg);\n  }\n  66% {\n    transform: translate(8px, -8px) rotate(60deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_floatShape3 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(5px, -12px) scale(1.15);\n  }\n}\n@keyframes _ngcontent-%COMP%_dotPulse {\n  0%, 100% {\n    opacity: 0.2;\n    transform: scale(0.8);\n  }\n  50% {\n    opacity: 0.7;\n    transform: scale(1.2);\n  }\n}\n[_nghost-%COMP%] {\n  display: block;\n}\n.stat-card-3d[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 16px;\n  overflow: hidden;\n  background: rgba(15, 23, 42, 0.6);\n  -webkit-backdrop-filter: blur(20px);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(99, 102, 241, 0.15);\n  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;\n  cursor: pointer;\n  perspective: 800px;\n}\n.stat-card-3d.light-mode[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.85);\n  border-color: rgba(99, 102, 241, 0.12);\n}\n.stat-card-3d.hovered[_ngcontent-%COMP%] {\n  transform: translateY(-4px) scale(1.02);\n  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.1);\n  border-color: rgba(99, 102, 241, 0.3);\n}\n.stat-card-3d.light-mode.hovered[_ngcontent-%COMP%] {\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1), 0 0 20px rgba(99, 102, 241, 0.08);\n}\n.card-bg-effect[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  opacity: 0.35;\n  transition: opacity 0.3s ease;\n  overflow: hidden;\n}\n.stat-card-3d.hovered[_ngcontent-%COMP%]   .card-bg-effect[_ngcontent-%COMP%] {\n  opacity: 0.65;\n}\n.floating-shape[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 30%;\n  filter: blur(8px);\n}\n.shape-1[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  top: -10px;\n  right: -10px;\n  animation: _ngcontent-%COMP%_floatShape1 8s ease-in-out infinite;\n}\n.shape-2[_ngcontent-%COMP%] {\n  width: 45px;\n  height: 45px;\n  bottom: -5px;\n  left: 10px;\n  animation: _ngcontent-%COMP%_floatShape2 10s ease-in-out infinite;\n}\n.shape-3[_ngcontent-%COMP%] {\n  width: 35px;\n  height: 35px;\n  top: 50%;\n  right: 30%;\n  animation: _ngcontent-%COMP%_floatShape3 6s ease-in-out infinite;\n}\n.particle-dots[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.dot[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 3px;\n  height: 3px;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_dotPulse 3s ease-in-out infinite;\n}\n.stat-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 24px;\n}\n.stat-icon-wrap[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: transform 0.3s ease;\n}\n.stat-card-3d.hovered[_ngcontent-%COMP%]   .stat-icon-wrap[_ngcontent-%COMP%] {\n  transform: scale(1.1) rotate(-5deg);\n}\n.stat-icon-wrap[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n}\n.stat-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 700;\n  color: #f1f5f9;\n  letter-spacing: -0.02em;\n}\n.light-mode[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  color: #0f172a;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #94a3b8;\n  font-weight: 500;\n}\n.light-mode[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n/*# sourceMappingURL=three-stat-card.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThreeStatCardComponent, [{
    type: Component,
    args: [{ selector: "app-three-stat-card", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="stat-card-3d" [class.light-mode]="!isDark"
         (mouseenter)="isHovered = true" (mouseleave)="isHovered = false"
         [class.hovered]="isHovered">
      <!-- \u062E\u0644\u0641\u064A\u0629 \u0645\u062A\u062D\u0631\u0643\u0629 CSS \u0628\u062F\u0644\u0627\u064B \u0645\u0646 WebGL -->
      <div class="card-bg-effect">
        <div class="floating-shape shape-1" [style.background]="color + '33'"></div>
        <div class="floating-shape shape-2" [style.background]="color + '22'"></div>
        <div class="floating-shape shape-3" [style.background]="color + '18'"></div>
        <div class="particle-dots">
          @for (d of dots; track $index) {
            <span class="dot" [style.left.%]="d.x" [style.top.%]="d.y"
                  [style.animation-delay]="d.delay + 's'" [style.background]="color + '44'"></span>
          }
        </div>
      </div>
      <div class="stat-content">
        <div class="stat-icon-wrap" [style.background]="iconBg">
          <span class="material-icons-round" [style.color]="color">{{ icon }}</span>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ formattedValue }}</span>
          <span class="stat-label">{{ label }}</span>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;b8d6075b8a5f6ccc5b90e88a6516efef9f671a2e500f023220275cb637b00113;F:/Hhhhh/hesabati/frontend/src/app/components/three-stat-card/three-stat-card.ts */\n@keyframes floatShape1 {\n  0%, 100% {\n    transform: translate(0, 0) rotate(0deg) scale(1);\n  }\n  25% {\n    transform: translate(10px, -15px) rotate(45deg) scale(1.1);\n  }\n  50% {\n    transform: translate(-5px, -25px) rotate(90deg) scale(0.95);\n  }\n  75% {\n    transform: translate(15px, -10px) rotate(135deg) scale(1.05);\n  }\n}\n@keyframes floatShape2 {\n  0%, 100% {\n    transform: translate(0, 0) rotate(0deg);\n  }\n  33% {\n    transform: translate(-12px, 10px) rotate(-60deg);\n  }\n  66% {\n    transform: translate(8px, -8px) rotate(60deg);\n  }\n}\n@keyframes floatShape3 {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  50% {\n    transform: translate(5px, -12px) scale(1.15);\n  }\n}\n@keyframes dotPulse {\n  0%, 100% {\n    opacity: 0.2;\n    transform: scale(0.8);\n  }\n  50% {\n    opacity: 0.7;\n    transform: scale(1.2);\n  }\n}\n:host {\n  display: block;\n}\n.stat-card-3d {\n  position: relative;\n  border-radius: 16px;\n  overflow: hidden;\n  background: rgba(15, 23, 42, 0.6);\n  -webkit-backdrop-filter: blur(20px);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(99, 102, 241, 0.15);\n  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;\n  cursor: pointer;\n  perspective: 800px;\n}\n.stat-card-3d.light-mode {\n  background: rgba(255, 255, 255, 0.85);\n  border-color: rgba(99, 102, 241, 0.12);\n}\n.stat-card-3d.hovered {\n  transform: translateY(-4px) scale(1.02);\n  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.1);\n  border-color: rgba(99, 102, 241, 0.3);\n}\n.stat-card-3d.light-mode.hovered {\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1), 0 0 20px rgba(99, 102, 241, 0.08);\n}\n.card-bg-effect {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  opacity: 0.35;\n  transition: opacity 0.3s ease;\n  overflow: hidden;\n}\n.stat-card-3d.hovered .card-bg-effect {\n  opacity: 0.65;\n}\n.floating-shape {\n  position: absolute;\n  border-radius: 30%;\n  filter: blur(8px);\n}\n.shape-1 {\n  width: 60px;\n  height: 60px;\n  top: -10px;\n  right: -10px;\n  animation: floatShape1 8s ease-in-out infinite;\n}\n.shape-2 {\n  width: 45px;\n  height: 45px;\n  bottom: -5px;\n  left: 10px;\n  animation: floatShape2 10s ease-in-out infinite;\n}\n.shape-3 {\n  width: 35px;\n  height: 35px;\n  top: 50%;\n  right: 30%;\n  animation: floatShape3 6s ease-in-out infinite;\n}\n.particle-dots {\n  position: absolute;\n  inset: 0;\n}\n.dot {\n  position: absolute;\n  width: 3px;\n  height: 3px;\n  border-radius: 50%;\n  animation: dotPulse 3s ease-in-out infinite;\n}\n.stat-content {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 24px;\n}\n.stat-icon-wrap {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: transform 0.3s ease;\n}\n.stat-card-3d.hovered .stat-icon-wrap {\n  transform: scale(1.1) rotate(-5deg);\n}\n.stat-icon-wrap .material-icons-round {\n  font-size: 26px;\n}\n.stat-info {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.stat-value {\n  font-size: 1.6rem;\n  font-weight: 700;\n  color: #f1f5f9;\n  letter-spacing: -0.02em;\n}\n.light-mode .stat-value {\n  color: #0f172a;\n}\n.stat-label {\n  font-size: 0.85rem;\n  color: #94a3b8;\n  font-weight: 500;\n}\n.light-mode .stat-label {\n  color: #64748b;\n}\n/*# sourceMappingURL=three-stat-card.css.map */\n"] }]
  }], null, { value: [{
    type: Input
  }], label: [{
    type: Input
  }], icon: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ThreeStatCardComponent, { className: "ThreeStatCardComponent", filePath: "src/app/components/three-stat-card/three-stat-card.ts", lineNumber: 171 });
})();

// src/app/pages/dashboard/dashboard.ts
var _forTrack0 = ($index, $item) => $item.id;
function DashboardComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "div", 3);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "span", 16);
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 38);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.retry());
    });
    \u0275\u0275elementStart(6, "span", 16);
    \u0275\u0275text(7, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.loadError());
  }
}
function DashboardComponent_Conditional_3_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "h3", 24)(2, "span", 16);
    \u0275\u0275text(3, "bar_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062F ");
    \u0275\u0275elementStart(5, "button", 39);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Conditional_78_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.togglePresentation());
    });
    \u0275\u0275elementStart(6, "span", 16);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 40)(9, "div", 41)(10, "app-three-chart", 42);
    \u0275\u0275listener("chartClick", function DashboardComponent_Conditional_3_Conditional_78_Template_app_three_chart_chartClick_10_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onChartClick($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 41)(12, "app-three-chart", 43);
    \u0275\u0275listener("chartClick", function DashboardComponent_Conditional_3_Conditional_78_Template_app_three_chart_chartClick_12_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onChartClick($event));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.presentationMode() ? "grid_view" : "slideshow");
    \u0275\u0275advance(3);
    \u0275\u0275property("data", ctx_r2.chartData())("maxBarHeight", 4)("autoRotate", true)("rotateSpeed", 0.08)("interactive", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r2.chartData())("autoRotate", true)("rotateSpeed", 0.12)("interactive", true);
  }
}
function DashboardComponent_Conditional_3_Conditional_79_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275element(1, "app-three-chart", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r2.waterfallData())("maxBarHeight", 3)("autoRotate", true)("rotateSpeed", 0.06)("interactive", true);
  }
}
function DashboardComponent_Conditional_3_Conditional_79_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "app-three-chart", 47);
    \u0275\u0275listener("chartClick", function DashboardComponent_Conditional_3_Conditional_79_Conditional_9_Template_app_three_chart_chartClick_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onChartClick($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx_r2.treemapData())("maxBarHeight", 3)("autoRotate", true)("rotateSpeed", 0.06)("interactive", true);
  }
}
function DashboardComponent_Conditional_3_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "h3", 24)(2, "span", 16);
    \u0275\u0275text(3, "insights");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0645\u062A\u0642\u062F\u0645\u0629 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 44);
    \u0275\u0275conditionalCreate(6, DashboardComponent_Conditional_3_Conditional_79_Conditional_6_Template, 2, 5, "div", 41);
    \u0275\u0275elementStart(7, "div", 41);
    \u0275\u0275element(8, "app-three-chart", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, DashboardComponent_Conditional_3_Conditional_79_Conditional_9_Template, 2, 5, "div", 41);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r2.waterfallData().length > 0 ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("gaugeValue", ctx_r2.gaugeValue())("gaugeMax", ctx_r2.gaugeMax())("autoRotate", true)("rotateSpeed", 0.05);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.treemapData().length > 0 ? 9 : -1);
  }
}
function DashboardComponent_Conditional_3_For_88_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1, "\u0646\u0634\u0637\u0629");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_3_For_88_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1, "\u063A\u064A\u0631 \u0646\u0634\u0637\u0629");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_3_For_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_For_88_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.navigate("stations"));
    });
    \u0275\u0275elementStart(1, "div", 49)(2, "span", 16);
    \u0275\u0275text(3, "location_on");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 50)(5, "span", 51);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 52);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, DashboardComponent_Conditional_3_For_88_Conditional_9_Template, 2, 0, "span", 53)(10, DashboardComponent_Conditional_3_For_88_Conditional_10_Template, 2, 0, "span", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r2.biz.currentBusinessColor() + "18")("color", ctx_r2.biz.currentBusinessColor());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r7.location || "");
    \u0275\u0275advance();
    \u0275\u0275conditional(s_r7.isActive ? 9 : 10);
  }
}
function DashboardComponent_Conditional_3_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062D\u0637\u0627\u062A");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_3_For_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 55)(2, "span", 16);
    \u0275\u0275text(3, "person");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 50)(5, "span", 51);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 52);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 56);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(p_r8.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r8.role || "\u0634\u0631\u064A\u0643");
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r2.biz.currentBusinessColor());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r8.sharePercentage, "% ");
  }
}
function DashboardComponent_Conditional_3_Conditional_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275text(1, "\u0644\u0627 \u064A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u0621");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_3_Conditional_99_For_7_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1, "\u0646\u0634\u0637");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_3_Conditional_99_For_7_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1, "\u063A\u064A\u0631 \u0646\u0634\u0637");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_3_Conditional_99_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Conditional_99_For_7_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.navigate("warehouse"));
    });
    \u0275\u0275elementStart(1, "div", 57)(2, "span", 16);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 50)(5, "span", 51);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 52);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, DashboardComponent_Conditional_3_Conditional_99_For_7_Conditional_9_Template, 2, 0, "span", 53)(10, DashboardComponent_Conditional_3_Conditional_99_For_7_Conditional_10_Template, 2, 0, "span", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(w_r10.warehouseType === "main" ? "store" : "local_gas_station");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(w_r10.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r2.getWarehouseTypeLabel(w_r10.warehouseType), "", w_r10.code ? " \u2014 " + w_r10.code : "");
    \u0275\u0275advance();
    \u0275\u0275conditional(w_r10.isActive ? 9 : 10);
  }
}
function DashboardComponent_Conditional_3_Conditional_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "h3", 24)(2, "span", 16);
    \u0275\u0275text(3, "warehouse");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 34);
    \u0275\u0275repeaterCreate(6, DashboardComponent_Conditional_3_Conditional_99_For_7_Template, 11, 5, "div", 35, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u0627\u0644\u0645\u062E\u0627\u0632\u0646 (", ctx_r2.warehouses().length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.warehouses());
  }
}
function DashboardComponent_Conditional_3_Conditional_100_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "div", 60)(2, "span", 16);
    \u0275\u0275text(3, "error_outline");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 50)(5, "span", 51);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 52);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "span", 61);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r11 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(p_r11.personOrEntity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r11.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r11.status === "pending" ? "\u0645\u0639\u0644\u0642" : p_r11.status);
  }
}
function DashboardComponent_Conditional_3_Conditional_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "h3", 58)(2, "span", 16);
    \u0275\u0275text(3, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 34);
    \u0275\u0275repeaterCreate(6, DashboardComponent_Conditional_3_Conditional_100_For_7_Template, 11, 3, "div", 59, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629 (", ctx_r2.pendingAccounts().length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.pendingAccounts());
  }
}
function DashboardComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, DashboardComponent_Conditional_3_Conditional_0_Template, 9, 1, "div", 4);
    \u0275\u0275elementStart(1, "div", 5)(2, "app-three-stat-card", 6);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Template_app_three_stat_card_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate("stations"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-three-stat-card", 7);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Template_app_three_stat_card_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate("employees"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "app-three-stat-card", 8);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Template_app_three_stat_card_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate("accounts"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "app-three-stat-card", 9);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Template_app_three_stat_card_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate("funds"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "app-three-stat-card", 10);
    \u0275\u0275elementStart(7, "app-three-stat-card", 11);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Template_app_three_stat_card_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate("suppliers"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "app-three-stat-card", 12);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Template_app_three_stat_card_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate("warehouse"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 13)(10, "div", 14)(11, "div", 15)(12, "span", 16);
    \u0275\u0275text(13, "arrow_downward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 17)(15, "span", 18);
    \u0275\u0275text(16, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0642\u0628\u0636");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 19);
    \u0275\u0275text(18);
    \u0275\u0275elementStart(19, "small");
    \u0275\u0275text(20, "\u0631.\u064A");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(21, "div", 20)(22, "div", 15)(23, "span", 16);
    \u0275\u0275text(24, "arrow_upward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 17)(26, "span", 18);
    \u0275\u0275text(27, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 19);
    \u0275\u0275text(29);
    \u0275\u0275elementStart(30, "small");
    \u0275\u0275text(31, "\u0631.\u064A");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "div", 21)(33, "div", 15)(34, "span", 16);
    \u0275\u0275text(35, "account_balance");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 17)(37, "span", 18);
    \u0275\u0275text(38, "\u0635\u0627\u0641\u064A \u0627\u0644\u0623\u0631\u0635\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 19);
    \u0275\u0275text(40);
    \u0275\u0275elementStart(41, "small");
    \u0275\u0275text(42, "\u0631.\u064A");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(43, "div", 22)(44, "div", 15)(45, "span", 16);
    \u0275\u0275text(46, "receipt_long");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 17)(48, "span", 18);
    \u0275\u0275text(49, "\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span", 19);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(52, "div", 23)(53, "h3", 24)(54, "span", 16);
    \u0275\u0275text(55, "flash_on");
    \u0275\u0275elementEnd();
    \u0275\u0275text(56, " \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0633\u0631\u064A\u0639\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 25)(58, "button", 26);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Template_button_click_58_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate("vouchers/receipt"));
    });
    \u0275\u0275elementStart(59, "span", 16);
    \u0275\u0275text(60, "arrow_downward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(61, " \u0633\u0646\u062F \u0642\u0628\u0636 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "button", 27);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate("vouchers/payment"));
    });
    \u0275\u0275elementStart(63, "span", 16);
    \u0275\u0275text(64, "arrow_upward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(65, " \u0633\u0646\u062F \u0635\u0631\u0641 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "button", 28);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate("vouchers/transfer"));
    });
    \u0275\u0275elementStart(67, "span", 16);
    \u0275\u0275text(68, "swap_horiz");
    \u0275\u0275elementEnd();
    \u0275\u0275text(69, " \u062A\u062D\u0648\u064A\u0644 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "button", 29);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Template_button_click_70_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate("employees"));
    });
    \u0275\u0275elementStart(71, "span", 16);
    \u0275\u0275text(72, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(73, " \u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "button", 30);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_3_Template_button_click_74_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigate("warehouse"));
    });
    \u0275\u0275elementStart(75, "span", 16);
    \u0275\u0275text(76, "warehouse");
    \u0275\u0275elementEnd();
    \u0275\u0275text(77, " \u0627\u0644\u0645\u062E\u0627\u0632\u0646 ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(78, DashboardComponent_Conditional_3_Conditional_78_Template, 13, 10, "div", 31);
    \u0275\u0275conditionalCreate(79, DashboardComponent_Conditional_3_Conditional_79_Template, 10, 6, "div", 32);
    \u0275\u0275elementStart(80, "div", 33)(81, "div", 23)(82, "h3", 24)(83, "span", 16);
    \u0275\u0275text(84, "bolt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(85, " \u0627\u0644\u0645\u062D\u0637\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "div", 34);
    \u0275\u0275repeaterCreate(87, DashboardComponent_Conditional_3_For_88_Template, 11, 7, "div", 35, _forTrack0);
    \u0275\u0275conditionalCreate(89, DashboardComponent_Conditional_3_Conditional_89_Template, 2, 0, "div", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(90, "div", 23)(91, "h3", 24)(92, "span", 16);
    \u0275\u0275text(93, "handshake");
    \u0275\u0275elementEnd();
    \u0275\u0275text(94, " \u0627\u0644\u0634\u0631\u0643\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "div", 34);
    \u0275\u0275repeaterCreate(96, DashboardComponent_Conditional_3_For_97_Template, 11, 5, "div", 35, _forTrack0);
    \u0275\u0275conditionalCreate(98, DashboardComponent_Conditional_3_Conditional_98_Template, 2, 0, "div", 36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(99, DashboardComponent_Conditional_3_Conditional_99_Template, 8, 1, "div", 23);
    \u0275\u0275conditionalCreate(100, DashboardComponent_Conditional_3_Conditional_100_Template, 8, 1, "div", 37);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.loadError() ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r2.stations().length);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.employees().length);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.accounts().length);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.funds().length);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.totalSalaries());
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.suppliers().length);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.warehouses().length);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("", ctx_r2.formatNumber(ctx_r2.totalReceipts()), " ");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("", ctx_r2.formatNumber(ctx_r2.totalPayments()), " ");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("", ctx_r2.formatNumber(ctx_r2.netBalance()), " ");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r2.operationsCount());
    \u0275\u0275advance(27);
    \u0275\u0275conditional(ctx_r2.chartData().length > 0 ? 78 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.chartData().length > 1 ? 79 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r2.stations());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.stations().length === 0 ? 89 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r2.partners());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.partners().length === 0 ? 98 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.warehouses().length > 0 ? 99 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.pendingAccounts().length > 0 ? 100 : -1);
  }
}
var DashboardComponent = class _DashboardComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  stations = signal([], ...ngDevMode ? [{ debugName: "stations" }] : (
    /* istanbul ignore next */
    []
  ));
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : (
    /* istanbul ignore next */
    []
  ));
  accounts = signal([], ...ngDevMode ? [{ debugName: "accounts" }] : (
    /* istanbul ignore next */
    []
  ));
  funds = signal([], ...ngDevMode ? [{ debugName: "funds" }] : (
    /* istanbul ignore next */
    []
  ));
  suppliers = signal([], ...ngDevMode ? [{ debugName: "suppliers" }] : (
    /* istanbul ignore next */
    []
  ));
  pendingAccounts = signal([], ...ngDevMode ? [{ debugName: "pendingAccounts" }] : (
    /* istanbul ignore next */
    []
  ));
  partners = signal([], ...ngDevMode ? [{ debugName: "partners" }] : (
    /* istanbul ignore next */
    []
  ));
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  totalSalaries = signal(0, ...ngDevMode ? [{ debugName: "totalSalaries" }] : (
    /* istanbul ignore next */
    []
  ));
  loadError = signal("", ...ngDevMode ? [{ debugName: "loadError" }] : (
    /* istanbul ignore next */
    []
  ));
  // ملخص مالي
  totalReceipts = signal(0, ...ngDevMode ? [{ debugName: "totalReceipts" }] : (
    /* istanbul ignore next */
    []
  ));
  totalPayments = signal(0, ...ngDevMode ? [{ debugName: "totalPayments" }] : (
    /* istanbul ignore next */
    []
  ));
  operationsCount = signal(0, ...ngDevMode ? [{ debugName: "operationsCount" }] : (
    /* istanbul ignore next */
    []
  ));
  netBalance = signal(0, ...ngDevMode ? [{ debugName: "netBalance" }] : (
    /* istanbul ignore next */
    []
  ));
  chartData = signal([], ...ngDevMode ? [{ debugName: "chartData" }] : (
    /* istanbul ignore next */
    []
  ));
  waterfallData = signal([], ...ngDevMode ? [{ debugName: "waterfallData" }] : (
    /* istanbul ignore next */
    []
  ));
  treemapData = signal([], ...ngDevMode ? [{ debugName: "treemapData" }] : (
    /* istanbul ignore next */
    []
  ));
  gaugeValue = signal(0, ...ngDevMode ? [{ debugName: "gaugeValue" }] : (
    /* istanbul ignore next */
    []
  ));
  gaugeMax = signal(100, ...ngDevMode ? [{ debugName: "gaugeMax" }] : (
    /* istanbul ignore next */
    []
  ));
  // وضع العرض التقديمي
  presentationMode = signal(false, ...ngDevMode ? [{ debugName: "presentationMode" }] : (
    /* istanbul ignore next */
    []
  ));
  onBizIdChange(_bizId) {
    this.loadData();
  }
  async loadData() {
    this.loading.set(true);
    this.loadError.set("");
    try {
      const results = await Promise.allSettled([
        this.api.getStations(this.bizId),
        this.api.getEmployees(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
        this.api.getSuppliers(this.bizId),
        this.api.getPendingAccounts(this.bizId),
        this.api.getBusiness(this.bizId),
        this.api.getWarehouses(this.bizId)
      ]);
      const getValue = (result, fallback = []) => {
        return result.status === "fulfilled" ? result.value : fallback;
      };
      this.stations.set(getValue(results[0], []));
      this.employees.set(getValue(results[1], []));
      this.accounts.set(getValue(results[2], []));
      this.funds.set(getValue(results[3], []));
      this.suppliers.set(getValue(results[4], []));
      this.pendingAccounts.set(getValue(results[5], []));
      this.warehouses.set(getValue(results[7], []));
      const bizData = getValue(results[6], {});
      if (bizData?.partners)
        this.partners.set(bizData.partners);
      const emps = getValue(results[1], []);
      this.totalSalaries.set(emps.reduce((sum, e) => sum + Number(e.salary || 0), 0));
      this.buildChartData();
      this.buildWaterfallData();
      this.buildTreemapData();
      this.buildGaugeData();
      try {
        const stats = await this.api.getWidgetStatsEnhanced(this.bizId);
        this.totalReceipts.set(stats.totalReceipts || 0);
        this.totalPayments.set(stats.totalPayments || 0);
        this.operationsCount.set(stats.operationsCount || 0);
        this.netBalance.set(stats.netBalance || 0);
      } catch (e) {
      }
      const failedCount = results.filter((r) => r.status === "rejected").length;
      if (failedCount > 0 && failedCount < results.length) {
        this.loadError.set(`\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062C\u0632\u0626\u064A\u0627\u064B (${failedCount} \u0637\u0644\u0628 \u0641\u0634\u0644)`);
      } else if (failedCount === results.length) {
        this.loadError.set("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u062E\u0627\u062F\u0645");
      }
    } catch (e) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645:", e);
      this.loadError.set(e?.message || "\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    } finally {
      this.loading.set(false);
    }
  }
  navigate(path) {
    this.router.navigate([`/biz/${this.bizId}/${path}`]);
  }
  formatNumber(n) {
    return new Intl.NumberFormat("ar-YE").format(n);
  }
  getAccountTypeLabel(type) {
    const map = {
      e_wallet: "\u0645\u062D\u0641\u0638\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629",
      bank: "\u0628\u0646\u0643",
      exchange: "\u0635\u0631\u0627\u0641",
      custody: "\u0639\u0647\u062F\u0629",
      warehouse: "\u0645\u062E\u0632\u0646",
      fund: "\u0635\u0646\u062F\u0648\u0642",
      billing: "\u0641\u0648\u062A\u0631\u0629",
      accounting: "\u0623\u062E\u0631\u0649",
      budget: "\u0645\u064A\u0632\u0627\u0646\u064A\u0629",
      supplier: "\u0645\u0648\u0631\u062F",
      employee: "\u0645\u0648\u0638\u0641",
      partner: "\u0634\u0631\u064A\u0643",
      settlement: "\u062A\u0633\u0648\u064A\u0629",
      pending: "\u0645\u0639\u0644\u0651\u0642"
    };
    return map[type] || type;
  }
  getFundTypeLabel(type) {
    const map = {
      collection: "\u062A\u062D\u0635\u064A\u0644",
      salary_advance: "\u0633\u0644\u0641",
      custody: "\u0639\u0647\u062F\u0629",
      safe: "\u062E\u0632\u0646\u0629",
      expense: "\u062E\u0631\u062C",
      deposit: "\u062A\u0648\u0631\u064A\u062F\u0627\u062A"
    };
    return map[type] || type;
  }
  getWarehouseTypeLabel(type) {
    const map = {
      main: "\u0631\u0626\u064A\u0633\u064A",
      station: "\u0645\u062D\u0637\u0629",
      sub: "\u0641\u0631\u0639\u064A"
    };
    return map[type] || type;
  }
  retry() {
    this.loadData();
  }
  /** معالجة النقر على عنصر في الرسم البياني */
  onChartClick(event) {
    const labelToRoute = {
      "\u0645\u062D\u0637\u0627\u062A": "stations",
      "\u0645\u0648\u0638\u0641\u0648\u0646": "employees",
      "\u062D\u0633\u0627\u0628\u0627\u062A": "accounts",
      "\u0635\u0646\u0627\u062F\u064A\u0642": "funds",
      "\u0645\u0648\u0631\u062F\u0648\u0646": "suppliers",
      "\u0645\u062E\u0627\u0632\u0646": "warehouse"
    };
    const route = labelToRoute[event.item.label];
    if (route)
      this.navigate(route);
  }
  /** تبديل وضع العرض التقديمي */
  togglePresentation() {
    this.presentationMode.update((v) => !v);
  }
  buildChartData() {
    const items = [];
    const stCount = this.stations().length;
    const empCount = this.employees().length;
    const accCount = this.accounts().length;
    const fundCount = this.funds().length;
    const supCount = this.suppliers().length;
    const whCount = this.warehouses().length;
    if (stCount > 0)
      items.push({ label: "\u0645\u062D\u0637\u0627\u062A", value: stCount, color: "#6366f1" });
    if (empCount > 0)
      items.push({ label: "\u0645\u0648\u0638\u0641\u0648\u0646", value: empCount, color: "#06b6d4" });
    if (accCount > 0)
      items.push({ label: "\u062D\u0633\u0627\u0628\u0627\u062A", value: accCount, color: "#10b981" });
    if (fundCount > 0)
      items.push({ label: "\u0635\u0646\u0627\u062F\u064A\u0642", value: fundCount, color: "#f59e0b" });
    if (supCount > 0)
      items.push({ label: "\u0645\u0648\u0631\u062F\u0648\u0646", value: supCount, color: "#ef4444" });
    if (whCount > 0)
      items.push({ label: "\u0645\u062E\u0627\u0632\u0646", value: whCount, color: "#8b5cf6" });
    this.chartData.set(items);
  }
  /** بناء بيانات Waterfall - تدفق الأصول */
  buildWaterfallData() {
    const items = [];
    const stCount = this.stations().length;
    const empCount = this.employees().length;
    const fundCount = this.funds().length;
    const supCount = this.suppliers().length;
    if (stCount > 0)
      items.push({ label: "\u0645\u062D\u0637\u0627\u062A", value: stCount, color: "#10b981" });
    if (empCount > 0)
      items.push({ label: "\u0645\u0648\u0638\u0641\u0648\u0646", value: -empCount, color: "#ef4444" });
    if (fundCount > 0)
      items.push({ label: "\u0635\u0646\u0627\u062F\u064A\u0642", value: fundCount, color: "#10b981" });
    if (supCount > 0)
      items.push({ label: "\u0645\u0648\u0631\u062F\u0648\u0646", value: -supCount, color: "#ef4444" });
    this.waterfallData.set(items);
  }
  /** بناء بيانات Treemap - توزيع الأصول */
  buildTreemapData() {
    const items = [];
    const stCount = this.stations().length;
    const empCount = this.employees().length;
    const accCount = this.accounts().length;
    const fundCount = this.funds().length;
    const supCount = this.suppliers().length;
    const whCount = this.warehouses().length;
    if (stCount > 0)
      items.push({ label: "\u0645\u062D\u0637\u0627\u062A", value: stCount * 3, color: "#6366f1" });
    if (empCount > 0)
      items.push({ label: "\u0645\u0648\u0638\u0641\u0648\u0646", value: empCount * 2, color: "#06b6d4" });
    if (accCount > 0)
      items.push({ label: "\u062D\u0633\u0627\u0628\u0627\u062A", value: accCount * 2, color: "#10b981" });
    if (fundCount > 0)
      items.push({ label: "\u0635\u0646\u0627\u062F\u064A\u0642", value: fundCount * 4, color: "#f59e0b" });
    if (supCount > 0)
      items.push({ label: "\u0645\u0648\u0631\u062F\u0648\u0646", value: supCount * 2, color: "#ef4444" });
    if (whCount > 0)
      items.push({ label: "\u0645\u062E\u0627\u0632\u0646", value: whCount * 3, color: "#8b5cf6" });
    this.treemapData.set(items);
  }
  /** بناء بيانات Gauge - نسبة الاكتمال */
  buildGaugeData() {
    const totalAssets = this.stations().length + this.employees().length + this.accounts().length + this.funds().length + this.suppliers().length + this.warehouses().length;
    this.gaugeValue.set(totalAssets);
    this.gaugeMax.set(Math.max(totalAssets * 1.5, 20));
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275DashboardComponent_BaseFactory;
    return function DashboardComponent_Factory(__ngFactoryType__) {
      return (\u0275DashboardComponent_BaseFactory || (\u0275DashboardComponent_BaseFactory = \u0275\u0275getInheritedFactory(_DashboardComponent)))(__ngFactoryType__ || _DashboardComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 4, vars: 3, consts: [[1, "dashboard-page"], ["variant", "dashboard"], [1, "loading-container"], [1, "spinner"], [1, "error-banner"], [1, "stats-row-3d"], ["label", "\u0645\u062D\u0637\u0629", "icon", "bolt", "color", "#f59e0b", 3, "click", "value"], ["label", "\u0645\u0648\u0638\u0641", "icon", "groups", "color", "#3b82f6", 3, "click", "value"], ["label", "\u062D\u0633\u0627\u0628 \u0648\u0645\u062D\u0641\u0638\u0629", "icon", "account_balance_wallet", "color", "#8b5cf6", 3, "click", "value"], ["label", "\u0635\u0646\u062F\u0648\u0642", "icon", "inventory_2", "color", "#06b6d4", 3, "click", "value"], ["label", "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u0648\u0627\u062A\u0628 (\u0631.\u064A)", "icon", "payments", "color", "#ef4444", 3, "value"], ["label", "\u0645\u0648\u0631\u062F", "icon", "local_shipping", "color", "#22c55e", 3, "click", "value"], ["label", "\u0645\u062E\u0632\u0646", "icon", "warehouse", "color", "#f59e0b", 3, "click", "value"], [1, "financial-summary"], [1, "fin-card", "fin-receipts"], [1, "fin-icon"], [1, "material-icons-round"], [1, "fin-info"], [1, "fin-label"], [1, "fin-value"], [1, "fin-card", "fin-payments"], [1, "fin-card", "fin-net"], [1, "fin-card", "fin-ops"], [1, "section-card"], [1, "section-title"], [1, "quick-actions"], [1, "action-btn", "action-green", 3, "click"], [1, "action-btn", "action-red", 3, "click"], [1, "action-btn", "action-purple", 3, "click"], [1, "action-btn", "action-blue", 3, "click"], [1, "action-btn", "action-amber", 3, "click"], [1, "section-card", "charts-section"], [1, "section-card", "charts-section", "advanced-charts"], [1, "two-cols"], [1, "items-list"], [1, "list-item"], [1, "empty-state"], [1, "section-card", "pending-section"], [1, "retry-btn", 3, "click"], ["title", "\u0648\u0636\u0639 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u062F\u064A\u0645\u064A", 1, "presentation-toggle", 3, "click"], [1, "charts-grid"], [1, "chart-wrapper"], ["type", "bar", "title", "\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0623\u0635\u0648\u0644", 3, "chartClick", "data", "maxBarHeight", "autoRotate", "rotateSpeed", "interactive"], ["type", "donut", "title", "\u0627\u0644\u0646\u0633\u0628 \u0627\u0644\u0645\u0626\u0648\u064A\u0629", 3, "chartClick", "data", "autoRotate", "rotateSpeed", "interactive"], [1, "charts-grid", "charts-grid-3"], ["type", "gauge", "gaugeLabel", "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0635\u0648\u0644", "title", "\u0645\u0624\u0634\u0631 \u0627\u0644\u0623\u062F\u0627\u0621", 3, "gaugeValue", "gaugeMax", "autoRotate", "rotateSpeed"], ["type", "waterfall", "title", "\u062A\u062F\u0641\u0642 \u0627\u0644\u0645\u0648\u0627\u0631\u062F", 3, "data", "maxBarHeight", "autoRotate", "rotateSpeed", "interactive"], ["type", "treemap", "title", "\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0623\u0635\u0648\u0644", 3, "chartClick", "data", "maxBarHeight", "autoRotate", "rotateSpeed", "interactive"], [1, "list-item", 3, "click"], [1, "item-icon"], [1, "item-info"], [1, "item-name"], [1, "item-detail"], [1, "badge", "badge-active"], [1, "badge", "badge-inactive"], [1, "item-icon", "partner-icon"], [1, "share-badge"], [1, "item-icon", 2, "background", "#f59e0b18", "color", "#f59e0b"], [1, "section-title", "pending-title"], [1, "list-item", "pending-item"], [1, "item-icon", "pending-icon"], [1, "badge", "badge-pending"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-three-background", 1);
      \u0275\u0275conditionalCreate(2, DashboardComponent_Conditional_2_Template, 4, 0, "div", 2)(3, DashboardComponent_Conditional_3_Template, 101, 18);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("presentation-mode", ctx.presentationMode());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 2 : 3);
    }
  }, dependencies: [CommonModule, ThreeBackgroundComponent, ThreeChartComponent, ThreeStatCardComponent], styles: ['\n\n.dashboard-page[_ngcontent-%COMP%] {\n  padding: 0;\n  position: relative;\n  z-index: 0;\n}\n.dashboard-page[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(app-three-background) {\n  position: relative;\n  z-index: 1;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 400px;\n  gap: 16px;\n  color: var(--text-secondary);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border: 4px solid var(--border-color);\n  border-top-color: #f59e0b;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.error-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 20px;\n  background: rgba(239, 68, 68, 0.08);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  border-radius: 12px;\n  margin-bottom: 20px;\n  color: #ef4444;\n  font-size: 14px;\n  font-weight: 600;\n}\n.error-banner[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.error-banner[_ngcontent-%COMP%]   .retry-btn[_ngcontent-%COMP%] {\n  margin-right: auto;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 14px;\n  border-radius: 8px;\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: inherit;\n  transition: all 0.2s;\n}\n.error-banner[_ngcontent-%COMP%]   .retry-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.error-banner[_ngcontent-%COMP%]   .retry-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.2);\n}\n.stats-row-3d[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.stats-row-3d[_ngcontent-%COMP%]   app-three-stat-card[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: transform 0.3s ease;\n}\n.stats-row-3d[_ngcontent-%COMP%]   app-three-stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.financial-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n  margin-bottom: 24px;\n}\n@media (max-width: 1100px) {\n  .financial-summary[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 600px) {\n  .financial-summary[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.fin-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 20px;\n  border-radius: 14px;\n  background: var(--card-bg);\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n  transition: all 0.25s;\n}\n.fin-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n}\n.fin-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.fin-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.fin-receipts[_ngcontent-%COMP%]   .fin-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #16a34a);\n}\n.fin-payments[_ngcontent-%COMP%]   .fin-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #dc2626);\n}\n.fin-net[_ngcontent-%COMP%]   .fin-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #2563eb);\n}\n.fin-ops[_ngcontent-%COMP%]   .fin-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #7c3aed);\n}\n.fin-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.fin-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  letter-spacing: 0.3px;\n}\n.fin-value[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary);\n}\n.fin-value[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.section-card[_ngcontent-%COMP%] {\n  background: var(--card-bg);\n  border: 1px solid var(--border-color);\n  border-radius: 16px;\n  padding: 24px;\n  margin-bottom: 24px;\n  box-shadow: var(--shadow-card);\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 20px;\n}\n.section-title[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: var(--text-secondary);\n}\n.quick-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 20px;\n  border-radius: 12px;\n  border: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 700;\n  font-family: inherit;\n  color: white;\n  transition: all 0.25s;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  filter: brightness(1.1);\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.action-green[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.action-red[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.action-purple[_ngcontent-%COMP%] {\n  background: #8b5cf6;\n}\n.action-blue[_ngcontent-%COMP%] {\n  background: #3b82f6;\n}\n.action-amber[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.two-cols[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n@media (max-width: 900px) {\n  .two-cols[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.items-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.list-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.list-item[_ngcontent-%COMP%]:hover {\n  background: var(--bg-hover);\n  border-color: var(--border-strong);\n}\n.item-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.item-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.partner-icon[_ngcontent-%COMP%] {\n  background: rgba(236, 72, 153, 0.15);\n  color: #ec4899;\n}\n.item-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.item-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.item-detail[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n  font-weight: 600;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 700;\n}\n.badge-active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.badge-inactive[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.badge-pending[_ngcontent-%COMP%] {\n  background: rgba(249, 115, 22, 0.15);\n  color: #f97316;\n}\n.share-badge[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 800;\n}\n.pending-section[_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.25);\n}\n.pending-title[_ngcontent-%COMP%] {\n  color: #ef4444 !important;\n}\n.pending-title[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #ef4444 !important;\n}\n.pending-icon[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15) !important;\n  color: #ef4444 !important;\n}\n.charts-section[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  border: 1px solid rgba(99, 102, 241, 0.15);\n  background:\n    linear-gradient(\n      135deg,\n      var(--card-bg) 0%,\n      rgba(99, 102, 241, 0.03) 100%);\n}\n.charts-section[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      90deg,\n      #6366f1,\n      #06b6d4,\n      #8b5cf6,\n      #6366f1);\n  background-size: 300% 100%;\n  animation: _ngcontent-%COMP%_shimmer-gradient 4s ease-in-out infinite;\n}\n.advanced-charts[_ngcontent-%COMP%] {\n  border-color: rgba(16, 185, 129, 0.15);\n  background:\n    linear-gradient(\n      135deg,\n      var(--card-bg) 0%,\n      rgba(16, 185, 129, 0.03) 100%);\n}\n.advanced-charts[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #10b981,\n      #06b6d4,\n      #f59e0b,\n      #10b981);\n  background-size: 300% 100%;\n}\n@keyframes _ngcontent-%COMP%_shimmer-gradient {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n.charts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n@media (max-width: 900px) {\n  .charts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.charts-grid-3[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, 1fr);\n}\n@media (max-width: 1200px) {\n  .charts-grid-3[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .charts-grid-3[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.chart-wrapper[_ngcontent-%COMP%] {\n  height: 320px;\n  border-radius: 14px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n}\n.chart-wrapper[_ngcontent-%COMP%]:hover {\n  border-color: rgba(99, 102, 241, 0.3);\n  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);\n  transform: translateY(-2px);\n}\n.chart-wrapper[_ngcontent-%COMP%]   app-three-chart[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.presentation-toggle[_ngcontent-%COMP%] {\n  margin-right: auto;\n  margin-left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  color: var(--text-secondary);\n  transition: all 0.2s;\n}\n.presentation-toggle[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.presentation-toggle[_ngcontent-%COMP%]:hover {\n  color: #6366f1;\n  border-color: rgba(99, 102, 241, 0.3);\n  background: rgba(99, 102, 241, 0.08);\n}\n.presentation-mode[_ngcontent-%COMP%]   .charts-grid[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.presentation-mode[_ngcontent-%COMP%]   .charts-grid-3[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.presentation-mode[_ngcontent-%COMP%]   .chart-wrapper[_ngcontent-%COMP%] {\n  height: 500px;\n}\n/*# sourceMappingURL=dashboard.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [CommonModule, ThreeBackgroundComponent, ThreeChartComponent, ThreeStatCardComponent], template: `<div class="dashboard-page" [class.presentation-mode]="presentationMode()">\r
  <!-- Three.js 3D Background -->\r
  <app-three-background variant="dashboard"></app-three-background>\r
  @if (loading()) {\r
    <div class="loading-container">\r
      <div class="spinner"></div>\r
      <p>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>\r
    </div>\r
  } @else {\r
    <!-- Error Banner -->\r
    @if (loadError()) {\r
      <div class="error-banner">\r
        <span class="material-icons-round">warning</span>\r
        <span>{{ loadError() }}</span>\r
        <button class="retry-btn" (click)="retry()">\r
          <span class="material-icons-round">refresh</span> \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629\r
        </button>\r
      </div>\r
    }\r
\r
    <!-- 3D Stats Row -->\r
    <div class="stats-row-3d">\r
      <app-three-stat-card\r
        [value]="stations().length"\r
        label="\u0645\u062D\u0637\u0629"\r
        icon="bolt"\r
        color="#f59e0b"\r
        (click)="navigate('stations')">\r
      </app-three-stat-card>\r
      <app-three-stat-card\r
        [value]="employees().length"\r
        label="\u0645\u0648\u0638\u0641"\r
        icon="groups"\r
        color="#3b82f6"\r
        (click)="navigate('employees')">\r
      </app-three-stat-card>\r
      <app-three-stat-card\r
        [value]="accounts().length"\r
        label="\u062D\u0633\u0627\u0628 \u0648\u0645\u062D\u0641\u0638\u0629"\r
        icon="account_balance_wallet"\r
        color="#8b5cf6"\r
        (click)="navigate('accounts')">\r
      </app-three-stat-card>\r
      <app-three-stat-card\r
        [value]="funds().length"\r
        label="\u0635\u0646\u062F\u0648\u0642"\r
        icon="inventory_2"\r
        color="#06b6d4"\r
        (click)="navigate('funds')">\r
      </app-three-stat-card>\r
      <app-three-stat-card\r
        [value]="totalSalaries()"\r
        label="\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u0648\u0627\u062A\u0628 (\u0631.\u064A)"\r
        icon="payments"\r
        color="#ef4444">\r
      </app-three-stat-card>\r
      <app-three-stat-card\r
        [value]="suppliers().length"\r
        label="\u0645\u0648\u0631\u062F"\r
        icon="local_shipping"\r
        color="#22c55e"\r
        (click)="navigate('suppliers')">\r
      </app-three-stat-card>\r
      <app-three-stat-card\r
        [value]="warehouses().length"\r
        label="\u0645\u062E\u0632\u0646"\r
        icon="warehouse"\r
        color="#f59e0b"\r
        (click)="navigate('warehouse')">\r
      </app-three-stat-card>\r
    </div>\r
\r
    <!-- \u0645\u0644\u062E\u0635 \u0645\u0627\u0644\u064A -->\r
    <div class="financial-summary">\r
      <div class="fin-card fin-receipts">\r
        <div class="fin-icon"><span class="material-icons-round">arrow_downward</span></div>\r
        <div class="fin-info">\r
          <span class="fin-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0642\u0628\u0636</span>\r
          <span class="fin-value">{{ formatNumber(totalReceipts()) }} <small>\u0631.\u064A</small></span>\r
        </div>\r
      </div>\r
      <div class="fin-card fin-payments">\r
        <div class="fin-icon"><span class="material-icons-round">arrow_upward</span></div>\r
        <div class="fin-info">\r
          <span class="fin-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0631\u0641</span>\r
          <span class="fin-value">{{ formatNumber(totalPayments()) }} <small>\u0631.\u064A</small></span>\r
        </div>\r
      </div>\r
      <div class="fin-card fin-net">\r
        <div class="fin-icon"><span class="material-icons-round">account_balance</span></div>\r
        <div class="fin-info">\r
          <span class="fin-label">\u0635\u0627\u0641\u064A \u0627\u0644\u0623\u0631\u0635\u062F\u0629</span>\r
          <span class="fin-value">{{ formatNumber(netBalance()) }} <small>\u0631.\u064A</small></span>\r
        </div>\r
      </div>\r
      <div class="fin-card fin-ops">\r
        <div class="fin-icon"><span class="material-icons-round">receipt_long</span></div>\r
        <div class="fin-info">\r
          <span class="fin-label">\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</span>\r
          <span class="fin-value">{{ operationsCount() }}</span>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Quick Actions -->\r
    <div class="section-card">\r
      <h3 class="section-title"><span class="material-icons-round">flash_on</span> \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0633\u0631\u064A\u0639\u0629</h3>\r
      <div class="quick-actions">\r
        <button class="action-btn action-green" (click)="navigate('vouchers/receipt')">\r
          <span class="material-icons-round">arrow_downward</span> \u0633\u0646\u062F \u0642\u0628\u0636\r
        </button>\r
        <button class="action-btn action-red" (click)="navigate('vouchers/payment')">\r
          <span class="material-icons-round">arrow_upward</span> \u0633\u0646\u062F \u0635\u0631\u0641\r
        </button>\r
        <button class="action-btn action-purple" (click)="navigate('vouchers/transfer')">\r
          <span class="material-icons-round">swap_horiz</span> \u062A\u062D\u0648\u064A\u0644\r
        </button>\r
        <button class="action-btn action-blue" (click)="navigate('employees')">\r
          <span class="material-icons-round">person_add</span> \u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641\r
        </button>\r
        <button class="action-btn action-amber" (click)="navigate('warehouse')">\r
          <span class="material-icons-round">warehouse</span> \u0627\u0644\u0645\u062E\u0627\u0632\u0646\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- 3D Charts Section - Main -->\r
    @if (chartData().length > 0) {\r
      <div class="section-card charts-section">\r
        <h3 class="section-title">\r
          <span class="material-icons-round">bar_chart</span>\r
          \u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062F\r
          <button class="presentation-toggle" (click)="togglePresentation()" title="\u0648\u0636\u0639 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u062F\u064A\u0645\u064A">\r
            <span class="material-icons-round">{{ presentationMode() ? 'grid_view' : 'slideshow' }}</span>\r
          </button>\r
        </h3>\r
        <div class="charts-grid">\r
          <div class="chart-wrapper">\r
            <app-three-chart\r
              type="bar"\r
              [data]="chartData()"\r
              title="\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0623\u0635\u0648\u0644"\r
              [maxBarHeight]="4"\r
              [autoRotate]="true"\r
              [rotateSpeed]="0.08"\r
              [interactive]="true"\r
              (chartClick)="onChartClick($event)"\r
            ></app-three-chart>\r
          </div>\r
          <div class="chart-wrapper">\r
            <app-three-chart\r
              type="donut"\r
              [data]="chartData()"\r
              title="\u0627\u0644\u0646\u0633\u0628 \u0627\u0644\u0645\u0626\u0648\u064A\u0629"\r
              [autoRotate]="true"\r
              [rotateSpeed]="0.12"\r
              [interactive]="true"\r
              (chartClick)="onChartClick($event)"\r
            ></app-three-chart>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- Advanced Charts Section -->\r
    @if (chartData().length > 1) {\r
      <div class="section-card charts-section advanced-charts">\r
        <h3 class="section-title">\r
          <span class="material-icons-round">insights</span>\r
          \u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0645\u062A\u0642\u062F\u0645\u0629\r
        </h3>\r
        <div class="charts-grid charts-grid-3">\r
          <!-- Waterfall Chart -->\r
          @if (waterfallData().length > 0) {\r
            <div class="chart-wrapper">\r
              <app-three-chart\r
                type="waterfall"\r
                [data]="waterfallData()"\r
                title="\u062A\u062F\u0641\u0642 \u0627\u0644\u0645\u0648\u0627\u0631\u062F"\r
                [maxBarHeight]="3"\r
                [autoRotate]="true"\r
                [rotateSpeed]="0.06"\r
                [interactive]="true"\r
              ></app-three-chart>\r
            </div>\r
          }\r
\r
          <!-- Gauge Chart -->\r
          <div class="chart-wrapper">\r
            <app-three-chart\r
              type="gauge"\r
              [gaugeValue]="gaugeValue()"\r
              [gaugeMax]="gaugeMax()"\r
              gaugeLabel="\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0635\u0648\u0644"\r
              title="\u0645\u0624\u0634\u0631 \u0627\u0644\u0623\u062F\u0627\u0621"\r
              [autoRotate]="true"\r
              [rotateSpeed]="0.05"\r
            ></app-three-chart>\r
          </div>\r
\r
          <!-- Treemap Chart -->\r
          @if (treemapData().length > 0) {\r
            <div class="chart-wrapper">\r
              <app-three-chart\r
                type="treemap"\r
                [data]="treemapData()"\r
                title="\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0623\u0635\u0648\u0644"\r
                [maxBarHeight]="3"\r
                [autoRotate]="true"\r
                [rotateSpeed]="0.06"\r
                [interactive]="true"\r
                (chartClick)="onChartClick($event)"\r
              ></app-three-chart>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- Two Column Layout -->\r
    <div class="two-cols">\r
      <!-- Stations -->\r
      <div class="section-card">\r
        <h3 class="section-title"><span class="material-icons-round">bolt</span> \u0627\u0644\u0645\u062D\u0637\u0627\u062A</h3>\r
        <div class="items-list">\r
          @for (s of stations(); track s.id) {\r
            <div class="list-item" (click)="navigate('stations')">\r
              <div class="item-icon" [style.background]="biz.currentBusinessColor() + '18'" [style.color]="biz.currentBusinessColor()">\r
                <span class="material-icons-round">location_on</span>\r
              </div>\r
              <div class="item-info">\r
                <span class="item-name">{{ s.name }}</span>\r
                <span class="item-detail">{{ s.location || '' }}</span>\r
              </div>\r
              @if (s.isActive) {\r
                <span class="badge badge-active">\u0646\u0634\u0637\u0629</span>\r
              } @else {\r
                <span class="badge badge-inactive">\u063A\u064A\u0631 \u0646\u0634\u0637\u0629</span>\r
              }\r
            </div>\r
          }\r
          @if (stations().length === 0) {\r
            <div class="empty-state">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062D\u0637\u0627\u062A</div>\r
          }\r
        </div>\r
      </div>\r
\r
      <!-- Partners -->\r
      <div class="section-card">\r
        <h3 class="section-title"><span class="material-icons-round">handshake</span> \u0627\u0644\u0634\u0631\u0643\u0627\u0621</h3>\r
        <div class="items-list">\r
          @for (p of partners(); track p.id) {\r
            <div class="list-item">\r
              <div class="item-icon partner-icon">\r
                <span class="material-icons-round">person</span>\r
              </div>\r
              <div class="item-info">\r
                <span class="item-name">{{ p.fullName }}</span>\r
                <span class="item-detail">{{ p.role || '\u0634\u0631\u064A\u0643' }}</span>\r
              </div>\r
              <div class="share-badge" [style.color]="biz.currentBusinessColor()">\r
                {{ p.sharePercentage }}%\r
              </div>\r
            </div>\r
          }\r
          @if (partners().length === 0) {\r
            <div class="empty-state">\u0644\u0627 \u064A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u0621</div>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Warehouses Section -->\r
    @if (warehouses().length > 0) {\r
      <div class="section-card">\r
        <h3 class="section-title"><span class="material-icons-round">warehouse</span> \u0627\u0644\u0645\u062E\u0627\u0632\u0646 ({{ warehouses().length }})</h3>\r
        <div class="items-list">\r
          @for (w of warehouses(); track w.id) {\r
            <div class="list-item" (click)="navigate('warehouse')">\r
              <div class="item-icon" style="background: #f59e0b18; color: #f59e0b;">\r
                <span class="material-icons-round">{{ w.warehouseType === 'main' ? 'store' : 'local_gas_station' }}</span>\r
              </div>\r
              <div class="item-info">\r
                <span class="item-name">{{ w.name }}</span>\r
                <span class="item-detail">{{ getWarehouseTypeLabel(w.warehouseType) }}{{ w.code ? ' \u2014 ' + w.code : '' }}</span>\r
              </div>\r
              @if (w.isActive) {\r
                <span class="badge badge-active">\u0646\u0634\u0637</span>\r
              } @else {\r
                <span class="badge badge-inactive">\u063A\u064A\u0631 \u0646\u0634\u0637</span>\r
              }\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- Pending Accounts -->\r
    @if (pendingAccounts().length > 0) {\r
      <div class="section-card pending-section">\r
        <h3 class="section-title pending-title">\r
          <span class="material-icons-round">warning</span>\r
          \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629 ({{ pendingAccounts().length }})\r
        </h3>\r
        <div class="items-list">\r
          @for (p of pendingAccounts(); track p.id) {\r
            <div class="list-item pending-item">\r
              <div class="item-icon pending-icon">\r
                <span class="material-icons-round">error_outline</span>\r
              </div>\r
              <div class="item-info">\r
                <span class="item-name">{{ p.personOrEntity }}</span>\r
                <span class="item-detail">{{ p.description }}</span>\r
              </div>\r
              <span class="badge badge-pending">{{ p.status === 'pending' ? '\u0645\u0639\u0644\u0642' : p.status }}</span>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    }\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/dashboard/dashboard.scss */\n.dashboard-page {\n  padding: 0;\n  position: relative;\n  z-index: 0;\n}\n.dashboard-page > *:not(app-three-background) {\n  position: relative;\n  z-index: 1;\n}\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 400px;\n  gap: 16px;\n  color: var(--text-secondary);\n}\n.spinner {\n  width: 48px;\n  height: 48px;\n  border: 4px solid var(--border-color);\n  border-top-color: #f59e0b;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.error-banner {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 20px;\n  background: rgba(239, 68, 68, 0.08);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  border-radius: 12px;\n  margin-bottom: 20px;\n  color: #ef4444;\n  font-size: 14px;\n  font-weight: 600;\n}\n.error-banner .material-icons-round {\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.error-banner .retry-btn {\n  margin-right: auto;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 14px;\n  border-radius: 8px;\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: inherit;\n  transition: all 0.2s;\n}\n.error-banner .retry-btn .material-icons-round {\n  font-size: 16px;\n}\n.error-banner .retry-btn:hover {\n  background: rgba(239, 68, 68, 0.2);\n}\n.stats-row-3d {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.stats-row-3d app-three-stat-card {\n  cursor: pointer;\n  transition: transform 0.3s ease;\n}\n.stats-row-3d app-three-stat-card:hover {\n  transform: translateY(-2px);\n}\n.financial-summary {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n  margin-bottom: 24px;\n}\n@media (max-width: 1100px) {\n  .financial-summary {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 600px) {\n  .financial-summary {\n    grid-template-columns: 1fr;\n  }\n}\n.fin-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 20px;\n  border-radius: 14px;\n  background: var(--card-bg);\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n  transition: all 0.25s;\n}\n.fin-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n}\n.fin-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.fin-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.fin-receipts .fin-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #16a34a);\n}\n.fin-payments .fin-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #dc2626);\n}\n.fin-net .fin-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #2563eb);\n}\n.fin-ops .fin-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #7c3aed);\n}\n.fin-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.fin-label {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  letter-spacing: 0.3px;\n}\n.fin-value {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary);\n}\n.fin-value small {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.section-card {\n  background: var(--card-bg);\n  border: 1px solid var(--border-color);\n  border-radius: 16px;\n  padding: 24px;\n  margin-bottom: 24px;\n  box-shadow: var(--shadow-card);\n}\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 20px;\n}\n.section-title .material-icons-round {\n  font-size: 22px;\n  color: var(--text-secondary);\n}\n.quick-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.action-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 20px;\n  border-radius: 12px;\n  border: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 700;\n  font-family: inherit;\n  color: white;\n  transition: all 0.25s;\n}\n.action-btn:hover {\n  transform: translateY(-2px);\n  filter: brightness(1.1);\n}\n.action-btn .material-icons-round {\n  font-size: 18px;\n}\n.action-green {\n  background: #22c55e;\n}\n.action-red {\n  background: #ef4444;\n}\n.action-purple {\n  background: #8b5cf6;\n}\n.action-blue {\n  background: #3b82f6;\n}\n.action-amber {\n  background: #f59e0b;\n}\n.two-cols {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n@media (max-width: 900px) {\n  .two-cols {\n    grid-template-columns: 1fr;\n  }\n}\n.items-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.list-item {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.list-item:hover {\n  background: var(--bg-hover);\n  border-color: var(--border-strong);\n}\n.item-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.item-icon .material-icons-round {\n  font-size: 20px;\n}\n.partner-icon {\n  background: rgba(236, 72, 153, 0.15);\n  color: #ec4899;\n}\n.item-info {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.item-name {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.item-detail {\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n  font-weight: 600;\n}\n.badge {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 700;\n}\n.badge-active {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.badge-inactive {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.badge-pending {\n  background: rgba(249, 115, 22, 0.15);\n  color: #f97316;\n}\n.share-badge {\n  font-size: 20px;\n  font-weight: 800;\n}\n.pending-section {\n  border-color: rgba(239, 68, 68, 0.25);\n}\n.pending-title {\n  color: #ef4444 !important;\n}\n.pending-title .material-icons-round {\n  color: #ef4444 !important;\n}\n.pending-icon {\n  background: rgba(239, 68, 68, 0.15) !important;\n  color: #ef4444 !important;\n}\n.charts-section {\n  position: relative;\n  overflow: hidden;\n  border: 1px solid rgba(99, 102, 241, 0.15);\n  background:\n    linear-gradient(\n      135deg,\n      var(--card-bg) 0%,\n      rgba(99, 102, 241, 0.03) 100%);\n}\n.charts-section::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      90deg,\n      #6366f1,\n      #06b6d4,\n      #8b5cf6,\n      #6366f1);\n  background-size: 300% 100%;\n  animation: shimmer-gradient 4s ease-in-out infinite;\n}\n.advanced-charts {\n  border-color: rgba(16, 185, 129, 0.15);\n  background:\n    linear-gradient(\n      135deg,\n      var(--card-bg) 0%,\n      rgba(16, 185, 129, 0.03) 100%);\n}\n.advanced-charts::before {\n  background:\n    linear-gradient(\n      90deg,\n      #10b981,\n      #06b6d4,\n      #f59e0b,\n      #10b981);\n  background-size: 300% 100%;\n}\n@keyframes shimmer-gradient {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n.charts-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n@media (max-width: 900px) {\n  .charts-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.charts-grid-3 {\n  grid-template-columns: repeat(3, 1fr);\n}\n@media (max-width: 1200px) {\n  .charts-grid-3 {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .charts-grid-3 {\n    grid-template-columns: 1fr;\n  }\n}\n.chart-wrapper {\n  height: 320px;\n  border-radius: 14px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n}\n.chart-wrapper:hover {\n  border-color: rgba(99, 102, 241, 0.3);\n  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);\n  transform: translateY(-2px);\n}\n.chart-wrapper app-three-chart {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.presentation-toggle {\n  margin-right: auto;\n  margin-left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  color: var(--text-secondary);\n  transition: all 0.2s;\n}\n.presentation-toggle .material-icons-round {\n  font-size: 18px;\n}\n.presentation-toggle:hover {\n  color: #6366f1;\n  border-color: rgba(99, 102, 241, 0.3);\n  background: rgba(99, 102, 241, 0.08);\n}\n.presentation-mode .charts-grid {\n  grid-template-columns: 1fr;\n}\n.presentation-mode .charts-grid-3 {\n  grid-template-columns: 1fr;\n}\n.presentation-mode .chart-wrapper {\n  height: 500px;\n}\n/*# sourceMappingURL=dashboard.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/pages/dashboard/dashboard.ts", lineNumber: 17 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-SQ2NM5IR.js.map
