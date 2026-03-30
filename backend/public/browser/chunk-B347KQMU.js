import {
  BaseChartDirective
} from "./chunk-QNLEUW7S.js";
import {
  formatAmountPrecise,
  formatDate
} from "./chunk-RCZO5KY5.js";
import {
  StatusBadgeComponent
} from "./chunk-7EFL7A6H.js";
import {
  LoadingStateComponent
} from "./chunk-4UIIPGWR.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-6OZ2GPXU.js";
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
  APP_ID,
  ApplicationRef,
  AuthService,
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ConnectableObservable,
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  HostListener,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  IterableDiffers,
  NgForOf,
  NgIf,
  NgModule,
  NgTemplateOutlet,
  NgZone,
  Observable,
  Output,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  __spreadProps,
  __spreadValues,
  afterNextRender,
  animationFrameScheduler,
  asapScheduler,
  auditTime,
  booleanAttribute,
  computed,
  createComponent,
  distinctUntilChanged,
  effect,
  filter,
  forwardRef,
  inject,
  interval,
  isDevMode,
  isObservable,
  isPlatformBrowser,
  map,
  merge,
  numberAttribute,
  of,
  pairwise,
  setClassMetadata,
  shareReplay,
  signal,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵarrowFunction,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreadContextLet,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstoreLet,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-VUZEB5JS.js";

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/_shadow-dom-chunk.mjs
var shadowDomIsSupported;
function _supportsShadowDom() {
  if (shadowDomIsSupported == null) {
    const head = typeof document !== "undefined" ? document.head : null;
    shadowDomIsSupported = !!(head && (head.createShadowRoot || head.attachShadow));
  }
  return shadowDomIsSupported;
}
function _getShadowRoot(element) {
  if (_supportsShadowDom()) {
    const rootNode = element.getRootNode ? element.getRootNode() : null;
    if (typeof ShadowRoot !== "undefined" && ShadowRoot && rootNode instanceof ShadowRoot) {
      return rootNode;
    }
  }
  return null;
}
function _getEventTarget(event) {
  return event.composedPath ? event.composedPath()[0] : event.target;
}

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/_style-loader-chunk.mjs
var appsWithLoaders = /* @__PURE__ */ new WeakMap();
var _CdkPrivateStyleLoader = class __CdkPrivateStyleLoader {
  _appRef;
  _injector = inject(Injector);
  _environmentInjector = inject(EnvironmentInjector);
  load(loader) {
    const appRef = this._appRef = this._appRef || this._injector.get(ApplicationRef);
    let data = appsWithLoaders.get(appRef);
    if (!data) {
      data = {
        loaders: /* @__PURE__ */ new Set(),
        refs: []
      };
      appsWithLoaders.set(appRef, data);
      appRef.onDestroy(() => {
        appsWithLoaders.get(appRef)?.refs.forEach((ref) => ref.destroy());
        appsWithLoaders.delete(appRef);
      });
    }
    if (!data.loaders.has(loader)) {
      data.loaders.add(loader);
      data.refs.push(createComponent(loader, {
        environmentInjector: this._environmentInjector
      }));
    }
  }
  static \u0275fac = function _CdkPrivateStyleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __CdkPrivateStyleLoader)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: __CdkPrivateStyleLoader,
    factory: __CdkPrivateStyleLoader.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_CdkPrivateStyleLoader, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/_fake-event-detection-chunk.mjs
function isFakeMousedownFromScreenReader(event) {
  return event.buttons === 0 || event.detail === 0;
}
function isFakeTouchstartFromScreenReader(event) {
  const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
  return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) && (touch.radiusY == null || touch.radiusY === 1);
}

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/_element-chunk.mjs
function coerceNumberProperty(value, fallbackValue = 0) {
  if (_isNumberValue(value)) {
    return Number(value);
  }
  return arguments.length === 2 ? fallbackValue : 0;
}
function _isNumberValue(value) {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
function coerceElement(elementOrRef) {
  return elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
}

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/_platform-chunk.mjs
var hasV8BreakIterator;
try {
  hasV8BreakIterator = typeof Intl !== "undefined" && Intl.v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}
var Platform = class _Platform {
  _platformId = inject(PLATFORM_ID);
  isBrowser = this._platformId ? isPlatformBrowser(this._platformId) : typeof document === "object" && !!document;
  EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
  TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
  BLINK = this.isBrowser && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== "undefined" && !this.EDGE && !this.TRIDENT;
  WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
  IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
  FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
  ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
  SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
  constructor() {
  }
  static \u0275fac = function Platform_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Platform)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _Platform,
    factory: _Platform.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Platform, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/_directionality-chunk.mjs
var DIR_DOCUMENT = new InjectionToken("cdk-dir-doc", {
  providedIn: "root",
  factory: () => inject(DOCUMENT)
});
var RTL_LOCALE_PATTERN = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function _resolveDirectionality(rawValue) {
  const value = rawValue?.toLowerCase() || "";
  if (value === "auto" && typeof navigator !== "undefined" && navigator?.language) {
    return RTL_LOCALE_PATTERN.test(navigator.language) ? "rtl" : "ltr";
  }
  return value === "rtl" ? "rtl" : "ltr";
}
var Directionality = class _Directionality {
  get value() {
    return this.valueSignal();
  }
  valueSignal = signal("ltr", ...ngDevMode ? [{
    debugName: "valueSignal"
  }] : []);
  change = new EventEmitter();
  constructor() {
    const _document = inject(DIR_DOCUMENT, {
      optional: true
    });
    if (_document) {
      const bodyDir = _document.body ? _document.body.dir : null;
      const htmlDir = _document.documentElement ? _document.documentElement.dir : null;
      this.valueSignal.set(_resolveDirectionality(bodyDir || htmlDir || "ltr"));
    }
  }
  ngOnDestroy() {
    this.change.complete();
  }
  static \u0275fac = function Directionality_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Directionality)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _Directionality,
    factory: _Directionality.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Directionality, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/_scrolling-chunk.mjs
var RtlScrollAxisType;
(function(RtlScrollAxisType2) {
  RtlScrollAxisType2[RtlScrollAxisType2["NORMAL"] = 0] = "NORMAL";
  RtlScrollAxisType2[RtlScrollAxisType2["NEGATED"] = 1] = "NEGATED";
  RtlScrollAxisType2[RtlScrollAxisType2["INVERTED"] = 2] = "INVERTED";
})(RtlScrollAxisType || (RtlScrollAxisType = {}));
var rtlScrollAxisType;
var scrollBehaviorSupported;
function supportsScrollBehavior() {
  if (scrollBehaviorSupported == null) {
    if (typeof document !== "object" || !document || typeof Element !== "function" || !Element) {
      scrollBehaviorSupported = false;
      return scrollBehaviorSupported;
    }
    if (document.documentElement?.style && "scrollBehavior" in document.documentElement.style) {
      scrollBehaviorSupported = true;
    } else {
      const scrollToFunction = Element.prototype.scrollTo;
      if (scrollToFunction) {
        scrollBehaviorSupported = !/\{\s*\[native code\]\s*\}/.test(scrollToFunction.toString());
      } else {
        scrollBehaviorSupported = false;
      }
    }
  }
  return scrollBehaviorSupported;
}
function getRtlScrollAxisType() {
  if (typeof document !== "object" || !document) {
    return RtlScrollAxisType.NORMAL;
  }
  if (rtlScrollAxisType == null) {
    const scrollContainer = document.createElement("div");
    const containerStyle = scrollContainer.style;
    scrollContainer.dir = "rtl";
    containerStyle.width = "1px";
    containerStyle.overflow = "auto";
    containerStyle.visibility = "hidden";
    containerStyle.pointerEvents = "none";
    containerStyle.position = "absolute";
    const content = document.createElement("div");
    const contentStyle = content.style;
    contentStyle.width = "2px";
    contentStyle.height = "1px";
    scrollContainer.appendChild(content);
    document.body.appendChild(scrollContainer);
    rtlScrollAxisType = RtlScrollAxisType.NORMAL;
    if (scrollContainer.scrollLeft === 0) {
      scrollContainer.scrollLeft = 1;
      rtlScrollAxisType = scrollContainer.scrollLeft === 0 ? RtlScrollAxisType.NEGATED : RtlScrollAxisType.INVERTED;
    }
    scrollContainer.remove();
  }
  return rtlScrollAxisType;
}

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/bidi.mjs
var Dir = class _Dir {
  _isInitialized = false;
  _rawDir = "";
  change = new EventEmitter();
  get dir() {
    return this.valueSignal();
  }
  set dir(value) {
    const previousValue = this.valueSignal();
    this.valueSignal.set(_resolveDirectionality(value));
    this._rawDir = value;
    if (previousValue !== this.valueSignal() && this._isInitialized) {
      this.change.emit(this.valueSignal());
    }
  }
  get value() {
    return this.dir;
  }
  valueSignal = signal("ltr", ...ngDevMode ? [{
    debugName: "valueSignal"
  }] : []);
  ngAfterContentInit() {
    this._isInitialized = true;
  }
  ngOnDestroy() {
    this.change.complete();
  }
  static \u0275fac = function Dir_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Dir)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _Dir,
    selectors: [["", "dir", ""]],
    hostVars: 1,
    hostBindings: function Dir_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("dir", ctx._rawDir);
      }
    },
    inputs: {
      dir: "dir"
    },
    outputs: {
      change: "dirChange"
    },
    exportAs: ["dir"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: Directionality,
      useExisting: _Dir
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Dir, [{
    type: Directive,
    args: [{
      selector: "[dir]",
      providers: [{
        provide: Directionality,
        useExisting: Dir
      }],
      host: {
        "[attr.dir]": "_rawDir"
      },
      exportAs: "dir"
    }]
  }], null, {
    change: [{
      type: Output,
      args: ["dirChange"]
    }],
    dir: [{
      type: Input
    }]
  });
})();
var BidiModule = class _BidiModule {
  static \u0275fac = function BidiModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BidiModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _BidiModule,
    imports: [Dir],
    exports: [Dir]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BidiModule, [{
    type: NgModule,
    args: [{
      imports: [Dir],
      exports: [Dir]
    }]
  }], null, null);
})();

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/_data-source-chunk.mjs
var DataSource = class {
};
function isDataSource(value) {
  return value && typeof value.connect === "function" && !(value instanceof ConnectableObservable);
}

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/_recycle-view-repeater-strategy-chunk.mjs
var ArrayDataSource = class extends DataSource {
  _data;
  constructor(_data) {
    super();
    this._data = _data;
  }
  connect() {
    return isObservable(this._data) ? this._data : of(this._data);
  }
  disconnect() {
  }
};
var _ViewRepeaterOperation;
(function(_ViewRepeaterOperation2) {
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["REPLACED"] = 0] = "REPLACED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["INSERTED"] = 1] = "INSERTED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["MOVED"] = 2] = "MOVED";
  _ViewRepeaterOperation2[_ViewRepeaterOperation2["REMOVED"] = 3] = "REMOVED";
})(_ViewRepeaterOperation || (_ViewRepeaterOperation = {}));
var _RecycleViewRepeaterStrategy = class {
  viewCacheSize = 20;
  _viewCache = [];
  applyChanges(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
    changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
      let view;
      let operation;
      if (record.previousIndex == null) {
        const viewArgsFactory = () => itemContextFactory(record, adjustedPreviousIndex, currentIndex);
        view = this._insertView(viewArgsFactory, currentIndex, viewContainerRef, itemValueResolver(record));
        operation = view ? _ViewRepeaterOperation.INSERTED : _ViewRepeaterOperation.REPLACED;
      } else if (currentIndex == null) {
        this._detachAndCacheView(adjustedPreviousIndex, viewContainerRef);
        operation = _ViewRepeaterOperation.REMOVED;
      } else {
        view = this._moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, itemValueResolver(record));
        operation = _ViewRepeaterOperation.MOVED;
      }
      if (itemViewChanged) {
        itemViewChanged({
          context: view?.context,
          operation,
          record
        });
      }
    });
  }
  detach() {
    for (const view of this._viewCache) {
      view.destroy();
    }
    this._viewCache = [];
  }
  _insertView(viewArgsFactory, currentIndex, viewContainerRef, value) {
    const cachedView = this._insertViewFromCache(currentIndex, viewContainerRef);
    if (cachedView) {
      cachedView.context.$implicit = value;
      return void 0;
    }
    const viewArgs = viewArgsFactory();
    return viewContainerRef.createEmbeddedView(viewArgs.templateRef, viewArgs.context, viewArgs.index);
  }
  _detachAndCacheView(index, viewContainerRef) {
    const detachedView = viewContainerRef.detach(index);
    this._maybeCacheView(detachedView, viewContainerRef);
  }
  _moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, value) {
    const view = viewContainerRef.get(adjustedPreviousIndex);
    viewContainerRef.move(view, currentIndex);
    view.context.$implicit = value;
    return view;
  }
  _maybeCacheView(view, viewContainerRef) {
    if (this._viewCache.length < this.viewCacheSize) {
      this._viewCache.push(view);
    } else {
      const index = viewContainerRef.indexOf(view);
      if (index === -1) {
        view.destroy();
      } else {
        viewContainerRef.remove(index);
      }
    }
  }
  _insertViewFromCache(index, viewContainerRef) {
    const cachedView = this._viewCache.pop();
    if (cachedView) {
      viewContainerRef.insert(cachedView, index);
    }
    return cachedView || null;
  }
};

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/scrolling.mjs
var _c0 = ["contentWrapper"];
var _c1 = ["*"];
var VIRTUAL_SCROLL_STRATEGY = new InjectionToken("VIRTUAL_SCROLL_STRATEGY");
var FixedSizeVirtualScrollStrategy = class {
  _scrolledIndexChange = new Subject();
  scrolledIndexChange = this._scrolledIndexChange.pipe(distinctUntilChanged());
  _viewport = null;
  _itemSize;
  _minBufferPx;
  _maxBufferPx;
  constructor(itemSize, minBufferPx, maxBufferPx) {
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
  }
  attach(viewport) {
    this._viewport = viewport;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  detach() {
    this._scrolledIndexChange.complete();
    this._viewport = null;
  }
  updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx) {
    if (maxBufferPx < minBufferPx && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx");
    }
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  onContentScrolled() {
    this._updateRenderedRange();
  }
  onDataLengthChanged() {
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  onContentRendered() {
  }
  onRenderedOffsetChanged() {
  }
  scrollToIndex(index, behavior) {
    if (this._viewport) {
      this._viewport.scrollToOffset(index * this._itemSize, behavior);
    }
  }
  _updateTotalContentSize() {
    if (!this._viewport) {
      return;
    }
    this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
  }
  _updateRenderedRange() {
    if (!this._viewport) {
      return;
    }
    const renderedRange = this._viewport.getRenderedRange();
    const newRange = {
      start: renderedRange.start,
      end: renderedRange.end
    };
    const viewportSize = this._viewport.getViewportSize();
    const dataLength = this._viewport.getDataLength();
    let scrollOffset = this._viewport.measureScrollOffset();
    let firstVisibleIndex = this._itemSize > 0 ? scrollOffset / this._itemSize : 0;
    if (newRange.end > dataLength) {
      const maxVisibleItems = Math.ceil(viewportSize / this._itemSize);
      const newVisibleIndex = Math.max(0, Math.min(firstVisibleIndex, dataLength - maxVisibleItems));
      if (firstVisibleIndex != newVisibleIndex) {
        firstVisibleIndex = newVisibleIndex;
        scrollOffset = newVisibleIndex * this._itemSize;
        newRange.start = Math.floor(firstVisibleIndex);
      }
      newRange.end = Math.max(0, Math.min(dataLength, newRange.start + maxVisibleItems));
    }
    const startBuffer = scrollOffset - newRange.start * this._itemSize;
    if (startBuffer < this._minBufferPx && newRange.start != 0) {
      const expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
      newRange.start = Math.max(0, newRange.start - expandStart);
      newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
    } else {
      const endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);
      if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
        const expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);
        if (expandEnd > 0) {
          newRange.end = Math.min(dataLength, newRange.end + expandEnd);
          newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
        }
      }
    }
    this._viewport.setRenderedRange(newRange);
    this._viewport.setRenderedContentOffset(Math.round(this._itemSize * newRange.start));
    this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
  }
};
function _fixedSizeVirtualScrollStrategyFactory(fixedSizeDir) {
  return fixedSizeDir._scrollStrategy;
}
var CdkFixedSizeVirtualScroll = class _CdkFixedSizeVirtualScroll {
  get itemSize() {
    return this._itemSize;
  }
  set itemSize(value) {
    this._itemSize = coerceNumberProperty(value);
  }
  _itemSize = 20;
  get minBufferPx() {
    return this._minBufferPx;
  }
  set minBufferPx(value) {
    this._minBufferPx = coerceNumberProperty(value);
  }
  _minBufferPx = 100;
  get maxBufferPx() {
    return this._maxBufferPx;
  }
  set maxBufferPx(value) {
    this._maxBufferPx = coerceNumberProperty(value);
  }
  _maxBufferPx = 200;
  _scrollStrategy = new FixedSizeVirtualScrollStrategy(this.itemSize, this.minBufferPx, this.maxBufferPx);
  ngOnChanges() {
    this._scrollStrategy.updateItemAndBufferSize(this.itemSize, this.minBufferPx, this.maxBufferPx);
  }
  static \u0275fac = function CdkFixedSizeVirtualScroll_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkFixedSizeVirtualScroll)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkFixedSizeVirtualScroll,
    selectors: [["cdk-virtual-scroll-viewport", "itemSize", ""]],
    inputs: {
      itemSize: "itemSize",
      minBufferPx: "minBufferPx",
      maxBufferPx: "maxBufferPx"
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: _fixedSizeVirtualScrollStrategyFactory,
      deps: [forwardRef(() => _CdkFixedSizeVirtualScroll)]
    }]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkFixedSizeVirtualScroll, [{
    type: Directive,
    args: [{
      selector: "cdk-virtual-scroll-viewport[itemSize]",
      providers: [{
        provide: VIRTUAL_SCROLL_STRATEGY,
        useFactory: _fixedSizeVirtualScrollStrategyFactory,
        deps: [forwardRef(() => CdkFixedSizeVirtualScroll)]
      }]
    }]
  }], null, {
    itemSize: [{
      type: Input
    }],
    minBufferPx: [{
      type: Input
    }],
    maxBufferPx: [{
      type: Input
    }]
  });
})();
var DEFAULT_SCROLL_TIME = 20;
var ScrollDispatcher = class _ScrollDispatcher {
  _ngZone = inject(NgZone);
  _platform = inject(Platform);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _cleanupGlobalListener;
  constructor() {
  }
  _scrolled = new Subject();
  _scrolledCount = 0;
  scrollContainers = /* @__PURE__ */ new Map();
  register(scrollable) {
    if (!this.scrollContainers.has(scrollable)) {
      this.scrollContainers.set(scrollable, scrollable.elementScrolled().subscribe(() => this._scrolled.next(scrollable)));
    }
  }
  deregister(scrollable) {
    const scrollableReference = this.scrollContainers.get(scrollable);
    if (scrollableReference) {
      scrollableReference.unsubscribe();
      this.scrollContainers.delete(scrollable);
    }
  }
  scrolled(auditTimeInMs = DEFAULT_SCROLL_TIME) {
    if (!this._platform.isBrowser) {
      return of();
    }
    return new Observable((observer) => {
      if (!this._cleanupGlobalListener) {
        this._cleanupGlobalListener = this._ngZone.runOutsideAngular(() => this._renderer.listen("document", "scroll", () => this._scrolled.next()));
      }
      const subscription = auditTimeInMs > 0 ? this._scrolled.pipe(auditTime(auditTimeInMs)).subscribe(observer) : this._scrolled.subscribe(observer);
      this._scrolledCount++;
      return () => {
        subscription.unsubscribe();
        this._scrolledCount--;
        if (!this._scrolledCount) {
          this._cleanupGlobalListener?.();
          this._cleanupGlobalListener = void 0;
        }
      };
    });
  }
  ngOnDestroy() {
    this._cleanupGlobalListener?.();
    this._cleanupGlobalListener = void 0;
    this.scrollContainers.forEach((_, container) => this.deregister(container));
    this._scrolled.complete();
  }
  ancestorScrolled(elementOrElementRef, auditTimeInMs) {
    const ancestors = this.getAncestorScrollContainers(elementOrElementRef);
    return this.scrolled(auditTimeInMs).pipe(filter((target) => !target || ancestors.indexOf(target) > -1));
  }
  getAncestorScrollContainers(elementOrElementRef) {
    const scrollingContainers = [];
    this.scrollContainers.forEach((_subscription, scrollable) => {
      if (this._scrollableContainsElement(scrollable, elementOrElementRef)) {
        scrollingContainers.push(scrollable);
      }
    });
    return scrollingContainers;
  }
  _scrollableContainsElement(scrollable, elementOrElementRef) {
    let element = coerceElement(elementOrElementRef);
    let scrollableElement = scrollable.getElementRef().nativeElement;
    do {
      if (element == scrollableElement) {
        return true;
      }
    } while (element = element.parentElement);
    return false;
  }
  static \u0275fac = function ScrollDispatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollDispatcher)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ScrollDispatcher,
    factory: _ScrollDispatcher.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CdkScrollable = class _CdkScrollable {
  elementRef = inject(ElementRef);
  scrollDispatcher = inject(ScrollDispatcher);
  ngZone = inject(NgZone);
  dir = inject(Directionality, {
    optional: true
  });
  _scrollElement = this.elementRef.nativeElement;
  _destroyed = new Subject();
  _renderer = inject(Renderer2);
  _cleanupScroll;
  _elementScrolled = new Subject();
  constructor() {
  }
  ngOnInit() {
    this._cleanupScroll = this.ngZone.runOutsideAngular(() => this._renderer.listen(this._scrollElement, "scroll", (event) => this._elementScrolled.next(event)));
    this.scrollDispatcher.register(this);
  }
  ngOnDestroy() {
    this._cleanupScroll?.();
    this._elementScrolled.complete();
    this.scrollDispatcher.deregister(this);
    this._destroyed.next();
    this._destroyed.complete();
  }
  elementScrolled() {
    return this._elementScrolled;
  }
  getElementRef() {
    return this.elementRef;
  }
  scrollTo(options) {
    const el = this.elementRef.nativeElement;
    const isRtl = this.dir && this.dir.value == "rtl";
    if (options.left == null) {
      options.left = isRtl ? options.end : options.start;
    }
    if (options.right == null) {
      options.right = isRtl ? options.start : options.end;
    }
    if (options.bottom != null) {
      options.top = el.scrollHeight - el.clientHeight - options.bottom;
    }
    if (isRtl && getRtlScrollAxisType() != RtlScrollAxisType.NORMAL) {
      if (options.left != null) {
        options.right = el.scrollWidth - el.clientWidth - options.left;
      }
      if (getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
        options.left = options.right;
      } else if (getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
        options.left = options.right ? -options.right : options.right;
      }
    } else {
      if (options.right != null) {
        options.left = el.scrollWidth - el.clientWidth - options.right;
      }
    }
    this._applyScrollToOptions(options);
  }
  _applyScrollToOptions(options) {
    const el = this.elementRef.nativeElement;
    if (supportsScrollBehavior()) {
      el.scrollTo(options);
    } else {
      if (options.top != null) {
        el.scrollTop = options.top;
      }
      if (options.left != null) {
        el.scrollLeft = options.left;
      }
    }
  }
  measureScrollOffset(from) {
    const LEFT = "left";
    const RIGHT = "right";
    const el = this.elementRef.nativeElement;
    if (from == "top") {
      return el.scrollTop;
    }
    if (from == "bottom") {
      return el.scrollHeight - el.clientHeight - el.scrollTop;
    }
    const isRtl = this.dir && this.dir.value == "rtl";
    if (from == "start") {
      from = isRtl ? RIGHT : LEFT;
    } else if (from == "end") {
      from = isRtl ? LEFT : RIGHT;
    }
    if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
      if (from == LEFT) {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      } else {
        return el.scrollLeft;
      }
    } else if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
      if (from == LEFT) {
        return el.scrollLeft + el.scrollWidth - el.clientWidth;
      } else {
        return -el.scrollLeft;
      }
    } else {
      if (from == LEFT) {
        return el.scrollLeft;
      } else {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      }
    }
  }
  static \u0275fac = function CdkScrollable_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkScrollable)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkScrollable,
    selectors: [["", "cdk-scrollable", ""], ["", "cdkScrollable", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkScrollable, [{
    type: Directive,
    args: [{
      selector: "[cdk-scrollable], [cdkScrollable]"
    }]
  }], () => [], null);
})();
var DEFAULT_RESIZE_TIME = 20;
var ViewportRuler = class _ViewportRuler {
  _platform = inject(Platform);
  _listeners;
  _viewportSize = null;
  _change = new Subject();
  _document = inject(DOCUMENT);
  constructor() {
    const ngZone = inject(NgZone);
    const renderer = inject(RendererFactory2).createRenderer(null, null);
    ngZone.runOutsideAngular(() => {
      if (this._platform.isBrowser) {
        const changeListener = (event) => this._change.next(event);
        this._listeners = [renderer.listen("window", "resize", changeListener), renderer.listen("window", "orientationchange", changeListener)];
      }
      this.change().subscribe(() => this._viewportSize = null);
    });
  }
  ngOnDestroy() {
    this._listeners?.forEach((cleanup) => cleanup());
    this._change.complete();
  }
  getViewportSize() {
    if (!this._viewportSize) {
      this._updateViewportSize();
    }
    const output = {
      width: this._viewportSize.width,
      height: this._viewportSize.height
    };
    if (!this._platform.isBrowser) {
      this._viewportSize = null;
    }
    return output;
  }
  getViewportRect() {
    const scrollPosition = this.getViewportScrollPosition();
    const {
      width,
      height
    } = this.getViewportSize();
    return {
      top: scrollPosition.top,
      left: scrollPosition.left,
      bottom: scrollPosition.top + height,
      right: scrollPosition.left + width,
      height,
      width
    };
  }
  getViewportScrollPosition() {
    if (!this._platform.isBrowser) {
      return {
        top: 0,
        left: 0
      };
    }
    const document2 = this._document;
    const window2 = this._getWindow();
    const documentElement = document2.documentElement;
    const documentRect = documentElement.getBoundingClientRect();
    const top = -documentRect.top || document2.body?.scrollTop || window2.scrollY || documentElement.scrollTop || 0;
    const left = -documentRect.left || document2.body?.scrollLeft || window2.scrollX || documentElement.scrollLeft || 0;
    return {
      top,
      left
    };
  }
  change(throttleTime = DEFAULT_RESIZE_TIME) {
    return throttleTime > 0 ? this._change.pipe(auditTime(throttleTime)) : this._change;
  }
  _getWindow() {
    return this._document.defaultView || window;
  }
  _updateViewportSize() {
    const window2 = this._getWindow();
    this._viewportSize = this._platform.isBrowser ? {
      width: window2.innerWidth,
      height: window2.innerHeight
    } : {
      width: 0,
      height: 0
    };
  }
  static \u0275fac = function ViewportRuler_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ViewportRuler)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ViewportRuler,
    factory: _ViewportRuler.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewportRuler, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var VIRTUAL_SCROLLABLE = new InjectionToken("VIRTUAL_SCROLLABLE");
var CdkVirtualScrollable = class _CdkVirtualScrollable extends CdkScrollable {
  constructor() {
    super();
  }
  measureViewportSize(orientation) {
    const viewportEl = this.elementRef.nativeElement;
    return orientation === "horizontal" ? viewportEl.clientWidth : viewportEl.clientHeight;
  }
  static \u0275fac = function CdkVirtualScrollable_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollable)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkVirtualScrollable,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollable, [{
    type: Directive
  }], () => [], null);
})();
function rangesEqual(r1, r2) {
  return r1.start == r2.start && r1.end == r2.end;
}
var SCROLL_SCHEDULER = typeof requestAnimationFrame !== "undefined" ? animationFrameScheduler : asapScheduler;
var CDK_VIRTUAL_SCROLL_VIEWPORT = new InjectionToken("CDK_VIRTUAL_SCROLL_VIEWPORT");
var CdkVirtualScrollViewport = class _CdkVirtualScrollViewport extends CdkVirtualScrollable {
  elementRef = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _scrollStrategy = inject(VIRTUAL_SCROLL_STRATEGY, {
    optional: true
  });
  scrollable = inject(VIRTUAL_SCROLLABLE, {
    optional: true
  });
  _platform = inject(Platform);
  _detachedSubject = new Subject();
  _renderedRangeSubject = new Subject();
  _renderedContentOffsetSubject = new Subject();
  get orientation() {
    return this._orientation;
  }
  set orientation(orientation) {
    if (this._orientation !== orientation) {
      this._orientation = orientation;
      this._calculateSpacerSize();
    }
  }
  _orientation = "vertical";
  appendOnly = false;
  scrolledIndexChange = new Observable((observer) => this._scrollStrategy.scrolledIndexChange.subscribe((index) => Promise.resolve().then(() => this.ngZone.run(() => observer.next(index)))));
  _contentWrapper;
  renderedRangeStream = this._renderedRangeSubject;
  renderedContentOffset = this._renderedContentOffsetSubject.pipe(filter((offset) => offset !== null), distinctUntilChanged());
  _totalContentSize = 0;
  _totalContentWidth = signal("", ...ngDevMode ? [{
    debugName: "_totalContentWidth"
  }] : []);
  _totalContentHeight = signal("", ...ngDevMode ? [{
    debugName: "_totalContentHeight"
  }] : []);
  _renderedContentTransform;
  _renderedRange = {
    start: 0,
    end: 0
  };
  _dataLength = 0;
  _viewportSize = 0;
  _forOf = null;
  _renderedContentOffset = 0;
  _renderedContentOffsetNeedsRewrite = false;
  _changeDetectionNeeded = signal(false, ...ngDevMode ? [{
    debugName: "_changeDetectionNeeded"
  }] : []);
  _runAfterChangeDetection = [];
  _viewportChanges = Subscription.EMPTY;
  _injector = inject(Injector);
  _isDestroyed = false;
  constructor() {
    super();
    const viewportRuler = inject(ViewportRuler);
    if (!this._scrollStrategy && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
    }
    this._viewportChanges = viewportRuler.change().subscribe(() => {
      this.checkViewportSize();
    });
    if (!this.scrollable) {
      this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable");
      this.scrollable = this;
    }
    const ref = effect(() => {
      if (this._changeDetectionNeeded()) {
        this._doChangeDetection();
      }
    }, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "ref"
    } : {}), {
      injector: inject(ApplicationRef).injector
    }));
    inject(DestroyRef).onDestroy(() => void ref.destroy());
  }
  ngOnInit() {
    if (!this._platform.isBrowser) {
      return;
    }
    if (this.scrollable === this) {
      super.ngOnInit();
    }
    this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => {
      this._measureViewportSize();
      this._scrollStrategy.attach(this);
      this.scrollable.elementScrolled().pipe(startWith(null), auditTime(0, SCROLL_SCHEDULER), takeUntil(this._destroyed)).subscribe(() => this._scrollStrategy.onContentScrolled());
      this._markChangeDetectionNeeded();
    }));
  }
  ngOnDestroy() {
    this.detach();
    this._scrollStrategy.detach();
    this._renderedRangeSubject.complete();
    this._detachedSubject.complete();
    this._viewportChanges.unsubscribe();
    this._isDestroyed = true;
    super.ngOnDestroy();
  }
  attach(forOf) {
    if (this._forOf && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("CdkVirtualScrollViewport is already attached.");
    }
    this.ngZone.runOutsideAngular(() => {
      this._forOf = forOf;
      this._forOf.dataStream.pipe(takeUntil(this._detachedSubject)).subscribe((data) => {
        const newLength = data.length;
        if (newLength !== this._dataLength) {
          this._dataLength = newLength;
          this._scrollStrategy.onDataLengthChanged();
        }
        this._doChangeDetection();
      });
    });
  }
  detach() {
    this._forOf = null;
    this._detachedSubject.next();
  }
  getDataLength() {
    return this._dataLength;
  }
  getViewportSize() {
    return this._viewportSize;
  }
  getRenderedRange() {
    return this._renderedRange;
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from];
  }
  setTotalContentSize(size) {
    if (this._totalContentSize !== size) {
      this._totalContentSize = size;
      this._calculateSpacerSize();
      this._markChangeDetectionNeeded();
    }
  }
  setRenderedRange(range) {
    if (!rangesEqual(this._renderedRange, range)) {
      if (this.appendOnly) {
        range = {
          start: 0,
          end: Math.max(this._renderedRange.end, range.end)
        };
      }
      this._renderedRangeSubject.next(this._renderedRange = range);
      this._markChangeDetectionNeeded(() => this._scrollStrategy.onContentRendered());
    }
  }
  getOffsetToRenderedContentStart() {
    return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
  }
  setRenderedContentOffset(offset, to = "to-start") {
    offset = this.appendOnly && to === "to-start" ? 0 : offset;
    const isRtl = this.dir && this.dir.value == "rtl";
    const isHorizontal = this.orientation == "horizontal";
    const axis = isHorizontal ? "X" : "Y";
    const axisDirection = isHorizontal && isRtl ? -1 : 1;
    let transform = `translate${axis}(${Number(axisDirection * offset)}px)`;
    this._renderedContentOffset = offset;
    if (to === "to-end") {
      transform += ` translate${axis}(-100%)`;
      this._renderedContentOffsetNeedsRewrite = true;
    }
    if (this._renderedContentTransform != transform) {
      this._renderedContentTransform = transform;
      this._markChangeDetectionNeeded(() => {
        if (this._renderedContentOffsetNeedsRewrite) {
          this._renderedContentOffset -= this.measureRenderedContentSize();
          this._renderedContentOffsetNeedsRewrite = false;
          this.setRenderedContentOffset(this._renderedContentOffset);
        } else {
          this._scrollStrategy.onRenderedOffsetChanged();
        }
      });
    }
  }
  scrollToOffset(offset, behavior = "auto") {
    const options = {
      behavior
    };
    if (this.orientation === "horizontal") {
      options.start = offset;
    } else {
      options.top = offset;
    }
    this.scrollable.scrollTo(options);
  }
  scrollToIndex(index, behavior = "auto") {
    this._scrollStrategy.scrollToIndex(index, behavior);
  }
  measureScrollOffset(from) {
    let measureScrollOffset;
    if (this.scrollable == this) {
      measureScrollOffset = (_from) => super.measureScrollOffset(_from);
    } else {
      measureScrollOffset = (_from) => this.scrollable.measureScrollOffset(_from);
    }
    return Math.max(0, measureScrollOffset(from ?? (this.orientation === "horizontal" ? "start" : "top")) - this.measureViewportOffset());
  }
  measureViewportOffset(from) {
    let fromRect;
    const LEFT = "left";
    const RIGHT = "right";
    const isRtl = this.dir?.value == "rtl";
    if (from == "start") {
      fromRect = isRtl ? RIGHT : LEFT;
    } else if (from == "end") {
      fromRect = isRtl ? LEFT : RIGHT;
    } else if (from) {
      fromRect = from;
    } else {
      fromRect = this.orientation === "horizontal" ? "left" : "top";
    }
    const scrollerClientRect = this.scrollable.measureBoundingClientRectWithScrollOffset(fromRect);
    const viewportClientRect = this.elementRef.nativeElement.getBoundingClientRect()[fromRect];
    return viewportClientRect - scrollerClientRect;
  }
  measureRenderedContentSize() {
    const contentEl = this._contentWrapper.nativeElement;
    return this.orientation === "horizontal" ? contentEl.offsetWidth : contentEl.offsetHeight;
  }
  measureRangeSize(range) {
    if (!this._forOf) {
      return 0;
    }
    return this._forOf.measureRangeSize(range, this.orientation);
  }
  checkViewportSize() {
    this._measureViewportSize();
    this._scrollStrategy.onDataLengthChanged();
  }
  _measureViewportSize() {
    this._viewportSize = this.scrollable.measureViewportSize(this.orientation);
  }
  _markChangeDetectionNeeded(runAfter) {
    if (runAfter) {
      this._runAfterChangeDetection.push(runAfter);
    }
    if (untracked(this._changeDetectionNeeded)) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      Promise.resolve().then(() => {
        this.ngZone.run(() => {
          this._changeDetectionNeeded.set(true);
        });
      });
    });
  }
  _doChangeDetection() {
    if (this._isDestroyed) {
      return;
    }
    this.ngZone.run(() => {
      this._changeDetectorRef.markForCheck();
      this._contentWrapper.nativeElement.style.transform = this._renderedContentTransform;
      this._renderedContentOffsetSubject.next(this.getOffsetToRenderedContentStart());
      afterNextRender(() => {
        this._changeDetectionNeeded.set(false);
        const runAfterChangeDetection = this._runAfterChangeDetection;
        this._runAfterChangeDetection = [];
        for (const fn of runAfterChangeDetection) {
          fn();
        }
      }, {
        injector: this._injector
      });
    });
  }
  _calculateSpacerSize() {
    this._totalContentHeight.set(this.orientation === "horizontal" ? "" : `${this._totalContentSize}px`);
    this._totalContentWidth.set(this.orientation === "horizontal" ? `${this._totalContentSize}px` : "");
  }
  static \u0275fac = function CdkVirtualScrollViewport_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollViewport)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CdkVirtualScrollViewport,
    selectors: [["cdk-virtual-scroll-viewport"]],
    viewQuery: function CdkVirtualScrollViewport_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._contentWrapper = _t.first);
      }
    },
    hostAttrs: [1, "cdk-virtual-scroll-viewport"],
    hostVars: 4,
    hostBindings: function CdkVirtualScrollViewport_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("cdk-virtual-scroll-orientation-horizontal", ctx.orientation === "horizontal")("cdk-virtual-scroll-orientation-vertical", ctx.orientation !== "horizontal");
      }
    },
    inputs: {
      orientation: "orientation",
      appendOnly: [2, "appendOnly", "appendOnly", booleanAttribute]
    },
    outputs: {
      scrolledIndexChange: "scrolledIndexChange"
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkScrollable,
      useFactory: () => inject(VIRTUAL_SCROLLABLE, {
        optional: true
      }) || inject(_CdkVirtualScrollViewport)
    }, {
      provide: CDK_VIRTUAL_SCROLL_VIEWPORT,
      useExisting: _CdkVirtualScrollViewport
    }]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c1,
    decls: 4,
    vars: 4,
    consts: [["contentWrapper", ""], [1, "cdk-virtual-scroll-content-wrapper"], [1, "cdk-virtual-scroll-spacer"]],
    template: function CdkVirtualScrollViewport_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domElementStart(0, "div", 1, 0);
        \u0275\u0275projection(2);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElement(3, "div", 2);
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275styleProp("width", ctx._totalContentWidth())("height", ctx._totalContentHeight());
      }
    },
    styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollViewport, [{
    type: Component,
    args: [{
      selector: "cdk-virtual-scroll-viewport",
      host: {
        "class": "cdk-virtual-scroll-viewport",
        "[class.cdk-virtual-scroll-orientation-horizontal]": 'orientation === "horizontal"',
        "[class.cdk-virtual-scroll-orientation-vertical]": 'orientation !== "horizontal"'
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: CdkScrollable,
        useFactory: () => inject(VIRTUAL_SCROLLABLE, {
          optional: true
        }) || inject(CdkVirtualScrollViewport)
      }, {
        provide: CDK_VIRTUAL_SCROLL_VIEWPORT,
        useExisting: CdkVirtualScrollViewport
      }],
      template: '<!--\n  Wrap the rendered content in an element that will be used to offset it based on the scroll\n  position.\n-->\n<div #contentWrapper class="cdk-virtual-scroll-content-wrapper">\n  <ng-content></ng-content>\n</div>\n<!--\n  Spacer used to force the scrolling container to the correct size for the *total* number of items\n  so that the scrollbar captures the size of the entire data set.\n-->\n<div class="cdk-virtual-scroll-spacer"\n     [style.width]="_totalContentWidth()" [style.height]="_totalContentHeight()"></div>\n',
      styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}\n"]
    }]
  }], () => [], {
    orientation: [{
      type: Input
    }],
    appendOnly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    scrolledIndexChange: [{
      type: Output
    }],
    _contentWrapper: [{
      type: ViewChild,
      args: ["contentWrapper", {
        static: true
      }]
    }]
  });
})();
function getOffset(orientation, direction, node) {
  const el = node;
  if (!el.getBoundingClientRect) {
    return 0;
  }
  const rect = el.getBoundingClientRect();
  if (orientation === "horizontal") {
    return direction === "start" ? rect.left : rect.right;
  }
  return direction === "start" ? rect.top : rect.bottom;
}
var CdkVirtualForOf = class _CdkVirtualForOf {
  _viewContainerRef = inject(ViewContainerRef);
  _template = inject(TemplateRef);
  _differs = inject(IterableDiffers);
  _viewRepeater = new _RecycleViewRepeaterStrategy();
  _viewport = inject(CDK_VIRTUAL_SCROLL_VIEWPORT, {
    skipSelf: true
  });
  viewChange = new Subject();
  _dataSourceChanges = new Subject();
  get cdkVirtualForOf() {
    return this._cdkVirtualForOf;
  }
  set cdkVirtualForOf(value) {
    this._cdkVirtualForOf = value;
    if (isDataSource(value)) {
      this._dataSourceChanges.next(value);
    } else {
      this._dataSourceChanges.next(new ArrayDataSource(isObservable(value) ? value : Array.from(value || [])));
    }
  }
  _cdkVirtualForOf;
  get cdkVirtualForTrackBy() {
    return this._cdkVirtualForTrackBy;
  }
  set cdkVirtualForTrackBy(fn) {
    this._needsUpdate = true;
    this._cdkVirtualForTrackBy = fn ? (index, item) => fn(index + (this._renderedRange ? this._renderedRange.start : 0), item) : void 0;
  }
  _cdkVirtualForTrackBy;
  set cdkVirtualForTemplate(value) {
    if (value) {
      this._needsUpdate = true;
      this._template = value;
    }
  }
  get cdkVirtualForTemplateCacheSize() {
    return this._viewRepeater.viewCacheSize;
  }
  set cdkVirtualForTemplateCacheSize(size) {
    this._viewRepeater.viewCacheSize = coerceNumberProperty(size);
  }
  dataStream = this._dataSourceChanges.pipe(startWith(null), pairwise(), switchMap(([prev, cur]) => this._changeDataSource(prev, cur)), shareReplay(1));
  _differ = null;
  _data = [];
  _renderedItems = [];
  _renderedRange = {
    start: 0,
    end: 0
  };
  _needsUpdate = false;
  _destroyed = new Subject();
  constructor() {
    const ngZone = inject(NgZone);
    this.dataStream.subscribe((data) => {
      this._data = data;
      this._onRenderedDataChange();
    });
    this._viewport.renderedRangeStream.pipe(takeUntil(this._destroyed)).subscribe((range) => {
      this._renderedRange = range;
      if (this.viewChange.observers.length) {
        ngZone.run(() => this.viewChange.next(this._renderedRange));
      }
      this._onRenderedDataChange();
    });
    this._viewport.attach(this);
  }
  measureRangeSize(range, orientation) {
    if (range.start >= range.end) {
      return 0;
    }
    if ((range.start < this._renderedRange.start || range.end > this._renderedRange.end) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`Error: attempted to measure an item that isn't rendered.`);
    }
    const renderedStartIndex = range.start - this._renderedRange.start;
    const rangeLen = range.end - range.start;
    let firstNode;
    let lastNode;
    for (let i = 0; i < rangeLen; i++) {
      const view = this._viewContainerRef.get(i + renderedStartIndex);
      if (view && view.rootNodes.length) {
        firstNode = lastNode = view.rootNodes[0];
        break;
      }
    }
    for (let i = rangeLen - 1; i > -1; i--) {
      const view = this._viewContainerRef.get(i + renderedStartIndex);
      if (view && view.rootNodes.length) {
        lastNode = view.rootNodes[view.rootNodes.length - 1];
        break;
      }
    }
    return firstNode && lastNode ? getOffset(orientation, "end", lastNode) - getOffset(orientation, "start", firstNode) : 0;
  }
  ngDoCheck() {
    if (this._differ && this._needsUpdate) {
      const changes = this._differ.diff(this._renderedItems);
      if (!changes) {
        this._updateContext();
      } else {
        this._applyChanges(changes);
      }
      this._needsUpdate = false;
    }
  }
  ngOnDestroy() {
    this._viewport.detach();
    this._dataSourceChanges.next(void 0);
    this._dataSourceChanges.complete();
    this.viewChange.complete();
    this._destroyed.next();
    this._destroyed.complete();
    this._viewRepeater.detach();
  }
  _onRenderedDataChange() {
    if (!this._renderedRange) {
      return;
    }
    this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end);
    if (!this._differ) {
      this._differ = this._differs.find(this._renderedItems).create((index, item) => {
        return this.cdkVirtualForTrackBy ? this.cdkVirtualForTrackBy(index, item) : item;
      });
    }
    this._needsUpdate = true;
  }
  _changeDataSource(oldDs, newDs) {
    if (oldDs) {
      oldDs.disconnect(this);
    }
    this._needsUpdate = true;
    return newDs ? newDs.connect(this) : of();
  }
  _updateContext() {
    const count = this._data.length;
    let i = this._viewContainerRef.length;
    while (i--) {
      const view = this._viewContainerRef.get(i);
      view.context.index = this._renderedRange.start + i;
      view.context.count = count;
      this._updateComputedContextProperties(view.context);
      view.detectChanges();
    }
  }
  _applyChanges(changes) {
    this._viewRepeater.applyChanges(changes, this._viewContainerRef, (record, _adjustedPreviousIndex, currentIndex) => this._getEmbeddedViewArgs(record, currentIndex), (record) => record.item);
    changes.forEachIdentityChange((record) => {
      const view = this._viewContainerRef.get(record.currentIndex);
      view.context.$implicit = record.item;
    });
    const count = this._data.length;
    let i = this._viewContainerRef.length;
    while (i--) {
      const view = this._viewContainerRef.get(i);
      view.context.index = this._renderedRange.start + i;
      view.context.count = count;
      this._updateComputedContextProperties(view.context);
    }
  }
  _updateComputedContextProperties(context) {
    context.first = context.index === 0;
    context.last = context.index === context.count - 1;
    context.even = context.index % 2 === 0;
    context.odd = !context.even;
  }
  _getEmbeddedViewArgs(record, index) {
    return {
      templateRef: this._template,
      context: {
        $implicit: record.item,
        cdkVirtualForOf: this._cdkVirtualForOf,
        index: -1,
        count: -1,
        first: false,
        last: false,
        odd: false,
        even: false
      },
      index
    };
  }
  static ngTemplateContextGuard(directive, context) {
    return true;
  }
  static \u0275fac = function CdkVirtualForOf_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualForOf)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkVirtualForOf,
    selectors: [["", "cdkVirtualFor", "", "cdkVirtualForOf", ""]],
    inputs: {
      cdkVirtualForOf: "cdkVirtualForOf",
      cdkVirtualForTrackBy: "cdkVirtualForTrackBy",
      cdkVirtualForTemplate: "cdkVirtualForTemplate",
      cdkVirtualForTemplateCacheSize: "cdkVirtualForTemplateCacheSize"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualForOf, [{
    type: Directive,
    args: [{
      selector: "[cdkVirtualFor][cdkVirtualForOf]"
    }]
  }], () => [], {
    cdkVirtualForOf: [{
      type: Input
    }],
    cdkVirtualForTrackBy: [{
      type: Input
    }],
    cdkVirtualForTemplate: [{
      type: Input
    }],
    cdkVirtualForTemplateCacheSize: [{
      type: Input
    }]
  });
})();
var CdkVirtualScrollableElement = class _CdkVirtualScrollableElement extends CdkVirtualScrollable {
  constructor() {
    super();
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from] - this.measureScrollOffset(from);
  }
  static \u0275fac = function CdkVirtualScrollableElement_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollableElement)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkVirtualScrollableElement,
    selectors: [["", "cdkVirtualScrollingElement", ""]],
    hostAttrs: [1, "cdk-virtual-scrollable"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: VIRTUAL_SCROLLABLE,
      useExisting: _CdkVirtualScrollableElement
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollableElement, [{
    type: Directive,
    args: [{
      selector: "[cdkVirtualScrollingElement]",
      providers: [{
        provide: VIRTUAL_SCROLLABLE,
        useExisting: CdkVirtualScrollableElement
      }],
      host: {
        "class": "cdk-virtual-scrollable"
      }
    }]
  }], () => [], null);
})();
var CdkVirtualScrollableWindow = class _CdkVirtualScrollableWindow extends CdkVirtualScrollable {
  constructor() {
    super();
    const document2 = inject(DOCUMENT);
    this.elementRef = new ElementRef(document2.documentElement);
    this._scrollElement = document2;
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from];
  }
  static \u0275fac = function CdkVirtualScrollableWindow_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollableWindow)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkVirtualScrollableWindow,
    selectors: [["cdk-virtual-scroll-viewport", "scrollWindow", ""]],
    features: [\u0275\u0275ProvidersFeature([{
      provide: VIRTUAL_SCROLLABLE,
      useExisting: _CdkVirtualScrollableWindow
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollableWindow, [{
    type: Directive,
    args: [{
      selector: "cdk-virtual-scroll-viewport[scrollWindow]",
      providers: [{
        provide: VIRTUAL_SCROLLABLE,
        useExisting: CdkVirtualScrollableWindow
      }]
    }]
  }], () => [], null);
})();
var CdkScrollableModule = class _CdkScrollableModule {
  static \u0275fac = function CdkScrollableModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkScrollableModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CdkScrollableModule,
    imports: [CdkScrollable],
    exports: [CdkScrollable]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkScrollableModule, [{
    type: NgModule,
    args: [{
      exports: [CdkScrollable],
      imports: [CdkScrollable]
    }]
  }], null, null);
})();
var ScrollingModule = class _ScrollingModule {
  static \u0275fac = function ScrollingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ScrollingModule,
    imports: [BidiModule, CdkScrollableModule, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollableWindow, CdkVirtualScrollableElement],
    exports: [BidiModule, CdkScrollableModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, CdkVirtualScrollableWindow, CdkVirtualScrollableElement]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BidiModule, CdkScrollableModule, BidiModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollingModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, CdkScrollableModule, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollableWindow, CdkVirtualScrollableElement],
      exports: [BidiModule, CdkScrollableModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, CdkVirtualScrollableWindow, CdkVirtualScrollableElement]
    }]
  }], null, null);
})();

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/_id-generator-chunk.mjs
var counters = {};
var _IdGenerator = class __IdGenerator {
  _appId = inject(APP_ID);
  static _infix = `a${Math.floor(Math.random() * 1e5).toString()}`;
  getId(prefix, randomize = false) {
    if (this._appId !== "ng") {
      prefix += this._appId;
    }
    if (!counters.hasOwnProperty(prefix)) {
      counters[prefix] = 0;
    }
    return `${prefix}${randomize ? __IdGenerator._infix + "-" : ""}${counters[prefix]++}`;
  }
  static \u0275fac = function _IdGenerator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __IdGenerator)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: __IdGenerator,
    factory: __IdGenerator.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_IdGenerator, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/_array-chunk.mjs
function coerceArray(value) {
  return Array.isArray(value) ? value : [value];
}

// node_modules/.pnpm/@angular+cdk@21.2.3_@angula_24f80a608cd1de527cfa28eed3b53f77/node_modules/@angular/cdk/fesm2022/drag-drop.mjs
function deepCloneNode(node) {
  const clone = node.cloneNode(true);
  const descendantsWithId = clone.querySelectorAll("[id]");
  const nodeName = node.nodeName.toLowerCase();
  clone.removeAttribute("id");
  for (let i = 0; i < descendantsWithId.length; i++) {
    descendantsWithId[i].removeAttribute("id");
  }
  if (nodeName === "canvas") {
    transferCanvasData(node, clone);
  } else if (nodeName === "input" || nodeName === "select" || nodeName === "textarea") {
    transferInputData(node, clone);
  }
  transferData("canvas", node, clone, transferCanvasData);
  transferData("input, textarea, select", node, clone, transferInputData);
  return clone;
}
function transferData(selector, node, clone, callback) {
  const descendantElements = node.querySelectorAll(selector);
  if (descendantElements.length) {
    const cloneElements = clone.querySelectorAll(selector);
    for (let i = 0; i < descendantElements.length; i++) {
      callback(descendantElements[i], cloneElements[i]);
    }
  }
}
var cloneUniqueId = 0;
function transferInputData(source, clone) {
  if (clone.type !== "file") {
    clone.value = source.value;
  }
  if (clone.type === "radio" && clone.name) {
    clone.name = `mat-clone-${clone.name}-${cloneUniqueId++}`;
  }
}
function transferCanvasData(source, clone) {
  const context = clone.getContext("2d");
  if (context) {
    try {
      context.drawImage(source, 0, 0);
    } catch {
    }
  }
}
function getMutableClientRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y
  };
}
function isInsideClientRect(clientRect, x, y) {
  const {
    top,
    bottom,
    left,
    right
  } = clientRect;
  return y >= top && y <= bottom && x >= left && x <= right;
}
function isOverflowingParent(parentRect, childRect) {
  const isLeftOverflowing = childRect.left < parentRect.left;
  const isRightOverflowing = childRect.left + childRect.width > parentRect.right;
  const isTopOverflowing = childRect.top < parentRect.top;
  const isBottomOverflowing = childRect.top + childRect.height > parentRect.bottom;
  return isLeftOverflowing || isRightOverflowing || isTopOverflowing || isBottomOverflowing;
}
function adjustDomRect(domRect, top, left) {
  domRect.top += top;
  domRect.bottom = domRect.top + domRect.height;
  domRect.left += left;
  domRect.right = domRect.left + domRect.width;
}
function isPointerNearDomRect(rect, threshold, pointerX, pointerY) {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height
  } = rect;
  const xThreshold = width * threshold;
  const yThreshold = height * threshold;
  return pointerY > top - yThreshold && pointerY < bottom + yThreshold && pointerX > left - xThreshold && pointerX < right + xThreshold;
}
var ParentPositionTracker = class {
  _document;
  positions = /* @__PURE__ */ new Map();
  constructor(_document) {
    this._document = _document;
  }
  clear() {
    this.positions.clear();
  }
  cache(elements) {
    this.clear();
    this.positions.set(this._document, {
      scrollPosition: this.getViewportScrollPosition()
    });
    elements.forEach((element) => {
      this.positions.set(element, {
        scrollPosition: {
          top: element.scrollTop,
          left: element.scrollLeft
        },
        clientRect: getMutableClientRect(element)
      });
    });
  }
  handleScroll(event) {
    const target = _getEventTarget(event);
    const cachedPosition = this.positions.get(target);
    if (!cachedPosition) {
      return null;
    }
    const scrollPosition = cachedPosition.scrollPosition;
    let newTop;
    let newLeft;
    if (target === this._document) {
      const viewportScrollPosition = this.getViewportScrollPosition();
      newTop = viewportScrollPosition.top;
      newLeft = viewportScrollPosition.left;
    } else {
      newTop = target.scrollTop;
      newLeft = target.scrollLeft;
    }
    const topDifference = scrollPosition.top - newTop;
    const leftDifference = scrollPosition.left - newLeft;
    this.positions.forEach((position, node) => {
      if (position.clientRect && target !== node && target.contains(node)) {
        adjustDomRect(position.clientRect, topDifference, leftDifference);
      }
    });
    scrollPosition.top = newTop;
    scrollPosition.left = newLeft;
    return {
      top: topDifference,
      left: leftDifference
    };
  }
  getViewportScrollPosition() {
    return {
      top: window.scrollY,
      left: window.scrollX
    };
  }
};
function getRootNode(viewRef, _document) {
  const rootNodes = viewRef.rootNodes;
  if (rootNodes.length === 1 && rootNodes[0].nodeType === _document.ELEMENT_NODE) {
    return rootNodes[0];
  }
  const wrapper = _document.createElement("div");
  rootNodes.forEach((node) => wrapper.appendChild(node));
  return wrapper;
}
function extendStyles(dest, source, importantProperties2) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      const value = source[key];
      if (value) {
        dest.setProperty(key, value, importantProperties2?.has(key) ? "important" : "");
      } else {
        dest.removeProperty(key);
      }
    }
  }
  return dest;
}
function toggleNativeDragInteractions(element, enable) {
  const userSelect = enable ? "" : "none";
  extendStyles(element.style, {
    "touch-action": enable ? "" : "none",
    "-webkit-user-drag": enable ? "" : "none",
    "-webkit-tap-highlight-color": enable ? "" : "transparent",
    "user-select": userSelect,
    "-ms-user-select": userSelect,
    "-webkit-user-select": userSelect,
    "-moz-user-select": userSelect
  });
}
function toggleVisibility(element, enable, importantProperties2) {
  extendStyles(element.style, {
    position: enable ? "" : "fixed",
    top: enable ? "" : "0",
    opacity: enable ? "" : "0",
    left: enable ? "" : "-999em"
  }, importantProperties2);
}
function combineTransforms(transform, initialTransform) {
  return initialTransform && initialTransform != "none" ? transform + " " + initialTransform : transform;
}
function matchElementSize(target, sourceRect) {
  target.style.width = `${sourceRect.width}px`;
  target.style.height = `${sourceRect.height}px`;
  target.style.transform = getTransform(sourceRect.left, sourceRect.top);
}
function getTransform(x, y) {
  return `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
}
var capturingEventOptions = {
  capture: true
};
var activeCapturingEventOptions$1 = {
  passive: false,
  capture: true
};
var _ResetsLoader = class __ResetsLoader {
  static \u0275fac = function _ResetsLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __ResetsLoader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __ResetsLoader,
    selectors: [["ng-component"]],
    hostAttrs: ["cdk-drag-resets-container", ""],
    decls: 0,
    vars: 0,
    template: function _ResetsLoader_Template(rf, ctx) {
    },
    styles: ["@layer cdk-resets{.cdk-drag-preview{background:none;border:none;padding:0;color:inherit;inset:auto}}.cdk-drag-placeholder *,.cdk-drag-preview *{pointer-events:none !important}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_ResetsLoader, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "cdk-drag-resets-container": ""
      },
      styles: ["@layer cdk-resets{.cdk-drag-preview{background:none;border:none;padding:0;color:inherit;inset:auto}}.cdk-drag-placeholder *,.cdk-drag-preview *{pointer-events:none !important}\n"]
    }]
  }], null, null);
})();
var DragDropRegistry = class _DragDropRegistry {
  _ngZone = inject(NgZone);
  _document = inject(DOCUMENT);
  _styleLoader = inject(_CdkPrivateStyleLoader);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _cleanupDocumentTouchmove;
  _scroll = new Subject();
  _dropInstances = /* @__PURE__ */ new Set();
  _dragInstances = /* @__PURE__ */ new Set();
  _activeDragInstances = signal([], ...ngDevMode ? [{
    debugName: "_activeDragInstances"
  }] : []);
  _globalListeners;
  _draggingPredicate = (item) => item.isDragging();
  _domNodesToDirectives = null;
  pointerMove = new Subject();
  pointerUp = new Subject();
  constructor() {
  }
  registerDropContainer(drop) {
    if (!this._dropInstances.has(drop)) {
      this._dropInstances.add(drop);
    }
  }
  registerDragItem(drag) {
    this._dragInstances.add(drag);
    if (this._dragInstances.size === 1) {
      this._ngZone.runOutsideAngular(() => {
        this._cleanupDocumentTouchmove?.();
        this._cleanupDocumentTouchmove = this._renderer.listen(this._document, "touchmove", this._persistentTouchmoveListener, activeCapturingEventOptions$1);
      });
    }
  }
  removeDropContainer(drop) {
    this._dropInstances.delete(drop);
  }
  removeDragItem(drag) {
    this._dragInstances.delete(drag);
    this.stopDragging(drag);
    if (this._dragInstances.size === 0) {
      this._cleanupDocumentTouchmove?.();
    }
  }
  startDragging(drag, event) {
    if (this._activeDragInstances().indexOf(drag) > -1) {
      return;
    }
    this._styleLoader.load(_ResetsLoader);
    this._activeDragInstances.update((instances) => [...instances, drag]);
    if (this._activeDragInstances().length === 1) {
      const isTouchEvent2 = event.type.startsWith("touch");
      const endEventHandler = (e) => this.pointerUp.next(e);
      const toBind = [["scroll", (e) => this._scroll.next(e), capturingEventOptions], ["selectstart", this._preventDefaultWhileDragging, activeCapturingEventOptions$1]];
      if (isTouchEvent2) {
        toBind.push(["touchend", endEventHandler, capturingEventOptions], ["touchcancel", endEventHandler, capturingEventOptions]);
      } else {
        toBind.push(["mouseup", endEventHandler, capturingEventOptions]);
      }
      if (!isTouchEvent2) {
        toBind.push(["mousemove", (e) => this.pointerMove.next(e), activeCapturingEventOptions$1]);
      }
      this._ngZone.runOutsideAngular(() => {
        this._globalListeners = toBind.map(([name, handler, options]) => this._renderer.listen(this._document, name, handler, options));
      });
    }
  }
  stopDragging(drag) {
    this._activeDragInstances.update((instances) => {
      const index = instances.indexOf(drag);
      if (index > -1) {
        instances.splice(index, 1);
        return [...instances];
      }
      return instances;
    });
    if (this._activeDragInstances().length === 0) {
      this._clearGlobalListeners();
    }
  }
  isDragging(drag) {
    return this._activeDragInstances().indexOf(drag) > -1;
  }
  scrolled(shadowRoot) {
    const streams = [this._scroll];
    if (shadowRoot && shadowRoot !== this._document) {
      streams.push(new Observable((observer) => {
        return this._ngZone.runOutsideAngular(() => {
          const cleanup = this._renderer.listen(shadowRoot, "scroll", (event) => {
            if (this._activeDragInstances().length) {
              observer.next(event);
            }
          }, capturingEventOptions);
          return () => {
            cleanup();
          };
        });
      }));
    }
    return merge(...streams);
  }
  registerDirectiveNode(node, dragRef) {
    this._domNodesToDirectives ??= /* @__PURE__ */ new WeakMap();
    this._domNodesToDirectives.set(node, dragRef);
  }
  removeDirectiveNode(node) {
    this._domNodesToDirectives?.delete(node);
  }
  getDragDirectiveForNode(node) {
    return this._domNodesToDirectives?.get(node) || null;
  }
  ngOnDestroy() {
    this._dragInstances.forEach((instance) => this.removeDragItem(instance));
    this._dropInstances.forEach((instance) => this.removeDropContainer(instance));
    this._domNodesToDirectives = null;
    this._clearGlobalListeners();
    this.pointerMove.complete();
    this.pointerUp.complete();
  }
  _preventDefaultWhileDragging = (event) => {
    if (this._activeDragInstances().length > 0) {
      event.preventDefault();
    }
  };
  _persistentTouchmoveListener = (event) => {
    if (this._activeDragInstances().length > 0) {
      if (this._activeDragInstances().some(this._draggingPredicate)) {
        event.preventDefault();
      }
      this.pointerMove.next(event);
    }
  };
  _clearGlobalListeners() {
    this._globalListeners?.forEach((cleanup) => cleanup());
    this._globalListeners = void 0;
  }
  static \u0275fac = function DragDropRegistry_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DragDropRegistry)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _DragDropRegistry,
    factory: _DragDropRegistry.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragDropRegistry, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function parseCssTimeUnitsToMs(value) {
  const multiplier = value.toLowerCase().indexOf("ms") > -1 ? 1 : 1e3;
  return parseFloat(value) * multiplier;
}
function getTransformTransitionDurationInMs(element) {
  const computedStyle = getComputedStyle(element);
  const transitionedProperties = parseCssPropertyValue(computedStyle, "transition-property");
  const property = transitionedProperties.find((prop) => prop === "transform" || prop === "all");
  if (!property) {
    return 0;
  }
  const propertyIndex = transitionedProperties.indexOf(property);
  const rawDurations = parseCssPropertyValue(computedStyle, "transition-duration");
  const rawDelays = parseCssPropertyValue(computedStyle, "transition-delay");
  return parseCssTimeUnitsToMs(rawDurations[propertyIndex]) + parseCssTimeUnitsToMs(rawDelays[propertyIndex]);
}
function parseCssPropertyValue(computedStyle, name) {
  const value = computedStyle.getPropertyValue(name);
  return value.split(",").map((part) => part.trim());
}
var importantProperties = /* @__PURE__ */ new Set(["position"]);
var PreviewRef = class {
  _document;
  _rootElement;
  _direction;
  _initialDomRect;
  _previewTemplate;
  _previewClass;
  _pickupPositionOnPage;
  _initialTransform;
  _zIndex;
  _renderer;
  _previewEmbeddedView = null;
  _preview;
  get element() {
    return this._preview;
  }
  constructor(_document, _rootElement, _direction, _initialDomRect, _previewTemplate, _previewClass, _pickupPositionOnPage, _initialTransform, _zIndex, _renderer) {
    this._document = _document;
    this._rootElement = _rootElement;
    this._direction = _direction;
    this._initialDomRect = _initialDomRect;
    this._previewTemplate = _previewTemplate;
    this._previewClass = _previewClass;
    this._pickupPositionOnPage = _pickupPositionOnPage;
    this._initialTransform = _initialTransform;
    this._zIndex = _zIndex;
    this._renderer = _renderer;
  }
  attach(parent) {
    this._preview = this._createPreview();
    parent.appendChild(this._preview);
    if (supportsPopover(this._preview)) {
      this._preview["showPopover"]();
    }
  }
  destroy() {
    this._preview.remove();
    this._previewEmbeddedView?.destroy();
    this._preview = this._previewEmbeddedView = null;
  }
  setTransform(value) {
    this._preview.style.transform = value;
  }
  getBoundingClientRect() {
    return this._preview.getBoundingClientRect();
  }
  addClass(className) {
    this._preview.classList.add(className);
  }
  getTransitionDuration() {
    return getTransformTransitionDurationInMs(this._preview);
  }
  addEventListener(name, handler) {
    return this._renderer.listen(this._preview, name, handler);
  }
  _createPreview() {
    const previewConfig = this._previewTemplate;
    const previewClass = this._previewClass;
    const previewTemplate = previewConfig ? previewConfig.template : null;
    let preview;
    if (previewTemplate && previewConfig) {
      const rootRect = previewConfig.matchSize ? this._initialDomRect : null;
      const viewRef = previewConfig.viewContainer.createEmbeddedView(previewTemplate, previewConfig.context);
      viewRef.detectChanges();
      preview = getRootNode(viewRef, this._document);
      this._previewEmbeddedView = viewRef;
      if (previewConfig.matchSize) {
        matchElementSize(preview, rootRect);
      } else {
        preview.style.transform = getTransform(this._pickupPositionOnPage.x, this._pickupPositionOnPage.y);
      }
    } else {
      preview = deepCloneNode(this._rootElement);
      matchElementSize(preview, this._initialDomRect);
      if (this._initialTransform) {
        preview.style.transform = this._initialTransform;
      }
    }
    extendStyles(preview.style, {
      "pointer-events": "none",
      "margin": supportsPopover(preview) ? "0 auto 0 0" : "0",
      "position": "fixed",
      "top": "0",
      "left": "0",
      "z-index": this._zIndex + ""
    }, importantProperties);
    toggleNativeDragInteractions(preview, false);
    preview.classList.add("cdk-drag-preview");
    preview.setAttribute("popover", "manual");
    preview.setAttribute("dir", this._direction);
    if (previewClass) {
      if (Array.isArray(previewClass)) {
        previewClass.forEach((className) => preview.classList.add(className));
      } else {
        preview.classList.add(previewClass);
      }
    }
    return preview;
  }
};
function supportsPopover(element) {
  return "showPopover" in element;
}
var passiveEventListenerOptions = {
  passive: true
};
var activeEventListenerOptions = {
  passive: false
};
var activeCapturingEventOptions = {
  passive: false,
  capture: true
};
var MOUSE_EVENT_IGNORE_TIME = 800;
var PLACEHOLDER_CLASS = "cdk-drag-placeholder";
var dragImportantProperties = /* @__PURE__ */ new Set(["position"]);
function createDragRef(injector, element, config = {
  dragStartThreshold: 5,
  pointerDirectionChangeThreshold: 5
}) {
  const renderer = injector.get(Renderer2, null, {
    optional: true
  }) || injector.get(RendererFactory2).createRenderer(null, null);
  return new DragRef(element, config, injector.get(DOCUMENT), injector.get(NgZone), injector.get(ViewportRuler), injector.get(DragDropRegistry), renderer);
}
var DragRef = class {
  _config;
  _document;
  _ngZone;
  _viewportRuler;
  _dragDropRegistry;
  _renderer;
  _rootElementCleanups;
  _cleanupShadowRootSelectStart;
  _preview = null;
  _previewContainer;
  _placeholderRef = null;
  _placeholder;
  _pickupPositionInElement;
  _pickupPositionOnPage;
  _marker;
  _anchor = null;
  _passiveTransform = {
    x: 0,
    y: 0
  };
  _activeTransform = {
    x: 0,
    y: 0
  };
  _initialTransform;
  _hasStartedDragging = signal(false, ...ngDevMode ? [{
    debugName: "_hasStartedDragging"
  }] : []);
  _hasMoved = false;
  _initialContainer;
  _initialIndex;
  _parentPositions;
  _moveEvents = new Subject();
  _pointerDirectionDelta;
  _pointerPositionAtLastDirectionChange;
  _lastKnownPointerPosition;
  _rootElement;
  _ownerSVGElement = null;
  _rootElementTapHighlight;
  _pointerMoveSubscription = Subscription.EMPTY;
  _pointerUpSubscription = Subscription.EMPTY;
  _scrollSubscription = Subscription.EMPTY;
  _resizeSubscription = Subscription.EMPTY;
  _lastTouchEventTime;
  _dragStartTime;
  _boundaryElement = null;
  _nativeInteractionsEnabled = true;
  _initialDomRect;
  _previewRect;
  _boundaryRect;
  _previewTemplate;
  _placeholderTemplate;
  _handles = [];
  _disabledHandles = /* @__PURE__ */ new Set();
  _dropContainer;
  _direction = "ltr";
  _parentDragRef = null;
  _cachedShadowRoot;
  lockAxis = null;
  dragStartDelay = 0;
  previewClass;
  scale = 1;
  get disabled() {
    return this._disabled || !!(this._dropContainer && this._dropContainer.disabled);
  }
  set disabled(value) {
    if (value !== this._disabled) {
      this._disabled = value;
      this._toggleNativeDragInteractions();
      this._handles.forEach((handle) => toggleNativeDragInteractions(handle, value));
    }
  }
  _disabled = false;
  beforeStarted = new Subject();
  started = new Subject();
  released = new Subject();
  ended = new Subject();
  entered = new Subject();
  exited = new Subject();
  dropped = new Subject();
  moved = this._moveEvents;
  data;
  constrainPosition;
  constructor(element, _config, _document, _ngZone, _viewportRuler, _dragDropRegistry, _renderer) {
    this._config = _config;
    this._document = _document;
    this._ngZone = _ngZone;
    this._viewportRuler = _viewportRuler;
    this._dragDropRegistry = _dragDropRegistry;
    this._renderer = _renderer;
    this.withRootElement(element).withParent(_config.parentDragRef || null);
    this._parentPositions = new ParentPositionTracker(_document);
    _dragDropRegistry.registerDragItem(this);
  }
  getPlaceholderElement() {
    return this._placeholder;
  }
  getRootElement() {
    return this._rootElement;
  }
  getVisibleElement() {
    return this.isDragging() ? this.getPlaceholderElement() : this.getRootElement();
  }
  withHandles(handles) {
    this._handles = handles.map((handle) => coerceElement(handle));
    this._handles.forEach((handle) => toggleNativeDragInteractions(handle, this.disabled));
    this._toggleNativeDragInteractions();
    const disabledHandles = /* @__PURE__ */ new Set();
    this._disabledHandles.forEach((handle) => {
      if (this._handles.indexOf(handle) > -1) {
        disabledHandles.add(handle);
      }
    });
    this._disabledHandles = disabledHandles;
    return this;
  }
  withPreviewTemplate(template) {
    this._previewTemplate = template;
    return this;
  }
  withPlaceholderTemplate(template) {
    this._placeholderTemplate = template;
    return this;
  }
  withRootElement(rootElement) {
    const element = coerceElement(rootElement);
    if (element !== this._rootElement) {
      this._removeRootElementListeners();
      const renderer = this._renderer;
      this._rootElementCleanups = this._ngZone.runOutsideAngular(() => [renderer.listen(element, "mousedown", this._pointerDown, activeEventListenerOptions), renderer.listen(element, "touchstart", this._pointerDown, passiveEventListenerOptions), renderer.listen(element, "dragstart", this._nativeDragStart, activeEventListenerOptions)]);
      this._initialTransform = void 0;
      this._rootElement = element;
    }
    if (typeof SVGElement !== "undefined" && this._rootElement instanceof SVGElement) {
      this._ownerSVGElement = this._rootElement.ownerSVGElement;
    }
    return this;
  }
  withBoundaryElement(boundaryElement) {
    this._boundaryElement = boundaryElement ? coerceElement(boundaryElement) : null;
    this._resizeSubscription.unsubscribe();
    if (boundaryElement) {
      this._resizeSubscription = this._viewportRuler.change(10).subscribe(() => this._containInsideBoundaryOnResize());
    }
    return this;
  }
  withParent(parent) {
    this._parentDragRef = parent;
    return this;
  }
  dispose() {
    this._removeRootElementListeners();
    if (this.isDragging()) {
      this._rootElement?.remove();
    }
    this._marker?.remove();
    this._destroyPreview();
    this._destroyPlaceholder();
    this._dragDropRegistry.removeDragItem(this);
    this._removeListeners();
    this.beforeStarted.complete();
    this.started.complete();
    this.released.complete();
    this.ended.complete();
    this.entered.complete();
    this.exited.complete();
    this.dropped.complete();
    this._moveEvents.complete();
    this._handles = [];
    this._disabledHandles.clear();
    this._dropContainer = void 0;
    this._resizeSubscription.unsubscribe();
    this._parentPositions.clear();
    this._boundaryElement = this._rootElement = this._ownerSVGElement = this._placeholderTemplate = this._previewTemplate = this._marker = this._parentDragRef = null;
  }
  isDragging() {
    return this._hasStartedDragging() && this._dragDropRegistry.isDragging(this);
  }
  reset() {
    this._rootElement.style.transform = this._initialTransform || "";
    this._activeTransform = {
      x: 0,
      y: 0
    };
    this._passiveTransform = {
      x: 0,
      y: 0
    };
  }
  resetToBoundary() {
    if (this._boundaryElement && this._rootElement && isOverflowingParent(this._boundaryElement.getBoundingClientRect(), this._rootElement.getBoundingClientRect())) {
      const parentRect = this._boundaryElement.getBoundingClientRect();
      const childRect = this._rootElement.getBoundingClientRect();
      let offsetX = 0;
      let offsetY = 0;
      if (childRect.left < parentRect.left) {
        offsetX = parentRect.left - childRect.left;
      } else if (childRect.right > parentRect.right) {
        offsetX = parentRect.right - childRect.right;
      }
      if (childRect.top < parentRect.top) {
        offsetY = parentRect.top - childRect.top;
      } else if (childRect.bottom > parentRect.bottom) {
        offsetY = parentRect.bottom - childRect.bottom;
      }
      const currentLeft = this._activeTransform.x;
      const currentTop = this._activeTransform.y;
      let x = currentLeft + offsetX, y = currentTop + offsetY;
      this._rootElement.style.transform = getTransform(x, y);
      this._activeTransform = {
        x,
        y
      };
      this._passiveTransform = {
        x,
        y
      };
    }
  }
  disableHandle(handle) {
    if (!this._disabledHandles.has(handle) && this._handles.indexOf(handle) > -1) {
      this._disabledHandles.add(handle);
      toggleNativeDragInteractions(handle, true);
    }
  }
  enableHandle(handle) {
    if (this._disabledHandles.has(handle)) {
      this._disabledHandles.delete(handle);
      toggleNativeDragInteractions(handle, this.disabled);
    }
  }
  withDirection(direction) {
    this._direction = direction;
    return this;
  }
  _withDropContainer(container) {
    this._dropContainer = container;
  }
  getFreeDragPosition() {
    const position = this.isDragging() ? this._activeTransform : this._passiveTransform;
    return {
      x: position.x,
      y: position.y
    };
  }
  setFreeDragPosition(value) {
    this._activeTransform = {
      x: 0,
      y: 0
    };
    this._passiveTransform.x = value.x;
    this._passiveTransform.y = value.y;
    if (!this._dropContainer) {
      this._applyRootElementTransform(value.x, value.y);
    }
    return this;
  }
  withPreviewContainer(value) {
    this._previewContainer = value;
    return this;
  }
  _sortFromLastPointerPosition() {
    const position = this._lastKnownPointerPosition;
    if (position && this._dropContainer) {
      this._updateActiveDropContainer(this._getConstrainedPointerPosition(position), position);
    }
  }
  _removeListeners() {
    this._pointerMoveSubscription.unsubscribe();
    this._pointerUpSubscription.unsubscribe();
    this._scrollSubscription.unsubscribe();
    this._cleanupShadowRootSelectStart?.();
    this._cleanupShadowRootSelectStart = void 0;
  }
  _destroyPreview() {
    this._preview?.destroy();
    this._preview = null;
  }
  _destroyPlaceholder() {
    this._anchor?.remove();
    this._placeholder?.remove();
    this._placeholderRef?.destroy();
    this._placeholder = this._anchor = this._placeholderRef = null;
  }
  _pointerDown = (event) => {
    this.beforeStarted.next();
    if (this._handles.length) {
      const targetHandle = this._getTargetHandle(event);
      if (targetHandle && !this._disabledHandles.has(targetHandle) && !this.disabled) {
        this._initializeDragSequence(targetHandle, event);
      }
    } else if (!this.disabled) {
      this._initializeDragSequence(this._rootElement, event);
    }
  };
  _pointerMove = (event) => {
    const pointerPosition = this._getPointerPositionOnPage(event);
    if (!this._hasStartedDragging()) {
      const distanceX = Math.abs(pointerPosition.x - this._pickupPositionOnPage.x);
      const distanceY = Math.abs(pointerPosition.y - this._pickupPositionOnPage.y);
      const isOverThreshold = distanceX + distanceY >= this._config.dragStartThreshold;
      if (isOverThreshold) {
        const isDelayElapsed = Date.now() >= this._dragStartTime + this._getDragStartDelay(event);
        const container = this._dropContainer;
        if (!isDelayElapsed) {
          this._endDragSequence(event);
          return;
        }
        if (!container || !container.isDragging() && !container.isReceiving()) {
          if (event.cancelable) {
            event.preventDefault();
          }
          this._hasStartedDragging.set(true);
          this._ngZone.run(() => this._startDragSequence(event));
        }
      }
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    const constrainedPointerPosition = this._getConstrainedPointerPosition(pointerPosition);
    this._hasMoved = true;
    this._lastKnownPointerPosition = pointerPosition;
    this._updatePointerDirectionDelta(constrainedPointerPosition);
    if (this._dropContainer) {
      this._updateActiveDropContainer(constrainedPointerPosition, pointerPosition);
    } else {
      const offset = this.constrainPosition ? this._initialDomRect : this._pickupPositionOnPage;
      const activeTransform = this._activeTransform;
      activeTransform.x = constrainedPointerPosition.x - offset.x + this._passiveTransform.x;
      activeTransform.y = constrainedPointerPosition.y - offset.y + this._passiveTransform.y;
      this._applyRootElementTransform(activeTransform.x, activeTransform.y);
    }
    if (this._moveEvents.observers.length) {
      this._ngZone.run(() => {
        this._moveEvents.next({
          source: this,
          pointerPosition: constrainedPointerPosition,
          event,
          distance: this._getDragDistance(constrainedPointerPosition),
          delta: this._pointerDirectionDelta
        });
      });
    }
  };
  _pointerUp = (event) => {
    this._endDragSequence(event);
  };
  _endDragSequence(event) {
    if (!this._dragDropRegistry.isDragging(this)) {
      return;
    }
    this._removeListeners();
    this._dragDropRegistry.stopDragging(this);
    this._toggleNativeDragInteractions();
    if (this._handles) {
      this._rootElement.style.webkitTapHighlightColor = this._rootElementTapHighlight;
    }
    if (!this._hasStartedDragging()) {
      return;
    }
    this.released.next({
      source: this,
      event
    });
    if (this._dropContainer) {
      this._dropContainer._stopScrolling();
      this._animatePreviewToPlaceholder().then(() => {
        this._cleanupDragArtifacts(event);
        this._cleanupCachedDimensions();
        this._dragDropRegistry.stopDragging(this);
      });
    } else {
      this._passiveTransform.x = this._activeTransform.x;
      const pointerPosition = this._getPointerPositionOnPage(event);
      this._passiveTransform.y = this._activeTransform.y;
      this._ngZone.run(() => {
        this.ended.next({
          source: this,
          distance: this._getDragDistance(pointerPosition),
          dropPoint: pointerPosition,
          event
        });
      });
      this._cleanupCachedDimensions();
      this._dragDropRegistry.stopDragging(this);
    }
  }
  _startDragSequence(event) {
    if (isTouchEvent(event)) {
      this._lastTouchEventTime = Date.now();
    }
    this._toggleNativeDragInteractions();
    const shadowRoot = this._getShadowRoot();
    const dropContainer = this._dropContainer;
    if (shadowRoot) {
      this._ngZone.runOutsideAngular(() => {
        this._cleanupShadowRootSelectStart = this._renderer.listen(shadowRoot, "selectstart", shadowDomSelectStart, activeCapturingEventOptions);
      });
    }
    if (dropContainer) {
      const element = this._rootElement;
      const parent = element.parentNode;
      const placeholder = this._placeholder = this._createPlaceholderElement();
      const marker = this._marker = this._marker || this._document.createComment(typeof ngDevMode === "undefined" || ngDevMode ? "cdk-drag-marker" : "");
      parent.insertBefore(marker, element);
      this._initialTransform = element.style.transform || "";
      this._preview = new PreviewRef(this._document, this._rootElement, this._direction, this._initialDomRect, this._previewTemplate || null, this.previewClass || null, this._pickupPositionOnPage, this._initialTransform, this._config.zIndex || 1e3, this._renderer);
      this._preview.attach(this._getPreviewInsertionPoint(parent, shadowRoot));
      toggleVisibility(element, false, dragImportantProperties);
      this._document.body.appendChild(parent.replaceChild(placeholder, element));
      this.started.next({
        source: this,
        event
      });
      dropContainer.start();
      this._initialContainer = dropContainer;
      this._initialIndex = dropContainer.getItemIndex(this);
    } else {
      this.started.next({
        source: this,
        event
      });
      this._initialContainer = this._initialIndex = void 0;
    }
    this._parentPositions.cache(dropContainer ? dropContainer.getScrollableParents() : []);
  }
  _initializeDragSequence(referenceElement, event) {
    if (this._parentDragRef) {
      event.stopPropagation();
    }
    const isDragging = this.isDragging();
    const isTouchSequence = isTouchEvent(event);
    const isAuxiliaryMouseButton = !isTouchSequence && event.button !== 0;
    const rootElement = this._rootElement;
    const target = _getEventTarget(event);
    const isSyntheticEvent = !isTouchSequence && this._lastTouchEventTime && this._lastTouchEventTime + MOUSE_EVENT_IGNORE_TIME > Date.now();
    const isFakeEvent = isTouchSequence ? isFakeTouchstartFromScreenReader(event) : isFakeMousedownFromScreenReader(event);
    if (target && target.draggable && event.type === "mousedown") {
      event.preventDefault();
    }
    if (isDragging || isAuxiliaryMouseButton || isSyntheticEvent || isFakeEvent) {
      return;
    }
    if (this._handles.length) {
      const rootStyles = rootElement.style;
      this._rootElementTapHighlight = rootStyles.webkitTapHighlightColor || "";
      rootStyles.webkitTapHighlightColor = "transparent";
    }
    this._hasMoved = false;
    this._hasStartedDragging.set(this._hasMoved);
    this._removeListeners();
    this._initialDomRect = this._rootElement.getBoundingClientRect();
    this._pointerMoveSubscription = this._dragDropRegistry.pointerMove.subscribe(this._pointerMove);
    this._pointerUpSubscription = this._dragDropRegistry.pointerUp.subscribe(this._pointerUp);
    this._scrollSubscription = this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe((scrollEvent) => this._updateOnScroll(scrollEvent));
    if (this._boundaryElement) {
      this._boundaryRect = getMutableClientRect(this._boundaryElement);
    }
    const previewTemplate = this._previewTemplate;
    this._pickupPositionInElement = previewTemplate && previewTemplate.template && !previewTemplate.matchSize ? {
      x: 0,
      y: 0
    } : this._getPointerPositionInElement(this._initialDomRect, referenceElement, event);
    const pointerPosition = this._pickupPositionOnPage = this._lastKnownPointerPosition = this._getPointerPositionOnPage(event);
    this._pointerDirectionDelta = {
      x: 0,
      y: 0
    };
    this._pointerPositionAtLastDirectionChange = {
      x: pointerPosition.x,
      y: pointerPosition.y
    };
    this._dragStartTime = Date.now();
    this._dragDropRegistry.startDragging(this, event);
  }
  _cleanupDragArtifacts(event) {
    toggleVisibility(this._rootElement, true, dragImportantProperties);
    this._marker.parentNode.replaceChild(this._rootElement, this._marker);
    this._destroyPreview();
    this._destroyPlaceholder();
    this._initialDomRect = this._boundaryRect = this._previewRect = this._initialTransform = void 0;
    this._ngZone.run(() => {
      const container = this._dropContainer;
      const currentIndex = container.getItemIndex(this);
      const pointerPosition = this._getPointerPositionOnPage(event);
      const distance = this._getDragDistance(pointerPosition);
      const isPointerOverContainer = container._isOverContainer(pointerPosition.x, pointerPosition.y);
      this.ended.next({
        source: this,
        distance,
        dropPoint: pointerPosition,
        event
      });
      this.dropped.next({
        item: this,
        currentIndex,
        previousIndex: this._initialIndex,
        container,
        previousContainer: this._initialContainer,
        isPointerOverContainer,
        distance,
        dropPoint: pointerPosition,
        event
      });
      container.drop(this, currentIndex, this._initialIndex, this._initialContainer, isPointerOverContainer, distance, pointerPosition, event);
      this._dropContainer = this._initialContainer;
    });
  }
  _updateActiveDropContainer({
    x,
    y
  }, {
    x: rawX,
    y: rawY
  }) {
    let newContainer = this._initialContainer._getSiblingContainerFromPosition(this, x, y);
    if (!newContainer && this._dropContainer !== this._initialContainer && this._initialContainer._isOverContainer(x, y)) {
      newContainer = this._initialContainer;
    }
    if (newContainer && newContainer !== this._dropContainer) {
      this._ngZone.run(() => {
        const exitIndex = this._dropContainer.getItemIndex(this);
        const nextItemElement = this._dropContainer.getItemAtIndex(exitIndex + 1)?.getVisibleElement() || null;
        this.exited.next({
          item: this,
          container: this._dropContainer
        });
        this._dropContainer.exit(this);
        this._conditionallyInsertAnchor(newContainer, this._dropContainer, nextItemElement);
        this._dropContainer = newContainer;
        this._dropContainer.enter(this, x, y, newContainer === this._initialContainer && newContainer.sortingDisabled ? this._initialIndex : void 0);
        this.entered.next({
          item: this,
          container: newContainer,
          currentIndex: newContainer.getItemIndex(this)
        });
      });
    }
    if (this.isDragging()) {
      this._dropContainer._startScrollingIfNecessary(rawX, rawY);
      this._dropContainer._sortItem(this, x, y, this._pointerDirectionDelta);
      if (this.constrainPosition) {
        this._applyPreviewTransform(x, y);
      } else {
        this._applyPreviewTransform(x - this._pickupPositionInElement.x, y - this._pickupPositionInElement.y);
      }
    }
  }
  _animatePreviewToPlaceholder() {
    if (!this._hasMoved) {
      return Promise.resolve();
    }
    const placeholderRect = this._placeholder.getBoundingClientRect();
    this._preview.addClass("cdk-drag-animating");
    this._applyPreviewTransform(placeholderRect.left, placeholderRect.top);
    const duration = this._preview.getTransitionDuration();
    if (duration === 0) {
      return Promise.resolve();
    }
    return this._ngZone.runOutsideAngular(() => {
      return new Promise((resolve) => {
        const handler = (event) => {
          if (!event || this._preview && _getEventTarget(event) === this._preview.element && event.propertyName === "transform") {
            cleanupListener();
            resolve();
            clearTimeout(timeout);
          }
        };
        const timeout = setTimeout(handler, duration * 1.5);
        const cleanupListener = this._preview.addEventListener("transitionend", handler);
      });
    });
  }
  _createPlaceholderElement() {
    const placeholderConfig = this._placeholderTemplate;
    const placeholderTemplate = placeholderConfig ? placeholderConfig.template : null;
    let placeholder;
    if (placeholderTemplate) {
      this._placeholderRef = placeholderConfig.viewContainer.createEmbeddedView(placeholderTemplate, placeholderConfig.context);
      this._placeholderRef.detectChanges();
      placeholder = getRootNode(this._placeholderRef, this._document);
    } else {
      placeholder = deepCloneNode(this._rootElement);
    }
    placeholder.style.pointerEvents = "none";
    placeholder.classList.add(PLACEHOLDER_CLASS);
    return placeholder;
  }
  _getPointerPositionInElement(elementRect, referenceElement, event) {
    const handleElement = referenceElement === this._rootElement ? null : referenceElement;
    const referenceRect = handleElement ? handleElement.getBoundingClientRect() : elementRect;
    const point = isTouchEvent(event) ? event.targetTouches[0] : event;
    const scrollPosition = this._getViewportScrollPosition();
    const x = point.pageX - referenceRect.left - scrollPosition.left;
    const y = point.pageY - referenceRect.top - scrollPosition.top;
    return {
      x: referenceRect.left - elementRect.left + x,
      y: referenceRect.top - elementRect.top + y
    };
  }
  _getPointerPositionOnPage(event) {
    const scrollPosition = this._getViewportScrollPosition();
    const point = isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] || {
      pageX: 0,
      pageY: 0
    } : event;
    const x = point.pageX - scrollPosition.left;
    const y = point.pageY - scrollPosition.top;
    if (this._ownerSVGElement) {
      const svgMatrix = this._ownerSVGElement.getScreenCTM();
      if (svgMatrix) {
        const svgPoint = this._ownerSVGElement.createSVGPoint();
        svgPoint.x = x;
        svgPoint.y = y;
        return svgPoint.matrixTransform(svgMatrix.inverse());
      }
    }
    return {
      x,
      y
    };
  }
  _getConstrainedPointerPosition(point) {
    const dropContainerLock = this._dropContainer ? this._dropContainer.lockAxis : null;
    let {
      x,
      y
    } = this.constrainPosition ? this.constrainPosition(point, this, this._initialDomRect, this._pickupPositionInElement) : point;
    if (this.lockAxis === "x" || dropContainerLock === "x") {
      y = this._pickupPositionOnPage.y - (this.constrainPosition ? this._pickupPositionInElement.y : 0);
    } else if (this.lockAxis === "y" || dropContainerLock === "y") {
      x = this._pickupPositionOnPage.x - (this.constrainPosition ? this._pickupPositionInElement.x : 0);
    }
    if (this._boundaryRect) {
      const {
        x: pickupX,
        y: pickupY
      } = !this.constrainPosition ? this._pickupPositionInElement : {
        x: 0,
        y: 0
      };
      const boundaryRect = this._boundaryRect;
      const {
        width: previewWidth,
        height: previewHeight
      } = this._getPreviewRect();
      const minY = boundaryRect.top + pickupY;
      const maxY = boundaryRect.bottom - (previewHeight - pickupY);
      const minX = boundaryRect.left + pickupX;
      const maxX = boundaryRect.right - (previewWidth - pickupX);
      x = clamp$1(x, minX, maxX);
      y = clamp$1(y, minY, maxY);
    }
    return {
      x,
      y
    };
  }
  _updatePointerDirectionDelta(pointerPositionOnPage) {
    const {
      x,
      y
    } = pointerPositionOnPage;
    const delta = this._pointerDirectionDelta;
    const positionSinceLastChange = this._pointerPositionAtLastDirectionChange;
    const changeX = Math.abs(x - positionSinceLastChange.x);
    const changeY = Math.abs(y - positionSinceLastChange.y);
    if (changeX > this._config.pointerDirectionChangeThreshold) {
      delta.x = x > positionSinceLastChange.x ? 1 : -1;
      positionSinceLastChange.x = x;
    }
    if (changeY > this._config.pointerDirectionChangeThreshold) {
      delta.y = y > positionSinceLastChange.y ? 1 : -1;
      positionSinceLastChange.y = y;
    }
    return delta;
  }
  _toggleNativeDragInteractions() {
    if (!this._rootElement || !this._handles) {
      return;
    }
    const shouldEnable = this._handles.length > 0 || !this.isDragging();
    if (shouldEnable !== this._nativeInteractionsEnabled) {
      this._nativeInteractionsEnabled = shouldEnable;
      toggleNativeDragInteractions(this._rootElement, shouldEnable);
    }
  }
  _removeRootElementListeners() {
    this._rootElementCleanups?.forEach((cleanup) => cleanup());
    this._rootElementCleanups = void 0;
  }
  _applyRootElementTransform(x, y) {
    const scale = 1 / this.scale;
    const transform = getTransform(x * scale, y * scale);
    const styles = this._rootElement.style;
    if (this._initialTransform == null) {
      this._initialTransform = styles.transform && styles.transform != "none" ? styles.transform : "";
    }
    styles.transform = combineTransforms(transform, this._initialTransform);
  }
  _applyPreviewTransform(x, y) {
    const initialTransform = this._previewTemplate?.template ? void 0 : this._initialTransform;
    const transform = getTransform(x, y);
    this._preview.setTransform(combineTransforms(transform, initialTransform));
  }
  _getDragDistance(currentPosition) {
    const pickupPosition = this._pickupPositionOnPage;
    if (pickupPosition) {
      return {
        x: currentPosition.x - pickupPosition.x,
        y: currentPosition.y - pickupPosition.y
      };
    }
    return {
      x: 0,
      y: 0
    };
  }
  _cleanupCachedDimensions() {
    this._boundaryRect = this._previewRect = void 0;
    this._parentPositions.clear();
  }
  _containInsideBoundaryOnResize() {
    let {
      x,
      y
    } = this._passiveTransform;
    if (x === 0 && y === 0 || this.isDragging() || !this._boundaryElement) {
      return;
    }
    const elementRect = this._rootElement.getBoundingClientRect();
    const boundaryRect = this._boundaryElement.getBoundingClientRect();
    if (boundaryRect.width === 0 && boundaryRect.height === 0 || elementRect.width === 0 && elementRect.height === 0) {
      return;
    }
    const leftOverflow = boundaryRect.left - elementRect.left;
    const rightOverflow = elementRect.right - boundaryRect.right;
    const topOverflow = boundaryRect.top - elementRect.top;
    const bottomOverflow = elementRect.bottom - boundaryRect.bottom;
    if (boundaryRect.width > elementRect.width) {
      if (leftOverflow > 0) {
        x += leftOverflow;
      }
      if (rightOverflow > 0) {
        x -= rightOverflow;
      }
    } else {
      x = 0;
    }
    if (boundaryRect.height > elementRect.height) {
      if (topOverflow > 0) {
        y += topOverflow;
      }
      if (bottomOverflow > 0) {
        y -= bottomOverflow;
      }
    } else {
      y = 0;
    }
    if (x !== this._passiveTransform.x || y !== this._passiveTransform.y) {
      this.setFreeDragPosition({
        y,
        x
      });
    }
  }
  _getDragStartDelay(event) {
    const value = this.dragStartDelay;
    if (typeof value === "number") {
      return value;
    } else if (isTouchEvent(event)) {
      return value.touch;
    }
    return value ? value.mouse : 0;
  }
  _updateOnScroll(event) {
    const scrollDifference = this._parentPositions.handleScroll(event);
    if (scrollDifference) {
      const target = _getEventTarget(event);
      if (this._boundaryRect && target !== this._boundaryElement && target.contains(this._boundaryElement)) {
        adjustDomRect(this._boundaryRect, scrollDifference.top, scrollDifference.left);
      }
      this._pickupPositionOnPage.x += scrollDifference.left;
      this._pickupPositionOnPage.y += scrollDifference.top;
      if (!this._dropContainer) {
        this._activeTransform.x -= scrollDifference.left;
        this._activeTransform.y -= scrollDifference.top;
        this._applyRootElementTransform(this._activeTransform.x, this._activeTransform.y);
      }
    }
  }
  _getViewportScrollPosition() {
    return this._parentPositions.positions.get(this._document)?.scrollPosition || this._parentPositions.getViewportScrollPosition();
  }
  _getShadowRoot() {
    if (this._cachedShadowRoot === void 0) {
      this._cachedShadowRoot = _getShadowRoot(this._rootElement);
    }
    return this._cachedShadowRoot;
  }
  _getPreviewInsertionPoint(initialParent, shadowRoot) {
    const previewContainer = this._previewContainer || "global";
    if (previewContainer === "parent") {
      return initialParent;
    }
    if (previewContainer === "global") {
      const documentRef = this._document;
      return shadowRoot || documentRef.fullscreenElement || documentRef.webkitFullscreenElement || documentRef.mozFullScreenElement || documentRef.msFullscreenElement || documentRef.body;
    }
    return coerceElement(previewContainer);
  }
  _getPreviewRect() {
    if (!this._previewRect || !this._previewRect.width && !this._previewRect.height) {
      this._previewRect = this._preview ? this._preview.getBoundingClientRect() : this._initialDomRect;
    }
    return this._previewRect;
  }
  _nativeDragStart = (event) => {
    if (this._handles.length) {
      const targetHandle = this._getTargetHandle(event);
      if (targetHandle && !this._disabledHandles.has(targetHandle) && !this.disabled) {
        event.preventDefault();
      }
    } else if (!this.disabled) {
      event.preventDefault();
    }
  };
  _getTargetHandle(event) {
    return this._handles.find((handle) => {
      return event.target && (event.target === handle || handle.contains(event.target));
    });
  }
  _conditionallyInsertAnchor(newContainer, exitContainer, nextItemElement) {
    if (newContainer === this._initialContainer) {
      this._anchor?.remove();
      this._anchor = null;
    } else if (exitContainer === this._initialContainer && exitContainer.hasAnchor) {
      const anchor = this._anchor ??= deepCloneNode(this._placeholder);
      anchor.classList.remove(PLACEHOLDER_CLASS);
      anchor.classList.add("cdk-drag-anchor");
      anchor.style.transform = "";
      if (nextItemElement) {
        nextItemElement.before(anchor);
      } else {
        coerceElement(exitContainer.element).appendChild(anchor);
      }
    }
  }
};
function clamp$1(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function isTouchEvent(event) {
  return event.type[0] === "t";
}
function shadowDomSelectStart(event) {
  event.preventDefault();
}
function moveItemInArray(array, fromIndex, toIndex) {
  const from = clamp(fromIndex, array.length - 1);
  const to = clamp(toIndex, array.length - 1);
  if (from === to) {
    return;
  }
  const target = array[from];
  const delta = to < from ? -1 : 1;
  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }
  array[to] = target;
}
function clamp(value, max) {
  return Math.max(0, Math.min(max, value));
}
var SingleAxisSortStrategy = class {
  _dragDropRegistry;
  _element;
  _sortPredicate;
  _itemPositions = [];
  _activeDraggables;
  orientation = "vertical";
  direction = "ltr";
  constructor(_dragDropRegistry) {
    this._dragDropRegistry = _dragDropRegistry;
  }
  _previousSwap = {
    drag: null,
    delta: 0,
    overlaps: false
  };
  start(items) {
    this.withItems(items);
  }
  sort(item, pointerX, pointerY, pointerDelta) {
    const siblings = this._itemPositions;
    const newIndex = this._getItemIndexFromPointerPosition(item, pointerX, pointerY, pointerDelta);
    if (newIndex === -1 && siblings.length > 0) {
      return null;
    }
    const isHorizontal = this.orientation === "horizontal";
    const currentIndex = siblings.findIndex((currentItem) => currentItem.drag === item);
    const siblingAtNewPosition = siblings[newIndex];
    const currentPosition = siblings[currentIndex].clientRect;
    const newPosition = siblingAtNewPosition.clientRect;
    const delta = currentIndex > newIndex ? 1 : -1;
    const itemOffset = this._getItemOffsetPx(currentPosition, newPosition, delta);
    const siblingOffset = this._getSiblingOffsetPx(currentIndex, siblings, delta);
    const oldOrder = siblings.slice();
    moveItemInArray(siblings, currentIndex, newIndex);
    siblings.forEach((sibling, index) => {
      if (oldOrder[index] === sibling) {
        return;
      }
      const isDraggedItem = sibling.drag === item;
      const offset = isDraggedItem ? itemOffset : siblingOffset;
      const elementToOffset = isDraggedItem ? item.getPlaceholderElement() : sibling.drag.getRootElement();
      sibling.offset += offset;
      const transformAmount = Math.round(sibling.offset * (1 / sibling.drag.scale));
      if (isHorizontal) {
        elementToOffset.style.transform = combineTransforms(`translate3d(${transformAmount}px, 0, 0)`, sibling.initialTransform);
        adjustDomRect(sibling.clientRect, 0, offset);
      } else {
        elementToOffset.style.transform = combineTransforms(`translate3d(0, ${transformAmount}px, 0)`, sibling.initialTransform);
        adjustDomRect(sibling.clientRect, offset, 0);
      }
    });
    this._previousSwap.overlaps = isInsideClientRect(newPosition, pointerX, pointerY);
    this._previousSwap.drag = siblingAtNewPosition.drag;
    this._previousSwap.delta = isHorizontal ? pointerDelta.x : pointerDelta.y;
    return {
      previousIndex: currentIndex,
      currentIndex: newIndex
    };
  }
  enter(item, pointerX, pointerY, index) {
    const activeDraggables = this._activeDraggables;
    const currentIndex = activeDraggables.indexOf(item);
    const placeholder = item.getPlaceholderElement();
    if (currentIndex > -1) {
      activeDraggables.splice(currentIndex, 1);
    }
    const newIndex = index == null || index < 0 ? this._getItemIndexFromPointerPosition(item, pointerX, pointerY) : index;
    let newPositionReference = activeDraggables[newIndex];
    if (newPositionReference === item) {
      newPositionReference = activeDraggables[newIndex + 1];
    }
    if (!newPositionReference && (newIndex == null || newIndex === -1 || newIndex < activeDraggables.length - 1) && this._shouldEnterAsFirstChild(pointerX, pointerY)) {
      newPositionReference = activeDraggables[0];
    }
    if (newPositionReference && !this._dragDropRegistry.isDragging(newPositionReference)) {
      const element = newPositionReference.getRootElement();
      element.parentElement.insertBefore(placeholder, element);
      activeDraggables.splice(newIndex, 0, item);
    } else {
      this._element.appendChild(placeholder);
      activeDraggables.push(item);
    }
    placeholder.style.transform = "";
    this._cacheItemPositions();
  }
  withItems(items) {
    this._activeDraggables = items.slice();
    this._cacheItemPositions();
  }
  withSortPredicate(predicate) {
    this._sortPredicate = predicate;
  }
  reset() {
    this._activeDraggables?.forEach((item) => {
      const rootElement = item.getRootElement();
      if (rootElement) {
        const initialTransform = this._itemPositions.find((p) => p.drag === item)?.initialTransform;
        rootElement.style.transform = initialTransform || "";
      }
    });
    this._itemPositions = [];
    this._activeDraggables = [];
    this._previousSwap.drag = null;
    this._previousSwap.delta = 0;
    this._previousSwap.overlaps = false;
  }
  getActiveItemsSnapshot() {
    return this._activeDraggables;
  }
  getItemIndex(item) {
    return this._getVisualItemPositions().findIndex((currentItem) => currentItem.drag === item);
  }
  getItemAtIndex(index) {
    return this._getVisualItemPositions()[index]?.drag || null;
  }
  updateOnScroll(topDifference, leftDifference) {
    this._itemPositions.forEach(({
      clientRect
    }) => {
      adjustDomRect(clientRect, topDifference, leftDifference);
    });
    this._itemPositions.forEach(({
      drag
    }) => {
      if (this._dragDropRegistry.isDragging(drag)) {
        drag._sortFromLastPointerPosition();
      }
    });
  }
  withElementContainer(container) {
    this._element = container;
  }
  _cacheItemPositions() {
    const isHorizontal = this.orientation === "horizontal";
    this._itemPositions = this._activeDraggables.map((drag) => {
      const elementToMeasure = drag.getVisibleElement();
      return {
        drag,
        offset: 0,
        initialTransform: elementToMeasure.style.transform || "",
        clientRect: getMutableClientRect(elementToMeasure)
      };
    }).sort((a, b) => {
      return isHorizontal ? a.clientRect.left - b.clientRect.left : a.clientRect.top - b.clientRect.top;
    });
  }
  _getVisualItemPositions() {
    return this.orientation === "horizontal" && this.direction === "rtl" ? this._itemPositions.slice().reverse() : this._itemPositions;
  }
  _getItemOffsetPx(currentPosition, newPosition, delta) {
    const isHorizontal = this.orientation === "horizontal";
    let itemOffset = isHorizontal ? newPosition.left - currentPosition.left : newPosition.top - currentPosition.top;
    if (delta === -1) {
      itemOffset += isHorizontal ? newPosition.width - currentPosition.width : newPosition.height - currentPosition.height;
    }
    return itemOffset;
  }
  _getSiblingOffsetPx(currentIndex, siblings, delta) {
    const isHorizontal = this.orientation === "horizontal";
    const currentPosition = siblings[currentIndex].clientRect;
    const immediateSibling = siblings[currentIndex + delta * -1];
    let siblingOffset = currentPosition[isHorizontal ? "width" : "height"] * delta;
    if (immediateSibling) {
      const start = isHorizontal ? "left" : "top";
      const end = isHorizontal ? "right" : "bottom";
      if (delta === -1) {
        siblingOffset -= immediateSibling.clientRect[start] - currentPosition[end];
      } else {
        siblingOffset += currentPosition[start] - immediateSibling.clientRect[end];
      }
    }
    return siblingOffset;
  }
  _shouldEnterAsFirstChild(pointerX, pointerY) {
    if (!this._activeDraggables.length) {
      return false;
    }
    const itemPositions = this._itemPositions;
    const isHorizontal = this.orientation === "horizontal";
    const reversed = itemPositions[0].drag !== this._activeDraggables[0];
    if (reversed) {
      const lastItemRect = itemPositions[itemPositions.length - 1].clientRect;
      return isHorizontal ? pointerX >= lastItemRect.right : pointerY >= lastItemRect.bottom;
    } else {
      const firstItemRect = itemPositions[0].clientRect;
      return isHorizontal ? pointerX <= firstItemRect.left : pointerY <= firstItemRect.top;
    }
  }
  _getItemIndexFromPointerPosition(item, pointerX, pointerY, delta) {
    const isHorizontal = this.orientation === "horizontal";
    const index = this._itemPositions.findIndex(({
      drag,
      clientRect
    }) => {
      if (drag === item) {
        return false;
      }
      if (delta) {
        const direction = isHorizontal ? delta.x : delta.y;
        if (drag === this._previousSwap.drag && this._previousSwap.overlaps && direction === this._previousSwap.delta) {
          return false;
        }
      }
      return isHorizontal ? pointerX >= Math.floor(clientRect.left) && pointerX < Math.floor(clientRect.right) : pointerY >= Math.floor(clientRect.top) && pointerY < Math.floor(clientRect.bottom);
    });
    return index === -1 || !this._sortPredicate(index, item) ? -1 : index;
  }
};
var MixedSortStrategy = class {
  _document;
  _dragDropRegistry;
  _element;
  _sortPredicate;
  _rootNode;
  _activeItems;
  _previousSwap = {
    drag: null,
    deltaX: 0,
    deltaY: 0,
    overlaps: false
  };
  _relatedNodes = [];
  constructor(_document, _dragDropRegistry) {
    this._document = _document;
    this._dragDropRegistry = _dragDropRegistry;
  }
  start(items) {
    const childNodes = this._element.childNodes;
    this._relatedNodes = [];
    for (let i = 0; i < childNodes.length; i++) {
      const node = childNodes[i];
      this._relatedNodes.push([node, node.nextSibling]);
    }
    this.withItems(items);
  }
  sort(item, pointerX, pointerY, pointerDelta) {
    const newIndex = this._getItemIndexFromPointerPosition(item, pointerX, pointerY);
    const previousSwap = this._previousSwap;
    if (newIndex === -1 || this._activeItems[newIndex] === item) {
      return null;
    }
    const toSwapWith = this._activeItems[newIndex];
    if (previousSwap.drag === toSwapWith && previousSwap.overlaps && previousSwap.deltaX === pointerDelta.x && previousSwap.deltaY === pointerDelta.y) {
      return null;
    }
    const previousIndex = this.getItemIndex(item);
    const current = item.getPlaceholderElement();
    const overlapElement = toSwapWith.getRootElement();
    if (newIndex > previousIndex) {
      overlapElement.after(current);
    } else {
      overlapElement.before(current);
    }
    moveItemInArray(this._activeItems, previousIndex, newIndex);
    const newOverlapElement = this._getRootNode().elementFromPoint(pointerX, pointerY);
    previousSwap.deltaX = pointerDelta.x;
    previousSwap.deltaY = pointerDelta.y;
    previousSwap.drag = toSwapWith;
    previousSwap.overlaps = overlapElement === newOverlapElement || overlapElement.contains(newOverlapElement);
    return {
      previousIndex,
      currentIndex: newIndex
    };
  }
  enter(item, pointerX, pointerY, index) {
    const currentIndex = this._activeItems.indexOf(item);
    if (currentIndex > -1) {
      this._activeItems.splice(currentIndex, 1);
    }
    let enterIndex = index == null || index < 0 ? this._getItemIndexFromPointerPosition(item, pointerX, pointerY) : index;
    if (enterIndex === -1) {
      enterIndex = this._getClosestItemIndexToPointer(item, pointerX, pointerY);
    }
    const targetItem = this._activeItems[enterIndex];
    if (targetItem && !this._dragDropRegistry.isDragging(targetItem)) {
      this._activeItems.splice(enterIndex, 0, item);
      targetItem.getRootElement().before(item.getPlaceholderElement());
    } else {
      this._activeItems.push(item);
      this._element.appendChild(item.getPlaceholderElement());
    }
  }
  withItems(items) {
    this._activeItems = items.slice();
  }
  withSortPredicate(predicate) {
    this._sortPredicate = predicate;
  }
  reset() {
    const root = this._element;
    const previousSwap = this._previousSwap;
    for (let i = this._relatedNodes.length - 1; i > -1; i--) {
      const [node, nextSibling] = this._relatedNodes[i];
      if (node.parentNode === root && node.nextSibling !== nextSibling) {
        if (nextSibling === null) {
          root.appendChild(node);
        } else if (nextSibling.parentNode === root) {
          root.insertBefore(node, nextSibling);
        }
      }
    }
    this._relatedNodes = [];
    this._activeItems = [];
    previousSwap.drag = null;
    previousSwap.deltaX = previousSwap.deltaY = 0;
    previousSwap.overlaps = false;
  }
  getActiveItemsSnapshot() {
    return this._activeItems;
  }
  getItemIndex(item) {
    return this._activeItems.indexOf(item);
  }
  getItemAtIndex(index) {
    return this._activeItems[index] || null;
  }
  updateOnScroll() {
    this._activeItems.forEach((item) => {
      if (this._dragDropRegistry.isDragging(item)) {
        item._sortFromLastPointerPosition();
      }
    });
  }
  withElementContainer(container) {
    if (container !== this._element) {
      this._element = container;
      this._rootNode = void 0;
    }
  }
  _getItemIndexFromPointerPosition(item, pointerX, pointerY) {
    const elementAtPoint = this._getRootNode().elementFromPoint(Math.floor(pointerX), Math.floor(pointerY));
    const index = elementAtPoint ? this._activeItems.findIndex((item2) => {
      const root = item2.getRootElement();
      return elementAtPoint === root || root.contains(elementAtPoint);
    }) : -1;
    return index === -1 || !this._sortPredicate(index, item) ? -1 : index;
  }
  _getRootNode() {
    if (!this._rootNode) {
      this._rootNode = _getShadowRoot(this._element) || this._document;
    }
    return this._rootNode;
  }
  _getClosestItemIndexToPointer(item, pointerX, pointerY) {
    if (this._activeItems.length === 0) {
      return -1;
    }
    if (this._activeItems.length === 1) {
      return 0;
    }
    let minDistance = Infinity;
    let minIndex = -1;
    for (let i = 0; i < this._activeItems.length; i++) {
      const current = this._activeItems[i];
      if (current !== item) {
        const {
          x,
          y
        } = current.getRootElement().getBoundingClientRect();
        const distance = Math.hypot(pointerX - x, pointerY - y);
        if (distance < minDistance) {
          minDistance = distance;
          minIndex = i;
        }
      }
    }
    return minIndex;
  }
};
var DROP_PROXIMITY_THRESHOLD = 0.05;
var SCROLL_PROXIMITY_THRESHOLD = 0.05;
var AutoScrollVerticalDirection;
(function(AutoScrollVerticalDirection2) {
  AutoScrollVerticalDirection2[AutoScrollVerticalDirection2["NONE"] = 0] = "NONE";
  AutoScrollVerticalDirection2[AutoScrollVerticalDirection2["UP"] = 1] = "UP";
  AutoScrollVerticalDirection2[AutoScrollVerticalDirection2["DOWN"] = 2] = "DOWN";
})(AutoScrollVerticalDirection || (AutoScrollVerticalDirection = {}));
var AutoScrollHorizontalDirection;
(function(AutoScrollHorizontalDirection2) {
  AutoScrollHorizontalDirection2[AutoScrollHorizontalDirection2["NONE"] = 0] = "NONE";
  AutoScrollHorizontalDirection2[AutoScrollHorizontalDirection2["LEFT"] = 1] = "LEFT";
  AutoScrollHorizontalDirection2[AutoScrollHorizontalDirection2["RIGHT"] = 2] = "RIGHT";
})(AutoScrollHorizontalDirection || (AutoScrollHorizontalDirection = {}));
function createDropListRef(injector, element) {
  return new DropListRef(element, injector.get(DragDropRegistry), injector.get(DOCUMENT), injector.get(NgZone), injector.get(ViewportRuler));
}
var DropListRef = class {
  _dragDropRegistry;
  _ngZone;
  _viewportRuler;
  element;
  disabled = false;
  sortingDisabled = false;
  lockAxis = null;
  autoScrollDisabled = false;
  autoScrollStep = 2;
  hasAnchor = false;
  enterPredicate = () => true;
  sortPredicate = () => true;
  beforeStarted = new Subject();
  entered = new Subject();
  exited = new Subject();
  dropped = new Subject();
  sorted = new Subject();
  receivingStarted = new Subject();
  receivingStopped = new Subject();
  data;
  _container;
  _isDragging = false;
  _parentPositions;
  _sortStrategy;
  _domRect;
  _draggables = [];
  _siblings = [];
  _activeSiblings = /* @__PURE__ */ new Set();
  _viewportScrollSubscription = Subscription.EMPTY;
  _verticalScrollDirection = AutoScrollVerticalDirection.NONE;
  _horizontalScrollDirection = AutoScrollHorizontalDirection.NONE;
  _scrollNode;
  _stopScrollTimers = new Subject();
  _cachedShadowRoot = null;
  _document;
  _scrollableElements = [];
  _initialScrollSnap;
  _direction = "ltr";
  constructor(element, _dragDropRegistry, _document, _ngZone, _viewportRuler) {
    this._dragDropRegistry = _dragDropRegistry;
    this._ngZone = _ngZone;
    this._viewportRuler = _viewportRuler;
    const coercedElement = this.element = coerceElement(element);
    this._document = _document;
    this.withOrientation("vertical").withElementContainer(coercedElement);
    _dragDropRegistry.registerDropContainer(this);
    this._parentPositions = new ParentPositionTracker(_document);
  }
  dispose() {
    this._stopScrolling();
    this._stopScrollTimers.complete();
    this._viewportScrollSubscription.unsubscribe();
    this.beforeStarted.complete();
    this.entered.complete();
    this.exited.complete();
    this.dropped.complete();
    this.sorted.complete();
    this.receivingStarted.complete();
    this.receivingStopped.complete();
    this._activeSiblings.clear();
    this._scrollNode = null;
    this._parentPositions.clear();
    this._dragDropRegistry.removeDropContainer(this);
  }
  isDragging() {
    return this._isDragging;
  }
  start() {
    this._draggingStarted();
    this._notifyReceivingSiblings();
  }
  enter(item, pointerX, pointerY, index) {
    this._draggingStarted();
    if (index == null && this.sortingDisabled) {
      index = this._draggables.indexOf(item);
    }
    this._sortStrategy.enter(item, pointerX, pointerY, index);
    this._cacheParentPositions();
    this._notifyReceivingSiblings();
    this.entered.next({
      item,
      container: this,
      currentIndex: this.getItemIndex(item)
    });
  }
  exit(item) {
    this._reset();
    this.exited.next({
      item,
      container: this
    });
  }
  drop(item, currentIndex, previousIndex, previousContainer, isPointerOverContainer, distance, dropPoint, event = {}) {
    this._reset();
    this.dropped.next({
      item,
      currentIndex,
      previousIndex,
      container: this,
      previousContainer,
      isPointerOverContainer,
      distance,
      dropPoint,
      event
    });
  }
  withItems(items) {
    const previousItems = this._draggables;
    this._draggables = items;
    items.forEach((item) => item._withDropContainer(this));
    if (this.isDragging()) {
      const draggedItems = previousItems.filter((item) => item.isDragging());
      if (draggedItems.every((item) => items.indexOf(item) === -1)) {
        this._reset();
      } else {
        this._sortStrategy.withItems(this._draggables);
      }
    }
    return this;
  }
  withDirection(direction) {
    this._direction = direction;
    if (this._sortStrategy instanceof SingleAxisSortStrategy) {
      this._sortStrategy.direction = direction;
    }
    return this;
  }
  connectedTo(connectedTo) {
    this._siblings = connectedTo.slice();
    return this;
  }
  withOrientation(orientation) {
    if (orientation === "mixed") {
      this._sortStrategy = new MixedSortStrategy(this._document, this._dragDropRegistry);
    } else {
      const strategy = new SingleAxisSortStrategy(this._dragDropRegistry);
      strategy.direction = this._direction;
      strategy.orientation = orientation;
      this._sortStrategy = strategy;
    }
    this._sortStrategy.withElementContainer(this._container);
    this._sortStrategy.withSortPredicate((index, item) => this.sortPredicate(index, item, this));
    return this;
  }
  withScrollableParents(elements) {
    const element = this._container;
    this._scrollableElements = elements.indexOf(element) === -1 ? [element, ...elements] : elements.slice();
    return this;
  }
  withElementContainer(container) {
    if (container === this._container) {
      return this;
    }
    const element = coerceElement(this.element);
    if ((typeof ngDevMode === "undefined" || ngDevMode) && container !== element && !element.contains(container)) {
      throw new Error("Invalid DOM structure for drop list. Alternate container element must be a descendant of the drop list.");
    }
    const oldContainerIndex = this._scrollableElements.indexOf(this._container);
    const newContainerIndex = this._scrollableElements.indexOf(container);
    if (oldContainerIndex > -1) {
      this._scrollableElements.splice(oldContainerIndex, 1);
    }
    if (newContainerIndex > -1) {
      this._scrollableElements.splice(newContainerIndex, 1);
    }
    if (this._sortStrategy) {
      this._sortStrategy.withElementContainer(container);
    }
    this._cachedShadowRoot = null;
    this._scrollableElements.unshift(container);
    this._container = container;
    return this;
  }
  getScrollableParents() {
    return this._scrollableElements;
  }
  getItemIndex(item) {
    return this._isDragging ? this._sortStrategy.getItemIndex(item) : this._draggables.indexOf(item);
  }
  getItemAtIndex(index) {
    return this._isDragging ? this._sortStrategy.getItemAtIndex(index) : this._draggables[index] || null;
  }
  isReceiving() {
    return this._activeSiblings.size > 0;
  }
  _sortItem(item, pointerX, pointerY, pointerDelta) {
    if (this.sortingDisabled || !this._domRect || !isPointerNearDomRect(this._domRect, DROP_PROXIMITY_THRESHOLD, pointerX, pointerY)) {
      return;
    }
    const result = this._sortStrategy.sort(item, pointerX, pointerY, pointerDelta);
    if (result) {
      this.sorted.next({
        previousIndex: result.previousIndex,
        currentIndex: result.currentIndex,
        container: this,
        item
      });
    }
  }
  _startScrollingIfNecessary(pointerX, pointerY) {
    if (this.autoScrollDisabled) {
      return;
    }
    let scrollNode;
    let verticalScrollDirection = AutoScrollVerticalDirection.NONE;
    let horizontalScrollDirection = AutoScrollHorizontalDirection.NONE;
    this._parentPositions.positions.forEach((position, element) => {
      if (element === this._document || !position.clientRect || scrollNode) {
        return;
      }
      if (isPointerNearDomRect(position.clientRect, DROP_PROXIMITY_THRESHOLD, pointerX, pointerY)) {
        [verticalScrollDirection, horizontalScrollDirection] = getElementScrollDirections(element, position.clientRect, this._direction, pointerX, pointerY);
        if (verticalScrollDirection || horizontalScrollDirection) {
          scrollNode = element;
        }
      }
    });
    if (!verticalScrollDirection && !horizontalScrollDirection) {
      const {
        width,
        height
      } = this._viewportRuler.getViewportSize();
      const domRect = {
        width,
        height,
        top: 0,
        right: width,
        bottom: height,
        left: 0
      };
      verticalScrollDirection = getVerticalScrollDirection(domRect, pointerY);
      horizontalScrollDirection = getHorizontalScrollDirection(domRect, pointerX);
      scrollNode = window;
    }
    if (scrollNode && (verticalScrollDirection !== this._verticalScrollDirection || horizontalScrollDirection !== this._horizontalScrollDirection || scrollNode !== this._scrollNode)) {
      this._verticalScrollDirection = verticalScrollDirection;
      this._horizontalScrollDirection = horizontalScrollDirection;
      this._scrollNode = scrollNode;
      if ((verticalScrollDirection || horizontalScrollDirection) && scrollNode) {
        this._ngZone.runOutsideAngular(this._startScrollInterval);
      } else {
        this._stopScrolling();
      }
    }
  }
  _stopScrolling() {
    this._stopScrollTimers.next();
  }
  _draggingStarted() {
    const styles = this._container.style;
    this.beforeStarted.next();
    this._isDragging = true;
    if ((typeof ngDevMode === "undefined" || ngDevMode) && this._container !== coerceElement(this.element)) {
      for (const drag of this._draggables) {
        if (!drag.isDragging() && drag.getVisibleElement().parentNode !== this._container) {
          throw new Error("Invalid DOM structure for drop list. All items must be placed directly inside of the element container.");
        }
      }
    }
    this._initialScrollSnap = styles.msScrollSnapType || styles.scrollSnapType || "";
    styles.scrollSnapType = styles.msScrollSnapType = "none";
    this._sortStrategy.start(this._draggables);
    this._cacheParentPositions();
    this._viewportScrollSubscription.unsubscribe();
    this._listenToScrollEvents();
  }
  _cacheParentPositions() {
    this._parentPositions.cache(this._scrollableElements);
    this._domRect = this._parentPositions.positions.get(this._container).clientRect;
  }
  _reset() {
    this._isDragging = false;
    const styles = this._container.style;
    styles.scrollSnapType = styles.msScrollSnapType = this._initialScrollSnap;
    this._siblings.forEach((sibling) => sibling._stopReceiving(this));
    this._sortStrategy.reset();
    this._stopScrolling();
    this._viewportScrollSubscription.unsubscribe();
    this._parentPositions.clear();
  }
  _startScrollInterval = () => {
    this._stopScrolling();
    interval(0, animationFrameScheduler).pipe(takeUntil(this._stopScrollTimers)).subscribe(() => {
      const node = this._scrollNode;
      const scrollStep = this.autoScrollStep;
      if (this._verticalScrollDirection === AutoScrollVerticalDirection.UP) {
        node.scrollBy(0, -scrollStep);
      } else if (this._verticalScrollDirection === AutoScrollVerticalDirection.DOWN) {
        node.scrollBy(0, scrollStep);
      }
      if (this._horizontalScrollDirection === AutoScrollHorizontalDirection.LEFT) {
        node.scrollBy(-scrollStep, 0);
      } else if (this._horizontalScrollDirection === AutoScrollHorizontalDirection.RIGHT) {
        node.scrollBy(scrollStep, 0);
      }
    });
  };
  _isOverContainer(x, y) {
    return this._domRect != null && isInsideClientRect(this._domRect, x, y);
  }
  _getSiblingContainerFromPosition(item, x, y) {
    return this._siblings.find((sibling) => sibling._canReceive(item, x, y));
  }
  _canReceive(item, x, y) {
    if (!this._domRect || !isInsideClientRect(this._domRect, x, y) || !this.enterPredicate(item, this)) {
      return false;
    }
    const elementFromPoint = this._getShadowRoot().elementFromPoint(x, y);
    if (!elementFromPoint) {
      return false;
    }
    return elementFromPoint === this._container || this._container.contains(elementFromPoint);
  }
  _startReceiving(sibling, items) {
    const activeSiblings = this._activeSiblings;
    if (!activeSiblings.has(sibling) && items.every((item) => {
      return this.enterPredicate(item, this) || this._draggables.indexOf(item) > -1;
    })) {
      activeSiblings.add(sibling);
      this._cacheParentPositions();
      this._listenToScrollEvents();
      this.receivingStarted.next({
        initiator: sibling,
        receiver: this,
        items
      });
    }
  }
  _stopReceiving(sibling) {
    this._activeSiblings.delete(sibling);
    this._viewportScrollSubscription.unsubscribe();
    this.receivingStopped.next({
      initiator: sibling,
      receiver: this
    });
  }
  _listenToScrollEvents() {
    this._viewportScrollSubscription = this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe((event) => {
      if (this.isDragging()) {
        const scrollDifference = this._parentPositions.handleScroll(event);
        if (scrollDifference) {
          this._sortStrategy.updateOnScroll(scrollDifference.top, scrollDifference.left);
        }
      } else if (this.isReceiving()) {
        this._cacheParentPositions();
      }
    });
  }
  _getShadowRoot() {
    if (!this._cachedShadowRoot) {
      const shadowRoot = _getShadowRoot(this._container);
      this._cachedShadowRoot = shadowRoot || this._document;
    }
    return this._cachedShadowRoot;
  }
  _notifyReceivingSiblings() {
    const draggedItems = this._sortStrategy.getActiveItemsSnapshot().filter((item) => item.isDragging());
    this._siblings.forEach((sibling) => sibling._startReceiving(this, draggedItems));
  }
};
function getVerticalScrollDirection(clientRect, pointerY) {
  const {
    top,
    bottom,
    height
  } = clientRect;
  const yThreshold = height * SCROLL_PROXIMITY_THRESHOLD;
  if (pointerY >= top - yThreshold && pointerY <= top + yThreshold) {
    return AutoScrollVerticalDirection.UP;
  } else if (pointerY >= bottom - yThreshold && pointerY <= bottom + yThreshold) {
    return AutoScrollVerticalDirection.DOWN;
  }
  return AutoScrollVerticalDirection.NONE;
}
function getHorizontalScrollDirection(clientRect, pointerX) {
  const {
    left,
    right,
    width
  } = clientRect;
  const xThreshold = width * SCROLL_PROXIMITY_THRESHOLD;
  if (pointerX >= left - xThreshold && pointerX <= left + xThreshold) {
    return AutoScrollHorizontalDirection.LEFT;
  } else if (pointerX >= right - xThreshold && pointerX <= right + xThreshold) {
    return AutoScrollHorizontalDirection.RIGHT;
  }
  return AutoScrollHorizontalDirection.NONE;
}
function getElementScrollDirections(element, clientRect, direction, pointerX, pointerY) {
  const computedVertical = getVerticalScrollDirection(clientRect, pointerY);
  const computedHorizontal = getHorizontalScrollDirection(clientRect, pointerX);
  let verticalScrollDirection = AutoScrollVerticalDirection.NONE;
  let horizontalScrollDirection = AutoScrollHorizontalDirection.NONE;
  if (computedVertical) {
    const scrollTop = element.scrollTop;
    if (computedVertical === AutoScrollVerticalDirection.UP) {
      if (scrollTop > 0) {
        verticalScrollDirection = AutoScrollVerticalDirection.UP;
      }
    } else if (element.scrollHeight - scrollTop > element.clientHeight) {
      verticalScrollDirection = AutoScrollVerticalDirection.DOWN;
    }
  }
  if (computedHorizontal) {
    const scrollLeft = element.scrollLeft;
    if (direction === "rtl") {
      if (computedHorizontal === AutoScrollHorizontalDirection.RIGHT) {
        if (scrollLeft < 0) {
          horizontalScrollDirection = AutoScrollHorizontalDirection.RIGHT;
        }
      } else if (element.scrollWidth + scrollLeft > element.clientWidth) {
        horizontalScrollDirection = AutoScrollHorizontalDirection.LEFT;
      }
    } else {
      if (computedHorizontal === AutoScrollHorizontalDirection.LEFT) {
        if (scrollLeft > 0) {
          horizontalScrollDirection = AutoScrollHorizontalDirection.LEFT;
        }
      } else if (element.scrollWidth - scrollLeft > element.clientWidth) {
        horizontalScrollDirection = AutoScrollHorizontalDirection.RIGHT;
      }
    }
  }
  return [verticalScrollDirection, horizontalScrollDirection];
}
var DragDrop = class _DragDrop {
  _injector = inject(Injector);
  constructor() {
  }
  createDrag(element, config) {
    return createDragRef(this._injector, element, config);
  }
  createDropList(element) {
    return createDropListRef(this._injector, element);
  }
  static \u0275fac = function DragDrop_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DragDrop)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _DragDrop,
    factory: _DragDrop.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragDrop, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CDK_DRAG_PARENT = new InjectionToken("CDK_DRAG_PARENT");
function assertElementNode(node, name) {
  if (node.nodeType !== 1) {
    throw Error(`${name} must be attached to an element node. Currently attached to "${node.nodeName}".`);
  }
}
var CDK_DRAG_HANDLE = new InjectionToken("CdkDragHandle");
var CdkDragHandle = class _CdkDragHandle {
  element = inject(ElementRef);
  _parentDrag = inject(CDK_DRAG_PARENT, {
    optional: true,
    skipSelf: true
  });
  _dragDropRegistry = inject(DragDropRegistry);
  _stateChanges = new Subject();
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._stateChanges.next(this);
  }
  _disabled = false;
  constructor() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      assertElementNode(this.element.nativeElement, "cdkDragHandle");
    }
    this._parentDrag?._addHandle(this);
  }
  ngAfterViewInit() {
    if (!this._parentDrag) {
      let parent = this.element.nativeElement.parentElement;
      while (parent) {
        const ref = this._dragDropRegistry.getDragDirectiveForNode(parent);
        if (ref) {
          this._parentDrag = ref;
          ref._addHandle(this);
          break;
        }
        parent = parent.parentElement;
      }
    }
  }
  ngOnDestroy() {
    this._parentDrag?._removeHandle(this);
    this._stateChanges.complete();
  }
  static \u0275fac = function CdkDragHandle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDragHandle)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDragHandle,
    selectors: [["", "cdkDragHandle", ""]],
    hostAttrs: [1, "cdk-drag-handle"],
    inputs: {
      disabled: [2, "cdkDragHandleDisabled", "disabled", booleanAttribute]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DRAG_HANDLE,
      useExisting: _CdkDragHandle
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDragHandle, [{
    type: Directive,
    args: [{
      selector: "[cdkDragHandle]",
      host: {
        "class": "cdk-drag-handle"
      },
      providers: [{
        provide: CDK_DRAG_HANDLE,
        useExisting: CdkDragHandle
      }]
    }]
  }], () => [], {
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDragHandleDisabled",
        transform: booleanAttribute
      }]
    }]
  });
})();
var CDK_DRAG_CONFIG = new InjectionToken("CDK_DRAG_CONFIG");
var CDK_DROP_LIST = new InjectionToken("CdkDropList");
var CdkDrag = class _CdkDrag {
  element = inject(ElementRef);
  dropContainer = inject(CDK_DROP_LIST, {
    optional: true,
    skipSelf: true
  });
  _ngZone = inject(NgZone);
  _viewContainerRef = inject(ViewContainerRef);
  _dir = inject(Directionality, {
    optional: true
  });
  _changeDetectorRef = inject(ChangeDetectorRef);
  _selfHandle = inject(CDK_DRAG_HANDLE, {
    optional: true,
    self: true
  });
  _parentDrag = inject(CDK_DRAG_PARENT, {
    optional: true,
    skipSelf: true
  });
  _dragDropRegistry = inject(DragDropRegistry);
  _destroyed = new Subject();
  _handles = new BehaviorSubject([]);
  _previewTemplate = null;
  _placeholderTemplate = null;
  _dragRef;
  data;
  lockAxis = null;
  rootElementSelector;
  boundaryElement;
  dragStartDelay;
  freeDragPosition;
  get disabled() {
    return this._disabled || !!(this.dropContainer && this.dropContainer.disabled);
  }
  set disabled(value) {
    this._disabled = value;
    this._dragRef.disabled = this._disabled;
  }
  _disabled = false;
  constrainPosition;
  previewClass;
  previewContainer;
  scale = 1;
  started = new EventEmitter();
  released = new EventEmitter();
  ended = new EventEmitter();
  entered = new EventEmitter();
  exited = new EventEmitter();
  dropped = new EventEmitter();
  moved = new Observable((observer) => {
    const subscription = this._dragRef.moved.pipe(map((movedEvent) => ({
      source: this,
      pointerPosition: movedEvent.pointerPosition,
      event: movedEvent.event,
      delta: movedEvent.delta,
      distance: movedEvent.distance
    }))).subscribe(observer);
    return () => {
      subscription.unsubscribe();
    };
  });
  _injector = inject(Injector);
  constructor() {
    const dropContainer = this.dropContainer;
    const config = inject(CDK_DRAG_CONFIG, {
      optional: true
    });
    this._dragRef = createDragRef(this._injector, this.element, {
      dragStartThreshold: config && config.dragStartThreshold != null ? config.dragStartThreshold : 5,
      pointerDirectionChangeThreshold: config && config.pointerDirectionChangeThreshold != null ? config.pointerDirectionChangeThreshold : 5,
      zIndex: config?.zIndex
    });
    this._dragRef.data = this;
    this._dragDropRegistry.registerDirectiveNode(this.element.nativeElement, this);
    if (config) {
      this._assignDefaults(config);
    }
    if (dropContainer) {
      dropContainer.addItem(this);
      dropContainer._dropListRef.beforeStarted.pipe(takeUntil(this._destroyed)).subscribe(() => {
        this._dragRef.scale = this.scale;
      });
    }
    this._syncInputs(this._dragRef);
    this._handleEvents(this._dragRef);
  }
  getPlaceholderElement() {
    return this._dragRef.getPlaceholderElement();
  }
  getRootElement() {
    return this._dragRef.getRootElement();
  }
  reset() {
    this._dragRef.reset();
  }
  resetToBoundary() {
    this._dragRef.resetToBoundary();
  }
  getFreeDragPosition() {
    return this._dragRef.getFreeDragPosition();
  }
  setFreeDragPosition(value) {
    this._dragRef.setFreeDragPosition(value);
  }
  ngAfterViewInit() {
    afterNextRender(() => {
      this._updateRootElement();
      this._setupHandlesListener();
      this._dragRef.scale = this.scale;
      if (this.freeDragPosition) {
        this._dragRef.setFreeDragPosition(this.freeDragPosition);
      }
    }, {
      injector: this._injector
    });
  }
  ngOnChanges(changes) {
    const rootSelectorChange = changes["rootElementSelector"];
    const positionChange = changes["freeDragPosition"];
    if (rootSelectorChange && !rootSelectorChange.firstChange) {
      this._updateRootElement();
    }
    this._dragRef.scale = this.scale;
    if (positionChange && !positionChange.firstChange && this.freeDragPosition) {
      this._dragRef.setFreeDragPosition(this.freeDragPosition);
    }
  }
  ngOnDestroy() {
    if (this.dropContainer) {
      this.dropContainer.removeItem(this);
    }
    this._dragDropRegistry.removeDirectiveNode(this.element.nativeElement);
    this._ngZone.runOutsideAngular(() => {
      this._handles.complete();
      this._destroyed.next();
      this._destroyed.complete();
      this._dragRef.dispose();
    });
  }
  _addHandle(handle) {
    const handles = this._handles.getValue();
    handles.push(handle);
    this._handles.next(handles);
  }
  _removeHandle(handle) {
    const handles = this._handles.getValue();
    const index = handles.indexOf(handle);
    if (index > -1) {
      handles.splice(index, 1);
      this._handles.next(handles);
    }
  }
  _setPreviewTemplate(preview) {
    this._previewTemplate = preview;
  }
  _resetPreviewTemplate(preview) {
    if (preview === this._previewTemplate) {
      this._previewTemplate = null;
    }
  }
  _setPlaceholderTemplate(placeholder) {
    this._placeholderTemplate = placeholder;
  }
  _resetPlaceholderTemplate(placeholder) {
    if (placeholder === this._placeholderTemplate) {
      this._placeholderTemplate = null;
    }
  }
  _updateRootElement() {
    const element = this.element.nativeElement;
    let rootElement = element;
    if (this.rootElementSelector) {
      rootElement = element.closest !== void 0 ? element.closest(this.rootElementSelector) : element.parentElement?.closest(this.rootElementSelector);
    }
    if (rootElement && (typeof ngDevMode === "undefined" || ngDevMode)) {
      assertElementNode(rootElement, "cdkDrag");
    }
    this._dragRef.withRootElement(rootElement || element);
  }
  _getBoundaryElement() {
    const boundary = this.boundaryElement;
    if (!boundary) {
      return null;
    }
    if (typeof boundary === "string") {
      return this.element.nativeElement.closest(boundary);
    }
    return coerceElement(boundary);
  }
  _syncInputs(ref) {
    ref.beforeStarted.subscribe(() => {
      if (!ref.isDragging()) {
        const dir = this._dir;
        const dragStartDelay = this.dragStartDelay;
        const placeholder = this._placeholderTemplate ? {
          template: this._placeholderTemplate.templateRef,
          context: this._placeholderTemplate.data,
          viewContainer: this._viewContainerRef
        } : null;
        const preview = this._previewTemplate ? {
          template: this._previewTemplate.templateRef,
          context: this._previewTemplate.data,
          matchSize: this._previewTemplate.matchSize,
          viewContainer: this._viewContainerRef
        } : null;
        ref.disabled = this.disabled;
        ref.lockAxis = this.lockAxis;
        ref.scale = this.scale;
        ref.dragStartDelay = typeof dragStartDelay === "object" && dragStartDelay ? dragStartDelay : coerceNumberProperty(dragStartDelay);
        ref.constrainPosition = this.constrainPosition;
        ref.previewClass = this.previewClass;
        ref.withBoundaryElement(this._getBoundaryElement()).withPlaceholderTemplate(placeholder).withPreviewTemplate(preview).withPreviewContainer(this.previewContainer || "global");
        if (dir) {
          ref.withDirection(dir.value);
        }
      }
    });
    ref.beforeStarted.pipe(take(1)).subscribe(() => {
      if (this._parentDrag) {
        ref.withParent(this._parentDrag._dragRef);
        return;
      }
      let parent = this.element.nativeElement.parentElement;
      while (parent) {
        const parentDrag = this._dragDropRegistry.getDragDirectiveForNode(parent);
        if (parentDrag) {
          ref.withParent(parentDrag._dragRef);
          break;
        }
        parent = parent.parentElement;
      }
    });
  }
  _handleEvents(ref) {
    ref.started.subscribe((startEvent) => {
      this.started.emit({
        source: this,
        event: startEvent.event
      });
      this._changeDetectorRef.markForCheck();
    });
    ref.released.subscribe((releaseEvent) => {
      this.released.emit({
        source: this,
        event: releaseEvent.event
      });
    });
    ref.ended.subscribe((endEvent) => {
      this.ended.emit({
        source: this,
        distance: endEvent.distance,
        dropPoint: endEvent.dropPoint,
        event: endEvent.event
      });
      this._changeDetectorRef.markForCheck();
    });
    ref.entered.subscribe((enterEvent) => {
      this.entered.emit({
        container: enterEvent.container.data,
        item: this,
        currentIndex: enterEvent.currentIndex
      });
    });
    ref.exited.subscribe((exitEvent) => {
      this.exited.emit({
        container: exitEvent.container.data,
        item: this
      });
    });
    ref.dropped.subscribe((dropEvent) => {
      this.dropped.emit({
        previousIndex: dropEvent.previousIndex,
        currentIndex: dropEvent.currentIndex,
        previousContainer: dropEvent.previousContainer.data,
        container: dropEvent.container.data,
        isPointerOverContainer: dropEvent.isPointerOverContainer,
        item: this,
        distance: dropEvent.distance,
        dropPoint: dropEvent.dropPoint,
        event: dropEvent.event
      });
    });
  }
  _assignDefaults(config) {
    const {
      lockAxis,
      dragStartDelay,
      constrainPosition,
      previewClass,
      boundaryElement,
      draggingDisabled,
      rootElementSelector,
      previewContainer
    } = config;
    this.disabled = draggingDisabled == null ? false : draggingDisabled;
    this.dragStartDelay = dragStartDelay || 0;
    this.lockAxis = lockAxis || null;
    if (constrainPosition) {
      this.constrainPosition = constrainPosition;
    }
    if (previewClass) {
      this.previewClass = previewClass;
    }
    if (boundaryElement) {
      this.boundaryElement = boundaryElement;
    }
    if (rootElementSelector) {
      this.rootElementSelector = rootElementSelector;
    }
    if (previewContainer) {
      this.previewContainer = previewContainer;
    }
  }
  _setupHandlesListener() {
    this._handles.pipe(tap((handles) => {
      const handleElements = handles.map((handle) => handle.element);
      if (this._selfHandle && this.rootElementSelector) {
        handleElements.push(this.element);
      }
      this._dragRef.withHandles(handleElements);
    }), switchMap((handles) => {
      return merge(...handles.map((item) => item._stateChanges.pipe(startWith(item))));
    }), takeUntil(this._destroyed)).subscribe((handleInstance) => {
      const dragRef = this._dragRef;
      const handle = handleInstance.element.nativeElement;
      handleInstance.disabled ? dragRef.disableHandle(handle) : dragRef.enableHandle(handle);
    });
  }
  static \u0275fac = function CdkDrag_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDrag)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDrag,
    selectors: [["", "cdkDrag", ""]],
    hostAttrs: [1, "cdk-drag"],
    hostVars: 4,
    hostBindings: function CdkDrag_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("cdk-drag-disabled", ctx.disabled)("cdk-drag-dragging", ctx._dragRef.isDragging());
      }
    },
    inputs: {
      data: [0, "cdkDragData", "data"],
      lockAxis: [0, "cdkDragLockAxis", "lockAxis"],
      rootElementSelector: [0, "cdkDragRootElement", "rootElementSelector"],
      boundaryElement: [0, "cdkDragBoundary", "boundaryElement"],
      dragStartDelay: [0, "cdkDragStartDelay", "dragStartDelay"],
      freeDragPosition: [0, "cdkDragFreeDragPosition", "freeDragPosition"],
      disabled: [2, "cdkDragDisabled", "disabled", booleanAttribute],
      constrainPosition: [0, "cdkDragConstrainPosition", "constrainPosition"],
      previewClass: [0, "cdkDragPreviewClass", "previewClass"],
      previewContainer: [0, "cdkDragPreviewContainer", "previewContainer"],
      scale: [2, "cdkDragScale", "scale", numberAttribute]
    },
    outputs: {
      started: "cdkDragStarted",
      released: "cdkDragReleased",
      ended: "cdkDragEnded",
      entered: "cdkDragEntered",
      exited: "cdkDragExited",
      dropped: "cdkDragDropped",
      moved: "cdkDragMoved"
    },
    exportAs: ["cdkDrag"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DRAG_PARENT,
      useExisting: _CdkDrag
    }]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDrag, [{
    type: Directive,
    args: [{
      selector: "[cdkDrag]",
      exportAs: "cdkDrag",
      host: {
        "class": "cdk-drag",
        "[class.cdk-drag-disabled]": "disabled",
        "[class.cdk-drag-dragging]": "_dragRef.isDragging()"
      },
      providers: [{
        provide: CDK_DRAG_PARENT,
        useExisting: CdkDrag
      }]
    }]
  }], () => [], {
    data: [{
      type: Input,
      args: ["cdkDragData"]
    }],
    lockAxis: [{
      type: Input,
      args: ["cdkDragLockAxis"]
    }],
    rootElementSelector: [{
      type: Input,
      args: ["cdkDragRootElement"]
    }],
    boundaryElement: [{
      type: Input,
      args: ["cdkDragBoundary"]
    }],
    dragStartDelay: [{
      type: Input,
      args: ["cdkDragStartDelay"]
    }],
    freeDragPosition: [{
      type: Input,
      args: ["cdkDragFreeDragPosition"]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDragDisabled",
        transform: booleanAttribute
      }]
    }],
    constrainPosition: [{
      type: Input,
      args: ["cdkDragConstrainPosition"]
    }],
    previewClass: [{
      type: Input,
      args: ["cdkDragPreviewClass"]
    }],
    previewContainer: [{
      type: Input,
      args: ["cdkDragPreviewContainer"]
    }],
    scale: [{
      type: Input,
      args: [{
        alias: "cdkDragScale",
        transform: numberAttribute
      }]
    }],
    started: [{
      type: Output,
      args: ["cdkDragStarted"]
    }],
    released: [{
      type: Output,
      args: ["cdkDragReleased"]
    }],
    ended: [{
      type: Output,
      args: ["cdkDragEnded"]
    }],
    entered: [{
      type: Output,
      args: ["cdkDragEntered"]
    }],
    exited: [{
      type: Output,
      args: ["cdkDragExited"]
    }],
    dropped: [{
      type: Output,
      args: ["cdkDragDropped"]
    }],
    moved: [{
      type: Output,
      args: ["cdkDragMoved"]
    }]
  });
})();
var CDK_DROP_LIST_GROUP = new InjectionToken("CdkDropListGroup");
var CdkDropListGroup = class _CdkDropListGroup {
  _items = /* @__PURE__ */ new Set();
  disabled = false;
  ngOnDestroy() {
    this._items.clear();
  }
  static \u0275fac = function CdkDropListGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDropListGroup)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDropListGroup,
    selectors: [["", "cdkDropListGroup", ""]],
    inputs: {
      disabled: [2, "cdkDropListGroupDisabled", "disabled", booleanAttribute]
    },
    exportAs: ["cdkDropListGroup"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DROP_LIST_GROUP,
      useExisting: _CdkDropListGroup
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDropListGroup, [{
    type: Directive,
    args: [{
      selector: "[cdkDropListGroup]",
      exportAs: "cdkDropListGroup",
      providers: [{
        provide: CDK_DROP_LIST_GROUP,
        useExisting: CdkDropListGroup
      }]
    }]
  }], null, {
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListGroupDisabled",
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkDropList = class _CdkDropList {
  element = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _scrollDispatcher = inject(ScrollDispatcher);
  _dir = inject(Directionality, {
    optional: true
  });
  _group = inject(CDK_DROP_LIST_GROUP, {
    optional: true,
    skipSelf: true
  });
  _latestSortedRefs;
  _destroyed = new Subject();
  _scrollableParentsResolved = false;
  static _dropLists = [];
  _dropListRef;
  connectedTo = [];
  data;
  orientation = "vertical";
  id = inject(_IdGenerator).getId("cdk-drop-list-");
  lockAxis = null;
  get disabled() {
    return this._disabled || !!this._group && this._group.disabled;
  }
  set disabled(value) {
    this._dropListRef.disabled = this._disabled = value;
  }
  _disabled = false;
  sortingDisabled = false;
  enterPredicate = () => true;
  sortPredicate = () => true;
  autoScrollDisabled = false;
  autoScrollStep;
  elementContainerSelector = null;
  hasAnchor = false;
  dropped = new EventEmitter();
  entered = new EventEmitter();
  exited = new EventEmitter();
  sorted = new EventEmitter();
  _unsortedItems = /* @__PURE__ */ new Set();
  constructor() {
    const config = inject(CDK_DRAG_CONFIG, {
      optional: true
    });
    const injector = inject(Injector);
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      assertElementNode(this.element.nativeElement, "cdkDropList");
    }
    this._dropListRef = createDropListRef(injector, this.element);
    this._dropListRef.data = this;
    if (config) {
      this._assignDefaults(config);
    }
    this._dropListRef.enterPredicate = (drag, drop) => {
      return this.enterPredicate(drag.data, drop.data);
    };
    this._dropListRef.sortPredicate = (index, drag, drop) => {
      return this.sortPredicate(index, drag.data, drop.data);
    };
    this._setupInputSyncSubscription(this._dropListRef);
    this._handleEvents(this._dropListRef);
    _CdkDropList._dropLists.push(this);
    if (this._group) {
      this._group._items.add(this);
    }
  }
  addItem(item) {
    this._unsortedItems.add(item);
    item._dragRef._withDropContainer(this._dropListRef);
    if (this._dropListRef.isDragging()) {
      this._syncItemsWithRef(this.getSortedItems().map((item2) => item2._dragRef));
    }
  }
  removeItem(item) {
    this._unsortedItems.delete(item);
    if (this._latestSortedRefs) {
      const index = this._latestSortedRefs.indexOf(item._dragRef);
      if (index > -1) {
        this._latestSortedRefs.splice(index, 1);
        this._syncItemsWithRef(this._latestSortedRefs);
      }
    }
  }
  getSortedItems() {
    return Array.from(this._unsortedItems).sort((a, b) => {
      const documentPosition = a._dragRef.getVisibleElement().compareDocumentPosition(b._dragRef.getVisibleElement());
      return documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
  }
  ngOnDestroy() {
    const index = _CdkDropList._dropLists.indexOf(this);
    if (index > -1) {
      _CdkDropList._dropLists.splice(index, 1);
    }
    if (this._group) {
      this._group._items.delete(this);
    }
    this._latestSortedRefs = void 0;
    this._unsortedItems.clear();
    this._dropListRef.dispose();
    this._destroyed.next();
    this._destroyed.complete();
  }
  _setupInputSyncSubscription(ref) {
    if (this._dir) {
      this._dir.change.pipe(startWith(this._dir.value), takeUntil(this._destroyed)).subscribe((value) => ref.withDirection(value));
    }
    ref.beforeStarted.subscribe(() => {
      const siblings = coerceArray(this.connectedTo).map((drop) => {
        if (typeof drop === "string") {
          const correspondingDropList = _CdkDropList._dropLists.find((list) => list.id === drop);
          if (!correspondingDropList && (typeof ngDevMode === "undefined" || ngDevMode)) {
            console.warn(`CdkDropList could not find connected drop list with id "${drop}"`);
          }
          return correspondingDropList;
        }
        return drop;
      });
      if (this._group) {
        this._group._items.forEach((drop) => {
          if (siblings.indexOf(drop) === -1) {
            siblings.push(drop);
          }
        });
      }
      if (!this._scrollableParentsResolved) {
        const scrollableParents = this._scrollDispatcher.getAncestorScrollContainers(this.element).map((scrollable) => scrollable.getElementRef().nativeElement);
        this._dropListRef.withScrollableParents(scrollableParents);
        this._scrollableParentsResolved = true;
      }
      if (this.elementContainerSelector) {
        const container = this.element.nativeElement.querySelector(this.elementContainerSelector);
        if (!container && (typeof ngDevMode === "undefined" || ngDevMode)) {
          throw new Error(`CdkDropList could not find an element container matching the selector "${this.elementContainerSelector}"`);
        }
        ref.withElementContainer(container);
      }
      ref.disabled = this.disabled;
      ref.lockAxis = this.lockAxis;
      ref.sortingDisabled = this.sortingDisabled;
      ref.autoScrollDisabled = this.autoScrollDisabled;
      ref.autoScrollStep = coerceNumberProperty(this.autoScrollStep, 2);
      ref.hasAnchor = this.hasAnchor;
      ref.connectedTo(siblings.filter((drop) => drop && drop !== this).map((list) => list._dropListRef)).withOrientation(this.orientation);
    });
  }
  _handleEvents(ref) {
    ref.beforeStarted.subscribe(() => {
      this._syncItemsWithRef(this.getSortedItems().map((item) => item._dragRef));
      this._changeDetectorRef.markForCheck();
    });
    ref.entered.subscribe((event) => {
      this.entered.emit({
        container: this,
        item: event.item.data,
        currentIndex: event.currentIndex
      });
    });
    ref.exited.subscribe((event) => {
      this.exited.emit({
        container: this,
        item: event.item.data
      });
      this._changeDetectorRef.markForCheck();
    });
    ref.sorted.subscribe((event) => {
      this.sorted.emit({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
        container: this,
        item: event.item.data
      });
    });
    ref.dropped.subscribe((dropEvent) => {
      this.dropped.emit({
        previousIndex: dropEvent.previousIndex,
        currentIndex: dropEvent.currentIndex,
        previousContainer: dropEvent.previousContainer.data,
        container: dropEvent.container.data,
        item: dropEvent.item.data,
        isPointerOverContainer: dropEvent.isPointerOverContainer,
        distance: dropEvent.distance,
        dropPoint: dropEvent.dropPoint,
        event: dropEvent.event
      });
      this._changeDetectorRef.markForCheck();
    });
    merge(ref.receivingStarted, ref.receivingStopped).subscribe(() => this._changeDetectorRef.markForCheck());
  }
  _assignDefaults(config) {
    const {
      lockAxis,
      draggingDisabled,
      sortingDisabled,
      listAutoScrollDisabled,
      listOrientation
    } = config;
    this.disabled = draggingDisabled == null ? false : draggingDisabled;
    this.sortingDisabled = sortingDisabled == null ? false : sortingDisabled;
    this.autoScrollDisabled = listAutoScrollDisabled == null ? false : listAutoScrollDisabled;
    this.orientation = listOrientation || "vertical";
    this.lockAxis = lockAxis || null;
  }
  _syncItemsWithRef(items) {
    this._latestSortedRefs = items;
    this._dropListRef.withItems(items);
  }
  static \u0275fac = function CdkDropList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDropList)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDropList,
    selectors: [["", "cdkDropList", ""], ["cdk-drop-list"]],
    hostAttrs: [1, "cdk-drop-list"],
    hostVars: 7,
    hostBindings: function CdkDropList_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("id", ctx.id);
        \u0275\u0275classProp("cdk-drop-list-disabled", ctx.disabled)("cdk-drop-list-dragging", ctx._dropListRef.isDragging())("cdk-drop-list-receiving", ctx._dropListRef.isReceiving());
      }
    },
    inputs: {
      connectedTo: [0, "cdkDropListConnectedTo", "connectedTo"],
      data: [0, "cdkDropListData", "data"],
      orientation: [0, "cdkDropListOrientation", "orientation"],
      id: "id",
      lockAxis: [0, "cdkDropListLockAxis", "lockAxis"],
      disabled: [2, "cdkDropListDisabled", "disabled", booleanAttribute],
      sortingDisabled: [2, "cdkDropListSortingDisabled", "sortingDisabled", booleanAttribute],
      enterPredicate: [0, "cdkDropListEnterPredicate", "enterPredicate"],
      sortPredicate: [0, "cdkDropListSortPredicate", "sortPredicate"],
      autoScrollDisabled: [2, "cdkDropListAutoScrollDisabled", "autoScrollDisabled", booleanAttribute],
      autoScrollStep: [0, "cdkDropListAutoScrollStep", "autoScrollStep"],
      elementContainerSelector: [0, "cdkDropListElementContainer", "elementContainerSelector"],
      hasAnchor: [2, "cdkDropListHasAnchor", "hasAnchor", booleanAttribute]
    },
    outputs: {
      dropped: "cdkDropListDropped",
      entered: "cdkDropListEntered",
      exited: "cdkDropListExited",
      sorted: "cdkDropListSorted"
    },
    exportAs: ["cdkDropList"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DROP_LIST_GROUP,
      useValue: void 0
    }, {
      provide: CDK_DROP_LIST,
      useExisting: _CdkDropList
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDropList, [{
    type: Directive,
    args: [{
      selector: "[cdkDropList], cdk-drop-list",
      exportAs: "cdkDropList",
      providers: [{
        provide: CDK_DROP_LIST_GROUP,
        useValue: void 0
      }, {
        provide: CDK_DROP_LIST,
        useExisting: CdkDropList
      }],
      host: {
        "class": "cdk-drop-list",
        "[attr.id]": "id",
        "[class.cdk-drop-list-disabled]": "disabled",
        "[class.cdk-drop-list-dragging]": "_dropListRef.isDragging()",
        "[class.cdk-drop-list-receiving]": "_dropListRef.isReceiving()"
      }
    }]
  }], () => [], {
    connectedTo: [{
      type: Input,
      args: ["cdkDropListConnectedTo"]
    }],
    data: [{
      type: Input,
      args: ["cdkDropListData"]
    }],
    orientation: [{
      type: Input,
      args: ["cdkDropListOrientation"]
    }],
    id: [{
      type: Input
    }],
    lockAxis: [{
      type: Input,
      args: ["cdkDropListLockAxis"]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListDisabled",
        transform: booleanAttribute
      }]
    }],
    sortingDisabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListSortingDisabled",
        transform: booleanAttribute
      }]
    }],
    enterPredicate: [{
      type: Input,
      args: ["cdkDropListEnterPredicate"]
    }],
    sortPredicate: [{
      type: Input,
      args: ["cdkDropListSortPredicate"]
    }],
    autoScrollDisabled: [{
      type: Input,
      args: [{
        alias: "cdkDropListAutoScrollDisabled",
        transform: booleanAttribute
      }]
    }],
    autoScrollStep: [{
      type: Input,
      args: ["cdkDropListAutoScrollStep"]
    }],
    elementContainerSelector: [{
      type: Input,
      args: ["cdkDropListElementContainer"]
    }],
    hasAnchor: [{
      type: Input,
      args: [{
        alias: "cdkDropListHasAnchor",
        transform: booleanAttribute
      }]
    }],
    dropped: [{
      type: Output,
      args: ["cdkDropListDropped"]
    }],
    entered: [{
      type: Output,
      args: ["cdkDropListEntered"]
    }],
    exited: [{
      type: Output,
      args: ["cdkDropListExited"]
    }],
    sorted: [{
      type: Output,
      args: ["cdkDropListSorted"]
    }]
  });
})();
var CDK_DRAG_PREVIEW = new InjectionToken("CdkDragPreview");
var CdkDragPreview = class _CdkDragPreview {
  templateRef = inject(TemplateRef);
  _drag = inject(CDK_DRAG_PARENT, {
    optional: true
  });
  data;
  matchSize = false;
  constructor() {
    this._drag?._setPreviewTemplate(this);
  }
  ngOnDestroy() {
    this._drag?._resetPreviewTemplate(this);
  }
  static \u0275fac = function CdkDragPreview_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDragPreview)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDragPreview,
    selectors: [["ng-template", "cdkDragPreview", ""]],
    inputs: {
      data: "data",
      matchSize: [2, "matchSize", "matchSize", booleanAttribute]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DRAG_PREVIEW,
      useExisting: _CdkDragPreview
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDragPreview, [{
    type: Directive,
    args: [{
      selector: "ng-template[cdkDragPreview]",
      providers: [{
        provide: CDK_DRAG_PREVIEW,
        useExisting: CdkDragPreview
      }]
    }]
  }], () => [], {
    data: [{
      type: Input
    }],
    matchSize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CDK_DRAG_PLACEHOLDER = new InjectionToken("CdkDragPlaceholder");
var CdkDragPlaceholder = class _CdkDragPlaceholder {
  templateRef = inject(TemplateRef);
  _drag = inject(CDK_DRAG_PARENT, {
    optional: true
  });
  data;
  constructor() {
    this._drag?._setPlaceholderTemplate(this);
  }
  ngOnDestroy() {
    this._drag?._resetPlaceholderTemplate(this);
  }
  static \u0275fac = function CdkDragPlaceholder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkDragPlaceholder)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkDragPlaceholder,
    selectors: [["ng-template", "cdkDragPlaceholder", ""]],
    inputs: {
      data: "data"
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_DRAG_PLACEHOLDER,
      useExisting: _CdkDragPlaceholder
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkDragPlaceholder, [{
    type: Directive,
    args: [{
      selector: "ng-template[cdkDragPlaceholder]",
      providers: [{
        provide: CDK_DRAG_PLACEHOLDER,
        useExisting: CdkDragPlaceholder
      }]
    }]
  }], () => [], {
    data: [{
      type: Input
    }]
  });
})();
var DRAG_DROP_DIRECTIVES = [CdkDropList, CdkDropListGroup, CdkDrag, CdkDragHandle, CdkDragPreview, CdkDragPlaceholder];
var DragDropModule = class _DragDropModule {
  static \u0275fac = function DragDropModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DragDropModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _DragDropModule,
    imports: [CdkDropList, CdkDropListGroup, CdkDrag, CdkDragHandle, CdkDragPreview, CdkDragPlaceholder],
    exports: [CdkScrollableModule, CdkDropList, CdkDropListGroup, CdkDrag, CdkDragHandle, CdkDragPreview, CdkDragPlaceholder]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [DragDrop],
    imports: [CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DragDropModule, [{
    type: NgModule,
    args: [{
      imports: DRAG_DROP_DIRECTIVES,
      exports: [CdkScrollableModule, ...DRAG_DROP_DIRECTIVES],
      providers: [DragDrop]
    }]
  }], null, null);
})();

// node_modules/.pnpm/ngx-color-picker@20.1.1_@an_c947c5e749e9ae86d59a34d5f32285dc/node_modules/ngx-color-picker/fesm2022/ngx-color-picker.mjs
var _c02 = ["dialogPopup"];
var _c12 = ["hueSlider"];
var _c2 = ["alphaSlider"];
function ColorPickerComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("arrow arrow-", ctx_r0.cpUsePosition));
    \u0275\u0275styleProp("left", ctx_r0.cpArrowPosition)("top", ctx_r0.arrowTop, "px");
  }
}
function ColorPickerComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275listener("newValue", function ColorPickerComponent_div_3_Template_div_newValue_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onColorChange($event));
    })("dragStart", function ColorPickerComponent_div_3_Template_div_dragStart_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDragStart("saturation-lightness"));
    })("dragEnd", function ColorPickerComponent_div_3_Template_div_dragEnd_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDragEnd("saturation-lightness"));
    });
    \u0275\u0275element(1, "div", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background-color", ctx_r0.hueSliderColor);
    \u0275\u0275property("rgX", 1)("rgY", 1);
    \u0275\u0275advance();
    \u0275\u0275styleProp("top", ctx_r0.slider == null ? null : ctx_r0.slider.v, "px")("left", ctx_r0.slider == null ? null : ctx_r0.slider.s, "px");
  }
}
function ColorPickerComponent__svg_svg_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 29);
    \u0275\u0275element(1, "path", 30)(2, "path", 31);
    \u0275\u0275elementEnd();
  }
}
function ColorPickerComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function ColorPickerComponent_button_9_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAddPresetColor($event, ctx_r0.selectedColor));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.cpAddColorButtonClass);
    \u0275\u0275property("disabled", ctx_r0.cpPresetColors && ctx_r0.cpPresetColors.length >= ctx_r0.cpMaxPresetColorsLength);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.cpAddColorButtonText, " ");
  }
}
function ColorPickerComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 33);
  }
}
function ColorPickerComponent_div_21_input_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 39);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_21_input_6_Template_input_keyup_enter_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_21_input_6_Template_input_newValue_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAlphaInput($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("rg", 1)("value", ctx_r0.cmykText == null ? null : ctx_r0.cmykText.a);
  }
}
function ColorPickerComponent_div_21_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "A");
    \u0275\u0275elementEnd();
  }
}
function ColorPickerComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35)(2, "input", 36);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_21_Template_input_keyup_enter_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_21_Template_input_newValue_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCyanInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 36);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_21_Template_input_keyup_enter_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_21_Template_input_newValue_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onMagentaInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 36);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_21_Template_input_keyup_enter_4_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_21_Template_input_newValue_4_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onYellowInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 36);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_21_Template_input_keyup_enter_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_21_Template_input_newValue_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBlackInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, ColorPickerComponent_div_21_input_6_Template, 1, 2, "input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 35)(8, "div");
    \u0275\u0275text(9, "C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div");
    \u0275\u0275text(11, "M");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div");
    \u0275\u0275text(13, "Y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div");
    \u0275\u0275text(15, "K");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, ColorPickerComponent_div_21_div_16_Template, 2, 0, "div", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("display", ctx_r0.format !== 3 ? "none" : "block");
    \u0275\u0275advance(2);
    \u0275\u0275property("rg", 100)("value", ctx_r0.cmykText == null ? null : ctx_r0.cmykText.c);
    \u0275\u0275advance();
    \u0275\u0275property("rg", 100)("value", ctx_r0.cmykText == null ? null : ctx_r0.cmykText.m);
    \u0275\u0275advance();
    \u0275\u0275property("rg", 100)("value", ctx_r0.cmykText == null ? null : ctx_r0.cmykText.y);
    \u0275\u0275advance();
    \u0275\u0275property("rg", 100)("value", ctx_r0.cmykText == null ? null : ctx_r0.cmykText.k);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.cpAlphaChannel !== "disabled");
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", ctx_r0.cpAlphaChannel !== "disabled");
  }
}
function ColorPickerComponent_div_22_input_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 39);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_22_input_5_Template_input_keyup_enter_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_22_input_5_Template_input_newValue_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAlphaInput($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("rg", 1)("value", ctx_r0.hslaText == null ? null : ctx_r0.hslaText.a);
  }
}
function ColorPickerComponent_div_22_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "A");
    \u0275\u0275elementEnd();
  }
}
function ColorPickerComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 35)(2, "input", 41);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_22_Template_input_keyup_enter_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_22_Template_input_newValue_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onHueInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 36);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_22_Template_input_keyup_enter_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_22_Template_input_newValue_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSaturationInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 36);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_22_Template_input_keyup_enter_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_22_Template_input_newValue_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onLightnessInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ColorPickerComponent_div_22_input_5_Template, 1, 2, "input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 35)(7, "div");
    \u0275\u0275text(8, "H");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div");
    \u0275\u0275text(10, "S");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div");
    \u0275\u0275text(12, "L");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, ColorPickerComponent_div_22_div_13_Template, 2, 0, "div", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("display", ctx_r0.format !== 2 ? "none" : "block");
    \u0275\u0275advance(2);
    \u0275\u0275property("rg", 360)("value", ctx_r0.hslaText == null ? null : ctx_r0.hslaText.h);
    \u0275\u0275advance();
    \u0275\u0275property("rg", 100)("value", ctx_r0.hslaText == null ? null : ctx_r0.hslaText.s);
    \u0275\u0275advance();
    \u0275\u0275property("rg", 100)("value", ctx_r0.hslaText == null ? null : ctx_r0.hslaText.l);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.cpAlphaChannel !== "disabled");
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r0.cpAlphaChannel !== "disabled");
  }
}
function ColorPickerComponent_div_23_input_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 39);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_23_input_5_Template_input_keyup_enter_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_23_input_5_Template_input_newValue_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAlphaInput($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("rg", 1)("value", ctx_r0.rgbaText == null ? null : ctx_r0.rgbaText.a);
  }
}
function ColorPickerComponent_div_23_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "A");
    \u0275\u0275elementEnd();
  }
}
function ColorPickerComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 35)(2, "input", 43);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_23_Template_input_keyup_enter_2_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_23_Template_input_newValue_2_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onRedInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 43);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_23_Template_input_keyup_enter_3_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_23_Template_input_newValue_3_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onGreenInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 43);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_23_Template_input_keyup_enter_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_23_Template_input_newValue_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onBlueInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ColorPickerComponent_div_23_input_5_Template, 1, 2, "input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 35)(7, "div");
    \u0275\u0275text(8, "R");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div");
    \u0275\u0275text(10, "G");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div");
    \u0275\u0275text(12, "B");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, ColorPickerComponent_div_23_div_13_Template, 2, 0, "div", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("display", ctx_r0.format !== 1 ? "none" : "block");
    \u0275\u0275advance(2);
    \u0275\u0275property("rg", 255)("value", ctx_r0.rgbaText == null ? null : ctx_r0.rgbaText.r);
    \u0275\u0275advance();
    \u0275\u0275property("rg", 255)("value", ctx_r0.rgbaText == null ? null : ctx_r0.rgbaText.g);
    \u0275\u0275advance();
    \u0275\u0275property("rg", 255)("value", ctx_r0.rgbaText == null ? null : ctx_r0.rgbaText.b);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.cpAlphaChannel !== "disabled");
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r0.cpAlphaChannel !== "disabled");
  }
}
function ColorPickerComponent_div_24_input_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 39);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_24_input_3_Template_input_keyup_enter_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_24_input_3_Template_input_newValue_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAlphaInput($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("rg", 1)("value", ctx_r0.hexAlpha);
  }
}
function ColorPickerComponent_div_24_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "A");
    \u0275\u0275elementEnd();
  }
}
function ColorPickerComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 35)(2, "input", 45);
    \u0275\u0275listener("blur", function ColorPickerComponent_div_24_Template_input_blur_2_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onHexInput(null));
    })("keyup.enter", function ColorPickerComponent_div_24_Template_input_keyup_enter_2_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_24_Template_input_newValue_2_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onHexInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ColorPickerComponent_div_24_input_3_Template, 1, 2, "input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 35)(5, "div");
    \u0275\u0275text(6, "Hex");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, ColorPickerComponent_div_24_div_7_Template, 2, 0, "div", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("display", ctx_r0.format !== 0 ? "none" : "block");
    \u0275\u0275classProp("hex-alpha", ctx_r0.cpAlphaChannel === "forced");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r0.hexText);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.cpAlphaChannel === "forced");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.cpAlphaChannel === "forced");
  }
}
function ColorPickerComponent_div_25_input_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 39);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_25_input_3_Template_input_keyup_enter_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_25_input_3_Template_input_newValue_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAlphaInput($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("rg", 1)("value", ctx_r0.hslaText == null ? null : ctx_r0.hslaText.a);
  }
}
function ColorPickerComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 35)(2, "input", 36);
    \u0275\u0275listener("keyup.enter", function ColorPickerComponent_div_25_Template_input_keyup_enter_2_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    })("newValue", function ColorPickerComponent_div_25_Template_input_newValue_2_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onValueInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ColorPickerComponent_div_25_input_3_Template, 1, 2, "input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 35)(5, "div");
    \u0275\u0275text(6, "V");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div");
    \u0275\u0275text(8, "A");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("rg", 100)("value", ctx_r0.hslaText == null ? null : ctx_r0.hslaText.l);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.cpAlphaChannel !== "disabled");
  }
}
function ColorPickerComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "span", 48);
    \u0275\u0275listener("click", function ColorPickerComponent_div_26_Template_span_click_1_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onFormatToggle(-1));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 48);
    \u0275\u0275listener("click", function ColorPickerComponent_div_26_Template_span_click_2_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onFormatToggle(1));
    });
    \u0275\u0275elementEnd()();
  }
}
function ColorPickerComponent_div_27_div_4_div_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275listener("click", function ColorPickerComponent_div_27_div_4_div_1_span_1_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r17);
      const color_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onRemovePresetColor($event, color_r16));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap(ctx_r0.cpRemoveColorButtonClass);
  }
}
function ColorPickerComponent_div_27_div_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275listener("click", function ColorPickerComponent_div_27_div_4_div_1_Template_div_click_0_listener() {
      const color_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.setColorFromString(color_r16));
    });
    \u0275\u0275template(1, ColorPickerComponent_div_27_div_4_div_1_span_1_Template, 1, 2, "span", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const color_r16 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("background-color", color_r16);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.cpAddColorButton);
  }
}
function ColorPickerComponent_div_27_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, ColorPickerComponent_div_27_div_4_div_1_Template, 2, 3, "div", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.cpPresetColorsClass);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.cpPresetColors);
  }
}
function ColorPickerComponent_div_27_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.cpPresetEmptyMessageClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.cpPresetEmptyMessage);
  }
}
function ColorPickerComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "hr");
    \u0275\u0275elementStart(2, "div", 50);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ColorPickerComponent_div_27_div_4_Template, 2, 3, "div", 51)(5, ColorPickerComponent_div_27_div_5_Template, 2, 3, "div", 51);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.cpPresetLabel);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.cpPresetColors == null ? null : ctx_r0.cpPresetColors.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r0.cpPresetColors == null ? null : ctx_r0.cpPresetColors.length) && ctx_r0.cpAddColorButton);
  }
}
function ColorPickerComponent_div_28_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function ColorPickerComponent_div_28_button_1_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onCancelColor($event));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.cpCancelButtonClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.cpCancelButtonText);
  }
}
function ColorPickerComponent_div_28_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function ColorPickerComponent_div_28_button_2_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onAcceptColor($event));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.cpOKButtonClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.cpOKButtonText);
  }
}
function ColorPickerComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275template(1, ColorPickerComponent_div_28_button_1_Template, 2, 3, "button", 57)(2, ColorPickerComponent_div_28_button_2_Template, 2, 3, "button", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.cpCancelButton);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.cpOKButton);
  }
}
function ColorPickerComponent_div_29_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ColorPickerComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275template(1, ColorPickerComponent_div_29_ng_container_1_Template, 1, 0, "ng-container", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.cpExtraTemplate);
  }
}
var ColorFormats;
(function(ColorFormats2) {
  ColorFormats2[ColorFormats2["HEX"] = 0] = "HEX";
  ColorFormats2[ColorFormats2["RGBA"] = 1] = "RGBA";
  ColorFormats2[ColorFormats2["HSLA"] = 2] = "HSLA";
  ColorFormats2[ColorFormats2["CMYK"] = 3] = "CMYK";
})(ColorFormats || (ColorFormats = {}));
var Rgba = class {
  r;
  g;
  b;
  a;
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
};
var Hsva = class {
  h;
  s;
  v;
  a;
  constructor(h, s, v, a) {
    this.h = h;
    this.s = s;
    this.v = v;
    this.a = a;
  }
};
var Hsla = class {
  h;
  s;
  l;
  a;
  constructor(h, s, l, a) {
    this.h = h;
    this.s = s;
    this.l = l;
    this.a = a;
  }
};
var Cmyk = class {
  c;
  m;
  y;
  k;
  a;
  constructor(c, m, y, k, a = 1) {
    this.c = c;
    this.m = m;
    this.y = y;
    this.k = k;
    this.a = a;
  }
};
function calculateAutoPositioning(elBounds, triggerElBounds, window2) {
  let usePositionX = "right";
  let usePositionY = "bottom";
  const {
    height,
    width
  } = elBounds;
  const {
    top,
    left
  } = triggerElBounds;
  const bottom = top + triggerElBounds.height;
  const right = left + triggerElBounds.width;
  const collisionTop = top - height < 0;
  const collisionBottom = bottom + height > (window2.innerHeight || document.documentElement.clientHeight);
  const collisionLeft = left - width < 0;
  const collisionRight = right + width > (window2.innerWidth || document.documentElement.clientWidth);
  const collisionAll = collisionTop && collisionBottom && collisionLeft && collisionRight;
  if (collisionBottom) {
    usePositionY = "top";
  }
  if (collisionTop) {
    usePositionY = "bottom";
  }
  if (collisionLeft) {
    usePositionX = "right";
  }
  if (collisionRight) {
    usePositionX = "left";
  }
  if (collisionAll) {
    const postions = ["left", "right", "top", "bottom"];
    return postions.reduce((prev, next) => elBounds[prev] > elBounds[next] ? prev : next);
  }
  if (collisionLeft && collisionRight) {
    if (collisionTop) {
      return "bottom";
    }
    if (collisionBottom) {
      return "top";
    }
    return top > bottom ? "top" : "bottom";
  }
  if (collisionTop && collisionBottom) {
    if (collisionLeft) {
      return "right";
    }
    if (collisionRight) {
      return "left";
    }
    return left > right ? "left" : "right";
  }
  return `${usePositionY}-${usePositionX}`;
}
var TextDirective = class _TextDirective {
  rg;
  text;
  newValue = new EventEmitter();
  inputChange(event) {
    const value = event.target.value;
    if (this.rg === void 0) {
      this.newValue.emit(value);
    } else {
      const numeric = parseFloat(value);
      this.newValue.emit({
        v: numeric,
        rg: this.rg
      });
    }
  }
  static \u0275fac = function TextDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TextDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _TextDirective,
    selectors: [["", "text", ""]],
    hostBindings: function TextDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function TextDirective_input_HostBindingHandler($event) {
          return ctx.inputChange($event);
        });
      }
    },
    inputs: {
      rg: "rg",
      text: "text"
    },
    outputs: {
      newValue: "newValue"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextDirective, [{
    type: Directive,
    args: [{
      selector: "[text]"
    }]
  }], null, {
    rg: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    newValue: [{
      type: Output
    }],
    inputChange: [{
      type: HostListener,
      args: ["input", ["$event"]]
    }]
  });
})();
var SliderDirective = class _SliderDirective {
  elRef = inject(ElementRef);
  document = inject(DOCUMENT);
  listenerMove;
  listenerStop;
  rgX;
  rgY;
  dragEnd = new EventEmitter();
  dragStart = new EventEmitter();
  newValue = new EventEmitter();
  mouseDown(event) {
    this.start(event);
  }
  touchStart(event) {
    this.start(event);
  }
  constructor() {
    this.listenerMove = (event) => this.move(event);
    this.listenerStop = () => this.stop();
  }
  move(event) {
    event.preventDefault();
    this.setCursor(event);
  }
  start(event) {
    this.setCursor(event);
    event.stopPropagation();
    this.document.addEventListener("mouseup", this.listenerStop);
    this.document.addEventListener("touchend", this.listenerStop);
    this.document.addEventListener("mousemove", this.listenerMove);
    this.document.addEventListener("touchmove", this.listenerMove);
    this.dragStart.emit();
  }
  stop() {
    this.document.removeEventListener("mouseup", this.listenerStop);
    this.document.removeEventListener("touchend", this.listenerStop);
    this.document.removeEventListener("mousemove", this.listenerMove);
    this.document.removeEventListener("touchmove", this.listenerMove);
    this.dragEnd.emit();
  }
  getX(event) {
    const position = this.elRef.nativeElement.getBoundingClientRect();
    const pageX = event.pageX !== void 0 ? event.pageX : event.touches[0].pageX;
    return pageX - position.left - window.pageXOffset;
  }
  getY(event) {
    const position = this.elRef.nativeElement.getBoundingClientRect();
    const pageY = event.pageY !== void 0 ? event.pageY : event.touches[0].pageY;
    return pageY - position.top - window.pageYOffset;
  }
  setCursor(event) {
    const width = this.elRef.nativeElement.offsetWidth;
    const height = this.elRef.nativeElement.offsetHeight;
    const x = Math.max(0, Math.min(this.getX(event), width));
    const y = Math.max(0, Math.min(this.getY(event), height));
    if (this.rgX !== void 0 && this.rgY !== void 0) {
      this.newValue.emit({
        s: x / width,
        v: 1 - y / height,
        rgX: this.rgX,
        rgY: this.rgY
      });
    } else if (this.rgX === void 0 && this.rgY !== void 0) {
      this.newValue.emit({
        v: y / height,
        rgY: this.rgY
      });
    } else if (this.rgX !== void 0 && this.rgY === void 0) {
      this.newValue.emit({
        v: x / width,
        rgX: this.rgX
      });
    }
  }
  static \u0275fac = function SliderDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SliderDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _SliderDirective,
    selectors: [["", "slider", ""]],
    hostBindings: function SliderDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("mousedown", function SliderDirective_mousedown_HostBindingHandler($event) {
          return ctx.mouseDown($event);
        })("touchstart", function SliderDirective_touchstart_HostBindingHandler($event) {
          return ctx.touchStart($event);
        });
      }
    },
    inputs: {
      rgX: "rgX",
      rgY: "rgY"
    },
    outputs: {
      dragEnd: "dragEnd",
      dragStart: "dragStart",
      newValue: "newValue"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SliderDirective, [{
    type: Directive,
    args: [{
      selector: "[slider]"
    }]
  }], () => [], {
    rgX: [{
      type: Input
    }],
    rgY: [{
      type: Input
    }],
    dragEnd: [{
      type: Output
    }],
    dragStart: [{
      type: Output
    }],
    newValue: [{
      type: Output
    }],
    mouseDown: [{
      type: HostListener,
      args: ["mousedown", ["$event"]]
    }],
    touchStart: [{
      type: HostListener,
      args: ["touchstart", ["$event"]]
    }]
  });
})();
var SliderPosition = class {
  h;
  s;
  v;
  a;
  constructor(h, s, v, a) {
    this.h = h;
    this.s = s;
    this.v = v;
    this.a = a;
  }
};
var SliderDimension = class {
  h;
  s;
  v;
  a;
  constructor(h, s, v, a) {
    this.h = h;
    this.s = s;
    this.v = v;
    this.a = a;
  }
};
var ColorPickerService = class _ColorPickerService {
  active = null;
  setActive(active) {
    if (this.active && this.active !== active && this.active.cpDialogDisplay !== "inline") {
      this.active.closeDialog();
    }
    this.active = active;
  }
  hsva2hsla(hsva) {
    const h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
    if (v === 0) {
      return new Hsla(h, 0, 0, a);
    } else if (s === 0 && v === 1) {
      return new Hsla(h, 1, 1, a);
    } else {
      const l = v * (2 - s) / 2;
      return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
    }
  }
  hsla2hsva(hsla) {
    const h = Math.min(hsla.h, 1), s = Math.min(hsla.s, 1);
    const l = Math.min(hsla.l, 1), a = Math.min(hsla.a, 1);
    if (l === 0) {
      return new Hsva(h, 0, 0, a);
    } else {
      const v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
      return new Hsva(h, 2 * (v - l) / v, v, a);
    }
  }
  hsvaToRgba(hsva) {
    let r, g, b;
    const h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        ;
        r = v, g = t, b = p;
        break;
      case 1:
        ;
        r = q, g = v, b = p;
        break;
      case 2:
        ;
        r = p, g = v, b = t;
        break;
      case 3:
        ;
        r = p, g = q, b = v;
        break;
      case 4:
        ;
        r = t, g = p, b = v;
        break;
      case 5:
        ;
        r = v, g = p, b = q;
        break;
      default:
        ;
        r = 0, g = 0, b = 0;
    }
    return new Rgba(r, g, b, a);
  }
  cmykToRgb(cmyk) {
    const r = (1 - cmyk.c) * (1 - cmyk.k);
    const g = (1 - cmyk.m) * (1 - cmyk.k);
    const b = (1 - cmyk.y) * (1 - cmyk.k);
    return new Rgba(r, g, b, cmyk.a);
  }
  rgbaToCmyk(rgba) {
    const k = 1 - Math.max(rgba.r, rgba.g, rgba.b);
    if (k === 1) {
      return new Cmyk(0, 0, 0, 1, rgba.a);
    } else {
      const c = (1 - rgba.r - k) / (1 - k);
      const m = (1 - rgba.g - k) / (1 - k);
      const y = (1 - rgba.b - k) / (1 - k);
      return new Cmyk(c, m, y, k, rgba.a);
    }
  }
  rgbaToHsva(rgba) {
    let h, s;
    const r = Math.min(rgba.r, 1), g = Math.min(rgba.g, 1);
    const b = Math.min(rgba.b, 1), a = Math.min(rgba.a, 1);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const v = max, d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }
      h /= 6;
    }
    return new Hsva(h, s, v, a);
  }
  rgbaToHex(rgba, allowHex8) {
    let hex = "#" + (1 << 24 | rgba.r << 16 | rgba.g << 8 | rgba.b).toString(16).substr(1);
    if (allowHex8) {
      hex += (1 << 8 | Math.round(rgba.a * 255)).toString(16).substr(1);
    }
    return hex;
  }
  normalizeCMYK(cmyk) {
    return new Cmyk(cmyk.c / 100, cmyk.m / 100, cmyk.y / 100, cmyk.k / 100, cmyk.a);
  }
  denormalizeCMYK(cmyk) {
    return new Cmyk(Math.floor(cmyk.c * 100), Math.floor(cmyk.m * 100), Math.floor(cmyk.y * 100), Math.floor(cmyk.k * 100), cmyk.a);
  }
  denormalizeRGBA(rgba) {
    return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
  }
  stringToHsva(colorString = "", allowHex8 = false) {
    let hsva = null;
    colorString = (colorString || "").toLowerCase();
    const stringParsers = [{
      re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
      parse: function(execResult) {
        return new Rgba(parseInt(execResult[2], 10) / 255, parseInt(execResult[3], 10) / 255, parseInt(execResult[4], 10) / 255, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
      }
    }, {
      re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
      parse: function(execResult) {
        return new Hsla(parseInt(execResult[2], 10) / 360, parseInt(execResult[3], 10) / 100, parseInt(execResult[4], 10) / 100, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
      }
    }];
    if (allowHex8) {
      stringParsers.push({
        re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})?$/,
        parse: function(execResult) {
          return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, parseInt(execResult[4] || "FF", 16) / 255);
        }
      });
    } else {
      stringParsers.push({
        re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
        parse: function(execResult) {
          return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, 1);
        }
      });
    }
    stringParsers.push({
      re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
      parse: function(execResult) {
        return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255, parseInt(execResult[2] + execResult[2], 16) / 255, parseInt(execResult[3] + execResult[3], 16) / 255, 1);
      }
    });
    for (const key in stringParsers) {
      if (stringParsers.hasOwnProperty(key)) {
        const parser = stringParsers[key];
        const match = parser.re.exec(colorString), color = match && parser.parse(match);
        if (color) {
          if (color instanceof Rgba) {
            hsva = this.rgbaToHsva(color);
          } else if (color instanceof Hsla) {
            hsva = this.hsla2hsva(color);
          }
          return hsva;
        }
      }
    }
    return hsva;
  }
  outputFormat(hsva, outputFormat, alphaChannel) {
    if (outputFormat === "auto") {
      outputFormat = hsva.a < 1 ? "rgba" : "hex";
    }
    switch (outputFormat) {
      case "hsla":
        const hsla = this.hsva2hsla(hsva);
        const hslaText = new Hsla(Math.round(hsla.h * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        if (hsva.a < 1 || alphaChannel === "always") {
          return "hsla(" + hslaText.h + "," + hslaText.s + "%," + hslaText.l + "%," + hslaText.a + ")";
        } else {
          return "hsl(" + hslaText.h + "," + hslaText.s + "%," + hslaText.l + "%)";
        }
      case "rgba":
        const rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
        if (hsva.a < 1 || alphaChannel === "always") {
          return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + Math.round(rgba.a * 100) / 100 + ")";
        } else {
          return "rgb(" + rgba.r + "," + rgba.g + "," + rgba.b + ")";
        }
      default:
        const allowHex8 = alphaChannel === "always" || alphaChannel === "forced";
        return this.rgbaToHex(this.denormalizeRGBA(this.hsvaToRgba(hsva)), allowHex8);
    }
  }
  static \u0275fac = function ColorPickerService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ColorPickerService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ColorPickerService,
    factory: _ColorPickerService.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColorPickerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var SUPPORTS_TOUCH = typeof window !== "undefined" && "ontouchstart" in window;
var ColorPickerComponent = class _ColorPickerComponent {
  ngZone = inject(NgZone);
  elRef = inject(ElementRef);
  cdRef = inject(ChangeDetectorRef);
  platformId = inject(PLATFORM_ID);
  service = inject(ColorPickerService);
  document = inject(DOCUMENT);
  cmyk;
  hsva;
  width;
  height;
  cmykColor;
  outputColor;
  initialColor;
  fallbackColor;
  listenerResize;
  listenerMouseDown;
  directiveInstance;
  sliderH;
  sliderDimMax;
  directiveElementRef;
  dialogArrowSize = 10;
  dialogArrowOffset = 15;
  dialogInputFields = [ColorFormats.HEX, ColorFormats.RGBA, ColorFormats.HSLA, ColorFormats.CMYK];
  useRootViewContainer = false;
  window;
  show;
  hidden;
  top;
  left;
  position;
  format;
  slider;
  hexText;
  hexAlpha;
  cmykText;
  hslaText;
  rgbaText;
  arrowTop;
  selectedColor;
  hueSliderColor;
  alphaSliderColor;
  cpWidth;
  cpHeight;
  cpColorMode;
  cpCmykEnabled;
  cpAlphaChannel;
  cpOutputFormat;
  cpDisableInput;
  cpDialogDisplay;
  cpIgnoredElements;
  cpSaveClickOutside;
  cpCloseClickOutside;
  cpPosition;
  cpUsePosition;
  cpPositionOffset;
  cpOKButton;
  cpOKButtonText;
  cpOKButtonClass;
  cpCancelButton;
  cpCancelButtonText;
  cpCancelButtonClass;
  cpEyeDropper;
  eyeDropperSupported;
  cpPresetLabel;
  cpPresetColors;
  cpPresetColorsClass;
  cpMaxPresetColorsLength;
  cpPresetEmptyMessage;
  cpPresetEmptyMessageClass;
  cpAddColorButton;
  cpAddColorButtonText;
  cpAddColorButtonClass;
  cpRemoveColorButtonClass;
  cpArrowPosition;
  cpTriggerElement;
  cpExtraTemplate;
  dialogElement;
  hueSlider;
  alphaSlider;
  handleEsc(event) {
    if (this.show && this.cpDialogDisplay === "popup") {
      this.onCancelColor(event);
    }
  }
  handleEnter(event) {
    if (this.show && this.cpDialogDisplay === "popup") {
      this.onAcceptColor(event);
    }
  }
  constructor() {
    this.window = this.document.defaultView;
    this.eyeDropperSupported = isPlatformBrowser(this.platformId) && "EyeDropper" in this.window;
  }
  ngOnInit() {
    this.slider = new SliderPosition(0, 0, 0, 0);
    const hueWidth = this.hueSlider.nativeElement.offsetWidth || 140;
    const alphaWidth = this.alphaSlider.nativeElement.offsetWidth || 140;
    this.sliderDimMax = new SliderDimension(hueWidth, this.cpWidth, 130, alphaWidth);
    if (this.cpCmykEnabled) {
      this.format = ColorFormats.CMYK;
    } else if (this.cpOutputFormat === "rgba") {
      this.format = ColorFormats.RGBA;
    } else if (this.cpOutputFormat === "hsla") {
      this.format = ColorFormats.HSLA;
    } else {
      this.format = ColorFormats.HEX;
    }
    this.listenerMouseDown = (event) => {
      this.onMouseDown(event);
    };
    this.listenerResize = () => {
      this.onResize();
    };
    this.openDialog(this.initialColor, false);
  }
  ngOnDestroy() {
    this.closeDialog();
  }
  ngAfterViewInit() {
    if (this.cpWidth !== 230 || this.cpDialogDisplay === "inline") {
      const hueWidth = this.hueSlider.nativeElement.offsetWidth || 140;
      const alphaWidth = this.alphaSlider.nativeElement.offsetWidth || 140;
      this.sliderDimMax = new SliderDimension(hueWidth, this.cpWidth, 130, alphaWidth);
      this.updateColorPicker(false);
      this.cdRef.detectChanges();
    }
  }
  openDialog(color, emit = true) {
    this.service.setActive(this);
    if (!this.width) {
      this.cpWidth = this.directiveElementRef.nativeElement.offsetWidth;
    }
    if (!this.height) {
      this.height = 320;
    }
    this.setInitialColor(color);
    this.setColorFromString(color, emit);
    this.openColorPicker();
  }
  closeDialog() {
    this.closeColorPicker();
  }
  setupDialog(instance, elementRef, color, cpWidth, cpHeight, cpDialogDisplay, cpFallbackColor, cpColorMode, cpCmykEnabled, cpAlphaChannel, cpOutputFormat, cpDisableInput, cpIgnoredElements, cpSaveClickOutside, cpCloseClickOutside, cpUseRootViewContainer, cpPosition, cpPositionOffset, cpPositionRelativeToArrow, cpPresetLabel, cpPresetColors, cpPresetColorsClass, cpMaxPresetColorsLength, cpPresetEmptyMessage, cpPresetEmptyMessageClass, cpOKButton, cpOKButtonClass, cpOKButtonText, cpCancelButton, cpCancelButtonClass, cpCancelButtonText, cpAddColorButton, cpAddColorButtonClass, cpAddColorButtonText, cpRemoveColorButtonClass, cpEyeDropper, cpTriggerElement, cpExtraTemplate) {
    this.setInitialColor(color);
    this.setColorMode(cpColorMode);
    this.directiveInstance = instance;
    this.directiveElementRef = elementRef;
    this.cpDisableInput = cpDisableInput;
    this.cpCmykEnabled = cpCmykEnabled;
    this.cpAlphaChannel = cpAlphaChannel;
    this.cpOutputFormat = cpOutputFormat;
    this.cpDialogDisplay = cpDialogDisplay;
    this.cpIgnoredElements = cpIgnoredElements;
    this.cpSaveClickOutside = cpSaveClickOutside;
    this.cpCloseClickOutside = cpCloseClickOutside;
    this.useRootViewContainer = cpUseRootViewContainer;
    this.width = this.cpWidth = parseInt(cpWidth, 10);
    this.height = this.cpHeight = parseInt(cpHeight, 10);
    this.cpPosition = cpPosition;
    this.cpPositionOffset = parseInt(cpPositionOffset, 10);
    this.cpOKButton = cpOKButton;
    this.cpOKButtonText = cpOKButtonText;
    this.cpOKButtonClass = cpOKButtonClass;
    this.cpCancelButton = cpCancelButton;
    this.cpCancelButtonText = cpCancelButtonText;
    this.cpCancelButtonClass = cpCancelButtonClass;
    this.cpEyeDropper = cpEyeDropper;
    this.fallbackColor = cpFallbackColor || "#fff";
    this.setPresetConfig(cpPresetLabel, cpPresetColors);
    this.cpPresetColorsClass = cpPresetColorsClass;
    this.cpMaxPresetColorsLength = cpMaxPresetColorsLength;
    this.cpPresetEmptyMessage = cpPresetEmptyMessage;
    this.cpPresetEmptyMessageClass = cpPresetEmptyMessageClass;
    this.cpAddColorButton = cpAddColorButton;
    this.cpAddColorButtonText = cpAddColorButtonText;
    this.cpAddColorButtonClass = cpAddColorButtonClass;
    this.cpRemoveColorButtonClass = cpRemoveColorButtonClass;
    this.cpTriggerElement = cpTriggerElement;
    this.cpExtraTemplate = cpExtraTemplate;
    if (!cpPositionRelativeToArrow) {
      this.dialogArrowOffset = 0;
    }
    if (cpDialogDisplay === "inline") {
      this.dialogArrowSize = 0;
      this.dialogArrowOffset = 0;
    }
    if (cpOutputFormat === "hex" && cpAlphaChannel !== "always" && cpAlphaChannel !== "forced") {
      this.cpAlphaChannel = "disabled";
    }
  }
  setColorMode(mode) {
    switch (mode.toString().toUpperCase()) {
      case "1":
      case "C":
      case "COLOR":
        this.cpColorMode = 1;
        break;
      case "2":
      case "G":
      case "GRAYSCALE":
        this.cpColorMode = 2;
        break;
      case "3":
      case "P":
      case "PRESETS":
        this.cpColorMode = 3;
        break;
      default:
        this.cpColorMode = 1;
    }
  }
  setInitialColor(color) {
    this.initialColor = color;
  }
  setPresetConfig(cpPresetLabel, cpPresetColors) {
    this.cpPresetLabel = cpPresetLabel;
    this.cpPresetColors = cpPresetColors;
  }
  setColorFromString(value, emit = true, update = true) {
    let hsva;
    if (this.cpAlphaChannel === "always" || this.cpAlphaChannel === "forced") {
      hsva = this.service.stringToHsva(value, true);
      if (!hsva && !this.hsva) {
        hsva = this.service.stringToHsva(value, false);
      }
    } else {
      hsva = this.service.stringToHsva(value, false);
    }
    if (!hsva && !this.hsva) {
      hsva = this.service.stringToHsva(this.fallbackColor, false);
    }
    if (hsva) {
      this.hsva = hsva;
      this.sliderH = this.hsva.h;
      if (this.cpOutputFormat === "hex" && this.cpAlphaChannel === "disabled") {
        this.hsva.a = 1;
      }
      this.updateColorPicker(emit, update);
    }
  }
  onResize() {
    if (this.position === "fixed") {
      this.setDialogPosition();
    } else if (this.cpDialogDisplay !== "inline") {
      this.closeColorPicker();
    }
  }
  onDragEnd(slider) {
    this.directiveInstance.sliderDragEnd({
      slider,
      color: this.outputColor
    });
  }
  onDragStart(slider) {
    this.directiveInstance.sliderDragStart({
      slider,
      color: this.outputColor
    });
  }
  onMouseDown(event) {
    if (this.show && this.cpDialogDisplay === "popup" && event.target !== this.directiveElementRef.nativeElement && !this.isDescendant(this.elRef.nativeElement, event.target) && !this.isDescendant(this.directiveElementRef.nativeElement, event.target) && this.cpIgnoredElements.filter((item) => item === event.target).length === 0) {
      this.ngZone.run(() => {
        if (this.cpSaveClickOutside) {
          this.directiveInstance.colorSelected(this.outputColor);
        } else {
          this.hsva = null;
          this.setColorFromString(this.initialColor, false);
          if (this.cpCmykEnabled) {
            this.directiveInstance.cmykChanged(this.cmykColor);
          }
          this.directiveInstance.colorChanged(this.initialColor);
          this.directiveInstance.colorCanceled();
        }
        if (this.cpCloseClickOutside) {
          this.closeColorPicker();
        }
      });
    }
  }
  onAcceptColor(event) {
    event.stopPropagation();
    if (this.outputColor) {
      this.directiveInstance.colorSelected(this.outputColor);
    }
    if (this.cpDialogDisplay === "popup") {
      this.closeColorPicker();
    }
  }
  onCancelColor(event) {
    this.hsva = null;
    event.stopPropagation();
    this.directiveInstance.colorCanceled();
    this.setColorFromString(this.initialColor, true);
    if (this.cpDialogDisplay === "popup") {
      if (this.cpCmykEnabled) {
        this.directiveInstance.cmykChanged(this.cmykColor);
      }
      this.directiveInstance.colorChanged(this.initialColor, true);
      this.closeColorPicker();
    }
  }
  onEyeDropper() {
    if (!this.eyeDropperSupported) return;
    const eyeDropper = new window.EyeDropper();
    eyeDropper.open().then((eyeDropperResult) => {
      this.setColorFromString(eyeDropperResult.sRGBHex, true);
    });
  }
  onFormatToggle(change) {
    const availableFormats = this.dialogInputFields.length - (this.cpCmykEnabled ? 0 : 1);
    const nextFormat = ((this.dialogInputFields.indexOf(this.format) + change) % availableFormats + availableFormats) % availableFormats;
    this.format = this.dialogInputFields[nextFormat];
  }
  onColorChange(value) {
    this.hsva.s = value.s / value.rgX;
    this.hsva.v = value.v / value.rgY;
    this.updateColorPicker();
    this.directiveInstance.sliderChanged({
      slider: "lightness",
      value: this.hsva.v,
      color: this.outputColor
    });
    this.directiveInstance.sliderChanged({
      slider: "saturation",
      value: this.hsva.s,
      color: this.outputColor
    });
  }
  onHueChange(value) {
    this.hsva.h = value.v / value.rgX;
    this.sliderH = this.hsva.h;
    this.updateColorPicker();
    this.directiveInstance.sliderChanged({
      slider: "hue",
      value: this.hsva.h,
      color: this.outputColor
    });
  }
  onValueChange(value) {
    this.hsva.v = value.v / value.rgX;
    this.updateColorPicker();
    this.directiveInstance.sliderChanged({
      slider: "value",
      value: this.hsva.v,
      color: this.outputColor
    });
  }
  onAlphaChange(value) {
    this.hsva.a = value.v / value.rgX;
    this.updateColorPicker();
    this.directiveInstance.sliderChanged({
      slider: "alpha",
      value: this.hsva.a,
      color: this.outputColor
    });
  }
  onHexInput(value) {
    if (value === null) {
      this.updateColorPicker();
    } else {
      if (value && value[0] !== "#") {
        value = "#" + value;
      }
      let validHex = /^#[a-f0-9]{6}$/gi;
      if (this.cpAlphaChannel === "always") {
        validHex = /^#([a-f0-9]{6}|[a-f0-9]{8})$/gi;
      }
      const valid = validHex.test(value);
      if (valid) {
        if (this.cpAlphaChannel === "forced") {
          value += Math.round(this.hsva.a * 255).toString(16);
        }
        this.setColorFromString(value, true, false);
      }
      this.directiveInstance.inputChanged({
        input: "hex",
        valid,
        value,
        color: this.outputColor
      });
    }
  }
  onRedInput(value) {
    const rgba = this.service.hsvaToRgba(this.hsva);
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      rgba.r = value.v / value.rg;
      this.hsva = this.service.rgbaToHsva(rgba);
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
    this.directiveInstance.inputChanged({
      input: "red",
      valid,
      value: rgba.r,
      color: this.outputColor
    });
  }
  onBlueInput(value) {
    const rgba = this.service.hsvaToRgba(this.hsva);
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      rgba.b = value.v / value.rg;
      this.hsva = this.service.rgbaToHsva(rgba);
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
    this.directiveInstance.inputChanged({
      input: "blue",
      valid,
      value: rgba.b,
      color: this.outputColor
    });
  }
  onGreenInput(value) {
    const rgba = this.service.hsvaToRgba(this.hsva);
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      rgba.g = value.v / value.rg;
      this.hsva = this.service.rgbaToHsva(rgba);
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
    this.directiveInstance.inputChanged({
      input: "green",
      valid,
      value: rgba.g,
      color: this.outputColor
    });
  }
  onHueInput(value) {
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      this.hsva.h = value.v / value.rg;
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
    this.directiveInstance.inputChanged({
      input: "hue",
      valid,
      value: this.hsva.h,
      color: this.outputColor
    });
  }
  onValueInput(value) {
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      this.hsva.v = value.v / value.rg;
      this.updateColorPicker();
    }
    this.directiveInstance.inputChanged({
      input: "value",
      valid,
      value: this.hsva.v,
      color: this.outputColor
    });
  }
  onAlphaInput(value) {
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      this.hsva.a = value.v / value.rg;
      this.updateColorPicker();
    }
    this.directiveInstance.inputChanged({
      input: "alpha",
      valid,
      value: this.hsva.a,
      color: this.outputColor
    });
  }
  onLightnessInput(value) {
    const hsla = this.service.hsva2hsla(this.hsva);
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      hsla.l = value.v / value.rg;
      this.hsva = this.service.hsla2hsva(hsla);
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
    this.directiveInstance.inputChanged({
      input: "lightness",
      valid,
      value: hsla.l,
      color: this.outputColor
    });
  }
  onSaturationInput(value) {
    const hsla = this.service.hsva2hsla(this.hsva);
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      hsla.s = value.v / value.rg;
      this.hsva = this.service.hsla2hsva(hsla);
      this.sliderH = this.hsva.h;
      this.updateColorPicker();
    }
    this.directiveInstance.inputChanged({
      input: "saturation",
      valid,
      value: hsla.s,
      color: this.outputColor
    });
  }
  onCyanInput(value) {
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      this.cmyk.c = value.v;
      this.updateColorPicker(false, true, true);
    }
    this.directiveInstance.inputChanged({
      input: "cyan",
      valid: true,
      value: this.cmyk.c,
      color: this.outputColor
    });
  }
  onMagentaInput(value) {
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      this.cmyk.m = value.v;
      this.updateColorPicker(false, true, true);
    }
    this.directiveInstance.inputChanged({
      input: "magenta",
      valid: true,
      value: this.cmyk.m,
      color: this.outputColor
    });
  }
  onYellowInput(value) {
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      this.cmyk.y = value.v;
      this.updateColorPicker(false, true, true);
    }
    this.directiveInstance.inputChanged({
      input: "yellow",
      valid: true,
      value: this.cmyk.y,
      color: this.outputColor
    });
  }
  onBlackInput(value) {
    const valid = !isNaN(value.v) && value.v >= 0 && value.v <= value.rg;
    if (valid) {
      this.cmyk.k = value.v;
      this.updateColorPicker(false, true, true);
    }
    this.directiveInstance.inputChanged({
      input: "black",
      valid: true,
      value: this.cmyk.k,
      color: this.outputColor
    });
  }
  onAddPresetColor(event, value) {
    event.stopPropagation();
    if (!this.cpPresetColors.filter((color) => color === value).length) {
      this.cpPresetColors = this.cpPresetColors.concat(value);
      this.directiveInstance.presetColorsChanged(this.cpPresetColors);
    }
  }
  onRemovePresetColor(event, value) {
    event.stopPropagation();
    this.cpPresetColors = this.cpPresetColors.filter((color) => color !== value);
    this.directiveInstance.presetColorsChanged(this.cpPresetColors);
  }
  // Private helper functions for the color picker dialog status
  openColorPicker() {
    if (!this.show) {
      this.show = true;
      this.hidden = true;
      setTimeout(() => {
        this.hidden = false;
        this.setDialogPosition();
        this.cdRef.detectChanges();
      }, 0);
      this.directiveInstance.stateChanged(true);
      this.ngZone.runOutsideAngular(() => {
        if (SUPPORTS_TOUCH) {
          this.document.addEventListener("touchstart", this.listenerMouseDown);
        } else {
          this.document.addEventListener("mousedown", this.listenerMouseDown);
        }
      });
      this.window.addEventListener("resize", this.listenerResize);
    }
  }
  closeColorPicker() {
    if (this.show) {
      this.show = false;
      this.directiveInstance.stateChanged(false);
      if (SUPPORTS_TOUCH) {
        this.document.removeEventListener("touchstart", this.listenerMouseDown);
      } else {
        this.document.removeEventListener("mousedown", this.listenerMouseDown);
      }
      this.window.removeEventListener("resize", this.listenerResize);
      if (!this.cdRef["destroyed"]) {
        this.cdRef.detectChanges();
      }
    }
  }
  updateColorPicker(emit = true, update = true, cmykInput = false) {
    if (this.sliderDimMax) {
      if (this.cpColorMode === 2) {
        this.hsva.s = 0;
      }
      let hue, hsla, rgba;
      const lastOutput = this.outputColor;
      hsla = this.service.hsva2hsla(this.hsva);
      if (!this.cpCmykEnabled) {
        rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
      } else {
        if (!cmykInput) {
          rgba = this.service.hsvaToRgba(this.hsva);
          this.cmyk = this.service.denormalizeCMYK(this.service.rgbaToCmyk(rgba));
        } else {
          rgba = this.service.cmykToRgb(this.service.normalizeCMYK(this.cmyk));
          this.hsva = this.service.rgbaToHsva(rgba);
        }
        rgba = this.service.denormalizeRGBA(rgba);
        this.sliderH = this.hsva.h;
      }
      hue = this.service.denormalizeRGBA(this.service.hsvaToRgba(new Hsva(this.sliderH || this.hsva.h, 1, 1, 1)));
      if (update) {
        this.hslaText = new Hsla(Math.round(hsla.h * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        if (this.cpCmykEnabled) {
          this.cmykText = new Cmyk(this.cmyk.c, this.cmyk.m, this.cmyk.y, this.cmyk.k, Math.round(this.cmyk.a * 100) / 100);
        }
        const allowHex8 = this.cpAlphaChannel === "always";
        this.hexText = this.service.rgbaToHex(rgba, allowHex8);
        this.hexAlpha = this.rgbaText.a;
      }
      if (this.cpOutputFormat === "auto") {
        if (this.format !== ColorFormats.RGBA && this.format !== ColorFormats.CMYK && this.format !== ColorFormats.HSLA) {
          if (this.hsva.a < 1) {
            this.format = this.hsva.a < 1 ? ColorFormats.RGBA : ColorFormats.HEX;
          }
        }
      }
      this.hueSliderColor = "rgb(" + hue.r + "," + hue.g + "," + hue.b + ")";
      this.alphaSliderColor = "rgb(" + rgba.r + "," + rgba.g + "," + rgba.b + ")";
      this.outputColor = this.service.outputFormat(this.hsva, this.cpOutputFormat, this.cpAlphaChannel);
      this.selectedColor = this.service.outputFormat(this.hsva, "rgba", null);
      if (this.format !== ColorFormats.CMYK) {
        this.cmykColor = "";
      } else {
        if (this.cpAlphaChannel === "always" || this.cpAlphaChannel === "enabled" || this.cpAlphaChannel === "forced") {
          const alpha = Math.round(this.cmyk.a * 100) / 100;
          this.cmykColor = `cmyka(${this.cmyk.c},${this.cmyk.m},${this.cmyk.y},${this.cmyk.k},${alpha})`;
        } else {
          this.cmykColor = `cmyk(${this.cmyk.c},${this.cmyk.m},${this.cmyk.y},${this.cmyk.k})`;
        }
      }
      this.slider = new SliderPosition((this.sliderH || this.hsva.h) * this.sliderDimMax.h - 8, this.hsva.s * this.sliderDimMax.s - 8, (1 - this.hsva.v) * this.sliderDimMax.v - 8, this.hsva.a * this.sliderDimMax.a - 8);
      if (emit && lastOutput !== this.outputColor) {
        if (this.cpCmykEnabled) {
          this.directiveInstance.cmykChanged(this.cmykColor);
        }
        this.directiveInstance.colorChanged(this.outputColor);
      }
    }
  }
  // Private helper functions for the color picker dialog positioning
  setDialogPosition() {
    if (this.cpDialogDisplay === "inline") {
      this.position = "relative";
    } else {
      let position = "static", transform = "", style;
      let parentNode = null, transformNode = null;
      let node = this.directiveElementRef.nativeElement.parentNode;
      const dialogHeight = this.dialogElement.nativeElement.offsetHeight;
      while (node !== null && node.tagName !== "HTML") {
        style = this.window.getComputedStyle(node);
        position = style.getPropertyValue("position");
        transform = style.getPropertyValue("transform");
        if (position !== "static" && parentNode === null) {
          parentNode = node;
        }
        if (transform && transform !== "none" && transformNode === null) {
          transformNode = node;
        }
        if (position === "fixed") {
          parentNode = transformNode;
          break;
        }
        node = node.parentNode;
      }
      const boxDirective = this.createDialogBox(this.directiveElementRef.nativeElement, position !== "fixed");
      if (this.useRootViewContainer || position === "fixed" && (!parentNode || parentNode instanceof HTMLUnknownElement)) {
        this.top = boxDirective.top;
        this.left = boxDirective.left;
      } else {
        if (parentNode === null) {
          parentNode = node;
        }
        const boxParent = this.createDialogBox(parentNode, position !== "fixed");
        this.top = boxDirective.top - boxParent.top;
        this.left = boxDirective.left - boxParent.left;
      }
      if (position === "fixed") {
        this.position = "fixed";
      }
      let usePosition = this.cpPosition;
      const dialogBounds = this.dialogElement.nativeElement.getBoundingClientRect();
      if (this.cpPosition === "auto") {
        const triggerBounds = this.cpTriggerElement.nativeElement.getBoundingClientRect();
        usePosition = calculateAutoPositioning(dialogBounds, triggerBounds, this.window);
      }
      this.arrowTop = usePosition === "top" ? dialogHeight - 1 : void 0;
      this.cpArrowPosition = void 0;
      switch (usePosition) {
        case "top":
          this.top -= dialogHeight + this.dialogArrowSize;
          this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
          break;
        case "bottom":
          this.top += boxDirective.height + this.dialogArrowSize;
          this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
          break;
        case "top-left":
        case "left-top":
          this.top -= dialogHeight - boxDirective.height + boxDirective.height * this.cpPositionOffset / 100;
          this.left -= this.cpWidth + this.dialogArrowSize - 2 - this.dialogArrowOffset;
          break;
        case "top-right":
        case "right-top":
          this.top -= dialogHeight - boxDirective.height + boxDirective.height * this.cpPositionOffset / 100;
          this.left += boxDirective.width + this.dialogArrowSize - 2 - this.dialogArrowOffset;
          break;
        case "left":
        case "bottom-left":
        case "left-bottom":
          this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
          this.left -= this.cpWidth + this.dialogArrowSize - 2;
          break;
        case "right":
        case "bottom-right":
        case "right-bottom":
        default:
          this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
          this.left += boxDirective.width + this.dialogArrowSize - 2;
          break;
      }
      const windowInnerHeight = this.window.innerHeight;
      const windowInnerWidth = this.window.innerWidth;
      const elRefClientRect = this.elRef.nativeElement.getBoundingClientRect();
      const bottom = this.top + dialogBounds.height;
      if (bottom > windowInnerHeight) {
        this.top = windowInnerHeight - dialogBounds.height;
        this.cpArrowPosition = elRefClientRect.x / 2 - 20;
      }
      const right = this.left + dialogBounds.width;
      if (right > windowInnerWidth) {
        this.left = windowInnerWidth - dialogBounds.width;
        this.cpArrowPosition = elRefClientRect.x / 2 - 20;
      }
      this.cpUsePosition = usePosition;
    }
  }
  // Private helper functions for the color picker dialog positioning and opening
  isDescendant(parent, child) {
    let node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
  createDialogBox(element, offset) {
    const {
      top,
      left
    } = element.getBoundingClientRect();
    return {
      top: top + (offset ? this.window.pageYOffset : 0),
      left: left + (offset ? this.window.pageXOffset : 0),
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  static \u0275fac = function ColorPickerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ColorPickerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _ColorPickerComponent,
    selectors: [["color-picker"]],
    viewQuery: function ColorPickerComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c02, 7)(_c12, 7)(_c2, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dialogElement = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.hueSlider = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.alphaSlider = _t.first);
      }
    },
    hostBindings: function ColorPickerComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keyup.esc", function ColorPickerComponent_keyup_esc_HostBindingHandler($event) {
          return ctx.handleEsc($event);
        }, \u0275\u0275resolveDocument)("keyup.enter", function ColorPickerComponent_keyup_enter_HostBindingHandler($event) {
          return ctx.handleEnter($event);
        }, \u0275\u0275resolveDocument);
      }
    },
    decls: 30,
    vars: 51,
    consts: [["dialogPopup", ""], ["hueSlider", ""], ["valueSlider", ""], ["alphaSlider", ""], [1, "color-picker", 3, "click"], [3, "left", "class", "top", 4, "ngIf"], ["class", "saturation-lightness", "slider", "", 3, "rgX", "rgY", "background-color", "newValue", "dragStart", "dragEnd", 4, "ngIf"], [1, "hue-alpha", "box"], [1, "left"], [1, "selected-color-background"], [1, "selected-color", 3, "click"], ["class", "eyedropper-icon", "xmlns", "http://www.w3.org/2000/svg", "height", "24px", "viewBox", "0 0 24 24", "width", "24px", "fill", "#000000", 4, "ngIf"], ["type", "button", 3, "class", "disabled", "click", 4, "ngIf"], [1, "right"], ["style", "height: 16px;", 4, "ngIf"], ["slider", "", 1, "hue", 3, "newValue", "dragStart", "dragEnd", "rgX"], [1, "cursor"], ["slider", "", 1, "value", 3, "newValue", "dragStart", "dragEnd", "rgX"], ["slider", "", 1, "alpha", 3, "newValue", "dragStart", "dragEnd", "rgX"], ["class", "cmyk-text", 3, "display", 4, "ngIf"], ["class", "hsla-text", 3, "display", 4, "ngIf"], ["class", "rgba-text", 3, "display", 4, "ngIf"], ["class", "hex-text", 3, "hex-alpha", "display", 4, "ngIf"], ["class", "value-text", 4, "ngIf"], ["class", "type-policy", 4, "ngIf"], ["class", "preset-area", 4, "ngIf"], ["class", "button-area", 4, "ngIf"], ["class", "extra-template", 4, "ngIf"], ["slider", "", 1, "saturation-lightness", 3, "newValue", "dragStart", "dragEnd", "rgX", "rgY"], ["xmlns", "http://www.w3.org/2000/svg", "height", "24px", "viewBox", "0 0 24 24", "width", "24px", "fill", "#000000", 1, "eyedropper-icon"], ["d", "M0 0h24v24H0V0z", "fill", "none"], ["d", "M17.66 5.41l.92.92-2.69 2.69-.92-.92 2.69-2.69M17.67 3c-.26 0-.51.1-.71.29l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42l-2.34-2.34c-.2-.19-.45-.29-.7-.29zM6.92 19L5 17.08l8.06-8.06 1.92 1.92L6.92 19z"], ["type", "button", 3, "click", "disabled"], [2, "height", "16px"], [1, "cmyk-text"], [1, "box"], ["type", "number", "pattern", "[0-9]*", "min", "0", "max", "100", 3, "keyup.enter", "newValue", "text", "rg", "value"], ["type", "number", "pattern", "[0-9]+([\\.,][0-9]{1,2})?", "min", "0", "max", "1", "step", "0.1", 3, "text", "rg", "value", "keyup.enter", "newValue", 4, "ngIf"], [4, "ngIf"], ["type", "number", "pattern", "[0-9]+([\\.,][0-9]{1,2})?", "min", "0", "max", "1", "step", "0.1", 3, "keyup.enter", "newValue", "text", "rg", "value"], [1, "hsla-text"], ["type", "number", "pattern", "[0-9]*", "min", "0", "max", "360", 3, "keyup.enter", "newValue", "text", "rg", "value"], [1, "rgba-text"], ["type", "number", "pattern", "[0-9]*", "min", "0", "max", "255", 3, "keyup.enter", "newValue", "text", "rg", "value"], [1, "hex-text"], [3, "blur", "keyup.enter", "newValue", "text", "value"], [1, "value-text"], [1, "type-policy"], [1, "type-policy-arrow", 3, "click"], [1, "preset-area"], [1, "preset-label"], [3, "class", 4, "ngIf"], ["class", "preset-color", 3, "backgroundColor", "click", 4, "ngFor", "ngForOf"], [1, "preset-color", 3, "click"], [3, "class", "click", 4, "ngIf"], [3, "click"], [1, "button-area"], ["type", "button", 3, "class", "click", 4, "ngIf"], ["type", "button", 3, "click"], [1, "extra-template"], [4, "ngTemplateOutlet"]],
    template: function ColorPickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 4, 0);
        \u0275\u0275listener("click", function ColorPickerComponent_Template_div_click_0_listener($event) {
          return $event.stopPropagation();
        });
        \u0275\u0275template(2, ColorPickerComponent_div_2_Template, 1, 7, "div", 5)(3, ColorPickerComponent_div_3_Template, 2, 8, "div", 6);
        \u0275\u0275elementStart(4, "div", 7)(5, "div", 8);
        \u0275\u0275element(6, "div", 9);
        \u0275\u0275elementStart(7, "div", 10);
        \u0275\u0275listener("click", function ColorPickerComponent_Template_div_click_7_listener() {
          return ctx.eyeDropperSupported && ctx.cpEyeDropper && ctx.onEyeDropper();
        });
        \u0275\u0275template(8, ColorPickerComponent__svg_svg_8_Template, 3, 0, "svg", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, ColorPickerComponent_button_9_Template, 2, 4, "button", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 13);
        \u0275\u0275template(11, ColorPickerComponent_div_11_Template, 1, 0, "div", 14);
        \u0275\u0275elementStart(12, "div", 15, 1);
        \u0275\u0275listener("newValue", function ColorPickerComponent_Template_div_newValue_12_listener($event) {
          return ctx.onHueChange($event);
        })("dragStart", function ColorPickerComponent_Template_div_dragStart_12_listener() {
          return ctx.onDragStart("hue");
        })("dragEnd", function ColorPickerComponent_Template_div_dragEnd_12_listener() {
          return ctx.onDragEnd("hue");
        });
        \u0275\u0275element(14, "div", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 17, 2);
        \u0275\u0275listener("newValue", function ColorPickerComponent_Template_div_newValue_15_listener($event) {
          return ctx.onValueChange($event);
        })("dragStart", function ColorPickerComponent_Template_div_dragStart_15_listener() {
          return ctx.onDragStart("value");
        })("dragEnd", function ColorPickerComponent_Template_div_dragEnd_15_listener() {
          return ctx.onDragEnd("value");
        });
        \u0275\u0275element(17, "div", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 18, 3);
        \u0275\u0275listener("newValue", function ColorPickerComponent_Template_div_newValue_18_listener($event) {
          return ctx.onAlphaChange($event);
        })("dragStart", function ColorPickerComponent_Template_div_dragStart_18_listener() {
          return ctx.onDragStart("alpha");
        })("dragEnd", function ColorPickerComponent_Template_div_dragEnd_18_listener() {
          return ctx.onDragEnd("alpha");
        });
        \u0275\u0275element(20, "div", 16);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(21, ColorPickerComponent_div_21_Template, 17, 12, "div", 19)(22, ColorPickerComponent_div_22_Template, 14, 10, "div", 20)(23, ColorPickerComponent_div_23_Template, 14, 10, "div", 21)(24, ColorPickerComponent_div_24_Template, 8, 7, "div", 22)(25, ColorPickerComponent_div_25_Template, 9, 3, "div", 23)(26, ColorPickerComponent_div_26_Template, 3, 0, "div", 24)(27, ColorPickerComponent_div_27_Template, 6, 3, "div", 25)(28, ColorPickerComponent_div_28_Template, 3, 2, "div", 26)(29, ColorPickerComponent_div_29_Template, 2, 1, "div", 27);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275styleProp("display", !ctx.show ? "none" : "block")("visibility", ctx.hidden ? "hidden" : "visible")("top", ctx.top, "px")("left", ctx.left, "px")("position", ctx.position)("height", ctx.cpHeight, "px")("width", ctx.cpWidth, "px");
        \u0275\u0275classProp("open", ctx.show);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.cpDialogDisplay === "popup");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (ctx.cpColorMode || 1) === 1);
        \u0275\u0275advance(4);
        \u0275\u0275styleProp("background-color", ctx.selectedColor)("cursor", ctx.eyeDropperSupported && ctx.cpEyeDropper ? "pointer" : null);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.eyeDropperSupported && ctx.cpEyeDropper);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.cpAddColorButton);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.cpAlphaChannel === "disabled");
        \u0275\u0275advance();
        \u0275\u0275styleProp("display", (ctx.cpColorMode || 1) === 1 ? "block" : "none");
        \u0275\u0275property("rgX", 1);
        \u0275\u0275advance(2);
        \u0275\u0275styleProp("left", ctx.slider == null ? null : ctx.slider.h, "px");
        \u0275\u0275advance();
        \u0275\u0275styleProp("display", (ctx.cpColorMode || 1) === 2 ? "block" : "none");
        \u0275\u0275property("rgX", 1);
        \u0275\u0275advance(2);
        \u0275\u0275styleProp("right", ctx.slider == null ? null : ctx.slider.v, "px");
        \u0275\u0275advance();
        \u0275\u0275styleProp("display", ctx.cpAlphaChannel === "disabled" ? "none" : "block")("background-color", ctx.alphaSliderColor);
        \u0275\u0275property("rgX", 1);
        \u0275\u0275advance(2);
        \u0275\u0275styleProp("left", ctx.slider == null ? null : ctx.slider.a, "px");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.cpDisableInput && (ctx.cpColorMode || 1) === 1);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.cpDisableInput && (ctx.cpColorMode || 1) === 1);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.cpDisableInput && (ctx.cpColorMode || 1) === 1);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.cpDisableInput && (ctx.cpColorMode || 1) === 1);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.cpDisableInput && (ctx.cpColorMode || 1) === 2);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.cpDisableInput && (ctx.cpColorMode || 1) === 1);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", (ctx.cpPresetColors == null ? null : ctx.cpPresetColors.length) || ctx.cpAddColorButton);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.cpOKButton || ctx.cpCancelButton);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.cpExtraTemplate);
      }
    },
    dependencies: [SliderDirective, TextDirective, NgIf, NgForOf, NgTemplateOutlet],
    styles: ['.color-picker{position:absolute;z-index:1000;width:230px;height:auto;border:#777 solid 1px;cursor:default;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#fff}.color-picker *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin:0;font-size:11px}.color-picker input{width:0;height:26px;min-width:0;font-size:13px;text-align:center;color:#000}.color-picker input:invalid,.color-picker input:-moz-ui-invalid,.color-picker input:-moz-submit-invalid{box-shadow:none}.color-picker input::-webkit-inner-spin-button,.color-picker input::-webkit-outer-spin-button{margin:0;-webkit-appearance:none}.color-picker .arrow{position:absolute;z-index:999999;width:0;height:0;border-style:solid}.color-picker .arrow.arrow-top{left:8px;border-width:10px 5px;border-color:#777 rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0)}.color-picker .arrow.arrow-bottom{top:-20px;left:8px;border-width:10px 5px;border-color:rgba(0,0,0,0) rgba(0,0,0,0) #777 rgba(0,0,0,0)}.color-picker .arrow.arrow-top-left,.color-picker .arrow.arrow-left-top{right:-21px;bottom:8px;border-width:5px 10px;border-color:rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0) #777}.color-picker .arrow.arrow-top-right,.color-picker .arrow.arrow-right-top{bottom:8px;left:-20px;border-width:5px 10px;border-color:rgba(0,0,0,0) #777 rgba(0,0,0,0) rgba(0,0,0,0)}.color-picker .arrow.arrow-left,.color-picker .arrow.arrow-left-bottom,.color-picker .arrow.arrow-bottom-left{top:8px;right:-21px;border-width:5px 10px;border-color:rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0) #777}.color-picker .arrow.arrow-right,.color-picker .arrow.arrow-right-bottom,.color-picker .arrow.arrow-bottom-right{top:8px;left:-20px;border-width:5px 10px;border-color:rgba(0,0,0,0) #777 rgba(0,0,0,0) rgba(0,0,0,0)}.color-picker .cursor{position:relative;width:16px;height:16px;border:#222 solid 2px;border-radius:50%;cursor:default}.color-picker .box{display:flex;padding:4px 8px}.color-picker .left{position:relative;padding:16px 8px}.color-picker .right{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;padding:12px 8px}.color-picker .button-area{padding:0 16px 16px;text-align:right}.color-picker .button-area button{margin-left:8px}.color-picker .preset-area{padding:4px 15px}.color-picker .preset-area .preset-label{overflow:hidden;width:100%;padding:4px;font-size:11px;white-space:nowrap;text-align:left;text-overflow:ellipsis;color:#555}.color-picker .preset-area .preset-color{position:relative;display:inline-block;width:18px;height:18px;margin:4px 6px 8px;border:#a9a9a9 solid 1px;border-radius:25%;cursor:pointer}.color-picker .preset-area .preset-empty-message{min-height:18px;margin-top:4px;margin-bottom:8px;font-style:italic;text-align:center}.color-picker .hex-text{width:100%;padding:4px 8px;font-size:11px}.color-picker .hex-text .box{padding:0 24px 8px 8px}.color-picker .hex-text .box div{float:left;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;text-align:center;color:#555;clear:left}.color-picker .hex-text .box input{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;padding:1px;border:#a9a9a9 solid 1px}.color-picker .hex-alpha .box div:first-child,.color-picker .hex-alpha .box input:first-child{flex-grow:3;margin-right:8px}.color-picker .cmyk-text,.color-picker .hsla-text,.color-picker .rgba-text,.color-picker .value-text{width:100%;padding:4px 8px;font-size:11px}.color-picker .cmyk-text .box,.color-picker .hsla-text .box,.color-picker .rgba-text .box{padding:0 24px 8px 8px}.color-picker .value-text .box{padding:0 8px 8px}.color-picker .cmyk-text .box div,.color-picker .hsla-text .box div,.color-picker .rgba-text .box div,.color-picker .value-text .box div{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;margin-right:8px;text-align:center;color:#555}.color-picker .cmyk-text .box div:last-child,.color-picker .hsla-text .box div:last-child,.color-picker .rgba-text .box div:last-child,.color-picker .value-text .box div:last-child{margin-right:0}.color-picker .cmyk-text .box input,.color-picker .hsla-text .box input,.color-picker .rgba-text .box input,.color-picker .value-text .box input{float:left;-webkit-flex:1;-ms-flex:1;flex:1;padding:1px;margin:0 8px 0 0;border:#a9a9a9 solid 1px}.color-picker .cmyk-text .box input:last-child,.color-picker .hsla-text .box input:last-child,.color-picker .rgba-text .box input:last-child,.color-picker .value-text .box input:last-child{margin-right:0}.color-picker .hue-alpha{align-items:center;margin-bottom:3px}.color-picker .hue{direction:ltr;width:100%;height:16px;margin-bottom:16px;border:none;cursor:pointer;background-size:100% 100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwkUFWbCCAAAAFxJREFUaN7t0kEKg0AQAME2x83/n2qu5qCgD1iDhCoYdpnbQC9bbY1qVO/jvc6k3ad91s7/7F1/csgPrujuQ17BDYSFsBAWwgJhISyEBcJCWAgLhIWwEBYIi2f7Ar/1TCgFH2X9AAAAAElFTkSuQmCC)}.color-picker .value{direction:rtl;width:100%;height:16px;margin-bottom:16px;border:none;cursor:pointer;background-size:100% 100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAACTklEQVR42u3SYUcrABhA4U2SkmRJMmWSJklKJiWZZpKUJJskKUmaTFImKZOUzMySpGRmliRNJilJSpKSJEtmSpIpmWmSdO736/6D+x7OP3gUCoWCv1cqlSQlJZGcnExKSgqpqamkpaWRnp5ORkYGmZmZqFQqsrKyyM7OJicnh9zcXNRqNXl5eeTn56PRaCgoKKCwsJCioiK0Wi3FxcWUlJRQWlpKWVkZ5eXlVFRUUFlZiU6no6qqiurqampqaqitraWurg69Xk99fT0GgwGj0UhDQwONjY00NTXR3NxMS0sLra2ttLW10d7ejslkwmw209HRQWdnJ11dXXR3d9PT00Nvby99fX309/czMDDA4OAgFouFoaEhrFYrw8PDjIyMMDo6ytjYGDabjfHxcSYmJpicnGRqagq73c709DQzMzPMzs4yNzfH/Pw8DocDp9OJy+XC7XazsLDA4uIiS0tLLC8vs7KywurqKmtra3g8HrxeLz6fD7/fz/r6OhsbG2xubrK1tcX29jaBQICdnR2CwSC7u7vs7e2xv7/PwcEBh4eHHB0dcXx8zMnJCaenp5ydnXF+fs7FxQWXl5dcXV1xfX3Nzc0Nt7e33N3dEQqFuL+/5+HhgXA4TCQS4fHxkaenJ56fn3l5eeH19ZVoNMrb2xvv7+98fHwQi8WIx+N8fn6SSCT4+vri+/ubn58ffn9/+VcKgSWwBJbAElgCS2AJLIElsASWwBJYAktgCSyBJbAElsASWAJLYAksgSWwBJbAElgCS2AJLIElsP4/WH8AmJ5Z6jHS4h8AAAAASUVORK5CYII=)}.color-picker .alpha{direction:ltr;width:100%;height:16px;border:none;cursor:pointer;background-size:100% 100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwYQlZMa3gAAAWVJREFUaN7tmEGO6jAQRCsOArHgBpyAJYGjcGocxAm4A2IHpmoWE0eBH+ezmFlNvU06shJ3W6VEelWMUQAIIF9f6qZpimsA1LYtS2uF51/u27YVAFZVRUkEoGHdPV/sIcbIEIIkUdI/9Xa7neyv61+SWFUVAVCSct00TWn2fv6u3+Ecfd3tXzy/0+nEUu+SPjo/kqzrmiQpScN6v98XewfA8/lMkiLJ2WxGSUopcT6fM6U0NX9/frfbjev1WtfrlZfLhYfDQQHG/AIOlnGwjINlHCxjHCzjYJm/TJWdCwquJXseFFzGwDNNeiKMOJTO8xQdDQaeB29+K9efeLaBo9J7vdvtJj1RjFFjfiv7qv95tjx/7leSQgh93e1ffMeIp6O+YQjho/N791t1XVOSSI7N//K+4/GoxWLBx+PB5/Op5XLJ+/3OlJJWqxU3m83ovv5iGf8KjYNlHCxjHCzjYBkHy5gf5gusvQU7U37jTAAAAABJRU5ErkJggg==)}.color-picker .type-policy{position:absolute;top:218px;right:12px;width:16px;height:24px;background-size:8px 16px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACewAAAnsB01CO3AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIASURBVEiJ7ZY9axRRFIafsxMStrLQJpAgpBFhi+C9w1YSo00I6RZ/g9vZpBf/QOr4GyRgkSKNSrAadsZqQGwCkuAWyRZJsySwvhZ7N/vhzrgbLH3Ld8597jlzz50zJokyxXH8DqDVar0qi6v8BbItqSGpEcfxdlmsFWXkvX8AfAVWg3UKPEnT9GKujMzsAFgZsVaCN1VTQd77XUnrgE1kv+6935268WRpzrnHZvYRWC7YvC3pRZZl3wozqtVqiyH9IgjAspkd1Gq1xUJQtVrdB9ZKIAOthdg/Qc65LUk7wNIMoCVJO865rYFhkqjX6/d7vV4GPJwBMqofURS5JEk6FYBer/eeYb/Mo9WwFnPOvQbeAvfuAAK4BN4sAJtAG/gJIElmNuiJyba3EGNmZiPeZuEVmVell/Y/6N+CzDn3AXhEOOo7Hv/3BeAz8IzQkMPnJbuPx1wC+yYJ7/0nYIP5S/0FHKdp+rwCEEXRS/rf5Hl1Gtb2M0iSpCOpCZzPATmX1EySpHMLAsiy7MjMDoHrGSDXZnaYZdnRwBh7J91utwmczAA6CbG3GgPleX4jqUH/a1CktqRGnuc3hSCAMB32gKspkCtgb3KCQMmkjeP4WNJThrNNZval1WptTIsv7JtQ4tmIdRa8qSoEpWl6YWZNoAN0zKxZNPehpLSBZv2t+Q0CJ9lLnARQLAAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position:center}.color-picker .type-policy .type-policy-arrow{display:block;width:100%;height:50%}.color-picker .selected-color{position:absolute;top:16px;left:8px;width:40px;height:40px;border:1px solid #a9a9a9;border-radius:50%}.color-picker .selected-color-background{width:40px;height:40px;border-radius:50%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAh0lEQVRYR+2W0QlAMQgD60zdfwOdqa8TmI/wQMr5K0I5bZLIzLOa2nt37VVVbd+dDx5obgCC3KBLwJ2ff4PnVidkf+ucIhw80HQaCLo3DMH3CRK3iFsmAWVl6hPNDwt8EvNE5q+YuEXcMgkonVM6SdyCoEvAnZ8v1Hjx817MilmxSUB5rdLJDycZgUAZUch/AAAAAElFTkSuQmCC)}.color-picker .saturation-lightness{direction:ltr;width:100%;height:130px;border:none;cursor:pointer;touch-action:manipulation;background-size:100% 100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACCCAYAAABSD7T3AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwksPWR6lgAAIABJREFUeNrtnVuT47gRrAHN+P//Or/61Y5wONZ7mZ1u3XAeLMjJZGZVgdKsfc5xR3S0RIIUW+CHzCpc2McYo7XGv3ex7UiZd57rjyzzv+v+33X/R/+3r/f7vR386Y+TvKNcf/wdhTLPcv9qU2wZd74uth0t1821jkIZLPcsI/6nWa4XvutquU0Z85mnx80S/ZzgpnLnOtHNt7/ofx1TKXcSNzN/7qbMQ3ju7rNQmMYYd/4s2j9aa+P+gGaMcZrb1M/tdrvf7/d2v99P9/t93O/3cbvdxu12G9frdVwul3E+n8c///nP+2+//Xb66aefxl//+tfx5z//2YK5Al2rgvf4UsbpdGrB52bAvArXpuzjmiqAVSGz5eDmGYXzhbAZmCrnmzddpUU+8Y1dAOYeXCtDUwVwV7YCGH6uAmyMcZ9l5vkUaBPGMUZ7/J5w/792/fvv9Xq93263dr/fTxPECeME8nK5jM/Pz/HTTz/dv337dvrll1/GP/7xj/G3v/1t/OUvfwkVswongjdOp9PzH3U3D3zmWGnZVXn4jCqs7wC2BKP4/8tAzkZsoWx6XrqeHZymvp4ABCBJhTQwKfDT8gzrZCIqi5AhiACjBfEB2rP8/X63MM7f6/V6v9/v7Xa7bYC83W7jcrlsVHIq5ffv30+//fbb+OWXX8ZPP/00/v73v4+ff/75JSvbeu+bL2WMMaFbAlpBNM85QX+ct6qoSqkPAwuQlBVKqGNFSUOAA3Bmu7gC5hNOd15nSwvAOUW7C4giUCV8Sgn5L9hNFIqTsp0GxI0ysioyjAjkY/tGJVEpz+fz+OWXX+7fv38//f777+Pbt2/j119/HT///PP49ddfx8fHRwrmTjV779EXu2px2xhjwtdJZQcAWQIPLPISsMJaSwiD8gzIKrwSyATE5j5nAbR5c1dBUwBlsEWW0h6LqiYsqFPAQxCyRZ3wOSARxmlXMX5k64pQfvv27f75+dk+Pj5OHx8f4/v37+Pbt2/jt99+G9++fRsfHx/jcrmUFLO31gYDWblxRIs/TqfT7ousxJsAxXA2Gc7TA9XdgfdoHbFsj76X2+1WArgI1ageGwA3qupqoHsmcbI6Fu93quggFa9d7LeDtgKfAFHBJ+NEByIkcJ5KervdTmhhGcgJJSZ5vn//fj+fz+18Pp8+Pz/H5+fnmGD+/vvv4/v37+Pj42N8fn6O2+1Ws7JjjP6wraMI5E4RZ8x2vV5TSwkquotV7/d7Tz6HFWsD/qNcdw0CQ3q/321c686TwDVIdbuy73zNldhSHb8I2klZznm+InBS4U6n0302aBFsLhHDAKJVJVglfI9jhvu53W53sLANYNxAiDA6MCeUHx8f9+v12i6XS7tcLqcZW57P5yeY8/fz83Ocz+fnsSmYUyknWEG85WBst9stzSLyMdfr9Qi08iY15UZ0LlDGLhR3o5zK2j7OPUTD0E+nU3tk7Xb/16NFbhloAMuY1zjLUOO3BKeIDe+Z8s3/J4gFo4TM5jPmuRg28foUKKVSwo16TgA5npywcWLHgYl/Pz8/73/605/ab7/91m63W7tcLie0sZj4mao5gTyfz88E0f1+j8EcYzwTPEG2cqjyfHNF0M8fuqEiaOVnRzZZQNh5fwQyHg/HDGfJo89Q1zb/quu5XC6773I2XKfTqd/v9+d3wuqWva/YTdUdEV3fhIv/Viyps6YE3x3r43K5bJQS66zaxVGFsvd+//j4aF+/fm3fv39vt9utff36tf3+++/tdrudvn37ZuNLBaaCMgUzC+rZRiFowxUuJI8YMqcCp9Opq5vagaYU6lGJA1XQqejchw6Cj0Gw5nYBrGw01A2O206n04BGouNNyTfp/FwElhUey6nXrIKw7QQWddxuN2ldL5fL839gSPF8ahu/JvBO48CPSuqMf8Vp9/P53L58+dLu93s7n8/tfr8/39/v9/b5+TkhPJ3P56mQ436/j+/fv+/iSgbzer0+AZx/5+88bv6OMda6S5z6kd21fYC9dxv7cIJJ2d9AOS30fPMzyHiTM8B4DF6XUlYHp4KQW3W+1t77MNB1vGHxWq7Xa7vf78+y5/N5A+H1et29xuP5dbYtyaRu4AksbPq6936fjRzXRxBbPr/b+b18+fKljTHaBBBfn8/n0/1+H1++fBnn8zm0sB8fH5u4cr5GuBhMVk0EEn9RsctgVhM+ixlJtMA23R8B6yysAstBOgFXIKKCMIgToMqNEu2fYMH7ztc732dQKkCj1ytAZtY0Kx8pIr8GGJ+AT3V+2Hirhl++fBmXy2Wz73w+b17P8p+fn8/tUwGVleVkTyUb68DkfayWY4zxNRihU4EpLJPZVrK+u7J4/mgfKqeLW9X2REWlItL1diynbDDb3+jXgYjQqn0rrxWc+NkILP7F7xIbMvx7vV53x40xnlbWJF12ZSag/N0pW6t+ZzmOMzHjajKwDfond78zYTdfq18up97zr2q8v3IioBprRtBl0EZ9og5WBRGOdOHjIjXF7UotFbgOWnXzIJyzYvjG5IYgsmMOxHkz8OsMSrVNWeq5T8DaOcbEv1Od5rbs9aO7YvMet63EkF++fMExq+MRl4/L5bLZN/+ez+fnZ6KazuMqXSQVO5spJXflHAIzes/xJseckRJiDMog9d6VfRrqXMr6KpVV27jRwJacGovOAM1zMdQMnwK1AubK63kdCChvI1C7g0z9nf/D+Xze2Vj8H7Gx4P9duQlsYCrqyN8XqG3Hm/10Oj3jw/n+crlstuM+jPmmxT2dTuPz83Pzt2pn1XsEHX/bnPaVqVmh0xwOt0o6XLLAHePUU203wHfcrspCwmV3TryB5s0Mseeg97x/BwzCjBlbB+pRAPla0BVQuT6V6QHdBlj3d0KG147b+DqxQeUymDO43W4dQar+TIjwmAd0z8/h65vf0/yLv3Pb5XLpru/ydDo9s7ET0I+Pj6dKK9VUEIeKWQWPAOrJ8LKd4vE+t91Y3e7UFlWatg2VwJnb+HPmtvm/sfK59/OaWF3x/eP1UPHvA5DDYDpYXfb0drv1V2DkBkxtw/tEWVVlXWdC9pFYs5/jfh9dS/16vW7s6lTG+TfqsxSJHxkXXq/Xdr1eu4LsfD6P3vsT3N77DkL+zPm5jSdKL4zR3AxQd6rHkLkYlSowsrq7znzu6wSwdsMJOXmA5fBcjxtgMGBYHlr5zokhtsMCTgXLQOW4XC6dEyEMprL8mAQzXRgduix2yZzorxkYsDn3hB1VeMLGsXsVtgl2pW8S3svk0vw7R4hNaHvv4cACl5HFzwIH0Kc6zu4XjDPR/jpAVxWzO1Xk2DDb3vTcxeGU1iWZHkmIDWziWKvirCJ4Dravs6IJ/GG6cTqWdXDy+fArQDVVkLqkVjAoZIITdmmIqXwqa95N3+MGYoZQdRVNO53Y1xRkhO16vY7eu507Ca9lJnbGpxOemQhSw/AQsmmp5zU9BiU8G6wvX76M6/U6Pj4+do0Bz4CpgiknTUeDqwlKBmg3u4OVjrZ1A+rAcgaejWq6eJCvCYFDONSwOgHX4EQRw8lxbzDOdEK6gZ3Hk1b+8g2o1JFtKXyv/fEdTXuWjWXdAZiBp6ADeDrCFiim7B6ZFneeI7Gvm/PMkUDX67W7xI8b0D7/v8dA9qfN5oaCf74WZjH0mf1cmfY1Y0JUFmVrTWu8uzkNcLtEj7u5FXBTkfC6GOA5q8YMxO8KVvF6sAVGdcrUbsKODcQKkLMOMdmlxum642YrPm26AlhZW1YB1R+rrGswE8TaYAWeUMxdf+WjwSvZ2Ef3ytOyfn5+PpVPAaqOn43MtNBqvmjjxbjM4lZjZY4gqNMI5ktaW/sYKNwS+9lFQzGihmMCKPa7+Z0V6Eb0GRmobtpX8JljWu5FMLN5ja6hG9kwQgZqf5+1NH5UxzkFReCdWhJ8XdlGUkxO7HRlYRm4mVO43W7ter12TPJEw/rmEN3L5SKHIWZg9mz+pUoKOYq5bJTJdX2gme1UcxMZQFaEQIlHct32M+Y1BzGkGuzfiyAN9z+ugplZ1symCrDCYYkGxDTpI9RzBy0rHyeDUC1nWaeUaD9n4xkNyYMBDZtzZ3B++fJlY21XFDOcARJlabOyiS3uCpLI9jrZjCDkaVvcCCjwognKShWdzXZWlZMvVTgD8LpqlCLrqgbcB+qYwrgKYpT0ccCqbKyCValkEabn/FynogCrPKfqf51xJ7sGB2ZXcZmxoSOztjx300DZi7a0/2AIR0UlBag9SuDw6KcAzlaB7vHZvWpjK90dyrq6bKyDUZQbR0B05biLQkHIcSUmgIK+SwuqgHCnoio2RQU1yj+BnBy9pphVKLGyC7ZzFK1pxWK+E8IhVCWLN/uLtnUU4ayoYLoaANz8FdtaSvY4pV0BEW2ls61czqllBKpTyKgMAhrZ1cdc1RROtPmvWNkdcKZ7ZKxaWjiPLJMpp7OZKxA+rqG/oJLjxf0pnJlqLoDZo3gyU0mKGys2taKecj/d1C+rJSplBqlTyAqgR+D8KjKlmRL2gtUcAdCtsL+ijCNT1oqqqkH2OHEbG5sDFnUg5Aa+yLou2VU1ptj1S2ZQqv1ORZN9IWzRfgaRBxKoBE8UWyqlJFtrIc0AxNjSjed99CTY/XDfSzCz5M0IZoVEsWnPFNTsl8ooVC1TzbGgqFZNDSgVwKK+1sGDMKqxZCWGVMDysiEr1jVSQJUYwj5iHOlThdHt44SQg9CN+nl8D90NMIgAdgr46JqRiR9I8vRdFvbr17m/yxUMKjNLMiVUADwu2CWGhhi+F55TWM9M9cogzms1dnM4uOF/LAEYWdcqnM7yFmyq3IfwmOROd7Y1iFWtOjoY8To41mTV5IysgFFuRzsbWFGbNIIJCDv1dOo4lZG7jWBwRFtVTKuWyeCByJKOan8oZ3ep9XddNl0tDuaywLz9cXPYeDAA0SpkBO9sbVcTOVWldPv4uyzEkzxHtjvonHoSkFEWNoo1d8DhcQputd2ppNon4BzoAiJ1hBFQg0dVtdbGHHDQWushmNEQukLM2QO1G2Y8bgTXqFhcBJj7EjPgcPts8US8qPpPB/dXznOh5Z438tzH5ec6QgrOKrRRfKmysBmUDB+PhYabMlVPER+GCSITTzr7am2tArH3bgcEzPJm+cr5jJ4NnHNFDVrFXcI5Le9k5Jnw+bedbV+FfRzZIHaOOaOsLY0/7UGs58DjrGwKMIMFIGzOEW1/jGsdAtCN6hEAI4hBe9YXeRROBSVPAVPAqvIM5bx5hVKWAMP6zBRy3iescridVdFBinBxXDnG2GRY2XbCvp1lhvGtO9Bxu5h908XQu42lnSArMFdizMim8uwRCxPGnnOS8lwpnbOiDqTAjsrRN/PcoAScCbaACqVM40ylnjjTBs+bwWlAG23/UKbdkiwKWIQPGzWaczpoSlxPEj822cNWkpS7FyzsDrqpfgpG3jahw2vgbaSQAxuLWZYt7JzyNe8JoZpNAcvDFOdw0wqYT9AK1rZz/DdbSlLPp0ryIxgQJlK9AZlEq7IOXpohg9PIhrCng88JsOxiV4ZWAYfg4sikx/8ky2Z9l862uqwrfscIH8+ugTmVGyiddeVYUgEMn4GZzg14EwIsh9sx2cKKiWXReuOE5gzGOQgdlRKVVdlevqb279Xq0Qnsts2VDaBO0coezsruWtHApu6sKG4IBhN0aGU2kLrMKGRTN3HmbCDwKV14zvkMEDG4QfZVspVlaNU2mhc5TEZ3N1h/zqTheuLpW05ZWTGVjb3dbnNmxKZBnN8JqidaVLKAOyARNLS+MB54Z2+VaqoMLKroVBlngefnTPAcoHNWCSvlfA8CI0HEmBNBnBlXyMrzU7A7WVm94PPqQ2gmqKx+WDGsnvilmcSOBJqOK1nYyAIzuAyesq3UdSK3KfWcYKD95HmfYOU3qser2CtYEUA+FpfqdNvgPBZUBhDrGONRVlQsh8rLcaUCykHG0OOUwTlLBrsh5soEMGezi1E4HRVt1icp5wZEFXdibCkG8Y8vX75sbO4E0iom9z+hjSiOfy3DhpXItpVhE+UGQdvoWjtChmrGHf4YAzKgBNnGtuJxFCeGdhUAfQLLK8kBYAP6gvFJZajMG3Xkycy8KuC0q4Eyymwtwdxdv2M0mIBtK0LKnf640j00Auq4gUkdWGlhs22qJc6dZCsL19oxnlTJG4SYVRIGpD8TPFBuM6OElbS1pldid4mGAyN6ZIupbC5bXJN9fdpbThSxLUaI8IG1XIYBxW3Tjs6KQosKcxfxcQmdnwRGM10GnFcCy2XYunLMyAkdgk4mePiczsLygthcBut6goOqS7YVFXADLjaosB6s6ofcZWAZSIRYqSUkizYwttYab3vUOQ9w2HRxIIg8WwRVeE68xi4UtL3zRphxplzwuZrcqYCq1I3jPI5dnJIygEohMbPqVJSzrwzxBJTs5zN+ReUSgxikPQVF3JVBeNQxbHENrEMNvEdFZVV9lH9+ORGEsNZQpyTNc4C3AG7XF4ngzq+DrO2zbuaaOXgdaFcdkEotoSFBVX2qJ0C8OWZeG4KGlpghA0XfTOPCqV2qqwQ26QWfF2PMLhI2w1lVAa2aPsYd0za25MQRwgcZN6uQDCi+ZxiD4XEM2kZxOT41FnZnaRlcpZouzlRqqdbQVWopQoSB58RV50lBNrHi/AwXS5LrwDVlpY3Fc3ByiYGc52Trist6kOXdwInAQtJpp5QchyaquYOV7Su+fxVMaV3dc0RE2S6mUY0gLt2pMcYqrKIQ9w2l1gpQUMtQYcmmbt5DTNxdhnUCjQqtbK9SUSzvrC0mmhhE1e2FS2+oxypy/ZASutkmtjx3vcBC24PX65nbqkBCRhfjS9kIYPnee8cMagVOhI/3T1fAmdtAWZsCswTJCkQVNa0qWKSKPOpHAUhD9DrbVcyoYkwqhvh17vYAayXLQyKGYdxlUDFp494rBXRjYgO17DDYetNIUj/ezp6S0lnlpEwsWmJMkOwsKXeZKEAjIHn0EQJISaRBcO6UMINz7p/bEjjnw4ft+xmDvksxX4G2rIris7qaeKwAFMP2Oi7n4criuZwtpSUwpfLxSnORSrIqusc5ZFaXysqRWjiZ2DyAWEIL35tVSoQElFACjOeGGSE7AHEQgdo/LSvCOgGBvkxsmDbvlS3Fp5vhaB2TAGqRKrKKMrhLVpaGzEVjZ0OQxDhaCTA+QyRR1d15aQzrJntL3RibsipjG6jlgL4yqbS0sNYg1e84vhbBVrElK64CUcWYXDfKxhpIuxiVJZUxsbMy/uRBKTNRQ4kQ3LdRYLS0rJjRPlTPqY6gdJsEDc+aQXAn+HgsNUCbRuF0Oj0zwnA7bWDkbhO5Ens00qeQhS1laBMl5M/cAaxsLF8rKyql+Tf7ELLEGu/ixiimdCvo0TjfpjKwaggen4eh5v7LokLKbLuyvHhcZG8dhGrEDx7Hg93ZppJF7qBqO3iVveXEDQNInzeoe8Yq6ePaZBZ2JviM3W2UAGotekRCAGq4EkF1X3DOnR11yRsBL1tRa0PVcZiNFXZ2c34FskvomInQQ6lzpJoZbJxk43NwKJFBquJSsrByHydxKOnTxQASBmS3j+JMnsHSla3Ec6K9VWoJVn9zfjwOM7hqYAAqJQwE2a3nA48J2QGegRkpZNivSY+ys3EkKd4oJIwsvIHl3cWgLt5k4NH6OmtLWdpurOkwEMupYc7eMtDRhOcI2ui5JhVIzXzLyto/GAPuZoyo8wkoduVgJglCt7OhGbgID4Mq4si+63zUS1FuFFXFlqyaj2emHlLMcBqYu0FMuR28BbB7lOxRMSiCQXFhCKuwkhZ+pYDiGSgbsKKV8MiSRsuHSIWM9rklRiIlZZuqXjsQK8ooYJMgq3JKWVkhHbhsVxFUzthOWPkYijcbx54IKsSdT+uLr3crGKyoYgFiGR9iBk4kfloUX+JIlQRQqabmpgnhqtpQpb6RVQ1WH5DnrS4hEoGZqaerQ2dhFbz8XePxShmDbo70eISjoorO2vK8SJXI4SUmEU4zWKDzUDtWTYw7xXlbSTEj4FRg7zKnKoGRALv0Gs9Tgc1BpCywGZRQAtqVz2xrBcAMzEpfZwFSa2G5W0QBFjSMapWAEFa3HcGN7CxDzECyIkJ97qwrqWNTWVo876PPsjPkj2wvgroM5lLZKMETKVql/CvnWVFiFa/SzJUQwkoZsr67Y6vlSRV3/2tmNTOY3vnaxYwMuoPKqdzR1w7IqHymlPxaAThfU7Ko2ZXYj4AYJHL+kNdKwRQYESTRa5fsUZ/rVC1TMTyWVyYoqNtuzaHsMyv2tvoarxdfqwYgU1axFo/cnql1FGsqK+uAROV8BX4GU8WcZTATi2q7Qcyi0O0V+GhWBMNRUkn8H1SsWVE5By3Gi0ECqUeJoBfAtDa4amkdXG37AGP5Ggeb84p7UazpoKRzdFzeQ8HkoHGxprKy/Hpm5t12p47J6xTYDEz7uINEXSuxYXvFskYAc+ySxH9sf5ftKzU6IbwVBcUGg5e5FMCEXSErZR0wGayV19woM9guPjTqJdVTqR4uE4nJnLldWVkECCZLd2VLF+xtamex7IpiriSDUpvrpn9lrwGMCHyppMH+ps6LILsuFGUj1XEOXiqbqSHPUKnClpWV68kqtURVNDY4TNaocykoYeTU5ngGEQa/S1DnnE4AeXMcKjHPAmFVjCBENaeyLVNHfr3px8xUstJ94hIpfH4HKE/eDaArK6lSyVVFbdt1gxTIVk3pppVlFXi4pEhVBTObquohU85MLXn1iahvUkHJjSCMc01tLFveVVBx0DodM6jftCu7DOtIzYxrc0qp1JGP2ayYFz2Gb6HvMrO8cnGtV6Gjm3uImSfD2GpWK6uowbZGMxFKQCo1pOMtcMXFpRst+hXGoAomF3sSTBGgTglbBKWwsQ3tZqaYSp0Z1CimRDWFcCJUPYJ00BI5FkKYNoifuQxmN88SWVXWLMaUqqqgC0BmQJR6sk3u9NCf6jYLXxAfqsYEgVLAhRY2AtgtflZNFmFyhxdrLkAdWlk4D88M2ixHyepIdhMHrG/iR1ZGtq0MGpbDbRPYOXeSY1M6Ny4ZstvGSktK+XbFPATj2D371saPEsAMXhXrsZ0km/XStkhhMyBfsa6uXFZe2VCe+YMr1+GKgwrQyNYq1VRrB+EizAow6NsdNKcyVEkYeM73ys6q4kAHp6BiFklTkIrVC5oYV7uzwOGCz4UJ0Stq2lWMJy4wtb+RetL6tZFicnJmBw5UjCvXXMZVJX2MQkbf+XN5EWd78Vz8/JEsMZTBiKNzsm1inLRUQ74H4NidaqI68j5sAFgxcRveC7ieLJXfQYxjZZ2CsiWFewZXJmBIlZ1tdtrX4hSuateKso/RZOtOKW2nmq1oTzeK6dRWAWu2NRVb4hq0SXm1GvtugHrbr5IXqmSktg5CuDE2MSlPwsY5kNE2Wp3AqiZbWVLAxiBF+2iBZbuNj6MB6rsMLC7FyasaYDyo7KkoPyEtw3pEMXfPvxAJi2jAQQgjrz0rLIZSWZlIoNhwd5xK4AR9mYNjWAaLrnuImJeBVN9zBORObVvbr+mTTfFSEJLSRnHo7hEJoIi8MFqjxmvgmF5URZz4zLFgZZ8Ctu2X7ggVccKm9gVxIsOHqxXgNMKnFWZYnf1dBnOhayXq17QwFlWW09eNKyVJFmXqaONGA5aCegMbJ3UUkGY1ic3nKWgjq8qfVYGQG1gRt6rs62a6HiqqUOqdesK5NmX4nGofJoiE1d0dF9lVVkvT1/kEEaaCoYOwFpcVcoLM+7669PxC9rWqktH0sWUYld0VCpuBZ/stVRcGgy9WX2+U1Qthi9SzAqSxzZsy+OiFzBYnySGV6Gku44rD8BCOZBV3BvD5+AKRHNwMEsB6EzHnJpkTAeiUlEGkcECeB6GDZTp5YEJTlvdrknxYjTllMkfNtXwDjM7uVjK5JXUUn43rrqpK2jytaxHW0M5G8DC8rtHMYs7KSgduVQMGTYFqFvVS6rkD3sDJ46afdYFwoq11AOKCBLhvwoUgc8IGANycR6knZrdJPdsuxnyjfd3FovTlRMdEdtOl5CMV5EHsXQBis7TOwvIDZaGj2Vnpbh7cpK63VwYEMLwqbjzyl699sawFFkF1yqjUU31HfC6sW1ZFVFuXVXVgz9keEaw0ys1lWfm+azQAQSWA+hKYVfsZjPncAcUB9oIayy/UZXRNckDGji77GsWbvBo6tPrWPqOyVkBUq+INeqpzNdYs/u0ifh5qmpqIW+33JVSUcwY70KL4U9lYdU6ljtSls7lmfi9g3YzeQfVkaGFaV3ODCnaD2N8wsEDFklE3RzM3ZghdYkWHsszq70FIecnKkVkt8ezMzRq9bkGuKojRLBVSod3Y1yPqKgYW7JRQTPVyy5xIYLjOgxgT52RKJUY1dOrIiRd4futQx/A5AcSmEjz0vFWrkLzvbWAu9HOWbGgxFk1VNTpnBKk6TgwisI/HcxYXP1uAWO72ULFlBTq+aSu2VTUs6hrxM2CF+hEor1VIA9ZmFUaab1lSSgZsVs4sxzHlVLoJHr9H4DhONTkI1XC0/wiY2NoWAG5RlnHFnq6oLccpQddMuJ/O17JVA5OHLi0BqCztq7Y1++ucCd98qLI8MIHBV/cKjxQTme3hFBS3MyCqnDsuym2o80HjvFFTtrURmNaGJsmVahImjTsUXKtQZTAVs7Mvv8/+fzUrZAXcLJ6M4koe6XP0b6SmWWNDzyUpQ8bl+LtWx4tuqZ36cRYV3yuVxPNwvIiqiQCSmu7srgTzR6nkyhpCarXwFy1vGd5iP2cY06lFr5Njhhg1Y6+NB28ftbK83s8rf7kLJbKwDFPbLg25a0AdZJEiqr5phixKMDlRUtcssq1hriLqGoH+zeNgVm9OemjsETV8JdF0NHnkIFxWY1OB4Yrp7rtWJ7NgAAAPXklEQVQ3oNs5nplyVf8u2FoLu1JrHveaZWQjqAkshtFa2gzsSG3Zpkbvg3HafF9slPPlldjFlK80Gysm8Mr4MPhneNWENPGjAIpmilTPATdTRTXlCBYHYAQuPwA36xIpWtGN4q3Y2MhiGsUpuSSnlEJRD8PorC7CFYVw+F51qThgabxsTxWzCGY0ZSsb3lfqAy0OPNjNy8xiQQKsHYFQ2HBZVvVbBuq3m1oWKajqaonsM6uZUr6CjXWNZ0l5E3h3jURma6kP3MJIiy1Lm+kahQq41N2iZja5sjtlLYNZHZrH6qUGm4vMbDp6Rw2CFmvuyFkrBcCyMtFqBaECmsHoK9BZ2LA/lJcRqSaDqnaWbrZdGaz3DLgIvBln4woGztbyJGqslwxkhhHrTjTYFXCtOoKS8uLdofVdAbOylGU6nlYpXWZts4nXBq6WxJitMNokHUJnbnJplQm+aGpY2a5GMV2QD1hRubBPFKdumf5OHkLHz0F9luE5kjBjRa0nFE5CUGqHw32MmjZ6xkgINVnSnZ1VZStK2qKlRaLlQgK7uTq7JFXJwM+3SOEKyhZNI+tJ0I5qMYy9k2qJD7dVWdqKXa0CKNR0Ccjg+B2IYu2fcBZJZkMFgM11r0X92wilghFGgzVnexlqB7xL9mS29SiYUVY2nXOZjNBRsyDsQPRWW5hrZ4XcdC4HVWRbjgJr4sFofK5SzjQ7rhI1UebdPdEbj6sqIvTZQZ5va08rABsAW0UxeWytAk7A2KJ9ZpxzCioB24XFtYAeXYxr6anSqhLgppEqWbGwLunTgrV+IjWlL29ljaAl4EQMGsErp4apeZiquwRXLXAqOCeru32mmydc6oWTSWpFAGdzeTB8RTHVMEtlM90CbbQCYhPjq3egYr1FGdYIQjiuDGZ5zZ/AzobKGOyLxti6c4Rwtv2anyWlLICnlLhxJRXt6A5ebDBWFNONbxWZ2d02mnu4S9YECpeppV1zSWRBWxHYzVIv1CXSouwqqX3jBBBDZdYQbpTQW4ZQlS8r5kH4suSRmg2++3JN10x1PaAmEkmtYlEdeGpJEM6kOuCqCR22oSujj5IV2HdT0zj5prLKTjXFAPjdQlyq7xIBxAQP5yMczG4VxAKw0n6ilZ2QBce2pLulkuxxqnoIzFfgqyqjil9S1VNwBrFmeyeops8yOjZUybZdfS8CuaTIJumzs5tODaNtLpFDQ/PcJGweLhmeL1nB0KqiUDScsiUVD89Di3HtrKtSULw3RLiygZD+7sF8JTObgYsrGvDNUFRGl1iy0Ll1YkUc2aJYMog920I8qW6YDCg1Mqk0JHJFKXkbgbRreI+qpYNOZHrVcDUba7pjsphSJNtK6upgRNAVoOS0mugBeN4bIZgHhuPZ/s1ENaX6KsVr+YNrh1Nb7ipR0PE5zbNRegCbrHRUw6Yf07dLBJl1f8KB9as2V1nNqAsl62LBBhehwalerkHmB1JFIEZKSEusdl5JQj1nJlHXSCF342gJ9CYGrXelknJIXqVP8sD+qtplCR3XH2qfKq0ygMp+KnVkKxNlZ8m2YkIlVMiCnXUwl7qznBKSvQz3m3Pt6oQbXO5b5FixCh/fHxUQW/AEcK6zCNqKQnL9sywqmKuwvqSYzT/aPVNNpVyhvRW21aqciCsjdWvBwILUvh5VyCzbWoC1pJjJ680CWsl+udKB6T5RwG1mlohnlpbg47iz5U9ha0FGtmRLFYBtO99y97Ap0z+ZDTAog6kSLZsMHg/IFkkgp6CpvU2U0cYVSdnmkjwBdOmXbxTWNWzuIbipMioVxEckZEoahSOiy2M3K0jcC1LhVDwaqG0ZvkcWqCnrG4GIxykrqlbWdw6LQyBaZR8HmLRIhQWsHswD42ZXVLNkf9l+FlW0HVQ2lwFsC/Z1FdzlQR0KaPfo+Fdfu+/dwVRICu1CGR7AEIiAhc+AZUF0kOBaPxmUqg4i64vQnU4nFDYJ9Nz+1fVXveH9qmr+kPILx8oKcRV/BFbxbE0JMT0kSD4w6L/lNY8ocsqagVdU3A3MjxhxcGuqzsPH4irpaow1q6OyrVjvp9Npc59E91LldboYVzJWdimWfAW2SNEKcDaX2FmBLLA/uKxlmhh613Is1URQApbKfttwxL02q6Onx5pQxSbPojAg+v5hAnN6LHVRDXIsvKtRjiS0qJUyZTAXVbAK82ElFJWaQdVoqUC1Unt7BVaTQudM6SuqexjQJN4+0icaxv/utbKv83ETbT8H8gjcOKxOJmbUa6OOVXht3dFY6rHv9XoNzFLceEA1o8+pKm0LAHPHZ2rYKjFq0hfZFixsqHJgD3eD5n+U0kb1mFjXkn2lvMSSOsNE/CdIAKF0Sytq6urOHUN5gwg4GZosgbmggM5ucra2qrS2Ig1cbiBBcxYzgzUDNLCvL8GbZXNp6ORy3LmS+Kk83zRIAK6A1ioKa2I9NapIuiUFdfC9766PFZUtqUr6KbWk+zZU1a/ZrIXEztrjTOfz7hwKziCeXIaraHtbZIMz+2pGgazCmw4qWAFvEdhodYp0Xq0pV7G1YWYWbO4qhGq42+Z8BYtrLWvluNPpZAeaFFS1vubPgbgxsqcpnAaszBovKaFoDQ8BGtjfUOl4NAG2nmQV04feJgumvX2fsrQEWZghL0JnVdYkn3DOZIeRN86RqPWCmsvGVqEMRnwxQAxwS8EMYo3IzmY2+BCcLp4MKiuyuhImamlbZFcNoNl7tp+RHd18ZjQIRKyXdFRhN98/hyKqwXWNo7O1wiaXoHN108REZZWEq6grnIfjzeg8jdRf1XEL4kkXa5bBjKxoKaljBjeHlVxQ4GaycpW4lDOAKtnTxHAtOfzOtZwHAM7sqVXkV6yu6kap1nHkXKqWF/4XHqjenNKqBjpR3l1ch3Ejg1+EsgdQhsdG0B4FM9sWAVWpuAyiwTPleZxt9VyZVS2qXfReWqTAilpr9ApoWTjxymit7NwV4JTriZyOA9B0k7HFfULourmKYHVnRQvqGL5HMHdqFcR2qWpmcK6eTwx2dipWrviDilr+fKWq3OWRWdHKwA4eu8wjchbeRzFilqjjZN3ufCpfkJ0/scVpnYk6L0PI77lxdWCZ87WiWm7B/AGquQSnujGKsB8CJmiJq8q1pKIVWyqOiTK66r18BN8r74/AE71fdC3yPS2MxdOpnE1tlVxD9JmVOoggN+r4PjAXVFPa3Eg5jVJGFVUGNolH20GVrUB7BOySWq6WqYQdWR92pcFMYMwckbSgCKCqD67DiiWu1g8MQC9ByfcFqW1L+jL714qNCuznoSxt0da2gtWN1G8F0BK0NN0nuimelUF9dIdAfjO44UT3CjQLoUeLHJFTO3gmpRuIIOvwBQCbqNeo3qtZ9iF6xVK13GRlo4zqimq+CGdTiR1uRY8oqgE02hZBa79kZXPMquxRHKla2saZWN4mRqZUj0vLCKhkjKnqOQHNuSZVJoKvAqS1wpEquvWDC1B2ypwrCPsRMEPVTODMLJMDv6qeKXwi2JYV5Sq4qKyvgGsHCLiuj2jR59V8gMqSJ2FJZRXEHVRHj3sFPrct6OpqlW1GpatQdt0GvwfM6n63InsGVFhJGaBqgqqIV6IsXllZgySPq4R3bnt3wi5cv+cN2yqQLW1T95KYVsWWtKk4cB9W53WQQflQYR6Wl4HaJZjvVE0D5yvq+RKgZCs5qdBEP5sD94cAvQLlSgNaSMAtHx88BuNQ41zdFsX30zKbcs0MLD/ihkpQzl0wiTqKLTfbKmCmyYICnK0IbaieC4CG9iSyLQ7cIMGQwau6TKoq60Apl3WN40LZpca1CKKK9VQyyIEn8w0F8F6CL2h8o3ixGwC7s7EWzCOqmcApYxYD4jsAzVS0sl2t98pA7vrKophCVSonbYpgH6mvSn24pTBV4sdtV3BtMq5k82y+IADvUJ0uAlkCVTxIaPm+UNu/qkV4F1TzHXCGrXIAqItBKypqK99VtAOVs64O4ObX7pHLVCpYHcRmwvLR7TvYAKBBN58LGVzDuFz+hQbWgncQyCZAk+VbsPSouf93261iZgmfCpwRbAvqmSqriU2PwhjaoOyYqtIegVXViTsmyta6bGySpY3gyRrpIyAeaWDDxtpsXwKyalMDKNP7YBXMqEskUsi2uC8FNAPxAKTVfT1o6VzM0E0jF+1rWcUuHvdyg7vgoFplX8HpvHpMCOMRUPHzZkInsqlFKNX/EIO52E0SxSzOwob2VmRLW5D1XIU0rbgM1AzWgyC7fe8G7xUAK/taEBat7luqtyP7EmsaJQOj5F+mrnZfCuYCfBUAWwShyd6pMY/vAHG1UqOYpbI/gy5T0CMKm+UO3gFuC85dgfDVeguPDfITrIBLsLrcgdh3CFgFZjaKJ4Iv3F8ANEqvuxR1tVKOgLoCa1jxboBAkj6v7j/icFbA7f4rfRnQDLRViG13i0vqBQrYVqBbADZT0ZpiHoSzvQpopKIFS3sE1HfBWlHXd0H7LnArqvougMtljHBgZnh3Eoz/BKjLML4Z2Aq0+hEJr9jaVUBbvNzCIUiroC7AWmmFw4o5AK3MtB5VypZMSFgs05JyGVwlwBqsEGAAa2ZU1CjUexXGsE4rKriilBvFzOKKo3AuAroE6QFQU3u8YpNXwS5k+1TZt5UrwouN4KiUEw+k3ZWDp1RXHNRqXb21Ts39945yZSg3VnZFNQ9CF3XeZyr5DgBXKiwCMa2MxeTDYXgP1Fsf9QNKZc0k81RJk3r6EQ3rCmBVyLL75EjZ1pIVDHoFtiOAHoB0BdTVylqBsKKKS+AeBXJVLY+CXASuGvO/Auq7GuEjDfGKg1oKa1z/dmmi9I9SUGNhl0AtfulHAawoYrnSkmNXAVuGEhrEVXvUF+A5Ct2PqNOjDetyna4CmeUolmeXLN4Aq7C5Sj10Q7yjgl+t6CNxSRHmI5X+CpwreYB3Qfdqna4q21KdBuc4GoZsn49ZOOiVinwHqK9WzjvgeweEh2AU5+vtxZ9Cd9Wqkh49V18E5oj6vVyn0RStAyGIO5edXRKd5B0VGVXq2yr3xYp+5Ut+C4QJ4P1N339pQMjRejj4vb/Dcr6rQc3O/0rjmtZpeYCBiCHfCemRbNhbK/pNUPc3wfKy5f2D7OlL3/uPhve/oU4T0F8f+VNM2vyoiv0jK+KHQfdHq+0bncz4oz73/+Y6LbKw1o/5B7eOf1Rl/0du9B9tn/9bvrf/j+v0h6ttn2tp/r/4819y4/zv5391uvzzfwDifz6phT1MPgAAAABJRU5ErkJggg==)}.color-picker .cp-add-color-button-class{position:absolute;display:inline;padding:0;margin:3px -3px;border:0;cursor:pointer;background:transparent}.color-picker .cp-add-color-button-class:hover{text-decoration:underline}.color-picker .cp-add-color-button-class:disabled{cursor:not-allowed;color:#999}.color-picker .cp-add-color-button-class:disabled:hover{text-decoration:none}.color-picker .cp-remove-color-button-class{position:absolute;top:-5px;right:-5px;display:block;width:10px;height:10px;border-radius:50%;cursor:pointer;text-align:center;background:#fff;box-shadow:1px 1px 5px #333}.color-picker .cp-remove-color-button-class:before{content:"x";position:relative;bottom:3.5px;display:inline-block;font-size:10px}.color-picker .eyedropper-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);fill:#fff;mix-blend-mode:exclusion}\n'],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColorPickerComponent, [{
    type: Component,
    args: [{
      selector: "color-picker",
      encapsulation: ViewEncapsulation.None,
      imports: [SliderDirective, TextDirective, NgIf, NgForOf, NgTemplateOutlet],
      template: `<div #dialogPopup class="color-picker" [class.open]="show" [style.display]="!show ? 'none' : 'block'" [style.visibility]="hidden ? 'hidden' : 'visible'" [style.top.px]="top" [style.left.px]="left" [style.position]="position" [style.height.px]="cpHeight" [style.width.px]="cpWidth" (click)="$event.stopPropagation()">
  <div *ngIf="cpDialogDisplay === 'popup'" [style.left]="cpArrowPosition" class="arrow arrow-{{cpUsePosition}}" [style.top.px]="arrowTop"></div>

  <div *ngIf="(cpColorMode ||\xA01) === 1" class="saturation-lightness" slider [rgX]="1" [rgY]="1" [style.background-color]="hueSliderColor" (newValue)="onColorChange($event)" (dragStart)="onDragStart('saturation-lightness')" (dragEnd)="onDragEnd('saturation-lightness')">
    <div class="cursor" [style.top.px]="slider?.v" [style.left.px]="slider?.s"></div>
  </div>

  <div class="hue-alpha box">
    <div class="left">
      <div class="selected-color-background"></div>

      <div class="selected-color" [style.background-color]="selectedColor" [style.cursor]="eyeDropperSupported && cpEyeDropper ? 'pointer' : null" (click)="eyeDropperSupported && cpEyeDropper && onEyeDropper()">
        <svg *ngIf="eyeDropperSupported && cpEyeDropper" class="eyedropper-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17.66 5.41l.92.92-2.69 2.69-.92-.92 2.69-2.69M17.67 3c-.26 0-.51.1-.71.29l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42l-2.34-2.34c-.2-.19-.45-.29-.7-.29zM6.92 19L5 17.08l8.06-8.06 1.92 1.92L6.92 19z"/></svg>
      </div>

      <button *ngIf="cpAddColorButton" type="button" class="{{cpAddColorButtonClass}}" [disabled]="cpPresetColors && cpPresetColors.length >= cpMaxPresetColorsLength" (click)="onAddPresetColor($event, selectedColor)">
        {{cpAddColorButtonText}}
      </button>
    </div>

    <div class="right">
      <div *ngIf="cpAlphaChannel==='disabled'" style="height: 16px;"></div>

      <div #hueSlider class="hue" slider [rgX]="1" [style.display]="(cpColorMode ||\xA01) === 1 ? 'block' : 'none'" (newValue)="onHueChange($event)" (dragStart)="onDragStart('hue')" (dragEnd)="onDragEnd('hue')">
        <div class="cursor" [style.left.px]="slider?.h"></div>
      </div>

      <div #valueSlider class="value" slider [rgX]="1" [style.display]="(cpColorMode ||\xA01) === 2 ? 'block': 'none'" (newValue)="onValueChange($event)" (dragStart)="onDragStart('value')" (dragEnd)="onDragEnd('value')">
        <div class="cursor" [style.right.px]="slider?.v"></div>
      </div>

      <div #alphaSlider class="alpha" slider [rgX]="1" [style.display]="cpAlphaChannel === 'disabled' ? 'none' : 'block'" [style.background-color]="alphaSliderColor" (newValue)="onAlphaChange($event)" (dragStart)="onDragStart('alpha')" (dragEnd)="onDragEnd('alpha')">
        <div class="cursor" [style.left.px]="slider?.a"></div>
      </div>
    </div>
  </div>

  <div *ngIf="!cpDisableInput && (cpColorMode ||\xA01) === 1" class="cmyk-text" [style.display]="format !== 3 ? 'none' : 'block'">
    <div class="box">
      <input type="number" pattern="[0-9]*" min="0" max="100" [text] [rg]="100" [value]="cmykText?.c" (keyup.enter)="onAcceptColor($event)" (newValue)="onCyanInput($event)" />
      <input type="number" pattern="[0-9]*" min="0" max="100" [text] [rg]="100" [value]="cmykText?.m" (keyup.enter)="onAcceptColor($event)" (newValue)="onMagentaInput($event)" />
      <input type="number" pattern="[0-9]*" min="0" max="100" [text] [rg]="100" [value]="cmykText?.y" (keyup.enter)="onAcceptColor($event)" (newValue)="onYellowInput($event)" />
      <input type="number" pattern="[0-9]*" min="0" max="100" [text] [rg]="100" [value]="cmykText?.k" (keyup.enter)="onAcceptColor($event)" (newValue)="onBlackInput($event)" />
      <input *ngIf="cpAlphaChannel!=='disabled'" type="number" pattern="[0-9]+([\\.,][0-9]{1,2})?" min="0" max="1" step="0.1" [text] [rg]="1" [value]="cmykText?.a" (keyup.enter)="onAcceptColor($event)" (newValue)="onAlphaInput($event)" />
    </div>

     <div class="box">
      <div>C</div><div>M</div><div>Y</div><div>K</div><div *ngIf="cpAlphaChannel!=='disabled'" >A</div>
    </div>
  </div>

  <div *ngIf="!cpDisableInput && (cpColorMode ||\xA01) === 1 " class="hsla-text" [style.display]="format !== 2 ? 'none' : 'block'">
    <div class="box">
      <input type="number" pattern="[0-9]*" min="0" max="360" [text] [rg]="360" [value]="hslaText?.h" (keyup.enter)="onAcceptColor($event)" (newValue)="onHueInput($event)" />
      <input type="number" pattern="[0-9]*" min="0" max="100" [text] [rg]="100" [value]="hslaText?.s" (keyup.enter)="onAcceptColor($event)" (newValue)="onSaturationInput($event)" />
      <input type="number" pattern="[0-9]*" min="0" max="100" [text] [rg]="100" [value]="hslaText?.l" (keyup.enter)="onAcceptColor($event)" (newValue)="onLightnessInput($event)" />
      <input *ngIf="cpAlphaChannel!=='disabled'" type="number" pattern="[0-9]+([\\.,][0-9]{1,2})?" min="0" max="1" step="0.1" [text] [rg]="1" [value]="hslaText?.a" (keyup.enter)="onAcceptColor($event)" (newValue)="onAlphaInput($event)" />
    </div>

    <div class="box">
      <div>H</div><div>S</div><div>L</div><div *ngIf="cpAlphaChannel!=='disabled'">A</div>
    </div>
  </div>

  <div *ngIf="!cpDisableInput && (cpColorMode ||\xA01) === 1 " [style.display]="format !== 1 ? 'none' : 'block'" class="rgba-text">
    <div class="box">
      <input type="number" pattern="[0-9]*" min="0" max="255" [text] [rg]="255" [value]="rgbaText?.r" (keyup.enter)="onAcceptColor($event)" (newValue)="onRedInput($event)" />
      <input type="number" pattern="[0-9]*" min="0" max="255" [text] [rg]="255" [value]="rgbaText?.g" (keyup.enter)="onAcceptColor($event)" (newValue)="onGreenInput($event)" />
      <input type="number" pattern="[0-9]*" min="0" max="255" [text] [rg]="255" [value]="rgbaText?.b" (keyup.enter)="onAcceptColor($event)" (newValue)="onBlueInput($event)" />
      <input *ngIf="cpAlphaChannel!=='disabled'" type="number" pattern="[0-9]+([\\.,][0-9]{1,2})?" min="0" max="1" step="0.1" [text] [rg]="1" [value]="rgbaText?.a" (keyup.enter)="onAcceptColor($event)" (newValue)="onAlphaInput($event)" />
    </div>

    <div class="box">
      <div>R</div><div>G</div><div>B</div><div *ngIf="cpAlphaChannel!=='disabled'" >A</div>
    </div>
  </div>

  <div *ngIf="!cpDisableInput && (cpColorMode ||\xA01) === 1" class="hex-text" [class.hex-alpha]="cpAlphaChannel==='forced'"
    [style.display]="format !== 0 ? 'none' : 'block'">
    <div class="box">
      <input [text] [value]="hexText" (blur)="onHexInput(null)" (keyup.enter)="onAcceptColor($event)" (newValue)="onHexInput($event)"/>
      <input *ngIf="cpAlphaChannel==='forced'" type="number" pattern="[0-9]+([\\.,][0-9]{1,2})?" min="0" max="1" step="0.1" [text] [rg]="1" [value]="hexAlpha" (keyup.enter)="onAcceptColor($event)" (newValue)="onAlphaInput($event)"/>
    </div>

    <div class="box">
      <div>Hex</div>
      <div *ngIf="cpAlphaChannel==='forced'">A</div>
    </div>
  </div>

  <div *ngIf="!cpDisableInput && (cpColorMode ||\xA01) === 2" class="value-text">
    <div class="box">
      <input type="number" pattern="[0-9]*" min="0" max="100" [text] [rg]="100" [value]="hslaText?.l" (keyup.enter)="onAcceptColor($event)" (newValue)="onValueInput($event)" />
      <input *ngIf="cpAlphaChannel!=='disabled'" type="number" pattern="[0-9]+([\\.,][0-9]{1,2})?" min="0" max="1" step="0.1"  [text] [rg]="1" [value]="hslaText?.a" (keyup.enter)="onAcceptColor($event)" (newValue)="onAlphaInput($event)" />
    </div>

    <div class="box">
      <div>V</div><div>A</div>
    </div>
  </div>

  <div *ngIf="!cpDisableInput && (cpColorMode ||\xA01) === 1" class="type-policy">
    <span class="type-policy-arrow" (click)="onFormatToggle(-1)"></span>
    <span class="type-policy-arrow" (click)="onFormatToggle(1)"></span>
  </div>

  <div *ngIf="cpPresetColors?.length || cpAddColorButton" class="preset-area">
    <hr>

    <div class="preset-label">{{cpPresetLabel}}</div>

    <div *ngIf="cpPresetColors?.length" class="{{cpPresetColorsClass}}">
      <div *ngFor="let color of cpPresetColors" class="preset-color" [style.backgroundColor]="color" (click)="setColorFromString(color)">
        <span *ngIf="cpAddColorButton" class="{{cpRemoveColorButtonClass}}" (click)="onRemovePresetColor($event, color)"></span>
      </div>
    </div>

    <div *ngIf="!cpPresetColors?.length && cpAddColorButton" class="{{cpPresetEmptyMessageClass}}">{{cpPresetEmptyMessage}}</div>
  </div>

  <div *ngIf="cpOKButton || cpCancelButton" class="button-area">
    <button *ngIf="cpCancelButton" type="button" class="{{cpCancelButtonClass}}" (click)="onCancelColor($event)">{{cpCancelButtonText}}</button>

    <button *ngIf="cpOKButton" type="button" class="{{cpOKButtonClass}}" (click)="onAcceptColor($event)">{{cpOKButtonText}}</button>
  </div>

  <div class="extra-template" *ngIf="cpExtraTemplate">
    <ng-container *ngTemplateOutlet="cpExtraTemplate"></ng-container>
  </div>
</div>
`,
      styles: ['.color-picker{position:absolute;z-index:1000;width:230px;height:auto;border:#777 solid 1px;cursor:default;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#fff}.color-picker *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin:0;font-size:11px}.color-picker input{width:0;height:26px;min-width:0;font-size:13px;text-align:center;color:#000}.color-picker input:invalid,.color-picker input:-moz-ui-invalid,.color-picker input:-moz-submit-invalid{box-shadow:none}.color-picker input::-webkit-inner-spin-button,.color-picker input::-webkit-outer-spin-button{margin:0;-webkit-appearance:none}.color-picker .arrow{position:absolute;z-index:999999;width:0;height:0;border-style:solid}.color-picker .arrow.arrow-top{left:8px;border-width:10px 5px;border-color:#777 rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0)}.color-picker .arrow.arrow-bottom{top:-20px;left:8px;border-width:10px 5px;border-color:rgba(0,0,0,0) rgba(0,0,0,0) #777 rgba(0,0,0,0)}.color-picker .arrow.arrow-top-left,.color-picker .arrow.arrow-left-top{right:-21px;bottom:8px;border-width:5px 10px;border-color:rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0) #777}.color-picker .arrow.arrow-top-right,.color-picker .arrow.arrow-right-top{bottom:8px;left:-20px;border-width:5px 10px;border-color:rgba(0,0,0,0) #777 rgba(0,0,0,0) rgba(0,0,0,0)}.color-picker .arrow.arrow-left,.color-picker .arrow.arrow-left-bottom,.color-picker .arrow.arrow-bottom-left{top:8px;right:-21px;border-width:5px 10px;border-color:rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0) #777}.color-picker .arrow.arrow-right,.color-picker .arrow.arrow-right-bottom,.color-picker .arrow.arrow-bottom-right{top:8px;left:-20px;border-width:5px 10px;border-color:rgba(0,0,0,0) #777 rgba(0,0,0,0) rgba(0,0,0,0)}.color-picker .cursor{position:relative;width:16px;height:16px;border:#222 solid 2px;border-radius:50%;cursor:default}.color-picker .box{display:flex;padding:4px 8px}.color-picker .left{position:relative;padding:16px 8px}.color-picker .right{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;padding:12px 8px}.color-picker .button-area{padding:0 16px 16px;text-align:right}.color-picker .button-area button{margin-left:8px}.color-picker .preset-area{padding:4px 15px}.color-picker .preset-area .preset-label{overflow:hidden;width:100%;padding:4px;font-size:11px;white-space:nowrap;text-align:left;text-overflow:ellipsis;color:#555}.color-picker .preset-area .preset-color{position:relative;display:inline-block;width:18px;height:18px;margin:4px 6px 8px;border:#a9a9a9 solid 1px;border-radius:25%;cursor:pointer}.color-picker .preset-area .preset-empty-message{min-height:18px;margin-top:4px;margin-bottom:8px;font-style:italic;text-align:center}.color-picker .hex-text{width:100%;padding:4px 8px;font-size:11px}.color-picker .hex-text .box{padding:0 24px 8px 8px}.color-picker .hex-text .box div{float:left;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;text-align:center;color:#555;clear:left}.color-picker .hex-text .box input{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;padding:1px;border:#a9a9a9 solid 1px}.color-picker .hex-alpha .box div:first-child,.color-picker .hex-alpha .box input:first-child{flex-grow:3;margin-right:8px}.color-picker .cmyk-text,.color-picker .hsla-text,.color-picker .rgba-text,.color-picker .value-text{width:100%;padding:4px 8px;font-size:11px}.color-picker .cmyk-text .box,.color-picker .hsla-text .box,.color-picker .rgba-text .box{padding:0 24px 8px 8px}.color-picker .value-text .box{padding:0 8px 8px}.color-picker .cmyk-text .box div,.color-picker .hsla-text .box div,.color-picker .rgba-text .box div,.color-picker .value-text .box div{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;margin-right:8px;text-align:center;color:#555}.color-picker .cmyk-text .box div:last-child,.color-picker .hsla-text .box div:last-child,.color-picker .rgba-text .box div:last-child,.color-picker .value-text .box div:last-child{margin-right:0}.color-picker .cmyk-text .box input,.color-picker .hsla-text .box input,.color-picker .rgba-text .box input,.color-picker .value-text .box input{float:left;-webkit-flex:1;-ms-flex:1;flex:1;padding:1px;margin:0 8px 0 0;border:#a9a9a9 solid 1px}.color-picker .cmyk-text .box input:last-child,.color-picker .hsla-text .box input:last-child,.color-picker .rgba-text .box input:last-child,.color-picker .value-text .box input:last-child{margin-right:0}.color-picker .hue-alpha{align-items:center;margin-bottom:3px}.color-picker .hue{direction:ltr;width:100%;height:16px;margin-bottom:16px;border:none;cursor:pointer;background-size:100% 100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwkUFWbCCAAAAFxJREFUaN7t0kEKg0AQAME2x83/n2qu5qCgD1iDhCoYdpnbQC9bbY1qVO/jvc6k3ad91s7/7F1/csgPrujuQ17BDYSFsBAWwgJhISyEBcJCWAgLhIWwEBYIi2f7Ar/1TCgFH2X9AAAAAElFTkSuQmCC)}.color-picker .value{direction:rtl;width:100%;height:16px;margin-bottom:16px;border:none;cursor:pointer;background-size:100% 100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAACTklEQVR42u3SYUcrABhA4U2SkmRJMmWSJklKJiWZZpKUJJskKUmaTFImKZOUzMySpGRmliRNJilJSpKSJEtmSpIpmWmSdO736/6D+x7OP3gUCoWCv1cqlSQlJZGcnExKSgqpqamkpaWRnp5ORkYGmZmZqFQqsrKyyM7OJicnh9zcXNRqNXl5eeTn56PRaCgoKKCwsJCioiK0Wi3FxcWUlJRQWlpKWVkZ5eXlVFRUUFlZiU6no6qqiurqampqaqitraWurg69Xk99fT0GgwGj0UhDQwONjY00NTXR3NxMS0sLra2ttLW10d7ejslkwmw209HRQWdnJ11dXXR3d9PT00Nvby99fX309/czMDDA4OAgFouFoaEhrFYrw8PDjIyMMDo6ytjYGDabjfHxcSYmJpicnGRqagq73c709DQzMzPMzs4yNzfH/Pw8DocDp9OJy+XC7XazsLDA4uIiS0tLLC8vs7KywurqKmtra3g8HrxeLz6fD7/fz/r6OhsbG2xubrK1tcX29jaBQICdnR2CwSC7u7vs7e2xv7/PwcEBh4eHHB0dcXx8zMnJCaenp5ydnXF+fs7FxQWXl5dcXV1xfX3Nzc0Nt7e33N3dEQqFuL+/5+HhgXA4TCQS4fHxkaenJ56fn3l5eeH19ZVoNMrb2xvv7+98fHwQi8WIx+N8fn6SSCT4+vri+/ubn58ffn9/+VcKgSWwBJbAElgCS2AJLIElsASWwBJYAktgCSyBJbAElsASWAJLYAksgSWwBJbAElgCS2AJLIElsP4/WH8AmJ5Z6jHS4h8AAAAASUVORK5CYII=)}.color-picker .alpha{direction:ltr;width:100%;height:16px;border:none;cursor:pointer;background-size:100% 100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwYQlZMa3gAAAWVJREFUaN7tmEGO6jAQRCsOArHgBpyAJYGjcGocxAm4A2IHpmoWE0eBH+ezmFlNvU06shJ3W6VEelWMUQAIIF9f6qZpimsA1LYtS2uF51/u27YVAFZVRUkEoGHdPV/sIcbIEIIkUdI/9Xa7neyv61+SWFUVAVCSct00TWn2fv6u3+Ecfd3tXzy/0+nEUu+SPjo/kqzrmiQpScN6v98XewfA8/lMkiLJ2WxGSUopcT6fM6U0NX9/frfbjev1WtfrlZfLhYfDQQHG/AIOlnGwjINlHCxjHCzjYJm/TJWdCwquJXseFFzGwDNNeiKMOJTO8xQdDQaeB29+K9efeLaBo9J7vdvtJj1RjFFjfiv7qv95tjx/7leSQgh93e1ffMeIp6O+YQjho/N791t1XVOSSI7N//K+4/GoxWLBx+PB5/Op5XLJ+/3OlJJWqxU3m83ovv5iGf8KjYNlHCxjHCzjYBkHy5gf5gusvQU7U37jTAAAAABJRU5ErkJggg==)}.color-picker .type-policy{position:absolute;top:218px;right:12px;width:16px;height:24px;background-size:8px 16px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACewAAAnsB01CO3AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIASURBVEiJ7ZY9axRRFIafsxMStrLQJpAgpBFhi+C9w1YSo00I6RZ/g9vZpBf/QOr4GyRgkSKNSrAadsZqQGwCkuAWyRZJsySwvhZ7N/vhzrgbLH3Ld8597jlzz50zJokyxXH8DqDVar0qi6v8BbItqSGpEcfxdlmsFWXkvX8AfAVWg3UKPEnT9GKujMzsAFgZsVaCN1VTQd77XUnrgE1kv+6935268WRpzrnHZvYRWC7YvC3pRZZl3wozqtVqiyH9IgjAspkd1Gq1xUJQtVrdB9ZKIAOthdg/Qc65LUk7wNIMoCVJO865rYFhkqjX6/d7vV4GPJwBMqofURS5JEk6FYBer/eeYb/Mo9WwFnPOvQbeAvfuAAK4BN4sAJtAG/gJIElmNuiJyba3EGNmZiPeZuEVmVell/Y/6N+CzDn3AXhEOOo7Hv/3BeAz8IzQkMPnJbuPx1wC+yYJ7/0nYIP5S/0FHKdp+rwCEEXRS/rf5Hl1Gtb2M0iSpCOpCZzPATmX1EySpHMLAsiy7MjMDoHrGSDXZnaYZdnRwBh7J91utwmczAA6CbG3GgPleX4jqUH/a1CktqRGnuc3hSCAMB32gKspkCtgb3KCQMmkjeP4WNJThrNNZval1WptTIsv7JtQ4tmIdRa8qSoEpWl6YWZNoAN0zKxZNPehpLSBZv2t+Q0CJ9lLnARQLAAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position:center}.color-picker .type-policy .type-policy-arrow{display:block;width:100%;height:50%}.color-picker .selected-color{position:absolute;top:16px;left:8px;width:40px;height:40px;border:1px solid #a9a9a9;border-radius:50%}.color-picker .selected-color-background{width:40px;height:40px;border-radius:50%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAh0lEQVRYR+2W0QlAMQgD60zdfwOdqa8TmI/wQMr5K0I5bZLIzLOa2nt37VVVbd+dDx5obgCC3KBLwJ2ff4PnVidkf+ucIhw80HQaCLo3DMH3CRK3iFsmAWVl6hPNDwt8EvNE5q+YuEXcMgkonVM6SdyCoEvAnZ8v1Hjx817MilmxSUB5rdLJDycZgUAZUch/AAAAAElFTkSuQmCC)}.color-picker .saturation-lightness{direction:ltr;width:100%;height:130px;border:none;cursor:pointer;touch-action:manipulation;background-size:100% 100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACCCAYAAABSD7T3AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwksPWR6lgAAIABJREFUeNrtnVuT47gRrAHN+P//Or/61Y5wONZ7mZ1u3XAeLMjJZGZVgdKsfc5xR3S0RIIUW+CHzCpc2McYo7XGv3ex7UiZd57rjyzzv+v+33X/R/+3r/f7vR386Y+TvKNcf/wdhTLPcv9qU2wZd74uth0t1821jkIZLPcsI/6nWa4XvutquU0Z85mnx80S/ZzgpnLnOtHNt7/ofx1TKXcSNzN/7qbMQ3ju7rNQmMYYd/4s2j9aa+P+gGaMcZrb1M/tdrvf7/d2v99P9/t93O/3cbvdxu12G9frdVwul3E+n8c///nP+2+//Xb66aefxl//+tfx5z//2YK5Al2rgvf4UsbpdGrB52bAvArXpuzjmiqAVSGz5eDmGYXzhbAZmCrnmzddpUU+8Y1dAOYeXCtDUwVwV7YCGH6uAmyMcZ9l5vkUaBPGMUZ7/J5w/792/fvv9Xq93263dr/fTxPECeME8nK5jM/Pz/HTTz/dv337dvrll1/GP/7xj/G3v/1t/OUvfwkVswongjdOp9PzH3U3D3zmWGnZVXn4jCqs7wC2BKP4/8tAzkZsoWx6XrqeHZymvp4ABCBJhTQwKfDT8gzrZCIqi5AhiACjBfEB2rP8/X63MM7f6/V6v9/v7Xa7bYC83W7jcrlsVHIq5ffv30+//fbb+OWXX8ZPP/00/v73v4+ff/75JSvbeu+bL2WMMaFbAlpBNM85QX+ct6qoSqkPAwuQlBVKqGNFSUOAA3Bmu7gC5hNOd15nSwvAOUW7C4giUCV8Sgn5L9hNFIqTsp0GxI0ysioyjAjkY/tGJVEpz+fz+OWXX+7fv38//f777+Pbt2/j119/HT///PP49ddfx8fHRwrmTjV779EXu2px2xhjwtdJZQcAWQIPLPISsMJaSwiD8gzIKrwSyATE5j5nAbR5c1dBUwBlsEWW0h6LqiYsqFPAQxCyRZ3wOSARxmlXMX5k64pQfvv27f75+dk+Pj5OHx8f4/v37+Pbt2/jt99+G9++fRsfHx/jcrmUFLO31gYDWblxRIs/TqfT7ousxJsAxXA2Gc7TA9XdgfdoHbFsj76X2+1WArgI1ageGwA3qupqoHsmcbI6Fu93quggFa9d7LeDtgKfAFHBJ+NEByIkcJ5KervdTmhhGcgJJSZ5vn//fj+fz+18Pp8+Pz/H5+fnmGD+/vvv4/v37+Pj42N8fn6O2+1Ws7JjjP6wraMI5E4RZ8x2vV5TSwkquotV7/d7Tz6HFWsD/qNcdw0CQ3q/321c686TwDVIdbuy73zNldhSHb8I2klZznm+InBS4U6n0302aBFsLhHDAKJVJVglfI9jhvu53W53sLANYNxAiDA6MCeUHx8f9+v12i6XS7tcLqcZW57P5yeY8/fz83Ocz+fnsSmYUyknWEG85WBst9stzSLyMdfr9Qi08iY15UZ0LlDGLhR3o5zK2j7OPUTD0E+nU3tk7Xb/16NFbhloAMuY1zjLUOO3BKeIDe+Z8s3/J4gFo4TM5jPmuRg28foUKKVSwo16TgA5npywcWLHgYl/Pz8/73/605/ab7/91m63W7tcLie0sZj4mao5gTyfz88E0f1+j8EcYzwTPEG2cqjyfHNF0M8fuqEiaOVnRzZZQNh5fwQyHg/HDGfJo89Q1zb/quu5XC6773I2XKfTqd/v9+d3wuqWva/YTdUdEV3fhIv/Viyps6YE3x3r43K5bJQS66zaxVGFsvd+//j4aF+/fm3fv39vt9utff36tf3+++/tdrudvn37ZuNLBaaCMgUzC+rZRiFowxUuJI8YMqcCp9Opq5vagaYU6lGJA1XQqejchw6Cj0Gw5nYBrGw01A2O206n04BGouNNyTfp/FwElhUey6nXrIKw7QQWddxuN2ldL5fL839gSPF8ahu/JvBO48CPSuqMf8Vp9/P53L58+dLu93s7n8/tfr8/39/v9/b5+TkhPJ3P56mQ436/j+/fv+/iSgbzer0+AZx/5+88bv6OMda6S5z6kd21fYC9dxv7cIJJ2d9AOS30fPMzyHiTM8B4DF6XUlYHp4KQW3W+1t77MNB1vGHxWq7Xa7vf78+y5/N5A+H1et29xuP5dbYtyaRu4AksbPq6936fjRzXRxBbPr/b+b18+fKljTHaBBBfn8/n0/1+H1++fBnn8zm0sB8fH5u4cr5GuBhMVk0EEn9RsctgVhM+ixlJtMA23R8B6yysAstBOgFXIKKCMIgToMqNEu2fYMH7ztc732dQKkCj1ytAZtY0Kx8pIr8GGJ+AT3V+2Hirhl++fBmXy2Wz73w+b17P8p+fn8/tUwGVleVkTyUb68DkfayWY4zxNRihU4EpLJPZVrK+u7J4/mgfKqeLW9X2REWlItL1diynbDDb3+jXgYjQqn0rrxWc+NkILP7F7xIbMvx7vV53x40xnlbWJF12ZSag/N0pW6t+ZzmOMzHjajKwDfond78zYTdfq18up97zr2q8v3IioBprRtBl0EZ9og5WBRGOdOHjIjXF7UotFbgOWnXzIJyzYvjG5IYgsmMOxHkz8OsMSrVNWeq5T8DaOcbEv1Od5rbs9aO7YvMet63EkF++fMExq+MRl4/L5bLZN/+ez+fnZ6KazuMqXSQVO5spJXflHAIzes/xJseckRJiDMog9d6VfRrqXMr6KpVV27jRwJacGovOAM1zMdQMnwK1AubK63kdCChvI1C7g0z9nf/D+Xze2Vj8H7Gx4P9duQlsYCrqyN8XqG3Hm/10Oj3jw/n+crlstuM+jPmmxT2dTuPz83Pzt2pn1XsEHX/bnPaVqVmh0xwOt0o6XLLAHePUU203wHfcrspCwmV3TryB5s0Mseeg97x/BwzCjBlbB+pRAPla0BVQuT6V6QHdBlj3d0KG147b+DqxQeUymDO43W4dQar+TIjwmAd0z8/h65vf0/yLv3Pb5XLpru/ydDo9s7ET0I+Pj6dKK9VUEIeKWQWPAOrJ8LKd4vE+t91Y3e7UFlWatg2VwJnb+HPmtvm/sfK59/OaWF3x/eP1UPHvA5DDYDpYXfb0drv1V2DkBkxtw/tEWVVlXWdC9pFYs5/jfh9dS/16vW7s6lTG+TfqsxSJHxkXXq/Xdr1eu4LsfD6P3vsT3N77DkL+zPm5jSdKL4zR3AxQd6rHkLkYlSowsrq7znzu6wSwdsMJOXmA5fBcjxtgMGBYHlr5zokhtsMCTgXLQOW4XC6dEyEMprL8mAQzXRgduix2yZzorxkYsDn3hB1VeMLGsXsVtgl2pW8S3svk0vw7R4hNaHvv4cACl5HFzwIH0Kc6zu4XjDPR/jpAVxWzO1Xk2DDb3vTcxeGU1iWZHkmIDWziWKvirCJ4Dravs6IJ/GG6cTqWdXDy+fArQDVVkLqkVjAoZIITdmmIqXwqa95N3+MGYoZQdRVNO53Y1xRkhO16vY7eu507Ca9lJnbGpxOemQhSw/AQsmmp5zU9BiU8G6wvX76M6/U6Pj4+do0Bz4CpgiknTUeDqwlKBmg3u4OVjrZ1A+rAcgaejWq6eJCvCYFDONSwOgHX4EQRw8lxbzDOdEK6gZ3Hk1b+8g2o1JFtKXyv/fEdTXuWjWXdAZiBp6ADeDrCFiim7B6ZFneeI7Gvm/PMkUDX67W7xI8b0D7/v8dA9qfN5oaCf74WZjH0mf1cmfY1Y0JUFmVrTWu8uzkNcLtEj7u5FXBTkfC6GOA5q8YMxO8KVvF6sAVGdcrUbsKODcQKkLMOMdmlxum642YrPm26AlhZW1YB1R+rrGswE8TaYAWeUMxdf+WjwSvZ2Ef3ytOyfn5+PpVPAaqOn43MtNBqvmjjxbjM4lZjZY4gqNMI5ktaW/sYKNwS+9lFQzGihmMCKPa7+Z0V6Eb0GRmobtpX8JljWu5FMLN5ja6hG9kwQgZqf5+1NH5UxzkFReCdWhJ8XdlGUkxO7HRlYRm4mVO43W7ter12TPJEw/rmEN3L5SKHIWZg9mz+pUoKOYq5bJTJdX2gme1UcxMZQFaEQIlHct32M+Y1BzGkGuzfiyAN9z+ugplZ1symCrDCYYkGxDTpI9RzBy0rHyeDUC1nWaeUaD9n4xkNyYMBDZtzZ3B++fJlY21XFDOcARJlabOyiS3uCpLI9jrZjCDkaVvcCCjwognKShWdzXZWlZMvVTgD8LpqlCLrqgbcB+qYwrgKYpT0ccCqbKyCValkEabn/FynogCrPKfqf51xJ7sGB2ZXcZmxoSOztjx300DZi7a0/2AIR0UlBag9SuDw6KcAzlaB7vHZvWpjK90dyrq6bKyDUZQbR0B05biLQkHIcSUmgIK+SwuqgHCnoio2RQU1yj+BnBy9pphVKLGyC7ZzFK1pxWK+E8IhVCWLN/uLtnUU4ayoYLoaANz8FdtaSvY4pV0BEW2ls61czqllBKpTyKgMAhrZ1cdc1RROtPmvWNkdcKZ7ZKxaWjiPLJMpp7OZKxA+rqG/oJLjxf0pnJlqLoDZo3gyU0mKGys2taKecj/d1C+rJSplBqlTyAqgR+D8KjKlmRL2gtUcAdCtsL+ijCNT1oqqqkH2OHEbG5sDFnUg5Aa+yLou2VU1ptj1S2ZQqv1ORZN9IWzRfgaRBxKoBE8UWyqlJFtrIc0AxNjSjed99CTY/XDfSzCz5M0IZoVEsWnPFNTsl8ooVC1TzbGgqFZNDSgVwKK+1sGDMKqxZCWGVMDysiEr1jVSQJUYwj5iHOlThdHt44SQg9CN+nl8D90NMIgAdgr46JqRiR9I8vRdFvbr17m/yxUMKjNLMiVUADwu2CWGhhi+F55TWM9M9cogzms1dnM4uOF/LAEYWdcqnM7yFmyq3IfwmOROd7Y1iFWtOjoY8To41mTV5IysgFFuRzsbWFGbNIIJCDv1dOo4lZG7jWBwRFtVTKuWyeCByJKOan8oZ3ep9XddNl0tDuaywLz9cXPYeDAA0SpkBO9sbVcTOVWldPv4uyzEkzxHtjvonHoSkFEWNoo1d8DhcQputd2ppNon4BzoAiJ1hBFQg0dVtdbGHHDQWushmNEQukLM2QO1G2Y8bgTXqFhcBJj7EjPgcPts8US8qPpPB/dXznOh5Z438tzH5ec6QgrOKrRRfKmysBmUDB+PhYabMlVPER+GCSITTzr7am2tArH3bgcEzPJm+cr5jJ4NnHNFDVrFXcI5Le9k5Jnw+bedbV+FfRzZIHaOOaOsLY0/7UGs58DjrGwKMIMFIGzOEW1/jGsdAtCN6hEAI4hBe9YXeRROBSVPAVPAqvIM5bx5hVKWAMP6zBRy3iescridVdFBinBxXDnG2GRY2XbCvp1lhvGtO9Bxu5h908XQu42lnSArMFdizMim8uwRCxPGnnOS8lwpnbOiDqTAjsrRN/PcoAScCbaACqVM40ylnjjTBs+bwWlAG23/UKbdkiwKWIQPGzWaczpoSlxPEj822cNWkpS7FyzsDrqpfgpG3jahw2vgbaSQAxuLWZYt7JzyNe8JoZpNAcvDFOdw0wqYT9AK1rZz/DdbSlLPp0ryIxgQJlK9AZlEq7IOXpohg9PIhrCng88JsOxiV4ZWAYfg4sikx/8ky2Z9l862uqwrfscIH8+ugTmVGyiddeVYUgEMn4GZzg14EwIsh9sx2cKKiWXReuOE5gzGOQgdlRKVVdlevqb279Xq0Qnsts2VDaBO0coezsruWtHApu6sKG4IBhN0aGU2kLrMKGRTN3HmbCDwKV14zvkMEDG4QfZVspVlaNU2mhc5TEZ3N1h/zqTheuLpW05ZWTGVjb3dbnNmxKZBnN8JqidaVLKAOyARNLS+MB54Z2+VaqoMLKroVBlngefnTPAcoHNWCSvlfA8CI0HEmBNBnBlXyMrzU7A7WVm94PPqQ2gmqKx+WDGsnvilmcSOBJqOK1nYyAIzuAyesq3UdSK3KfWcYKD95HmfYOU3qser2CtYEUA+FpfqdNvgPBZUBhDrGONRVlQsh8rLcaUCykHG0OOUwTlLBrsh5soEMGezi1E4HRVt1icp5wZEFXdibCkG8Y8vX75sbO4E0iom9z+hjSiOfy3DhpXItpVhE+UGQdvoWjtChmrGHf4YAzKgBNnGtuJxFCeGdhUAfQLLK8kBYAP6gvFJZajMG3Xkycy8KuC0q4Eyymwtwdxdv2M0mIBtK0LKnf640j00Auq4gUkdWGlhs22qJc6dZCsL19oxnlTJG4SYVRIGpD8TPFBuM6OElbS1pldid4mGAyN6ZIupbC5bXJN9fdpbThSxLUaI8IG1XIYBxW3Tjs6KQosKcxfxcQmdnwRGM10GnFcCy2XYunLMyAkdgk4mePiczsLygthcBut6goOqS7YVFXADLjaosB6s6ofcZWAZSIRYqSUkizYwttYab3vUOQ9w2HRxIIg8WwRVeE68xi4UtL3zRphxplzwuZrcqYCq1I3jPI5dnJIygEohMbPqVJSzrwzxBJTs5zN+ReUSgxikPQVF3JVBeNQxbHENrEMNvEdFZVV9lH9+ORGEsNZQpyTNc4C3AG7XF4ngzq+DrO2zbuaaOXgdaFcdkEotoSFBVX2qJ0C8OWZeG4KGlpghA0XfTOPCqV2qqwQ26QWfF2PMLhI2w1lVAa2aPsYd0za25MQRwgcZN6uQDCi+ZxiD4XEM2kZxOT41FnZnaRlcpZouzlRqqdbQVWopQoSB58RV50lBNrHi/AwXS5LrwDVlpY3Fc3ByiYGc52Trist6kOXdwInAQtJpp5QchyaquYOV7Su+fxVMaV3dc0RE2S6mUY0gLt2pMcYqrKIQ9w2l1gpQUMtQYcmmbt5DTNxdhnUCjQqtbK9SUSzvrC0mmhhE1e2FS2+oxypy/ZASutkmtjx3vcBC24PX65nbqkBCRhfjS9kIYPnee8cMagVOhI/3T1fAmdtAWZsCswTJCkQVNa0qWKSKPOpHAUhD9DrbVcyoYkwqhvh17vYAayXLQyKGYdxlUDFp494rBXRjYgO17DDYetNIUj/ezp6S0lnlpEwsWmJMkOwsKXeZKEAjIHn0EQJISaRBcO6UMINz7p/bEjjnw4ft+xmDvksxX4G2rIris7qaeKwAFMP2Oi7n4criuZwtpSUwpfLxSnORSrIqusc5ZFaXysqRWjiZ2DyAWEIL35tVSoQElFACjOeGGSE7AHEQgdo/LSvCOgGBvkxsmDbvlS3Fp5vhaB2TAGqRKrKKMrhLVpaGzEVjZ0OQxDhaCTA+QyRR1d15aQzrJntL3RibsipjG6jlgL4yqbS0sNYg1e84vhbBVrElK64CUcWYXDfKxhpIuxiVJZUxsbMy/uRBKTNRQ4kQ3LdRYLS0rJjRPlTPqY6gdJsEDc+aQXAn+HgsNUCbRuF0Oj0zwnA7bWDkbhO5Ens00qeQhS1laBMl5M/cAaxsLF8rKyql+Tf7ELLEGu/ixiimdCvo0TjfpjKwaggen4eh5v7LokLKbLuyvHhcZG8dhGrEDx7Hg93ZppJF7qBqO3iVveXEDQNInzeoe8Yq6ePaZBZ2JviM3W2UAGotekRCAGq4EkF1X3DOnR11yRsBL1tRa0PVcZiNFXZ2c34FskvomInQQ6lzpJoZbJxk43NwKJFBquJSsrByHydxKOnTxQASBmS3j+JMnsHSla3Ec6K9VWoJVn9zfjwOM7hqYAAqJQwE2a3nA48J2QGegRkpZNivSY+ys3EkKd4oJIwsvIHl3cWgLt5k4NH6OmtLWdpurOkwEMupYc7eMtDRhOcI2ui5JhVIzXzLyto/GAPuZoyo8wkoduVgJglCt7OhGbgID4Mq4si+63zUS1FuFFXFlqyaj2emHlLMcBqYu0FMuR28BbB7lOxRMSiCQXFhCKuwkhZ+pYDiGSgbsKKV8MiSRsuHSIWM9rklRiIlZZuqXjsQK8ooYJMgq3JKWVkhHbhsVxFUzthOWPkYijcbx54IKsSdT+uLr3crGKyoYgFiGR9iBk4kfloUX+JIlQRQqabmpgnhqtpQpb6RVQ1WH5DnrS4hEoGZqaerQ2dhFbz8XePxShmDbo70eISjoorO2vK8SJXI4SUmEU4zWKDzUDtWTYw7xXlbSTEj4FRg7zKnKoGRALv0Gs9Tgc1BpCywGZRQAtqVz2xrBcAMzEpfZwFSa2G5W0QBFjSMapWAEFa3HcGN7CxDzECyIkJ97qwrqWNTWVo876PPsjPkj2wvgroM5lLZKMETKVql/CvnWVFiFa/SzJUQwkoZsr67Y6vlSRV3/2tmNTOY3vnaxYwMuoPKqdzR1w7IqHymlPxaAThfU7Ko2ZXYj4AYJHL+kNdKwRQYESTRa5fsUZ/rVC1TMTyWVyYoqNtuzaHsMyv2tvoarxdfqwYgU1axFo/cnql1FGsqK+uAROV8BX4GU8WcZTATi2q7Qcyi0O0V+GhWBMNRUkn8H1SsWVE5By3Gi0ECqUeJoBfAtDa4amkdXG37AGP5Ggeb84p7UazpoKRzdFzeQ8HkoHGxprKy/Hpm5t12p47J6xTYDEz7uINEXSuxYXvFskYAc+ySxH9sf5ftKzU6IbwVBcUGg5e5FMCEXSErZR0wGayV19woM9guPjTqJdVTqR4uE4nJnLldWVkECCZLd2VLF+xtamex7IpiriSDUpvrpn9lrwGMCHyppMH+ps6LILsuFGUj1XEOXiqbqSHPUKnClpWV68kqtURVNDY4TNaocykoYeTU5ngGEQa/S1DnnE4AeXMcKjHPAmFVjCBENaeyLVNHfr3px8xUstJ94hIpfH4HKE/eDaArK6lSyVVFbdt1gxTIVk3pppVlFXi4pEhVBTObquohU85MLXn1iahvUkHJjSCMc01tLFveVVBx0DodM6jftCu7DOtIzYxrc0qp1JGP2ayYFz2Gb6HvMrO8cnGtV6Gjm3uImSfD2GpWK6uowbZGMxFKQCo1pOMtcMXFpRst+hXGoAomF3sSTBGgTglbBKWwsQ3tZqaYSp0Z1CimRDWFcCJUPYJ00BI5FkKYNoifuQxmN88SWVXWLMaUqqqgC0BmQJR6sk3u9NCf6jYLXxAfqsYEgVLAhRY2AtgtflZNFmFyhxdrLkAdWlk4D88M2ixHyepIdhMHrG/iR1ZGtq0MGpbDbRPYOXeSY1M6Ny4ZstvGSktK+XbFPATj2D371saPEsAMXhXrsZ0km/XStkhhMyBfsa6uXFZe2VCe+YMr1+GKgwrQyNYq1VRrB+EizAow6NsdNKcyVEkYeM73ys6q4kAHp6BiFklTkIrVC5oYV7uzwOGCz4UJ0Stq2lWMJy4wtb+RetL6tZFicnJmBw5UjCvXXMZVJX2MQkbf+XN5EWd78Vz8/JEsMZTBiKNzsm1inLRUQ74H4NidaqI68j5sAFgxcRveC7ieLJXfQYxjZZ2CsiWFewZXJmBIlZ1tdtrX4hSuateKso/RZOtOKW2nmq1oTzeK6dRWAWu2NRVb4hq0SXm1GvtugHrbr5IXqmSktg5CuDE2MSlPwsY5kNE2Wp3AqiZbWVLAxiBF+2iBZbuNj6MB6rsMLC7FyasaYDyo7KkoPyEtw3pEMXfPvxAJi2jAQQgjrz0rLIZSWZlIoNhwd5xK4AR9mYNjWAaLrnuImJeBVN9zBORObVvbr+mTTfFSEJLSRnHo7hEJoIi8MFqjxmvgmF5URZz4zLFgZZ8Ctu2X7ggVccKm9gVxIsOHqxXgNMKnFWZYnf1dBnOhayXq17QwFlWW09eNKyVJFmXqaONGA5aCegMbJ3UUkGY1ic3nKWgjq8qfVYGQG1gRt6rs62a6HiqqUOqdesK5NmX4nGofJoiE1d0dF9lVVkvT1/kEEaaCoYOwFpcVcoLM+7669PxC9rWqktH0sWUYld0VCpuBZ/stVRcGgy9WX2+U1Qthi9SzAqSxzZsy+OiFzBYnySGV6Gku44rD8BCOZBV3BvD5+AKRHNwMEsB6EzHnJpkTAeiUlEGkcECeB6GDZTp5YEJTlvdrknxYjTllMkfNtXwDjM7uVjK5JXUUn43rrqpK2jytaxHW0M5G8DC8rtHMYs7KSgduVQMGTYFqFvVS6rkD3sDJ46afdYFwoq11AOKCBLhvwoUgc8IGANycR6knZrdJPdsuxnyjfd3FovTlRMdEdtOl5CMV5EHsXQBis7TOwvIDZaGj2Vnpbh7cpK63VwYEMLwqbjzyl699sawFFkF1yqjUU31HfC6sW1ZFVFuXVXVgz9keEaw0ys1lWfm+azQAQSWA+hKYVfsZjPncAcUB9oIayy/UZXRNckDGji77GsWbvBo6tPrWPqOyVkBUq+INeqpzNdYs/u0ifh5qmpqIW+33JVSUcwY70KL4U9lYdU6ljtSls7lmfi9g3YzeQfVkaGFaV3ODCnaD2N8wsEDFklE3RzM3ZghdYkWHsszq70FIecnKkVkt8ezMzRq9bkGuKojRLBVSod3Y1yPqKgYW7JRQTPVyy5xIYLjOgxgT52RKJUY1dOrIiRd4futQx/A5AcSmEjz0vFWrkLzvbWAu9HOWbGgxFk1VNTpnBKk6TgwisI/HcxYXP1uAWO72ULFlBTq+aSu2VTUs6hrxM2CF+hEor1VIA9ZmFUaab1lSSgZsVs4sxzHlVLoJHr9H4DhONTkI1XC0/wiY2NoWAG5RlnHFnq6oLccpQddMuJ/O17JVA5OHLi0BqCztq7Y1++ucCd98qLI8MIHBV/cKjxQTme3hFBS3MyCqnDsuym2o80HjvFFTtrURmNaGJsmVahImjTsUXKtQZTAVs7Mvv8/+fzUrZAXcLJ6M4koe6XP0b6SmWWNDzyUpQ8bl+LtWx4tuqZ36cRYV3yuVxPNwvIiqiQCSmu7srgTzR6nkyhpCarXwFy1vGd5iP2cY06lFr5Njhhg1Y6+NB28ftbK83s8rf7kLJbKwDFPbLg25a0AdZJEiqr5phixKMDlRUtcssq1hriLqGoH+zeNgVm9OemjsETV8JdF0NHnkIFxWY1OB4Yrp7rtWJ7NgAAAPXklEQVQ3oNs5nplyVf8u2FoLu1JrHveaZWQjqAkshtFa2gzsSG3Zpkbvg3HafF9slPPlldjFlK80Gysm8Mr4MPhneNWENPGjAIpmilTPATdTRTXlCBYHYAQuPwA36xIpWtGN4q3Y2MhiGsUpuSSnlEJRD8PorC7CFYVw+F51qThgabxsTxWzCGY0ZSsb3lfqAy0OPNjNy8xiQQKsHYFQ2HBZVvVbBuq3m1oWKajqaonsM6uZUr6CjXWNZ0l5E3h3jURma6kP3MJIiy1Lm+kahQq41N2iZja5sjtlLYNZHZrH6qUGm4vMbDp6Rw2CFmvuyFkrBcCyMtFqBaECmsHoK9BZ2LA/lJcRqSaDqnaWbrZdGaz3DLgIvBln4woGztbyJGqslwxkhhHrTjTYFXCtOoKS8uLdofVdAbOylGU6nlYpXWZts4nXBq6WxJitMNokHUJnbnJplQm+aGpY2a5GMV2QD1hRubBPFKdumf5OHkLHz0F9luE5kjBjRa0nFE5CUGqHw32MmjZ6xkgINVnSnZ1VZStK2qKlRaLlQgK7uTq7JFXJwM+3SOEKyhZNI+tJ0I5qMYy9k2qJD7dVWdqKXa0CKNR0Ccjg+B2IYu2fcBZJZkMFgM11r0X92wilghFGgzVnexlqB7xL9mS29SiYUVY2nXOZjNBRsyDsQPRWW5hrZ4XcdC4HVWRbjgJr4sFofK5SzjQ7rhI1UebdPdEbj6sqIvTZQZ5va08rABsAW0UxeWytAk7A2KJ9ZpxzCioB24XFtYAeXYxr6anSqhLgppEqWbGwLunTgrV+IjWlL29ljaAl4EQMGsErp4apeZiquwRXLXAqOCeru32mmydc6oWTSWpFAGdzeTB8RTHVMEtlM90CbbQCYhPjq3egYr1FGdYIQjiuDGZ5zZ/AzobKGOyLxti6c4Rwtv2anyWlLICnlLhxJRXt6A5ebDBWFNONbxWZ2d02mnu4S9YECpeppV1zSWRBWxHYzVIv1CXSouwqqX3jBBBDZdYQbpTQW4ZQlS8r5kH4suSRmg2++3JN10x1PaAmEkmtYlEdeGpJEM6kOuCqCR22oSujj5IV2HdT0zj5prLKTjXFAPjdQlyq7xIBxAQP5yMczG4VxAKw0n6ilZ2QBce2pLulkuxxqnoIzFfgqyqjil9S1VNwBrFmeyeops8yOjZUybZdfS8CuaTIJumzs5tODaNtLpFDQ/PcJGweLhmeL1nB0KqiUDScsiUVD89Di3HtrKtSULw3RLiygZD+7sF8JTObgYsrGvDNUFRGl1iy0Ll1YkUc2aJYMog920I8qW6YDCg1Mqk0JHJFKXkbgbRreI+qpYNOZHrVcDUba7pjsphSJNtK6upgRNAVoOS0mugBeN4bIZgHhuPZ/s1ENaX6KsVr+YNrh1Nb7ipR0PE5zbNRegCbrHRUw6Yf07dLBJl1f8KB9as2V1nNqAsl62LBBhehwalerkHmB1JFIEZKSEusdl5JQj1nJlHXSCF342gJ9CYGrXelknJIXqVP8sD+qtplCR3XH2qfKq0ygMp+KnVkKxNlZ8m2YkIlVMiCnXUwl7qznBKSvQz3m3Pt6oQbXO5b5FixCh/fHxUQW/AEcK6zCNqKQnL9sywqmKuwvqSYzT/aPVNNpVyhvRW21aqciCsjdWvBwILUvh5VyCzbWoC1pJjJ680CWsl+udKB6T5RwG1mlohnlpbg47iz5U9ha0FGtmRLFYBtO99y97Ap0z+ZDTAog6kSLZsMHg/IFkkgp6CpvU2U0cYVSdnmkjwBdOmXbxTWNWzuIbipMioVxEckZEoahSOiy2M3K0jcC1LhVDwaqG0ZvkcWqCnrG4GIxykrqlbWdw6LQyBaZR8HmLRIhQWsHswD42ZXVLNkf9l+FlW0HVQ2lwFsC/Z1FdzlQR0KaPfo+Fdfu+/dwVRICu1CGR7AEIiAhc+AZUF0kOBaPxmUqg4i64vQnU4nFDYJ9Nz+1fVXveH9qmr+kPILx8oKcRV/BFbxbE0JMT0kSD4w6L/lNY8ocsqagVdU3A3MjxhxcGuqzsPH4irpaow1q6OyrVjvp9Npc59E91LldboYVzJWdimWfAW2SNEKcDaX2FmBLLA/uKxlmhh613Is1URQApbKfttwxL02q6Onx5pQxSbPojAg+v5hAnN6LHVRDXIsvKtRjiS0qJUyZTAXVbAK82ElFJWaQdVoqUC1Unt7BVaTQudM6SuqexjQJN4+0icaxv/utbKv83ETbT8H8gjcOKxOJmbUa6OOVXht3dFY6rHv9XoNzFLceEA1o8+pKm0LAHPHZ2rYKjFq0hfZFixsqHJgD3eD5n+U0kb1mFjXkn2lvMSSOsNE/CdIAKF0Sytq6urOHUN5gwg4GZosgbmggM5ucra2qrS2Ig1cbiBBcxYzgzUDNLCvL8GbZXNp6ORy3LmS+Kk83zRIAK6A1ioKa2I9NapIuiUFdfC9766PFZUtqUr6KbWk+zZU1a/ZrIXEztrjTOfz7hwKziCeXIaraHtbZIMz+2pGgazCmw4qWAFvEdhodYp0Xq0pV7G1YWYWbO4qhGq42+Z8BYtrLWvluNPpZAeaFFS1vubPgbgxsqcpnAaszBovKaFoDQ8BGtjfUOl4NAG2nmQV04feJgumvX2fsrQEWZghL0JnVdYkn3DOZIeRN86RqPWCmsvGVqEMRnwxQAxwS8EMYo3IzmY2+BCcLp4MKiuyuhImamlbZFcNoNl7tp+RHd18ZjQIRKyXdFRhN98/hyKqwXWNo7O1wiaXoHN108REZZWEq6grnIfjzeg8jdRf1XEL4kkXa5bBjKxoKaljBjeHlVxQ4GaycpW4lDOAKtnTxHAtOfzOtZwHAM7sqVXkV6yu6kap1nHkXKqWF/4XHqjenNKqBjpR3l1ch3Ejg1+EsgdQhsdG0B4FM9sWAVWpuAyiwTPleZxt9VyZVS2qXfReWqTAilpr9ApoWTjxymit7NwV4JTriZyOA9B0k7HFfULourmKYHVnRQvqGL5HMHdqFcR2qWpmcK6eTwx2dipWrviDilr+fKWq3OWRWdHKwA4eu8wjchbeRzFilqjjZN3ufCpfkJ0/scVpnYk6L0PI77lxdWCZ87WiWm7B/AGquQSnujGKsB8CJmiJq8q1pKIVWyqOiTK66r18BN8r74/AE71fdC3yPS2MxdOpnE1tlVxD9JmVOoggN+r4PjAXVFPa3Eg5jVJGFVUGNolH20GVrUB7BOySWq6WqYQdWR92pcFMYMwckbSgCKCqD67DiiWu1g8MQC9ByfcFqW1L+jL714qNCuznoSxt0da2gtWN1G8F0BK0NN0nuimelUF9dIdAfjO44UT3CjQLoUeLHJFTO3gmpRuIIOvwBQCbqNeo3qtZ9iF6xVK13GRlo4zqimq+CGdTiR1uRY8oqgE02hZBa79kZXPMquxRHKla2saZWN4mRqZUj0vLCKhkjKnqOQHNuSZVJoKvAqS1wpEquvWDC1B2ypwrCPsRMEPVTODMLJMDv6qeKXwi2JYV5Sq4qKyvgGsHCLiuj2jR59V8gMqSJ2FJZRXEHVRHj3sFPrct6OpqlW1GpatQdt0GvwfM6n63InsGVFhJGaBqgqqIV6IsXllZgySPq4R3bnt3wi5cv+cN2yqQLW1T95KYVsWWtKk4cB9W53WQQflQYR6Wl4HaJZjvVE0D5yvq+RKgZCs5qdBEP5sD94cAvQLlSgNaSMAtHx88BuNQ41zdFsX30zKbcs0MLD/ihkpQzl0wiTqKLTfbKmCmyYICnK0IbaieC4CG9iSyLQ7cIMGQwau6TKoq60Apl3WN40LZpca1CKKK9VQyyIEn8w0F8F6CL2h8o3ixGwC7s7EWzCOqmcApYxYD4jsAzVS0sl2t98pA7vrKophCVSonbYpgH6mvSn24pTBV4sdtV3BtMq5k82y+IADvUJ0uAlkCVTxIaPm+UNu/qkV4F1TzHXCGrXIAqItBKypqK99VtAOVs64O4ObX7pHLVCpYHcRmwvLR7TvYAKBBN58LGVzDuFz+hQbWgncQyCZAk+VbsPSouf93261iZgmfCpwRbAvqmSqriU2PwhjaoOyYqtIegVXViTsmyta6bGySpY3gyRrpIyAeaWDDxtpsXwKyalMDKNP7YBXMqEskUsi2uC8FNAPxAKTVfT1o6VzM0E0jF+1rWcUuHvdyg7vgoFplX8HpvHpMCOMRUPHzZkInsqlFKNX/EIO52E0SxSzOwob2VmRLW5D1XIU0rbgM1AzWgyC7fe8G7xUAK/taEBat7luqtyP7EmsaJQOj5F+mrnZfCuYCfBUAWwShyd6pMY/vAHG1UqOYpbI/gy5T0CMKm+UO3gFuC85dgfDVeguPDfITrIBLsLrcgdh3CFgFZjaKJ4Iv3F8ANEqvuxR1tVKOgLoCa1jxboBAkj6v7j/icFbA7f4rfRnQDLRViG13i0vqBQrYVqBbADZT0ZpiHoSzvQpopKIFS3sE1HfBWlHXd0H7LnArqvougMtljHBgZnh3Eoz/BKjLML4Z2Aq0+hEJr9jaVUBbvNzCIUiroC7AWmmFw4o5AK3MtB5VypZMSFgs05JyGVwlwBqsEGAAa2ZU1CjUexXGsE4rKriilBvFzOKKo3AuAroE6QFQU3u8YpNXwS5k+1TZt5UrwouN4KiUEw+k3ZWDp1RXHNRqXb21Ts39945yZSg3VnZFNQ9CF3XeZyr5DgBXKiwCMa2MxeTDYXgP1Fsf9QNKZc0k81RJk3r6EQ3rCmBVyLL75EjZ1pIVDHoFtiOAHoB0BdTVylqBsKKKS+AeBXJVLY+CXASuGvO/Auq7GuEjDfGKg1oKa1z/dmmi9I9SUGNhl0AtfulHAawoYrnSkmNXAVuGEhrEVXvUF+A5Ct2PqNOjDetyna4CmeUolmeXLN4Aq7C5Sj10Q7yjgl+t6CNxSRHmI5X+CpwreYB3Qfdqna4q21KdBuc4GoZsn49ZOOiVinwHqK9WzjvgeweEh2AU5+vtxZ9Cd9Wqkh49V18E5oj6vVyn0RStAyGIO5edXRKd5B0VGVXq2yr3xYp+5Ut+C4QJ4P1N339pQMjRejj4vb/Dcr6rQc3O/0rjmtZpeYCBiCHfCemRbNhbK/pNUPc3wfKy5f2D7OlL3/uPhve/oU4T0F8f+VNM2vyoiv0jK+KHQfdHq+0bncz4oz73/+Y6LbKw1o/5B7eOf1Rl/0du9B9tn/9bvrf/j+v0h6ttn2tp/r/4819y4/zv5391uvzzfwDifz6phT1MPgAAAABJRU5ErkJggg==)}.color-picker .cp-add-color-button-class{position:absolute;display:inline;padding:0;margin:3px -3px;border:0;cursor:pointer;background:transparent}.color-picker .cp-add-color-button-class:hover{text-decoration:underline}.color-picker .cp-add-color-button-class:disabled{cursor:not-allowed;color:#999}.color-picker .cp-add-color-button-class:disabled:hover{text-decoration:none}.color-picker .cp-remove-color-button-class{position:absolute;top:-5px;right:-5px;display:block;width:10px;height:10px;border-radius:50%;cursor:pointer;text-align:center;background:#fff;box-shadow:1px 1px 5px #333}.color-picker .cp-remove-color-button-class:before{content:"x";position:relative;bottom:3.5px;display:inline-block;font-size:10px}.color-picker .eyedropper-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);fill:#fff;mix-blend-mode:exclusion}\n']
    }]
  }], () => [], {
    dialogElement: [{
      type: ViewChild,
      args: ["dialogPopup", {
        static: true
      }]
    }],
    hueSlider: [{
      type: ViewChild,
      args: ["hueSlider", {
        static: true
      }]
    }],
    alphaSlider: [{
      type: ViewChild,
      args: ["alphaSlider", {
        static: true
      }]
    }],
    handleEsc: [{
      type: HostListener,
      args: ["document:keyup.esc", ["$event"]]
    }],
    handleEnter: [{
      type: HostListener,
      args: ["document:keyup.enter", ["$event"]]
    }]
  });
})();
var ColorPickerDirective = class _ColorPickerDirective {
  injector = inject(Injector);
  appRef = inject(ApplicationRef);
  vcRef = inject(ViewContainerRef);
  elRef = inject(ElementRef);
  dialog;
  dialogCreated = false;
  ignoreChanges = false;
  cmpRef;
  viewAttachedToAppRef = false;
  colorPicker;
  cpWidth = "230px";
  cpHeight = "auto";
  cpToggle = false;
  cpDisabled = false;
  cpIgnoredElements = [];
  cpFallbackColor = "";
  cpColorMode = "color";
  cpCmykEnabled = false;
  cpOutputFormat = "auto";
  cpAlphaChannel = "enabled";
  cpDisableInput = false;
  cpDialogDisplay = "popup";
  cpSaveClickOutside = true;
  cpCloseClickOutside = true;
  cpUseRootViewContainer = false;
  cpPosition = "auto";
  cpPositionOffset = "0%";
  cpPositionRelativeToArrow = false;
  cpOKButton = false;
  cpOKButtonText = "OK";
  cpOKButtonClass = "cp-ok-button-class";
  cpCancelButton = false;
  cpCancelButtonText = "Cancel";
  cpCancelButtonClass = "cp-cancel-button-class";
  cpEyeDropper = false;
  cpPresetLabel = "Preset colors";
  cpPresetColors;
  cpPresetColorsClass = "cp-preset-colors-class";
  cpMaxPresetColorsLength = 6;
  cpPresetEmptyMessage = "No colors added";
  cpPresetEmptyMessageClass = "preset-empty-message";
  cpAddColorButton = false;
  cpAddColorButtonText = "Add color";
  cpAddColorButtonClass = "cp-add-color-button-class";
  cpRemoveColorButtonClass = "cp-remove-color-button-class";
  cpArrowPosition = 0;
  cpExtraTemplate;
  cpInputChange = new EventEmitter(true);
  cpToggleChange = new EventEmitter(true);
  cpSliderChange = new EventEmitter(true);
  cpSliderDragEnd = new EventEmitter(true);
  cpSliderDragStart = new EventEmitter(true);
  colorPickerOpen = new EventEmitter(true);
  colorPickerClose = new EventEmitter(true);
  colorPickerCancel = new EventEmitter(true);
  colorPickerSelect = new EventEmitter(true);
  colorPickerChange = new EventEmitter(false);
  cpCmykColorChange = new EventEmitter(true);
  cpPresetColorsChange = new EventEmitter(true);
  handleClick() {
    this.inputFocus();
  }
  handleFocus() {
    this.inputFocus();
  }
  handleInput(event) {
    this.inputChange(event);
  }
  ngOnDestroy() {
    if (this.cmpRef != null) {
      if (this.viewAttachedToAppRef) {
        this.appRef.detachView(this.cmpRef.hostView);
      }
      this.cmpRef.destroy();
      this.cmpRef = null;
      this.dialog = null;
    }
  }
  ngOnChanges(changes) {
    if (changes.cpToggle && !this.cpDisabled) {
      if (changes.cpToggle.currentValue) {
        this.openDialog();
      } else if (!changes.cpToggle.currentValue) {
        this.closeDialog();
      }
    }
    if (changes.colorPicker) {
      if (this.dialog && !this.ignoreChanges) {
        if (this.cpDialogDisplay === "inline") {
          this.dialog.setInitialColor(changes.colorPicker.currentValue);
        }
        this.dialog.setColorFromString(changes.colorPicker.currentValue, false);
        if (this.cpUseRootViewContainer && this.cpDialogDisplay !== "inline") {
          this.cmpRef.changeDetectorRef.detectChanges();
        }
      }
      this.ignoreChanges = false;
    }
    if (changes.cpPresetLabel || changes.cpPresetColors) {
      if (this.dialog) {
        this.dialog.setPresetConfig(this.cpPresetLabel, this.cpPresetColors);
      }
    }
  }
  openDialog() {
    if (!this.dialogCreated) {
      let vcRef = this.vcRef;
      this.dialogCreated = true;
      this.viewAttachedToAppRef = false;
      if (this.cpUseRootViewContainer && this.cpDialogDisplay !== "inline") {
        const classOfRootComponent = this.appRef.componentTypes[0];
        const appInstance = this.injector.get(classOfRootComponent, Injector.NULL);
        if (appInstance !== Injector.NULL) {
          vcRef = appInstance.vcRef || appInstance.viewContainerRef || this.vcRef;
          if (isDevMode() && vcRef === this.vcRef) {
            console.warn("You are using cpUseRootViewContainer, but the root component is not exposing viewContainerRef!Please expose it by adding 'public vcRef: ViewContainerRef' to the constructor.");
          }
        } else {
          this.viewAttachedToAppRef = true;
        }
      }
      if (this.viewAttachedToAppRef) {
        this.cmpRef = vcRef.createComponent(ColorPickerComponent, {
          injector: this.injector
        });
        document.body.appendChild(this.cmpRef.hostView.rootNodes[0]);
      } else {
        const injector = Injector.create({
          providers: [],
          // We shouldn't use `vcRef.parentInjector` since it's been deprecated long time ago and might be removed
          // in newer Angular versions: https://github.com/angular/angular/pull/25174.
          parent: vcRef.injector
        });
        this.cmpRef = vcRef.createComponent(ColorPickerComponent, {
          injector,
          index: 0
        });
      }
      this.cmpRef.instance.setupDialog(this, this.elRef, this.colorPicker, this.cpWidth, this.cpHeight, this.cpDialogDisplay, this.cpFallbackColor, this.cpColorMode, this.cpCmykEnabled, this.cpAlphaChannel, this.cpOutputFormat, this.cpDisableInput, this.cpIgnoredElements, this.cpSaveClickOutside, this.cpCloseClickOutside, this.cpUseRootViewContainer, this.cpPosition, this.cpPositionOffset, this.cpPositionRelativeToArrow, this.cpPresetLabel, this.cpPresetColors, this.cpPresetColorsClass, this.cpMaxPresetColorsLength, this.cpPresetEmptyMessage, this.cpPresetEmptyMessageClass, this.cpOKButton, this.cpOKButtonClass, this.cpOKButtonText, this.cpCancelButton, this.cpCancelButtonClass, this.cpCancelButtonText, this.cpAddColorButton, this.cpAddColorButtonClass, this.cpAddColorButtonText, this.cpRemoveColorButtonClass, this.cpEyeDropper, this.elRef, this.cpExtraTemplate);
      this.dialog = this.cmpRef.instance;
      if (this.vcRef !== vcRef) {
        this.cmpRef.changeDetectorRef.detectChanges();
      }
    } else if (this.dialog) {
      this.cmpRef.instance.cpAlphaChannel = this.cpAlphaChannel;
      this.dialog.openDialog(this.colorPicker);
    }
  }
  closeDialog() {
    if (this.dialog && this.cpDialogDisplay === "popup") {
      this.dialog.closeDialog();
    }
  }
  cmykChanged(value) {
    this.cpCmykColorChange.emit(value);
  }
  stateChanged(state) {
    this.cpToggleChange.emit(state);
    if (state) {
      this.colorPickerOpen.emit(this.colorPicker);
    } else {
      this.colorPickerClose.emit(this.colorPicker);
    }
  }
  colorChanged(value, ignore = true) {
    this.ignoreChanges = ignore;
    this.colorPickerChange.emit(value);
  }
  colorSelected(value) {
    this.colorPickerSelect.emit(value);
  }
  colorCanceled() {
    this.colorPickerCancel.emit();
  }
  inputFocus() {
    const element = this.elRef.nativeElement;
    const ignored = this.cpIgnoredElements.filter((item) => item === element);
    if (!this.cpDisabled && !ignored.length) {
      if (typeof document !== "undefined" && element === document.activeElement) {
        this.openDialog();
      } else if (!this.dialog || !this.dialog.show) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
    }
  }
  inputChange(event) {
    if (this.dialog) {
      this.dialog.setColorFromString(event.target.value, true);
    } else {
      this.colorPicker = event.target.value;
      this.colorPickerChange.emit(this.colorPicker);
    }
  }
  inputChanged(event) {
    this.cpInputChange.emit(event);
  }
  sliderChanged(event) {
    this.cpSliderChange.emit(event);
  }
  sliderDragEnd(event) {
    this.cpSliderDragEnd.emit(event);
  }
  sliderDragStart(event) {
    this.cpSliderDragStart.emit(event);
  }
  presetColorsChanged(value) {
    this.cpPresetColorsChange.emit(value);
  }
  static \u0275fac = function ColorPickerDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ColorPickerDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _ColorPickerDirective,
    selectors: [["", "colorPicker", ""]],
    hostBindings: function ColorPickerDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function ColorPickerDirective_click_HostBindingHandler() {
          return ctx.handleClick();
        })("focus", function ColorPickerDirective_focus_HostBindingHandler() {
          return ctx.handleFocus();
        })("input", function ColorPickerDirective_input_HostBindingHandler($event) {
          return ctx.handleInput($event);
        });
      }
    },
    inputs: {
      colorPicker: "colorPicker",
      cpWidth: "cpWidth",
      cpHeight: "cpHeight",
      cpToggle: "cpToggle",
      cpDisabled: "cpDisabled",
      cpIgnoredElements: "cpIgnoredElements",
      cpFallbackColor: "cpFallbackColor",
      cpColorMode: "cpColorMode",
      cpCmykEnabled: "cpCmykEnabled",
      cpOutputFormat: "cpOutputFormat",
      cpAlphaChannel: "cpAlphaChannel",
      cpDisableInput: "cpDisableInput",
      cpDialogDisplay: "cpDialogDisplay",
      cpSaveClickOutside: "cpSaveClickOutside",
      cpCloseClickOutside: "cpCloseClickOutside",
      cpUseRootViewContainer: "cpUseRootViewContainer",
      cpPosition: "cpPosition",
      cpPositionOffset: "cpPositionOffset",
      cpPositionRelativeToArrow: "cpPositionRelativeToArrow",
      cpOKButton: "cpOKButton",
      cpOKButtonText: "cpOKButtonText",
      cpOKButtonClass: "cpOKButtonClass",
      cpCancelButton: "cpCancelButton",
      cpCancelButtonText: "cpCancelButtonText",
      cpCancelButtonClass: "cpCancelButtonClass",
      cpEyeDropper: "cpEyeDropper",
      cpPresetLabel: "cpPresetLabel",
      cpPresetColors: "cpPresetColors",
      cpPresetColorsClass: "cpPresetColorsClass",
      cpMaxPresetColorsLength: "cpMaxPresetColorsLength",
      cpPresetEmptyMessage: "cpPresetEmptyMessage",
      cpPresetEmptyMessageClass: "cpPresetEmptyMessageClass",
      cpAddColorButton: "cpAddColorButton",
      cpAddColorButtonText: "cpAddColorButtonText",
      cpAddColorButtonClass: "cpAddColorButtonClass",
      cpRemoveColorButtonClass: "cpRemoveColorButtonClass",
      cpArrowPosition: "cpArrowPosition",
      cpExtraTemplate: "cpExtraTemplate"
    },
    outputs: {
      cpInputChange: "cpInputChange",
      cpToggleChange: "cpToggleChange",
      cpSliderChange: "cpSliderChange",
      cpSliderDragEnd: "cpSliderDragEnd",
      cpSliderDragStart: "cpSliderDragStart",
      colorPickerOpen: "colorPickerOpen",
      colorPickerClose: "colorPickerClose",
      colorPickerCancel: "colorPickerCancel",
      colorPickerSelect: "colorPickerSelect",
      colorPickerChange: "colorPickerChange",
      cpCmykColorChange: "cpCmykColorChange",
      cpPresetColorsChange: "cpPresetColorsChange"
    },
    exportAs: ["ngxColorPicker"],
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColorPickerDirective, [{
    type: Directive,
    args: [{
      selector: "[colorPicker]",
      exportAs: "ngxColorPicker"
    }]
  }], null, {
    colorPicker: [{
      type: Input
    }],
    cpWidth: [{
      type: Input
    }],
    cpHeight: [{
      type: Input
    }],
    cpToggle: [{
      type: Input
    }],
    cpDisabled: [{
      type: Input
    }],
    cpIgnoredElements: [{
      type: Input
    }],
    cpFallbackColor: [{
      type: Input
    }],
    cpColorMode: [{
      type: Input
    }],
    cpCmykEnabled: [{
      type: Input
    }],
    cpOutputFormat: [{
      type: Input
    }],
    cpAlphaChannel: [{
      type: Input
    }],
    cpDisableInput: [{
      type: Input
    }],
    cpDialogDisplay: [{
      type: Input
    }],
    cpSaveClickOutside: [{
      type: Input
    }],
    cpCloseClickOutside: [{
      type: Input
    }],
    cpUseRootViewContainer: [{
      type: Input
    }],
    cpPosition: [{
      type: Input
    }],
    cpPositionOffset: [{
      type: Input
    }],
    cpPositionRelativeToArrow: [{
      type: Input
    }],
    cpOKButton: [{
      type: Input
    }],
    cpOKButtonText: [{
      type: Input
    }],
    cpOKButtonClass: [{
      type: Input
    }],
    cpCancelButton: [{
      type: Input
    }],
    cpCancelButtonText: [{
      type: Input
    }],
    cpCancelButtonClass: [{
      type: Input
    }],
    cpEyeDropper: [{
      type: Input
    }],
    cpPresetLabel: [{
      type: Input
    }],
    cpPresetColors: [{
      type: Input
    }],
    cpPresetColorsClass: [{
      type: Input
    }],
    cpMaxPresetColorsLength: [{
      type: Input
    }],
    cpPresetEmptyMessage: [{
      type: Input
    }],
    cpPresetEmptyMessageClass: [{
      type: Input
    }],
    cpAddColorButton: [{
      type: Input
    }],
    cpAddColorButtonText: [{
      type: Input
    }],
    cpAddColorButtonClass: [{
      type: Input
    }],
    cpRemoveColorButtonClass: [{
      type: Input
    }],
    cpArrowPosition: [{
      type: Input
    }],
    cpExtraTemplate: [{
      type: Input
    }],
    cpInputChange: [{
      type: Output
    }],
    cpToggleChange: [{
      type: Output
    }],
    cpSliderChange: [{
      type: Output
    }],
    cpSliderDragEnd: [{
      type: Output
    }],
    cpSliderDragStart: [{
      type: Output
    }],
    colorPickerOpen: [{
      type: Output
    }],
    colorPickerClose: [{
      type: Output
    }],
    colorPickerCancel: [{
      type: Output
    }],
    colorPickerSelect: [{
      type: Output
    }],
    colorPickerChange: [{
      type: Output
    }],
    cpCmykColorChange: [{
      type: Output
    }],
    cpPresetColorsChange: [{
      type: Output
    }],
    handleClick: [{
      type: HostListener,
      args: ["click"]
    }],
    handleFocus: [{
      type: HostListener,
      args: ["focus"]
    }],
    handleInput: [{
      type: HostListener,
      args: ["input", ["$event"]]
    }]
  });
})();

// src/app/services/websocket.service.ts
var WebSocketService = class _WebSocketService {
  ws = null;
  reconnectTimer = void 0;
  reconnectAttempts = 0;
  maxReconnectAttempts = 10;
  reconnectDelay = 3e3;
  connected = signal(false, ...ngDevMode ? [{ debugName: "connected" }] : (
    /* istanbul ignore next */
    []
  ));
  lastMessage = signal(null, ...ngDevMode ? [{ debugName: "lastMessage" }] : (
    /* istanbul ignore next */
    []
  ));
  notifications = signal([], ...ngDevMode ? [{ debugName: "notifications" }] : (
    /* istanbul ignore next */
    []
  ));
  unreadCount = signal(0, ...ngDevMode ? [{ debugName: "unreadCount" }] : (
    /* istanbul ignore next */
    []
  ));
  getWsBaseUrl() {
    const protocol = globalThis.location.protocol === "https:" ? "wss:" : "ws:";
    const host = globalThis.location.hostname;
    const port = globalThis.location.port || "80";
    return `${protocol}//${host}${port === "80" || port === "443" ? "" : ":" + port}`;
  }
  /** الاتصال باستخدام token (JWT) و bizId — مطلوب للمصادقة على الباك اند. */
  connect(token, bizId) {
    if (this.ws?.readyState === WebSocket.OPEN)
      return;
    if (!token || !bizId)
      return;
    const base = this.getWsBaseUrl();
    const url = `${base}/ws?token=${encodeURIComponent(token)}&bizId=${bizId}`;
    try {
      this.ws = new WebSocket(url);
      this.ws.onopen = () => {
        this.connected.set(true);
        this.reconnectAttempts = 0;
        console.log("\u{1F50C} WebSocket connected");
      };
      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          this.lastMessage.set(msg);
          if (msg.type !== "connected") {
            const current = this.notifications();
            this.notifications.set([msg, ...current].slice(0, 50));
            this.unreadCount.set(this.unreadCount() + 1);
          }
        } catch (e) {
          console.warn("Invalid WS message", event.data);
        }
      };
      this.ws.onclose = () => {
        this.connected.set(false);
        this.tryReconnect(token, bizId);
      };
      this.ws.onerror = () => {
        this.connected.set(false);
      };
    } catch (e) {
      console.warn("WebSocket connection failed", e);
    }
  }
  tryReconnect(token, bizId) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts)
      return;
    this.reconnectAttempts++;
    clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.connect(token, bizId);
    }, this.reconnectDelay * Math.min(this.reconnectAttempts, 5));
  }
  disconnect() {
    clearTimeout(this.reconnectTimer);
    this.reconnectAttempts = this.maxReconnectAttempts;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connected.set(false);
  }
  clearNotifications() {
    this.unreadCount.set(0);
  }
  clearAll() {
    this.notifications.set([]);
    this.unreadCount.set(0);
  }
  static \u0275fac = function WebSocketService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WebSocketService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WebSocketService, factory: _WebSocketService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WebSocketService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/shared/constants/account-types.ts
var ACCOUNT_TYPE_META = {
  fund: { label: "\u0635\u0646\u062F\u0648\u0642", icon: "savings", color: "#22c55e" },
  bank: { label: "\u0628\u0646\u0643", icon: "account_balance", color: "#3b82f6" },
  e_wallet: { label: "\u0645\u062D\u0641\u0638\u0629", icon: "account_balance_wallet", color: "#8b5cf6" },
  exchange: { label: "\u0635\u0631\u0627\u0641", icon: "currency_exchange", color: "#f59e0b" },
  warehouse: { label: "\u0645\u062E\u0632\u0646", icon: "warehouse", color: "#78716c" },
  custody: { label: "\u0639\u0647\u062F\u0629", icon: "lock", color: "#ec4899" },
  supplier: { label: "\u0645\u0648\u0631\u062F", icon: "local_shipping", color: "#f97316" },
  employee: { label: "\u0645\u0648\u0638\u0641", icon: "person", color: "#06b6d4" },
  partner: { label: "\u0634\u0631\u064A\u0643", icon: "handshake", color: "#d946ef" },
  billing: { label: "\u0641\u0648\u062A\u0631\u0629", icon: "receipt", color: "#a855f7" },
  budget: { label: "\u0645\u064A\u0632\u0627\u0646\u064A\u0629", icon: "account_balance_wallet", color: "#84cc16" },
  settlement: { label: "\u062A\u0635\u0641\u064A\u0629", icon: "balance", color: "#0891b2" },
  pending: { label: "\u0645\u0639\u0644\u0642\u0629", icon: "pending_actions", color: "#ef4444" },
  accounting: { label: "\u0623\u062E\u0631\u0649", icon: "book", color: "#14b8a6" }
};
function getAccTypeMeta(type) {
  return ACCOUNT_TYPE_META[type] ?? { label: type, icon: "account_balance_wallet", color: "#64748b" };
}

// src/app/pages/custom-screens/custom-screens.ts
var _c03 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.value;
var arrowFn0 = (ctx, view) => (a) => {
  const filter_r27 = \u0275\u0275restoreView(view).$implicit;
  return \u0275\u0275resetView(a.accountType === filter_r27.value);
};
var _forTrack2 = ($index, $item) => $item.currencyId;
var _forTrack3 = ($index, $item) => $item.label;
var _forTrack4 = ($index, $item) => $item.item_name;
var _forTrack5 = ($index, $item) => $item.accountId;
var arrowFn1 = (ctx, view) => (a) => {
  const filter_r87 = \u0275\u0275restoreView(view).$implicit;
  return \u0275\u0275resetView(a.accountType === filter_r87.value);
};
var _forTrack6 = ($index, $item) => $item.name;
var _forTrack7 = ($index, $item) => $item.type;
function CustomScreensComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 6);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function CustomScreensComponent_Conditional_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "span", 17);
    \u0275\u0275text(2, "space_dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0634\u0627\u0634\u0627\u062A \u0645\u062E\u0635\u0635\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "\u0623\u0646\u0634\u0626 \u0634\u0627\u0634\u062A\u0643 \u0627\u0644\u0623\u0648\u0644\u0649 \u0644\u062A\u0628\u062F\u0623 \u0628\u062A\u0646\u0638\u064A\u0645 \u0639\u0645\u0644\u0643");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 11);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_2_Conditional_17_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startWizard());
    });
    \u0275\u0275elementStart(8, "span", 12);
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \u0625\u0646\u0634\u0627\u0621 \u0634\u0627\u0634\u0629 ");
    \u0275\u0275elementEnd()();
  }
}
function CustomScreensComponent_Conditional_2_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_2_For_20_Template_div_click_1_listener() {
      const screen_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openScreen(screen_r5));
    });
    \u0275\u0275elementStart(2, "div", 20)(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 21)(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 22)(11, "button", 23);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_2_For_20_Template_button_click_11_listener() {
      const screen_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openScreen(screen_r5));
    });
    \u0275\u0275elementStart(12, "span", 12);
    \u0275\u0275text(13, "open_in_new");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 24);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_2_For_20_Template_button_click_14_listener() {
      const screen_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openScreenForm(screen_r5));
    });
    \u0275\u0275elementStart(15, "span", 12);
    \u0275\u0275text(16, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 25);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_2_For_20_Template_button_click_17_listener() {
      const screen_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cloneScreen(screen_r5));
    });
    \u0275\u0275elementStart(18, "span", 12);
    \u0275\u0275text(19, "content_copy");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "button", 26);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_2_For_20_Template_button_click_20_listener() {
      const screen_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openSidebarModal(screen_r5));
    });
    \u0275\u0275elementStart(21, "span", 12);
    \u0275\u0275text(22, "add_to_home_screen");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "button", 27);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_2_For_20_Template_button_click_23_listener() {
      const screen_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPermissionsModal(screen_r5));
    });
    \u0275\u0275elementStart(24, "span", 12);
    \u0275\u0275text(25, "lock");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 28);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_2_For_20_Template_button_click_26_listener() {
      const screen_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteScreen(screen_r5));
    });
    \u0275\u0275elementStart(27, "span", 12);
    \u0275\u0275text(28, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const screen_r5 = ctx.$implicit;
    \u0275\u0275styleProp("--card-color", screen_r5.color || "#3b82f6");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", screen_r5.color || "#3b82f6");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(screen_r5.icon || "dashboard");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(screen_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(screen_r5.description || "\u0634\u0627\u0634\u0629 \u0645\u062E\u0635\u0635\u0629");
  }
}
function CustomScreensComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 7)(2, "div", 8)(3, "span", 9);
    \u0275\u0275text(4, "space_dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6, "\u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 10);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 11);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_2_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startWizard());
    });
    \u0275\u0275elementStart(10, "span", 12);
    \u0275\u0275text(11, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " \u0625\u0646\u0634\u0627\u0621 \u0634\u0627\u0634\u0629 \u062C\u062F\u064A\u062F\u0629 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 13);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_2_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showTemplatesModal.set(true));
    });
    \u0275\u0275elementStart(14, "span", 12);
    \u0275\u0275text(15, "auto_awesome");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " \u0642\u0648\u0627\u0644\u0628 \u062C\u0627\u0647\u0632\u0629 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(17, CustomScreensComponent_Conditional_2_Conditional_17_Template, 11, 0, "div", 14);
    \u0275\u0275elementStart(18, "div", 15);
    \u0275\u0275repeaterCreate(19, CustomScreensComponent_Conditional_2_For_20_Template, 29, 7, "div", 16, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.screens().length);
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r1.screens().length === 0 && !ctx_r1.loading() ? 17 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.screens());
  }
}
function CustomScreensComponent_Conditional_3_Conditional_16_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_16_For_15_Template_button_click_0_listener() {
      const icon_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.wizardScreenIcon.set(icon_r9));
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const icon_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r1.wizardScreenIcon() === icon_r9);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(icon_r9);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_16_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 59);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_16_For_21_Template_button_click_0_listener() {
      const color_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.wizardScreenColor.set(color_r11));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const color_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("background", color_r11);
    \u0275\u0275classProp("selected", ctx_r1.wizardScreenColor() === color_r11);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_16_Conditional_30_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const section_r13 = ctx.$implicit;
    \u0275\u0275property("value", section_r13.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(section_r13.name);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_16_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "select", 60);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_3_Conditional_16_Conditional_30_Template_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.wizardSidebarSectionId.set(+$event));
    });
    \u0275\u0275repeaterCreate(2, CustomScreensComponent_Conditional_3_Conditional_16_Conditional_30_For_3_Template, 2, 2, "option", 61, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 62);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_3_Conditional_16_Conditional_30_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.wizardSidebarSortOrder.set(+$event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.wizardSidebarSectionId());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.wizardSidebarSections());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.wizardSidebarSortOrder());
  }
}
function CustomScreensComponent_Conditional_3_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 43)(2, "label");
    \u0275\u0275text(3, "\u0627\u0633\u0645 \u0627\u0644\u0634\u0627\u0634\u0629 *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 44);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_3_Conditional_16_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.wizardScreenName.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 43)(6, "label");
    \u0275\u0275text(7, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 45);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_3_Conditional_16_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.wizardScreenDesc.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 46)(10, "div", 43)(11, "label");
    \u0275\u0275text(12, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 47);
    \u0275\u0275repeaterCreate(14, CustomScreensComponent_Conditional_3_Conditional_16_For_15_Template, 3, 3, "button", 48, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 43)(17, "label");
    \u0275\u0275text(18, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 49);
    \u0275\u0275repeaterCreate(20, CustomScreensComponent_Conditional_3_Conditional_16_For_21_Template, 1, 4, "button", 50, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 51)(23, "input", 52);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_3_Conditional_16_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.wizardScreenColor.set($event));
    })("colorPickerChange", function CustomScreensComponent_Conditional_3_Conditional_16_Template_input_colorPickerChange_23_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onColorPickerChange($event, "wizard"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "div", 53);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 54)(26, "label", 55)(27, "input", 56);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_3_Conditional_16_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.wizardAddToSidebar.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29, "\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(30, CustomScreensComponent_Conditional_3_Conditional_16_Conditional_30_Template, 5, 2, "div", 57);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.wizardScreenName());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.wizardScreenDesc());
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.icons);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.colors);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.wizardScreenColor())("cpPosition", "bottom")("cpOutputFormat", "hex")("colorPicker", ctx_r1.wizardScreenColor());
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r1.wizardScreenColor());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.wizardAddToSidebar());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.wizardAddToSidebar() ? 30 : -1);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_17_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_17_For_5_Template_button_click_0_listener() {
      const tabType_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.addWizardTab(tabType_r15.value));
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 67);
    \u0275\u0275text(8, "add_circle");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tabType_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", tabType_r15.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tabType_r15.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tabType_r15.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tabType_r15.desc);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_17_Conditional_6_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71)(1, "div", 72)(2, "span", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "input", 73);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_3_Conditional_17_Conditional_6_For_4_Template_input_ngModelChange_5_listener($event) {
      const \u0275$index_234_r17 = \u0275\u0275restoreView(_r16).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateWizardTab(\u0275$index_234_r17, "label", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 74);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 75)(9, "button", 76);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_17_Conditional_6_For_4_Template_button_click_9_listener() {
      const \u0275$index_234_r17 = \u0275\u0275restoreView(_r16).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.moveWizardTab(\u0275$index_234_r17, "up"));
    });
    \u0275\u0275elementStart(10, "span", 12);
    \u0275\u0275text(11, "arrow_upward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 77);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_17_Conditional_6_For_4_Template_button_click_12_listener() {
      const \u0275$index_234_r17 = \u0275\u0275restoreView(_r16).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.moveWizardTab(\u0275$index_234_r17, "down"));
    });
    \u0275\u0275elementStart(13, "span", 12);
    \u0275\u0275text(14, "arrow_downward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 78);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_17_Conditional_6_For_4_Template_button_click_15_listener() {
      const \u0275$index_234_r17 = \u0275\u0275restoreView(_r16).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.removeWizardTab(\u0275$index_234_r17));
    });
    \u0275\u0275elementStart(16, "span", 12);
    \u0275\u0275text(17, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const tab_r18 = ctx.$implicit;
    const \u0275$index_234_r17 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275styleProp("border-right-color", tab_r18.color);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", tab_r18.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r18.icon);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", tab_r18.label);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.getTabTypeInfo(tab_r18.type).color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getTabTypeInfo(tab_r18.type).label);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_234_r17 === 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", \u0275$index_234_r17 === ctx_r1.wizardTabs().length - 1);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_17_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4", 68);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 69);
    \u0275\u0275repeaterCreate(3, CustomScreensComponent_Conditional_3_Conditional_17_Conditional_6_For_4_Template, 18, 11, "div", 70, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0636\u0627\u0641\u0629 (", ctx_r1.wizardTabs().length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.wizardTabs());
  }
}
function CustomScreensComponent_Conditional_3_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "p", 63);
    \u0275\u0275text(2, "\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0631\u064A\u062F\u0647\u0627 \u0641\u064A \u0634\u0627\u0634\u062A\u0643. \u064A\u0645\u0643\u0646\u0643 \u0625\u0636\u0627\u0641\u0629 \u0623\u064A \u0639\u062F\u062F \u0648\u062A\u0631\u062A\u064A\u0628\u0647\u0627 \u0643\u0645\u0627 \u062A\u0634\u0627\u0621.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 64);
    \u0275\u0275repeaterCreate(4, CustomScreensComponent_Conditional_3_Conditional_17_For_5_Template, 9, 5, "button", 65, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, CustomScreensComponent_Conditional_3_Conditional_17_Conditional_6_Template, 5, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.tabTypeOptions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.wizardTabs().length > 0 ? 6 : -1);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 87);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_For_11_Template_button_click_0_listener() {
      const icon_r20 = \u0275\u0275restoreView(_r19).$implicit;
      \u0275\u0275nextContext();
      const tab_r21 = \u0275\u0275readContextLet(0);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateWizardTab(ctx_r1.wizardTabs().indexOf(tab_r21), "icon", icon_r20));
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const icon_r20 = ctx.$implicit;
    \u0275\u0275nextContext();
    const tab_r21 = \u0275\u0275readContextLet(0);
    \u0275\u0275classProp("selected", tab_r21.icon === icon_r20);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(icon_r20);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_For_14_Template_button_click_0_listener() {
      const color_r23 = \u0275\u0275restoreView(_r22).$implicit;
      \u0275\u0275nextContext();
      const tab_r21 = \u0275\u0275readContextLet(0);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateWizardTab(ctx_r1.wizardTabs().indexOf(tab_r21), "color", color_r23));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const color_r23 = ctx.$implicit;
    \u0275\u0275nextContext();
    const tab_r21 = \u0275\u0275readContextLet(0);
    \u0275\u0275styleProp("background", color_r23);
    \u0275\u0275classProp("selected", tab_r21.color === color_r23);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_15_For_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 93);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_15_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 92);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_15_For_4_Template_button_click_0_listener() {
      const ot_r25 = \u0275\u0275restoreView(_r24).$implicit;
      \u0275\u0275nextContext(2);
      const tab_r21 = \u0275\u0275readContextLet(0);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleWizardTabOpType(ctx_r1.wizardTabs().indexOf(tab_r21), ot_r25.id));
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_15_For_4_Conditional_5_Template, 2, 0, "span", 93);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r25 = ctx.$implicit;
    \u0275\u0275nextContext(2);
    const tab_r21 = \u0275\u0275readContextLet(0);
    \u0275\u0275classProp("selected", ((tab_r21.config == null ? null : tab_r21.config.operationTypeIds) || \u0275\u0275pureFunction0(7, _c03)).includes(ot_r25.id));
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ot_r25.color || "#3b82f6");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ot_r25.icon || "receipt_long");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ot_r25.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tab_r21.config == null ? null : tab_r21.config.operationTypeIds) || \u0275\u0275pureFunction0(8, _c03)).includes(ot_r25.id) ? 5 : -1);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4");
    \u0275\u0275text(1, "\u0627\u062E\u062A\u0631 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 89);
    \u0275\u0275repeaterCreate(3, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_15_For_4_Template, 6, 9, "button", 90, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 91);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const tab_r21 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.operationTypes());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 ", ((tab_r21.config == null ? null : tab_r21.config.operationTypeIds) || \u0275\u0275pureFunction0(1, _c03)).length, " \u0646\u0648\u0639 \u0639\u0645\u0644\u064A\u0629");
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 96);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_For_9_Template_button_click_0_listener() {
      const filter_r29 = \u0275\u0275restoreView(_r28).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.setAccFilterType(filter_r29.value));
    });
    \u0275\u0275elementStart(1, "span", 103);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 97);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const filter_r29 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275styleProp("--chip-color", filter_r29.color);
    \u0275\u0275classProp("active", ctx_r1.accFilterType() === filter_r29.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(filter_r29.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", filter_r29.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.allAccounts().filter(\u0275\u0275arrowFunction(7, arrowFn0, ctx)).length);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_For_16_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 93);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 104);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_For_16_Template_button_click_0_listener() {
      const acc_r31 = \u0275\u0275restoreView(_r30).$implicit;
      \u0275\u0275nextContext(2);
      const tab_r21 = \u0275\u0275readContextLet(0);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleWizardTabAccount(ctx_r1.wizardTabs().indexOf(tab_r21), acc_r31.id));
    });
    \u0275\u0275elementStart(1, "span", 105);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 106);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 107);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_For_16_Conditional_7_Template, 2, 0, "span", 93);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const acc_r31 = ctx.$implicit;
    \u0275\u0275nextContext(2);
    const tab_r21 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ((tab_r21.config == null ? null : tab_r21.config.accountIds) || \u0275\u0275pureFunction0(8, _c03)).includes(acc_r31.id));
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.getAccTypeMeta(acc_r31.accountType).color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getAccTypeMeta(acc_r31.accountType).icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(acc_r31.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getAccTypeMeta(acc_r31.accountType).label);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tab_r21.config == null ? null : tab_r21.config.accountIds) || \u0275\u0275pureFunction0(9, _c03)).includes(acc_r31.id) ? 7 : -1);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h4");
    \u0275\u0275text(1, "\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 94)(3, "div", 95)(4, "button", 96);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.setAccFilterType("all"));
    });
    \u0275\u0275text(5, " \u0627\u0644\u0643\u0644 ");
    \u0275\u0275elementStart(6, "span", 97);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(8, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_For_9_Template, 6, 8, "button", 98, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 99)(11, "span", 12);
    \u0275\u0275text(12, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 100);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.accSearchQuery.set($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 101);
    \u0275\u0275repeaterCreate(15, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_For_16_Template, 8, 10, "button", 102, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 91);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const tab_r21 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r1.accFilterType() === "all");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.allAccounts().length);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.accDynamicFilters());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.accSearchQuery());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.accFiltered());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 ", ((tab_r21.config == null ? null : tab_r21.config.accountIds) || \u0275\u0275pureFunction0(5, _c03)).length, " \u062D\u0633\u0627\u0628");
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 109)(1, "span", 12);
    \u0275\u0275text(2, "warehouse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0632\u0646. \u0623\u0636\u0641 \u0645\u062E\u0627\u0632\u0646 \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u062E\u0627\u0632\u0646.");
    \u0275\u0275elementEnd()();
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Conditional_5_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wh_r33 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(wh_r33.compositeCode);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Conditional_5_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 93);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 104);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Conditional_5_For_2_Template_button_click_0_listener() {
      const wh_r33 = \u0275\u0275restoreView(_r32).$implicit;
      \u0275\u0275nextContext(3);
      const tab_r21 = \u0275\u0275readContextLet(0);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleWizardTabWarehouse(ctx_r1.wizardTabs().indexOf(tab_r21), wh_r33.id));
    });
    \u0275\u0275elementStart(1, "span", 110);
    \u0275\u0275text(2, "warehouse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 106);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Conditional_5_For_2_Conditional_5_Template, 2, 1, "span", 107);
    \u0275\u0275conditionalCreate(6, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Conditional_5_For_2_Conditional_6_Template, 2, 0, "span", 93);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wh_r33 = ctx.$implicit;
    \u0275\u0275nextContext(3);
    const tab_r21 = \u0275\u0275readContextLet(0);
    \u0275\u0275classProp("selected", ((tab_r21.config == null ? null : tab_r21.config.warehouseIds) || \u0275\u0275pureFunction0(5, _c03)).includes(wh_r33.id));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(wh_r33.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(wh_r33.compositeCode ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tab_r21.config == null ? null : tab_r21.config.warehouseIds) || \u0275\u0275pureFunction0(6, _c03)).includes(wh_r33.id) ? 6 : -1);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101);
    \u0275\u0275repeaterCreate(1, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Conditional_5_For_2_Template, 7, 7, "button", 102, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 91);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const tab_r21 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.inventoryWarehouses());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 ", ((tab_r21.config == null ? null : tab_r21.config.warehouseIds) || \u0275\u0275pureFunction0(1, _c03)).length, " \u0645\u062E\u0632\u0646");
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4");
    \u0275\u0275text(1, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0623\u0635\u0646\u0627\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 108);
    \u0275\u0275text(3, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u062A\u064A \u062A\u0631\u064A\u062F \u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u0635\u0646\u0627\u0641\u0647\u0627 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Conditional_4_Template, 5, 0, "div", 109)(5, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Conditional_5_Template, 5, 2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.inventoryWarehouses().length === 0 ? 4 : 5);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275declareLet(0);
    \u0275\u0275elementStart(1, "div", 79)(2, "div", 80)(3, "div", 81)(4, "span", 12);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 82)(9, "div", 83);
    \u0275\u0275repeaterCreate(10, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_For_11_Template, 3, 3, "button", 84, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 85);
    \u0275\u0275repeaterCreate(13, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_For_14_Template, 1, 4, "button", 86, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(15, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_15_Template, 7, 2);
    \u0275\u0275conditionalCreate(16, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_16_Template, 19, 6);
    \u0275\u0275conditionalCreate(17, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Conditional_17_Template, 6, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const configTabs_r34 = \u0275\u0275readContextLet(0);
    const configIdx_r35 = \u0275\u0275readContextLet(1);
    const ctx_r1 = \u0275\u0275nextContext(2);
    const tab_r36 = \u0275\u0275storeLet(configTabs_r34[configIdx_r35]);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("border-color", tab_r36.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", tab_r36.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r36.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r36.label);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.icons);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.colors);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(tab_r36.type === "operations" ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r36.type === "accounts" ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r36.type === "inventory" ? 17 : -1);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275declareLet(0)(1);
    \u0275\u0275conditionalCreate(2, CustomScreensComponent_Conditional_3_Conditional_18_Conditional_2_Template, 18, 10, "div", 79);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const configTabs_r37 = \u0275\u0275storeLet(ctx_r1.getConfigurableTabs());
    \u0275\u0275advance();
    const configIdx_r38 = \u0275\u0275storeLet(ctx_r1.wizardStep() - 3);
    \u0275\u0275advance();
    \u0275\u0275conditional(configIdx_r38 >= 0 && configIdx_r38 < configTabs_r37.length ? 2 : -1);
  }
}
function CustomScreensComponent_Conditional_3_Conditional_19_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 116)(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tab_r39 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("border-bottom-color", tab_r39.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", tab_r39.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r39.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r39.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r1.getTabTypeInfo(tab_r39.type).label, ")");
  }
}
function CustomScreensComponent_Conditional_3_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 111)(2, "div", 112)(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 113);
    \u0275\u0275repeaterCreate(8, CustomScreensComponent_Conditional_3_Conditional_19_For_9_Template, 7, 7, "div", 114, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 115)(11, "p")(12, "strong");
    \u0275\u0275text(13, "\u0639\u062F\u062F \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p")(16, "strong");
    \u0275\u0275text(17, "\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0642\u0627\u0626\u0645\u0629:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", ctx_r1.wizardScreenColor());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.wizardScreenIcon());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.wizardScreenName());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.wizardTabs());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.wizardTabs().length);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.wizardAddToSidebar() ? "\u0646\u0639\u0645" : "\u0644\u0627");
  }
}
function CustomScreensComponent_Conditional_3_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r40);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.prevWizardStep());
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0627\u0644\u0633\u0627\u0628\u0642 ");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_3_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638 \u0648\u0625\u0646\u0634\u0627\u0621", " ");
  }
}
function CustomScreensComponent_Conditional_3_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0627\u0644\u062A\u0627\u0644\u064A ");
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2, "arrow_back");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 29)(2, "button", 30);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelWizard());
    });
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4, "close");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " \u0625\u0644\u063A\u0627\u0621 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 31)(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 32);
    \u0275\u0275element(12, "div", 33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 34)(14, "h3", 35);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, CustomScreensComponent_Conditional_3_Conditional_16_Template, 31, 10, "div", 36);
    \u0275\u0275conditionalCreate(17, CustomScreensComponent_Conditional_3_Conditional_17_Template, 7, 1, "div", 37);
    \u0275\u0275conditionalCreate(18, CustomScreensComponent_Conditional_3_Conditional_18_Template, 3, 3);
    \u0275\u0275conditionalCreate(19, CustomScreensComponent_Conditional_3_Conditional_19_Template, 19, 6, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 39);
    \u0275\u0275conditionalCreate(21, CustomScreensComponent_Conditional_3_Conditional_21_Template, 4, 0, "button", 40);
    \u0275\u0275element(22, "div", 41);
    \u0275\u0275elementStart(23, "button", 42);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_3_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextWizardStep());
    });
    \u0275\u0275conditionalCreate(24, CustomScreensComponent_Conditional_3_Conditional_24_Template, 3, 1)(25, CustomScreensComponent_Conditional_3_Conditional_25_Template, 3, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.wizardIsEditing() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0634\u0627\u0634\u0629" : "\u0625\u0646\u0634\u0627\u0621 \u0634\u0627\u0634\u0629 \u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("\u0627\u0644\u062E\u0637\u0648\u0629 ", ctx_r1.wizardStep(), " \u0645\u0646 ", ctx_r1.getWizardTotalSteps());
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.wizardStep() / ctx_r1.getWizardTotalSteps() * 100, "%");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getWizardStepTitle());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wizardStep() === 1 ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wizardStep() === 2 ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wizardStep() >= 3 && ctx_r1.wizardStep() < ctx_r1.getWizardTotalSteps() ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wizardStep() === ctx_r1.getWizardTotalSteps() ? 19 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.wizardStep() > 1 ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wizardStep() === ctx_r1.getWizardTotalSteps() ? 24 : 25);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 123);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.backToList());
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2, "arrow_forward");
    \u0275\u0275elementEnd()();
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 126);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_2_Template_button_click_0_listener() {
      const tab_r45 = \u0275\u0275restoreView(_r44).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setActiveTab(tab_r45.id));
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tab_r45 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("--tab-color", tab_r45.color)("background", ctx_r1.activeTabId() === tab_r45.id ? tab_r45.color : "transparent");
    \u0275\u0275classProp("active", ctx_r1.activeTabId() === tab_r45.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r45.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r45.label);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 140);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_1_For_2_Template_button_click_0_listener() {
      const ot_r47 = \u0275\u0275restoreView(_r46).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r1.selectOpType(ot_r47));
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ot_r47 = ctx.$implicit;
    \u0275\u0275styleProp("--op-color", ot_r47.color || "#3b82f6");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ot_r47.icon || "receipt_long");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ot_r47.name);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 139)(1, "span", 12);
    \u0275\u0275text(2, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0645 \u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0646\u0648\u0627\u0639 \u0639\u0645\u0644\u064A\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628");
    \u0275\u0275elementEnd()();
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 137);
    \u0275\u0275repeaterCreate(1, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_1_For_2_Template, 5, 4, "button", 138, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_1_Conditional_3_Template, 5, 0, "div", 139);
  }
  if (rf & 2) {
    const tab_r48 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getTabOperationTypes(tab_r48));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.getTabOperationTypes(tab_r48).length === 0 ? 3 : -1);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_15_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cur_r51 = ctx.$implicit;
    \u0275\u0275property("value", cur_r51.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", cur_r51.code, " - ", cur_r51.name);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "label");
    \u0275\u0275text(2, "\u0627\u0644\u0639\u0645\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 60);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_15_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r50);
      const ctx_r1 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r1.csFormCurrencyId.set(+$event));
    });
    \u0275\u0275repeaterCreate(4, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_15_For_5_Template, 2, 3, "option", 61, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(7);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.csFormCurrencyId());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.currencies());
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_20_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const acc_r53 = ctx.$implicit;
    \u0275\u0275property("value", acc_r53.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(acc_r53.name);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_20_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const acc_r54 = ctx.$implicit;
    \u0275\u0275property("value", acc_r54.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(acc_r54.name);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 144)(1, "div", 146)(2, "div", 43)(3, "label")(4, "span", 147);
    \u0275\u0275text(5, "arrow_upward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " \u0645\u0646 \u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "select", 60);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_20_Template_select_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r52);
      const ctx_r1 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r1.csTransferFromAccountId.set(+$event));
    });
    \u0275\u0275elementStart(8, "option", 61);
    \u0275\u0275text(9, "\u0627\u062E\u062A\u0631 \u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0635\u062F\u0631...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(10, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_20_For_11_Template, 2, 2, "option", 61, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 148)(13, "span", 12);
    \u0275\u0275text(14, "arrow_back");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 43)(16, "label")(17, "span", 149);
    \u0275\u0275text(18, "arrow_downward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " \u0625\u0644\u0649 \u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "select", 60);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_20_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r52);
      const ctx_r1 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r1.csTransferToAccountId.set(+$event));
    });
    \u0275\u0275elementStart(21, "option", 61);
    \u0275\u0275text(22, "\u0627\u062E\u062A\u0631 \u062D\u0633\u0627\u0628 \u0627\u0644\u0648\u062C\u0647\u0629...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(23, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_20_For_24_Template, 2, 2, "option", 61, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 43)(26, "label");
    \u0275\u0275text(27, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 150);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_20_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r52);
      const ctx_r1 = \u0275\u0275nextContext(7);
      return \u0275\u0275resetView(ctx_r1.csTransferAmount.set($event));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(7);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngModel", ctx_r1.csTransferFromAccountId());
    \u0275\u0275advance();
    \u0275\u0275property("value", 0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.allAccounts());
    \u0275\u0275advance(10);
    \u0275\u0275property("ngModel", ctx_r1.csTransferToAccountId());
    \u0275\u0275advance();
    \u0275\u0275property("value", 0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.allAccounts());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.csTransferAmount());
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_21_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 155);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r56 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(8);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u0627\u0644\u0631\u0635\u064A\u062F: ", ctx_r1.formatAmount(ctx_r1.getAccountBalance(entry_r56.accountId)));
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_21_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 152)(1, "div", 154)(2, "span", 12);
    \u0275\u0275text(3, "account_balance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_21_For_2_Conditional_6_Template, 2, 1, "small", 155);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 156);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_21_For_2_Template_input_ngModelChange_7_listener($event) {
      const \u0275$index_647_r57 = \u0275\u0275restoreView(_r55).$index;
      const ctx_r1 = \u0275\u0275nextContext(8);
      return \u0275\u0275resetView(ctx_r1.updateFormEntry(\u0275$index_647_r57, "amount", $event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r56 = ctx.$implicit;
    const \u0275$index_647_r57 = ctx.$index;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(entry_r56.accountName || "\u062D\u0633\u0627\u0628 " + (\u0275$index_647_r57 + 1));
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r56.accountId ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", entry_r56.amount);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 151);
    \u0275\u0275repeaterCreate(1, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_21_For_2_Template, 8, 3, "div", 152, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 153)(4, "span");
    \u0275\u0275text(5, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A: ");
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0628\u0623\u0629: ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(7);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.csFormEntries());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(ctx_r1.getFormTotal()));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.getFilledEntriesCount(), " / ", ctx_r1.csFormEntries().length);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 136)(1, "div", 141)(2, "button", 30);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.cancelOpType());
    });
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " \u0631\u062C\u0648\u0639 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3")(7, "span", 12);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 46)(11, "div", 43)(12, "label");
    \u0275\u0275text(13, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 142);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.csFormDate.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(15, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_15_Template, 6, 1, "div", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 43)(17, "label");
    \u0275\u0275text(18, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 143);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.csFormDescription.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(20, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_20_Template, 29, 5, "div", 144)(21, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Conditional_21_Template, 12, 3);
    \u0275\u0275elementStart(22, "button", 145);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.saveOperation());
    });
    \u0275\u0275elementStart(23, "span", 12);
    \u0275\u0275text(24, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance(6);
    \u0275\u0275styleProp("color", ctx_r1.csSelectedOpType().color || "#3b82f6");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.csSelectedOpType().icon || "receipt_long");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.csSelectedOpType().name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.csFormDate());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.currencies().length > 1 ? 15 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.csFormDescription());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isTransferType() ? 20 : 21);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving() || (ctx_r1.isTransferType() ? !ctx_r1.csTransferAmount() : ctx_r1.getFormTotal() === 0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630..." : ctx_r1.isTransferType() ? "\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u062A\u062D\u0648\u064A\u0644" : "\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629", " ");
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 128);
    \u0275\u0275conditionalCreate(1, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_1_Template, 4, 1)(2, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Conditional_2_Template, 26, 10, "div", 136);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.csSelectedOpType() ? 1 : 2);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r59 = ctx.$implicit;
    \u0275\u0275property("value", ot_r59.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ot_r59.name);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span", 168);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 169);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 170);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r60 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(entry_r60.entry_date));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getVoucherTypeClass(entry_r60.voucher_type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getVoucherTypeLabel(entry_r60.voucher_type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r60.description || entry_r60.operation_type_name || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(entry_r60.total_debit));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(entry_r60.total_credit));
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 171);
    \u0275\u0275text(2, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A");
    \u0275\u0275elementEnd()();
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 129)(1, "div", 157)(2, "div", 158)(3, "input", 142);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.logFilterDateFrom.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 142);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.logFilterDateTo.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 60);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.logFilterOpType.set($event));
    });
    \u0275\u0275elementStart(6, "option", 159);
    \u0275\u0275text(7, "\u0643\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_For_9_Template, 2, 2, "option", 61, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 160);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.applyLogFilters());
    });
    \u0275\u0275elementStart(11, "span", 12);
    \u0275\u0275text(12, "filter_list");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " \u062A\u0635\u0641\u064A\u0629 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 161);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.clearLogFilters());
    });
    \u0275\u0275elementStart(15, "span", 12);
    \u0275\u0275text(16, "clear");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "div", 162)(18, "table", 163)(19, "thead")(20, "tr")(21, "th");
    \u0275\u0275text(22, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th");
    \u0275\u0275text(24, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th");
    \u0275\u0275text(26, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th");
    \u0275\u0275text(28, "\u0627\u0644\u0645\u062F\u064A\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th");
    \u0275\u0275text(30, "\u0627\u0644\u062F\u0627\u0626\u0646");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "tbody");
    \u0275\u0275repeaterCreate(32, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_For_33_Template, 12, 7, "tr", null, _forTrack0);
    \u0275\u0275conditionalCreate(34, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_Conditional_34_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 164)(36, "span");
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 165)(39, "button", 166);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.exportLogToCSV());
    });
    \u0275\u0275elementStart(40, "span", 12);
    \u0275\u0275text(41, "download");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, " \u062A\u0635\u062F\u064A\u0631 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 167);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.printCurrentTab());
    });
    \u0275\u0275elementStart(44, "span", 12);
    \u0275\u0275text(45, "print");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.logFilterDateFrom());
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.logFilterDateTo());
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.logFilterOpType());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.operationTypes());
    \u0275\u0275advance(24);
    \u0275\u0275repeater(ctx_r1.logEntries());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.logEntries().length === 0 ? 34 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A: ", ctx_r1.logTotal());
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_For_3_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 179)(1, "span", 180);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 181);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const bal_r61 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(7);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(bal_r61.currencyCode || "YER");
    \u0275\u0275advance();
    \u0275\u0275classProp("negative", bal_r61.balance < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(bal_r61.balance));
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_For_3_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 179)(1, "span", 180);
    \u0275\u0275text(2, "YER");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 181);
    \u0275\u0275text(4, "0");
    \u0275\u0275elementEnd()();
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 173)(1, "div", 175)(2, "span", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 176)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 177)(10, "span", 12);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 178);
    \u0275\u0275repeaterCreate(13, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_For_3_For_14_Template, 5, 4, "div", 179, _forTrack2);
    \u0275\u0275conditionalCreate(15, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_For_3_Conditional_15_Template, 5, 0, "div", 179);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const acc_r62 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r1.getAccTypeMeta(acc_r62.account_type).color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getAccountIcon(acc_r62.account_type));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(acc_r62.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getAccTypeMeta(acc_r62.account_type).label);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.getTrendColor(ctx_r1.getBalanceTrend(acc_r62)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTrendIcon(ctx_r1.getBalanceTrend(acc_r62)));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(acc_r62.balances);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!acc_r62.balances || acc_r62.balances.length === 0 ? 15 : -1);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 139)(1, "span", 12);
    \u0275\u0275text(2, "account_balance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0645 \u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u062D\u0633\u0627\u0628\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628");
    \u0275\u0275elementEnd()();
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 174)(1, "span");
    \u0275\u0275text(2, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0631\u0635\u062F\u0629:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(ctx_r1.getTotalAccountsBalance()));
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 130)(1, "div", 172);
    \u0275\u0275repeaterCreate(2, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_For_3_Template, 16, 9, "div", 173, _forTrack0);
    \u0275\u0275conditionalCreate(4, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_Conditional_4_Template, 5, 0, "div", 139);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_Conditional_5_Template, 5, 1, "div", 174);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r48 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.getTabAccounts(tab_r48));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.getTabAccounts(tab_r48).length === 0 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getTabAccounts(tab_r48).length > 0 ? 5 : -1);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 184)(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 185)(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const card_r63 = ctx.$implicit;
    \u0275\u0275styleProp("border-right-color", card_r63.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", card_r63.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(card_r63.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(card_r63.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(card_r63.value);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 131)(1, "div", 182);
    \u0275\u0275repeaterCreate(2, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_4_For_3_Template, 8, 7, "div", 183, _forTrack3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.getStatsCards());
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 132)(1, "div", 186);
    \u0275\u0275element(2, "canvas", 187);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r1.barChartData)("options", ctx_r1.barChartOptions);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_6_Conditional_1_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 191);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 192);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 193);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 194);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 195);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r65 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(7);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r65.item_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r65.item_code || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r65.unit || "-");
    \u0275\u0275advance();
    \u0275\u0275classProp("low-stock", item_r65.current_quantity < 5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r65.current_quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(item_r65.total_cost || 0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r65.last_movement_date ? ctx_r1.formatDate(item_r65.last_movement_date) : "-");
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r64 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 188)(1, "table", 189)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "\u0627\u0644\u0635\u0646\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "\u0627\u0644\u0631\u0645\u0632");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "\u0627\u0644\u0648\u062D\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0643\u0644\u0641\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "\u0622\u062E\u0631 \u062D\u0631\u0643\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275repeaterCreate(17, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_6_Conditional_1_For_18_Template, 13, 8, "tr", null, _forTrack4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 190)(20, "span");
    \u0275\u0275text(21, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0635\u0646\u0627\u0641: ");
    \u0275\u0275elementStart(22, "strong");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0643\u0644\u0641\u0629: ");
    \u0275\u0275elementStart(26, "strong");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 165)(29, "button", 166);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_6_Conditional_1_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r64);
      const tab_r48 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.exportInventoryToCSV(tab_r48));
    });
    \u0275\u0275elementStart(30, "span", 12);
    \u0275\u0275text(31, "download");
    \u0275\u0275elementEnd();
    \u0275\u0275text(32, " \u062A\u0635\u062F\u064A\u0631 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 167);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_6_Conditional_1_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r64);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.printCurrentTab());
    });
    \u0275\u0275elementStart(34, "span", 12);
    \u0275\u0275text(35, "print");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const tab_r48 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r1.getTabInventory(tab_r48));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.getTabInventory(tab_r48).length);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(ctx_r1.getInventoryTotalCost(tab_r48)));
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 139)(1, "span", 12);
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641 \u0641\u064A \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");
    \u0275\u0275elementEnd()();
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 133);
    \u0275\u0275conditionalCreate(1, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_6_Conditional_1_Template, 36, 2)(2, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_6_Conditional_2_Template, 5, 0, "div", 139);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r48 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getTabInventory(tab_r48).length > 0 ? 1 : 2);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_1_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 205);
    \u0275\u0275element(1, "div", 206);
    \u0275\u0275text(2, " \u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0642\u0631\u064A\u0631...");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r66 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 197)(1, "div", 158)(2, "input", 198);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_1_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r66);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.reportDateFrom.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 199);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_1_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r66);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.reportDateTo.set($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(4, "div", 200)(5, "div", 201);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_1_Template_div_click_5_listener() {
      \u0275\u0275restoreView(_r66);
      const tab_r48 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.generateReport("account_statement", tab_r48));
    });
    \u0275\u0275elementStart(6, "span", 202);
    \u0275\u0275text(7, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div")(9, "strong");
    \u0275\u0275text(10, "\u0643\u0634\u0641 \u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "small");
    \u0275\u0275text(12, "\u062A\u0642\u0631\u064A\u0631 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 201);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_1_Template_div_click_13_listener() {
      \u0275\u0275restoreView(_r66);
      const tab_r48 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.generateReport("inventory_report", tab_r48));
    });
    \u0275\u0275elementStart(14, "span", 203);
    \u0275\u0275text(15, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div")(17, "strong");
    \u0275\u0275text(18, "\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0632\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "small");
    \u0275\u0275text(20, "\u062C\u0631\u062F \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0648\u0627\u0644\u0643\u0645\u064A\u0627\u062A \u0648\u0627\u0644\u062A\u0643\u0627\u0644\u064A\u0641");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 201);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_1_Template_div_click_21_listener() {
      \u0275\u0275restoreView(_r66);
      const tab_r48 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.generateReport("operations_summary", tab_r48));
    });
    \u0275\u0275elementStart(22, "span", 204);
    \u0275\u0275text(23, "summarize");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "strong");
    \u0275\u0275text(26, "\u0645\u0644\u062E\u0635 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "small");
    \u0275\u0275text(28, "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 \u0648\u0627\u0644\u0641\u062A\u0631\u0629");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(29, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_1_Conditional_29_Template, 3, 0, "div", 205);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.reportDateFrom());
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.reportDateTo());
    \u0275\u0275advance(26);
    \u0275\u0275conditional(ctx_r1.reportLoading() ? 29 : -1);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0643\u0634\u0641 \u062D\u0633\u0627\u0628 ");
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 ");
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0645\u0644\u062E\u0635 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A ");
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_For_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 211);
    \u0275\u0275text(1, "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_For_1_Conditional_4_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 169);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 170);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 215);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r68 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(10);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(e_r68.date || e_r68.entry_date));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r68.description || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(e_r68.debit || 0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(e_r68.credit || 0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(e_r68.balance || 0));
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_For_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 212)(1, "table", 214)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "\u0645\u062F\u064A\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "\u062F\u0627\u0626\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "\u0627\u0644\u0631\u0635\u064A\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_For_1_Conditional_4_For_16_Template, 11, 5, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r69 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(15);
    \u0275\u0275repeater(r_r69.entries);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_For_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 213);
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0631\u0643\u0627\u062A");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 210)(1, "h5");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_For_1_Conditional_3_Template, 2, 0, "p", 211)(4, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_For_1_Conditional_4_Template, 17, 0, "div", 212)(5, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_For_1_Conditional_5_Template, 2, 0, "p", 213);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r69 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r69.accountName);
    \u0275\u0275advance();
    \u0275\u0275conditional(r_r69.error ? 3 : (r_r69.entries == null ? null : r_r69.entries.length) ? 4 : 5);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_For_1_Template, 6, 2, "div", 210, _forTrack5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(7);
    \u0275\u0275repeater(ctx_r1.reportData().results);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_16_Conditional_0_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 215);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r70 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(9);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r70.item_name || item_r70.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r70.warehouse_name || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r70.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(item_r70.total_cost || 0));
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 212)(1, "table", 214)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "\u0627\u0644\u0635\u0646\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "\u0627\u0644\u0645\u062E\u0632\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "\u0627\u0644\u0643\u0645\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "\u0627\u0644\u062A\u0643\u0644\u0641\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275repeaterCreate(13, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_16_Conditional_0_For_14_Template, 9, 4, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(8);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r1.reportData().data);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 213);
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_16_Conditional_0_Template, 15, 0, "div", 212)(1, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_16_Conditional_1_Template, 2, 0, "p", 213);
  }
  if (rf & 2) {
    let tmp_16_0;
    const ctx_r1 = \u0275\u0275nextContext(7);
    \u0275\u0275conditional(((tmp_16_0 = ctx_r1.reportData().data) == null ? null : tmp_16_0.length) ? 0 : 1);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_17_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 216)(1, "div", 217)(2, "span", 203);
    \u0275\u0275text(3, "arrow_downward");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u062D\u0635\u064A\u0644");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 217)(10, "span", 218);
    \u0275\u0275text(11, "arrow_upward");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "small");
    \u0275\u0275text(16, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0631\u0641");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 217)(18, "span", 202);
    \u0275\u0275text(19, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div")(21, "strong");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "small");
    \u0275\u0275text(24, "\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 217)(26, "span", 219);
    \u0275\u0275text(27, "account_balance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "strong");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "small");
    \u0275\u0275text(32, "\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0635\u064A\u062F");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(8);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(ctx_r1.reportData().data.totalReceipts));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(ctx_r1.reportData().data.totalPayments));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.reportData().data.operationsCount);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(ctx_r1.reportData().data.netBalance));
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 213);
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_17_Conditional_0_Template, 33, 4, "div", 216)(1, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_17_Conditional_1_Template, 2, 0, "p", 213);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(7);
    \u0275\u0275conditional(ctx_r1.reportData().data ? 0 : 1);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r67 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 196)(1, "div", 207)(2, "button", 161);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r67);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.closeReport());
    });
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " \u0631\u062C\u0648\u0639 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h4");
    \u0275\u0275conditionalCreate(7, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_7_Template, 1, 0);
    \u0275\u0275conditionalCreate(8, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_8_Template, 1, 0);
    \u0275\u0275conditionalCreate(9, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_9_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 208)(11, "button", 209);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r67);
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.printCurrentTab());
    });
    \u0275\u0275elementStart(12, "span", 12);
    \u0275\u0275text(13, "print");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " \u0637\u0628\u0627\u0639\u0629 ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(15, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_15_Template, 2, 0);
    \u0275\u0275conditionalCreate(16, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_16_Template, 2, 1);
    \u0275\u0275conditionalCreate(17, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Conditional_17_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_18_0;
    let tmp_19_0;
    let tmp_20_0;
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.reportType() === "account_statement" ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.reportType() === "inventory_report" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.reportType() === "operations_summary" ? 9 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(((tmp_18_0 = ctx_r1.reportData()) == null ? null : tmp_18_0.type) === "account_statement" ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_19_0 = ctx_r1.reportData()) == null ? null : tmp_19_0.type) === "inventory_report" ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_20_0 = ctx_r1.reportData()) == null ? null : tmp_20_0.type) === "operations_summary" ? 17 : -1);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 134);
    \u0275\u0275conditionalCreate(1, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_1_Template, 30, 3)(2, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Conditional_2_Template, 18, 6, "div", 196);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.reportData() ? 1 : 2);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r71 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 135)(1, "textarea", 220);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_8_Template_textarea_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r71);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.onNotesChange($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.screenNotes());
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 127);
    \u0275\u0275conditionalCreate(1, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_1_Template, 3, 1, "div", 128);
    \u0275\u0275conditionalCreate(2, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_2_Template, 46, 5, "div", 129);
    \u0275\u0275conditionalCreate(3, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_3_Template, 6, 2, "div", 130);
    \u0275\u0275conditionalCreate(4, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_4_Template, 4, 0, "div", 131);
    \u0275\u0275conditionalCreate(5, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_5_Template, 3, 2, "div", 132);
    \u0275\u0275conditionalCreate(6, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_6_Template, 3, 1, "div", 133);
    \u0275\u0275conditionalCreate(7, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_7_Template, 3, 1, "div", 134);
    \u0275\u0275conditionalCreate(8, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Conditional_8_Template, 2, 1, "div", 135);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r48 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r48.type === "operations" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r48.type === "log" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r48.type === "accounts" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r48.type === "stats" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r48.type === "chart" ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r48.type === "inventory" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r48.type === "reports" ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r48.type === "notes" ? 8 : -1);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Conditional_0_Template, 9, 8, "div", 127);
  }
  if (rf & 2) {
    const tab_r48 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.activeTabId() === tab_r48.id ? 0 : -1);
  }
}
function CustomScreensComponent_Conditional_4_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 124);
    \u0275\u0275listener("cdkDropListDropped", function CustomScreensComponent_Conditional_4_Conditional_16_Template_div_cdkDropListDropped_0_listener($event) {
      \u0275\u0275restoreView(_r43);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onTabDrop($event));
    });
    \u0275\u0275repeaterCreate(1, CustomScreensComponent_Conditional_4_Conditional_16_For_2_Template, 5, 8, "button", 125, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, CustomScreensComponent_Conditional_4_Conditional_16_For_4_Template, 1, 1, null, null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.screenTabs());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.screenTabs());
  }
}
function CustomScreensComponent_Conditional_4_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r72 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "span", 17);
    \u0275\u0275text(2, "tab");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "\u0644\u0645 \u064A\u062A\u0645 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0628\u0639\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0623\u064A\u0642\u0648\u0646\u0629 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0644\u0625\u0636\u0627\u0641\u0629 \u062A\u0628\u0648\u064A\u0628\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 11);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Conditional_17_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r72);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openConfigWizard());
    });
    \u0275\u0275elementStart(8, "span", 12);
    \u0275\u0275text(9, "settings");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A ");
    \u0275\u0275elementEnd()();
  }
}
function CustomScreensComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 117)(2, "div", 8);
    \u0275\u0275conditionalCreate(3, CustomScreensComponent_Conditional_4_Conditional_3_Template, 3, 0, "button", 118);
    \u0275\u0275elementStart(4, "div", 119)(5, "span", 12);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h2");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 120)(10, "button", 121);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openConfigWizard());
    });
    \u0275\u0275elementStart(11, "span", 12);
    \u0275\u0275text(12, "settings");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 122);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_4_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openScreenForm(ctx_r1.activeScreen()));
    });
    \u0275\u0275elementStart(14, "span", 12);
    \u0275\u0275text(15, "edit");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(16, CustomScreensComponent_Conditional_4_Conditional_16_Template, 5, 0)(17, CustomScreensComponent_Conditional_4_Conditional_17_Template, 11, 0, "div", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("--screen-color", ctx_r1.activeScreen().color || "#3b82f6");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.openedFromSidebar() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r1.activeScreen().color || "#3b82f6");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.activeScreen().icon || "dashboard");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.activeScreen().name);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r1.screenTabs().length > 0 ? 16 : 17);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_14_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r74 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_14_For_5_Template_button_click_0_listener() {
      const tabType_r75 = \u0275\u0275restoreView(_r74).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.addConfigWizardTab(tabType_r75.value));
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 67);
    \u0275\u0275text(8, "add_circle");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tabType_r75 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", tabType_r75.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tabType_r75.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tabType_r75.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tabType_r75.desc);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_14_Conditional_6_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r76 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71)(1, "div", 72)(2, "span", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "input", 227);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_5_Conditional_14_Conditional_6_For_4_Template_input_ngModelChange_5_listener($event) {
      const \u0275$index_1289_r77 = \u0275\u0275restoreView(_r76).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateConfigWizardTab(\u0275$index_1289_r77, "label", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 74);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 75)(9, "button", 228);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_14_Conditional_6_For_4_Template_button_click_9_listener() {
      const \u0275$index_1289_r77 = \u0275\u0275restoreView(_r76).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.moveConfigWizardTab(\u0275$index_1289_r77, "up"));
    });
    \u0275\u0275elementStart(10, "span", 12);
    \u0275\u0275text(11, "arrow_upward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 228);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_14_Conditional_6_For_4_Template_button_click_12_listener() {
      const \u0275$index_1289_r77 = \u0275\u0275restoreView(_r76).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.moveConfigWizardTab(\u0275$index_1289_r77, "down"));
    });
    \u0275\u0275elementStart(13, "span", 12);
    \u0275\u0275text(14, "arrow_downward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 229);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_14_Conditional_6_For_4_Template_button_click_15_listener() {
      const \u0275$index_1289_r77 = \u0275\u0275restoreView(_r76).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.removeConfigWizardTab(\u0275$index_1289_r77));
    });
    \u0275\u0275elementStart(16, "span", 12);
    \u0275\u0275text(17, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const tab_r78 = ctx.$implicit;
    const \u0275$index_1289_r77 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275styleProp("border-right-color", tab_r78.color);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", tab_r78.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r78.icon);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", tab_r78.label);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.getTabTypeInfo(tab_r78.type).color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getTabTypeInfo(tab_r78.type).label);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_1289_r77 === 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", \u0275$index_1289_r77 === ctx_r1.configWizardTabs().length - 1);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_14_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4", 68);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 69);
    \u0275\u0275repeaterCreate(3, CustomScreensComponent_Conditional_5_Conditional_14_Conditional_6_For_4_Template, 18, 11, "div", 70, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A (", ctx_r1.configWizardTabs().length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.configWizardTabs());
  }
}
function CustomScreensComponent_Conditional_5_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "p", 63);
    \u0275\u0275text(2, "\u0623\u0636\u0641 \u0623\u0648 \u0623\u0632\u0644 \u0623\u0648 \u0623\u0639\u062F \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 64);
    \u0275\u0275repeaterCreate(4, CustomScreensComponent_Conditional_5_Conditional_14_For_5_Template, 9, 5, "button", 65, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, CustomScreensComponent_Conditional_5_Conditional_14_Conditional_6_Template, 5, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.tabTypeOptions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.configWizardTabs().length > 0 ? 6 : -1);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r79 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 87);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_For_11_Template_button_click_0_listener() {
      const icon_r80 = \u0275\u0275restoreView(_r79).$implicit;
      \u0275\u0275nextContext();
      const cfgTab_r81 = \u0275\u0275readContextLet(0);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateConfigWizardTab(ctx_r1.configWizardTabs().indexOf(cfgTab_r81), "icon", icon_r80));
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const icon_r80 = ctx.$implicit;
    \u0275\u0275nextContext();
    const cfgTab_r81 = \u0275\u0275readContextLet(0);
    \u0275\u0275classProp("selected", cfgTab_r81.icon === icon_r80);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(icon_r80);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r82 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_For_14_Template_button_click_0_listener() {
      const color_r83 = \u0275\u0275restoreView(_r82).$implicit;
      \u0275\u0275nextContext();
      const cfgTab_r81 = \u0275\u0275readContextLet(0);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateConfigWizardTab(ctx_r1.configWizardTabs().indexOf(cfgTab_r81), "color", color_r83));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const color_r83 = ctx.$implicit;
    \u0275\u0275nextContext();
    const cfgTab_r81 = \u0275\u0275readContextLet(0);
    \u0275\u0275styleProp("background", color_r83);
    \u0275\u0275classProp("selected", cfgTab_r81.color === color_r83);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_15_For_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 93);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_15_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r84 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 92);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_15_For_4_Template_button_click_0_listener() {
      const ot_r85 = \u0275\u0275restoreView(_r84).$implicit;
      \u0275\u0275nextContext(2);
      const cfgTab_r81 = \u0275\u0275readContextLet(0);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleConfigWizardTabOpType(ctx_r1.configWizardTabs().indexOf(cfgTab_r81), ot_r85.id));
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_15_For_4_Conditional_5_Template, 2, 0, "span", 93);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r85 = ctx.$implicit;
    \u0275\u0275nextContext(2);
    const cfgTab_r81 = \u0275\u0275readContextLet(0);
    \u0275\u0275classProp("selected", ((cfgTab_r81.config == null ? null : cfgTab_r81.config.operationTypeIds) || \u0275\u0275pureFunction0(7, _c03)).includes(ot_r85.id));
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ot_r85.color || "#3b82f6");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ot_r85.icon || "receipt_long");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ot_r85.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(((cfgTab_r81.config == null ? null : cfgTab_r81.config.operationTypeIds) || \u0275\u0275pureFunction0(8, _c03)).includes(ot_r85.id) ? 5 : -1);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4");
    \u0275\u0275text(1, "\u0627\u062E\u062A\u0631 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 89);
    \u0275\u0275repeaterCreate(3, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_15_For_4_Template, 6, 9, "button", 90, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 91);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const cfgTab_r81 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.operationTypes());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 ", ((cfgTab_r81.config == null ? null : cfgTab_r81.config.operationTypeIds) || \u0275\u0275pureFunction0(1, _c03)).length, " \u0646\u0648\u0639 \u0639\u0645\u0644\u064A\u0629");
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r88 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 96);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_For_9_Template_button_click_0_listener() {
      const filter_r89 = \u0275\u0275restoreView(_r88).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.setAccFilterType(filter_r89.value));
    });
    \u0275\u0275elementStart(1, "span", 103);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 97);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const filter_r89 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275styleProp("--chip-color", filter_r89.color);
    \u0275\u0275classProp("active", ctx_r1.accFilterType() === filter_r89.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(filter_r89.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", filter_r89.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.allAccounts().filter(\u0275\u0275arrowFunction(7, arrowFn1, ctx)).length);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_For_16_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 93);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r90 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 104);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_For_16_Template_button_click_0_listener() {
      const acc_r91 = \u0275\u0275restoreView(_r90).$implicit;
      \u0275\u0275nextContext(2);
      const cfgTab_r81 = \u0275\u0275readContextLet(0);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleConfigWizardTabAccount(ctx_r1.configWizardTabs().indexOf(cfgTab_r81), acc_r91.id));
    });
    \u0275\u0275elementStart(1, "span", 105);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 106);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 107);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_For_16_Conditional_7_Template, 2, 0, "span", 93);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const acc_r91 = ctx.$implicit;
    \u0275\u0275nextContext(2);
    const cfgTab_r81 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ((cfgTab_r81.config == null ? null : cfgTab_r81.config.accountIds) || \u0275\u0275pureFunction0(8, _c03)).includes(acc_r91.id));
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.getAccTypeMeta(acc_r91.accountType).color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getAccTypeMeta(acc_r91.accountType).icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(acc_r91.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getAccTypeMeta(acc_r91.accountType).label);
    \u0275\u0275advance();
    \u0275\u0275conditional(((cfgTab_r81.config == null ? null : cfgTab_r81.config.accountIds) || \u0275\u0275pureFunction0(9, _c03)).includes(acc_r91.id) ? 7 : -1);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r86 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h4");
    \u0275\u0275text(1, "\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 94)(3, "div", 95)(4, "button", 96);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r86);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.setAccFilterType("all"));
    });
    \u0275\u0275text(5, " \u0627\u0644\u0643\u0644 ");
    \u0275\u0275elementStart(6, "span", 97);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(8, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_For_9_Template, 6, 8, "button", 98, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 99)(11, "span", 12);
    \u0275\u0275text(12, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 100);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r86);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.accSearchQuery.set($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 101);
    \u0275\u0275repeaterCreate(15, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_For_16_Template, 8, 10, "button", 102, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 91);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const cfgTab_r81 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r1.accFilterType() === "all");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.allAccounts().length);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.accDynamicFilters());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.accSearchQuery());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.accFiltered());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 ", ((cfgTab_r81.config == null ? null : cfgTab_r81.config.accountIds) || \u0275\u0275pureFunction0(5, _c03)).length, " \u062D\u0633\u0627\u0628");
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 109)(1, "span", 12);
    \u0275\u0275text(2, "warehouse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0632\u0646. \u0623\u0636\u0641 \u0645\u062E\u0627\u0632\u0646 \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u062E\u0627\u0632\u0646.");
    \u0275\u0275elementEnd()();
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Conditional_5_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wh_r93 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(wh_r93.compositeCode);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Conditional_5_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 93);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r92 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 104);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Conditional_5_For_2_Template_button_click_0_listener() {
      const wh_r93 = \u0275\u0275restoreView(_r92).$implicit;
      \u0275\u0275nextContext(3);
      const cfgTab_r81 = \u0275\u0275readContextLet(0);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleConfigWizardTabWarehouse(ctx_r1.configWizardTabs().indexOf(cfgTab_r81), wh_r93.id));
    });
    \u0275\u0275elementStart(1, "span", 110);
    \u0275\u0275text(2, "warehouse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 106);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Conditional_5_For_2_Conditional_5_Template, 2, 1, "span", 107);
    \u0275\u0275conditionalCreate(6, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Conditional_5_For_2_Conditional_6_Template, 2, 0, "span", 93);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wh_r93 = ctx.$implicit;
    \u0275\u0275nextContext(3);
    const cfgTab_r81 = \u0275\u0275readContextLet(0);
    \u0275\u0275classProp("selected", ((cfgTab_r81.config == null ? null : cfgTab_r81.config.warehouseIds) || \u0275\u0275pureFunction0(5, _c03)).includes(wh_r93.id));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(wh_r93.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(wh_r93.compositeCode ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((cfgTab_r81.config == null ? null : cfgTab_r81.config.warehouseIds) || \u0275\u0275pureFunction0(6, _c03)).includes(wh_r93.id) ? 6 : -1);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101);
    \u0275\u0275repeaterCreate(1, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Conditional_5_For_2_Template, 7, 7, "button", 102, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 91);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const cfgTab_r81 = \u0275\u0275readContextLet(0);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.inventoryWarehouses());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 ", ((cfgTab_r81.config == null ? null : cfgTab_r81.config.warehouseIds) || \u0275\u0275pureFunction0(1, _c03)).length, " \u0645\u062E\u0632\u0646");
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4");
    \u0275\u0275text(1, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0623\u0635\u0646\u0627\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p", 108);
    \u0275\u0275text(3, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u062A\u064A \u062A\u0631\u064A\u062F \u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u0635\u0646\u0627\u0641\u0647\u0627");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Conditional_4_Template, 5, 0, "div", 109)(5, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Conditional_5_Template, 5, 2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.inventoryWarehouses().length === 0 ? 4 : 5);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275declareLet(0);
    \u0275\u0275elementStart(1, "div", 79)(2, "div", 80)(3, "div", 81)(4, "span", 12);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 82)(9, "div", 83);
    \u0275\u0275repeaterCreate(10, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_For_11_Template, 3, 3, "button", 84, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 85);
    \u0275\u0275repeaterCreate(13, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_For_14_Template, 1, 4, "button", 86, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(15, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_15_Template, 7, 2);
    \u0275\u0275conditionalCreate(16, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_16_Template, 19, 6);
    \u0275\u0275conditionalCreate(17, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Conditional_17_Template, 6, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const cfgTabs_r94 = \u0275\u0275readContextLet(0);
    const cfgIdx_r95 = \u0275\u0275readContextLet(1);
    const ctx_r1 = \u0275\u0275nextContext(2);
    const cfgTab_r96 = \u0275\u0275storeLet(cfgTabs_r94[cfgIdx_r95]);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("border-color", cfgTab_r96.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", cfgTab_r96.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cfgTab_r96.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cfgTab_r96.label);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.icons);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.colors);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(cfgTab_r96.type === "operations" ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(cfgTab_r96.type === "accounts" ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(cfgTab_r96.type === "inventory" ? 17 : -1);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275declareLet(0)(1);
    \u0275\u0275conditionalCreate(2, CustomScreensComponent_Conditional_5_Conditional_15_Conditional_2_Template, 18, 10, "div", 79);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const cfgTabs_r97 = \u0275\u0275storeLet(ctx_r1.getConfigWizardConfigurableTabs());
    \u0275\u0275advance();
    const cfgIdx_r98 = \u0275\u0275storeLet(ctx_r1.configWizardStep() - 2);
    \u0275\u0275advance();
    \u0275\u0275conditional(cfgIdx_r98 >= 0 && cfgIdx_r98 < cfgTabs_r97.length ? 2 : -1);
  }
}
function CustomScreensComponent_Conditional_5_Conditional_16_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 116)(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tab_r99 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("border-bottom-color", tab_r99.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", tab_r99.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r99.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r99.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r1.getTabTypeInfo(tab_r99.type).label, ")");
  }
}
function CustomScreensComponent_Conditional_5_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 113);
    \u0275\u0275repeaterCreate(2, CustomScreensComponent_Conditional_5_Conditional_16_For_3_Template, 7, 7, "div", 114, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 230);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.configWizardTabs());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u0633\u064A\u062A\u0645 \u062D\u0641\u0638 ", ctx_r1.configWizardTabs().length, " \u062A\u0628\u0648\u064A\u0628");
  }
}
function CustomScreensComponent_Conditional_5_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r100 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r100);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.prevConfigWizardStep());
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0627\u0644\u0633\u0627\u0628\u0642");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_5_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638", " ");
  }
}
function CustomScreensComponent_Conditional_5_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0627\u0644\u062A\u0627\u0644\u064A ");
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2, "arrow_back");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r73 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 221);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r73);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeConfigWizard());
    });
    \u0275\u0275elementStart(1, "div", 222);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 223)(3, "h3");
    \u0275\u0275text(4, "\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 31)(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 32);
    \u0275\u0275element(9, "div", 33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 224);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r73);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeConfigWizard());
    });
    \u0275\u0275elementStart(11, "span", 12);
    \u0275\u0275text(12, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 225);
    \u0275\u0275conditionalCreate(14, CustomScreensComponent_Conditional_5_Conditional_14_Template, 7, 1, "div", 37);
    \u0275\u0275conditionalCreate(15, CustomScreensComponent_Conditional_5_Conditional_15_Template, 3, 3);
    \u0275\u0275conditionalCreate(16, CustomScreensComponent_Conditional_5_Conditional_16_Template, 6, 1, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 226);
    \u0275\u0275conditionalCreate(18, CustomScreensComponent_Conditional_5_Conditional_18_Template, 4, 0, "button", 40);
    \u0275\u0275element(19, "div", 41);
    \u0275\u0275elementStart(20, "button", 42);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_5_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r73);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextConfigWizardStep());
    });
    \u0275\u0275conditionalCreate(21, CustomScreensComponent_Conditional_5_Conditional_21_Template, 3, 1)(22, CustomScreensComponent_Conditional_5_Conditional_22_Template, 3, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("\u0627\u0644\u062E\u0637\u0648\u0629 ", ctx_r1.configWizardStep(), " \u0645\u0646 ", ctx_r1.getConfigWizardTotalSteps());
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.configWizardStep() / ctx_r1.getConfigWizardTotalSteps() * 100, "%");
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.configWizardStep() === 1 ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.configWizardStep() >= 2 && ctx_r1.configWizardStep() < ctx_r1.getConfigWizardTotalSteps() ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.configWizardStep() === ctx_r1.getConfigWizardTotalSteps() ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.configWizardStep() > 1 ? 18 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.configWizardStep() === ctx_r1.getConfigWizardTotalSteps() ? 21 : 22);
  }
}
function CustomScreensComponent_Conditional_6_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r102 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 87);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_6_For_22_Template_button_click_0_listener() {
      const icon_r103 = \u0275\u0275restoreView(_r102).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.screenForm.set(__spreadProps(__spreadValues({}, ctx_r1.screenForm()), { icon: icon_r103 })));
    });
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const icon_r103 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.screenForm().icon === icon_r103);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(icon_r103);
  }
}
function CustomScreensComponent_Conditional_6_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r104 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_6_For_28_Template_button_click_0_listener() {
      const color_r105 = \u0275\u0275restoreView(_r104).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.screenForm.set(__spreadProps(__spreadValues({}, ctx_r1.screenForm()), { color: color_r105 })));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const color_r105 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("background", color_r105);
    \u0275\u0275classProp("selected", ctx_r1.screenForm().color === color_r105);
  }
}
function CustomScreensComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r101 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 221);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_6_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r101);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeScreenForm());
    });
    \u0275\u0275elementStart(1, "div", 231);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_6_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 223)(3, "h3");
    \u0275\u0275text(4, "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0634\u0627\u0634\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 224);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_6_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r101);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeScreenForm());
    });
    \u0275\u0275elementStart(6, "span", 12);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 225)(9, "div", 43)(10, "label");
    \u0275\u0275text(11, "\u0627\u0633\u0645 \u0627\u0644\u0634\u0627\u0634\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 232);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_6_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r101);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.screenForm.set(__spreadProps(__spreadValues({}, ctx_r1.screenForm()), { name: $event })));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 43)(14, "label");
    \u0275\u0275text(15, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "textarea", 233);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_6_Template_textarea_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r101);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.screenForm.set(__spreadProps(__spreadValues({}, ctx_r1.screenForm()), { description: $event })));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 43)(18, "label");
    \u0275\u0275text(19, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 83);
    \u0275\u0275repeaterCreate(21, CustomScreensComponent_Conditional_6_For_22_Template, 3, 3, "button", 84, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 43)(24, "label");
    \u0275\u0275text(25, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 85);
    \u0275\u0275repeaterCreate(27, CustomScreensComponent_Conditional_6_For_28_Template, 1, 4, "button", 86, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 226)(30, "button", 30);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_6_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r101);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeScreenForm());
    });
    \u0275\u0275text(31, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 42);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_6_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r101);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveScreen());
    });
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275property("ngModel", ctx_r1.screenForm().name);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.screenForm().description);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.icons);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.colors);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638");
  }
}
function CustomScreensComponent_Conditional_7_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 205);
    \u0275\u0275element(1, "div", 235);
    \u0275\u0275text(2, " \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd();
  }
}
function CustomScreensComponent_Conditional_7_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r107 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 236)(1, "span", 237);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 60);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_7_Conditional_10_For_2_Template_select_ngModelChange_3_listener($event) {
      const user_r108 = \u0275\u0275restoreView(_r107).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setUserPermission(user_r108.id, $event));
    });
    \u0275\u0275elementStart(4, "option", 238);
    \u0275\u0275text(5, "\u0628\u062F\u0648\u0646 \u0635\u0644\u0627\u062D\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 239);
    \u0275\u0275text(7, "\u0639\u0631\u0636 \u0641\u0642\u0637");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 240);
    \u0275\u0275text(9, "\u0639\u0631\u0636 \u0648\u062A\u0646\u0641\u064A\u0630");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r108 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r108.fullName || user_r108.username);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.getUserPermission(user_r108.id));
  }
}
function CustomScreensComponent_Conditional_7_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 234);
    \u0275\u0275repeaterCreate(1, CustomScreensComponent_Conditional_7_Conditional_10_For_2_Template, 10, 2, "div", 236, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.permissionsUsers());
  }
}
function CustomScreensComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r106 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 221);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_7_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r106);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePermissionsModal());
    });
    \u0275\u0275elementStart(1, "div", 231);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_7_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 223)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 224);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_7_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r106);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePermissionsModal());
    });
    \u0275\u0275elementStart(6, "span", 12);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 225);
    \u0275\u0275conditionalCreate(9, CustomScreensComponent_Conditional_7_Conditional_9_Template, 3, 0, "div", 205)(10, CustomScreensComponent_Conditional_7_Conditional_10_Template, 3, 0, "div", 234);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 226)(12, "button", 30);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_7_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r106);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePermissionsModal());
    });
    \u0275\u0275text(13, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 42);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_7_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r106);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.savePermissions());
    });
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0634\u0627\u0634\u0629: ", (tmp_1_0 = ctx_r1.permissionsScreen()) == null ? null : tmp_1_0.name);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.permissionsLoading() ? 9 : 10);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638");
  }
}
function CustomScreensComponent_Conditional_8_For_13_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 249)(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r112 = ctx.$implicit;
    \u0275\u0275styleProp("background", t_r112.color + "20")("color", t_r112.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r112.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r112.label, " ");
  }
}
function CustomScreensComponent_Conditional_8_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r110 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 244);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_8_For_13_Template_div_click_0_listener() {
      const preset_r111 = \u0275\u0275restoreView(_r110).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.applyPreset(preset_r111));
    });
    \u0275\u0275elementStart(1, "div", 245)(2, "span", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 246)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 247);
    \u0275\u0275repeaterCreate(10, CustomScreensComponent_Conditional_8_For_13_For_11_Template, 4, 6, "span", 248, _forTrack7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const preset_r111 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", preset_r111.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(preset_r111.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(preset_r111.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(preset_r111.description);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(preset_r111.tabs);
  }
}
function CustomScreensComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r109 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 221);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_8_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r109);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showTemplatesModal.set(false));
    });
    \u0275\u0275elementStart(1, "div", 222);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_8_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 223)(3, "h3");
    \u0275\u0275text(4, "\u0642\u0648\u0627\u0644\u0628 \u0634\u0627\u0634\u0627\u062A \u062C\u0627\u0647\u0632\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 224);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r109);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showTemplatesModal.set(false));
    });
    \u0275\u0275elementStart(6, "span", 12);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 225)(9, "p", 241);
    \u0275\u0275text(10, "\u0627\u062E\u062A\u0631 \u0642\u0627\u0644\u0628\u0627\u064B \u0644\u0625\u0646\u0634\u0627\u0621 \u0634\u0627\u0634\u0629 \u0628\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0645\u0639\u062F\u0629 \u0645\u0633\u0628\u0642\u0627\u064B");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 242);
    \u0275\u0275repeaterCreate(12, CustomScreensComponent_Conditional_8_For_13_Template, 12, 5, "div", 243, _forTrack6);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275repeater(ctx_r1.screenPresets);
  }
}
function CustomScreensComponent_Conditional_9_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const section_r114 = ctx.$implicit;
    \u0275\u0275property("value", section_r114.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(section_r114.name);
  }
}
function CustomScreensComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r113 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 221);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_9_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r113);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarModal());
    });
    \u0275\u0275elementStart(1, "div", 231);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_9_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 223)(3, "h3");
    \u0275\u0275text(4, "\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 224);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r113);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarModal());
    });
    \u0275\u0275elementStart(6, "span", 12);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 225)(9, "div", 43)(10, "label");
    \u0275\u0275text(11, "\u0627\u0644\u0642\u0633\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 60);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_9_Template_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r113);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectedSidebarSection.set(+$event));
    });
    \u0275\u0275repeaterCreate(13, CustomScreensComponent_Conditional_9_For_14_Template, 2, 2, "option", 61, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 43)(16, "label");
    \u0275\u0275text(17, "\u0627\u0644\u062A\u0631\u062A\u064A\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 250);
    \u0275\u0275listener("ngModelChange", function CustomScreensComponent_Conditional_9_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r113);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sidebarSortOrder.set(+$event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 226)(20, "button", 30);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_9_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r113);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSidebarModal());
    });
    \u0275\u0275text(21, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 42);
    \u0275\u0275listener("click", function CustomScreensComponent_Conditional_9_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r113);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addToSidebar());
    });
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275property("ngModel", ctx_r1.selectedSidebarSection());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.sidebarSections());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.sidebarSortOrder());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0636\u0627\u0641\u0629..." : "\u0625\u0636\u0627\u0641\u0629");
  }
}
var TAB_TYPE_OPTIONS = [
  { value: "operations", label: "\u0642\u0648\u0627\u0644\u0628 \u0639\u0645\u0644\u064A\u0627\u062A", icon: "receipt_long", desc: "\u0623\u0632\u0631\u0627\u0631 \u0644\u062A\u0646\u0641\u064A\u0630 \u0639\u0645\u0644\u064A\u0627\u062A (\u062A\u062D\u0635\u064A\u0644/\u062A\u0648\u0631\u064A\u062F/\u062A\u062D\u0648\u064A\u0644)", color: "#3b82f6", defaultIcon: "receipt_long", defaultColor: "#3b82f6" },
  { value: "log", label: "\u0633\u062C\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A", icon: "history", desc: "\u062C\u062F\u0648\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0645\u0639 \u0641\u0644\u0627\u062A\u0631 \u0648\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A", color: "#22c55e", defaultIcon: "history", defaultColor: "#6366f1" },
  { value: "accounts", label: "\u0645\u0631\u0627\u0642\u0628\u0629 \u062D\u0633\u0627\u0628\u0627\u062A", icon: "account_balance", desc: "\u0639\u0631\u0636 \u0623\u0631\u0635\u062F\u0629 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639 \u0627\u062A\u062C\u0627\u0647 \u0648\u0622\u062E\u0631 \u062D\u0631\u0643\u0629", color: "#f59e0b", defaultIcon: "savings", defaultColor: "#10b981" },
  { value: "inventory", label: "\u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u0635\u0646\u0627\u0641", icon: "inventory_2", desc: "\u0639\u0631\u0636 \u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0645\u0639 \u0627\u0644\u0643\u0645\u064A\u0627\u062A \u0648\u0627\u0644\u062A\u0643\u0627\u0644\u064A\u0641 \u0648\u0622\u062E\u0631 \u062D\u0631\u0643\u0629", color: "#0ea5e9", defaultIcon: "inventory_2", defaultColor: "#0ea5e9" },
  { value: "stats", label: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A", icon: "analytics", desc: "\u0623\u0631\u0642\u0627\u0645 \u0645\u0644\u062E\u0635\u0629 (\u062A\u062D\u0635\u064A\u0644\u060C \u0635\u0631\u0641\u060C \u0639\u062F\u062F \u0639\u0645\u0644\u064A\u0627\u062A\u060C \u0635\u0627\u0641\u064A)", color: "#8b5cf6", defaultIcon: "analytics", defaultColor: "#8b5cf6" },
  { value: "chart", label: "\u0631\u0633\u0645 \u0628\u064A\u0627\u0646\u064A", icon: "bar_chart", desc: "\u0631\u0633\u0645 \u0628\u064A\u0627\u0646\u064A \u0644\u0644\u062A\u062D\u0635\u064A\u0644 \u0648\u0627\u0644\u0635\u0631\u0641", color: "#14b8a6", defaultIcon: "bar_chart", defaultColor: "#14b8a6" },
  { value: "reports", label: "\u062A\u0642\u0627\u0631\u064A\u0631", icon: "summarize", desc: "\u0627\u0633\u062A\u062E\u0631\u0627\u062C \u062A\u0642\u0627\u0631\u064A\u0631 \u0644\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629", color: "#ec4899", defaultIcon: "summarize", defaultColor: "#ec4899" },
  { value: "notes", label: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A", icon: "sticky_note_2", desc: "\u0645\u0646\u0637\u0642\u0629 \u0646\u0635 \u062D\u0631 \u0645\u0639 \u062D\u0641\u0638 \u062A\u0644\u0642\u0627\u0626\u064A", color: "#f97316", defaultIcon: "sticky_note_2", defaultColor: "#f97316" }
];
var CustomScreensComponent = class _CustomScreensComponent extends BasePageComponent {
  api = inject(ApiService);
  auth = inject(AuthService);
  toast = inject(ToastService);
  wsService = inject(WebSocketService);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Data =====================
  screens = signal([], ...ngDevMode ? [{ debugName: "screens" }] : (
    /* istanbul ignore next */
    []
  ));
  activeScreen = signal(null, ...ngDevMode ? [{ debugName: "activeScreen" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== UI State =====================
  viewMode = signal("list", ...ngDevMode ? [{ debugName: "viewMode" }] : (
    /* istanbul ignore next */
    []
  ));
  openedFromSidebar = signal(false, ...ngDevMode ? [{ debugName: "openedFromSidebar" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Dynamic Tabs (Screen View) =====================
  screenTabs = signal([], ...ngDevMode ? [{ debugName: "screenTabs" }] : (
    /* istanbul ignore next */
    []
  ));
  activeTabId = signal("", ...ngDevMode ? [{ debugName: "activeTabId" }] : (
    /* istanbul ignore next */
    []
  ));
  screenNotes = signal("", ...ngDevMode ? [{ debugName: "screenNotes" }] : (
    /* istanbul ignore next */
    []
  ));
  notesSaveTimeout = null;
  // ===================== Tab Data (loaded per tab) =====================
  operationTypes = signal([], ...ngDevMode ? [{ debugName: "operationTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  allAccounts = signal([], ...ngDevMode ? [{ debugName: "allAccounts" }] : (
    /* istanbul ignore next */
    []
  ));
  // Operations tab
  csSelectedOpType = signal(null, ...ngDevMode ? [{ debugName: "csSelectedOpType" }] : (
    /* istanbul ignore next */
    []
  ));
  csFormEntries = signal([], ...ngDevMode ? [{ debugName: "csFormEntries" }] : (
    /* istanbul ignore next */
    []
  ));
  csFormDescription = signal("", ...ngDevMode ? [{ debugName: "csFormDescription" }] : (
    /* istanbul ignore next */
    []
  ));
  csFormDate = signal((/* @__PURE__ */ new Date()).toISOString().split("T")[0], ...ngDevMode ? [{ debugName: "csFormDate" }] : (
    /* istanbul ignore next */
    []
  ));
  // Log tab
  logEntries = signal([], ...ngDevMode ? [{ debugName: "logEntries" }] : (
    /* istanbul ignore next */
    []
  ));
  logTotal = signal(0, ...ngDevMode ? [{ debugName: "logTotal" }] : (
    /* istanbul ignore next */
    []
  ));
  logFilterDateFrom = signal("", ...ngDevMode ? [{ debugName: "logFilterDateFrom" }] : (
    /* istanbul ignore next */
    []
  ));
  logFilterDateTo = signal("", ...ngDevMode ? [{ debugName: "logFilterDateTo" }] : (
    /* istanbul ignore next */
    []
  ));
  logFilterOpType = signal("", ...ngDevMode ? [{ debugName: "logFilterOpType" }] : (
    /* istanbul ignore next */
    []
  ));
  logSearchQuery = signal("", ...ngDevMode ? [{ debugName: "logSearchQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  logMinAmount = signal(null, ...ngDevMode ? [{ debugName: "logMinAmount" }] : (
    /* istanbul ignore next */
    []
  ));
  logMaxAmount = signal(null, ...ngDevMode ? [{ debugName: "logMaxAmount" }] : (
    /* istanbul ignore next */
    []
  ));
  logPage = signal(1, ...ngDevMode ? [{ debugName: "logPage" }] : (
    /* istanbul ignore next */
    []
  ));
  logPageSize = signal(20, ...ngDevMode ? [{ debugName: "logPageSize" }] : (
    /* istanbul ignore next */
    []
  ));
  logSortBy = signal("entry_date", ...ngDevMode ? [{ debugName: "logSortBy" }] : (
    /* istanbul ignore next */
    []
  ));
  logSortDir = signal("desc", ...ngDevMode ? [{ debugName: "logSortDir" }] : (
    /* istanbul ignore next */
    []
  ));
  // Auto-refresh
  autoRefreshEnabled = signal(false, ...ngDevMode ? [{ debugName: "autoRefreshEnabled" }] : (
    /* istanbul ignore next */
    []
  ));
  autoRefreshInterval = null;
  autoRefreshCountdown = signal(30, ...ngDevMode ? [{ debugName: "autoRefreshCountdown" }] : (
    /* istanbul ignore next */
    []
  ));
  countdownInterval = null;
  // Chart period filter
  chartGroupBy = signal("monthly", ...ngDevMode ? [{ debugName: "chartGroupBy" }] : (
    /* istanbul ignore next */
    []
  ));
  chartMonths = signal(6, ...ngDevMode ? [{ debugName: "chartMonths" }] : (
    /* istanbul ignore next */
    []
  ));
  chartDateFrom = signal("", ...ngDevMode ? [{ debugName: "chartDateFrom" }] : (
    /* istanbul ignore next */
    []
  ));
  chartDateTo = signal("", ...ngDevMode ? [{ debugName: "chartDateTo" }] : (
    /* istanbul ignore next */
    []
  ));
  // Stats period filter
  statsPeriod = signal("all", ...ngDevMode ? [{ debugName: "statsPeriod" }] : (
    /* istanbul ignore next */
    []
  ));
  statsDateFrom = signal("", ...ngDevMode ? [{ debugName: "statsDateFrom" }] : (
    /* istanbul ignore next */
    []
  ));
  statsDateTo = signal("", ...ngDevMode ? [{ debugName: "statsDateTo" }] : (
    /* istanbul ignore next */
    []
  ));
  // Voucher details modal
  showVoucherDetails = signal(false, ...ngDevMode ? [{ debugName: "showVoucherDetails" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedVoucherDetails = signal(null, ...ngDevMode ? [{ debugName: "selectedVoucherDetails" }] : (
    /* istanbul ignore next */
    []
  ));
  voucherDetailsLoading = signal(false, ...ngDevMode ? [{ debugName: "voucherDetailsLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  // Accounts tab
  widgetAccounts = signal([], ...ngDevMode ? [{ debugName: "widgetAccounts" }] : (
    /* istanbul ignore next */
    []
  ));
  // Inventory tab (مراقبة الأصناف)
  widgetInventory = signal([], ...ngDevMode ? [{ debugName: "widgetInventory" }] : (
    /* istanbul ignore next */
    []
  ));
  inventoryWarehouses = signal([], ...ngDevMode ? [{ debugName: "inventoryWarehouses" }] : (
    /* istanbul ignore next */
    []
  ));
  // Stats tab
  widgetStats = signal({ totalReceipts: 0, totalPayments: 0, operationsCount: 0, netBalance: 0 }, ...ngDevMode ? [{ debugName: "widgetStats" }] : (
    /* istanbul ignore next */
    []
  ));
  // Chart tab
  barChartData = { labels: [], datasets: [
    { data: [], label: "\u0627\u0644\u062A\u062D\u0635\u064A\u0644", backgroundColor: "rgba(59, 130, 246, 0.6)", borderColor: "rgba(59, 130, 246, 1)", borderWidth: 1, borderRadius: 6 },
    { data: [], label: "\u0627\u0644\u0635\u0631\u0641", backgroundColor: "rgba(239, 68, 68, 0.6)", borderColor: "rgba(239, 68, 68, 1)", borderWidth: 1, borderRadius: 6 }
  ] };
  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top", labels: { font: { family: "Tajawal", size: 12 }, padding: 16 } } },
    scales: {
      y: { beginAtZero: true, ticks: { font: { family: "Tajawal", size: 11 } }, grid: { color: "rgba(0,0,0,0.05)" } },
      x: { ticks: { font: { family: "Tajawal", size: 11 } }, grid: { display: false } }
    }
  };
  // ===================== Wizard State =====================
  wizardStep = signal(1, ...ngDevMode ? [{ debugName: "wizardStep" }] : (
    /* istanbul ignore next */
    []
  ));
  // 1=basic info, 2=add tabs, 3+=configure each tab, last=preview
  wizardScreenName = signal("", ...ngDevMode ? [{ debugName: "wizardScreenName" }] : (
    /* istanbul ignore next */
    []
  ));
  wizardScreenDesc = signal("", ...ngDevMode ? [{ debugName: "wizardScreenDesc" }] : (
    /* istanbul ignore next */
    []
  ));
  wizardScreenIcon = signal("dashboard", ...ngDevMode ? [{ debugName: "wizardScreenIcon" }] : (
    /* istanbul ignore next */
    []
  ));
  wizardScreenColor = signal("#3b82f6", ...ngDevMode ? [{ debugName: "wizardScreenColor" }] : (
    /* istanbul ignore next */
    []
  ));
  wizardAddToSidebar = signal(true, ...ngDevMode ? [{ debugName: "wizardAddToSidebar" }] : (
    /* istanbul ignore next */
    []
  ));
  wizardSidebarSectionId = signal(0, ...ngDevMode ? [{ debugName: "wizardSidebarSectionId" }] : (
    /* istanbul ignore next */
    []
  ));
  wizardSidebarSortOrder = signal(0, ...ngDevMode ? [{ debugName: "wizardSidebarSortOrder" }] : (
    /* istanbul ignore next */
    []
  ));
  wizardSidebarSections = signal([], ...ngDevMode ? [{ debugName: "wizardSidebarSections" }] : (
    /* istanbul ignore next */
    []
  ));
  wizardTabs = signal([], ...ngDevMode ? [{ debugName: "wizardTabs" }] : (
    /* istanbul ignore next */
    []
  ));
  wizardConfigTabIdx = signal(0, ...ngDevMode ? [{ debugName: "wizardConfigTabIdx" }] : (
    /* istanbul ignore next */
    []
  ));
  // which tab is being configured in step 3+
  wizardIsEditing = signal(false, ...ngDevMode ? [{ debugName: "wizardIsEditing" }] : (
    /* istanbul ignore next */
    []
  ));
  // true if editing existing screen
  // ===================== Account Filter (for accounts tab config) =====================
  accFilterType = signal("all", ...ngDevMode ? [{ debugName: "accFilterType" }] : (
    /* istanbul ignore next */
    []
  ));
  accSearchQuery = signal("", ...ngDevMode ? [{ debugName: "accSearchQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  accDynamicFilters = computed(() => {
    const all = this.allAccounts();
    const typesInDB = [...new Set(all.map((a) => a.accountType).filter(Boolean))];
    const priority = ["billing", "fund", "bank", "exchange", "e_wallet", "warehouse", "custody", "supplier", "employee", "partner", "budget", "settlement", "pending", "accounting"];
    const sorted = typesInDB.sort((a, b) => {
      const ia = priority.indexOf(a);
      const ib = priority.indexOf(b);
      if (ia >= 0 && ib >= 0)
        return ia - ib;
      if (ia >= 0)
        return -1;
      if (ib >= 0)
        return 1;
      return getAccTypeMeta(a).label.localeCompare(getAccTypeMeta(b).label, "ar");
    });
    return sorted.map((type) => __spreadValues({ value: type }, getAccTypeMeta(type)));
  }, ...ngDevMode ? [{ debugName: "accDynamicFilters" }] : (
    /* istanbul ignore next */
    []
  ));
  accFiltered = computed(() => {
    const type = this.accFilterType();
    const q = this.accSearchQuery().toLowerCase();
    return this.allAccounts().filter((a) => {
      const matchType = type === "all" || a.accountType === type;
      const matchQ = !q || (a.name || "").toLowerCase().includes(q) || (a.provider || "").toLowerCase().includes(q) || (a.subType || "").toLowerCase().includes(q);
      return matchType && matchQ;
    });
  }, ...ngDevMode ? [{ debugName: "accFiltered" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Config Wizard (for existing screens) =====================
  showConfigWizard = signal(false, ...ngDevMode ? [{ debugName: "showConfigWizard" }] : (
    /* istanbul ignore next */
    []
  ));
  configWizardStep = signal(1, ...ngDevMode ? [{ debugName: "configWizardStep" }] : (
    /* istanbul ignore next */
    []
  ));
  configWizardTabs = signal([], ...ngDevMode ? [{ debugName: "configWizardTabs" }] : (
    /* istanbul ignore next */
    []
  ));
  configWizardConfigTabIdx = signal(0, ...ngDevMode ? [{ debugName: "configWizardConfigTabIdx" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Permissions Modal =====================
  showPermissionsModal = signal(false, ...ngDevMode ? [{ debugName: "showPermissionsModal" }] : (
    /* istanbul ignore next */
    []
  ));
  permissionsScreen = signal(null, ...ngDevMode ? [{ debugName: "permissionsScreen" }] : (
    /* istanbul ignore next */
    []
  ));
  permissionsUsers = signal([], ...ngDevMode ? [{ debugName: "permissionsUsers" }] : (
    /* istanbul ignore next */
    []
  ));
  permissionsMap = signal({}, ...ngDevMode ? [{ debugName: "permissionsMap" }] : (
    /* istanbul ignore next */
    []
  ));
  permissionsLoading = signal(false, ...ngDevMode ? [{ debugName: "permissionsLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Screen Form Modal (Edit name/icon/color) =====================
  showScreenForm = signal(false, ...ngDevMode ? [{ debugName: "showScreenForm" }] : (
    /* istanbul ignore next */
    []
  ));
  editingScreen = signal(null, ...ngDevMode ? [{ debugName: "editingScreen" }] : (
    /* istanbul ignore next */
    []
  ));
  screenForm = signal({ name: "", description: "", icon: "dashboard", color: "#3b82f6" }, ...ngDevMode ? [{ debugName: "screenForm" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Add to Sidebar Modal =====================
  showSidebarModal = signal(false, ...ngDevMode ? [{ debugName: "showSidebarModal" }] : (
    /* istanbul ignore next */
    []
  ));
  sidebarScreen = signal(null, ...ngDevMode ? [{ debugName: "sidebarScreen" }] : (
    /* istanbul ignore next */
    []
  ));
  sidebarSections = signal([], ...ngDevMode ? [{ debugName: "sidebarSections" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedSidebarSection = signal(0, ...ngDevMode ? [{ debugName: "selectedSidebarSection" }] : (
    /* istanbul ignore next */
    []
  ));
  sidebarSortOrder = signal(99, ...ngDevMode ? [{ debugName: "sidebarSortOrder" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Embedded Reports =====================
  reportLoading = signal(false, ...ngDevMode ? [{ debugName: "reportLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  reportData = signal(null, ...ngDevMode ? [{ debugName: "reportData" }] : (
    /* istanbul ignore next */
    []
  ));
  reportType = signal("", ...ngDevMode ? [{ debugName: "reportType" }] : (
    /* istanbul ignore next */
    []
  ));
  reportDateFrom = signal("", ...ngDevMode ? [{ debugName: "reportDateFrom" }] : (
    /* istanbul ignore next */
    []
  ));
  reportDateTo = signal("", ...ngDevMode ? [{ debugName: "reportDateTo" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Options =====================
  tabTypeOptions = TAB_TYPE_OPTIONS;
  icons = [
    "dashboard",
    "bolt",
    "receipt_long",
    "receipt",
    "account_balance_wallet",
    "category",
    "savings",
    "menu_book",
    "currency_exchange",
    "groups",
    "handshake",
    "warehouse",
    "local_shipping",
    "balance",
    "assessment",
    "monitor",
    "grid_view",
    "view_module",
    "widgets",
    "space_dashboard",
    "analytics",
    "pie_chart",
    "bar_chart",
    "trending_up",
    "speed",
    "history",
    "sticky_note_2",
    "arrow_downward",
    "arrow_upward",
    "call_received",
    "call_made",
    "payments",
    "lock",
    "miscellaneous_services"
  ];
  colors = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    "#f97316",
    "#ec4899",
    "#06b6d4",
    "#84cc16"
  ];
  // ===================== Lifecycle =====================
  wsEffect = null;
  constructor() {
    super();
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(async (qp) => {
      if (qp["screen"]) {
        this.openedFromSidebar.set(true);
        const screenId = Number.parseInt(qp["screen"], 10);
        const screen = this.screens().find((s) => s.id === screenId);
        if (screen)
          await this.openScreen(screen);
      }
    });
  }
  onBizIdChange(_bizId) {
    void this.loadScreens();
    this.loadCurrencies();
    try {
      const token = this.auth.getToken();
      if (token && this.bizId) {
        this.wsService.connect(token, this.bizId);
      }
    } catch (e) {
    }
  }
  ngOnDestroy() {
    if (this.notesSaveTimeout)
      clearTimeout(this.notesSaveTimeout);
    this.stopAutoRefresh();
    this.wsService.disconnect();
    super.ngOnDestroy();
  }
  // ===================== Load Data =====================
  async loadScreens() {
    this.loading.set(true);
    try {
      const data = await this.api.getScreens(this.bizId);
      this.screens.set(data);
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0634\u0627\u0634\u0627\u062A");
    } finally {
      this.loading.set(false);
    }
  }
  // ===================== Open Screen (Dynamic Tabs) =====================
  async openScreen(screen) {
    this.activeScreen.set(screen);
    this.viewMode.set("screen");
    this.loading.set(true);
    try {
      const config = await this.api.getCollectionStyleConfig(this.bizId, screen.id);
      const tabs = config.tabs || [];
      this.screenTabs.set(tabs);
      this.screenNotes.set(config.notes || "");
      if (tabs.length > 0) {
        this.activeTabId.set(tabs[0].id);
      }
      const [opTypes, accountsData] = await Promise.all([
        this.api.getOperationTypes(this.bizId),
        this.api.getAllAccounts(this.bizId)
      ]);
      this.operationTypes.set(opTypes);
      this.allAccounts.set(accountsData.accounts || []);
      await this.loadTabsData(tabs);
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0634\u0627\u0634\u0629");
    } finally {
      this.loading.set(false);
    }
  }
  async loadTabsData(tabs) {
    const types = new Set(tabs.map((t) => t.type));
    const promises = [];
    if (types.has("log"))
      promises.push(this.loadLogData());
    if (types.has("stats"))
      promises.push(this.loadStatsData());
    if (types.has("chart"))
      promises.push(this.loadChartData());
    const accountTabs = tabs.filter((t) => t.type === "accounts");
    if (accountTabs.length > 0) {
      const allAccountIds = /* @__PURE__ */ new Set();
      accountTabs.forEach((t) => (t.config?.accountIds || []).forEach((id) => allAccountIds.add(id)));
      if (allAccountIds.size > 0) {
        promises.push(this.loadAccountsData(Array.from(allAccountIds)));
      }
    }
    const inventoryTabs = tabs.filter((t) => t.type === "inventory");
    if (inventoryTabs.length > 0) {
      const allWarehouseIds = /* @__PURE__ */ new Set();
      inventoryTabs.forEach((t) => (t.config?.warehouseIds || []).forEach((id) => allWarehouseIds.add(id)));
      if (allWarehouseIds.size > 0) {
        promises.push(this.loadInventoryData(Array.from(allWarehouseIds)));
      }
    }
    await Promise.allSettled(promises);
  }
  async loadLogData() {
    try {
      const filters = {
        limit: this.logPageSize(),
        offset: (this.logPage() - 1) * this.logPageSize()
      };
      if (this.logFilterDateFrom())
        filters.dateFrom = this.logFilterDateFrom();
      if (this.logFilterDateTo())
        filters.dateTo = this.logFilterDateTo();
      if (this.logFilterOpType())
        filters.operationTypeId = Number.parseInt(this.logFilterOpType(), 10);
      if (this.logSearchQuery())
        filters.search = this.logSearchQuery();
      if (this.logMinAmount())
        filters.minAmount = this.logMinAmount();
      if (this.logMaxAmount())
        filters.maxAmount = this.logMaxAmount();
      const result = await this.api.getWidgetLogEnhanced(this.bizId, filters);
      this.logEntries.set(result.entries || []);
      this.logTotal.set(result.total || 0);
    } catch (e) {
      try {
        const filters = { limit: 50 };
        if (this.logFilterDateFrom())
          filters.dateFrom = this.logFilterDateFrom();
        if (this.logFilterDateTo())
          filters.dateTo = this.logFilterDateTo();
        if (this.logFilterOpType())
          filters.operationTypeId = Number.parseInt(this.logFilterOpType(), 10);
        const result = await this.api.getWidgetLog(this.bizId, filters);
        this.logEntries.set(result.entries || []);
        this.logTotal.set(result.total || 0);
      } catch (e2) {
        console.error("Error loading log:", e2);
      }
    }
  }
  // Pagination
  get logTotalPages() {
    return Math.ceil(this.logTotal() / this.logPageSize()) || 1;
  }
  async goToLogPage(page) {
    if (page < 1 || page > this.logTotalPages)
      return;
    this.logPage.set(page);
    await this.loadLogData();
  }
  getLogPageNumbers() {
    const total = this.logTotalPages;
    const current = this.logPage();
    const pages = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    for (let i = start; i <= end; i++)
      pages.push(i);
    return pages;
  }
  // Sort
  toggleLogSort(column) {
    if (this.logSortBy() === column) {
      this.logSortDir.set(this.logSortDir() === "asc" ? "desc" : "asc");
    } else {
      this.logSortBy.set(column);
      this.logSortDir.set("desc");
    }
    this.logPage.set(1);
    this.loadLogData();
  }
  // Auto-refresh
  toggleAutoRefresh() {
    if (this.autoRefreshEnabled()) {
      this.stopAutoRefresh();
    } else {
      this.startAutoRefresh();
    }
  }
  startAutoRefresh() {
    this.autoRefreshEnabled.set(true);
    this.autoRefreshCountdown.set(30);
    this.countdownInterval = setInterval(() => {
      this.autoRefreshCountdown.update((c) => c - 1);
    }, 1e3);
    this.autoRefreshInterval = setInterval(async () => {
      this.autoRefreshCountdown.set(30);
      const screen = this.activeScreen();
      if (screen) {
        const tabs = this.screenTabs();
        await this.loadTabsData(tabs);
      }
    }, 3e4);
  }
  stopAutoRefresh() {
    this.autoRefreshEnabled.set(false);
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
      this.autoRefreshInterval = null;
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }
  // Voucher Details
  async openVoucherDetails(entryId) {
    this.voucherDetailsLoading.set(true);
    this.showVoucherDetails.set(true);
    try {
      const details = await this.api.getVoucherDetails(this.bizId, entryId);
      this.selectedVoucherDetails.set(details);
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062C\u0644\u0628 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644");
      this.showVoucherDetails.set(false);
    } finally {
      this.voucherDetailsLoading.set(false);
    }
  }
  closeVoucherDetails() {
    this.showVoucherDetails.set(false);
    this.selectedVoucherDetails.set(null);
  }
  async loadStatsData() {
    try {
      const stats = await this.api.getWidgetStatsEnhanced(this.bizId, this.statsPeriod() !== "all" ? this.statsPeriod() : void 0, this.statsDateFrom() || void 0, this.statsDateTo() || void 0);
      this.widgetStats.set(stats);
    } catch (e) {
      try {
        const stats = await this.api.getWidgetStats(this.bizId);
        this.widgetStats.set(stats);
      } catch (e2) {
        console.error("Error loading stats:", e2);
      }
    }
  }
  async changeStatsPeriod(period) {
    this.statsPeriod.set(period);
    await this.loadStatsData();
  }
  async loadChartData() {
    try {
      const chartData = await this.api.getWidgetChartEnhanced(this.bizId, this.chartGroupBy(), this.chartMonths(), this.chartDateFrom() || void 0, this.chartDateTo() || void 0);
      this.barChartData = {
        labels: chartData.labels || [],
        datasets: [
          { data: chartData.receipts || [], label: "\u0627\u0644\u062A\u062D\u0635\u064A\u0644", backgroundColor: "rgba(59, 130, 246, 0.6)", borderColor: "rgba(59, 130, 246, 1)", borderWidth: 1, borderRadius: 6 },
          { data: chartData.payments || [], label: "\u0627\u0644\u0635\u0631\u0641", backgroundColor: "rgba(239, 68, 68, 0.6)", borderColor: "rgba(239, 68, 68, 1)", borderWidth: 1, borderRadius: 6 }
        ]
      };
    } catch (e) {
      try {
        const chartData = await this.api.getWidgetChart(this.bizId, 6);
        this.barChartData = {
          labels: chartData.labels || [],
          datasets: [
            { data: chartData.receipts || [], label: "\u0627\u0644\u062A\u062D\u0635\u064A\u0644", backgroundColor: "rgba(59, 130, 246, 0.6)", borderColor: "rgba(59, 130, 246, 1)", borderWidth: 1, borderRadius: 6 },
            { data: chartData.payments || [], label: "\u0627\u0644\u0635\u0631\u0641", backgroundColor: "rgba(239, 68, 68, 0.6)", borderColor: "rgba(239, 68, 68, 1)", borderWidth: 1, borderRadius: 6 }
          ]
        };
      } catch (e2) {
        console.error("Error loading chart:", e2);
      }
    }
  }
  async changeChartGroupBy(groupBy) {
    this.chartGroupBy.set(groupBy);
    await this.loadChartData();
  }
  async changeChartMonths(months) {
    this.chartMonths.set(months);
    await this.loadChartData();
  }
  async loadAccountsData(accountIds) {
    try {
      const accounts = await this.api.getWidgetAccounts(this.bizId, accountIds);
      this.widgetAccounts.set(accounts);
    } catch (e) {
      console.error("Error loading accounts:", e);
    }
  }
  async loadInventoryData(warehouseIds) {
    try {
      const results = [];
      for (const whId of warehouseIds) {
        const inventory = await this.api.getWarehouseInventory(this.bizId, whId);
        results.push(...inventory || []);
      }
      this.widgetInventory.set(results);
    } catch (e) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646:", e);
    }
  }
  // ===================== Tab Helpers =====================
  setActiveTab(tabId) {
    this.activeTabId.set(tabId);
  }
  getTabOperationTypes(tab) {
    const ids = tab.config?.operationTypeIds || [];
    if (ids.length === 0)
      return this.operationTypes();
    return this.operationTypes().filter((ot) => ids.includes(ot.id));
  }
  getTabAccounts(tab) {
    const ids = tab.config?.accountIds || [];
    if (ids.length === 0)
      return this.widgetAccounts();
    return this.widgetAccounts().filter((a) => ids.includes(a.id));
  }
  getTabInventory(tab) {
    const ids = tab.config?.warehouseIds || [];
    if (ids.length === 0)
      return this.widgetInventory();
    return this.widgetInventory().filter((item) => ids.includes(item.warehouseId));
  }
  getStatsCards() {
    const s = this.widgetStats();
    return [
      { label: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u062D\u0635\u064A\u0644", value: this.formatNumber(s.totalReceipts), icon: "trending_up", color: "#22c55e" },
      { label: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0631\u0641", value: this.formatNumber(s.totalPayments), icon: "trending_down", color: "#ef4444" },
      { label: "\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A", value: String(s.operationsCount), icon: "receipt_long", color: "#3b82f6" },
      { label: "\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0635\u064A\u062F", value: this.formatNumber(s.netBalance), icon: "account_balance", color: "#8b5cf6" }
    ];
  }
  getTotalAccountsBalance() {
    return this.widgetAccounts().reduce((sum, a) => sum + (a.total_balance || 0), 0);
  }
  // ===================== Operations Form =====================
  selectOpType(ot) {
    this.csSelectedOpType.set(ot);
    const accounts = ot.linkedAccounts || ot.accounts || [];
    const entries = accounts.filter((la) => la.isActive !== false).map((la) => ({
      accountId: la.accountId || la.id,
      accountName: la.label || la.accountName || "",
      amount: "",
      notes: ""
    }));
    if (entries.length === 0)
      entries.push({ accountId: null, accountName: "", amount: "", notes: "" });
    this.csFormEntries.set(entries);
    this.csFormDescription.set("");
    this.csFormDate.set((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  }
  cancelOpType() {
    this.csSelectedOpType.set(null);
    this.csFormEntries.set([]);
  }
  updateFormEntry(index, field, value) {
    this.csFormEntries.update((entries) => {
      const updated = [...entries];
      updated[index] = __spreadProps(__spreadValues({}, updated[index]), { [field]: value });
      return updated;
    });
  }
  getFormTotal() {
    return this.csFormEntries().reduce((sum, e) => {
      const amt = Number.parseFloat(e.amount);
      return sum + (Number.isNaN(amt) ? 0 : amt);
    }, 0);
  }
  getFilledEntriesCount() {
    return this.csFormEntries().filter((e) => Number.parseFloat(e.amount) > 0).length;
  }
  getAccountBalance(accountId) {
    const acc = this.widgetAccounts().find((a) => a.id === accountId);
    return acc?.total_balance || 0;
  }
  // Currencies for multi-currency support
  currencies = signal([], ...ngDevMode ? [{ debugName: "currencies" }] : (
    /* istanbul ignore next */
    []
  ));
  csFormCurrencyId = signal(1, ...ngDevMode ? [{ debugName: "csFormCurrencyId" }] : (
    /* istanbul ignore next */
    []
  ));
  // Transfer mode
  csTransferFromAccountId = signal(null, ...ngDevMode ? [{ debugName: "csTransferFromAccountId" }] : (
    /* istanbul ignore next */
    []
  ));
  csTransferToAccountId = signal(null, ...ngDevMode ? [{ debugName: "csTransferToAccountId" }] : (
    /* istanbul ignore next */
    []
  ));
  csTransferAmount = signal("", ...ngDevMode ? [{ debugName: "csTransferAmount" }] : (
    /* istanbul ignore next */
    []
  ));
  async loadCurrencies() {
    try {
      const c = await this.api.getCurrencies();
      this.currencies.set(c || []);
    } catch (e) {
    }
  }
  isTransferType() {
    const ot = this.csSelectedOpType();
    return ot && (ot.voucherType === "transfer" || ot.voucherType === "journal" || (ot.name || "").includes("\u062A\u062D\u0648\u064A\u0644"));
  }
  async saveOperation() {
    const opType = this.csSelectedOpType();
    if (!opType)
      return;
    if (this.isTransferType()) {
      const fromId = this.csTransferFromAccountId();
      const toId = this.csTransferToAccountId();
      const amount = Number.parseFloat(this.csTransferAmount());
      if (!fromId || !toId) {
        this.toast.warning("\u0627\u062E\u062A\u0631 \u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0627\u0644\u0648\u062C\u0647\u0629");
        return;
      }
      if (fromId === toId) {
        this.toast.warning("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0644\u0646\u0641\u0633 \u0627\u0644\u062D\u0633\u0627\u0628");
        return;
      }
      if (!amount || amount <= 0) {
        this.toast.warning("\u0623\u062F\u062E\u0644 \u0645\u0628\u0644\u063A\u0627\u064B \u0635\u062D\u064A\u062D\u0627\u064B");
        return;
      }
      const fromAcc = this.allAccounts().find((a) => a.id === fromId);
      const toAcc = this.allAccounts().find((a) => a.id === toId);
      const confirmed2 = await this.toast.confirm({
        title: `\u062A\u0623\u0643\u064A\u062F \u062A\u062D\u0648\u064A\u0644 - ${opType.name}`,
        message: `\u062A\u062D\u0648\u064A\u0644 ${amount.toLocaleString("ar-SA")} \u0645\u0646 "${fromAcc?.name || fromId}" \u0625\u0644\u0649 "${toAcc?.name || toId}"`,
        type: "info"
      });
      if (!confirmed2)
        return;
      this.saving.set(true);
      try {
        const result = await this.api.createVoucher(this.bizId, {
          voucherType: "journal",
          operationTypeId: opType.id,
          fromAccountId: fromId,
          toAccountId: toId,
          amount,
          currencyId: this.csFormCurrencyId(),
          description: this.csFormDescription() || `${opType.name} - \u062A\u062D\u0648\u064A\u0644`,
          voucherDate: this.csFormDate()
        });
        this.toast.success(`\u062A\u0645 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u062C\u0627\u062D - ${amount.toLocaleString("ar-SA")}`);
        this.csSelectedOpType.set(null);
        this.csTransferFromAccountId.set(null);
        this.csTransferToAccountId.set(null);
        this.csTransferAmount.set("");
        const screen = this.activeScreen();
        if (screen)
          await this.openScreen(screen);
      } catch (e) {
        this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0648\u064A\u0644");
      } finally {
        this.saving.set(false);
      }
      return;
    }
    const entries = this.csFormEntries().filter((e) => Number.parseFloat(e.amount) > 0);
    if (!entries.length) {
      this.toast.warning("\u0623\u062F\u062E\u0644 \u0645\u0628\u0644\u063A\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    const total = this.getFormTotal();
    const vTypeLabel = opType.voucherType === "receipt" ? "\u062A\u062D\u0635\u064A\u0644" : opType.voucherType === "payment" ? "\u062A\u0648\u0631\u064A\u062F" : "\u0639\u0645\u0644\u064A\u0629";
    const vType = opType.voucherType === "payment" ? "payment" : "receipt";
    const useMulti = opType.hasMultiLines !== false;
    const pm = String(opType.paymentMethod || "").trim();
    if (!pm) {
      this.toast.warning("\u062D\u062F\u062F \u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062F\u0641\u0639 \u0648\u0627\u0644\u062E\u0632\u064A\u0646\u0629 (\u0627\u0644\u0645\u0635\u062F\u0631) \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u0642\u0628\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630");
      return;
    }
    if (pm === "cash") {
      if (!opType.sourceFundId) {
        this.toast.warning("\u062D\u062F\u062F \u0627\u0644\u062E\u0632\u064A\u0646\u0629 (\u0627\u0644\u0635\u0646\u062F\u0648\u0642) \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u0642\u0628\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630");
        return;
      }
    } else {
      if (!opType.sourceAccountId) {
        this.toast.warning("\u062D\u062F\u062F \u0627\u0644\u062E\u0632\u064A\u0646\u0629 (\u062D\u0633\u0627\u0628 \u0628\u0646\u0643/\u0635\u0631\u0627\u0641/\u0645\u062D\u0641\u0638\u0629) \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u0642\u0628\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630");
        return;
      }
    }
    const summaryLines = entries.map((e) => `\u2022 ${e.accountName}: ${Number.parseFloat(e.amount).toLocaleString("ar-SA")}`).join("\n");
    const confirmed = await this.toast.confirm({
      title: `\u062A\u0623\u0643\u064A\u062F ${vTypeLabel} - ${opType.name}`,
      message: useMulti ? `\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u0646\u062F ${vTypeLabel} \u0648\u0627\u062D\u062F (\u0645\u062A\u0639\u062F\u062F) \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 ${entries.length} \u0633\u0637\u0648\u0631 \u0628\u0625\u062C\u0645\u0627\u0644\u064A ${total.toLocaleString("ar-SA")}:
${summaryLines}` : `\u0633\u064A\u062A\u0645 \u062A\u0646\u0641\u064A\u0630 ${entries.length} \u0633\u0646\u062F \u0628\u0625\u062C\u0645\u0627\u0644\u064A ${total.toLocaleString("ar-SA")}:
${summaryLines}`,
      type: opType.voucherType === "payment" ? "danger" : "info"
    });
    if (!confirmed)
      return;
    this.saving.set(true);
    const results = [];
    const errors = [];
    try {
      if (useMulti) {
        const result = await this.api.createVoucherMulti(this.bizId, {
          voucherType: vType,
          operationTypeId: opType.id,
          currencyId: this.csFormCurrencyId(),
          description: this.csFormDescription() || `${opType.name}`,
          voucherDate: this.csFormDate(),
          entries: entries.map((e) => ({
            accountId: e.accountId,
            amount: Number.parseFloat(e.amount),
            notes: e.notes || null
          }))
        });
        results.push(result);
      } else {
        for (const entry of entries) {
          try {
            const payload = {
              voucherType: vType,
              operationTypeId: opType.id,
              amount: Number.parseFloat(entry.amount),
              currencyId: this.csFormCurrencyId(),
              description: this.csFormDescription() || `${opType.name} - ${entry.accountName}`,
              voucherDate: this.csFormDate()
            };
            if (vType === "receipt") {
              payload.fromAccountId = entry.accountId;
            } else {
              payload.toAccountId = entry.accountId;
            }
            const result = await this.api.createVoucher(this.bizId, payload);
            results.push(result);
          } catch (e) {
            errors.push(`${entry.accountName}: ${e instanceof Error ? e.message : "\u062E\u0637\u0623"}`);
          }
        }
      }
      if (results.length > 0 && errors.length === 0) {
        const countLabel = useMulti ? "\u0633\u0646\u062F \u0648\u0627\u062D\u062F" : `${results.length} \u0633\u0646\u062F`;
        const vNo = results[0]?.voucherNumber ? ` (\u0631\u0642\u0645: ${results[0].voucherNumber})` : "";
        this.toast.success(`\u062A\u0645 \u062A\u0646\u0641\u064A\u0630 ${countLabel} \u0628\u0646\u062C\u0627\u062D - \u0625\u062C\u0645\u0627\u0644\u064A: ${total.toLocaleString("ar-SA")}${vNo}`);
      } else if (results.length > 0) {
        this.toast.warning(`\u062A\u0645 ${results.length} \u0639\u0645\u0644\u064A\u0629 \u0628\u0646\u062C\u0627\u062D\u060C \u0641\u0634\u0644\u062A ${errors.length}`);
      } else {
        this.toast.error(errors.length > 0 ? errors[0] : "\u0641\u0634\u0644\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
      }
      if (results.length > 0) {
        this.csSelectedOpType.set(null);
        this.csFormEntries.set([]);
        this.csFormCurrencyId.set(1);
      }
      const screen = this.activeScreen();
      if (screen)
        await this.openScreen(screen);
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");
    } finally {
      this.saving.set(false);
    }
  }
  // ===================== Log Filters =====================
  async applyLogFilters() {
    this.logPage.set(1);
    await this.loadLogData();
  }
  async clearLogFilters() {
    this.logFilterDateFrom.set("");
    this.logFilterDateTo.set("");
    this.logFilterOpType.set("");
    this.logSearchQuery.set("");
    this.logMinAmount.set(null);
    this.logMaxAmount.set(null);
    this.logPage.set(1);
    await this.loadLogData();
  }
  // ===================== Notes =====================
  onNotesChange(text) {
    this.screenNotes.set(text);
    if (this.notesSaveTimeout)
      clearTimeout(this.notesSaveTimeout);
    this.notesSaveTimeout = setTimeout(async () => {
      const screen = this.activeScreen();
      if (!screen)
        return;
      try {
        const tabs = this.screenTabs();
        await this.api.saveCollectionStyleConfig(this.bizId, screen.id, { tabs, notes: text });
      } catch (e) {
        console.error("Error auto-saving notes:", e);
      }
    }, 2e3);
  }
  // ===================== WIZARD (Create New Screen) =====================
  startWizard() {
    this.viewMode.set("wizard");
    this.wizardStep.set(1);
    this.wizardScreenName.set("");
    this.wizardScreenDesc.set("");
    this.wizardScreenIcon.set("dashboard");
    this.wizardScreenColor.set("#3b82f6");
    this.wizardAddToSidebar.set(true);
    this.wizardSidebarSectionId.set(0);
    this.wizardSidebarSortOrder.set(0);
    this.wizardTabs.set([]);
    this.wizardConfigTabIdx.set(0);
    this.wizardIsEditing.set(false);
    this.loadWizardData();
  }
  async loadWizardData() {
    try {
      const [sections, opTypes, accountsData, warehouses] = await Promise.all([
        this.api.getSidebarSections(this.bizId),
        this.api.getOperationTypes(this.bizId),
        this.api.getAllAccounts(this.bizId),
        this.api.getWarehouses(this.bizId)
      ]);
      this.wizardSidebarSections.set(sections);
      if (sections.length > 0)
        this.wizardSidebarSectionId.set(sections[0].id);
      this.operationTypes.set(opTypes);
      this.allAccounts.set(accountsData.accounts || []);
      this.inventoryWarehouses.set(warehouses || []);
    } catch (e) {
      console.error("Error loading wizard data:", e);
    }
  }
  cancelWizard() {
    this.viewMode.set("list");
  }
  // Wizard: total steps = 2 (basic + tabs) + number of tabs that need config + 1 (preview)
  getWizardTotalSteps() {
    return 2 + this.getConfigurableTabs().length + 1;
  }
  getConfigurableTabs() {
    return this.wizardTabs().filter((t) => t.type === "operations" || t.type === "accounts" || t.type === "inventory");
  }
  getWizardStepTitle() {
    const step = this.wizardStep();
    if (step === 1)
      return "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0627\u0634\u0629";
    if (step === 2)
      return "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A";
    const configTabs = this.getConfigurableTabs();
    const configIdx = step - 3;
    if (configIdx >= 0 && configIdx < configTabs.length) {
      return `\u0625\u0639\u062F\u0627\u062F: ${configTabs[configIdx].label}`;
    }
    return "\u0645\u0639\u0627\u064A\u0646\u0629 \u0648\u062D\u0641\u0638";
  }
  nextWizardStep() {
    const step = this.wizardStep();
    if (step === 1 && !this.wizardScreenName().trim()) {
      this.toast.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0627\u0634\u0629");
      return;
    }
    if (step === 2 && this.wizardTabs().length === 0) {
      this.toast.warning("\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u062A\u0628\u0648\u064A\u0628 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    const total = this.getWizardTotalSteps();
    if (step < total) {
      this.wizardStep.set(step + 1);
      const configIdx = step + 1 - 3;
      if (configIdx >= 0)
        this.wizardConfigTabIdx.set(configIdx);
    } else {
      this.saveWizardScreen();
    }
  }
  prevWizardStep() {
    const step = this.wizardStep();
    if (step > 1)
      this.wizardStep.set(step - 1);
  }
  // Wizard: Add tab
  addWizardTab(typeValue) {
    const typeInfo = TAB_TYPE_OPTIONS.find((t) => t.value === typeValue);
    if (!typeInfo)
      return;
    const tabs = [...this.wizardTabs()];
    const newTab = {
      id: `tab_${Date.now()}`,
      label: typeInfo.label,
      icon: typeInfo.defaultIcon,
      color: typeInfo.defaultColor,
      type: typeValue,
      sortOrder: tabs.length + 1,
      config: {}
    };
    tabs.push(newTab);
    this.wizardTabs.set(tabs);
  }
  removeWizardTab(idx) {
    const tabs = [...this.wizardTabs()];
    tabs.splice(idx, 1);
    tabs.forEach((t, i) => t.sortOrder = i + 1);
    this.wizardTabs.set(tabs);
  }
  moveWizardTab(idx, direction) {
    const tabs = [...this.wizardTabs()];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= tabs.length)
      return;
    [tabs[idx], tabs[targetIdx]] = [tabs[targetIdx], tabs[idx]];
    tabs.forEach((t, i) => t.sortOrder = i + 1);
    this.wizardTabs.set(tabs);
  }
  updateWizardTab(idx, field, value) {
    const tabs = [...this.wizardTabs()];
    tabs[idx] = __spreadProps(__spreadValues({}, tabs[idx]), { [field]: value });
    this.wizardTabs.set(tabs);
  }
  // Wizard: Toggle operation type for tab config
  toggleWizardTabOpType(tabIdx, opTypeId) {
    const tabs = [...this.wizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...tab.config?.operationTypeIds || []];
    const idx = ids.indexOf(opTypeId);
    if (idx >= 0)
      ids.splice(idx, 1);
    else
      ids.push(opTypeId);
    tabs[tabIdx] = __spreadProps(__spreadValues({}, tab), { config: __spreadProps(__spreadValues({}, tab.config), { operationTypeIds: ids }) });
    this.wizardTabs.set(tabs);
  }
  // Wizard: Toggle account for tab config
  toggleWizardTabAccount(tabIdx, accountId) {
    const tabs = [...this.wizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...tab.config?.accountIds || []];
    const idx = ids.indexOf(accountId);
    if (idx >= 0)
      ids.splice(idx, 1);
    else
      ids.push(accountId);
    tabs[tabIdx] = __spreadProps(__spreadValues({}, tab), { config: __spreadProps(__spreadValues({}, tab.config), { accountIds: ids }) });
    this.wizardTabs.set(tabs);
  }
  setAccFilterType(type) {
    this.accFilterType.set(type);
  }
  getAccTypeMeta(type) {
    return getAccTypeMeta(type);
  }
  // Wizard: Toggle warehouse for inventory tab config
  toggleWizardTabWarehouse(tabIdx, warehouseId) {
    const tabs = [...this.wizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...tab.config?.warehouseIds || []];
    const idx = ids.indexOf(warehouseId);
    if (idx >= 0)
      ids.splice(idx, 1);
    else
      ids.push(warehouseId);
    tabs[tabIdx] = __spreadProps(__spreadValues({}, tab), { config: __spreadProps(__spreadValues({}, tab.config), { warehouseIds: ids }) });
    this.wizardTabs.set(tabs);
  }
  toggleConfigWizardTabWarehouse(tabIdx, warehouseId) {
    const tabs = [...this.configWizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...tab.config?.warehouseIds || []];
    const idx = ids.indexOf(warehouseId);
    if (idx >= 0)
      ids.splice(idx, 1);
    else
      ids.push(warehouseId);
    tabs[tabIdx] = __spreadProps(__spreadValues({}, tab), { config: __spreadProps(__spreadValues({}, tab.config), { warehouseIds: ids }) });
    this.configWizardTabs.set(tabs);
  }
  async saveWizardScreen() {
    const name = this.wizardScreenName();
    if (!name.trim()) {
      this.toast.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0627\u0634\u0629");
      return;
    }
    this.saving.set(true);
    try {
      const payload = {
        name,
        description: this.wizardScreenDesc(),
        icon: this.wizardScreenIcon(),
        color: this.wizardScreenColor(),
        templateKey: "collection_style",
        widgets: [],
        addToSidebar: this.wizardAddToSidebar()
      };
      if (this.wizardAddToSidebar()) {
        const sectionId = this.wizardSidebarSectionId();
        if (sectionId)
          payload.sidebarSectionId = sectionId;
        payload.sidebarSortOrder = this.wizardSidebarSortOrder();
      }
      let screenId;
      if (this.wizardIsEditing() && this.activeScreen()) {
        screenId = this.activeScreen().id;
        await this.api.updateScreen(screenId, { name, description: this.wizardScreenDesc(), icon: this.wizardScreenIcon(), color: this.wizardScreenColor() });
      } else {
        const newScreen = await this.api.createScreen(this.bizId, payload);
        screenId = newScreen.id;
      }
      await this.api.saveCollectionStyleConfig(this.bizId, screenId, { tabs: this.wizardTabs(), notes: "" });
      this.toast.success(this.wizardIsEditing() ? "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0634\u0627\u0634\u0629 \u0628\u0646\u062C\u0627\u062D" : "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0634\u0627\u0634\u0629 \u0628\u0646\u062C\u0627\u062D");
      await this.loadScreens();
      const screen = this.screens().find((s) => s.id === screenId);
      if (screen)
        await this.openScreen(screen);
      else
        this.viewMode.set("list");
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638");
    } finally {
      this.saving.set(false);
    }
  }
  // ===================== Config Wizard (Edit Existing Screen Tabs) =====================
  async openConfigWizard() {
    const screen = this.activeScreen();
    if (!screen)
      return;
    const config = await this.api.getCollectionStyleConfig(this.bizId, screen.id);
    this.configWizardTabs.set([...config.tabs || []]);
    this.configWizardStep.set(1);
    this.configWizardConfigTabIdx.set(0);
    await this.loadWizardData();
    this.showConfigWizard.set(true);
  }
  closeConfigWizard() {
    this.showConfigWizard.set(false);
  }
  getConfigWizardTotalSteps() {
    return 1 + this.getConfigWizardConfigurableTabs().length + 1;
  }
  getConfigWizardConfigurableTabs() {
    return this.configWizardTabs().filter((t) => t.type === "operations" || t.type === "accounts" || t.type === "inventory");
  }
  nextConfigWizardStep() {
    const step = this.configWizardStep();
    const total = this.getConfigWizardTotalSteps();
    if (step === 1 && this.configWizardTabs().length === 0) {
      this.toast.warning("\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u062A\u0628\u0648\u064A\u0628 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    if (step < total) {
      this.configWizardStep.set(step + 1);
      const configIdx = step + 1 - 2;
      if (configIdx >= 0)
        this.configWizardConfigTabIdx.set(configIdx);
    } else {
      this.saveConfigWizard();
    }
  }
  prevConfigWizardStep() {
    const step = this.configWizardStep();
    if (step > 1)
      this.configWizardStep.set(step - 1);
  }
  addConfigWizardTab(typeValue) {
    const typeInfo = TAB_TYPE_OPTIONS.find((t) => t.value === typeValue);
    if (!typeInfo)
      return;
    const tabs = [...this.configWizardTabs()];
    tabs.push({
      id: `tab_${Date.now()}`,
      label: typeInfo.label,
      icon: typeInfo.defaultIcon,
      color: typeInfo.defaultColor,
      type: typeValue,
      sortOrder: tabs.length + 1,
      config: {}
    });
    this.configWizardTabs.set(tabs);
  }
  removeConfigWizardTab(idx) {
    const tabs = [...this.configWizardTabs()];
    tabs.splice(idx, 1);
    tabs.forEach((t, i) => t.sortOrder = i + 1);
    this.configWizardTabs.set(tabs);
  }
  moveConfigWizardTab(idx, direction) {
    const tabs = [...this.configWizardTabs()];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= tabs.length)
      return;
    [tabs[idx], tabs[targetIdx]] = [tabs[targetIdx], tabs[idx]];
    tabs.forEach((t, i) => t.sortOrder = i + 1);
    this.configWizardTabs.set(tabs);
  }
  updateConfigWizardTab(idx, field, value) {
    const tabs = [...this.configWizardTabs()];
    tabs[idx] = __spreadProps(__spreadValues({}, tabs[idx]), { [field]: value });
    this.configWizardTabs.set(tabs);
  }
  toggleConfigWizardTabOpType(tabIdx, opTypeId) {
    const tabs = [...this.configWizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...tab.config?.operationTypeIds || []];
    const idx = ids.indexOf(opTypeId);
    if (idx >= 0)
      ids.splice(idx, 1);
    else
      ids.push(opTypeId);
    tabs[tabIdx] = __spreadProps(__spreadValues({}, tab), { config: __spreadProps(__spreadValues({}, tab.config), { operationTypeIds: ids }) });
    this.configWizardTabs.set(tabs);
  }
  toggleConfigWizardTabAccount(tabIdx, accountId) {
    const tabs = [...this.configWizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...tab.config?.accountIds || []];
    const idx = ids.indexOf(accountId);
    if (idx >= 0)
      ids.splice(idx, 1);
    else
      ids.push(accountId);
    tabs[tabIdx] = __spreadProps(__spreadValues({}, tab), { config: __spreadProps(__spreadValues({}, tab.config), { accountIds: ids }) });
    this.configWizardTabs.set(tabs);
  }
  async saveConfigWizard() {
    const screen = this.activeScreen();
    if (!screen)
      return;
    this.saving.set(true);
    try {
      await this.api.saveCollectionStyleConfig(this.bizId, screen.id, {
        tabs: this.configWizardTabs(),
        notes: this.screenNotes()
      });
      this.toast.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F \u0628\u0646\u062C\u0627\u062D");
      this.closeConfigWizard();
      await this.openScreen(screen);
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F");
    } finally {
      this.saving.set(false);
    }
  }
  // ===================== Screen CRUD =====================
  backToList() {
    this.viewMode.set("list");
    this.activeScreen.set(null);
    this.screenTabs.set([]);
    this.openedFromSidebar.set(false);
  }
  openScreenForm(screen) {
    if (screen) {
      this.editingScreen.set(screen);
      this.screenForm.set({ name: screen.name, description: screen.description || "", icon: screen.icon || "dashboard", color: screen.color || "#3b82f6" });
      this.showScreenForm.set(true);
    } else {
      this.startWizard();
    }
  }
  closeScreenForm() {
    this.showScreenForm.set(false);
    this.editingScreen.set(null);
  }
  async saveScreen() {
    const form = this.screenForm();
    if (!form.name.trim()) {
      this.toast.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0627\u0634\u0629");
      return;
    }
    this.saving.set(true);
    try {
      const editing = this.editingScreen();
      if (editing) {
        await this.api.updateScreen(editing.id, form);
        this.toast.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0634\u0627\u0634\u0629");
      }
      this.closeScreenForm();
      await this.loadScreens();
      if (editing && this.activeScreen()?.id === editing.id) {
        const updated = this.screens().find((s) => s.id === editing.id);
        if (updated)
          this.activeScreen.set(updated);
      }
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    } finally {
      this.saving.set(false);
    }
  }
  async deleteScreen(screen) {
    const confirmed = await this.toast.confirm({
      title: "\u062D\u0630\u0641 \u0627\u0644\u0634\u0627\u0634\u0629",
      message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u0634\u0627\u0634\u0629 "${screen.name}"\u061F`,
      type: "danger"
    });
    if (!confirmed)
      return;
    try {
      await this.api.deleteScreen(screen.id);
      this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0634\u0627\u0634\u0629");
      await this.loadScreens();
      if (this.activeScreen()?.id === screen.id)
        this.backToList();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641");
    }
  }
  async cloneScreen(screen) {
    this.saving.set(true);
    try {
      await this.api.cloneScreen(screen.id, { name: `${screen.name} (\u0646\u0633\u062E\u0629)` });
      this.toast.success("\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0634\u0627\u0634\u0629 \u0628\u0646\u062C\u0627\u062D");
      await this.loadScreens();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0646\u0633\u062E");
    } finally {
      this.saving.set(false);
    }
  }
  // ===================== Permissions =====================
  async openPermissionsModal(screen) {
    this.permissionsScreen.set(screen);
    this.permissionsLoading.set(true);
    this.showPermissionsModal.set(true);
    try {
      const [users, perms] = await Promise.all([this.api.getUsers(), this.api.getScreenPermissions(screen.id)]);
      this.permissionsUsers.set(users);
      const map2 = {};
      for (const p of perms)
        map2[p.userId] = p.permission;
      this.permissionsMap.set(map2);
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A");
    } finally {
      this.permissionsLoading.set(false);
    }
  }
  closePermissionsModal() {
    this.showPermissionsModal.set(false);
    this.permissionsScreen.set(null);
  }
  setUserPermission(userId, permission) {
    const map2 = __spreadValues({}, this.permissionsMap());
    if (permission === "none")
      delete map2[userId];
    else
      map2[userId] = permission;
    this.permissionsMap.set(map2);
  }
  getUserPermission(userId) {
    return this.permissionsMap()[userId] || "none";
  }
  async savePermissions() {
    const screen = this.permissionsScreen();
    if (!screen)
      return;
    this.saving.set(true);
    try {
      const map2 = this.permissionsMap();
      const permissions = Object.entries(map2).map(([userId, permission]) => ({ userId: Number.parseInt(userId, 10), permission }));
      await this.api.batchUpdateScreenPermissions(screen.id, permissions);
      this.toast.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0628\u0646\u062C\u0627\u062D");
      this.closePermissionsModal();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A");
    } finally {
      this.saving.set(false);
    }
  }
  // ===================== Sidebar Modal =====================
  async openSidebarModal(screen) {
    this.sidebarScreen.set(screen);
    this.selectedSidebarSection.set(0);
    this.sidebarSortOrder.set(99);
    try {
      const sections = await this.api.getSidebarSections(this.bizId);
      this.sidebarSections.set(sections);
      if (sections.length > 0)
        this.selectedSidebarSection.set(sections[0].id);
      this.showSidebarModal.set(true);
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0642\u0633\u0627\u0645");
    }
  }
  closeSidebarModal() {
    this.showSidebarModal.set(false);
    this.sidebarScreen.set(null);
  }
  async addToSidebar() {
    const screen = this.sidebarScreen();
    const sectionId = this.selectedSidebarSection();
    if (!screen || !sectionId) {
      this.toast.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0642\u0633\u0645");
      return;
    }
    this.saving.set(true);
    try {
      await this.api.addScreenToSidebar(this.bizId, screen.id, { sectionId, sortOrder: this.sidebarSortOrder() });
      this.toast.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0634\u0627\u0634\u0629 \u0644\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629");
      this.closeSidebarModal();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0625\u0636\u0627\u0641\u0629");
    } finally {
      this.saving.set(false);
    }
  }
  // ===================== Color Picker =====================
  onColorPickerChange(color, target, idx) {
    switch (target) {
      case "wizard":
        this.wizardScreenColor.set(color);
        break;
      case "screen":
        this.screenForm.set(__spreadProps(__spreadValues({}, this.screenForm()), { color }));
        break;
      case "wizardTab":
        if (idx !== void 0)
          this.updateWizardTab(idx, "color", color);
        break;
      case "configTab":
        if (idx !== void 0)
          this.updateConfigWizardTab(idx, "color", color);
        break;
    }
  }
  // ===================== Helpers =====================
  formatDate(dateStr) {
    return formatDate(dateStr || "", "ar-SA");
  }
  formatNumber(num) {
    if (!num && num !== 0)
      return "0";
    return num.toLocaleString("ar-SA", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
  formatAmount(amount) {
    return formatAmountPrecise(amount, 0, 2, "ar-SA");
  }
  getVoucherTypeLabel(type) {
    switch (type) {
      case "receipt":
        return "\u062A\u062D\u0635\u064A\u0644";
      case "payment":
        return "\u0635\u0631\u0641";
      case "journal":
        return "\u0642\u064A\u062F";
      default:
        return type || "\u0639\u0645\u0644\u064A\u0629";
    }
  }
  getVoucherTypeClass(type) {
    switch (type) {
      case "receipt":
        return "collection";
      case "payment":
        return "expense";
      case "journal":
        return "transfer";
      default:
        return "collection";
    }
  }
  getAccountIcon(type) {
    return getAccTypeMeta(type).icon;
  }
  getBalanceTrend(account) {
    const movements = account.last_movements || [];
    if (movements.length < 2)
      return "stable";
    return movements[0]?.line_type === "debit" ? "up" : "down";
  }
  getTrendIcon(trend) {
    switch (trend) {
      case "up":
        return "trending_up";
      case "down":
        return "trending_down";
      default:
        return "trending_flat";
    }
  }
  getTrendColor(trend) {
    switch (trend) {
      case "up":
        return "#22c55e";
      case "down":
        return "#ef4444";
      default:
        return "#94a3b8";
    }
  }
  getTabTypeInfo(type) {
    return TAB_TYPE_OPTIONS.find((t) => t.value === type) || TAB_TYPE_OPTIONS[0];
  }
  // ===== Inventory Helpers =====
  getInventoryTotalCost(tab) {
    return this.getTabInventory(tab).reduce((sum, item) => sum + (Number(item.total_cost) || 0), 0);
  }
  // ===== Reports =====
  async generateReport(reportType, tab) {
    this.reportType.set(reportType);
    this.reportLoading.set(true);
    this.reportData.set(null);
    try {
      if (reportType === "account_statement") {
        const accountIds = tab.config?.accountIds || [];
        if (accountIds.length === 0) {
          this.toast.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u062D\u0633\u0627\u0628\u0627\u062A \u0644\u0644\u062A\u0642\u0631\u064A\u0631");
          this.reportLoading.set(false);
          return;
        }
        const results = [];
        for (const accId of accountIds) {
          try {
            const params = { accountId: accId };
            if (this.reportDateFrom())
              params.dateFrom = this.reportDateFrom();
            if (this.reportDateTo())
              params.dateTo = this.reportDateTo();
            const data = await this.api.getAccountStatement(this.bizId, accId, this.reportDateFrom() || void 0, this.reportDateTo() || void 0);
            results.push(__spreadValues({ accountId: accId, accountName: this.allAccounts().find((a) => a.id === accId)?.name || `\u062D\u0633\u0627\u0628 ${accId}` }, data));
          } catch (e) {
            results.push({ accountId: accId, error: true });
          }
        }
        this.reportData.set({ type: "account_statement", results });
      } else if (reportType === "inventory_report") {
        const warehouseIds = tab.config?.warehouseIds || [];
        try {
          let data = [];
          for (const wId of warehouseIds) {
            try {
              const items = await this.api.getWarehouseInventory(this.bizId, wId);
              data = data.concat(items || []);
            } catch (e) {
            }
          }
          this.reportData.set({ type: "inventory_report", data });
        } catch (e) {
          this.reportData.set({ type: "inventory_report", data: [], error: true });
        }
      } else if (reportType === "operations_summary") {
        try {
          const data = await this.api.getWidgetStatsEnhanced(this.bizId, void 0, this.reportDateFrom() || void 0, this.reportDateTo() || void 0);
          this.reportData.set({ type: "operations_summary", data });
        } catch (e) {
          this.reportData.set({ type: "operations_summary", data: null, error: true });
        }
      }
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    } finally {
      this.reportLoading.set(false);
    }
  }
  closeReport() {
    this.reportData.set(null);
    this.reportType.set("");
  }
  // ===================== Export & Print =====================
  exportTableToCSV(data, filename) {
    if (!data || data.length === 0) {
      this.toast.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");
      return;
    }
    const BOM = "\uFEFF";
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(",")];
    for (const row of data) {
      csvRows.push(headers.map((h) => {
        let val = row[h] ?? "";
        val = String(val).replace(/"/g, '""');
        return `"${val}"`;
      }).join(","));
    }
    const blob = new Blob([BOM + csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
    link.click();
    this.toast.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D");
  }
  exportLogToCSV() {
    const data = this.logEntries().map((e) => ({
      "\u0627\u0644\u062A\u0627\u0631\u064A\u062E": this.formatDate(e.entry_date),
      "\u0627\u0644\u0646\u0648\u0639": this.getVoucherTypeLabel(e.voucher_type),
      "\u0627\u0644\u0648\u0635\u0641": e.description || e.operation_type_name || "-",
      "\u0627\u0644\u0645\u062F\u064A\u0646": e.total_debit,
      "\u0627\u0644\u062F\u0627\u0626\u0646": e.total_credit
    }));
    this.exportTableToCSV(data, "\u0633\u062C\u0644_\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
  }
  exportAccountsToCSV() {
    const data = this.widgetAccounts().map((a) => ({
      "\u0627\u0644\u062D\u0633\u0627\u0628": a.name,
      "\u0627\u0644\u0646\u0648\u0639": a.account_type,
      "\u0627\u0644\u0631\u0635\u064A\u062F": a.total_balance
    }));
    this.exportTableToCSV(data, "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
  }
  exportInventoryToCSV(tab) {
    const items = this.getTabInventory(tab);
    const data = items.map((i) => ({
      "\u0627\u0644\u0635\u0646\u0641": i.item_name,
      "\u0627\u0644\u0645\u062E\u0632\u0646": i.warehouse_name,
      "\u0627\u0644\u0643\u0645\u064A\u0629": i.quantity,
      "\u0627\u0644\u062A\u0643\u0644\u0641\u0629": i.total_cost
    }));
    this.exportTableToCSV(data, "\u0627\u0644\u0645\u062E\u0632\u0648\u0646");
  }
  printCurrentTab() {
    window.print();
  }
  // ===================== Drag & Drop Tabs =====================
  onTabDrop(event) {
    const tabs = [...this.screenTabs()];
    moveItemInArray(tabs, event.previousIndex, event.currentIndex);
    this.screenTabs.set(tabs);
    const updates = tabs.map((t, i) => ({ id: t.id, sortOrder: i }));
    if (this.activeScreen()) {
      this.api.updateScreen(this.activeScreen().id, { layoutConfig: { tabs } }).catch(() => {
      });
    }
  }
  // ===================== Screen Templates (Presets) =====================
  showTemplatesModal = signal(false, ...ngDevMode ? [{ debugName: "showTemplatesModal" }] : (
    /* istanbul ignore next */
    []
  ));
  screenPresets = [
    {
      name: "\u0634\u0627\u0634\u0629 \u0645\u062D\u0637\u0629 \u0643\u0647\u0631\u0628\u0627\u0621",
      description: "\u0634\u0627\u0634\u0629 \u062C\u0627\u0647\u0632\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0645\u062D\u0637\u0629 \u0643\u0647\u0631\u0628\u0627\u0621 \u0645\u0639 \u062A\u062D\u0635\u064A\u0644 \u0648\u0635\u0631\u0641 \u0648\u0633\u062C\u0644 \u0648\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A",
      icon: "bolt",
      color: "#f59e0b",
      tabs: [
        { type: "operations", label: "\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A", icon: "receipt_long", color: "#3b82f6" },
        { type: "log", label: "\u0627\u0644\u0633\u062C\u0644", icon: "history", color: "#22c55e" },
        { type: "accounts", label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A", icon: "account_balance", color: "#f59e0b" },
        { type: "stats", label: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A", icon: "analytics", color: "#8b5cf6" },
        { type: "chart", label: "\u0631\u0633\u0645 \u0628\u064A\u0627\u0646\u064A", icon: "bar_chart", color: "#14b8a6" }
      ]
    },
    {
      name: "\u0634\u0627\u0634\u0629 \u0645\u062E\u0632\u0646",
      description: "\u0634\u0627\u0634\u0629 \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0645\u0639 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0648\u062A\u0642\u0627\u0631\u064A\u0631",
      icon: "warehouse",
      color: "#0ea5e9",
      tabs: [
        { type: "inventory", label: "\u0627\u0644\u0623\u0635\u0646\u0627\u0641", icon: "inventory_2", color: "#0ea5e9" },
        { type: "operations", label: "\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A", icon: "receipt_long", color: "#3b82f6" },
        { type: "log", label: "\u0627\u0644\u0633\u062C\u0644", icon: "history", color: "#22c55e" },
        { type: "reports", label: "\u062A\u0642\u0627\u0631\u064A\u0631", icon: "summarize", color: "#ec4899" }
      ]
    },
    {
      name: "\u0634\u0627\u0634\u0629 \u062D\u0633\u0627\u0628\u0627\u062A \u0634\u062E\u0635\u064A\u0629",
      description: "\u0634\u0627\u0634\u0629 \u0628\u0633\u064A\u0637\u0629 \u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629",
      icon: "person",
      color: "#8b5cf6",
      tabs: [
        { type: "accounts", label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A", icon: "account_balance", color: "#f59e0b" },
        { type: "log", label: "\u0627\u0644\u0633\u062C\u0644", icon: "history", color: "#22c55e" },
        { type: "stats", label: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A", icon: "analytics", color: "#8b5cf6" },
        { type: "notes", label: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A", icon: "sticky_note_2", color: "#f97316" }
      ]
    },
    {
      name: "\u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0634\u0627\u0645\u0644\u0629",
      description: "\u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0645\u0639 \u0643\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A",
      icon: "dashboard",
      color: "#3b82f6",
      tabs: [
        { type: "stats", label: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A", icon: "analytics", color: "#8b5cf6" },
        { type: "chart", label: "\u0631\u0633\u0645 \u0628\u064A\u0627\u0646\u064A", icon: "bar_chart", color: "#14b8a6" },
        { type: "operations", label: "\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A", icon: "receipt_long", color: "#3b82f6" },
        { type: "log", label: "\u0627\u0644\u0633\u062C\u0644", icon: "history", color: "#22c55e" },
        { type: "accounts", label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A", icon: "account_balance", color: "#f59e0b" },
        { type: "inventory", label: "\u0627\u0644\u0645\u062E\u0632\u0648\u0646", icon: "inventory_2", color: "#0ea5e9" },
        { type: "reports", label: "\u062A\u0642\u0627\u0631\u064A\u0631", icon: "summarize", color: "#ec4899" },
        { type: "notes", label: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A", icon: "sticky_note_2", color: "#f97316" }
      ]
    }
  ];
  async applyPreset(preset) {
    if (!this.activeScreen()) {
      try {
        const screen = await this.api.createScreen(this.bizId, {
          name: preset.name,
          icon: preset.icon,
          color: preset.color,
          layoutConfig: { tabs: preset.tabs.map((t, i) => __spreadProps(__spreadValues({}, t), { id: Date.now() + i, sortOrder: i, config: {} })) }
        });
        this.screens.set([...this.screens(), screen]);
        this.activeScreen.set(screen);
        this.screenTabs.set(screen.layoutConfig?.tabs || []);
        if (this.screenTabs().length > 0)
          this.activeTabId.set(this.screenTabs()[0].id);
        this.viewMode.set("screen");
        this.toast.success(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0634\u0627\u0634\u0629 "${preset.name}" \u0628\u0646\u062C\u0627\u062D`);
      } catch (e) {
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062B \u062E\u0637\u0623");
      }
    } else {
      const tabs = preset.tabs.map((t, i) => __spreadProps(__spreadValues({}, t), { id: Date.now() + i, sortOrder: i, config: {} }));
      this.screenTabs.set(tabs);
      try {
        await this.api.updateScreen(this.activeScreen().id, {
          layoutConfig: { tabs }
        });
        this.toast.success("\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0646\u062C\u0627\u062D");
      } catch (e) {
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
      }
    }
    this.showTemplatesModal.set(false);
  }
  static \u0275fac = function CustomScreensComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomScreensComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomScreensComponent, selectors: [["app-custom-screens"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 10, vars: 9, consts: [[1, "custom-screens-page"], [1, "loading-overlay"], [1, "list-view"], [1, "wizard-view"], [1, "screen-view"], [1, "modal-overlay"], [1, "spinner"], [1, "page-header"], [1, "header-right"], [1, "material-icons-round", "header-icon"], [1, "badge"], [1, "btn", "btn-primary", 3, "click"], [1, "material-icons-round"], [1, "btn", 3, "click"], [1, "empty-state"], [1, "screens-grid"], [1, "screen-card", 3, "--card-color"], [1, "material-icons-round", "empty-icon"], [1, "screen-card"], [1, "card-header", 3, "click"], [1, "card-icon"], [1, "card-info"], [1, "card-actions"], ["title", "\u0641\u062A\u062D", 1, "btn-icon", 3, "click"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "btn-icon", 3, "click"], ["title", "\u0646\u0633\u062E", 1, "btn-icon", 3, "click"], ["title", "\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0642\u0627\u0626\u0645\u0629", 1, "btn-icon", 3, "click"], ["title", "\u0635\u0644\u0627\u062D\u064A\u0627\u062A", 1, "btn-icon", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "btn-icon", "danger", 3, "click"], [1, "wizard-header"], [1, "btn", "btn-ghost", 3, "click"], [1, "wizard-progress"], [1, "progress-bar"], [1, "progress-fill"], [1, "wizard-body"], [1, "step-title"], [1, "wizard-step", "step-basic"], [1, "wizard-step", "step-tabs"], [1, "wizard-step", "step-preview"], [1, "wizard-footer"], [1, "btn", "btn-ghost"], [1, "spacer"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "form-group"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u0627\u0644\u0645\u0628\u064A\u0639\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u0634\u0627\u0634\u0629", "rows", "2", 3, "ngModelChange", "ngModel"], [1, "form-row"], [1, "icon-grid"], [1, "icon-option", 3, "selected"], [1, "color-grid"], [1, "color-option", 3, "selected", "background"], [1, "custom-color"], ["type", "text", 3, "ngModelChange", "colorPickerChange", "ngModel", "cpPosition", "cpOutputFormat", "colorPicker"], [1, "color-preview"], [1, "form-group", "sidebar-option"], [1, "checkbox-label"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "sidebar-config"], [1, "icon-option", 3, "click"], [1, "color-option", 3, "click"], [3, "ngModelChange", "ngModel"], [3, "value"], ["type", "number", "placeholder", "\u062A\u0631\u062A\u064A\u0628", "min", "0", 3, "ngModelChange", "ngModel"], [1, "step-desc"], [1, "tab-types-grid"], [1, "tab-type-card"], [1, "tab-type-card", 3, "click"], [1, "material-icons-round", "add-icon"], [1, "subsection-title"], [1, "added-tabs-list"], [1, "added-tab-item", 3, "border-right-color"], [1, "added-tab-item"], [1, "tab-item-info"], ["type", "text", "placeholder", "\u0627\u0633\u0645 \u0627\u0644\u062A\u0628\u0648\u064A\u0628", 1, "tab-name-input", 3, "ngModelChange", "ngModel"], [1, "tab-type-badge"], [1, "tab-item-actions"], ["title", "\u062A\u062D\u0631\u064A\u0643 \u0644\u0623\u0639\u0644\u0649", 1, "btn-icon", "sm", 3, "click", "disabled"], ["title", "\u062A\u062D\u0631\u064A\u0643 \u0644\u0623\u0633\u0641\u0644", 1, "btn-icon", "sm", 3, "click", "disabled"], ["title", "\u062D\u0630\u0641", 1, "btn-icon", "sm", "danger", 3, "click"], [1, "wizard-step", "step-config"], [1, "tab-config-header"], [1, "tab-preview"], [1, "mini-config"], [1, "icon-grid", "compact"], [1, "icon-option", "sm", 3, "selected"], [1, "color-grid", "compact"], [1, "color-option", "sm", 3, "selected", "background"], [1, "icon-option", "sm", 3, "click"], [1, "color-option", "sm", 3, "click"], [1, "op-types-grid"], [1, "op-type-item", 3, "selected"], [1, "selected-count"], [1, "op-type-item", 3, "click"], [1, "material-icons-round", "check"], [1, "accounts-filter-bar"], [1, "filter-chips"], [1, "filter-chip", 3, "click"], [1, "chip-count"], [1, "filter-chip", 3, "active", "--chip-color"], [1, "search-box"], ["type", "text", "placeholder", "\u0628\u062D\u062B...", 3, "ngModelChange", "ngModel"], [1, "accounts-grid"], [1, "account-item", 3, "selected"], [1, "material-icons-round", "chip-icon"], [1, "account-item", 3, "click"], [1, "material-icons-round", "acc-icon"], [1, "acc-name"], [1, "acc-type-label"], [1, "config-hint"], [1, "empty-config"], [1, "material-icons-round", "acc-icon", 2, "color", "#0ea5e9"], [1, "preview-card"], [1, "preview-header"], [1, "preview-tabs"], [1, "preview-tab", 3, "border-bottom-color"], [1, "preview-summary"], [1, "preview-tab"], [1, "screen-header"], ["title", "\u0631\u062C\u0648\u0639", 1, "btn-icon"], [1, "screen-title-icon"], [1, "header-actions"], ["title", "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A", 1, "btn-icon", 3, "click"], ["title", "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0634\u0627\u0634\u0629", 1, "btn-icon", 3, "click"], ["title", "\u0631\u062C\u0648\u0639", 1, "btn-icon", 3, "click"], ["cdkDropList", "", "cdkDropListOrientation", "horizontal", 1, "tabs-bar", 3, "cdkDropListDropped"], ["cdkDrag", "", 1, "tab-btn", 3, "active", "--tab-color", "background"], ["cdkDrag", "", 1, "tab-btn", 3, "click"], [1, "tab-content"], [1, "operations-content"], [1, "log-content"], [1, "accounts-content"], [1, "stats-content"], [1, "chart-content"], [1, "inventory-content"], [1, "reports-content"], [1, "notes-content"], [1, "operation-form"], [1, "op-buttons-grid"], [1, "op-button", 3, "--op-color"], [1, "empty-tab"], [1, "op-button", 3, "click"], [1, "form-header"], ["type", "date", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)", 3, "ngModelChange", "ngModel"], [1, "transfer-form"], [1, "btn", "btn-primary", "btn-lg", 3, "click", "disabled"], [1, "transfer-row"], [1, "material-icons-round", 2, "font-size", "16px", "vertical-align", "middle", "color", "#ef4444"], [1, "transfer-arrow"], [1, "material-icons-round", 2, "font-size", "16px", "vertical-align", "middle", "color", "#22c55e"], ["type", "number", "placeholder", "\u0645\u0628\u0644\u063A \u0627\u0644\u062A\u062D\u0648\u064A\u0644", "min", "0", 1, "amount-input", 3, "ngModelChange", "ngModel"], [1, "entries-list"], [1, "entry-row"], [1, "form-summary"], [1, "entry-account"], [1, "balance-hint"], ["type", "number", "placeholder", "\u0627\u0644\u0645\u0628\u0644\u063A", "min", "0", 1, "amount-input", 3, "ngModelChange", "ngModel"], [1, "log-filters"], [1, "filter-row"], ["value", ""], [1, "btn", "btn-sm", 3, "click"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "log-table-container"], [1, "log-table"], [1, "log-footer"], [1, "footer-actions"], ["title", "\u062A\u0635\u062F\u064A\u0631 CSV", 1, "btn", "btn-ghost", "btn-sm", 3, "click"], ["title", "\u0637\u0628\u0627\u0639\u0629", 1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "voucher-badge"], [1, "amount", "debit"], [1, "amount", "credit"], ["colspan", "5", 1, "empty-row"], [1, "accounts-list"], [1, "account-card"], [1, "accounts-total"], [1, "acc-card-header"], [1, "acc-card-info"], [1, "acc-trend"], [1, "acc-card-balance"], [1, "balance-row"], [1, "currency"], [1, "balance-amount"], [1, "stats-grid"], [1, "stat-card", 3, "border-right-color"], [1, "stat-card"], [1, "stat-info"], [1, "chart-container"], ["baseChart", "", "type", "bar", 3, "data", "options"], [1, "inventory-table-wrapper"], [1, "inventory-table"], [1, "inventory-summary"], [1, "item-name"], [1, "item-code"], [1, "item-qty"], [1, "item-cost"], [1, "item-date"], [1, "report-results"], [1, "report-filters"], ["type", "date", "placeholder", "\u0645\u0646 \u062A\u0627\u0631\u064A\u062E", 3, "ngModelChange", "ngModel"], ["type", "date", "placeholder", "\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E", 3, "ngModelChange", "ngModel"], [1, "reports-grid"], [1, "report-card", 3, "click"], [1, "material-icons-round", 2, "color", "#3b82f6"], [1, "material-icons-round", 2, "color", "#22c55e"], [1, "material-icons-round", 2, "color", "#f59e0b"], [1, "loading-inline"], [1, "spinner-sm"], [1, "report-header"], [1, "report-actions"], ["title", "\u0637\u0628\u0627\u0639\u0629", 1, "btn", "btn-sm", 3, "click"], [1, "report-section"], [1, "error-text"], [1, "report-table-wrapper"], [1, "no-data-text"], [1, "report-table"], [1, "amount"], [1, "summary-cards"], [1, "summary-card"], [1, "material-icons-round", 2, "color", "#ef4444"], [1, "material-icons-round", 2, "color", "#8b5cf6"], ["placeholder", "\u0627\u0643\u062A\u0628 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 \u0647\u0646\u0627... (\u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)", "rows", "15", 1, "notes-area", 3, "ngModelChange", "ngModel"], [1, "modal-overlay", 3, "click"], [1, "modal-content", "modal-lg", 3, "click"], [1, "modal-header"], [1, "btn-icon", 3, "click"], [1, "modal-body"], [1, "modal-footer"], ["type", "text", 1, "tab-name-input", 3, "ngModelChange", "ngModel"], [1, "btn-icon", "sm", 3, "click", "disabled"], [1, "btn-icon", "sm", "danger", 3, "click"], [1, "preview-summary-text"], [1, "modal-content", 3, "click"], ["type", "text", 3, "ngModelChange", "ngModel"], ["rows", "2", 3, "ngModelChange", "ngModel"], [1, "permissions-list"], [1, "spinner", "sm"], [1, "permission-row"], [1, "user-name"], ["value", "none"], ["value", "view"], ["value", "execute"], [1, "templates-desc"], [1, "templates-grid"], [1, "template-card"], [1, "template-card", 3, "click"], [1, "template-icon"], [1, "template-info"], [1, "template-tabs"], [1, "mini-tab", 3, "background", "color"], [1, "mini-tab"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"]], template: function CustomScreensComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, CustomScreensComponent_Conditional_1_Template, 4, 0, "div", 1);
      \u0275\u0275conditionalCreate(2, CustomScreensComponent_Conditional_2_Template, 21, 2, "div", 2);
      \u0275\u0275conditionalCreate(3, CustomScreensComponent_Conditional_3_Template, 26, 13, "div", 3);
      \u0275\u0275conditionalCreate(4, CustomScreensComponent_Conditional_4_Template, 18, 8, "div", 4);
      \u0275\u0275conditionalCreate(5, CustomScreensComponent_Conditional_5_Template, 23, 10, "div", 5);
      \u0275\u0275conditionalCreate(6, CustomScreensComponent_Conditional_6_Template, 34, 4, "div", 5);
      \u0275\u0275conditionalCreate(7, CustomScreensComponent_Conditional_7_Template, 16, 4, "div", 5);
      \u0275\u0275conditionalCreate(8, CustomScreensComponent_Conditional_8_Template, 14, 0, "div", 5);
      \u0275\u0275conditionalCreate(9, CustomScreensComponent_Conditional_9_Template, 24, 4, "div", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.viewMode() === "list" ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.viewMode() === "wizard" ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.viewMode() === "screen" && ctx.activeScreen() ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showConfigWizard() ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showScreenForm() ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showPermissionsModal() ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showTemplatesModal() ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSidebarModal() ? 9 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, BaseChartDirective, ColorPickerDirective, CdkDrag, CdkDropList], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.custom-screens-page[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  direction: rtl;\n  font-family: "Tajawal", sans-serif;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeInScale {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-8px);\n  }\n}\n.loading-overlay[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px;\n  gap: 20px;\n  color: var(--text-secondary);\n}\n.loading-overlay[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border: 3px solid rgba(59, 130, 246, 0.15);\n  border-top-color: #3b82f6;\n  border-right-color: #6366f1;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n  filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.5));\n}\n.loading-overlay[_ngcontent-%COMP%]   .spinner.sm[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border-width: 2px;\n}\n.loading-inline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 20px;\n  color: var(--text-secondary);\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 14px;\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  white-space: nowrap;\n  position: relative;\n  overflow: hidden;\n}\n.btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      145deg,\n      #5b9af8,\n      #6366f1);\n  color: white;\n  box-shadow:\n    0 2.4px 7.2px rgba(59, 130, 246, 0.2),\n    0 7.2px 21.6px rgba(59, 130, 246, 0.18),\n    0 16.8px 48px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.btn-primary[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.3),\n      transparent);\n  border-radius: inherit;\n  pointer-events: none;\n  z-index: 1;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow:\n    0 0 20px rgba(59, 130, 246, 0.5),\n    0 0 60px rgba(59, 130, 246, 0.15),\n    0 8px 30px rgba(0, 0, 0, 0.15);\n  filter: brightness(1.08);\n}\n.btn-primary[_ngcontent-%COMP%]:active {\n  transform: translateY(1px);\n  filter: brightness(0.95);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n  filter: none;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--text-secondary);\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  font-size: 12px;\n}\n.btn-sm[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.btn-lg[_ngcontent-%COMP%] {\n  padding: 16px 32px;\n  font-size: 16px;\n  width: 100%;\n  justify-content: center;\n  border-radius: 18px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.btn-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.btn-icon[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: #3b82f6;\n  border-color: rgba(59, 130, 246, 0.3);\n  transform: translateY(-3px) scale(1.08);\n  box-shadow:\n    0 1.6px 4.8px rgba(59, 130, 246, 0.2),\n    0 4.8px 14.4px rgba(59, 130, 246, 0.18),\n    0 11.2px 32px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.btn-icon.danger[_ngcontent-%COMP%]:hover {\n  color: #ef4444;\n  border-color: rgba(239, 68, 68, 0.3);\n  box-shadow:\n    0 1.6px 4.8px rgba(239, 68, 68, 0.2),\n    0 4.8px 14.4px rgba(239, 68, 68, 0.18),\n    0 11.2px 32px rgba(239, 68, 68, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.btn-icon.sm[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border: none;\n  background: transparent;\n  box-shadow: none;\n}\n.btn-icon.sm[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.btn-icon[_ngcontent-%COMP%]:disabled {\n  opacity: 0.3;\n  cursor: not-allowed;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  margin-bottom: 8px;\n  letter-spacing: 0.3px;\n}\n.form-group[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   input[type=date][_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 13px 18px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 10px;\n  font-family: inherit;\n  font-size: 14px;\n  color: var(--text-primary);\n  background: var(--bg-input);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-sizing: border-box;\n  box-shadow:\n    0 0.2px 0.4px rgba(0, 0, 0, 0.06),\n    0 0.6px 1.2px rgba(0, 0, 0, 0.08),\n    0 1.6px 4px rgba(0, 0, 0, 0.1),\n    0 3.2px 8px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.form-group[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   input[type=date][_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow:\n    0 1px 3px rgba(59, 130, 246, 0.2),\n    0 3px 9px rgba(59, 130, 246, 0.18),\n    0 7px 20px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.form-group[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   input[type=number][_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   input[type=date][_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-faint);\n}\n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n}\n.form-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.list-view[_ngcontent-%COMP%] {\n  padding: 30px 40px;\n  animation: _ngcontent-%COMP%_fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.list-view[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 40px;\n}\n.list-view[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.list-view[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #a855f7);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4));\n  animation: _ngcontent-%COMP%_float 4s ease-in-out infinite;\n}\n.list-view[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0;\n}\n.list-view[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.12),\n      rgba(99, 102, 241, 0.12));\n  color: #3b82f6;\n  padding: 6px 18px;\n  border-radius: 24px;\n  font-size: 14px;\n  font-weight: 800;\n  border: 1.5px solid rgba(59, 130, 246, 0.2);\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 20px 0 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 15px;\n  margin: 0 0 28px;\n}\n.screens-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  gap: 24px;\n}\n.screen-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  backface-visibility: hidden;\n  border-radius: 18px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  box-shadow:\n    0 1.2px 2.4px rgba(0, 0, 0, 0.06),\n    0 3.6px 7.2px rgba(0, 0, 0, 0.08),\n    0 9.6px 24px rgba(0, 0, 0, 0.1),\n    0 19.2px 48px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.screen-card[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 50%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.06),\n      transparent);\n  transition: left 0.7s ease;\n  pointer-events: none;\n  z-index: 1;\n}\n.screen-card[_ngcontent-%COMP%]:hover::after {\n  left: 120%;\n}\n.screen-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 5px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 5%,\n      var(--card-color, #3b82f6) 30%,\n      var(--card-color, #3b82f6) 70%,\n      transparent 95%);\n  border-radius: 18px 18px 0 0;\n  z-index: 2;\n  transition: all 0.4s;\n}\n.screen-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-10px) scale(1.02);\n  box-shadow:\n    0 2.5px 5px rgba(0, 0, 0, 0.06),\n    0 7.5px 15px rgba(0, 0, 0, 0.08),\n    0 20px 50px rgba(0, 0, 0, 0.1),\n    0 40px 100px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  border-color: rgba(0, 0, 0, 0.08);\n}\n.screen-card[_ngcontent-%COMP%]:hover::before {\n  height: 6px;\n  box-shadow: 0 4px 20px var(--card-color, #3b82f6);\n}\n.screen-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 24px 22px 16px;\n  cursor: pointer;\n}\n.screen-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  position: relative;\n  box-shadow:\n    0 3px 9px rgba(59, 130, 246, 0.2),\n    0 9px 27px rgba(59, 130, 246, 0.18),\n    0 21px 60px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.screen-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(255, 255, 255, 0.35),\n      transparent);\n  border-radius: 14px 14px 50% 50%;\n  pointer-events: none;\n}\n.screen-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));\n}\n.screen-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.screen-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.screen-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: 0;\n}\n.screen-card[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  padding: 12px 22px 18px;\n  border-top: 1px solid var(--border-color);\n}\n.wizard-view[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  animation: _ngcontent-%COMP%_fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.wizard-view[_ngcontent-%COMP%]   .wizard-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 30px;\n  border-bottom: 1px solid var(--border-color);\n  background: var(--bg-card);\n  box-shadow:\n    0 0.6px 1.2px rgba(0, 0, 0, 0.06),\n    0 1.8px 3.6px rgba(0, 0, 0, 0.08),\n    0 4.8px 12px rgba(0, 0, 0, 0.1),\n    0 9.6px 24px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.wizard-view[_ngcontent-%COMP%]   .wizard-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0;\n  flex: 1;\n}\n.wizard-view[_ngcontent-%COMP%]   .wizard-header[_ngcontent-%COMP%]   .wizard-progress[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.wizard-view[_ngcontent-%COMP%]   .wizard-header[_ngcontent-%COMP%]   .wizard-progress[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%] {\n  width: 160px;\n  height: 8px;\n  background: var(--bg-surface);\n  border-radius: 6px;\n  overflow: hidden;\n}\n.wizard-view[_ngcontent-%COMP%]   .wizard-header[_ngcontent-%COMP%]   .wizard-progress[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]   .progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6,\n      #6366f1,\n      #a855f7);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 2s linear infinite;\n  border-radius: 6px;\n  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n  box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);\n}\n.wizard-view[_ngcontent-%COMP%]   .wizard-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 32px;\n  animation: _ngcontent-%COMP%_fadeInScale 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.wizard-view[_ngcontent-%COMP%]   .wizard-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 18px 30px;\n  border-top: 1px solid var(--border-color);\n  background: var(--bg-card);\n}\n.wizard-view[_ngcontent-%COMP%]   .wizard-footer[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.wizard-section[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.wizard-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0 0 20px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.wizard-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  font-size: 22px;\n}\n.step-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0 0 8px;\n}\n.step-desc[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 14px;\n  margin: 0 0 24px;\n}\n.subsection-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 28px 0 16px;\n}\n.tab-types-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 14px;\n}\n.tab-type-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  backface-visibility: hidden;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  padding: 28px 16px;\n  border: 2px solid var(--border-color);\n  border-radius: 18px;\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  font-family: inherit;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  box-shadow:\n    0 0.5px 1px rgba(0, 0, 0, 0.06),\n    0 1.5px 3px rgba(0, 0, 0, 0.08),\n    0 4px 10px rgba(0, 0, 0, 0.1),\n    0 8px 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.tab-type-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 36px;\n  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n  filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.15));\n}\n.tab-type-card[_ngcontent-%COMP%]   .add-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--text-muted);\n}\n.tab-type-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  text-align: center;\n}\n.tab-type-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(59, 130, 246, 0.3);\n  color: #3b82f6;\n  transform: translateY(-8px) scale(1.04);\n  box-shadow:\n    0 3px 9px rgba(59, 130, 246, 0.2),\n    0 9px 27px rgba(59, 130, 246, 0.18),\n    0 21px 60px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.tab-type-card[_ngcontent-%COMP%]:hover   .material-icons-round[_ngcontent-%COMP%]:first-child {\n  transform: scale(1.2) translateY(-4px);\n  filter: drop-shadow(0 0 14px currentColor);\n}\n.tab-type-card.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  color: #3b82f6;\n  background: rgba(59, 130, 246, 0.06);\n  box-shadow:\n    0 2.4px 7.2px rgba(59, 130, 246, 0.2),\n    0 7.2px 21.6px rgba(59, 130, 246, 0.18),\n    0 16.8px 48px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.added-tabs-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.added-tab-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 20px;\n  border: 1.5px solid var(--border-color);\n  border-right: 4px solid;\n  border-radius: 14px;\n  background: var(--bg-card);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.4px 0.8px rgba(0, 0, 0, 0.06),\n    0 1.2px 2.4px rgba(0, 0, 0, 0.08),\n    0 3.2px 8px rgba(0, 0, 0, 0.1),\n    0 6.4px 16px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.added-tab-item[_ngcontent-%COMP%]:hover {\n  box-shadow:\n    0 0.8px 1.6px rgba(0, 0, 0, 0.06),\n    0 2.4px 4.8px rgba(0, 0, 0, 0.08),\n    0 6.4px 16px rgba(0, 0, 0, 0.1),\n    0 12.8px 32px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  transform: translateX(-4px);\n}\n.added-tab-item[_ngcontent-%COMP%]   .tab-item-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n}\n.added-tab-item[_ngcontent-%COMP%]   .tab-item-info[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.added-tab-item[_ngcontent-%COMP%]   .tab-item-info[_ngcontent-%COMP%]   .tab-name-input[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  font-family: inherit;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n  padding: 4px 8px;\n  border-radius: 6px;\n}\n.added-tab-item[_ngcontent-%COMP%]   .tab-item-info[_ngcontent-%COMP%]   .tab-name-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background: var(--bg-surface);\n}\n.added-tab-item[_ngcontent-%COMP%]   .tab-item-info[_ngcontent-%COMP%]   .tab-type-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  display: block;\n  margin-top: 2px;\n}\n.added-tab-item[_ngcontent-%COMP%]   .tab-item-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.op-types-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.op-type-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 20px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.op-type-item[_ngcontent-%COMP%]:hover {\n  box-shadow:\n    0 0.6px 1.2px rgba(0, 0, 0, 0.06),\n    0 1.8px 3.6px rgba(0, 0, 0, 0.08),\n    0 4.8px 12px rgba(0, 0, 0, 0.1),\n    0 9.6px 24px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  border-color: var(--border-strong);\n  transform: translateX(-3px);\n}\n.op-type-item.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.05);\n  box-shadow:\n    0 1px 3px rgba(59, 130, 246, 0.2),\n    0 3px 9px rgba(59, 130, 246, 0.18),\n    0 7px 20px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.op-type-item[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.op-type-item[_ngcontent-%COMP%]   .op-name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-weight: 700;\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.op-type-item[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.accounts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 12px;\n}\n.account-select-item[_ngcontent-%COMP%], \n.account-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 18px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.2px 0.4px rgba(0, 0, 0, 0.06),\n    0 0.6px 1.2px rgba(0, 0, 0, 0.08),\n    0 1.6px 4px rgba(0, 0, 0, 0.1),\n    0 3.2px 8px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  font-family: inherit;\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.account-select-item[_ngcontent-%COMP%]:hover, \n.account-item[_ngcontent-%COMP%]:hover {\n  box-shadow:\n    0 0.5px 1px rgba(0, 0, 0, 0.06),\n    0 1.5px 3px rgba(0, 0, 0, 0.08),\n    0 4px 10px rgba(0, 0, 0, 0.1),\n    0 8px 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  border-color: var(--border-strong);\n}\n.account-select-item.selected[_ngcontent-%COMP%], \n.account-item.selected[_ngcontent-%COMP%] {\n  border-color: #22c55e;\n  background: rgba(34, 197, 94, 0.05);\n  box-shadow:\n    0 0.8px 2.4px rgba(34, 197, 94, 0.2),\n    0 2.4px 7.2px rgba(34, 197, 94, 0.18),\n    0 5.6px 16px rgba(34, 197, 94, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.account-select-item[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%], \n.account-select-item[_ngcontent-%COMP%]   .acc-icon[_ngcontent-%COMP%], \n.account-item[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%], \n.account-item[_ngcontent-%COMP%]   .acc-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.account-select-item[_ngcontent-%COMP%]   .acc-name[_ngcontent-%COMP%], \n.account-item[_ngcontent-%COMP%]   .acc-name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-weight: 600;\n}\n.account-select-item[_ngcontent-%COMP%]   .acc-type-label[_ngcontent-%COMP%], \n.account-item[_ngcontent-%COMP%]   .acc-type-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  font-weight: 600;\n}\n.account-select-item[_ngcontent-%COMP%]   .acc-balance[_ngcontent-%COMP%], \n.account-item[_ngcontent-%COMP%]   .acc-balance[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n  font-weight: 700;\n}\n.account-select-item[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%], \n.account-item[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.selected-count[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.accounts-filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-bottom: 18px;\n  align-items: center;\n}\n.accounts-filter-bar[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.accounts-filter-bar[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 220px;\n  padding: 10px 16px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--bg-input);\n  box-shadow:\n    0 0.2px 0.4px rgba(0, 0, 0, 0.06),\n    0 0.6px 1.2px rgba(0, 0, 0, 0.08),\n    0 1.6px 4px rgba(0, 0, 0, 0.1),\n    0 3.2px 8px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.accounts-filter-bar[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--text-muted);\n}\n.accounts-filter-bar[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  font-family: inherit;\n  font-size: 13px;\n  color: var(--text-primary);\n  flex: 1;\n}\n.accounts-filter-bar[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.accounts-filter-bar[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 24px;\n  background: var(--bg-card);\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.accounts-filter-bar[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   .chip-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.accounts-filter-bar[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   .chip-count[_ngcontent-%COMP%] {\n  font-size: 11px;\n  opacity: 0.7;\n}\n.accounts-filter-bar[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]:hover {\n  border-color: rgba(59, 130, 246, 0.3);\n  color: #3b82f6;\n  transform: translateY(-2px);\n}\n.accounts-filter-bar[_ngcontent-%COMP%]   .filter-chip.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  border-color: transparent;\n  box-shadow:\n    0 1.6px 4.8px rgba(59, 130, 246, 0.2),\n    0 4.8px 14.4px rgba(59, 130, 246, 0.18),\n    0 11.2px 32px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.preview-card[_ngcontent-%COMP%] {\n  border-radius: 18px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  padding: 28px;\n  box-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.06),\n    0 3px 6px rgba(0, 0, 0, 0.08),\n    0 8px 20px rgba(0, 0, 0, 0.1),\n    0 16px 40px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.preview-card[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n  padding-bottom: 18px;\n  border-bottom: 1px solid var(--border-color);\n}\n.preview-card[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .preview-icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  position: relative;\n  box-shadow:\n    0 1.2px 2.4px rgba(0, 0, 0, 0.06),\n    0 3.6px 7.2px rgba(0, 0, 0, 0.08),\n    0 9.6px 24px rgba(0, 0, 0, 0.1),\n    0 19.2px 48px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.preview-card[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .preview-icon[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.3),\n      transparent);\n  border-radius: inherit;\n  pointer-events: none;\n  z-index: 1;\n}\n.preview-card[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   .preview-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n}\n.preview-card[_ngcontent-%COMP%]   .preview-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0;\n}\n.preview-card[_ngcontent-%COMP%]   .preview-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.preview-card[_ngcontent-%COMP%]   .preview-tabs[_ngcontent-%COMP%]   .preview-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 10px;\n  background: rgba(59, 130, 246, 0.08);\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.preview-card[_ngcontent-%COMP%]   .preview-tabs[_ngcontent-%COMP%]   .preview-tab[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.preview-card[_ngcontent-%COMP%]   .preview-summary-text[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 14px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.icon-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.icon-grid.compact[_ngcontent-%COMP%] {\n  gap: 6px;\n}\n.icon-option[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1.5px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  font-family: inherit;\n}\n.icon-option[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.icon-option[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  color: #3b82f6;\n  transform: scale(1.1);\n}\n.icon-option.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n  box-shadow:\n    0 1px 3px rgba(59, 130, 246, 0.2),\n    0 3px 9px rgba(59, 130, 246, 0.18),\n    0 7px 20px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.icon-option.sm[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n}\n.icon-option.sm[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.color-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.color-grid.compact[_ngcontent-%COMP%] {\n  gap: 6px;\n}\n.color-option[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.color-option[_ngcontent-%COMP%]:hover {\n  transform: scale(1.2);\n}\n.color-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--text-primary);\n  transform: scale(1.15);\n  box-shadow:\n    0 0.8px 1.6px rgba(0, 0, 0, 0.06),\n    0 2.4px 4.8px rgba(0, 0, 0, 0.08),\n    0 6.4px 16px rgba(0, 0, 0, 0.1),\n    0 12.8px 32px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.color-option.sm[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n}\n.custom-color[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 10px;\n}\n.custom-color[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.custom-color[_ngcontent-%COMP%]   .color-preview[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n}\n.sidebar-option[_ngcontent-%COMP%]   .checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n  font-weight: 700;\n}\n.sidebar-option[_ngcontent-%COMP%]   .checkbox-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  accent-color: #3b82f6;\n}\n.sidebar-option[_ngcontent-%COMP%]   .sidebar-config[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 12px;\n}\n.sidebar-option[_ngcontent-%COMP%]   .sidebar-config[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.sidebar-option[_ngcontent-%COMP%]   .sidebar-config[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.tab-config-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.tab-config-header[_ngcontent-%COMP%]   .tab-preview[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border: 2px solid;\n  border-radius: 14px;\n  font-weight: 800;\n  font-size: 15px;\n  margin-bottom: 16px;\n}\n.tab-config-header[_ngcontent-%COMP%]   .tab-preview[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.tab-config-header[_ngcontent-%COMP%]   .mini-config[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.screen-view[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  animation: _ngcontent-%COMP%_fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.screen-view[_ngcontent-%COMP%]   .screen-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 30px;\n  background: var(--card-bg);\n  border-bottom: 1px solid var(--border-color);\n  position: relative;\n  z-index: 2;\n  box-shadow:\n    0 4px 12px rgba(0, 0, 0, 0.06),\n    0 8px 30px rgba(0, 0, 0, 0.08),\n    0 16px 50px rgba(0, 0, 0, 0.04);\n}\n.screen-view[_ngcontent-%COMP%]   .screen-header[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 3%;\n  right: 3%;\n  height: 4px;\n  background: var(--screen-color, #3b82f6);\n  border-radius: 4px;\n  box-shadow:\n    0 0 8px var(--screen-color, #3b82f6),\n    0 0 20px var(--screen-color, #3b82f6),\n    0 2px 12px rgba(0, 0, 0, 0.1);\n  opacity: 0.85;\n}\n.screen-view[_ngcontent-%COMP%]   .screen-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 18px;\n}\n.screen-view[_ngcontent-%COMP%]   .screen-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .screen-title-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  position: relative;\n  box-shadow:\n    0 4px 12px rgba(0, 0, 0, 0.15),\n    0 8px 24px rgba(0, 0, 0, 0.12),\n    0 0 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.25);\n}\n.screen-view[_ngcontent-%COMP%]   .screen-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .screen-title-icon[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(255, 255, 255, 0.45),\n      transparent);\n  border-radius: 14px 14px 50% 50%;\n  pointer-events: none;\n}\n.screen-view[_ngcontent-%COMP%]   .screen-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .screen-title-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4));\n  position: relative;\n  z-index: 1;\n}\n.screen-view[_ngcontent-%COMP%]   .screen-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0;\n  letter-spacing: -0.3px;\n}\n.screen-view[_ngcontent-%COMP%]   .screen-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.tabs-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 16px 28px;\n  background: var(--bg-card);\n  border-bottom: 1px solid var(--border-color);\n  overflow-x: auto;\n  position: relative;\n  z-index: 1;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.03);\n}\n.tabs-bar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 0;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px 26px;\n  border: 2px solid transparent;\n  border-radius: 50px;\n  background: transparent;\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  white-space: nowrap;\n  position: relative;\n}\n.tab-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.tab-btn[_ngcontent-%COMP%]:hover {\n  color: var(--text-primary);\n  background: var(--bg-surface);\n  border-color: var(--border-color);\n  transform: translateY(-3px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n}\n.tab-btn[_ngcontent-%COMP%]:hover   .material-icons-round[_ngcontent-%COMP%] {\n  transform: scale(1.15);\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  color: white;\n  border-color: transparent;\n  box-shadow:\n    0 4px 12px rgba(0, 0, 0, 0.12),\n    0 8px 24px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.tab-btn.active[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(255, 255, 255, 0.22),\n      transparent);\n  border-radius: 50px 50px 0 0;\n  pointer-events: none;\n}\n.tab-btn.active[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));\n  transform: scale(1.1);\n}\n.tab-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 28px 30px;\n  animation: _ngcontent-%COMP%_fadeInScale 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.empty-tab[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 14px;\n  padding: 70px;\n  color: var(--text-muted);\n  text-align: center;\n}\n.empty-tab[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 70px;\n  animation: _ngcontent-%COMP%_float 3s ease-in-out infinite;\n  opacity: 0.3;\n  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));\n}\n.empty-tab[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n}\n.op-buttons-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 24px;\n}\n.op-button[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  backface-visibility: hidden;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 18px;\n  padding: 40px 20px;\n  border: none;\n  border-radius: 18px;\n  background: var(--card-bg);\n  cursor: pointer;\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  font-family: inherit;\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n  box-shadow:\n    0 2px 6px rgba(0, 0, 0, 0.06),\n    0 6px 18px rgba(0, 0, 0, 0.08),\n    0 14px 40px rgba(0, 0, 0, 0.06),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.op-button[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 15%;\n  right: 15%;\n  height: 4px;\n  background: var(--op-color, #3b82f6);\n  border-radius: 0 0 4px 4px;\n  opacity: 0.6;\n  transition: all 0.4s;\n  z-index: 2;\n}\n.op-button[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 52px;\n  color: var(--op-color, #3b82f6);\n  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.15));\n  z-index: 1;\n}\n.op-button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  z-index: 1;\n  letter-spacing: 0.3px;\n}\n.op-button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-14px) scale(1.06) rotateX(4deg);\n  box-shadow:\n    0 8px 20px rgba(0, 0, 0, 0.1),\n    0 20px 50px rgba(0, 0, 0, 0.12),\n    0 30px 70px rgba(0, 0, 0, 0.06),\n    inset 0 1px 0 rgba(255, 255, 255, 0.1);\n}\n.op-button[_ngcontent-%COMP%]:hover::before {\n  opacity: 1;\n  left: 5%;\n  right: 5%;\n  height: 5px;\n  box-shadow: 0 4px 20px var(--op-color, #3b82f6);\n}\n.op-button[_ngcontent-%COMP%]:hover   .material-icons-round[_ngcontent-%COMP%] {\n  transform: scale(1.3) translateY(-8px);\n  filter: drop-shadow(0 0 24px var(--op-color, #3b82f6));\n}\n.op-button[_ngcontent-%COMP%]:active {\n  transform: translateY(-4px) scale(0.98);\n  transition-duration: 0.1s;\n}\n.operation-form[_ngcontent-%COMP%] {\n  max-width: 720px;\n  animation: _ngcontent-%COMP%_fadeInUp 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.operation-form[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 30px;\n}\n.operation-form[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 24px;\n  font-weight: 900;\n  margin: 0;\n}\n.operation-form[_ngcontent-%COMP%]   .form-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  filter: drop-shadow(0 0 12px currentColor);\n}\n.entries-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  margin: 22px 0;\n}\n.entry-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 24px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 18px;\n  background: var(--bg-card);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.5px 1px rgba(0, 0, 0, 0.06),\n    0 1.5px 3px rgba(0, 0, 0, 0.08),\n    0 4px 10px rgba(0, 0, 0, 0.1),\n    0 8px 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.entry-row[_ngcontent-%COMP%]:hover {\n  box-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.06),\n    0 3px 6px rgba(0, 0, 0, 0.08),\n    0 8px 20px rgba(0, 0, 0, 0.1),\n    0 16px 40px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  border-color: rgba(59, 130, 246, 0.15);\n  transform: translateX(-4px);\n}\n.entry-row[_ngcontent-%COMP%]   .entry-account[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.entry-row[_ngcontent-%COMP%]   .entry-account[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--text-muted);\n  background: var(--bg-surface);\n  padding: 8px;\n  border-radius: 10px;\n}\n.entry-row[_ngcontent-%COMP%]   .entry-account[_ngcontent-%COMP%]   .balance-hint[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 11px;\n  margin-right: 8px;\n  background: rgba(59, 130, 246, 0.06);\n  padding: 3px 10px;\n  border-radius: 20px;\n  font-weight: 600;\n}\n.entry-row[_ngcontent-%COMP%]   .amount-input[_ngcontent-%COMP%] {\n  width: 180px;\n  padding: 16px 20px;\n  border: 2px solid var(--border-color);\n  border-radius: 14px;\n  font-family: inherit;\n  font-size: 20px;\n  text-align: center;\n  font-weight: 800;\n  color: var(--text-primary);\n  background: var(--bg-input);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.entry-row[_ngcontent-%COMP%]   .amount-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow:\n    0 0 20px rgba(59, 130, 246, 0.3),\n    0 0 60px rgba(59, 130, 246, 0.09),\n    0 8px 30px rgba(0, 0, 0, 0.15);\n}\n.form-summary[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 22px 28px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.04),\n      rgba(99, 102, 241, 0.04));\n  border: 2px solid rgba(59, 130, 246, 0.15);\n  border-radius: 18px;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 20px;\n  box-shadow:\n    0 1.6px 4.8px rgba(59, 130, 246, 0.2),\n    0 4.8px 14.4px rgba(59, 130, 246, 0.18),\n    0 11.2px 32px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.form-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  font-size: 22px;\n}\n.log-content[_ngcontent-%COMP%]   .log-filters[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.log-content[_ngcontent-%COMP%]   .log-filters[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n}\n.log-content[_ngcontent-%COMP%]   .log-filters[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   input[type=date][_ngcontent-%COMP%], \n.log-content[_ngcontent-%COMP%]   .log-filters[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 12px 18px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 10px;\n  font-family: inherit;\n  font-size: 13px;\n  background: var(--bg-card);\n  color: var(--text-primary);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.log-content[_ngcontent-%COMP%]   .log-filters[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   input[type=date][_ngcontent-%COMP%]:focus, \n.log-content[_ngcontent-%COMP%]   .log-filters[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow:\n    0 0.8px 2.4px rgba(59, 130, 246, 0.2),\n    0 2.4px 7.2px rgba(59, 130, 246, 0.18),\n    0 5.6px 16px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.log-content[_ngcontent-%COMP%]   .log-filters[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   input[type=date][_ngcontent-%COMP%] {\n  width: 180px;\n}\n.log-content[_ngcontent-%COMP%]   .log-filters[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-width: 170px;\n}\n.log-table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border: 1.5px solid var(--border-color);\n  border-radius: 18px;\n  box-shadow:\n    0 1.2px 2.4px rgba(0, 0, 0, 0.06),\n    0 3.6px 7.2px rgba(0, 0, 0, 0.08),\n    0 9.6px 24px rgba(0, 0, 0, 0.1),\n    0 19.2px 48px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  background: var(--bg-card);\n}\n.log-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.log-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 18px 20px;\n  background: var(--bg-surface);\n  font-weight: 800;\n  color: var(--text-secondary);\n  text-align: right;\n  border-bottom: 2px solid var(--border-strong);\n  white-space: nowrap;\n  font-size: 12px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.log-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--border-color);\n  color: var(--text-primary);\n  transition: all 0.2s;\n}\n.log-table[_ngcontent-%COMP%]   td.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-muted);\n  padding: 60px;\n}\n.log-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: all 0.25s;\n}\n.log-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(even)   td[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.015);\n}\n.log-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.04);\n}\n.log-table[_ngcontent-%COMP%]   .amount[_ngcontent-%COMP%] {\n  font-weight: 800;\n  font-family: "Courier New", monospace;\n  font-size: 15px;\n}\n.log-table[_ngcontent-%COMP%]   .amount.debit[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.log-table[_ngcontent-%COMP%]   .amount.credit[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.voucher-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 6px 16px;\n  border-radius: 10px;\n  font-size: 11px;\n  font-weight: 800;\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.voucher-badge.receipt[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  color: #22c55e;\n  border: 1.5px solid rgba(34, 197, 94, 0.2);\n}\n.voucher-badge.payment[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n  border: 1.5px solid rgba(239, 68, 68, 0.2);\n}\n.voucher-badge.journal[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, 0.1);\n  color: #6366f1;\n  border: 1.5px solid rgba(99, 102, 241, 0.2);\n}\n.log-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding: 16px 0;\n  font-size: 14px;\n  color: var(--text-secondary);\n  font-weight: 700;\n}\n.accounts-content[_ngcontent-%COMP%]   .accounts-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 22px;\n}\n.account-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  backface-visibility: hidden;\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  background: var(--card-bg);\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 2px 6px rgba(0, 0, 0, 0.06),\n    0 6px 18px rgba(0, 0, 0, 0.08),\n    0 14px 40px rgba(0, 0, 0, 0.06),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.account-card[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 50%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.06),\n      transparent);\n  transition: left 0.7s ease;\n  pointer-events: none;\n  z-index: 1;\n}\n.account-card[_ngcontent-%COMP%]:hover::after {\n  left: 120%;\n}\n.account-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-10px) rotateX(3deg);\n  box-shadow:\n    0 8px 20px rgba(0, 0, 0, 0.1),\n    0 20px 50px rgba(0, 0, 0, 0.12),\n    0 30px 70px rgba(0, 0, 0, 0.06),\n    inset 0 1px 0 rgba(255, 255, 255, 0.1);\n}\n.account-card[_ngcontent-%COMP%]   .acc-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 22px 24px 16px;\n  border-bottom: 1px solid var(--border-color);\n}\n.account-card[_ngcontent-%COMP%]   .acc-card-header[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 32px;\n  padding: 10px;\n  border-radius: 14px;\n  background: rgba(0, 0, 0, 0.04);\n  filter: drop-shadow(0 4px 10px currentColor);\n}\n.account-card[_ngcontent-%COMP%]   .acc-card-header[_ngcontent-%COMP%]   .acc-card-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.account-card[_ngcontent-%COMP%]   .acc-card-header[_ngcontent-%COMP%]   .acc-card-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 17px;\n  color: var(--text-primary);\n  font-weight: 800;\n}\n.account-card[_ngcontent-%COMP%]   .acc-card-header[_ngcontent-%COMP%]   .acc-card-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n  font-weight: 600;\n}\n.account-card[_ngcontent-%COMP%]   .acc-card-header[_ngcontent-%COMP%]   .acc-trend[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n  padding: 6px;\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.03);\n}\n.account-card[_ngcontent-%COMP%]   .acc-card-balance[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n}\n.account-card[_ngcontent-%COMP%]   .acc-card-balance[_ngcontent-%COMP%]   .balance-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 0;\n}\n.account-card[_ngcontent-%COMP%]   .acc-card-balance[_ngcontent-%COMP%]   .balance-row[_ngcontent-%COMP%]   .currency[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n  font-weight: 800;\n  letter-spacing: 1.5px;\n  background: var(--bg-surface);\n  padding: 4px 12px;\n  border-radius: 6px;\n}\n.account-card[_ngcontent-%COMP%]   .acc-card-balance[_ngcontent-%COMP%]   .balance-row[_ngcontent-%COMP%]   .balance-amount[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 900;\n  color: var(--text-primary);\n  font-family: "Courier New", monospace;\n  letter-spacing: -0.5px;\n}\n.account-card[_ngcontent-%COMP%]   .acc-card-balance[_ngcontent-%COMP%]   .balance-row[_ngcontent-%COMP%]   .balance-amount.negative[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.accounts-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 24px 30px;\n  margin-top: 28px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.06));\n  border: 2px solid rgba(59, 130, 246, 0.18);\n  border-radius: 18px;\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--text-primary);\n  box-shadow:\n    0 4px 12px rgba(59, 130, 246, 0.12),\n    0 8px 30px rgba(59, 130, 246, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.1);\n}\n.accounts-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #3b82f6;\n  font-family: "Courier New", monospace;\n  letter-spacing: -0.5px;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 22px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  backface-visibility: hidden;\n  display: flex;\n  align-items: center;\n  gap: 22px;\n  padding: 30px;\n  background: var(--bg-card);\n  border: none;\n  border-right: 5px solid #3b82f6;\n  border-radius: 18px;\n  box-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.06),\n    0 3px 6px rgba(0, 0, 0, 0.08),\n    0 8px 20px rgba(0, 0, 0, 0.1),\n    0 16px 40px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px) rotateX(2deg);\n  box-shadow:\n    0 2px 4px rgba(0, 0, 0, 0.06),\n    0 6px 12px rgba(0, 0, 0, 0.08),\n    0 16px 40px rgba(0, 0, 0, 0.1),\n    0 32px 80px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  border-right-width: 6px;\n}\n.stat-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  z-index: 1;\n  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));\n  background: rgba(0, 0, 0, 0.04);\n  padding: 12px;\n  border-radius: 14px;\n}\n.stat-card[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%] {\n  z-index: 1;\n}\n.stat-card[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  color: var(--text-secondary);\n  margin-bottom: 10px;\n  font-weight: 700;\n}\n.stat-card[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 30px;\n  color: var(--text-primary);\n  font-family: "Courier New", monospace;\n  font-weight: 900;\n}\n.chart-content[_ngcontent-%COMP%]   .chart-container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 32px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  box-shadow:\n    0 1.2px 2.4px rgba(0, 0, 0, 0.06),\n    0 3.6px 7.2px rgba(0, 0, 0, 0.08),\n    0 9.6px 24px rgba(0, 0, 0, 0.1),\n    0 19.2px 48px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.notes-content[_ngcontent-%COMP%]   .notes-area[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 420px;\n  padding: 24px;\n  border: 2px solid var(--border-color);\n  border-radius: 18px;\n  font-family: inherit;\n  font-size: 16px;\n  line-height: 2;\n  color: var(--text-primary);\n  background: var(--bg-input);\n  resize: vertical;\n  box-sizing: border-box;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.5px 1px rgba(0, 0, 0, 0.06),\n    0 1.5px 3px rgba(0, 0, 0, 0.08),\n    0 4px 10px rgba(0, 0, 0, 0.1),\n    0 8px 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.notes-content[_ngcontent-%COMP%]   .notes-area[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow:\n    0 0 20px rgba(59, 130, 246, 0.25),\n    0 0 60px rgba(59, 130, 246, 0.075),\n    0 8px 30px rgba(0, 0, 0, 0.15);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  animation: _ngcontent-%COMP%_fadeInScale 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  width: 100%;\n  max-width: 540px;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow:\n    0 3px 6px rgba(0, 0, 0, 0.06),\n    0 9px 18px rgba(0, 0, 0, 0.08),\n    0 24px 60px rgba(0, 0, 0, 0.1),\n    0 48px 120px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  animation: _ngcontent-%COMP%_fadeInUp 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.modal-content.modal-lg[_ngcontent-%COMP%] {\n  max-width: 880px;\n}\n.modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n  background: rgba(0, 0, 0, 0.02);\n}\n.modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0;\n}\n.modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .wizard-progress[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .wizard-progress[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 7px;\n  background: var(--bg-surface);\n  border-radius: 4px;\n  overflow: hidden;\n}\n.modal-content[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   .wizard-progress[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%]   .progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6,\n      #6366f1,\n      #a855f7);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 2s linear infinite;\n  border-radius: 4px;\n  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n  box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);\n}\n.modal-content[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 28px;\n}\n.modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 20px 28px;\n  border-top: 1px solid var(--border-color);\n  background: rgba(0, 0, 0, 0.02);\n}\n.modal-content[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.permissions-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.permission-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 14px;\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.permission-row[_ngcontent-%COMP%]:hover {\n  box-shadow:\n    0 0.5px 1px rgba(0, 0, 0, 0.06),\n    0 1.5px 3px rgba(0, 0, 0, 0.08),\n    0 4px 10px rgba(0, 0, 0, 0.1),\n    0 8px 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  transform: translateX(-3px);\n}\n.permission-row[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.permission-row[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 9px 16px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 10px;\n  font-family: inherit;\n  font-size: 13px;\n  background: var(--bg-input);\n  color: var(--text-primary);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color);\n  background: transparent;\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.08);\n  color: #3b82f6;\n  border-color: rgba(59, 130, 246, 0.3);\n  transform: scale(1.12) translateY(-2px);\n  box-shadow:\n    0 1px 3px rgba(59, 130, 246, 0.2),\n    0 3px 9px rgba(59, 130, 246, 0.18),\n    0 7px 20px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.08);\n  color: #ef4444;\n  border-color: rgba(239, 68, 68, 0.3);\n  transform: scale(1.12) translateY(-2px);\n  box-shadow:\n    0 1px 3px rgba(239, 68, 68, 0.2),\n    0 3px 9px rgba(239, 68, 68, 0.18),\n    0 7px 20px rgba(239, 68, 68, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 28px;\n  border-radius: 14px;\n  border: none;\n  background:\n    linear-gradient(\n      145deg,\n      #5b9af8,\n      #6366f1);\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow:\n    0 2px 6px rgba(59, 130, 246, 0.2),\n    0 6px 18px rgba(59, 130, 246, 0.18),\n    0 14px 40px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  position: relative;\n  overflow: hidden;\n}\n.add-btn[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.3),\n      transparent);\n  border-radius: inherit;\n  pointer-events: none;\n  z-index: 1;\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow:\n    0 0 20px rgba(59, 130, 246, 0.5),\n    0 0 60px rgba(59, 130, 246, 0.15),\n    0 8px 30px rgba(0, 0, 0, 0.15);\n  filter: brightness(1.1);\n}\n.inventory-content[_ngcontent-%COMP%] {\n  padding: 8px 0;\n}\n.inventory-table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n}\n.inventory-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.inventory-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  font-weight: 700;\n  text-align: right;\n  white-space: nowrap;\n  border-bottom: 2px solid var(--border-color);\n}\n.inventory-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-bottom: 1px solid var(--border-color);\n  vertical-align: middle;\n  font-weight: 600;\n}\n.inventory-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: var(--bg-hover);\n}\n.item-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.item-code[_ngcontent-%COMP%] {\n  font-family: monospace;\n  direction: ltr;\n  color: var(--text-secondary);\n  font-size: 12px;\n}\n.item-qty[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: var(--text-primary);\n  text-align: center;\n}\n.item-qty.low-stock[_ngcontent-%COMP%] {\n  color: #ef4444;\n  background: rgba(239, 68, 68, 0.08);\n  border-radius: 6px;\n  padding: 4px 8px;\n}\n.item-cost[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text-primary);\n  white-space: nowrap;\n}\n.item-date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  white-space: nowrap;\n}\n.inventory-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  margin-top: 12px;\n  background: var(--bg-surface);\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n}\n.inventory-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.inventory-summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-weight: 800;\n  margin-right: 4px;\n}\n.reports-content[_ngcontent-%COMP%] {\n  padding: 8px 0;\n}\n.reports-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 14px;\n}\n.report-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 20px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.report-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.report-card[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.report-card[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.report-card[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-top: 2px;\n}\n.report-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n}\n@media (max-width: 768px) {\n  .list-view[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .screens-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .tab-types-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .op-types-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .accounts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .wizard-view[_ngcontent-%COMP%]   .wizard-header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .wizard-view[_ngcontent-%COMP%]   .wizard-body[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .accounts-filter-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .accounts-filter-bar[_ngcontent-%COMP%]   .search-box[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n  .log-content[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .log-content[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   input[type=date][_ngcontent-%COMP%], \n   .log-content[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .entry-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .entry-row[_ngcontent-%COMP%]   .amount-input[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    max-width: 100%;\n    margin: 10px;\n  }\n  .op-buttons-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .tab-content[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .screen-view[_ngcontent-%COMP%]   .screen-header[_ngcontent-%COMP%] {\n    padding: 14px 18px;\n  }\n  .accounts-content[_ngcontent-%COMP%]   .accounts-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .tabs-bar[_ngcontent-%COMP%] {\n    padding: 8px 14px;\n  }\n}\n.transfer-form[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.04);\n  border: 1px solid rgba(59, 130, 246, 0.15);\n  border-radius: 12px;\n  padding: 20px;\n  margin: 12px 0;\n}\n.transfer-form[_ngcontent-%COMP%]   .transfer-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 12px;\n}\n.transfer-form[_ngcontent-%COMP%]   .transfer-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.transfer-form[_ngcontent-%COMP%]   .transfer-row[_ngcontent-%COMP%]   .transfer-arrow[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(59, 130, 246, 0.1);\n  border-radius: 50%;\n  margin-bottom: 4px;\n}\n.transfer-form[_ngcontent-%COMP%]   .transfer-row[_ngcontent-%COMP%]   .transfer-arrow[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  font-size: 20px;\n}\n@media (max-width: 768px) {\n  .transfer-form[_ngcontent-%COMP%]   .transfer-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .transfer-form[_ngcontent-%COMP%]   .transfer-row[_ngcontent-%COMP%]   .transfer-arrow[_ngcontent-%COMP%] {\n    transform: rotate(90deg);\n    align-self: center;\n  }\n}\n.report-filters[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.report-filters[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.report-results[_ngcontent-%COMP%]   .report-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.report-results[_ngcontent-%COMP%]   .report-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  flex: 1;\n  margin: 0;\n  font-size: 16px;\n  color: #1e293b;\n}\n.report-results[_ngcontent-%COMP%]   .report-header[_ngcontent-%COMP%]   .report-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.report-results[_ngcontent-%COMP%]   .report-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  padding: 16px;\n  background: #f8fafc;\n  border-radius: 10px;\n}\n.report-results[_ngcontent-%COMP%]   .report-section[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  font-size: 14px;\n  color: #3b82f6;\n}\n.report-results[_ngcontent-%COMP%]   .report-table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.report-results[_ngcontent-%COMP%]   .report-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12px;\n}\n.report-results[_ngcontent-%COMP%]   .report-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  padding: 8px 10px;\n  text-align: right;\n  font-weight: 600;\n  color: #475569;\n  border-bottom: 1px solid #e2e8f0;\n  white-space: nowrap;\n}\n.report-results[_ngcontent-%COMP%]   .report-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 6px 10px;\n  border-bottom: 1px solid #f1f5f9;\n  color: #334155;\n}\n.report-results[_ngcontent-%COMP%]   .summary-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 12px;\n}\n.report-results[_ngcontent-%COMP%]   .summary-cards[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 16px;\n  background: white;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n}\n.report-results[_ngcontent-%COMP%]   .summary-cards[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.report-results[_ngcontent-%COMP%]   .summary-cards[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 18px;\n  color: #1e293b;\n}\n.report-results[_ngcontent-%COMP%]   .summary-cards[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n}\n.error-text[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 13px;\n}\n.no-data-text[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 13px;\n  text-align: center;\n  padding: 20px;\n}\n.loading-inline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 16px;\n  color: #64748b;\n  font-size: 13px;\n}\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2px solid #e2e8f0;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n.footer-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  margin-right: auto;\n}\n.log-footer[_ngcontent-%COMP%], \n.inventory-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n@media print {\n  [_nghost-%COMP%] {\n    background: white !important;\n  }\n  .screen-header[_ngcontent-%COMP%], \n   .tabs-bar[_ngcontent-%COMP%], \n   .log-filters[_ngcontent-%COMP%], \n   .report-filters[_ngcontent-%COMP%], \n   .footer-actions[_ngcontent-%COMP%], \n   .header-actions[_ngcontent-%COMP%], \n   .btn-icon[_ngcontent-%COMP%], \n   .report-header[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .tab-content[_ngcontent-%COMP%] {\n    padding: 0 !important;\n  }\n  .report-table[_ngcontent-%COMP%], \n   .log-table[_ngcontent-%COMP%] {\n    font-size: 10px !important;\n  }\n}\n.tabs-bar.cdk-drop-list-dragging[_ngcontent-%COMP%]   .tab-btn[_ngcontent-%COMP%] {\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n.tab-btn.cdk-drag-preview[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);\n  opacity: 0.9;\n}\n.tab-btn.cdk-drag-placeholder[_ngcontent-%COMP%] {\n  opacity: 0.3;\n}\n.tab-btn.cdk-drag-animating[_ngcontent-%COMP%] {\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n.templates-desc[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 13px;\n  margin: 0 0 16px;\n}\n.templates-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.template-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 14px;\n  padding: 16px;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.template-card[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.02);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n}\n.template-card[_ngcontent-%COMP%]   .template-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.template-card[_ngcontent-%COMP%]   .template-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 24px;\n}\n.template-card[_ngcontent-%COMP%]   .template-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.template-card[_ngcontent-%COMP%]   .template-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  color: #1e293b;\n  margin-bottom: 2px;\n}\n.template-card[_ngcontent-%COMP%]   .template-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: #94a3b8;\n  margin-bottom: 8px;\n}\n.template-card[_ngcontent-%COMP%]   .template-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n.template-card[_ngcontent-%COMP%]   .mini-tab[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  padding: 2px 8px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 500;\n}\n.template-card[_ngcontent-%COMP%]   .mini-tab[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n@media (max-width: 480px) {\n  .screen-header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 8px;\n    padding: 12px !important;\n  }\n  .screen-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 16px !important;\n  }\n  .tabs-bar[_ngcontent-%COMP%] {\n    gap: 4px !important;\n    overflow-x: auto;\n    flex-wrap: nowrap;\n    padding: 0 8px;\n  }\n  .tab-btn[_ngcontent-%COMP%] {\n    font-size: 12px !important;\n    padding: 6px 10px !important;\n    white-space: nowrap;\n  }\n  .tab-content[_ngcontent-%COMP%] {\n    padding: 12px !important;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n  }\n  .log-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .log-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 4px 6px !important;\n    font-size: 11px !important;\n  }\n  .report-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .report-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 4px 6px !important;\n    font-size: 11px !important;\n  }\n  .summary-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr !important;\n  }\n  .op-btn[_ngcontent-%COMP%] {\n    padding: 10px !important;\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    width: 98% !important;\n    max-height: 95vh !important;\n    margin: 8px !important;\n  }\n  .wizard-step[_ngcontent-%COMP%] {\n    padding: 12px !important;\n  }\n  .templates-grid[_ngcontent-%COMP%]   .template-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n  }\n}\n@media (min-width: 481px) and (max-width: 768px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr) !important;\n  }\n  .summary-cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr) !important;\n  }\n}\n@media (min-width: 769px) and (max-width: 1024px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr) !important;\n  }\n  .screens-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr) !important;\n  }\n}\n@media (min-width: 1025px) and (max-width: 1440px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, 1fr) !important;\n  }\n}\n.notification-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -4px;\n  right: -4px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #ef4444;\n  color: white;\n  font-size: 10px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid white;\n  animation: _ngcontent-%COMP%_notif-pulse 2s infinite;\n}\n@keyframes _ngcontent-%COMP%_notif-pulse {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.1);\n  }\n}\n.notification-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #ef4444;\n  display: inline-block;\n  margin-right: 4px;\n  animation: _ngcontent-%COMP%_notif-pulse 2s infinite;\n}\n/*# sourceMappingURL=custom-screens.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomScreensComponent, [{
    type: Component,
    args: [{ selector: "app-custom-screens", standalone: true, imports: [
      CommonModule,
      FormsModule,
      BaseChartDirective,
      ColorPickerDirective,
      CdkDrag,
      CdkDropList,
      LoadingStateComponent,
      StatusBadgeComponent
    ], template: `<div class="custom-screens-page">\r
\r
  <!-- ======================== LOADING ======================== -->\r
  @if (loading()) {\r
    <div class="loading-overlay">\r
      <div class="spinner"></div>\r
      <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>\r
    </div>\r
  }\r
\r
  <!-- ======================== LIST VIEW ======================== -->\r
  @if (viewMode() === 'list') {\r
    <div class="list-view">\r
      <div class="page-header">\r
        <div class="header-right">\r
          <span class="material-icons-round header-icon">space_dashboard</span>\r
          <h2>\u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629</h2>\r
          <span class="badge">{{ screens().length }}</span>\r
        </div>\r
        <button class="btn btn-primary" (click)="startWizard()">\r
          <span class="material-icons-round">add</span>\r
          \u0625\u0646\u0634\u0627\u0621 \u0634\u0627\u0634\u0629 \u062C\u062F\u064A\u062F\u0629\r
        </button>\r
        <button class="btn" (click)="showTemplatesModal.set(true)">\r
          <span class="material-icons-round">auto_awesome</span>\r
          \u0642\u0648\u0627\u0644\u0628 \u062C\u0627\u0647\u0632\u0629\r
        </button>\r
      </div>\r
\r
      @if (screens().length === 0 && !loading()) {\r
        <div class="empty-state">\r
          <span class="material-icons-round empty-icon">space_dashboard</span>\r
          <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0634\u0627\u0634\u0627\u062A \u0645\u062E\u0635\u0635\u0629</h3>\r
          <p>\u0623\u0646\u0634\u0626 \u0634\u0627\u0634\u062A\u0643 \u0627\u0644\u0623\u0648\u0644\u0649 \u0644\u062A\u0628\u062F\u0623 \u0628\u062A\u0646\u0638\u064A\u0645 \u0639\u0645\u0644\u0643</p>\r
          <button class="btn btn-primary" (click)="startWizard()">\r
            <span class="material-icons-round">add</span>\r
            \u0625\u0646\u0634\u0627\u0621 \u0634\u0627\u0634\u0629\r
          </button>\r
        </div>\r
      }\r
\r
      <div class="screens-grid">\r
        @for (screen of screens(); track screen.id) {\r
          <div class="screen-card" [style.--card-color]="screen.color || '#3b82f6'">\r
            <div class="card-header" (click)="openScreen(screen)">\r
              <div class="card-icon" [style.background]="screen.color || '#3b82f6'">\r
                <span class="material-icons-round">{{ screen.icon || 'dashboard' }}</span>\r
              </div>\r
              <div class="card-info">\r
                <h3>{{ screen.name }}</h3>\r
                <p>{{ screen.description || '\u0634\u0627\u0634\u0629 \u0645\u062E\u0635\u0635\u0629' }}</p>\r
              </div>\r
            </div>\r
            <div class="card-actions">\r
              <button class="btn-icon" title="\u0641\u062A\u062D" (click)="openScreen(screen)">\r
                <span class="material-icons-round">open_in_new</span>\r
              </button>\r
              <button class="btn-icon" title="\u062A\u0639\u062F\u064A\u0644" (click)="openScreenForm(screen)">\r
                <span class="material-icons-round">edit</span>\r
              </button>\r
              <button class="btn-icon" title="\u0646\u0633\u062E" (click)="cloneScreen(screen)">\r
                <span class="material-icons-round">content_copy</span>\r
              </button>\r
              <button class="btn-icon" title="\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0642\u0627\u0626\u0645\u0629" (click)="openSidebarModal(screen)">\r
                <span class="material-icons-round">add_to_home_screen</span>\r
              </button>\r
              <button class="btn-icon" title="\u0635\u0644\u0627\u062D\u064A\u0627\u062A" (click)="openPermissionsModal(screen)">\r
                <span class="material-icons-round">lock</span>\r
              </button>\r
              <button class="btn-icon danger" title="\u062D\u0630\u0641" (click)="deleteScreen(screen)">\r
                <span class="material-icons-round">delete</span>\r
              </button>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ======================== WIZARD VIEW ======================== -->\r
  @if (viewMode() === 'wizard') {\r
    <div class="wizard-view">\r
      <div class="wizard-header">\r
        <button class="btn btn-ghost" (click)="cancelWizard()">\r
          <span class="material-icons-round">close</span>\r
          \u0625\u0644\u063A\u0627\u0621\r
        </button>\r
        <h2>{{ wizardIsEditing() ? '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0634\u0627\u0634\u0629' : '\u0625\u0646\u0634\u0627\u0621 \u0634\u0627\u0634\u0629 \u062C\u062F\u064A\u062F\u0629' }}</h2>\r
        <div class="wizard-progress">\r
          <span>\u0627\u0644\u062E\u0637\u0648\u0629 {{ wizardStep() }} \u0645\u0646 {{ getWizardTotalSteps() }}</span>\r
          <div class="progress-bar">\r
            <div class="progress-fill" [style.width.%]="(wizardStep() / getWizardTotalSteps()) * 100"></div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="wizard-body">\r
        <h3 class="step-title">{{ getWizardStepTitle() }}</h3>\r
\r
        <!-- STEP 1: Basic Info -->\r
        @if (wizardStep() === 1) {\r
          <div class="wizard-step step-basic">\r
            <div class="form-group">\r
              <label>\u0627\u0633\u0645 \u0627\u0644\u0634\u0627\u0634\u0629 *</label>\r
              <input type="text" [ngModel]="wizardScreenName()" (ngModelChange)="wizardScreenName.set($event)" placeholder="\u0645\u062B\u0627\u0644: \u0627\u0644\u0645\u0628\u064A\u0639\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629">\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0648\u0635\u0641</label>\r
              <textarea [ngModel]="wizardScreenDesc()" (ngModelChange)="wizardScreenDesc.set($event)" placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u0634\u0627\u0634\u0629" rows="2"></textarea>\r
            </div>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
                <div class="icon-grid">\r
                  @for (icon of icons; track icon) {\r
                    <button class="icon-option" [class.selected]="wizardScreenIcon() === icon" (click)="wizardScreenIcon.set(icon)">\r
                      <span class="material-icons-round">{{ icon }}</span>\r
                    </button>\r
                  }\r
                </div>\r
              </div>\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0644\u0648\u0646</label>\r
                <div class="color-grid">\r
                  @for (color of colors; track color) {\r
                    <button class="color-option" [class.selected]="wizardScreenColor() === color" [style.background]="color" (click)="wizardScreenColor.set(color)"></button>\r
                  }\r
                </div>\r
                <div class="custom-color">\r
                  <input type="text" [ngModel]="wizardScreenColor()" (ngModelChange)="wizardScreenColor.set($event)" [cpPosition]="'bottom'" [cpOutputFormat]="'hex'" [colorPicker]="wizardScreenColor()" (colorPickerChange)="onColorPickerChange($event, 'wizard')">\r
                  <div class="color-preview" [style.background]="wizardScreenColor()"></div>\r
                </div>\r
              </div>\r
            </div>\r
            <div class="form-group sidebar-option">\r
              <label class="checkbox-label">\r
                <input type="checkbox" [ngModel]="wizardAddToSidebar()" (ngModelChange)="wizardAddToSidebar.set($event)">\r
                <span>\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B</span>\r
              </label>\r
              @if (wizardAddToSidebar()) {\r
                <div class="sidebar-config">\r
                  <select [ngModel]="wizardSidebarSectionId()" (ngModelChange)="wizardSidebarSectionId.set(+$event)">\r
                    @for (section of wizardSidebarSections(); track section.id) {\r
                      <option [value]="section.id">{{ section.name }}</option>\r
                    }\r
                  </select>\r
                  <input type="number" [ngModel]="wizardSidebarSortOrder()" (ngModelChange)="wizardSidebarSortOrder.set(+$event)" placeholder="\u062A\u0631\u062A\u064A\u0628" min="0">\r
                </div>\r
              }\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- STEP 2: Add Tabs -->\r
        @if (wizardStep() === 2) {\r
          <div class="wizard-step step-tabs">\r
            <p class="step-desc">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0631\u064A\u062F\u0647\u0627 \u0641\u064A \u0634\u0627\u0634\u062A\u0643. \u064A\u0645\u0643\u0646\u0643 \u0625\u0636\u0627\u0641\u0629 \u0623\u064A \u0639\u062F\u062F \u0648\u062A\u0631\u062A\u064A\u0628\u0647\u0627 \u0643\u0645\u0627 \u062A\u0634\u0627\u0621.</p>\r
\r
            <div class="tab-types-grid">\r
              @for (tabType of tabTypeOptions; track tabType.value) {\r
                <button class="tab-type-card" (click)="addWizardTab(tabType.value)">\r
                  <span class="material-icons-round" [style.color]="tabType.color">{{ tabType.icon }}</span>\r
                  <strong>{{ tabType.label }}</strong>\r
                  <small>{{ tabType.desc }}</small>\r
                  <span class="material-icons-round add-icon">add_circle</span>\r
                </button>\r
              }\r
            </div>\r
\r
            @if (wizardTabs().length > 0) {\r
              <h4 class="subsection-title">\u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0636\u0627\u0641\u0629 ({{ wizardTabs().length }})</h4>\r
              <div class="added-tabs-list">\r
                @for (tab of wizardTabs(); track tab.id; let i = $index) {\r
                  <div class="added-tab-item" [style.border-right-color]="tab.color">\r
                    <div class="tab-item-info">\r
                      <span class="material-icons-round" [style.color]="tab.color">{{ tab.icon }}</span>\r
                      <div>\r
                        <input type="text" class="tab-name-input" [ngModel]="tab.label" (ngModelChange)="updateWizardTab(i, 'label', $event)" placeholder="\u0627\u0633\u0645 \u0627\u0644\u062A\u0628\u0648\u064A\u0628">\r
                        <small class="tab-type-badge" [style.color]="getTabTypeInfo(tab.type).color">{{ getTabTypeInfo(tab.type).label }}</small>\r
                      </div>\r
                    </div>\r
                    <div class="tab-item-actions">\r
                      <button class="btn-icon sm" (click)="moveWizardTab(i, 'up')" [disabled]="i === 0" title="\u062A\u062D\u0631\u064A\u0643 \u0644\u0623\u0639\u0644\u0649">\r
                        <span class="material-icons-round">arrow_upward</span>\r
                      </button>\r
                      <button class="btn-icon sm" (click)="moveWizardTab(i, 'down')" [disabled]="i === wizardTabs().length - 1" title="\u062A\u062D\u0631\u064A\u0643 \u0644\u0623\u0633\u0641\u0644">\r
                        <span class="material-icons-round">arrow_downward</span>\r
                      </button>\r
                      <button class="btn-icon sm danger" (click)="removeWizardTab(i)" title="\u062D\u0630\u0641">\r
                        <span class="material-icons-round">delete</span>\r
                      </button>\r
                    </div>\r
                  </div>\r
                }\r
              </div>\r
            }\r
          </div>\r
        }\r
\r
        <!-- STEP 3+: Configure each tab -->\r
        @if (wizardStep() >= 3 && wizardStep() < getWizardTotalSteps()) {\r
          @let configTabs = getConfigurableTabs();\r
          @let configIdx = wizardStep() - 3;\r
          @if (configIdx >= 0 && configIdx < configTabs.length) {\r
            @let tab = configTabs[configIdx];\r
            <div class="wizard-step step-config">\r
              <div class="tab-config-header">\r
                <div class="tab-preview" [style.border-color]="tab.color">\r
                  <span class="material-icons-round" [style.color]="tab.color">{{ tab.icon }}</span>\r
                  <span>{{ tab.label }}</span>\r
                </div>\r
                <div class="mini-config">\r
                  <div class="icon-grid compact">\r
                    @for (icon of icons; track icon) {\r
                      <button class="icon-option sm" [class.selected]="tab.icon === icon" (click)="updateWizardTab(wizardTabs().indexOf(tab), 'icon', icon)">\r
                        <span class="material-icons-round">{{ icon }}</span>\r
                      </button>\r
                    }\r
                  </div>\r
                  <div class="color-grid compact">\r
                    @for (color of colors; track color) {\r
                      <button class="color-option sm" [class.selected]="tab.color === color" [style.background]="color" (click)="updateWizardTab(wizardTabs().indexOf(tab), 'color', color)"></button>\r
                    }\r
                  </div>\r
                </div>\r
              </div>\r
\r
              @if (tab.type === 'operations') {\r
                <h4>\u0627\u062E\u062A\u0631 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628</h4>\r
                <div class="op-types-grid">\r
                  @for (ot of operationTypes(); track ot.id) {\r
                    <button class="op-type-item" [class.selected]="(tab.config?.operationTypeIds || []).includes(ot.id)"\r
                      (click)="toggleWizardTabOpType(wizardTabs().indexOf(tab), ot.id)">\r
                      <span class="material-icons-round" [style.color]="ot.color || '#3b82f6'">{{ ot.icon || 'receipt_long' }}</span>\r
                      <span>{{ ot.name }}</span>\r
                      @if ((tab.config?.operationTypeIds || []).includes(ot.id)) {\r
                        <span class="material-icons-round check">check_circle</span>\r
                      }\r
                    </button>\r
                  }\r
                </div>\r
                <p class="selected-count">\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 {{ (tab.config?.operationTypeIds || []).length }} \u0646\u0648\u0639 \u0639\u0645\u0644\u064A\u0629</p>\r
              }\r
\r
              @if (tab.type === 'accounts') {\r
                <h4>\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628</h4>\r
                <div class="accounts-filter-bar">\r
                  <div class="filter-chips">\r
                    <button class="filter-chip" [class.active]="accFilterType() === 'all'" (click)="setAccFilterType('all')">\r
                      \u0627\u0644\u0643\u0644 <span class="chip-count">{{ allAccounts().length }}</span>\r
                    </button>\r
                    @for (filter of accDynamicFilters(); track filter.value) {\r
                      <button class="filter-chip" [class.active]="accFilterType() === filter.value" (click)="setAccFilterType(filter.value)" [style.--chip-color]="filter.color">\r
                        <span class="material-icons-round chip-icon">{{ filter.icon }}</span>\r
                        {{ filter.label }}\r
                        <span class="chip-count">{{ allAccounts().filter(a => a.accountType === filter.value).length }}</span>\r
                      </button>\r
                    }\r
                  </div>\r
                  <div class="search-box">\r
                    <span class="material-icons-round">search</span>\r
                    <input type="text" [ngModel]="accSearchQuery()" (ngModelChange)="accSearchQuery.set($event)" placeholder="\u0628\u062D\u062B...">\r
                  </div>\r
                </div>\r
                <div class="accounts-grid">\r
                  @for (acc of accFiltered(); track acc.id) {\r
                    <button class="account-item" [class.selected]="(tab.config?.accountIds || []).includes(acc.id)"\r
                      (click)="toggleWizardTabAccount(wizardTabs().indexOf(tab), acc.id)">\r
                      <span class="material-icons-round acc-icon" [style.color]="getAccTypeMeta(acc.accountType).color">{{ getAccTypeMeta(acc.accountType).icon }}</span>\r
                      <span class="acc-name">{{ acc.name }}</span>\r
                      <span class="acc-type-label">{{ getAccTypeMeta(acc.accountType).label }}</span>\r
                      @if ((tab.config?.accountIds || []).includes(acc.id)) {\r
                        <span class="material-icons-round check">check_circle</span>\r
                      }\r
                    </button>\r
                  }\r
                </div>\r
                <p class="selected-count">\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 {{ (tab.config?.accountIds || []).length }} \u062D\u0633\u0627\u0628</p>\r
              }\r
\r
              @if (tab.type === 'inventory') {\r
                <h4>\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0623\u0635\u0646\u0627\u0641</h4>\r
                <p class="config-hint">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u062A\u064A \u062A\u0631\u064A\u062F \u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u0635\u0646\u0627\u0641\u0647\u0627 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628</p>\r
                @if (inventoryWarehouses().length === 0) {\r
                  <div class="empty-config">\r
                    <span class="material-icons-round">warehouse</span>\r
                    <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0632\u0646. \u0623\u0636\u0641 \u0645\u062E\u0627\u0632\u0646 \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u062E\u0627\u0632\u0646.</p>\r
                  </div>\r
                } @else {\r
                  <div class="accounts-grid">\r
                    @for (wh of inventoryWarehouses(); track wh.id) {\r
                      <button class="account-item" [class.selected]="(tab.config?.warehouseIds || []).includes(wh.id)"\r
                        (click)="toggleWizardTabWarehouse(wizardTabs().indexOf(tab), wh.id)">\r
                        <span class="material-icons-round acc-icon" style="color: #0ea5e9">warehouse</span>\r
                        <span class="acc-name">{{ wh.name }}</span>\r
                        @if (wh.compositeCode) {\r
                          <span class="acc-type-label">{{ wh.compositeCode }}</span>\r
                        }\r
                        @if ((tab.config?.warehouseIds || []).includes(wh.id)) {\r
                          <span class="material-icons-round check">check_circle</span>\r
                        }\r
                      </button>\r
                    }\r
                  </div>\r
                  <p class="selected-count">\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 {{ (tab.config?.warehouseIds || []).length }} \u0645\u062E\u0632\u0646</p>\r
                }\r
              }\r
            </div>\r
          }\r
        }\r
\r
        <!-- LAST STEP: Preview -->\r
        @if (wizardStep() === getWizardTotalSteps()) {\r
          <div class="wizard-step step-preview">\r
            <div class="preview-card">\r
              <div class="preview-header" [style.background]="wizardScreenColor()">\r
                <span class="material-icons-round">{{ wizardScreenIcon() }}</span>\r
                <h3>{{ wizardScreenName() }}</h3>\r
              </div>\r
              <div class="preview-tabs">\r
                @for (tab of wizardTabs(); track tab.id) {\r
                  <div class="preview-tab" [style.border-bottom-color]="tab.color">\r
                    <span class="material-icons-round" [style.color]="tab.color">{{ tab.icon }}</span>\r
                    <span>{{ tab.label }}</span>\r
                    <small>({{ getTabTypeInfo(tab.type).label }})</small>\r
                  </div>\r
                }\r
              </div>\r
              <div class="preview-summary">\r
                <p><strong>\u0639\u062F\u062F \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A:</strong> {{ wizardTabs().length }}</p>\r
                <p><strong>\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0642\u0627\u0626\u0645\u0629:</strong> {{ wizardAddToSidebar() ? '\u0646\u0639\u0645' : '\u0644\u0627' }}</p>\r
              </div>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
\r
      <div class="wizard-footer">\r
        @if (wizardStep() > 1) {\r
          <button class="btn btn-ghost" (click)="prevWizardStep()">\r
            <span class="material-icons-round">arrow_forward</span>\r
            \u0627\u0644\u0633\u0627\u0628\u0642\r
          </button>\r
        }\r
        <div class="spacer"></div>\r
        <button class="btn btn-primary" (click)="nextWizardStep()" [disabled]="saving()">\r
          @if (wizardStep() === getWizardTotalSteps()) {\r
            <span class="material-icons-round">check</span>\r
            {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : '\u062D\u0641\u0638 \u0648\u0625\u0646\u0634\u0627\u0621' }}\r
          } @else {\r
            \u0627\u0644\u062A\u0627\u0644\u064A\r
            <span class="material-icons-round">arrow_back</span>\r
          }\r
        </button>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ======================== SCREEN VIEW (Dynamic Tabs) ======================== -->\r
  @if (viewMode() === 'screen' && activeScreen()) {\r
    <div class="screen-view">\r
      <div class="screen-header" [style.--screen-color]="activeScreen()!.color || '#3b82f6'">\r
        <div class="header-right">\r
          @if (!openedFromSidebar()) {\r
            <button class="btn-icon" (click)="backToList()" title="\u0631\u062C\u0648\u0639">\r
              <span class="material-icons-round">arrow_forward</span>\r
            </button>\r
          }\r
          <div class="screen-title-icon" [style.background]="activeScreen()!.color || '#3b82f6'">\r
            <span class="material-icons-round">{{ activeScreen()!.icon || 'dashboard' }}</span>\r
          </div>\r
          <h2>{{ activeScreen()!.name }}</h2>\r
        </div>\r
        <div class="header-actions">\r
          <button class="btn-icon" (click)="openConfigWizard()" title="\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A">\r
            <span class="material-icons-round">settings</span>\r
          </button>\r
          <button class="btn-icon" (click)="openScreenForm(activeScreen()!)" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0634\u0627\u0634\u0629">\r
            <span class="material-icons-round">edit</span>\r
          </button>\r
        </div>\r
      </div>\r
\r
      @if (screenTabs().length > 0) {\r
        <div class="tabs-bar" cdkDropList cdkDropListOrientation="horizontal" (cdkDropListDropped)="onTabDrop($event)">\r
          @for (tab of screenTabs(); track tab.id) {\r
            <button class="tab-btn" cdkDrag [class.active]="activeTabId() === tab.id" (click)="setActiveTab(tab.id)"\r
              [style.--tab-color]="tab.color" [style.background]="activeTabId() === tab.id ? tab.color : 'transparent'">\r
              <span class="material-icons-round">{{ tab.icon }}</span>\r
              <span>{{ tab.label }}</span>\r
            </button>\r
          }\r
        </div>\r
\r
        @for (tab of screenTabs(); track tab.id) {\r
          @if (activeTabId() === tab.id) {\r
            <div class="tab-content">\r
\r
              <!-- ===== OPERATIONS TAB ===== -->\r
              @if (tab.type === 'operations') {\r
                <div class="operations-content">\r
                  @if (!csSelectedOpType()) {\r
                    <div class="op-buttons-grid">\r
                      @for (ot of getTabOperationTypes(tab); track ot.id) {\r
                        <button class="op-button" (click)="selectOpType(ot)" [style.--op-color]="ot.color || '#3b82f6'">\r
                          <span class="material-icons-round">{{ ot.icon || 'receipt_long' }}</span>\r
                          <span>{{ ot.name }}</span>\r
                        </button>\r
                      }\r
                    </div>\r
                    @if (getTabOperationTypes(tab).length === 0) {\r
                      <div class="empty-tab">\r
                        <span class="material-icons-round">receipt_long</span>\r
                        <p>\u0644\u0645 \u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0623\u0646\u0648\u0627\u0639 \u0639\u0645\u0644\u064A\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628</p>\r
                      </div>\r
                    }\r
                  } @else {\r
                    <div class="operation-form">\r
                      <div class="form-header">\r
                        <button class="btn btn-ghost" (click)="cancelOpType()">\r
                          <span class="material-icons-round">arrow_forward</span>\r
                          \u0631\u062C\u0648\u0639\r
                        </button>\r
                        <h3 [style.color]="csSelectedOpType()!.color || '#3b82f6'">\r
                          <span class="material-icons-round">{{ csSelectedOpType()!.icon || 'receipt_long' }}</span>\r
                          {{ csSelectedOpType()!.name }}\r
                        </h3>\r
                      </div>\r
                      <div class="form-row">\r
                        <div class="form-group">\r
                          <label>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</label>\r
                          <input type="date" [ngModel]="csFormDate()" (ngModelChange)="csFormDate.set($event)">\r
                        </div>\r
                        @if (currencies().length > 1) {\r
                          <div class="form-group">\r
                            <label>\u0627\u0644\u0639\u0645\u0644\u0629</label>\r
                            <select [ngModel]="csFormCurrencyId()" (ngModelChange)="csFormCurrencyId.set(+$event)">\r
                              @for (cur of currencies(); track cur.id) {\r
                                <option [value]="cur.id">{{ cur.code }} - {{ cur.name }}</option>\r
                              }\r
                            </select>\r
                          </div>\r
                        }\r
                      </div>\r
                      <div class="form-group">\r
                        <label>\u0627\u0644\u0648\u0635\u0641</label>\r
                        <input type="text" [ngModel]="csFormDescription()" (ngModelChange)="csFormDescription.set($event)" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)">\r
                      </div>\r
\r
                      <!-- Transfer Form -->\r
                      @if (isTransferType()) {\r
                        <div class="transfer-form">\r
                          <div class="transfer-row">\r
                            <div class="form-group">\r
                              <label><span class="material-icons-round" style="font-size:16px;vertical-align:middle;color:#ef4444">arrow_upward</span> \u0645\u0646 \u062D\u0633\u0627\u0628</label>\r
                              <select [ngModel]="csTransferFromAccountId()" (ngModelChange)="csTransferFromAccountId.set(+$event)">\r
                                <option [value]="0">\u0627\u062E\u062A\u0631 \u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0635\u062F\u0631...</option>\r
                                @for (acc of allAccounts(); track acc.id) {\r
                                  <option [value]="acc.id">{{ acc.name }}</option>\r
                                }\r
                              </select>\r
                            </div>\r
                            <div class="transfer-arrow">\r
                              <span class="material-icons-round">arrow_back</span>\r
                            </div>\r
                            <div class="form-group">\r
                              <label><span class="material-icons-round" style="font-size:16px;vertical-align:middle;color:#22c55e">arrow_downward</span> \u0625\u0644\u0649 \u062D\u0633\u0627\u0628</label>\r
                              <select [ngModel]="csTransferToAccountId()" (ngModelChange)="csTransferToAccountId.set(+$event)">\r
                                <option [value]="0">\u0627\u062E\u062A\u0631 \u062D\u0633\u0627\u0628 \u0627\u0644\u0648\u062C\u0647\u0629...</option>\r
                                @for (acc of allAccounts(); track acc.id) {\r
                                  <option [value]="acc.id">{{ acc.name }}</option>\r
                                }\r
                              </select>\r
                            </div>\r
                          </div>\r
                          <div class="form-group">\r
                            <label>\u0627\u0644\u0645\u0628\u0644\u063A</label>\r
                            <input type="number" class="amount-input" [ngModel]="csTransferAmount()" (ngModelChange)="csTransferAmount.set($event)" placeholder="\u0645\u0628\u0644\u063A \u0627\u0644\u062A\u062D\u0648\u064A\u0644" min="0">\r
                          </div>\r
                        </div>\r
                      } @else {\r
                        <!-- Regular Entries -->\r
                        <div class="entries-list">\r
                          @for (entry of csFormEntries(); track $index; let i = $index) {\r
                            <div class="entry-row">\r
                              <div class="entry-account">\r
                                <span class="material-icons-round">account_balance</span>\r
                                <span>{{ entry.accountName || '\u062D\u0633\u0627\u0628 ' + (i + 1) }}</span>\r
                                @if (entry.accountId) {\r
                                  <small class="balance-hint">\u0627\u0644\u0631\u0635\u064A\u062F: {{ formatAmount(getAccountBalance(entry.accountId)) }}</small>\r
                                }\r
                              </div>\r
                              <input type="number" class="amount-input" [ngModel]="entry.amount" (ngModelChange)="updateFormEntry(i, 'amount', $event)" placeholder="\u0627\u0644\u0645\u0628\u0644\u063A" min="0">\r
                            </div>\r
                          }\r
                        </div>\r
                        <div class="form-summary">\r
                          <span>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A: <strong>{{ formatAmount(getFormTotal()) }}</strong></span>\r
                          <span>\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0628\u0623\u0629: <strong>{{ getFilledEntriesCount() }} / {{ csFormEntries().length }}</strong></span>\r
                        </div>\r
                      }\r
\r
                      <button class="btn btn-primary btn-lg" (click)="saveOperation()" [disabled]="saving() || (isTransferType() ? !csTransferAmount() : getFormTotal() === 0)">\r
                        <span class="material-icons-round">check</span>\r
                        {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630...' : isTransferType() ? '\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u062A\u062D\u0648\u064A\u0644' : '\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629' }}\r
                      </button>\r
                    </div>\r
                  }\r
                </div>\r
              }\r
\r
              <!-- ===== LOG TAB ===== -->\r
              @if (tab.type === 'log') {\r
                <div class="log-content">\r
                  <div class="log-filters">\r
                    <div class="filter-row">\r
                      <input type="date" [ngModel]="logFilterDateFrom()" (ngModelChange)="logFilterDateFrom.set($event)">\r
                      <input type="date" [ngModel]="logFilterDateTo()" (ngModelChange)="logFilterDateTo.set($event)">\r
                      <select [ngModel]="logFilterOpType()" (ngModelChange)="logFilterOpType.set($event)">\r
                        <option value="">\u0643\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</option>\r
                        @for (ot of operationTypes(); track ot.id) {\r
                          <option [value]="ot.id">{{ ot.name }}</option>\r
                        }\r
                      </select>\r
                      <button class="btn btn-sm" (click)="applyLogFilters()">\r
                        <span class="material-icons-round">filter_list</span> \u062A\u0635\u0641\u064A\u0629\r
                      </button>\r
                      <button class="btn btn-ghost btn-sm" (click)="clearLogFilters()">\r
                        <span class="material-icons-round">clear</span>\r
                      </button>\r
                    </div>\r
                  </div>\r
                  <div class="log-table-container">\r
                    <table class="log-table">\r
                      <thead>\r
                        <tr><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u0648\u0635\u0641</th><th>\u0627\u0644\u0645\u062F\u064A\u0646</th><th>\u0627\u0644\u062F\u0627\u0626\u0646</th></tr>\r
                      </thead>\r
                      <tbody>\r
                        @for (entry of logEntries(); track entry.id) {\r
                          <tr>\r
                            <td>{{ formatDate(entry.entry_date) }}</td>\r
                            <td><span class="voucher-badge" [class]="getVoucherTypeClass(entry.voucher_type)">{{ getVoucherTypeLabel(entry.voucher_type) }}</span></td>\r
                            <td>{{ entry.description || entry.operation_type_name || '-' }}</td>\r
                            <td class="amount debit">{{ formatAmount(entry.total_debit) }}</td>\r
                            <td class="amount credit">{{ formatAmount(entry.total_credit) }}</td>\r
                          </tr>\r
                        }\r
                        @if (logEntries().length === 0) {\r
                          <tr><td colspan="5" class="empty-row">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A</td></tr>\r
                        }\r
                      </tbody>\r
                    </table>\r
                  </div>\r
                  <div class="log-footer">\r
                    <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A: {{ logTotal() }}</span>\r
                    <div class="footer-actions">\r
                      <button class="btn btn-ghost btn-sm" (click)="exportLogToCSV()" title="\u062A\u0635\u062F\u064A\u0631 CSV">\r
                        <span class="material-icons-round">download</span> \u062A\u0635\u062F\u064A\u0631\r
                      </button>\r
                      <button class="btn btn-ghost btn-sm" (click)="printCurrentTab()" title="\u0637\u0628\u0627\u0639\u0629">\r
                        <span class="material-icons-round">print</span>\r
                      </button>\r
                    </div>\r
                  </div>\r
                </div>\r
              }\r
\r
              <!-- ===== ACCOUNTS TAB ===== -->\r
              @if (tab.type === 'accounts') {\r
                <div class="accounts-content">\r
                  <div class="accounts-list">\r
                    @for (acc of getTabAccounts(tab); track acc.id) {\r
                      <div class="account-card">\r
                        <div class="acc-card-header">\r
                          <span class="material-icons-round" [style.color]="getAccTypeMeta(acc.account_type).color">{{ getAccountIcon(acc.account_type) }}</span>\r
                          <div class="acc-card-info">\r
                            <strong>{{ acc.name }}</strong>\r
                            <small>{{ getAccTypeMeta(acc.account_type).label }}</small>\r
                          </div>\r
                          <div class="acc-trend" [style.color]="getTrendColor(getBalanceTrend(acc))">\r
                            <span class="material-icons-round">{{ getTrendIcon(getBalanceTrend(acc)) }}</span>\r
                          </div>\r
                        </div>\r
                        <div class="acc-card-balance">\r
                          @for (bal of acc.balances; track bal.currencyId) {\r
                            <div class="balance-row">\r
                              <span class="currency">{{ bal.currencyCode || 'YER' }}</span>\r
                              <span class="balance-amount" [class.negative]="bal.balance < 0">{{ formatAmount(bal.balance) }}</span>\r
                            </div>\r
                          }\r
                          @if (!acc.balances || acc.balances.length === 0) {\r
                            <div class="balance-row"><span class="currency">YER</span><span class="balance-amount">0</span></div>\r
                          }\r
                        </div>\r
                      </div>\r
                    }\r
                    @if (getTabAccounts(tab).length === 0) {\r
                      <div class="empty-tab"><span class="material-icons-round">account_balance</span><p>\u0644\u0645 \u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u062D\u0633\u0627\u0628\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u062A\u0628\u0648\u064A\u0628</p></div>\r
                    }\r
                  </div>\r
                  @if (getTabAccounts(tab).length > 0) {\r
                    <div class="accounts-total"><span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0631\u0635\u062F\u0629:</span><strong>{{ formatAmount(getTotalAccountsBalance()) }}</strong></div>\r
                  }\r
                </div>\r
              }\r
\r
              <!-- ===== STATS TAB ===== -->\r
              @if (tab.type === 'stats') {\r
                <div class="stats-content">\r
                  <div class="stats-grid">\r
                    @for (card of getStatsCards(); track card.label) {\r
                      <div class="stat-card" [style.border-right-color]="card.color">\r
                        <span class="material-icons-round" [style.color]="card.color">{{ card.icon }}</span>\r
                        <div class="stat-info"><small>{{ card.label }}</small><strong>{{ card.value }}</strong></div>\r
                      </div>\r
                    }\r
                  </div>\r
                </div>\r
              }\r
\r
              <!-- ===== CHART TAB ===== -->\r
              @if (tab.type === 'chart') {\r
                <div class="chart-content">\r
                  <div class="chart-container">\r
                    <canvas baseChart [data]="barChartData" [options]="barChartOptions" type="bar"></canvas>\r
                  </div>\r
                </div>\r
              }\r
\r
              <!-- ===== INVENTORY TAB (\u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u0635\u0646\u0627\u0641) ===== -->\r
              @if (tab.type === 'inventory') {\r
                <div class="inventory-content">\r
                  @if (getTabInventory(tab).length > 0) {\r
                    <div class="inventory-table-wrapper">\r
                      <table class="inventory-table">\r
                        <thead>\r
                          <tr>\r
                            <th>\u0627\u0644\u0635\u0646\u0641</th>\r
                            <th>\u0627\u0644\u0631\u0645\u0632</th>\r
                            <th>\u0627\u0644\u0648\u062D\u062F\u0629</th>\r
                            <th>\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</th>\r
                            <th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0643\u0644\u0641\u0629</th>\r
                            <th>\u0622\u062E\u0631 \u062D\u0631\u0643\u0629</th>\r
                          </tr>\r
                        </thead>\r
                        <tbody>\r
                          @for (item of getTabInventory(tab); track item.item_name) {\r
                            <tr>\r
                              <td class="item-name">{{ item.item_name }}</td>\r
                              <td class="item-code">{{ item.item_code || '-' }}</td>\r
                              <td>{{ item.unit || '-' }}</td>\r
                              <td class="item-qty" [class.low-stock]="item.current_quantity < 5">{{ item.current_quantity }}</td>\r
                              <td class="item-cost">{{ formatAmount(item.total_cost || 0) }}</td>\r
                              <td class="item-date">{{ item.last_movement_date ? formatDate(item.last_movement_date) : '-' }}</td>\r
                            </tr>\r
                          }\r
                        </tbody>\r
                      </table>\r
                    </div>\r
                    <div class="inventory-summary">\r
                      <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0635\u0646\u0627\u0641: <strong>{{ getTabInventory(tab).length }}</strong></span>\r
                      <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0643\u0644\u0641\u0629: <strong>{{ formatAmount(getInventoryTotalCost(tab)) }}</strong></span>\r
                      <div class="footer-actions">\r
                        <button class="btn btn-ghost btn-sm" (click)="exportInventoryToCSV(tab)" title="\u062A\u0635\u062F\u064A\u0631 CSV">\r
                          <span class="material-icons-round">download</span> \u062A\u0635\u062F\u064A\u0631\r
                        </button>\r
                        <button class="btn btn-ghost btn-sm" (click)="printCurrentTab()" title="\u0637\u0628\u0627\u0639\u0629">\r
                          <span class="material-icons-round">print</span>\r
                        </button>\r
                      </div>\r
                    </div>\r
                  } @else {\r
                    <div class="empty-tab"><span class="material-icons-round">inventory_2</span><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641 \u0641\u064A \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</p></div>\r
                  }\r
                </div>\r
              }\r
\r
              <!-- ===== REPORTS TAB ===== -->\r
              @if (tab.type === 'reports') {\r
                <div class="reports-content">\r
                  @if (!reportData()) {\r
                    <!-- Report Selection -->\r
                    <div class="report-filters">\r
                      <div class="filter-row">\r
                        <input type="date" [ngModel]="reportDateFrom()" (ngModelChange)="reportDateFrom.set($event)" placeholder="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E">\r
                        <input type="date" [ngModel]="reportDateTo()" (ngModelChange)="reportDateTo.set($event)" placeholder="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E">\r
                      </div>\r
                    </div>\r
                    <div class="reports-grid">\r
                      <div class="report-card" (click)="generateReport('account_statement', tab)">\r
                        <span class="material-icons-round" style="color: #3b82f6">description</span>\r
                        <div><strong>\u0643\u0634\u0641 \u062D\u0633\u0627\u0628</strong><small>\u062A\u0642\u0631\u064A\u0631 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A</small></div>\r
                      </div>\r
                      <div class="report-card" (click)="generateReport('inventory_report', tab)">\r
                        <span class="material-icons-round" style="color: #22c55e">inventory_2</span>\r
                        <div><strong>\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0632\u0648\u0646</strong><small>\u062C\u0631\u062F \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0648\u0627\u0644\u0643\u0645\u064A\u0627\u062A \u0648\u0627\u0644\u062A\u0643\u0627\u0644\u064A\u0641</small></div>\r
                      </div>\r
                      <div class="report-card" (click)="generateReport('operations_summary', tab)">\r
                        <span class="material-icons-round" style="color: #f59e0b">summarize</span>\r
                        <div><strong>\u0645\u0644\u062E\u0635 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</strong><small>\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0646\u0648\u0639 \u0648\u0627\u0644\u0641\u062A\u0631\u0629</small></div>\r
                      </div>\r
                    </div>\r
                    @if (reportLoading()) {\r
                      <div class="loading-inline"><div class="spinner-sm"></div> \u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0642\u0631\u064A\u0631...</div>\r
                    }\r
                  } @else {\r
                    <!-- Report Results (Embedded) -->\r
                    <div class="report-results">\r
                      <div class="report-header">\r
                        <button class="btn btn-ghost btn-sm" (click)="closeReport()">\r
                          <span class="material-icons-round">arrow_forward</span> \u0631\u062C\u0648\u0639\r
                        </button>\r
                        <h4>\r
                          @if (reportType() === 'account_statement') { \u0643\u0634\u0641 \u062D\u0633\u0627\u0628 }\r
                          @if (reportType() === 'inventory_report') { \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 }\r
                          @if (reportType() === 'operations_summary') { \u0645\u0644\u062E\u0635 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A }\r
                        </h4>\r
                        <div class="report-actions">\r
                          <button class="btn btn-sm" (click)="printCurrentTab()" title="\u0637\u0628\u0627\u0639\u0629">\r
                            <span class="material-icons-round">print</span> \u0637\u0628\u0627\u0639\u0629\r
                          </button>\r
                        </div>\r
                      </div>\r
\r
                      <!-- Account Statement Results -->\r
                      @if (reportData()?.type === 'account_statement') {\r
                        @for (r of reportData().results; track r.accountId) {\r
                          <div class="report-section">\r
                            <h5>{{ r.accountName }}</h5>\r
                            @if (r.error) {\r
                              <p class="error-text">\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>\r
                            } @else if (r.entries?.length) {\r
                              <div class="report-table-wrapper">\r
                                <table class="report-table">\r
                                  <thead><tr><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><th>\u0627\u0644\u0648\u0635\u0641</th><th>\u0645\u062F\u064A\u0646</th><th>\u062F\u0627\u0626\u0646</th><th>\u0627\u0644\u0631\u0635\u064A\u062F</th></tr></thead>\r
                                  <tbody>\r
                                    @for (e of r.entries; track $index) {\r
                                      <tr>\r
                                        <td>{{ formatDate(e.date || e.entry_date) }}</td>\r
                                        <td>{{ e.description || '-' }}</td>\r
                                        <td class="amount debit">{{ formatAmount(e.debit || 0) }}</td>\r
                                        <td class="amount credit">{{ formatAmount(e.credit || 0) }}</td>\r
                                        <td class="amount">{{ formatAmount(e.balance || 0) }}</td>\r
                                      </tr>\r
                                    }\r
                                  </tbody>\r
                                </table>\r
                              </div>\r
                            } @else {\r
                              <p class="no-data-text">\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0631\u0643\u0627\u062A</p>\r
                            }\r
                          </div>\r
                        }\r
                      }\r
\r
                      <!-- Inventory Report Results -->\r
                      @if (reportData()?.type === 'inventory_report') {\r
                        @if (reportData().data?.length) {\r
                          <div class="report-table-wrapper">\r
                            <table class="report-table">\r
                              <thead><tr><th>\u0627\u0644\u0635\u0646\u0641</th><th>\u0627\u0644\u0645\u062E\u0632\u0646</th><th>\u0627\u0644\u0643\u0645\u064A\u0629</th><th>\u0627\u0644\u062A\u0643\u0644\u0641\u0629</th></tr></thead>\r
                              <tbody>\r
                                @for (item of reportData().data; track $index) {\r
                                  <tr>\r
                                    <td>{{ item.item_name || item.name }}</td>\r
                                    <td>{{ item.warehouse_name || '-' }}</td>\r
                                    <td>{{ item.quantity }}</td>\r
                                    <td class="amount">{{ formatAmount(item.total_cost || 0) }}</td>\r
                                  </tr>\r
                                }\r
                              </tbody>\r
                            </table>\r
                          </div>\r
                        } @else {\r
                          <p class="no-data-text">\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0635\u0646\u0627\u0641</p>\r
                        }\r
                      }\r
\r
                      <!-- Operations Summary Results -->\r
                      @if (reportData()?.type === 'operations_summary') {\r
                        @if (reportData().data) {\r
                          <div class="summary-cards">\r
                            <div class="summary-card"><span class="material-icons-round" style="color:#22c55e">arrow_downward</span><div><strong>{{ formatAmount(reportData().data.totalReceipts) }}</strong><small>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u062D\u0635\u064A\u0644</small></div></div>\r
                            <div class="summary-card"><span class="material-icons-round" style="color:#ef4444">arrow_upward</span><div><strong>{{ formatAmount(reportData().data.totalPayments) }}</strong><small>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0631\u0641</small></div></div>\r
                            <div class="summary-card"><span class="material-icons-round" style="color:#3b82f6">receipt_long</span><div><strong>{{ reportData().data.operationsCount }}</strong><small>\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</small></div></div>\r
                            <div class="summary-card"><span class="material-icons-round" style="color:#8b5cf6">account_balance</span><div><strong>{{ formatAmount(reportData().data.netBalance) }}</strong><small>\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0635\u064A\u062F</small></div></div>\r
                          </div>\r
                        } @else {\r
                          <p class="no-data-text">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>\r
                        }\r
                      }\r
                    </div>\r
                  }\r
                </div>\r
              }\r
\r
              <!-- ===== NOTES TAB ===== -->\r
              @if (tab.type === 'notes') {\r
                <div class="notes-content">\r
                  <textarea class="notes-area" [ngModel]="screenNotes()" (ngModelChange)="onNotesChange($event)" placeholder="\u0627\u0643\u062A\u0628 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 \u0647\u0646\u0627... (\u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)" rows="15"></textarea>\r
                </div>\r
              }\r
\r
            </div>\r
          }\r
        }\r
      } @else {\r
        <div class="empty-state">\r
          <span class="material-icons-round empty-icon">tab</span>\r
          <h3>\u0644\u0645 \u064A\u062A\u0645 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0628\u0639\u062F</h3>\r
          <p>\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0623\u064A\u0642\u0648\u0646\u0629 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0644\u0625\u0636\u0627\u0641\u0629 \u062A\u0628\u0648\u064A\u0628\u0627\u062A</p>\r
          <button class="btn btn-primary" (click)="openConfigWizard()">\r
            <span class="material-icons-round">settings</span>\r
            \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A\r
          </button>\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- ======================== CONFIG WIZARD MODAL ======================== -->\r
  @if (showConfigWizard()) {\r
    <div class="modal-overlay" (click)="closeConfigWizard()">\r
      <div class="modal-content modal-lg" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A</h3>\r
          <div class="wizard-progress">\r
            <span>\u0627\u0644\u062E\u0637\u0648\u0629 {{ configWizardStep() }} \u0645\u0646 {{ getConfigWizardTotalSteps() }}</span>\r
            <div class="progress-bar">\r
              <div class="progress-fill" [style.width.%]="(configWizardStep() / getConfigWizardTotalSteps()) * 100"></div>\r
            </div>\r
          </div>\r
          <button class="btn-icon" (click)="closeConfigWizard()"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          @if (configWizardStep() === 1) {\r
            <div class="wizard-step step-tabs">\r
              <p class="step-desc">\u0623\u0636\u0641 \u0623\u0648 \u0623\u0632\u0644 \u0623\u0648 \u0623\u0639\u062F \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A.</p>\r
              <div class="tab-types-grid">\r
                @for (tabType of tabTypeOptions; track tabType.value) {\r
                  <button class="tab-type-card" (click)="addConfigWizardTab(tabType.value)">\r
                    <span class="material-icons-round" [style.color]="tabType.color">{{ tabType.icon }}</span>\r
                    <strong>{{ tabType.label }}</strong>\r
                    <small>{{ tabType.desc }}</small>\r
                    <span class="material-icons-round add-icon">add_circle</span>\r
                  </button>\r
                }\r
              </div>\r
              @if (configWizardTabs().length > 0) {\r
                <h4 class="subsection-title">\u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A ({{ configWizardTabs().length }})</h4>\r
                <div class="added-tabs-list">\r
                  @for (tab of configWizardTabs(); track tab.id; let i = $index) {\r
                    <div class="added-tab-item" [style.border-right-color]="tab.color">\r
                      <div class="tab-item-info">\r
                        <span class="material-icons-round" [style.color]="tab.color">{{ tab.icon }}</span>\r
                        <div>\r
                          <input type="text" class="tab-name-input" [ngModel]="tab.label" (ngModelChange)="updateConfigWizardTab(i, 'label', $event)">\r
                          <small class="tab-type-badge" [style.color]="getTabTypeInfo(tab.type).color">{{ getTabTypeInfo(tab.type).label }}</small>\r
                        </div>\r
                      </div>\r
                      <div class="tab-item-actions">\r
                        <button class="btn-icon sm" (click)="moveConfigWizardTab(i, 'up')" [disabled]="i === 0"><span class="material-icons-round">arrow_upward</span></button>\r
                        <button class="btn-icon sm" (click)="moveConfigWizardTab(i, 'down')" [disabled]="i === configWizardTabs().length - 1"><span class="material-icons-round">arrow_downward</span></button>\r
                        <button class="btn-icon sm danger" (click)="removeConfigWizardTab(i)"><span class="material-icons-round">delete</span></button>\r
                      </div>\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          @if (configWizardStep() >= 2 && configWizardStep() < getConfigWizardTotalSteps()) {\r
            @let cfgTabs = getConfigWizardConfigurableTabs();\r
            @let cfgIdx = configWizardStep() - 2;\r
            @if (cfgIdx >= 0 && cfgIdx < cfgTabs.length) {\r
              @let cfgTab = cfgTabs[cfgIdx];\r
              <div class="wizard-step step-config">\r
                <div class="tab-config-header">\r
                  <div class="tab-preview" [style.border-color]="cfgTab.color">\r
                    <span class="material-icons-round" [style.color]="cfgTab.color">{{ cfgTab.icon }}</span>\r
                    <span>{{ cfgTab.label }}</span>\r
                  </div>\r
                  <div class="mini-config">\r
                    <div class="icon-grid compact">\r
                      @for (icon of icons; track icon) {\r
                        <button class="icon-option sm" [class.selected]="cfgTab.icon === icon" (click)="updateConfigWizardTab(configWizardTabs().indexOf(cfgTab), 'icon', icon)">\r
                          <span class="material-icons-round">{{ icon }}</span>\r
                        </button>\r
                      }\r
                    </div>\r
                    <div class="color-grid compact">\r
                      @for (color of colors; track color) {\r
                        <button class="color-option sm" [class.selected]="cfgTab.color === color" [style.background]="color" (click)="updateConfigWizardTab(configWizardTabs().indexOf(cfgTab), 'color', color)"></button>\r
                      }\r
                    </div>\r
                  </div>\r
                </div>\r
                @if (cfgTab.type === 'operations') {\r
                  <h4>\u0627\u062E\u062A\u0631 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</h4>\r
                  <div class="op-types-grid">\r
                    @for (ot of operationTypes(); track ot.id) {\r
                      <button class="op-type-item" [class.selected]="(cfgTab.config?.operationTypeIds || []).includes(ot.id)"\r
                        (click)="toggleConfigWizardTabOpType(configWizardTabs().indexOf(cfgTab), ot.id)">\r
                        <span class="material-icons-round" [style.color]="ot.color || '#3b82f6'">{{ ot.icon || 'receipt_long' }}</span>\r
                        <span>{{ ot.name }}</span>\r
                        @if ((cfgTab.config?.operationTypeIds || []).includes(ot.id)) {\r
                          <span class="material-icons-round check">check_circle</span>\r
                        }\r
                      </button>\r
                    }\r
                  </div>\r
                  <p class="selected-count">\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 {{ (cfgTab.config?.operationTypeIds || []).length }} \u0646\u0648\u0639 \u0639\u0645\u0644\u064A\u0629</p>\r
                }\r
                @if (cfgTab.type === 'accounts') {\r
                  <h4>\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A</h4>\r
                  <div class="accounts-filter-bar">\r
                    <div class="filter-chips">\r
                      <button class="filter-chip" [class.active]="accFilterType() === 'all'" (click)="setAccFilterType('all')">\r
                        \u0627\u0644\u0643\u0644 <span class="chip-count">{{ allAccounts().length }}</span>\r
                      </button>\r
                      @for (filter of accDynamicFilters(); track filter.value) {\r
                        <button class="filter-chip" [class.active]="accFilterType() === filter.value" (click)="setAccFilterType(filter.value)" [style.--chip-color]="filter.color">\r
                          <span class="material-icons-round chip-icon">{{ filter.icon }}</span>\r
                          {{ filter.label }}\r
                          <span class="chip-count">{{ allAccounts().filter(a => a.accountType === filter.value).length }}</span>\r
                        </button>\r
                      }\r
                    </div>\r
                    <div class="search-box">\r
                      <span class="material-icons-round">search</span>\r
                      <input type="text" [ngModel]="accSearchQuery()" (ngModelChange)="accSearchQuery.set($event)" placeholder="\u0628\u062D\u062B...">\r
                    </div>\r
                  </div>\r
                  <div class="accounts-grid">\r
                    @for (acc of accFiltered(); track acc.id) {\r
                      <button class="account-item" [class.selected]="(cfgTab.config?.accountIds || []).includes(acc.id)"\r
                        (click)="toggleConfigWizardTabAccount(configWizardTabs().indexOf(cfgTab), acc.id)">\r
                        <span class="material-icons-round acc-icon" [style.color]="getAccTypeMeta(acc.accountType).color">{{ getAccTypeMeta(acc.accountType).icon }}</span>\r
                        <span class="acc-name">{{ acc.name }}</span>\r
                        <span class="acc-type-label">{{ getAccTypeMeta(acc.accountType).label }}</span>\r
                        @if ((cfgTab.config?.accountIds || []).includes(acc.id)) {\r
                          <span class="material-icons-round check">check_circle</span>\r
                        }\r
                      </button>\r
                    }\r
                  </div>\r
                  <p class="selected-count">\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 {{ (cfgTab.config?.accountIds || []).length }} \u062D\u0633\u0627\u0628</p>\r
                }\r
                @if (cfgTab.type === 'inventory') {\r
                  <h4>\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0623\u0635\u0646\u0627\u0641</h4>\r
                  <p class="config-hint">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0627\u0644\u062A\u064A \u062A\u0631\u064A\u062F \u0645\u0631\u0627\u0642\u0628\u0629 \u0623\u0635\u0646\u0627\u0641\u0647\u0627</p>\r
                  @if (inventoryWarehouses().length === 0) {\r
                    <div class="empty-config">\r
                      <span class="material-icons-round">warehouse</span>\r
                      <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0632\u0646. \u0623\u0636\u0641 \u0645\u062E\u0627\u0632\u0646 \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u062E\u0627\u0632\u0646.</p>\r
                    </div>\r
                  } @else {\r
                    <div class="accounts-grid">\r
                      @for (wh of inventoryWarehouses(); track wh.id) {\r
                        <button class="account-item" [class.selected]="(cfgTab.config?.warehouseIds || []).includes(wh.id)"\r
                          (click)="toggleConfigWizardTabWarehouse(configWizardTabs().indexOf(cfgTab), wh.id)">\r
                          <span class="material-icons-round acc-icon" style="color: #0ea5e9">warehouse</span>\r
                          <span class="acc-name">{{ wh.name }}</span>\r
                          @if (wh.compositeCode) {\r
                            <span class="acc-type-label">{{ wh.compositeCode }}</span>\r
                          }\r
                          @if ((cfgTab.config?.warehouseIds || []).includes(wh.id)) {\r
                            <span class="material-icons-round check">check_circle</span>\r
                          }\r
                        </button>\r
                      }\r
                    </div>\r
                    <p class="selected-count">\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 {{ (cfgTab.config?.warehouseIds || []).length }} \u0645\u062E\u0632\u0646</p>\r
                  }\r
                }\r
              </div>\r
            }\r
          }\r
\r
          @if (configWizardStep() === getConfigWizardTotalSteps()) {\r
            <div class="wizard-step step-preview">\r
              <div class="preview-tabs">\r
                @for (tab of configWizardTabs(); track tab.id) {\r
                  <div class="preview-tab" [style.border-bottom-color]="tab.color">\r
                    <span class="material-icons-round" [style.color]="tab.color">{{ tab.icon }}</span>\r
                    <span>{{ tab.label }}</span>\r
                    <small>({{ getTabTypeInfo(tab.type).label }})</small>\r
                  </div>\r
                }\r
              </div>\r
              <p class="preview-summary-text">\u0633\u064A\u062A\u0645 \u062D\u0641\u0638 {{ configWizardTabs().length }} \u062A\u0628\u0648\u064A\u0628</p>\r
            </div>\r
          }\r
        </div>\r
        <div class="modal-footer">\r
          @if (configWizardStep() > 1) {\r
            <button class="btn btn-ghost" (click)="prevConfigWizardStep()"><span class="material-icons-round">arrow_forward</span> \u0627\u0644\u0633\u0627\u0628\u0642</button>\r
          }\r
          <div class="spacer"></div>\r
          <button class="btn btn-primary" (click)="nextConfigWizardStep()" [disabled]="saving()">\r
            @if (configWizardStep() === getConfigWizardTotalSteps()) {\r
              <span class="material-icons-round">check</span> {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : '\u062D\u0641\u0638' }}\r
            } @else {\r
              \u0627\u0644\u062A\u0627\u0644\u064A <span class="material-icons-round">arrow_back</span>\r
            }\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ======================== SCREEN FORM MODAL ======================== -->\r
  @if (showScreenForm()) {\r
    <div class="modal-overlay" (click)="closeScreenForm()">\r
      <div class="modal-content" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0634\u0627\u0634\u0629</h3>\r
          <button class="btn-icon" (click)="closeScreenForm()"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-group"><label>\u0627\u0633\u0645 \u0627\u0644\u0634\u0627\u0634\u0629</label><input type="text" [ngModel]="screenForm().name" (ngModelChange)="screenForm.set({...screenForm(), name: $event})"></div>\r
          <div class="form-group"><label>\u0627\u0644\u0648\u0635\u0641</label><textarea [ngModel]="screenForm().description" (ngModelChange)="screenForm.set({...screenForm(), description: $event})" rows="2"></textarea></div>\r
          <div class="form-group"><label>\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
            <div class="icon-grid compact">\r
              @for (icon of icons; track icon) {\r
                <button class="icon-option sm" [class.selected]="screenForm().icon === icon" (click)="screenForm.set({...screenForm(), icon})"><span class="material-icons-round">{{ icon }}</span></button>\r
              }\r
            </div>\r
          </div>\r
          <div class="form-group"><label>\u0627\u0644\u0644\u0648\u0646</label>\r
            <div class="color-grid compact">\r
              @for (color of colors; track color) {\r
                <button class="color-option sm" [class.selected]="screenForm().color === color" [style.background]="color" (click)="screenForm.set({...screenForm(), color})"></button>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn btn-ghost" (click)="closeScreenForm()">\u0625\u0644\u063A\u0627\u0621</button>\r
          <button class="btn btn-primary" (click)="saveScreen()" [disabled]="saving()">{{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : '\u062D\u0641\u0638' }}</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ======================== PERMISSIONS MODAL ======================== -->\r
  @if (showPermissionsModal()) {\r
    <div class="modal-overlay" (click)="closePermissionsModal()">\r
      <div class="modal-content" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0634\u0627\u0634\u0629: {{ permissionsScreen()?.name }}</h3>\r
          <button class="btn-icon" (click)="closePermissionsModal()"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          @if (permissionsLoading()) {\r
            <div class="loading-inline"><div class="spinner sm"></div> \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</div>\r
          } @else {\r
            <div class="permissions-list">\r
              @for (user of permissionsUsers(); track user.id) {\r
                <div class="permission-row">\r
                  <span class="user-name">{{ user.fullName || user.username }}</span>\r
                  <select [ngModel]="getUserPermission(user.id)" (ngModelChange)="setUserPermission(user.id, $event)">\r
                    <option value="none">\u0628\u062F\u0648\u0646 \u0635\u0644\u0627\u062D\u064A\u0629</option>\r
                    <option value="view">\u0639\u0631\u0636 \u0641\u0642\u0637</option>\r
                    <option value="execute">\u0639\u0631\u0636 \u0648\u062A\u0646\u0641\u064A\u0630</option>\r
                  </select>\r
                </div>\r
              }\r
            </div>\r
          }\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn btn-ghost" (click)="closePermissionsModal()">\u0625\u0644\u063A\u0627\u0621</button>\r
          <button class="btn btn-primary" (click)="savePermissions()" [disabled]="saving()">{{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : '\u062D\u0641\u0638' }}</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ======================== TEMPLATES MODAL ======================== -->\r
  @if (showTemplatesModal()) {\r
    <div class="modal-overlay" (click)="showTemplatesModal.set(false)">\r
      <div class="modal-content modal-lg" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>\u0642\u0648\u0627\u0644\u0628 \u0634\u0627\u0634\u0627\u062A \u062C\u0627\u0647\u0632\u0629</h3>\r
          <button class="btn-icon" (click)="showTemplatesModal.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <p class="templates-desc">\u0627\u062E\u062A\u0631 \u0642\u0627\u0644\u0628\u0627\u064B \u0644\u0625\u0646\u0634\u0627\u0621 \u0634\u0627\u0634\u0629 \u0628\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0645\u0639\u062F\u0629 \u0645\u0633\u0628\u0642\u0627\u064B</p>\r
          <div class="templates-grid">\r
            @for (preset of screenPresets; track preset.name) {\r
              <div class="template-card" (click)="applyPreset(preset)">\r
                <div class="template-icon" [style.background]="preset.color">\r
                  <span class="material-icons-round">{{ preset.icon }}</span>\r
                </div>\r
                <div class="template-info">\r
                  <strong>{{ preset.name }}</strong>\r
                  <small>{{ preset.description }}</small>\r
                  <div class="template-tabs">\r
                    @for (t of preset.tabs; track t.type) {\r
                      <span class="mini-tab" [style.background]="t.color + '20'" [style.color]="t.color">\r
                        <span class="material-icons-round">{{ t.icon }}</span> {{ t.label }}\r
                      </span>\r
                    }\r
                  </div>\r
                </div>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ======================== SIDEBAR MODAL ======================== -->\r
  @if (showSidebarModal()) {\r
    <div class="modal-overlay" (click)="closeSidebarModal()">\r
      <div class="modal-content" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <h3>\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629</h3>\r
          <button class="btn-icon" (click)="closeSidebarModal()"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-group"><label>\u0627\u0644\u0642\u0633\u0645</label>\r
            <select [ngModel]="selectedSidebarSection()" (ngModelChange)="selectedSidebarSection.set(+$event)">\r
              @for (section of sidebarSections(); track section.id) {\r
                <option [value]="section.id">{{ section.name }}</option>\r
              }\r
            </select>\r
          </div>\r
          <div class="form-group"><label>\u0627\u0644\u062A\u0631\u062A\u064A\u0628</label><input type="number" [ngModel]="sidebarSortOrder()" (ngModelChange)="sidebarSortOrder.set(+$event)" min="0"></div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn btn-ghost" (click)="closeSidebarModal()">\u0625\u0644\u063A\u0627\u0621</button>\r
          <button class="btn btn-primary" (click)="addToSidebar()" [disabled]="saving()">{{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0636\u0627\u0641\u0629...' : '\u0625\u0636\u0627\u0641\u0629' }}</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
</div>\r
`, styles: ['/* src/app/pages/custom-screens/custom-screens.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n:host {\n  display: block;\n  height: 100%;\n}\n.custom-screens-page {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  direction: rtl;\n  font-family: "Tajawal", sans-serif;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes fadeInScale {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes shimmer {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n@keyframes float {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-8px);\n  }\n}\n.loading-overlay {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px;\n  gap: 20px;\n  color: var(--text-secondary);\n}\n.loading-overlay .spinner {\n  width: 48px;\n  height: 48px;\n  border: 3px solid rgba(59, 130, 246, 0.15);\n  border-top-color: #3b82f6;\n  border-right-color: #6366f1;\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n  filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.5));\n}\n.loading-overlay .spinner.sm {\n  width: 22px;\n  height: 22px;\n  border-width: 2px;\n}\n.loading-inline {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 20px;\n  color: var(--text-secondary);\n}\n.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 14px;\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  white-space: nowrap;\n  position: relative;\n  overflow: hidden;\n}\n.btn .material-icons-round {\n  font-size: 18px;\n}\n.btn-primary {\n  background:\n    linear-gradient(\n      145deg,\n      #5b9af8,\n      #6366f1);\n  color: white;\n  box-shadow:\n    0 2.4px 7.2px rgba(59, 130, 246, 0.2),\n    0 7.2px 21.6px rgba(59, 130, 246, 0.18),\n    0 16.8px 48px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.btn-primary::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.3),\n      transparent);\n  border-radius: inherit;\n  pointer-events: none;\n  z-index: 1;\n}\n.btn-primary:hover {\n  transform: translateY(-4px);\n  box-shadow:\n    0 0 20px rgba(59, 130, 246, 0.5),\n    0 0 60px rgba(59, 130, 246, 0.15),\n    0 8px 30px rgba(0, 0, 0, 0.15);\n  filter: brightness(1.08);\n}\n.btn-primary:active {\n  transform: translateY(1px);\n  filter: brightness(0.95);\n}\n.btn-primary:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n  filter: none;\n}\n.btn-ghost {\n  background: transparent;\n  color: var(--text-secondary);\n}\n.btn-ghost:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n}\n.btn-sm {\n  padding: 8px 16px;\n  font-size: 12px;\n}\n.btn-sm .material-icons-round {\n  font-size: 16px;\n}\n.btn-lg {\n  padding: 16px 32px;\n  font-size: 16px;\n  width: 100%;\n  justify-content: center;\n  border-radius: 18px;\n}\n.btn-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 42px;\n  height: 42px;\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.btn-icon .material-icons-round {\n  font-size: 20px;\n}\n.btn-icon:hover {\n  background: var(--bg-card-hover);\n  color: #3b82f6;\n  border-color: rgba(59, 130, 246, 0.3);\n  transform: translateY(-3px) scale(1.08);\n  box-shadow:\n    0 1.6px 4.8px rgba(59, 130, 246, 0.2),\n    0 4.8px 14.4px rgba(59, 130, 246, 0.18),\n    0 11.2px 32px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.btn-icon.danger:hover {\n  color: #ef4444;\n  border-color: rgba(239, 68, 68, 0.3);\n  box-shadow:\n    0 1.6px 4.8px rgba(239, 68, 68, 0.2),\n    0 4.8px 14.4px rgba(239, 68, 68, 0.18),\n    0 11.2px 32px rgba(239, 68, 68, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.btn-icon.sm {\n  width: 34px;\n  height: 34px;\n  border: none;\n  background: transparent;\n  box-shadow: none;\n}\n.btn-icon.sm .material-icons-round {\n  font-size: 16px;\n}\n.btn-icon:disabled {\n  opacity: 0.3;\n  cursor: not-allowed;\n}\n.form-group {\n  margin-bottom: 20px;\n}\n.form-group label {\n  display: block;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  margin-bottom: 8px;\n  letter-spacing: 0.3px;\n}\n.form-group input[type=text],\n.form-group input[type=number],\n.form-group input[type=date],\n.form-group textarea,\n.form-group select {\n  width: 100%;\n  padding: 13px 18px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 10px;\n  font-family: inherit;\n  font-size: 14px;\n  color: var(--text-primary);\n  background: var(--bg-input);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-sizing: border-box;\n  box-shadow:\n    0 0.2px 0.4px rgba(0, 0, 0, 0.06),\n    0 0.6px 1.2px rgba(0, 0, 0, 0.08),\n    0 1.6px 4px rgba(0, 0, 0, 0.1),\n    0 3.2px 8px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.form-group input[type=text]:focus,\n.form-group input[type=number]:focus,\n.form-group input[type=date]:focus,\n.form-group textarea:focus,\n.form-group select:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow:\n    0 1px 3px rgba(59, 130, 246, 0.2),\n    0 3px 9px rgba(59, 130, 246, 0.18),\n    0 7px 20px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.form-group input[type=text]::placeholder,\n.form-group input[type=number]::placeholder,\n.form-group input[type=date]::placeholder,\n.form-group textarea::placeholder,\n.form-group select::placeholder {\n  color: var(--text-faint);\n}\n.form-group textarea {\n  resize: vertical;\n}\n.form-row {\n  display: flex;\n  gap: 20px;\n}\n.form-row .form-group {\n  flex: 1;\n}\n.list-view {\n  padding: 30px 40px;\n  animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.list-view .page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 40px;\n}\n.list-view .page-header .header-right {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.list-view .page-header .header-right .header-icon {\n  font-size: 36px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #a855f7);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4));\n  animation: float 4s ease-in-out infinite;\n}\n.list-view .page-header .header-right h2 {\n  font-size: 28px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0;\n}\n.list-view .page-header .header-right .badge {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.12),\n      rgba(99, 102, 241, 0.12));\n  color: #3b82f6;\n  padding: 6px 18px;\n  border-radius: 24px;\n  font-size: 14px;\n  font-weight: 800;\n  border: 1.5px solid rgba(59, 130, 246, 0.2);\n}\n.empty-state h3 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 20px 0 8px;\n}\n.empty-state p {\n  color: var(--text-muted);\n  font-size: 15px;\n  margin: 0 0 28px;\n}\n.screens-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  gap: 24px;\n}\n.screen-card {\n  position: relative;\n  overflow: hidden;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  backface-visibility: hidden;\n  border-radius: 18px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  box-shadow:\n    0 1.2px 2.4px rgba(0, 0, 0, 0.06),\n    0 3.6px 7.2px rgba(0, 0, 0, 0.08),\n    0 9.6px 24px rgba(0, 0, 0, 0.1),\n    0 19.2px 48px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.screen-card::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 50%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.06),\n      transparent);\n  transition: left 0.7s ease;\n  pointer-events: none;\n  z-index: 1;\n}\n.screen-card:hover::after {\n  left: 120%;\n}\n.screen-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 5px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 5%,\n      var(--card-color, #3b82f6) 30%,\n      var(--card-color, #3b82f6) 70%,\n      transparent 95%);\n  border-radius: 18px 18px 0 0;\n  z-index: 2;\n  transition: all 0.4s;\n}\n.screen-card:hover {\n  transform: translateY(-10px) scale(1.02);\n  box-shadow:\n    0 2.5px 5px rgba(0, 0, 0, 0.06),\n    0 7.5px 15px rgba(0, 0, 0, 0.08),\n    0 20px 50px rgba(0, 0, 0, 0.1),\n    0 40px 100px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  border-color: rgba(0, 0, 0, 0.08);\n}\n.screen-card:hover::before {\n  height: 6px;\n  box-shadow: 0 4px 20px var(--card-color, #3b82f6);\n}\n.screen-card .card-header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 24px 22px 16px;\n  cursor: pointer;\n}\n.screen-card .card-header .card-icon {\n  width: 56px;\n  height: 56px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  position: relative;\n  box-shadow:\n    0 3px 9px rgba(59, 130, 246, 0.2),\n    0 9px 27px rgba(59, 130, 246, 0.18),\n    0 21px 60px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.screen-card .card-header .card-icon::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(255, 255, 255, 0.35),\n      transparent);\n  border-radius: 14px 14px 50% 50%;\n  pointer-events: none;\n}\n.screen-card .card-header .card-icon .material-icons-round {\n  font-size: 28px;\n  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));\n}\n.screen-card .card-header .card-info {\n  flex: 1;\n}\n.screen-card .card-header .card-info h3 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.screen-card .card-header .card-info p {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: 0;\n}\n.screen-card .card-actions {\n  display: flex;\n  gap: 8px;\n  padding: 12px 22px 18px;\n  border-top: 1px solid var(--border-color);\n}\n.wizard-view {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.wizard-view .wizard-header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 30px;\n  border-bottom: 1px solid var(--border-color);\n  background: var(--bg-card);\n  box-shadow:\n    0 0.6px 1.2px rgba(0, 0, 0, 0.06),\n    0 1.8px 3.6px rgba(0, 0, 0, 0.08),\n    0 4.8px 12px rgba(0, 0, 0, 0.1),\n    0 9.6px 24px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.wizard-view .wizard-header h2 {\n  font-size: 20px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0;\n  flex: 1;\n}\n.wizard-view .wizard-header .wizard-progress {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.wizard-view .wizard-header .wizard-progress .progress-bar {\n  width: 160px;\n  height: 8px;\n  background: var(--bg-surface);\n  border-radius: 6px;\n  overflow: hidden;\n}\n.wizard-view .wizard-header .wizard-progress .progress-bar .progress-fill {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6,\n      #6366f1,\n      #a855f7);\n  background-size: 200% 100%;\n  animation: shimmer 2s linear infinite;\n  border-radius: 6px;\n  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n  box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);\n}\n.wizard-view .wizard-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 32px;\n  animation: fadeInScale 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.wizard-view .wizard-footer {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 18px 30px;\n  border-top: 1px solid var(--border-color);\n  background: var(--bg-card);\n}\n.wizard-view .wizard-footer .spacer {\n  flex: 1;\n}\n.wizard-section {\n  margin-bottom: 32px;\n}\n.wizard-section h3 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0 0 20px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.wizard-section h3 .material-icons-round {\n  color: #3b82f6;\n  font-size: 22px;\n}\n.step-title {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0 0 8px;\n}\n.step-desc {\n  color: var(--text-muted);\n  font-size: 14px;\n  margin: 0 0 24px;\n}\n.subsection-title {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 28px 0 16px;\n}\n.tab-types-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 14px;\n}\n.tab-type-card {\n  position: relative;\n  overflow: hidden;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  backface-visibility: hidden;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  padding: 28px 16px;\n  border: 2px solid var(--border-color);\n  border-radius: 18px;\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  font-family: inherit;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  box-shadow:\n    0 0.5px 1px rgba(0, 0, 0, 0.06),\n    0 1.5px 3px rgba(0, 0, 0, 0.08),\n    0 4px 10px rgba(0, 0, 0, 0.1),\n    0 8px 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.tab-type-card .material-icons-round {\n  font-size: 36px;\n  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n  filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.15));\n}\n.tab-type-card .add-icon {\n  font-size: 18px;\n  color: var(--text-muted);\n}\n.tab-type-card small {\n  font-size: 11px;\n  color: var(--text-muted);\n  text-align: center;\n}\n.tab-type-card:hover {\n  border-color: rgba(59, 130, 246, 0.3);\n  color: #3b82f6;\n  transform: translateY(-8px) scale(1.04);\n  box-shadow:\n    0 3px 9px rgba(59, 130, 246, 0.2),\n    0 9px 27px rgba(59, 130, 246, 0.18),\n    0 21px 60px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.tab-type-card:hover .material-icons-round:first-child {\n  transform: scale(1.2) translateY(-4px);\n  filter: drop-shadow(0 0 14px currentColor);\n}\n.tab-type-card.selected {\n  border-color: #3b82f6;\n  color: #3b82f6;\n  background: rgba(59, 130, 246, 0.06);\n  box-shadow:\n    0 2.4px 7.2px rgba(59, 130, 246, 0.2),\n    0 7.2px 21.6px rgba(59, 130, 246, 0.18),\n    0 16.8px 48px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.added-tabs-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.added-tab-item {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 20px;\n  border: 1.5px solid var(--border-color);\n  border-right: 4px solid;\n  border-radius: 14px;\n  background: var(--bg-card);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.4px 0.8px rgba(0, 0, 0, 0.06),\n    0 1.2px 2.4px rgba(0, 0, 0, 0.08),\n    0 3.2px 8px rgba(0, 0, 0, 0.1),\n    0 6.4px 16px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.added-tab-item:hover {\n  box-shadow:\n    0 0.8px 1.6px rgba(0, 0, 0, 0.06),\n    0 2.4px 4.8px rgba(0, 0, 0, 0.08),\n    0 6.4px 16px rgba(0, 0, 0, 0.1),\n    0 12.8px 32px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  transform: translateX(-4px);\n}\n.added-tab-item .tab-item-info {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n}\n.added-tab-item .tab-item-info .material-icons-round {\n  font-size: 24px;\n}\n.added-tab-item .tab-item-info .tab-name-input {\n  border: none;\n  background: transparent;\n  font-family: inherit;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n  padding: 4px 8px;\n  border-radius: 6px;\n}\n.added-tab-item .tab-item-info .tab-name-input:focus {\n  outline: none;\n  background: var(--bg-surface);\n}\n.added-tab-item .tab-item-info .tab-type-badge {\n  font-size: 11px;\n  font-weight: 700;\n  display: block;\n  margin-top: 2px;\n}\n.added-tab-item .tab-item-actions {\n  display: flex;\n  gap: 6px;\n}\n.op-types-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.op-type-item {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 20px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.op-type-item:hover {\n  box-shadow:\n    0 0.6px 1.2px rgba(0, 0, 0, 0.06),\n    0 1.8px 3.6px rgba(0, 0, 0, 0.08),\n    0 4.8px 12px rgba(0, 0, 0, 0.1),\n    0 9.6px 24px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  border-color: var(--border-strong);\n  transform: translateX(-3px);\n}\n.op-type-item.selected {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.05);\n  box-shadow:\n    0 1px 3px rgba(59, 130, 246, 0.2),\n    0 3px 9px rgba(59, 130, 246, 0.18),\n    0 7px 20px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.op-type-item .material-icons-round {\n  font-size: 22px;\n}\n.op-type-item .op-name {\n  flex: 1;\n  font-weight: 700;\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.op-type-item .check {\n  color: #22c55e;\n}\n.accounts-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 12px;\n}\n.account-select-item,\n.account-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 18px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 14px;\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.2px 0.4px rgba(0, 0, 0, 0.06),\n    0 0.6px 1.2px rgba(0, 0, 0, 0.08),\n    0 1.6px 4px rgba(0, 0, 0, 0.1),\n    0 3.2px 8px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  font-family: inherit;\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.account-select-item:hover,\n.account-item:hover {\n  box-shadow:\n    0 0.5px 1px rgba(0, 0, 0, 0.06),\n    0 1.5px 3px rgba(0, 0, 0, 0.08),\n    0 4px 10px rgba(0, 0, 0, 0.1),\n    0 8px 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  border-color: var(--border-strong);\n}\n.account-select-item.selected,\n.account-item.selected {\n  border-color: #22c55e;\n  background: rgba(34, 197, 94, 0.05);\n  box-shadow:\n    0 0.8px 2.4px rgba(34, 197, 94, 0.2),\n    0 2.4px 7.2px rgba(34, 197, 94, 0.18),\n    0 5.6px 16px rgba(34, 197, 94, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.account-select-item .material-icons-round,\n.account-select-item .acc-icon,\n.account-item .material-icons-round,\n.account-item .acc-icon {\n  font-size: 22px;\n}\n.account-select-item .acc-name,\n.account-item .acc-name {\n  flex: 1;\n  font-weight: 600;\n}\n.account-select-item .acc-type-label,\n.account-item .acc-type-label {\n  font-size: 11px;\n  color: var(--text-muted);\n  font-weight: 600;\n}\n.account-select-item .acc-balance,\n.account-item .acc-balance {\n  font-size: 12px;\n  color: var(--text-muted);\n  font-weight: 700;\n}\n.account-select-item .check,\n.account-item .check {\n  color: #22c55e;\n}\n.selected-count {\n  margin-top: 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.accounts-filter-bar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-bottom: 18px;\n  align-items: center;\n}\n.accounts-filter-bar .filter-chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.accounts-filter-bar .search-box {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 220px;\n  padding: 10px 16px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--bg-input);\n  box-shadow:\n    0 0.2px 0.4px rgba(0, 0, 0, 0.06),\n    0 0.6px 1.2px rgba(0, 0, 0, 0.08),\n    0 1.6px 4px rgba(0, 0, 0, 0.1),\n    0 3.2px 8px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.accounts-filter-bar .search-box .material-icons-round {\n  font-size: 18px;\n  color: var(--text-muted);\n}\n.accounts-filter-bar .search-box input {\n  border: none;\n  background: transparent;\n  font-family: inherit;\n  font-size: 13px;\n  color: var(--text-primary);\n  flex: 1;\n}\n.accounts-filter-bar .search-box input:focus {\n  outline: none;\n}\n.accounts-filter-bar .filter-chip {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 24px;\n  background: var(--bg-card);\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.accounts-filter-bar .filter-chip .chip-icon {\n  font-size: 16px;\n}\n.accounts-filter-bar .filter-chip .chip-count {\n  font-size: 11px;\n  opacity: 0.7;\n}\n.accounts-filter-bar .filter-chip:hover {\n  border-color: rgba(59, 130, 246, 0.3);\n  color: #3b82f6;\n  transform: translateY(-2px);\n}\n.accounts-filter-bar .filter-chip.active {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  border-color: transparent;\n  box-shadow:\n    0 1.6px 4.8px rgba(59, 130, 246, 0.2),\n    0 4.8px 14.4px rgba(59, 130, 246, 0.18),\n    0 11.2px 32px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.preview-card {\n  border-radius: 18px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  padding: 28px;\n  box-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.06),\n    0 3px 6px rgba(0, 0, 0, 0.08),\n    0 8px 20px rgba(0, 0, 0, 0.1),\n    0 16px 40px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.preview-card .preview-header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n  padding-bottom: 18px;\n  border-bottom: 1px solid var(--border-color);\n}\n.preview-card .preview-header .preview-icon {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  position: relative;\n  box-shadow:\n    0 1.2px 2.4px rgba(0, 0, 0, 0.06),\n    0 3.6px 7.2px rgba(0, 0, 0, 0.08),\n    0 9.6px 24px rgba(0, 0, 0, 0.1),\n    0 19.2px 48px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.preview-card .preview-header .preview-icon::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.3),\n      transparent);\n  border-radius: inherit;\n  pointer-events: none;\n  z-index: 1;\n}\n.preview-card .preview-header .preview-icon .material-icons-round {\n  font-size: 26px;\n}\n.preview-card .preview-header h3 {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0;\n}\n.preview-card .preview-tabs {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.preview-card .preview-tabs .preview-tab {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 10px;\n  background: rgba(59, 130, 246, 0.08);\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.preview-card .preview-tabs .preview-tab .material-icons-round {\n  font-size: 16px;\n}\n.preview-card .preview-summary-text {\n  margin-top: 16px;\n  font-size: 14px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.icon-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.icon-grid.compact {\n  gap: 6px;\n}\n.icon-option {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1.5px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  font-family: inherit;\n}\n.icon-option .material-icons-round {\n  font-size: 22px;\n}\n.icon-option:hover {\n  border-color: #3b82f6;\n  color: #3b82f6;\n  transform: scale(1.1);\n}\n.icon-option.selected {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n  box-shadow:\n    0 1px 3px rgba(59, 130, 246, 0.2),\n    0 3px 9px rgba(59, 130, 246, 0.18),\n    0 7px 20px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.icon-option.sm {\n  width: 36px;\n  height: 36px;\n}\n.icon-option.sm .material-icons-round {\n  font-size: 18px;\n}\n.color-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.color-grid.compact {\n  gap: 6px;\n}\n.color-option {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  cursor: pointer;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.color-option:hover {\n  transform: scale(1.2);\n}\n.color-option.selected {\n  border-color: var(--text-primary);\n  transform: scale(1.15);\n  box-shadow:\n    0 0.8px 1.6px rgba(0, 0, 0, 0.06),\n    0 2.4px 4.8px rgba(0, 0, 0, 0.08),\n    0 6.4px 16px rgba(0, 0, 0, 0.1),\n    0 12.8px 32px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.color-option.sm {\n  width: 28px;\n  height: 28px;\n}\n.custom-color {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 10px;\n}\n.custom-color input {\n  flex: 1;\n}\n.custom-color .color-preview {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n}\n.sidebar-option .checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n  font-weight: 700;\n}\n.sidebar-option .checkbox-label input[type=checkbox] {\n  width: 18px;\n  height: 18px;\n  accent-color: #3b82f6;\n}\n.sidebar-option .sidebar-config {\n  display: flex;\n  gap: 12px;\n  margin-top: 12px;\n}\n.sidebar-option .sidebar-config select,\n.sidebar-option .sidebar-config input {\n  flex: 1;\n}\n.tab-config-header {\n  margin-bottom: 24px;\n}\n.tab-config-header .tab-preview {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border: 2px solid;\n  border-radius: 14px;\n  font-weight: 800;\n  font-size: 15px;\n  margin-bottom: 16px;\n}\n.tab-config-header .tab-preview .material-icons-round {\n  font-size: 20px;\n}\n.tab-config-header .mini-config {\n  margin-top: 12px;\n}\n.screen-view {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.screen-view .screen-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 30px;\n  background: var(--card-bg);\n  border-bottom: 1px solid var(--border-color);\n  position: relative;\n  z-index: 2;\n  box-shadow:\n    0 4px 12px rgba(0, 0, 0, 0.06),\n    0 8px 30px rgba(0, 0, 0, 0.08),\n    0 16px 50px rgba(0, 0, 0, 0.04);\n}\n.screen-view .screen-header::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 3%;\n  right: 3%;\n  height: 4px;\n  background: var(--screen-color, #3b82f6);\n  border-radius: 4px;\n  box-shadow:\n    0 0 8px var(--screen-color, #3b82f6),\n    0 0 20px var(--screen-color, #3b82f6),\n    0 2px 12px rgba(0, 0, 0, 0.1);\n  opacity: 0.85;\n}\n.screen-view .screen-header .header-right {\n  display: flex;\n  align-items: center;\n  gap: 18px;\n}\n.screen-view .screen-header .header-right .screen-title-icon {\n  width: 56px;\n  height: 56px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  position: relative;\n  box-shadow:\n    0 4px 12px rgba(0, 0, 0, 0.15),\n    0 8px 24px rgba(0, 0, 0, 0.12),\n    0 0 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.25);\n}\n.screen-view .screen-header .header-right .screen-title-icon::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(255, 255, 255, 0.45),\n      transparent);\n  border-radius: 14px 14px 50% 50%;\n  pointer-events: none;\n}\n.screen-view .screen-header .header-right .screen-title-icon .material-icons-round {\n  font-size: 28px;\n  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4));\n  position: relative;\n  z-index: 1;\n}\n.screen-view .screen-header .header-right h2 {\n  font-size: 26px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0;\n  letter-spacing: -0.3px;\n}\n.screen-view .screen-header .header-actions {\n  display: flex;\n  gap: 10px;\n}\n.tabs-bar {\n  display: flex;\n  gap: 10px;\n  padding: 16px 28px;\n  background: var(--bg-card);\n  border-bottom: 1px solid var(--border-color);\n  overflow-x: auto;\n  position: relative;\n  z-index: 1;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.03);\n}\n.tabs-bar::-webkit-scrollbar {\n  height: 0;\n}\n.tab-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px 26px;\n  border: 2px solid transparent;\n  border-radius: 50px;\n  background: transparent;\n  font-family: inherit;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  white-space: nowrap;\n  position: relative;\n}\n.tab-btn .material-icons-round {\n  font-size: 20px;\n  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.tab-btn:hover {\n  color: var(--text-primary);\n  background: var(--bg-surface);\n  border-color: var(--border-color);\n  transform: translateY(-3px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n}\n.tab-btn:hover .material-icons-round {\n  transform: scale(1.15);\n}\n.tab-btn.active {\n  color: white;\n  border-color: transparent;\n  box-shadow:\n    0 4px 12px rgba(0, 0, 0, 0.12),\n    0 8px 24px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.tab-btn.active::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(255, 255, 255, 0.22),\n      transparent);\n  border-radius: 50px 50px 0 0;\n  pointer-events: none;\n}\n.tab-btn.active .material-icons-round {\n  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));\n  transform: scale(1.1);\n}\n.tab-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 28px 30px;\n  animation: fadeInScale 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.empty-tab {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 14px;\n  padding: 70px;\n  color: var(--text-muted);\n  text-align: center;\n}\n.empty-tab .material-icons-round {\n  font-size: 70px;\n  animation: float 3s ease-in-out infinite;\n  opacity: 0.3;\n  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));\n}\n.empty-tab p {\n  margin: 0;\n  font-size: 15px;\n}\n.op-buttons-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 24px;\n}\n.op-button {\n  position: relative;\n  overflow: hidden;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  backface-visibility: hidden;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 18px;\n  padding: 40px 20px;\n  border: none;\n  border-radius: 18px;\n  background: var(--card-bg);\n  cursor: pointer;\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  font-family: inherit;\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n  box-shadow:\n    0 2px 6px rgba(0, 0, 0, 0.06),\n    0 6px 18px rgba(0, 0, 0, 0.08),\n    0 14px 40px rgba(0, 0, 0, 0.06),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.op-button::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 15%;\n  right: 15%;\n  height: 4px;\n  background: var(--op-color, #3b82f6);\n  border-radius: 0 0 4px 4px;\n  opacity: 0.6;\n  transition: all 0.4s;\n  z-index: 2;\n}\n.op-button .material-icons-round {\n  font-size: 52px;\n  color: var(--op-color, #3b82f6);\n  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.15));\n  z-index: 1;\n}\n.op-button span:last-child {\n  z-index: 1;\n  letter-spacing: 0.3px;\n}\n.op-button:hover {\n  transform: translateY(-14px) scale(1.06) rotateX(4deg);\n  box-shadow:\n    0 8px 20px rgba(0, 0, 0, 0.1),\n    0 20px 50px rgba(0, 0, 0, 0.12),\n    0 30px 70px rgba(0, 0, 0, 0.06),\n    inset 0 1px 0 rgba(255, 255, 255, 0.1);\n}\n.op-button:hover::before {\n  opacity: 1;\n  left: 5%;\n  right: 5%;\n  height: 5px;\n  box-shadow: 0 4px 20px var(--op-color, #3b82f6);\n}\n.op-button:hover .material-icons-round {\n  transform: scale(1.3) translateY(-8px);\n  filter: drop-shadow(0 0 24px var(--op-color, #3b82f6));\n}\n.op-button:active {\n  transform: translateY(-4px) scale(0.98);\n  transition-duration: 0.1s;\n}\n.operation-form {\n  max-width: 720px;\n  animation: fadeInUp 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.operation-form .form-header {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 30px;\n}\n.operation-form .form-header h3 {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 24px;\n  font-weight: 900;\n  margin: 0;\n}\n.operation-form .form-header h3 .material-icons-round {\n  filter: drop-shadow(0 0 12px currentColor);\n}\n.entries-list {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  margin: 22px 0;\n}\n.entry-row {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 24px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 18px;\n  background: var(--bg-card);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.5px 1px rgba(0, 0, 0, 0.06),\n    0 1.5px 3px rgba(0, 0, 0, 0.08),\n    0 4px 10px rgba(0, 0, 0, 0.1),\n    0 8px 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.entry-row:hover {\n  box-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.06),\n    0 3px 6px rgba(0, 0, 0, 0.08),\n    0 8px 20px rgba(0, 0, 0, 0.1),\n    0 16px 40px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  border-color: rgba(59, 130, 246, 0.15);\n  transform: translateX(-4px);\n}\n.entry-row .entry-account {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.entry-row .entry-account .material-icons-round {\n  font-size: 24px;\n  color: var(--text-muted);\n  background: var(--bg-surface);\n  padding: 8px;\n  border-radius: 10px;\n}\n.entry-row .entry-account .balance-hint {\n  color: var(--text-muted);\n  font-size: 11px;\n  margin-right: 8px;\n  background: rgba(59, 130, 246, 0.06);\n  padding: 3px 10px;\n  border-radius: 20px;\n  font-weight: 600;\n}\n.entry-row .amount-input {\n  width: 180px;\n  padding: 16px 20px;\n  border: 2px solid var(--border-color);\n  border-radius: 14px;\n  font-family: inherit;\n  font-size: 20px;\n  text-align: center;\n  font-weight: 800;\n  color: var(--text-primary);\n  background: var(--bg-input);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.entry-row .amount-input:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow:\n    0 0 20px rgba(59, 130, 246, 0.3),\n    0 0 60px rgba(59, 130, 246, 0.09),\n    0 8px 30px rgba(0, 0, 0, 0.15);\n}\n.form-summary {\n  display: flex;\n  justify-content: space-between;\n  padding: 22px 28px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.04),\n      rgba(99, 102, 241, 0.04));\n  border: 2px solid rgba(59, 130, 246, 0.15);\n  border-radius: 18px;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 20px;\n  box-shadow:\n    0 1.6px 4.8px rgba(59, 130, 246, 0.2),\n    0 4.8px 14.4px rgba(59, 130, 246, 0.18),\n    0 11.2px 32px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.form-summary strong {\n  color: #3b82f6;\n  font-size: 22px;\n}\n.log-content .log-filters {\n  margin-bottom: 24px;\n}\n.log-content .log-filters .filter-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  align-items: center;\n}\n.log-content .log-filters .filter-row input[type=date],\n.log-content .log-filters .filter-row select {\n  padding: 12px 18px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 10px;\n  font-family: inherit;\n  font-size: 13px;\n  background: var(--bg-card);\n  color: var(--text-primary);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.log-content .log-filters .filter-row input[type=date]:focus,\n.log-content .log-filters .filter-row select:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow:\n    0 0.8px 2.4px rgba(59, 130, 246, 0.2),\n    0 2.4px 7.2px rgba(59, 130, 246, 0.18),\n    0 5.6px 16px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.log-content .log-filters .filter-row input[type=date] {\n  width: 180px;\n}\n.log-content .log-filters .filter-row select {\n  min-width: 170px;\n}\n.log-table-container {\n  overflow-x: auto;\n  border: 1.5px solid var(--border-color);\n  border-radius: 18px;\n  box-shadow:\n    0 1.2px 2.4px rgba(0, 0, 0, 0.06),\n    0 3.6px 7.2px rgba(0, 0, 0, 0.08),\n    0 9.6px 24px rgba(0, 0, 0, 0.1),\n    0 19.2px 48px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  background: var(--bg-card);\n}\n.log-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.log-table th {\n  padding: 18px 20px;\n  background: var(--bg-surface);\n  font-weight: 800;\n  color: var(--text-secondary);\n  text-align: right;\n  border-bottom: 2px solid var(--border-strong);\n  white-space: nowrap;\n  font-size: 12px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n}\n.log-table td {\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--border-color);\n  color: var(--text-primary);\n  transition: all 0.2s;\n}\n.log-table td.empty-row {\n  text-align: center;\n  color: var(--text-muted);\n  padding: 60px;\n}\n.log-table tr {\n  transition: all 0.25s;\n}\n.log-table tr:nth-child(even) td {\n  background: rgba(0, 0, 0, 0.015);\n}\n.log-table tr:hover td {\n  background: rgba(59, 130, 246, 0.04);\n}\n.log-table .amount {\n  font-weight: 800;\n  font-family: "Courier New", monospace;\n  font-size: 15px;\n}\n.log-table .amount.debit {\n  color: #ef4444;\n}\n.log-table .amount.credit {\n  color: #22c55e;\n}\n.voucher-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 6px 16px;\n  border-radius: 10px;\n  font-size: 11px;\n  font-weight: 800;\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.voucher-badge.receipt {\n  background: rgba(34, 197, 94, 0.1);\n  color: #22c55e;\n  border: 1.5px solid rgba(34, 197, 94, 0.2);\n}\n.voucher-badge.payment {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n  border: 1.5px solid rgba(239, 68, 68, 0.2);\n}\n.voucher-badge.journal {\n  background: rgba(99, 102, 241, 0.1);\n  color: #6366f1;\n  border: 1.5px solid rgba(99, 102, 241, 0.2);\n}\n.log-footer {\n  display: flex;\n  justify-content: flex-end;\n  padding: 16px 0;\n  font-size: 14px;\n  color: var(--text-secondary);\n  font-weight: 700;\n}\n.accounts-content .accounts-list {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 22px;\n}\n.account-card {\n  position: relative;\n  overflow: hidden;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  backface-visibility: hidden;\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  background: var(--card-bg);\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 2px 6px rgba(0, 0, 0, 0.06),\n    0 6px 18px rgba(0, 0, 0, 0.08),\n    0 14px 40px rgba(0, 0, 0, 0.06),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.account-card::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 50%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.06),\n      transparent);\n  transition: left 0.7s ease;\n  pointer-events: none;\n  z-index: 1;\n}\n.account-card:hover::after {\n  left: 120%;\n}\n.account-card:hover {\n  transform: translateY(-10px) rotateX(3deg);\n  box-shadow:\n    0 8px 20px rgba(0, 0, 0, 0.1),\n    0 20px 50px rgba(0, 0, 0, 0.12),\n    0 30px 70px rgba(0, 0, 0, 0.06),\n    inset 0 1px 0 rgba(255, 255, 255, 0.1);\n}\n.account-card .acc-card-header {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 22px 24px 16px;\n  border-bottom: 1px solid var(--border-color);\n}\n.account-card .acc-card-header .material-icons-round {\n  font-size: 32px;\n  padding: 10px;\n  border-radius: 14px;\n  background: rgba(0, 0, 0, 0.04);\n  filter: drop-shadow(0 4px 10px currentColor);\n}\n.account-card .acc-card-header .acc-card-info {\n  flex: 1;\n}\n.account-card .acc-card-header .acc-card-info strong {\n  display: block;\n  font-size: 17px;\n  color: var(--text-primary);\n  font-weight: 800;\n}\n.account-card .acc-card-header .acc-card-info small {\n  font-size: 12px;\n  color: var(--text-muted);\n  font-weight: 600;\n}\n.account-card .acc-card-header .acc-trend .material-icons-round {\n  font-size: 28px;\n  padding: 6px;\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.03);\n}\n.account-card .acc-card-balance {\n  padding: 20px 24px;\n}\n.account-card .acc-card-balance .balance-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 0;\n}\n.account-card .acc-card-balance .balance-row .currency {\n  font-size: 12px;\n  color: var(--text-muted);\n  font-weight: 800;\n  letter-spacing: 1.5px;\n  background: var(--bg-surface);\n  padding: 4px 12px;\n  border-radius: 6px;\n}\n.account-card .acc-card-balance .balance-row .balance-amount {\n  font-size: 28px;\n  font-weight: 900;\n  color: var(--text-primary);\n  font-family: "Courier New", monospace;\n  letter-spacing: -0.5px;\n}\n.account-card .acc-card-balance .balance-row .balance-amount.negative {\n  color: #ef4444;\n}\n.accounts-total {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 24px 30px;\n  margin-top: 28px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.06));\n  border: 2px solid rgba(59, 130, 246, 0.18);\n  border-radius: 18px;\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--text-primary);\n  box-shadow:\n    0 4px 12px rgba(59, 130, 246, 0.12),\n    0 8px 30px rgba(59, 130, 246, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.1);\n}\n.accounts-total strong {\n  font-size: 32px;\n  color: #3b82f6;\n  font-family: "Courier New", monospace;\n  letter-spacing: -0.5px;\n}\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 22px;\n}\n.stat-card {\n  position: relative;\n  overflow: hidden;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  backface-visibility: hidden;\n  display: flex;\n  align-items: center;\n  gap: 22px;\n  padding: 30px;\n  background: var(--bg-card);\n  border: none;\n  border-right: 5px solid #3b82f6;\n  border-radius: 18px;\n  box-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.06),\n    0 3px 6px rgba(0, 0, 0, 0.08),\n    0 8px 20px rgba(0, 0, 0, 0.1),\n    0 16px 40px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.stat-card:hover {\n  transform: translateY(-8px) rotateX(2deg);\n  box-shadow:\n    0 2px 4px rgba(0, 0, 0, 0.06),\n    0 6px 12px rgba(0, 0, 0, 0.08),\n    0 16px 40px rgba(0, 0, 0, 0.1),\n    0 32px 80px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  border-right-width: 6px;\n}\n.stat-card .material-icons-round {\n  font-size: 48px;\n  z-index: 1;\n  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));\n  background: rgba(0, 0, 0, 0.04);\n  padding: 12px;\n  border-radius: 14px;\n}\n.stat-card .stat-info {\n  z-index: 1;\n}\n.stat-card .stat-info small {\n  display: block;\n  font-size: 14px;\n  color: var(--text-secondary);\n  margin-bottom: 10px;\n  font-weight: 700;\n}\n.stat-card .stat-info strong {\n  font-size: 30px;\n  color: var(--text-primary);\n  font-family: "Courier New", monospace;\n  font-weight: 900;\n}\n.chart-content .chart-container {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 32px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  box-shadow:\n    0 1.2px 2.4px rgba(0, 0, 0, 0.06),\n    0 3.6px 7.2px rgba(0, 0, 0, 0.08),\n    0 9.6px 24px rgba(0, 0, 0, 0.1),\n    0 19.2px 48px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.notes-content .notes-area {\n  width: 100%;\n  min-height: 420px;\n  padding: 24px;\n  border: 2px solid var(--border-color);\n  border-radius: 18px;\n  font-family: inherit;\n  font-size: 16px;\n  line-height: 2;\n  color: var(--text-primary);\n  background: var(--bg-input);\n  resize: vertical;\n  box-sizing: border-box;\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow:\n    0 0.5px 1px rgba(0, 0, 0, 0.06),\n    0 1.5px 3px rgba(0, 0, 0, 0.08),\n    0 4px 10px rgba(0, 0, 0, 0.1),\n    0 8px 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n.notes-content .notes-area:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow:\n    0 0 20px rgba(59, 130, 246, 0.25),\n    0 0 60px rgba(59, 130, 246, 0.075),\n    0 8px 30px rgba(0, 0, 0, 0.15);\n}\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  animation: fadeInScale 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.modal-content {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  width: 100%;\n  max-width: 540px;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow:\n    0 3px 6px rgba(0, 0, 0, 0.06),\n    0 9px 18px rgba(0, 0, 0, 0.08),\n    0 24px 60px rgba(0, 0, 0, 0.1),\n    0 48px 120px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  animation: fadeInUp 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.modal-content.modal-lg {\n  max-width: 880px;\n}\n.modal-content .modal-header {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n  background: rgba(0, 0, 0, 0.02);\n}\n.modal-content .modal-header h3 {\n  flex: 1;\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0;\n}\n.modal-content .modal-header .wizard-progress {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.modal-content .modal-header .wizard-progress .progress-bar {\n  width: 120px;\n  height: 7px;\n  background: var(--bg-surface);\n  border-radius: 4px;\n  overflow: hidden;\n}\n.modal-content .modal-header .wizard-progress .progress-bar .progress-fill {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6,\n      #6366f1,\n      #a855f7);\n  background-size: 200% 100%;\n  animation: shimmer 2s linear infinite;\n  border-radius: 4px;\n  transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n  box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);\n}\n.modal-content .modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 28px;\n}\n.modal-content .modal-footer {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 20px 28px;\n  border-top: 1px solid var(--border-color);\n  background: rgba(0, 0, 0, 0.02);\n}\n.modal-content .modal-footer .spacer {\n  flex: 1;\n}\n.permissions-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.permission-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 14px;\n  box-shadow:\n    0 0.3px 0.6px rgba(0, 0, 0, 0.06),\n    0 0.9px 1.8px rgba(0, 0, 0, 0.08),\n    0 2.4px 6px rgba(0, 0, 0, 0.1),\n    0 4.8px 12px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.permission-row:hover {\n  box-shadow:\n    0 0.5px 1px rgba(0, 0, 0, 0.06),\n    0 1.5px 3px rgba(0, 0, 0, 0.08),\n    0 4px 10px rgba(0, 0, 0, 0.1),\n    0 8px 20px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n  transform: translateX(-3px);\n}\n.permission-row .user-name {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.permission-row select {\n  padding: 9px 16px;\n  border: 1.5px solid var(--border-color);\n  border-radius: 10px;\n  font-family: inherit;\n  font-size: 13px;\n  background: var(--bg-input);\n  color: var(--text-primary);\n}\n.action-btn {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color);\n  background: transparent;\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.action-btn .material-icons-round {\n  font-size: 16px;\n}\n.action-btn.edit:hover {\n  background: rgba(59, 130, 246, 0.08);\n  color: #3b82f6;\n  border-color: rgba(59, 130, 246, 0.3);\n  transform: scale(1.12) translateY(-2px);\n  box-shadow:\n    0 1px 3px rgba(59, 130, 246, 0.2),\n    0 3px 9px rgba(59, 130, 246, 0.18),\n    0 7px 20px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.action-btn.delete:hover {\n  background: rgba(239, 68, 68, 0.08);\n  color: #ef4444;\n  border-color: rgba(239, 68, 68, 0.3);\n  transform: scale(1.12) translateY(-2px);\n  box-shadow:\n    0 1px 3px rgba(239, 68, 68, 0.2),\n    0 3px 9px rgba(239, 68, 68, 0.18),\n    0 7px 20px rgba(239, 68, 68, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 28px;\n  border-radius: 14px;\n  border: none;\n  background:\n    linear-gradient(\n      145deg,\n      #5b9af8,\n      #6366f1);\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow:\n    0 2px 6px rgba(59, 130, 246, 0.2),\n    0 6px 18px rgba(59, 130, 246, 0.18),\n    0 14px 40px rgba(59, 130, 246, 0.12),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  position: relative;\n  overflow: hidden;\n}\n.add-btn::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.3),\n      transparent);\n  border-radius: inherit;\n  pointer-events: none;\n  z-index: 1;\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.add-btn:hover {\n  transform: translateY(-4px);\n  box-shadow:\n    0 0 20px rgba(59, 130, 246, 0.5),\n    0 0 60px rgba(59, 130, 246, 0.15),\n    0 8px 30px rgba(0, 0, 0, 0.15);\n  filter: brightness(1.1);\n}\n.inventory-content {\n  padding: 8px 0;\n}\n.inventory-table-wrapper {\n  overflow-x: auto;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n}\n.inventory-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.inventory-table th {\n  padding: 12px 14px;\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  font-weight: 700;\n  text-align: right;\n  white-space: nowrap;\n  border-bottom: 2px solid var(--border-color);\n}\n.inventory-table td {\n  padding: 10px 14px;\n  border-bottom: 1px solid var(--border-color);\n  vertical-align: middle;\n  font-weight: 600;\n}\n.inventory-table tbody tr:hover {\n  background: var(--bg-hover);\n}\n.item-name {\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.item-code {\n  font-family: monospace;\n  direction: ltr;\n  color: var(--text-secondary);\n  font-size: 12px;\n}\n.item-qty {\n  font-weight: 800;\n  color: var(--text-primary);\n  text-align: center;\n}\n.item-qty.low-stock {\n  color: #ef4444;\n  background: rgba(239, 68, 68, 0.08);\n  border-radius: 6px;\n  padding: 4px 8px;\n}\n.item-cost {\n  font-weight: 700;\n  color: var(--text-primary);\n  white-space: nowrap;\n}\n.item-date {\n  font-size: 12px;\n  color: var(--text-secondary);\n  white-space: nowrap;\n}\n.inventory-summary {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  margin-top: 12px;\n  background: var(--bg-surface);\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n}\n.inventory-summary span {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.inventory-summary span strong {\n  color: var(--text-primary);\n  font-weight: 800;\n  margin-right: 4px;\n}\n.reports-content {\n  padding: 8px 0;\n}\n.reports-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 14px;\n}\n.report-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px 20px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.report-card .material-icons-round {\n  font-size: 28px;\n}\n.report-card div {\n  display: flex;\n  flex-direction: column;\n}\n.report-card div strong {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.report-card div small {\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-top: 2px;\n}\n.report-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n}\n@media (max-width: 768px) {\n  .list-view {\n    padding: 18px;\n  }\n  .screens-grid {\n    grid-template-columns: 1fr;\n  }\n  .tab-types-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .op-types-grid {\n    grid-template-columns: 1fr;\n  }\n  .accounts-grid {\n    grid-template-columns: 1fr;\n  }\n  .stats-grid {\n    grid-template-columns: 1fr;\n  }\n  .form-row {\n    flex-direction: column;\n  }\n  .wizard-view .wizard-header {\n    flex-wrap: wrap;\n  }\n  .wizard-view .wizard-body {\n    padding: 20px;\n  }\n  .accounts-filter-bar {\n    flex-direction: column;\n  }\n  .accounts-filter-bar .search-box {\n    min-width: 100%;\n  }\n  .log-content .filter-row {\n    flex-direction: column;\n  }\n  .log-content .filter-row input[type=date],\n  .log-content .filter-row select {\n    width: 100%;\n  }\n  .entry-row {\n    flex-direction: column;\n  }\n  .entry-row .amount-input {\n    width: 100%;\n  }\n  .modal-content {\n    max-width: 100%;\n    margin: 10px;\n  }\n  .op-buttons-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .tab-content {\n    padding: 18px;\n  }\n  .screen-view .screen-header {\n    padding: 14px 18px;\n  }\n  .accounts-content .accounts-list {\n    grid-template-columns: 1fr;\n  }\n  .tabs-bar {\n    padding: 8px 14px;\n  }\n}\n.transfer-form {\n  background: rgba(59, 130, 246, 0.04);\n  border: 1px solid rgba(59, 130, 246, 0.15);\n  border-radius: 12px;\n  padding: 20px;\n  margin: 12px 0;\n}\n.transfer-form .transfer-row {\n  display: flex;\n  align-items: flex-end;\n  gap: 12px;\n}\n.transfer-form .transfer-row .form-group {\n  flex: 1;\n}\n.transfer-form .transfer-row .transfer-arrow {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(59, 130, 246, 0.1);\n  border-radius: 50%;\n  margin-bottom: 4px;\n}\n.transfer-form .transfer-row .transfer-arrow .material-icons-round {\n  color: #3b82f6;\n  font-size: 20px;\n}\n@media (max-width: 768px) {\n  .transfer-form .transfer-row {\n    flex-direction: column;\n  }\n  .transfer-form .transfer-row .transfer-arrow {\n    transform: rotate(90deg);\n    align-self: center;\n  }\n}\n.report-filters {\n  margin-bottom: 16px;\n}\n.report-filters .filter-row {\n  display: flex;\n  gap: 10px;\n}\n.report-results .report-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.report-results .report-header h4 {\n  flex: 1;\n  margin: 0;\n  font-size: 16px;\n  color: #1e293b;\n}\n.report-results .report-header .report-actions {\n  display: flex;\n  gap: 6px;\n}\n.report-results .report-section {\n  margin-bottom: 20px;\n  padding: 16px;\n  background: #f8fafc;\n  border-radius: 10px;\n}\n.report-results .report-section h5 {\n  margin: 0 0 10px;\n  font-size: 14px;\n  color: #3b82f6;\n}\n.report-results .report-table-wrapper {\n  overflow-x: auto;\n}\n.report-results .report-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12px;\n}\n.report-results .report-table th {\n  background: #f1f5f9;\n  padding: 8px 10px;\n  text-align: right;\n  font-weight: 600;\n  color: #475569;\n  border-bottom: 1px solid #e2e8f0;\n  white-space: nowrap;\n}\n.report-results .report-table td {\n  padding: 6px 10px;\n  border-bottom: 1px solid #f1f5f9;\n  color: #334155;\n}\n.report-results .summary-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 12px;\n}\n.report-results .summary-cards .summary-card {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 16px;\n  background: white;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n}\n.report-results .summary-cards .summary-card .material-icons-round {\n  font-size: 28px;\n}\n.report-results .summary-cards .summary-card strong {\n  display: block;\n  font-size: 18px;\n  color: #1e293b;\n}\n.report-results .summary-cards .summary-card small {\n  font-size: 12px;\n  color: #94a3b8;\n}\n.error-text {\n  color: #ef4444;\n  font-size: 13px;\n}\n.no-data-text {\n  color: #94a3b8;\n  font-size: 13px;\n  text-align: center;\n  padding: 20px;\n}\n.loading-inline {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 16px;\n  color: #64748b;\n  font-size: 13px;\n}\n.spinner-sm {\n  width: 18px;\n  height: 18px;\n  border: 2px solid #e2e8f0;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n.footer-actions {\n  display: flex;\n  gap: 4px;\n  margin-right: auto;\n}\n.log-footer,\n.inventory-summary {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n@media print {\n  :host {\n    background: white !important;\n  }\n  .screen-header,\n  .tabs-bar,\n  .log-filters,\n  .report-filters,\n  .footer-actions,\n  .header-actions,\n  .btn-icon,\n  .report-header .btn {\n    display: none !important;\n  }\n  .tab-content {\n    padding: 0 !important;\n  }\n  .report-table,\n  .log-table {\n    font-size: 10px !important;\n  }\n}\n.tabs-bar.cdk-drop-list-dragging .tab-btn {\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n.tab-btn.cdk-drag-preview {\n  border-radius: 8px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);\n  opacity: 0.9;\n}\n.tab-btn.cdk-drag-placeholder {\n  opacity: 0.3;\n}\n.tab-btn.cdk-drag-animating {\n  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);\n}\n.templates-desc {\n  color: #64748b;\n  font-size: 13px;\n  margin: 0 0 16px;\n}\n.templates-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.template-card {\n  display: flex;\n  align-items: flex-start;\n  gap: 14px;\n  padding: 16px;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.template-card:hover {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.02);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n}\n.template-card .template-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.template-card .template-icon .material-icons-round {\n  color: white;\n  font-size: 24px;\n}\n.template-card .template-info {\n  flex: 1;\n}\n.template-card .template-info strong {\n  display: block;\n  font-size: 14px;\n  color: #1e293b;\n  margin-bottom: 2px;\n}\n.template-card .template-info small {\n  display: block;\n  font-size: 12px;\n  color: #94a3b8;\n  margin-bottom: 8px;\n}\n.template-card .template-tabs {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n.template-card .mini-tab {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  padding: 2px 8px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 500;\n}\n.template-card .mini-tab .material-icons-round {\n  font-size: 14px;\n}\n@media (max-width: 480px) {\n  .screen-header {\n    flex-wrap: wrap;\n    gap: 8px;\n    padding: 12px !important;\n  }\n  .screen-header h2 {\n    font-size: 16px !important;\n  }\n  .tabs-bar {\n    gap: 4px !important;\n    overflow-x: auto;\n    flex-wrap: nowrap;\n    padding: 0 8px;\n  }\n  .tab-btn {\n    font-size: 12px !important;\n    padding: 6px 10px !important;\n    white-space: nowrap;\n  }\n  .tab-content {\n    padding: 12px !important;\n  }\n  .stats-grid {\n    grid-template-columns: 1fr !important;\n  }\n  .log-table th,\n  .log-table td {\n    padding: 4px 6px !important;\n    font-size: 11px !important;\n  }\n  .report-table th,\n  .report-table td {\n    padding: 4px 6px !important;\n    font-size: 11px !important;\n  }\n  .summary-cards {\n    grid-template-columns: 1fr 1fr !important;\n  }\n  .op-btn {\n    padding: 10px !important;\n  }\n  .modal-content {\n    width: 98% !important;\n    max-height: 95vh !important;\n    margin: 8px !important;\n  }\n  .wizard-step {\n    padding: 12px !important;\n  }\n  .templates-grid .template-card {\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n  }\n}\n@media (min-width: 481px) and (max-width: 768px) {\n  .stats-grid {\n    grid-template-columns: repeat(2, 1fr) !important;\n  }\n  .summary-cards {\n    grid-template-columns: repeat(2, 1fr) !important;\n  }\n}\n@media (min-width: 769px) and (max-width: 1024px) {\n  .stats-grid {\n    grid-template-columns: repeat(2, 1fr) !important;\n  }\n  .screens-grid {\n    grid-template-columns: repeat(2, 1fr) !important;\n  }\n}\n@media (min-width: 1025px) and (max-width: 1440px) {\n  .stats-grid {\n    grid-template-columns: repeat(4, 1fr) !important;\n  }\n}\n.notification-badge {\n  position: absolute;\n  top: -4px;\n  right: -4px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #ef4444;\n  color: white;\n  font-size: 10px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid white;\n  animation: notif-pulse 2s infinite;\n}\n@keyframes notif-pulse {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.1);\n  }\n}\n.notification-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #ef4444;\n  display: inline-block;\n  margin-right: 4px;\n  animation: notif-pulse 2s infinite;\n}\n/*# sourceMappingURL=custom-screens.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomScreensComponent, { className: "CustomScreensComponent", filePath: "src/app/pages/custom-screens/custom-screens.ts", lineNumber: 93 });
})();
export {
  CustomScreensComponent
};
//# sourceMappingURL=chunk-B347KQMU.js.map
