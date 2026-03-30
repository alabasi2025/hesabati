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
  DatePipe,
  DecimalPipe,
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
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VUZEB5JS.js";

// src/app/pages/reports/reports.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.accountId || $index;
var _forTrack2 = ($index, $item) => $item.type;
var _forTrack3 = ($index, $item) => $item.station;
function ReportsComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function ReportsComponent_For_12_Template_button_click_0_listener() {
      const r_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setReport(r_r2.id));
    });
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activeReport() === r_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.label);
  }
}
function ReportsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 9);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");
    \u0275\u0275elementEnd()();
  }
}
function ReportsComponent_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "h3", 11)(2, "span", 2);
    \u0275\u0275text(3, "dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0645\u0644\u062E\u0635 \u0639\u0627\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 12)(6, "div", 13)(7, "div", 14)(8, "span", 2);
    \u0275\u0275text(9, "account_balance");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 15)(11, "span", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 17);
    \u0275\u0275text(14, "\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 18)(16, "div", 14)(17, "span", 2);
    \u0275\u0275text(18, "savings");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 15)(20, "span", 16);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 17);
    \u0275\u0275text(23, "\u0635\u0646\u062F\u0648\u0642");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 19)(25, "div", 14)(26, "span", 2);
    \u0275\u0275text(27, "groups");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 15)(29, "span", 16);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 17);
    \u0275\u0275text(32, "\u0645\u0648\u0638\u0641");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 20)(34, "div", 14)(35, "span", 2);
    \u0275\u0275text(36, "receipt_long");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 15)(38, "span", 16);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span", 17);
    \u0275\u0275text(41, "\u0633\u0646\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "div", 21)(43, "div", 14)(44, "span", 2);
    \u0275\u0275text(45, "menu_book");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 15)(47, "span", 16);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span", 17);
    \u0275\u0275text(50, "\u0642\u064A\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(51, "div", 22)(52, "div", 14)(53, "span", 2);
    \u0275\u0275text(54, "payments");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 15)(56, "span", 16);
    \u0275\u0275text(57);
    \u0275\u0275pipe(58, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "span", 17);
    \u0275\u0275text(60, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u0648\u0627\u062A\u0628");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(61, "div", 23)(62, "h3", 11)(63, "span", 2);
    \u0275\u0275text(64, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275text(65, " \u0645\u0644\u062E\u0635 \u0627\u0644\u0633\u0646\u062F\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 24)(67, "div", 25)(68, "span", 2);
    \u0275\u0275text(69, "arrow_downward");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div")(71, "span", 26);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "span", 27);
    \u0275\u0275text(74, "\u0633\u0646\u062F \u0642\u0628\u0636");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "span", 28);
    \u0275\u0275text(76);
    \u0275\u0275pipe(77, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 29)(79, "span", 2);
    \u0275\u0275text(80, "arrow_upward");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "div")(82, "span", 26);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "span", 27);
    \u0275\u0275text(85, "\u0633\u0646\u062F \u0635\u0631\u0641");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(86, "span", 28);
    \u0275\u0275text(87);
    \u0275\u0275pipe(88, "number");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r2.stats().totalAccounts);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.stats().totalFunds);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.stats().totalEmployees);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.stats().totalVouchers);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.stats().totalJournal);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(58, 10, ctx_r2.stats().totalSalaries, "1.0-0"));
    \u0275\u0275advance(15);
    \u0275\u0275textInterpolate(ctx_r2.stats().receiptVouchers);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(77, 13, ctx_r2.stats().totalReceipts, "1.0-0"), " \u0631.\u064A");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.stats().paymentVouchers);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(88, 16, ctx_r2.stats().totalPayments, "1.0-0"), " \u0631.\u064A");
  }
}
function ReportsComponent_Conditional_14_Conditional_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 9);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u064A\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629...");
    \u0275\u0275elementEnd()();
  }
}
function ReportsComponent_Conditional_14_Conditional_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "span", 2);
    \u0275\u0275text(2, "balance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A - \u0642\u0645 \u0628\u0625\u0646\u0634\u0627\u0621 \u0633\u0646\u062F\u0627\u062A \u0623\u0648\u0644\u0627\u064B");
    \u0275\u0275elementEnd()();
  }
}
function ReportsComponent_Conditional_14_Conditional_2_Conditional_20_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 42);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 43);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 44);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    const \u0275$index_262_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_262_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r5.accountName || row_r5.name || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r5.accountCode || row_r5.code || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatAmount(row_r5.totalDebit || row_r5.debit));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatAmount(row_r5.totalCredit || row_r5.credit));
    \u0275\u0275advance();
    \u0275\u0275classProp("text-green", (row_r5.balance || 0) > 0)("text-red", (row_r5.balance || 0) < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatAmount(row_r5.balance), " ");
  }
}
function ReportsComponent_Conditional_14_Conditional_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 38)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0633\u0645 \u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0631\u0645\u0632 \u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 39);
    \u0275\u0275text(10, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062F\u064A\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 39);
    \u0275\u0275text(12, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0627\u0626\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 39);
    \u0275\u0275text(14, "\u0627\u0644\u0631\u0635\u064A\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, ReportsComponent_Conditional_14_Conditional_2_Conditional_20_For_17_Template, 13, 10, "tr", null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "tfoot")(19, "tr", 40)(20, "td", 41)(21, "strong");
    \u0275\u0275text(22, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "td", 42)(24, "strong");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "td", 43)(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "td", 44)(30, "strong");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(32, "div", 45)(33, "span", 2);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r2.trialBalance());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.formatAmount(ctx_r2.getTrialTotalDebit()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatAmount(ctx_r2.getTrialTotalCredit()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatAmount(ctx_r2.getTrialTotalBalance()));
    \u0275\u0275advance();
    \u0275\u0275classProp("balanced", ctx_r2.getTrialTotalDebit() === ctx_r2.getTrialTotalCredit());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getTrialTotalDebit() === ctx_r2.getTrialTotalCredit() ? "check_circle" : "warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getTrialTotalDebit() === ctx_r2.getTrialTotalCredit() ? "\u0627\u0644\u0645\u064A\u0632\u0627\u0646 \u0645\u062A\u0648\u0627\u0632\u0646" : "\u0627\u0644\u0645\u064A\u0632\u0627\u0646 \u063A\u064A\u0631 \u0645\u062A\u0648\u0627\u0632\u0646 - \u064A\u0648\u062C\u062F \u0641\u0631\u0642: " + ctx_r2.formatAmount(ctx_r2.getTrialTotalDebit() - ctx_r2.getTrialTotalCredit()), " ");
  }
}
function ReportsComponent_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "h3", 11)(2, "span", 2);
    \u0275\u0275text(3, "balance");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0645\u064A\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 30)(6, "div", 31)(7, "label", 32);
    \u0275\u0275text(8, "\u0645\u0646 \u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 33);
    \u0275\u0275listener("ngModelChange", function ReportsComponent_Conditional_14_Conditional_2_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.trialDateFrom.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 31)(11, "label", 34);
    \u0275\u0275text(12, "\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 35);
    \u0275\u0275listener("ngModelChange", function ReportsComponent_Conditional_14_Conditional_2_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.trialDateTo.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 36);
    \u0275\u0275listener("click", function ReportsComponent_Conditional_14_Conditional_2_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.loadTrialBalance());
    });
    \u0275\u0275elementStart(15, "span", 2);
    \u0275\u0275text(16, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " \u0639\u0631\u0636 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, ReportsComponent_Conditional_14_Conditional_2_Conditional_18_Template, 5, 0, "div", 6)(19, ReportsComponent_Conditional_14_Conditional_2_Conditional_19_Template, 5, 0, "div", 37)(20, ReportsComponent_Conditional_14_Conditional_2_Conditional_20_Template, 36, 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r2.trialDateFrom());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.trialDateTo());
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.trialLoading() ? 18 : !ctx_r2.trialBalance().length ? 19 : 20);
  }
}
function ReportsComponent_Conditional_14_Conditional_3_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const acc_r8 = ctx.$implicit;
    \u0275\u0275property("ngValue", acc_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", acc_r8.name, " (", acc_r8.code || "-", ")");
  }
}
function ReportsComponent_Conditional_14_Conditional_3_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 9);
    \u0275\u0275text(2, "sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0643\u0634\u0641 \u0627\u0644\u062D\u0633\u0627\u0628...");
    \u0275\u0275elementEnd()();
  }
}
function ReportsComponent_Conditional_14_Conditional_3_Conditional_41_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "span", 2);
    \u0275\u0275text(2, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0631\u0643\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd()();
  }
}
function ReportsComponent_Conditional_14_Conditional_3_Conditional_41_Conditional_9_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 64);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 42);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 43);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 44);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r9 = ctx.$implicit;
    const \u0275$index_442_r10 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_442_r10 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(entry_r9.date || entry_r9.entryDate));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getSourceTypeLabel(entry_r9.source_type || entry_r9.sourceType));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r9.entry_description || entry_r9.line_description || entry_r9.description || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r9.debit ? ctx_r2.formatAmount(entry_r9.debit) : "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r9.credit ? ctx_r2.formatAmount(entry_r9.credit) : "-");
    \u0275\u0275advance();
    \u0275\u0275classProp("text-green", (entry_r9.runningBalance || 0) > 0)("text-red", (entry_r9.runningBalance || 0) < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatAmount(entry_r9.runningBalance || entry_r9.balance), " ");
  }
}
function ReportsComponent_Conditional_14_Conditional_3_Conditional_41_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 38)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 39);
    \u0275\u0275text(12, "\u0645\u062F\u064A\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 39);
    \u0275\u0275text(14, "\u062F\u0627\u0626\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 39);
    \u0275\u0275text(16, "\u0627\u0644\u0631\u0635\u064A\u062F");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, ReportsComponent_Conditional_14_Conditional_3_Conditional_41_Conditional_9_For_19_Template, 15, 11, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "tfoot")(21, "tr", 40)(22, "td", 63)(23, "strong");
    \u0275\u0275text(24, "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "td", 42)(26, "strong");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "td", 43)(29, "strong");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "td", 44)(32, "strong");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r2.statementData());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.formatAmount(ctx_r2.getStatementTotalDebit()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatAmount(ctx_r2.getStatementTotalCredit()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatAmount(ctx_r2.getStatementTotalDebit() - ctx_r2.getStatementTotalCredit()));
  }
}
function ReportsComponent_Conditional_14_Conditional_3_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "div", 62)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(8, ReportsComponent_Conditional_14_Conditional_3_Conditional_41_Conditional_8_Template, 5, 0, "div", 37)(9, ReportsComponent_Conditional_14_Conditional_3_Conditional_41_Conditional_9_Template, 34, 3, "table", 38);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.statementAccount().name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0631\u0645\u0632: ", ctx_r2.statementAccount().code || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u0646\u0648\u0639: ", ctx_r2.getAccountTypeLabel(ctx_r2.statementAccount().accountType));
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.statementData().length ? 8 : 9);
  }
}
function ReportsComponent_Conditional_14_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "h3", 11)(2, "span", 2);
    \u0275\u0275text(3, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0643\u0634\u0641 \u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 30)(6, "div", 31)(7, "label", 47);
    \u0275\u0275text(8, "\u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "select", 48);
    \u0275\u0275listener("ngModelChange", function ReportsComponent_Conditional_14_Conditional_3_Template_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectedAccountId.set($event));
    });
    \u0275\u0275elementStart(10, "option", 49);
    \u0275\u0275text(11, "-- \u0627\u062E\u062A\u0631 \u062D\u0633\u0627\u0628\u0627\u064B --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(12, ReportsComponent_Conditional_14_Conditional_3_For_13_Template, 2, 3, "option", 49, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 31)(15, "label", 50);
    \u0275\u0275text(16, "\u0645\u0646 \u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 51);
    \u0275\u0275listener("ngModelChange", function ReportsComponent_Conditional_14_Conditional_3_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.statementDateFrom.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 31)(19, "label", 52);
    \u0275\u0275text(20, "\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 53);
    \u0275\u0275listener("ngModelChange", function ReportsComponent_Conditional_14_Conditional_3_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.statementDateTo.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 31)(23, "label", 54);
    \u0275\u0275text(24, "\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "select", 55);
    \u0275\u0275listener("ngModelChange", function ReportsComponent_Conditional_14_Conditional_3_Template_select_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.statementSourceType.set($event));
    });
    \u0275\u0275elementStart(26, "option", 56);
    \u0275\u0275text(27, "\u0627\u0644\u0643\u0644");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 57);
    \u0275\u0275text(29, "\u0633\u0646\u062F \u0635\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 58);
    \u0275\u0275text(31, "\u0633\u0646\u062F \u0642\u0628\u0636");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option", 59);
    \u0275\u0275text(33, "\u0642\u064A\u062F \u064A\u0648\u0645\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "option", 60);
    \u0275\u0275text(35, "\u062D\u0631\u0643\u0629 \u0645\u062E\u0632\u0646\u064A\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "button", 36);
    \u0275\u0275listener("click", function ReportsComponent_Conditional_14_Conditional_3_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.loadAccountStatement());
    });
    \u0275\u0275elementStart(37, "span", 2);
    \u0275\u0275text(38, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275text(39, " \u0639\u0631\u0636 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(40, ReportsComponent_Conditional_14_Conditional_3_Conditional_40_Template, 5, 0, "div", 6)(41, ReportsComponent_Conditional_14_Conditional_3_Conditional_41_Template, 10, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r2.selectedAccountId());
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.accounts());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r2.statementDateFrom());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.statementDateTo());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.statementSourceType());
    \u0275\u0275advance(15);
    \u0275\u0275conditional(ctx_r2.statementLoading() ? 40 : ctx_r2.statementAccount() ? 41 : -1);
  }
}
function ReportsComponent_Conditional_14_Conditional_4_For_6_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r11 = ctx.$implicit;
    const \u0275$index_530_r12 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_530_r12 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r11.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r11.code || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r11.currencyCode || "YER");
  }
}
function ReportsComponent_Conditional_14_Conditional_4_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 66)(2, "h4");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 67);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "table", 68)(7, "thead")(8, "tr")(9, "th");
    \u0275\u0275text(10, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0627\u0633\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u0631\u0645\u0632");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u0639\u0645\u0644\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, ReportsComponent_Conditional_14_Conditional_4_For_6_For_19_Template, 9, 4, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const group_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.getAccountTypeLabel(group_r13.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r13.count);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(group_r13.items);
  }
}
function ReportsComponent_Conditional_14_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "h3", 11)(2, "span", 2);
    \u0275\u0275text(3, "account_balance");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, ReportsComponent_Conditional_14_Conditional_4_For_6_Template, 20, 2, "div", 65, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A (", ctx_r2.accounts().length, ")");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.accountsByType());
  }
}
function ReportsComponent_Conditional_14_Conditional_5_For_6_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r14 = ctx.$implicit;
    const \u0275$index_582_r15 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_582_r15 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r14.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r14.stationName || "-");
  }
}
function ReportsComponent_Conditional_14_Conditional_5_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 66)(2, "h4");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 67);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "table", 68)(7, "thead")(8, "tr")(9, "th");
    \u0275\u0275text(10, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0627\u0633\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, ReportsComponent_Conditional_14_Conditional_5_For_6_For_17_Template, 7, 3, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const group_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.getFundTypeLabel(group_r16.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r16.count);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(group_r16.items);
  }
}
function ReportsComponent_Conditional_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "h3", 11)(2, "span", 2);
    \u0275\u0275text(3, "savings");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, ReportsComponent_Conditional_14_Conditional_5_For_6_Template, 18, 2, "div", 65, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 (", ctx_r2.funds().length, ")");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.fundsByType());
  }
}
function ReportsComponent_Conditional_14_Conditional_6_For_6_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 70);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td")(11, "span", 71);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const e_r17 = ctx.$implicit;
    const \u0275$index_641_r18 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_641_r18 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r17.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(e_r17.jobTitle || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 7, e_r17.salary, "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(e_r17.status === "active" ? "active" : "inactive");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(e_r17.status === "active" ? "\u0646\u0634\u0637" : "\u063A\u064A\u0631 \u0646\u0634\u0637");
  }
}
function ReportsComponent_Conditional_14_Conditional_6_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 66)(2, "h4");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 67);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 69);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "table", 68)(10, "thead")(11, "tr")(12, "th");
    \u0275\u0275text(13, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "\u0627\u0644\u0627\u0633\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "\u0627\u0644\u0645\u0633\u0645\u0649");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "\u0627\u0644\u0631\u0627\u062A\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody");
    \u0275\u0275repeaterCreate(23, ReportsComponent_Conditional_14_Conditional_6_For_6_For_24_Template, 13, 10, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const group_r19 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(group_r19.station);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", group_r19.count, " \u0645\u0648\u0638\u0641");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(8, 3, group_r19.totalSalary, "1.0-0"), " \u0631.\u064A");
    \u0275\u0275advance(16);
    \u0275\u0275repeater(group_r19.items);
  }
}
function ReportsComponent_Conditional_14_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "h3", 11)(2, "span", 2);
    \u0275\u0275text(3, "groups");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0631\u0648\u0627\u062A\u0628");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, ReportsComponent_Conditional_14_Conditional_6_For_6_Template, 25, 6, "div", 65, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.employeesByStation());
  }
}
function ReportsComponent_Conditional_14_Conditional_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "span", 2);
    \u0275\u0275text(2, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u0646\u062F\u0627\u062A");
    \u0275\u0275elementEnd()();
  }
}
function ReportsComponent_Conditional_14_Conditional_7_Conditional_6_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 72);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 44);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "span", 71);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 64);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const v_r20 = ctx.$implicit;
    const \u0275$index_710_r21 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_710_r21 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(v_r20.voucherNumber || "-");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(v_r20.voucherType === "receipt" ? "receipt" : "payment");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(v_r20.voucherType === "receipt" ? "\u0642\u0628\u0636" : "\u0635\u0631\u0641");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(10, 11, v_r20.amount, "1.0-0"), " \u0631.\u064A");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(v_r20.description || "-");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(v_r20.status || "unreviewed");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(v_r20.status === "reviewed" ? "\u0645\u0631\u0627\u062C\u0639" : "\u063A\u064A\u0631 \u0645\u0631\u0627\u062C\u0639");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 14, v_r20.voucherDate || v_r20.createdAt, "yyyy/MM/dd"));
  }
}
function ReportsComponent_Conditional_14_Conditional_7_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 38)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u0631\u0642\u0645");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0627\u0644\u0646\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "\u0627\u0644\u0645\u0628\u0644\u063A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "\u0627\u0644\u062D\u0627\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, ReportsComponent_Conditional_14_Conditional_7_Conditional_6_For_19_Template, 19, 17, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r2.vouchers());
  }
}
function ReportsComponent_Conditional_14_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "h3", 11)(2, "span", 2);
    \u0275\u0275text(3, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ReportsComponent_Conditional_14_Conditional_7_Conditional_5_Template, 5, 0, "div", 37)(6, ReportsComponent_Conditional_14_Conditional_7_Conditional_6_Template, 20, 0, "table", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0646\u062F\u0627\u062A (", ctx_r2.vouchers().length, ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.vouchers().length ? 5 : 6);
  }
}
function ReportsComponent_Conditional_14_Conditional_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "span", 2);
    \u0275\u0275text(2, "menu_book");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u064A\u0648\u062C\u062F \u0642\u064A\u0648\u062F");
    \u0275\u0275elementEnd()();
  }
}
function ReportsComponent_Conditional_14_Conditional_8_Conditional_6_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 64);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const j_r22 = ctx.$implicit;
    const \u0275$index_776_r23 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_776_r23 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(j_r22.description || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 3, j_r22.entryDate || j_r22.createdAt, "yyyy/MM/dd"));
  }
}
function ReportsComponent_Conditional_14_Conditional_8_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 38)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "\u0627\u0644\u0648\u0635\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275repeaterCreate(10, ReportsComponent_Conditional_14_Conditional_8_Conditional_6_For_11_Template, 8, 6, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r2.journalEntries());
  }
}
function ReportsComponent_Conditional_14_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "h3", 11)(2, "span", 2);
    \u0275\u0275text(3, "menu_book");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, ReportsComponent_Conditional_14_Conditional_8_Conditional_5_Template, 5, 0, "div", 37)(6, ReportsComponent_Conditional_14_Conditional_8_Conditional_6_Template, 12, 0, "table", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0642\u064A\u0648\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628\u064A\u0629 (", ctx_r2.journalEntries().length, ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.journalEntries().length ? 5 : 6);
  }
}
function ReportsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275conditionalCreate(1, ReportsComponent_Conditional_14_Conditional_1_Template, 89, 19, "div", 10);
    \u0275\u0275conditionalCreate(2, ReportsComponent_Conditional_14_Conditional_2_Template, 21, 3, "div", 10);
    \u0275\u0275conditionalCreate(3, ReportsComponent_Conditional_14_Conditional_3_Template, 42, 6, "div", 10);
    \u0275\u0275conditionalCreate(4, ReportsComponent_Conditional_14_Conditional_4_Template, 7, 1, "div", 10);
    \u0275\u0275conditionalCreate(5, ReportsComponent_Conditional_14_Conditional_5_Template, 7, 1, "div", 10);
    \u0275\u0275conditionalCreate(6, ReportsComponent_Conditional_14_Conditional_6_Template, 7, 0, "div", 10);
    \u0275\u0275conditionalCreate(7, ReportsComponent_Conditional_14_Conditional_7_Template, 7, 2, "div", 10);
    \u0275\u0275conditionalCreate(8, ReportsComponent_Conditional_14_Conditional_8_Template, 7, 2, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeReport() === "overview" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeReport() === "trial-balance" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeReport() === "statement" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeReport() === "accounts" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeReport() === "funds" ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeReport() === "employees" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeReport() === "vouchers" ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeReport() === "journal" ? 8 : -1);
  }
}
var ReportsComponent = class _ReportsComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  activeReport = signal("overview", ...ngDevMode ? [{ debugName: "activeReport" }] : (
    /* istanbul ignore next */
    []
  ));
  // بيانات التقارير
  stats = signal({}, ...ngDevMode ? [{ debugName: "stats" }] : (
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
  employees = signal([], ...ngDevMode ? [{ debugName: "employees" }] : (
    /* istanbul ignore next */
    []
  ));
  vouchers = signal([], ...ngDevMode ? [{ debugName: "vouchers" }] : (
    /* istanbul ignore next */
    []
  ));
  journalEntries = signal([], ...ngDevMode ? [{ debugName: "journalEntries" }] : (
    /* istanbul ignore next */
    []
  ));
  // ميزان المراجعة
  trialBalance = signal([], ...ngDevMode ? [{ debugName: "trialBalance" }] : (
    /* istanbul ignore next */
    []
  ));
  trialLoading = signal(false, ...ngDevMode ? [{ debugName: "trialLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  trialDateFrom = signal("", ...ngDevMode ? [{ debugName: "trialDateFrom" }] : (
    /* istanbul ignore next */
    []
  ));
  trialDateTo = signal("", ...ngDevMode ? [{ debugName: "trialDateTo" }] : (
    /* istanbul ignore next */
    []
  ));
  // كشف حساب
  statementData = signal([], ...ngDevMode ? [{ debugName: "statementData" }] : (
    /* istanbul ignore next */
    []
  ));
  statementAccount = signal(null, ...ngDevMode ? [{ debugName: "statementAccount" }] : (
    /* istanbul ignore next */
    []
  ));
  statementLoading = signal(false, ...ngDevMode ? [{ debugName: "statementLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  statementDateFrom = signal("", ...ngDevMode ? [{ debugName: "statementDateFrom" }] : (
    /* istanbul ignore next */
    []
  ));
  statementDateTo = signal("", ...ngDevMode ? [{ debugName: "statementDateTo" }] : (
    /* istanbul ignore next */
    []
  ));
  statementSourceType = signal("all", ...ngDevMode ? [{ debugName: "statementSourceType" }] : (
    /* istanbul ignore next */
    []
  ));
  selectedAccountId = signal(null, ...ngDevMode ? [{ debugName: "selectedAccountId" }] : (
    /* istanbul ignore next */
    []
  ));
  // فلاتر
  dateFrom = signal("", ...ngDevMode ? [{ debugName: "dateFrom" }] : (
    /* istanbul ignore next */
    []
  ));
  dateTo = signal("", ...ngDevMode ? [{ debugName: "dateTo" }] : (
    /* istanbul ignore next */
    []
  ));
  reportTypes = [
    { id: "overview", label: "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629", icon: "dashboard" },
    { id: "trial-balance", label: "\u0645\u064A\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629", icon: "balance" },
    { id: "statement", label: "\u0643\u0634\u0641 \u062D\u0633\u0627\u0628", icon: "description" },
    { id: "accounts", label: "\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A", icon: "account_balance" },
    { id: "funds", label: "\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642", icon: "savings" },
    { id: "employees", label: "\u0627\u0644\u0631\u0648\u0627\u062A\u0628", icon: "groups" },
    { id: "vouchers", label: "\u0627\u0644\u0633\u0646\u062F\u0627\u062A", icon: "receipt_long" },
    { id: "journal", label: "\u0627\u0644\u0642\u064A\u0648\u062F", icon: "menu_book" }
  ];
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const [accs, fds, emps, vouchers, journal] = await Promise.all([
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
        this.api.getEmployees(this.bizId),
        this.api.getVouchers(this.bizId),
        this.api.getJournalEntries(this.bizId)
      ]);
      this.accounts.set(accs);
      this.funds.set(fds);
      this.employees.set(emps);
      this.vouchers.set(vouchers);
      this.journalEntries.set(journal);
      this.stats.set({
        totalAccounts: accs.length,
        totalFunds: fds.length,
        totalEmployees: emps.length,
        totalVouchers: vouchers.length,
        totalJournal: journal.length,
        totalSalaries: emps.reduce((s, e) => s + Number(e.salary || 0), 0),
        receiptVouchers: vouchers.filter((v) => v.voucherType === "receipt").length,
        paymentVouchers: vouchers.filter((v) => v.voucherType === "payment").length,
        totalReceipts: vouchers.filter((v) => v.voucherType === "receipt").reduce((s, v) => s + Number(v.amount || 0), 0),
        totalPayments: vouchers.filter((v) => v.voucherType === "payment").reduce((s, v) => s + Number(v.amount || 0), 0)
      });
    } catch (e) {
      console.error(e);
    }
    this.loading.set(false);
  }
  setReport(id) {
    this.activeReport.set(id);
    if (id === "trial-balance" && this.trialBalance().length === 0) {
      this.loadTrialBalance();
    }
  }
  // ===================== ميزان المراجعة =====================
  async loadTrialBalance() {
    this.trialLoading.set(true);
    try {
      const params = {};
      if (this.trialDateFrom())
        params.dateFrom = this.trialDateFrom();
      if (this.trialDateTo())
        params.dateTo = this.trialDateTo();
      const result = await this.api.getTrialBalance(this.bizId, params.dateFrom, params.dateTo);
      this.trialBalance.set(Array.isArray(result) ? result : result.accounts || []);
    } catch (e) {
      this.toast.error("\u062E\u0637\u0623 \u0641\u064A \u062C\u0644\u0628 \u0645\u064A\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629: " + (e instanceof Error ? e.message : ""));
      this.trialBalance.set([]);
    }
    this.trialLoading.set(false);
  }
  getTrialTotalDebit() {
    return this.trialBalance().reduce((s, a) => s + Number(a.totalDebit || a.debit || 0), 0);
  }
  getTrialTotalCredit() {
    return this.trialBalance().reduce((s, a) => s + Number(a.totalCredit || a.credit || 0), 0);
  }
  getTrialTotalBalance() {
    return this.trialBalance().reduce((s, a) => s + Number(a.balance || 0), 0);
  }
  // ===================== كشف حساب =====================
  async loadAccountStatement() {
    const accId = this.selectedAccountId();
    if (!accId) {
      this.toast.warning("\u0627\u062E\u062A\u0631 \u062D\u0633\u0627\u0628\u0627\u064B \u0623\u0648\u0644\u0627\u064B");
      return;
    }
    this.statementLoading.set(true);
    try {
      const params = {};
      if (this.statementDateFrom())
        params.dateFrom = this.statementDateFrom();
      if (this.statementDateTo())
        params.dateTo = this.statementDateTo();
      const result = await this.api.getAccountStatement(this.bizId, accId, params.dateFrom, params.dateTo, this.statementSourceType());
      this.statementData.set(Array.isArray(result) ? result : result.entries || []);
      this.statementAccount.set(this.accounts().find((a) => a.id === accId));
    } catch (e) {
      this.toast.error("\u062E\u0637\u0623 \u0641\u064A \u062C\u0644\u0628 \u0643\u0634\u0641 \u0627\u0644\u062D\u0633\u0627\u0628: " + (e instanceof Error ? e.message : ""));
      this.statementData.set([]);
    }
    this.statementLoading.set(false);
  }
  getStatementTotalDebit() {
    return this.statementData().reduce((s, e) => {
      if (e?.debit !== void 0 && e?.debit !== null)
        return s + Number(e.debit || 0);
      return s + (String(e?.line_type || "").toLowerCase() === "debit" ? Number(e?.amount || 0) : 0);
    }, 0);
  }
  getStatementTotalCredit() {
    return this.statementData().reduce((s, e) => {
      if (e?.credit !== void 0 && e?.credit !== null)
        return s + Number(e.credit || 0);
      return s + (String(e?.line_type || "").toLowerCase() === "credit" ? Number(e?.amount || 0) : 0);
    }, 0);
  }
  getSourceTypeLabel(sourceType) {
    const map = {
      payment_voucher: "\u0633\u0646\u062F \u0635\u0631\u0641",
      receipt_voucher: "\u0633\u0646\u062F \u0642\u0628\u0636",
      journal_manual: "\u0642\u064A\u062F \u064A\u0648\u0645\u064A\u0629",
      inventory_txn: "\u062D\u0631\u0643\u0629 \u0645\u062E\u0632\u0646\u064A\u0629"
    };
    return map[String(sourceType || "")] || "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";
  }
  // ===================== طباعة =====================
  printReport() {
    const printArea = document.getElementById("report-print-area");
    if (!printArea)
      return;
    const printWindow = window.open("", "_blank");
    if (!printWindow)
      return;
    printWindow.document.write(`
      <html dir="rtl"><head>
        <title>\u062A\u0642\u0631\u064A\u0631 - ${this.biz.currentBusinessName()}</title>
        <style>
          body { font-family: 'Tajawal', sans-serif; padding: 20px; direction: rtl; color: #1e293b; }
          .print-header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
          .print-header h2 { margin: 0 0 4px; font-size: 20px; }
          .print-header p { margin: 0; font-size: 13px; color: #666; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: right; font-size: 13px; }
          th { background: #f1f5f9; font-weight: 700; }
          .total-row { font-weight: 900; background: #f8fafc; }
          .amount { font-family: monospace; }
          .text-green { color: #16a34a; }
          .text-red { color: #dc2626; }
          .text-blue { color: #2563eb; }
          @media print { body { padding: 0; } }
        </style>
      </head><body>
        <div class="print-header">
          <h2>${this.biz.currentBusinessName()}</h2>
          <p>${this.getReportTitle()} - ${(/* @__PURE__ */ new Date()).toLocaleDateString("ar-YE")}</p>
        </div>
        ${printArea.innerHTML}
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 300);
  }
  getReportTitle() {
    const r = this.reportTypes.find((r2) => r2.id === this.activeReport());
    return r?.label || "\u062A\u0642\u0631\u064A\u0631";
  }
  // تجميع الحسابات حسب النوع
  accountsByType() {
    const groups = {};
    for (const a of this.accounts()) {
      const t = a.accountType || "other";
      if (!groups[t])
        groups[t] = [];
      groups[t].push(a);
    }
    return Object.entries(groups).map(([type, items]) => ({ type, items, count: items.length }));
  }
  // تجميع الصناديق حسب النوع
  fundsByType() {
    const groups = {};
    for (const f of this.funds()) {
      const t = f.fundType || "other";
      if (!groups[t])
        groups[t] = [];
      groups[t].push(f);
    }
    return Object.entries(groups).map(([type, items]) => ({ type, items, count: items.length }));
  }
  // تجميع الموظفين حسب المحطة
  employeesByStation() {
    const groups = {};
    for (const e of this.employees()) {
      const s = e.stationName || "\u0627\u0644\u0625\u062F\u0627\u0631\u0629";
      if (!groups[s])
        groups[s] = [];
      groups[s].push(e);
    }
    return Object.entries(groups).map(([station, items]) => ({
      station,
      items,
      count: items.length,
      totalSalary: items.reduce((s, e) => s + Number(e.salary || 0), 0)
    }));
  }
  getAccountTypeLabel(t) {
    const map = {
      fund: "\u0635\u0646\u062F\u0648\u0642",
      bank: "\u0628\u0646\u0643",
      e_wallet: "\u0645\u062D\u0641\u0638\u0629",
      exchange: "\u0635\u0631\u0627\u0641",
      accounting: "\u0623\u062E\u0631\u0649",
      custody: "\u0639\u0647\u062F\u0629",
      billing: "\u0641\u0648\u062A\u0631\u0629",
      warehouse: "\u0645\u062E\u0632\u0646",
      supplier: "\u0645\u0648\u0631\u062F",
      employee: "\u0645\u0648\u0638\u0641",
      partner: "\u0634\u0631\u064A\u0643",
      budget: "\u0645\u064A\u0632\u0627\u0646\u064A\u0629",
      settlement: "\u062A\u0635\u0641\u064A\u0629",
      pending: "\u0645\u0639\u0644\u0642\u0629"
    };
    return map[t] || t;
  }
  getFundTypeLabel(t) {
    const map = {
      collection: "\u062A\u062D\u0635\u064A\u0644",
      salary_advance: "\u0633\u0644\u0641 \u0631\u0648\u0627\u062A\u0628",
      custody: "\u0639\u0647\u062F\u0629",
      safe: "\u062E\u0632\u0646\u0629",
      expense: "\u0645\u0635\u0631\u0648\u0641\u0627\u062A",
      deposit: "\u0625\u064A\u062F\u0627\u0639"
    };
    return map[t] || t;
  }
  formatAmount(n) {
    return formatAmount(n);
  }
  formatDate(d) {
    if (!d)
      return "-";
    return formatDate(d);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ReportsComponent_BaseFactory;
    return function ReportsComponent_Factory(__ngFactoryType__) {
      return (\u0275ReportsComponent_BaseFactory || (\u0275ReportsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_ReportsComponent)))(__ngFactoryType__ || _ReportsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportsComponent, selectors: [["app-reports"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 15, vars: 1, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "print-btn", 3, "click"], [1, "report-tabs"], [1, "report-tab", 3, "active"], [1, "loading-state"], ["id", "report-print-area"], [1, "report-tab", 3, "click"], [1, "material-icons-round", "spin"], [1, "report-section"], [1, "section-title"], [1, "stats-grid"], [1, "stat-card", "amber"], [1, "stat-icon"], [1, "stat-info"], [1, "stat-num"], [1, "stat-lbl"], [1, "stat-card", "blue"], [1, "stat-card", "green"], [1, "stat-card", "purple"], [1, "stat-card", "red"], [1, "stat-card", "teal"], [1, "voucher-summary"], [1, "voucher-cards"], [1, "voucher-card", "receipt"], [1, "v-num"], [1, "v-lbl"], [1, "v-amount"], [1, "voucher-card", "payment"], [1, "filter-bar"], [1, "filter-group"], ["for", "trial-date-from"], ["id", "trial-date-from", "title", "\u0645\u0646 \u062A\u0627\u0631\u064A\u062E", "type", "date", 3, "ngModelChange", "ngModel"], ["for", "trial-date-to"], ["id", "trial-date-to", "title", "\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E", "type", "date", 3, "ngModelChange", "ngModel"], [1, "filter-btn", 3, "click"], [1, "empty-state"], [1, "data-table"], [1, "amount-col"], [1, "total-row"], ["colspan", "3"], [1, "amount-cell", "text-green"], [1, "amount-cell", "text-red"], [1, "amount-cell"], [1, "balance-indicator"], [1, "name-cell"], ["for", "statement-account"], ["id", "statement-account", "title", "\u0627\u0644\u062D\u0633\u0627\u0628", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["for", "statement-date-from"], ["id", "statement-date-from", "title", "\u0645\u0646 \u062A\u0627\u0631\u064A\u062E", "type", "date", 3, "ngModelChange", "ngModel"], ["for", "statement-date-to"], ["id", "statement-date-to", "title", "\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E", "type", "date", 3, "ngModelChange", "ngModel"], ["for", "statement-source-type"], ["id", "statement-source-type", "title", "\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629", 3, "ngModelChange", "ngModel"], ["value", "all"], ["value", "payment_voucher"], ["value", "receipt_voucher"], ["value", "journal_manual"], ["value", "inventory_txn"], [1, "statement-header"], [1, "stmt-info"], ["colspan", "4"], [1, "date-cell"], [1, "group-card"], [1, "group-header"], [1, "group-count"], [1, "data-table", "compact"], [1, "group-total"], [1, "salary-cell"], [1, "status-badge"], [1, "type-badge"]], template: function ReportsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "assessment");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function ReportsComponent_Template_button_click_6_listener() {
        return ctx.printReport();
      });
      \u0275\u0275elementStart(7, "span", 2);
      \u0275\u0275text(8, "print");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9, " \u0637\u0628\u0627\u0639\u0629 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 4);
      \u0275\u0275repeaterCreate(11, ReportsComponent_For_12_Template, 5, 4, "button", 5, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(13, ReportsComponent_Conditional_13_Template, 5, 0, "div", 6)(14, ReportsComponent_Conditional_14_Template, 9, 8, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.reportTypes);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 13 : 14);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DecimalPipe, DatePipe], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: _ngcontent-%COMP%_fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.print-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.3s;\n}\n.print-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.print-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n  border-color: rgba(59, 130, 246, 0.3);\n  transform: translateY(-2px);\n}\n.report-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  padding-bottom: 16px;\n  border-bottom: 1px solid var(--border-color);\n}\n.report-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.3s;\n}\n.report-tab[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.report-tab[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  transform: translateY(-2px);\n}\n.report-tab.active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.report-section[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fade-in 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 20px;\n}\n.section-title[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: var(--accent-amber);\n}\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 14px;\n  flex-wrap: wrap;\n  margin-bottom: 24px;\n  padding: 18px 20px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  box-shadow: var(--shadow-card);\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.filter-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  color: var(--text-primary);\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  font-weight: 600;\n  min-width: 160px;\n  transition: all 0.2s;\n}\n.filter-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n}\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  min-width: 240px;\n}\n.filter-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  font-size: 14px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.3s;\n}\n.filter-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.filter-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.balance-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 16px;\n  padding: 14px 20px;\n  border-radius: 12px;\n  font-size: 15px;\n  font-weight: 700;\n  background: rgba(239, 68, 68, 0.08);\n  color: #ef4444;\n  border: 1px solid rgba(239, 68, 68, 0.2);\n}\n.balance-indicator[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.balance-indicator.balanced[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.08);\n  color: #22c55e;\n  border-color: rgba(34, 197, 94, 0.2);\n}\n.statement-header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  padding: 16px 20px;\n  background: rgba(59, 130, 246, 0.06);\n  border: 1px solid rgba(59, 130, 246, 0.15);\n  border-radius: 12px;\n}\n.stmt-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.stmt-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.stmt-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 20px;\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.stat-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.stat-num[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.stat-lbl[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.stat-card.amber[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.stat-card.blue[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.stat-card.green[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.stat-card.purple[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.stat-card.red[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.stat-card.teal[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #14b8a6,\n      #06b6d4);\n}\n.voucher-summary[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.voucher-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.voucher-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 20px 24px;\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.voucher-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.voucher-card[_ngcontent-%COMP%]   .v-num[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.voucher-card[_ngcontent-%COMP%]   .v-lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.voucher-card[_ngcontent-%COMP%]   .v-amount[_ngcontent-%COMP%] {\n  margin-right: auto;\n  font-size: 18px;\n  font-weight: 800;\n}\n.voucher-card.receipt[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.06);\n}\n.voucher-card.receipt[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.voucher-card.receipt[_ngcontent-%COMP%]   .v-amount[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.voucher-card.payment[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.06);\n}\n.voucher-card.payment[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.voucher-card.payment[_ngcontent-%COMP%]   .v-amount[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.group-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 16px;\n  padding: 20px;\n  margin-bottom: 20px;\n  box-shadow: var(--shadow-card);\n}\n.group-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 14px;\n}\n.group-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.group-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n  background: rgba(59, 130, 246, 0.12);\n  color: #3b82f6;\n}\n.group-total[_ngcontent-%COMP%] {\n  margin-right: auto;\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--accent-green);\n}\n.data-table.compact[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  font-size: 12px;\n}\n.data-table.compact[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  font-size: 13px;\n}\n.name-cell[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.salary-cell[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: var(--accent-green);\n  direction: ltr;\n  text-align: right;\n}\n.amount-cell[_ngcontent-%COMP%] {\n  font-weight: 800;\n  direction: ltr;\n  text-align: right;\n}\n.amount-col[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.date-cell[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  direction: ltr;\n  text-align: right;\n}\n.text-green[_ngcontent-%COMP%] {\n  color: #22c55e !important;\n}\n.text-red[_ngcontent-%COMP%] {\n  color: #ef4444 !important;\n}\n.text-blue[_ngcontent-%COMP%] {\n  color: #3b82f6 !important;\n}\n.total-row[_ngcontent-%COMP%] {\n  background: var(--bg-surface);\n}\n.total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  font-size: 14px !important;\n}\n.type-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n}\n.type-badge.receipt[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.type-badge.payment[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%], \n.status-badge.confirmed[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.status-badge.inactive[_ngcontent-%COMP%], \n.status-badge.cancelled[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.status-badge.draft[_ngcontent-%COMP%] {\n  background: rgba(249, 115, 22, 0.15);\n  color: #f97316;\n}\n@media (max-width: 640px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .voucher-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .filter-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n   .filter-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: auto;\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=reports.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportsComponent, [{
    type: Component,
    args: [{ selector: "app-reports", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">assessment</span> \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631</h2>\r
    <button class="print-btn" (click)="printReport()">\r
      <span class="material-icons-round">print</span> \u0637\u0628\u0627\u0639\u0629\r
    </button>\r
  </div>\r
\r
  <!-- \u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 -->\r
  <div class="report-tabs">\r
    @for (r of reportTypes; track r.id) {\r
      <button class="report-tab" [class.active]="activeReport() === r.id" (click)="setReport(r.id)">\r
        <span class="material-icons-round">{{ r.icon }}</span>\r
        <span>{{ r.label }}</span>\r
      </button>\r
    }\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p></div>\r
  } @else {\r
\r
    <div id="report-print-area">\r
\r
    <!-- \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0646\u0638\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 -->\r
    @if (activeReport() === 'overview') {\r
      <div class="report-section">\r
        <h3 class="section-title"><span class="material-icons-round">dashboard</span> \u0645\u0644\u062E\u0635 \u0639\u0627\u0645</h3>\r
        <div class="stats-grid">\r
          <div class="stat-card amber"><div class="stat-icon"><span class="material-icons-round">account_balance</span></div><div class="stat-info"><span class="stat-num">{{ stats().totalAccounts }}</span><span class="stat-lbl">\u062D\u0633\u0627\u0628</span></div></div>\r
          <div class="stat-card blue"><div class="stat-icon"><span class="material-icons-round">savings</span></div><div class="stat-info"><span class="stat-num">{{ stats().totalFunds }}</span><span class="stat-lbl">\u0635\u0646\u062F\u0648\u0642</span></div></div>\r
          <div class="stat-card green"><div class="stat-icon"><span class="material-icons-round">groups</span></div><div class="stat-info"><span class="stat-num">{{ stats().totalEmployees }}</span><span class="stat-lbl">\u0645\u0648\u0638\u0641</span></div></div>\r
          <div class="stat-card purple"><div class="stat-icon"><span class="material-icons-round">receipt_long</span></div><div class="stat-info"><span class="stat-num">{{ stats().totalVouchers }}</span><span class="stat-lbl">\u0633\u0646\u062F</span></div></div>\r
          <div class="stat-card red"><div class="stat-icon"><span class="material-icons-round">menu_book</span></div><div class="stat-info"><span class="stat-num">{{ stats().totalJournal }}</span><span class="stat-lbl">\u0642\u064A\u062F</span></div></div>\r
          <div class="stat-card teal"><div class="stat-icon"><span class="material-icons-round">payments</span></div><div class="stat-info"><span class="stat-num">{{ stats().totalSalaries | number:'1.0-0' }}</span><span class="stat-lbl">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u0648\u0627\u062A\u0628</span></div></div>\r
        </div>\r
\r
        <div class="voucher-summary">\r
          <h3 class="section-title"><span class="material-icons-round">receipt_long</span> \u0645\u0644\u062E\u0635 \u0627\u0644\u0633\u0646\u062F\u0627\u062A</h3>\r
          <div class="voucher-cards">\r
            <div class="voucher-card receipt">\r
              <span class="material-icons-round">arrow_downward</span>\r
              <div><span class="v-num">{{ stats().receiptVouchers }}</span><span class="v-lbl">\u0633\u0646\u062F \u0642\u0628\u0636</span></div>\r
              <span class="v-amount">{{ stats().totalReceipts | number:'1.0-0' }} \u0631.\u064A</span>\r
            </div>\r
            <div class="voucher-card payment">\r
              <span class="material-icons-round">arrow_upward</span>\r
              <div><span class="v-num">{{ stats().paymentVouchers }}</span><span class="v-lbl">\u0633\u0646\u062F \u0635\u0631\u0641</span></div>\r
              <span class="v-amount">{{ stats().totalPayments | number:'1.0-0' }} \u0631.\u064A</span>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- \u0645\u064A\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 -->\r
    @if (activeReport() === 'trial-balance') {\r
      <div class="report-section">\r
        <h3 class="section-title"><span class="material-icons-round">balance</span> \u0645\u064A\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</h3>\r
\r
        <div class="filter-bar">\r
          <div class="filter-group">\r
            <label for="trial-date-from">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>\r
            <input id="trial-date-from" title="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E" type="date" [ngModel]="trialDateFrom()" (ngModelChange)="trialDateFrom.set($event)">\r
          </div>\r
          <div class="filter-group">\r
            <label for="trial-date-to">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>\r
            <input id="trial-date-to" title="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E" type="date" [ngModel]="trialDateTo()" (ngModelChange)="trialDateTo.set($event)">\r
          </div>\r
          <button class="filter-btn" (click)="loadTrialBalance()">\r
            <span class="material-icons-round">search</span> \u0639\u0631\u0636\r
          </button>\r
        </div>\r
\r
        @if (trialLoading()) {\r
          <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u064A\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629...</p></div>\r
        } @else if (!trialBalance().length) {\r
          <div class="empty-state"><span class="material-icons-round">balance</span><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A - \u0642\u0645 \u0628\u0625\u0646\u0634\u0627\u0621 \u0633\u0646\u062F\u0627\u062A \u0623\u0648\u0644\u0627\u064B</p></div>\r
        } @else {\r
          <table class="data-table">\r
            <thead>\r
              <tr>\r
                <th>#</th>\r
                <th>\u0627\u0633\u0645 \u0627\u0644\u062D\u0633\u0627\u0628</th>\r
                <th>\u0631\u0645\u0632 \u0627\u0644\u062D\u0633\u0627\u0628</th>\r
                <th class="amount-col">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062F\u064A\u0646</th>\r
                <th class="amount-col">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0627\u0626\u0646</th>\r
                <th class="amount-col">\u0627\u0644\u0631\u0635\u064A\u062F</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @for (row of trialBalance(); track row.accountId || $index; let i = $index) {\r
                <tr>\r
                  <td>{{ i + 1 }}</td>\r
                  <td class="name-cell">{{ row.accountName || row.name || '-' }}</td>\r
                  <td>{{ row.accountCode || row.code || '-' }}</td>\r
                  <td class="amount-cell text-green">{{ formatAmount(row.totalDebit || row.debit) }}</td>\r
                  <td class="amount-cell text-red">{{ formatAmount(row.totalCredit || row.credit) }}</td>\r
                  <td class="amount-cell" [class.text-green]="(row.balance || 0) > 0" [class.text-red]="(row.balance || 0) < 0">\r
                    {{ formatAmount(row.balance) }}\r
                  </td>\r
                </tr>\r
              }\r
            </tbody>\r
            <tfoot>\r
              <tr class="total-row">\r
                <td colspan="3"><strong>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</strong></td>\r
                <td class="amount-cell text-green"><strong>{{ formatAmount(getTrialTotalDebit()) }}</strong></td>\r
                <td class="amount-cell text-red"><strong>{{ formatAmount(getTrialTotalCredit()) }}</strong></td>\r
                <td class="amount-cell"><strong>{{ formatAmount(getTrialTotalBalance()) }}</strong></td>\r
              </tr>\r
            </tfoot>\r
          </table>\r
\r
          <div class="balance-indicator" [class.balanced]="getTrialTotalDebit() === getTrialTotalCredit()">\r
            <span class="material-icons-round">{{ getTrialTotalDebit() === getTrialTotalCredit() ? 'check_circle' : 'warning' }}</span>\r
            {{ getTrialTotalDebit() === getTrialTotalCredit() ? '\u0627\u0644\u0645\u064A\u0632\u0627\u0646 \u0645\u062A\u0648\u0627\u0632\u0646' : '\u0627\u0644\u0645\u064A\u0632\u0627\u0646 \u063A\u064A\u0631 \u0645\u062A\u0648\u0627\u0632\u0646 - \u064A\u0648\u062C\u062F \u0641\u0631\u0642: ' + formatAmount(getTrialTotalDebit() - getTrialTotalCredit()) }}\r
          </div>\r
        }\r
      </div>\r
    }\r
\r
    <!-- \u0643\u0634\u0641 \u062D\u0633\u0627\u0628 -->\r
    @if (activeReport() === 'statement') {\r
      <div class="report-section">\r
        <h3 class="section-title"><span class="material-icons-round">description</span> \u0643\u0634\u0641 \u062D\u0633\u0627\u0628</h3>\r
\r
        <div class="filter-bar">\r
          <div class="filter-group">\r
            <label for="statement-account">\u0627\u0644\u062D\u0633\u0627\u0628</label>\r
            <select id="statement-account" title="\u0627\u0644\u062D\u0633\u0627\u0628" [ngModel]="selectedAccountId()" (ngModelChange)="selectedAccountId.set($event)">\r
              <option [ngValue]="null">-- \u0627\u062E\u062A\u0631 \u062D\u0633\u0627\u0628\u0627\u064B --</option>\r
              @for (acc of accounts(); track acc.id) {\r
                <option [ngValue]="acc.id">{{ acc.name }} ({{ acc.code || '-' }})</option>\r
              }\r
            </select>\r
          </div>\r
          <div class="filter-group">\r
            <label for="statement-date-from">\u0645\u0646 \u062A\u0627\u0631\u064A\u062E</label>\r
            <input id="statement-date-from" title="\u0645\u0646 \u062A\u0627\u0631\u064A\u062E" type="date" [ngModel]="statementDateFrom()" (ngModelChange)="statementDateFrom.set($event)">\r
          </div>\r
          <div class="filter-group">\r
            <label for="statement-date-to">\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E</label>\r
            <input id="statement-date-to" title="\u0625\u0644\u0649 \u062A\u0627\u0631\u064A\u062E" type="date" [ngModel]="statementDateTo()" (ngModelChange)="statementDateTo.set($event)">\r
          </div>\r
          <div class="filter-group">\r
            <label for="statement-source-type">\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629</label>\r
            <select id="statement-source-type" title="\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629" [ngModel]="statementSourceType()" (ngModelChange)="statementSourceType.set($event)">\r
              <option value="all">\u0627\u0644\u0643\u0644</option>\r
              <option value="payment_voucher">\u0633\u0646\u062F \u0635\u0631\u0641</option>\r
              <option value="receipt_voucher">\u0633\u0646\u062F \u0642\u0628\u0636</option>\r
              <option value="journal_manual">\u0642\u064A\u062F \u064A\u0648\u0645\u064A\u0629</option>\r
              <option value="inventory_txn">\u062D\u0631\u0643\u0629 \u0645\u062E\u0632\u0646\u064A\u0629</option>\r
            </select>\r
          </div>\r
          <button class="filter-btn" (click)="loadAccountStatement()">\r
            <span class="material-icons-round">search</span> \u0639\u0631\u0636\r
          </button>\r
        </div>\r
\r
        @if (statementLoading()) {\r
          <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0643\u0634\u0641 \u0627\u0644\u062D\u0633\u0627\u0628...</p></div>\r
        } @else if (statementAccount()) {\r
          <div class="statement-header">\r
            <div class="stmt-info">\r
              <strong>{{ statementAccount().name }}</strong>\r
              <span>\u0631\u0645\u0632: {{ statementAccount().code || '-' }}</span>\r
              <span>\u0646\u0648\u0639: {{ getAccountTypeLabel(statementAccount().accountType) }}</span>\r
            </div>\r
          </div>\r
\r
          @if (!statementData().length) {\r
            <div class="empty-state"><span class="material-icons-round">description</span><p>\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0631\u0643\u0627\u062A \u0644\u0647\u0630\u0627 \u0627\u0644\u062D\u0633\u0627\u0628</p></div>\r
          } @else {\r
            <table class="data-table">\r
              <thead>\r
                <tr>\r
                  <th>#</th>\r
                  <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>\r
                  <th>\u0646\u0648\u0639 \u0627\u0644\u062D\u0631\u0643\u0629</th>\r
                  <th>\u0627\u0644\u0648\u0635\u0641</th>\r
                  <th class="amount-col">\u0645\u062F\u064A\u0646</th>\r
                  <th class="amount-col">\u062F\u0627\u0626\u0646</th>\r
                  <th class="amount-col">\u0627\u0644\u0631\u0635\u064A\u062F</th>\r
                </tr>\r
              </thead>\r
              <tbody>\r
                @for (entry of statementData(); track $index; let i = $index) {\r
                  <tr>\r
                    <td>{{ i + 1 }}</td>\r
                    <td class="date-cell">{{ formatDate(entry.date || entry.entryDate) }}</td>\r
                    <td>{{ getSourceTypeLabel(entry.source_type || entry.sourceType) }}</td>\r
                    <td>{{ entry.entry_description || entry.line_description || entry.description || '-' }}</td>\r
                    <td class="amount-cell text-green">{{ entry.debit ? formatAmount(entry.debit) : '-' }}</td>\r
                    <td class="amount-cell text-red">{{ entry.credit ? formatAmount(entry.credit) : '-' }}</td>\r
                    <td class="amount-cell" [class.text-green]="(entry.runningBalance || 0) > 0" [class.text-red]="(entry.runningBalance || 0) < 0">\r
                      {{ formatAmount(entry.runningBalance || entry.balance) }}\r
                    </td>\r
                  </tr>\r
                }\r
              </tbody>\r
              <tfoot>\r
                <tr class="total-row">\r
                  <td colspan="4"><strong>\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</strong></td>\r
                  <td class="amount-cell text-green"><strong>{{ formatAmount(getStatementTotalDebit()) }}</strong></td>\r
                  <td class="amount-cell text-red"><strong>{{ formatAmount(getStatementTotalCredit()) }}</strong></td>\r
                  <td class="amount-cell"><strong>{{ formatAmount(getStatementTotalDebit() - getStatementTotalCredit()) }}</strong></td>\r
                </tr>\r
              </tfoot>\r
            </table>\r
          }\r
        }\r
      </div>\r
    }\r
\r
    <!-- \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A -->\r
    @if (activeReport() === 'accounts') {\r
      <div class="report-section">\r
        <h3 class="section-title"><span class="material-icons-round">account_balance</span> \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A ({{ accounts().length }})</h3>\r
        @for (group of accountsByType(); track group.type) {\r
          <div class="group-card">\r
            <div class="group-header"><h4>{{ getAccountTypeLabel(group.type) }}</h4><span class="group-count">{{ group.count }}</span></div>\r
            <table class="data-table compact">\r
              <thead><tr><th>#</th><th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u0631\u0645\u0632</th><th>\u0627\u0644\u0639\u0645\u0644\u0629</th></tr></thead>\r
              <tbody>\r
                @for (a of group.items; track a.id; let i = $index) {\r
                  <tr><td>{{ i + 1 }}</td><td class="name-cell">{{ a.name }}</td><td>{{ a.code || '-' }}</td><td>{{ a.currencyCode || 'YER' }}</td></tr>\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
        }\r
      </div>\r
    }\r
\r
    <!-- \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 -->\r
    @if (activeReport() === 'funds') {\r
      <div class="report-section">\r
        <h3 class="section-title"><span class="material-icons-round">savings</span> \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 ({{ funds().length }})</h3>\r
        @for (group of fundsByType(); track group.type) {\r
          <div class="group-card">\r
            <div class="group-header"><h4>{{ getFundTypeLabel(group.type) }}</h4><span class="group-count">{{ group.count }}</span></div>\r
            <table class="data-table compact">\r
              <thead><tr><th>#</th><th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u0645\u062D\u0637\u0629</th></tr></thead>\r
              <tbody>\r
                @for (f of group.items; track f.id; let i = $index) {\r
                  <tr><td>{{ i + 1 }}</td><td class="name-cell">{{ f.name }}</td><td>{{ f.stationName || '-' }}</td></tr>\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
        }\r
      </div>\r
    }\r
\r
    <!-- \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0631\u0648\u0627\u062A\u0628 -->\r
    @if (activeReport() === 'employees') {\r
      <div class="report-section">\r
        <h3 class="section-title"><span class="material-icons-round">groups</span> \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0631\u0648\u0627\u062A\u0628</h3>\r
        @for (group of employeesByStation(); track group.station) {\r
          <div class="group-card">\r
            <div class="group-header"><h4>{{ group.station }}</h4><span class="group-count">{{ group.count }} \u0645\u0648\u0638\u0641</span><span class="group-total">{{ group.totalSalary | number:'1.0-0' }} \u0631.\u064A</span></div>\r
            <table class="data-table compact">\r
              <thead><tr><th>#</th><th>\u0627\u0644\u0627\u0633\u0645</th><th>\u0627\u0644\u0645\u0633\u0645\u0649</th><th>\u0627\u0644\u0631\u0627\u062A\u0628</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th></tr></thead>\r
              <tbody>\r
                @for (e of group.items; track e.id; let i = $index) {\r
                  <tr>\r
                    <td>{{ i + 1 }}</td><td class="name-cell">{{ e.fullName }}</td><td>{{ e.jobTitle || '-' }}</td>\r
                    <td class="salary-cell">{{ e.salary | number:'1.0-0' }}</td>\r
                    <td><span class="status-badge" [class]="e.status === 'active' ? 'active' : 'inactive'">{{ e.status === 'active' ? '\u0646\u0634\u0637' : '\u063A\u064A\u0631 \u0646\u0634\u0637' }}</span></td>\r
                  </tr>\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
        }\r
      </div>\r
    }\r
\r
    <!-- \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0646\u062F\u0627\u062A -->\r
    @if (activeReport() === 'vouchers') {\r
      <div class="report-section">\r
        <h3 class="section-title"><span class="material-icons-round">receipt_long</span> \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0646\u062F\u0627\u062A ({{ vouchers().length }})</h3>\r
        @if (!vouchers().length) {\r
          <div class="empty-state"><span class="material-icons-round">receipt_long</span><p>\u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u0646\u062F\u0627\u062A</p></div>\r
        } @else {\r
          <table class="data-table">\r
            <thead><tr><th>#</th><th>\u0627\u0644\u0631\u0642\u0645</th><th>\u0627\u0644\u0646\u0648\u0639</th><th>\u0627\u0644\u0645\u0628\u0644\u063A</th><th>\u0627\u0644\u0648\u0635\u0641</th><th>\u0627\u0644\u062D\u0627\u0644\u0629</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th></tr></thead>\r
            <tbody>\r
              @for (v of vouchers(); track v.id; let i = $index) {\r
                <tr>\r
                  <td>{{ i + 1 }}</td>\r
                  <td>{{ v.voucherNumber || '-' }}</td>\r
                  <td><span class="type-badge" [class]="v.voucherType === 'receipt' ? 'receipt' : 'payment'">{{ v.voucherType === 'receipt' ? '\u0642\u0628\u0636' : '\u0635\u0631\u0641' }}</span></td>\r
                  <td class="amount-cell">{{ v.amount | number:'1.0-0' }} \u0631.\u064A</td>\r
                  <td>{{ v.description || '-' }}</td>\r
                  <td><span class="status-badge" [class]="v.status || 'unreviewed'">{{ v.status === 'reviewed' ? '\u0645\u0631\u0627\u062C\u0639' : '\u063A\u064A\u0631 \u0645\u0631\u0627\u062C\u0639' }}</span></td>\r
                  <td class="date-cell">{{ v.voucherDate || v.createdAt | date:'yyyy/MM/dd' }}</td>\r
                </tr>\r
              }\r
            </tbody>\r
          </table>\r
        }\r
      </div>\r
    }\r
\r
    <!-- \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0642\u064A\u0648\u062F -->\r
    @if (activeReport() === 'journal') {\r
      <div class="report-section">\r
        <h3 class="section-title"><span class="material-icons-round">menu_book</span> \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0642\u064A\u0648\u062F \u0627\u0644\u0645\u062D\u0627\u0633\u0628\u064A\u0629 ({{ journalEntries().length }})</h3>\r
        @if (!journalEntries().length) {\r
          <div class="empty-state"><span class="material-icons-round">menu_book</span><p>\u0644\u0627 \u064A\u0648\u062C\u062F \u0642\u064A\u0648\u062F</p></div>\r
        } @else {\r
          <table class="data-table">\r
            <thead><tr><th>#</th><th>\u0627\u0644\u0648\u0635\u0641</th><th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th></tr></thead>\r
            <tbody>\r
              @for (j of journalEntries(); track j.id; let i = $index) {\r
                <tr><td>{{ i + 1 }}</td><td>{{ j.description || '-' }}</td><td class="date-cell">{{ j.entryDate || j.createdAt | date:'yyyy/MM/dd' }}</td></tr>\r
              }\r
            </tbody>\r
          </table>\r
        }\r
      </div>\r
    }\r
\r
    </div><!-- end report-print-area -->\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/reports/reports.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.print-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.3s;\n}\n.print-btn .material-icons-round {\n  font-size: 18px;\n}\n.print-btn:hover {\n  background: rgba(59, 130, 246, 0.1);\n  color: #3b82f6;\n  border-color: rgba(59, 130, 246, 0.3);\n  transform: translateY(-2px);\n}\n.report-tabs {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  padding-bottom: 16px;\n  border-bottom: 1px solid var(--border-color);\n}\n.report-tab {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-size: 14px;\n  font-weight: 700;\n  cursor: pointer;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.3s;\n}\n.report-tab .material-icons-round {\n  font-size: 20px;\n}\n.report-tab:hover {\n  background: var(--bg-card-hover);\n  transform: translateY(-2px);\n}\n.report-tab.active {\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  border-color: transparent;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.report-section {\n  animation: fade-in 0.3s ease;\n}\n@keyframes fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.section-title {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 20px;\n}\n.section-title .material-icons-round {\n  font-size: 22px;\n  color: var(--accent-amber);\n}\n.filter-bar {\n  display: flex;\n  align-items: flex-end;\n  gap: 14px;\n  flex-wrap: wrap;\n  margin-bottom: 24px;\n  padding: 18px 20px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  box-shadow: var(--shadow-card);\n}\n.filter-group {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.filter-group label {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text-secondary);\n}\n.filter-group input,\n.filter-group select {\n  padding: 10px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-card);\n  color: var(--text-primary);\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  font-weight: 600;\n  min-width: 160px;\n  transition: all 0.2s;\n}\n.filter-group input:focus,\n.filter-group select:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n}\n.filter-group select {\n  min-width: 240px;\n}\n.filter-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n  color: white;\n  font-size: 14px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  transition: all 0.3s;\n}\n.filter-btn .material-icons-round {\n  font-size: 18px;\n}\n.filter-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.balance-indicator {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 16px;\n  padding: 14px 20px;\n  border-radius: 12px;\n  font-size: 15px;\n  font-weight: 700;\n  background: rgba(239, 68, 68, 0.08);\n  color: #ef4444;\n  border: 1px solid rgba(239, 68, 68, 0.2);\n}\n.balance-indicator .material-icons-round {\n  font-size: 22px;\n}\n.balance-indicator.balanced {\n  background: rgba(34, 197, 94, 0.08);\n  color: #22c55e;\n  border-color: rgba(34, 197, 94, 0.2);\n}\n.statement-header {\n  margin-bottom: 20px;\n  padding: 16px 20px;\n  background: rgba(59, 130, 246, 0.06);\n  border: 1px solid rgba(59, 130, 246, 0.15);\n  border-radius: 12px;\n}\n.stmt-info {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.stmt-info strong {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.stmt-info span {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.stat-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 20px;\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n  transition: all 0.3s;\n}\n.stat-card:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);\n}\n.stat-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.stat-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.stat-info {\n  display: flex;\n  flex-direction: column;\n}\n.stat-num {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.stat-lbl {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.stat-card.amber .stat-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.stat-card.blue .stat-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.stat-card.green .stat-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.stat-card.purple .stat-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.stat-card.red .stat-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.stat-card.teal .stat-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #14b8a6,\n      #06b6d4);\n}\n.voucher-summary {\n  margin-bottom: 24px;\n}\n.voucher-cards {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n}\n.voucher-card {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 20px 24px;\n  border-radius: 16px;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.voucher-card .material-icons-round {\n  font-size: 28px;\n}\n.voucher-card .v-num {\n  display: block;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.voucher-card .v-lbl {\n  display: block;\n  font-size: 12px;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.voucher-card .v-amount {\n  margin-right: auto;\n  font-size: 18px;\n  font-weight: 800;\n}\n.voucher-card.receipt {\n  background: rgba(34, 197, 94, 0.06);\n}\n.voucher-card.receipt .material-icons-round {\n  color: #22c55e;\n}\n.voucher-card.receipt .v-amount {\n  color: #22c55e;\n}\n.voucher-card.payment {\n  background: rgba(239, 68, 68, 0.06);\n}\n.voucher-card.payment .material-icons-round {\n  color: #ef4444;\n}\n.voucher-card.payment .v-amount {\n  color: #ef4444;\n}\n.group-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 16px;\n  padding: 20px;\n  margin-bottom: 20px;\n  box-shadow: var(--shadow-card);\n}\n.group-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 14px;\n}\n.group-header h4 {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.group-count {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n  background: rgba(59, 130, 246, 0.12);\n  color: #3b82f6;\n}\n.group-total {\n  margin-right: auto;\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--accent-green);\n}\n.data-table.compact th {\n  padding: 10px 14px;\n  font-size: 12px;\n}\n.data-table.compact td {\n  padding: 10px 14px;\n  font-size: 13px;\n}\n.name-cell {\n  font-weight: 700;\n}\n.salary-cell {\n  font-weight: 800;\n  color: var(--accent-green);\n  direction: ltr;\n  text-align: right;\n}\n.amount-cell {\n  font-weight: 800;\n  direction: ltr;\n  text-align: right;\n}\n.amount-col {\n  text-align: right;\n}\n.date-cell {\n  font-size: 13px;\n  color: var(--text-secondary);\n  direction: ltr;\n  text-align: right;\n}\n.text-green {\n  color: #22c55e !important;\n}\n.text-red {\n  color: #ef4444 !important;\n}\n.text-blue {\n  color: #3b82f6 !important;\n}\n.total-row {\n  background: var(--bg-surface);\n}\n.total-row td {\n  font-size: 14px !important;\n}\n.type-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n}\n.type-badge.receipt {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.type-badge.payment {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.status-badge {\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 12px;\n  border-radius: 8px;\n}\n.status-badge.active,\n.status-badge.confirmed {\n  background: rgba(34, 197, 94, 0.15);\n  color: #22c55e;\n}\n.status-badge.inactive,\n.status-badge.cancelled {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.status-badge.draft {\n  background: rgba(249, 115, 22, 0.15);\n  color: #f97316;\n}\n@media (max-width: 640px) {\n  .stats-grid {\n    grid-template-columns: 1fr 1fr;\n  }\n  .voucher-cards {\n    grid-template-columns: 1fr;\n  }\n  .filter-bar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .filter-group select,\n  .filter-group input {\n    min-width: auto;\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=reports.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportsComponent, { className: "ReportsComponent", filePath: "src/app/pages/reports/reports.ts", lineNumber: 19 });
})();
export {
  ReportsComponent
};
//# sourceMappingURL=chunk-3ZO23TDP.js.map
