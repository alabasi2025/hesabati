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
  NgForOf,
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/roles/roles.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.userId;
var _forTrack2 = ($index, $item) => $item.key;
function RolesComponent_Conditional_44_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 32)(2, "span", 4);
    \u0275\u0275text(3, "admin_panel_settings");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u0627\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "\u0623\u0646\u0634\u0626 \u062F\u0648\u0631\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B \u0644\u062A\u062D\u062F\u064A\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 8);
    \u0275\u0275listener("click", function RolesComponent_Conditional_44_Conditional_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openForm());
    });
    \u0275\u0275elementStart(9, "span", 4);
    \u0275\u0275text(10, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u062F\u0648\u0631 \u062C\u062F\u064A\u062F ");
    \u0275\u0275elementEnd()();
  }
}
function RolesComponent_Conditional_44_Conditional_1_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function RolesComponent_Conditional_44_Conditional_1_For_2_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const role_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.deleteRole(role_r5.id));
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
}
function RolesComponent_Conditional_44_Conditional_1_For_2_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r2.getResourceLabel(p_r7.resource), " - ", ctx_r2.getActionLabel(p_r7.action), " ");
  }
}
function RolesComponent_Conditional_44_Conditional_1_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1, "\u0628\u062F\u0648\u0646 \u0635\u0644\u0627\u062D\u064A\u0627\u062A");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_Conditional_44_Conditional_1_For_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u0633\u0642\u0641: ", role_r5.maxVoucherAmount);
  }
}
function RolesComponent_Conditional_44_Conditional_1_For_2_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "\u0646\u0638\u0627\u0645");
    \u0275\u0275elementEnd();
  }
}
function RolesComponent_Conditional_44_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34);
    \u0275\u0275element(2, "div", 35);
    \u0275\u0275elementStart(3, "h3", 36);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 37)(6, "button", 38);
    \u0275\u0275listener("click", function RolesComponent_Conditional_44_Conditional_1_For_2_Template_button_click_6_listener() {
      const role_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.editRole(role_r5));
    });
    \u0275\u0275elementStart(7, "span", 4);
    \u0275\u0275text(8, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, RolesComponent_Conditional_44_Conditional_1_For_2_Conditional_9_Template, 3, 0, "button", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 40);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 41);
    \u0275\u0275repeaterCreate(13, RolesComponent_Conditional_44_Conditional_1_For_2_For_14_Template, 2, 2, "span", 42, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275conditionalCreate(15, RolesComponent_Conditional_44_Conditional_1_For_2_Conditional_15_Template, 2, 0, "span", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 44)(17, "span", 45)(18, "span", 4);
    \u0275\u0275text(19, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 46);
    \u0275\u0275conditionalCreate(22, RolesComponent_Conditional_44_Conditional_1_For_2_Conditional_22_Template, 2, 1, "span", 47);
    \u0275\u0275conditionalCreate(23, RolesComponent_Conditional_44_Conditional_1_For_2_Conditional_23_Template, 2, 0, "span", 48);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const role_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", role_r5.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r5.name);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(!role_r5.isSystem ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r5.description || "\u0628\u062F\u0648\u0646 \u0648\u0635\u0641");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(role_r5.permissions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!role_r5.permissions || role_r5.permissions.length === 0 ? 15 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", role_r5.userCount || 0, " \u0645\u0633\u062A\u062E\u062F\u0645 ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(role_r5.maxVoucherAmount ? 22 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(role_r5.isSystem ? 23 : -1);
  }
}
function RolesComponent_Conditional_44_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275repeaterCreate(1, RolesComponent_Conditional_44_Conditional_1_For_2_Template, 24, 9, "div", 33, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.roles());
  }
}
function RolesComponent_Conditional_44_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r8 = ctx.$implicit;
    \u0275\u0275property("value", u_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(u_r8.username);
  }
}
function RolesComponent_Conditional_44_option_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r9 = ctx.$implicit;
    \u0275\u0275property("value", r_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r9.name);
  }
}
function RolesComponent_Conditional_44_Conditional_30_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51)(1, "div", 52)(2, "span", 4);
    \u0275\u0275text(3, "person");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 53)(5, "div", 54);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 55);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 56);
    \u0275\u0275listener("click", function RolesComponent_Conditional_44_Conditional_30_For_2_Template_button_click_9_listener() {
      const ur_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.removeRole(ur_r11.userId));
    });
    \u0275\u0275elementStart(10, "span", 4);
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ur_r11 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ur_r11.userName);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ur_r11.roleColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ur_r11.roleName);
  }
}
function RolesComponent_Conditional_44_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275repeaterCreate(1, RolesComponent_Conditional_44_Conditional_30_For_2_Template, 12, 4, "div", 51, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.userRoles());
  }
}
function RolesComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, RolesComponent_Conditional_44_Conditional_0_Template, 12, 0, "div", 18)(1, RolesComponent_Conditional_44_Conditional_1_Template, 3, 0, "div", 19);
    \u0275\u0275elementStart(2, "div", 20)(3, "div", 21)(4, "div", 22)(5, "span", 4);
    \u0275\u0275text(6, "person_add");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h3");
    \u0275\u0275text(8, "\u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0623\u062F\u0648\u0627\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 23)(10, "div", 24)(11, "div", 25)(12, "label", 26);
    \u0275\u0275text(13, "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "select", 27);
    \u0275\u0275twoWayListener("ngModelChange", function RolesComponent_Conditional_44_Template_select_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.assignUserId, $event) || (ctx_r2.assignUserId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(15, "option", 28);
    \u0275\u0275text(16, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, RolesComponent_Conditional_44_option_17_Template, 2, 2, "option", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 25)(19, "label", 26);
    \u0275\u0275text(20, "\u0627\u0644\u062F\u0648\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "select", 27);
    \u0275\u0275twoWayListener("ngModelChange", function RolesComponent_Conditional_44_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.assignRoleId, $event) || (ctx_r2.assignRoleId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(22, "option", 28);
    \u0275\u0275text(23, "\u0627\u062E\u062A\u0631 \u0627\u0644\u062F\u0648\u0631...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, RolesComponent_Conditional_44_option_24_Template, 2, 2, "option", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 30)(26, "button", 8);
    \u0275\u0275listener("click", function RolesComponent_Conditional_44_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.assignRole());
    });
    \u0275\u0275elementStart(27, "span", 4);
    \u0275\u0275text(28, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, " \u062A\u0639\u064A\u064A\u0646 ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(30, RolesComponent_Conditional_44_Conditional_30_Template, 3, 0, "div", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.roles().length === 0 ? 0 : 1);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.assignUserId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.users());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.assignRoleId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.roles());
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r2.userRoles().length > 0 ? 30 : -1);
  }
}
function RolesComponent_Conditional_45_For_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getActionLabel(a_r13));
  }
}
function RolesComponent_Conditional_45_For_64_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 82)(1, "input", 84);
    \u0275\u0275listener("change", function RolesComponent_Conditional_45_For_64_For_6_Template_input_change_1_listener() {
      const a_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const res_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.togglePerm(res_r17.key, a_r16));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r16 = ctx.$implicit;
    const res_r17 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r2.hasPerm(res_r17.key, a_r16));
  }
}
function RolesComponent_Conditional_45_For_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 80)(2, "span", 81);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, RolesComponent_Conditional_45_For_64_For_6_Template, 2, 1, "td", 82, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(7, "td", 82)(8, "input", 83);
    \u0275\u0275listener("change", function RolesComponent_Conditional_45_For_64_Template_input_change_8_listener() {
      const res_r17 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleAllPerms(res_r17.key));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const res_r17 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(res_r17.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", res_r17.label, " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.allActions);
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r2.hasAllPerms(res_r17.key));
  }
}
function RolesComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275listener("click", function RolesComponent_Conditional_45_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelForm());
    });
    \u0275\u0275elementStart(1, "div", 58);
    \u0275\u0275listener("click", function RolesComponent_Conditional_45_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 59)(3, "div", 60)(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "h2");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 61);
    \u0275\u0275text(10, "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0648\u0627\u0644\u0633\u0642\u0648\u0641 \u0627\u0644\u0645\u0627\u0644\u064A\u0629");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 62);
    \u0275\u0275listener("click", function RolesComponent_Conditional_45_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelForm());
    });
    \u0275\u0275elementStart(12, "span", 4);
    \u0275\u0275text(13, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 63)(15, "div", 64)(16, "div", 65)(17, "div", 66);
    \u0275\u0275text(18, "\u0661");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062F\u0648\u0631");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 67)(22, "div", 68)(23, "label", 26);
    \u0275\u0275text(24, "\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0631 ");
    \u0275\u0275elementStart(25, "span", 69);
    \u0275\u0275text(26, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function RolesComponent_Conditional_45_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.name, $event) || (ctx_r2.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 68)(29, "label", 26);
    \u0275\u0275text(30, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 71);
    \u0275\u0275twoWayListener("ngModelChange", function RolesComponent_Conditional_45_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.description, $event) || (ctx_r2.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 67)(33, "div", 68)(34, "label", 26);
    \u0275\u0275text(35, "\u0627\u0644\u0644\u0648\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "input", 72);
    \u0275\u0275twoWayListener("ngModelChange", function RolesComponent_Conditional_45_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.color, $event) || (ctx_r2.form.color = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 68)(38, "label", 26);
    \u0275\u0275text(39, "\u0633\u0642\u0641 \u0627\u0644\u0633\u0646\u062F \u0627\u0644\u0648\u0627\u062D\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "input", 73);
    \u0275\u0275twoWayListener("ngModelChange", function RolesComponent_Conditional_45_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.maxVoucherAmount, $event) || (ctx_r2.form.maxVoucherAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div", 67)(42, "div", 68)(43, "label", 26);
    \u0275\u0275text(44, "\u0633\u0642\u0641 \u064A\u0648\u0645\u064A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "input", 73);
    \u0275\u0275twoWayListener("ngModelChange", function RolesComponent_Conditional_45_Template_input_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.maxDailyAmount, $event) || (ctx_r2.form.maxDailyAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(46, "div", 64)(47, "div", 65)(48, "div", 66);
    \u0275\u0275text(49, "\u0662");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span");
    \u0275\u0275text(51, "\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div", 74)(53, "table", 75)(54, "thead")(55, "tr")(56, "th", 76);
    \u0275\u0275text(57, "\u0627\u0644\u0645\u0648\u0631\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(58, RolesComponent_Conditional_45_For_59_Template, 2, 1, "th", 77, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(60, "th", 77);
    \u0275\u0275text(61, "\u0627\u0644\u0643\u0644");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(62, "tbody");
    \u0275\u0275repeaterCreate(63, RolesComponent_Conditional_45_For_64_Template, 9, 3, "tr", null, _forTrack2);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(65, "div", 78)(66, "button", 79);
    \u0275\u0275listener("click", function RolesComponent_Conditional_45_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelForm());
    });
    \u0275\u0275text(67, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "button", 8);
    \u0275\u0275listener("click", function RolesComponent_Conditional_45_Template_button_click_68_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275elementStart(69, "span", 4);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd();
    \u0275\u0275text(71);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.editId ? "edit" : "shield");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.editId ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062F\u0648\u0631" : "\u062F\u0648\u0631 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(19);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.color);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.maxVoucherAmount);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.maxDailyAmount);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r2.allActions);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.allResources);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.editId ? "save" : "add");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.editId ? "\u062A\u062D\u062F\u064A\u062B" : "\u062D\u0641\u0638", " ");
  }
}
var ALL_RESOURCES = [
  { key: "vouchers", label: "\u0627\u0644\u0633\u0646\u062F\u0627\u062A", icon: "receipt_long" },
  { key: "accounts", label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A", icon: "account_balance" },
  { key: "funds", label: "\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642", icon: "savings" },
  { key: "employees", label: "\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646", icon: "people" },
  { key: "stations", label: "\u0627\u0644\u0645\u062D\u0637\u0627\u062A", icon: "local_gas_station" },
  { key: "reports", label: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631", icon: "assessment" },
  { key: "settings", label: "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A", icon: "settings" },
  { key: "exchange_rates", label: "\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0635\u0631\u0641", icon: "currency_exchange" },
  { key: "journal", label: "\u0627\u0644\u0642\u064A\u0648\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628\u064A\u0629", icon: "menu_book" },
  { key: "collections", label: "\u0627\u0644\u062A\u062D\u0635\u064A\u0644", icon: "point_of_sale" }
];
var ALL_ACTIONS = ["create", "read", "update", "delete"];
var ACTION_LABELS = { create: "\u0625\u0646\u0634\u0627\u0621", read: "\u0639\u0631\u0636", update: "\u062A\u0639\u062F\u064A\u0644", delete: "\u062D\u0630\u0641" };
var RolesComponent = class _RolesComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  roles = signal([], ...ngDevMode ? [{ debugName: "roles" }] : (
    /* istanbul ignore next */
    []
  ));
  users = signal([], ...ngDevMode ? [{ debugName: "users" }] : (
    /* istanbul ignore next */
    []
  ));
  userRoles = signal([], ...ngDevMode ? [{ debugName: "userRoles" }] : (
    /* istanbul ignore next */
    []
  ));
  showForm = false;
  editId = null;
  form = { name: "", description: "", color: "#8b5cf6", maxVoucherAmount: null, maxDailyAmount: null };
  permSet = /* @__PURE__ */ new Set();
  allResources = ALL_RESOURCES;
  allActions = ALL_ACTIONS;
  assignUserId = "";
  assignRoleId = "";
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    const [roles, users, userRoles] = await Promise.all([
      this.api.getRoles(this.bizId),
      this.api.getUsers(),
      this.api.getUserRoles(this.bizId)
    ]);
    this.roles.set(roles);
    this.users.set(users);
    this.userRoles.set(userRoles);
  }
  getResourceLabel(key) {
    return ALL_RESOURCES.find((r) => r.key === key)?.label || key;
  }
  getActionLabel(key) {
    return ACTION_LABELS[key] || key;
  }
  hasPerm(resource, action) {
    return this.permSet.has(`${resource}:${action}`);
  }
  hasAllPerms(resource) {
    return ALL_ACTIONS.every((a) => this.permSet.has(`${resource}:${a}`));
  }
  togglePerm(resource, action) {
    const key = `${resource}:${action}`;
    if (this.permSet.has(key))
      this.permSet.delete(key);
    else
      this.permSet.add(key);
  }
  toggleAllPerms(resource) {
    const allHave = this.hasAllPerms(resource);
    ALL_ACTIONS.forEach((a) => {
      const k = `${resource}:${a}`;
      allHave ? this.permSet.delete(k) : this.permSet.add(k);
    });
  }
  openForm() {
    this.showForm = true;
    this.editId = null;
    this.form = { name: "", description: "", color: "#8b5cf6", maxVoucherAmount: null, maxDailyAmount: null };
    this.permSet.clear();
  }
  editRole(role) {
    this.editId = role.id;
    this.form = { name: role.name, description: role.description, color: role.color, maxVoucherAmount: role.maxVoucherAmount, maxDailyAmount: role.maxDailyAmount };
    this.permSet.clear();
    (role.permissions || []).forEach((p) => this.permSet.add(`${p.resource}:${p.action}`));
    this.showForm = true;
  }
  async save() {
    try {
      const permissions = Array.from(this.permSet).map((k) => {
        const [resource, action] = k.split(":");
        return { resource, action };
      });
      const data = __spreadProps(__spreadValues({}, this.form), { permissions });
      if (this.editId) {
        await this.api.updateRole(this.bizId, this.editId, data);
      } else {
        await this.api.createRole(this.bizId, data);
      }
      this.toast.success("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0628\u0646\u062C\u0627\u062D");
      this.cancelForm();
      this.load();
    } catch (e) {
      this.toast.error(e?.error?.error || "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  async deleteRole(id) {
    if (confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062F\u0648\u0631\u061F")) {
      await this.api.deleteRole(this.bizId, id);
      this.toast.success("\u062A\u0645 \u0627\u0644\u062D\u0630\u0641");
      this.load();
    }
  }
  cancelForm() {
    this.showForm = false;
    this.editId = null;
  }
  async assignRole() {
    if (!this.assignUserId || !this.assignRoleId)
      return;
    try {
      await this.api.assignUserRole(this.bizId, { userId: Number(this.assignUserId), roleId: Number(this.assignRoleId) });
      this.toast.success("\u062A\u0645 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 \u0628\u0646\u062C\u0627\u062D");
      this.load();
    } catch (e) {
      this.toast.error(e?.error?.error || "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  async removeRole(userId) {
    await this.api.removeUserRole(this.bizId, userId);
    this.toast.success("\u062A\u0645 \u0627\u0644\u0625\u0632\u0627\u0644\u0629");
    this.load();
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275RolesComponent_BaseFactory;
    return function RolesComponent_Factory(__ngFactoryType__) {
      return (\u0275RolesComponent_BaseFactory || (\u0275RolesComponent_BaseFactory = \u0275\u0275getInheritedFactory(_RolesComponent)))(__ngFactoryType__ || _RolesComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RolesComponent, selectors: [["app-roles"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 46, vars: 5, consts: [[1, "page-container"], [1, "page-header"], [1, "header-left"], [1, "page-icon-3d", "purple"], [1, "material-icons-round"], [1, "page-title"], [1, "page-subtitle"], [1, "header-right"], [1, "btn-3d", "btn-primary", 3, "click"], [1, "stats-row"], [1, "stat-card-3d", "purple"], [1, "sc-icon"], [1, "sc-body"], [1, "sc-num"], [1, "sc-label"], [1, "stat-card-3d", "blue"], [1, "stat-card-3d", "green"], [1, "modal-overlay"], [1, "empty-state"], [1, "roles-grid"], [1, "assign-card-3d"], [1, "assign-header"], [1, "assign-icon"], [1, "assign-body"], [1, "assign-form"], [1, "assign-field"], [1, "form-label"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "assign-action"], [1, "user-roles-list"], [1, "empty-icon-3d"], [1, "role-card-3d"], [1, "rc-header"], [1, "rc-color-dot"], [1, "rc-name"], [1, "rc-actions"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "icon-btn", "edit-btn", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "icon-btn", "delete-btn"], [1, "rc-desc"], [1, "rc-perms"], [1, "perm-badge"], [1, "perm-badge", "empty"], [1, "rc-footer"], [1, "rc-users"], [1, "rc-limits"], [1, "rc-limit"], [1, "rc-system-badge"], ["title", "\u062D\u0630\u0641", 1, "icon-btn", "delete-btn", 3, "click"], [3, "value"], [1, "ur-row-3d"], [1, "ur-avatar"], [1, "ur-info"], [1, "ur-name"], [1, "ur-role-badge"], ["title", "\u0625\u0632\u0627\u0644\u0629", 1, "icon-btn", "delete-btn", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-3d", "form-modal", 3, "click"], [1, "modal-header", "purple-header"], [1, "modal-icon", "purple"], [1, "modal-subtitle"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "form-step"], [1, "step-header"], [1, "step-num"], [1, "form-row"], [1, "form-group"], [1, "required"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u0645\u062D\u0627\u0633\u0628", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\u0648\u0635\u0641 \u0627\u062E\u062A\u064A\u0627\u0631\u064A", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "color", 1, "form-color", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "0 = \u0628\u062F\u0648\u0646 \u062D\u062F", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "perms-table-wrap"], [1, "perms-table"], [1, "res-col"], [1, "action-col"], [1, "modal-footer"], [1, "btn-3d", "btn-ghost", 3, "click"], [1, "res-cell"], [1, "material-icons-round", "res-icon"], [1, "action-cell"], ["type", "checkbox", 1, "perm-checkbox", "all", 3, "change", "checked"], ["type", "checkbox", 1, "perm-checkbox", 3, "change", "checked"]], template: function RolesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "admin_panel_settings");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h1", 5);
      \u0275\u0275text(8, "\u0627\u0644\u0623\u062F\u0648\u0627\u0631 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10, "\u0625\u062F\u0627\u0631\u0629 \u0623\u062F\u0648\u0627\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0648\u0635\u0644\u0627\u062D\u064A\u0627\u062A\u0647\u0645 \u0648\u0627\u0644\u0633\u0642\u0648\u0641 \u0627\u0644\u0645\u0627\u0644\u064A\u0629");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
      \u0275\u0275listener("click", function RolesComponent_Template_button_click_12_listener() {
        return ctx.openForm();
      });
      \u0275\u0275elementStart(13, "span", 4);
      \u0275\u0275text(14, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15, " \u062F\u0648\u0631 \u062C\u062F\u064A\u062F ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 9)(17, "div", 10)(18, "div", 11)(19, "span", 4);
      \u0275\u0275text(20, "shield");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 12)(22, "div", 13);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 14);
      \u0275\u0275text(25, "\u0627\u0644\u0623\u062F\u0648\u0627\u0631");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 15)(27, "div", 11)(28, "span", 4);
      \u0275\u0275text(29, "people");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 12)(31, "div", 13);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 14);
      \u0275\u0275text(34, "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 16)(36, "div", 11)(37, "span", 4);
      \u0275\u0275text(38, "assignment_ind");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "div", 12)(40, "div", 13);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 14);
      \u0275\u0275text(43, "\u062A\u0639\u064A\u064A\u0646\u0627\u062A \u0646\u0634\u0637\u0629");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(44, RolesComponent_Conditional_44_Template, 31, 6);
      \u0275\u0275conditionalCreate(45, RolesComponent_Conditional_45_Template, 72, 9, "div", 17);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(23);
      \u0275\u0275textInterpolate(ctx.roles().length);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.users().length);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.userRoles().length);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.showForm ? 44 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showForm ? 45 : -1);
    }
  }, dependencies: [CommonModule, NgForOf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ['\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(139, 92, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border-radius: 20px;\n  border: 1px solid rgba(139, 92, 246, 0.12);\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-icon-3d[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.page-icon-3d.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n}\n.page-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: white;\n}\n.page-icon-3d[_ngcontent-%COMP%]:hover {\n  transform: perspective(100px) rotateX(0deg) scale(1.05);\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 3px;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.btn-3d[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);\n}\n.btn-3d.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: var(--text-secondary, #64748b);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n}\n.btn-3d.btn-ghost[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface, #f8fafc);\n  transform: translateY(-1px);\n}\n.stats-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.stat-card-3d[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  flex: 1;\n  min-width: 160px;\n}\n.stat-card-3d[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.stat-card-3d[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-card-3d[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: white;\n}\n.stat-card-3d.purple[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n}\n.stat-card-3d.blue[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.stat-card-3d.green[_ngcontent-%COMP%]   .sc-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.sc-num[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n}\n.sc-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n.empty-icon-3d[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 12px 32px rgba(139, 92, 246, 0.3);\n  transform: perspective(150px) rotateX(10deg);\n}\n.empty-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: white;\n}\n.roles-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 14px;\n  margin-bottom: 20px;\n}\n.role-card-3d[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.role-card-3d[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.rc-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n.rc-color-dot[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  border-radius: 4px;\n  flex-shrink: 0;\n}\n.rc-name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n}\n.rc-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n}\n.rc-desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 10px;\n}\n.rc-perms[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n  margin-bottom: 12px;\n}\n.perm-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 5px;\n  background: rgba(139, 92, 246, 0.08);\n  color: #8b5cf6;\n}\n.perm-badge.empty[_ngcontent-%COMP%] {\n  background: rgba(100, 116, 139, 0.08);\n  color: #94a3b8;\n}\n.rc-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 10px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n}\n.rc-users[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n}\n.rc-users[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.rc-limits[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n}\n.rc-limit[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n}\n.rc-system-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  padding: 1px 6px;\n  border-radius: 4px;\n  background: rgba(245, 158, 11, 0.1);\n  color: #f59e0b;\n}\n.assign-card-3d[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  border-radius: 18px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(139, 92, 246, 0.12);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  overflow: hidden;\n}\n.assign-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(139, 92, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border-bottom: 1px solid rgba(139, 92, 246, 0.08);\n}\n.assign-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n}\n.assign-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 3px 8px rgba(139, 92, 246, 0.3);\n}\n.assign-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: white;\n}\n.assign-body[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n}\n.assign-form[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 12px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.assign-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 150px;\n}\n.assign-action[_ngcontent-%COMP%] {\n  padding-bottom: 0;\n}\n.user-roles-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.ur-row-3d[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  border-radius: 12px;\n  background: var(--bg-surface, #f8fafc);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  transition: all 0.2s;\n}\n.ur-row-3d[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card, white);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n}\n.ur-avatar[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      #64748b,\n      #475569);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ur-avatar[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: white;\n}\n.ur-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.ur-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.ur-role-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 6px;\n  color: white;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.icon-btn.edit-btn[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.icon-btn.edit-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.1);\n}\n.icon-btn.delete-btn[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.icon-btn.delete-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-3d[_ngcontent-%COMP%] {\n  background: var(--bg-card, white);\n  border-radius: 22px;\n  width: 100%;\n  max-width: 580px;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.08);\n  animation: _ngcontent-%COMP%_slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(40px) scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.form-modal[_ngcontent-%COMP%] {\n  max-width: 720px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 18px 22px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.modal-header.purple-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(139, 92, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n  flex: 1;\n}\n.modal-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 2px 0 0;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 21px;\n  color: white;\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n}\n.modal-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  border: none;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.modal-close[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 18px 22px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  padding: 14px 22px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.form-step[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding: 14px;\n  border-radius: 12px;\n  background: var(--bg-surface, #f8fafc);\n}\n.step-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 12px;\n}\n.step-num[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 900;\n  flex-shrink: 0;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.form-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.form-input[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #8b5cf6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);\n}\n.form-color[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  cursor: pointer;\n}\n.perms-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border-radius: 10px;\n  border: 1px solid var(--border-color, #e2e8f0);\n}\n.perms-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.perms-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.perms-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.perms-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  background: var(--bg-card, white);\n}\n.perms-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: var(--text-secondary, #64748b);\n  font-weight: 700;\n}\n.perms-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  transition: background 0.15s;\n}\n.perms-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: rgba(139, 92, 246, 0.03);\n}\n.res-col[_ngcontent-%COMP%] {\n  text-align: right;\n  min-width: 140px;\n}\n.action-col[_ngcontent-%COMP%] {\n  text-align: center;\n  width: 70px;\n}\n.res-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--text-primary, #1e293b);\n}\n.res-icon[_ngcontent-%COMP%] {\n  font-size: 16px !important;\n  color: var(--text-muted, #94a3b8);\n}\n.action-cell[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.perm-checkbox[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  accent-color: #8b5cf6;\n  cursor: pointer;\n}\n.perm-checkbox.all[_ngcontent-%COMP%] {\n  accent-color: #22c55e;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 14px;\n    align-items: flex-start;\n  }\n  .stats-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .roles-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .modal-3d[_ngcontent-%COMP%] {\n    border-radius: 16px;\n  }\n  .assign-form[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=roles.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RolesComponent, [{
    type: Component,
    args: [{ selector: "app-roles", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-container">\r
\r
  <!-- ===== Page Header ===== -->\r
  <div class="page-header">\r
    <div class="header-left">\r
      <div class="page-icon-3d purple">\r
        <span class="material-icons-round">admin_panel_settings</span>\r
      </div>\r
      <div>\r
        <h1 class="page-title">\u0627\u0644\u0623\u062F\u0648\u0627\u0631 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A</h1>\r
        <p class="page-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0623\u062F\u0648\u0627\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0648\u0635\u0644\u0627\u062D\u064A\u0627\u062A\u0647\u0645 \u0648\u0627\u0644\u0633\u0642\u0648\u0641 \u0627\u0644\u0645\u0627\u0644\u064A\u0629</p>\r
      </div>\r
    </div>\r
    <div class="header-right">\r
      <button class="btn-3d btn-primary" (click)="openForm()">\r
        <span class="material-icons-round">add</span>\r
        \u062F\u0648\u0631 \u062C\u062F\u064A\u062F\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- ===== Stats Cards ===== -->\r
  <div class="stats-row">\r
    <div class="stat-card-3d purple">\r
      <div class="sc-icon"><span class="material-icons-round">shield</span></div>\r
      <div class="sc-body">\r
        <div class="sc-num">{{ roles().length }}</div>\r
        <div class="sc-label">\u0627\u0644\u0623\u062F\u0648\u0627\u0631</div>\r
      </div>\r
    </div>\r
    <div class="stat-card-3d blue">\r
      <div class="sc-icon"><span class="material-icons-round">people</span></div>\r
      <div class="sc-body">\r
        <div class="sc-num">{{ users().length }}</div>\r
        <div class="sc-label">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646</div>\r
      </div>\r
    </div>\r
    <div class="stat-card-3d green">\r
      <div class="sc-icon"><span class="material-icons-round">assignment_ind</span></div>\r
      <div class="sc-body">\r
        <div class="sc-num">{{ userRoles().length }}</div>\r
        <div class="sc-label">\u062A\u0639\u064A\u064A\u0646\u0627\u062A \u0646\u0634\u0637\u0629</div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- ===== \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0623\u062F\u0648\u0627\u0631 ===== -->\r
  @if (!showForm) {\r
    @if (roles().length === 0) {\r
      <div class="empty-state">\r
        <div class="empty-icon-3d">\r
          <span class="material-icons-round">admin_panel_settings</span>\r
        </div>\r
        <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u062F\u0648\u0627\u0631</h3>\r
        <p>\u0623\u0646\u0634\u0626 \u062F\u0648\u0631\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B \u0644\u062A\u062D\u062F\u064A\u062F \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</p>\r
        <button class="btn-3d btn-primary" (click)="openForm()">\r
          <span class="material-icons-round">add</span>\r
          \u062F\u0648\u0631 \u062C\u062F\u064A\u062F\r
        </button>\r
      </div>\r
    } @else {\r
      <div class="roles-grid">\r
        @for (role of roles(); track role.id) {\r
          <div class="role-card-3d">\r
            <div class="rc-header">\r
              <div class="rc-color-dot" [style.background]="role.color"></div>\r
              <h3 class="rc-name">{{ role.name }}</h3>\r
              <div class="rc-actions">\r
                <button class="icon-btn edit-btn" (click)="editRole(role)" title="\u062A\u0639\u062F\u064A\u0644">\r
                  <span class="material-icons-round">edit</span>\r
                </button>\r
                @if (!role.isSystem) {\r
                  <button class="icon-btn delete-btn" (click)="deleteRole(role.id)" title="\u062D\u0630\u0641">\r
                    <span class="material-icons-round">delete</span>\r
                  </button>\r
                }\r
              </div>\r
            </div>\r
            <p class="rc-desc">{{ role.description || '\u0628\u062F\u0648\u0646 \u0648\u0635\u0641' }}</p>\r
            <div class="rc-perms">\r
              @for (p of role.permissions; track $index) {\r
                <span class="perm-badge">\r
                  {{ getResourceLabel(p.resource) }} - {{ getActionLabel(p.action) }}\r
                </span>\r
              }\r
              @if (!role.permissions || role.permissions.length === 0) {\r
                <span class="perm-badge empty">\u0628\u062F\u0648\u0646 \u0635\u0644\u0627\u062D\u064A\u0627\u062A</span>\r
              }\r
            </div>\r
            <div class="rc-footer">\r
              <span class="rc-users">\r
                <span class="material-icons-round">people</span>\r
                {{ role.userCount || 0 }} \u0645\u0633\u062A\u062E\u062F\u0645\r
              </span>\r
              <div class="rc-limits">\r
                @if (role.maxVoucherAmount) {\r
                  <span class="rc-limit">\u0633\u0642\u0641: {{ role.maxVoucherAmount }}</span>\r
                }\r
                @if (role.isSystem) {\r
                  <span class="rc-system-badge">\u0646\u0638\u0627\u0645</span>\r
                }\r
              </div>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    }\r
\r
    <!-- ===== \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0623\u062F\u0648\u0627\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 ===== -->\r
    <div class="assign-card-3d">\r
      <div class="assign-header">\r
        <div class="assign-icon">\r
          <span class="material-icons-round">person_add</span>\r
        </div>\r
        <h3>\u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0623\u062F\u0648\u0627\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</h3>\r
      </div>\r
      <div class="assign-body">\r
        <div class="assign-form">\r
          <div class="assign-field">\r
            <label class="form-label">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</label>\r
            <select class="form-select" [(ngModel)]="assignUserId">\r
              <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645...</option>\r
              <option *ngFor="let u of users()" [value]="u.id">{{u.username}}</option>\r
            </select>\r
          </div>\r
          <div class="assign-field">\r
            <label class="form-label">\u0627\u0644\u062F\u0648\u0631</label>\r
            <select class="form-select" [(ngModel)]="assignRoleId">\r
              <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062F\u0648\u0631...</option>\r
              <option *ngFor="let r of roles()" [value]="r.id">{{r.name}}</option>\r
            </select>\r
          </div>\r
          <div class="assign-action">\r
            <button class="btn-3d btn-primary" (click)="assignRole()">\r
              <span class="material-icons-round">person_add</span>\r
              \u062A\u0639\u064A\u064A\u0646\r
            </button>\r
          </div>\r
        </div>\r
\r
        @if (userRoles().length > 0) {\r
          <div class="user-roles-list">\r
            @for (ur of userRoles(); track ur.userId) {\r
              <div class="ur-row-3d">\r
                <div class="ur-avatar">\r
                  <span class="material-icons-round">person</span>\r
                </div>\r
                <div class="ur-info">\r
                  <div class="ur-name">{{ ur.userName }}</div>\r
                </div>\r
                <span class="ur-role-badge" [style.background]="ur.roleColor">{{ ur.roleName }}</span>\r
                <button class="icon-btn delete-btn" (click)="removeRole(ur.userId)" title="\u0625\u0632\u0627\u0644\u0629">\r
                  <span class="material-icons-round">close</span>\r
                </button>\r
              </div>\r
            }\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===== \u0646\u0645\u0648\u0630\u062C \u0625\u0646\u0634\u0627\u0621/\u062A\u0639\u062F\u064A\u0644 \u062F\u0648\u0631 (Modal) ===== -->\r
  @if (showForm) {\r
    <div class="modal-overlay" (click)="cancelForm()">\r
      <div class="modal-3d form-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header purple-header">\r
          <div class="modal-icon purple">\r
            <span class="material-icons-round">{{ editId ? 'edit' : 'shield' }}</span>\r
          </div>\r
          <div>\r
            <h2>{{ editId ? '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062F\u0648\u0631' : '\u062F\u0648\u0631 \u062C\u062F\u064A\u062F' }}</h2>\r
            <p class="modal-subtitle">\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0648\u0627\u0644\u0633\u0642\u0648\u0641 \u0627\u0644\u0645\u0627\u0644\u064A\u0629</p>\r
          </div>\r
          <button class="modal-close" (click)="cancelForm()">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          <!-- Step 1: \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062F\u0648\u0631 -->\r
          <div class="form-step">\r
            <div class="step-header">\r
              <div class="step-num">\u0661</div>\r
              <span>\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062F\u0648\u0631</span>\r
            </div>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label class="form-label">\u0627\u0633\u0645 \u0627\u0644\u062F\u0648\u0631 <span class="required">*</span></label>\r
                <input type="text" class="form-input" [(ngModel)]="form.name" placeholder="\u0645\u062B\u0627\u0644: \u0645\u062D\u0627\u0633\u0628">\r
              </div>\r
              <div class="form-group">\r
                <label class="form-label">\u0627\u0644\u0648\u0635\u0641</label>\r
                <input type="text" class="form-input" [(ngModel)]="form.description" placeholder="\u0648\u0635\u0641 \u0627\u062E\u062A\u064A\u0627\u0631\u064A">\r
              </div>\r
            </div>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label class="form-label">\u0627\u0644\u0644\u0648\u0646</label>\r
                <input type="color" class="form-color" [(ngModel)]="form.color">\r
              </div>\r
              <div class="form-group">\r
                <label class="form-label">\u0633\u0642\u0641 \u0627\u0644\u0633\u0646\u062F \u0627\u0644\u0648\u0627\u062D\u062F</label>\r
                <input type="number" class="form-input" [(ngModel)]="form.maxVoucherAmount" placeholder="0 = \u0628\u062F\u0648\u0646 \u062D\u062F">\r
              </div>\r
            </div>\r
            <div class="form-row">\r
              <div class="form-group">\r
                <label class="form-label">\u0633\u0642\u0641 \u064A\u0648\u0645\u064A</label>\r
                <input type="number" class="form-input" [(ngModel)]="form.maxDailyAmount" placeholder="0 = \u0628\u062F\u0648\u0646 \u062D\u062F">\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- Step 2: \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A -->\r
          <div class="form-step">\r
            <div class="step-header">\r
              <div class="step-num">\u0662</div>\r
              <span>\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A</span>\r
            </div>\r
            <div class="perms-table-wrap">\r
              <table class="perms-table">\r
                <thead>\r
                  <tr>\r
                    <th class="res-col">\u0627\u0644\u0645\u0648\u0631\u062F</th>\r
                    @for (a of allActions; track a) {\r
                      <th class="action-col">{{ getActionLabel(a) }}</th>\r
                    }\r
                    <th class="action-col">\u0627\u0644\u0643\u0644</th>\r
                  </tr>\r
                </thead>\r
                <tbody>\r
                  @for (res of allResources; track res.key) {\r
                    <tr>\r
                      <td class="res-cell">\r
                        <span class="material-icons-round res-icon">{{ res.icon }}</span>\r
                        {{ res.label }}\r
                      </td>\r
                      @for (a of allActions; track a) {\r
                        <td class="action-cell">\r
                          <input type="checkbox" class="perm-checkbox" [checked]="hasPerm(res.key, a)" (change)="togglePerm(res.key, a)">\r
                        </td>\r
                      }\r
                      <td class="action-cell">\r
                        <input type="checkbox" class="perm-checkbox all" [checked]="hasAllPerms(res.key)" (change)="toggleAllPerms(res.key)">\r
                      </td>\r
                    </tr>\r
                  }\r
                </tbody>\r
              </table>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-3d btn-ghost" (click)="cancelForm()">\u0625\u0644\u063A\u0627\u0621</button>\r
          <button class="btn-3d btn-primary" (click)="save()">\r
            <span class="material-icons-round">{{ editId ? 'save' : 'add' }}</span>\r
            {{ editId ? '\u062A\u062D\u062F\u064A\u062B' : '\u062D\u0641\u0638' }}\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
</div>\r
`, styles: ['/* src/app/pages/roles/roles.scss */\n.page-container {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(139, 92, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border-radius: 20px;\n  border: 1px solid rgba(139, 92, 246, 0.12);\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-icon-3d {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.page-icon-3d.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n}\n.page-icon-3d .material-icons-round {\n  font-size: 26px;\n  color: white;\n}\n.page-icon-3d:hover {\n  transform: perspective(100px) rotateX(0deg) scale(1.05);\n}\n.page-title {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 3px;\n}\n.page-subtitle {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.btn-3d {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 18px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d .material-icons-round {\n  font-size: 17px;\n}\n.btn-3d.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.btn-3d.btn-primary:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);\n}\n.btn-3d.btn-ghost {\n  background: transparent;\n  color: var(--text-secondary, #64748b);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n}\n.btn-3d.btn-ghost:hover {\n  background: var(--bg-surface, #f8fafc);\n  transform: translateY(-1px);\n}\n.stats-row {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.stat-card-3d {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  flex: 1;\n  min-width: 160px;\n}\n.stat-card-3d:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.stat-card-3d .sc-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-card-3d .sc-icon .material-icons-round {\n  font-size: 22px;\n  color: white;\n}\n.stat-card-3d.purple .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n}\n.stat-card-3d.blue .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.stat-card-3d.green .sc-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.sc-num {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n}\n.sc-label {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.empty-state p {\n  font-size: 14px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n.empty-icon-3d {\n  width: 72px;\n  height: 72px;\n  border-radius: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 12px 32px rgba(139, 92, 246, 0.3);\n  transform: perspective(150px) rotateX(10deg);\n}\n.empty-icon-3d .material-icons-round {\n  font-size: 36px;\n  color: white;\n}\n.roles-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 14px;\n  margin-bottom: 20px;\n}\n.role-card-3d {\n  padding: 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.role-card-3d:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.rc-header {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n.rc-color-dot {\n  width: 12px;\n  height: 12px;\n  border-radius: 4px;\n  flex-shrink: 0;\n}\n.rc-name {\n  flex: 1;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n}\n.rc-actions {\n  display: flex;\n  gap: 2px;\n}\n.rc-desc {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin-bottom: 10px;\n}\n.rc-perms {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n  margin-bottom: 12px;\n}\n.perm-badge {\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 7px;\n  border-radius: 5px;\n  background: rgba(139, 92, 246, 0.08);\n  color: #8b5cf6;\n}\n.perm-badge.empty {\n  background: rgba(100, 116, 139, 0.08);\n  color: #94a3b8;\n}\n.rc-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 10px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n}\n.rc-users {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n}\n.rc-users .material-icons-round {\n  font-size: 14px;\n}\n.rc-limits {\n  display: flex;\n  gap: 6px;\n}\n.rc-limit {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n}\n.rc-system-badge {\n  font-size: 10px;\n  font-weight: 700;\n  padding: 1px 6px;\n  border-radius: 4px;\n  background: rgba(245, 158, 11, 0.1);\n  color: #f59e0b;\n}\n.assign-card-3d {\n  margin-top: 20px;\n  border-radius: 18px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(139, 92, 246, 0.12);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  overflow: hidden;\n}\n.assign-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 14px 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(139, 92, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n  border-bottom: 1px solid rgba(139, 92, 246, 0.08);\n}\n.assign-header h3 {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n}\n.assign-icon {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 3px 8px rgba(139, 92, 246, 0.3);\n}\n.assign-icon .material-icons-round {\n  font-size: 18px;\n  color: white;\n}\n.assign-body {\n  padding: 16px 20px;\n}\n.assign-form {\n  display: flex;\n  align-items: flex-end;\n  gap: 12px;\n  margin-bottom: 16px;\n  flex-wrap: wrap;\n}\n.assign-field {\n  flex: 1;\n  min-width: 150px;\n}\n.assign-action {\n  padding-bottom: 0;\n}\n.user-roles-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.ur-row-3d {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  border-radius: 12px;\n  background: var(--bg-surface, #f8fafc);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  transition: all 0.2s;\n}\n.ur-row-3d:hover {\n  background: var(--bg-card, white);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n}\n.ur-avatar {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  background:\n    linear-gradient(\n      135deg,\n      #64748b,\n      #475569);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ur-avatar .material-icons-round {\n  font-size: 18px;\n  color: white;\n}\n.ur-info {\n  flex: 1;\n}\n.ur-name {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.ur-role-badge {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 6px;\n  color: white;\n}\n.icon-btn {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn .material-icons-round {\n  font-size: 15px;\n}\n.icon-btn.edit-btn {\n  color: #3b82f6;\n}\n.icon-btn.edit-btn:hover {\n  background: rgba(59, 130, 246, 0.1);\n}\n.icon-btn.delete-btn {\n  color: #ef4444;\n}\n.icon-btn.delete-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  animation: fadeIn 0.2s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-3d {\n  background: var(--bg-card, white);\n  border-radius: 22px;\n  width: 100%;\n  max-width: 580px;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.08);\n  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes slideUp {\n  from {\n    transform: translateY(40px) scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.form-modal {\n  max-width: 720px;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 18px 22px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.modal-header.purple-header {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(139, 92, 246, 0.06),\n      rgba(99, 102, 241, 0.04));\n}\n.modal-header h2 {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n  flex: 1;\n}\n.modal-subtitle {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 2px 0 0;\n}\n.modal-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);\n}\n.modal-icon .material-icons-round {\n  font-size: 21px;\n  color: white;\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n}\n.modal-close {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  border: none;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.modal-close .material-icons-round {\n  font-size: 17px;\n}\n.modal-close:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 18px 22px;\n}\n.modal-footer {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  padding: 14px 22px;\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.form-step {\n  margin-bottom: 16px;\n  padding: 14px;\n  border-radius: 12px;\n  background: var(--bg-surface, #f8fafc);\n}\n.step-header {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 12px;\n}\n.step-num {\n  width: 26px;\n  height: 26px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 900;\n  flex-shrink: 0;\n}\n.form-group {\n  margin-bottom: 12px;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.form-label {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.form-label .required {\n  color: #ef4444;\n}\n.form-input,\n.form-select {\n  width: 100%;\n  padding: 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input:focus,\n.form-select:focus {\n  border-color: #8b5cf6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);\n}\n.form-color {\n  width: 100%;\n  height: 40px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  cursor: pointer;\n}\n.perms-table-wrap {\n  overflow-x: auto;\n  border-radius: 10px;\n  border: 1px solid var(--border-color, #e2e8f0);\n}\n.perms-table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.perms-table th,\n.perms-table td {\n  padding: 8px 10px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.perms-table thead tr {\n  background: var(--bg-card, white);\n}\n.perms-table th {\n  color: var(--text-secondary, #64748b);\n  font-weight: 700;\n}\n.perms-table tbody tr {\n  border-top: 1px solid var(--border-color, #e2e8f0);\n  transition: background 0.15s;\n}\n.perms-table tbody tr:hover {\n  background: rgba(139, 92, 246, 0.03);\n}\n.res-col {\n  text-align: right;\n  min-width: 140px;\n}\n.action-col {\n  text-align: center;\n  width: 70px;\n}\n.res-cell {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--text-primary, #1e293b);\n}\n.res-icon {\n  font-size: 16px !important;\n  color: var(--text-muted, #94a3b8);\n}\n.action-cell {\n  text-align: center;\n}\n.perm-checkbox {\n  width: 16px;\n  height: 16px;\n  accent-color: #8b5cf6;\n  cursor: pointer;\n}\n.perm-checkbox.all {\n  accent-color: #22c55e;\n}\n@media (max-width: 768px) {\n  .page-header {\n    flex-direction: column;\n    gap: 14px;\n    align-items: flex-start;\n  }\n  .stats-row {\n    flex-direction: column;\n  }\n  .roles-grid {\n    grid-template-columns: 1fr;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n  .modal-3d {\n    border-radius: 16px;\n  }\n  .assign-form {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=roles.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RolesComponent, { className: "RolesComponent", filePath: "src/app/pages/roles/roles.ts", lineNumber: 33 });
})();
export {
  RolesComponent
};
//# sourceMappingURL=chunk-ACWM4O3E.js.map
