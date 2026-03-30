import {
  EmptyStateComponent
} from "./chunk-CMDT4BPZ.js";
import {
  LoadingStateComponent
} from "./chunk-4UIIPGWR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
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
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/partners/partners.ts
var _forTrack0 = ($index, $item) => $item.id;
function PartnersComponent_Conditional_36_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("width", p_r1.sharePercentage, "%")("background", ctx_r1.getShareColor(+p_r1.sharePercentage));
    \u0275\u0275property("title", p_r1.fullName + ": " + p_r1.sharePercentage + "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", p_r1.sharePercentage, "%");
  }
}
function PartnersComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 15);
    \u0275\u0275repeaterCreate(2, PartnersComponent_Conditional_36_For_3_Template, 3, 6, "div", 16, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.partners());
  }
}
function PartnersComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-state", 11);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("loading", ctx_r1.loading());
  }
}
function PartnersComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 2);
    \u0275\u0275text(2, "group_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u064A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u0621 \u0645\u0633\u062C\u0644\u064A\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 19);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_38_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAdd());
    });
    \u0275\u0275elementStart(6, "span", 2);
    \u0275\u0275text(7, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " \u0625\u0636\u0627\u0641\u0629 \u0634\u0631\u064A\u0643");
    \u0275\u0275elementEnd()();
  }
}
function PartnersComponent_Conditional_39_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r5.role);
  }
}
function PartnersComponent_Conditional_39_For_2_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "span", 2);
    \u0275\u0275text(2, "phone");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", p_r5.phone);
  }
}
function PartnersComponent_Conditional_39_For_2_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "span", 2);
    \u0275\u0275text(2, "notes");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", p_r5.notes);
  }
}
function PartnersComponent_Conditional_39_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21)(2, "div", 22)(3, "span", 2);
    \u0275\u0275text(4, "person");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 23)(6, "button", 24);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_39_For_2_Template_button_click_6_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEdit(p_r5));
    });
    \u0275\u0275elementStart(7, "span", 2);
    \u0275\u0275text(8, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 25);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_39_For_2_Template_button_click_9_listener() {
      const p_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmDelete(p_r5));
    });
    \u0275\u0275elementStart(10, "span", 2);
    \u0275\u0275text(11, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "h3", 26);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, PartnersComponent_Conditional_39_For_2_Conditional_14_Template, 2, 1, "span", 27);
    \u0275\u0275elementStart(15, "div", 28)(16, "span", 2);
    \u0275\u0275text(17, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 28)(20, "span", 2);
    \u0275\u0275text(21, "format_list_numbered");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 29)(24, "div", 30)(25, "div", 31);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "span", 32);
    \u0275\u0275text(28, "\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0635\u0629");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(29, PartnersComponent_Conditional_39_For_2_Conditional_29_Template, 4, 1, "div", 28);
    \u0275\u0275conditionalCreate(30, PartnersComponent_Conditional_39_For_2_Conditional_30_Template, 4, 1, "div", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", "linear-gradient(135deg, " + ctx_r1.getShareColor(+p_r5.sharePercentage) + ", " + ctx_r1.getShareColor(+p_r5.sharePercentage) + "99)");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(p_r5.fullName);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r5.role ? 14 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u0627\u0644\u0643\u0648\u062F: ", p_r5.accountCode || p_r5.code || "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u0627\u0644\u062A\u0633\u0644\u0633\u0644: ", p_r5.accountSequence || p_r5.sequenceNumber || "-");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", "conic-gradient(" + ctx_r1.getShareColor(+p_r5.sharePercentage) + " " + p_r5.sharePercentage + "%, var(--bg-surface) 0)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", p_r5.sharePercentage, "%");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(p_r5.phone ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r5.notes ? 30 : -1);
  }
}
function PartnersComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275repeaterCreate(1, PartnersComponent_Conditional_39_For_2_Template, 31, 11, "div", 20, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.partners());
  }
}
function PartnersComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_40_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 35);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_40_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 36)(3, "div", 37)(4, "div", 38)(5, "span", 2);
    \u0275\u0275text(6, "handshake");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u064A\u0643 \u0648\u0646\u0633\u0628\u0629 \u062D\u0635\u062A\u0647");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 39);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_40_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 40)(16, "div", 41)(17, "div", 42)(18, "label");
    \u0275\u0275text(19, "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function PartnersComponent_Conditional_40_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.fullName, $event) || (ctx_r1.form.fullName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 42)(22, "label");
    \u0275\u0275text(23, "\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0635\u0629 (%)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function PartnersComponent_Conditional_40_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.sharePercentage, $event) || (ctx_r1.form.sharePercentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 41)(26, "div", 42)(27, "label");
    \u0275\u0275text(28, "\u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0646\u0635\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function PartnersComponent_Conditional_40_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.role, $event) || (ctx_r1.form.role = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 42)(31, "label");
    \u0275\u0275text(32, "\u0627\u0644\u0647\u0627\u062A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function PartnersComponent_Conditional_40_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.phone, $event) || (ctx_r1.form.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 42)(35, "label");
    \u0275\u0275text(36, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "textarea", 47);
    \u0275\u0275twoWayListener("ngModelChange", function PartnersComponent_Conditional_40_Template_textarea_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.notes, $event) || (ctx_r1.form.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 48)(39, "button", 49);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_40_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(40, "span", 2);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd();
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 50);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_40_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showForm.set(false));
    });
    \u0275\u0275text(44, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u0634\u0631\u064A\u0643" : "\u0625\u0636\u0627\u0641\u0629 \u0634\u0631\u064A\u0643 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.fullName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.sharePercentage);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.role);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.phone);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.notes);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.editingId() ? "save" : "add");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0634\u0631\u064A\u0643");
  }
}
function PartnersComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_41_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDeleteConfirm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 51);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_41_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 36)(3, "div", 37)(4, "div", 52)(5, "span", 2);
    \u0275\u0275text(6, "warning");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h2");
    \u0275\u0275text(8, "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 39);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_41_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDeleteConfirm.set(false));
    });
    \u0275\u0275elementStart(10, "span", 2);
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 40)(13, "p", 53);
    \u0275\u0275text(14, "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 ");
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, "\u061F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p", 54);
    \u0275\u0275text(19, "\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 48)(21, "button", 55);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_41_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.executeDelete());
    });
    \u0275\u0275elementStart(22, "span", 2);
    \u0275\u0275text(23, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " \u062D\u0630\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 50);
    \u0275\u0275listener("click", function PartnersComponent_Conditional_41_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDeleteConfirm.set(false));
    });
    \u0275\u0275text(26, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r1.deleteTarget()) == null ? null : tmp_1_0.fullName);
  }
}
var PartnersComponent = class _PartnersComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  business = signal(null, ...ngDevMode ? [{ debugName: "business" }] : (
    /* istanbul ignore next */
    []
  ));
  partners = signal([], ...ngDevMode ? [{ debugName: "partners" }] : (
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
  showDeleteConfirm = signal(false, ...ngDevMode ? [{ debugName: "showDeleteConfirm" }] : (
    /* istanbul ignore next */
    []
  ));
  deleteTarget = signal(null, ...ngDevMode ? [{ debugName: "deleteTarget" }] : (
    /* istanbul ignore next */
    []
  ));
  form = { fullName: "", sharePercentage: 0, phone: "", role: "", notes: "" };
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const [biz, partners] = await Promise.all([
        this.api.getBusiness(this.bizId),
        this.api.getPartners(this.bizId)
      ]);
      this.business.set(biz);
      this.partners.set(partners);
    } catch (e) {
      console.error(e);
    }
    this.loading.set(false);
  }
  totalShares() {
    return this.partners().reduce((s, p) => s + Number(p.sharePercentage || 0), 0);
  }
  openAdd() {
    this.form = { fullName: "", sharePercentage: 0, phone: "", role: "", notes: "" };
    this.editingId.set(null);
    this.showForm.set(true);
  }
  openEdit(p) {
    this.form = {
      fullName: p.fullName,
      sharePercentage: Number(p.sharePercentage),
      phone: p.phone || "",
      role: p.role || "",
      notes: p.notes || ""
    };
    this.editingId.set(p.id);
    this.showForm.set(true);
  }
  async save() {
    try {
      const data = __spreadProps(__spreadValues({}, this.form), { sharePercentage: String(this.form.sharePercentage), businessId: this.bizId });
      if (this.editingId()) {
        await this.api.updatePartner(this.editingId(), data);
      } else {
        await this.api.createPartner(this.bizId, data);
      }
      this.showForm.set(false);
      this.toast.success(this.editingId() ? "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0634\u0631\u064A\u0643 \u0628\u0646\u062C\u0627\u062D" : "\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0634\u0631\u064A\u0643 \u0628\u0646\u062C\u0627\u062D");
      await this.load();
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0634\u0631\u064A\u0643");
    }
  }
  confirmDelete(p) {
    this.deleteTarget.set(p);
    this.showDeleteConfirm.set(true);
  }
  async executeDelete() {
    const t = this.deleteTarget();
    if (!t)
      return;
    try {
      await this.api.deletePartner(t.id);
      this.showDeleteConfirm.set(false);
      this.deleteTarget.set(null);
      this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0634\u0631\u064A\u0643 \u0628\u0646\u062C\u0627\u062D");
      await this.load();
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641");
    }
  }
  getShareColor(pct) {
    if (pct >= 50)
      return "#f59e0b";
    if (pct >= 25)
      return "#3b82f6";
    return "#22c55e";
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275PartnersComponent_BaseFactory;
    return function PartnersComponent_Factory(__ngFactoryType__) {
      return (\u0275PartnersComponent_BaseFactory || (\u0275PartnersComponent_BaseFactory = \u0275\u0275getInheritedFactory(_PartnersComponent)))(__ngFactoryType__ || _PartnersComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PartnersComponent, selectors: [["app-partners"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 42, vars: 10, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "summary-row"], [1, "summary-card", "amber"], [1, "num"], [1, "lbl"], [1, "summary-card", "blue"], [1, "summary-card", "green"], [1, "shares-visual"], [3, "loading"], [1, "empty-state"], [1, "partners-grid"], [1, "modal-overlay"], [1, "shares-bar"], [1, "share-segment", 3, "width", "background", "title"], [1, "share-segment", 3, "title"], [1, "segment-label"], [1, "add-btn", "small", 3, "click"], [1, "partner-card"], [1, "card-header-row"], [1, "partner-avatar"], [1, "card-actions"], [1, "action-btn", "edit", 3, "click"], [1, "action-btn", "delete", 3, "click"], [1, "partner-name"], [1, "partner-role"], [1, "partner-detail"], [1, "share-display"], [1, "share-ring"], [1, "share-inner"], [1, "share-label"], [1, "partner-detail", "notes"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "amber"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], ["title", "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644", "placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u064A\u0643", 3, "ngModelChange", "ngModel"], ["type", "number", "title", "\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0635\u0629", "placeholder", "\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0635\u0629", "min", "0", "max", "100", "step", "0.01", 3, "ngModelChange", "ngModel"], ["title", "\u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0646\u0635\u0628", "placeholder", "\u0645\u062B\u0627\u0644: \u0634\u0631\u064A\u0643 \u0645\u0624\u0633\u0633", 3, "ngModelChange", "ngModel"], ["title", "\u0627\u0644\u0647\u0627\u062A\u0641", "placeholder", "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641", 3, "ngModelChange", "ngModel"], ["title", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A", "rows", "2", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629...", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"], [1, "modal-card", "small", 3, "click"], [1, "modal-icon", "red"], [1, "delete-msg"], [1, "delete-warn"], [1, "btn-delete", 3, "click"]], template: function PartnersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "handshake");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u0634\u0631\u0643\u0627\u0621");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function PartnersComponent_Template_button_click_6_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "person_add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0625\u0636\u0627\u0641\u0629 \u0634\u0631\u064A\u0643");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "span", 2);
      \u0275\u0275text(13, "groups");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div")(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 7);
      \u0275\u0275text(18, "\u0634\u0631\u064A\u0643");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 8)(20, "span", 2);
      \u0275\u0275text(21, "pie_chart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div")(23, "span", 6);
      \u0275\u0275text(24);
      \u0275\u0275pipe(25, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 7);
      \u0275\u0275text(27, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0635\u0635");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 9)(29, "span", 2);
      \u0275\u0275text(30, "business");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div")(32, "span", 6);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "span", 7);
      \u0275\u0275text(35, "\u0627\u0644\u0639\u0645\u0644");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(36, PartnersComponent_Conditional_36_Template, 4, 0, "div", 10);
      \u0275\u0275conditionalCreate(37, PartnersComponent_Conditional_37_Template, 1, 1, "app-loading-state", 11)(38, PartnersComponent_Conditional_38_Template, 9, 0, "div", 12)(39, PartnersComponent_Conditional_39_Template, 3, 0, "div", 13);
      \u0275\u0275conditionalCreate(40, PartnersComponent_Conditional_40_Template, 45, 8, "div", 14);
      \u0275\u0275conditionalCreate(41, PartnersComponent_Conditional_41_Template, 27, 1, "div", 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate(ctx.partners().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(25, 7, ctx.totalShares(), "1.0-2"), "%");
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(((tmp_2_0 = ctx.business()) == null ? null : tmp_2_0.name) || "-");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.partners().length ? 36 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 37 : !ctx.partners().length ? 38 : 39);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 40 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDeleteConfirm() ? 41 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, LoadingStateComponent, DecimalPipe], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.amber[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.summary-card.blue[_ngcontent-%COMP%] {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-1-color);\n}\n.summary-card.green[_ngcontent-%COMP%] {\n  background: var(--stat-2-bg);\n}\n.summary-card.green[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-2-color);\n}\n.shares-visual[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.shares-bar[_ngcontent-%COMP%] {\n  display: flex;\n  height: 32px;\n  border-radius: 10px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n}\n.share-segment[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s;\n  min-width: 40px;\n  position: relative;\n}\n.share-segment[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.15);\n  transform: scaleY(1.1);\n  z-index: 1;\n}\n.segment-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 800;\n  color: white;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n}\n.partners-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}\n.partner-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  padding: 24px;\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s;\n}\n.partner-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);\n  border-color: var(--border-strong);\n}\n.card-header-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.partner-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.partner-avatar[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.partner-name[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 4px;\n}\n.partner-role[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  display: block;\n  margin-bottom: 16px;\n}\n.share-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin: 16px 0;\n}\n.share-ring[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.share-inner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: var(--bg-card);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.share-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.partner-detail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-top: 8px;\n}\n.partner-detail[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--text-muted);\n}\n.partner-detail.notes[_ngcontent-%COMP%] {\n  font-style: italic;\n}\n.delete-msg[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 8px;\n}\n.delete-warn[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--accent-red);\n  font-weight: 600;\n}\n.btn-delete[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #dc2626);\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-delete[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.btn-delete[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);\n}\n.modal-card.small[_ngcontent-%COMP%] {\n  max-width: 440px;\n}\n.add-btn.small[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 13px;\n  padding: 8px 16px;\n}\n@media (max-width: 640px) {\n  .partners-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .summary-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=partners.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PartnersComponent, [{
    type: Component,
    args: [{ selector: "app-partners", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">handshake</span> \u0627\u0644\u0634\u0631\u0643\u0627\u0621</h2>\r
    <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">person_add</span> \u0625\u0636\u0627\u0641\u0629 \u0634\u0631\u064A\u0643</button>\r
  </div>\r
\r
  <!-- \u0645\u0644\u062E\u0635 -->\r
  <div class="summary-row">\r
    <div class="summary-card amber"><span class="material-icons-round">groups</span><div><span class="num">{{ partners().length }}</span><span class="lbl">\u0634\u0631\u064A\u0643</span></div></div>\r
    <div class="summary-card blue"><span class="material-icons-round">pie_chart</span><div><span class="num">{{ totalShares() | number:'1.0-2' }}%</span><span class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0635\u0635</span></div></div>\r
    <div class="summary-card green"><span class="material-icons-round">business</span><div><span class="num">{{ business()?.name || '-' }}</span><span class="lbl">\u0627\u0644\u0639\u0645\u0644</span></div></div>\r
  </div>\r
\r
  <!-- \u0627\u0644\u062D\u0635\u0635 \u0627\u0644\u0628\u0635\u0631\u064A\u0629 -->\r
  @if (partners().length) {\r
    <div class="shares-visual">\r
      <div class="shares-bar">\r
        @for (p of partners(); track p.id) {\r
          <div class="share-segment" [style.width.%]="p.sharePercentage" [style.background]="getShareColor(+p.sharePercentage)" [title]="p.fullName + ': ' + p.sharePercentage + '%'">\r
            <span class="segment-label">{{ p.sharePercentage }}%</span>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  }\r
\r
  @if (loading()) {\r
    <app-loading-state [loading]="loading()" />\r
  } @else if (!partners().length) {\r
    <div class="empty-state"><span class="material-icons-round">group_off</span><p>\u0644\u0627 \u064A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u0621 \u0645\u0633\u062C\u0644\u064A\u0646</p>\r
      <button class="add-btn small" (click)="openAdd()"><span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0634\u0631\u064A\u0643</button>\r
    </div>\r
  } @else {\r
    <div class="partners-grid">\r
      @for (p of partners(); track p.id) {\r
        <div class="partner-card">\r
          <div class="card-header-row">\r
            <div class="partner-avatar" [style.background]="'linear-gradient(135deg, ' + getShareColor(+p.sharePercentage) + ', ' + getShareColor(+p.sharePercentage) + '99)'">\r
              <span class="material-icons-round">person</span>\r
            </div>\r
            <div class="card-actions">\r
              <button class="action-btn edit" (click)="openEdit(p)"><span class="material-icons-round">edit</span></button>\r
              <button class="action-btn delete" (click)="confirmDelete(p)"><span class="material-icons-round">delete</span></button>\r
            </div>\r
          </div>\r
          <h3 class="partner-name">{{ p.fullName }}</h3>\r
          @if (p.role) { <span class="partner-role">{{ p.role }}</span> }\r
          <div class="partner-detail"><span class="material-icons-round">tag</span> \u0627\u0644\u0643\u0648\u062F: {{ p.accountCode || p.code || '-' }}</div>\r
          <div class="partner-detail"><span class="material-icons-round">format_list_numbered</span> \u0627\u0644\u062A\u0633\u0644\u0633\u0644: {{ p.accountSequence || p.sequenceNumber || '-' }}</div>\r
          <div class="share-display">\r
            <div class="share-ring" [style.background]="'conic-gradient(' + getShareColor(+p.sharePercentage) + ' ' + p.sharePercentage + '%, var(--bg-surface) 0)'">\r
              <div class="share-inner">{{ p.sharePercentage }}%</div>\r
            </div>\r
            <span class="share-label">\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0635\u0629</span>\r
          </div>\r
          @if (p.phone) { <div class="partner-detail"><span class="material-icons-round">phone</span> {{ p.phone }}</div> }\r
          @if (p.notes) { <div class="partner-detail notes"><span class="material-icons-round">notes</span> {{ p.notes }}</div> }\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 -->\r
  @if (showForm()) {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row"><div class="modal-icon amber"><span class="material-icons-round">handshake</span></div><div><h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u0634\u0631\u064A\u0643' : '\u0625\u0636\u0627\u0641\u0629 \u0634\u0631\u064A\u0643 \u062C\u062F\u064A\u062F' }}</h2><p>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u064A\u0643 \u0648\u0646\u0633\u0628\u0629 \u062D\u0635\u062A\u0647</p></div></div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644</label><input [(ngModel)]="form.fullName" title="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u064A\u0643" /></div>\r
            <div class="form-group"><label>\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0635\u0629 (%)</label><input type="number" [(ngModel)]="form.sharePercentage" title="\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0635\u0629" placeholder="\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0635\u0629" min="0" max="100" step="0.01" /></div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0646\u0635\u0628</label><input [(ngModel)]="form.role" title="\u0627\u0644\u062F\u0648\u0631 / \u0627\u0644\u0645\u0646\u0635\u0628" placeholder="\u0645\u062B\u0627\u0644: \u0634\u0631\u064A\u0643 \u0645\u0624\u0633\u0633" /></div>\r
            <div class="form-group"><label>\u0627\u0644\u0647\u0627\u062A\u0641</label><input [(ngModel)]="form.phone" title="\u0627\u0644\u0647\u0627\u062A\u0641" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" /></div>\r
          </div>\r
          <div class="form-group"><label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label><textarea [(ngModel)]="form.notes" title="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629..."></textarea></div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()"><span class="material-icons-round">{{ editingId() ? 'save' : 'add' }}</span> {{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0634\u0631\u064A\u0643' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641 -->\r
  @if (showDeleteConfirm()) {\r
    <div class="modal-overlay" (click)="showDeleteConfirm.set(false)">\r
      <div class="modal-card small" (click)="$event.stopPropagation()">\r
        <div class="modal-header"><div class="modal-title-row"><div class="modal-icon red"><span class="material-icons-round">warning</span></div><h2>\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641</h2></div>\r
          <button class="close-btn" (click)="showDeleteConfirm.set(false)"><span class="material-icons-round">close</span></button></div>\r
        <div class="modal-body"><p class="delete-msg">\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 <strong>{{ deleteTarget()?.fullName }}</strong>\u061F</p><p class="delete-warn">\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647</p></div>\r
        <div class="modal-footer"><button class="btn-delete" (click)="executeDelete()"><span class="material-icons-round">delete</span> \u062D\u0630\u0641</button><button class="btn-cancel" (click)="showDeleteConfirm.set(false)">\u0625\u0644\u063A\u0627\u0621</button></div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/partners/partners.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.amber {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber .material-icons-round {\n  color: #f59e0b;\n}\n.summary-card.blue {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue .material-icons-round {\n  color: var(--stat-1-color);\n}\n.summary-card.green {\n  background: var(--stat-2-bg);\n}\n.summary-card.green .material-icons-round {\n  color: var(--stat-2-color);\n}\n.shares-visual {\n  margin-bottom: 24px;\n}\n.shares-bar {\n  display: flex;\n  height: 32px;\n  border-radius: 10px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n}\n.share-segment {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s;\n  min-width: 40px;\n  position: relative;\n}\n.share-segment:hover {\n  filter: brightness(1.15);\n  transform: scaleY(1.1);\n  z-index: 1;\n}\n.segment-label {\n  font-size: 11px;\n  font-weight: 800;\n  color: white;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n}\n.partners-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}\n.partner-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  padding: 24px;\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s;\n}\n.partner-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);\n  border-color: var(--border-strong);\n}\n.card-header-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.partner-avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.partner-avatar .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.card-actions {\n  display: flex;\n  gap: 4px;\n}\n.partner-name {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 4px;\n}\n.partner-role {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  display: block;\n  margin-bottom: 16px;\n}\n.share-display {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin: 16px 0;\n}\n.share-ring {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.share-inner {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: var(--bg-card);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.share-label {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.partner-detail {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-top: 8px;\n}\n.partner-detail .material-icons-round {\n  font-size: 16px;\n  color: var(--text-muted);\n}\n.partner-detail.notes {\n  font-style: italic;\n}\n.delete-msg {\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 8px;\n}\n.delete-warn {\n  font-size: 13px;\n  color: var(--accent-red);\n  font-weight: 600;\n}\n.btn-delete {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #dc2626);\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-delete .material-icons-round {\n  font-size: 18px;\n}\n.btn-delete:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);\n}\n.modal-card.small {\n  max-width: 440px;\n}\n.add-btn.small {\n  margin-top: 16px;\n  font-size: 13px;\n  padding: 8px 16px;\n}\n@media (max-width: 640px) {\n  .partners-grid {\n    grid-template-columns: 1fr;\n  }\n  .summary-row {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=partners.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PartnersComponent, { className: "PartnersComponent", filePath: "src/app/pages/partners/partners.ts", lineNumber: 18 });
})();
export {
  PartnersComponent
};
//# sourceMappingURL=chunk-AUDYPEEW.js.map
