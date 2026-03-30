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
  NgForOf,
  NgIf,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/exchange-rates/exchange-rates.ts
var _forTrack0 = ($index, $item) => $item.id;
function ExchangeRatesComponent_option_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r1 = ctx.$implicit;
    \u0275\u0275property("value", c_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r1.nameAr || c_r1.code);
  }
}
function ExchangeRatesComponent_option_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    \u0275\u0275property("value", c_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r2.nameAr || c_r2.code);
  }
}
function ExchangeRatesComponent_div_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 1, ctx_r2.convertResult, "1.2-4"));
  }
}
function ExchangeRatesComponent_Conditional_79_option_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275property("value", c_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", c_r5.nameAr || c_r5.code, " (", c_r5.code, ")");
  }
}
function ExchangeRatesComponent_Conditional_79_option_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r6 = ctx.$implicit;
    \u0275\u0275property("value", c_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", c_r6.nameAr || c_r6.code, " (", c_r6.code, ")");
  }
}
function ExchangeRatesComponent_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275listener("click", function ExchangeRatesComponent_Conditional_79_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancel());
    });
    \u0275\u0275elementStart(1, "div", 38);
    \u0275\u0275listener("click", function ExchangeRatesComponent_Conditional_79_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 39)(3, "div", 40)(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "h2");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 41);
    \u0275\u0275text(10, "\u062A\u062D\u062F\u064A\u062F \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0628\u064A\u0646 \u0639\u0645\u0644\u062A\u064A\u0646");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 42);
    \u0275\u0275listener("click", function ExchangeRatesComponent_Conditional_79_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancel());
    });
    \u0275\u0275elementStart(12, "span", 4);
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 43)(15, "div", 44)(16, "div", 45)(17, "div", 46);
    \u0275\u0275text(18, "\u0661");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "\u0627\u0644\u0639\u0645\u0644\u0627\u062A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 47)(22, "div", 48)(23, "label", 22);
    \u0275\u0275text(24, "\u0645\u0646 \u0639\u0645\u0644\u0629 ");
    \u0275\u0275elementStart(25, "span", 49);
    \u0275\u0275text(26, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "select", 24);
    \u0275\u0275twoWayListener("ngModelChange", function ExchangeRatesComponent_Conditional_79_Template_select_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.fromCurrencyId, $event) || (ctx_r2.form.fromCurrencyId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(28, "option", 25);
    \u0275\u0275text(29, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u0645\u0644\u0629...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, ExchangeRatesComponent_Conditional_79_option_30_Template, 2, 3, "option", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 48)(32, "label", 22);
    \u0275\u0275text(33, "\u0625\u0644\u0649 \u0639\u0645\u0644\u0629 ");
    \u0275\u0275elementStart(34, "span", 49);
    \u0275\u0275text(35, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "select", 24);
    \u0275\u0275twoWayListener("ngModelChange", function ExchangeRatesComponent_Conditional_79_Template_select_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.toCurrencyId, $event) || (ctx_r2.form.toCurrencyId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(37, "option", 25);
    \u0275\u0275text(38, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u0645\u0644\u0629...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(39, ExchangeRatesComponent_Conditional_79_option_39_Template, 2, 3, "option", 26);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(40, "div", 44)(41, "div", 45)(42, "div", 46);
    \u0275\u0275text(43, "\u0662");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span");
    \u0275\u0275text(45, "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 47)(47, "div", 48)(48, "label", 22);
    \u0275\u0275text(49, "\u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 ");
    \u0275\u0275elementStart(50, "span", 49);
    \u0275\u0275text(51, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function ExchangeRatesComponent_Conditional_79_Template_input_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.rate, $event) || (ctx_r2.form.rate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 48)(54, "label", 22);
    \u0275\u0275text(55, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0633\u0631\u064A\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function ExchangeRatesComponent_Conditional_79_Template_input_ngModelChange_56_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.effectiveDate, $event) || (ctx_r2.form.effectiveDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(57, "div", 47)(58, "div", 48)(59, "label", 22);
    \u0275\u0275text(60, "\u0627\u0644\u0645\u0635\u062F\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "select", 24);
    \u0275\u0275twoWayListener("ngModelChange", function ExchangeRatesComponent_Conditional_79_Template_select_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.source, $event) || (ctx_r2.form.source = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(62, "option", 52);
    \u0275\u0275text(63, "\u064A\u062F\u0648\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "option", 53);
    \u0275\u0275text(65, "\u0633\u0648\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "option", 54);
    \u0275\u0275text(67, "\u0628\u0646\u0643");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(68, "div", 48)(69, "label", 22);
    \u0275\u0275text(70, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", function ExchangeRatesComponent_Conditional_79_Template_input_ngModelChange_71_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.notes, $event) || (ctx_r2.form.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(72, "div", 56)(73, "button", 57);
    \u0275\u0275listener("click", function ExchangeRatesComponent_Conditional_79_Template_button_click_73_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancel());
    });
    \u0275\u0275text(74, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "button", 8);
    \u0275\u0275listener("click", function ExchangeRatesComponent_Conditional_79_Template_button_click_75_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275elementStart(76, "span", 4);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd();
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.editId ? "edit" : "add_circle");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.editId ? "\u062A\u0639\u062F\u064A\u0644 \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641" : "\u0633\u0639\u0631 \u0635\u0631\u0641 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(19);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.fromCurrencyId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.currencies);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.toCurrencyId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.currencies);
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.rate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.effectiveDate);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.source);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.notes);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.editId ? "save" : "add");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.editId ? "\u062A\u062D\u062F\u064A\u062B" : "\u062D\u0641\u0638", " ");
  }
}
function ExchangeRatesComponent_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 58)(2, "span", 4);
    \u0275\u0275text(3, "currency_exchange");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0633\u0639\u0627\u0631 \u0635\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "\u0623\u0636\u0641 \u0633\u0639\u0631 \u0635\u0631\u0641 \u062C\u062F\u064A\u062F \u0644\u0628\u062F\u0621 \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 8);
    \u0275\u0275listener("click", function ExchangeRatesComponent_Conditional_80_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm = true);
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u0633\u0639\u0631 \u0635\u0631\u0641 \u062C\u062F\u064A\u062F ");
    \u0275\u0275elementEnd()();
  }
}
function ExchangeRatesComponent_Conditional_81_For_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68)(1, "span", 4);
    \u0275\u0275text(2, "notes");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", r_r9.notes, " ");
  }
}
function ExchangeRatesComponent_Conditional_81_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275element(1, "div", 60);
    \u0275\u0275elementStart(2, "div", 61)(3, "span", 4);
    \u0275\u0275text(4, "sync_alt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 62)(6, "div", 63)(7, "span", 64);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 65);
    \u0275\u0275text(10, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 64);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 66)(14, "span", 67)(15, "span", 4);
    \u0275\u0275text(16, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, ExchangeRatesComponent_Conditional_81_For_2_Conditional_18_Template, 4, 1, "span", 68);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 69)(20, "div", 70);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 71);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 72)(25, "button", 73);
    \u0275\u0275listener("click", function ExchangeRatesComponent_Conditional_81_For_2_Template_button_click_25_listener() {
      const r_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.edit(r_r9));
    });
    \u0275\u0275elementStart(26, "span", 4);
    \u0275\u0275text(27, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "button", 74);
    \u0275\u0275listener("click", function ExchangeRatesComponent_Conditional_81_For_2_Template_button_click_28_listener() {
      const r_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.remove(r_r9.id));
    });
    \u0275\u0275elementStart(29, "span", 4);
    \u0275\u0275text(30, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const r_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.getCurrencyName(r_r9.fromCurrencyId));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.getCurrencyName(r_r9.toCurrencyId));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", r_r9.effectiveDate, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(r_r9.notes ? 18 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r9.rate);
    \u0275\u0275advance();
    \u0275\u0275classMap("source-" + r_r9.source);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r9.source === "manual" ? "\u064A\u062F\u0648\u064A" : r_r9.source === "market" ? "\u0633\u0648\u0642" : "\u0628\u0646\u0643", " ");
  }
}
function ExchangeRatesComponent_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275repeaterCreate(1, ExchangeRatesComponent_Conditional_81_For_2_Template, 31, 8, "div", 59, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.rates);
  }
}
var ExchangeRatesComponent = class _ExchangeRatesComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  rates = [];
  currencies = [];
  showForm = false;
  editId = null;
  form = { fromCurrencyId: "", toCurrencyId: "", rate: "", effectiveDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0], source: "manual", notes: "" };
  convertFrom = "";
  convertTo = "";
  convertAmount = 1e3;
  convertResult = null;
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.currencies = await this.api.getCurrencies();
    this.rates = await this.api.getExchangeRates(this.bizId);
  }
  getSourceCount(source) {
    return this.rates.filter((r) => r.source === source).length;
  }
  getCurrencyName(id) {
    const c = this.currencies.find((c2) => c2.id === id);
    return c ? c.nameAr || c.code : String(id);
  }
  async save() {
    try {
      const data = __spreadProps(__spreadValues({}, this.form), { fromCurrencyId: Number(this.form.fromCurrencyId), toCurrencyId: Number(this.form.toCurrencyId), rate: String(this.form.rate) });
      if (this.editId) {
        await this.api.updateExchangeRate(this.bizId, this.editId, data);
      } else {
        await this.api.createExchangeRate(this.bizId, data);
      }
      this.toast.success("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0628\u0646\u062C\u0627\u062D");
      this.cancel();
      this.load();
    } catch (e) {
      const errObj = e && typeof e === "object" && "error" in e ? e.error : void 0;
      const msg = e instanceof Error ? e.message : errObj && typeof errObj === "object" && errObj.error ? errObj.error : void 0;
      this.toast.error(msg || "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  edit(r) {
    this.editId = r.id;
    this.form = { fromCurrencyId: r.fromCurrencyId, toCurrencyId: r.toCurrencyId, rate: r.rate, effectiveDate: r.effectiveDate, source: r.source, notes: r.notes || "" };
    this.showForm = true;
  }
  async remove(id) {
    if (confirm("\u062D\u0630\u0641 \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641\u061F")) {
      await this.api.deleteExchangeRate(this.bizId, id);
      this.toast.success("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641");
      this.load();
    }
  }
  cancel() {
    this.showForm = false;
    this.editId = null;
    this.form = { fromCurrencyId: "", toCurrencyId: "", rate: "", effectiveDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0], source: "manual", notes: "" };
  }
  async convert() {
    try {
      const res = await this.api.convertCurrency(this.bizId, Number(this.convertFrom), Number(this.convertTo), this.convertAmount);
      this.convertResult = res.convertedAmount;
    } catch {
      this.convertResult = null;
      this.toast.error("\u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u0639\u0631 \u0635\u0631\u0641 \u0628\u064A\u0646 \u0647\u0627\u062A\u064A\u0646 \u0627\u0644\u0639\u0645\u0644\u062A\u064A\u0646");
    }
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ExchangeRatesComponent_BaseFactory;
    return function ExchangeRatesComponent_Factory(__ngFactoryType__) {
      return (\u0275ExchangeRatesComponent_BaseFactory || (\u0275ExchangeRatesComponent_BaseFactory = \u0275\u0275getInheritedFactory(_ExchangeRatesComponent)))(__ngFactoryType__ || _ExchangeRatesComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExchangeRatesComponent, selectors: [["app-exchange-rates"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 82, vars: 11, consts: [[1, "page-container"], [1, "page-header"], [1, "header-left"], [1, "page-icon-3d", "blue"], [1, "material-icons-round"], [1, "page-title"], [1, "page-subtitle"], [1, "header-right"], [1, "btn-3d", "btn-primary", 3, "click"], [1, "stats-row"], [1, "stat-card-3d", "blue"], [1, "sc-icon"], [1, "sc-body"], [1, "sc-num"], [1, "sc-label"], [1, "stat-card-3d", "green"], [1, "stat-card-3d", "amber"], [1, "converter-card-3d"], [1, "converter-header"], [1, "converter-icon"], [1, "converter-body"], [1, "converter-field"], [1, "form-label"], ["type", "number", "placeholder", "\u0627\u0644\u0645\u0628\u0644\u063A", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "converter-arrow"], [1, "converter-action"], [1, "btn-3d", "btn-blue", 3, "click"], ["class", "converter-result", 4, "ngIf"], [1, "modal-overlay"], [1, "empty-state"], [1, "rates-list"], [3, "value"], [1, "converter-result"], [1, "result-value"], [1, "modal-overlay", 3, "click"], [1, "modal-3d", "form-modal", 3, "click"], [1, "modal-header", "blue-header"], [1, "modal-icon", "blue"], [1, "modal-subtitle"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-step"], [1, "step-header"], [1, "step-num"], [1, "form-row"], [1, "form-group"], [1, "required"], ["type", "number", "step", "0.0001", "placeholder", "0.0037", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], ["value", "manual"], ["value", "market"], ["value", "bank"], ["type", "text", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-3d", "btn-ghost", 3, "click"], [1, "empty-icon-3d"], [1, "rate-row-3d"], [1, "rr-type-indicator"], [1, "rr-icon"], [1, "rr-main"], [1, "rr-pair"], [1, "rr-currency"], [1, "material-icons-round", "rr-arrow"], [1, "rr-meta"], [1, "rr-date"], [1, "rr-note"], [1, "rr-right"], [1, "rr-rate"], [1, "rr-source-badge"], [1, "rr-actions"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "icon-btn", "edit-btn", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "icon-btn", "delete-btn", 3, "click"]], template: function ExchangeRatesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "currency_exchange");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1", 5);
      \u0275\u0275text(8, "\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u064A\u0648\u0645\u064A\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10, "\u0625\u062F\u0627\u0631\u0629 \u0623\u0633\u0639\u0627\u0631 \u0635\u0631\u0641 \u0627\u0644\u0639\u0645\u0644\u0627\u062A \u0648\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0644\u063A");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
      \u0275\u0275listener("click", function ExchangeRatesComponent_Template_button_click_12_listener() {
        return ctx.showForm = !ctx.showForm;
      });
      \u0275\u0275elementStart(13, "span", 4);
      \u0275\u0275text(14, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15, " \u0633\u0639\u0631 \u0635\u0631\u0641 \u062C\u062F\u064A\u062F ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 9)(17, "div", 10)(18, "div", 11)(19, "span", 4);
      \u0275\u0275text(20, "currency_exchange");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 12)(22, "div", 13);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 14);
      \u0275\u0275text(25, "\u0623\u0633\u0639\u0627\u0631 \u0645\u0633\u062C\u0644\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 15)(27, "div", 11)(28, "span", 4);
      \u0275\u0275text(29, "paid");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 12)(31, "div", 13);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 14);
      \u0275\u0275text(34, "\u0639\u0645\u0644\u0627\u062A \u0645\u062A\u0627\u062D\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 16)(36, "div", 11)(37, "span", 4);
      \u0275\u0275text(38, "swap_horiz");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "div", 12)(40, "div", 13);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 14);
      \u0275\u0275text(43, "\u0623\u0633\u0639\u0627\u0631 \u064A\u062F\u0648\u064A\u0629");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(44, "div", 17)(45, "div", 18)(46, "div", 19)(47, "span", 4);
      \u0275\u0275text(48, "swap_horiz");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "h3");
      \u0275\u0275text(50, "\u0645\u062D\u0648\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u062A");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "div", 20)(52, "div", 21)(53, "label", 22);
      \u0275\u0275text(54, "\u0627\u0644\u0645\u0628\u0644\u063A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "input", 23);
      \u0275\u0275twoWayListener("ngModelChange", function ExchangeRatesComponent_Template_input_ngModelChange_55_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.convertAmount, $event) || (ctx.convertAmount = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "div", 21)(57, "label", 22);
      \u0275\u0275text(58, "\u0645\u0646 \u0639\u0645\u0644\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "select", 24);
      \u0275\u0275twoWayListener("ngModelChange", function ExchangeRatesComponent_Template_select_ngModelChange_59_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.convertFrom, $event) || (ctx.convertFrom = $event);
        return $event;
      });
      \u0275\u0275elementStart(60, "option", 25);
      \u0275\u0275text(61, "\u0627\u062E\u062A\u0631...");
      \u0275\u0275elementEnd();
      \u0275\u0275template(62, ExchangeRatesComponent_option_62_Template, 2, 2, "option", 26);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "div", 27)(64, "span", 4);
      \u0275\u0275text(65, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(66, "div", 21)(67, "label", 22);
      \u0275\u0275text(68, "\u0625\u0644\u0649 \u0639\u0645\u0644\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "select", 24);
      \u0275\u0275twoWayListener("ngModelChange", function ExchangeRatesComponent_Template_select_ngModelChange_69_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.convertTo, $event) || (ctx.convertTo = $event);
        return $event;
      });
      \u0275\u0275elementStart(70, "option", 25);
      \u0275\u0275text(71, "\u0627\u062E\u062A\u0631...");
      \u0275\u0275elementEnd();
      \u0275\u0275template(72, ExchangeRatesComponent_option_72_Template, 2, 2, "option", 26);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(73, "div", 28)(74, "button", 29);
      \u0275\u0275listener("click", function ExchangeRatesComponent_Template_button_click_74_listener() {
        return ctx.convert();
      });
      \u0275\u0275elementStart(75, "span", 4);
      \u0275\u0275text(76, "calculate");
      \u0275\u0275elementEnd();
      \u0275\u0275text(77, " \u062A\u062D\u0648\u064A\u0644 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(78, ExchangeRatesComponent_div_78_Template, 4, 4, "div", 30);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(79, ExchangeRatesComponent_Conditional_79_Template, 79, 12, "div", 31);
      \u0275\u0275conditionalCreate(80, ExchangeRatesComponent_Conditional_80_Template, 12, 0, "div", 32)(81, ExchangeRatesComponent_Conditional_81_Template, 3, 0, "div", 33);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(23);
      \u0275\u0275textInterpolate(ctx.rates.length);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.currencies.length);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.getSourceCount("manual"));
      \u0275\u0275advance(14);
      \u0275\u0275twoWayProperty("ngModel", ctx.convertAmount);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.convertFrom);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.currencies);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.convertTo);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.currencies);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.convertResult !== null);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showForm ? 79 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.rates.length === 0 ? 80 : 81);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe], styles: ['\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border-radius: 20px;\n  border: 1px solid rgba(59, 130, 246, 0.12);\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-icon-3d[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.page-icon-3d.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.page-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: white;\n}\n.page-icon-3d[_ngcontent-%COMP%]:hover {\n  transform: perspective(100px) rotateX(0deg) scale(1.05);\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 3px;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.btn-3d[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);\n}\n.btn-3d.btn-blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-blue[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);\n}\n.btn-3d.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--text-secondary, #64748b);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n}\n.btn-3d.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface, #f8fafc);\n  transform: translateY(-1px);\n}\n.btn-3d[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n}\n.stats-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.stat-card-3d[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  flex: 1;\n  min-width: 160px;\n}\n.stat-card-3d[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.stat-card-3d[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-card-3d[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: white;\n}\n.stat-card-3d.blue[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.stat-card-3d.green[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.stat-card-3d.amber[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.sc-num[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n}\n.sc-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.converter-card-3d[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  border-radius: 18px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(59, 130, 246, 0.12);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  overflow: hidden;\n}\n.converter-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border-bottom: 1px solid rgba(59, 130, 246, 0.08);\n}\n.converter-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n}\n.converter-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 3px 8px rgba(59, 130, 246, 0.3);\n}\n.converter-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: white;\n}\n.converter-body[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 12px;\n  padding: 16px 20px;\n  flex-wrap: wrap;\n}\n.converter-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 120px;\n}\n.converter-arrow[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-bottom: 8px;\n}\n.converter-arrow[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--text-muted, #94a3b8);\n}\n.converter-action[_ngcontent-%COMP%] {\n  padding-bottom: 0;\n}\n.converter-result[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.08),\n      rgba(20, 184, 166, 0.06));\n  border: 1px solid rgba(34, 197, 94, 0.2);\n}\n.converter-result[_ngcontent-%COMP%]   .result-value[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 900;\n  color: #22c55e;\n  direction: ltr;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n.empty-icon-3d[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.3);\n  transform: perspective(150px) rotateX(10deg);\n}\n.empty-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: white;\n}\n.rates-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.rate-row-3d[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 16px;\n  border-radius: 14px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  position: relative;\n  overflow: hidden;\n  transition: all 0.2s;\n}\n.rate-row-3d[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 3px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.rate-row-3d[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);\n  transform: translateX(-3px);\n}\n.rate-row-3d[_ngcontent-%COMP%]:hover   .rr-actions[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.rr-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  box-shadow: 0 3px 8px rgba(59, 130, 246, 0.3);\n}\n.rr-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: white;\n}\n.rr-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.rr-pair[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 4px;\n}\n.rr-currency[_ngcontent-%COMP%] {\n  font-weight: 800;\n}\n.rr-arrow[_ngcontent-%COMP%] {\n  font-size: 16px !important;\n  color: var(--text-muted, #94a3b8);\n}\n.rr-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.rr-date[_ngcontent-%COMP%], \n.rr-note[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n}\n.rr-date[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%], \n.rr-note[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.rr-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n}\n.rr-rate[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 900;\n  color: #3b82f6;\n  direction: ltr;\n  font-family: monospace;\n}\n.rr-source-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.rr-source-badge.source-manual[_ngcontent-%COMP%] {\n  background: rgba(100, 116, 139, 0.1);\n  color: #64748b;\n}\n.rr-source-badge.source-market[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  color: #22c55e;\n}\n.rr-source-badge.source-bank[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n}\n.rr-actions[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.2s;\n  display: flex;\n  gap: 2px;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.icon-btn.edit-btn[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.icon-btn.edit-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.1);\n}\n.icon-btn.delete-btn[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.icon-btn.delete-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-3d[_ngcontent-%COMP%] {\n  background: var(--bg-card, white);\n  border-radius: 22px;\n  width: 100%;\n  max-width: 580px;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.08);\n  animation: _ngcontent-%COMP%_slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(40px) scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.form-modal[_ngcontent-%COMP%] {\n  max-width: 640px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 18px 22px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.modal-header.blue-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n  flex: 1;\n}\n.modal-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 2px 0 0;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 21px;\n  color: white;\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  border: none;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.modal-close[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 18px 22px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  padding: 14px 22px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.form-step[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding: 14px;\n  border-radius: 12px;\n  background: var(--bg-surface, #f8fafc);\n}\n.step-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 12px;\n}\n.step-num[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 900;\n  flex-shrink: 0;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.form-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.form-input[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 14px;\n    align-items: flex-start;\n  }\n  .stats-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .modal-3d[_ngcontent-%COMP%] {\n    border-radius: 16px;\n  }\n  .rate-row-3d[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .converter-body[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=exchange-rates.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExchangeRatesComponent, [{
    type: Component,
    args: [{ selector: "app-exchange-rates", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent], template: `<div class="page-container">\r
\r
  <!-- ===== Page Header ===== -->\r
  <div class="page-header">\r
    <div class="header-left">\r
      <div class="page-icon-3d blue">\r
        <span class="material-icons-round">currency_exchange</span>\r
      </div>\r
      <div>\r
        <h1 class="page-title">\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0635\u0631\u0641 \u0627\u0644\u064A\u0648\u0645\u064A\u0629</h1>\r
        <p class="page-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0623\u0633\u0639\u0627\u0631 \u0635\u0631\u0641 \u0627\u0644\u0639\u0645\u0644\u0627\u062A \u0648\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0644\u063A</p>\r
      </div>\r
    </div>\r
    <div class="header-right">\r
      <button class="btn-3d btn-primary" (click)="showForm = !showForm">\r
        <span class="material-icons-round">add</span>\r
        \u0633\u0639\u0631 \u0635\u0631\u0641 \u062C\u062F\u064A\u062F\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- ===== Stats Cards ===== -->\r
  <div class="stats-row">\r
    <div class="stat-card-3d blue">\r
      <div class="sc-icon"><span class="material-icons-round">currency_exchange</span></div>\r
      <div class="sc-body">\r
        <div class="sc-num">{{ rates.length }}</div>\r
        <div class="sc-label">\u0623\u0633\u0639\u0627\u0631 \u0645\u0633\u062C\u0644\u0629</div>\r
      </div>\r
    </div>\r
    <div class="stat-card-3d green">\r
      <div class="sc-icon"><span class="material-icons-round">paid</span></div>\r
      <div class="sc-body">\r
        <div class="sc-num">{{ currencies.length }}</div>\r
        <div class="sc-label">\u0639\u0645\u0644\u0627\u062A \u0645\u062A\u0627\u062D\u0629</div>\r
      </div>\r
    </div>\r
    <div class="stat-card-3d amber">\r
      <div class="sc-icon"><span class="material-icons-round">swap_horiz</span></div>\r
      <div class="sc-body">\r
        <div class="sc-num">{{ getSourceCount('manual') }}</div>\r
        <div class="sc-label">\u0623\u0633\u0639\u0627\u0631 \u064A\u062F\u0648\u064A\u0629</div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- ===== \u0645\u062D\u0648\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u062A ===== -->\r
  <div class="converter-card-3d">\r
    <div class="converter-header">\r
      <div class="converter-icon">\r
        <span class="material-icons-round">swap_horiz</span>\r
      </div>\r
      <h3>\u0645\u062D\u0648\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u062A</h3>\r
    </div>\r
    <div class="converter-body">\r
      <div class="converter-field">\r
        <label class="form-label">\u0627\u0644\u0645\u0628\u0644\u063A</label>\r
        <input type="number" class="form-input" [(ngModel)]="convertAmount" placeholder="\u0627\u0644\u0645\u0628\u0644\u063A">\r
      </div>\r
      <div class="converter-field">\r
        <label class="form-label">\u0645\u0646 \u0639\u0645\u0644\u0629</label>\r
        <select class="form-select" [(ngModel)]="convertFrom">\r
          <option value="">\u0627\u062E\u062A\u0631...</option>\r
          <option *ngFor="let c of currencies" [value]="c.id">{{c.nameAr || c.code}}</option>\r
        </select>\r
      </div>\r
      <div class="converter-arrow">\r
        <span class="material-icons-round">arrow_back</span>\r
      </div>\r
      <div class="converter-field">\r
        <label class="form-label">\u0625\u0644\u0649 \u0639\u0645\u0644\u0629</label>\r
        <select class="form-select" [(ngModel)]="convertTo">\r
          <option value="">\u0627\u062E\u062A\u0631...</option>\r
          <option *ngFor="let c of currencies" [value]="c.id">{{c.nameAr || c.code}}</option>\r
        </select>\r
      </div>\r
      <div class="converter-action">\r
        <button class="btn-3d btn-blue" (click)="convert()">\r
          <span class="material-icons-round">calculate</span>\r
          \u062A\u062D\u0648\u064A\u0644\r
        </button>\r
      </div>\r
      <div class="converter-result" *ngIf="convertResult !== null">\r
        <span class="result-value">{{ convertResult | number:'1.2-4' }}</span>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- ===== \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0625\u0636\u0627\u0641\u0629 ===== -->\r
  @if (showForm) {\r
    <div class="modal-overlay" (click)="cancel()">\r
      <div class="modal-3d form-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header blue-header">\r
          <div class="modal-icon blue">\r
            <span class="material-icons-round">{{ editId ? 'edit' : 'add_circle' }}</span>\r
          </div>\r
          <div>\r
            <h2>{{ editId ? '\u062A\u0639\u062F\u064A\u0644 \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641' : '\u0633\u0639\u0631 \u0635\u0631\u0641 \u062C\u062F\u064A\u062F' }}</h2>\r
            <p class="modal-subtitle">\u062A\u062D\u062F\u064A\u062F \u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 \u0628\u064A\u0646 \u0639\u0645\u0644\u062A\u064A\u0646</p>\r
          </div>\r
          <button class="modal-close" (click)="cancel()">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-step">\r
            <div class="step-header">\r
              <div class="step-num">\u0661</div>\r
              <span>\u0627\u0644\u0639\u0645\u0644\u0627\u062A</span>\r
            </div>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label class="form-label">\u0645\u0646 \u0639\u0645\u0644\u0629 <span class="required">*</span></label>\r
                <select class="form-select" [(ngModel)]="form.fromCurrencyId">\r
                  <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u0645\u0644\u0629...</option>\r
                  <option *ngFor="let c of currencies" [value]="c.id">{{c.nameAr || c.code}} ({{c.code}})</option>\r
                </select>\r
              </div>\r
              <div class="form-group">\r
                <label class="form-label">\u0625\u0644\u0649 \u0639\u0645\u0644\u0629 <span class="required">*</span></label>\r
                <select class="form-select" [(ngModel)]="form.toCurrencyId">\r
                  <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u0645\u0644\u0629...</option>\r
                  <option *ngFor="let c of currencies" [value]="c.id">{{c.nameAr || c.code}} ({{c.code}})</option>\r
                </select>\r
              </div>\r
            </div>\r
          </div>\r
          <div class="form-step">\r
            <div class="step-header">\r
              <div class="step-num">\u0662</div>\r
              <span>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</span>\r
            </div>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label class="form-label">\u0633\u0639\u0631 \u0627\u0644\u0635\u0631\u0641 <span class="required">*</span></label>\r
                <input type="number" step="0.0001" class="form-input" [(ngModel)]="form.rate" placeholder="0.0037">\r
              </div>\r
              <div class="form-group">\r
                <label class="form-label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0633\u0631\u064A\u0627\u0646</label>\r
                <input type="date" class="form-input" [(ngModel)]="form.effectiveDate">\r
              </div>\r
            </div>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label class="form-label">\u0627\u0644\u0645\u0635\u062F\u0631</label>\r
                <select class="form-select" [(ngModel)]="form.source">\r
                  <option value="manual">\u064A\u062F\u0648\u064A</option>\r
                  <option value="market">\u0633\u0648\u0642</option>\r
                  <option value="bank">\u0628\u0646\u0643</option>\r
                </select>\r
              </div>\r
              <div class="form-group">\r
                <label class="form-label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>\r
                <input type="text" class="form-input" [(ngModel)]="form.notes" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629">\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-3d btn-ghost" (click)="cancel()">\u0625\u0644\u063A\u0627\u0621</button>\r
          <button class="btn-3d btn-primary" (click)="save()">\r
            <span class="material-icons-round">{{ editId ? 'save' : 'add' }}</span>\r
            {{ editId ? '\u062A\u062D\u062F\u064A\u062B' : '\u062D\u0641\u0638' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===== \u0642\u0627\u0626\u0645\u0629 \u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0635\u0631\u0641 ===== -->\r
  @if (rates.length === 0) {\r
    <div class="empty-state">\r
      <div class="empty-icon-3d">\r
        <span class="material-icons-round">currency_exchange</span>\r
      </div>\r
      <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0633\u0639\u0627\u0631 \u0635\u0631\u0641</h3>\r
      <p>\u0623\u0636\u0641 \u0633\u0639\u0631 \u0635\u0631\u0641 \u062C\u062F\u064A\u062F \u0644\u0628\u062F\u0621 \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u062A</p>\r
      <button class="btn-3d btn-primary" (click)="showForm = true">\r
        <span class="material-icons-round">add</span>\r
        \u0633\u0639\u0631 \u0635\u0631\u0641 \u062C\u062F\u064A\u062F\r
      </button>\r
    </div>\r
  } @else {\r
    <div class="rates-list">\r
      @for (r of rates; track r.id) {\r
        <div class="rate-row-3d">\r
          <div class="rr-type-indicator"></div>\r
          <div class="rr-icon">\r
            <span class="material-icons-round">sync_alt</span>\r
          </div>\r
          <div class="rr-main">\r
            <div class="rr-pair">\r
              <span class="rr-currency">{{ getCurrencyName(r.fromCurrencyId) }}</span>\r
              <span class="material-icons-round rr-arrow">arrow_back</span>\r
              <span class="rr-currency">{{ getCurrencyName(r.toCurrencyId) }}</span>\r
            </div>\r
            <div class="rr-meta">\r
              <span class="rr-date">\r
                <span class="material-icons-round">calendar_today</span>\r
                {{ r.effectiveDate }}\r
              </span>\r
              @if (r.notes) {\r
                <span class="rr-note">\r
                  <span class="material-icons-round">notes</span>\r
                  {{ r.notes }}\r
                </span>\r
              }\r
            </div>\r
          </div>\r
          <div class="rr-right">\r
            <div class="rr-rate">{{ r.rate }}</div>\r
            <span class="rr-source-badge" [class]="'source-' + r.source">\r
              {{ r.source === 'manual' ? '\u064A\u062F\u0648\u064A' : r.source === 'market' ? '\u0633\u0648\u0642' : '\u0628\u0646\u0643' }}\r
            </span>\r
          </div>\r
          <div class="rr-actions">\r
            <button class="icon-btn edit-btn" (click)="edit(r)" title="\u062A\u0639\u062F\u064A\u0644">\r
              <span class="material-icons-round">edit</span>\r
            </button>\r
            <button class="icon-btn delete-btn" (click)="remove(r.id)" title="\u062D\u0630\u0641">\r
              <span class="material-icons-round">delete</span>\r
            </button>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
</div>\r
`, styles: ['/* src/app/pages/exchange-rates/exchange-rates.scss */\n.page-container {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border-radius: 20px;\n  border: 1px solid rgba(59, 130, 246, 0.12);\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-icon-3d {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.page-icon-3d.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.page-icon-3d .material-icons-round {\n  font-size: 26px;\n  color: white;\n}\n.page-icon-3d:hover {\n  transform: perspective(100px) rotateX(0deg) scale(1.05);\n}\n.page-title {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 3px;\n}\n.page-subtitle {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.btn-3d {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d .material-icons-round {\n  font-size: 17px;\n}\n.btn-3d.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);\n}\n.btn-3d.btn-blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-blue:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);\n}\n.btn-3d.btn-ghost {\n  background: transparent;\n  color: var(--text-secondary, #64748b);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n}\n.btn-3d.btn-ghost:hover {\n  background: var(--bg-surface, #f8fafc);\n  transform: translateY(-1px);\n}\n.btn-3d:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n}\n.stats-row {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.stat-card-3d {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  flex: 1;\n  min-width: 160px;\n}\n.stat-card-3d:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.stat-card-3d .sc-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-card-3d .sc-icon .material-icons-round {\n  font-size: 22px;\n  color: white;\n}\n.stat-card-3d.blue .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.stat-card-3d.green .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.stat-card-3d.amber .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.sc-num {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n}\n.sc-label {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.converter-card-3d {\n  margin-bottom: 20px;\n  border-radius: 18px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(59, 130, 246, 0.12);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  overflow: hidden;\n}\n.converter-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border-bottom: 1px solid rgba(59, 130, 246, 0.08);\n}\n.converter-header h3 {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n}\n.converter-icon {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 3px 8px rgba(59, 130, 246, 0.3);\n}\n.converter-icon .material-icons-round {\n  font-size: 18px;\n  color: white;\n}\n.converter-body {\n  display: flex;\n  align-items: flex-end;\n  gap: 12px;\n  padding: 16px 20px;\n  flex-wrap: wrap;\n}\n.converter-field {\n  flex: 1;\n  min-width: 120px;\n}\n.converter-arrow {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-bottom: 8px;\n}\n.converter-arrow .material-icons-round {\n  font-size: 20px;\n  color: var(--text-muted, #94a3b8);\n}\n.converter-action {\n  padding-bottom: 0;\n}\n.converter-result {\n  padding: 8px 16px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.08),\n      rgba(20, 184, 166, 0.06));\n  border: 1px solid rgba(34, 197, 94, 0.2);\n}\n.converter-result .result-value {\n  font-size: 16px;\n  font-weight: 900;\n  color: #22c55e;\n  direction: ltr;\n}\n.empty-state p {\n  font-size: 14px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n.empty-icon-3d {\n  width: 72px;\n  height: 72px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.3);\n  transform: perspective(150px) rotateX(10deg);\n}\n.empty-icon-3d .material-icons-round {\n  font-size: 36px;\n  color: white;\n}\n.rates-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.rate-row-3d {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 16px;\n  border-radius: 14px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  position: relative;\n  overflow: hidden;\n  transition: all 0.2s;\n}\n.rate-row-3d::before {\n  content: "";\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 3px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.rate-row-3d:hover {\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);\n  transform: translateX(-3px);\n}\n.rate-row-3d:hover .rr-actions {\n  opacity: 1;\n}\n.rr-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  box-shadow: 0 3px 8px rgba(59, 130, 246, 0.3);\n}\n.rr-icon .material-icons-round {\n  font-size: 20px;\n  color: white;\n}\n.rr-main {\n  flex: 1;\n  min-width: 0;\n}\n.rr-pair {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 4px;\n}\n.rr-currency {\n  font-weight: 800;\n}\n.rr-arrow {\n  font-size: 16px !important;\n  color: var(--text-muted, #94a3b8);\n}\n.rr-meta {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.rr-date,\n.rr-note {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n}\n.rr-date .material-icons-round,\n.rr-note .material-icons-round {\n  font-size: 12px;\n}\n.rr-right {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n}\n.rr-rate {\n  font-size: 16px;\n  font-weight: 900;\n  color: #3b82f6;\n  direction: ltr;\n  font-family: monospace;\n}\n.rr-source-badge {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.rr-source-badge.source-manual {\n  background: rgba(100, 116, 139, 0.1);\n  color: #64748b;\n}\n.rr-source-badge.source-market {\n  background: rgba(34, 197, 94, 0.1);\n  color: #22c55e;\n}\n.rr-source-badge.source-bank {\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n}\n.rr-actions {\n  opacity: 0;\n  transition: opacity 0.2s;\n  display: flex;\n  gap: 2px;\n}\n.icon-btn {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn .material-icons-round {\n  font-size: 15px;\n}\n.icon-btn.edit-btn {\n  color: #3b82f6;\n}\n.icon-btn.edit-btn:hover {\n  background: rgba(59, 130, 246, 0.1);\n}\n.icon-btn.delete-btn {\n  color: #ef4444;\n}\n.icon-btn.delete-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  animation: fadeIn 0.2s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-3d {\n  background: var(--bg-card, white);\n  border-radius: 22px;\n  width: 100%;\n  max-width: 580px;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.08);\n  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes slideUp {\n  from {\n    transform: translateY(40px) scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.form-modal {\n  max-width: 640px;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 18px 22px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.modal-header.blue-header {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n}\n.modal-header h2 {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n  flex: 1;\n}\n.modal-subtitle {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 2px 0 0;\n}\n.modal-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);\n}\n.modal-icon .material-icons-round {\n  font-size: 21px;\n  color: white;\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-close {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  border: none;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.modal-close .material-icons-round {\n  font-size: 17px;\n}\n.modal-close:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 18px 22px;\n}\n.modal-footer {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  padding: 14px 22px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.form-step {\n  margin-bottom: 16px;\n  padding: 14px;\n  border-radius: 12px;\n  background: var(--bg-surface, #f8fafc);\n}\n.step-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 12px;\n}\n.step-num {\n  width: 26px;\n  height: 26px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 900;\n  flex-shrink: 0;\n}\n.form-group {\n  margin-bottom: 12px;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.form-label {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.form-label .required {\n  color: #ef4444;\n}\n.form-input,\n.form-select {\n  width: 100%;\n  padding: 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input:focus,\n.form-select:focus {\n  border-color: #3b82f6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n@media (max-width: 768px) {\n  .page-header {\n    flex-direction: column;\n    gap: 14px;\n    align-items: flex-start;\n  }\n  .stats-row {\n    flex-direction: column;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n  .modal-3d {\n    border-radius: 16px;\n  }\n  .rate-row-3d {\n    flex-wrap: wrap;\n  }\n  .converter-body {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=exchange-rates.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExchangeRatesComponent, { className: "ExchangeRatesComponent", filePath: "src/app/pages/exchange-rates/exchange-rates.ts", lineNumber: 17 });
})();
export {
  ExchangeRatesComponent
};
//# sourceMappingURL=chunk-VII5JEKM.js.map
