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
  AuthService,
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
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VUZEB5JS.js";

// src/app/pages/sidebar-settings/sidebar-settings.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.itemId;
function SidebarSettingsComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 9)(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("success", ctx_r0.messageType() === "success")("error", ctx_r0.messageType() === "error");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.messageType() === "success" ? "check_circle" : "error");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.message(), " ");
  }
}
function SidebarSettingsComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 8)(1, "span", 10);
    \u0275\u0275text(2, "sync");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275domElementEnd()();
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_0_For_8_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 23);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275domElementEnd();
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_0_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 18);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_0_For_8_Template_div_click_0_listener() {
      const user_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.selectUser(user_r3));
    });
    \u0275\u0275domElementStart(1, "div", 19)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "div", 20)(5, "span", 21);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "span", 22);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(9, SidebarSettingsComponent_Conditional_26_Conditional_0_For_8_Conditional_9_Template, 2, 0, "span", 23);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    let tmp_17_0;
    const user_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ((tmp_12_0 = ctx_r0.selectedUser()) == null ? null : tmp_12_0.id) === user_r3.id);
    \u0275\u0275advance();
    \u0275\u0275classMap("role-" + user_r3.role);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getRoleIcon(user_r3.role));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r3.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getRoleLabel(user_r3.role));
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_17_0 = ctx_r0.selectedUser()) == null ? null : tmp_17_0.id) === user_r3.id ? 9 : -1);
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 17)(1, "span", 4);
    \u0275\u0275text(2, "touch_app");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4, "\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u0644\u062A\u0639\u062F\u064A\u0644 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062C\u0627\u0646\u0628\u064A");
    \u0275\u0275domElementEnd()();
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 33);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const sectionName_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.toggleAllInSection(ctx_r0.getSectionId(sectionName_r6), true));
    });
    \u0275\u0275domElementStart(1, "span", 4);
    \u0275\u0275text(2, "visibility");
    \u0275\u0275domElementEnd()();
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 34);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const sectionName_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.toggleAllInSection(ctx_r0.getSectionId(sectionName_r6), false));
    });
    \u0275\u0275domElementStart(1, "span", 4);
    \u0275\u0275text(2, "visibility_off");
    \u0275\u0275domElementEnd()();
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 35);
    \u0275\u0275domListener("dragstart", function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_For_9_Template_div_dragstart_0_listener($event) {
      const \u0275$index_146_r9 = \u0275\u0275restoreView(_r8).$index;
      const sectionName_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.onDragStart($event, \u0275$index_146_r9, sectionName_r6));
    })("dragover", function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_For_9_Template_div_dragover_0_listener($event) {
      const \u0275$index_146_r9 = \u0275\u0275restoreView(_r8).$index;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.onDragOver($event, \u0275$index_146_r9));
    })("dragleave", function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_For_9_Template_div_dragleave_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.onDragLeave());
    })("drop", function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_For_9_Template_div_drop_0_listener($event) {
      const \u0275$index_146_r9 = \u0275\u0275restoreView(_r8).$index;
      const sectionName_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.onDrop($event, \u0275$index_146_r9, sectionName_r6));
    })("dragend", function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_For_9_Template_div_dragend_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.onDragEnd());
    });
    \u0275\u0275domElementStart(1, "span", 36);
    \u0275\u0275text(2, "drag_indicator");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 37)(4, "span", 4);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "span", 38);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "button", 39);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_For_9_Template_button_click_8_listener() {
      const item_r10 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.toggleItemVisibility(item_r10.itemId));
    });
    \u0275\u0275domElementStart(9, "span", 4);
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const \u0275$index_146_r9 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275classProp("visible", item_r10.isVisible)("hidden-item", !item_r10.isVisible)("drag-over", ctx_r0.dragOverIndex() === \u0275$index_146_r9);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r10.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r10.label);
    \u0275\u0275advance();
    \u0275\u0275classProp("on", item_r10.isVisible);
    \u0275\u0275domProperty("title", item_r10.isVisible ? "\u0625\u062E\u0641\u0627\u0621" : "\u0625\u0638\u0647\u0627\u0631");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r10.isVisible ? "visibility" : "visibility_off");
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 26)(1, "div", 27)(2, "h4");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "div", 28);
    \u0275\u0275conditionalCreate(5, SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_Conditional_5_Template, 3, 0, "button", 29);
    \u0275\u0275conditionalCreate(6, SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_Conditional_6_Template, 3, 0, "button", 30);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "div", 31);
    \u0275\u0275repeaterCreate(8, SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_For_9_Template, 11, 12, "div", 32, _forTrack1);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const sectionName_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sectionName_r6);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r0.isSectionAllVisible(sectionName_r6) ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isSectionNoneVisible(sectionName_r6) ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.getItemsForSection(sectionName_r6));
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 13)(1, "h3")(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 24);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.saveUserConfig());
    });
    \u0275\u0275domElementStart(6, "span", 4);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "div", 25)(10, "span", 4);
    \u0275\u0275text(11, "info");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(12, " \u0641\u0639\u0651\u0644 \u0623\u0648 \u0639\u0637\u0651\u0644 \u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u0627\u0633\u062D\u0628 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0631\u062A\u064A\u0628\u0647\u0627. ");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(13, SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_For_14_Template, 10, 3, "div", 26, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.getRoleIcon(ctx_r0.selectedUser().role));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u062A\u0628\u0648\u064A\u0628 ", ctx_r0.selectedUser().fullName, " ");
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r0.savingUser());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.savingUser() ? "sync" : "save");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.savingUser() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A", " ");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.getSectionNames());
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 11)(1, "div", 12)(2, "div", 13)(3, "h3");
    \u0275\u0275text(4, "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "span", 14);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275repeaterCreate(7, SidebarSettingsComponent_Conditional_26_Conditional_0_For_8_Template, 10, 8, "div", 15, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "div", 16);
    \u0275\u0275conditionalCreate(10, SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_10_Template, 5, 0, "div", 17)(11, SidebarSettingsComponent_Conditional_26_Conditional_0_Conditional_11_Template, 15, 5);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.users().length);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.users());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r0.selectedUser() ? 10 : 11);
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_1_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 43)(1, "div", 45)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "div", 46)(5, "h4");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "span", 47);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "div", 48)(10, "button", 49);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_1_For_10_Template_button_click_10_listener() {
      const section_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.openSectionForm(section_r13));
    });
    \u0275\u0275domElementStart(11, "span", 4);
    \u0275\u0275text(12, "edit");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(13, "button", 50);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_1_For_10_Template_button_click_13_listener() {
      const section_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.deleteSection(section_r13));
    });
    \u0275\u0275domElementStart(14, "span", 4);
    \u0275\u0275text(15, "delete");
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const section_r13 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(section_r13.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(section_r13.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("\u062A\u0631\u062A\u064A\u0628: ", section_r13.sortOrder, " | ", ctx_r0.getItemsBySection(section_r13.id).length, " \u0639\u0646\u0635\u0631");
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 64);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_For_18_Template_button_click_0_listener() {
      const icon_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.sectionForm.set(__spreadProps(__spreadValues({}, ctx_r0.sectionForm()), { icon: icon_r16 })));
    });
    \u0275\u0275domElementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const icon_r16 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("selected", ctx_r0.sectionForm().icon === icon_r16);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(icon_r16);
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 51);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.closeSectionForm());
    });
    \u0275\u0275domElementStart(1, "div", 52);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275domElementStart(2, "div", 53)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 54);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.closeSectionForm());
    });
    \u0275\u0275domElementStart(6, "span", 4);
    \u0275\u0275text(7, "close");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(8, "div", 55)(9, "div", 56)(10, "label");
    \u0275\u0275text(11, "\u0627\u0633\u0645 \u0627\u0644\u0642\u0633\u0645");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "input", 57);
    \u0275\u0275domListener("input", function SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_Template_input_input_12_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.sectionForm.set(__spreadProps(__spreadValues({}, ctx_r0.sectionForm()), { name: $event.target.value })));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(13, "div", 56)(14, "label");
    \u0275\u0275text(15, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(16, "div", 58);
    \u0275\u0275repeaterCreate(17, SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_For_18_Template, 3, 3, "button", 59, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(19, "div", 56)(20, "label");
    \u0275\u0275text(21, "\u0627\u0644\u062A\u0631\u062A\u064A\u0628");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "input", 60);
    \u0275\u0275domListener("input", function SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_Template_input_input_22_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.sectionForm.set(__spreadProps(__spreadValues({}, ctx_r0.sectionForm()), { sortOrder: +$event.target.value })));
    });
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(23, "div", 61)(24, "button", 62);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.closeSectionForm());
    });
    \u0275\u0275text(25, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(26, "button", 63);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.saveSection());
    });
    \u0275\u0275domElementStart(27, "span", 4);
    \u0275\u0275text(28, "save");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(29, " \u062D\u0641\u0638 ");
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.editingSection() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0642\u0633\u0645" : "\u0642\u0633\u0645 \u062C\u062F\u064A\u062F");
    \u0275\u0275advance(8);
    \u0275\u0275domProperty("value", ctx_r0.sectionForm().name);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.commonIcons);
    \u0275\u0275advance(5);
    \u0275\u0275domProperty("value", ctx_r0.sectionForm().sortOrder);
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 40)(1, "div", 13)(2, "h3");
    \u0275\u0275text(3, "\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062C\u0627\u0646\u0628\u064A");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "button", 41);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openSectionForm());
    });
    \u0275\u0275domElementStart(5, "span", 4);
    \u0275\u0275text(6, "add");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(7, " \u0642\u0633\u0645 \u062C\u062F\u064A\u062F ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 42);
    \u0275\u0275repeaterCreate(9, SidebarSettingsComponent_Conditional_26_Conditional_1_For_10_Template, 16, 4, "div", 43, _forTrack0);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(11, SidebarSettingsComponent_Conditional_26_Conditional_1_Conditional_11_Template, 30, 3, "div", 44);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r0.sections());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.showSectionForm() ? 11 : -1);
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_2_For_9_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 43)(1, "div", 45)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "div", 46)(5, "h4");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "span", 47);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "div", 48)(10, "button", 49);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_2_For_9_For_7_Template_button_click_10_listener() {
      const item_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.openItemForm(item_r19));
    });
    \u0275\u0275domElementStart(11, "span", 4);
    \u0275\u0275text(12, "edit");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(13, "button", 50);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_2_For_9_For_7_Template_button_click_13_listener() {
      const item_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.deleteItem(item_r19));
    });
    \u0275\u0275domElementStart(14, "span", 4);
    \u0275\u0275text(15, "delete");
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const item_r19 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r19.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r19.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r19.screenKey, " | \u062A\u0631\u062A\u064A\u0628: ", item_r19.sortOrder);
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_2_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 65)(1, "h4", 66)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 42);
    \u0275\u0275repeaterCreate(6, SidebarSettingsComponent_Conditional_26_Conditional_2_For_9_For_7_Template, 16, 4, "div", 43, _forTrack0);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const section_r20 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(section_r20.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", section_r20.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.getItemsBySection(section_r20.id));
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "option", 68);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const sec_r22 = ctx.$implicit;
    \u0275\u0275domProperty("value", sec_r22.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(sec_r22.name);
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 64);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_For_32_Template_button_click_0_listener() {
      const icon_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.itemForm.set(__spreadProps(__spreadValues({}, ctx_r0.itemForm()), { icon: icon_r24 })));
    });
    \u0275\u0275domElementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const icon_r24 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("selected", ctx_r0.itemForm().icon === icon_r24);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(icon_r24);
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 51);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.closeItemForm());
    });
    \u0275\u0275domElementStart(1, "div", 52);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275domElementStart(2, "div", 53)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "button", 54);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.closeItemForm());
    });
    \u0275\u0275domElementStart(6, "span", 4);
    \u0275\u0275text(7, "close");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(8, "div", 55)(9, "div", 56)(10, "label");
    \u0275\u0275text(11, "\u0627\u0644\u0642\u0633\u0645");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "select", 67);
    \u0275\u0275domListener("change", function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template_select_change_12_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.itemForm.set(__spreadProps(__spreadValues({}, ctx_r0.itemForm()), { sectionId: +$event.target.value })));
    });
    \u0275\u0275repeaterCreate(13, SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_For_14_Template, 2, 2, "option", 68, _forTrack0);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(15, "div", 56)(16, "label");
    \u0275\u0275text(17, "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0634\u0627\u0634\u0629 (screen key)");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(18, "input", 69);
    \u0275\u0275domListener("input", function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template_input_input_18_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.itemForm.set(__spreadProps(__spreadValues({}, ctx_r0.itemForm()), { screenKey: $event.target.value })));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(19, "div", 56)(20, "label");
    \u0275\u0275text(21, "\u0627\u0633\u0645 \u0627\u0644\u0634\u0627\u0634\u0629");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "input", 70);
    \u0275\u0275domListener("input", function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template_input_input_22_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.itemForm.set(__spreadProps(__spreadValues({}, ctx_r0.itemForm()), { label: $event.target.value })));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(23, "div", 56)(24, "label");
    \u0275\u0275text(25, "\u0627\u0644\u0645\u0633\u0627\u0631 (route)");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(26, "input", 71);
    \u0275\u0275domListener("input", function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template_input_input_26_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.itemForm.set(__spreadProps(__spreadValues({}, ctx_r0.itemForm()), { route: $event.target.value })));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(27, "div", 56)(28, "label");
    \u0275\u0275text(29, "\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(30, "div", 58);
    \u0275\u0275repeaterCreate(31, SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_For_32_Template, 3, 3, "button", 59, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(33, "div", 56)(34, "label");
    \u0275\u0275text(35, "\u0627\u0644\u062A\u0631\u062A\u064A\u0628");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(36, "input", 60);
    \u0275\u0275domListener("input", function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template_input_input_36_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.itemForm.set(__spreadProps(__spreadValues({}, ctx_r0.itemForm()), { sortOrder: +$event.target.value })));
    });
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(37, "div", 61)(38, "button", 62);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.closeItemForm());
    });
    \u0275\u0275text(39, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(40, "button", 63);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.saveItem());
    });
    \u0275\u0275domElementStart(41, "span", 4);
    \u0275\u0275text(42, "save");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(43, " \u062D\u0641\u0638 ");
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.editingItem() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0634\u0627\u0634\u0629" : "\u0634\u0627\u0634\u0629 \u062C\u062F\u064A\u062F\u0629");
    \u0275\u0275advance(8);
    \u0275\u0275domProperty("value", ctx_r0.itemForm().sectionId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.sections());
    \u0275\u0275advance(5);
    \u0275\u0275domProperty("value", ctx_r0.itemForm().screenKey);
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("value", ctx_r0.itemForm().label);
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("value", ctx_r0.itemForm().route);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.commonIcons);
    \u0275\u0275advance(5);
    \u0275\u0275domProperty("value", ctx_r0.itemForm().sortOrder);
  }
}
function SidebarSettingsComponent_Conditional_26_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 40)(1, "div", 13)(2, "h3");
    \u0275\u0275text(3, "\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062C\u0627\u0646\u0628\u064A");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "button", 41);
    \u0275\u0275domListener("click", function SidebarSettingsComponent_Conditional_26_Conditional_2_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openItemForm());
    });
    \u0275\u0275domElementStart(5, "span", 4);
    \u0275\u0275text(6, "add");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(7, " \u0634\u0627\u0634\u0629 \u062C\u062F\u064A\u062F\u0629 ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275repeaterCreate(8, SidebarSettingsComponent_Conditional_26_Conditional_2_For_9_Template, 8, 2, "div", 65, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(10, SidebarSettingsComponent_Conditional_26_Conditional_2_Conditional_10_Template, 44, 6, "div", 44);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r0.sections());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.showItemForm() ? 10 : -1);
  }
}
function SidebarSettingsComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, SidebarSettingsComponent_Conditional_26_Conditional_0_Template, 12, 2, "div", 11);
    \u0275\u0275conditionalCreate(1, SidebarSettingsComponent_Conditional_26_Conditional_1_Template, 12, 1);
    \u0275\u0275conditionalCreate(2, SidebarSettingsComponent_Conditional_26_Conditional_2_Template, 11, 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.activeTab() === "users" ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.activeTab() === "sections" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.activeTab() === "items" ? 2 : -1);
  }
}
var SidebarSettingsComponent = class _SidebarSettingsComponent extends BasePageComponent {
  api = inject(ApiService);
  auth = inject(AuthService);
  toast = inject(ToastService);
  bizId = 0;
  activeTab = signal("users", ...ngDevMode ? [{ debugName: "activeTab" }] : (
    /* istanbul ignore next */
    []
  ));
  // Users tab
  users = signal([], ...ngDevMode ? [{ debugName: "users" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedUser = signal(null, ...ngDevMode ? [{ debugName: "selectedUser" }] : (
    /* istanbul ignore next */
    []
  ));
  userConfigs = signal([], ...ngDevMode ? [{ debugName: "userConfigs" }] : (
    /* istanbul ignore next */
    []
  ));
  savingUser = signal(false, ...ngDevMode ? [{ debugName: "savingUser" }] : (
    /* istanbul ignore next */
    []
  ));
  // Sections tab
  sections = signal([], ...ngDevMode ? [{ debugName: "sections" }] : (
    /* istanbul ignore next */
    []
  ));
  showSectionForm = signal(false, ...ngDevMode ? [{ debugName: "showSectionForm" }] : (
    /* istanbul ignore next */
    []
  ));
  editingSection = signal(null, ...ngDevMode ? [{ debugName: "editingSection" }] : (
    /* istanbul ignore next */
    []
  ));
  sectionForm = signal({ name: "", icon: "folder", sortOrder: 0 }, ...ngDevMode ? [{ debugName: "sectionForm" }] : (
    /* istanbul ignore next */
    []
  ));
  // Items tab
  allItems = signal([], ...ngDevMode ? [{ debugName: "allItems" }] : (
    /* istanbul ignore next */
    []
  ));
  showItemForm = signal(false, ...ngDevMode ? [{ debugName: "showItemForm" }] : (
    /* istanbul ignore next */
    []
  ));
  editingItem = signal(null, ...ngDevMode ? [{ debugName: "editingItem" }] : (
    /* istanbul ignore next */
    []
  ));
  itemForm = signal({ sectionId: 0, screenKey: "", label: "", icon: "circle", route: "", sortOrder: 0 }, ...ngDevMode ? [{ debugName: "itemForm" }] : (
    /* istanbul ignore next */
    []
  ));
  // Drag state
  draggedIndex = signal(null, ...ngDevMode ? [{ debugName: "draggedIndex" }] : (
    /* istanbul ignore next */
    []
  ));
  dragOverIndex = signal(null, ...ngDevMode ? [{ debugName: "dragOverIndex" }] : (
    /* istanbul ignore next */
    []
  ));
  // Copy & Reset
  showCopyModal = signal(false, ...ngDevMode ? [{ debugName: "showCopyModal" }] : (
    /* istanbul ignore next */
    []
  ));
  copyFromUserId = signal(null, ...ngDevMode ? [{ debugName: "copyFromUserId" }] : (
    /* istanbul ignore next */
    []
  ));
  copyToUserId = signal(null, ...ngDevMode ? [{ debugName: "copyToUserId" }] : (
    /* istanbul ignore next */
    []
  ));
  copying = signal(false, ...ngDevMode ? [{ debugName: "copying" }] : (
    /* istanbul ignore next */
    []
  ));
  resetting = signal(false, ...ngDevMode ? [{ debugName: "resetting" }] : (
    /* istanbul ignore next */
    []
  ));
  // Search & Filter
  searchQuery = signal("", ...ngDevMode ? [{ debugName: "searchQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  filterSection = signal("all", ...ngDevMode ? [{ debugName: "filterSection" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  message = signal("", ...ngDevMode ? [{ debugName: "message" }] : (
    /* istanbul ignore next */
    []
  ));
  messageType = signal("success", ...ngDevMode ? [{ debugName: "messageType" }] : (
    /* istanbul ignore next */
    []
  ));
  onBizIdChange(_bizId) {
    this.loadData();
  }
  async loadData() {
    this.loading.set(true);
    this.message.set("");
    try {
      const [users, sections, items] = await Promise.all([
        this.api.getUsers(),
        this.api.getSidebarSections(this.bizId),
        this.api.getSidebarItems(this.bizId)
      ]);
      this.users.set(users);
      this.sections.set(sections);
      this.allItems.set(items);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A";
      this.message.set(msg);
      this.messageType.set("error");
      this.toast.error(msg, "\u062E\u0637\u0623");
    } finally {
      this.loading.set(false);
    }
  }
  // ==================== Users Tab ====================
  async selectUser(user) {
    this.selectedUser.set(user);
    try {
      const rawConfigs = await this.api.getUserSidebar(this.bizId, user.id);
      const realSections = this.sections();
      const realItems = this.allItems();
      const configByItemId = /* @__PURE__ */ new Map();
      const configByScreenKey = /* @__PURE__ */ new Map();
      for (const c of rawConfigs) {
        if (c.itemId)
          configByItemId.set(c.itemId, c);
        if (c.screenKey)
          configByScreenKey.set(c.screenKey, c);
      }
      const mergedConfigs = [];
      for (const section of realSections) {
        const sectionItems = realItems.filter((item) => item.sectionId === section.id);
        for (const item of sectionItems) {
          const existing = configByItemId.get(item.id) || configByScreenKey.get(item.screenKey);
          if (existing) {
            mergedConfigs.push({
              configId: existing.configId || 0,
              itemId: existing.itemId || item.id,
              label: item.label,
              // نستخدم الاسم الحقيقي من العنصر
              icon: item.icon,
              screenKey: item.screenKey,
              sectionName: section.name,
              // نستخدم اسم القسم الحقيقي
              sectionId: section.id,
              isVisible: existing.isVisible ?? true,
              customSortOrder: existing.customSortOrder ?? item.sortOrder ?? 0
            });
            configByItemId.delete(item.id);
            if (item.screenKey)
              configByScreenKey.delete(item.screenKey);
          } else {
            mergedConfigs.push({
              configId: 0,
              itemId: item.id,
              label: item.label,
              icon: item.icon,
              screenKey: item.screenKey,
              sectionName: section.name,
              sectionId: section.id,
              isVisible: true,
              // افتراضي: ظاهر
              customSortOrder: item.sortOrder || 0
            });
          }
        }
      }
      for (const [, cfg] of configByItemId) {
        const sectionName = cfg.sectionName || "\u0623\u062E\u0631\u0649";
        const sectionId = cfg.sectionId || 0;
        mergedConfigs.push({
          configId: cfg.configId || 0,
          itemId: cfg.itemId,
          label: cfg.label || "\u0639\u0646\u0635\u0631 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",
          icon: cfg.icon || "circle",
          screenKey: cfg.screenKey || "",
          sectionName,
          sectionId,
          isVisible: cfg.isVisible ?? true,
          customSortOrder: cfg.customSortOrder ?? 0
        });
      }
      this.userConfigs.set(mergedConfigs);
    } catch (err) {
      console.error(err);
    }
  }
  toggleItemVisibility(itemId) {
    const configs = this.userConfigs().map((c) => c.itemId === itemId ? __spreadProps(__spreadValues({}, c), { isVisible: !c.isVisible }) : c);
    this.userConfigs.set(configs);
  }
  toggleAllInSection(sectionId, visible) {
    const configs = this.userConfigs().map((c) => c.sectionId === sectionId ? __spreadProps(__spreadValues({}, c), { isVisible: visible }) : c);
    this.userConfigs.set(configs);
  }
  getSectionNames() {
    const names = [];
    for (const c of this.userConfigs()) {
      if (!names.includes(c.sectionName))
        names.push(c.sectionName);
    }
    return names;
  }
  getItemsForSection(sectionName) {
    return this.userConfigs().filter((c) => c.sectionName === sectionName).sort((a, b) => a.customSortOrder - b.customSortOrder);
  }
  getSectionId(sectionName) {
    const item = this.userConfigs().find((c) => c.sectionName === sectionName);
    return item?.sectionId || 0;
  }
  isSectionAllVisible(sectionName) {
    return this.getItemsForSection(sectionName).every((c) => c.isVisible);
  }
  isSectionNoneVisible(sectionName) {
    return this.getItemsForSection(sectionName).every((c) => !c.isVisible);
  }
  // Drag & Drop for reordering items within a section
  onDragStart(event, index, sectionName) {
    this.draggedIndex.set(index);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", `${sectionName}:${index}`);
    }
  }
  onDragOver(event, index) {
    event.preventDefault();
    this.dragOverIndex.set(index);
  }
  onDragLeave() {
    this.dragOverIndex.set(null);
  }
  onDrop(event, dropIndex, sectionName) {
    event.preventDefault();
    const data = event.dataTransfer?.getData("text/plain");
    if (!data)
      return;
    const [sourceSec, sourceIdxStr] = data.split(":");
    if (sourceSec !== sectionName)
      return;
    const sourceIdx = Number.parseInt(sourceIdxStr, 10);
    const sectionItems = this.getItemsForSection(sectionName);
    const item = sectionItems[sourceIdx];
    if (!item)
      return;
    const newItems = [...sectionItems];
    newItems.splice(sourceIdx, 1);
    newItems.splice(dropIndex, 0, item);
    const updatedConfigs = this.userConfigs().map((c) => {
      if (c.sectionName === sectionName) {
        const newIdx = newItems.findIndex((ni) => ni.itemId === c.itemId);
        return __spreadProps(__spreadValues({}, c), { customSortOrder: newIdx });
      }
      return c;
    });
    this.userConfigs.set(updatedConfigs);
    this.draggedIndex.set(null);
    this.dragOverIndex.set(null);
  }
  onDragEnd() {
    this.draggedIndex.set(null);
    this.dragOverIndex.set(null);
  }
  async saveUserConfig() {
    const user = this.selectedUser();
    if (!user)
      return;
    this.savingUser.set(true);
    try {
      const items = this.userConfigs().filter((c) => c.configId > 0).map((c) => ({
        id: c.configId,
        sidebarItemId: c.itemId,
        isVisible: c.isVisible,
        customSortOrder: c.customSortOrder
      }));
      await this.api.updateUserSidebar(this.bizId, user.id, { items });
      this.showMessage("\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0628\u0646\u062C\u0627\u062D", "success");
    } catch (err) {
      this.showMessage("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0641\u0638", "error");
    } finally {
      this.savingUser.set(false);
    }
  }
  // ==================== Sections Tab ====================
  openSectionForm(section) {
    if (section) {
      this.editingSection.set(section);
      this.sectionForm.set({ name: section.name, icon: section.icon, sortOrder: section.sortOrder });
    } else {
      this.editingSection.set(null);
      const maxOrder = Math.max(0, ...this.sections().map((s) => s.sortOrder));
      this.sectionForm.set({ name: "", icon: "folder", sortOrder: maxOrder + 1 });
    }
    this.showSectionForm.set(true);
  }
  closeSectionForm() {
    this.showSectionForm.set(false);
    this.editingSection.set(null);
  }
  async saveSection() {
    const form = this.sectionForm();
    if (!form.name.trim())
      return;
    try {
      const editing = this.editingSection();
      if (editing) {
        await this.api.updateSidebarSection(editing.id, form);
        this.showMessage("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0633\u0645 \u0628\u0646\u062C\u0627\u062D", "success");
      } else {
        await this.api.createSidebarSection(this.bizId, form);
        this.showMessage("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0642\u0633\u0645 \u0628\u0646\u062C\u0627\u062D", "success");
      }
      this.closeSectionForm();
      await this.loadData();
    } catch (err) {
      this.showMessage("\u062D\u062F\u062B \u062E\u0637\u0623", "error");
    }
  }
  async deleteSection(section) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u0642\u0633\u0645 "${section.name}"\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0628\u062F\u0627\u062E\u0644\u0647.`, type: "danger" });
    if (!confirmed)
      return;
    try {
      await this.api.deleteSidebarSection(section.id);
      this.showMessage("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0642\u0633\u0645", "success");
      await this.loadData();
    } catch (err) {
      this.showMessage("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641", "error");
    }
  }
  // ==================== Items Tab ====================
  openItemForm(item) {
    if (item) {
      this.editingItem.set(item);
      this.itemForm.set({
        sectionId: item.sectionId,
        screenKey: item.screenKey,
        label: item.label,
        icon: item.icon,
        route: item.route,
        sortOrder: item.sortOrder
      });
    } else {
      this.editingItem.set(null);
      this.itemForm.set({
        sectionId: this.sections().length > 0 ? this.sections()[0].id : 0,
        screenKey: "",
        label: "",
        icon: "circle",
        route: "",
        sortOrder: 0
      });
    }
    this.showItemForm.set(true);
  }
  closeItemForm() {
    this.showItemForm.set(false);
    this.editingItem.set(null);
  }
  async saveItem() {
    const form = this.itemForm();
    if (!form.label.trim() || !form.screenKey.trim())
      return;
    try {
      const editing = this.editingItem();
      if (editing) {
        await this.api.updateSidebarItem(editing.id, form);
        this.showMessage("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0639\u0646\u0635\u0631 \u0628\u0646\u062C\u0627\u062D", "success");
      } else {
        await this.api.createSidebarItem(form);
        this.showMessage("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0639\u0646\u0635\u0631 \u0628\u0646\u062C\u0627\u062D", "success");
      }
      this.closeItemForm();
      await this.loadData();
    } catch (err) {
      this.showMessage("\u062D\u062F\u062B \u062E\u0637\u0623", "error");
    }
  }
  async deleteItem(item) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0635\u0631 "${item.label}"\u061F`, type: "danger" });
    if (!confirmed)
      return;
    try {
      await this.api.deleteSidebarItem(item.id);
      this.showMessage("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0635\u0631", "success");
      await this.loadData();
    } catch (err) {
      this.showMessage("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641", "error");
    }
  }
  getItemsBySection(sectionId) {
    return this.allItems().filter((i) => i.sectionId === sectionId);
  }
  getSectionNameById(id) {
    return this.sections().find((s) => s.id === id)?.name || "";
  }
  getRoleLabel(role) {
    switch (role) {
      case "admin":
        return "\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645";
      case "accountant":
        return "\u0645\u062D\u0627\u0633\u0628";
      case "manager":
        return "\u0645\u062F\u064A\u0631 \u0645\u062D\u0637\u0629";
      case "viewer":
        return "\u0645\u0634\u0627\u0647\u062F";
      default:
        return "\u0645\u0633\u062A\u062E\u062F\u0645";
    }
  }
  getRoleIcon(role) {
    switch (role) {
      case "admin":
        return "admin_panel_settings";
      case "accountant":
        return "calculate";
      case "manager":
        return "manage_accounts";
      case "viewer":
        return "visibility";
      default:
        return "person";
    }
  }
  // Common icons list for selection
  commonIcons = [
    "dashboard",
    "bolt",
    "receipt_long",
    "receipt",
    "account_balance_wallet",
    "category",
    "savings",
    "menu_book",
    "currency_exchange",
    "groups",
    "handshake",
    "warehouse",
    "local_shipping",
    "balance",
    "assessment",
    "warning",
    "tune",
    "settings",
    "home",
    "folder",
    "circle",
    "payments",
    "people",
    "summarize",
    "arrow_forward"
  ];
  // ==================== Copy Config ====================
  openCopyModal() {
    this.copyFromUserId.set(null);
    this.copyToUserId.set(null);
    this.showCopyModal.set(true);
  }
  async copyConfig() {
    const from = this.copyFromUserId();
    const to = this.copyToUserId();
    if (!from || !to)
      return;
    if (from === to) {
      this.showMessage("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u0646\u0633\u062E \u0644\u0646\u0641\u0633 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645", "error");
      return;
    }
    const confirmed = await this.toast.confirm({
      title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0646\u0633\u062E",
      message: "\u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641 \u0628\u0627\u0644\u0643\u0627\u0645\u0644. \u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F",
      type: "warning"
    });
    if (!confirmed)
      return;
    this.copying.set(true);
    try {
      const result = await this.api.copySidebarConfig(this.bizId, from, to);
      this.showMessage(`\u062A\u0645 \u0646\u0633\u062E ${result.copiedCount} \u0625\u0639\u062F\u0627\u062F \u0628\u0646\u062C\u0627\u062D`, "success");
      this.showCopyModal.set(false);
      const sel = this.selectedUser();
      if (sel && sel.id === to)
        await this.selectUser(sel);
    } catch (e) {
      this.showMessage(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u0646\u0633\u062E \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A", "error");
    } finally {
      this.copying.set(false);
    }
  }
  // ==================== Reset Config ====================
  async resetConfig(userId) {
    const user = this.users().find((u) => u.id === userId);
    const confirmed = await this.toast.confirm({
      title: "\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646",
      message: `\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0644\u0640 "${user?.fullName || user?.username}"\u061F \u0633\u064A\u062A\u0645 \u0625\u0638\u0647\u0627\u0631 \u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0628\u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A.`,
      type: "warning"
    });
    if (!confirmed)
      return;
    this.resetting.set(true);
    try {
      const result = await this.api.resetSidebarConfig(this.bizId, userId);
      this.showMessage(`\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 \u0628\u0646\u062C\u0627\u062D (${result.itemCount} \u0639\u0646\u0635\u0631)`, "success");
      const sel = this.selectedUser();
      if (sel && sel.id === userId)
        await this.selectUser(sel);
    } catch (e) {
      this.showMessage(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646", "error");
    } finally {
      this.resetting.set(false);
    }
  }
  // ==================== Search & Filter ====================
  getFilteredItemsForSection(sectionName) {
    let items = this.getItemsForSection(sectionName);
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      items = items.filter((c) => c.label.toLowerCase().includes(q) || c.screenKey.toLowerCase().includes(q));
    }
    return items;
  }
  getFilteredSectionNames() {
    const filter = this.filterSection();
    let names = this.getSectionNames();
    if (filter !== "all") {
      names = names.filter((n) => n === filter);
    }
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      names = names.filter((n) => this.getFilteredItemsForSection(n).length > 0);
    }
    return names;
  }
  getVisibleCount() {
    return this.userConfigs().filter((c) => c.isVisible).length;
  }
  getHiddenCount() {
    return this.userConfigs().filter((c) => !c.isVisible).length;
  }
  showMessage(text, type) {
    this.message.set(text);
    this.messageType.set(type);
    setTimeout(() => this.message.set(""), 3e3);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SidebarSettingsComponent_BaseFactory;
    return function SidebarSettingsComponent_Factory(__ngFactoryType__) {
      return (\u0275SidebarSettingsComponent_BaseFactory || (\u0275SidebarSettingsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_SidebarSettingsComponent)))(__ngFactoryType__ || _SidebarSettingsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarSettingsComponent, selectors: [["app-sidebar-settings"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 27, vars: 8, consts: [[1, "page-container"], [1, "page-header"], [1, "header-right"], [1, "header-icon"], [1, "material-icons-round"], [1, "toast", 3, "success", "error"], [1, "tabs-bar"], [1, "tab-btn", 3, "click"], [1, "loading-state"], [1, "toast"], [1, "material-icons-round", "spin"], [1, "users-layout"], [1, "users-list-panel"], [1, "panel-header"], [1, "count-badge"], [1, "user-card", 3, "selected"], [1, "user-config-panel"], [1, "empty-state"], [1, "user-card", 3, "click"], [1, "user-card-icon"], [1, "user-card-info"], [1, "user-card-name"], [1, "user-card-role"], [1, "material-icons-round", "check-icon"], [1, "save-btn", 3, "click", "disabled"], [1, "config-hint"], [1, "config-section"], [1, "config-section-header"], [1, "section-actions"], ["title", "\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0643\u0644", 1, "mini-btn"], ["title", "\u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0643\u0644", 1, "mini-btn"], [1, "config-items-list"], ["draggable", "true", 1, "config-item", 3, "visible", "hidden-item", "drag-over"], ["title", "\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0643\u0644", 1, "mini-btn", 3, "click"], ["title", "\u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0643\u0644", 1, "mini-btn", 3, "click"], ["draggable", "true", 1, "config-item", 3, "dragstart", "dragover", "dragleave", "drop", "dragend"], [1, "drag-handle", "material-icons-round"], [1, "config-item-icon"], [1, "config-item-label"], [1, "toggle-btn", 3, "click", "title"], [1, "management-panel"], [1, "add-btn", 3, "click"], [1, "items-grid"], [1, "management-card"], [1, "modal-overlay"], [1, "card-icon"], [1, "card-info"], [1, "card-meta"], [1, "card-actions"], ["title", "\u062A\u0639\u062F\u064A\u0644", 1, "icon-btn", 3, "click"], ["title", "\u062D\u0630\u0641", 1, "icon-btn", "danger", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-group"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629", 3, "input", "value"], [1, "icon-picker"], [1, "icon-option", 3, "selected"], ["type", "number", 3, "input", "value"], [1, "modal-footer"], [1, "btn-cancel", 3, "click"], [1, "btn-save", 3, "click"], [1, "icon-option", 3, "click"], [1, "items-section-group"], [1, "section-group-title"], [3, "change", "value"], [3, "value"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: accounts", 3, "input", "value"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A", 3, "input", "value"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: /biz/{bizId}/accounts", "dir", "ltr", 3, "input", "value"]], template: function SidebarSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "tune");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "div")(7, "h1");
      \u0275\u0275text(8, "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062C\u0627\u0646\u0628\u064A");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "p");
      \u0275\u0275text(10, "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0648\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0643\u0644 \u0645\u0633\u062A\u062E\u062F\u0645");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275conditionalCreate(11, SidebarSettingsComponent_Conditional_11_Template, 4, 6, "div", 5);
      \u0275\u0275domElementStart(12, "div", 6)(13, "button", 7);
      \u0275\u0275domListener("click", function SidebarSettingsComponent_Template_button_click_13_listener() {
        return ctx.activeTab.set("users");
      });
      \u0275\u0275domElementStart(14, "span", 4);
      \u0275\u0275text(15, "people");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(16, " \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(17, "button", 7);
      \u0275\u0275domListener("click", function SidebarSettingsComponent_Template_button_click_17_listener() {
        return ctx.activeTab.set("sections");
      });
      \u0275\u0275domElementStart(18, "span", 4);
      \u0275\u0275text(19, "folder");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(20, " \u0627\u0644\u0623\u0642\u0633\u0627\u0645 ");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "button", 7);
      \u0275\u0275domListener("click", function SidebarSettingsComponent_Template_button_click_21_listener() {
        return ctx.activeTab.set("items");
      });
      \u0275\u0275domElementStart(22, "span", 4);
      \u0275\u0275text(23, "list");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(24, " \u0627\u0644\u0634\u0627\u0634\u0627\u062A ");
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(25, SidebarSettingsComponent_Conditional_25_Template, 5, 0, "div", 8)(26, SidebarSettingsComponent_Conditional_26_Template, 3, 3);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275conditional(ctx.message() ? 11 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab() === "users");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("active", ctx.activeTab() === "sections");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("active", ctx.activeTab() === "items");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.loading() ? 25 : 26);
    }
  }, styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.page-container[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.header-icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);\n}\n.header-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: white;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0;\n}\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin: 4px 0 0;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 24px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 200;\n  padding: 12px 24px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 700;\n  font-size: 14px;\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease;\n}\n.toast.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n  border: 1px solid rgba(34, 197, 94, 0.3);\n}\n.toast.error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n  border: 1px solid rgba(239, 68, 68, 0.3);\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateX(-50%) translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(-50%) translateY(0);\n  }\n}\n.tabs-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  margin-bottom: 24px;\n  background: var(--bg-surface);\n  border-radius: 14px;\n  padding: 4px;\n  border: 1px solid var(--border-color);\n}\n.tab-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px 16px;\n  border: none;\n  border-radius: 10px;\n  background: transparent;\n  color: var(--text-secondary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.tab-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-primary);\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(139, 92, 246, 0.2),\n      rgba(99, 102, 241, 0.15));\n  color: #a78bfa;\n  border: 1px solid rgba(139, 92, 246, 0.3);\n}\n.users-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 20px;\n  min-height: 500px;\n}\n.users-list-panel[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  overflow: hidden;\n}\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--border-color);\n}\n.panel-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.panel-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #a78bfa;\n}\n.count-badge[_ngcontent-%COMP%] {\n  background: rgba(139, 92, 246, 0.15);\n  color: #a78bfa;\n  font-size: 12px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 8px;\n}\n.user-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 20px;\n  cursor: pointer;\n  transition: all 0.2s;\n  border-bottom: 1px solid var(--border-color);\n}\n.user-card[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.user-card[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.04);\n}\n.user-card.selected[_ngcontent-%COMP%] {\n  background: rgba(139, 92, 246, 0.1);\n  border-right: 3px solid #8b5cf6;\n}\n.user-card-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  min-width: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.user-card-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.user-card-icon.role-admin[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n}\n.user-card-icon.role-admin[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.user-card-icon.role-accountant[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.15);\n}\n.user-card-icon.role-accountant[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.user-card-icon.role-manager[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n}\n.user-card-icon.role-manager[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.user-card-icon.role-viewer[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.15);\n}\n.user-card-icon.role-viewer[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n.user-card-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.user-card-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.user-card-role[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.check-icon[_ngcontent-%COMP%] {\n  color: #8b5cf6;\n  font-size: 20px;\n  margin-right: auto;\n  margin-left: 0;\n}\n.user-config-panel[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  overflow: hidden;\n}\n.save-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 18px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  color: white;\n  font-weight: 700;\n  font-size: 13px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.save-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.save-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);\n}\n.save-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.config-hint[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 20px;\n  margin: 12px 16px;\n  background: rgba(59, 130, 246, 0.08);\n  border-radius: 10px;\n  color: #60a5fa;\n  font-size: 13px;\n  font-weight: 600;\n  border: 1px solid rgba(59, 130, 246, 0.15);\n}\n.config-hint[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.config-section[_ngcontent-%COMP%] {\n  margin: 0 16px 16px;\n}\n.config-section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 12px;\n  margin-bottom: 6px;\n}\n.config-section-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.section-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.mini-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 6px;\n  border: none;\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.mini-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.mini-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: var(--text-primary);\n}\n.config-items-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.config-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px;\n  border-radius: 10px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  transition: all 0.2s;\n  cursor: grab;\n}\n.config-item[_ngcontent-%COMP%]:active {\n  cursor: grabbing;\n}\n.config-item.drag-over[_ngcontent-%COMP%] {\n  border-color: #8b5cf6;\n  background: rgba(139, 92, 246, 0.08);\n}\n.config-item.hidden-item[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.config-item.hidden-item[_ngcontent-%COMP%]   .config-item-icon[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.1);\n}\n.drag-handle[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--text-muted);\n  cursor: grab;\n}\n.drag-handle[_ngcontent-%COMP%]:active {\n  cursor: grabbing;\n}\n.config-item-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  min-width: 32px;\n  border-radius: 8px;\n  background: rgba(139, 92, 246, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.config-item-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #a78bfa;\n}\n.config-item-label[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: none;\n  background: rgba(148, 163, 184, 0.1);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.toggle-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.toggle-btn.on[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.toggle-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n.management-panel[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  overflow: hidden;\n}\n.items-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 12px;\n  padding: 16px 20px;\n}\n.management-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  border-radius: 12px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  transition: all 0.2s;\n}\n.management-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--border-strong);\n}\n.card-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  min-width: 40px;\n  border-radius: 10px;\n  background: rgba(139, 92, 246, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #a78bfa;\n}\n.card-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.card-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.card-meta[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  font-weight: 600;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: none;\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.icon-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n}\n.icon-btn.danger[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.items-section-group[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.section-group-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 20px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  border-bottom: 1px solid var(--border-color);\n}\n.section-group-title[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #a78bfa;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 560px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 24px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 24px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #8b5cf6;\n  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.12);\n}\n.icon-picker[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.icon-option[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-option[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.icon-option[_ngcontent-%COMP%]:hover {\n  border-color: #8b5cf6;\n  color: #a78bfa;\n}\n.icon-option.selected[_ngcontent-%COMP%] {\n  background: rgba(139, 92, 246, 0.15);\n  border-color: #8b5cf6;\n  color: #a78bfa;\n}\n.btn-save[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-save[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .users-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .page-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=sidebar-settings.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarSettingsComponent, [{
    type: Component,
    args: [{ selector: "app-sidebar-settings", standalone: true, template: `<div class="page-container">\r
  <!-- Header -->\r
  <div class="page-header">\r
    <div class="header-right">\r
      <div class="header-icon">\r
        <span class="material-icons-round">tune</span>\r
      </div>\r
      <div>\r
        <h1>\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062C\u0627\u0646\u0628\u064A</h1>\r
        <p>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0648\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0643\u0644 \u0645\u0633\u062A\u062E\u062F\u0645</p>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Toast Message -->\r
  @if (message()) {\r
    <div class="toast" [class.success]="messageType() === 'success'" [class.error]="messageType() === 'error'">\r
      <span class="material-icons-round">{{ messageType() === 'success' ? 'check_circle' : 'error' }}</span>\r
      {{ message() }}\r
    </div>\r
  }\r
\r
  <!-- Tabs -->\r
  <div class="tabs-bar">\r
    <button class="tab-btn" [class.active]="activeTab() === 'users'" (click)="activeTab.set('users')">\r
      <span class="material-icons-round">people</span>\r
      \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646\r
    </button>\r
    <button class="tab-btn" [class.active]="activeTab() === 'sections'" (click)="activeTab.set('sections')">\r
      <span class="material-icons-round">folder</span>\r
      \u0627\u0644\u0623\u0642\u0633\u0627\u0645\r
    </button>\r
    <button class="tab-btn" [class.active]="activeTab() === 'items'" (click)="activeTab.set('items')">\r
      <span class="material-icons-round">list</span>\r
      \u0627\u0644\u0634\u0627\u0634\u0627\u062A\r
    </button>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state">\r
      <span class="material-icons-round spin">sync</span>\r
      <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>\r
    </div>\r
  } @else {\r
\r
    <!-- ==================== Users Tab ==================== -->\r
    @if (activeTab() === 'users') {\r
      <div class="users-layout">\r
        <!-- Users List -->\r
        <div class="users-list-panel">\r
          <div class="panel-header">\r
            <h3>\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646</h3>\r
            <span class="count-badge">{{ users().length }}</span>\r
          </div>\r
          @for (user of users(); track user.id) {\r
            <div class="user-card" [class.selected]="selectedUser()?.id === user.id" (click)="selectUser(user)">\r
              <div class="user-card-icon" [class]="'role-' + user.role">\r
                <span class="material-icons-round">{{ getRoleIcon(user.role) }}</span>\r
              </div>\r
              <div class="user-card-info">\r
                <span class="user-card-name">{{ user.fullName }}</span>\r
                <span class="user-card-role">{{ getRoleLabel(user.role) }}</span>\r
              </div>\r
              @if (selectedUser()?.id === user.id) {\r
                <span class="material-icons-round check-icon">check_circle</span>\r
              }\r
            </div>\r
          }\r
        </div>\r
\r
        <!-- User Config Panel -->\r
        <div class="user-config-panel">\r
          @if (!selectedUser()) {\r
            <div class="empty-state">\r
              <span class="material-icons-round">touch_app</span>\r
              <p>\u0627\u062E\u062A\u0631 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u0644\u062A\u0639\u062F\u064A\u0644 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062C\u0627\u0646\u0628\u064A</p>\r
            </div>\r
          } @else {\r
            <div class="panel-header">\r
              <h3>\r
                <span class="material-icons-round">{{ getRoleIcon(selectedUser()!.role) }}</span>\r
                \u062A\u0628\u0648\u064A\u0628 {{ selectedUser()!.fullName }}\r
              </h3>\r
              <button class="save-btn" (click)="saveUserConfig()" [disabled]="savingUser()">\r
                <span class="material-icons-round">{{ savingUser() ? 'sync' : 'save' }}</span>\r
                {{ savingUser() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : '\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A' }}\r
              </button>\r
            </div>\r
\r
            <div class="config-hint">\r
              <span class="material-icons-round">info</span>\r
              \u0641\u0639\u0651\u0644 \u0623\u0648 \u0639\u0637\u0651\u0644 \u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645. \u0627\u0633\u062D\u0628 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0631\u062A\u064A\u0628\u0647\u0627.\r
            </div>\r
\r
            @for (sectionName of getSectionNames(); track sectionName) {\r
              <div class="config-section">\r
                <div class="config-section-header">\r
                  <h4>{{ sectionName }}</h4>\r
                  <div class="section-actions">\r
                    @if (!isSectionAllVisible(sectionName)) {\r
                      <button class="mini-btn" (click)="toggleAllInSection(getSectionId(sectionName), true)" title="\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0643\u0644">\r
                        <span class="material-icons-round">visibility</span>\r
                      </button>\r
                    }\r
                    @if (!isSectionNoneVisible(sectionName)) {\r
                      <button class="mini-btn" (click)="toggleAllInSection(getSectionId(sectionName), false)" title="\u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0643\u0644">\r
                        <span class="material-icons-round">visibility_off</span>\r
                      </button>\r
                    }\r
                  </div>\r
                </div>\r
\r
                <div class="config-items-list">\r
                  @for (item of getItemsForSection(sectionName); track item.itemId; let i = $index) {\r
                    <div\r
                      class="config-item"\r
                      [class.visible]="item.isVisible"\r
                      [class.hidden-item]="!item.isVisible"\r
                      [class.drag-over]="dragOverIndex() === i"\r
                      draggable="true"\r
                      (dragstart)="onDragStart($event, i, sectionName)"\r
                      (dragover)="onDragOver($event, i)"\r
                      (dragleave)="onDragLeave()"\r
                      (drop)="onDrop($event, i, sectionName)"\r
                      (dragend)="onDragEnd()"\r
                    >\r
                      <span class="drag-handle material-icons-round">drag_indicator</span>\r
                      <div class="config-item-icon">\r
                        <span class="material-icons-round">{{ item.icon }}</span>\r
                      </div>\r
                      <span class="config-item-label">{{ item.label }}</span>\r
                      <button\r
                        class="toggle-btn"\r
                        [class.on]="item.isVisible"\r
                        (click)="toggleItemVisibility(item.itemId)"\r
                        [title]="item.isVisible ? '\u0625\u062E\u0641\u0627\u0621' : '\u0625\u0638\u0647\u0627\u0631'"\r
                      >\r
                        <span class="material-icons-round">{{ item.isVisible ? 'visibility' : 'visibility_off' }}</span>\r
                      </button>\r
                    </div>\r
                  }\r
                </div>\r
              </div>\r
            }\r
          }\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- ==================== Sections Tab ==================== -->\r
    @if (activeTab() === 'sections') {\r
      <div class="management-panel">\r
        <div class="panel-header">\r
          <h3>\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062C\u0627\u0646\u0628\u064A</h3>\r
          <button class="add-btn" (click)="openSectionForm()">\r
            <span class="material-icons-round">add</span>\r
            \u0642\u0633\u0645 \u062C\u062F\u064A\u062F\r
          </button>\r
        </div>\r
\r
        <div class="items-grid">\r
          @for (section of sections(); track section.id) {\r
            <div class="management-card">\r
              <div class="card-icon">\r
                <span class="material-icons-round">{{ section.icon }}</span>\r
              </div>\r
              <div class="card-info">\r
                <h4>{{ section.name }}</h4>\r
                <span class="card-meta">\u062A\u0631\u062A\u064A\u0628: {{ section.sortOrder }} | {{ getItemsBySection(section.id).length }} \u0639\u0646\u0635\u0631</span>\r
              </div>\r
              <div class="card-actions">\r
                <button class="icon-btn" (click)="openSectionForm(section)" title="\u062A\u0639\u062F\u064A\u0644">\r
                  <span class="material-icons-round">edit</span>\r
                </button>\r
                <button class="icon-btn danger" (click)="deleteSection(section)" title="\u062D\u0630\u0641">\r
                  <span class="material-icons-round">delete</span>\r
                </button>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
\r
      <!-- Section Form Modal -->\r
      @if (showSectionForm()) {\r
        <div class="modal-overlay" (click)="closeSectionForm()">\r
          <div class="modal" (click)="$event.stopPropagation()">\r
            <div class="modal-header">\r
              <h3>{{ editingSection() ? '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0642\u0633\u0645' : '\u0642\u0633\u0645 \u062C\u062F\u064A\u062F' }}</h3>\r
              <button class="close-btn" (click)="closeSectionForm()">\r
                <span class="material-icons-round">close</span>\r
              </button>\r
            </div>\r
            <div class="modal-body">\r
              <div class="form-group">\r
                <label>\u0627\u0633\u0645 \u0627\u0644\u0642\u0633\u0645</label>\r
                <input type="text" [value]="sectionForm().name" (input)="sectionForm.set({...sectionForm(), name: $any($event.target).value})" placeholder="\u0645\u062B\u0627\u0644: \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629" />\r
              </div>\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
                <div class="icon-picker">\r
                  @for (icon of commonIcons; track icon) {\r
                    <button\r
                      class="icon-option"\r
                      [class.selected]="sectionForm().icon === icon"\r
                      (click)="sectionForm.set({...sectionForm(), icon: icon})"\r
                    >\r
                      <span class="material-icons-round">{{ icon }}</span>\r
                    </button>\r
                  }\r
                </div>\r
              </div>\r
              <div class="form-group">\r
                <label>\u0627\u0644\u062A\u0631\u062A\u064A\u0628</label>\r
                <input type="number" [value]="sectionForm().sortOrder" (input)="sectionForm.set({...sectionForm(), sortOrder: +$any($event.target).value})" />\r
              </div>\r
            </div>\r
            <div class="modal-footer">\r
              <button class="btn-cancel" (click)="closeSectionForm()">\u0625\u0644\u063A\u0627\u0621</button>\r
              <button class="btn-save" (click)="saveSection()">\r
                <span class="material-icons-round">save</span>\r
                \u062D\u0641\u0638\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
    }\r
\r
    <!-- ==================== Items Tab ==================== -->\r
    @if (activeTab() === 'items') {\r
      <div class="management-panel">\r
        <div class="panel-header">\r
          <h3>\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062C\u0627\u0646\u0628\u064A</h3>\r
          <button class="add-btn" (click)="openItemForm()">\r
            <span class="material-icons-round">add</span>\r
            \u0634\u0627\u0634\u0629 \u062C\u062F\u064A\u062F\u0629\r
          </button>\r
        </div>\r
\r
        @for (section of sections(); track section.id) {\r
          <div class="items-section-group">\r
            <h4 class="section-group-title">\r
              <span class="material-icons-round">{{ section.icon }}</span>\r
              {{ section.name }}\r
            </h4>\r
            <div class="items-grid">\r
              @for (item of getItemsBySection(section.id); track item.id) {\r
                <div class="management-card">\r
                  <div class="card-icon">\r
                    <span class="material-icons-round">{{ item.icon }}</span>\r
                  </div>\r
                  <div class="card-info">\r
                    <h4>{{ item.label }}</h4>\r
                    <span class="card-meta">{{ item.screenKey }} | \u062A\u0631\u062A\u064A\u0628: {{ item.sortOrder }}</span>\r
                  </div>\r
                  <div class="card-actions">\r
                    <button class="icon-btn" (click)="openItemForm(item)" title="\u062A\u0639\u062F\u064A\u0644">\r
                      <span class="material-icons-round">edit</span>\r
                    </button>\r
                    <button class="icon-btn danger" (click)="deleteItem(item)" title="\u062D\u0630\u0641">\r
                      <span class="material-icons-round">delete</span>\r
                    </button>\r
                  </div>\r
                </div>\r
              }\r
            </div>\r
          </div>\r
        }\r
      </div>\r
\r
      <!-- Item Form Modal -->\r
      @if (showItemForm()) {\r
        <div class="modal-overlay" (click)="closeItemForm()">\r
          <div class="modal" (click)="$event.stopPropagation()">\r
            <div class="modal-header">\r
              <h3>{{ editingItem() ? '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0634\u0627\u0634\u0629' : '\u0634\u0627\u0634\u0629 \u062C\u062F\u064A\u062F\u0629' }}</h3>\r
              <button class="close-btn" (click)="closeItemForm()">\r
                <span class="material-icons-round">close</span>\r
              </button>\r
            </div>\r
            <div class="modal-body">\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0642\u0633\u0645</label>\r
                <select [value]="itemForm().sectionId" (change)="itemForm.set({...itemForm(), sectionId: +$any($event.target).value})">\r
                  @for (sec of sections(); track sec.id) {\r
                    <option [value]="sec.id">{{ sec.name }}</option>\r
                  }\r
                </select>\r
              </div>\r
              <div class="form-group">\r
                <label>\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0634\u0627\u0634\u0629 (screen key)</label>\r
                <input type="text" [value]="itemForm().screenKey" (input)="itemForm.set({...itemForm(), screenKey: $any($event.target).value})" placeholder="\u0645\u062B\u0627\u0644: accounts" />\r
              </div>\r
              <div class="form-group">\r
                <label>\u0627\u0633\u0645 \u0627\u0644\u0634\u0627\u0634\u0629</label>\r
                <input type="text" [value]="itemForm().label" (input)="itemForm.set({...itemForm(), label: $any($event.target).value})" placeholder="\u0645\u062B\u0627\u0644: \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A" />\r
              </div>\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0645\u0633\u0627\u0631 (route)</label>\r
                <input type="text" [value]="itemForm().route" (input)="itemForm.set({...itemForm(), route: $any($event.target).value})" placeholder="\u0645\u062B\u0627\u0644: /biz/{bizId}/accounts" dir="ltr" />\r
              </div>\r
              <div class="form-group">\r
                <label>\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629</label>\r
                <div class="icon-picker">\r
                  @for (icon of commonIcons; track icon) {\r
                    <button\r
                      class="icon-option"\r
                      [class.selected]="itemForm().icon === icon"\r
                      (click)="itemForm.set({...itemForm(), icon: icon})"\r
                    >\r
                      <span class="material-icons-round">{{ icon }}</span>\r
                    </button>\r
                  }\r
                </div>\r
              </div>\r
              <div class="form-group">\r
                <label>\u0627\u0644\u062A\u0631\u062A\u064A\u0628</label>\r
                <input type="number" [value]="itemForm().sortOrder" (input)="itemForm.set({...itemForm(), sortOrder: +$any($event.target).value})" />\r
              </div>\r
            </div>\r
            <div class="modal-footer">\r
              <button class="btn-cancel" (click)="closeItemForm()">\u0625\u0644\u063A\u0627\u0621</button>\r
              <button class="btn-save" (click)="saveItem()">\r
                <span class="material-icons-round">save</span>\r
                \u062D\u0641\u0638\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      }\r
    }\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/sidebar-settings/sidebar-settings.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.page-container {\n  padding: 24px 32px;\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.header-icon {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);\n}\n.header-icon .material-icons-round {\n  font-size: 26px;\n  color: white;\n}\n.page-header h1 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0;\n}\n.page-header p {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin: 4px 0 0;\n}\n.toast {\n  position: fixed;\n  top: 24px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 200;\n  padding: 12px 24px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 700;\n  font-size: 14px;\n  animation: slideDown 0.3s ease;\n}\n.toast.success {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n  border: 1px solid rgba(34, 197, 94, 0.3);\n}\n.toast.error {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n  border: 1px solid rgba(239, 68, 68, 0.3);\n}\n@keyframes slideDown {\n  from {\n    opacity: 0;\n    transform: translateX(-50%) translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(-50%) translateY(0);\n  }\n}\n.tabs-bar {\n  display: flex;\n  gap: 4px;\n  margin-bottom: 24px;\n  background: var(--bg-surface);\n  border-radius: 14px;\n  padding: 4px;\n  border: 1px solid var(--border-color);\n}\n.tab-btn {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px 16px;\n  border: none;\n  border-radius: 10px;\n  background: transparent;\n  color: var(--text-secondary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab-btn .material-icons-round {\n  font-size: 20px;\n}\n.tab-btn:hover {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-primary);\n}\n.tab-btn.active {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(139, 92, 246, 0.2),\n      rgba(99, 102, 241, 0.15));\n  color: #a78bfa;\n  border: 1px solid rgba(139, 92, 246, 0.3);\n}\n.users-layout {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 20px;\n  min-height: 500px;\n}\n.users-list-panel {\n  background: var(--bg-card);\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  overflow: hidden;\n}\n.panel-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--border-color);\n}\n.panel-header h3 {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.panel-header h3 .material-icons-round {\n  font-size: 20px;\n  color: #a78bfa;\n}\n.count-badge {\n  background: rgba(139, 92, 246, 0.15);\n  color: #a78bfa;\n  font-size: 12px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 8px;\n}\n.user-card {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 20px;\n  cursor: pointer;\n  transition: all 0.2s;\n  border-bottom: 1px solid var(--border-color);\n}\n.user-card:last-child {\n  border-bottom: none;\n}\n.user-card:hover {\n  background: rgba(255, 255, 255, 0.04);\n}\n.user-card.selected {\n  background: rgba(139, 92, 246, 0.1);\n  border-right: 3px solid #8b5cf6;\n}\n.user-card-icon {\n  width: 40px;\n  height: 40px;\n  min-width: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.user-card-icon .material-icons-round {\n  font-size: 20px;\n}\n.user-card-icon.role-admin {\n  background: rgba(245, 158, 11, 0.15);\n}\n.user-card-icon.role-admin .material-icons-round {\n  color: #f59e0b;\n}\n.user-card-icon.role-accountant {\n  background: rgba(59, 130, 246, 0.15);\n}\n.user-card-icon.role-accountant .material-icons-round {\n  color: #3b82f6;\n}\n.user-card-icon.role-manager {\n  background: rgba(34, 197, 94, 0.15);\n}\n.user-card-icon.role-manager .material-icons-round {\n  color: #22c55e;\n}\n.user-card-icon.role-viewer {\n  background: rgba(148, 163, 184, 0.15);\n}\n.user-card-icon.role-viewer .material-icons-round {\n  color: #94a3b8;\n}\n.user-card-info {\n  display: flex;\n  flex-direction: column;\n}\n.user-card-name {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.user-card-role {\n  font-size: 11px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.check-icon {\n  color: #8b5cf6;\n  font-size: 20px;\n  margin-right: auto;\n  margin-left: 0;\n}\n.user-config-panel {\n  background: var(--bg-card);\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  overflow: hidden;\n}\n.save-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 18px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  color: white;\n  font-weight: 700;\n  font-size: 13px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.save-btn .material-icons-round {\n  font-size: 18px;\n}\n.save-btn:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);\n}\n.save-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.config-hint {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 20px;\n  margin: 12px 16px;\n  background: rgba(59, 130, 246, 0.08);\n  border-radius: 10px;\n  color: #60a5fa;\n  font-size: 13px;\n  font-weight: 600;\n  border: 1px solid rgba(59, 130, 246, 0.15);\n}\n.config-hint .material-icons-round {\n  font-size: 18px;\n}\n.config-section {\n  margin: 0 16px 16px;\n}\n.config-section-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 12px;\n  margin-bottom: 6px;\n}\n.config-section-header h4 {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.section-actions {\n  display: flex;\n  gap: 4px;\n}\n.mini-btn {\n  width: 28px;\n  height: 28px;\n  border-radius: 6px;\n  border: none;\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.mini-btn .material-icons-round {\n  font-size: 16px;\n}\n.mini-btn:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: var(--text-primary);\n}\n.config-items-list {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.config-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px;\n  border-radius: 10px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  transition: all 0.2s;\n  cursor: grab;\n}\n.config-item:active {\n  cursor: grabbing;\n}\n.config-item.drag-over {\n  border-color: #8b5cf6;\n  background: rgba(139, 92, 246, 0.08);\n}\n.config-item.hidden-item {\n  opacity: 0.5;\n}\n.config-item.hidden-item .config-item-icon {\n  background: rgba(148, 163, 184, 0.1);\n}\n.drag-handle {\n  font-size: 18px;\n  color: var(--text-muted);\n  cursor: grab;\n}\n.drag-handle:active {\n  cursor: grabbing;\n}\n.config-item-icon {\n  width: 32px;\n  height: 32px;\n  min-width: 32px;\n  border-radius: 8px;\n  background: rgba(139, 92, 246, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.config-item-icon .material-icons-round {\n  font-size: 18px;\n  color: #a78bfa;\n}\n.config-item-label {\n  flex: 1;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.toggle-btn {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: none;\n  background: rgba(148, 163, 184, 0.1);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.toggle-btn .material-icons-round {\n  font-size: 18px;\n}\n.toggle-btn.on {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.toggle-btn:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n.management-panel {\n  background: var(--bg-card);\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  overflow: hidden;\n}\n.items-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 12px;\n  padding: 16px 20px;\n}\n.management-card {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  border-radius: 12px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  transition: all 0.2s;\n}\n.management-card:hover {\n  border-color: var(--border-strong);\n}\n.card-icon {\n  width: 40px;\n  height: 40px;\n  min-width: 40px;\n  border-radius: 10px;\n  background: rgba(139, 92, 246, 0.12);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-icon .material-icons-round {\n  font-size: 20px;\n  color: #a78bfa;\n}\n.card-info {\n  flex: 1;\n}\n.card-info h4 {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.card-meta {\n  font-size: 11px;\n  color: var(--text-muted);\n  font-weight: 600;\n}\n.card-actions {\n  display: flex;\n  gap: 4px;\n}\n.icon-btn {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: none;\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-btn .material-icons-round {\n  font-size: 17px;\n}\n.icon-btn:hover {\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n}\n.icon-btn.danger:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.items-section-group {\n  margin-bottom: 8px;\n}\n.section-group-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 20px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  border-bottom: 1px solid var(--border-color);\n}\n.section-group-title .material-icons-round {\n  font-size: 18px;\n  color: #a78bfa;\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.modal {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 560px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 24px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-header h3 {\n  font-size: 17px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.close-btn {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body {\n  padding: 20px 24px;\n}\n.modal-footer {\n  padding: 16px 24px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select {\n  width: 100%;\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n}\n.form-group input:focus,\n.form-group select:focus {\n  outline: none;\n  border-color: #8b5cf6;\n  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.12);\n}\n.icon-picker {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.icon-option {\n  width: 38px;\n  height: 38px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.icon-option .material-icons-round {\n  font-size: 18px;\n}\n.icon-option:hover {\n  border-color: #8b5cf6;\n  color: #a78bfa;\n}\n.icon-option.selected {\n  background: rgba(139, 92, 246, 0.15);\n  border-color: #8b5cf6;\n  color: #a78bfa;\n}\n.btn-save {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #6366f1);\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-save .material-icons-round {\n  font-size: 18px;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state p {\n  font-size: 15px;\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .users-layout {\n    grid-template-columns: 1fr;\n  }\n  .page-container {\n    padding: 16px;\n  }\n}\n/*# sourceMappingURL=sidebar-settings.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarSettingsComponent, { className: "SidebarSettingsComponent", filePath: "src/app/pages/sidebar-settings/sidebar-settings.ts", lineNumber: 55 });
})();
export {
  SidebarSettingsComponent
};
//# sourceMappingURL=chunk-QSGFSPWQ.js.map
