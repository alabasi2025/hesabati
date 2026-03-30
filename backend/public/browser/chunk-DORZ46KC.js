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
  NgModel
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/supplier-types/supplier-types.ts
var _forTrack0 = ($index, $item) => $item.id;
function SupplierTypesComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-state", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("loading", ctx_r0.loading());
  }
}
function SupplierTypesComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "span", 2);
    \u0275\u0275text(2, "local_shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u0648\u0631\u062F\u064A\u0646 \u0628\u0639\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 12);
    \u0275\u0275text(6, "\u0623\u0636\u0641 \u0623\u0646\u0648\u0627\u0639\u0627\u064B \u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646 \u062D\u0633\u0628 \u0646\u0634\u0627\u0637\u0647\u0645");
    \u0275\u0275elementEnd()();
  }
}
function SupplierTypesComponent_Conditional_21_For_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3.description);
  }
}
function SupplierTypesComponent_Conditional_21_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u0646\u0634\u0637 ");
  }
}
function SupplierTypesComponent_Conditional_21_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u063A\u064A\u0631 \u0646\u0634\u0637 ");
  }
}
function SupplierTypesComponent_Conditional_21_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "div", 15)(3, "span", 2);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 16)(6, "button", 17);
    \u0275\u0275listener("click", function SupplierTypesComponent_Conditional_21_For_2_Template_button_click_6_listener() {
      const t_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openEdit(t_r3));
    });
    \u0275\u0275elementStart(7, "span", 2);
    \u0275\u0275text(8, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 18);
    \u0275\u0275listener("click", function SupplierTypesComponent_Conditional_21_For_2_Template_button_click_9_listener() {
      const t_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.remove(t_r3));
    });
    \u0275\u0275elementStart(10, "span", 2);
    \u0275\u0275text(11, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "h3", 19);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 20);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, SupplierTypesComponent_Conditional_21_For_2_Conditional_16_Template, 2, 1, "p", 21);
    \u0275\u0275elementStart(17, "div", 22)(18, "span", 23);
    \u0275\u0275conditionalCreate(19, SupplierTypesComponent_Conditional_21_For_2_Conditional_19_Template, 1, 0)(20, SupplierTypesComponent_Conditional_21_For_2_Conditional_20_Template, 1, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", t_r3.color + "18")("color", t_r3.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.icon || "local_shipping");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(t_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.subTypeKey);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r3.description ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", t_r3.color + "15")("color", t_r3.color);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r3.isActive ? 19 : 20);
  }
}
function SupplierTypesComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275repeaterCreate(1, SupplierTypesComponent_Conditional_21_For_2_Template, 21, 13, "div", 13, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.types());
  }
}
function SupplierTypesComponent_Conditional_22_For_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function SupplierTypesComponent_Conditional_22_For_47_Template_button_click_0_listener() {
      const ic_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.form.icon = ic_r6);
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ic_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("color", ctx_r0.form.icon === ic_r6 ? ctx_r0.form.color : "");
    \u0275\u0275classProp("selected", ctx_r0.form.icon === ic_r6);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ic_r6);
  }
}
function SupplierTypesComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275listener("click", function SupplierTypesComponent_Conditional_22_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 25);
    \u0275\u0275listener("click", function SupplierTypesComponent_Conditional_22_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 26)(3, "div", 27)(4, "div", 28)(5, "span", 2);
    \u0275\u0275text(6, "local_shipping");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646 \u062A\u0633\u0627\u0639\u062F \u0641\u064A \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646 \u062D\u0633\u0628 \u0646\u0634\u0627\u0637\u0647\u0645");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 29);
    \u0275\u0275listener("click", function SupplierTypesComponent_Conditional_22_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 30)(16, "div", 31)(17, "div", 32)(18, "label");
    \u0275\u0275text(19, "\u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639 ");
    \u0275\u0275elementStart(20, "span", 33);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function SupplierTypesComponent_Conditional_22_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.name, $event) || (ctx_r0.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function SupplierTypesComponent_Conditional_22_Template_input_ngModelChange_22_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onNameChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 32)(24, "label");
    \u0275\u0275text(25, "\u0627\u0644\u0645\u0641\u062A\u0627\u062D ");
    \u0275\u0275elementStart(26, "span", 33);
    \u0275\u0275text(27, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function SupplierTypesComponent_Conditional_22_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.subTypeKey, $event) || (ctx_r0.form.subTypeKey = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 32)(30, "label");
    \u0275\u0275text(31, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "textarea", 36);
    \u0275\u0275twoWayListener("ngModelChange", function SupplierTypesComponent_Conditional_22_Template_textarea_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.description, $event) || (ctx_r0.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 31)(34, "div", 32)(35, "label");
    \u0275\u0275text(36, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 37)(38, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function SupplierTypesComponent_Conditional_22_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.color, $event) || (ctx_r0.form.color = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(39, "span", 39);
    \u0275\u0275elementStart(40, "span");
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "div", 32)(43, "label");
    \u0275\u0275text(44, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 40);
    \u0275\u0275repeaterCreate(46, SupplierTypesComponent_Conditional_22_For_47_Template, 3, 5, "button", 41, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(48, "div", 42)(49, "button", 43);
    \u0275\u0275listener("click", function SupplierTypesComponent_Conditional_22_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.save());
    });
    \u0275\u0275text(50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "button", 44);
    \u0275\u0275listener("click", function SupplierTypesComponent_Conditional_22_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275text(52, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u0646\u0648\u0639 \u0645\u0648\u0631\u062F" : "\u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0645\u0648\u0631\u062F \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.name);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.subTypeKey);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.description);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r0.form.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.form.color);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.availableIcons);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0648\u0639");
  }
}
var SupplierTypesComponent = class _SupplierTypesComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  types = signal([], ...ngDevMode ? [{ debugName: "types" }] : (
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
  form = {
    name: "",
    subTypeKey: "",
    description: "",
    icon: "local_shipping",
    color: "#0ea5e9"
  };
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getSupplierTypes(this.bizId);
      this.types.set(data || []);
    } catch (e) {
      console.error(e);
    }
    this.loading.set(false);
  }
  openAdd() {
    this.form = { name: "", subTypeKey: "", description: "", icon: "local_shipping", color: "#0ea5e9" };
    this.editingId.set(null);
    this.showForm.set(true);
  }
  openEdit(t) {
    this.form = {
      name: t.name,
      subTypeKey: t.subTypeKey,
      description: t.description || "",
      icon: t.icon || "local_shipping",
      color: t.color || "#0ea5e9"
    };
    this.editingId.set(t.id);
    this.showForm.set(true);
  }
  onNameChange() {
    if (!this.editingId()) {
      this.form.subTypeKey = this.form.name.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^\u0621-\u064Aa-z0-9_]/g, "");
    }
  }
  async save() {
    if (!this.form.name?.trim()) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0627\u0633\u0645");
      return;
    }
    if (!this.form.subTypeKey?.trim()) {
      this.form.subTypeKey = this.form.name.trim().toLowerCase().replace(/\s+/g, "_");
    }
    try {
      if (this.editingId()) {
        await this.api.updateSupplierType(this.editingId(), this.form);
        this.toast.success("\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0646\u0648\u0639 \u0628\u0646\u062C\u0627\u062D");
      } else {
        await this.api.createSupplierType(this.bizId, this.form);
        this.toast.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0648\u0639 \u0628\u0646\u062C\u0627\u062D");
      }
      this.showForm.set(false);
      await this.load();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  async remove(t) {
    const confirmed = await this.toast.confirm({
      title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641",
      message: `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0646\u0648\u0639 "${t.name}"\u061F`,
      type: "danger"
    });
    if (confirmed) {
      try {
        await this.api.deleteSupplierType(t.id);
        this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0646\u0648\u0639");
        await this.load();
      } catch (e) {
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
      }
    }
  }
  availableIcons = [
    "local_shipping",
    "inventory",
    "store",
    "storefront",
    "shopping_cart",
    "handshake",
    "business",
    "factory",
    "agriculture",
    "construction",
    "precision_manufacturing",
    "engineering",
    "warehouse",
    "science",
    "biotech"
  ];
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SupplierTypesComponent_BaseFactory;
    return function SupplierTypesComponent_Factory(__ngFactoryType__) {
      return (\u0275SupplierTypesComponent_BaseFactory || (\u0275SupplierTypesComponent_BaseFactory = \u0275\u0275getInheritedFactory(_SupplierTypesComponent)))(__ngFactoryType__ || _SupplierTypesComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SupplierTypesComponent, selectors: [["app-supplier-types"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 23, vars: 3, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "summary-row"], [1, "summary-card", "sky"], [1, "num"], [1, "lbl"], [3, "loading"], [1, "empty-state"], [1, "categories-grid"], [1, "modal-overlay"], [1, "empty-hint"], [1, "category-card"], [1, "cat-header"], [1, "cat-icon"], [1, "cat-actions"], [1, "action-btn", "edit", 3, "click"], [1, "action-btn", "delete", 3, "click"], [1, "cat-name"], [1, "cat-key"], [1, "cat-desc"], [1, "cat-footer"], [1, "cat-badge"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "sky"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], [1, "required"], ["placeholder", "\u0645\u062B\u0627\u0644: \u0645\u0648\u0631\u062F \u0645\u0648\u0627\u062F \u063A\u0630\u0627\u0626\u064A\u0629", 3, "ngModelChange", "ngModel"], ["placeholder", "\u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B", "dir", "ltr", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u0646\u0648\u0639...", 3, "ngModelChange", "ngModel"], [1, "color-picker-row"], ["type", "color", 3, "ngModelChange", "ngModel"], [1, "color-preview"], [1, "icon-grid"], [1, "icon-btn", 3, "selected", "color"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"], [1, "icon-btn", 3, "click"]], template: function SupplierTypesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "local_shipping");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function SupplierTypesComponent_Template_button_click_6_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "span", 2);
      \u0275\u0275text(13, "local_shipping");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div")(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 7);
      \u0275\u0275text(18, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0646\u0648\u0627\u0639");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(19, SupplierTypesComponent_Conditional_19_Template, 1, 1, "app-loading-state", 8)(20, SupplierTypesComponent_Conditional_20_Template, 7, 0, "div", 9)(21, SupplierTypesComponent_Conditional_21_Template, 3, 0, "div", 10);
      \u0275\u0275conditionalCreate(22, SupplierTypesComponent_Conditional_22_Template, 53, 9, "div", 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate(ctx.types().length);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.loading() ? 19 : !ctx.types().length ? 20 : 21);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 22 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, LoadingStateComponent], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  max-width: 280px;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.sky[_ngcontent-%COMP%] {\n  background: rgba(14, 165, 233, 0.08);\n}\n.summary-card.sky[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #0ea5e9;\n}\n.categories-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}\n.category-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  padding: 24px;\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s;\n}\n.category-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);\n}\n.cat-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.cat-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.cat-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.cat-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.cat-name[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 4px;\n}\n.cat-key[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-family: monospace;\n  direction: ltr;\n  background: var(--bg-surface);\n  padding: 2px 8px;\n  border-radius: 4px;\n  margin-bottom: 8px;\n}\n.cat-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-top: 8px;\n}\n.cat-footer[_ngcontent-%COMP%] {\n  margin-top: 14px;\n}\n.cat-badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n}\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.color-picker-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.color-picker-row[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%] {\n  width: 40px;\n  height: 36px;\n  border: none;\n  cursor: pointer;\n  border-radius: 8px;\n}\n.color-picker-row[_ngcontent-%COMP%]   .color-preview[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n}\n.color-picker-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-family: monospace;\n}\n.icon-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.icon-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-hover);\n}\n.icon-btn.selected[_ngcontent-%COMP%] {\n  border-color: currentColor;\n  background: rgba(14, 165, 233, 0.1);\n}\n.required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n@media (max-width: 640px) {\n  .categories-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=supplier-types.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SupplierTypesComponent, [{
    type: Component,
    args: [{ selector: "app-supplier-types", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">local_shipping</span> \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646</h2>\r
    <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639</button>\r
  </div>\r
\r
  <div class="summary-row">\r
    <div class="summary-card sky">\r
      <span class="material-icons-round">local_shipping</span>\r
      <div><span class="num">{{ types().length }}</span><span class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0646\u0648\u0627\u0639</span></div>\r
    </div>\r
  </div>\r
\r
  @if (loading()) {\r
    <app-loading-state [loading]="loading()" />\r
  } @else if (!types().length) {\r
    <div class="empty-state">\r
      <span class="material-icons-round">local_shipping</span>\r
      <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u0645\u0648\u0631\u062F\u064A\u0646 \u0628\u0639\u062F</p>\r
      <p class="empty-hint">\u0623\u0636\u0641 \u0623\u0646\u0648\u0627\u0639\u0627\u064B \u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646 \u062D\u0633\u0628 \u0646\u0634\u0627\u0637\u0647\u0645</p>\r
    </div>\r
  } @else {\r
    <div class="categories-grid">\r
      @for (t of types(); track t.id) {\r
        <div class="category-card">\r
          <div class="cat-header">\r
            <div class="cat-icon" [style.background]="t.color + '18'" [style.color]="t.color">\r
              <span class="material-icons-round">{{ t.icon || 'local_shipping' }}</span>\r
            </div>\r
            <div class="cat-actions">\r
              <button class="action-btn edit" (click)="openEdit(t)"><span class="material-icons-round">edit</span></button>\r
              <button class="action-btn delete" (click)="remove(t)"><span class="material-icons-round">delete</span></button>\r
            </div>\r
          </div>\r
          <h3 class="cat-name">{{ t.name }}</h3>\r
          <span class="cat-key">{{ t.subTypeKey }}</span>\r
          @if (t.description) {\r
            <p class="cat-desc">{{ t.description }}</p>\r
          }\r
          <div class="cat-footer">\r
            <span class="cat-badge" [style.background]="t.color + '15'" [style.color]="t.color">\r
              @if (t.isActive) { \u0646\u0634\u0637 } @else { \u063A\u064A\u0631 \u0646\u0634\u0637 }\r
            </span>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  @if (showForm()) {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon sky"><span class="material-icons-round">local_shipping</span></div>\r
            <div>\r
              <h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u0646\u0648\u0639 \u0645\u0648\u0631\u062F' : '\u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0645\u0648\u0631\u062F \u062C\u062F\u064A\u062F' }}</h2>\r
              <p>\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646 \u062A\u0633\u0627\u0639\u062F \u0641\u064A \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646 \u062D\u0633\u0628 \u0646\u0634\u0627\u0637\u0647\u0645</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0633\u0645 \u0627\u0644\u0646\u0648\u0639 <span class="required">*</span></label>\r
              <input [(ngModel)]="form.name" (ngModelChange)="onNameChange()" placeholder="\u0645\u062B\u0627\u0644: \u0645\u0648\u0631\u062F \u0645\u0648\u0627\u062F \u063A\u0630\u0627\u0626\u064A\u0629" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0641\u062A\u0627\u062D <span class="required">*</span></label>\r
              <input [(ngModel)]="form.subTypeKey" placeholder="\u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" dir="ltr" />\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0648\u0635\u0641</label>\r
            <textarea [(ngModel)]="form.description" rows="2" placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u0646\u0648\u0639..."></textarea>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0644\u0648\u0646</label>\r
              <div class="color-picker-row">\r
                <input type="color" [(ngModel)]="form.color" />\r
                <span class="color-preview" [style.background]="form.color"></span>\r
                <span>{{ form.color }}</span>\r
              </div>\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
              <div class="icon-grid">\r
                @for (ic of availableIcons; track ic) {\r
                  <button class="icon-btn" [class.selected]="form.icon === ic" (click)="form.icon = ic"\r
                    [style.color]="form.icon === ic ? form.color : ''">\r
                    <span class="material-icons-round">{{ ic }}</span>\r
                  </button>\r
                }\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0646\u0648\u0639' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/supplier-types/supplier-types.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  max-width: 280px;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.sky {\n  background: rgba(14, 165, 233, 0.08);\n}\n.summary-card.sky .material-icons-round {\n  color: #0ea5e9;\n}\n.categories-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}\n.category-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  padding: 24px;\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s;\n}\n.category-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);\n}\n.cat-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.cat-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.cat-icon .material-icons-round {\n  font-size: 24px;\n}\n.cat-actions {\n  display: flex;\n  gap: 4px;\n}\n.cat-name {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 4px;\n}\n.cat-key {\n  display: inline-block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-family: monospace;\n  direction: ltr;\n  background: var(--bg-surface);\n  padding: 2px 8px;\n  border-radius: 4px;\n  margin-bottom: 8px;\n}\n.cat-desc {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-top: 8px;\n}\n.cat-footer {\n  margin-top: 14px;\n}\n.cat-badge {\n  padding: 4px 12px;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 700;\n}\n.empty-hint {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.color-picker-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.color-picker-row input[type=color] {\n  width: 40px;\n  height: 36px;\n  border: none;\n  cursor: pointer;\n  border-radius: 8px;\n}\n.color-picker-row .color-preview {\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n}\n.color-picker-row span {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-family: monospace;\n}\n.icon-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.icon-btn {\n  width: 38px;\n  height: 38px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn .material-icons-round {\n  font-size: 20px;\n}\n.icon-btn:hover {\n  background: var(--bg-hover);\n}\n.icon-btn.selected {\n  border-color: currentColor;\n  background: rgba(14, 165, 233, 0.1);\n}\n.required {\n  color: #ef4444;\n}\n@media (max-width: 640px) {\n  .categories-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=supplier-types.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SupplierTypesComponent, { className: "SupplierTypesComponent", filePath: "src/app/pages/supplier-types/supplier-types.ts", lineNumber: 18 });
})();
export {
  SupplierTypesComponent
};
//# sourceMappingURL=chunk-DORZ46KC.js.map
