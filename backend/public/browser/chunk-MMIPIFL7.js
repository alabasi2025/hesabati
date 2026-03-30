import {
  formatDate
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
  ɵɵclassMap,
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
  ɵɵrepeaterTrackByIndex,
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

// src/app/pages/warehouse-operations/warehouse-operations.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function WarehouseOperationsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_14_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showHowItWorks.set(false));
    });
    \u0275\u0275elementStart(1, "div", 17);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_14_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 18)(3, "div", 19)(4, "div", 20)(5, "span", 2);
    \u0275\u0275text(6, "help_outline");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h2");
    \u0275\u0275text(8, "\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0646\u064A\u0629\u061F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 21);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_14_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showHowItWorks.set(false));
    });
    \u0275\u0275elementStart(10, "span", 2);
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 22)(13, "div", 23)(14, "h3")(15, "span", 2);
    \u0275\u0275text(16, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p");
    \u0275\u0275text(19, " \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0644\u064A\u0633\u062A \u0633\u0646\u062F\u0627\u062A \u0642\u0628\u0636/\u0635\u0631\u0641. \u0647\u0646\u0627 \u0639\u0646\u062F\u0643 \u0639\u0645\u0644\u064A\u0627\u062A \u0645\u062E\u0632\u0646\u064A\u0629 \u0645\u062B\u0644: \u062A\u0648\u0631\u064A\u062F \u0641\u0627\u062A\u0648\u0631\u0629\u060C \u062A\u0648\u0631\u064A\u062F \u0623\u0645\u0631\u060C \u0635\u0631\u0641\u060C \u062A\u062D\u0648\u064A\u0644\u060C \u0627\u0633\u062A\u0644\u0627\u0645 \u062A\u062D\u0648\u064A\u0644. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 23)(21, "h3")(22, "span", 2);
    \u0275\u0275text(23, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " \u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "p");
    \u0275\u0275text(26, " \u0631\u0642\u0645 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u064A\u064F\u0648\u0644\u0651\u062F \u062D\u0633\u0628 ");
    \u0275\u0275elementStart(27, "strong");
    \u0275\u0275text(28, "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 + \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0632\u0646 + \u0631\u0642\u0645 \u0627\u0644\u0645\u062E\u0632\u0646 + \u0627\u0644\u0633\u0646\u0629 + \u062A\u0633\u0644\u0633\u0644 \u064A\u0628\u062F\u0623 \u0645\u0646 1");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 24);
    \u0275\u0275text(31, " WHS-01-2025-\u0627\u0633\u062A\u0644\u0627\u0645-0001 | WHS-02-2025-\u0635\u0631\u0641-0003 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p")(33, "small");
    \u0275\u0275text(34, "\u0627\u0644\u062A\u0633\u0644\u0633\u0644 \u064A\u0628\u062F\u0623 \u0645\u0646 ");
    \u0275\u0275elementStart(35, "strong");
    \u0275\u0275text(36, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275text(37, " \u0644\u0643\u0644 \u0645\u062E\u0632\u0646 \u0648\u0644\u0643\u0644 \u0633\u0646\u0629 (\u0648\u0643\u0644 \u0639\u0645\u0644 \u0645\u0646\u0641\u0635\u0644).");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 23)(39, "h3")(40, "span", 2);
    \u0275\u0275text(41, "category");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, " \u0627\u0644\u0642\u0648\u0627\u0644\u0628 (\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p");
    \u0275\u0275text(44, ' "\u0627\u0644\u0642\u0627\u0644\u0628" (\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629) \u064A\u062D\u062F\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0644\u0644\u0639\u0645\u0644\u064A\u0629. \u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0633\u062A\u0642\u0644 \u0639\u0646 \u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0645\u062E\u0632\u0646. ');
    \u0275\u0275elementEnd()()()()();
  }
}
function WarehouseOperationsComponent_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_For_17_Template_div_click_0_listener() {
      const t_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAdd(t_r4.key));
    });
    \u0275\u0275elementStart(1, "div", 26)(2, "span", 2);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 27)(5, "span", 28);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("border-top-color", t_r4.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", t_r4.color + "18")("color", t_r4.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r4.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r4.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.countByType(t_r4.key), " \u0639\u0645\u0644\u064A\u0629");
  }
}
function WarehouseOperationsComponent_For_23_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_For_23_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const t_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.filterType.set(t_r6.key));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("--tab-color", t_r6.color);
    \u0275\u0275classProp("active", ctx_r1.filterType() === t_r6.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", t_r6.label, " (", ctx_r1.countByType(t_r6.key), ") ");
  }
}
function WarehouseOperationsComponent_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, WarehouseOperationsComponent_For_23_Conditional_0_Template, 2, 6, "button", 30);
  }
  if (rf & 2) {
    const t_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.countByType(t_r6.key) > 0 ? 0 : -1);
  }
}
function WarehouseOperationsComponent_Conditional_24_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", w_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r8.name);
  }
}
function WarehouseOperationsComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 31);
    \u0275\u0275listener("ngModelChange", function WarehouseOperationsComponent_Conditional_24_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.filterWarehouse.set($event));
    });
    \u0275\u0275elementStart(1, "option", 32);
    \u0275\u0275text(2, "\u0643\u0644 \u0627\u0644\u0645\u062E\u0627\u0632\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, WarehouseOperationsComponent_Conditional_24_For_4_Template, 2, 2, "option", 32, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngModel", ctx_r1.filterWarehouse());
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.warehouses());
  }
}
function WarehouseOperationsComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 33);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function WarehouseOperationsComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "span", 2);
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0645\u062E\u0632\u0646\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 34);
    \u0275\u0275text(6, "\u0623\u0646\u0634\u0626 \u0639\u0645\u0644\u064A\u0629 \u062C\u062F\u064A\u062F\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0632\u0631 \u0623\u0639\u0644\u0627\u0647 \u0623\u0648 \u0628\u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0623\u062D\u062F \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
    \u0275\u0275elementEnd()();
  }
}
function WarehouseOperationsComponent_Conditional_27_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43)(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const op_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(op_r10.operationTypeIcon || "receipt_long");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", op_r10.operationTypeName);
  }
}
function WarehouseOperationsComponent_Conditional_27_For_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const op_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(op_r10.description);
  }
}
function WarehouseOperationsComponent_Conditional_27_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_27_For_2_Template_div_click_0_listener() {
      const op_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewDetail(op_r10));
    });
    \u0275\u0275elementStart(1, "div", 37)(2, "span", 2);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 38)(5, "div", 39)(6, "span", 40);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 41);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 42);
    \u0275\u0275conditionalCreate(11, WarehouseOperationsComponent_Conditional_27_For_2_Conditional_11_Template, 4, 2, "span", 43);
    \u0275\u0275elementStart(12, "span", 44)(13, "span", 2);
    \u0275\u0275text(14, "event");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, WarehouseOperationsComponent_Conditional_27_For_2_Conditional_16_Template, 2, 1, "span", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 46)(18, "span", 47);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 48);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "span", 49);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const op_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r1.getTypeMeta(op_r10.operationType).color + "18")("color", ctx_r1.getTypeMeta(op_r10.operationType).color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTypeMeta(op_r10.operationType).icon);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(op_r10.operationNumber);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.getTypeMeta(op_r10.operationType).color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getTypeMeta(op_r10.operationType).label);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(op_r10.operationTypeName ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDate(op_r10.operationDate));
    \u0275\u0275advance();
    \u0275\u0275conditional(op_r10.description ? 16 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatNumber(op_r10.totalCost || 0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", op_r10.totalItems || 0, " \u0635\u0646\u0641");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(op_r10.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel(op_r10.status));
  }
}
function WarehouseOperationsComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, WarehouseOperationsComponent_Conditional_27_For_2_Template, 24, 17, "div", 35, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredOperations());
  }
}
function WarehouseOperationsComponent_Conditional_28_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 75);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_28_For_23_Template_button_click_0_listener() {
      const t_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.form.operationType = t_r13.key);
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("--opt-color", t_r13.color);
    \u0275\u0275classProp("selected", ctx_r1.form.operationType === t_r13.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r13.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r13.label);
  }
}
function WarehouseOperationsComponent_Conditional_28_Conditional_25_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r15 = ctx.$implicit;
    \u0275\u0275property("ngValue", w_r15.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r15.name);
  }
}
function WarehouseOperationsComponent_Conditional_28_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "label");
    \u0275\u0275text(2, "\u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0645\u0635\u062F\u0631 ");
    \u0275\u0275elementStart(3, "span", 54);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 58);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_Conditional_25_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.form.sourceWarehouseId, $event) || (ctx_r1.form.sourceWarehouseId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(6, "option", 32);
    \u0275\u0275text(7, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, WarehouseOperationsComponent_Conditional_28_Conditional_25_For_9_Template, 2, 2, "option", 32, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.sourceWarehouseId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.warehouses());
  }
}
function WarehouseOperationsComponent_Conditional_28_Conditional_26_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r17 = ctx.$implicit;
    \u0275\u0275property("ngValue", w_r17.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r17.name);
  }
}
function WarehouseOperationsComponent_Conditional_28_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "label");
    \u0275\u0275text(2, "\u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0648\u062C\u0647\u0629 ");
    \u0275\u0275elementStart(3, "span", 54);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 58);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_Conditional_26_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.form.destinationWarehouseId, $event) || (ctx_r1.form.destinationWarehouseId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(6, "option", 32);
    \u0275\u0275text(7, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, WarehouseOperationsComponent_Conditional_28_Conditional_26_For_9_Template, 2, 2, "option", 32, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.destinationWarehouseId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.warehouses());
  }
}
function WarehouseOperationsComponent_Conditional_28_Conditional_28_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r19 = ctx.$implicit;
    \u0275\u0275property("ngValue", s_r19.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r19.name);
  }
}
function WarehouseOperationsComponent_Conditional_28_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "label");
    \u0275\u0275text(2, "\u0627\u0644\u0645\u0648\u0631\u062F ");
    \u0275\u0275elementStart(3, "span", 54);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 58);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_Conditional_28_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.form.supplierId, $event) || (ctx_r1.form.supplierId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(6, "option", 32);
    \u0275\u0275text(7, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0631\u062F...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, WarehouseOperationsComponent_Conditional_28_Conditional_28_For_9_Template, 2, 2, "option", 32, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.supplierId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.suppliers());
  }
}
function WarehouseOperationsComponent_Conditional_28_Conditional_29_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngValue", t_r21.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", t_r21.operationNumber, " - ", ctx_r1.formatDate(t_r21.operationDate));
  }
}
function WarehouseOperationsComponent_Conditional_28_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "label");
    \u0275\u0275text(2, "\u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 ");
    \u0275\u0275elementStart(3, "span", 54);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 58);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_Conditional_29_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.form.relatedOperationId, $event) || (ctx_r1.form.relatedOperationId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(6, "option", 32);
    \u0275\u0275text(7, "\u0627\u062E\u062A\u0631 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062A\u062D\u0648\u064A\u0644...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, WarehouseOperationsComponent_Conditional_28_Conditional_29_For_9_Template, 2, 3, "option", 32, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.relatedOperationId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.pendingTransfers());
  }
}
function WarehouseOperationsComponent_Conditional_28_For_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r22 = ctx.$implicit;
    \u0275\u0275property("ngValue", ot_r22.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ot_r22.name);
  }
}
function WarehouseOperationsComponent_Conditional_28_For_86_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r25 = ctx.$implicit;
    \u0275\u0275property("ngValue", t_r25.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r25.name);
  }
}
function WarehouseOperationsComponent_Conditional_28_For_86_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 85);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_28_For_86_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const \u0275$index_425_r27 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeItem(\u0275$index_425_r27));
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function WarehouseOperationsComponent_Conditional_28_For_86_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 76);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "input", 77);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_For_86_Template_input_ngModelChange_4_listener($event) {
      const item_r24 = \u0275\u0275restoreView(_r23).$implicit;
      \u0275\u0275twoWayBindingSet(item_r24.itemName, $event) || (item_r24.itemName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td")(6, "input", 78);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_For_86_Template_input_ngModelChange_6_listener($event) {
      const item_r24 = \u0275\u0275restoreView(_r23).$implicit;
      \u0275\u0275twoWayBindingSet(item_r24.itemCode, $event) || (item_r24.itemCode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td")(8, "select", 79);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_For_86_Template_select_ngModelChange_8_listener($event) {
      const item_r24 = \u0275\u0275restoreView(_r23).$implicit;
      \u0275\u0275twoWayBindingSet(item_r24.itemTypeId, $event) || (item_r24.itemTypeId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(9, "option", 32);
    \u0275\u0275text(10, "\u0628\u062F\u0648\u0646 \u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(11, WarehouseOperationsComponent_Conditional_28_For_86_For_12_Template, 2, 2, "option", 32, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td")(14, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_For_86_Template_input_ngModelChange_14_listener($event) {
      const item_r24 = \u0275\u0275restoreView(_r23).$implicit;
      \u0275\u0275twoWayBindingSet(item_r24.quantity, $event) || (item_r24.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td")(16, "input", 81);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_For_86_Template_input_ngModelChange_16_listener($event) {
      const item_r24 = \u0275\u0275restoreView(_r23).$implicit;
      \u0275\u0275twoWayBindingSet(item_r24.unit, $event) || (item_r24.unit = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_For_86_Template_input_ngModelChange_18_listener($event) {
      const item_r24 = \u0275\u0275restoreView(_r23).$implicit;
      \u0275\u0275twoWayBindingSet(item_r24.unitCost, $event) || (item_r24.unitCost = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 82);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td")(22, "input", 83);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_For_86_Template_input_ngModelChange_22_listener($event) {
      const item_r24 = \u0275\u0275restoreView(_r23).$implicit;
      \u0275\u0275twoWayBindingSet(item_r24.notes, $event) || (item_r24.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "td");
    \u0275\u0275conditionalCreate(24, WarehouseOperationsComponent_Conditional_28_For_86_Conditional_24_Template, 3, 0, "button", 84);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r24 = ctx.$implicit;
    const \u0275$index_425_r27 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_425_r27 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r24.itemName);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r24.itemCode);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r24.itemTypeId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.itemTypes());
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", item_r24.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r24.unit);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r24.unitCost);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatNumber(ctx_r1.getItemTotal(item_r24)));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r24.notes);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.form.items.length > 1 ? 24 : -1);
  }
}
function WarehouseOperationsComponent_Conditional_28_Conditional_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638... ");
  }
}
function WarehouseOperationsComponent_Conditional_28_Conditional_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 ");
  }
}
function WarehouseOperationsComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_28_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 50);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_28_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 18)(3, "div", 19)(4, "div", 51)(5, "span", 2);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9, "\u0639\u0645\u0644\u064A\u0629 \u0645\u062E\u0632\u0646\u064A\u0629 \u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 21);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_28_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 52)(16, "div", 53)(17, "label");
    \u0275\u0275text(18, "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 ");
    \u0275\u0275elementStart(19, "span", 54);
    \u0275\u0275text(20, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 55);
    \u0275\u0275repeaterCreate(22, WarehouseOperationsComponent_Conditional_28_For_23_Template, 5, 6, "button", 56, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 57);
    \u0275\u0275conditionalCreate(25, WarehouseOperationsComponent_Conditional_28_Conditional_25_Template, 10, 2, "div", 53);
    \u0275\u0275conditionalCreate(26, WarehouseOperationsComponent_Conditional_28_Conditional_26_Template, 10, 2, "div", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 57);
    \u0275\u0275conditionalCreate(28, WarehouseOperationsComponent_Conditional_28_Conditional_28_Template, 10, 2, "div", 53);
    \u0275\u0275conditionalCreate(29, WarehouseOperationsComponent_Conditional_28_Conditional_29_Template, 10, 2, "div", 53);
    \u0275\u0275elementStart(30, "div", 53)(31, "label");
    \u0275\u0275text(32, "\u0627\u0644\u0642\u0627\u0644\u0628 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "select", 58);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_Template_select_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.operationTypeId, $event) || (ctx_r1.form.operationTypeId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(34, "option", 32);
    \u0275\u0275text(35, "\u0628\u062F\u0648\u0646 \u0642\u0627\u0644\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(36, WarehouseOperationsComponent_Conditional_28_For_37_Template, 2, 2, "option", 32, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 57)(39, "div", 53)(40, "label");
    \u0275\u0275text(41, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.operationDate, $event) || (ctx_r1.form.operationDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 53)(44, "label");
    \u0275\u0275text(45, "\u0627\u0644\u0645\u0631\u062C\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_Template_input_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.reference, $event) || (ctx_r1.form.reference = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 53)(48, "label");
    \u0275\u0275text(49, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "textarea", 61);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseOperationsComponent_Conditional_28_Template_textarea_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.description, $event) || (ctx_r1.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 62)(52, "div", 63)(53, "h4")(54, "span", 2);
    \u0275\u0275text(55, "list");
    \u0275\u0275elementEnd();
    \u0275\u0275text(56, " \u0627\u0644\u0623\u0635\u0646\u0627\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "button", 64);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_28_Template_button_click_57_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addItem());
    });
    \u0275\u0275elementStart(58, "span", 2);
    \u0275\u0275text(59, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(60, " \u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 65)(62, "table", 66)(63, "thead")(64, "tr")(65, "th");
    \u0275\u0275text(66, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "th");
    \u0275\u0275text(68, "\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "th");
    \u0275\u0275text(70, "\u0627\u0644\u0631\u0645\u0632");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "th");
    \u0275\u0275text(72, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "th");
    \u0275\u0275text(74, "\u0627\u0644\u0643\u0645\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "th");
    \u0275\u0275text(76, "\u0627\u0644\u0648\u062D\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "th");
    \u0275\u0275text(78, "\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "th");
    \u0275\u0275text(80, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "th");
    \u0275\u0275text(82, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275element(83, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(84, "tbody");
    \u0275\u0275repeaterCreate(85, WarehouseOperationsComponent_Conditional_28_For_86_Template, 25, 11, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "tfoot")(88, "tr", 67)(89, "td", 68);
    \u0275\u0275text(90, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "td", 69);
    \u0275\u0275text(92);
    \u0275\u0275elementEnd();
    \u0275\u0275element(93, "td")(94, "td");
    \u0275\u0275elementStart(95, "td", 70);
    \u0275\u0275text(96);
    \u0275\u0275elementEnd();
    \u0275\u0275element(97, "td", 71);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(98, "div", 72)(99, "button", 73);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_28_Template_button_click_99_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275conditionalCreate(100, WarehouseOperationsComponent_Conditional_28_Conditional_100_Template, 3, 0)(101, WarehouseOperationsComponent_Conditional_28_Conditional_101_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "button", 74);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_28_Template_button_click_102_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275text(103, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("background", ctx_r1.getTypeMeta(ctx_r1.form.operationType).color + "18")("color", ctx_r1.getTypeMeta(ctx_r1.form.operationType).color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTypeMeta(ctx_r1.form.operationType).icon);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getTypeMeta(ctx_r1.form.operationType).description);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.allTypes);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.needsSource() ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.needsDestination() ? 26 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.needsSupplier() ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.needsRelated() ? 29 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.operationTypeId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.warehouseTemplates());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.operationDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.reference);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.description);
    \u0275\u0275advance(35);
    \u0275\u0275repeater(ctx_r1.form.items);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.getTotalQuantity());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatNumber(ctx_r1.getGrandTotal()));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving() ? 100 : 101);
  }
}
function WarehouseOperationsComponent_Conditional_29_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87)(1, "span", 88);
    \u0275\u0275text(2, "\u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0645\u0635\u062F\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 89);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedOperation().sourceWarehouse.name);
  }
}
function WarehouseOperationsComponent_Conditional_29_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87)(1, "span", 88);
    \u0275\u0275text(2, "\u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0648\u062C\u0647\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 89);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedOperation().destinationWarehouse.name);
  }
}
function WarehouseOperationsComponent_Conditional_29_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87)(1, "span", 88);
    \u0275\u0275text(2, "\u0627\u0644\u0642\u0627\u0644\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 89);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_2_0 = ctx_r1.selectedOperation().operationType) == null ? null : tmp_2_0.name) || "-");
  }
}
function WarehouseOperationsComponent_Conditional_29_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87)(1, "span", 88);
    \u0275\u0275text(2, "\u0627\u0644\u0645\u0631\u062C\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 89);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedOperation().reference);
  }
}
function WarehouseOperationsComponent_Conditional_29_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 90)(1, "span", 88);
    \u0275\u0275text(2, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 89);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedOperation().description);
  }
}
function WarehouseOperationsComponent_Conditional_29_Conditional_37_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 92);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 82);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r29 = ctx.$implicit;
    const \u0275$index_656_r30 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_656_r30 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r29.itemName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r29.itemCode || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r29.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r29.unit || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatNumber(item_r29.unitCost || 0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatNumber(item_r29.totalCost || 0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r29.notes || "-");
  }
}
function WarehouseOperationsComponent_Conditional_29_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "h4")(2, "span", 2);
    \u0275\u0275text(3, "list");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 65)(6, "table", 91)(7, "thead")(8, "tr")(9, "th");
    \u0275\u0275text(10, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u0631\u0645\u0632");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u0643\u0645\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "\u0627\u0644\u0648\u062D\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th");
    \u0275\u0275text(24, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "tbody");
    \u0275\u0275repeaterCreate(26, WarehouseOperationsComponent_Conditional_29_Conditional_37_For_27_Template, 17, 8, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u0627\u0644\u0623\u0635\u0646\u0627\u0641 (", ctx_r1.selectedOperation().items.length, ")");
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r1.selectedOperation().items);
  }
}
function WarehouseOperationsComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_29_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDetail.set(false));
    });
    \u0275\u0275elementStart(1, "div", 50);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_29_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 18)(3, "div", 19)(4, "div", 51)(5, "span", 2);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 21);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_29_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDetail.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 52)(16, "div", 86)(17, "div", 87)(18, "span", 88);
    \u0275\u0275text(19, "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 89);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 87)(23, "span", 88);
    \u0275\u0275text(24, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 49);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 87)(28, "span", 88);
    \u0275\u0275text(29, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 89);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(32, WarehouseOperationsComponent_Conditional_29_Conditional_32_Template, 5, 1, "div", 87);
    \u0275\u0275conditionalCreate(33, WarehouseOperationsComponent_Conditional_29_Conditional_33_Template, 5, 1, "div", 87);
    \u0275\u0275conditionalCreate(34, WarehouseOperationsComponent_Conditional_29_Conditional_34_Template, 5, 1, "div", 87);
    \u0275\u0275conditionalCreate(35, WarehouseOperationsComponent_Conditional_29_Conditional_35_Template, 5, 1, "div", 87);
    \u0275\u0275conditionalCreate(36, WarehouseOperationsComponent_Conditional_29_Conditional_36_Template, 5, 1, "div", 90);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(37, WarehouseOperationsComponent_Conditional_29_Conditional_37_Template, 28, 1, "div", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 72)(39, "button", 74);
    \u0275\u0275listener("click", function WarehouseOperationsComponent_Conditional_29_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDetail.set(false));
    });
    \u0275\u0275text(40, "\u0625\u063A\u0644\u0627\u0642");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_16_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("background", ctx_r1.getTypeMeta(ctx_r1.selectedOperation().operationType).color + "18")("color", ctx_r1.getTypeMeta(ctx_r1.selectedOperation().operationType).color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTypeMeta(ctx_r1.selectedOperation().operationType).icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.selectedOperation().operationNumber);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTypeMeta(ctx_r1.selectedOperation().operationType).label);
    \u0275\u0275advance(9);
    \u0275\u0275styleProp("color", ctx_r1.getTypeMeta(ctx_r1.selectedOperation().operationType).color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getTypeMeta(ctx_r1.selectedOperation().operationType).label, " ");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r1.getStatusClass(ctx_r1.selectedOperation().status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel(ctx_r1.selectedOperation().status));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.selectedOperation().operationDate));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedOperation().sourceWarehouse ? 32 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedOperation().destinationWarehouse ? 33 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedOperation().operationType ? 34 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedOperation().reference ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedOperation().description ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_16_0 = ctx_r1.selectedOperation().items) == null ? null : tmp_16_0.length) ? 37 : -1);
  }
}
var OPERATION_TYPE_META = {
  supply_invoice: { label: "\u062A\u0648\u0631\u064A\u062F \u0641\u0627\u062A\u0648\u0631\u0629", icon: "receipt_long", color: "#22c55e", description: "\u0625\u062F\u062E\u0627\u0644 \u0628\u0636\u0627\u0639\u0629 \u0628\u0641\u0627\u062A\u0648\u0631\u0629 \u0645\u0634\u062A\u0631\u064A\u0627\u062A \u0645\u0646 \u0645\u0648\u0631\u062F" },
  supply_order: { label: "\u062A\u0648\u0631\u064A\u062F \u0623\u0645\u0631", icon: "assignment", color: "#3b82f6", description: "\u0625\u062F\u062E\u0627\u0644 \u0628\u0636\u0627\u0639\u0629 \u0628\u0623\u0645\u0631 \u062A\u0648\u0631\u064A\u062F \u062F\u0627\u062E\u0644\u064A" },
  dispatch: { label: "\u0635\u0631\u0641 \u0645\u062E\u0632\u0646\u064A", icon: "outbox", color: "#ef4444", description: "\u0635\u0631\u0641 \u0628\u0636\u0627\u0639\u0629 \u0645\u0646 \u0627\u0644\u0645\u062E\u0632\u0646" },
  transfer_out: { label: "\u062A\u062D\u0648\u064A\u0644 \u0645\u062E\u0632\u0646\u064A", icon: "swap_horiz", color: "#8b5cf6", description: "\u062A\u062D\u0648\u064A\u0644 \u0628\u0636\u0627\u0639\u0629 \u0645\u0646 \u0645\u062E\u0632\u0646 \u0625\u0644\u0649 \u0622\u062E\u0631" },
  receive_transfer: { label: "\u0627\u0633\u062A\u0644\u0627\u0645 \u062A\u062D\u0648\u064A\u0644", icon: "move_to_inbox", color: "#f59e0b", description: "\u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u0636\u0627\u0639\u0629 \u0645\u062D\u0648\u0644\u0629 \u0645\u0646 \u0645\u062E\u0632\u0646 \u0622\u062E\u0631" }
};
var WarehouseOperationsComponent = class _WarehouseOperationsComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  operations = signal([], ...ngDevMode ? [{ debugName: "operations" }] : (
    /* istanbul ignore next */
    []
  ));
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : (
    /* istanbul ignore next */
    []
  ));
  suppliers = signal([], ...ngDevMode ? [{ debugName: "suppliers" }] : (
    /* istanbul ignore next */
    []
  ));
  itemTypes = signal([], ...ngDevMode ? [{ debugName: "itemTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  operationTypes = signal([], ...ngDevMode ? [{ debugName: "operationTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
    /* istanbul ignore next */
    []
  ));
  showHowItWorks = signal(false, ...ngDevMode ? [{ debugName: "showHowItWorks" }] : (
    /* istanbul ignore next */
    []
  ));
  // فلاتر
  filterType = signal("all", ...ngDevMode ? [{ debugName: "filterType" }] : (
    /* istanbul ignore next */
    []
  ));
  filterWarehouse = signal(null, ...ngDevMode ? [{ debugName: "filterWarehouse" }] : (
    /* istanbul ignore next */
    []
  ));
  // نموذج العملية
  showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : (
    /* istanbul ignore next */
    []
  ));
  showDetail = signal(false, ...ngDevMode ? [{ debugName: "showDetail" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedOperation = signal(null, ...ngDevMode ? [{ debugName: "selectedOperation" }] : (
    /* istanbul ignore next */
    []
  ));
  form = {
    operationType: "supply_invoice",
    sourceWarehouseId: null,
    destinationWarehouseId: null,
    operationTypeId: null,
    supplierId: null,
    relatedOperationId: null,
    operationDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    description: "",
    reference: "",
    items: [this.newItem()]
  };
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const [ops, whs, supps, itemTypesRes, ots] = await Promise.allSettled([
        this.api.getWarehouseOperations(this.bizId),
        this.api.getWarehouses(this.bizId),
        this.api.getSuppliers(this.bizId),
        this.api.getInventoryItemTypes(this.bizId).catch(() => []),
        this.api.getOperationTypes(this.bizId)
      ]);
      this.operations.set(ops.status === "fulfilled" ? ops.value : []);
      this.warehouses.set(whs.status === "fulfilled" ? whs.value : []);
      this.suppliers.set(supps.status === "fulfilled" ? supps.value : []);
      this.itemTypes.set(itemTypesRes.status === "fulfilled" ? itemTypesRes.value : []);
      this.operationTypes.set(ots.status === "fulfilled" ? ots.value : []);
    } catch (e) {
      console.error(e);
    }
    this.loading.set(false);
  }
  // ===== الفلترة =====
  filteredOperations() {
    const ft = this.filterType();
    const fw = this.filterWarehouse();
    let list = this.operations();
    if (ft !== "all")
      list = list.filter((o) => o.operationType === ft);
    if (fw)
      list = list.filter((o) => o.sourceWarehouseId === fw || o.destinationWarehouseId === fw);
    return list;
  }
  // إحصائيات حسب النوع
  countByType(type) {
    return this.operations().filter((o) => o.operationType === type).length;
  }
  // ===== نموذج العملية =====
  newItem() {
    return { itemName: "", itemCode: "", itemTypeId: null, quantity: 1, unitCost: 0, unit: "", notes: "" };
  }
  openAdd(type) {
    this.form = {
      operationType: type || "supply_invoice",
      sourceWarehouseId: null,
      destinationWarehouseId: null,
      operationTypeId: null,
      supplierId: null,
      relatedOperationId: null,
      operationDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      description: "",
      reference: "",
      items: [this.newItem()]
    };
    this.showForm.set(true);
  }
  addItem() {
    this.form.items.push(this.newItem());
  }
  removeItem(index) {
    if (this.form.items.length > 1) {
      this.form.items.splice(index, 1);
    }
  }
  getItemTotal(item) {
    return (item.quantity || 0) * (item.unitCost || 0);
  }
  getGrandTotal() {
    return this.form.items.reduce((sum, item) => sum + this.getItemTotal(item), 0);
  }
  getTotalQuantity() {
    return this.form.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  }
  // هل النوع يحتاج مخزن مصدر
  needsSource() {
    return ["dispatch", "transfer_out"].includes(this.form.operationType);
  }
  // هل النوع يحتاج مخزن وجهة
  needsDestination() {
    return ["supply_invoice", "supply_order", "transfer_out", "receive_transfer"].includes(this.form.operationType);
  }
  // هل النوع يحتاج مورد
  needsSupplier() {
    return this.form.operationType === "supply_invoice";
  }
  // هل النوع يحتاج عملية مرتبطة
  needsRelated() {
    return this.form.operationType === "receive_transfer";
  }
  // القوالب المخزنية فقط
  warehouseTemplates = computed(() => {
    return this.operationTypes().filter((ot) => ot.voucherType && ["supply_invoice", "supply_order", "dispatch", "transfer_out", "receive_transfer"].includes(ot.voucherType));
  }, ...ngDevMode ? [{ debugName: "warehouseTemplates" }] : (
    /* istanbul ignore next */
    []
  ));
  // عمليات التحويل المتاحة للاستلام
  pendingTransfers = computed(() => {
    return this.operations().filter((o) => o.operationType === "transfer_out" && o.status === "confirmed");
  }, ...ngDevMode ? [{ debugName: "pendingTransfers" }] : (
    /* istanbul ignore next */
    []
  ));
  async save() {
    if (this.needsDestination() && !this.form.destinationWarehouseId) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0648\u062C\u0647\u0629");
      return;
    }
    if (this.needsSource() && !this.form.sourceWarehouseId) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0645\u0635\u062F\u0631");
      return;
    }
    if (this.needsSupplier() && !this.form.supplierId) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0648\u0631\u062F");
      return;
    }
    if (this.needsRelated() && !this.form.relatedOperationId) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629");
      return;
    }
    const validItems = this.form.items.filter((i) => i.itemName?.trim());
    if (validItems.length === 0) {
      this.toast.error("\u064A\u062C\u0628 \u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    this.saving.set(true);
    try {
      await this.api.createWarehouseOperation(this.bizId, __spreadProps(__spreadValues({}, this.form), {
        items: validItems
      }));
      this.toast.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0645\u062E\u0632\u0646\u064A\u0629 \u0628\u0646\u062C\u0627\u062D");
      this.showForm.set(false);
      await this.load();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629");
    }
    this.saving.set(false);
  }
  async viewDetail(op) {
    try {
      const detail = await this.api.getWarehouseOperation(op.id);
      this.selectedOperation.set(detail);
      this.showDetail.set(true);
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  // ===== مساعدات =====
  getTypeMeta(type) {
    return OPERATION_TYPE_META[type] || { label: type, icon: "inventory_2", color: "#64748b", description: "" };
  }
  getWarehouseName(id) {
    if (!id)
      return "-";
    const w = this.warehouses().find((w2) => w2.id === id);
    return w ? w.name : "-";
  }
  getSupplierName(id) {
    if (!id)
      return "-";
    const s = this.suppliers().find((s2) => s2.id === id);
    return s ? s.name : "-";
  }
  formatNumber(n) {
    return new Intl.NumberFormat("ar-YE").format(n);
  }
  formatDate(d) {
    if (!d)
      return "-";
    try {
      return formatDate(d);
    } catch {
      return d;
    }
  }
  getStatusLabel(s) {
    const map = { draft: "\u0645\u0633\u0648\u062F\u0629", confirmed: "\u0645\u0624\u0643\u062F", cancelled: "\u0645\u0644\u063A\u064A" };
    return map[s] || s;
  }
  getStatusClass(s) {
    const map = { draft: "draft", confirmed: "confirmed", cancelled: "cancelled" };
    return map[s] || "default";
  }
  allTypes = Object.entries(OPERATION_TYPE_META).map(([key, meta]) => __spreadValues({ key }, meta));
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275WarehouseOperationsComponent_BaseFactory;
    return function WarehouseOperationsComponent_Factory(__ngFactoryType__) {
      return (\u0275WarehouseOperationsComponent_BaseFactory || (\u0275WarehouseOperationsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_WarehouseOperationsComponent)))(__ngFactoryType__ || _WarehouseOperationsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WarehouseOperationsComponent, selectors: [["app-warehouse-operations"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 30, vars: 8, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [2, "display", "flex", "gap", "8px", "align-items", "center"], ["title", "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F", 1, "help-btn", 3, "click"], [1, "add-btn", 3, "click"], [1, "modal-overlay"], [1, "type-cards"], [1, "type-card", 3, "border-top-color"], [1, "filter-row"], [1, "filter-tabs"], [1, "filter-tab", 3, "click"], [1, "filter-select", 3, "ngModel"], [1, "loading-state"], [1, "empty-state"], [1, "operations-list"], [1, "modal-overlay", 3, "click"], [1, "modal-card", "wide-modal", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "amber"], [1, "close-btn", 3, "click"], [1, "modal-body", "how-it-works"], [1, "hiw-section"], ["dir", "ltr", 2, "font-family", "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace"], [1, "type-card", 3, "click"], [1, "type-icon"], [1, "type-info"], [1, "type-label"], [1, "type-count"], [1, "filter-tab", 3, "active", "--tab-color"], [1, "filter-select", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [1, "material-icons-round", "spin"], [1, "empty-hint"], [1, "operation-row"], [1, "operation-row", 3, "click"], [1, "op-icon"], [1, "op-info"], [1, "op-title"], [1, "op-number"], [1, "op-type-label"], [1, "op-meta"], [1, "op-template"], [1, "op-date"], [1, "op-desc"], [1, "op-stats"], [1, "op-amount"], [1, "op-items"], [1, "status-badge"], [1, "modal-card", "modal-large", 3, "click"], [1, "modal-icon"], [1, "modal-body"], [1, "form-group"], [1, "required"], [1, "type-selector"], [1, "type-option", 3, "selected", "--opt-color"], [1, "form-row"], [3, "ngModelChange", "ngModel"], ["type", "date", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0623\u0648 \u0627\u0644\u0645\u0631\u062C\u0639", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644\u064A\u0629...", 3, "ngModelChange", "ngModel"], [1, "items-section"], [1, "items-header"], [1, "add-item-btn", 3, "click"], [1, "items-table-wrapper"], [1, "items-table"], [1, "totals-row"], ["colspan", "4", 1, "totals-label"], [1, "totals-value"], [1, "totals-value", "grand-total"], ["colspan", "2"], [1, "modal-footer"], [1, "btn-save", 3, "click", "disabled"], [1, "btn-cancel", 3, "click"], [1, "type-option", 3, "click"], [1, "row-num"], ["placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641", 1, "table-input", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0627\u0644\u0631\u0645\u0632", "dir", "ltr", 1, "table-input", "code-input", 3, "ngModelChange", "ngModel"], [1, "table-input", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 1, "table-input", "num-input", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0648\u062D\u062F\u0629", 1, "table-input", "unit-input", 3, "ngModelChange", "ngModel"], [1, "total-cell"], ["placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A", 1, "table-input", 3, "ngModelChange", "ngModel"], [1, "remove-item-btn"], [1, "remove-item-btn", 3, "click"], [1, "detail-grid"], [1, "detail-item"], [1, "detail-label"], [1, "detail-value"], [1, "detail-item", "full-width"], [1, "items-table", "detail-table"], [1, "code-cell"]], template: function WarehouseOperationsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "inventory_2");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0646\u064A\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "button", 4);
      \u0275\u0275listener("click", function WarehouseOperationsComponent_Template_button_click_7_listener() {
        return ctx.showHowItWorks.set(true);
      });
      \u0275\u0275elementStart(8, "span", 2);
      \u0275\u0275text(9, "help_outline");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "button", 5);
      \u0275\u0275listener("click", function WarehouseOperationsComponent_Template_button_click_10_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(11, "span", 2);
      \u0275\u0275text(12, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(13, " \u0639\u0645\u0644\u064A\u0629 \u062C\u062F\u064A\u062F\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(14, WarehouseOperationsComponent_Conditional_14_Template, 45, 0, "div", 6);
      \u0275\u0275elementStart(15, "div", 7);
      \u0275\u0275repeaterCreate(16, WarehouseOperationsComponent_For_17_Template, 9, 9, "div", 8, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 9)(19, "div", 10)(20, "button", 11);
      \u0275\u0275listener("click", function WarehouseOperationsComponent_Template_button_click_20_listener() {
        return ctx.filterType.set("all");
      });
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(22, WarehouseOperationsComponent_For_23_Template, 1, 1, null, null, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(24, WarehouseOperationsComponent_Conditional_24_Template, 5, 2, "select", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(25, WarehouseOperationsComponent_Conditional_25_Template, 5, 0, "div", 13)(26, WarehouseOperationsComponent_Conditional_26_Template, 7, 0, "div", 14)(27, WarehouseOperationsComponent_Conditional_27_Template, 3, 0, "div", 15);
      \u0275\u0275conditionalCreate(28, WarehouseOperationsComponent_Conditional_28_Template, 104, 19, "div", 6);
      \u0275\u0275conditionalCreate(29, WarehouseOperationsComponent_Conditional_29_Template, 41, 20, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275conditional(ctx.showHowItWorks() ? 14 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.allTypes);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("active", ctx.filterType() === "all");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" \u0627\u0644\u0643\u0644 (", ctx.operations().length, ") ");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.allTypes);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.warehouses().length > 0 ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 25 : !ctx.filteredOperations().length ? 26 : 27);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDetail() && ctx.selectedOperation() ? 29 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.type-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.type-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  border-top: 3px solid;\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.type-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n}\n.type-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.type-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.type-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.type-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.type-count[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.filter-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  flex: 1;\n}\n.filter-tab[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.filter-tab.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.filter-select[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  min-width: 160px;\n}\n.operations-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.operation-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 20px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.operation-row[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n}\n.op-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.op-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.op-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.op-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 4px;\n}\n.op-number[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary);\n  font-family: monospace;\n  direction: ltr;\n}\n.op-type-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n}\n.op-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.op-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.op-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.op-desc[_ngcontent-%COMP%] {\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.op-stats[_ngcontent-%COMP%] {\n  text-align: left;\n  flex-shrink: 0;\n}\n.op-amount[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.op-items[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.modal-large[_ngcontent-%COMP%] {\n  max-width: 900px !important;\n  width: 95vw !important;\n}\n.type-selector[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.type-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary);\n  transition: all 0.2s;\n}\n.type-option[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.type-option[_ngcontent-%COMP%]:hover {\n  background: var(--bg-hover);\n}\n.type-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--opt-color);\n  background: color-mix(in srgb, var(--opt-color) 10%, transparent);\n  color: var(--opt-color);\n}\n.type-option.selected[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--opt-color);\n}\n.items-section[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.items-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n.items-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.items-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--text-secondary);\n}\n.add-item-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 14px;\n  border-radius: 8px;\n  border: 1px dashed var(--border-color);\n  background: transparent;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--accent-blue);\n  transition: all 0.2s;\n}\n.add-item-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.add-item-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.08);\n  border-color: var(--accent-blue);\n}\n.items-table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n}\n.items-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.items-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  font-weight: 700;\n  text-align: right;\n  white-space: nowrap;\n  border-bottom: 1px solid var(--border-color);\n}\n.items-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border-bottom: 1px solid var(--border-color);\n  vertical-align: middle;\n}\n.items-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: var(--bg-hover);\n}\n.table-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 6px 8px;\n  border-radius: 6px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 13px;\n  font-weight: 600;\n}\n.table-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--accent-blue);\n  outline: none;\n}\n.code-input[_ngcontent-%COMP%] {\n  max-width: 90px;\n  direction: ltr;\n}\n.num-input[_ngcontent-%COMP%] {\n  max-width: 100px;\n  text-align: center;\n}\n.unit-input[_ngcontent-%COMP%] {\n  max-width: 70px;\n}\n.row-num[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-weight: 700;\n  text-align: center;\n  width: 30px;\n}\n.total-cell[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: var(--text-primary);\n  white-space: nowrap;\n}\n.code-cell[_ngcontent-%COMP%] {\n  font-family: monospace;\n  direction: ltr;\n  color: var(--text-secondary);\n}\n.remove-item-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 6px;\n  border: none;\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.remove-item-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.remove-item-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.2);\n}\n.totals-row[_ngcontent-%COMP%] {\n  background: var(--bg-surface);\n}\n.totals-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: var(--text-primary);\n  padding: 12px;\n}\n.totals-label[_ngcontent-%COMP%] {\n  text-align: right;\n  color: var(--text-secondary) !important;\n}\n.totals-value[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.grand-total[_ngcontent-%COMP%] {\n  color: var(--accent-blue) !important;\n  font-size: 15px;\n}\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.detail-item.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.detail-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-bottom: 4px;\n}\n.detail-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.detail-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.detail-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.status-badge.confirmed[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #22c55e;\n}\n.status-badge.draft[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n}\n.status-badge.cancelled[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.12);\n  color: #ef4444;\n}\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n@media (max-width: 768px) {\n  .type-cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .operation-row[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n  .op-stats[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: right;\n  }\n  .items-table[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .type-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .type-selector[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=warehouse-operations.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WarehouseOperationsComponent, [{
    type: Component,
    args: [{ selector: "app-warehouse-operations", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">inventory_2</span> \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0646\u064A\u0629</h2>\r
    <div style="display:flex;gap:8px;align-items:center">\r
      <button class="help-btn" (click)="showHowItWorks.set(true)" title="\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F">\r
        <span class="material-icons-round">help_outline</span>\r
      </button>\r
      <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">add</span> \u0639\u0645\u0644\u064A\u0629 \u062C\u062F\u064A\u062F\u0629</button>\r
    </div>\r
  </div>\r
\r
  @if (showHowItWorks()) {\r
    <div class="modal-overlay" (click)="showHowItWorks.set(false)">\r
      <div class="modal-card wide-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon amber"><span class="material-icons-round">help_outline</span></div>\r
            <h2>\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0646\u064A\u0629\u061F</h2>\r
          </div>\r
          <button class="close-btn" (click)="showHowItWorks.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body how-it-works">\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">inventory_2</span> \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</h3>\r
            <p>\r
              \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u0644\u064A\u0633\u062A \u0633\u0646\u062F\u0627\u062A \u0642\u0628\u0636/\u0635\u0631\u0641. \u0647\u0646\u0627 \u0639\u0646\u062F\u0643 \u0639\u0645\u0644\u064A\u0627\u062A \u0645\u062E\u0632\u0646\u064A\u0629 \u0645\u062B\u0644: \u062A\u0648\u0631\u064A\u062F \u0641\u0627\u062A\u0648\u0631\u0629\u060C \u062A\u0648\u0631\u064A\u062F \u0623\u0645\u0631\u060C \u0635\u0631\u0641\u060C \u062A\u062D\u0648\u064A\u0644\u060C \u0627\u0633\u062A\u0644\u0627\u0645 \u062A\u062D\u0648\u064A\u0644.\r
            </p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">tag</span> \u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</h3>\r
            <p>\r
              \u0631\u0642\u0645 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u064A\u064F\u0648\u0644\u0651\u062F \u062D\u0633\u0628 <strong>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 + \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0632\u0646 + \u0631\u0642\u0645 \u0627\u0644\u0645\u062E\u0632\u0646 + \u0627\u0644\u0633\u0646\u0629 + \u062A\u0633\u0644\u0633\u0644 \u064A\u0628\u062F\u0623 \u0645\u0646 1</strong>.\r
            </p>\r
            <p dir="ltr" style="font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace">\r
              WHS-01-2025-\u0627\u0633\u062A\u0644\u0627\u0645-0001 | WHS-02-2025-\u0635\u0631\u0641-0003\r
            </p>\r
            <p><small>\u0627\u0644\u062A\u0633\u0644\u0633\u0644 \u064A\u0628\u062F\u0623 \u0645\u0646 <strong>1</strong> \u0644\u0643\u0644 \u0645\u062E\u0632\u0646 \u0648\u0644\u0643\u0644 \u0633\u0646\u0629 (\u0648\u0643\u0644 \u0639\u0645\u0644 \u0645\u0646\u0641\u0635\u0644).</small></p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">category</span> \u0627\u0644\u0642\u0648\u0627\u0644\u0628 (\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A)</h3>\r
            <p>\r
              "\u0627\u0644\u0642\u0627\u0644\u0628" (\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629) \u064A\u062D\u062F\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0644\u0644\u0639\u0645\u0644\u064A\u0629. \u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0633\u062A\u0642\u0644 \u0639\u0646 \u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0645\u062E\u0632\u0646.\r
            </p>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u0628\u0637\u0627\u0642\u0627\u062A \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A -->\r
  <div class="type-cards">\r
    @for (t of allTypes; track t.key) {\r
      <div class="type-card" [style.border-top-color]="t.color" (click)="openAdd(t.key)">\r
        <div class="type-icon" [style.background]="t.color + '18'" [style.color]="t.color">\r
          <span class="material-icons-round">{{ t.icon }}</span>\r
        </div>\r
        <div class="type-info">\r
          <span class="type-label">{{ t.label }}</span>\r
          <span class="type-count">{{ countByType(t.key) }} \u0639\u0645\u0644\u064A\u0629</span>\r
        </div>\r
      </div>\r
    }\r
  </div>\r
\r
  <!-- \u0641\u0644\u0627\u062A\u0631 -->\r
  <div class="filter-row">\r
    <div class="filter-tabs">\r
      <button class="filter-tab" [class.active]="filterType() === 'all'" (click)="filterType.set('all')">\r
        \u0627\u0644\u0643\u0644 ({{ operations().length }})\r
      </button>\r
      @for (t of allTypes; track t.key) {\r
        @if (countByType(t.key) > 0) {\r
          <button class="filter-tab" [class.active]="filterType() === t.key" (click)="filterType.set(t.key)"\r
            [style.--tab-color]="t.color">\r
            {{ t.label }} ({{ countByType(t.key) }})\r
          </button>\r
        }\r
      }\r
    </div>\r
    @if (warehouses().length > 0) {\r
      <select class="filter-select" [ngModel]="filterWarehouse()" (ngModelChange)="filterWarehouse.set($event)">\r
        <option [ngValue]="null">\u0643\u0644 \u0627\u0644\u0645\u062E\u0627\u0632\u0646</option>\r
        @for (w of warehouses(); track w.id) {\r
          <option [ngValue]="w.id">{{ w.name }}</option>\r
        }\r
      </select>\r
    }\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!filteredOperations().length) {\r
    <div class="empty-state">\r
      <span class="material-icons-round">inventory_2</span>\r
      <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0645\u062E\u0632\u0646\u064A\u0629</p>\r
      <p class="empty-hint">\u0623\u0646\u0634\u0626 \u0639\u0645\u0644\u064A\u0629 \u062C\u062F\u064A\u062F\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0632\u0631 \u0623\u0639\u0644\u0627\u0647 \u0623\u0648 \u0628\u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0623\u062D\u062F \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</p>\r
    </div>\r
  } @else {\r
    <div class="operations-list">\r
      @for (op of filteredOperations(); track op.id) {\r
        <div class="operation-row" (click)="viewDetail(op)">\r
          <div class="op-icon" [style.background]="getTypeMeta(op.operationType).color + '18'" [style.color]="getTypeMeta(op.operationType).color">\r
            <span class="material-icons-round">{{ getTypeMeta(op.operationType).icon }}</span>\r
          </div>\r
          <div class="op-info">\r
            <div class="op-title">\r
              <span class="op-number">{{ op.operationNumber }}</span>\r
              <span class="op-type-label" [style.color]="getTypeMeta(op.operationType).color">{{ getTypeMeta(op.operationType).label }}</span>\r
            </div>\r
            <div class="op-meta">\r
              @if (op.operationTypeName) {\r
                <span class="op-template"><span class="material-icons-round">{{ op.operationTypeIcon || 'receipt_long' }}</span> {{ op.operationTypeName }}</span>\r
              }\r
              <span class="op-date"><span class="material-icons-round">event</span> {{ formatDate(op.operationDate) }}</span>\r
              @if (op.description) {\r
                <span class="op-desc">{{ op.description }}</span>\r
              }\r
            </div>\r
          </div>\r
          <div class="op-stats">\r
            <span class="op-amount">{{ formatNumber(op.totalCost || 0) }}</span>\r
            <span class="op-items">{{ op.totalItems || 0 }} \u0635\u0646\u0641</span>\r
          </div>\r
          <span class="status-badge" [class]="getStatusClass(op.status)">{{ getStatusLabel(op.status) }}</span>\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- \u0646\u0645\u0648\u0630\u062C \u0625\u0646\u0634\u0627\u0621 \u0639\u0645\u0644\u064A\u0629 \u0645\u062E\u0632\u0646\u064A\u0629 -->\r
  @if (showForm()) {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-card modal-large" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon" [style.background]="getTypeMeta(form.operationType).color + '18'" [style.color]="getTypeMeta(form.operationType).color">\r
              <span class="material-icons-round">{{ getTypeMeta(form.operationType).icon }}</span>\r
            </div>\r
            <div>\r
              <h2>\u0639\u0645\u0644\u064A\u0629 \u0645\u062E\u0632\u0646\u064A\u0629 \u062C\u062F\u064A\u062F\u0629</h2>\r
              <p>{{ getTypeMeta(form.operationType).description }}</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <!-- \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 -->\r
          <div class="form-group">\r
            <label>\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 <span class="required">*</span></label>\r
            <div class="type-selector">\r
              @for (t of allTypes; track t.key) {\r
                <button class="type-option" [class.selected]="form.operationType === t.key"\r
                  (click)="form.operationType = t.key" [style.--opt-color]="t.color">\r
                  <span class="material-icons-round">{{ t.icon }}</span>\r
                  <span>{{ t.label }}</span>\r
                </button>\r
              }\r
            </div>\r
          </div>\r
\r
          <div class="form-row">\r
            <!-- \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0645\u0635\u062F\u0631 -->\r
            @if (needsSource()) {\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0645\u0635\u062F\u0631 <span class="required">*</span></label>\r
                <select [(ngModel)]="form.sourceWarehouseId">\r
                  <option [ngValue]="null">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646...</option>\r
                  @for (w of warehouses(); track w.id) {\r
                    <option [ngValue]="w.id">{{ w.name }}</option>\r
                  }\r
                </select>\r
              </div>\r
            }\r
\r
            <!-- \u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0648\u062C\u0647\u0629 -->\r
            @if (needsDestination()) {\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0648\u062C\u0647\u0629 <span class="required">*</span></label>\r
                <select [(ngModel)]="form.destinationWarehouseId">\r
                  <option [ngValue]="null">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0632\u0646...</option>\r
                  @for (w of warehouses(); track w.id) {\r
                    <option [ngValue]="w.id">{{ w.name }}</option>\r
                  }\r
                </select>\r
              </div>\r
            }\r
          </div>\r
\r
          <div class="form-row">\r
            <!-- \u0627\u0644\u0645\u0648\u0631\u062F -->\r
            @if (needsSupplier()) {\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0645\u0648\u0631\u062F <span class="required">*</span></label>\r
                <select [(ngModel)]="form.supplierId">\r
                  <option [ngValue]="null">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0631\u062F...</option>\r
                  @for (s of suppliers(); track s.id) {\r
                    <option [ngValue]="s.id">{{ s.name }}</option>\r
                  }\r
                </select>\r
              </div>\r
            }\r
\r
            <!-- \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 -->\r
            @if (needsRelated()) {\r
              <div class="form-group">\r
                <label>\u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 <span class="required">*</span></label>\r
                <select [(ngModel)]="form.relatedOperationId">\r
                  <option [ngValue]="null">\u0627\u062E\u062A\u0631 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062A\u062D\u0648\u064A\u0644...</option>\r
                  @for (t of pendingTransfers(); track t.id) {\r
                    <option [ngValue]="t.id">{{ t.operationNumber }} - {{ formatDate(t.operationDate) }}</option>\r
                  }\r
                </select>\r
              </div>\r
            }\r
\r
            <!-- \u0627\u0644\u0642\u0627\u0644\u0628 -->\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0642\u0627\u0644\u0628 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>\r
              <select [(ngModel)]="form.operationTypeId">\r
                <option [ngValue]="null">\u0628\u062F\u0648\u0646 \u0642\u0627\u0644\u0628</option>\r
                @for (ot of warehouseTemplates(); track ot.id) {\r
                  <option [ngValue]="ot.id">{{ ot.name }}</option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</label>\r
              <input type="date" [(ngModel)]="form.operationDate" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0631\u062C\u0639</label>\r
              <input [(ngModel)]="form.reference" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0623\u0648 \u0627\u0644\u0645\u0631\u062C\u0639" />\r
            </div>\r
          </div>\r
\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0648\u0635\u0641</label>\r
            <textarea [(ngModel)]="form.description" rows="2" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644\u064A\u0629..."></textarea>\r
          </div>\r
\r
          <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0623\u0635\u0646\u0627\u0641 -->\r
          <div class="items-section">\r
            <div class="items-header">\r
              <h4><span class="material-icons-round">list</span> \u0627\u0644\u0623\u0635\u0646\u0627\u0641</h4>\r
              <button class="add-item-btn" (click)="addItem()">\r
                <span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0641\r
              </button>\r
            </div>\r
            <div class="items-table-wrapper">\r
              <table class="items-table">\r
                <thead>\r
                  <tr>\r
                    <th>#</th>\r
                    <th>\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641</th>\r
                    <th>\u0627\u0644\u0631\u0645\u0632</th>\r
                    <th>\u0627\u0644\u0646\u0648\u0639</th>\r
                    <th>\u0627\u0644\u0643\u0645\u064A\u0629</th>\r
                    <th>\u0627\u0644\u0648\u062D\u062F\u0629</th>\r
                    <th>\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629</th>\r
                    <th>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</th>\r
                    <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>\r
                    <th></th>\r
                  </tr>\r
                </thead>\r
                <tbody>\r
                  @for (item of form.items; track $index; let i = $index) {\r
                    <tr>\r
                      <td class="row-num">{{ i + 1 }}</td>\r
                      <td><input [(ngModel)]="item.itemName" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641" class="table-input" /></td>\r
                      <td><input [(ngModel)]="item.itemCode" placeholder="\u0627\u0644\u0631\u0645\u0632" class="table-input code-input" dir="ltr" /></td>\r
                      <td>\r
                        <select [(ngModel)]="item.itemTypeId" class="table-input">\r
                          <option [ngValue]="null">\u0628\u062F\u0648\u0646 \u0646\u0648\u0639</option>\r
                          @for (t of itemTypes(); track t.id) {\r
                            <option [ngValue]="t.id">{{ t.name }}</option>\r
                          }\r
                        </select>\r
                      </td>\r
                      <td><input type="number" [(ngModel)]="item.quantity" min="0" class="table-input num-input" /></td>\r
                      <td><input [(ngModel)]="item.unit" placeholder="\u0648\u062D\u062F\u0629" class="table-input unit-input" /></td>\r
                      <td><input type="number" [(ngModel)]="item.unitCost" min="0" class="table-input num-input" /></td>\r
                      <td class="total-cell">{{ formatNumber(getItemTotal(item)) }}</td>\r
                      <td><input [(ngModel)]="item.notes" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" class="table-input" /></td>\r
                      <td>\r
                        @if (form.items.length > 1) {\r
                          <button class="remove-item-btn" (click)="removeItem(i)">\r
                            <span class="material-icons-round">close</span>\r
                          </button>\r
                        }\r
                      </td>\r
                    </tr>\r
                  }\r
                </tbody>\r
                <tfoot>\r
                  <tr class="totals-row">\r
                    <td colspan="4" class="totals-label">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</td>\r
                    <td class="totals-value">{{ getTotalQuantity() }}</td>\r
                    <td></td>\r
                    <td></td>\r
                    <td class="totals-value grand-total">{{ formatNumber(getGrandTotal()) }}</td>\r
                    <td colspan="2"></td>\r
                  </tr>\r
                </tfoot>\r
              </table>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()" [disabled]="saving()">\r
            @if (saving()) { <span class="material-icons-round spin">sync</span> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638... }\r
            @else { <span class="material-icons-round">check</span> \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 }\r
          </button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 -->\r
  @if (showDetail() && selectedOperation()) {\r
    <div class="modal-overlay" (click)="showDetail.set(false)">\r
      <div class="modal-card modal-large" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon" [style.background]="getTypeMeta(selectedOperation().operationType).color + '18'"\r
              [style.color]="getTypeMeta(selectedOperation().operationType).color">\r
              <span class="material-icons-round">{{ getTypeMeta(selectedOperation().operationType).icon }}</span>\r
            </div>\r
            <div>\r
              <h2>{{ selectedOperation().operationNumber }}</h2>\r
              <p>{{ getTypeMeta(selectedOperation().operationType).label }}</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showDetail.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="detail-grid">\r
            <div class="detail-item">\r
              <span class="detail-label">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</span>\r
              <span class="detail-value" [style.color]="getTypeMeta(selectedOperation().operationType).color">\r
                {{ getTypeMeta(selectedOperation().operationType).label }}\r
              </span>\r
            </div>\r
            <div class="detail-item">\r
              <span class="detail-label">\u0627\u0644\u062D\u0627\u0644\u0629</span>\r
              <span class="status-badge" [class]="getStatusClass(selectedOperation().status)">{{ getStatusLabel(selectedOperation().status) }}</span>\r
            </div>\r
            <div class="detail-item">\r
              <span class="detail-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</span>\r
              <span class="detail-value">{{ formatDate(selectedOperation().operationDate) }}</span>\r
            </div>\r
            @if (selectedOperation().sourceWarehouse) {\r
              <div class="detail-item">\r
                <span class="detail-label">\u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0645\u0635\u062F\u0631</span>\r
                <span class="detail-value">{{ selectedOperation().sourceWarehouse.name }}</span>\r
              </div>\r
            }\r
            @if (selectedOperation().destinationWarehouse) {\r
              <div class="detail-item">\r
                <span class="detail-label">\u0627\u0644\u0645\u062E\u0632\u0646 \u0627\u0644\u0648\u062C\u0647\u0629</span>\r
                <span class="detail-value">{{ selectedOperation().destinationWarehouse.name }}</span>\r
              </div>\r
            }\r
            @if (selectedOperation().operationType) {\r
              <div class="detail-item">\r
                <span class="detail-label">\u0627\u0644\u0642\u0627\u0644\u0628</span>\r
                <span class="detail-value">{{ selectedOperation().operationType?.name || '-' }}</span>\r
              </div>\r
            }\r
            @if (selectedOperation().reference) {\r
              <div class="detail-item">\r
                <span class="detail-label">\u0627\u0644\u0645\u0631\u062C\u0639</span>\r
                <span class="detail-value">{{ selectedOperation().reference }}</span>\r
              </div>\r
            }\r
            @if (selectedOperation().description) {\r
              <div class="detail-item full-width">\r
                <span class="detail-label">\u0627\u0644\u0648\u0635\u0641</span>\r
                <span class="detail-value">{{ selectedOperation().description }}</span>\r
              </div>\r
            }\r
          </div>\r
\r
          <!-- \u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 -->\r
          @if (selectedOperation().items?.length) {\r
            <div class="items-section">\r
              <h4><span class="material-icons-round">list</span> \u0627\u0644\u0623\u0635\u0646\u0627\u0641 ({{ selectedOperation().items.length }})</h4>\r
              <div class="items-table-wrapper">\r
                <table class="items-table detail-table">\r
                  <thead>\r
                    <tr>\r
                      <th>#</th>\r
                      <th>\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641</th>\r
                      <th>\u0627\u0644\u0631\u0645\u0632</th>\r
                      <th>\u0627\u0644\u0643\u0645\u064A\u0629</th>\r
                      <th>\u0627\u0644\u0648\u062D\u062F\u0629</th>\r
                      <th>\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629</th>\r
                      <th>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</th>\r
                      <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>\r
                    </tr>\r
                  </thead>\r
                  <tbody>\r
                    @for (item of selectedOperation().items; track item.id; let i = $index) {\r
                      <tr>\r
                        <td>{{ i + 1 }}</td>\r
                        <td>{{ item.itemName }}</td>\r
                        <td class="code-cell">{{ item.itemCode || '-' }}</td>\r
                        <td>{{ item.quantity }}</td>\r
                        <td>{{ item.unit || '-' }}</td>\r
                        <td>{{ formatNumber(item.unitCost || 0) }}</td>\r
                        <td class="total-cell">{{ formatNumber(item.totalCost || 0) }}</td>\r
                        <td>{{ item.notes || '-' }}</td>\r
                      </tr>\r
                    }\r
                  </tbody>\r
                </table>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-cancel" (click)="showDetail.set(false)">\u0625\u063A\u0644\u0627\u0642</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/warehouse-operations/warehouse-operations.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.type-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 12px;\n  margin-bottom: 20px;\n}\n.type-card {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  border-top: 3px solid;\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.type-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);\n}\n.type-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.type-icon .material-icons-round {\n  font-size: 22px;\n}\n.type-info {\n  display: flex;\n  flex-direction: column;\n}\n.type-label {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.type-count {\n  font-size: 11px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.filter-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.filter-tabs {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  flex: 1;\n}\n.filter-tab {\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab:hover {\n  background: var(--bg-card-hover);\n}\n.filter-tab.active {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.filter-select {\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  min-width: 160px;\n}\n.operations-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.operation-row {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 20px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.operation-row:hover {\n  background: var(--bg-card-hover);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n}\n.op-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.op-icon .material-icons-round {\n  font-size: 22px;\n}\n.op-info {\n  flex: 1;\n  min-width: 0;\n}\n.op-title {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 4px;\n}\n.op-number {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary);\n  font-family: monospace;\n  direction: ltr;\n}\n.op-type-label {\n  font-size: 12px;\n  font-weight: 700;\n}\n.op-meta {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.op-meta span {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.op-meta span .material-icons-round {\n  font-size: 14px;\n}\n.op-desc {\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.op-stats {\n  text-align: left;\n  flex-shrink: 0;\n}\n.op-amount {\n  display: block;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.op-items {\n  display: block;\n  font-size: 11px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.modal-large {\n  max-width: 900px !important;\n  width: 95vw !important;\n}\n.type-selector {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.type-option {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary);\n  transition: all 0.2s;\n}\n.type-option .material-icons-round {\n  font-size: 18px;\n}\n.type-option:hover {\n  background: var(--bg-hover);\n}\n.type-option.selected {\n  border-color: var(--opt-color);\n  background: color-mix(in srgb, var(--opt-color) 10%, transparent);\n  color: var(--opt-color);\n}\n.type-option.selected .material-icons-round {\n  color: var(--opt-color);\n}\n.items-section {\n  margin-top: 20px;\n}\n.items-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n.items-header h4 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.items-header h4 .material-icons-round {\n  font-size: 18px;\n  color: var(--text-secondary);\n}\n.add-item-btn {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 14px;\n  border-radius: 8px;\n  border: 1px dashed var(--border-color);\n  background: transparent;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--accent-blue);\n  transition: all 0.2s;\n}\n.add-item-btn .material-icons-round {\n  font-size: 16px;\n}\n.add-item-btn:hover {\n  background: rgba(59, 130, 246, 0.08);\n  border-color: var(--accent-blue);\n}\n.items-table-wrapper {\n  overflow-x: auto;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n}\n.items-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.items-table th {\n  padding: 10px 12px;\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  font-weight: 700;\n  text-align: right;\n  white-space: nowrap;\n  border-bottom: 1px solid var(--border-color);\n}\n.items-table td {\n  padding: 8px 10px;\n  border-bottom: 1px solid var(--border-color);\n  vertical-align: middle;\n}\n.items-table tbody tr:hover {\n  background: var(--bg-hover);\n}\n.table-input {\n  width: 100%;\n  padding: 6px 8px;\n  border-radius: 6px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 13px;\n  font-weight: 600;\n}\n.table-input:focus {\n  border-color: var(--accent-blue);\n  outline: none;\n}\n.code-input {\n  max-width: 90px;\n  direction: ltr;\n}\n.num-input {\n  max-width: 100px;\n  text-align: center;\n}\n.unit-input {\n  max-width: 70px;\n}\n.row-num {\n  color: var(--text-muted);\n  font-weight: 700;\n  text-align: center;\n  width: 30px;\n}\n.total-cell {\n  font-weight: 800;\n  color: var(--text-primary);\n  white-space: nowrap;\n}\n.code-cell {\n  font-family: monospace;\n  direction: ltr;\n  color: var(--text-secondary);\n}\n.remove-item-btn {\n  width: 28px;\n  height: 28px;\n  border-radius: 6px;\n  border: none;\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.remove-item-btn .material-icons-round {\n  font-size: 16px;\n}\n.remove-item-btn:hover {\n  background: rgba(239, 68, 68, 0.2);\n}\n.totals-row {\n  background: var(--bg-surface);\n}\n.totals-row td {\n  font-weight: 800;\n  color: var(--text-primary);\n  padding: 12px;\n}\n.totals-label {\n  text-align: right;\n  color: var(--text-secondary) !important;\n}\n.totals-value {\n  text-align: center;\n}\n.grand-total {\n  color: var(--accent-blue) !important;\n  font-size: 15px;\n}\n.detail-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.detail-item.full-width {\n  grid-column: 1/-1;\n}\n.detail-label {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-bottom: 4px;\n}\n.detail-value {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.detail-table td,\n.detail-table th {\n  text-align: right;\n}\n.status-badge {\n  padding: 4px 12px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.status-badge.confirmed {\n  background: rgba(34, 197, 94, 0.12);\n  color: #22c55e;\n}\n.status-badge.draft {\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n}\n.status-badge.cancelled {\n  background: rgba(239, 68, 68, 0.12);\n  color: #ef4444;\n}\n.empty-hint {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.required {\n  color: #ef4444;\n}\n@media (max-width: 768px) {\n  .type-cards {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .operation-row {\n    flex-wrap: wrap;\n  }\n  .op-stats {\n    width: 100%;\n    text-align: right;\n  }\n  .items-table {\n    font-size: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .type-cards {\n    grid-template-columns: 1fr;\n  }\n  .type-selector {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=warehouse-operations.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WarehouseOperationsComponent, { className: "WarehouseOperationsComponent", filePath: "src/app/pages/warehouse-operations/warehouse-operations.ts", lineNumber: 37 });
})();
export {
  WarehouseOperationsComponent
};
//# sourceMappingURL=chunk-MMIPIFL7.js.map
