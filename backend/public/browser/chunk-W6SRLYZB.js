import {
  formatAmount,
  formatDate,
  formatDateTime,
  getSearchHighlightParts,
  matchesSearchQuery,
  normalizeSearchText,
  resolveSearchSelection
} from "./chunk-RCZO5KY5.js";
import {
  StatusBadgeComponent
} from "./chunk-7EFL7A6H.js";
import {
  EmptyStateComponent
} from "./chunk-CMDT4BPZ.js";
import {
  LoadingStateComponent
} from "./chunk-4UIIPGWR.js";
import {
  FormsModule,
  NgSelectOption,
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
  CommonModule,
  Component,
  EventEmitter,
  Input,
  Output,
  RouterLink,
  __spreadProps,
  __spreadValues,
  computed,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-VUZEB5JS.js";

// src/app/shared/components/smart-filter-input/smart-filter-input.ts
function SmartFilterInputComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "label", 1);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("for", ctx_r0.inputId || null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.label);
  }
}
function SmartFilterInputComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function SmartFilterInputComponent_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clear());
    });
    \u0275\u0275domElementStart(1, "span", 7);
    \u0275\u0275text(2, "close");
    \u0275\u0275domElementEnd()();
  }
}
function SmartFilterInputComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 9);
    \u0275\u0275domListener("mousedown", function SmartFilterInputComponent_Conditional_5_For_2_Template_button_mousedown_0_listener($event) {
      return $event.preventDefault();
    })("click", function SmartFilterInputComponent_Conditional_5_For_2_Template_button_click_0_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectSuggestion(item_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const \u0275$index_20_r5 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", \u0275$index_20_r5 === ctx_r0.activeSuggestionIndex());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4, " ");
  }
}
function SmartFilterInputComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5);
    \u0275\u0275repeaterCreate(1, SmartFilterInputComponent_Conditional_5_For_2_Template, 2, 3, "button", 8, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.getFilteredSuggestions());
  }
}
var SmartFilterInputComponent = class _SmartFilterInputComponent {
  inputId = "";
  label = "";
  title = "";
  placeholder = "";
  value = "";
  suggestions = [];
  allowClear = true;
  maxSuggestions = 30;
  valueChange = new EventEmitter();
  committed = new EventEmitter();
  cleared = new EventEmitter();
  showSuggestions = signal(false, ...ngDevMode ? [{ debugName: "showSuggestions" }] : (
    /* istanbul ignore next */
    []
  ));
  activeSuggestionIndex = signal(-1, ...ngDevMode ? [{ debugName: "activeSuggestionIndex" }] : (
    /* istanbul ignore next */
    []
  ));
  getFilteredSuggestions() {
    const all = (this.suggestions || []).filter((v) => String(v || "").trim().length > 0);
    const query = normalizeSearchText(this.value);
    const items = query ? all.filter((item) => matchesSearchQuery(query, item)) : all;
    return items.slice(0, this.maxSuggestions);
  }
  onInput(value) {
    this.valueChange.emit(String(value || ""));
    this.showSuggestions.set(true);
    this.activeSuggestionIndex.set(-1);
  }
  onCommit(value) {
    this.committed.emit(String(value || ""));
  }
  onFocus() {
    if (this.getFilteredSuggestions().length > 0) {
      this.showSuggestions.set(true);
    }
  }
  onBlur() {
    globalThis.setTimeout(() => {
      this.showSuggestions.set(false);
      this.activeSuggestionIndex.set(-1);
    }, 120);
  }
  onKeydown(event) {
    const options = this.getFilteredSuggestions();
    if (!options.length)
      return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      this.showSuggestions.set(true);
      const current = this.activeSuggestionIndex();
      const dir = event.key === "ArrowDown" ? 1 : -1;
      const next = current < 0 ? dir > 0 ? 0 : options.length - 1 : (current + dir + options.length) % options.length;
      this.activeSuggestionIndex.set(next);
      return;
    }
    if (event.key === "Enter") {
      const idx = this.activeSuggestionIndex();
      if (this.showSuggestions() && idx >= 0 && idx < options.length) {
        event.preventDefault();
        this.selectSuggestion(options[idx]);
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      this.showSuggestions.set(false);
      this.activeSuggestionIndex.set(-1);
    }
  }
  selectSuggestion(value) {
    const picked = String(value || "");
    this.valueChange.emit(picked);
    this.committed.emit(picked);
    this.showSuggestions.set(false);
    this.activeSuggestionIndex.set(-1);
  }
  clear() {
    this.valueChange.emit("");
    this.committed.emit("");
    this.cleared.emit();
    this.showSuggestions.set(false);
    this.activeSuggestionIndex.set(-1);
  }
  static \u0275fac = function SmartFilterInputComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SmartFilterInputComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SmartFilterInputComponent, selectors: [["app-smart-filter-input"]], inputs: { inputId: "inputId", label: "label", title: "title", placeholder: "placeholder", value: "value", suggestions: "suggestions", allowClear: "allowClear", maxSuggestions: "maxSuggestions" }, outputs: { valueChange: "valueChange", committed: "committed", cleared: "cleared" }, decls: 6, vars: 7, consts: [[1, "smart-filter-field"], [1, "form-label"], [1, "input-wrap"], ["type", "text", "title", "\u0628\u062D\u062B", "placeholder", "\u0628\u062D\u062B...", 1, "form-input", 3, "input", "change", "focus", "blur", "keydown", "keydown.enter", "id", "placeholder", "value"], ["type", "button", "title", "\u0645\u0633\u062D", 1, "clear-btn"], [1, "suggestions-list"], ["type", "button", "title", "\u0645\u0633\u062D", 1, "clear-btn", 3, "click"], [1, "material-icons-round"], ["type", "button", 1, "suggestion-item", 3, "active"], ["type", "button", 1, "suggestion-item", 3, "mousedown", "click"]], template: function SmartFilterInputComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, SmartFilterInputComponent_Conditional_1_Template, 2, 2, "label", 1);
      \u0275\u0275domElementStart(2, "div", 2)(3, "input", 3);
      \u0275\u0275domListener("input", function SmartFilterInputComponent_Template_input_input_3_listener($event) {
        return ctx.onInput($event.target.value);
      })("change", function SmartFilterInputComponent_Template_input_change_3_listener($event) {
        return ctx.onCommit($event.target.value);
      })("focus", function SmartFilterInputComponent_Template_input_focus_3_listener() {
        return ctx.onFocus();
      })("blur", function SmartFilterInputComponent_Template_input_blur_3_listener() {
        return ctx.onBlur();
      })("keydown", function SmartFilterInputComponent_Template_input_keydown_3_listener($event) {
        return ctx.onKeydown($event);
      })("keydown.enter", function SmartFilterInputComponent_Template_input_keydown_enter_3_listener($event) {
        return ctx.onCommit($event.target.value);
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(4, SmartFilterInputComponent_Conditional_4_Template, 3, 0, "button", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(5, SmartFilterInputComponent_Conditional_5_Template, 3, 0, "div", 5);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.label ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("id", ctx.inputId || null)("placeholder", ctx.placeholder || "\u0628\u062D\u062B...")("value", ctx.value);
      \u0275\u0275attribute("title", ctx.title || ctx.label || "\u0628\u062D\u062B");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.allowClear && ctx.value.trim() ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSuggestions() && ctx.getFilteredSuggestions().length > 0 ? 5 : -1);
    }
  }, dependencies: [CommonModule], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.smart-filter-field[_ngcontent-%COMP%] {\n  width: 100%;\n  position: relative;\n  overflow: visible;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 9px 34px 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.clear-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 6px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 24px;\n  height: 24px;\n  border: none;\n  border-radius: 7px;\n  background: transparent;\n  color: var(--text-muted, #94a3b8);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.clear-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(148, 163, 184, 0.16);\n  color: var(--text-secondary, #64748b);\n}\n.clear-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.suggestions-list[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1200;\n  top: calc(100% + 3px);\n  left: 0;\n  right: 0;\n  max-height: 220px;\n  overflow-y: auto;\n  border-radius: 10px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, #fff);\n  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);\n  padding: 6px;\n  display: grid;\n  gap: 2px;\n}\n.suggestion-item[_ngcontent-%COMP%] {\n  width: 100%;\n  border: none;\n  border-radius: 8px;\n  padding: 8px 10px;\n  text-align: right;\n  background: transparent;\n  color: var(--text-primary, #1e293b);\n  font-size: 12px;\n  font-weight: 700;\n  font-family: inherit;\n  cursor: pointer;\n}\n.suggestion-item[_ngcontent-%COMP%]:hover, \n.suggestion-item.active[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.12);\n  color: #1d4ed8;\n}\n/*# sourceMappingURL=smart-filter-input.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SmartFilterInputComponent, [{
    type: Component,
    args: [{ selector: "app-smart-filter-input", standalone: true, imports: [CommonModule], template: `<div class="smart-filter-field">\r
  @if (label) {\r
    <label class="form-label" [attr.for]="inputId || null">{{ label }}</label>\r
  }\r
\r
  <div class="input-wrap">\r
    <input\r
      class="form-input"\r
      [id]="inputId || null"\r
      type="text"\r
      title="\u0628\u062D\u062B"\r
      placeholder="\u0628\u062D\u062B..."\r
      [attr.title]="title || label || '\u0628\u062D\u062B'"\r
      [placeholder]="placeholder || '\u0628\u062D\u062B...'"\r
      [value]="value"\r
      (input)="onInput($any($event.target).value)"\r
      (change)="onCommit($any($event.target).value)"\r
      (focus)="onFocus()"\r
      (blur)="onBlur()"\r
      (keydown)="onKeydown($event)"\r
      (keydown.enter)="onCommit($any($event.target).value)"\r
    />\r
    @if (allowClear && value.trim()) {\r
      <button class="clear-btn" type="button" title="\u0645\u0633\u062D" (click)="clear()">\r
        <span class="material-icons-round">close</span>\r
      </button>\r
    }\r
  </div>\r
\r
  @if (showSuggestions() && getFilteredSuggestions().length > 0) {\r
    <div class="suggestions-list">\r
      @for (item of getFilteredSuggestions(); track item; let i = $index) {\r
        <button\r
          type="button"\r
          class="suggestion-item"\r
          [class.active]="i === activeSuggestionIndex()"\r
          (mousedown)="$event.preventDefault()"\r
          (click)="selectSuggestion(item)"\r
        >\r
          {{ item }}\r
        </button>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/shared/components/smart-filter-input/smart-filter-input.scss */\n:host {\n  display: block;\n}\n.smart-filter-field {\n  width: 100%;\n  position: relative;\n  overflow: visible;\n}\n.form-label {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.input-wrap {\n  position: relative;\n}\n.form-input {\n  width: 100%;\n  padding: 9px 34px 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input:focus {\n  border-color: #3b82f6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.clear-btn {\n  position: absolute;\n  left: 6px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 24px;\n  height: 24px;\n  border: none;\n  border-radius: 7px;\n  background: transparent;\n  color: var(--text-muted, #94a3b8);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.clear-btn:hover {\n  background: rgba(148, 163, 184, 0.16);\n  color: var(--text-secondary, #64748b);\n}\n.clear-btn .material-icons-round {\n  font-size: 16px;\n}\n.suggestions-list {\n  position: absolute;\n  z-index: 1200;\n  top: calc(100% + 3px);\n  left: 0;\n  right: 0;\n  max-height: 220px;\n  overflow-y: auto;\n  border-radius: 10px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, #fff);\n  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);\n  padding: 6px;\n  display: grid;\n  gap: 2px;\n}\n.suggestion-item {\n  width: 100%;\n  border: none;\n  border-radius: 8px;\n  padding: 8px 10px;\n  text-align: right;\n  background: transparent;\n  color: var(--text-primary, #1e293b);\n  font-size: 12px;\n  font-weight: 700;\n  font-family: inherit;\n  cursor: pointer;\n}\n.suggestion-item:hover,\n.suggestion-item.active {\n  background: rgba(59, 130, 246, 0.12);\n  color: #1d4ed8;\n}\n/*# sourceMappingURL=smart-filter-input.css.map */\n'] }]
  }], null, { inputId: [{
    type: Input
  }], label: [{
    type: Input
  }], title: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], value: [{
    type: Input
  }], suggestions: [{
    type: Input
  }], allowClear: [{
    type: Input
  }], maxSuggestions: [{
    type: Input
  }], valueChange: [{
    type: Output
  }], committed: [{
    type: Output
  }], cleared: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SmartFilterInputComponent, { className: "SmartFilterInputComponent", filePath: "src/app/shared/components/smart-filter-input/smart-filter-input.ts", lineNumber: 12 });
})();

// src/app/shared/components/amount-display/amount-display.component.ts
function AmountDisplayComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 1);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.currency());
  }
}
var AmountDisplayComponent = class _AmountDisplayComponent {
  amount = input(0, ...ngDevMode ? [{ debugName: "amount" }] : (
    /* istanbul ignore next */
    []
  ));
  currency = input("", ...ngDevMode ? [{ debugName: "currency" }] : (
    /* istanbul ignore next */
    []
  ));
  locale = input("ar-YE", ...ngDevMode ? [{ debugName: "locale" }] : (
    /* istanbul ignore next */
    []
  ));
  formatted() {
    return formatAmount(this.amount(), this.locale());
  }
  isNegative() {
    const n = Number(this.amount());
    return !isNaN(n) && n < 0;
  }
  static \u0275fac = function AmountDisplayComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AmountDisplayComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AmountDisplayComponent, selectors: [["app-amount-display"]], inputs: { amount: [1, "amount"], currency: [1, "currency"], locale: [1, "locale"] }, decls: 3, vars: 4, consts: [[1, "amount-display"], [1, "currency-label"]], template: function AmountDisplayComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "span", 0);
      \u0275\u0275text(1);
      \u0275\u0275conditionalCreate(2, AmountDisplayComponent_Conditional_2_Template, 2, 1, "span", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("negative", ctx.isNegative());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.formatted(), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.currency() ? 2 : -1);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.amount-display[_ngcontent-%COMP%] {\n  font-variant-numeric: tabular-nums;\n  font-weight: 500;\n  direction: ltr;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.amount-display.negative[_ngcontent-%COMP%] {\n  color: var(--danger, #c62828);\n}\n.currency-label[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  opacity: 0.75;\n  font-weight: 400;\n}\n/*# sourceMappingURL=amount-display.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AmountDisplayComponent, [{
    type: Component,
    args: [{ selector: "app-amount-display", standalone: true, imports: [CommonModule], template: `
    <span class="amount-display" [class.negative]="isNegative()">
      {{ formatted() }}
      @if (currency()) {
        <span class="currency-label">{{ currency() }}</span>
      }
    </span>
  `, styles: ["/* angular:styles/component:scss;e8230cfaf97f281a265af10a65e709fd9e232f476a04b8a89865ca4f21ab3ea9;F:/Hhhhh/hesabati/frontend/src/app/shared/components/amount-display/amount-display.component.ts */\n.amount-display {\n  font-variant-numeric: tabular-nums;\n  font-weight: 500;\n  direction: ltr;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.amount-display.negative {\n  color: var(--danger, #c62828);\n}\n.currency-label {\n  font-size: 0.78rem;\n  opacity: 0.75;\n  font-weight: 400;\n}\n/*# sourceMappingURL=amount-display.component.css.map */\n"] }]
  }], null, { amount: [{ type: Input, args: [{ isSignal: true, alias: "amount", required: false }] }], currency: [{ type: Input, args: [{ isSignal: true, alias: "currency", required: false }] }], locale: [{ type: Input, args: [{ isSignal: true, alias: "locale", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AmountDisplayComponent, { className: "AmountDisplayComponent", filePath: "src/app/shared/components/amount-display/amount-display.component.ts", lineNumber: 38 });
})();

// src/app/pages/vouchers/vouchers.ts
var _c0 = (a0) => ["/biz", a0, "register-operation"];
var _c1 = () => [1, 2, 3, 4];
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function VouchersComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_27_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.error.set(""));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
function VouchersComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 31)(2, "div", 32)(3, "span", 4);
    \u0275\u0275text(4, "receipt_long");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 33)(6, "div", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 35);
    \u0275\u0275text(9, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0646\u062F\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 36)(11, "div", 32)(12, "span", 4);
    \u0275\u0275text(13, "call_received");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 33)(15, "div", 34);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 35);
    \u0275\u0275text(18, "\u0633\u0646\u062F\u0627\u062A \u0642\u0628\u0636");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 37);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 38)(22, "div", 32)(23, "span", 4);
    \u0275\u0275text(24, "call_made");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 33)(26, "div", 34);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 35);
    \u0275\u0275text(29, "\u0633\u0646\u062F\u0627\u062A \u0635\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 37);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.stats().total);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.stats().receipts);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(ctx_r1.stats().totalReceipt));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.stats().payments);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(ctx_r1.stats().totalPayment));
  }
}
function VouchersComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function VouchersComponent_For_31_Template_button_click_0_listener() {
      const tab_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.switchTab(tab_r4.value));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--tab-color", tab_r4.color);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === tab_r4.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r4.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r4.label, " ");
  }
}
function VouchersComponent_Conditional_51_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r6 = ctx.$implicit;
    \u0275\u0275property("value", status_r6.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(status_r6.label);
  }
}
function VouchersComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 40)(2, "label", 41);
    \u0275\u0275text(3, "\u0645\u0646 \u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 42);
    \u0275\u0275listener("change", function VouchersComponent_Conditional_51_Template_input_change_4_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAdvancedDateFromChange($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 40)(6, "label", 43);
    \u0275\u0275text(7, "\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 44);
    \u0275\u0275listener("change", function VouchersComponent_Conditional_51_Template_input_change_8_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAdvancedDateToChange($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 40)(10, "label", 45);
    \u0275\u0275text(11, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 46);
    \u0275\u0275listener("change", function VouchersComponent_Conditional_51_Template_select_change_12_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAdvancedStatusChange($event.target.value));
    });
    \u0275\u0275elementStart(13, "option", 47);
    \u0275\u0275text(14, "\u0627\u0644\u0643\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(15, VouchersComponent_Conditional_51_For_16_Template, 2, 2, "option", 48, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 40)(18, "label", 49);
    \u0275\u0275text(19, "\u0623\u0642\u0644 \u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 50);
    \u0275\u0275listener("change", function VouchersComponent_Conditional_51_Template_input_change_20_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAdvancedMinAmountChange($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 40)(22, "label", 49);
    \u0275\u0275text(23, "\u0623\u0639\u0644\u0649 \u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 50);
    \u0275\u0275listener("change", function VouchersComponent_Conditional_51_Template_input_change_24_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAdvancedMaxAmountChange($event.target.value));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.filterDateFrom());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.filterDateTo());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.filterStatus());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.statusOptions);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.filterMinAmount());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.filterMaxAmount());
  }
}
function VouchersComponent_Conditional_52_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 51);
  }
}
function VouchersComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275repeaterCreate(1, VouchersComponent_Conditional_52_For_2_Template, 1, 0, "div", 51, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c1));
  }
}
function VouchersComponent_Conditional_53_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 54)(2, "span", 4);
    \u0275\u0275text(3, "receipt_long");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u0646\u062F\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "\u0623\u0646\u0634\u0626 \u0623\u0648\u0644 \u0633\u0646\u062F \u0642\u0628\u0636 \u0623\u0648 \u0635\u0631\u0641 \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0634\u0627\u0634\u0629");
    \u0275\u0275elementEnd()();
  }
}
function VouchersComponent_Conditional_53_Conditional_1_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69)(1, "span", 70);
    \u0275\u0275text(2, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const v_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("color", ctx_r1.getTypeColor(v_r8.voucherType));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", v_r8.fullSequenceNumber, " ");
  }
}
function VouchersComponent_Conditional_53_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_53_Conditional_1_For_2_Template_div_click_0_listener() {
      const v_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openDetails(v_r8));
    })("keydown", function VouchersComponent_Conditional_53_Conditional_1_For_2_Template_div_keydown_0_listener($event) {
      const v_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onVoucherRowKeydown($event, v_r8));
    });
    \u0275\u0275element(1, "div", 57);
    \u0275\u0275elementStart(2, "div", 58)(3, "span", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 59)(6, "div", 60);
    \u0275\u0275conditionalCreate(7, VouchersComponent_Conditional_53_Conditional_1_For_2_Conditional_7_Template, 4, 3, "span", 61);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 62)(10, "span", 63)(11, "span", 4);
    \u0275\u0275text(12, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 64)(15, "span", 4);
    \u0275\u0275text(16, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 65)(19, "span", 4);
    \u0275\u0275text(20, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 65)(23, "span", 4);
    \u0275\u0275text(24, "compare_arrows");
    \u0275\u0275elementEnd();
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 66)(27, "div", 67);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 68);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const v_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("--v-color", ctx_r1.getTypeColor(v_r8.voucherType));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getTypeIcon(v_r8.voucherType));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(v_r8.fullSequenceNumber ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", v_r8.description || "\u0628\u062F\u0648\u0646 \u0628\u064A\u0627\u0646", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDate(v_r8.voucherDate || v_r8.createdAt), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", v_r8.voucherNumber || "-", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getVoucherTreasuryLabel(v_r8), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getVoucherCounterpartySummary(v_r8), " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r1.getTypeColor(v_r8.voucherType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatAmount(v_r8.amount), " ");
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r1.getTypeColor(v_r8.voucherType) + "18")("color", ctx_r1.getTypeColor(v_r8.voucherType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getTypeLabel(v_r8.voucherType), " ");
  }
}
function VouchersComponent_Conditional_53_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275repeaterCreate(1, VouchersComponent_Conditional_53_Conditional_1_For_2_Template, 31, 17, "div", 55, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredVouchers());
  }
}
function VouchersComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, VouchersComponent_Conditional_53_Conditional_0_Template, 8, 0, "div", 52)(1, VouchersComponent_Conditional_53_Conditional_1_Template, 3, 0, "div", 53);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.filteredVouchers().length === 0 ? 0 : 1);
  }
}
function VouchersComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_54_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showHowItWorks.set(false));
    });
    \u0275\u0275elementStart(1, "div", 72);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_54_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 73)(3, "div", 74)(4, "span", 4);
    \u0275\u0275text(5, "help_outline");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7, "\u0645\u0628\u062F\u0623 \u0627\u0644\u0639\u0645\u0644 - \u0627\u0644\u0633\u0646\u062F\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 75);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_54_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showHowItWorks.set(false));
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 76)(12, "div", 77)(13, "h3")(14, "span", 4);
    \u0275\u0275text(15, "call_received");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " \u0633\u0646\u062F \u0627\u0644\u0642\u0628\u0636");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p");
    \u0275\u0275text(18, " \u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0639\u0646\u062F ");
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20, "\u0627\u0633\u062A\u0644\u0627\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " \u0645\u0628\u0644\u063A \u0625\u0644\u0649 \u062E\u0632\u064A\u0646\u0629 \u0648\u0627\u062D\u062F\u0629 \u062B\u0627\u0628\u062A\u0629 \u0645\u0646 \u0639\u062F\u0629 \u0623\u0637\u0631\u0627\u0641 \u0639\u0628\u0631 \u0633\u0637\u0648\u0631 \u0627\u0644\u0633\u0646\u062F. ");
    \u0275\u0275element(22, "br");
    \u0275\u0275elementStart(23, "small");
    \u0275\u0275text(24, "\u0643\u0644 \u0633\u0637\u0631 \u064A\u0645\u062B\u0644 \u0637\u0631\u0641\u0627\u064B \u0645\u0627\u0644\u064A\u0627\u064B \u0645\u0642\u0627\u0628\u0644\u0627\u064B \u064A\u062F\u062E\u0644 \u0636\u0645\u0646 \u0646\u0641\u0633 \u0627\u0644\u0633\u0646\u062F.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 77)(26, "h3")(27, "span", 4);
    \u0275\u0275text(28, "call_made");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, " \u0633\u0646\u062F \u0627\u0644\u0635\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p");
    \u0275\u0275text(31, " \u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0639\u0646\u062F ");
    \u0275\u0275elementStart(32, "strong");
    \u0275\u0275text(33, "\u0635\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275text(34, " \u0645\u0628\u0644\u063A \u0645\u0646 \u062E\u0632\u064A\u0646\u0629 \u0648\u0627\u062D\u062F\u0629 \u062B\u0627\u0628\u062A\u0629 \u0625\u0644\u0649 \u0639\u062F\u0629 \u0623\u0637\u0631\u0627\u0641 \u0639\u0628\u0631 \u0633\u0637\u0648\u0631 \u0627\u0644\u0633\u0646\u062F. ");
    \u0275\u0275element(35, "br");
    \u0275\u0275elementStart(36, "small");
    \u0275\u0275text(37, "\u0645\u062C\u0645\u0648\u0639 \u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0633\u0637\u0648\u0631 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0633\u0627\u0648\u064A \u0645\u0628\u0644\u063A \u0627\u0644\u0633\u0646\u062F.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 77)(39, "h3")(40, "span", 4);
    \u0275\u0275text(41, "list_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, " \u0628\u0646\u0648\u062F \u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p");
    \u0275\u0275text(44, " \u0643\u0644 \u0628\u0646\u062F \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0646\u0648\u0639 \u062D\u0633\u0627\u0628 \u0641\u0631\u0639\u064A\u060C \u062D\u0633\u0627\u0628 \u0641\u0631\u0639\u064A\u060C \u0645\u0628\u0644\u063A\u060C \u0648\u0628\u064A\u0627\u0646 \u0645\u0633\u062A\u0642\u0644 \u062F\u0627\u062E\u0644 \u0646\u0641\u0633 \u0627\u0644\u0633\u0646\u062F. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 77)(46, "h3")(47, "span", 4);
    \u0275\u0275text(48, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(49, " \u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "p");
    \u0275\u0275text(51, " \u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F \u064A\u064F\u0648\u0644\u0651\u062F \u062D\u0633\u0628 ");
    \u0275\u0275elementStart(52, "strong");
    \u0275\u0275text(53, "\u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F + \u0643\u0648\u062F \u0627\u0644\u062E\u0632\u064A\u0646\u0629 + \u0627\u0644\u0633\u0646\u0629 + \u0627\u0644\u062A\u0633\u0644\u0633\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275text(54, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "p", 78);
    \u0275\u0275text(56, " FND-01-2025-\u0635\u0631\u0641-0001 \xA0| BNK-02-2025-\u0642\u0628\u0636-0003 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "p")(58, "small");
    \u0275\u0275text(59, "PREFIX = \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u2014 XX = \u0631\u0642\u0645\u0647\u0627 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A \u2014 YYYY = \u0627\u0644\u0633\u0646\u0629 \u2014 \u0627\u0644\u062A\u0633\u0644\u0633\u0644 \u064A\u0628\u062F\u0623 \u0645\u0646 ");
    \u0275\u0275elementStart(60, "strong");
    \u0275\u0275text(61, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275text(62, " \u0644\u0643\u0644 \u062E\u0632\u064A\u0646\u0629 \u0648\u0644\u0643\u0644 \u0633\u0646\u0629.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(63, "div", 77)(64, "h3")(65, "span", 4);
    \u0275\u0275text(66, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275text(67, " \u0627\u0644\u0645\u062E\u0627\u0632\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "p");
    \u0275\u0275text(69, " \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0644\u0647\u0627 \u0634\u0627\u0634\u0629 \u0645\u0633\u062A\u0642\u0644\u0629 \u0648\u0631\u0642\u0645 \u0639\u0645\u0644\u064A\u0629 \u0645\u0633\u062A\u0642\u0644 (\u0644\u064A\u0633\u062A \u0633\u0646\u062F\u0627\u062A \u0642\u0628\u0636/\u0635\u0631\u0641)\u060C \u0645\u062B\u0644: \u062A\u0648\u0631\u064A\u062F\u060C \u0635\u0631\u0641\u060C \u062A\u062D\u0648\u064A\u0644\u060C \u0627\u0633\u062A\u0644\u0627\u0645 \u062A\u062D\u0648\u064A\u0644. ");
    \u0275\u0275elementEnd()()()()();
  }
}
function VouchersComponent_Conditional_55_Conditional_46_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 118);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "mark", 117);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = \u0275\u0275nextContext().$implicit;
    const codeParts_r13 = \u0275\u0275nextContext(3).getTreasurySuggestionCodeParts(item_r12);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", codeParts_r13.before);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(codeParts_r13.match);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", codeParts_r13.after, ") ");
  }
}
function VouchersComponent_Conditional_55_Conditional_46_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 115);
    \u0275\u0275listener("mousedown", function VouchersComponent_Conditional_55_Conditional_46_For_2_Template_button_mousedown_0_listener($event) {
      return $event.preventDefault();
    })("click", function VouchersComponent_Conditional_55_Conditional_46_For_2_Template_button_click_0_listener() {
      const item_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectTreasurySuggestion(item_r12));
    });
    \u0275\u0275elementStart(1, "span", 116);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "mark", 117);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, VouchersComponent_Conditional_55_Conditional_46_For_2_Conditional_6_Template, 5, 3, "span", 118);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = ctx.$implicit;
    const \u0275$index_467_r14 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", \u0275$index_467_r14 === ctx_r1.activeTreasurySuggestionIndex());
    const nameParts_r15 = ctx_r1.getTreasurySuggestionNameParts(item_r12);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", nameParts_r15.before);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(nameParts_r15.match);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", nameParts_r15.after, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r12.code ? 6 : -1);
  }
}
function VouchersComponent_Conditional_55_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 95);
    \u0275\u0275repeaterCreate(1, VouchersComponent_Conditional_55_Conditional_46_For_2_Template, 7, 6, "button", 114, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredTreasuryOptions());
  }
}
function VouchersComponent_Conditional_55_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 96);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getTreasurySearchSummary());
  }
}
function VouchersComponent_Conditional_55_For_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const currency_r16 = ctx.$implicit;
    \u0275\u0275property("value", currency_r16.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", currency_r16.nameAr, " (", currency_r16.code, ")");
  }
}
function VouchersComponent_Conditional_55_Conditional_71_Template(rf, ctx) {
}
function VouchersComponent_Conditional_55_For_100_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 133);
    \u0275\u0275listener("mousedown", function VouchersComponent_Conditional_55_For_100_Conditional_8_For_2_Template_button_mousedown_0_listener($event) {
      return $event.preventDefault();
    })("click", function VouchersComponent_Conditional_55_For_100_Conditional_8_For_2_Template_button_click_0_listener() {
      const nature_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const \u0275$index_579_r18 = \u0275\u0275nextContext(2).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectLineSubNatureSuggestion(\u0275$index_579_r18, nature_r20));
    });
    \u0275\u0275elementStart(1, "span", 116);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "mark", 117);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const nature_r20 = ctx.$implicit;
    const \u0275$index_597_r21 = ctx.$index;
    const line_r22 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classProp("active", \u0275$index_597_r21 === (line_r22.activeSubNatureSuggestionIndex || -1));
    const nameParts_r23 = \u0275\u0275nextContext(2).getLineSubNatureNameParts(line_r22, nature_r20);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", nameParts_r23.before);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(nameParts_r23.match);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", nameParts_r23.after, " ");
  }
}
function VouchersComponent_Conditional_55_For_100_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 122);
    \u0275\u0275repeaterCreate(1, VouchersComponent_Conditional_55_For_100_Conditional_8_For_2_Template, 6, 5, "button", 132, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getLineSubNatureOptions(line_r22));
  }
}
function VouchersComponent_Conditional_55_For_100_Conditional_15_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 118);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "mark", 117);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const account_r25 = \u0275\u0275nextContext().$implicit;
    const line_r22 = \u0275\u0275nextContext(2).$implicit;
    const codeParts_r26 = \u0275\u0275nextContext(2).getLineAccountCodeParts(line_r22, account_r25);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", codeParts_r26.before);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(codeParts_r26.match);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", codeParts_r26.after, ") ");
  }
}
function VouchersComponent_Conditional_55_For_100_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 133);
    \u0275\u0275listener("mousedown", function VouchersComponent_Conditional_55_For_100_Conditional_15_For_2_Template_button_mousedown_0_listener($event) {
      return $event.preventDefault();
    })("click", function VouchersComponent_Conditional_55_For_100_Conditional_15_For_2_Template_button_click_0_listener() {
      const account_r25 = \u0275\u0275restoreView(_r24).$implicit;
      const \u0275$index_579_r18 = \u0275\u0275nextContext(2).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectLineAccountSuggestion(\u0275$index_579_r18, account_r25));
    });
    \u0275\u0275elementStart(1, "span", 116);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "mark", 117);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, VouchersComponent_Conditional_55_For_100_Conditional_15_For_2_Conditional_6_Template, 5, 3, "span", 118);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const account_r25 = ctx.$implicit;
    const \u0275$index_622_r27 = ctx.$index;
    const line_r22 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classProp("active", \u0275$index_622_r27 === (line_r22.activeAccountSuggestionIndex || -1));
    const nameParts_r28 = \u0275\u0275nextContext(2).getLineAccountNameParts(line_r22, account_r25);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", nameParts_r28.before);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(nameParts_r28.match);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", nameParts_r28.after, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(account_r25.code ? 6 : -1);
  }
}
function VouchersComponent_Conditional_55_For_100_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 122);
    \u0275\u0275repeaterCreate(1, VouchersComponent_Conditional_55_For_100_Conditional_15_For_2_Template, 7, 6, "button", 132, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r22 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getLineAccountOptions(line_r22));
  }
}
function VouchersComponent_Conditional_55_For_100_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 108)(1, "div", 119);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40)(4, "label", 49);
    \u0275\u0275text(5, "\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 120)(7, "input", 121);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_55_For_100_Template_input_input_7_listener($event) {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onLineSubNatureTyping(\u0275$index_579_r18, $event.target.value));
    })("focus", function VouchersComponent_Conditional_55_For_100_Template_input_focus_7_listener() {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onLineSubNatureFocus(\u0275$index_579_r18));
    })("blur", function VouchersComponent_Conditional_55_For_100_Template_input_blur_7_listener() {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onLineSubNatureBlur(\u0275$index_579_r18));
    })("keydown", function VouchersComponent_Conditional_55_For_100_Template_input_keydown_7_listener($event) {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onLineSubNatureKeydown(\u0275$index_579_r18, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, VouchersComponent_Conditional_55_For_100_Conditional_8_Template, 3, 0, "div", 122);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 40)(10, "label", 49);
    \u0275\u0275text(11, "\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 123)(13, "div", 120)(14, "input", 124);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_55_For_100_Template_input_input_14_listener($event) {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onLineAccountTyping(\u0275$index_579_r18, $event.target.value));
    })("focus", function VouchersComponent_Conditional_55_For_100_Template_input_focus_14_listener() {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onLineAccountFocus(\u0275$index_579_r18));
    })("blur", function VouchersComponent_Conditional_55_For_100_Template_input_blur_14_listener() {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onLineAccountBlur(\u0275$index_579_r18));
    })("keydown", function VouchersComponent_Conditional_55_For_100_Template_input_keydown_14_listener($event) {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onLineAccountKeydown(\u0275$index_579_r18, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, VouchersComponent_Conditional_55_For_100_Conditional_15_Template, 3, 0, "div", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 125);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_55_For_100_Template_input_input_16_listener($event) {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setLineAccountNumberFilter(\u0275$index_579_r18, $event.target.value));
    })("keydown", function VouchersComponent_Conditional_55_For_100_Template_input_keydown_16_listener($event) {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onVoucherLineFieldKeydown(\u0275$index_579_r18, "accountNumber", $event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 126)(18, "label", 49);
    \u0275\u0275text(19, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 127);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_55_For_100_Template_input_input_20_listener($event) {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateVoucherLine(\u0275$index_579_r18, "amount", $event.target.value));
    })("keydown", function VouchersComponent_Conditional_55_For_100_Template_input_keydown_20_listener($event) {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onVoucherLineFieldKeydown(\u0275$index_579_r18, "amount", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 128)(22, "label", 49);
    \u0275\u0275text(23, "\u0627\u0644\u0628\u064A\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 129);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_55_For_100_Template_input_input_24_listener($event) {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateVoucherLine(\u0275$index_579_r18, "notes", $event.target.value));
    })("keydown", function VouchersComponent_Conditional_55_For_100_Template_input_keydown_24_listener($event) {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onVoucherLineFieldKeydown(\u0275$index_579_r18, "notes", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 130)(26, "button", 131);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_55_For_100_Template_button_click_26_listener() {
      const \u0275$index_579_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeVoucherLine(\u0275$index_579_r18));
    });
    \u0275\u0275elementStart(27, "span", 4);
    \u0275\u0275text(28, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const line_r22 = ctx.$implicit;
    const \u0275$index_579_r18 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275$index_579_r18 + 1, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("value", line_r22.subNatureQuery || "");
    \u0275\u0275advance();
    \u0275\u0275conditional(line_r22.showSubNatureSuggestions && ctx_r1.getLineSubNatureOptions(line_r22).length > 0 ? 8 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", line_r22.accountQuery || "");
    \u0275\u0275advance();
    \u0275\u0275conditional(line_r22.showAccountSuggestions && ctx_r1.getLineAccountOptions(line_r22).length > 0 ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("value", line_r22.accountNumberFilter || "");
    \u0275\u0275advance(4);
    \u0275\u0275property("value", line_r22.amount);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", line_r22.notes);
  }
}
function VouchersComponent_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_55_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 79);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_55_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 73)(3, "div", 80)(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "h2");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 81);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 75);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_55_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275elementStart(12, "span", 4);
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 76)(15, "div", 82)(16, "div", 83)(17, "div", 84);
    \u0275\u0275text(18, "\u0661");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "\u0627\u0644\u062E\u0632\u064A\u0646\u0629");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 85)(22, "div", 40)(23, "label", 49);
    \u0275\u0275text(24, "\u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 ");
    \u0275\u0275elementStart(25, "span", 86);
    \u0275\u0275text(26, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "select", 87);
    \u0275\u0275listener("change", function VouchersComponent_Conditional_55_Template_select_change_27_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTreasuryType($event.target.value));
    });
    \u0275\u0275elementStart(28, "option", 47);
    \u0275\u0275text(29, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 88);
    \u0275\u0275text(31, "\u0635\u0646\u062F\u0648\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option", 89);
    \u0275\u0275text(33, "\u0628\u0646\u0643");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "option", 90);
    \u0275\u0275text(35, "\u0635\u0631\u0627\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "option", 91);
    \u0275\u0275text(37, "\u0645\u062D\u0641\u0638\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 40)(39, "label", 49);
    \u0275\u0275text(40);
    \u0275\u0275elementStart(41, "span", 86);
    \u0275\u0275text(42, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 92)(44, "div", 93)(45, "input", 94);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_55_Template_input_input_45_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTreasuryTyping($event.target.value));
    })("change", function VouchersComponent_Conditional_55_Template_input_change_45_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTreasuryInputCommit($event.target.value));
    })("focus", function VouchersComponent_Conditional_55_Template_input_focus_45_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTreasuryInputFocus());
    })("blur", function VouchersComponent_Conditional_55_Template_input_blur_45_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTreasuryInputBlur());
    })("keydown", function VouchersComponent_Conditional_55_Template_input_keydown_45_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTreasuryInputKeydown($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(46, VouchersComponent_Conditional_55_Conditional_46_Template, 3, 0, "div", 95);
    \u0275\u0275conditionalCreate(47, VouchersComponent_Conditional_55_Conditional_47_Template, 2, 1, "small", 96);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "input", 97);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_55_Template_input_input_48_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setTreasuryNumberFilter($event.target.value));
    })("keydown.enter", function VouchersComponent_Conditional_55_Template_input_keydown_enter_48_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyTreasuryNumberQuickPick());
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(49, "div", 98)(50, "div", 40)(51, "label", 49);
    \u0275\u0275text(52, "\u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275element(53, "input", 99);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(54, "div", 82)(55, "div", 83)(56, "div", 84);
    \u0275\u0275text(57, "\u0662");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "span");
    \u0275\u0275text(59, "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 85)(61, "div", 40)(62, "label", 49);
    \u0275\u0275text(63, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "input", 100);
    \u0275\u0275listener("change", function VouchersComponent_Conditional_55_Template_input_change_64_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFormField("voucherDate", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 40)(66, "label", 49);
    \u0275\u0275text(67, "\u0627\u0644\u0639\u0645\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "select", 101);
    \u0275\u0275listener("change", function VouchersComponent_Conditional_55_Template_select_change_68_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFormField("currencyId", +$event.target.value || 1));
    });
    \u0275\u0275repeaterCreate(69, VouchersComponent_Conditional_55_For_70_Template, 2, 3, "option", 48, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(71, VouchersComponent_Conditional_55_Conditional_71_Template, 0, 0);
    \u0275\u0275elementStart(72, "div", 85)(73, "div", 40)(74, "label", 49);
    \u0275\u0275text(75, "\u0645\u0628\u0644\u063A \u0627\u0644\u0633\u0646\u062F ");
    \u0275\u0275elementStart(76, "span", 86);
    \u0275\u0275text(77, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 102)(79, "input", 103);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_55_Template_input_input_79_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFormField("amount", $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "span", 104);
    \u0275\u0275text(81);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(82, "div", 40)(83, "label", 49);
    \u0275\u0275text(84, "\u0627\u0644\u0645\u0631\u062C\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "input", 105);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_55_Template_input_input_85_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFormField("reference", $event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(86, "div", 40)(87, "label", 49);
    \u0275\u0275text(88, "\u0628\u064A\u0627\u0646 \u0627\u0644\u0633\u0646\u062F ");
    \u0275\u0275elementStart(89, "span", 86);
    \u0275\u0275text(90, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "input", 106);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_55_Template_input_input_91_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFormField("description", $event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(92, "div", 82)(93, "div", 83)(94, "div", 84);
    \u0275\u0275text(95, "\u0663");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "span");
    \u0275\u0275text(97, "\u0633\u0637\u0648\u0631 \u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(98, "div", 107);
    \u0275\u0275repeaterCreate(99, VouchersComponent_Conditional_55_For_100_Template, 29, 8, "div", 108, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "div", 109)(102, "button", 110);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_55_Template_button_click_102_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addVoucherLine());
    });
    \u0275\u0275elementStart(103, "span", 4);
    \u0275\u0275text(104, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(105, " \u0625\u0636\u0627\u0641\u0629 \u0633\u0637\u0631 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(106, "div", 111)(107, "span");
    \u0275\u0275text(108);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(109, "span");
    \u0275\u0275text(110);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(111, "div", 112)(112, "button", 24);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_55_Template_button_click_112_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275text(113, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(114, "button", 113);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_55_Template_button_click_114_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveVoucher());
    });
    \u0275\u0275elementStart(115, "span", 4);
    \u0275\u0275text(116);
    \u0275\u0275elementEnd();
    \u0275\u0275text(117);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("receipt-header", ctx_r1.voucherType() === "receipt")("payment-header", ctx_r1.voucherType() === "payment");
    \u0275\u0275advance();
    \u0275\u0275classProp("receipt-icon", ctx_r1.voucherType() === "receipt")("payment-icon", ctx_r1.voucherType() === "payment");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.voucherType() === "receipt" ? "call_received" : "call_made");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.isEditing() ? ctx_r1.voucherType() === "receipt" ? "\u062A\u0639\u062F\u064A\u0644 \u0633\u0646\u062F \u0642\u0628\u0636" : "\u062A\u0639\u062F\u064A\u0644 \u0633\u0646\u062F \u0635\u0631\u0641" : ctx_r1.voucherType() === "receipt" ? "\u0633\u0646\u062F \u0642\u0628\u0636 \u062C\u062F\u064A\u062F" : "\u0633\u0646\u062F \u0635\u0631\u0641 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.isEditing() ? "\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u0646\u062F \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629" : ctx_r1.voucherType() === "receipt" ? "\u0627\u0633\u062A\u0644\u0627\u0645 \u0645\u0628\u0644\u063A \u0645\u0646 \u062D\u0633\u0627\u0628" : "\u062F\u0641\u0639 \u0645\u0628\u0644\u063A \u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275advance(17);
    \u0275\u0275property("value", ctx_r1.treasuryType() || "");
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getTreasuryFieldLabel(), " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("placeholder", ctx_r1.getTreasuryFieldPlaceholder())("value", ctx_r1.treasurySearchQuery());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showTreasurySuggestions() && ctx_r1.filteredTreasuryOptions().length > 0 ? 46 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.shouldShowTreasurySearchSummary() ? 47 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.treasuryNumberFilter());
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.previewLoading() ? "\u062C\u0627\u0631\u064A \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0631\u0642\u0645..." : ctx_r1.voucherNumberPreview() || "\u0633\u064A\u0638\u0647\u0631 \u0628\u0639\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062E\u0632\u064A\u0646\u0629");
    \u0275\u0275advance(11);
    \u0275\u0275property("value", ctx_r1.form().voucherDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.form().currencyId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.currencies());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.isEditing() ? 71 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275property("value", ctx_r1.form().amount);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getCurrencyLabel(ctx_r1.form().currencyId));
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.form().reference);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.form().description);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.voucherLines());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0637\u0648\u0631: ", ctx_r1.formatAmount(ctx_r1.getVoucherLinesTotal()));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0627\u0644\u0641\u0631\u0642: ", ctx_r1.formatAmount(ctx_r1.getVoucherAmountDifference()));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("btn-receipt", ctx_r1.voucherType() === "receipt")("btn-payment", ctx_r1.voucherType() === "payment");
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "sync" : "save");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? ctx_r1.isEditing() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B..." : "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : ctx_r1.isEditing() ? "\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u0646\u062F" : "\u062D\u0641\u0638 \u0627\u0644\u0633\u0646\u062F", " ");
  }
}
function VouchersComponent_Conditional_56_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 138)(1, "span", 141);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd()();
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 142)(1, "span", 149);
    \u0275\u0275text(2, "\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 150);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.detailsVoucher().fullSequenceNumber);
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143)(1, "span", 144);
    \u0275\u0275text(2, "\u0627\u0644\u062E\u0632\u064A\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 145);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 143)(6, "span", 144);
    \u0275\u0275text(7, "\u0627\u0644\u0633\u0646\u0629 / \u0627\u0644\u062A\u0633\u0644\u0633\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 145);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 143)(11, "span", 144);
    \u0275\u0275text(12, "\u0627\u0644\u0635\u064A\u063A\u0629 \u0627\u0644\u0645\u062E\u062A\u0635\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 151);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r1.getTreasuryKindLabel(((tmp_3_0 = ctx_r1.detailsVoucherNumberParts()) == null ? null : tmp_3_0.treasuryKindCode) || ""), " \u2022 \u0627\u0644\u0643\u0648\u062F ", (tmp_3_0 = ctx_r1.detailsVoucherNumberParts()) == null ? null : tmp_3_0.treasuryCode, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", (tmp_4_0 = ctx_r1.detailsVoucherNumberParts()) == null ? null : tmp_4_0.year, " / ", (tmp_4_0 = ctx_r1.detailsVoucherNumberParts()) == null ? null : tmp_4_0.serial);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate3(" ", (tmp_5_0 = ctx_r1.detailsVoucherNumberParts()) == null ? null : tmp_5_0.treasuryCode, "-", (tmp_5_0 = ctx_r1.detailsVoucherNumberParts()) == null ? null : tmp_5_0.year, "-", (tmp_5_0 = ctx_r1.detailsVoucherNumberParts()) == null ? null : tmp_5_0.serial, " ");
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143)(1, "span", 144);
    \u0275\u0275text(2, "\u0627\u0644\u062E\u0632\u064A\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 145);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getVoucherTreasuryLabel(ctx_r1.detailsVoucher()), " ");
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143)(1, "span", 144);
    \u0275\u0275text(2, "\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 145);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.detailsVoucher().accountSequence);
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143)(1, "span", 144);
    \u0275\u0275text(2, "\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0642\u0627\u0644\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 145);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.detailsVoucher().templateSequence);
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143)(1, "span", 144);
    \u0275\u0275text(2, "\u0645\u0646 \u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 145);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.detailsVoucher().fromAccountName || ctx_r1.getAccountName(ctx_r1.detailsVoucher().fromAccountId));
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143)(1, "span", 144);
    \u0275\u0275text(2, "\u0625\u0644\u0649 \u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 145);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.detailsVoucher().toAccountName || ctx_r1.getAccountName(ctx_r1.detailsVoucher().toAccountId));
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143)(1, "span", 144);
    \u0275\u0275text(2, "\u0627\u0644\u0645\u0631\u062C\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 145);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.detailsVoucher().reference);
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143)(1, "span", 144);
    \u0275\u0275text(2, "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 145);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getOpTypeName(ctx_r1.detailsVoucher().operationTypeId));
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Conditional_49_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 155);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 155);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 156);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r30 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(line_r30.accountName || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r30.lineType === "debit" ? "\u0645\u062F\u064A\u0646" : line_r30.lineType === "credit" ? "\u062F\u0627\u0626\u0646" : line_r30.lineType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(line_r30.amount));
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 148)(1, "div", 152);
    \u0275\u0275text(2, "\u0633\u0637\u0648\u0631 \u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u062A\u0628\u0637");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 153)(4, "div", 154);
    \u0275\u0275text(5, "\u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 154);
    \u0275\u0275text(7, "\u0627\u0644\u0637\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 154);
    \u0275\u0275text(9, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(10, VouchersComponent_Conditional_56_Conditional_13_Conditional_49_For_11_Template, 6, 3, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r1.getVoucherJournalLines(ctx_r1.detailsVoucher()));
  }
}
function VouchersComponent_Conditional_56_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 139);
    \u0275\u0275conditionalCreate(1, VouchersComponent_Conditional_56_Conditional_13_Conditional_1_Template, 5, 1, "div", 142);
    \u0275\u0275elementStart(2, "div", 143)(3, "span", 144);
    \u0275\u0275text(4, "\u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 145);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, VouchersComponent_Conditional_56_Conditional_13_Conditional_7_Template, 15, 7);
    \u0275\u0275conditionalCreate(8, VouchersComponent_Conditional_56_Conditional_13_Conditional_8_Template, 5, 1, "div", 143);
    \u0275\u0275conditionalCreate(9, VouchersComponent_Conditional_56_Conditional_13_Conditional_9_Template, 5, 1, "div", 143);
    \u0275\u0275conditionalCreate(10, VouchersComponent_Conditional_56_Conditional_13_Conditional_10_Template, 5, 1, "div", 143);
    \u0275\u0275elementStart(11, "div", 143)(12, "span", 144);
    \u0275\u0275text(13, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 145)(15, "span", 68);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 143)(18, "span", 144);
    \u0275\u0275text(19, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 146);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 143)(23, "span", 144);
    \u0275\u0275text(24, "\u0627\u0644\u0628\u064A\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 145);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 143)(28, "span", 144);
    \u0275\u0275text(29, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 145);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 143)(33, "span", 144);
    \u0275\u0275text(34, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 145)(36, "span", 147)(37, "span", 70);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(40, VouchersComponent_Conditional_56_Conditional_13_Conditional_40_Template, 5, 1, "div", 143);
    \u0275\u0275conditionalCreate(41, VouchersComponent_Conditional_56_Conditional_13_Conditional_41_Template, 5, 1, "div", 143);
    \u0275\u0275elementStart(42, "div", 143)(43, "span", 144);
    \u0275\u0275text(44, "\u0627\u0644\u0623\u0637\u0631\u0627\u0641 \u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 145);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(47, VouchersComponent_Conditional_56_Conditional_13_Conditional_47_Template, 5, 1, "div", 143);
    \u0275\u0275conditionalCreate(48, VouchersComponent_Conditional_56_Conditional_13_Conditional_48_Template, 5, 1, "div", 143);
    \u0275\u0275conditionalCreate(49, VouchersComponent_Conditional_56_Conditional_13_Conditional_49_Template, 12, 0, "div", 148);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.detailsVoucher().fullSequenceNumber ? 1 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.detailsVoucher().voucherNumber || "-");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.detailsVoucherNumberParts() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.detailsVoucherNumberParts() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.detailsVoucher().accountSequence ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.detailsVoucher().templateSequence ? 10 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275styleProp("background", ctx_r1.getTypeColor(ctx_r1.detailsVoucher().voucherType) + "18")("color", ctx_r1.getTypeColor(ctx_r1.detailsVoucher().voucherType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getTypeLabel(ctx_r1.detailsVoucher().voucherType), " ");
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("color", ctx_r1.getTypeColor(ctx_r1.detailsVoucher().voucherType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.formatAmount(ctx_r1.detailsVoucher().amount), " \u0631.\u064A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.detailsVoucher().description || "-");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatDateTime(ctx_r1.detailsVoucher().voucherDate || ctx_r1.detailsVoucher().createdAt));
    \u0275\u0275advance(5);
    \u0275\u0275styleProp("background", ctx_r1.getStatusColor(ctx_r1.detailsVoucher().status) + "18")("color", ctx_r1.getStatusColor(ctx_r1.detailsVoucher().status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getStatusIcon(ctx_r1.detailsVoucher().status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(ctx_r1.detailsVoucher().status), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.detailsVoucher().fromAccountId && !ctx_r1.isSystemCashAccount(ctx_r1.detailsVoucher().fromAccountName || ctx_r1.getAccountName(ctx_r1.detailsVoucher().fromAccountId)) ? 40 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.detailsVoucher().toAccountId && !ctx_r1.isSystemCashAccount(ctx_r1.detailsVoucher().toAccountName || ctx_r1.getAccountName(ctx_r1.detailsVoucher().toAccountId)) ? 41 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getVoucherCounterpartySummary(ctx_r1.detailsVoucher()));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.detailsVoucher().reference ? 47 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.detailsVoucher().operationTypeId ? 48 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getVoucherJournalLines(ctx_r1.detailsVoucher()).length > 0 ? 49 : -1);
  }
}
function VouchersComponent_Conditional_56_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 157)(1, "span", 158);
    \u0275\u0275text(2, "\u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 159);
    \u0275\u0275listener("change", function VouchersComponent_Conditional_56_Conditional_15_Template_select_change_3_listener($event) {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onDetailsStatusSelection($event.target.value));
    });
    \u0275\u0275elementStart(4, "option", 160);
    \u0275\u0275text(5, "\u063A\u064A\u0631 \u0645\u0631\u0627\u062C\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 161);
    \u0275\u0275text(7, "\u0645\u0631\u0627\u062C\u0639");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "button", 162);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_56_Conditional_15_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEditFromDetails());
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u062A\u0639\u062F\u064A\u0644 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 163);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_56_Conditional_15_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAttachmentsFromDetails());
    });
    \u0275\u0275elementStart(13, "span", 4);
    \u0275\u0275text(14, "attach_file");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 164);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_56_Conditional_15_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.printVoucher(ctx_r1.detailsVoucher()));
    });
    \u0275\u0275elementStart(17, "span", 4);
    \u0275\u0275text(18, "print");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, " \u0637\u0628\u0627\u0639\u0629 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 165);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_56_Conditional_15_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteDetailsVoucher());
    });
    \u0275\u0275elementStart(21, "span", 4);
    \u0275\u0275text(22, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, " \u062D\u0630\u0641 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.detailsVoucher().status || "unreviewed")("disabled", ctx_r1.saving());
  }
}
function VouchersComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_56_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetails());
    });
    \u0275\u0275elementStart(1, "div", 134);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_56_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 135)(3, "div", 136)(4, "span", 4);
    \u0275\u0275text(5, "receipt_long");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2", 137);
    \u0275\u0275text(7, "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 75);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_56_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetails());
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 76);
    \u0275\u0275conditionalCreate(12, VouchersComponent_Conditional_56_Conditional_12_Template, 3, 0, "div", 138)(13, VouchersComponent_Conditional_56_Conditional_13_Template, 50, 28, "div", 139);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 140);
    \u0275\u0275conditionalCreate(15, VouchersComponent_Conditional_56_Conditional_15_Template, 24, 2);
    \u0275\u0275elementStart(16, "button", 24);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_56_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetails());
    });
    \u0275\u0275text(17, "\u0625\u063A\u0644\u0627\u0642");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275conditional(ctx_r1.detailsLoading() ? 12 : ctx_r1.detailsVoucher() ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.detailsVoucher() ? 15 : -1);
  }
}
function VouchersComponent_Conditional_57_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 172);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A: ", ctx_r1.printingVoucher().fullSequenceNumber);
  }
}
function VouchersComponent_Conditional_57_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 178)(1, "span", 179);
    \u0275\u0275text(2, "\u0645\u0646 \u062D\u0633\u0627\u0628:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.printingVoucher().fromAccountName || ctx_r1.getAccountName(ctx_r1.printingVoucher().fromAccountId));
  }
}
function VouchersComponent_Conditional_57_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 178)(1, "span", 179);
    \u0275\u0275text(2, "\u0625\u0644\u0649 \u062D\u0633\u0627\u0628:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.printingVoucher().toAccountName || ctx_r1.getAccountName(ctx_r1.printingVoucher().toAccountId));
  }
}
function VouchersComponent_Conditional_57_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 178)(1, "span", 179);
    \u0275\u0275text(2, "\u0627\u0644\u0645\u0631\u062C\u0639:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.printingVoucher().reference);
  }
}
function VouchersComponent_Conditional_57_Conditional_60_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r33 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r33.accountName || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r33.lineType === "debit" ? "\u0645\u062F\u064A\u0646" : line_r33.lineType === "credit" ? "\u062F\u0627\u0626\u0646" : line_r33.lineType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(line_r33.amount));
  }
}
function VouchersComponent_Conditional_57_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 181)(1, "div", 184);
    \u0275\u0275text(2, "\u0633\u0637\u0648\u0631 \u0627\u0644\u062D\u0631\u0643\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 185)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "\u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "\u0627\u0644\u0637\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275repeaterCreate(13, VouchersComponent_Conditional_57_Conditional_60_For_14_Template, 7, 3, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r1.getVoucherJournalLines(ctx_r1.printingVoucher()));
  }
}
function VouchersComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 166);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_57_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePrintReport());
    });
    \u0275\u0275elementStart(1, "div", 167);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_57_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 168)(3, "div", 136)(4, "span", 4);
    \u0275\u0275text(5, "description");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2", 137);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 75);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_57_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePrintReport());
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 76)(12, "div", 169)(13, "div", 170)(14, "h2");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "h3", 171);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, VouchersComponent_Conditional_57_Conditional_18_Template, 2, 1, "p", 172);
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 173)(22, "span", 174);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 175);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 176);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 177);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 178)(31, "span", 179);
    \u0275\u0275text(32, "\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 178)(36, "span", 179);
    \u0275\u0275text(37, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span");
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 178)(41, "span", 179);
    \u0275\u0275text(42, "\u0627\u0644\u062D\u0627\u0644\u0629:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 178)(46, "span", 179);
    \u0275\u0275text(47, "\u0627\u0644\u062E\u0632\u064A\u0646\u0629:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span");
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(50, VouchersComponent_Conditional_57_Conditional_50_Template, 5, 1, "div", 178);
    \u0275\u0275conditionalCreate(51, VouchersComponent_Conditional_57_Conditional_51_Template, 5, 1, "div", 178);
    \u0275\u0275elementStart(52, "div", 180);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 178)(55, "span", 179);
    \u0275\u0275text(56, "\u0627\u0644\u0628\u064A\u0627\u0646:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "span");
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(59, VouchersComponent_Conditional_57_Conditional_59_Template, 5, 1, "div", 178);
    \u0275\u0275conditionalCreate(60, VouchersComponent_Conditional_57_Conditional_60_Template, 15, 0, "div", 181);
    \u0275\u0275elementStart(61, "div", 182)(62, "div", 183);
    \u0275\u0275text(63, "\u0627\u0644\u0645\u062D\u0627\u0633\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "div", 183);
    \u0275\u0275text(65, "\u0627\u0644\u0645\u062F\u064A\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 183);
    \u0275\u0275text(67, "\u0627\u0644\u0645\u0633\u062A\u0644\u0645");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(68, "div", 112)(69, "button", 24);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_57_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePrintReport());
    });
    \u0275\u0275text(70, "\u0625\u063A\u0644\u0627\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "button", 164);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_57_Template_button_click_71_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.printCurrentReport());
    });
    \u0275\u0275elementStart(72, "span", 4);
    \u0275\u0275text(73, "print");
    \u0275\u0275elementEnd();
    \u0275\u0275text(74, " \u0637\u0628\u0627\u0639\u0629 ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("\u062A\u0642\u0631\u064A\u0631 ", ctx_r1.getVoucherDocumentTitle(ctx_r1.printingVoucher()));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.biz.currentBusinessName() || "\u062D\u0633\u0627\u0628\u0627\u062A\u064A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getVoucherDocumentTitle(ctx_r1.printingVoucher()));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.printingVoucher().fullSequenceNumber ? 18 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F: ", ctx_r1.printingVoucher().voucherNumber || "-");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getVoucherDirectionLabel(ctx_r1.printingVoucher()));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0627\u0644\u062E\u0632\u064A\u0646\u0629: ", ctx_r1.getVoucherTreasuryLabel(ctx_r1.printingVoucher()));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0627\u0644\u0623\u0637\u0631\u0627\u0641: ", ctx_r1.getVoucherCounterpartySummary(ctx_r1.printingVoucher()));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel(ctx_r1.printingVoucher().status));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getVoucherDocumentTitle(ctx_r1.printingVoucher()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.printingVoucher().voucherDate || ctx_r1.printingVoucher().createdAt));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel(ctx_r1.printingVoucher().status));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getVoucherTreasuryLabel(ctx_r1.printingVoucher()));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.printingVoucher().fromAccountId && !ctx_r1.isSystemCashAccount(ctx_r1.printingVoucher().fromAccountName || ctx_r1.getAccountName(ctx_r1.printingVoucher().fromAccountId)) ? 50 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.printingVoucher().toAccountId && !ctx_r1.isSystemCashAccount(ctx_r1.printingVoucher().toAccountName || ctx_r1.getAccountName(ctx_r1.printingVoucher().toAccountId)) ? 51 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatAmount(ctx_r1.printingVoucher().amount), " \u0631.\u064A ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.printingVoucher().description || "-");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.printingVoucher().reference ? 59 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getVoucherJournalLines(ctx_r1.printingVoucher()).length > 0 ? 60 : -1);
  }
}
function VouchersComponent_Conditional_58_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 202)(1, "div", 203)(2, "span", 204);
    \u0275\u0275text(3, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 205);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 206);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "button", 207);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_58_Conditional_12_For_2_Template_button_click_9_listener() {
      const att_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeAttachment(att_r36.id));
    });
    \u0275\u0275elementStart(10, "span", 4);
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const att_r36 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(att_r36.fileName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(att_r36.description || att_r36.fileType);
  }
}
function VouchersComponent_Conditional_58_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 188);
    \u0275\u0275repeaterCreate(1, VouchersComponent_Conditional_58_Conditional_12_For_2_Template, 12, 2, "div", 202, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.attachments());
  }
}
function VouchersComponent_Conditional_58_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 189);
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A");
    \u0275\u0275elementEnd();
  }
}
function VouchersComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_58_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAttachments.set(false));
    });
    \u0275\u0275elementStart(1, "div", 186);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_58_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 187)(3, "div", 136)(4, "span", 4);
    \u0275\u0275text(5, "attach_file");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2", 137);
    \u0275\u0275text(7, "\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 75);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_58_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAttachments.set(false));
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 76);
    \u0275\u0275conditionalCreate(12, VouchersComponent_Conditional_58_Conditional_12_Template, 3, 0, "div", 188)(13, VouchersComponent_Conditional_58_Conditional_13_Template, 2, 0, "p", 189);
    \u0275\u0275elementStart(14, "div", 190)(15, "h4", 191);
    \u0275\u0275text(16, "\u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 192)(18, "input", 193);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_58_Template_input_input_18_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.attachmentForm.update((f) => __spreadProps(__spreadValues({}, f), { fileName: $event.target.value })));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 194);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_58_Template_input_input_19_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.attachmentForm.update((f) => __spreadProps(__spreadValues({}, f), { filePath: $event.target.value })));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 195)(21, "select", 196);
    \u0275\u0275listener("change", function VouchersComponent_Conditional_58_Template_select_change_21_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.attachmentForm.update((f) => __spreadProps(__spreadValues({}, f), { importance: $event.target.value })));
    });
    \u0275\u0275elementStart(22, "option", 197);
    \u0275\u0275text(23, "\u0639\u0627\u062C\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 198);
    \u0275\u0275text(25, "\u0645\u0647\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 199);
    \u0275\u0275text(27, "\u0639\u0627\u062F\u064A");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(28, "div");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 200);
    \u0275\u0275listener("input", function VouchersComponent_Conditional_58_Template_input_input_29_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.attachmentForm.update((f) => __spreadProps(__spreadValues({}, f), { description: $event.target.value })));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 201);
    \u0275\u0275listener("click", function VouchersComponent_Conditional_58_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addAttachment());
    });
    \u0275\u0275elementStart(31, "span", 4);
    \u0275\u0275text(32, "upload");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33, " \u0625\u0636\u0627\u0641\u0629 ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275conditional(ctx_r1.attachments().length > 0 ? 12 : 13);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.attachmentForm().fileName);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.attachmentForm().filePath);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r1.attachmentForm().importance || "\u0639\u0627\u062F\u064A");
    \u0275\u0275advance(8);
    \u0275\u0275property("value", ctx_r1.attachmentForm().description);
  }
}
var VouchersComponent = class _VouchersComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  vouchersLoadSeq = 0;
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
    /* istanbul ignore next */
    []
  ));
  vouchers = signal([], ...ngDevMode ? [{ debugName: "vouchers" }] : (
    /* istanbul ignore next */
    []
  ));
  operationTypes = signal([], ...ngDevMode ? [{ debugName: "operationTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  accounts = signal([], ...ngDevMode ? [{ debugName: "accounts" }] : (
    /* istanbul ignore next */
    []
  ));
  accountSubNatures = signal([], ...ngDevMode ? [{ debugName: "accountSubNatures" }] : (
    /* istanbul ignore next */
    []
  ));
  funds = signal([], ...ngDevMode ? [{ debugName: "funds" }] : (
    /* istanbul ignore next */
    []
  ));
  currencies = signal([], ...ngDevMode ? [{ debugName: "currencies" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  // UI State
  showHowItWorks = signal(false, ...ngDevMode ? [{ debugName: "showHowItWorks" }] : (
    /* istanbul ignore next */
    []
  ));
  showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : (
    /* istanbul ignore next */
    []
  ));
  activeTab = signal("all", ...ngDevMode ? [{ debugName: "activeTab" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedVoucher = signal(null, ...ngDevMode ? [{ debugName: "selectedVoucher" }] : (
    /* istanbul ignore next */
    []
  ));
  showAttachments = signal(false, ...ngDevMode ? [{ debugName: "showAttachments" }] : (
    /* istanbul ignore next */
    []
  ));
  attachmentTargetId = signal(null, ...ngDevMode ? [{ debugName: "attachmentTargetId" }] : (
    /* istanbul ignore next */
    []
  ));
  attachments = signal([], ...ngDevMode ? [{ debugName: "attachments" }] : (
    /* istanbul ignore next */
    []
  ));
  attachmentForm = signal({ fileName: "", filePath: "", fileType: "", description: "", importance: "\u0639\u0627\u062F\u064A" }, ...ngDevMode ? [{ debugName: "attachmentForm" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Enhanced Filters =====================
  filterDateFrom = signal("", ...ngDevMode ? [{ debugName: "filterDateFrom" }] : (
    /* istanbul ignore next */
    []
  ));
  filterDateTo = signal("", ...ngDevMode ? [{ debugName: "filterDateTo" }] : (
    /* istanbul ignore next */
    []
  ));
  filterStatus = signal("", ...ngDevMode ? [{ debugName: "filterStatus" }] : (
    /* istanbul ignore next */
    []
  ));
  filterStatusQuery = signal("", ...ngDevMode ? [{ debugName: "filterStatusQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  filterSearch = signal("", ...ngDevMode ? [{ debugName: "filterSearch" }] : (
    /* istanbul ignore next */
    []
  ));
  filterVoucherNumberQuery = signal("", ...ngDevMode ? [{ debugName: "filterVoucherNumberQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  filterMinAmount = signal(null, ...ngDevMode ? [{ debugName: "filterMinAmount" }] : (
    /* istanbul ignore next */
    []
  ));
  filterMaxAmount = signal(null, ...ngDevMode ? [{ debugName: "filterMaxAmount" }] : (
    /* istanbul ignore next */
    []
  ));
  filterOpTypeId = signal(null, ...ngDevMode ? [{ debugName: "filterOpTypeId" }] : (
    /* istanbul ignore next */
    []
  ));
  filterTreasuryType = signal("", ...ngDevMode ? [{ debugName: "filterTreasuryType" }] : (
    /* istanbul ignore next */
    []
  ));
  filterTreasuryTypeQuery = signal("", ...ngDevMode ? [{ debugName: "filterTreasuryTypeQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  filterTreasuryId = signal(null, ...ngDevMode ? [{ debugName: "filterTreasuryId" }] : (
    /* istanbul ignore next */
    []
  ));
  filterTreasuryQuery = signal("", ...ngDevMode ? [{ debugName: "filterTreasuryQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  showAdvancedFilters = signal(false, ...ngDevMode ? [{ debugName: "showAdvancedFilters" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Pagination =====================
  page = signal(1, ...ngDevMode ? [{ debugName: "page" }] : (
    /* istanbul ignore next */
    []
  ));
  pageSize = signal(20, ...ngDevMode ? [{ debugName: "pageSize" }] : (
    /* istanbul ignore next */
    []
  ));
  totalVouchers = signal(0, ...ngDevMode ? [{ debugName: "totalVouchers" }] : (
    /* istanbul ignore next */
    []
  ));
  sortBy = signal("voucher_date", ...ngDevMode ? [{ debugName: "sortBy" }] : (
    /* istanbul ignore next */
    []
  ));
  sortDir = signal("desc", ...ngDevMode ? [{ debugName: "sortDir" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Edit Mode =====================
  editingVoucher = signal(null, ...ngDevMode ? [{ debugName: "editingVoucher" }] : (
    /* istanbul ignore next */
    []
  ));
  isEditing = signal(false, ...ngDevMode ? [{ debugName: "isEditing" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Voucher Details Modal =====================
  showDetailsModal = signal(false, ...ngDevMode ? [{ debugName: "showDetailsModal" }] : (
    /* istanbul ignore next */
    []
  ));
  detailsVoucher = signal(null, ...ngDevMode ? [{ debugName: "detailsVoucher" }] : (
    /* istanbul ignore next */
    []
  ));
  detailsLoading = signal(false, ...ngDevMode ? [{ debugName: "detailsLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  detailsVoucherNumberParts = computed(() => this.parseTreasuryVoucherNumber(this.detailsVoucher()?.voucherNumber), ...ngDevMode ? [{ debugName: "detailsVoucherNumberParts" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Account Balance Display =====================
  accountBalances = signal({}, ...ngDevMode ? [{ debugName: "accountBalances" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Print =====================
  printingVoucher = signal(null, ...ngDevMode ? [{ debugName: "printingVoucher" }] : (
    /* istanbul ignore next */
    []
  ));
  showPrintReport = signal(false, ...ngDevMode ? [{ debugName: "showPrintReport" }] : (
    /* istanbul ignore next */
    []
  ));
  // Form state
  voucherType = signal("payment", ...ngDevMode ? [{ debugName: "voucherType" }] : (
    /* istanbul ignore next */
    []
  ));
  treasuryType = signal(null, ...ngDevMode ? [{ debugName: "treasuryType" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedTreasuryId = signal(null, ...ngDevMode ? [{ debugName: "selectedTreasuryId" }] : (
    /* istanbul ignore next */
    []
  ));
  treasuryNumberFilter = signal("", ...ngDevMode ? [{ debugName: "treasuryNumberFilter" }] : (
    /* istanbul ignore next */
    []
  ));
  treasurySearchQuery = signal("", ...ngDevMode ? [{ debugName: "treasurySearchQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  showTreasurySuggestions = signal(false, ...ngDevMode ? [{ debugName: "showTreasurySuggestions" }] : (
    /* istanbul ignore next */
    []
  ));
  activeTreasurySuggestionIndex = signal(-1, ...ngDevMode ? [{ debugName: "activeTreasurySuggestionIndex" }] : (
    /* istanbul ignore next */
    []
  ));
  previewLoading = signal(false, ...ngDevMode ? [{ debugName: "previewLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  voucherNumberPreview = signal("", ...ngDevMode ? [{ debugName: "voucherNumberPreview" }] : (
    /* istanbul ignore next */
    []
  ));
  voucherLines = signal([], ...ngDevMode ? [{ debugName: "voucherLines" }] : (
    /* istanbul ignore next */
    []
  ));
  form = signal({
    amount: "",
    description: "",
    voucherDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    reference: "",
    currencyId: 1,
    status: "unreviewed"
  }, ...ngDevMode ? [{ debugName: "form" }] : (
    /* istanbul ignore next */
    []
  ));
  treasuryOptions = computed(() => {
    const type = this.treasuryType();
    if (!type)
      return [];
    if (type === "fund") {
      return this.funds().map((fund) => __spreadProps(__spreadValues({}, fund), { label: fund.name })).sort((a, b) => this.compareTreasuryOptions(a, b));
    }
    return this.accounts().filter((account) => this.getAccountType(account) === type && account.isLeafAccount !== false).map((account) => __spreadProps(__spreadValues({}, account), { label: account.name })).sort((a, b) => this.compareTreasuryOptions(a, b));
  }, ...ngDevMode ? [{ debugName: "treasuryOptions" }] : (
    /* istanbul ignore next */
    []
  ));
  filteredTreasuryOptions = computed(() => {
    const numberFilter = String(this.treasuryNumberFilter() || "").trim();
    const textFilter = this.normalizeTreasurySearchText(this.treasurySearchQuery());
    let options = this.treasuryOptions();
    if (textFilter) {
      options = options.filter((item) => {
        const label = this.normalizeTreasurySearchText(item?.label || item?.name);
        const code = this.normalizeTreasurySearchText(item?.code);
        const optionText = this.normalizeTreasurySearchText(this.getTreasuryOptionText(item));
        return label.includes(textFilter) || code.includes(textFilter) || optionText.includes(textFilter);
      });
    }
    if (!numberFilter)
      return options;
    const parsed = Number.parseInt(numberFilter, 10);
    if (!Number.isInteger(parsed) || parsed <= 0)
      return options;
    return options.filter((item) => this.getTreasuryNumber(item) === parsed);
  }, ...ngDevMode ? [{ debugName: "filteredTreasuryOptions" }] : (
    /* istanbul ignore next */
    []
  ));
  counterpartyAccounts = computed(() => {
    return this.accounts().filter((account) => {
      const type = this.getAccountType(account);
      return !this.isTreasuryType(type) && account.isLeafAccount !== false;
    });
  }, ...ngDevMode ? [{ debugName: "counterpartyAccounts" }] : (
    /* istanbul ignore next */
    []
  ));
  counterpartySubNatures = computed(() => {
    const used = new Set(this.counterpartyAccounts().map((account) => account.accountSubNatureId).filter(Boolean));
    return this.accountSubNatures().filter((nature) => used.has(nature.id)).sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "ar"));
  }, ...ngDevMode ? [{ debugName: "counterpartySubNatures" }] : (
    /* istanbul ignore next */
    []
  ));
  filteredVouchers = computed(() => {
    const tab = this.activeTab();
    const voucherNumberQuery = normalizeSearchText(this.filterVoucherNumberQuery());
    const treasuryType = this.filterTreasuryType();
    const treasuryId = this.filterTreasuryId();
    return this.vouchers().filter((voucher) => {
      if (tab !== "all" && voucher.voucherType !== tab)
        return false;
      if (voucherNumberQuery) {
        const voucherNumber = String(voucher?.voucherNumber || voucher?.voucher_number || "");
        if (!matchesSearchQuery(voucherNumberQuery, voucherNumber))
          return false;
      }
      const treasury = this.getVoucherTreasuryMeta(voucher);
      if (treasuryType && treasury.type !== treasuryType)
        return false;
      if (treasuryId && treasury.id !== treasuryId)
        return false;
      return true;
    });
  }, ...ngDevMode ? [{ debugName: "filteredVouchers" }] : (
    /* istanbul ignore next */
    []
  ));
  filterTreasuryOptions = computed(() => {
    const type = this.filterTreasuryType();
    if (!type)
      return [];
    if (type === "fund") {
      return this.funds().map((fund) => ({ id: fund.id, label: `${fund.name}${fund.code ? ` (${fund.code})` : ""}` }));
    }
    return this.accounts().filter((account) => this.getAccountType(account) === type && account.isLeafAccount !== false).map((account) => ({ id: account.id, label: `${account.name}${account.code ? ` (${account.code})` : ""}` }));
  }, ...ngDevMode ? [{ debugName: "filterTreasuryOptions" }] : (
    /* istanbul ignore next */
    []
  ));
  filterVoucherNumberSuggestions = computed(() => {
    const selectedType = this.filterTreasuryType();
    const selectedTreasuryId = this.filterTreasuryId();
    const unique = /* @__PURE__ */ new Set();
    for (const row of this.vouchers()) {
      const treasury = this.getVoucherTreasuryMeta(row);
      if (selectedType && treasury.type !== selectedType)
        continue;
      if (selectedTreasuryId && treasury.id !== selectedTreasuryId)
        continue;
      const value = String(row?.voucherNumber || row?.voucher_number || "").trim();
      if (!value)
        continue;
      unique.add(value);
    }
    return Array.from(unique).slice(0, 25);
  }, ...ngDevMode ? [{ debugName: "filterVoucherNumberSuggestions" }] : (
    /* istanbul ignore next */
    []
  ));
  filterTreasuryTypeItems = [
    { value: "fund", label: "\u0635\u0646\u062F\u0648\u0642" },
    { value: "bank", label: "\u0628\u0646\u0643" },
    { value: "exchange", label: "\u0635\u0631\u0627\u0641" },
    { value: "e_wallet", label: "\u0645\u062D\u0641\u0638\u0629" }
  ];
  filterTreasuryTypeSuggestions = computed(() => {
    const query = normalizeSearchText(this.filterTreasuryTypeQuery());
    if (!query)
      return this.filterTreasuryTypeItems;
    return this.filterTreasuryTypeItems.filter((item) => matchesSearchQuery(query, item.label, item.value));
  }, ...ngDevMode ? [{ debugName: "filterTreasuryTypeSuggestions" }] : (
    /* istanbul ignore next */
    []
  ));
  filterTreasuryTypeSuggestionLabels = computed(() => [
    "\u0627\u0644\u0643\u0644",
    ...this.filterTreasuryTypeSuggestions().map((item) => item.label)
  ], ...ngDevMode ? [{ debugName: "filterTreasuryTypeSuggestionLabels" }] : (
    /* istanbul ignore next */
    []
  ));
  filterTreasurySuggestions = computed(() => {
    const query = normalizeSearchText(this.filterTreasuryQuery());
    const options = this.filterTreasuryOptions();
    if (!query)
      return options;
    return options.filter((item) => matchesSearchQuery(query, item.label, item.id));
  }, ...ngDevMode ? [{ debugName: "filterTreasurySuggestions" }] : (
    /* istanbul ignore next */
    []
  ));
  filterTreasurySuggestionLabels = computed(() => [
    "\u0627\u0644\u0643\u0644",
    ...this.filterTreasurySuggestions().map((item) => String(item.label || ""))
  ], ...ngDevMode ? [{ debugName: "filterTreasurySuggestionLabels" }] : (
    /* istanbul ignore next */
    []
  ));
  filterStatusSuggestions = computed(() => {
    const query = normalizeSearchText(this.filterStatusQuery());
    if (!query)
      return this.statusOptions;
    return this.statusOptions.filter((item) => matchesSearchQuery(query, item.label, item.value));
  }, ...ngDevMode ? [{ debugName: "filterStatusSuggestions" }] : (
    /* istanbul ignore next */
    []
  ));
  filterStatusSuggestionLabels = computed(() => [
    ...this.filterStatusSuggestions().map((item) => item.label)
  ], ...ngDevMode ? [{ debugName: "filterStatusSuggestionLabels" }] : (
    /* istanbul ignore next */
    []
  ));
  stats = computed(() => {
    const all = this.vouchers();
    const receipts = all.filter((v) => v.voucherType === "receipt");
    const payments = all.filter((v) => v.voucherType === "payment");
    const totalReceipt = receipts.reduce((s, v) => s + Number.parseFloat(v.amount || 0), 0);
    const totalPayment = payments.reduce((s, v) => s + Number.parseFloat(v.amount || 0), 0);
    const drafts = all.filter((v) => v.status === "unreviewed").length;
    const reviewed = all.filter((v) => v.status === "reviewed").length;
    return { total: all.length, receipts: receipts.length, payments: payments.length, totalReceipt, totalPayment, net: totalReceipt - totalPayment, unreviewed: drafts, reviewed };
  }, ...ngDevMode ? [{ debugName: "stats" }] : (
    /* istanbul ignore next */
    []
  ));
  get totalPages() {
    return Math.ceil(this.totalVouchers() / this.pageSize()) || 1;
  }
  tabs = [
    { value: "all", label: "\u0627\u0644\u0643\u0644", icon: "receipt_long", color: "#64748b" },
    { value: "receipt", label: "\u0633\u0646\u062F\u0627\u062A \u0627\u0644\u0642\u0628\u0636", icon: "call_received", color: "#22c55e" },
    { value: "payment", label: "\u0633\u0646\u062F\u0627\u062A \u0627\u0644\u0635\u0631\u0641", icon: "call_made", color: "#ef4444" }
  ];
  statusOptions = [
    { value: "", label: "\u0627\u0644\u0643\u0644", icon: "apps", color: "#64748b" },
    { value: "unreviewed", label: "\u063A\u064A\u0631 \u0645\u0631\u0627\u062C\u0639", icon: "pending", color: "#f59e0b" },
    { value: "reviewed", label: "\u0645\u0631\u0627\u062C\u0639", icon: "check_circle", color: "#22c55e" }
  ];
  onBizIdChange(_bizId) {
    void Promise.all([
      this.loadVouchers(),
      this.loadOperationTypes(),
      this.loadAccounts(),
      this.loadFunds(),
      this.loadAccountSubNatures(),
      this.loadCurrencies()
    ]);
  }
  async loadVouchers(options) {
    const silent = options?.silent === true;
    const requestSeq = ++this.vouchersLoadSeq;
    if (!silent)
      this.loading.set(true);
    try {
      const filters = {
        limit: this.pageSize(),
        offset: (this.page() - 1) * this.pageSize(),
        sortBy: this.sortBy(),
        sortDir: this.sortDir()
      };
      const tab = this.activeTab();
      if (tab !== "all")
        filters.type = tab;
      if (this.filterDateFrom())
        filters.dateFrom = this.filterDateFrom();
      if (this.filterDateTo())
        filters.dateTo = this.filterDateTo();
      if (this.filterStatus())
        filters.status = this.filterStatus();
      if (this.filterSearch())
        filters.search = this.filterSearch();
      if (this.filterVoucherNumberQuery()) {
        const voucherNumber = this.filterVoucherNumberQuery().trim();
        filters.voucherNumber = voucherNumber;
        if (!filters.search)
          filters.search = voucherNumber;
      }
      if (this.filterMinAmount())
        filters.minAmount = this.filterMinAmount();
      if (this.filterMaxAmount())
        filters.maxAmount = this.filterMaxAmount();
      if (this.filterOpTypeId())
        filters.operationTypeId = this.filterOpTypeId();
      if (this.filterTreasuryType())
        filters.treasuryType = this.filterTreasuryType();
      if (this.filterTreasuryId() !== null)
        filters.treasuryId = this.filterTreasuryId();
      const result = await this.api.getVouchersEnhanced(this.bizId, filters);
      if (requestSeq !== this.vouchersLoadSeq)
        return;
      const rawVouchers = result.vouchers || result;
      this.vouchers.set((rawVouchers || []).map((row) => this.normalizeVoucher(row)));
      this.totalVouchers.set(result.total || (rawVouchers || []).length);
      this.error.set("");
    } catch (e) {
      if (requestSeq !== this.vouchersLoadSeq)
        return;
      try {
        const data = await this.api.getVouchers(this.bizId);
        if (requestSeq !== this.vouchersLoadSeq)
          return;
        this.vouchers.set((data || []).map((row) => this.normalizeVoucher(row)));
        this.totalVouchers.set(data.length);
        this.error.set("");
      } catch (fallbackError) {
        if (requestSeq !== this.vouchersLoadSeq)
          return;
        this.error.set(fallbackError instanceof Error ? fallbackError.message : String(fallbackError));
      }
    } finally {
      if (!silent && requestSeq === this.vouchersLoadSeq)
        this.loading.set(false);
    }
  }
  async loadOperationTypes() {
    try {
      const data = await this.api.getOperationTypes(this.bizId);
      this.operationTypes.set(data);
    } catch {
    }
  }
  async loadAccounts() {
    try {
      const data = await this.api.getAccounts(this.bizId);
      this.accounts.set(data);
    } catch {
    }
  }
  async loadAccountSubNatures() {
    try {
      const data = await this.api.getAccountSubNatures(this.bizId);
      this.accountSubNatures.set(data || []);
    } catch {
    }
  }
  async loadFunds() {
    try {
      const data = await this.api.getFunds(this.bizId);
      this.funds.set(data);
    } catch {
    }
  }
  async loadCurrencies() {
    try {
      const data = await this.api.getCurrencies();
      this.currencies.set(data || []);
    } catch {
    }
  }
  // ===================== Filters =====================
  async applyFilters() {
    this.applyFilterTreasuryTypeQuery(this.filterTreasuryTypeQuery());
    this.applyFilterTreasuryQuery(this.filterTreasuryQuery());
    this.page.set(1);
    await this.loadVouchers();
  }
  async applyFiltersSilently() {
    this.applyFilterTreasuryTypeQuery(this.filterTreasuryTypeQuery());
    this.applyFilterTreasuryQuery(this.filterTreasuryQuery());
    this.page.set(1);
    await this.loadVouchers({ silent: true });
  }
  async clearFilters() {
    this.filterDateFrom.set("");
    this.filterDateTo.set("");
    this.filterStatus.set("");
    this.filterStatusQuery.set("");
    this.filterSearch.set("");
    this.filterVoucherNumberQuery.set("");
    this.filterMinAmount.set(null);
    this.filterMaxAmount.set(null);
    this.filterOpTypeId.set(null);
    this.filterTreasuryType.set("");
    this.filterTreasuryTypeQuery.set("");
    this.filterTreasuryId.set(null);
    this.filterTreasuryQuery.set("");
    this.page.set(1);
    await this.loadVouchers();
  }
  setFilterTreasuryType(value) {
    const normalized = String(value || "").toLowerCase();
    const valid = ["fund", "bank", "exchange", "e_wallet"];
    const resolved = valid.includes(normalized) ? normalized : "";
    const previous = this.filterTreasuryType();
    this.filterTreasuryType.set(resolved);
    this.filterTreasuryTypeQuery.set(resolved ? this.getFilterTreasuryTypeLabel(resolved) : "");
    if (previous !== resolved) {
      this.filterTreasuryId.set(null);
      this.filterTreasuryQuery.set("");
    }
  }
  setFilterVoucherNumberQuery(value) {
    const normalized = String(value || "");
    this.filterVoucherNumberQuery.set(normalized);
    this.filterSearch.set(normalized.trim());
  }
  async onFilterVoucherNumberCommitted(value) {
    this.setFilterVoucherNumberQuery(value);
    await this.applyFiltersSilently();
  }
  setFilterTreasuryTypeQuery(value) {
    const q = String(value || "");
    this.filterTreasuryTypeQuery.set(q);
    if (!q.trim())
      this.setFilterTreasuryType("");
  }
  applyFilterTreasuryTypeQuery(value) {
    const raw = String(value || "").trim();
    const normalizedInput = normalizeSearchText(raw);
    if (!normalizedInput || normalizedInput === normalizeSearchText("\u0627\u0644\u0643\u0644")) {
      this.setFilterTreasuryType("");
      return;
    }
    const exact = this.filterTreasuryTypeItems.find((item) => normalizeSearchText(item.label) === normalizedInput || normalizeSearchText(item.value) === normalizedInput);
    if (exact) {
      this.setFilterTreasuryType(exact.value);
      return;
    }
    const resolved = resolveSearchSelection(value, {
      candidates: this.filterTreasuryTypeItems,
      getPrimaryText: (item) => item.label,
      getAltTexts: (item) => [item.value],
      matchMode: "contains"
    });
    this.setFilterTreasuryType(resolved.matchedItem?.value || "");
  }
  async onFilterTreasuryTypeCommitted(value) {
    this.applyFilterTreasuryTypeQuery(value);
    await this.applyFiltersSilently();
  }
  setFilterTreasuryQuery(value) {
    const q = String(value || "");
    this.filterTreasuryQuery.set(q);
    if (!q.trim())
      this.filterTreasuryId.set(null);
  }
  applyFilterTreasuryQuery(value) {
    const raw = String(value || "").trim();
    const normalizedInput = normalizeSearchText(raw);
    if (!normalizedInput || normalizedInput === normalizeSearchText("\u0627\u0644\u0643\u0644")) {
      this.filterTreasuryId.set(null);
      this.filterTreasuryQuery.set("");
      return;
    }
    const options = this.filterTreasuryOptions();
    const exact = options.find((item) => normalizeSearchText(item.label) === normalizedInput || normalizeSearchText(item.id) === normalizedInput);
    if (exact) {
      this.filterTreasuryId.set(exact.id ?? -1);
      this.filterTreasuryQuery.set(exact.label || raw);
      return;
    }
    const resolved = resolveSearchSelection(value, {
      candidates: options,
      getPrimaryText: (item) => item.label,
      getAltTexts: (item) => [item.id],
      matchMode: "contains"
    });
    this.filterTreasuryId.set(resolved.matchedItem?.id ?? -1);
    this.filterTreasuryQuery.set(resolved.matchedItem?.label || raw);
  }
  async onFilterTreasuryCommitted(value) {
    this.applyFilterTreasuryQuery(value);
    await this.applyFiltersSilently();
  }
  setFilterStatusQuery(value) {
    this.filterStatusQuery.set(String(value || ""));
    if (!String(value || "").trim())
      this.filterStatus.set("");
  }
  applyFilterStatusQuery(value) {
    const raw = String(value || "").trim();
    const normalizedInput = normalizeSearchText(raw);
    if (!normalizedInput || normalizedInput === normalizeSearchText("\u0627\u0644\u0643\u0644")) {
      this.filterStatus.set("");
      this.filterStatusQuery.set("");
      return;
    }
    const exact = this.statusOptions.find((item) => normalizeSearchText(item.label) === normalizedInput || normalizeSearchText(item.value) === normalizedInput);
    if (exact) {
      this.filterStatus.set(String(exact.value || ""));
      this.filterStatusQuery.set(exact.label);
      return;
    }
    const resolved = resolveSearchSelection(value, {
      candidates: this.statusOptions,
      getPrimaryText: (item) => item.label,
      getAltTexts: (item) => [item.value],
      matchMode: "contains"
    });
    this.filterStatus.set(String(resolved.matchedItem?.value || ""));
    this.filterStatusQuery.set(resolved.matchedItem?.label || raw);
  }
  async onFilterStatusCommitted(value) {
    this.applyFilterStatusQuery(value);
    await this.applyFiltersSilently();
  }
  async onAdvancedDateFromChange(value) {
    this.filterDateFrom.set(String(value || ""));
    await this.applyFiltersSilently();
  }
  async onAdvancedDateToChange(value) {
    this.filterDateTo.set(String(value || ""));
    await this.applyFiltersSilently();
  }
  async onAdvancedStatusChange(value) {
    const normalized = String(value || "");
    this.filterStatus.set(normalized);
    this.filterStatusQuery.set(normalized ? this.statusOptions.find((item) => item.value === normalized)?.label || normalized : "");
    await this.applyFiltersSilently();
  }
  async onAdvancedMinAmountChange(value) {
    const parsed = Number.parseFloat(String(value || ""));
    this.filterMinAmount.set(Number.isFinite(parsed) ? parsed : null);
    await this.applyFiltersSilently();
  }
  async onAdvancedMaxAmountChange(value) {
    const parsed = Number.parseFloat(String(value || ""));
    this.filterMaxAmount.set(Number.isFinite(parsed) ? parsed : null);
    await this.applyFiltersSilently();
  }
  getFilterTreasuryTypeLabel(value) {
    return this.filterTreasuryTypeItems.find((item) => item.value === value)?.label || "";
  }
  getFilterHighlightParts(text, query) {
    return getSearchHighlightParts(text, query);
  }
  async switchTab(tab) {
    this.activeTab.set(tab);
    this.page.set(1);
    await this.loadVouchers();
  }
  // ===================== Pagination =====================
  async goToPage(p) {
    if (p < 1 || p > this.totalPages)
      return;
    this.page.set(p);
    await this.loadVouchers();
  }
  getPageNumbers() {
    const total = this.totalPages;
    const current = this.page();
    const pages = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    for (let i = start; i <= end; i++)
      pages.push(i);
    return pages;
  }
  // ===================== Sort =====================
  async toggleSort(column) {
    if (this.sortBy() === column) {
      this.sortDir.set(this.sortDir() === "asc" ? "desc" : "asc");
    } else {
      this.sortBy.set(column);
      this.sortDir.set("desc");
    }
    this.page.set(1);
    await this.loadVouchers();
  }
  // ===================== Create / Edit =====================
  openCreate(type) {
    this.voucherType.set(type);
    this.treasuryType.set(null);
    this.selectedTreasuryId.set(null);
    this.voucherNumberPreview.set("");
    this.isEditing.set(false);
    this.editingVoucher.set(null);
    this.form.set({
      amount: "",
      description: "",
      voucherDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      reference: "",
      currencyId: 1,
      status: "unreviewed"
    });
    this.voucherLines.set([this.createEmptyVoucherLine()]);
    this.showForm.set(true);
  }
  openEdit(voucher) {
    const normalized = this.normalizeVoucher(voucher);
    const status = String(normalized?.status || "").toLowerCase();
    if (status === "reviewed") {
      this.toast.warning("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0639\u062F\u064A\u0644 \u0633\u0646\u062F \u0645\u0631\u0627\u062C\u0639\u060C \u0642\u0645 \u0628\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0623\u0648\u0644\u0627\u064B.");
      return;
    }
    const treasury = this.getVoucherTreasuryMeta(normalized);
    this.voucherType.set(normalized?.voucherType === "receipt" ? "receipt" : "payment");
    this.treasuryType.set(treasury.type);
    this.selectedTreasuryId.set(treasury.id);
    this.treasuryNumberFilter.set("");
    this.treasurySearchQuery.set(this.getVoucherTreasuryLabel(normalized) === "-" ? "" : this.getVoucherTreasuryLabel(normalized));
    this.showTreasurySuggestions.set(false);
    this.activeTreasurySuggestionIndex.set(-1);
    this.voucherNumberPreview.set(String(normalized?.voucherNumber || ""));
    const amount = Number.parseFloat(String(normalized?.amount || 0));
    this.form.set({
      amount: Number.isFinite(amount) ? String(amount) : "",
      description: String(normalized?.description || ""),
      voucherDate: this.toDateInputValue(normalized?.voucherDate || normalized?.createdAt),
      reference: String(normalized?.reference || ""),
      currencyId: Number.parseInt(String(normalized?.currencyId || 1), 10) || 1,
      status: "unreviewed"
    });
    this.voucherLines.set(this.buildEditableVoucherLines(normalized));
    this.editingVoucher.set(normalized);
    this.isEditing.set(true);
    this.showForm.set(true);
  }
  addVoucherLine() {
    this.voucherLines.update((rows) => [...rows, this.createEmptyVoucherLine()]);
  }
  removeVoucherLine(index) {
    this.voucherLines.update((rows) => rows.filter((_, i) => i !== index));
    if (this.voucherLines().length === 0) {
      this.voucherLines.set([this.createEmptyVoucherLine()]);
    }
  }
  updateVoucherLine(index, field, value) {
    this.voucherLines.update((rows) => rows.map((row, i) => {
      if (i !== index)
        return row;
      if (field === "accountSubNatureId") {
        return __spreadProps(__spreadValues({}, row), {
          accountSubNatureId: value,
          accountId: null,
          accountQuery: "",
          accountNumberFilter: "",
          showAccountSuggestions: false,
          activeAccountSuggestionIndex: -1
        });
      }
      return __spreadProps(__spreadValues({}, row), { [field]: value });
    }));
  }
  patchVoucherLine(index, patch) {
    this.voucherLines.update((rows) => rows.map((row, i) => i === index ? __spreadValues(__spreadValues({}, row), patch) : row));
  }
  getLineAccounts(line) {
    const selectedTreasuryId = this.selectedTreasuryId();
    return this.counterpartyAccounts().filter((account) => {
      if (line.accountSubNatureId && account.accountSubNatureId !== line.accountSubNatureId)
        return false;
      if (selectedTreasuryId && this.treasuryType() !== "fund" && account.id === selectedTreasuryId)
        return false;
      return true;
    });
  }
  getLineSubNatureOptions(line) {
    const query = this.normalizeTreasurySearchText(line?.subNatureQuery || "");
    const all = this.counterpartySubNatures();
    if (!query)
      return all;
    return all.filter((nature) => this.normalizeTreasurySearchText(nature?.name).includes(query));
  }
  getLineAccountOptions(line) {
    let options = this.getLineAccounts(line);
    const query = this.normalizeTreasurySearchText(line?.accountQuery || "");
    const numberFilter = String(line?.accountNumberFilter || "").trim();
    if (query) {
      options = options.filter((account) => {
        const label = this.normalizeTreasurySearchText(account?.name);
        const code = this.normalizeTreasurySearchText(account?.code);
        const text = this.normalizeTreasurySearchText(this.getAccountOptionText(account));
        return label.includes(query) || code.includes(query) || text.includes(query);
      });
    }
    if (numberFilter) {
      const parsed = Number.parseInt(numberFilter, 10);
      if (Number.isInteger(parsed) && parsed > 0) {
        options = options.filter((account) => this.getTreasuryNumber(account) === parsed);
      }
    }
    return options;
  }
  getSubNatureOptionText(item) {
    return String(item?.name || "").trim();
  }
  getAccountOptionText(item) {
    if (!item)
      return "";
    const label = String(item?.name || "").trim();
    const code = String(item?.code || "").trim();
    return code ? `${label} (${code})` : label;
  }
  getTreasurySuggestionNameParts(item) {
    return this.getHighlightParts(String(item?.label || item?.name || ""), this.treasurySearchQuery());
  }
  getTreasurySuggestionCodeParts(item) {
    return this.getHighlightParts(String(item?.code || ""), this.treasurySearchQuery());
  }
  getLineSubNatureNameParts(line, nature) {
    return this.getHighlightParts(String(nature?.name || ""), line?.subNatureQuery || "");
  }
  getLineAccountNameParts(line, account) {
    return this.getHighlightParts(String(account?.name || ""), line?.accountQuery || "");
  }
  getLineAccountCodeParts(line, account) {
    return this.getHighlightParts(String(account?.code || ""), line?.accountQuery || "");
  }
  onLineSubNatureTyping(index, value) {
    this.patchVoucherLine(index, {
      subNatureQuery: String(value || ""),
      showSubNatureSuggestions: true,
      activeSubNatureSuggestionIndex: -1,
      accountSubNatureId: null,
      accountId: null,
      accountQuery: "",
      accountNumberFilter: "",
      showAccountSuggestions: false,
      activeAccountSuggestionIndex: -1
    });
    const line = this.voucherLines()[index];
    const options = this.getLineSubNatureOptions(line);
    if (options.length === 1) {
      this.selectLineSubNatureSuggestion(index, options[0]);
    }
  }
  onLineSubNatureFocus(index) {
    const line = this.voucherLines()[index];
    this.patchVoucherLine(index, { showSubNatureSuggestions: this.getLineSubNatureOptions(line).length > 0 });
  }
  onLineSubNatureBlur(index) {
    globalThis.setTimeout(() => {
      this.patchVoucherLine(index, { showSubNatureSuggestions: false, activeSubNatureSuggestionIndex: -1 });
    }, 120);
  }
  onLineSubNatureKeydown(index, event) {
    if (event.key === "F3") {
      event.preventDefault();
      this.copyLineFieldFromAbove(index, "subNature");
      return;
    }
    const line = this.voucherLines()[index];
    const options = this.getLineSubNatureOptions(line);
    if (!options.length)
      return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const current = line.activeSubNatureSuggestionIndex ?? -1;
      const dir = event.key === "ArrowDown" ? 1 : -1;
      const next = current < 0 ? dir > 0 ? 0 : options.length - 1 : (current + dir + options.length) % options.length;
      this.patchVoucherLine(index, { showSubNatureSuggestions: true, activeSubNatureSuggestionIndex: next });
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const idx = line.activeSubNatureSuggestionIndex ?? -1;
      if (line.showSubNatureSuggestions && idx >= 0 && idx < options.length) {
        this.selectLineSubNatureSuggestion(index, options[idx]);
      } else if (options.length === 1) {
        this.selectLineSubNatureSuggestion(index, options[0]);
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      this.patchVoucherLine(index, { showSubNatureSuggestions: false, activeSubNatureSuggestionIndex: -1 });
    }
  }
  selectLineSubNatureSuggestion(index, nature) {
    this.patchVoucherLine(index, {
      accountSubNatureId: nature?.id ?? null,
      subNatureQuery: this.getSubNatureOptionText(nature),
      showSubNatureSuggestions: false,
      activeSubNatureSuggestionIndex: -1,
      accountId: null,
      accountQuery: "",
      accountNumberFilter: "",
      showAccountSuggestions: false,
      activeAccountSuggestionIndex: -1
    });
  }
  onLineAccountTyping(index, value) {
    this.patchVoucherLine(index, {
      accountQuery: String(value || ""),
      showAccountSuggestions: true,
      activeAccountSuggestionIndex: -1,
      accountId: null
    });
    const line = this.voucherLines()[index];
    const options = this.getLineAccountOptions(line);
    if (options.length === 1) {
      this.selectLineAccountSuggestion(index, options[0]);
    }
  }
  onLineAccountFocus(index) {
    const line = this.voucherLines()[index];
    this.patchVoucherLine(index, { showAccountSuggestions: this.getLineAccountOptions(line).length > 0 });
  }
  onLineAccountBlur(index) {
    globalThis.setTimeout(() => {
      this.patchVoucherLine(index, { showAccountSuggestions: false, activeAccountSuggestionIndex: -1 });
    }, 120);
  }
  onLineAccountKeydown(index, event) {
    if (event.key === "F3") {
      event.preventDefault();
      this.copyLineFieldFromAbove(index, "account");
      return;
    }
    const line = this.voucherLines()[index];
    const options = this.getLineAccountOptions(line);
    if (!options.length)
      return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const current = line.activeAccountSuggestionIndex ?? -1;
      const dir = event.key === "ArrowDown" ? 1 : -1;
      const next = current < 0 ? dir > 0 ? 0 : options.length - 1 : (current + dir + options.length) % options.length;
      this.patchVoucherLine(index, { showAccountSuggestions: true, activeAccountSuggestionIndex: next });
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const idx = line.activeAccountSuggestionIndex ?? -1;
      if (line.showAccountSuggestions && idx >= 0 && idx < options.length) {
        this.selectLineAccountSuggestion(index, options[idx]);
      } else if (options.length === 1) {
        this.selectLineAccountSuggestion(index, options[0]);
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      this.patchVoucherLine(index, { showAccountSuggestions: false, activeAccountSuggestionIndex: -1 });
    }
  }
  setLineAccountNumberFilter(index, value) {
    this.patchVoucherLine(index, {
      accountNumberFilter: String(value || "").trim(),
      showAccountSuggestions: true,
      activeAccountSuggestionIndex: -1
    });
    const line = this.voucherLines()[index];
    const options = this.getLineAccountOptions(line);
    if (options.length === 1) {
      this.selectLineAccountSuggestion(index, options[0]);
    }
  }
  selectLineAccountSuggestion(index, account) {
    const accountNumber = this.getTreasuryNumber(account);
    const resolvedSubNatureId = account?.accountSubNatureId ? Number(account.accountSubNatureId) : null;
    const resolvedSubNatureName = resolvedSubNatureId ? this.accountSubNatures().find((nature) => nature.id === resolvedSubNatureId)?.name || "" : "";
    this.patchVoucherLine(index, {
      accountSubNatureId: resolvedSubNatureId,
      subNatureQuery: resolvedSubNatureName,
      accountId: account?.id ?? null,
      accountQuery: this.getAccountOptionText(account),
      accountNumberFilter: accountNumber !== null ? String(accountNumber) : "",
      showSubNatureSuggestions: false,
      activeSubNatureSuggestionIndex: -1,
      showAccountSuggestions: false,
      activeAccountSuggestionIndex: -1
    });
  }
  onVoucherLineFieldKeydown(index, field, event) {
    if (event.key !== "F3")
      return;
    event.preventDefault();
    this.copyLineFieldFromAbove(index, field);
  }
  copyLineFieldFromAbove(index, field) {
    if (index <= 0)
      return;
    const rows = this.voucherLines();
    const source = rows[index - 1];
    if (!source)
      return;
    if (field === "subNature") {
      this.patchVoucherLine(index, {
        accountSubNatureId: source.accountSubNatureId ?? null,
        subNatureQuery: String(source.subNatureQuery || ""),
        accountId: null,
        accountQuery: "",
        accountNumberFilter: "",
        showSubNatureSuggestions: false,
        activeSubNatureSuggestionIndex: -1,
        showAccountSuggestions: false,
        activeAccountSuggestionIndex: -1
      });
      return;
    }
    if (field === "account") {
      const accountId = source.accountId ? Number(source.accountId) : null;
      if (!accountId || !Number.isInteger(accountId) || accountId <= 0)
        return;
      const account = this.counterpartyAccounts().find((item) => item.id === accountId);
      if (!account)
        return;
      this.selectLineAccountSuggestion(index, account);
      return;
    }
    if (field === "amount") {
      this.updateVoucherLine(index, "amount", String(source.amount || ""));
      return;
    }
    if (field === "notes") {
      this.updateVoucherLine(index, "notes", String(source.notes || ""));
      return;
    }
    this.setLineAccountNumberFilter(index, String(source.accountNumberFilter || ""));
  }
  getVoucherLinesTotal() {
    return this.voucherLines().reduce((sum, row) => {
      const n = Number.parseFloat(String(row.amount || 0));
      return Number.isFinite(n) ? sum + n : sum;
    }, 0);
  }
  setTreasuryType(value) {
    const normalized = String(value || "").toLowerCase();
    const valid = ["fund", "bank", "exchange", "e_wallet"];
    this.treasuryType.set(valid.includes(normalized) ? normalized : null);
    this.selectedTreasuryId.set(null);
    this.treasuryNumberFilter.set("");
    this.treasurySearchQuery.set("");
    this.showTreasurySuggestions.set(false);
    this.activeTreasurySuggestionIndex.set(-1);
    this.voucherNumberPreview.set("");
  }
  setSelectedTreasury(value) {
    this.applyTreasurySelection(value ? Number(value) : null, true);
  }
  async refreshVoucherNumberPreview() {
    const treasuryType = this.treasuryType();
    const treasuryId = this.selectedTreasuryId();
    if (!treasuryType || !treasuryId) {
      this.voucherNumberPreview.set("");
      return;
    }
    this.previewLoading.set(true);
    try {
      const params = {
        voucherType: this.voucherType(),
        voucherDate: this.form().voucherDate || null
      };
      if (treasuryType === "fund") {
        if (this.voucherType() === "payment")
          params.fromFundId = treasuryId;
        else
          params.toFundId = treasuryId;
      } else {
        if (this.voucherType() === "payment")
          params.fromAccountId = treasuryId;
        else
          params.toAccountId = treasuryId;
      }
      const preview = await this.api.getVoucherNumberPreview(this.bizId, params);
      this.voucherNumberPreview.set(preview?.voucherNumber || "");
    } catch {
      this.voucherNumberPreview.set("");
    } finally {
      this.previewLoading.set(false);
    }
  }
  setFormField(field, value) {
    this.form.update((f) => __spreadProps(__spreadValues({}, f), { [field]: value }));
    if (field === "voucherDate") {
      void this.refreshVoucherNumberPreview();
    }
  }
  // ===================== Account Balance =====================
  async loadAccountBalance(accountId) {
    if (!accountId || this.accountBalances()[accountId] !== void 0)
      return;
    try {
      const result = await this.api.getAccountBalance(this.bizId, accountId);
      this.accountBalances.update((b) => __spreadProps(__spreadValues({}, b), { [accountId]: result.balance || 0 }));
    } catch {
    }
  }
  getAccountBalanceDisplay(accountId) {
    const bal = this.accountBalances()[accountId];
    if (bal === void 0)
      return "";
    return `\u0627\u0644\u0631\u0635\u064A\u062F: ${this.formatAmount(bal)}`;
  }
  // ===================== Save Voucher =====================
  async saveVoucher() {
    const f = this.form();
    const treasuryType = this.treasuryType();
    const treasuryId = this.selectedTreasuryId();
    const amount = Number.parseFloat(String(f.amount || 0));
    if (this.isEditing()) {
      const editing = this.editingVoucher();
      const editId = Number.parseInt(String(editing?.id ?? ""), 10);
      if (!Number.isInteger(editId) || editId <= 0) {
        this.error.set("\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0633\u0646\u062F \u0627\u0644\u0645\u0631\u0627\u062F \u062A\u0639\u062F\u064A\u0644\u0647");
        return;
      }
      if (!treasuryType || !treasuryId) {
        this.error.set("\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u062B\u0645 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0646\u0641\u0633\u0647\u0627");
        return;
      }
      if (!f.description?.trim()) {
        this.error.set("\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646 \u0627\u0644\u0633\u0646\u062F");
        return;
      }
      if (!Number.isFinite(amount) || amount <= 0) {
        this.error.set("\u0623\u062F\u062E\u0644 \u0645\u0628\u0644\u063A \u0627\u0644\u0633\u0646\u062F");
        return;
      }
      if (!String(f.voucherDate || "").trim()) {
        this.error.set("\u0623\u062F\u062E\u0644 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0633\u0646\u062F");
        return;
      }
      const entries2 = this.voucherLines().map((row) => ({
        accountSubNatureId: row.accountSubNatureId ? Number(row.accountSubNatureId) : null,
        accountId: row.accountId ? Number(row.accountId) : null,
        amount: Number.parseFloat(String(row.amount || 0)),
        notes: String(row.notes || "").trim() || null
      })).filter((row) => Number.isInteger(row.accountId) && row.accountId > 0 && Number.isFinite(row.amount) && row.amount > 0);
      if (entries2.length === 0) {
        this.error.set("\u0623\u062F\u062E\u0644 \u0633\u0637\u0631\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0641\u064A \u0628\u0646\u0648\u062F \u0627\u0644\u0633\u0646\u062F");
        return;
      }
      const linesTotal2 = entries2.reduce((sum, row) => sum + row.amount, 0);
      if (Math.abs(linesTotal2 - amount) > 1e-3) {
        this.error.set("\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0633\u0637\u0648\u0631 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0633\u0627\u0648\u064A \u0645\u0628\u0644\u063A \u0627\u0644\u0633\u0646\u062F");
        return;
      }
      this.saving.set(true);
      this.error.set("");
      try {
        const payload = {
          voucherType: this.voucherType(),
          description: String(f.description || "").trim(),
          reference: String(f.reference || "").trim() || null,
          amount: String(amount),
          voucherDate: String(f.voucherDate || ""),
          currencyId: f.currencyId || 1,
          entries: entries2.map((row) => ({
            accountId: row.accountId,
            amount: row.amount,
            notes: row.notes
          }))
        };
        if (treasuryType === "fund") {
          if (this.voucherType() === "payment")
            payload.fromFundId = treasuryId;
          else
            payload.toFundId = treasuryId;
        } else {
          if (this.voucherType() === "payment")
            payload.fromAccountId = treasuryId;
          else
            payload.toAccountId = treasuryId;
        }
        await this.api.updateVoucher(this.bizId, editId, payload);
        this.voucherNumberPreview.set(editing?.voucherNumber || "");
        this.treasurySearchQuery.set(this.getVoucherTreasuryLabel(editing));
        this.treasuryNumberFilter.set("");
        this.selectedTreasuryId.set(null);
        this.treasuryType.set(null);
        this.voucherLines.set([this.createEmptyVoucherLine()]);
        this.form.set({
          amount: "",
          description: "",
          voucherDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          reference: "",
          currencyId: 1,
          status: "unreviewed"
        });
        this.toast.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u0646\u062F \u0628\u0646\u062C\u0627\u062D");
        this.showForm.set(false);
        this.isEditing.set(false);
        this.editingVoucher.set(null);
        await this.loadVouchers();
      } catch (e) {
        this.error.set(e instanceof Error ? e.message : String(e));
      } finally {
        this.saving.set(false);
      }
      return;
    }
    if (!treasuryType || !treasuryId) {
      this.error.set("\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u062B\u0645 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0646\u0641\u0633\u0647\u0627");
      return;
    }
    if (!f.description?.trim()) {
      this.error.set("\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646 \u0627\u0644\u0633\u0646\u062F");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      this.error.set("\u0623\u062F\u062E\u0644 \u0645\u0628\u0644\u063A \u0627\u0644\u0633\u0646\u062F");
      return;
    }
    const entries = this.voucherLines().map((row) => ({
      accountSubNatureId: row.accountSubNatureId ? Number(row.accountSubNatureId) : null,
      accountId: row.accountId ? Number(row.accountId) : null,
      amount: Number.parseFloat(String(row.amount || 0)),
      notes: String(row.notes || "").trim() || null
    })).filter((row) => Number.isInteger(row.accountId) && row.accountId > 0 && Number.isFinite(row.amount) && row.amount > 0);
    if (entries.length === 0) {
      this.error.set("\u0623\u062F\u062E\u0644 \u0633\u0637\u0631\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0641\u064A \u0628\u0646\u0648\u062F \u0627\u0644\u0633\u0646\u062F");
      return;
    }
    const linesTotal = entries.reduce((sum, row) => sum + row.amount, 0);
    if (Math.abs(linesTotal - amount) > 1e-3) {
      this.error.set("\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0633\u0637\u0648\u0631 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0633\u0627\u0648\u064A \u0645\u0628\u0644\u063A \u0627\u0644\u0633\u0646\u062F");
      return;
    }
    this.saving.set(true);
    this.error.set("");
    try {
      const requestedStatus = "unreviewed";
      const payload = {
        voucherType: this.voucherType(),
        amount: String(amount),
        description: String(f.description || "").trim(),
        reference: String(f.reference || "").trim() || null,
        voucherDate: f.voucherDate,
        currencyId: f.currencyId || 1,
        status: requestedStatus,
        entries: entries.map((row) => ({
          accountId: row.accountId,
          amount: row.amount,
          notes: row.notes
        }))
      };
      if (treasuryType === "fund") {
        if (this.voucherType() === "payment")
          payload.fromFundId = treasuryId;
        else
          payload.toFundId = treasuryId;
      } else {
        if (this.voucherType() === "payment")
          payload.fromAccountId = treasuryId;
        else
          payload.toAccountId = treasuryId;
      }
      await this.api.createVoucherMulti(this.bizId, payload);
      this.toast.success(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 ${this.getTypeLabel(this.voucherType())} \u0628\u0646\u062C\u0627\u062D`);
      this.showForm.set(false);
      await this.loadVouchers();
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    } finally {
      this.saving.set(false);
    }
  }
  // ===================== Status Management =====================
  async changeStatus(voucher, newStatus) {
    const statusLabels = { unreviewed: "\u063A\u064A\u0631 \u0645\u0631\u0627\u062C\u0639", reviewed: "\u0645\u0631\u0627\u062C\u0639" };
    if (!statusLabels[newStatus])
      return false;
    const confirmed = await this.toast.confirm({
      title: `\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629 \u0625\u0644\u0649 ${statusLabels[newStatus]}`,
      message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062A\u063A\u064A\u064A\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u0646\u062F \u0631\u0642\u0645 ${voucher.voucherNumber} \u0625\u0644\u0649 "${statusLabels[newStatus]}"\u061F`,
      type: newStatus === "reviewed" ? "info" : "warning"
    });
    if (!confirmed)
      return false;
    this.saving.set(true);
    try {
      await this.api.changeVoucherStatus(this.bizId, voucher.id, newStatus);
      this.toast.success(`\u062A\u0645 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629 \u0625\u0644\u0649 ${statusLabels[newStatus]}`);
      await this.loadVouchers();
      return true;
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629");
      return false;
    } finally {
      this.saving.set(false);
    }
  }
  getStatusLabel(status) {
    const m = { unreviewed: "\u063A\u064A\u0631 \u0645\u0631\u0627\u062C\u0639", reviewed: "\u0645\u0631\u0627\u062C\u0639" };
    return m[status] || status;
  }
  getStatusIcon(status) {
    const m = { unreviewed: "pending", reviewed: "check_circle" };
    return m[status] || "help";
  }
  getStatusColor(status) {
    const m = { unreviewed: "#f59e0b", reviewed: "#22c55e" };
    return m[status] || "#64748b";
  }
  // ===================== Voucher Details =====================
  async openDetails(voucher) {
    this.detailsLoading.set(true);
    this.showDetailsModal.set(true);
    try {
      const details = await this.api.getVoucherDetails(this.bizId, voucher.id);
      const payload = details;
      const normalizedVoucher = this.normalizeVoucher(payload?.voucher ?? details);
      const journalEntries = Array.isArray(payload?.journalEntries) ? payload.journalEntries : Array.isArray(payload?.journal_entries) ? payload.journal_entries : Array.isArray(normalizedVoucher?.journalEntries) ? normalizedVoucher.journalEntries : [];
      this.detailsVoucher.set(__spreadProps(__spreadValues({}, normalizedVoucher), {
        journalEntries: journalEntries.map((line) => this.normalizeJournalLine(line))
      }));
    } catch (e) {
      this.detailsVoucher.set(this.normalizeVoucher(voucher));
    } finally {
      this.detailsLoading.set(false);
    }
  }
  closeDetails() {
    this.showDetailsModal.set(false);
    this.detailsVoucher.set(null);
  }
  async openAttachmentsFromDetails() {
    const voucher = this.detailsVoucher();
    const id = Number.parseInt(String(voucher?.id ?? ""), 10);
    if (!Number.isInteger(id) || id <= 0)
      return;
    this.closeDetails();
    await this.openAttachments(id);
  }
  async deleteDetailsVoucher() {
    const voucher = this.detailsVoucher();
    const id = Number.parseInt(String(voucher?.id ?? ""), 10);
    if (!Number.isInteger(id) || id <= 0)
      return;
    this.closeDetails();
    await this.deleteVoucher(id);
  }
  openEditFromDetails() {
    const voucher = this.detailsVoucher();
    if (!voucher)
      return;
    this.closeDetails();
    this.openEdit(voucher);
  }
  async changeDetailsStatus(newStatus) {
    const voucher = this.detailsVoucher();
    if (!voucher)
      return;
    this.closeDetails();
    await this.changeStatus(voucher, newStatus);
  }
  async onDetailsStatusSelection(newStatus) {
    const voucher = this.detailsVoucher();
    if (!voucher)
      return;
    const currentStatus = String(voucher.status || "").toLowerCase();
    const normalizedNext = String(newStatus || "").toLowerCase();
    if (!["unreviewed", "reviewed"].includes(normalizedNext) || normalizedNext === currentStatus)
      return;
    const changed = await this.changeStatus(voucher, normalizedNext);
    if (!changed)
      return;
    this.detailsVoucher.set(__spreadProps(__spreadValues({}, voucher), {
      status: normalizedNext
    }));
  }
  onVoucherRowKeydown(event, voucher) {
    if (event.key !== "Enter" && event.key !== " ")
      return;
    event.preventDefault();
    void this.openDetails(voucher);
  }
  // ===================== Print Voucher =====================
  async printVoucher(voucher) {
    const normalized = this.normalizeVoucher(voucher);
    let reportVoucher = normalized;
    if (normalized?.id) {
      try {
        const details = await this.api.getVoucherDetails(this.bizId, normalized.id);
        const payload = details;
        const normalizedVoucher = this.normalizeVoucher(payload?.voucher ?? details);
        const journalEntries = Array.isArray(payload?.journalEntries) ? payload.journalEntries : Array.isArray(payload?.journal_entries) ? payload.journal_entries : Array.isArray(normalizedVoucher?.journalEntries) ? normalizedVoucher.journalEntries : [];
        reportVoucher = __spreadProps(__spreadValues({}, normalizedVoucher), {
          journalEntries: journalEntries.map((line) => this.normalizeJournalLine(line))
        });
      } catch {
      }
    }
    this.printingVoucher.set(reportVoucher);
    this.showPrintReport.set(true);
  }
  printCurrentReport() {
    window.print();
  }
  closePrintReport() {
    this.showPrintReport.set(false);
    this.printingVoucher.set(null);
  }
  async deleteVoucher(id) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: "\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u0646\u062F\u061F", type: "danger" });
    if (!confirmed)
      return;
    try {
      await this.api.deleteVoucher(id);
      await this.loadVouchers();
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    }
  }
  // ========== المرفقات ==========
  async openAttachments(voucherId) {
    this.attachmentTargetId.set(voucherId);
    this.showAttachments.set(true);
    try {
      this.attachments.set(await this.api.getAttachments("voucher", voucherId));
    } catch {
      this.attachments.set([]);
    }
  }
  async addAttachment() {
    const f = this.attachmentForm();
    if (!f.fileName)
      return;
    try {
      await this.api.uploadAttachment(this.bizId, {
        entityType: "voucher",
        entityId: this.attachmentTargetId(),
        fileName: f.fileName,
        filePath: f.filePath,
        fileType: f.fileType || "application/octet-stream",
        description: f.description,
        importance: f.importance || "\u0639\u0627\u062F\u064A"
      });
      this.attachmentForm.set({ fileName: "", filePath: "", fileType: "", description: "", importance: "\u0639\u0627\u062F\u064A" });
      this.attachments.set(await this.api.getAttachments("voucher", this.attachmentTargetId()));
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    }
  }
  async removeAttachment(id) {
    try {
      await this.api.deleteAttachment(this.bizId, id);
      this.attachments.set(await this.api.getAttachments("voucher", this.attachmentTargetId()));
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    }
  }
  getAccountType(account) {
    const subNature = this.accountSubNatures().find((nature) => nature.id === account?.accountSubNatureId);
    if (subNature?.natureKey)
      return String(subNature.natureKey).toLowerCase();
    return String(account?.accountType ?? account?.account_type ?? "").toLowerCase();
  }
  isTreasuryType(type) {
    return type === "fund" || type === "bank" || type === "exchange" || type === "e_wallet";
  }
  getTreasuryTypeLabel(type) {
    const labels = {
      fund: "\u0635\u0646\u062F\u0648\u0642",
      bank: "\u0628\u0646\u0643",
      exchange: "\u0635\u0631\u0627\u0641",
      e_wallet: "\u0645\u062D\u0641\u0638\u0629"
    };
    return labels[String(type || "")] || "-";
  }
  getTreasuryTypeObjectLabel(type) {
    const labels = {
      fund: "\u0627\u0644\u0635\u0646\u062F\u0648\u0642",
      bank: "\u0627\u0644\u0628\u0646\u0643",
      exchange: "\u0627\u0644\u0635\u0631\u0627\u0641",
      e_wallet: "\u0627\u0644\u0645\u062D\u0641\u0638\u0629"
    };
    return labels[String(type || "")] || "\u0627\u0644\u062E\u0632\u064A\u0646\u0629";
  }
  getTreasuryFieldLabel() {
    const type = this.treasuryType();
    return type ? `\u0627\u062E\u062A\u0631 ${this.getTreasuryTypeObjectLabel(type)}` : "\u0627\u0644\u062E\u0632\u064A\u0646\u0629";
  }
  getTreasuryFieldPlaceholder() {
    const type = this.treasuryType();
    return type ? `\u0627\u062E\u062A\u0631 ${this.getTreasuryTypeObjectLabel(type)}...` : "\u0627\u062E\u062A\u0631 \u0627\u0644\u062E\u0632\u064A\u0646\u0629...";
  }
  setTreasuryNumberFilter(value) {
    this.treasuryNumberFilter.set(String(value || "").trim());
  }
  setTreasurySearchQuery(value) {
    this.treasurySearchQuery.set(String(value || "").trim());
  }
  onTreasuryTyping(value) {
    const typed = String(value || "");
    this.treasurySearchQuery.set(typed);
    this.showTreasurySuggestions.set(true);
    this.activeTreasurySuggestionIndex.set(-1);
    const needle = this.normalizeTreasurySearchText(typed);
    if (!needle) {
      this.applyTreasurySelection(null, false);
      return;
    }
    const options = this.filteredTreasuryOptions();
    if (options.length === 1) {
      this.applyTreasurySelection(options[0]?.id ?? null, false);
      return;
    }
    this.applyTreasurySelection(null, false);
  }
  onTreasuryInputCommit(value) {
    const typed = String(value || "").trim();
    this.treasurySearchQuery.set(typed);
    if (!typed) {
      this.setSelectedTreasury(null);
      this.showTreasurySuggestions.set(false);
      this.activeTreasurySuggestionIndex.set(-1);
      return;
    }
    const needle = this.normalizeTreasurySearchText(typed);
    const exact = this.treasuryOptions().find((item) => {
      const optionText = this.normalizeTreasurySearchText(this.getTreasuryOptionText(item));
      const label = this.normalizeTreasurySearchText(item?.label || item?.name);
      const code = this.normalizeTreasurySearchText(item?.code);
      return optionText === needle || label === needle || code === needle;
    });
    if (exact?.id) {
      this.applyTreasurySelection(exact.id, true);
      this.showTreasurySuggestions.set(false);
      this.activeTreasurySuggestionIndex.set(-1);
      return;
    }
    const options = this.filteredTreasuryOptions();
    if (options.length === 1) {
      this.applyTreasurySelection(options[0]?.id ?? null, true);
      this.showTreasurySuggestions.set(false);
      this.activeTreasurySuggestionIndex.set(-1);
      return;
    }
    this.applyTreasurySelection(null, false);
    this.showTreasurySuggestions.set(true);
  }
  onTreasuryInputFocus() {
    this.showTreasurySuggestions.set(this.filteredTreasuryOptions().length > 0);
  }
  onTreasuryInputBlur() {
    globalThis.setTimeout(() => {
      this.showTreasurySuggestions.set(false);
      this.activeTreasurySuggestionIndex.set(-1);
    }, 120);
  }
  onTreasuryInputKeydown(event) {
    const options = this.filteredTreasuryOptions();
    if (!options.length) {
      if (event.key === "Enter")
        this.onTreasuryInputCommit(this.treasurySearchQuery());
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      this.showTreasurySuggestions.set(true);
      const current = this.activeTreasurySuggestionIndex();
      const dir = event.key === "ArrowDown" ? 1 : -1;
      const next = current < 0 ? dir > 0 ? 0 : options.length - 1 : (current + dir + options.length) % options.length;
      this.activeTreasurySuggestionIndex.set(next);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const idx = this.activeTreasurySuggestionIndex();
      if (this.showTreasurySuggestions() && idx >= 0 && idx < options.length) {
        this.selectTreasurySuggestion(options[idx]);
      } else {
        this.onTreasuryInputCommit(this.treasurySearchQuery());
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      this.showTreasurySuggestions.set(false);
      this.activeTreasurySuggestionIndex.set(-1);
    }
  }
  selectTreasurySuggestion(item) {
    this.applyTreasurySelection(item?.id ?? null, true);
    this.showTreasurySuggestions.set(false);
    this.activeTreasurySuggestionIndex.set(-1);
  }
  getTreasurySearchSummary() {
    const query = String(this.treasurySearchQuery() || "").trim();
    if (!query)
      return "";
    const count = this.filteredTreasuryOptions().length;
    if (count === 0)
      return "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629";
    if (count === 1)
      return "\u0645\u0637\u0627\u0628\u0642\u0629 \u0648\u0627\u062D\u062F\u0629 - \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B";
    return `${count} \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629`;
  }
  shouldShowTreasurySearchSummary() {
    const query = String(this.treasurySearchQuery() || "").trim();
    if (!query)
      return false;
    if (this.selectedTreasuryId())
      return false;
    return true;
  }
  applyTreasuryNumberQuickPick() {
    const options = this.filteredTreasuryOptions();
    if (options.length === 1) {
      this.setSelectedTreasury(options[0]?.id ?? null);
    }
  }
  getSelectedTreasuryLabel() {
    const type = this.treasuryType();
    const id = this.selectedTreasuryId();
    if (!type || !id)
      return "-";
    const item = this.treasuryOptions().find((option) => option.id === id);
    return item?.name || item?.label || "-";
  }
  getSubNatureName(id) {
    if (!id)
      return "-";
    return this.accountSubNatures().find((nature) => nature.id === id)?.name || "-";
  }
  getCurrencyLabel(currencyId) {
    const currency = this.currencies().find((item) => item.id === currencyId);
    return currency?.nameAr || currency?.code || "\u0627\u0644\u0639\u0645\u0644\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629";
  }
  getVoucherAmountDifference() {
    const amount = Number.parseFloat(String(this.form().amount || 0));
    if (!Number.isFinite(amount))
      return 0;
    return amount - this.getVoucherLinesTotal();
  }
  getAccountName(id) {
    const acc = this.accounts().find((a) => a.id === id);
    return acc?.name || "-";
  }
  getFundName(id) {
    const fund = this.funds().find((f) => f.id === id);
    return fund?.name || "-";
  }
  getOpTypeName(id) {
    const ot = this.operationTypes().find((o) => o.id === id);
    return ot?.name || "";
  }
  getTypeLabel(t) {
    const m = { receipt: "\u0633\u0646\u062F \u0642\u0628\u0636", payment: "\u0633\u0646\u062F \u0635\u0631\u0641", transfer: "\u062A\u062D\u0648\u064A\u0644" };
    return m[t] || t;
  }
  getTypeIcon(t) {
    const m = { receipt: "call_received", payment: "call_made", transfer: "swap_horiz" };
    return m[t] || "receipt_long";
  }
  getTypeColor(t) {
    const m = { receipt: "#22c55e", payment: "#ef4444", transfer: "#3b82f6" };
    return m[t] || "#64748b";
  }
  getVoucherTreasuryLabel(voucher) {
    if (!voucher)
      return "-";
    if (voucher.voucherType === "payment") {
      return voucher.fromFundName || voucher.fromAccountName || (voucher.fromFundId ? this.getFundName(voucher.fromFundId) : "") || (voucher.fromAccountId ? this.getAccountName(voucher.fromAccountId) : "") || "-";
    }
    return voucher.toFundName || voucher.toAccountName || (voucher.toFundId ? this.getFundName(voucher.toFundId) : "") || (voucher.toAccountId ? this.getAccountName(voucher.toAccountId) : "") || "-";
  }
  getVoucherJournalLines(voucher) {
    if (!voucher)
      return [];
    return Array.isArray(voucher.journalEntries) ? voucher.journalEntries : [];
  }
  isSystemCashAccount(accountName) {
    const name = String(accountName || "").trim();
    if (!name)
      return false;
    return name.includes("\u062D\u0633\u0627\u0628 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 (\u0622\u0644\u064A)") || name.toLowerCase().includes("system_cash_treasury");
  }
  getVoucherCounterpartyLines(voucher) {
    const lines = this.getVoucherJournalLines(voucher);
    if (!Array.isArray(lines) || lines.length === 0)
      return [];
    const desiredLineType = voucher?.voucherType === "payment" ? "debit" : "credit";
    return lines.filter((line) => {
      const lineType = String(line?.lineType || "").toLowerCase();
      const accountName = String(line?.accountName || "");
      if (this.isSystemCashAccount(accountName))
        return false;
      return lineType === desiredLineType;
    });
  }
  getVoucherCounterpartySummary(voucher) {
    const names = Array.from(new Set(this.getVoucherCounterpartyLines(voucher).map((line) => String(line?.accountName || "").trim()).filter(Boolean)));
    if (names.length === 0)
      return "-";
    if (names.length <= 2)
      return names.join(" \u060C ");
    return `${names.slice(0, 2).join(" \u060C ")} +${names.length - 2}`;
  }
  getVoucherDocumentTitle(voucher) {
    const type = String(voucher?.voucherType || "").toLowerCase();
    if (type === "payment")
      return "\u0633\u0646\u062F \u0635\u0631\u0641";
    if (type === "receipt")
      return "\u0633\u0646\u062F \u0642\u0628\u0636";
    if (type === "transfer")
      return "\u0633\u0646\u062F \u062A\u062D\u0648\u064A\u0644";
    return "\u0633\u0646\u062F \u0645\u0627\u0644\u064A";
  }
  getVoucherDirectionLabel(voucher) {
    const type = String(voucher?.voucherType || "").toLowerCase();
    if (type === "payment")
      return "\u0635\u0631\u0641 \u0645\u0646 \u062E\u0632\u064A\u0646\u0629";
    if (type === "receipt")
      return "\u0642\u0628\u0636 \u0625\u0644\u0649 \u062E\u0632\u064A\u0646\u0629";
    if (type === "transfer")
      return "\u062A\u062D\u0648\u064A\u0644 \u0628\u064A\u0646 \u062D\u0633\u0627\u0628\u0627\u062A";
    return "\u062D\u0631\u0643\u0629 \u0645\u0627\u0644\u064A\u0629";
  }
  parseTreasuryVoucherNumber(voucherNumber) {
    if (!voucherNumber)
      return null;
    const parts = String(voucherNumber).split("-");
    if (parts.length !== 5)
      return null;
    const [voucherPrefix, treasuryKindCode, treasurySequence, year, serial] = parts;
    const vaultNo = Number.parseInt(treasurySequence, 10);
    const y = Number.parseInt(year, 10);
    const s = Number.parseInt(serial, 10);
    if (!Number.isInteger(vaultNo) || !Number.isInteger(y) || !Number.isInteger(s))
      return null;
    if (vaultNo <= 0 || y <= 0 || s <= 0)
      return null;
    return {
      voucherPrefix,
      treasuryKindCode,
      treasuryCode: `${treasuryKindCode}-${treasurySequence}`,
      treasurySequence: vaultNo,
      year: y,
      serial: s
    };
  }
  getTreasuryKindLabel(kindCode) {
    const m = { FND: "\u0635\u0646\u062F\u0648\u0642", BNK: "\u0628\u0646\u0643", EXC: "\u0635\u0631\u0627\u0641", WLT: "\u0645\u062D\u0641\u0638\u0629" };
    return m[kindCode] || kindCode;
  }
  formatAmount(amount) {
    return formatAmount(amount);
  }
  formatDate(d) {
    return formatDate(d || "");
  }
  formatDateTime(d) {
    return formatDateTime(d || "");
  }
  trackById(_, item) {
    return item.id;
  }
  getVoucherField(voucher, camel, snake) {
    if (!voucher)
      return void 0;
    if (voucher[camel] !== void 0 && voucher[camel] !== null)
      return voucher[camel];
    if (snake && voucher[snake] !== void 0 && voucher[snake] !== null)
      return voucher[snake];
    return void 0;
  }
  toDateInputValue(value) {
    const raw = String(value || "").trim();
    if (!raw)
      return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    if (raw.length >= 10 && raw[4] === "-" && raw[7] === "-")
      return raw.slice(0, 10);
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime()))
      return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    return parsed.toISOString().slice(0, 10);
  }
  buildEditableVoucherLines(voucher) {
    const lines = this.getVoucherCounterpartyLines(voucher);
    const mapped = lines.map((line) => {
      const accountId = Number.parseInt(String(line?.accountId ?? ""), 10);
      if (!Number.isInteger(accountId) || accountId <= 0)
        return null;
      const account = this.accounts().find((item) => item.id === accountId);
      const subNature = this.accountSubNatures().find((nature) => nature.id === account?.accountSubNatureId);
      const amount = Number.parseFloat(String(line?.amount ?? 0));
      return {
        accountSubNatureId: account?.accountSubNatureId ?? null,
        accountId,
        amount: Number.isFinite(amount) && amount > 0 ? String(amount) : "",
        notes: String(line?.description || ""),
        subNatureQuery: String(subNature?.name || ""),
        accountQuery: String(account?.name || line?.accountName || ""),
        accountNumberFilter: "",
        showSubNatureSuggestions: false,
        activeSubNatureSuggestionIndex: -1,
        showAccountSuggestions: false,
        activeAccountSuggestionIndex: -1
      };
    }).filter((line) => line !== null);
    return mapped.length > 0 ? mapped : [this.createEmptyVoucherLine()];
  }
  normalizeVoucher(voucher) {
    if (!voucher)
      return voucher;
    const normalized = __spreadProps(__spreadValues({}, voucher), {
      id: this.getVoucherField(voucher, "id", "id"),
      voucherNumber: this.getVoucherField(voucher, "voucherNumber", "voucher_number") || "",
      voucherType: this.getVoucherField(voucher, "voucherType", "voucher_type") || "",
      voucherDate: this.getVoucherField(voucher, "voucherDate", "voucher_date") || null,
      createdAt: this.getVoucherField(voucher, "createdAt", "created_at") || null,
      fromAccountId: this.getVoucherField(voucher, "fromAccountId", "from_account_id") || null,
      toAccountId: this.getVoucherField(voucher, "toAccountId", "to_account_id") || null,
      fromFundId: this.getVoucherField(voucher, "fromFundId", "from_fund_id") || null,
      toFundId: this.getVoucherField(voucher, "toFundId", "to_fund_id") || null,
      fromAccountName: this.getVoucherField(voucher, "fromAccountName", "from_account_name") || null,
      toAccountName: this.getVoucherField(voucher, "toAccountName", "to_account_name") || null,
      fromAccountType: this.getVoucherField(voucher, "fromAccountType", "from_account_type") || null,
      toAccountType: this.getVoucherField(voucher, "toAccountType", "to_account_type") || null,
      fromFundName: this.getVoucherField(voucher, "fromFundName", "from_fund_name") || null,
      toFundName: this.getVoucherField(voucher, "toFundName", "to_fund_name") || null,
      reference: this.getVoucherField(voucher, "reference", "reference") || null,
      status: this.getVoucherField(voucher, "status", "status") || null,
      amount: this.getVoucherField(voucher, "amount", "amount") || 0,
      fullSequenceNumber: this.getVoucherField(voucher, "fullSequenceNumber", "full_sequence_number") || null,
      accountSequence: this.getVoucherField(voucher, "accountSequence", "account_sequence") || null,
      operationTypeId: this.getVoucherField(voucher, "operationTypeId", "operation_type_id") || null,
      description: this.getVoucherField(voucher, "description", "description") || "",
      journalEntries: this.getVoucherField(voucher, "journalEntries", "journal_entries") || []
    });
    return normalized;
  }
  getVoucherTreasuryMeta(voucher) {
    if (!voucher)
      return { type: null, id: null };
    const normalized = this.normalizeVoucher(voucher);
    const vType = String(normalized.voucherType || "").toLowerCase();
    const isPayment = vType === "payment";
    const fundIdRaw = isPayment ? normalized.fromFundId : normalized.toFundId;
    const accountIdRaw = isPayment ? normalized.fromAccountId : normalized.toAccountId;
    const accountTypeRaw = isPayment ? normalized.fromAccountType : normalized.toAccountType;
    const fundId = Number.parseInt(String(fundIdRaw ?? ""), 10);
    if (Number.isInteger(fundId) && fundId > 0) {
      return { type: "fund", id: fundId };
    }
    const accountId = Number.parseInt(String(accountIdRaw ?? ""), 10);
    if (!Number.isInteger(accountId) || accountId <= 0) {
      return { type: null, id: null };
    }
    let resolvedType = String(accountTypeRaw || "").toLowerCase();
    if (!resolvedType) {
      const account = this.accounts().find((item) => item.id === accountId);
      if (account)
        resolvedType = this.getAccountType(account);
    }
    if (resolvedType === "bank" || resolvedType === "exchange" || resolvedType === "e_wallet") {
      return { type: resolvedType, id: accountId };
    }
    return { type: null, id: accountId };
  }
  normalizeJournalLine(line) {
    if (!line)
      return line;
    return __spreadProps(__spreadValues({}, line), {
      accountName: line.accountName ?? line.account_name ?? "-",
      lineType: line.lineType ?? line.line_type ?? "-",
      amount: line.amount ?? line.lineAmount ?? line.line_amount ?? 0,
      description: line.description ?? line.lineDescription ?? line.line_description ?? ""
    });
  }
  getTreasuryNumber(item) {
    if (!item)
      return null;
    const code = String(item.code || "");
    const codeMatch = code.match(/-(\d+)$/);
    if (codeMatch?.[1]) {
      const n = Number.parseInt(codeMatch[1], 10);
      if (Number.isInteger(n) && n > 0)
        return n;
    }
    const seq = Number.parseInt(String(item.sequenceNumber ?? ""), 10);
    if (Number.isInteger(seq) && seq > 0)
      return seq;
    const id = Number.parseInt(String(item.id ?? ""), 10);
    if (Number.isInteger(id) && id > 0)
      return id;
    return null;
  }
  getTreasuryOptionText(item) {
    if (!item)
      return "";
    const label = String(item?.label || item?.name || "").trim();
    const code = String(item?.code || "").trim();
    return code ? `${label} (${code})` : label;
  }
  applyTreasurySelection(rawId, syncInputText) {
    const treasuryId = rawId ? Number(rawId) : null;
    const selectedId = Number.isInteger(treasuryId) && treasuryId > 0 ? treasuryId : null;
    this.selectedTreasuryId.set(selectedId);
    const selectedItem = selectedId ? this.treasuryOptions().find((option) => option.id === selectedId) : null;
    const selectedNumber = this.getTreasuryNumber(selectedItem);
    this.treasuryNumberFilter.set(selectedNumber !== null ? String(selectedNumber) : "");
    if (syncInputText) {
      this.treasurySearchQuery.set(selectedItem ? this.getTreasuryOptionText(selectedItem) : "");
    }
    if (this.treasuryType() !== "fund" && selectedId) {
      void this.loadAccountBalance(selectedId);
    }
    void this.refreshVoucherNumberPreview();
  }
  normalizeTreasurySearchText(value) {
    return normalizeSearchText(value);
  }
  getHighlightParts(text, query) {
    return getSearchHighlightParts(text, query);
  }
  createEmptyVoucherLine() {
    return {
      accountSubNatureId: null,
      accountId: null,
      amount: "",
      notes: "",
      subNatureQuery: "",
      accountQuery: "",
      accountNumberFilter: "",
      showSubNatureSuggestions: false,
      activeSubNatureSuggestionIndex: -1,
      showAccountSuggestions: false,
      activeAccountSuggestionIndex: -1
    };
  }
  compareTreasuryOptions(a, b) {
    const na = this.getTreasuryNumber(a);
    const nb = this.getTreasuryNumber(b);
    if (na !== null && nb !== null && na !== nb)
      return na - nb;
    if (na !== null && nb === null)
      return -1;
    if (na === null && nb !== null)
      return 1;
    return String(a?.label || a?.name || "").localeCompare(String(b?.label || b?.name || ""), "ar");
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275VouchersComponent_BaseFactory;
    return function VouchersComponent_Factory(__ngFactoryType__) {
      return (\u0275VouchersComponent_BaseFactory || (\u0275VouchersComponent_BaseFactory = \u0275\u0275getInheritedFactory(_VouchersComponent)))(__ngFactoryType__ || _VouchersComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VouchersComponent, selectors: [["app-vouchers"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 59, vars: 22, consts: [[1, "page-container"], [1, "page-header"], [1, "header-left"], [1, "page-icon-3d", "green"], [1, "material-icons-round"], [1, "page-title"], [1, "page-subtitle"], [1, "header-right"], ["title", "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F", 1, "help-btn", 3, "click"], ["title", "\u0625\u0646\u0634\u0627\u0621 \u0633\u0646\u062F \u0642\u0628\u0636", 1, "btn-3d", "btn-receipt", 3, "click"], ["title", "\u0625\u0646\u0634\u0627\u0621 \u0633\u0646\u062F \u0635\u0631\u0641", 1, "btn-3d", "btn-payment", 3, "click"], [1, "btn-3d", "btn-primary", 3, "routerLink"], [1, "alert-error"], [1, "stats-row"], [1, "tabs-bar"], [1, "tab-btn", 3, "active", "--tab-color"], [1, "filters-card"], [1, "filters-row"], ["inputId", "voucher-filter-number", "label", "\u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F", "title", "\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F", "placeholder", "\u0627\u0643\u062A\u0628 \u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F...", 3, "valueChange", "committed", "value", "suggestions"], ["inputId", "voucher-filter-treasury-type", "label", "\u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629", "title", "\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629", "placeholder", "\u0627\u0644\u0643\u0644 / \u0635\u0646\u062F\u0648\u0642 / \u0628\u0646\u0643 / \u0635\u0631\u0627\u0641 / \u0645\u062D\u0641\u0638\u0629", 3, "valueChange", "committed", "value", "suggestions"], ["inputId", "voucher-filter-treasury", "label", "\u0627\u0644\u062E\u0632\u064A\u0646\u0629", "title", "\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u0627\u0644\u062E\u0632\u064A\u0646\u0629", "placeholder", "\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u062E\u0632\u064A\u0646\u0629...", 3, "valueChange", "committed", "value", "suggestions"], ["inputId", "voucher-filter-status-main", "label", "\u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u0646\u062F", "title", "\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u0646\u062F", "placeholder", "\u0627\u0644\u0643\u0644 / \u0645\u0633\u0648\u062F\u0629 / \u0645\u0639\u062A\u0645\u062F / \u0645\u0644\u063A\u064A", 3, "valueChange", "committed", "value", "suggestions"], [1, "filters-actions"], [1, "btn-3d", "btn-primary", 3, "click"], [1, "btn-3d", "btn-ghost", 3, "click"], [1, "filters-row", "advanced"], [1, "loading-grid"], [1, "modal-overlay"], [1, "modal-overlay", "print-preview-overlay"], [1, "alert-error", 3, "click"], [1, "close-x"], [1, "stat-card-3d", "total"], [1, "sc-icon"], [1, "sc-body"], [1, "sc-num"], [1, "sc-label"], [1, "stat-card-3d", "receipt"], [1, "sc-amount"], [1, "stat-card-3d", "payment"], [1, "tab-btn", 3, "click"], [1, "form-group"], ["for", "voucher-filter-date-from", 1, "form-label"], ["id", "voucher-filter-date-from", "type", "date", "title", "\u0645\u0646 \u062A\u0627\u0631\u064A\u062E", 1, "form-input", 3, "change", "value"], ["for", "voucher-filter-date-to", 1, "form-label"], ["id", "voucher-filter-date-to", "type", "date", "title", "\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E", 1, "form-input", 3, "change", "value"], ["for", "voucher-filter-status", 1, "form-label"], ["id", "voucher-filter-status", "title", "\u0627\u0644\u062D\u0627\u0644\u0629", 1, "form-select", 3, "change", "value"], ["value", ""], [3, "value"], [1, "form-label"], ["type", "number", "placeholder", "0", 1, "form-input", 3, "change", "value"], [1, "skeleton-row"], [1, "empty-state"], [1, "vouchers-list"], [1, "empty-icon-3d"], ["role", "button", "tabindex", "0", 1, "voucher-row-3d", 3, "--v-color"], ["role", "button", "tabindex", "0", 1, "voucher-row-3d", 3, "click", "keydown"], [1, "vr-type-indicator"], [1, "vr-icon"], [1, "vr-main"], [1, "vr-desc"], [1, "vr-seq-badge", 3, "color"], [1, "vr-meta"], [1, "vr-date"], [1, "vr-number"], [1, "vr-account"], [1, "vr-right"], [1, "vr-amount"], [1, "vr-type-badge"], [1, "vr-seq-badge"], [1, "material-icons-round", 2, "font-size", "14px"], [1, "modal-overlay", 3, "click"], [1, "modal-3d", "hiw-modal", 3, "click"], [1, "modal-header"], [1, "modal-icon", "amber"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "hiw-section"], ["dir", "ltr", 2, "font-family", "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace"], [1, "modal-3d", "form-modal", 3, "click"], [1, "modal-icon"], [1, "modal-subtitle"], [1, "form-step"], [1, "step-header"], [1, "step-num"], [1, "form-row"], [1, "required"], ["title", "\u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629", 1, "form-select", 3, "change", "value"], ["value", "fund"], ["value", "bank"], ["value", "exchange"], ["value", "e_wallet"], [1, "treasury-picker"], [1, "treasury-autocomplete"], ["type", "text", "title", "\u0627\u0644\u062E\u0632\u064A\u0646\u0629", "autocomplete", "off", 1, "form-input", 3, "input", "change", "focus", "blur", "keydown", "placeholder", "value"], [1, "treasury-suggestions"], [1, "treasury-search-summary"], ["type", "number", "min", "1", "placeholder", "\u0631\u0642\u0645", "title", "\u0641\u0644\u062A\u0631\u0629 \u0628\u0631\u0642\u0645 \u0627\u0644\u062E\u0632\u064A\u0646\u0629", 1, "form-input", "treasury-number-input", 3, "input", "keydown.enter", "value"], [1, "form-row", "single-col"], ["type", "text", "title", "\u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F", "readonly", "", 1, "form-input", 3, "value"], ["type", "date", "title", "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0633\u0646\u062F", 1, "form-input", 3, "change", "value"], ["title", "\u0627\u0644\u0639\u0645\u0644\u0629", 1, "form-select", 3, "change", "value"], [1, "amount-input-wrap"], ["type", "number", "placeholder", "0", 1, "form-input", "amount-input", 3, "input", "value"], [1, "currency-label"], ["type", "text", "placeholder", "\u0631\u0642\u0645 \u0627\u0644\u0645\u0631\u062C\u0639 \u0623\u0648 \u0627\u0644\u0625\u0634\u0639\u0627\u0631", 1, "form-input", 3, "input", "value"], ["type", "text", "placeholder", "\u0628\u064A\u0627\u0646 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0623\u0648 \u0648\u0635\u0641 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629...", 1, "form-input", 3, "input", "value"], [1, "voucher-lines-list"], [1, "voucher-line-row"], [1, "voucher-lines-summary"], ["type", "button", 1, "btn-3d", "btn-ghost", 3, "click"], [1, "summary-values"], [1, "modal-footer"], [1, "btn-3d", 3, "click", "disabled"], ["type", "button", 1, "treasury-suggestion-item", 3, "active"], ["type", "button", 1, "treasury-suggestion-item", 3, "mousedown", "click"], [1, "name"], [1, "match-mark"], [1, "code"], ["title", "\u0631\u0642\u0645 \u0627\u0644\u0633\u0637\u0631", 1, "line-index-badge"], [1, "line-autocomplete"], ["type", "text", "placeholder", "\u0627\u0643\u062A\u0628 \u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628...", "title", "\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A", "autocomplete", "off", 1, "form-input", 3, "input", "focus", "blur", "keydown", "value"], [1, "line-suggestions"], [1, "line-account-picker"], ["type", "text", "placeholder", "\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u062D\u0633\u0627\u0628...", "title", "\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A", "autocomplete", "off", 1, "form-input", 3, "input", "focus", "blur", "keydown", "value"], ["type", "number", "min", "1", "placeholder", "\u0631\u0642\u0645", "title", "\u0631\u0642\u0645 \u0627\u0644\u062D\u0633\u0627\u0628", 1, "form-input", "line-account-number-input", 3, "input", "keydown", "value"], [1, "form-group", "line-amount-group"], ["type", "number", "placeholder", "0", 1, "form-input", 3, "input", "keydown", "value"], [1, "form-group", "line-notes-group"], ["type", "text", "placeholder", "\u0628\u064A\u0627\u0646 \u0627\u0644\u0633\u0637\u0631", 1, "form-input", 3, "input", "keydown", "value"], [1, "line-actions"], ["type", "button", "title", "\u062D\u0630\u0641 \u0627\u0644\u0633\u0637\u0631", 1, "icon-btn", "delete-btn", 3, "click"], ["type", "button", 1, "line-suggestion-item", 3, "active"], ["type", "button", 1, "line-suggestion-item", 3, "mousedown", "click"], [1, "modal-3d", "details-modal", 3, "click"], [1, "modal-header", 2, "background", "linear-gradient(135deg,#6366f1,#8b5cf6)"], [1, "modal-icon", 2, "background", "rgba(255,255,255,0.2)"], [2, "color", "white"], [2, "text-align", "center", "padding", "40px"], [1, "details-grid"], [1, "modal-footer", "details-footer"], [1, "material-icons-round", "spin", 2, "font-size", "32px", "color", "#6366f1"], [1, "detail-row", 2, "background", "linear-gradient(135deg,#f0f9ff,#e0f2fe)", "border-radius", "8px", "padding", "12px"], [1, "detail-row"], [1, "detail-label"], [1, "detail-value"], [1, "detail-value", "amount-big"], [1, "status-pill"], [1, "journal-lines-block"], [1, "detail-label", 2, "font-weight", "600", "color", "#0369a1"], [1, "detail-value", 2, "font-family", "monospace", "font-size", "16px", "font-weight", "700", "color", "#0c4a6e", "letter-spacing", "1px"], ["dir", "ltr", 1, "detail-value"], [1, "journal-lines-title"], [1, "journal-lines-table"], [1, "jl-head"], [1, "jl-cell"], [1, "jl-cell", "amount"], [1, "details-status-switch"], [1, "details-status-label"], ["title", "\u062A\u063A\u064A\u064A\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u0646\u062F", 1, "details-status-select", 3, "change", "value", "disabled"], ["value", "unreviewed"], ["value", "reviewed"], [1, "btn-3d", 2, "background", "#6366f1", "color", "white", 3, "click"], [1, "btn-3d", 2, "background", "#3b82f6", "color", "white", 3, "click"], [1, "btn-3d", 2, "background", "#06b6d4", "color", "white", 3, "click"], [1, "btn-3d", 2, "background", "#ef4444", "color", "white", 3, "click"], [1, "modal-overlay", "print-preview-overlay", 3, "click"], [1, "modal-3d", "print-preview-modal", 3, "click"], [1, "modal-header", 2, "background", "linear-gradient(135deg,#0f172a,#1e293b)"], ["id", "voucher-print-area", 1, "print-report-card"], [1, "print-header", "gradient"], [1, "document-title"], [2, "font-family", "monospace", "font-size", "16px", "font-weight", "700", "letter-spacing", "1px"], [1, "print-badges"], [1, "print-badge", "document"], [1, "print-badge", "treasury"], [1, "print-badge", "counterpart"], [1, "print-badge", "status"], [1, "print-row"], [1, "print-label"], [1, "print-amount"], [1, "print-lines-block"], [1, "print-footer"], [1, "print-sig"], [1, "print-lines-title"], [1, "print-lines-table"], [1, "modal-3d", 2, "max-width", "560px", 3, "click"], [1, "modal-header", 2, "background", "linear-gradient(135deg,#3b82f6,#2563eb)"], [2, "margin-bottom", "16px"], [2, "text-align", "center", "color", "#94a3b8", "padding", "16px"], [2, "border-top", "1px solid #e2e8f0", "padding-top", "16px"], [2, "font-size", "14px", "margin-bottom", "8px"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "8px"], ["type", "text", "placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0645\u0644\u0641", 1, "form-input", 3, "input", "value"], ["type", "text", "placeholder", "\u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0644\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A - \u064A\u0648\u0644\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)", 1, "form-input", 3, "input", "value"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "8px", "margin-top", "8px"], ["title", "\u062F\u0631\u062C\u0629 \u0627\u0644\u0623\u0647\u0645\u064A\u0629", 1, "form-select", 3, "change", "value"], ["value", "\u0639\u0627\u062C\u0644"], ["value", "\u0645\u0647\u0645"], ["value", "\u0639\u0627\u062F\u064A"], ["type", "text", "placeholder", "\u0648\u0635\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)", 1, "form-input", 2, "margin-top", "8px", 3, "input", "value"], [1, "btn-3d", 2, "margin-top", "8px", "background", "#3b82f6", "color", "white", "width", "100%", 3, "click"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "padding", "8px 12px", "border", "1px solid #e2e8f0", "border-radius", "8px", "margin-bottom", "8px"], [2, "display", "flex", "align-items", "center", "gap", "8px"], [1, "material-icons-round", 2, "color", "#3b82f6"], [2, "font-size", "14px", "font-weight", "500"], [2, "font-size", "11px", "color", "#94a3b8"], [1, "icon-btn", "delete-btn", 3, "click"]], template: function VouchersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "receipt_long");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1", 5);
      \u0275\u0275text(8, "\u0633\u0646\u062F\u0627\u062A \u0627\u0644\u0635\u0631\u0641 \u0648\u0627\u0644\u0642\u0628\u0636");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10, "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062D\u0631\u0643\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0645\u0646 \u062E\u0632\u064A\u0646\u0629 \u0648\u0627\u062D\u062F\u0629 \u0625\u0644\u0649 \u0639\u062F\u0629 \u0623\u0637\u0631\u0627\u0641");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
      \u0275\u0275listener("click", function VouchersComponent_Template_button_click_12_listener() {
        return ctx.showHowItWorks.set(true);
      });
      \u0275\u0275elementStart(13, "span", 4);
      \u0275\u0275text(14, "help_outline");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "button", 9);
      \u0275\u0275listener("click", function VouchersComponent_Template_button_click_15_listener() {
        return ctx.openCreate("receipt");
      });
      \u0275\u0275elementStart(16, "span", 4);
      \u0275\u0275text(17, "call_received");
      \u0275\u0275elementEnd();
      \u0275\u0275text(18, " \u0633\u0646\u062F \u0642\u0628\u0636 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 10);
      \u0275\u0275listener("click", function VouchersComponent_Template_button_click_19_listener() {
        return ctx.openCreate("payment");
      });
      \u0275\u0275elementStart(20, "span", 4);
      \u0275\u0275text(21, "call_made");
      \u0275\u0275elementEnd();
      \u0275\u0275text(22, " \u0633\u0646\u062F \u0635\u0631\u0641 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "button", 11)(24, "span", 4);
      \u0275\u0275text(25, "play_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275text(26, " \u062A\u0633\u062C\u064A\u0644 \u0639\u0645\u0644\u064A\u0629 ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(27, VouchersComponent_Conditional_27_Template, 6, 1, "div", 12);
      \u0275\u0275conditionalCreate(28, VouchersComponent_Conditional_28_Template, 32, 5, "div", 13);
      \u0275\u0275elementStart(29, "div", 14);
      \u0275\u0275repeaterCreate(30, VouchersComponent_For_31_Template, 4, 6, "button", 15, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div", 16)(33, "div", 17)(34, "app-smart-filter-input", 18);
      \u0275\u0275listener("valueChange", function VouchersComponent_Template_app_smart_filter_input_valueChange_34_listener($event) {
        return ctx.setFilterVoucherNumberQuery($event);
      })("committed", function VouchersComponent_Template_app_smart_filter_input_committed_34_listener($event) {
        return ctx.onFilterVoucherNumberCommitted($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "app-smart-filter-input", 19);
      \u0275\u0275listener("valueChange", function VouchersComponent_Template_app_smart_filter_input_valueChange_35_listener($event) {
        return ctx.setFilterTreasuryTypeQuery($event);
      })("committed", function VouchersComponent_Template_app_smart_filter_input_committed_35_listener($event) {
        return ctx.onFilterTreasuryTypeCommitted($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "app-smart-filter-input", 20);
      \u0275\u0275listener("valueChange", function VouchersComponent_Template_app_smart_filter_input_valueChange_36_listener($event) {
        return ctx.setFilterTreasuryQuery($event);
      })("committed", function VouchersComponent_Template_app_smart_filter_input_committed_36_listener($event) {
        return ctx.onFilterTreasuryCommitted($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "app-smart-filter-input", 21);
      \u0275\u0275listener("valueChange", function VouchersComponent_Template_app_smart_filter_input_valueChange_37_listener($event) {
        return ctx.setFilterStatusQuery($event);
      })("committed", function VouchersComponent_Template_app_smart_filter_input_committed_37_listener($event) {
        return ctx.onFilterStatusCommitted($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div", 22)(39, "button", 23);
      \u0275\u0275listener("click", function VouchersComponent_Template_button_click_39_listener() {
        return ctx.applyFilters();
      });
      \u0275\u0275elementStart(40, "span", 4);
      \u0275\u0275text(41, "filter_alt");
      \u0275\u0275elementEnd();
      \u0275\u0275text(42, " \u062A\u0637\u0628\u064A\u0642 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "button", 24);
      \u0275\u0275listener("click", function VouchersComponent_Template_button_click_43_listener() {
        return ctx.clearFilters();
      });
      \u0275\u0275elementStart(44, "span", 4);
      \u0275\u0275text(45, "restart_alt");
      \u0275\u0275elementEnd();
      \u0275\u0275text(46, " \u0645\u0633\u062D ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "button", 24);
      \u0275\u0275listener("click", function VouchersComponent_Template_button_click_47_listener() {
        return ctx.showAdvancedFilters.set(!ctx.showAdvancedFilters());
      });
      \u0275\u0275elementStart(48, "span", 4);
      \u0275\u0275text(49);
      \u0275\u0275elementEnd();
      \u0275\u0275text(50, " \u0645\u062A\u0642\u062F\u0645 ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(51, VouchersComponent_Conditional_51_Template, 25, 5, "div", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(52, VouchersComponent_Conditional_52_Template, 3, 1, "div", 26);
      \u0275\u0275conditionalCreate(53, VouchersComponent_Conditional_53_Template, 2, 1);
      \u0275\u0275conditionalCreate(54, VouchersComponent_Conditional_54_Template, 70, 0, "div", 27);
      \u0275\u0275conditionalCreate(55, VouchersComponent_Conditional_55_Template, 118, 35, "div", 27);
      \u0275\u0275conditionalCreate(56, VouchersComponent_Conditional_56_Template, 18, 2, "div", 27);
      \u0275\u0275conditionalCreate(57, VouchersComponent_Conditional_57_Template, 75, 19, "div", 28);
      \u0275\u0275conditionalCreate(58, VouchersComponent_Conditional_58_Template, 34, 5, "div", 27);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(23);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(20, _c0, ctx.bizId));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.error() ? 27 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() ? 28 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tabs);
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.filterVoucherNumberQuery())("suggestions", ctx.filterVoucherNumberSuggestions());
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.filterTreasuryTypeQuery())("suggestions", ctx.filterTreasuryTypeSuggestionLabels());
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.filterTreasuryQuery())("suggestions", ctx.filterTreasurySuggestionLabels());
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.filterStatusQuery())("suggestions", ctx.filterStatusSuggestionLabels());
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.showAdvancedFilters() ? "expand_less" : "expand_more");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showAdvancedFilters() ? 51 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 52 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() ? 53 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showHowItWorks() ? 54 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showForm() ? 55 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDetailsModal() ? 56 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showPrintReport() && ctx.printingVoucher() ? 57 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showAttachments() ? 58 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, RouterLink, SmartFilterInputComponent], styles: ['\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.06),\n      rgba(20, 184, 166, 0.04));\n  border-radius: 20px;\n  border: 1px solid rgba(34, 197, 94, 0.12);\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-icon-3d[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.page-icon-3d.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.page-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: white;\n}\n.page-icon-3d[_ngcontent-%COMP%]:hover {\n  transform: perspective(100px) rotateX(0deg) scale(1.05);\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 3px;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.help-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 11px;\n  border: 1.5px solid rgba(245, 158, 11, 0.3);\n  background: rgba(245, 158, 11, 0.08);\n  color: #f59e0b;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.help-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.help-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(245, 158, 11, 0.15);\n  transform: scale(1.08) rotate(15deg);\n}\n.btn-3d[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.btn-3d.btn-receipt[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  color: white;\n  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-receipt[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);\n}\n.btn-3d.btn-payment[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n  color: white;\n  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-payment[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);\n}\n.btn-3d.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--text-secondary, #64748b);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n}\n.btn-3d.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface, #f8fafc);\n  transform: translateY(-1px);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);\n}\n.btn-3d[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n}\n.alert-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\n.alert-error[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.alert-error[_ngcontent-%COMP%]   .close-x[_ngcontent-%COMP%] {\n  margin-right: auto;\n  opacity: 0.6;\n}\n.stats-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.stat-card-3d[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  flex: 1;\n  min-width: 160px;\n}\n.stat-card-3d[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.stat-card-3d[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-card-3d[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: white;\n}\n.stat-card-3d.total[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #64748b,\n      #475569);\n}\n.stat-card-3d.receipt[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.stat-card-3d.payment[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.sc-num[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n}\n.sc-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.sc-amount[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n}\n.tabs-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.filters-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding: 12px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.filters-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 0.9fr 1fr 0.9fr auto;\n  gap: 10px;\n  align-items: end;\n}\n.filters-row.advanced[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  margin-top: 10px;\n  padding-top: 10px;\n  border-top: 1px dashed var(--border-color, #e2e8f0);\n}\n.filters-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-secondary, #64748b);\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  background: var(--tab-color, #64748b);\n  color: white;\n  border-color: transparent;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);\n  transform: translateY(-1px);\n}\n.tab-btn[_ngcontent-%COMP%]:not(.active):hover {\n  border-color: var(--tab-color, #64748b);\n  color: var(--tab-color, #64748b);\n}\n.loading-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.skeleton-row[_ngcontent-%COMP%] {\n  height: 72px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      90deg,\n      #f0f0f0 25%,\n      #e8e8e8 50%,\n      #f0f0f0 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n.empty-icon-3d[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 12px 32px rgba(34, 197, 94, 0.3);\n  transform: perspective(150px) rotateX(10deg);\n}\n.empty-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: white;\n}\n.empty-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.vouchers-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.voucher-row-3d[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 16px;\n  border-radius: 14px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  position: relative;\n  overflow: hidden;\n  transition: all 0.2s;\n  cursor: pointer;\n}\n.voucher-row-3d[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 3px;\n  background: var(--v-color, #64748b);\n}\n.voucher-row-3d[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);\n  transform: translateX(-3px);\n}\n.vr-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--v-color, #64748b);\n  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);\n}\n.vr-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: white;\n}\n.vr-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.vr-desc[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 4px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.vr-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.vr-date[_ngcontent-%COMP%], \n.vr-account[_ngcontent-%COMP%], \n.vr-number[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n}\n.vr-date[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%], \n.vr-account[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%], \n.vr-number[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.vr-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n}\n.vr-amount[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 900;\n  direction: ltr;\n}\n.vr-type-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.vr-actions[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.icon-btn.delete-btn[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.icon-btn.delete-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-3d[_ngcontent-%COMP%] {\n  background: var(--bg-card, white);\n  border-radius: 22px;\n  width: 100%;\n  max-width: 580px;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.08);\n  animation: _ngcontent-%COMP%_slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(40px) scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.hiw-modal[_ngcontent-%COMP%] {\n  max-width: 520px;\n}\n.form-modal[_ngcontent-%COMP%] {\n  max-width: min(1120px, 96vw);\n}\n.details-modal[_ngcontent-%COMP%] {\n  max-width: min(980px, 96vw);\n}\n.details-modal[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {\n  max-height: min(72vh, 820px);\n}\n.details-footer[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  gap: 8px;\n}\n.details-footer[_ngcontent-%COMP%]   .btn-3d[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.details-footer[_ngcontent-%COMP%]   .btn-3d.btn-ghost[_ngcontent-%COMP%] {\n  margin-inline-start: auto;\n}\n.details-status-switch[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  background: rgba(99, 102, 241, 0.08);\n  border: 1px solid rgba(99, 102, 241, 0.18);\n  border-radius: 10px;\n  padding: 6px 8px;\n}\n.details-status-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  white-space: nowrap;\n}\n.details-status-select[_ngcontent-%COMP%] {\n  min-width: 120px;\n  border: 1px solid var(--border-color, #cbd5e1);\n  border-radius: 8px;\n  padding: 7px 10px;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  color: var(--text-primary, #1e293b);\n  background: var(--bg-card, #fff);\n  cursor: pointer;\n}\n.details-status-select[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.form-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.form-modal[_ngcontent-%COMP%]   .modal-subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 18px 22px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.modal-header.receipt-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.06),\n      rgba(20, 184, 166, 0.04));\n}\n.modal-header.payment-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(239, 68, 68, 0.06),\n      rgba(249, 115, 22, 0.04));\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n  flex: 1;\n}\n.modal-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 2px 0 0;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 21px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.receipt-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.payment-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.modal-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  border: none;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.modal-close[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 18px 22px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  padding: 14px 22px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.form-step[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding: 14px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.step-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 12px;\n}\n.step-num[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 900;\n  flex-shrink: 0;\n}\n.op-types-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.op-type-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 7px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  color: var(--text-secondary, #64748b);\n  transition: all 0.2s;\n}\n.op-type-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.op-type-btn.selected[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  border-color: transparent;\n  box-shadow: 0 3px 10px rgba(59, 130, 246, 0.3);\n  transform: translateY(-1px);\n}\n.op-type-btn[_ngcontent-%COMP%]:not(.selected):hover {\n  border-color: #3b82f6;\n  color: #3b82f6;\n}\n.no-op-types[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n}\n.no-op-types[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.form-row.single-col[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.form-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.form-input[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.treasury-picker[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 92px;\n  gap: 8px;\n}\n.treasury-autocomplete[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.treasury-suggestions[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 20;\n  top: calc(100% + 2px);\n  left: 0;\n  right: 0;\n  display: grid;\n  gap: 2px;\n  max-height: 220px;\n  overflow-y: auto;\n  padding: 6px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, #fff);\n  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);\n}\n.treasury-suggestion-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  width: 100%;\n  border: none;\n  border-radius: 8px;\n  padding: 7px 9px;\n  background: transparent;\n  color: var(--text-primary, #1e293b);\n  text-align: right;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 700;\n}\n.treasury-suggestion-item[_ngcontent-%COMP%]   .code[_ngcontent-%COMP%] {\n  color: var(--text-muted, #64748b);\n  font-size: 11px;\n  font-weight: 700;\n  direction: ltr;\n}\n.treasury-suggestion-item[_ngcontent-%COMP%]:hover, \n.treasury-suggestion-item.active[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.12);\n  color: #1d4ed8;\n}\n.match-mark[_ngcontent-%COMP%] {\n  background: rgba(250, 204, 21, 0.36);\n  color: inherit;\n  padding: 0 2px;\n  border-radius: 4px;\n  font-weight: 900;\n}\n.treasury-search-summary[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-muted, #64748b);\n  padding-inline: 2px;\n}\n.treasury-number-input[_ngcontent-%COMP%] {\n  text-align: center;\n  font-weight: 800;\n}\n.amount-input-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  border-radius: 9px;\n  overflow: hidden;\n  background: var(--bg-card, white);\n}\n.amount-input-wrap[_ngcontent-%COMP%]:focus-within {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.amount-input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none !important;\n  box-shadow: none !important;\n  border-radius: 0 !important;\n}\n.currency-label[_ngcontent-%COMP%] {\n  padding: 9px 12px;\n  background: var(--bg-surface, #f8fafc);\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  border-right: 1px solid var(--border-color, #e2e8f0);\n}\n.voucher-lines-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n}\n.voucher-line-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 56px 1.1fr 1.5fr 0.7fr 2fr auto;\n  gap: 10px;\n  align-items: end;\n  padding: 12px;\n  border-radius: 12px;\n  background: var(--bg-card, white);\n  border: 1px solid var(--border-color, #e2e8f0);\n}\n.line-index-badge[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 900;\n  color: #1d4ed8;\n  background: rgba(59, 130, 246, 0.12);\n  border: 1px solid rgba(59, 130, 246, 0.24);\n  margin-bottom: 2px;\n}\n.line-amount-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  min-width: 92px;\n}\n.line-notes-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  min-width: 260px;\n}\n.line-autocomplete[_ngcontent-%COMP%] {\n  position: relative;\n}\n.line-suggestions[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 15;\n  top: calc(100% + 2px);\n  left: 0;\n  right: 0;\n  display: grid;\n  gap: 2px;\n  max-height: 220px;\n  overflow-y: auto;\n  padding: 6px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, #fff);\n  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);\n}\n.line-suggestion-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  width: 100%;\n  border: none;\n  border-radius: 8px;\n  padding: 7px 9px;\n  background: transparent;\n  color: var(--text-primary, #1e293b);\n  text-align: right;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 700;\n}\n.line-suggestion-item[_ngcontent-%COMP%]   .code[_ngcontent-%COMP%] {\n  color: var(--text-muted, #64748b);\n  font-size: 11px;\n  font-weight: 700;\n  direction: ltr;\n}\n.line-suggestion-item[_ngcontent-%COMP%]:hover, \n.line-suggestion-item.active[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.12);\n  color: #1d4ed8;\n}\n.line-account-picker[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 84px;\n  gap: 8px;\n}\n.line-account-number-input[_ngcontent-%COMP%] {\n  text-align: center;\n  font-weight: 800;\n}\n.line-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-bottom: 12px;\n}\n.voucher-lines-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-top: 12px;\n}\n.summary-values[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #475569);\n}\n.hiw-section[_ngcontent-%COMP%] {\n  padding: 14px 0;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.hiw-section[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.hiw-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 8px;\n}\n.hiw-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: #f59e0b;\n}\n.hiw-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.9;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.details-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 0;\n  border-bottom: 1px solid var(--border-color, #f0f0f0);\n}\n.detail-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n}\n.detail-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.detail-value.amount-big[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n}\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 3px 10px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.journal-lines-block[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  border-radius: 10px;\n  padding: 10px;\n  background: var(--bg-surface, #f8fafc);\n}\n.journal-lines-title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 800;\n  margin-bottom: 8px;\n  color: var(--text-primary, #1e293b);\n}\n.journal-lines-table[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.6fr 0.8fr 1fr;\n  gap: 6px 8px;\n}\n.jl-head[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 800;\n  color: var(--text-secondary, #64748b);\n  padding-bottom: 4px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.jl-cell[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-primary, #1e293b);\n}\n.jl-cell.amount[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.print-preview-modal[_ngcontent-%COMP%] {\n  max-width: 860px;\n}\n.print-preview-overlay[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {\n  background: #f5f7fb;\n}\n.print-report-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 18px;\n  color: #0f172a;\n}\n.print-report-card[_ngcontent-%COMP%], \n.print-report-card[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n  color: #0f172a;\n}\n.print-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 16px;\n  border-bottom: 2px solid #1f2937;\n  padding-bottom: 10px;\n}\n.print-header.gradient[_ngcontent-%COMP%] {\n  margin: -18px -18px 16px;\n  padding: 16px 18px;\n  border-bottom: 0;\n  background:\n    linear-gradient(\n      135deg,\n      #0f172a,\n      #1d4ed8,\n      #0ea5e9);\n}\n.print-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.print-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.print-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 6px 0;\n  color: #0f172a !important;\n}\n.print-header.gradient[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.print-header.gradient[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.print-header.gradient[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #fff !important;\n}\n.print-header[_ngcontent-%COMP%]   .document-title[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: 900;\n  letter-spacing: 0.3px;\n}\n.print-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 900;\n}\n.print-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n}\n.print-badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n.print-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 999px;\n  padding: 5px 10px;\n  font-size: 12px;\n  font-weight: 800;\n  border: 1px solid transparent;\n}\n.print-badge.treasury[_ngcontent-%COMP%] {\n  background: #e0f2fe;\n  color: #075985 !important;\n  border-color: #bae6fd;\n}\n.print-badge.document[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af !important;\n  border-color: #bfdbfe;\n}\n.print-badge.counterpart[_ngcontent-%COMP%] {\n  background: #ede9fe;\n  color: #5b21b6 !important;\n  border-color: #ddd6fe;\n}\n.print-badge.status[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534 !important;\n  border-color: #bbf7d0;\n}\n.print-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  margin: 8px 0;\n  padding: 6px 0;\n  border-bottom: 1px dotted #94a3b8;\n}\n.print-label[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: #334155 !important;\n}\n.print-amount[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 900;\n  text-align: center;\n  margin: 18px 0;\n  padding: 10px;\n  border: 2px solid #0f172a;\n  border-radius: 10px;\n  color: #0f172a !important;\n  background: #f8fafc;\n}\n.print-footer[_ngcontent-%COMP%] {\n  margin-top: 28px;\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n}\n.print-lines-block[_ngcontent-%COMP%] {\n  margin-top: 18px;\n}\n.print-lines-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  margin-bottom: 8px;\n}\n.print-lines-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n  background: #fff;\n}\n.print-lines-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.print-lines-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border: 1px solid #cbd5e1;\n  padding: 6px;\n  text-align: right;\n  color: #0f172a !important;\n  background: #fff;\n}\n.print-lines-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 800;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc,\n      #eef2ff);\n}\n@media print {\n  body[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n    visibility: hidden !important;\n  }\n  #voucher-print-area[_ngcontent-%COMP%], \n   #voucher-print-area[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n    visibility: visible !important;\n    display: block !important;\n  }\n  #voucher-print-area[_ngcontent-%COMP%] {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    padding: 20px;\n    font-family: "Tajawal", sans-serif;\n    border: 0 !important;\n    border-radius: 0 !important;\n    color: #000 !important;\n    background: #fff !important;\n  }\n  .print-row[_ngcontent-%COMP%] {\n    display: flex !important;\n  }\n  .print-lines-table[_ngcontent-%COMP%] {\n    display: table !important;\n    width: 100%;\n    border-collapse: collapse;\n  }\n  .print-lines-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: table-header-group !important;\n  }\n  .print-lines-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] {\n    display: table-row-group !important;\n  }\n  .print-lines-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    display: table-row !important;\n  }\n  .print-lines-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .print-lines-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: table-cell !important;\n    border: 1px solid #ddd !important;\n  }\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 14px;\n    align-items: flex-start;\n  }\n  .stats-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .treasury-picker[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .filters-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .filters-row.advanced[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .filters-actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .voucher-line-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .line-index-badge[_ngcontent-%COMP%] {\n    margin-bottom: 6px;\n  }\n  .line-account-picker[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .voucher-lines-summary[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .summary-values[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 6px;\n  }\n  .modal-3d[_ngcontent-%COMP%] {\n    border-radius: 16px;\n  }\n  .details-modal[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .details-footer[_ngcontent-%COMP%]   .btn-3d[_ngcontent-%COMP%] {\n    flex: 1 1 calc(50% - 8px);\n    justify-content: center;\n  }\n  .details-status-switch[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n  }\n  .details-status-select[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .details-footer[_ngcontent-%COMP%]   .btn-3d.btn-ghost[_ngcontent-%COMP%] {\n    flex-basis: 100%;\n    margin-inline-start: 0;\n  }\n  .voucher-row-3d[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .journal-lines-table[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .print-badges[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=vouchers.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VouchersComponent, [{
    type: Component,
    args: [{ selector: "app-vouchers", standalone: true, imports: [
      CommonModule,
      FormsModule,
      RouterLink,
      SmartFilterInputComponent,
      LoadingStateComponent,
      EmptyStateComponent,
      StatusBadgeComponent,
      AmountDisplayComponent
    ], template: `<div class="page-container">\r
\r
  <!-- ===== Page Header ===== -->\r
  <div class="page-header">\r
    <div class="header-left">\r
      <div class="page-icon-3d green">\r
        <span class="material-icons-round">receipt_long</span>\r
      </div>\r
      <div>\r
        <h1 class="page-title">\u0633\u0646\u062F\u0627\u062A \u0627\u0644\u0635\u0631\u0641 \u0648\u0627\u0644\u0642\u0628\u0636</h1>\r
        <p class="page-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062D\u0631\u0643\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0645\u0646 \u062E\u0632\u064A\u0646\u0629 \u0648\u0627\u062D\u062F\u0629 \u0625\u0644\u0649 \u0639\u062F\u0629 \u0623\u0637\u0631\u0627\u0641</p>\r
      </div>\r
    </div>\r
    <div class="header-right">\r
      <button class="help-btn" (click)="showHowItWorks.set(true)" title="\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F">\r
        <span class="material-icons-round">help_outline</span>\r
      </button>\r
      <button class="btn-3d btn-receipt" (click)="openCreate('receipt')" title="\u0625\u0646\u0634\u0627\u0621 \u0633\u0646\u062F \u0642\u0628\u0636">\r
        <span class="material-icons-round">call_received</span>\r
        \u0633\u0646\u062F \u0642\u0628\u0636\r
      </button>\r
      <button class="btn-3d btn-payment" (click)="openCreate('payment')" title="\u0625\u0646\u0634\u0627\u0621 \u0633\u0646\u062F \u0635\u0631\u0641">\r
        <span class="material-icons-round">call_made</span>\r
        \u0633\u0646\u062F \u0635\u0631\u0641\r
      </button>\r
      <button class="btn-3d btn-primary" [routerLink]="['/biz', bizId, 'register-operation']">\r
        <span class="material-icons-round">play_circle</span>\r
        \u062A\u0633\u062C\u064A\u0644 \u0639\u0645\u0644\u064A\u0629\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- ===== Error ===== -->\r
  @if (error()) {\r
    <div class="alert-error" (click)="error.set('')">\r
      <span class="material-icons-round">error_outline</span>\r
      {{ error() }}\r
      <span class="close-x">\u2715</span>\r
    </div>\r
  }\r
\r
  <!-- ===== Stats Cards ===== -->\r
  @if (!loading()) {\r
    <div class="stats-row">\r
      <div class="stat-card-3d total">\r
        <div class="sc-icon"><span class="material-icons-round">receipt_long</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ stats().total }}</div>\r
          <div class="sc-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0646\u062F\u0627\u062A</div>\r
        </div>\r
      </div>\r
      <div class="stat-card-3d receipt">\r
        <div class="sc-icon"><span class="material-icons-round">call_received</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ stats().receipts }}</div>\r
          <div class="sc-label">\u0633\u0646\u062F\u0627\u062A \u0642\u0628\u0636</div>\r
          <div class="sc-amount">{{ formatAmount(stats().totalReceipt) }}</div>\r
        </div>\r
      </div>\r
      <div class="stat-card-3d payment">\r
        <div class="sc-icon"><span class="material-icons-round">call_made</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ stats().payments }}</div>\r
          <div class="sc-label">\u0633\u0646\u062F\u0627\u062A \u0635\u0631\u0641</div>\r
          <div class="sc-amount">{{ formatAmount(stats().totalPayment) }}</div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===== Tabs ===== -->\r
  <div class="tabs-bar">\r
    @for (tab of tabs; track tab.value) {\r
      <button class="tab-btn" [class.active]="activeTab() === tab.value"\r
              [style.--tab-color]="tab.color"\r
              (click)="switchTab(tab.value)">\r
        <span class="material-icons-round">{{ tab.icon }}</span>\r
        {{ tab.label }}\r
      </button>\r
    }\r
  </div>\r
