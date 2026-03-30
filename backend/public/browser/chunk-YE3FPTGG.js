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
  __spreadValues,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
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

// src/app/pages/funds/funds.ts
var _c0 = () => ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#607D8B", "#E91E63", "#00BCD4", "#F44336", "#795548", "#3F51B5"];
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function FundsComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function FundsComponent_For_22_Template_button_click_0_listener() {
      const t_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeFilter.set(t_r2.value));
    });
    \u0275\u0275elementStart(1, "span", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 21);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 22);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activeFilter() === t_r2.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r2.count);
  }
}
function FundsComponent_For_30_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("background", t_r5.color + "20")("color", t_r5.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("#", t_r5.sequenceNumber);
  }
}
function FundsComponent_For_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, FundsComponent_For_30_Conditional_3_Template, 2, 5, "span", 24);
    \u0275\u0275elementStart(4, "span", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 26);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 27);
    \u0275\u0275listener("click", function FundsComponent_For_30_Template_button_click_8_listener() {
      const t_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEditType(t_r5));
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 28);
    \u0275\u0275listener("click", function FundsComponent_For_30_Template_button_click_11_listener() {
      const t_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmDelete("type", t_r5.id, t_r5.name));
    });
    \u0275\u0275elementStart(12, "span", 4);
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    \u0275\u0275styleProp("border-color", t_r5.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", t_r5.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r5.icon);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r5.sequenceNumber ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", t_r5.subTypeKey, ")");
  }
}
function FundsComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 30);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function FundsComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 4);
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0646\u0627\u062F\u064A\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 31);
    \u0275\u0275listener("click", function FundsComponent_Conditional_32_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openAddAccount());
    });
    \u0275\u0275elementStart(6, "span", 4);
    \u0275\u0275text(7, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " \u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u062F\u0648\u0642");
    \u0275\u0275elementEnd()();
  }
}
function FundsComponent_Conditional_33_For_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const acc_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("#", acc_r8.sequenceNumber);
  }
}
function FundsComponent_Conditional_33_For_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const acc_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(acc_r8.code);
  }
}
function FundsComponent_Conditional_33_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 4);
    \u0275\u0275text(2, "ev_station");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const acc_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", acc_r8.stationName);
  }
}
function FundsComponent_Conditional_33_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 4);
    \u0275\u0275text(2, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const acc_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", acc_r8.responsiblePerson);
  }
}
function FundsComponent_Conditional_33_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34)(2, "div", 35)(3, "span", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 36)(6, "button", 37);
    \u0275\u0275listener("click", function FundsComponent_Conditional_33_For_2_Template_button_click_6_listener() {
      const acc_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEditAccount(acc_r8));
    });
    \u0275\u0275elementStart(7, "span", 4);
    \u0275\u0275text(8, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 38);
    \u0275\u0275listener("click", function FundsComponent_Conditional_33_For_2_Template_button_click_9_listener() {
      const acc_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.confirmDelete("fund", acc_r8.id, acc_r8.name));
    });
    \u0275\u0275elementStart(10, "span", 4);
    \u0275\u0275text(11, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "h3", 39);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 40)(15, "span", 41);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, FundsComponent_Conditional_33_For_2_Conditional_17_Template, 2, 1, "span", 42);
    \u0275\u0275conditionalCreate(18, FundsComponent_Conditional_33_For_2_Conditional_18_Template, 2, 1, "span", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, FundsComponent_Conditional_33_For_2_Conditional_19_Template, 4, 1, "div", 44);
    \u0275\u0275conditionalCreate(20, FundsComponent_Conditional_33_For_2_Conditional_20_Template, 4, 1, "div", 44);
    \u0275\u0275elementStart(21, "div", 45)(22, "span", 4);
    \u0275\u0275text(23, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 46);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 47);
    \u0275\u0275element(27, "span", 48);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const acc_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("border-right-color", ctx_r2.getTypeInfo(acc_r8.fundType).color);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", "linear-gradient(135deg, " + ctx_r2.getTypeInfo(acc_r8.fundType).color + ", " + ctx_r2.getTypeInfo(acc_r8.fundType).color + "99)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getTypeInfo(acc_r8.fundType).icon);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(acc_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r2.getTypeInfo(acc_r8.fundType).color)("background", ctx_r2.getTypeInfo(acc_r8.fundType).color + "20");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getTypeInfo(acc_r8.fundType).name);
    \u0275\u0275advance();
    \u0275\u0275conditional(acc_r8.sequenceNumber ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(acc_r8.code ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(acc_r8.stationName ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(acc_r8.responsiblePerson ? 20 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.getBalanceDisplay(acc_r8));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", acc_r8.isActive);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", acc_r8.isActive ? "\u0646\u0634\u0637" : "\u0645\u062A\u0648\u0642\u0641", " ");
  }
}
function FundsComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275repeaterCreate(1, FundsComponent_Conditional_33_For_2_Template, 29, 19, "div", 32, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.filteredAccounts());
  }
}
function FundsComponent_Conditional_34_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r10 = ctx.$implicit;
    \u0275\u0275property("value", t_r10.subTypeKey);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r10.name);
  }
}
function FundsComponent_Conditional_34_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 62);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r11 = ctx.$implicit;
    \u0275\u0275property("ngValue", s_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r11.name);
  }
}
function FundsComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275listener("click", function FundsComponent_Conditional_34_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFundForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 50);
    \u0275\u0275listener("click", function FundsComponent_Conditional_34_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 51)(3, "div", 52)(4, "div", 53)(5, "span", 4);
    \u0275\u0275text(6, "inventory_2");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0625\u062F\u0627\u0631\u0629 \u0635\u0646\u0627\u062F\u064A\u0642 \u0627\u0644\u0646\u0642\u062F \u0648\u0627\u0644\u062A\u062D\u0635\u064A\u0644");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 54);
    \u0275\u0275listener("click", function FundsComponent_Conditional_34_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFundForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 4);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 55)(16, "div", 56)(17, "div", 57)(18, "label");
    \u0275\u0275text(19, "\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u062F\u0648\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 58);
    \u0275\u0275twoWayListener("ngModelChange", function FundsComponent_Conditional_34_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.fundForm.name, $event) || (ctx_r2.fundForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 57)(22, "label");
    \u0275\u0275text(23, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "select", 59);
    \u0275\u0275twoWayListener("ngModelChange", function FundsComponent_Conditional_34_Template_select_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.fundForm.fundType, $event) || (ctx_r2.fundForm.fundType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(25, FundsComponent_Conditional_34_For_26_Template, 2, 2, "option", 60, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 56)(28, "div", 57)(29, "label");
    \u0275\u0275text(30, "\u0631\u0642\u0645 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 61);
    \u0275\u0275twoWayListener("ngModelChange", function FundsComponent_Conditional_34_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.fundForm.sequenceNumber, $event) || (ctx_r2.fundForm.sequenceNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 56)(33, "div", 57)(34, "label");
    \u0275\u0275text(35, "\u0627\u0644\u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "select", 59);
    \u0275\u0275twoWayListener("ngModelChange", function FundsComponent_Conditional_34_Template_select_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.fundForm.stationId, $event) || (ctx_r2.fundForm.stationId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(37, "option", 62);
    \u0275\u0275text(38, "-- \u0628\u062F\u0648\u0646 \u0645\u062D\u0637\u0629 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(39, FundsComponent_Conditional_34_For_40_Template, 2, 2, "option", 62, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 57)(42, "label");
    \u0275\u0275text(43, "\u0627\u0644\u0645\u0633\u0624\u0648\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function FundsComponent_Conditional_34_Template_input_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.fundForm.responsiblePerson, $event) || (ctx_r2.fundForm.responsiblePerson = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 57)(46, "label");
    \u0275\u0275text(47, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "textarea", 64);
    \u0275\u0275twoWayListener("ngModelChange", function FundsComponent_Conditional_34_Template_textarea_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.fundForm.description, $event) || (ctx_r2.fundForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 57)(50, "label");
    \u0275\u0275text(51, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "textarea", 65);
    \u0275\u0275twoWayListener("ngModelChange", function FundsComponent_Conditional_34_Template_textarea_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.fundForm.notes, $event) || (ctx_r2.fundForm.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 66)(54, "button", 67);
    \u0275\u0275listener("click", function FundsComponent_Conditional_34_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveAccount());
    });
    \u0275\u0275elementStart(55, "span", 4);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd();
    \u0275\u0275text(57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 68);
    \u0275\u0275listener("click", function FundsComponent_Conditional_34_Template_button_click_58_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showFundForm.set(false));
    });
    \u0275\u0275text(59, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.editingFundId() ? "\u062A\u0639\u062F\u064A\u0644 \u0635\u0646\u062F\u0648\u0642" : "\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u062F\u0648\u0642 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.fundForm.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.fundForm.fundType);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.fundTypes());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.fundForm.sequenceNumber);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.fundForm.stationId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.stations());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.fundForm.responsiblePerson);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.fundForm.description);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.fundForm.notes);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.editingFundId() ? "save" : "add");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.editingFundId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0635\u0646\u062F\u0648\u0642", " ");
  }
}
function FundsComponent_Conditional_35_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 77);
    \u0275\u0275listener("click", function FundsComponent_Conditional_35_For_34_Template_button_click_0_listener() {
      const icon_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.typeForm.icon = icon_r14);
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const icon_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r2.typeForm.icon === icon_r14);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(icon_r14);
  }
}
function FundsComponent_Conditional_35_For_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 78);
    \u0275\u0275listener("click", function FundsComponent_Conditional_35_For_40_Template_button_click_0_listener() {
      const c_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.typeForm.color = c_r16);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("background", c_r16);
    \u0275\u0275classProp("selected", ctx_r2.typeForm.color === c_r16);
  }
}
function FundsComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275listener("click", function FundsComponent_Conditional_35_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showTypeForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 50);
    \u0275\u0275listener("click", function FundsComponent_Conditional_35_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 51)(3, "div", 52)(4, "div", 69)(5, "span", 4);
    \u0275\u0275text(6, "category");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 \u062A\u0638\u0647\u0631 \u0643\u0641\u0644\u0627\u062A\u0631 \u0641\u0631\u0639\u064A\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 54);
    \u0275\u0275listener("click", function FundsComponent_Conditional_35_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showTypeForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 4);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 55)(16, "div", 56)(17, "div", 57)(18, "label");
    \u0275\u0275text(19, "\u0627\u0633\u0645 \u0627\u0644\u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function FundsComponent_Conditional_35_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.typeForm.name, $event) || (ctx_r2.typeForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 57)(22, "label");
    \u0275\u0275text(23, "\u0627\u0644\u0645\u0641\u062A\u0627\u062D (\u0628\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 71);
    \u0275\u0275twoWayListener("ngModelChange", function FundsComponent_Conditional_35_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.typeForm.subTypeKey, $event) || (ctx_r2.typeForm.subTypeKey = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 57)(26, "label");
    \u0275\u0275text(27, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "textarea", 72);
    \u0275\u0275twoWayListener("ngModelChange", function FundsComponent_Conditional_35_Template_textarea_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.typeForm.description, $event) || (ctx_r2.typeForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 57)(30, "label");
    \u0275\u0275text(31, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 73);
    \u0275\u0275repeaterCreate(33, FundsComponent_Conditional_35_For_34_Template, 3, 3, "button", 74, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 57)(36, "label");
    \u0275\u0275text(37, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 75);
    \u0275\u0275repeaterCreate(39, FundsComponent_Conditional_35_For_40_Template, 1, 4, "button", 76, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div", 66)(42, "button", 67);
    \u0275\u0275listener("click", function FundsComponent_Conditional_35_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveType());
    });
    \u0275\u0275elementStart(43, "span", 4);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd();
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "button", 68);
    \u0275\u0275listener("click", function FundsComponent_Conditional_35_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showTypeForm.set(false));
    });
    \u0275\u0275text(47, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.editingTypeId() ? "\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0646\u064A\u0641" : "\u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.typeForm.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.typeForm.subTypeKey);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.typeForm.description);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.iconOptions);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(6, _c0));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.editingTypeId() ? "save" : "add");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.editingTypeId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0635\u0646\u064A\u0641", " ");
  }
}
function FundsComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275listener("click", function FundsComponent_Conditional_36_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showDeleteConfirm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 79);
    \u0275\u0275listener("click", function FundsComponent_Conditional_36_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 51)(3, "div", 52)(4, "div", 80)(5, "span", 4);
    \u0275\u0275text(6, "warning");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h2");
    \u0275\u0275text(8, "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 54);
    \u0275\u0275listener("click", function FundsComponent_Conditional_36_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showDeleteConfirm.set(false));
    });
    \u0275\u0275elementStart(10, "span", 4);
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 55)(13, "p", 81);
    \u0275\u0275text(14, "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 ");
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, "\u061F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p", 82);
    \u0275\u0275text(19, "\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 66)(21, "button", 83);
    \u0275\u0275listener("click", function FundsComponent_Conditional_36_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.executeDelete());
    });
    \u0275\u0275elementStart(22, "span", 4);
    \u0275\u0275text(23, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " \u062D\u0630\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 68);
    \u0275\u0275listener("click", function FundsComponent_Conditional_36_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showDeleteConfirm.set(false));
    });
    \u0275\u0275text(26, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r2.deleteTarget()) == null ? null : tmp_1_0.name);
  }
}
var FundsComponent = class _FundsComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  // إصلاح #4: استخدام funds بدلاً من accounts
  fundsData = signal([], ...ngDevMode ? [{ debugName: "fundsData" }] : (
    /* istanbul ignore next */
    []
  ));
  fundTypes = signal([], ...ngDevMode ? [{ debugName: "fundTypes" }] : (
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
  activeFilter = signal("all", ...ngDevMode ? [{ debugName: "activeFilter" }] : (
    /* istanbul ignore next */
    []
  ));
  // Fund form
  showFundForm = signal(false, ...ngDevMode ? [{ debugName: "showFundForm" }] : (
    /* istanbul ignore next */
    []
  ));
  editingFundId = signal(null, ...ngDevMode ? [{ debugName: "editingFundId" }] : (
    /* istanbul ignore next */
    []
  ));
  fundForm = { name: "", fundType: "", sequenceNumber: "", responsiblePerson: "", stationId: null, description: "", notes: "" };
  // Type form
  showTypeForm = signal(false, ...ngDevMode ? [{ debugName: "showTypeForm" }] : (
    /* istanbul ignore next */
    []
  ));
  editingTypeId = signal(null, ...ngDevMode ? [{ debugName: "editingTypeId" }] : (
    /* istanbul ignore next */
    []
  ));
  typeForm = { name: "", subTypeKey: "", description: "", icon: "savings", color: "#4CAF50" };
  // Delete confirm
  showDeleteConfirm = signal(false, ...ngDevMode ? [{ debugName: "showDeleteConfirm" }] : (
    /* istanbul ignore next */
    []
  ));
  deleteTarget = signal(null, ...ngDevMode ? [{ debugName: "deleteTarget" }] : (
    /* istanbul ignore next */
    []
  ));
  iconOptions = [
    "savings",
    "account_balance_wallet",
    "receipt_long",
    "payments",
    "lock",
    "person",
    "inventory_2",
    "request_quote",
    "shopping_cart",
    "move_to_inbox",
    "attach_money",
    "monetization_on",
    "credit_card",
    "toll",
    "local_atm"
  ];
  // Backward compatibility aliases
  get accounts() {
    return this.fundsData;
  }
  showAccountForm = this.showFundForm;
  editingAccountId = this.editingFundId;
  get accountForm() {
    return this.fundForm;
  }
  set accountForm(v) {
    this.fundForm = v;
  }
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const [fundsList, types, sts] = await Promise.all([
        this.api.getFunds(this.bizId, true),
        this.api.getFundTypes(this.bizId),
        this.api.getStations(this.bizId)
      ]);
      this.fundsData.set(fundsList);
      this.fundTypes.set(types);
      this.stations.set(sts);
      this.activeFilter.set("all");
      const allowedFilters = /* @__PURE__ */ new Set([
        "all",
        ...types.filter((t) => t.subTypeKey !== "custody").map((t) => String(t.subTypeKey))
      ]);
      if (!allowedFilters.has(this.activeFilter())) {
        this.activeFilter.set("all");
      }
    } catch (e) {
      console.error(e);
    }
    this.loading.set(false);
  }
  getFilterTabs() {
    return [
      { value: "all", label: "\u0627\u0644\u0643\u0644", icon: "apps", count: this.fundsData().length },
      ...this.fundTypes().map((t) => ({
        value: t.subTypeKey,
        label: t.name,
        icon: t.icon,
        count: this.fundsData().filter((f) => f.fundType === t.subTypeKey).length
      }))
    ];
  }
  filteredAccounts() {
    const f = this.activeFilter();
    if (f === "all")
      return this.fundsData();
    return this.fundsData().filter((fund) => fund.fundType === f);
  }
  getTypeInfo(fundType) {
    const t = this.fundTypes().find((ft) => ft.subTypeKey === fundType);
    return t || { name: fundType || "\u063A\u064A\u0631 \u0645\u0635\u0646\u0641", icon: "inventory_2", color: "#607D8B" };
  }
  // ============ Fund CRUD ============
  openAddAccount(subType) {
    if (!this.fundTypes().length) {
      this.toast.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u062F\u0648\u0642 \u0628\u062F\u0648\u0646 \u062A\u0635\u0646\u064A\u0641. \u0623\u0636\u0641 \u062A\u0635\u0646\u064A\u0641 \u0635\u0646\u062F\u0648\u0642 \u0623\u0648\u0644\u0627\u064B.");
      return;
    }
    this.fundForm = {
      name: "",
      fundType: subType || (this.fundTypes().length ? this.fundTypes()[0].subTypeKey : ""),
      sequenceNumber: "",
      responsiblePerson: "",
      stationId: null,
      description: "",
      notes: ""
    };
    this.editingFundId.set(null);
    this.showFundForm.set(true);
  }
  openEditAccount(fund) {
    this.fundForm = {
      name: fund.name,
      fundType: fund.fundType || "",
      sequenceNumber: fund.sequenceNumber ?? "",
      responsiblePerson: fund.responsiblePerson || "",
      stationId: fund.stationId || null,
      description: fund.description || "",
      notes: fund.notes || ""
    };
    this.editingFundId.set(fund.id);
    this.showFundForm.set(true);
  }
  async saveAccount() {
    try {
      const data = __spreadValues({}, this.fundForm);
      const selectedType = String(data.fundType || "").trim();
      const hasType = this.fundTypes().some((t) => String(t.subTypeKey) === selectedType);
      if (!selectedType || !hasType) {
        this.toast.error("\u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0635\u0646\u064A\u0641 \u0635\u0646\u062F\u0648\u0642 \u0635\u062D\u064A\u062D \u0625\u0644\u0632\u0627\u0645\u064A \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638");
        return;
      }
      if (data.stationId === "" || data.stationId === null)
        delete data.stationId;
      if (data.sequenceNumber === "" || data.sequenceNumber === null || data.sequenceNumber === void 0) {
        delete data.sequenceNumber;
      } else {
        const n = Number.parseInt(String(data.sequenceNumber), 10);
        if (!Number.isInteger(n) || n <= 0) {
          this.toast.error("\u0631\u0642\u0645 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");
          return;
        }
        data.sequenceNumber = n;
      }
      if (this.editingFundId()) {
        await this.api.updateFund(this.bizId, this.editingFundId(), data);
      } else {
        await this.api.createFund(this.bizId, data);
      }
      this.showFundForm.set(false);
      this.toast.success(this.editingFundId() ? "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0628\u0646\u062C\u0627\u062D" : "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0628\u0646\u062C\u0627\u062D");
      await this.load();
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0635\u0646\u062F\u0648\u0642");
    }
  }
  // ============ Type CRUD ============
  openAddType() {
    this.typeForm = { name: "", subTypeKey: "", description: "", icon: "savings", color: "#4CAF50" };
    this.editingTypeId.set(null);
    this.showTypeForm.set(true);
  }
  openEditType(t) {
    this.typeForm = { name: t.name, subTypeKey: t.subTypeKey, description: t.description || "", icon: t.icon || "savings", color: t.color || "#4CAF50" };
    this.editingTypeId.set(t.id);
    this.showTypeForm.set(true);
  }
  async saveType() {
    try {
      if (this.editingTypeId()) {
        await this.api.updateFundType(this.editingTypeId(), this.typeForm);
      } else {
        await this.api.createFundType(this.bizId, this.typeForm);
      }
      this.showTypeForm.set(false);
      this.toast.success(this.editingTypeId() ? "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0648\u0639 \u0628\u0646\u062C\u0627\u062D" : "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0646\u0648\u0639 \u0628\u0646\u062C\u0627\u062D");
      await this.load();
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0646\u0648\u0639");
    }
  }
  // ============ Delete ============
  confirmDelete(type, id, name) {
    const actualType = type === "account" ? "fund" : type;
    this.deleteTarget.set({ type: actualType === "fund" ? "fund" : "type", id, name });
    this.showDeleteConfirm.set(true);
  }
  async executeDelete() {
    const target = this.deleteTarget();
    if (!target)
      return;
    try {
      if (target.type === "fund") {
        await this.api.deleteFund(this.bizId, target.id);
      } else {
        await this.api.deleteFundType(target.id);
      }
      this.showDeleteConfirm.set(false);
      this.deleteTarget.set(null);
      this.toast.success("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641 \u0628\u0646\u062C\u0627\u062D");
      await this.load();
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641");
    }
  }
  getBalanceDisplay(fund) {
    if (!fund.balances || fund.balances.length === 0)
      return "0";
    return fund.balances.map((b) => `${Number(b.balance).toLocaleString()} ${b.currencySymbol || ""}`).join(" | ");
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275FundsComponent_BaseFactory;
    return function FundsComponent_Factory(__ngFactoryType__) {
      return (\u0275FundsComponent_BaseFactory || (\u0275FundsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_FundsComponent)))(__ngFactoryType__ || _FundsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FundsComponent, selectors: [["app-funds"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 37, vars: 6, consts: [[1, "page-content"], [1, "page-header"], [1, "page-title-area"], [1, "page-icon", "green"], [1, "material-icons-round"], [1, "page-subtitle"], [1, "header-actions"], [1, "add-btn", "secondary", 3, "click"], [1, "add-btn", 3, "click"], [1, "filter-tabs"], [1, "filter-tab", 3, "active"], [1, "types-bar"], [1, "types-bar-title"], [1, "types-list"], [1, "type-chip", 3, "border-color"], [1, "loading-state"], [1, "empty-state"], [1, "accounts-grid"], [1, "modal-overlay"], [1, "filter-tab", 3, "click"], [1, "material-icons-round", "tab-icon"], [1, "tab-label"], [1, "tab-count"], [1, "type-chip"], [1, "type-chip-seq", 3, "background", "color"], [1, "type-chip-name"], [1, "type-chip-key"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "chip-action", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "chip-action", "delete", 3, "click"], [1, "type-chip-seq"], [1, "material-icons-round", "spin"], [1, "add-btn", "small", 3, "click"], [1, "account-card", 3, "border-right-color"], [1, "account-card"], [1, "card-header"], [1, "card-icon"], [1, "card-actions"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "action-btn", "edit", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "action-btn", "delete", 3, "click"], [1, "card-name"], [1, "card-badges"], [1, "card-type-badge"], [1, "card-seq-badge"], [1, "card-code-badge"], [1, "card-detail"], [1, "card-balance"], [1, "balance-text"], [1, "card-status"], [1, "status-dot"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "green"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], ["placeholder", "\u0645\u062B\u0627\u0644: \u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u062A\u062D\u0635\u064A\u0644 - \u0627\u0644\u062F\u0647\u0645\u064A\u0629", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], [3, "value"], ["placeholder", "\u0645\u062B\u0627\u0644: 13", "dir", "ltr", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0635\u0646\u062F\u0648\u0642", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u0635\u0646\u062F\u0648\u0642...", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629...", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"], [1, "modal-icon", "purple"], ["placeholder", "\u0645\u062B\u0627\u0644: \u062A\u062D\u0635\u064A\u0644 \u0648\u062A\u0648\u0631\u064A\u062F", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0645\u062B\u0627\u0644: collection", "dir", "ltr", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u062A\u0635\u0646\u064A\u0641...", 3, "ngModelChange", "ngModel"], [1, "icon-picker"], [1, "icon-option", 3, "selected"], [1, "color-picker"], [1, "color-option", 3, "background", "selected"], [1, "icon-option", 3, "click"], [1, "color-option", 3, "click"], [1, "modal-card", "small", 3, "click"], [1, "modal-icon", "red"], [1, "delete-msg"], [1, "delete-warn"], [1, "btn-delete", 3, "click"]], template: function FundsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "inventory_2");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h2");
      \u0275\u0275text(8, "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 5);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 6)(12, "button", 7);
      \u0275\u0275listener("click", function FundsComponent_Template_button_click_12_listener() {
        return ctx.openAddType();
      });
      \u0275\u0275elementStart(13, "span", 4);
      \u0275\u0275text(14, "category");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15, " \u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 8);
      \u0275\u0275listener("click", function FundsComponent_Template_button_click_16_listener() {
        return ctx.openAddAccount();
      });
      \u0275\u0275elementStart(17, "span", 4);
      \u0275\u0275text(18, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " \u0635\u0646\u062F\u0648\u0642 \u062C\u062F\u064A\u062F ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 9);
      \u0275\u0275repeaterCreate(21, FundsComponent_For_22_Template, 7, 5, "button", 10, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 11)(24, "div", 12)(25, "span", 4);
      \u0275\u0275text(26, "category");
      \u0275\u0275elementEnd();
      \u0275\u0275text(27, " \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 13);
      \u0275\u0275repeaterCreate(29, FundsComponent_For_30_Template, 14, 8, "div", 14, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(31, FundsComponent_Conditional_31_Template, 5, 0, "div", 15)(32, FundsComponent_Conditional_32_Template, 9, 0, "div", 16)(33, FundsComponent_Conditional_33_Template, 3, 0, "div", 17);
      \u0275\u0275conditionalCreate(34, FundsComponent_Conditional_34_Template, 60, 11, "div", 18);
      \u0275\u0275conditionalCreate(35, FundsComponent_Conditional_35_Template, 48, 7, "div", 18);
      \u0275\u0275conditionalCreate(36, FundsComponent_Conditional_36_Template, 27, 1, "div", 18);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate2("", ctx.accounts().length, " \u0635\u0646\u062F\u0648\u0642 \u0641\u064A ", ctx.fundTypes().length, " \u062A\u0635\u0646\u064A\u0641");
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.getFilterTabs());
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.fundTypes());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 31 : !ctx.filteredAccounts().length ? 32 : 33);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showFundForm() ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showTypeForm() ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDeleteConfirm() ? 36 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.page-title-area[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.page-title-area[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-top: 2px;\n}\n.page-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.page-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: white;\n}\n.page-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.page-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.page-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.page-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.add-btn.secondary[_ngcontent-%COMP%] {\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.add-btn.secondary[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  border-color: var(--border-strong);\n  box-shadow: var(--shadow-hover);\n}\n.add-btn.small[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  font-size: 13px;\n  margin-top: 12px;\n}\n.filter-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n  overflow-x: auto;\n  padding-bottom: 4px;\n}\n.filter-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.filter-tab[_ngcontent-%COMP%]   .tab-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.filter-tab[_ngcontent-%COMP%]   .tab-count[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 800;\n  padding: 1px 6px;\n  border-radius: 6px;\n  background: var(--bg-card);\n  min-width: 20px;\n  text-align: center;\n}\n.filter-tab[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n}\n.filter-tab.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.filter-tab.active[_ngcontent-%COMP%]   .tab-count[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n}\n.types-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  flex-wrap: wrap;\n}\n.types-bar-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  white-space: nowrap;\n}\n.types-bar-title[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.types-list[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  flex: 1;\n}\n.type-chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 10px;\n  border-radius: 8px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-right-width: 3px;\n  font-size: 12px;\n  transition: all 0.2s;\n}\n.type-chip[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.type-chip[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.type-chip-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.type-chip-key[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-muted);\n  font-size: 11px;\n}\n.chip-action[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border-radius: 5px;\n  border: none;\n  background: transparent;\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.chip-action[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.chip-action[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface);\n  color: var(--accent-blue);\n}\n.chip-action.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.accounts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n.account-card[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  border-right-width: 4px;\n  background: var(--bg-card);\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s;\n  position: relative;\n}\n.account-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: var(--shadow-hover);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n.card-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: white;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.card-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n  line-height: 1.4;\n}\n.card-type-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 6px;\n  margin-bottom: 10px;\n}\n.card-detail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-bottom: 4px;\n  font-weight: 600;\n}\n.card-detail[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.card-balance[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 10px;\n  padding-top: 10px;\n  border-top: 1px solid var(--border-color);\n}\n.card-balance[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--accent-green);\n}\n.balance-text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary);\n  direction: ltr;\n}\n.card-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 8px;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.status-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--text-faint);\n}\n.status-dot.active[_ngcontent-%COMP%] {\n  background: var(--accent-green);\n}\n.icon-picker[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.icon-option[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-option[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.icon-option[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent-blue);\n  color: var(--accent-blue);\n}\n.icon-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--accent-blue);\n  background: rgba(59, 130, 246, 0.1);\n  color: var(--accent-blue);\n}\n.color-picker[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.color-option[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: 3px solid transparent;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.color-option[_ngcontent-%COMP%]:hover {\n  transform: scale(1.15);\n}\n.color-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--text-primary);\n  box-shadow: 0 0 0 2px var(--bg-card);\n}\n.modal-card.small[_ngcontent-%COMP%] {\n  max-width: 440px;\n}\n.delete-msg[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 8px;\n}\n.delete-warn[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--accent-red);\n  font-weight: 600;\n}\n.btn-delete[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #dc2626);\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-delete[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.btn-delete[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);\n}\n.btn-save[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.btn-save[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n@media (max-width: 1200px) {\n  .accounts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 640px) {\n  .accounts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .add-btn[_ngcontent-%COMP%] {\n    flex: 1;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=funds.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FundsComponent, [{
    type: Component,
    args: [{ selector: "app-funds", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <!-- Header -->\r
  <div class="page-header">\r
    <div class="page-title-area">\r
      <div class="page-icon green"><span class="material-icons-round">inventory_2</span></div>\r
      <div>\r
        <h2>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642</h2>\r
        <p class="page-subtitle">{{ accounts().length }} \u0635\u0646\u062F\u0648\u0642 \u0641\u064A {{ fundTypes().length }} \u062A\u0635\u0646\u064A\u0641</p>\r
      </div>\r
    </div>\r
    <div class="header-actions">\r
      <button class="add-btn secondary" (click)="openAddType()">\r
        <span class="material-icons-round">category</span> \u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F\r
      </button>\r
      <button class="add-btn" (click)="openAddAccount()">\r
        <span class="material-icons-round">add</span> \u0635\u0646\u062F\u0648\u0642 \u062C\u062F\u064A\u062F\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Filter Tabs -->\r
  <div class="filter-tabs">\r
    @for (t of getFilterTabs(); track t.value) {\r
      <button class="filter-tab" [class.active]="activeFilter() === t.value" (click)="activeFilter.set(t.value)">\r
        <span class="material-icons-round tab-icon">{{ t.icon }}</span>\r
        <span class="tab-label">{{ t.label }}</span>\r
        <span class="tab-count">{{ t.count }}</span>\r
      </button>\r
    }\r
  </div>\r
\r
  <!-- Types Management Bar -->\r
  <div class="types-bar">\r
    <div class="types-bar-title"><span class="material-icons-round">category</span> \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A</div>\r
    <div class="types-list">\r
      @for (t of fundTypes(); track t.id) {\r
        <div class="type-chip" [style.border-color]="t.color">\r
          <span class="material-icons-round" [style.color]="t.color">{{ t.icon }}</span>\r
          @if (t.sequenceNumber) {\r
            <span class="type-chip-seq" [style.background]="t.color + '20'" [style.color]="t.color">#{{ t.sequenceNumber }}</span>\r
          }\r
          <span class="type-chip-name">{{ t.name }}</span>\r
          <span class="type-chip-key">({{ t.subTypeKey }})</span>\r
          <button class="chip-action" (click)="openEditType(t)" title="\u062A\u0639\u062F\u064A\u0644"><span class="material-icons-round">edit</span></button>\r
          <button class="chip-action delete" (click)="confirmDelete('type', t.id, t.name)" title="\u062D\u0630\u0641"><span class="material-icons-round">close</span></button>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
\r
  <!-- Content -->\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!filteredAccounts().length) {\r
    <div class="empty-state">\r
      <span class="material-icons-round">inventory_2</span>\r
      <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0646\u0627\u062F\u064A\u0642</p>\r
      <button class="add-btn small" (click)="openAddAccount()"><span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u062F\u0648\u0642</button>\r
    </div>\r
  } @else {\r
    <div class="accounts-grid">\r
      @for (acc of filteredAccounts(); track acc.id) {\r
        <div class="account-card" [style.border-right-color]="getTypeInfo(acc.fundType).color">\r
          <div class="card-header">\r
            <div class="card-icon" [style.background]="'linear-gradient(135deg, ' + getTypeInfo(acc.fundType).color + ', ' + getTypeInfo(acc.fundType).color + '99)'">\r
              <span class="material-icons-round">{{ getTypeInfo(acc.fundType).icon }}</span>\r
            </div>\r
            <div class="card-actions">\r
              <button class="action-btn edit" (click)="openEditAccount(acc)" title="\u062A\u0639\u062F\u064A\u0644"><span class="material-icons-round">edit</span></button>\r
              <button class="action-btn delete" (click)="confirmDelete('fund', acc.id, acc.name)" title="\u062D\u0630\u0641"><span class="material-icons-round">delete</span></button>\r
            </div>\r
          </div>\r
          <h3 class="card-name">{{ acc.name }}</h3>\r
          <div class="card-badges">\r
            <span class="card-type-badge" [style.color]="getTypeInfo(acc.fundType).color" [style.background]="getTypeInfo(acc.fundType).color + '20'">{{ getTypeInfo(acc.fundType).name }}</span>\r
            @if (acc.sequenceNumber) {\r
              <span class="card-seq-badge">#{{ acc.sequenceNumber }}</span>\r
            }\r
            @if (acc.code) {\r
              <span class="card-code-badge">{{ acc.code }}</span>\r
            }\r
          </div>\r
          @if (acc.stationName) {\r
            <div class="card-detail"><span class="material-icons-round">ev_station</span> {{ acc.stationName }}</div>\r
          }\r
          @if (acc.responsiblePerson) {\r
            <div class="card-detail"><span class="material-icons-round">person</span> {{ acc.responsiblePerson }}</div>\r
          }\r
          <div class="card-balance">\r
            <span class="material-icons-round">account_balance_wallet</span>\r
            <span class="balance-text">{{ getBalanceDisplay(acc) }}</span>\r
          </div>\r
          <div class="card-status">\r
            <span class="status-dot" [class.active]="acc.isActive"></span>\r
            {{ acc.isActive ? '\u0646\u0634\u0637' : '\u0645\u062A\u0648\u0642\u0641' }}\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- Fund Form Modal -->\r
  @if (showFundForm()) {\r
    <div class="modal-overlay" (click)="showFundForm.set(false)">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon green"><span class="material-icons-round">inventory_2</span></div>\r
            <div>\r
              <h2>{{ editingFundId() ? '\u062A\u0639\u062F\u064A\u0644 \u0635\u0646\u062F\u0648\u0642' : '\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u062F\u0648\u0642 \u062C\u062F\u064A\u062F' }}</h2>\r
              <p>\u0625\u062F\u0627\u0631\u0629 \u0635\u0646\u0627\u062F\u064A\u0642 \u0627\u0644\u0646\u0642\u062F \u0648\u0627\u0644\u062A\u062D\u0635\u064A\u0644</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showFundForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u062F\u0648\u0642</label>\r
              <input [(ngModel)]="fundForm.name" placeholder="\u0645\u062B\u0627\u0644: \u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u062A\u062D\u0635\u064A\u0644 - \u0627\u0644\u062F\u0647\u0645\u064A\u0629" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u062A\u0635\u0646\u064A\u0641</label>\r
              <select [(ngModel)]="fundForm.fundType">\r
                @for (t of fundTypes(); track t.id) {\r
                  <option [value]="t.subTypeKey">{{ t.name }}</option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0631\u0642\u0645 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>\r
              <input [(ngModel)]="fundForm.sequenceNumber" placeholder="\u0645\u062B\u0627\u0644: 13" dir="ltr" />\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u062D\u0637\u0629</label>\r
              <select [(ngModel)]="fundForm.stationId">\r
                <option [ngValue]="null">-- \u0628\u062F\u0648\u0646 \u0645\u062D\u0637\u0629 --</option>\r
                @for (s of stations(); track s.id) {\r
                  <option [ngValue]="s.id">{{ s.name }}</option>\r
                }\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0633\u0624\u0648\u0644</label>\r
              <input [(ngModel)]="fundForm.responsiblePerson" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u0635\u0646\u062F\u0648\u0642" />\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0648\u0635\u0641</label>\r
            <textarea [(ngModel)]="fundForm.description" rows="2" placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u0635\u0646\u062F\u0648\u0642..."></textarea>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>\r
            <textarea [(ngModel)]="fundForm.notes" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629..."></textarea>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="saveAccount()">\r
            <span class="material-icons-round">{{ editingFundId() ? 'save' : 'add' }}</span>\r
            {{ editingFundId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0635\u0646\u062F\u0648\u0642' }}\r
          </button>\r
          <button class="btn-cancel" (click)="showFundForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Type Form Modal -->\r
  @if (showTypeForm()) {\r
    <div class="modal-overlay" (click)="showTypeForm.set(false)">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon purple"><span class="material-icons-round">category</span></div>\r
            <div>\r
              <h2>{{ editingTypeId() ? '\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0646\u064A\u0641' : '\u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F' }}</h2>\r
              <p>\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 \u062A\u0638\u0647\u0631 \u0643\u0641\u0644\u0627\u062A\u0631 \u0641\u0631\u0639\u064A\u0629</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showTypeForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0633\u0645 \u0627\u0644\u062A\u0635\u0646\u064A\u0641</label>\r
              <input [(ngModel)]="typeForm.name" placeholder="\u0645\u062B\u0627\u0644: \u062A\u062D\u0635\u064A\u0644 \u0648\u062A\u0648\u0631\u064A\u062F" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0641\u062A\u0627\u062D (\u0628\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A)</label>\r
              <input [(ngModel)]="typeForm.subTypeKey" placeholder="\u0645\u062B\u0627\u0644: collection" dir="ltr" />\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0648\u0635\u0641</label>\r
            <textarea [(ngModel)]="typeForm.description" rows="2" placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u062A\u0635\u0646\u064A\u0641..."></textarea>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
            <div class="icon-picker">\r
              @for (icon of iconOptions; track icon) {\r
                <button class="icon-option" [class.selected]="typeForm.icon === icon" (click)="typeForm.icon = icon">\r
                  <span class="material-icons-round">{{ icon }}</span>\r
                </button>\r
              }\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0644\u0648\u0646</label>\r
            <div class="color-picker">\r
              @for (c of ['#4CAF50','#2196F3','#FF9800','#9C27B0','#607D8B','#E91E63','#00BCD4','#F44336','#795548','#3F51B5']; track c) {\r
                <button class="color-option" [style.background]="c" [class.selected]="typeForm.color === c" (click)="typeForm.color = c"></button>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="saveType()">\r
            <span class="material-icons-round">{{ editingTypeId() ? 'save' : 'add' }}</span>\r
            {{ editingTypeId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0635\u0646\u064A\u0641' }}\r
          </button>\r
          <button class="btn-cancel" (click)="showTypeForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- Delete Confirmation -->\r
  @if (showDeleteConfirm()) {\r
    <div class="modal-overlay" (click)="showDeleteConfirm.set(false)">\r
      <div class="modal-card small" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon red"><span class="material-icons-round">warning</span></div>\r
            <h2>\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641</h2>\r
          </div>\r
          <button class="close-btn" (click)="showDeleteConfirm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <p class="delete-msg">\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 <strong>{{ deleteTarget()?.name }}</strong>\u061F</p>\r
          <p class="delete-warn">\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647</p>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-delete" (click)="executeDelete()"><span class="material-icons-round">delete</span> \u062D\u0630\u0641</button>\r
          <button class="btn-cancel" (click)="showDeleteConfirm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/funds/funds.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.page-header {\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.page-title-area {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.page-title-area h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0;\n}\n.page-subtitle {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-top: 2px;\n}\n.page-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.page-icon .material-icons-round {\n  font-size: 26px;\n  color: white;\n}\n.page-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.page-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.page-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.page-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.header-actions {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.add-btn.secondary {\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.add-btn.secondary:hover {\n  background: var(--bg-card-hover);\n  border-color: var(--border-strong);\n  box-shadow: var(--shadow-hover);\n}\n.add-btn.small {\n  padding: 8px 16px;\n  font-size: 13px;\n  margin-top: 12px;\n}\n.filter-tabs {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n  overflow-x: auto;\n  padding-bottom: 4px;\n}\n.filter-tab {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.filter-tab .tab-icon {\n  font-size: 16px;\n}\n.filter-tab .tab-count {\n  font-size: 11px;\n  font-weight: 800;\n  padding: 1px 6px;\n  border-radius: 6px;\n  background: var(--bg-card);\n  min-width: 20px;\n  text-align: center;\n}\n.filter-tab:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n}\n.filter-tab.active {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.filter-tab.active .tab-count {\n  background: rgba(255, 255, 255, 0.2);\n}\n.types-bar {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  flex-wrap: wrap;\n}\n.types-bar-title {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  white-space: nowrap;\n}\n.types-bar-title .material-icons-round {\n  font-size: 18px;\n}\n.types-list {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  flex: 1;\n}\n.type-chip {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 10px;\n  border-radius: 8px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-right-width: 3px;\n  font-size: 12px;\n  transition: all 0.2s;\n}\n.type-chip .material-icons-round {\n  font-size: 16px;\n}\n.type-chip:hover {\n  background: var(--bg-card-hover);\n}\n.type-chip-name {\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.type-chip-key {\n  font-weight: 600;\n  color: var(--text-muted);\n  font-size: 11px;\n}\n.chip-action {\n  width: 22px;\n  height: 22px;\n  border-radius: 5px;\n  border: none;\n  background: transparent;\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.chip-action .material-icons-round {\n  font-size: 14px;\n}\n.chip-action:hover {\n  background: var(--bg-surface);\n  color: var(--accent-blue);\n}\n.chip-action.delete:hover {\n  color: var(--accent-red);\n}\n.accounts-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n.account-card {\n  padding: 20px;\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  border-right-width: 4px;\n  background: var(--bg-card);\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s;\n  position: relative;\n}\n.account-card:hover {\n  transform: translateY(-3px);\n  box-shadow: var(--shadow-hover);\n}\n.card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n.card-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-icon .material-icons-round {\n  font-size: 22px;\n  color: white;\n}\n.card-actions {\n  display: flex;\n  gap: 4px;\n}\n.card-name {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n  line-height: 1.4;\n}\n.card-type-badge {\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 6px;\n  margin-bottom: 10px;\n}\n.card-detail {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-bottom: 4px;\n  font-weight: 600;\n}\n.card-detail .material-icons-round {\n  font-size: 14px;\n}\n.card-balance {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 10px;\n  padding-top: 10px;\n  border-top: 1px solid var(--border-color);\n}\n.card-balance .material-icons-round {\n  font-size: 16px;\n  color: var(--accent-green);\n}\n.balance-text {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary);\n  direction: ltr;\n}\n.card-status {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 8px;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.status-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--text-faint);\n}\n.status-dot.active {\n  background: var(--accent-green);\n}\n.icon-picker {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.icon-option {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-option .material-icons-round {\n  font-size: 20px;\n}\n.icon-option:hover {\n  border-color: var(--accent-blue);\n  color: var(--accent-blue);\n}\n.icon-option.selected {\n  border-color: var(--accent-blue);\n  background: rgba(59, 130, 246, 0.1);\n  color: var(--accent-blue);\n}\n.color-picker {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.color-option {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: 3px solid transparent;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.color-option:hover {\n  transform: scale(1.15);\n}\n.color-option.selected {\n  border-color: var(--text-primary);\n  box-shadow: 0 0 0 2px var(--bg-card);\n}\n.modal-card.small {\n  max-width: 440px;\n}\n.delete-msg {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 8px;\n}\n.delete-warn {\n  font-size: 13px;\n  color: var(--accent-red);\n  font-weight: 600;\n}\n.btn-delete {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #dc2626);\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-delete .material-icons-round {\n  font-size: 18px;\n}\n.btn-delete:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);\n}\n.btn-save {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.btn-save .material-icons-round {\n  font-size: 18px;\n}\n@media (max-width: 1200px) {\n  .accounts-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 640px) {\n  .accounts-grid {\n    grid-template-columns: 1fr;\n  }\n  .header-actions {\n    width: 100%;\n  }\n  .add-btn {\n    flex: 1;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=funds.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FundsComponent, { className: "FundsComponent", filePath: "src/app/pages/funds/funds.ts", lineNumber: 18 });
})();
export {
  FundsComponent
};
//# sourceMappingURL=chunk-YE3FPTGG.js.map
