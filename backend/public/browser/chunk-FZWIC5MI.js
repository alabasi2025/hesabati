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
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RequiredValidator,
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
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/salaries/salaries.ts
var _forTrack0 = ($index, $item) => $item.id;
function SalariesComponent_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r1 = ctx.$implicit;
    \u0275\u0275property("ngValue", m_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r1);
  }
}
function SalariesComponent_For_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const y_r2 = ctx.$implicit;
    \u0275\u0275property("ngValue", y_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(y_r2);
  }
}
function SalariesComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "span", 18);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function SalariesComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 2);
    \u0275\u0275text(2, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0631\u0648\u0627\u062A\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 19);
    \u0275\u0275text(6, "\u0623\u0636\u0641 \u0633\u062C\u0644\u0627\u062A \u0631\u0648\u0627\u062A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631 \u0648\u0627\u0644\u0633\u0646\u0629");
    \u0275\u0275elementEnd()();
  }
}
function SalariesComponent_Conditional_55_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 20);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 21);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 22);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td")(22, "span", 23);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "td")(25, "button", 24);
    \u0275\u0275listener("click", function SalariesComponent_Conditional_55_For_25_Template_button_click_25_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.openEdit(item_r4));
    });
    \u0275\u0275elementStart(26, "span", 2);
    \u0275\u0275text(27, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "button", 25);
    \u0275\u0275listener("click", function SalariesComponent_Conditional_55_For_25_Template_button_click_28_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.remove(item_r4));
    });
    \u0275\u0275elementStart(29, "span", 2);
    \u0275\u0275text(30, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const \u0275$index_149_r6 = ctx.$index;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_149_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.employeeName || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.month);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.year);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 14, item_r4.baseSalary, "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 17, item_r4.advance, "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 20, item_r4.deductions, "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(20, 23, item_r4.netSalary, "1.0-0"), " ", ctx_r4.getCurrencyCode(item_r4.currencyId));
    \u0275\u0275advance(3);
    \u0275\u0275classProp("paid", item_r4.isPaid)("unpaid", !item_r4.isPaid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.isPaid ? "\u0645\u062F\u0641\u0648\u0639" : "\u063A\u064A\u0631 \u0645\u062F\u0641\u0648\u0639");
  }
}
function SalariesComponent_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 16)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u0645\u0648\u0638\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0627\u0644\u0634\u0647\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0627\u0644\u0633\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0623\u0633\u0627\u0633");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u0633\u0644\u0641\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "\u0627\u0644\u0635\u0627\u0641\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22, "\u0625\u062C\u0631\u0627\u0621\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "tbody");
    \u0275\u0275repeaterCreate(24, SalariesComponent_Conditional_55_For_25_Template, 31, 26, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(24);
    \u0275\u0275repeater(ctx_r4.items());
  }
}
function SalariesComponent_Conditional_56_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const emp_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", emp_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(emp_r8.fullName);
  }
}
function SalariesComponent_Conditional_56_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r9 = ctx.$implicit;
    \u0275\u0275property("ngValue", m_r9);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r9);
  }
}
function SalariesComponent_Conditional_56_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const y_r10 = ctx.$implicit;
    \u0275\u0275property("ngValue", y_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(y_r10);
  }
}
function SalariesComponent_Conditional_56_For_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r11 = ctx.$implicit;
    \u0275\u0275property("ngValue", c_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r11.code);
  }
}
function SalariesComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275listener("click", function SalariesComponent_Conditional_56_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 27);
    \u0275\u0275listener("click", function SalariesComponent_Conditional_56_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 28)(3, "div", 29)(4, "div", 30)(5, "span", 2);
    \u0275\u0275text(6, "payments");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0627\u062A\u0628 = \u0627\u0644\u0623\u0633\u0627\u0633 - \u0627\u0644\u0633\u0644\u0641\u0629 - \u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 31);
    \u0275\u0275listener("click", function SalariesComponent_Conditional_56_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 32)(16, "div", 33)(17, "div", 34)(18, "label");
    \u0275\u0275text(19, "\u0627\u0644\u0645\u0648\u0638\u0641 ");
    \u0275\u0275elementStart(20, "span", 35);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "select", 36);
    \u0275\u0275twoWayListener("ngModelChange", function SalariesComponent_Conditional_56_Template_select_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.employeeId, $event) || (ctx_r4.form.employeeId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(23, "option", 13);
    \u0275\u0275text(24, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(25, SalariesComponent_Conditional_56_For_26_Template, 2, 2, "option", 13, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 33)(28, "div", 37)(29, "label");
    \u0275\u0275text(30, "\u0627\u0644\u0634\u0647\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "select", 12);
    \u0275\u0275twoWayListener("ngModelChange", function SalariesComponent_Conditional_56_Template_select_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.month, $event) || (ctx_r4.form.month = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(32, SalariesComponent_Conditional_56_For_33_Template, 2, 2, "option", 13, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 37)(35, "label");
    \u0275\u0275text(36, "\u0627\u0644\u0633\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 12);
    \u0275\u0275twoWayListener("ngModelChange", function SalariesComponent_Conditional_56_Template_select_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.year, $event) || (ctx_r4.form.year = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(38, SalariesComponent_Conditional_56_For_39_Template, 2, 2, "option", 13, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 37)(41, "label");
    \u0275\u0275text(42, "\u0627\u0644\u0639\u0645\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "select", 12);
    \u0275\u0275twoWayListener("ngModelChange", function SalariesComponent_Conditional_56_Template_select_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.currencyId, $event) || (ctx_r4.form.currencyId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(44, SalariesComponent_Conditional_56_For_45_Template, 2, 2, "option", 13, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "div", 33)(47, "div", 37)(48, "label");
    \u0275\u0275text(49, "\u0627\u0644\u0631\u0627\u062A\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function SalariesComponent_Conditional_56_Template_input_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.baseSalary, $event) || (ctx_r4.form.baseSalary = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 37)(52, "label");
    \u0275\u0275text(53, "\u0627\u0644\u0633\u0644\u0641\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function SalariesComponent_Conditional_56_Template_input_ngModelChange_54_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.advance, $event) || (ctx_r4.form.advance = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 37)(56, "label");
    \u0275\u0275text(57, "\u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function SalariesComponent_Conditional_56_Template_input_ngModelChange_58_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.deductions, $event) || (ctx_r4.form.deductions = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 39);
    \u0275\u0275text(60, "\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0627\u062A\u0628: ");
    \u0275\u0275elementStart(61, "strong");
    \u0275\u0275text(62);
    \u0275\u0275pipe(63, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 33)(65, "div", 37)(66, "label");
    \u0275\u0275text(67, "\u0623\u064A\u0627\u0645 \u0627\u0644\u062D\u0636\u0648\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "input", 40);
    \u0275\u0275twoWayListener("ngModelChange", function SalariesComponent_Conditional_56_Template_input_ngModelChange_68_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.attendanceDays, $event) || (ctx_r4.form.attendanceDays = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "div", 41)(70, "label")(71, "input", 42);
    \u0275\u0275twoWayListener("ngModelChange", function SalariesComponent_Conditional_56_Template_input_ngModelChange_71_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.isPaid, $event) || (ctx_r4.form.isPaid = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(72, " \u062A\u0645 \u0627\u0644\u062F\u0641\u0639");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(73, "div", 37)(74, "label");
    \u0275\u0275text(75, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "textarea", 43);
    \u0275\u0275twoWayListener("ngModelChange", function SalariesComponent_Conditional_56_Template_textarea_ngModelChange_76_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.notes, $event) || (ctx_r4.form.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "div", 44)(78, "button", 45);
    \u0275\u0275listener("click", function SalariesComponent_Conditional_56_Template_button_click_78_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.save());
    });
    \u0275\u0275text(79);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "button", 46);
    \u0275\u0275listener("click", function SalariesComponent_Conditional_56_Template_button_click_80_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showForm.set(false));
    });
    \u0275\u0275text(81, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r4.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u0633\u062C\u0644 \u0631\u0627\u062A\u0628" : "\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u0631\u0627\u062A\u0628");
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.employeeId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r4.employees());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.month);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.months);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.year);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.years);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.currencyId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.currencies());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.baseSalary);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.advance);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.deductions);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(63, 14, ctx_r4.netSalary(), "1.0-0"));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.attendanceDays);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.isPaid);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.notes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644");
  }
}
var SalariesComponent = class _SalariesComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : (
    /* istanbul ignore next */
    []
  ));
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : (
    /* istanbul ignore next */
    []
  ));
  currencies = signal([], ...ngDevMode ? [{ debugName: "currencies" }] : (
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
  filterMonth = signal(null, ...ngDevMode ? [{ debugName: "filterMonth" }] : (
    /* istanbul ignore next */
    []
  ));
  filterYear = signal(null, ...ngDevMode ? [{ debugName: "filterYear" }] : (
    /* istanbul ignore next */
    []
  ));
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years = [];
  form = {
    employeeId: null,
    month: (/* @__PURE__ */ new Date()).getMonth() + 1,
    year: (/* @__PURE__ */ new Date()).getFullYear(),
    baseSalary: 0,
    advance: 0,
    deductions: 0,
    currencyId: 1,
    isPaid: false,
    attendanceDays: null,
    notes: ""
  };
  netSalary = computed(() => {
    const b = Number(this.form.baseSalary ?? 0);
    const a = Number(this.form.advance ?? 0);
    const d = Number(this.form.deductions ?? 0);
    return b - a - d;
  }, ...ngDevMode ? [{ debugName: "netSalary" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    super.ngOnInit();
    const y = (/* @__PURE__ */ new Date()).getFullYear();
    for (let i = y; i >= y - 5; i--)
      this.years.push(i);
  }
  onBizIdChange(_bizId) {
    this.load();
    this.api.getEmployees(this.bizId).then((e) => this.employees.set(e || []));
    this.api.getCurrencies().then((c) => this.currencies.set(c || []));
  }
  async load() {
    this.loading.set(true);
    try {
      const month = this.filterMonth();
      const year = this.filterYear();
      const data = await this.api.getSalaryRecords(this.bizId, month ?? void 0, year ?? void 0);
      this.items.set(data || []);
    } catch (e) {
      console.error(e);
    }
    this.loading.set(false);
  }
  onFilterChange() {
    this.load();
  }
  openAdd() {
    this.form = {
      employeeId: null,
      month: this.filterMonth() || (/* @__PURE__ */ new Date()).getMonth() + 1,
      year: this.filterYear() || (/* @__PURE__ */ new Date()).getFullYear(),
      baseSalary: 0,
      advance: 0,
      deductions: 0,
      currencyId: 1,
      isPaid: false,
      attendanceDays: null,
      notes: ""
    };
    this.editingId.set(null);
    this.showForm.set(true);
  }
  openEdit(item) {
    this.form = {
      employeeId: item.employeeId,
      month: item.month,
      year: item.year,
      baseSalary: Number(item.baseSalary || 0),
      advance: Number(item.advance || 0),
      deductions: Number(item.deductions || 0),
      currencyId: item.currencyId || 1,
      isPaid: !!item.isPaid,
      paidDate: item.paidDate || "",
      attendanceDays: item.attendanceDays ?? null,
      notes: item.notes || ""
    };
    this.editingId.set(item.id);
    this.showForm.set(true);
  }
  async save() {
    if (!this.form.employeeId) {
      this.toast.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0648\u0638\u0641");
      return;
    }
    try {
      const payload = {
        employeeId: this.form.employeeId,
        month: Number(this.form.month),
        year: Number(this.form.year),
        baseSalary: Number(this.form.baseSalary),
        advance: Number(this.form.advance),
        deductions: Number(this.form.deductions),
        currencyId: this.form.currencyId,
        isPaid: !!this.form.isPaid,
        attendanceDays: this.form.attendanceDays ?? null,
        notes: this.form.notes || ""
      };
      const id = this.editingId();
      if (id === null) {
        await this.api.createSalaryRecord(this.bizId, payload);
        this.toast.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u0627\u0644\u0631\u0627\u062A\u0628 \u0628\u0646\u062C\u0627\u062D");
      } else {
        await this.api.updateSalaryRecord(id, payload);
        this.toast.success("\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u0631\u0627\u062A\u0628 \u0628\u0646\u062C\u0627\u062D");
      }
      this.showForm.set(false);
      await this.load();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  async remove(item) {
    const name = item.employeeName || "\u0627\u0644\u0645\u0648\u0638\u0641";
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0633\u062C\u0644 \u0631\u0627\u062A\u0628 "${name}"\u061F`, type: "danger" });
    if (confirmed) {
      try {
        await this.api.deleteSalaryRecord(item.id);
        this.toast.success("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641");
        await this.load();
      } catch (e) {
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
      }
    }
  }
  getCurrencyCode(id) {
    return this.currencies().find((c) => c.id === id)?.code || "\u0631.\u064A";
  }
  totalNet() {
    return this.items().reduce((s, i) => s + Number(i.netSalary || 0), 0);
  }
  paidCount() {
    return this.items().filter((i) => i.isPaid).length;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SalariesComponent_BaseFactory;
    return function SalariesComponent_Factory(__ngFactoryType__) {
      return (\u0275SalariesComponent_BaseFactory || (\u0275SalariesComponent_BaseFactory = \u0275\u0275getInheritedFactory(_SalariesComponent)))(__ngFactoryType__ || _SalariesComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SalariesComponent, selectors: [["app-salaries"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 57, vars: 12, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "summary-row"], [1, "summary-card", "blue"], [1, "num"], [1, "lbl"], [1, "summary-card", "green"], [1, "summary-card", "amber"], [1, "filter-row"], [1, "filter-group"], [3, "ngModelChange", "ngModel"], [3, "ngValue"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], [1, "modal-overlay"], [1, "material-icons-round", "spin"], [1, "empty-hint"], [1, "name-cell"], [1, "amount-cell"], [1, "amount-cell", "net"], [1, "status-pill"], [1, "action-btn", "edit", 3, "click"], [1, "action-btn", "delete", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "blue"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group", "full"], [1, "required"], ["required", "", 3, "ngModelChange", "ngModel"], [1, "form-group"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"], [1, "form-group", "net-row"], ["type", "number", "min", "0", "placeholder", "\u0627\u062E\u062A\u064A\u0627\u0631\u064A", 3, "ngModelChange", "ngModel"], [1, "form-group", "checkbox-group"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A...", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"]], template: function SalariesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "payments");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u0631\u0648\u0627\u062A\u0628");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function SalariesComponent_Template_button_click_6_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u0631\u0627\u062A\u0628");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "span", 2);
      \u0275\u0275text(13, "people");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div")(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 7);
      \u0275\u0275text(18, "\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 8)(20, "span", 2);
      \u0275\u0275text(21, "payments");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div")(23, "span", 6);
      \u0275\u0275text(24);
      \u0275\u0275pipe(25, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 7);
      \u0275\u0275text(27, "\u0625\u062C\u0645\u0627\u0644\u064A \u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0648\u0627\u062A\u0628");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 9)(29, "span", 2);
      \u0275\u0275text(30, "check_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div")(32, "span", 6);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "span", 7);
      \u0275\u0275text(35, "\u0645\u062F\u0641\u0648\u0639\u0629");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(36, "div", 10)(37, "div", 11)(38, "label");
      \u0275\u0275text(39, "\u0627\u0644\u0634\u0647\u0631");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "select", 12);
      \u0275\u0275listener("ngModelChange", function SalariesComponent_Template_select_ngModelChange_40_listener($event) {
        ctx.filterMonth.set($event);
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(41, "option", 13);
      \u0275\u0275text(42, "\u0627\u0644\u0643\u0644");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(43, SalariesComponent_For_44_Template, 2, 2, "option", 13, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 11)(46, "label");
      \u0275\u0275text(47, "\u0627\u0644\u0633\u0646\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "select", 12);
      \u0275\u0275listener("ngModelChange", function SalariesComponent_Template_select_ngModelChange_48_listener($event) {
        ctx.filterYear.set($event);
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(49, "option", 13);
      \u0275\u0275text(50, "\u0627\u0644\u0643\u0644");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(51, SalariesComponent_For_52_Template, 2, 2, "option", 13, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(53, SalariesComponent_Conditional_53_Template, 5, 0, "div", 14)(54, SalariesComponent_Conditional_54_Template, 7, 0, "div", 15)(55, SalariesComponent_Conditional_55_Template, 26, 0, "table", 16);
      \u0275\u0275conditionalCreate(56, SalariesComponent_Conditional_56_Template, 82, 17, "div", 17);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate(ctx.items().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 9, ctx.totalNet(), "1.0-0"));
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.paidCount());
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.filterMonth());
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.months);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngModel", ctx.filterYear());
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.years);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 53 : !ctx.items().length ? 54 : 55);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 56 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, RequiredValidator, MinValidator, NgModel, DecimalPipe], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  min-width: 160px;\n  max-width: 260px;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.blue[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.08);\n}\n.summary-card.blue[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.summary-card.green[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.08);\n}\n.summary-card.green[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.summary-card.amber[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  align-items: flex-end;\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  min-width: 100px;\n}\n.name-cell[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.amount-cell[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.amount-cell.net[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.status-pill[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n}\n.status-pill.paid[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-pill.unpaid[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.2);\n  color: #f59e0b;\n}\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.form-group.full[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.net-row[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary);\n}\n.net-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #22c55e;\n  margin-right: 6px;\n}\n.checkbox-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=salaries.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SalariesComponent, [{
    type: Component,
    args: [{ selector: "app-salaries", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">payments</span> \u0627\u0644\u0631\u0648\u0627\u062A\u0628</h2>\r
    <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u0631\u0627\u062A\u0628</button>\r
  </div>\r
\r
  <div class="summary-row">\r
    <div class="summary-card blue">\r
      <span class="material-icons-round">people</span>\r
      <div><span class="num">{{ items().length }}</span><span class="lbl">\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A</span></div>\r
    </div>\r
    <div class="summary-card green">\r
      <span class="material-icons-round">payments</span>\r
      <div><span class="num">{{ totalNet() | number:'1.0-0' }}</span><span class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A \u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0648\u0627\u062A\u0628</span></div>\r
    </div>\r
    <div class="summary-card amber">\r
      <span class="material-icons-round">check_circle</span>\r
      <div><span class="num">{{ paidCount() }}</span><span class="lbl">\u0645\u062F\u0641\u0648\u0639\u0629</span></div>\r
    </div>\r
  </div>\r
\r
  <div class="filter-row">\r
    <div class="filter-group">\r
      <label>\u0627\u0644\u0634\u0647\u0631</label>\r
      <select [ngModel]="filterMonth()" (ngModelChange)="filterMonth.set($event); onFilterChange()">\r
        <option [ngValue]="null">\u0627\u0644\u0643\u0644</option>\r
        @for (m of months; track m) { <option [ngValue]="m">{{ m }}</option> }\r
      </select>\r
    </div>\r
    <div class="filter-group">\r
      <label>\u0627\u0644\u0633\u0646\u0629</label>\r
      <select [ngModel]="filterYear()" (ngModelChange)="filterYear.set($event); onFilterChange()">\r
        <option [ngValue]="null">\u0627\u0644\u0643\u0644</option>\r
        @for (y of years; track y) { <option [ngValue]="y">{{ y }}</option> }\r
      </select>\r
    </div>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!items().length) {\r
    <div class="empty-state">\r
      <span class="material-icons-round">payments</span>\r
      <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0631\u0648\u0627\u062A\u0628</p>\r
      <p class="empty-hint">\u0623\u0636\u0641 \u0633\u062C\u0644\u0627\u062A \u0631\u0648\u0627\u062A\u0628 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u062D\u0633\u0628 \u0627\u0644\u0634\u0647\u0631 \u0648\u0627\u0644\u0633\u0646\u0629</p>\r
    </div>\r
  } @else {\r
    <table class="data-table">\r
      <thead>\r
        <tr>\r
          <th>#</th><th>\u0627\u0644\u0645\u0648\u0638\u0641</th><th>\u0627\u0644\u0634\u0647\u0631</th><th>\u0627\u0644\u0633\u0646\u0629</th><th>\u0627\u0644\u0623\u0633\u0627\u0633</th><th>\u0627\u0644\u0633\u0644\u0641\u0629</th><th>\u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A</th><th>\u0627\u0644\u0635\u0627\u0641\u064A</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
        @for (item of items(); track item.id; let i = $index) {\r
          <tr>\r
            <td>{{ i + 1 }}</td>\r
            <td class="name-cell">{{ item.employeeName || '-' }}</td>\r
            <td>{{ item.month }}</td>\r
            <td>{{ item.year }}</td>\r
            <td class="amount-cell">{{ item.baseSalary | number:'1.0-0' }}</td>\r
            <td>{{ item.advance | number:'1.0-0' }}</td>\r
            <td>{{ item.deductions | number:'1.0-0' }}</td>\r
            <td class="amount-cell net">{{ item.netSalary | number:'1.0-0' }} {{ getCurrencyCode(item.currencyId) }}</td>\r
            <td><span class="status-pill" [class.paid]="item.isPaid" [class.unpaid]="!item.isPaid">{{ item.isPaid ? '\u0645\u062F\u0641\u0648\u0639' : '\u063A\u064A\u0631 \u0645\u062F\u0641\u0648\u0639' }}</span></td>\r
            <td>\r
              <button class="action-btn edit" (click)="openEdit(item)"><span class="material-icons-round">edit</span></button>\r
              <button class="action-btn delete" (click)="remove(item)"><span class="material-icons-round">delete</span></button>\r
            </td>\r
          </tr>\r
        }\r
      </tbody>\r
    </table>\r
  }\r
\r
  @if (showForm()) {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon blue"><span class="material-icons-round">payments</span></div>\r
            <div>\r
              <h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u0633\u062C\u0644 \u0631\u0627\u062A\u0628' : '\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u0631\u0627\u062A\u0628' }}</h2>\r
              <p>\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0627\u062A\u0628 = \u0627\u0644\u0623\u0633\u0627\u0633 - \u0627\u0644\u0633\u0644\u0641\u0629 - \u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group full">\r
              <label>\u0627\u0644\u0645\u0648\u0638\u0641 <span class="required">*</span></label>\r
              <select [(ngModel)]="form.employeeId" required>\r
                <option [ngValue]="null">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 --</option>\r
                @for (emp of employees(); track emp.id) { <option [ngValue]="emp.id">{{ emp.fullName }}</option> }\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u0634\u0647\u0631</label><select [(ngModel)]="form.month">@for (m of months; track m) { <option [ngValue]="m">{{ m }}</option> }</select></div>\r
            <div class="form-group"><label>\u0627\u0644\u0633\u0646\u0629</label><select [(ngModel)]="form.year">@for (y of years; track y) { <option [ngValue]="y">{{ y }}</option> }</select></div>\r
            <div class="form-group"><label>\u0627\u0644\u0639\u0645\u0644\u0629</label><select [(ngModel)]="form.currencyId">@for (c of currencies(); track c.id) { <option [ngValue]="c.id">{{ c.code }}</option> }</select></div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u0631\u0627\u062A\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A</label><input type="number" [(ngModel)]="form.baseSalary" min="0" /></div>\r
            <div class="form-group"><label>\u0627\u0644\u0633\u0644\u0641\u0629</label><input type="number" [(ngModel)]="form.advance" min="0" /></div>\r
            <div class="form-group"><label>\u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A</label><input type="number" [(ngModel)]="form.deductions" min="0" /></div>\r
          </div>\r
          <div class="form-group net-row">\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0627\u062A\u0628: <strong>{{ netSalary() | number:'1.0-0' }}</strong></div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0623\u064A\u0627\u0645 \u0627\u0644\u062D\u0636\u0648\u0631</label><input type="number" [(ngModel)]="form.attendanceDays" min="0" placeholder="\u0627\u062E\u062A\u064A\u0627\u0631\u064A" /></div>\r
            <div class="form-group checkbox-group"><label><input type="checkbox" [(ngModel)]="form.isPaid" /> \u062A\u0645 \u0627\u0644\u062F\u0641\u0639</label></div>\r
          </div>\r
          <div class="form-group"><label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label><textarea [(ngModel)]="form.notes" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A..."></textarea></div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/salaries/salaries.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  min-width: 160px;\n  max-width: 260px;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.blue {\n  background: rgba(59, 130, 246, 0.08);\n}\n.summary-card.blue .material-icons-round {\n  color: #3b82f6;\n}\n.summary-card.green {\n  background: rgba(34, 197, 94, 0.08);\n}\n.summary-card.green .material-icons-round {\n  color: #22c55e;\n}\n.summary-card.amber {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber .material-icons-round {\n  color: #f59e0b;\n}\n.filter-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  align-items: flex-end;\n}\n.filter-group {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.filter-group label {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.filter-group select {\n  padding: 8px 12px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  min-width: 100px;\n}\n.name-cell {\n  font-weight: 700;\n}\n.amount-cell {\n  font-weight: 700;\n}\n.amount-cell.net {\n  color: #22c55e;\n}\n.status-pill {\n  padding: 4px 10px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n}\n.status-pill.paid {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-pill.unpaid {\n  background: rgba(245, 158, 11, 0.2);\n  color: #f59e0b;\n}\n.empty-hint {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.required {\n  color: #ef4444;\n}\n.form-group.full {\n  flex: 1;\n}\n.net-row {\n  font-size: 14px;\n  color: var(--text-secondary);\n}\n.net-row strong {\n  color: #22c55e;\n  margin-right: 6px;\n}\n.checkbox-group label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=salaries.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SalariesComponent, { className: "SalariesComponent", filePath: "src/app/pages/salaries/salaries.ts", lineNumber: 18 });
})();
export {
  SalariesComponent
};
//# sourceMappingURL=chunk-FZWIC5MI.js.map
