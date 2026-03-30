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
  DatePipe,
  DecimalPipe,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/pending-accounts/pending-accounts.ts
var _forTrack0 = ($index, $item) => $item.id;
function PendingAccountsComponent_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 17);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function PendingAccountsComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "span", 2);
    \u0275\u0275text(2, "task_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u064A\u0648\u062C\u062F \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629");
    \u0275\u0275elementEnd()();
  }
}
function PendingAccountsComponent_Conditional_57_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span", 18);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "div", 19)(8, "div", 20)(9, "span", 2);
    \u0275\u0275text(10, "person");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "span", 21);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "td", 22);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 23);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td")(19, "span", 24);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td", 25);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "td")(25, "button", 26);
    \u0275\u0275listener("click", function PendingAccountsComponent_Conditional_57_For_21_Template_button_click_25_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit(item_r2));
    });
    \u0275\u0275elementStart(26, "span", 2);
    \u0275\u0275text(27, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "button", 27);
    \u0275\u0275listener("click", function PendingAccountsComponent_Conditional_57_For_21_Template_button_click_28_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.remove(item_r2));
    });
    \u0275\u0275elementStart(29, "span", 2);
    \u0275\u0275text(30, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const \u0275$index_140_r4 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_140_r4 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.accountCode || "-");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(item_r2.personOrEntity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.description || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.estimatedAmount ? \u0275\u0275pipeBind2(17, 9, item_r2.estimatedAmount, "1.0-0") + " \u0631.\u064A" : "-");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r2.getStatusClass(item_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getStatusLabel(item_r2.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(23, 12, item_r2.createdAt, "yyyy/MM/dd"));
  }
}
function PendingAccountsComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 15)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u0643\u0648\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0627\u0644\u0634\u062E\u0635 / \u0627\u0644\u062C\u0647\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "\u0625\u062C\u0631\u0627\u0621\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275repeaterCreate(20, PendingAccountsComponent_Conditional_57_For_21_Template, 31, 15, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(20);
    \u0275\u0275repeater(ctx_r2.filteredItems());
  }
}
function PendingAccountsComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275listener("click", function PendingAccountsComponent_Conditional_58_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 29);
    \u0275\u0275listener("click", function PendingAccountsComponent_Conditional_58_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 30)(3, "div", 31)(4, "div", 32)(5, "span", 2);
    \u0275\u0275text(6, "pending_actions");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u062A\u062A\u0628\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0645\u0639\u0644\u0642\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 33);
    \u0275\u0275listener("click", function PendingAccountsComponent_Conditional_58_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 34)(16, "div", 35)(17, "div", 36)(18, "label");
    \u0275\u0275text(19, "\u0627\u0644\u0634\u062E\u0635 / \u0627\u0644\u062C\u0647\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 37);
    \u0275\u0275twoWayListener("ngModelChange", function PendingAccountsComponent_Conditional_58_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.personOrEntity, $event) || (ctx_r2.form.personOrEntity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 36)(22, "label");
    \u0275\u0275text(23, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function PendingAccountsComponent_Conditional_58_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.estimatedAmount, $event) || (ctx_r2.form.estimatedAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 36)(26, "label");
    \u0275\u0275text(27, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "textarea", 39);
    \u0275\u0275twoWayListener("ngModelChange", function PendingAccountsComponent_Conditional_58_Template_textarea_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.description, $event) || (ctx_r2.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 35)(30, "div", 36)(31, "label");
    \u0275\u0275text(32, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function PendingAccountsComponent_Conditional_58_Template_select_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.status, $event) || (ctx_r2.form.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(34, "option", 41);
    \u0275\u0275text(35, "\u0645\u0639\u0644\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "option", 42);
    \u0275\u0275text(37, "\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "option", 43);
    \u0275\u0275text(39, "\u062A\u0645 \u0627\u0644\u062D\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "option", 44);
    \u0275\u0275text(41, "\u0645\u0634\u0637\u0648\u0628");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(42, "div", 36)(43, "label");
    \u0275\u0275text(44, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "textarea", 45);
    \u0275\u0275twoWayListener("ngModelChange", function PendingAccountsComponent_Conditional_58_Template_textarea_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.notes, $event) || (ctx_r2.form.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "div", 46)(47, "button", 47);
    \u0275\u0275listener("click", function PendingAccountsComponent_Conditional_58_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "button", 48);
    \u0275\u0275listener("click", function PendingAccountsComponent_Conditional_58_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275text(50, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0642" : "\u0625\u0636\u0627\u0641\u0629 \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0642");
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.personOrEntity);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.estimatedAmount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.status);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.notes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629");
  }
}
var PendingAccountsComponent = class _PendingAccountsComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : (
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
  filterStatus = signal("all", ...ngDevMode ? [{ debugName: "filterStatus" }] : (
    /* istanbul ignore next */
    []
  ));
  form = { personOrEntity: "", description: "", status: "pending", estimatedAmount: 0, notes: "" };
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getPendingAccounts(this.bizId);
      this.items.set(data);
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629");
    }
    this.loading.set(false);
  }
  filteredItems() {
    const f = this.filterStatus();
    if (f === "all")
      return this.items();
    return this.items().filter((i) => i.status === f);
  }
  totalAmount() {
    return this.filteredItems().reduce((s, i) => s + Number(i.estimatedAmount || 0), 0);
  }
  pendingCount() {
    return this.items().filter((i) => i.status === "pending").length;
  }
  resolvedCount() {
    return this.items().filter((i) => i.status === "resolved").length;
  }
  openAdd() {
    this.form = { personOrEntity: "", description: "", status: "pending", estimatedAmount: 0, notes: "" };
    this.editingId.set(null);
    this.showForm.set(true);
  }
  openEdit(item) {
    this.form = {
      personOrEntity: item.personOrEntity,
      description: item.description || "",
      status: item.status,
      estimatedAmount: Number(item.estimatedAmount || 0),
      notes: item.notes || ""
    };
    this.editingId.set(item.id);
    this.showForm.set(true);
  }
  async save() {
    try {
      const data = __spreadProps(__spreadValues({}, this.form), { estimatedAmount: String(this.form.estimatedAmount) });
      if (this.editingId()) {
        await this.api.updatePendingAccount(this.editingId(), data);
      } else {
        await this.api.createPendingAccount(this.bizId, data);
      }
      this.showForm.set(false);
      this.toast.success(this.editingId() ? "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0639\u0644\u0642 \u0628\u0646\u062C\u0627\u062D" : "\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0639\u0644\u0642 \u0628\u0646\u062C\u0627\u062D");
      await this.load();
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0639\u0644\u0642");
    }
  }
  async remove(item) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 "${item.personOrEntity}"\u061F`, type: "danger" });
    if (confirmed) {
      try {
        await this.api.deletePendingAccount(item.id);
        this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0639\u0644\u0642 \u0628\u0646\u062C\u0627\u062D");
        await this.load();
      } catch (e) {
        console.error(e);
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641");
      }
    }
  }
  getStatusLabel(s) {
    const map = { pending: "\u0645\u0639\u0644\u0642", in_progress: "\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629", resolved: "\u062A\u0645 \u0627\u0644\u062D\u0644", written_off: "\u0634\u064F\u0637\u0628" };
    return map[s] || s;
  }
  getStatusClass(s) {
    const map = { pending: "pending", in_progress: "progress", resolved: "resolved", written_off: "written-off" };
    return map[s] || "";
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275PendingAccountsComponent_BaseFactory;
    return function PendingAccountsComponent_Factory(__ngFactoryType__) {
      return (\u0275PendingAccountsComponent_BaseFactory || (\u0275PendingAccountsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_PendingAccountsComponent)))(__ngFactoryType__ || _PendingAccountsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PendingAccountsComponent, selectors: [["app-pending-accounts"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 59, vars: 22, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "summary-row"], [1, "summary-card", "amber"], [1, "num"], [1, "lbl"], [1, "summary-card", "red"], [1, "summary-card", "green"], [1, "summary-card", "blue"], [1, "filter-tabs"], [1, "filter-tab", 3, "click"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], [1, "modal-overlay"], [1, "material-icons-round", "spin"], [1, "code-badge"], [1, "person-cell"], [1, "person-avatar"], [1, "person-name"], [1, "desc-cell"], [1, "amount-cell"], [1, "status-pill"], [1, "date-cell"], [1, "action-btn", "edit", 3, "click"], [1, "action-btn", "delete", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "red"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], ["placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0623\u0648 \u0627\u0644\u062C\u0647\u0629", 3, "ngModelChange", "ngModel"], ["type", "number", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "\u0648\u0635\u0641 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0639\u0644\u0642...", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], ["value", "pending"], ["value", "in_progress"], ["value", "resolved"], ["value", "written_off"], ["rows", "2", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629...", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"]], template: function PendingAccountsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "pending_actions");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function PendingAccountsComponent_Template_button_click_6_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0625\u0636\u0627\u0641\u0629 \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0642");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "span", 2);
      \u0275\u0275text(13, "pending_actions");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div")(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 7);
      \u0275\u0275text(18, "\u0625\u062C\u0645\u0627\u0644\u064A");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 8)(20, "span", 2);
      \u0275\u0275text(21, "hourglass_top");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div")(23, "span", 6);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "span", 7);
      \u0275\u0275text(26, "\u0645\u0639\u0644\u0642");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 9)(28, "span", 2);
      \u0275\u0275text(29, "check_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div")(31, "span", 6);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span", 7);
      \u0275\u0275text(34, "\u062A\u0645 \u0627\u0644\u062D\u0644");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 10)(36, "span", 2);
      \u0275\u0275text(37, "payments");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div")(39, "span", 6);
      \u0275\u0275text(40);
      \u0275\u0275pipe(41, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "span", 7);
      \u0275\u0275text(43, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0628\u0627\u0644\u063A (\u0631.\u064A)");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(44, "div", 11)(45, "button", 12);
      \u0275\u0275listener("click", function PendingAccountsComponent_Template_button_click_45_listener() {
        return ctx.filterStatus.set("all");
      });
      \u0275\u0275text(46);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "button", 12);
      \u0275\u0275listener("click", function PendingAccountsComponent_Template_button_click_47_listener() {
        return ctx.filterStatus.set("pending");
      });
      \u0275\u0275text(48);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "button", 12);
      \u0275\u0275listener("click", function PendingAccountsComponent_Template_button_click_49_listener() {
        return ctx.filterStatus.set("in_progress");
      });
      \u0275\u0275text(50, "\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "button", 12);
      \u0275\u0275listener("click", function PendingAccountsComponent_Template_button_click_51_listener() {
        return ctx.filterStatus.set("resolved");
      });
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "button", 12);
      \u0275\u0275listener("click", function PendingAccountsComponent_Template_button_click_53_listener() {
        return ctx.filterStatus.set("written_off");
      });
      \u0275\u0275text(54, "\u0645\u0634\u0637\u0648\u0628");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(55, PendingAccountsComponent_Conditional_55_Template, 5, 0, "div", 13)(56, PendingAccountsComponent_Conditional_56_Template, 5, 0, "div", 14)(57, PendingAccountsComponent_Conditional_57_Template, 22, 0, "table", 15);
      \u0275\u0275conditionalCreate(58, PendingAccountsComponent_Conditional_58_Template, 51, 7, "div", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate(ctx.items().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.pendingCount());
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.resolvedCount());
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(41, 19, ctx.totalAmount(), "1.0-0"));
      \u0275\u0275advance(5);
      \u0275\u0275classProp("active", ctx.filterStatus() === "all");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("\u0627\u0644\u0643\u0644 (", ctx.items().length, ")");
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.filterStatus() === "pending");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("\u0645\u0639\u0644\u0642 (", ctx.pendingCount(), ")");
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.filterStatus() === "in_progress");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterStatus() === "resolved");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("\u062A\u0645 \u0627\u0644\u062D\u0644 (", ctx.resolvedCount(), ")");
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.filterStatus() === "written_off");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 55 : !ctx.filteredItems().length ? 56 : 57);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 58 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.code-badge[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-weight: 700;\n  color: #ef4444;\n  background: rgba(239, 68, 68, 0.1);\n  padding: 4px 8px;\n  border-radius: 6px;\n  font-size: 12px;\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.amber[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.summary-card.red[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.08);\n}\n.summary-card.red[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.summary-card.green[_ngcontent-%COMP%] {\n  background: var(--stat-2-bg);\n}\n.summary-card.green[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-2-color);\n}\n.summary-card.blue[_ngcontent-%COMP%] {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-1-color);\n}\n.filter-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.filter-tab[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.filter-tab.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.person-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.person-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  background: rgba(239, 68, 68, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.person-avatar[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #ef4444;\n}\n.person-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.desc-cell[_ngcontent-%COMP%] {\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.amount-cell[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: var(--accent-red);\n  direction: ltr;\n  text-align: right;\n}\n.date-cell[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  direction: ltr;\n  text-align: right;\n}\n.status-pill[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n  white-space: nowrap;\n}\n.status-pill.pending[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.2);\n  color: #f59e0b;\n}\n.status-pill.progress[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.2);\n  color: #3b82f6;\n}\n.status-pill.resolved[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-pill.written-off[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n  text-decoration: line-through;\n}\n@media (max-width: 640px) {\n  .summary-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=pending-accounts.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PendingAccountsComponent, [{
    type: Component,
    args: [{ selector: "app-pending-accounts", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">pending_actions</span> \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629</h2>\r
    <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">add_circle</span> \u0625\u0636\u0627\u0641\u0629 \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0642</button>\r
  </div>\r
\r
  <div class="summary-row">\r
    <div class="summary-card amber"><span class="material-icons-round">pending_actions</span><div><span class="num">{{ items().length }}</span><span class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A</span></div></div>\r
    <div class="summary-card red"><span class="material-icons-round">hourglass_top</span><div><span class="num">{{ pendingCount() }}</span><span class="lbl">\u0645\u0639\u0644\u0642</span></div></div>\r
    <div class="summary-card green"><span class="material-icons-round">check_circle</span><div><span class="num">{{ resolvedCount() }}</span><span class="lbl">\u062A\u0645 \u0627\u0644\u062D\u0644</span></div></div>\r
    <div class="summary-card blue"><span class="material-icons-round">payments</span><div><span class="num">{{ totalAmount() | number:'1.0-0' }}</span><span class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0628\u0627\u0644\u063A (\u0631.\u064A)</span></div></div>\r
  </div>\r
\r
  <div class="filter-tabs">\r
    <button class="filter-tab" [class.active]="filterStatus() === 'all'" (click)="filterStatus.set('all')">\u0627\u0644\u0643\u0644 ({{ items().length }})</button>\r
    <button class="filter-tab" [class.active]="filterStatus() === 'pending'" (click)="filterStatus.set('pending')">\u0645\u0639\u0644\u0642 ({{ pendingCount() }})</button>\r
    <button class="filter-tab" [class.active]="filterStatus() === 'in_progress'" (click)="filterStatus.set('in_progress')">\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</button>\r
    <button class="filter-tab" [class.active]="filterStatus() === 'resolved'" (click)="filterStatus.set('resolved')">\u062A\u0645 \u0627\u0644\u062D\u0644 ({{ resolvedCount() }})</button>\r
    <button class="filter-tab" [class.active]="filterStatus() === 'written_off'" (click)="filterStatus.set('written_off')">\u0645\u0634\u0637\u0648\u0628</button>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!filteredItems().length) {\r
    <div class="empty-state"><span class="material-icons-round">task_alt</span><p>\u0644\u0627 \u064A\u0648\u062C\u062F \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629</p></div>\r
  } @else {\r
    <table class="data-table">\r
      <thead><tr><th>#</th><th>\u0627\u0644\u0643\u0648\u062F</th><th>\u0627\u0644\u0634\u062E\u0635 / \u0627\u0644\u062C\u0647\u0629</th><th>\u0627\u0644\u0648\u0635\u0641</th><th>\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th></tr></thead>\r
      <tbody>\r
        @for (item of filteredItems(); track item.id; let i = $index) {\r
          <tr>\r
            <td>{{ i + 1 }}</td>\r
            <td><span class="code-badge">{{ item.accountCode || '-' }}</span></td>\r
            <td>\r
              <div class="person-cell">\r
                <div class="person-avatar"><span class="material-icons-round">person</span></div>\r
                <span class="person-name">{{ item.personOrEntity }}</span>\r
              </div>\r
            </td>\r
            <td class="desc-cell">{{ item.description || '-' }}</td>\r
            <td class="amount-cell">{{ item.estimatedAmount ? (item.estimatedAmount | number:'1.0-0') + ' \u0631.\u064A' : '-' }}</td>\r
            <td><span class="status-pill" [class]="getStatusClass(item.status)">{{ getStatusLabel(item.status) }}</span></td>\r
            <td class="date-cell">{{ item.createdAt | date:'yyyy/MM/dd' }}</td>\r
            <td>\r
              <button class="action-btn edit" (click)="openEdit(item)"><span class="material-icons-round">edit</span></button>\r
              <button class="action-btn delete" (click)="remove(item)"><span class="material-icons-round">delete</span></button>\r
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
          <div class="modal-title-row"><div class="modal-icon red"><span class="material-icons-round">pending_actions</span></div><div><h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0642' : '\u0625\u0636\u0627\u0641\u0629 \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0642' }}</h2><p>\u062A\u062A\u0628\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0645\u0639\u0644\u0642\u0629</p></div></div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u0634\u062E\u0635 / \u0627\u0644\u062C\u0647\u0629</label><input [(ngModel)]="form.personOrEntity" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0623\u0648 \u0627\u0644\u062C\u0647\u0629" /></div>\r
            <div class="form-group"><label>\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A</label><input type="number" [(ngModel)]="form.estimatedAmount" /></div>\r
          </div>\r
          <div class="form-group"><label>\u0627\u0644\u0648\u0635\u0641</label><textarea [(ngModel)]="form.description" rows="2" placeholder="\u0648\u0635\u0641 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0639\u0644\u0642..."></textarea></div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u062D\u0627\u0644\u0629</label>\r
              <select [(ngModel)]="form.status">\r
                <option value="pending">\u0645\u0639\u0644\u0642</option>\r
                <option value="in_progress">\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</option>\r
                <option value="resolved">\u062A\u0645 \u0627\u0644\u062D\u0644</option>\r
                <option value="written_off">\u0645\u0634\u0637\u0648\u0628</option>\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-group"><label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label><textarea [(ngModel)]="form.notes" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629..."></textarea></div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/pending-accounts/pending-accounts.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.code-badge {\n  font-family: "Courier New", monospace;\n  font-weight: 700;\n  color: #ef4444;\n  background: rgba(239, 68, 68, 0.1);\n  padding: 4px 8px;\n  border-radius: 6px;\n  font-size: 12px;\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.amber {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber .material-icons-round {\n  color: #f59e0b;\n}\n.summary-card.red {\n  background: rgba(239, 68, 68, 0.08);\n}\n.summary-card.red .material-icons-round {\n  color: #ef4444;\n}\n.summary-card.green {\n  background: var(--stat-2-bg);\n}\n.summary-card.green .material-icons-round {\n  color: var(--stat-2-color);\n}\n.summary-card.blue {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue .material-icons-round {\n  color: var(--stat-1-color);\n}\n.filter-tabs {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.filter-tab {\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab:hover {\n  background: var(--bg-card-hover);\n}\n.filter-tab.active {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.person-cell {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.person-avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  background: rgba(239, 68, 68, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.person-avatar .material-icons-round {\n  font-size: 16px;\n  color: #ef4444;\n}\n.person-name {\n  font-weight: 700;\n}\n.desc-cell {\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.amount-cell {\n  font-weight: 800;\n  color: var(--accent-red);\n  direction: ltr;\n  text-align: right;\n}\n.date-cell {\n  font-size: 13px;\n  color: var(--text-secondary);\n  direction: ltr;\n  text-align: right;\n}\n.status-pill {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n  white-space: nowrap;\n}\n.status-pill.pending {\n  background: rgba(245, 158, 11, 0.2);\n  color: #f59e0b;\n}\n.status-pill.progress {\n  background: rgba(59, 130, 246, 0.2);\n  color: #3b82f6;\n}\n.status-pill.resolved {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-pill.written-off {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n  text-decoration: line-through;\n}\n@media (max-width: 640px) {\n  .summary-row {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=pending-accounts.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PendingAccountsComponent, { className: "PendingAccountsComponent", filePath: "src/app/pages/pending-accounts/pending-accounts.ts", lineNumber: 19 });
})();
export {
  PendingAccountsComponent
};
//# sourceMappingURL=chunk-FULQFN6N.js.map
