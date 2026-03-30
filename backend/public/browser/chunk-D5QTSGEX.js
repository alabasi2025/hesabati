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
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵarrowFunction,
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
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/reconciliations/reconciliations.ts
var arrowFn0 = (ctx, view) => (r) => r.status === "completed";
var arrowFn1 = (ctx, view) => (r) => r.status === "open" || r.status === "in_progress";
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.key;
function ReconciliationsComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "span", 14);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function ReconciliationsComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 2);
    \u0275\u0275text(2, "fact_check");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0637\u0627\u0628\u0642\u0627\u062A \u0628\u0639\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 15);
    \u0275\u0275text(6, "\u0623\u0646\u0634\u0626 \u0645\u0637\u0627\u0628\u0642\u0629 \u062C\u062F\u064A\u062F\u0629 \u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0623\u0631\u0635\u062F\u0629 \u0648\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd()();
  }
}
function ReconciliationsComponent_Conditional_37_For_23_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", (r_r2.periodStart || "").split("T")[0], " - ", (r_r2.periodEnd || "").split("T")[0]);
  }
}
function ReconciliationsComponent_Conditional_37_For_23_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2014 ");
  }
}
function ReconciliationsComponent_Conditional_37_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span", 17);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span", 18);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 19);
    \u0275\u0275conditionalCreate(12, ReconciliationsComponent_Conditional_37_For_23_Conditional_12_Template, 2, 2, "span", 20)(13, ReconciliationsComponent_Conditional_37_For_23_Conditional_13_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 21);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 21);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td", 21);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td")(24, "button", 22);
    \u0275\u0275listener("click", function ReconciliationsComponent_Conditional_37_For_23_Template_button_click_24_listener() {
      const r_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewDetails(r_r2));
    });
    \u0275\u0275elementStart(25, "span", 2);
    \u0275\u0275text(26, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "button", 23);
    \u0275\u0275listener("click", function ReconciliationsComponent_Conditional_37_For_23_Template_button_click_27_listener() {
      const r_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit(r_r2));
    });
    \u0275\u0275elementStart(28, "span", 2);
    \u0275\u0275text(29, "edit");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.getTypeLabel(r_r2.reconciliationType));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getStatusClass(r_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getStatusLabel(r_r2.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.withPerson || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(r_r2.periodStart || r_r2.periodEnd ? 12 : 13);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 14, r_r2.expectedAmount || 0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 16, r_r2.actualAmount || 0));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("positive", ctx_r2.getDifference(r_r2) >= 0)("negative", ctx_r2.getDifference(r_r2) < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 18, ctx_r2.getDifference(r_r2)), " ");
  }
}
function ReconciliationsComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 12)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "\u0627\u0644\u0639\u0646\u0648\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0627\u0644\u0637\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0641\u062A\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u0645\u062A\u0648\u0642\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u0641\u0639\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "\u0627\u0644\u0641\u0631\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "\u0625\u062C\u0631\u0627\u0621\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275repeaterCreate(22, ReconciliationsComponent_Conditional_37_For_23_Template, 30, 20, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r2.reconciliations());
  }
}
function ReconciliationsComponent_Conditional_38_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "span", 33);
    \u0275\u0275text(2, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.viewingItem().notes);
  }
}
function ReconciliationsComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275listener("click", function ReconciliationsComponent_Conditional_38_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewingItem.set(null));
    });
    \u0275\u0275elementStart(1, "div", 25);
    \u0275\u0275listener("click", function ReconciliationsComponent_Conditional_38_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 26)(3, "div", 27)(4, "div", 28)(5, "span", 2);
    \u0275\u0275text(6, "fact_check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9, "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 29);
    \u0275\u0275listener("click", function ReconciliationsComponent_Conditional_38_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewingItem.set(null));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 30)(16, "div", 31)(17, "div", 32)(18, "span", 33);
    \u0275\u0275text(19, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 34);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 32)(23, "span", 33);
    \u0275\u0275text(24, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 18);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 32)(28, "span", 33);
    \u0275\u0275text(29, "\u0627\u0644\u0637\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 34);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 32)(33, "span", 33);
    \u0275\u0275text(34, "\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0641\u062A\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 34);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 32)(38, "span", 33);
    \u0275\u0275text(39, "\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0641\u062A\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span", 34);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 32)(43, "span", 33);
    \u0275\u0275text(44, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062A\u0648\u0642\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span", 35);
    \u0275\u0275text(46);
    \u0275\u0275pipe(47, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 32)(49, "span", 33);
    \u0275\u0275text(50, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0641\u0639\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 35);
    \u0275\u0275text(52);
    \u0275\u0275pipe(53, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 32)(55, "span", 33);
    \u0275\u0275text(56, "\u0627\u0644\u0641\u0631\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "span", 35);
    \u0275\u0275text(58);
    \u0275\u0275pipe(59, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(60, ReconciliationsComponent_Conditional_38_Conditional_60_Template, 5, 1, "div", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "div", 37)(62, "button", 38);
    \u0275\u0275listener("click", function ReconciliationsComponent_Conditional_38_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewingItem.set(null));
    });
    \u0275\u0275text(63, "\u0625\u063A\u0644\u0627\u0642");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r2.viewingItem().title);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r2.getTypeLabel(ctx_r2.viewingItem().reconciliationType));
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r2.getStatusClass(ctx_r2.viewingItem().status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getStatusLabel(ctx_r2.viewingItem().status));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.viewingItem().withPerson || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((ctx_r2.viewingItem().periodStart || "").split("T")[0] || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((ctx_r2.viewingItem().periodEnd || "").split("T")[0] || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(47, 16, ctx_r2.viewingItem().expectedAmount || 0));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(53, 18, ctx_r2.viewingItem().actualAmount || 0));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("positive", ctx_r2.getDifference(ctx_r2.viewingItem()) >= 0)("negative", ctx_r2.getDifference(ctx_r2.viewingItem()) < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(59, 20, ctx_r2.getDifference(ctx_r2.viewingItem())));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.viewingItem().notes ? 60 : -1);
  }
}
function ReconciliationsComponent_Conditional_39_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rt_r6 = ctx.$implicit;
    \u0275\u0275property("value", rt_r6.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(rt_r6.label);
  }
}
function ReconciliationsComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275listener("click", function ReconciliationsComponent_Conditional_39_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 25);
    \u0275\u0275listener("click", function ReconciliationsComponent_Conditional_39_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 26)(3, "div", 27)(4, "div", 39)(5, "span", 2);
    \u0275\u0275text(6, "fact_check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0623\u0631\u0635\u062F\u0629 \u0648\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639 \u0627\u0644\u0623\u0637\u0631\u0627\u0641 \u0627\u0644\u0645\u0639\u0646\u064A\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 29);
    \u0275\u0275listener("click", function ReconciliationsComponent_Conditional_39_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 30)(16, "div", 40)(17, "div", 41)(18, "label");
    \u0275\u0275text(19, "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 ");
    \u0275\u0275elementStart(20, "span", 42);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function ReconciliationsComponent_Conditional_39_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.title, $event) || (ctx_r2.form.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 41)(24, "label");
    \u0275\u0275text(25, "\u0646\u0648\u0639 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "select", 44);
    \u0275\u0275twoWayListener("ngModelChange", function ReconciliationsComponent_Conditional_39_Template_select_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.reconciliationType, $event) || (ctx_r2.form.reconciliationType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(27, ReconciliationsComponent_Conditional_39_For_28_Template, 2, 2, "option", 45, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 40)(30, "div", 41)(31, "label");
    \u0275\u0275text(32, "\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0641\u062A\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function ReconciliationsComponent_Conditional_39_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.periodStart, $event) || (ctx_r2.form.periodStart = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 41)(35, "label");
    \u0275\u0275text(36, "\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0641\u062A\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function ReconciliationsComponent_Conditional_39_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.periodEnd, $event) || (ctx_r2.form.periodEnd = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 40)(39, "div", 41)(40, "label");
    \u0275\u0275text(41, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062A\u0648\u0642\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function ReconciliationsComponent_Conditional_39_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.expectedAmount, $event) || (ctx_r2.form.expectedAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 41)(44, "label");
    \u0275\u0275text(45, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0641\u0639\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function ReconciliationsComponent_Conditional_39_Template_input_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.actualAmount, $event) || (ctx_r2.form.actualAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 41)(48, "label");
    \u0275\u0275text(49, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "textarea", 48);
    \u0275\u0275twoWayListener("ngModelChange", function ReconciliationsComponent_Conditional_39_Template_textarea_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.notes, $event) || (ctx_r2.form.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(51, "div", 37)(52, "button", 49);
    \u0275\u0275listener("click", function ReconciliationsComponent_Conditional_39_Template_button_click_52_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "button", 38);
    \u0275\u0275listener("click", function ReconciliationsComponent_Conditional_39_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275text(55, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629" : "\u0625\u0646\u0634\u0627\u0621 \u0645\u0637\u0627\u0628\u0642\u0629 \u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.reconciliationType);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.reconciliationTypes);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.periodStart);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.periodEnd);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.expectedAmount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.actualAmount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.notes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629");
  }
}
var ReconciliationsComponent = class _ReconciliationsComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  reconciliations = signal([], ...ngDevMode ? [{ debugName: "reconciliations" }] : (
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
  viewingItem = signal(null, ...ngDevMode ? [{ debugName: "viewingItem" }] : (
    /* istanbul ignore next */
    []
  ));
  form = {
    title: "",
    reconciliationType: "manager",
    accountId: null,
    fundId: null,
    periodStart: "",
    periodEnd: "",
    expectedAmount: 0,
    actualAmount: 0,
    notes: ""
  };
  reconciliationTypes = [
    { key: "manager", label: "\u0645\u062F\u064A\u0631" },
    { key: "exchange", label: "\u0635\u0631\u0627\u0641" },
    { key: "accountant", label: "\u0645\u062D\u0627\u0633\u0628" },
    { key: "supplier", label: "\u0645\u0648\u0631\u062F" },
    { key: "custody", label: "\u0639\u0647\u062F\u0629" }
  ];
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getReconciliations(this.bizId);
      this.reconciliations.set(data || []);
    } catch (e) {
      console.error(e);
    }
    this.loading.set(false);
  }
  openAdd() {
    this.form = {
      title: "",
      reconciliationType: "manager",
      accountId: null,
      fundId: null,
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
      reconciliationType: r.reconciliationType || "manager",
      accountId: r.accountId,
      fundId: r.fundId,
      periodStart: r.periodStart?.split("T")[0] || "",
      periodEnd: r.periodEnd?.split("T")[0] || "",
      expectedAmount: r.expectedAmount || 0,
      actualAmount: r.actualAmount || 0,
      notes: r.notes || ""
    };
    this.editingId.set(r.id);
    this.showForm.set(true);
  }
  viewDetails(r) {
    this.viewingItem.set(r);
  }
  async save() {
    if (!this.form.title?.trim()) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629");
      return;
    }
    try {
      if (this.editingId()) {
        await this.api.updateReconciliation(this.bizId, this.editingId(), this.form);
        this.toast.success("\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0628\u0646\u062C\u0627\u062D");
      } else {
        await this.api.createReconciliation(this.bizId, this.form);
        this.toast.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0628\u0646\u062C\u0627\u062D");
      }
      this.showForm.set(false);
      await this.load();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  getDifference(r) {
    return (r.actualAmount || 0) - (r.expectedAmount || 0);
  }
  getStatusLabel(status) {
    const map = {
      open: "\u0645\u0641\u062A\u0648\u062D\u0629",
      in_progress: "\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630",
      completed: "\u0645\u0643\u062A\u0645\u0644\u0629",
      disputed: "\u0645\u062A\u0646\u0627\u0632\u0639 \u0639\u0644\u064A\u0647\u0627"
    };
    return map[status] || status;
  }
  getTypeLabel(type) {
    return this.reconciliationTypes.find((t) => t.key === type)?.label || type;
  }
  getStatusClass(status) {
    const map = {
      open: "status-open",
      in_progress: "status-progress",
      completed: "status-completed",
      disputed: "status-disputed"
    };
    return map[status] || "";
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ReconciliationsComponent_BaseFactory;
    return function ReconciliationsComponent_Factory(__ngFactoryType__) {
      return (\u0275ReconciliationsComponent_BaseFactory || (\u0275ReconciliationsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_ReconciliationsComponent)))(__ngFactoryType__ || _ReconciliationsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReconciliationsComponent, selectors: [["app-reconciliations"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 40, vars: 8, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "summary-row"], [1, "summary-card", "blue"], [1, "num"], [1, "lbl"], [1, "summary-card", "green"], [1, "summary-card", "amber"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], [1, "modal-overlay"], [1, "material-icons-round", "spin"], [1, "empty-hint"], [1, "title-cell"], [1, "type-badge"], [1, "status-badge"], [1, "period-cell"], [1, "period-range"], [1, "amount-cell"], ["title", "\u0639\u0631\u0636", 1, "action-btn", 3, "click"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "action-btn", "edit", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "green"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-label"], [1, "detail-value"], [1, "detail-value", "amount"], [1, "notes-section"], [1, "modal-footer"], [1, "btn-cancel", 3, "click"], [1, "modal-icon", "blue"], [1, "form-row"], [1, "form-group"], [1, "required"], ["placeholder", "\u0645\u062B\u0627\u0644: \u0645\u0637\u0627\u0628\u0642\u0629 \u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0645\u062D\u0637\u0629", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], [3, "value"], ["type", "date", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "0", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629...", 3, "ngModelChange", "ngModel"], [1, "btn-save", 3, "click"]], template: function ReconciliationsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "fact_check");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0627\u062A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function ReconciliationsComponent_Template_button_click_6_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0625\u0646\u0634\u0627\u0621 \u0645\u0637\u0627\u0628\u0642\u0629");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "span", 2);
      \u0275\u0275text(13, "fact_check");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div")(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 7);
      \u0275\u0275text(18, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0627\u062A");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 8)(20, "span", 2);
      \u0275\u0275text(21, "check_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div")(23, "span", 6);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "span", 7);
      \u0275\u0275text(26, "\u0645\u0643\u062A\u0645\u0644\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 9)(28, "span", 2);
      \u0275\u0275text(29, "pending");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div")(31, "span", 6);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span", 7);
      \u0275\u0275text(34, "\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(35, ReconciliationsComponent_Conditional_35_Template, 5, 0, "div", 10)(36, ReconciliationsComponent_Conditional_36_Template, 7, 0, "div", 11)(37, ReconciliationsComponent_Conditional_37_Template, 24, 0, "table", 12);
      \u0275\u0275conditionalCreate(38, ReconciliationsComponent_Conditional_38_Template, 64, 22, "div", 13);
      \u0275\u0275conditionalCreate(39, ReconciliationsComponent_Conditional_39_Template, 56, 9, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate(ctx.reconciliations().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.reconciliations().filter(\u0275\u0275arrowFunction(6, arrowFn0, ctx)).length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.reconciliations().filter(\u0275\u0275arrowFunction(7, arrowFn1, ctx)).length);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.loading() ? 35 : !ctx.reconciliations().length ? 36 : 37);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.viewingItem() ? 38 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showForm() ? 39 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  max-width: 280px;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.blue[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.08);\n}\n.summary-card.blue[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.summary-card.green[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.08);\n}\n.summary-card.green[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.summary-card.amber[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.title-cell[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.period-cell[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.period-range[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-family: monospace;\n  direction: ltr;\n  display: inline-block;\n}\n.amount-cell[_ngcontent-%COMP%] {\n  font-family: monospace;\n  direction: ltr;\n  text-align: left;\n  font-weight: 700;\n}\n.amount-cell.positive[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.amount-cell.negative[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.type-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n  background: rgba(99, 102, 241, 0.12);\n  color: #6366f1;\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 14px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.status-badge.status-open[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.15);\n  color: #3b82f6;\n}\n.status-badge.status-progress[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #f59e0b;\n}\n.status-badge.status-completed[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.status-badge.status-disputed[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.detail-value[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.detail-value.amount[_ngcontent-%COMP%] {\n  font-family: monospace;\n  direction: ltr;\n}\n.detail-value.positive[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.detail-value.negative[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.notes-section[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 16px;\n  border-radius: 12px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n}\n.notes-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-primary);\n  font-weight: 600;\n  margin-top: 6px;\n}\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n@media (max-width: 768px) {\n  .data-table[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=reconciliations.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReconciliationsComponent, [{
    type: Component,
    args: [{ selector: "app-reconciliations", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">fact_check</span> \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0627\u062A</h2>\r
    <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">add</span> \u0625\u0646\u0634\u0627\u0621 \u0645\u0637\u0627\u0628\u0642\u0629</button>\r
  </div>\r
\r
  <div class="summary-row">\r
    <div class="summary-card blue">\r
      <span class="material-icons-round">fact_check</span>\r
      <div><span class="num">{{ reconciliations().length }}</span><span class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0627\u062A</span></div>\r
    </div>\r
    <div class="summary-card green">\r
      <span class="material-icons-round">check_circle</span>\r
      <div><span class="num">{{ reconciliations().filter(r => r.status === 'completed').length }}</span><span class="lbl">\u0645\u0643\u062A\u0645\u0644\u0629</span></div>\r
    </div>\r
    <div class="summary-card amber">\r
      <span class="material-icons-round">pending</span>\r
      <div><span class="num">{{ reconciliations().filter(r => r.status === 'open' || r.status === 'in_progress').length }}</span><span class="lbl">\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630</span></div>\r
    </div>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!reconciliations().length) {\r
    <div class="empty-state">\r
      <span class="material-icons-round">fact_check</span>\r
      <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0637\u0627\u0628\u0642\u0627\u062A \u0628\u0639\u062F</p>\r
      <p class="empty-hint">\u0623\u0646\u0634\u0626 \u0645\u0637\u0627\u0628\u0642\u0629 \u062C\u062F\u064A\u062F\u0629 \u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0623\u0631\u0635\u062F\u0629 \u0648\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A</p>\r
    </div>\r
  } @else {\r
    <table class="data-table">\r
      <thead>\r
        <tr>\r
          <th>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</th>\r
          <th>\u0627\u0644\u0646\u0648\u0639</th>\r
          <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>\r
          <th>\u0627\u0644\u0637\u0631\u0641</th>\r
          <th>\u0627\u0644\u0641\u062A\u0631\u0629</th>\r
          <th>\u0627\u0644\u0645\u062A\u0648\u0642\u0639</th>\r
          <th>\u0627\u0644\u0641\u0639\u0644\u064A</th>\r
          <th>\u0627\u0644\u0641\u0631\u0642</th>\r
          <th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
        @for (r of reconciliations(); track r.id) {\r
          <tr>\r
            <td class="title-cell">{{ r.title }}</td>\r
            <td><span class="type-badge">{{ getTypeLabel(r.reconciliationType) }}</span></td>\r
            <td><span class="status-badge" [class]="getStatusClass(r.status)">{{ getStatusLabel(r.status) }}</span></td>\r
            <td>{{ r.withPerson || '\u2014' }}</td>\r
            <td class="period-cell">\r
              @if (r.periodStart || r.periodEnd) {\r
                <span class="period-range">{{ (r.periodStart || '').split('T')[0] }} - {{ (r.periodEnd || '').split('T')[0] }}</span>\r
              } @else { \u2014 }\r
            </td>\r
            <td class="amount-cell">{{ (r.expectedAmount || 0) | number }}</td>\r
            <td class="amount-cell">{{ (r.actualAmount || 0) | number }}</td>\r
            <td class="amount-cell" [class.positive]="getDifference(r) >= 0" [class.negative]="getDifference(r) < 0">\r
              {{ getDifference(r) | number }}\r
            </td>\r
            <td>\r
              <button class="action-btn" (click)="viewDetails(r)" title="\u0639\u0631\u0636"><span class="material-icons-round">visibility</span></button>\r
              <button class="action-btn edit" (click)="openEdit(r)" title="\u062A\u0639\u062F\u064A\u0644"><span class="material-icons-round">edit</span></button>\r
            </td>\r
          </tr>\r
        }\r
      </tbody>\r
    </table>\r
  }\r
\r
  <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 -->\r
  @if (viewingItem()) {\r
    <div class="modal-overlay" (click)="viewingItem.set(null)">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon green"><span class="material-icons-round">fact_check</span></div>\r
            <div>\r
              <h2>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</h2>\r
              <p>{{ viewingItem().title }}</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="viewingItem.set(null)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="detail-grid">\r
            <div class="detail-item"><span class="detail-label">\u0627\u0644\u0646\u0648\u0639</span><span class="detail-value">{{ getTypeLabel(viewingItem().reconciliationType) }}</span></div>\r
            <div class="detail-item"><span class="detail-label">\u0627\u0644\u062D\u0627\u0644\u0629</span><span class="status-badge" [class]="getStatusClass(viewingItem().status)">{{ getStatusLabel(viewingItem().status) }}</span></div>\r
            <div class="detail-item"><span class="detail-label">\u0627\u0644\u0637\u0631\u0641</span><span class="detail-value">{{ viewingItem().withPerson || '\u2014' }}</span></div>\r
            <div class="detail-item"><span class="detail-label">\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0641\u062A\u0631\u0629</span><span class="detail-value">{{ (viewingItem().periodStart || '').split('T')[0] || '\u2014' }}</span></div>\r
            <div class="detail-item"><span class="detail-label">\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0641\u062A\u0631\u0629</span><span class="detail-value">{{ (viewingItem().periodEnd || '').split('T')[0] || '\u2014' }}</span></div>\r
            <div class="detail-item"><span class="detail-label">\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062A\u0648\u0642\u0639</span><span class="detail-value amount">{{ (viewingItem().expectedAmount || 0) | number }}</span></div>\r
            <div class="detail-item"><span class="detail-label">\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0641\u0639\u0644\u064A</span><span class="detail-value amount">{{ (viewingItem().actualAmount || 0) | number }}</span></div>\r
            <div class="detail-item"><span class="detail-label">\u0627\u0644\u0641\u0631\u0642</span><span class="detail-value amount" [class.positive]="getDifference(viewingItem()) >= 0" [class.negative]="getDifference(viewingItem()) < 0">{{ getDifference(viewingItem()) | number }}</span></div>\r
          </div>\r
          @if (viewingItem().notes) {\r
            <div class="notes-section">\r
              <span class="detail-label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</span>\r
              <p>{{ viewingItem().notes }}</p>\r
            </div>\r
          }\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-cancel" (click)="viewingItem.set(null)">\u0625\u063A\u0644\u0627\u0642</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 -->\r
  @if (showForm()) {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon blue"><span class="material-icons-round">fact_check</span></div>\r
            <div>\r
              <h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629' : '\u0625\u0646\u0634\u0627\u0621 \u0645\u0637\u0627\u0628\u0642\u0629 \u062C\u062F\u064A\u062F\u0629' }}</h2>\r
              <p>\u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0623\u0631\u0635\u062F\u0629 \u0648\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639 \u0627\u0644\u0623\u0637\u0631\u0627\u0641 \u0627\u0644\u0645\u0639\u0646\u064A\u0629</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 <span class="required">*</span></label>\r
              <input [(ngModel)]="form.title" placeholder="\u0645\u062B\u0627\u0644: \u0645\u0637\u0627\u0628\u0642\u0629 \u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0645\u062D\u0637\u0629" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0646\u0648\u0639 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</label>\r
              <select [(ngModel)]="form.reconciliationType">\r
                @for (rt of reconciliationTypes; track rt.key) {\r
                  <option [value]="rt.key">{{ rt.label }}</option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0641\u062A\u0631\u0629</label>\r
              <input type="date" [(ngModel)]="form.periodStart" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0641\u062A\u0631\u0629</label>\r
              <input type="date" [(ngModel)]="form.periodEnd" />\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062A\u0648\u0642\u0639</label>\r
              <input type="number" [(ngModel)]="form.expectedAmount" placeholder="0" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0641\u0639\u0644\u064A</label>\r
              <input type="number" [(ngModel)]="form.actualAmount" placeholder="0" />\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>\r
            <textarea [(ngModel)]="form.notes" rows="3" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629..."></textarea>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/reconciliations/reconciliations.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  max-width: 280px;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.blue {\n  background: rgba(59, 130, 246, 0.08);\n}\n.summary-card.blue .material-icons-round {\n  color: #3b82f6;\n}\n.summary-card.green {\n  background: rgba(34, 197, 94, 0.08);\n}\n.summary-card.green .material-icons-round {\n  color: #22c55e;\n}\n.summary-card.amber {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber .material-icons-round {\n  color: #f59e0b;\n}\n.title-cell {\n  font-weight: 700;\n}\n.period-cell {\n  white-space: nowrap;\n}\n.period-range {\n  font-size: 12px;\n  font-family: monospace;\n  direction: ltr;\n  display: inline-block;\n}\n.amount-cell {\n  font-family: monospace;\n  direction: ltr;\n  text-align: left;\n  font-weight: 700;\n}\n.amount-cell.positive {\n  color: #22c55e;\n}\n.amount-cell.negative {\n  color: #ef4444;\n}\n.type-badge {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n  background: rgba(99, 102, 241, 0.12);\n  color: #6366f1;\n}\n.status-badge {\n  display: inline-block;\n  padding: 4px 14px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.status-badge.status-open {\n  background: rgba(59, 130, 246, 0.15);\n  color: #3b82f6;\n}\n.status-badge.status-progress {\n  background: rgba(245, 158, 11, 0.15);\n  color: #f59e0b;\n}\n.status-badge.status-completed {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.status-badge.status-disputed {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.detail-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.detail-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.detail-label {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.detail-value {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.detail-value.amount {\n  font-family: monospace;\n  direction: ltr;\n}\n.detail-value.positive {\n  color: #22c55e;\n}\n.detail-value.negative {\n  color: #ef4444;\n}\n.notes-section {\n  margin-top: 16px;\n  padding: 16px;\n  border-radius: 12px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n}\n.notes-section p {\n  font-size: 14px;\n  color: var(--text-primary);\n  font-weight: 600;\n  margin-top: 6px;\n}\n.empty-hint {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.required {\n  color: #ef4444;\n}\n@media (max-width: 768px) {\n  .data-table {\n    font-size: 12px;\n  }\n  .detail-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=reconciliations.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReconciliationsComponent, { className: "ReconciliationsComponent", filePath: "src/app/pages/reconciliations/reconciliations.ts", lineNumber: 18 });
})();
export {
  ReconciliationsComponent
};
//# sourceMappingURL=chunk-D5QTSGEX.js.map
