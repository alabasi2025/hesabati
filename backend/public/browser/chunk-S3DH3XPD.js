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

// src/app/pages/custody/custody.ts
var arrowFn0 = (ctx, view) => (r) => r.status === "active";
var arrowFn1 = (ctx, view) => (r) => r.status === "settled";
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.key;
function CustodyComponent_Conditional_10_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 21);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 22)(6, "span", 2);
    \u0275\u0275text(7, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const acc_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(acc_r1.code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(acc_r1.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u0627\u0644\u0631\u0635\u064A\u062F: ", (acc_r1.balances == null ? null : acc_r1.balances[0] == null ? null : acc_r1.balances[0].balance) || "0");
  }
}
function CustodyComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "h3")(2, "span", 2);
    \u0275\u0275text(3, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0639\u0647\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 18);
    \u0275\u0275repeaterCreate(6, CustodyComponent_Conditional_10_For_7_Template, 10, 3, "div", 19, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.custodyAccounts());
  }
}
function CustodyComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "span", 23);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function CustodyComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 2);
    \u0275\u0275text(2, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 24);
    \u0275\u0275text(6, "\u0623\u0646\u0634\u0626 \u0639\u0647\u062F\u0629 \u062C\u062F\u064A\u062F\u0629 \u0644\u062A\u062A\u0628\u0639 \u0627\u0644\u0623\u0645\u0627\u0646\u0627\u062A \u0648\u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0645\u0639\u0647\u0648\u062F\u0629");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0647\u062F ", ctx_r1.activeTab() === "permanent" ? "\u062F\u0627\u0626\u0645\u0629" : "\u0645\u0624\u0642\u062A\u0629", " \u0628\u0639\u062F");
  }
}
function CustodyComponent_Conditional_55_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 27);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "span", 28);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 29);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span", 30);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "button", 31);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_55_For_19_Template_button_click_18_listener() {
      const c_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewDetails(c_r4));
    });
    \u0275\u0275elementStart(19, "span", 2);
    \u0275\u0275text(20, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "button", 32);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_55_For_19_Template_button_click_21_listener() {
      const c_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEdit(c_r4));
    });
    \u0275\u0275elementStart(22, "span", 2);
    \u0275\u0275text(23, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "button", 33);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_55_For_19_Template_button_click_24_listener() {
      const c_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.remove(c_r4));
    });
    \u0275\u0275elementStart(25, "span", 2);
    \u0275\u0275text(26, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r4.custodyNumber || c_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r4.partyName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getPartyTypeLabel(c_r4.partyType));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getContentTypeLabel(c_r4.contentType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 8, c_r4.amount || 0));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getStatusClass(c_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel(c_r4.status));
  }
}
function CustodyComponent_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 16)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "\u0631\u0642\u0645 \u0627\u0644\u0639\u0647\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0633\u0645 \u0627\u0644\u0637\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0646\u0648\u0639 \u0627\u0644\u0637\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0646\u0648\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0625\u062C\u0631\u0627\u0621\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, CustodyComponent_Conditional_55_For_19_Template, 27, 10, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r1.filteredRecords);
  }
}
function CustodyComponent_Conditional_56_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "span", 43);
    \u0275\u0275text(2, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.viewingRecord().description);
  }
}
function CustodyComponent_Conditional_56_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_56_Conditional_50_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openSettle());
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0625\u0636\u0627\u0641\u0629 \u062A\u0633\u0648\u064A\u0629");
    \u0275\u0275elementEnd();
  }
}
function CustodyComponent_Conditional_56_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 50);
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0633\u0648\u064A\u0627\u062A \u0628\u0639\u062F");
    \u0275\u0275elementEnd();
  }
}
function CustodyComponent_Conditional_56_Conditional_52_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 29);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 3, s_r7.amount || 0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((s_r7.settledAt || s_r7.createdAt || "").split("T")[0]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r7.notes || "\u2014");
  }
}
function CustodyComponent_Conditional_56_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 51)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275repeaterCreate(10, CustodyComponent_Conditional_56_Conditional_52_For_11_Template, 8, 5, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r1.settlements());
  }
}
function CustodyComponent_Conditional_56_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "h4");
    \u0275\u0275text(2, "\u0625\u0636\u0627\u0641\u0629 \u062A\u0633\u0648\u064A\u0629 \u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 56)(4, "div", 57)(5, "label");
    \u0275\u0275text(6, "\u0645\u0628\u0644\u063A \u0627\u0644\u062A\u0633\u0648\u064A\u0629 ");
    \u0275\u0275elementStart(7, "span", 58);
    \u0275\u0275text(8, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function CustodyComponent_Conditional_56_Conditional_53_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.settleForm.amount, $event) || (ctx_r1.settleForm.amount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 57)(11, "label");
    \u0275\u0275text(12, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0633\u0648\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", function CustodyComponent_Conditional_56_Conditional_53_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.settleForm.settledAt, $event) || (ctx_r1.settleForm.settledAt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 57)(15, "label");
    \u0275\u0275text(16, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 61);
    \u0275\u0275twoWayListener("ngModelChange", function CustodyComponent_Conditional_56_Conditional_53_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.settleForm.notes, $event) || (ctx_r1.settleForm.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 62)(19, "button", 63);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_56_Conditional_53_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitSettle());
    });
    \u0275\u0275text(20, "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u0633\u0648\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 54);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_56_Conditional_53_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showSettleForm.set(false));
    });
    \u0275\u0275text(22, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.settleForm.amount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.settleForm.settledAt);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.settleForm.notes);
  }
}
function CustodyComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_56_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.viewingRecord.set(null));
    });
    \u0275\u0275elementStart(1, "div", 35);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_56_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 36)(3, "div", 37)(4, "div", 38)(5, "span", 2);
    \u0275\u0275text(6, "account_balance_wallet");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9, "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0639\u0647\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 39);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_56_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.viewingRecord.set(null));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 40)(16, "div", 41)(17, "div", 42)(18, "span", 43);
    \u0275\u0275text(19, "\u0646\u0648\u0639 \u0627\u0644\u0639\u0647\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 44);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 42)(23, "span", 43);
    \u0275\u0275text(24, "\u0646\u0648\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 44);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 42)(28, "span", 43);
    \u0275\u0275text(29, "\u0646\u0648\u0639 \u0627\u0644\u0637\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 44);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 42)(33, "span", 43);
    \u0275\u0275text(34, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 45);
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 42)(39, "span", 43);
    \u0275\u0275text(40, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 30);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(43, CustodyComponent_Conditional_56_Conditional_43_Template, 5, 1, "div", 46);
    \u0275\u0275elementStart(44, "div", 47)(45, "div", 48)(46, "h3")(47, "span", 2);
    \u0275\u0275text(48, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275text(49, " \u0627\u0644\u062A\u0633\u0648\u064A\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(50, CustodyComponent_Conditional_56_Conditional_50_Template, 4, 0, "button", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(51, CustodyComponent_Conditional_56_Conditional_51_Template, 2, 0, "p", 50)(52, CustodyComponent_Conditional_56_Conditional_52_Template, 12, 0, "table", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(53, CustodyComponent_Conditional_56_Conditional_53_Template, 23, 3, "div", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 53)(55, "button", 54);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_56_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.viewingRecord.set(null));
    });
    \u0275\u0275text(56, "\u0625\u063A\u0644\u0627\u0642");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate2("", ctx_r1.viewingRecord().partyName, " \u2014 ", ctx_r1.viewingRecord().custodyNumber || ctx_r1.viewingRecord().id);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.viewingRecord().custodyType === "permanent" ? "\u062F\u0627\u0626\u0645\u0629" : "\u0645\u0624\u0642\u062A\u0629");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getContentTypeLabel(ctx_r1.viewingRecord().contentType));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getPartyTypeLabel(ctx_r1.viewingRecord().partyType));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(37, 13, ctx_r1.viewingRecord().amount || 0));
    \u0275\u0275advance(5);
    \u0275\u0275classMap(ctx_r1.getStatusClass(ctx_r1.viewingRecord().status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel(ctx_r1.viewingRecord().status));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.viewingRecord().description ? 43 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.viewingRecord().status === "active" || ctx_r1.viewingRecord().status === "partially_settled" ? 50 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.settlements().length ? 51 : 52);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showSettleForm() ? 53 : -1);
  }
}
function CustodyComponent_Conditional_57_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 68);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ct_r10 = ctx.$implicit;
    \u0275\u0275property("value", ct_r10.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ct_r10.label);
  }
}
function CustodyComponent_Conditional_57_For_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 68);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pt_r11 = ctx.$implicit;
    \u0275\u0275property("value", pt_r11.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(pt_r11.label);
  }
}
function CustodyComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_57_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 64);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_57_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 36)(3, "div", 37)(4, "div", 38)(5, "span", 2);
    \u0275\u0275text(6, "account_balance_wallet");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0647\u062F \u0648\u0627\u0644\u0623\u0645\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0639\u0647\u0648\u062F\u0629 \u0644\u0644\u0623\u0637\u0631\u0627\u0641");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 39);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_57_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 40)(16, "div", 56)(17, "div", 57)(18, "label");
    \u0275\u0275text(19, "\u0646\u0648\u0639 \u0627\u0644\u0639\u0647\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "select", 65);
    \u0275\u0275twoWayListener("ngModelChange", function CustodyComponent_Conditional_57_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.custodyType, $event) || (ctx_r1.form.custodyType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(21, "option", 66);
    \u0275\u0275text(22, "\u062F\u0627\u0626\u0645\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option", 67);
    \u0275\u0275text(24, "\u0645\u0624\u0642\u062A\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 57)(26, "label");
    \u0275\u0275text(27, "\u0646\u0648\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "select", 65);
    \u0275\u0275twoWayListener("ngModelChange", function CustodyComponent_Conditional_57_Template_select_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.contentType, $event) || (ctx_r1.form.contentType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(29, CustodyComponent_Conditional_57_For_30_Template, 2, 2, "option", 68, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 56)(32, "div", 57)(33, "label");
    \u0275\u0275text(34, "\u0627\u0633\u0645 \u0627\u0644\u0637\u0631\u0641 ");
    \u0275\u0275elementStart(35, "span", 58);
    \u0275\u0275text(36, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", function CustodyComponent_Conditional_57_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.partyName, $event) || (ctx_r1.form.partyName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 57)(39, "label");
    \u0275\u0275text(40, "\u0646\u0648\u0639 \u0627\u0644\u0637\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "select", 65);
    \u0275\u0275twoWayListener("ngModelChange", function CustodyComponent_Conditional_57_Template_select_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.partyType, $event) || (ctx_r1.form.partyType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(42, CustodyComponent_Conditional_57_For_43_Template, 2, 2, "option", 68, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 57)(45, "label");
    \u0275\u0275text(46, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function CustodyComponent_Conditional_57_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.amount, $event) || (ctx_r1.form.amount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 57)(49, "label");
    \u0275\u0275text(50, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "textarea", 70);
    \u0275\u0275twoWayListener("ngModelChange", function CustodyComponent_Conditional_57_Template_textarea_ngModelChange_51_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.description, $event) || (ctx_r1.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "div", 53)(53, "button", 63);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_57_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "button", 54);
    \u0275\u0275listener("click", function CustodyComponent_Conditional_57_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275text(56, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0639\u0647\u062F\u0629" : "\u0625\u0646\u0634\u0627\u0621 \u0639\u0647\u062F\u0629 \u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.custodyType);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.contentType);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.contentTypes);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.partyName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.partyType);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.partyTypes);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.amount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0639\u0647\u062F\u0629");
  }
}
var CustodyComponent = class _CustodyComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  records = signal([], ...ngDevMode ? [{ debugName: "records" }] : (
    /* istanbul ignore next */
    []
  ));
  custodyAccounts = signal([], ...ngDevMode ? [{ debugName: "custodyAccounts" }] : (
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
  activeTab = signal("permanent", ...ngDevMode ? [{ debugName: "activeTab" }] : (
    /* istanbul ignore next */
    []
  ));
  viewingRecord = signal(null, ...ngDevMode ? [{ debugName: "viewingRecord" }] : (
    /* istanbul ignore next */
    []
  ));
  settlements = signal([], ...ngDevMode ? [{ debugName: "settlements" }] : (
    /* istanbul ignore next */
    []
  ));
  showSettleForm = signal(false, ...ngDevMode ? [{ debugName: "showSettleForm" }] : (
    /* istanbul ignore next */
    []
  ));
  form = {
    custodyType: "permanent",
    contentType: "cash",
    partyName: "",
    partyType: "employee",
    employeeId: null,
    description: "",
    amount: 0
  };
  settleForm = { amount: 0, notes: "", settledAt: "" };
  partyTypes = [
    { key: "employee", label: "\u0645\u0648\u0638\u0641" },
    { key: "supplier", label: "\u0645\u0648\u0631\u062F" },
    { key: "external", label: "\u0637\u0631\u0641 \u062E\u0627\u0631\u062C\u064A" }
  ];
  contentTypes = [
    { key: "cash", label: "\u0646\u0642\u062F\u064A\u0629" },
    { key: "material", label: "\u0639\u064A\u0646\u064A\u0629" },
    { key: "mixed", label: "\u0645\u062E\u062A\u0644\u0637\u0629" }
  ];
  onBizIdChange(_bizId) {
    this.load();
  }
  get filteredRecords() {
    return this.records().filter((r) => r.custodyType === this.activeTab());
  }
  switchTab(tab) {
    this.activeTab.set(tab);
  }
  async load() {
    this.loading.set(true);
    try {
      const [custodyRecordsData, custodyAccountsData] = await Promise.all([
        this.api.getCustodyRecords(this.bizId),
        this.api.getCustodyAccounts(this.bizId)
      ]);
      this.records.set(custodyRecordsData || []);
      this.custodyAccounts.set(custodyAccountsData || []);
    } catch (e) {
      console.error(e);
    }
    this.loading.set(false);
  }
  openAdd() {
    this.form = {
      custodyType: this.activeTab(),
      contentType: "cash",
      partyName: "",
      partyType: "employee",
      employeeId: null,
      description: "",
      amount: 0
    };
    this.editingId.set(null);
    this.showForm.set(true);
  }
  openEdit(c) {
    this.form = {
      custodyType: c.custodyType || "permanent",
      contentType: c.contentType || "cash",
      partyName: c.partyName || "",
      partyType: c.partyType || "employee",
      employeeId: c.employeeId,
      description: c.description || "",
      amount: c.amount || 0
    };
    this.editingId.set(c.id);
    this.showForm.set(true);
  }
  async save() {
    if (!this.form.partyName?.trim()) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0637\u0631\u0641");
      return;
    }
    try {
      if (this.editingId()) {
        await this.api.updateCustodyRecord(this.bizId, this.editingId(), this.form);
        this.toast.success("\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0633\u062C\u0644 \u0627\u0644\u0639\u0647\u062F\u0629 \u0628\u0646\u062C\u0627\u062D");
      } else {
        await this.api.createCustodyRecord(this.bizId, this.form);
        this.toast.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u062C\u0644 \u0627\u0644\u0639\u0647\u062F\u0629 \u0628\u0646\u062C\u0627\u062D");
      }
      this.showForm.set(false);
      await this.load();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  async remove(c) {
    const confirmed = await this.toast.confirm({
      title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641",
      message: `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0639\u0647\u062F\u0629 "${c.partyName}"\u061F`,
      type: "danger"
    });
    if (confirmed) {
      try {
        await this.api.deleteCustodyRecord(this.bizId, c.id);
        this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0633\u062C\u0644 \u0627\u0644\u0639\u0647\u062F\u0629");
        await this.load();
      } catch (e) {
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
      }
    }
  }
  async viewDetails(c) {
    this.viewingRecord.set(c);
    try {
      const detail = await this.api.getCustodyRecord(this.bizId, c.id);
      this.settlements.set(detail.settlements || []);
    } catch {
      this.settlements.set([]);
    }
  }
  openSettle() {
    this.settleForm = { amount: 0, notes: "", settledAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] };
    this.showSettleForm.set(true);
  }
  async submitSettle() {
    if (!this.settleForm.amount || this.settleForm.amount <= 0) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0645\u0628\u0644\u063A \u0627\u0644\u062A\u0633\u0648\u064A\u0629");
      return;
    }
    try {
      await this.api.addCustodySettlement(this.bizId, this.viewingRecord().id, this.settleForm);
      this.toast.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0633\u0648\u064A\u0629 \u0628\u0646\u062C\u0627\u062D");
      this.showSettleForm.set(false);
      await this.viewDetails(this.viewingRecord());
      await this.load();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  getStatusLabel(status) {
    const map = {
      active: "\u0646\u0634\u0637\u0629",
      partially_settled: "\u0645\u0633\u0648\u0651\u0627\u0629 \u062C\u0632\u0626\u064A\u0627\u064B",
      settled: "\u0645\u0633\u0648\u0651\u0627\u0629",
      cancelled: "\u0645\u0644\u063A\u0627\u0629"
    };
    return map[status] || status;
  }
  getStatusClass(status) {
    const map = {
      active: "st-active",
      partially_settled: "st-partial",
      settled: "st-settled",
      cancelled: "st-cancelled"
    };
    return map[status] || "";
  }
  getPartyTypeLabel(type) {
    return this.partyTypes.find((t) => t.key === type)?.label || type;
  }
  getContentTypeLabel(type) {
    return this.contentTypes.find((t) => t.key === type)?.label || type;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275CustodyComponent_BaseFactory;
    return function CustodyComponent_Factory(__ngFactoryType__) {
      return (\u0275CustodyComponent_BaseFactory || (\u0275CustodyComponent_BaseFactory = \u0275\u0275getInheritedFactory(_CustodyComponent)))(__ngFactoryType__ || _CustodyComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustodyComponent, selectors: [["app-custody"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 58, vars: 14, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "custody-accounts-section"], [1, "summary-row"], [1, "summary-card", "purple"], [1, "num"], [1, "lbl"], [1, "summary-card", "amber"], [1, "summary-card", "green"], [1, "summary-card", "blue"], [1, "tabs-bar"], [1, "tab-btn", 3, "click"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], [1, "modal-overlay"], [1, "accounts-grid"], [1, "account-card"], [1, "account-code"], [1, "account-name"], [1, "account-balance"], [1, "material-icons-round", "spin"], [1, "empty-hint"], [1, "custody-num"], [1, "party-name"], [1, "type-badge"], [1, "content-badge"], [1, "amount-cell"], [1, "status-badge"], ["title", "\u0639\u0631\u0636", 1, "action-btn", 3, "click"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "action-btn", "edit", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "action-btn", "delete", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", "wide", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "purple"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-label"], [1, "detail-value"], [1, "detail-value", "amount"], [1, "notes-section"], [1, "settlements-section"], [1, "settlements-header"], [1, "add-btn", "small"], [1, "no-settlements"], [1, "data-table", "settlements-table"], [1, "settle-form"], [1, "modal-footer"], [1, "btn-cancel", 3, "click"], [1, "add-btn", "small", 3, "click"], [1, "form-row"], [1, "form-group"], [1, "required"], ["type", "number", "placeholder", "0", 3, "ngModelChange", "ngModel"], ["type", "date", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A...", 3, "ngModelChange", "ngModel"], [1, "settle-actions"], [1, "btn-save", 3, "click"], [1, "modal-card", 3, "click"], [3, "ngModelChange", "ngModel"], ["value", "permanent"], ["value", "temporary"], [3, "value"], ["placeholder", "\u0645\u062B\u0627\u0644: \u0623\u062D\u0645\u062F \u0645\u062D\u0645\u062F", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "\u0648\u0635\u0641 \u0627\u0644\u0639\u0647\u062F\u0629...", 3, "ngModelChange", "ngModel"]], template: function CustodyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "lock");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u0639\u0647\u062F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function CustodyComponent_Template_button_click_6_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0625\u0646\u0634\u0627\u0621 \u0639\u0647\u062F\u0629");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(10, CustodyComponent_Conditional_10_Template, 8, 0, "div", 4);
      \u0275\u0275elementStart(11, "div", 5)(12, "div", 6)(13, "span", 2);
      \u0275\u0275text(14, "account_balance_wallet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div")(16, "span", 7);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "span", 8);
      \u0275\u0275text(19, "\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0639\u0647\u062F");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 9)(21, "span", 2);
      \u0275\u0275text(22, "receipt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div")(24, "span", 7);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 8);
      \u0275\u0275text(27, "\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0639\u0647\u062F");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 10)(29, "span", 2);
      \u0275\u0275text(30, "check_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div")(32, "span", 7);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "span", 8);
      \u0275\u0275text(35, "\u0646\u0634\u0637\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "div", 11)(37, "span", 2);
      \u0275\u0275text(38, "done_all");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div")(40, "span", 7);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "span", 8);
      \u0275\u0275text(43, "\u0645\u0633\u0648\u0651\u0627\u0629");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(44, "div", 12)(45, "button", 13);
      \u0275\u0275listener("click", function CustodyComponent_Template_button_click_45_listener() {
        return ctx.switchTab("permanent");
      });
      \u0275\u0275elementStart(46, "span", 2);
      \u0275\u0275text(47, "lock");
      \u0275\u0275elementEnd();
      \u0275\u0275text(48, " \u062F\u0627\u0626\u0645\u0629 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "button", 13);
      \u0275\u0275listener("click", function CustodyComponent_Template_button_click_49_listener() {
        return ctx.switchTab("temporary");
      });
      \u0275\u0275elementStart(50, "span", 2);
      \u0275\u0275text(51, "schedule");
      \u0275\u0275elementEnd();
      \u0275\u0275text(52, " \u0645\u0624\u0642\u062A\u0629 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(53, CustodyComponent_Conditional_53_Template, 5, 0, "div", 14)(54, CustodyComponent_Conditional_54_Template, 7, 1, "div", 15)(55, CustodyComponent_Conditional_55_Template, 20, 0, "table", 16);
      \u0275\u0275conditionalCreate(56, CustodyComponent_Conditional_56_Template, 57, 15, "div", 17);
      \u0275\u0275conditionalCreate(57, CustodyComponent_Conditional_57_Template, 57, 8, "div", 17);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.custodyAccounts().length > 0 ? 10 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.custodyAccounts().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.records().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.records().filter(\u0275\u0275arrowFunction(12, arrowFn0, ctx)).length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.records().filter(\u0275\u0275arrowFunction(13, arrowFn1, ctx)).length);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("active", ctx.activeTab() === "permanent");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("active", ctx.activeTab() === "temporary");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.loading() ? 53 : !ctx.filteredRecords.length ? 54 : 55);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.viewingRecord() ? 56 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showForm() ? 57 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.custody-accounts-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  padding: 20px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n}\n.custody-accounts-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0 0 16px;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.custody-accounts-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #8b5cf6;\n}\n.accounts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 16px;\n}\n.account-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(139, 92, 246, 0.05),\n      rgba(168, 85, 247, 0.08));\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 12px;\n  padding: 16px;\n  transition: all 0.2s;\n}\n.account-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.15);\n}\n.account-code[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-weight: 700;\n  font-size: 14px;\n  color: #8b5cf6;\n  background: rgba(139, 92, 246, 0.15);\n  padding: 4px 10px;\n  border-radius: 6px;\n  display: inline-block;\n  margin-bottom: 8px;\n}\n.account-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 12px;\n}\n.account-balance[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px;\n  background: rgba(139, 92, 246, 0.08);\n  border-radius: 8px;\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.account-balance[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #8b5cf6;\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  max-width: 280px;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.purple[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.08);\n}\n.summary-card.purple[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #a855f7;\n}\n.summary-card.green[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.08);\n}\n.summary-card.green[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.summary-card.blue[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.08);\n}\n.summary-card.blue[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.tabs-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 24px;\n  background: var(--bg-surface);\n  border-radius: 14px;\n  padding: 6px;\n  border: 1px solid var(--border-color);\n  width: fit-content;\n}\n.tab-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background: transparent;\n  color: var(--text-secondary);\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.tab-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #8b5cf6);\n  color: white;\n  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);\n}\n.custody-num[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.party-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.amount-cell[_ngcontent-%COMP%] {\n  font-family: monospace;\n  direction: ltr;\n  text-align: left;\n  font-weight: 700;\n}\n.type-badge[_ngcontent-%COMP%], \n.content-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n}\n.type-badge[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, 0.12);\n  color: #6366f1;\n}\n.content-badge[_ngcontent-%COMP%] {\n  background: rgba(20, 184, 166, 0.12);\n  color: #14b8a6;\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 14px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.status-badge.st-active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.status-badge.st-partial[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #f59e0b;\n}\n.status-badge.st-settled[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.15);\n  color: #3b82f6;\n}\n.status-badge.st-cancelled[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.15);\n  color: #94a3b8;\n}\n.modal-card.wide[_ngcontent-%COMP%] {\n  max-width: 800px;\n}\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.detail-value[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.detail-value.amount[_ngcontent-%COMP%] {\n  font-family: monospace;\n  direction: ltr;\n}\n.notes-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  padding: 16px;\n  border-radius: 12px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n}\n.notes-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-primary);\n  font-weight: 600;\n  margin-top: 6px;\n}\n.settlements-section[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.settlements-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.settlements-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.settlements-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #a855f7;\n}\n.add-btn.small[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  font-size: 12px;\n  border-radius: 8px;\n}\n.add-btn.small[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.no-settlements[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 24px;\n  color: var(--text-muted);\n  font-size: 14px;\n  font-weight: 600;\n}\n.settlements-table[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n.settle-form[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 20px;\n  border-radius: 14px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n}\n.settle-form[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 14px;\n}\n.settle-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 14px;\n}\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n@media (max-width: 768px) {\n  .detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .tabs-bar[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .tab-btn[_ngcontent-%COMP%] {\n    flex: 1;\n    justify-content: center;\n  }\n}\n@media (max-width: 640px) {\n  .detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=custody.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustodyComponent, [{
    type: Component,
    args: [{ selector: "app-custody", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">lock</span> \u0627\u0644\u0639\u0647\u062F</h2>\r
    <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">add</span> \u0625\u0646\u0634\u0627\u0621 \u0639\u0647\u062F\u0629</button>\r
  </div>\r
\r
  <!-- \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0639\u0647\u062F\u0629 -->\r
  @if (custodyAccounts().length > 0) {\r
    <div class="custody-accounts-section">\r
      <h3><span class="material-icons-round">account_balance_wallet</span> \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0639\u0647\u062F</h3>\r
      <div class="accounts-grid">\r
        @for (acc of custodyAccounts(); track acc.id) {\r
          <div class="account-card">\r
            <div class="account-code">{{ acc.code }}</div>\r
            <div class="account-name">{{ acc.name }}</div>\r
            <div class="account-balance">\r
              <span class="material-icons-round">account_balance_wallet</span>\r
              <span>\u0627\u0644\u0631\u0635\u064A\u062F: {{ acc.balances?.[0]?.balance || '0' }}</span>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  }\r
\r
  <div class="summary-row">\r
    <div class="summary-card purple">\r
      <span class="material-icons-round">account_balance_wallet</span>\r
      <div><span class="num">{{ custodyAccounts().length }}</span><span class="lbl">\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0639\u0647\u062F</span></div>\r
    </div>\r
    <div class="summary-card amber">\r
      <span class="material-icons-round">receipt</span>\r
      <div><span class="num">{{ records().length }}</span><span class="lbl">\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0639\u0647\u062F</span></div>\r
    </div>\r
    <div class="summary-card green">\r
      <span class="material-icons-round">check_circle</span>\r
      <div><span class="num">{{ records().filter(r => r.status === 'active').length }}</span><span class="lbl">\u0646\u0634\u0637\u0629</span></div>\r
    </div>\r
    <div class="summary-card blue">\r
      <span class="material-icons-round">done_all</span>\r
      <div><span class="num">{{ records().filter(r => r.status === 'settled').length }}</span><span class="lbl">\u0645\u0633\u0648\u0651\u0627\u0629</span></div>\r
    </div>\r
  </div>\r
\r
  <!-- \u062A\u0628\u0648\u064A\u0628\u0627\u062A -->\r
  <div class="tabs-bar">\r
    <button class="tab-btn" [class.active]="activeTab() === 'permanent'" (click)="switchTab('permanent')">\r
      <span class="material-icons-round">lock</span> \u062F\u0627\u0626\u0645\u0629\r
    </button>\r
    <button class="tab-btn" [class.active]="activeTab() === 'temporary'" (click)="switchTab('temporary')">\r
      <span class="material-icons-round">schedule</span> \u0645\u0624\u0642\u062A\u0629\r
    </button>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!filteredRecords.length) {\r
    <div class="empty-state">\r
      <span class="material-icons-round">account_balance_wallet</span>\r
      <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0647\u062F {{ activeTab() === 'permanent' ? '\u062F\u0627\u0626\u0645\u0629' : '\u0645\u0624\u0642\u062A\u0629' }} \u0628\u0639\u062F</p>\r
      <p class="empty-hint">\u0623\u0646\u0634\u0626 \u0639\u0647\u062F\u0629 \u062C\u062F\u064A\u062F\u0629 \u0644\u062A\u062A\u0628\u0639 \u0627\u0644\u0623\u0645\u0627\u0646\u0627\u062A \u0648\u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0645\u0639\u0647\u0648\u062F\u0629</p>\r
    </div>\r
  } @else {\r
    <table class="data-table">\r
      <thead>\r
        <tr>\r
          <th>\u0631\u0642\u0645 \u0627\u0644\u0639\u0647\u062F\u0629</th>\r
          <th>\u0627\u0633\u0645 \u0627\u0644\u0637\u0631\u0641</th>\r
          <th>\u0646\u0648\u0639 \u0627\u0644\u0637\u0631\u0641</th>\r
          <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</th>\r
          <th>\u0627\u0644\u0645\u0628\u0644\u063A</th>\r
          <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>\r
          <th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
        @for (c of filteredRecords; track c.id) {\r
          <tr>\r
            <td class="custody-num">{{ c.custodyNumber || c.id }}</td>\r
            <td class="party-name">{{ c.partyName }}</td>\r
            <td><span class="type-badge">{{ getPartyTypeLabel(c.partyType) }}</span></td>\r
            <td><span class="content-badge">{{ getContentTypeLabel(c.contentType) }}</span></td>\r
            <td class="amount-cell">{{ (c.amount || 0) | number }}</td>\r
            <td><span class="status-badge" [class]="getStatusClass(c.status)">{{ getStatusLabel(c.status) }}</span></td>\r
            <td>\r
              <button class="action-btn" (click)="viewDetails(c)" title="\u0639\u0631\u0636"><span class="material-icons-round">visibility</span></button>\r
              <button class="action-btn edit" (click)="openEdit(c)" title="\u062A\u0639\u062F\u064A\u0644"><span class="material-icons-round">edit</span></button>\r
              <button class="action-btn delete" (click)="remove(c)" title="\u062D\u0630\u0641"><span class="material-icons-round">delete</span></button>\r
            </td>\r
          </tr>\r
        }\r
      </tbody>\r
    </table>\r
  }\r
\r
  <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0639\u0647\u062F\u0629 \u0648\u0627\u0644\u062A\u0633\u0648\u064A\u0627\u062A -->\r
  @if (viewingRecord()) {\r
    <div class="modal-overlay" (click)="viewingRecord.set(null)">\r
      <div class="modal-card wide" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon purple"><span class="material-icons-round">account_balance_wallet</span></div>\r
            <div>\r
              <h2>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0639\u0647\u062F\u0629</h2>\r
              <p>{{ viewingRecord().partyName }} \u2014 {{ viewingRecord().custodyNumber || viewingRecord().id }}</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="viewingRecord.set(null)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="detail-grid">\r
            <div class="detail-item"><span class="detail-label">\u0646\u0648\u0639 \u0627\u0644\u0639\u0647\u062F\u0629</span><span class="detail-value">{{ viewingRecord().custodyType === 'permanent' ? '\u062F\u0627\u0626\u0645\u0629' : '\u0645\u0624\u0642\u062A\u0629' }}</span></div>\r
            <div class="detail-item"><span class="detail-label">\u0646\u0648\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</span><span class="detail-value">{{ getContentTypeLabel(viewingRecord().contentType) }}</span></div>\r
            <div class="detail-item"><span class="detail-label">\u0646\u0648\u0639 \u0627\u0644\u0637\u0631\u0641</span><span class="detail-value">{{ getPartyTypeLabel(viewingRecord().partyType) }}</span></div>\r
            <div class="detail-item"><span class="detail-label">\u0627\u0644\u0645\u0628\u0644\u063A</span><span class="detail-value amount">{{ (viewingRecord().amount || 0) | number }}</span></div>\r
            <div class="detail-item"><span class="detail-label">\u0627\u0644\u062D\u0627\u0644\u0629</span><span class="status-badge" [class]="getStatusClass(viewingRecord().status)">{{ getStatusLabel(viewingRecord().status) }}</span></div>\r
          </div>\r
          @if (viewingRecord().description) {\r
            <div class="notes-section">\r
              <span class="detail-label">\u0627\u0644\u0648\u0635\u0641</span>\r
              <p>{{ viewingRecord().description }}</p>\r
            </div>\r
          }\r
\r
          <!-- \u0627\u0644\u062A\u0633\u0648\u064A\u0627\u062A -->\r
          <div class="settlements-section">\r
            <div class="settlements-header">\r
              <h3><span class="material-icons-round">receipt_long</span> \u0627\u0644\u062A\u0633\u0648\u064A\u0627\u062A</h3>\r
              @if (viewingRecord().status === 'active' || viewingRecord().status === 'partially_settled') {\r
                <button class="add-btn small" (click)="openSettle()"><span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u062A\u0633\u0648\u064A\u0629</button>\r
              }\r
            </div>\r
            @if (!settlements().length) {\r
              <p class="no-settlements">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0633\u0648\u064A\u0627\u062A \u0628\u0639\u062F</p>\r
            } @else {\r
              <table class="data-table settlements-table">\r
                <thead><tr><th>\u0627\u0644\u0645\u0628\u0644\u063A</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th></tr></thead>\r
                <tbody>\r
                  @for (s of settlements(); track s.id) {\r
                    <tr>\r
                      <td class="amount-cell">{{ (s.amount || 0) | number }}</td>\r
                      <td>{{ (s.settledAt || s.createdAt || '').split('T')[0] }}</td>\r
                      <td>{{ s.notes || '\u2014' }}</td>\r
                    </tr>\r
                  }\r
                </tbody>\r
              </table>\r
            }\r
          </div>\r
\r
          <!-- \u0646\u0645\u0648\u0630\u062C \u062A\u0633\u0648\u064A\u0629 -->\r
          @if (showSettleForm()) {\r
            <div class="settle-form">\r
              <h4>\u0625\u0636\u0627\u0641\u0629 \u062A\u0633\u0648\u064A\u0629 \u062C\u062F\u064A\u062F\u0629</h4>\r
              <div class="form-row">\r
                <div class="form-group">\r
                  <label>\u0645\u0628\u0644\u063A \u0627\u0644\u062A\u0633\u0648\u064A\u0629 <span class="required">*</span></label>\r
                  <input type="number" [(ngModel)]="settleForm.amount" placeholder="0" />\r
                </div>\r
                <div class="form-group">\r
                  <label>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0633\u0648\u064A\u0629</label>\r
                  <input type="date" [(ngModel)]="settleForm.settledAt" />\r
                </div>\r
              </div>\r
              <div class="form-group">\r
                <label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>\r
                <textarea [(ngModel)]="settleForm.notes" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A..."></textarea>\r
              </div>\r
              <div class="settle-actions">\r
                <button class="btn-save" (click)="submitSettle()">\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u0633\u0648\u064A\u0629</button>\r
                <button class="btn-cancel" (click)="showSettleForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-cancel" (click)="viewingRecord.set(null)">\u0625\u063A\u0644\u0627\u0642</button>\r
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
            <div class="modal-icon purple"><span class="material-icons-round">account_balance_wallet</span></div>\r
            <div>\r
              <h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0639\u0647\u062F\u0629' : '\u0625\u0646\u0634\u0627\u0621 \u0639\u0647\u062F\u0629 \u062C\u062F\u064A\u062F\u0629' }}</h2>\r
              <p>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0647\u062F \u0648\u0627\u0644\u0623\u0645\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0639\u0647\u0648\u062F\u0629 \u0644\u0644\u0623\u0637\u0631\u0627\u0641</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0646\u0648\u0639 \u0627\u0644\u0639\u0647\u062F\u0629</label>\r
              <select [(ngModel)]="form.custodyType">\r
                <option value="permanent">\u062F\u0627\u0626\u0645\u0629</option>\r
                <option value="temporary">\u0645\u0624\u0642\u062A\u0629</option>\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label>\u0646\u0648\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649</label>\r
              <select [(ngModel)]="form.contentType">\r
                @for (ct of contentTypes; track ct.key) {\r
                  <option [value]="ct.key">{{ ct.label }}</option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0633\u0645 \u0627\u0644\u0637\u0631\u0641 <span class="required">*</span></label>\r
              <input [(ngModel)]="form.partyName" placeholder="\u0645\u062B\u0627\u0644: \u0623\u062D\u0645\u062F \u0645\u062D\u0645\u062F" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0646\u0648\u0639 \u0627\u0644\u0637\u0631\u0641</label>\r
              <select [(ngModel)]="form.partyType">\r
                @for (pt of partyTypes; track pt.key) {\r
                  <option [value]="pt.key">{{ pt.label }}</option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0645\u0628\u0644\u063A</label>\r
            <input type="number" [(ngModel)]="form.amount" placeholder="0" />\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0648\u0635\u0641</label>\r
            <textarea [(ngModel)]="form.description" rows="3" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0639\u0647\u062F\u0629..."></textarea>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0639\u0647\u062F\u0629' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/custody/custody.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.custody-accounts-section {\n  margin-bottom: 24px;\n  padding: 20px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n}\n.custody-accounts-section h3 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0 0 16px;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.custody-accounts-section h3 .material-icons-round {\n  font-size: 24px;\n  color: #8b5cf6;\n}\n.accounts-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 16px;\n}\n.account-card {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(139, 92, 246, 0.05),\n      rgba(168, 85, 247, 0.08));\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 12px;\n  padding: 16px;\n  transition: all 0.2s;\n}\n.account-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.15);\n}\n.account-code {\n  font-family: "Courier New", monospace;\n  font-weight: 700;\n  font-size: 14px;\n  color: #8b5cf6;\n  background: rgba(139, 92, 246, 0.15);\n  padding: 4px 10px;\n  border-radius: 6px;\n  display: inline-block;\n  margin-bottom: 8px;\n}\n.account-name {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 12px;\n}\n.account-balance {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px;\n  background: rgba(139, 92, 246, 0.08);\n  border-radius: 8px;\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.account-balance .material-icons-round {\n  font-size: 18px;\n  color: #8b5cf6;\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  max-width: 280px;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.purple {\n  background: rgba(168, 85, 247, 0.08);\n}\n.summary-card.purple .material-icons-round {\n  color: #a855f7;\n}\n.summary-card.green {\n  background: rgba(34, 197, 94, 0.08);\n}\n.summary-card.green .material-icons-round {\n  color: #22c55e;\n}\n.summary-card.blue {\n  background: rgba(59, 130, 246, 0.08);\n}\n.summary-card.blue .material-icons-round {\n  color: #3b82f6;\n}\n.tabs-bar {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 24px;\n  background: var(--bg-surface);\n  border-radius: 14px;\n  padding: 6px;\n  border: 1px solid var(--border-color);\n  width: fit-content;\n}\n.tab-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background: transparent;\n  color: var(--text-secondary);\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab-btn .material-icons-round {\n  font-size: 18px;\n}\n.tab-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n}\n.tab-btn.active {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #8b5cf6);\n  color: white;\n  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);\n}\n.custody-num {\n  font-family: monospace;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.party-name {\n  font-weight: 700;\n}\n.amount-cell {\n  font-family: monospace;\n  direction: ltr;\n  text-align: left;\n  font-weight: 700;\n}\n.type-badge,\n.content-badge {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n}\n.type-badge {\n  background: rgba(99, 102, 241, 0.12);\n  color: #6366f1;\n}\n.content-badge {\n  background: rgba(20, 184, 166, 0.12);\n  color: #14b8a6;\n}\n.status-badge {\n  display: inline-block;\n  padding: 4px 14px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n}\n.status-badge.st-active {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.status-badge.st-partial {\n  background: rgba(245, 158, 11, 0.15);\n  color: #f59e0b;\n}\n.status-badge.st-settled {\n  background: rgba(59, 130, 246, 0.15);\n  color: #3b82f6;\n}\n.status-badge.st-cancelled {\n  background: rgba(148, 163, 184, 0.15);\n  color: #94a3b8;\n}\n.modal-card.wide {\n  max-width: 800px;\n}\n.detail-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.detail-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.detail-label {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.detail-value {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.detail-value.amount {\n  font-family: monospace;\n  direction: ltr;\n}\n.notes-section {\n  margin-bottom: 20px;\n  padding: 16px;\n  border-radius: 12px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n}\n.notes-section p {\n  font-size: 14px;\n  color: var(--text-primary);\n  font-weight: 600;\n  margin-top: 6px;\n}\n.settlements-section {\n  margin-top: 24px;\n}\n.settlements-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.settlements-header h3 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.settlements-header h3 .material-icons-round {\n  font-size: 20px;\n  color: #a855f7;\n}\n.add-btn.small {\n  padding: 6px 14px;\n  font-size: 12px;\n  border-radius: 8px;\n}\n.add-btn.small .material-icons-round {\n  font-size: 16px;\n}\n.no-settlements {\n  text-align: center;\n  padding: 24px;\n  color: var(--text-muted);\n  font-size: 14px;\n  font-weight: 600;\n}\n.settlements-table {\n  margin-top: 0;\n}\n.settle-form {\n  margin-top: 20px;\n  padding: 20px;\n  border-radius: 14px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n}\n.settle-form h4 {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 14px;\n}\n.settle-actions {\n  display: flex;\n  gap: 10px;\n  margin-top: 14px;\n}\n.empty-hint {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.required {\n  color: #ef4444;\n}\n@media (max-width: 768px) {\n  .detail-grid {\n    grid-template-columns: 1fr 1fr;\n  }\n  .tabs-bar {\n    width: 100%;\n  }\n  .tab-btn {\n    flex: 1;\n    justify-content: center;\n  }\n}\n@media (max-width: 640px) {\n  .detail-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=custody.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustodyComponent, { className: "CustodyComponent", filePath: "src/app/pages/custody/custody.ts", lineNumber: 18 });
})();
export {
  CustodyComponent
};
//# sourceMappingURL=chunk-S3DH3XPD.js.map