\r
  <div class="filters-card">\r
    <div class="filters-row">\r
      <app-smart-filter-input\r
        inputId="voucher-filter-number"\r
        label="\u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F"\r
        title="\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F"\r
        placeholder="\u0627\u0643\u062A\u0628 \u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F..."\r
        [value]="filterVoucherNumberQuery()"\r
        [suggestions]="filterVoucherNumberSuggestions()"\r
        (valueChange)="setFilterVoucherNumberQuery($event)"\r
        (committed)="onFilterVoucherNumberCommitted($event)"\r
      />\r
      <app-smart-filter-input\r
        inputId="voucher-filter-treasury-type"\r
        label="\u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629"\r
        title="\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629"\r
        placeholder="\u0627\u0644\u0643\u0644 / \u0635\u0646\u062F\u0648\u0642 / \u0628\u0646\u0643 / \u0635\u0631\u0627\u0641 / \u0645\u062D\u0641\u0638\u0629"\r
        [value]="filterTreasuryTypeQuery()"\r
        [suggestions]="filterTreasuryTypeSuggestionLabels()"\r
        (valueChange)="setFilterTreasuryTypeQuery($event)"\r
        (committed)="onFilterTreasuryTypeCommitted($event)"\r
      />\r
      <app-smart-filter-input\r
        inputId="voucher-filter-treasury"\r
        label="\u0627\u0644\u062E\u0632\u064A\u0646\u0629"\r
        title="\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u0627\u0644\u062E\u0632\u064A\u0646\u0629"\r
        placeholder="\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u062E\u0632\u064A\u0646\u0629..."\r
        [value]="filterTreasuryQuery()"\r
        [suggestions]="filterTreasurySuggestionLabels()"\r
        (valueChange)="setFilterTreasuryQuery($event)"\r
        (committed)="onFilterTreasuryCommitted($event)"\r
      />\r
      <app-smart-filter-input\r
        inputId="voucher-filter-status-main"\r
        label="\u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u0646\u062F"\r
        title="\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u0646\u062F"\r
        placeholder="\u0627\u0644\u0643\u0644 / \u0645\u0633\u0648\u062F\u0629 / \u0645\u0639\u062A\u0645\u062F / \u0645\u0644\u063A\u064A"\r
        [value]="filterStatusQuery()"\r
        [suggestions]="filterStatusSuggestionLabels()"\r
        (valueChange)="setFilterStatusQuery($event)"\r
        (committed)="onFilterStatusCommitted($event)"\r
      />\r
      <div class="filters-actions">\r
        <button class="btn-3d btn-primary" (click)="applyFilters()">\r
          <span class="material-icons-round">filter_alt</span>\r
          \u062A\u0637\u0628\u064A\u0642\r
        </button>\r
        <button class="btn-3d btn-ghost" (click)="clearFilters()">\r
          <span class="material-icons-round">restart_alt</span>\r
          \u0645\u0633\u062D\r
        </button>\r
        <button class="btn-3d btn-ghost" (click)="showAdvancedFilters.set(!showAdvancedFilters())">\r
          <span class="material-icons-round">{{ showAdvancedFilters() ? 'expand_less' : 'expand_more' }}</span>\r
          \u0645\u062A\u0642\u062F\u0645\r
        </button>\r
      </div>\r
    </div>\r
    @if (showAdvancedFilters()) {\r
      <div class="filters-row advanced">\r
        <div class="form-group">\r
          <label class="form-label" for="voucher-filter-date-from">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>\r
          <input id="voucher-filter-date-from" class="form-input" type="date" title="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E" [value]="filterDateFrom()"\r
                 (change)="onAdvancedDateFromChange($any($event.target).value)">\r
        </div>\r
        <div class="form-group">\r
          <label class="form-label" for="voucher-filter-date-to">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>\r
          <input id="voucher-filter-date-to" class="form-input" type="date" title="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E" [value]="filterDateTo()"\r
                 (change)="onAdvancedDateToChange($any($event.target).value)">\r
        </div>\r
        <div class="form-group">\r
          <label class="form-label" for="voucher-filter-status">\u0627\u0644\u062D\u0627\u0644\u0629</label>\r
          <select id="voucher-filter-status" class="form-select" title="\u0627\u0644\u062D\u0627\u0644\u0629" [value]="filterStatus()"\r
                  (change)="onAdvancedStatusChange($any($event.target).value)">\r
            <option value="">\u0627\u0644\u0643\u0644</option>\r
            @for (status of statusOptions; track status.value) {\r
              <option [value]="status.value">{{ status.label }}</option>\r
            }\r
          </select>\r
        </div>\r
        <div class="form-group">\r
          <label class="form-label">\u0623\u0642\u0644 \u0645\u0628\u0644\u063A</label>\r
          <input class="form-input" type="number" placeholder="0"\r
                 [value]="filterMinAmount()"\r
                 (change)="onAdvancedMinAmountChange($any($event.target).value)">\r
        </div>\r
        <div class="form-group">\r
          <label class="form-label">\u0623\u0639\u0644\u0649 \u0645\u0628\u0644\u063A</label>\r
          <input class="form-input" type="number" placeholder="0"\r
                 [value]="filterMaxAmount()"\r
                 (change)="onAdvancedMaxAmountChange($any($event.target).value)">\r
        </div>\r
      </div>\r
    }\r
  </div>\r
