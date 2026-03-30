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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/settlements/settlements.ts
var _forTrack0 = ($index, $item) => $item.id;
function SettlementsComponent_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 20);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function SettlementsComponent_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 2);
    \u0275\u0275text(2, "balance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u064A\u0648\u062C\u062F \u062A\u0635\u0641\u064A\u0627\u062A");
    \u0275\u0275elementEnd()();
  }
}
function SettlementsComponent_Conditional_77_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "div", 21)(5, "div", 22)(6, "span", 2);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 23);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "td")(11, "span", 24);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 25);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 26);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td", 26);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "td")(25, "span", 27);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "td")(28, "button", 28);
    \u0275\u0275listener("click", function SettlementsComponent_Conditional_77_For_23_Template_button_click_28_listener() {
      const r_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit(r_r2));
    });
    \u0275\u0275elementStart(29, "span", 2);
    \u0275\u0275text(30, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "button", 29);
    \u0275\u0275listener("click", function SettlementsComponent_Conditional_77_For_23_Template_button_click_31_listener() {
      const r_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.remove(r_r2));
    });
    \u0275\u0275elementStart(32, "span", 2);
    \u0275\u0275text(33, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const \u0275$index_174_r4 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_174_r4 + 1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.getTypeIcon(r_r2.reconciliationType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.getTypeLabel(r_r2.reconciliationType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.withPerson || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.expectedAmount ? \u0275\u0275pipeBind2(17, 13, r_r2.expectedAmount, "1.0-0") : "-");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r2.actualAmount ? \u0275\u0275pipeBind2(20, 16, r_r2.actualAmount, "1.0-0") : "-");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("negative", +r_r2.expectedAmount - +r_r2.actualAmount !== 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r2.expectedAmount && r_r2.actualAmount ? \u0275\u0275pipeBind2(23, 19, +r_r2.expectedAmount - +r_r2.actualAmount, "1.0-0") : "-");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r2.getStatusClass(r_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getStatusLabel(r_r2.status));
  }
}
function SettlementsComponent_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 18)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u0639\u0646\u0648\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0645\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0645\u062A\u0648\u0642\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u0641\u0639\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u0641\u0631\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "\u0625\u062C\u0631\u0627\u0621\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275repeaterCreate(22, SettlementsComponent_Conditional_77_For_23_Template, 34, 22, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r2.filteredSettlements());
  }
}
function SettlementsComponent_Conditional_78_For_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    \u0275\u0275property("ngValue", s_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r6.name);
  }
}
function SettlementsComponent_Conditional_78_For_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r7 = ctx.$implicit;
    \u0275\u0275property("ngValue", a_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r7.name);
  }
}
function SettlementsComponent_Conditional_78_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("balanced", ctx_r2.form.expectedAmount === ctx_r2.form.actualAmount)("unbalanced", ctx_r2.form.expectedAmount !== ctx_r2.form.actualAmount);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.form.expectedAmount === ctx_r2.form.actualAmount ? "check_circle" : "warning");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0627\u0644\u0641\u0631\u0642: ", \u0275\u0275pipeBind2(5, 6, ctx_r2.form.expectedAmount - ctx_r2.form.actualAmount, "1.0-0"), " \u0631.\u064A");
  }
}
function SettlementsComponent_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275listener("click", function SettlementsComponent_Conditional_78_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 31);
    \u0275\u0275listener("click", function SettlementsComponent_Conditional_78_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 32)(3, "div", 33)(4, "div", 34)(5, "span", 2);
    \u0275\u0275text(6, "balance");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0623\u0631\u0635\u062F\u0629 \u0648\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 35);
    \u0275\u0275listener("click", function SettlementsComponent_Conditional_78_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 36)(16, "div", 37)(17, "div", 38)(18, "label");
    \u0275\u0275text(19, "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0635\u0641\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function SettlementsComponent_Conditional_78_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.title, $event) || (ctx_r2.form.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 38)(22, "label");
    \u0275\u0275text(23, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function SettlementsComponent_Conditional_78_Template_select_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.reconciliationType, $event) || (ctx_r2.form.reconciliationType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(25, "option", 41);
    \u0275\u0275text(26, "\u0645\u062F\u064A\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "option", 42);
    \u0275\u0275text(28, "\u0635\u0631\u0627\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 43);
    \u0275\u0275text(30, "\u0645\u062D\u0627\u0633\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 44);
    \u0275\u0275text(32, "\u0645\u0648\u0631\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 45);
    \u0275\u0275text(34, "\u0639\u0647\u062F\u0629");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(35, "div", 37)(36, "div", 38)(37, "label");
    \u0275\u0275text(38, "\u0645\u0639 (\u0627\u0644\u0634\u062E\u0635)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function SettlementsComponent_Conditional_78_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.withPerson, $event) || (ctx_r2.form.withPerson = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 38)(41, "label");
    \u0275\u0275text(42, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function SettlementsComponent_Conditional_78_Template_select_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.status, $event) || (ctx_r2.form.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(44, "option", 47);
    \u0275\u0275text(45, "\u0645\u0641\u062A\u0648\u062D\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "option", 48);
    \u0275\u0275text(47, "\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "option", 49);
    \u0275\u0275text(49, "\u0645\u0643\u062A\u0645\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "option", 50);
    \u0275\u0275text(51, "\u0645\u062A\u0646\u0627\u0632\u0639 \u0639\u0644\u064A\u0647\u0627");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(52, "div", 37)(53, "div", 38)(54, "label");
    \u0275\u0275text(55, "\u0627\u0644\u0645\u062D\u0637\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function SettlementsComponent_Conditional_78_Template_select_ngModelChange_56_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.stationId, $event) || (ctx_r2.form.stationId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(57, "option", 51);
    \u0275\u0275text(58, "\u0628\u062F\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(59, SettlementsComponent_Conditional_78_For_60_Template, 2, 2, "option", 51, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 38)(62, "label");
    \u0275\u0275text(63, "\u0627\u0644\u062D\u0633\u0627\u0628 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function SettlementsComponent_Conditional_78_Template_select_ngModelChange_64_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.accountId, $event) || (ctx_r2.form.accountId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(65, "option", 51);
    \u0275\u0275text(66, "\u0628\u062F\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(67, SettlementsComponent_Conditional_78_For_68_Template, 2, 2, "option", 51, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "div", 37)(70, "div", 38)(71, "label");
    \u0275\u0275text(72, "\u0645\u0646 \u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function SettlementsComponent_Conditional_78_Template_input_ngModelChange_73_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.periodStart, $event) || (ctx_r2.form.periodStart = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(74, "div", 38)(75, "label");
    \u0275\u0275text(76, "\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function SettlementsComponent_Conditional_78_Template_input_ngModelChange_77_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.periodEnd, $event) || (ctx_r2.form.periodEnd = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(78, "div", 37)(79, "div", 38)(80, "label");
    \u0275\u0275text(81, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062A\u0648\u0642\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function SettlementsComponent_Conditional_78_Template_input_ngModelChange_82_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.expectedAmount, $event) || (ctx_r2.form.expectedAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "div", 38)(84, "label");
    \u0275\u0275text(85, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0641\u0639\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function SettlementsComponent_Conditional_78_Template_input_ngModelChange_86_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.actualAmount, $event) || (ctx_r2.form.actualAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(87, SettlementsComponent_Conditional_78_Conditional_87_Template, 6, 9, "div", 54);
    \u0275\u0275elementStart(88, "div", 38)(89, "label");
    \u0275\u0275text(90, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "textarea", 55);
    \u0275\u0275twoWayListener("ngModelChange", function SettlementsComponent_Conditional_78_Template_textarea_ngModelChange_91_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.notes, $event) || (ctx_r2.form.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(92, "div", 56)(93, "button", 57);
    \u0275\u0275listener("click", function SettlementsComponent_Conditional_78_Template_button_click_93_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275text(94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "button", 58);
    \u0275\u0275listener("click", function SettlementsComponent_Conditional_78_Template_button_click_95_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275text(96, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0641\u064A\u0629" : "\u062A\u0635\u0641\u064A\u0629 \u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.reconciliationType);
    \u0275\u0275advance(15);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.withPerson);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.status);
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.stationId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.stations());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.accountId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.accounts());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.periodStart);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.periodEnd);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.expectedAmount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.actualAmount);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.form.expectedAmount && ctx_r2.form.actualAmount ? 87 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.notes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0635\u0641\u064A\u0629");
  }
}
var SettlementsComponent = class _SettlementsComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  settlements = signal([], ...ngDevMode ? [{ debugName: "settlements" }] : (
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
  stations = signal([], ...ngDevMode ? [{ debugName: "stations" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
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
  filterType = signal("all", ...ngDevMode ? [{ debugName: "filterType" }] : (
    /* istanbul ignore next */
    []
  ));
  filterStatus = signal("all", ...ngDevMode ? [{ debugName: "filterStatus" }] : (
    /* istanbul ignore next */
    []
  ));
  form = {
    title: "",
    reconciliationType: "manager",
    status: "open",
    withPerson: "",
    accountId: null,
    fundId: null,
    stationId: null,
    periodStart: "",
    periodEnd: "",
    expectedAmount: 0,
    actualAmount: 0,
    notes: ""
  };
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const [sett, accs, fds, sts] = await Promise.all([
        this.api.getSettlements(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
        this.api.getStations(this.bizId)
      ]);
      this.settlements.set(sett);
      this.accounts.set(accs);
      this.funds.set(fds);
      this.stations.set(sts);
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0635\u0641\u064A\u0627\u062A");
    }
    this.loading.set(false);
  }
  filteredSettlements() {
    let list = this.settlements();
    const t = this.filterType();
    const s = this.filterStatus();
    if (t !== "all")
      list = list.filter((r) => r.reconciliationType === t);
    if (s !== "all")
      list = list.filter((r) => r.status === s);
    return list;
  }
  totalExpected() {
    return this.filteredSettlements().reduce((s, r) => s + Number(r.expectedAmount || 0), 0);
  }
  totalActual() {
    return this.filteredSettlements().reduce((s, r) => s + Number(r.actualAmount || 0), 0);
  }
  totalDifference() {
    return this.totalExpected() - this.totalActual();
  }
  openAdd() {
    this.form = {
      title: "",
      reconciliationType: "manager",
      status: "open",
      withPerson: "",
      accountId: null,
      fundId: null,
      stationId: null,
      periodStart: "",
      periodEnd: "",
      expectedAmount: 0,
      actualAmount: 0,
      notes: ""
    };
    this.editingId.set(null);
    this.showForm.set(true);
  }
  openEdit(r) {
    this.form = {
      title: r.title,
      reconciliationType: r.reconciliationType,
      status: r.status,
      withPerson: r.withPerson || "",
      accountId: r.accountId,
      fundId: r.fundId,
      stationId: r.stationId,
      periodStart: r.periodStart || "",
      periodEnd: r.periodEnd || "",
      expectedAmount: Number(r.expectedAmount || 0),
      actualAmount: Number(r.actualAmount || 0),
      notes: r.notes || ""
    };
    this.editingId.set(r.id);
    this.showForm.set(true);
  }
  async save() {
    try {
      const data = __spreadProps(__spreadValues({}, this.form), {
        expectedAmount: String(this.form.expectedAmount),
        actualAmount: String(this.form.actualAmount)
      });
      if (this.editingId()) {
        await this.api.updateSettlement(this.editingId(), data);
      } else {
        await this.api.createSettlement(this.bizId, data);
      }
      this.showForm.set(false);
      this.toast.success(this.editingId() ? "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0628\u0646\u062C\u0627\u062D" : "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0628\u0646\u062C\u0627\u062D");
      await this.load();
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0641\u064A\u0629");
    }
  }
  async remove(r) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 "${r.title}"\u061F`, type: "danger" });
    if (confirmed) {
      try {
        await this.api.deleteSettlement(r.id);
        this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0628\u0646\u062C\u0627\u062D");
        await this.load();
      } catch (e) {
        console.error(e);
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641");
      }
    }
  }
  getTypeLabel(t) {
    const map = { manager: "\u0645\u062F\u064A\u0631", exchange: "\u0635\u0631\u0627\u0641", accountant: "\u0645\u062D\u0627\u0633\u0628", supplier: "\u0645\u0648\u0631\u062F", custody: "\u0639\u0647\u062F\u0629" };
    return map[t] || t;
  }
  getTypeIcon(t) {
    const map = { manager: "manage_accounts", exchange: "currency_exchange", accountant: "calculate", supplier: "local_shipping", custody: "lock" };
    return map[t] || "receipt_long";
  }
  getStatusLabel(s) {
    const map = { open: "\u0645\u0641\u062A\u0648\u062D\u0629", in_progress: "\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630", completed: "\u0645\u0643\u062A\u0645\u0644\u0629", disputed: "\u0645\u062A\u0646\u0627\u0632\u0639 \u0639\u0644\u064A\u0647\u0627" };
    return map[s] || s;
  }
  getStatusClass(s) {
    const map = { open: "open", in_progress: "progress", completed: "completed", disputed: "disputed" };
    return map[s] || "";
  }
  getAccountName(id) {
    if (!id)
      return "-";
    const a = this.accounts().find((a2) => a2.id === id);
    return a ? a.name : "-";
  }
  getStationName(id) {
    if (!id)
      return "-";
    const s = this.stations().find((s2) => s2.id === id);
    return s ? s.name : "-";
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SettlementsComponent_BaseFactory;
    return function SettlementsComponent_Factory(__ngFactoryType__) {
      return (\u0275SettlementsComponent_BaseFactory || (\u0275SettlementsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_SettlementsComponent)))(__ngFactoryType__ || _SettlementsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettlementsComponent, selectors: [["app-settlements"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 79, vars: 39, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "summary-row"], [1, "summary-card", "amber"], [1, "num"], [1, "lbl"], [1, "summary-card", "blue"], [1, "summary-card", "green"], [1, "summary-card"], [1, "filters-row"], [1, "filter-group"], [1, "filter-label"], [1, "filter-tabs"], [1, "filter-tab", 3, "click"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], [1, "modal-overlay"], [1, "material-icons-round", "spin"], [1, "title-cell"], [1, "type-icon"], [1, "title-text"], [1, "type-badge"], [1, "amount-cell", "positive"], [1, "amount-cell"], [1, "status-pill"], [1, "action-btn", "edit", 3, "click"], [1, "action-btn", "delete", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", "wide", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "purple"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], ["placeholder", "\u0645\u062B\u0627\u0644: \u062A\u0635\u0641\u064A\u0629 \u0645\u062F\u064A\u0631 \u0645\u062D\u0637\u0629 \u0627\u0644\u062F\u0647\u0645\u064A\u0629", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], ["value", "manager"], ["value", "exchange"], ["value", "accountant"], ["value", "supplier"], ["value", "custody"], ["placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635", 3, "ngModelChange", "ngModel"], ["value", "open"], ["value", "in_progress"], ["value", "completed"], ["value", "disputed"], [3, "ngValue"], ["type", "date", 3, "ngModelChange", "ngModel"], ["type", "number", 3, "ngModelChange", "ngModel"], [1, "diff-display", 3, "balanced", "unbalanced"], ["rows", "2", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A...", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"], [1, "diff-display"]], template: function SettlementsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "balance");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u062A\u0635\u0641\u064A\u0627\u062A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function SettlementsComponent_Template_button_click_6_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u062A\u0635\u0641\u064A\u0629 \u062C\u062F\u064A\u062F\u0629");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "span", 2);
      \u0275\u0275text(13, "balance");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div")(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 7);
      \u0275\u0275text(18, "\u062A\u0635\u0641\u064A\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 8)(20, "span", 2);
      \u0275\u0275text(21, "arrow_upward");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div")(23, "span", 6);
      \u0275\u0275text(24);
      \u0275\u0275pipe(25, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 7);
      \u0275\u0275text(27, "\u0627\u0644\u0645\u062A\u0648\u0642\u0639 (\u0631.\u064A)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 9)(29, "span", 2);
      \u0275\u0275text(30, "arrow_downward");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div")(32, "span", 6);
      \u0275\u0275text(33);
      \u0275\u0275pipe(34, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "span", 7);
      \u0275\u0275text(36, "\u0627\u0644\u0641\u0639\u0644\u064A (\u0631.\u064A)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "div", 10)(38, "span", 2);
      \u0275\u0275text(39, "compare_arrows");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div")(41, "span", 6);
      \u0275\u0275text(42);
      \u0275\u0275pipe(43, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "span", 7);
      \u0275\u0275text(45, "\u0627\u0644\u0641\u0631\u0642");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(46, "div", 11)(47, "div", 12)(48, "span", 13);
      \u0275\u0275text(49, "\u0627\u0644\u0646\u0648\u0639:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 14)(51, "button", 15);
      \u0275\u0275listener("click", function SettlementsComponent_Template_button_click_51_listener() {
        return ctx.filterType.set("all");
      });
      \u0275\u0275text(52, "\u0627\u0644\u0643\u0644");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "button", 15);
      \u0275\u0275listener("click", function SettlementsComponent_Template_button_click_53_listener() {
        return ctx.filterType.set("manager");
      });
      \u0275\u0275text(54, "\u0645\u062F\u064A\u0631");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "button", 15);
      \u0275\u0275listener("click", function SettlementsComponent_Template_button_click_55_listener() {
        return ctx.filterType.set("exchange");
      });
      \u0275\u0275text(56, "\u0635\u0631\u0627\u0641");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "button", 15);
      \u0275\u0275listener("click", function SettlementsComponent_Template_button_click_57_listener() {
        return ctx.filterType.set("accountant");
      });
      \u0275\u0275text(58, "\u0645\u062D\u0627\u0633\u0628");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "button", 15);
      \u0275\u0275listener("click", function SettlementsComponent_Template_button_click_59_listener() {
        return ctx.filterType.set("supplier");
      });
      \u0275\u0275text(60, "\u0645\u0648\u0631\u062F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "button", 15);
      \u0275\u0275listener("click", function SettlementsComponent_Template_button_click_61_listener() {
        return ctx.filterType.set("custody");
      });
      \u0275\u0275text(62, "\u0639\u0647\u062F\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(63, "div", 12)(64, "span", 13);
      \u0275\u0275text(65, "\u0627\u0644\u062D\u0627\u0644\u0629:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div", 14)(67, "button", 15);
      \u0275\u0275listener("click", function SettlementsComponent_Template_button_click_67_listener() {
        return ctx.filterStatus.set("all");
      });
      \u0275\u0275text(68, "\u0627\u0644\u0643\u0644");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "button", 15);
      \u0275\u0275listener("click", function SettlementsComponent_Template_button_click_69_listener() {
        return ctx.filterStatus.set("open");
      });
      \u0275\u0275text(70, "\u0645\u0641\u062A\u0648\u062D\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "button", 15);
      \u0275\u0275listener("click", function SettlementsComponent_Template_button_click_71_listener() {
        return ctx.filterStatus.set("in_progress");
      });
      \u0275\u0275text(72, "\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "button", 15);
      \u0275\u0275listener("click", function SettlementsComponent_Template_button_click_73_listener() {
        return ctx.filterStatus.set("completed");
      });
      \u0275\u0275text(74, "\u0645\u0643\u062A\u0645\u0644\u0629");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(75, SettlementsComponent_Conditional_75_Template, 5, 0, "div", 16)(76, SettlementsComponent_Conditional_76_Template, 5, 0, "div", 17)(77, SettlementsComponent_Conditional_77_Template, 24, 0, "table", 18);
      \u0275\u0275conditionalCreate(78, SettlementsComponent_Conditional_78_Template, 97, 16, "div", 19);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate(ctx.filteredSettlements().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 30, ctx.totalExpected(), "1.0-0"));
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(34, 33, ctx.totalActual(), "1.0-0"));
      \u0275\u0275advance(4);
      \u0275\u0275classProp("red", ctx.totalDifference() !== 0)("green", ctx.totalDifference() === 0);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(43, 36, ctx.totalDifference(), "1.0-0"));
      \u0275\u0275advance(9);
      \u0275\u0275classProp("active", ctx.filterType() === "all");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterType() === "manager");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterType() === "exchange");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterType() === "accountant");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterType() === "supplier");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterType() === "custody");
      \u0275\u0275advance(6);
      \u0275\u0275classProp("active", ctx.filterStatus() === "all");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterStatus() === "open");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterStatus() === "in_progress");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterStatus() === "completed");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 75 : !ctx.filteredSettlements().length ? 76 : 77);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 78 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.amber[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.summary-card.blue[_ngcontent-%COMP%] {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-1-color);\n}\n.summary-card.green[_ngcontent-%COMP%] {\n  background: var(--stat-2-bg);\n}\n.summary-card.green[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-2-color);\n}\n.summary-card.red[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.08);\n}\n.summary-card.red[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.filters-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.filter-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  min-width: 50px;\n}\n.filter-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.filter-tab[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.filter-tab.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.title-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.type-icon[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  background: rgba(168, 85, 247, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.type-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #a855f7;\n}\n.title-text[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.type-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n  background: rgba(168, 85, 247, 0.12);\n  color: #a855f7;\n}\n.amount-cell[_ngcontent-%COMP%] {\n  font-weight: 700;\n  direction: ltr;\n  text-align: right;\n}\n.amount-cell.positive[_ngcontent-%COMP%] {\n  color: var(--accent-green);\n}\n.amount-cell.negative[_ngcontent-%COMP%] {\n  color: var(--accent-red);\n}\n.status-pill[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n  white-space: nowrap;\n}\n.status-pill.open[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.2);\n  color: #f59e0b;\n}\n.status-pill.progress[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.2);\n  color: #3b82f6;\n}\n.status-pill.completed[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-pill.disputed[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2);\n  color: #ef4444;\n}\n.diff-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 10px;\n  font-weight: 700;\n  font-size: 14px;\n  margin-bottom: 16px;\n}\n.diff-display[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.diff-display.balanced[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  color: #22c55e;\n}\n.diff-display.unbalanced[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-card.wide[_ngcontent-%COMP%] {\n  max-width: 720px;\n}\n@media (max-width: 640px) {\n  .summary-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=settlements.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettlementsComponent, [{
    type: Component,
    args: [{ selector: "app-settlements", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">balance</span> \u0627\u0644\u062A\u0635\u0641\u064A\u0627\u062A</h2>\r
    <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">add_circle</span> \u062A\u0635\u0641\u064A\u0629 \u062C\u062F\u064A\u062F\u0629</button>\r
  </div>\r
\r
  <div class="summary-row">\r
    <div class="summary-card amber"><span class="material-icons-round">balance</span><div><span class="num">{{ filteredSettlements().length }}</span><span class="lbl">\u062A\u0635\u0641\u064A\u0629</span></div></div>\r
    <div class="summary-card blue"><span class="material-icons-round">arrow_upward</span><div><span class="num">{{ totalExpected() | number:'1.0-0' }}</span><span class="lbl">\u0627\u0644\u0645\u062A\u0648\u0642\u0639 (\u0631.\u064A)</span></div></div>\r
    <div class="summary-card green"><span class="material-icons-round">arrow_downward</span><div><span class="num">{{ totalActual() | number:'1.0-0' }}</span><span class="lbl">\u0627\u0644\u0641\u0639\u0644\u064A (\u0631.\u064A)</span></div></div>\r
    <div class="summary-card" [class.red]="totalDifference() !== 0" [class.green]="totalDifference() === 0"><span class="material-icons-round">compare_arrows</span><div><span class="num">{{ totalDifference() | number:'1.0-0' }}</span><span class="lbl">\u0627\u0644\u0641\u0631\u0642</span></div></div>\r
  </div>\r
\r
  <div class="filters-row">\r
    <div class="filter-group">\r
      <span class="filter-label">\u0627\u0644\u0646\u0648\u0639:</span>\r
      <div class="filter-tabs">\r
        <button class="filter-tab" [class.active]="filterType() === 'all'" (click)="filterType.set('all')">\u0627\u0644\u0643\u0644</button>\r
        <button class="filter-tab" [class.active]="filterType() === 'manager'" (click)="filterType.set('manager')">\u0645\u062F\u064A\u0631</button>\r
        <button class="filter-tab" [class.active]="filterType() === 'exchange'" (click)="filterType.set('exchange')">\u0635\u0631\u0627\u0641</button>\r
        <button class="filter-tab" [class.active]="filterType() === 'accountant'" (click)="filterType.set('accountant')">\u0645\u062D\u0627\u0633\u0628</button>\r
        <button class="filter-tab" [class.active]="filterType() === 'supplier'" (click)="filterType.set('supplier')">\u0645\u0648\u0631\u062F</button>\r
        <button class="filter-tab" [class.active]="filterType() === 'custody'" (click)="filterType.set('custody')">\u0639\u0647\u062F\u0629</button>\r
      </div>\r
    </div>\r
    <div class="filter-group">\r
      <span class="filter-label">\u0627\u0644\u062D\u0627\u0644\u0629:</span>\r
      <div class="filter-tabs">\r
        <button class="filter-tab" [class.active]="filterStatus() === 'all'" (click)="filterStatus.set('all')">\u0627\u0644\u0643\u0644</button>\r
        <button class="filter-tab" [class.active]="filterStatus() === 'open'" (click)="filterStatus.set('open')">\u0645\u0641\u062A\u0648\u062D\u0629</button>\r
        <button class="filter-tab" [class.active]="filterStatus() === 'in_progress'" (click)="filterStatus.set('in_progress')">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</button>\r
        <button class="filter-tab" [class.active]="filterStatus() === 'completed'" (click)="filterStatus.set('completed')">\u0645\u0643\u062A\u0645\u0644\u0629</button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!filteredSettlements().length) {\r
    <div class="empty-state"><span class="material-icons-round">balance</span><p>\u0644\u0627 \u064A\u0648\u062C\u062F \u062A\u0635\u0641\u064A\u0627\u062A</p></div>\r
  } @else {\r
    <table class="data-table">\r
      <thead><tr><th>#</th><th>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0645\u0639</th><th>\u0627\u0644\u0645\u062A\u0648\u0642\u0639</th><th>\u0627\u0644\u0641\u0639\u0644\u064A</th><th>\u0627\u0644\u0641\u0631\u0642</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th></tr></thead>\r
      <tbody>\r
        @for (r of filteredSettlements(); track r.id; let i = $index) {\r
          <tr>\r
            <td>{{ i + 1 }}</td>\r
            <td>\r
              <div class="title-cell">\r
                <div class="type-icon"><span class="material-icons-round">{{ getTypeIcon(r.reconciliationType) }}</span></div>\r
                <span class="title-text">{{ r.title }}</span>\r
              </div>\r
            </td>\r
            <td><span class="type-badge">{{ getTypeLabel(r.reconciliationType) }}</span></td>\r
            <td>{{ r.withPerson || '-' }}</td>\r
            <td class="amount-cell positive">{{ r.expectedAmount ? (r.expectedAmount | number:'1.0-0') : '-' }}</td>\r
            <td class="amount-cell">{{ r.actualAmount ? (r.actualAmount | number:'1.0-0') : '-' }}</td>\r
            <td class="amount-cell" [class.negative]="(+r.expectedAmount - +r.actualAmount) !== 0">{{ r.expectedAmount && r.actualAmount ? ((+r.expectedAmount - +r.actualAmount) | number:'1.0-0') : '-' }}</td>\r
            <td><span class="status-pill" [class]="getStatusClass(r.status)">{{ getStatusLabel(r.status) }}</span></td>\r
            <td>\r
              <button class="action-btn edit" (click)="openEdit(r)"><span class="material-icons-round">edit</span></button>\r
              <button class="action-btn delete" (click)="remove(r)"><span class="material-icons-round">delete</span></button>\r
            </td>\r
          </tr>\r
        }\r
      </tbody>\r
    </table>\r
  }\r
\r
  @if (showForm()) {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-card wide" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row"><div class="modal-icon purple"><span class="material-icons-round">balance</span></div><div><h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0641\u064A\u0629' : '\u062A\u0635\u0641\u064A\u0629 \u062C\u062F\u064A\u062F\u0629' }}</h2><p>\u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0623\u0631\u0635\u062F\u0629 \u0648\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A</p></div></div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0635\u0641\u064A\u0629</label><input [(ngModel)]="form.title" placeholder="\u0645\u062B\u0627\u0644: \u062A\u0635\u0641\u064A\u0629 \u0645\u062F\u064A\u0631 \u0645\u062D\u0637\u0629 \u0627\u0644\u062F\u0647\u0645\u064A\u0629" /></div>\r
            <div class="form-group"><label>\u0627\u0644\u0646\u0648\u0639</label>\r
              <select [(ngModel)]="form.reconciliationType">\r
                <option value="manager">\u0645\u062F\u064A\u0631</option><option value="exchange">\u0635\u0631\u0627\u0641</option>\r
                <option value="accountant">\u0645\u062D\u0627\u0633\u0628</option><option value="supplier">\u0645\u0648\u0631\u062F</option>\r
                <option value="custody">\u0639\u0647\u062F\u0629</option>\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0645\u0639 (\u0627\u0644\u0634\u062E\u0635)</label><input [(ngModel)]="form.withPerson" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635" /></div>\r
            <div class="form-group"><label>\u0627\u0644\u062D\u0627\u0644\u0629</label>\r
              <select [(ngModel)]="form.status">\r
                <option value="open">\u0645\u0641\u062A\u0648\u062D\u0629</option><option value="in_progress">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</option>\r
                <option value="completed">\u0645\u0643\u062A\u0645\u0644\u0629</option><option value="disputed">\u0645\u062A\u0646\u0627\u0632\u0639 \u0639\u0644\u064A\u0647\u0627</option>\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u0645\u062D\u0637\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>\r
              <select [(ngModel)]="form.stationId"><option [ngValue]="null">\u0628\u062F\u0648\u0646</option>\r
                @for (s of stations(); track s.id) { <option [ngValue]="s.id">{{ s.name }}</option> }\r
              </select>\r
            </div>\r
            <div class="form-group"><label>\u0627\u0644\u062D\u0633\u0627\u0628 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>\r
              <select [(ngModel)]="form.accountId"><option [ngValue]="null">\u0628\u062F\u0648\u0646</option>\r
                @for (a of accounts(); track a.id) { <option [ngValue]="a.id">{{ a.name }}</option> }\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label><input type="date" [(ngModel)]="form.periodStart" /></div>\r
            <div class="form-group"><label>\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label><input type="date" [(ngModel)]="form.periodEnd" /></div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062A\u0648\u0642\u0639</label><input type="number" [(ngModel)]="form.expectedAmount" /></div>\r
            <div class="form-group"><label>\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0641\u0639\u0644\u064A</label><input type="number" [(ngModel)]="form.actualAmount" /></div>\r
          </div>\r
          @if (form.expectedAmount && form.actualAmount) {\r
            <div class="diff-display" [class.balanced]="form.expectedAmount === form.actualAmount" [class.unbalanced]="form.expectedAmount !== form.actualAmount">\r
              <span class="material-icons-round">{{ form.expectedAmount === form.actualAmount ? 'check_circle' : 'warning' }}</span>\r
              <span>\u0627\u0644\u0641\u0631\u0642: {{ (form.expectedAmount - form.actualAmount) | number:'1.0-0' }} \u0631.\u064A</span>\r
            </div>\r
          }\r
          <div class="form-group"><label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label><textarea [(ngModel)]="form.notes" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A..."></textarea></div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0635\u0641\u064A\u0629' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/settlements/settlements.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.amber {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber .material-icons-round {\n  color: #f59e0b;\n}\n.summary-card.blue {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue .material-icons-round {\n  color: var(--stat-1-color);\n}\n.summary-card.green {\n  background: var(--stat-2-bg);\n}\n.summary-card.green .material-icons-round {\n  color: var(--stat-2-color);\n}\n.summary-card.red {\n  background: rgba(239, 68, 68, 0.08);\n}\n.summary-card.red .material-icons-round {\n  color: #ef4444;\n}\n.filters-row {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.filter-group {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.filter-label {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  min-width: 50px;\n}\n.filter-tabs {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.filter-tab {\n  padding: 6px 14px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab:hover {\n  background: var(--bg-card-hover);\n}\n.filter-tab.active {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.title-cell {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.type-icon {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  background: rgba(168, 85, 247, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.type-icon .material-icons-round {\n  font-size: 18px;\n  color: #a855f7;\n}\n.title-text {\n  font-weight: 700;\n}\n.type-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n  background: rgba(168, 85, 247, 0.12);\n  color: #a855f7;\n}\n.amount-cell {\n  font-weight: 700;\n  direction: ltr;\n  text-align: right;\n}\n.amount-cell.positive {\n  color: var(--accent-green);\n}\n.amount-cell.negative {\n  color: var(--accent-red);\n}\n.status-pill {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n  white-space: nowrap;\n}\n.status-pill.open {\n  background: rgba(245, 158, 11, 0.2);\n  color: #f59e0b;\n}\n.status-pill.progress {\n  background: rgba(59, 130, 246, 0.2);\n  color: #3b82f6;\n}\n.status-pill.completed {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-pill.disputed {\n  background: rgba(239, 68, 68, 0.2);\n  color: #ef4444;\n}\n.diff-display {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 10px;\n  font-weight: 700;\n  font-size: 14px;\n  margin-bottom: 16px;\n}\n.diff-display .material-icons-round {\n  font-size: 20px;\n}\n.diff-display.balanced {\n  background: rgba(34, 197, 94, 0.1);\n  color: #22c55e;\n}\n.diff-display.unbalanced {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-card.wide {\n  max-width: 720px;\n}\n@media (max-width: 640px) {\n  .summary-row {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=settlements.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettlementsComponent, { className: "SettlementsComponent", filePath: "src/app/pages/settlements/settlements.ts", lineNumber: 19 });
})();
export {
  SettlementsComponent
};
//# sourceMappingURL=chunk-MKKPBRR4.js.map
