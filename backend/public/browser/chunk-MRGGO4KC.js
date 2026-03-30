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
  ApiService
} from "./chunk-MSEJWZ7D.js";
import {
  CommonModule,
  Component,
  RouterLink,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-VUZEB5JS.js";

// src/app/pages/summary/summary.ts
var _c0 = (a0) => ["/biz", a0];
var _forTrack0 = ($index, $item) => $item.id;
function SummaryComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "span", 6);
    \u0275\u0275text(2, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");
    \u0275\u0275elementEnd()();
  }
}
function SummaryComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "span", 7);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function SummaryComponent_Conditional_12_For_56_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 7);
    \u0275\u0275text(2, "bolt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 31);
    \u0275\u0275text(6, "\u0645\u062D\u0637\u0629");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const biz_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(biz_r2.stations);
  }
}
function SummaryComponent_Conditional_12_For_56_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 7);
    \u0275\u0275text(2, "groups");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 31);
    \u0275\u0275text(6, "\u0645\u0648\u0638\u0641");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const biz_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(biz_r2.employees);
  }
}
function SummaryComponent_Conditional_12_For_56_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 7);
    \u0275\u0275text(2, "savings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 31);
    \u0275\u0275text(6, "\u0635\u0646\u062F\u0648\u0642");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const biz_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(biz_r2.funds);
  }
}
function SummaryComponent_Conditional_12_For_56_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 7);
    \u0275\u0275text(2, "local_shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 31);
    \u0275\u0275text(6, "\u0645\u0648\u0631\u062F");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const biz_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(biz_r2.suppliers);
  }
}
function SummaryComponent_Conditional_12_For_56_Conditional_27_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "span", 7);
    \u0275\u0275text(2, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 38);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r3 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r3.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", p_r3.sharePercentage, "%");
  }
}
function SummaryComponent_Conditional_12_For_56_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 35)(2, "span", 7);
    \u0275\u0275text(3, "handshake");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u0627\u0644\u0634\u0631\u0643\u0627\u0621 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 36);
    \u0275\u0275repeaterCreate(6, SummaryComponent_Conditional_12_For_56_Conditional_27_For_7_Template, 7, 2, "div", 37, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const biz_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275repeater(biz_r2.partners);
  }
}
function SummaryComponent_Conditional_12_For_56_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "span", 7);
    \u0275\u0275text(2, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const biz_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", biz_r2.pendingAccounts, " \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0642 \u064A\u062D\u062A\u0627\u062C \u062A\u0635\u0641\u064A\u0629");
  }
}
function SummaryComponent_Conditional_12_For_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22)(2, "div", 23)(3, "span", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 25)(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 26)(9, "span", 7);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "a", 27)(13, "span", 7);
    \u0275\u0275text(14, "open_in_new");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 28);
    \u0275\u0275conditionalCreate(16, SummaryComponent_Conditional_12_For_56_Conditional_16_Template, 7, 1, "div", 29);
    \u0275\u0275conditionalCreate(17, SummaryComponent_Conditional_12_For_56_Conditional_17_Template, 7, 1, "div", 29);
    \u0275\u0275elementStart(18, "div", 29)(19, "span", 7);
    \u0275\u0275text(20, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 30);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 31);
    \u0275\u0275text(24, "\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(25, SummaryComponent_Conditional_12_For_56_Conditional_25_Template, 7, 1, "div", 29);
    \u0275\u0275conditionalCreate(26, SummaryComponent_Conditional_12_For_56_Conditional_26_Template, 7, 1, "div", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(27, SummaryComponent_Conditional_12_For_56_Conditional_27_Template, 8, 0, "div", 32);
    \u0275\u0275conditionalCreate(28, SummaryComponent_Conditional_12_For_56_Conditional_28_Template, 5, 1, "div", 33);
    \u0275\u0275elementStart(29, "a", 34)(30, "span", 7);
    \u0275\u0275text(31, "login");
    \u0275\u0275elementEnd();
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const biz_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("--biz-color", biz_r2.color);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(biz_r2.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(biz_r2.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.getTypeIcon(biz_r2.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getTypeLabel(biz_r2.type), " ");
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(16, _c0, biz_r2.id));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(biz_r2.stations > 0 ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(biz_r2.employees > 0 ? 17 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(biz_r2.accounts);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(biz_r2.funds > 0 ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(biz_r2.suppliers > 0 ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(biz_r2.partners && biz_r2.partners.length > 0 ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(biz_r2.pendingAccounts > 0 ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(18, _c0, biz_r2.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u0627\u0644\u062F\u062E\u0648\u0644 \u0639\u0644\u0649 ", biz_r2.name, " ");
  }
}
function SummaryComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9)(2, "span", 7);
    \u0275\u0275text(3, "bolt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 10)(5, "span", 11);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 12);
    \u0275\u0275text(8, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062D\u0637\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 13)(10, "span", 7);
    \u0275\u0275text(11, "groups");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 10)(13, "span", 11);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 12);
    \u0275\u0275text(16, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 14)(18, "span", 7);
    \u0275\u0275text(19, "account_balance_wallet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 10)(21, "span", 11);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 12);
    \u0275\u0275text(24, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 15)(26, "span", 7);
    \u0275\u0275text(27, "savings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 10)(29, "span", 11);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 12);
    \u0275\u0275text(32, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 16)(34, "span", 7);
    \u0275\u0275text(35, "local_shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 10)(37, "span", 11);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 12);
    \u0275\u0275text(40, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div", 17)(42, "span", 7);
    \u0275\u0275text(43, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 10)(45, "span", 11);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "span", 12);
    \u0275\u0275text(48, "\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(49, "div", 18)(50, "span", 7);
    \u0275\u0275text(51, "business");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "h2");
    \u0275\u0275text(53, "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 19);
    \u0275\u0275repeaterCreate(55, SummaryComponent_Conditional_12_For_56_Template, 33, 20, "div", 20, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.totals().stations);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.totals().employees);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.totals().accounts);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.totals().funds);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.totals().suppliers);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("has-pending", ctx_r0.totals().pendingAccounts > 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.totals().pendingAccounts);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r0.businesses());
  }
}
var SummaryComponent = class _SummaryComponent {
  api = inject(ApiService);
  businesses = signal([], ...ngDevMode ? [{ debugName: "businesses" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  // إجماليات كل الأعمال
  totals = signal({
    stations: 0,
    employees: 0,
    accounts: 0,
    funds: 0,
    suppliers: 0,
    pendingAccounts: 0
  }, ...ngDevMode ? [{ debugName: "totals" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    this.loadAllBusinesses();
  }
  async loadAllBusinesses() {
    try {
      const data = await this.api.getBusinesses();
      const summaries = data.map((b) => ({
        id: b.id,
        name: b.name,
        icon: b.icon,
        color: b.color,
        type: b.type,
        stations: b.stats.stations,
        employees: b.stats.employees,
        accounts: b.stats.accounts,
        funds: b.stats.funds,
        suppliers: b.stats.suppliers,
        pendingAccounts: b.stats.pendingAccounts,
        partners: b.partners
      }));
      this.businesses.set(summaries);
      const totals = summaries.reduce((acc, b) => ({
        stations: acc.stations + b.stations,
        employees: acc.employees + b.employees,
        accounts: acc.accounts + b.accounts,
        funds: acc.funds + b.funds,
        suppliers: acc.suppliers + b.suppliers,
        pendingAccounts: acc.pendingAccounts + b.pendingAccounts
      }), { stations: 0, employees: 0, accounts: 0, funds: 0, suppliers: 0, pendingAccounts: 0 });
      this.totals.set(totals);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    } finally {
      this.loading.set(false);
    }
  }
  getTypeLabel(type) {
    switch (type) {
      case "stations":
        return "\u0645\u062D\u0637\u0627\u062A \u0643\u0647\u0631\u0628\u0627\u0621";
      case "single_station":
        return "\u0645\u062D\u0637\u0629 \u0648\u0627\u062D\u062F\u0629";
      case "personal":
        return "\u0634\u062E\u0635\u064A";
      default:
        return "\u0639\u0645\u0644";
    }
  }
  getTypeIcon(type) {
    switch (type) {
      case "stations":
        return "bolt";
      case "single_station":
        return "electric_bolt";
      case "personal":
        return "person";
      default:
        return "business";
    }
  }
  static \u0275fac = function SummaryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SummaryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SummaryComponent, selectors: [["app-summary"]], decls: 13, vars: 3, consts: [[1, "summary-page"], [1, "page-header"], [1, "header-content"], [1, "material-icons", "header-icon"], [1, "loading-state"], [1, "error-state"], [1, "material-icons", "spinning"], [1, "material-icons"], [1, "totals-grid"], [1, "total-card", "total-stations"], [1, "total-info"], [1, "total-value"], [1, "total-label"], [1, "total-card", "total-employees"], [1, "total-card", "total-accounts"], [1, "total-card", "total-funds"], [1, "total-card", "total-suppliers"], [1, "total-card", "total-pending"], [1, "section-title"], [1, "businesses-grid"], [1, "biz-card", 3, "--biz-color"], [1, "biz-card"], [1, "biz-card-header"], [1, "biz-icon-wrap"], [1, "material-icons", "biz-icon"], [1, "biz-info"], [1, "biz-type-badge"], [1, "enter-btn", 3, "routerLink"], [1, "biz-stats"], [1, "stat-item"], [1, "stat-val"], [1, "stat-lbl"], [1, "biz-partners"], [1, "pending-alert"], [1, "enter-biz-btn", 3, "routerLink"], [1, "partners-title"], [1, "partners-list"], [1, "partner-chip"], [1, "partner-share"]], template: function SummaryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, "summarize");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div")(6, "h1");
      \u0275\u0275text(7, "\u0645\u0644\u062E\u0635 \u0643\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p");
      \u0275\u0275text(9, "\u0646\u0638\u0631\u0629 \u0634\u0627\u0645\u0644\u0629 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0623\u0639\u0645\u0627\u0644\u0643 \u0641\u064A \u0645\u0643\u0627\u0646 \u0648\u0627\u062D\u062F");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(10, SummaryComponent_Conditional_10_Template, 5, 0, "div", 4);
      \u0275\u0275conditionalCreate(11, SummaryComponent_Conditional_11_Template, 5, 1, "div", 5);
      \u0275\u0275conditionalCreate(12, SummaryComponent_Conditional_12_Template, 57, 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.loading() ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && !ctx.error() ? 12 : -1);
    }
  }, dependencies: [CommonModule, RouterLink], styles: ['\n\n.summary-page[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  direction: rtl;\n  font-family: "Tajawal", sans-serif;\n}\n.summary-page[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.summary-page[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.summary-page[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: var(--accent);\n  background: var(--accent-bg);\n  padding: 0.75rem;\n  border-radius: 16px;\n}\n.summary-page[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0 0 0.25rem;\n}\n.summary-page[_ngcontent-%COMP%]   .page-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin: 0;\n  font-size: 0.95rem;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2.5rem;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card[_ngcontent-%COMP%] {\n  background: var(--card-bg);\n  border: 1px solid var(--border);\n  border-radius: 16px;\n  padding: 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: var(--shadow-sm);\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: var(--shadow-md);\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  padding: 0.5rem;\n  border-radius: 12px;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card[_ngcontent-%COMP%]   .total-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card[_ngcontent-%COMP%]   .total-info[_ngcontent-%COMP%]   .total-value[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  font-weight: 800;\n  color: var(--text-primary);\n  line-height: 1;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card[_ngcontent-%COMP%]   .total-info[_ngcontent-%COMP%]   .total-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--text-secondary);\n  margin-top: 0.25rem;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card.total-stations[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #d97706;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card.total-employees[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #2563eb;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card.total-accounts[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #059669;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card.total-funds[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: #ede9fe;\n  color: #7c3aed;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card.total-suppliers[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: #fce7f3;\n  color: #db2777;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card.total-pending[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.summary-page[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-card.total-pending.has-pending[_ngcontent-%COMP%] {\n  border-color: #fca5a5;\n}\n.summary-page[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n}\n.summary-page[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  color: var(--accent);\n  font-size: 1.5rem;\n}\n.summary-page[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  gap: 1.5rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%] {\n  background: var(--card-bg);\n  border: 2px solid var(--border);\n  border-radius: 20px;\n  padding: 1.5rem;\n  box-shadow: var(--shadow-sm);\n  transition: transform 0.2s, box-shadow 0.2s;\n  border-top: 4px solid var(--biz-color, var(--accent));\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-card-header[_ngcontent-%COMP%]   .biz-icon-wrap[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  background: var(--biz-color, var(--accent));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-card-header[_ngcontent-%COMP%]   .biz-icon-wrap[_ngcontent-%COMP%]   .biz-icon[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  color: white;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-card-header[_ngcontent-%COMP%]   .biz-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-card-header[_ngcontent-%COMP%]   .biz-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.35rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-card-header[_ngcontent-%COMP%]   .biz-info[_ngcontent-%COMP%]   .biz-type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  background: var(--bg-secondary);\n  color: var(--text-secondary);\n  padding: 0.2rem 0.6rem;\n  border-radius: 20px;\n  font-size: 0.78rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-card-header[_ngcontent-%COMP%]   .biz-info[_ngcontent-%COMP%]   .biz-type-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-card-header[_ngcontent-%COMP%]   .enter-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  background: var(--bg-secondary);\n  border: 1px solid var(--border);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--text-secondary);\n  text-decoration: none;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-card-header[_ngcontent-%COMP%]   .enter-btn[_ngcontent-%COMP%]:hover {\n  background: var(--biz-color, var(--accent));\n  color: white;\n  border-color: transparent;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-card-header[_ngcontent-%COMP%]   .enter-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-stats[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-bottom: 1.25rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--bg-secondary);\n  border: 1px solid var(--border);\n  border-radius: 10px;\n  padding: 0.4rem 0.75rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--biz-color, var(--accent));\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-val[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-lbl[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--text-secondary);\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-partners[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-partners[_ngcontent-%COMP%]   .partners-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  margin-bottom: 0.6rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-partners[_ngcontent-%COMP%]   .partners-title[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-partners[_ngcontent-%COMP%]   .partners-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-partners[_ngcontent-%COMP%]   .partners-list[_ngcontent-%COMP%]   .partner-chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.3rem;\n  background: var(--bg-secondary);\n  border: 1px solid var(--border);\n  border-radius: 20px;\n  padding: 0.3rem 0.7rem;\n  font-size: 0.82rem;\n  color: var(--text-primary);\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-partners[_ngcontent-%COMP%]   .partners-list[_ngcontent-%COMP%]   .partner-chip[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--text-secondary);\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .biz-partners[_ngcontent-%COMP%]   .partners-list[_ngcontent-%COMP%]   .partner-chip[_ngcontent-%COMP%]   .partner-share[_ngcontent-%COMP%] {\n  background: var(--biz-color, var(--accent));\n  color: white;\n  border-radius: 10px;\n  padding: 0.1rem 0.4rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .pending-alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: #fee2e2;\n  color: #dc2626;\n  border-radius: 10px;\n  padding: 0.6rem 0.9rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .pending-alert[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .enter-biz-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  width: 100%;\n  padding: 0.75rem;\n  background: var(--biz-color, var(--accent));\n  color: white;\n  border-radius: 12px;\n  text-decoration: none;\n  font-weight: 700;\n  font-size: 0.95rem;\n  transition: opacity 0.2s, transform 0.2s;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .enter-biz-btn[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.summary-page[_ngcontent-%COMP%]   .businesses-grid[_ngcontent-%COMP%]   .biz-card[_ngcontent-%COMP%]   .enter-biz-btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  transform: translateY(-1px);\n}\n.summary-page[_ngcontent-%COMP%]   .loading-state[_ngcontent-%COMP%], \n.summary-page[_ngcontent-%COMP%]   .error-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n  color: var(--text-secondary);\n}\n.summary-page[_ngcontent-%COMP%]   .loading-state[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%], \n.summary-page[_ngcontent-%COMP%]   .error-state[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  display: block;\n  margin-bottom: 1rem;\n}\n.summary-page[_ngcontent-%COMP%]   .loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.summary-page[_ngcontent-%COMP%]   .error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.summary-page[_ngcontent-%COMP%]   .spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.dark[_nghost-%COMP%]   .total-card.total-stations[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .total-card.total-stations[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: rgba(217, 119, 6, 0.2);\n}\n.dark[_nghost-%COMP%]   .total-card.total-employees[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .total-card.total-employees[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: rgba(37, 99, 235, 0.2);\n}\n.dark[_nghost-%COMP%]   .total-card.total-accounts[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .total-card.total-accounts[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: rgba(5, 150, 105, 0.2);\n}\n.dark[_nghost-%COMP%]   .total-card.total-funds[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .total-card.total-funds[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: rgba(124, 58, 237, 0.2);\n}\n.dark[_nghost-%COMP%]   .total-card.total-suppliers[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .total-card.total-suppliers[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: rgba(219, 39, 119, 0.2);\n}\n.dark[_nghost-%COMP%]   .total-card.total-pending[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .total-card.total-pending[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  background: rgba(220, 38, 38, 0.2);\n}\n.dark[_nghost-%COMP%]   .pending-alert[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .pending-alert[_ngcontent-%COMP%] {\n  background: rgba(220, 38, 38, 0.15) !important;\n}\n/*# sourceMappingURL=summary.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SummaryComponent, [{
    type: Component,
    args: [{ selector: "app-summary", standalone: true, imports: [CommonModule, RouterLink, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="summary-page">\r
\r
  <!-- \u0631\u0623\u0633 \u0627\u0644\u0635\u0641\u062D\u0629 -->\r
  <div class="page-header">\r
    <div class="header-content">\r
      <span class="material-icons header-icon">summarize</span>\r
      <div>\r
        <h1>\u0645\u0644\u062E\u0635 \u0643\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</h1>\r
        <p>\u0646\u0638\u0631\u0629 \u0634\u0627\u0645\u0644\u0629 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0623\u0639\u0645\u0627\u0644\u0643 \u0641\u064A \u0645\u0643\u0627\u0646 \u0648\u0627\u062D\u062F</p>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- \u062A\u062D\u0645\u064A\u0644 -->\r
  @if (loading()) {\r
    <div class="loading-state">\r
      <span class="material-icons spinning">refresh</span>\r
      <p>\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>\r
    </div>\r
  }\r
\r
  <!-- \u062E\u0637\u0623 -->\r
  @if (error()) {\r
    <div class="error-state">\r
      <span class="material-icons">error_outline</span>\r
      <p>{{ error() }}</p>\r
    </div>\r
  }\r
\r
  @if (!loading() && !error()) {\r
\r
    <!-- \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0627\u062A \u0627\u0644\u0643\u0628\u064A\u0631\u0629 -->\r
    <div class="totals-grid">\r
      <div class="total-card total-stations">\r
        <span class="material-icons">bolt</span>\r
        <div class="total-info">\r
          <span class="total-value">{{ totals().stations }}</span>\r
          <span class="total-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062D\u0637\u0627\u062A</span>\r
        </div>\r
      </div>\r
      <div class="total-card total-employees">\r
        <span class="material-icons">groups</span>\r
        <div class="total-info">\r
          <span class="total-value">{{ totals().employees }}</span>\r
          <span class="total-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646</span>\r
        </div>\r
      </div>\r
      <div class="total-card total-accounts">\r
        <span class="material-icons">account_balance_wallet</span>\r
        <div class="total-info">\r
          <span class="total-value">{{ totals().accounts }}</span>\r
          <span class="total-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A</span>\r
        </div>\r
      </div>\r
      <div class="total-card total-funds">\r
        <span class="material-icons">savings</span>\r
        <div class="total-info">\r
          <span class="total-value">{{ totals().funds }}</span>\r
          <span class="total-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642</span>\r
        </div>\r
      </div>\r
      <div class="total-card total-suppliers">\r
        <span class="material-icons">local_shipping</span>\r
        <div class="total-info">\r
          <span class="total-value">{{ totals().suppliers }}</span>\r
          <span class="total-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646</span>\r
        </div>\r
      </div>\r
      <div class="total-card total-pending" [class.has-pending]="totals().pendingAccounts > 0">\r
        <span class="material-icons">warning</span>\r
        <div class="total-info">\r
          <span class="total-value">{{ totals().pendingAccounts }}</span>\r
          <span class="total-label">\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629</span>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- \u062A\u0641\u0627\u0635\u064A\u0644 \u0643\u0644 \u0639\u0645\u0644 -->\r
    <div class="section-title">\r
      <span class="material-icons">business</span>\r
      <h2>\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644</h2>\r
    </div>\r
\r
    <div class="businesses-grid">\r
      @for (biz of businesses(); track biz.id) {\r
      <div\r
        class="biz-card"\r
        [style.--biz-color]="biz.color"\r
      >\r
        <!-- \u0631\u0623\u0633 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 -->\r
        <div class="biz-card-header">\r
          <div class="biz-icon-wrap">\r
            <span class="material-icons biz-icon">{{ biz.icon }}</span>\r
          </div>\r
          <div class="biz-info">\r
            <h3>{{ biz.name }}</h3>\r
            <span class="biz-type-badge">\r
              <span class="material-icons">{{ getTypeIcon(biz.type) }}</span>\r
              {{ getTypeLabel(biz.type) }}\r
            </span>\r
          </div>\r
          <a [routerLink]="['/biz', biz.id]" class="enter-btn">\r
            <span class="material-icons">open_in_new</span>\r
          </a>\r
        </div>\r
\r
        <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0639\u0645\u0644 -->\r
        <div class="biz-stats">\r
          @if (biz.stations > 0) {\r
          <div class="stat-item">\r
            <span class="material-icons">bolt</span>\r
            <span class="stat-val">{{ biz.stations }}</span>\r
            <span class="stat-lbl">\u0645\u062D\u0637\u0629</span>\r
          </div>\r
          }\r
          @if (biz.employees > 0) {\r
          <div class="stat-item">\r
            <span class="material-icons">groups</span>\r
            <span class="stat-val">{{ biz.employees }}</span>\r
            <span class="stat-lbl">\u0645\u0648\u0638\u0641</span>\r
          </div>\r
          }\r
          <div class="stat-item">\r
            <span class="material-icons">account_balance_wallet</span>\r
            <span class="stat-val">{{ biz.accounts }}</span>\r
            <span class="stat-lbl">\u062D\u0633\u0627\u0628</span>\r
          </div>\r
          @if (biz.funds > 0) {\r
          <div class="stat-item">\r
            <span class="material-icons">savings</span>\r
            <span class="stat-val">{{ biz.funds }}</span>\r
            <span class="stat-lbl">\u0635\u0646\u062F\u0648\u0642</span>\r
          </div>\r
          }\r
          @if (biz.suppliers > 0) {\r
          <div class="stat-item">\r
            <span class="material-icons">local_shipping</span>\r
            <span class="stat-val">{{ biz.suppliers }}</span>\r
            <span class="stat-lbl">\u0645\u0648\u0631\u062F</span>\r
          </div>\r
          }\r
        </div>\r
\r
        <!-- \u0627\u0644\u0634\u0631\u0643\u0627\u0621 -->\r
        @if (biz.partners && biz.partners.length > 0) {\r
        <div class="biz-partners">\r
          <div class="partners-title">\r
            <span class="material-icons">handshake</span>\r
            \u0627\u0644\u0634\u0631\u0643\u0627\u0621\r
          </div>\r
          <div class="partners-list">\r
            @for (p of biz.partners; track p.id) {\r
            <div class="partner-chip">\r
              <span class="material-icons">person</span>\r
              <span>{{ p.fullName }}</span>\r
              <span class="partner-share">{{ p.sharePercentage }}%</span>\r
            </div>\r
            }\r
          </div>\r
        </div>\r
        }\r
\r
        <!-- \u062A\u0646\u0628\u064A\u0647 \u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0639\u0644\u0642\u0629 -->\r
        @if (biz.pendingAccounts > 0) {\r
        <div class="pending-alert">\r
          <span class="material-icons">warning</span>\r
          <span>{{ biz.pendingAccounts }} \u062D\u0633\u0627\u0628 \u0645\u0639\u0644\u0642 \u064A\u062D\u062A\u0627\u062C \u062A\u0635\u0641\u064A\u0629</span>\r
        </div>\r
        }\r
\r
        <!-- \u0632\u0631 \u0627\u0644\u062F\u062E\u0648\u0644 -->\r
        <a [routerLink]="['/biz', biz.id]" class="enter-biz-btn">\r
          <span class="material-icons">login</span>\r
          \u0627\u0644\u062F\u062E\u0648\u0644 \u0639\u0644\u0649 {{ biz.name }}\r
        </a>\r
      </div>\r
      }\r
    </div>\r
\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/summary/summary.scss */\n.summary-page {\n  padding: 1.5rem;\n  direction: rtl;\n  font-family: "Tajawal", sans-serif;\n}\n.summary-page .page-header {\n  margin-bottom: 2rem;\n}\n.summary-page .page-header .header-content {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.summary-page .page-header .header-content .header-icon {\n  font-size: 2.5rem;\n  color: var(--accent);\n  background: var(--accent-bg);\n  padding: 0.75rem;\n  border-radius: 16px;\n}\n.summary-page .page-header .header-content h1 {\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0 0 0.25rem;\n}\n.summary-page .page-header .header-content p {\n  color: var(--text-secondary);\n  margin: 0;\n  font-size: 0.95rem;\n}\n.summary-page .totals-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2.5rem;\n}\n.summary-page .totals-grid .total-card {\n  background: var(--card-bg);\n  border: 1px solid var(--border);\n  border-radius: 16px;\n  padding: 1.25rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: var(--shadow-sm);\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.summary-page .totals-grid .total-card:hover {\n  transform: translateY(-3px);\n  box-shadow: var(--shadow-md);\n}\n.summary-page .totals-grid .total-card .material-icons {\n  font-size: 2rem;\n  padding: 0.5rem;\n  border-radius: 12px;\n}\n.summary-page .totals-grid .total-card .total-info {\n  display: flex;\n  flex-direction: column;\n}\n.summary-page .totals-grid .total-card .total-info .total-value {\n  font-size: 1.8rem;\n  font-weight: 800;\n  color: var(--text-primary);\n  line-height: 1;\n}\n.summary-page .totals-grid .total-card .total-info .total-label {\n  font-size: 0.8rem;\n  color: var(--text-secondary);\n  margin-top: 0.25rem;\n}\n.summary-page .totals-grid .total-card.total-stations .material-icons {\n  background: #fef3c7;\n  color: #d97706;\n}\n.summary-page .totals-grid .total-card.total-employees .material-icons {\n  background: #dbeafe;\n  color: #2563eb;\n}\n.summary-page .totals-grid .total-card.total-accounts .material-icons {\n  background: #d1fae5;\n  color: #059669;\n}\n.summary-page .totals-grid .total-card.total-funds .material-icons {\n  background: #ede9fe;\n  color: #7c3aed;\n}\n.summary-page .totals-grid .total-card.total-suppliers .material-icons {\n  background: #fce7f3;\n  color: #db2777;\n}\n.summary-page .totals-grid .total-card.total-pending .material-icons {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.summary-page .totals-grid .total-card.total-pending.has-pending {\n  border-color: #fca5a5;\n}\n.summary-page .section-title {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n}\n.summary-page .section-title .material-icons {\n  color: var(--accent);\n  font-size: 1.5rem;\n}\n.summary-page .section-title h2 {\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.summary-page .businesses-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  gap: 1.5rem;\n}\n.summary-page .businesses-grid .biz-card {\n  background: var(--card-bg);\n  border: 2px solid var(--border);\n  border-radius: 20px;\n  padding: 1.5rem;\n  box-shadow: var(--shadow-sm);\n  transition: transform 0.2s, box-shadow 0.2s;\n  border-top: 4px solid var(--biz-color, var(--accent));\n}\n.summary-page .businesses-grid .biz-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);\n}\n.summary-page .businesses-grid .biz-card .biz-card-header {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n.summary-page .businesses-grid .biz-card .biz-card-header .biz-icon-wrap {\n  width: 52px;\n  height: 52px;\n  border-radius: 14px;\n  background: var(--biz-color, var(--accent));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.summary-page .businesses-grid .biz-card .biz-card-header .biz-icon-wrap .biz-icon {\n  font-size: 1.6rem;\n  color: white;\n}\n.summary-page .businesses-grid .biz-card .biz-card-header .biz-info {\n  flex: 1;\n}\n.summary-page .businesses-grid .biz-card .biz-card-header .biz-info h3 {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.35rem;\n}\n.summary-page .businesses-grid .biz-card .biz-card-header .biz-info .biz-type-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  background: var(--bg-secondary);\n  color: var(--text-secondary);\n  padding: 0.2rem 0.6rem;\n  border-radius: 20px;\n  font-size: 0.78rem;\n}\n.summary-page .businesses-grid .biz-card .biz-card-header .biz-info .biz-type-badge .material-icons {\n  font-size: 0.9rem;\n}\n.summary-page .businesses-grid .biz-card .biz-card-header .enter-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  background: var(--bg-secondary);\n  border: 1px solid var(--border);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--text-secondary);\n  text-decoration: none;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n.summary-page .businesses-grid .biz-card .biz-card-header .enter-btn:hover {\n  background: var(--biz-color, var(--accent));\n  color: white;\n  border-color: transparent;\n}\n.summary-page .businesses-grid .biz-card .biz-card-header .enter-btn .material-icons {\n  font-size: 1.1rem;\n}\n.summary-page .businesses-grid .biz-card .biz-stats {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-bottom: 1.25rem;\n}\n.summary-page .businesses-grid .biz-card .biz-stats .stat-item {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--bg-secondary);\n  border: 1px solid var(--border);\n  border-radius: 10px;\n  padding: 0.4rem 0.75rem;\n}\n.summary-page .businesses-grid .biz-card .biz-stats .stat-item .material-icons {\n  font-size: 1rem;\n  color: var(--biz-color, var(--accent));\n}\n.summary-page .businesses-grid .biz-card .biz-stats .stat-item .stat-val {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.summary-page .businesses-grid .biz-card .biz-stats .stat-item .stat-lbl {\n  font-size: 0.8rem;\n  color: var(--text-secondary);\n}\n.summary-page .businesses-grid .biz-card .biz-partners {\n  margin-bottom: 1rem;\n}\n.summary-page .businesses-grid .biz-card .biz-partners .partners-title {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  margin-bottom: 0.6rem;\n}\n.summary-page .businesses-grid .biz-card .biz-partners .partners-title .material-icons {\n  font-size: 1rem;\n}\n.summary-page .businesses-grid .biz-card .biz-partners .partners-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.summary-page .businesses-grid .biz-card .biz-partners .partners-list .partner-chip {\n  display: flex;\n  align-items: center;\n  gap: 0.3rem;\n  background: var(--bg-secondary);\n  border: 1px solid var(--border);\n  border-radius: 20px;\n  padding: 0.3rem 0.7rem;\n  font-size: 0.82rem;\n  color: var(--text-primary);\n}\n.summary-page .businesses-grid .biz-card .biz-partners .partners-list .partner-chip .material-icons {\n  font-size: 0.9rem;\n  color: var(--text-secondary);\n}\n.summary-page .businesses-grid .biz-card .biz-partners .partners-list .partner-chip .partner-share {\n  background: var(--biz-color, var(--accent));\n  color: white;\n  border-radius: 10px;\n  padding: 0.1rem 0.4rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.summary-page .businesses-grid .biz-card .pending-alert {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: #fee2e2;\n  color: #dc2626;\n  border-radius: 10px;\n  padding: 0.6rem 0.9rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n}\n.summary-page .businesses-grid .biz-card .pending-alert .material-icons {\n  font-size: 1.1rem;\n}\n.summary-page .businesses-grid .biz-card .enter-biz-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  width: 100%;\n  padding: 0.75rem;\n  background: var(--biz-color, var(--accent));\n  color: white;\n  border-radius: 12px;\n  text-decoration: none;\n  font-weight: 700;\n  font-size: 0.95rem;\n  transition: opacity 0.2s, transform 0.2s;\n}\n.summary-page .businesses-grid .biz-card .enter-biz-btn .material-icons {\n  font-size: 1.1rem;\n}\n.summary-page .businesses-grid .biz-card .enter-biz-btn:hover {\n  opacity: 0.9;\n  transform: translateY(-1px);\n}\n.summary-page .loading-state,\n.summary-page .error-state {\n  text-align: center;\n  padding: 4rem 2rem;\n  color: var(--text-secondary);\n}\n.summary-page .loading-state .material-icons,\n.summary-page .error-state .material-icons {\n  font-size: 3rem;\n  display: block;\n  margin-bottom: 1rem;\n}\n.summary-page .loading-state p,\n.summary-page .error-state p {\n  font-size: 1rem;\n}\n.summary-page .spinning {\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n:host-context(.dark) .total-card.total-stations .material-icons {\n  background: rgba(217, 119, 6, 0.2);\n}\n:host-context(.dark) .total-card.total-employees .material-icons {\n  background: rgba(37, 99, 235, 0.2);\n}\n:host-context(.dark) .total-card.total-accounts .material-icons {\n  background: rgba(5, 150, 105, 0.2);\n}\n:host-context(.dark) .total-card.total-funds .material-icons {\n  background: rgba(124, 58, 237, 0.2);\n}\n:host-context(.dark) .total-card.total-suppliers .material-icons {\n  background: rgba(219, 39, 119, 0.2);\n}\n:host-context(.dark) .total-card.total-pending .material-icons {\n  background: rgba(220, 38, 38, 0.2);\n}\n:host-context(.dark) .pending-alert {\n  background: rgba(220, 38, 38, 0.15) !important;\n}\n/*# sourceMappingURL=summary.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SummaryComponent, { className: "SummaryComponent", filePath: "src/app/pages/summary/summary.ts", lineNumber: 31 });
})();
export {
  SummaryComponent
};
//# sourceMappingURL=chunk-MRGGO4KC.js.map