\r
  <!-- ===== Loading ===== -->\r
  @if (loading()) {\r
    <div class="loading-grid">\r
      @for (i of [1,2,3,4]; track i) {\r
        <div class="skeleton-row"></div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- ===== Vouchers List ===== -->\r
  @if (!loading()) {\r
    @if (filteredVouchers().length === 0) {\r
      <div class="empty-state">\r
        <div class="empty-icon-3d">\r
          <span class="material-icons-round">receipt_long</span>\r
        </div>\r
        <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u0646\u062F\u0627\u062A</h3>\r
        <p>\u0623\u0646\u0634\u0626 \u0623\u0648\u0644 \u0633\u0646\u062F \u0642\u0628\u0636 \u0623\u0648 \u0635\u0631\u0641 \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0634\u0627\u0634\u0629</p>\r
      </div>\r
    } @else {\r
      <div class="vouchers-list">\r
        @for (v of filteredVouchers(); track v.id) {\r
          <div\r
            class="voucher-row-3d"\r
            [style.--v-color]="getTypeColor(v.voucherType)"\r
            role="button"\r
            tabindex="0"\r
            (click)="openDetails(v)"\r
            (keydown)="onVoucherRowKeydown($event, v)">\r
            <div class="vr-type-indicator"></div>\r
            <div class="vr-icon">\r
              <span class="material-icons-round">{{ getTypeIcon(v.voucherType) }}</span>\r
            </div>\r
            <div class="vr-main">\r
              <div class="vr-desc">\r
                @if (v.fullSequenceNumber) {\r
                  <span class="vr-seq-badge" [style.color]="getTypeColor(v.voucherType)">\r
                    <span class="material-icons-round" style="font-size:14px">tag</span>\r
                    {{ v.fullSequenceNumber }}\r
                  </span>\r
                }\r
                {{ v.description || '\u0628\u062F\u0648\u0646 \u0628\u064A\u0627\u0646' }}\r
              </div>\r
              <div class="vr-meta">\r
                <span class="vr-date">\r
                  <span class="material-icons-round">calendar_today</span>\r
                  {{ formatDate(v.voucherDate || v.createdAt) }}\r
                </span>\r
                <span class="vr-number">\r
                  <span class="material-icons-round">tag</span>\r
                  {{ v.voucherNumber || '-' }}\r
                </span>\r
                <span class="vr-account">\r
                  <span class="material-icons-round">account_balance_wallet</span>\r
                  {{ getVoucherTreasuryLabel(v) }}\r
                </span>\r
                <span class="vr-account">\r
                  <span class="material-icons-round">compare_arrows</span>\r
                  {{ getVoucherCounterpartySummary(v) }}\r
                </span>\r
              </div>\r
            </div>\r
            <div class="vr-right">\r
              <div class="vr-amount" [style.color]="getTypeColor(v.voucherType)">\r
                {{ formatAmount(v.amount) }}\r
              </div>\r
              <span class="vr-type-badge" [style.background]="getTypeColor(v.voucherType) + '18'"\r
                    [style.color]="getTypeColor(v.voucherType)">\r
                {{ getTypeLabel(v.voucherType) }}\r
              </span>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    }\r
  }\r
\r
  <!-- ===== How It Works Modal ===== -->\r
  @if (showHowItWorks()) {\r
    <div class="modal-overlay" (click)="showHowItWorks.set(false)">\r
      <div class="modal-3d hiw-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-icon amber">\r
            <span class="material-icons-round">help_outline</span>\r
          </div>\r
          <h2>\u0645\u0628\u062F\u0623 \u0627\u0644\u0639\u0645\u0644 - \u0627\u0644\u0633\u0646\u062F\u0627\u062A</h2>\r
          <button class="modal-close" (click)="showHowItWorks.set(false)">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">call_received</span> \u0633\u0646\u062F \u0627\u0644\u0642\u0628\u0636</h3>\r
            <p>\r
              \u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0639\u0646\u062F <strong>\u0627\u0633\u062A\u0644\u0627\u0645</strong> \u0645\u0628\u0644\u063A \u0625\u0644\u0649 \u062E\u0632\u064A\u0646\u0629 \u0648\u0627\u062D\u062F\u0629 \u062B\u0627\u0628\u062A\u0629 \u0645\u0646 \u0639\u062F\u0629 \u0623\u0637\u0631\u0627\u0641 \u0639\u0628\u0631 \u0633\u0637\u0648\u0631 \u0627\u0644\u0633\u0646\u062F.\r
              <br />\r
              <small>\u0643\u0644 \u0633\u0637\u0631 \u064A\u0645\u062B\u0644 \u0637\u0631\u0641\u0627\u064B \u0645\u0627\u0644\u064A\u0627\u064B \u0645\u0642\u0627\u0628\u0644\u0627\u064B \u064A\u062F\u062E\u0644 \u0636\u0645\u0646 \u0646\u0641\u0633 \u0627\u0644\u0633\u0646\u062F.</small>\r
            </p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">call_made</span> \u0633\u0646\u062F \u0627\u0644\u0635\u0631\u0641</h3>\r
            <p>\r
              \u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u0639\u0646\u062F <strong>\u0635\u0631\u0641</strong> \u0645\u0628\u0644\u063A \u0645\u0646 \u062E\u0632\u064A\u0646\u0629 \u0648\u0627\u062D\u062F\u0629 \u062B\u0627\u0628\u062A\u0629 \u0625\u0644\u0649 \u0639\u062F\u0629 \u0623\u0637\u0631\u0627\u0641 \u0639\u0628\u0631 \u0633\u0637\u0648\u0631 \u0627\u0644\u0633\u0646\u062F.\r
              <br />\r
              <small>\u0645\u062C\u0645\u0648\u0639 \u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0633\u0637\u0648\u0631 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0633\u0627\u0648\u064A \u0645\u0628\u0644\u063A \u0627\u0644\u0633\u0646\u062F.</small>\r
            </p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">list_alt</span> \u0628\u0646\u0648\u062F \u0627\u0644\u0633\u0646\u062F</h3>\r
            <p>\r
              \u0643\u0644 \u0628\u0646\u062F \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0646\u0648\u0639 \u062D\u0633\u0627\u0628 \u0641\u0631\u0639\u064A\u060C \u062D\u0633\u0627\u0628 \u0641\u0631\u0639\u064A\u060C \u0645\u0628\u0644\u063A\u060C \u0648\u0628\u064A\u0627\u0646 \u0645\u0633\u062A\u0642\u0644 \u062F\u0627\u062E\u0644 \u0646\u0641\u0633 \u0627\u0644\u0633\u0646\u062F.\r
            </p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">tag</span> \u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0633\u0646\u062F</h3>\r
            <p>\r
              \u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F \u064A\u064F\u0648\u0644\u0651\u062F \u062D\u0633\u0628 <strong>\u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F + \u0643\u0648\u062F \u0627\u0644\u062E\u0632\u064A\u0646\u0629 + \u0627\u0644\u0633\u0646\u0629 + \u0627\u0644\u062A\u0633\u0644\u0633\u0644</strong>.\r
            </p>\r
            <p dir="ltr" style="font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace">\r
              FND-01-2025-\u0635\u0631\u0641-0001 &nbsp;|\r
              BNK-02-2025-\u0642\u0628\u0636-0003\r
            </p>\r
            <p>\r
              <small>PREFIX = \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u2014 XX = \u0631\u0642\u0645\u0647\u0627 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A \u2014 YYYY = \u0627\u0644\u0633\u0646\u0629 \u2014 \u0627\u0644\u062A\u0633\u0644\u0633\u0644 \u064A\u0628\u062F\u0623 \u0645\u0646 <strong>1</strong> \u0644\u0643\u0644 \u062E\u0632\u064A\u0646\u0629 \u0648\u0644\u0643\u0644 \u0633\u0646\u0629.</small>\r
            </p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">inventory_2</span> \u0627\u0644\u0645\u062E\u0627\u0632\u0646</h3>\r
            <p>\r
              \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0644\u0647\u0627 \u0634\u0627\u0634\u0629 \u0645\u0633\u062A\u0642\u0644\u0629 \u0648\u0631\u0642\u0645 \u0639\u0645\u0644\u064A\u0629 \u0645\u0633\u062A\u0642\u0644 (\u0644\u064A\u0633\u062A \u0633\u0646\u062F\u0627\u062A \u0642\u0628\u0636/\u0635\u0631\u0641)\u060C \u0645\u062B\u0644: \u062A\u0648\u0631\u064A\u062F\u060C \u0635\u0631\u0641\u060C \u062A\u062D\u0648\u064A\u0644\u060C \u0627\u0633\u062A\u0644\u0627\u0645 \u062A\u062D\u0648\u064A\u0644.\r
            </p>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===== Create Voucher Modal ===== -->\r
  @if (showForm()) {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-3d form-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header" [class.receipt-header]="voucherType() === 'receipt'"\r
             [class.payment-header]="voucherType() === 'payment'">\r
          <div class="modal-icon" [class.receipt-icon]="voucherType() === 'receipt'"\r
               [class.payment-icon]="voucherType() === 'payment'">\r
            <span class="material-icons-round">{{ voucherType() === 'receipt' ? 'call_received' : 'call_made' }}</span>\r
          </div>\r
          <div>\r
            <h2>{{ isEditing() ? (voucherType() === 'receipt' ? '\u062A\u0639\u062F\u064A\u0644 \u0633\u0646\u062F \u0642\u0628\u0636' : '\u062A\u0639\u062F\u064A\u0644 \u0633\u0646\u062F \u0635\u0631\u0641') : (voucherType() === 'receipt' ? '\u0633\u0646\u062F \u0642\u0628\u0636 \u062C\u062F\u064A\u062F' : '\u0633\u0646\u062F \u0635\u0631\u0641 \u062C\u062F\u064A\u062F') }}</h2>\r
            <p class="modal-subtitle">{{ isEditing() ? '\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u0646\u062F \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629' : (voucherType() === 'receipt' ? '\u0627\u0633\u062A\u0644\u0627\u0645 \u0645\u0628\u0644\u063A \u0645\u0646 \u062D\u0633\u0627\u0628' : '\u062F\u0641\u0639 \u0645\u0628\u0644\u063A \u0644\u062D\u0633\u0627\u0628') }}</p>\r
          </div>\r
          <button class="modal-close" (click)="showForm.set(false)">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          <!-- Step 1: Treasury -->\r
          <div class="form-step">\r
            <div class="step-header">\r
              <div class="step-num">\u0661</div>\r
              <span>\u0627\u0644\u062E\u0632\u064A\u0646\u0629</span>\r
            </div>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 <span class="required">*</span></label>\r
                <select class="form-select" title="\u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629" [value]="treasuryType() || ''"\r
                        (change)="setTreasuryType($any($event.target).value)">\r
                  <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639...</option>\r
                  <option value="fund">\u0635\u0646\u062F\u0648\u0642</option>\r
                  <option value="bank">\u0628\u0646\u0643</option>\r
                  <option value="exchange">\u0635\u0631\u0627\u0641</option>\r
                  <option value="e_wallet">\u0645\u062D\u0641\u0638\u0629</option>\r
                </select>\r
              </div>\r
              <div class="form-group">\r
                <label class="form-label">\r
                  {{ getTreasuryFieldLabel() }}\r
                  <span class="required">*</span>\r
                </label>\r
                <div class="treasury-picker">\r
                  <div class="treasury-autocomplete">\r
                    <input\r
                      class="form-input"\r
                      type="text"\r
                      [placeholder]="getTreasuryFieldPlaceholder()"\r
                      title="\u0627\u0644\u062E\u0632\u064A\u0646\u0629"\r
                      autocomplete="off"\r
                      [value]="treasurySearchQuery()"\r
                      (input)="onTreasuryTyping($any($event.target).value)"\r
                      (change)="onTreasuryInputCommit($any($event.target).value)"\r
                      (focus)="onTreasuryInputFocus()"\r
                      (blur)="onTreasuryInputBlur()"\r
                      (keydown)="onTreasuryInputKeydown($event)"\r
                    />\r
                    @if (showTreasurySuggestions() && filteredTreasuryOptions().length > 0) {\r
                      <div class="treasury-suggestions">\r
                        @for (item of filteredTreasuryOptions(); track item.id; let i = $index) {\r
                          <button\r
                            type="button"\r
                            class="treasury-suggestion-item"\r
                            [class.active]="i === activeTreasurySuggestionIndex()"\r
                            (mousedown)="$event.preventDefault()"\r
                            (click)="selectTreasurySuggestion(item)"\r
                          >\r
                            <span class="name">\r
                              @let nameParts = getTreasurySuggestionNameParts(item);\r
                              {{ nameParts.before }}<mark class="match-mark">{{ nameParts.match }}</mark>{{ nameParts.after }}\r
                            </span>\r
                            @if (item.code) {\r
                              <span class="code">\r
                                @let codeParts = getTreasurySuggestionCodeParts(item);\r
                                ({{ codeParts.before }}<mark class="match-mark">{{ codeParts.match }}</mark>{{ codeParts.after }})\r
                              </span>\r
                            }\r
                          </button>\r
                        }\r
                      </div>\r
                    }\r
                    @if (shouldShowTreasurySearchSummary()) {\r
                      <small class="treasury-search-summary">{{ getTreasurySearchSummary() }}</small>\r
                    }\r
                  </div>\r
                  <input\r
                    class="form-input treasury-number-input"\r
                    type="number"\r
                    min="1"\r
                    placeholder="\u0631\u0642\u0645"\r
                    title="\u0641\u0644\u062A\u0631\u0629 \u0628\u0631\u0642\u0645 \u0627\u0644\u062E\u0632\u064A\u0646\u0629"\r
                    [value]="treasuryNumberFilter()"\r
                    (input)="setTreasuryNumberFilter($any($event.target).value)"\r
                    (keydown.enter)="applyTreasuryNumberQuickPick()"\r
                  />\r
                </div>\r
              </div>\r
            </div>\r
            <div class="form-row single-col">\r
              <div class="form-group">\r
                <label class="form-label">\u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F</label>\r
                <input class="form-input" type="text" title="\u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F"\r
                       [value]="previewLoading() ? '\u062C\u0627\u0631\u064A \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0631\u0642\u0645...' : (voucherNumberPreview() || '\u0633\u064A\u0638\u0647\u0631 \u0628\u0639\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062E\u0632\u064A\u0646\u0629')"\r
                       readonly>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- Step 2: Voucher Data -->\r
          <div class="form-step">\r
            <div class="step-header">\r
              <div class="step-num">\u0662</div>\r
              <span>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u0646\u062F</span>\r
            </div>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label class="form-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</label>\r
                <input class="form-input" type="date" title="\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0633\u0646\u062F" [value]="form().voucherDate"\r
                       (change)="setFormField('voucherDate', $any($event.target).value)">\r
              </div>\r
              <div class="form-group">\r
                <label class="form-label">\u0627\u0644\u0639\u0645\u0644\u0629</label>\r
                <select class="form-select" title="\u0627\u0644\u0639\u0645\u0644\u0629" [value]="form().currencyId"\r
                        (change)="setFormField('currencyId', +$any($event.target).value || 1)">\r
                  @for (currency of currencies(); track currency.id) {\r
                    <option [value]="currency.id">{{ currency.nameAr }} ({{ currency.code }})</option>\r
                  }\r
                </select>\r
              </div>\r
            </div>\r
            @if (!isEditing()) {\r
              <!-- \u0627\u0644\u0633\u0646\u062F \u0627\u0644\u062C\u062F\u064A\u062F \u064A\u064F\u0646\u0634\u0623 \u062F\u0627\u0626\u0645\u0627\u064B \u0628\u062D\u0627\u0644\u0629 "\u063A\u064A\u0631 \u0645\u0631\u0627\u062C\u0639" \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B -->\r
            }\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label class="form-label">\u0645\u0628\u0644\u063A \u0627\u0644\u0633\u0646\u062F <span class="required">*</span></label>\r
                <div class="amount-input-wrap">\r
                  <input class="form-input amount-input" type="number" placeholder="0"\r
                         [value]="form().amount"\r
                         (input)="setFormField('amount', $any($event.target).value)">\r
                  <span class="currency-label">{{ getCurrencyLabel(form().currencyId) }}</span>\r
                </div>\r
              </div>\r
              <div class="form-group">\r
                <label class="form-label">\u0627\u0644\u0645\u0631\u062C\u0639</label>\r
                <input class="form-input" type="text" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0645\u0631\u062C\u0639 \u0623\u0648 \u0627\u0644\u0625\u0634\u0639\u0627\u0631"\r
                       [value]="form().reference"\r
                       (input)="setFormField('reference', $any($event.target).value)">\r
              </div>\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">\u0628\u064A\u0627\u0646 \u0627\u0644\u0633\u0646\u062F <span class="required">*</span></label>\r
              <input class="form-input" type="text" placeholder="\u0628\u064A\u0627\u0646 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0623\u0648 \u0648\u0635\u0641 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629..."\r
                     [value]="form().description"\r
                     (input)="setFormField('description', $any($event.target).value)">\r
            </div>\r
\r
          </div>\r
\r
          <!-- Step 3: Voucher Lines -->\r
          <div class="form-step">\r
            <div class="step-header">\r
              <div class="step-num">\u0663</div>\r
              <span>\u0633\u0637\u0648\u0631 \u0627\u0644\u0633\u0646\u062F</span>\r
            </div>\r
            <div class="voucher-lines-list">\r
              @for (line of voucherLines(); track $index; let lineIndex = $index) {\r
                <div class="voucher-line-row">\r
                  <div class="line-index-badge" title="\u0631\u0642\u0645 \u0627\u0644\u0633\u0637\u0631">\r
                    {{ lineIndex + 1 }}\r
                  </div>\r
                  <div class="form-group">\r
                    <label class="form-label">\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A</label>\r
                    <div class="line-autocomplete">\r
                      <input\r
                        class="form-input"\r
                        type="text"\r
                        placeholder="\u0627\u0643\u062A\u0628 \u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628..."\r
                        title="\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A"\r
                        autocomplete="off"\r
                        [value]="line.subNatureQuery || ''"\r
                        (input)="onLineSubNatureTyping(lineIndex, $any($event.target).value)"\r
                        (focus)="onLineSubNatureFocus(lineIndex)"\r
                        (blur)="onLineSubNatureBlur(lineIndex)"\r
                        (keydown)="onLineSubNatureKeydown(lineIndex, $event)"\r
                      />\r
                      @if (line.showSubNatureSuggestions && getLineSubNatureOptions(line).length > 0) {\r
                        <div class="line-suggestions">\r
                          @for (nature of getLineSubNatureOptions(line); track nature.id; let i = $index) {\r
                            <button\r
                              type="button"\r
                              class="line-suggestion-item"\r
                              [class.active]="i === (line.activeSubNatureSuggestionIndex || -1)"\r
                              (mousedown)="$event.preventDefault()"\r
                              (click)="selectLineSubNatureSuggestion(lineIndex, nature)"\r
                            >\r
                              <span class="name">\r
                                @let nameParts = getLineSubNatureNameParts(line, nature);\r
                                {{ nameParts.before }}<mark class="match-mark">{{ nameParts.match }}</mark>{{ nameParts.after }}\r
                              </span>\r
                            </button>\r
                          }\r
                        </div>\r
                      }\r
                    </div>\r
                  </div>\r
                  <div class="form-group">\r
                    <label class="form-label">\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A</label>\r
                    <div class="line-account-picker">\r
                      <div class="line-autocomplete">\r
                        <input\r
                          class="form-input"\r
                          type="text"\r
                          placeholder="\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u062D\u0633\u0627\u0628..."\r
                          title="\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A"\r
                          autocomplete="off"\r
                          [value]="line.accountQuery || ''"\r
                          (input)="onLineAccountTyping(lineIndex, $any($event.target).value)"\r
                          (focus)="onLineAccountFocus(lineIndex)"\r
                          (blur)="onLineAccountBlur(lineIndex)"\r
                          (keydown)="onLineAccountKeydown(lineIndex, $event)"\r
                        />\r
                        @if (line.showAccountSuggestions && getLineAccountOptions(line).length > 0) {\r
                          <div class="line-suggestions">\r
                            @for (account of getLineAccountOptions(line); track account.id; let i = $index) {\r
                              <button\r
                                type="button"\r
                                class="line-suggestion-item"\r
                                [class.active]="i === (line.activeAccountSuggestionIndex || -1)"\r
                                (mousedown)="$event.preventDefault()"\r
                                (click)="selectLineAccountSuggestion(lineIndex, account)"\r
                              >\r
                                <span class="name">\r
                                  @let nameParts = getLineAccountNameParts(line, account);\r
                                  {{ nameParts.before }}<mark class="match-mark">{{ nameParts.match }}</mark>{{ nameParts.after }}\r
                                </span>\r
                                @if (account.code) {\r
                                  <span class="code">\r
                                    @let codeParts = getLineAccountCodeParts(line, account);\r
                                    ({{ codeParts.before }}<mark class="match-mark">{{ codeParts.match }}</mark>{{ codeParts.after }})\r
                                  </span>\r
                                }\r
                              </button>\r
                            }\r
                          </div>\r
                        }\r
                      </div>\r
                      <input\r
                        class="form-input line-account-number-input"\r
                        type="number"\r
                        min="1"\r
                        placeholder="\u0631\u0642\u0645"\r
                        title="\u0631\u0642\u0645 \u0627\u0644\u062D\u0633\u0627\u0628"\r
                        [value]="line.accountNumberFilter || ''"\r
                        (input)="setLineAccountNumberFilter(lineIndex, $any($event.target).value)"\r
                        (keydown)="onVoucherLineFieldKeydown(lineIndex, 'accountNumber', $event)"\r
                      />\r
                    </div>\r
                  </div>\r
                  <div class="form-group line-amount-group">\r
                    <label class="form-label">\u0627\u0644\u0645\u0628\u0644\u063A</label>\r
                    <input class="form-input" type="number" placeholder="0"\r
                           [value]="line.amount"\r
                           (input)="updateVoucherLine(lineIndex, 'amount', $any($event.target).value)"\r
                           (keydown)="onVoucherLineFieldKeydown(lineIndex, 'amount', $event)">\r
                  </div>\r
                  <div class="form-group line-notes-group">\r
                    <label class="form-label">\u0627\u0644\u0628\u064A\u0627\u0646</label>\r
                    <input class="form-input" type="text" placeholder="\u0628\u064A\u0627\u0646 \u0627\u0644\u0633\u0637\u0631"\r
                           [value]="line.notes"\r
                           (input)="updateVoucherLine(lineIndex, 'notes', $any($event.target).value)"\r
                           (keydown)="onVoucherLineFieldKeydown(lineIndex, 'notes', $event)">\r
                  </div>\r
                  <div class="line-actions">\r
                    <button class="icon-btn delete-btn" type="button" title="\u062D\u0630\u0641 \u0627\u0644\u0633\u0637\u0631" (click)="removeVoucherLine(lineIndex)">\r
                      <span class="material-icons-round">delete</span>\r
                    </button>\r
                  </div>\r
                </div>\r
              }\r
            </div>\r
            <div class="voucher-lines-summary">\r
              <button class="btn-3d btn-ghost" type="button" (click)="addVoucherLine()">\r
                <span class="material-icons-round">add</span>\r
                \u0625\u0636\u0627\u0641\u0629 \u0633\u0637\u0631\r
              </button>\r
              <div class="summary-values">\r
                <span>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0637\u0648\u0631: {{ formatAmount(getVoucherLinesTotal()) }}</span>\r
                <span>\u0627\u0644\u0641\u0631\u0642: {{ formatAmount(getVoucherAmountDifference()) }}</span>\r
              </div>\r
            </div>\r
          </div>\r
\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-3d btn-ghost" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
          <button class="btn-3d" [class.btn-receipt]="voucherType() === 'receipt'"\r
                  [class.btn-payment]="voucherType() === 'payment'"\r
                  [disabled]="saving()" (click)="saveVoucher()">\r
            <span class="material-icons-round">{{ saving() ? 'sync' : 'save' }}</span>\r
            {{ saving() ? (isEditing() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B...' : '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...') : (isEditing() ? '\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u0646\u062F' : '\u062D\u0641\u0638 \u0627\u0644\u0633\u0646\u062F') }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===== Voucher Details Modal ===== -->\r
  @if (showDetailsModal()) {\r
    <div class="modal-overlay" (click)="closeDetails()">\r
      <div class="modal-3d details-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">\r
          <div class="modal-icon" style="background:rgba(255,255,255,0.2)">\r
            <span class="material-icons-round">receipt_long</span>\r
          </div>\r
          <h2 style="color:white">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0633\u0646\u062F</h2>\r
          <button class="modal-close" (click)="closeDetails()">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          @if (detailsLoading()) {\r
            <div style="text-align:center;padding:40px"><span class="material-icons-round spin" style="font-size:32px;color:#6366f1">sync</span></div>\r
          } @else if (detailsVoucher()) {\r
            <div class="details-grid">\r
              @if (detailsVoucher().fullSequenceNumber) {\r
                <div class="detail-row" style="background:linear-gradient(135deg,#f0f9ff,#e0f2fe);border-radius:8px;padding:12px">\r
                  <span class="detail-label" style="font-weight:600;color:#0369a1">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A</span>\r
                  <span class="detail-value" style="font-family:monospace;font-size:16px;font-weight:700;color:#0c4a6e;letter-spacing:1px">{{ detailsVoucher().fullSequenceNumber }}</span>\r
                </div>\r
              }\r
              <div class="detail-row">\r
                <span class="detail-label">\u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F</span>\r
                <span class="detail-value">{{ detailsVoucher().voucherNumber || '-' }}</span>\r
              </div>\r
              @if (detailsVoucherNumberParts()) {\r
                <div class="detail-row">\r
                  <span class="detail-label">\u0627\u0644\u062E\u0632\u064A\u0646\u0629</span>\r
                  <span class="detail-value">\r
                    {{ getTreasuryKindLabel(detailsVoucherNumberParts()?.treasuryKindCode || '') }}\r
                    \u2022 \u0627\u0644\u0643\u0648\u062F {{ detailsVoucherNumberParts()?.treasuryCode }}\r
                  </span>\r
                </div>\r
                <div class="detail-row">\r
                  <span class="detail-label">\u0627\u0644\u0633\u0646\u0629 / \u0627\u0644\u062A\u0633\u0644\u0633\u0644</span>\r
                  <span class="detail-value">{{ detailsVoucherNumberParts()?.year }} / {{ detailsVoucherNumberParts()?.serial }}</span>\r
                </div>\r
                <div class="detail-row">\r
                  <span class="detail-label">\u0627\u0644\u0635\u064A\u063A\u0629 \u0627\u0644\u0645\u062E\u062A\u0635\u0631\u0629</span>\r
                  <span class="detail-value" dir="ltr">\r
                    {{ detailsVoucherNumberParts()?.treasuryCode }}-{{ detailsVoucherNumberParts()?.year }}-{{ detailsVoucherNumberParts()?.serial }}\r
                  </span>\r
                </div>\r
              }\r
              @if (!detailsVoucherNumberParts()) {\r
                <div class="detail-row">\r
                  <span class="detail-label">\u0627\u0644\u062E\u0632\u064A\u0646\u0629</span>\r
                  <span class="detail-value">\r
                    {{ getVoucherTreasuryLabel(detailsVoucher()) }}\r
                  </span>\r
                </div>\r
              }\r
              @if (detailsVoucher().accountSequence) {\r
                <div class="detail-row">\r
                  <span class="detail-label">\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u062D\u0633\u0627\u0628</span>\r
                  <span class="detail-value">{{ detailsVoucher().accountSequence }}</span>\r
                </div>\r
              }\r
              @if (detailsVoucher().templateSequence) {\r
                <div class="detail-row">\r
                  <span class="detail-label">\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0642\u0627\u0644\u0628</span>\r
                  <span class="detail-value">{{ detailsVoucher().templateSequence }}</span>\r
                </div>\r
              }\r
              <div class="detail-row">\r
                <span class="detail-label">\u0627\u0644\u0646\u0648\u0639</span>\r
                <span class="detail-value">\r
                  <span class="vr-type-badge" [style.background]="getTypeColor(detailsVoucher().voucherType) + '18'" [style.color]="getTypeColor(detailsVoucher().voucherType)">\r
                    {{ getTypeLabel(detailsVoucher().voucherType) }}\r
                  </span>\r
                </span>\r
              </div>\r
              <div class="detail-row">\r
                <span class="detail-label">\u0627\u0644\u0645\u0628\u0644\u063A</span>\r
                <span class="detail-value amount-big" [style.color]="getTypeColor(detailsVoucher().voucherType)">{{ formatAmount(detailsVoucher().amount) }} \u0631.\u064A</span>\r
              </div>\r
              <div class="detail-row">\r
                <span class="detail-label">\u0627\u0644\u0628\u064A\u0627\u0646</span>\r
                <span class="detail-value">{{ detailsVoucher().description || '-' }}</span>\r
              </div>\r
              <div class="detail-row">\r
                <span class="detail-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</span>\r
                <span class="detail-value">{{ formatDateTime(detailsVoucher().voucherDate || detailsVoucher().createdAt) }}</span>\r
              </div>\r
              <div class="detail-row">\r
                <span class="detail-label">\u0627\u0644\u062D\u0627\u0644\u0629</span>\r
                <span class="detail-value">\r
                  <span class="status-pill" [style.background]="getStatusColor(detailsVoucher().status) + '18'" [style.color]="getStatusColor(detailsVoucher().status)">\r
                    <span class="material-icons-round" style="font-size:14px">{{ getStatusIcon(detailsVoucher().status) }}</span>\r
                    {{ getStatusLabel(detailsVoucher().status) }}\r
                  </span>\r
                </span>\r
              </div>\r
              @if (detailsVoucher().fromAccountId && !isSystemCashAccount(detailsVoucher().fromAccountName || getAccountName(detailsVoucher().fromAccountId))) {\r
                <div class="detail-row">\r
                  <span class="detail-label">\u0645\u0646 \u062D\u0633\u0627\u0628</span>\r
                  <span class="detail-value">{{ detailsVoucher().fromAccountName || getAccountName(detailsVoucher().fromAccountId) }}</span>\r
                </div>\r
              }\r
              @if (detailsVoucher().toAccountId && !isSystemCashAccount(detailsVoucher().toAccountName || getAccountName(detailsVoucher().toAccountId))) {\r
                <div class="detail-row">\r
                  <span class="detail-label">\u0625\u0644\u0649 \u062D\u0633\u0627\u0628</span>\r
                  <span class="detail-value">{{ detailsVoucher().toAccountName || getAccountName(detailsVoucher().toAccountId) }}</span>\r
                </div>\r
              }\r
              <div class="detail-row">\r
                <span class="detail-label">\u0627\u0644\u0623\u0637\u0631\u0627\u0641 \u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0629</span>\r
                <span class="detail-value">{{ getVoucherCounterpartySummary(detailsVoucher()) }}</span>\r
              </div>\r
              @if (detailsVoucher().reference) {\r
                <div class="detail-row">\r
                  <span class="detail-label">\u0627\u0644\u0645\u0631\u062C\u0639</span>\r
                  <span class="detail-value">{{ detailsVoucher().reference }}</span>\r
                </div>\r
              }\r
              @if (detailsVoucher().operationTypeId) {\r
                <div class="detail-row">\r
                  <span class="detail-label">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</span>\r
                  <span class="detail-value">{{ getOpTypeName(detailsVoucher().operationTypeId) }}</span>\r
                </div>\r
              }\r
\r
              @if (getVoucherJournalLines(detailsVoucher()).length > 0) {\r
                <div class="journal-lines-block">\r
                  <div class="journal-lines-title">\u0633\u0637\u0648\u0631 \u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u062A\u0628\u0637</div>\r
                  <div class="journal-lines-table">\r
                    <div class="jl-head">\u0627\u0644\u062D\u0633\u0627\u0628</div>\r
                    <div class="jl-head">\u0627\u0644\u0637\u0631\u0641</div>\r
                    <div class="jl-head">\u0627\u0644\u0645\u0628\u0644\u063A</div>\r
                    @for (line of getVoucherJournalLines(detailsVoucher()); track $index) {\r
                      <div class="jl-cell">{{ line.accountName || '-' }}</div>\r
                      <div class="jl-cell">{{ line.lineType === 'debit' ? '\u0645\u062F\u064A\u0646' : (line.lineType === 'credit' ? '\u062F\u0627\u0626\u0646' : line.lineType) }}</div>\r
                      <div class="jl-cell amount">{{ formatAmount(line.amount) }}</div>\r
                    }\r
                  </div>\r
                </div>\r
              }\r
            </div>\r
          }\r
        </div>\r
        <div class="modal-footer details-footer">\r
          @if (detailsVoucher()) {\r
            <div class="details-status-switch">\r
              <span class="details-status-label">\u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u0646\u062F</span>\r
              <select\r
                class="details-status-select"\r
                title="\u062A\u063A\u064A\u064A\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u0633\u0646\u062F"\r
                [value]="detailsVoucher().status || 'unreviewed'"\r
                [disabled]="saving()"\r
                (change)="onDetailsStatusSelection($any($event.target).value)"\r
              >\r
                <option value="unreviewed">\u063A\u064A\u0631 \u0645\u0631\u0627\u062C\u0639</option>\r
                <option value="reviewed">\u0645\u0631\u0627\u062C\u0639</option>\r
              </select>\r
            </div>\r
            <button class="btn-3d" style="background:#6366f1;color:white" (click)="openEditFromDetails()">\r
              <span class="material-icons-round">edit</span>\r
              \u062A\u0639\u062F\u064A\u0644\r
            </button>\r
            <button class="btn-3d" style="background:#3b82f6;color:white" (click)="openAttachmentsFromDetails()">\r
              <span class="material-icons-round">attach_file</span>\r
              \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A\r
            </button>\r
            <button class="btn-3d" style="background:#06b6d4;color:white" (click)="printVoucher(detailsVoucher())">\r
              <span class="material-icons-round">print</span>\r
              \u0637\u0628\u0627\u0639\u0629\r
            </button>\r
            <button class="btn-3d" style="background:#ef4444;color:white" (click)="deleteDetailsVoucher()">\r
              <span class="material-icons-round">delete</span>\r
              \u062D\u0630\u0641\r
            </button>\r
          }\r
          <button class="btn-3d btn-ghost" (click)="closeDetails()">\u0625\u063A\u0644\u0627\u0642</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===== Print Report Preview (No Popups) ===== -->\r
  @if (showPrintReport() && printingVoucher()) {\r
    <div class="modal-overlay print-preview-overlay" (click)="closePrintReport()">\r
      <div class="modal-3d print-preview-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header" style="background:linear-gradient(135deg,#0f172a,#1e293b)">\r
          <div class="modal-icon" style="background:rgba(255,255,255,0.2)">\r
            <span class="material-icons-round">description</span>\r
          </div>\r
          <h2 style="color:white">\u062A\u0642\u0631\u064A\u0631 {{ getVoucherDocumentTitle(printingVoucher()) }}</h2>\r
          <button class="modal-close" (click)="closePrintReport()">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          <div id="voucher-print-area" class="print-report-card">\r
            <div class="print-header gradient">\r
              <h2>{{ biz.currentBusinessName() || '\u062D\u0633\u0627\u0628\u0627\u062A\u064A' }}</h2>\r
              <h3 class="document-title">{{ getVoucherDocumentTitle(printingVoucher()) }}</h3>\r
              @if (printingVoucher().fullSequenceNumber) {\r
                <p style="font-family:monospace;font-size:16px;font-weight:700;letter-spacing:1px">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A: {{ printingVoucher().fullSequenceNumber }}</p>\r
              }\r
              <p>\u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F: {{ printingVoucher().voucherNumber || '-' }}</p>\r
            </div>\r
            <div class="print-badges">\r
              <span class="print-badge document">{{ getVoucherDirectionLabel(printingVoucher()) }}</span>\r
              <span class="print-badge treasury">\u0627\u0644\u062E\u0632\u064A\u0646\u0629: {{ getVoucherTreasuryLabel(printingVoucher()) }}</span>\r
              <span class="print-badge counterpart">\u0627\u0644\u0623\u0637\u0631\u0627\u0641: {{ getVoucherCounterpartySummary(printingVoucher()) }}</span>\r
              <span class="print-badge status">{{ getStatusLabel(printingVoucher().status) }}</span>\r
            </div>\r
            <div class="print-row">\r
              <span class="print-label">\u0646\u0648\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F:</span>\r
              <span>{{ getVoucherDocumentTitle(printingVoucher()) }}</span>\r
            </div>\r
            <div class="print-row">\r
              <span class="print-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</span>\r
              <span>{{ formatDate(printingVoucher().voucherDate || printingVoucher().createdAt) }}</span>\r
            </div>\r
            <div class="print-row">\r
              <span class="print-label">\u0627\u0644\u062D\u0627\u0644\u0629:</span>\r
              <span>{{ getStatusLabel(printingVoucher().status) }}</span>\r
            </div>\r
            <div class="print-row">\r
              <span class="print-label">\u0627\u0644\u062E\u0632\u064A\u0646\u0629:</span>\r
              <span>{{ getVoucherTreasuryLabel(printingVoucher()) }}</span>\r
            </div>\r
            @if (printingVoucher().fromAccountId && !isSystemCashAccount(printingVoucher().fromAccountName || getAccountName(printingVoucher().fromAccountId))) {\r
              <div class="print-row">\r
                <span class="print-label">\u0645\u0646 \u062D\u0633\u0627\u0628:</span>\r
                <span>{{ printingVoucher().fromAccountName || getAccountName(printingVoucher().fromAccountId) }}</span>\r
              </div>\r
            }\r
            @if (printingVoucher().toAccountId && !isSystemCashAccount(printingVoucher().toAccountName || getAccountName(printingVoucher().toAccountId))) {\r
              <div class="print-row">\r
                <span class="print-label">\u0625\u0644\u0649 \u062D\u0633\u0627\u0628:</span>\r
                <span>{{ printingVoucher().toAccountName || getAccountName(printingVoucher().toAccountId) }}</span>\r
              </div>\r
            }\r
            <div class="print-amount">\r
              {{ formatAmount(printingVoucher().amount) }} \u0631.\u064A\r
            </div>\r
            <div class="print-row">\r
              <span class="print-label">\u0627\u0644\u0628\u064A\u0627\u0646:</span>\r
              <span>{{ printingVoucher().description || '-' }}</span>\r
            </div>\r
            @if (printingVoucher().reference) {\r
              <div class="print-row">\r
                <span class="print-label">\u0627\u0644\u0645\u0631\u062C\u0639:</span>\r
                <span>{{ printingVoucher().reference }}</span>\r
              </div>\r
            }\r
            @if (getVoucherJournalLines(printingVoucher()).length > 0) {\r
              <div class="print-lines-block">\r
                <div class="print-lines-title">\u0633\u0637\u0648\u0631 \u0627\u0644\u062D\u0631\u0643\u0629</div>\r
                <table class="print-lines-table">\r
                  <thead>\r
                    <tr>\r
                      <th>\u0627\u0644\u062D\u0633\u0627\u0628</th>\r
                      <th>\u0627\u0644\u0637\u0631\u0641</th>\r
                      <th>\u0627\u0644\u0645\u0628\u0644\u063A</th>\r
                    </tr>\r
                  </thead>\r
                  <tbody>\r
                    @for (line of getVoucherJournalLines(printingVoucher()); track $index) {\r
                      <tr>\r
                        <td>{{ line.accountName || '-' }}</td>\r
                        <td>{{ line.lineType === 'debit' ? '\u0645\u062F\u064A\u0646' : (line.lineType === 'credit' ? '\u062F\u0627\u0626\u0646' : line.lineType) }}</td>\r
                        <td>{{ formatAmount(line.amount) }}</td>\r
                      </tr>\r
                    }\r
                  </tbody>\r
                </table>\r
              </div>\r
            }\r
            <div class="print-footer">\r
              <div class="print-sig">\u0627\u0644\u0645\u062D\u0627\u0633\u0628</div>\r
              <div class="print-sig">\u0627\u0644\u0645\u062F\u064A\u0631</div>\r
              <div class="print-sig">\u0627\u0644\u0645\u0633\u062A\u0644\u0645</div>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-3d btn-ghost" (click)="closePrintReport()">\u0625\u063A\u0644\u0627\u0642</button>\r
          <button class="btn-3d" style="background:#06b6d4;color:white" (click)="printCurrentReport()">\r
            <span class="material-icons-round">print</span>\r
            \u0637\u0628\u0627\u0639\u0629\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===== Attachments Dialog ===== -->\r
  @if (showAttachments()) {\r
    <div class="modal-overlay" (click)="showAttachments.set(false)">\r
      <div class="modal-3d" style="max-width:560px" (click)="$event.stopPropagation()">\r
        <div class="modal-header" style="background:linear-gradient(135deg,#3b82f6,#2563eb)">\r
          <div class="modal-icon" style="background:rgba(255,255,255,0.2)">\r
            <span class="material-icons-round">attach_file</span>\r
          </div>\r
          <h2 style="color:white">\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</h2>\r
          <button class="modal-close" (click)="showAttachments.set(false)">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          @if (attachments().length > 0) {\r
            <div style="margin-bottom:16px">\r
              @for (att of attachments(); track att.id) {\r
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:8px">\r
                  <div style="display:flex;align-items:center;gap:8px">\r
                    <span class="material-icons-round" style="color:#3b82f6">description</span>\r
                    <div>\r
                      <div style="font-size:14px;font-weight:500">{{att.fileName}}</div>\r
                      <div style="font-size:11px;color:#94a3b8">{{att.description || att.fileType}}</div>\r
                    </div>\r
                  </div>\r
                  <button class="icon-btn delete-btn" (click)="removeAttachment(att.id)">\r
                    <span class="material-icons-round">close</span>\r
                  </button>\r
                </div>\r
              }\r
            </div>\r
          } @else {\r
            <p style="text-align:center;color:#94a3b8;padding:16px">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A</p>\r
          }\r
          <div style="border-top:1px solid #e2e8f0;padding-top:16px">\r
            <h4 style="font-size:14px;margin-bottom:8px">\u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642</h4>\r
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">\r
              <input class="form-input" type="text" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0644\u0641" [value]="attachmentForm().fileName" (input)="attachmentForm.update(f => ({...f, fileName: $any($event.target).value}))">\r
              <input class="form-input" type="text" placeholder="\u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0644\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A - \u064A\u0648\u0644\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)" [value]="attachmentForm().filePath" (input)="attachmentForm.update(f => ({...f, filePath: $any($event.target).value}))">\r
            </div>\r
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">\r
              <select class="form-select" [value]="attachmentForm().importance || '\u0639\u0627\u062F\u064A'" title="\u062F\u0631\u062C\u0629 \u0627\u0644\u0623\u0647\u0645\u064A\u0629" (change)="attachmentForm.update(f => ({...f, importance: $any($event.target).value}))">\r
                <option value="\u0639\u0627\u062C\u0644">\u0639\u0627\u062C\u0644</option>\r
                <option value="\u0645\u0647\u0645">\u0645\u0647\u0645</option>\r
                <option value="\u0639\u0627\u062F\u064A">\u0639\u0627\u062F\u064A</option>\r
              </select>\r
              <div></div>\r
            </div>\r
            <input class="form-input" style="margin-top:8px" type="text" placeholder="\u0648\u0635\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)" [value]="attachmentForm().description" (input)="attachmentForm.update(f => ({...f, description: $any($event.target).value}))">\r
            <button class="btn-3d" style="margin-top:8px;background:#3b82f6;color:white;width:100%" (click)="addAttachment()">\r
              <span class="material-icons-round">upload</span>\r
              \u0625\u0636\u0627\u0641\u0629\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
</div>\r
`, styles: ['/* src/app/pages/vouchers/vouchers.scss */\n.page-container {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.06),\n      rgba(20, 184, 166, 0.04));\n  border-radius: 20px;\n  border: 1px solid rgba(34, 197, 94, 0.12);\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-icon-3d {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.page-icon-3d.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.page-icon-3d .material-icons-round {\n  font-size: 26px;\n  color: white;\n}\n.page-icon-3d:hover {\n  transform: perspective(100px) rotateX(0deg) scale(1.05);\n}\n.page-title {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 3px;\n}\n.page-subtitle {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.help-btn {\n  width: 40px;\n  height: 40px;\n  border-radius: 11px;\n  border: 1.5px solid rgba(245, 158, 11, 0.3);\n  background: rgba(245, 158, 11, 0.08);\n  color: #f59e0b;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.help-btn .material-icons-round {\n  font-size: 20px;\n}\n.help-btn:hover {\n  background: rgba(245, 158, 11, 0.15);\n  transform: scale(1.08) rotate(15deg);\n}\n.btn-3d {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d .material-icons-round {\n  font-size: 17px;\n}\n.btn-3d.btn-receipt {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  color: white;\n  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-receipt:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);\n}\n.btn-3d.btn-payment {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n  color: white;\n  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-payment:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);\n}\n.btn-3d.btn-ghost {\n  background: transparent;\n  color: var(--text-secondary, #64748b);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n}\n.btn-3d.btn-ghost:hover {\n  background: var(--bg-surface, #f8fafc);\n  transform: translateY(-1px);\n}\n.btn-3d.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);\n}\n.btn-3d:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n}\n.alert-error {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\n.alert-error .material-icons-round {\n  font-size: 18px;\n}\n.alert-error .close-x {\n  margin-right: auto;\n  opacity: 0.6;\n}\n.stats-row {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.stat-card-3d {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  flex: 1;\n  min-width: 160px;\n}\n.stat-card-3d:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.stat-card-3d .sc-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-card-3d .sc-icon .material-icons-round {\n  font-size: 22px;\n  color: white;\n}\n.stat-card-3d.total .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #64748b,\n      #475569);\n}\n.stat-card-3d.receipt .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.stat-card-3d.payment .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.sc-num {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n}\n.sc-label {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.sc-amount {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n}\n.tabs-bar {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.filters-card {\n  margin-bottom: 16px;\n  padding: 12px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.filters-row {\n  display: grid;\n  grid-template-columns: 1.2fr 0.9fr 1fr 0.9fr auto;\n  gap: 10px;\n  align-items: end;\n}\n.filters-row.advanced {\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  margin-top: 10px;\n  padding-top: 10px;\n  border-top: 1px dashed var(--border-color, #e2e8f0);\n}\n.filters-actions {\n  display: flex;\n  gap: 8px;\n}\n.tab-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-secondary, #64748b);\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab-btn .material-icons-round {\n  font-size: 16px;\n}\n.tab-btn.active {\n  background: var(--tab-color, #64748b);\n  color: white;\n  border-color: transparent;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);\n  transform: translateY(-1px);\n}\n.tab-btn:not(.active):hover {\n  border-color: var(--tab-color, #64748b);\n  color: var(--tab-color, #64748b);\n}\n.loading-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.skeleton-row {\n  height: 72px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      90deg,\n      #f0f0f0 25%,\n      #e8e8e8 50%,\n      #f0f0f0 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n}\n@keyframes shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.empty-state p {\n  font-size: 14px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n.empty-icon-3d {\n  width: 72px;\n  height: 72px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 12px 32px rgba(34, 197, 94, 0.3);\n  transform: perspective(150px) rotateX(10deg);\n}\n.empty-icon-3d .material-icons-round {\n  font-size: 36px;\n  color: white;\n}\n.empty-actions {\n  display: flex;\n  gap: 10px;\n}\n.vouchers-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.voucher-row-3d {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 16px;\n  border-radius: 14px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  position: relative;\n  overflow: hidden;\n  transition: all 0.2s;\n  cursor: pointer;\n}\n.voucher-row-3d::before {\n  content: "";\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 3px;\n  background: var(--v-color, #64748b);\n}\n.voucher-row-3d:hover {\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);\n  transform: translateX(-3px);\n}\n.vr-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--v-color, #64748b);\n  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);\n}\n.vr-icon .material-icons-round {\n  font-size: 20px;\n  color: white;\n}\n.vr-main {\n  flex: 1;\n  min-width: 0;\n}\n.vr-desc {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 4px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.vr-meta {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.vr-date,\n.vr-account,\n.vr-number {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n}\n.vr-date .material-icons-round,\n.vr-account .material-icons-round,\n.vr-number .material-icons-round {\n  font-size: 12px;\n}\n.vr-right {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n}\n.vr-amount {\n  font-size: 16px;\n  font-weight: 900;\n  direction: ltr;\n}\n.vr-type-badge {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.vr-actions {\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.icon-btn {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn .material-icons-round {\n  font-size: 15px;\n}\n.icon-btn.delete-btn {\n  color: #ef4444;\n}\n.icon-btn.delete-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  animation: fadeIn 0.2s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-3d {\n  background: var(--bg-card, white);\n  border-radius: 22px;\n  width: 100%;\n  max-width: 580px;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.08);\n  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes slideUp {\n  from {\n    transform: translateY(40px) scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.hiw-modal {\n  max-width: 520px;\n}\n.form-modal {\n  max-width: min(1120px, 96vw);\n}\n.details-modal {\n  max-width: min(980px, 96vw);\n}\n.details-modal .modal-body {\n  max-height: min(72vh, 820px);\n}\n.details-footer {\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  gap: 8px;\n}\n.details-footer .btn-3d {\n  white-space: nowrap;\n}\n.details-footer .btn-3d.btn-ghost {\n  margin-inline-start: auto;\n}\n.details-status-switch {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  background: rgba(99, 102, 241, 0.08);\n  border: 1px solid rgba(99, 102, 241, 0.18);\n  border-radius: 10px;\n  padding: 6px 8px;\n}\n.details-status-label {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  white-space: nowrap;\n}\n.details-status-select {\n  min-width: 120px;\n  border: 1px solid var(--border-color, #cbd5e1);\n  border-radius: 8px;\n  padding: 7px 10px;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  color: var(--text-primary, #1e293b);\n  background: var(--bg-card, #fff);\n  cursor: pointer;\n}\n.details-status-select:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.form-modal .modal-header h2 {\n  font-size: 18px;\n}\n.form-modal .modal-subtitle {\n  font-size: 13px;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 18px 22px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.modal-header.receipt-header {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.06),\n      rgba(20, 184, 166, 0.04));\n}\n.modal-header.payment-header {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(239, 68, 68, 0.06),\n      rgba(249, 115, 22, 0.04));\n}\n.modal-header h2 {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n  flex: 1;\n}\n.modal-subtitle {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 2px 0 0;\n}\n.modal-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);\n}\n.modal-icon .material-icons-round {\n  font-size: 21px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.receipt-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.payment-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.modal-close {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  border: none;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.modal-close .material-icons-round {\n  font-size: 17px;\n}\n.modal-close:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 18px 22px;\n}\n.modal-footer {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  padding: 14px 22px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.form-step {\n  margin-bottom: 16px;\n  padding: 14px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.step-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 12px;\n}\n.step-num {\n  width: 26px;\n  height: 26px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 900;\n  flex-shrink: 0;\n}\n.op-types-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.op-type-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 7px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  color: var(--text-secondary, #64748b);\n  transition: all 0.2s;\n}\n.op-type-btn .material-icons-round {\n  font-size: 15px;\n}\n.op-type-btn.selected {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  border-color: transparent;\n  box-shadow: 0 3px 10px rgba(59, 130, 246, 0.3);\n  transform: translateY(-1px);\n}\n.op-type-btn:not(.selected):hover {\n  border-color: #3b82f6;\n  color: #3b82f6;\n}\n.no-op-types {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n}\n.no-op-types .material-icons-round {\n  font-size: 16px;\n}\n.form-group {\n  margin-bottom: 12px;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.form-row.single-col {\n  grid-template-columns: 1fr;\n}\n.form-label {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.form-label .required {\n  color: #ef4444;\n}\n.form-input,\n.form-select {\n  width: 100%;\n  padding: 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input:focus,\n.form-select:focus {\n  border-color: #3b82f6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.treasury-picker {\n  display: grid;\n  grid-template-columns: 1fr 92px;\n  gap: 8px;\n}\n.treasury-autocomplete {\n  position: relative;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.treasury-suggestions {\n  position: absolute;\n  z-index: 20;\n  top: calc(100% + 2px);\n  left: 0;\n  right: 0;\n  display: grid;\n  gap: 2px;\n  max-height: 220px;\n  overflow-y: auto;\n  padding: 6px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, #fff);\n  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);\n}\n.treasury-suggestion-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  width: 100%;\n  border: none;\n  border-radius: 8px;\n  padding: 7px 9px;\n  background: transparent;\n  color: var(--text-primary, #1e293b);\n  text-align: right;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 700;\n}\n.treasury-suggestion-item .code {\n  color: var(--text-muted, #64748b);\n  font-size: 11px;\n  font-weight: 700;\n  direction: ltr;\n}\n.treasury-suggestion-item:hover,\n.treasury-suggestion-item.active {\n  background: rgba(59, 130, 246, 0.12);\n  color: #1d4ed8;\n}\n.match-mark {\n  background: rgba(250, 204, 21, 0.36);\n  color: inherit;\n  padding: 0 2px;\n  border-radius: 4px;\n  font-weight: 900;\n}\n.treasury-search-summary {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-muted, #64748b);\n  padding-inline: 2px;\n}\n.treasury-number-input {\n  text-align: center;\n  font-weight: 800;\n}\n.amount-input-wrap {\n  display: flex;\n  align-items: center;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  border-radius: 9px;\n  overflow: hidden;\n  background: var(--bg-card, white);\n}\n.amount-input-wrap:focus-within {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.amount-input {\n  flex: 1;\n  border: none !important;\n  box-shadow: none !important;\n  border-radius: 0 !important;\n}\n.currency-label {\n  padding: 9px 12px;\n  background: var(--bg-surface, #f8fafc);\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  border-right: 1px solid var(--border-color, #e2e8f0);\n}\n.voucher-lines-list {\n  display: grid;\n  gap: 10px;\n}\n.voucher-line-row {\n  display: grid;\n  grid-template-columns: 56px 1.1fr 1.5fr 0.7fr 2fr auto;\n  gap: 10px;\n  align-items: end;\n  padding: 12px;\n  border-radius: 12px;\n  background: var(--bg-card, white);\n  border: 1px solid var(--border-color, #e2e8f0);\n}\n.line-index-badge {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 900;\n  color: #1d4ed8;\n  background: rgba(59, 130, 246, 0.12);\n  border: 1px solid rgba(59, 130, 246, 0.24);\n  margin-bottom: 2px;\n}\n.line-amount-group .form-input {\n  min-width: 92px;\n}\n.line-notes-group .form-input {\n  min-width: 260px;\n}\n.line-autocomplete {\n  position: relative;\n}\n.line-suggestions {\n  position: absolute;\n  z-index: 15;\n  top: calc(100% + 2px);\n  left: 0;\n  right: 0;\n  display: grid;\n  gap: 2px;\n  max-height: 220px;\n  overflow-y: auto;\n  padding: 6px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, #fff);\n  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);\n}\n.line-suggestion-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  width: 100%;\n  border: none;\n  border-radius: 8px;\n  padding: 7px 9px;\n  background: transparent;\n  color: var(--text-primary, #1e293b);\n  text-align: right;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 12px;\n  font-weight: 700;\n}\n.line-suggestion-item .code {\n  color: var(--text-muted, #64748b);\n  font-size: 11px;\n  font-weight: 700;\n  direction: ltr;\n}\n.line-suggestion-item:hover,\n.line-suggestion-item.active {\n  background: rgba(59, 130, 246, 0.12);\n  color: #1d4ed8;\n}\n.line-account-picker {\n  display: grid;\n  grid-template-columns: 1fr 84px;\n  gap: 8px;\n}\n.line-account-number-input {\n  text-align: center;\n  font-weight: 800;\n}\n.line-actions {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-bottom: 12px;\n}\n.voucher-lines-summary {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-top: 12px;\n}\n.summary-values {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #475569);\n}\n.hiw-section {\n  padding: 14px 0;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.hiw-section:last-child {\n  border-bottom: none;\n}\n.hiw-section h3 {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 8px;\n}\n.hiw-section h3 .material-icons-round {\n  font-size: 17px;\n  color: #f59e0b;\n}\n.hiw-section p {\n  font-size: 13px;\n  line-height: 1.9;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.details-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.detail-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 0;\n  border-bottom: 1px solid var(--border-color, #f0f0f0);\n}\n.detail-row:last-child {\n  border-bottom: none;\n}\n.detail-label {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n}\n.detail-value {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.detail-value.amount-big {\n  font-size: 20px;\n  font-weight: 900;\n}\n.status-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 3px 10px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.journal-lines-block {\n  margin-top: 12px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  border-radius: 10px;\n  padding: 10px;\n  background: var(--bg-surface, #f8fafc);\n}\n.journal-lines-title {\n  font-size: 12px;\n  font-weight: 800;\n  margin-bottom: 8px;\n  color: var(--text-primary, #1e293b);\n}\n.journal-lines-table {\n  display: grid;\n  grid-template-columns: 1.6fr 0.8fr 1fr;\n  gap: 6px 8px;\n}\n.jl-head {\n  font-size: 11px;\n  font-weight: 800;\n  color: var(--text-secondary, #64748b);\n  padding-bottom: 4px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.jl-cell {\n  font-size: 12px;\n  color: var(--text-primary, #1e293b);\n}\n.jl-cell.amount {\n  font-weight: 700;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.spin {\n  animation: spin 1s linear infinite;\n}\n.print-preview-modal {\n  max-width: 860px;\n}\n.print-preview-overlay .modal-body {\n  background: #f5f7fb;\n}\n.print-report-card {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 18px;\n  color: #0f172a;\n}\n.print-report-card,\n.print-report-card * {\n  color: #0f172a;\n}\n.print-header {\n  text-align: center;\n  margin-bottom: 16px;\n  border-bottom: 2px solid #1f2937;\n  padding-bottom: 10px;\n}\n.print-header.gradient {\n  margin: -18px -18px 16px;\n  padding: 16px 18px;\n  border-bottom: 0;\n  background:\n    linear-gradient(\n      135deg,\n      #0f172a,\n      #1d4ed8,\n      #0ea5e9);\n}\n.print-header h2,\n.print-header h3,\n.print-header p {\n  margin: 6px 0;\n  color: #0f172a !important;\n}\n.print-header.gradient h2,\n.print-header.gradient h3,\n.print-header.gradient p {\n  color: #fff !important;\n}\n.print-header .document-title {\n  font-size: 26px;\n  font-weight: 900;\n  letter-spacing: 0.3px;\n}\n.print-header h2 {\n  font-size: 22px;\n  font-weight: 900;\n}\n.print-header h3 {\n  font-size: 18px;\n  font-weight: 800;\n}\n.print-badges {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n.print-badge {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 999px;\n  padding: 5px 10px;\n  font-size: 12px;\n  font-weight: 800;\n  border: 1px solid transparent;\n}\n.print-badge.treasury {\n  background: #e0f2fe;\n  color: #075985 !important;\n  border-color: #bae6fd;\n}\n.print-badge.document {\n  background: #dbeafe;\n  color: #1e40af !important;\n  border-color: #bfdbfe;\n}\n.print-badge.counterpart {\n  background: #ede9fe;\n  color: #5b21b6 !important;\n  border-color: #ddd6fe;\n}\n.print-badge.status {\n  background: #dcfce7;\n  color: #166534 !important;\n  border-color: #bbf7d0;\n}\n.print-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  margin: 8px 0;\n  padding: 6px 0;\n  border-bottom: 1px dotted #94a3b8;\n}\n.print-label {\n  font-weight: 800;\n  color: #334155 !important;\n}\n.print-amount {\n  font-size: 28px;\n  font-weight: 900;\n  text-align: center;\n  margin: 18px 0;\n  padding: 10px;\n  border: 2px solid #0f172a;\n  border-radius: 10px;\n  color: #0f172a !important;\n  background: #f8fafc;\n}\n.print-footer {\n  margin-top: 28px;\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n}\n.print-lines-block {\n  margin-top: 18px;\n}\n.print-lines-title {\n  font-weight: 700;\n  margin-bottom: 8px;\n}\n.print-lines-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n  background: #fff;\n}\n.print-lines-table th,\n.print-lines-table td {\n  border: 1px solid #cbd5e1;\n  padding: 6px;\n  text-align: right;\n  color: #0f172a !important;\n  background: #fff;\n}\n.print-lines-table th {\n  font-weight: 800;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc,\n      #eef2ff);\n}\n@media print {\n  body * {\n    visibility: hidden !important;\n  }\n  #voucher-print-area,\n  #voucher-print-area * {\n    visibility: visible !important;\n    display: block !important;\n  }\n  #voucher-print-area {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    padding: 20px;\n    font-family: "Tajawal", sans-serif;\n    border: 0 !important;\n    border-radius: 0 !important;\n    color: #000 !important;\n    background: #fff !important;\n  }\n  .print-row {\n    display: flex !important;\n  }\n  .print-lines-table {\n    display: table !important;\n    width: 100%;\n    border-collapse: collapse;\n  }\n  .print-lines-table thead {\n    display: table-header-group !important;\n  }\n  .print-lines-table tbody {\n    display: table-row-group !important;\n  }\n  .print-lines-table tr {\n    display: table-row !important;\n  }\n  .print-lines-table th,\n  .print-lines-table td {\n    display: table-cell !important;\n    border: 1px solid #ddd !important;\n  }\n}\n@media (max-width: 768px) {\n  .page-header {\n    flex-direction: column;\n    gap: 14px;\n    align-items: flex-start;\n  }\n  .stats-row {\n    flex-direction: column;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n  .treasury-picker {\n    grid-template-columns: 1fr;\n  }\n  .filters-row {\n    grid-template-columns: 1fr;\n  }\n  .filters-row.advanced {\n    grid-template-columns: 1fr;\n  }\n  .filters-actions {\n    width: 100%;\n  }\n  .voucher-line-row {\n    grid-template-columns: 1fr;\n  }\n  .line-index-badge {\n    margin-bottom: 6px;\n  }\n  .line-account-picker {\n    grid-template-columns: 1fr;\n  }\n  .voucher-lines-summary {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .summary-values {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 6px;\n  }\n  .modal-3d {\n    border-radius: 16px;\n  }\n  .details-modal {\n    max-width: 100%;\n  }\n  .details-footer .btn-3d {\n    flex: 1 1 calc(50% - 8px);\n    justify-content: center;\n  }\n  .details-status-switch {\n    width: 100%;\n    justify-content: space-between;\n  }\n  .details-status-select {\n    width: 100%;\n  }\n  .details-footer .btn-3d.btn-ghost {\n    flex-basis: 100%;\n    margin-inline-start: 0;\n  }\n  .voucher-row-3d {\n    flex-wrap: wrap;\n  }\n  .journal-lines-table {\n    grid-template-columns: 1fr;\n  }\n  .print-badges {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=vouchers.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VouchersComponent, { className: "VouchersComponent", filePath: "src/app/pages/vouchers/vouchers.ts", lineNumber: 56 });
})();
export {
  VouchersComponent
};
//# sourceMappingURL=chunk-W6SRLYZB.js.map
