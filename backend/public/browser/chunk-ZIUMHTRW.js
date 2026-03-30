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
  ɵɵrepeaterTrackByIdentity,
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

// src/app/pages/warehouse/warehouse.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function WarehouseComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 2);
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "span", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 9);
    \u0275\u0275text(7, "\u0645\u062E\u0627\u0632\u0646 \u0641\u0631\u0639\u064A\u0629");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.subCount());
  }
}
function WarehouseComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 2);
    \u0275\u0275text(2, "category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "span", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 9);
    \u0275\u0275text(7, "\u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.warehouseTypes().length);
  }
}
function WarehouseComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_49_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      ctx_r0.filterType.set("sub");
      return \u0275\u0275resetView(ctx_r0.filterSubType.set("all"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.filterType() === "sub");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u0641\u0631\u0639\u064A (", ctx_r0.subCount(), ") ");
  }
}
function WarehouseComponent_Conditional_50_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_50_For_8_Template_button_click_0_listener() {
      const sf_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.filterSubType.set(sf_r5.key));
    });
    \u0275\u0275elementStart(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sf_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("--chip-color", sf_r5.color);
    \u0275\u0275classProp("active", ctx_r0.filterSubType() === sf_r5.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sf_r5.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", sf_r5.label, " (", sf_r5.count, ") ");
  }
}
function WarehouseComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 22)(2, "span", 2);
    \u0275\u0275text(3, "category");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u0644\u062A\u0635\u0646\u064A\u0641:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 23);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_50_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.filterSubType.set("all"));
    });
    \u0275\u0275text(6, "\u0627\u0644\u0643\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, WarehouseComponent_Conditional_50_For_8_Template, 4, 7, "button", 24, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r0.filterSubType() === "all");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.subTypeFilters());
  }
}
function WarehouseComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 26);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function WarehouseComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 2);
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u062E\u0627\u0632\u0646");
    \u0275\u0275elementEnd()();
  }
}
function WarehouseComponent_Conditional_53_For_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r7.code);
  }
}
function WarehouseComponent_Conditional_53_For_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("#", w_r7.sequenceNumber);
  }
}
function WarehouseComponent_Conditional_53_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getSubTypeName(w_r7.subType));
  }
}
function WarehouseComponent_Conditional_53_For_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 2);
    \u0275\u0275text(2, "local_gas_station");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.getStationName(w_r7.stationId));
  }
}
function WarehouseComponent_Conditional_53_For_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 2);
    \u0275\u0275text(2, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", w_r7.responsiblePerson);
  }
}
function WarehouseComponent_Conditional_53_For_2_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "span", 2);
    \u0275\u0275text(2, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", w_r7.location);
  }
}
function WarehouseComponent_Conditional_53_For_2_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 2);
    \u0275\u0275text(2, "notes");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", w_r7.notes);
  }
}
function WarehouseComponent_Conditional_53_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "div", 30)(3, "span", 2);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 31)(6, "button", 32);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_53_For_2_Template_button_click_6_listener() {
      const w_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openEdit(w_r7));
    });
    \u0275\u0275elementStart(7, "span", 2);
    \u0275\u0275text(8, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 33);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_53_For_2_Template_button_click_9_listener() {
      const w_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.remove(w_r7));
    });
    \u0275\u0275elementStart(10, "span", 2);
    \u0275\u0275text(11, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "h3", 34);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 35)(15, "span", 36);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, WarehouseComponent_Conditional_53_For_2_Conditional_17_Template, 2, 1, "span", 37);
    \u0275\u0275conditionalCreate(18, WarehouseComponent_Conditional_53_For_2_Conditional_18_Template, 2, 1, "span", 38);
    \u0275\u0275conditionalCreate(19, WarehouseComponent_Conditional_53_For_2_Conditional_19_Template, 2, 1, "span", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 40);
    \u0275\u0275conditionalCreate(21, WarehouseComponent_Conditional_53_For_2_Conditional_21_Template, 4, 1, "div", 41);
    \u0275\u0275conditionalCreate(22, WarehouseComponent_Conditional_53_For_2_Conditional_22_Template, 4, 1, "div", 41);
    \u0275\u0275conditionalCreate(23, WarehouseComponent_Conditional_53_For_2_Conditional_23_Template, 4, 1, "div", 41);
    \u0275\u0275conditionalCreate(24, WarehouseComponent_Conditional_53_For_2_Conditional_24_Template, 4, 1, "div", 42);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const w_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(w_r7.warehouseType);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", "linear-gradient(135deg, " + ctx_r0.getTypeColor(w_r7.warehouseType) + ", " + ctx_r0.getTypeColor(w_r7.warehouseType) + "cc)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getTypeIcon(w_r7.warehouseType));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(w_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getTypeClass(w_r7.warehouseType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getTypeLabel(w_r7.warehouseType));
    \u0275\u0275advance();
    \u0275\u0275conditional(w_r7.code ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(w_r7.sequenceNumber ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(w_r7.subType ? 19 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(w_r7.stationId ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(w_r7.responsiblePerson ? 22 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(w_r7.location ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(w_r7.notes ? 24 : -1);
  }
}
function WarehouseComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275repeaterCreate(1, WarehouseComponent_Conditional_53_For_2_Template, 25, 16, "div", 27, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.filteredWarehouses());
  }
}
function WarehouseComponent_Conditional_54_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r9 = ctx.$implicit;
    \u0275\u0275property("value", t_r9.subTypeKey);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r9.name);
  }
}
function WarehouseComponent_Conditional_54_For_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r10 = ctx.$implicit;
    \u0275\u0275property("ngValue", s_r10.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r10.name);
  }
}
function WarehouseComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_54_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 44);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_54_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 45)(3, "div", 46)(4, "div", 47)(5, "span", 2);
    \u0275\u0275text(6, "warehouse");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0646 \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 48);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_54_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 49)(16, "div", 50)(17, "div", 51)(18, "label");
    \u0275\u0275text(19, "\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0632\u0646 ");
    \u0275\u0275elementStart(20, "span", 52);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseComponent_Conditional_54_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.name, $event) || (ctx_r0.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 51)(24, "label");
    \u0275\u0275text(25, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "select", 54);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseComponent_Conditional_54_Template_select_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.warehouseType, $event) || (ctx_r0.form.warehouseType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(27, "option", 55);
    \u0275\u0275text(28, "\u0631\u0626\u064A\u0633\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 56);
    \u0275\u0275text(30, "\u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 57);
    \u0275\u0275text(32, "\u0641\u0631\u0639\u064A");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "div", 50)(34, "div", 51)(35, "label");
    \u0275\u0275text(36, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0641\u0631\u0639\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 54);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseComponent_Conditional_54_Template_select_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.subType, $event) || (ctx_r0.form.subType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(38, "option", 58);
    \u0275\u0275text(39, "\u0628\u062F\u0648\u0646 \u062A\u0635\u0646\u064A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(40, WarehouseComponent_Conditional_54_For_41_Template, 2, 2, "option", 59, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 51)(43, "label");
    \u0275\u0275text(44, "\u0627\u0644\u0645\u062D\u0637\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "select", 54);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseComponent_Conditional_54_Template_select_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.stationId, $event) || (ctx_r0.form.stationId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(46, "option", 60);
    \u0275\u0275text(47, "\u0628\u062F\u0648\u0646 \u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(48, WarehouseComponent_Conditional_54_For_49_Template, 2, 2, "option", 60, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(50, "div", 50)(51, "div", 51)(52, "label");
    \u0275\u0275text(53, "\u0627\u0644\u0645\u0633\u0624\u0648\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "input", 61);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseComponent_Conditional_54_Template_input_ngModelChange_54_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.responsiblePerson, $event) || (ctx_r0.form.responsiblePerson = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 51)(56, "label");
    \u0275\u0275text(57, "\u0627\u0644\u0645\u0648\u0642\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseComponent_Conditional_54_Template_input_ngModelChange_58_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.location, $event) || (ctx_r0.form.location = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 51)(60, "label");
    \u0275\u0275text(61, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "textarea", 63);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseComponent_Conditional_54_Template_textarea_ngModelChange_62_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.notes, $event) || (ctx_r0.form.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(63, "div", 64)(64, "button", 65);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_54_Template_button_click_64_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.save());
    });
    \u0275\u0275text(65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "button", 66);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_54_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275text(67, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.editingId() ? "\u062A\u0639\u062F\u064A\u0644 \u0645\u062E\u0632\u0646" : "\u0625\u0636\u0627\u0641\u0629 \u0645\u062E\u0632\u0646 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.warehouseType);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.subType);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.warehouseTypes());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.stationId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.stations());
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.responsiblePerson);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.location);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.notes);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.editingId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062E\u0632\u0646");
  }
}
function WarehouseComponent_Conditional_55_Conditional_16_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 78)(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 80)(4, "span", 81);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 82);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 83)(9, "button", 32);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_55_Conditional_16_For_5_Template_button_click_9_listener() {
      const t_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openEditType(t_r13));
    });
    \u0275\u0275elementStart(10, "span", 2);
    \u0275\u0275text(11, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 33);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_55_Conditional_16_For_5_Template_button_click_12_listener() {
      const t_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.removeType(t_r13));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const t_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", t_r13.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r13.icon || "warehouse");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r13.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r13.subTypeKey);
  }
}
function WarehouseComponent_Conditional_55_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "h4");
    \u0275\u0275text(2, "\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 77);
    \u0275\u0275repeaterCreate(4, WarehouseComponent_Conditional_55_Conditional_16_For_5_Template, 15, 5, "div", 78, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "hr", 79);
    \u0275\u0275elementStart(7, "h4");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.warehouseTypes());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.editingTypeId() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0635\u0646\u064A\u0641" : "\u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F");
  }
}
function WarehouseComponent_Conditional_55_For_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_55_For_48_Template_button_click_0_listener() {
      const ic_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.typeForm.icon = ic_r15);
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ic_r15 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("color", ctx_r0.typeForm.icon === ic_r15 ? ctx_r0.typeForm.color : "");
    \u0275\u0275classProp("selected", ctx_r0.typeForm.icon === ic_r15);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ic_r15);
  }
}
function WarehouseComponent_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_55_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showTypeForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 44);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_55_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 45)(3, "div", 46)(4, "div", 67)(5, "span", 2);
    \u0275\u0275text(6, "category");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u062A\u0633\u0627\u0639\u062F \u0641\u064A \u062A\u0646\u0638\u064A\u0645 \u0648\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0632\u0646");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 48);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_55_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showTypeForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 2);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 49);
    \u0275\u0275conditionalCreate(16, WarehouseComponent_Conditional_55_Conditional_16_Template, 9, 1, "div", 68);
    \u0275\u0275elementStart(17, "div", 50)(18, "div", 51)(19, "label");
    \u0275\u0275text(20, "\u0627\u0633\u0645 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 ");
    \u0275\u0275elementStart(21, "span", 52);
    \u0275\u0275text(22, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "input", 69);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseComponent_Conditional_55_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.typeForm.name, $event) || (ctx_r0.typeForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 51)(25, "label");
    \u0275\u0275text(26, "\u0627\u0644\u0645\u0641\u062A\u0627\u062D ");
    \u0275\u0275elementStart(27, "span", 52);
    \u0275\u0275text(28, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseComponent_Conditional_55_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.typeForm.subTypeKey, $event) || (ctx_r0.typeForm.subTypeKey = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 51)(31, "label");
    \u0275\u0275text(32, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 71);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseComponent_Conditional_55_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.typeForm.description, $event) || (ctx_r0.typeForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 50)(35, "div", 51)(36, "label");
    \u0275\u0275text(37, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 72)(39, "input", 73);
    \u0275\u0275twoWayListener("ngModelChange", function WarehouseComponent_Conditional_55_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.typeForm.color, $event) || (ctx_r0.typeForm.color = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "span", 74);
    \u0275\u0275elementStart(41, "span");
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(43, "div", 51)(44, "label");
    \u0275\u0275text(45, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 75);
    \u0275\u0275repeaterCreate(47, WarehouseComponent_Conditional_55_For_48_Template, 3, 5, "button", 76, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(49, "div", 64)(50, "button", 65);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_55_Template_button_click_50_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveType());
    });
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "button", 66);
    \u0275\u0275listener("click", function WarehouseComponent_Conditional_55_Template_button_click_52_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showTypeForm.set(false));
    });
    \u0275\u0275text(53, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.editingTypeId() ? "\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0646\u064A\u0641" : "\u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(!ctx_r0.editingTypeId() && ctx_r0.warehouseTypes().length > 0 ? 16 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.typeForm.name);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.typeForm.subTypeKey);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.typeForm.description);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.typeForm.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r0.typeForm.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.typeForm.color);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.availableIcons);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.editingTypeId() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0635\u0646\u064A\u0641");
  }
}
var WarehouseComponent = class _WarehouseComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : (
    /* istanbul ignore next */
    []
  ));
  stations = signal([], ...ngDevMode ? [{ debugName: "stations" }] : (
    /* istanbul ignore next */
    []
  ));
  warehouseTypes = signal([], ...ngDevMode ? [{ debugName: "warehouseTypes" }] : (
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
  filterType = signal("all", ...ngDevMode ? [{ debugName: "filterType" }] : (
    /* istanbul ignore next */
    []
  ));
  filterSubType = signal("all", ...ngDevMode ? [{ debugName: "filterSubType" }] : (
    /* istanbul ignore next */
    []
  ));
  // نموذج إضافة/تعديل مخزن
  form = {
    name: "",
    warehouseType: "main",
    subType: "",
    stationId: null,
    responsiblePerson: "",
    location: "",
    notes: ""
  };
  // إدارة تصنيفات المخازن
  showTypeForm = signal(false, ...ngDevMode ? [{ debugName: "showTypeForm" }] : (
    /* istanbul ignore next */
    []
  ));
  editingTypeId = signal(null, ...ngDevMode ? [{ debugName: "editingTypeId" }] : (
    /* istanbul ignore next */
    []
  ));
  typeForm = {
    name: "",
    subTypeKey: "",
    description: "",
    icon: "warehouse",
    color: "#4CAF50"
  };
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const [wh, sts, types] = await Promise.allSettled([
        this.api.getWarehouses(this.bizId),
        this.api.getStations(this.bizId),
        this.api.getWarehouseTypes(this.bizId)
      ]);
      this.warehouses.set(wh.status === "fulfilled" ? wh.value : []);
      this.stations.set(sts.status === "fulfilled" ? sts.value : []);
      this.warehouseTypes.set(types.status === "fulfilled" ? types.value : []);
    } catch (e) {
      console.error(e);
    }
    this.loading.set(false);
  }
  // ===== الفلترة =====
  filteredWarehouses() {
    const f = this.filterType();
    const sf = this.filterSubType();
    let list = this.warehouses().filter((w) => w.warehouseType !== "custody");
    if (f !== "all")
      list = list.filter((w) => w.warehouseType === f);
    if (sf !== "all")
      list = list.filter((w) => (w.subType || "") === sf);
    return list;
  }
  mainCount() {
    return this.warehouses().filter((w) => w.warehouseType === "main").length;
  }
  stationCount() {
    return this.warehouses().filter((w) => w.warehouseType === "station").length;
  }
  subCount() {
    return this.warehouses().filter((w) => w.warehouseType === "sub").length;
  }
  // الفلاتر الفرعية الديناميكية حسب التصنيف
  subTypeFilters = computed(() => {
    const whs = this.warehouses();
    const types = this.warehouseTypes();
    const subTypes = [...new Set(whs.map((w) => w.subType).filter(Boolean))];
    return subTypes.map((st) => {
      const typeInfo = types.find((t) => t.subTypeKey === st);
      return {
        key: st,
        label: typeInfo?.name || st,
        icon: typeInfo?.icon || "label",
        color: typeInfo?.color || "#64748b",
        count: whs.filter((w) => w.subType === st).length
      };
    });
  }, ...ngDevMode ? [{ debugName: "subTypeFilters" }] : (
    /* istanbul ignore next */
    []
  ));
  getStationName(stationId) {
    if (!stationId)
      return "-";
    const st = this.stations().find((s) => s.id === stationId);
    return st ? st.name : "-";
  }
  getSubTypeName(subType) {
    if (!subType)
      return "";
    const t = this.warehouseTypes().find((wt) => wt.subTypeKey === subType);
    return t ? t.name : subType;
  }
  // ===== إضافة/تعديل مخزن =====
  openAdd() {
    this.form = {
      name: "",
      warehouseType: "main",
      subType: "",
      stationId: null,
      responsiblePerson: "",
      location: "",
      notes: ""
    };
    this.editingId.set(null);
    this.showForm.set(true);
  }
  openEdit(w) {
    this.form = {
      name: w.name,
      warehouseType: w.warehouseType,
      subType: w.subType || "",
      stationId: w.stationId,
      responsiblePerson: w.responsiblePerson || "",
      location: w.location || "",
      notes: w.notes || ""
    };
    this.editingId.set(w.id);
    this.showForm.set(true);
  }
  async save() {
    if (!this.form.name?.trim()) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0632\u0646");
      return;
    }
    try {
      if (this.editingId()) {
        await this.api.updateWarehouse(this.editingId(), this.form);
        this.toast.success("\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u062E\u0632\u0646 \u0628\u0646\u062C\u0627\u062D");
      } else {
        await this.api.createWarehouse(this.bizId, this.form);
        this.toast.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062E\u0632\u0646 \u0628\u0646\u062C\u0627\u062D");
      }
      this.showForm.set(false);
      await this.load();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  async remove(w) {
    const confirmed = await this.toast.confirm({
      title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641",
      message: `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0632\u0646 "${w.name}"\u061F`,
      type: "danger"
    });
    if (confirmed) {
      try {
        await this.api.deleteWarehouse(w.id);
        this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0632\u0646");
        await this.load();
      } catch (e) {
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
      }
    }
  }
  // ===== إدارة تصنيفات المخازن =====
  openAddType() {
    this.typeForm = { name: "", subTypeKey: "", description: "", icon: "warehouse", color: "#4CAF50" };
    this.editingTypeId.set(null);
    this.showTypeForm.set(true);
  }
  openEditType(t) {
    this.typeForm = {
      name: t.name,
      subTypeKey: t.subTypeKey,
      description: t.description || "",
      icon: t.icon || "warehouse",
      color: t.color || "#4CAF50"
    };
    this.editingTypeId.set(t.id);
    this.showTypeForm.set(true);
  }
  async saveType() {
    if (!this.typeForm.name?.trim() || !this.typeForm.subTypeKey?.trim()) {
      this.toast.error("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0645\u0641\u062A\u0627\u062D");
      return;
    }
    try {
      if (this.editingTypeId()) {
        await this.api.updateWarehouseType(this.editingTypeId(), this.typeForm);
        this.toast.success("\u062A\u0645 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0628\u0646\u062C\u0627\u062D");
      } else {
        await this.api.createWarehouseType(this.bizId, this.typeForm);
        this.toast.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0628\u0646\u062C\u0627\u062D");
      }
      this.showTypeForm.set(false);
      await this.load();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  async removeType(t) {
    const confirmed = await this.toast.confirm({
      title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641",
      message: `\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 "${t.name}"\u061F`,
      type: "danger"
    });
    if (confirmed) {
      try {
        await this.api.deleteWarehouseType(t.id);
        this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0646\u064A\u0641");
        await this.load();
      } catch (e) {
        this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
      }
    }
  }
  // ===== مساعدات =====
  getTypeLabel(t) {
    const map = { main: "\u0631\u0626\u064A\u0633\u064A", station: "\u0645\u062D\u0637\u0629", sub: "\u0641\u0631\u0639\u064A" };
    return map[t] || t;
  }
  getTypeClass(t) {
    const map = { main: "active", station: "partner", sub: "info" };
    return map[t] || "default";
  }
  getTypeIcon(t) {
    const map = { main: "store", station: "local_gas_station", sub: "inventory_2" };
    return map[t] || "warehouse";
  }
  getTypeColor(t) {
    const map = { main: "#f59e0b", station: "#3b82f6", sub: "#8b5cf6" };
    return map[t] || "#64748b";
  }
  // أيقونات متاحة للتصنيفات
  availableIcons = [
    "warehouse",
    "store",
    "inventory_2",
    "local_shipping",
    "local_gas_station",
    "storefront",
    "factory",
    "domain",
    "business",
    "apartment",
    "home_work",
    "garage",
    "archive",
    "inbox",
    "shelves"
  ];
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275WarehouseComponent_BaseFactory;
    return function WarehouseComponent_Factory(__ngFactoryType__) {
      return (\u0275WarehouseComponent_BaseFactory || (\u0275WarehouseComponent_BaseFactory = \u0275\u0275getInheritedFactory(_WarehouseComponent)))(__ngFactoryType__ || _WarehouseComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WarehouseComponent, selectors: [["app-warehouse"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 56, vars: 19, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "header-actions"], [1, "add-btn", "secondary", 3, "click"], [1, "add-btn", 3, "click"], [1, "summary-row"], [1, "summary-card", "amber"], [1, "num"], [1, "lbl"], [1, "summary-card", "blue"], [1, "summary-card", "green"], [1, "summary-card", "purple"], [1, "summary-card", "teal"], [1, "filter-tabs"], [1, "filter-tab", 3, "click"], [1, "filter-tab", 3, "active"], [1, "sub-filter-row"], [1, "loading-state"], [1, "empty-state"], [1, "warehouse-grid"], [1, "modal-overlay"], [1, "sub-filter-label"], [1, "sub-filter-chip", 3, "click"], [1, "sub-filter-chip", 3, "active", "--chip-color"], [1, "material-icons-round", 2, "font-size", "14px"], [1, "material-icons-round", "spin"], [1, "warehouse-card", 3, "class"], [1, "warehouse-card"], [1, "wh-header"], [1, "wh-icon"], [1, "wh-actions"], [1, "action-btn", "edit", 3, "click"], [1, "action-btn", "delete", 3, "click"], [1, "wh-name"], [1, "wh-badges"], [1, "status-badge"], [1, "code-badge"], [1, "seq-badge"], [1, "sub-type-badge"], [1, "wh-details"], [1, "wh-detail"], [1, "wh-detail", "notes"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "amber"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-row"], [1, "form-group"], [1, "required"], ["placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0632\u0646", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], ["value", "main"], ["value", "station"], ["value", "sub"], ["value", ""], [3, "value"], [3, "ngValue"], ["placeholder", "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u062E\u0632\u0646", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0627\u062A...", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-save", 3, "click"], [1, "btn-cancel", 3, "click"], [1, "modal-icon", "teal"], [1, "existing-types"], ["placeholder", "\u0645\u062B\u0627\u0644: \u0645\u062E\u0632\u0646 \u0648\u0642\u0648\u062F", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0645\u062B\u0627\u0644: fuel", "dir", "ltr", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u062A\u0635\u0646\u064A\u0641", 3, "ngModelChange", "ngModel"], [1, "color-picker-row"], ["type", "color", 3, "ngModelChange", "ngModel"], [1, "color-preview"], [1, "icon-grid"], [1, "icon-btn", 3, "selected", "color"], [1, "types-list"], [1, "type-item"], [1, "divider"], [1, "type-info"], [1, "type-name"], [1, "type-key"], [1, "type-actions"], [1, "icon-btn", 3, "click"]], template: function WarehouseComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "warehouse");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u0645\u062E\u0627\u0632\u0646");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "button", 4);
      \u0275\u0275listener("click", function WarehouseComponent_Template_button_click_7_listener() {
        return ctx.openAddType();
      });
      \u0275\u0275elementStart(8, "span", 2);
      \u0275\u0275text(9, "category");
      \u0275\u0275elementEnd();
      \u0275\u0275text(10, " \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 5);
      \u0275\u0275listener("click", function WarehouseComponent_Template_button_click_11_listener() {
        return ctx.openAdd();
      });
      \u0275\u0275elementStart(12, "span", 2);
      \u0275\u0275text(13, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, " \u0625\u0636\u0627\u0641\u0629 \u0645\u062E\u0632\u0646 ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "div", 6)(16, "div", 7)(17, "span", 2);
      \u0275\u0275text(18, "warehouse");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div")(20, "span", 8);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span", 9);
      \u0275\u0275text(23, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0632\u0646");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "div", 10)(25, "span", 2);
      \u0275\u0275text(26, "store");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div")(28, "span", 8);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span", 9);
      \u0275\u0275text(31, "\u0645\u062E\u0627\u0632\u0646 \u0631\u0626\u064A\u0633\u064A\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div", 11)(33, "span", 2);
      \u0275\u0275text(34, "local_gas_station");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div")(36, "span", 8);
      \u0275\u0275text(37);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "span", 9);
      \u0275\u0275text(39, "\u0645\u062E\u0627\u0632\u0646 \u0645\u062D\u0637\u0627\u062A");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(40, WarehouseComponent_Conditional_40_Template, 8, 1, "div", 12);
      \u0275\u0275conditionalCreate(41, WarehouseComponent_Conditional_41_Template, 8, 1, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 14)(43, "button", 15);
      \u0275\u0275listener("click", function WarehouseComponent_Template_button_click_43_listener() {
        ctx.filterType.set("all");
        return ctx.filterSubType.set("all");
      });
      \u0275\u0275text(44);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "button", 15);
      \u0275\u0275listener("click", function WarehouseComponent_Template_button_click_45_listener() {
        ctx.filterType.set("main");
        return ctx.filterSubType.set("all");
      });
      \u0275\u0275text(46);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "button", 15);
      \u0275\u0275listener("click", function WarehouseComponent_Template_button_click_47_listener() {
        ctx.filterType.set("station");
        return ctx.filterSubType.set("all");
      });
      \u0275\u0275text(48);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(49, WarehouseComponent_Conditional_49_Template, 2, 3, "button", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(50, WarehouseComponent_Conditional_50_Template, 9, 2, "div", 17);
      \u0275\u0275conditionalCreate(51, WarehouseComponent_Conditional_51_Template, 5, 0, "div", 18)(52, WarehouseComponent_Conditional_52_Template, 5, 0, "div", 19)(53, WarehouseComponent_Conditional_53_Template, 3, 0, "div", 20);
      \u0275\u0275conditionalCreate(54, WarehouseComponent_Conditional_54_Template, 68, 10, "div", 21);
      \u0275\u0275conditionalCreate(55, WarehouseComponent_Conditional_55_Template, 54, 10, "div", 21);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(21);
      \u0275\u0275textInterpolate(ctx.warehouses().length);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.mainCount());
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.stationCount());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.subCount() > 0 ? 40 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.warehouseTypes().length > 0 ? 41 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.filterType() === "all");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" \u0627\u0644\u0643\u0644 (", ctx.warehouses().length, ") ");
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.filterType() === "main");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" \u0631\u0626\u064A\u0633\u064A (", ctx.mainCount(), ") ");
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.filterType() === "station");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" \u0645\u062D\u0637\u0629 (", ctx.stationCount(), ") ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.subCount() > 0 ? 49 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.subTypeFilters().length > 0 ? 50 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 51 : !ctx.filteredWarehouses().length ? 52 : 53);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() ? 54 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showTypeForm() ? 55 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.add-btn.secondary[_ngcontent-%COMP%] {\n  background: var(--bg-surface) !important;\n  color: var(--text-primary) !important;\n  border: 1px solid var(--border-color) !important;\n}\n.add-btn.secondary[_ngcontent-%COMP%]:hover {\n  background: var(--bg-hover) !important;\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  min-width: 160px;\n}\n.summary-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.summary-card[_ngcontent-%COMP%]   .num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card[_ngcontent-%COMP%]   .lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.amber[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.summary-card.blue[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.08);\n}\n.summary-card.blue[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.summary-card.green[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.08);\n}\n.summary-card.green[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.summary-card.purple[_ngcontent-%COMP%] {\n  background: rgba(139, 92, 246, 0.08);\n}\n.summary-card.purple[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #8b5cf6;\n}\n.summary-card.teal[_ngcontent-%COMP%] {\n  background: rgba(20, 184, 166, 0.08);\n}\n.summary-card.teal[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #14b8a6;\n}\n.filter-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.filter-tab[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.filter-tab.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.sub-filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n  padding: 10px 16px;\n  background: var(--bg-surface);\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n}\n.sub-filter-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.sub-filter-label[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.sub-filter-chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 5px 12px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: transparent;\n  color: var(--text-primary);\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: inherit;\n  transition: all 0.2s;\n}\n.sub-filter-chip[_ngcontent-%COMP%]:hover {\n  background: var(--bg-hover);\n}\n.sub-filter-chip.active[_ngcontent-%COMP%] {\n  background: var(--chip-color, #3b82f6);\n  color: white;\n  border-color: transparent;\n}\n.warehouse-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 20px;\n}\n.warehouse-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  padding: 24px;\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s;\n}\n.warehouse-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);\n}\n.warehouse-card.main[_ngcontent-%COMP%] {\n  border-top: 3px solid #f59e0b;\n}\n.warehouse-card.station[_ngcontent-%COMP%] {\n  border-top: 3px solid #3b82f6;\n}\n.warehouse-card.sub[_ngcontent-%COMP%] {\n  border-top: 3px solid #8b5cf6;\n}\n.wh-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.wh-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.wh-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.wh-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.wh-name[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 8px;\n}\n.wh-badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-bottom: 10px;\n}\n.code-badge[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 800;\n  background: rgba(99, 102, 241, 0.12);\n  color: #6366f1;\n  font-family: monospace;\n  direction: ltr;\n}\n.seq-badge[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 800;\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n  font-family: monospace;\n  direction: ltr;\n}\n.sub-type-badge[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 700;\n  background: rgba(20, 184, 166, 0.12);\n  color: #14b8a6;\n}\n.wh-details[_ngcontent-%COMP%] {\n  margin-top: 14px;\n}\n.wh-detail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-top: 6px;\n}\n.wh-detail[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--text-muted);\n}\n.wh-detail.notes[_ngcontent-%COMP%] {\n  font-style: italic;\n}\n.existing-types[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.existing-types[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 10px;\n}\n.types-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.type-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n}\n.type-item[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.type-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.type-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.type-key[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  font-family: monospace;\n  direction: ltr;\n}\n.type-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.divider[_ngcontent-%COMP%] {\n  border: none;\n  border-top: 1px solid var(--border-color);\n  margin: 16px 0;\n}\n.color-picker-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.color-picker-row[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%] {\n  width: 40px;\n  height: 36px;\n  border: none;\n  cursor: pointer;\n  border-radius: 8px;\n}\n.color-picker-row[_ngcontent-%COMP%]   .color-preview[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n}\n.color-picker-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-family: monospace;\n}\n.icon-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.icon-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-hover);\n}\n.icon-btn.selected[_ngcontent-%COMP%] {\n  border-color: currentColor;\n  background: rgba(59, 130, 246, 0.1);\n}\n.required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n@media (max-width: 640px) {\n  .warehouse-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .summary-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=warehouse.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WarehouseComponent, [{
    type: Component,
    args: [{ selector: "app-warehouse", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">warehouse</span> \u0627\u0644\u0645\u062E\u0627\u0632\u0646</h2>\r
    <div class="header-actions">\r
      <button class="add-btn secondary" (click)="openAddType()">\r
        <span class="material-icons-round">category</span> \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A\r
      </button>\r
      <button class="add-btn" (click)="openAdd()">\r
        <span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0645\u062E\u0632\u0646\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- \u0645\u0644\u062E\u0635 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A -->\r
  <div class="summary-row">\r
    <div class="summary-card amber">\r
      <span class="material-icons-round">warehouse</span>\r
      <div><span class="num">{{ warehouses().length }}</span><span class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0632\u0646</span></div>\r
    </div>\r
    <div class="summary-card blue">\r
      <span class="material-icons-round">store</span>\r
      <div><span class="num">{{ mainCount() }}</span><span class="lbl">\u0645\u062E\u0627\u0632\u0646 \u0631\u0626\u064A\u0633\u064A\u0629</span></div>\r
    </div>\r
    <div class="summary-card green">\r
      <span class="material-icons-round">local_gas_station</span>\r
      <div><span class="num">{{ stationCount() }}</span><span class="lbl">\u0645\u062E\u0627\u0632\u0646 \u0645\u062D\u0637\u0627\u062A</span></div>\r
    </div>\r
    @if (subCount() > 0) {\r
      <div class="summary-card purple">\r
        <span class="material-icons-round">inventory_2</span>\r
        <div><span class="num">{{ subCount() }}</span><span class="lbl">\u0645\u062E\u0627\u0632\u0646 \u0641\u0631\u0639\u064A\u0629</span></div>\r
      </div>\r
    }\r
    @if (warehouseTypes().length > 0) {\r
      <div class="summary-card teal">\r
        <span class="material-icons-round">category</span>\r
        <div><span class="num">{{ warehouseTypes().length }}</span><span class="lbl">\u062A\u0635\u0646\u064A\u0641</span></div>\r
      </div>\r
    }\r
  </div>\r
\r
  <!-- \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0646\u0648\u0639 -->\r
  <div class="filter-tabs">\r
    <button class="filter-tab" [class.active]="filterType() === 'all'" (click)="filterType.set('all'); filterSubType.set('all')">\r
      \u0627\u0644\u0643\u0644 ({{ warehouses().length }})\r
    </button>\r
    <button class="filter-tab" [class.active]="filterType() === 'main'" (click)="filterType.set('main'); filterSubType.set('all')">\r
      \u0631\u0626\u064A\u0633\u064A ({{ mainCount() }})\r
    </button>\r
    <button class="filter-tab" [class.active]="filterType() === 'station'" (click)="filterType.set('station'); filterSubType.set('all')">\r
      \u0645\u062D\u0637\u0629 ({{ stationCount() }})\r
    </button>\r
    @if (subCount() > 0) {\r
      <button class="filter-tab" [class.active]="filterType() === 'sub'" (click)="filterType.set('sub'); filterSubType.set('all')">\r
        \u0641\u0631\u0639\u064A ({{ subCount() }})\r
      </button>\r
    }\r
  </div>\r
\r
  <!-- \u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0641\u0631\u0639\u064A -->\r
  @if (subTypeFilters().length > 0) {\r
    <div class="sub-filter-row">\r
      <span class="sub-filter-label"><span class="material-icons-round">category</span> \u0627\u0644\u062A\u0635\u0646\u064A\u0641:</span>\r
      <button class="sub-filter-chip" [class.active]="filterSubType() === 'all'" (click)="filterSubType.set('all')">\u0627\u0644\u0643\u0644</button>\r
      @for (sf of subTypeFilters(); track sf.key) {\r
        <button class="sub-filter-chip" [class.active]="filterSubType() === sf.key" (click)="filterSubType.set(sf.key)"\r
          [style.--chip-color]="sf.color">\r
          <span class="material-icons-round" style="font-size: 14px;">{{ sf.icon }}</span>\r
          {{ sf.label }} ({{ sf.count }})\r
        </button>\r
      }\r
    </div>\r
  }\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!filteredWarehouses().length) {\r
    <div class="empty-state"><span class="material-icons-round">inventory_2</span><p>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u062E\u0627\u0632\u0646</p></div>\r
  } @else {\r
    <div class="warehouse-grid">\r
      @for (w of filteredWarehouses(); track w.id) {\r
        <div class="warehouse-card" [class]="w.warehouseType">\r
          <div class="wh-header">\r
            <div class="wh-icon" [style.background]="'linear-gradient(135deg, ' + getTypeColor(w.warehouseType) + ', ' + getTypeColor(w.warehouseType) + 'cc)'">\r
              <span class="material-icons-round">{{ getTypeIcon(w.warehouseType) }}</span>\r
            </div>\r
            <div class="wh-actions">\r
              <button class="action-btn edit" (click)="openEdit(w)"><span class="material-icons-round">edit</span></button>\r
              <button class="action-btn delete" (click)="remove(w)"><span class="material-icons-round">delete</span></button>\r
            </div>\r
          </div>\r
          <h3 class="wh-name">{{ w.name }}</h3>\r
          <div class="wh-badges">\r
            <span class="status-badge" [class]="getTypeClass(w.warehouseType)">{{ getTypeLabel(w.warehouseType) }}</span>\r
            @if (w.code) {\r
              <span class="code-badge">{{ w.code }}</span>\r
            }\r
            @if (w.sequenceNumber) {\r
              <span class="seq-badge">#{{ w.sequenceNumber }}</span>\r
            }\r
            @if (w.subType) {\r
              <span class="sub-type-badge">{{ getSubTypeName(w.subType) }}</span>\r
            }\r
          </div>\r
          <div class="wh-details">\r
            @if (w.stationId) {\r
              <div class="wh-detail"><span class="material-icons-round">local_gas_station</span> {{ getStationName(w.stationId) }}</div>\r
            }\r
            @if (w.responsiblePerson) {\r
              <div class="wh-detail"><span class="material-icons-round">person</span> {{ w.responsiblePerson }}</div>\r
            }\r
            @if (w.location) {\r
              <div class="wh-detail"><span class="material-icons-round">location_on</span> {{ w.location }}</div>\r
            }\r
            @if (w.notes) {\r
              <div class="wh-detail notes"><span class="material-icons-round">notes</span> {{ w.notes }}</div>\r
            }\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629/\u062A\u0639\u062F\u064A\u0644 \u0645\u062E\u0632\u0646 -->\r
  @if (showForm()) {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon amber"><span class="material-icons-round">warehouse</span></div>\r
            <div>\r
              <h2>{{ editingId() ? '\u062A\u0639\u062F\u064A\u0644 \u0645\u062E\u0632\u0646' : '\u0625\u0636\u0627\u0641\u0629 \u0645\u062E\u0632\u0646 \u062C\u062F\u064A\u062F' }}</h2>\r
              <p>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0646 \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0641</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0632\u0646 <span class="required">*</span></label>\r
              <input [(ngModel)]="form.name" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0632\u0646" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0646\u0648\u0639</label>\r
              <select [(ngModel)]="form.warehouseType">\r
                <option value="main">\u0631\u0626\u064A\u0633\u064A</option>\r
                <option value="station">\u0645\u062D\u0637\u0629</option>\r
                <option value="sub">\u0641\u0631\u0639\u064A</option>\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0641\u0631\u0639\u064A</label>\r
              <select [(ngModel)]="form.subType">\r
                <option value="">\u0628\u062F\u0648\u0646 \u062A\u0635\u0646\u064A\u0641</option>\r
                @for (t of warehouseTypes(); track t.id) {\r
                  <option [value]="t.subTypeKey">{{ t.name }}</option>\r
                }\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u062D\u0637\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</label>\r
              <select [(ngModel)]="form.stationId">\r
                <option [ngValue]="null">\u0628\u062F\u0648\u0646 \u0645\u062D\u0637\u0629</option>\r
                @for (s of stations(); track s.id) {\r
                  <option [ngValue]="s.id">{{ s.name }}</option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0633\u0624\u0648\u0644</label>\r
              <input [(ngModel)]="form.responsiblePerson" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0648\u0642\u0639</label>\r
              <input [(ngModel)]="form.location" placeholder="\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u062E\u0632\u0646" />\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>\r
            <textarea [(ngModel)]="form.notes" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A..."></textarea>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="save()">{{ editingId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062E\u0632\u0646' }}</button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- \u0646\u0645\u0648\u0630\u062C \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A -->\r
  @if (showTypeForm()) {\r
    <div class="modal-overlay" (click)="showTypeForm.set(false)">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon teal"><span class="material-icons-round">category</span></div>\r
            <div>\r
              <h2>{{ editingTypeId() ? '\u062A\u0639\u062F\u064A\u0644 \u062A\u0635\u0646\u064A\u0641' : '\u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F' }}</h2>\r
              <p>\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0632\u0646 \u062A\u0633\u0627\u0639\u062F \u0641\u064A \u062A\u0646\u0638\u064A\u0645 \u0648\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062E\u0627\u0632\u0646</p>\r
            </div>\r
          </div>\r
          <button class="close-btn" (click)="showTypeForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          <!-- \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 -->\r
          @if (!editingTypeId() && warehouseTypes().length > 0) {\r
            <div class="existing-types">\r
              <h4>\u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629</h4>\r
              <div class="types-list">\r
                @for (t of warehouseTypes(); track t.id) {\r
                  <div class="type-item">\r
                    <span class="material-icons-round" [style.color]="t.color">{{ t.icon || 'warehouse' }}</span>\r
                    <div class="type-info">\r
                      <span class="type-name">{{ t.name }}</span>\r
                      <span class="type-key">{{ t.subTypeKey }}</span>\r
                    </div>\r
                    <div class="type-actions">\r
                      <button class="action-btn edit" (click)="openEditType(t)"><span class="material-icons-round">edit</span></button>\r
                      <button class="action-btn delete" (click)="removeType(t)"><span class="material-icons-round">delete</span></button>\r
                    </div>\r
                  </div>\r
                }\r
              </div>\r
              <hr class="divider" />\r
              <h4>{{ editingTypeId() ? '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0635\u0646\u064A\u0641' : '\u0625\u0636\u0627\u0641\u0629 \u062A\u0635\u0646\u064A\u0641 \u062C\u062F\u064A\u062F' }}</h4>\r
            </div>\r
          }\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0633\u0645 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 <span class="required">*</span></label>\r
              <input [(ngModel)]="typeForm.name" placeholder="\u0645\u062B\u0627\u0644: \u0645\u062E\u0632\u0646 \u0648\u0642\u0648\u062F" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0641\u062A\u0627\u062D <span class="required">*</span></label>\r
              <input [(ngModel)]="typeForm.subTypeKey" placeholder="\u0645\u062B\u0627\u0644: fuel" dir="ltr" />\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0648\u0635\u0641</label>\r
            <input [(ngModel)]="typeForm.description" placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u062A\u0635\u0646\u064A\u0641" />\r
          </div>\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0644\u0648\u0646</label>\r
              <div class="color-picker-row">\r
                <input type="color" [(ngModel)]="typeForm.color" />\r
                <span class="color-preview" [style.background]="typeForm.color"></span>\r
                <span>{{ typeForm.color }}</span>\r
              </div>\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
              <div class="icon-grid">\r
                @for (ic of availableIcons; track ic) {\r
                  <button class="icon-btn" [class.selected]="typeForm.icon === ic" (click)="typeForm.icon = ic"\r
                    [style.color]="typeForm.icon === ic ? typeForm.color : ''">\r
                    <span class="material-icons-round">{{ ic }}</span>\r
                  </button>\r
                }\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save" (click)="saveType()">{{ editingTypeId() ? '\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0635\u0646\u064A\u0641' }}</button>\r
          <button class="btn-cancel" (click)="showTypeForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/warehouse/warehouse.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.header-actions {\n  display: flex;\n  gap: 10px;\n}\n.add-btn.secondary {\n  background: var(--bg-surface) !important;\n  color: var(--text-primary) !important;\n  border: 1px solid var(--border-color) !important;\n}\n.add-btn.secondary:hover {\n  background: var(--bg-hover) !important;\n}\n.summary-row {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  flex: 1;\n  min-width: 160px;\n}\n.summary-card .material-icons-round {\n  font-size: 28px;\n}\n.summary-card .num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.summary-card .lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.summary-card.amber {\n  background: rgba(245, 158, 11, 0.08);\n}\n.summary-card.amber .material-icons-round {\n  color: #f59e0b;\n}\n.summary-card.blue {\n  background: rgba(59, 130, 246, 0.08);\n}\n.summary-card.blue .material-icons-round {\n  color: #3b82f6;\n}\n.summary-card.green {\n  background: rgba(34, 197, 94, 0.08);\n}\n.summary-card.green .material-icons-round {\n  color: #22c55e;\n}\n.summary-card.purple {\n  background: rgba(139, 92, 246, 0.08);\n}\n.summary-card.purple .material-icons-round {\n  color: #8b5cf6;\n}\n.summary-card.teal {\n  background: rgba(20, 184, 166, 0.08);\n}\n.summary-card.teal .material-icons-round {\n  color: #14b8a6;\n}\n.filter-tabs {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.filter-tab {\n  padding: 8px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n}\n.filter-tab:hover {\n  background: var(--bg-card-hover);\n}\n.filter-tab.active {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n}\n.sub-filter-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n  padding: 10px 16px;\n  background: var(--bg-surface);\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n}\n.sub-filter-label {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.sub-filter-label .material-icons-round {\n  font-size: 16px;\n}\n.sub-filter-chip {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 5px 12px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: transparent;\n  color: var(--text-primary);\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: inherit;\n  transition: all 0.2s;\n}\n.sub-filter-chip:hover {\n  background: var(--bg-hover);\n}\n.sub-filter-chip.active {\n  background: var(--chip-color, #3b82f6);\n  color: white;\n  border-color: transparent;\n}\n.warehouse-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 20px;\n}\n.warehouse-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 18px;\n  padding: 24px;\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s;\n}\n.warehouse-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);\n}\n.warehouse-card.main {\n  border-top: 3px solid #f59e0b;\n}\n.warehouse-card.station {\n  border-top: 3px solid #3b82f6;\n}\n.warehouse-card.sub {\n  border-top: 3px solid #8b5cf6;\n}\n.wh-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.wh-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.wh-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.wh-actions {\n  display: flex;\n  gap: 4px;\n}\n.wh-name {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 8px;\n}\n.wh-badges {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-bottom: 10px;\n}\n.code-badge {\n  padding: 3px 10px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 800;\n  background: rgba(99, 102, 241, 0.12);\n  color: #6366f1;\n  font-family: monospace;\n  direction: ltr;\n}\n.seq-badge {\n  padding: 3px 10px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 800;\n  background: rgba(245, 158, 11, 0.12);\n  color: #f59e0b;\n  font-family: monospace;\n  direction: ltr;\n}\n.sub-type-badge {\n  padding: 3px 10px;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 700;\n  background: rgba(20, 184, 166, 0.12);\n  color: #14b8a6;\n}\n.wh-details {\n  margin-top: 14px;\n}\n.wh-detail {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-top: 6px;\n}\n.wh-detail .material-icons-round {\n  font-size: 16px;\n  color: var(--text-muted);\n}\n.wh-detail.notes {\n  font-style: italic;\n}\n.existing-types {\n  margin-bottom: 16px;\n}\n.existing-types h4 {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 10px;\n}\n.types-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.type-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n}\n.type-item .material-icons-round {\n  font-size: 22px;\n}\n.type-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.type-name {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.type-key {\n  font-size: 11px;\n  color: var(--text-secondary);\n  font-family: monospace;\n  direction: ltr;\n}\n.type-actions {\n  display: flex;\n  gap: 4px;\n}\n.divider {\n  border: none;\n  border-top: 1px solid var(--border-color);\n  margin: 16px 0;\n}\n.color-picker-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.color-picker-row input[type=color] {\n  width: 40px;\n  height: 36px;\n  border: none;\n  cursor: pointer;\n  border-radius: 8px;\n}\n.color-picker-row .color-preview {\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n}\n.color-picker-row span {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-family: monospace;\n}\n.icon-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.icon-btn {\n  width: 38px;\n  height: 38px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn .material-icons-round {\n  font-size: 20px;\n}\n.icon-btn:hover {\n  background: var(--bg-hover);\n}\n.icon-btn.selected {\n  border-color: currentColor;\n  background: rgba(59, 130, 246, 0.1);\n}\n.required {\n  color: #ef4444;\n}\n@media (max-width: 640px) {\n  .warehouse-grid {\n    grid-template-columns: 1fr;\n  }\n  .summary-row {\n    flex-direction: column;\n  }\n  .header-actions {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=warehouse.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WarehouseComponent, { className: "WarehouseComponent", filePath: "src/app/pages/warehouse/warehouse.ts", lineNumber: 19 });
})();
export {
  WarehouseComponent
};
//# sourceMappingURL=chunk-ZIUMHTRW.js.map
