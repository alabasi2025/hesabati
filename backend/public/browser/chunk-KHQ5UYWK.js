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
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
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
  CommonModule,
  Component,
  DecimalPipe,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/reports-advanced/reports-advanced.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function ReportsAdvancedComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function ReportsAdvancedComponent_For_18_Template_button_click_0_listener() {
      const t_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.activeTab = t_r2.key;
      return \u0275\u0275resetView(ctx_r2.loadTab());
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activeTab === t_r2.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r2.label, " ");
  }
}
function ReportsAdvancedComponent_Conditional_19_Conditional_10_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r6 = ctx.$implicit;
    \u0275\u0275property("value", a_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r6.displayName || a_r6.name);
  }
}
function ReportsAdvancedComponent_Conditional_19_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "label", 25);
    \u0275\u0275text(2, "\u0627\u0644\u062D\u0633\u0627\u0628 / \u0627\u0644\u0635\u0646\u062F\u0648\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 26);
    \u0275\u0275twoWayListener("ngModelChange", function ReportsAdvancedComponent_Conditional_19_Conditional_10_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedAccountId, $event) || (ctx_r2.selectedAccountId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(4, ReportsAdvancedComponent_Conditional_19_Conditional_10_For_5_Template, 2, 2, "option", 27, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 17)(7, "label", 28);
    \u0275\u0275text(8, "\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "select", 29);
    \u0275\u0275twoWayListener("ngModelChange", function ReportsAdvancedComponent_Conditional_19_Conditional_10_Template_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.statementSourceType, $event) || (ctx_r2.statementSourceType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(10, "option", 30);
    \u0275\u0275text(11, "\u0627\u0644\u0643\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "option", 31);
    \u0275\u0275text(13, "\u0633\u0646\u062F \u0635\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 32);
    \u0275\u0275text(15, "\u0633\u0646\u062F \u0642\u0628\u0636");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 33);
    \u0275\u0275text(17, "\u0642\u064A\u062F \u064A\u0648\u0645\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 34);
    \u0275\u0275text(19, "\u062D\u0631\u0643\u0629 \u0645\u062E\u0632\u0646\u064A\u0629");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedAccountId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.allAccountsAndFunds);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.statementSourceType);
  }
}
function ReportsAdvancedComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 16)(2, "div", 17)(3, "label", 18);
    \u0275\u0275text(4, "\u0645\u0646 \u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function ReportsAdvancedComponent_Conditional_19_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.dateFrom, $event) || (ctx_r2.dateFrom = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 17)(7, "label", 20);
    \u0275\u0275text(8, "\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function ReportsAdvancedComponent_Conditional_19_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.dateTo, $event) || (ctx_r2.dateTo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, ReportsAdvancedComponent_Conditional_19_Conditional_10_Template, 20, 2);
    \u0275\u0275elementStart(11, "div", 22)(12, "button", 23);
    \u0275\u0275listener("click", function ReportsAdvancedComponent_Conditional_19_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadTab());
    });
    \u0275\u0275elementStart(13, "span", 4);
    \u0275\u0275text(14, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " \u0639\u0631\u0636 ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.dateFrom);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.dateTo);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTab === "statement" ? 10 : -1);
  }
}
function ReportsAdvancedComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 16)(2, "div", 17)(3, "label", 35);
    \u0275\u0275text(4, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function ReportsAdvancedComponent_Conditional_20_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.dailyDate, $event) || (ctx_r2.dailyDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 22)(7, "button", 23);
    \u0275\u0275listener("click", function ReportsAdvancedComponent_Conditional_20_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadTab());
    });
    \u0275\u0275elementStart(8, "span", 4);
    \u0275\u0275text(9, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \u0639\u0631\u0636 ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.dailyDate);
  }
}
function ReportsAdvancedComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "div", 37);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function ReportsAdvancedComponent_Conditional_23_Conditional_40_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span", 53);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 54);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 55);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r8.category);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(c_r8.voucher_type === "receipt" ? "receipt" : "payment");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r8.voucher_type === "receipt" ? "\u0625\u064A\u0631\u0627\u062F" : "\u0645\u0635\u0631\u0648\u0641");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 6, c_r8.total, "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r8.count);
  }
}
function ReportsAdvancedComponent_Conditional_23_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48)(2, "div", 49)(3, "span", 4);
    \u0275\u0275text(4, "category");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6, "\u062A\u0641\u0635\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 50)(8, "table", 51)(9, "thead")(10, "tr")(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u0645\u062C\u0645\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "\u0627\u0644\u0639\u062F\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275repeaterCreate(20, ReportsAdvancedComponent_Conditional_23_Conditional_40_For_21_Template, 11, 9, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(20);
    \u0275\u0275repeater(ctx_r2.profitLoss.byCategory);
  }
}
function ReportsAdvancedComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40)(3, "span", 4);
    \u0275\u0275text(4, "arrow_downward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 41)(6, "div", 42);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 43);
    \u0275\u0275text(10, "\u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 44)(12, "div", 40)(13, "span", 4);
    \u0275\u0275text(14, "arrow_upward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 41)(16, "div", 42);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 43);
    \u0275\u0275text(20, "\u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 45)(22, "div", 40)(23, "span", 4);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 41)(26, "div", 42);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 43);
    \u0275\u0275text(30, "\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0628\u062D");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 46)(32, "div", 40)(33, "span", 4);
    \u0275\u0275text(34, "receipt_long");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 41)(36, "div", 42);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 43);
    \u0275\u0275text(39, "\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(40, ReportsAdvancedComponent_Conditional_23_Conditional_40_Template, 22, 0, "div", 47);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 8, ctx_r2.profitLoss.summary.totalIncome, "1.0-0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 11, ctx_r2.profitLoss.summary.totalExpenses, "1.0-0"));
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r2.profitLoss.summary.netProfit >= 0 ? "blue" : "amber");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.profitLoss.summary.netProfit >= 0 ? "trending_up" : "trending_down");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(28, 14, ctx_r2.profitLoss.summary.netProfit, "1.0-0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r2.profitLoss.summary.totalOperations);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((ctx_r2.profitLoss.byCategory == null ? null : ctx_r2.profitLoss.byCategory.length) ? 40 : -1);
  }
}
function ReportsAdvancedComponent_Conditional_24_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "span", 66);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 67);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r9 = ctx.$implicit;
    \u0275\u0275classMap(b_r9.balance >= 0 ? "positive" : "negative");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(b_r9.currencyCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 4, b_r9.balance, "1.0-2"));
  }
}
function ReportsAdvancedComponent_Conditional_24_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 69);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 70);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 71);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 72);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 73);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 74);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const e_r10 = ctx.$implicit;
    const $index_r11 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r11 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r10.entry_date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r10.entry_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getSourceTypeLabel(e_r10.source_type || e_r10.sourceType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r10.entry_description || e_r10.line_description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r10.line_type === "debit" ? \u0275\u0275pipeBind2(13, 10, e_r10.amount, "1.0-2") : "-");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(e_r10.line_type === "credit" ? \u0275\u0275pipeBind2(16, 13, e_r10.amount, "1.0-2") : "-");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(e_r10.runningBalance >= 0 ? "positive" : "negative");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 16, e_r10.runningBalance, "1.0-2"));
  }
}
function ReportsAdvancedComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 57)(2, "span", 4);
    \u0275\u0275text(3, "account_balance");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 58)(5, "div", 59);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 60);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 61);
    \u0275\u0275repeaterCreate(10, ReportsAdvancedComponent_Conditional_24_For_11_Template, 6, 7, "div", 62, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 47)(13, "div", 48)(14, "div", 49)(15, "span", 4);
    \u0275\u0275text(16, "receipt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "h3");
    \u0275\u0275text(18, "\u062D\u0631\u0643\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 63)(20, "span", 64);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 50)(23, "table", 51)(24, "thead")(25, "tr")(26, "th");
    \u0275\u0275text(27, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "th");
    \u0275\u0275text(29, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "th");
    \u0275\u0275text(31, "\u0627\u0644\u0645\u0631\u062C\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "th");
    \u0275\u0275text(33, "\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "th");
    \u0275\u0275text(35, "\u0627\u0644\u0628\u064A\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "th");
    \u0275\u0275text(37, "\u0645\u062F\u064A\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "th");
    \u0275\u0275text(39, "\u062F\u0627\u0626\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "th");
    \u0275\u0275text(41, "\u0627\u0644\u0631\u0635\u064A\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "tbody");
    \u0275\u0275repeaterCreate(43, ReportsAdvancedComponent_Conditional_24_For_44_Template, 20, 19, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((ctx_r2.statement.account == null ? null : ctx_r2.statement.account.name) || ctx_r2.getSelectedAccountName());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0639\u062F\u062F \u0627\u0644\u062D\u0631\u0643\u0627\u062A: ", ctx_r2.statement.totalEntries);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.statement.balances);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("", (ctx_r2.statement.entries == null ? null : ctx_r2.statement.entries.length) || 0, " \u062D\u0631\u0643\u0629");
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r2.statement.entries);
  }
}
function ReportsAdvancedComponent_Conditional_25_Conditional_30_For_21_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("color", o_r12.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r12.icon);
  }
}
function ReportsAdvancedComponent_Conditional_25_Conditional_30_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 52);
    \u0275\u0275conditionalCreate(2, ReportsAdvancedComponent_Conditional_25_Conditional_30_For_21_Conditional_2_Template, 2, 3, "span", 75);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td")(5, "span", 53);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 54);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 55);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(o_r12.icon ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", o_r12.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(o_r12.voucher_type === "receipt" ? "receipt" : "payment");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r12.voucher_type === "receipt" ? "\u062A\u062D\u0635\u064A\u0644" : "\u0635\u0631\u0641");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 7, o_r12.total, "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(o_r12.count);
  }
}
function ReportsAdvancedComponent_Conditional_25_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 48)(2, "div", 49)(3, "span", 4);
    \u0275\u0275text(4, "list_alt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6, "\u062A\u0641\u0635\u064A\u0644 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 50)(8, "table", 51)(9, "thead")(10, "tr")(11, "th");
    \u0275\u0275text(12, "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u0645\u062C\u0645\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "\u0627\u0644\u0639\u062F\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275repeaterCreate(20, ReportsAdvancedComponent_Conditional_25_Conditional_30_For_21_Template, 12, 10, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(20);
    \u0275\u0275repeater(ctx_r2.dailySummary.byOperationType);
  }
}
function ReportsAdvancedComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40)(3, "span", 4);
    \u0275\u0275text(4, "arrow_downward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 41)(6, "div", 42);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 43);
    \u0275\u0275text(10, "\u0627\u0644\u062A\u062D\u0635\u064A\u0644");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 44)(12, "div", 40)(13, "span", 4);
    \u0275\u0275text(14, "arrow_upward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 41)(16, "div", 42);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 43);
    \u0275\u0275text(20, "\u0627\u0644\u0635\u0631\u0641");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 46)(22, "div", 40)(23, "span", 4);
    \u0275\u0275text(24, "receipt_long");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 41)(26, "div", 42);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 43);
    \u0275\u0275text(29, "\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(30, ReportsAdvancedComponent_Conditional_25_Conditional_30_Template, 22, 0, "div", 47);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 4, ctx_r2.dailySummary.summary.receipts, "1.0-0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 7, ctx_r2.dailySummary.summary.payments, "1.0-0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r2.dailySummary.summary.operations_count);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((ctx_r2.dailySummary.byOperationType == null ? null : ctx_r2.dailySummary.byOperationType.length) ? 30 : -1);
  }
}
function ReportsAdvancedComponent_Conditional_26_For_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 52);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 82);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 72);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 73);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 74);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r13 = ctx.$implicit;
    const $index_r14 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r14 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r13.account_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getAccountTypeLabel(a_r13.account_type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 8, a_r13.total_debit, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 11, a_r13.total_credit, "1.0-2"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(a_r13.balance >= 0 ? "positive" : "negative");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 14, a_r13.balance, "1.0-2"));
  }
}
function ReportsAdvancedComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "div", 40)(3, "span", 4);
    \u0275\u0275text(4, "arrow_downward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 41)(6, "div", 42);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 43);
    \u0275\u0275text(10, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062F\u064A\u0646");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 44)(12, "div", 40)(13, "span", 4);
    \u0275\u0275text(14, "arrow_upward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 41)(16, "div", 42);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 43);
    \u0275\u0275text(20, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0627\u0626\u0646");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 45)(22, "div", 40)(23, "span", 4);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 41)(26, "div", 42);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 43);
    \u0275\u0275text(29, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(30, "div", 47)(31, "div", 48)(32, "div", 49)(33, "span", 4);
    \u0275\u0275text(34, "balance");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "h3");
    \u0275\u0275text(36, "\u0645\u064A\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 63)(38, "span", 64);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 50)(41, "table", 51)(42, "thead")(43, "tr")(44, "th");
    \u0275\u0275text(45, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "th");
    \u0275\u0275text(47, "\u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "th");
    \u0275\u0275text(49, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "th");
    \u0275\u0275text(51, "\u0645\u062F\u064A\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "th");
    \u0275\u0275text(53, "\u062F\u0627\u0626\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "th");
    \u0275\u0275text(55, "\u0627\u0644\u0631\u0635\u064A\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(56, "tbody");
    \u0275\u0275repeaterCreate(57, ReportsAdvancedComponent_Conditional_26_For_58_Template, 16, 17, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "tfoot")(60, "tr", 77)(61, "td", 78);
    \u0275\u0275text(62, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "td", 79);
    \u0275\u0275text(64);
    \u0275\u0275pipe(65, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "td", 80);
    \u0275\u0275text(67);
    \u0275\u0275pipe(68, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "td", 81);
    \u0275\u0275text(70);
    \u0275\u0275pipe(71, "number");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 10, ctx_r2.trialBalance.totals.totalDebit, "1.0-2"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 13, ctx_r2.trialBalance.totals.totalCredit, "1.0-2"));
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r2.trialBalance.totals.isBalanced ? "blue" : "amber");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.trialBalance.totals.isBalanced ? "check_circle" : "warning");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.trialBalance.totals.isBalanced ? "\u0645\u062A\u0648\u0627\u0632\u0646" : "\u063A\u064A\u0631 \u0645\u062A\u0648\u0627\u0632\u0646");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1("", (ctx_r2.trialBalance.accounts == null ? null : ctx_r2.trialBalance.accounts.length) || 0, " \u062D\u0633\u0627\u0628");
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r2.trialBalance.accounts);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(65, 16, ctx_r2.trialBalance.totals.totalDebit, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(68, 19, ctx_r2.trialBalance.totals.totalCredit, "1.0-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(71, 22, ctx_r2.trialBalance.totals.totalDebit - ctx_r2.trialBalance.totals.totalCredit, "1.0-2"));
  }
}
function ReportsAdvancedComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 83)(2, "span", 4);
    \u0275\u0275text(3, "analytics");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, '\u0627\u0636\u063A\u0637 "\u0639\u0631\u0636" \u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631');
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "\u062D\u062F\u062F \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 \u062B\u0645 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0632\u0631 \u0627\u0644\u0639\u0631\u0636");
    \u0275\u0275elementEnd()();
  }
}
var ReportsAdvancedComponent = class _ReportsAdvancedComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  activeTab = "profit-loss";
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  tabs = [
    { key: "profit-loss", label: "\u0623\u0631\u0628\u0627\u062D \u0648\u062E\u0633\u0627\u0626\u0631", icon: "trending_up" },
    { key: "statement", label: "\u0643\u0634\u0641 \u062D\u0633\u0627\u0628", icon: "receipt" },
    { key: "daily", label: "\u0645\u0644\u062E\u0635 \u064A\u0648\u0645\u064A", icon: "today" },
    { key: "trial-balance", label: "\u0645\u064A\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629", icon: "balance" }
  ];
  dateFrom = new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1).toISOString().split("T")[0];
  dateTo = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  dailyDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  selectedAccountId = "";
  statementSourceType = "all";
  accounts = [];
  funds = [];
  allAccountsAndFunds = [];
  profitLoss = null;
  statement = null;
  dailySummary = null;
  trialBalance = null;
  onBizIdChange(_bizId) {
    this.loadAccounts();
    this.loadTab();
  }
  async loadAccounts() {
    try {
      const [accs, fds] = await Promise.all([
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId)
      ]);
      this.accounts = accs;
      this.funds = fds;
      this.allAccountsAndFunds = [
        ...accs.map((a) => __spreadProps(__spreadValues({}, a), { displayName: a.name, sourceType: "account" })),
        ...fds.map((f) => __spreadProps(__spreadValues({}, f), { displayName: `${f.name} (\u0635\u0646\u062F\u0648\u0642)`, sourceType: "fund" }))
      ];
      if (this.allAccountsAndFunds.length > 0)
        this.selectedAccountId = String(this.allAccountsAndFunds[0].id);
    } catch (e) {
      console.error(e);
    }
  }
  async loadTab() {
    this.loading.set(true);
    try {
      switch (this.activeTab) {
        case "profit-loss":
          this.profitLoss = await this.api.getProfitLossReport(this.bizId, this.dateFrom, this.dateTo);
          break;
        case "statement":
          if (this.selectedAccountId)
            this.statement = await this.api.getAccountStatement(this.bizId, Number(this.selectedAccountId), this.dateFrom, this.dateTo, this.statementSourceType);
          break;
        case "daily":
          this.dailySummary = await this.api.getDailySummary(this.bizId, this.dailyDate);
          break;
        case "trial-balance":
          this.trialBalance = await this.api.getTrialBalance(this.bizId, this.dateFrom, this.dateTo);
          break;
      }
    } catch (e) {
      this.toast.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631");
      console.error(e);
    }
    this.loading.set(false);
  }
  getSelectedAccountName() {
    const item = this.allAccountsAndFunds.find((a) => String(a.id) === this.selectedAccountId);
    return item?.displayName || item?.name || "";
  }
  getAccountTypeLabel(type) {
    const map = {
      bank: "\u0628\u0646\u0643",
      exchange: "\u0635\u0631\u0627\u0641",
      e_wallet: "\u0645\u062D\u0641\u0638\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629",
      fund: "\u0635\u0646\u062F\u0648\u0642",
      billing: "\u0641\u0648\u062A\u0631\u0629",
      collection: "\u062A\u062D\u0635\u064A\u0644"
    };
    return map[type] || type;
  }
  getSourceTypeLabel(sourceType) {
    const map = {
      payment_voucher: "\u0633\u0646\u062F \u0635\u0631\u0641",
      receipt_voucher: "\u0633\u0646\u062F \u0642\u0628\u0636",
      journal_manual: "\u0642\u064A\u062F \u064A\u0648\u0645\u064A\u0629",
      inventory_txn: "\u062D\u0631\u0643\u0629 \u0645\u062E\u0632\u0646\u064A\u0629"
    };
    return map[String(sourceType || "")] || "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";
  }
  printReport() {
    const tabLabel = this.tabs.find((t) => t.key === this.activeTab)?.label || "\u062A\u0642\u0631\u064A\u0631";
    const businessName = this.biz.currentBusinessName() || "\u062D\u0633\u0627\u0628\u0627\u062A\u064A";
    const printContent = document.querySelector(".print-area");
    if (!printContent) {
      this.toast.error("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0637\u0628\u0627\u0639\u0629");
      return;
    }
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629");
      return;
    }
    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>${tabLabel} - ${businessName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Tajawal', sans-serif; direction: rtl; padding: 20px; color: #1e293b; }
          .print-header {
            text-align: center; margin-bottom: 24px; padding-bottom: 16px;
            border-bottom: 3px double #10b981;
          }
          .print-header h1 { font-size: 22px; font-weight: 900; color: #10b981; margin-bottom: 4px; }
          .print-header h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
          .print-header .date-range { font-size: 13px; color: #64748b; font-weight: 600; }
          .print-summary {
            display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;
          }
          .summary-item {
            flex: 1; min-width: 120px; padding: 12px; border-radius: 10px;
            border: 1px solid #e2e8f0; text-align: center;
          }
          .summary-item .label { font-size: 11px; color: #64748b; font-weight: 700; }
          .summary-item .value { font-size: 18px; font-weight: 900; color: #1e293b; }
          .summary-item.green .value { color: #22c55e; }
          .summary-item.red .value { color: #ef4444; }
          .summary-item.blue .value { color: #3b82f6; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { padding: 8px 12px; font-size: 12px; text-align: right; border: 1px solid #e2e8f0; }
          th { background: #f8fafc; font-weight: 800; color: #475569; font-size: 11px; }
          tbody tr:nth-child(even) { background: #fafafa; }
          .debit { color: #22c55e; font-weight: 700; font-family: monospace; }
          .credit { color: #ef4444; font-weight: 700; font-family: monospace; }
          .balance { font-weight: 800; font-family: monospace; }
          .balance.positive { color: #3b82f6; }
          .balance.negative { color: #f59e0b; }
          .footer { text-align: center; margin-top: 24px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; }
          .type-badge { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
          .type-badge.receipt { background: #dcfce7; color: #16a34a; }
          .type-badge.payment { background: #fef2f2; color: #dc2626; }
          .totals-row { font-weight: 900; background: #f0fdf4 !important; }
          @media print { body { padding: 10px; } }
        </style>
      </head>
      <body>
        <div class="print-header">
          <h1>${businessName}</h1>
          <h2>${tabLabel}</h2>
          <div class="date-range">${this.getDateRangeText()}</div>
        </div>
        ${this.getPrintContent()}
        <div class="footer">
          \u062A\u0645 \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0628\u0648\u0627\u0633\u0637\u0629 \u0646\u0638\u0627\u0645 \u062D\u0633\u0627\u0628\u0627\u062A\u064A | ${(/* @__PURE__ */ new Date()).toLocaleDateString("ar-SA")} - ${(/* @__PURE__ */ new Date()).toLocaleTimeString("ar-SA")}
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
  getDateRangeText() {
    if (this.activeTab === "daily") {
      return `\u0627\u0644\u062A\u0627\u0631\u064A\u062E: ${this.dailyDate}`;
    }
    return `\u0645\u0646 ${this.dateFrom} \u0625\u0644\u0649 ${this.dateTo}`;
  }
  getPrintContent() {
    switch (this.activeTab) {
      case "profit-loss":
        return this.getProfitLossPrint();
      case "statement":
        return this.getStatementPrint();
      case "daily":
        return this.getDailyPrint();
      case "trial-balance":
        return this.getTrialBalancePrint();
      default:
        return "";
    }
  }
  getProfitLossPrint() {
    if (!this.profitLoss)
      return "<p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>";
    const s = this.profitLoss.summary;
    let html = `
      <div class="print-summary">
        <div class="summary-item green"><div class="label">\u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A</div><div class="value">${Number(s.total_income).toLocaleString()}</div></div>
        <div class="summary-item red"><div class="label">\u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A</div><div class="value">${Number(s.total_expenses).toLocaleString()}</div></div>
        <div class="summary-item blue"><div class="label">\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0628\u062D</div><div class="value">${Number(s.net_profit).toLocaleString()}</div></div>
        <div class="summary-item"><div class="label">\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</div><div class="value">${s.total_operations}</div></div>
      </div>
    `;
    if (this.profitLoss.byCategory?.length) {
      html += `<table><thead><tr><th>\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u0645\u062C\u0645\u0648\u0639</th><th>\u0627\u0644\u0639\u062F\u062F</th></tr></thead><tbody>`;
      for (const c of this.profitLoss.byCategory) {
        html += `<tr><td>${c.category}</td><td><span class="type-badge ${c.voucher_type === "receipt" ? "receipt" : "payment"}">${c.voucher_type === "receipt" ? "\u0625\u064A\u0631\u0627\u062F" : "\u0645\u0635\u0631\u0648\u0641"}</span></td><td>${Number(c.total).toLocaleString()}</td><td>${c.count}</td></tr>`;
      }
      html += `</tbody></table>`;
    }
    return html;
  }
  getStatementPrint() {
    if (!this.statement)
      return "<p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>";
    let html = `<p style="margin-bottom:12px;font-weight:800;">\u0627\u0644\u062D\u0633\u0627\u0628: ${this.statement.account?.name || this.getSelectedAccountName()}</p>`;
    if (this.statement.balances?.length) {
      html += `<div class="print-summary">`;
      for (const b of this.statement.balances) {
        html += `<div class="summary-item ${b.balance >= 0 ? "blue" : "red"}"><div class="label">${b.currencyCode}</div><div class="value">${Number(b.balance).toLocaleString()}</div></div>`;
      }
      html += `</div>`;
    }
    html += `<table><thead><tr><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><th>\u0627\u0644\u0645\u0631\u062C\u0639</th><th>\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629</th><th>\u0627\u0644\u0628\u064A\u0627\u0646</th><th>\u0645\u062F\u064A\u0646</th><th>\u062F\u0627\u0626\u0646</th><th>\u0627\u0644\u0631\u0635\u064A\u062F</th></tr></thead><tbody>`;
    for (const e of this.statement.entries || []) {
      html += `<tr>
        <td>${e.entry_date}</td>
        <td>${e.entry_number}</td>
        <td>${this.getSourceTypeLabel(e.source_type || e.sourceType)}</td>
        <td>${e.entry_description || e.line_description || ""}</td>
        <td class="debit">${e.line_type === "debit" ? Number(e.amount).toLocaleString() : "-"}</td>
        <td class="credit">${e.line_type === "credit" ? Number(e.amount).toLocaleString() : "-"}</td>
        <td class="balance ${(e.runningBalance || 0) >= 0 ? "positive" : "negative"}">${Number(e.runningBalance || 0).toLocaleString()}</td>
      </tr>`;
    }
    html += `</tbody></table>`;
    return html;
  }
  getDailyPrint() {
    if (!this.dailySummary)
      return "<p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>";
    const s = this.dailySummary.summary;
    let html = `
      <div class="print-summary">
        <div class="summary-item green"><div class="label">\u0627\u0644\u062A\u062D\u0635\u064A\u0644</div><div class="value">${Number(s.receipts).toLocaleString()}</div></div>
        <div class="summary-item red"><div class="label">\u0627\u0644\u0635\u0631\u0641</div><div class="value">${Number(s.payments).toLocaleString()}</div></div>
        <div class="summary-item"><div class="label">\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</div><div class="value">${s.operations_count}</div></div>
      </div>
    `;
    if (this.dailySummary.byOperationType?.length) {
      html += `<table><thead><tr><th>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u0645\u062C\u0645\u0648\u0639</th><th>\u0627\u0644\u0639\u062F\u062F</th></tr></thead><tbody>`;
      for (const o of this.dailySummary.byOperationType) {
        html += `<tr><td>${o.name}</td><td><span class="type-badge ${o.voucher_type === "receipt" ? "receipt" : "payment"}">${o.voucher_type === "receipt" ? "\u062A\u062D\u0635\u064A\u0644" : "\u0635\u0631\u0641"}</span></td><td>${Number(o.total).toLocaleString()}</td><td>${o.count}</td></tr>`;
      }
      html += `</tbody></table>`;
    }
    return html;
  }
  getTrialBalancePrint() {
    if (!this.trialBalance)
      return "<p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>";
    const t = this.trialBalance.totals;
    let html = `
      <div class="print-summary">
        <div class="summary-item green"><div class="label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062F\u064A\u0646</div><div class="value">${Number(t.totalDebit).toLocaleString()}</div></div>
        <div class="summary-item red"><div class="label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0627\u0626\u0646</div><div class="value">${Number(t.totalCredit).toLocaleString()}</div></div>
        <div class="summary-item ${t.isBalanced ? "blue" : "red"}"><div class="label">\u0627\u0644\u062D\u0627\u0644\u0629</div><div class="value">${t.isBalanced ? "\u0645\u062A\u0648\u0627\u0632\u0646" : "\u063A\u064A\u0631 \u0645\u062A\u0648\u0627\u0632\u0646"}</div></div>
      </div>
    `;
    html += `<table><thead><tr><th>\u0627\u0644\u062D\u0633\u0627\u0628</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0645\u062F\u064A\u0646</th><th>\u062F\u0627\u0626\u0646</th><th>\u0627\u0644\u0631\u0635\u064A\u062F</th></tr></thead><tbody>`;
    for (const a of this.trialBalance.accounts || []) {
      html += `<tr>
        <td>${a.account_name}</td>
        <td>${this.getAccountTypeLabel(a.account_type)}</td>
        <td class="debit">${Number(a.total_debit).toLocaleString()}</td>
        <td class="credit">${Number(a.total_credit).toLocaleString()}</td>
        <td class="balance ${a.balance >= 0 ? "positive" : "negative"}">${Number(a.balance).toLocaleString()}</td>
      </tr>`;
    }
    html += `<tr class="totals-row">
      <td colspan="2" style="font-weight:900;">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</td>
      <td class="debit" style="font-weight:900;">${Number(t.totalDebit).toLocaleString()}</td>
      <td class="credit" style="font-weight:900;">${Number(t.totalCredit).toLocaleString()}</td>
      <td class="balance" style="font-weight:900;">${Number(t.totalDebit - t.totalCredit).toLocaleString()}</td>
    </tr>`;
    html += `</tbody></table>`;
    return html;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ReportsAdvancedComponent_BaseFactory;
    return function ReportsAdvancedComponent_Factory(__ngFactoryType__) {
      return (\u0275ReportsAdvancedComponent_BaseFactory || (\u0275ReportsAdvancedComponent_BaseFactory = \u0275\u0275getInheritedFactory(_ReportsAdvancedComponent)))(__ngFactoryType__ || _ReportsAdvancedComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportsAdvancedComponent, selectors: [["app-reports-advanced"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 28, vars: 8, consts: [[1, "page-container"], [1, "page-header"], [1, "header-left"], [1, "page-icon-3d", "green"], [1, "material-icons-round"], [1, "page-title"], [1, "page-subtitle"], [1, "header-actions"], [1, "btn-3d", "btn-print", 3, "click", "disabled"], [1, "tabs-3d"], [1, "tab-btn", 3, "active"], [1, "filter-card-3d"], [1, "loading-state"], [1, "print-area"], [1, "empty-state"], [1, "tab-btn", 3, "click"], [1, "filter-row"], [1, "filter-field"], ["for", "adv-date-from", 1, "form-label"], ["id", "adv-date-from", "title", "\u0645\u0646 \u062A\u0627\u0631\u064A\u062E", "type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "adv-date-to", 1, "form-label"], ["id", "adv-date-to", "title", "\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E", "type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "filter-action"], [1, "btn-3d", "btn-primary", 3, "click"], [1, "filter-field", "wide"], ["for", "adv-statement-account", 1, "form-label"], ["id", "adv-statement-account", "title", "\u0627\u0644\u062D\u0633\u0627\u0628 \u0623\u0648 \u0627\u0644\u0635\u0646\u062F\u0648\u0642", 1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value"], ["for", "adv-statement-source", 1, "form-label"], ["id", "adv-statement-source", "title", "\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629", 1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "all"], ["value", "payment_voucher"], ["value", "receipt_voucher"], ["value", "journal_manual"], ["value", "inventory_txn"], ["for", "adv-daily-date", 1, "form-label"], ["id", "adv-daily-date", "title", "\u0627\u0644\u062A\u0627\u0631\u064A\u062E", "type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "loading-spinner"], [1, "stats-row"], [1, "stat-card-3d", "green"], [1, "sc-icon"], [1, "sc-body"], [1, "sc-num"], [1, "sc-label"], [1, "stat-card-3d", "red"], [1, "stat-card-3d"], [1, "stat-card-3d", "gray"], [1, "table-card-3d"], [1, "table-header"], [1, "table-icon"], [1, "table-wrap"], [1, "data-table"], [1, "cell-name"], [1, "type-badge"], [1, "cell-amount"], [1, "cell-count"], [1, "account-info-3d"], [1, "ai-icon"], [1, "ai-main"], [1, "ai-name"], [1, "ai-entries"], [1, "ai-balances"], [1, "ai-balance", 3, "class"], [1, "table-header-info"], [1, "entries-count"], [1, "ai-balance"], [1, "ai-currency"], [1, "ai-amount"], [1, "cell-index"], [1, "cell-date"], [1, "cell-ref"], [1, "cell-desc"], [1, "cell-debit"], [1, "cell-credit"], [1, "cell-balance"], [1, "material-icons-round", "op-icon", 3, "color"], [1, "material-icons-round", "op-icon"], [1, "totals-row"], ["colspan", "3", 2, "font-weight", "900"], [1, "cell-debit", 2, "font-weight", "900"], [1, "cell-credit", 2, "font-weight", "900"], [1, "cell-balance", 2, "font-weight", "900"], [1, "cell-type"], [1, "empty-icon-3d"]], template: function ReportsAdvancedComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "analytics");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1", 5);
      \u0275\u0275text(8, "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10, "\u062A\u062D\u0644\u064A\u0644 \u0645\u0627\u0644\u064A \u0634\u0627\u0645\u0644: \u0623\u0631\u0628\u0627\u062D \u0648\u062E\u0633\u0627\u0626\u0631\u060C \u0643\u0634\u0641 \u062D\u0633\u0627\u0628\u060C \u0645\u0644\u062E\u0635 \u064A\u0648\u0645\u064A\u060C \u0645\u064A\u0632\u0627\u0646 \u0645\u0631\u0627\u062C\u0639\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
      \u0275\u0275listener("click", function ReportsAdvancedComponent_Template_button_click_12_listener() {
        return ctx.printReport();
      });
      \u0275\u0275elementStart(13, "span", 4);
      \u0275\u0275text(14, "print");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15, " \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 9);
      \u0275\u0275repeaterCreate(17, ReportsAdvancedComponent_For_18_Template, 4, 4, "button", 10, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(19, ReportsAdvancedComponent_Conditional_19_Template, 16, 3, "div", 11)(20, ReportsAdvancedComponent_Conditional_20_Template, 11, 1, "div", 11);
      \u0275\u0275conditionalCreate(21, ReportsAdvancedComponent_Conditional_21_Template, 4, 0, "div", 12);
      \u0275\u0275elementStart(22, "div", 13);
      \u0275\u0275conditionalCreate(23, ReportsAdvancedComponent_Conditional_23_Template, 41, 17);
      \u0275\u0275conditionalCreate(24, ReportsAdvancedComponent_Conditional_24_Template, 45, 3);
      \u0275\u0275conditionalCreate(25, ReportsAdvancedComponent_Conditional_25_Template, 31, 10);
      \u0275\u0275conditionalCreate(26, ReportsAdvancedComponent_Conditional_26_Template, 72, 25);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(27, ReportsAdvancedComponent_Conditional_27_Template, 8, 0, "div", 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.tabs);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeTab !== "daily" ? 19 : 20);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 21 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeTab === "profit-loss" && ctx.profitLoss && !ctx.loading() ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab === "statement" && ctx.statement && !ctx.loading() ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab === "daily" && ctx.dailySummary && !ctx.loading() ? 25 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab === "trial-balance" && ctx.trialBalance && !ctx.loading() ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && (ctx.activeTab === "profit-loss" && !ctx.profitLoss || ctx.activeTab === "statement" && !ctx.statement || ctx.activeTab === "daily" && !ctx.dailySummary || ctx.activeTab === "trial-balance" && !ctx.trialBalance) ? 27 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe], styles: ['\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(16, 185, 129, 0.06),\n      rgba(20, 184, 166, 0.04));\n  border-radius: 20px;\n  border: 1px solid rgba(16, 185, 129, 0.12);\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.page-icon-3d[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.page-icon-3d.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #14b8a6);\n}\n.page-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: white;\n}\n.page-icon-3d[_ngcontent-%COMP%]:hover {\n  transform: perspective(100px) rotateX(0deg) scale(1.05);\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 3px;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.tabs-3d[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  margin-bottom: 16px;\n  padding: 4px;\n  border-radius: 14px;\n  background: var(--bg-surface, #f1f5f9);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  width: fit-content;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 9px 16px;\n  border-radius: 10px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n  color: var(--text-muted, #94a3b8);\n  background: transparent;\n}\n.tab-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  background: var(--bg-card, white);\n  color: #10b981;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.tab-btn[_ngcontent-%COMP%]:hover:not(.active) {\n  color: var(--text-primary, #1e293b);\n}\n.filter-card-3d[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding: 14px 18px;\n  border-radius: 14px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n}\n.filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.filter-field[_ngcontent-%COMP%] {\n  min-width: 140px;\n}\n.filter-field.wide[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n.filter-action[_ngcontent-%COMP%] {\n  padding-bottom: 0;\n}\n.btn-3d[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #14b8a6);\n  color: white;\n  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);\n}\n.btn-3d.btn-print[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1,\n      #8b5cf6);\n  color: white;\n  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-print[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);\n}\n.btn-3d.btn-print[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  transform: none;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.form-input[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #10b981;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);\n}\n.stats-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.stat-card-3d[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  flex: 1;\n  min-width: 160px;\n}\n.stat-card-3d[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.stat-card-3d[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-card-3d[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: white;\n}\n.stat-card-3d.green[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.stat-card-3d.red[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.stat-card-3d.blue[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.stat-card-3d.amber[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.stat-card-3d.gray[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #64748b,\n      #475569);\n}\n.sc-num[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n}\n.sc-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.account-info-3d[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  margin-bottom: 16px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border: 1px solid rgba(59, 130, 246, 0.12);\n}\n.ai-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);\n}\n.ai-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: white;\n}\n.ai-main[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.ai-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n}\n.ai-entries[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.ai-balances[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.ai-balance[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 10px;\n}\n.ai-balance.positive[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n}\n.ai-balance.negative[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n}\n.ai-currency[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n  margin-left: 4px;\n}\n.ai-amount[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 900;\n  font-family: monospace;\n}\n.positive[_ngcontent-%COMP%]   .ai-amount[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.negative[_ngcontent-%COMP%]   .ai-amount[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.table-card-3d[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  border-radius: 18px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  overflow: hidden;\n}\n.table-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(16, 185, 129, 0.04),\n      rgba(20, 184, 166, 0.02));\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n}\n.table-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n}\n.table-icon[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #14b8a6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 3px 8px rgba(16, 185, 129, 0.3);\n}\n.table-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: white;\n}\n.table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.table-header-info[_ngcontent-%COMP%] {\n  margin-right: auto;\n}\n.entries-count[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n  background: var(--bg-surface, #f1f5f9);\n  padding: 3px 10px;\n  border-radius: 8px;\n}\n.cell-index[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n  font-weight: 600;\n}\n.totals-row[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.04) !important;\n}\n.totals-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  font-weight: 900 !important;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  font-size: 12px;\n  font-weight: 600;\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: var(--bg-surface, #f8fafc);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: var(--text-secondary, #64748b);\n  font-weight: 700;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--border-color, #f1f5f9);\n  transition: background 0.15s;\n}\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: rgba(16, 185, 129, 0.02);\n}\n.cell-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.op-icon[_ngcontent-%COMP%] {\n  font-size: 16px !important;\n}\n.cell-date[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n}\n.cell-ref[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n}\n.cell-desc[_ngcontent-%COMP%] {\n  color: var(--text-secondary, #64748b);\n}\n.cell-type[_ngcontent-%COMP%] {\n  color: var(--text-muted, #94a3b8);\n}\n.cell-amount[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n}\n.cell-count[_ngcontent-%COMP%] {\n  color: var(--text-muted, #94a3b8);\n}\n.cell-debit[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 700;\n  color: #22c55e;\n}\n.cell-credit[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 700;\n  color: #ef4444;\n}\n.cell-balance[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 800;\n}\n.cell-balance.positive[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.cell-balance.negative[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.type-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.type-badge.receipt[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  color: #22c55e;\n}\n.type-badge.payment[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 3px solid rgba(16, 185, 129, 0.15);\n  border-top-color: #10b981;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n.empty-icon-3d[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #14b8a6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 12px 32px rgba(16, 185, 129, 0.3);\n  transform: perspective(150px) rotateX(10deg);\n}\n.empty-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: white;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 14px;\n    align-items: flex-start;\n  }\n  .stats-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .tabs-3d[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .filter-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .account-info-3d[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=reports-advanced.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportsAdvancedComponent, [{
    type: Component,
    args: [{ selector: "app-reports-advanced", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-container">\r
\r
  <!-- ===== Page Header ===== -->\r
  <div class="page-header">\r
    <div class="header-left">\r
      <div class="page-icon-3d green">\r
        <span class="material-icons-round">analytics</span>\r
      </div>\r
      <div>\r
        <h1 class="page-title">\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629</h1>\r
        <p class="page-subtitle">\u062A\u062D\u0644\u064A\u0644 \u0645\u0627\u0644\u064A \u0634\u0627\u0645\u0644: \u0623\u0631\u0628\u0627\u062D \u0648\u062E\u0633\u0627\u0626\u0631\u060C \u0643\u0634\u0641 \u062D\u0633\u0627\u0628\u060C \u0645\u0644\u062E\u0635 \u064A\u0648\u0645\u064A\u060C \u0645\u064A\u0632\u0627\u0646 \u0645\u0631\u0627\u062C\u0639\u0629</p>\r
      </div>\r
    </div>\r
    <div class="header-actions">\r
      <button class="btn-3d btn-print" (click)="printReport()" [disabled]="loading()">\r
        <span class="material-icons-round">print</span>\r
        \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- ===== Tabs ===== -->\r
  <div class="tabs-3d">\r
    @for (t of tabs; track t.key) {\r
      <button class="tab-btn" [class.active]="activeTab === t.key" (click)="activeTab = t.key; loadTab()">\r
        <span class="material-icons-round">{{ t.icon }}</span>\r
        {{ t.label }}\r
      </button>\r
    }\r
  </div>\r
\r
  <!-- ===== Filters ===== -->\r
  @if (activeTab !== 'daily') {\r
    <div class="filter-card-3d">\r
      <div class="filter-row">\r
        <div class="filter-field">\r
          <label class="form-label" for="adv-date-from">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>\r
          <input id="adv-date-from" title="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E" type="date" class="form-input" [(ngModel)]="dateFrom">\r
        </div>\r
        <div class="filter-field">\r
          <label class="form-label" for="adv-date-to">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>\r
          <input id="adv-date-to" title="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E" type="date" class="form-input" [(ngModel)]="dateTo">\r
        </div>\r
        @if (activeTab === 'statement') {\r
          <div class="filter-field wide">\r
            <label class="form-label" for="adv-statement-account">\u0627\u0644\u062D\u0633\u0627\u0628 / \u0627\u0644\u0635\u0646\u062F\u0648\u0642</label>\r
            <select id="adv-statement-account" title="\u0627\u0644\u062D\u0633\u0627\u0628 \u0623\u0648 \u0627\u0644\u0635\u0646\u062F\u0648\u0642" class="form-select" [(ngModel)]="selectedAccountId">\r
              @for (a of allAccountsAndFunds; track a.id) {\r
                <option [value]="a.id">{{a.displayName || a.name}}</option>\r
              }\r
            </select>\r
          </div>\r
          <div class="filter-field">\r
            <label class="form-label" for="adv-statement-source">\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629</label>\r
            <select id="adv-statement-source" title="\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629" class="form-select" [(ngModel)]="statementSourceType">\r
              <option value="all">\u0627\u0644\u0643\u0644</option>\r
              <option value="payment_voucher">\u0633\u0646\u062F \u0635\u0631\u0641</option>\r
              <option value="receipt_voucher">\u0633\u0646\u062F \u0642\u0628\u0636</option>\r
              <option value="journal_manual">\u0642\u064A\u062F \u064A\u0648\u0645\u064A\u0629</option>\r
              <option value="inventory_txn">\u062D\u0631\u0643\u0629 \u0645\u062E\u0632\u0646\u064A\u0629</option>\r
            </select>\r
          </div>\r
        }\r
        <div class="filter-action">\r
          <button class="btn-3d btn-primary" (click)="loadTab()">\r
            <span class="material-icons-round">search</span>\r
            \u0639\u0631\u0636\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  } @else {\r
    <div class="filter-card-3d">\r
      <div class="filter-row">\r
        <div class="filter-field">\r
          <label class="form-label" for="adv-daily-date">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</label>\r
          <input id="adv-daily-date" title="\u0627\u0644\u062A\u0627\u0631\u064A\u062E" type="date" class="form-input" [(ngModel)]="dailyDate">\r
        </div>\r
        <div class="filter-action">\r
          <button class="btn-3d btn-primary" (click)="loadTab()">\r
            <span class="material-icons-round">search</span>\r
            \u0639\u0631\u0636\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===== Loading ===== -->\r
  @if (loading()) {\r
    <div class="loading-state">\r
      <div class="loading-spinner"></div>\r
      <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>\r
    </div>\r
  }\r
\r
  <!-- ===== Print Area ===== -->\r
  <div class="print-area">\r
\r
  <!-- ===== \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0623\u0631\u0628\u0627\u062D \u0648\u0627\u0644\u062E\u0633\u0627\u0626\u0631 ===== -->\r
  @if (activeTab === 'profit-loss' && profitLoss && !loading()) {\r
    <div class="stats-row">\r
      <div class="stat-card-3d green">\r
        <div class="sc-icon"><span class="material-icons-round">arrow_downward</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ profitLoss.summary.totalIncome | number:'1.0-0' }}</div>\r
          <div class="sc-label">\u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A</div>\r
        </div>\r
      </div>\r
      <div class="stat-card-3d red">\r
        <div class="sc-icon"><span class="material-icons-round">arrow_upward</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ profitLoss.summary.totalExpenses | number:'1.0-0' }}</div>\r
          <div class="sc-label">\u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A</div>\r
        </div>\r
      </div>\r
      <div class="stat-card-3d" [class]="profitLoss.summary.netProfit >= 0 ? 'blue' : 'amber'">\r
        <div class="sc-icon"><span class="material-icons-round">{{ profitLoss.summary.netProfit >= 0 ? 'trending_up' : 'trending_down' }}</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ profitLoss.summary.netProfit | number:'1.0-0' }}</div>\r
          <div class="sc-label">\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0628\u062D</div>\r
        </div>\r
      </div>\r
      <div class="stat-card-3d gray">\r
        <div class="sc-icon"><span class="material-icons-round">receipt_long</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ profitLoss.summary.totalOperations }}</div>\r
          <div class="sc-label">\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    @if (profitLoss.byCategory?.length) {\r
      <div class="table-card-3d">\r
        <div class="table-header">\r
          <div class="table-icon"><span class="material-icons-round">category</span></div>\r
          <h3>\u062A\u0641\u0635\u064A\u0644 \u062D\u0633\u0628 \u0627\u0644\u062A\u0635\u0646\u064A\u0641</h3>\r
        </div>\r
        <div class="table-wrap">\r
          <table class="data-table">\r
            <thead>\r
              <tr>\r
                <th>\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th>\r
                <th>\u0627\u0644\u0646\u0648\u0639</th>\r
                <th>\u0627\u0644\u0645\u062C\u0645\u0648\u0639</th>\r
                <th>\u0627\u0644\u0639\u062F\u062F</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @for (c of profitLoss.byCategory; track $index) {\r
                <tr>\r
                  <td class="cell-name">{{ c.category }}</td>\r
                  <td><span class="type-badge" [class]="c.voucher_type === 'receipt' ? 'receipt' : 'payment'">{{ c.voucher_type === 'receipt' ? '\u0625\u064A\u0631\u0627\u062F' : '\u0645\u0635\u0631\u0648\u0641' }}</span></td>\r
                  <td class="cell-amount">{{ c.total | number:'1.0-0' }}</td>\r
                  <td class="cell-count">{{ c.count }}</td>\r
                </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    }\r
  }\r
\r
  <!-- ===== \u0643\u0634\u0641 \u062D\u0633\u0627\u0628 ===== -->\r
  @if (activeTab === 'statement' && statement && !loading()) {\r
    <div class="account-info-3d">\r
      <div class="ai-icon"><span class="material-icons-round">account_balance</span></div>\r
      <div class="ai-main">\r
        <div class="ai-name">{{ statement.account?.name || getSelectedAccountName() }}</div>\r
        <div class="ai-entries">\u0639\u062F\u062F \u0627\u0644\u062D\u0631\u0643\u0627\u062A: {{ statement.totalEntries }}</div>\r
      </div>\r
      <div class="ai-balances">\r
        @for (b of statement.balances; track $index) {\r
          <div class="ai-balance" [class]="b.balance >= 0 ? 'positive' : 'negative'">\r
            <span class="ai-currency">{{ b.currencyCode }}</span>\r
            <span class="ai-amount">{{ b.balance | number:'1.0-2' }}</span>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
\r
    <div class="table-card-3d">\r
      <div class="table-header">\r
        <div class="table-icon"><span class="material-icons-round">receipt</span></div>\r
        <h3>\u062D\u0631\u0643\u0627\u062A \u0627\u0644\u062D\u0633\u0627\u0628</h3>\r
        <div class="table-header-info">\r
          <span class="entries-count">{{ statement.entries?.length || 0 }} \u062D\u0631\u0643\u0629</span>\r
        </div>\r
      </div>\r
      <div class="table-wrap">\r
        <table class="data-table">\r
          <thead>\r
            <tr>\r
              <th>#</th>\r
              <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>\r
              <th>\u0627\u0644\u0645\u0631\u062C\u0639</th>\r
              <th>\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629</th>\r
              <th>\u0627\u0644\u0628\u064A\u0627\u0646</th>\r
              <th>\u0645\u062F\u064A\u0646</th>\r
              <th>\u062F\u0627\u0626\u0646</th>\r
              <th>\u0627\u0644\u0631\u0635\u064A\u062F</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            @for (e of statement.entries; track $index) {\r
              <tr>\r
                <td class="cell-index">{{ $index + 1 }}</td>\r
                <td class="cell-date">{{ e.entry_date }}</td>\r
                <td class="cell-ref">{{ e.entry_number }}</td>\r
                <td>{{ getSourceTypeLabel(e.source_type || e.sourceType) }}</td>\r
                <td class="cell-desc">{{ e.entry_description || e.line_description }}</td>\r
                <td class="cell-debit">{{ e.line_type === 'debit' ? (e.amount | number:'1.0-2') : '-' }}</td>\r
                <td class="cell-credit">{{ e.line_type === 'credit' ? (e.amount | number:'1.0-2') : '-' }}</td>\r
                <td class="cell-balance" [class]="e.runningBalance >= 0 ? 'positive' : 'negative'">{{ e.runningBalance | number:'1.0-2' }}</td>\r
              </tr>\r
            }\r
          </tbody>\r
        </table>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===== \u0645\u0644\u062E\u0635 \u064A\u0648\u0645\u064A ===== -->\r
  @if (activeTab === 'daily' && dailySummary && !loading()) {\r
    <div class="stats-row">\r
      <div class="stat-card-3d green">\r
        <div class="sc-icon"><span class="material-icons-round">arrow_downward</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ dailySummary.summary.receipts | number:'1.0-0' }}</div>\r
          <div class="sc-label">\u0627\u0644\u062A\u062D\u0635\u064A\u0644</div>\r
        </div>\r
      </div>\r
      <div class="stat-card-3d red">\r
        <div class="sc-icon"><span class="material-icons-round">arrow_upward</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ dailySummary.summary.payments | number:'1.0-0' }}</div>\r
          <div class="sc-label">\u0627\u0644\u0635\u0631\u0641</div>\r
        </div>\r
      </div>\r
      <div class="stat-card-3d gray">\r
        <div class="sc-icon"><span class="material-icons-round">receipt_long</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ dailySummary.summary.operations_count }}</div>\r
          <div class="sc-label">\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    @if (dailySummary.byOperationType?.length) {\r
      <div class="table-card-3d">\r
        <div class="table-header">\r
          <div class="table-icon"><span class="material-icons-round">list_alt</span></div>\r
          <h3>\u062A\u0641\u0635\u064A\u0644 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</h3>\r
        </div>\r
        <div class="table-wrap">\r
          <table class="data-table">\r
            <thead>\r
              <tr>\r
                <th>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</th>\r
                <th>\u0627\u0644\u0646\u0648\u0639</th>\r
                <th>\u0627\u0644\u0645\u062C\u0645\u0648\u0639</th>\r
                <th>\u0627\u0644\u0639\u062F\u062F</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @for (o of dailySummary.byOperationType; track $index) {\r
                <tr>\r
                  <td class="cell-name">\r
                    @if (o.icon) {\r
                      <span class="material-icons-round op-icon" [style.color]="o.color">{{ o.icon }}</span>\r
                    }\r
                    {{ o.name }}\r
                  </td>\r
                  <td><span class="type-badge" [class]="o.voucher_type === 'receipt' ? 'receipt' : 'payment'">{{ o.voucher_type === 'receipt' ? '\u062A\u062D\u0635\u064A\u0644' : '\u0635\u0631\u0641' }}</span></td>\r
                  <td class="cell-amount">{{ o.total | number:'1.0-0' }}</td>\r
                  <td class="cell-count">{{ o.count }}</td>\r
                </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    }\r
  }\r
\r
  <!-- ===== \u0645\u064A\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 ===== -->\r
  @if (activeTab === 'trial-balance' && trialBalance && !loading()) {\r
    <div class="stats-row">\r
      <div class="stat-card-3d green">\r
        <div class="sc-icon"><span class="material-icons-round">arrow_downward</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ trialBalance.totals.totalDebit | number:'1.0-2' }}</div>\r
          <div class="sc-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062F\u064A\u0646</div>\r
        </div>\r
      </div>\r
      <div class="stat-card-3d red">\r
        <div class="sc-icon"><span class="material-icons-round">arrow_upward</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ trialBalance.totals.totalCredit | number:'1.0-2' }}</div>\r
          <div class="sc-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0627\u0626\u0646</div>\r
        </div>\r
      </div>\r
      <div class="stat-card-3d" [class]="trialBalance.totals.isBalanced ? 'blue' : 'amber'">\r
        <div class="sc-icon"><span class="material-icons-round">{{ trialBalance.totals.isBalanced ? 'check_circle' : 'warning' }}</span></div>\r
        <div class="sc-body">\r
          <div class="sc-num">{{ trialBalance.totals.isBalanced ? '\u0645\u062A\u0648\u0627\u0632\u0646' : '\u063A\u064A\u0631 \u0645\u062A\u0648\u0627\u0632\u0646' }}</div>\r
          <div class="sc-label">\u0627\u0644\u062D\u0627\u0644\u0629</div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="table-card-3d">\r
      <div class="table-header">\r
        <div class="table-icon"><span class="material-icons-round">balance</span></div>\r
        <h3>\u0645\u064A\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</h3>\r
        <div class="table-header-info">\r
          <span class="entries-count">{{ trialBalance.accounts?.length || 0 }} \u062D\u0633\u0627\u0628</span>\r
        </div>\r
      </div>\r
      <div class="table-wrap">\r
        <table class="data-table">\r
          <thead>\r
            <tr>\r
              <th>#</th>\r
              <th>\u0627\u0644\u062D\u0633\u0627\u0628</th>\r
              <th>\u0627\u0644\u0646\u0648\u0639</th>\r
              <th>\u0645\u062F\u064A\u0646</th>\r
              <th>\u062F\u0627\u0626\u0646</th>\r
              <th>\u0627\u0644\u0631\u0635\u064A\u062F</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            @for (a of trialBalance.accounts; track $index) {\r
              <tr>\r
                <td class="cell-index">{{ $index + 1 }}</td>\r
                <td class="cell-name">{{ a.account_name }}</td>\r
                <td class="cell-type">{{ getAccountTypeLabel(a.account_type) }}</td>\r
                <td class="cell-debit">{{ a.total_debit | number:'1.0-2' }}</td>\r
                <td class="cell-credit">{{ a.total_credit | number:'1.0-2' }}</td>\r
                <td class="cell-balance" [class]="a.balance >= 0 ? 'positive' : 'negative'">{{ a.balance | number:'1.0-2' }}</td>\r
              </tr>\r
            }\r
          </tbody>\r
          <tfoot>\r
            <tr class="totals-row">\r
              <td colspan="3" style="font-weight:900;">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</td>\r
              <td class="cell-debit" style="font-weight:900;">{{ trialBalance.totals.totalDebit | number:'1.0-2' }}</td>\r
              <td class="cell-credit" style="font-weight:900;">{{ trialBalance.totals.totalCredit | number:'1.0-2' }}</td>\r
              <td class="cell-balance" style="font-weight:900;">{{ (trialBalance.totals.totalDebit - trialBalance.totals.totalCredit) | number:'1.0-2' }}</td>\r
            </tr>\r
          </tfoot>\r
        </table>\r
      </div>\r
    </div>\r
  }\r
\r
  </div><!-- end print-area -->\r
\r
  <!-- ===== Empty State ===== -->\r
  @if (!loading() && ((activeTab === 'profit-loss' && !profitLoss) || (activeTab === 'statement' && !statement) || (activeTab === 'daily' && !dailySummary) || (activeTab === 'trial-balance' && !trialBalance))) {\r
    <div class="empty-state">\r
      <div class="empty-icon-3d">\r
        <span class="material-icons-round">analytics</span>\r
      </div>\r
      <h3>\u0627\u0636\u063A\u0637 "\u0639\u0631\u0636" \u0644\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</h3>\r
      <p>\u062D\u062F\u062F \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629 \u062B\u0645 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0632\u0631 \u0627\u0644\u0639\u0631\u0636</p>\r
    </div>\r
  }\r
\r
</div>\r
`, styles: ['/* src/app/pages/reports-advanced/reports-advanced.scss */\n.page-container {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(16, 185, 129, 0.06),\n      rgba(20, 184, 166, 0.04));\n  border-radius: 20px;\n  border: 1px solid rgba(16, 185, 129, 0.12);\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.header-actions {\n  display: flex;\n  gap: 8px;\n}\n.page-icon-3d {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.page-icon-3d.green {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #14b8a6);\n}\n.page-icon-3d .material-icons-round {\n  font-size: 26px;\n  color: white;\n}\n.page-icon-3d:hover {\n  transform: perspective(100px) rotateX(0deg) scale(1.05);\n}\n.page-title {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 3px;\n}\n.page-subtitle {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.tabs-3d {\n  display: flex;\n  gap: 4px;\n  margin-bottom: 16px;\n  padding: 4px;\n  border-radius: 14px;\n  background: var(--bg-surface, #f1f5f9);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  width: fit-content;\n}\n.tab-btn {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 9px 16px;\n  border-radius: 10px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n  color: var(--text-muted, #94a3b8);\n  background: transparent;\n}\n.tab-btn .material-icons-round {\n  font-size: 16px;\n}\n.tab-btn.active {\n  background: var(--bg-card, white);\n  color: #10b981;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.tab-btn:hover:not(.active) {\n  color: var(--text-primary, #1e293b);\n}\n.filter-card-3d {\n  margin-bottom: 16px;\n  padding: 14px 18px;\n  border-radius: 14px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n}\n.filter-row {\n  display: flex;\n  align-items: flex-end;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.filter-field {\n  min-width: 140px;\n}\n.filter-field.wide {\n  min-width: 200px;\n}\n.filter-action {\n  padding-bottom: 0;\n}\n.btn-3d {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d .material-icons-round {\n  font-size: 17px;\n}\n.btn-3d.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #14b8a6);\n  color: white;\n  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);\n}\n.btn-3d.btn-print {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1,\n      #8b5cf6);\n  color: white;\n  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-print:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);\n}\n.btn-3d.btn-print:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  transform: none;\n}\n.form-label {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.form-input,\n.form-select {\n  width: 100%;\n  padding: 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input:focus,\n.form-select:focus {\n  border-color: #10b981;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);\n}\n.stats-row {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.stat-card-3d {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  flex: 1;\n  min-width: 160px;\n}\n.stat-card-3d:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.stat-card-3d .sc-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-card-3d .sc-icon .material-icons-round {\n  font-size: 22px;\n  color: white;\n}\n.stat-card-3d.green .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.stat-card-3d.red .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.stat-card-3d.blue .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.stat-card-3d.amber .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.stat-card-3d.gray .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #64748b,\n      #475569);\n}\n.sc-num {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n}\n.sc-label {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.account-info-3d {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  margin-bottom: 16px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border: 1px solid rgba(59, 130, 246, 0.12);\n}\n.ai-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);\n}\n.ai-icon .material-icons-round {\n  font-size: 22px;\n  color: white;\n}\n.ai-main {\n  flex: 1;\n}\n.ai-name {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n}\n.ai-entries {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.ai-balances {\n  display: flex;\n  gap: 8px;\n}\n.ai-balance {\n  padding: 6px 12px;\n  border-radius: 10px;\n}\n.ai-balance.positive {\n  background: rgba(34, 197, 94, 0.1);\n}\n.ai-balance.negative {\n  background: rgba(239, 68, 68, 0.1);\n}\n.ai-currency {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n  margin-left: 4px;\n}\n.ai-amount {\n  font-size: 16px;\n  font-weight: 900;\n  font-family: monospace;\n}\n.positive .ai-amount {\n  color: #22c55e;\n}\n.negative .ai-amount {\n  color: #ef4444;\n}\n.table-card-3d {\n  margin-bottom: 16px;\n  border-radius: 18px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  overflow: hidden;\n}\n.table-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(16, 185, 129, 0.04),\n      rgba(20, 184, 166, 0.02));\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n}\n.table-header h3 {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n}\n.table-icon {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #14b8a6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 3px 8px rgba(16, 185, 129, 0.3);\n}\n.table-icon .material-icons-round {\n  font-size: 17px;\n  color: white;\n}\n.table-wrap {\n  overflow-x: auto;\n}\n.table-header-info {\n  margin-right: auto;\n}\n.entries-count {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n  background: var(--bg-surface, #f1f5f9);\n  padding: 3px 10px;\n  border-radius: 8px;\n}\n.cell-index {\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n  font-weight: 600;\n}\n.totals-row {\n  background: rgba(16, 185, 129, 0.04) !important;\n}\n.totals-row td {\n  font-weight: 900 !important;\n}\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table th,\n.data-table td {\n  padding: 10px 16px;\n  font-size: 12px;\n  font-weight: 600;\n  text-align: right;\n}\n.data-table thead tr {\n  background: var(--bg-surface, #f8fafc);\n}\n.data-table th {\n  color: var(--text-secondary, #64748b);\n  font-weight: 700;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.data-table tbody tr {\n  border-top: 1px solid var(--border-color, #f1f5f9);\n  transition: background 0.15s;\n}\n.data-table tbody tr:hover {\n  background: rgba(16, 185, 129, 0.02);\n}\n.cell-name {\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.op-icon {\n  font-size: 16px !important;\n}\n.cell-date {\n  font-family: monospace;\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n}\n.cell-ref {\n  font-family: monospace;\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n}\n.cell-desc {\n  color: var(--text-secondary, #64748b);\n}\n.cell-type {\n  color: var(--text-muted, #94a3b8);\n}\n.cell-amount {\n  font-family: monospace;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n}\n.cell-count {\n  color: var(--text-muted, #94a3b8);\n}\n.cell-debit {\n  font-family: monospace;\n  font-weight: 700;\n  color: #22c55e;\n}\n.cell-credit {\n  font-family: monospace;\n  font-weight: 700;\n  color: #ef4444;\n}\n.cell-balance {\n  font-family: monospace;\n  font-weight: 800;\n}\n.cell-balance.positive {\n  color: #3b82f6;\n}\n.cell-balance.negative {\n  color: #f59e0b;\n}\n.type-badge {\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.type-badge.receipt {\n  background: rgba(34, 197, 94, 0.1);\n  color: #22c55e;\n}\n.type-badge.payment {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.loading-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.loading-spinner {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 3px solid rgba(16, 185, 129, 0.15);\n  border-top-color: #10b981;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.empty-state p {\n  font-size: 14px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n.empty-icon-3d {\n  width: 72px;\n  height: 72px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #14b8a6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 12px 32px rgba(16, 185, 129, 0.3);\n  transform: perspective(150px) rotateX(10deg);\n}\n.empty-icon-3d .material-icons-round {\n  font-size: 36px;\n  color: white;\n}\n@media (max-width: 768px) {\n  .page-header {\n    flex-direction: column;\n    gap: 14px;\n    align-items: flex-start;\n  }\n  .stats-row {\n    flex-direction: column;\n  }\n  .tabs-3d {\n    flex-wrap: wrap;\n  }\n  .filter-row {\n    flex-direction: column;\n  }\n  .account-info-3d {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n/*# sourceMappingURL=reports-advanced.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportsAdvancedComponent, { className: "ReportsAdvancedComponent", filePath: "src/app/pages/reports-advanced/reports-advanced.ts", lineNumber: 18 });
})();
export {
  ReportsAdvancedComponent
};
//# sourceMappingURL=chunk-KHQ5UYWK.js.map
