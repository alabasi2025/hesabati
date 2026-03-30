import {
  CommonModule,
  Component,
  Input,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵnextContext,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-VUZEB5JS.js";

// src/app/shared/components/loading-state/loading-state.component.ts
function LoadingStateComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.message());
  }
}
function LoadingStateComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
    \u0275\u0275text(3, "sync");
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(4, LoadingStateComponent_Conditional_0_Conditional_4_Template, 2, 1, "p", 3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.message() ? 4 : -1);
  }
}
var LoadingStateComponent = class _LoadingStateComponent {
  loading = input(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  message = input("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...", ...ngDevMode ? [{ debugName: "message" }] : (
    /* istanbul ignore next */
    []
  ));
  static \u0275fac = function LoadingStateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoadingStateComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoadingStateComponent, selectors: [["app-loading-state"]], inputs: { loading: [1, "loading"], message: [1, "message"] }, decls: 1, vars: 1, consts: [[1, "loading-state"], [1, "loading-spinner"], [1, "material-icons", "spinning"], [1, "loading-message"]], template: function LoadingStateComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, LoadingStateComponent_Conditional_0_Template, 5, 1, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.loading() ? 0 : -1);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  color: var(--text-secondary, #666);\n  gap: 0.75rem;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.spinning[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: var(--primary, #1976d2);\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-message[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  margin: 0;\n}\n/*# sourceMappingURL=loading-state.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingStateComponent, [{
    type: Component,
    args: [{ selector: "app-loading-state", standalone: true, imports: [CommonModule], template: `
    @if (loading()) {
      <div class="loading-state">
        <div class="loading-spinner">
          <span class="material-icons spinning">sync</span>
        </div>
        @if (message()) {
          <p class="loading-message">{{ message() }}</p>
        }
      </div>
    }
  `, styles: ["/* angular:styles/component:scss;50ad7274f608e987217f6b60e7f7853c7c9d9a596d5f72d3417ac323aed9b895;F:/Hhhhh/hesabati/frontend/src/app/shared/components/loading-state/loading-state.component.ts */\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  color: var(--text-secondary, #666);\n  gap: 0.75rem;\n}\n.loading-spinner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.spinning {\n  font-size: 2.5rem;\n  color: var(--primary, #1976d2);\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-message {\n  font-size: 0.95rem;\n  margin: 0;\n}\n/*# sourceMappingURL=loading-state.component.css.map */\n"] }]
  }], null, { loading: [{ type: Input, args: [{ isSignal: true, alias: "loading", required: false }] }], message: [{ type: Input, args: [{ isSignal: true, alias: "message", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoadingStateComponent, { className: "LoadingStateComponent", filePath: "src/app/shared/components/loading-state/loading-state.component.ts", lineNumber: 54 });
})();

export {
  LoadingStateComponent
};
//# sourceMappingURL=chunk-4UIIPGWR.js.map
