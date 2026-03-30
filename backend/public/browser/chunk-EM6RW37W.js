import {
  CheckboxControlValueAccessor,
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
  __spreadProps,
  __spreadValues,
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
  ɵɵtextInterpolate1
} from "./chunk-VUZEB5JS.js";

// src/app/pages/stations/stations.ts
var _forTrack0 = ($index, $item) => $item.id;
function StationsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 8);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function StationsComponent_Conditional_14_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("#", s_r2.sequenceNumber);
  }
}
function StationsComponent_Conditional_14_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 2);
    \u0275\u0275text(2, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(s_r2.location);
  }
}
function StationsComponent_Conditional_14_For_2_Conditional_15_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.getBillingLabel(b_r3));
  }
}
function StationsComponent_Conditional_14_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 2);
    \u0275\u0275text(2, "dns");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25);
    \u0275\u0275repeaterCreate(4, StationsComponent_Conditional_14_For_2_Conditional_15_For_5_Template, 2, 1, "span", 26, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275repeater(s_r2.billingSystems);
  }
}
function StationsComponent_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13)(2, "div", 14)(3, "span", 2);
    \u0275\u0275text(4, "bolt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 15)(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 16);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, StationsComponent_Conditional_14_For_2_Conditional_10_Template, 2, 1, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 17);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 18);
    \u0275\u0275conditionalCreate(14, StationsComponent_Conditional_14_For_2_Conditional_14_Template, 5, 1, "div", 19);
    \u0275\u0275conditionalCreate(15, StationsComponent_Conditional_14_For_2_Conditional_15_Template, 6, 0, "div", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 20)(17, "div", 21)(18, "span", 2);
    \u0275\u0275text(19, "groups");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 22)(23, "button", 23);
    \u0275\u0275listener("click", function StationsComponent_Conditional_14_For_2_Template_button_click_23_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.openEdit(s_r2));
    });
    \u0275\u0275elementStart(24, "span", 2);
    \u0275\u0275text(25, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 24);
    \u0275\u0275listener("click", function StationsComponent_Conditional_14_For_2_Template_button_click_26_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deleteStation(s_r2));
    });
    \u0275\u0275elementStart(27, "span", 2);
    \u0275\u0275text(28, "delete");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const \u0275$index_34_r5 = ctx.$index;
    \u0275\u0275classMap("accent-" + \u0275$index_34_r5 % 5);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(s_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r2.code);
    \u0275\u0275advance();
    \u0275\u0275conditional(s_r2.sequenceNumber ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", s_r2.isActive)("inactive", !s_r2.isActive);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r2.isActive ? "\u0646\u0634\u0637\u0629" : "\u0645\u062A\u0648\u0642\u0641\u0629", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(s_r2.location ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(s_r2.billingSystems && s_r2.billingSystems.length > 0 ? 15 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(s_r2.hasEmployees ? "\u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u064A\u0646" : "\u0628\u062F\u0648\u0646 \u0645\u0648\u0638\u0641\u064A\u0646");
  }
}
function StationsComponent_Conditional_14_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 2);
    \u0275\u0275text(2, "bolt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062D\u0637\u0627\u062A \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0639\u0645\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 5);
    \u0275\u0275listener("click", function StationsComponent_Conditional_14_Conditional_3_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.openCreate());
    });
    \u0275\u0275elementStart(6, "span", 2);
    \u0275\u0275text(7, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " \u0625\u0636\u0627\u0641\u0629 \u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd()();
  }
}
function StationsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, StationsComponent_Conditional_14_For_2_Template, 29, 13, "div", 10, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, StationsComponent_Conditional_14_Conditional_3_Template, 9, 0, "div", 11);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.stations());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.stations().length === 0 ? 3 : -1);
  }
}
function StationsComponent_Conditional_15_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 39);
    \u0275\u0275text(1, "\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0631\u0645\u0632 \u0628\u0639\u062F \u0627\u0644\u0625\u0646\u0634\u0627\u0621");
    \u0275\u0275elementEnd();
  }
}
function StationsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275listener("click", function StationsComponent_Conditional_15_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeForm());
    });
    \u0275\u0275elementStart(1, "div", 28);
    \u0275\u0275listener("click", function StationsComponent_Conditional_15_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 29)(3, "div", 30)(4, "div", 31)(5, "span", 2);
    \u0275\u0275text(6, "bolt");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h2");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 32);
    \u0275\u0275listener("click", function StationsComponent_Conditional_15_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeForm());
    });
    \u0275\u0275elementStart(10, "span", 2);
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 33)(13, "div", 34)(14, "div", 35)(15, "label");
    \u0275\u0275text(16, "\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0637\u0629 ");
    \u0275\u0275elementStart(17, "span", 36);
    \u0275\u0275text(18, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "input", 37);
    \u0275\u0275listener("ngModelChange", function StationsComponent_Conditional_15_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setFormField("name", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 35)(21, "label");
    \u0275\u0275text(22, "\u0627\u0644\u0631\u0645\u0632 ");
    \u0275\u0275elementStart(23, "span", 36);
    \u0275\u0275text(24, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "input", 38);
    \u0275\u0275listener("ngModelChange", function StationsComponent_Conditional_15_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setFormField("code", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, StationsComponent_Conditional_15_Conditional_26_Template, 2, 0, "small", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 35)(28, "label");
    \u0275\u0275text(29, "\u0627\u0644\u0645\u0648\u0642\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 40);
    \u0275\u0275listener("ngModelChange", function StationsComponent_Conditional_15_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setFormField("location", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 35)(32, "label");
    \u0275\u0275text(33, "\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 41);
    \u0275\u0275listener("ngModelChange", function StationsComponent_Conditional_15_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setFormField("billingSystemsStr", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 42)(36, "label")(37, "input", 43);
    \u0275\u0275listener("ngModelChange", function StationsComponent_Conditional_15_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setFormField("isActive", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(38, " \u0627\u0644\u0645\u062D\u0637\u0629 \u0646\u0634\u0637\u0629 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 35)(40, "label");
    \u0275\u0275text(41, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "textarea", 44);
    \u0275\u0275listener("ngModelChange", function StationsComponent_Conditional_15_Template_textarea_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setFormField("notes", $event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "div", 45)(44, "button", 46);
    \u0275\u0275listener("click", function StationsComponent_Conditional_15_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.save());
    });
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "button", 47);
    \u0275\u0275listener("click", function StationsComponent_Conditional_15_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeForm());
    });
    \u0275\u0275text(47, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r3.editingStation() ? "\u062A\u0639\u062F\u064A\u0644 \u0645\u062D\u0637\u0629" : "\u0625\u0636\u0627\u0641\u0629 \u0645\u062D\u0637\u0629 \u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275advance(11);
    \u0275\u0275property("ngModel", ctx_r3.form().name);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r3.form().code)("readonly", !!ctx_r3.editingStation());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.editingStation() ? 26 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r3.form().location);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r3.form().billingSystemsStr);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r3.form().isActive);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r3.form().notes);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : ctx_r3.editingStation() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629", " ");
  }
}
var StationsComponent = class _StationsComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  stations = signal([], ...ngDevMode ? [{ debugName: "stations" }] : (
    /* istanbul ignore next */
    []
  ));
  billingSystems = signal([], ...ngDevMode ? [{ debugName: "billingSystems" }] : (
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
  showForm = signal(false, ...ngDevMode ? [{ debugName: "showForm" }] : (
    /* istanbul ignore next */
    []
  ));
  editingStation = signal(null, ...ngDevMode ? [{ debugName: "editingStation" }] : (
    /* istanbul ignore next */
    []
  ));
  form = signal({
    name: "",
    code: "",
    location: "",
    isActive: true,
    notes: "",
    billingSystemsStr: ""
  }, ...ngDevMode ? [{ debugName: "form" }] : (
    /* istanbul ignore next */
    []
  ));
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const [data, systems] = await Promise.all([
        this.api.getStations(this.bizId),
        this.api.getBillingSystemsConfig(this.bizId).catch(() => [])
      ]);
      this.stations.set(data);
      this.billingSystems.set(systems);
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u0637\u0627\u062A");
    }
    this.loading.set(false);
  }
  openCreate() {
    this.editingStation.set(null);
    this.form.set({
      name: "",
      code: "",
      location: "",
      isActive: true,
      notes: "",
      billingSystemsStr: ""
    });
    this.showForm.set(true);
  }
  openEdit(s) {
    this.editingStation.set(s);
    const billingStr = Array.isArray(s.billingSystems) ? s.billingSystems.join(", ") : s.billingSystems || "";
    this.form.set({
      name: s.name || "",
      code: s.code || "",
      location: s.location || "",
      isActive: s.isActive !== false,
      notes: s.notes || "",
      billingSystemsStr: billingStr
    });
    this.showForm.set(true);
  }
  closeForm() {
    this.showForm.set(false);
    this.editingStation.set(null);
  }
  getBillingSystemsArray(str) {
    if (!str || !str.trim())
      return [];
    return str.split(",").map((s) => s.trim()).filter(Boolean);
  }
  async save() {
    const f = this.form();
    if (!f.name?.trim()) {
      this.toast.warning("\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0637\u0629 \u0645\u0637\u0644\u0648\u0628");
      return;
    }
    if (!f.code?.trim()) {
      this.toast.warning("\u0631\u0645\u0632 \u0627\u0644\u0645\u062D\u0637\u0629 \u0645\u0637\u0644\u0648\u0628");
      return;
    }
    this.saving.set(true);
    try {
      const payload = {
        name: f.name.trim(),
        code: f.code.trim(),
        location: f.location?.trim() || null,
        isActive: f.isActive,
        notes: f.notes?.trim() || null,
        billingSystems: this.getBillingSystemsArray(f.billingSystemsStr)
      };
      const editing = this.editingStation();
      if (editing) {
        await this.api.updateStationByBiz(this.bizId, editing.id, payload);
        this.toast.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062D\u0637\u0629 \u0628\u0646\u062C\u0627\u062D");
      } else {
        await this.api.createStation(this.bizId, payload);
        this.toast.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062D\u0637\u0629 \u0628\u0646\u062C\u0627\u062D");
      }
      this.closeForm();
      await this.load();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638");
    } finally {
      this.saving.set(false);
    }
  }
  async deleteStation(s) {
    const confirmed = await this.toast.confirm({
      title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641",
      message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u0645\u062D\u0637\u0629 "${s.name}"\u061F`,
      type: "danger"
    });
    if (!confirmed)
      return;
    try {
      await this.api.deleteStation(this.bizId, s.id);
      this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062D\u0637\u0629");
      await this.load();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641");
    }
  }
  getBillingLabel(sysKey) {
    const sys = this.billingSystems().find((s) => s.systemKey === sysKey);
    return sys?.name ?? sysKey;
  }
  setFormField(field, value) {
    this.form.update((f) => __spreadProps(__spreadValues({}, f), { [field]: value }));
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275StationsComponent_BaseFactory;
    return function StationsComponent_Factory(__ngFactoryType__) {
      return (\u0275StationsComponent_BaseFactory || (\u0275StationsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_StationsComponent)))(__ngFactoryType__ || _StationsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StationsComponent, selectors: [["app-stations"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 16, vars: 3, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "header-actions"], [1, "badge"], [1, "add-btn", 3, "click"], [1, "loading-state"], [1, "modal-overlay"], [1, "material-icons-round", "spin"], [1, "cards-grid"], [1, "station-card", 3, "class"], [1, "empty-state"], [1, "station-card"], [1, "station-header"], [1, "station-icon"], [1, "station-info"], [1, "station-code"], [1, "status-badge"], [1, "station-details"], [1, "detail-row"], [1, "station-footer"], [1, "footer-stat"], [1, "card-actions"], ["type", "button", "title", "\u062A\u0639\u062F\u064A\u0644", 1, "action-btn", "edit", 3, "click"], ["type", "button", "title", "\u062D\u0630\u0641", 1, "action-btn", "delete", 3, "click"], [1, "billing-tags"], [1, "billing-tag"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "green"], ["type", "button", 1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], [1, "required"], ["placeholder", "\u0645\u062B\u0627\u0644: \u0627\u0644\u0645\u062D\u0637\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0645\u062B\u0627\u0644: ST-01", 3, "ngModelChange", "ngModel", "readonly"], [1, "form-hint"], ["placeholder", "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0623\u0648 \u0627\u0644\u0645\u0648\u0642\u0639", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0641\u0627\u0635\u0644\u0629\u060C \u0645\u062B\u0627\u0644: moghrabi_v1, prepaid", 3, "ngModelChange", "ngModel"], [1, "form-group", "checkbox-group"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], ["type", "button", 1, "btn-save", 3, "click", "disabled"], ["type", "button", 1, "btn-cancel", 3, "click"]], template: function StationsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "bolt");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u0645\u062D\u0637\u0627\u062A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "span", 4);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 5);
      \u0275\u0275listener("click", function StationsComponent_Template_button_click_9_listener() {
        return ctx.openCreate();
      });
      \u0275\u0275elementStart(10, "span", 2);
      \u0275\u0275text(11, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(12, " \u0625\u0636\u0627\u0641\u0629 \u0645\u062D\u0637\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(13, StationsComponent_Conditional_13_Template, 5, 0, "div", 6)(14, StationsComponent_Conditional_14_Template, 4, 1);
      \u0275\u0275conditionalCreate(15, StationsComponent_Conditional_15_Template, 48, 11, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.stations().length);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.loading() ? 13 : 14);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showForm() ? 15 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgModel], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.cards-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  gap: 20px;\n}\n.station-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 16px;\n  padding: 24px;\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.station-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 4px;\n}\n.station-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-hover);\n  border-color: var(--border-strong);\n}\n.station-card.accent-0[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #f59e0b,\n      #f97316);\n}\n.station-card.accent-0[_ngcontent-%COMP%]   .station-icon[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #f59e0b;\n}\n.station-card.accent-1[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6,\n      #6366f1);\n}\n.station-card.accent-1[_ngcontent-%COMP%]   .station-icon[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.15);\n  color: #3b82f6;\n}\n.station-card.accent-2[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #22c55e,\n      #14b8a6);\n}\n.station-card.accent-2[_ngcontent-%COMP%]   .station-icon[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.station-card.accent-3[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #a855f7,\n      #ec4899);\n}\n.station-card.accent-3[_ngcontent-%COMP%]   .station-icon[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.15);\n  color: #a855f7;\n}\n.station-card.accent-4[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #06b6d4,\n      #3b82f6);\n}\n.station-card.accent-4[_ngcontent-%COMP%]   .station-icon[_ngcontent-%COMP%] {\n  background: rgba(6, 182, 212, 0.15);\n  color: #06b6d4;\n}\n.station-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 18px;\n}\n.station-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.station-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n}\n.station-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.station-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 2px;\n}\n.station-info[_ngcontent-%COMP%]   .station-code[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-muted);\n  background: var(--bg-surface);\n  padding: 2px 10px;\n  border-radius: 6px;\n}\n.station-details[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 8px 0;\n  border-bottom: 1px solid var(--border-color);\n  color: var(--text-secondary);\n  font-size: 14px;\n  font-weight: 600;\n}\n.detail-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.detail-row[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--text-muted);\n  margin-top: 2px;\n}\n.billing-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.billing-tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 8px;\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  border: 1px solid var(--border-color);\n}\n.station-footer[_ngcontent-%COMP%] {\n  padding-top: 12px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.footer-stat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-muted);\n}\n.footer-stat[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.badge[_ngcontent-%COMP%] {\n  background: var(--accent-amber);\n  color: #000;\n  font-size: 13px;\n  font-weight: 800;\n  padding: 4px 14px;\n  border-radius: 10px;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n@media (max-width: 768px) {\n  .cards-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=stations.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StationsComponent, [{
    type: Component,
    args: [{ selector: "app-stations", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">bolt</span> \u0627\u0644\u0645\u062D\u0637\u0627\u062A</h2>\r
    <div class="header-actions">\r
      <span class="badge">{{ stations().length }}</span>\r
      <button class="add-btn" (click)="openCreate()"><span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0645\u062D\u0637\u0629</button>\r
    </div>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else {\r
    <div class="cards-grid">\r
      @for (s of stations(); track s.id; let i = $index) {\r
        <div class="station-card" [class]="'accent-' + (i % 5)">\r
          <div class="station-header">\r
            <div class="station-icon">\r
              <span class="material-icons-round">bolt</span>\r
            </div>\r
            <div class="station-info">\r
              <h3>{{ s.name }}</h3>\r
              <span class="station-code">{{ s.code }}</span>\r
              @if (s.sequenceNumber) {\r
                <span class="station-code">#{{ s.sequenceNumber }}</span>\r
              }\r
            </div>\r
            <span class="status-badge" [class.active]="s.isActive" [class.inactive]="!s.isActive">\r
              {{ s.isActive ? '\u0646\u0634\u0637\u0629' : '\u0645\u062A\u0648\u0642\u0641\u0629' }}\r
            </span>\r
          </div>\r
\r
          <div class="station-details">\r
            @if (s.location) {\r
              <div class="detail-row">\r
                <span class="material-icons-round">location_on</span>\r
                <span>{{ s.location }}</span>\r
              </div>\r
            }\r
            @if (s.billingSystems && s.billingSystems.length > 0) {\r
              <div class="detail-row">\r
                <span class="material-icons-round">dns</span>\r
                <div class="billing-tags">\r
                  @for (b of s.billingSystems; track b) {\r
                    <span class="billing-tag">{{ getBillingLabel(b) }}</span>\r
                  }\r
                </div>\r
              </div>\r
            }\r
          </div>\r
\r
          <div class="station-footer">\r
            <div class="footer-stat">\r
              <span class="material-icons-round">groups</span>\r
              <span>{{ s.hasEmployees ? '\u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u064A\u0646' : '\u0628\u062F\u0648\u0646 \u0645\u0648\u0638\u0641\u064A\u0646' }}</span>\r
            </div>\r
            <div class="card-actions">\r
              <button type="button" class="action-btn edit" (click)="openEdit(s)" title="\u062A\u0639\u062F\u064A\u0644">\r
                <span class="material-icons-round">edit</span>\r
              </button>\r
              <button type="button" class="action-btn delete" (click)="deleteStation(s)" title="\u062D\u0630\u0641">\r
                <span class="material-icons-round">delete</span>\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
\r
    @if (stations().length === 0) {\r
      <div class="empty-state">\r
        <span class="material-icons-round">bolt</span>\r
        <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062D\u0637\u0627\u062A \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0639\u0645\u0644</p>\r
        <button class="add-btn" (click)="openCreate()"><span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0645\u062D\u0637\u0629</button>\r
      </div>\r
    }\r
  }\r
\r
  @if (showForm()) {\r
    <div class="modal-overlay" (click)="closeForm()">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon green"><span class="material-icons-round">bolt</span></div>\r
            <h2>{{ editingStation() ? '\u062A\u0639\u062F\u064A\u0644 \u0645\u062D\u0637\u0629' : '\u0625\u0636\u0627\u0641\u0629 \u0645\u062D\u0637\u0629 \u062C\u062F\u064A\u062F\u0629' }}</h2>\r
          </div>\r
          <button type="button" class="close-btn" (click)="closeForm()"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0633\u0645 \u0627\u0644\u0645\u062D\u0637\u0629 <span class="required">*</span></label>\r
              <input [ngModel]="form().name" (ngModelChange)="setFormField('name', $event)" placeholder="\u0645\u062B\u0627\u0644: \u0627\u0644\u0645\u062D\u0637\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0631\u0645\u0632 <span class="required">*</span></label>\r
              <input [ngModel]="form().code" (ngModelChange)="setFormField('code', $event)" placeholder="\u0645\u062B\u0627\u0644: ST-01" [readonly]="!!editingStation()" />\r
              @if (editingStation()) {\r
                <small class="form-hint">\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0631\u0645\u0632 \u0628\u0639\u062F \u0627\u0644\u0625\u0646\u0634\u0627\u0621</small>\r
              }\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0645\u0648\u0642\u0639</label>\r
            <input [ngModel]="form().location" (ngModelChange)="setFormField('location', $event)" placeholder="\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0623\u0648 \u0627\u0644\u0645\u0648\u0642\u0639" />\r
          </div>\r
          <div class="form-group">\r
            <label>\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629</label>\r
            <input [ngModel]="form().billingSystemsStr" (ngModelChange)="setFormField('billingSystemsStr', $event)" placeholder="\u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0641\u0627\u0635\u0644\u0629\u060C \u0645\u062B\u0627\u0644: moghrabi_v1, prepaid" />\r
          </div>\r
          <div class="form-group checkbox-group">\r
            <label>\r
              <input type="checkbox" [ngModel]="form().isActive" (ngModelChange)="setFormField('isActive', $event)" />\r
              \u0627\u0644\u0645\u062D\u0637\u0629 \u0646\u0634\u0637\u0629\r
            </label>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>\r
            <textarea [ngModel]="form().notes" (ngModelChange)="setFormField('notes', $event)" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u062E\u062A\u064A\u0627\u0631\u064A\u0629"></textarea>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button type="button" class="btn-save" (click)="save()" [disabled]="saving()">\r
            {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : (editingStation() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629') }}\r
          </button>\r
          <button type="button" class="btn-cancel" (click)="closeForm()">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/stations/stations.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  gap: 20px;\n}\n.station-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 16px;\n  padding: 24px;\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.station-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 4px;\n}\n.station-card:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-hover);\n  border-color: var(--border-strong);\n}\n.station-card.accent-0::before {\n  background:\n    linear-gradient(\n      90deg,\n      #f59e0b,\n      #f97316);\n}\n.station-card.accent-0 .station-icon {\n  background: rgba(245, 158, 11, 0.15);\n  color: #f59e0b;\n}\n.station-card.accent-1::before {\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6,\n      #6366f1);\n}\n.station-card.accent-1 .station-icon {\n  background: rgba(59, 130, 246, 0.15);\n  color: #3b82f6;\n}\n.station-card.accent-2::before {\n  background:\n    linear-gradient(\n      90deg,\n      #22c55e,\n      #14b8a6);\n}\n.station-card.accent-2 .station-icon {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.station-card.accent-3::before {\n  background:\n    linear-gradient(\n      90deg,\n      #a855f7,\n      #ec4899);\n}\n.station-card.accent-3 .station-icon {\n  background: rgba(168, 85, 247, 0.15);\n  color: #a855f7;\n}\n.station-card.accent-4::before {\n  background:\n    linear-gradient(\n      90deg,\n      #06b6d4,\n      #3b82f6);\n}\n.station-card.accent-4 .station-icon {\n  background: rgba(6, 182, 212, 0.15);\n  color: #06b6d4;\n}\n.station-header {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin-bottom: 18px;\n}\n.station-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.station-icon .material-icons-round {\n  font-size: 26px;\n}\n.station-info {\n  flex: 1;\n}\n.station-info h3 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 2px;\n}\n.station-info .station-code {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-muted);\n  background: var(--bg-surface);\n  padding: 2px 10px;\n  border-radius: 6px;\n}\n.station-details {\n  margin-bottom: 16px;\n}\n.detail-row {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 8px 0;\n  border-bottom: 1px solid var(--border-color);\n  color: var(--text-secondary);\n  font-size: 14px;\n  font-weight: 600;\n}\n.detail-row:last-child {\n  border-bottom: none;\n}\n.detail-row .material-icons-round {\n  font-size: 18px;\n  color: var(--text-muted);\n  margin-top: 2px;\n}\n.billing-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.billing-tag {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 8px;\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  border: 1px solid var(--border-color);\n}\n.station-footer {\n  padding-top: 12px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.card-actions {\n  display: flex;\n  gap: 4px;\n}\n.footer-stat {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-muted);\n}\n.footer-stat .material-icons-round {\n  font-size: 18px;\n}\n.badge {\n  background: var(--accent-amber);\n  color: #000;\n  font-size: 13px;\n  font-weight: 800;\n  padding: 4px 14px;\n  border-radius: 10px;\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n@media (max-width: 768px) {\n  .cards-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=stations.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StationsComponent, { className: "StationsComponent", filePath: "src/app/pages/stations/stations.ts", lineNumber: 15 });
})();
export {
  StationsComponent
};
//# sourceMappingURL=chunk-EM6RW37W.js.map
