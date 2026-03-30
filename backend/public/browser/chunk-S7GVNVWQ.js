import {
  BusinessService
} from "./chunk-5SFBIGEU.js";
import {
  ActivatedRoute,
  Component,
  Injector,
  NavigationEnd,
  Router,
  Subject,
  effect,
  filter,
  inject,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent
} from "./chunk-VUZEB5JS.js";

// src/app/shared/base-page.component.ts
function getBizIdFromUrl(url) {
  const match = /\/biz\/(\d+)(?:\/|$)/.exec(url || "");
  return match ? Number.parseInt(match[1], 10) : 0;
}
var BasePageComponent = class _BasePageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  injector = inject(Injector);
  destroy$ = new Subject();
  bizId = 0;
  biz = inject(BusinessService);
  ngOnInit() {
    this.applyBizId(this.readBizId());
    effect(() => {
      const id = this.biz.currentBusinessId();
      const num = id == null ? 0 : Number(id);
      if (num > 0)
        this.applyBizId(num);
    }, { injector: this.injector });
    const params$ = this.route.parent?.params ?? this.route.params;
    params$.pipe(takeUntil(this.destroy$)).subscribe(() => this.applyBizId(this.readBizId()));
    this.router.events.pipe(takeUntil(this.destroy$), filter((e) => e instanceof NavigationEnd), filter((e) => e.urlAfterRedirects.includes("/biz/"))).subscribe(() => this.applyBizId(this.readBizId()));
    queueMicrotask(() => this.applyBizId(this.readBizId()));
  }
  readBizId() {
    if (globalThis.window !== void 0) {
      const fromPath = getBizIdFromUrl(globalThis.window.location.pathname);
      if (fromPath > 0)
        return fromPath;
    }
    let id = this.biz.currentBusinessId();
    if (id != null && id > 0)
      return Number(id);
    const snapshotParams = this.route.parent?.snapshot?.params ?? this.route.snapshot?.params;
    if (snapshotParams?.["bizId"])
      return Number.parseInt(snapshotParams["bizId"], 10);
    id = getBizIdFromUrl(this.router.url);
    if (id > 0)
      return id;
    let state = this.router.routerState.snapshot.root;
    while (state) {
      const p = state.params["bizId"];
      if (p)
        return Number.parseInt(p, 10);
      state = state.firstChild ?? null;
    }
    return 0;
  }
  applyBizId(id) {
    if (id > 0 && id !== this.bizId) {
      this.bizId = id;
      this.onBizIdChange(this.bizId);
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static \u0275fac = function BasePageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BasePageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BasePageComponent, selectors: [["ng-component"]], decls: 0, vars: 0, template: function BasePageComponent_Template(rf, ctx) {
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BasePageComponent, [{
    type: Component,
    args: [{ template: "" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BasePageComponent, { className: "BasePageComponent", filePath: "src/app/shared/base-page.component.ts", lineNumber: 20 });
})();

export {
  BasePageComponent
};
//# sourceMappingURL=chunk-S7GVNVWQ.js.map
