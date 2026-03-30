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
  DatePipe,
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
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
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

// src/app/pages/purchase-invoices/purchase-invoices.ts
var _forTrack0 = ($index, $item) => $item.id;
function PurchaseInvoicesComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "span", 18);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function PurchaseInvoicesComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 2);
    \u0275\u0275text(2, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u0648\u0627\u062A\u064A\u0631");
    \u0275\u0275elementEnd()();
  }
}
function PurchaseInvoicesComponent_Conditional_50_For_23_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_50_For_23_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const inv_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.confirm(inv_r2));
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2, "check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "button", 27);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_50_For_23_Conditional_24_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const inv_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit(inv_r2));
    });
    \u0275\u0275elementStart(4, "span", 2);
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd()();
  }
}
function PurchaseInvoicesComponent_Conditional_50_For_23_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_50_For_23_Conditional_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const inv_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.remove(inv_r2));
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
}
function PurchaseInvoicesComponent_Conditional_50_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "div", 19);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_50_For_23_Template_div_click_4_listener() {
      const inv_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewDetails(inv_r2));
    });
    \u0275\u0275elementStart(5, "span", 2);
    \u0275\u0275text(6, "receipt");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 20);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 21);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 22);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td")(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "td")(23, "div", 23);
    \u0275\u0275conditionalCreate(24, PurchaseInvoicesComponent_Conditional_50_For_23_Conditional_24_Template, 6, 0);
    \u0275\u0275elementStart(25, "button", 24);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_50_For_23_Template_button_click_25_listener() {
      const inv_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewDetails(inv_r2));
    });
    \u0275\u0275elementStart(26, "span", 2);
    \u0275\u0275text(27, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(28, PurchaseInvoicesComponent_Conditional_50_For_23_Conditional_28_Template, 3, 0, "button", 25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const inv_r2 = ctx.$implicit;
    const \u0275$index_134_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_134_r6 + 1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", inv_r2.fullSequenceNumber || inv_r2.invoiceNumber, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(inv_r2.supplierName || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 13, inv_r2.invoiceDate, "yyyy-MM-dd"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(inv_r2.totalAmount));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(inv_r2.paidAmount));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(inv_r2.remainingAmount));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("status-badge ", ctx_r2.getStatusClass(inv_r2.status)));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getStatusLabel(inv_r2.status));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(inv_r2.status === "draft" ? 24 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(inv_r2.status !== "completed" ? 28 : -1);
  }
}
function PurchaseInvoicesComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 16)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0627\u0644\u0645\u0648\u0631\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u0645\u062F\u0641\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u0645\u062A\u0628\u0642\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "\u0625\u062C\u0631\u0627\u0621\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275repeaterCreate(22, PurchaseInvoicesComponent_Conditional_50_For_23_Template, 29, 16, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r2.filteredInvoices());
  }
}
function PurchaseInvoicesComponent_Conditional_51_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", s_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r8.name);
  }
}
function PurchaseInvoicesComponent_Conditional_51_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r9 = ctx.$implicit;
    \u0275\u0275property("ngValue", w_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r9.name);
  }
}
function PurchaseInvoicesComponent_Conditional_51_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r10 = ctx.$implicit;
    \u0275\u0275property("ngValue", c_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", c_r10.name, " (", c_r10.symbol, ")");
  }
}
function PurchaseInvoicesComponent_Conditional_51_For_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    \u0275\u0275property("ngValue", item_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", item_r11.name, " (", item_r11.code, ")");
  }
}
function PurchaseInvoicesComponent_Conditional_51_Conditional_103_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
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
    \u0275\u0275elementStart(13, "td")(14, "button", 62);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_51_Conditional_103_For_18_Template_button_click_14_listener() {
      const \u0275$index_405_r13 = \u0275\u0275restoreView(_r12).$index;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.removeItem(\u0275$index_405_r13));
    });
    \u0275\u0275elementStart(15, "span", 2);
    \u0275\u0275text(16, "close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r14.itemName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r14.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(item_r14.unitCost));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(item_r14.quantity * item_r14.unitCost));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(item_r14.tax));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(item_r14.discount));
  }
}
function PurchaseInvoicesComponent_Conditional_51_Conditional_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 53)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "\u0627\u0644\u0635\u0646\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u0643\u0645\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0636\u0631\u064A\u0628\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u062E\u0635\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275repeaterCreate(17, PurchaseInvoicesComponent_Conditional_51_Conditional_103_For_18_Template, 17, 6, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "tfoot")(20, "tr")(21, "td", 58);
    \u0275\u0275text(22, "\u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u0639\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td", 59);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "tr")(26, "td", 58);
    \u0275\u0275text(27, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0636\u0631\u064A\u0628\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "td", 59);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "tr")(31, "td", 58);
    \u0275\u0275text(32, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062E\u0635\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "td", 59);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "tr", 60)(36, "td", 58);
    \u0275\u0275text(37, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0646\u0647\u0627\u0626\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "td", 61);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r2.form.items);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(ctx_r2.formSubtotal()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(ctx_r2.formTax()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(ctx_r2.formDiscount()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(ctx_r2.formTotal()));
  }
}
function PurchaseInvoicesComponent_Conditional_51_Conditional_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "span", 2);
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0645 \u062A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0623\u0635\u0646\u0627\u0641 \u0628\u0639\u062F");
    \u0275\u0275elementEnd()();
  }
}
function PurchaseInvoicesComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_51_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 30);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_51_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 31)(3, "div", 32)(4, "div", 33)(5, "span", 2);
    \u0275\u0275text(6, "receipt_long");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0648\u0627\u0644\u0623\u0635\u0646\u0627\u0641");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 34);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_51_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 35)(16, "div", 36)(17, "h3");
    \u0275\u0275text(18, "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 37)(20, "div", 38)(21, "label");
    \u0275\u0275text(22, "\u0627\u0644\u0645\u0648\u0631\u062F *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_select_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.supplierId, $event) || (ctx_r2.form.supplierId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(24, "option", 40);
    \u0275\u0275text(25, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0631\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(26, PurchaseInvoicesComponent_Conditional_51_For_27_Template, 2, 2, "option", 40, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 38)(29, "label");
    \u0275\u0275text(30, "\u0627\u0644\u0645\u0633\u062A\u0648\u062F\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_select_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.warehouseId, $event) || (ctx_r2.form.warehouseId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(32, "option", 40);
    \u0275\u0275text(33, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u062A\u0648\u062F\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(34, PurchaseInvoicesComponent_Conditional_51_For_35_Template, 2, 2, "option", 40, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 38)(37, "label");
    \u0275\u0275text(38, "\u0627\u0644\u0639\u0645\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_select_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.currencyId, $event) || (ctx_r2.form.currencyId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(40, PurchaseInvoicesComponent_Conditional_51_For_41_Template, 2, 3, "option", 40, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "div", 37)(43, "div", 38)(44, "label");
    \u0275\u0275text(45, "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_select_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.paymentMethod, $event) || (ctx_r2.form.paymentMethod = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(47, "option", 41);
    \u0275\u0275text(48, "\u0646\u0642\u062F\u0627\u064B");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "option", 42);
    \u0275\u0275text(50, "\u0622\u062C\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "option", 43);
    \u0275\u0275text(52, "\u062C\u0632\u0626\u064A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 38)(54, "label");
    \u0275\u0275text(55, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_input_ngModelChange_56_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.invoiceDate, $event) || (ctx_r2.form.invoiceDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 38)(58, "label");
    \u0275\u0275text(59, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_input_ngModelChange_60_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.dueDate, $event) || (ctx_r2.form.dueDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(61, "div", 37)(62, "div", 38)(63, "label");
    \u0275\u0275text(64, "\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u062E\u0627\u0631\u062C\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_input_ngModelChange_65_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.externalReference, $event) || (ctx_r2.form.externalReference = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 38)(67, "label");
    \u0275\u0275text(68, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_input_ngModelChange_69_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.notes, $event) || (ctx_r2.form.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(70, "div", 36)(71, "h3");
    \u0275\u0275text(72, "\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 47)(74, "div", 37)(75, "div", 48)(76, "label");
    \u0275\u0275text(77, "\u0627\u0644\u0635\u0646\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_select_ngModelChange_78_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newItem.inventoryItemId, $event) || (ctx_r2.newItem.inventoryItemId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(79, "option", 40);
    \u0275\u0275text(80, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(81, PurchaseInvoicesComponent_Conditional_51_For_82_Template, 2, 3, "option", 40, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "div", 38)(84, "label");
    \u0275\u0275text(85, "\u0627\u0644\u0643\u0645\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "input", 49);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_input_ngModelChange_86_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newItem.quantity, $event) || (ctx_r2.newItem.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(87, "div", 38)(88, "label");
    \u0275\u0275text(89, "\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_input_ngModelChange_90_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newItem.unitCost, $event) || (ctx_r2.newItem.unitCost = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div", 38)(92, "label");
    \u0275\u0275text(93, "\u0627\u0644\u0636\u0631\u064A\u0628\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_input_ngModelChange_94_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newItem.tax, $event) || (ctx_r2.newItem.tax = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div", 38)(96, "label");
    \u0275\u0275text(97, "\u0627\u0644\u062E\u0635\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function PurchaseInvoicesComponent_Conditional_51_Template_input_ngModelChange_98_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newItem.discount, $event) || (ctx_r2.newItem.discount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(99, "div", 51)(100, "button", 52);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_51_Template_button_click_100_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addItem());
    });
    \u0275\u0275elementStart(101, "span", 2);
    \u0275\u0275text(102, "add");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(103, PurchaseInvoicesComponent_Conditional_51_Conditional_103_Template, 40, 4, "table", 53)(104, PurchaseInvoicesComponent_Conditional_51_Conditional_104_Template, 5, 0, "div", 54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(105, "div", 55)(106, "button", 56);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_51_Template_button_click_106_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275text(107);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "button", 57);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_51_Template_button_click_108_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275text(109, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u0641\u0627\u062A\u0648\u0631\u0629" : "\u0641\u0627\u062A\u0648\u0631\u0629 \u0645\u0634\u062A\u0631\u064A\u0627\u062A \u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.supplierId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.suppliers());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.warehouseId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.warehouses());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.currencyId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.currencies());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.paymentMethod);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.invoiceDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.dueDate);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.externalReference);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.notes);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newItem.inventoryItemId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", 0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.inventoryItems());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newItem.quantity);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newItem.unitCost);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newItem.tax);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newItem.discount);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.form.items.length ? 103 : 104);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
  }
}
function PurchaseInvoicesComponent_Conditional_52_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "span", 66);
    \u0275\u0275text(2, "\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0631\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 72);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.selectedInvoice().supplierSequenceNumber);
  }
}
function PurchaseInvoicesComponent_Conditional_52_Conditional_60_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r16.itemName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r16.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(item_r16.unitCost));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(item_r16.totalCost || item_r16.quantity * item_r16.unitCost));
  }
}
function PurchaseInvoicesComponent_Conditional_52_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 73);
    \u0275\u0275text(1, "\u0627\u0644\u0623\u0635\u0646\u0627\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "table", 53)(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u0635\u0646\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0627\u0644\u0643\u0645\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275repeaterCreate(14, PurchaseInvoicesComponent_Conditional_52_Conditional_60_For_15_Template, 9, 4, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.selectedInvoice().items);
  }
}
function PurchaseInvoicesComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_52_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showDetails.set(false));
    });
    \u0275\u0275elementStart(1, "div", 30);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_52_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 31)(3, "div", 32)(4, "div", 63)(5, "span", 2);
    \u0275\u0275text(6, "receipt_long");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 34);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_52_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showDetails.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 35)(16, "div", 64)(17, "div", 65)(18, "span", 66);
    \u0275\u0275text(19, "\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0639\u0627\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 67);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(22, PurchaseInvoicesComponent_Conditional_52_Conditional_22_Template, 5, 1, "div", 65);
    \u0275\u0275elementStart(23, "div", 65)(24, "span", 66);
    \u0275\u0275text(25, "\u0627\u0644\u0645\u0648\u0631\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 68);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 65)(29, "span", 66);
    \u0275\u0275text(30, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 68)(32, "span");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 65)(35, "span", 66);
    \u0275\u0275text(36, "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 68);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 65)(40, "span", 66);
    \u0275\u0275text(41, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 68);
    \u0275\u0275text(43);
    \u0275\u0275pipe(44, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 65)(46, "span", 66);
    \u0275\u0275text(47, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 69);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 65)(51, "span", 66);
    \u0275\u0275text(52, "\u0627\u0644\u0645\u062F\u0641\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "span", 70);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 65)(56, "span", 66);
    \u0275\u0275text(57, "\u0627\u0644\u0645\u062A\u0628\u0642\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "span", 71);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(60, PurchaseInvoicesComponent_Conditional_52_Conditional_60_Template, 16, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "div", 55)(62, "button", 57);
    \u0275\u0275listener("click", function PurchaseInvoicesComponent_Conditional_52_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showDetails.set(false));
    });
    \u0275\u0275text(63, "\u0625\u063A\u0644\u0627\u0642");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("\u0641\u0627\u062A\u0648\u0631\u0629 \u0631\u0642\u0645 ", ctx_r2.selectedInvoice().fullSequenceNumber || ctx_r2.selectedInvoice().invoiceNumber);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r2.selectedInvoice().fullSequenceNumber || ctx_r2.selectedInvoice().invoiceNumber);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectedInvoice().supplierSequenceNumber ? 22 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.selectedInvoice().supplierName);
    \u0275\u0275advance(5);
    \u0275\u0275classMap(\u0275\u0275interpolate1("status-badge ", ctx_r2.getStatusClass(ctx_r2.selectedInvoice().status)));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getStatusLabel(ctx_r2.selectedInvoice().status));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.getPaymentLabel(ctx_r2.selectedInvoice().paymentMethod));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(44, 14, ctx_r2.selectedInvoice().invoiceDate, "yyyy-MM-dd"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(ctx_r2.selectedInvoice().totalAmount));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(ctx_r2.selectedInvoice().paidAmount));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatNumber(ctx_r2.selectedInvoice().remainingAmount));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_12_0 = ctx_r2.selectedInvoice().items) == null ? null : tmp_12_0.length) ? 60 : -1);
  }
}
var PurchaseInvoicesComponent = class _PurchaseInvoicesComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  invoices = signal([], ...ngDevMode ? [{ debugName: "invoices" }] : (
    /* istanbul ignore next */
    []
  ));
  suppliers = signal([], ...ngDevMode ? [{ debugName: "suppliers" }] : (
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
  inventoryItems = signal([], ...ngDevMode ? [{ debugName: "inventoryItems" }] : (
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
  showDetails = signal(false, ...ngDevMode ? [{ debugName: "showDetails" }] : (
    /* istanbul ignore next */
    []
  ));
  editingId = signal(null, ...ngDevMode ? [{ debugName: "editingId" }] : (
    /* istanbul ignore next */
    []
  ));
  filterStatus = signal("all", ...ngDevMode ? [{ debugName: "filterStatus" }] : (
    /* istanbul ignore next */
    []
  ));
  searchQuery = signal("", ...ngDevMode ? [{ debugName: "searchQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedInvoice = signal(null, ...ngDevMode ? [{ debugName: "selectedInvoice" }] : (
    /* istanbul ignore next */
    []
  ));
  form = {
    supplierId: null,
    warehouseId: null,
    currencyId: 1,
    paymentMethod: "credit",
    invoiceDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    dueDate: "",
    externalReference: "",
    notes: "",
    items: []
  };
  newItem = {
    inventoryItemId: 0,
    quantity: 1,
    unitCost: 0,
    tax: 0,
    discount: 0,
    notes: ""
  };
  formSubtotal = computed(() => {
    return this.form.items.reduce((sum, item) => {
      return sum + item.quantity * item.unitCost;
    }, 0);
  }, ...ngDevMode ? [{ debugName: "formSubtotal" }] : (
    /* istanbul ignore next */
    []
  ));
  formTax = computed(() => {
    return this.form.items.reduce((sum, item) => sum + (item.tax || 0), 0);
  }, ...ngDevMode ? [{ debugName: "formTax" }] : (
    /* istanbul ignore next */
    []
  ));
  formDiscount = computed(() => {
    return this.form.items.reduce((sum, item) => sum + (item.discount || 0), 0);
  }, ...ngDevMode ? [{ debugName: "formDiscount" }] : (
    /* istanbul ignore next */
    []
  ));
  formTotal = computed(() => {
    return this.formSubtotal() + this.formTax() - this.formDiscount();
  }, ...ngDevMode ? [{ debugName: "formTotal" }] : (
    /* istanbul ignore next */
    []
  ));
  onBizIdChange(_bizId) {
    this.loadAll();
  }
  async loadAll() {
    this.loading.set(true);
    try {
      const [invoicesData, suppliersData, warehousesData, currenciesData, itemsData] = await Promise.all([
        this.api.getPurchaseInvoices(this.bizId),
        this.api.getSuppliers(this.bizId),
        this.api.getWarehouses(this.bizId),
        this.api.getCurrencies(),
        this.api.getInventoryItems(this.bizId)
      ]);
      this.invoices.set(invoicesData);
      this.suppliers.set(suppliersData);
      this.warehouses.set(warehousesData);
      this.currencies.set(currenciesData);
      this.inventoryItems.set(itemsData);
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    }
    this.loading.set(false);
  }
  filteredInvoices() {
    let list = this.invoices();
    const status = this.filterStatus();
    const q = this.searchQuery().toLowerCase();
    if (status !== "all")
      list = list.filter((inv) => inv.status === status);
    if (q)
      list = list.filter((inv) => inv.invoiceNumber.toLowerCase().includes(q) || (inv.supplierName || "").toLowerCase().includes(q) || (inv.externalReference || "").toLowerCase().includes(q));
    return list;
  }
  statusCount(status) {
    if (status === "all")
      return this.invoices().length;
    return this.invoices().filter((inv) => inv.status === status).length;
  }
  openAdd() {
    this.form = {
      supplierId: null,
      warehouseId: null,
      currencyId: 1,
      paymentMethod: "credit",
      invoiceDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      dueDate: "",
      externalReference: "",
      notes: "",
      items: []
    };
    this.editingId.set(null);
    this.showForm.set(true);
  }
  async openEdit(inv) {
    try {
      const details = await this.api.getPurchaseInvoice(this.bizId, inv.id);
      this.form = {
        supplierId: details.supplierId,
        warehouseId: details.warehouseId,
        currencyId: details.currencyId,
        paymentMethod: details.paymentMethod,
        invoiceDate: details.invoiceDate ? new Date(details.invoiceDate).toISOString().split("T")[0] : "",
        dueDate: details.dueDate ? new Date(details.dueDate).toISOString().split("T")[0] : "",
        externalReference: details.externalReference || "",
        notes: details.notes || "",
        items: (details.items || []).map((item) => ({
          inventoryItemId: item.inventoryItemId,
          itemName: item.itemName,
          quantity: parseFloat(item.quantity),
          unitCost: parseFloat(item.unitCost),
          tax: parseFloat(item.tax),
          discount: parseFloat(item.discount),
          notes: item.notes
        }))
      };
      this.editingId.set(inv.id);
      this.showForm.set(true);
    } catch (e) {
      console.error(e);
      this.toast.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
    }
  }
  async viewDetails(inv) {
    try {
      const details = await this.api.getPurchaseInvoice(this.bizId, inv.id);
      this.selectedInvoice.set(details);
      this.showDetails.set(true);
    } catch (e) {
      console.error(e);
      this.toast.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
    }
  }
  addItem() {
    if (!this.newItem.inventoryItemId || this.newItem.quantity <= 0 || this.newItem.unitCost <= 0) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0635\u0646\u0641 \u0648\u0627\u0644\u0643\u0645\u064A\u0629 \u0648\u0627\u0644\u0633\u0639\u0631");
      return;
    }
    const item = this.inventoryItems().find((i) => i.id === this.newItem.inventoryItemId);
    this.form.items.push(__spreadProps(__spreadValues({}, this.newItem), {
      itemName: item?.name || "",
      totalCost: this.newItem.quantity * this.newItem.unitCost
    }));
    this.newItem = { inventoryItemId: 0, quantity: 1, unitCost: 0, tax: 0, discount: 0, notes: "" };
  }
  removeItem(index) {
    this.form.items.splice(index, 1);
  }
  async save() {
    if (!this.form.supplierId) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0648\u0631\u062F");
      return;
    }
    if (!this.form.items.length) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0635\u0631 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    try {
      const payload = __spreadProps(__spreadValues({}, this.form), {
        items: this.form.items.map((item) => ({
          inventoryItemId: item.inventoryItemId,
          quantity: item.quantity,
          unitCost: item.unitCost,
          tax: item.tax,
          discount: item.discount,
          notes: item.notes
        }))
      });
      if (this.editingId()) {
        await this.api.updatePurchaseInvoice(this.bizId, this.editingId(), payload);
        this.toast.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0628\u0646\u062C\u0627\u062D");
      } else {
        await this.api.createPurchaseInvoice(this.bizId, payload);
        this.toast.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0628\u0646\u062C\u0627\u062D");
      }
      this.showForm.set(false);
      await this.loadAll();
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
    }
  }
  async confirm(inv) {
    try {
      await this.api.confirmPurchaseInvoice(this.bizId, inv.id);
      this.toast.success("\u062A\u0645 \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0628\u0646\u062C\u0627\u062D");
      await this.loadAll();
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u0641\u0634\u0644 \u0641\u064A \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629");
    }
  }
  async remove(inv) {
    const confirmed = await this.toast.confirm({
      title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641",
      message: `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 "${inv.invoiceNumber}"\u061F`,
      type: "danger"
    });
    if (confirmed) {
      try {
        await this.api.deletePurchaseInvoice(this.bizId, inv.id);
        this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0628\u0646\u062C\u0627\u062D");
        await this.loadAll();
      } catch (e) {
        console.error(e);
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641");
      }
    }
  }
  getStatusLabel(status) {
    const map = {
      draft: "\u0645\u0633\u0648\u062F\u0629",
      confirmed: "\u0645\u0624\u0643\u062F\u0629",
      partial: "\u062C\u0632\u0626\u064A\u0629",
      completed: "\u0645\u0643\u062A\u0645\u0644\u0629",
      cancelled: "\u0645\u0644\u063A\u0627\u0629"
    };
    return map[status] || status;
  }
  getStatusClass(status) {
    const map = {
      draft: "gray",
      confirmed: "blue",
      partial: "amber",
      completed: "green",
      cancelled: "red"
    };
    return map[status] || "gray";
  }
  getPaymentLabel(method) {
    const map = { cash: "\u0646\u0642\u062F\u0627\u064B", credit: "\u0622\u062C\u0644", partial: "\u062C\u0632\u0626\u064A" };
    return map[method] || method;
  }
  formatNumber(val) {
    const num = typeof val === "string" ? parseFloat(val) : val;
    return isNaN(num) ? "0" : num.toLocaleString("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275PurchaseInvoicesComponent_BaseFactory;
    return function PurchaseInvoicesComponent_Factory(__ngFactoryType__) {
      return (\u0275PurchaseInvoicesComponent_BaseFactory || (\u0275PurchaseInvoicesComponent_BaseFactory = \u0275\u0275getInheritedFactory(_PurchaseInvoicesComponent)))(__ngFactoryType__ || _PurchaseInvoicesComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PurchaseInvoicesComponent, selectors: [["app-purchase-invoices"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 53, vars: 16, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "summary-row"], [1, "summary-card", "gray", 3, "click"], [1, "num"], [1, "lbl"], [1, "summary-card", "blue", 3, "click"], [1, "summary-card", "amber", 3, "click"], [1, "summary-card", "green", 3, "click"], [1, "toolbar"], [1, "search-box"], ["type", "text", "placeholder", "\u0628\u062D\u062B \u0628\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0623\u0648 \u0627\u0644\u0645\u0648\u0631\u062F...", 3, "ngModelChange", "ngModel"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], [1, "modal-overlay"], [1, "material-icons-round", "spin"], [1, "invoice-num", 3, "click"], [1, "amount"], [1, "amount", "paid"], [1, "amount", "remaining"], [1, "action-btns"], ["title", "\u0639\u0631\u0636", 1, "action-btn", "view", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "action-btn", "delete"], ["title", "\u062A\u0623\u0643\u064A\u062F", 1, "action-btn", "confirm", 3, "click"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "action-btn", "edit", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "action-btn", "delete", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", "large", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "blue"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-section"], [1, "form-row"], [1, "form-group"], [3, "ngModelChange", "ngModel"], [3, "ngValue"], ["value", "cash"], ["value", "credit"], ["value", "partial"], ["type", "date", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u0631\u0642\u0645 \u0641\u0627\u062A\u0648\u0631\u0629 \u0627\u0644\u0645\u0648\u0631\u062F", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629", 3, "ngModelChange", "ngModel"], [1, "item-form"], [1, "form-group", "flex-2"], ["type", "number", "min", "0.01", "step", "0.01", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "step", "0.01", 3, "ngModelChange", "ngModel"], [1, "form-group", "btn-group"], [1, "btn-add-item", 3, "click"], [1, "items-table"], [1, "empty-items"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"], ["colspan", "3", 1, "label"], ["colspan", "4"], [1, "total-row"], ["colspan", "4", 1, "total-value"], [1, "btn-remove-item", 3, "click"], [1, "modal-icon", "green"], [1, "details-grid"], [1, "detail-item"], [1, "label"], [1, "value", "seq-num"], [1, "value"], [1, "value", "amount"], [1, "value", "amount", "paid"], [1, "value", "amount", "remaining"], [1, "value", "seq-num", "supplier"], [1, "section-title"]], template: function PurchaseInvoicesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "receipt_long");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0641\u0648\u0627\u062A\u064A\u0631 \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function PurchaseInvoicesComponent_Template_button_click_6_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0641\u0627\u062A\u0648\u0631\u0629 \u062C\u062F\u064A\u062F\u0629");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5);
      \u0275\u0275listener("click", function PurchaseInvoicesComponent_Template_div_click_11_listener() {
        return ctx.filterStatus.set("all");
      });
      \u0275\u0275elementStart(12, "span", 2);
      \u0275\u0275text(13, "receipt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div")(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 7);
      \u0275\u0275text(18, "\u0627\u0644\u0643\u0644");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 8);
      \u0275\u0275listener("click", function PurchaseInvoicesComponent_Template_div_click_19_listener() {
        return ctx.filterStatus.set("confirmed");
      });
      \u0275\u0275elementStart(20, "span", 2);
      \u0275\u0275text(21, "verified");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div")(23, "span", 6);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "span", 7);
      \u0275\u0275text(26, "\u0645\u0624\u0643\u062F\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 9);
      \u0275\u0275listener("click", function PurchaseInvoicesComponent_Template_div_click_27_listener() {
        return ctx.filterStatus.set("draft");
      });
      \u0275\u0275elementStart(28, "span", 2);
      \u0275\u0275text(29, "edit_note");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div")(31, "span", 6);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span", 7);
      \u0275\u0275text(34, "\u0645\u0633\u0648\u062F\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 10);
      \u0275\u0275listener("click", function PurchaseInvoicesComponent_Template_div_click_35_listener() {
        return ctx.filterStatus.set("completed");
      });
      \u0275\u0275elementStart(36, "span", 2);
      \u0275\u0275text(37, "check_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div")(39, "span", 6);
      \u0275\u0275text(40);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "span", 7);
      \u0275\u0275text(42, "\u0645\u0643\u062A\u0645\u0644\u0629");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(43, "div", 11)(44, "div", 12)(45, "span", 2);
      \u0275\u0275text(46, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "input", 13);
      \u0275\u0275listener("ngModelChange", function PurchaseInvoicesComponent_Template_input_ngModelChange_47_listener($event) {
        return ctx.searchQuery.set($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(48, PurchaseInvoicesComponent_Conditional_48_Template, 5, 0, "div", 14)(49, PurchaseInvoicesComponent_Conditional_49_Template, 5, 0, "div", 15)(50, PurchaseInvoicesComponent_Conditional_50_Template, 24, 0, "table", 16);
      \u0275\u0275conditionalCreate(51, PurchaseInvoicesComponent_Conditional_51_Template, 110, 19, "div", 17);
      \u0275\u0275conditionalCreate(52, PurchaseInvoicesComponent_Conditional_52_Template, 64, 17, "div", 17);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275classProp("active", ctx.filterStatus() === "all");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.statusCount("all"));
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.filterStatus() === "confirmed");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.statusCount("confirmed"));
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.filterStatus() === "draft");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.statusCount("draft"));
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.filterStatus() === "completed");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.statusCount("completed"));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.searchQuery());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 48 : !ctx.filteredInvoices().length ? 49 : 50);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 51 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDetails() && ctx.selectedInvoice() ? 52 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, DatePipe], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.gray[_ngcontent-%COMP%] {\n  background: var(--bg-surface);\n}\n.summary-card.gray[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n}\n.summary-card.blue[_ngcontent-%COMP%] {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-1-color);\n}\n.summary-card.amber[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.summary-card.green[_ngcontent-%COMP%] {\n  background: var(--stat-2-bg);\n}\n.summary-card.green[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-2-color);\n}\n.summary-card.red[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.08);\n}\n.summary-card.red[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.summary-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.summary-card.active[_ngcontent-%COMP%] {\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  flex: 1;\n  min-width: 200px;\n}\n.search-box[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--text-muted);\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  width: 100%;\n  outline: none;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.invoice-num[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  cursor: pointer;\n  color: var(--accent-blue);\n  font-weight: 700;\n}\n.invoice-num[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.invoice-num[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.amount[_ngcontent-%COMP%] {\n  font-weight: 700;\n  text-align: left;\n  direction: ltr;\n}\n.amount.paid[_ngcontent-%COMP%] {\n  color: var(--stat-2-color);\n}\n.amount.remaining[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n}\n.status-badge.gray[_ngcontent-%COMP%] {\n  background: var(--bg-surface);\n  color: var(--text-muted);\n}\n.status-badge.blue[_ngcontent-%COMP%] {\n  background: var(--stat-1-bg);\n  color: var(--stat-1-color);\n}\n.status-badge.amber[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n}\n.status-badge.green[_ngcontent-%COMP%] {\n  background: var(--stat-2-bg);\n  color: var(--stat-2-color);\n}\n.status-badge.red[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.12);\n  color: #ef4444;\n}\n.action-btns[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.action-btn.view[_ngcontent-%COMP%] {\n  background: var(--stat-1-bg);\n  color: var(--stat-1-color);\n}\n.action-btn.edit[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n}\n.action-btn.confirm[_ngcontent-%COMP%] {\n  background: var(--stat-2-bg);\n  color: var(--stat-2-color);\n}\n.action-btn.delete[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.12);\n  color: #ef4444;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n}\n.modal-card.large[_ngcontent-%COMP%] {\n  width: 90%;\n  max-width: 900px;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.form-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  margin-bottom: 12px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid var(--border-color);\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 12px;\n}\n.form-group[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.form-group.flex-2[_ngcontent-%COMP%] {\n  flex: 2;\n}\n.form-group.btn-group[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: flex-end;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-size: 14px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n}\n.btn-add-item[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.btn-add-item[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.btn-add-item[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n.items-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 12px;\n}\n.items-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.items-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  text-align: right;\n  border-bottom: 1px solid var(--border-color);\n}\n.items-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n}\n.items-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n}\n.items-table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.items-table[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  text-align: left;\n  color: var(--text-secondary);\n}\n.items-table[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%] {\n  background: var(--stat-1-bg);\n}\n.items-table[_ngcontent-%COMP%]   .total-value[_ngcontent-%COMP%] {\n  color: var(--accent-blue);\n  font-size: 16px;\n}\n.btn-remove-item[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 6px;\n  border: none;\n  background: rgba(239, 68, 68, 0.12);\n  color: #ef4444;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.btn-remove-item[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.btn-remove-item[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.25);\n}\n.empty-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  color: var(--text-muted);\n}\n.empty-items[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 8px;\n}\n.empty-items[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n}\n.details-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.detail-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-muted);\n  margin-bottom: 4px;\n}\n.detail-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.detail-item[_ngcontent-%COMP%]   .value.amount[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  margin: 16px 0 12px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid var(--border-color);\n}\n@media (max-width: 640px) {\n  .summary-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .modal-card.large[_ngcontent-%COMP%] {\n    width: 95%;\n  }\n}\n/*# sourceMappingURL=purchase-invoices.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PurchaseInvoicesComponent, [{
    type: Component,
    args: [{ selector: "app-purchase-invoices", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">receipt_long</span> \u0641\u0648\u0627\u062A\u064A\u0631 \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A</h2>\r
    <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">add</span> \u0641\u0627\u062A\u0648\u0631\u0629 \u062C\u062F\u064A\u062F\u0629</button>\r
  </div>\r
\r
  <div class="summary-row">\r
    <div class="summary-card gray" [class.active]="filterStatus() === 'all'" (click)="filterStatus.set('all')">\r
      <span class="material-icons-round">receipt</span>\r
      <div><span class="num">{{ statusCount('all') }}</span><span class="lbl">\u0627\u0644\u0643\u0644</span></div>\r
    </div>\r
    <div class="summary-card blue" [class.active]="filterStatus() === 'confirmed'" (click)="filterStatus.set('confirmed')">\r
      <span class="material-icons-round">verified</span>\r
      <div><span class="num">{{ statusCount('confirmed') }}</span><span class="lbl">\u0645\u0624\u0643\u062F\u0629</span></div>\r
    </div>\r
    <div class="summary-card amber" [class.active]="filterStatus() === 'draft'" (click)="filterStatus.set('draft')">\r
      <span class="material-icons-round">edit_note</span>\r
      <div><span class="num">{{ statusCount('draft') }}</span><span class="lbl">\u0645\u0633\u0648\u062F\u0629</span></div>\r
    </div>\r
    <div class="summary-card green" [class.active]="filterStatus() === 'completed'" (click)="filterStatus.set('completed')">\r
      <span class="material-icons-round">check_circle</span>\r
      <div><span class="num">{{ statusCount('completed') }}</span><span class="lbl">\u0645\u0643\u062A\u0645\u0644\u0629</span></div>\r
    </div>\r
  </div>\r
\r
  <div class="toolbar">\r
    <div class="search-box">\r
      <span class="material-icons-round">search</span>\r
      <input type="text" placeholder="\u0628\u062D\u062B \u0628\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0623\u0648 \u0627\u0644\u0645\u0648\u0631\u062F..." [ngModel]="searchQuery()" (ngModelChange)="searchQuery.set($event)" />\r
    </div>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!filteredInvoices().length) {\r
    <div class="empty-state"><span class="material-icons-round">receipt_long</span><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u0648\u0627\u062A\u064A\u0631</p></div>\r
  } @else {\r
    <table class="data-table">\r
      <thead>\r
        <tr>\r
          <th>#</th>\r
          <th>\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</th>\r
          <th>\u0627\u0644\u0645\u0648\u0631\u062F</th>\r
          <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>\r
          <th>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</th>\r
          <th>\u0627\u0644\u0645\u062F\u0641\u0648\u0639</th>\r
          <th>\u0627\u0644\u0645\u062A\u0628\u0642\u064A</th>\r
          <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>\r
          <th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
        @for (inv of filteredInvoices(); track inv.id; let i = $index) {\r
          <tr>\r
            <td>{{ i + 1 }}</td>\r
            <td>\r
              <div class="invoice-num" (click)="viewDetails(inv)">\r
                <span class="material-icons-round">receipt</span>\r
                {{ inv.fullSequenceNumber || inv.invoiceNumber }}\r
              </div>\r
            </td>\r
            <td>{{ inv.supplierName || '-' }}</td>\r
            <td>{{ inv.invoiceDate | date:'yyyy-MM-dd' }}</td>\r
            <td class="amount">{{ formatNumber(inv.totalAmount) }}</td>\r
            <td class="amount paid">{{ formatNumber(inv.paidAmount) }}</td>\r
            <td class="amount remaining">{{ formatNumber(inv.remainingAmount) }}</td>\r
            <td><span class="status-badge {{ getStatusClass(inv.status) }}">{{ getStatusLabel(inv.status) }}</span></td>\r
            <td>\r
              <div class="action-btns">\r
                @if (inv.status === 'draft') {\r
                  <button class="action-btn confirm" title="\u062A\u0623\u0643\u064A\u062F" (click)="confirm(inv)"><span class="material-icons-round">check</span></button>\r
                  <button class="action-btn edit" title="\u062A\u0639\u062F\u064A\u0644" (click)="openEdit(inv)"><span class="material-icons-round">edit</span></button>\r
                }\r
                <button class="action-btn view" title="\u0639\u0631\u0636" (click)="viewDetails(inv)"><span class="material-icons-round">visibility</span></button>\r
                @if (inv.status !== 'completed') {\r
                  <button class="action-btn delete" title="\u062D\u0630\u0641" (click)="remove(inv)"><span class="material-icons-round">delete</span></button>\r
                }\r
              </div>\r
            </td>\r
          </tr>\r
        }\r
      </tbody>\r
    </table>\r
  }\r
\r
  <!-- \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 -->\r
  @if (showForm()) {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-card large" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon blue"><span class="material-icons-round">receipt_long</span></div>\r
            <div><h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u0641\u0627\u062A\u0648\u0631\u0629' : '\u0641\u0627\u062A\u0648\u0631\u0629 \u0645\u0634\u062A\u0631\u064A\u0627\u062A \u062C\u062F\u064A\u062F\u0629' }}</h2><p>\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0648\u0627\u0644\u0623\u0635\u0646\u0627\u0641</p></div>\r
          </div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-section">\r
            <h3>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</h3>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0645\u0648\u0631\u062F *</label>\r
                <select [(ngModel)]="form.supplierId">\r
                  <option [ngValue]="null">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0631\u062F</option>\r
                  @for (s of suppliers(); track s.id) {\r
                    <option [ngValue]="s.id">{{ s.name }}</option>\r
                  }\r
                </select>\r
              </div>\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0645\u0633\u062A\u0648\u062F\u0639</label>\r
                <select [(ngModel)]="form.warehouseId">\r
                  <option [ngValue]="null">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u062A\u0648\u062F\u0639</option>\r
                  @for (w of warehouses(); track w.id) {\r
                    <option [ngValue]="w.id">{{ w.name }}</option>\r
                  }\r
                </select>\r
              </div>\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0639\u0645\u0644\u0629</label>\r
                <select [(ngModel)]="form.currencyId">\r
                  @for (c of currencies(); track c.id) {\r
                    <option [ngValue]="c.id">{{ c.name }} ({{ c.symbol }})</option>\r
                  }\r
                </select>\r
              </div>\r
            </div>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label>\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639</label>\r
                <select [(ngModel)]="form.paymentMethod">\r
                  <option value="cash">\u0646\u0642\u062F\u0627\u064B</option>\r
                  <option value="credit">\u0622\u062C\u0644</option>\r
                  <option value="partial">\u062C\u0632\u0626\u064A</option>\r
                </select>\r
              </div>\r
              <div class="form-group">\r
                <label>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</label>\r
                <input type="date" [(ngModel)]="form.invoiceDate" />\r
              </div>\r
              <div class="form-group">\r
                <label>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642</label>\r
                <input type="date" [(ngModel)]="form.dueDate" />\r
              </div>\r
            </div>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0645\u0631\u062C\u0639 \u0627\u0644\u062E\u0627\u0631\u062C\u064A</label>\r
                <input type="text" [(ngModel)]="form.externalReference" placeholder="\u0631\u0642\u0645 \u0641\u0627\u062A\u0648\u0631\u0629 \u0627\u0644\u0645\u0648\u0631\u062F" />\r
              </div>\r
              <div class="form-group">\r
                <label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>\r
                <input type="text" [(ngModel)]="form.notes" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629" />\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="form-section">\r
            <h3>\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</h3>\r
            <div class="item-form">\r
              <div class="form-row">\r
                <div class="form-group flex-2">\r
                  <label>\u0627\u0644\u0635\u0646\u0641</label>\r
                  <select [(ngModel)]="newItem.inventoryItemId">\r
                    <option [ngValue]="0">\u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0646\u0641</option>\r
                    @for (item of inventoryItems(); track item.id) {\r
                      <option [ngValue]="item.id">{{ item.name }} ({{ item.code }})</option>\r
                    }\r
                  </select>\r
                </div>\r
                <div class="form-group">\r
                  <label>\u0627\u0644\u0643\u0645\u064A\u0629</label>\r
                  <input type="number" [(ngModel)]="newItem.quantity" min="0.01" step="0.01" />\r
                </div>\r
                <div class="form-group">\r
                  <label>\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629</label>\r
                  <input type="number" [(ngModel)]="newItem.unitCost" min="0" step="0.01" />\r
                </div>\r
                <div class="form-group">\r
                  <label>\u0627\u0644\u0636\u0631\u064A\u0628\u0629</label>\r
                  <input type="number" [(ngModel)]="newItem.tax" min="0" step="0.01" />\r
                </div>\r
                <div class="form-group">\r
                  <label>\u0627\u0644\u062E\u0635\u0645</label>\r
                  <input type="number" [(ngModel)]="newItem.discount" min="0" step="0.01" />\r
                </div>\r
                <div class="form-group btn-group">\r
                  <button class="btn-add-item" (click)="addItem()"><span class="material-icons-round">add</span></button>\r
                </div>\r
              </div>\r
            </div>\r
\r
            @if (form.items.length) {\r
              <table class="items-table">\r
                <thead>\r
                  <tr>\r
                    <th>\u0627\u0644\u0635\u0646\u0641</th>\r
                    <th>\u0627\u0644\u0643\u0645\u064A\u0629</th>\r
                    <th>\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629</th>\r
                    <th>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</th>\r
                    <th>\u0627\u0644\u0636\u0631\u064A\u0628\u0629</th>\r
                    <th>\u0627\u0644\u062E\u0635\u0645</th>\r
                    <th></th>\r
                  </tr>\r
                </thead>\r
                <tbody>\r
                  @for (item of form.items; track $index; let idx = $index) {\r
                    <tr>\r
                      <td>{{ item.itemName }}</td>\r
                      <td>{{ item.quantity }}</td>\r
                      <td>{{ formatNumber(item.unitCost) }}</td>\r
                      <td>{{ formatNumber(item.quantity * item.unitCost) }}</td>\r
                      <td>{{ formatNumber(item.tax) }}</td>\r
                      <td>{{ formatNumber(item.discount) }}</td>\r
                      <td><button class="btn-remove-item" (click)="removeItem(idx)"><span class="material-icons-round">close</span></button></td>\r
                    </tr>\r
                  }\r
                </tbody>\r
                <tfoot>\r
                  <tr>\r
                    <td colspan="3" class="label">\u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</td>\r
                    <td colspan="4">{{ formatNumber(formSubtotal()) }}</td>\r
                  </tr>\r
                  <tr>\r
                    <td colspan="3" class="label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0636\u0631\u064A\u0628\u0629</td>\r
                    <td colspan="4">{{ formatNumber(formTax()) }}</td>\r
                  </tr>\r
                  <tr>\r
                    <td colspan="3" class="label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062E\u0635\u0645</td>\r
                    <td colspan="4">{{ formatNumber(formDiscount()) }}</td>\r
                  </tr>\r
                  <tr class="total-row">\r
                    <td colspan="3" class="label">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0646\u0647\u0627\u0626\u064A</td>\r
                    <td colspan="4" class="total-value">{{ formatNumber(formTotal()) }}</td>\r
                  </tr>\r
                </tfoot>\r
              </table>\r
            } @else {\r
              <div class="empty-items"><span class="material-icons-round">inventory_2</span><p>\u0644\u0645 \u062A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0623\u0635\u0646\u0627\u0641 \u0628\u0639\u062F</p></div>\r
            }\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 -->\r
  @if (showDetails() && selectedInvoice()) {\r
    <div class="modal-overlay" (click)="showDetails.set(false)">\r
      <div class="modal-card large" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon green"><span class="material-icons-round">receipt_long</span></div>\r
            <div>\r
              <h2>\u0641\u0627\u062A\u0648\u0631\u0629 \u0631\u0642\u0645 {{ selectedInvoice()!.fullSequenceNumber || selectedInvoice()!.invoiceNumber }}</h2>\r
              <p>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showDetails.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="details-grid">\r
            <div class="detail-item"><span class="label">\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0639\u0627\u0645</span><span class="value seq-num">{{ selectedInvoice()!.fullSequenceNumber || selectedInvoice()!.invoiceNumber }}</span></div>\r
            @if (selectedInvoice()!.supplierSequenceNumber) {\r
              <div class="detail-item"><span class="label">\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0631\u062F</span><span class="value seq-num supplier">{{ selectedInvoice()!.supplierSequenceNumber }}</span></div>\r
            }\r
            <div class="detail-item"><span class="label">\u0627\u0644\u0645\u0648\u0631\u062F</span><span class="value">{{ selectedInvoice()!.supplierName }}</span></div>\r
            <div class="detail-item"><span class="label">\u0627\u0644\u062D\u0627\u0644\u0629</span><span class="value"><span class="status-badge {{ getStatusClass(selectedInvoice()!.status) }}">{{ getStatusLabel(selectedInvoice()!.status) }}</span></span></div>\r
            <div class="detail-item"><span class="label">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639</span><span class="value">{{ getPaymentLabel(selectedInvoice()!.paymentMethod) }}</span></div>\r
            <div class="detail-item"><span class="label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629</span><span class="value">{{ selectedInvoice()!.invoiceDate | date:'yyyy-MM-dd' }}</span></div>\r
            <div class="detail-item"><span class="label">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</span><span class="value amount">{{ formatNumber(selectedInvoice()!.totalAmount) }}</span></div>\r
            <div class="detail-item"><span class="label">\u0627\u0644\u0645\u062F\u0641\u0648\u0639</span><span class="value amount paid">{{ formatNumber(selectedInvoice()!.paidAmount) }}</span></div>\r
            <div class="detail-item"><span class="label">\u0627\u0644\u0645\u062A\u0628\u0642\u064A</span><span class="value amount remaining">{{ formatNumber(selectedInvoice()!.remainingAmount) }}</span></div>\r
          </div>\r
\r
          @if (selectedInvoice()!.items?.length) {\r
            <h3 class="section-title">\u0627\u0644\u0623\u0635\u0646\u0627\u0641</h3>\r
            <table class="items-table">\r
              <thead>\r
                <tr><th>\u0627\u0644\u0635\u0646\u0641</th><th>\u0627\u0644\u0643\u0645\u064A\u0629</th><th>\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629</th><th>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</th></tr>\r
              </thead>\r
              <tbody>\r
                @for (item of selectedInvoice()!.items; track $index) {\r
                  <tr>\r
                    <td>{{ item.itemName }}</td>\r
                    <td>{{ item.quantity }}</td>\r
                    <td>{{ formatNumber(item.unitCost) }}</td>\r
                    <td>{{ formatNumber(item.totalCost || (item.quantity * item.unitCost)) }}</td>\r
                  </tr>\r
                }\r
              </tbody>\r
            </table>\r
          }\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-cancel" (click)="showDetails.set(false)">\u0625\u063A\u0644\u0627\u0642</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/purchase-invoices/purchase-invoices.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.gray {\n  background: var(--bg-surface);\n}\n.summary-card.gray .material-icons-round {\n  color: var(--text-muted);\n}\n.summary-card.blue {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue .material-icons-round {\n  color: var(--stat-1-color);\n}\n.summary-card.amber {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber .material-icons-round {\n  color: #f59e0b;\n}\n.summary-card.green {\n  background: var(--stat-2-bg);\n}\n.summary-card.green .material-icons-round {\n  color: var(--stat-2-color);\n}\n.summary-card.red {\n  background: rgba(239, 68, 68, 0.08);\n}\n.summary-card.red .material-icons-round {\n  color: #ef4444;\n}\n.summary-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.summary-card.active {\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);\n}\n.toolbar {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.search-box {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  flex: 1;\n  min-width: 200px;\n}\n.search-box .material-icons-round {\n  font-size: 20px;\n  color: var(--text-muted);\n}\n.search-box input {\n  border: none;\n  background: transparent;\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  width: 100%;\n  outline: none;\n}\n.search-box input::placeholder {\n  color: var(--text-muted);\n}\n.invoice-num {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  cursor: pointer;\n  color: var(--accent-blue);\n  font-weight: 700;\n}\n.invoice-num .material-icons-round {\n  font-size: 16px;\n}\n.invoice-num:hover {\n  text-decoration: underline;\n}\n.amount {\n  font-weight: 700;\n  text-align: left;\n  direction: ltr;\n}\n.amount.paid {\n  color: var(--stat-2-color);\n}\n.amount.remaining {\n  color: #f59e0b;\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n}\n.status-badge.gray {\n  background: var(--bg-surface);\n  color: var(--text-muted);\n}\n.status-badge.blue {\n  background: var(--stat-1-bg);\n  color: var(--stat-1-color);\n}\n.status-badge.amber {\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n}\n.status-badge.green {\n  background: var(--stat-2-bg);\n  color: var(--stat-2-color);\n}\n.status-badge.red {\n  background: rgba(239, 68, 68, 0.12);\n  color: #ef4444;\n}\n.action-btns {\n  display: flex;\n  gap: 4px;\n}\n.action-btn {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.action-btn .material-icons-round {\n  font-size: 16px;\n}\n.action-btn.view {\n  background: var(--stat-1-bg);\n  color: var(--stat-1-color);\n}\n.action-btn.edit {\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n}\n.action-btn.confirm {\n  background: var(--stat-2-bg);\n  color: var(--stat-2-color);\n}\n.action-btn.delete {\n  background: rgba(239, 68, 68, 0.12);\n  color: #ef4444;\n}\n.action-btn:hover {\n  transform: scale(1.1);\n}\n.modal-card.large {\n  width: 90%;\n  max-width: 900px;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.form-section {\n  margin-bottom: 24px;\n}\n.form-section h3 {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  margin-bottom: 12px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid var(--border-color);\n}\n.form-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 12px;\n}\n.form-group {\n  flex: 1;\n}\n.form-group.flex-2 {\n  flex: 2;\n}\n.form-group.btn-group {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: flex-end;\n}\n.form-group label {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-size: 14px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n}\n.btn-add-item {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.btn-add-item .material-icons-round {\n  font-size: 20px;\n}\n.btn-add-item:hover {\n  transform: scale(1.05);\n}\n.items-table {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 12px;\n}\n.items-table th,\n.items-table td {\n  padding: 10px 12px;\n  text-align: right;\n  border-bottom: 1px solid var(--border-color);\n}\n.items-table th {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n}\n.items-table td {\n  font-size: 13px;\n  font-weight: 600;\n}\n.items-table tfoot td {\n  font-weight: 700;\n}\n.items-table .label {\n  text-align: left;\n  color: var(--text-secondary);\n}\n.items-table .total-row {\n  background: var(--stat-1-bg);\n}\n.items-table .total-value {\n  color: var(--accent-blue);\n  font-size: 16px;\n}\n.btn-remove-item {\n  width: 28px;\n  height: 28px;\n  border-radius: 6px;\n  border: none;\n  background: rgba(239, 68, 68, 0.12);\n  color: #ef4444;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.btn-remove-item .material-icons-round {\n  font-size: 16px;\n}\n.btn-remove-item:hover {\n  background: rgba(239, 68, 68, 0.25);\n}\n.empty-items {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  color: var(--text-muted);\n}\n.empty-items .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 8px;\n}\n.empty-items p {\n  font-size: 14px;\n  font-weight: 600;\n}\n.details-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.detail-item .label {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-muted);\n  margin-bottom: 4px;\n}\n.detail-item .value {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.detail-item .value.amount {\n  font-size: 16px;\n}\n.section-title {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  margin: 16px 0 12px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid var(--border-color);\n}\n@media (max-width: 640px) {\n  .summary-row {\n    flex-direction: column;\n  }\n  .form-row {\n    flex-direction: column;\n  }\n  .modal-card.large {\n    width: 95%;\n  }\n}\n/*# sourceMappingURL=purchase-invoices.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PurchaseInvoicesComponent, { className: "PurchaseInvoicesComponent", filePath: "src/app/pages/purchase-invoices/purchase-invoices.ts", lineNumber: 56 });
})();
export {
  PurchaseInvoicesComponent
};
//# sourceMappingURL=chunk-7RSFXAMF.js.map
