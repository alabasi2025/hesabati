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
  __spreadProps,
  __spreadValues,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵarrowFunction,
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/accounts/accounts.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.acc.id;
var arrowFn0 = (ctx, view) => (n) => {
  \u0275\u0275restoreView(view);
  const row_r8 = \u0275\u0275nextContext().$implicit;
  return \u0275\u0275resetView(n.id === row_r8.acc.accountSubNatureId);
};
function AccountsComponent_For_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("value", n_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", n_r1.name, " (", n_r1.count, ")");
  }
}
function AccountsComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AccountsComponent_For_16_Conditional_0_Template, 2, 3, "option", 13);
  }
  if (rf & 2) {
    const n_r1 = ctx.$implicit;
    \u0275\u0275conditional(n_r1.count > 0 ? 0 : -1);
  }
}
function AccountsComponent_For_23_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function AccountsComponent_For_23_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const n_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setNatureFilter(n_r3.id));
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r3.activeNatureFilter() === n_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r3.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", n_r3.name, " (", n_r3.count, ")");
  }
}
function AccountsComponent_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AccountsComponent_For_23_Conditional_0_Template, 4, 5, "button", 14);
  }
  if (rf & 2) {
    const n_r3 = ctx.$implicit;
    \u0275\u0275conditional(n_r3.count > 0 ? 0 : -1);
  }
}
function AccountsComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "span", 15);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function AccountsComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 2);
    \u0275\u0275text(2, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd()();
  }
}
function AccountsComponent_Conditional_26_For_25_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function AccountsComponent_Conditional_26_For_25_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const row_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.toggleNode(row_r8.acc.id));
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r8.isCollapsed ? "chevron_right" : "expand_more");
  }
}
function AccountsComponent_Conditional_26_For_25_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 29);
  }
}
function AccountsComponent_Conditional_26_For_25_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r8.childrenCount);
  }
}
function AccountsComponent_Conditional_26_For_25_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_13_0;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(((tmp_13_0 = ctx_r3.accountSubNatures().find(\u0275\u0275arrowFunction(1, arrowFn0, ctx))) == null ? null : tmp_13_0.name) || "\u0646\u0648\u0639");
  }
}
function AccountsComponent_Conditional_26_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26)(2, "div", 27);
    \u0275\u0275conditionalCreate(3, AccountsComponent_Conditional_26_For_25_Conditional_3_Template, 3, 1, "button", 28)(4, AccountsComponent_Conditional_26_For_25_Conditional_4_Template, 1, 0, "span", 29);
    \u0275\u0275elementStart(5, "span", 2);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "h3");
    \u0275\u0275text(9);
    \u0275\u0275conditionalCreate(10, AccountsComponent_Conditional_26_For_25_Conditional_10_Template, 2, 1, "span", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 31)(14, "button", 32);
    \u0275\u0275listener("click", function AccountsComponent_Conditional_26_For_25_Template_button_click_14_listener() {
      const row_r8 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.openEdit(row_r8.acc));
    });
    \u0275\u0275elementStart(15, "span", 2);
    \u0275\u0275text(16, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 33);
    \u0275\u0275listener("click", function AccountsComponent_Conditional_26_For_25_Template_button_click_17_listener() {
      const row_r8 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deleteAccount(row_r8.acc));
    });
    \u0275\u0275elementStart(18, "span", 2);
    \u0275\u0275text(19, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(20, "div", 34)(21, "span", 35);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, AccountsComponent_Conditional_26_For_25_Conditional_23_Template, 2, 2, "span", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    const \u0275$index_104_r9 = ctx.$index;
    \u0275\u0275styleProp("margin-inline-start", row_r8.level * 24, "px")("animation-delay", \u0275$index_104_r9 * 16, "ms");
    \u0275\u0275classProp("root", row_r8.level === 0)("main-node", row_r8.acc.isLeafAccount === false);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(row_r8.hasChildren ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r8.acc.isLeafAccount ? "account_balance_wallet" : "folder");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", row_r8.acc.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r8.hasChildren ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r8.acc.code || "---");
    \u0275\u0275advance(9);
    \u0275\u0275classProp("active", row_r8.acc.isLeafAccount);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r8.acc.isLeafAccount ? "\u062D\u0633\u0627\u0628 \u0641\u0631\u0639\u064A" : "\u062D\u0633\u0627\u0628 \u0631\u0626\u064A\u0633\u064A");
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r8.acc.accountSubNatureId ? 23 : -1);
  }
}
function AccountsComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17)(2, "span", 18)(3, "span", 2);
    \u0275\u0275text(4, "account_tree");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 19)(7, "span", 2);
    \u0275\u0275text(8, "folder");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 20)(11, "span", 2);
    \u0275\u0275text(12, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 21)(15, "button", 22);
    \u0275\u0275listener("click", function AccountsComponent_Conditional_26_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.expandAll());
    });
    \u0275\u0275elementStart(16, "span", 2);
    \u0275\u0275text(17, "unfold_more");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, "\u0641\u062A\u062D \u0627\u0644\u0643\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 22);
    \u0275\u0275listener("click", function AccountsComponent_Conditional_26_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.collapseAll());
    });
    \u0275\u0275elementStart(20, "span", 2);
    \u0275\u0275text(21, "unfold_less");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22, "\u0637\u064A \u0627\u0644\u0643\u0644");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 23);
    \u0275\u0275repeaterCreate(24, AccountsComponent_Conditional_26_For_25_Template, 24, 17, "div", 24, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u0627\u0644\u0643\u0644: ", ctx_r3.treeSummary().total);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u0631\u0626\u064A\u0633\u064A: ", ctx_r3.treeSummary().main);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u0641\u0631\u0639\u064A: ", ctx_r3.treeSummary().leaf);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r3.treeRows());
  }
}
function AccountsComponent_Conditional_27_For_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const parent_r11 = ctx.$implicit;
    \u0275\u0275property("value", parent_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", parent_r11.code, " - ", parent_r11.name);
  }
}
function AccountsComponent_Conditional_27_Conditional_52_For_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1, "\u0646\u0638\u0627\u0645\u064A");
    \u0275\u0275elementEnd();
  }
}
function AccountsComponent_Conditional_27_Conditional_52_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 60);
    \u0275\u0275listener("click", function AccountsComponent_Conditional_27_Conditional_52_For_7_Template_button_click_0_listener() {
      const nature_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.selectSubNature(nature_r13.id));
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, AccountsComponent_Conditional_27_Conditional_52_For_7_Conditional_5_Template, 2, 0, "span", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const nature_r13 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r3.form().accountSubNatureId === nature_r13.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(nature_r13.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(nature_r13.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(nature_r13.isSystem ? 5 : -1);
  }
}
function AccountsComponent_Conditional_27_Conditional_52_Conditional_8_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r15 = ctx.$implicit;
    \u0275\u0275property("ngValue", item_r15.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r15.name);
  }
}
function AccountsComponent_Conditional_27_Conditional_52_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "label");
    \u0275\u0275text(2, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641 ");
    \u0275\u0275elementStart(3, "span", 49);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function AccountsComponent_Conditional_27_Conditional_52_Conditional_8_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.form().subTypeId, $event) || (ctx_r3.form().subTypeId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(6, "option", 63);
    \u0275\u0275text(7, "\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, AccountsComponent_Conditional_27_Conditional_52_Conditional_8_For_9_Template, 2, 2, "option", 63, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form().subTypeId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.subTypeOptions());
  }
}
function AccountsComponent_Conditional_27_Conditional_52_Conditional_9_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const st_r17 = ctx.$implicit;
    \u0275\u0275property("value", st_r17.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(st_r17.name);
  }
}
function AccountsComponent_Conditional_27_Conditional_52_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "label");
    \u0275\u0275text(2, "\u0627\u0644\u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 64);
    \u0275\u0275twoWayListener("ngModelChange", function AccountsComponent_Conditional_27_Conditional_52_Conditional_9_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.form().stationId, $event) || (ctx_r3.form().stationId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 13);
    \u0275\u0275text(5, "\u0627\u062E\u062A\u0631 \u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, AccountsComponent_Conditional_27_Conditional_52_Conditional_9_For_7_Template, 2, 2, "option", 13, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form().stationId);
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.stations());
  }
}
function AccountsComponent_Conditional_27_Conditional_52_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "label");
    \u0275\u0275text(2, "\u0627\u0644\u062C\u0647\u0629 (\u0645\u062B\u0627\u0644: \u0628\u0646\u0643 \u0627\u0644\u0643\u0631\u064A\u0645\u064A\u060C \u062C\u0648\u0627\u0644\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 65);
    \u0275\u0275twoWayListener("ngModelChange", function AccountsComponent_Conditional_27_Conditional_52_Conditional_10_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.form().provider, $event) || (ctx_r3.form().provider = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form().provider);
  }
}
function AccountsComponent_Conditional_27_Conditional_52_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "label");
    \u0275\u0275text(2, "\u0631\u0642\u0645 \u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 66);
    \u0275\u0275twoWayListener("ngModelChange", function AccountsComponent_Conditional_27_Conditional_52_Conditional_11_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.form().accountNumber, $event) || (ctx_r3.form().accountNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form().accountNumber);
  }
}
function AccountsComponent_Conditional_27_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "label");
    \u0275\u0275text(2, "\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A ");
    \u0275\u0275elementStart(3, "span", 49);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 58);
    \u0275\u0275repeaterCreate(6, AccountsComponent_Conditional_27_Conditional_52_For_7_Template, 6, 5, "button", 59, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, AccountsComponent_Conditional_27_Conditional_52_Conditional_8_Template, 10, 2, "div", 45);
    \u0275\u0275conditionalCreate(9, AccountsComponent_Conditional_27_Conditional_52_Conditional_9_Template, 8, 2, "div", 45);
    \u0275\u0275conditionalCreate(10, AccountsComponent_Conditional_27_Conditional_52_Conditional_10_Template, 4, 1, "div", 45);
    \u0275\u0275conditionalCreate(11, AccountsComponent_Conditional_27_Conditional_52_Conditional_11_Template, 4, 1, "div", 45);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r3.accountSubNatures());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.subTypeOptions().length > 0 ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.showStationField() ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.showProviderField() ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.showAccountNumberField() ? 11 : -1);
  }
}
function AccountsComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275listener("click", function AccountsComponent_Conditional_27_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 39);
    \u0275\u0275listener("click", function AccountsComponent_Conditional_27_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 40)(3, "div", 41)(4, "div", 42)(5, "span", 2);
    \u0275\u0275text(6, "account_balance_wallet");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0627\u0644\u0634\u062C\u0631\u0629 \u0627\u0644\u0645\u0648\u062D\u062F\u0629 \u0644\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 43);
    \u0275\u0275listener("click", function AccountsComponent_Conditional_27_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 44)(16, "div", 45)(17, "label");
    \u0275\u0275text(18, "\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 46)(20, "label", 47)(21, "input", 48);
    \u0275\u0275listener("change", function AccountsComponent_Conditional_27_Template_input_change_21_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.form.update((f) => __spreadProps(__spreadValues({}, f), { isLeafAccount: false, accountSubNatureId: null, subTypeId: null })));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 2);
    \u0275\u0275text(23, "folder");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "strong");
    \u0275\u0275text(26, "\u062D\u0633\u0627\u0628 \u0631\u0626\u064A\u0633\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "small");
    \u0275\u0275text(28, "\u0644\u0644\u062A\u0646\u0638\u064A\u0645");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "label", 47)(30, "input", 48);
    \u0275\u0275listener("change", function AccountsComponent_Conditional_27_Template_input_change_30_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.form.update((f) => __spreadProps(__spreadValues({}, f), { isLeafAccount: true })));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 2);
    \u0275\u0275text(32, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div")(34, "strong");
    \u0275\u0275text(35, "\u062D\u0633\u0627\u0628 \u0641\u0631\u0639\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "small");
    \u0275\u0275text(37, "\u0645\u0627\u0644\u064A \u0641\u0639\u0644\u064A");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(38, "div", 45)(39, "label");
    \u0275\u0275text(40, "\u0627\u0633\u0645 \u0627\u0644\u062D\u0633\u0627\u0628 ");
    \u0275\u0275elementStart(41, "span", 49);
    \u0275\u0275text(42, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function AccountsComponent_Conditional_27_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form().name, $event) || (ctx_r3.form().name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 45)(45, "label");
    \u0275\u0275text(46, "\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0623\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "select", 51);
    \u0275\u0275twoWayListener("ngModelChange", function AccountsComponent_Conditional_27_Template_select_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form().parentAccountId, $event) || (ctx_r3.form().parentAccountId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(48, "option", 13);
    \u0275\u0275text(49, "\u062C\u0630\u0631 (\u0645\u0633\u062A\u0648\u0649 \u0623\u0648\u0644)");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(50, AccountsComponent_Conditional_27_For_51_Template, 2, 3, "option", 13, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(52, AccountsComponent_Conditional_27_Conditional_52_Template, 12, 4);
    \u0275\u0275elementStart(53, "div", 45)(54, "label");
    \u0275\u0275text(55, "\u0627\u0644\u0631\u0645\u0632/\u0627\u0644\u0643\u0648\u062F (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function AccountsComponent_Conditional_27_Template_input_ngModelChange_56_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form().code, $event) || (ctx_r3.form().code = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 45)(58, "label");
    \u0275\u0275text(59, "\u0627\u0644\u0645\u0633\u0624\u0648\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function AccountsComponent_Conditional_27_Template_input_ngModelChange_60_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form().responsiblePerson, $event) || (ctx_r3.form().responsiblePerson = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 45)(62, "label");
    \u0275\u0275text(63, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "textarea", 54);
    \u0275\u0275twoWayListener("ngModelChange", function AccountsComponent_Conditional_27_Template_textarea_ngModelChange_64_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.form().notes, $event) || (ctx_r3.form().notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "div", 55)(66, "button", 56);
    \u0275\u0275listener("click", function AccountsComponent_Conditional_27_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveForm());
    });
    \u0275\u0275text(67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "button", 57);
    \u0275\u0275listener("click", function AccountsComponent_Conditional_27_Template_button_click_68_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.showForm.set(false));
    });
    \u0275\u0275text(69, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r3.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u062D\u0633\u0627\u0628" : "\u0625\u0636\u0627\u0641\u0629 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(12);
    \u0275\u0275property("value", false)("checked", !ctx_r3.form().isLeafAccount);
    \u0275\u0275advance(9);
    \u0275\u0275property("value", true)("checked", ctx_r3.form().isLeafAccount);
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form().name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form().parentAccountId);
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.parentAccountOptions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.form().isLeafAccount ? 52 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form().code);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form().responsiblePerson);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.form().notes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628");
  }
}
var AccountsComponent = class _AccountsComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
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
  fundTypes = signal([], ...ngDevMode ? [{ debugName: "fundTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  bankTypes = signal([], ...ngDevMode ? [{ debugName: "bankTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  exchangeTypes = signal([], ...ngDevMode ? [{ debugName: "exchangeTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  eWalletTypes = signal([], ...ngDevMode ? [{ debugName: "eWalletTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  supplierTypes = signal([], ...ngDevMode ? [{ debugName: "supplierTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  warehouseTypes = signal([], ...ngDevMode ? [{ debugName: "warehouseTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  departments = signal([], ...ngDevMode ? [{ debugName: "departments" }] : (
    /* istanbul ignore next */
    []
  ));
  stations = signal([], ...ngDevMode ? [{ debugName: "stations" }] : (
    /* istanbul ignore next */
    []
  ));
  showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : (
    /* istanbul ignore next */
    []
  ));
  editingId = signal(null, ...ngDevMode ? [{ debugName: "editingId" }] : (
    /* istanbul ignore next */
    []
  ));
  searchQuery = signal("", ...ngDevMode ? [{ debugName: "searchQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  activeNatureFilter = signal(null, ...ngDevMode ? [{ debugName: "activeNatureFilter" }] : (
    /* istanbul ignore next */
    []
  ));
  collapsedIds = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "collapsedIds" }] : (
    /* istanbul ignore next */
    []
  ));
  form = signal({
    isLeafAccount: true,
    parentAccountId: null,
    accountSubNatureId: null,
    subTypeId: null,
    name: "",
    code: "",
    stationId: null,
    provider: "",
    accountNumber: "",
    responsiblePerson: "",
    notes: "",
    isActive: true
  }, ...ngDevMode ? [{ debugName: "form" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedSubNature = computed(() => {
    const id = this.form().accountSubNatureId;
    if (!id || !Number.isInteger(id) || id <= 0)
      return null;
    return this.accountSubNatures().find((n) => n.id === id) || null;
  }, ...ngDevMode ? [{ debugName: "selectedSubNature" }] : (
    /* istanbul ignore next */
    []
  ));
  showStationField = computed(() => this.selectedSubNature()?.requiresStation === true, ...ngDevMode ? [{ debugName: "showStationField" }] : (
    /* istanbul ignore next */
    []
  ));
  showProviderField = computed(() => this.selectedSubNature()?.requiresProvider === true, ...ngDevMode ? [{ debugName: "showProviderField" }] : (
    /* istanbul ignore next */
    []
  ));
  showAccountNumberField = computed(() => this.selectedSubNature()?.requiresAccountNumber === true, ...ngDevMode ? [{ debugName: "showAccountNumberField" }] : (
    /* istanbul ignore next */
    []
  ));
  subTypeOptions = computed(() => {
    const key = String(this.selectedSubNature()?.natureKey || "");
    if (key === "fund")
      return this.fundTypes();
    if (key === "bank")
      return this.bankTypes();
    if (key === "exchange")
      return this.exchangeTypes();
    if (key === "e_wallet")
      return this.eWalletTypes();
    if (key === "supplier")
      return this.supplierTypes();
    if (key === "warehouse")
      return this.warehouseTypes();
    if (key === "employee")
      return this.departments();
    return [];
  }, ...ngDevMode ? [{ debugName: "subTypeOptions" }] : (
    /* istanbul ignore next */
    []
  ));
  requiresSubTypeSelection = computed(() => this.form().isLeafAccount && this.subTypeOptions().length > 0, ...ngDevMode ? [{ debugName: "requiresSubTypeSelection" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedSubType = computed(() => {
    const selectedId = Number(this.form().subTypeId);
    if (!Number.isInteger(selectedId) || selectedId <= 0)
      return null;
    return this.subTypeOptions().find((x) => x.id === selectedId) || null;
  }, ...ngDevMode ? [{ debugName: "selectedSubType" }] : (
    /* istanbul ignore next */
    []
  ));
  parentAccountOptions = computed(() => this.accounts().filter((a) => a.isLeafAccount === false).sort((a, b) => String(a.code || "").localeCompare(String(b.code || ""))), ...ngDevMode ? [{ debugName: "parentAccountOptions" }] : (
    /* istanbul ignore next */
    []
  ));
  filteredAccounts = computed(() => {
    let list = [...this.accounts()];
    const query = this.searchQuery().toLowerCase().trim();
    if (query)
      list = list.filter((a) => a.name?.toLowerCase().includes(query) || String(a.code || "").toLowerCase().includes(query));
    const natureFilter = this.activeNatureFilter();
    if (natureFilter && Number.isInteger(natureFilter) && natureFilter > 0) {
      list = list.filter((a) => a.accountSubNatureId === natureFilter);
    }
    return list;
  }, ...ngDevMode ? [{ debugName: "filteredAccounts" }] : (
    /* istanbul ignore next */
    []
  ));
  treeRows = computed(() => {
    const all = this.accounts();
    const filtered = this.filteredAccounts();
    if (!all.length || !filtered.length) {
      return [];
    }
    const byId = /* @__PURE__ */ new Map();
    const childrenByParent = /* @__PURE__ */ new Map();
    const orderById = /* @__PURE__ */ new Map();
    all.forEach((acc, idx) => {
      orderById.set(acc.id, idx);
      byId.set(acc.id, acc);
    });
    const visibleIds = /* @__PURE__ */ new Set();
    for (const acc of filtered) {
      let current = acc;
      while (current && Number.isInteger(current.id) && !visibleIds.has(current.id)) {
        visibleIds.add(current.id);
        current = current.parentAccountId ? byId.get(current.parentAccountId) : void 0;
      }
    }
    const visibleList = all.filter((acc) => visibleIds.has(acc.id));
    for (const acc of visibleList) {
      const parentId = Number.isInteger(acc.parentAccountId) ? acc.parentAccountId : null;
      if (!childrenByParent.has(parentId))
        childrenByParent.set(parentId, []);
      childrenByParent.get(parentId).push(acc);
    }
    for (const [, items] of childrenByParent.entries()) {
      items.sort((a, b) => {
        if (a.isLeafAccount !== b.isLeafAccount) {
          return a.isLeafAccount ? 1 : -1;
        }
        const aCode = String(a.code || "");
        const bCode = String(b.code || "");
        if (aCode !== bCode)
          return aCode.localeCompare(bCode);
        return (orderById.get(a.id) ?? 0) - (orderById.get(b.id) ?? 0);
      });
    }
    const rows = [];
    const collapsed = this.collapsedIds();
    const pushNode = (node, level) => {
      const children = childrenByParent.get(node.id) || [];
      const hasChildren = children.length > 0;
      const isCollapsed = hasChildren && collapsed.has(node.id);
      rows.push({ acc: node, level, hasChildren, isCollapsed, childrenCount: children.length });
      if (isCollapsed)
        return;
      for (const child of children)
        pushNode(child, level + 1);
    };
    const roots = [
      ...childrenByParent.get(null) || [],
      ...visibleList.filter((acc) => acc.parentAccountId != null && !visibleIds.has(acc.parentAccountId))
    ];
    const seen = /* @__PURE__ */ new Set();
    for (const root of roots) {
      if (seen.has(root.id))
        continue;
      seen.add(root.id);
      pushNode(root, 0);
    }
    return rows;
  }, ...ngDevMode ? [{ debugName: "treeRows" }] : (
    /* istanbul ignore next */
    []
  ));
  treeSummary = computed(() => {
    const rows = this.treeRows();
    const main = rows.filter((r) => r.acc.isLeafAccount === false).length;
    const leaf = rows.filter((r) => r.acc.isLeafAccount === true).length;
    return { total: rows.length, main, leaf };
  }, ...ngDevMode ? [{ debugName: "treeSummary" }] : (
    /* istanbul ignore next */
    []
  ));
  naturesStats = computed(() => {
    const natures = [...this.accountSubNatures()].sort((a, b) => {
      const aSeq = Number(a?.sequenceNumber) || 0;
      const bSeq = Number(b?.sequenceNumber) || 0;
      if (aSeq !== bSeq)
        return aSeq - bSeq;
      return Number(a?.id || 0) - Number(b?.id || 0);
    });
    const accs = this.accounts();
    return natures.map((n) => __spreadProps(__spreadValues({}, n), { count: accs.filter((a) => a.accountSubNatureId === n.id).length }));
  }, ...ngDevMode ? [{ debugName: "naturesStats" }] : (
    /* istanbul ignore next */
    []
  ));
  onBizIdChange(_bizId) {
    if (this.bizId > 0)
      void this.loadAccounts();
  }
  async loadAccounts() {
    if (this.bizId <= 0) {
      this.loading.set(false);
      return;
    }
    this.loading.set(true);
    try {
      const [accountsData, naturesData, stationsData, fundTypesData, bankTypesData, exchangeTypesData, eWalletTypesData, supplierTypesData, warehouseTypesData, departmentsData] = await Promise.all([
        this.api.getAccounts(this.bizId),
        this.api.getAccountSubNatures(this.bizId),
        this.api.getStations(this.bizId).catch(() => []),
        this.api.getFundTypes(this.bizId).catch(() => []),
        this.api.getBankTypes(this.bizId).catch(() => []),
        this.api.getExchangeTypes(this.bizId).catch(() => []),
        this.api.getEWalletTypes(this.bizId).catch(() => []),
        this.api.getSupplierTypes(this.bizId).catch(() => []),
        this.api.getWarehouseTypes(this.bizId).catch(() => []),
        this.api.getDepartments(this.bizId).catch(() => [])
      ]);
      this.accounts.set((accountsData || []).map((a) => __spreadProps(__spreadValues({}, a), {
        isLeafAccount: this.coerceLeafFlag(a.isLeafAccount)
      })));
      this.accountSubNatures.set(naturesData || []);
      this.stations.set(stationsData || []);
      this.fundTypes.set(fundTypesData || []);
      this.bankTypes.set(bankTypesData || []);
      this.exchangeTypes.set(exchangeTypesData || []);
      this.eWalletTypes.set(eWalletTypesData || []);
      this.supplierTypes.set(supplierTypesData || []);
      this.warehouseTypes.set(warehouseTypesData || []);
      this.departments.set(departmentsData || []);
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0645\u064A\u0644");
      this.accounts.set([]);
    } finally {
      this.loading.set(false);
    }
  }
  openCreate() {
    this.editingId.set(null);
    this.form.set({ isLeafAccount: true, parentAccountId: null, accountSubNatureId: null, subTypeId: null, name: "", code: "", stationId: null, provider: "", accountNumber: "", responsiblePerson: "", notes: "", isActive: true });
    this.showForm.set(true);
  }
  openEdit(acc) {
    this.editingId.set(acc.id);
    this.form.set({ isLeafAccount: acc.isLeafAccount !== false, parentAccountId: acc.parentAccountId || null, accountSubNatureId: acc.accountSubNatureId || null, subTypeId: acc.subTypeId || null, name: acc.name || "", code: acc.code || "", stationId: acc.stationId || null, provider: acc.provider || "", accountNumber: acc.accountNumber || "", responsiblePerson: acc.responsiblePerson || "", notes: acc.notes || "", isActive: acc.isActive !== false });
    this.showForm.set(true);
  }
  async saveForm() {
    const f = this.form();
    if (!f.name?.trim()) {
      this.toast.error("\u0627\u0633\u0645 \u0627\u0644\u062D\u0633\u0627\u0628 \u0645\u0637\u0644\u0648\u0628");
      return;
    }
    if (f.isLeafAccount && (!f.accountSubNatureId || !Number.isInteger(f.accountSubNatureId) || f.accountSubNatureId <= 0)) {
      this.toast.error("\u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A");
      return;
    }
    if (this.requiresSubTypeSelection() && (!f.subTypeId || !Number.isInteger(f.subTypeId) || f.subTypeId <= 0)) {
      this.toast.error("\u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0642\u0628\u0644 \u062D\u0641\u0638 \u0627\u0644\u062D\u0633\u0627\u0628");
      return;
    }
    try {
      const payload = { name: f.name, isLeafAccount: f.isLeafAccount, parentAccountId: f.parentAccountId || null, accountSubNatureId: f.accountSubNatureId || null, code: f.code || null, stationId: f.stationId || null, provider: f.provider || null, accountNumber: f.accountNumber || null, responsiblePerson: f.responsiblePerson || null, notes: f.notes || null, isActive: f.isActive !== false };
      if (f.isLeafAccount && Number.isInteger(f.subTypeId) && f.subTypeId > 0) {
        payload.subTypeId = Number(f.subTypeId);
        payload.subType = this.selectedSubType()?.subTypeKey || null;
      }
      if (this.editingId()) {
        await this.api.updateAccount(this.bizId, this.editingId(), payload);
        this.toast.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0633\u0627\u0628");
      } else {
        await this.api.createAccount(this.bizId, payload);
        this.toast.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628");
      }
      this.showForm.set(false);
      await this.loadAccounts();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638");
    }
  }
  async deleteAccount(acc) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u062D\u0633\u0627\u0628 "${acc.name}"\u061F`, type: "danger" });
    if (!confirmed)
      return;
    try {
      await this.api.deleteAccount(this.bizId, acc.id);
      this.toast.success("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641");
      await this.loadAccounts();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641");
    }
  }
  selectSubNature(id) {
    this.form.update((f) => __spreadProps(__spreadValues({}, f), { accountSubNatureId: id, subTypeId: null }));
  }
  setNatureFilter(id) {
    this.activeNatureFilter.set(id);
  }
  trackById(_, item) {
    return item?.id;
  }
  toggleNode(id) {
    this.collapsedIds.update((prev) => {
      const next = new Set(prev);
      if (next.has(id))
        next.delete(id);
      else
        next.add(id);
      return next;
    });
  }
  collapseAll() {
    const ids = /* @__PURE__ */ new Set();
    for (const row of this.treeRows()) {
      if (row.hasChildren)
        ids.add(row.acc.id);
    }
    this.collapsedIds.set(ids);
  }
  expandAll() {
    this.collapsedIds.set(/* @__PURE__ */ new Set());
  }
  coerceLeafFlag(value) {
    if (value === false || value === "false" || value === 0 || value === "0")
      return false;
    return true;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275AccountsComponent_BaseFactory;
    return function AccountsComponent_Factory(__ngFactoryType__) {
      return (\u0275AccountsComponent_BaseFactory || (\u0275AccountsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_AccountsComponent)))(__ngFactoryType__ || _AccountsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccountsComponent, selectors: [["app-accounts"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 28, vars: 6, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "filter-row"], ["type", "text", "placeholder", "\u0627\u0628\u062D\u062B...", 1, "search-box", 3, "input", "value"], ["aria-label", "\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0641\u0631\u0639\u064A", "title", "\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0641\u0631\u0639\u064A", 1, "filter-select", 3, "change", "value"], ["value", ""], [1, "nature-chips"], [1, "chip", 3, "click"], [1, "loading-state"], [1, "empty-state"], [1, "modal-overlay"], [3, "value"], [1, "chip", 3, "active"], [1, "material-icons-round", "spin"], [1, "tree-toolbar"], [1, "tree-stats"], [1, "stat-pill"], [1, "stat-pill", "main"], [1, "stat-pill", "leaf"], [1, "tree-actions"], ["type", "button", 1, "mini-btn", 3, "click"], [1, "tree-list"], [1, "card", "tree-card", "animate-3d-rise", "tilt-card", "glow-hover", "glow-blue", 3, "root", "main-node", "margin-inline-start", "animation-delay"], [1, "card", "tree-card", "animate-3d-rise", "tilt-card", "glow-hover", "glow-blue"], [1, "head"], [1, "title"], ["type", "button", 1, "toggle-btn", "press-3d", "ripple"], [1, "leaf-dot"], [1, "children-count"], [1, "actions"], [1, "action-btn", "edit", 3, "click"], [1, "action-btn", "delete", 3, "click"], [1, "flags"], [1, "status-badge"], [1, "status-badge", "partner"], ["type", "button", 1, "toggle-btn", "press-3d", "ripple", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "blue"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-group"], [1, "radio-row"], [1, "radio-opt"], ["type", "radio", "name", "level", 3, "change", "value", "checked"], [1, "required"], ["placeholder", "\u0645\u062B\u0627\u0644: \u0627\u0644\u0646\u0642\u062F\u064A\u0629\u060C \u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u062F\u0647\u0645\u064A\u0629", 3, "ngModelChange", "ngModel"], ["aria-label", "\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0623\u0628", "title", "\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0623\u0628", 3, "ngModelChange", "ngModel"], ["placeholder", "\u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629...", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"], [1, "sub-nature-grid"], ["type", "button", 1, "nature-btn", 3, "selected"], ["type", "button", 1, "nature-btn", 3, "click"], [1, "badge-sys"], ["aria-label", "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A", "title", "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["aria-label", "\u0627\u0644\u0645\u062D\u0637\u0629", "title", "\u0627\u0644\u0645\u062D\u0637\u0629", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0627\u0633\u0645 \u0627\u0644\u062C\u0647\u0629", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0631\u0642\u0645 \u0627\u0644\u062D\u0633\u0627\u0628", 3, "ngModelChange", "ngModel"]], template: function AccountsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "account_balance_wallet");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u062F\u0644\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function AccountsComponent_Template_button_click_6_listener() {
        return ctx.openCreate();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0625\u0636\u0627\u0641\u0629 \u062D\u0633\u0627\u0628");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "input", 5);
      \u0275\u0275listener("input", function AccountsComponent_Template_input_input_11_listener($event) {
        return ctx.searchQuery.set($event.target.value);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "select", 6);
      \u0275\u0275listener("change", function AccountsComponent_Template_select_change_12_listener($event) {
        return ctx.setNatureFilter($event.target.value ? +$event.target.value : null);
      });
      \u0275\u0275elementStart(13, "option", 7);
      \u0275\u0275text(14, "\u0643\u0644 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0641\u0631\u0639\u064A\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(15, AccountsComponent_For_16_Template, 1, 1, null, null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 8)(18, "button", 9);
      \u0275\u0275listener("click", function AccountsComponent_Template_button_click_18_listener() {
        return ctx.setNatureFilter(null);
      });
      \u0275\u0275elementStart(19, "span", 2);
      \u0275\u0275text(20, "apps");
      \u0275\u0275elementEnd();
      \u0275\u0275text(21, "\u0627\u0644\u0643\u0644");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(22, AccountsComponent_For_23_Template, 1, 1, null, null, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(24, AccountsComponent_Conditional_24_Template, 5, 0, "div", 10)(25, AccountsComponent_Conditional_25_Template, 5, 0, "div", 11)(26, AccountsComponent_Conditional_26_Template, 26, 3);
      \u0275\u0275conditionalCreate(27, AccountsComponent_Conditional_27_Template, 70, 13, "div", 12);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275property("value", ctx.searchQuery());
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.activeNatureFilter() || "");
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.naturesStats());
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.activeNatureFilter() === null);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.naturesStats());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 24 : ctx.treeRows().length === 0 ? 25 : 26);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 27 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.search-box[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 240px;\n  padding: 10px 14px;\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n}\n.filter-select[_ngcontent-%COMP%] {\n  min-width: 220px;\n  padding: 10px 12px;\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--bg-card);\n  color: var(--text-primary);\n}\n.nature-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.chip[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 999px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 600;\n  transition: all 0.2s;\n}\n.chip[_ngcontent-%COMP%]:hover {\n  background: var(--bg-hover);\n}\n.chip.active[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n  border-color: #3b82f6;\n}\n.chip[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.tree-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.tree-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\n.tree-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.stat-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  height: 32px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 700;\n}\n.stat-pill.main[_ngcontent-%COMP%] {\n  color: #0f766e;\n  border-color: color-mix(in srgb, #14b8a6 35%, var(--border-color));\n  background: color-mix(in srgb, #14b8a6 10%, var(--bg-surface));\n}\n.stat-pill.leaf[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n  border-color: color-mix(in srgb, #3b82f6 35%, var(--border-color));\n  background: color-mix(in srgb, #3b82f6 10%, var(--bg-surface));\n}\n.stat-pill[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.tree-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.mini-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  height: 32px;\n  padding: 0 10px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.mini-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.mini-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  background: var(--bg-hover);\n  border-color: var(--border-strong);\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  padding: 16px;\n  transition: all 0.2s;\n}\n.card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n}\n.tree-card[_ngcontent-%COMP%] {\n  position: relative;\n  background:\n    linear-gradient(\n      145deg,\n      color-mix(in srgb, var(--bg-card) 92%, #ffffff 8%),\n      var(--bg-card));\n  transform-style: preserve-3d;\n}\n.tree-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  inset-inline-start: -12px;\n  top: 0;\n  bottom: 0;\n  width: 2px;\n  background: color-mix(in srgb, var(--border-color) 80%, transparent);\n  border-radius: 999px;\n}\n.tree-card[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset-inline-start: -12px;\n  top: 26px;\n  width: 12px;\n  height: 2px;\n  background: color-mix(in srgb, var(--border-color) 80%, transparent);\n  border-radius: 999px;\n}\n.tree-card.root[_ngcontent-%COMP%]::before, \n.tree-card.root[_ngcontent-%COMP%]::after {\n  display: none;\n}\n.tree-card.main-node[_ngcontent-%COMP%] {\n  border-color: color-mix(in srgb, #14b8a6 45%, var(--border-color));\n  box-shadow: inset 0 0 0 1px color-mix(in srgb, #14b8a6 20%, transparent);\n}\n.head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n.title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex: 1;\n}\n.title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 700;\n}\n.title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 2px 0 0;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-family: monospace;\n}\n.flags[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition:\n    transform 0.25s ease,\n    box-shadow 0.25s ease,\n    background-color 0.2s ease;\n  transform-style: preserve-3d;\n}\n.toggle-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-hover);\n  transform: perspective(600px) translateY(-1px) rotateX(8deg);\n  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.14);\n}\n.toggle-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.leaf-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--text-muted) 60%, transparent);\n  margin-inline: 10px;\n}\n.children-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 22px;\n  height: 22px;\n  margin-inline-start: 8px;\n  padding: 0 6px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 800;\n  color: #1d4ed8;\n  background: color-mix(in srgb, #3b82f6 18%, transparent);\n  border: 1px solid color-mix(in srgb, #3b82f6 40%, transparent);\n}\n.tree-card[_ngcontent-%COMP%]:hover {\n  transform: perspective(900px) translateY(-2px) rotateX(2.5deg);\n  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.16);\n}\n.radio-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.radio-opt[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 14px;\n  border: 2px solid var(--border-color);\n  border-radius: 10px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  transition: all 0.2s;\n}\n.radio-opt[_ngcontent-%COMP%]:has(input:checked) {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.08);\n}\n.radio-opt[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #3b82f6;\n}\n.radio-opt[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n}\n.radio-opt[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n}\n.sub-nature-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 10px;\n}\n.nature-btn[_ngcontent-%COMP%] {\n  padding: 12px;\n  border: 2px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--bg-surface);\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  text-align: center;\n  transition: all 0.2s;\n}\n.nature-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-hover);\n}\n.nature-btn.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.08);\n}\n.nature-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #3b82f6;\n}\n.nature-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:not(.material-icons-round):not(.badge-sys) {\n  font-size: 13px;\n  font-weight: 600;\n}\n.badge-sys[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 999px;\n  background: rgba(100, 116, 139, 0.15);\n  color: var(--text-secondary);\n  font-size: 10px;\n  font-weight: 700;\n}\n.required[_ngcontent-%COMP%] {\n  color: #ef4444;\n  margin-left: 2px;\n}\n/*# sourceMappingURL=accounts.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccountsComponent, [{
    type: Component,
    args: [{ selector: "app-accounts", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">account_balance_wallet</span> \u062F\u0644\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A</h2>\r
    <button class="add-btn" (click)="openCreate()"><span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u062D\u0633\u0627\u0628</button>\r
  </div>\r
\r
  <div class="filter-row">\r
    <input type="text" placeholder="\u0627\u0628\u062D\u062B..." class="search-box" [value]="searchQuery()" (input)="searchQuery.set($any($event.target).value)">\r
    <select class="filter-select" aria-label="\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0641\u0631\u0639\u064A" title="\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0641\u0631\u0639\u064A" [value]="activeNatureFilter() || ''" (change)="setNatureFilter(($any($event.target).value ? +$any($event.target).value : null))">\r
      <option value="">\u0643\u0644 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0641\u0631\u0639\u064A\u0629</option>\r
      @for (n of naturesStats(); track n.id) {\r
        @if (n.count > 0) {\r
          <option [value]="n.id">{{ n.name }} ({{ n.count }})</option>\r
        }\r
      }\r
    </select>\r
    <div class="nature-chips">\r
      <button class="chip" [class.active]="activeNatureFilter() === null" (click)="setNatureFilter(null)"><span class="material-icons-round">apps</span>\u0627\u0644\u0643\u0644</button>\r
      @for (n of naturesStats(); track n.id) {\r
        @if (n.count > 0) {\r
          <button class="chip" [class.active]="activeNatureFilter() === n.id" (click)="setNatureFilter(n.id)"><span class="material-icons-round">{{ n.icon }}</span>{{ n.name }} ({{ n.count }})</button>\r
        }\r
      }\r
    </div>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (treeRows().length === 0) {\r
    <div class="empty-state"><span class="material-icons-round">account_balance_wallet</span><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0633\u0627\u0628\u0627\u062A</p></div>\r
  } @else {\r
    <div class="tree-toolbar">\r
      <div class="tree-stats">\r
        <span class="stat-pill"><span class="material-icons-round">account_tree</span>\u0627\u0644\u0643\u0644: {{ treeSummary().total }}</span>\r
        <span class="stat-pill main"><span class="material-icons-round">folder</span>\u0631\u0626\u064A\u0633\u064A: {{ treeSummary().main }}</span>\r
        <span class="stat-pill leaf"><span class="material-icons-round">account_balance_wallet</span>\u0641\u0631\u0639\u064A: {{ treeSummary().leaf }}</span>\r
      </div>\r
      <div class="tree-actions">\r
        <button class="mini-btn" type="button" (click)="expandAll()"><span class="material-icons-round">unfold_more</span>\u0641\u062A\u062D \u0627\u0644\u0643\u0644</button>\r
        <button class="mini-btn" type="button" (click)="collapseAll()"><span class="material-icons-round">unfold_less</span>\u0637\u064A \u0627\u0644\u0643\u0644</button>\r
      </div>\r
    </div>\r
    <div class="tree-list">\r
      @for (row of treeRows(); track row.acc.id; let i = $index) {\r
        <div class="card tree-card animate-3d-rise tilt-card glow-hover glow-blue" [class.root]="row.level === 0" [class.main-node]="row.acc.isLeafAccount === false" [style.margin-inline-start.px]="row.level * 24" [style.animation-delay.ms]="i * 16">\r
          <div class="head">\r
            <div class="title">\r
              @if (row.hasChildren) {\r
                <button class="toggle-btn press-3d ripple" type="button" (click)="toggleNode(row.acc.id)">\r
                  <span class="material-icons-round">{{ row.isCollapsed ? 'chevron_right' : 'expand_more' }}</span>\r
                </button>\r
              } @else {\r
                <span class="leaf-dot"></span>\r
              }\r
              <span class="material-icons-round">{{ row.acc.isLeafAccount ? 'account_balance_wallet' : 'folder' }}</span>\r
              <div>\r
                <h3>\r
                  {{ row.acc.name }}\r
                  @if (row.hasChildren) {\r
                    <span class="children-count">{{ row.childrenCount }}</span>\r
                  }\r
                </h3>\r
                <p>{{ row.acc.code || '---' }}</p>\r
              </div>\r
            </div>\r
            <div class="actions">\r
              <button class="action-btn edit" (click)="openEdit(row.acc)"><span class="material-icons-round">edit</span></button>\r
              <button class="action-btn delete" (click)="deleteAccount(row.acc)"><span class="material-icons-round">delete</span></button>\r
            </div>\r
          </div>\r
          <div class="flags">\r
            <span class="status-badge" [class.active]="row.acc.isLeafAccount">{{ row.acc.isLeafAccount ? '\u062D\u0633\u0627\u0628 \u0641\u0631\u0639\u064A' : '\u062D\u0633\u0627\u0628 \u0631\u0626\u064A\u0633\u064A' }}</span>\r
            @if (row.acc.accountSubNatureId) {\r
              <span class="status-badge partner">{{ (accountSubNatures().find(n => n.id === row.acc.accountSubNatureId))?.name || '\u0646\u0648\u0639' }}</span>\r
            }\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  @if (showForm()) {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row"><div class="modal-icon blue"><span class="material-icons-round">account_balance_wallet</span></div><div><h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u062D\u0633\u0627\u0628' : '\u0625\u0636\u0627\u0641\u0629 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F' }}</h2><p>\u0627\u0644\u0634\u062C\u0631\u0629 \u0627\u0644\u0645\u0648\u062D\u062F\u0629 \u0644\u0644\u062D\u0633\u0627\u0628\u0627\u062A</p></div></div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          \r
          <div class="form-group">\r
            <label>\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628</label>\r
            <div class="radio-row">\r
              <label class="radio-opt"><input type="radio" name="level" [value]="false" [checked]="!form().isLeafAccount" (change)="form.update(f => ({ ...f, isLeafAccount: false, accountSubNatureId: null, subTypeId: null }))"><span class="material-icons-round">folder</span><div><strong>\u062D\u0633\u0627\u0628 \u0631\u0626\u064A\u0633\u064A</strong><small>\u0644\u0644\u062A\u0646\u0638\u064A\u0645</small></div></label>\r
              <label class="radio-opt"><input type="radio" name="level" [value]="true" [checked]="form().isLeafAccount" (change)="form.update(f => ({ ...f, isLeafAccount: true }))"><span class="material-icons-round">account_balance_wallet</span><div><strong>\u062D\u0633\u0627\u0628 \u0641\u0631\u0639\u064A</strong><small>\u0645\u0627\u0644\u064A \u0641\u0639\u0644\u064A</small></div></label>\r
            </div>\r
          </div>\r
\r
          <div class="form-group"><label>\u0627\u0633\u0645 \u0627\u0644\u062D\u0633\u0627\u0628 <span class="required">*</span></label><input [(ngModel)]="form().name" placeholder="\u0645\u062B\u0627\u0644: \u0627\u0644\u0646\u0642\u062F\u064A\u0629\u060C \u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u062F\u0647\u0645\u064A\u0629"></div>\r
\r
          <div class="form-group"><label>\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0623\u0628</label><select aria-label="\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0623\u0628" title="\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0623\u0628" [(ngModel)]="form().parentAccountId"><option [value]="null">\u062C\u0630\u0631 (\u0645\u0633\u062A\u0648\u0649 \u0623\u0648\u0644)</option>@for (parent of parentAccountOptions(); track parent.id) {<option [value]="parent.id">{{ parent.code }} - {{ parent.name }}</option>}</select></div>\r
\r
          @if (form().isLeafAccount) {\r
            <div class="form-group">\r
              <label>\u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A <span class="required">*</span></label>\r
              <div class="sub-nature-grid">\r
                @for (nature of accountSubNatures(); track nature.id) {\r
                  <button type="button" class="nature-btn" [class.selected]="form().accountSubNatureId === nature.id" (click)="selectSubNature(nature.id)">\r
                    <span class="material-icons-round">{{ nature.icon }}</span>\r
                    <span>{{ nature.name }}</span>\r
                    @if (nature.isSystem) {<span class="badge-sys">\u0646\u0638\u0627\u0645\u064A</span>}\r
                  </button>\r
                }\r
              </div>\r
            </div>\r
            @if (subTypeOptions().length > 0) {\r
              <div class="form-group">\r
                <label>\u0627\u0644\u062A\u0635\u0646\u064A\u0641 <span class="required">*</span></label>\r
                <select aria-label="\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A" title="\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0631\u0639\u064A" [(ngModel)]="form().subTypeId">\r
                  <option [ngValue]="null">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641</option>\r
                  @for (item of subTypeOptions(); track item.id) {\r
                    <option [ngValue]="item.id">{{ item.name }}</option>\r
                  }\r
                </select>\r
              </div>\r
            }\r
\r
            @if (showStationField()) {<div class="form-group"><label>\u0627\u0644\u0645\u062D\u0637\u0629</label><select aria-label="\u0627\u0644\u0645\u062D\u0637\u0629" title="\u0627\u0644\u0645\u062D\u0637\u0629" [(ngModel)]="form().stationId"><option [value]="null">\u0627\u062E\u062A\u0631 \u0645\u062D\u0637\u0629</option>@for (st of stations(); track st.id) {<option [value]="st.id">{{ st.name }}</option>}</select></div>}\r
            @if (showProviderField()) {<div class="form-group"><label>\u0627\u0644\u062C\u0647\u0629 (\u0645\u062B\u0627\u0644: \u0628\u0646\u0643 \u0627\u0644\u0643\u0631\u064A\u0645\u064A\u060C \u062C\u0648\u0627\u0644\u064A)</label><input [(ngModel)]="form().provider" placeholder="\u0627\u0633\u0645 \u0627\u0644\u062C\u0647\u0629"></div>}\r
            @if (showAccountNumberField()) {<div class="form-group"><label>\u0631\u0642\u0645 \u0627\u0644\u062D\u0633\u0627\u0628</label><input [(ngModel)]="form().accountNumber" placeholder="\u0631\u0642\u0645 \u0627\u0644\u062D\u0633\u0627\u0628"></div>}\r
          }\r
\r
          <div class="form-group"><label>\u0627\u0644\u0631\u0645\u0632/\u0627\u0644\u0643\u0648\u062F (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label><input [(ngModel)]="form().code" placeholder="\u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B"></div>\r
          <div class="form-group"><label>\u0627\u0644\u0645\u0633\u0624\u0648\u0644</label><input [(ngModel)]="form().responsiblePerson" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644"></div>\r
          <div class="form-group"><label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label><textarea [(ngModel)]="form().notes" rows="3" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629..."></textarea></div>\r
\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="saveForm()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/accounts/accounts.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.filter-row {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.search-box {\n  flex: 1;\n  min-width: 240px;\n  padding: 10px 14px;\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n}\n.filter-select {\n  min-width: 220px;\n  padding: 10px 12px;\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--bg-card);\n  color: var(--text-primary);\n}\n.nature-chips {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.chip {\n  padding: 8px 14px;\n  border-radius: 999px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 600;\n  transition: all 0.2s;\n}\n.chip:hover {\n  background: var(--bg-hover);\n}\n.chip.active {\n  background: #3b82f6;\n  color: white;\n  border-color: #3b82f6;\n}\n.chip .material-icons-round {\n  font-size: 18px;\n}\n.tree-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.tree-toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 14px;\n  flex-wrap: wrap;\n}\n.tree-stats {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.stat-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  height: 32px;\n  padding: 0 12px;\n  border-radius: 999px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  font-size: 12px;\n  font-weight: 700;\n}\n.stat-pill.main {\n  color: #0f766e;\n  border-color: color-mix(in srgb, #14b8a6 35%, var(--border-color));\n  background: color-mix(in srgb, #14b8a6 10%, var(--bg-surface));\n}\n.stat-pill.leaf {\n  color: #1d4ed8;\n  border-color: color-mix(in srgb, #3b82f6 35%, var(--border-color));\n  background: color-mix(in srgb, #3b82f6 10%, var(--bg-surface));\n}\n.stat-pill .material-icons-round {\n  font-size: 16px;\n}\n.tree-actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.mini-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  height: 32px;\n  padding: 0 10px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.mini-btn .material-icons-round {\n  font-size: 16px;\n}\n.mini-btn:hover {\n  transform: translateY(-1px);\n  background: var(--bg-hover);\n  border-color: var(--border-strong);\n}\n.card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  padding: 16px;\n  transition: all 0.2s;\n}\n.card:hover {\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n}\n.tree-card {\n  position: relative;\n  background:\n    linear-gradient(\n      145deg,\n      color-mix(in srgb, var(--bg-card) 92%, #ffffff 8%),\n      var(--bg-card));\n  transform-style: preserve-3d;\n}\n.tree-card::before {\n  content: "";\n  position: absolute;\n  inset-inline-start: -12px;\n  top: 0;\n  bottom: 0;\n  width: 2px;\n  background: color-mix(in srgb, var(--border-color) 80%, transparent);\n  border-radius: 999px;\n}\n.tree-card::after {\n  content: "";\n  position: absolute;\n  inset-inline-start: -12px;\n  top: 26px;\n  width: 12px;\n  height: 2px;\n  background: color-mix(in srgb, var(--border-color) 80%, transparent);\n  border-radius: 999px;\n}\n.tree-card.root::before,\n.tree-card.root::after {\n  display: none;\n}\n.tree-card.main-node {\n  border-color: color-mix(in srgb, #14b8a6 45%, var(--border-color));\n  box-shadow: inset 0 0 0 1px color-mix(in srgb, #14b8a6 20%, transparent);\n}\n.head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n.title {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex: 1;\n}\n.title h3 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 700;\n}\n.title p {\n  margin: 2px 0 0;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-family: monospace;\n}\n.flags {\n  margin-top: 10px;\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.toggle-btn {\n  width: 28px;\n  height: 28px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition:\n    transform 0.25s ease,\n    box-shadow 0.25s ease,\n    background-color 0.2s ease;\n  transform-style: preserve-3d;\n}\n.toggle-btn:hover {\n  background: var(--bg-hover);\n  transform: perspective(600px) translateY(-1px) rotateX(8deg);\n  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.14);\n}\n.toggle-btn .material-icons-round {\n  font-size: 18px;\n}\n.leaf-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--text-muted) 60%, transparent);\n  margin-inline: 10px;\n}\n.children-count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 22px;\n  height: 22px;\n  margin-inline-start: 8px;\n  padding: 0 6px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 800;\n  color: #1d4ed8;\n  background: color-mix(in srgb, #3b82f6 18%, transparent);\n  border: 1px solid color-mix(in srgb, #3b82f6 40%, transparent);\n}\n.tree-card:hover {\n  transform: perspective(900px) translateY(-2px) rotateX(2.5deg);\n  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.16);\n}\n.radio-row {\n  display: flex;\n  gap: 12px;\n}\n.radio-opt {\n  flex: 1;\n  padding: 14px;\n  border: 2px solid var(--border-color);\n  border-radius: 10px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  transition: all 0.2s;\n}\n.radio-opt:has(input:checked) {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.08);\n}\n.radio-opt .material-icons-round {\n  font-size: 24px;\n  color: #3b82f6;\n}\n.radio-opt strong {\n  display: block;\n  font-size: 14px;\n}\n.radio-opt small {\n  display: block;\n  font-size: 11px;\n  color: var(--text-secondary);\n  margin-top: 2px;\n}\n.sub-nature-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 10px;\n}\n.nature-btn {\n  padding: 12px;\n  border: 2px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--bg-surface);\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  text-align: center;\n  transition: all 0.2s;\n}\n.nature-btn:hover {\n  background: var(--bg-hover);\n}\n.nature-btn.selected {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.08);\n}\n.nature-btn .material-icons-round {\n  font-size: 28px;\n  color: #3b82f6;\n}\n.nature-btn span:not(.material-icons-round):not(.badge-sys) {\n  font-size: 13px;\n  font-weight: 600;\n}\n.badge-sys {\n  padding: 2px 8px;\n  border-radius: 999px;\n  background: rgba(100, 116, 139, 0.15);\n  color: var(--text-secondary);\n  font-size: 10px;\n  font-weight: 700;\n}\n.required {\n  color: #ef4444;\n  margin-left: 2px;\n}\n/*# sourceMappingURL=accounts.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccountsComponent, { className: "AccountsComponent", filePath: "src/app/pages/accounts/accounts.ts", lineNumber: 18 });
})();
export {
  AccountsComponent
};
//# sourceMappingURL=chunk-C6CTIQAK.js.map
