import {
  formatAmount
} from "./chunk-RCZO5KY5.js";
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
  ɵɵtextInterpolate2
} from "./chunk-VUZEB5JS.js";

// src/app/pages/register-operation/register-operation.ts
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.accountId;
function RegisterOperationComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_14_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.error.set(""));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 11);
    \u0275\u0275text(5, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
function RegisterOperationComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "span", 12);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_0_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_0_For_7_Template_button_click_0_listener() {
      const opt_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setTreasuryKind(opt_r4.value));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r4.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r4.label, " ");
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "h2", 15)(2, "span", 16);
    \u0275\u0275text(3, "\u0661");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 17);
    \u0275\u0275repeaterCreate(6, RegisterOperationComponent_Conditional_16_Conditional_0_For_7_Template, 4, 2, "button", 18, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.treasuryKindOptions);
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0632\u0646 (\u062A\u0648\u0631\u064A\u062F\u060C \u0635\u0631\u0641\u060C \u062A\u062D\u0648\u064A\u0644) \u062A\u064F\u0646\u0641\u0651\u064E\u0630 \u0645\u0646 \u0635\u0641\u062D\u0629 \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0623\u0648 \u0645\u0646 \u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setTreasuryKind(""));
    });
    \u0275\u0275text(3, "\u0631\u062C\u0648\u0639");
    \u0275\u0275elementEnd();
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_6_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setTreasuryKind(""));
    });
    \u0275\u0275text(3, "\u0631\u062C\u0648\u0639");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("\u0644\u0627 \u062A\u0648\u062C\u062F ", ctx_r1.treasuryKind() === "fund" ? "\u0635\u0646\u0627\u062F\u064A\u0642" : "\u062D\u0633\u0627\u0628\u0627\u062A", " \u0645\u0633\u062C\u0651\u0644\u0629. \u0623\u0636\u0641\u0647\u0627 \u0645\u0646 \u0635\u0641\u062D\u0629 ", ctx_r1.treasuryKind() === "fund" ? "\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642" : "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A", " \u0623\u0648\u0644\u0627\u064B.");
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_7_For_2_Template_button_click_0_listener() {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.setTreasury(item_r9));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.treasuryKind() === "fund" ? "savings" : "account_balance");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r9.name, " ");
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275repeaterCreate(1, RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_7_For_2_Template, 4, 2, "button", 23, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 21);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_7_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setTreasuryKind(""));
    });
    \u0275\u0275text(4, "\u062A\u063A\u064A\u064A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.treasuryList());
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "h2", 15)(2, "span", 16);
    \u0275\u0275text(3, "\u0662");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_5_Template, 4, 0)(6, RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_6_Template, 4, 2)(7, RegisterOperationComponent_Conditional_16_Conditional_1_Conditional_7_Template, 5, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u0627\u062E\u062A\u0631 ", ctx_r1.treasuryKind() === "fund" ? "\u0627\u0644\u0635\u0646\u062F\u0648\u0642" : ctx_r1.treasuryKind() === "warehouse" ? "\u0627\u0644\u0645\u062E\u0632\u0646" : "\u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.treasuryKind() === "warehouse" ? 5 : ctx_r1.treasuryList().length === 0 ? 6 : 7);
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_2_For_7_Template_button_click_0_listener() {
      const opt_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setVoucherType(opt_r12.value));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r12 = ctx.$implicit;
    \u0275\u0275classProp("receipt", opt_r12.value === "receipt")("payment", opt_r12.value === "payment");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r12.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r12.label, " ");
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "h2", 15)(2, "span", 16);
    \u0275\u0275text(3, "\u0663");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 25);
    \u0275\u0275repeaterCreate(6, RegisterOperationComponent_Conditional_16_Conditional_2_For_7_Template, 4, 6, "button", 26, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 21);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectedTreasury.set(null));
    });
    \u0275\u0275text(9, "\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062E\u0632\u064A\u0646\u0629");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.voucherTypeOptions);
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_3_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.voucherType.set(""));
    });
    \u0275\u0275text(3, "\u0631\u062C\u0648\u0639");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0648\u0627\u0644\u0628 \u0645\u064F\u0646\u0634\u0623\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0648\u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F (", ctx_r1.voucherType() === "receipt" ? "\u0642\u0628\u0636" : "\u0635\u0631\u0641", "). \u0623\u0646\u0634\u0626 \u0642\u0627\u0644\u0628\u0627\u064B \u0645\u0646 \u0635\u0641\u062D\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A.");
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_3_Conditional_6_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ot_r16.code);
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_3_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_3_Conditional_6_For_2_Template_button_click_0_listener() {
      const ot_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.setTemplate(ot_r16));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, RegisterOperationComponent_Conditional_16_Conditional_3_Conditional_6_For_2_Conditional_5_Template, 2, 1, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r16 = ctx.$implicit;
    \u0275\u0275styleProp("--t-color", ot_r16.color || "#3b82f6");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ot_r16.icon || "receipt_long");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ot_r16.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ot_r16.code ? 5 : -1);
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275repeaterCreate(1, RegisterOperationComponent_Conditional_16_Conditional_3_Conditional_6_For_2_Template, 6, 5, "button", 29, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 21);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_3_Conditional_6_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.voucherType.set(""));
    });
    \u0275\u0275text(4, "\u062A\u063A\u064A\u064A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredTemplates());
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "h2", 15)(2, "span", 16);
    \u0275\u0275text(3, "\u0664");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u062E\u062A\u0631 \u0642\u0627\u0644\u0628 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, RegisterOperationComponent_Conditional_16_Conditional_3_Conditional_5_Template, 4, 1)(6, RegisterOperationComponent_Conditional_16_Conditional_3_Conditional_6_Template, 5, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.filteredTemplates().length === 0 ? 5 : 6);
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_4_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r18 = ctx.$implicit;
    \u0275\u0275property("value", c_r18.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", c_r18.code, " \u2014 ", c_r18.name);
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_4_Conditional_30_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 48);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 49);
    \u0275\u0275listener("ngModelChange", function RegisterOperationComponent_Conditional_16_Conditional_4_Conditional_30_For_7_Template_input_ngModelChange_3_listener($event) {
      const \u0275$index_218_r20 = \u0275\u0275restoreView(_r19).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateEntryAmount(\u0275$index_218_r20, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 50);
    \u0275\u0275listener("ngModelChange", function RegisterOperationComponent_Conditional_16_Conditional_4_Conditional_30_For_7_Template_input_ngModelChange_4_listener($event) {
      const \u0275$index_218_r20 = \u0275\u0275restoreView(_r19).$index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateEntryDescription(\u0275$index_218_r20, $event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r21 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r21.accountName);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", entry_r21.amount);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", entry_r21.description);
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_4_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "h3");
    \u0275\u0275text(2, "\u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0648\u0627\u0644\u0628\u064A\u0627\u0646 \u0644\u0643\u0644 \u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 44);
    \u0275\u0275text(4, "\u0633\u0646\u062F \u0648\u0627\u062D\u062F \u0645\u062A\u0639\u062F\u062F \u0627\u0644\u0623\u0633\u0637\u0631 \u2014 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0633\u064A\u064F\u0633\u062C\u0651\u0644 \u0641\u064A \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 45);
    \u0275\u0275repeaterCreate(6, RegisterOperationComponent_Conditional_16_Conditional_4_Conditional_30_For_7_Template, 5, 3, "div", 46, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 47);
    \u0275\u0275text(9, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A: ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.formEntriesForMulti());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.formatAmount(ctx_r1.getFormTotal()), " ", ctx_r1.getCurrencyCode());
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_4_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 33)(2, "label");
    \u0275\u0275text(3, "\u0627\u0644\u0645\u0628\u0644\u063A ");
    \u0275\u0275elementStart(4, "span", 34);
    \u0275\u0275text(5, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 51)(7, "input", 52);
    \u0275\u0275listener("ngModelChange", function RegisterOperationComponent_Conditional_16_Conditional_4_Conditional_31_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.execSingleAmount.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 53);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 33)(11, "label");
    \u0275\u0275text(12, "\u0627\u0644\u0628\u064A\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 54);
    \u0275\u0275listener("ngModelChange", function RegisterOperationComponent_Conditional_16_Conditional_4_Conditional_31_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.execSingleDescription.set($event));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngModel", ctx_r1.execSingleAmount());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getCurrencyCode());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.execSingleDescription());
  }
}
function RegisterOperationComponent_Conditional_16_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "h2", 15)(2, "span", 16);
    \u0275\u0275text(3, "\u0665");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 31)(6, "span", 4);
    \u0275\u0275text(7, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " \u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F \u0633\u064A\u064F\u0648\u0644\u0651\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0633\u0628 \u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0648\u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F \u0648\u0627\u0644\u0633\u0646\u0629. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 32)(10, "div", 33)(11, "label");
    \u0275\u0275text(12, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E ");
    \u0275\u0275elementStart(13, "span", 34);
    \u0275\u0275text(14, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "input", 35);
    \u0275\u0275listener("ngModelChange", function RegisterOperationComponent_Conditional_16_Conditional_4_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.execDate.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 33)(17, "label");
    \u0275\u0275text(18, "\u0627\u0644\u0639\u0645\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 36);
    \u0275\u0275listener("ngModelChange", function RegisterOperationComponent_Conditional_16_Conditional_4_Template_select_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.execCurrencyId.set(+$event));
    });
    \u0275\u0275repeaterCreate(20, RegisterOperationComponent_Conditional_16_Conditional_4_For_21_Template, 2, 3, "option", 37, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 33)(23, "label");
    \u0275\u0275text(24, "\u0627\u0644\u0628\u064A\u0627\u0646 \u0627\u0644\u0639\u0627\u0645 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 38);
    \u0275\u0275listener("ngModelChange", function RegisterOperationComponent_Conditional_16_Conditional_4_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.execDescription.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 33)(27, "label");
    \u0275\u0275text(28, "\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0631\u062C\u0639\u064A (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 39);
    \u0275\u0275listener("ngModelChange", function RegisterOperationComponent_Conditional_16_Conditional_4_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.execReference.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(30, RegisterOperationComponent_Conditional_16_Conditional_4_Conditional_30_Template, 12, 2, "div", 40)(31, RegisterOperationComponent_Conditional_16_Conditional_4_Conditional_31_Template, 14, 3, "div", 41);
    \u0275\u0275elementStart(32, "div", 42)(33, "button", 21);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_4_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.selectedTemplate.set(null);
      return \u0275\u0275resetView(ctx_r1.execEntries.set([]));
    });
    \u0275\u0275text(34, "\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0642\u0627\u0644\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 43);
    \u0275\u0275listener("click", function RegisterOperationComponent_Conditional_16_Conditional_4_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(36, "span", 4);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u2014 ", ctx_r1.selectedTemplate().name);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngModel", ctx_r1.execDate());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.execCurrencyId());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.currencies());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.execDescription());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.execReference());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isMultiLine() ? 30 : 31);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "sync" : "check_circle");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638 \u0627\u0644\u0639\u0645\u0644\u064A\u0629", " ");
  }
}
function RegisterOperationComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, RegisterOperationComponent_Conditional_16_Conditional_0_Template, 8, 0, "div", 13);
    \u0275\u0275conditionalCreate(1, RegisterOperationComponent_Conditional_16_Conditional_1_Template, 8, 2, "div", 13);
    \u0275\u0275conditionalCreate(2, RegisterOperationComponent_Conditional_16_Conditional_2_Template, 10, 0, "div", 13);
    \u0275\u0275conditionalCreate(3, RegisterOperationComponent_Conditional_16_Conditional_3_Template, 7, 1, "div", 13);
    \u0275\u0275conditionalCreate(4, RegisterOperationComponent_Conditional_16_Conditional_4_Template, 39, 9, "div", 14);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r1.treasuryKind() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.treasuryKind() && !ctx_r1.selectedTreasury() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedTreasury() && ctx_r1.selectedTreasury().type !== "warehouse" && !ctx_r1.voucherType() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.voucherType() && !ctx_r1.selectedTemplate() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedTemplate() ? 4 : -1);
  }
}
var RegisterOperationComponent = class _RegisterOperationComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  // Step 1: نوع الجهة
  treasuryKind = signal("", ...ngDevMode ? [{ debugName: "treasuryKind" }] : (
    /* istanbul ignore next */
    []
  ));
  // Step 2: الخزينة/المخزن المحدد { id, name, type }
  selectedTreasury = signal(null, ...ngDevMode ? [{ debugName: "selectedTreasury" }] : (
    /* istanbul ignore next */
    []
  ));
  // Step 3: نوع السند (للخزائن: قبض/صرف؛ للمخزن نعرض رسالة أو نوجّه لصفحة المخازن)
  voucherType = signal("", ...ngDevMode ? [{ debugName: "voucherType" }] : (
    /* istanbul ignore next */
    []
  ));
  // Step 4: القالب المختار
  selectedTemplate = signal(null, ...ngDevMode ? [{ debugName: "selectedTemplate" }] : (
    /* istanbul ignore next */
    []
  ));
  // Step 5: بيانات التنفيذ
  execDate = signal((/* @__PURE__ */ new Date()).toISOString().split("T")[0], ...ngDevMode ? [{ debugName: "execDate" }] : (
    /* istanbul ignore next */
    []
  ));
  execCurrencyId = signal(1, ...ngDevMode ? [{ debugName: "execCurrencyId" }] : (
    /* istanbul ignore next */
    []
  ));
  execDescription = signal("", ...ngDevMode ? [{ debugName: "execDescription" }] : (
    /* istanbul ignore next */
    []
  ));
  execReference = signal("", ...ngDevMode ? [{ debugName: "execReference" }] : (
    /* istanbul ignore next */
    []
  ));
  execEntries = signal([], ...ngDevMode ? [{ debugName: "execEntries" }] : (
    /* istanbul ignore next */
    []
  ));
  execSingleAmount = signal("", ...ngDevMode ? [{ debugName: "execSingleAmount" }] : (
    /* istanbul ignore next */
    []
  ));
  execSingleDescription = signal("", ...ngDevMode ? [{ debugName: "execSingleDescription" }] : (
    /* istanbul ignore next */
    []
  ));
  operationTypes = signal([], ...ngDevMode ? [{ debugName: "operationTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  funds = signal([], ...ngDevMode ? [{ debugName: "funds" }] : (
    /* istanbul ignore next */
    []
  ));
  accounts = signal([], ...ngDevMode ? [{ debugName: "accounts" }] : (
    /* istanbul ignore next */
    []
  ));
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : (
    /* istanbul ignore next */
    []
  ));
  currencies = signal([], ...ngDevMode ? [{ debugName: "currencies" }] : (
    /* istanbul ignore next */
    []
  ));
  treasuryKindOptions = [
    { value: "fund", label: "\u0635\u0646\u062F\u0648\u0642", icon: "savings" },
    { value: "bank", label: "\u0628\u0646\u0643", icon: "account_balance" },
    { value: "exchange", label: "\u0635\u0631\u0627\u0641", icon: "swap_horiz" },
    { value: "e_wallet", label: "\u0645\u062D\u0641\u0638\u0629", icon: "account_balance_wallet" },
    { value: "warehouse", label: "\u0645\u062E\u0632\u0646", icon: "warehouse" }
  ];
  voucherTypeOptions = [
    { value: "receipt", label: "\u0633\u0646\u062F \u0642\u0628\u0636", icon: "call_received" },
    { value: "payment", label: "\u0633\u0646\u062F \u0635\u0631\u0641", icon: "call_made" }
  ];
  treasuryList = computed(() => {
    const kind = this.treasuryKind();
    if (!kind)
      return [];
    if (kind === "fund")
      return this.funds().map((f) => ({ id: f.id, name: f.name, type: "fund" }));
    if (kind === "warehouse")
      return this.warehouses().map((w) => ({ id: w.id, name: w.name, type: "warehouse" }));
    const accType = kind === "bank" ? "bank" : kind === "exchange" ? "exchange" : "e_wallet";
    return this.accounts().filter((a) => (a.accountType || a.account_type) === accType).map((a) => ({ id: a.id, name: a.name, type: kind }));
  }, ...ngDevMode ? [{ debugName: "treasuryList" }] : (
    /* istanbul ignore next */
    []
  ));
  filteredTemplates = computed(() => {
    const opTypes = this.operationTypes();
    const treasury = this.selectedTreasury();
    const vType = this.voucherType();
    if (!treasury || !vType)
      return [];
    const kind = treasury.type;
    return opTypes.filter((ot) => {
      const vt = (ot.voucherType || ot.voucher_type || "").trim();
      if (vt !== vType)
        return false;
      if (kind === "fund") {
        const srcFund = ot.sourceFundId ?? ot.source_fund_id;
        return srcFund === treasury.id;
      }
      if (kind === "bank" || kind === "exchange" || kind === "e_wallet") {
        const srcAcc = ot.sourceAccountId ?? ot.source_account_id;
        return srcAcc === treasury.id;
      }
      if (kind === "warehouse") {
        const srcWh = ot.sourceWarehouseId ?? ot.source_warehouse_id;
        return srcWh === treasury.id;
      }
      return false;
    }).filter((ot) => ot.isActive !== false);
  }, ...ngDevMode ? [{ debugName: "filteredTemplates" }] : (
    /* istanbul ignore next */
    []
  ));
  isMultiLine = computed(() => {
    const t = this.selectedTemplate();
    if (!t)
      return false;
    const linked = t.linkedAccounts || t.accounts || [];
    return t.hasMultiLines !== false && linked.length > 0;
  }, ...ngDevMode ? [{ debugName: "isMultiLine" }] : (
    /* istanbul ignore next */
    []
  ));
  formEntriesForMulti = computed(() => {
    const t = this.selectedTemplate();
    const linked = (t?.linkedAccounts || t?.accounts || []).map((la) => ({
      accountId: la.accountId ?? la.account_id ?? la.id,
      accountName: la.displayName ?? la.label ?? la.accountName ?? la.account_name ?? la.name ?? ""
    }));
    const current = this.execEntries();
    if (current.length === linked.length)
      return current;
    return linked.map((la) => {
      const existing = current.find((e) => e.accountId === la.accountId);
      return existing ?? { accountId: la.accountId, accountName: la.accountName, amount: "", description: "" };
    });
  }, ...ngDevMode ? [{ debugName: "formEntriesForMulti" }] : (
    /* istanbul ignore next */
    []
  ));
  onBizIdChange() {
    void this.loadAll();
  }
  async loadAll() {
    this.loading.set(true);
    this.error.set("");
    try {
      const [opTypes, funds, accounts, warehouses, currencies] = await Promise.all([
        this.api.getOperationTypes(this.bizId).catch(() => []),
        this.api.getFunds(this.bizId).catch(() => []),
        this.api.getAccounts(this.bizId).catch(() => []),
        this.api.getWarehouses(this.bizId).catch(() => []),
        this.api.getCurrencies().catch(() => [])
      ]);
      this.operationTypes.set(opTypes || []);
      this.funds.set(funds || []);
      this.accounts.set(accounts || []);
      this.warehouses.set(warehouses || []);
      const curList = currencies || [];
      this.currencies.set(curList);
      if (curList.length > 0 && !curList.find((c) => c.id === this.execCurrencyId())) {
        this.execCurrencyId.set(curList[0].id);
      }
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    } finally {
      this.loading.set(false);
    }
  }
  setTreasuryKind(kind) {
    this.treasuryKind.set(kind);
    this.selectedTreasury.set(null);
    this.voucherType.set("");
    this.selectedTemplate.set(null);
  }
  setTreasury(item) {
    this.selectedTreasury.set(item);
    this.voucherType.set("");
    this.selectedTemplate.set(null);
  }
  setVoucherType(vt) {
    this.voucherType.set(vt);
    this.selectedTemplate.set(null);
  }
  setTemplate(ot) {
    this.selectedTemplate.set(ot);
    this.execEntries.set([]);
    const linked = (ot?.linkedAccounts || ot?.accounts || []).map((la) => ({
      accountId: la.accountId ?? la.account_id ?? la.id,
      accountName: la.displayName ?? la.label ?? la.accountName ?? la.account_name ?? la.name ?? "",
      amount: "",
      description: ""
    }));
    this.execEntries.set(linked);
    const defCur = ot?.currencyId ?? ot?.currency_id;
    if (defCur && this.currencies().some((c) => c.id === defCur))
      this.execCurrencyId.set(defCur);
  }
  goBack() {
    if (this.selectedTemplate()) {
      this.selectedTemplate.set(null);
      this.execEntries.set([]);
      return;
    }
    if (this.voucherType()) {
      this.voucherType.set("");
      return;
    }
    if (this.selectedTreasury()) {
      this.selectedTreasury.set(null);
      return;
    }
    if (this.treasuryKind()) {
      this.treasuryKind.set("");
      return;
    }
    this.router.navigate(["/biz", this.bizId, "vouchers"]);
  }
  updateEntryAmount(index, value) {
    this.execEntries.update((entries) => {
      const next = [...entries];
      if (next[index])
        next[index] = __spreadProps(__spreadValues({}, next[index]), { amount: value });
      return next;
    });
  }
  updateEntryDescription(index, value) {
    this.execEntries.update((entries) => {
      const next = [...entries];
      if (next[index])
        next[index] = __spreadProps(__spreadValues({}, next[index]), { description: value });
      return next;
    });
  }
  getFormTotal() {
    if (this.isMultiLine()) {
      return this.execEntries().reduce((s, e) => s + (Number.parseFloat(e.amount) || 0), 0);
    }
    return Number.parseFloat(this.execSingleAmount()) || 0;
  }
  getCurrencyCode() {
    const id = this.execCurrencyId();
    return this.currencies().find((c) => c.id === id)?.code || "\u0631.\u064A";
  }
  async save() {
    const t = this.selectedTemplate();
    if (!t)
      return;
    this.error.set("");
    const isMulti = this.isMultiLine();
    if (isMulti) {
      const entries = this.execEntries().filter((e) => Number.parseFloat(e.amount) > 0);
      if (entries.length === 0) {
        this.toast.warning("\u0623\u062F\u062E\u0644 \u0645\u0628\u0644\u063A\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
        return;
      }
    } else {
      const amt = Number.parseFloat(this.execSingleAmount());
      if (!amt || amt <= 0) {
        this.toast.warning("\u0623\u062F\u062E\u0644 \u0627\u0644\u0645\u0628\u0644\u063A");
        return;
      }
    }
    this.saving.set(true);
    try {
      const voucherType = t.voucherType || t.voucher_type || "receipt";
      const payload = {
        operationTypeId: t.id,
        voucherType,
        currencyId: this.execCurrencyId(),
        description: this.execDescription() || t.name,
        voucherDate: this.execDate(),
        reference: this.execReference() || null
      };
      const treasury = this.selectedTreasury();
      if (treasury?.type === "fund") {
        payload.fromFundId = voucherType === "payment" ? treasury.id : null;
        payload.toFundId = voucherType === "receipt" ? treasury.id : null;
      } else if (treasury && treasury.type !== "warehouse") {
        payload.fromAccountId = voucherType === "payment" ? treasury.id : null;
        payload.toAccountId = voucherType === "receipt" ? treasury.id : null;
      }
      if (isMulti) {
        const entries = this.execEntries().filter((e) => Number.parseFloat(e.amount) > 0).map((e) => ({
          accountId: e.accountId,
          amount: Number.parseFloat(e.amount),
          notes: e.description || null
        }));
        payload.entries = entries;
        const result = await this.api.createVoucherMulti(this.bizId, payload);
        this.toast.success(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0633\u0646\u062F \u0628\u0646\u062C\u0627\u062D - \u0631\u0642\u0645: ${result?.voucherNumber ?? "-"}`);
      } else {
        const amount = Number.parseFloat(this.execSingleAmount());
        payload.amount = String(amount);
        payload.description = this.execDescription() || this.execSingleDescription() || t.name;
        if (voucherType === "receipt") {
          const firstAcc = (t.linkedAccounts || t.accounts || [])[0];
          const accId = firstAcc?.accountId ?? firstAcc?.account_id ?? firstAcc?.id;
          if (accId)
            payload.fromAccountId = accId;
          payload.toFundId = treasury?.type === "fund" ? treasury.id : null;
          payload.toAccountId = treasury?.type !== "fund" ? treasury?.id : null;
        } else {
          const firstAcc = (t.linkedAccounts || t.accounts || [])[0];
          const accId = firstAcc?.accountId ?? firstAcc?.account_id ?? firstAcc?.id;
          if (accId)
            payload.toAccountId = accId;
          payload.fromFundId = treasury?.type === "fund" ? treasury.id : null;
          payload.fromAccountId = treasury?.type !== "fund" ? treasury?.id : null;
        }
        const result = await this.api.createVoucher(this.bizId, payload);
        this.toast.success(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0633\u0646\u062F \u0628\u0646\u062C\u0627\u062D - \u0631\u0642\u0645: ${result?.voucherNumber ?? "-"}`);
      }
      this.router.navigate(["/biz", this.bizId, "vouchers"]);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    } finally {
      this.saving.set(false);
    }
  }
  formatAmount(val) {
    return formatAmount(val);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275RegisterOperationComponent_BaseFactory;
    return function RegisterOperationComponent_Factory(__ngFactoryType__) {
      return (\u0275RegisterOperationComponent_BaseFactory || (\u0275RegisterOperationComponent_BaseFactory = \u0275\u0275getInheritedFactory(_RegisterOperationComponent)))(__ngFactoryType__ || _RegisterOperationComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterOperationComponent, selectors: [["app-register-operation"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 17, vars: 2, consts: [[1, "page-container", "register-op-page"], [1, "page-header"], [1, "header-left"], [1, "back-btn", 3, "click"], [1, "material-icons-round"], [1, "page-icon-3d", "primary"], [1, "page-title"], [1, "page-subtitle"], [1, "alert-error"], [1, "loading-state"], [1, "alert-error", 3, "click"], [1, "close-x"], [1, "material-icons-round", "spin"], [1, "step-card"], [1, "step-card", "form-step"], [1, "step-title"], [1, "step-num"], [1, "kind-grid"], [1, "kind-btn"], [1, "kind-btn", 3, "click"], [1, "step-hint"], [1, "btn-3d", "btn-ghost", 3, "click"], [1, "treasury-list"], [1, "treasury-btn"], [1, "treasury-btn", 3, "click"], [1, "vtype-grid"], [1, "vtype-btn", 3, "receipt", "payment"], [1, "vtype-btn", 3, "click"], [1, "template-grid"], [1, "template-btn", 3, "--t-color"], [1, "template-btn", 3, "click"], [1, "voucher-number-hint"], [1, "form-row"], [1, "form-group"], [1, "required"], ["type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value"], ["type", "text", "placeholder", "\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644\u064A\u0629", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0623\u0648 \u0627\u0644\u0645\u0631\u062C\u0639", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "entries-section"], [1, "single-entry"], [1, "form-actions"], [1, "btn-3d", "btn-primary", 3, "click", "disabled"], [1, "hint"], [1, "entries-table"], [1, "entry-row"], [1, "form-total"], [1, "entry-account"], ["type", "number", "placeholder", "\u0627\u0644\u0645\u0628\u0644\u063A", "min", "0", "step", "0.01", 1, "form-input", "amount-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u0628\u064A\u0627\u0646 \u0627\u0644\u0633\u0637\u0631 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "amount-wrap"], ["type", "number", "placeholder", "0", "min", "0", "step", "0.01", 1, "form-input", "amount-input", 3, "ngModelChange", "ngModel"], [1, "currency-suffix"], ["type", "text", "placeholder", "\u0628\u064A\u0627\u0646 \u0627\u0644\u0633\u0646\u062F", 1, "form-input", 3, "ngModelChange", "ngModel"]], template: function RegisterOperationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
      \u0275\u0275listener("click", function RegisterOperationComponent_Template_button_click_3_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(4, "span", 4);
      \u0275\u0275text(5, "arrow_forward");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "span", 4);
      \u0275\u0275text(8, "play_circle");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div")(10, "h1", 6);
      \u0275\u0275text(11, "\u062A\u0633\u062C\u064A\u0644 \u0639\u0645\u0644\u064A\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p", 7);
      \u0275\u0275text(13, "\u0627\u062E\u062A\u0631 \u0627\u0644\u062C\u0647\u0629 \u062B\u0645 \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F \u062B\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(14, RegisterOperationComponent_Conditional_14_Template, 6, 1, "div", 8);
      \u0275\u0275conditionalCreate(15, RegisterOperationComponent_Conditional_15_Template, 5, 0, "div", 9)(16, RegisterOperationComponent_Conditional_16_Template, 5, 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275conditional(ctx.error() ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 15 : 16);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ["\n\n.page-container.register-op-page[_ngcontent-%COMP%] {\n  padding: 0;\n  max-width: 800px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 24px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.08),\n      rgba(99, 102, 241, 0.06));\n  border-radius: 20px;\n  border: 1px solid rgba(59, 130, 246, 0.15);\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.back-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-primary, #1e293b);\n}\n.page-icon-3d.primary[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  box-shadow: 0 6px 18px rgba(59, 130, 246, 0.35);\n}\n.page-icon-3d.primary[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: white;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 4px;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  margin: 0;\n}\n.alert-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\n.alert-error[_ngcontent-%COMP%]   .close-x[_ngcontent-%COMP%] {\n  margin-right: auto;\n  opacity: 0.6;\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 12px 0 0;\n  font-size: 14px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.step-card[_ngcontent-%COMP%] {\n  background: var(--bg-card, white);\n  border-radius: 20px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  padding: 24px 28px;\n  margin-bottom: 20px;\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);\n}\n.step-title[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 18px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.step-num[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-weight: 900;\n}\n.step-hint[_ngcontent-%COMP%] {\n  color: var(--text-secondary, #64748b);\n  font-size: 13px;\n  margin: 0 0 16px;\n  padding: 12px 16px;\n  background: rgba(100, 116, 139, 0.08);\n  border-radius: 12px;\n}\n.kind-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.kind-btn[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 16px 12px;\n  border-radius: 14px;\n  border: 2px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.kind-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #64748b;\n}\n.kind-btn[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.06);\n}\n.kind-btn[_ngcontent-%COMP%]:hover   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.treasury-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.treasury-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 18px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  text-align: right;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.treasury-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #22c55e;\n}\n.treasury-btn[_ngcontent-%COMP%]:hover {\n  border-color: #22c55e;\n  background: rgba(34, 197, 94, 0.06);\n}\n.vtype-grid[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.vtype-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px 24px;\n  border-radius: 14px;\n  border: 2px solid transparent;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.vtype-btn.receipt[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #16a34a;\n  border-color: rgba(34, 197, 94, 0.3);\n}\n.vtype-btn.receipt[_ngcontent-%COMP%]:hover {\n  background: rgba(34, 197, 94, 0.2);\n}\n.vtype-btn.payment[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  color: #dc2626;\n  border-color: rgba(239, 68, 68, 0.25);\n}\n.vtype-btn.payment[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.18);\n}\n.template-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.template-btn[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 6px;\n  padding: 16px;\n  border-radius: 14px;\n  border: 2px solid var(--t-color, #3b82f6);\n  background: color-mix(in srgb, var(--t-color, #3b82f6) 10%, transparent);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-align: right;\n}\n.template-btn[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.template-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: var(--t-color, #3b82f6);\n}\n.template-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);\n}\n.btn-3d[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--text-secondary, #64748b);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  margin-top: 8px;\n}\n.btn-3d.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface, #f8fafc);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  color: white;\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.voucher-number-hint[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  background: rgba(59, 130, 246, 0.08);\n  border-radius: 10px;\n  color: var(--text-secondary, #64748b);\n  font-size: 12px;\n  margin-bottom: 20px;\n}\n.voucher-number-hint[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #3b82f6;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.form-input[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  font-size: 14px;\n  font-family: inherit;\n}\n.form-input[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n}\n.amount-input[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.amount-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.amount-wrap[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.amount-wrap[_ngcontent-%COMP%]   .currency-suffix[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n}\n.entries-section[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  padding-top: 20px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n}\n.entries-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n  margin: 0 0 8px;\n}\n.entries-section[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  margin: 0 0 16px;\n}\n.entries-table[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.entry-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 120px 1fr;\n  gap: 12px;\n  align-items: center;\n}\n.entry-row[_ngcontent-%COMP%]   .entry-account[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-primary, #1e293b);\n}\n.form-total[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n  padding: 12px 0;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 24px;\n  padding-top: 20px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n}\n.single-entry[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  max-width: 320px;\n}\n/*# sourceMappingURL=register-operation.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterOperationComponent, [{
    type: Component,
    args: [{ selector: "app-register-operation", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-container register-op-page">\r
\r
  <div class="page-header">\r
    <div class="header-left">\r
      <button class="back-btn" (click)="goBack()">\r
        <span class="material-icons-round">arrow_forward</span>\r
      </button>\r
      <div class="page-icon-3d primary">\r
        <span class="material-icons-round">play_circle</span>\r
      </div>\r
      <div>\r
        <h1 class="page-title">\u062A\u0633\u062C\u064A\u0644 \u0639\u0645\u0644\u064A\u0629</h1>\r
        <p class="page-subtitle">\u0627\u062E\u062A\u0631 \u0627\u0644\u062C\u0647\u0629 \u062B\u0645 \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F \u062B\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</p>\r
      </div>\r
    </div>\r
  </div>\r
\r
  @if (error()) {\r
    <div class="alert-error" (click)="error.set('')">\r
      <span class="material-icons-round">error_outline</span>\r
      {{ error() }}\r
      <span class="close-x">\u2715</span>\r
    </div>\r
  }\r
\r
  @if (loading()) {\r
    <div class="loading-state">\r
      <span class="material-icons-round spin">sync</span>\r
      <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>\r
    </div>\r
  } @else {\r
\r
    <!-- \u0627\u0644\u062E\u0637\u0648\u0629 \u0661: \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629 -->\r
    @if (!treasuryKind()) {\r
      <div class="step-card">\r
        <h2 class="step-title"><span class="step-num">\u0661</span> \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629</h2>\r
        <div class="kind-grid">\r
          @for (opt of treasuryKindOptions; track opt.value) {\r
            <button class="kind-btn" (click)="setTreasuryKind(opt.value)">\r
              <span class="material-icons-round">{{ opt.icon }}</span>\r
              {{ opt.label }}\r
            </button>\r
          }\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- \u0627\u0644\u062E\u0637\u0648\u0629 \u0662: \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062E\u0632\u064A\u0646\u0629/\u0627\u0644\u0645\u062E\u0632\u0646 -->\r
    @if (treasuryKind() && !selectedTreasury()) {\r
      <div class="step-card">\r
        <h2 class="step-title"><span class="step-num">\u0662</span> \u0627\u062E\u062A\u0631 {{ treasuryKind() === 'fund' ? '\u0627\u0644\u0635\u0646\u062F\u0648\u0642' : treasuryKind() === 'warehouse' ? '\u0627\u0644\u0645\u062E\u0632\u0646' : '\u0627\u0644\u062D\u0633\u0627\u0628' }}</h2>\r
        @if (treasuryKind() === 'warehouse') {\r
          <p class="step-hint">\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0632\u0646 (\u062A\u0648\u0631\u064A\u062F\u060C \u0635\u0631\u0641\u060C \u062A\u062D\u0648\u064A\u0644) \u062A\u064F\u0646\u0641\u0651\u064E\u0630 \u0645\u0646 \u0635\u0641\u062D\u0629 \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0623\u0648 \u0645\u0646 \u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629.</p>\r
          <button class="btn-3d btn-ghost" (click)="setTreasuryKind('')">\u0631\u062C\u0648\u0639</button>\r
        } @else if (treasuryList().length === 0) {\r
          <p class="step-hint">\u0644\u0627 \u062A\u0648\u062C\u062F {{ treasuryKind() === 'fund' ? '\u0635\u0646\u0627\u062F\u064A\u0642' : '\u062D\u0633\u0627\u0628\u0627\u062A' }} \u0645\u0633\u062C\u0651\u0644\u0629. \u0623\u0636\u0641\u0647\u0627 \u0645\u0646 \u0635\u0641\u062D\u0629 {{ treasuryKind() === 'fund' ? '\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642' : '\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A' }} \u0623\u0648\u0644\u0627\u064B.</p>\r
          <button class="btn-3d btn-ghost" (click)="setTreasuryKind('')">\u0631\u062C\u0648\u0639</button>\r
        } @else {\r
          <div class="treasury-list">\r
            @for (item of treasuryList(); track item.id) {\r
              <button class="treasury-btn" (click)="setTreasury(item)">\r
                <span class="material-icons-round">{{ treasuryKind() === 'fund' ? 'savings' : 'account_balance' }}</span>\r
                {{ item.name }}\r
              </button>\r
            }\r
          </div>\r
          <button class="btn-3d btn-ghost" (click)="setTreasuryKind('')">\u062A\u063A\u064A\u064A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629</button>\r
        }\r
      </div>\r
    }\r
\r
    <!-- \u0627\u0644\u062E\u0637\u0648\u0629 \u0663: \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F (\u0644\u0644\u062E\u0632\u0627\u0626\u0646 \u0641\u0642\u0637\u060C \u063A\u064A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646) -->\r
    @if (selectedTreasury() && selectedTreasury()!.type !== 'warehouse' && !voucherType()) {\r
      <div class="step-card">\r
        <h2 class="step-title"><span class="step-num">\u0663</span> \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F</h2>\r
        <div class="vtype-grid">\r
          @for (opt of voucherTypeOptions; track opt.value) {\r
            <button class="vtype-btn" [class.receipt]="opt.value === 'receipt'" [class.payment]="opt.value === 'payment'" (click)="setVoucherType(opt.value)">\r
              <span class="material-icons-round">{{ opt.icon }}</span>\r
              {{ opt.label }}\r
            </button>\r
          }\r
        </div>\r
        <button class="btn-3d btn-ghost" (click)="selectedTreasury.set(null)">\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062E\u0632\u064A\u0646\u0629</button>\r
      </div>\r
    }\r
\r
    <!-- \u0627\u0644\u062E\u0637\u0648\u0629 \u0664: \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0642\u0627\u0644\u0628 -->\r
    @if (voucherType() && !selectedTemplate()) {\r
      <div class="step-card">\r
        <h2 class="step-title"><span class="step-num">\u0664</span> \u0627\u062E\u062A\u0631 \u0642\u0627\u0644\u0628 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</h2>\r
        @if (filteredTemplates().length === 0) {\r
          <p class="step-hint">\u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0648\u0627\u0644\u0628 \u0645\u064F\u0646\u0634\u0623\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0648\u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F ({{ voucherType() === 'receipt' ? '\u0642\u0628\u0636' : '\u0635\u0631\u0641' }}). \u0623\u0646\u0634\u0626 \u0642\u0627\u0644\u0628\u0627\u064B \u0645\u0646 \u0635\u0641\u062D\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A.</p>\r
          <button class="btn-3d btn-ghost" (click)="voucherType.set('')">\u0631\u062C\u0648\u0639</button>\r
        } @else {\r
          <div class="template-grid">\r
            @for (ot of filteredTemplates(); track ot.id) {\r
              <button class="template-btn" (click)="setTemplate(ot)" [style.--t-color]="ot.color || '#3b82f6'">\r
                <span class="material-icons-round">{{ ot.icon || 'receipt_long' }}</span>\r
                <span>{{ ot.name }}</span>\r
                @if (ot.code) { <small>{{ ot.code }}</small> }\r
              </button>\r
            }\r
          </div>\r
          <button class="btn-3d btn-ghost" (click)="voucherType.set('')">\u062A\u063A\u064A\u064A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F</button>\r
        }\r
      </div>\r
    }\r
\r
    <!-- \u0627\u0644\u062E\u0637\u0648\u0629 \u0665: \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u0646\u0641\u064A\u0630 -->\r
    @if (selectedTemplate()) {\r
      <div class="step-card form-step">\r
        <h2 class="step-title"><span class="step-num">\u0665</span> \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u2014 {{ selectedTemplate().name }}</h2>\r
\r
        <p class="voucher-number-hint">\r
          <span class="material-icons-round">tag</span>\r
          \u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F \u0633\u064A\u064F\u0648\u0644\u0651\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0633\u0628 \u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0648\u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F \u0648\u0627\u0644\u0633\u0646\u0629.\r
        </p>\r
\r
        <div class="form-row">\r
          <div class="form-group">\r
            <label>\u0627\u0644\u062A\u0627\u0631\u064A\u062E <span class="required">*</span></label>\r
            <input type="date" class="form-input" [ngModel]="execDate()" (ngModelChange)="execDate.set($event)">\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0639\u0645\u0644\u0629</label>\r
            <select class="form-select" [ngModel]="execCurrencyId()" (ngModelChange)="execCurrencyId.set(+$event)">\r
              @for (c of currencies(); track c.id) {\r
                <option [value]="c.id">{{ c.code }} \u2014 {{ c.name }}</option>\r
              }\r
            </select>\r
          </div>\r
        </div>\r
\r
        <div class="form-group">\r
          <label>\u0627\u0644\u0628\u064A\u0627\u0646 \u0627\u0644\u0639\u0627\u0645 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>\r
          <input type="text" class="form-input" [ngModel]="execDescription()" (ngModelChange)="execDescription.set($event)" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644\u064A\u0629">\r
        </div>\r
        <div class="form-group">\r
          <label>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0631\u062C\u0639\u064A (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>\r
          <input type="text" class="form-input" [ngModel]="execReference()" (ngModelChange)="execReference.set($event)" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0623\u0648 \u0627\u0644\u0645\u0631\u062C\u0639">\r
        </div>\r
\r
        @if (isMultiLine()) {\r
          <div class="entries-section">\r
            <h3>\u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0648\u0627\u0644\u0628\u064A\u0627\u0646 \u0644\u0643\u0644 \u062D\u0633\u0627\u0628</h3>\r
            <p class="hint">\u0633\u0646\u062F \u0648\u0627\u062D\u062F \u0645\u062A\u0639\u062F\u062F \u0627\u0644\u0623\u0633\u0637\u0631 \u2014 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0633\u064A\u064F\u0633\u062C\u0651\u0644 \u0641\u064A \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629.</p>\r
            <div class="entries-table">\r
              @for (entry of formEntriesForMulti(); track entry.accountId; let i = $index) {\r
                <div class="entry-row">\r
                  <div class="entry-account">{{ entry.accountName }}</div>\r
                  <input type="number" class="form-input amount-input" placeholder="\u0627\u0644\u0645\u0628\u0644\u063A" min="0" step="0.01"\r
                         [ngModel]="entry.amount" (ngModelChange)="updateEntryAmount(i, $event)">\r
                  <input type="text" class="form-input" placeholder="\u0628\u064A\u0627\u0646 \u0627\u0644\u0633\u0637\u0631 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"\r
                         [ngModel]="entry.description" (ngModelChange)="updateEntryDescription(i, $event)">\r
                </div>\r
              }\r
            </div>\r
            <div class="form-total">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A: <strong>{{ formatAmount(getFormTotal()) }} {{ getCurrencyCode() }}</strong></div>\r
          </div>\r
        } @else {\r
          <div class="single-entry">\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0628\u0644\u063A <span class="required">*</span></label>\r
              <div class="amount-wrap">\r
                <input type="number" class="form-input amount-input" placeholder="0" min="0" step="0.01"\r
                       [ngModel]="execSingleAmount()" (ngModelChange)="execSingleAmount.set($event)">\r
                <span class="currency-suffix">{{ getCurrencyCode() }}</span>\r
              </div>\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0628\u064A\u0627\u0646</label>\r
              <input type="text" class="form-input" [ngModel]="execSingleDescription()" (ngModelChange)="execSingleDescription.set($event)" placeholder="\u0628\u064A\u0627\u0646 \u0627\u0644\u0633\u0646\u062F">\r
            </div>\r
          </div>\r
        }\r
\r
        <div class="form-actions">\r
          <button class="btn-3d btn-ghost" (click)="selectedTemplate.set(null); execEntries.set([])">\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0642\u0627\u0644\u0628</button>\r
          <button class="btn-3d btn-primary" [disabled]="saving()" (click)="save()">\r
            <span class="material-icons-round">{{ saving() ? 'sync' : 'check_circle' }}</span>\r
            {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : '\u062D\u0641\u0638 \u0627\u0644\u0639\u0645\u0644\u064A\u0629' }}\r
          </button>\r
        </div>\r
      </div>\r
    }\r
  }\r
</div>\r
`, styles: ["/* src/app/pages/register-operation/register-operation.scss */\n.page-container.register-op-page {\n  padding: 0;\n  max-width: 800px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  margin-bottom: 24px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.08),\n      rgba(99, 102, 241, 0.06));\n  border-radius: 20px;\n  border: 1px solid rgba(59, 130, 246, 0.15);\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.back-btn {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.back-btn .material-icons-round {\n  font-size: 22px;\n}\n.back-btn:hover {\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-primary, #1e293b);\n}\n.page-icon-3d.primary {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  box-shadow: 0 6px 18px rgba(59, 130, 246, 0.35);\n}\n.page-icon-3d.primary .material-icons-round {\n  font-size: 26px;\n  color: white;\n}\n.page-title {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 4px;\n}\n.page-subtitle {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  margin: 0;\n}\n.alert-error {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\n.alert-error .close-x {\n  margin-right: auto;\n  opacity: 0.6;\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n}\n.loading-state p {\n  margin: 12px 0 0;\n  font-size: 14px;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.step-card {\n  background: var(--bg-card, white);\n  border-radius: 20px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  padding: 24px 28px;\n  margin-bottom: 20px;\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);\n}\n.step-title {\n  font-size: 17px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 18px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.step-num {\n  width: 32px;\n  height: 32px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-weight: 900;\n}\n.step-hint {\n  color: var(--text-secondary, #64748b);\n  font-size: 13px;\n  margin: 0 0 16px;\n  padding: 12px 16px;\n  background: rgba(100, 116, 139, 0.08);\n  border-radius: 12px;\n}\n.kind-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.kind-btn {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 16px 12px;\n  border-radius: 14px;\n  border: 2px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.kind-btn .material-icons-round {\n  font-size: 28px;\n  color: #64748b;\n}\n.kind-btn:hover {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.06);\n}\n.kind-btn:hover .material-icons-round {\n  color: #3b82f6;\n}\n.treasury-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.treasury-btn {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 18px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  text-align: right;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.treasury-btn .material-icons-round {\n  font-size: 20px;\n  color: #22c55e;\n}\n.treasury-btn:hover {\n  border-color: #22c55e;\n  background: rgba(34, 197, 94, 0.06);\n}\n.vtype-grid {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.vtype-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px 24px;\n  border-radius: 14px;\n  border: 2px solid transparent;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.vtype-btn.receipt {\n  background: rgba(34, 197, 94, 0.12);\n  color: #16a34a;\n  border-color: rgba(34, 197, 94, 0.3);\n}\n.vtype-btn.receipt:hover {\n  background: rgba(34, 197, 94, 0.2);\n}\n.vtype-btn.payment {\n  background: rgba(239, 68, 68, 0.1);\n  color: #dc2626;\n  border-color: rgba(239, 68, 68, 0.25);\n}\n.vtype-btn.payment:hover {\n  background: rgba(239, 68, 68, 0.18);\n}\n.template-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.template-btn {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 6px;\n  padding: 16px;\n  border-radius: 14px;\n  border: 2px solid var(--t-color, #3b82f6);\n  background: color-mix(in srgb, var(--t-color, #3b82f6) 10%, transparent);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-align: right;\n}\n.template-btn small {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.template-btn .material-icons-round {\n  font-size: 22px;\n  color: var(--t-color, #3b82f6);\n}\n.template-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);\n}\n.btn-3d {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d.btn-ghost {\n  background: transparent;\n  color: var(--text-secondary, #64748b);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  margin-top: 8px;\n}\n.btn-3d.btn-ghost:hover {\n  background: var(--bg-surface, #f8fafc);\n}\n.btn-3d.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  color: white;\n}\n.btn-3d.btn-primary:hover:not(:disabled) {\n  transform: translateY(-2px);\n}\n.btn-3d.btn-primary:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.voucher-number-hint {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  background: rgba(59, 130, 246, 0.08);\n  border-radius: 10px;\n  color: var(--text-secondary, #64748b);\n  font-size: 12px;\n  margin-bottom: 20px;\n}\n.voucher-number-hint .material-icons-round {\n  font-size: 18px;\n  color: #3b82f6;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 6px;\n}\n.form-group label .required {\n  color: #ef4444;\n}\n.form-input,\n.form-select {\n  width: 100%;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  font-size: 14px;\n  font-family: inherit;\n}\n.form-input:focus,\n.form-select:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n}\n.amount-input {\n  text-align: left;\n}\n.amount-wrap {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.amount-wrap .form-input {\n  flex: 1;\n}\n.amount-wrap .currency-suffix {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n}\n.entries-section {\n  margin-top: 24px;\n  padding-top: 20px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n}\n.entries-section h3 {\n  font-size: 15px;\n  font-weight: 800;\n  margin: 0 0 8px;\n}\n.entries-section .hint {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  margin: 0 0 16px;\n}\n.entries-table {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.entry-row {\n  display: grid;\n  grid-template-columns: 1fr 120px 1fr;\n  gap: 12px;\n  align-items: center;\n}\n.entry-row .entry-account {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-primary, #1e293b);\n}\n.form-total {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n  padding: 12px 0;\n}\n.form-actions {\n  display: flex;\n  gap: 12px;\n  margin-top: 24px;\n  padding-top: 20px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n}\n.single-entry .form-group {\n  max-width: 320px;\n}\n/*# sourceMappingURL=register-operation.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterOperationComponent, { className: "RegisterOperationComponent", filePath: "src/app/pages/register-operation/register-operation.ts", lineNumber: 22 });
})();
export {
  RegisterOperationComponent
};
//# sourceMappingURL=chunk-FUTEYPTB.js.map
