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
  MaxValidator,
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
  JsonPipe,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VUZEB5JS.js";

// src/app/pages/ui-builder/ui-builder.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.value;
function UiBuilderComponent_Conditional_0_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "div", 11);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function UiBuilderComponent_Conditional_0_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "span", 4);
    \u0275\u0275text(2, "dashboard_customize");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u062D\u0627\u062A \u0628\u0639\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "\u0623\u0646\u0634\u0626 \u0635\u0641\u062D\u062A\u0643 \u0627\u0644\u0623\u0648\u0644\u0649 \u0644\u0628\u062F\u0621 \u0628\u0646\u0627\u0621 \u0648\u0627\u062C\u0647\u0627\u062A \u0645\u062E\u0635\u0635\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 6);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_0_Conditional_18_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCreatePage());
    });
    \u0275\u0275elementStart(8, "span", 4);
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \u0625\u0646\u0634\u0627\u0621 \u0635\u0641\u062D\u0629 ");
    \u0275\u0275elementEnd()();
  }
}
function UiBuilderComponent_Conditional_0_Conditional_19_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_0_Conditional_19_For_2_Template_div_click_0_listener() {
      const page_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openPage(page_r5));
    });
    \u0275\u0275elementStart(1, "div", 14)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 15)(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 16);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_0_Conditional_19_For_2_Template_div_click_11_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(12, "button", 17);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_0_Conditional_19_For_2_Template_button_click_12_listener() {
      const page_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openEditPage(page_r5));
    });
    \u0275\u0275elementStart(13, "span", 4);
    \u0275\u0275text(14, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 18);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_0_Conditional_19_For_2_Template_button_click_15_listener() {
      const page_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deletePage(page_r5));
    });
    \u0275\u0275elementStart(16, "span", 4);
    \u0275\u0275text(17, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const page_r5 = ctx.$implicit;
    \u0275\u0275styleProp("--page-color", page_r5.color || "#3b82f6");
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", page_r5.color || "#3b82f6");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(page_r5.icon || "dashboard");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(page_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(page_r5.description || "\u0628\u062F\u0648\u0646 \u0648\u0635\u0641");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", page_r5.pageKey, " \u2022 ", page_r5.layout);
  }
}
function UiBuilderComponent_Conditional_0_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275repeaterCreate(1, UiBuilderComponent_Conditional_0_Conditional_19_For_2_Template, 18, 9, "div", 12, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.pages());
  }
}
function UiBuilderComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 3)(2, "h1")(3, "span", 4);
    \u0275\u0275text(4, "dashboard_customize");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " \u0628\u0646\u0627\u0621 \u0627\u0644\u0648\u0627\u062C\u0647\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "\u0625\u0646\u0634\u0627\u0621 \u0635\u0641\u062D\u0627\u062A \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629 \u0645\u062E\u0635\u0635\u0629 \u0645\u0639 \u0645\u0643\u0648\u0646\u0627\u062A \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u062E\u0635\u064A\u0635");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 5)(9, "button", 6);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_0_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreatePage());
    });
    \u0275\u0275elementStart(10, "span", 4);
    \u0275\u0275text(11, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " \u0635\u0641\u062D\u0629 \u062C\u062F\u064A\u062F\u0629 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 7);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_0_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openDataSources());
    });
    \u0275\u0275elementStart(14, "span", 4);
    \u0275\u0275text(15, "storage");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(17, UiBuilderComponent_Conditional_0_Conditional_17_Template, 4, 0, "div", 8)(18, UiBuilderComponent_Conditional_0_Conditional_18_Template, 11, 0, "div", 9)(19, UiBuilderComponent_Conditional_0_Conditional_19_Template, 3, 0, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275conditional(ctx_r1.loading() ? 17 : ctx_r1.pages().length === 0 ? 18 : 19);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_1_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAddComponent());
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0625\u0636\u0627\u0641\u0629 \u0645\u0643\u0648\u0646 ");
    \u0275\u0275elementEnd();
  }
}
function UiBuilderComponent_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "div", 11);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function UiBuilderComponent_Conditional_1_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "span", 4);
    \u0275\u0275text(2, "widgets");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0643\u0648\u0646\u0627\u062A \u0628\u0639\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "\u0623\u0636\u0641 \u0645\u0643\u0648\u0646\u0627\u062A \u0644\u0628\u0646\u0627\u0621 \u0635\u0641\u062D\u062A\u0643");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 6);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_1_Conditional_21_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAddComponent());
    });
    \u0275\u0275elementStart(8, "span", 4);
    \u0275\u0275text(9, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " \u0625\u0636\u0627\u0641\u0629 \u0645\u0643\u0648\u0646 ");
    \u0275\u0275elementEnd()();
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 37)(4, "button", 38);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const comp_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openEditComponent(comp_r10));
    });
    \u0275\u0275elementStart(5, "span", 4);
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 39);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r9);
      const comp_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteComponent(comp_r10));
    });
    \u0275\u0275elementStart(8, "span", 4);
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const comp_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getComponentTypeInfo(comp_r10.componentType).label);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(comp_r10.title);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 41);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 42);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const comp_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", (comp_r10.config == null ? null : comp_r10.config.color) || ctx_r1.activePage().color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((comp_r10.config == null ? null : comp_r10.config.icon) || "analytics");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_15_0 = ctx_r1.componentData()[comp_r10.id]) == null ? null : tmp_15_0.data == null ? null : tmp_15_0.data[0]) ? ctx_r1.componentData()[comp_r10.id].data[0][(comp_r10.config == null ? null : comp_r10.config.valueField) || "value"] || "0" : (comp_r10.config == null ? null : comp_r10.config.staticValue) || "0");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((comp_r10.config == null ? null : comp_r10.config.label) || comp_r10.title || "\u0625\u062D\u0635\u0627\u0626\u064A\u0629");
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Conditional_0_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const key_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(key_r11);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Conditional_0_For_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const key_r12 = ctx.$implicit;
    const row_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r13[key_r12]);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Conditional_0_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275repeaterCreate(1, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Conditional_0_For_8_For_2_Template, 2, 1, "td", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r10 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getDataKeys(ctx_r1.componentData()[comp_r10.id]));
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "table", 45)(2, "thead")(3, "tr");
    \u0275\u0275repeaterCreate(4, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Conditional_0_For_5_Template, 2, 1, "th", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "tbody");
    \u0275\u0275repeaterCreate(7, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Conditional_0_For_8_Template, 3, 0, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const comp_r10 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.getDataKeys(ctx_r1.componentData()[comp_r10.id]));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.componentData()[comp_r10.id].data);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 4);
    \u0275\u0275text(2, "table_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A");
    \u0275\u0275elementEnd()();
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Conditional_0_Template, 9, 0, "div", 43)(1, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Conditional_1_Template, 5, 0, "div", 44);
  }
  if (rf & 2) {
    let tmp_13_0;
    const comp_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(((tmp_13_0 = ctx_r1.componentData()[comp_r10.id]) == null ? null : tmp_13_0.data == null ? null : tmp_13_0.data.length) ? 0 : 1);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((comp_r10.config == null ? null : comp_r10.config.text) || "\u0646\u0635 \u0641\u0627\u0631\u063A");
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "span", 4);
    \u0275\u0275text(2, "bar_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const comp_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\u0631\u0633\u0645 \u0628\u064A\u0627\u0646\u064A", comp_r10.dataSourceId ? " (\u0645\u0635\u062F\u0631: " + ctx_r1.getDataSourceName(comp_r10.dataSourceId) + ")" : "");
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "iframe", 46);
  }
  if (rf & 2) {
    const comp_r10 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("src", comp_r10.config.url, \u0275\u0275sanitizeResourceUrl);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 4);
    \u0275\u0275text(2, "web");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0623\u062F\u062E\u0644 \u0631\u0627\u0628\u0637 URL \u0641\u064A \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");
    \u0275\u0275elementEnd()();
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_8_Conditional_0_Template, 1, 1, "iframe", 46)(1, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_8_Conditional_1_Template, 5, 0, "div", 44);
  }
  if (rf & 2) {
    const comp_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional((comp_r10.config == null ? null : comp_r10.config.url) ? 0 : 1);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_9_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "json");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    const comp_r10 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r14[(comp_r10.config == null ? null : comp_r10.config.labelField) || "name"] || \u0275\u0275pipeBind1(2, 1, item_r14));
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 47);
    \u0275\u0275repeaterCreate(1, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_9_Conditional_0_For_2_Template, 3, 3, "li", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r10 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.componentData()[comp_r10.id].data);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 4);
    \u0275\u0275text(2, "list");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631");
    \u0275\u0275elementEnd()();
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_9_Conditional_0_Template, 3, 0, "ul", 47)(1, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_9_Conditional_1_Template, 5, 0, "div", 44);
  }
  if (rf & 2) {
    let tmp_13_0;
    const comp_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(((tmp_13_0 = ctx_r1.componentData()[comp_r10.id]) == null ? null : tmp_13_0.data == null ? null : tmp_13_0.data.length) ? 0 : 1);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275conditionalCreate(1, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_1_Template, 10, 1, "div", 30);
    \u0275\u0275elementStart(2, "div", 31);
    \u0275\u0275conditionalCreate(3, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_3_Template, 2, 1, "h4", 32);
    \u0275\u0275conditionalCreate(4, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_4_Template, 7, 5, "div", 33);
    \u0275\u0275conditionalCreate(5, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_5_Template, 2, 1);
    \u0275\u0275conditionalCreate(6, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_6_Template, 2, 1, "div", 34);
    \u0275\u0275conditionalCreate(7, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_7_Template, 5, 1, "div", 35);
    \u0275\u0275conditionalCreate(8, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_8_Template, 2, 1);
    \u0275\u0275conditionalCreate(9, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Conditional_9_Template, 2, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const comp_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleMap(ctx_r1.getComponentGridStyle(comp_r10));
    \u0275\u0275classProp("editing", ctx_r1.viewMode() === "edit");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.viewMode() === "edit" ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(comp_r10.title ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(comp_r10.componentType === "stat_card" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(comp_r10.componentType === "data_table" ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(comp_r10.componentType === "text" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(comp_r10.componentType === "chart" ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(comp_r10.componentType === "iframe" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(comp_r10.componentType === "list" ? 9 : -1);
  }
}
function UiBuilderComponent_Conditional_1_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275repeaterCreate(1, UiBuilderComponent_Conditional_1_Conditional_22_For_2_Template, 10, 12, "div", 28, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.pageComponents());
  }
}
function UiBuilderComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 19)(2, "div", 20)(3, "button", 21);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToList());
    });
    \u0275\u0275elementStart(4, "span", 4);
    \u0275\u0275text(5, "arrow_forward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 22)(7, "span", 4);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "h2");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 5)(12, "button", 23);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_1_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEditMode());
    });
    \u0275\u0275elementStart(13, "span", 4);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, UiBuilderComponent_Conditional_1_Conditional_16_Template, 4, 0, "button", 24);
    \u0275\u0275elementStart(17, "button", 25);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_1_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openDataSources());
    });
    \u0275\u0275elementStart(18, "span", 4);
    \u0275\u0275text(19, "storage");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(20, UiBuilderComponent_Conditional_1_Conditional_20_Template, 4, 0, "div", 8)(21, UiBuilderComponent_Conditional_1_Conditional_21_Template, 11, 0, "div", 9)(22, UiBuilderComponent_Conditional_1_Conditional_22_Template, 3, 0, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("--page-color", ctx_r1.activePage().color || "#3b82f6");
    \u0275\u0275advance(5);
    \u0275\u0275styleProp("background", ctx_r1.activePage().color || "#3b82f6");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.activePage().icon || "dashboard");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.activePage().title);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.viewMode() === "edit");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.viewMode() === "edit" ? "visibility" : "edit");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.viewMode() === "edit" ? "\u0645\u0639\u0627\u064A\u0646\u0629" : "\u062A\u0639\u062F\u064A\u0644", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.viewMode() === "edit" ? 16 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.loading() ? 20 : ctx_r1.pageComponents().length === 0 ? 21 : 22);
  }
}
function UiBuilderComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_2_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showPageModal.set(false));
    });
    \u0275\u0275elementStart(1, "div", 49);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_2_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 50)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 51);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showPageModal.set(false));
    });
    \u0275\u0275elementStart(6, "span", 4);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 52)(9, "div", 53)(10, "label");
    \u0275\u0275text(11, "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u0641\u062D\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 54);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_2_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updatePageForm("title", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 53)(14, "label");
    \u0275\u0275text(15, "\u0627\u0644\u0645\u0641\u062A\u0627\u062D (pageKey)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 55);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_2_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updatePageForm("pageKey", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 53)(18, "label");
    \u0275\u0275text(19, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 56);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_2_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updatePageForm("description", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 57)(22, "div", 53)(23, "label");
    \u0275\u0275text(24, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 58);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_2_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updatePageForm("icon", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 53)(27, "label");
    \u0275\u0275text(28, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 59);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_2_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updatePageForm("color", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 53)(31, "label");
    \u0275\u0275text(32, "\u0627\u0644\u062A\u062E\u0637\u064A\u0637");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "select", 60);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_2_Template_select_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updatePageForm("layout", $event));
    });
    \u0275\u0275elementStart(34, "option", 61);
    \u0275\u0275text(35, "\u0634\u0628\u0643\u0629 (Grid)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "option", 62);
    \u0275\u0275text(37, "\u0645\u0631\u0646 (Flex)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "option", 63);
    \u0275\u0275text(39, "\u062D\u0631 (Freeform)");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(40, "div", 64)(41, "button", 7);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_2_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showPageModal.set(false));
    });
    \u0275\u0275text(42, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 65);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_2_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.savePage());
    });
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.editingPage() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629" : "\u0635\u0641\u062D\u0629 \u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275advance(8);
    \u0275\u0275property("ngModel", ctx_r1.pageForm().title);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.pageForm().pageKey);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.pageForm().description);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.pageForm().icon);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.pageForm().color);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.pageForm().layout);
    \u0275\u0275advance(10);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : ctx_r1.editingPage() ? "\u062A\u062D\u062F\u064A\u062B" : "\u0625\u0646\u0634\u0627\u0621", " ");
  }
}
function UiBuilderComponent_Conditional_3_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 75);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_3_For_14_Template_button_click_0_listener() {
      const ct_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onComponentTypeChange(ct_r18.value));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ct_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.componentForm().componentType === ct_r18.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ct_r18.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ct_r18.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ct_r18.desc);
  }
}
function UiBuilderComponent_Conditional_3_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ds_r19 = ctx.$implicit;
    \u0275\u0275property("value", ds_r19.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ds_r19.name);
  }
}
function UiBuilderComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_3_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showComponentModal.set(false));
    });
    \u0275\u0275elementStart(1, "div", 66);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_3_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 50)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 51);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_3_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showComponentModal.set(false));
    });
    \u0275\u0275elementStart(6, "span", 4);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 52)(9, "div", 53)(10, "label");
    \u0275\u0275text(11, "\u0646\u0648\u0639 \u0627\u0644\u0645\u0643\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 67);
    \u0275\u0275repeaterCreate(13, UiBuilderComponent_Conditional_3_For_14_Template, 7, 5, "button", 68, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 53)(16, "label");
    \u0275\u0275text(17, "\u0627\u0644\u0639\u0646\u0648\u0627\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 69);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_3_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateComponentForm("title", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 57)(20, "div", 53)(21, "label");
    \u0275\u0275text(22, "\u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "select", 60);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_3_Template_select_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateComponentForm("dataSourceId", +$event));
    });
    \u0275\u0275elementStart(24, "option", 70);
    \u0275\u0275text(25, "\u0628\u062F\u0648\u0646 \u0645\u0635\u062F\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(26, UiBuilderComponent_Conditional_3_For_27_Template, 2, 2, "option", 70, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 57)(29, "div", 53)(30, "label");
    \u0275\u0275text(31, "\u0627\u0644\u0645\u0648\u0642\u0639 X");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 71);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_3_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateComponentForm("positionX", +$event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 53)(34, "label");
    \u0275\u0275text(35, "\u0627\u0644\u0645\u0648\u0642\u0639 Y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "input", 72);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_3_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateComponentForm("positionY", +$event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 53)(38, "label");
    \u0275\u0275text(39, "\u0627\u0644\u0639\u0631\u0636");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "input", 73);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_3_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateComponentForm("width", +$event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 53)(42, "label");
    \u0275\u0275text(43, "\u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "input", 73);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_3_Template_input_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateComponentForm("height", +$event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 53)(46, "label");
    \u0275\u0275text(47, "\u0625\u0639\u062F\u0627\u062F\u0627\u062A JSON");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "textarea", 74);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_3_Template_textarea_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateComponentForm("config", $event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(49, "div", 64)(50, "button", 7);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_3_Template_button_click_50_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showComponentModal.set(false));
    });
    \u0275\u0275text(51, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "button", 65);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_3_Template_button_click_52_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveComponent());
    });
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.editingComponent() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0643\u0648\u0646" : "\u0625\u0636\u0627\u0641\u0629 \u0645\u0643\u0648\u0646");
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.componentTypes);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.componentForm().title);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.componentForm().dataSourceId);
    \u0275\u0275advance();
    \u0275\u0275property("value", 0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.dataSources());
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r1.componentForm().positionX);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.componentForm().positionY);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.componentForm().width);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.componentForm().height);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.componentForm().config);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : ctx_r1.editingComponent() ? "\u062A\u062D\u062F\u064A\u062B" : "\u0625\u0636\u0627\u0641\u0629", " ");
  }
}
function UiBuilderComponent_Conditional_4_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 81)(1, "div", 82)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 83)(10, "button", 84);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_4_Conditional_9_For_2_Template_button_click_10_listener() {
      const ds_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.previewDataSource(ds_r22));
    });
    \u0275\u0275elementStart(11, "span", 4);
    \u0275\u0275text(12, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 38);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_4_Conditional_9_For_2_Template_button_click_13_listener() {
      const ds_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.editDataSource(ds_r22));
    });
    \u0275\u0275elementStart(14, "span", 4);
    \u0275\u0275text(15, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 39);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_4_Conditional_9_For_2_Template_button_click_16_listener() {
      const ds_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteDataSource(ds_r22));
    });
    \u0275\u0275elementStart(17, "span", 4);
    \u0275\u0275text(18, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const ds_r22 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("editing", ((tmp_12_0 = ctx_r1.editingDataSource()) == null ? null : tmp_12_0.id) === ds_r22.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ds_r22.sourceType === "table" ? "storage" : "code");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ds_r22.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ds_r22.sourceType === "table" ? ds_r22.tableName : "\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0645\u062E\u0635\u0635");
  }
}
function UiBuilderComponent_Conditional_4_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76);
    \u0275\u0275repeaterCreate(1, UiBuilderComponent_Conditional_4_Conditional_9_For_2_Template, 19, 5, "div", 80, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.dataSources());
  }
}
function UiBuilderComponent_Conditional_4_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const st_r23 = ctx.$implicit;
    \u0275\u0275property("value", st_r23.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(st_r23.label);
  }
}
function UiBuilderComponent_Conditional_4_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "label");
    \u0275\u0275text(2, "\u0627\u0633\u0645 \u0627\u0644\u062C\u062F\u0648\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 85);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_4_Conditional_23_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateDsForm("tableName", $event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.dsForm().tableName);
  }
}
function UiBuilderComponent_Conditional_4_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "label");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "textarea", 86);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_4_Conditional_24_Template_textarea_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateDsForm("queryTemplate", $event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("\u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 (\u0627\u0633\u062A\u062E\u062F\u0645 ", "{", "bizId", "}", " \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u062D\u0627\u0644\u064A)");
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.dsForm().queryTemplate);
  }
}
function UiBuilderComponent_Conditional_4_Conditional_27_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87);
    \u0275\u0275element(1, "div", 89);
    \u0275\u0275elementEnd();
  }
}
function UiBuilderComponent_Conditional_4_Conditional_27_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.dsPreviewData().error);
  }
}
function UiBuilderComponent_Conditional_4_Conditional_27_Conditional_5_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const key_r26 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(key_r26);
  }
}
function UiBuilderComponent_Conditional_4_Conditional_27_Conditional_5_For_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const key_r27 = ctx.$implicit;
    const row_r28 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r28[key_r27]);
  }
}
function UiBuilderComponent_Conditional_4_Conditional_27_Conditional_5_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275repeaterCreate(1, UiBuilderComponent_Conditional_4_Conditional_27_Conditional_5_For_8_For_2_Template, 2, 1, "td", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getDataKeys(ctx_r1.dsPreviewData()));
  }
}
function UiBuilderComponent_Conditional_4_Conditional_27_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "table", 45)(2, "thead")(3, "tr");
    \u0275\u0275repeaterCreate(4, UiBuilderComponent_Conditional_4_Conditional_27_Conditional_5_For_5_Template, 2, 1, "th", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "tbody");
    \u0275\u0275repeaterCreate(7, UiBuilderComponent_Conditional_4_Conditional_27_Conditional_5_For_8_Template, 3, 0, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.getDataKeys(ctx_r1.dsPreviewData()));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.dsPreviewData().data);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u0625\u062C\u0645\u0627\u0644\u064A: ", ctx_r1.dsPreviewData().total, " \u0633\u062C\u0644 (\u0639\u0631\u0636 \u0623\u0648\u0644 10)");
  }
}
function UiBuilderComponent_Conditional_4_Conditional_27_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A");
    \u0275\u0275elementEnd();
  }
}
function UiBuilderComponent_Conditional_4_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "h4");
    \u0275\u0275text(2, "\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, UiBuilderComponent_Conditional_4_Conditional_27_Conditional_3_Template, 2, 0, "div", 87)(4, UiBuilderComponent_Conditional_4_Conditional_27_Conditional_4_Template, 2, 1, "div", 88)(5, UiBuilderComponent_Conditional_4_Conditional_27_Conditional_5_Template, 11, 1)(6, UiBuilderComponent_Conditional_4_Conditional_27_Conditional_6_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.dsPreviewLoading() ? 3 : ((tmp_2_0 = ctx_r1.dsPreviewData()) == null ? null : tmp_2_0.error) ? 4 : ((tmp_2_0 = ctx_r1.dsPreviewData()) == null ? null : tmp_2_0.data == null ? null : tmp_2_0.data.length) ? 5 : 6);
  }
}
function UiBuilderComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_4_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDataSourceModal.set(false));
    });
    \u0275\u0275elementStart(1, "div", 66);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_4_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 50)(3, "h3");
    \u0275\u0275text(4, "\u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 51);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_4_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDataSourceModal.set(false));
    });
    \u0275\u0275elementStart(6, "span", 4);
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 52);
    \u0275\u0275conditionalCreate(9, UiBuilderComponent_Conditional_4_Conditional_9_Template, 3, 0, "div", 76);
    \u0275\u0275elementStart(10, "div", 77)(11, "h4");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 53)(14, "label");
    \u0275\u0275text(15, "\u0627\u0644\u0627\u0633\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 78);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_4_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateDsForm("name", $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 53)(18, "label");
    \u0275\u0275text(19, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "select", 60);
    \u0275\u0275listener("ngModelChange", function UiBuilderComponent_Conditional_4_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateDsForm("sourceType", $event));
    });
    \u0275\u0275repeaterCreate(21, UiBuilderComponent_Conditional_4_For_22_Template, 2, 2, "option", 70, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(23, UiBuilderComponent_Conditional_4_Conditional_23_Template, 4, 1, "div", 53);
    \u0275\u0275conditionalCreate(24, UiBuilderComponent_Conditional_4_Conditional_24_Template, 4, 3, "div", 53);
    \u0275\u0275elementStart(25, "button", 65);
    \u0275\u0275listener("click", function UiBuilderComponent_Conditional_4_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveDataSource());
    });
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, UiBuilderComponent_Conditional_4_Conditional_27_Template, 7, 1, "div", 79);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx_r1.dataSources().length > 0 ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.editingDataSource() ? "\u062A\u0639\u062F\u064A\u0644 \u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0645\u0635\u062F\u0631 \u0628\u064A\u0627\u0646\u0627\u062A \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.dsForm().name);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.dsForm().sourceType);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.sourceTypes);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.dsForm().sourceType === "table" ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.dsForm().sourceType === "query" ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : ctx_r1.editingDataSource() ? "\u062A\u062D\u062F\u064A\u062B" : "\u0625\u0636\u0627\u0641\u0629", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showDsPreview() ? 27 : -1);
  }
}
var COMPONENT_TYPES = [
  { value: "stat_card", label: "\u0628\u0637\u0627\u0642\u0629 \u0625\u062D\u0635\u0627\u0626\u064A\u0629", icon: "analytics", desc: "\u0639\u0631\u0636 \u0631\u0642\u0645 \u0623\u0648 \u0645\u0624\u0634\u0631", defaultW: 3, defaultH: 2 },
  { value: "data_table", label: "\u062C\u062F\u0648\u0644 \u0628\u064A\u0627\u0646\u0627\u062A", icon: "table_chart", desc: "\u0639\u0631\u0636 \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u062C\u062F\u0648\u0644", defaultW: 6, defaultH: 4 },
  { value: "chart", label: "\u0631\u0633\u0645 \u0628\u064A\u0627\u0646\u064A", icon: "bar_chart", desc: "\u0631\u0633\u0645 \u0628\u064A\u0627\u0646\u064A \u062A\u0641\u0627\u0639\u0644\u064A", defaultW: 6, defaultH: 4 },
  { value: "text", label: "\u0646\u0635", icon: "text_fields", desc: "\u0646\u0635 \u062D\u0631 \u0623\u0648 \u0645\u0644\u0627\u062D\u0638\u0627\u062A", defaultW: 4, defaultH: 2 },
  { value: "iframe", label: "\u0625\u0637\u0627\u0631 \u062E\u0627\u0631\u062C\u064A", icon: "web", desc: "\u062A\u0636\u0645\u064A\u0646 \u0635\u0641\u062D\u0629 \u062E\u0627\u0631\u062C\u064A\u0629", defaultW: 6, defaultH: 4 },
  { value: "list", label: "\u0642\u0627\u0626\u0645\u0629", icon: "list", desc: "\u0639\u0631\u0636 \u0642\u0627\u0626\u0645\u0629 \u0639\u0646\u0627\u0635\u0631", defaultW: 4, defaultH: 4 }
];
var SOURCE_TYPES = [
  { value: "table", label: "\u062C\u062F\u0648\u0644 \u0645\u0628\u0627\u0634\u0631", icon: "storage", desc: "\u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u062C\u062F\u0648\u0644 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" },
  { value: "query", label: "\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0645\u062E\u0635\u0635", icon: "code", desc: "\u062A\u0646\u0641\u064A\u0630 \u0627\u0633\u062A\u0639\u0644\u0627\u0645 SQL \u0645\u062E\u0635\u0635" }
];
var UiBuilderComponent = class _UiBuilderComponent extends BasePageComponent {
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
  // Data
  pages = signal([], ...ngDevMode ? [{ debugName: "pages" }] : (
    /* istanbul ignore next */
    []
  ));
  activePage = signal(null, ...ngDevMode ? [{ debugName: "activePage" }] : (
    /* istanbul ignore next */
    []
  ));
  pageComponents = signal([], ...ngDevMode ? [{ debugName: "pageComponents" }] : (
    /* istanbul ignore next */
    []
  ));
  dataSources = signal([], ...ngDevMode ? [{ debugName: "dataSources" }] : (
    /* istanbul ignore next */
    []
  ));
  componentData = signal({}, ...ngDevMode ? [{ debugName: "componentData" }] : (
    /* istanbul ignore next */
    []
  ));
  // View
  viewMode = signal("list", ...ngDevMode ? [{ debugName: "viewMode" }] : (
    /* istanbul ignore next */
    []
  ));
  // Create/Edit Page Modal
  showPageModal = signal(false, ...ngDevMode ? [{ debugName: "showPageModal" }] : (
    /* istanbul ignore next */
    []
  ));
  editingPage = signal(null, ...ngDevMode ? [{ debugName: "editingPage" }] : (
    /* istanbul ignore next */
    []
  ));
  pageForm = signal({ pageKey: "", title: "", description: "", icon: "dashboard", color: "#3b82f6", layout: "grid" }, ...ngDevMode ? [{ debugName: "pageForm" }] : (
    /* istanbul ignore next */
    []
  ));
  // Add Component Modal
  showComponentModal = signal(false, ...ngDevMode ? [{ debugName: "showComponentModal" }] : (
    /* istanbul ignore next */
    []
  ));
  editingComponent = signal(null, ...ngDevMode ? [{ debugName: "editingComponent" }] : (
    /* istanbul ignore next */
    []
  ));
  componentForm = signal({ componentType: "stat_card", title: "", config: "{}", dataSourceId: 0, positionX: 0, positionY: 0, width: 3, height: 2 }, ...ngDevMode ? [{ debugName: "componentForm" }] : (
    /* istanbul ignore next */
    []
  ));
  // Data Source Modal
  showDataSourceModal = signal(false, ...ngDevMode ? [{ debugName: "showDataSourceModal" }] : (
    /* istanbul ignore next */
    []
  ));
  editingDataSource = signal(null, ...ngDevMode ? [{ debugName: "editingDataSource" }] : (
    /* istanbul ignore next */
    []
  ));
  dsForm = signal({ name: "", sourceType: "table", tableName: "", queryTemplate: "", config: "{}" }, ...ngDevMode ? [{ debugName: "dsForm" }] : (
    /* istanbul ignore next */
    []
  ));
  // Data Source Preview
  showDsPreview = signal(false, ...ngDevMode ? [{ debugName: "showDsPreview" }] : (
    /* istanbul ignore next */
    []
  ));
  dsPreviewData = signal(null, ...ngDevMode ? [{ debugName: "dsPreviewData" }] : (
    /* istanbul ignore next */
    []
  ));
  dsPreviewLoading = signal(false, ...ngDevMode ? [{ debugName: "dsPreviewLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  componentTypes = COMPONENT_TYPES;
  sourceTypes = SOURCE_TYPES;
  onBizIdChange(_bizId) {
    void this.loadPages();
  }
  // ===================== Pages CRUD =====================
  async loadPages() {
    this.loading.set(true);
    try {
      const pages = await this.api.getUiPages(this.bizId);
      this.pages.set(pages || []);
    } catch (e) {
      this.toast.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0627\u062A");
    } finally {
      this.loading.set(false);
    }
  }
  openCreatePage() {
    this.editingPage.set(null);
    this.pageForm.set({ pageKey: "", title: "", description: "", icon: "dashboard", color: "#3b82f6", layout: "grid" });
    this.showPageModal.set(true);
  }
  openEditPage(page) {
    this.editingPage.set(page);
    this.pageForm.set({
      pageKey: page.pageKey,
      title: page.title,
      description: page.description || "",
      icon: page.icon,
      color: page.color,
      layout: page.layout
    });
    this.showPageModal.set(true);
  }
  async savePage() {
    const form = this.pageForm();
    if (!form.title || !form.pageKey) {
      this.toast.warning("\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0648\u0645\u0641\u062A\u0627\u062D \u0627\u0644\u0635\u0641\u062D\u0629");
      return;
    }
    this.saving.set(true);
    try {
      if (this.editingPage()) {
        await this.api.updateUiPage(this.bizId, this.editingPage().id, form);
        this.toast.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629");
      } else {
        await this.api.createUiPage(this.bizId, form);
        this.toast.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0635\u0641\u062D\u0629");
      }
      this.showPageModal.set(false);
      await this.loadPages();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0635\u0641\u062D\u0629");
    } finally {
      this.saving.set(false);
    }
  }
  async deletePage(page) {
    const confirmed = await this.toast.confirm({ title: "\u062D\u0630\u0641 \u0627\u0644\u0635\u0641\u062D\u0629", message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 "${page.title}"\u061F`, type: "danger" });
    if (!confirmed)
      return;
    try {
      await this.api.deleteUiPage(this.bizId, page.id);
      this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0635\u0641\u062D\u0629");
      if (this.activePage()?.id === page.id) {
        this.activePage.set(null);
        this.viewMode.set("list");
      }
      await this.loadPages();
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0635\u0641\u062D\u0629");
    }
  }
  async openPage(page) {
    this.activePage.set(page);
    this.viewMode.set("page");
    this.loading.set(true);
    try {
      const result = await this.api.getUiPage(this.bizId, page.id);
      if (result) {
        this.pageComponents.set(result.components || []);
      }
      const ds = await this.api.getUiDataSources(this.bizId);
      this.dataSources.set(ds || []);
      await this.loadAllComponentData();
    } catch (e) {
      this.toast.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629");
    } finally {
      this.loading.set(false);
    }
  }
  async loadAllComponentData() {
    const data = {};
    for (const comp of this.pageComponents()) {
      if (comp.dataSourceId) {
        try {
          const result = await this.api.executeUiDataSource(this.bizId, comp.dataSourceId);
          data[comp.id] = result;
        } catch (e) {
          data[comp.id] = { error: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" };
        }
      }
    }
    this.componentData.set(data);
  }
  backToList() {
    this.viewMode.set("list");
    this.activePage.set(null);
  }
  toggleEditMode() {
    this.viewMode.set(this.viewMode() === "edit" ? "page" : "edit");
  }
  // ===================== Components CRUD =====================
  openAddComponent() {
    this.editingComponent.set(null);
    const nextY = this.pageComponents().length > 0 ? Math.max(...this.pageComponents().map((c) => c.positionY + c.height)) : 0;
    this.componentForm.set({ componentType: "stat_card", title: "", config: "{}", dataSourceId: 0, positionX: 0, positionY: nextY, width: 3, height: 2 });
    this.showComponentModal.set(true);
  }
  openEditComponent(comp) {
    this.editingComponent.set(comp);
    this.componentForm.set({
      componentType: comp.componentType,
      title: comp.title || "",
      config: JSON.stringify(comp.config || {}, null, 2),
      dataSourceId: comp.dataSourceId || 0,
      positionX: comp.positionX,
      positionY: comp.positionY,
      width: comp.width,
      height: comp.height
    });
    this.showComponentModal.set(true);
  }
  async saveComponent() {
    const form = this.componentForm();
    let config = {};
    try {
      config = JSON.parse(form.config || "{}");
    } catch (e) {
      this.toast.warning("JSON \u063A\u064A\u0631 \u0635\u0627\u0644\u062D \u0641\u064A \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");
      return;
    }
    this.saving.set(true);
    try {
      const data = __spreadProps(__spreadValues({}, form), { config, dataSourceId: form.dataSourceId || null });
      if (this.editingComponent()) {
        await this.api.updateUiComponent(this.bizId, this.editingComponent().id, data);
        this.toast.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0643\u0648\u0646");
      } else {
        await this.api.addUiComponent(this.bizId, this.activePage().id, data);
        this.toast.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0643\u0648\u0646");
      }
      this.showComponentModal.set(false);
      await this.openPage(this.activePage());
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0645\u0643\u0648\u0646");
    } finally {
      this.saving.set(false);
    }
  }
  async deleteComponent(comp) {
    const confirmed = await this.toast.confirm({ title: "\u062D\u0630\u0641 \u0627\u0644\u0645\u0643\u0648\u0646", message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 "${comp.title || comp.componentType}"\u061F`, type: "danger" });
    if (!confirmed)
      return;
    try {
      await this.api.deleteUiComponent(this.bizId, comp.id);
      this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0643\u0648\u0646");
      await this.openPage(this.activePage());
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u0643\u0648\u0646");
    }
  }
  // ===================== Data Sources CRUD =====================
  openDataSources() {
    this.showDataSourceModal.set(true);
    this.editingDataSource.set(null);
    this.dsForm.set({ name: "", sourceType: "table", tableName: "", queryTemplate: "", config: "{}" });
  }
  editDataSource(ds) {
    this.editingDataSource.set(ds);
    this.dsForm.set({
      name: ds.name,
      sourceType: ds.sourceType,
      tableName: ds.tableName || "",
      queryTemplate: ds.queryTemplate || "",
      config: JSON.stringify(ds.config || {}, null, 2)
    });
  }
  async saveDataSource() {
    const form = this.dsForm();
    if (!form.name) {
      this.toast.warning("\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
      return;
    }
    let config = {};
    try {
      config = JSON.parse(form.config || "{}");
    } catch (e) {
      this.toast.warning("JSON \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");
      return;
    }
    this.saving.set(true);
    try {
      const data = __spreadProps(__spreadValues({}, form), { config });
      if (this.editingDataSource()) {
        await this.api.updateUiDataSource(this.bizId, this.editingDataSource().id, data);
        this.toast.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
      } else {
        await this.api.createUiDataSource(this.bizId, data);
        this.toast.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
      }
      this.editingDataSource.set(null);
      this.dsForm.set({ name: "", sourceType: "table", tableName: "", queryTemplate: "", config: "{}" });
      const ds = await this.api.getUiDataSources(this.bizId);
      this.dataSources.set(ds || []);
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    } finally {
      this.saving.set(false);
    }
  }
  async deleteDataSource(ds) {
    const confirmed = await this.toast.confirm({ title: "\u062D\u0630\u0641 \u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A", message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 "${ds.name}"\u061F`, type: "danger" });
    if (!confirmed)
      return;
    try {
      await this.api.deleteUiDataSource(this.bizId, ds.id);
      this.toast.success("\u062A\u0645 \u062D\u0630\u0641 \u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
      const dsList = await this.api.getUiDataSources(this.bizId);
      this.dataSources.set(dsList || []);
    } catch (e) {
      this.toast.error(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    }
  }
  async previewDataSource(ds) {
    this.dsPreviewLoading.set(true);
    this.showDsPreview.set(true);
    try {
      const result = await this.api.executeUiDataSource(this.bizId, ds.id, { limit: 10 });
      this.dsPreviewData.set(result);
    } catch (e) {
      this.dsPreviewData.set({ error: e instanceof Error ? e.message : "\u062E\u0637\u0623" });
    } finally {
      this.dsPreviewLoading.set(false);
    }
  }
  // ===================== Helpers =====================
  getComponentTypeInfo(type) {
    return COMPONENT_TYPES.find((t) => t.value === type) || { label: type, icon: "widgets", desc: "" };
  }
  getDataSourceName(id) {
    return this.dataSources().find((ds) => ds.id === id)?.name || "-";
  }
  getComponentGridStyle(comp) {
    return {
      "grid-column": `${comp.positionX + 1} / span ${comp.width}`,
      "grid-row": `${comp.positionY + 1} / span ${comp.height}`
    };
  }
  getDataKeys(data) {
    if (data?.data?.length > 0)
      return Object.keys(data.data[0]);
    return [];
  }
  onComponentTypeChange(type) {
    const info = COMPONENT_TYPES.find((t) => t.value === type);
    if (info) {
      this.componentForm.update((f) => __spreadProps(__spreadValues({}, f), { componentType: type, width: info.defaultW, height: info.defaultH }));
    }
  }
  updatePageForm(field, value) {
    this.pageForm.update((f) => __spreadProps(__spreadValues({}, f), { [field]: value }));
  }
  updateComponentForm(field, value) {
    this.componentForm.update((f) => __spreadProps(__spreadValues({}, f), { [field]: value }));
  }
  updateDsForm(field, value) {
    this.dsForm.update((f) => __spreadProps(__spreadValues({}, f), { [field]: value }));
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275UiBuilderComponent_BaseFactory;
    return function UiBuilderComponent_Factory(__ngFactoryType__) {
      return (\u0275UiBuilderComponent_BaseFactory || (\u0275UiBuilderComponent_BaseFactory = \u0275\u0275getInheritedFactory(_UiBuilderComponent)))(__ngFactoryType__ || _UiBuilderComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UiBuilderComponent, selectors: [["app-ui-builder"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 5, vars: 5, consts: [[1, "builder-list"], [1, "page-view"], [1, "modal-overlay"], [1, "page-header"], [1, "material-icons-round"], [1, "header-actions"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-ghost", 3, "click"], [1, "loading-state"], [1, "empty-state"], [1, "pages-grid"], [1, "spinner"], [1, "page-card", 3, "--page-color"], [1, "page-card", 3, "click"], [1, "page-card-icon"], [1, "page-card-info"], [1, "page-card-actions", 3, "click"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "btn-icon", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "btn-icon", "danger", 3, "click"], [1, "page-view-header"], [1, "header-right"], ["title", "\u0631\u062C\u0648\u0639", 1, "btn-icon", 3, "click"], [1, "page-title-icon"], [1, "btn", "btn-sm", 3, "click"], [1, "btn", "btn-primary", "btn-sm"], ["title", "\u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A", 1, "btn-icon", 3, "click"], [1, "components-grid"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "component-card", 3, "style", "editing"], [1, "component-card"], [1, "component-toolbar"], [1, "component-content"], [1, "comp-title"], [1, "stat-card-content"], [1, "text-content"], [1, "chart-placeholder"], [1, "comp-type-badge"], [1, "toolbar-actions"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "btn-icon", "sm", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "btn-icon", "sm", "danger", 3, "click"], [1, "material-icons-round", "stat-icon"], [1, "stat-value"], [1, "stat-label"], [1, "data-table-wrapper"], [1, "no-data"], [1, "data-table"], ["frameborder", "0", 1, "iframe-embed", 3, "src"], [1, "list-content"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "btn-icon", 3, "click"], [1, "modal-body"], [1, "form-group"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: dashboard", "dir", "ltr", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["type", "text", "placeholder", "dashboard", "dir", "ltr", 3, "ngModelChange", "ngModel"], ["type", "color", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], ["value", "grid"], ["value", "flex"], ["value", "freeform"], [1, "modal-footer"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "modal-content", "modal-lg", 3, "click"], [1, "type-grid"], [1, "type-card", 3, "selected"], ["type", "text", "placeholder", "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0643\u0648\u0646", 3, "ngModelChange", "ngModel"], [3, "value"], ["type", "number", "min", "0", "max", "11", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", "max", "12", 3, "ngModelChange", "ngModel"], ["rows", "4", "dir", "ltr", "placeholder", '{"key": "value"}', 1, "code-input", 3, "ngModelChange", "ngModel"], [1, "type-card", 3, "click"], [1, "ds-list"], [1, "ds-form"], ["type", "text", "placeholder", "\u0627\u0633\u0645 \u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A", 3, "ngModelChange", "ngModel"], [1, "ds-preview"], [1, "ds-item", 3, "editing"], [1, "ds-item"], [1, "ds-info"], [1, "ds-actions"], ["title", "\u0645\u0639\u0627\u064A\u0646\u0629", 1, "btn-icon", "sm", 3, "click"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: accounts", "dir", "ltr", 3, "ngModelChange", "ngModel"], ["rows", "4", "dir", "ltr", "placeholder", "SELECT * FROM accounts WHERE business_id = :bizId", 1, "code-input", 3, "ngModelChange", "ngModel"], [1, "loading-state", "sm"], [1, "error-msg"], [1, "spinner", "sm"]], template: function UiBuilderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, UiBuilderComponent_Conditional_0_Template, 20, 1, "div", 0);
      \u0275\u0275conditionalCreate(1, UiBuilderComponent_Conditional_1_Template, 23, 12, "div", 1);
      \u0275\u0275conditionalCreate(2, UiBuilderComponent_Conditional_2_Template, 45, 9, "div", 2);
      \u0275\u0275conditionalCreate(3, UiBuilderComponent_Conditional_3_Template, 54, 11, "div", 2);
      \u0275\u0275conditionalCreate(4, UiBuilderComponent_Conditional_4_Template, 28, 9, "div", 2);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.viewMode() === "list" ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.viewMode() === "page" || ctx.viewMode() === "edit" ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showPageModal() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showComponentModal() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDataSourceModal() ? 4 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, JsonPipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background: #f8fafc;\n  font-family: "Tajawal", sans-serif;\n  direction: rtl;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 13px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #2563eb;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n}\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #64748b;\n}\n.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn.active[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.btn-icon[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.06);\n}\n.btn-icon.danger[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.btn-icon.sm[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n}\n.btn-icon.sm[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n  color: #475569;\n  margin-bottom: 4px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-family: inherit;\n  font-size: 13px;\n  transition: border 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.form-row[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.code-input[_ngcontent-%COMP%] {\n  font-family: "Fira Code", monospace;\n  font-size: 12px;\n  background: #1e293b;\n  color: #e2e8f0;\n  border-color: #334155;\n}\n.code-input[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e2e8f0;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n.spinner.sm[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border-width: 2px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #475569;\n  margin: 0;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.error-msg[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.08);\n  color: #ef4444;\n  padding: 12px;\n  border-radius: 8px;\n  font-size: 13px;\n}\n.builder-list[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 22px;\n  color: #1e293b;\n  margin: 0 0 6px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  margin: 0 0 16px;\n  font-size: 14px;\n}\n.page-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.pages-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 16px;\n}\n.page-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px;\n  background: white;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  cursor: pointer;\n  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.page-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n  border-color: var(--page-color);\n}\n.page-card-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.page-card-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 24px;\n}\n.page-card-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.page-card-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  color: #1e293b;\n}\n.page-card-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 2px 0 0;\n  font-size: 12px;\n  color: #94a3b8;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.page-card-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #cbd5e1;\n}\n.page-card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.page-view[_ngcontent-%COMP%] {\n  min-height: 100vh;\n}\n.page-view-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  background: white;\n  border-bottom: 1px solid #e2e8f0;\n}\n.page-view-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-view-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.page-view-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  color: #1e293b;\n}\n.page-title-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.page-title-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 20px;\n}\n.components-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 16px;\n  padding: 24px;\n  auto-rows: 60px;\n}\n.component-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  overflow: hidden;\n  transition: all 0.25s;\n  position: relative;\n}\n.component-card.editing[_ngcontent-%COMP%] {\n  border: 2px dashed rgba(59, 130, 246, 0.4);\n}\n.component-card.editing[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n}\n.component-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 6px 10px;\n  background: rgba(59, 130, 246, 0.04);\n  border-bottom: 1px solid rgba(59, 130, 246, 0.1);\n}\n.component-toolbar[_ngcontent-%COMP%]   .comp-type-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #3b82f6;\n  font-weight: 600;\n}\n.component-toolbar[_ngcontent-%COMP%]   .toolbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n}\n.component-content[_ngcontent-%COMP%] {\n  padding: 14px;\n  height: calc(100% - 40px);\n  overflow: auto;\n}\n.comp-title[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 13px;\n  color: #475569;\n  font-weight: 600;\n}\n.stat-card-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  text-align: center;\n}\n.stat-card-content[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-bottom: 4px;\n}\n.stat-card-content[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1e293b;\n}\n.stat-card-content[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #94a3b8;\n}\n.data-table-wrapper[_ngcontent-%COMP%] {\n  overflow: auto;\n  max-height: 100%;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12px;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  padding: 8px 10px;\n  text-align: right;\n  font-weight: 600;\n  color: #475569;\n  border-bottom: 1px solid #e2e8f0;\n  white-space: nowrap;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 6px 10px;\n  border-bottom: 1px solid #f1f5f9;\n  color: #334155;\n}\n.text-content[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #475569;\n  line-height: 1.7;\n  white-space: pre-wrap;\n}\n.chart-placeholder[_ngcontent-%COMP%], \n.no-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  color: #94a3b8;\n}\n.chart-placeholder[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%], \n.no-data[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 36px;\n  opacity: 0.3;\n}\n.chart-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.no-data[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 12px;\n}\n.iframe-embed[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border: none;\n}\n.list-content[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.list-content[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-bottom: 1px solid #f1f5f9;\n  font-size: 13px;\n  color: #334155;\n}\n.list-content[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border: none;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.4);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  width: 90%;\n  max-width: 520px;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);\n}\n.modal-content.modal-lg[_ngcontent-%COMP%] {\n  max-width: 720px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  padding: 12px 20px;\n  border-top: 1px solid #e2e8f0;\n}\n.type-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-top: 4px;\n}\n.type-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 12px 8px;\n  border: 2px solid #e2e8f0;\n  border-radius: 10px;\n  background: white;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-align: center;\n}\n.type-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #94a3b8;\n}\n.type-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #475569;\n}\n.type-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #94a3b8;\n}\n.type-card.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.04);\n}\n.type-card.selected[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.type-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(59, 130, 246, 0.4);\n}\n.ds-list[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.ds-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 14px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  transition: all 0.2s;\n}\n.ds-item.editing[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.02);\n}\n.ds-item[_ngcontent-%COMP%]   .ds-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.ds-item[_ngcontent-%COMP%]   .ds-info[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 20px;\n}\n.ds-item[_ngcontent-%COMP%]   .ds-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #1e293b;\n  display: block;\n}\n.ds-item[_ngcontent-%COMP%]   .ds-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #94a3b8;\n}\n.ds-item[_ngcontent-%COMP%]   .ds-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n}\n.ds-form[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-radius: 12px;\n  padding: 16px;\n  margin-top: 16px;\n}\n.ds-form[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  font-size: 14px;\n  color: #475569;\n}\n.ds-preview[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 16px;\n  background: #f8fafc;\n  border-radius: 12px;\n}\n.ds-preview[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  font-size: 14px;\n  color: #475569;\n}\n.ds-preview[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 11px;\n}\n@media (max-width: 768px) {\n  .builder-list[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .pages-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .page-view-header[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 8px;\n    padding: 12px 16px;\n  }\n  .components-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(6, 1fr);\n    padding: 16px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .type-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    width: 95%;\n    margin: 10px;\n  }\n}\n@media (min-width: 769px) and (max-width: 1024px) {\n  .components-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(8, 1fr);\n  }\n}\n/*# sourceMappingURL=ui-builder.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UiBuilderComponent, [{
    type: Component,
    args: [{ selector: "app-ui-builder", standalone: true, imports: [CommonModule, FormsModule, JsonPipe, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<!-- ======================== PAGES LIST ======================== -->\r
@if (viewMode() === 'list') {\r
  <div class="builder-list">\r
    <div class="page-header">\r
      <h1><span class="material-icons-round">dashboard_customize</span> \u0628\u0646\u0627\u0621 \u0627\u0644\u0648\u0627\u062C\u0647\u0627\u062A</h1>\r
      <p>\u0625\u0646\u0634\u0627\u0621 \u0635\u0641\u062D\u0627\u062A \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629 \u0645\u062E\u0635\u0635\u0629 \u0645\u0639 \u0645\u0643\u0648\u0646\u0627\u062A \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u062E\u0635\u064A\u0635</p>\r
      <div class="header-actions">\r
        <button class="btn btn-primary" (click)="openCreatePage()">\r
          <span class="material-icons-round">add</span> \u0635\u0641\u062D\u0629 \u062C\u062F\u064A\u062F\u0629\r
        </button>\r
        <button class="btn btn-ghost" (click)="openDataSources()">\r
          <span class="material-icons-round">storage</span> \u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A\r
        </button>\r
      </div>\r
    </div>\r
\r
    @if (loading()) {\r
      <div class="loading-state"><div class="spinner"></div><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
    } @else if (pages().length === 0) {\r
      <div class="empty-state">\r
        <span class="material-icons-round">dashboard_customize</span>\r
        <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u062D\u0627\u062A \u0628\u0639\u062F</h3>\r
        <p>\u0623\u0646\u0634\u0626 \u0635\u0641\u062D\u062A\u0643 \u0627\u0644\u0623\u0648\u0644\u0649 \u0644\u0628\u062F\u0621 \u0628\u0646\u0627\u0621 \u0648\u0627\u062C\u0647\u0627\u062A \u0645\u062E\u0635\u0635\u0629</p>\r
        <button class="btn btn-primary" (click)="openCreatePage()">\r
          <span class="material-icons-round">add</span> \u0625\u0646\u0634\u0627\u0621 \u0635\u0641\u062D\u0629\r
        </button>\r
      </div>\r
    } @else {\r
      <div class="pages-grid">\r
        @for (page of pages(); track page.id) {\r
          <div class="page-card" (click)="openPage(page)" [style.--page-color]="page.color || '#3b82f6'">\r
            <div class="page-card-icon" [style.background]="page.color || '#3b82f6'">\r
              <span class="material-icons-round">{{ page.icon || 'dashboard' }}</span>\r
            </div>\r
            <div class="page-card-info">\r
              <h3>{{ page.title }}</h3>\r
              <p>{{ page.description || '\u0628\u062F\u0648\u0646 \u0648\u0635\u0641' }}</p>\r
              <small>{{ page.pageKey }} &bull; {{ page.layout }}</small>\r
            </div>\r
            <div class="page-card-actions" (click)="$event.stopPropagation()">\r
              <button class="btn-icon" (click)="openEditPage(page)" title="\u062A\u0639\u062F\u064A\u0644"><span class="material-icons-round">edit</span></button>\r
              <button class="btn-icon danger" (click)="deletePage(page)" title="\u062D\u0630\u0641"><span class="material-icons-round">delete</span></button>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    }\r
  </div>\r
}\r
\r
<!-- ======================== PAGE VIEW ======================== -->\r
@if (viewMode() === 'page' || viewMode() === 'edit') {\r
  <div class="page-view">\r
    <div class="page-view-header" [style.--page-color]="activePage()!.color || '#3b82f6'">\r
      <div class="header-right">\r
        <button class="btn-icon" (click)="backToList()" title="\u0631\u062C\u0648\u0639">\r
          <span class="material-icons-round">arrow_forward</span>\r
        </button>\r
        <div class="page-title-icon" [style.background]="activePage()!.color || '#3b82f6'">\r
          <span class="material-icons-round">{{ activePage()!.icon || 'dashboard' }}</span>\r
        </div>\r
        <h2>{{ activePage()!.title }}</h2>\r
      </div>\r
      <div class="header-actions">\r
        <button class="btn btn-sm" [class.active]="viewMode() === 'edit'" (click)="toggleEditMode()">\r
          <span class="material-icons-round">{{ viewMode() === 'edit' ? 'visibility' : 'edit' }}</span>\r
          {{ viewMode() === 'edit' ? '\u0645\u0639\u0627\u064A\u0646\u0629' : '\u062A\u0639\u062F\u064A\u0644' }}\r
        </button>\r
        @if (viewMode() === 'edit') {\r
          <button class="btn btn-primary btn-sm" (click)="openAddComponent()">\r
            <span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0645\u0643\u0648\u0646\r
          </button>\r
        }\r
        <button class="btn-icon" (click)="openDataSources()" title="\u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A">\r
          <span class="material-icons-round">storage</span>\r
        </button>\r
      </div>\r
    </div>\r
\r
    @if (loading()) {\r
      <div class="loading-state"><div class="spinner"></div><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
    } @else if (pageComponents().length === 0) {\r
      <div class="empty-state">\r
        <span class="material-icons-round">widgets</span>\r
        <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0643\u0648\u0646\u0627\u062A \u0628\u0639\u062F</h3>\r
        <p>\u0623\u0636\u0641 \u0645\u0643\u0648\u0646\u0627\u062A \u0644\u0628\u0646\u0627\u0621 \u0635\u0641\u062D\u062A\u0643</p>\r
        <button class="btn btn-primary" (click)="openAddComponent()">\r
          <span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0645\u0643\u0648\u0646\r
        </button>\r
      </div>\r
    } @else {\r
      <div class="components-grid">\r
        @for (comp of pageComponents(); track comp.id) {\r
          <div class="component-card" [style]="getComponentGridStyle(comp)" [class.editing]="viewMode() === 'edit'">\r
            @if (viewMode() === 'edit') {\r
              <div class="component-toolbar">\r
                <span class="comp-type-badge">{{ getComponentTypeInfo(comp.componentType).label }}</span>\r
                <div class="toolbar-actions">\r
                  <button class="btn-icon sm" (click)="openEditComponent(comp)" title="\u062A\u0639\u062F\u064A\u0644"><span class="material-icons-round">edit</span></button>\r
                  <button class="btn-icon sm danger" (click)="deleteComponent(comp)" title="\u062D\u0630\u0641"><span class="material-icons-round">delete</span></button>\r
                </div>\r
              </div>\r
            }\r
            <div class="component-content">\r
              @if (comp.title) { <h4 class="comp-title">{{ comp.title }}</h4> }\r
\r
              <!-- Stat Card -->\r
              @if (comp.componentType === 'stat_card') {\r
                <div class="stat-card-content">\r
                  <span class="material-icons-round stat-icon" [style.color]="comp.config?.color || activePage()!.color">{{ comp.config?.icon || 'analytics' }}</span>\r
                  <div class="stat-value">{{ componentData()[comp.id]?.data?.[0] ? (componentData()[comp.id].data[0][comp.config?.valueField || 'value'] || '0') : (comp.config?.staticValue || '0') }}</div>\r
                  <div class="stat-label">{{ comp.config?.label || comp.title || '\u0625\u062D\u0635\u0627\u0626\u064A\u0629' }}</div>\r
                </div>\r
              }\r
\r
              <!-- Data Table -->\r
              @if (comp.componentType === 'data_table') {\r
                @if (componentData()[comp.id]?.data?.length) {\r
                  <div class="data-table-wrapper">\r
                    <table class="data-table">\r
                      <thead><tr>\r
                        @for (key of getDataKeys(componentData()[comp.id]); track key) { <th>{{ key }}</th> }\r
                      </tr></thead>\r
                      <tbody>\r
                        @for (row of componentData()[comp.id].data; track $index) {\r
                          <tr>\r
                            @for (key of getDataKeys(componentData()[comp.id]); track key) { <td>{{ row[key] }}</td> }\r
                          </tr>\r
                        }\r
                      </tbody>\r
                    </table>\r
                  </div>\r
                } @else {\r
                  <div class="no-data"><span class="material-icons-round">table_chart</span><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p></div>\r
                }\r
              }\r
\r
              <!-- Text -->\r
              @if (comp.componentType === 'text') {\r
                <div class="text-content">{{ comp.config?.text || '\u0646\u0635 \u0641\u0627\u0631\u063A' }}</div>\r
              }\r
\r
              <!-- Chart placeholder -->\r
              @if (comp.componentType === 'chart') {\r
                <div class="chart-placeholder">\r
                  <span class="material-icons-round">bar_chart</span>\r
                  <p>\u0631\u0633\u0645 \u0628\u064A\u0627\u0646\u064A{{ comp.dataSourceId ? ' (\u0645\u0635\u062F\u0631: ' + getDataSourceName(comp.dataSourceId) + ')' : '' }}</p>\r
                </div>\r
              }\r
\r
              <!-- iFrame -->\r
              @if (comp.componentType === 'iframe') {\r
                @if (comp.config?.url) {\r
                  <iframe [src]="comp.config.url" class="iframe-embed" frameborder="0"></iframe>\r
                } @else {\r
                  <div class="no-data"><span class="material-icons-round">web</span><p>\u0623\u062F\u062E\u0644 \u0631\u0627\u0628\u0637 URL \u0641\u064A \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A</p></div>\r
                }\r
              }\r
\r
              <!-- List -->\r
              @if (comp.componentType === 'list') {\r
                @if (componentData()[comp.id]?.data?.length) {\r
                  <ul class="list-content">\r
                    @for (item of componentData()[comp.id].data; track $index) {\r
                      <li>{{ item[comp.config?.labelField || 'name'] || (item | json) }}</li>\r
                    }\r
                  </ul>\r
                } @else {\r
                  <div class="no-data"><span class="material-icons-round">list</span><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631</p></div>\r
                }\r
              }\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    }\r
  </div>\r
}\r
\r
<!-- ======================== PAGE MODAL ======================== -->\r
@if (showPageModal()) {\r
  <div class="modal-overlay" (click)="showPageModal.set(false)">\r
    <div class="modal-content" (click)="$event.stopPropagation()">\r
      <div class="modal-header">\r
        <h3>{{ editingPage() ? '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629' : '\u0635\u0641\u062D\u0629 \u062C\u062F\u064A\u062F\u0629' }}</h3>\r
        <button class="btn-icon" (click)="showPageModal.set(false)"><span class="material-icons-round">close</span></button>\r
      </div>\r
      <div class="modal-body">\r
        <div class="form-group">\r
          <label>\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u0641\u062D\u0629</label>\r
          <input type="text" [ngModel]="pageForm().title" (ngModelChange)="updatePageForm('title', $event)" placeholder="\u0645\u062B\u0627\u0644: \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645">\r
        </div>\r
        <div class="form-group">\r
          <label>\u0627\u0644\u0645\u0641\u062A\u0627\u062D (pageKey)</label>\r
          <input type="text" [ngModel]="pageForm().pageKey" (ngModelChange)="updatePageForm('pageKey', $event)" placeholder="\u0645\u062B\u0627\u0644: dashboard" dir="ltr">\r
        </div>\r
        <div class="form-group">\r
          <label>\u0627\u0644\u0648\u0635\u0641</label>\r
          <input type="text" [ngModel]="pageForm().description" (ngModelChange)="updatePageForm('description', $event)" placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)">\r
        </div>\r
        <div class="form-row">\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
            <input type="text" [ngModel]="pageForm().icon" (ngModelChange)="updatePageForm('icon', $event)" placeholder="dashboard" dir="ltr">\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0644\u0648\u0646</label>\r
            <input type="color" [ngModel]="pageForm().color" (ngModelChange)="updatePageForm('color', $event)">\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u062A\u062E\u0637\u064A\u0637</label>\r
            <select [ngModel]="pageForm().layout" (ngModelChange)="updatePageForm('layout', $event)">\r
              <option value="grid">\u0634\u0628\u0643\u0629 (Grid)</option>\r
              <option value="flex">\u0645\u0631\u0646 (Flex)</option>\r
              <option value="freeform">\u062D\u0631 (Freeform)</option>\r
            </select>\r
          </div>\r
        </div>\r
      </div>\r
      <div class="modal-footer">\r
        <button class="btn btn-ghost" (click)="showPageModal.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        <button class="btn btn-primary" (click)="savePage()" [disabled]="saving()">\r
          {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : editingPage() ? '\u062A\u062D\u062F\u064A\u062B' : '\u0625\u0646\u0634\u0627\u0621' }}\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
<!-- ======================== COMPONENT MODAL ======================== -->\r
@if (showComponentModal()) {\r
  <div class="modal-overlay" (click)="showComponentModal.set(false)">\r
    <div class="modal-content modal-lg" (click)="$event.stopPropagation()">\r
      <div class="modal-header">\r
        <h3>{{ editingComponent() ? '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0643\u0648\u0646' : '\u0625\u0636\u0627\u0641\u0629 \u0645\u0643\u0648\u0646' }}</h3>\r
        <button class="btn-icon" (click)="showComponentModal.set(false)"><span class="material-icons-round">close</span></button>\r
      </div>\r
      <div class="modal-body">\r
        <div class="form-group">\r
          <label>\u0646\u0648\u0639 \u0627\u0644\u0645\u0643\u0648\u0646</label>\r
          <div class="type-grid">\r
            @for (ct of componentTypes; track ct.value) {\r
              <button class="type-card" [class.selected]="componentForm().componentType === ct.value" (click)="onComponentTypeChange(ct.value)">\r
                <span class="material-icons-round">{{ ct.icon }}</span>\r
                <strong>{{ ct.label }}</strong>\r
                <small>{{ ct.desc }}</small>\r
              </button>\r
            }\r
          </div>\r
        </div>\r
        <div class="form-group">\r
          <label>\u0627\u0644\u0639\u0646\u0648\u0627\u0646</label>\r
          <input type="text" [ngModel]="componentForm().title" (ngModelChange)="updateComponentForm('title', $event)" placeholder="\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u0643\u0648\u0646">\r
        </div>\r
        <div class="form-row">\r
          <div class="form-group">\r
            <label>\u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</label>\r
            <select [ngModel]="componentForm().dataSourceId" (ngModelChange)="updateComponentForm('dataSourceId', +$event)">\r
              <option [value]="0">\u0628\u062F\u0648\u0646 \u0645\u0635\u062F\u0631</option>\r
              @for (ds of dataSources(); track ds.id) {\r
                <option [value]="ds.id">{{ ds.name }}</option>\r
              }\r
            </select>\r
          </div>\r
        </div>\r
        <div class="form-row">\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0645\u0648\u0642\u0639 X</label>\r
            <input type="number" [ngModel]="componentForm().positionX" (ngModelChange)="updateComponentForm('positionX', +$event)" min="0" max="11">\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0645\u0648\u0642\u0639 Y</label>\r
            <input type="number" [ngModel]="componentForm().positionY" (ngModelChange)="updateComponentForm('positionY', +$event)" min="0">\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0639\u0631\u0636</label>\r
            <input type="number" [ngModel]="componentForm().width" (ngModelChange)="updateComponentForm('width', +$event)" min="1" max="12">\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639</label>\r
            <input type="number" [ngModel]="componentForm().height" (ngModelChange)="updateComponentForm('height', +$event)" min="1" max="12">\r
          </div>\r
        </div>\r
        <div class="form-group">\r
          <label>\u0625\u0639\u062F\u0627\u062F\u0627\u062A JSON</label>\r
          <textarea [ngModel]="componentForm().config" (ngModelChange)="updateComponentForm('config', $event)" rows="4" dir="ltr" class="code-input" placeholder='{"key": "value"}'></textarea>\r
        </div>\r
      </div>\r
      <div class="modal-footer">\r
        <button class="btn btn-ghost" (click)="showComponentModal.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        <button class="btn btn-primary" (click)="saveComponent()" [disabled]="saving()">\r
          {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : editingComponent() ? '\u062A\u062D\u062F\u064A\u062B' : '\u0625\u0636\u0627\u0641\u0629' }}\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
<!-- ======================== DATA SOURCE MODAL ======================== -->\r
@if (showDataSourceModal()) {\r
  <div class="modal-overlay" (click)="showDataSourceModal.set(false)">\r
    <div class="modal-content modal-lg" (click)="$event.stopPropagation()">\r
      <div class="modal-header">\r
        <h3>\u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</h3>\r
        <button class="btn-icon" (click)="showDataSourceModal.set(false)"><span class="material-icons-round">close</span></button>\r
      </div>\r
      <div class="modal-body">\r
        <!-- Existing Data Sources -->\r
        @if (dataSources().length > 0) {\r
          <div class="ds-list">\r
            @for (ds of dataSources(); track ds.id) {\r
              <div class="ds-item" [class.editing]="editingDataSource()?.id === ds.id">\r
                <div class="ds-info">\r
                  <span class="material-icons-round">{{ ds.sourceType === 'table' ? 'storage' : 'code' }}</span>\r
                  <div>\r
                    <strong>{{ ds.name }}</strong>\r
                    <small>{{ ds.sourceType === 'table' ? ds.tableName : '\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0645\u062E\u0635\u0635' }}</small>\r
                  </div>\r
                </div>\r
                <div class="ds-actions">\r
                  <button class="btn-icon sm" (click)="previewDataSource(ds)" title="\u0645\u0639\u0627\u064A\u0646\u0629"><span class="material-icons-round">visibility</span></button>\r
                  <button class="btn-icon sm" (click)="editDataSource(ds)" title="\u062A\u0639\u062F\u064A\u0644"><span class="material-icons-round">edit</span></button>\r
                  <button class="btn-icon sm danger" (click)="deleteDataSource(ds)" title="\u062D\u0630\u0641"><span class="material-icons-round">delete</span></button>\r
                </div>\r
              </div>\r
            }\r
          </div>\r
        }\r
\r
        <!-- Create/Edit Form -->\r
        <div class="ds-form">\r
          <h4>{{ editingDataSource() ? '\u062A\u0639\u062F\u064A\u0644 \u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A' : '\u0625\u0636\u0627\u0641\u0629 \u0645\u0635\u062F\u0631 \u0628\u064A\u0627\u0646\u0627\u062A \u062C\u062F\u064A\u062F' }}</h4>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0627\u0633\u0645</label>\r
            <input type="text" [ngModel]="dsForm().name" (ngModelChange)="updateDsForm('name', $event)" placeholder="\u0627\u0633\u0645 \u0645\u0635\u062F\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A">\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0646\u0648\u0639</label>\r
            <select [ngModel]="dsForm().sourceType" (ngModelChange)="updateDsForm('sourceType', $event)">\r
              @for (st of sourceTypes; track st.value) {\r
                <option [value]="st.value">{{ st.label }}</option>\r
              }\r
            </select>\r
          </div>\r
          @if (dsForm().sourceType === 'table') {\r
            <div class="form-group">\r
              <label>\u0627\u0633\u0645 \u0627\u0644\u062C\u062F\u0648\u0644</label>\r
              <input type="text" [ngModel]="dsForm().tableName" (ngModelChange)="updateDsForm('tableName', $event)" placeholder="\u0645\u062B\u0627\u0644: accounts" dir="ltr">\r
            </div>\r
          }\r
          @if (dsForm().sourceType === 'query') {\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 (\u0627\u0633\u062A\u062E\u062F\u0645 {{ '{' }}bizId{{ '}' }} \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u062D\u0627\u0644\u064A)</label>\r
              <textarea [ngModel]="dsForm().queryTemplate" (ngModelChange)="updateDsForm('queryTemplate', $event)" rows="4" dir="ltr" class="code-input" placeholder="SELECT * FROM accounts WHERE business_id = :bizId"></textarea>\r
            </div>\r
          }\r
          <button class="btn btn-primary" (click)="saveDataSource()" [disabled]="saving()">\r
            {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : editingDataSource() ? '\u062A\u062D\u062F\u064A\u062B' : '\u0625\u0636\u0627\u0641\u0629' }}\r
          </button>\r
        </div>\r
\r
        <!-- Preview -->\r
        @if (showDsPreview()) {\r
          <div class="ds-preview">\r
            <h4>\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</h4>\r
            @if (dsPreviewLoading()) {\r
              <div class="loading-state sm"><div class="spinner sm"></div></div>\r
            } @else if (dsPreviewData()?.error) {\r
              <div class="error-msg">{{ dsPreviewData().error }}</div>\r
            } @else if (dsPreviewData()?.data?.length) {\r
              <div class="data-table-wrapper">\r
                <table class="data-table">\r
                  <thead><tr>\r
                    @for (key of getDataKeys(dsPreviewData()); track key) { <th>{{ key }}</th> }\r
                  </tr></thead>\r
                  <tbody>\r
                    @for (row of dsPreviewData().data; track $index) {\r
                      <tr>\r
                        @for (key of getDataKeys(dsPreviewData()); track key) { <td>{{ row[key] }}</td> }\r
                      </tr>\r
                    }\r
                  </tbody>\r
                </table>\r
              </div>\r
              <small>\u0625\u062C\u0645\u0627\u0644\u064A: {{ dsPreviewData().total }} \u0633\u062C\u0644 (\u0639\u0631\u0636 \u0623\u0648\u0644 10)</small>\r
            } @else {\r
              <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</p>\r
            }\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
}\r
`, styles: ['/* src/app/pages/ui-builder/ui-builder.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  background: #f8fafc;\n  font-family: "Tajawal", sans-serif;\n  direction: rtl;\n}\n.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 16px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 13px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.btn-primary {\n  background: #3b82f6;\n  color: white;\n}\n.btn-primary:hover {\n  background: #2563eb;\n}\n.btn-primary:disabled {\n  opacity: 0.5;\n}\n.btn-ghost {\n  background: transparent;\n  color: #64748b;\n}\n.btn-ghost:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.btn-sm {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn.active {\n  background: #3b82f6;\n  color: white;\n}\n.btn-icon {\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.btn-icon:hover {\n  background: rgba(0, 0, 0, 0.06);\n}\n.btn-icon.danger:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.btn-icon.sm {\n  width: 28px;\n  height: 28px;\n}\n.btn-icon.sm .material-icons-round {\n  font-size: 18px;\n}\n.form-group {\n  margin-bottom: 14px;\n}\n.form-group label {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n  color: #475569;\n  margin-bottom: 4px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-family: inherit;\n  font-size: 13px;\n  transition: border 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-row {\n  display: flex;\n  gap: 12px;\n}\n.form-row .form-group {\n  flex: 1;\n}\n.code-input {\n  font-family: "Fira Code", monospace;\n  font-size: 12px;\n  background: #1e293b;\n  color: #e2e8f0;\n  border-color: #334155;\n}\n.code-input:focus {\n  border-color: #3b82f6;\n}\n.spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e2e8f0;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n.spinner.sm {\n  width: 20px;\n  height: 20px;\n  border-width: 2px;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-state h3 {\n  color: #475569;\n  margin: 0;\n}\n.loading-state p {\n  margin: 0;\n}\n.error-msg {\n  background: rgba(239, 68, 68, 0.08);\n  color: #ef4444;\n  padding: 12px;\n  border-radius: 8px;\n  font-size: 13px;\n}\n.builder-list {\n  padding: 24px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-header {\n  margin-bottom: 24px;\n}\n.page-header h1 {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 22px;\n  color: #1e293b;\n  margin: 0 0 6px;\n}\n.page-header h1 .material-icons-round {\n  color: #3b82f6;\n}\n.page-header p {\n  color: #64748b;\n  margin: 0 0 16px;\n  font-size: 14px;\n}\n.page-header .header-actions {\n  display: flex;\n  gap: 8px;\n}\n.pages-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 16px;\n}\n.page-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px;\n  background: white;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  cursor: pointer;\n  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.page-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n  border-color: var(--page-color);\n}\n.page-card-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.page-card-icon .material-icons-round {\n  color: white;\n  font-size: 24px;\n}\n.page-card-info {\n  flex: 1;\n  min-width: 0;\n}\n.page-card-info h3 {\n  margin: 0;\n  font-size: 15px;\n  color: #1e293b;\n}\n.page-card-info p {\n  margin: 2px 0 0;\n  font-size: 12px;\n  color: #94a3b8;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.page-card-info small {\n  font-size: 11px;\n  color: #cbd5e1;\n}\n.page-card-actions {\n  display: flex;\n  gap: 4px;\n}\n.page-view {\n  min-height: 100vh;\n}\n.page-view-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  background: white;\n  border-bottom: 1px solid #e2e8f0;\n}\n.page-view-header .header-right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-view-header .header-actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.page-view-header h2 {\n  margin: 0;\n  font-size: 18px;\n  color: #1e293b;\n}\n.page-title-icon {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.page-title-icon .material-icons-round {\n  color: white;\n  font-size: 20px;\n}\n.components-grid {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 16px;\n  padding: 24px;\n  auto-rows: 60px;\n}\n.component-card {\n  background: white;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  overflow: hidden;\n  transition: all 0.25s;\n  position: relative;\n}\n.component-card.editing {\n  border: 2px dashed rgba(59, 130, 246, 0.4);\n}\n.component-card.editing:hover {\n  border-color: #3b82f6;\n}\n.component-toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 6px 10px;\n  background: rgba(59, 130, 246, 0.04);\n  border-bottom: 1px solid rgba(59, 130, 246, 0.1);\n}\n.component-toolbar .comp-type-badge {\n  font-size: 11px;\n  color: #3b82f6;\n  font-weight: 600;\n}\n.component-toolbar .toolbar-actions {\n  display: flex;\n  gap: 2px;\n}\n.component-content {\n  padding: 14px;\n  height: calc(100% - 40px);\n  overflow: auto;\n}\n.comp-title {\n  margin: 0 0 8px;\n  font-size: 13px;\n  color: #475569;\n  font-weight: 600;\n}\n.stat-card-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  text-align: center;\n}\n.stat-card-content .stat-icon {\n  font-size: 32px;\n  margin-bottom: 4px;\n}\n.stat-card-content .stat-value {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1e293b;\n}\n.stat-card-content .stat-label {\n  font-size: 12px;\n  color: #94a3b8;\n}\n.data-table-wrapper {\n  overflow: auto;\n  max-height: 100%;\n}\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12px;\n}\n.data-table th {\n  background: #f8fafc;\n  padding: 8px 10px;\n  text-align: right;\n  font-weight: 600;\n  color: #475569;\n  border-bottom: 1px solid #e2e8f0;\n  white-space: nowrap;\n}\n.data-table td {\n  padding: 6px 10px;\n  border-bottom: 1px solid #f1f5f9;\n  color: #334155;\n}\n.text-content {\n  font-size: 14px;\n  color: #475569;\n  line-height: 1.7;\n  white-space: pre-wrap;\n}\n.chart-placeholder,\n.no-data {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  color: #94a3b8;\n}\n.chart-placeholder .material-icons-round,\n.no-data .material-icons-round {\n  font-size: 36px;\n  opacity: 0.3;\n}\n.chart-placeholder p,\n.no-data p {\n  margin: 4px 0 0;\n  font-size: 12px;\n}\n.iframe-embed {\n  width: 100%;\n  height: 100%;\n  border: none;\n}\n.list-content {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.list-content li {\n  padding: 8px 12px;\n  border-bottom: 1px solid #f1f5f9;\n  font-size: 13px;\n  color: #334155;\n}\n.list-content li:last-child {\n  border: none;\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.4);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-content {\n  background: white;\n  border-radius: 16px;\n  width: 90%;\n  max-width: 520px;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);\n}\n.modal-content.modal-lg {\n  max-width: 720px;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.modal-header h3 {\n  margin: 0;\n  font-size: 16px;\n}\n.modal-body {\n  padding: 20px;\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  padding: 12px 20px;\n  border-top: 1px solid #e2e8f0;\n}\n.type-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-top: 4px;\n}\n.type-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 12px 8px;\n  border: 2px solid #e2e8f0;\n  border-radius: 10px;\n  background: white;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-align: center;\n}\n.type-card .material-icons-round {\n  font-size: 24px;\n  color: #94a3b8;\n}\n.type-card strong {\n  font-size: 12px;\n  color: #475569;\n}\n.type-card small {\n  font-size: 10px;\n  color: #94a3b8;\n}\n.type-card.selected {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.04);\n}\n.type-card.selected .material-icons-round {\n  color: #3b82f6;\n}\n.type-card:hover {\n  border-color: rgba(59, 130, 246, 0.4);\n}\n.ds-list {\n  margin-bottom: 20px;\n}\n.ds-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 14px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  transition: all 0.2s;\n}\n.ds-item.editing {\n  border-color: #3b82f6;\n  background: rgba(59, 130, 246, 0.02);\n}\n.ds-item .ds-info {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.ds-item .ds-info .material-icons-round {\n  color: #94a3b8;\n  font-size: 20px;\n}\n.ds-item .ds-info strong {\n  font-size: 13px;\n  color: #1e293b;\n  display: block;\n}\n.ds-item .ds-info small {\n  font-size: 11px;\n  color: #94a3b8;\n}\n.ds-item .ds-actions {\n  display: flex;\n  gap: 2px;\n}\n.ds-form {\n  background: #f8fafc;\n  border-radius: 12px;\n  padding: 16px;\n  margin-top: 16px;\n}\n.ds-form h4 {\n  margin: 0 0 12px;\n  font-size: 14px;\n  color: #475569;\n}\n.ds-preview {\n  margin-top: 16px;\n  padding: 16px;\n  background: #f8fafc;\n  border-radius: 12px;\n}\n.ds-preview h4 {\n  margin: 0 0 12px;\n  font-size: 14px;\n  color: #475569;\n}\n.ds-preview small {\n  color: #94a3b8;\n  font-size: 11px;\n}\n@media (max-width: 768px) {\n  .builder-list {\n    padding: 16px;\n  }\n  .pages-grid {\n    grid-template-columns: 1fr;\n  }\n  .page-view-header {\n    flex-wrap: wrap;\n    gap: 8px;\n    padding: 12px 16px;\n  }\n  .components-grid {\n    grid-template-columns: repeat(6, 1fr);\n    padding: 16px;\n  }\n  .form-row {\n    flex-direction: column;\n  }\n  .type-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .modal-content {\n    width: 95%;\n    margin: 10px;\n  }\n}\n@media (min-width: 769px) and (max-width: 1024px) {\n  .components-grid {\n    grid-template-columns: repeat(8, 1fr);\n  }\n}\n/*# sourceMappingURL=ui-builder.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UiBuilderComponent, { className: "UiBuilderComponent", filePath: "src/app/pages/ui-builder/ui-builder.ts", lineNumber: 75 });
})();
export {
  UiBuilderComponent
};
//# sourceMappingURL=chunk-N46JZLYH.js.map
