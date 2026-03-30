import {
  CommonModule,
  Component,
  Input,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵinterpolate1,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-VUZEB5JS.js";

// src/app/shared/components/status-badge/status-badge.component.ts
var STATUS_CONFIG = {
  unreviewed: { label: "\u063A\u064A\u0631 \u0645\u0631\u0627\u062C\u0639", cls: "warning" },
  reviewed: { label: "\u0645\u0631\u0627\u062C\u0639", cls: "success" },
  active: { label: "\u0646\u0634\u0637", cls: "success" },
  inactive: { label: "\u063A\u064A\u0631 \u0646\u0634\u0637", cls: "neutral" },
  suspended: { label: "\u0645\u0648\u0642\u0648\u0641", cls: "danger" },
  open: { label: "\u0645\u0641\u062A\u0648\u062D", cls: "info" },
  in_progress: { label: "\u062C\u0627\u0631\u064D", cls: "warning" },
  completed: { label: "\u0645\u0643\u062A\u0645\u0644", cls: "success" },
  disputed: { label: "\u0645\u062A\u0646\u0627\u0632\u0639 \u0639\u0644\u064A\u0647", cls: "danger" },
  pending: { label: "\u0645\u0639\u0644\u0642", cls: "warning" },
  resolved: { label: "\u0645\u062D\u0644\u0648\u0644", cls: "success" },
  written_off: { label: "\u0645\u0634\u0637\u0648\u0628", cls: "neutral" },
  draft: { label: "\u0645\u0633\u0648\u062F\u0629", cls: "neutral" },
  confirmed: { label: "\u0645\u0624\u0643\u062F", cls: "info" },
  partial: { label: "\u062C\u0632\u0626\u064A", cls: "warning" },
  cancelled: { label: "\u0645\u0644\u063A\u0649", cls: "danger" }
};
var StatusBadgeComponent = class _StatusBadgeComponent {
  status = input("", ...ngDevMode ? [{ debugName: "status" }] : (
    /* istanbul ignore next */
    []
  ));
  config() {
    const s = this.status();
    return STATUS_CONFIG[s] ?? { label: s, cls: "neutral" };
  }
  static \u0275fac = function StatusBadgeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StatusBadgeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StatusBadgeComponent, selectors: [["app-status-badge"]], inputs: { status: [1, "status"] }, decls: 2, vars: 4, template: function StatusBadgeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "span");
      \u0275\u0275text(1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(\u0275\u0275interpolate1("status-badge status-", ctx.config().cls));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.config().label, " ");
    }
  }, dependencies: [CommonModule], styles: ["\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.65rem;\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.status-success[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.status-warning[_ngcontent-%COMP%] {\n  background: #fff8e1;\n  color: #f57f17;\n}\n.status-danger[_ngcontent-%COMP%] {\n  background: #fce4ec;\n  color: #c62828;\n}\n.status-info[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1565c0;\n}\n.status-neutral[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  color: #616161;\n}\n/*# sourceMappingURL=status-badge.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StatusBadgeComponent, [{
    type: Component,
    args: [{ selector: "app-status-badge", standalone: true, imports: [CommonModule], template: `
    <span class="status-badge status-{{ config().cls }}">
      {{ config().label }}
    </span>
  `, styles: ["/* angular:styles/component:scss;4c1bbe739c436f928b4af090d4da2fa2c27dceb92ada140f840f08a4714985af;F:/Hhhhh/hesabati/frontend/src/app/shared/components/status-badge/status-badge.component.ts */\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.65rem;\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.status-success {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.status-warning {\n  background: #fff8e1;\n  color: #f57f17;\n}\n.status-danger {\n  background: #fce4ec;\n  color: #c62828;\n}\n.status-info {\n  background: #e3f2fd;\n  color: #1565c0;\n}\n.status-neutral {\n  background: #f5f5f5;\n  color: #616161;\n}\n/*# sourceMappingURL=status-badge.component.css.map */\n"] }]
  }], null, { status: [{ type: Input, args: [{ isSignal: true, alias: "status", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StatusBadgeComponent, { className: "StatusBadgeComponent", filePath: "src/app/shared/components/status-badge/status-badge.component.ts", lineNumber: 61 });
})();

export {
  StatusBadgeComponent
};
//# sourceMappingURL=chunk-7EFL7A6H.js.map
