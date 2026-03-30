import {
  CommonModule,
  Component,
  Input,
  Output,
  input,
  output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-VUZEB5JS.js";

// src/app/shared/components/empty-state/empty-state.component.ts
function EmptyStateComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle());
  }
}
function EmptyStateComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 5);
    \u0275\u0275domListener("click", function EmptyStateComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.addClick.emit());
    });
    \u0275\u0275domElementStart(1, "span", 6);
    \u0275\u0275text(2, "add");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.actionLabel(), " ");
  }
}
var EmptyStateComponent = class _EmptyStateComponent {
  icon = input("inbox", ...ngDevMode ? [{ debugName: "icon" }] : (
    /* istanbul ignore next */
    []
  ));
  title = input("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A", ...ngDevMode ? [{ debugName: "title" }] : (
    /* istanbul ignore next */
    []
  ));
  subtitle = input("", ...ngDevMode ? [{ debugName: "subtitle" }] : (
    /* istanbul ignore next */
    []
  ));
  actionLabel = input("", ...ngDevMode ? [{ debugName: "actionLabel" }] : (
    /* istanbul ignore next */
    []
  ));
  addClick = output();
  static \u0275fac = function EmptyStateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmptyStateComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmptyStateComponent, selectors: [["app-empty-state"]], inputs: { icon: [1, "icon"], title: [1, "title"], subtitle: [1, "subtitle"], actionLabel: [1, "actionLabel"] }, outputs: { addClick: "addClick" }, decls: 7, vars: 4, consts: [[1, "empty-state"], [1, "material-icons", "empty-icon"], [1, "empty-title"], [1, "empty-subtitle"], [1, "btn-add"], [1, "btn-add", 3, "click"], [1, "material-icons"]], template: function EmptyStateComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "span", 1);
      \u0275\u0275text(2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "h3", 2);
      \u0275\u0275text(4);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(5, EmptyStateComponent_Conditional_5_Template, 2, 1, "p", 3);
      \u0275\u0275conditionalCreate(6, EmptyStateComponent_Conditional_6_Template, 4, 1, "button", 4);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.icon());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.title());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.subtitle() ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.actionLabel() ? 6 : -1);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 1rem;\n  text-align: center;\n  gap: 0.75rem;\n  color: var(--text-secondary, #888);\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  opacity: 0.35;\n  margin-bottom: 0.5rem;\n}\n.empty-title[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  font-weight: 600;\n  margin: 0;\n  color: var(--text-primary, #333);\n}\n.empty-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  margin: 0;\n  max-width: 320px;\n}\n.btn-add[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin-top: 0.5rem;\n  padding: 0.55rem 1.25rem;\n  background: var(--primary, #1976d2);\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-add[_ngcontent-%COMP%]:hover {\n  background: var(--primary-dark, #1565c0);\n}\n.btn-add[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n/*# sourceMappingURL=empty-state.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmptyStateComponent, [{
    type: Component,
    args: [{ selector: "app-empty-state", standalone: true, imports: [CommonModule], template: `
    <div class="empty-state">
      <span class="material-icons empty-icon">{{ icon() }}</span>
      <h3 class="empty-title">{{ title() }}</h3>
      @if (subtitle()) {
        <p class="empty-subtitle">{{ subtitle() }}</p>
      }
      @if (actionLabel()) {
        <button class="btn-add" (click)="addClick.emit()">
          <span class="material-icons">add</span>
          {{ actionLabel() }}
        </button>
      }
    </div>
  `, styles: ["/* angular:styles/component:scss;61ff062fb033122a3e535cda6a029413a4cd5f5ed2565f000b822b0fa095f3f6;F:/Hhhhh/hesabati/frontend/src/app/shared/components/empty-state/empty-state.component.ts */\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 1rem;\n  text-align: center;\n  gap: 0.75rem;\n  color: var(--text-secondary, #888);\n}\n.empty-icon {\n  font-size: 4rem;\n  opacity: 0.35;\n  margin-bottom: 0.5rem;\n}\n.empty-title {\n  font-size: 1.15rem;\n  font-weight: 600;\n  margin: 0;\n  color: var(--text-primary, #333);\n}\n.empty-subtitle {\n  font-size: 0.9rem;\n  margin: 0;\n  max-width: 320px;\n}\n.btn-add {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin-top: 0.5rem;\n  padding: 0.55rem 1.25rem;\n  background: var(--primary, #1976d2);\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.btn-add:hover {\n  background: var(--primary-dark, #1565c0);\n}\n.btn-add .material-icons {\n  font-size: 1.1rem;\n}\n/*# sourceMappingURL=empty-state.component.css.map */\n"] }]
  }], null, { icon: [{ type: Input, args: [{ isSignal: true, alias: "icon", required: false }] }], title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: false }] }], subtitle: [{ type: Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], actionLabel: [{ type: Input, args: [{ isSignal: true, alias: "actionLabel", required: false }] }], addClick: [{ type: Output, args: ["addClick"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmptyStateComponent, { className: "EmptyStateComponent", filePath: "src/app/shared/components/empty-state/empty-state.component.ts", lineNumber: 72 });
})();

export {
  EmptyStateComponent
};
//# sourceMappingURL=chunk-CMDT4BPZ.js.map
