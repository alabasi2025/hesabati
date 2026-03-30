import {
  ThemeService
} from "./chunk-WIHW6D6J.js";
import {
  FormsModule,
  NgSelectOption,
  ɵNgSelectMultipleOption
} from "./chunk-6OZ2GPXU.js";
import {
  BusinessService
} from "./chunk-5SFBIGEU.js";
import {
  ApiService
} from "./chunk-MSEJWZ7D.js";
import {
  ActivatedRoute,
  AuthService,
  CommonModule,
  Component,
  Router,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
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
  ɵɵtextInterpolate2
} from "./chunk-VUZEB5JS.js";

// src/app/pages/business-select/business-select.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.value;
function BusinessSelectComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.noAccessMessage());
  }
}
function BusinessSelectComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "div", 18);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function BusinessSelectComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 8);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 19);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_22_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadBusinesses());
    });
    \u0275\u0275elementStart(6, "span", 8);
    \u0275\u0275text(7, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.loadError());
  }
}
function BusinessSelectComponent_Conditional_23_For_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_23_For_2_Conditional_16_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const biz_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openDeleteConfirm(biz_r5, $event));
    });
    \u0275\u0275elementStart(1, "span", 8);
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
}
function BusinessSelectComponent_Conditional_23_For_2_Conditional_21_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    const biz_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275styleProp("border-color", biz_r5.color + "55");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", p_r7.fullName, " (", p_r7.sharePercentage, "%) ");
  }
}
function BusinessSelectComponent_Conditional_23_For_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "span", 45);
    \u0275\u0275text(2, "\u0627\u0644\u0634\u0631\u0643\u0627\u0621:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 46);
    \u0275\u0275repeaterCreate(4, BusinessSelectComponent_Conditional_23_For_2_Conditional_21_For_5_Template, 2, 4, "span", 47, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const biz_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275repeater(biz_r5.partners);
  }
}
function BusinessSelectComponent_Conditional_23_For_2_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span", 8);
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const biz_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", biz_r5.stats.pendingAccounts, " \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629 ");
  }
}
function BusinessSelectComponent_Conditional_23_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_23_For_2_Template_div_click_0_listener() {
      const biz_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.enterBusiness(biz_r5));
    });
    \u0275\u0275element(1, "div", 25);
    \u0275\u0275elementStart(2, "div", 26)(3, "div", 27)(4, "div", 28)(5, "span", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 30)(10, "span", 31);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 32);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_23_For_2_Template_div_click_12_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(13, "button", 33);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_23_For_2_Template_button_click_13_listener($event) {
      const biz_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openEditModal(biz_r5, $event));
    });
    \u0275\u0275elementStart(14, "span", 8);
    \u0275\u0275text(15, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(16, BusinessSelectComponent_Conditional_23_For_2_Conditional_16_Template, 3, 0, "button", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "h2", 35);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p", 36);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, BusinessSelectComponent_Conditional_23_For_2_Conditional_21_Template, 6, 0, "div", 37);
    \u0275\u0275elementStart(22, "div", 38)(23, "div", 39)(24, "span", 40);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 41);
    \u0275\u0275text(27, "\u0645\u0648\u0638\u0641");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 39)(29, "span", 40);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 41);
    \u0275\u0275text(32, "\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 39)(34, "span", 40);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "span", 41);
    \u0275\u0275text(37, "\u0635\u0646\u062F\u0648\u0642");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 39)(39, "span", 40);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 41);
    \u0275\u0275text(42, "\u0645\u0648\u0631\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(43, BusinessSelectComponent_Conditional_23_For_2_Conditional_43_Template, 4, 1, "div", 42);
    \u0275\u0275elementStart(44, "div", 43)(45, "span");
    \u0275\u0275text(46, "\u0627\u0644\u062F\u062E\u0648\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "span", 8);
    \u0275\u0275text(48, "arrow_back");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const biz_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("--biz-color", biz_r5.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", biz_r5.color + "22");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", biz_r5.color + "20")("color", biz_r5.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(biz_r5.icon);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", biz_r5.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", biz_r5.stats.stations, " \u0645\u062D\u0637\u0629 ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(biz_r5.code);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.isEmptyBusiness(biz_r5) ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(biz_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(biz_r5.description);
    \u0275\u0275advance();
    \u0275\u0275conditional(biz_r5.partners && biz_r5.partners.length > 0 ? 21 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("color", biz_r5.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(biz_r5.stats.employees);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("color", biz_r5.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(biz_r5.stats.accounts);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("color", biz_r5.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(biz_r5.stats.funds);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("color", biz_r5.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(biz_r5.stats.suppliers);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(biz_r5.stats.pendingAccounts > 0 ? 43 : -1);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", biz_r5.color);
  }
}
function BusinessSelectComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275repeaterCreate(1, BusinessSelectComponent_Conditional_23_For_2_Template, 49, 32, "div", 20, _forTrack0);
    \u0275\u0275elementStart(3, "div", 21);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_23_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openAddModal());
    })("keydown.enter", function BusinessSelectComponent_Conditional_23_Template_div_keydown_enter_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openAddModal());
    });
    \u0275\u0275elementStart(4, "div", 22)(5, "div", 23)(6, "span", 8);
    \u0275\u0275text(7, "add_circle_outline");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "h3");
    \u0275\u0275text(9, "\u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0644 \u062C\u062F\u064A\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u0627\u0646\u0642\u0631 \u0644\u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0644");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.businesses());
  }
}
function BusinessSelectComponent_Conditional_24_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r9 = ctx.$implicit;
    \u0275\u0275property("value", t_r9.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r9.label);
  }
}
function BusinessSelectComponent_Conditional_24_For_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 76);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_24_For_48_Template_button_click_0_listener() {
      const ic_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.updateEditBiz("icon", ic_r11));
    });
    \u0275\u0275elementStart(1, "span", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ic_r11 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("color", ctx_r0.editingBiz().icon === ic_r11 ? ctx_r0.editingBiz().color : "");
    \u0275\u0275classProp("active", ctx_r0.editingBiz().icon === ic_r11);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ic_r11);
  }
}
function BusinessSelectComponent_Conditional_24_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 77)(2, "span", 8);
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 78)(5, "span", 79);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.editError());
  }
}
function BusinessSelectComponent_Conditional_24_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 80);
    \u0275\u0275text(1, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638... ");
  }
}
function BusinessSelectComponent_Conditional_24_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " \u062D\u0641\u0638 ");
  }
}
function BusinessSelectComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_24_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeEditModal());
    });
    \u0275\u0275elementStart(1, "div", 50);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_24_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 51)(3, "h3")(4, "span", 8);
    \u0275\u0275text(5, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " \u062A\u0639\u062F\u064A\u0644 \u0639\u0645\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 52);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_24_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeEditModal());
    });
    \u0275\u0275elementStart(8, "span", 8);
    \u0275\u0275text(9, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 53)(11, "div", 54)(12, "label");
    \u0275\u0275text(13, "\u0631\u0645\u0632 \u0627\u0644\u0639\u0645\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 55)(15, "span", 8);
    \u0275\u0275text(16, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 56);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 54)(20, "label", 57);
    \u0275\u0275text(21, "\u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u0644 ");
    \u0275\u0275elementStart(22, "span", 58);
    \u0275\u0275text(23, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "input", 59);
    \u0275\u0275listener("input", function BusinessSelectComponent_Conditional_24_Template_input_input_24_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateEditBiz("name", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 60)(26, "div", 54)(27, "label", 61);
    \u0275\u0275text(28, "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "select", 62);
    \u0275\u0275listener("change", function BusinessSelectComponent_Conditional_24_Template_select_change_29_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateEditBiz("type", $event.target.value));
    });
    \u0275\u0275repeaterCreate(30, BusinessSelectComponent_Conditional_24_For_31_Template, 2, 2, "option", 63, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 54)(33, "label", 64);
    \u0275\u0275text(34, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "input", 65);
    \u0275\u0275listener("input", function BusinessSelectComponent_Conditional_24_Template_input_input_35_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateEditBiz("description", $event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 60)(37, "div", 54)(38, "label", 66);
    \u0275\u0275text(39, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 67)(41, "input", 68);
    \u0275\u0275listener("input", function BusinessSelectComponent_Conditional_24_Template_input_input_41_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateEditBiz("color", $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(42, "span", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 54)(44, "label");
    \u0275\u0275text(45, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 70);
    \u0275\u0275repeaterCreate(47, BusinessSelectComponent_Conditional_24_For_48_Template, 3, 5, "button", 71, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(49, BusinessSelectComponent_Conditional_24_Conditional_49_Template, 7, 1, "div", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 73)(51, "button", 74);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_24_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitEditBusiness());
    });
    \u0275\u0275conditionalCreate(52, BusinessSelectComponent_Conditional_24_Conditional_52_Template, 3, 0)(53, BusinessSelectComponent_Conditional_24_Conditional_53_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "button", 75);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_24_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeEditModal());
    });
    \u0275\u0275text(55, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(18);
    \u0275\u0275textInterpolate(ctx_r0.editingBiz().code);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r0.editingBiz().name);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r0.editingBiz().type);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.bizTypes);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r0.editingBiz().description);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r0.editingBiz().color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r0.editingBiz().color);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.iconOptions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.editError() ? 49 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 52 : 53);
  }
}
function BusinessSelectComponent_Conditional_25_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 77)(2, "span", 8);
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 78)(5, "span", 79);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.deleteError());
  }
}
function BusinessSelectComponent_Conditional_25_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 80);
    \u0275\u0275text(1, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0630\u0641... ");
  }
}
function BusinessSelectComponent_Conditional_25_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " \u062D\u0630\u0641 \u0646\u0647\u0627\u0626\u064A ");
  }
}
function BusinessSelectComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_25_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDeleteConfirm());
    });
    \u0275\u0275elementStart(1, "div", 81);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_25_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 51)(3, "h3")(4, "span", 82);
    \u0275\u0275text(5, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 52);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_25_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDeleteConfirm());
    });
    \u0275\u0275elementStart(8, "span", 8);
    \u0275\u0275text(9, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 53)(11, "p", 83);
    \u0275\u0275text(12, "\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u0639\u0645\u0644 ");
    \u0275\u0275elementStart(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 84);
    \u0275\u0275text(17, "\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, BusinessSelectComponent_Conditional_25_Conditional_18_Template, 7, 1, "div", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 73)(20, "button", 85);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_25_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmDelete());
    });
    \u0275\u0275conditionalCreate(21, BusinessSelectComponent_Conditional_25_Conditional_21_Template, 3, 0)(22, BusinessSelectComponent_Conditional_25_Conditional_22_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 75);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_25_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeDeleteConfirm());
    });
    \u0275\u0275text(24, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate(ctx_r0.deletingBiz().name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", ctx_r0.deletingBiz().code, ") \u0646\u0647\u0627\u0626\u064A\u0627\u064B\u061F");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.deleteError() ? 18 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.deleting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.deleting() ? 21 : 22);
  }
}
function BusinessSelectComponent_Conditional_26_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r14 = ctx.$implicit;
    \u0275\u0275property("value", t_r14.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r14.label);
  }
}
function BusinessSelectComponent_Conditional_26_For_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 76);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_26_For_50_Template_button_click_0_listener() {
      const ic_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.updateNewBiz("icon", ic_r16));
    });
    \u0275\u0275elementStart(1, "span", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ic_r16 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("color", ctx_r0.newBiz().icon === ic_r16 ? ctx_r0.newBiz().color : "");
    \u0275\u0275classProp("active", ctx_r0.newBiz().icon === ic_r16);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ic_r16);
  }
}
function BusinessSelectComponent_Conditional_26_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 77)(2, "span", 8);
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 78)(5, "span", 79);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.saveError());
  }
}
function BusinessSelectComponent_Conditional_26_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 80);
    \u0275\u0275text(1, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638... ");
  }
}
function BusinessSelectComponent_Conditional_26_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " \u062D\u0641\u0638 ");
  }
}
function BusinessSelectComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_26_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeAddModal());
    });
    \u0275\u0275elementStart(1, "div", 50);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_26_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 51)(3, "h3")(4, "span", 8);
    \u0275\u0275text(5, "add_business");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " \u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0644 \u062C\u062F\u064A\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 52);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_26_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeAddModal());
    });
    \u0275\u0275elementStart(8, "span", 8);
    \u0275\u0275text(9, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 53)(11, "div", 54)(12, "label", 86);
    \u0275\u0275text(13, "\u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u0644 ");
    \u0275\u0275elementStart(14, "span", 58);
    \u0275\u0275text(15, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "input", 87);
    \u0275\u0275listener("input", function BusinessSelectComponent_Conditional_26_Template_input_input_16_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateNewBiz("name", $event.target.value));
    })("blur", function BusinessSelectComponent_Conditional_26_Template_input_blur_16_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.autoFillCode());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 54)(18, "label");
    \u0275\u0275text(19, "\u0631\u0645\u0632 \u0627\u0644\u0639\u0645\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 55)(21, "span", 8);
    \u0275\u0275text(22, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 56);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "span", 88);
    \u0275\u0275text(26, "\u064A\u064F\u0648\u0644\u064E\u0651\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0645\u062D\u0631\u0643 \u0627\u0644\u062A\u0631\u0642\u064A\u0645 \u2014 \u0644\u0627 \u062A\u0643\u0631\u0627\u0631 \u0645\u0636\u0645\u0648\u0646");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 60)(28, "div", 54)(29, "label", 89);
    \u0275\u0275text(30, "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "select", 90);
    \u0275\u0275listener("change", function BusinessSelectComponent_Conditional_26_Template_select_change_31_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateNewBiz("type", $event.target.value));
    });
    \u0275\u0275repeaterCreate(32, BusinessSelectComponent_Conditional_26_For_33_Template, 2, 2, "option", 63, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 54)(35, "label", 91);
    \u0275\u0275text(36, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "input", 92);
    \u0275\u0275listener("input", function BusinessSelectComponent_Conditional_26_Template_input_input_37_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateNewBiz("description", $event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 60)(39, "div", 54)(40, "label", 93);
    \u0275\u0275text(41, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 67)(43, "input", 94);
    \u0275\u0275listener("input", function BusinessSelectComponent_Conditional_26_Template_input_input_43_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateNewBiz("color", $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(44, "span", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 54)(46, "label");
    \u0275\u0275text(47, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 70);
    \u0275\u0275repeaterCreate(49, BusinessSelectComponent_Conditional_26_For_50_Template, 3, 5, "button", 71, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(51, BusinessSelectComponent_Conditional_26_Conditional_51_Template, 7, 1, "div", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div", 73)(53, "button", 74);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_26_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitAddBusiness());
    });
    \u0275\u0275conditionalCreate(54, BusinessSelectComponent_Conditional_26_Conditional_54_Template, 3, 0)(55, BusinessSelectComponent_Conditional_26_Conditional_55_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "button", 75);
    \u0275\u0275listener("click", function BusinessSelectComponent_Conditional_26_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeAddModal());
    });
    \u0275\u0275text(57, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275property("value", ctx_r0.newBiz().name);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.nextCode());
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r0.newBiz().type);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.bizTypes);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r0.newBiz().description);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r0.newBiz().color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r0.newBiz().color);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.iconOptions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.saveError() ? 51 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 54 : 55);
  }
}
var BusinessSelectComponent = class _BusinessSelectComponent {
  api = inject(ApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  auth = inject(AuthService);
  bizService = inject(BusinessService);
  theme = inject(ThemeService);
  businesses = signal([], ...ngDevMode ? [{ debugName: "businesses" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  loadError = signal("", ...ngDevMode ? [{ debugName: "loadError" }] : (
    /* istanbul ignore next */
    []
  ));
  noAccessMessage = signal("", ...ngDevMode ? [{ debugName: "noAccessMessage" }] : (
    /* istanbul ignore next */
    []
  ));
  userName = signal("", ...ngDevMode ? [{ debugName: "userName" }] : (
    /* istanbul ignore next */
    []
  ));
  showAddModal = signal(false, ...ngDevMode ? [{ debugName: "showAddModal" }] : (
    /* istanbul ignore next */
    []
  ));
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
    /* istanbul ignore next */
    []
  ));
  saveError = signal("", ...ngDevMode ? [{ debugName: "saveError" }] : (
    /* istanbul ignore next */
    []
  ));
  nextCode = signal("", ...ngDevMode ? [{ debugName: "nextCode" }] : (
    /* istanbul ignore next */
    []
  ));
  newBiz = signal({ name: "", type: "stations", description: "", icon: "business", color: "#3b82f6" }, ...ngDevMode ? [{ debugName: "newBiz" }] : (
    /* istanbul ignore next */
    []
  ));
  showEditModal = signal(false, ...ngDevMode ? [{ debugName: "showEditModal" }] : (
    /* istanbul ignore next */
    []
  ));
  editingBiz = signal(null, ...ngDevMode ? [{ debugName: "editingBiz" }] : (
    /* istanbul ignore next */
    []
  ));
  editError = signal("", ...ngDevMode ? [{ debugName: "editError" }] : (
    /* istanbul ignore next */
    []
  ));
  showDeleteConfirm = signal(false, ...ngDevMode ? [{ debugName: "showDeleteConfirm" }] : (
    /* istanbul ignore next */
    []
  ));
  deletingBiz = signal(null, ...ngDevMode ? [{ debugName: "deletingBiz" }] : (
    /* istanbul ignore next */
    []
  ));
  deleting = signal(false, ...ngDevMode ? [{ debugName: "deleting" }] : (
    /* istanbul ignore next */
    []
  ));
  deleteError = signal("", ...ngDevMode ? [{ debugName: "deleteError" }] : (
    /* istanbul ignore next */
    []
  ));
  bizTypes = [
    { value: "stations", label: "\u0645\u062D\u0637\u0627\u062A" },
    { value: "single_station", label: "\u0645\u062D\u0637\u0629 \u0648\u0627\u062D\u062F\u0629" },
    { value: "personal", label: "\u0634\u062E\u0635\u064A" }
  ];
  iconOptions = [
    "business",
    "store",
    "local_gas_station",
    "warehouse",
    "factory",
    "storefront",
    "apartment",
    "corporate_fare",
    "domain",
    "work"
  ];
  ngOnInit() {
    this.userName.set(this.auth.getUserName() || "\u0627\u0644\u0645\u0627\u0644\u0643");
    this.noAccessMessage.set(this.route.snapshot.queryParamMap.get("error") === "no_access" ? "\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062D\u062F\u062F. \u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0639\u0645\u0644 \u0622\u062E\u0631 \u0623\u0648 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0645\u0633\u0624\u0648\u0644." : "");
    this.loadBusinesses();
  }
  async loadBusinesses() {
    this.loadError.set("");
    if (!this.auth.getToken()) {
      this.loading.set(false);
      this.loadError.set("\u0644\u0645 \u064A\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644. \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0648\u062C\u064A\u0647...");
      setTimeout(() => this.auth.logout(), 800);
      return;
    }
    try {
      const data = await this.api.getBusinesses();
      this.businesses.set(Array.isArray(data) ? data : []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644";
      this.loadError.set(msg);
      this.businesses.set([]);
    } finally {
      this.loading.set(false);
    }
  }
  enterBusiness(biz) {
    const type = biz.type || "stations";
    this.bizService.setBusiness(biz.id, biz.name, biz.color, biz.icon, type);
    this.router.navigate(["/biz", biz.id]);
  }
  toggleTheme() {
    this.theme.toggle();
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  openEditModal(biz, event) {
    event.stopPropagation();
    this.editingBiz.set({ id: biz.id, code: biz.code, name: biz.name, type: biz.type, description: biz.description || "", icon: biz.icon, color: biz.color });
    this.editError.set("");
    this.showEditModal.set(true);
  }
  closeEditModal() {
    this.showEditModal.set(false);
  }
  updateEditBiz(field, value) {
    this.editingBiz.update((prev) => prev ? __spreadProps(__spreadValues({}, prev), { [field]: value }) : prev);
  }
  async submitEditBusiness() {
    const biz = this.editingBiz();
    if (!biz)
      return;
    if (!biz.name.trim()) {
      this.editError.set("\u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u0644 \u0645\u0637\u0644\u0648\u0628");
      return;
    }
    this.saving.set(true);
    this.editError.set("");
    try {
      const updated = await this.api.updateBusiness(biz.id, biz);
      this.businesses.update((prev) => prev.map((b) => b.id === biz.id ? __spreadValues(__spreadValues({}, b), updated) : b));
      this.showEditModal.set(false);
    } catch (e) {
      this.editError.set(e instanceof Error ? e.message : "\u0641\u0634\u0644 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0639\u0645\u0644");
    } finally {
      this.saving.set(false);
    }
  }
  isEmptyBusiness(biz) {
    const s = biz.stats;
    return !s || s.stations === 0 && s.employees === 0 && s.accounts === 0 && s.funds === 0 && s.suppliers === 0;
  }
  openDeleteConfirm(biz, event) {
    event.stopPropagation();
    this.deletingBiz.set({ id: biz.id, name: biz.name, code: biz.code });
    this.deleteError.set("");
    this.showDeleteConfirm.set(true);
  }
  closeDeleteConfirm() {
    this.showDeleteConfirm.set(false);
  }
  async confirmDelete() {
    const biz = this.deletingBiz();
    if (!biz)
      return;
    this.deleting.set(true);
    this.deleteError.set("");
    try {
      await this.api.deleteBusiness(biz.id);
      this.businesses.update((prev) => prev.filter((b) => b.id !== biz.id));
      this.showDeleteConfirm.set(false);
    } catch (e) {
      this.deleteError.set(e instanceof Error ? e.message : "\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0639\u0645\u0644");
    } finally {
      this.deleting.set(false);
    }
  }
  async openAddModal() {
    this.newBiz.set({ name: "", type: "stations", description: "", icon: "business", color: "#3b82f6" });
    this.saveError.set("");
    this.nextCode.set("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    this.showAddModal.set(true);
    try {
      const res = await this.api.request("/businesses/next-code");
      this.nextCode.set(res.code);
    } catch {
      this.nextCode.set("biz-??");
    }
  }
  closeAddModal() {
    this.showAddModal.set(false);
  }
  updateNewBiz(field, value) {
    this.newBiz.update((prev) => __spreadProps(__spreadValues({}, prev), { [field]: value }));
  }
  autoFillCode() {
  }
  async submitAddBusiness() {
    const biz = this.newBiz();
    if (!biz.name.trim()) {
      this.saveError.set("\u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u0644 \u0645\u0637\u0644\u0648\u0628");
      return;
    }
    this.saving.set(true);
    this.saveError.set("");
    try {
      const created = await this.api.createBusiness(biz);
      this.businesses.update((prev) => [...prev, created]);
      this.showAddModal.set(false);
    } catch (e) {
      this.saveError.set(e instanceof Error ? e.message : "\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0639\u0645\u0644");
    } finally {
      this.saving.set(false);
    }
  }
  getGreeting() {
    const hour = (/* @__PURE__ */ new Date()).getHours();
    if (hour < 12)
      return "\u0635\u0628\u0627\u062D \u0627\u0644\u062E\u064A\u0631";
    if (hour < 17)
      return "\u0645\u0633\u0627\u0621 \u0627\u0644\u062E\u064A\u0631";
    return "\u0645\u0633\u0627\u0621 \u0627\u0644\u062E\u064A\u0631";
  }
  static \u0275fac = function BusinessSelectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BusinessSelectComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BusinessSelectComponent, selectors: [["app-business-select"]], decls: 27, vars: 10, consts: [[1, "business-select-page"], [1, "top-bar"], [1, "logo-area"], [1, "material-icons-round", "logo-icon"], [1, "logo-text"], [1, "top-actions"], [1, "theme-toggle-btn", 3, "click"], [1, "logout-btn", 3, "click"], [1, "material-icons-round"], [1, "welcome-section"], [1, "welcome-title"], [1, "gradient-text"], [1, "welcome-subtitle"], [1, "no-access-msg"], [1, "loading-container"], [1, "error-state"], [1, "businesses-grid"], [1, "modal-overlay"], [1, "spinner"], [1, "retry-btn", 3, "click"], [1, "business-card", 3, "--biz-color"], ["role", "button", "tabindex", "0", 1, "business-card", "add-card", 3, "click", "keydown.enter"], [1, "card-content", "add-content"], [1, "add-icon"], [1, "business-card", 3, "click"], [1, "card-glow"], [1, "card-content"], [1, "card-header"], [1, "icon-wrapper"], [1, "card-badge"], [1, "card-code-row"], [1, "card-code"], [1, "card-actions", 3, "click"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "action-btn", "edit-btn", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "action-btn", "delete-btn"], [1, "card-title"], [1, "card-desc"], [1, "partners-section"], [1, "stats-mini"], [1, "stat-item"], [1, "stat-num"], [1, "stat-label"], [1, "pending-badge"], [1, "enter-btn"], ["title", "\u062D\u0630\u0641", 1, "action-btn", "delete-btn", 3, "click"], [1, "partners-label"], [1, "partners-list"], [1, "partner-chip", 3, "border-color"], [1, "partner-chip"], [1, "modal-overlay", 3, "click"], [1, "modal-3d", 3, "click"], [1, "modal-header"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-group"], [1, "code-preview"], [1, "code-value"], ["for", "edit-name"], [1, "required"], ["id", "edit-name", "type", "text", 3, "input", "value"], [1, "form-row"], ["for", "edit-type"], ["id", "edit-type", "title", "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644", 3, "change", "value"], [3, "value"], ["for", "edit-desc"], ["id", "edit-desc", "type", "text", 3, "input", "value"], ["for", "edit-color"], [1, "color-row"], ["id", "edit-color", "type", "color", "title", "\u0644\u0648\u0646 \u0627\u0644\u0639\u0645\u0644", 3, "input", "value"], [1, "color-swatch"], [1, "icon-grid"], [1, "icon-opt", 3, "active", "color"], [1, "alert", "alert-error"], [1, "modal-footer"], [1, "btn-primary", 3, "click", "disabled"], [1, "btn-ghost", 3, "click"], [1, "icon-opt", 3, "click"], [1, "alert-icon"], [1, "alert-content"], [1, "alert-text"], [1, "material-icons-round", "animate-spin"], [1, "modal-3d", "modal-sm", 3, "click"], [1, "material-icons-round", 2, "color", "#ef4444"], [1, "delete-msg"], [1, "delete-hint"], [1, "btn-danger", 3, "click", "disabled"], ["for", "biz-name"], ["id", "biz-name", "type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u0645\u062D\u0637\u0627\u062A \u0627\u0644\u0634\u0645\u0627\u0644", 3, "input", "blur", "value"], [1, "form-hint"], ["for", "biz-type"], ["id", "biz-type", "title", "\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644", 3, "change", "value"], ["for", "biz-desc"], ["id", "biz-desc", "type", "text", "placeholder", "\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u0639\u0645\u0644", 3, "input", "value"], ["for", "biz-color"], ["id", "biz-color", "type", "color", "title", "\u0644\u0648\u0646 \u0627\u0644\u0639\u0645\u0644", 3, "input", "value"]], template: function BusinessSelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, "bolt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span", 4);
      \u0275\u0275text(6, "\u062D\u0633\u0627\u0628\u0627\u062A\u064A");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "button", 6);
      \u0275\u0275listener("click", function BusinessSelectComponent_Template_button_click_8_listener() {
        return ctx.toggleTheme();
      });
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 7);
      \u0275\u0275listener("click", function BusinessSelectComponent_Template_button_click_10_listener() {
        return ctx.logout();
      });
      \u0275\u0275elementStart(11, "span", 8);
      \u0275\u0275text(12, "logout");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(13, "div", 9)(14, "h1", 10);
      \u0275\u0275text(15);
      \u0275\u0275elementStart(16, "span", 11);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "p", 12);
      \u0275\u0275text(19, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u064A \u062A\u0631\u064A\u062F \u0627\u0644\u062F\u062E\u0648\u0644 \u0625\u0644\u064A\u0647");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(20, BusinessSelectComponent_Conditional_20_Template, 2, 1, "p", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, BusinessSelectComponent_Conditional_21_Template, 4, 0, "div", 14);
      \u0275\u0275conditionalCreate(22, BusinessSelectComponent_Conditional_22_Template, 9, 1, "div", 15);
      \u0275\u0275conditionalCreate(23, BusinessSelectComponent_Conditional_23_Template, 12, 0, "div", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(24, BusinessSelectComponent_Conditional_24_Template, 56, 10, "div", 17);
      \u0275\u0275conditionalCreate(25, BusinessSelectComponent_Conditional_25_Template, 25, 5, "div", 17);
      \u0275\u0275conditionalCreate(26, BusinessSelectComponent_Conditional_26_Template, 58, 10, "div", 17);
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1(" ", ctx.theme.isDark() ? "light_mode" : "dark_mode", " ");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.getGreeting(), "\u060C ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.userName());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.noAccessMessage() ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.loadError() ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && !ctx.loadError() ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showEditModal() && ctx.editingBiz() ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDeleteConfirm() && ctx.deletingBiz() ? 25 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showAddModal() ? 26 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption], styles: ["\n\n.business-select-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--bg-base);\n  padding-bottom: 60px;\n}\n.top-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 40px;\n  background: var(--bg-header);\n  -webkit-backdrop-filter: blur(20px);\n  backdrop-filter: blur(20px);\n  border-bottom: 1px solid var(--border-color);\n}\n.logo-area[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.logo-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #f59e0b;\n  filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.4));\n}\n.logo-text[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.top-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.logout-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.25s ease;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.15);\n  border-color: rgba(239, 68, 68, 0.3);\n  color: #ef4444;\n}\n.welcome-section[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 50px 20px 30px;\n}\n.welcome-title[_ngcontent-%COMP%] {\n  font-size: 36px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 12px;\n}\n.welcome-subtitle[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--text-secondary);\n}\n.no-access-msg[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  padding: 12px 16px;\n  background: rgba(239, 68, 68, 0.12);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 12px;\n  color: #dc2626;\n  font-size: 14px;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 80px 20px;\n  color: var(--text-muted);\n}\n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 80px 20px;\n  color: #ef4444;\n  text-align: center;\n}\n.error-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  opacity: 0.9;\n}\n.error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.retry-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 24px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--card-bg);\n  color: var(--text-primary);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.retry-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface);\n  border-color: #f59e0b;\n  color: #f59e0b;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border: 4px solid var(--border-color);\n  border-top-color: #f59e0b;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.businesses-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\n  gap: 28px;\n  padding: 10px 40px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.business-card[_ngcontent-%COMP%] {\n  position: relative;\n  background: var(--card-bg);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: var(--shadow-card);\n  animation: _ngcontent-%COMP%_slide-in-up 0.5s ease-out both;\n}\n.business-card[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0.1s;\n}\n.business-card[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.business-card[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.3s;\n}\n.business-card[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 0.4s;\n}\n.business-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px) scale(1.02);\n  box-shadow: var(--shadow-hover);\n  border-color: var(--biz-color, var(--border-strong));\n}\n.business-card[_ngcontent-%COMP%]:hover   .card-glow[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.business-card[_ngcontent-%COMP%]:hover   .enter-btn[_ngcontent-%COMP%] {\n  transform: translateY(0);\n  opacity: 1;\n}\n.card-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  opacity: 0.7;\n  transition: opacity 0.3s;\n}\n.card-content[_ngcontent-%COMP%] {\n  padding: 28px;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.icon-wrapper[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-wrapper[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.card-badge[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border-radius: 20px;\n  color: white;\n  font-size: 13px;\n  font-weight: 700;\n}\n.card-code[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 3px 10px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: monospace;\n  letter-spacing: 0.05em;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 8px;\n}\n.card-desc[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary);\n  line-height: 1.6;\n  margin-bottom: 20px;\n}\n.partners-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.partners-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 700;\n  display: block;\n  margin-bottom: 8px;\n}\n.partners-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.partner-chip[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 12px;\n  border: 1px solid;\n  font-size: 12px;\n  color: var(--text-primary);\n  font-weight: 600;\n  background: var(--bg-surface);\n}\n.stats-mini[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n  margin-bottom: 20px;\n  padding: 16px;\n  background: var(--bg-surface);\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n}\n.stat-item[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.stat-num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.pending-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 16px;\n  background: rgba(239, 68, 68, 0.12);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  border-radius: 12px;\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n.pending-badge[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.enter-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px;\n  border-radius: 14px;\n  color: white;\n  font-size: 16px;\n  font-weight: 700;\n  transform: translateY(5px);\n  opacity: 0.85;\n  transition: all 0.3s ease;\n}\n.enter-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  transition: transform 0.3s;\n}\n.enter-btn[_ngcontent-%COMP%]:hover   .material-icons-round[_ngcontent-%COMP%] {\n  transform: translateX(-4px);\n}\n.add-card[_ngcontent-%COMP%] {\n  border: 2px dashed var(--border-strong);\n  background: transparent;\n  box-shadow: none;\n}\n.add-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent-amber);\n  background: var(--bg-surface);\n  transform: translateY(-4px);\n}\n.add-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 300px;\n  text-align: center;\n}\n.add-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 56px;\n  color: var(--text-faint);\n}\n.add-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--text-secondary);\n  font-weight: 700;\n  margin-top: 16px;\n}\n.add-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-muted);\n  font-weight: 600;\n  margin-top: 8px;\n}\n@keyframes _ngcontent-%COMP%_slide-in-up {\n  from {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@media (max-width: 768px) {\n  .businesses-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding: 10px 16px;\n  }\n  .welcome-title[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n  .top-bar[_ngcontent-%COMP%] {\n    padding: 16px 20px;\n  }\n}\n.color-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.color-row[_ngcontent-%COMP%]   input[type=color][_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  padding: 2px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n}\n.color-row[_ngcontent-%COMP%]   .color-swatch[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  flex-shrink: 0;\n}\n.icon-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 4px;\n}\n.icon-opt[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s ease;\n}\n.icon-opt[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.icon-opt[_ngcontent-%COMP%]:hover {\n  border-color: var(--border-strong);\n  background: var(--bg-card-hover);\n  transform: translateY(-2px);\n}\n.icon-opt.active[_ngcontent-%COMP%] {\n  border-color: currentColor;\n  background: var(--bg-card);\n  box-shadow: 0 0 0 2px currentColor;\n}\n.card-code-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.business-card[_ngcontent-%COMP%]:hover   .card-actions[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 7px;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s ease;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.action-btn.edit-btn[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  color: var(--text-muted);\n}\n.action-btn.edit-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.1254901961);\n  color: #3b82f6;\n}\n.action-btn.delete-btn[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  color: var(--text-muted);\n}\n.action-btn.delete-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1254901961);\n  color: #ef4444;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  background: #ef4444;\n  color: #fff;\n  border: none;\n  border-radius: 10px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #dc2626;\n}\n.btn-danger[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-danger[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.modal-sm[_ngcontent-%COMP%] {\n  max-width: 420px !important;\n}\n.delete-msg[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: var(--text-primary);\n  margin-bottom: 8px;\n  line-height: 1.6;\n}\n.delete-msg[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--accent, #3b82f6);\n}\n.delete-hint[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-bottom: 12px;\n}\n.code-preview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  margin-top: 4px;\n}\n.code-preview[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--text-muted);\n}\n.code-value[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--accent, #3b82f6);\n  letter-spacing: 0.05em;\n}\n/*# sourceMappingURL=business-select.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BusinessSelectComponent, [{
    type: Component,
    args: [{ selector: "app-business-select", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="business-select-page">\r
  <!-- Header Bar -->\r
  <div class="top-bar">\r
    <div class="logo-area">\r
      <span class="material-icons-round logo-icon">bolt</span>\r
      <span class="logo-text">\u062D\u0633\u0627\u0628\u0627\u062A\u064A</span>\r
    </div>\r
    <div class="top-actions">\r
      <button class="theme-toggle-btn" (click)="toggleTheme()">\r
        {{ theme.isDark() ? 'light_mode' : 'dark_mode' }}\r
      </button>\r
      <button class="logout-btn" (click)="logout()">\r
        <span class="material-icons-round">logout</span>\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- Welcome Section -->\r
  <div class="welcome-section">\r
    <h1 class="welcome-title">{{ getGreeting() }}\u060C <span class="gradient-text">{{ userName() }}</span></h1>\r
    <p class="welcome-subtitle">\u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u064A \u062A\u0631\u064A\u062F \u0627\u0644\u062F\u062E\u0648\u0644 \u0625\u0644\u064A\u0647</p>\r
    @if (noAccessMessage()) {\r
      <p class="no-access-msg">{{ noAccessMessage() }}</p>\r
    }\r
  </div>\r
\r
  <!-- Loading -->\r
  @if (loading()) {\r
    <div class="loading-container">\r
      <div class="spinner"></div>\r
      <p>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644...</p>\r
    </div>\r
  }\r
\r
  <!-- \u062E\u0637\u0623 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 -->\r
  @if (!loading() && loadError()) {\r
    <div class="error-state">\r
      <span class="material-icons-round">error_outline</span>\r
      <p>{{ loadError() }}</p>\r
      <button class="retry-btn" (click)="loadBusinesses()">\r
        <span class="material-icons-round">refresh</span> \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629\r
      </button>\r
    </div>\r
  }\r
\r
  <!-- Business Cards -->\r
  @if (!loading() && !loadError()) {\r
    <div class="businesses-grid">\r
      @for (biz of businesses(); track biz.id; let i = $index) {\r
        <div class="business-card" [style.--biz-color]="biz.color" (click)="enterBusiness(biz)">\r
          <div class="card-glow" [style.background]="biz.color + '22'"></div>\r
          <div class="card-content">\r
            <div class="card-header">\r
              <div class="icon-wrapper" [style.background]="biz.color + '20'" [style.color]="biz.color">\r
                <span class="material-icons-round">{{ biz.icon }}</span>\r
              </div>\r
              <div class="card-badge" [style.background]="biz.color">\r
                {{ biz.stats.stations }} \u0645\u062D\u0637\u0629\r
              </div>\r
            </div>\r
\r
            <div class="card-code-row">\r
              <span class="card-code">{{ biz.code }}</span>\r
              <div class="card-actions" (click)="$event.stopPropagation()">\r
                <button class="action-btn edit-btn" title="\u062A\u0639\u062F\u064A\u0644" (click)="openEditModal(biz, $event)">\r
                  <span class="material-icons-round">edit</span>\r
                </button>\r
                @if (isEmptyBusiness(biz)) {\r
                  <button class="action-btn delete-btn" title="\u062D\u0630\u0641" (click)="openDeleteConfirm(biz, $event)">\r
                    <span class="material-icons-round">delete</span>\r
                  </button>\r
                }\r
              </div>\r
            </div>\r
            <h2 class="card-title">{{ biz.name }}</h2>\r
            <p class="card-desc">{{ biz.description }}</p>\r
\r
            <!-- Partners -->\r
            @if (biz.partners && biz.partners.length > 0) {\r
              <div class="partners-section">\r
                <span class="partners-label">\u0627\u0644\u0634\u0631\u0643\u0627\u0621:</span>\r
                <div class="partners-list">\r
                  @for (p of biz.partners; track p.id) {\r
                    <span class="partner-chip" [style.border-color]="biz.color + '55'">\r
                      {{ p.fullName }} ({{ p.sharePercentage }}%)\r
                    </span>\r
                  }\r
                </div>\r
              </div>\r
            }\r
\r
            <!-- Stats Grid -->\r
            <div class="stats-mini">\r
              <div class="stat-item">\r
                <span class="stat-num" [style.color]="biz.color">{{ biz.stats.employees }}</span>\r
                <span class="stat-label">\u0645\u0648\u0638\u0641</span>\r
              </div>\r
              <div class="stat-item">\r
                <span class="stat-num" [style.color]="biz.color">{{ biz.stats.accounts }}</span>\r
                <span class="stat-label">\u062D\u0633\u0627\u0628</span>\r
              </div>\r
              <div class="stat-item">\r
                <span class="stat-num" [style.color]="biz.color">{{ biz.stats.funds }}</span>\r
                <span class="stat-label">\u0635\u0646\u062F\u0648\u0642</span>\r
              </div>\r
              <div class="stat-item">\r
                <span class="stat-num" [style.color]="biz.color">{{ biz.stats.suppliers }}</span>\r
                <span class="stat-label">\u0645\u0648\u0631\u062F</span>\r
              </div>\r
            </div>\r
\r
            @if (biz.stats.pendingAccounts > 0) {\r
              <div class="pending-badge">\r
                <span class="material-icons-round">warning</span>\r
                {{ biz.stats.pendingAccounts }} \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629\r
              </div>\r
            }\r
\r
            <div class="enter-btn" [style.background]="biz.color">\r
              <span>\u0627\u0644\u062F\u062E\u0648\u0644</span>\r
              <span class="material-icons-round">arrow_back</span>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
\r
      <!-- Add New Business Card -->\r
      <div class="business-card add-card" role="button" tabindex="0"\r
        (click)="openAddModal()" (keydown.enter)="openAddModal()">\r
        <div class="card-content add-content">\r
          <div class="add-icon">\r
            <span class="material-icons-round">add_circle_outline</span>\r
          </div>\r
          <h3>\u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0644 \u062C\u062F\u064A\u062F</h3>\r
          <p>\u0627\u0646\u0642\u0631 \u0644\u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0644</p>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
\r
<!-- Modal \u062A\u0639\u062F\u064A\u0644 \u0639\u0645\u0644 -->\r
@if (showEditModal() && editingBiz()) {\r
  <div class="modal-overlay" (click)="closeEditModal()">\r
    <div class="modal-3d" (click)="$event.stopPropagation()">\r
      <div class="modal-header">\r
        <h3><span class="material-icons-round">edit</span> \u062A\u0639\u062F\u064A\u0644 \u0639\u0645\u0644</h3>\r
        <button class="close-btn" (click)="closeEditModal()"><span class="material-icons-round">close</span></button>\r
      </div>\r
      <div class="modal-body">\r
        <div class="form-group">\r
          <label>\u0631\u0645\u0632 \u0627\u0644\u0639\u0645\u0644</label>\r
          <div class="code-preview">\r
            <span class="material-icons-round">tag</span>\r
            <span class="code-value">{{ editingBiz()!.code }}</span>\r
          </div>\r
        </div>\r
        <div class="form-group">\r
          <label for="edit-name">\u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u0644 <span class="required">*</span></label>\r
          <input id="edit-name" type="text" [value]="editingBiz()!.name"\r
            (input)="updateEditBiz('name', $any($event.target).value)" />\r
        </div>\r
        <div class="form-row">\r
          <div class="form-group">\r
            <label for="edit-type">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644</label>\r
            <select id="edit-type" title="\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644" [value]="editingBiz()!.type"\r
              (change)="updateEditBiz('type', $any($event.target).value)">\r
              @for (t of bizTypes; track t.value) {\r
                <option [value]="t.value">{{ t.label }}</option>\r
              }\r
            </select>\r
          </div>\r
          <div class="form-group">\r
            <label for="edit-desc">\u0627\u0644\u0648\u0635\u0641</label>\r
            <input id="edit-desc" type="text" [value]="editingBiz()!.description"\r
              (input)="updateEditBiz('description', $any($event.target).value)" />\r
          </div>\r
        </div>\r
        <div class="form-row">\r
          <div class="form-group">\r
            <label for="edit-color">\u0627\u0644\u0644\u0648\u0646</label>\r
            <div class="color-row">\r
              <input id="edit-color" type="color" title="\u0644\u0648\u0646 \u0627\u0644\u0639\u0645\u0644" [value]="editingBiz()!.color"\r
                (input)="updateEditBiz('color', $any($event.target).value)" />\r
              <span class="color-swatch" [style.background]="editingBiz()!.color"></span>\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
            <div class="icon-grid">\r
              @for (ic of iconOptions; track ic) {\r
                <button class="icon-opt" [class.active]="editingBiz()!.icon === ic"\r
                  [style.color]="editingBiz()!.icon === ic ? editingBiz()!.color : ''"\r
                  (click)="updateEditBiz('icon', ic)">\r
                  <span class="material-icons-round">{{ ic }}</span>\r
                </button>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
        @if (editError()) {\r
          <div class="alert alert-error">\r
            <div class="alert-icon"><span class="material-icons-round">error</span></div>\r
            <div class="alert-content"><span class="alert-text">{{ editError() }}</span></div>\r
          </div>\r
        }\r
      </div>\r
      <div class="modal-footer">\r
        <button class="btn-primary" [disabled]="saving()" (click)="submitEditBusiness()">\r
          @if (saving()) { <span class="material-icons-round animate-spin">sync</span> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638... }\r
          @else { <span class="material-icons-round">save</span> \u062D\u0641\u0638 }\r
        </button>\r
        <button class="btn-ghost" (click)="closeEditModal()">\u0625\u0644\u063A\u0627\u0621</button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
<!-- Modal \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641 -->\r
@if (showDeleteConfirm() && deletingBiz()) {\r
  <div class="modal-overlay" (click)="closeDeleteConfirm()">\r
    <div class="modal-3d modal-sm" (click)="$event.stopPropagation()">\r
      <div class="modal-header">\r
        <h3><span class="material-icons-round" style="color:#ef4444">warning</span> \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641</h3>\r
        <button class="close-btn" (click)="closeDeleteConfirm()"><span class="material-icons-round">close</span></button>\r
      </div>\r
      <div class="modal-body">\r
        <p class="delete-msg">\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u0639\u0645\u0644 <strong>{{ deletingBiz()!.name }}</strong> ({{ deletingBiz()!.code }}) \u0646\u0647\u0627\u0626\u064A\u0627\u064B\u061F</p>\r
        <p class="delete-hint">\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u0647.</p>\r
        @if (deleteError()) {\r
          <div class="alert alert-error">\r
            <div class="alert-icon"><span class="material-icons-round">error</span></div>\r
            <div class="alert-content"><span class="alert-text">{{ deleteError() }}</span></div>\r
          </div>\r
        }\r
      </div>\r
      <div class="modal-footer">\r
        <button class="btn-danger" [disabled]="deleting()" (click)="confirmDelete()">\r
          @if (deleting()) { <span class="material-icons-round animate-spin">sync</span> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0630\u0641... }\r
          @else { <span class="material-icons-round">delete</span> \u062D\u0630\u0641 \u0646\u0647\u0627\u0626\u064A }\r
        </button>\r
        <button class="btn-ghost" (click)="closeDeleteConfirm()">\u0625\u0644\u063A\u0627\u0621</button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
\r
<!-- Modal \u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0644 \u062C\u062F\u064A\u062F -->\r
@if (showAddModal()) {\r
  <div class="modal-overlay" (click)="closeAddModal()">\r
    <div class="modal-3d" (click)="$event.stopPropagation()">\r
      <div class="modal-header">\r
        <h3><span class="material-icons-round">add_business</span> \u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0644 \u062C\u062F\u064A\u062F</h3>\r
        <button class="close-btn" (click)="closeAddModal()">\r
          <span class="material-icons-round">close</span>\r
        </button>\r
      </div>\r
\r
      <div class="modal-body">\r
        <!-- \u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u0644 -->\r
        <div class="form-group">\r
          <label for="biz-name">\u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u0644 <span class="required">*</span></label>\r
          <input id="biz-name" type="text" placeholder="\u0645\u062B\u0627\u0644: \u0645\u062D\u0637\u0627\u062A \u0627\u0644\u0634\u0645\u0627\u0644"\r
            [value]="newBiz().name"\r
            (input)="updateNewBiz('name', $any($event.target).value)"\r
            (blur)="autoFillCode()" />\r
        </div>\r
\r
        <!-- \u0627\u0644\u0631\u0645\u0632 \u2014 \u064A\u064F\u0648\u0644\u064E\u0651\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B -->\r
        <div class="form-group">\r
          <label>\u0631\u0645\u0632 \u0627\u0644\u0639\u0645\u0644</label>\r
          <div class="code-preview">\r
            <span class="material-icons-round">tag</span>\r
            <span class="code-value">{{ nextCode() }}</span>\r
          </div>\r
          <span class="form-hint">\u064A\u064F\u0648\u0644\u064E\u0651\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0645\u062D\u0631\u0643 \u0627\u0644\u062A\u0631\u0642\u064A\u0645 \u2014 \u0644\u0627 \u062A\u0643\u0631\u0627\u0631 \u0645\u0636\u0645\u0648\u0646</span>\r
        </div>\r
\r
        <div class="form-row">\r
          <!-- \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644 -->\r
          <div class="form-group">\r
            <label for="biz-type">\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644</label>\r
            <select id="biz-type" title="\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644" [value]="newBiz().type"\r
              (change)="updateNewBiz('type', $any($event.target).value)">\r
              @for (t of bizTypes; track t.value) {\r
                <option [value]="t.value">{{ t.label }}</option>\r
              }\r
            </select>\r
          </div>\r
\r
          <!-- \u0627\u0644\u0648\u0635\u0641 -->\r
          <div class="form-group">\r
            <label for="biz-desc">\u0627\u0644\u0648\u0635\u0641</label>\r
            <input id="biz-desc" type="text" placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u0639\u0645\u0644"\r
              [value]="newBiz().description"\r
              (input)="updateNewBiz('description', $any($event.target).value)" />\r
          </div>\r
        </div>\r
\r
        <!-- \u0627\u0644\u0644\u0648\u0646 \u0648\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 -->\r
        <div class="form-row">\r
          <div class="form-group">\r
            <label for="biz-color">\u0627\u0644\u0644\u0648\u0646</label>\r
            <div class="color-row">\r
              <input id="biz-color" type="color" title="\u0644\u0648\u0646 \u0627\u0644\u0639\u0645\u0644"\r
                [value]="newBiz().color"\r
                (input)="updateNewBiz('color', $any($event.target).value)" />\r
              <span class="color-swatch" [style.background]="newBiz().color"></span>\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
            <div class="icon-grid">\r
              @for (ic of iconOptions; track ic) {\r
                <button class="icon-opt" [class.active]="newBiz().icon === ic"\r
                  [style.color]="newBiz().icon === ic ? newBiz().color : ''"\r
                  (click)="updateNewBiz('icon', ic)">\r
                  <span class="material-icons-round">{{ ic }}</span>\r
                </button>\r
              }\r
            </div>\r
          </div>\r
        </div>\r
\r
        @if (saveError()) {\r
          <div class="alert alert-error">\r
            <div class="alert-icon"><span class="material-icons-round">error</span></div>\r
            <div class="alert-content"><span class="alert-text">{{ saveError() }}</span></div>\r
          </div>\r
        }\r
      </div>\r
\r
      <div class="modal-footer">\r
        <button class="btn-primary" [disabled]="saving()" (click)="submitAddBusiness()">\r
          @if (saving()) {\r
            <span class="material-icons-round animate-spin">sync</span> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...\r
          } @else {\r
            <span class="material-icons-round">save</span> \u062D\u0641\u0638\r
          }\r
        </button>\r
        <button class="btn-ghost" (click)="closeAddModal()">\u0625\u0644\u063A\u0627\u0621</button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
`, styles: ["/* src/app/pages/business-select/business-select.scss */\n.business-select-page {\n  min-height: 100vh;\n  background: var(--bg-base);\n  padding-bottom: 60px;\n}\n.top-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 40px;\n  background: var(--bg-header);\n  -webkit-backdrop-filter: blur(20px);\n  backdrop-filter: blur(20px);\n  border-bottom: 1px solid var(--border-color);\n}\n.logo-area {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.logo-icon {\n  font-size: 32px;\n  color: #f59e0b;\n  filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.4));\n}\n.logo-text {\n  font-size: 24px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.top-actions {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.logout-btn {\n  width: 40px;\n  height: 40px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.25s ease;\n}\n.logout-btn:hover {\n  background: rgba(239, 68, 68, 0.15);\n  border-color: rgba(239, 68, 68, 0.3);\n  color: #ef4444;\n}\n.welcome-section {\n  text-align: center;\n  padding: 50px 20px 30px;\n}\n.welcome-title {\n  font-size: 36px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 12px;\n}\n.welcome-subtitle {\n  font-size: 18px;\n  color: var(--text-secondary);\n}\n.no-access-msg {\n  margin-top: 12px;\n  padding: 12px 16px;\n  background: rgba(239, 68, 68, 0.12);\n  border: 1px solid rgba(239, 68, 68, 0.3);\n  border-radius: 12px;\n  color: #dc2626;\n  font-size: 14px;\n}\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 80px 20px;\n  color: var(--text-muted);\n}\n.error-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 80px 20px;\n  color: #ef4444;\n  text-align: center;\n}\n.error-state .material-icons-round {\n  font-size: 48px;\n  opacity: 0.9;\n}\n.error-state p {\n  font-size: 16px;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.retry-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 24px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--card-bg);\n  color: var(--text-primary);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.retry-btn:hover {\n  background: var(--bg-surface);\n  border-color: #f59e0b;\n  color: #f59e0b;\n}\n.spinner {\n  width: 48px;\n  height: 48px;\n  border: 4px solid var(--border-color);\n  border-top-color: #f59e0b;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.businesses-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\n  gap: 28px;\n  padding: 10px 40px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.business-card {\n  position: relative;\n  background: var(--card-bg);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: var(--shadow-card);\n  animation: slide-in-up 0.5s ease-out both;\n}\n.business-card:nth-child(1) {\n  animation-delay: 0.1s;\n}\n.business-card:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.business-card:nth-child(3) {\n  animation-delay: 0.3s;\n}\n.business-card:nth-child(4) {\n  animation-delay: 0.4s;\n}\n.business-card:hover {\n  transform: translateY(-8px) scale(1.02);\n  box-shadow: var(--shadow-hover);\n  border-color: var(--biz-color, var(--border-strong));\n}\n.business-card:hover .card-glow {\n  opacity: 1;\n}\n.business-card:hover .enter-btn {\n  transform: translateY(0);\n  opacity: 1;\n}\n.card-glow {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  opacity: 0.7;\n  transition: opacity 0.3s;\n}\n.card-content {\n  padding: 28px;\n}\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.icon-wrapper {\n  width: 56px;\n  height: 56px;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.icon-wrapper .material-icons-round {\n  font-size: 28px;\n}\n.card-badge {\n  padding: 6px 14px;\n  border-radius: 20px;\n  color: white;\n  font-size: 13px;\n  font-weight: 700;\n}\n.card-code {\n  display: inline-block;\n  padding: 3px 10px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: monospace;\n  letter-spacing: 0.05em;\n}\n.card-title {\n  font-size: 24px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 8px;\n}\n.card-desc {\n  font-size: 14px;\n  color: var(--text-secondary);\n  line-height: 1.6;\n  margin-bottom: 20px;\n}\n.partners-section {\n  margin-bottom: 20px;\n}\n.partners-label {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 700;\n  display: block;\n  margin-bottom: 8px;\n}\n.partners-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.partner-chip {\n  padding: 4px 12px;\n  border-radius: 12px;\n  border: 1px solid;\n  font-size: 12px;\n  color: var(--text-primary);\n  font-weight: 600;\n  background: var(--bg-surface);\n}\n.stats-mini {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n  margin-bottom: 20px;\n  padding: 16px;\n  background: var(--bg-surface);\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n}\n.stat-item {\n  text-align: center;\n}\n.stat-num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n}\n.stat-label {\n  font-size: 11px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.pending-badge {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 16px;\n  background: rgba(239, 68, 68, 0.12);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  border-radius: 12px;\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n.pending-badge .material-icons-round {\n  font-size: 18px;\n}\n.enter-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px;\n  border-radius: 14px;\n  color: white;\n  font-size: 16px;\n  font-weight: 700;\n  transform: translateY(5px);\n  opacity: 0.85;\n  transition: all 0.3s ease;\n}\n.enter-btn .material-icons-round {\n  font-size: 20px;\n  transition: transform 0.3s;\n}\n.enter-btn:hover .material-icons-round {\n  transform: translateX(-4px);\n}\n.add-card {\n  border: 2px dashed var(--border-strong);\n  background: transparent;\n  box-shadow: none;\n}\n.add-card:hover {\n  border-color: var(--accent-amber);\n  background: var(--bg-surface);\n  transform: translateY(-4px);\n}\n.add-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 300px;\n  text-align: center;\n}\n.add-icon .material-icons-round {\n  font-size: 56px;\n  color: var(--text-faint);\n}\n.add-content h3 {\n  font-size: 18px;\n  color: var(--text-secondary);\n  font-weight: 700;\n  margin-top: 16px;\n}\n.add-content p {\n  font-size: 14px;\n  color: var(--text-muted);\n  font-weight: 600;\n  margin-top: 8px;\n}\n@keyframes slide-in-up {\n  from {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@media (max-width: 768px) {\n  .businesses-grid {\n    grid-template-columns: 1fr;\n    padding: 10px 16px;\n  }\n  .welcome-title {\n    font-size: 26px;\n  }\n  .top-bar {\n    padding: 16px 20px;\n  }\n}\n.color-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.color-row input[type=color] {\n  width: 44px;\n  height: 44px;\n  padding: 2px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  cursor: pointer;\n}\n.color-row .color-swatch {\n  width: 44px;\n  height: 44px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  flex-shrink: 0;\n}\n.icon-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 4px;\n}\n.icon-opt {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s ease;\n}\n.icon-opt .material-icons-round {\n  font-size: 20px;\n}\n.icon-opt:hover {\n  border-color: var(--border-strong);\n  background: var(--bg-card-hover);\n  transform: translateY(-2px);\n}\n.icon-opt.active {\n  border-color: currentColor;\n  background: var(--bg-card);\n  box-shadow: 0 0 0 2px currentColor;\n}\n.card-code-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 6px;\n}\n.card-actions {\n  display: flex;\n  gap: 4px;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.business-card:hover .card-actions {\n  opacity: 1;\n}\n.action-btn {\n  width: 28px;\n  height: 28px;\n  border-radius: 7px;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.15s ease;\n}\n.action-btn .material-icons-round {\n  font-size: 16px;\n}\n.action-btn.edit-btn {\n  background: var(--bg-card);\n  color: var(--text-muted);\n}\n.action-btn.edit-btn:hover {\n  background: rgba(59, 130, 246, 0.1254901961);\n  color: #3b82f6;\n}\n.action-btn.delete-btn {\n  background: var(--bg-card);\n  color: var(--text-muted);\n}\n.action-btn.delete-btn:hover {\n  background: rgba(239, 68, 68, 0.1254901961);\n  color: #ef4444;\n}\n.btn-danger {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  background: #ef4444;\n  color: #fff;\n  border: none;\n  border-radius: 10px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-danger:hover:not(:disabled) {\n  background: #dc2626;\n}\n.btn-danger:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-danger .material-icons-round {\n  font-size: 18px;\n}\n.modal-sm {\n  max-width: 420px !important;\n}\n.delete-msg {\n  font-size: 15px;\n  color: var(--text-primary);\n  margin-bottom: 8px;\n  line-height: 1.6;\n}\n.delete-msg strong {\n  color: var(--accent, #3b82f6);\n}\n.delete-hint {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-bottom: 12px;\n}\n.code-preview {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  margin-top: 4px;\n}\n.code-preview .material-icons-round {\n  font-size: 18px;\n  color: var(--text-muted);\n}\n.code-value {\n  font-family: monospace;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--accent, #3b82f6);\n  letter-spacing: 0.05em;\n}\n/*# sourceMappingURL=business-select.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BusinessSelectComponent, { className: "BusinessSelectComponent", filePath: "src/app/pages/business-select/business-select.ts", lineNumber: 17 });
})();
export {
  BusinessSelectComponent
};
//# sourceMappingURL=chunk-IGU3BIS7.js.map
