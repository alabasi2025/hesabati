import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
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
  NgForOf,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
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
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/expense-budget/expense-budget.ts
var _forTrack0 = ($index, $item) => $item.id;
function ExpenseBudgetComponent_For_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
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
function ExpenseBudgetComponent_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
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
function ExpenseBudgetComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 17);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function ExpenseBudgetComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "span", 2);
    \u0275\u0275text(2, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0646\u0648\u062F \u0645\u064A\u0632\u0627\u0646\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 18);
    \u0275\u0275text(6, "\u0623\u0636\u0641 \u0628\u0646\u0648\u062F\u0627\u064B \u0644\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0627\u0644\u0645\u062A\u0648\u0642\u0639\u0629 (\u062B\u0627\u0628\u062A\u0629\u060C \u0645\u062A\u063A\u064A\u0631\u0629\u060C \u0633\u0646\u0648\u064A\u0629)");
    \u0275\u0275elementEnd()();
  }
}
function ExpenseBudgetComponent_Conditional_47_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 20);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td")(11, "span", 21);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td")(18, "button", 22);
    \u0275\u0275listener("click", function ExpenseBudgetComponent_Conditional_47_For_21_Template_button_click_18_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.openEdit(item_r4));
    });
    \u0275\u0275elementStart(19, "span", 2);
    \u0275\u0275text(20, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "button", 23);
    \u0275\u0275listener("click", function ExpenseBudgetComponent_Conditional_47_For_21_Template_button_click_21_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.remove(item_r4));
    });
    \u0275\u0275elementStart(22, "span", 2);
    \u0275\u0275text(23, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const \u0275$index_130_r6 = ctx.$index;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_130_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r4.getStationName(item_r4.stationId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(9, 8, item_r4.amount, "1.0-0"), " ", ctx_r4.getCurrencyCode(item_r4.currencyId));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r4.getExpenseTypeLabel(item_r4.expenseType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.month ?? "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.year ?? "-");
  }
}
function ExpenseBudgetComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 15)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u0627\u0633\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0627\u0644\u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u0634\u0647\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u0633\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "\u0625\u062C\u0631\u0627\u0621\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275repeaterCreate(20, ExpenseBudgetComponent_Conditional_47_For_21_Template, 24, 11, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(20);
    \u0275\u0275repeater(ctx_r4.items());
  }
}
function ExpenseBudgetComponent_Conditional_48_option_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", c_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", c_r8.code, " - ", c_r8.name);
  }
}
function ExpenseBudgetComponent_Conditional_48_option_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    \u0275\u0275property("ngValue", s_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r9.name);
  }
}
function ExpenseBudgetComponent_Conditional_48_option_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r10 = ctx.$implicit;
    \u0275\u0275property("ngValue", m_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r10);
  }
}
function ExpenseBudgetComponent_Conditional_48_option_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const y_r11 = ctx.$implicit;
    \u0275\u0275property("ngValue", y_r11);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(y_r11);
  }
}
function ExpenseBudgetComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275listener("click", function ExpenseBudgetComponent_Conditional_48_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 25);
    \u0275\u0275listener("click", function ExpenseBudgetComponent_Conditional_48_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 26)(3, "div", 27)(4, "div", 28)(5, "span", 2);
    \u0275\u0275text(6, "account_balance_wallet");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u062A\u062E\u0637\u064A\u0637 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A (\u062B\u0627\u0628\u062A\u060C \u0645\u062A\u063A\u064A\u0631\u060C \u0633\u0646\u0648\u064A)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 29);
    \u0275\u0275listener("click", function ExpenseBudgetComponent_Conditional_48_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 30)(16, "div", 31)(17, "div", 32)(18, "label");
    \u0275\u0275text(19, "\u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F ");
    \u0275\u0275elementStart(20, "span", 33);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function ExpenseBudgetComponent_Conditional_48_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.name, $event) || (ctx_r4.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 32)(24, "label");
    \u0275\u0275text(25, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function ExpenseBudgetComponent_Conditional_48_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.amount, $event) || (ctx_r4.form.amount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 31)(28, "div", 32)(29, "label");
    \u0275\u0275text(30, "\u0627\u0644\u0639\u0645\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "select", 11);
    \u0275\u0275twoWayListener("ngModelChange", function ExpenseBudgetComponent_Conditional_48_Template_select_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.currencyId, $event) || (ctx_r4.form.currencyId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(32, ExpenseBudgetComponent_Conditional_48_option_32_Template, 2, 3, "option", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 32)(34, "label");
    \u0275\u0275text(35, "\u0646\u0648\u0639 \u0627\u0644\u0645\u0635\u0631\u0648\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "select", 11);
    \u0275\u0275twoWayListener("ngModelChange", function ExpenseBudgetComponent_Conditional_48_Template_select_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.expenseType, $event) || (ctx_r4.form.expenseType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(37, "option", 37);
    \u0275\u0275text(38, "\u062B\u0627\u0628\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option", 38);
    \u0275\u0275text(40, "\u0645\u062A\u063A\u064A\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "option", 39);
    \u0275\u0275text(42, "\u0633\u0646\u0648\u064A");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(43, "div", 31)(44, "div", 32)(45, "label");
    \u0275\u0275text(46, "\u0627\u0644\u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "select", 11);
    \u0275\u0275twoWayListener("ngModelChange", function ExpenseBudgetComponent_Conditional_48_Template_select_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.stationId, $event) || (ctx_r4.form.stationId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(48, "option", 12);
    \u0275\u0275text(49, "-- \u0627\u0644\u0643\u0644 --");
    \u0275\u0275elementEnd();
    \u0275\u0275template(50, ExpenseBudgetComponent_Conditional_48_option_50_Template, 2, 2, "option", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 32)(52, "label");
    \u0275\u0275text(53, "\u0627\u0644\u0634\u0647\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "select", 11);
    \u0275\u0275twoWayListener("ngModelChange", function ExpenseBudgetComponent_Conditional_48_Template_select_ngModelChange_54_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.month, $event) || (ctx_r4.form.month = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(55, "option", 12);
    \u0275\u0275text(56, "--");
    \u0275\u0275elementEnd();
    \u0275\u0275template(57, ExpenseBudgetComponent_Conditional_48_option_57_Template, 2, 2, "option", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div", 32)(59, "label");
    \u0275\u0275text(60, "\u0627\u0644\u0633\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "select", 11);
    \u0275\u0275twoWayListener("ngModelChange", function ExpenseBudgetComponent_Conditional_48_Template_select_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.year, $event) || (ctx_r4.form.year = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(62, "option", 12);
    \u0275\u0275text(63, "--");
    \u0275\u0275elementEnd();
    \u0275\u0275template(64, ExpenseBudgetComponent_Conditional_48_option_64_Template, 2, 2, "option", 36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "div", 32)(66, "label");
    \u0275\u0275text(67, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "textarea", 40);
    \u0275\u0275twoWayListener("ngModelChange", function ExpenseBudgetComponent_Conditional_48_Template_textarea_ngModelChange_68_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.form.notes, $event) || (ctx_r4.form.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "div", 41)(70, "button", 42);
    \u0275\u0275listener("click", function ExpenseBudgetComponent_Conditional_48_Template_button_click_70_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.save());
    });
    \u0275\u0275text(71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "button", 43);
    \u0275\u0275listener("click", function ExpenseBudgetComponent_Conditional_48_Template_button_click_72_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.showForm.set(false));
    });
    \u0275\u0275text(73, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r4.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u0628\u0646\u062F \u0645\u064A\u0632\u0627\u0646\u064A\u0629" : "\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F \u0645\u064A\u0632\u0627\u0646\u064A\u0629");
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.amount);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.currencyId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r4.currencies());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.expenseType);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.stationId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r4.stations());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.month);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r4.months);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.year);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r4.years);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.form.notes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0646\u062F");
  }
}
var ExpenseBudgetComponent = class _ExpenseBudgetComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : (
    /* istanbul ignore next */
    []
  ));
  currencies = signal([], ...ngDevMode ? [{ debugName: "currencies" }] : (
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
  form = { name: "", stationId: null, amount: 0, currencyId: 1, expenseType: "variable", month: null, year: null, notes: "" };
  ngOnInit() {
    super.ngOnInit();
    const y = (/* @__PURE__ */ new Date()).getFullYear();
    for (let i = y; i >= y - 5; i--)
      this.years.push(i);
  }
  onBizIdChange(_bizId) {
    this.load();
    this.api.getCurrencies().then((c) => this.currencies.set(c || []));
    this.api.getStations(this.bizId).then((s) => this.stations.set(s || []));
  }
  async load() {
    this.loading.set(true);
    try {
      const month = this.filterMonth();
      const year = this.filterYear();
      const data = await this.api.getExpenseBudget(this.bizId, month ?? void 0, year ?? void 0);
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
    this.form = { name: "", stationId: null, amount: 0, currencyId: 1, expenseType: "variable", month: this.filterMonth() || null, year: this.filterYear() || (/* @__PURE__ */ new Date()).getFullYear(), notes: "" };
    this.editingId.set(null);
    this.showForm.set(true);
  }
  openEdit(item) {
    this.form = {
      name: item.name,
      stationId: item.stationId || null,
      amount: Number(item.amount || 0),
      currencyId: item.currencyId || 1,
      expenseType: item.expenseType || "variable",
      month: item.month ?? null,
      year: item.year ?? null,
      notes: item.notes || ""
    };
    this.editingId.set(item.id);
    this.showForm.set(true);
  }
  async save() {
    if (!this.form.name?.trim()) {
      this.toast.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F");
      return;
    }
    try {
      const payload = __spreadProps(__spreadValues({}, this.form), { amount: Number(this.form.amount) });
      const id = this.editingId();
      if (id === null) {
        await this.api.createExpenseBudget(this.bizId, payload);
        this.toast.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0628\u0646\u062C\u0627\u062D");
      } else {
        await this.api.updateExpenseBudget(id, payload);
        this.toast.success("\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0628\u0646\u062F \u0628\u0646\u062C\u0627\u062D");
      }
      this.showForm.set(false);
      await this.load();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  async remove(item) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 "${item.name}"\u061F`, type: "danger" });
    if (confirmed) {
      try {
        await this.api.deleteExpenseBudget(item.id);
        this.toast.success("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641");
        await this.load();
      } catch (e) {
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
      }
    }
  }
  getExpenseTypeLabel(t) {
    const map = { fixed: "\u062B\u0627\u0628\u062A", variable: "\u0645\u062A\u063A\u064A\u0631", annual: "\u0633\u0646\u0648\u064A" };
    return map[t] || t;
  }
  getStationName(id) {
    if (!id)
      return "-";
    return this.stations().find((s) => s.id === id)?.name || "-";
  }
  getCurrencyCode(id) {
    return this.currencies().find((c) => c.id === id)?.code || "\u0631.\u064A";
  }
  totalAmount() {
    return this.items().reduce((s, i) => s + Number(i.amount || 0), 0);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ExpenseBudgetComponent_BaseFactory;
    return function ExpenseBudgetComponent_Factory(__ngFactoryType__) {
      return (\u0275ExpenseBudgetComponent_BaseFactory || (\u0275ExpenseBudgetComponent_BaseFactory = \u0275\u0275getInheritedFactory(_ExpenseBudgetComponent)))(__ngFactoryType__ || _ExpenseBudgetComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExpenseBudgetComponent, selectors: [["app-expense-budget"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 49, vars: 11, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "summary-row"], [1, "summary-card", "blue"], [1, "num"], [1, "lbl"], [1, "summary-card", "green"], [1, "filter-row"], [1, "filter-group"], [3, "ngModelChange", "ngModel"], [3, "ngValue"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], [1, "modal-overlay"], [1, "material-icons-round", "spin"], [1, "empty-hint"], [1, "name-cell"], [1, "amount-cell"], [1, "type-pill"], [1, "action-btn", "edit", 3, "click"], [1, "action-btn", "delete", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "blue"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], [1, "required"], ["placeholder", "\u0645\u062B\u0627\u0644: \u0643\u0647\u0631\u0628\u0627\u0621\u060C \u0625\u064A\u062C\u0627\u0631", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["value", "fixed"], ["value", "variable"], ["value", "annual"], ["rows", "2", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A...", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"]], template: function ExpenseBudgetComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "account_balance_wallet");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function ExpenseBudgetComponent_Template_button_click_6_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F \u0645\u064A\u0632\u0627\u0646\u064A\u0629");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "span", 2);
      \u0275\u0275text(13, "list");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div")(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 7);
      \u0275\u0275text(18, "\u0639\u062F\u062F \u0627\u0644\u0628\u0646\u0648\u062F");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 8)(20, "span", 2);
      \u0275\u0275text(21, "payments");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div")(23, "span", 6);
      \u0275\u0275text(24);
      \u0275\u0275pipe(25, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 7);
      \u0275\u0275text(27, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(28, "div", 9)(29, "div", 10)(30, "label");
      \u0275\u0275text(31, "\u0627\u0644\u0634\u0647\u0631");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "select", 11);
      \u0275\u0275listener("ngModelChange", function ExpenseBudgetComponent_Template_select_ngModelChange_32_listener($event) {
        ctx.filterMonth.set($event);
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(33, "option", 12);
      \u0275\u0275text(34, "\u0627\u0644\u0643\u0644");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(35, ExpenseBudgetComponent_For_36_Template, 2, 2, "option", 12, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div", 10)(38, "label");
      \u0275\u0275text(39, "\u0627\u0644\u0633\u0646\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "select", 11);
      \u0275\u0275listener("ngModelChange", function ExpenseBudgetComponent_Template_select_ngModelChange_40_listener($event) {
        ctx.filterYear.set($event);
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(41, "option", 12);
      \u0275\u0275text(42, "\u0627\u0644\u0643\u0644");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(43, ExpenseBudgetComponent_For_44_Template, 2, 2, "option", 12, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(45, ExpenseBudgetComponent_Conditional_45_Template, 5, 0, "div", 13)(46, ExpenseBudgetComponent_Conditional_46_Template, 7, 0, "div", 14)(47, ExpenseBudgetComponent_Conditional_47_Template, 22, 0, "table", 15);
      \u0275\u0275conditionalCreate(48, ExpenseBudgetComponent_Conditional_48_Template, 74, 17, "div", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate(ctx.items().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 8, ctx.totalAmount(), "1.0-0"));
      \u0275\u0275advance(8);
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
      \u0275\u0275conditional(ctx.loading() ? 45 : !ctx.items().length ? 46 : 47);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 48 : -1);
    }
  }, dependencies: [CommonModule, NgForOf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, DecimalPipe], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  min-width: 180px;\n  max-width: 280px;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.blue[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.08);\n}\n.summary-card.blue[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.summary-card.green[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.08);\n}\n.summary-card.green[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  align-items: flex-end;\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  min-width: 100px;\n}\n.name-cell[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.amount-cell[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.type-pill[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n  background: rgba(59, 130, 246, 0.15);\n  color: #3b82f6;\n}\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n/*# sourceMappingURL=expense-budget.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExpenseBudgetComponent, [{
    type: Component,
    args: [{ selector: "app-expense-budget", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">account_balance_wallet</span> \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A</h2>\r
    <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F \u0645\u064A\u0632\u0627\u0646\u064A\u0629</button>\r
  </div>\r
\r
  <div class="summary-row">\r
    <div class="summary-card blue">\r
      <span class="material-icons-round">list</span>\r
      <div><span class="num">{{ items().length }}</span><span class="lbl">\u0639\u062F\u062F \u0627\u0644\u0628\u0646\u0648\u062F</span></div>\r
    </div>\r
    <div class="summary-card green">\r
      <span class="material-icons-round">payments</span>\r
      <div><span class="num">{{ totalAmount() | number:'1.0-0' }}</span><span class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629</span></div>\r
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
      <span class="material-icons-round">account_balance_wallet</span>\r
      <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0646\u0648\u062F \u0645\u064A\u0632\u0627\u0646\u064A\u0629</p>\r
      <p class="empty-hint">\u0623\u0636\u0641 \u0628\u0646\u0648\u062F\u0627\u064B \u0644\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A \u0627\u0644\u0645\u062A\u0648\u0642\u0639\u0629 (\u062B\u0627\u0628\u062A\u0629\u060C \u0645\u062A\u063A\u064A\u0631\u0629\u060C \u0633\u0646\u0648\u064A\u0629)</p>\r
    </div>\r
  } @else {\r
    <table class="data-table">\r
      <thead>\r
        <tr>\r
          <th>#</th><th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u0645\u062D\u0637\u0629</th><th>\u0627\u0644\u0645\u0628\u0644\u063A</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u0634\u0647\u0631</th><th>\u0627\u0644\u0633\u0646\u0629</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
        @for (item of items(); track item.id; let i = $index) {\r
          <tr>\r
            <td>{{ i + 1 }}</td>\r
            <td class="name-cell">{{ item.name }}</td>\r
            <td>{{ getStationName(item.stationId) }}</td>\r
            <td class="amount-cell">{{ item.amount | number:'1.0-0' }} {{ getCurrencyCode(item.currencyId) }}</td>\r
            <td><span class="type-pill">{{ getExpenseTypeLabel(item.expenseType) }}</span></td>\r
            <td>{{ item.month ?? '-' }}</td>\r
            <td>{{ item.year ?? '-' }}</td>\r
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
            <div class="modal-icon blue"><span class="material-icons-round">account_balance_wallet</span></div>\r
            <div>\r
              <h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u0628\u0646\u062F \u0645\u064A\u0632\u0627\u0646\u064A\u0629' : '\u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F \u0645\u064A\u0632\u0627\u0646\u064A\u0629' }}</h2>\r
              <p>\u062A\u062E\u0637\u064A\u0637 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A (\u062B\u0627\u0628\u062A\u060C \u0645\u062A\u063A\u064A\u0631\u060C \u0633\u0646\u0648\u064A)</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F <span class="required">*</span></label><input [(ngModel)]="form.name" placeholder="\u0645\u062B\u0627\u0644: \u0643\u0647\u0631\u0628\u0627\u0621\u060C \u0625\u064A\u062C\u0627\u0631" /></div>\r
            <div class="form-group"><label>\u0627\u0644\u0645\u0628\u0644\u063A</label><input type="number" [(ngModel)]="form.amount" min="0" /></div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u0639\u0645\u0644\u0629</label><select [(ngModel)]="form.currencyId"><option [ngValue]="c.id" *ngFor="let c of currencies()">{{ c.code }} - {{ c.name }}</option></select></div>\r
            <div class="form-group"><label>\u0646\u0648\u0639 \u0627\u0644\u0645\u0635\u0631\u0648\u0641</label><select [(ngModel)]="form.expenseType"><option value="fixed">\u062B\u0627\u0628\u062A</option><option value="variable">\u0645\u062A\u063A\u064A\u0631</option><option value="annual">\u0633\u0646\u0648\u064A</option></select></div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u0645\u062D\u0637\u0629</label><select [(ngModel)]="form.stationId"><option [ngValue]="null">-- \u0627\u0644\u0643\u0644 --</option><option [ngValue]="s.id" *ngFor="let s of stations()">{{ s.name }}</option></select></div>\r
            <div class="form-group"><label>\u0627\u0644\u0634\u0647\u0631</label><select [(ngModel)]="form.month"><option [ngValue]="null">--</option><option [ngValue]="m" *ngFor="let m of months">{{ m }}</option></select></div>\r
            <div class="form-group"><label>\u0627\u0644\u0633\u0646\u0629</label><select [(ngModel)]="form.year"><option [ngValue]="null">--</option><option [ngValue]="y" *ngFor="let y of years">{{ y }}</option></select></div>\r
          </div>\r
          <div class="form-group"><label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label><textarea [(ngModel)]="form.notes" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A..."></textarea></div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u0646\u062F' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/expense-budget/expense-budget.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  min-width: 180px;\n  max-width: 280px;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.blue {\n  background: rgba(59, 130, 246, 0.08);\n}\n.summary-card.blue .material-icons-round {\n  color: #3b82f6;\n}\n.summary-card.green {\n  background: rgba(34, 197, 94, 0.08);\n}\n.summary-card.green .material-icons-round {\n  color: #22c55e;\n}\n.filter-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  align-items: flex-end;\n}\n.filter-group {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.filter-group label {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.filter-group select {\n  padding: 8px 12px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  min-width: 100px;\n}\n.name-cell {\n  font-weight: 700;\n}\n.amount-cell {\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.type-pill {\n  padding: 4px 10px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n  background: rgba(59, 130, 246, 0.15);\n  color: #3b82f6;\n}\n.empty-hint {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.required {\n  color: #ef4444;\n}\n/*# sourceMappingURL=expense-budget.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExpenseBudgetComponent, { className: "ExpenseBudgetComponent", filePath: "src/app/pages/expense-budget/expense-budget.ts", lineNumber: 15 });
})();
export {
  ExpenseBudgetComponent
};
//# sourceMappingURL=chunk-DNFDOF5H.js.map
