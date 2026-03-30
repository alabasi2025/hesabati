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
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵgetInheritedFactory,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-VUZEB5JS.js";

// src/app/pages/intermediary-accounts/intermediary-accounts.ts
var _forTrack0 = ($index, $item) => $item.id;
function IntermediaryAccountsComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5)(1, "span", 8);
    \u0275\u0275text(2, "sync");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275domElementEnd()();
  }
}
function IntermediaryAccountsComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 6)(1, "span", 2);
    \u0275\u0275text(2, "task_alt");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p");
    \u0275\u0275text(4, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "small");
    \u0275\u0275text(6, "\u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u062A\u0645 \u0627\u0633\u062A\u0643\u0645\u0627\u0644\u0647\u0627");
    \u0275\u0275domElementEnd()();
  }
}
function IntermediaryAccountsComponent_Conditional_31_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 19)(1, "span", 2);
    \u0275\u0275text(2, "notes");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const acc_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(acc_r1.notes);
  }
}
function IntermediaryAccountsComponent_Conditional_31_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 9)(1, "div", 10)(2, "div", 11)(3, "span", 2);
    \u0275\u0275text(4, "sync_alt");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(5, "div", 12)(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "span", 13);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(10, "div", 14)(11, "div", 15)(12, "span", 2);
    \u0275\u0275text(13, "account_balance_wallet");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "div", 16)(15, "span", 17);
    \u0275\u0275text(16, "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u062D\u0627\u0644\u064A:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(17, "span", 18);
    \u0275\u0275text(18);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275conditionalCreate(19, IntermediaryAccountsComponent_Conditional_31_For_2_Conditional_19_Template, 5, 1, "div", 19);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(20, "div", 20)(21, "span", 21);
    \u0275\u0275text(22);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const acc_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(acc_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(acc_r1.code);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.getBalanceDisplay(acc_r1));
    \u0275\u0275advance();
    \u0275\u0275conditional(acc_r1.notes ? 19 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", acc_r1.isActive);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", acc_r1.isActive ? "\u0646\u0634\u0637" : "\u0645\u062A\u0648\u0642\u0641", " ");
  }
}
function IntermediaryAccountsComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7);
    \u0275\u0275repeaterCreate(1, IntermediaryAccountsComponent_Conditional_31_For_2_Template, 23, 7, "div", 9, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.accounts());
  }
}
var IntermediaryAccountsComponent = class _IntermediaryAccountsComponent extends BasePageComponent {
  api = inject(ApiService);
  toast = inject(ToastService);
  accounts = signal([], ...ngDevMode ? [{ debugName: "accounts" }] : (
    /* istanbul ignore next */
    []
  ));
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  onBizIdChange(_bizId) {
    this.load();
  }
  async load() {
    this.loading.set(true);
    try {
      const intermediaryAccounts = await this.api.getIntermediaryAccounts(this.bizId);
      this.accounts.set(intermediaryAccounts || []);
    } catch (e) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0648\u0633\u064A\u0637\u0629");
    }
    this.loading.set(false);
  }
  getBalanceDisplay(acc) {
    if (!acc.balances || acc.balances.length === 0)
      return "0";
    return acc.balances.map((b) => `${Number(b.balance).toLocaleString()} ${b.currencySymbol || ""}`).join(" | ");
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275IntermediaryAccountsComponent_BaseFactory;
    return function IntermediaryAccountsComponent_Factory(__ngFactoryType__) {
      return (\u0275IntermediaryAccountsComponent_BaseFactory || (\u0275IntermediaryAccountsComponent_BaseFactory = \u0275\u0275getInheritedFactory(_IntermediaryAccountsComponent)))(__ngFactoryType__ || _IntermediaryAccountsComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _IntermediaryAccountsComponent, selectors: [["app-intermediary-accounts"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 32, vars: 1, consts: [[1, "page-content"], [1, "page-header"], [1, "material-icons-round"], [1, "page-desc"], [1, "info-card"], [1, "loading-state"], [1, "empty-state"], [1, "accounts-grid"], [1, "material-icons-round", "spin"], [1, "account-card"], [1, "card-header"], [1, "card-icon"], [1, "card-title"], [1, "code-badge", "intermediary"], [1, "card-body"], [1, "balance-display"], [1, "balance-info"], [1, "balance-label"], [1, "balance-value"], [1, "notes"], [1, "card-footer"], [1, "status-badge"]], template: function IntermediaryAccountsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "sync_alt");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0648\u0633\u064A\u0637\u0629");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "p", 3);
      \u0275\u0275text(7, "\u062D\u0633\u0627\u0628\u0627\u062A \u0644\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 (\u0641\u0648\u0627\u062A\u064A\u0631 \u0645\u0634\u062A\u0631\u064A\u0627\u062A\u060C \u062A\u062D\u0648\u064A\u0644\u0627\u062A \u0645\u062E\u0632\u0646\u064A\u0629\u060C \u0637\u0644\u0628\u0627\u062A \u062A\u0648\u0631\u064A\u062F)");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "div", 4)(9, "span", 2);
      \u0275\u0275text(10, "info");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "div")(12, "strong");
      \u0275\u0275text(13, "\u0645\u0627 \u0647\u064A \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0648\u0633\u064A\u0637\u0629\u061F");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "p");
      \u0275\u0275text(15, "\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0624\u0642\u062A\u0629 \u062A\u0633\u062A\u062E\u062F\u0645 \u0644\u062A\u062A\u0628\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631:");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "ul")(17, "li")(18, "strong");
      \u0275\u0275text(19, "INT-01:");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(20, " \u0641\u0648\u0627\u062A\u064A\u0631 \u0645\u0634\u062A\u0631\u064A\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 (\u062A\u0645 \u0627\u0644\u062A\u0623\u0643\u064A\u062F\u060C \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0645\u062E\u0632\u0646)");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "li")(22, "strong");
      \u0275\u0275text(23, "INT-02:");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(24, " \u062A\u062D\u0648\u064A\u0644\u0627\u062A \u0645\u062E\u0632\u0646\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 (\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644\u060C \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645)");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(25, "li")(26, "strong");
      \u0275\u0275text(27, "INT-03:");
      \u0275\u0275domElementEnd();
      \u0275\u0275text(28, " \u0637\u0644\u0628\u0627\u062A \u062A\u0648\u0631\u064A\u062F \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 (\u062A\u0645 \u0627\u0644\u0637\u0644\u0628\u060C \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0648\u0635\u0648\u0644 \u0627\u0644\u0628\u0636\u0627\u0639\u0629)");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275conditionalCreate(29, IntermediaryAccountsComponent_Conditional_29_Template, 5, 0, "div", 5)(30, IntermediaryAccountsComponent_Conditional_30_Template, 7, 0, "div", 6)(31, IntermediaryAccountsComponent_Conditional_31_Template, 3, 0, "div", 7);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(29);
      \u0275\u0275conditional(ctx.loading() ? 29 : !ctx.accounts().length ? 30 : 31);
    }
  }, dependencies: [CommonModule, FormsModule], styles: ['\n\n.layout[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content[_ngcontent-%COMP%] {\n  padding: 24px 32px;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state[_ngcontent-%COMP%]   .spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--bg-card-hover);\n}\n.status-badge[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit[_ngcontent-%COMP%]:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete[_ngcontent-%COMP%]:hover {\n  color: var(--accent-red);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content[_ngcontent-%COMP%] {\n    margin-right: 76px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.page-desc[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  font-size: 14px;\n  color: var(--text-secondary);\n}\n.info-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.08),\n      rgba(147, 51, 234, 0.05));\n  border: 1px solid rgba(59, 130, 246, 0.2);\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 24px;\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;\n}\n.info-card[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #3b82f6;\n}\n.info-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 16px;\n  margin-bottom: 8px;\n  color: var(--text-primary);\n}\n.info-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  color: var(--text-secondary);\n  line-height: 1.6;\n}\n.info-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 12px 0 0;\n  padding-left: 24px;\n}\n.info-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 6px 0;\n  color: var(--text-secondary);\n  line-height: 1.6;\n}\n.info-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: inline;\n  font-size: 14px;\n  color: #3b82f6;\n  font-family: "Courier New", monospace;\n}\n.accounts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 20px;\n}\n.account-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  padding: 20px;\n  transition: all 0.2s;\n}\n.account-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  transform: translateY(-2px);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.card-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #8b5cf6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-icon[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: white;\n}\n.card-title[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.card-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.code-badge[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 6px;\n  font-size: 12px;\n}\n.code-badge.intermediary[_ngcontent-%COMP%] {\n  color: #8b5cf6;\n  background: rgba(139, 92, 246, 0.15);\n}\n.card-body[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.balance-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n  background: var(--bg-surface);\n  border-radius: 10px;\n  margin-bottom: 12px;\n}\n.balance-display[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #10b981;\n}\n.balance-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.balance-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.balance-value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--text-primary);\n  font-family: "Courier New", monospace;\n}\n.notes[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  padding: 10px;\n  background: rgba(100, 116, 139, 0.08);\n  border-radius: 8px;\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.notes[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 12px;\n  border-top: 1px solid var(--border-color);\n}\n/*# sourceMappingURL=intermediary-accounts.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IntermediaryAccountsComponent, [{
    type: Component,
    args: [{ selector: "app-intermediary-accounts", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="page-content">\r
  <div class="page-header">\r
    <h2><span class="material-icons-round">sync_alt</span> \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0648\u0633\u064A\u0637\u0629</h2>\r
    <p class="page-desc">\u062D\u0633\u0627\u0628\u0627\u062A \u0644\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 (\u0641\u0648\u0627\u062A\u064A\u0631 \u0645\u0634\u062A\u0631\u064A\u0627\u062A\u060C \u062A\u062D\u0648\u064A\u0644\u0627\u062A \u0645\u062E\u0632\u0646\u064A\u0629\u060C \u0637\u0644\u0628\u0627\u062A \u062A\u0648\u0631\u064A\u062F)</p>\r
  </div>\r
\r
  <div class="info-card">\r
    <span class="material-icons-round">info</span>\r
    <div>\r
      <strong>\u0645\u0627 \u0647\u064A \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0648\u0633\u064A\u0637\u0629\u061F</strong>\r
      <p>\u062D\u0633\u0627\u0628\u0627\u062A \u0645\u0624\u0642\u062A\u0629 \u062A\u0633\u062A\u062E\u062F\u0645 \u0644\u062A\u062A\u0628\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631:</p>\r
      <ul>\r
        <li><strong>INT-01:</strong> \u0641\u0648\u0627\u062A\u064A\u0631 \u0645\u0634\u062A\u0631\u064A\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 (\u062A\u0645 \u0627\u0644\u062A\u0623\u0643\u064A\u062F\u060C \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0645\u062E\u0632\u0646)</li>\r
        <li><strong>INT-02:</strong> \u062A\u062D\u0648\u064A\u0644\u0627\u062A \u0645\u062E\u0632\u0646\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 (\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644\u060C \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645)</li>\r
        <li><strong>INT-03:</strong> \u0637\u0644\u0628\u0627\u062A \u062A\u0648\u0631\u064A\u062F \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 (\u062A\u0645 \u0627\u0644\u0637\u0644\u0628\u060C \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0648\u0635\u0648\u0644 \u0627\u0644\u0628\u0636\u0627\u0639\u0629)</li>\r
      </ul>\r
    </div>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="loading-state"><span class="material-icons-round spin">sync</span><p>\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p></div>\r
  } @else if (!accounts().length) {\r
    <div class="empty-state">\r
      <span class="material-icons-round">task_alt</span>\r
      <p>\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631</p>\r
      <small>\u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u062A\u0645 \u0627\u0633\u062A\u0643\u0645\u0627\u0644\u0647\u0627</small>\r
    </div>\r
  } @else {\r
    <div class="accounts-grid">\r
      @for (acc of accounts(); track acc.id) {\r
        <div class="account-card">\r
          <div class="card-header">\r
            <div class="card-icon">\r
              <span class="material-icons-round">sync_alt</span>\r
            </div>\r
            <div class="card-title">\r
              <h3>{{ acc.name }}</h3>\r
              <span class="code-badge intermediary">{{ acc.code }}</span>\r
            </div>\r
          </div>\r
          \r
          <div class="card-body">\r
            <div class="balance-display">\r
              <span class="material-icons-round">account_balance_wallet</span>\r
              <div class="balance-info">\r
                <span class="balance-label">\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u062D\u0627\u0644\u064A:</span>\r
                <span class="balance-value">{{ getBalanceDisplay(acc) }}</span>\r
              </div>\r
            </div>\r
\r
            @if (acc.notes) {\r
              <div class="notes">\r
                <span class="material-icons-round">notes</span>\r
                <span>{{ acc.notes }}</span>\r
              </div>\r
            }\r
          </div>\r
\r
          <div class="card-footer">\r
            <span class="status-badge" [class.active]="acc.isActive">\r
              {{ acc.isActive ? '\u0646\u0634\u0637' : '\u0645\u062A\u0648\u0642\u0641' }}\r
            </span>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/pages/intermediary-accounts/intermediary-accounts.scss */\n.layout {\n  display: flex;\n  min-height: 100vh;\n  background: var(--bg-base);\n}\n.main-content {\n  flex: 1;\n  margin-right: 280px;\n  min-height: 100vh;\n}\n.page-content {\n  padding: 24px 32px;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  padding: 80px 0;\n  color: var(--text-secondary);\n}\n.loading-state .spin {\n  animation: spin 1s linear infinite;\n  font-size: 36px;\n  color: var(--accent-blue);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.page-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.page-header h2 .material-icons-round {\n  font-size: 26px;\n  color: var(--accent-amber);\n}\n.add-btn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n  transition: all 0.3s ease;\n}\n.add-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);\n}\n.add-btn .material-icons-round {\n  font-size: 20px;\n}\n.data-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  background: var(--bg-card);\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--border-color);\n  box-shadow: var(--shadow-card);\n}\n.data-table th {\n  padding: 14px 16px;\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  background: var(--bg-surface);\n  border-bottom: 2px solid var(--border-strong);\n  text-align: right;\n}\n.data-table td {\n  padding: 14px 16px;\n  font-size: 14px;\n  color: var(--text-primary);\n  border-bottom: 1px solid var(--border-color);\n  font-weight: 600;\n}\n.data-table tr:last-child td {\n  border-bottom: none;\n}\n.data-table tr:hover td {\n  background: var(--bg-card-hover);\n}\n.status-badge {\n  font-size: 12px;\n  font-weight: 700;\n  padding: 5px 14px;\n  border-radius: 8px;\n}\n.status-badge.active {\n  background: rgba(34, 197, 94, 0.2);\n  color: #22c55e;\n}\n.status-badge.partner {\n  background: rgba(168, 85, 247, 0.2);\n  color: #a855f7;\n}\n.status-badge.inactive {\n  background: rgba(148, 163, 184, 0.2);\n  color: var(--text-muted);\n}\n.action-btn {\n  width: 34px;\n  height: 34px;\n  border-radius: 8px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  margin: 0 2px;\n}\n.action-btn .material-icons-round {\n  font-size: 17px;\n}\n.action-btn:hover {\n  background: var(--bg-card-hover);\n  color: var(--text-primary);\n  border-color: var(--border-strong);\n}\n.action-btn.edit:hover {\n  color: var(--accent-blue);\n}\n.action-btn.delete:hover {\n  color: var(--accent-red);\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: fade-in 0.2s ease;\n}\n.modal-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 20px;\n  width: 90%;\n  max-width: 640px;\n  max-height: 85vh;\n  overflow-y: auto;\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);\n  animation: slide-in-up 0.3s ease;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px 28px;\n  border-bottom: 1px solid var(--border-color);\n}\n.modal-title-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.modal-title-row h2 {\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.modal-title-row p {\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.modal-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-icon .material-icons-round {\n  font-size: 24px;\n  color: white;\n}\n.modal-icon.amber {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.modal-icon.blue {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #6366f1);\n}\n.modal-icon.green {\n  background:\n    linear-gradient(\n      135deg,\n      #22c55e,\n      #14b8a6);\n}\n.modal-icon.purple {\n  background:\n    linear-gradient(\n      135deg,\n      #a855f7,\n      #ec4899);\n}\n.modal-icon.red {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444,\n      #f97316);\n}\n.close-btn {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-secondary);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.close-btn:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: var(--accent-red);\n}\n.modal-body {\n  padding: 24px 28px;\n}\n.modal-footer {\n  padding: 16px 28px;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  gap: 10px;\n  justify-content: flex-start;\n}\n.form-group {\n  margin-bottom: 16px;\n}\n.form-group label {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.form-group input,\n.form-group select,\n.form-group textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-input);\n  color: var(--text-primary);\n  font-family: "Tajawal", sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  transition: border-color 0.2s;\n}\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n  outline: none;\n  border-color: var(--accent-blue);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.form-group input::placeholder,\n.form-group select::placeholder,\n.form-group textarea::placeholder {\n  color: var(--text-muted);\n}\n.form-group select {\n  cursor: pointer;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n.btn-save {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      var(--accent-blue),\n      var(--accent-indigo));\n  color: white;\n  font-weight: 700;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-save:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);\n}\n.btn-cancel {\n  padding: 10px 24px;\n  border-radius: 10px;\n  border: 1px solid var(--border-color);\n  background: var(--bg-surface);\n  color: var(--text-primary);\n  font-weight: 600;\n  font-size: 14px;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n}\n.btn-cancel:hover {\n  background: var(--bg-card-hover);\n}\n.empty-state {\n  text-align: center;\n  padding: 60px 20px;\n  color: var(--text-secondary);\n}\n.empty-state .material-icons-round {\n  font-size: 48px;\n  margin-bottom: 12px;\n  color: var(--text-muted);\n}\n.empty-state p {\n  font-size: 16px;\n  font-weight: 600;\n}\n@media (max-width: 1024px) {\n  .main-content {\n    margin-right: 76px;\n  }\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 640px) {\n  .page-content {\n    padding: 16px;\n  }\n}\n.page-desc {\n  margin: 8px 0 0;\n  font-size: 14px;\n  color: var(--text-secondary);\n}\n.info-card {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.08),\n      rgba(147, 51, 234, 0.05));\n  border: 1px solid rgba(59, 130, 246, 0.2);\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 24px;\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;\n}\n.info-card .material-icons-round {\n  font-size: 32px;\n  color: #3b82f6;\n}\n.info-card strong {\n  display: block;\n  font-size: 16px;\n  margin-bottom: 8px;\n  color: var(--text-primary);\n}\n.info-card p {\n  margin: 8px 0;\n  color: var(--text-secondary);\n  line-height: 1.6;\n}\n.info-card ul {\n  margin: 12px 0 0;\n  padding-left: 24px;\n}\n.info-card ul li {\n  margin: 6px 0;\n  color: var(--text-secondary);\n  line-height: 1.6;\n}\n.info-card ul li strong {\n  display: inline;\n  font-size: 14px;\n  color: #3b82f6;\n  font-family: "Courier New", monospace;\n}\n.accounts-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 20px;\n}\n.account-card {\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  border-radius: 14px;\n  padding: 20px;\n  transition: all 0.2s;\n}\n.account-card:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  transform: translateY(-2px);\n}\n.card-header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.card-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #8b5cf6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card-icon .material-icons-round {\n  font-size: 28px;\n  color: white;\n}\n.card-title {\n  flex: 1;\n}\n.card-title h3 {\n  margin: 0 0 4px;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.code-badge {\n  font-family: "Courier New", monospace;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 6px;\n  font-size: 12px;\n}\n.code-badge.intermediary {\n  color: #8b5cf6;\n  background: rgba(139, 92, 246, 0.15);\n}\n.card-body {\n  margin-bottom: 16px;\n}\n.balance-display {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n  background: var(--bg-surface);\n  border-radius: 10px;\n  margin-bottom: 12px;\n}\n.balance-display .material-icons-round {\n  font-size: 24px;\n  color: #10b981;\n}\n.balance-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.balance-label {\n  font-size: 12px;\n  color: var(--text-secondary);\n}\n.balance-value {\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--text-primary);\n  font-family: "Courier New", monospace;\n}\n.notes {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  padding: 10px;\n  background: rgba(100, 116, 139, 0.08);\n  border-radius: 8px;\n  font-size: 13px;\n  color: var(--text-secondary);\n}\n.notes .material-icons-round {\n  font-size: 18px;\n}\n.card-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 12px;\n  border-top: 1px solid var(--border-color);\n}\n/*# sourceMappingURL=intermediary-accounts.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(IntermediaryAccountsComponent, { className: "IntermediaryAccountsComponent", filePath: "src/app/pages/intermediary-accounts/intermediary-accounts.ts", lineNumber: 15 });
})();
export {
  IntermediaryAccountsComponent
};
//# sourceMappingURL=chunk-B2ELYVGU.js.map
