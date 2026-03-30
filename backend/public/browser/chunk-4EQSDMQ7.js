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
  DefaultValueAccessor,
  FormsModule,
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
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵarrowFunction,
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
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VUZEB5JS.js";

// src/app/pages/journal/journal.ts
var arrowFn0 = (ctx, view) => (e) => e.isBalanced;
var _forTrack0 = ($index, $item) => $item.id;
function JournalComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "span", 3);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error());
  }
}
function JournalComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 20);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd()();
  }
}
function JournalComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 3);
    \u0275\u0275text(2, "menu_book");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u064A\u0648\u062F \u0628\u0639\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 21);
    \u0275\u0275text(6, "\u0627\u0644\u0642\u064A\u0648\u062F \u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0644\u0645\u0627 \u0645\u0627 \u064A\u0643\u0648\u0646 \u0641\u064A\u0647 \u0635\u0646\u062F\u0648\u0642 \u0623\u0648 \u0628\u0646\u0643 \u0623\u0648 \u0645\u062D\u0641\u0638\u0629 \u0623\u0648 \u0635\u0631\u0627\u0641 \u0643\u0637\u0631\u0641");
    \u0275\u0275elementEnd()();
  }
}
function JournalComponent_Conditional_50_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r3.fullSequenceNumber);
  }
}
function JournalComponent_Conditional_50_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 3);
    \u0275\u0275text(2, "notes");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", entry_r3.description);
  }
}
function JournalComponent_Conditional_50_For_2_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 40);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 41);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("debit-line", line_r4.lineType === "debit")("credit-line", line_r4.lineType === "credit");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r4.lineType === "debit" ? "\u0645\u062F\u064A\u0646" : "\u062F\u0627\u0626\u0646");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r4.accountName || ctx_r0.getAccountName(line_r4.accountId));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatAmount(line_r4.amount));
  }
}
function JournalComponent_Conditional_50_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275repeaterCreate(1, JournalComponent_Conditional_50_For_2_Conditional_14_For_2_Template, 7, 7, "div", 37, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(entry_r3.lines);
  }
}
function JournalComponent_Conditional_50_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34)(1, "span", 3);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0645\u062A\u0648\u0627\u0632\u0646");
    \u0275\u0275elementEnd();
  }
}
function JournalComponent_Conditional_50_For_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35)(1, "span", 3);
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u063A\u064A\u0631 \u0645\u062A\u0648\u0627\u0632\u0646");
    \u0275\u0275elementEnd();
  }
}
function JournalComponent_Conditional_50_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "div", 25)(3, "span", 3);
    \u0275\u0275text(4, "menu_book");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, JournalComponent_Conditional_50_For_2_Conditional_6_Template, 2, 1, "span", 26);
    \u0275\u0275elementStart(7, "span", 27);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 28);
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "span", 29);
    \u0275\u0275text(12, "\u0631.\u064A");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, JournalComponent_Conditional_50_For_2_Conditional_13_Template, 4, 1, "div", 30);
    \u0275\u0275conditionalCreate(14, JournalComponent_Conditional_50_For_2_Conditional_14_Template, 3, 0, "div", 31);
    \u0275\u0275elementStart(15, "div", 32)(16, "span", 33)(17, "span", 3);
    \u0275\u0275text(18, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, JournalComponent_Conditional_50_For_2_Conditional_20_Template, 4, 0, "span", 34)(21, JournalComponent_Conditional_50_For_2_Conditional_21_Template, 4, 0, "span", 35);
    \u0275\u0275elementStart(22, "button", 36);
    \u0275\u0275listener("click", function JournalComponent_Conditional_50_For_2_Template_button_click_22_listener() {
      const entry_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.deleteEntry(entry_r3.id));
    });
    \u0275\u0275elementStart(23, "span", 3);
    \u0275\u0275text(24, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const entry_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("unbalanced", !entry_r3.isBalanced);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", entry_r3.entryNumber);
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r3.fullSequenceNumber ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.getStatusClass(entry_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getStatusLabel(entry_r3.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.formatAmount(entry_r3.totalDebit), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(entry_r3.description ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((entry_r3.lines == null ? null : entry_r3.lines.length) ? 14 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(entry_r3.entryDate || entry_r3.createdAt));
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r3.isBalanced ? 20 : 21);
  }
}
function JournalComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275repeaterCreate(1, JournalComponent_Conditional_50_For_2_Template, 25, 12, "div", 22, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.entries());
  }
}
function JournalComponent_Conditional_51_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "span", 3);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error());
  }
}
function JournalComponent_Conditional_51_For_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const c_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" (#", c_r6.sortOrder, ") ");
  }
}
function JournalComponent_Conditional_51_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, JournalComponent_Conditional_51_For_30_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r6 = ctx.$implicit;
    \u0275\u0275property("ngValue", c_r6.categoryKey);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r6.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(c_r6.sortOrder ? 2 : -1);
  }
}
function JournalComponent_Conditional_51_For_38_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ot_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" (", ot_r7.code, ") ");
  }
}
function JournalComponent_Conditional_51_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, JournalComponent_Conditional_51_For_38_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r7 = ctx.$implicit;
    \u0275\u0275property("ngValue", ot_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ot_r7.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ot_r7.code ? 2 : -1);
  }
}
function JournalComponent_Conditional_51_For_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", a_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r8.name);
  }
}
function JournalComponent_Conditional_51_For_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r9 = ctx.$implicit;
    \u0275\u0275property("ngValue", a_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r9.name);
  }
}
function JournalComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275listener("click", function JournalComponent_Conditional_51_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 43);
    \u0275\u0275listener("click", function JournalComponent_Conditional_51_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 44)(3, "div", 45)(4, "div", 46)(5, "span", 3);
    \u0275\u0275text(6, "note_add");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9, "\u0642\u064A\u062F \u0628\u0633\u064A\u0637");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u2190 \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 47);
    \u0275\u0275listener("click", function JournalComponent_Conditional_51_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 3);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 48);
    \u0275\u0275conditionalCreate(16, JournalComponent_Conditional_51_Conditional_16_Template, 4, 1, "div", 8);
    \u0275\u0275elementStart(17, "div", 49)(18, "span", 3);
    \u0275\u0275text(19, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "\u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0628\u0633\u064A\u0637: \u062D\u0633\u0627\u0628 \u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u064A\u062D\u0648\u0651\u0644 \u0645\u0628\u0644\u063A \u0644\u062D\u0633\u0627\u0628 \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F (\u0628\u062F\u0648\u0646 \u0635\u0646\u062F\u0648\u0642 \u0623\u0648 \u0628\u0646\u0643)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 50)(23, "div", 51)(24, "label");
    \u0275\u0275text(25, "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0642\u064A\u062F *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "select", 52);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_51_Template_select_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.simpleForm.categoryKey, $event) || (ctx_r0.simpleForm.categoryKey = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(27, "option", 53);
    \u0275\u0275text(28, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(29, JournalComponent_Conditional_51_For_30_Template, 3, 3, "option", 53, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 51)(32, "label");
    \u0275\u0275text(33, "\u0627\u0633\u0645 \u0627\u0644\u0642\u064A\u062F (\u0627\u0644\u0642\u0627\u0644\u0628) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "select", 52);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_51_Template_select_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.simpleForm.operationTypeId, $event) || (ctx_r0.simpleForm.operationTypeId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(35, "option", 53);
    \u0275\u0275text(36, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0627\u0644\u0628 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(37, JournalComponent_Conditional_51_For_38_Template, 3, 3, "option", 53, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 51)(40, "label");
    \u0275\u0275text(41, "\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u062F\u0627\u0626\u0646 (\u0627\u0644\u0645\u0635\u062F\u0631) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "select", 52);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_51_Template_select_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.simpleForm.creditAccountId, $event) || (ctx_r0.simpleForm.creditAccountId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(43, "option", 53);
    \u0275\u0275text(44, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u062F\u0627\u0626\u0646 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(45, JournalComponent_Conditional_51_For_46_Template, 2, 2, "option", 53, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 51)(48, "label");
    \u0275\u0275text(49, "\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u062F\u064A\u0646 (\u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "select", 52);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_51_Template_select_ngModelChange_50_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.simpleForm.debitAccountId, $event) || (ctx_r0.simpleForm.debitAccountId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(51, "option", 53);
    \u0275\u0275text(52, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u062F\u064A\u0646 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(53, JournalComponent_Conditional_51_For_54_Template, 2, 2, "option", 53, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 50)(56, "div", 51)(57, "label");
    \u0275\u0275text(58, "\u0627\u0644\u0645\u0628\u0644\u063A *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_51_Template_input_ngModelChange_59_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.simpleForm.amount, $event) || (ctx_r0.simpleForm.amount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 51)(61, "label");
    \u0275\u0275text(62, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_51_Template_input_ngModelChange_63_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.simpleForm.date, $event) || (ctx_r0.simpleForm.date = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(64, "div", 51)(65, "label");
    \u0275\u0275text(66, "\u0627\u0644\u0628\u064A\u0627\u0646 *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "textarea", 56);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_51_Template_textarea_ngModelChange_67_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.simpleForm.description, $event) || (ctx_r0.simpleForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 51)(69, "label");
    \u0275\u0275text(70, "\u0627\u0644\u0645\u0631\u062C\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "input", 57);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_51_Template_input_ngModelChange_71_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.simpleForm.reference, $event) || (ctx_r0.simpleForm.reference = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(72, "div", 58)(73, "button", 59);
    \u0275\u0275listener("click", function JournalComponent_Conditional_51_Template_button_click_73_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveSimple());
    });
    \u0275\u0275elementStart(74, "span", 3);
    \u0275\u0275text(75);
    \u0275\u0275elementEnd();
    \u0275\u0275text(76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "button", 60);
    \u0275\u0275listener("click", function JournalComponent_Conditional_51_Template_button_click_77_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275text(78, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275conditional(ctx_r0.error() ? 16 : -1);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.simpleForm.categoryKey);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", "");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.journalCategories());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.simpleForm.operationTypeId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.journalOpTypes());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.simpleForm.creditAccountId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.getAllAccounts());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.simpleForm.debitAccountId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.getAccountsExcluding(ctx_r0.simpleForm.creditAccountId));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.simpleForm.amount);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.simpleForm.date);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.simpleForm.description);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.simpleForm.reference);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.saving() ? "sync" : "save");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638 \u0627\u0644\u0642\u064A\u062F", " ");
  }
}
function JournalComponent_Conditional_52_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "span", 3);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error());
  }
}
function JournalComponent_Conditional_52_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u062D\u0633\u0627\u0628 \u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u064A\u0648\u0632\u0651\u0639 \u0645\u0628\u0644\u063A \u0639\u0644\u0649 \u0639\u062F\u0629 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062F\u064A\u0646\u0629. \u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0644\u0627\u0632\u0645 \u064A\u062A\u0633\u0627\u0648\u0649.");
    \u0275\u0275elementEnd();
  }
}
function JournalComponent_Conditional_52_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u0639\u062F\u0629 \u062D\u0633\u0627\u0628\u0627\u062A \u062F\u0627\u0626\u0646\u0629 \u062A\u062C\u0645\u0651\u0639 \u0645\u0628\u0627\u0644\u063A \u0641\u064A \u062D\u0633\u0627\u0628 \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F. \u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0644\u0627\u0632\u0645 \u064A\u062A\u0633\u0627\u0648\u0649.");
    \u0275\u0275elementEnd();
  }
}
function JournalComponent_Conditional_52_For_39_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const c_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" (#", c_r11.sortOrder, ") ");
  }
}
function JournalComponent_Conditional_52_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, JournalComponent_Conditional_52_For_39_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r11 = ctx.$implicit;
    \u0275\u0275property("ngValue", c_r11.categoryKey);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r11.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(c_r11.sortOrder ? 2 : -1);
  }
}
function JournalComponent_Conditional_52_For_47_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ot_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" (", ot_r12.code, ") ");
  }
}
function JournalComponent_Conditional_52_For_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, JournalComponent_Conditional_52_For_47_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ot_r12 = ctx.$implicit;
    \u0275\u0275property("ngValue", ot_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ot_r12.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ot_r12.code ? 2 : -1);
  }
}
function JournalComponent_Conditional_52_For_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r13 = ctx.$implicit;
    \u0275\u0275property("ngValue", a_r13.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r13.name);
  }
}
function JournalComponent_Conditional_52_For_67_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r16 = ctx.$implicit;
    \u0275\u0275property("ngValue", a_r16.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r16.name);
  }
}
function JournalComponent_Conditional_52_For_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 74);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 75)(4, "select", 52);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_52_For_67_Template_select_ngModelChange_4_listener($event) {
      const line_r15 = \u0275\u0275restoreView(_r14).$implicit;
      \u0275\u0275twoWayBindingSet(line_r15.accountId, $event) || (line_r15.accountId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "option", 53);
    \u0275\u0275text(6, "-- \u0627\u062E\u062A\u0631 \u062D\u0633\u0627\u0628 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, JournalComponent_Conditional_52_For_67_For_8_Template, 2, 2, "option", 53, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 76)(10, "input", 77);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_52_For_67_Template_input_ngModelChange_10_listener($event) {
      const line_r15 = \u0275\u0275restoreView(_r14).$implicit;
      \u0275\u0275twoWayBindingSet(line_r15.amount, $event) || (line_r15.amount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 76)(12, "input", 78);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_52_For_67_Template_input_ngModelChange_12_listener($event) {
      const line_r15 = \u0275\u0275restoreView(_r14).$implicit;
      \u0275\u0275twoWayBindingSet(line_r15.description, $event) || (line_r15.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 79);
    \u0275\u0275listener("click", function JournalComponent_Conditional_52_For_67_Template_button_click_13_listener() {
      const \u0275$index_458_r17 = \u0275\u0275restoreView(_r14).$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.removeLine(\u0275$index_458_r17));
    });
    \u0275\u0275elementStart(14, "span", 3);
    \u0275\u0275text(15, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const line_r15 = ctx.$implicit;
    const \u0275$index_458_r17 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_458_r17 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", line_r15.accountId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.getAccountsExcluding(ctx_r0.compoundForm.mainAccountId));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", line_r15.amount);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", line_r15.description);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.compoundForm.lines.length <= 1);
  }
}
function JournalComponent_Conditional_52_Conditional_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "span", 3);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u0645\u062A\u0648\u0627\u0632\u0646 - \u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0645\u062A\u0633\u0627\u0648\u064A");
    \u0275\u0275elementEnd();
  }
}
function JournalComponent_Conditional_52_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73)(1, "span", 3);
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \u063A\u064A\u0631 \u0645\u062A\u0648\u0627\u0632\u0646 - \u0648\u0632\u0651\u0639 \u0627\u0644\u0645\u0628\u0644\u063A \u0628\u0627\u0644\u0643\u0627\u0645\u0644");
    \u0275\u0275elementEnd();
  }
}
function JournalComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275listener("click", function JournalComponent_Conditional_52_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275elementStart(1, "div", 61);
    \u0275\u0275listener("click", function JournalComponent_Conditional_52_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 44)(3, "div", 45)(4, "div", 62)(5, "span", 3);
    \u0275\u0275text(6, "playlist_add");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "h2");
    \u0275\u0275text(9, "\u0642\u064A\u062F \u0645\u062A\u0639\u062F\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11, "\u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u2190 \u0639\u062F\u0629 \u0645\u062F\u064A\u0646\u064A\u0646 (\u0623\u0648 \u0627\u0644\u0639\u0643\u0633)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 47);
    \u0275\u0275listener("click", function JournalComponent_Conditional_52_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275elementStart(13, "span", 3);
    \u0275\u0275text(14, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 48);
    \u0275\u0275conditionalCreate(16, JournalComponent_Conditional_52_Conditional_16_Template, 4, 1, "div", 8);
    \u0275\u0275elementStart(17, "div", 63)(18, "button", 64);
    \u0275\u0275listener("click", function JournalComponent_Conditional_52_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.compoundDirection.set("one_credit_many_debit"));
    });
    \u0275\u0275elementStart(19, "span", 3);
    \u0275\u0275text(20, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " \u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u2190 \u0639\u062F\u0629 \u0645\u062F\u064A\u0646\u064A\u0646 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 64);
    \u0275\u0275listener("click", function JournalComponent_Conditional_52_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.compoundDirection.set("one_debit_many_credit"));
    });
    \u0275\u0275elementStart(23, "span", 3);
    \u0275\u0275text(24, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " \u0639\u062F\u0629 \u062F\u0627\u0626\u0646\u064A\u0646 \u2190 \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 49)(27, "span", 3);
    \u0275\u0275text(28, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(29, JournalComponent_Conditional_52_Conditional_29_Template, 2, 0, "span")(30, JournalComponent_Conditional_52_Conditional_30_Template, 2, 0, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 50)(32, "div", 51)(33, "label");
    \u0275\u0275text(34, "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0642\u064A\u062F *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "select", 52);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_52_Template_select_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.compoundForm.categoryKey, $event) || (ctx_r0.compoundForm.categoryKey = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(36, "option", 53);
    \u0275\u0275text(37, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(38, JournalComponent_Conditional_52_For_39_Template, 3, 3, "option", 53, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 51)(41, "label");
    \u0275\u0275text(42, "\u0627\u0633\u0645 \u0627\u0644\u0642\u064A\u062F (\u0627\u0644\u0642\u0627\u0644\u0628) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "select", 52);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_52_Template_select_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.compoundForm.operationTypeId, $event) || (ctx_r0.compoundForm.operationTypeId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(44, "option", 53);
    \u0275\u0275text(45, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0627\u0644\u0628 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(46, JournalComponent_Conditional_52_For_47_Template, 3, 3, "option", 53, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(48, "div", 50)(49, "div", 51)(50, "label");
    \u0275\u0275text(51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "select", 52);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_52_Template_select_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.compoundForm.mainAccountId, $event) || (ctx_r0.compoundForm.mainAccountId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(53, "option", 53);
    \u0275\u0275text(54, "-- \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628 --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(55, JournalComponent_Conditional_52_For_56_Template, 2, 2, "option", 53, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 51)(58, "label");
    \u0275\u0275text(59, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_52_Template_input_ngModelChange_60_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.compoundForm.totalAmount, $event) || (ctx_r0.compoundForm.totalAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(61, "div", 65)(62, "span", 3);
    \u0275\u0275text(63, "list");
    \u0275\u0275elementEnd();
    \u0275\u0275text(64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 66);
    \u0275\u0275repeaterCreate(66, JournalComponent_Conditional_52_For_67_Template, 16, 6, "div", 67, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "button", 68);
    \u0275\u0275listener("click", function JournalComponent_Conditional_52_Template_button_click_68_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.addLine());
    });
    \u0275\u0275elementStart(69, "span", 3);
    \u0275\u0275text(70, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(71, " \u0625\u0636\u0627\u0641\u0629 \u0633\u0637\u0631 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "div", 69)(73, "div", 70)(74, "span");
    \u0275\u0275text(75, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "strong");
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 70)(79, "span");
    \u0275\u0275text(80, "\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u062A\u0648\u0632\u064A\u0639:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "strong");
    \u0275\u0275text(82);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "div", 71)(84, "span");
    \u0275\u0275text(85, "\u0627\u0644\u0645\u062A\u0628\u0642\u064A:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "strong");
    \u0275\u0275text(87);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(88, JournalComponent_Conditional_52_Conditional_88_Template, 4, 0, "div", 72)(89, JournalComponent_Conditional_52_Conditional_89_Template, 4, 0, "div", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "div", 50)(91, "div", 51)(92, "label");
    \u0275\u0275text(93, "\u0627\u0644\u0628\u064A\u0627\u0646 *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "textarea", 56);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_52_Template_textarea_ngModelChange_94_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.compoundForm.description, $event) || (ctx_r0.compoundForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div", 51)(96, "label");
    \u0275\u0275text(97, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_52_Template_input_ngModelChange_98_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.compoundForm.date, $event) || (ctx_r0.compoundForm.date = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(99, "div", 51)(100, "label");
    \u0275\u0275text(101, "\u0627\u0644\u0645\u0631\u062C\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "input", 57);
    \u0275\u0275twoWayListener("ngModelChange", function JournalComponent_Conditional_52_Template_input_ngModelChange_102_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.compoundForm.reference, $event) || (ctx_r0.compoundForm.reference = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(103, "div", 58)(104, "button", 59);
    \u0275\u0275listener("click", function JournalComponent_Conditional_52_Template_button_click_104_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveCompound());
    });
    \u0275\u0275elementStart(105, "span", 3);
    \u0275\u0275text(106);
    \u0275\u0275elementEnd();
    \u0275\u0275text(107);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "button", 60);
    \u0275\u0275listener("click", function JournalComponent_Conditional_52_Template_button_click_108_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showForm.set(false));
    });
    \u0275\u0275text(109, "\u0625\u0644\u063A\u0627\u0621");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275conditional(ctx_r0.error() ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r0.compoundDirection() === "one_credit_many_debit");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.compoundDirection() === "one_debit_many_credit");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r0.compoundDirection() === "one_credit_many_debit" ? 29 : 30);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.compoundForm.categoryKey);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", "");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.journalCategories());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.compoundForm.operationTypeId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.journalOpTypes());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.compoundDirection() === "one_credit_many_debit" ? "\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u062F\u0627\u0626\u0646 (\u0627\u0644\u0645\u0635\u062F\u0631)" : "\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u062F\u064A\u0646 (\u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644)", " *");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.compoundForm.mainAccountId);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.getAllAccounts());
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.compoundForm.totalAmount);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.compoundDirection() === "one_credit_many_debit" ? "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u064A\u0646\u0629 (\u0627\u0644\u062A\u0648\u0632\u064A\u0639)" : "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u062F\u0627\u0626\u0646\u0629 (\u0627\u0644\u0645\u0635\u0627\u062F\u0631)", " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.compoundForm.lines);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("balanced", ctx_r0.isBalanced())("unbalanced", !ctx_r0.isBalanced());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatAmount(ctx_r0.compoundForm.totalAmount));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatAmount(ctx_r0.getLinesTotal()));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("red-text", ctx_r0.getRemaining() !== 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.formatAmount(ctx_r0.getRemaining()));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isBalanced() ? 88 : 89);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.compoundForm.description);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.compoundForm.date);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.compoundForm.reference);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r0.isBalanced() || ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.saving() ? "sync" : "save");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638 \u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0639\u062F\u062F", " ");
  }
}
function JournalComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275listener("click", function JournalComponent_Conditional_53_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showHowItWorks.set(false));
    });
    \u0275\u0275elementStart(1, "div", 61);
    \u0275\u0275listener("click", function JournalComponent_Conditional_53_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 44)(3, "div", 45)(4, "div", 80)(5, "span", 3);
    \u0275\u0275text(6, "help_outline");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h2");
    \u0275\u0275text(8, "\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0627\u0644\u0642\u064A\u0648\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628\u064A\u0629\u061F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 47);
    \u0275\u0275listener("click", function JournalComponent_Conditional_53_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showHowItWorks.set(false));
    });
    \u0275\u0275elementStart(10, "span", 3);
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 81)(13, "div", 82)(14, "h3")(15, "span", 3);
    \u0275\u0275text(16, "help");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " \u0645\u062A\u0649 \u0646\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0642\u064A\u0648\u062F\u061F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p");
    \u0275\u0275text(19, "\u0627\u0644\u0642\u064A\u0648\u062F \u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0644\u0645\u0627 \u0645\u0627 \u064A\u0643\u0648\u0646 \u0641\u064A\u0647 \u0635\u0646\u062F\u0648\u0642 \u0623\u0648 \u0628\u0646\u0643 \u0623\u0648 \u0645\u062D\u0641\u0638\u0629 \u0623\u0648 \u0635\u0631\u0627\u0641 \u0643\u0637\u0631\u0641 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0629. \u0645\u062B\u0644\u0627\u064B: \u062A\u062D\u0648\u064A\u0644 \u0628\u064A\u0646 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062D\u0627\u0633\u0628\u064A\u0629 \u062F\u0627\u062E\u0644\u064A\u0629.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 82)(21, "h3")(22, "span", 3);
    \u0275\u0275text(23, "note_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24, " \u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0628\u0633\u064A\u0637");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "p");
    \u0275\u0275text(26, "\u062D\u0633\u0627\u0628 \u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u064A\u062D\u0648\u0651\u0644 \u0645\u0628\u0644\u063A \u0644\u062D\u0633\u0627\u0628 \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F. \u0645\u062B\u0627\u0644: \u062D\u0633\u0627\u0628 \u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u063A\u0631\u0628\u064A (\u062F\u0627\u0626\u0646) \u2190 \u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u062A\u062D\u0635\u0644\u064A\u0646 (\u0645\u062F\u064A\u0646) \u0628\u0645\u0628\u0644\u063A 50,000 \u0631\u064A\u0627\u0644.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 82)(28, "h3")(29, "span", 3);
    \u0275\u0275text(30, "playlist_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31, " \u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0639\u062F\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p");
    \u0275\u0275text(33, "\u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u0628\u0645\u0628\u0644\u063A 100,000 \u064A\u0648\u0632\u0639\u0647\u0627 \u0639\u0644\u0649 \u0639\u062F\u0629 \u0645\u062F\u064A\u0646\u064A\u0646: 10,000 + 15,000 + 25,000 + 50,000. \u0623\u0648 \u0627\u0644\u0639\u0643\u0633: \u0639\u062F\u0629 \u062F\u0627\u0626\u0646\u064A\u0646 \u064A\u062C\u0645\u0651\u0639\u0648\u0646 \u0641\u064A \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p")(35, "strong");
    \u0275\u0275text(36, "\u0627\u0644\u0645\u0647\u0645:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(37, " \u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0644\u0627\u0632\u0645 \u064A\u062A\u0633\u0627\u0648\u0649 - \u0627\u0644\u062F\u0627\u0626\u0646 = \u0627\u0644\u0645\u062F\u064A\u0646.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 82)(39, "h3")(40, "span", 3);
    \u0275\u0275text(41, "tag");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42, " \u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0642\u064A\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p");
    \u0275\u0275text(44, " \u0631\u0642\u0645 \u0627\u0644\u0642\u064A\u062F \u064A\u064F\u0648\u0644\u0651\u062F \u062D\u0633\u0628 ");
    \u0275\u0275elementStart(45, "strong");
    \u0275\u0275text(46, "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0642\u064A\u062F + \u0627\u0633\u0645 \u0627\u0644\u0642\u064A\u062F (\u0627\u0644\u0642\u0627\u0644\u0628) + \u0627\u0644\u0633\u0646\u0629 + \u062A\u0633\u0644\u0633\u0644 \u064A\u0628\u062F\u0623 \u0645\u0646 1");
    \u0275\u0275elementEnd();
    \u0275\u0275text(47, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "p", 83);
    \u0275\u0275text(49, " QYD-CategoryNo-TemplateCode-YYYY-Serial ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "p")(51, "small");
    \u0275\u0275text(52, "\u0627\u0644\u062A\u0633\u0644\u0633\u0644 \u064A\u0628\u062F\u0623 \u0645\u0646 ");
    \u0275\u0275elementStart(53, "strong");
    \u0275\u0275text(54, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275text(55, " \u0644\u0643\u0644 (\u062A\u0635\u0646\u064A\u0641 + \u0642\u0627\u0644\u0628) \u0648\u0644\u0643\u0644 \u0633\u0646\u0629 (\u0648\u0643\u0644 \u0639\u0645\u0644 \u0645\u0646\u0641\u0635\u0644).");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(56, "div", 82)(57, "h3")(58, "span", 3);
    \u0275\u0275text(59, "filter_list");
    \u0275\u0275elementEnd();
    \u0275\u0275text(60, " \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "p");
    \u0275\u0275text(62, "\u0644\u0645\u0627 \u062A\u062E\u062A\u0627\u0631 \u0627\u0644\u062F\u0627\u0626\u0646 \u0623\u0648\u0644\u0627\u064B\u060C \u0627\u0644\u0646\u0638\u0627\u0645 \u064A\u0639\u0631\u0636 \u0641\u0642\u0637 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0633\u0645\u0648\u062D\u0629. \u0648\u0627\u0644\u0639\u0643\u0633 \u0635\u062D\u064A\u062D.");
    \u0275\u0275elementEnd()()()()();
  }
}
var JournalComponent = class _JournalComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  entries = signal([], ...ngDevMode ? [{ debugName: "entries" }] : (
    /* istanbul ignore next */
    []
  ));
  accounts = signal([], ...ngDevMode ? [{ debugName: "accounts" }] : (
    /* istanbul ignore next */
    []
  ));
  operationTypes = signal([], ...ngDevMode ? [{ debugName: "operationTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  journalCategories = signal([], ...ngDevMode ? [{ debugName: "journalCategories" }] : (
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
  showHowItWorks = signal(false, ...ngDevMode ? [{ debugName: "showHowItWorks" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  // Journal entry type: simple or compound
  journalType = signal("simple", ...ngDevMode ? [{ debugName: "journalType" }] : (
    /* istanbul ignore next */
    []
  ));
  compoundDirection = signal("one_credit_many_debit", ...ngDevMode ? [{ debugName: "compoundDirection" }] : (
    /* istanbul ignore next */
    []
  ));
  // Simple form
  simpleForm = {
    categoryKey: "",
    debitAccountId: null,
    creditAccountId: null,
    amount: 0,
    description: "",
    reference: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    operationTypeId: null
  };
  // Compound form
  compoundForm = {
    categoryKey: "",
    mainAccountId: null,
    totalAmount: 0,
    description: "",
    reference: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    operationTypeId: null,
    lines: [{ accountId: null, amount: 0, description: "" }]
  };
  // Journal operation types
  journalOpTypes = computed(() => {
    return this.operationTypes().filter((ot) => ot.category === "journal");
  }, ...ngDevMode ? [{ debugName: "journalOpTypes" }] : (
    /* istanbul ignore next */
    []
  ));
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    this.error.set("");
    try {
      const [entries, accounts, opTypes, cats] = await Promise.all([
        this.api.getJournalEntries(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getOperationTypes(this.bizId),
        this.api.getJournalEntryCategories(this.bizId)
      ]);
      this.entries.set(entries);
      this.accounts.set(accounts);
      this.operationTypes.set(opTypes);
      this.journalCategories.set(cats);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    }
    this.loading.set(false);
  }
  // ===================== فلترة الحسابات =====================
  getAllAccounts() {
    return this.accounts();
  }
  getAccountsExcluding(excludeId) {
    if (!excludeId)
      return this.accounts();
    return this.accounts().filter((a) => a.id !== excludeId);
  }
  // ===================== Compound Lines =====================
  addLine() {
    this.compoundForm.lines.push({ accountId: null, amount: 0, description: "" });
  }
  removeLine(index) {
    if (this.compoundForm.lines.length > 1) {
      this.compoundForm.lines.splice(index, 1);
    }
  }
  getLinesTotal() {
    return this.compoundForm.lines.reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
  }
  getRemaining() {
    return this.compoundForm.totalAmount - this.getLinesTotal();
  }
  isBalanced() {
    return Math.abs(this.getRemaining()) < 0.01;
  }
  // ===================== CRUD =====================
  openSimple() {
    this.journalType.set("simple");
    this.simpleForm = {
      categoryKey: "",
      debitAccountId: null,
      creditAccountId: null,
      amount: 0,
      description: "",
      reference: "",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      operationTypeId: null
    };
    this.error.set("");
    this.showForm.set(true);
  }
  openCompound() {
    this.journalType.set("compound");
    this.compoundForm = {
      categoryKey: "",
      mainAccountId: null,
      totalAmount: 0,
      description: "",
      reference: "",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      operationTypeId: null,
      lines: [{ accountId: null, amount: 0, description: "" }]
    };
    this.error.set("");
    this.showForm.set(true);
  }
  async saveSimple() {
    if (!this.simpleForm.amount || this.simpleForm.amount <= 0) {
      this.error.set("\u0623\u062F\u062E\u0644 \u0627\u0644\u0645\u0628\u0644\u063A");
      return;
    }
    if (!this.simpleForm.categoryKey) {
      this.error.set("\u0627\u062E\u062A\u0631 \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0642\u064A\u062F");
      return;
    }
    if (!this.simpleForm.operationTypeId) {
      this.error.set("\u0627\u062E\u062A\u0631 \u0627\u0633\u0645 \u0627\u0644\u0642\u064A\u062F (\u0627\u0644\u0642\u0627\u0644\u0628)");
      return;
    }
    if (!this.simpleForm.debitAccountId) {
      this.error.set("\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u062F\u064A\u0646");
      return;
    }
    if (!this.simpleForm.creditAccountId) {
      this.error.set("\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u062F\u0627\u0626\u0646");
      return;
    }
    if (!this.simpleForm.description) {
      this.error.set("\u0623\u062F\u062E\u0644 \u0627\u0644\u0628\u064A\u0627\u0646");
      return;
    }
    this.saving.set(true);
    this.error.set("");
    try {
      await this.api.createJournalEntry(this.bizId, {
        categoryKey: this.simpleForm.categoryKey,
        description: this.simpleForm.description,
        date: this.simpleForm.date,
        reference: this.simpleForm.reference,
        operationTypeId: this.simpleForm.operationTypeId,
        lines: [
          { accountId: this.simpleForm.creditAccountId, lineType: "credit", amount: this.simpleForm.amount, description: "\u062F\u0627\u0626\u0646" },
          { accountId: this.simpleForm.debitAccountId, lineType: "debit", amount: this.simpleForm.amount, description: "\u0645\u062F\u064A\u0646" }
        ]
      });
      this.showForm.set(false);
      await this.load();
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
    this.saving.set(false);
  }
  async saveCompound() {
    if (!this.compoundForm.totalAmount || this.compoundForm.totalAmount <= 0) {
      this.error.set("\u0623\u062F\u062E\u0644 \u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
      return;
    }
    if (!this.compoundForm.categoryKey) {
      this.error.set("\u0627\u062E\u062A\u0631 \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0642\u064A\u062F");
      return;
    }
    if (!this.compoundForm.operationTypeId) {
      this.error.set("\u0627\u062E\u062A\u0631 \u0627\u0633\u0645 \u0627\u0644\u0642\u064A\u062F (\u0627\u0644\u0642\u0627\u0644\u0628)");
      return;
    }
    if (!this.compoundForm.mainAccountId) {
      this.error.set("\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0631\u0626\u064A\u0633\u064A");
      return;
    }
    if (!this.isBalanced()) {
      this.error.set("\u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u063A\u064A\u0631 \u0645\u062A\u0633\u0627\u0648\u064A - \u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u0628\u0644\u063A \u0628\u0627\u0644\u0643\u0627\u0645\u0644");
      return;
    }
    if (!this.compoundForm.description) {
      this.error.set("\u0623\u062F\u062E\u0644 \u0627\u0644\u0628\u064A\u0627\u0646");
      return;
    }
    const dir = this.compoundDirection();
    const lines = [];
    lines.push({
      accountId: this.compoundForm.mainAccountId,
      lineType: dir === "one_credit_many_debit" ? "credit" : "debit",
      amount: this.compoundForm.totalAmount,
      description: this.compoundForm.description
    });
    for (const line of this.compoundForm.lines) {
      if (!line.accountId || line.amount <= 0)
        continue;
      lines.push({
        accountId: line.accountId,
        lineType: dir === "one_credit_many_debit" ? "debit" : "credit",
        amount: line.amount,
        description: line.description || this.compoundForm.description
      });
    }
    this.saving.set(true);
    this.error.set("");
    try {
      await this.api.createJournalEntry(this.bizId, {
        categoryKey: this.compoundForm.categoryKey,
        description: this.compoundForm.description,
        date: this.compoundForm.date,
        reference: this.compoundForm.reference,
        operationTypeId: this.compoundForm.operationTypeId,
        lines
      });
      this.showForm.set(false);
      await this.load();
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
    this.saving.set(false);
  }
  async deleteEntry(id) {
    const confirmed = await this.toast.confirm({ title: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", message: "\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0642\u064A\u062F\u061F", type: "danger" });
    if (!confirmed)
      return;
    try {
      await this.api.deleteJournalEntry(id);
      await this.load();
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623");
    }
  }
  // ===================== Helpers =====================
  getAccountName(id) {
    if (!id)
      return "-";
    return this.accounts().find((a) => a.id === id)?.name || "-";
  }
  formatDate(d) {
    return formatDate(d || "");
  }
  formatAmount(amount) {
    return formatAmount(amount);
  }
  getStatusLabel(s) {
    return s === "confirmed" ? "\u0645\u0624\u0643\u062F" : s === "draft" ? "\u0645\u0633\u0648\u062F\u0629" : "\u0645\u0644\u063A\u064A";
  }
  getStatusClass(s) {
    return s === "confirmed" ? "confirmed" : s === "draft" ? "draft" : "cancelled";
  }
  trackById(_, item) {
    return item.id;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275JournalComponent_BaseFactory;
    return function JournalComponent_Factory(__ngFactoryType__) {
      return (\u0275JournalComponent_BaseFactory || (\u0275JournalComponent_BaseFactory = \u0275\u0275getInheritedFactory(_JournalComponent)))(__ngFactoryType__ || _JournalComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _JournalComponent, selectors: [["app-journal"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 54, vars: 9, consts: [[1, "page-content"], [1, "page-header"], [1, "header-right"], [1, "material-icons-round"], ["title", "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F", 1, "help-btn", 3, "click"], [1, "header-actions"], [1, "add-btn", "purple", 3, "click"], [1, "add-btn", "indigo", 3, "click"], [1, "error-bar"], [1, "stats-bar"], [1, "stat-item", "purple-stat"], [1, "stat-icon"], [1, "stat-num"], [1, "stat-label"], [1, "stat-item", "green-stat"], [1, "stat-item", "amber-stat"], [1, "loading-state"], [1, "empty-state"], [1, "journal-list"], [1, "modal-overlay"], [1, "material-icons-round", "spin"], [1, "sub-text"], [1, "journal-card", 3, "unbalanced"], [1, "journal-card"], [1, "jc-header"], [1, "jc-badge"], [1, "card-seq-badge", 2, "font-size", "12px"], [1, "status-badge"], [1, "jc-amount"], [1, "currency"], [1, "jc-desc"], [1, "jc-lines"], [1, "jc-footer"], [1, "jc-date"], [1, "balanced-badge"], [1, "unbalanced-badge"], ["title", "\u062D\u0630\u0641", 1, "action-btn", "delete", 3, "click"], [1, "jc-line", 3, "debit-line", "credit-line"], [1, "jc-line"], [1, "line-type-badge"], [1, "line-account"], [1, "line-amount"], [1, "modal-overlay", 3, "click"], [1, "modal-card", 3, "click"], [1, "modal-header"], [1, "modal-title-row"], [1, "modal-icon", "purple"], [1, "close-btn", 3, "click"], [1, "modal-body"], [1, "form-hint"], [1, "form-row"], [1, "form-group"], [3, "ngModelChange", "ngModel"], [3, "ngValue"], ["type", "number", "placeholder", "0", "min", "1", 3, "ngModelChange", "ngModel"], ["type", "date", 3, "ngModelChange", "ngModel"], ["rows", "2", "placeholder", "\u0648\u0635\u0641 \u0627\u0644\u0642\u064A\u062F...", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0631\u0642\u0645 \u0645\u0631\u062C\u0639\u064A", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-save", "purple-btn", 3, "click", "disabled"], [1, "btn-cancel", 3, "click"], [1, "modal-card", "wide-modal", 3, "click"], [1, "modal-icon", "blue"], [1, "direction-selector"], [1, "dir-btn", 3, "click"], [1, "section-title"], [1, "lines-container"], [1, "line-row"], [1, "add-line-btn", 3, "click"], [1, "balance-check"], [1, "balance-row"], [1, "balance-row", "remaining"], [1, "balance-status", "ok"], [1, "balance-status", "not-ok"], [1, "line-num"], [1, "form-group", 2, "flex", "2"], [1, "form-group", 2, "flex", "1"], ["type", "number", "placeholder", "\u0627\u0644\u0645\u0628\u0644\u063A", "min", "0", 3, "ngModelChange", "ngModel"], ["placeholder", "\u0645\u0644\u0627\u062D\u0638\u0629", 3, "ngModelChange", "ngModel"], [1, "remove-line-btn", 3, "click", "disabled"], [1, "modal-icon", "amber"], [1, "modal-body", "how-it-works"], [1, "hiw-section"], ["dir", "ltr", 2, "font-family", "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace"]], template: function JournalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2")(4, "span", 3);
      \u0275\u0275text(5, "menu_book");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " \u0627\u0644\u0642\u064A\u0648\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628\u064A\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function JournalComponent_Template_button_click_7_listener() {
        return ctx.showHowItWorks.set(true);
      });
      \u0275\u0275elementStart(8, "span", 3);
      \u0275\u0275text(9, "help_outline");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 5)(11, "button", 6);
      \u0275\u0275listener("click", function JournalComponent_Template_button_click_11_listener() {
        return ctx.openSimple();
      });
      \u0275\u0275elementStart(12, "span", 3);
      \u0275\u0275text(13, "note_add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, " \u0642\u064A\u062F \u0628\u0633\u064A\u0637");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "button", 7);
      \u0275\u0275listener("click", function JournalComponent_Template_button_click_15_listener() {
        return ctx.openCompound();
      });
      \u0275\u0275elementStart(16, "span", 3);
      \u0275\u0275text(17, "playlist_add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(18, " \u0642\u064A\u062F \u0645\u062A\u0639\u062F\u062F");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(19, JournalComponent_Conditional_19_Template, 4, 1, "div", 8);
      \u0275\u0275elementStart(20, "div", 9)(21, "div", 10)(22, "span", 11)(23, "span", 3);
      \u0275\u0275text(24, "menu_book");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div")(26, "span", 12);
      \u0275\u0275text(27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "span", 13);
      \u0275\u0275text(29, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0642\u064A\u0648\u062F");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 14)(31, "span", 11)(32, "span", 3);
      \u0275\u0275text(33, "check_circle");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div")(35, "span", 12);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span", 13);
      \u0275\u0275text(38, "\u0645\u062A\u0648\u0627\u0632\u0646");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "div", 15)(40, "span", 11)(41, "span", 3);
      \u0275\u0275text(42, "account_balance");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div")(44, "span", 12);
      \u0275\u0275text(45);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "span", 13);
      \u0275\u0275text(47, "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0642\u064A\u0648\u062F");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(48, JournalComponent_Conditional_48_Template, 5, 0, "div", 16)(49, JournalComponent_Conditional_49_Template, 7, 0, "div", 17)(50, JournalComponent_Conditional_50_Template, 3, 0, "div", 18);
      \u0275\u0275conditionalCreate(51, JournalComponent_Conditional_51_Template, 79, 16, "div", 19);
      \u0275\u0275conditionalCreate(52, JournalComponent_Conditional_52_Template, 110, 31, "div", 19);
      \u0275\u0275conditionalCreate(53, JournalComponent_Conditional_53_Template, 63, 0, "div", 19);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(19);
      \u0275\u0275conditional(ctx.error() ? 19 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.entries().length);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.entries().filter(\u0275\u0275arrowFunction(8, arrowFn0, ctx)).length);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.journalOpTypes().length);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.loading() ? 48 : !ctx.entries().length ? 49 : 50);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showForm() && ctx.journalType() === "simple" ? 51 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showForm() && ctx.journalType() === "compound" ? 52 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showHowItWorks() ? 53 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.help-btn[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--accent-amber);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.help-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.help-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(245, 158, 11, 0.1);\n  transform: scale(1.05);\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.add-btn.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899) !important;\n}\n.add-btn.indigo[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1,\n      #8b5cf6) !important;\n}\n.stats-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.stat-item[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 130px;\n  padding: 14px 18px;\n  border-radius: 14px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: white;\n}\n.purple-stat[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.green-stat[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.amber-stat[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.stat-num[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary);\n  display: block;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.sub-text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.journal-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.journal-card[_ngcontent-%COMP%] {\n  padding: 18px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  box-shadow: var(--shadow-card);\n  transition: all 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.journal-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 4px;\n  height: 100%;\n  background: #6366f1;\n}\n.journal-card.cancelled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.journal-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow-hover);\n}\n.jc-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n.jc-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n  background: rgba(99, 102, 241, 0.15);\n  color: #6366f1;\n}\n.jc-badge[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.jc-number[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  direction: ltr;\n}\n.jc-amount[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin-bottom: 12px;\n}\n.jc-amount[_ngcontent-%COMP%]   .currency[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.jc-entries[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 10px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  background: var(--bg-surface);\n}\n.jc-entry[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.jc-entry[_ngcontent-%COMP%]   .entry-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  display: block;\n  margin-bottom: 2px;\n}\n.jc-entry[_ngcontent-%COMP%]   .entry-value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.jc-entry.debit[_ngcontent-%COMP%]   .entry-label[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.jc-entry.credit[_ngcontent-%COMP%]   .entry-label[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.jc-desc[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-bottom: 10px;\n}\n.jc-desc[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.jc-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding-top: 10px;\n  border-top: 1px solid var(--border-color);\n}\n.jc-date[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  flex: 1;\n}\n.jc-date[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.form-hint[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  background: rgba(99, 102, 241, 0.08);\n  margin-bottom: 16px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #6366f1;\n}\n.form-hint[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.purple-btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899) !important;\n}\n.wide-modal[_ngcontent-%COMP%] {\n  max-width: 820px !important;\n}\n.direction-selector[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.dir-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px;\n  border-radius: 12px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  transition: all 0.2s;\n}\n.dir-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.dir-btn.active[_ngcontent-%COMP%] {\n  border-color: #6366f1;\n  background: rgba(99, 102, 241, 0.08);\n  color: #6366f1;\n}\n.dir-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent-blue);\n}\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 20px 0 14px;\n  padding-bottom: 8px;\n  border-bottom: 2px solid var(--border-color);\n}\n.section-title[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #6366f1;\n}\n.lines-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.line-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  border-radius: 10px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n}\n.line-num[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 8px;\n  background: rgba(99, 102, 241, 0.15);\n  color: #6366f1;\n  font-weight: 900;\n  font-size: 13px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.remove-line-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.remove-line-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.remove-line-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.remove-line-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.3;\n  cursor: not-allowed;\n}\n.add-line-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  width: 100%;\n  padding: 10px;\n  border-radius: 10px;\n  border: 2px dashed var(--border-color);\n  background: transparent;\n  color: var(--text-secondary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  margin-top: 8px;\n  transition: all 0.2s;\n}\n.add-line-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.add-line-btn[_ngcontent-%COMP%]:hover {\n  border-color: #6366f1;\n  color: #6366f1;\n}\n.balance-check[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 14px 18px;\n  border-radius: 12px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n}\n.balance-check.balanced[_ngcontent-%COMP%] {\n  border-color: #22c55e;\n}\n.balance-check.unbalanced[_ngcontent-%COMP%] {\n  border-color: #f59e0b;\n}\n.balance-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 4px 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.balance-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n}\n.balance-row.remaining[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--border-color);\n  padding-top: 8px;\n  margin-top: 4px;\n}\n.red-text[_ngcontent-%COMP%] {\n  color: #ef4444 !important;\n}\n.balance-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 8px;\n  font-size: 13px;\n  font-weight: 700;\n}\n.balance-status[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.balance-status.ok[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.balance-status.not-ok[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.how-it-works[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 10px;\n}\n.how-it-works[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--accent-amber);\n}\n.how-it-works[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.9;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.hiw-section[_ngcontent-%COMP%] {\n  padding: 16px 0;\n  border-bottom: 1px solid var(--border-color);\n}\n.hiw-section[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n@media (max-width: 768px) {\n  .header-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 6px;\n  }\n  .stats-bar[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .stat-item[_ngcontent-%COMP%] {\n    min-width: 100px;\n    padding: 10px;\n  }\n  .jc-entries[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 6px;\n  }\n  .direction-selector[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .line-row[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=journal.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JournalComponent, [{
    type: Component,
    args: [{ selector: "app-journal", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <!-- Header -->\r
  <div class="page-header">\r
    <div class="header-right">\r
      <h2><span class="material-icons-round">menu_book</span> \u0627\u0644\u0642\u064A\u0648\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628\u064A\u0629</h2>\r
      <button class="help-btn" (click)="showHowItWorks.set(true)" title="\u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u061F">\r
        <span class="material-icons-round">help_outline</span>\r
      </button>\r
    </div>\r
    <div class="header-actions">\r
      <button class="add-btn purple" (click)="openSimple()"><span class="material-icons-round">note_add</span> \u0642\u064A\u062F \u0628\u0633\u064A\u0637</button>\r
      <button class="add-btn indigo" (click)="openCompound()"><span class="material-icons-round">playlist_add</span> \u0642\u064A\u062F \u0645\u062A\u0639\u062F\u062F</button>\r
    </div>\r
  </div>\r
\r
  @if (error()) {\r
    <div class="error-bar"><span class="material-icons-round">error</span> {{ error() }}</div>\r
  }\r
\r
  <!-- Stats -->\r
  <div class="stats-bar">\r
    <div class="stat-item purple-stat">\r
      <span class="stat-icon"><span class="material-icons-round">menu_book</span></span>\r
      <div><span class="stat-num">{{ entries().length }}</span><span class="stat-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0642\u064A\u0648\u062F</span></div>\r
    </div>\r
    <div class="stat-item green-stat">\r
      <span class="stat-icon"><span class="material-icons-round">check_circle</span></span>\r
      <div><span class="stat-num">{{ entries().filter(e => e.isBalanced).length }}</span><span class="stat-label">\u0645\u062A\u0648\u0627\u0632\u0646</span></div>\r
    </div>\r
    <div class="stat-item amber-stat">\r
      <span class="stat-icon"><span class="material-icons-round">account_balance</span></span>\r
      <div><span class="stat-num">{{ journalOpTypes().length }}</span><span class="stat-label">\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0642\u064A\u0648\u062F</span></div>\r
    </div>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!entries().length) {\r
    <div class="empty-state">\r
      <span class="material-icons-round">menu_book</span>\r
      <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u064A\u0648\u062F \u0628\u0639\u062F</p>\r
      <p class="sub-text">\u0627\u0644\u0642\u064A\u0648\u062F \u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0644\u0645\u0627 \u0645\u0627 \u064A\u0643\u0648\u0646 \u0641\u064A\u0647 \u0635\u0646\u062F\u0648\u0642 \u0623\u0648 \u0628\u0646\u0643 \u0623\u0648 \u0645\u062D\u0641\u0638\u0629 \u0623\u0648 \u0635\u0631\u0627\u0641 \u0643\u0637\u0631\u0641</p>\r
    </div>\r
  } @else {\r
    <!-- Journal Entries List -->\r
    <div class="journal-list">\r
      @for (entry of entries(); track entry.id) {\r
        <div class="journal-card" [class.unbalanced]="!entry.isBalanced">\r
          <div class="jc-header">\r
            <div class="jc-badge"><span class="material-icons-round">menu_book</span> {{ entry.entryNumber }}</div>\r
            @if (entry.fullSequenceNumber) {\r
              <span class="card-seq-badge" style="font-size:12px">{{ entry.fullSequenceNumber }}</span>\r
            }\r
            <span class="status-badge" [class]="getStatusClass(entry.status)">{{ getStatusLabel(entry.status) }}</span>\r
          </div>\r
          <div class="jc-amount">{{ formatAmount(entry.totalDebit) }} <span class="currency">\u0631.\u064A</span></div>\r
          @if (entry.description) { <div class="jc-desc"><span class="material-icons-round">notes</span> {{ entry.description }}</div> }\r
\r
          <!-- Lines -->\r
          @if (entry.lines?.length) {\r
            <div class="jc-lines">\r
              @for (line of entry.lines; track line.id) {\r
                <div class="jc-line" [class.debit-line]="line.lineType === 'debit'" [class.credit-line]="line.lineType === 'credit'">\r
                  <span class="line-type-badge">{{ line.lineType === 'debit' ? '\u0645\u062F\u064A\u0646' : '\u062F\u0627\u0626\u0646' }}</span>\r
                  <span class="line-account">{{ line.accountName || getAccountName(line.accountId) }}</span>\r
                  <span class="line-amount">{{ formatAmount(line.amount) }}</span>\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          <div class="jc-footer">\r
            <span class="jc-date"><span class="material-icons-round">calendar_today</span> {{ formatDate(entry.entryDate || entry.createdAt) }}</span>\r
            @if (entry.isBalanced) {\r
              <span class="balanced-badge"><span class="material-icons-round">check_circle</span> \u0645\u062A\u0648\u0627\u0632\u0646</span>\r
            } @else {\r
              <span class="unbalanced-badge"><span class="material-icons-round">warning</span> \u063A\u064A\u0631 \u0645\u062A\u0648\u0627\u0632\u0646</span>\r
            }\r
            <button class="action-btn delete" (click)="deleteEntry(entry.id)" title="\u062D\u0630\u0641"><span class="material-icons-round">delete</span></button>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  }\r
\r
  <!-- ===================== Modal: \u0642\u064A\u062F \u0628\u0633\u064A\u0637 ===================== -->\r
  @if (showForm() && journalType() === 'simple') {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-card" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon purple"><span class="material-icons-round">note_add</span></div>\r
            <div><h2>\u0642\u064A\u062F \u0628\u0633\u064A\u0637</h2><p>\u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u2190 \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F</p></div>\r
          </div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          @if (error()) {\r
            <div class="error-bar"><span class="material-icons-round">error</span> {{ error() }}</div>\r
          }\r
          <div class="form-hint">\r
            <span class="material-icons-round">info</span>\r
            <span>\u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0628\u0633\u064A\u0637: \u062D\u0633\u0627\u0628 \u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u064A\u062D\u0648\u0651\u0644 \u0645\u0628\u0644\u063A \u0644\u062D\u0633\u0627\u0628 \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F (\u0628\u062F\u0648\u0646 \u0635\u0646\u062F\u0648\u0642 \u0623\u0648 \u0628\u0646\u0643)</span>\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0642\u064A\u062F *</label>\r
              <select [(ngModel)]="simpleForm.categoryKey">\r
                <option [ngValue]="''">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 --</option>\r
                @for (c of journalCategories(); track c.id) {\r
                  <option [ngValue]="c.categoryKey">\r
                    {{ c.name }}\r
                    @if (c.sortOrder) { (#{{ c.sortOrder }}) }\r
                  </option>\r
                }\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0633\u0645 \u0627\u0644\u0642\u064A\u062F (\u0627\u0644\u0642\u0627\u0644\u0628) *</label>\r
              <select [(ngModel)]="simpleForm.operationTypeId">\r
                <option [ngValue]="null">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0627\u0644\u0628 --</option>\r
                @for (ot of journalOpTypes(); track ot.id) {\r
                  <option [ngValue]="ot.id">\r
                    {{ ot.name }}\r
                    @if (ot.code) { ({{ ot.code }}) }\r
                  </option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
\r
          <div class="form-group">\r
            <label>\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u062F\u0627\u0626\u0646 (\u0627\u0644\u0645\u0635\u062F\u0631) *</label>\r
            <select [(ngModel)]="simpleForm.creditAccountId">\r
              <option [ngValue]="null">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u062F\u0627\u0626\u0646 --</option>\r
              @for (a of getAllAccounts(); track a.id) {\r
                <option [ngValue]="a.id">{{ a.name }}</option>\r
              }\r
            </select>\r
          </div>\r
\r
          <div class="form-group">\r
            <label>\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u062F\u064A\u0646 (\u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644) *</label>\r
            <select [(ngModel)]="simpleForm.debitAccountId">\r
              <option [ngValue]="null">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u062F\u064A\u0646 --</option>\r
              @for (a of getAccountsExcluding(simpleForm.creditAccountId); track a.id) {\r
                <option [ngValue]="a.id">{{ a.name }}</option>\r
              }\r
            </select>\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0628\u0644\u063A *</label>\r
              <input type="number" [(ngModel)]="simpleForm.amount" placeholder="0" min="1" />\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</label>\r
              <input type="date" [(ngModel)]="simpleForm.date" />\r
            </div>\r
          </div>\r
\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0628\u064A\u0627\u0646 *</label>\r
            <textarea [(ngModel)]="simpleForm.description" rows="2" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0642\u064A\u062F..."></textarea>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0645\u0631\u062C\u0639</label>\r
            <input [(ngModel)]="simpleForm.reference" placeholder="\u0631\u0642\u0645 \u0645\u0631\u062C\u0639\u064A" />\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save purple-btn" (click)="saveSimple()" [disabled]="saving()">\r
            <span class="material-icons-round">{{ saving() ? 'sync' : 'save' }}</span>\r
            {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : '\u062D\u0641\u0638 \u0627\u0644\u0642\u064A\u062F' }}\r
          </button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===================== Modal: \u0642\u064A\u062F \u0645\u062A\u0639\u062F\u062F ===================== -->\r
  @if (showForm() && journalType() === 'compound') {\r
    <div class="modal-overlay" (click)="showForm.set(false)">\r
      <div class="modal-card wide-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon blue"><span class="material-icons-round">playlist_add</span></div>\r
            <div><h2>\u0642\u064A\u062F \u0645\u062A\u0639\u062F\u062F</h2><p>\u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u2190 \u0639\u062F\u0629 \u0645\u062F\u064A\u0646\u064A\u0646 (\u0623\u0648 \u0627\u0644\u0639\u0643\u0633)</p></div>\r
          </div>\r
          <button class="close-btn" (click)="showForm.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body">\r
          @if (error()) {\r
            <div class="error-bar"><span class="material-icons-round">error</span> {{ error() }}</div>\r
          }\r
          <!-- Direction -->\r
          <div class="direction-selector">\r
            <button class="dir-btn" [class.active]="compoundDirection() === 'one_credit_many_debit'" (click)="compoundDirection.set('one_credit_many_debit')">\r
              <span class="material-icons-round">arrow_forward</span>\r
              \u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u2190 \u0639\u062F\u0629 \u0645\u062F\u064A\u0646\u064A\u0646\r
            </button>\r
            <button class="dir-btn" [class.active]="compoundDirection() === 'one_debit_many_credit'" (click)="compoundDirection.set('one_debit_many_credit')">\r
              <span class="material-icons-round">arrow_back</span>\r
              \u0639\u062F\u0629 \u062F\u0627\u0626\u0646\u064A\u0646 \u2190 \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F\r
            </button>\r
          </div>\r
\r
          <div class="form-hint">\r
            <span class="material-icons-round">info</span>\r
            @if (compoundDirection() === 'one_credit_many_debit') {\r
              <span>\u062D\u0633\u0627\u0628 \u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u064A\u0648\u0632\u0651\u0639 \u0645\u0628\u0644\u063A \u0639\u0644\u0649 \u0639\u062F\u0629 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062F\u064A\u0646\u0629. \u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0644\u0627\u0632\u0645 \u064A\u062A\u0633\u0627\u0648\u0649.</span>\r
            } @else {\r
              <span>\u0639\u062F\u0629 \u062D\u0633\u0627\u0628\u0627\u062A \u062F\u0627\u0626\u0646\u0629 \u062A\u062C\u0645\u0651\u0639 \u0645\u0628\u0627\u0644\u063A \u0641\u064A \u062D\u0633\u0627\u0628 \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F. \u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0644\u0627\u0632\u0645 \u064A\u062A\u0633\u0627\u0648\u0649.</span>\r
            }\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0642\u064A\u062F *</label>\r
              <select [(ngModel)]="compoundForm.categoryKey">\r
                <option [ngValue]="''">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 --</option>\r
                @for (c of journalCategories(); track c.id) {\r
                  <option [ngValue]="c.categoryKey">\r
                    {{ c.name }}\r
                    @if (c.sortOrder) { (#{{ c.sortOrder }}) }\r
                  </option>\r
                }\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0633\u0645 \u0627\u0644\u0642\u064A\u062F (\u0627\u0644\u0642\u0627\u0644\u0628) *</label>\r
              <select [(ngModel)]="compoundForm.operationTypeId">\r
                <option [ngValue]="null">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0627\u0644\u0628 --</option>\r
                @for (ot of journalOpTypes(); track ot.id) {\r
                  <option [ngValue]="ot.id">\r
                    {{ ot.name }}\r
                    @if (ot.code) { ({{ ot.code }}) }\r
                  </option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
\r
          <!-- Main Account -->\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>{{ compoundDirection() === 'one_credit_many_debit' ? '\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u062F\u0627\u0626\u0646 (\u0627\u0644\u0645\u0635\u062F\u0631)' : '\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u062F\u064A\u0646 (\u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644)' }} *</label>\r
              <select [(ngModel)]="compoundForm.mainAccountId">\r
                <option [ngValue]="null">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628 --</option>\r
                @for (a of getAllAccounts(); track a.id) {\r
                  <option [ngValue]="a.id">{{ a.name }}</option>\r
                }\r
              </select>\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A *</label>\r
              <input type="number" [(ngModel)]="compoundForm.totalAmount" placeholder="0" min="1" />\r
            </div>\r
          </div>\r
\r
          <!-- Lines -->\r
          <div class="section-title">\r
            <span class="material-icons-round">list</span>\r
            {{ compoundDirection() === 'one_credit_many_debit' ? '\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u064A\u0646\u0629 (\u0627\u0644\u062A\u0648\u0632\u064A\u0639)' : '\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u062F\u0627\u0626\u0646\u0629 (\u0627\u0644\u0645\u0635\u0627\u062F\u0631)' }}\r
          </div>\r
\r
          <div class="lines-container">\r
            @for (line of compoundForm.lines; track $index; let i = $index) {\r
              <div class="line-row">\r
                <div class="line-num">{{ i + 1 }}</div>\r
                <div class="form-group" style="flex:2">\r
                  <select [(ngModel)]="line.accountId">\r
                    <option [ngValue]="null">-- \u0627\u062E\u062A\u0631 \u062D\u0633\u0627\u0628 --</option>\r
                    @for (a of getAccountsExcluding(compoundForm.mainAccountId); track a.id) {\r
                      <option [ngValue]="a.id">{{ a.name }}</option>\r
                    }\r
                  </select>\r
                </div>\r
                <div class="form-group" style="flex:1">\r
                  <input type="number" [(ngModel)]="line.amount" placeholder="\u0627\u0644\u0645\u0628\u0644\u063A" min="0" />\r
                </div>\r
                <div class="form-group" style="flex:1">\r
                  <input [(ngModel)]="line.description" placeholder="\u0645\u0644\u0627\u062D\u0638\u0629" />\r
                </div>\r
                <button class="remove-line-btn" (click)="removeLine(i)" [disabled]="compoundForm.lines.length <= 1">\r
                  <span class="material-icons-round">close</span>\r
                </button>\r
              </div>\r
            }\r
          </div>\r
\r
          <button class="add-line-btn" (click)="addLine()">\r
            <span class="material-icons-round">add</span> \u0625\u0636\u0627\u0641\u0629 \u0633\u0637\u0631\r
          </button>\r
\r
          <!-- Balance Check -->\r
          <div class="balance-check" [class.balanced]="isBalanced()" [class.unbalanced]="!isBalanced()">\r
            <div class="balance-row">\r
              <span>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A:</span>\r
              <strong>{{ formatAmount(compoundForm.totalAmount) }}</strong>\r
            </div>\r
            <div class="balance-row">\r
              <span>\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u062A\u0648\u0632\u064A\u0639:</span>\r
              <strong>{{ formatAmount(getLinesTotal()) }}</strong>\r
            </div>\r
            <div class="balance-row remaining">\r
              <span>\u0627\u0644\u0645\u062A\u0628\u0642\u064A:</span>\r
              <strong [class.red-text]="getRemaining() !== 0">{{ formatAmount(getRemaining()) }}</strong>\r
            </div>\r
            @if (isBalanced()) {\r
              <div class="balance-status ok"><span class="material-icons-round">check_circle</span> \u0645\u062A\u0648\u0627\u0632\u0646 - \u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0645\u062A\u0633\u0627\u0648\u064A</div>\r
            } @else {\r
              <div class="balance-status not-ok"><span class="material-icons-round">warning</span> \u063A\u064A\u0631 \u0645\u062A\u0648\u0627\u0632\u0646 - \u0648\u0632\u0651\u0639 \u0627\u0644\u0645\u0628\u0644\u063A \u0628\u0627\u0644\u0643\u0627\u0645\u0644</div>\r
            }\r
          </div>\r
\r
          <div class="form-row">\r
            <div class="form-group">\r
              <label>\u0627\u0644\u0628\u064A\u0627\u0646 *</label>\r
              <textarea [(ngModel)]="compoundForm.description" rows="2" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0642\u064A\u062F..."></textarea>\r
            </div>\r
            <div class="form-group">\r
              <label>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</label>\r
              <input type="date" [(ngModel)]="compoundForm.date" />\r
            </div>\r
          </div>\r
          <div class="form-group">\r
            <label>\u0627\u0644\u0645\u0631\u062C\u0639</label>\r
            <input [(ngModel)]="compoundForm.reference" placeholder="\u0631\u0642\u0645 \u0645\u0631\u062C\u0639\u064A" />\r
          </div>\r
        </div>\r
        <div class="modal-footer">\r
          <button class="btn-save purple-btn" (click)="saveCompound()" [disabled]="!isBalanced() || saving()">\r
            <span class="material-icons-round">{{ saving() ? 'sync' : 'save' }}</span>\r
            {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : '\u062D\u0641\u0638 \u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0639\u062F\u062F' }}\r
          </button>\r
          <button class="btn-cancel" (click)="showForm.set(false)">\u0625\u0644\u063A\u0627\u0621</button>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
\r
  <!-- ===================== Modal: \u0643\u064A\u0641 \u064A\u0639\u0645\u0644 ===================== -->\r
  @if (showHowItWorks()) {\r
    <div class="modal-overlay" (click)="showHowItWorks.set(false)">\r
      <div class="modal-card wide-modal" (click)="$event.stopPropagation()">\r
        <div class="modal-header">\r
          <div class="modal-title-row">\r
            <div class="modal-icon amber"><span class="material-icons-round">help_outline</span></div>\r
            <h2>\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0627\u0644\u0642\u064A\u0648\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628\u064A\u0629\u061F</h2>\r
          </div>\r
          <button class="close-btn" (click)="showHowItWorks.set(false)"><span class="material-icons-round">close</span></button>\r
        </div>\r
        <div class="modal-body how-it-works">\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">help</span> \u0645\u062A\u0649 \u0646\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0642\u064A\u0648\u062F\u061F</h3>\r
            <p>\u0627\u0644\u0642\u064A\u0648\u062F \u062A\u064F\u0633\u062A\u062E\u062F\u0645 \u0644\u0645\u0627 \u0645\u0627 \u064A\u0643\u0648\u0646 \u0641\u064A\u0647 \u0635\u0646\u062F\u0648\u0642 \u0623\u0648 \u0628\u0646\u0643 \u0623\u0648 \u0645\u062D\u0641\u0638\u0629 \u0623\u0648 \u0635\u0631\u0627\u0641 \u0643\u0637\u0631\u0641 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0629. \u0645\u062B\u0644\u0627\u064B: \u062A\u062D\u0648\u064A\u0644 \u0628\u064A\u0646 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u062D\u0627\u0633\u0628\u064A\u0629 \u062F\u0627\u062E\u0644\u064A\u0629.</p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">note_add</span> \u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0628\u0633\u064A\u0637</h3>\r
            <p>\u062D\u0633\u0627\u0628 \u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u064A\u062D\u0648\u0651\u0644 \u0645\u0628\u0644\u063A \u0644\u062D\u0633\u0627\u0628 \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F. \u0645\u062B\u0627\u0644: \u062D\u0633\u0627\u0628 \u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u063A\u0631\u0628\u064A (\u062F\u0627\u0626\u0646) \u2190 \u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u062A\u062D\u0635\u0644\u064A\u0646 (\u0645\u062F\u064A\u0646) \u0628\u0645\u0628\u0644\u063A 50,000 \u0631\u064A\u0627\u0644.</p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">playlist_add</span> \u0627\u0644\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0639\u062F\u062F</h3>\r
            <p>\u062F\u0627\u0626\u0646 \u0648\u0627\u062D\u062F \u0628\u0645\u0628\u0644\u063A 100,000 \u064A\u0648\u0632\u0639\u0647\u0627 \u0639\u0644\u0649 \u0639\u062F\u0629 \u0645\u062F\u064A\u0646\u064A\u0646: 10,000 + 15,000 + 25,000 + 50,000. \u0623\u0648 \u0627\u0644\u0639\u0643\u0633: \u0639\u062F\u0629 \u062F\u0627\u0626\u0646\u064A\u0646 \u064A\u062C\u0645\u0651\u0639\u0648\u0646 \u0641\u064A \u0645\u062F\u064A\u0646 \u0648\u0627\u062D\u062F.</p>\r
            <p><strong>\u0627\u0644\u0645\u0647\u0645:</strong> \u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0644\u0627\u0632\u0645 \u064A\u062A\u0633\u0627\u0648\u0649 - \u0627\u0644\u062F\u0627\u0626\u0646 = \u0627\u0644\u0645\u062F\u064A\u0646.</p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">tag</span> \u062A\u0631\u0642\u064A\u0645 \u0627\u0644\u0642\u064A\u062F</h3>\r
            <p>\r
              \u0631\u0642\u0645 \u0627\u0644\u0642\u064A\u062F \u064A\u064F\u0648\u0644\u0651\u062F \u062D\u0633\u0628 <strong>\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0642\u064A\u062F + \u0627\u0633\u0645 \u0627\u0644\u0642\u064A\u062F (\u0627\u0644\u0642\u0627\u0644\u0628) + \u0627\u0644\u0633\u0646\u0629 + \u062A\u0633\u0644\u0633\u0644 \u064A\u0628\u062F\u0623 \u0645\u0646 1</strong>.\r
            </p>\r
            <p dir="ltr" style="font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace">\r
              QYD-CategoryNo-TemplateCode-YYYY-Serial\r
            </p>\r
            <p>\r
              <small>\u0627\u0644\u062A\u0633\u0644\u0633\u0644 \u064A\u0628\u062F\u0623 \u0645\u0646 <strong>1</strong> \u0644\u0643\u0644 (\u062A\u0635\u0646\u064A\u0641 + \u0642\u0627\u0644\u0628) \u0648\u0644\u0643\u0644 \u0633\u0646\u0629 (\u0648\u0643\u0644 \u0639\u0645\u0644 \u0645\u0646\u0641\u0635\u0644).</small>\r
            </p>\r
          </div>\r
          <div class="hiw-section">\r
            <h3><span class="material-icons-round">filter_list</span> \u0627\u0644\u0641\u0644\u062A\u0631\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629</h3>\r
            <p>\u0644\u0645\u0627 \u062A\u062E\u062A\u0627\u0631 \u0627\u0644\u062F\u0627\u0626\u0646 \u0623\u0648\u0644\u0627\u064B\u060C \u0627\u0644\u0646\u0638\u0627\u0645 \u064A\u0639\u0631\u0636 \u0641\u0642\u0637 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0633\u0645\u0648\u062D\u0629. \u0648\u0627\u0644\u0639\u0643\u0633 \u0635\u062D\u064A\u062D.</p>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/journal/journal.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.help-btn {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--accent-amber);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.help-btn .material-icons-round {\n  font-size: 20px;\n}\n.help-btn:hover {\n  background: rgba(245, 158, 11, 0.1);\n  transform: scale(1.05);\n}\n.header-actions {\n  display: flex;\n  gap: 8px;\n}\n.add-btn.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899) !important;\n}\n.add-btn.indigo {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1,\n      #8b5cf6) !important;\n}\n.stats-bar {\n  display: flex;\n  gap: 14px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.stat-item {\n  flex: 1;\n  min-width: 130px;\n  padding: 14px 18px;\n  border-radius: 14px;\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.stat-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-icon .material-icons-round {\n  font-size: 20px;\n  color: white;\n}\n.purple-stat .stat-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.green-stat .stat-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.amber-stat .stat-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.stat-num {\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--text-primary);\n  display: block;\n}\n.stat-label {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.sub-text {\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n.journal-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.journal-card {\n  padding: 18px 22px;\n  border-radius: 14px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  box-shadow: var(--shadow-card);\n  transition: all 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.journal-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 4px;\n  height: 100%;\n  background: #6366f1;\n}\n.journal-card.cancelled {\n  opacity: 0.5;\n}\n.journal-card:hover {\n  box-shadow: var(--shadow-hover);\n}\n.jc-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n.jc-badge {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n  background: rgba(99, 102, 241, 0.15);\n  color: #6366f1;\n}\n.jc-badge .material-icons-round {\n  font-size: 16px;\n}\n.jc-number {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  direction: ltr;\n}\n.jc-amount {\n  font-size: 24px;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin-bottom: 12px;\n}\n.jc-amount .currency {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.jc-entries {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 10px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  background: var(--bg-surface);\n}\n.jc-entry {\n  flex: 1;\n}\n.jc-entry .entry-label {\n  font-size: 11px;\n  font-weight: 700;\n  display: block;\n  margin-bottom: 2px;\n}\n.jc-entry .entry-value {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.jc-entry.debit .entry-label {\n  color: #ef4444;\n}\n.jc-entry.credit .entry-label {\n  color: #22c55e;\n}\n.jc-desc {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-bottom: 10px;\n}\n.jc-desc .material-icons-round {\n  font-size: 16px;\n}\n.jc-footer {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding-top: 10px;\n  border-top: 1px solid var(--border-color);\n}\n.jc-date {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  flex: 1;\n}\n.jc-date .material-icons-round {\n  font-size: 14px;\n}\n.form-hint {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  background: rgba(99, 102, 241, 0.08);\n  margin-bottom: 16px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #6366f1;\n}\n.form-hint .material-icons-round {\n  font-size: 18px;\n}\n.purple-btn {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899) !important;\n}\n.wide-modal {\n  max-width: 820px !important;\n}\n.direction-selector {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.dir-btn {\n  flex: 1;\n  padding: 12px;\n  border-radius: 12px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  transition: all 0.2s;\n}\n.dir-btn .material-icons-round {\n  font-size: 18px;\n}\n.dir-btn.active {\n  border-color: #6366f1;\n  background: rgba(99, 102, 241, 0.08);\n  color: #6366f1;\n}\n.dir-btn:hover {\n  border-color: var(--accent-blue);\n}\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 20px 0 14px;\n  padding-bottom: 8px;\n  border-bottom: 2px solid var(--border-color);\n}\n.section-title .material-icons-round {\n  font-size: 20px;\n  color: #6366f1;\n}\n.lines-container {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.line-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 12px;\n  border-radius: 10px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n}\n.line-num {\n  width: 28px;\n  height: 28px;\n  border-radius: 8px;\n  background: rgba(99, 102, 241, 0.15);\n  color: #6366f1;\n  font-weight: 900;\n  font-size: 13px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.remove-line-btn {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-muted);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.remove-line-btn .material-icons-round {\n  font-size: 18px;\n}\n.remove-line-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n}\n.remove-line-btn:disabled {\n  opacity: 0.3;\n  cursor: not-allowed;\n}\n.add-line-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  width: 100%;\n  padding: 10px;\n  border-radius: 10px;\n  border: 2px dashed var(--border-color);\n  background: transparent;\n  color: var(--text-secondary);\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  margin-top: 8px;\n  transition: all 0.2s;\n}\n.add-line-btn .material-icons-round {\n  font-size: 18px;\n}\n.add-line-btn:hover {\n  border-color: #6366f1;\n  color: #6366f1;\n}\n.balance-check {\n  margin-top: 16px;\n  padding: 14px 18px;\n  border-radius: 12px;\n  border: 2px solid var(--border-color);\n  background: var(--bg-surface);\n}\n.balance-check.balanced {\n  border-color: #22c55e;\n}\n.balance-check.unbalanced {\n  border-color: #f59e0b;\n}\n.balance-row {\n  display: flex;\n  justify-content: space-between;\n  padding: 4px 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.balance-row strong {\n  color: var(--text-primary);\n}\n.balance-row.remaining {\n  border-top: 1px solid var(--border-color);\n  padding-top: 8px;\n  margin-top: 4px;\n}\n.red-text {\n  color: #ef4444 !important;\n}\n.balance-status {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 8px;\n  font-size: 13px;\n  font-weight: 700;\n}\n.balance-status .material-icons-round {\n  font-size: 18px;\n}\n.balance-status.ok {\n  color: #22c55e;\n}\n.balance-status.not-ok {\n  color: #f59e0b;\n}\n.how-it-works h3 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin-bottom: 10px;\n}\n.how-it-works h3 .material-icons-round {\n  font-size: 20px;\n  color: var(--accent-amber);\n}\n.how-it-works p {\n  font-size: 14px;\n  line-height: 1.9;\n  color: var(--text-secondary);\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.hiw-section {\n  padding: 16px 0;\n  border-bottom: 1px solid var(--border-color);\n}\n.hiw-section:last-child {\n  border-bottom: none;\n}\n@media (max-width: 768px) {\n  .header-actions {\n    flex-direction: column;\n    gap: 6px;\n  }\n  .stats-bar {\n    gap: 8px;\n  }\n  .stat-item {\n    min-width: 100px;\n    padding: 10px;\n  }\n  .jc-entries {\n    flex-direction: column;\n    gap: 6px;\n  }\n  .direction-selector {\n    flex-direction: column;\n  }\n  .line-row {\n    flex-wrap: wrap;\n  }\n}\n/*# sourceMappingURL=journal.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(JournalComponent, { className: "JournalComponent", filePath: "src/app/pages/journal/journal.ts", lineNumber: 26 });
})();
export {
  JournalComponent
};
//# sourceMappingURL=chunk-4EQSDMQ7.js.map
