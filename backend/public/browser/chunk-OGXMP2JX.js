import {
  formatAmount,
  formatDate
} from "./chunk-RCZO5KY5.js";
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
  FormsModule
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
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵcomponentInstance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-VUZEB5JS.js";

// src/app/pages/collections/collections.ts
var _forTrack0 = ($index, $item) => $item.id;
function CollectionsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 19);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_15_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.error.set(""));
    });
    \u0275\u0275domElementStart(1, "span", 4);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementStart(4, "span", 20);
    \u0275\u0275text(5, "\u2715");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
function CollectionsComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 16);
    \u0275\u0275domElement(1, "div", 21);
    \u0275\u0275domElementStart(2, "p");
    \u0275\u0275text(3, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275domElementEnd()();
  }
}
function CollectionsComponent_Conditional_42_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 22)(1, "div", 25)(2, "span", 4);
    \u0275\u0275text(3, "category");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "h3");
    \u0275\u0275text(5, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u0639\u0645\u0644\u064A\u0627\u062A \u0644\u0644\u062A\u062D\u0635\u064A\u0644");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, '\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A" \u0648\u0623\u0646\u0634\u0626 \u0646\u0648\u0639\u0627\u064B \u0645\u0646 \u0641\u0626\u0629 "\u062A\u062D\u0635\u064A\u0644" \u0644\u062A\u0638\u0647\u0631 \u0647\u0646\u0627');
    \u0275\u0275domElementEnd()();
  }
}
function CollectionsComponent_Conditional_42_Conditional_2_For_7_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ot_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ot_r4.description);
  }
}
function CollectionsComponent_Conditional_42_Conditional_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 29);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_42_Conditional_2_For_7_Template_button_click_0_listener() {
      const ot_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectCollectionOT(ot_r4));
    });
    \u0275\u0275domElementStart(1, "div", 30)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "div", 31)(5, "div", 32);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(7, CollectionsComponent_Conditional_42_Conditional_2_For_7_Conditional_7_Template, 2, 1, "div", 33);
    \u0275\u0275domElementStart(8, "div", 34)(9, "span", 4);
    \u0275\u0275text(10, "group");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(12, "span", 35);
    \u0275\u0275text(13, "arrow_back_ios");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ot_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ot_r4.icon || "call_received");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ot_r4.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ot_r4.description ? 7 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (ot_r4.linkedAccounts == null ? null : ot_r4.linkedAccounts.length) || 0, " \u062D\u0633\u0627\u0628 ");
  }
}
function CollectionsComponent_Conditional_42_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 23)(1, "h2", 26)(2, "span", 4);
    \u0275\u0275text(3, "category");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(4, " \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062A\u062D\u0635\u064A\u0644 ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 27);
    \u0275\u0275repeaterCreate(6, CollectionsComponent_Conditional_42_Conditional_2_For_7_Template, 14, 4, "button", 28, _forTrack0);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.collectionOpTypes());
  }
}
function CollectionsComponent_Conditional_42_Conditional_3_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 54)(1, "div", 55)(2, "div", 56)(3, "span", 4);
    \u0275\u0275text(4, "account_circle");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "div", 57)(8, "input", 58);
    \u0275\u0275domListener("input", function CollectionsComponent_Conditional_42_Conditional_3_For_32_Template_input_input_8_listener($event) {
      const \u0275$index_195_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateCollectionEntry(\u0275$index_195_r7, "amount", $event.target.value));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "span", 59);
    \u0275\u0275text(10, "\u0631.\u064A");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "input", 60);
    \u0275\u0275domListener("input", function CollectionsComponent_Conditional_42_Conditional_3_For_32_Template_input_input_11_listener($event) {
      const \u0275$index_195_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateCollectionEntry(\u0275$index_195_r7, "notes", $event.target.value));
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const entry_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("has-amount", ctx_r1.parseFloat(entry_r8.amount) > 0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(entry_r8.accountName);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("value", entry_r8.amount);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", entry_r8.notes);
  }
}
function CollectionsComponent_Conditional_42_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 24)(1, "div", 36)(2, "button", 37);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_42_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.selectedCollectionOT.set(null);
      return \u0275\u0275resetView(ctx_r1.collectionEntries.set([]));
    });
    \u0275\u0275domElementStart(3, "span", 4);
    \u0275\u0275text(4, "arrow_forward");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(5, "div", 38)(6, "div", 39)(7, "span", 4);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "div")(10, "h2");
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd()()()();
    \u0275\u0275domElementStart(14, "div", 40)(15, "div", 41)(16, "label", 42);
    \u0275\u0275text(17, "\u0627\u0644\u0628\u064A\u0627\u0646 \u0627\u0644\u0639\u0627\u0645 (\u064A\u0637\u0628\u0642 \u0639\u0644\u0649 \u0627\u0644\u0643\u0644)");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(18, "input", 43);
    \u0275\u0275domListener("input", function CollectionsComponent_Conditional_42_Conditional_3_Template_input_input_18_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.collectionDescription.set($event.target.value));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(19, "div", 41)(20, "label", 42);
    \u0275\u0275text(21, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "input", 44);
    \u0275\u0275domListener("change", function CollectionsComponent_Conditional_42_Conditional_3_Template_input_change_22_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.collectionDate.set($event.target.value));
    });
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(23, "div", 45)(24, "div", 46)(25, "span");
    \u0275\u0275text(26, "\u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(27, "span");
    \u0275\u0275text(28, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062D\u0635\u0651\u0644");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(29, "span");
    \u0275\u0275text(30, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275domElementEnd()();
    \u0275\u0275repeaterCreate(31, CollectionsComponent_Conditional_42_Conditional_3_For_32_Template, 12, 5, "div", 47, \u0275\u0275componentInstance().trackByIndex, true);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(33, "div", 48)(34, "div", 49)(35, "span", 50);
    \u0275\u0275text(36, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u062D\u0635\u064A\u0644:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(37, "span", 51);
    \u0275\u0275text(38);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(39, "span", 52);
    \u0275\u0275text(40, "\u0631.\u064A");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(41, "button", 53);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_42_Conditional_3_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveCollection());
    });
    \u0275\u0275domElementStart(42, "span", 4);
    \u0275\u0275text(43);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(44);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.selectedCollectionOT().icon || "call_received");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.selectedCollectionOT().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedCollectionOT().description || "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u064A\u0648\u0645\u064A");
    \u0275\u0275advance(5);
    \u0275\u0275domProperty("value", ctx_r1.collectionDescription());
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("value", ctx_r1.collectionDate());
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.collectionEntries());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(ctx_r1.collectionTotal()));
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("disabled", ctx_r1.saving() || ctx_r1.collectionTotal() === 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "sync" : "save");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0635\u064A\u0644", " ");
  }
}
function CollectionsComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 17);
    \u0275\u0275conditionalCreate(1, CollectionsComponent_Conditional_42_Conditional_1_Template, 8, 0, "div", 22);
    \u0275\u0275conditionalCreate(2, CollectionsComponent_Conditional_42_Conditional_2_Template, 8, 0, "div", 23);
    \u0275\u0275conditionalCreate(3, CollectionsComponent_Conditional_42_Conditional_3_Template, 45, 9, "div", 24);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.collectionOpTypes().length === 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.collectionOpTypes().length > 0 && !ctx_r1.selectedCollectionOT() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedCollectionOT() ? 3 : -1);
  }
}
function CollectionsComponent_Conditional_43_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 22)(1, "div", 61)(2, "span", 4);
    \u0275\u0275text(3, "category");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "h3");
    \u0275\u0275text(5, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u0639\u0645\u0644\u064A\u0627\u062A \u0644\u0644\u062A\u0648\u0631\u064A\u062F");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, '\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A" \u0648\u0623\u0646\u0634\u0626 \u0646\u0648\u0639\u0627\u064B \u0645\u0646 \u0641\u0626\u0629 "\u062A\u0648\u0631\u064A\u062F" \u0644\u062A\u0638\u0647\u0631 \u0647\u0646\u0627');
    \u0275\u0275domElementEnd()();
  }
}
function CollectionsComponent_Conditional_43_Conditional_2_For_7_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ot_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ot_r10.description);
  }
}
function CollectionsComponent_Conditional_43_Conditional_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 29);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_43_Conditional_2_For_7_Template_button_click_0_listener() {
      const ot_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectDeliveryOT(ot_r10));
    });
    \u0275\u0275domElementStart(1, "div", 62)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "div", 31)(5, "div", 32);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(7, CollectionsComponent_Conditional_43_Conditional_2_For_7_Conditional_7_Template, 2, 1, "div", 33);
    \u0275\u0275domElementStart(8, "div", 34)(9, "span", 4);
    \u0275\u0275text(10, "group");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(12, "span", 35);
    \u0275\u0275text(13, "arrow_back_ios");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ot_r10 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ot_r10.icon || "call_made");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ot_r10.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ot_r10.description ? 7 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (ot_r10.linkedAccounts == null ? null : ot_r10.linkedAccounts.length) || 0, " \u062D\u0633\u0627\u0628 ");
  }
}
function CollectionsComponent_Conditional_43_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 23)(1, "h2", 26)(2, "span", 4);
    \u0275\u0275text(3, "category");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(4, " \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062A\u0648\u0631\u064A\u062F ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 27);
    \u0275\u0275repeaterCreate(6, CollectionsComponent_Conditional_43_Conditional_2_For_7_Template, 14, 4, "button", 28, _forTrack0);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.deliveryOpTypes());
  }
}
function CollectionsComponent_Conditional_43_Conditional_3_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 69)(1, "div", 55)(2, "div", 70)(3, "span", 4);
    \u0275\u0275text(4, "account_balance");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "div", 57)(8, "input", 58);
    \u0275\u0275domListener("input", function CollectionsComponent_Conditional_43_Conditional_3_For_34_Template_input_input_8_listener($event) {
      const \u0275$index_347_r13 = \u0275\u0275restoreView(_r12).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateDeliveryEntry(\u0275$index_347_r13, "amount", $event.target.value));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "span", 59);
    \u0275\u0275text(10, "\u0631.\u064A");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "input", 71);
    \u0275\u0275domListener("input", function CollectionsComponent_Conditional_43_Conditional_3_For_34_Template_input_input_11_listener($event) {
      const \u0275$index_347_r13 = \u0275\u0275restoreView(_r12).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateDeliveryEntry(\u0275$index_347_r13, "reference", $event.target.value));
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "input", 60);
    \u0275\u0275domListener("input", function CollectionsComponent_Conditional_43_Conditional_3_For_34_Template_input_input_12_listener($event) {
      const \u0275$index_347_r13 = \u0275\u0275restoreView(_r12).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateDeliveryEntry(\u0275$index_347_r13, "notes", $event.target.value));
    });
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const entry_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("has-amount", ctx_r1.parseFloat(entry_r14.amount) > 0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(entry_r14.accountName);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("value", entry_r14.amount);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("value", entry_r14.reference);
    \u0275\u0275advance();
    \u0275\u0275domProperty("value", entry_r14.notes);
  }
}
function CollectionsComponent_Conditional_43_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 24)(1, "div", 36)(2, "button", 37);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_43_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.selectedDeliveryOT.set(null);
      return \u0275\u0275resetView(ctx_r1.deliveryEntries.set([]));
    });
    \u0275\u0275domElementStart(3, "span", 4);
    \u0275\u0275text(4, "arrow_forward");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(5, "div", 38)(6, "div", 63)(7, "span", 4);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "div")(10, "h2");
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "p");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd()()()();
    \u0275\u0275domElementStart(14, "div", 40)(15, "div", 41)(16, "label", 42);
    \u0275\u0275text(17, "\u0627\u0644\u0628\u064A\u0627\u0646 \u0627\u0644\u0639\u0627\u0645");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(18, "input", 64);
    \u0275\u0275domListener("input", function CollectionsComponent_Conditional_43_Conditional_3_Template_input_input_18_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deliveryDescription.set($event.target.value));
    });
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(19, "div", 41)(20, "label", 42);
    \u0275\u0275text(21, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "input", 44);
    \u0275\u0275domListener("change", function CollectionsComponent_Conditional_43_Conditional_3_Template_input_change_22_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deliveryDate.set($event.target.value));
    });
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(23, "div", 45)(24, "div", 65)(25, "span");
    \u0275\u0275text(26, "\u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(27, "span");
    \u0275\u0275text(28, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(29, "span");
    \u0275\u0275text(30, "\u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(31, "span");
    \u0275\u0275text(32, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A");
    \u0275\u0275domElementEnd()();
    \u0275\u0275repeaterCreate(33, CollectionsComponent_Conditional_43_Conditional_3_For_34_Template, 13, 6, "div", 66, \u0275\u0275componentInstance().trackByIndex, true);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(35, "div", 48)(36, "div", 49)(37, "span", 50);
    \u0275\u0275text(38, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0648\u0631\u064A\u062F:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(39, "span", 67);
    \u0275\u0275text(40);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(41, "span", 52);
    \u0275\u0275text(42, "\u0631.\u064A");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(43, "button", 68);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_43_Conditional_3_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveDelivery());
    });
    \u0275\u0275domElementStart(44, "span", 4);
    \u0275\u0275text(45);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(46);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.selectedDeliveryOT().icon || "call_made");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.selectedDeliveryOT().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.selectedDeliveryOT().description || "\u062A\u0648\u0631\u064A\u062F \u0627\u0644\u0623\u0645\u0648\u0627\u0644");
    \u0275\u0275advance(5);
    \u0275\u0275domProperty("value", ctx_r1.deliveryDescription());
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("value", ctx_r1.deliveryDate());
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.deliveryEntries());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.formatAmount(ctx_r1.deliveryTotal()));
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("disabled", ctx_r1.saving() || ctx_r1.deliveryTotal() === 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.saving() ? "sync" : "save");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638 \u0627\u0644\u062A\u0648\u0631\u064A\u062F", " ");
  }
}
function CollectionsComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 17);
    \u0275\u0275conditionalCreate(1, CollectionsComponent_Conditional_43_Conditional_1_Template, 8, 0, "div", 22);
    \u0275\u0275conditionalCreate(2, CollectionsComponent_Conditional_43_Conditional_2_Template, 8, 0, "div", 23);
    \u0275\u0275conditionalCreate(3, CollectionsComponent_Conditional_43_Conditional_3_Template, 47, 9, "div", 24);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.deliveryOpTypes().length === 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.deliveryOpTypes().length > 0 && !ctx_r1.selectedDeliveryOT() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedDeliveryOT() ? 3 : -1);
  }
}
function CollectionsComponent_Conditional_44_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 80)(1, "span", 4);
    \u0275\u0275text(2, "history");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0628\u0639\u062F");
    \u0275\u0275domElementEnd()();
  }
}
function CollectionsComponent_Conditional_44_Conditional_25_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 83)(1, "div", 84)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "div", 85)(5, "div", 86);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "div", 87);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "div", 88);
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const v_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("receipt-row", v_r15.voucherType === "receipt")("payment-row", v_r15.voucherType === "payment");
    \u0275\u0275advance();
    \u0275\u0275classProp("receipt-icon", v_r15.voucherType === "receipt")("payment-icon", v_r15.voucherType === "payment");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", v_r15.voucherType === "receipt" ? "call_received" : "call_made", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r15.description || "\u0628\u062F\u0648\u0646 \u0628\u064A\u0627\u0646");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(v_r15.voucherDate || v_r15.createdAt));
    \u0275\u0275advance();
    \u0275\u0275classProp("receipt-amount", v_r15.voucherType === "receipt")("payment-amount", v_r15.voucherType === "payment");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatAmount(v_r15.amount), " ");
  }
}
function CollectionsComponent_Conditional_44_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 81);
    \u0275\u0275repeaterCreate(1, CollectionsComponent_Conditional_44_Conditional_25_For_2_Template, 11, 16, "div", 82, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.vouchers());
  }
}
function CollectionsComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 17)(1, "div", 72)(2, "div", 73)(3, "div", 74)(4, "span", 4);
    \u0275\u0275text(5, "call_received");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "div", 75)(7, "div", 76);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "div", 77);
    \u0275\u0275text(10, "\u0639\u0645\u0644\u064A\u0627\u062A \u062A\u062D\u0635\u064A\u0644");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "div", 78);
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(13, "div", 79)(14, "div", 74)(15, "span", 4);
    \u0275\u0275text(16, "call_made");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(17, "div", 75)(18, "div", 76);
    \u0275\u0275text(19);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(20, "div", 77);
    \u0275\u0275text(21, "\u0639\u0645\u0644\u064A\u0627\u062A \u062A\u0648\u0631\u064A\u062F");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "div", 78);
    \u0275\u0275text(23);
    \u0275\u0275domElementEnd()()()();
    \u0275\u0275conditionalCreate(24, CollectionsComponent_Conditional_44_Conditional_24_Template, 5, 0, "div", 80)(25, CollectionsComponent_Conditional_44_Conditional_25_Template, 3, 0, "div", 81);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.historyStats().receiptCount);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.formatAmount(ctx_r1.historyStats().totalReceipts), " \u0631.\u064A");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.historyStats().paymentCount);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.formatAmount(ctx_r1.historyStats().totalPayments), " \u0631.\u064A");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.vouchers().length === 0 ? 24 : 25);
  }
}
function CollectionsComponent_Conditional_45_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 22)(1, "div", 25)(2, "span", 4);
    \u0275\u0275text(3, "savings");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "h3");
    \u0275\u0275text(5, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0646\u0627\u062F\u064A\u0642");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, "\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 \u0642\u0633\u0645 ");
    \u0275\u0275domElementStart(8, "strong");
    \u0275\u0275text(9, "\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(10, " \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0627\u062F\u064A\u0642");
    \u0275\u0275domElementEnd()();
  }
}
function CollectionsComponent_Conditional_45_Conditional_2_For_2_Conditional_17_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 103);
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0631\u0643\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0628\u0639\u062F");
    \u0275\u0275domElementEnd();
  }
}
function CollectionsComponent_Conditional_45_Conditional_2_For_2_Conditional_17_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 105)(1, "span", 106);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "span", 107);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "span", 108);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "span", 109);
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const v_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.getVoucherTypeColor(v_r18.voucherType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getVoucherTypeLabel(v_r18.voucherType), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((v_r18.description || "\u0628\u062F\u0648\u0646 \u0628\u064A\u0627\u0646") + (v_r18.voucherNumber ? " \u2022 " + v_r18.voucherNumber : ""));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(v_r18.voucherDate || v_r18.createdAt));
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.getVoucherTypeColor(v_r18.voucherType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatAmount(v_r18.amount), " \u0631.\u064A ");
  }
}
function CollectionsComponent_Conditional_45_Conditional_2_For_2_Conditional_17_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 104);
    \u0275\u0275repeaterCreate(1, CollectionsComponent_Conditional_45_Conditional_2_For_2_Conditional_17_Conditional_6_For_2_Template, 9, 8, "div", 105, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const fund_r17 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getFundVouchers(fund_r17));
  }
}
function CollectionsComponent_Conditional_45_Conditional_2_For_2_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 101);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_45_Conditional_2_For_2_Conditional_17_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275domElementStart(1, "div", 102)(2, "span", 4);
    \u0275\u0275text(3, "history");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(4, " \u0627\u0644\u062D\u0631\u0643\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629 ");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(5, CollectionsComponent_Conditional_45_Conditional_2_For_2_Conditional_17_Conditional_5_Template, 2, 0, "div", 103)(6, CollectionsComponent_Conditional_45_Conditional_2_For_2_Conditional_17_Conditional_6_Template, 3, 0, "div", 104);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const fund_r17 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.getFundVouchers(fund_r17).length === 0 ? 5 : 6);
  }
}
function CollectionsComponent_Conditional_45_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 91);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_45_Conditional_2_For_2_Template_div_click_0_listener() {
      const fund_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectFund(fund_r17));
    });
    \u0275\u0275domElementStart(1, "div", 92)(2, "div", 93)(3, "span", 4);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(5, "div", 94)(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "span", 95);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "span", 96);
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(12, "div", 97)(13, "span", 98);
    \u0275\u0275text(14, "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u062D\u0627\u0644\u064A");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "span", 99);
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(17, CollectionsComponent_Conditional_45_Conditional_2_For_2_Conditional_17_Template, 7, 1, "div", 100);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    let tmp_18_0;
    let tmp_22_0;
    const fund_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ((tmp_12_0 = ctx_r1.selectedFund()) == null ? null : tmp_12_0.id) === fund_r17.id);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", ctx_r1.getFundTypeColor(fund_r17.fundType) + "20")("color", ctx_r1.getFundTypeColor(fund_r17.fundType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getFundTypeIcon(fund_r17.fundType));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(fund_r17.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getFundTypeLabel(fund_r17.fundType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ((tmp_18_0 = ctx_r1.selectedFund()) == null ? null : tmp_18_0.id) === fund_r17.id ? "expand_less" : "expand_more", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("positive", ctx_r1.getFundBalance(fund_r17) >= 0)("negative", ctx_r1.getFundBalance(fund_r17) < 0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r1.formatAmount(ctx_r1.getFundBalance(fund_r17)), " \u0631.\u064A");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_22_0 = ctx_r1.selectedFund()) == null ? null : tmp_22_0.id) === fund_r17.id ? 17 : -1);
  }
}
function CollectionsComponent_Conditional_45_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 89);
    \u0275\u0275repeaterCreate(1, CollectionsComponent_Conditional_45_Conditional_2_For_2_Template, 18, 16, "div", 90, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.funds());
  }
}
function CollectionsComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 17);
    \u0275\u0275conditionalCreate(1, CollectionsComponent_Conditional_45_Conditional_1_Template, 11, 0, "div", 22)(2, CollectionsComponent_Conditional_45_Conditional_2_Template, 3, 0, "div", 89);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.funds().length === 0 ? 1 : 2);
  }
}
function CollectionsComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 110);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_46_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showHowItWorks.set(false));
    });
    \u0275\u0275domElementStart(1, "div", 111);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_46_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275domElementStart(2, "div", 112)(3, "div", 113)(4, "span", 4);
    \u0275\u0275text(5, "help_outline");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "h2");
    \u0275\u0275text(7, "\u0645\u0628\u062F\u0623 \u0627\u0644\u0639\u0645\u0644 - \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0648\u0627\u0644\u062A\u0648\u0631\u064A\u062F");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "button", 114);
    \u0275\u0275domListener("click", function CollectionsComponent_Conditional_46_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showHowItWorks.set(false));
    });
    \u0275\u0275domElementStart(9, "span", 4);
    \u0275\u0275text(10, "close");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(11, "div", 115)(12, "div", 116)(13, "h3")(14, "span", 4);
    \u0275\u0275text(15, "category");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(16, " \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(17, "p");
    \u0275\u0275text(18, ' \u0642\u0628\u0644 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062D\u0635\u064A\u0644\u060C \u0644\u0627\u0632\u0645 \u062A\u0646\u0634\u0626 "\u0646\u0648\u0639 \u0639\u0645\u0644\u064A\u0629" \u0645\u0646 \u0641\u0626\u0629 "\u062A\u062D\u0635\u064A\u0644" \u0641\u064A \u0635\u0641\u062D\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A. \u0643\u0644 \u0646\u0648\u0639 \u0639\u0645\u0644\u064A\u0629 \u0641\u064A\u0647 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A (\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0623\u0646\u0638\u0645\u0629) \u0627\u0644\u0644\u064A \u062A\u062A\u062D\u0635\u0644 \u0645\u0646\u0647\u0627. ');
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(19, "div", 116)(20, "h3")(21, "span", 4);
    \u0275\u0275text(22, "call_received");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(23, " \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u064A\u0648\u0645\u064A");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(24, "p");
    \u0275\u0275text(25, " \u062A\u062E\u062A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u2192 \u062A\u0638\u0647\u0631 \u0644\u0643 \u0643\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u062C\u0627\u0647\u0632\u0629 \u0641\u064A \u062C\u062F\u0648\u0644 \u2192 \u062A\u0643\u062A\u0628 \u0627\u0644\u0628\u064A\u0627\u0646 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0644\u0644\u0643\u0644 \u2192 \u062A\u0639\u0628\u064A \u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0644\u0643\u0644 \u062D\u0633\u0627\u0628 \u2192 \u0627\u0644\u062E\u0627\u0646\u0629 \u0627\u0644\u0641\u0627\u0636\u064A\u0629 \u062A\u0639\u0646\u064A \u0645\u0627 \u062A\u062D\u0635\u0651\u0644 \u0634\u064A. ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(26, "div", 116)(27, "h3")(28, "span", 4);
    \u0275\u0275text(29, "call_made");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(30, " \u0627\u0644\u062A\u0648\u0631\u064A\u062F");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(31, "p");
    \u0275\u0275text(32, ' \u0628\u0639\u062F \u0627\u0644\u062A\u062D\u0635\u064A\u0644\u060C \u062A\u062E\u062A\u0627\u0631 \u0646\u0648\u0639 \u0639\u0645\u0644\u064A\u0629 "\u062A\u0648\u0631\u064A\u062F" \u2192 \u062A\u062D\u062F\u062F \u0648\u064A\u0646 \u0648\u0631\u062F\u062A \u0627\u0644\u0641\u0644\u0648\u0633 (\u0635\u0631\u0627\u0641\u060C \u0645\u062D\u0641\u0638\u0629\u060C \u0628\u0646\u0643) \u2192 \u062A\u0636\u064A\u0641 \u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0643\u0644 \u062A\u0648\u0631\u064A\u062F. ');
    \u0275\u0275domElementEnd()()()()();
  }
}
var CollectionsComponent = class _CollectionsComponent extends BasePageComponent {
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
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  success = signal("", ...ngDevMode ? [{ debugName: "success" }] : (
    /* istanbul ignore next */
    []
  ));
  // UI State
  showHowItWorks = signal(false, ...ngDevMode ? [{ debugName: "showHowItWorks" }] : (
    /* istanbul ignore next */
    []
  ));
  activeTab = signal("operations", ...ngDevMode ? [{ debugName: "activeTab" }] : (
    /* istanbul ignore next */
    []
  ));
  activeOpsTab = signal("collection", ...ngDevMode ? [{ debugName: "activeOpsTab" }] : (
    /* istanbul ignore next */
    []
  ));
  // activeView maps to both tabs - 'collection'/'delivery'/'history' go to operations, 'funds' goes to funds tab
  activeView = signal("collection", ...ngDevMode ? [{ debugName: "activeView" }] : (
    /* istanbul ignore next */
    []
  ));
  // Data
  operationTypes = signal([], ...ngDevMode ? [{ debugName: "operationTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  accounts = signal([], ...ngDevMode ? [{ debugName: "accounts" }] : (
    /* istanbul ignore next */
    []
  ));
  funds = signal([], ...ngDevMode ? [{ debugName: "funds" }] : (
    /* istanbul ignore next */
    []
  ));
  vouchers = signal([], ...ngDevMode ? [{ debugName: "vouchers" }] : (
    /* istanbul ignore next */
    []
  ));
  // Selected fund for details
  selectedFund = signal(null, ...ngDevMode ? [{ debugName: "selectedFund" }] : (
    /* istanbul ignore next */
    []
  ));
  // Collection form
  selectedCollectionOT = signal(null, ...ngDevMode ? [{ debugName: "selectedCollectionOT" }] : (
    /* istanbul ignore next */
    []
  ));
  collectionDate = signal((/* @__PURE__ */ new Date()).toISOString().split("T")[0], ...ngDevMode ? [{ debugName: "collectionDate" }] : (
    /* istanbul ignore next */
    []
  ));
  collectionDescription = signal("", ...ngDevMode ? [{ debugName: "collectionDescription" }] : (
    /* istanbul ignore next */
    []
  ));
  collectionEntries = signal([], ...ngDevMode ? [{ debugName: "collectionEntries" }] : (
    /* istanbul ignore next */
    []
  ));
  // Delivery form
  selectedDeliveryOT = signal(null, ...ngDevMode ? [{ debugName: "selectedDeliveryOT" }] : (
    /* istanbul ignore next */
    []
  ));
  deliveryDate = signal((/* @__PURE__ */ new Date()).toISOString().split("T")[0], ...ngDevMode ? [{ debugName: "deliveryDate" }] : (
    /* istanbul ignore next */
    []
  ));
  deliveryDescription = signal("", ...ngDevMode ? [{ debugName: "deliveryDescription" }] : (
    /* istanbul ignore next */
    []
  ));
  deliveryEntries = signal([], ...ngDevMode ? [{ debugName: "deliveryEntries" }] : (
    /* istanbul ignore next */
    []
  ));
  // Computed
  collectionOpTypes = computed(() => this.operationTypes().filter((ot) => ot.category === "collection" || ot.category === "\u062A\u062D\u0635\u064A\u0644"), ...ngDevMode ? [{ debugName: "collectionOpTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  deliveryOpTypes = computed(() => this.operationTypes().filter((ot) => ot.category === "delivery" || ot.category === "transfer" || ot.category === "\u062A\u0648\u0631\u064A\u062F" || ot.category === "\u062A\u062D\u0648\u064A\u0644\u0627\u062A"), ...ngDevMode ? [{ debugName: "deliveryOpTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  collectionTotal = computed(() => this.collectionEntries().reduce((s, e) => s + (Number.parseFloat(e.amount) || 0), 0), ...ngDevMode ? [{ debugName: "collectionTotal" }] : (
    /* istanbul ignore next */
    []
  ));
  deliveryTotal = computed(() => this.deliveryEntries().reduce((s, e) => s + (Number.parseFloat(e.amount) || 0), 0), ...ngDevMode ? [{ debugName: "deliveryTotal" }] : (
    /* istanbul ignore next */
    []
  ));
  historyStats = computed(() => {
    const all = this.vouchers();
    const receipts = all.filter((v) => v.voucherType === "receipt");
    const payments = all.filter((v) => v.voucherType === "payment");
    return {
      totalReceipts: receipts.reduce((s, v) => s + Number.parseFloat(v.amount || 0), 0),
      totalPayments: payments.reduce((s, v) => s + Number.parseFloat(v.amount || 0), 0),
      receiptCount: receipts.length,
      paymentCount: payments.length
    };
  }, ...ngDevMode ? [{ debugName: "historyStats" }] : (
    /* istanbul ignore next */
    []
  ));
  // Fund groups
  collectionFunds = computed(() => this.funds().filter((f) => f.fundType === "collection"), ...ngDevMode ? [{ debugName: "collectionFunds" }] : (
    /* istanbul ignore next */
    []
  ));
  advanceFunds = computed(() => this.funds().filter((f) => f.fundType === "salary_advance"), ...ngDevMode ? [{ debugName: "advanceFunds" }] : (
    /* istanbul ignore next */
    []
  ));
  custodyFunds = computed(() => this.funds().filter((f) => f.fundType === "custody"), ...ngDevMode ? [{ debugName: "custodyFunds" }] : (
    /* istanbul ignore next */
    []
  ));
  safeFunds = computed(() => this.funds().filter((f) => f.fundType === "safe"), ...ngDevMode ? [{ debugName: "safeFunds" }] : (
    /* istanbul ignore next */
    []
  ));
  otherFunds = computed(() => this.funds().filter((f) => !["collection", "salary_advance", "custody", "safe"].includes(f.fundType)), ...ngDevMode ? [{ debugName: "otherFunds" }] : (
    /* istanbul ignore next */
    []
  ));
  onBizIdChange(_bizId) {
    void this.loadAll();
  }
  async loadAll() {
    this.loading.set(true);
    try {
      const [ots, accs, fds, vcs] = await Promise.all([
        this.api.getOperationTypes(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
        this.api.getVouchers(this.bizId)
      ]);
      this.operationTypes.set(ots);
      this.accounts.set(accs);
      this.funds.set(fds);
      this.vouchers.set(vcs);
    } catch (e) {
      this.error.set("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    }
    this.loading.set(false);
  }
  // ===================== Collection =====================
  selectCollectionOT(ot) {
    this.selectedCollectionOT.set(ot);
    const entries = (ot.linkedAccounts || []).filter((la) => la.isActive !== false).map((la) => ({
      accountId: la.accountId || la.id,
      accountName: la.label || la.accountName || "",
      accountType: la.accountType || "",
      amount: "",
      notes: ""
    }));
    this.collectionEntries.set(entries);
  }
  updateCollectionEntry(index, field, value) {
    this.collectionEntries.update((entries) => {
      const updated = [...entries];
      updated[index] = __spreadProps(__spreadValues({}, updated[index]), { [field]: value });
      return updated;
    });
  }
  async saveCollection() {
    const entries = this.collectionEntries().filter((e) => Number.parseFloat(e.amount) > 0);
    if (!entries.length) {
      this.showError("\u0623\u062F\u062E\u0644 \u0645\u0628\u0644\u063A\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    const total = entries.reduce((s, e) => s + Number.parseFloat(e.amount), 0);
    const summaryLines = entries.map((e) => `\u2022 ${e.accountName}: ${Number.parseFloat(e.amount).toLocaleString("ar-SA")}`).join("\n");
    const confirmed = await this.toast.confirm({
      title: `\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u062D\u0635\u064A\u0644 - ${this.selectedCollectionOT()?.name || ""}`,
      message: `\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u0646\u062F \u0642\u0628\u0636 \u0648\u0627\u062D\u062F (\u0645\u062A\u0639\u062F\u062F) \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 ${entries.length} \u0633\u0637\u0648\u0631 \u0628\u0625\u062C\u0645\u0627\u0644\u064A ${total.toLocaleString("ar-SA")}:
${summaryLines}`,
      type: "info"
    });
    if (!confirmed)
      return;
    this.saving.set(true);
    this.error.set("");
    try {
      const result = await this.api.createVoucherMulti(this.bizId, {
        voucherType: "receipt",
        operationTypeId: this.selectedCollectionOT()?.id,
        currencyId: 1,
        description: this.collectionDescription() || `\u062A\u062D\u0635\u064A\u0644 - ${this.selectedCollectionOT()?.name || ""}`,
        voucherDate: this.collectionDate(),
        entries: entries.map((e) => ({
          accountId: e.accountId,
          amount: Number.parseFloat(e.amount),
          notes: e.notes || null
        }))
      });
      this.success.set(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u0646\u062F \u0642\u0628\u0636 \u0645\u062A\u0639\u062F\u062F \u0628\u0646\u062C\u0627\u062D - \u0625\u062C\u0645\u0627\u0644\u064A: ${total.toLocaleString("ar-SA")} (\u0631\u0642\u0645: ${result.voucherNumber || "\u2014"})`);
      setTimeout(() => this.success.set(""), 5e3);
      this.selectedCollectionOT.set(null);
      this.collectionEntries.set([]);
      this.collectionDescription.set("");
      this.activeOpsTab.set("history");
      await this.loadAll();
    } catch (e) {
      this.showError(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0641\u0638");
    }
    this.saving.set(false);
  }
  // ===================== Delivery =====================
  selectDeliveryOT(ot) {
    this.selectedDeliveryOT.set(ot);
    const entries = (ot.linkedAccounts || []).filter((la) => la.isActive !== false).map((la) => ({
      accountId: la.accountId || la.id,
      accountName: la.label || la.accountName || "",
      accountType: la.accountType || "",
      amount: "",
      reference: "",
      notes: ""
    }));
    this.deliveryEntries.set(entries);
  }
  updateDeliveryEntry(index, field, value) {
    this.deliveryEntries.update((entries) => {
      const updated = [...entries];
      updated[index] = __spreadProps(__spreadValues({}, updated[index]), { [field]: value });
      return updated;
    });
  }
  async saveDelivery() {
    const entries = this.deliveryEntries().filter((e) => Number.parseFloat(e.amount) > 0);
    if (!entries.length) {
      this.showError("\u0623\u062F\u062E\u0644 \u0645\u0628\u0644\u063A\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    const total = entries.reduce((s, e) => s + Number.parseFloat(e.amount), 0);
    const summaryLines = entries.map((e) => `\u2022 ${e.accountName}: ${Number.parseFloat(e.amount).toLocaleString("ar-SA")}`).join("\n");
    const confirmed = await this.toast.confirm({
      title: `\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u0648\u0631\u064A\u062F - ${this.selectedDeliveryOT()?.name || ""}`,
      message: `\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u0646\u062F \u0635\u0631\u0641 \u0648\u0627\u062D\u062F (\u0645\u062A\u0639\u062F\u062F) \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 ${entries.length} \u0633\u0637\u0648\u0631 \u0628\u0625\u062C\u0645\u0627\u0644\u064A ${total.toLocaleString("ar-SA")}:
${summaryLines}`,
      type: "danger"
    });
    if (!confirmed)
      return;
    this.saving.set(true);
    this.error.set("");
    try {
      const result = await this.api.createVoucherMulti(this.bizId, {
        voucherType: "payment",
        operationTypeId: this.selectedDeliveryOT()?.id,
        currencyId: 1,
        description: this.deliveryDescription() || `\u062A\u0648\u0631\u064A\u062F - ${this.selectedDeliveryOT()?.name || ""}`,
        voucherDate: this.deliveryDate(),
        entries: entries.map((e) => ({
          accountId: e.accountId,
          amount: Number.parseFloat(e.amount),
          reference: e.reference || null,
          notes: e.notes || null
        }))
      });
      this.success.set(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0633\u0646\u062F \u0635\u0631\u0641 \u0645\u062A\u0639\u062F\u062F \u0628\u0646\u062C\u0627\u062D - \u0625\u062C\u0645\u0627\u0644\u064A: ${total.toLocaleString("ar-SA")} (\u0631\u0642\u0645: ${result.voucherNumber || "\u2014"})`);
      setTimeout(() => this.success.set(""), 5e3);
      this.selectedDeliveryOT.set(null);
      this.deliveryEntries.set([]);
      this.deliveryDescription.set("");
      this.activeOpsTab.set("history");
      await this.loadAll();
    } catch (e) {
      this.showError(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0641\u0638");
    }
    this.saving.set(false);
  }
  // ===================== Funds =====================
  selectFund(fund) {
    if (this.selectedFund()?.id === fund.id) {
      this.selectedFund.set(null);
    } else {
      this.selectedFund.set(fund);
    }
  }
  getFundBalance(fund) {
    const all = this.vouchers();
    let balance = 0;
    for (const v of all) {
      if (v.toFundId === fund.id)
        balance += Number.parseFloat(v.amount || 0);
      if (v.fromFundId === fund.id)
        balance -= Number.parseFloat(v.amount || 0);
    }
    return balance;
  }
  getFundVouchers(fund) {
    return this.vouchers().filter((v) => v.fromFundId === fund.id || v.toFundId === fund.id).slice(0, 15);
  }
  getFundTypeLabel(t) {
    const m = {
      collection: "\u062A\u062D\u0635\u064A\u0644 \u0648\u062A\u0648\u0631\u064A\u062F",
      salary_advance: "\u0633\u0644\u0641 \u0645\u0648\u0638\u0641\u064A\u0646",
      custody: "\u0639\u0647\u062F\u0629",
      safe: "\u062E\u0632\u0646\u0629",
      expense: "\u062E\u0631\u062C",
      deposit: "\u062A\u0648\u0631\u064A\u062F\u0627\u062A"
    };
    return m[t] || t;
  }
  getFundTypeIcon(t) {
    const m = {
      collection: "receipt_long",
      salary_advance: "request_quote",
      custody: "lock",
      safe: "savings",
      expense: "shopping_cart",
      deposit: "move_to_inbox"
    };
    return m[t] || "inventory_2";
  }
  getFundTypeColor(t) {
    const m = {
      collection: "#3b82f6",
      salary_advance: "#f59e0b",
      custody: "#8b5cf6",
      safe: "#10b981",
      expense: "#ef4444",
      deposit: "#06b6d4"
    };
    return m[t] || "#64748b";
  }
  getVoucherTypeLabel(t) {
    const m = {
      receipt: "\u0642\u0628\u0636",
      payment: "\u0635\u0631\u0641",
      transfer: "\u062A\u062D\u0648\u064A\u0644",
      journal: "\u0642\u064A\u062F"
    };
    return m[t] || t;
  }
  getVoucherTypeColor(t) {
    return t === "receipt" ? "#10b981" : t === "payment" ? "#ef4444" : "#f59e0b";
  }
  getRecentVouchers() {
    return this.vouchers().filter((v) => v.voucherType === "receipt" || v.voucherType === "payment").slice(0, 20);
  }
  // ===================== Helpers =====================
  showError(msg) {
    this.error.set(msg);
    setTimeout(() => this.error.set(""), 4e3);
  }
  formatAmount(amount) {
    return formatAmount(amount);
  }
  formatDate(d) {
    return formatDate(d || "");
  }
  parseFloat(v) {
    return Number.parseFloat(v) || 0;
  }
  trackById(_, item) {
    return item.id;
  }
  trackByIndex(i) {
    return i;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275CollectionsComponent_BaseFactory;
    return function CollectionsComponent_Factory(__ngFactoryType__) {
      return (\u0275CollectionsComponent_BaseFactory || (\u0275CollectionsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_CollectionsComponent)))(__ngFactoryType__ || _CollectionsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CollectionsComponent, selectors: [["app-collections"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 47, vars: 15, consts: [[1, "page-container"], [1, "page-header"], [1, "header-left"], [1, "page-icon-3d", "teal"], [1, "material-icons-round"], [1, "page-title"], [1, "page-subtitle"], [1, "header-right"], ["title", "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F", 1, "help-btn", 3, "click"], [1, "alert-error"], [1, "view-tabs"], [1, "view-tab", 3, "click"], [1, "vt-icon", "collection-icon"], [1, "vt-icon", "delivery-icon"], [1, "vt-icon", "history-icon"], [1, "vt-icon", "funds-icon"], [1, "loading-center"], [1, "view-section"], [1, "modal-overlay"], [1, "alert-error", 3, "click"], [1, "close-x"], [1, "loading-spinner"], [1, "no-op-types-card"], [1, "select-ot-section"], [1, "collection-form-section"], [1, "noopt-icon"], [1, "section-title"], [1, "ot-cards-grid"], [1, "ot-card-3d"], [1, "ot-card-3d", 3, "click"], [1, "ot-card-icon", "collection"], [1, "ot-card-body"], [1, "ot-card-name"], [1, "ot-card-desc"], [1, "ot-card-count"], [1, "material-icons-round", "ot-arrow"], [1, "cf-header"], [1, "back-btn", 3, "click"], [1, "cf-title-wrap"], [1, "cf-icon", "collection"], [1, "global-fields"], [1, "form-group"], [1, "form-label"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u062A\u062D\u0635\u064A\u0644 \u064A\u0648\u0645 27 \u0641\u0628\u0631\u0627\u064A\u0631...", 1, "form-input", 3, "input", "value"], ["type", "date", 1, "form-input", 3, "change", "value"], [1, "entries-table-wrap"], [1, "entries-table-header"], [1, "entry-row", 3, "has-amount"], [1, "cf-footer"], [1, "total-display"], [1, "total-label"], [1, "total-amount", "collection-color"], [1, "total-currency"], [1, "btn-3d", "btn-collection", 3, "click", "disabled"], [1, "entry-row"], [1, "entry-account"], [1, "entry-account-icon"], [1, "entry-amount-wrap"], ["type", "number", "placeholder", "0", 1, "entry-amount-input", 3, "input", "value"], [1, "entry-currency"], ["type", "text", "placeholder", "\u0645\u0644\u0627\u062D\u0638\u0629...", 1, "entry-notes-input", 3, "input", "value"], [1, "noopt-icon", "delivery"], [1, "ot-card-icon", "delivery"], [1, "cf-icon", "delivery"], ["type", "text", "placeholder", "\u0645\u062B\u0627\u0644: \u062A\u0648\u0631\u064A\u062F \u064A\u0648\u0645 27 \u0641\u0628\u0631\u0627\u064A\u0631...", 1, "form-input", 3, "input", "value"], [1, "entries-table-header", "delivery-header"], [1, "entry-row", "delivery-row", 3, "has-amount"], [1, "total-amount", "delivery-color"], [1, "btn-3d", "btn-delivery", 3, "click", "disabled"], [1, "entry-row", "delivery-row"], [1, "entry-account-icon", "delivery"], ["type", "text", "placeholder", "\u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631...", 1, "entry-ref-input", 3, "input", "value"], [1, "history-stats"], [1, "hs-card", "collection"], [1, "hs-icon"], [1, "hs-body"], [1, "hs-num"], [1, "hs-label"], [1, "hs-amount"], [1, "hs-card", "delivery"], [1, "empty-history"], [1, "history-list"], [1, "history-row", 3, "receipt-row", "payment-row"], [1, "history-row"], [1, "hr-icon"], [1, "hr-main"], [1, "hr-desc"], [1, "hr-date"], [1, "hr-amount"], [1, "funds-summary"], [1, "fund-summary-card", 3, "selected"], [1, "fund-summary-card", 3, "click"], [1, "fsc-header"], [1, "fsc-icon"], [1, "fsc-info"], [1, "fsc-type"], [1, "material-icons-round", "fsc-expand"], [1, "fsc-balance"], [1, "fsc-balance-label"], [1, "fsc-balance-value"], [1, "fund-transactions"], [1, "fund-transactions", 3, "click"], [1, "ft-header"], [1, "ft-empty"], [1, "ft-list"], [1, "ft-row"], [1, "ft-type"], [1, "ft-desc"], [1, "ft-date"], [1, "ft-amount"], [1, "modal-overlay", 3, "click"], [1, "modal-3d", "hiw-modal", 3, "click"], [1, "modal-header"], [1, "modal-icon", "amber"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "hiw-section"]], template: function CollectionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "account_balance_wallet");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(6, "div")(7, "h1", 5);
      \u0275\u0275text(8, "\u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0648\u0627\u0644\u062A\u0648\u0631\u064A\u062F \u0627\u0644\u064A\u0648\u0645\u064A");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "p", 6);
      \u0275\u0275text(10, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u064A\u0648\u0645\u064A \u0648\u062A\u0648\u0631\u064A\u062F \u0627\u0644\u0623\u0645\u0648\u0627\u0644");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(11, "div", 7)(12, "button", 8);
      \u0275\u0275domListener("click", function CollectionsComponent_Template_button_click_12_listener() {
        return ctx.showHowItWorks.set(true);
      });
      \u0275\u0275domElementStart(13, "span", 4);
      \u0275\u0275text(14, "help_outline");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275conditionalCreate(15, CollectionsComponent_Conditional_15_Template, 6, 1, "div", 9);
      \u0275\u0275domElementStart(16, "div", 10)(17, "button", 11);
      \u0275\u0275domListener("click", function CollectionsComponent_Template_button_click_17_listener() {
        return ctx.activeView.set("collection");
      });
      \u0275\u0275domElementStart(18, "div", 12)(19, "span", 4);
      \u0275\u0275text(20, "call_received");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(21, "span");
      \u0275\u0275text(22, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062D\u0635\u064A\u0644");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(23, "button", 11);
      \u0275\u0275domListener("click", function CollectionsComponent_Template_button_click_23_listener() {
        return ctx.activeView.set("delivery");
      });
      \u0275\u0275domElementStart(24, "div", 13)(25, "span", 4);
      \u0275\u0275text(26, "call_made");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(27, "span");
      \u0275\u0275text(28, "\u062A\u0648\u0631\u064A\u062F \u0627\u0644\u0623\u0645\u0648\u0627\u0644");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(29, "button", 11);
      \u0275\u0275domListener("click", function CollectionsComponent_Template_button_click_29_listener() {
        return ctx.activeView.set("history");
      });
      \u0275\u0275domElementStart(30, "div", 14)(31, "span", 4);
      \u0275\u0275text(32, "history");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(33, "span");
      \u0275\u0275text(34, "\u0627\u0644\u0633\u062C\u0644");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(35, "button", 11);
      \u0275\u0275domListener("click", function CollectionsComponent_Template_button_click_35_listener() {
        return ctx.activeView.set("funds");
      });
      \u0275\u0275domElementStart(36, "div", 15)(37, "span", 4);
      \u0275\u0275text(38, "savings");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(39, "span");
      \u0275\u0275text(40, "\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275conditionalCreate(41, CollectionsComponent_Conditional_41_Template, 4, 0, "div", 16);
      \u0275\u0275conditionalCreate(42, CollectionsComponent_Conditional_42_Template, 4, 3, "div", 17);
      \u0275\u0275conditionalCreate(43, CollectionsComponent_Conditional_43_Template, 4, 3, "div", 17);
      \u0275\u0275conditionalCreate(44, CollectionsComponent_Conditional_44_Template, 26, 5, "div", 17);
      \u0275\u0275conditionalCreate(45, CollectionsComponent_Conditional_45_Template, 3, 1, "div", 17);
      \u0275\u0275conditionalCreate(46, CollectionsComponent_Conditional_46_Template, 33, 0, "div", 18);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275conditional(ctx.error() ? 15 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeView() === "collection");
      \u0275\u0275advance(6);
      \u0275\u0275classProp("active", ctx.activeView() === "delivery");
      \u0275\u0275advance(6);
      \u0275\u0275classProp("active", ctx.activeView() === "history");
      \u0275\u0275advance(6);
      \u0275\u0275classProp("active", ctx.activeView() === "funds");
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.loading() ? 41 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.activeView() === "collection" ? 42 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.activeView() === "delivery" ? 43 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.activeView() === "history" ? 44 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.activeView() === "funds" ? 45 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showHowItWorks() ? 46 : -1);
    }
  }, dependencies: [CommonModule, FormsModule], styles: ['\n\n.page-container[_ngcontent-%COMP%] {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(20, 184, 166, 0.06),\n      rgba(59, 130, 246, 0.04));\n  border-radius: 20px;\n  border: 1px solid rgba(20, 184, 166, 0.12);\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-icon-3d[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.page-icon-3d.teal[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #14b8a6,\n      #0ea5e9);\n}\n.page-icon-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: white;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 3px;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.help-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 11px;\n  border: 1.5px solid rgba(245, 158, 11, 0.3);\n  background: rgba(245, 158, 11, 0.08);\n  color: #f59e0b;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.help-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.help-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(245, 158, 11, 0.15);\n  transform: scale(1.08) rotate(15deg);\n}\n.alert-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\n.alert-error[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.alert-error[_ngcontent-%COMP%]   .close-x[_ngcontent-%COMP%] {\n  margin-right: auto;\n  opacity: 0.6;\n}\n.view-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n}\n.view-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 20px;\n  border-radius: 14px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  color: var(--text-secondary, #64748b);\n  transition: all 0.25s;\n  flex: 1;\n  min-width: 140px;\n  justify-content: center;\n}\n.view-tab.active[_ngcontent-%COMP%] {\n  border-color: transparent;\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);\n  transform: translateY(-2px);\n  color: white;\n}\n.view-tab[_ngcontent-%COMP%]:nth-child(1).active {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.view-tab[_ngcontent-%COMP%]:nth-child(2).active {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.view-tab[_ngcontent-%COMP%]:nth-child(3).active {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1,\n      #8b5cf6);\n}\n.view-tab[_ngcontent-%COMP%]:not(.active):hover {\n  border-color: #14b8a6;\n  color: #14b8a6;\n}\n.vt-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 9px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.vt-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: white;\n}\n.vt-icon.collection-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.vt-icon.delivery-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.vt-icon.history-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1,\n      #8b5cf6);\n}\n.view-tab.active[_ngcontent-%COMP%]   .vt-icon[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.25) !important;\n}\n.loading-center[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 60px;\n}\n.loading-center[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n  margin-top: 12px;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 3px solid var(--border-color, #e2e8f0);\n  border-top-color: #14b8a6;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.view-section[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.no-op-types-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 60px 20px;\n  text-align: center;\n  border-radius: 20px;\n  border: 2px dashed var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.no-op-types-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 14px 0 8px;\n}\n.no-op-types-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 20px;\n}\n.noopt-icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 18px;\n  background:\n    linear-gradient(\n      135deg,\n      #14b8a6,\n      #0ea5e9);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 10px 28px rgba(20, 184, 166, 0.3);\n}\n.noopt-icon.delivery[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.noopt-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: white;\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 16px;\n}\n.section-title[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #14b8a6;\n}\n.ot-cards-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.ot-card-3d[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  cursor: pointer;\n  transition: all 0.25s;\n  text-align: right;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n}\n.ot-card-3d[_ngcontent-%COMP%]:hover {\n  border-color: #14b8a6;\n  box-shadow: 0 8px 24px rgba(20, 184, 166, 0.15);\n  transform: translateX(-4px);\n}\n.ot-card-3d[_ngcontent-%COMP%]:hover   .ot-arrow[_ngcontent-%COMP%] {\n  transform: translateX(-4px);\n}\n.ot-card-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 13px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.ot-card-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.ot-card-icon.collection[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.ot-card-icon.delivery[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.ot-card-body[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.ot-card-name[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 3px;\n}\n.ot-card-desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.ot-card-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n}\n.ot-card-count[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.ot-arrow[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--text-muted, #94a3b8);\n  transition: transform 0.2s;\n}\n.collection-form-section[_ngcontent-%COMP%] {\n  background: var(--bg-card, white);\n  border-radius: 20px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);\n  overflow: hidden;\n}\n.cf-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 16px 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(20, 184, 166, 0.06),\n      rgba(59, 130, 246, 0.04));\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.back-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n.back-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--text-secondary, #64748b);\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface, #f8fafc);\n}\n.cf-title-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n}\n.cf-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.cf-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 21px;\n  color: white;\n}\n.cf-icon.collection[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.cf-icon.delivery[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.cf-title-wrap[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 2px;\n}\n.cf-title-wrap[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n  margin: 0;\n}\n.global-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: #14b8a6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);\n}\n.entries-table-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1.5fr 1fr;\n  padding: 10px 20px;\n  background: var(--bg-surface, #f8fafc);\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n  font-size: 11px;\n  font-weight: 800;\n  color: var(--text-muted, #94a3b8);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.entries-table-header.delivery-header[_ngcontent-%COMP%] {\n  grid-template-columns: 2fr 1.5fr 1fr 1fr;\n}\n.entry-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1.5fr 1fr;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 20px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n  transition: background 0.15s;\n}\n.entry-row.delivery-row[_ngcontent-%COMP%] {\n  grid-template-columns: 2fr 1.5fr 1fr 1fr;\n}\n.entry-row.has-amount[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.04);\n}\n.entry-row[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface, #f8fafc);\n}\n.entry-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.entry-account[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.entry-account-icon[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.entry-account-icon.delivery[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.entry-account-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: white;\n}\n.entry-amount-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  border-radius: 8px;\n  overflow: hidden;\n  background: var(--bg-card, white);\n}\n.entry-amount-wrap[_ngcontent-%COMP%]:focus-within {\n  border-color: #14b8a6;\n}\n.entry-amount-input[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 7px 10px;\n  border: none;\n  outline: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  background: transparent;\n  color: var(--text-primary, #1e293b);\n  min-width: 0;\n}\n.entry-currency[_ngcontent-%COMP%] {\n  padding: 7px 8px;\n  background: var(--bg-surface, #f8fafc);\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n  border-right: 1px solid var(--border-color, #e2e8f0);\n}\n.entry-notes-input[_ngcontent-%COMP%], \n.entry-ref-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 7px 10px;\n  border-radius: 8px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  font-size: 12px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n}\n.entry-notes-input[_ngcontent-%COMP%]:focus, \n.entry-ref-input[_ngcontent-%COMP%]:focus {\n  border-color: #14b8a6;\n  outline: none;\n}\n.cf-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  background: var(--bg-surface, #f8fafc);\n  border-top: 1px solid var(--border-color, #e2e8f0);\n}\n.total-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.total-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n}\n.total-amount[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 900;\n}\n.total-amount.collection-color[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.total-amount.delivery-color[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.total-currency[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n}\n.btn-3d[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 20px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.btn-3d.btn-collection[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  color: white;\n  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.35);\n}\n.btn-3d.btn-collection[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);\n}\n.btn-3d.btn-delivery[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n  color: white;\n  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);\n}\n.btn-3d.btn-delivery[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);\n}\n.btn-3d.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.btn-3d[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  transform: none !important;\n}\n.history-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 20px;\n}\n.hs-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  flex: 1;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.hs-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.hs-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.hs-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: white;\n}\n.hs-card.collection[_ngcontent-%COMP%]   .hs-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.hs-card.delivery[_ngcontent-%COMP%]   .hs-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.hs-num[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n}\n.hs-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.hs-amount[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n}\n.empty-history[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 60px;\n}\n.empty-history[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: var(--text-muted, #94a3b8);\n}\n.empty-history[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n  margin-top: 12px;\n}\n.history-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.history-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  transition: all 0.2s;\n}\n.history-row[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);\n}\n.history-row.receipt-row[_ngcontent-%COMP%] {\n  border-right: 3px solid #22c55e;\n}\n.history-row.payment-row[_ngcontent-%COMP%] {\n  border-right: 3px solid #ef4444;\n}\n.hr-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.hr-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: white;\n}\n.hr-icon.receipt-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.hr-icon.payment-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.hr-main[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.hr-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.hr-date[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n}\n.hr-amount[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 900;\n}\n.hr-amount.receipt-amount[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.hr-amount.payment-amount[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n.modal-3d[_ngcontent-%COMP%] {\n  background: var(--bg-card, white);\n  border-radius: 22px;\n  width: 100%;\n  max-width: 520px;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.18);\n  animation: _ngcontent-%COMP%_slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(40px) scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.hiw-modal[_ngcontent-%COMP%] {\n  max-width: 500px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 18px 22px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n  flex: 1;\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 21px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-close[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  border: none;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.modal-close[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 18px 22px;\n}\n.hiw-section[_ngcontent-%COMP%] {\n  padding: 14px 0;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.hiw-section[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.hiw-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 8px;\n}\n.hiw-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n  color: #f59e0b;\n}\n.hiw-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.9;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 14px;\n    align-items: flex-start;\n  }\n  .view-tabs[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .global-fields[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .entries-table-header[_ngcontent-%COMP%], \n   .entry-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 6px;\n  }\n  .history-stats[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.vt-icon.funds-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #059669);\n}\n.funds-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.fund-summary-card[_ngcontent-%COMP%] {\n  background: var(--surface, #fff);\n  border: 1.5px solid rgba(0, 0, 0, 0.07);\n  border-radius: 16px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.25s;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n}\n.fund-summary-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(16, 185, 129, 0.3);\n  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.1);\n  transform: translateY(-1px);\n}\n.fund-summary-card.selected[_ngcontent-%COMP%] {\n  border-color: rgba(16, 185, 129, 0.4);\n  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.15);\n}\n.fsc-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n}\n.fsc-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.fsc-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.fsc-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.fsc-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.fsc-info[_ngcontent-%COMP%]   .fsc-type[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 500;\n}\n.fsc-expand[_ngcontent-%COMP%] {\n  color: var(--text-secondary, #64748b);\n  font-size: 20px;\n}\n.fsc-balance[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 18px;\n  margin: 0 12px 12px;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.03);\n}\n.fsc-balance[_ngcontent-%COMP%]   .fsc-balance-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n}\n.fsc-balance[_ngcontent-%COMP%]   .fsc-balance-value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n}\n.fsc-balance.positive[_ngcontent-%COMP%]   .fsc-balance-value[_ngcontent-%COMP%] {\n  color: #10b981;\n}\n.fsc-balance.negative[_ngcontent-%COMP%]   .fsc-balance-value[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.fund-transactions[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  padding: 14px 18px;\n}\n.ft-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 12px;\n}\n.ft-header[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.ft-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 20px;\n  color: var(--text-secondary, #64748b);\n  font-size: 13px;\n  background: rgba(0, 0, 0, 0.02);\n  border-radius: 10px;\n}\n.ft-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.ft-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 60px 1fr auto auto;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 12px;\n  border-radius: 8px;\n  background: rgba(0, 0, 0, 0.02);\n}\n.ft-row[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.04);\n}\n.ft-type[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n}\n.ft-desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-primary, #1e293b);\n}\n.ft-date[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary, #64748b);\n  white-space: nowrap;\n}\n.ft-amount[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=collections.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollectionsComponent, [{
    type: Component,
    args: [{ selector: "app-collections", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-container">\r
\r
  <!-- ===== Page Header ===== -->\r
  <div class="page-header">\r
    <div class="header-left">\r
      <div class="page-icon-3d teal">\r
        <span class="material-icons-round">account_balance_wallet</span>\r
      </div>\r
      <div>\r
        <h1 class="page-title">\u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0648\u0627\u0644\u062A\u0648\u0631\u064A\u062F \u0627\u0644\u064A\u0648\u0645\u064A</h1>\r
        <p class="page-subtitle">\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u064A\u0648\u0645\u064A \u0648\u062A\u0648\u0631\u064A\u062F \u0627\u0644\u0623\u0645\u0648\u0627\u0644</p>\r
      </div>\r
    </div>\r
    <div class="header-right">\r
      <button class="help-btn" (click)="showHowItWorks.set(true)" title="\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F">\r
        <span class="material-icons-round">help_outline</span>\r
      </button>\r
    </div>\r
  </div>\r
\r
  <!-- ===== Error ===== -->\r
  @if (error()) {\r
    <div class="alert-error" (click)="error.set('')">\r
      <span class="material-icons-round">error_outline</span>\r
      {{ error() }}\r
      <span class="close-x">\u2715</span>\r
    </div>\r
  }\r
\r
  <!-- ===== View Tabs ===== -->\r
  <div class="view-tabs">\r
    <button class="view-tab" [class.active]="activeView() === 'collection'"\r
            (click)="activeView.set('collection')">\r
      <div class="vt-icon collection-icon">\r
        <span class="material-icons-round">call_received</span>\r
      </div>\r
      <span>\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062D\u0635\u064A\u0644</span>\r
    </button>\r
    <button class="view-tab" [class.active]="activeView() === 'delivery'"\r
            (click)="activeView.set('delivery')">\r
      <div class="vt-icon delivery-icon">\r
        <span class="material-icons-round">call_made</span>\r
      </div>\r
      <span>\u062A\u0648\u0631\u064A\u062F \u0627\u0644\u0623\u0645\u0648\u0627\u0644</span>\r
    </button>\r
    <button class="view-tab" [class.active]="activeView() === 'history'"\r
            (click)="activeView.set('history')">\r
      <div class="vt-icon history-icon">\r
        <span class="material-icons-round">history</span>\r
      </div>\r
      <span>\u0627\u0644\u0633\u062C\u0644</span>\r
    </button>\r
    <button class="view-tab" [class.active]="activeView() === 'funds'"\r
            (click)="activeView.set('funds')">\r
      <div class="vt-icon funds-icon">\r
        <span class="material-icons-round">savings</span>\r
      </div>\r
      <span>\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642</span>\r
    </button>\r
  </div>\r
\r
  <!-- ===== Loading ===== -->\r
  @if (loading()) {\r
    <div class="loading-center">\r
      <div class="loading-spinner"></div>\r
      <p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>\r
    </div>\r
  }\r
\r
  <!-- ============================= -->\r
  <!-- ===== COLLECTION VIEW ======= -->\r
  <!-- ============================= -->\r
  @if (!loading() && activeView() === 'collection') {\r
    <div class="view-section">\r
\r
      @if (collectionOpTypes().length === 0) {\r
        <div class="no-op-types-card">\r
          <div class="noopt-icon">\r
            <span class="material-icons-round">category</span>\r
          </div>\r
          <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u0639\u0645\u0644\u064A\u0627\u062A \u0644\u0644\u062A\u062D\u0635\u064A\u0644</h3>\r
          <p>\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A" \u0648\u0623\u0646\u0634\u0626 \u0646\u0648\u0639\u0627\u064B \u0645\u0646 \u0641\u0626\u0629 "\u062A\u062D\u0635\u064A\u0644" \u0644\u062A\u0638\u0647\u0631 \u0647\u0646\u0627</p>\r
        </div>\r
      }\r
\r
      @if (collectionOpTypes().length > 0 && !selectedCollectionOT()) {\r
        <div class="select-ot-section">\r
          <h2 class="section-title">\r
            <span class="material-icons-round">category</span>\r
            \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062A\u062D\u0635\u064A\u0644\r
          </h2>\r
          <div class="ot-cards-grid">\r
            @for (ot of collectionOpTypes(); track ot.id) {\r
              <button class="ot-card-3d" (click)="selectCollectionOT(ot)">\r
                <div class="ot-card-icon collection">\r
                  <span class="material-icons-round">{{ ot.icon || 'call_received' }}</span>\r
                </div>\r
                <div class="ot-card-body">\r
                  <div class="ot-card-name">{{ ot.name }}</div>\r
                  @if (ot.description) {\r
                    <div class="ot-card-desc">{{ ot.description }}</div>\r
                  }\r
                  <div class="ot-card-count">\r
                    <span class="material-icons-round">group</span>\r
                    {{ ot.linkedAccounts?.length || 0 }} \u062D\u0633\u0627\u0628\r
                  </div>\r
                </div>\r
                <span class="material-icons-round ot-arrow">arrow_back_ios</span>\r
              </button>\r
            }\r
          </div>\r
        </div>\r
      }\r
\r
      @if (selectedCollectionOT()) {\r
        <div class="collection-form-section">\r
          <div class="cf-header">\r
            <button class="back-btn" (click)="selectedCollectionOT.set(null); collectionEntries.set([])">\r
              <span class="material-icons-round">arrow_forward</span>\r
            </button>\r
            <div class="cf-title-wrap">\r
              <div class="cf-icon collection">\r
                <span class="material-icons-round">{{ selectedCollectionOT().icon || 'call_received' }}</span>\r
              </div>\r
              <div>\r
                <h2>{{ selectedCollectionOT().name }}</h2>\r
                <p>{{ selectedCollectionOT().description || '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u064A\u0648\u0645\u064A' }}</p>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="global-fields">\r
            <div class="form-group">\r
              <label class="form-label">\u0627\u0644\u0628\u064A\u0627\u0646 \u0627\u0644\u0639\u0627\u0645 (\u064A\u0637\u0628\u0642 \u0639\u0644\u0649 \u0627\u0644\u0643\u0644)</label>\r
              <input class="form-input" type="text" placeholder="\u0645\u062B\u0627\u0644: \u062A\u062D\u0635\u064A\u0644 \u064A\u0648\u0645 27 \u0641\u0628\u0631\u0627\u064A\u0631..."\r
                     [value]="collectionDescription()"\r
                     (input)="collectionDescription.set($any($event.target).value)">\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</label>\r
              <input class="form-input" type="date" [value]="collectionDate()"\r
                     (change)="collectionDate.set($any($event.target).value)">\r
            </div>\r
          </div>\r
\r
          <div class="entries-table-wrap">\r
            <div class="entries-table-header">\r
              <span>\u0627\u0644\u062D\u0633\u0627\u0628</span>\r
              <span>\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u062D\u0635\u0651\u0644</span>\r
              <span>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</span>\r
            </div>\r
            @for (entry of collectionEntries(); track trackByIndex($index); let i = $index) {\r
              <div class="entry-row" [class.has-amount]="parseFloat(entry.amount) > 0">\r
                <div class="entry-account">\r
                  <div class="entry-account-icon">\r
                    <span class="material-icons-round">account_circle</span>\r
                  </div>\r
                  <span>{{ entry.accountName }}</span>\r
                </div>\r
                <div class="entry-amount-wrap">\r
                  <input class="entry-amount-input" type="number" placeholder="0"\r
                         [value]="entry.amount"\r
                         (input)="updateCollectionEntry(i, 'amount', $any($event.target).value)">\r
                  <span class="entry-currency">\u0631.\u064A</span>\r
                </div>\r
                <input class="entry-notes-input" type="text" placeholder="\u0645\u0644\u0627\u062D\u0638\u0629..."\r
                       [value]="entry.notes"\r
                       (input)="updateCollectionEntry(i, 'notes', $any($event.target).value)">\r
              </div>\r
            }\r
          </div>\r
\r
          <div class="cf-footer">\r
            <div class="total-display">\r
              <span class="total-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u062D\u0635\u064A\u0644:</span>\r
              <span class="total-amount collection-color">{{ formatAmount(collectionTotal()) }}</span>\r
              <span class="total-currency">\u0631.\u064A</span>\r
            </div>\r
            <button class="btn-3d btn-collection" [disabled]="saving() || collectionTotal() === 0"\r
                    (click)="saveCollection()">\r
              <span class="material-icons-round">{{ saving() ? 'sync' : 'save' }}</span>\r
              {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : '\u062D\u0641\u0638 \u0627\u0644\u062A\u062D\u0635\u064A\u0644' }}\r
            </button>\r
          </div>\r
        </div>\r
      }\r
\r
    </div>\r
  }\r
\r
  <!-- ============================= -->\r
  <!-- ===== DELIVERY VIEW ========= -->\r
  <!-- ============================= -->\r
  @if (!loading() && activeView() === 'delivery') {\r
    <div class="view-section">\r
\r
      @if (deliveryOpTypes().length === 0) {\r
        <div class="no-op-types-card">\r
          <div class="noopt-icon delivery">\r
            <span class="material-icons-round">category</span>\r
          </div>\r
          <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0648\u0627\u0639 \u0639\u0645\u0644\u064A\u0627\u062A \u0644\u0644\u062A\u0648\u0631\u064A\u062F</h3>\r
          <p>\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A" \u0648\u0623\u0646\u0634\u0626 \u0646\u0648\u0639\u0627\u064B \u0645\u0646 \u0641\u0626\u0629 "\u062A\u0648\u0631\u064A\u062F" \u0644\u062A\u0638\u0647\u0631 \u0647\u0646\u0627</p>\r
        </div>\r
      }\r
\r
      @if (deliveryOpTypes().length > 0 && !selectedDeliveryOT()) {\r
        <div class="select-ot-section">\r
          <h2 class="section-title">\r
            <span class="material-icons-round">category</span>\r
            \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062A\u0648\u0631\u064A\u062F\r
          </h2>\r
          <div class="ot-cards-grid">\r
            @for (ot of deliveryOpTypes(); track ot.id) {\r
              <button class="ot-card-3d" (click)="selectDeliveryOT(ot)">\r
                <div class="ot-card-icon delivery">\r
                  <span class="material-icons-round">{{ ot.icon || 'call_made' }}</span>\r
                </div>\r
                <div class="ot-card-body">\r
                  <div class="ot-card-name">{{ ot.name }}</div>\r
                  @if (ot.description) {\r
                    <div class="ot-card-desc">{{ ot.description }}</div>\r
                  }\r
                  <div class="ot-card-count">\r
                    <span class="material-icons-round">group</span>\r
                    {{ ot.linkedAccounts?.length || 0 }} \u062D\u0633\u0627\u0628\r
                  </div>\r
                </div>\r
                <span class="material-icons-round ot-arrow">arrow_back_ios</span>\r
              </button>\r
            }\r
          </div>\r
        </div>\r
      }\r
\r
      @if (selectedDeliveryOT()) {\r
        <div class="collection-form-section">\r
          <div class="cf-header">\r
            <button class="back-btn" (click)="selectedDeliveryOT.set(null); deliveryEntries.set([])">\r
              <span class="material-icons-round">arrow_forward</span>\r
            </button>\r
            <div class="cf-title-wrap">\r
              <div class="cf-icon delivery">\r
                <span class="material-icons-round">{{ selectedDeliveryOT().icon || 'call_made' }}</span>\r
              </div>\r
              <div>\r
                <h2>{{ selectedDeliveryOT().name }}</h2>\r
                <p>{{ selectedDeliveryOT().description || '\u062A\u0648\u0631\u064A\u062F \u0627\u0644\u0623\u0645\u0648\u0627\u0644' }}</p>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="global-fields">\r
            <div class="form-group">\r
              <label class="form-label">\u0627\u0644\u0628\u064A\u0627\u0646 \u0627\u0644\u0639\u0627\u0645</label>\r
              <input class="form-input" type="text" placeholder="\u0645\u062B\u0627\u0644: \u062A\u0648\u0631\u064A\u062F \u064A\u0648\u0645 27 \u0641\u0628\u0631\u0627\u064A\u0631..."\r
                     [value]="deliveryDescription()"\r
                     (input)="deliveryDescription.set($any($event.target).value)">\r
            </div>\r
            <div class="form-group">\r
              <label class="form-label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</label>\r
              <input class="form-input" type="date" [value]="deliveryDate()"\r
                     (change)="deliveryDate.set($any($event.target).value)">\r
            </div>\r
          </div>\r
\r
          <div class="entries-table-wrap">\r
            <div class="entries-table-header delivery-header">\r
              <span>\u0627\u0644\u062D\u0633\u0627\u0628</span>\r
              <span>\u0627\u0644\u0645\u0628\u0644\u063A</span>\r
              <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631</span>\r
              <span>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</span>\r
            </div>\r
            @for (entry of deliveryEntries(); track trackByIndex($index); let i = $index) {\r
              <div class="entry-row delivery-row" [class.has-amount]="parseFloat(entry.amount) > 0">\r
                <div class="entry-account">\r
                  <div class="entry-account-icon delivery">\r
                    <span class="material-icons-round">account_balance</span>\r
                  </div>\r
                  <span>{{ entry.accountName }}</span>\r
                </div>\r
                <div class="entry-amount-wrap">\r
                  <input class="entry-amount-input" type="number" placeholder="0"\r
                         [value]="entry.amount"\r
                         (input)="updateDeliveryEntry(i, 'amount', $any($event.target).value)">\r
                  <span class="entry-currency">\u0631.\u064A</span>\r
                </div>\r
                <input class="entry-ref-input" type="text" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631..."\r
                       [value]="entry.reference"\r
                       (input)="updateDeliveryEntry(i, 'reference', $any($event.target).value)">\r
                <input class="entry-notes-input" type="text" placeholder="\u0645\u0644\u0627\u062D\u0638\u0629..."\r
                       [value]="entry.notes"\r
                       (input)="updateDeliveryEntry(i, 'notes', $any($event.target).value)">\r
              </div>\r
            }\r
          </div>\r
\r
          <div class="cf-footer">\r
            <div class="total-display">\r
              <span class="total-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0648\u0631\u064A\u062F:</span>\r
              <span class="total-amount delivery-color">{{ formatAmount(deliveryTotal()) }}</span>\r
              <span class="total-currency">\u0631.\u064A</span>\r
            </div>\r
            <button class="btn-3d btn-delivery" [disabled]="saving() || deliveryTotal() === 0"\r
                    (click)="saveDelivery()">\r
              <span class="material-icons-round">{{ saving() ? 'sync' : 'save' }}</span>\r
              {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : '\u062D\u0641\u0638 \u0627\u0644\u062A\u0648\u0631\u064A\u062F' }}\r
            </button>\r
          </div>\r
        </div>\r
      }\r
\r
    </div>\r
  }\r
\r
  <!-- ============================= -->\r
  <!-- ===== HISTORY VIEW ========== -->\r
  <!-- ============================= -->\r
  @if (!loading() && activeView() === 'history') {\r
    <div class="view-section">\r
\r
      <div class="history-stats">\r
        <div class="hs-card collection">\r
          <div class="hs-icon"><span class="material-icons-round">call_received</span></div>\r
          <div class="hs-body">\r
            <div class="hs-num">{{ historyStats().receiptCount }}</div>\r
            <div class="hs-label">\u0639\u0645\u0644\u064A\u0627\u062A \u062A\u062D\u0635\u064A\u0644</div>\r
            <div class="hs-amount">{{ formatAmount(historyStats().totalReceipts) }} \u0631.\u064A</div>\r
          </div>\r
        </div>\r
        <div class="hs-card delivery">\r
          <div class="hs-icon"><span class="material-icons-round">call_made</span></div>\r
          <div class="hs-body">\r
            <div class="hs-num">{{ historyStats().paymentCount }}</div>\r
            <div class="hs-label">\u0639\u0645\u0644\u064A\u0627\u062A \u062A\u0648\u0631\u064A\u062F</div>\r
            <div class="hs-amount">{{ formatAmount(historyStats().totalPayments) }} \u0631.\u064A</div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      @if (vouchers().length === 0) {\r
        <div class="empty-history">\r
          <span class="material-icons-round">history</span>\r
          <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0628\u0639\u062F</p>\r
        </div>\r
      } @else {\r
        <div class="history-list">\r
          @for (v of vouchers(); track v.id) {\r
            <div class="history-row" [class.receipt-row]="v.voucherType === 'receipt'"\r
                 [class.payment-row]="v.voucherType === 'payment'">\r
              <div class="hr-icon" [class.receipt-icon]="v.voucherType === 'receipt'"\r
                   [class.payment-icon]="v.voucherType === 'payment'">\r
                <span class="material-icons-round">\r
                  {{ v.voucherType === 'receipt' ? 'call_received' : 'call_made' }}\r
                </span>\r
              </div>\r
              <div class="hr-main">\r
                <div class="hr-desc">{{ v.description || '\u0628\u062F\u0648\u0646 \u0628\u064A\u0627\u0646' }}</div>\r
                <div class="hr-date">{{ formatDate(v.voucherDate || v.createdAt) }}</div>\r
              </div>\r
              <div class="hr-amount" [class.receipt-amount]="v.voucherType === 'receipt'"\r
                   [class.payment-amount]="v.voucherType === 'payment'">\r
                {{ formatAmount(v.amount) }}\r
              </div>\r
            </div>\r
          }\r
        </div>\r
      }\r
\r
    </div>\r
  }\r
\r
  <!-- ============================= -->\r
  <!-- ===== FUNDS VIEW ============ -->\r
  <!-- ============================= -->\r
  @if (!loading() && activeView() === 'funds') {\r
    <div class="view-section">\r
\r
      @if (funds().length === 0) {\r
        <div class="no-op-types-card">\r
          <div class="noopt-icon">\r
            <span class="material-icons-round">savings</span>\r
          </div>\r
          <h3>\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0646\u0627\u062F\u064A\u0642</h3>\r
          <p>\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 \u0642\u0633\u0645 <strong>\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642</strong> \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0627\u0646\u0628\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0635\u0646\u0627\u062F\u064A\u0642</p>\r
        </div>\r
      } @else {\r
\r
        <!-- Fund Summary Cards -->\r
        <div class="funds-summary">\r
          @for (fund of funds(); track fund.id) {\r
            <div class="fund-summary-card" [class.selected]="selectedFund()?.id === fund.id"\r
              (click)="selectFund(fund)">\r
              <div class="fsc-header">\r
                <div class="fsc-icon" [style.background]="getFundTypeColor(fund.fundType) + '20'"\r
                  [style.color]="getFundTypeColor(fund.fundType)">\r
                  <span class="material-icons-round">{{ getFundTypeIcon(fund.fundType) }}</span>\r
                </div>\r
                <div class="fsc-info">\r
                  <strong>{{ fund.name }}</strong>\r
                  <span class="fsc-type">{{ getFundTypeLabel(fund.fundType) }}</span>\r
                </div>\r
                <span class="material-icons-round fsc-expand">\r
                  {{ selectedFund()?.id === fund.id ? 'expand_less' : 'expand_more' }}\r
                </span>\r
              </div>\r
              <div class="fsc-balance" [class.positive]="getFundBalance(fund) >= 0"\r
                [class.negative]="getFundBalance(fund) < 0">\r
                <span class="fsc-balance-label">\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u062D\u0627\u0644\u064A</span>\r
                <span class="fsc-balance-value">{{ formatAmount(getFundBalance(fund)) }} \u0631.\u064A</span>\r
              </div>\r
\r
              @if (selectedFund()?.id === fund.id) {\r
                <div class="fund-transactions" (click)="$event.stopPropagation()">\r
                  <div class="ft-header">\r
                    <span class="material-icons-round">history</span>\r
                    \u0627\u0644\u062D\u0631\u0643\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629\r
                  </div>\r
                  @if (getFundVouchers(fund).length === 0) {\r
                    <div class="ft-empty">\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0631\u0643\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0628\u0639\u062F</div>\r
                  } @else {\r
                    <div class="ft-list">\r
                      @for (v of getFundVouchers(fund); track v.id) {\r
                        <div class="ft-row">\r
                          <span class="ft-type" [style.color]="getVoucherTypeColor(v.voucherType)">\r
                            {{ getVoucherTypeLabel(v.voucherType) }}\r
                          </span>\r
                          <span class="ft-desc">{{ (v.description || '\u0628\u062F\u0648\u0646 \u0628\u064A\u0627\u0646') + (v.voucherNumber ? ' \u2022 ' + v.voucherNumber : '') }}</span>\r
                          <span class="ft-date">{{ formatDate(v.voucherDate || v.createdAt) }}</span>\r
                          <span class="ft-amount" [style.color]="getVoucherTypeColor(v.voucherType)">\r
                            {{ formatAmount(v.amount) }} \u0631.\u064A\r
                          </span>\r
                        </div>\r
                      }\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </div>\r
          }\r
        </div>\r
\r
      }\r
    </div>\r
  }\r
\r
  <!-- ===== How It Works Modal ===== -->\r
  @if (showHowItWorks()) {\r
    <div class="modal-overlay" (click)="showHowItWorks.set(false)">\r
      <div class="modal-3d hiw-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-icon amber">\r
            <span class="material-icons-round">help_outline</span>\r
          </div>\r
          <h2>\u0645\u0628\u062F\u0623 \u0627\u0644\u0639\u0645\u0644 - \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0648\u0627\u0644\u062A\u0648\u0631\u064A\u062F</h2>\r
          <button class="modal-close" (click)="showHowItWorks.set(false)">\r
            <span class="material-icons-round">close</span>\r
          </button>\r
        </div>\r
        <div class="modal-body">\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">category</span> \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A</h3>\r
            <p>\r
              \u0642\u0628\u0644 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062A\u062D\u0635\u064A\u0644\u060C \u0644\u0627\u0632\u0645 \u062A\u0646\u0634\u0626 "\u0646\u0648\u0639 \u0639\u0645\u0644\u064A\u0629" \u0645\u0646 \u0641\u0626\u0629 "\u062A\u062D\u0635\u064A\u0644" \u0641\u064A \u0635\u0641\u062D\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A.\r
              \u0643\u0644 \u0646\u0648\u0639 \u0639\u0645\u0644\u064A\u0629 \u0641\u064A\u0647 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A (\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0623\u0646\u0638\u0645\u0629) \u0627\u0644\u0644\u064A \u062A\u062A\u062D\u0635\u0644 \u0645\u0646\u0647\u0627.\r
            </p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">call_received</span> \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0627\u0644\u064A\u0648\u0645\u064A</h3>\r
            <p>\r
              \u062A\u062E\u062A\u0627\u0631 \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u2192 \u062A\u0638\u0647\u0631 \u0644\u0643 \u0643\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u062C\u0627\u0647\u0632\u0629 \u0641\u064A \u062C\u062F\u0648\u0644 \u2192 \u062A\u0643\u062A\u0628 \u0627\u0644\u0628\u064A\u0627\u0646 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0644\u0644\u0643\u0644 \u2192\r
              \u062A\u0639\u0628\u064A \u0627\u0644\u0645\u0628\u0627\u0644\u063A \u0644\u0643\u0644 \u062D\u0633\u0627\u0628 \u2192 \u0627\u0644\u062E\u0627\u0646\u0629 \u0627\u0644\u0641\u0627\u0636\u064A\u0629 \u062A\u0639\u0646\u064A \u0645\u0627 \u062A\u062D\u0635\u0651\u0644 \u0634\u064A.\r
            </p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">call_made</span> \u0627\u0644\u062A\u0648\u0631\u064A\u062F</h3>\r
            <p>\r
              \u0628\u0639\u062F \u0627\u0644\u062A\u062D\u0635\u064A\u0644\u060C \u062A\u062E\u062A\u0627\u0631 \u0646\u0648\u0639 \u0639\u0645\u0644\u064A\u0629 "\u062A\u0648\u0631\u064A\u062F" \u2192 \u062A\u062D\u062F\u062F \u0648\u064A\u0646 \u0648\u0631\u062F\u062A \u0627\u0644\u0641\u0644\u0648\u0633 (\u0635\u0631\u0627\u0641\u060C \u0645\u062D\u0641\u0638\u0629\u060C \u0628\u0646\u0643) \u2192\r
              \u062A\u0636\u064A\u0641 \u0631\u0642\u0645 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0643\u0644 \u062A\u0648\u0631\u064A\u062F.\r
            </p>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
</div>\r
`, styles: ['/* src/app/pages/collections/collections.scss */\n.page-container {\n  padding: 0;\n  max-width: 1400px;\n  margin: 0 auto;\n  direction: rtl;\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  padding: 18px 22px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(20, 184, 166, 0.06),\n      rgba(59, 130, 246, 0.04));\n  border-radius: 20px;\n  border: 1px solid rgba(20, 184, 166, 0.12);\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-icon-3d {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: perspective(100px) rotateX(5deg);\n  transition: transform 0.3s;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.page-icon-3d.teal {\n  background:\n    linear-gradient(\n      135deg,\n      #14b8a6,\n      #0ea5e9);\n}\n.page-icon-3d .material-icons-round {\n  font-size: 26px;\n  color: white;\n}\n.page-title {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 3px;\n}\n.page-subtitle {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n.help-btn {\n  width: 40px;\n  height: 40px;\n  border-radius: 11px;\n  border: 1.5px solid rgba(245, 158, 11, 0.3);\n  background: rgba(245, 158, 11, 0.08);\n  color: #f59e0b;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.help-btn .material-icons-round {\n  font-size: 20px;\n}\n.help-btn:hover {\n  background: rgba(245, 158, 11, 0.15);\n  transform: scale(1.08) rotate(15deg);\n}\n.alert-error {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.25);\n  color: #ef4444;\n  font-size: 13px;\n  font-weight: 600;\n  margin-bottom: 16px;\n  cursor: pointer;\n}\n.alert-error .material-icons-round {\n  font-size: 18px;\n}\n.alert-error .close-x {\n  margin-right: auto;\n  opacity: 0.6;\n}\n.view-tabs {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n}\n.view-tab {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 20px;\n  border-radius: 14px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  color: var(--text-secondary, #64748b);\n  transition: all 0.25s;\n  flex: 1;\n  min-width: 140px;\n  justify-content: center;\n}\n.view-tab.active {\n  border-color: transparent;\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);\n  transform: translateY(-2px);\n  color: white;\n}\n.view-tab:nth-child(1).active {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.view-tab:nth-child(2).active {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.view-tab:nth-child(3).active {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1,\n      #8b5cf6);\n}\n.view-tab:not(.active):hover {\n  border-color: #14b8a6;\n  color: #14b8a6;\n}\n.vt-icon {\n  width: 32px;\n  height: 32px;\n  border-radius: 9px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.vt-icon .material-icons-round {\n  font-size: 18px;\n  color: white;\n}\n.vt-icon.collection-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.vt-icon.delivery-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.vt-icon.history-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1,\n      #8b5cf6);\n}\n.view-tab.active .vt-icon {\n  background: rgba(255, 255, 255, 0.25) !important;\n}\n.loading-center {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 60px;\n}\n.loading-center p {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n  margin-top: 12px;\n}\n.loading-spinner {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 3px solid var(--border-color, #e2e8f0);\n  border-top-color: #14b8a6;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.view-section {\n  animation: fadeIn 0.3s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.no-op-types-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 60px 20px;\n  text-align: center;\n  border-radius: 20px;\n  border: 2px dashed var(--border-color, #e2e8f0);\n  background: var(--bg-surface, #f8fafc);\n}\n.no-op-types-card h3 {\n  font-size: 17px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 14px 0 8px;\n}\n.no-op-types-card p {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 20px;\n}\n.noopt-icon {\n  width: 64px;\n  height: 64px;\n  border-radius: 18px;\n  background:\n    linear-gradient(\n      135deg,\n      #14b8a6,\n      #0ea5e9);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 10px 28px rgba(20, 184, 166, 0.3);\n}\n.noopt-icon.delivery {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.noopt-icon .material-icons-round {\n  font-size: 32px;\n  color: white;\n}\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 16px;\n}\n.section-title .material-icons-round {\n  font-size: 18px;\n  color: #14b8a6;\n}\n.ot-cards-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.ot-card-3d {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n  border-radius: 16px;\n  background: var(--bg-card, white);\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  cursor: pointer;\n  transition: all 0.25s;\n  text-align: right;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n}\n.ot-card-3d:hover {\n  border-color: #14b8a6;\n  box-shadow: 0 8px 24px rgba(20, 184, 166, 0.15);\n  transform: translateX(-4px);\n}\n.ot-card-3d:hover .ot-arrow {\n  transform: translateX(-4px);\n}\n.ot-card-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 13px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.ot-card-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.ot-card-icon.collection {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.ot-card-icon.delivery {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.ot-card-body {\n  flex: 1;\n}\n.ot-card-name {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin-bottom: 3px;\n}\n.ot-card-desc {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.ot-card-count {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n}\n.ot-card-count .material-icons-round {\n  font-size: 13px;\n}\n.ot-arrow {\n  font-size: 16px;\n  color: var(--text-muted, #94a3b8);\n  transition: transform 0.2s;\n}\n.collection-form-section {\n  background: var(--bg-card, white);\n  border-radius: 20px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);\n  overflow: hidden;\n}\n.cf-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 16px 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(20, 184, 166, 0.06),\n      rgba(59, 130, 246, 0.04));\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.back-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n.back-btn .material-icons-round {\n  font-size: 18px;\n  color: var(--text-secondary, #64748b);\n}\n.back-btn:hover {\n  background: var(--bg-surface, #f8fafc);\n}\n.cf-title-wrap {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n}\n.cf-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.cf-icon .material-icons-round {\n  font-size: 21px;\n  color: white;\n}\n.cf-icon.collection {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.cf-icon.delivery {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.cf-title-wrap h2 {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 2px;\n}\n.cf-title-wrap p {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n  margin: 0;\n}\n.global-fields {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n  padding: 16px 20px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.form-label {\n  display: block;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 5px;\n}\n.form-input {\n  width: 100%;\n  padding: 9px 13px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n  font-size: 13px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-input:focus {\n  border-color: #14b8a6;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);\n}\n.entries-table-header {\n  display: grid;\n  grid-template-columns: 2fr 1.5fr 1fr;\n  padding: 10px 20px;\n  background: var(--bg-surface, #f8fafc);\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n  font-size: 11px;\n  font-weight: 800;\n  color: var(--text-muted, #94a3b8);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.entries-table-header.delivery-header {\n  grid-template-columns: 2fr 1.5fr 1fr 1fr;\n}\n.entry-row {\n  display: grid;\n  grid-template-columns: 2fr 1.5fr 1fr;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 20px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n  transition: background 0.15s;\n}\n.entry-row.delivery-row {\n  grid-template-columns: 2fr 1.5fr 1fr 1fr;\n}\n.entry-row.has-amount {\n  background: rgba(34, 197, 94, 0.04);\n}\n.entry-row:hover {\n  background: var(--bg-surface, #f8fafc);\n}\n.entry-row:last-child {\n  border-bottom: none;\n}\n.entry-account {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.entry-account-icon {\n  width: 30px;\n  height: 30px;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.entry-account-icon.delivery {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.entry-account-icon .material-icons-round {\n  font-size: 15px;\n  color: white;\n}\n.entry-amount-wrap {\n  display: flex;\n  align-items: center;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  border-radius: 8px;\n  overflow: hidden;\n  background: var(--bg-card, white);\n}\n.entry-amount-wrap:focus-within {\n  border-color: #14b8a6;\n}\n.entry-amount-input {\n  flex: 1;\n  padding: 7px 10px;\n  border: none;\n  outline: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  background: transparent;\n  color: var(--text-primary, #1e293b);\n  min-width: 0;\n}\n.entry-currency {\n  padding: 7px 8px;\n  background: var(--bg-surface, #f8fafc);\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n  border-right: 1px solid var(--border-color, #e2e8f0);\n}\n.entry-notes-input,\n.entry-ref-input {\n  width: 100%;\n  padding: 7px 10px;\n  border-radius: 8px;\n  border: 1.5px solid var(--border-color, #e2e8f0);\n  font-size: 12px;\n  font-weight: 600;\n  font-family: "Tajawal", sans-serif;\n  background: var(--bg-card, white);\n  color: var(--text-primary, #1e293b);\n}\n.entry-notes-input:focus,\n.entry-ref-input:focus {\n  border-color: #14b8a6;\n  outline: none;\n}\n.cf-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  background: var(--bg-surface, #f8fafc);\n  border-top: 1px solid var(--border-color, #e2e8f0);\n}\n.total-display {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.total-label {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n}\n.total-amount {\n  font-size: 22px;\n  font-weight: 900;\n}\n.total-amount.collection-color {\n  color: #22c55e;\n}\n.total-amount.delivery-color {\n  color: #ef4444;\n}\n.total-currency {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n}\n.btn-3d {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 20px;\n  border-radius: 11px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-3d .material-icons-round {\n  font-size: 17px;\n}\n.btn-3d.btn-collection {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n  color: white;\n  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.35);\n}\n.btn-3d.btn-collection:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);\n}\n.btn-3d.btn-delivery {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n  color: white;\n  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.35);\n}\n.btn-3d.btn-delivery:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);\n}\n.btn-3d.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);\n}\n.btn-3d.btn-primary:hover {\n  transform: translateY(-2px);\n}\n.btn-3d:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  transform: none !important;\n}\n.history-stats {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 20px;\n}\n.hs-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 18px;\n  border-radius: 16px;\n  flex: 1;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.hs-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);\n}\n.hs-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.hs-icon .material-icons-round {\n  font-size: 22px;\n  color: white;\n}\n.hs-card.collection .hs-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.hs-card.delivery .hs-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.hs-num {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text-primary, #1e293b);\n}\n.hs-label {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n}\n.hs-amount {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-muted, #94a3b8);\n}\n.empty-history {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 60px;\n}\n.empty-history .material-icons-round {\n  font-size: 48px;\n  color: var(--text-muted, #94a3b8);\n}\n.empty-history p {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-secondary, #64748b);\n  margin-top: 12px;\n}\n.history-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.history-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: var(--bg-card, white);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  transition: all 0.2s;\n}\n.history-row:hover {\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);\n}\n.history-row.receipt-row {\n  border-right: 3px solid #22c55e;\n}\n.history-row.payment-row {\n  border-right: 3px solid #ef4444;\n}\n.hr-icon {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.hr-icon .material-icons-round {\n  font-size: 18px;\n  color: white;\n}\n.hr-icon.receipt-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.hr-icon.payment-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.hr-main {\n  flex: 1;\n}\n.hr-desc {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.hr-date {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--text-muted, #94a3b8);\n}\n.hr-amount {\n  font-size: 15px;\n  font-weight: 900;\n}\n.hr-amount.receipt-amount {\n  color: #22c55e;\n}\n.hr-amount.payment-amount {\n  color: #ef4444;\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n  animation: fadeIn 0.2s ease;\n}\n.modal-3d {\n  background: var(--bg-card, white);\n  border-radius: 22px;\n  width: 100%;\n  max-width: 520px;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.18);\n  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes slideUp {\n  from {\n    transform: translateY(40px) scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0) scale(1);\n    opacity: 1;\n  }\n}\n.hiw-modal {\n  max-width: 500px;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 18px 22px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.modal-header h2 {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0;\n  flex: 1;\n}\n.modal-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 11px;\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 21px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-close {\n  width: 34px;\n  height: 34px;\n  border-radius: 9px;\n  border: none;\n  background: var(--bg-surface, #f8fafc);\n  color: var(--text-secondary, #64748b);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.modal-close .material-icons-round {\n  font-size: 17px;\n}\n.modal-close:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 18px 22px;\n}\n.hiw-section {\n  padding: 14px 0;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.hiw-section:last-child {\n  border-bottom: none;\n}\n.hiw-section h3 {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary, #1e293b);\n  margin: 0 0 8px;\n}\n.hiw-section h3 .material-icons-round {\n  font-size: 17px;\n  color: #f59e0b;\n}\n.hiw-section p {\n  font-size: 13px;\n  line-height: 1.9;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .page-header {\n    flex-direction: column;\n    gap: 14px;\n    align-items: flex-start;\n  }\n  .view-tabs {\n    flex-direction: column;\n  }\n  .global-fields {\n    grid-template-columns: 1fr;\n  }\n  .entries-table-header,\n  .entry-row {\n    grid-template-columns: 1fr;\n    gap: 6px;\n  }\n  .history-stats {\n    flex-direction: column;\n  }\n}\n.vt-icon.funds-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #059669);\n}\n.funds-summary {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.fund-summary-card {\n  background: var(--surface, #fff);\n  border: 1.5px solid rgba(0, 0, 0, 0.07);\n  border-radius: 16px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.25s;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n}\n.fund-summary-card:hover {\n  border-color: rgba(16, 185, 129, 0.3);\n  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.1);\n  transform: translateY(-1px);\n}\n.fund-summary-card.selected {\n  border-color: rgba(16, 185, 129, 0.4);\n  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.15);\n}\n.fsc-header {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 18px;\n}\n.fsc-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.fsc-icon .material-icons-round {\n  font-size: 22px;\n}\n.fsc-info {\n  flex: 1;\n}\n.fsc-info strong {\n  display: block;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.fsc-info .fsc-type {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 500;\n}\n.fsc-expand {\n  color: var(--text-secondary, #64748b);\n  font-size: 20px;\n}\n.fsc-balance {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 18px;\n  margin: 0 12px 12px;\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.03);\n}\n.fsc-balance .fsc-balance-label {\n  font-size: 12px;\n  color: var(--text-secondary, #64748b);\n  font-weight: 600;\n}\n.fsc-balance .fsc-balance-value {\n  font-size: 18px;\n  font-weight: 800;\n}\n.fsc-balance.positive .fsc-balance-value {\n  color: #10b981;\n}\n.fsc-balance.negative .fsc-balance-value {\n  color: #ef4444;\n}\n.fund-transactions {\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  padding: 14px 18px;\n}\n.ft-header {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary, #64748b);\n  margin-bottom: 12px;\n}\n.ft-header .material-icons-round {\n  font-size: 16px;\n}\n.ft-empty {\n  text-align: center;\n  padding: 20px;\n  color: var(--text-secondary, #64748b);\n  font-size: 13px;\n  background: rgba(0, 0, 0, 0.02);\n  border-radius: 10px;\n}\n.ft-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.ft-row {\n  display: grid;\n  grid-template-columns: 60px 1fr auto auto;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 12px;\n  border-radius: 8px;\n  background: rgba(0, 0, 0, 0.02);\n}\n.ft-row:hover {\n  background: rgba(0, 0, 0, 0.04);\n}\n.ft-type {\n  font-size: 12px;\n  font-weight: 700;\n}\n.ft-desc {\n  font-size: 13px;\n  color: var(--text-primary, #1e293b);\n}\n.ft-date {\n  font-size: 11px;\n  color: var(--text-secondary, #64748b);\n  white-space: nowrap;\n}\n.ft-amount {\n  font-size: 14px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=collections.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CollectionsComponent, { className: "CollectionsComponent", filePath: "src/app/pages/collections/collections.ts", lineNumber: 20 });
})();
export {
  CollectionsComponent
};
//# sourceMappingURL=chunk-OGXMP2JX.js.map
