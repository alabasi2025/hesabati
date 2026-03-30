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
  ɵɵattribute,
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
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VUZEB5JS.js";

// src/app/pages/operation-types/operation-types.ts
var _c0 = () => [1, 2, 3, 4, 5, 6];
var _forTrack0 = ($index, $item) => $item.name;
var _forTrack1 = ($index, $item) => $item.value;
var _forTrack2 = ($index, $item) => $item.category;
var _forTrack3 = ($index, $item) => $item.id;
var _forTrack4 = ($index, $item) => $item.num;
var _forTrack5 = ($index, $item) => $item.accountId;
function OperationTypesComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadStats());
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "analytics");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 18);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_15_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openWizard());
    });
    \u0275\u0275elementStart(5, "span", 4);
    \u0275\u0275text(6, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " \u0642\u0627\u0644\u0628 \u062C\u062F\u064A\u062F ");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCategoryForm());
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F ");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_17_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.error.set(""));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 20);
    \u0275\u0275text(5, "\u2715");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
function OperationTypesComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_18_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.success.set(""));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.success(), " ");
  }
}
function OperationTypesComponent_Conditional_32_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 22);
  }
}
function OperationTypesComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, OperationTypesComponent_Conditional_32_For_2_Template, 1, 0, "div", 22, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function OperationTypesComponent_Conditional_33_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 25)(2, "span", 4);
    \u0275\u0275text(3, "folder_open");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0646\u064A\u0641\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "\u0623\u0646\u0634\u0626 \u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0644\u062A\u0646\u0638\u064A\u0645 \u0642\u0648\u0627\u0644\u0628 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 (\u0645\u062B\u0644: \u062A\u062D\u0635\u064A\u0644\u060C \u062A\u0648\u0631\u064A\u062F\u060C \u0633\u0646\u062F\u0627\u062A\u060C \u0642\u064A\u0648\u062F)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 18);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_33_Conditional_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCategoryForm());
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u0623\u0646\u0634\u0626 \u0623\u0648\u0644 \u062A\u0635\u0646\u064A\u0641 ");
    \u0275\u0275elementEnd()();
  }
}
function OperationTypesComponent_Conditional_33_Conditional_1_For_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 4);
    \u0275\u0275text(2, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", cat_r8.code, " ");
  }
}
function OperationTypesComponent_Conditional_33_Conditional_1_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 4);
    \u0275\u0275text(2, "format_list_numbered");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" #", cat_r8.sequenceNumber, " ");
  }
}
function OperationTypesComponent_Conditional_33_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275element(1, "div", 28);
    \u0275\u0275elementStart(2, "div", 29)(3, "div", 30)(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(6, "div", 31);
    \u0275\u0275elementStart(7, "div", 32)(8, "button", 33);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_33_Conditional_1_For_2_Template_button_click_8_listener() {
      const cat_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.editCategory(cat_r8.name));
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 34);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_33_Conditional_1_For_2_Template_button_click_11_listener() {
      const cat_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteCategory(cat_r8.name));
    });
    \u0275\u0275elementStart(12, "span", 4);
    \u0275\u0275text(13, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(14, "div", 35)(15, "h3", 36);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 37);
    \u0275\u0275conditionalCreate(18, OperationTypesComponent_Conditional_33_Conditional_1_For_2_Conditional_18_Template, 4, 1, "div", 38);
    \u0275\u0275conditionalCreate(19, OperationTypesComponent_Conditional_33_Conditional_1_For_2_Conditional_19_Template, 4, 1, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 39);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cat_r8 = ctx.$implicit;
    \u0275\u0275styleProp("--card-color", cat_r8.color);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", cat_r8.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r8.icon);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(cat_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(cat_r8.code ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(cat_r8.sequenceNumber ? 19 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", cat_r8.count, " \u0642\u0627\u0644\u0628 \u0645\u0631\u062A\u0628\u0637");
  }
}
function OperationTypesComponent_Conditional_33_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, OperationTypesComponent_Conditional_33_Conditional_1_For_2_Template, 22, 9, "div", 26, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.categoryDetails());
  }
}
function OperationTypesComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, OperationTypesComponent_Conditional_33_Conditional_0_Template, 12, 0, "div", 23)(1, OperationTypesComponent_Conditional_33_Conditional_1_Template, 3, 0, "div", 24);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.categoryDetails().length === 0 ? 0 : 1);
  }
}
function OperationTypesComponent_Conditional_34_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_34_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.searchQuery.set(""));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function OperationTypesComponent_Conditional_34_Conditional_8_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.countByCategory(cat_r12.value));
  }
}
function OperationTypesComponent_Conditional_34_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_34_Conditional_8_For_2_Template_button_click_0_listener() {
      const cat_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.activeCategory.set(cat_r12.value));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275conditionalCreate(4, OperationTypesComponent_Conditional_34_Conditional_8_For_2_Conditional_4_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r1.activeCategory() === cat_r12.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r12.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cat_r12.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(cat_r12.value !== "all" ? 4 : -1);
  }
}
function OperationTypesComponent_Conditional_34_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275repeaterCreate(1, OperationTypesComponent_Conditional_34_Conditional_8_For_2_Template, 5, 5, "button", 47, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.categoryFilters());
  }
}
function OperationTypesComponent_Conditional_34_Conditional_9_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, '\u0623\u0646\u0634\u0626 \u062A\u0635\u0646\u064A\u0641\u0627\u064B \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u062A\u0628\u0648\u064A\u0628 "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A" \u062B\u0645 \u0623\u0636\u0641 \u0642\u0648\u0627\u0644\u0628');
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 18);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_34_Conditional_9_Conditional_6_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.switchTab("categories"));
    });
    \u0275\u0275elementStart(3, "span", 4);
    \u0275\u0275text(4, "folder");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " \u0627\u0646\u062A\u0642\u0644 \u0644\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A ");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_34_Conditional_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "\u0623\u0646\u0634\u0626 \u0642\u0627\u0644\u0628 \u062C\u062F\u064A\u062F \u0628\u062E\u0637\u0648\u0627\u062A \u0628\u0633\u064A\u0637\u0629 \u0644\u062A\u0646\u0638\u064A\u0645 \u0639\u0645\u0644\u064A\u0627\u062A\u0643 \u0627\u0644\u0645\u0627\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 18);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_34_Conditional_9_Conditional_7_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openWizard());
    });
    \u0275\u0275elementStart(3, "span", 4);
    \u0275\u0275text(4, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " \u0623\u0646\u0634\u0626 \u0623\u0648\u0644 \u0642\u0627\u0644\u0628 ");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_34_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 25)(2, "span", 4);
    \u0275\u0275text(3, "auto_awesome");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0648\u0627\u0644\u0628 \u0628\u0639\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, OperationTypesComponent_Conditional_34_Conditional_9_Conditional_6_Template, 6, 0)(7, OperationTypesComponent_Conditional_34_Conditional_9_Conditional_7_Template, 6, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.dynamicCategories().length === 0 ? 6 : 7);
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r16 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275attribute("data-vtype", ot_r16.voucherType);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getVoucherTypeLabel(ot_r16.voucherType));
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ot_r16.description);
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 4);
    \u0275\u0275text(2, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ot_r16.code, " ");
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 4);
    \u0275\u0275text(2, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" #", ot_r16.sequenceNumber, " ");
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 4);
    \u0275\u0275text(2, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r16 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getPaymentMethodLabel(ot_r16.paymentMethod), " ");
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 4);
    \u0275\u0275text(2, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r16 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getSourceLabel(ot_r16), " ");
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59)(1, "span", 4);
    \u0275\u0275text(2, "attach_file");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0645\u0631\u0641\u0642 ");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60)(1, "span", 4);
    \u0275\u0275text(2, "pause_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0645\u0648\u0642\u0648\u0641 ");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_41_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "span", 4);
    \u0275\u0275text(2, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const la_r17 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(la_r17.label || la_r17.accountName);
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_41_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_41_Conditional_3_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ot_r16 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openAccountsView(ot_r16));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r16 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", ot_r16.linkedAccounts.length - 4, " \u0623\u0643\u062B\u0631");
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275repeaterCreate(1, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_41_For_2_Template, 5, 1, "div", 65, _forTrack3);
    \u0275\u0275conditionalCreate(3, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_41_Conditional_3_Template, 2, 1, "div", 66);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(ot_r16.linkedAccounts.slice(0, 4));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ot_r16.linkedAccounts.length > 4 ? 3 : -1);
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275element(1, "div", 28);
    \u0275\u0275elementStart(2, "div", 29)(3, "div", 30)(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 31);
    \u0275\u0275conditionalCreate(7, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_7_Template, 2, 2, "span", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 32)(9, "button", 55);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Template_button_click_9_listener() {
      const ot_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.cloneOT(ot_r16));
    });
    \u0275\u0275elementStart(10, "span", 4);
    \u0275\u0275text(11, "content_copy");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 56);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Template_button_click_12_listener() {
      const ot_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.toggleOT(ot_r16));
    });
    \u0275\u0275elementStart(13, "span", 4);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 33);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Template_button_click_15_listener() {
      const ot_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openEditWizard(ot_r16));
    });
    \u0275\u0275elementStart(16, "span", 4);
    \u0275\u0275text(17, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "button", 34);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Template_button_click_18_listener() {
      const ot_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.deleteOT(ot_r16.id));
    });
    \u0275\u0275elementStart(19, "span", 4);
    \u0275\u0275text(20, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(21, "div", 35)(22, "h3", 36);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_24_Template, 2, 1, "p", 39);
    \u0275\u0275elementStart(25, "div", 37);
    \u0275\u0275conditionalCreate(26, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_26_Template, 4, 1, "div", 38)(27, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_27_Template, 4, 1, "div", 38);
    \u0275\u0275conditionalCreate(28, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_28_Template, 4, 1, "div", 38);
    \u0275\u0275conditionalCreate(29, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_29_Template, 4, 1, "div", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 58);
    \u0275\u0275conditionalCreate(31, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_31_Template, 4, 0, "span", 59);
    \u0275\u0275conditionalCreate(32, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_32_Template, 4, 0, "span", 60);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 61)(34, "div", 62);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Template_div_click_34_listener() {
      const ot_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openAccountsView(ot_r16));
    });
    \u0275\u0275elementStart(35, "span", 4);
    \u0275\u0275text(36, "link");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 63);
    \u0275\u0275text(40, "open_in_new");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(41, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Conditional_41_Template, 4, 1, "div", 64);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ot_r16 = ctx.$implicit;
    \u0275\u0275styleProp("--card-color", ot_r16.color);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", ot_r16.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ot_r16.icon);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ot_r16.voucherType ? 7 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active-toggle", ot_r16.isActive);
    \u0275\u0275property("title", ot_r16.isActive ? "\u062A\u0639\u0637\u064A\u0644" : "\u062A\u0641\u0639\u064A\u0644");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ot_r16.isActive ? "toggle_on" : "toggle_off");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ot_r16.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ot_r16.description ? 24 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ot_r16.code ? 26 : ot_r16.sequenceNumber ? 27 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ot_r16.paymentMethod ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ot_r16.sourceAccountId || ot_r16.sourceFundId ? 29 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ot_r16.requiresAttachment ? 31 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ot_r16.isActive ? 32 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 (", (ot_r16.linkedAccounts == null ? null : ot_r16.linkedAccounts.length) || 0, ")");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ot_r16.linkedAccounts && ot_r16.linkedAccounts.length > 0 ? 41 : -1);
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 14);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 51);
    \u0275\u0275repeaterCreate(9, OperationTypesComponent_Conditional_34_Conditional_10_For_1_For_10_Template, 42, 19, "div", 52, _forTrack3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const group_r19 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getCategoryIcon(group_r19.category));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r19.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r19.items.length);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r19.items);
  }
}
function OperationTypesComponent_Conditional_34_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, OperationTypesComponent_Conditional_34_Conditional_10_For_1_Template, 11, 3, "div", 49, _forTrack2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.groupedByCategory());
  }
}
function OperationTypesComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41)(2, "span", 4);
    \u0275\u0275text(3, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 42);
    \u0275\u0275listener("input", function OperationTypesComponent_Conditional_34_Template_input_input_4_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.searchQuery.set($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, OperationTypesComponent_Conditional_34_Conditional_5_Template, 3, 0, "button", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 44);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, OperationTypesComponent_Conditional_34_Conditional_8_Template, 3, 0, "div", 45);
    \u0275\u0275conditionalCreate(9, OperationTypesComponent_Conditional_34_Conditional_9_Template, 8, 1, "div", 23)(10, OperationTypesComponent_Conditional_34_Conditional_10_Template, 2, 0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.searchQuery());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.searchQuery() ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.filteredTypes().length, " \u0642\u0627\u0644\u0628");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.categoryFilters().length > 1 ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.filteredTypes().length === 0 ? 9 : 10);
  }
}
function OperationTypesComponent_Conditional_35_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 85);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_35_For_23_Template_button_click_0_listener() {
      const ic_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.newCategoryIcon.set(ic_r22));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ic_r22 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.newCategoryIcon() === ic_r22);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ic_r22);
  }
}
function OperationTypesComponent_Conditional_35_For_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 86);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_35_For_29_Template_button_click_0_listener() {
      const c_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.newCategoryColor.set(c_r24));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r24 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("background", c_r24);
    \u0275\u0275classProp("selected", ctx_r1.newCategoryColor() === c_r24);
  }
}
function OperationTypesComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_35_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeCategoryForm());
    });
    \u0275\u0275elementStart(1, "div", 69);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_35_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 70)(3, "div", 71)(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 72);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_35_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeCategoryForm());
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 73)(12, "div", 74)(13, "label", 75);
    \u0275\u0275text(14, "\u0627\u0633\u0645 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 ");
    \u0275\u0275elementStart(15, "span", 76);
    \u0275\u0275text(16, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "input", 77);
    \u0275\u0275listener("input", function OperationTypesComponent_Conditional_35_Template_input_input_17_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.newCategoryName.set($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 74)(19, "label", 75);
    \u0275\u0275text(20, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 78);
    \u0275\u0275repeaterCreate(22, OperationTypesComponent_Conditional_35_For_23_Template, 3, 3, "button", 79, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 74)(25, "label", 75);
    \u0275\u0275text(26, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 80);
    \u0275\u0275repeaterCreate(28, OperationTypesComponent_Conditional_35_For_29_Template, 1, 4, "button", 81, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 82)(31, "button", 83);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_35_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeCategoryForm());
    });
    \u0275\u0275text(32, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 84);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_35_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveCategory());
    });
    \u0275\u0275elementStart(34, "span", 4);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.editingCategoryOld() ? "edit" : "create_new_folder");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.editingCategoryOld() ? "\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0646\u064A\u0641" : "\u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(10);
    \u0275\u0275property("value", ctx_r1.newCategoryName());
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.categoryIcons);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.colors);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.saving() || !ctx_r1.newCategoryName().trim());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "sync" : "save");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : ctx_r1.editingCategoryOld() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644" : "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0635\u0646\u064A\u0641", " ");
  }
}
function OperationTypesComponent_Conditional_36_For_11_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 100);
  }
  if (rf & 2) {
    const step_r27 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("done", ctx_r1.wizardStep() > step_r27.num);
  }
}
function OperationTypesComponent_Conditional_36_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 97);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_For_11_Template_div_click_0_listener() {
      const step_r27 = \u0275\u0275restoreView(_r26).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(step_r27.num < ctx_r1.wizardStep() ? ctx_r1.wizardStep.set(step_r27.num) : null);
    });
    \u0275\u0275elementStart(1, "div", 98);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, OperationTypesComponent_Conditional_36_For_11_Conditional_5_Template, 1, 2, "div", 99);
  }
  if (rf & 2) {
    const step_r27 = ctx.$implicit;
    const \u0275$index_454_r28 = ctx.$index;
    const \u0275$count_454_r29 = ctx.$count;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.wizardStep() === step_r27.num)("done", ctx_r1.wizardStep() > step_r27.num);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r27.num);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r27.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_454_r28 === \u0275$count_454_r29 - 1) ? 5 : -1);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92)(1, "span", 4);
    \u0275\u0275text(2, "campaign");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 101)(4, "strong");
    \u0275\u0275text(5, "\u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u0646\u0638\u0627\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.wizardSystemMessage());
  }
}
function OperationTypesComponent_Conditional_36_Conditional_14_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 104)(1, "span", 4);
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, ' \u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0646\u064A\u0641\u0627\u062A. \u0623\u0646\u0634\u0626 \u062A\u0635\u0646\u064A\u0641\u0627\u064B \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u062A\u0628\u0648\u064A\u0628 "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A". ');
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_36_Conditional_14_Conditional_8_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 110);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_36_Conditional_14_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 107);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_14_Conditional_8_For_2_Template_div_click_0_listener() {
      const cat_r31 = \u0275\u0275restoreView(_r30).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectCategory(cat_r31));
    });
    \u0275\u0275elementStart(1, "div", 108)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 109)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, OperationTypesComponent_Conditional_36_Conditional_14_Conditional_8_For_2_Conditional_9_Template, 2, 0, "span", 110);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r31 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("selected", ctx_r1.wiz().categoryId === cat_r31.id);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", cat_r31.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r31.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(cat_r31.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", cat_r31.count, " \u0642\u0627\u0644\u0628");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wiz().categoryId === cat_r31.id ? 9 : -1);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_14_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105);
    \u0275\u0275repeaterCreate(1, OperationTypesComponent_Conditional_36_Conditional_14_Conditional_8_For_2_Template, 10, 8, "div", 106, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.dynamicCategories());
  }
}
function OperationTypesComponent_Conditional_36_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "h3", 102)(2, "span", 4);
    \u0275\u0275text(3, "folder");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 103);
    \u0275\u0275text(6, "\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0630\u064A \u064A\u0646\u062A\u0645\u064A \u0625\u0644\u064A\u0647 \u0647\u0630\u0627 \u0627\u0644\u0642\u0627\u0644\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, OperationTypesComponent_Conditional_36_Conditional_14_Conditional_7_Template, 4, 0, "div", 104)(8, OperationTypesComponent_Conditional_36_Conditional_14_Conditional_8_Template, 3, 0, "div", 105);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.dynamicCategories().length === 0 ? 7 : 8);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_15_For_9_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 110);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_36_Conditional_15_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 107);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_15_For_9_Template_div_click_0_listener() {
      const opt_r33 = \u0275\u0275restoreView(_r32).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectVoucherType(opt_r33.value));
    });
    \u0275\u0275elementStart(1, "div", 108)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 109)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, OperationTypesComponent_Conditional_36_Conditional_15_For_9_Conditional_9_Template, 2, 0, "span", 110);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r33 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("--type-color", opt_r33.color);
    \u0275\u0275classProp("selected", ctx_r1.wiz().voucherType === opt_r33.value);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", opt_r33.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r33.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(opt_r33.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(opt_r33.desc);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wiz().voucherType === opt_r33.value ? 9 : -1);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "h3", 102)(2, "span", 4);
    \u0275\u0275text(3, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 103);
    \u0275\u0275text(6, "\u0627\u062E\u062A\u0631 \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0642\u0627\u0644\u0628 - \u0647\u0644 \u0647\u0648 \u0633\u0646\u062F \u0642\u0628\u0636\u060C \u0633\u0646\u062F \u0635\u0631\u0641\u060C \u0623\u0648 \u0642\u064A\u062F \u0645\u062D\u0627\u0633\u0628\u064A\u061F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 105);
    \u0275\u0275repeaterCreate(8, OperationTypesComponent_Conditional_36_Conditional_15_For_9_Template, 10, 10, "div", 111, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.operationTypeOptions);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_16_For_9_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 116);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_36_Conditional_16_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 114);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_16_For_9_Template_div_click_0_listener() {
      const pm_r35 = \u0275\u0275restoreView(_r34).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectPaymentMethod(pm_r35.value));
    });
    \u0275\u0275elementStart(1, "div", 115)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, OperationTypesComponent_Conditional_36_Conditional_16_For_9_Conditional_8_Template, 2, 0, "span", 116);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pm_r35 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r1.wiz().paymentMethod === pm_r35.value);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(pm_r35.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(pm_r35.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(pm_r35.desc);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wiz().paymentMethod === pm_r35.value ? 8 : -1);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "h3", 102)(2, "span", 4);
    \u0275\u0275text(3, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 103);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 112);
    \u0275\u0275repeaterCreate(8, OperationTypesComponent_Conditional_36_Conditional_16_For_9_Template, 9, 6, "div", 113, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u0648\u0633\u064A\u0644\u0629 ", ctx_r1.wiz().voucherType === "receipt" ? "\u0627\u0644\u0642\u0628\u0636" : "\u0627\u0644\u0635\u0631\u0641", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0643\u064A\u0641 \u064A\u062A\u0645 ", ctx_r1.wiz().voucherType === "receipt" ? "\u0627\u0633\u062A\u0644\u0627\u0645" : "\u0635\u0631\u0641", " \u0627\u0644\u0623\u0645\u0648\u0627\u0644\u061F");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.paymentMethods);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_17_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 104)(1, "span", 4);
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u0644\u0627 \u062A\u0648\u062C\u062F ", ctx_r1.wiz().paymentMethod === "cash" ? "\u0635\u0646\u0627\u062F\u064A\u0642" : "\u062D\u0633\u0627\u0628\u0627\u062A", " \u0645\u062A\u0627\u062D\u0629. \u0623\u0636\u0641\u0647\u0627 \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629. ");
  }
}
function OperationTypesComponent_Conditional_36_Conditional_17_Conditional_16_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 123);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const src_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(src_r37.subInfo);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_17_Conditional_16_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 124);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const src_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(src_r37.stationName);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_17_Conditional_16_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 125);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_36_Conditional_17_Conditional_16_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 120);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_17_Conditional_16_For_2_Template_div_click_0_listener() {
      const src_r37 = \u0275\u0275restoreView(_r36).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectSource(src_r37));
    });
    \u0275\u0275elementStart(1, "div", 121)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 122)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, OperationTypesComponent_Conditional_36_Conditional_17_Conditional_16_For_2_Conditional_7_Template, 2, 1, "span", 123);
    \u0275\u0275conditionalCreate(8, OperationTypesComponent_Conditional_36_Conditional_17_Conditional_16_For_2_Conditional_8_Template, 2, 1, "span", 124);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, OperationTypesComponent_Conditional_36_Conditional_17_Conditional_16_For_2_Conditional_9_Template, 2, 0, "span", 125);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const src_r37 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("selected", ctx_r1.isSourceSelected(src_r37));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(src_r37.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(src_r37.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(src_r37.subInfo ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(src_r37.stationName ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSourceSelected(src_r37) ? 9 : -1);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_17_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 118);
    \u0275\u0275repeaterCreate(1, OperationTypesComponent_Conditional_36_Conditional_17_Conditional_16_For_2_Template, 10, 7, "div", 119, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.sourceAccounts());
  }
}
function OperationTypesComponent_Conditional_36_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "h3", 102)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644 (\u0627\u0644\u0645\u0635\u062F\u0631) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 103);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 117)(8, "span", 4);
    \u0275\u0275text(9, "lightbulb");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div")(11, "strong");
    \u0275\u0275text(12, "\u0645\u0627 \u0647\u0648 \u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644\u061F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(15, OperationTypesComponent_Conditional_36_Conditional_17_Conditional_15_Template, 4, 1, "div", 104)(16, OperationTypesComponent_Conditional_36_Conditional_17_Conditional_16_Template, 3, 0, "div", 118);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getPaymentMethodIcon());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" \u0627\u062E\u062A\u0631 ", ctx_r1.wiz().paymentMethod === "cash" ? "\u0627\u0644\u0635\u0646\u062F\u0648\u0642" : ctx_r1.wiz().paymentMethod === "bank" ? "\u0627\u0644\u0628\u0646\u0643" : ctx_r1.wiz().paymentMethod === "exchange" ? "\u0627\u0644\u0635\u0631\u0627\u0641" : "\u0627\u0644\u0645\u062D\u0641\u0638\u0629", " \u0627\u0644\u0630\u064A ", ctx_r1.wiz().voucherType === "receipt" ? "\u064A\u0633\u062A\u0642\u0628\u0644" : "\u064A\u0635\u0631\u0641 \u0645\u0646", "\u0647 \u0627\u0644\u0645\u0628\u0644\u063A ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("\u0647\u0648 ", ctx_r1.wiz().paymentMethod === "cash" ? "\u0627\u0644\u0635\u0646\u062F\u0648\u0642" : ctx_r1.wiz().paymentMethod === "bank" ? "\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0628\u0646\u0643\u064A" : ctx_r1.wiz().paymentMethod === "exchange" ? "\u062D\u0633\u0627\u0628 \u0627\u0644\u0635\u0631\u0627\u0641" : "\u0627\u0644\u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629", ' \u0627\u0644\u0630\u064A \u064A\u0646\u0641\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629. \u0645\u062B\u0644\u0627\u064B: "\u0635\u0646\u062F\u0648\u0642 \u0645\u062D\u0637\u0629 \u0627\u0644\u062F\u0647\u0645\u064A\u0629" \u0623\u0648 "\u0628\u0646\u0643 \u0627\u0644\u0623\u0647\u0644\u064A".');
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.sourceAccounts().length === 0 ? 15 : 16);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_18_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0630\u064A \u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0648\u0631\u064A\u062F \u0625\u0644\u064A\u0647 ");
  }
}
function OperationTypesComponent_Conditional_36_Conditional_18_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0630\u064A \u0633\u064A\u062A\u0645 \u0627\u0644\u0635\u0631\u0641 \u0645\u0646\u0647 ");
  }
}
function OperationTypesComponent_Conditional_36_Conditional_18_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0645\u0635\u062F\u0631 \u0644\u0644\u062A\u062D\u0648\u064A\u0644 ");
  }
}
function OperationTypesComponent_Conditional_36_Conditional_18_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0644\u0647\u0630\u0627 \u0627\u0644\u0642\u0627\u0644\u0628 ");
  }
}
function OperationTypesComponent_Conditional_36_Conditional_18_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 104)(1, "span", 4);
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0632\u0646 \u0645\u062A\u0627\u062D\u0629. \u0623\u0636\u0641 \u0645\u062E\u0627\u0632\u0646 \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u062E\u0627\u0632\u0646. ");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_36_Conditional_18_Conditional_19_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 123);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wh_r39 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(wh_r39.compositeCode);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_18_Conditional_19_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 124);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wh_r39 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(wh_r39.location);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_18_Conditional_19_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 125);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_36_Conditional_18_Conditional_19_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 120);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_18_Conditional_19_For_2_Template_div_click_0_listener() {
      const wh_r39 = \u0275\u0275restoreView(_r38).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectWarehouse(wh_r39));
    });
    \u0275\u0275elementStart(1, "div", 126)(2, "span", 4);
    \u0275\u0275text(3, "warehouse");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 122)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, OperationTypesComponent_Conditional_36_Conditional_18_Conditional_19_For_2_Conditional_7_Template, 2, 1, "span", 123);
    \u0275\u0275conditionalCreate(8, OperationTypesComponent_Conditional_36_Conditional_18_Conditional_19_For_2_Conditional_8_Template, 2, 1, "span", 124);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, OperationTypesComponent_Conditional_36_Conditional_18_Conditional_19_For_2_Conditional_9_Template, 2, 0, "span", 125);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wh_r39 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("selected", ctx_r1.wiz().sourceWarehouseId === wh_r39.id);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(wh_r39.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(wh_r39.compositeCode ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(wh_r39.location ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wiz().sourceWarehouseId === wh_r39.id ? 9 : -1);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_18_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 118);
    \u0275\u0275repeaterCreate(1, OperationTypesComponent_Conditional_36_Conditional_18_Conditional_19_For_2_Template, 10, 6, "div", 119, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.sourceWarehouses());
  }
}
function OperationTypesComponent_Conditional_36_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "h3", 102)(2, "span", 4);
    \u0275\u0275text(3, "warehouse");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 103);
    \u0275\u0275conditionalCreate(6, OperationTypesComponent_Conditional_36_Conditional_18_Conditional_6_Template, 1, 0)(7, OperationTypesComponent_Conditional_36_Conditional_18_Conditional_7_Template, 1, 0)(8, OperationTypesComponent_Conditional_36_Conditional_18_Conditional_8_Template, 1, 0)(9, OperationTypesComponent_Conditional_36_Conditional_18_Conditional_9_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 117)(11, "span", 4);
    \u0275\u0275text(12, "lightbulb");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "strong");
    \u0275\u0275text(15, "\u0645\u0627 \u0647\u0648 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u061F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p");
    \u0275\u0275text(17, "\u0647\u0648 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0630\u064A \u0633\u064A\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0647\u0630\u0627 \u0627\u0644\u0642\u0627\u0644\u0628. \u064A\u0645\u0643\u0646 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u062A\u063A\u064A\u064A\u0631\u0647 \u0639\u0646\u062F \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(18, OperationTypesComponent_Conditional_36_Conditional_18_Conditional_18_Template, 4, 0, "div", 104)(19, OperationTypesComponent_Conditional_36_Conditional_18_Conditional_19_Template, 3, 0, "div", 118);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.wiz().voucherType === "supply_invoice" || ctx_r1.wiz().voucherType === "supply_order" ? 6 : ctx_r1.wiz().voucherType === "dispatch" ? 7 : ctx_r1.wiz().voucherType === "transfer_out" ? 8 : 9);
    \u0275\u0275advance(12);
    \u0275\u0275conditional(ctx_r1.sourceWarehouses().length === 0 ? 18 : 19);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_19_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0648\u0627\u0644\u062F\u0627\u0626\u0646\u0629 \u0645\u0646 \u062F\u0644\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A ");
  }
}
function OperationTypesComponent_Conditional_36_Conditional_19_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0629 \u0627\u0644\u062A\u064A ", ctx_r1.wiz().voucherType === "receipt" ? "\u064A\u064F\u0642\u0628\u0636 \u0645\u0646\u0647\u0627" : "\u064A\u064F\u0635\u0631\u0641 \u0644\u0647\u0627", " ");
  }
}
function OperationTypesComponent_Conditional_36_Conditional_19_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 127)(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0627\u0644\u0645\u0635\u062F\u0631: ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getPaymentMethodIcon());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedSourceName());
  }
}
function OperationTypesComponent_Conditional_36_Conditional_19_Conditional_9_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 137);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_19_Conditional_9_For_11_Template_button_click_0_listener() {
      const at_r43 = \u0275\u0275restoreView(_r42).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectedAccountType.set(at_r43));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 138);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const at_r43 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", ctx_r1.selectedAccountType() === at_r43);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.accountTypeIcons[at_r43] || "label");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getAccountTypeLabel(at_r43), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.countAccountsByType(at_r43));
  }
}
function OperationTypesComponent_Conditional_36_Conditional_19_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 128)(1, "label", 75);
    \u0275\u0275text(2, "\u0641\u0644\u062A\u0631 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 136)(4, "button", 137);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_19_Conditional_9_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectedAccountType.set(""));
    });
    \u0275\u0275elementStart(5, "span", 4);
    \u0275\u0275text(6, "apps");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " \u0627\u0644\u0643\u0644 ");
    \u0275\u0275elementStart(8, "span", 138);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(10, OperationTypesComponent_Conditional_36_Conditional_19_Conditional_9_For_11_Template, 6, 5, "button", 139, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r1.selectedAccountType() === "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.availableAccounts().length);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.availableAccountTypes());
  }
}
function OperationTypesComponent_Conditional_36_Conditional_19_For_20_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 144);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const acc_r45 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(acc_r45.provider || acc_r45.accountNumber);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_19_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 140);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_19_For_20_Template_div_click_0_listener() {
      const acc_r45 = \u0275\u0275restoreView(_r44).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleLinkedAccount(acc_r45));
    });
    \u0275\u0275elementStart(1, "span", 141);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 142)(4, "span", 143);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, OperationTypesComponent_Conditional_36_Conditional_19_For_20_Conditional_6_Template, 2, 1, "span", 144);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 145)(8, "span", 4);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const acc_r45 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r1.linkedAccountIds().has(acc_r45.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.linkedAccountIds().has(acc_r45.id) ? "check_box" : "check_box_outline_blank", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(acc_r45.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(acc_r45.provider || acc_r45.accountNumber ? 6 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.accountTypeIcons[acc_r45.accountType] || "label");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getAccountTypeLabel(acc_r45.accountType), " ");
  }
}
function OperationTypesComponent_Conditional_36_Conditional_19_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 134)(1, "span", 4);
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062A\u0627\u062D\u0629. \u0623\u0636\u0641 \u062D\u0633\u0627\u0628\u0627\u062A \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u0635\u0641\u062D\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A. ");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_36_Conditional_19_Conditional_22_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 147)(1, "span", 148);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 149);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 150);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_19_Conditional_22_For_7_Template_button_click_5_listener() {
      const la_r47 = \u0275\u0275restoreView(_r46).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.removeLinkedAccount(la_r47.accountId));
    });
    \u0275\u0275elementStart(6, "span", 4);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const la_r47 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getAccountTypeLabel(la_r47.accountType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(la_r47.accountName);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_19_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 135)(1, "h4")(2, "span", 4);
    \u0275\u0275text(3, "link");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 146);
    \u0275\u0275repeaterCreate(6, OperationTypesComponent_Conditional_36_Conditional_19_Conditional_22_For_7_Template, 8, 2, "div", 147, _forTrack5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629 (", ctx_r1.wiz().linkedAccounts.length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.wiz().linkedAccounts);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 93)(1, "h3", 102)(2, "span", 4);
    \u0275\u0275text(3, "group");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 103);
    \u0275\u0275conditionalCreate(6, OperationTypesComponent_Conditional_36_Conditional_19_Conditional_6_Template, 1, 0)(7, OperationTypesComponent_Conditional_36_Conditional_19_Conditional_7_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, OperationTypesComponent_Conditional_36_Conditional_19_Conditional_8_Template, 7, 2, "div", 127);
    \u0275\u0275conditionalCreate(9, OperationTypesComponent_Conditional_36_Conditional_19_Conditional_9_Template, 12, 3, "div", 128);
    \u0275\u0275elementStart(10, "div", 129)(11, "div", 130)(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 131);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_19_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r40);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectAllAccounts());
    });
    \u0275\u0275elementStart(15, "span", 4);
    \u0275\u0275text(16, "select_all");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 132);
    \u0275\u0275repeaterCreate(19, OperationTypesComponent_Conditional_36_Conditional_19_For_20_Template, 11, 7, "div", 133, _forTrack3);
    \u0275\u0275conditionalCreate(21, OperationTypesComponent_Conditional_36_Conditional_19_Conditional_21_Template, 4, 0, "div", 134);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(22, OperationTypesComponent_Conditional_36_Conditional_19_Conditional_22_Template, 8, 1, "div", 135);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.wiz().voucherType === "journal" ? "\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0642\u064A\u062F" : "\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u062B\u0627\u0646\u064A (\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629)", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.wiz().voucherType === "journal" ? 6 : 7);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.wiz().voucherType !== "journal" && ctx_r1.selectedSourceName() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.availableAccountTypes().length > 0 ? 9 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629 (", ctx_r1.filteredAccountsByType().length, ")");
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.filteredAccountsByType());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.filteredAccountsByType().length === 0 ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wiz().linkedAccounts.length > 0 ? 22 : -1);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_For_5_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 172);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_For_5_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r50);
      const state_r51 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.removeWorkflowState(state_r51));
    });
    \u0275\u0275elementStart(1, "span", 173);
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 170)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_For_5_Conditional_3_Template, 3, 0, "button", 171);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const state_r51 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275styleProp("background", ctx_r1.getStateColor(state_r51) + "18")("color", ctx_r1.getStateColor(state_r51));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getStateLabel(state_r51));
    \u0275\u0275advance();
    \u0275\u0275conditional(state_r51 !== "draft" ? 3 : -1);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 163);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const state_r52 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("value", state_r52);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStateLabel(state_r52));
  }
}
function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Conditional_20_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 174)(1, "span", 175);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 176);
    \u0275\u0275text(4, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 175);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 177);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 178);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Conditional_20_For_2_Template_button_click_9_listener() {
      const $index_r54 = \u0275\u0275restoreView(_r53).$index;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.removeWorkflowTransition($index_r54));
    });
    \u0275\u0275elementStart(10, "span", 161);
    \u0275\u0275text(11, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tr_r55 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r1.getStateColor(tr_r55.fromState) + "18")("color", ctx_r1.getStateColor(tr_r55.fromState));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStateLabel(tr_r55.fromState), " ");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", ctx_r1.getStateColor(tr_r55.toState) + "18")("color", ctx_r1.getStateColor(tr_r55.toState));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStateLabel(tr_r55.toState), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", tr_r55.actionName, ")");
  }
}
function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 164);
    \u0275\u0275repeaterCreate(1, OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Conditional_20_For_2_Template, 12, 11, "div", 174, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.wiz().workflowTransitions);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 163);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const state_r56 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("value", state_r56);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStateLabel(state_r56));
  }
}
function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_For_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 163);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const state_r57 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("value", state_r57);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStateLabel(state_r57));
  }
}
function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "label", 75);
    \u0275\u0275text(2, "\u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 156);
    \u0275\u0275repeaterCreate(4, OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_For_5_Template, 4, 6, "div", 157, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 158)(7, "input", 159);
    \u0275\u0275listener("input", function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Template_input_input_7_listener($event) {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.newWfState.set($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 160);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.addWorkflowState());
    });
    \u0275\u0275elementStart(9, "span", 161);
    \u0275\u0275text(10, "add");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "div", 74)(12, "label", 75);
    \u0275\u0275text(13, "\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "select", 162);
    \u0275\u0275listener("change", function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Template_select_change_14_listener($event) {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setWizField("workflowInitialState", $event.target.value));
    });
    \u0275\u0275repeaterCreate(15, OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_For_16_Template, 2, 2, "option", 163, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 74)(18, "label", 75);
    \u0275\u0275text(19, "\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644\u0627\u062A (\u0645\u0646 \u062D\u0627\u0644\u0629 \u0625\u0644\u0649 \u062D\u0627\u0644\u0629)");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Conditional_20_Template, 3, 0, "div", 164);
    \u0275\u0275elementStart(21, "div", 165)(22, "div")(23, "label", 166);
    \u0275\u0275text(24, "\u0645\u0646 \u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "select", 162);
    \u0275\u0275listener("change", function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Template_select_change_25_listener($event) {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.newTrFrom.set($event.target.value));
    });
    \u0275\u0275elementStart(26, "option", 167);
    \u0275\u0275text(27, "\u0627\u062E\u062A\u0631...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(28, OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_For_29_Template, 2, 2, "option", 163, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div")(31, "label", 166);
    \u0275\u0275text(32, "\u0625\u0644\u0649 \u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "select", 162);
    \u0275\u0275listener("change", function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Template_select_change_33_listener($event) {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.newTrTo.set($event.target.value));
    });
    \u0275\u0275elementStart(34, "option", 167);
    \u0275\u0275text(35, "\u0627\u062E\u062A\u0631...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(36, OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_For_37_Template, 2, 2, "option", 163, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div")(39, "label", 166);
    \u0275\u0275text(40, "\u0627\u0633\u0645 \u0627\u0644\u0625\u062C\u0631\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 168);
    \u0275\u0275listener("input", function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Template_input_input_41_listener($event) {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.newTrAction.set($event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "button", 169);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.addWorkflowTransition());
    });
    \u0275\u0275elementStart(43, "span", 161);
    \u0275\u0275text(44, "add");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.wiz().workflowStates);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.newWfState());
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r1.wiz().workflowInitialState);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.wiz().workflowStates);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.wiz().workflowTransitions.length > 0 ? 20 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.newTrFrom());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.wiz().workflowStates);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.newTrTo());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.wiz().workflowStates);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.newTrAction());
  }
}
function OperationTypesComponent_Conditional_36_Conditional_20_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 155)(1, "span", 179);
    \u0275\u0275text(2, "route");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A: \u0645\u0633\u0648\u062F\u0629 \u2192 \u0645\u0639\u062A\u0645\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 180);
    \u0275\u0275text(6, "\u0641\u0639\u0651\u0644 \u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062E\u0635\u0635 \u0644\u0625\u0636\u0627\u0641\u0629 \u062D\u0627\u0644\u0627\u062A \u0648\u0627\u0646\u062A\u0642\u0627\u0644\u0627\u062A \u0645\u062E\u0635\u0635\u0629");
    \u0275\u0275elementEnd()();
  }
}
function OperationTypesComponent_Conditional_36_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 93)(1, "h3", 102)(2, "span", 4);
    \u0275\u0275text(3, "route");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 103);
    \u0275\u0275text(6, "\u062D\u062F\u062F \u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0633\u0646\u062F \u0648\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644\u0627\u062A \u0628\u064A\u0646\u0647\u0627. \u0625\u0630\u0627 \u0644\u0645 \u062A\u0641\u0639\u0651\u0644 \u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644\u060C \u0633\u064A\u0639\u0645\u0644 \u0627\u0644\u0633\u0646\u062F \u0628\u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 (\u0645\u0633\u0648\u062F\u0629 \u2192 \u0645\u0639\u062A\u0645\u062F).");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 151)(8, "label", 152)(9, "span");
    \u0275\u0275text(10, "\u062A\u0641\u0639\u064A\u0644 \u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062E\u0635\u0635");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 153);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_20_Template_div_click_11_listener() {
      \u0275\u0275restoreView(_r48);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setWizField("workflowEnabled", !ctx_r1.wiz().workflowEnabled));
    });
    \u0275\u0275element(12, "div", 154);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(13, OperationTypesComponent_Conditional_36_Conditional_20_Conditional_13_Template, 45, 6)(14, OperationTypesComponent_Conditional_36_Conditional_20_Conditional_14_Template, 7, 0, "div", 155);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275classProp("on", ctx_r1.wiz().workflowEnabled);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.wiz().workflowEnabled ? 13 : 14);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_21_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 183)(1, "span", 4);
    \u0275\u0275text(2, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0627\u0644\u0648\u0633\u064A\u0644\u0629: ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.getPaymentMethodLabel(ctx_r1.wiz().paymentMethod));
  }
}
function OperationTypesComponent_Conditional_36_Conditional_21_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 183)(1, "span", 4);
    \u0275\u0275text(2, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0627\u0644\u0645\u0635\u062F\u0631: ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.selectedSourceName());
  }
}
function OperationTypesComponent_Conditional_36_Conditional_21_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 183)(1, "span", 4);
    \u0275\u0275text(2, "warehouse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0627\u0644\u0645\u062E\u0632\u0646: ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.getWarehouseName(ctx_r1.wiz().sourceWarehouseId));
  }
}
function OperationTypesComponent_Conditional_36_Conditional_21_For_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 85);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_21_For_52_Template_button_click_0_listener() {
      const ic_r60 = \u0275\u0275restoreView(_r59).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setWizField("icon", ic_r60));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ic_r60 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r1.wiz().icon === ic_r60);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ic_r60);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_21_For_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 86);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_21_For_58_Template_button_click_0_listener() {
      const c_r62 = \u0275\u0275restoreView(_r61).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setWizField("color", c_r62));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r62 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("background", c_r62);
    \u0275\u0275classProp("selected", ctx_r1.wiz().color === c_r62);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 93)(1, "h3", 102)(2, "span", 4);
    \u0275\u0275text(3, "badge");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u0633\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 103);
    \u0275\u0275text(6, "\u0633\u0645\u0651\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u0627\u062E\u062A\u0631 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 \u0648\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 181)(8, "span", 4);
    \u0275\u0275text(9, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \u0627\u0644\u0631\u0645\u0632 \u0648\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A \u064A\u064F\u0648\u0644\u0651\u064E\u062F\u0627\u0646 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0633\u0628 \u0627\u0644\u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 182)(12, "div", 183)(13, "span", 4);
    \u0275\u0275text(14, "folder");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641: ");
    \u0275\u0275elementStart(17, "strong");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 183)(20, "span", 4);
    \u0275\u0275text(21, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23, "\u0627\u0644\u0646\u0648\u0639: ");
    \u0275\u0275elementStart(24, "strong");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(26, OperationTypesComponent_Conditional_36_Conditional_21_Conditional_26_Template, 7, 1, "div", 183);
    \u0275\u0275conditionalCreate(27, OperationTypesComponent_Conditional_36_Conditional_21_Conditional_27_Template, 7, 1, "div", 183);
    \u0275\u0275conditionalCreate(28, OperationTypesComponent_Conditional_36_Conditional_21_Conditional_28_Template, 7, 1, "div", 183);
    \u0275\u0275elementStart(29, "div", 183)(30, "span", 4);
    \u0275\u0275text(31, "group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33, "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A: ");
    \u0275\u0275elementStart(34, "strong");
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(36, "div", 74)(37, "label", 75);
    \u0275\u0275text(38, "\u0627\u0633\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 ");
    \u0275\u0275elementStart(39, "span", 76);
    \u0275\u0275text(40, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "input", 184);
    \u0275\u0275listener("input", function OperationTypesComponent_Conditional_36_Conditional_21_Template_input_input_41_listener($event) {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setWizField("name", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 74)(43, "label", 75);
    \u0275\u0275text(44, "\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "textarea", 185);
    \u0275\u0275listener("input", function OperationTypesComponent_Conditional_36_Conditional_21_Template_textarea_input_45_listener($event) {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setWizField("description", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 186)(47, "div", 74)(48, "label", 75);
    \u0275\u0275text(49, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 78);
    \u0275\u0275repeaterCreate(51, OperationTypesComponent_Conditional_36_Conditional_21_For_52_Template, 3, 3, "button", 79, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 74)(54, "label", 75);
    \u0275\u0275text(55, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "div", 80);
    \u0275\u0275repeaterCreate(57, OperationTypesComponent_Conditional_36_Conditional_21_For_58_Template, 1, 4, "button", 81, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 187)(60, "label", 188)(61, "span");
    \u0275\u0275text(62, "\u064A\u062A\u0637\u0644\u0628 \u0645\u0631\u0641\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 153);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_21_Template_div_click_63_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setWizField("requiresAttachment", !ctx_r1.wiz().requiresAttachment));
    });
    \u0275\u0275element(64, "div", 154);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "label", 188)(66, "span");
    \u0275\u0275text(67, "\u0645\u0641\u0639\u0651\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 153);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_21_Template_div_click_68_listener() {
      \u0275\u0275restoreView(_r58);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setWizField("isActive", !ctx_r1.wiz().isActive));
    });
    \u0275\u0275element(69, "div", 154);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275textInterpolate(ctx_r1.wiz().category);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(((tmp_3_0 = ctx_r1.getVoucherTypeOption(ctx_r1.wiz().voucherType)) == null ? null : tmp_3_0.label) || ctx_r1.getVoucherTypeLabel(ctx_r1.wiz().voucherType));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wiz().paymentMethod ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedSourceName() ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.wiz().sourceWarehouseId ? 28 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", ctx_r1.wiz().linkedAccounts.length, " \u062D\u0633\u0627\u0628");
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.wiz().name);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.wiz().description);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.icons);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.colors);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("on", ctx_r1.wiz().requiresAttachment);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("on", ctx_r1.wiz().isActive);
  }
}
function OperationTypesComponent_Conditional_36_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 83);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r63);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.prevStep());
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0627\u0644\u0633\u0627\u0628\u0642 ");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_36_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div");
  }
}
function OperationTypesComponent_Conditional_36_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r64 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_25_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r64);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nextStep());
    });
    \u0275\u0275text(1, " \u0627\u0644\u062A\u0627\u0644\u064A ");
    \u0275\u0275elementStart(2, "span", 4);
    \u0275\u0275text(3, "arrow_back");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.canGoNext());
  }
}
function OperationTypesComponent_Conditional_36_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r65 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r65);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveWizard());
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.canGoNext() || ctx_r1.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "sync" : "save");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : ctx_r1.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628", " ");
  }
}
function OperationTypesComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showWizard.set(false));
    });
    \u0275\u0275elementStart(1, "div", 87);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 88)(3, "div", 89)(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 72);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_36_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showWizard.set(false));
    });
    \u0275\u0275elementStart(7, "span", 4);
    \u0275\u0275text(8, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 90);
    \u0275\u0275repeaterCreate(10, OperationTypesComponent_Conditional_36_For_11_Template, 6, 7, null, null, _forTrack4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 91);
    \u0275\u0275conditionalCreate(13, OperationTypesComponent_Conditional_36_Conditional_13_Template, 8, 1, "div", 92);
    \u0275\u0275conditionalCreate(14, OperationTypesComponent_Conditional_36_Conditional_14_Template, 9, 1, "div", 93);
    \u0275\u0275conditionalCreate(15, OperationTypesComponent_Conditional_36_Conditional_15_Template, 10, 0, "div", 93);
    \u0275\u0275conditionalCreate(16, OperationTypesComponent_Conditional_36_Conditional_16_Template, 10, 2, "div", 93);
    \u0275\u0275conditionalCreate(17, OperationTypesComponent_Conditional_36_Conditional_17_Template, 17, 5, "div", 93);
    \u0275\u0275conditionalCreate(18, OperationTypesComponent_Conditional_36_Conditional_18_Template, 20, 2, "div", 93);
    \u0275\u0275conditionalCreate(19, OperationTypesComponent_Conditional_36_Conditional_19_Template, 23, 7, "div", 93);
    \u0275\u0275conditionalCreate(20, OperationTypesComponent_Conditional_36_Conditional_20_Template, 15, 3, "div", 93);
    \u0275\u0275conditionalCreate(21, OperationTypesComponent_Conditional_36_Conditional_21_Template, 70, 12, "div", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 94);
    \u0275\u0275conditionalCreate(23, OperationTypesComponent_Conditional_36_Conditional_23_Template, 4, 0, "button", 95)(24, OperationTypesComponent_Conditional_36_Conditional_24_Template, 1, 0, "div");
    \u0275\u0275conditionalCreate(25, OperationTypesComponent_Conditional_36_Conditional_25_Template, 4, 1, "button", 96)(26, OperationTypesComponent_Conditional_36_Conditional_26_Template, 4, 3, "button", 96);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" : "\u0625\u0646\u0634\u0627\u0621 \u0642\u0627\u0644\u0628 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.getStepLabels());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.wizardSystemMessage() ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getContentType() === "category" ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getContentType() === "voucherType" ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getContentType() === "paymentMethod" ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getContentType() === "source" ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getContentType() === "warehouse" ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getContentType() === "accounts" ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getContentType() === "workflow" ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getContentType() === "details" ? 21 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.wizardStep() > 1 ? 23 : 24);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.isLastStep() ? 25 : 26);
  }
}
function OperationTypesComponent_Conditional_37_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 192)(1, "span", 4);
    \u0275\u0275text(2, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0627\u0644\u0645\u0635\u062F\u0631 (\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644): ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.getSourceLabel(ctx_r1.selectedOT()));
  }
}
function OperationTypesComponent_Conditional_37_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 193)(1, "span", 4);
    \u0275\u0275text(2, "link_off");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0631\u062A\u0628\u0637\u0629 ");
    \u0275\u0275elementEnd();
  }
}
function OperationTypesComponent_Conditional_37_Conditional_17_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 195)(1, "span", 196);
    \u0275\u0275text(2, "account_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 197)(4, "div", 198);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 199);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 200);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const la_r67 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(la_r67.label || la_r67.accountName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(la_r67.accountName);
    \u0275\u0275advance();
    \u0275\u0275attribute("data-perm", la_r67.permission);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getPermissionLabel(la_r67.permission), " ");
  }
}
function OperationTypesComponent_Conditional_37_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 194);
    \u0275\u0275repeaterCreate(1, OperationTypesComponent_Conditional_37_Conditional_17_For_2_Template, 10, 4, "div", 195, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.selectedOT().linkedAccounts);
  }
}
function OperationTypesComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r66 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_37_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r66);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAccountsModal.set(false));
    });
    \u0275\u0275elementStart(1, "div", 189);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_37_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 70)(3, "div", 190)(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "h2");
    \u0275\u0275text(8, "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 191);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 72);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_37_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r66);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAccountsModal.set(false));
    });
    \u0275\u0275elementStart(12, "span", 4);
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 73);
    \u0275\u0275conditionalCreate(15, OperationTypesComponent_Conditional_37_Conditional_15_Template, 7, 1, "div", 192);
    \u0275\u0275conditionalCreate(16, OperationTypesComponent_Conditional_37_Conditional_16_Template, 4, 0, "div", 193)(17, OperationTypesComponent_Conditional_37_Conditional_17_Template, 3, 0, "div", 194);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 82)(19, "button", 83);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_37_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r66);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showAccountsModal.set(false));
    });
    \u0275\u0275text(20, "\u0625\u063A\u0644\u0627\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 18);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_37_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r66);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.showAccountsModal.set(false);
      return \u0275\u0275resetView(ctx_r1.openEditWizard(ctx_r1.selectedOT()));
    });
    \u0275\u0275elementStart(22, "span", 4);
    \u0275\u0275text(23, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", ctx_r1.selectedOT().color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedOT().icon);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedOT().name);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.selectedOT().sourceAccountId || ctx_r1.selectedOT().sourceFundId ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.selectedOT().linkedAccounts || ctx_r1.selectedOT().linkedAccounts.length === 0 ? 16 : 17);
  }
}
function OperationTypesComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r68 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_38_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r68);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showHowItWorks.set(false));
    });
    \u0275\u0275elementStart(1, "div", 201);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_38_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 70)(3, "div", 202)(4, "span", 4);
    \u0275\u0275text(5, "help_outline");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7, "\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0627\u0644\u0642\u0648\u0627\u0644\u0628\u061F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 72);
    \u0275\u0275listener("click", function OperationTypesComponent_Conditional_38_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r68);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showHowItWorks.set(false));
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 203)(12, "div", 204)(13, "h3")(14, "span", 4);
    \u0275\u0275text(15, "auto_awesome");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " \u0627\u0644\u0642\u0627\u0644\u0628 = \u0639\u0645\u0644\u064A\u0629 \u0645\u0642\u064A\u062F\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p");
    \u0275\u0275text(18, " \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0633 \u064A\u062E\u062A\u0627\u0631 \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u064A\u0639\u0628\u064A \u0627\u0644\u0645\u0628\u0644\u063A \u0648\u064A\u062D\u0641\u0638. \u0643\u0644 \u0634\u064A \u0645\u062D\u062F\u062F \u0645\u0633\u0628\u0642\u0627\u064B: \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629\u060C \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639\u060C \u0627\u0644\u0645\u0635\u062F\u0631\u060C \u0648\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 204)(20, "h3")(21, "span", 4);
    \u0275\u0275text(22, "format_list_numbered");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, " \u062E\u0637\u0648\u0627\u062A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 205)(25, "div", 206)(26, "span", 207);
    \u0275\u0275text(27, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "strong");
    \u0275\u0275text(29, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(30, " \u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 206)(32, "span", 207);
    \u0275\u0275text(33, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "strong");
    \u0275\u0275text(35, "\u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(36, " \u0633\u0646\u062F \u0642\u0628\u0636 / \u0633\u0646\u062F \u0635\u0631\u0641 / \u0642\u064A\u062F \u0645\u062D\u0627\u0633\u0628\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 206)(38, "span", 207);
    \u0275\u0275text(39, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "strong");
    \u0275\u0275text(41, "\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062F\u0641\u0639:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, " \u0646\u0642\u062F\u0627\u064B / \u0628\u0646\u0643 / \u0635\u0631\u0627\u0641 / \u0645\u062D\u0641\u0638\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 206)(44, "span", 207);
    \u0275\u0275text(45, "4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "strong");
    \u0275\u0275text(47, "\u0627\u0644\u0645\u0635\u062F\u0631 (\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644):");
    \u0275\u0275elementEnd();
    \u0275\u0275text(48, " \u0623\u064A \u0635\u0646\u062F\u0648\u0642 \u0623\u0648 \u0628\u0646\u0643 \u0623\u0648 \u0635\u0631\u0627\u0641 \u0623\u0648 \u0645\u062D\u0641\u0638\u0629 \u0628\u0627\u0644\u062A\u062D\u062F\u064A\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 206)(50, "span", 207);
    \u0275\u0275text(51, "5");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "strong");
    \u0275\u0275text(53, "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A (\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u062B\u0627\u0646\u064A):");
    \u0275\u0275elementEnd();
    \u0275\u0275text(54, " \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0629 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 206)(56, "span", 207);
    \u0275\u0275text(57, "6");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "strong");
    \u0275\u0275text(59, "\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(60, " \u0633\u0645\u0651\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u0627\u062E\u062A\u0631 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 \u0648\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(61, "div", 204)(62, "h3")(63, "span", 4);
    \u0275\u0275text(64, "rule");
    \u0275\u0275elementEnd();
    \u0275\u0275text(65, " \u0642\u0648\u0627\u0639\u062F \u0645\u0647\u0645\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "p")(67, "strong");
    \u0275\u0275text(68, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0623\u0648\u0644\u0627\u064B:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(69, ' \u0623\u0646\u0634\u0626 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0645\u0646 \u062A\u0628\u0648\u064A\u0628 "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A" \u0642\u0628\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0648\u0627\u0644\u0628.');
    \u0275\u0275element(70, "br");
    \u0275\u0275elementStart(71, "strong");
    \u0275\u0275text(72, "\u0633\u0646\u062F \u0642\u0628\u0636/\u0635\u0631\u0641:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(73, " \u0627\u062E\u062A\u0631 \u0627\u0644\u0648\u0633\u064A\u0644\u0629 \u2192 \u0627\u0644\u0645\u0635\u062F\u0631 (\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644) \u2192 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A (\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u062B\u0627\u0646\u064A).");
    \u0275\u0275element(74, "br");
    \u0275\u0275elementStart(75, "strong");
    \u0275\u0275text(76, "\u0642\u064A\u062F \u0645\u062D\u0627\u0633\u0628\u064A:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(77, " \u062A\u0638\u0647\u0631 \u062D\u0633\u0627\u0628\u0627\u062A \u062F\u0644\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0628\u0627\u0634\u0631\u0629 (\u0628\u062F\u0648\u0646 \u0635\u0646\u0627\u062F\u064A\u0642 \u0623\u0648 \u0628\u0646\u0648\u0643).");
    \u0275\u0275element(78, "br");
    \u0275\u0275elementStart(79, "strong");
    \u0275\u0275text(80, "\u0639\u0645\u0644\u064A\u0629 \u0645\u062E\u0632\u0646\u064A\u0629:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(81, " \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u2192 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A). ");
    \u0275\u0275elementEnd()()()()();
  }
}
var OperationTypesComponent = class _OperationTypesComponent extends BasePageComponent {
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
  success = signal("", ...ngDevMode ? [{ debugName: "success" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== التبويب الرئيسي =====================
  // 'categories' = إدارة التصنيفات | 'templates' = القوالب
  activeTab = signal("templates", ...ngDevMode ? [{ debugName: "activeTab" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Data =====================
  operationTypes = signal([], ...ngDevMode ? [{ debugName: "operationTypes" }] : (
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
  categories = signal([], ...ngDevMode ? [{ debugName: "categories" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== UI State =====================
  showHowItWorks = signal(false, ...ngDevMode ? [{ debugName: "showHowItWorks" }] : (
    /* istanbul ignore next */
    []
  ));
  showWizard = signal(false, ...ngDevMode ? [{ debugName: "showWizard" }] : (
    /* istanbul ignore next */
    []
  ));
  editingId = signal(null, ...ngDevMode ? [{ debugName: "editingId" }] : (
    /* istanbul ignore next */
    []
  ));
  activeCategory = signal("all", ...ngDevMode ? [{ debugName: "activeCategory" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedOT = signal(null, ...ngDevMode ? [{ debugName: "selectedOT" }] : (
    /* istanbul ignore next */
    []
  ));
  showAccountsModal = signal(false, ...ngDevMode ? [{ debugName: "showAccountsModal" }] : (
    /* istanbul ignore next */
    []
  ));
  showStatsView = signal(false, ...ngDevMode ? [{ debugName: "showStatsView" }] : (
    /* istanbul ignore next */
    []
  ));
  operationStats = signal([], ...ngDevMode ? [{ debugName: "operationStats" }] : (
    /* istanbul ignore next */
    []
  ));
  searchQuery = signal("", ...ngDevMode ? [{ debugName: "searchQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  nameCheckResult = signal(null, ...ngDevMode ? [{ debugName: "nameCheckResult" }] : (
    /* istanbul ignore next */
    []
  ));
  nameCheckTimeout = null;
  // ===================== إدارة التصنيفات (تبويب مستقل) =====================
  showCategoryForm = signal(false, ...ngDevMode ? [{ debugName: "showCategoryForm" }] : (
    /* istanbul ignore next */
    []
  ));
  newCategoryName = signal("", ...ngDevMode ? [{ debugName: "newCategoryName" }] : (
    /* istanbul ignore next */
    []
  ));
  newCategoryIcon = signal("label", ...ngDevMode ? [{ debugName: "newCategoryIcon" }] : (
    /* istanbul ignore next */
    []
  ));
  newCategoryColor = signal("#3b82f6", ...ngDevMode ? [{ debugName: "newCategoryColor" }] : (
    /* istanbul ignore next */
    []
  ));
  editingCategoryOld = signal(null, ...ngDevMode ? [{ debugName: "editingCategoryOld" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Wizard State =====================
  wizardStep = signal(1, ...ngDevMode ? [{ debugName: "wizardStep" }] : (
    /* istanbul ignore next */
    []
  ));
  wizardSystemMessage = signal("", ...ngDevMode ? [{ debugName: "wizardSystemMessage" }] : (
    /* istanbul ignore next */
    []
  ));
  wiz = signal({
    name: "",
    description: "",
    icon: "receipt_long",
    color: "#3b82f6",
    categoryId: null,
    category: "",
    voucherType: "",
    paymentMethod: "",
    sourceAccountId: null,
    sourceFundId: null,
    sourceWarehouseId: null,
    linkedAccounts: [],
    screens: [],
    requiresAttachment: false,
    hasMultiLines: true,
    isActive: true,
    sortOrder: 0,
    workflowEnabled: false,
    workflowStates: ["draft", "confirmed"],
    workflowInitialState: "draft",
    workflowTransitions: []
  }, ...ngDevMode ? [{ debugName: "wiz" }] : (
    /* istanbul ignore next */
    []
  ));
  newWfState = signal("", ...ngDevMode ? [{ debugName: "newWfState" }] : (
    /* istanbul ignore next */
    []
  ));
  newTrFrom = signal("", ...ngDevMode ? [{ debugName: "newTrFrom" }] : (
    /* istanbul ignore next */
    []
  ));
  newTrTo = signal("", ...ngDevMode ? [{ debugName: "newTrTo" }] : (
    /* istanbul ignore next */
    []
  ));
  newTrAction = signal("", ...ngDevMode ? [{ debugName: "newTrAction" }] : (
    /* istanbul ignore next */
    []
  ));
  roles = signal([], ...ngDevMode ? [{ debugName: "roles" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedAccountType = signal("", ...ngDevMode ? [{ debugName: "selectedAccountType" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Computed: التصنيفات =====================
  dynamicCategories = computed(() => {
    return this.categories().map((c) => {
      const id = Number(c.id);
      return {
        id,
        name: c.name || `\u062A\u0635\u0646\u064A\u0641 ${id}`,
        icon: c.icon || "label",
        color: c.color || "#3b82f6",
        count: this.operationTypes().filter((ot) => Number(ot.categoryId) === id).length
      };
    });
  }, ...ngDevMode ? [{ debugName: "dynamicCategories" }] : (
    /* istanbul ignore next */
    []
  ));
  categoryDetails = computed(() => {
    return this.categories().map((cat) => {
      const catId = Number(cat.id);
      const templates = this.operationTypes().filter((ot) => Number(ot.categoryId) === catId);
      return {
        id: catId,
        name: cat.name,
        count: templates.length,
        icon: cat.icon || "label",
        color: cat.color || "#3b82f6",
        sequenceNumber: cat.sequenceNumber || null,
        code: cat.code || null
      };
    });
  }, ...ngDevMode ? [{ debugName: "categoryDetails" }] : (
    /* istanbul ignore next */
    []
  ));
  categoryFilters = computed(() => {
    const filters = [{ value: "all", label: "\u0627\u0644\u0643\u0644", icon: "apps" }];
    for (const cat of this.categories()) {
      filters.push({ value: String(cat.id), label: cat.name, icon: cat.icon || "label" });
    }
    return filters;
  }, ...ngDevMode ? [{ debugName: "categoryFilters" }] : (
    /* istanbul ignore next */
    []
  ));
  operationTypeOptions = [
    { value: "receipt", label: "\u0633\u0646\u062F \u0642\u0628\u0636", icon: "call_received", desc: "\u0627\u0633\u062A\u0644\u0627\u0645 \u0623\u0645\u0648\u0627\u0644", color: "#10b981", group: "\u0645\u0627\u0644\u064A\u0629" },
    { value: "payment", label: "\u0633\u0646\u062F \u0635\u0631\u0641", icon: "call_made", desc: "\u0635\u0631\u0641 \u0623\u0645\u0648\u0627\u0644", color: "#ef4444", group: "\u0645\u0627\u0644\u064A\u0629" },
    { value: "journal", label: "\u0642\u064A\u062F \u0645\u062D\u0627\u0633\u0628\u064A", icon: "book", desc: "\u062A\u062D\u0648\u064A\u0644 \u0628\u064A\u0646 \u062D\u0633\u0627\u0628\u0627\u062A \u0628\u062F\u0648\u0646 \u0635\u0646\u062F\u0648\u0642", color: "#f59e0b", group: "\u0645\u0627\u0644\u064A\u0629" },
    { value: "supply_invoice", label: "\u062A\u0648\u0631\u064A\u062F \u0645\u062E\u0632\u0646\u064A - \u0641\u0627\u062A\u0648\u0631\u0629", icon: "local_shipping", desc: "\u0625\u062F\u062E\u0627\u0644 \u0623\u0635\u0646\u0627\u0641 \u0645\u0646 \u0641\u0627\u062A\u0648\u0631\u0629 \u0645\u0634\u062A\u0631\u064A\u0627\u062A", color: "#06b6d4", group: "\u0645\u062E\u0632\u0646\u064A\u0629" },
    { value: "supply_order", label: "\u062A\u0648\u0631\u064A\u062F \u0645\u062E\u0632\u0646\u064A - \u0623\u0645\u0631 \u062A\u0648\u0631\u064A\u062F", icon: "move_to_inbox", desc: "\u0625\u062F\u062E\u0627\u0644 \u0623\u0635\u0646\u0627\u0641 \u0628\u0623\u0645\u0631 \u062A\u0648\u0631\u064A\u062F", color: "#0891b2", group: "\u0645\u062E\u0632\u0646\u064A\u0629" },
    { value: "dispatch", label: "\u0635\u0631\u0641 \u0645\u062E\u0632\u0646\u064A", icon: "outbox", desc: "\u0625\u062E\u0631\u0627\u062C \u0623\u0635\u0646\u0627\u0641 \u0645\u0646 \u0627\u0644\u0645\u062E\u0632\u0646", color: "#f97316", group: "\u0645\u062E\u0632\u0646\u064A\u0629" },
    { value: "transfer_out", label: "\u062A\u062D\u0648\u064A\u0644 \u0645\u062E\u0632\u0646\u064A", icon: "swap_horiz", desc: "\u0646\u0642\u0644 \u0623\u0635\u0646\u0627\u0641 \u0628\u064A\u0646 \u0645\u062E\u0627\u0632\u0646", color: "#8b5cf6", group: "\u0645\u062E\u0632\u0646\u064A\u0629" },
    { value: "receive_transfer", label: "\u0627\u0633\u062A\u0644\u0627\u0645 \u062A\u062D\u0648\u064A\u0644 \u0645\u062E\u0632\u0646\u064A", icon: "inventory", desc: "\u0627\u0633\u062A\u0644\u0627\u0645 \u0623\u0635\u0646\u0627\u0641 \u0645\u0646 \u062A\u062D\u0648\u064A\u0644 \u0645\u062E\u0632\u0646\u064A", color: "#14b8a6", group: "\u0645\u062E\u0632\u0646\u064A\u0629" }
  ];
  paymentMethods = [
    { value: "cash", label: "\u0646\u0642\u062F\u0627\u064B", icon: "payments", desc: "\u062A\u062D\u0635\u064A\u0644 \u0623\u0648 \u0635\u0631\u0641 \u0646\u0642\u062F\u064A \u0645\u0628\u0627\u0634\u0631", accountType: "fund" },
    { value: "bank", label: "\u0628\u0646\u0643", icon: "account_balance", desc: "\u0625\u064A\u062F\u0627\u0639 \u0623\u0648 \u0633\u062D\u0628 \u0628\u0646\u0643\u064A", accountType: "bank" },
    { value: "exchange", label: "\u0635\u0631\u0627\u0641", icon: "currency_exchange", desc: "\u0639\u0628\u0631 \u0635\u0631\u0627\u0641 \u0623\u0648 \u062D\u0648\u0627\u0644\u0629", accountType: "exchange" },
    { value: "e_wallet", label: "\u0645\u062D\u0641\u0638\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629", icon: "phone_android", desc: "\u062A\u062D\u0648\u064A\u0644 \u0639\u0628\u0631 \u0645\u062D\u0641\u0638\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629", accountType: "e_wallet" }
  ];
  icons = [
    "receipt_long",
    "payments",
    "book",
    "local_shipping",
    "account_balance_wallet",
    "savings",
    "currency_exchange",
    "swap_horiz",
    "trending_up",
    "bolt",
    "groups",
    "handshake",
    "warehouse",
    "local_atm",
    "credit_card",
    "call_received",
    "call_made",
    "move_to_inbox",
    "outbox",
    "request_quote"
  ];
  colors = [
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
  categoryIcons = [
    "payments",
    "local_shipping",
    "receipt_long",
    "book",
    "folder",
    "label",
    "category",
    "sell",
    "style",
    "bookmark",
    "flag",
    "star",
    "bolt",
    "diamond",
    "workspace_premium"
  ];
  permissions = [
    { value: "both", label: "\u064A\u0633\u062A\u0642\u0628\u0644 \u0648\u064A\u062F\u0641\u0639" },
    { value: "receive_only", label: "\u064A\u0633\u062A\u0642\u0628\u0644 \u0641\u0642\u0637" },
    { value: "pay_only", label: "\u064A\u062F\u0641\u0639 \u0641\u0642\u0637" }
  ];
  accountTypeLabels = {
    billing: "\u0641\u0648\u062A\u0631\u0629",
    fund: "\u0635\u0646\u062F\u0648\u0642",
    bank: "\u0628\u0646\u0643",
    exchange: "\u0635\u0631\u0627\u0641",
    wallet: "\u0645\u062D\u0641\u0638\u0629",
    custody: "\u0639\u0647\u062F\u0629",
    accounting: "\u0623\u062E\u0631\u0649",
    e_wallet: "\u0645\u062D\u0641\u0638\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629",
    supplier: "\u0645\u0648\u0631\u062F",
    partner: "\u0634\u0631\u064A\u0643",
    employee: "\u0645\u0648\u0638\u0641",
    warehouse: "\u0645\u062E\u0632\u0646",
    budget: "\u0645\u064A\u0632\u0627\u0646\u064A\u0629",
    settlement: "\u062A\u0633\u0648\u064A\u0629",
    pending: "\u0645\u0639\u0644\u0642",
    other: "\u0623\u062E\u0631\u0649"
  };
  accountTypeIcons = {
    bank: "account_balance",
    exchange: "currency_exchange",
    e_wallet: "phone_android",
    wallet: "wallet",
    custody: "lock",
    fund: "savings",
    billing: "receipt",
    supplier: "local_shipping",
    partner: "handshake",
    employee: "badge",
    accounting: "book",
    warehouse: "warehouse",
    budget: "account_balance_wallet",
    settlement: "balance",
    pending: "hourglass_empty",
    other: "more_horiz"
  };
  // ===================== Computed: حسابات المصدر (الطرف الأول) =====================
  // حسب وسيلة الدفع المختارة - تعرض الحسابات أو الصناديق المتاحة
  sourceAccounts = computed(() => {
    const w = this.wiz();
    if (!w.paymentMethod)
      return [];
    if (w.paymentMethod === "cash") {
      return this.funds().map((f) => ({
        id: f.id,
        name: f.name,
        type: "fund",
        icon: "account_balance_wallet",
        subInfo: f.fundType || "",
        stationName: f.stationName || ""
      }));
    }
    const pm = this.paymentMethods.find((p) => p.value === w.paymentMethod);
    if (!pm)
      return [];
    return this.accounts().filter((a) => a.accountType === pm.accountType).map((a) => ({
      id: a.id,
      name: a.name,
      type: "account",
      icon: pm.icon,
      subInfo: a.provider || a.accountNumber || "",
      stationName: ""
    }));
  }, ...ngDevMode ? [{ debugName: "sourceAccounts" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Computed: الحسابات المرتبطة (الطرف الثاني) =====================
  // نعرض كل الحسابات من API الحسابات - المستخدم يختار الطرف الثاني
  availableAccounts = computed(() => {
    const all = this.accounts();
    return all;
  }, ...ngDevMode ? [{ debugName: "availableAccounts" }] : (
    /* istanbul ignore next */
    []
  ));
  availableAccountTypes = computed(() => {
    const types = /* @__PURE__ */ new Set();
    this.availableAccounts().forEach((a) => {
      if (a.accountType)
        types.add(a.accountType);
    });
    return Array.from(types);
  }, ...ngDevMode ? [{ debugName: "availableAccountTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  filteredAccountsByType = computed(() => {
    const all = this.availableAccounts().filter((a) => a != null && a.id != null);
    const selType = this.selectedAccountType();
    if (!selType)
      return all;
    return all.filter((a) => a.accountType === selType);
  }, ...ngDevMode ? [{ debugName: "filteredAccountsByType" }] : (
    /* istanbul ignore next */
    []
  ));
  linkedAccountIds = computed(() => {
    const ids = this.wiz().linkedAccounts.map((la) => la.accountId != null ? Number(la.accountId) : null).filter((id) => id != null && !Number.isNaN(id));
    return new Set(ids);
  }, ...ngDevMode ? [{ debugName: "linkedAccountIds" }] : (
    /* istanbul ignore next */
    []
  ));
  filteredTypes = computed(() => {
    const cat = this.activeCategory();
    const q = this.searchQuery().toLowerCase().trim();
    let all = this.operationTypes();
    if (cat !== "all")
      all = all.filter((ot) => String(ot.categoryId) === cat);
    if (q)
      all = all.filter((ot) => (ot.name || "").toLowerCase().includes(q) || (ot.description || "").toLowerCase().includes(q));
    return all;
  }, ...ngDevMode ? [{ debugName: "filteredTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  groupedByCategory = computed(() => {
    const all = this.filteredTypes();
    const groups = [];
    const catMap = /* @__PURE__ */ new Map();
    for (const ot of all) {
      const catId = Number(ot.categoryId) || 0;
      if (!catMap.has(catId))
        catMap.set(catId, []);
      catMap.get(catId).push(ot);
    }
    for (const [catId, items] of catMap) {
      const cat = this.categories().find((c) => Number(c.id) === catId);
      groups.push({ category: cat?.name || "\u063A\u064A\u0631 \u0645\u0635\u0646\u0641", categoryId: catId, items });
    }
    return groups;
  }, ...ngDevMode ? [{ debugName: "groupedByCategory" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Computed: عدد خطوات الـ wizard =====================
  totalSteps = computed(() => {
    const w = this.wiz();
    if (w.voucherType === "journal")
      return 5;
    if (this.isWarehouseType(w.voucherType))
      return 6;
    return 7;
  }, ...ngDevMode ? [{ debugName: "totalSteps" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== المخازن =====================
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : (
    /* istanbul ignore next */
    []
  ));
  isWarehouseType(voucherType) {
    return ["supply_invoice", "supply_order", "dispatch", "transfer_out", "receive_transfer"].includes(voucherType);
  }
  // المخازن المتاحة كمصدر
  sourceWarehouses = computed(() => {
    return this.warehouses();
  }, ...ngDevMode ? [{ debugName: "sourceWarehouses" }] : (
    /* istanbul ignore next */
    []
  ));
  // ===================== Computed: اسم المصدر المختار =====================
  selectedSourceName = computed(() => {
    const w = this.wiz();
    if (w.paymentMethod === "cash" && w.sourceFundId) {
      const fund = this.funds().find((f) => f.id === w.sourceFundId);
      return fund?.name || "";
    }
    if (w.sourceAccountId) {
      const acc = this.accounts().find((a) => a.id === w.sourceAccountId);
      return acc?.name || "";
    }
    return "";
  }, ...ngDevMode ? [{ debugName: "selectedSourceName" }] : (
    /* istanbul ignore next */
    []
  ));
  onBizIdChange(_bizId) {
    void this.loadAll();
  }
  async loadAll() {
    this.loading.set(true);
    try {
      const [ots, allAccs, fnds, whs, cats] = await Promise.all([
        this.api.getOperationTypes(this.bizId),
        this.api.getAllAccounts(this.bizId),
        this.api.getFunds(this.bizId),
        this.api.getWarehouses(this.bizId),
        this.api.getOperationCategories(this.bizId)
      ]);
      this.operationTypes.set(ots);
      this.accounts.set(allAccs.accounts);
      this.funds.set(fnds);
      this.warehouses.set(whs);
      this.categories.set(cats);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : String(e));
    } finally {
      this.loading.set(false);
    }
  }
  // ===================== Tab Navigation =====================
  switchTab(tab) {
    this.activeTab.set(tab);
  }
  // ===================== Category Management (تبويب مستقل) =====================
  getCategoryIcon(cat) {
    const iconMap = {
      "\u062A\u062D\u0635\u064A\u0644": "payments",
      "\u062A\u0648\u0631\u064A\u062F": "local_shipping",
      "\u0633\u0646\u062F\u0627\u062A": "receipt_long",
      "\u0642\u064A\u0648\u062F": "book",
      "\u063A\u064A\u0631 \u0645\u0635\u0646\u0641": "folder_off"
    };
    return iconMap[cat] || "label";
  }
  getCategoryColor(cat) {
    const colorMap = {
      "\u062A\u062D\u0635\u064A\u0644": "#22c55e",
      "\u062A\u0648\u0631\u064A\u062F": "#3b82f6",
      "\u0633\u0646\u062F\u0627\u062A": "#f59e0b",
      "\u0642\u064A\u0648\u062F": "#8b5cf6",
      "\u063A\u064A\u0631 \u0645\u0635\u0646\u0641": "#64748b"
    };
    if (colorMap[cat])
      return colorMap[cat];
    const firstOT = this.operationTypes().find((ot) => ot.category === cat);
    return firstOT?.color || "#3b82f6";
  }
  openCategoryForm() {
    this.newCategoryName.set("");
    this.newCategoryIcon.set("label");
    this.newCategoryColor.set("#3b82f6");
    this.editingCategoryOld.set(null);
    this.showCategoryForm.set(true);
  }
  editCategory(cat) {
    this.editingCategoryOld.set(cat);
    this.newCategoryName.set(cat);
    this.newCategoryIcon.set(this.getCategoryIcon(cat));
    this.newCategoryColor.set("#3b82f6");
    this.showCategoryForm.set(true);
  }
  closeCategoryForm() {
    this.showCategoryForm.set(false);
    this.editingCategoryOld.set(null);
  }
  async saveCategory() {
    const name = this.newCategoryName().trim();
    if (!name) {
      this.showError("\u0627\u0633\u0645 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0645\u0637\u0644\u0648\u0628");
      return;
    }
    this.saving.set(true);
    try {
      if (this.editingCategoryOld()) {
        const cat = this.categories().find((c) => c.name === this.editingCategoryOld());
        if (cat) {
          await this.api.updateOperationCategory(this.bizId, cat.id, { name });
        }
      } else {
        const categoryKey = name.toLowerCase().replace(/\s+/g, "_").replace(/[^\w\u0621-\u064A]/g, "");
        await this.api.createOperationCategory(this.bizId, {
          name,
          categoryKey,
          icon: this.newCategoryIcon(),
          color: this.newCategoryColor()
        });
      }
      this.closeCategoryForm();
      this.showSuccess(this.editingCategoryOld() ? "\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0635\u0646\u064A\u0641" : "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0635\u0646\u064A\u0641");
      await this.loadAll();
    } catch (e) {
      this.showError(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0635\u0646\u064A\u0641");
    }
    this.saving.set(false);
  }
  async deleteCategory(cat) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 "${cat.name}"?`, type: "danger" });
    if (!confirmed)
      return;
    this.saving.set(true);
    try {
      await this.api.deleteOperationCategory(this.bizId, cat.id);
      this.showSuccess("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0646\u064A\u0641");
      await this.loadAll();
    } catch (e) {
      this.showError(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0630\u0641");
    }
    this.saving.set(false);
  }
  // ===================== Wizard (تبويب القوالب) =====================
  openWizard() {
    this.wizardSystemMessage.set("");
    if (this.dynamicCategories().length === 0) {
      this.showWizardError('\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0646\u0634\u0627\u0621 \u0642\u0627\u0644\u0628 \u0627\u0644\u0622\u0646. \u0623\u0646\u0634\u0626 \u062A\u0635\u0646\u064A\u0641\u0627\u064B \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u062A\u0628\u0648\u064A\u0628 "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A" \u062B\u0645 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.');
      return;
    }
    this.editingId.set(null);
    this.wiz.set({
      name: "",
      description: "",
      icon: "receipt_long",
      color: "#3b82f6",
      categoryId: null,
      category: "",
      voucherType: "",
      paymentMethod: "",
      sourceAccountId: null,
      sourceFundId: null,
      sourceWarehouseId: null,
      linkedAccounts: [],
      screens: [],
      requiresAttachment: false,
      hasMultiLines: true,
      isActive: true,
      sortOrder: 0,
      workflowEnabled: false,
      workflowStates: ["draft", "confirmed"],
      workflowInitialState: "draft",
      workflowTransitions: []
    });
    this.wizardStep.set(1);
    this.selectedAccountType.set("");
    this.showWizard.set(true);
  }
  openEditWizard(ot) {
    this.wizardSystemMessage.set("");
    this.editingId.set(ot.id);
    const linked = (ot.linkedAccounts || []).map((la) => {
      const accountId = la.accountId ?? la.account_id;
      if (accountId == null)
        return null;
      const id = Number(accountId);
      if (Number.isNaN(id))
        return null;
      return {
        accountId: id,
        accountName: la.label ?? la.accountName ?? "",
        accountType: la.accountType ?? "",
        permission: la.permission || "both"
      };
    });
    const linkedFiltered = linked.filter((x) => x != null);
    const categoryName = this.categories().find((c) => Number(c.id) === Number(ot.categoryId))?.name || "";
    this.wiz.set({
      name: ot.name || "",
      description: ot.description || "",
      icon: ot.icon || "receipt_long",
      color: ot.color || "#3b82f6",
      categoryId: ot.categoryId || null,
      category: categoryName,
      voucherType: ot.voucherType || "",
      paymentMethod: ot.paymentMethod || "",
      sourceAccountId: ot.sourceAccountId || null,
      sourceFundId: ot.sourceFundId || null,
      sourceWarehouseId: ot.sourceWarehouseId || null,
      linkedAccounts: linkedFiltered,
      screens: ot.screens ? typeof ot.screens === "string" ? (() => {
        try {
          return JSON.parse(ot.screens);
        } catch {
          return [];
        }
      })() : ot.screens : [],
      requiresAttachment: ot.requiresAttachment || false,
      hasMultiLines: ot.hasMultiLines || false,
      isActive: ot.isActive !== false,
      sortOrder: ot.sortOrder || 0,
      workflowEnabled: ot.workflowConfig?.enabled || false,
      workflowStates: ot.workflowConfig?.states || ["draft", "confirmed"],
      workflowInitialState: ot.workflowConfig?.initialState || "draft",
      workflowTransitions: ot.workflowConfig?.transitions || []
    });
    this.wizardStep.set(1);
    this.selectedAccountType.set("");
    this.showWizard.set(true);
  }
  setWizField(field, value) {
    this.wiz.update((w) => __spreadProps(__spreadValues({}, w), { [field]: value }));
  }
  selectCategory(cat) {
    this.setWizField("categoryId", cat.id);
    this.setWizField("category", cat.name);
  }
  selectVoucherType(vt) {
    this.wiz.update((w) => __spreadProps(__spreadValues({}, w), {
      voucherType: vt,
      paymentMethod: this.isWarehouseType(vt) ? "" : vt === "journal" ? "" : w.paymentMethod,
      sourceAccountId: null,
      sourceFundId: null,
      sourceWarehouseId: null,
      linkedAccounts: []
    }));
    this.selectedAccountType.set("");
  }
  selectWarehouse(wh) {
    this.wiz.update((w) => __spreadProps(__spreadValues({}, w), {
      sourceWarehouseId: w.sourceWarehouseId === wh.id ? null : wh.id
    }));
  }
  selectPaymentMethod(pm) {
    this.wiz.update((w) => __spreadProps(__spreadValues({}, w), {
      paymentMethod: pm,
      sourceAccountId: null,
      sourceFundId: null,
      linkedAccounts: []
    }));
    this.selectedAccountType.set("");
  }
  selectSource(source) {
    if (source.type === "fund") {
      this.wiz.update((w) => __spreadProps(__spreadValues({}, w), {
        sourceFundId: w.sourceFundId === source.id ? null : source.id,
        sourceAccountId: null
      }));
    } else {
      this.wiz.update((w) => __spreadProps(__spreadValues({}, w), {
        sourceAccountId: w.sourceAccountId === source.id ? null : source.id,
        sourceFundId: null
      }));
    }
  }
  isSourceSelected(source) {
    const w = this.wiz();
    if (source.type === "fund")
      return w.sourceFundId === source.id;
    return w.sourceAccountId === source.id;
  }
  toggleLinkedAccount(acc) {
    if (!acc || acc.id == null)
      return;
    const accountId = Number(acc.id);
    if (Number.isNaN(accountId))
      return;
    this.wiz.update((w) => {
      const existing = w.linkedAccounts.find((la) => Number(la.accountId) === accountId);
      if (existing) {
        return __spreadProps(__spreadValues({}, w), { linkedAccounts: w.linkedAccounts.filter((la) => Number(la.accountId) !== accountId) });
      }
      return __spreadProps(__spreadValues({}, w), {
        linkedAccounts: [...w.linkedAccounts, {
          accountId,
          accountName: acc.name ?? "",
          accountType: acc.accountType ?? "",
          permission: "receive_only"
        }]
      });
    });
  }
  async selectAllAccounts() {
    const opts = this.filteredAccountsByType();
    const currentIds = this.linkedAccountIds();
    const toAdd = opts.filter((a) => a && a.id != null && !currentIds.has(Number(a.id)));
    if (toAdd.length === 0)
      return;
    const confirmed = await this.toast.confirm({
      title: "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644",
      message: `\u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0643\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629 (${toAdd.length} \u062D\u0633\u0627\u0628) \u0625\u0644\u0649 \u0627\u0644\u0642\u0627\u0644\u0628. \u0645\u062A\u0627\u0628\u0639\u0629\u061F`,
      type: "info"
    });
    if (!confirmed)
      return;
    const newAccounts = toAdd.map((a) => ({
      accountId: Number(a.id),
      accountName: a.name ?? "",
      accountType: a.accountType ?? "",
      permission: "receive_only"
    }));
    this.wiz.update((w) => __spreadProps(__spreadValues({}, w), {
      linkedAccounts: [...w.linkedAccounts, ...newAccounts]
    }));
  }
  removeLinkedAccount(accId) {
    this.wiz.update((w) => __spreadProps(__spreadValues({}, w), {
      linkedAccounts: w.linkedAccounts.filter((la) => la.accountId !== accId)
    }));
  }
  // ===================== Wizard Navigation =====================
  // سند قبض/صرف: 6 خطوات (تصنيف → نوع → وسيلة → مصدر → حسابات → تفاصيل)
  // قيد محاسبي: 4 خطوات (تصنيف → نوع → حسابات → تفاصيل)
  // عملية مخزنية: 5 خطوات (تصنيف → نوع → مخزن → حسابات → تفاصيل)
  getDisplayStep() {
    return this.wizardStep();
  }
  canGoNext() {
    const w = this.wiz();
    const step = this.wizardStep();
    if (step === 1)
      return !!w.categoryId;
    if (step === 2)
      return !!w.voucherType;
    if (w.voucherType === "journal") {
      if (step === 3)
        return w.linkedAccounts.length > 0;
      if (step === 4)
        return true;
      if (step === 5)
        return !!w.name.trim();
    } else if (this.isWarehouseType(w.voucherType)) {
      if (step === 3)
        return !!w.sourceWarehouseId;
      if (step === 4)
        return true;
      if (step === 5)
        return true;
      if (step === 6)
        return !!w.name.trim();
    } else {
      if (step === 3)
        return !!w.paymentMethod;
      if (step === 4) {
        if (w.paymentMethod === "cash")
          return !!w.sourceFundId;
        return !!w.sourceAccountId;
      }
      if (step === 5)
        return w.linkedAccounts.length > 0;
      if (step === 6)
        return true;
      if (step === 7)
        return !!w.name.trim();
    }
    return true;
  }
  isLastStep() {
    const w = this.wiz();
    const step = this.wizardStep();
    if (w.voucherType === "journal")
      return step === 5;
    if (this.isWarehouseType(w.voucherType))
      return step === 6;
    return step === 7;
  }
  nextStep() {
    this.wizardStep.update((s) => s + 1);
  }
  prevStep() {
    this.wizardStep.update((s) => s - 1);
  }
  getContentType() {
    const w = this.wiz();
    const step = this.wizardStep();
    if (step === 1)
      return "category";
    if (step === 2)
      return "voucherType";
    if (w.voucherType === "journal") {
      if (step === 3)
        return "accounts";
      if (step === 4)
        return "workflow";
      if (step === 5)
        return "details";
    } else if (this.isWarehouseType(w.voucherType)) {
      if (step === 3)
        return "warehouse";
      if (step === 4)
        return "accounts";
      if (step === 5)
        return "workflow";
      if (step === 6)
        return "details";
    } else {
      if (step === 3)
        return "paymentMethod";
      if (step === 4)
        return "source";
      if (step === 5)
        return "accounts";
      if (step === 6)
        return "workflow";
      if (step === 7)
        return "details";
    }
    return "category";
  }
  // ===================== Step Labels for wizard header =====================
  getStepLabels() {
    const w = this.wiz();
    if (w.voucherType === "journal") {
      return [
        { num: 1, label: "\u0627\u0644\u062A\u0635\u0646\u064A\u0641" },
        { num: 2, label: "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629" },
        { num: 3, label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A" },
        { num: 4, label: "\u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644" },
        { num: 5, label: "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" }
      ];
    }
    if (this.isWarehouseType(w.voucherType)) {
      return [
        { num: 1, label: "\u0627\u0644\u062A\u0635\u0646\u064A\u0641" },
        { num: 2, label: "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629" },
        { num: 3, label: "\u0627\u0644\u0645\u062E\u0632\u0646" },
        { num: 4, label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A" },
        { num: 5, label: "\u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644" },
        { num: 6, label: "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" }
      ];
    }
    return [
      { num: 1, label: "\u0627\u0644\u062A\u0635\u0646\u064A\u0641" },
      { num: 2, label: "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629" },
      { num: 3, label: "\u0627\u0644\u0648\u0633\u064A\u0644\u0629" },
      { num: 4, label: "\u0627\u0644\u0645\u0635\u062F\u0631" },
      { num: 5, label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A" },
      { num: 6, label: "\u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644" },
      { num: 7, label: "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" }
    ];
  }
  getPaymentMethodIcon() {
    const pm = this.paymentMethods.find((p) => p.value === this.wiz().paymentMethod);
    return pm?.icon || "payments";
  }
  getPaymentMethodName() {
    const pm = this.paymentMethods.find((p) => p.value === this.wiz().paymentMethod);
    return pm?.label || "";
  }
  async saveWizard() {
    const w = this.wiz();
    if (!w.name.trim()) {
      this.showWizardError("\u0627\u0633\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u0645\u0637\u0644\u0648\u0628 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638");
      return;
    }
    if (!w.categoryId) {
      this.showWizardError("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u062F\u0648\u0646 \u062A\u0635\u0646\u064A\u0641. \u0627\u062E\u062A\u0631 \u062A\u0635\u0646\u064A\u0641\u0627\u064B \u0623\u0648\u0644\u0627\u064B.");
      return;
    }
    this.saving.set(true);
    this.wizardSystemMessage.set("");
    try {
      const payload = {
        name: w.name,
        description: w.description,
        icon: w.icon,
        color: w.color,
        categoryId: w.categoryId,
        voucherType: w.voucherType,
        paymentMethod: w.paymentMethod || null,
        sourceAccountId: w.sourceAccountId || null,
        sourceFundId: w.sourceFundId || null,
        sourceWarehouseId: w.sourceWarehouseId || null,
        screens: w.screens.length > 0 ? w.screens : [],
        requiresAttachment: w.requiresAttachment,
        hasMultiLines: w.hasMultiLines,
        isActive: w.isActive,
        sortOrder: w.sortOrder,
        linkedAccounts: w.linkedAccounts.filter((la) => la.accountId != null && !Number.isNaN(Number(la.accountId))).map((la) => ({
          accountId: Number(la.accountId),
          label: la.accountName ?? "",
          permission: la.permission ?? "both",
          sortOrder: 0
        })),
        workflowConfig: w.workflowEnabled ? {
          enabled: true,
          states: w.workflowStates,
          initialState: w.workflowInitialState,
          transitions: w.workflowTransitions
        } : { enabled: false }
      };
      if (this.editingId()) {
        await this.api.updateOperationType(this.editingId(), payload);
      } else {
        await this.api.createOperationType(this.bizId, payload);
      }
      this.showWizard.set(false);
      this.showSuccess(this.editingId() ? "\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0646\u062C\u0627\u062D" : "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0646\u062C\u0627\u062D");
      await this.loadAll();
    } catch (e) {
      this.showWizardError(e instanceof Error ? e.message : "\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0627\u0644\u0642\u0627\u0644\u0628. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062B\u0645 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");
    }
    this.saving.set(false);
  }
  // ===================== Clone Template =====================
  async cloneOT(ot) {
    const cfm = await this.toast.confirm({ title: "\u0646\u0633\u062E \u0627\u0644\u0642\u0627\u0644\u0628", message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u0646\u0633\u062E \u0627\u0644\u0642\u0627\u0644\u0628 "${ot.name}"\u061F`, type: "info" });
    if (!cfm)
      return;
    this.saving.set(true);
    try {
      await this.api.cloneOperationType(this.bizId, ot.id);
      this.showSuccess(`\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0642\u0627\u0644\u0628 "${ot.name}" \u0628\u0646\u062C\u0627\u062D`);
      await this.loadAll();
    } catch (e) {
      this.showError(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u0646\u0633\u062E \u0627\u0644\u0642\u0627\u0644\u0628");
    }
    this.saving.set(false);
  }
  // ===================== Toggle Active =====================
  async toggleOT(ot) {
    this.saving.set(true);
    try {
      await this.api.toggleOperationType(this.bizId, ot.id);
      this.showSuccess(ot.isActive ? `\u062A\u0645 \u062A\u0639\u0637\u064A\u0644 "${ot.name}"` : `\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 "${ot.name}"`);
      await this.loadAll();
    } catch (e) {
      this.showError(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629");
    }
    this.saving.set(false);
  }
  // ===================== Stats View =====================
  async loadStats() {
    try {
      const stats = await this.api.getOperationTypesStats(this.bizId);
      this.operationStats.set(stats);
      this.showStatsView.set(true);
    } catch (e) {
      this.showError(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062C\u0644\u0628 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A");
    }
  }
  getStatForOT(otId) {
    return this.operationStats().find((s) => s.id === otId) || { usage_count: 0, total_amount: 0 };
  }
  // ===================== Check Name Duplicate =====================
  checkNameDuplicate(name) {
    if (this.nameCheckTimeout)
      clearTimeout(this.nameCheckTimeout);
    if (!name.trim()) {
      this.nameCheckResult.set(null);
      return;
    }
    this.nameCheckTimeout = setTimeout(async () => {
      try {
        const result = await this.api.checkOperationTypeName(this.bizId, name, this.editingId() || void 0);
        this.nameCheckResult.set(result);
      } catch {
        this.nameCheckResult.set(null);
      }
    }, 500);
  }
  // ===================== Delete Template =====================
  async deleteOT(id) {
    const cfm = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: "\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0642\u0627\u0644\u0628\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0643\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647.", type: "danger" });
    if (!cfm)
      return;
    try {
      await this.api.deleteOperationType(id);
      await this.loadAll();
    } catch (e) {
      this.showError(e instanceof Error ? e.message : String(e));
    }
  }
  // ===================== Accounts Modal =====================
  openAccountsView(ot) {
    this.selectedOT.set(ot);
    this.showAccountsModal.set(true);
  }
  // ===================== Helpers =====================
  showError(msg) {
    this.error.set(msg);
    this.toast.error(msg, "\u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u0646\u0638\u0627\u0645", 7e3);
    setTimeout(() => this.error.set(""), 5e3);
  }
  showSuccess(msg) {
    this.success.set(msg);
    this.toast.success(msg, "\u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u0646\u0638\u0627\u0645", 4500);
    setTimeout(() => this.success.set(""), 4e3);
  }
  showWizardError(msg) {
    this.wizardSystemMessage.set(msg);
    this.toast.error(msg, "\u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u0646\u0638\u0627\u0645", 8e3);
  }
  getAccountName(id) {
    return this.accounts().find((a) => a.id === id)?.name || "\u2014";
  }
  getFundName(id) {
    return this.funds().find((f) => f.id === id)?.name || "\u2014";
  }
  getAccountTypeLabel(t) {
    return this.accountTypeLabels[t] || t;
  }
  getVoucherTypeLabel(t) {
    const m = { receipt: "\u0633\u0646\u062F \u0642\u0628\u0636", payment: "\u0633\u0646\u062F \u0635\u0631\u0641", journal: "\u0642\u064A\u062F \u0645\u062D\u0627\u0633\u0628\u064A", transfer: "\u062A\u062D\u0648\u064A\u0644" };
    return m[t] || t;
  }
  getPaymentMethodLabel(pm) {
    return this.paymentMethods.find((x) => x.value === pm)?.label || pm || "\u2014";
  }
  getPermissionLabel(p) {
    return this.permissions.find((x) => x.value === p)?.label || p;
  }
  getWarehouseName(id) {
    return this.warehouses().find((w) => w.id === id)?.name || "\u2014";
  }
  getSourceLabel(ot) {
    if (ot.sourceWarehouseId) {
      return this.getWarehouseName(ot.sourceWarehouseId);
    }
    if (ot.sourceFundId) {
      return this.getFundName(ot.sourceFundId);
    }
    if (ot.sourceAccountId) {
      return this.getAccountName(ot.sourceAccountId);
    }
    return "\u2014";
  }
  getVoucherTypeOption(value) {
    return this.operationTypeOptions.find((o) => o.value === value);
  }
  countByCategory(category) {
    return this.operationTypes().filter((ot) => String(ot.categoryId) === String(category)).length;
  }
  countAccountsByType(accountType) {
    return this.availableAccounts().filter((a) => a.accountType === accountType).length;
  }
  trackById(_, item) {
    return item.id;
  }
  // ===================== سير العمل - دوال الإدارة =====================
  addWorkflowState() {
    const s = this.newWfState().trim();
    if (!s)
      return;
    const current = this.wiz().workflowStates;
    if (current.includes(s))
      return;
    this.wiz.update((w) => __spreadProps(__spreadValues({}, w), { workflowStates: [...w.workflowStates, s] }));
    this.newWfState.set("");
  }
  removeWorkflowState(state) {
    if (state === "draft")
      return;
    this.wiz.update((w) => __spreadProps(__spreadValues({}, w), {
      workflowStates: w.workflowStates.filter((s) => s !== state),
      workflowTransitions: w.workflowTransitions.filter((t) => t.fromState !== state && t.toState !== state),
      workflowInitialState: w.workflowInitialState === state ? "draft" : w.workflowInitialState
    }));
  }
  addWorkflowTransition() {
    const from = this.newTrFrom();
    const to = this.newTrTo();
    const action = this.newTrAction().trim();
    if (!from || !to || !action || from === to)
      return;
    this.wiz.update((w) => __spreadProps(__spreadValues({}, w), {
      workflowTransitions: [...w.workflowTransitions, { fromState: from, toState: to, actionName: action, allowedRoles: [] }]
    }));
    this.newTrFrom.set("");
    this.newTrTo.set("");
    this.newTrAction.set("");
  }
  removeWorkflowTransition(idx) {
    this.wiz.update((w) => __spreadProps(__spreadValues({}, w), {
      workflowTransitions: w.workflowTransitions.filter((_, i) => i !== idx)
    }));
  }
  getStateLabel(state) {
    const labels = {
      draft: "\u0645\u0633\u0648\u062F\u0629",
      confirmed: "\u0645\u0639\u062A\u0645\u062F",
      pending_approval: "\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F",
      approved: "\u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647",
      rejected: "\u0645\u0631\u0641\u0648\u0636",
      cancelled: "\u0645\u0644\u063A\u064A"
    };
    return labels[state] || state;
  }
  getStateColor(state) {
    const colors = {
      draft: "#f59e0b",
      confirmed: "#22c55e",
      pending_approval: "#3b82f6",
      approved: "#10b981",
      rejected: "#ef4444",
      cancelled: "#64748b"
    };
    return colors[state] || "#64748b";
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275OperationTypesComponent_BaseFactory;
    return function OperationTypesComponent_Factory(__ngFactoryType__) {
      return (\u0275OperationTypesComponent_BaseFactory || (\u0275OperationTypesComponent_BaseFactory = \u0275\u0275getInheritedFactory(_OperationTypesComponent)))(__ngFactoryType__ || _OperationTypesComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OperationTypesComponent, selectors: [["app-operation-types"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 39, vars: 17, consts: [[1, "page-container"], [1, "page-header"], [1, "header-left"], [1, "page-icon-3d"], [1, "material-icons-round"], [1, "page-title"], [1, "page-subtitle"], [1, "header-right"], ["title", "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F", 1, "help-btn", 3, "click"], [1, "btn-3d", "btn-primary"], [1, "alert-error"], [1, "alert-success"], [1, "main-tabs-bar"], [1, "main-tab", 3, "click"], [1, "cat-count"], [1, "loading-grid"], [1, "modal-overlay"], ["title", "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645", 1, "btn-3d", "btn-secondary", 3, "click"], [1, "btn-3d", "btn-primary", 3, "click"], [1, "alert-error", 3, "click"], [1, "close-x"], [1, "alert-success", 3, "click"], [1, "skeleton-card"], [1, "empty-state"], [1, "categories-grid"], [1, "empty-icon-3d"], [1, "ot-card-3d", "category-card-item", 3, "--card-color"], [1, "ot-card-3d", "category-card-item"], [1, "card-glow"], [1, "ot-card-header"], [1, "ot-icon-3d"], [1, "ot-meta"], [1, "ot-actions-top"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "icon-btn", "edit-btn", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "icon-btn", "delete-btn", 3, "click"], [1, "ot-card-body"], [1, "ot-name"], [1, "ot-info-row"], [1, "ot-info-chip"], [1, "ot-desc"], [1, "search-bar-row"], [1, "search-input-wrapper"], ["type", "text", "placeholder", "\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0644\u0628...", 3, "input", "value"], [1, "clear-search"], [1, "results-count"], [1, "category-tabs"], [1, "clear-search", 3, "click"], [1, "cat-tab", 3, "active"], [1, "cat-tab", 3, "click"], [1, "category-group"], [1, "category-group-header"], [1, "ot-grid"], [1, "ot-card-3d", 3, "--card-color"], [1, "ot-card-3d"], [1, "ot-type-badge"], ["title", "\u0646\u0633\u062E \u0627\u0644\u0642\u0627\u0644\u0628", 1, "icon-btn", 3, "click"], [1, "icon-btn", 3, "click", "title"], [1, "ot-info-chip", "source-chip"], [1, "ot-flags"], [1, "flag-badge", "attachment"], [1, "flag-badge", "inactive"], [1, "ot-accounts-section"], [1, "ot-accounts-header", 3, "click"], [1, "material-icons-round", "expand-icon"], [1, "linked-accounts-list"], [1, "linked-account-chip"], [1, "more-accounts"], [1, "more-accounts", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-3d", 2, "max-width", "480px", 3, "click"], [1, "modal-header"], [1, "modal-icon", 2, "background", "#3b82f6"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-group"], [1, "form-label"], [1, "required"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u062A\u062D\u0635\u064A\u0644\u060C \u062A\u0648\u0631\u064A\u062F\u060C \u0633\u0646\u062F\u0627\u062A\u060C \u0642\u064A\u0648\u062F", 1, "form-input", 3, "input", "value"], [1, "icon-picker"], [1, "icon-option", 3, "selected"], [1, "color-picker"], [1, "color-dot", 3, "selected", "background"], [1, "modal-footer"], [1, "btn-3d", "btn-ghost", 3, "click"], [1, "btn-3d", "btn-primary", 3, "click", "disabled"], [1, "icon-option", 3, "click"], [1, "color-dot", 3, "click"], [1, "wizard-modal", 3, "click"], [1, "wizard-header"], [1, "wizard-header-top"], [1, "wizard-steps-bar"], [1, "wizard-body"], ["role", "alert", "aria-live", "assertive", 1, "wizard-system-alert"], [1, "wizard-step"], [1, "wizard-footer"], [1, "btn-3d", "btn-ghost"], [1, "btn-3d", "btn-primary", 3, "disabled"], [1, "wstep", 3, "click"], [1, "wstep-num"], [1, "wstep-line", 3, "done"], [1, "wstep-line"], [1, "wsa-text"], [1, "step-title"], [1, "step-desc"], [1, "no-accounts-msg"], [1, "type-cards"], [1, "type-card", 3, "selected"], [1, "type-card", 3, "click"], [1, "tc-icon"], [1, "tc-body"], [1, "material-icons-round", "tc-check"], [1, "type-card", 3, "selected", "--type-color"], [1, "method-cards"], [1, "method-card", 3, "selected"], [1, "method-card", 3, "click"], [1, "mc-icon"], [1, "material-icons-round", "mc-check"], [1, "source-info-banner"], [1, "source-accounts-list"], [1, "source-acc-item", 3, "selected"], [1, "source-acc-item", 3, "click"], [1, "sai-icon"], [1, "sai-info"], [1, "sai-sub"], [1, "sai-station"], [1, "material-icons-round", "sai-check"], [1, "sai-icon", 2, "background", "#06b6d4"], [1, "source-summary-chip"], [1, "acc-type-selector"], [1, "counter-accounts-section"], [1, "cas-header"], [1, "btn-select-all", 3, "click"], [1, "counter-accounts-grid"], [1, "counter-acc-item", 3, "selected"], [1, "no-accounts-msg", 2, "grid-column", "1 / -1"], [1, "selected-accounts-summary"], [1, "acc-type-chips"], [1, "acc-type-chip", 3, "click"], [1, "atc-count"], [1, "acc-type-chip", 3, "active"], [1, "counter-acc-item", 3, "click"], [1, "material-icons-round", "cai-icon"], [1, "cai-details"], [1, "cai-name"], [1, "cai-sub-info"], [1, "cai-type"], [1, "selected-accounts-list"], [1, "sel-acc-chip"], [1, "sac-type"], [1, "sac-name"], [1, "sac-remove", 3, "click"], [1, "form-group", 2, "margin-bottom", "20px"], [1, "toggle-label", 2, "font-size", "15px", "font-weight", "600"], [1, "toggle-switch", 3, "click"], [1, "toggle-knob"], [2, "text-align", "center", "padding", "30px", "color", "#94a3b8"], [2, "display", "flex", "flex-wrap", "wrap", "gap", "8px", "margin-bottom", "12px"], [2, "display", "flex", "align-items", "center", "gap", "4px", "padding", "4px 12px", "border-radius", "20px", "font-size", "13px", "font-weight", "500", 3, "background", "color"], [2, "display", "flex", "gap", "8px"], ["type", "text", "placeholder", "\u0627\u0633\u0645 \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 (\u0645\u062B\u0644: pending_approval)", 1, "form-input", 2, "flex", "1", 3, "input", "value"], [1, "btn-3d", "btn-primary", 2, "padding", "8px 16px", 3, "click"], [1, "material-icons-round", 2, "font-size", "18px"], [1, "form-input", 3, "change", "value"], [3, "value"], [2, "margin-bottom", "12px"], [2, "display", "grid", "grid-template-columns", "1fr 1fr 1fr auto", "gap", "8px", "align-items", "end"], [2, "font-size", "11px", "color", "#64748b", "margin-bottom", "4px", "display", "block"], ["value", ""], ["type", "text", "placeholder", "\u0645\u062B\u0644: \u0627\u0639\u062A\u0645\u0627\u062F", 1, "form-input", 3, "input", "value"], [1, "btn-3d", "btn-primary", 2, "padding", "8px 16px", "height", "40px", 3, "click"], [2, "display", "flex", "align-items", "center", "gap", "4px", "padding", "4px 12px", "border-radius", "20px", "font-size", "13px", "font-weight", "500"], [2, "background", "none", "border", "none", "cursor", "pointer", "padding", "0", "color", "inherit", "font-size", "16px", "line-height", "1"], [2, "background", "none", "border", "none", "cursor", "pointer", "padding", "0", "color", "inherit", "font-size", "16px", "line-height", "1", 3, "click"], [1, "material-icons-round", 2, "font-size", "16px"], [2, "display", "flex", "align-items", "center", "gap", "8px", "padding", "8px 12px", "background", "#f8fafc", "border-radius", "8px", "margin-bottom", "6px", "font-size", "13px"], [2, "padding", "2px 8px", "border-radius", "12px", "font-weight", "500"], [1, "material-icons-round", 2, "font-size", "16px", "color", "#94a3b8"], [2, "color", "#64748b", "font-size", "12px"], [2, "margin-right", "auto", "background", "none", "border", "none", "cursor", "pointer", "color", "#ef4444", 3, "click"], [1, "material-icons-round", 2, "font-size", "48px", "margin-bottom", "12px"], [2, "font-size", "12px"], [1, "step-hint"], [1, "wizard-summary"], [1, "ws-item"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u062A\u062D\u0635\u064A\u0644 \u064A\u0648\u0645\u064A - \u0627\u0644\u062F\u0647\u0645\u064A\u0629", 1, "form-input", 3, "input", "value"], ["rows", "2", "placeholder", "\u0648\u0635\u0641 \u0627\u062E\u062A\u064A\u0627\u0631\u064A \u0644\u0644\u0642\u0627\u0644\u0628...", 1, "form-input", 3, "input", "value"], [1, "form-row"], [1, "form-row", "flags-row"], [1, "toggle-label"], [1, "modal-3d", "accounts-modal", 3, "click"], [1, "modal-icon"], [1, "modal-subtitle"], [1, "source-summary-chip", 2, "margin-bottom", "16px"], [1, "no-linked"], [1, "linked-accounts-full"], [1, "la-row"], [1, "material-icons-round", "la-icon"], [1, "la-info"], [1, "la-name"], [1, "la-account-name"], [1, "perm-badge"], [1, "modal-3d", "hiw-modal", 3, "click"], [1, "modal-icon", "amber"], [1, "modal-body", "hiw-body"], [1, "hiw-section"], [1, "hiw-steps"], [1, "hiw-step"], [1, "hs-num"]], template: function OperationTypesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "auto_awesome");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1", 5);
      \u0275\u0275text(8, "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A (\u0627\u0644\u0642\u0648\u0627\u0644\u0628)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10, "\u0642\u0648\u0627\u0644\u0628 \u062C\u0627\u0647\u0632\u0629 \u0645\u0642\u064A\u062F\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644 - \u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u0639\u0628\u0651\u064A \u0627\u0644\u0645\u0628\u0644\u063A \u0648\u0627\u062D\u0641\u0638");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
      \u0275\u0275listener("click", function OperationTypesComponent_Template_button_click_12_listener() {
        return ctx.showHowItWorks.set(true);
      });
      \u0275\u0275elementStart(13, "span", 4);
      \u0275\u0275text(14, "help_outline");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(15, OperationTypesComponent_Conditional_15_Template, 8, 0);
      \u0275\u0275conditionalCreate(16, OperationTypesComponent_Conditional_16_Template, 4, 0, "button", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(17, OperationTypesComponent_Conditional_17_Template, 6, 1, "div", 10);
      \u0275\u0275conditionalCreate(18, OperationTypesComponent_Conditional_18_Template, 4, 1, "div", 11);
      \u0275\u0275elementStart(19, "div", 12)(20, "button", 13);
      \u0275\u0275listener("click", function OperationTypesComponent_Template_button_click_20_listener() {
        return ctx.switchTab("templates");
      });
      \u0275\u0275elementStart(21, "span", 4);
      \u0275\u0275text(22, "receipt_long");
      \u0275\u0275elementEnd();
      \u0275\u0275text(23, " \u0627\u0644\u0642\u0648\u0627\u0644\u0628 ");
      \u0275\u0275elementStart(24, "span", 14);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "button", 13);
      \u0275\u0275listener("click", function OperationTypesComponent_Template_button_click_26_listener() {
        return ctx.switchTab("categories");
      });
      \u0275\u0275elementStart(27, "span", 4);
      \u0275\u0275text(28, "folder");
      \u0275\u0275elementEnd();
      \u0275\u0275text(29, " \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A ");
      \u0275\u0275elementStart(30, "span", 14);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(32, OperationTypesComponent_Conditional_32_Template, 3, 1, "div", 15);
      \u0275\u0275conditionalCreate(33, OperationTypesComponent_Conditional_33_Template, 2, 1);
      \u0275\u0275conditionalCreate(34, OperationTypesComponent_Conditional_34_Template, 11, 5);
      \u0275\u0275conditionalCreate(35, OperationTypesComponent_Conditional_35_Template, 37, 6, "div", 16);
      \u0275\u0275conditionalCreate(36, OperationTypesComponent_Conditional_36_Template, 27, 12, "div", 16);
      \u0275\u0275conditionalCreate(37, OperationTypesComponent_Conditional_37_Template, 25, 6, "div", 16);
      \u0275\u0275conditionalCreate(38, OperationTypesComponent_Conditional_38_Template, 82, 0, "div", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275conditional(ctx.activeTab() === "templates" ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "categories" ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.success() ? 18 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab() === "templates");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.operationTypes().length);
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.activeTab() === "categories");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.dynamicCategories().length);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 32 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.activeTab() === "categories" ? 33 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.activeTab() === "templates" ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showCategoryForm() ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showWizard() ? 36 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showAccountsModal() && ctx.selectedOT() ? 37 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showHowItWorks() ? 38 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption], styles: ['@charset "UTF-8";\n\n\n\n@keyframes _ngcontent-%COMP%_hesabati-fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-slide-up {\n  from {\n    transform: translateY(24px) scale(0.97);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-slide-down {\n  from {\n    transform: translateY(-24px) scale(0.97);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-slide-right {\n  from {\n    transform: translateX(-24px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-slide-left {\n  from {\n    transform: translateX(24px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-scale-in {\n  from {\n    transform: scale(0.85);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-scale-bounce {\n  0% {\n    transform: scale(0.6);\n    opacity: 0;\n  }\n  60% {\n    transform: scale(1.05);\n  }\n  100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-3d-flip-in {\n  from {\n    transform: perspective(800px) rotateX(-30deg) translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: perspective(800px) rotateX(0deg) translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-3d-tilt-in {\n  from {\n    transform: perspective(800px) rotateY(-15deg) rotateX(10deg) translateZ(-50px);\n    opacity: 0;\n  }\n  to {\n    transform: perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-3d-rise {\n  from {\n    transform: perspective(800px) translateY(40px) translateZ(-30px) rotateX(8deg);\n    opacity: 0;\n    box-shadow: none;\n  }\n  to {\n    transform: perspective(800px) translateY(0) translateZ(0) rotateX(0deg);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-3d-unfold {\n  0% {\n    transform: perspective(800px) rotateX(-90deg);\n    transform-origin: top center;\n    opacity: 0;\n  }\n  50% {\n    transform: perspective(800px) rotateX(10deg);\n    opacity: 0.8;\n  }\n  100% {\n    transform: perspective(800px) rotateX(0deg);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-float {\n  0%, 100% {\n    transform: translateY(0px) rotate(0deg);\n  }\n  25% {\n    transform: translateY(-6px) rotate(0.5deg);\n  }\n  75% {\n    transform: translateY(4px) rotate(-0.5deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-float-3d {\n  0%, 100% {\n    transform: perspective(800px) translateY(0px) rotateX(4deg) rotateY(-2deg);\n  }\n  50% {\n    transform: perspective(800px) translateY(-8px) rotateX(2deg) rotateY(1deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-pulse-glow {\n  0%, 100% {\n    box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);\n  }\n  50% {\n    box-shadow: 0 0 40px rgba(59, 130, 246, 0.35), 0 0 80px rgba(59, 130, 246, 0.1);\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-shimmer {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-rotate-slow {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-breathe {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: scale(1.03);\n    opacity: 0.9;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-skeleton {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-dots {\n  0%, 80%, 100% {\n    transform: scale(0);\n    opacity: 0.5;\n  }\n  40% {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-progress-indeterminate {\n  0% {\n    transform: translateX(-100%);\n  }\n  100% {\n    transform: translateX(400%);\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-fade-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-slide-out-down {\n  from {\n    transform: translateY(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateY(24px);\n    opacity: 0;\n  }\n}\n@keyframes _ngcontent-%COMP%_hesabati-scale-out {\n  from {\n    transform: scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: scale(0.85);\n    opacity: 0;\n  }\n}\n.stagger-1[_ngcontent-%COMP%] {\n  animation-delay: 60ms;\n}\n.stagger-2[_ngcontent-%COMP%] {\n  animation-delay: 120ms;\n}\n.stagger-3[_ngcontent-%COMP%] {\n  animation-delay: 180ms;\n}\n.stagger-4[_ngcontent-%COMP%] {\n  animation-delay: 240ms;\n}\n.stagger-5[_ngcontent-%COMP%] {\n  animation-delay: 300ms;\n}\n.stagger-6[_ngcontent-%COMP%] {\n  animation-delay: 360ms;\n}\n.stagger-7[_ngcontent-%COMP%] {\n  animation-delay: 420ms;\n}\n.stagger-8[_ngcontent-%COMP%] {\n  animation-delay: 480ms;\n}\n.stagger-9[_ngcontent-%COMP%] {\n  animation-delay: 540ms;\n}\n.stagger-10[_ngcontent-%COMP%] {\n  animation-delay: 600ms;\n}\n.stagger-11[_ngcontent-%COMP%] {\n  animation-delay: 660ms;\n}\n.stagger-12[_ngcontent-%COMP%] {\n  animation-delay: 720ms;\n}\n.stagger-13[_ngcontent-%COMP%] {\n  animation-delay: 780ms;\n}\n.stagger-14[_ngcontent-%COMP%] {\n  animation-delay: 840ms;\n}\n.stagger-15[_ngcontent-%COMP%] {\n  animation-delay: 900ms;\n}\n.stagger-16[_ngcontent-%COMP%] {\n  animation-delay: 960ms;\n}\n.stagger-17[_ngcontent-%COMP%] {\n  animation-delay: 1020ms;\n}\n.stagger-18[_ngcontent-%COMP%] {\n  animation-delay: 1080ms;\n}\n.stagger-19[_ngcontent-%COMP%] {\n  animation-delay: 1140ms;\n}\n.stagger-20[_ngcontent-%COMP%] {\n  animation-delay: 1200ms;\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-fade-in 250ms cubic-bezier(0, 0, 0.2, 1) both;\n}\n.animate-slide-up[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-slide-up 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-slide-down[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-slide-down 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-slide-right[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-slide-right 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-scale-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-scale-in 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-scale-bounce[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-scale-bounce 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n.animate-3d-flip[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-3d-flip-in 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-3d-tilt[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-3d-tilt-in 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-3d-rise[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-3d-rise 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-3d-unfold[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-3d-unfold 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-float[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-float 6s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;\n}\n.animate-float-3d[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-float-3d 8s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;\n}\n.animate-pulse-glow[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-pulse-glow 3s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;\n}\n.animate-shimmer[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-shimmer 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n}\n.animate-breathe[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-breathe 4s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;\n}\n.animate-spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_hesabati-spin 0.8s linear infinite;\n}\n[_nghost-%COMP%] {\n  --card-color: #3b82f6;\n}\n.page-container[_ngcontent-%COMP%] {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  padding: 20px 24px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06) 0%,\n      rgba(99, 102, 241, 0.04) 100%);\n  border-radius: 20px;\n  border: 1px solid rgba(59, 130, 246, 0.12);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.page-icon-3d[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35), 0 2px 4px rgba(0, 0, 0, 0.1);\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s ease;\n}\n.page-icon-3d[_ngcontent-%COMP%]:hover {\n  transform: perspective(100px) rotateX(0deg) scale(1.05);\n}\n.page-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: white;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 4px;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.help-btn[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  border: 1.5px solid rgba(245, 158, 11, 0.3);\n  background: rgba(245, 158, 11, 0.08);\n  color: #f59e0b;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.help-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.help-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(245, 158, 11, 0.15);\n  transform: scale(1.08) rotate(15deg);\n  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);\n}\n.btn-3d[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  font-size: 14px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n  position: relative;\n}\n.btn-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow:\n    0 4px 12px rgba(59, 130, 246, 0.35),\n    0 2px 4px rgba(0, 0, 0, 0.1),\n    inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4), 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-3d.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--text-secondary, #64748b);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n}\n.btn-3d.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface, #f8fafc);\n  transform: translateY(-1px);\n}\n.alert-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\n.alert-error[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.alert-error[_ngcontent-%COMP%]   .close-x[_ngcontent-%COMP%] {\n  margin-right: auto;\n  opacity: 0.6;\n}\n.alert-success[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: rgba(34, 197, 94, 0.1);\n  border: 1px solid rgba(34, 197, 94, 0.25);\n  color: #22c55e;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\n.alert-success[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.category-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n}\n.cat-tab[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-secondary, #64748b);\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.cat-tab[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.cat-tab.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  border-color: transparent;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\n  transform: translateY(-1px);\n}\n.cat-tab[_ngcontent-%COMP%]:not(.active):hover {\n  background: var(--bg-surface, #f8fafc);\n  border-color: #3b82f6;\n  color: #3b82f6;\n}\n.cat-count[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.25);\n  border-radius: 6px;\n  padding: 1px 6px;\n  font-size: 11px;\n}\n.loading-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 20px;\n}\n.skeleton-card[_ngcontent-%COMP%] {\n  height: 220px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      90deg,\n      #f0f0f0 25%,\n      #e0e0e0 50%,\n      #f0f0f0 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n.empty-icon-3d[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 24px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.3);\n  transform: perspective(150px) rotateX(10deg);\n}\n.empty-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: white;\n}\n.ot-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 20px;\n}\n.ot-card-3d[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n  position: relative;\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  transform-style: preserve-3d;\n}\n.ot-card-3d[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 3px;\n  background: var(--card-color);\n  border-radius: 20px 20px 0 0;\n}\n.ot-card-3d[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px) perspective(800px) rotateX(2deg);\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06);\n}\n.ot-card-3d[_ngcontent-%COMP%]:hover   .card-glow[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.card-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -50%;\n  right: -50%;\n  width: 200%;\n  height: 200%;\n  background:\n    radial-gradient(\n      circle at 70% 30%,\n      var(--card-color) 0%,\n      transparent 60%);\n  opacity: 0;\n  transition: opacity 0.3s;\n  pointer-events: none;\n  mix-blend-mode: overlay;\n}\n.ot-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px 16px 0;\n}\n.ot-icon-3d[_ngcontent-%COMP%] {\n  width: 46px;\n  height: 46px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);\n  flex-shrink: 0;\n}\n.ot-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.ot-meta[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.ot-category-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 6px;\n  width: fit-content;\n}\n.ot-category-badge[data-cat=voucher][_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.12);\n  color: #3b82f6;\n}\n.ot-category-badge[data-cat=journal][_ngcontent-%COMP%] {\n  background: rgba(139, 92, 246, 0.12);\n  color: #8b5cf6;\n}\n.ot-category-badge[data-cat=collection][_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #22c55e;\n}\n.ot-category-badge[data-cat=delivery][_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n}\n.ot-type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-size: 10px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 5px;\n  background: rgba(0, 0, 0, 0.05);\n  color: var(--text-secondary, #64748b);\n  width: fit-content;\n}\n.ot-actions-top[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.ot-card-3d[_ngcontent-%COMP%]:hover   .ot-actions-top[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.ot-card-body[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n}\n.ot-name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 6px;\n  line-height: 1.4;\n}\n.ot-desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0 0 8px;\n  line-height: 1.6;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.ot-info-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-bottom: 8px;\n}\n.ot-info-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 8px;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  border: 1px solid var(--border-color, #e2e8f0);\n}\n.ot-info-chip[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.ot-info-chip.main-acc[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.08);\n  border-color: rgba(59, 130, 246, 0.2);\n  color: #3b82f6;\n}\n.ot-screens-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n  margin-bottom: 8px;\n}\n.ot-screens-row[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.screens-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.ot-flags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.flag-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 8px;\n  border-radius: 6px;\n}\n.flag-badge[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.flag-badge.attachment[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n}\n.flag-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(107, 114, 128, 0.1);\n  color: #6b7280;\n}\n.ot-accounts-section[_ngcontent-%COMP%] {\n  padding: 12px 16px 16px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.ot-accounts-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 8px;\n  cursor: pointer;\n  transition: color 0.2s;\n}\n.ot-accounts-header[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.ot-accounts-header[_ngcontent-%COMP%]   .expand-icon[_ngcontent-%COMP%] {\n  margin-right: auto;\n  font-size: 14px;\n}\n.ot-accounts-header[_ngcontent-%COMP%]:hover {\n  color: #3b82f6;\n}\n.linked-accounts-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.linked-account-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 8px;\n  background: var(--bg-card, white);\n  border: 1px solid var(--border-color, #e2e8f0);\n  color: var(--text-primary, #1e293b);\n}\n.linked-account-chip[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted, #94a3b8);\n}\n.more-accounts[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: #3b82f6;\n  padding: 4px 8px;\n  cursor: pointer;\n}\n.more-accounts[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.icon-btn.edit-btn[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.icon-btn.edit-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.1);\n}\n.icon-btn.delete-btn[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.icon-btn.delete-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-3d[_ngcontent-%COMP%] {\n  background: var(--bg-card, white);\n  border-radius: 24px;\n  width: 100%;\n  max-width: 600px;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.1);\n  animation: _ngcontent-%COMP%_slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(40px) scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.hiw-modal[_ngcontent-%COMP%] {\n  max-width: 560px;\n}\n.accounts-modal[_ngcontent-%COMP%] {\n  max-width: 680px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 20px 24px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.04),\n      rgba(99, 102, 241, 0.02));\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n  flex: 1;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  flex-shrink: 0;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 2px 0 0;\n}\n.modal-close[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: none;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.modal-close[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 20px 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  padding: 16px 24px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.hiw-body[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.hiw-section[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.hiw-section[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.hiw-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 10px;\n}\n.hiw-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #f59e0b;\n}\n.hiw-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.9;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.hiw-steps[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.hiw-step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.hiw-step[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-primary, #1e293b);\n}\n.hs-num[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  font-size: 12px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.wizard-modal[_ngcontent-%COMP%] {\n  background: var(--bg-card, white);\n  border-radius: 24px;\n  width: 100%;\n  max-width: 720px;\n  max-height: 92vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.1);\n  animation: _ngcontent-%COMP%_slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.wizard-header[_ngcontent-%COMP%] {\n  padding: 20px 24px 16px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.04),\n      rgba(99, 102, 241, 0.02));\n}\n.wizard-header-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.wizard-header-top[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n}\n.wizard-system-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 14px;\n  margin-bottom: 14px;\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.28);\n  background: rgba(239, 68, 68, 0.12);\n  color: #b91c1c;\n}\n.wizard-system-alert[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  margin-top: 2px;\n}\n.wsa-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 800;\n  margin-bottom: 2px;\n}\n.wsa-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  line-height: 1.5;\n  font-weight: 600;\n}\n.wizard-steps-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  overflow-x: auto;\n  padding-bottom: 4px;\n}\n.wstep[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 10px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.wstep.active[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  background: rgba(59, 130, 246, 0.08);\n}\n.wstep.active[_ngcontent-%COMP%]   .wstep-num[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);\n}\n.wstep.done[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.wstep.done[_ngcontent-%COMP%]   .wstep-num[_ngcontent-%COMP%] {\n  background: #22c55e;\n  color: white;\n}\n.wstep-num[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: var(--bg-surface, #f0f0f0);\n  color: var(--text-muted, #94a3b8);\n  font-size: 12px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: all 0.2s;\n}\n.wstep-line[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 2px;\n  background: var(--border-color, #e2e8f0);\n  flex-shrink: 0;\n  transition: background 0.2s;\n}\n.wstep-line.done[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.wizard-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.wizard-step[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n.step-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 17px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 8px;\n}\n.step-title[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: #3b82f6;\n}\n.step-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0 0 20px;\n  line-height: 1.7;\n}\n.step-hint[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--text-muted, #94a3b8);\n  margin: -8px 0 16px;\n  line-height: 1.5;\n}\n.step-hint[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n  opacity: 0.8;\n}\n.type-cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.type-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n  border-radius: 14px;\n  border: 2px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.25s;\n  position: relative;\n}\n.type-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--type-color, #3b82f6);\n  background: rgba(59, 130, 246, 0.02);\n  transform: translateX(-4px);\n}\n.type-card.selected[_ngcontent-%COMP%] {\n  border-color: var(--type-color, #3b82f6);\n  background: rgba(59, 130, 246, 0.04);\n  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);\n}\n.tc-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.tc-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: white;\n}\n.tc-body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.tc-body[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 4px;\n}\n.tc-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n  line-height: 1.6;\n}\n.tc-check[_ngcontent-%COMP%] {\n  font-size: 24px !important;\n  color: #22c55e;\n  flex-shrink: 0;\n}\n.method-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.method-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 8px;\n  padding: 20px 14px;\n  border-radius: 14px;\n  border: 2px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.25s;\n  position: relative;\n}\n.method-card[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  transform: translateY(-3px);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);\n}\n.method-card.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.04);\n  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);\n}\n.method-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n}\n.method-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n  line-height: 1.5;\n}\n.mc-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.1),\n      rgba(99, 102, 241, 0.08));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.mc-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #3b82f6;\n}\n.method-card.selected[_ngcontent-%COMP%]   .mc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\n}\n.method-card.selected[_ngcontent-%COMP%]   .mc-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: white;\n}\n.mc-check[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  left: 8px;\n  font-size: 20px !important;\n  color: #22c55e;\n}\n.source-info-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 14px 18px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border: 1px solid rgba(59, 130, 246, 0.15);\n  margin-bottom: 20px;\n}\n.source-info-banner[_ngcontent-%COMP%]    > .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: #f59e0b;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.source-info-banner[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 4px;\n}\n.source-info-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n  line-height: 1.7;\n}\n.source-accounts-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-height: 400px;\n  overflow-y: auto;\n}\n.source-acc-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 14px;\n  border: 2px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.25s;\n}\n.source-acc-item[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.02);\n  transform: translateX(-4px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n}\n.source-acc-item.selected[_ngcontent-%COMP%] {\n  border-color: #22c55e;\n  background: rgba(34, 197, 94, 0.04);\n  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.15);\n}\n.sai-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.1),\n      rgba(99, 102, 241, 0.08));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: all 0.25s;\n}\n.sai-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: #3b82f6;\n}\n.source-acc-item.selected[_ngcontent-%COMP%]   .sai-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #16a34a);\n  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);\n}\n.source-acc-item.selected[_ngcontent-%COMP%]   .sai-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: white;\n}\n.sai-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.sai-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n}\n.sai-sub[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n}\n.sai-station[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #3b82f6;\n  font-weight: 700;\n}\n.sai-check[_ngcontent-%COMP%] {\n  font-size: 24px !important;\n  color: #22c55e;\n  flex-shrink: 0;\n}\n.source-summary-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.08),\n      rgba(16, 185, 129, 0.06));\n  border: 1px solid rgba(34, 197, 94, 0.2);\n  color: #16a34a;\n  font-size: 13px;\n  font-weight: 700;\n  margin-bottom: 16px;\n}\n.source-summary-chip[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.source-summary-chip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: #15803d;\n}\n.source-chip[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.08) !important;\n  border-color: rgba(34, 197, 94, 0.2) !important;\n  color: #16a34a !important;\n}\n.source-chip[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #16a34a !important;\n}\n.wizard-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 14px;\n  border-radius: 12px;\n  background: var(--bg-surface, #f8fafc);\n  border: 1px solid var(--border-color, #e2e8f0);\n  margin-bottom: 20px;\n}\n.ws-item[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 12px;\n  border-radius: 8px;\n  background: var(--bg-card, white);\n  border: 1px solid var(--border-color, #e2e8f0);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.ws-item[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #3b82f6;\n}\n.ws-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n}\n.main-account-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-height: 400px;\n  overflow-y: auto;\n}\n.main-acc-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.main-acc-item[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.02);\n}\n.main-acc-item.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.06);\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);\n}\n.mai-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.1),\n      rgba(99, 102, 241, 0.08));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.mai-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #3b82f6;\n}\n.main-acc-item.selected[_ngcontent-%COMP%]   .mai-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.main-acc-item.selected[_ngcontent-%COMP%]   .mai-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: white;\n}\n.mai-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.mai-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.mai-type[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n  font-weight: 600;\n}\n.mai-check[_ngcontent-%COMP%] {\n  font-size: 22px !important;\n  color: #22c55e;\n  flex-shrink: 0;\n}\n.no-accounts-msg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 16px;\n  border-radius: 12px;\n  background: rgba(245, 158, 11, 0.08);\n  border: 1px solid rgba(245, 158, 11, 0.2);\n  color: #f59e0b;\n  font-size: 13px;\n  font-weight: 600;\n}\n.no-accounts-msg[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.acc-type-selector[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.acc-type-chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 8px;\n}\n.acc-type-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 7px 12px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-secondary, #64748b);\n  font-size: 12px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.acc-type-chip[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.acc-type-chip.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  border-color: transparent;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\n}\n.acc-type-chip.active[_ngcontent-%COMP%]   .atc-count[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.25);\n}\n.acc-type-chip[_ngcontent-%COMP%]:not(.active):hover {\n  border-color: #3b82f6;\n  color: #3b82f6;\n}\n.atc-count[_ngcontent-%COMP%] {\n  font-size: 10px;\n  background: rgba(0, 0, 0, 0.06);\n  border-radius: 5px;\n  padding: 1px 5px;\n}\n.counter-accounts-section[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.cas-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 10px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.btn-select-all[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 5px 12px;\n  border-radius: 8px;\n  border: 1px solid rgba(59, 130, 246, 0.3);\n  background: rgba(59, 130, 246, 0.08);\n  color: #3b82f6;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-select-all[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.btn-select-all[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.15);\n}\n.counter-accounts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 6px;\n  max-height: 280px;\n  overflow-y: auto;\n  padding: 2px;\n}\n.cai-details[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.cai-sub-info[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 500;\n  opacity: 0.7;\n}\n.counter-acc-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.counter-acc-item[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n}\n.counter-acc-item.selected[_ngcontent-%COMP%] {\n  border-color: #22c55e;\n  background: rgba(34, 197, 94, 0.04);\n}\n.cai-icon[_ngcontent-%COMP%] {\n  font-size: 20px !important;\n  color: var(--text-muted, #94a3b8);\n  flex-shrink: 0;\n}\n.counter-acc-item.selected[_ngcontent-%COMP%]   .cai-icon[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.cai-name[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.cai-type[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 10px;\n  font-weight: 700;\n  color: #3b82f6;\n  background: rgba(59, 130, 246, 0.08);\n  padding: 2px 8px;\n  border-radius: 6px;\n  white-space: nowrap;\n  flex-shrink: 0;\n  margin-inline-start: auto;\n}\n.cai-type[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.selected-accounts-summary[_ngcontent-%COMP%] {\n  padding: 14px;\n  border-radius: 12px;\n  border: 1.5px solid rgba(34, 197, 94, 0.2);\n  background: rgba(34, 197, 94, 0.04);\n}\n.selected-accounts-summary[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 800;\n  color: #22c55e;\n  margin: 0 0 10px;\n}\n.selected-accounts-summary[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.selected-accounts-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.sel-acc-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 8px;\n  background: var(--bg-card, white);\n  border: 1px solid var(--border-color, #e2e8f0);\n  font-size: 11px;\n  font-weight: 700;\n}\n.sac-type[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  font-size: 10px;\n  padding: 1px 5px;\n  border-radius: 4px;\n  background: rgba(59, 130, 246, 0.1);\n}\n.sac-name[_ngcontent-%COMP%] {\n  color: var(--text-primary, #1e293b);\n}\n.sac-remove[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: none;\n  background: transparent;\n  color: #ef4444;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  transition: background 0.2s;\n}\n.sac-remove[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.sac-remove[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.screen-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.screen-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.screen-option[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n}\n.screen-option.selected[_ngcontent-%COMP%] {\n  border-color: #22c55e;\n  background: rgba(34, 197, 94, 0.04);\n}\n.so-icon[_ngcontent-%COMP%] {\n  font-size: 22px !important;\n  color: var(--text-muted, #94a3b8);\n  flex-shrink: 0;\n}\n.screen-option.selected[_ngcontent-%COMP%]   .so-icon[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.so-body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.so-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.so-label[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #3b82f6;\n}\n.so-desc[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n  font-weight: 600;\n  margin-top: 2px;\n}\n.required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.form-row.flags-row[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr 1fr;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 6px;\n}\n.form-input[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 14px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\ntextarea.form-input[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 60px;\n}\n.icon-picker[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.icon-option[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-option[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--text-secondary, #64748b);\n}\n.icon-option.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.1);\n}\n.icon-option.selected[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.icon-option[_ngcontent-%COMP%]:hover:not(.selected) {\n  border-color: #94a3b8;\n}\n.color-picker[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.color-dot[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.color-dot.selected[_ngcontent-%COMP%] {\n  border-color: var(--text-primary, #1e293b);\n  transform: scale(1.2);\n}\n.color-dot[_ngcontent-%COMP%]:hover:not(.selected) {\n  transform: scale(1.1);\n}\n.toggle-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  transition: all 0.2s;\n}\n.toggle-label[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n}\n.toggle-switch[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 24px;\n  border-radius: 12px;\n  background: #cbd5e1;\n  position: relative;\n  transition: all 0.3s;\n  flex-shrink: 0;\n}\n.toggle-switch.on[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.toggle-switch.on[_ngcontent-%COMP%]   .toggle-knob[_ngcontent-%COMP%] {\n  transform: translateX(-20px);\n}\n.toggle-knob[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 3px;\n  right: 3px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: white;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.wizard-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.linked-accounts-full[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.no-linked[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 16px;\n  border-radius: 12px;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-muted, #94a3b8);\n  font-size: 13px;\n  font-weight: 600;\n}\n.no-linked[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.la-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  margin-bottom: 6px;\n  background: var(--bg-card, white);\n  transition: all 0.2s;\n}\n.la-row[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n}\n.la-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.la-icon[_ngcontent-%COMP%] {\n  font-size: 20px !important;\n  color: #3b82f6;\n}\n.la-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.la-account-name[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n  font-weight: 600;\n}\n.perm-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 6px;\n}\n.perm-badge[data-perm=both][_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #22c55e;\n}\n.perm-badge[data-perm=receive_only][_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.12);\n  color: #3b82f6;\n}\n.perm-badge[data-perm=pay_only][_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n  }\n  .ot-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-row.flags-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .method-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .counter-accounts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .wizard-modal[_ngcontent-%COMP%] {\n    max-width: 100%;\n    border-radius: 16px;\n  }\n  .wizard-steps-bar[_ngcontent-%COMP%] {\n    gap: 0;\n  }\n}\n/*# sourceMappingURL=operation-types.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OperationTypesComponent, [{
    type: Component,
    args: [{ selector: "app-operation-types", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-container">\r
\r
  <!-- ===== Page Header ===== -->\r
  <div class="page-header">\r
    <div class="header-left">\r
      <div class="page-icon-3d">\r
        <span class="material-icons-round">auto_awesome</span>\r
      </div>\r
      <div>\r
        <h1 class="page-title">\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A (\u0627\u0644\u0642\u0648\u0627\u0644\u0628)</h1>\r
        <p class="page-subtitle">\u0642\u0648\u0627\u0644\u0628 \u062C\u0627\u0647\u0632\u0629 \u0645\u0642\u064A\u062F\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644 - \u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u0639\u0628\u0651\u064A \u0627\u0644\u0645\u0628\u0644\u063A \u0648\u0627\u062D\u0641\u0638</p>\r
      </div>\r
    </div>\r
    <div class="header-right">\r
      <button class="help-btn" (click)="showHowItWorks.set(true)" title="\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F">\r
        <span class="material-icons-round">help_outline</span>\r
      </button>\r
      @if (activeTab() === 'templates') {\r
        <button class="btn-3d btn-secondary" (click)="loadStats()" title="\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645">\r
          <span class="material-icons-round">analytics</span>\r
          \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A\r
        </button>\r
        <button class="btn-3d btn-primary" (click)="openWizard()">\r
          <span class="material-icons-round">add</span>\r
          \u0642\u0627\u0644\u0628 \u062C\u062F\u064A\u062F\r
        </button>\r
      }\r
      @if (activeTab() === 'categories') {\r
        <button class="btn-3d btn-primary" (click)="openCategoryForm()">\r
          <span class="material-icons-round">add</span>\r
          \u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F\r
        </button>\r
      }\r
    </div>\r
  </div>\r
\r
  <!-- ===== Alerts ===== -->\r
  @if (error()) {\r
    <div class="alert-error" (click)="error.set('')">\r
      <span class="material-icons-round">error_outline</span>\r
      {{ error() }}\r
      <span class="close-x">\u2715</span>\r
    </div>\r
  }\r
  @if (success()) {\r
    <div class="alert-success" (click)="success.set('')">\r
      <span class="material-icons-round">check_circle</span>\r
      {{ success() }}\r
    </div>\r
  }\r
\r
  <!-- ===== \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629: \u0627\u0644\u0642\u0648\u0627\u0644\u0628 | \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A ===== -->\r
  <div class="main-tabs-bar">\r
    <button class="main-tab" [class.active]="activeTab() === 'templates'" (click)="switchTab('templates')">\r
      <span class="material-icons-round">receipt_long</span>\r
      \u0627\u0644\u0642\u0648\u0627\u0644\u0628\r
      <span class="cat-count">{{ operationTypes().length }}</span>\r
    </button>\r
    <button class="main-tab" [class.active]="activeTab() === 'categories'" (click)="switchTab('categories')">\r
      <span class="material-icons-round">folder</span>\r
      \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A\r
      <span class="cat-count">{{ dynamicCategories().length }}</span>\r
    </button>\r
  </div>\r
\r
  <!-- ===== Loading ===== -->\r
  @if (loading()) {\r
    <div class="loading-grid">\r
      @for (i of [1,2,3,4,5,6]; track i) {\r
        <div class="skeleton-card"></div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- ============================================================ -->\r
  <!-- =================== \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A ======================== -->\r
  <!-- ============================================================ -->\r
  @if (!loading() && activeTab() === 'categories') {\r
    @if (categoryDetails().length === 0) {\r
      <div class="empty-state">\r
        <div class="empty-icon-3d">\r
          <span class="material-icons-round">folder_open</span>\r
        </div>\r
        <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0646\u064A\u0641\u0627\u062A</h3>\r
        <p>\u0623\u0646\u0634\u0626 \u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0644\u062A\u0646\u0638\u064A\u0645 \u0642\u0648\u0627\u0644\u0628 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629 (\u0645\u062B\u0644: \u062A\u062D\u0635\u064A\u0644\u060C \u062A\u0648\u0631\u064A\u062F\u060C \u0633\u0646\u062F\u0627\u062A\u060C \u0642\u064A\u0648\u062F)</p>\r
        <button class="btn-3d btn-primary" (click)="openCategoryForm()">\r
          <span class="material-icons-round">add</span>\r
          \u0623\u0646\u0634\u0626 \u0623\u0648\u0644 \u062A\u0635\u0646\u064A\u0641\r
        </button>\r
      </div>\r
    } @else {\r
      <div class="categories-grid">\r
        @for (cat of categoryDetails(); track cat.name) {\r
          <div class="ot-card-3d category-card-item" [style.--card-color]="cat.color">\r
            <div class="card-glow"></div>\r
            <div class="ot-card-header">\r
              <div class="ot-icon-3d" [style.background]="cat.color">\r
                <span class="material-icons-round">{{ cat.icon }}</span>\r
              </div>\r
              <div class="ot-meta"></div>\r
              <div class="ot-actions-top">\r
                <button class="icon-btn edit-btn" (click)="editCategory(cat.name)" title="\u062A\u0639\u062F\u064A\u0644">\r
                  <span class="material-icons-round">edit</span>\r
                </button>\r
                <button class="icon-btn delete-btn" (click)="deleteCategory(cat.name)" title="\u062D\u0630\u0641">\r
                  <span class="material-icons-round">delete</span>\r
                </button>\r
              </div>\r
            </div>\r
            <div class="ot-card-body">\r
              <h3 class="ot-name">{{ cat.name }}</h3>\r
              <div class="ot-info-row">\r
                @if (cat.code) {\r
                  <div class="ot-info-chip">\r
                    <span class="material-icons-round">tag</span>\r
                    {{ cat.code }}\r
                  </div>\r
                }\r
                @if (cat.sequenceNumber) {\r
                  <div class="ot-info-chip">\r
                    <span class="material-icons-round">format_list_numbered</span>\r
                    #{{ cat.sequenceNumber }}\r
                  </div>\r
                }\r
              </div>\r
              <p class="ot-desc">{{ cat.count }} \u0642\u0627\u0644\u0628 \u0645\u0631\u062A\u0628\u0637</p>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    }\r
  }\r
\r
  <!-- ============================================================ -->\r
  <!-- =================== \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u0642\u0648\u0627\u0644\u0628 ========================== -->\r
  <!-- ============================================================ -->\r
  @if (!loading() && activeTab() === 'templates') {\r
    <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u0628\u062D\u062B -->\r
    <div class="search-bar-row">\r
      <div class="search-input-wrapper">\r
        <span class="material-icons-round">search</span>\r
        <input type="text" placeholder="\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0644\u0628..." [value]="searchQuery()" (input)="searchQuery.set($any($event.target).value)">\r
        @if (searchQuery()) {\r
          <button class="clear-search" (click)="searchQuery.set('')">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        }\r
      </div>\r
      <span class="results-count">{{ filteredTypes().length }} \u0642\u0627\u0644\u0628</span>\r
    </div>\r
\r
    <!-- \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0641\u0626\u0627\u062A -->\r
    @if (categoryFilters().length > 1) {\r
      <div class="category-tabs">\r
        @for (cat of categoryFilters(); track cat.value) {\r
          <button class="cat-tab" [class.active]="activeCategory() === cat.value"\r
                  (click)="activeCategory.set(cat.value)">\r
            <span class="material-icons-round">{{ cat.icon }}</span>\r
            {{ cat.label }}\r
            @if (cat.value !== 'all') {\r
              <span class="cat-count">{{ countByCategory(cat.value) }}</span>\r
            }\r
          </button>\r
        }\r
      </div>\r
    }\r
\r
    @if (filteredTypes().length === 0) {\r
      <div class="empty-state">\r
        <div class="empty-icon-3d">\r
          <span class="material-icons-round">auto_awesome</span>\r
        </div>\r
        <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u0648\u0627\u0644\u0628 \u0628\u0639\u062F</h3>\r
        @if (dynamicCategories().length === 0) {\r
          <p>\u0623\u0646\u0634\u0626 \u062A\u0635\u0646\u064A\u0641\u0627\u064B \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u062A\u0628\u0648\u064A\u0628 "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A" \u062B\u0645 \u0623\u0636\u0641 \u0642\u0648\u0627\u0644\u0628</p>\r
          <button class="btn-3d btn-primary" (click)="switchTab('categories')">\r
            <span class="material-icons-round">folder</span>\r
            \u0627\u0646\u062A\u0642\u0644 \u0644\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A\r
          </button>\r
        } @else {\r
          <p>\u0623\u0646\u0634\u0626 \u0642\u0627\u0644\u0628 \u062C\u062F\u064A\u062F \u0628\u062E\u0637\u0648\u0627\u062A \u0628\u0633\u064A\u0637\u0629 \u0644\u062A\u0646\u0638\u064A\u0645 \u0639\u0645\u0644\u064A\u0627\u062A\u0643 \u0627\u0644\u0645\u0627\u0644\u064A\u0629</p>\r
          <button class="btn-3d btn-primary" (click)="openWizard()">\r
            <span class="material-icons-round">add</span>\r
            \u0623\u0646\u0634\u0626 \u0623\u0648\u0644 \u0642\u0627\u0644\u0628\r
          </button>\r
        }\r
      </div>\r
    } @else {\r
      <!-- Group by category -->\r
      @for (group of groupedByCategory(); track group.category) {\r
        <div class="category-group">\r
          <div class="category-group-header">\r
            <span class="material-icons-round">{{ getCategoryIcon(group.category) }}</span>\r
            <h2>{{ group.category }}</h2>\r
            <span class="cat-count">{{ group.items.length }}</span>\r
          </div>\r
          <div class="ot-grid">\r
            @for (ot of group.items; track ot.id) {\r
              <div class="ot-card-3d" [style.--card-color]="ot.color">\r
                <div class="card-glow"></div>\r
\r
                <!-- Card Header -->\r
                <div class="ot-card-header">\r
                  <div class="ot-icon-3d" [style.background]="ot.color">\r
                    <span class="material-icons-round">{{ ot.icon }}</span>\r
                  </div>\r
                  <div class="ot-meta">\r
                    @if (ot.voucherType) {\r
                      <span class="ot-type-badge" [attr.data-vtype]="ot.voucherType">{{ getVoucherTypeLabel(ot.voucherType) }}</span>\r
                    }\r
                  </div>\r
                  <div class="ot-actions-top">\r
                    <button class="icon-btn" (click)="cloneOT(ot)" title="\u0646\u0633\u062E \u0627\u0644\u0642\u0627\u0644\u0628">\r
                      <span class="material-icons-round">content_copy</span>\r
                    </button>\r
                    <button class="icon-btn" [class.active-toggle]="ot.isActive" (click)="toggleOT(ot)" [title]="ot.isActive ? '\u062A\u0639\u0637\u064A\u0644' : '\u062A\u0641\u0639\u064A\u0644'">\r
                      <span class="material-icons-round">{{ ot.isActive ? 'toggle_on' : 'toggle_off' }}</span>\r
                    </button>\r
                    <button class="icon-btn edit-btn" (click)="openEditWizard(ot)" title="\u062A\u0639\u062F\u064A\u0644">\r
                      <span class="material-icons-round">edit</span>\r
                    </button>\r
                    <button class="icon-btn delete-btn" (click)="deleteOT(ot.id)" title="\u062D\u0630\u0641">\r
                      <span class="material-icons-round">delete</span>\r
                    </button>\r
                  </div>\r
                </div>\r
\r
                <!-- Card Body -->\r
                <div class="ot-card-body">\r
                  <h3 class="ot-name">{{ ot.name }}</h3>\r
                  @if (ot.description) {\r
                    <p class="ot-desc">{{ ot.description }}</p>\r
                  }\r
\r
                  <!-- Info Row -->\r
                  <div class="ot-info-row">\r
                    @if (ot.code) {\r
                      <div class="ot-info-chip">\r
                        <span class="material-icons-round">tag</span>\r
                        {{ ot.code }}\r
                      </div>\r
                    } @else if (ot.sequenceNumber) {\r
                      <div class="ot-info-chip">\r
                        <span class="material-icons-round">tag</span>\r
                        #{{ ot.sequenceNumber }}\r
                      </div>\r
                    }\r
                    @if (ot.paymentMethod) {\r
                      <div class="ot-info-chip">\r
                        <span class="material-icons-round">payments</span>\r
                        {{ getPaymentMethodLabel(ot.paymentMethod) }}\r
                      </div>\r
                    }\r
                    @if (ot.sourceAccountId || ot.sourceFundId) {\r
                      <div class="ot-info-chip source-chip">\r
                        <span class="material-icons-round">account_balance_wallet</span>\r
                        {{ getSourceLabel(ot) }}\r
                      </div>\r
                    }\r
                  </div>\r
\r
                  <!-- Flags -->\r
                  <div class="ot-flags">\r
                    @if (ot.requiresAttachment) {\r
                      <span class="flag-badge attachment">\r
                        <span class="material-icons-round">attach_file</span>\r
                        \u0645\u0631\u0641\u0642\r
                      </span>\r
                    }\r
                    @if (!ot.isActive) {\r
                      <span class="flag-badge inactive">\r
                        <span class="material-icons-round">pause_circle</span>\r
                        \u0645\u0648\u0642\u0648\u0641\r
                      </span>\r
                    }\r
                  </div>\r
                </div>\r
\r
                <!-- Linked Accounts -->\r
                <div class="ot-accounts-section">\r
                  <div class="ot-accounts-header" (click)="openAccountsView(ot)">\r
                    <span class="material-icons-round">link</span>\r
                    <span>\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 ({{ ot.linkedAccounts?.length || 0 }})</span>\r
                    <span class="material-icons-round expand-icon">open_in_new</span>\r
                  </div>\r
                  @if (ot.linkedAccounts && ot.linkedAccounts.length > 0) {\r
                    <div class="linked-accounts-list">\r
                      @for (la of ot.linkedAccounts.slice(0, 4); track la.id) {\r
                        <div class="linked-account-chip">\r
                          <span class="material-icons-round">person</span>\r
                          <span>{{ la.label || la.accountName }}</span>\r
                        </div>\r
                      }\r
                      @if (ot.linkedAccounts.length > 4) {\r
                        <div class="more-accounts" (click)="openAccountsView(ot)">+{{ ot.linkedAccounts.length - 4 }} \u0623\u0643\u062B\u0631</div>\r
                      }\r
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
\r
  <!-- ============================================================ -->\r
  <!-- ========= \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0646\u064A\u0641 (Modal) ================= -->\r
  <!-- ============================================================ -->\r
  @if (showCategoryForm()) {\r
    <div class="modal-overlay" (click)="closeCategoryForm()">\r
      <div class="modal-3d" style="max-width: 480px" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-icon" style="background: #3b82f6">\r
            <span class="material-icons-round">{{ editingCategoryOld() ? 'edit' : 'create_new_folder' }}</span>\r
          </div>\r
          <h2>{{ editingCategoryOld() ? '\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0646\u064A\u0641' : '\u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F' }}</h2>\r
          <button class="modal-close" (click)="closeCategoryForm()">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-group">\r
            <label class="form-label">\u0627\u0633\u0645 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 <span class="required">*</span></label>\r
            <input class="form-input" type="text" placeholder="\u0645\u062B\u0627\u0644: \u062A\u062D\u0635\u064A\u0644\u060C \u062A\u0648\u0631\u064A\u062F\u060C \u0633\u0646\u062F\u0627\u062A\u060C \u0642\u064A\u0648\u062F"\r
                   [value]="newCategoryName()" (input)="newCategoryName.set($any($event.target).value)">\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
            <div class="icon-picker">\r
              @for (ic of categoryIcons; track ic) {\r
                <button class="icon-option" [class.selected]="newCategoryIcon() === ic" (click)="newCategoryIcon.set(ic)">\r
                  <span class="material-icons-round">{{ ic }}</span>\r
                </button>\r
              }\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label class="form-label">\u0627\u0644\u0644\u0648\u0646</label>\r
            <div class="color-picker">\r
              @for (c of colors; track c) {\r
                <button class="color-dot" [class.selected]="newCategoryColor() === c"\r
                        [style.background]="c" (click)="newCategoryColor.set(c)">\r
                </button>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-3d btn-ghost" (click)="closeCategoryForm()">\u0625\u0644\u063A\u0627\u0621</button>\r
          <button class="btn-3d btn-primary" (click)="saveCategory()" [disabled]="saving() || !newCategoryName().trim()">\r
            <span class="material-icons-round">{{ saving() ? 'sync' : 'save' }}</span>\r
            {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : (editingCategoryOld() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644' : '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0635\u0646\u064A\u0641') }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ============================================================ -->\r
  <!-- ========= WIZARD \u0625\u0646\u0634\u0627\u0621/\u062A\u0639\u062F\u064A\u0644 \u0642\u0627\u0644\u0628 (6 \u062E\u0637\u0648\u0627\u062A) =============== -->\r
  <!-- ============================================================ -->\r
  @if (showWizard()) {\r
    <div class="modal-overlay" (click)="showWizard.set(false)">\r
      <div class="wizard-modal" (click)="$event.stopPropagation()">\r
\r
        <!-- Wizard Header -->\r
        <div class="wizard-header">\r
          <div class="wizard-header-top">\r
            <h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628' : '\u0625\u0646\u0634\u0627\u0621 \u0642\u0627\u0644\u0628 \u062C\u062F\u064A\u062F' }}</h2>\r
            <button class="modal-close" (click)="showWizard.set(false)">\r
              <span class="material-icons-round">close</span>\r
            </button>\r
          </div>\r
\r
          <!-- Step Indicators - Dynamic -->\r
          <div class="wizard-steps-bar">\r
            @for (step of getStepLabels(); track step.num; let last = $last) {\r
              <div class="wstep"\r
                   [class.active]="wizardStep() === step.num"\r
                   [class.done]="wizardStep() > step.num"\r
                   (click)="step.num < wizardStep() ? wizardStep.set(step.num) : null">\r
                <div class="wstep-num">{{ step.num }}</div>\r
                <span>{{ step.label }}</span>\r
              </div>\r
              @if (!last) {\r
                <div class="wstep-line" [class.done]="wizardStep() > step.num"></div>\r
              }\r
            }\r
          </div>\r
        </div>\r
\r
        <!-- Wizard Body -->\r
        <div class="wizard-body">\r
          @if (wizardSystemMessage()) {\r
            <div class="wizard-system-alert" role="alert" aria-live="assertive">\r
              <span class="material-icons-round">campaign</span>\r
              <div class="wsa-text">\r
                <strong>\u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u0646\u0638\u0627\u0645</strong>\r
                <p>{{ wizardSystemMessage() }}</p>\r
              </div>\r
            </div>\r
          }\r
\r
          <!-- ===== \u0645\u062D\u062A\u0648\u0649: \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 ===== -->\r
          @if (getContentType() === 'category') {\r
            <div class="wizard-step">\r
              <h3 class="step-title">\r
                <span class="material-icons-round">folder</span>\r
                \u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\r
              </h3>\r
              <p class="step-desc">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0630\u064A \u064A\u0646\u062A\u0645\u064A \u0625\u0644\u064A\u0647 \u0647\u0630\u0627 \u0627\u0644\u0642\u0627\u0644\u0628</p>\r
\r
              @if (dynamicCategories().length === 0) {\r
                <div class="no-accounts-msg">\r
                  <span class="material-icons-round">info</span>\r
                  \u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0635\u0646\u064A\u0641\u0627\u062A. \u0623\u0646\u0634\u0626 \u062A\u0635\u0646\u064A\u0641\u0627\u064B \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u062A\u0628\u0648\u064A\u0628 "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A".\r
                </div>\r
              } @else {\r
                <div class="type-cards">\r
                  @for (cat of dynamicCategories(); track cat.id) {\r
                    <div class="type-card" [class.selected]="wiz().categoryId === cat.id"\r
                         (click)="selectCategory(cat)">\r
                      <div class="tc-icon" [style.background]="cat.color">\r
                        <span class="material-icons-round">{{ cat.icon }}</span>\r
                      </div>\r
                      <div class="tc-body">\r
                        <strong>{{ cat.name }}</strong>\r
                        <p>{{ cat.count }} \u0642\u0627\u0644\u0628</p>\r
                      </div>\r
                      @if (wiz().categoryId === cat.id) {\r
                        <span class="material-icons-round tc-check">check_circle</span>\r
                      }\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          <!-- ===== \u0645\u062D\u062A\u0648\u0649: \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F ===== -->\r
          @if (getContentType() === 'voucherType') {\r
            <div class="wizard-step">\r
              <h3 class="step-title">\r
                <span class="material-icons-round">description</span>\r
                \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F\r
              </h3>\r
              <p class="step-desc">\u0627\u062E\u062A\u0631 \u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0642\u0627\u0644\u0628 - \u0647\u0644 \u0647\u0648 \u0633\u0646\u062F \u0642\u0628\u0636\u060C \u0633\u0646\u062F \u0635\u0631\u0641\u060C \u0623\u0648 \u0642\u064A\u062F \u0645\u062D\u0627\u0633\u0628\u064A\u061F</p>\r
\r
              <div class="type-cards">\r
                @for (opt of operationTypeOptions; track opt.value) {\r
                  <div class="type-card" [class.selected]="wiz().voucherType === opt.value"\r
                       [style.--type-color]="opt.color"\r
                       (click)="selectVoucherType(opt.value)">\r
                    <div class="tc-icon" [style.background]="opt.color">\r
                      <span class="material-icons-round">{{ opt.icon }}</span>\r
                    </div>\r
                    <div class="tc-body">\r
                      <strong>{{ opt.label }}</strong>\r
                      <p>{{ opt.desc }}</p>\r
                    </div>\r
                    @if (wiz().voucherType === opt.value) {\r
                      <span class="material-icons-round tc-check">check_circle</span>\r
                    }\r
                  </div>\r
                }\r
              </div>\r
            </div>\r
          }\r
\r
          <!-- ===== \u0645\u062D\u062A\u0648\u0649: \u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062F\u0641\u0639 (\u0641\u0642\u0637 \u0644\u0644\u0642\u0628\u0636 \u0648\u0627\u0644\u0635\u0631\u0641) ===== -->\r
          @if (getContentType() === 'paymentMethod') {\r
            <div class="wizard-step">\r
              <h3 class="step-title">\r
                <span class="material-icons-round">payments</span>\r
                \u0648\u0633\u064A\u0644\u0629 {{ wiz().voucherType === 'receipt' ? '\u0627\u0644\u0642\u0628\u0636' : '\u0627\u0644\u0635\u0631\u0641' }}\r
              </h3>\r
              <p class="step-desc">\u0643\u064A\u0641 \u064A\u062A\u0645 {{ wiz().voucherType === 'receipt' ? '\u0627\u0633\u062A\u0644\u0627\u0645' : '\u0635\u0631\u0641' }} \u0627\u0644\u0623\u0645\u0648\u0627\u0644\u061F</p>\r
\r
              <div class="method-cards">\r
                @for (pm of paymentMethods; track pm.value) {\r
                  <div class="method-card" [class.selected]="wiz().paymentMethod === pm.value"\r
                       (click)="selectPaymentMethod(pm.value)">\r
                    <div class="mc-icon">\r
                      <span class="material-icons-round">{{ pm.icon }}</span>\r
                    </div>\r
                    <strong>{{ pm.label }}</strong>\r
                    <p>{{ pm.desc }}</p>\r
                    @if (wiz().paymentMethod === pm.value) {\r
                      <span class="material-icons-round mc-check">check_circle</span>\r
                    }\r
                  </div>\r
                }\r
              </div>\r
            </div>\r
          }\r
\r
          <!-- ===== \u0645\u062D\u062A\u0648\u0649: \u0627\u0644\u0645\u0635\u062F\u0631 - \u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644 (\u0641\u0642\u0637 \u0644\u0644\u0642\u0628\u0636 \u0648\u0627\u0644\u0635\u0631\u0641) ===== -->\r
          @if (getContentType() === 'source') {\r
            <div class="wizard-step">\r
              <h3 class="step-title">\r
                <span class="material-icons-round">{{ getPaymentMethodIcon() }}</span>\r
                \u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644 (\u0627\u0644\u0645\u0635\u062F\u0631)\r
              </h3>\r
              <p class="step-desc">\r
                \u0627\u062E\u062A\u0631 {{ wiz().paymentMethod === 'cash' ? '\u0627\u0644\u0635\u0646\u062F\u0648\u0642' : (wiz().paymentMethod === 'bank' ? '\u0627\u0644\u0628\u0646\u0643' : (wiz().paymentMethod === 'exchange' ? '\u0627\u0644\u0635\u0631\u0627\u0641' : '\u0627\u0644\u0645\u062D\u0641\u0638\u0629')) }}\r
                \u0627\u0644\u0630\u064A {{ wiz().voucherType === 'receipt' ? '\u064A\u0633\u062A\u0642\u0628\u0644' : '\u064A\u0635\u0631\u0641 \u0645\u0646' }}\u0647 \u0627\u0644\u0645\u0628\u0644\u063A\r
              </p>\r
\r
              <!-- \u0628\u0637\u0627\u0642\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 -->\r
              <div class="source-info-banner">\r
                <span class="material-icons-round">lightbulb</span>\r
                <div>\r
                  <strong>\u0645\u0627 \u0647\u0648 \u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644\u061F</strong>\r
                  <p>\u0647\u0648 {{ wiz().paymentMethod === 'cash' ? '\u0627\u0644\u0635\u0646\u062F\u0648\u0642' : (wiz().paymentMethod === 'bank' ? '\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0628\u0646\u0643\u064A' : (wiz().paymentMethod === 'exchange' ? '\u062D\u0633\u0627\u0628 \u0627\u0644\u0635\u0631\u0627\u0641' : '\u0627\u0644\u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629')) }}\r
                  \u0627\u0644\u0630\u064A \u064A\u0646\u0641\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629. \u0645\u062B\u0644\u0627\u064B: "\u0635\u0646\u062F\u0648\u0642 \u0645\u062D\u0637\u0629 \u0627\u0644\u062F\u0647\u0645\u064A\u0629" \u0623\u0648 "\u0628\u0646\u0643 \u0627\u0644\u0623\u0647\u0644\u064A".</p>\r
                </div>\r
              </div>\r
\r
              @if (sourceAccounts().length === 0) {\r
                <div class="no-accounts-msg">\r
                  <span class="material-icons-round">info</span>\r
                  \u0644\u0627 \u062A\u0648\u062C\u062F {{ wiz().paymentMethod === 'cash' ? '\u0635\u0646\u0627\u062F\u064A\u0642' : '\u062D\u0633\u0627\u0628\u0627\u062A' }} \u0645\u062A\u0627\u062D\u0629. \u0623\u0636\u0641\u0647\u0627 \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629.\r
                </div>\r
              } @else {\r
                <div class="source-accounts-list">\r
                  @for (src of sourceAccounts(); track src.id) {\r
                    <div class="source-acc-item" [class.selected]="isSourceSelected(src)"\r
                         (click)="selectSource(src)">\r
                      <div class="sai-icon">\r
                        <span class="material-icons-round">{{ src.icon }}</span>\r
                      </div>\r
                      <div class="sai-info">\r
                        <strong>{{ src.name }}</strong>\r
                        @if (src.subInfo) {\r
                          <span class="sai-sub">{{ src.subInfo }}</span>\r
                        }\r
                        @if (src.stationName) {\r
                          <span class="sai-station">{{ src.stationName }}</span>\r
                        }\r
                      </div>\r
                      @if (isSourceSelected(src)) {\r
                        <span class="material-icons-round sai-check">check_circle</span>\r
                      }\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          <!-- ===== \u0645\u062D\u062A\u0648\u0649: \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 (\u0644\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0646\u064A\u0629) ===== -->\r
          @if (getContentType() === 'warehouse') {\r
            <div class="wizard-step">\r
              <h3 class="step-title">\r
                <span class="material-icons-round">warehouse</span>\r
                \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u062E\u0632\u0646\r
              </h3>\r
              <p class="step-desc">\r
                @if (wiz().voucherType === 'supply_invoice' || wiz().voucherType === 'supply_order') {\r
                  \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0630\u064A \u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0648\u0631\u064A\u062F \u0625\u0644\u064A\u0647\r
                } @else if (wiz().voucherType === 'dispatch') {\r
                  \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0630\u064A \u0633\u064A\u062A\u0645 \u0627\u0644\u0635\u0631\u0641 \u0645\u0646\u0647\r
                } @else if (wiz().voucherType === 'transfer_out') {\r
                  \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0645\u0635\u062F\u0631 \u0644\u0644\u062A\u062D\u0648\u064A\u0644\r
                } @else {\r
                  \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0644\u0647\u0630\u0627 \u0627\u0644\u0642\u0627\u0644\u0628\r
                }\r
              </p>\r
\r
              <!-- \u0628\u0637\u0627\u0642\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 -->\r
              <div class="source-info-banner">\r
                <span class="material-icons-round">lightbulb</span>\r
                <div>\r
                  <strong>\u0645\u0627 \u0647\u0648 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u061F</strong>\r
                  <p>\u0647\u0648 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0630\u064A \u0633\u064A\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0646\u062F \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0647\u0630\u0627 \u0627\u0644\u0642\u0627\u0644\u0628. \u064A\u0645\u0643\u0646 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u062A\u063A\u064A\u064A\u0631\u0647 \u0639\u0646\u062F \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629.</p>\r
                </div>\r
              </div>\r
\r
              @if (sourceWarehouses().length === 0) {\r
                <div class="no-accounts-msg">\r
                  <span class="material-icons-round">info</span>\r
                  \u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0632\u0646 \u0645\u062A\u0627\u062D\u0629. \u0623\u0636\u0641 \u0645\u062E\u0627\u0632\u0646 \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u0635\u0641\u062D\u0629 \u0627\u0644\u0645\u062E\u0627\u0632\u0646.\r
                </div>\r
              } @else {\r
                <div class="source-accounts-list">\r
                  @for (wh of sourceWarehouses(); track wh.id) {\r
                    <div class="source-acc-item" [class.selected]="wiz().sourceWarehouseId === wh.id"\r
                         (click)="selectWarehouse(wh)">\r
                      <div class="sai-icon" style="background: #06b6d4">\r
                        <span class="material-icons-round">warehouse</span>\r
                      </div>\r
                      <div class="sai-info">\r
                        <strong>{{ wh.name }}</strong>\r
                        @if (wh.compositeCode) {\r
                          <span class="sai-sub">{{ wh.compositeCode }}</span>\r
                        }\r
                        @if (wh.location) {\r
                          <span class="sai-station">{{ wh.location }}</span>\r
                        }\r
                      </div>\r
                      @if (wiz().sourceWarehouseId === wh.id) {\r
                        <span class="material-icons-round sai-check">check_circle</span>\r
                      }\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          <!-- ===== \u0645\u062D\u062A\u0648\u0649: \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 (\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u062B\u0627\u0646\u064A) ===== -->\r
          @if (getContentType() === 'accounts') {\r
            <div class="wizard-step">\r
              <h3 class="step-title">\r
                <span class="material-icons-round">group</span>\r
                {{ wiz().voucherType === 'journal' ? '\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0642\u064A\u062F' : '\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u062B\u0627\u0646\u064A (\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629)' }}\r
              </h3>\r
              <p class="step-desc">\r
                @if (wiz().voucherType === 'journal') {\r
                  \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0648\u0627\u0644\u062F\u0627\u0626\u0646\u0629 \u0645\u0646 \u062F\u0644\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A\r
                } @else {\r
                  \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0629 \u0627\u0644\u062A\u064A {{ wiz().voucherType === 'receipt' ? '\u064A\u064F\u0642\u0628\u0636 \u0645\u0646\u0647\u0627' : '\u064A\u064F\u0635\u0631\u0641 \u0644\u0647\u0627' }}\r
                }\r
              </p>\r
\r
              <!-- \u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u0635\u062F\u0631 \u0627\u0644\u0645\u062E\u062A\u0627\u0631 (\u0641\u0642\u0637 \u0644\u0644\u0642\u0628\u0636 \u0648\u0627\u0644\u0635\u0631\u0641) -->\r
              @if (wiz().voucherType !== 'journal' && selectedSourceName()) {\r
                <div class="source-summary-chip">\r
                  <span class="material-icons-round">{{ getPaymentMethodIcon() }}</span>\r
                  <span>\u0627\u0644\u0645\u0635\u062F\u0631: <strong>{{ selectedSourceName() }}</strong></span>\r
                </div>\r
              }\r
\r
              <!-- Account Type Filter -->\r
              @if (availableAccountTypes().length > 0) {\r
                <div class="acc-type-selector">\r
                  <label class="form-label">\u0641\u0644\u062A\u0631 \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062D\u0633\u0627\u0628:</label>\r
                  <div class="acc-type-chips">\r
                    <button class="acc-type-chip" [class.active]="selectedAccountType() === ''"\r
                            (click)="selectedAccountType.set('')">\r
                      <span class="material-icons-round">apps</span>\r
                      \u0627\u0644\u0643\u0644\r
                      <span class="atc-count">{{ availableAccounts().length }}</span>\r
                    </button>\r
                    @for (at of availableAccountTypes(); track at) {\r
                      <button class="acc-type-chip" [class.active]="selectedAccountType() === at"\r
                              (click)="selectedAccountType.set(at)">\r
                        <span class="material-icons-round">{{ accountTypeIcons[at] || 'label' }}</span>\r
                        {{ getAccountTypeLabel(at) }}\r
                        <span class="atc-count">{{ countAccountsByType(at) }}</span>\r
                      </button>\r
                    }\r
                  </div>\r
                </div>\r
              }\r
\r
              <!-- Available Accounts -->\r
              <div class="counter-accounts-section">\r
                <div class="cas-header">\r
                  <span>\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629 ({{ filteredAccountsByType().length }})</span>\r
                  <button class="btn-select-all" (click)="selectAllAccounts()">\r
                    <span class="material-icons-round">select_all</span>\r
                    \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644\r
                  </button>\r
                </div>\r
                <div class="counter-accounts-grid">\r
                  @for (acc of filteredAccountsByType(); track acc.id) {\r
                    <div class="counter-acc-item" [class.selected]="linkedAccountIds().has(acc.id)"\r
                         (click)="toggleLinkedAccount(acc)">\r
                      <span class="material-icons-round cai-icon">\r
                        {{ linkedAccountIds().has(acc.id) ? 'check_box' : 'check_box_outline_blank' }}\r
                      </span>\r
                      <div class="cai-details">\r
                        <span class="cai-name">{{ acc.name }}</span>\r
                        @if (acc.provider || acc.accountNumber) {\r
                          <span class="cai-sub-info">{{ acc.provider || acc.accountNumber }}</span>\r
                        }\r
                      </div>\r
                      <span class="cai-type">\r
                        <span class="material-icons-round">{{ accountTypeIcons[acc.accountType] || 'label' }}</span>\r
                        {{ getAccountTypeLabel(acc.accountType) }}\r
                      </span>\r
                    </div>\r
                  }\r
                  @if (filteredAccountsByType().length === 0) {\r
                    <div class="no-accounts-msg" style="grid-column: 1 / -1">\r
                      <span class="material-icons-round">info</span>\r
                      \u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062A\u0627\u062D\u0629. \u0623\u0636\u0641 \u062D\u0633\u0627\u0628\u0627\u062A \u0623\u0648\u0644\u0627\u064B \u0645\u0646 \u0635\u0641\u062D\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A.\r
                    </div>\r
                  }\r
                </div>\r
              </div>\r
\r
              <!-- Selected Accounts Summary -->\r
              @if (wiz().linkedAccounts.length > 0) {\r
                <div class="selected-accounts-summary">\r
                  <h4>\r
                    <span class="material-icons-round">link</span>\r
                    \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062E\u062A\u0627\u0631\u0629 ({{ wiz().linkedAccounts.length }})\r
                  </h4>\r
                  <div class="selected-accounts-list">\r
                    @for (la of wiz().linkedAccounts; track la.accountId) {\r
                      <div class="sel-acc-chip">\r
                        <span class="sac-type">{{ getAccountTypeLabel(la.accountType) }}</span>\r
                        <span class="sac-name">{{ la.accountName }}</span>\r
                        <button class="sac-remove" (click)="removeLinkedAccount(la.accountId)">\r
                          <span class="material-icons-round">close</span>\r
                        </button>\r
                      </div>\r
                    }\r
                  </div>\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          <!-- ===== \u0645\u062D\u062A\u0648\u0649: \u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644 ===== -->\r
          @if (getContentType() === 'workflow') {\r
            <div class="wizard-step">\r
              <h3 class="step-title">\r
                <span class="material-icons-round">route</span>\r
                \u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)\r
              </h3>\r
              <p class="step-desc">\u062D\u062F\u062F \u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0633\u0646\u062F \u0648\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644\u0627\u062A \u0628\u064A\u0646\u0647\u0627. \u0625\u0630\u0627 \u0644\u0645 \u062A\u0641\u0639\u0651\u0644 \u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644\u060C \u0633\u064A\u0639\u0645\u0644 \u0627\u0644\u0633\u0646\u062F \u0628\u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 (\u0645\u0633\u0648\u062F\u0629 \u2192 \u0645\u0639\u062A\u0645\u062F).</p>\r
\r
              <!-- \u062A\u0641\u0639\u064A\u0644 \u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644 -->\r
              <div class="form-group" style="margin-bottom:20px">\r
                <label class="toggle-label" style="font-size:15px;font-weight:600">\r
                  <span>\u062A\u0641\u0639\u064A\u0644 \u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062E\u0635\u0635</span>\r
                  <div class="toggle-switch" [class.on]="wiz().workflowEnabled"\r
                       (click)="setWizField('workflowEnabled', !wiz().workflowEnabled)">\r
                    <div class="toggle-knob"></div>\r
                  </div>\r
                </label>\r
              </div>\r
\r
              @if (wiz().workflowEnabled) {\r
                <!-- \u0627\u0644\u062D\u0627\u0644\u0627\u062A -->\r
                <div class="form-group">\r
                  <label class="form-label">\u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0633\u0646\u062F</label>\r
                  <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">\r
                    @for (state of wiz().workflowStates; track state) {\r
                      <div style="display:flex;align-items:center;gap:4px;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:500"\r
                           [style.background]="getStateColor(state) + '18'" [style.color]="getStateColor(state)">\r
                        <span>{{ getStateLabel(state) }}</span>\r
                        @if (state !== 'draft') {\r
                          <button style="background:none;border:none;cursor:pointer;padding:0;color:inherit;font-size:16px;line-height:1"\r
                                  (click)="removeWorkflowState(state)">\r
                            <span class="material-icons-round" style="font-size:16px">close</span>\r
                          </button>\r
                        }\r
                      </div>\r
                    }\r
                  </div>\r
                  <div style="display:flex;gap:8px">\r
                    <input class="form-input" type="text" placeholder="\u0627\u0633\u0645 \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 (\u0645\u062B\u0644: pending_approval)"\r
                           [value]="newWfState()" (input)="newWfState.set($any($event.target).value)"\r
                           style="flex:1">\r
                    <button class="btn-3d btn-primary" style="padding:8px 16px" (click)="addWorkflowState()">\r
                      <span class="material-icons-round" style="font-size:18px">add</span>\r
                    </button>\r
                  </div>\r
                </div>\r
\r
                <!-- \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629 -->\r
                <div class="form-group">\r
                  <label class="form-label">\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0628\u062A\u062F\u0627\u0626\u064A\u0629</label>\r
                  <select class="form-input" [value]="wiz().workflowInitialState"\r
                          (change)="setWizField('workflowInitialState', $any($event.target).value)">\r
                    @for (state of wiz().workflowStates; track state) {\r
                      <option [value]="state">{{ getStateLabel(state) }}</option>\r
                    }\r
                  </select>\r
                </div>\r
\r
                <!-- \u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644\u0627\u062A -->\r
                <div class="form-group">\r
                  <label class="form-label">\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644\u0627\u062A (\u0645\u0646 \u062D\u0627\u0644\u0629 \u0625\u0644\u0649 \u062D\u0627\u0644\u0629)</label>\r
                  @if (wiz().workflowTransitions.length > 0) {\r
                    <div style="margin-bottom:12px">\r
                      @for (tr of wiz().workflowTransitions; track $index) {\r
                        <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:#f8fafc;border-radius:8px;margin-bottom:6px;font-size:13px">\r
                          <span style="padding:2px 8px;border-radius:12px;font-weight:500"\r
                                [style.background]="getStateColor(tr.fromState) + '18'" [style.color]="getStateColor(tr.fromState)">\r
                            {{ getStateLabel(tr.fromState) }}\r
                          </span>\r
                          <span class="material-icons-round" style="font-size:16px;color:#94a3b8">arrow_back</span>\r
                          <span style="padding:2px 8px;border-radius:12px;font-weight:500"\r
                                [style.background]="getStateColor(tr.toState) + '18'" [style.color]="getStateColor(tr.toState)">\r
                            {{ getStateLabel(tr.toState) }}\r
                          </span>\r
                          <span style="color:#64748b;font-size:12px">({{ tr.actionName }})</span>\r
                          <button style="margin-right:auto;background:none;border:none;cursor:pointer;color:#ef4444"\r
                                  (click)="removeWorkflowTransition($index)">\r
                            <span class="material-icons-round" style="font-size:18px">delete</span>\r
                          </button>\r
                        </div>\r
                      }\r
                    </div>\r
                  }\r
                  <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:8px;align-items:end">\r
                    <div>\r
                      <label style="font-size:11px;color:#64748b;margin-bottom:4px;display:block">\u0645\u0646 \u062D\u0627\u0644\u0629</label>\r
                      <select class="form-input" [value]="newTrFrom()" (change)="newTrFrom.set($any($event.target).value)">\r
                        <option value="">\u0627\u062E\u062A\u0631...</option>\r
                        @for (state of wiz().workflowStates; track state) {\r
                          <option [value]="state">{{ getStateLabel(state) }}</option>\r
                        }\r
                      </select>\r
                    </div>\r
                    <div>\r
                      <label style="font-size:11px;color:#64748b;margin-bottom:4px;display:block">\u0625\u0644\u0649 \u062D\u0627\u0644\u0629</label>\r
                      <select class="form-input" [value]="newTrTo()" (change)="newTrTo.set($any($event.target).value)">\r
                        <option value="">\u0627\u062E\u062A\u0631...</option>\r
                        @for (state of wiz().workflowStates; track state) {\r
                          <option [value]="state">{{ getStateLabel(state) }}</option>\r
                        }\r
                      </select>\r
                    </div>\r
                    <div>\r
                      <label style="font-size:11px;color:#64748b;margin-bottom:4px;display:block">\u0627\u0633\u0645 \u0627\u0644\u0625\u062C\u0631\u0627\u0621</label>\r
                      <input class="form-input" type="text" placeholder="\u0645\u062B\u0644: \u0627\u0639\u062A\u0645\u0627\u062F"\r
                             [value]="newTrAction()" (input)="newTrAction.set($any($event.target).value)">\r
                    </div>\r
                    <button class="btn-3d btn-primary" style="padding:8px 16px;height:40px" (click)="addWorkflowTransition()">\r
                      <span class="material-icons-round" style="font-size:18px">add</span>\r
                    </button>\r
                  </div>\r
                </div>\r
              } @else {\r
                <div style="text-align:center;padding:30px;color:#94a3b8">\r
                  <span class="material-icons-round" style="font-size:48px;margin-bottom:12px">route</span>\r
                  <p>\u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A: \u0645\u0633\u0648\u062F\u0629 \u2192 \u0645\u0639\u062A\u0645\u062F</p>\r
                  <p style="font-size:12px">\u0641\u0639\u0651\u0644 \u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062E\u0635\u0635 \u0644\u0625\u0636\u0627\u0641\u0629 \u062D\u0627\u0644\u0627\u062A \u0648\u0627\u0646\u062A\u0642\u0627\u0644\u0627\u062A \u0645\u062E\u0635\u0635\u0629</p>\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          <!-- ===== \u0645\u062D\u062A\u0648\u0649: \u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 ===== -->\r
          @if (getContentType() === 'details') {\r
            <div class="wizard-step">\r
              <h3 class="step-title">\r
                <span class="material-icons-round">badge</span>\r
                \u0627\u0633\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644\r
              </h3>\r
              <p class="step-desc">\u0633\u0645\u0651\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u0627\u062E\u062A\u0631 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 \u0648\u0627\u0644\u0644\u0648\u0646</p>\r
              <p class="step-hint"><span class="material-icons-round">tag</span> \u0627\u0644\u0631\u0645\u0632 \u0648\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A \u064A\u064F\u0648\u0644\u0651\u064E\u062F\u0627\u0646 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0633\u0628 \u0627\u0644\u062A\u0635\u0646\u064A\u0641</p>\r
\r
              <!-- \u0645\u0644\u062E\u0635 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629 -->\r
              <div class="wizard-summary">\r
                <div class="ws-item">\r
                  <span class="material-icons-round">folder</span>\r
                  <span>\u0627\u0644\u062A\u0635\u0646\u064A\u0641: <strong>{{ wiz().category }}</strong></span>\r
                </div>\r
                <div class="ws-item">\r
                  <span class="material-icons-round">description</span>\r
                  <span>\u0627\u0644\u0646\u0648\u0639: <strong>{{ getVoucherTypeOption(wiz().voucherType)?.label || getVoucherTypeLabel(wiz().voucherType) }}</strong></span>\r
                </div>\r
                @if (wiz().paymentMethod) {\r
                  <div class="ws-item">\r
                    <span class="material-icons-round">payments</span>\r
                    <span>\u0627\u0644\u0648\u0633\u064A\u0644\u0629: <strong>{{ getPaymentMethodLabel(wiz().paymentMethod) }}</strong></span>\r
                  </div>\r
                }\r
                @if (selectedSourceName()) {\r
                  <div class="ws-item">\r
                    <span class="material-icons-round">account_balance_wallet</span>\r
                    <span>\u0627\u0644\u0645\u0635\u062F\u0631: <strong>{{ selectedSourceName() }}</strong></span>\r
                  </div>\r
                }\r
                @if (wiz().sourceWarehouseId) {\r
                  <div class="ws-item">\r
                    <span class="material-icons-round">warehouse</span>\r
                    <span>\u0627\u0644\u0645\u062E\u0632\u0646: <strong>{{ getWarehouseName(wiz().sourceWarehouseId) }}</strong></span>\r
                  </div>\r
                }\r
                <div class="ws-item">\r
                  <span class="material-icons-round">group</span>\r
                  <span>\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A: <strong>{{ wiz().linkedAccounts.length }} \u062D\u0633\u0627\u0628</strong></span>\r
                </div>\r
              </div>\r
\r
              <!-- Name & Description -->\r
              <div class="form-group">\r
                <label class="form-label">\u0627\u0633\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 <span class="required">*</span></label>\r
                <input class="form-input" type="text" placeholder="\u0645\u062B\u0627\u0644: \u062A\u062D\u0635\u064A\u0644 \u064A\u0648\u0645\u064A - \u0627\u0644\u062F\u0647\u0645\u064A\u0629"\r
                       [value]="wiz().name" (input)="setWizField('name', $any($event.target).value)">\r
              </div>\r
              <div class="form-group">\r
                <label class="form-label">\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631</label>\r
                <textarea class="form-input" rows="2" placeholder="\u0648\u0635\u0641 \u0627\u062E\u062A\u064A\u0627\u0631\u064A \u0644\u0644\u0642\u0627\u0644\u0628..."\r
                          [value]="wiz().description"\r
                          (input)="setWizField('description', $any($event.target).value)"></textarea>\r
              </div>\r
\r
              <!-- Icon & Color -->\r
              <div class="form-row">\r
                <div class="form-group">\r
                  <label class="form-label">\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
                  <div class="icon-picker">\r
                    @for (ic of icons; track ic) {\r
                      <button class="icon-option" [class.selected]="wiz().icon === ic"\r
                              (click)="setWizField('icon', ic)">\r
                        <span class="material-icons-round">{{ ic }}</span>\r
                      </button>\r
                    }\r
                  </div>\r
                </div>\r
                <div class="form-group">\r
                  <label class="form-label">\u0627\u0644\u0644\u0648\u0646</label>\r
                  <div class="color-picker">\r
                    @for (c of colors; track c) {\r
                      <button class="color-dot" [class.selected]="wiz().color === c"\r
                              [style.background]="c" (click)="setWizField('color', c)">\r
                      </button>\r
                    }\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <!-- Flags -->\r
              <div class="form-row flags-row">\r
                <label class="toggle-label">\r
                  <span>\u064A\u062A\u0637\u0644\u0628 \u0645\u0631\u0641\u0642</span>\r
                  <div class="toggle-switch" [class.on]="wiz().requiresAttachment"\r
                       (click)="setWizField('requiresAttachment', !wiz().requiresAttachment)">\r
                    <div class="toggle-knob"></div>\r
                  </div>\r
                </label>\r
                <label class="toggle-label">\r
                  <span>\u0645\u0641\u0639\u0651\u0644</span>\r
                  <div class="toggle-switch" [class.on]="wiz().isActive"\r
                       (click)="setWizField('isActive', !wiz().isActive)">\r
                    <div class="toggle-knob"></div>\r
                  </div>\r
                </label>\r
              </div>\r
            </div>\r
          }\r
\r
        </div>\r
\r
        <!-- Wizard Footer -->\r
        <div class="wizard-footer">\r
          @if (wizardStep() > 1) {\r
            <button class="btn-3d btn-ghost" (click)="prevStep()">\r
              <span class="material-icons-round">arrow_forward</span>\r
              \u0627\u0644\u0633\u0627\u0628\u0642\r
            </button>\r
          } @else {\r
            <div></div>\r
          }\r
\r
          @if (!isLastStep()) {\r
            <button class="btn-3d btn-primary" [disabled]="!canGoNext()" (click)="nextStep()">\r
              \u0627\u0644\u062A\u0627\u0644\u064A\r
              <span class="material-icons-round">arrow_back</span>\r
            </button>\r
          } @else {\r
            <button class="btn-3d btn-primary" [disabled]="!canGoNext() || saving()" (click)="saveWizard()">\r
              <span class="material-icons-round">{{ saving() ? 'sync' : 'save' }}</span>\r
              {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : (editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628') }}\r
            </button>\r
          }\r
        </div>\r
\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===== Accounts View Modal ===== -->\r
  @if (showAccountsModal() && selectedOT()) {\r
    <div class="modal-overlay" (click)="showAccountsModal.set(false)">\r
      <div class="modal-3d accounts-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-icon" [style.background]="selectedOT().color">\r
            <span class="material-icons-round">{{ selectedOT().icon }}</span>\r
          </div>\r
          <div>\r
            <h2>\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629</h2>\r
            <p class="modal-subtitle">{{ selectedOT().name }}</p>\r
          </div>\r
          <button class="modal-close" (click)="showAccountsModal.set(false)">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          <!-- \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0635\u062F\u0631 -->\r
          @if (selectedOT().sourceAccountId || selectedOT().sourceFundId) {\r
            <div class="source-summary-chip" style="margin-bottom: 16px">\r
              <span class="material-icons-round">account_balance_wallet</span>\r
              <span>\u0627\u0644\u0645\u0635\u062F\u0631 (\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644): <strong>{{ getSourceLabel(selectedOT()) }}</strong></span>\r
            </div>\r
          }\r
\r
          @if (!selectedOT().linkedAccounts || selectedOT().linkedAccounts.length === 0) {\r
            <div class="no-linked">\r
              <span class="material-icons-round">link_off</span>\r
              \u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0631\u062A\u0628\u0637\u0629\r
            </div>\r
          } @else {\r
            <div class="linked-accounts-full">\r
              @for (la of selectedOT().linkedAccounts; track la.id) {\r
                <div class="la-row">\r
                  <span class="material-icons-round la-icon">account_circle</span>\r
                  <div class="la-info">\r
                    <div class="la-name">{{ la.label || la.accountName }}</div>\r
                    <div class="la-account-name">{{ la.accountName }}</div>\r
                  </div>\r
                  <span class="perm-badge" [attr.data-perm]="la.permission">\r
                    {{ getPermissionLabel(la.permission) }}\r
                  </span>\r
                </div>\r
              }\r
            </div>\r
          }\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-3d btn-ghost" (click)="showAccountsModal.set(false)">\u0625\u063A\u0644\u0627\u0642</button>\r
          <button class="btn-3d btn-primary" (click)="showAccountsModal.set(false); openEditWizard(selectedOT())">\r
            <span class="material-icons-round">edit</span>\r
            \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628\r
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
          <div class="modal-icon amber">\r
            <span class="material-icons-round">help_outline</span>\r
          </div>\r
          <h2>\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0627\u0644\u0642\u0648\u0627\u0644\u0628\u061F</h2>\r
          <button class="modal-close" (click)="showHowItWorks.set(false)">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body hiw-body">\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">auto_awesome</span> \u0627\u0644\u0642\u0627\u0644\u0628 = \u0639\u0645\u0644\u064A\u0629 \u0645\u0642\u064A\u062F\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644</h3>\r
            <p>\r
              \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0633 \u064A\u062E\u062A\u0627\u0631 \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u064A\u0639\u0628\u064A \u0627\u0644\u0645\u0628\u0644\u063A \u0648\u064A\u062D\u0641\u0638. \u0643\u0644 \u0634\u064A \u0645\u062D\u062F\u062F \u0645\u0633\u0628\u0642\u0627\u064B:\r
              \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629\u060C \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639\u060C \u0627\u0644\u0645\u0635\u062F\u0631\u060C \u0648\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629.\r
            </p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">format_list_numbered</span> \u062E\u0637\u0648\u0627\u062A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628</h3>\r
            <div class="hiw-steps">\r
              <div class="hiw-step"><span class="hs-num">1</span> <strong>\u0627\u0644\u062A\u0635\u0646\u064A\u0641:</strong> \u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629</div>\r
              <div class="hiw-step"><span class="hs-num">2</span> <strong>\u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F:</strong> \u0633\u0646\u062F \u0642\u0628\u0636 / \u0633\u0646\u062F \u0635\u0631\u0641 / \u0642\u064A\u062F \u0645\u062D\u0627\u0633\u0628\u064A</div>\r
              <div class="hiw-step"><span class="hs-num">3</span> <strong>\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062F\u0641\u0639:</strong> \u0646\u0642\u062F\u0627\u064B / \u0628\u0646\u0643 / \u0635\u0631\u0627\u0641 / \u0645\u062D\u0641\u0638\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629</div>\r
              <div class="hiw-step"><span class="hs-num">4</span> <strong>\u0627\u0644\u0645\u0635\u062F\u0631 (\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644):</strong> \u0623\u064A \u0635\u0646\u062F\u0648\u0642 \u0623\u0648 \u0628\u0646\u0643 \u0623\u0648 \u0635\u0631\u0627\u0641 \u0623\u0648 \u0645\u062D\u0641\u0638\u0629 \u0628\u0627\u0644\u062A\u062D\u062F\u064A\u062F</div>\r
              <div class="hiw-step"><span class="hs-num">5</span> <strong>\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A (\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u062B\u0627\u0646\u064A):</strong> \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0629 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629</div>\r
              <div class="hiw-step"><span class="hs-num">6</span> <strong>\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644:</strong> \u0633\u0645\u0651\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u0627\u062E\u062A\u0631 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 \u0648\u0627\u0644\u0644\u0648\u0646</div>\r
            </div>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">rule</span> \u0642\u0648\u0627\u0639\u062F \u0645\u0647\u0645\u0629</h3>\r
            <p>\r
              <strong>\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0623\u0648\u0644\u0627\u064B:</strong> \u0623\u0646\u0634\u0626 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0645\u0646 \u062A\u0628\u0648\u064A\u0628 "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A" \u0642\u0628\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0648\u0627\u0644\u0628.<br>\r
              <strong>\u0633\u0646\u062F \u0642\u0628\u0636/\u0635\u0631\u0641:</strong> \u0627\u062E\u062A\u0631 \u0627\u0644\u0648\u0633\u064A\u0644\u0629 \u2192 \u0627\u0644\u0645\u0635\u062F\u0631 (\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u0623\u0648\u0644) \u2192 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A (\u0627\u0644\u0637\u0631\u0641 \u0627\u0644\u062B\u0627\u0646\u064A).<br>\r
              <strong>\u0642\u064A\u062F \u0645\u062D\u0627\u0633\u0628\u064A:</strong> \u062A\u0638\u0647\u0631 \u062D\u0633\u0627\u0628\u0627\u062A \u062F\u0644\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0628\u0627\u0634\u0631\u0629 (\u0628\u062F\u0648\u0646 \u0635\u0646\u0627\u062F\u064A\u0642 \u0623\u0648 \u0628\u0646\u0648\u0643).<br>\r
              <strong>\u0639\u0645\u0644\u064A\u0629 \u0645\u062E\u0632\u0646\u064A\u0629:</strong> \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u2192 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A).\r
            </p>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/operation-types/operation-types.scss */\n@keyframes hesabati-fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes hesabati-slide-up {\n  from {\n    transform: translateY(24px) scale(0.97);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n@keyframes hesabati-slide-down {\n  from {\n    transform: translateY(-24px) scale(0.97);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n@keyframes hesabati-slide-right {\n  from {\n    transform: translateX(-24px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes hesabati-slide-left {\n  from {\n    transform: translateX(24px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes hesabati-scale-in {\n  from {\n    transform: scale(0.85);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes hesabati-scale-bounce {\n  0% {\n    transform: scale(0.6);\n    opacity: 0;\n  }\n  60% {\n    transform: scale(1.05);\n  }\n  100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes hesabati-3d-flip-in {\n  from {\n    transform: perspective(800px) rotateX(-30deg) translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: perspective(800px) rotateX(0deg) translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes hesabati-3d-tilt-in {\n  from {\n    transform: perspective(800px) rotateY(-15deg) rotateX(10deg) translateZ(-50px);\n    opacity: 0;\n  }\n  to {\n    transform: perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0);\n    opacity: 1;\n  }\n}\n@keyframes hesabati-3d-rise {\n  from {\n    transform: perspective(800px) translateY(40px) translateZ(-30px) rotateX(8deg);\n    opacity: 0;\n    box-shadow: none;\n  }\n  to {\n    transform: perspective(800px) translateY(0) translateZ(0) rotateX(0deg);\n    opacity: 1;\n  }\n}\n@keyframes hesabati-3d-unfold {\n  0% {\n    transform: perspective(800px) rotateX(-90deg);\n    transform-origin: top center;\n    opacity: 0;\n  }\n  50% {\n    transform: perspective(800px) rotateX(10deg);\n    opacity: 0.8;\n  }\n  100% {\n    transform: perspective(800px) rotateX(0deg);\n    opacity: 1;\n  }\n}\n@keyframes hesabati-float {\n  0%, 100% {\n    transform: translateY(0px) rotate(0deg);\n  }\n  25% {\n    transform: translateY(-6px) rotate(0.5deg);\n  }\n  75% {\n    transform: translateY(4px) rotate(-0.5deg);\n  }\n}\n@keyframes hesabati-float-3d {\n  0%, 100% {\n    transform: perspective(800px) translateY(0px) rotateX(4deg) rotateY(-2deg);\n  }\n  50% {\n    transform: perspective(800px) translateY(-8px) rotateX(2deg) rotateY(1deg);\n  }\n}\n@keyframes hesabati-pulse-glow {\n  0%, 100% {\n    box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);\n  }\n  50% {\n    box-shadow: 0 0 40px rgba(59, 130, 246, 0.35), 0 0 80px rgba(59, 130, 246, 0.1);\n  }\n}\n@keyframes hesabati-shimmer {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n@keyframes hesabati-rotate-slow {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes hesabati-breathe {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: scale(1.03);\n    opacity: 0.9;\n  }\n}\n@keyframes hesabati-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes hesabati-skeleton {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n@keyframes hesabati-dots {\n  0%, 80%, 100% {\n    transform: scale(0);\n    opacity: 0.5;\n  }\n  40% {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@keyframes hesabati-progress-indeterminate {\n  0% {\n    transform: translateX(-100%);\n  }\n  100% {\n    transform: translateX(400%);\n  }\n}\n@keyframes hesabati-fade-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n@keyframes hesabati-slide-out-down {\n  from {\n    transform: translateY(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateY(24px);\n    opacity: 0;\n  }\n}\n@keyframes hesabati-scale-out {\n  from {\n    transform: scale(1);\n    opacity: 1;\n  }\n  to {\n    transform: scale(0.85);\n    opacity: 0;\n  }\n}\n.stagger-1 {\n  animation-delay: 60ms;\n}\n.stagger-2 {\n  animation-delay: 120ms;\n}\n.stagger-3 {\n  animation-delay: 180ms;\n}\n.stagger-4 {\n  animation-delay: 240ms;\n}\n.stagger-5 {\n  animation-delay: 300ms;\n}\n.stagger-6 {\n  animation-delay: 360ms;\n}\n.stagger-7 {\n  animation-delay: 420ms;\n}\n.stagger-8 {\n  animation-delay: 480ms;\n}\n.stagger-9 {\n  animation-delay: 540ms;\n}\n.stagger-10 {\n  animation-delay: 600ms;\n}\n.stagger-11 {\n  animation-delay: 660ms;\n}\n.stagger-12 {\n  animation-delay: 720ms;\n}\n.stagger-13 {\n  animation-delay: 780ms;\n}\n.stagger-14 {\n  animation-delay: 840ms;\n}\n.stagger-15 {\n  animation-delay: 900ms;\n}\n.stagger-16 {\n  animation-delay: 960ms;\n}\n.stagger-17 {\n  animation-delay: 1020ms;\n}\n.stagger-18 {\n  animation-delay: 1080ms;\n}\n.stagger-19 {\n  animation-delay: 1140ms;\n}\n.stagger-20 {\n  animation-delay: 1200ms;\n}\n.animate-fade-in {\n  animation: hesabati-fade-in 250ms cubic-bezier(0, 0, 0.2, 1) both;\n}\n.animate-slide-up {\n  animation: hesabati-slide-up 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-slide-down {\n  animation: hesabati-slide-down 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-slide-right {\n  animation: hesabati-slide-right 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-scale-in {\n  animation: hesabati-scale-in 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-scale-bounce {\n  animation: hesabati-scale-bounce 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n.animate-3d-flip {\n  animation: hesabati-3d-flip-in 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-3d-tilt {\n  animation: hesabati-3d-tilt-in 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-3d-rise {\n  animation: hesabati-3d-rise 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-3d-unfold {\n  animation: hesabati-3d-unfold 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n}\n.animate-float {\n  animation: hesabati-float 6s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;\n}\n.animate-float-3d {\n  animation: hesabati-float-3d 8s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;\n}\n.animate-pulse-glow {\n  animation: hesabati-pulse-glow 3s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;\n}\n.animate-shimmer {\n  animation: hesabati-shimmer 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n}\n.animate-breathe {\n  animation: hesabati-breathe 4s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;\n}\n.animate-spin {\n  animation: hesabati-spin 0.8s linear infinite;\n}\n:host {\n  --card-color: #3b82f6;\n}\n.page-container {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  padding: 20px 24px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06) 0%,\n      rgba(99, 102, 241, 0.04) 100%);\n  border-radius: 20px;\n  border: 1px solid rgba(59, 130, 246, 0.12);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.page-icon-3d {\n  width: 56px;\n  height: 56px;\n  border-radius: 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35), 0 2px 4px rgba(0, 0, 0, 0.1);\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s ease;\n}\n.page-icon-3d:hover {\n  transform: perspective(100px) rotateX(0deg) scale(1.05);\n}\n.page-icon-3d .material-icons-round {\n  font-size: 28px;\n  color: white;\n}\n.page-title {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 4px;\n}\n.page-subtitle {\n  font-size: 13px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.help-btn {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  border: 1.5px solid rgba(245, 158, 11, 0.3);\n  background: rgba(245, 158, 11, 0.08);\n  color: #f59e0b;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.help-btn .material-icons-round {\n  font-size: 22px;\n}\n.help-btn:hover {\n  background: rgba(245, 158, 11, 0.15);\n  transform: scale(1.08) rotate(15deg);\n  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);\n}\n.btn-3d {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  font-size: 14px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n  position: relative;\n}\n.btn-3d .material-icons-round {\n  font-size: 18px;\n}\n.btn-3d.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow:\n    0 4px 12px rgba(59, 130, 246, 0.35),\n    0 2px 4px rgba(0, 0, 0, 0.1),\n    inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-primary:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4), 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.btn-3d.btn-primary:active {\n  transform: translateY(0);\n}\n.btn-3d.btn-primary:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-3d.btn-ghost {\n  background: transparent;\n  color: var(--text-secondary, #64748b);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n}\n.btn-3d.btn-ghost:hover {\n  background: var(--bg-surface, #f8fafc);\n  transform: translateY(-1px);\n}\n.alert-error {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\n.alert-error .material-icons-round {\n  font-size: 18px;\n}\n.alert-error .close-x {\n  margin-right: auto;\n  opacity: 0.6;\n}\n.alert-success {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: rgba(34, 197, 94, 0.1);\n  border: 1px solid rgba(34, 197, 94, 0.25);\n  color: #22c55e;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\n.alert-success .material-icons-round {\n  font-size: 18px;\n}\n.category-tabs {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n}\n.cat-tab {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-secondary, #64748b);\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.cat-tab .material-icons-round {\n  font-size: 16px;\n}\n.cat-tab.active {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  border-color: transparent;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\n  transform: translateY(-1px);\n}\n.cat-tab:not(.active):hover {\n  background: var(--bg-surface, #f8fafc);\n  border-color: #3b82f6;\n  color: #3b82f6;\n}\n.cat-count {\n  background: rgba(255, 255, 255, 0.25);\n  border-radius: 6px;\n  padding: 1px 6px;\n  font-size: 11px;\n}\n.loading-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 20px;\n}\n.skeleton-card {\n  height: 220px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      90deg,\n      #f0f0f0 25%,\n      #e0e0e0 50%,\n      #f0f0f0 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n}\n@keyframes shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n.empty-state p {\n  font-size: 14px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n.empty-icon-3d {\n  width: 80px;\n  height: 80px;\n  border-radius: 24px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.3);\n  transform: perspective(150px) rotateX(10deg);\n}\n.empty-icon-3d .material-icons-round {\n  font-size: 40px;\n  color: white;\n}\n.ot-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 20px;\n}\n.ot-card-3d {\n  border-radius: 20px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n  position: relative;\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  transform-style: preserve-3d;\n}\n.ot-card-3d::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 3px;\n  background: var(--card-color);\n  border-radius: 20px 20px 0 0;\n}\n.ot-card-3d:hover {\n  transform: translateY(-6px) perspective(800px) rotateX(2deg);\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06);\n}\n.ot-card-3d:hover .card-glow {\n  opacity: 1;\n}\n.card-glow {\n  position: absolute;\n  top: -50%;\n  right: -50%;\n  width: 200%;\n  height: 200%;\n  background:\n    radial-gradient(\n      circle at 70% 30%,\n      var(--card-color) 0%,\n      transparent 60%);\n  opacity: 0;\n  transition: opacity 0.3s;\n  pointer-events: none;\n  mix-blend-mode: overlay;\n}\n.ot-card-header {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px 16px 0;\n}\n.ot-icon-3d {\n  width: 46px;\n  height: 46px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);\n  flex-shrink: 0;\n}\n.ot-icon-3d .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.ot-meta {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.ot-category-badge {\n  display: inline-flex;\n  align-items: center;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 6px;\n  width: fit-content;\n}\n.ot-category-badge[data-cat=voucher] {\n  background: rgba(59, 130, 246, 0.12);\n  color: #3b82f6;\n}\n.ot-category-badge[data-cat=journal] {\n  background: rgba(139, 92, 246, 0.12);\n  color: #8b5cf6;\n}\n.ot-category-badge[data-cat=collection] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #22c55e;\n}\n.ot-category-badge[data-cat=delivery] {\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n}\n.ot-type-badge {\n  display: inline-flex;\n  align-items: center;\n  font-size: 10px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 5px;\n  background: rgba(0, 0, 0, 0.05);\n  color: var(--text-secondary, #64748b);\n  width: fit-content;\n}\n.ot-actions-top {\n  display: flex;\n  gap: 4px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.ot-card-3d:hover .ot-actions-top {\n  opacity: 1;\n}\n.ot-card-body {\n  padding: 12px 16px;\n}\n.ot-name {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 6px;\n  line-height: 1.4;\n}\n.ot-desc {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0 0 8px;\n  line-height: 1.6;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.ot-info-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-bottom: 8px;\n}\n.ot-info-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 8px;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  border: 1px solid var(--border-color, #e2e8f0);\n}\n.ot-info-chip .material-icons-round {\n  font-size: 14px;\n}\n.ot-info-chip.main-acc {\n  background: rgba(59, 130, 246, 0.08);\n  border-color: rgba(59, 130, 246, 0.2);\n  color: #3b82f6;\n}\n.ot-screens-row {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n  margin-bottom: 8px;\n}\n.ot-screens-row .material-icons-round {\n  font-size: 14px;\n}\n.screens-text {\n  flex: 1;\n}\n.ot-flags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.flag-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 8px;\n  border-radius: 6px;\n}\n.flag-badge .material-icons-round {\n  font-size: 13px;\n}\n.flag-badge.attachment {\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n}\n.flag-badge.inactive {\n  background: rgba(107, 114, 128, 0.1);\n  color: #6b7280;\n}\n.ot-accounts-section {\n  padding: 12px 16px 16px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.ot-accounts-header {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 8px;\n  cursor: pointer;\n  transition: color 0.2s;\n}\n.ot-accounts-header .material-icons-round {\n  font-size: 16px;\n}\n.ot-accounts-header .expand-icon {\n  margin-right: auto;\n  font-size: 14px;\n}\n.ot-accounts-header:hover {\n  color: #3b82f6;\n}\n.linked-accounts-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.linked-account-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 8px;\n  background: var(--bg-card, white);\n  border: 1px solid var(--border-color, #e2e8f0);\n  color: var(--text-primary, #1e293b);\n}\n.linked-account-chip .material-icons-round {\n  font-size: 13px;\n  color: var(--text-muted, #94a3b8);\n}\n.more-accounts {\n  font-size: 11px;\n  font-weight: 700;\n  color: #3b82f6;\n  padding: 4px 8px;\n  cursor: pointer;\n}\n.more-accounts:hover {\n  text-decoration: underline;\n}\n.icon-btn {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn .material-icons-round {\n  font-size: 16px;\n}\n.icon-btn.edit-btn {\n  color: #3b82f6;\n}\n.icon-btn.edit-btn:hover {\n  background: rgba(59, 130, 246, 0.1);\n}\n.icon-btn.delete-btn {\n  color: #ef4444;\n}\n.icon-btn.delete-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  animation: fadeIn 0.2s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-3d {\n  background: var(--bg-card, white);\n  border-radius: 24px;\n  width: 100%;\n  max-width: 600px;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.1);\n  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n@keyframes slideUp {\n  from {\n    transform: translateY(40px) scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.hiw-modal {\n  max-width: 560px;\n}\n.accounts-modal {\n  max-width: 680px;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 20px 24px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.04),\n      rgba(99, 102, 241, 0.02));\n}\n.modal-header h2 {\n  font-size: 17px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n  flex: 1;\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  flex-shrink: 0;\n}\n.modal-icon .material-icons-round {\n  font-size: 22px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-subtitle {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 2px 0 0;\n}\n.modal-close {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: none;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.modal-close .material-icons-round {\n  font-size: 18px;\n}\n.modal-close:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 20px 24px;\n}\n.modal-footer {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  padding: 16px 24px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.hiw-body {\n  padding: 0;\n}\n.hiw-section {\n  padding: 16px 24px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.hiw-section:last-child {\n  border-bottom: none;\n}\n.hiw-section h3 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 10px;\n}\n.hiw-section h3 .material-icons-round {\n  font-size: 18px;\n  color: #f59e0b;\n}\n.hiw-section p {\n  font-size: 13px;\n  line-height: 1.9;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.hiw-steps {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.hiw-step {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.hiw-step strong {\n  color: var(--text-primary, #1e293b);\n}\n.hs-num {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  font-size: 12px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.wizard-modal {\n  background: var(--bg-card, white);\n  border-radius: 24px;\n  width: 100%;\n  max-width: 720px;\n  max-height: 92vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.1);\n  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.wizard-header {\n  padding: 20px 24px 16px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.04),\n      rgba(99, 102, 241, 0.02));\n}\n.wizard-header-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.wizard-header-top h2 {\n  font-size: 18px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n}\n.wizard-system-alert {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 14px;\n  margin-bottom: 14px;\n  border-radius: 12px;\n  border: 1px solid rgba(239, 68, 68, 0.28);\n  background: rgba(239, 68, 68, 0.12);\n  color: #b91c1c;\n}\n.wizard-system-alert .material-icons-round {\n  font-size: 20px;\n  margin-top: 2px;\n}\n.wsa-text strong {\n  display: block;\n  font-size: 13px;\n  font-weight: 800;\n  margin-bottom: 2px;\n}\n.wsa-text p {\n  margin: 0;\n  font-size: 13px;\n  line-height: 1.5;\n  font-weight: 600;\n}\n.wizard-steps-bar {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  overflow-x: auto;\n  padding-bottom: 4px;\n}\n.wstep {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 10px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.wstep.active {\n  color: #3b82f6;\n  background: rgba(59, 130, 246, 0.08);\n}\n.wstep.active .wstep-num {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);\n}\n.wstep.done {\n  color: #22c55e;\n}\n.wstep.done .wstep-num {\n  background: #22c55e;\n  color: white;\n}\n.wstep-num {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: var(--bg-surface, #f0f0f0);\n  color: var(--text-muted, #94a3b8);\n  font-size: 12px;\n  font-weight: 800;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: all 0.2s;\n}\n.wstep-line {\n  width: 20px;\n  height: 2px;\n  background: var(--border-color, #e2e8f0);\n  flex-shrink: 0;\n  transition: background 0.2s;\n}\n.wstep-line.done {\n  background: #22c55e;\n}\n.wizard-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.wizard-step {\n  animation: fadeIn 0.3s ease;\n}\n.step-title {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 17px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 8px;\n}\n.step-title .material-icons-round {\n  font-size: 22px;\n  color: #3b82f6;\n}\n.step-desc {\n  font-size: 13px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0 0 20px;\n  line-height: 1.7;\n}\n.step-hint {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--text-muted, #94a3b8);\n  margin: -8px 0 16px;\n  line-height: 1.5;\n}\n.step-hint .material-icons-round {\n  font-size: 16px;\n  opacity: 0.8;\n}\n.type-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.type-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n  border-radius: 14px;\n  border: 2px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.25s;\n  position: relative;\n}\n.type-card:hover {\n  border-color: var(--type-color, #3b82f6);\n  background: rgba(59, 130, 246, 0.02);\n  transform: translateX(-4px);\n}\n.type-card.selected {\n  border-color: var(--type-color, #3b82f6);\n  background: rgba(59, 130, 246, 0.04);\n  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);\n}\n.tc-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.tc-icon .material-icons-round {\n  font-size: 26px;\n  color: white;\n}\n.tc-body {\n  flex: 1;\n}\n.tc-body strong {\n  display: block;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 4px;\n}\n.tc-body p {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n  line-height: 1.6;\n}\n.tc-check {\n  font-size: 24px !important;\n  color: #22c55e;\n  flex-shrink: 0;\n}\n.method-cards {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.method-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 8px;\n  padding: 20px 14px;\n  border-radius: 14px;\n  border: 2px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.25s;\n  position: relative;\n}\n.method-card:hover {\n  border-color: #3b82f6;\n  transform: translateY(-3px);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);\n}\n.method-card.selected {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.04);\n  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);\n}\n.method-card strong {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n}\n.method-card p {\n  font-size: 11px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n  line-height: 1.5;\n}\n.mc-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.1),\n      rgba(99, 102, 241, 0.08));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.mc-icon .material-icons-round {\n  font-size: 24px;\n  color: #3b82f6;\n}\n.method-card.selected .mc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\n}\n.method-card.selected .mc-icon .material-icons-round {\n  color: white;\n}\n.mc-check {\n  position: absolute;\n  top: 8px;\n  left: 8px;\n  font-size: 20px !important;\n  color: #22c55e;\n}\n.source-info-banner {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 14px 18px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border: 1px solid rgba(59, 130, 246, 0.15);\n  margin-bottom: 20px;\n}\n.source-info-banner > .material-icons-round {\n  font-size: 22px;\n  color: #f59e0b;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.source-info-banner strong {\n  display: block;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 4px;\n}\n.source-info-banner p {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n  line-height: 1.7;\n}\n.source-accounts-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-height: 400px;\n  overflow-y: auto;\n}\n.source-acc-item {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 14px;\n  border: 2px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.25s;\n}\n.source-acc-item:hover {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.02);\n  transform: translateX(-4px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n}\n.source-acc-item.selected {\n  border-color: #22c55e;\n  background: rgba(34, 197, 94, 0.04);\n  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.15);\n}\n.sai-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.1),\n      rgba(99, 102, 241, 0.08));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: all 0.25s;\n}\n.sai-icon .material-icons-round {\n  font-size: 22px;\n  color: #3b82f6;\n}\n.source-acc-item.selected .sai-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #16a34a);\n  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);\n}\n.source-acc-item.selected .sai-icon .material-icons-round {\n  color: white;\n}\n.sai-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.sai-info strong {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n}\n.sai-sub {\n  font-size: 11px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n}\n.sai-station {\n  font-size: 11px;\n  color: #3b82f6;\n  font-weight: 700;\n}\n.sai-check {\n  font-size: 24px !important;\n  color: #22c55e;\n  flex-shrink: 0;\n}\n.source-summary-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.08),\n      rgba(16, 185, 129, 0.06));\n  border: 1px solid rgba(34, 197, 94, 0.2);\n  color: #16a34a;\n  font-size: 13px;\n  font-weight: 700;\n  margin-bottom: 16px;\n}\n.source-summary-chip .material-icons-round {\n  font-size: 18px;\n}\n.source-summary-chip strong {\n  font-weight: 800;\n  color: #15803d;\n}\n.source-chip {\n  background: rgba(34, 197, 94, 0.08) !important;\n  border-color: rgba(34, 197, 94, 0.2) !important;\n  color: #16a34a !important;\n}\n.source-chip .material-icons-round {\n  color: #16a34a !important;\n}\n.wizard-summary {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 14px;\n  border-radius: 12px;\n  background: var(--bg-surface, #f8fafc);\n  border: 1px solid var(--border-color, #e2e8f0);\n  margin-bottom: 20px;\n}\n.ws-item {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 12px;\n  border-radius: 8px;\n  background: var(--bg-card, white);\n  border: 1px solid var(--border-color, #e2e8f0);\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.ws-item .material-icons-round {\n  font-size: 16px;\n  color: #3b82f6;\n}\n.ws-item strong {\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n}\n.main-account-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-height: 400px;\n  overflow-y: auto;\n}\n.main-acc-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.main-acc-item:hover {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.02);\n}\n.main-acc-item.selected {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.06);\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);\n}\n.mai-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.1),\n      rgba(99, 102, 241, 0.08));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.mai-icon .material-icons-round {\n  font-size: 20px;\n  color: #3b82f6;\n}\n.main-acc-item.selected .mai-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.main-acc-item.selected .mai-icon .material-icons-round {\n  color: white;\n}\n.mai-info {\n  flex: 1;\n}\n.mai-info strong {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.mai-type {\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n  font-weight: 600;\n}\n.mai-check {\n  font-size: 22px !important;\n  color: #22c55e;\n  flex-shrink: 0;\n}\n.no-accounts-msg {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 16px;\n  border-radius: 12px;\n  background: rgba(245, 158, 11, 0.08);\n  border: 1px solid rgba(245, 158, 11, 0.2);\n  color: #f59e0b;\n  font-size: 13px;\n  font-weight: 600;\n}\n.no-accounts-msg .material-icons-round {\n  font-size: 18px;\n}\n.acc-type-selector {\n  margin-bottom: 16px;\n}\n.acc-type-chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 8px;\n}\n.acc-type-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 7px 12px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-secondary, #64748b);\n  font-size: 12px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.acc-type-chip .material-icons-round {\n  font-size: 16px;\n}\n.acc-type-chip.active {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  border-color: transparent;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);\n}\n.acc-type-chip.active .atc-count {\n  background: rgba(255, 255, 255, 0.25);\n}\n.acc-type-chip:not(.active):hover {\n  border-color: #3b82f6;\n  color: #3b82f6;\n}\n.atc-count {\n  font-size: 10px;\n  background: rgba(0, 0, 0, 0.06);\n  border-radius: 5px;\n  padding: 1px 5px;\n}\n.counter-accounts-section {\n  margin-bottom: 16px;\n}\n.cas-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 10px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.btn-select-all {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 5px 12px;\n  border-radius: 8px;\n  border: 1px solid rgba(59, 130, 246, 0.3);\n  background: rgba(59, 130, 246, 0.08);\n  color: #3b82f6;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-select-all .material-icons-round {\n  font-size: 14px;\n}\n.btn-select-all:hover {\n  background: rgba(59, 130, 246, 0.15);\n}\n.counter-accounts-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 6px;\n  max-height: 280px;\n  overflow-y: auto;\n  padding: 2px;\n}\n.cai-details {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.cai-sub-info {\n  font-size: 11px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 500;\n  opacity: 0.7;\n}\n.counter-acc-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.counter-acc-item:hover {\n  border-color: #3b82f6;\n}\n.counter-acc-item.selected {\n  border-color: #22c55e;\n  background: rgba(34, 197, 94, 0.04);\n}\n.cai-icon {\n  font-size: 20px !important;\n  color: var(--text-muted, #94a3b8);\n  flex-shrink: 0;\n}\n.counter-acc-item.selected .cai-icon {\n  color: #22c55e;\n}\n.cai-name {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.cai-type {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 10px;\n  font-weight: 700;\n  color: #3b82f6;\n  background: rgba(59, 130, 246, 0.08);\n  padding: 2px 8px;\n  border-radius: 6px;\n  white-space: nowrap;\n  flex-shrink: 0;\n  margin-inline-start: auto;\n}\n.cai-type .material-icons-round {\n  font-size: 12px;\n}\n.selected-accounts-summary {\n  padding: 14px;\n  border-radius: 12px;\n  border: 1.5px solid rgba(34, 197, 94, 0.2);\n  background: rgba(34, 197, 94, 0.04);\n}\n.selected-accounts-summary h4 {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 800;\n  color: #22c55e;\n  margin: 0 0 10px;\n}\n.selected-accounts-summary h4 .material-icons-round {\n  font-size: 16px;\n}\n.selected-accounts-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.sel-acc-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 8px;\n  background: var(--bg-card, white);\n  border: 1px solid var(--border-color, #e2e8f0);\n  font-size: 11px;\n  font-weight: 700;\n}\n.sac-type {\n  color: #3b82f6;\n  font-size: 10px;\n  padding: 1px 5px;\n  border-radius: 4px;\n  background: rgba(59, 130, 246, 0.1);\n}\n.sac-name {\n  color: var(--text-primary, #1e293b);\n}\n.sac-remove {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: none;\n  background: transparent;\n  color: #ef4444;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  transition: background 0.2s;\n}\n.sac-remove .material-icons-round {\n  font-size: 14px;\n}\n.sac-remove:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.screen-options {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.screen-option {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.screen-option:hover {\n  border-color: #3b82f6;\n}\n.screen-option.selected {\n  border-color: #22c55e;\n  background: rgba(34, 197, 94, 0.04);\n}\n.so-icon {\n  font-size: 22px !important;\n  color: var(--text-muted, #94a3b8);\n  flex-shrink: 0;\n}\n.screen-option.selected .so-icon {\n  color: #22c55e;\n}\n.so-body {\n  flex: 1;\n}\n.so-label {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.so-label .material-icons-round {\n  font-size: 16px;\n  color: #3b82f6;\n}\n.so-desc {\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n  font-weight: 600;\n  margin-top: 2px;\n}\n.required {\n  color: #ef4444;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.form-row.flags-row {\n  grid-template-columns: 1fr 1fr;\n}\n.form-label {\n  display: block;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 6px;\n}\n.form-input,\n.form-select {\n  width: 100%;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 14px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input:focus,\n.form-select:focus {\n  border-color: #3b82f6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\ntextarea.form-input {\n  resize: vertical;\n  min-height: 60px;\n}\n.icon-picker {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.icon-option {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-option .material-icons-round {\n  font-size: 18px;\n  color: var(--text-secondary, #64748b);\n}\n.icon-option.selected {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.1);\n}\n.icon-option.selected .material-icons-round {\n  color: #3b82f6;\n}\n.icon-option:hover:not(.selected) {\n  border-color: #94a3b8;\n}\n.color-picker {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.color-dot {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.color-dot.selected {\n  border-color: var(--text-primary, #1e293b);\n  transform: scale(1.2);\n}\n.color-dot:hover:not(.selected) {\n  transform: scale(1.1);\n}\n.toggle-label {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  transition: all 0.2s;\n}\n.toggle-label:hover {\n  border-color: #3b82f6;\n}\n.toggle-switch {\n  width: 44px;\n  height: 24px;\n  border-radius: 12px;\n  background: #cbd5e1;\n  position: relative;\n  transition: all 0.3s;\n  flex-shrink: 0;\n}\n.toggle-switch.on {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.toggle-switch.on .toggle-knob {\n  transform: translateX(-20px);\n}\n.toggle-knob {\n  position: absolute;\n  top: 3px;\n  right: 3px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: white;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.wizard-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.linked-accounts-full {\n  margin-bottom: 20px;\n}\n.no-linked {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 16px;\n  border-radius: 12px;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-muted, #94a3b8);\n  font-size: 13px;\n  font-weight: 600;\n}\n.no-linked .material-icons-round {\n  font-size: 20px;\n}\n.la-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  margin-bottom: 6px;\n  background: var(--bg-card, white);\n  transition: all 0.2s;\n}\n.la-row:hover {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n}\n.la-info {\n  flex: 1;\n}\n.la-icon {\n  font-size: 20px !important;\n  color: #3b82f6;\n}\n.la-name {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.la-account-name {\n  font-size: 11px;\n  color: var(--text-muted, #94a3b8);\n  font-weight: 600;\n}\n.perm-badge {\n  display: inline-flex;\n  align-items: center;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 6px;\n}\n.perm-badge[data-perm=both] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #22c55e;\n}\n.perm-badge[data-perm=receive_only] {\n  background: rgba(59, 130, 246, 0.12);\n  color: #3b82f6;\n}\n.perm-badge[data-perm=pay_only] {\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n}\n@media (max-width: 768px) {\n  .page-header {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n  }\n  .ot-grid {\n    grid-template-columns: 1fr;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n  .form-row.flags-row {\n    grid-template-columns: 1fr;\n  }\n  .method-cards {\n    grid-template-columns: 1fr;\n  }\n  .counter-accounts-grid {\n    grid-template-columns: 1fr;\n  }\n  .wizard-modal {\n    max-width: 100%;\n    border-radius: 16px;\n  }\n  .wizard-steps-bar {\n    gap: 0;\n  }\n}\n/*# sourceMappingURL=operation-types.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OperationTypesComponent, { className: "OperationTypesComponent", filePath: "src/app/pages/operation-types/operation-types.ts", lineNumber: 18 });
})();
export {
  OperationTypesComponent
};
//# sourceMappingURL=chunk-J5HKFSKA.js.map
