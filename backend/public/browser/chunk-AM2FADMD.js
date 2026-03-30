import {
  getSearchHighlightParts,
  matchesSearchQuery,
  normalizeSearchText
} from "./chunk-RCZO5KY5.js";
import {
  ThemeService
} from "./chunk-WIHW6D6J.js";
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
  HostListener,
  Input,
  NavigationEnd,
  NgIf,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  filter,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-VUZEB5JS.js";

// src/app/components/sidebar/sidebar.ts
var _c0 = (a0) => ({ exact: a0 });
var _forTrack0 = ($index, $item) => $item.sectionId ?? $item.title;
var _forTrack1 = ($index, $item) => $item.label;
function SidebarComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0646\u0638\u0627\u0645 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.biz.currentBusinessName() || "\u062D\u0633\u0627\u0628\u0627\u062A\u064A");
  }
}
function SidebarComponent_Conditional_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function SidebarComponent_Conditional_8_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.clearSidebarSearch());
    });
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function SidebarComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 13)(2, "span", 14);
    \u0275\u0275text(3, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 15);
    \u0275\u0275listener("input", function SidebarComponent_Conditional_8_Template_input_input_4_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setSidebarSearchQuery($event.target.value));
    })("keydown", function SidebarComponent_Conditional_8_Template_input_keydown_4_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSidebarSearchKeydown($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, SidebarComponent_Conditional_8_Conditional_5_Template, 3, 0, "button", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r0.sidebarSearchQuery());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.sidebarSearchQuery().trim() ? 5 : -1);
  }
}
function SidebarComponent_For_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "mark", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const section_r4 = \u0275\u0275nextContext().$implicit;
    const parts_r5 = \u0275\u0275nextContext().getSidebarHighlightParts(section_r4.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", parts_r5.before);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(parts_r5.match);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", parts_r5.after, " ");
  }
}
function SidebarComponent_For_10_For_3_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "mark", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 26);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    const parts_r8 = ctx_r0.getSidebarHighlightParts(item_r7.label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", parts_r8.before);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(parts_r8.match);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", parts_r8.after, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.isExpanded(item_r7.label) ? "expand_less" : "expand_more");
  }
}
function SidebarComponent_For_10_For_3_Conditional_0_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 27)(1, "span", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 29);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "mark", 19);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const child_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275property("routerLink", child_r9.route);
    \u0275\u0275attribute("data-icon", child_r9.icon);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r0.getIconColor(child_r9.icon));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(child_r9.icon);
    const parts_r10 = ctx_r0.getSidebarHighlightParts(child_r9.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", parts_r10.before);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(parts_r10.match);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", parts_r10.after, " ");
  }
}
function SidebarComponent_For_10_For_3_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, SidebarComponent_For_10_For_3_Conditional_0_Conditional_6_For_2_Template, 8, 8, "a", 27, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(item_r7.children);
  }
}
function SidebarComponent_For_10_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "button", 22);
    \u0275\u0275listener("click", function SidebarComponent_For_10_For_3_Conditional_0_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const item_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleItem(item_r7.label));
    });
    \u0275\u0275elementStart(2, "div", 23)(3, "span", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, SidebarComponent_For_10_For_3_Conditional_0_Conditional_5_Template, 7, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, SidebarComponent_For_10_For_3_Conditional_0_Conditional_6_Template, 3, 0, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("expanded", ctx_r0.isExpanded(item_r7.label));
    \u0275\u0275advance();
    \u0275\u0275property("title", item_r7.label);
    \u0275\u0275attribute("data-icon", item_r7.icon);
    \u0275\u0275advance();
    \u0275\u0275styleProp("--icon-color", ctx_r0.getIconColor(item_r7.icon))("--icon-glow", ctx_r0.getIconGlow(item_r7.icon));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.icon);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isCollapsed() ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isExpanded(item_r7.label) && !ctx_r0.isCollapsed() ? 6 : -1);
  }
}
function SidebarComponent_For_10_For_3_Conditional_1_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(item_r7.icon);
    \u0275\u0275styleProp("color", ctx_r0.getIconColor(item_r7.icon));
  }
}
function SidebarComponent_For_10_For_3_Conditional_1_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.icon);
  }
}
function SidebarComponent_For_10_For_3_Conditional_1_Conditional_0_Conditional_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(4).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("background", ctx_r0.getIconColor(item_r7.icon));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.badge);
  }
}
function SidebarComponent_For_10_For_3_Conditional_1_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "mark", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, SidebarComponent_For_10_For_3_Conditional_1_Conditional_0_Conditional_4_Conditional_5_Template, 2, 3, "span", 34);
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    const parts_r11 = \u0275\u0275nextContext(2).getSidebarHighlightParts(item_r7.label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", parts_r11.before);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(parts_r11.match);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", parts_r11.after, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r7.badge ? 5 : -1);
  }
}
function SidebarComponent_For_10_For_3_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 32)(1, "div", 23);
    \u0275\u0275conditionalCreate(2, SidebarComponent_For_10_For_3_Conditional_1_Conditional_0_Conditional_2_Template, 1, 4, "i", 33)(3, SidebarComponent_For_10_For_3_Conditional_1_Conditional_0_Conditional_3_Template, 2, 1, "span", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, SidebarComponent_For_10_For_3_Conditional_1_Conditional_0_Conditional_4_Template, 6, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r0.isItemActive(item_r7.route));
    \u0275\u0275property("routerLink", ctx_r0.getRoutePath(item_r7.route))("queryParams", ctx_r0.getQueryParams(item_r7.route))("title", item_r7.label);
    \u0275\u0275attribute("hint", item_r7.label)("data-icon", item_r7.icon);
    \u0275\u0275advance();
    \u0275\u0275styleProp("--icon-color", ctx_r0.getIconColor(item_r7.icon))("--icon-glow", ctx_r0.getIconGlow(item_r7.icon));
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r7.icon && item_r7.icon.startsWith("pi ") ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r0.isCollapsed() ? 4 : -1);
  }
}
function SidebarComponent_For_10_For_3_Conditional_1_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(item_r7.icon);
    \u0275\u0275styleProp("color", ctx_r0.getIconColor(item_r7.icon));
  }
}
function SidebarComponent_For_10_For_3_Conditional_1_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.icon);
  }
}
function SidebarComponent_For_10_For_3_Conditional_1_Conditional_1_Conditional_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(4).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("background", ctx_r0.getIconColor(item_r7.icon));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.badge);
  }
}
function SidebarComponent_For_10_For_3_Conditional_1_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "mark", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, SidebarComponent_For_10_For_3_Conditional_1_Conditional_1_Conditional_4_Conditional_5_Template, 2, 3, "span", 34);
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(3).$implicit;
    const parts_r12 = \u0275\u0275nextContext(2).getSidebarHighlightParts(item_r7.label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", parts_r12.before);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(parts_r12.match);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", parts_r12.after, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r7.badge ? 5 : -1);
  }
}
function SidebarComponent_For_10_For_3_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 31)(1, "div", 23);
    \u0275\u0275conditionalCreate(2, SidebarComponent_For_10_For_3_Conditional_1_Conditional_1_Conditional_2_Template, 1, 4, "i", 33)(3, SidebarComponent_For_10_For_3_Conditional_1_Conditional_1_Conditional_3_Template, 2, 1, "span", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, SidebarComponent_For_10_For_3_Conditional_1_Conditional_1_Conditional_4_Template, 6, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", item_r7.route || "/")("routerLinkActiveOptions", \u0275\u0275pureFunction1(11, _c0, (item_r7.route || "") === "/biz/" + ctx_r0.biz.currentBusinessId()))("title", item_r7.label);
    \u0275\u0275attribute("hint", item_r7.label)("data-icon", item_r7.icon);
    \u0275\u0275advance();
    \u0275\u0275styleProp("--icon-color", ctx_r0.getIconColor(item_r7.icon))("--icon-glow", ctx_r0.getIconGlow(item_r7.icon));
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r7.icon && item_r7.icon.startsWith("pi ") ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r0.isCollapsed() ? 4 : -1);
  }
}
function SidebarComponent_For_10_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, SidebarComponent_For_10_For_3_Conditional_1_Conditional_0_Template, 5, 13, "a", 30)(1, SidebarComponent_For_10_For_3_Conditional_1_Conditional_1_Template, 5, 13, "a", 31);
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r0.hasQueryParams(item_r7.route) ? 0 : 1);
  }
}
function SidebarComponent_For_10_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, SidebarComponent_For_10_For_3_Conditional_0_Template, 7, 11, "div", 20)(1, SidebarComponent_For_10_For_3_Conditional_1_Template, 2, 1);
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275conditional(item_r7.children ? 0 : 1);
  }
}
function SidebarComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275conditionalCreate(1, SidebarComponent_For_10_Conditional_1_Template, 5, 3, "div", 18);
    \u0275\u0275repeaterCreate(2, SidebarComponent_For_10_For_3_Template, 2, 1, null, null, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const section_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isCollapsed() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(section_r4.items);
  }
}
function SidebarComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "span", 4);
    \u0275\u0275text(2, "search_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631 \u0645\u0637\u0627\u0628\u0642\u0629");
    \u0275\u0275elementEnd()();
  }
}
function SidebarComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "span", 37);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 38);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 39);
    \u0275\u0275listener("click", function SidebarComponent_Conditional_17_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.logout());
    });
    \u0275\u0275elementStart(6, "span", 4);
    \u0275\u0275text(7, "logout");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(((tmp_1_0 = ctx_r0.user()) == null ? null : tmp_1_0.fullName) || "\u0627\u0644\u0645\u0627\u0644\u0643");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.getRoleLabel());
  }
}
var SidebarComponent = class _SidebarComponent {
  sidebarSearchInputId = "sidebar-search-input";
  auth = inject(AuthService);
  router = inject(Router);
  api = inject(ApiService);
  biz = inject(BusinessService);
  isCollapsed = signal(false, ...ngDevMode ? [{ debugName: "isCollapsed" }] : (
    /* istanbul ignore next */
    []
  ));
  expandedItems = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "expandedItems" }] : (
    /* istanbul ignore next */
    []
  ));
  menuSections = signal([], ...ngDevMode ? [{ debugName: "menuSections" }] : (
    /* istanbul ignore next */
    []
  ));
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  sidebarSearchQuery = signal("", ...ngDevMode ? [{ debugName: "sidebarSearchQuery" }] : (
    /* istanbul ignore next */
    []
  ));
  user = this.auth.user;
  filteredMenuSections = computed(() => {
    const query = normalizeSearchText(this.sidebarSearchQuery());
    const sections = this.menuSections();
    if (!query)
      return sections;
    return sections.map((section) => {
      const sectionMatch = normalizeSearchText(section.title).includes(query);
      if (sectionMatch)
        return section;
      const items = (section.items || []).map((item) => {
        const itemMatch = this.isMenuItemMatch(item, query);
        if (itemMatch)
          return item;
        if (!item.children?.length)
          return null;
        const matchedChildren = item.children.filter((child) => this.isMenuItemMatch(child, query));
        return matchedChildren.length ? __spreadProps(__spreadValues({}, item), { children: matchedChildren }) : null;
      }).filter((item) => item !== null);
      return items.length ? __spreadProps(__spreadValues({}, section), { items }) : null;
    }).filter((section) => section !== null);
  }, ...ngDevMode ? [{ debugName: "filteredMenuSections" }] : (
    /* istanbul ignore next */
    []
  ));
  hasSidebarSearchResults = computed(() => this.filteredMenuSections().length > 0, ...ngDevMode ? [{ debugName: "hasSidebarSearchResults" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor() {
    effect(() => {
      const bizId = this.biz.currentBusinessId();
      const bizType = this.biz.currentBusinessType();
      if (bizId) {
        this.loadSidebarFromDB(bizId, bizType);
      }
    });
  }
  async loadSidebarFromDB(bizId, type) {
    const userId = this.auth.user()?.id;
    if (!userId) {
      this.buildFallbackMenu(bizId, type);
      return;
    }
    try {
      this.isLoading.set(true);
      const configs = await this.api.getUserSidebar(bizId, userId);
      if (!configs || configs.length === 0) {
        this.buildFallbackMenu(bizId, type);
        return;
      }
      const visibleConfigs = configs.filter((c) => c.isVisible);
      const sectionMap = /* @__PURE__ */ new Map();
      for (const cfg of visibleConfigs) {
        const secId = cfg.sectionId;
        const route = cfg.route;
        if (route == null || route === "")
          continue;
        if (!sectionMap.has(secId)) {
          sectionMap.set(secId, {
            title: cfg.customSectionName || cfg.sectionName || "\u0642\u0633\u0645",
            sectionId: secId,
            items: []
          });
        }
        const section = sectionMap.get(secId);
        const resolvedRoute = String(route).replaceAll("{bizId}", String(bizId));
        section.items.push({
          icon: cfg.icon || "circle",
          label: cfg.label || "\u0639\u0646\u0635\u0631",
          route: resolvedRoute,
          badge: cfg.badge || void 0,
          badgeColor: cfg.badgeColor || void 0,
          screenKey: cfg.screenKey,
          itemId: cfg.itemId
        });
      }
      const sectionOrder = /* @__PURE__ */ new Map();
      for (const cfg of visibleConfigs) {
        if (!sectionOrder.has(cfg.sectionId)) {
          sectionOrder.set(cfg.sectionId, cfg.sectionSortOrder);
        }
      }
      const sections = Array.from(sectionMap.values()).sort((a, b) => {
        const orderA = sectionOrder.get(a.sectionId) || 0;
        const orderB = sectionOrder.get(b.sectionId) || 0;
        return orderA - orderB;
      });
      for (const section of sections) {
        const itemOrders = /* @__PURE__ */ new Map();
        for (const cfg of visibleConfigs) {
          if (cfg.sectionId === section.sectionId) {
            itemOrders.set(cfg.itemId, cfg.customSortOrder || 0);
          }
        }
        section.items.sort((a, b) => {
          const orderA = itemOrders.get(a.itemId) || 0;
          const orderB = itemOrders.get(b.itemId) || 0;
          return orderA - orderB;
        });
      }
      this.menuSections.set(this.appendArchiveMenuItem(sections, bizId));
    } catch (err) {
      console.error("Error loading sidebar config:", err);
      this.buildFallbackMenu(bizId, type);
    } finally {
      this.isLoading.set(false);
    }
  }
  /**
   * استخراج الـ path والـ query params من الـ route string
   * مثال: /biz/1/custom-screens?screen=3 -> { path: '/biz/1/custom-screens', queryParams: { screen: '3' } }
   */
  parseRoute(route) {
    if (!route)
      return { path: "/", queryParams: {} };
    const [path, queryString] = route.split("?");
    const queryParams = {};
    if (queryString) {
      queryString.split("&").forEach((pair) => {
        const [key, value] = pair.split("=");
        if (key)
          queryParams[decodeURIComponent(key)] = decodeURIComponent(value || "");
      });
    }
    return { path, queryParams };
  }
  /**
   * التحقق إذا كان الـ route يحتوي على query params
   */
  hasQueryParams(route) {
    return !!route?.includes("?");
  }
  /**
   * الحصول على الـ path فقط بدون query params (لـ routerLink)
   */
  getRoutePath(route) {
    if (!route)
      return "/";
    return route.split("?")[0];
  }
  /**
   * الحصول على الـ query params كـ object (لـ [queryParams])
   */
  getQueryParams(route) {
    if (!route?.includes("?"))
      return {};
    const { queryParams } = this.parseRoute(route);
    return queryParams;
  }
  /**
   * التنقل لعنصر القائمة مع دعم query params
   */
  navigateTo(item) {
    if (!item.route)
      return;
    const { path, queryParams } = this.parseRoute(item.route);
    if (Object.keys(queryParams).length > 0) {
      this.router.navigate([path], { queryParams });
    } else {
      this.router.navigate([path]);
    }
  }
  /**
   * التحقق من أن العنصر نشط (للـ routerLinkActive البديل)
   */
  isItemActive(route) {
    if (!route)
      return false;
    const { path, queryParams } = this.parseRoute(route);
    const currentUrl = this.router.url;
    const [currentPath, currentQuery] = currentUrl.split("?");
    if (currentPath !== path)
      return false;
    if (Object.keys(queryParams).length === 0)
      return true;
    const currentParams = {};
    if (currentQuery) {
      currentQuery.split("&").forEach((pair) => {
        const [key, value] = pair.split("=");
        if (key)
          currentParams[decodeURIComponent(key)] = decodeURIComponent(value || "");
      });
    }
    return Object.entries(queryParams).every(([k, v]) => currentParams[k] === v);
  }
  buildFallbackMenu(bizId, type) {
    const b = `/biz/${bizId}`;
    const sectionsStations = [
      { title: "1. \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A", items: [
        { icon: "admin_panel_settings", label: "\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0648\u0627\u0644\u0623\u062F\u0648\u0627\u0631", route: `${b}/roles` },
        { icon: "tune", label: "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628", route: `${b}/sidebar-settings` }
      ] },
      { title: "2. \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u0648\u0627\u0644\u0623\u0639\u0645\u0627\u0644", items: [
        { icon: "dashboard", label: "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645", route: b },
        { icon: "arrow_forward", label: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0623\u0639\u0645\u0627\u0644", route: "/businesses" },
        { icon: "bolt", label: "\u0627\u0644\u0645\u062D\u0637\u0627\u062A", route: `${b}/stations` },
        { icon: "groups", label: "\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646", route: `${b}/employees` },
        { icon: "handshake", label: "\u0627\u0644\u0634\u0631\u0643\u0627\u0621", route: `${b}/partners` }
      ] },
      { title: "3. \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0648\u0627\u0644\u0623\u0631\u0635\u062F\u0629", items: [
        { icon: "account_balance_wallet", label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A", route: `${b}/accounts` },
        { icon: "label", label: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0631\u0639\u064A\u0629", route: `${b}/account-sub-natures` },
        { icon: "savings", label: "\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642", route: `${b}/funds` },
        { icon: "account_balance", label: "\u0627\u0644\u0628\u0646\u0648\u0643", route: `${b}/banks` },
        { icon: "currency_exchange", label: "\u0627\u0644\u0635\u0631\u0627\u0641\u064A\u0646", route: `${b}/exchangers` },
        { icon: "wallet", label: "\u0627\u0644\u0645\u062D\u0627\u0641\u0638 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629", route: `${b}/wallets` }
      ] },
      { title: "4. \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629", items: [
        { icon: "receipt_long", label: "\u0633\u0646\u062F\u0627\u062A \u0627\u0644\u0635\u0631\u0641 \u0648\u0627\u0644\u0642\u0628\u0636", route: `${b}/vouchers` },
        { icon: "folder_open", label: "\u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629", route: `${b}/attachments-archive` },
        { icon: "menu_book", label: "\u0627\u0644\u0642\u064A\u0648\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628\u064A\u0629", route: `${b}/journal` },
        { icon: "label", label: "\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0642\u064A\u0648\u062F", route: `${b}/journal-categories` }
      ] },
      { title: "5. \u0627\u0644\u0642\u0648\u0627\u0644\u0628 \u0648\u0627\u0644\u062A\u0631\u0642\u064A\u0645", items: [
        { icon: "category", label: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A", route: `${b}/operation-types` }
      ] },
      { title: "6. \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0648\u0627\u0644\u0645\u062E\u0627\u0632\u0646", items: [
        { icon: "warehouse", label: "\u0627\u0644\u0645\u062E\u0632\u0646", route: `${b}/warehouse` },
        { icon: "inventory_2", label: "\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0646\u064A\u0629", route: `${b}/warehouse-operations` }
      ] },
      { title: "7. \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646 \u0648\u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A", items: [
        { icon: "local_shipping", label: "\u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646", route: `${b}/suppliers` },
        { icon: "receipt_long", label: "\u0641\u0648\u0627\u062A\u064A\u0631 \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A", route: `${b}/purchase-invoices` }
      ] },
      { title: "8. \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0648\u0627\u0644\u0641\u0648\u062A\u0631\u0629", items: [
        { icon: "receipt_long", label: "\u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0648\u0627\u0644\u062A\u0648\u0631\u064A\u062F", route: `${b}/collections` },
        { icon: "receipt", label: "\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629", route: `${b}/billing-systems` }
      ] },
      { title: "9. \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631", items: [
        { icon: "assessment", label: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631", route: `${b}/reports` },
        { icon: "analytics", label: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629", route: `${b}/reports-advanced` }
      ] },
      { title: "10. \u0628\u0646\u0627\u0621 \u0627\u0644\u0648\u0627\u062C\u0647\u0627\u062A", items: [
        { icon: "space_dashboard", label: "\u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629", route: `${b}/custom-screens` },
        { icon: "dashboard_customize", label: "\u0628\u0646\u0627\u0621 \u0627\u0644\u0648\u0627\u062C\u0647\u0627\u062A", route: `${b}/ui-builder` }
      ] },
      { title: "11. \u0627\u0644\u0639\u0645\u0644\u0627\u062A \u0648\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0635\u0631\u0641", items: [
        { icon: "currency_exchange", label: "\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0635\u0631\u0641", route: `${b}/exchange-rates` }
      ] },
      { title: "12. \u0627\u0644\u0645\u0639\u0644\u0642\u0627\u062A \u0648\u0627\u0644\u062A\u0635\u0641\u064A\u0627\u062A", items: [
        { icon: "balance", label: "\u0627\u0644\u062A\u0635\u0641\u064A\u0627\u062A", route: `${b}/settlements` },
        { icon: "warning", label: "\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629", route: `${b}/pending`, badge: 3, badgeColor: "red" }
      ] },
      { title: "13. \u0627\u0644\u0631\u0648\u0627\u062A\u0628 \u0648\u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629", items: [
        { icon: "category", label: "\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A", route: `${b}/expense-categories` },
        { icon: "account_balance_wallet", label: "\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A", route: `${b}/expense-budget` },
        { icon: "payments", label: "\u0627\u0644\u0631\u0648\u0627\u062A\u0628", route: `${b}/salaries` }
      ] }
    ];
    const sectionsSingleStation = [
      { title: "1. \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A", items: [
        { icon: "admin_panel_settings", label: "\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0648\u0627\u0644\u0623\u062F\u0648\u0627\u0631", route: `${b}/roles` },
        { icon: "tune", label: "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628", route: `${b}/sidebar-settings` }
      ] },
      { title: "2. \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u0648\u0627\u0644\u0623\u0639\u0645\u0627\u0644", items: [
        { icon: "dashboard", label: "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645", route: b },
        { icon: "arrow_forward", label: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0623\u0639\u0645\u0627\u0644", route: "/businesses" },
        { icon: "groups", label: "\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646", route: `${b}/employees` },
        { icon: "handshake", label: "\u0627\u0644\u0634\u0631\u0643\u0627\u0621", route: `${b}/partners` }
      ] },
      { title: "3. \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0648\u0627\u0644\u0623\u0631\u0635\u062F\u0629", items: [
        { icon: "account_balance_wallet", label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A", route: `${b}/accounts` },
        { icon: "label", label: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0631\u0639\u064A\u0629", route: `${b}/account-sub-natures` },
        { icon: "savings", label: "\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642", route: `${b}/funds` },
        { icon: "account_balance", label: "\u0627\u0644\u0628\u0646\u0648\u0643", route: `${b}/banks` },
        { icon: "currency_exchange", label: "\u0627\u0644\u0635\u0631\u0627\u0641\u064A\u0646", route: `${b}/exchangers` },
        { icon: "wallet", label: "\u0627\u0644\u0645\u062D\u0627\u0641\u0638 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629", route: `${b}/wallets` }
      ] },
      { title: "4. \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629", items: [
        { icon: "receipt_long", label: "\u0633\u0646\u062F\u0627\u062A \u0627\u0644\u0635\u0631\u0641 \u0648\u0627\u0644\u0642\u0628\u0636", route: `${b}/vouchers` },
        { icon: "folder_open", label: "\u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629", route: `${b}/attachments-archive` },
        { icon: "menu_book", label: "\u0627\u0644\u0642\u064A\u0648\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628\u064A\u0629", route: `${b}/journal` },
        { icon: "label", label: "\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0642\u064A\u0648\u062F", route: `${b}/journal-categories` }
      ] },
      { title: "5. \u0627\u0644\u0642\u0648\u0627\u0644\u0628 \u0648\u0627\u0644\u062A\u0631\u0642\u064A\u0645", items: [
        { icon: "category", label: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A", route: `${b}/operation-types` }
      ] },
      { title: "6. \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0648\u0627\u0644\u0645\u062E\u0627\u0632\u0646", items: [
        { icon: "warehouse", label: "\u0627\u0644\u0645\u062E\u0632\u0646", route: `${b}/warehouse` },
        { icon: "inventory_2", label: "\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0646\u064A\u0629", route: `${b}/warehouse-operations` }
      ] },
      { title: "7. \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646 \u0648\u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A", items: [
        { icon: "local_shipping", label: "\u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646", route: `${b}/suppliers` },
        { icon: "receipt_long", label: "\u0641\u0648\u0627\u062A\u064A\u0631 \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A", route: `${b}/purchase-invoices` }
      ] },
      { title: "9. \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631", items: [
        { icon: "assessment", label: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631", route: `${b}/reports` },
        { icon: "analytics", label: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629", route: `${b}/reports-advanced` }
      ] },
      { title: "10. \u0628\u0646\u0627\u0621 \u0627\u0644\u0648\u0627\u062C\u0647\u0627\u062A", items: [
        { icon: "space_dashboard", label: "\u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629", route: `${b}/custom-screens` },
        { icon: "dashboard_customize", label: "\u0628\u0646\u0627\u0621 \u0627\u0644\u0648\u0627\u062C\u0647\u0627\u062A", route: `${b}/ui-builder` }
      ] },
      { title: "11. \u0627\u0644\u0639\u0645\u0644\u0627\u062A \u0648\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0635\u0631\u0641", items: [
        { icon: "currency_exchange", label: "\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0635\u0631\u0641", route: `${b}/exchange-rates` }
      ] },
      { title: "12. \u0627\u0644\u0645\u0639\u0644\u0642\u0627\u062A \u0648\u0627\u0644\u062A\u0635\u0641\u064A\u0627\u062A", items: [
        { icon: "balance", label: "\u0627\u0644\u062A\u0635\u0641\u064A\u0627\u062A", route: `${b}/settlements` }
      ] },
      { title: "13. \u0627\u0644\u0631\u0648\u0627\u062A\u0628 \u0648\u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629", items: [
        { icon: "category", label: "\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A", route: `${b}/expense-categories` },
        { icon: "account_balance_wallet", label: "\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A", route: `${b}/expense-budget` },
        { icon: "payments", label: "\u0627\u0644\u0631\u0648\u0627\u062A\u0628", route: `${b}/salaries` }
      ] }
    ];
    const sectionsPersonal = [
      { title: "1. \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A", items: [
        { icon: "admin_panel_settings", label: "\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0648\u0627\u0644\u0623\u062F\u0648\u0627\u0631", route: `${b}/roles` },
        { icon: "tune", label: "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0628\u0648\u064A\u0628", route: `${b}/sidebar-settings` }
      ] },
      { title: "2. \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u0648\u0627\u0644\u0623\u0639\u0645\u0627\u0644", items: [
        { icon: "dashboard", label: "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645", route: b },
        { icon: "arrow_forward", label: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0623\u0639\u0645\u0627\u0644", route: "/businesses" },
        { icon: "handshake", label: "\u0627\u0644\u0634\u0631\u0643\u0627\u0621", route: `${b}/partners` },
        { icon: "summarize", label: "\u0645\u0644\u062E\u0635 \u0627\u0644\u0623\u0639\u0645\u0627\u0644", route: `${b}/summary` }
      ] },
      { title: "3. \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0648\u0627\u0644\u0623\u0631\u0635\u062F\u0629", items: [
        { icon: "account_balance_wallet", label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A", route: `${b}/accounts` },
        { icon: "label", label: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0631\u0639\u064A\u0629", route: `${b}/account-sub-natures` }
      ] },
      { title: "4. \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629", items: [
        { icon: "receipt_long", label: "\u0633\u0646\u062F\u0627\u062A \u0627\u0644\u0635\u0631\u0641 \u0648\u0627\u0644\u0642\u0628\u0636", route: `${b}/vouchers` },
        { icon: "folder_open", label: "\u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629", route: `${b}/attachments-archive` },
        { icon: "menu_book", label: "\u0627\u0644\u0642\u064A\u0648\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628\u064A\u0629", route: `${b}/journal` },
        { icon: "label", label: "\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0642\u064A\u0648\u062F", route: `${b}/journal-categories` }
      ] },
      { title: "5. \u0627\u0644\u0642\u0648\u0627\u0644\u0628 \u0648\u0627\u0644\u062A\u0631\u0642\u064A\u0645", items: [
        { icon: "category", label: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A", route: `${b}/operation-types` }
      ] },
      { title: "9. \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631", items: [
        { icon: "assessment", label: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631", route: `${b}/reports` },
        { icon: "analytics", label: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629", route: `${b}/reports-advanced` }
      ] },
      { title: "10. \u0628\u0646\u0627\u0621 \u0627\u0644\u0648\u0627\u062C\u0647\u0627\u062A", items: [
        { icon: "space_dashboard", label: "\u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629", route: `${b}/custom-screens` },
        { icon: "dashboard_customize", label: "\u0628\u0646\u0627\u0621 \u0627\u0644\u0648\u0627\u062C\u0647\u0627\u062A", route: `${b}/ui-builder` }
      ] },
      { title: "11. \u0627\u0644\u0639\u0645\u0644\u0627\u062A \u0648\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0635\u0631\u0641", items: [
        { icon: "currency_exchange", label: "\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0635\u0631\u0641", route: `${b}/exchange-rates` }
      ] },
      { title: "12. \u0627\u0644\u0645\u0639\u0644\u0642\u0627\u062A \u0648\u0627\u0644\u062A\u0635\u0641\u064A\u0627\u062A", items: [
        { icon: "balance", label: "\u0627\u0644\u062A\u0635\u0641\u064A\u0627\u062A", route: `${b}/settlements` }
      ] },
      { title: "13. \u0627\u0644\u0631\u0648\u0627\u062A\u0628 \u0648\u0627\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629", items: [
        { icon: "category", label: "\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A", route: `${b}/expense-categories` },
        { icon: "account_balance_wallet", label: "\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A", route: `${b}/expense-budget` },
        { icon: "payments", label: "\u0627\u0644\u0631\u0648\u0627\u062A\u0628", route: `${b}/salaries` }
      ] }
    ];
    if (type === "stations") {
      this.menuSections.set(sectionsStations);
    } else if (type === "single_station") {
      this.menuSections.set(sectionsSingleStation);
    } else {
      this.menuSections.set(sectionsPersonal);
    }
  }
  /** Reload sidebar from DB (called after settings change) */
  async reloadSidebar() {
    const bizId = this.biz.currentBusinessId();
    const bizType = this.biz.currentBusinessType();
    if (bizId) {
      await this.loadSidebarFromDB(bizId, bizType);
    }
  }
  toggleCollapse() {
    this.isCollapsed.set(!this.isCollapsed());
  }
  setSidebarSearchQuery(value) {
    this.sidebarSearchQuery.set(String(value || ""));
  }
  clearSidebarSearch() {
    this.sidebarSearchQuery.set("");
  }
  onSidebarSearchKeydown(event) {
    if (event.key !== "Escape")
      return;
    if (this.sidebarSearchQuery().trim()) {
      event.preventDefault();
      this.clearSidebarSearch();
    }
  }
  getSidebarHighlightParts(text) {
    return getSearchHighlightParts(text, this.sidebarSearchQuery());
  }
  toggleItem(label) {
    const current = new Set(this.expandedItems());
    if (current.has(label))
      current.delete(label);
    else
      current.add(label);
    this.expandedItems.set(current);
  }
  isExpanded(label) {
    return this.expandedItems().has(label);
  }
  // ============================================
  // Icon Color System - Professional Unique Colors
  // ============================================
  iconColorMap = {
    "dashboard": ["#3b82f6", "#60a5fa"],
    "arrow_forward": ["#94a3b8", "#cbd5e1"],
    "bolt": ["#f59e0b", "#fbbf24"],
    "receipt_long": ["#10b981", "#34d399"],
    "receipt": ["#8b5cf6", "#a78bfa"],
    "account_balance_wallet": ["#06b6d4", "#22d3ee"],
    "category": ["#f97316", "#fb923c"],
    "savings": ["#eab308", "#facc15"],
    "account_balance": ["#6366f1", "#818cf8"],
    "currency_exchange": ["#ec4899", "#f472b6"],
    "wallet": ["#14b8a6", "#2dd4bf"],
    "tune": ["#64748b", "#94a3b8"],
    "space_dashboard": ["#a855f7", "#c084fc"],
    "admin_panel_settings": ["#ef4444", "#f87171"],
    "menu_book": ["#0ea5e9", "#38bdf8"],
    "groups": ["#22c55e", "#4ade80"],
    "handshake": ["#d946ef", "#e879f9"],
    "warehouse": ["#78716c", "#a8a29e"],
    "local_shipping": ["#f97316", "#fdba74"],
    "balance": ["#0891b2", "#22d3ee"],
    "assessment": ["#7c3aed", "#a78bfa"],
    "analytics": ["#2563eb", "#60a5fa"],
    "warning": ["#ef4444", "#fca5a5"],
    "summarize": ["#059669", "#34d399"],
    "shopping_cart": ["#e11d48", "#fb7185"],
    "settings": ["#64748b", "#94a3b8"],
    "person": ["#f59e0b", "#fbbf24"],
    "logout": ["#ef4444", "#f87171"],
    "payments": ["#10b981", "#34d399"],
    "shopping_bag": ["#f97316", "#fb923c"],
    "open_in_new": ["#3b82f6", "#60a5fa"],
    "edit": ["#f59e0b", "#fbbf24"],
    "delete": ["#ef4444", "#f87171"],
    "lock": ["#64748b", "#94a3b8"],
    "content_copy": ["#8b5cf6", "#a78bfa"],
    "add_to_home_screen": ["#06b6d4", "#22d3ee"],
    "inventory_2": ["#78716c", "#a8a29e"],
    "widgets": ["#a855f7", "#c084fc"],
    "trending_up": ["#22c55e", "#4ade80"],
    "label": ["#0ea5e9", "#38bdf8"]
  };
  getIconColor(icon) {
    const colors = this.iconColorMap[icon];
    return colors ? colors[0] : "#94a3b8";
  }
  getIconGlow(icon) {
    const colors = this.iconColorMap[icon];
    return colors ? colors[1] : "#cbd5e1";
  }
  getRoleLabel() {
    const role = this.auth.user()?.role;
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
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  onGlobalKeydown(event) {
    if (event.key !== "/")
      return;
    if (this.isCollapsed())
      return;
    const target = event.target;
    const tag = String(target?.tagName || "").toLowerCase();
    const isTypingContext = tag === "input" || tag === "textarea" || target?.isContentEditable;
    if (isTypingContext)
      return;
    event.preventDefault();
    this.focusSidebarSearchInput();
  }
  isMenuItemMatch(item, query) {
    return matchesSearchQuery(query, item?.label, item?.route);
  }
  focusSidebarSearchInput() {
    const input2 = globalThis.document?.getElementById(this.sidebarSearchInputId);
    if (!input2)
      return;
    input2.focus();
    input2.select();
  }
  appendArchiveMenuItem(sections, bizId) {
    const archiveRoute = `/biz/${bizId}/attachments-archive`;
    const alreadyExists = sections.some((section) => (section.items || []).some((item) => item.route === archiveRoute));
    if (alreadyExists)
      return sections;
    const archiveItem = {
      icon: "folder_open",
      label: "\u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629",
      route: archiveRoute,
      screenKey: "attachments_archive"
    };
    const targetSection = sections.find((section) => (section.items || []).some((item) => item.route?.includes("/vouchers")));
    if (targetSection) {
      return sections.map((section) => section === targetSection ? __spreadProps(__spreadValues({}, section), { items: [...section.items, archiveItem] }) : section);
    }
    if (sections.length === 0) {
      return [{ title: "\u0627\u0644\u0623\u0631\u0634\u0641\u0629", items: [archiveItem] }];
    }
    const cloned = [...sections];
    const last = cloned[cloned.length - 1];
    cloned[cloned.length - 1] = __spreadProps(__spreadValues({}, last), { items: [...last.items || [], archiveItem] });
    return cloned;
  }
  static \u0275fac = function SidebarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SidebarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], hostVars: 4, hostBindings: function SidebarComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function SidebarComponent_keydown_HostBindingHandler($event) {
        return ctx.onGlobalKeydown($event);
      }, \u0275\u0275resolveDocument);
    }
    if (rf & 2) {
      \u0275\u0275styleProp("display", "flex")("flex-shrink", "0");
    }
  }, decls: 18, vars: 13, consts: [[1, "sidebar"], [1, "sidebar-header"], [1, "logo-wrapper", 3, "click"], [1, "logo-box"], [1, "material-icons-round"], [1, "logo-text"], [1, "sidebar-nav"], [1, "sidebar-search"], [1, "nav-section"], [1, "sidebar-empty-search"], [1, "sidebar-footer"], [1, "user-info"], [1, "user-avatar"], [1, "search-input-wrap"], [1, "material-icons-round", "search-icon"], ["id", "sidebar-search-input", "type", "text", "placeholder", "\u0627\u0628\u062D\u062B \u0641\u064A \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u0628\u0648\u064A\u0628... (/)", "title", "\u0628\u062D\u062B \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062C\u0627\u0646\u0628\u064A", 1, "sidebar-search-input", 3, "input", "keydown", "value"], ["type", "button", "title", "\u0645\u0633\u062D \u0627\u0644\u0628\u062D\u062B", 1, "search-clear-btn"], ["type", "button", "title", "\u0645\u0633\u062D \u0627\u0644\u0628\u062D\u062B", 1, "search-clear-btn", 3, "click"], [1, "section-title"], [1, "sidebar-match-mark"], [1, "nav-item-group", 3, "expanded"], [1, "nav-item-group"], [1, "nav-item", "has-children", 3, "click", "title"], [1, "nav-icon"], [1, "nav-children"], [1, "nav-label"], [1, "material-icons-round", "expand-arrow"], ["routerLinkActive", "active", 1, "nav-child-item", 3, "routerLink"], [1, "material-icons-round", "child-icon"], [1, "child-label"], [1, "nav-item", 3, "active", "routerLink", "queryParams", "title"], ["routerLinkActive", "active", 1, "nav-item", 3, "routerLink", "routerLinkActiveOptions", "title"], [1, "nav-item", 3, "routerLink", "queryParams", "title"], [3, "class", "color"], [1, "nav-badge", 3, "background"], [1, "nav-badge"], [1, "user-details"], [1, "user-name"], [1, "user-role"], ["title", "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C", 1, "logout-btn", 3, "click"]], template: function SidebarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275listener("click", function SidebarComponent_Template_div_click_2_listener() {
        return ctx.toggleCollapse();
      });
      \u0275\u0275elementStart(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(6, SidebarComponent_Conditional_6_Template, 5, 1, "div", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "nav", 6);
      \u0275\u0275conditionalCreate(8, SidebarComponent_Conditional_8_Template, 6, 2, "div", 7);
      \u0275\u0275repeaterCreate(9, SidebarComponent_For_10_Template, 4, 1, "div", 8, _forTrack0);
      \u0275\u0275conditionalCreate(11, SidebarComponent_Conditional_11_Template, 5, 0, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 10)(13, "div", 11)(14, "div", 12)(15, "span", 4);
      \u0275\u0275text(16, "person");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(17, SidebarComponent_Conditional_17_Template, 8, 2);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("collapsed", ctx.isCollapsed());
      \u0275\u0275advance(3);
      \u0275\u0275styleProp("background", ctx.biz.currentBusinessColor() + "20")("color", ctx.biz.currentBusinessColor());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.biz.currentBusinessIcon() || "bolt");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isCollapsed() ? 6 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.isCollapsed() ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.filteredMenuSections());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.isCollapsed() && ctx.sidebarSearchQuery().trim() && !ctx.hasSidebarSearchResults() ? 11 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("collapsed", ctx.isCollapsed());
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.isCollapsed() ? 17 : -1);
    }
  }, dependencies: [RouterLink, RouterLinkActive], styles: ['\n\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_glowPulse {\n  0%, 100% {\n    opacity: 0.65;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n[_nghost-%COMP%] {\n  display: contents;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 270px;\n  min-width: 270px;\n  height: 100vh;\n  position: sticky;\n  top: 0;\n  right: 0;\n  z-index: 50;\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  overflow: hidden;\n  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  background: var(--bg-sidebar);\n  border-left: 1px solid var(--border-color);\n  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);\n}\n.sidebar.collapsed[_ngcontent-%COMP%] {\n  width: 72px;\n  min-width: 72px;\n}\n.sidebar.collapsed[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding: 10px;\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  padding: 20px 14px 16px;\n  position: relative;\n}\n.sidebar-header[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 10%;\n  right: 10%;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(251, 191, 36, 0.3),\n      rgba(249, 115, 22, 0.3),\n      transparent);\n}\n.logo-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  cursor: pointer;\n  padding: 6px 8px;\n  border-radius: 14px;\n  transition: background 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.logo-wrapper[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.04);\n}\n.logo-wrapper[_ngcontent-%COMP%]:hover   .logo-box[_ngcontent-%COMP%] {\n  transform: scale(1.06) rotate(-2deg);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(245, 158, 11, 0.2);\n}\n.logo-box[_ngcontent-%COMP%] {\n  width: 46px;\n  height: 46px;\n  min-width: 46px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n  box-shadow:\n    0 4px 14px rgba(0, 0, 0, 0.3),\n    0 1px 3px rgba(0, 0, 0, 0.15),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.logo-box[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  right: 2px;\n  height: 45%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.3),\n      transparent);\n  border-radius: 12px 12px 50% 50%;\n  pointer-events: none;\n}\n.logo-box[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #fff;\n  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));\n  position: relative;\n  z-index: 1;\n}\n.logo-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 19px;\n  font-weight: 900;\n  line-height: 1.3;\n  background:\n    linear-gradient(\n      135deg,\n      #fbbf24,\n      #f97316);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.logo-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 600;\n  color: rgba(148, 163, 184, 0.55);\n  letter-spacing: 0.3px;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding: 10px 8px;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 3px;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.sidebar-nav[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 3px;\n}\n.sidebar-search[_ngcontent-%COMP%] {\n  padding: 6px 8px 10px;\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  background:\n    linear-gradient(\n      180deg,\n      var(--bg-sidebar) 78%,\n      rgba(0, 0, 0, 0));\n}\n.search-input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 18px;\n  color: rgba(148, 163, 184, 0.7);\n  pointer-events: none;\n}\n.sidebar-search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 38px;\n  padding: 8px 36px 8px 34px;\n  border-radius: 11px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  background: rgba(255, 255, 255, 0.06);\n  color: #e2e8f0;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: inherit;\n  outline: none;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.sidebar-search-input[_ngcontent-%COMP%]::placeholder {\n  color: rgba(148, 163, 184, 0.7);\n  font-weight: 600;\n}\n.sidebar-search-input[_ngcontent-%COMP%]:focus {\n  border-color: rgba(59, 130, 246, 0.55);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n  background: rgba(255, 255, 255, 0.08);\n}\n.search-clear-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 6px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 24px;\n  height: 24px;\n  border-radius: 7px;\n  border: none;\n  background: transparent;\n  color: rgba(148, 163, 184, 0.75);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.search-clear-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.search-clear-btn[_ngcontent-%COMP%]:hover {\n  color: #f8fafc;\n  background: rgba(255, 255, 255, 0.08);\n}\n.sidebar-empty-search[_ngcontent-%COMP%] {\n  margin: 8px 10px 6px;\n  padding: 10px;\n  border-radius: 10px;\n  border: 1px dashed rgba(148, 163, 184, 0.26);\n  color: rgba(148, 163, 184, 0.82);\n  font-size: 12px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.sidebar-empty-search[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n  opacity: 0.85;\n}\n.nav-section[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 9.5px;\n  font-weight: 800;\n  color: rgba(148, 163, 184, 0.45);\n  text-transform: uppercase;\n  letter-spacing: 1.4px;\n  padding: 12px 14px 5px;\n}\n.sidebar-match-mark[_ngcontent-%COMP%] {\n  background: rgba(250, 204, 21, 0.34);\n  color: inherit;\n  padding: 0 2px;\n  border-radius: 4px;\n  font-weight: 900;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 8px 10px;\n  border-radius: 12px;\n  color: rgba(226, 232, 240, 0.8);\n  text-decoration: none;\n  font-size: 13.5px;\n  font-weight: 600;\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  margin-bottom: 2px;\n  position: relative;\n  width: 100%;\n  border: 1px solid transparent;\n  background: transparent;\n  cursor: pointer;\n  text-align: right;\n  font-family: inherit;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.05);\n  color: #f1f5f9;\n  transform: translateX(-3px);\n}\n.nav-item[_ngcontent-%COMP%]:hover   .nav-icon[_ngcontent-%COMP%] {\n  transform: scale(1.12);\n  box-shadow:\n    0 0 18px color-mix(in srgb, var(--icon-color, #94a3b8) 25%, transparent),\n    0 4px 12px rgba(0, 0, 0, 0.25),\n    inset 0 1px 0 rgba(255, 255, 255, 0.12);\n  border-color: color-mix(in srgb, var(--icon-color, #94a3b8) 30%, transparent);\n}\n.nav-item[_ngcontent-%COMP%]:hover   .nav-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%], \n.nav-item[_ngcontent-%COMP%]:hover   .nav-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--icon-glow, #cbd5e1);\n  filter: drop-shadow(0 0 8px color-mix(in srgb, var(--icon-color, #94a3b8) 50%, transparent));\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      color-mix(in srgb, var(--icon-color, #3b82f6) 14%, transparent),\n      color-mix(in srgb, var(--icon-color, #3b82f6) 6%, transparent));\n  border-color: color-mix(in srgb, var(--icon-color, #3b82f6) 14%, transparent);\n  color: #f8fafc;\n  box-shadow: 0 2px 16px color-mix(in srgb, var(--icon-color, #3b82f6) 12%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.04);\n}\n.nav-item.active[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  right: -8px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 3.5px;\n  height: 22px;\n  border-radius: 3px;\n  background:\n    linear-gradient(\n      180deg,\n      var(--icon-color, #3b82f6),\n      var(--icon-glow, #60a5fa));\n  box-shadow: 0 0 12px color-mix(in srgb, var(--icon-color, #3b82f6) 55%, transparent);\n  animation: _ngcontent-%COMP%_glowPulse 2.5s ease-in-out infinite;\n}\n.nav-item.active[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      color-mix(in srgb, var(--icon-color, #3b82f6) 30%, transparent),\n      color-mix(in srgb, var(--icon-color, #3b82f6) 16%, transparent));\n  border-color: color-mix(in srgb, var(--icon-color, #3b82f6) 35%, transparent);\n  box-shadow:\n    0 0 20px color-mix(in srgb, var(--icon-color, #3b82f6) 28%, transparent),\n    0 4px 14px rgba(0, 0, 0, 0.25),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.nav-item.active[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%], \n.nav-item.active[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--icon-glow, #60a5fa);\n  filter: drop-shadow(0 0 8px color-mix(in srgb, var(--icon-color, #3b82f6) 65%, transparent));\n}\n.nav-item.has-children[_ngcontent-%COMP%]   .expand-arrow[_ngcontent-%COMP%] {\n  margin-right: auto;\n  margin-left: 0;\n  font-size: 18px;\n  color: rgba(148, 163, 184, 0.4);\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.nav-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  min-width: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n  position: relative;\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  background:\n    linear-gradient(\n      145deg,\n      color-mix(in srgb, var(--icon-color, #94a3b8) 12%, transparent),\n      color-mix(in srgb, var(--icon-color, #94a3b8) 5%, transparent));\n  border: 1px solid color-mix(in srgb, var(--icon-color, #94a3b8) 10%, transparent);\n  box-shadow:\n    0 2px 8px rgba(0, 0, 0, 0.15),\n    0 0 6px color-mix(in srgb, var(--icon-color, #94a3b8) 8%, transparent),\n    inset 0 1px 0 rgba(255, 255, 255, 0.06);\n}\n.nav-icon[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  right: 1px;\n  height: 45%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.14),\n      transparent);\n  border-radius: 9px 9px 50% 50%;\n  pointer-events: none;\n}\n.nav-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%], \n.nav-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 19px;\n  color: var(--icon-color, #94a3b8);\n  position: relative;\n  z-index: 1;\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.nav-label[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex: 1;\n  line-height: 1.4;\n}\n.nav-badge[_ngcontent-%COMP%] {\n  margin-right: auto;\n  margin-left: 0;\n  color: #fff;\n  font-size: 10px;\n  font-weight: 800;\n  padding: 2px 8px;\n  border-radius: 10px;\n  min-width: 18px;\n  text-align: center;\n  position: relative;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.nav-badge[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  right: 1px;\n  height: 45%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.25),\n      transparent);\n  border-radius: 9px 9px 50% 50%;\n  pointer-events: none;\n}\n.nav-item-group[_ngcontent-%COMP%] {\n  margin-bottom: 2px;\n}\n.nav-item-group.expanded[_ngcontent-%COMP%]    > .nav-item.has-children[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.03);\n  color: #e2e8f0;\n}\n.nav-item-group.expanded[_ngcontent-%COMP%]    > .nav-item.has-children[_ngcontent-%COMP%]   .expand-arrow[_ngcontent-%COMP%] {\n  color: rgba(148, 163, 184, 0.65);\n}\n.nav-children[_ngcontent-%COMP%] {\n  padding: 3px 0 5px;\n  margin-right: 18px;\n  border-right: 2px solid rgba(148, 163, 184, 0.08);\n  animation: _ngcontent-%COMP%_slideDown 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  position: relative;\n}\n.nav-children[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  right: -2px;\n  top: 0;\n  bottom: 0;\n  width: 2px;\n  background:\n    linear-gradient(\n      180deg,\n      color-mix(in srgb, var(--icon-color, #f59e0b) 35%, transparent),\n      transparent);\n  border-radius: 2px;\n}\n.nav-child-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  padding: 7px 12px;\n  margin: 1px 0;\n  border-radius: 8px;\n  color: rgba(148, 163, 184, 0.8);\n  text-decoration: none;\n  font-size: 12.5px;\n  font-weight: 600;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  cursor: pointer;\n}\n.nav-child-item[_ngcontent-%COMP%]   .child-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.nav-child-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.04);\n  color: #e2e8f0;\n  transform: translateX(-2px);\n}\n.nav-child-item[_ngcontent-%COMP%]:hover   .child-icon[_ngcontent-%COMP%] {\n  transform: scale(1.12);\n}\n.nav-child-item.active[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: #f1f5f9;\n  border-right: 2px solid var(--icon-color, #f59e0b);\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  padding: 10px 10px 12px;\n  position: relative;\n}\n.sidebar-footer[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 10%;\n  right: 10%;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(99, 102, 241, 0.2),\n      rgba(59, 130, 246, 0.2),\n      transparent);\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.025);\n  border: 1px solid rgba(255, 255, 255, 0.04);\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.user-info[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.04);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);\n}\n.user-info.collapsed[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding: 10px 6px;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  min-width: 38px;\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1,\n      #8b5cf6);\n  border-radius: 11px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.18);\n}\n.user-avatar[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  right: 2px;\n  height: 42%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.3),\n      transparent);\n  border-radius: 9px 9px 50% 50%;\n  pointer-events: none;\n}\n.user-avatar[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 19px;\n  color: #fff;\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));\n  position: relative;\n  z-index: 1;\n}\n.user-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-width: 0;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 800;\n  color: #f1f5f9;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  color: rgba(148, 163, 184, 0.55);\n}\n.logout-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid transparent;\n  cursor: pointer;\n  padding: 7px;\n  border-radius: 9px;\n  color: rgba(148, 163, 184, 0.45);\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  border-color: rgba(239, 68, 68, 0.12);\n  color: #f87171;\n  box-shadow: 0 0 12px rgba(239, 68, 68, 0.15);\n}\n.logout-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n@media (max-width: 768px) {\n  .sidebar[_ngcontent-%COMP%] {\n    width: 72px;\n    min-width: 72px;\n  }\n}\n/*# sourceMappingURL=sidebar.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{ selector: "app-sidebar", standalone: true, imports: [RouterLink, RouterLinkActive], host: {
      "[style.display]": '"flex"',
      "[style.flex-shrink]": '"0"'
    }, template: `<aside class="sidebar" [class.collapsed]="isCollapsed()">\r
  <!-- Logo -->\r
  <div class="sidebar-header">\r
    <div class="logo-wrapper" (click)="toggleCollapse()">\r
      <div class="logo-box" [style.background]="biz.currentBusinessColor() + '20'" [style.color]="biz.currentBusinessColor()">\r
        <span class="material-icons-round">{{ biz.currentBusinessIcon() || 'bolt' }}</span>\r
      </div>\r
      @if (!isCollapsed()) {\r
        <div class="logo-text">\r
          <h2>{{ biz.currentBusinessName() || '\u062D\u0633\u0627\u0628\u0627\u062A\u064A' }}</h2>\r
          <span>\u0646\u0638\u0627\u0645 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0627\u0644\u064A\u0629</span>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
\r
  <!-- Navigation -->\r
  <nav class="sidebar-nav">\r
    @if (!isCollapsed()) {\r
      <div class="sidebar-search">\r
        <div class="search-input-wrap">\r
          <span class="material-icons-round search-icon">search</span>\r
          <input\r
            id="sidebar-search-input"\r
            class="sidebar-search-input"\r
            type="text"\r
            placeholder="\u0627\u0628\u062D\u062B \u0641\u064A \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u0628\u0648\u064A\u0628... (/)"\r
            title="\u0628\u062D\u062B \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062C\u0627\u0646\u0628\u064A"\r
            [value]="sidebarSearchQuery()"\r
            (input)="setSidebarSearchQuery($any($event.target).value)"\r
            (keydown)="onSidebarSearchKeydown($event)"\r
          />\r
          @if (sidebarSearchQuery().trim()) {\r
            <button class="search-clear-btn" type="button" title="\u0645\u0633\u062D \u0627\u0644\u0628\u062D\u062B" (click)="clearSidebarSearch()">\r
              <span class="material-icons-round">close</span>\r
            </button>\r
          }\r
        </div>\r
      </div>\r
    }\r
\r
    @for (section of filteredMenuSections(); track section.sectionId ?? section.title) {\r
      <div class="nav-section">\r
        @if (!isCollapsed()) {\r
          <div class="section-title">\r
            @let parts = getSidebarHighlightParts(section.title);\r
            {{ parts.before }}<mark class="sidebar-match-mark">{{ parts.match }}</mark>{{ parts.after }}\r
          </div>\r
        }\r
        @for (item of section.items; track item.label) {\r
          @if (item.children) {\r
            <div class="nav-item-group" [class.expanded]="isExpanded(item.label)">\r
              <button class="nav-item has-children" (click)="toggleItem(item.label)" [title]="item.label"\r
                [attr.data-icon]="item.icon">\r
                <div class="nav-icon" [style.--icon-color]="getIconColor(item.icon)" [style.--icon-glow]="getIconGlow(item.icon)">\r
                  <span class="material-icons-round">{{ item.icon }}</span>\r
                </div>\r
                @if (!isCollapsed()) {\r
                  <span class="nav-label">\r
                    @let parts = getSidebarHighlightParts(item.label);\r
                    {{ parts.before }}<mark class="sidebar-match-mark">{{ parts.match }}</mark>{{ parts.after }}\r
                  </span>\r
                  <span class="material-icons-round expand-arrow">{{ isExpanded(item.label) ? 'expand_less' : 'expand_more' }}</span>\r
                }\r
              </button>\r
              @if (isExpanded(item.label) && !isCollapsed()) {\r
                <div class="nav-children">\r
                  @for (child of item.children; track child.label) {\r
                    <a class="nav-child-item" [routerLink]="child.route" routerLinkActive="active"\r
                      [attr.data-icon]="child.icon">\r
                      <span class="material-icons-round child-icon" [style.color]="getIconColor(child.icon)">{{ child.icon }}</span>\r
                      <span class="child-label">\r
                        @let parts = getSidebarHighlightParts(child.label);\r
                        {{ parts.before }}<mark class="sidebar-match-mark">{{ parts.match }}</mark>{{ parts.after }}\r
                      </span>\r
                    </a>\r
                  }\r
                </div>\r
              }\r
            </div>\r
          } @else {\r
            @if (hasQueryParams(item.route)) {\r
              <a\r
                class="nav-item"\r
                [class.active]="isItemActive(item.route)"\r
                [routerLink]="getRoutePath(item.route)"\r
                [queryParams]="getQueryParams(item.route)"\r
                [title]="item.label"\r
                [attr.hint]="item.label"\r
                [attr.data-icon]="item.icon"\r
              >\r
                <div class="nav-icon" [style.--icon-color]="getIconColor(item.icon)" [style.--icon-glow]="getIconGlow(item.icon)">\r
                  @if (item.icon && item.icon.startsWith('pi ')) {\r
                    <i [class]="item.icon" [style.color]="getIconColor(item.icon)"></i>\r
                  } @else {\r
                    <span class="material-icons-round">{{ item.icon }}</span>\r
                  }\r
                </div>\r
                @if (!isCollapsed()) {\r
                  <span class="nav-label">\r
                    @let parts = getSidebarHighlightParts(item.label);\r
                    {{ parts.before }}<mark class="sidebar-match-mark">{{ parts.match }}</mark>{{ parts.after }}\r
                  </span>\r
                  @if (item.badge) {\r
                    <span class="nav-badge" [style.background]="getIconColor(item.icon)">{{ item.badge }}</span>\r
                  }\r
                }\r
              </a>\r
            } @else {\r
              <a\r
                class="nav-item"\r
                [routerLink]="item.route || '/'"\r
                routerLinkActive="active"\r
                [routerLinkActiveOptions]="{exact: (item.route || '') === ('/biz/' + biz.currentBusinessId())}"\r
                [title]="item.label"\r
                [attr.hint]="item.label"\r
                [attr.data-icon]="item.icon"\r
              >\r
                <div class="nav-icon" [style.--icon-color]="getIconColor(item.icon)" [style.--icon-glow]="getIconGlow(item.icon)">\r
                  @if (item.icon && item.icon.startsWith('pi ')) {\r
                    <i [class]="item.icon" [style.color]="getIconColor(item.icon)"></i>\r
                  } @else {\r
                    <span class="material-icons-round">{{ item.icon }}</span>\r
                  }\r
                </div>\r
                @if (!isCollapsed()) {\r
                  <span class="nav-label">\r
                    @let parts = getSidebarHighlightParts(item.label);\r
                    {{ parts.before }}<mark class="sidebar-match-mark">{{ parts.match }}</mark>{{ parts.after }}\r
                  </span>\r
                  @if (item.badge) {\r
                    <span class="nav-badge" [style.background]="getIconColor(item.icon)">{{ item.badge }}</span>\r
                  }\r
                }\r
              </a>\r
            }\r
          }\r
        }\r
      </div>\r
    }\r
    @if (!isCollapsed() && sidebarSearchQuery().trim() && !hasSidebarSearchResults()) {\r
      <div class="sidebar-empty-search">\r
        <span class="material-icons-round">search_off</span>\r
        <span>\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0646\u0627\u0635\u0631 \u0645\u0637\u0627\u0628\u0642\u0629</span>\r
      </div>\r
    }\r
  </nav>\r
\r
  <!-- User Section -->\r
  <div class="sidebar-footer">\r
    <div class="user-info" [class.collapsed]="isCollapsed()">\r
      <div class="user-avatar">\r
        <span class="material-icons-round">person</span>\r
      </div>\r
      @if (!isCollapsed()) {\r
        <div class="user-details">\r
          <span class="user-name">{{ user()?.fullName || '\u0627\u0644\u0645\u0627\u0644\u0643' }}</span>\r
          <span class="user-role">{{ getRoleLabel() }}</span>\r
        </div>\r
        <button class="logout-btn" (click)="logout()" title="\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C">\r
          <span class="material-icons-round">logout</span>\r
        </button>\r
      }\r
    </div>\r
  </div>\r
</aside>\r
`, styles: ['/* src/app/components/sidebar/sidebar.scss */\n@keyframes slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes glowPulse {\n  0%, 100% {\n    opacity: 0.65;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n:host {\n  display: contents;\n}\n.sidebar {\n  width: 270px;\n  min-width: 270px;\n  height: 100vh;\n  position: sticky;\n  top: 0;\n  right: 0;\n  z-index: 50;\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  overflow: hidden;\n  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  background: var(--bg-sidebar);\n  border-left: 1px solid var(--border-color);\n  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);\n}\n.sidebar.collapsed {\n  width: 72px;\n  min-width: 72px;\n}\n.sidebar.collapsed .nav-item {\n  justify-content: center;\n  padding: 10px;\n}\n.sidebar-header {\n  padding: 20px 14px 16px;\n  position: relative;\n}\n.sidebar-header::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 10%;\n  right: 10%;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(251, 191, 36, 0.3),\n      rgba(249, 115, 22, 0.3),\n      transparent);\n}\n.logo-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  cursor: pointer;\n  padding: 6px 8px;\n  border-radius: 14px;\n  transition: background 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.logo-wrapper:hover {\n  background: rgba(255, 255, 255, 0.04);\n}\n.logo-wrapper:hover .logo-box {\n  transform: scale(1.06) rotate(-2deg);\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(245, 158, 11, 0.2);\n}\n.logo-box {\n  width: 46px;\n  height: 46px;\n  min-width: 46px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n  box-shadow:\n    0 4px 14px rgba(0, 0, 0, 0.3),\n    0 1px 3px rgba(0, 0, 0, 0.15),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.logo-box::after {\n  content: "";\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  right: 2px;\n  height: 45%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.3),\n      transparent);\n  border-radius: 12px 12px 50% 50%;\n  pointer-events: none;\n}\n.logo-box .material-icons-round {\n  font-size: 24px;\n  color: #fff;\n  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4));\n  position: relative;\n  z-index: 1;\n}\n.logo-text h2 {\n  font-size: 19px;\n  font-weight: 900;\n  line-height: 1.3;\n  background:\n    linear-gradient(\n      135deg,\n      #fbbf24,\n      #f97316);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.logo-text span {\n  font-size: 10.5px;\n  font-weight: 600;\n  color: rgba(148, 163, 184, 0.55);\n  letter-spacing: 0.3px;\n}\n.sidebar-nav {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding: 10px 8px;\n}\n.sidebar-nav::-webkit-scrollbar {\n  width: 3px;\n}\n.sidebar-nav::-webkit-scrollbar-track {\n  background: transparent;\n}\n.sidebar-nav::-webkit-scrollbar-thumb {\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 3px;\n}\n.sidebar-search {\n  padding: 6px 8px 10px;\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  background:\n    linear-gradient(\n      180deg,\n      var(--bg-sidebar) 78%,\n      rgba(0, 0, 0, 0));\n}\n.search-input-wrap {\n  position: relative;\n}\n.search-icon {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 18px;\n  color: rgba(148, 163, 184, 0.7);\n  pointer-events: none;\n}\n.sidebar-search-input {\n  width: 100%;\n  height: 38px;\n  padding: 8px 36px 8px 34px;\n  border-radius: 11px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  background: rgba(255, 255, 255, 0.06);\n  color: #e2e8f0;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: inherit;\n  outline: none;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.sidebar-search-input::placeholder {\n  color: rgba(148, 163, 184, 0.7);\n  font-weight: 600;\n}\n.sidebar-search-input:focus {\n  border-color: rgba(59, 130, 246, 0.55);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n  background: rgba(255, 255, 255, 0.08);\n}\n.search-clear-btn {\n  position: absolute;\n  left: 6px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 24px;\n  height: 24px;\n  border-radius: 7px;\n  border: none;\n  background: transparent;\n  color: rgba(148, 163, 184, 0.75);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.search-clear-btn .material-icons-round {\n  font-size: 16px;\n}\n.search-clear-btn:hover {\n  color: #f8fafc;\n  background: rgba(255, 255, 255, 0.08);\n}\n.sidebar-empty-search {\n  margin: 8px 10px 6px;\n  padding: 10px;\n  border-radius: 10px;\n  border: 1px dashed rgba(148, 163, 184, 0.26);\n  color: rgba(148, 163, 184, 0.82);\n  font-size: 12px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.sidebar-empty-search .material-icons-round {\n  font-size: 17px;\n  opacity: 0.85;\n}\n.nav-section {\n  margin-bottom: 4px;\n}\n.section-title {\n  font-size: 9.5px;\n  font-weight: 800;\n  color: rgba(148, 163, 184, 0.45);\n  text-transform: uppercase;\n  letter-spacing: 1.4px;\n  padding: 12px 14px 5px;\n}\n.sidebar-match-mark {\n  background: rgba(250, 204, 21, 0.34);\n  color: inherit;\n  padding: 0 2px;\n  border-radius: 4px;\n  font-weight: 900;\n}\n.nav-item {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 8px 10px;\n  border-radius: 12px;\n  color: rgba(226, 232, 240, 0.8);\n  text-decoration: none;\n  font-size: 13.5px;\n  font-weight: 600;\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  margin-bottom: 2px;\n  position: relative;\n  width: 100%;\n  border: 1px solid transparent;\n  background: transparent;\n  cursor: pointer;\n  text-align: right;\n  font-family: inherit;\n}\n.nav-item:hover {\n  background: rgba(255, 255, 255, 0.05);\n  color: #f1f5f9;\n  transform: translateX(-3px);\n}\n.nav-item:hover .nav-icon {\n  transform: scale(1.12);\n  box-shadow:\n    0 0 18px color-mix(in srgb, var(--icon-color, #94a3b8) 25%, transparent),\n    0 4px 12px rgba(0, 0, 0, 0.25),\n    inset 0 1px 0 rgba(255, 255, 255, 0.12);\n  border-color: color-mix(in srgb, var(--icon-color, #94a3b8) 30%, transparent);\n}\n.nav-item:hover .nav-icon .material-icons-round,\n.nav-item:hover .nav-icon i {\n  color: var(--icon-glow, #cbd5e1);\n  filter: drop-shadow(0 0 8px color-mix(in srgb, var(--icon-color, #94a3b8) 50%, transparent));\n}\n.nav-item.active {\n  background:\n    linear-gradient(\n      135deg,\n      color-mix(in srgb, var(--icon-color, #3b82f6) 14%, transparent),\n      color-mix(in srgb, var(--icon-color, #3b82f6) 6%, transparent));\n  border-color: color-mix(in srgb, var(--icon-color, #3b82f6) 14%, transparent);\n  color: #f8fafc;\n  box-shadow: 0 2px 16px color-mix(in srgb, var(--icon-color, #3b82f6) 12%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.04);\n}\n.nav-item.active::before {\n  content: "";\n  position: absolute;\n  right: -8px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 3.5px;\n  height: 22px;\n  border-radius: 3px;\n  background:\n    linear-gradient(\n      180deg,\n      var(--icon-color, #3b82f6),\n      var(--icon-glow, #60a5fa));\n  box-shadow: 0 0 12px color-mix(in srgb, var(--icon-color, #3b82f6) 55%, transparent);\n  animation: glowPulse 2.5s ease-in-out infinite;\n}\n.nav-item.active .nav-icon {\n  background:\n    linear-gradient(\n      135deg,\n      color-mix(in srgb, var(--icon-color, #3b82f6) 30%, transparent),\n      color-mix(in srgb, var(--icon-color, #3b82f6) 16%, transparent));\n  border-color: color-mix(in srgb, var(--icon-color, #3b82f6) 35%, transparent);\n  box-shadow:\n    0 0 20px color-mix(in srgb, var(--icon-color, #3b82f6) 28%, transparent),\n    0 4px 14px rgba(0, 0, 0, 0.25),\n    inset 0 1px 0 rgba(255, 255, 255, 0.15);\n}\n.nav-item.active .nav-icon .material-icons-round,\n.nav-item.active .nav-icon i {\n  color: var(--icon-glow, #60a5fa);\n  filter: drop-shadow(0 0 8px color-mix(in srgb, var(--icon-color, #3b82f6) 65%, transparent));\n}\n.nav-item.has-children .expand-arrow {\n  margin-right: auto;\n  margin-left: 0;\n  font-size: 18px;\n  color: rgba(148, 163, 184, 0.4);\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.nav-icon {\n  width: 36px;\n  height: 36px;\n  min-width: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n  position: relative;\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  background:\n    linear-gradient(\n      145deg,\n      color-mix(in srgb, var(--icon-color, #94a3b8) 12%, transparent),\n      color-mix(in srgb, var(--icon-color, #94a3b8) 5%, transparent));\n  border: 1px solid color-mix(in srgb, var(--icon-color, #94a3b8) 10%, transparent);\n  box-shadow:\n    0 2px 8px rgba(0, 0, 0, 0.15),\n    0 0 6px color-mix(in srgb, var(--icon-color, #94a3b8) 8%, transparent),\n    inset 0 1px 0 rgba(255, 255, 255, 0.06);\n}\n.nav-icon::after {\n  content: "";\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  right: 1px;\n  height: 45%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.14),\n      transparent);\n  border-radius: 9px 9px 50% 50%;\n  pointer-events: none;\n}\n.nav-icon .material-icons-round,\n.nav-icon i {\n  font-size: 19px;\n  color: var(--icon-color, #94a3b8);\n  position: relative;\n  z-index: 1;\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.nav-label {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex: 1;\n  line-height: 1.4;\n}\n.nav-badge {\n  margin-right: auto;\n  margin-left: 0;\n  color: #fff;\n  font-size: 10px;\n  font-weight: 800;\n  padding: 2px 8px;\n  border-radius: 10px;\n  min-width: 18px;\n  text-align: center;\n  position: relative;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.nav-badge::after {\n  content: "";\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  right: 1px;\n  height: 45%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.25),\n      transparent);\n  border-radius: 9px 9px 50% 50%;\n  pointer-events: none;\n}\n.nav-item-group {\n  margin-bottom: 2px;\n}\n.nav-item-group.expanded > .nav-item.has-children {\n  background: rgba(255, 255, 255, 0.03);\n  color: #e2e8f0;\n}\n.nav-item-group.expanded > .nav-item.has-children .expand-arrow {\n  color: rgba(148, 163, 184, 0.65);\n}\n.nav-children {\n  padding: 3px 0 5px;\n  margin-right: 18px;\n  border-right: 2px solid rgba(148, 163, 184, 0.08);\n  animation: slideDown 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  position: relative;\n}\n.nav-children::before {\n  content: "";\n  position: absolute;\n  right: -2px;\n  top: 0;\n  bottom: 0;\n  width: 2px;\n  background:\n    linear-gradient(\n      180deg,\n      color-mix(in srgb, var(--icon-color, #f59e0b) 35%, transparent),\n      transparent);\n  border-radius: 2px;\n}\n.nav-child-item {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  padding: 7px 12px;\n  margin: 1px 0;\n  border-radius: 8px;\n  color: rgba(148, 163, 184, 0.8);\n  text-decoration: none;\n  font-size: 12.5px;\n  font-weight: 600;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  cursor: pointer;\n}\n.nav-child-item .child-icon {\n  font-size: 16px;\n  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.nav-child-item:hover {\n  background: rgba(255, 255, 255, 0.04);\n  color: #e2e8f0;\n  transform: translateX(-2px);\n}\n.nav-child-item:hover .child-icon {\n  transform: scale(1.12);\n}\n.nav-child-item.active {\n  background: rgba(255, 255, 255, 0.05);\n  color: #f1f5f9;\n  border-right: 2px solid var(--icon-color, #f59e0b);\n}\n.sidebar-footer {\n  padding: 10px 10px 12px;\n  position: relative;\n}\n.sidebar-footer::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 10%;\n  right: 10%;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(99, 102, 241, 0.2),\n      rgba(59, 130, 246, 0.2),\n      transparent);\n}\n.user-info {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px;\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.025);\n  border: 1px solid rgba(255, 255, 255, 0.04);\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.user-info:hover {\n  background: rgba(255, 255, 255, 0.04);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);\n}\n.user-info.collapsed {\n  justify-content: center;\n  padding: 10px 6px;\n}\n.user-avatar {\n  width: 38px;\n  height: 38px;\n  min-width: 38px;\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1,\n      #8b5cf6);\n  border-radius: 11px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.18);\n}\n.user-avatar::after {\n  content: "";\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  right: 2px;\n  height: 42%;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(255, 255, 255, 0.3),\n      transparent);\n  border-radius: 9px 9px 50% 50%;\n  pointer-events: none;\n}\n.user-avatar .material-icons-round {\n  font-size: 19px;\n  color: #fff;\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));\n  position: relative;\n  z-index: 1;\n}\n.user-details {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-width: 0;\n}\n.user-name {\n  font-size: 13px;\n  font-weight: 800;\n  color: #f1f5f9;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-role {\n  font-size: 10px;\n  font-weight: 600;\n  color: rgba(148, 163, 184, 0.55);\n}\n.logout-btn {\n  background: none;\n  border: 1px solid transparent;\n  cursor: pointer;\n  padding: 7px;\n  border-radius: 9px;\n  color: rgba(148, 163, 184, 0.45);\n  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.logout-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  border-color: rgba(239, 68, 68, 0.12);\n  color: #f87171;\n  box-shadow: 0 0 12px rgba(239, 68, 68, 0.15);\n}\n.logout-btn .material-icons-round {\n  font-size: 18px;\n}\n@media (max-width: 768px) {\n  .sidebar {\n    width: 72px;\n    min-width: 72px;\n  }\n}\n/*# sourceMappingURL=sidebar.css.map */\n'] }]
  }], () => [], { onGlobalKeydown: [{
    type: HostListener,
    args: ["document:keydown", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/components/sidebar/sidebar.ts", lineNumber: 166 });
})();

// src/app/components/header/header.ts
function HeaderComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 9);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "span", 10);
    \u0275\u0275text(3, "|");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("color", ctx_r0.biz.currentBusinessColor());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.biz.currentBusinessName());
  }
}
var HeaderComponent = class _HeaderComponent {
  auth = inject(AuthService);
  api = inject(ApiService);
  themeService = inject(ThemeService);
  biz = inject(BusinessService);
  pageTitle = input("\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645", ...ngDevMode ? [{ debugName: "pageTitle" }] : (
    /* istanbul ignore next */
    []
  ));
  user = this.auth.user;
  // مؤشر حالة الاتصال بقاعدة البيانات
  dbConnected = signal(null, ...ngDevMode ? [{ debugName: "dbConnected" }] : (
    /* istanbul ignore next */
    []
  ));
  // null = جاري الفحص
  healthCheckInterval = null;
  async ngOnInit() {
    await this.checkDbHealth();
    this.healthCheckInterval = setInterval(() => this.checkDbHealth(), 3e4);
  }
  ngOnDestroy() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
  }
  async checkDbHealth() {
    try {
      const result = await this.api.checkDbHealth();
      this.dbConnected.set(result?.status === "connected");
    } catch {
      this.dbConnected.set(false);
    }
  }
  getDbStatusIcon() {
    const status = this.dbConnected();
    if (status === null)
      return "sync";
    return status ? "cloud_done" : "cloud_off";
  }
  getDbStatusColor() {
    const status = this.dbConnected();
    if (status === null)
      return "#f59e0b";
    return status ? "#22c55e" : "#ef4444";
  }
  getDbStatusTitle() {
    const status = this.dbConnected();
    if (status === null)
      return "\u062C\u0627\u0631\u064A \u0641\u062D\u0635 \u0627\u0644\u0627\u062A\u0635\u0627\u0644...";
    return status ? "\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" : "\u063A\u064A\u0631 \u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A";
  }
  getCurrentDate() {
    return (/* @__PURE__ */ new Date()).toLocaleDateString("ar-YE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  static \u0275fac = function HeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], inputs: { pageTitle: [1, "pageTitle"] }, decls: 17, vars: 11, consts: [[1, "app-header"], [1, "header-right"], [1, "page-title"], [1, "page-date"], [1, "header-left"], [1, "db-status-btn", 3, "click", "title"], [1, "material-icons-round"], [1, "theme-toggle-btn", 3, "click", "title"], ["title", "\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A", 1, "header-btn"], [1, "biz-name"], [1, "separator"]], template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "header", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275conditionalCreate(3, HeaderComponent_Conditional_3_Template, 4, 3);
      \u0275\u0275text(4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "span", 3);
      \u0275\u0275text(6);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "div", 4)(8, "button", 5);
      \u0275\u0275domListener("click", function HeaderComponent_Template_button_click_8_listener() {
        return ctx.checkDbHealth();
      });
      \u0275\u0275domElementStart(9, "span", 6);
      \u0275\u0275text(10);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(11, "button", 7);
      \u0275\u0275domListener("click", function HeaderComponent_Template_button_click_11_listener() {
        return ctx.themeService.toggle();
      });
      \u0275\u0275domElementStart(12, "span", 6);
      \u0275\u0275text(13);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(14, "button", 8)(15, "span", 6);
      \u0275\u0275text(16, "notifications");
      \u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.biz.currentBusinessName() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.pageTitle(), " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.getCurrentDate());
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("title", ctx.getDbStatusTitle());
      \u0275\u0275advance();
      \u0275\u0275styleProp("color", ctx.getDbStatusColor());
      \u0275\u0275classProp("spin", ctx.dbConnected() === null);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.getDbStatusIcon(), " ");
      \u0275\u0275advance();
      \u0275\u0275domProperty("title", ctx.themeService.isDark() ? "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0646\u0647\u0627\u0631\u064A" : "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0644\u064A\u0644\u064A");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.themeService.isDark() ? "light_mode" : "dark_mode");
    }
  }, dependencies: [CommonModule], styles: ["\n\n.app-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 32px;\n  background: var(--bg-header);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border-bottom: 1px solid var(--border-color);\n  transition: background 0.3s ease;\n  position: sticky;\n  top: 0;\n  z-index: 40;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.page-title[_ngcontent-%COMP%]   .biz-name[_ngcontent-%COMP%] {\n  font-weight: 900;\n}\n.page-title[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-weight: 400;\n}\n.page-date[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.header-btn[_ngcontent-%COMP%] {\n  position: relative;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.header-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.header-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.notification-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  left: 8px;\n  width: 8px;\n  height: 8px;\n  background: #ef4444;\n  border-radius: 50%;\n  border: 2px solid var(--bg-header);\n}\n.db-status-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  position: relative;\n}\n.db-status-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  border-color: var(--border-strong);\n  transform: scale(1.05);\n}\n.db-status-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  transition: color 0.3s ease;\n}\n.db-status-btn[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1.5s linear infinite;\n}\n.theme-toggle-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.theme-toggle-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.theme-toggle-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=header.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderComponent, [{
    type: Component,
    args: [{ selector: "app-header", standalone: true, imports: [CommonModule], template: `<header class="app-header">\r
  <div class="header-right">\r
    <h1 class="page-title">\r
      @if (biz.currentBusinessName()) {\r
        <span class="biz-name" [style.color]="biz.currentBusinessColor()">{{ biz.currentBusinessName() }}</span>\r
        <span class="separator">|</span>\r
      }\r
      {{ pageTitle() }}\r
    </h1>\r
    <span class="page-date">{{ getCurrentDate() }}</span>\r
  </div>\r
  <div class="header-left">\r
    <!-- \u0645\u0624\u0634\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A -->\r
    <button class="db-status-btn" [title]="getDbStatusTitle()" (click)="checkDbHealth()">\r
      <span class="material-icons-round" [style.color]="getDbStatusColor()" [class.spin]="dbConnected() === null">\r
        {{ getDbStatusIcon() }}\r
      </span>\r
    </button>\r
    <button class="theme-toggle-btn" (click)="themeService.toggle()" [title]="themeService.isDark() ? '\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0646\u0647\u0627\u0631\u064A' : '\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0644\u064A\u0644\u064A'">\r
      <span class="material-icons-round">{{ themeService.isDark() ? 'light_mode' : 'dark_mode' }}</span>\r
    </button>\r
    <button class="header-btn" title="\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A">\r
      <span class="material-icons-round">notifications</span>\r
    </button>\r
  </div>\r
</header>\r
`, styles: ["/* src/app/components/header/header.scss */\n.app-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 32px;\n  background: var(--bg-header);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border-bottom: 1px solid var(--border-color);\n  transition: background 0.3s ease;\n  position: sticky;\n  top: 0;\n  z-index: 40;\n}\n.header-right {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.page-title {\n  font-size: 24px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.page-title .biz-name {\n  font-weight: 900;\n}\n.page-title .separator {\n  color: var(--text-muted);\n  font-weight: 400;\n}\n.page-date {\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.header-btn {\n  position: relative;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.header-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.header-btn .material-icons-round {\n  font-size: 20px;\n}\n.notification-dot {\n  position: absolute;\n  top: 8px;\n  left: 8px;\n  width: 8px;\n  height: 8px;\n  background: #ef4444;\n  border-radius: 50%;\n  border: 2px solid var(--bg-header);\n}\n.db-status-btn {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  position: relative;\n}\n.db-status-btn:hover {\n  background: var(--bg-card-hover);\n  border-color: var(--border-strong);\n  transform: scale(1.05);\n}\n.db-status-btn .material-icons-round {\n  font-size: 20px;\n  transition: color 0.3s ease;\n}\n.db-status-btn .spin {\n  animation: spin 1.5s linear infinite;\n}\n.theme-toggle-btn {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 10px;\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.theme-toggle-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.theme-toggle-btn .material-icons-round {\n  font-size: 20px;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=header.css.map */\n"] }]
  }], null, { pageTitle: [{ type: Input, args: [{ isSignal: true, alias: "pageTitle", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/components/header/header.ts", lineNumber: 15 });
})();

// src/app/components/breadcrumbs/breadcrumbs.ts
var _forTrack02 = ($index, $item) => $item.url;
function BreadcrumbsComponent_nav_0_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2)(1, "span", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function BreadcrumbsComponent_nav_0_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 3)(1, "span", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", item_r1.url);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function BreadcrumbsComponent_nav_0_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1, "chevron_left");
    \u0275\u0275elementEnd();
  }
}
function BreadcrumbsComponent_nav_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, BreadcrumbsComponent_nav_0_For_2_Conditional_0_Template, 5, 2, "span", 2)(1, BreadcrumbsComponent_nav_0_For_2_Conditional_1_Template, 5, 3, "a", 3);
    \u0275\u0275conditionalCreate(2, BreadcrumbsComponent_nav_0_For_2_Conditional_2_Template, 2, 0, "span", 4);
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const \u0275$index_5_r2 = ctx.$index;
    const \u0275$count_5_r3 = ctx.$count;
    \u0275\u0275conditional(item_r1.isActive ? 0 : 1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!(\u0275$index_5_r2 === \u0275$count_5_r3 - 1) ? 2 : -1);
  }
}
function BreadcrumbsComponent_nav_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 1);
    \u0275\u0275repeaterCreate(1, BreadcrumbsComponent_nav_0_For_2_Template, 3, 2, null, null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.items);
  }
}
var BreadcrumbsComponent = class _BreadcrumbsComponent {
  router = inject(Router);
  biz = inject(BusinessService);
  items = [];
  sub;
  routeMap = {
    "": { label: "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645", icon: "dashboard" },
    "stations": { label: "\u0627\u0644\u0645\u062D\u0637\u0627\u062A", icon: "bolt" },
    "accounts": { label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629", icon: "account_balance" },
    "account-sub-natures": { label: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0641\u0631\u0639\u064A\u0629", icon: "label" },
    "employees": { label: "\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646", icon: "people" },
    "funds": { label: "\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642", icon: "savings" },
    "vouchers": { label: "\u0627\u0644\u0633\u0646\u062F\u0627\u062A", icon: "receipt_long" },
    "register-operation": { label: "\u062A\u0633\u062C\u064A\u0644 \u0639\u0645\u0644\u064A\u0629", icon: "play_circle" },
    "journal": { label: "\u0642\u064A\u0648\u062F \u0627\u0644\u064A\u0648\u0645\u064A\u0629", icon: "menu_book" },
    "operation-types": { label: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A", icon: "category" },
    "collections": { label: "\u0627\u0644\u062A\u062D\u0635\u064A\u0644", icon: "point_of_sale" },
    "billing-systems": { label: "\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629", icon: "receipt" },
    "sidebar-settings": { label: "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0642\u0627\u0626\u0645\u0629", icon: "tune" },
    "summary": { label: "\u0645\u0644\u062E\u0635 \u0627\u0644\u0623\u0639\u0645\u0627\u0644", icon: "summarize" },
    "reports": { label: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631", icon: "assessment" },
    "reports-advanced": { label: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629", icon: "analytics" },
    "banks": { label: "\u0627\u0644\u0628\u0646\u0648\u0643", icon: "account_balance" },
    "exchangers": { label: "\u0627\u0644\u0635\u0631\u0627\u0641\u064A\u0646", icon: "currency_exchange" },
    "wallets": { label: "\u0627\u0644\u0645\u062D\u0627\u0641\u0638 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629", icon: "account_balance_wallet" },
    "partners": { label: "\u0627\u0644\u0634\u0631\u0643\u0627\u0621", icon: "handshake" },
    "warehouse": { label: "\u0627\u0644\u0645\u062E\u0627\u0632\u0646", icon: "warehouse" },
    "warehouse-operations": { label: "\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0646\u064A\u0629", icon: "inventory" },
    "suppliers": { label: "\u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646", icon: "local_shipping" },
    "settlements": { label: "\u0627\u0644\u062A\u0635\u0641\u064A\u0627\u062A", icon: "gavel" },
    "pending": { label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629", icon: "pending_actions" },
    "custom-screens": { label: "\u0627\u0644\u0634\u0627\u0634\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629", icon: "dashboard_customize" },
    "ui-builder": { label: "\u0628\u0646\u0627\u0621 \u0627\u0644\u0648\u0627\u062C\u0647\u0627\u062A", icon: "widgets" },
    "exchange-rates": { label: "\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0635\u0631\u0641", icon: "trending_up" },
    "roles": { label: "\u0627\u0644\u0623\u062F\u0648\u0627\u0631 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A", icon: "admin_panel_settings" },
    "journal-categories": { label: "\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0642\u064A\u0648\u062F", icon: "label" },
    "expense-categories": { label: "\u062A\u0635\u0646\u064A\u0641\u0627\u062A \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A", icon: "category" },
    "expense-budget": { label: "\u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A", icon: "account_balance_wallet" },
    "salaries": { label: "\u0627\u0644\u0631\u0648\u0627\u062A\u0628", icon: "payments" }
  };
  constructor() {
    this.sub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => this.buildBreadcrumbs());
    this.buildBreadcrumbs();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  buildBreadcrumbs() {
    const url = this.router.url;
    const parts = url.split("/").filter(Boolean);
    this.items = [];
    if (parts[0] === "biz" && parts[1]) {
      const bizId = parts[1];
      const bizName = this.biz.currentBusinessName() || "\u0627\u0644\u0639\u0645\u0644";
      const bizIcon = this.biz.currentBusinessIcon() || "business";
      this.items.push({
        label: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
        icon: "home",
        url: "/businesses",
        isActive: false
      });
      this.items.push({
        label: bizName,
        icon: bizIcon,
        url: `/biz/${bizId}`,
        isActive: parts.length <= 2
      });
      if (parts.length > 2) {
        const pageKey = parts[2];
        const pageInfo = this.routeMap[pageKey] || { label: pageKey, icon: "article" };
        this.items.push({
          label: pageInfo.label,
          icon: pageInfo.icon,
          url: `/biz/${bizId}/${pageKey}`,
          isActive: true
        });
      }
    }
  }
  static \u0275fac = function BreadcrumbsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BreadcrumbsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BreadcrumbsComponent, selectors: [["app-breadcrumbs"]], decls: 1, vars: 1, consts: [["class", "breadcrumbs", 4, "ngIf"], [1, "breadcrumbs"], [1, "bc-item", "active"], [1, "bc-item", 3, "routerLink"], [1, "material-icons-round", "bc-separator"], [1, "material-icons-round", "bc-icon"], [1, "bc-label"]], template: function BreadcrumbsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, BreadcrumbsComponent_nav_0_Template, 3, 0, "nav", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.items.length > 0);
    }
  }, dependencies: [CommonModule, NgIf, RouterLink], styles: ["\n\n.breadcrumbs[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 8px 16px;\n  margin-bottom: 8px;\n  direction: rtl;\n  flex-wrap: wrap;\n}\n.bc-item[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n  text-decoration: none;\n  transition: all 0.2s;\n  color: var(--text-muted, #94a3b8);\n}\n.bc-item[_ngcontent-%COMP%]:not(.active):hover {\n  background: rgba(16, 185, 129, 0.08);\n  color: #10b981;\n}\n.bc-item.active[_ngcontent-%COMP%] {\n  color: var(--text-primary, #1e293b);\n  background: rgba(16, 185, 129, 0.06);\n  font-weight: 800;\n}\n.bc-icon[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.bc-separator[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-muted, #cbd5e1);\n}\n/*# sourceMappingURL=breadcrumbs.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbsComponent, [{
    type: Component,
    args: [{ selector: "app-breadcrumbs", standalone: true, imports: [CommonModule, RouterLink], template: `
    <nav class="breadcrumbs" *ngIf="items.length > 0">
      @for (item of items; track item.url; let last = $last) {
        @if (item.isActive) {
          <span class="bc-item active">
            <span class="material-icons-round bc-icon">{{ item.icon }}</span>
            <span class="bc-label">{{ item.label }}</span>
          </span>
        } @else {
          <a class="bc-item" [routerLink]="item.url">
            <span class="material-icons-round bc-icon">{{ item.icon }}</span>
            <span class="bc-label">{{ item.label }}</span>
          </a>
        }
        @if (!last) {
          <span class="material-icons-round bc-separator">chevron_left</span>
        }
      }
    </nav>
  `, styles: ["/* angular:styles/component:scss;faf2ccd72d6280596e0cb9087e2554d166007dc2c45d394f5218378dc345b443;F:/Hhhhh/hesabati/frontend/src/app/components/breadcrumbs/breadcrumbs.ts */\n.breadcrumbs {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 8px 16px;\n  margin-bottom: 8px;\n  direction: rtl;\n  flex-wrap: wrap;\n}\n.bc-item {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n  text-decoration: none;\n  transition: all 0.2s;\n  color: var(--text-muted, #94a3b8);\n}\n.bc-item:not(.active):hover {\n  background: rgba(16, 185, 129, 0.08);\n  color: #10b981;\n}\n.bc-item.active {\n  color: var(--text-primary, #1e293b);\n  background: rgba(16, 185, 129, 0.06);\n  font-weight: 800;\n}\n.bc-icon {\n  font-size: 15px;\n}\n.bc-separator {\n  font-size: 14px;\n  color: var(--text-muted, #cbd5e1);\n}\n/*# sourceMappingURL=breadcrumbs.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BreadcrumbsComponent, { className: "BreadcrumbsComponent", filePath: "src/app/components/breadcrumbs/breadcrumbs.ts", lineNumber: 76 });
})();

// src/app/pages/business-layout/business-layout.ts
var BusinessLayoutComponent = class _BusinessLayoutComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  bizService = inject(BusinessService);
  api = inject(ApiService);
  constructor() {
    const bizId = Number.parseInt(this.route.snapshot.params["bizId"] ?? "", 10);
    if (bizId > 0)
      this.bizService.setBusinessId(bizId);
  }
  ngOnInit() {
    const setFromParams = (params) => {
      const bizId = Number.parseInt(params["bizId"] ?? "", 10);
      if (!bizId)
        return;
      this.bizService.setBusinessId(bizId);
      this.api.getBusiness(bizId).then((biz) => {
        const bizType = biz.type || "stations";
        this.bizService.setBusiness(biz.id, biz.name, biz.color, biz.icon, bizType);
      }, () => this.router.navigate(["/"]));
    };
    setFromParams(this.route.snapshot.params);
    this.route.params.subscribe(setFromParams);
  }
  static \u0275fac = function BusinessLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BusinessLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BusinessLayoutComponent, selectors: [["app-business-layout"]], decls: 7, vars: 0, consts: [[1, "app-layout"], [1, "main-area"], [1, "content-area"]], template: function BusinessLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-sidebar");
      \u0275\u0275elementStart(2, "div", 1);
      \u0275\u0275element(3, "app-header");
      \u0275\u0275elementStart(4, "main", 2);
      \u0275\u0275element(5, "app-breadcrumbs")(6, "router-outlet");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, BreadcrumbsComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100vh;\n  overflow: hidden;\n}\n.app-layout[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  direction: rtl;\n  overflow: hidden;\n}\n.main-area[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n}\n.content-area[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 24px;\n  padding-top: 8px;\n  overflow-y: auto;\n  height: 100%;\n}\n/*# sourceMappingURL=business-layout.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BusinessLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-business-layout", standalone: true, imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, BreadcrumbsComponent], template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>
      <div class="main-area">
        <app-header></app-header>
        <main class="content-area">
          <app-breadcrumbs></app-breadcrumbs>
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;f80c24ebbd11f02e88f0f842635be04b2f6cda87196d128fece4e31b20ff1a19;F:/Hhhhh/hesabati/frontend/src/app/pages/business-layout/business-layout.ts */\n:host {\n  display: block;\n  height: 100vh;\n  overflow: hidden;\n}\n.app-layout {\n  display: flex;\n  height: 100vh;\n  direction: rtl;\n  overflow: hidden;\n}\n.main-area {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  overflow: hidden;\n}\n.content-area {\n  flex: 1;\n  padding: 24px;\n  padding-top: 8px;\n  overflow-y: auto;\n  height: 100%;\n}\n/*# sourceMappingURL=business-layout.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BusinessLayoutComponent, { className: "BusinessLayoutComponent", filePath: "src/app/pages/business-layout/business-layout.ts", lineNumber: 54 });
})();
export {
  BusinessLayoutComponent
};
//# sourceMappingURL=chunk-AM2FADMD.js.map
