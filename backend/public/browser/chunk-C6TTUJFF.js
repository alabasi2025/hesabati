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
  ɵɵproperty,
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

// src/app/pages/employees/employees.ts
var _forTrack0 = ($index, $item) => $item.id;
function EmployeesComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function EmployeesComponent_For_34_Template_button_click_0_listener() {
      const s_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.filterStation.set("" + s_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.filterStation() === "" + s_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r2.name);
  }
}
function EmployeesComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 16);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function EmployeesComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 2);
    \u0275\u0275text(2, "person_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u064A\u0646");
    \u0275\u0275elementEnd()();
  }
}
function EmployeesComponent_Conditional_37_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "div", 17)(5, "div", 18)(6, "span", 2);
    \u0275\u0275text(7, "person");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 19);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "td")(11, "span", 20);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 21);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td")(23, "span", 22);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "td")(26, "button", 23);
    \u0275\u0275listener("click", function EmployeesComponent_Conditional_37_For_23_Template_button_click_26_listener() {
      const emp_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit(emp_r5));
    });
    \u0275\u0275elementStart(27, "span", 2);
    \u0275\u0275text(28, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "button", 24);
    \u0275\u0275listener("click", function EmployeesComponent_Conditional_37_For_23_Template_button_click_29_listener() {
      const emp_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.remove(emp_r5.id));
    });
    \u0275\u0275elementStart(30, "span", 2);
    \u0275\u0275text(31, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const emp_r5 = ctx.$implicit;
    const \u0275$index_112_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_112_r6 + 1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(emp_r5.fullName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(emp_r5.code || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(emp_r5.sequenceNumber || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getJobTitleName(emp_r5.jobTitleId) || emp_r5.jobTitle || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(emp_r5.stationName || "\u0627\u0644\u0625\u062F\u0627\u0631\u0629");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(21, 10, emp_r5.salary, "1.0-0"), " \u0631.\u064A");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r2.getStatusClass(emp_r5.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getStatusLabel(emp_r5.status));
  }
}
function EmployeesComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 14)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u0627\u0633\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0627\u0644\u0643\u0648\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0627\u0644\u062A\u0633\u0644\u0633\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u0631\u0627\u062A\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20, "\u0625\u062C\u0631\u0627\u0621\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275repeaterCreate(22, EmployeesComponent_Conditional_37_For_23_Template, 32, 13, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(22);
    \u0275\u0275repeater(ctx_r2.filteredEmployees());
  }
}
function EmployeesComponent_Conditional_38_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const j_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", j_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(j_r8.name);
  }
}
function EmployeesComponent_Conditional_38_For_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    \u0275\u0275property("ngValue", s_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r9.name);
  }
}
function EmployeesComponent_Conditional_38_For_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r10 = ctx.$implicit;
    \u0275\u0275property("ngValue", d_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r10.name);
  }
}
function EmployeesComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275listener("click", function EmployeesComponent_Conditional_38_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 26);
    \u0275\u0275listener("click", function EmployeesComponent_Conditional_38_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 27)(3, "div", 28)(4, "div", 29)(5, "span", 2);
    \u0275\u0275text(6, "person");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h2");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 30);
    \u0275\u0275listener("click", function EmployeesComponent_Conditional_38_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275elementStart(10, "span", 2);
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 31)(13, "div", 32)(14, "div", 33)(15, "label");
    \u0275\u0275text(16, "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function EmployeesComponent_Conditional_38_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.fullName, $event) || (ctx_r2.form.fullName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 33)(19, "label");
    \u0275\u0275text(20, "\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "select", 35);
    \u0275\u0275twoWayListener("ngModelChange", function EmployeesComponent_Conditional_38_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.jobTitleId, $event) || (ctx_r2.form.jobTitleId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(22, "option", 36);
    \u0275\u0275text(23, "\u0628\u062F\u0648\u0646 \u0645\u0633\u0645\u0649");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(24, EmployeesComponent_Conditional_38_For_25_Template, 2, 2, "option", 36, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 32)(27, "div", 33)(28, "label");
    \u0275\u0275text(29, "\u0627\u0644\u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "select", 37);
    \u0275\u0275twoWayListener("ngModelChange", function EmployeesComponent_Conditional_38_Template_select_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.stationId, $event) || (ctx_r2.form.stationId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(31, "option", 36);
    \u0275\u0275text(32, "\u0627\u0644\u0625\u062F\u0627\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(33, EmployeesComponent_Conditional_38_For_34_Template, 2, 2, "option", 36, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 33)(36, "label");
    \u0275\u0275text(37, "\u0627\u0644\u0642\u0633\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "select", 38);
    \u0275\u0275twoWayListener("ngModelChange", function EmployeesComponent_Conditional_38_Template_select_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.departmentId, $event) || (ctx_r2.form.departmentId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(39, "option", 36);
    \u0275\u0275text(40, "\u0628\u062F\u0648\u0646 \u0642\u0633\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(41, EmployeesComponent_Conditional_38_For_42_Template, 2, 2, "option", 36, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "div", 32)(44, "div", 33)(45, "label");
    \u0275\u0275text(46, "\u0627\u0644\u0631\u0627\u062A\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function EmployeesComponent_Conditional_38_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.salary, $event) || (ctx_r2.form.salary = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 33)(49, "label");
    \u0275\u0275text(50, "\u0627\u0644\u0647\u0627\u062A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "input", 40);
    \u0275\u0275twoWayListener("ngModelChange", function EmployeesComponent_Conditional_38_Template_input_ngModelChange_51_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.phone, $event) || (ctx_r2.form.phone = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "div", 33)(53, "label");
    \u0275\u0275text(54, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "select", 41);
    \u0275\u0275twoWayListener("ngModelChange", function EmployeesComponent_Conditional_38_Template_select_ngModelChange_55_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.status, $event) || (ctx_r2.form.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(56, "option", 42);
    \u0275\u0275text(57, "\u0646\u0634\u0637");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "option", 43);
    \u0275\u0275text(59, "\u063A\u064A\u0631 \u0646\u0634\u0637");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "option", 44);
    \u0275\u0275text(61, "\u0645\u0648\u0642\u0648\u0641");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(62, "div", 33)(63, "label");
    \u0275\u0275text(64, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "textarea", 45);
    \u0275\u0275twoWayListener("ngModelChange", function EmployeesComponent_Conditional_38_Template_textarea_ngModelChange_65_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.notes, $event) || (ctx_r2.form.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(66, "div", 46)(67, "button", 47);
    \u0275\u0275listener("click", function EmployeesComponent_Conditional_38_Template_button_click_67_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275text(68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "button", 48);
    \u0275\u0275listener("click", function EmployeesComponent_Conditional_38_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showForm.set(false));
    });
    \u0275\u0275text(70, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u0645\u0648\u0638\u0641" : "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.fullName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.jobTitleId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.jobTitles());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.stationId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.stations());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.departmentId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.departments());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.salary);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.phone);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.status);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.notes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629");
  }
}
var EmployeesComponent = class _EmployeesComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : (
    /* istanbul ignore next */
    []
  ));
  stations = signal([], ...ngDevMode ? [{ debugName: "stations" }] : (
    /* istanbul ignore next */
    []
  ));
  departments = signal([], ...ngDevMode ? [{ debugName: "departments" }] : (
    /* istanbul ignore next */
    []
  ));
  jobTitles = signal([], ...ngDevMode ? [{ debugName: "jobTitles" }] : (
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
  filterStation = signal("all", ...ngDevMode ? [{ debugName: "filterStation" }] : (
    /* istanbul ignore next */
    []
  ));
  form = { fullName: "", departmentId: null, jobTitleId: null, jobTitle: "", stationId: null, department: "", salary: 0, salaryCurrency: "YER", phone: "", status: "active", notes: "" };
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const [emps, sts, deps, titles] = await Promise.all([
        this.api.getEmployees(this.bizId),
        this.api.getStations(this.bizId),
        this.api.getDepartments(this.bizId).catch(() => []),
        this.api.getJobTitles(this.bizId).catch(() => [])
      ]);
      this.employees.set(emps);
      this.stations.set(sts);
      this.departments.set(deps);
      this.jobTitles.set(titles);
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646");
    }
    this.loading.set(false);
  }
  filteredEmployees() {
    const f = this.filterStation();
    if (f === "all")
      return this.employees();
    return this.employees().filter((e) => String(e.stationId) === f || !e.stationId && f === "admin");
  }
  totalSalaries() {
    return this.filteredEmployees().reduce((s, e) => s + Number(e.salary || 0), 0);
  }
  openAdd() {
    this.form = { fullName: "", departmentId: null, jobTitleId: null, jobTitle: "", stationId: null, department: "", salary: 0, salaryCurrency: "YER", phone: "", status: "active", notes: "" };
    this.editingId.set(null);
    this.showForm.set(true);
  }
  openEdit(emp) {
    this.form = {
      fullName: emp.fullName,
      departmentId: emp.departmentId ?? null,
      jobTitleId: emp.jobTitleId ?? null,
      jobTitle: emp.jobTitle || "",
      stationId: emp.stationId,
      department: emp.department || "",
      salary: Number(emp.salary),
      salaryCurrency: emp.salaryCurrency || "YER",
      phone: emp.phone || "",
      status: emp.status,
      notes: emp.notes || ""
    };
    this.editingId.set(emp.id);
    this.showForm.set(true);
  }
  async save() {
    try {
      const data = __spreadProps(__spreadValues({}, this.form), {
        department: this.getDepartmentName(this.form.departmentId) || this.form.department || null,
        jobTitle: this.getJobTitleName(this.form.jobTitleId) || this.form.jobTitle || null,
        salary: String(this.form.salary)
      });
      if (this.editingId())
        await this.api.updateEmployee(this.editingId(), data);
      else
        await this.api.createEmployee(this.bizId, data);
      this.showForm.set(false);
      this.toast.success(this.editingId() ? "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D" : "\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D");
      await this.load();
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641");
    }
  }
  async remove(id) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0638\u0641\u061F", type: "danger" });
    if (confirmed) {
      try {
        await this.api.deleteEmployee(id);
        this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D");
        await this.load();
      } catch (e) {
        console.error(e);
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u0648\u0638\u0641");
      }
    }
  }
  getStatusLabel(s) {
    return s === "active" ? "\u0646\u0634\u0637" : s === "suspended" ? "\u0645\u0648\u0642\u0648\u0641" : "\u063A\u064A\u0631 \u0646\u0634\u0637";
  }
  getStatusClass(s) {
    return s === "active" ? "active" : "inactive";
  }
  getDepartmentName(id) {
    if (!id)
      return "";
    return this.departments().find((d) => d.id === id)?.name || "";
  }
  getJobTitleName(id) {
    if (!id)
      return "";
    return this.jobTitles().find((j) => j.id === id)?.name || "";
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275EmployeesComponent_BaseFactory;
    return function EmployeesComponent_Factory(__ngFactoryType__) {
      return (\u0275EmployeesComponent_BaseFactory || (\u0275EmployeesComponent_BaseFactory = \u0275\u0275getInheritedFactory(_EmployeesComponent)))(__ngFactoryType__ || _EmployeesComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmployeesComponent, selectors: [["app-employees"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 39, vars: 11, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "add-btn", 3, "click"], [1, "summary-row"], [1, "summary-card", "blue"], [1, "num"], [1, "lbl"], [1, "summary-card", "green"], [1, "filter-tabs"], [1, "filter-tab", 3, "click"], [1, "filter-tab", 3, "active"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], [1, "modal-overlay"], [1, "material-icons-round", "spin"], [1, "emp-cell"], [1, "emp-avatar-sm"], [1, "emp-name-cell"], [1, "code-badge"], [1, "salary-cell"], [1, "status-badge"], [1, "action-btn", "edit", 3, "click"], [1, "action-btn", "delete", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "green"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], ["title", "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644", "placeholder", "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644", 3, "ngModelChange", "ngModel"], ["title", "\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["title", "\u0627\u0644\u0645\u062D\u0637\u0629", 3, "ngModelChange", "ngModel"], ["title", "\u0627\u0644\u0642\u0633\u0645", 3, "ngModelChange", "ngModel"], ["type", "number", "title", "\u0627\u0644\u0631\u0627\u062A\u0628", "placeholder", "\u0627\u0644\u0631\u0627\u062A\u0628", 3, "ngModelChange", "ngModel"], ["title", "\u0627\u0644\u0647\u0627\u062A\u0641", "placeholder", "\u0627\u0644\u0647\u0627\u062A\u0641", 3, "ngModelChange", "ngModel"], ["title", "\u0627\u0644\u062D\u0627\u0644\u0629", 3, "ngModelChange", "ngModel"], ["value", "active"], ["value", "inactive"], ["value", "suspended"], ["title", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A", "rows", "2", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"]], template: function EmployeesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "groups");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0631\u0648\u0627\u062A\u0628");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function EmployeesComponent_Template_button_click_6_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "person_add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "span", 2);
      \u0275\u0275text(13, "groups");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div")(15, "span", 6);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 7);
      \u0275\u0275text(18, "\u0645\u0648\u0638\u0641");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 8)(20, "span", 2);
      \u0275\u0275text(21, "payments");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div")(23, "span", 6);
      \u0275\u0275text(24);
      \u0275\u0275pipe(25, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span", 7);
      \u0275\u0275text(27, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u0648\u0627\u062A\u0628 (\u0631.\u064A)");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(28, "div", 9)(29, "button", 10);
      \u0275\u0275listener("click", function EmployeesComponent_Template_button_click_29_listener() {
        return ctx.filterStation.set("all");
      });
      \u0275\u0275text(30, "\u0627\u0644\u0643\u0644");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 10);
      \u0275\u0275listener("click", function EmployeesComponent_Template_button_click_31_listener() {
        return ctx.filterStation.set("admin");
      });
      \u0275\u0275text(32, "\u0627\u0644\u0625\u062F\u0627\u0631\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(33, EmployeesComponent_For_34_Template, 2, 3, "button", 11, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(35, EmployeesComponent_Conditional_35_Template, 5, 0, "div", 12)(36, EmployeesComponent_Conditional_36_Template, 5, 0, "div", 13)(37, EmployeesComponent_Conditional_37_Template, 24, 0, "table", 14);
      \u0275\u0275conditionalCreate(38, EmployeesComponent_Conditional_38_Template, 71, 13, "div", 15);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate(ctx.filteredEmployees().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 8, ctx.totalSalaries(), "1.0-0"));
      \u0275\u0275advance(5);
      \u0275\u0275classProp("active", ctx.filterStation() === "all");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterStation() === "admin");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.stations());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 35 : !ctx.filteredEmployees().length ? 36 : 37);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 38 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.code-badge[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-weight: 700;\n  color: #3b82f6;\n  background: rgba(59, 130, 246, 0.1);\n  padding: 4px 8px;\n  border-radius: 6px;\n  font-size: 12px;\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.blue[_ngcontent-%COMP%] {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-1-color);\n}\n.summary-card.green[_ngcontent-%COMP%] {\n  background: var(--stat-2-bg);\n}\n.summary-card.green[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: var(--stat-2-color);\n}\n.filter-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.filter-tab[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n}\n.filter-tab.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.emp-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.emp-avatar-sm[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  background: var(--stat-1-bg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.emp-avatar-sm[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--stat-1-color);\n}\n.emp-name-cell[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.salary-cell[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: var(--accent-green);\n  direction: ltr;\n  text-align: right;\n}\n/*# sourceMappingURL=employees.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmployeesComponent, [{
    type: Component,
    args: [{ selector: "app-employees", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">groups</span> \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0631\u0648\u0627\u062A\u0628</h2>\r
    <button class="add-btn" (click)="openAdd()"><span class="material-icons-round">person_add</span> \u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641</button>\r
  </div>\r
\r
  <div class="summary-row">\r
    <div class="summary-card blue"><span class="material-icons-round">groups</span><div><span class="num">{{ filteredEmployees().length }}</span><span class="lbl">\u0645\u0648\u0638\u0641</span></div></div>\r
    <div class="summary-card green"><span class="material-icons-round">payments</span><div><span class="num">{{ totalSalaries() | number:'1.0-0' }}</span><span class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u0648\u0627\u062A\u0628 (\u0631.\u064A)</span></div></div>\r
  </div>\r
\r
  <div class="filter-tabs">\r
    <button class="filter-tab" [class.active]="filterStation() === 'all'" (click)="filterStation.set('all')">\u0627\u0644\u0643\u0644</button>\r
    <button class="filter-tab" [class.active]="filterStation() === 'admin'" (click)="filterStation.set('admin')">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</button>\r
    @for (s of stations(); track s.id) {\r
      <button class="filter-tab" [class.active]="filterStation() === '' + s.id" (click)="filterStation.set('' + s.id)">{{ s.name }}</button>\r
    }\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!filteredEmployees().length) {\r
    <div class="empty-state"><span class="material-icons-round">person_off</span><p>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u064A\u0646</p></div>\r
  } @else {\r
    <table class="data-table">\r
      <thead><tr><th>#</th><th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u0643\u0648\u062F</th><th>\u0627\u0644\u062A\u0633\u0644\u0633\u0644</th><th>\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</th><th>\u0627\u0644\u0645\u062D\u0637\u0629</th><th>\u0627\u0644\u0631\u0627\u062A\u0628</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th></tr></thead>\r
      <tbody>\r
        @for (emp of filteredEmployees(); track emp.id; let i = $index) {\r
          <tr>\r
            <td>{{ i + 1 }}</td>\r
            <td><div class="emp-cell"><div class="emp-avatar-sm"><span class="material-icons-round">person</span></div><span class="emp-name-cell">{{ emp.fullName }}</span></div></td>\r
            <td><span class="code-badge">{{ emp.code || '-' }}</span></td>\r
            <td>{{ emp.sequenceNumber || '-' }}</td>\r
            <td>{{ getJobTitleName(emp.jobTitleId) || emp.jobTitle || '-' }}</td>\r
            <td>{{ emp.stationName || '\u0627\u0644\u0625\u062F\u0627\u0631\u0629' }}</td>\r
            <td class="salary-cell">{{ emp.salary | number:'1.0-0' }} \u0631.\u064A</td>\r
            <td><span class="status-badge" [class]="getStatusClass(emp.status)">{{ getStatusLabel(emp.status) }}</span></td>\r
            <td>\r
              <button class="action-btn edit" (click)="openEdit(emp)"><span class="material-icons-round">edit</span></button>\r
              <button class="action-btn delete" (click)="remove(emp.id)"><span class="material-icons-round">delete</span></button>\r
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
          <div class="modal-title-row"><div class="modal-icon green"><span class="material-icons-round">person</span></div><h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u0645\u0648\u0638\u0641' : '\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F' }}</h2></div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644</label><input [(ngModel)]="form.fullName" title="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644" placeholder="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644" /></div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A</label>\r
              <select [(ngModel)]="form.jobTitleId" title="\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A">\r
                <option [ngValue]="null">\u0628\u062F\u0648\u0646 \u0645\u0633\u0645\u0649</option>\r
                @for (j of jobTitles(); track j.id) { <option [ngValue]="j.id">{{ j.name }}</option> }\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u0645\u062D\u0637\u0629</label>\r
              <select [(ngModel)]="form.stationId" title="\u0627\u0644\u0645\u062D\u0637\u0629">\r
                <option [ngValue]="null">\u0627\u0644\u0625\u062F\u0627\u0631\u0629</option>\r
                @for (s of stations(); track s.id) { <option [ngValue]="s.id">{{ s.name }}</option> }\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0642\u0633\u0645</label>\r
              <select [(ngModel)]="form.departmentId" title="\u0627\u0644\u0642\u0633\u0645">\r
                <option [ngValue]="null">\u0628\u062F\u0648\u0646 \u0642\u0633\u0645</option>\r
                @for (d of departments(); track d.id) { <option [ngValue]="d.id">{{ d.name }}</option> }\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group"><label>\u0627\u0644\u0631\u0627\u062A\u0628</label><input type="number" [(ngModel)]="form.salary" title="\u0627\u0644\u0631\u0627\u062A\u0628" placeholder="\u0627\u0644\u0631\u0627\u062A\u0628" /></div>\r
            <div class="form-group"><label>\u0627\u0644\u0647\u0627\u062A\u0641</label><input [(ngModel)]="form.phone" title="\u0627\u0644\u0647\u0627\u062A\u0641" placeholder="\u0627\u0644\u0647\u0627\u062A\u0641" /></div>\r
          </div>\r
          <div class="form-group"><label>\u0627\u0644\u062D\u0627\u0644\u0629</label>\r
            <select [(ngModel)]="form.status" title="\u0627\u0644\u062D\u0627\u0644\u0629"><option value="active">\u0646\u0634\u0637</option><option value="inactive">\u063A\u064A\u0631 \u0646\u0634\u0637</option><option value="suspended">\u0645\u0648\u0642\u0648\u0641</option></select>\r
          </div>\r
          <div class="form-group"><label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label><textarea [(ngModel)]="form.notes" title="\u0645\u0644\u0627\u062D\u0638\u0627\u062A" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A"></textarea></div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/employees/employees.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.code-badge {\n  font-family: "Courier New", monospace;\n  font-weight: 700;\n  color: #3b82f6;\n  background: rgba(59, 130, 246, 0.1);\n  padding: 4px 8px;\n  border-radius: 6px;\n  font-size: 12px;\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.blue {\n  background: var(--stat-1-bg);\n}\n.summary-card.blue .material-icons-round {\n  color: var(--stat-1-color);\n}\n.summary-card.green {\n  background: var(--stat-2-bg);\n}\n.summary-card.green .material-icons-round {\n  color: var(--stat-2-color);\n}\n.filter-tabs {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.filter-tab {\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n}\n.filter-tab.active {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.emp-cell {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.emp-avatar-sm {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  background: var(--stat-1-bg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.emp-avatar-sm .material-icons-round {\n  font-size: 16px;\n  color: var(--stat-1-color);\n}\n.emp-name-cell {\n  font-weight: 700;\n}\n.salary-cell {\n  font-weight: 800;\n  color: var(--accent-green);\n  direction: ltr;\n  text-align: right;\n}\n/*# sourceMappingURL=employees.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmployeesComponent, { className: "EmployeesComponent", filePath: "src/app/pages/employees/employees.ts", lineNumber: 18 });
})();
export {
  EmployeesComponent
};
//# sourceMappingURL=chunk-C6TTUJFF.js.map
