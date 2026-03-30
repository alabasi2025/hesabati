import {
  ThreeBackgroundComponent
} from "./chunk-NCLK3RL4.js";
import "./chunk-WIHW6D6J.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-6OZ2GPXU.js";
import {
  AuthService,
  Component,
  Router,
  RouterLink,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-VUZEB5JS.js";

// src/app/pages/register/register.ts
var _forTrack0 = ($index, $item) => $item.value;
function RegisterComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 7);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function RegisterComponent_For_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r2 = ctx.$implicit;
    \u0275\u0275property("value", opt_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r2.label);
  }
}
function RegisterComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 28);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628...");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628");
    \u0275\u0275elementEnd();
  }
}
var RegisterComponent = class _RegisterComponent {
  auth = inject(AuthService);
  router = inject(Router);
  username = signal("", ...ngDevMode ? [{ debugName: "username" }] : (
    /* istanbul ignore next */
    []
  ));
  password = signal("", ...ngDevMode ? [{ debugName: "password" }] : (
    /* istanbul ignore next */
    []
  ));
  fullName = signal("", ...ngDevMode ? [{ debugName: "fullName" }] : (
    /* istanbul ignore next */
    []
  ));
  role = signal("viewer", ...ngDevMode ? [{ debugName: "role" }] : (
    /* istanbul ignore next */
    []
  ));
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : (
    /* istanbul ignore next */
    []
  ));
  roleOptions = [
    { value: "viewer", label: "\u0645\u0634\u0627\u0647\u062F" },
    { value: "accountant", label: "\u0645\u062D\u0627\u0633\u0628" },
    { value: "manager", label: "\u0645\u062F\u064A\u0631" },
    { value: "admin", label: "\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645" }
  ];
  async onRegister() {
    const u = this.username().trim();
    const p = this.password();
    const name = this.fullName().trim();
    if (!u || !p || !name) {
      this.error.set("\u064A\u0631\u062C\u0649 \u062A\u0639\u0628\u0626\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629");
      return;
    }
    if (p.length < 8) {
      this.error.set("\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 8 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    if (!/[a-zA-Z]/.test(p)) {
      this.error.set("\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u064A\u062C\u0628 \u0623\u0646 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u062D\u0631\u0641 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    if (!/\d/.test(p)) {
      this.error.set("\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u064A\u062C\u0628 \u0623\u0646 \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0631\u0642\u0645 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");
      return;
    }
    this.isLoading.set(true);
    this.error.set("");
    try {
      await this.auth.register(u, p, name, this.role());
      this.router.navigate(["/login"]);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : "\u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628");
    } finally {
      this.isLoading.set(false);
    }
  }
  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }
  static \u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegisterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 63, vars: 9, consts: [[1, "auth-container"], ["variant", "login"], [1, "auth-card"], [1, "card-glow"], [1, "logo-section"], [1, "logo-icon"], [1, "logo-inner"], [1, "material-icons-round"], [1, "app-title"], [1, "app-subtitle"], [1, "auth-form", 3, "ngSubmit"], [1, "error-message"], [1, "field-group"], [1, "field-label"], [1, "input-wrapper"], ["type", "text", "placeholder", "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644", "name", "fullName", "autocomplete", "name", 1, "input-3d", 3, "ngModelChange", "ngModel"], [1, "input-highlight"], ["type", "text", "placeholder", "\u0627\u0633\u0645 \u0627\u0644\u062F\u062E\u0648\u0644", "name", "username", "autocomplete", "username", 1, "input-3d", 3, "ngModelChange", "ngModel"], [1, "password-wrapper"], ["placeholder", "8 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644\u060C \u062D\u0631\u0641 \u0648\u0631\u0642\u0645", "name", "password", "autocomplete", "new-password", 1, "input-3d", 3, "ngModelChange", "type", "ngModel"], ["type", "button", 1, "toggle-password", 3, "click"], ["name", "role", 1, "input-3d", 3, "ngModelChange", "ngModel"], [3, "value"], ["type", "submit", 1, "submit-btn", 3, "disabled"], [1, "btn-shine"], [1, "auth-footer"], [1, "footer-line"], ["routerLink", "/login", 1, "link"], [1, "spinner"]], template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-three-background", 1);
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275element(3, "div", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "span", 7);
      \u0275\u0275text(8, "person_add");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "h1", 8);
      \u0275\u0275text(10, "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p", 9);
      \u0275\u0275text(12, "\u0633\u062C\u0651\u0644 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B \u0641\u064A \u0646\u0638\u0627\u0645 \u062D\u0633\u0627\u0628\u0627\u062A\u064A");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "form", 10);
      \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_13_listener() {
        return ctx.onRegister();
      });
      \u0275\u0275conditionalCreate(14, RegisterComponent_Conditional_14_Template, 5, 1, "div", 11);
      \u0275\u0275elementStart(15, "div", 12)(16, "label", 13)(17, "span", 7);
      \u0275\u0275text(18, "person");
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 14)(21, "input", 15);
      \u0275\u0275listener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_21_listener($event) {
        return ctx.fullName.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "div", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 12)(24, "label", 13)(25, "span", 7);
      \u0275\u0275text(26, "badge");
      \u0275\u0275elementEnd();
      \u0275\u0275text(27, " \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 14)(29, "input", 17);
      \u0275\u0275listener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_29_listener($event) {
        return ctx.username.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "div", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 12)(32, "label", 13)(33, "span", 7);
      \u0275\u0275text(34, "lock");
      \u0275\u0275elementEnd();
      \u0275\u0275text(35, " \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 14)(37, "div", 18)(38, "input", 19);
      \u0275\u0275listener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_38_listener($event) {
        return ctx.password.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "button", 20);
      \u0275\u0275listener("click", function RegisterComponent_Template_button_click_39_listener() {
        return ctx.togglePassword();
      });
      \u0275\u0275elementStart(40, "span", 7);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(42, "div", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div", 12)(44, "label", 13)(45, "span", 7);
      \u0275\u0275text(46, "admin_panel_settings");
      \u0275\u0275elementEnd();
      \u0275\u0275text(47, " \u0627\u0644\u062F\u0648\u0631 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 14)(49, "select", 21);
      \u0275\u0275listener("ngModelChange", function RegisterComponent_Template_select_ngModelChange_49_listener($event) {
        return ctx.role.set($event);
      });
      \u0275\u0275repeaterCreate(50, RegisterComponent_For_51_Template, 2, 2, "option", 22, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275element(52, "div", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "button", 23);
      \u0275\u0275conditionalCreate(54, RegisterComponent_Conditional_54_Template, 3, 0)(55, RegisterComponent_Conditional_55_Template, 4, 0);
      \u0275\u0275element(56, "div", 24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(57, "div", 25);
      \u0275\u0275element(58, "div", 26);
      \u0275\u0275elementStart(59, "p");
      \u0275\u0275text(60, " \u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F ");
      \u0275\u0275elementStart(61, "a", 27);
      \u0275\u0275text(62, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275conditional(ctx.error() ? 14 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.fullName());
      \u0275\u0275advance(8);
      \u0275\u0275property("ngModel", ctx.username());
      \u0275\u0275advance(9);
      \u0275\u0275property("type", ctx.showPassword() ? "text" : "password")("ngModel", ctx.password());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.showPassword() ? "visibility_off" : "visibility", " ");
      \u0275\u0275advance(8);
      \u0275\u0275property("ngModel", ctx.role());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.roleOptions);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 54 : 55);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, RouterLink, ThreeBackgroundComponent], styles: [`@charset "UTF-8";



.auth-container[_ngcontent-%COMP%] {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
}
.auth-card[_ngcontent-%COMP%] {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 440px;
  background:
    linear-gradient(
      165deg,
      rgba(30, 41, 59, 0.85),
      rgba(15, 23, 42, 0.95));
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 24px;
  padding: 40px 36px;
  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 24px 48px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.card-glow[_ngcontent-%COMP%] {
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  background:
    linear-gradient(
      135deg,
      rgba(34, 197, 94, 0.12),
      transparent,
      rgba(59, 130, 246, 0.08));
  opacity: 0.6;
  z-index: -1;
  filter: blur(1px);
}
.logo-section[_ngcontent-%COMP%] {
  text-align: center;
  margin-bottom: 28px;
}
.logo-icon[_ngcontent-%COMP%]   .logo-inner[_ngcontent-%COMP%] {
  width: 64px;
  height: 64px;
  margin: 0 auto 14px;
  background:
    linear-gradient(
      135deg,
      #22c55e,
      #16a34a);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.3);
}
.logo-icon[_ngcontent-%COMP%]   .logo-inner[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {
  font-size: 32px;
  color: white;
}
.app-title[_ngcontent-%COMP%] {
  font-size: 26px;
  font-weight: 800;
  color: rgba(226, 232, 240, 0.98);
  margin-bottom: 4px;
}
.app-subtitle[_ngcontent-%COMP%] {
  font-size: 13px;
  color: rgba(203, 213, 225, 0.85);
}
.auth-form[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.field-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.field-label[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(226, 232, 240, 0.95);
}
.field-label[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {
  font-size: 18px;
  color: rgba(34, 197, 94, 0.8);
}
.input-wrapper[_ngcontent-%COMP%] {
  position: relative;
}
.input-wrapper[_ngcontent-%COMP%]:focus-within   .input-highlight[_ngcontent-%COMP%] {
  left: 0;
  right: 0;
  opacity: 1;
}
.input-highlight[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 50%;
  height: 2px;
  background:
    linear-gradient(
      90deg,
      #22c55e,
      #3b82f6);
  border-radius: 2px;
  transition: all 0.3s ease;
  opacity: 0;
}
.input-3d[_ngcontent-%COMP%] {
  width: 100%;
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 12px;
  color: rgba(226, 232, 240, 0.95);
  font-size: 15px;
  font-family: "Tajawal", sans-serif;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-3d[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: rgba(34, 197, 94, 0.4);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}
.input-3d[_ngcontent-%COMP%]::placeholder {
  color: rgba(148, 163, 184, 0.5);
}
select.input-3d[_ngcontent-%COMP%] {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left 12px center;
  background-size: 18px;
  padding-left: 42px;
}
.password-wrapper[_ngcontent-%COMP%] {
  position: relative;
}
.password-wrapper[_ngcontent-%COMP%]   .input-3d[_ngcontent-%COMP%] {
  padding-left: 48px;
}
.toggle-password[_ngcontent-%COMP%] {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: rgba(148, 163, 184, 0.8);
}
.toggle-password[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {
  font-size: 20px;
}
.error-message[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  color: #fca5a5;
  font-size: 14px;
}
.error-message[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {
  font-size: 20px;
  color: #ef4444;
}
.submit-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 24px;
  margin-top: 6px;
  background:
    linear-gradient(
      135deg,
      #22c55e,
      #16a34a);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  font-family: "Tajawal", sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.35);
  position: relative;
  overflow: hidden;
}
.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.45);
}
.submit-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.submit-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {
  font-size: 22px;
}
.btn-shine[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: -60%;
  width: 40%;
  height: 100%;
  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent);
  transform: skewX(-25deg);
  transition: left 0.6s ease;
}
.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled)   .btn-shine[_ngcontent-%COMP%] {
  left: 120%;
}
.spinner[_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 0.6s linear infinite;
}
@keyframes _ngcontent-%COMP%_spin {
  to {
    transform: rotate(360deg);
  }
}
.auth-footer[_ngcontent-%COMP%] {
  text-align: center;
  margin-top: 24px;
}
.auth-footer[_ngcontent-%COMP%]   .footer-line[_ngcontent-%COMP%] {
  height: 1px;
  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(148, 163, 184, 0.15),
      transparent);
  margin-bottom: 14px;
}
.auth-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  color: rgba(148, 163, 184, 0.8);
}
.auth-footer[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%] {
  color: #60a5fa;
  font-weight: 700;
  text-decoration: none;
  margin-right: 4px;
}
.auth-footer[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]:hover {
  text-decoration: underline;
}
/*# sourceMappingURL=register.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterComponent, [{
    type: Component,
    args: [{ selector: "app-register", standalone: true, imports: [FormsModule, RouterLink, ThreeBackgroundComponent], template: `<div class="auth-container">\r
  <app-three-background variant="login"></app-three-background>\r
\r
  <div class="auth-card">\r
    <div class="card-glow"></div>\r
\r
    <div class="logo-section">\r
      <div class="logo-icon">\r
        <div class="logo-inner">\r
          <span class="material-icons-round">person_add</span>\r
        </div>\r
      </div>\r
      <h1 class="app-title">\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F</h1>\r
      <p class="app-subtitle">\u0633\u062C\u0651\u0644 \u0645\u0633\u062A\u062E\u062F\u0645\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B \u0641\u064A \u0646\u0638\u0627\u0645 \u062D\u0633\u0627\u0628\u0627\u062A\u064A</p>\r
    </div>\r
\r
    <form (ngSubmit)="onRegister()" class="auth-form">\r
      @if (error()) {\r
        <div class="error-message">\r
          <span class="material-icons-round">error_outline</span>\r
          <span>{{ error() }}</span>\r
        </div>\r
      }\r
\r
      <div class="field-group">\r
        <label class="field-label">\r
          <span class="material-icons-round">person</span>\r
          \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644\r
        </label>\r
        <div class="input-wrapper">\r
          <input\r
            type="text"\r
            class="input-3d"\r
            placeholder="\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644"\r
            [ngModel]="fullName()"\r
            (ngModelChange)="fullName.set($event)"\r
            name="fullName"\r
            autocomplete="name"\r
          />\r
          <div class="input-highlight"></div>\r
        </div>\r
      </div>\r
\r
      <div class="field-group">\r
        <label class="field-label">\r
          <span class="material-icons-round">badge</span>\r
          \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\r
        </label>\r
        <div class="input-wrapper">\r
          <input\r
            type="text"\r
            class="input-3d"\r
            placeholder="\u0627\u0633\u0645 \u0627\u0644\u062F\u062E\u0648\u0644"\r
            [ngModel]="username()"\r
            (ngModelChange)="username.set($event)"\r
            name="username"\r
            autocomplete="username"\r
          />\r
          <div class="input-highlight"></div>\r
        </div>\r
      </div>\r
\r
      <div class="field-group">\r
        <label class="field-label">\r
          <span class="material-icons-round">lock</span>\r
          \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\r
        </label>\r
        <div class="input-wrapper">\r
          <div class="password-wrapper">\r
            <input\r
              [type]="showPassword() ? 'text' : 'password'"\r
              class="input-3d"\r
              placeholder="8 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644\u060C \u062D\u0631\u0641 \u0648\u0631\u0642\u0645"\r
              [ngModel]="password()"\r
              (ngModelChange)="password.set($event)"\r
              name="password"\r
              autocomplete="new-password"\r
            />\r
            <button type="button" class="toggle-password" (click)="togglePassword()">\r
              <span class="material-icons-round">\r
                {{ showPassword() ? 'visibility_off' : 'visibility' }}\r
              </span>\r
            </button>\r
          </div>\r
          <div class="input-highlight"></div>\r
        </div>\r
      </div>\r
\r
      <div class="field-group">\r
        <label class="field-label">\r
          <span class="material-icons-round">admin_panel_settings</span>\r
          \u0627\u0644\u062F\u0648\u0631\r
        </label>\r
        <div class="input-wrapper">\r
          <select\r
            class="input-3d"\r
            [ngModel]="role()"\r
            (ngModelChange)="role.set($event)"\r
            name="role"\r
          >\r
            @for (opt of roleOptions; track opt.value) {\r
              <option [value]="opt.value">{{ opt.label }}</option>\r
            }\r
          </select>\r
          <div class="input-highlight"></div>\r
        </div>\r
      </div>\r
\r
      <button type="submit" class="submit-btn" [disabled]="isLoading()">\r
        @if (isLoading()) {\r
          <div class="spinner"></div>\r
          <span>\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628...</span>\r
        } @else {\r
          <span class="material-icons-round">person_add</span>\r
          <span>\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628</span>\r
        }\r
        <div class="btn-shine"></div>\r
      </button>\r
    </form>\r
\r
    <div class="auth-footer">\r
      <div class="footer-line"></div>\r
      <p>\r
        \u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F\r
        <a routerLink="/login" class="link">\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644</a>\r
      </p>\r
    </div>\r
  </div>\r
</div>\r
`, styles: [`@charset "UTF-8";

/* src/app/pages/register/register.scss */
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
}
.auth-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 440px;
  background:
    linear-gradient(
      165deg,
      rgba(30, 41, 59, 0.85),
      rgba(15, 23, 42, 0.95));
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 24px;
  padding: 40px 36px;
  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 24px 48px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.card-glow {
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  background:
    linear-gradient(
      135deg,
      rgba(34, 197, 94, 0.12),
      transparent,
      rgba(59, 130, 246, 0.08));
  opacity: 0.6;
  z-index: -1;
  filter: blur(1px);
}
.logo-section {
  text-align: center;
  margin-bottom: 28px;
}
.logo-icon .logo-inner {
  width: 64px;
  height: 64px;
  margin: 0 auto 14px;
  background:
    linear-gradient(
      135deg,
      #22c55e,
      #16a34a);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.3);
}
.logo-icon .logo-inner .material-icons-round {
  font-size: 32px;
  color: white;
}
.app-title {
  font-size: 26px;
  font-weight: 800;
  color: rgba(226, 232, 240, 0.98);
  margin-bottom: 4px;
}
.app-subtitle {
  font-size: 13px;
  color: rgba(203, 213, 225, 0.85);
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.field-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(226, 232, 240, 0.95);
}
.field-label .material-icons-round {
  font-size: 18px;
  color: rgba(34, 197, 94, 0.8);
}
.input-wrapper {
  position: relative;
}
.input-wrapper:focus-within .input-highlight {
  left: 0;
  right: 0;
  opacity: 1;
}
.input-highlight {
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 50%;
  height: 2px;
  background:
    linear-gradient(
      90deg,
      #22c55e,
      #3b82f6);
  border-radius: 2px;
  transition: all 0.3s ease;
  opacity: 0;
}
.input-3d {
  width: 100%;
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 12px;
  color: rgba(226, 232, 240, 0.95);
  font-size: 15px;
  font-family: "Tajawal", sans-serif;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-3d:focus {
  outline: none;
  border-color: rgba(34, 197, 94, 0.4);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}
.input-3d::placeholder {
  color: rgba(148, 163, 184, 0.5);
}
select.input-3d {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left 12px center;
  background-size: 18px;
  padding-left: 42px;
}
.password-wrapper {
  position: relative;
}
.password-wrapper .input-3d {
  padding-left: 48px;
}
.toggle-password {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: rgba(148, 163, 184, 0.8);
}
.toggle-password .material-icons-round {
  font-size: 20px;
}
.error-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  color: #fca5a5;
  font-size: 14px;
}
.error-message .material-icons-round {
  font-size: 20px;
  color: #ef4444;
}
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 24px;
  margin-top: 6px;
  background:
    linear-gradient(
      135deg,
      #22c55e,
      #16a34a);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  font-family: "Tajawal", sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.35);
  position: relative;
  overflow: hidden;
}
.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.45);
}
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.submit-btn .material-icons-round {
  font-size: 22px;
}
.btn-shine {
  position: absolute;
  top: 0;
  left: -60%;
  width: 40%;
  height: 100%;
  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent);
  transform: skewX(-25deg);
  transition: left 0.6s ease;
}
.submit-btn:hover:not(:disabled) .btn-shine {
  left: 120%;
}
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.auth-footer {
  text-align: center;
  margin-top: 24px;
}
.auth-footer .footer-line {
  height: 1px;
  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(148, 163, 184, 0.15),
      transparent);
  margin-bottom: 14px;
}
.auth-footer p {
  font-size: 14px;
  color: rgba(148, 163, 184, 0.8);
}
.auth-footer .link {
  color: #60a5fa;
  font-weight: 700;
  text-decoration: none;
  margin-right: 4px;
}
.auth-footer .link:hover {
  text-decoration: underline;
}
/*# sourceMappingURL=register.css.map */
`] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src/app/pages/register/register.ts", lineNumber: 14 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-B53MDSF2.js.map
