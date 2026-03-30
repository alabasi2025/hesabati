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
  __spreadProps,
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
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/suppliers/suppliers.ts
var _forTrack0 = ($index, $item) => $item.id;
function SuppliersComponent_For_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function SuppliersComponent_For_44_Template_button_click_0_listener() {
      const cat_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.filterCategory.set(cat_r2));
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.filterCategory() === cat_r2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getCategoryIcon(cat_r2));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cat_r2, " ");
  }
}
function SuppliersComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 20);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function SuppliersComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 2);
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0631\u062F\u064A\u0646");
    \u0275\u0275elementEnd()();
  }
}
function SuppliersComponent_Conditional_47_For_23_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getSupplierTypeName(s_r5.supplierTypeId) || s_r5.category);
  }
}
function SuppliersComponent_Conditional_47_For_23_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function SuppliersComponent_Conditional_47_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "div", 21)(5, "div", 22)(6, "span", 2);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "span", 23);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275conditionalCreate(16, SuppliersComponent_Conditional_47_For_23_Conditional_16_Template, 2, 1, "span", 24)(17, SuppliersComponent_Conditional_47_For_23_Conditional_17_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td", 26);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "td")(25, "button", 27);
    \u0275\u0275listener("click", function SuppliersComponent_Conditional_47_For_23_Template_button_click_25_listener() {
      const s_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit(s_r5));
    });
    \u0275\u0275elementStart(26, "span", 2);
    \u0275\u0275text(27, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "button", 28);
    \u0275\u0275listener("click", function SuppliersComponent_Conditional_47_For_23_Template_button_click_28_listener() {
      const s_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.remove(s_r5));
    });
    \u0275\u0275elementStart(29, "span", 2);
    \u0275\u0275text(30, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    const \u0275$index_133_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_133_r6 + 1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.getCategoryIcon(s_r5.category));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r5.code || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r5.sequenceNumber || "-");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.getSupplierTypeName(s_r5.supplierTypeId) || s_r5.category ? 16 : 17);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r5.contactPerson || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r5.phone || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r5.address || "-");
  }
}
function SuppliersComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 18)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u0645\u0648\u0631\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0627\u0644\u0643\u0648\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0627\u0644\u062A\u0633\u0644\u0633\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u0647\u0627\u062A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "\u0627\u0644\u0639\u0646\u0648\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "\u0625\u062C\u0631\u0627\u0621\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275repeaterCreate(22, SuppliersComponent_Conditional_47_For_23_Template, 31, 9, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r2.filteredSuppliers());
  }
}
function SuppliersComponent_Conditional_48_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", t_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r8.name);
  }
}
function SuppliersComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275listener("click", function SuppliersComponent_Conditional_48_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 30);
    \u0275\u0275listener("click", function SuppliersComponent_Conditional_48_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 31)(3, "div", 32)(4, "div", 33)(5, "span", 2);
    \u0275\u0275text(6, "local_shipping");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0631\u062F \u0648\u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 34);
    \u0275\u0275listener("click", function SuppliersComponent_Conditional_48_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 35)(16, "div", 36)(17, "div", 37)(18, "label");
    \u0275\u0275text(19, "\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0631\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function SuppliersComponent_Conditional_48_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.name, $event) || (ctx_r2.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 37)(22, "label");
    \u0275\u0275text(23, "\u0646\u0648\u0639 \u0627\u0644\u0645\u0648\u0631\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function SuppliersComponent_Conditional_48_Template_select_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.supplierTypeId, $event) || (ctx_r2.form.supplierTypeId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(25, "option", 40);
    \u0275\u0275text(26, "\u0628\u062F\u0648\u0646 \u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(27, SuppliersComponent_Conditional_48_For_28_Template, 2, 2, "option", 40, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 36)(30, "div", 37)(31, "label");
    \u0275\u0275text(32, "\u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function SuppliersComponent_Conditional_48_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.contactPerson, $event) || (ctx_r2.form.contactPerson = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 37)(35, "label");
    \u0275\u0275text(36, "\u0627\u0644\u0647\u0627\u062A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "input", 42);
    \u0275\u0275twoWayListener("ngModelChange", function SuppliersComponent_Conditional_48_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.phone, $event) || (ctx_r2.form.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 37)(39, "label");
    \u0275\u0275text(40, "\u0627\u0644\u0639\u0646\u0648\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function SuppliersComponent_Conditional_48_Template_input_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.address, $event) || (ctx_r2.form.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 37)(43, "label");
    \u0275\u0275text(44, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "textarea", 44);
    \u0275\u0275twoWayListener("ngModelChange", function SuppliersComponent_Conditional_48_Template_textarea_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.notes, $event) || (ctx_r2.form.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "div", 45)(47, "button", 46);
    \u0275\u0275listener("click", function SuppliersComponent_Conditional_48_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "button", 47);
    \u0275\u0275listener("click", function SuppliersComponent_Conditional_48_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275text(50, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u0645\u0648\u0631\u062F" : "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0631\u062F \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.supplierTypeId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.supplierTypes());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.contactPerson);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.phone);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.address);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.notes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0631\u062F");
  }
}
var SuppliersComponent = class _SuppliersComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  suppliers = signal([], ...ngDevMode ? [{ debugName: "suppliers" }] : (
    /* istanbul ignore next */
    []
  ));
  supplierTypes = signal([], ...ngDevMode ? [{ debugName: "supplierTypes" }] : (
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
  filterCategory = signal("all", ...ngDevMode ? [{ debugName: "filterCategory" }] : (
    /* istanbul ignore next */
    []
  ));
  searchQuery = signal("", ...ngDevMode ? [{ debugName: "searchQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  form = { name: "", supplierTypeId: null, category: "", phone: "", address: "", contactPerson: "", notes: "" };
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const [data, types] = await Promise.all([
        this.api.getSuppliers(this.bizId),
        this.api.getSupplierTypes(this.bizId).catch(() => [])
      ]);
      this.suppliers.set(data);
      this.supplierTypes.set(types);
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646");
    }
    this.loading.set(false);
  }
  categories() {
    const cats = new Set(this.suppliers().map((s) => this.getSupplierTypeName(s.supplierTypeId) || s.category).filter(Boolean));
    return Array.from(cats);
  }
  filteredSuppliers() {
    let list = this.suppliers();
    const cat = this.filterCategory();
    const q = this.searchQuery().toLowerCase();
    if (cat !== "all") {
      list = list.filter((s) => (this.getSupplierTypeName(s.supplierTypeId) || s.category) === cat);
    }
    if (q)
      list = list.filter((s) => s.name.toLowerCase().includes(q) || (s.contactPerson || "").toLowerCase().includes(q));
    return list;
  }
  openAdd() {
    this.form = { name: "", supplierTypeId: null, category: "", phone: "", address: "", contactPerson: "", notes: "" };
    this.editingId.set(null);
    this.showForm.set(true);
  }
  openEdit(s) {
    this.form = {
      name: s.name,
      supplierTypeId: s.supplierTypeId ?? null,
      category: s.category || "",
      phone: s.phone || "",
      address: s.address || "",
      contactPerson: s.contactPerson || "",
      notes: s.notes || ""
    };
    this.editingId.set(s.id);
    this.showForm.set(true);
  }
  async save() {
    try {
      const payload = __spreadProps(__spreadValues({}, this.form), {
        category: this.getSupplierTypeName(this.form.supplierTypeId) || this.form.category || null
      });
      if (this.editingId()) {
        await this.api.updateSupplier(this.editingId(), payload);
      } else {
        await this.api.createSupplier(this.bizId, payload);
      }
      this.showForm.set(false);
      this.toast.success(this.editingId() ? "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0648\u0631\u062F \u0628\u0646\u062C\u0627\u062D" : "\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0631\u062F \u0628\u0646\u062C\u0627\u062D");
      await this.load();
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0645\u0648\u0631\u062F");
    }
  }
  async remove(s) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0631\u062F "${s.name}"\u061F`, type: "danger" });
    if (confirmed) {
      try {
        await this.api.deleteSupplier(s.id);
        this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0631\u062F \u0628\u0646\u062C\u0627\u062D");
        await this.load();
      } catch (e) {
        console.error(e);
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641");
      }
    }
  }
  getCategoryIcon(cat) {
    const map = { "\u0648\u0642\u0648\u062F": "local_gas_station", "\u0632\u064A\u0648\u062A": "oil_barrel", "\u0642\u0637\u0639 \u063A\u064A\u0627\u0631": "build", "\u0645\u0648\u0627\u062F \u063A\u0630\u0627\u0626\u064A\u0629": "restaurant" };
    return map[cat] || "inventory_2";
  }
  getSupplierTypeName(typeId) {
    if (!typeId)
      return "";
    const t = this.supplierTypes().find((x) => x.id === typeId);
    return t?.name || "";
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SuppliersComponent_BaseFactory;
    return function SuppliersComponent_Factory(__ngFactoryType__) {
      return (\u0275SuppliersComponent_BaseFactory || (\u0275SuppliersComponent_BaseFactory = \u0275\u0275getInheritedFactory(_SuppliersComponent)))(__ngFactoryType__ || _SuppliersComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SuppliersComponent, selectors: [["app-suppliers"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 49, vars: 8, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "summary-row"], [1, "summary-card", "amber"], [1, "num"], [1, "lbl"], [1, "summary-card", "blue"], [1, "summary-card", "green"], [1, "toolbar"], [1, "search-box"], ["type", "text", "placeholder", "\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644...", 3, "ngModelChange", "ngModel"], [1, "filter-tabs"], [1, "filter-tab", 3, "click"], [1, "filter-tab", 3, "active"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], [1, "modal-overlay"], [1, "material-icons-round", "spin"], [1, "supplier-cell"], [1, "supplier-icon"], [1, "supplier-name"], [1, "category-badge"], [1, "text-muted"], [1, "phone-cell"], [1, "action-btn", "edit", 3, "click"], [1, "action-btn", "delete", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "amber"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], ["title", "\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0631\u062F", "placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0631\u062F", 3, "ngModelChange", "ngModel"], ["title", "\u0646\u0648\u0639 \u0627\u0644\u0645\u0648\u0631\u062F", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["title", "\u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644", "placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0633\u0624\u0648\u0644", 3, "ngModelChange", "ngModel"], ["title", "\u0627\u0644\u0647\u0627\u062A\u0641", "placeholder", "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641", 3, "ngModelChange", "ngModel"], ["title", "\u0627\u0644\u0639\u0646\u0648\u0627\u0646", "placeholder", "\u0627\u0644\u0639\u0646\u0648\u0627\u0646", 3, "ngModelChange", "ngModel"], ["title", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A", "rows", "2", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629...", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"]], template: function SuppliersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "local_shipping");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function SuppliersComponent_Template_button_click_6_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "add_business");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0631\u062F");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "span", 2);
      \u0275\u0275text(13, "local_shipping");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div")(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 7);
      \u0275\u0275text(18, "\u0645\u0648\u0631\u062F");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 8)(20, "span", 2);
      \u0275\u0275text(21, "category");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div")(23, "span", 6);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "span", 7);
      \u0275\u0275text(26, "\u062A\u0635\u0646\u064A\u0641");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 9)(28, "span", 2);
      \u0275\u0275text(29, "check_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div")(31, "span", 6);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span", 7);
      \u0275\u0275text(34, "\u0646\u062A\u064A\u062C\u0629");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(35, "div", 10)(36, "div", 11)(37, "span", 2);
      \u0275\u0275text(38, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "input", 12);
      \u0275\u0275listener("ngModelChange", function SuppliersComponent_Template_input_ngModelChange_39_listener($event) {
        return ctx.searchQuery.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div", 13)(41, "button", 14);
      \u0275\u0275listener("click", function SuppliersComponent_Template_button_click_41_listener() {
        return ctx.filterCategory.set("all");
      });
      \u0275\u0275text(42, "\u0627\u0644\u0643\u0644");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(43, SuppliersComponent_For_44_Template, 4, 4, "button", 15, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(45, SuppliersComponent_Conditional_45_Template, 5, 0, "div", 16)(46, SuppliersComponent_Conditional_46_Template, 5, 0, "div", 17)(47, SuppliersComponent_Conditional_47_Template, 24, 0, "table", 18);
      \u0275\u0275conditionalCreate(48, SuppliersComponent_Conditional_48_Template, 51, 9, "div", 19);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate(ctx.suppliers().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.categories().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.filteredSuppliers().length);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.searchQuery());
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterCategory() === "all");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.categories());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 45 : !ctx.filteredSuppliers().length ? 46 : 47);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 48 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.amber[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.summary-card.blue[_ngcontent-%COMP%] {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-1-color);\n}\n.summary-card.green[_ngcontent-%COMP%] {\n  background: var(--stat-2-bg);\n}\n.summary-card.green[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-2-color);\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  flex: 1;\n  min-width: 200px;\n}\n.search-box[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--text-muted);\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  width: 100%;\n  outline: none;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.filter-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.filter-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.filter-tab[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.filter-tab.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.supplier-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.supplier-icon[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  background: rgba(245, 158, 11, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.supplier-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #f59e0b;\n}\n.supplier-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.category-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n  background: rgba(99, 102, 241, 0.12);\n  color: #6366f1;\n}\n.phone-cell[_ngcontent-%COMP%] {\n  direction: ltr;\n  text-align: right;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n}\n@media (max-width: 640px) {\n  .summary-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=suppliers.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SuppliersComponent, [{
    type: Component,
    args: [{ selector: "app-suppliers", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">local_shipping</span> \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646</h2>\r
    <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">add_business</span> \u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0631\u062F</button>\r
  </div>\r
\r
  <div class="summary-row">\r
    <div class="summary-card amber"><span class="material-icons-round">local_shipping</span><div><span class="num">{{ suppliers().length }}</span><span class="lbl">\u0645\u0648\u0631\u062F</span></div></div>\r
    <div class="summary-card blue"><span class="material-icons-round">category</span><div><span class="num">{{ categories().length }}</span><span class="lbl">\u062A\u0635\u0646\u064A\u0641</span></div></div>\r
    <div class="summary-card green"><span class="material-icons-round">check_circle</span><div><span class="num">{{ filteredSuppliers().length }}</span><span class="lbl">\u0646\u062A\u064A\u062C\u0629</span></div></div>\r
  </div>\r
\r
  <!-- \u0628\u062D\u062B \u0648\u0641\u0644\u062A\u0631\u0629 -->\r
  <div class="toolbar">\r
    <div class="search-box">\r
      <span class="material-icons-round">search</span>\r
      <input type="text" placeholder="\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644..." [ngModel]="searchQuery()" (ngModelChange)="searchQuery.set($event)" />\r
    </div>\r
    <div class="filter-tabs">\r
      <button class="filter-tab" [class.active]="filterCategory() === 'all'" (click)="filterCategory.set('all')">\u0627\u0644\u0643\u0644</button>\r
      @for (cat of categories(); track cat) {\r
        <button class="filter-tab" [class.active]="filterCategory() === cat" (click)="filterCategory.set(cat)">\r
          <span class="material-icons-round">{{ getCategoryIcon(cat) }}</span> {{ cat }}\r
        </button>\r
      }\r
    </div>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!filteredSuppliers().length) {\r
    <div class="empty-state"><span class="material-icons-round">inventory_2</span><p>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0631\u062F\u064A\u0646</p></div>\r
  } @else {\r
    <table class="data-table">\r
      <thead><tr><th>#</th><th>\u0627\u0644\u0645\u0648\u0631\u062F</th><th>\u0627\u0644\u0643\u0648\u062F</th><th>\u0627\u0644\u062A\u0633\u0644\u0633\u0644</th><th>\u0627\u0644\u062A\u0635\u0646\u064A\u0641</th><th>\u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644</th><th>\u0627\u0644\u0647\u0627\u062A\u0641</th><th>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th></tr></thead>\r
      <tbody>\r
        @for (s of filteredSuppliers(); track s.id; let i = $index) {\r
          <tr>\r
            <td>{{ i + 1 }}</td>\r
            <td>\r
              <div class="supplier-cell">\r
                <div class="supplier-icon"><span class="material-icons-round">{{ getCategoryIcon(s.category) }}</span></div>\r
                <div><span class="supplier-name">{{ s.name }}</span></div>\r
              </div>\r
            </td>\r
            <td>{{ s.code || '-' }}</td>\r
            <td>{{ s.sequenceNumber || '-' }}</td>\r
            <td>@if (getSupplierTypeName(s.supplierTypeId) || s.category) { <span class="category-badge">{{ getSupplierTypeName(s.supplierTypeId) || s.category }}</span> } @else { <span class="text-muted">-</span> }</td>\r
            <td>{{ s.contactPerson || '-' }}</td>\r
            <td class="phone-cell">{{ s.phone || '-' }}</td>\r
            <td>{{ s.address || '-' }}</td>\r
            <td>\r
              <button class="action-btn edit" (click)="openEdit(s)"><span class="material-icons-round">edit</span></button>\r
              <button class="action-btn delete" (click)="remove(s)"><span class="material-icons-round">delete</span></button>\r
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
          <div class="modal-title-row"><div class="modal-icon amber"><span class="material-icons-round">local_shipping</span></div><div><h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u0645\u0648\u0631\u062F' : '\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0631\u062F \u062C\u062F\u064A\u062F' }}</h2><p>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0631\u062F \u0648\u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644</p></div></div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0631\u062F</label><input [(ngModel)]="form.name" title="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0631\u062F" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0631\u062F" /></div>\r
            <div class="form-group">\r
              <label>\u0646\u0648\u0639 \u0627\u0644\u0645\u0648\u0631\u062F</label>\r
              <select [(ngModel)]="form.supplierTypeId" title="\u0646\u0648\u0639 \u0627\u0644\u0645\u0648\u0631\u062F">\r
                <option [ngValue]="null">\u0628\u062F\u0648\u0646 \u0646\u0648\u0639</option>\r
                @for (t of supplierTypes(); track t.id) { <option [ngValue]="t.id">{{ t.name }}</option> }\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644</label><input [(ngModel)]="form.contactPerson" title="\u062C\u0647\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0633\u0624\u0648\u0644" /></div>\r
            <div class="form-group"><label>\u0627\u0644\u0647\u0627\u062A\u0641</label><input [(ngModel)]="form.phone" title="\u0627\u0644\u0647\u0627\u062A\u0641" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" /></div>\r
          </div>\r
          <div class="form-group"><label>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</label><input [(ngModel)]="form.address" title="\u0627\u0644\u0639\u0646\u0648\u0627\u0646" placeholder="\u0627\u0644\u0639\u0646\u0648\u0627\u0646" /></div>\r
          <div class="form-group"><label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label><textarea [(ngModel)]="form.notes" title="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629..."></textarea></div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0631\u062F' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/suppliers/suppliers.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.amber {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber .material-icons-round {\n  color: #f59e0b;\n}\n.summary-card.blue {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue .material-icons-round {\n  color: var(--stat-1-color);\n}\n.summary-card.green {\n  background: var(--stat-2-bg);\n}\n.summary-card.green .material-icons-round {\n  color: var(--stat-2-color);\n}\n.toolbar {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.search-box {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  flex: 1;\n  min-width: 200px;\n}\n.search-box .material-icons-round {\n  font-size: 20px;\n  color: var(--text-muted);\n}\n.search-box input {\n  border: none;\n  background: transparent;\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  width: 100%;\n  outline: none;\n}\n.search-box input::placeholder {\n  color: var(--text-muted);\n}\n.filter-tabs {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.filter-tab {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab .material-icons-round {\n  font-size: 16px;\n}\n.filter-tab:hover {\n  background: var(--bg-card-hover);\n}\n.filter-tab.active {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.supplier-cell {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.supplier-icon {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  background: rgba(245, 158, 11, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.supplier-icon .material-icons-round {\n  font-size: 18px;\n  color: #f59e0b;\n}\n.supplier-name {\n  font-weight: 700;\n}\n.category-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n  background: rgba(99, 102, 241, 0.12);\n  color: #6366f1;\n}\n.phone-cell {\n  direction: ltr;\n  text-align: right;\n}\n.text-muted {\n  color: var(--text-muted);\n}\n@media (max-width: 640px) {\n  .summary-row {\n    flex-direction: column;\n  }\n  .toolbar {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=suppliers.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SuppliersComponent, { className: "SuppliersComponent", filePath: "src/app/pages/suppliers/suppliers.ts", lineNumber: 15 });
})();
export {
  SuppliersComponent
};
//# sourceMappingURL=chunk-3INQ4I2S.js.map
