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
  __spreadProps,
  __spreadValues,
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VUZEB5JS.js";

// src/app/pages/billing-systems/billing-systems.ts
var _forTrack0 = ($index, $item) => $item.name;
var _forTrack1 = ($index, $item) => $item.system;
var _forTrack2 = ($index, $item) => $item.id;
var _forTrack3 = ($index, $item) => $item.value;
function BillingSystemsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_15_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.error.set(""));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 18);
    \u0275\u0275text(5, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
function BillingSystemsComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_16_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.successMsg.set(""));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 18);
    \u0275\u0275text(5, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.successMsg(), " ");
  }
}
function BillingSystemsComponent_Conditional_17_For_20_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_17_For_20_Conditional_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const s_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.activeTab.set("accounts");
      return \u0275\u0275resetView(ctx_r1.activeSystem.set(ctx_r1.activeSystem() === s_r5.name ? "all" : s_r5.name));
    });
    \u0275\u0275elementStart(1, "div", 27)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div")(5, "div", 22);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 23);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("--card-color", s_r5.color);
    \u0275\u0275classProp("active-stat", ctx_r1.activeSystem() === s_r5.name);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", s_r5.color + "25")("color", s_r5.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r5.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r5.count);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r5.name);
  }
}
function BillingSystemsComponent_Conditional_17_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, BillingSystemsComponent_Conditional_17_For_20_Conditional_0_Template, 9, 11, "div", 25);
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    \u0275\u0275conditional(s_r5.count > 0 ? 0 : -1);
  }
}
function BillingSystemsComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 20)(2, "div", 21)(3, "span", 4);
    \u0275\u0275text(4, "receipt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "div", 22);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 23);
    \u0275\u0275text(9, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 20)(11, "div", 24)(12, "span", 4);
    \u0275\u0275text(13, "people");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div")(15, "div", 22);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 23);
    \u0275\u0275text(18, "\u0645\u0648\u0638\u0641");
    \u0275\u0275elementEnd()()();
    \u0275\u0275repeaterCreate(19, BillingSystemsComponent_Conditional_17_For_20_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.stats().total);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.stats().employees);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.stats().bySys);
  }
}
function BillingSystemsComponent_Conditional_35_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_35_For_14_Template_button_click_0_listener() {
      const s_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeSystem.set(s_r8.name));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("--tab-color", s_r8.color);
    \u0275\u0275classProp("active", ctx_r1.activeSystem() === s_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r8.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r8.name, " ");
  }
}
function BillingSystemsComponent_Conditional_35_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_35_For_22_Template_button_click_0_listener() {
      const name_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activeStation.set(name_r10));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const name_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("--tab-color", "#06b6d4");
    \u0275\u0275classProp("active", ctx_r1.activeStation() === name_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(name_r10);
  }
}
function BillingSystemsComponent_Conditional_35_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275element(1, "div", 40);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 42)(2, "span", 4);
    \u0275\u0275text(3, "receipt_long");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0633\u0627\u0628\u0627\u062A \u0641\u0648\u062A\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, '\u0623\u0636\u0641 \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 \u0647\u0646\u0627. \u0633\u062A\u0638\u0647\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A \u0635\u0641\u062D\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0628\u0646\u0648\u0639 "\u0641\u0648\u062A\u0631\u0629".');
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 38);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openCreateAccount());
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u0623\u0636\u0641 \u0623\u0648\u0644 \u062D\u0633\u0627\u0628 ");
    \u0275\u0275elementEnd()();
  }
}
function BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_1_For_1_For_12_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "span", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 61)(4, "button", 62);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_1_For_1_For_12_For_11_Template_button_click_4_listener() {
      const acc_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.openEditAccount(acc_r13));
    });
    \u0275\u0275elementStart(5, "span", 4);
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 63);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_1_For_1_For_12_For_11_Template_button_click_7_listener() {
      const acc_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.toggleAccountActive(acc_r13));
    });
    \u0275\u0275elementStart(8, "span", 4);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 64);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_1_For_1_For_12_For_11_Template_button_click_10_listener() {
      const acc_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.deleteAccount(acc_r13));
    });
    \u0275\u0275elementStart(11, "span", 4);
    \u0275\u0275text(12, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const acc_r13 = ctx.$implicit;
    const group_r14 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275styleProp("--chip-color", group_r14.info.color);
    \u0275\u0275classProp("inactive-chip", !acc_r13.isActive);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getMethodDisplayName(acc_r13.collectionMethod));
    \u0275\u0275advance(5);
    \u0275\u0275property("title", acc_r13.isActive ? "\u0625\u064A\u0642\u0627\u0641" : "\u062A\u0641\u0639\u064A\u0644");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(acc_r13.isActive ? "pause" : "play_arrow");
  }
}
function BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_1_For_1_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "div", 52)(2, "div", 53);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 54)(5, "h3", 55);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 56);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 57);
    \u0275\u0275repeaterCreate(10, BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_1_For_1_For_12_For_11_Template, 13, 7, "div", 58, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const emp_r15 = ctx.$implicit;
    const group_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("--emp-color", group_r14.info.color);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", group_r14.info.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", emp_r15.name.charAt(0), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(emp_r15.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", emp_r15.accounts.length, " \u062D\u0633\u0627\u0628");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(emp_r15.accounts);
  }
}
function BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44)(2, "div", 45)(3, "span", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 46)(6, "h2", 47);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 48);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 49);
    \u0275\u0275repeaterCreate(11, BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_1_For_1_For_12_Template, 12, 7, "div", 50, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r14 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("--sys-color", group_r14.info.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", group_r14.info.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r14.info.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(group_r14.system);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", group_r14.employees.length, " \u0645\u0648\u0638\u0641 \xB7 ", group_r14.employees.length, " \u062D\u0633\u0627\u0628");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r14.employees);
  }
}
function BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_1_For_1_Template, 13, 8, "div", 43, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r1.groupedBySystem());
  }
}
function BillingSystemsComponent_Conditional_35_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_0_Template, 12, 0, "div", 41)(1, BillingSystemsComponent_Conditional_35_Conditional_28_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.groupedBySystem().length === 0 ? 0 : 1);
  }
}
function BillingSystemsComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 28)(2, "div", 29)(3, "span", 30);
    \u0275\u0275text(4, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 31);
    \u0275\u0275listener("input", function BillingSystemsComponent_Conditional_35_Template_input_input_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.searchQuery.set($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 32)(7, "div", 33)(8, "span", 34);
    \u0275\u0275text(9, "\u0627\u0644\u0646\u0638\u0627\u0645:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 35)(11, "button", 36);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_35_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeSystem.set("all"));
    });
    \u0275\u0275text(12, "\u0627\u0644\u0643\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, BillingSystemsComponent_Conditional_35_For_14_Template, 4, 6, "button", 37, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 33)(16, "span", 34);
    \u0275\u0275text(17, "\u0627\u0644\u0645\u062D\u0637\u0629:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 35)(19, "button", 36);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_35_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeStation.set("all"));
    });
    \u0275\u0275text(20, "\u0627\u0644\u0643\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(21, BillingSystemsComponent_Conditional_35_For_22_Template, 2, 5, "button", 37, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "button", 38);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_35_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreateAccount());
    });
    \u0275\u0275elementStart(24, "span", 4);
    \u0275\u0275text(25, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " \u062D\u0633\u0627\u0628 \u0641\u0648\u062A\u0631\u0629 \u062C\u062F\u064A\u062F ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, BillingSystemsComponent_Conditional_35_Conditional_27_Template, 4, 0, "div", 39);
    \u0275\u0275conditionalCreate(28, BillingSystemsComponent_Conditional_35_Conditional_28_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.searchQuery());
    \u0275\u0275advance(6);
    \u0275\u0275styleProp("--tab-color", "#64748b");
    \u0275\u0275classProp("active", ctx_r1.activeSystem() === "all");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.billingSystems());
    \u0275\u0275advance(6);
    \u0275\u0275styleProp("--tab-color", "#64748b");
    \u0275\u0275classProp("active", ctx_r1.activeStation() === "all");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.stationNames());
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.loading() ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.loading() ? 28 : -1);
  }
}
function BillingSystemsComponent_Conditional_36_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275element(1, "div", 40);
    \u0275\u0275elementEnd();
  }
}
function BillingSystemsComponent_Conditional_36_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 42)(2, "span", 4);
    \u0275\u0275text(3, "settings");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0638\u0645\u0629 \u0641\u0648\u062A\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "\u0623\u0636\u0641 \u0646\u0638\u0627\u0645 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0627\u0644\u0623\u0648\u0644 \u0644\u0628\u062F\u0621 \u0625\u062F\u0627\u0631\u0629 \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 38);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_36_Conditional_12_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openSystemWizard());
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u0623\u0636\u0641 \u0646\u0638\u0627\u0645 ");
    \u0275\u0275elementEnd()();
  }
}
function BillingSystemsComponent_Conditional_36_Conditional_13_For_2_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 80);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r20 = ctx.$implicit;
    const sys_r19 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275styleProp("background", sys_r19.color + "20")("color", sys_r19.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r20, " ");
  }
}
function BillingSystemsComponent_Conditional_36_Conditional_13_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275repeaterCreate(1, BillingSystemsComponent_Conditional_36_Conditional_13_For_2_Conditional_13_For_2_Template, 2, 5, "span", 79, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sys_r19 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(sys_r19.supportedTypes);
  }
}
function BillingSystemsComponent_Conditional_36_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "div", 71)(2, "div", 72)(3, "span", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 73)(6, "h3", 74);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 75);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 76);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_36_Conditional_13_For_2_Template_button_click_10_listener() {
      const sys_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteSystem(sys_r19));
    });
    \u0275\u0275elementStart(11, "span", 4);
    \u0275\u0275text(12, "delete");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(13, BillingSystemsComponent_Conditional_36_Conditional_13_For_2_Conditional_13_Template, 3, 0, "div", 77);
    \u0275\u0275elementStart(14, "div", 78)(15, "span", 4);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sys_r19 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("--sys-color", sys_r19.color);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", sys_r19.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sys_r19.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sys_r19.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getSysCount(sys_r19.name), " \u062D\u0633\u0627\u0628 ");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(sys_r19.supportedTypes && sys_r19.supportedTypes.length > 0 ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("multi", sys_r19.stationScope === "multi_station");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sys_r19.stationScope === "per_station" ? "location_on" : "hub");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sys_r19.stationScope === "per_station" ? "\u0646\u0638\u0627\u0645 \u0645\u0633\u062A\u0642\u0644 \u0644\u0643\u0644 \u0645\u062D\u0637\u0629" : "\u0646\u0638\u0627\u0645 \u0645\u0648\u062D\u062F \u0644\u0639\u062F\u0629 \u0645\u062D\u0637\u0627\u062A", " ");
  }
}
function BillingSystemsComponent_Conditional_36_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275repeaterCreate(1, BillingSystemsComponent_Conditional_36_Conditional_13_For_2_Template, 18, 12, "div", 69, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.billingSystems());
  }
}
function BillingSystemsComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 65)(2, "div")(3, "h2", 66);
    \u0275\u0275text(4, "\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 67);
    \u0275\u0275text(6, "\u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0644\u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631. \u0643\u0644 \u0646\u0638\u0627\u0645 \u0644\u0647 \u062D\u0633\u0627\u0628\u0627\u062A\u0647 \u0627\u0644\u0645\u0633\u062A\u0642\u0644\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 38);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_36_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSystemWizard());
    });
    \u0275\u0275elementStart(8, "span", 4);
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \u0646\u0638\u0627\u0645 \u062C\u062F\u064A\u062F ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, BillingSystemsComponent_Conditional_36_Conditional_11_Template, 2, 0, "div", 39)(12, BillingSystemsComponent_Conditional_36_Conditional_12_Template, 12, 0, "div", 41)(13, BillingSystemsComponent_Conditional_36_Conditional_13_Template, 3, 0, "div", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275conditional(ctx_r1.loading() ? 11 : ctx_r1.billingSystems().length === 0 ? 12 : 13);
  }
}
function BillingSystemsComponent_Conditional_37_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275element(1, "div", 40);
    \u0275\u0275elementEnd();
  }
}
function BillingSystemsComponent_Conditional_37_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 42)(2, "span", 4);
    \u0275\u0275text(3, "category");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 38);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_37_Conditional_12_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCreateType());
    });
    \u0275\u0275elementStart(7, "span", 4);
    \u0275\u0275text(8, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " \u0623\u0636\u0641 \u0646\u0648\u0639 ");
    \u0275\u0275elementEnd()();
  }
}
function BillingSystemsComponent_Conditional_37_Conditional_13_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r24 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r24.description);
  }
}
function BillingSystemsComponent_Conditional_37_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 82)(1, "div", 83)(2, "span", 4);
    \u0275\u0275text(3, "receipt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 84)(5, "h3", 85);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, BillingSystemsComponent_Conditional_37_Conditional_13_For_2_Conditional_7_Template, 2, 1, "p", 86);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 87)(9, "button", 88);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_37_Conditional_13_For_2_Template_button_click_9_listener() {
      const type_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openEditType(type_r24));
    });
    \u0275\u0275elementStart(10, "span", 4);
    \u0275\u0275text(11, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 89);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_37_Conditional_13_For_2_Template_button_click_12_listener() {
      const type_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteType(type_r24));
    });
    \u0275\u0275elementStart(13, "span", 4);
    \u0275\u0275text(14, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const type_r24 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(type_r24.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(type_r24.description ? 7 : -1);
  }
}
function BillingSystemsComponent_Conditional_37_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81);
    \u0275\u0275repeaterCreate(1, BillingSystemsComponent_Conditional_37_Conditional_13_For_2_Template, 15, 2, "div", 82, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.accountTypes());
  }
}
function BillingSystemsComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 65)(2, "div")(3, "h2", 66);
    \u0275\u0275text(4, "\u0623\u0646\u0648\u0627\u0639 \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0648\u062A\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 67);
    \u0275\u0275text(6, "\u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0648\u062A\u0631\u0629. \u0643\u0644 \u0646\u0648\u0639 \u064A\u0645\u062B\u0644 \u0622\u0644\u064A\u0629 \u062A\u062D\u0635\u064A\u0644 \u0645\u062E\u062A\u0644\u0641\u0629.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 38);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_37_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreateType());
    });
    \u0275\u0275elementStart(8, "span", 4);
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \u0646\u0648\u0639 \u062C\u062F\u064A\u062F ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, BillingSystemsComponent_Conditional_37_Conditional_11_Template, 2, 0, "div", 39)(12, BillingSystemsComponent_Conditional_37_Conditional_12_Template, 10, 0, "div", 41)(13, BillingSystemsComponent_Conditional_37_Conditional_13_Template, 3, 0, "div", 81);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275conditional(ctx_r1.loading() ? 11 : ctx_r1.accountTypes().length === 0 ? 12 : 13);
  }
}
function BillingSystemsComponent_Conditional_38_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 101);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r26 = ctx.$implicit;
    \u0275\u0275property("value", s_r26.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r26.name);
  }
}
function BillingSystemsComponent_Conditional_38_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 101);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r27 = ctx.$implicit;
    \u0275\u0275property("value", e_r27.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r27.fullName);
  }
}
function BillingSystemsComponent_Conditional_38_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 101);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r28 = ctx.$implicit;
    \u0275\u0275property("value", s_r28.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r28.label);
  }
}
function BillingSystemsComponent_Conditional_38_For_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 108);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_38_For_49_Template_button_click_0_listener() {
      const m_r30 = \u0275\u0275restoreView(_r29).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setFormField("account", "collectionMethod", m_r30.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r30 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.accountForm().collectionMethod === m_r30.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", m_r30.label, " ");
  }
}
function BillingSystemsComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_38_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAccountForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 91);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_38_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 92)(3, "div", 93)(4, "span", 4);
    \u0275\u0275text(5, "receipt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 94);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_38_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAccountForm.set(false));
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 95)(12, "div", 96)(13, "label", 97);
    \u0275\u0275text(14, "\u0627\u0644\u0645\u062D\u0637\u0629 ");
    \u0275\u0275elementStart(15, "span", 98);
    \u0275\u0275text(16, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "select", 99);
    \u0275\u0275listener("change", function BillingSystemsComponent_Conditional_38_Template_select_change_17_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFormField("account", "stationId", $event.target.value));
    });
    \u0275\u0275elementStart(18, "option", 100);
    \u0275\u0275text(19, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062D\u0637\u0629 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(20, BillingSystemsComponent_Conditional_38_For_21_Template, 2, 2, "option", 101, _forTrack2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 96)(23, "label", 97);
    \u0275\u0275text(24, "\u0627\u0644\u0645\u0648\u0638\u0641 ");
    \u0275\u0275elementStart(25, "span", 98);
    \u0275\u0275text(26, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "select", 99);
    \u0275\u0275listener("change", function BillingSystemsComponent_Conditional_38_Template_select_change_27_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFormField("account", "employeeId", $event.target.value));
    });
    \u0275\u0275elementStart(28, "option", 100);
    \u0275\u0275text(29, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(30, BillingSystemsComponent_Conditional_38_For_31_Template, 2, 2, "option", 101, _forTrack2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 96)(33, "label", 97);
    \u0275\u0275text(34, "\u0646\u0638\u0627\u0645 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 ");
    \u0275\u0275elementStart(35, "span", 98);
    \u0275\u0275text(36, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "select", 99);
    \u0275\u0275listener("change", function BillingSystemsComponent_Conditional_38_Template_select_change_37_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFormField("account", "billingSystemId", $event.target.value));
    });
    \u0275\u0275elementStart(38, "option", 100);
    \u0275\u0275text(39, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(40, BillingSystemsComponent_Conditional_38_For_41_Template, 2, 2, "option", 101, _forTrack3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 96)(43, "label", 97);
    \u0275\u0275text(44, "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062D\u0635\u064A\u0644 ");
    \u0275\u0275elementStart(45, "span", 98);
    \u0275\u0275text(46, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 102);
    \u0275\u0275repeaterCreate(48, BillingSystemsComponent_Conditional_38_For_49_Template, 2, 3, "button", 103, _forTrack3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 96)(51, "label", 97);
    \u0275\u0275text(52, "\u0627\u0644\u0639\u0646\u0648\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "input", 104);
    \u0275\u0275listener("input", function BillingSystemsComponent_Conditional_38_Template_input_input_53_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFormField("account", "label", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 105)(55, "span", 4);
    \u0275\u0275text(56, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(57, " \u0633\u064A\u064F\u0646\u0634\u0623 \u062D\u0633\u0627\u0628 \u0641\u0648\u062A\u0631\u0629 \u0644\u0644\u0645\u0648\u0638\u0641 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u062D\u062F\u062F. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div", 106)(59, "button", 107);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_38_Template_button_click_59_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAccountForm.set(false));
    });
    \u0275\u0275text(60, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "button", 38);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_38_Template_button_click_61_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveAccountForm());
    });
    \u0275\u0275elementStart(62, "span", 4);
    \u0275\u0275text(63, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.editingAccountId() ? "\u062A\u0639\u062F\u064A\u0644 \u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0648\u062A\u0631\u0629" : "\u062D\u0633\u0627\u0628 \u0641\u0648\u062A\u0631\u0629 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(10);
    \u0275\u0275property("value", ctx_r1.accountForm().stationId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.stations());
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r1.accountForm().employeeId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.employees());
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r1.accountForm().billingSystemId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.availableBillingSystems);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.availableCollectionMethods);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.accountForm().label);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingAccountId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628", " ");
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_22_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 125);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_39_Conditional_22_For_16_Template_button_click_0_listener() {
      const c_r34 = \u0275\u0275restoreView(_r33).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setSystemFormField("color", c_r34));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r34 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("background", c_r34);
    \u0275\u0275classProp("selected", ctx_r1.systemForm().color === c_r34);
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_22_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 126);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_39_Conditional_22_For_22_Template_button_click_0_listener() {
      const ic_r36 = \u0275\u0275restoreView(_r35).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setSystemFormField("icon", ic_r36));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ic_r36 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("--ic-color", ctx_r1.systemForm().color);
    \u0275\u0275classProp("selected", ctx_r1.systemForm().icon === ic_r36);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ic_r36);
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 115)(1, "h3", 119)(2, "span", 4);
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u0644\u062E\u0637\u0648\u0629 \u0661: \u0627\u0633\u0645 \u0627\u0644\u0646\u0638\u0627\u0645 \u0648\u0627\u0644\u0645\u0638\u0647\u0631 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 96)(6, "label", 97);
    \u0275\u0275text(7, "\u0627\u0633\u0645 \u0627\u0644\u0646\u0638\u0627\u0645 ");
    \u0275\u0275elementStart(8, "span", 98);
    \u0275\u0275text(9, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "input", 120);
    \u0275\u0275listener("input", function BillingSystemsComponent_Conditional_39_Conditional_22_Template_input_input_10_listener($event) {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setSystemFormField("name", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 96)(12, "label", 97);
    \u0275\u0275text(13, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 121);
    \u0275\u0275repeaterCreate(15, BillingSystemsComponent_Conditional_39_Conditional_22_For_16_Template, 1, 4, "button", 122, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 96)(18, "label", 97);
    \u0275\u0275text(19, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 123);
    \u0275\u0275repeaterCreate(21, BillingSystemsComponent_Conditional_39_Conditional_22_For_22_Template, 3, 5, "button", 124, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(10);
    \u0275\u0275property("value", ctx_r1.systemForm().name);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.availableColors);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.availableIcons);
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_23_Conditional_20_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 131)(1, "input", 132);
    \u0275\u0275listener("change", function BillingSystemsComponent_Conditional_39_Conditional_23_Conditional_20_For_5_Template_input_change_1_listener() {
      const s_r39 = \u0275\u0275restoreView(_r38).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.toggleWizardStation(s_r39.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r39 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.systemForm().stationIds.includes(s_r39.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r39.name, " ");
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_23_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129)(1, "label", 97);
    \u0275\u0275text(2, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062D\u0637\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 130);
    \u0275\u0275repeaterCreate(4, BillingSystemsComponent_Conditional_39_Conditional_23_Conditional_20_For_5_Template, 3, 2, "label", 131, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.stations());
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 115)(1, "h3", 119)(2, "span", 4);
    \u0275\u0275text(3, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u0644\u062E\u0637\u0648\u0629 \u0662: \u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u062D\u0637\u0627\u062A ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 127)(6, "button", 128);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_39_Conditional_23_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setSystemFormField("stationScope", "per_station"));
    });
    \u0275\u0275elementStart(7, "span", 4);
    \u0275\u0275text(8, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10, "\u0646\u0638\u0627\u0645 \u0645\u0633\u062A\u0642\u0644 \u0644\u0643\u0644 \u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "\u0643\u0644 \u0645\u062D\u0637\u0629 \u0644\u0647\u0627 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0633\u062A\u0642\u0644\u0629 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0646\u0638\u0627\u0645 (\u0645\u062B\u0644 \u0627\u0644\u0645\u063A\u0631\u0628\u064A)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 128);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_39_Conditional_23_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r37);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setSystemFormField("stationScope", "multi_station"));
    });
    \u0275\u0275elementStart(14, "span", 4);
    \u0275\u0275text(15, "hub");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "strong");
    \u0275\u0275text(17, "\u0646\u0638\u0627\u0645 \u0645\u0648\u062D\u062F \u0644\u0639\u062F\u0629 \u0645\u062D\u0637\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p");
    \u0275\u0275text(19, "\u0646\u0638\u0627\u0645 \u0648\u0627\u062D\u062F \u064A\u062E\u062F\u0645 \u0639\u062F\u0629 \u0645\u062D\u0637\u0627\u062A (\u0645\u062B\u0644 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0645\u0633\u0628\u0642)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(20, BillingSystemsComponent_Conditional_39_Conditional_23_Conditional_20_Template, 6, 0, "div", 129);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("selected", ctx_r1.systemForm().stationScope === "per_station");
    \u0275\u0275advance(7);
    \u0275\u0275classProp("selected", ctx_r1.systemForm().stationScope === "multi_station");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.systemForm().stationScope === "multi_station" ? 20 : -1);
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_24_For_9_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r41 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r41.description);
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_24_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 137)(1, "input", 132);
    \u0275\u0275listener("change", function BillingSystemsComponent_Conditional_39_Conditional_24_For_9_Template_input_change_1_listener() {
      const t_r41 = \u0275\u0275restoreView(_r40).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleWizardType(t_r41.name));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 138)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, BillingSystemsComponent_Conditional_39_Conditional_24_For_9_Conditional_5_Template, 2, 1, "span");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r41 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r1.systemForm().supportedTypes.includes(t_r41.name));
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.systemForm().supportedTypes.includes(t_r41.name));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r41.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r41.description ? 5 : -1);
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_24_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 136)(1, "span", 4);
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u062D\u0633\u0627\u0628 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 ");
    \u0275\u0275elementEnd();
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 115)(1, "h3", 119)(2, "span", 4);
    \u0275\u0275text(3, "category");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u0644\u062E\u0637\u0648\u0629 \u0663: \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u0639\u0648\u0645\u0629 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 133);
    \u0275\u0275text(6, "\u0627\u062E\u062A\u0631 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u062A\u064A \u064A\u062F\u0639\u0645\u0647\u0627 \u0647\u0630\u0627 \u0627\u0644\u0646\u0638\u0627\u0645:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 134);
    \u0275\u0275repeaterCreate(8, BillingSystemsComponent_Conditional_39_Conditional_24_For_9_Template, 6, 5, "label", 135, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, BillingSystemsComponent_Conditional_39_Conditional_24_Conditional_10_Template, 4, 0, "div", 136);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.accountTypes());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.systemForm().supportedTypes.length === 0 ? 10 : -1);
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 107);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_39_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.wizardBack());
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0627\u0644\u0633\u0627\u0628\u0642 ");
    \u0275\u0275elementEnd();
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 107);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_39_Conditional_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r43);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showSystemWizard.set(false));
    });
    \u0275\u0275text(1, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_39_Conditional_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r44);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.wizardNext());
    });
    \u0275\u0275text(1, " \u0627\u0644\u062A\u0627\u0644\u064A ");
    \u0275\u0275elementStart(2, "span", 4);
    \u0275\u0275text(3, "arrow_back");
    \u0275\u0275elementEnd()();
  }
}
function BillingSystemsComponent_Conditional_39_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 139);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_39_Conditional_29_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveSystemWizard());
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0638\u0627\u0645 ");
    \u0275\u0275elementEnd();
  }
}
function BillingSystemsComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_39_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showSystemWizard.set(false));
    });
    \u0275\u0275elementStart(1, "div", 109);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_39_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 92)(3, "div", 110)(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 111)(7, "h2");
    \u0275\u0275text(8, "\u0625\u0636\u0627\u0641\u0629 \u0646\u0638\u0627\u0645 \u0641\u0648\u062A\u0631\u0629 \u062C\u062F\u064A\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 112)(10, "span", 113);
    \u0275\u0275text(11, "\u0661");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "span", 114);
    \u0275\u0275elementStart(13, "span", 113);
    \u0275\u0275text(14, "\u0662");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "span", 114);
    \u0275\u0275elementStart(16, "span", 113);
    \u0275\u0275text(17, "\u0663");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "button", 94);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_39_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showSystemWizard.set(false));
    });
    \u0275\u0275elementStart(19, "span", 4);
    \u0275\u0275text(20, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 95);
    \u0275\u0275conditionalCreate(22, BillingSystemsComponent_Conditional_39_Conditional_22_Template, 23, 1, "div", 115);
    \u0275\u0275conditionalCreate(23, BillingSystemsComponent_Conditional_39_Conditional_23_Template, 21, 5, "div", 115);
    \u0275\u0275conditionalCreate(24, BillingSystemsComponent_Conditional_39_Conditional_24_Template, 11, 1, "div", 115);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 106);
    \u0275\u0275conditionalCreate(26, BillingSystemsComponent_Conditional_39_Conditional_26_Template, 4, 0, "button", 116)(27, BillingSystemsComponent_Conditional_39_Conditional_27_Template, 2, 0, "button", 116);
    \u0275\u0275conditionalCreate(28, BillingSystemsComponent_Conditional_39_Conditional_28_Template, 4, 0, "button", 117)(29, BillingSystemsComponent_Conditional_39_Conditional_29_Template, 4, 0, "button", 118);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", ctx_r1.systemForm().color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.systemForm().icon);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r1.wizardStep() >= 1)("done", ctx_r1.wizardStep() > 1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r1.wizardStep() >= 2)("done", ctx_r1.wizardStep() > 2);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r1.wizardStep() >= 3);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.wizardStep() === 1 ? 22 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wizardStep() === 2 ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wizardStep() === 3 ? 24 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.wizardStep() > 1 ? 26 : 27);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.wizardStep() < 3 ? 28 : 29);
  }
}
function BillingSystemsComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_40_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showTypeForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 140);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_40_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 92)(3, "div", 141)(4, "span", 4);
    \u0275\u0275text(5, "category");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 94);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_40_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showTypeForm.set(false));
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 95)(12, "div", 96)(13, "label", 97);
    \u0275\u0275text(14, "\u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639 ");
    \u0275\u0275elementStart(15, "span", 98);
    \u0275\u0275text(16, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "input", 142);
    \u0275\u0275listener("input", function BillingSystemsComponent_Conditional_40_Template_input_input_17_listener($event) {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFormField("type", "name", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 96)(19, "label", 97);
    \u0275\u0275text(20, "\u0627\u0644\u0648\u0635\u0641 \u0648\u0627\u0644\u0622\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "textarea", 143);
    \u0275\u0275listener("input", function BillingSystemsComponent_Conditional_40_Template_textarea_input_21_listener($event) {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFormField("type", "description", $event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 106)(23, "button", 107);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_40_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showTypeForm.set(false));
    });
    \u0275\u0275text(24, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 38);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_40_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveTypeForm());
    });
    \u0275\u0275elementStart(26, "span", 4);
    \u0275\u0275text(27, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.editingTypeId() ? "\u062A\u0639\u062F\u064A\u0644 \u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628" : "\u0646\u0648\u0639 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(10);
    \u0275\u0275property("value", ctx_r1.typeForm().name);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.typeForm().description);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingTypeId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0648\u0639", " ");
  }
}
function BillingSystemsComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_41_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r47);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showHowItWorks.set(false));
    });
    \u0275\u0275elementStart(1, "div", 144);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_41_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 92)(3, "div", 145)(4, "span", 4);
    \u0275\u0275text(5, "help_outline");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7, "\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629\u061F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 94);
    \u0275\u0275listener("click", function BillingSystemsComponent_Conditional_41_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r47);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showHowItWorks.set(false));
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 95)(12, "div", 146)(13, "h3")(14, "span", 4);
    \u0275\u0275text(15, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " \u0645\u0627 \u0647\u064A \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629\u061F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p");
    \u0275\u0275text(18, "\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0647\u064A \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u062A\u064A \u064A\u0633\u062A\u062E\u062F\u0645\u0647\u0627 \u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0644\u062A\u062D\u0635\u064A\u0644 \u0641\u0648\u0627\u062A\u064A\u0631 \u0627\u0644\u0645\u0634\u062A\u0631\u0643\u064A\u0646. \u0643\u0644 \u0645\u0648\u0638\u0641 \u0644\u0647 \u062D\u0633\u0627\u0628\u0627\u062A \u0641\u064A \u0643\u0644 \u0646\u0638\u0627\u0645 \u064A\u0639\u0645\u0644 \u0641\u064A\u0647.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 146)(20, "h3")(21, "span", 4);
    \u0275\u0275text(22, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, " \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0641\u064A \u0635\u0641\u062D\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p");
    \u0275\u0275text(25, "\u0643\u0644 \u062D\u0633\u0627\u0628 \u0641\u0648\u062A\u0631\u0629 \u062A\u064F\u0646\u0634\u0626\u0647 \u0647\u0646\u0627 \u064A\u0638\u0647\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A ");
    \u0275\u0275elementStart(26, "strong");
    \u0275\u0275text(27, "\u0635\u0641\u062D\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275text(28, ' \u0628\u0646\u0648\u0639 "\u0641\u0648\u062A\u0631\u0629". \u0644\u0627 \u062A\u062D\u062A\u0627\u062C \u0644\u0625\u0636\u0627\u0641\u062A\u0647 \u064A\u062F\u0648\u064A\u0627\u064B \u0647\u0646\u0627\u0643.');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 146)(30, "h3")(31, "span", 4);
    \u0275\u0275text(32, "settings");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33, " \u0625\u0636\u0627\u0641\u0629 \u0646\u0638\u0627\u0645 \u062C\u062F\u064A\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p");
    \u0275\u0275text(35, '\u0645\u0646 \u062A\u0628\u0648\u064A\u0628 "\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629" \u064A\u0645\u0643\u0646\u0643 \u0625\u0636\u0627\u0641\u0629 \u0646\u0638\u0627\u0645 \u062C\u062F\u064A\u062F \u0639\u0628\u0631 wizard \u062E\u0637\u0648\u0629 \u0628\u062E\u0637\u0648\u0629: \u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0645\u0638\u0647\u0631\u060C \u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u062D\u0637\u0627\u062A\u060C \u0648\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u0639\u0648\u0645\u0629.');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 146)(37, "h3")(38, "span", 4);
    \u0275\u0275text(39, "category");
    \u0275\u0275elementEnd();
    \u0275\u0275text(40, " \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "p");
    \u0275\u0275text(42, '\u0645\u0646 \u062A\u0628\u0648\u064A\u0628 "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A" \u064A\u0645\u0643\u0646\u0643 \u0625\u0636\u0627\u0641\u0629 \u0623\u0646\u0648\u0627\u0639 \u062C\u062F\u064A\u062F\u0629 \u0645\u0639 \u0634\u0631\u062D \u0622\u0644\u064A\u0629 \u0643\u0644 \u0646\u0648\u0639. \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u062A\u0638\u0647\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0633\u0627\u0628.');
    \u0275\u0275elementEnd()()()()();
  }
}
var BillingSystemsComponent = class _BillingSystemsComponent extends BasePageComponent {
  toast = inject(ToastService);
  api = inject(ApiService);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  successMsg = signal("", ...ngDevMode ? [{ debugName: "successMsg" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===== البيانات =====
  billingAccounts = signal([], ...ngDevMode ? [{ debugName: "billingAccounts" }] : (
    /* istanbul ignore next */
    []
  ));
  // حسابات الفوترة من employee_billing_accounts
  billingSystems = signal([], ...ngDevMode ? [{ debugName: "billingSystems" }] : (
    /* istanbul ignore next */
    []
  ));
  // أنظمة الفوترة من billing_systems_config
  accountTypes = signal([], ...ngDevMode ? [{ debugName: "accountTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  // أنواع حسابات الفوترة من billing_account_types
  stations = signal([], ...ngDevMode ? [{ debugName: "stations" }] : (
    /* istanbul ignore next */
    []
  ));
  // المحطات
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : (
    /* istanbul ignore next */
    []
  ));
  // الموظفين
  // أسماء الأنظمة تُجلب ديناميكياً من billingSystemsConfig
  methodNameMap = {
    "cash_mobile": "\u062A\u062D\u0635\u064A\u0644 \u0646\u0642\u062F\u064A \u0628\u0627\u0644\u062C\u0648\u0627\u0644",
    "manual_assign": "\u062A\u062D\u0635\u064A\u0644 \u0625\u0633\u0646\u0627\u062F \u064A\u062F\u0648\u064A",
    "electronic": "\u0633\u062F\u0627\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
    "haseb_deposit": "\u0625\u064A\u062F\u0627\u0639 \u062D\u0627\u0633\u0628"
  };
  // ===== حالة الواجهة =====
  activeTab = signal("accounts", ...ngDevMode ? [{ debugName: "activeTab" }] : (
    /* istanbul ignore next */
    []
  ));
  activeSystem = signal("all", ...ngDevMode ? [{ debugName: "activeSystem" }] : (
    /* istanbul ignore next */
    []
  ));
  activeStation = signal("all", ...ngDevMode ? [{ debugName: "activeStation" }] : (
    /* istanbul ignore next */
    []
  ));
  searchQuery = signal("", ...ngDevMode ? [{ debugName: "searchQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  showHowItWorks = signal(false, ...ngDevMode ? [{ debugName: "showHowItWorks" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===== نموذج إضافة حساب فوترة =====
  showAccountForm = signal(false, ...ngDevMode ? [{ debugName: "showAccountForm" }] : (
    /* istanbul ignore next */
    []
  ));
  editingAccountId = signal(null, ...ngDevMode ? [{ debugName: "editingAccountId" }] : (
    /* istanbul ignore next */
    []
  ));
  accountForm = signal({
    employeeId: "",
    stationId: "",
    billingSystemId: "",
    collectionMethod: "",
    label: "",
    notes: ""
  }, ...ngDevMode ? [{ debugName: "accountForm" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===== wizard إضافة نظام فوترة جديد =====
  showSystemWizard = signal(false, ...ngDevMode ? [{ debugName: "showSystemWizard" }] : (
    /* istanbul ignore next */
    []
  ));
  wizardStep = signal(1, ...ngDevMode ? [{ debugName: "wizardStep" }] : (
    /* istanbul ignore next */
    []
  ));
  // 1: الاسم، 2: المحطات، 3: أنواع الحسابات
  systemForm = signal({
    name: "",
    color: "#3b82f6",
    icon: "receipt",
    stationScope: "per_station",
    // per_station | multi_station
    stationIds: [],
    supportedTypes: []
  }, ...ngDevMode ? [{ debugName: "systemForm" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===== نموذج إضافة نوع حساب =====
  showTypeForm = signal(false, ...ngDevMode ? [{ debugName: "showTypeForm" }] : (
    /* istanbul ignore next */
    []
  ));
  editingTypeId = signal(null, ...ngDevMode ? [{ debugName: "editingTypeId" }] : (
    /* istanbul ignore next */
    []
  ));
  typeForm = signal({ name: "", description: "" }, ...ngDevMode ? [{ debugName: "typeForm" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===== حسابات مفلترة =====
  filteredAccounts = computed(() => {
    const sys = this.activeSystem();
    const station = this.activeStation();
    const q = this.searchQuery().toLowerCase();
    return this.billingAccounts().filter((a) => {
      const sysDisplayName = a.billingSystemName || this.getSystemDisplayName(a.billingSystemId);
      const matchSys = sys === "all" || sysDisplayName === sys;
      const matchStation = station === "all" || a.stationName === station;
      const matchQ = !q || (a.label || "").toLowerCase().includes(q) || (a.employeeName || "").toLowerCase().includes(q);
      return matchSys && matchStation && matchQ;
    });
  }, ...ngDevMode ? [{ debugName: "filteredAccounts" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===== تجميع حسب النظام ثم الموظف =====
  groupedBySystem = computed(() => {
    const filtered = this.filteredAccounts();
    const systems = this.billingSystems();
    const groups = [];
    for (const sys of systems) {
      const sysAccounts = filtered.filter((a) => {
        const displayName = a.billingSystemName || this.getSystemDisplayName(a.billingSystemId);
        return displayName === sys.name;
      });
      if (sysAccounts.length === 0)
        continue;
      const empMap = /* @__PURE__ */ new Map();
      for (const acc of sysAccounts) {
        const emp = acc.employeeName || "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";
        if (!empMap.has(emp))
          empMap.set(emp, []);
        empMap.get(emp).push(acc);
      }
      const employees = Array.from(empMap.entries()).map(([name, accs]) => ({
        name,
        accounts: accs.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      }));
      groups.push({ system: sys.name, info: sys, employees });
    }
    return groups;
  }, ...ngDevMode ? [{ debugName: "groupedBySystem" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===== إحصائيات =====
  stats = computed(() => {
    const all = this.billingAccounts();
    const systems = this.billingSystems();
    const bySys = systems.map((s) => __spreadProps(__spreadValues({}, s), {
      count: all.filter((a) => (a.billingSystemName || this.getSystemDisplayName(a.billingSystemId)) === s.name).length
    }));
    const employees = new Set(all.map((a) => a.employeeName).filter(Boolean)).size;
    return { total: all.length, employees, bySys };
  }, ...ngDevMode ? [{ debugName: "stats" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===== قائمة المحطات المتاحة =====
  stationNames = computed(() => this.stations().map((s) => s.name), ...ngDevMode ? [{ debugName: "stationNames" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===== أيقونات متاحة للنظام =====
  availableIcons = [
    "receipt",
    "credit_card",
    "volunteer_activism",
    "payments",
    "account_balance",
    "savings",
    "currency_exchange",
    "monetization_on",
    "attach_money",
    "wallet"
  ];
  availableColors = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    "#f97316",
    "#ec4899",
    "#06b6d4",
    "#84cc16"
  ];
  // أنظمة الفوترة المتاحة تُجلب ديناميكياً من billingSystems()
  get availableBillingSystems() {
    return this.billingSystems().map((s) => ({ value: s.id, label: s.name }));
  }
  availableCollectionMethods = [
    { value: "cash_mobile", label: "\u062A\u062D\u0635\u064A\u0644 \u0646\u0642\u062F\u064A \u0628\u0627\u0644\u062C\u0648\u0627\u0644" },
    { value: "manual_assign", label: "\u062A\u062D\u0635\u064A\u0644 \u0625\u0633\u0646\u0627\u062F \u064A\u062F\u0648\u064A" },
    { value: "electronic", label: "\u0633\u062F\u0627\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" },
    { value: "haseb_deposit", label: "\u0625\u064A\u062F\u0627\u0639 \u062D\u0627\u0633\u0628" }
  ];
  onBizIdChange(_bizId) {
    void this.loadAll();
  }
  async loadAll() {
    this.loading.set(true);
    try {
      const [billingAccounts, systems, types, stations, emps] = await Promise.all([
        this.api.getEmployeeBillingAccounts(this.bizId),
        this.api.getBillingSystemsConfig(this.bizId).catch(() => []),
        this.api.getBillingAccountTypes(this.bizId).catch(() => []),
        this.api.getStations(this.bizId).catch(() => []),
        this.api.getEmployees(this.bizId).catch(() => [])
      ]);
      this.billingAccounts.set(billingAccounts);
      this.billingSystems.set(systems);
      this.accountTypes.set(types);
      this.stations.set(stations);
      this.employees.set(emps);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    } finally {
      this.loading.set(false);
    }
  }
  // ===== إدارة حسابات الفوترة =====
  openCreateAccount() {
    this.editingAccountId.set(null);
    this.accountForm.set({
      employeeId: "",
      stationId: this.stations()[0]?.id || "",
      billingSystemId: this.billingSystems()[0]?.id || "",
      collectionMethod: "cash_mobile",
      label: "",
      notes: ""
    });
    this.showAccountForm.set(true);
  }
  openEditAccount(acc) {
    this.editingAccountId.set(acc.id);
    this.accountForm.set({
      employeeId: acc.employeeId || "",
      stationId: acc.stationId || "",
      billingSystemId: acc.billingSystemId || "",
      collectionMethod: acc.collectionMethod || "",
      label: acc.label || "",
      notes: acc.notes || ""
    });
    this.showAccountForm.set(true);
  }
  updateAccountLabel() {
    const f = this.accountForm();
    const emp = this.employees().find((e) => e.id == f.employeeId);
    const sys = this.billingSystems().find((s) => s.id == f.billingSystemId);
    const method = this.availableCollectionMethods.find((m) => m.value === f.collectionMethod);
    if (emp && sys && method) {
      const label = `${emp.fullName} - ${sys.name} - ${method.label}`;
      this.accountForm.update((form) => __spreadProps(__spreadValues({}, form), { label }));
    }
  }
  async saveAccountForm() {
    const f = this.accountForm();
    if (!f.employeeId) {
      this.error.set("\u0627\u0644\u0645\u0648\u0638\u0641 \u0645\u0637\u0644\u0648\u0628");
      return;
    }
    if (!f.stationId) {
      this.error.set("\u0627\u0644\u0645\u062D\u0637\u0629 \u0645\u0637\u0644\u0648\u0628\u0629");
      return;
    }
    if (!f.billingSystemId) {
      this.error.set("\u0646\u0638\u0627\u0645 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0645\u0637\u0644\u0648\u0628");
      return;
    }
    if (!f.collectionMethod) {
      this.error.set("\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0645\u0637\u0644\u0648\u0628\u0629");
      return;
    }
    if (!f.label.trim()) {
      this.updateAccountLabel();
    }
    const accountData = {
      employeeId: Number.parseInt(f.employeeId, 10),
      stationId: Number.parseInt(f.stationId, 10),
      billingSystemId: Number.parseInt(String(f.billingSystemId), 10),
      collectionMethod: f.collectionMethod,
      label: this.accountForm().label || f.label,
      notes: f.notes || ""
    };
    try {
      if (this.editingAccountId()) {
        await this.api.updateEmployeeBillingAccount(this.editingAccountId(), accountData);
        this.successMsg.set("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0648\u062A\u0631\u0629");
      } else {
        await this.api.createEmployeeBillingAccount(accountData);
        this.successMsg.set("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0648\u062A\u0631\u0629");
      }
      this.showAccountForm.set(false);
      await this.loadAll();
      setTimeout(() => this.successMsg.set(""), 4e3);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    }
  }
  async toggleAccountActive(acc) {
    try {
      await this.api.updateEmployeeBillingAccount(acc.id, { isActive: !acc.isActive });
      await this.loadAll();
      this.successMsg.set(acc.isActive ? "\u062A\u0645 \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062D\u0633\u0627\u0628" : "\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628");
      setTimeout(() => this.successMsg.set(""), 3e3);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    }
  }
  async deleteAccount(acc) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u062D\u0633\u0627\u0628 "${acc.label}"\u061F`, type: "danger" });
    if (!confirmed)
      return;
    try {
      await this.api.deleteEmployeeBillingAccount(acc.id);
      await this.loadAll();
      this.successMsg.set("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062D\u0633\u0627\u0628");
      setTimeout(() => this.successMsg.set(""), 3e3);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    }
  }
  // ===== wizard إضافة نظام فوترة =====
  openSystemWizard() {
    this.wizardStep.set(1);
    this.systemForm.set({
      name: "",
      color: "#3b82f6",
      icon: "receipt",
      stationScope: "per_station",
      stationIds: [],
      supportedTypes: this.accountTypes().map((t) => t.name)
    });
    this.showSystemWizard.set(true);
  }
  wizardNext() {
    const step = this.wizardStep();
    const f = this.systemForm();
    if (step === 1 && !f.name.trim()) {
      this.error.set("\u0627\u0633\u0645 \u0627\u0644\u0646\u0638\u0627\u0645 \u0645\u0637\u0644\u0648\u0628");
      return;
    }
    this.error.set("");
    this.wizardStep.set(step + 1);
  }
  wizardBack() {
    this.wizardStep.set(this.wizardStep() - 1);
  }
  toggleWizardStation(stationId) {
    this.systemForm.update((f) => {
      const ids = [...f.stationIds];
      const idx = ids.indexOf(stationId);
      if (idx >= 0)
        ids.splice(idx, 1);
      else
        ids.push(stationId);
      return __spreadProps(__spreadValues({}, f), { stationIds: ids });
    });
  }
  toggleWizardType(typeName) {
    this.systemForm.update((f) => {
      const types = [...f.supportedTypes];
      const idx = types.indexOf(typeName);
      if (idx >= 0)
        types.splice(idx, 1);
      else
        types.push(typeName);
      return __spreadProps(__spreadValues({}, f), { supportedTypes: types });
    });
  }
  async saveSystemWizard() {
    const f = this.systemForm();
    if (!f.name.trim()) {
      this.error.set("\u0627\u0633\u0645 \u0627\u0644\u0646\u0638\u0627\u0645 \u0645\u0637\u0644\u0648\u0628");
      return;
    }
    if (f.supportedTypes.length === 0) {
      this.error.set("\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u062D\u0633\u0627\u0628 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    try {
      await this.api.createBillingSystemConfig(this.bizId, {
        name: f.name,
        color: f.color,
        icon: f.icon,
        stationScope: f.stationScope,
        stationIds: f.stationIds,
        supportedTypes: f.supportedTypes
      });
      this.showSystemWizard.set(false);
      await this.loadAll();
      this.successMsg.set(`\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0646\u0638\u0627\u0645 "${f.name}" \u0628\u0646\u062C\u0627\u062D`);
      setTimeout(() => this.successMsg.set(""), 4e3);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    }
  }
  async deleteSystem(sys) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0646\u0638\u0627\u0645 "${sys.name}"\u061F`, type: "danger" });
    if (!confirmed)
      return;
    try {
      await this.api.deleteBillingSystemConfig(sys.id);
      await this.loadAll();
      this.successMsg.set("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0646\u0638\u0627\u0645");
      setTimeout(() => this.successMsg.set(""), 3e3);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    }
  }
  // ===== إدارة أنواع الحسابات =====
  openCreateType() {
    this.editingTypeId.set(null);
    this.typeForm.set({ name: "", description: "" });
    this.showTypeForm.set(true);
  }
  openEditType(type) {
    this.editingTypeId.set(type.id);
    this.typeForm.set({ name: type.name, description: type.description || "" });
    this.showTypeForm.set(true);
  }
  async saveTypeForm() {
    const f = this.typeForm();
    if (!f.name.trim()) {
      this.error.set("\u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639 \u0645\u0637\u0644\u0648\u0628");
      return;
    }
    try {
      if (this.editingTypeId()) {
        await this.api.updateBillingAccountType(this.editingTypeId(), f);
        this.successMsg.set("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628");
      } else {
        await this.api.createBillingAccountType(this.bizId, f);
        this.successMsg.set("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u062C\u062F\u064A\u062F");
      }
      this.showTypeForm.set(false);
      await this.loadAll();
      setTimeout(() => this.successMsg.set(""), 3e3);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    }
  }
  async deleteType(type) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0646\u0648\u0639 "${type.name}"\u061F`, type: "danger" });
    if (!confirmed)
      return;
    try {
      await this.api.deleteBillingAccountType(type.id);
      await this.loadAll();
      this.successMsg.set("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0646\u0648\u0639");
      setTimeout(() => this.successMsg.set(""), 3e3);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    }
  }
  setFormField(form, field, value) {
    if (form === "account") {
      this.accountForm.update((f) => __spreadProps(__spreadValues({}, f), { [field]: value }));
      if (["employeeId", "billingSystemId", "collectionMethod"].includes(field)) {
        this.updateAccountLabel();
      }
    } else {
      this.typeForm.update((f) => __spreadProps(__spreadValues({}, f), { [field]: value }));
    }
  }
  setSystemFormField(field, value) {
    this.systemForm.update((f) => __spreadProps(__spreadValues({}, f), { [field]: value }));
  }
  getSystemInfo(name) {
    return this.billingSystems().find((s) => s.name === name) || { name, color: "#64748b", icon: "receipt" };
  }
  getSystemDisplayName(billingSystemId) {
    const sys = this.billingSystems().find((s) => s.id == billingSystemId);
    return sys?.name || String(billingSystemId);
  }
  getMethodDisplayName(method) {
    return this.methodNameMap[method] || method;
  }
  getSysCount(sysName) {
    return this.billingAccounts().filter((a) => (a.billingSystemName || this.getSystemDisplayName(a.billingSystemId)) === sysName).length;
  }
  trackById(_, item) {
    return item.id;
  }
  trackByName(_, item) {
    return item.name;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275BillingSystemsComponent_BaseFactory;
    return function BillingSystemsComponent_Factory(__ngFactoryType__) {
      return (\u0275BillingSystemsComponent_BaseFactory || (\u0275BillingSystemsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_BillingSystemsComponent)))(__ngFactoryType__ || _BillingSystemsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BillingSystemsComponent, selectors: [["app-billing-systems"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 42, vars: 18, consts: [[1, "page-container"], [1, "page-header"], [1, "header-left"], [1, "page-icon-3d", "purple"], [1, "material-icons-round"], [1, "page-title"], [1, "page-subtitle"], [1, "header-right"], ["title", "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F", 1, "help-btn", 3, "click"], [1, "alert-error"], [1, "alert-success"], [1, "stats-bar"], [1, "main-tabs"], [1, "main-tab", 3, "click"], [1, "tab-badge"], [1, "tab-content"], [1, "modal-overlay"], [1, "alert-error", 3, "click"], [1, "close-x"], [1, "alert-success", 3, "click"], [1, "stat-card"], [1, "stat-icon", "purple"], [1, "stat-num"], [1, "stat-label"], [1, "stat-icon", "blue"], [1, "stat-card", "clickable", 3, "active-stat", "--card-color"], [1, "stat-card", "clickable", 3, "click"], [1, "stat-icon"], [1, "filter-bar"], [1, "search-box"], [1, "material-icons-round", "search-icon"], ["type", "text", "placeholder", "\u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0645\u0648\u0638\u0641...", 1, "search-input", 3, "input", "value"], [1, "filter-row"], [1, "filter-group"], [1, "filter-label"], [1, "type-tabs"], [1, "type-tab", 3, "click"], [1, "type-tab", 3, "active", "--tab-color"], [1, "btn-3d", "btn-primary", 3, "click"], [1, "loading-state"], [1, "spinner"], [1, "empty-state"], [1, "empty-icon"], [1, "system-section"], [1, "system-header"], [1, "sys-icon"], [1, "sys-info"], [1, "sys-name"], [1, "sys-count"], [1, "employees-grid"], [1, "employee-card", 3, "--emp-color"], [1, "employee-card"], [1, "emp-header"], [1, "emp-avatar"], [1, "emp-info"], [1, "emp-name"], [1, "emp-count"], [1, "emp-accounts"], [1, "acc-chip", 3, "inactive-chip", "--chip-color"], [1, "acc-chip"], [1, "acc-chip-label"], [1, "acc-chip-actions"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "chip-btn", 3, "click"], [1, "chip-btn", 3, "click", "title"], ["title", "\u062D\u0630\u0641", 1, "chip-btn", "danger", 3, "click"], [1, "tab-header-row"], [1, "section-title"], [1, "section-desc"], [1, "systems-grid"], [1, "system-card", 3, "--sys-color"], [1, "system-card"], [1, "sys-card-top"], [1, "sys-card-icon"], [1, "sys-card-info"], [1, "sys-card-name"], [1, "sys-card-count"], ["title", "\u062D\u0630\u0641 \u0627\u0644\u0646\u0638\u0627\u0645", 1, "icon-btn", "danger-btn", 3, "click"], [1, "sys-types"], [1, "sys-scope-badge"], [1, "sys-type-tag", 3, "background", "color"], [1, "sys-type-tag"], [1, "types-list"], [1, "type-card"], [1, "type-card-icon"], [1, "type-card-info"], [1, "type-name"], [1, "type-desc"], [1, "type-card-actions"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "icon-btn", "edit-btn", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "icon-btn", "danger-btn", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-3d", 3, "click"], [1, "modal-header"], [1, "modal-icon", "purple"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-group"], [1, "form-label"], [1, "required"], [1, "form-input", 3, "change", "value"], ["value", ""], [3, "value"], [1, "type-selector-row"], [1, "type-option-btn", 3, "selected"], ["type", "text", "placeholder", "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062D\u0633\u0627\u0628 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A - \u064A\u064F\u0646\u0634\u0623 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)", 1, "form-input", 3, "input", "value"], [1, "form-info-box"], [1, "modal-footer"], [1, "btn-3d", "btn-ghost", 3, "click"], [1, "type-option-btn", 3, "click"], [1, "modal-3d", "wizard-modal", 3, "click"], [1, "modal-icon"], [1, "wizard-header-info"], [1, "wizard-steps"], [1, "wstep"], [1, "wstep-line"], [1, "wizard-step-content"], [1, "btn-3d", "btn-ghost"], [1, "btn-3d", "btn-primary"], [1, "btn-3d", "btn-success"], [1, "step-title"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u0627\u0644\u0645\u063A\u0631\u0628\u064A\u060C \u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u062F\u0639\u0645...", 1, "form-input", 3, "input", "value"], [1, "color-picker"], [1, "color-dot", 3, "background", "selected"], [1, "icon-picker"], [1, "icon-opt", 3, "selected", "--ic-color"], [1, "color-dot", 3, "click"], [1, "icon-opt", 3, "click"], [1, "scope-options"], [1, "scope-opt", 3, "click"], [1, "form-group", 2, "margin-top", "16px"], [1, "stations-checkboxes"], [1, "checkbox-label"], ["type", "checkbox", 3, "change", "checked"], [1, "step-desc"], [1, "types-checkboxes"], [1, "type-check-label", 3, "selected"], [1, "warn-box"], [1, "type-check-label"], [1, "type-check-info"], [1, "btn-3d", "btn-success", 3, "click"], [1, "modal-3d", "small-modal", 3, "click"], [1, "modal-icon", "teal"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u0646\u0642\u062F\u064A \u062C\u0648\u0627\u0644\u060C \u0625\u0633\u0646\u0627\u062F \u064A\u062F\u0648\u064A...", 1, "form-input", 3, "input", "value"], ["rows", "3", "placeholder", "\u0627\u0634\u0631\u062D \u0622\u0644\u064A\u0629 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u0648\u0643\u064A\u0641 \u064A\u0639\u0645\u0644...", 1, "form-input", 3, "input", "value"], [1, "modal-3d", "hiw-modal", 3, "click"], [1, "modal-icon", "amber"], [1, "hiw-section"]], template: function BillingSystemsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "receipt_long");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1", 5);
      \u0275\u0275text(8, "\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10, "\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0648\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
      \u0275\u0275listener("click", function BillingSystemsComponent_Template_button_click_12_listener() {
        return ctx.showHowItWorks.set(true);
      });
      \u0275\u0275elementStart(13, "span", 4);
      \u0275\u0275text(14, "help_outline");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(15, BillingSystemsComponent_Conditional_15_Template, 6, 1, "div", 9);
      \u0275\u0275conditionalCreate(16, BillingSystemsComponent_Conditional_16_Template, 6, 1, "div", 10);
      \u0275\u0275conditionalCreate(17, BillingSystemsComponent_Conditional_17_Template, 21, 2, "div", 11);
      \u0275\u0275elementStart(18, "div", 12)(19, "button", 13);
      \u0275\u0275listener("click", function BillingSystemsComponent_Template_button_click_19_listener() {
        return ctx.activeTab.set("accounts");
      });
      \u0275\u0275elementStart(20, "span", 4);
      \u0275\u0275text(21, "receipt");
      \u0275\u0275elementEnd();
      \u0275\u0275text(22, " \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0648\u062A\u0631\u0629 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "button", 13);
      \u0275\u0275listener("click", function BillingSystemsComponent_Template_button_click_23_listener() {
        return ctx.activeTab.set("systems");
      });
      \u0275\u0275elementStart(24, "span", 4);
      \u0275\u0275text(25, "settings");
      \u0275\u0275elementEnd();
      \u0275\u0275text(26, " \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 ");
      \u0275\u0275elementStart(27, "span", 14);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "button", 13);
      \u0275\u0275listener("click", function BillingSystemsComponent_Template_button_click_29_listener() {
        return ctx.activeTab.set("types");
      });
      \u0275\u0275elementStart(30, "span", 4);
      \u0275\u0275text(31, "category");
      \u0275\u0275elementEnd();
      \u0275\u0275text(32, " \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A ");
      \u0275\u0275elementStart(33, "span", 14);
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(35, BillingSystemsComponent_Conditional_35_Template, 29, 11, "div", 15);
      \u0275\u0275conditionalCreate(36, BillingSystemsComponent_Conditional_36_Template, 14, 1, "div", 15);
      \u0275\u0275conditionalCreate(37, BillingSystemsComponent_Conditional_37_Template, 14, 1, "div", 15);
      \u0275\u0275conditionalCreate(38, BillingSystemsComponent_Conditional_38_Template, 65, 6, "div", 16);
      \u0275\u0275conditionalCreate(39, BillingSystemsComponent_Conditional_39_Template, 30, 18, "div", 16);
      \u0275\u0275conditionalCreate(40, BillingSystemsComponent_Conditional_40_Template, 29, 4, "div", 16);
      \u0275\u0275conditionalCreate(41, BillingSystemsComponent_Conditional_41_Template, 43, 0, "div", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275conditional(ctx.error() ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMsg() ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() ? 17 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab() === "accounts");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("active", ctx.activeTab() === "systems");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.billingSystems().length);
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.activeTab() === "types");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.accountTypes().length);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "accounts" ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "systems" ? 36 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "types" ? 37 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showAccountForm() ? 38 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSystemWizard() ? 39 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showTypeForm() ? 40 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showHowItWorks() ? 41 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.page-container[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.page-icon-3d[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);\n}\n.page-icon-3d.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #7c3aed);\n  color: white;\n}\n.page-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--text-muted);\n  margin: 4px 0 0;\n}\n.help-btn[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  color: var(--text-muted);\n}\n.help-btn[_ngcontent-%COMP%]:hover {\n  border-color: #8b5cf6;\n  color: #8b5cf6;\n}\n.alert-error[_ngcontent-%COMP%], \n.alert-success[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  margin-bottom: 16px;\n  cursor: pointer;\n  font-size: 14px;\n}\n.alert-error[_ngcontent-%COMP%]   .close-x[_ngcontent-%COMP%], \n.alert-success[_ngcontent-%COMP%]   .close-x[_ngcontent-%COMP%] {\n  margin-right: auto;\n  opacity: 0.6;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #fca5a5;\n  border: 1px solid rgba(239, 68, 68, 0.3);\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #86efac;\n  border: 1px solid rgba(34, 197, 94, 0.3);\n}\n.stats-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 18px;\n  background: var(--bg-card);\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n  transition: all 0.2s;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: var(--shadow-hover);\n}\n.stat-card.clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.stat-card.active-stat[_ngcontent-%COMP%] {\n  border-color: var(--card-color, #8b5cf6);\n  box-shadow: 0 0 0 2px var(--card-color, #8b5cf6), var(--shadow-hover);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.stat-icon.purple[_ngcontent-%COMP%] {\n  background: rgba(139, 92, 246, 0.2);\n  color: #c084fc;\n}\n.stat-icon.blue[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.2);\n  color: #60a5fa;\n}\n.stat-num[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-muted);\n  margin-top: 2px;\n}\n.main-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  margin-bottom: 20px;\n  background: var(--bg-card);\n  border-radius: 14px;\n  padding: 6px;\n  border: 1px solid var(--border-color);\n}\n.main-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 18px;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  background: transparent;\n  color: var(--text-muted);\n  transition: all 0.2s;\n  font-family: "Tajawal", sans-serif;\n}\n.main-tab[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.main-tab[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface);\n  color: var(--text-primary);\n}\n.main-tab.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7c3aed,\n      #a855f7);\n  color: white;\n  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);\n}\n.tab-badge[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  color: inherit;\n  border-radius: 20px;\n  padding: 1px 7px;\n  font-size: 11px;\n  font-weight: 600;\n}\n.tab-content[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n.tab-header-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  gap: 16px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.section-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: 0;\n}\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 20px;\n  background: var(--bg-card);\n  border-radius: 14px;\n  padding: 16px;\n  border: 1px solid var(--border-color);\n}\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--bg-input);\n  border-radius: 10px;\n  padding: 0 12px;\n  border: 1px solid var(--border-color);\n}\n.search-box[_ngcontent-%COMP%]:focus-within {\n  border-color: #8b5cf6;\n}\n.search-box[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 18px;\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  background: none;\n  border: none;\n  outline: none;\n  padding: 10px 0;\n  color: var(--text-primary);\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-faint);\n}\n.filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.filter-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n  white-space: nowrap;\n  font-weight: 500;\n}\n.type-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.type-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 5px 12px;\n  border-radius: 20px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  font-size: 12px;\n  transition: all 0.2s;\n  font-family: "Tajawal", sans-serif;\n}\n.type-tab[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.type-tab[_ngcontent-%COMP%]:hover {\n  border-color: var(--tab-color, #8b5cf6);\n  color: var(--text-primary);\n}\n.type-tab.active[_ngcontent-%COMP%] {\n  background: var(--tab-color, #8b5cf6);\n  color: white;\n  border-color: var(--tab-color, #8b5cf6);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: 3px solid var(--border-color);\n  border-top-color: #8b5cf6;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--text-primary);\n  margin: 0 0 8px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  margin: 0 0 20px;\n  font-size: 0.9rem;\n}\n.system-section[_ngcontent-%COMP%] {\n  margin-bottom: 28px;\n}\n.system-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 14px;\n  padding: 14px 18px;\n  border-radius: 14px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-right: 4px solid var(--sys-color, #8b5cf6);\n}\n.sys-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 22px;\n}\n.sys-name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.sys-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n}\n.sys-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.employees-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 14px;\n}\n.employee-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  padding: 16px;\n  transition: all 0.2s;\n}\n.employee-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-hover);\n  transform: translateY(-2px);\n}\n.emp-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.emp-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 18px;\n  font-weight: 700;\n}\n.emp-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.emp-count[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n}\n.emp-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.emp-accounts[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.acc-chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 6px 10px;\n  border-radius: 8px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  transition: all 0.15s;\n}\n.acc-chip[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.acc-chip.inactive-chip[_ngcontent-%COMP%] {\n  opacity: 0.4;\n}\n.acc-chip-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 500;\n}\n.acc-chip-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n}\n.chip-btn[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 6px;\n  border: none;\n  background: transparent;\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s;\n}\n.chip-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.chip-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n}\n.chip-btn.danger[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.15);\n  color: #f87171;\n}\n.systems-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 16px;\n}\n.system-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  padding: 18px;\n  border-top: 3px solid var(--sys-color, #8b5cf6);\n  transition: all 0.2s;\n}\n.system-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-hover);\n}\n.sys-card-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 14px;\n}\n.sys-card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 22px;\n}\n.sys-card-name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.sys-card-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n}\n.sys-card-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.sys-types[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-bottom: 12px;\n}\n.sys-type-tag[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 500;\n}\n.sys-scope-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--text-muted);\n  padding: 6px 10px;\n  background: var(--bg-surface);\n  border-radius: 8px;\n}\n.sys-scope-badge[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.sys-scope-badge.multi[_ngcontent-%COMP%] {\n  color: #60a5fa;\n}\n.types-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.type-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n  background: var(--bg-card);\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  transition: all 0.2s;\n}\n.type-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-hover);\n}\n.type-card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background: rgba(139, 92, 246, 0.2);\n  color: #c084fc;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n  flex-shrink: 0;\n}\n.type-card-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.type-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.type-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: 0;\n  line-height: 1.5;\n}\n.type-card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.btn-3d[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 9px 18px;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.2s;\n  font-family: "Tajawal", sans-serif;\n}\n.btn-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.btn-3d[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n}\n.btn-3d[_ngcontent-%COMP%]:active {\n  transform: none;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7c3aed,\n      #a855f7);\n  color: white;\n  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 18px rgba(124, 58, 237, 0.5);\n}\n.btn-success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #16a34a,\n      #22c55e);\n  color: white;\n  box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  color: var(--text-muted);\n  border: 1px solid var(--border-color);\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  color: var(--text-primary);\n  background: var(--bg-surface);\n}\n.icon-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s;\n}\n.icon-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.icon-btn.edit-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.15);\n  color: #60a5fa;\n  border-color: rgba(59, 130, 246, 0.3);\n}\n.icon-btn.danger-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.15);\n  color: #f87171;\n  border-color: rgba(239, 68, 68, 0.3);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.65);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: _ngcontent-%COMP%_fadeIn 0.2s;\n}\n.modal-3d[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: 20px;\n  border: 1px solid var(--border-color);\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);\n  width: 100%;\n  max-width: 540px;\n  max-height: 90vh;\n  overflow-y: auto;\n  direction: rtl;\n}\n.modal-3d.wizard-modal[_ngcontent-%COMP%] {\n  max-width: 580px;\n}\n.modal-3d.small-modal[_ngcontent-%COMP%] {\n  max-width: 460px;\n}\n.modal-3d.hiw-modal[_ngcontent-%COMP%] {\n  max-width: 600px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 20px 24px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 17px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.wizard-header-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.wizard-header-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 22px;\n  flex-shrink: 0;\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7c3aed,\n      #a855f7);\n}\n.modal-icon.teal[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #0d9488,\n      #14b8a6);\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #d97706,\n      #f59e0b);\n}\n.modal-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: none;\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s;\n  flex-shrink: 0;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.15);\n  color: #f87171;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 16px 24px;\n  border-top: 1px solid var(--border-color);\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 18px;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  margin-bottom: 8px;\n}\n.form-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #f87171;\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px;\n  border-radius: 10px;\n  background: var(--bg-input);\n  border: 1px solid var(--border-color);\n  color: var(--text-primary);\n  font-size: 14px;\n  outline: none;\n  font-family: "Tajawal", sans-serif;\n  transition: border-color 0.2s;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: #8b5cf6;\n}\n.form-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-faint);\n}\n.form-input[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  color: var(--text-primary);\n}\ntextarea.form-input[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.form-info-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  background: rgba(59, 130, 246, 0.1);\n  border: 1px solid rgba(59, 130, 246, 0.25);\n  border-radius: 10px;\n  font-size: 13px;\n  color: #60a5fa;\n}\n.form-info-box[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.system-selector[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.sys-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  font-size: 13px;\n  transition: all 0.2s;\n  font-family: "Tajawal", sans-serif;\n}\n.sys-option[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.sys-option[_ngcontent-%COMP%]:hover {\n  border-color: var(--opt-color, #8b5cf6);\n  color: var(--text-primary);\n}\n.sys-option.selected[_ngcontent-%COMP%] {\n  background: var(--opt-color, #8b5cf6);\n  color: white;\n  border-color: var(--opt-color, #8b5cf6);\n}\n.type-selector-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.type-option-btn[_ngcontent-%COMP%] {\n  padding: 7px 14px;\n  border-radius: 20px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  font-size: 13px;\n  transition: all 0.2s;\n  font-family: "Tajawal", sans-serif;\n}\n.type-option-btn[_ngcontent-%COMP%]:hover {\n  border-color: #8b5cf6;\n  color: var(--text-primary);\n}\n.type-option-btn.selected[_ngcontent-%COMP%] {\n  background: #8b5cf6;\n  color: white;\n  border-color: #8b5cf6;\n}\n.wizard-steps[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0;\n}\n.wstep[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: 2px solid var(--border-color);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-muted);\n  transition: all 0.3s;\n}\n.wstep.active[_ngcontent-%COMP%] {\n  border-color: #8b5cf6;\n  color: #c084fc;\n  background: rgba(139, 92, 246, 0.15);\n}\n.wstep.done[_ngcontent-%COMP%] {\n  border-color: #22c55e;\n  color: #22c55e;\n  background: rgba(34, 197, 94, 0.1);\n}\n.wstep-line[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 2px;\n  background: var(--border-color);\n}\n.wizard-step-content[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n.step-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 18px;\n}\n.step-title[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #c084fc;\n}\n.step-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: -10px 0 16px;\n}\n.color-picker[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.color-dot[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.color-dot[_ngcontent-%COMP%]:hover {\n  transform: scale(1.15);\n}\n.color-dot.selected[_ngcontent-%COMP%] {\n  border-color: white;\n  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);\n  transform: scale(1.15);\n}\n.icon-picker[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.icon-opt[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s;\n}\n.icon-opt[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.icon-opt[_ngcontent-%COMP%]:hover {\n  border-color: var(--ic-color, #8b5cf6);\n  color: var(--ic-color, #8b5cf6);\n}\n.icon-opt.selected[_ngcontent-%COMP%] {\n  background: var(--ic-color, #8b5cf6);\n  color: white;\n  border-color: var(--ic-color, #8b5cf6);\n}\n.scope-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-direction: column;\n}\n.scope-opt[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 4px;\n  padding: 14px 16px;\n  border-radius: 12px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  text-align: right;\n  transition: all 0.2s;\n}\n.scope-opt[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: var(--text-muted);\n  margin-bottom: 4px;\n}\n.scope-opt[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.scope-opt[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n  margin: 0;\n}\n.scope-opt[_ngcontent-%COMP%]:hover {\n  border-color: #8b5cf6;\n}\n.scope-opt.selected[_ngcontent-%COMP%] {\n  border-color: #8b5cf6;\n  background: rgba(139, 92, 246, 0.1);\n}\n.scope-opt.selected[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #c084fc;\n}\n.stations-checkboxes[_ngcontent-%COMP%], \n.types-checkboxes[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  font-size: 14px;\n  color: var(--text-primary);\n  transition: all 0.15s;\n  font-family: "Tajawal", sans-serif;\n}\n.checkbox-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  accent-color: #8b5cf6;\n  width: 16px;\n  height: 16px;\n}\n.checkbox-label[_ngcontent-%COMP%]:hover {\n  border-color: #8b5cf6;\n}\n.type-check-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.type-check-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  accent-color: #8b5cf6;\n  width: 16px;\n  height: 16px;\n  margin-top: 2px;\n  flex-shrink: 0;\n}\n.type-check-label[_ngcontent-%COMP%]:hover {\n  border-color: #8b5cf6;\n}\n.type-check-label.selected[_ngcontent-%COMP%] {\n  border-color: #8b5cf6;\n  background: rgba(139, 92, 246, 0.08);\n}\n.type-check-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.type-check-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.type-check-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-muted);\n  line-height: 1.4;\n}\n.warn-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  margin-top: 12px;\n  background: rgba(245, 158, 11, 0.1);\n  border: 1px solid rgba(245, 158, 11, 0.3);\n  border-radius: 10px;\n  font-size: 13px;\n  color: #fbbf24;\n}\n.warn-box[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.hiw-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid var(--border-color);\n}\n.hiw-section[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  margin-bottom: 0;\n}\n.hiw-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 700;\n  color: #c084fc;\n  margin: 0 0 8px;\n}\n.hiw-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.hiw-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  line-height: 1.6;\n  margin: 0;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .page-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .employees-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .systems-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .main-tabs[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=billing-systems.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BillingSystemsComponent, [{
    type: Component,
    args: [{ selector: "app-billing-systems", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-container">\r
\r
  <!-- ===== Page Header ===== -->\r
  <div class="page-header">\r
    <div class="header-left">\r
      <div class="page-icon-3d purple">\r
        <span class="material-icons-round">receipt_long</span>\r
      </div>\r
      <div>\r
        <h1 class="page-title">\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629</h1>\r
        <p class="page-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0648\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646</p>\r
      </div>\r
    </div>\r
    <div class="header-right">\r
      <button class="help-btn" (click)="showHowItWorks.set(true)" title="\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F">\r
        <span class="material-icons-round">help_outline</span>\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- ===== Messages ===== -->\r
  @if (error()) {\r
    <div class="alert-error" (click)="error.set('')">\r
      <span class="material-icons-round">error_outline</span>\r
      {{ error() }}\r
      <span class="close-x">\u2715</span>\r
    </div>\r
  }\r
  @if (successMsg()) {\r
    <div class="alert-success" (click)="successMsg.set('')">\r
      <span class="material-icons-round">check_circle</span>\r
      {{ successMsg() }}\r
      <span class="close-x">\u2715</span>\r
    </div>\r
  }\r
\r
  <!-- ===== Stats Bar ===== -->\r
  @if (!loading()) {\r
    <div class="stats-bar">\r
      <div class="stat-card">\r
        <div class="stat-icon purple"><span class="material-icons-round">receipt</span></div>\r
        <div>\r
          <div class="stat-num">{{ stats().total }}</div>\r
          <div class="stat-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A</div>\r
        </div>\r
      </div>\r
      <div class="stat-card">\r
        <div class="stat-icon blue"><span class="material-icons-round">people</span></div>\r
        <div>\r
          <div class="stat-num">{{ stats().employees }}</div>\r
          <div class="stat-label">\u0645\u0648\u0638\u0641</div>\r
        </div>\r
      </div>\r
      @for (s of stats().bySys; track s.name) {\r
        @if (s.count > 0) {\r
          <div class="stat-card clickable"\r
               [class.active-stat]="activeSystem() === s.name"\r
               [style.--card-color]="s.color"\r
               (click)="activeTab.set('accounts'); activeSystem.set(activeSystem() === s.name ? 'all' : s.name)">\r
            <div class="stat-icon" [style.background]="s.color + '25'" [style.color]="s.color">\r
              <span class="material-icons-round">{{ s.icon }}</span>\r
            </div>\r
            <div>\r
              <div class="stat-num">{{ s.count }}</div>\r
              <div class="stat-label">{{ s.name }}</div>\r
            </div>\r
          </div>\r
        }\r
      }\r
    </div>\r
  }\r
\r
  <!-- ===== Main Tabs ===== -->\r
  <div class="main-tabs">\r
    <button class="main-tab" [class.active]="activeTab() === 'accounts'" (click)="activeTab.set('accounts')">\r
      <span class="material-icons-round">receipt</span>\r
      \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0648\u062A\u0631\u0629\r
    </button>\r
    <button class="main-tab" [class.active]="activeTab() === 'systems'" (click)="activeTab.set('systems')">\r
      <span class="material-icons-round">settings</span>\r
      \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629\r
      <span class="tab-badge">{{ billingSystems().length }}</span>\r
    </button>\r
    <button class="main-tab" [class.active]="activeTab() === 'types'" (click)="activeTab.set('types')">\r
      <span class="material-icons-round">category</span>\r
      \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A\r
      <span class="tab-badge">{{ accountTypes().length }}</span>\r
    </button>\r
  </div>\r
\r
  <!-- ===================================================== -->\r
  <!-- TAB 1: \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0648\u062A\u0631\u0629                                 -->\r
  <!-- ===================================================== -->\r
  @if (activeTab() === 'accounts') {\r
    <div class="tab-content">\r
\r
      <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0648\u0627\u0644\u0628\u062D\u062B -->\r
      <div class="filter-bar">\r
        <div class="search-box">\r
          <span class="material-icons-round search-icon">search</span>\r
          <input type="text" placeholder="\u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0645\u0648\u0638\u0641..." class="search-input"\r
                 [value]="searchQuery()" (input)="searchQuery.set($any($event.target).value)">\r
        </div>\r
        <div class="filter-row">\r
          <div class="filter-group">\r
            <span class="filter-label">\u0627\u0644\u0646\u0638\u0627\u0645:</span>\r
            <div class="type-tabs">\r
              <button class="type-tab" [class.active]="activeSystem() === 'all'"\r
                      [style.--tab-color]="'#64748b'" (click)="activeSystem.set('all')">\u0627\u0644\u0643\u0644</button>\r
              @for (s of billingSystems(); track s.name) {\r
                <button class="type-tab" [class.active]="activeSystem() === s.name"\r
                        [style.--tab-color]="s.color" (click)="activeSystem.set(s.name)">\r
                  <span class="material-icons-round">{{ s.icon }}</span>\r
                  {{ s.name }}\r
                </button>\r
              }\r
            </div>\r
          </div>\r
          <div class="filter-group">\r
            <span class="filter-label">\u0627\u0644\u0645\u062D\u0637\u0629:</span>\r
            <div class="type-tabs">\r
              <button class="type-tab" [class.active]="activeStation() === 'all'"\r
                      [style.--tab-color]="'#64748b'" (click)="activeStation.set('all')">\u0627\u0644\u0643\u0644</button>\r
              @for (name of stationNames(); track name) {\r
                <button class="type-tab" [class.active]="activeStation() === name"\r
                        [style.--tab-color]="'#06b6d4'" (click)="activeStation.set(name)">{{ name }}</button>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
        <button class="btn-3d btn-primary" (click)="openCreateAccount()">\r
          <span class="material-icons-round">add</span>\r
          \u062D\u0633\u0627\u0628 \u0641\u0648\u062A\u0631\u0629 \u062C\u062F\u064A\u062F\r
        </button>\r
      </div>\r
\r
      @if (loading()) {\r
        <div class="loading-state">\r
          <div class="spinner"></div>\r
          <span>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</span>\r
        </div>\r
      }\r
\r
      @if (!loading()) {\r
        @if (groupedBySystem().length === 0) {\r
          <div class="empty-state">\r
            <div class="empty-icon"><span class="material-icons-round">receipt_long</span></div>\r
            <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0633\u0627\u0628\u0627\u062A \u0641\u0648\u062A\u0631\u0629</h3>\r
            <p>\u0623\u0636\u0641 \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0645\u0646 \u0647\u0646\u0627. \u0633\u062A\u0638\u0647\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A \u0635\u0641\u062D\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0628\u0646\u0648\u0639 "\u0641\u0648\u062A\u0631\u0629".</p>\r
            <button class="btn-3d btn-primary" (click)="openCreateAccount()">\r
              <span class="material-icons-round">add</span>\r
              \u0623\u0636\u0641 \u0623\u0648\u0644 \u062D\u0633\u0627\u0628\r
            </button>\r
          </div>\r
        } @else {\r
          @for (group of groupedBySystem(); track group.system) {\r
            <div class="system-section">\r
              <div class="system-header" [style.--sys-color]="group.info.color">\r
                <div class="sys-icon" [style.background]="group.info.color">\r
                  <span class="material-icons-round">{{ group.info.icon }}</span>\r
                </div>\r
                <div class="sys-info">\r
                  <h2 class="sys-name">{{ group.system }}</h2>\r
                  <span class="sys-count">{{ group.employees.length }} \u0645\u0648\u0638\u0641 \xB7 {{ group.employees.length }} \u062D\u0633\u0627\u0628</span>\r
                </div>\r
              </div>\r
\r
              <div class="employees-grid">\r
                @for (emp of group.employees; track emp.name) {\r
                  <div class="employee-card" [style.--emp-color]="group.info.color">\r
                    <div class="emp-header">\r
                      <div class="emp-avatar" [style.background]="group.info.color">\r
                        {{ emp.name.charAt(0) }}\r
                      </div>\r
                      <div class="emp-info">\r
                        <h3 class="emp-name">{{ emp.name }}</h3>\r
                        <span class="emp-count">{{ emp.accounts.length }} \u062D\u0633\u0627\u0628</span>\r
                      </div>\r
                    </div>\r
                    <div class="emp-accounts">\r
                      @for (acc of emp.accounts; track acc.id) {\r
                        <div class="acc-chip" [class.inactive-chip]="!acc.isActive"\r
                             [style.--chip-color]="group.info.color">\r
                          <span class="acc-chip-label">{{ getMethodDisplayName(acc.collectionMethod) }}</span>\r
                          <div class="acc-chip-actions">\r
                            <button class="chip-btn" (click)="openEditAccount(acc)" title="\u062A\u0639\u062F\u064A\u0644">\r
                              <span class="material-icons-round">edit</span>\r
                            </button>\r
                            <button class="chip-btn" (click)="toggleAccountActive(acc)"\r
                                    [title]="acc.isActive ? '\u0625\u064A\u0642\u0627\u0641' : '\u062A\u0641\u0639\u064A\u0644'">\r
                              <span class="material-icons-round">{{ acc.isActive ? 'pause' : 'play_arrow' }}</span>\r
                            </button>\r
                            <button class="chip-btn danger" (click)="deleteAccount(acc)" title="\u062D\u0630\u0641">\r
                              <span class="material-icons-round">delete</span>\r
                            </button>\r
                          </div>\r
                        </div>\r
                      }\r
                    </div>\r
                  </div>\r
                }\r
              </div>\r
            </div>\r
          }\r
        }\r
      }\r
    </div>\r
  }\r
\r
  <!-- ===================================================== -->\r
  <!-- TAB 2: \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629                                  -->\r
  <!-- ===================================================== -->\r
  @if (activeTab() === 'systems') {\r
    <div class="tab-content">\r
      <div class="tab-header-row">\r
        <div>\r
          <h2 class="section-title">\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629</h2>\r
          <p class="section-desc">\u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0644\u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631. \u0643\u0644 \u0646\u0638\u0627\u0645 \u0644\u0647 \u062D\u0633\u0627\u0628\u0627\u062A\u0647 \u0627\u0644\u0645\u0633\u062A\u0642\u0644\u0629 \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646.</p>\r
        </div>\r
        <button class="btn-3d btn-primary" (click)="openSystemWizard()">\r
          <span class="material-icons-round">add</span>\r
          \u0646\u0638\u0627\u0645 \u062C\u062F\u064A\u062F\r
        </button>\r
      </div>\r
\r
      @if (loading()) {\r
        <div class="loading-state"><div class="spinner"></div></div>\r
      } @else if (billingSystems().length === 0) {\r
        <div class="empty-state">\r
          <div class="empty-icon"><span class="material-icons-round">settings</span></div>\r
          <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0638\u0645\u0629 \u0641\u0648\u062A\u0631\u0629</h3>\r
          <p>\u0623\u0636\u0641 \u0646\u0638\u0627\u0645 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0627\u0644\u0623\u0648\u0644 \u0644\u0628\u062F\u0621 \u0625\u062F\u0627\u0631\u0629 \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646.</p>\r
          <button class="btn-3d btn-primary" (click)="openSystemWizard()">\r
            <span class="material-icons-round">add</span>\r
            \u0623\u0636\u0641 \u0646\u0638\u0627\u0645\r
          </button>\r
        </div>\r
      } @else {\r
        <div class="systems-grid">\r
          @for (sys of billingSystems(); track sys.id) {\r
            <div class="system-card" [style.--sys-color]="sys.color">\r
              <div class="sys-card-top">\r
                <div class="sys-card-icon" [style.background]="sys.color">\r
                  <span class="material-icons-round">{{ sys.icon }}</span>\r
                </div>\r
                <div class="sys-card-info">\r
                  <h3 class="sys-card-name">{{ sys.name }}</h3>\r
                  <span class="sys-card-count">\r
                    {{ getSysCount(sys.name) }} \u062D\u0633\u0627\u0628\r
                  </span>\r
                </div>\r
                <button class="icon-btn danger-btn" (click)="deleteSystem(sys)" title="\u062D\u0630\u0641 \u0627\u0644\u0646\u0638\u0627\u0645">\r
                  <span class="material-icons-round">delete</span>\r
                </button>\r
              </div>\r
              @if (sys.supportedTypes && sys.supportedTypes.length > 0) {\r
                <div class="sys-types">\r
                  @for (t of sys.supportedTypes; track t) {\r
                    <span class="sys-type-tag" [style.background]="sys.color + '20'" [style.color]="sys.color">\r
                      {{ t }}\r
                    </span>\r
                  }\r
                </div>\r
              }\r
              <div class="sys-scope-badge" [class.multi]="sys.stationScope === 'multi_station'">\r
                <span class="material-icons-round">{{ sys.stationScope === 'per_station' ? 'location_on' : 'hub' }}</span>\r
                {{ sys.stationScope === 'per_station' ? '\u0646\u0638\u0627\u0645 \u0645\u0633\u062A\u0642\u0644 \u0644\u0643\u0644 \u0645\u062D\u0637\u0629' : '\u0646\u0638\u0627\u0645 \u0645\u0648\u062D\u062F \u0644\u0639\u062F\u0629 \u0645\u062D\u0637\u0627\u062A' }}\r
              </div>\r
            </div>\r
          }\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- ===================================================== -->\r
  <!-- TAB 3: \u0623\u0646\u0648\u0627\u0639 \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0648\u062A\u0631\u0629                           -->\r
  <!-- ===================================================== -->\r
  @if (activeTab() === 'types') {\r
    <div class="tab-content">\r
      <div class="tab-header-row">\r
        <div>\r
          <h2 class="section-title">\u0623\u0646\u0648\u0627\u0639 \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0648\u062A\u0631\u0629</h2>\r
          <p class="section-desc">\u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0648\u062A\u0631\u0629. \u0643\u0644 \u0646\u0648\u0639 \u064A\u0645\u062B\u0644 \u0622\u0644\u064A\u0629 \u062A\u062D\u0635\u064A\u0644 \u0645\u062E\u062A\u0644\u0641\u0629.</p>\r
        </div>\r
        <button class="btn-3d btn-primary" (click)="openCreateType()">\r
          <span class="material-icons-round">add</span>\r
          \u0646\u0648\u0639 \u062C\u062F\u064A\u062F\r
        </button>\r
      </div>\r
\r
      @if (loading()) {\r
        <div class="loading-state"><div class="spinner"></div></div>\r
      } @else if (accountTypes().length === 0) {\r
        <div class="empty-state">\r
          <div class="empty-icon"><span class="material-icons-round">category</span></div>\r
          <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u062D\u0633\u0627\u0628\u0627\u062A</h3>\r
          <button class="btn-3d btn-primary" (click)="openCreateType()">\r
            <span class="material-icons-round">add</span>\r
            \u0623\u0636\u0641 \u0646\u0648\u0639\r
          </button>\r
        </div>\r
      } @else {\r
        <div class="types-list">\r
          @for (type of accountTypes(); track type.id) {\r
            <div class="type-card">\r
              <div class="type-card-icon">\r
                <span class="material-icons-round">receipt</span>\r
              </div>\r
              <div class="type-card-info">\r
                <h3 class="type-name">{{ type.name }}</h3>\r
                @if (type.description) {\r
                  <p class="type-desc">{{ type.description }}</p>\r
                }\r
              </div>\r
              <div class="type-card-actions">\r
                <button class="icon-btn edit-btn" (click)="openEditType(type)" title="\u062A\u0639\u062F\u064A\u0644">\r
                  <span class="material-icons-round">edit</span>\r
                </button>\r
                <button class="icon-btn danger-btn" (click)="deleteType(type)" title="\u062D\u0630\u0641">\r
                  <span class="material-icons-round">delete</span>\r
                </button>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- ===================================================== -->\r
  <!-- Modal: \u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 \u062D\u0633\u0627\u0628 \u0641\u0648\u062A\u0631\u0629                         -->\r
  <!-- ===================================================== -->\r
  @if (showAccountForm()) {\r
    <div class="modal-overlay" (click)="showAccountForm.set(false)">\r
      <div class="modal-3d" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-icon purple">\r
            <span class="material-icons-round">receipt</span>\r
          </div>\r
          <h2>{{ editingAccountId() ? '\u062A\u0639\u062F\u064A\u0644 \u062D\u0633\u0627\u0628 \u0627\u0644\u0641\u0648\u062A\u0631\u0629' : '\u062D\u0633\u0627\u0628 \u0641\u0648\u062A\u0631\u0629 \u062C\u062F\u064A\u062F' }}</h2>\r
          <button class="modal-close" (click)="showAccountForm.set(false)">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
\r
          <div class="form-group">\r
            <label class="form-label">\u0627\u0644\u0645\u062D\u0637\u0629 <span class="required">*</span></label>\r
            <select class="form-input" [value]="accountForm().stationId"\r
                    (change)="setFormField('account', 'stationId', $any($event.target).value)">\r
              <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062D\u0637\u0629 --</option>\r
              @for (s of stations(); track s.id) {\r
                <option [value]="s.id">{{ s.name }}</option>\r
              }\r
            </select>\r
          </div>\r
\r
          <div class="form-group">\r
            <label class="form-label">\u0627\u0644\u0645\u0648\u0638\u0641 <span class="required">*</span></label>\r
            <select class="form-input" [value]="accountForm().employeeId"\r
                    (change)="setFormField('account', 'employeeId', $any($event.target).value)">\r
              <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 --</option>\r
              @for (e of employees(); track e.id) {\r
                <option [value]="e.id">{{ e.fullName }}</option>\r
              }\r
            </select>\r
          </div>\r
\r
          <div class="form-group">\r
            <label class="form-label">\u0646\u0638\u0627\u0645 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 <span class="required">*</span></label>\r
            <select class="form-input" [value]="accountForm().billingSystemId"\r
                    (change)="setFormField('account', 'billingSystemId', $any($event.target).value)">\r
              <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 --</option>\r
              @for (s of availableBillingSystems; track s.value) {\r
                <option [value]="s.value">{{ s.label }}</option>\r
              }\r
            </select>\r
          </div>\r
\r
          <div class="form-group">\r
            <label class="form-label">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062D\u0635\u064A\u0644 <span class="required">*</span></label>\r
            <div class="type-selector-row">\r
              @for (m of availableCollectionMethods; track m.value) {\r
                <button class="type-option-btn" [class.selected]="accountForm().collectionMethod === m.value"\r
                        (click)="setFormField('account', 'collectionMethod', m.value)">\r
                  {{ m.label }}\r
                </button>\r
              }\r
            </div>\r
          </div>\r
\r
          <div class="form-group">\r
            <label class="form-label">\u0627\u0644\u0639\u0646\u0648\u0627\u0646</label>\r
            <input class="form-input" type="text" placeholder="\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062D\u0633\u0627\u0628 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A - \u064A\u064F\u0646\u0634\u0623 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B)"\r
                   [value]="accountForm().label"\r
                   (input)="setFormField('account', 'label', $any($event.target).value)">\r
          </div>\r
\r
          <div class="form-info-box">\r
            <span class="material-icons-round">info</span>\r
            \u0633\u064A\u064F\u0646\u0634\u0623 \u062D\u0633\u0627\u0628 \u0641\u0648\u062A\u0631\u0629 \u0644\u0644\u0645\u0648\u0638\u0641 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u062D\u062F\u062F.\r
          </div>\r
\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-3d btn-ghost" (click)="showAccountForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
          <button class="btn-3d btn-primary" (click)="saveAccountForm()">\r
            <span class="material-icons-round">save</span>\r
            {{ editingAccountId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===================================================== -->\r
  <!-- Modal: wizard \u0625\u0636\u0627\u0641\u0629 \u0646\u0638\u0627\u0645 \u0641\u0648\u062A\u0631\u0629 \u062C\u062F\u064A\u062F                   -->\r
  <!-- ===================================================== -->\r
  @if (showSystemWizard()) {\r
    <div class="modal-overlay" (click)="showSystemWizard.set(false)">\r
      <div class="modal-3d wizard-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-icon" [style.background]="systemForm().color">\r
            <span class="material-icons-round">{{ systemForm().icon }}</span>\r
          </div>\r
          <div class="wizard-header-info">\r
            <h2>\u0625\u0636\u0627\u0641\u0629 \u0646\u0638\u0627\u0645 \u0641\u0648\u062A\u0631\u0629 \u062C\u062F\u064A\u062F</h2>\r
            <div class="wizard-steps">\r
              <span class="wstep" [class.active]="wizardStep() >= 1" [class.done]="wizardStep() > 1">\u0661</span>\r
              <span class="wstep-line"></span>\r
              <span class="wstep" [class.active]="wizardStep() >= 2" [class.done]="wizardStep() > 2">\u0662</span>\r
              <span class="wstep-line"></span>\r
              <span class="wstep" [class.active]="wizardStep() >= 3">\u0663</span>\r
            </div>\r
          </div>\r
          <button class="modal-close" (click)="showSystemWizard.set(false)">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
\r
        <div class="modal-body">\r
\r
          @if (wizardStep() === 1) {\r
            <div class="wizard-step-content">\r
              <h3 class="step-title">\r
                <span class="material-icons-round">edit</span>\r
                \u0627\u0644\u062E\u0637\u0648\u0629 \u0661: \u0627\u0633\u0645 \u0627\u0644\u0646\u0638\u0627\u0645 \u0648\u0627\u0644\u0645\u0638\u0647\u0631\r
              </h3>\r
              <div class="form-group">\r
                <label class="form-label">\u0627\u0633\u0645 \u0627\u0644\u0646\u0638\u0627\u0645 <span class="required">*</span></label>\r
                <input class="form-input" type="text" placeholder="\u0645\u062B\u0627\u0644: \u0627\u0644\u0645\u063A\u0631\u0628\u064A\u060C \u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u062F\u0639\u0645..."\r
                       [value]="systemForm().name"\r
                       (input)="setSystemFormField('name', $any($event.target).value)">\r
              </div>\r
              <div class="form-group">\r
                <label class="form-label">\u0627\u0644\u0644\u0648\u0646</label>\r
                <div class="color-picker">\r
                  @for (c of availableColors; track c) {\r
                    <button class="color-dot" [style.background]="c"\r
                            [class.selected]="systemForm().color === c"\r
                            (click)="setSystemFormField('color', c)"></button>\r
                  }\r
                </div>\r
              </div>\r
              <div class="form-group">\r
                <label class="form-label">\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
                <div class="icon-picker">\r
                  @for (ic of availableIcons; track ic) {\r
                    <button class="icon-opt" [class.selected]="systemForm().icon === ic"\r
                            [style.--ic-color]="systemForm().color"\r
                            (click)="setSystemFormField('icon', ic)">\r
                      <span class="material-icons-round">{{ ic }}</span>\r
                    </button>\r
                  }\r
                </div>\r
              </div>\r
            </div>\r
          }\r
\r
          @if (wizardStep() === 2) {\r
            <div class="wizard-step-content">\r
              <h3 class="step-title">\r
                <span class="material-icons-round">location_on</span>\r
                \u0627\u0644\u062E\u0637\u0648\u0629 \u0662: \u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u062D\u0637\u0627\u062A\r
              </h3>\r
              <div class="scope-options">\r
                <button class="scope-opt" [class.selected]="systemForm().stationScope === 'per_station'"\r
                        (click)="setSystemFormField('stationScope', 'per_station')">\r
                  <span class="material-icons-round">location_on</span>\r
                  <strong>\u0646\u0638\u0627\u0645 \u0645\u0633\u062A\u0642\u0644 \u0644\u0643\u0644 \u0645\u062D\u0637\u0629</strong>\r
                  <p>\u0643\u0644 \u0645\u062D\u0637\u0629 \u0644\u0647\u0627 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0633\u062A\u0642\u0644\u0629 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0646\u0638\u0627\u0645 (\u0645\u062B\u0644 \u0627\u0644\u0645\u063A\u0631\u0628\u064A)</p>\r
                </button>\r
                <button class="scope-opt" [class.selected]="systemForm().stationScope === 'multi_station'"\r
                        (click)="setSystemFormField('stationScope', 'multi_station')">\r
                  <span class="material-icons-round">hub</span>\r
                  <strong>\u0646\u0638\u0627\u0645 \u0645\u0648\u062D\u062F \u0644\u0639\u062F\u0629 \u0645\u062D\u0637\u0627\u062A</strong>\r
                  <p>\u0646\u0638\u0627\u0645 \u0648\u0627\u062D\u062F \u064A\u062E\u062F\u0645 \u0639\u062F\u0629 \u0645\u062D\u0637\u0627\u062A (\u0645\u062B\u0644 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0645\u0633\u0628\u0642)</p>\r
                </button>\r
              </div>\r
              @if (systemForm().stationScope === 'multi_station') {\r
                <div class="form-group" style="margin-top: 16px;">\r
                  <label class="form-label">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062D\u0637\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629</label>\r
                  <div class="stations-checkboxes">\r
                    @for (s of stations(); track s.id) {\r
                      <label class="checkbox-label">\r
                        <input type="checkbox"\r
                               [checked]="systemForm().stationIds.includes(s.id)"\r
                               (change)="toggleWizardStation(s.id)">\r
                        {{ s.name }}\r
                      </label>\r
                    }\r
                  </div>\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          @if (wizardStep() === 3) {\r
            <div class="wizard-step-content">\r
              <h3 class="step-title">\r
                <span class="material-icons-round">category</span>\r
                \u0627\u0644\u062E\u0637\u0648\u0629 \u0663: \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u0639\u0648\u0645\u0629\r
              </h3>\r
              <p class="step-desc">\u0627\u062E\u062A\u0631 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u062A\u064A \u064A\u062F\u0639\u0645\u0647\u0627 \u0647\u0630\u0627 \u0627\u0644\u0646\u0638\u0627\u0645:</p>\r
              <div class="types-checkboxes">\r
                @for (t of accountTypes(); track t.name) {\r
                  <label class="type-check-label" [class.selected]="systemForm().supportedTypes.includes(t.name)">\r
                    <input type="checkbox"\r
                           [checked]="systemForm().supportedTypes.includes(t.name)"\r
                           (change)="toggleWizardType(t.name)">\r
                    <div class="type-check-info">\r
                      <strong>{{ t.name }}</strong>\r
                      @if (t.description) {\r
                        <span>{{ t.description }}</span>\r
                      }\r
                    </div>\r
                  </label>\r
                }\r
              </div>\r
              @if (systemForm().supportedTypes.length === 0) {\r
                <div class="warn-box">\r
                  <span class="material-icons-round">warning</span>\r
                  \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u062D\u0633\u0627\u0628 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
        </div>\r
\r
        <div class="modal-footer">\r
          @if (wizardStep() > 1) {\r
            <button class="btn-3d btn-ghost" (click)="wizardBack()">\r
              <span class="material-icons-round">arrow_forward</span>\r
              \u0627\u0644\u0633\u0627\u0628\u0642\r
            </button>\r
          } @else {\r
            <button class="btn-3d btn-ghost" (click)="showSystemWizard.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
          }\r
          @if (wizardStep() < 3) {\r
            <button class="btn-3d btn-primary" (click)="wizardNext()">\r
              \u0627\u0644\u062A\u0627\u0644\u064A\r
              <span class="material-icons-round">arrow_back</span>\r
            </button>\r
          } @else {\r
            <button class="btn-3d btn-success" (click)="saveSystemWizard()">\r
              <span class="material-icons-round">check</span>\r
              \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0638\u0627\u0645\r
            </button>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===================================================== -->\r
  <!-- Modal: \u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 \u0646\u0648\u0639 \u062D\u0633\u0627\u0628                           -->\r
  <!-- ===================================================== -->\r
  @if (showTypeForm()) {\r
    <div class="modal-overlay" (click)="showTypeForm.set(false)">\r
      <div class="modal-3d small-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-icon teal">\r
            <span class="material-icons-round">category</span>\r
          </div>\r
          <h2>{{ editingTypeId() ? '\u062A\u0639\u062F\u064A\u0644 \u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628' : '\u0646\u0648\u0639 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F' }}</h2>\r
          <button class="modal-close" (click)="showTypeForm.set(false)">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-group">\r
            <label class="form-label">\u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639 <span class="required">*</span></label>\r
            <input class="form-input" type="text" placeholder="\u0645\u062B\u0627\u0644: \u0646\u0642\u062F\u064A \u062C\u0648\u0627\u0644\u060C \u0625\u0633\u0646\u0627\u062F \u064A\u062F\u0648\u064A..."\r
                   [value]="typeForm().name"\r
                   (input)="setFormField('type', 'name', $any($event.target).value)">\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">\u0627\u0644\u0648\u0635\u0641 \u0648\u0627\u0644\u0622\u0644\u064A\u0629</label>\r
            <textarea class="form-input" rows="3"\r
                      placeholder="\u0627\u0634\u0631\u062D \u0622\u0644\u064A\u0629 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u0648\u0643\u064A\u0641 \u064A\u0639\u0645\u0644..."\r
                      [value]="typeForm().description"\r
                      (input)="setFormField('type', 'description', $any($event.target).value)"></textarea>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-3d btn-ghost" (click)="showTypeForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
          <button class="btn-3d btn-primary" (click)="saveTypeForm()">\r
            <span class="material-icons-round">save</span>\r
            {{ editingTypeId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0648\u0639' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===== How It Works Modal ===== -->\r
  @if (showHowItWorks()) {\r
    <div class="modal-overlay" (click)="showHowItWorks.set(false)">\r
      <div class="modal-3d hiw-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-icon amber"><span class="material-icons-round">help_outline</span></div>\r
          <h2>\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629\u061F</h2>\r
          <button class="modal-close" (click)="showHowItWorks.set(false)">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">receipt_long</span> \u0645\u0627 \u0647\u064A \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629\u061F</h3>\r
            <p>\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0647\u064A \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u062A\u064A \u064A\u0633\u062A\u062E\u062F\u0645\u0647\u0627 \u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0644\u062A\u062D\u0635\u064A\u0644 \u0641\u0648\u0627\u062A\u064A\u0631 \u0627\u0644\u0645\u0634\u062A\u0631\u0643\u064A\u0646. \u0643\u0644 \u0645\u0648\u0638\u0641 \u0644\u0647 \u062D\u0633\u0627\u0628\u0627\u062A \u0641\u064A \u0643\u0644 \u0646\u0638\u0627\u0645 \u064A\u0639\u0645\u0644 \u0641\u064A\u0647.</p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">account_balance_wallet</span> \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0641\u064A \u0635\u0641\u062D\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A</h3>\r
            <p>\u0643\u0644 \u062D\u0633\u0627\u0628 \u0641\u0648\u062A\u0631\u0629 \u062A\u064F\u0646\u0634\u0626\u0647 \u0647\u0646\u0627 \u064A\u0638\u0647\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A <strong>\u0635\u0641\u062D\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A</strong> \u0628\u0646\u0648\u0639 "\u0641\u0648\u062A\u0631\u0629". \u0644\u0627 \u062A\u062D\u062A\u0627\u062C \u0644\u0625\u0636\u0627\u0641\u062A\u0647 \u064A\u062F\u0648\u064A\u0627\u064B \u0647\u0646\u0627\u0643.</p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">settings</span> \u0625\u0636\u0627\u0641\u0629 \u0646\u0638\u0627\u0645 \u062C\u062F\u064A\u062F</h3>\r
            <p>\u0645\u0646 \u062A\u0628\u0648\u064A\u0628 "\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629" \u064A\u0645\u0643\u0646\u0643 \u0625\u0636\u0627\u0641\u0629 \u0646\u0638\u0627\u0645 \u062C\u062F\u064A\u062F \u0639\u0628\u0631 wizard \u062E\u0637\u0648\u0629 \u0628\u062E\u0637\u0648\u0629: \u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0645\u0638\u0647\u0631\u060C \u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u062D\u0637\u0627\u062A\u060C \u0648\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u0639\u0648\u0645\u0629.</p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">category</span> \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A</h3>\r
            <p>\u0645\u0646 \u062A\u0628\u0648\u064A\u0628 "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A" \u064A\u0645\u0643\u0646\u0643 \u0625\u0636\u0627\u0641\u0629 \u0623\u0646\u0648\u0627\u0639 \u062C\u062F\u064A\u062F\u0629 \u0645\u0639 \u0634\u0631\u062D \u0622\u0644\u064A\u0629 \u0643\u0644 \u0646\u0648\u0639. \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u062A\u0638\u0647\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0633\u0627\u0628.</p>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
</div>\r
`, styles: ['/* src/app/pages/billing-systems/billing-systems.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.page-container {\n  padding: 24px 32px;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.page-icon-3d {\n  width: 56px;\n  height: 56px;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);\n}\n.page-icon-3d.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #7c3aed);\n  color: white;\n}\n.page-icon-3d .material-icons-round {\n  font-size: 28px;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.page-subtitle {\n  font-size: 0.85rem;\n  color: var(--text-muted);\n  margin: 4px 0 0;\n}\n.help-btn {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  color: var(--text-muted);\n}\n.help-btn:hover {\n  border-color: #8b5cf6;\n  color: #8b5cf6;\n}\n.alert-error,\n.alert-success {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  margin-bottom: 16px;\n  cursor: pointer;\n  font-size: 14px;\n}\n.alert-error .close-x,\n.alert-success .close-x {\n  margin-right: auto;\n  opacity: 0.6;\n}\n.alert-error {\n  background: rgba(239, 68, 68, 0.15);\n  color: #fca5a5;\n  border: 1px solid rgba(239, 68, 68, 0.3);\n}\n.alert-success {\n  background: rgba(34, 197, 94, 0.15);\n  color: #86efac;\n  border: 1px solid rgba(34, 197, 94, 0.3);\n}\n.stats-bar {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.stat-card {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 18px;\n  background: var(--bg-card);\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n  transition: all 0.2s;\n}\n.stat-card:hover {\n  transform: translateY(-1px);\n  box-shadow: var(--shadow-hover);\n}\n.stat-card.clickable {\n  cursor: pointer;\n}\n.stat-card.active-stat {\n  border-color: var(--card-color, #8b5cf6);\n  box-shadow: 0 0 0 2px var(--card-color, #8b5cf6), var(--shadow-hover);\n}\n.stat-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-icon .material-icons-round {\n  font-size: 22px;\n}\n.stat-icon.purple {\n  background: rgba(139, 92, 246, 0.2);\n  color: #c084fc;\n}\n.stat-icon.blue {\n  background: rgba(59, 130, 246, 0.2);\n  color: #60a5fa;\n}\n.stat-num {\n  font-size: 1.3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1;\n}\n.stat-label {\n  font-size: 0.75rem;\n  color: var(--text-muted);\n  margin-top: 2px;\n}\n.main-tabs {\n  display: flex;\n  gap: 4px;\n  margin-bottom: 20px;\n  background: var(--bg-card);\n  border-radius: 14px;\n  padding: 6px;\n  border: 1px solid var(--border-color);\n}\n.main-tab {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 18px;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  background: transparent;\n  color: var(--text-muted);\n  transition: all 0.2s;\n  font-family: "Tajawal", sans-serif;\n}\n.main-tab .material-icons-round {\n  font-size: 18px;\n}\n.main-tab:hover {\n  background: var(--bg-surface);\n  color: var(--text-primary);\n}\n.main-tab.active {\n  background:\n    linear-gradient(\n      135deg,\n      #7c3aed,\n      #a855f7);\n  color: white;\n  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);\n}\n.tab-badge {\n  background: rgba(255, 255, 255, 0.2);\n  color: inherit;\n  border-radius: 20px;\n  padding: 1px 7px;\n  font-size: 11px;\n  font-weight: 600;\n}\n.tab-content {\n  animation: fadeIn 0.2s ease;\n}\n.tab-header-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  gap: 16px;\n}\n.section-title {\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.section-desc {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: 0;\n}\n.filter-bar {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 20px;\n  background: var(--bg-card);\n  border-radius: 14px;\n  padding: 16px;\n  border: 1px solid var(--border-color);\n}\n.search-box {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--bg-input);\n  border-radius: 10px;\n  padding: 0 12px;\n  border: 1px solid var(--border-color);\n}\n.search-box:focus-within {\n  border-color: #8b5cf6;\n}\n.search-box .search-icon {\n  color: var(--text-muted);\n  font-size: 18px;\n}\n.search-input {\n  flex: 1;\n  background: none;\n  border: none;\n  outline: none;\n  padding: 10px 0;\n  color: var(--text-primary);\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n}\n.search-input::placeholder {\n  color: var(--text-faint);\n}\n.filter-row {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.filter-group {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.filter-label {\n  font-size: 12px;\n  color: var(--text-muted);\n  white-space: nowrap;\n  font-weight: 500;\n}\n.type-tabs {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.type-tab {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 5px 12px;\n  border-radius: 20px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  font-size: 12px;\n  transition: all 0.2s;\n  font-family: "Tajawal", sans-serif;\n}\n.type-tab .material-icons-round {\n  font-size: 14px;\n}\n.type-tab:hover {\n  border-color: var(--tab-color, #8b5cf6);\n  color: var(--text-primary);\n}\n.type-tab.active {\n  background: var(--tab-color, #8b5cf6);\n  color: white;\n  border-color: var(--tab-color, #8b5cf6);\n}\n.spinner {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: 3px solid var(--border-color);\n  border-top-color: #8b5cf6;\n  animation: spin 0.8s linear infinite;\n}\n.empty-state h3 {\n  font-size: 1.1rem;\n  color: var(--text-primary);\n  margin: 0 0 8px;\n}\n.empty-state p {\n  color: var(--text-muted);\n  margin: 0 0 20px;\n  font-size: 0.9rem;\n}\n.system-section {\n  margin-bottom: 28px;\n}\n.system-header {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 14px;\n  padding: 14px 18px;\n  border-radius: 14px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-right: 4px solid var(--sys-color, #8b5cf6);\n}\n.sys-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 22px;\n}\n.sys-name {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.sys-count {\n  font-size: 12px;\n  color: var(--text-muted);\n}\n.sys-info {\n  flex: 1;\n}\n.employees-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 14px;\n}\n.employee-card {\n  background: var(--bg-card);\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  padding: 16px;\n  transition: all 0.2s;\n}\n.employee-card:hover {\n  box-shadow: var(--shadow-hover);\n  transform: translateY(-2px);\n}\n.emp-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.emp-avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 18px;\n  font-weight: 700;\n}\n.emp-name {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.emp-count {\n  font-size: 11px;\n  color: var(--text-muted);\n}\n.emp-info {\n  flex: 1;\n}\n.emp-accounts {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.acc-chip {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 6px 10px;\n  border-radius: 8px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  transition: all 0.15s;\n}\n.acc-chip:hover {\n  background: var(--bg-card-hover);\n}\n.acc-chip.inactive-chip {\n  opacity: 0.4;\n}\n.acc-chip-label {\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 500;\n}\n.acc-chip-actions {\n  display: flex;\n  gap: 2px;\n}\n.chip-btn {\n  width: 26px;\n  height: 26px;\n  border-radius: 6px;\n  border: none;\n  background: transparent;\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s;\n}\n.chip-btn .material-icons-round {\n  font-size: 14px;\n}\n.chip-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n}\n.chip-btn.danger:hover {\n  background: rgba(239, 68, 68, 0.15);\n  color: #f87171;\n}\n.systems-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 16px;\n}\n.system-card {\n  background: var(--bg-card);\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  padding: 18px;\n  border-top: 3px solid var(--sys-color, #8b5cf6);\n  transition: all 0.2s;\n}\n.system-card:hover {\n  box-shadow: var(--shadow-hover);\n}\n.sys-card-top {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 14px;\n}\n.sys-card-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 22px;\n}\n.sys-card-name {\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.sys-card-count {\n  font-size: 12px;\n  color: var(--text-muted);\n}\n.sys-card-info {\n  flex: 1;\n}\n.sys-types {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-bottom: 12px;\n}\n.sys-type-tag {\n  padding: 3px 10px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 500;\n}\n.sys-scope-badge {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--text-muted);\n  padding: 6px 10px;\n  background: var(--bg-surface);\n  border-radius: 8px;\n}\n.sys-scope-badge .material-icons-round {\n  font-size: 14px;\n}\n.sys-scope-badge.multi {\n  color: #60a5fa;\n}\n.types-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.type-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n  background: var(--bg-card);\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  transition: all 0.2s;\n}\n.type-card:hover {\n  box-shadow: var(--shadow-hover);\n}\n.type-card-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background: rgba(139, 92, 246, 0.2);\n  color: #c084fc;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n  flex-shrink: 0;\n}\n.type-card-info {\n  flex: 1;\n}\n.type-name {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0 0 4px;\n}\n.type-desc {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: 0;\n  line-height: 1.5;\n}\n.type-card-actions {\n  display: flex;\n  gap: 8px;\n}\n.btn-3d {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 9px 18px;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 600;\n  transition: all 0.2s;\n  font-family: "Tajawal", sans-serif;\n}\n.btn-3d .material-icons-round {\n  font-size: 18px;\n}\n.btn-3d:hover {\n  transform: translateY(-1px);\n}\n.btn-3d:active {\n  transform: none;\n}\n.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #7c3aed,\n      #a855f7);\n  color: white;\n  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);\n}\n.btn-primary:hover {\n  box-shadow: 0 6px 18px rgba(124, 58, 237, 0.5);\n}\n.btn-success {\n  background:\n    linear-gradient(\n      135deg,\n      #16a34a,\n      #22c55e);\n  color: white;\n  box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);\n}\n.btn-ghost {\n  background: var(--bg-card);\n  color: var(--text-muted);\n  border: 1px solid var(--border-color);\n}\n.btn-ghost:hover {\n  color: var(--text-primary);\n  background: var(--bg-surface);\n}\n.icon-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s;\n}\n.icon-btn .material-icons-round {\n  font-size: 16px;\n}\n.icon-btn.edit-btn:hover {\n  background: rgba(59, 130, 246, 0.15);\n  color: #60a5fa;\n  border-color: rgba(59, 130, 246, 0.3);\n}\n.icon-btn.danger-btn:hover {\n  background: rgba(239, 68, 68, 0.15);\n  color: #f87171;\n  border-color: rgba(239, 68, 68, 0.3);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.65);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fadeIn 0.2s;\n}\n.modal-3d {\n  background: var(--bg-card);\n  border-radius: 20px;\n  border: 1px solid var(--border-color);\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);\n  width: 100%;\n  max-width: 540px;\n  max-height: 90vh;\n  overflow-y: auto;\n  direction: rtl;\n}\n.modal-3d.wizard-modal {\n  max-width: 580px;\n}\n.modal-3d.small-modal {\n  max-width: 460px;\n}\n.modal-3d.hiw-modal {\n  max-width: 600px;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 20px 24px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-header h2 {\n  flex: 1;\n  font-size: 17px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.wizard-header-info {\n  flex: 1;\n}\n.wizard-header-info h2 {\n  margin: 0 0 8px;\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 22px;\n  flex-shrink: 0;\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #7c3aed,\n      #a855f7);\n}\n.modal-icon.teal {\n  background:\n    linear-gradient(\n      135deg,\n      #0d9488,\n      #14b8a6);\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #d97706,\n      #f59e0b);\n}\n.modal-close {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: none;\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s;\n  flex-shrink: 0;\n}\n.modal-close:hover {\n  background: rgba(239, 68, 68, 0.15);\n  color: #f87171;\n}\n.modal-body {\n  padding: 20px 24px;\n}\n.modal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 10px;\n  padding: 16px 24px;\n  border-top: 1px solid var(--border-color);\n}\n.form-group {\n  margin-bottom: 18px;\n}\n.form-label {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  margin-bottom: 8px;\n}\n.form-label .required {\n  color: #f87171;\n}\n.form-input {\n  width: 100%;\n  padding: 10px 14px;\n  border-radius: 10px;\n  background: var(--bg-input);\n  border: 1px solid var(--border-color);\n  color: var(--text-primary);\n  font-size: 14px;\n  outline: none;\n  font-family: "Tajawal", sans-serif;\n  transition: border-color 0.2s;\n  box-sizing: border-box;\n}\n.form-input:focus {\n  border-color: #8b5cf6;\n}\n.form-input::placeholder {\n  color: var(--text-faint);\n}\n.form-input option {\n  background: var(--bg-card);\n  color: var(--text-primary);\n}\ntextarea.form-input {\n  resize: vertical;\n  min-height: 80px;\n}\n.form-info-box {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  background: rgba(59, 130, 246, 0.1);\n  border: 1px solid rgba(59, 130, 246, 0.25);\n  border-radius: 10px;\n  font-size: 13px;\n  color: #60a5fa;\n}\n.form-info-box .material-icons-round {\n  font-size: 16px;\n}\n.system-selector {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.sys-option {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  font-size: 13px;\n  transition: all 0.2s;\n  font-family: "Tajawal", sans-serif;\n}\n.sys-option .material-icons-round {\n  font-size: 16px;\n}\n.sys-option:hover {\n  border-color: var(--opt-color, #8b5cf6);\n  color: var(--text-primary);\n}\n.sys-option.selected {\n  background: var(--opt-color, #8b5cf6);\n  color: white;\n  border-color: var(--opt-color, #8b5cf6);\n}\n.type-selector-row {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.type-option-btn {\n  padding: 7px 14px;\n  border-radius: 20px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  font-size: 13px;\n  transition: all 0.2s;\n  font-family: "Tajawal", sans-serif;\n}\n.type-option-btn:hover {\n  border-color: #8b5cf6;\n  color: var(--text-primary);\n}\n.type-option-btn.selected {\n  background: #8b5cf6;\n  color: white;\n  border-color: #8b5cf6;\n}\n.wizard-steps {\n  display: flex;\n  align-items: center;\n  gap: 0;\n}\n.wstep {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: 2px solid var(--border-color);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-muted);\n  transition: all 0.3s;\n}\n.wstep.active {\n  border-color: #8b5cf6;\n  color: #c084fc;\n  background: rgba(139, 92, 246, 0.15);\n}\n.wstep.done {\n  border-color: #22c55e;\n  color: #22c55e;\n  background: rgba(34, 197, 94, 0.1);\n}\n.wstep-line {\n  width: 30px;\n  height: 2px;\n  background: var(--border-color);\n}\n.wizard-step-content {\n  animation: fadeIn 0.2s ease;\n}\n.step-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 18px;\n}\n.step-title .material-icons-round {\n  font-size: 18px;\n  color: #c084fc;\n}\n.step-desc {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin: -10px 0 16px;\n}\n.color-picker {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.color-dot {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.color-dot:hover {\n  transform: scale(1.15);\n}\n.color-dot.selected {\n  border-color: white;\n  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);\n  transform: scale(1.15);\n}\n.icon-picker {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.icon-opt {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s;\n}\n.icon-opt .material-icons-round {\n  font-size: 20px;\n}\n.icon-opt:hover {\n  border-color: var(--ic-color, #8b5cf6);\n  color: var(--ic-color, #8b5cf6);\n}\n.icon-opt.selected {\n  background: var(--ic-color, #8b5cf6);\n  color: white;\n  border-color: var(--ic-color, #8b5cf6);\n}\n.scope-options {\n  display: flex;\n  gap: 12px;\n  flex-direction: column;\n}\n.scope-opt {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 4px;\n  padding: 14px 16px;\n  border-radius: 12px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  text-align: right;\n  transition: all 0.2s;\n}\n.scope-opt .material-icons-round {\n  font-size: 22px;\n  color: var(--text-muted);\n  margin-bottom: 4px;\n}\n.scope-opt strong {\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.scope-opt p {\n  font-size: 12px;\n  color: var(--text-muted);\n  margin: 0;\n}\n.scope-opt:hover {\n  border-color: #8b5cf6;\n}\n.scope-opt.selected {\n  border-color: #8b5cf6;\n  background: rgba(139, 92, 246, 0.1);\n}\n.scope-opt.selected .material-icons-round {\n  color: #c084fc;\n}\n.stations-checkboxes,\n.types-checkboxes {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  font-size: 14px;\n  color: var(--text-primary);\n  transition: all 0.15s;\n  font-family: "Tajawal", sans-serif;\n}\n.checkbox-label input[type=checkbox] {\n  accent-color: #8b5cf6;\n  width: 16px;\n  height: 16px;\n}\n.checkbox-label:hover {\n  border-color: #8b5cf6;\n}\n.type-check-label {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.type-check-label input[type=checkbox] {\n  accent-color: #8b5cf6;\n  width: 16px;\n  height: 16px;\n  margin-top: 2px;\n  flex-shrink: 0;\n}\n.type-check-label:hover {\n  border-color: #8b5cf6;\n}\n.type-check-label.selected {\n  border-color: #8b5cf6;\n  background: rgba(139, 92, 246, 0.08);\n}\n.type-check-info {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.type-check-info strong {\n  font-size: 14px;\n  color: var(--text-primary);\n}\n.type-check-info span {\n  font-size: 12px;\n  color: var(--text-muted);\n  line-height: 1.4;\n}\n.warn-box {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  margin-top: 12px;\n  background: rgba(245, 158, 11, 0.1);\n  border: 1px solid rgba(245, 158, 11, 0.3);\n  border-radius: 10px;\n  font-size: 13px;\n  color: #fbbf24;\n}\n.warn-box .material-icons-round {\n  font-size: 16px;\n}\n.hiw-section {\n  margin-bottom: 20px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid var(--border-color);\n}\n.hiw-section:last-child {\n  border-bottom: none;\n  margin-bottom: 0;\n}\n.hiw-section h3 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 700;\n  color: #c084fc;\n  margin: 0 0 8px;\n}\n.hiw-section h3 .material-icons-round {\n  font-size: 16px;\n}\n.hiw-section p {\n  font-size: 13px;\n  color: var(--text-secondary);\n  line-height: 1.6;\n  margin: 0;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .page-container {\n    padding: 16px;\n  }\n  .page-header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .employees-grid {\n    grid-template-columns: 1fr;\n  }\n  .systems-grid {\n    grid-template-columns: 1fr;\n  }\n  .main-tabs {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=billing-systems.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BillingSystemsComponent, { className: "BillingSystemsComponent", filePath: "src/app/pages/billing-systems/billing-systems.ts", lineNumber: 18 });
})();
export {
  BillingSystemsComponent
};
//# sourceMappingURL=chunk-VKKS323D.js.map
