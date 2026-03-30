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
  ɵNgNoValidate
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
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-VUZEB5JS.js";

// src/app/pages/login/login.ts
function LoginComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 7);
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
function LoginComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 27);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u062C\u0627\u0631\u064A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644...");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1, "login");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
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
  async onLogin() {
    if (!this.username().trim() || !this.password().trim()) {
      this.error.set("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0648\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631");
      return;
    }
    this.isLoading.set(true);
    this.error.set("");
    try {
      await this.auth.login(this.username(), this.password());
      this.router.navigate(["/businesses"]);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : "\u0641\u0634\u0644 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644");
    } finally {
      this.isLoading.set(false);
    }
  }
  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 49, vars: 7, consts: [[1, "login-container"], ["variant", "login"], [1, "login-card"], [1, "card-glow"], [1, "logo-section"], [1, "logo-icon"], [1, "logo-inner"], [1, "material-icons-round"], [1, "logo-ring"], [1, "logo-ring", "ring-2"], [1, "app-title"], [1, "app-subtitle"], [1, "login-form", 3, "ngSubmit"], [1, "error-message"], [1, "field-group"], [1, "field-label"], [1, "input-wrapper"], ["type", "text", "placeholder", "\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645", "name", "username", "autocomplete", "username", 1, "input-3d", 3, "ngModelChange", "ngModel"], [1, "input-highlight"], [1, "password-wrapper"], ["placeholder", "\u0623\u062F\u062E\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631", "name", "password", "autocomplete", "current-password", 1, "input-3d", 3, "ngModelChange", "type", "ngModel"], ["type", "button", 1, "toggle-password", 3, "click"], ["type", "submit", 1, "login-btn", 3, "disabled"], [1, "btn-shine"], [1, "login-footer"], [1, "footer-line"], ["routerLink", "/register", 1, "register-link"], [1, "spinner"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-three-background", 1);
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275element(3, "div", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "span", 7);
      \u0275\u0275text(8, "bolt");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(9, "div", 8)(10, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "h1", 10);
      \u0275\u0275text(12, "\u062D\u0633\u0627\u0628\u0627\u062A\u064A");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 11);
      \u0275\u0275text(14, "\u0625\u062F\u0627\u0631\u0629 \u0645\u062D\u0637\u0627\u062A \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 \u0648\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "form", 12);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_15_listener() {
        return ctx.onLogin();
      });
      \u0275\u0275conditionalCreate(16, LoginComponent_Conditional_16_Template, 5, 1, "div", 13);
      \u0275\u0275elementStart(17, "div", 14)(18, "label", 15)(19, "span", 7);
      \u0275\u0275text(20, "person");
      \u0275\u0275elementEnd();
      \u0275\u0275text(21, " \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 16)(23, "input", 17);
      \u0275\u0275listener("ngModelChange", function LoginComponent_Template_input_ngModelChange_23_listener($event) {
        return ctx.username.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "div", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 14)(26, "label", 15)(27, "span", 7);
      \u0275\u0275text(28, "lock");
      \u0275\u0275elementEnd();
      \u0275\u0275text(29, " \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 16)(31, "div", 19)(32, "input", 20);
      \u0275\u0275listener("ngModelChange", function LoginComponent_Template_input_ngModelChange_32_listener($event) {
        return ctx.password.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "button", 21);
      \u0275\u0275listener("click", function LoginComponent_Template_button_click_33_listener() {
        return ctx.togglePassword();
      });
      \u0275\u0275elementStart(34, "span", 7);
      \u0275\u0275text(35);
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(36, "div", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "button", 22);
      \u0275\u0275conditionalCreate(38, LoginComponent_Conditional_38_Template, 3, 0)(39, LoginComponent_Conditional_39_Template, 4, 0);
      \u0275\u0275element(40, "div", 23);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "div", 24);
      \u0275\u0275element(42, "div", 25);
      \u0275\u0275elementStart(43, "p");
      \u0275\u0275text(44, " \u0644\u0627 \u062A\u0645\u0644\u0643 \u062D\u0633\u0627\u0628\u0627\u064B\u061F ");
      \u0275\u0275elementStart(45, "a", 26);
      \u0275\u0275text(46, "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "p");
      \u0275\u0275text(48, "\u0646\u0638\u0627\u0645 \u062D\u0633\u0627\u0628\u0627\u062A\u064A \xA9 2026");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275conditional(ctx.error() ? 16 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.username());
      \u0275\u0275advance(9);
      \u0275\u0275property("type", ctx.showPassword() ? "text" : "password")("ngModel", ctx.password());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.showPassword() ? "visibility_off" : "visibility", " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 38 : 39);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, RouterLink, ThreeBackgroundComponent], styles: ['@charset "UTF-8";\n\n\n\n.login-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n  padding: 20px;\n}\n.login-card[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  max-width: 440px;\n  background:\n    linear-gradient(\n      165deg,\n      rgba(30, 41, 59, 0.85),\n      rgba(15, 23, 42, 0.95));\n  border: 1px solid rgba(148, 163, 184, 0.1);\n  border-radius: 24px;\n  padding: 48px 40px;\n  -webkit-backdrop-filter: blur(40px);\n  backdrop-filter: blur(40px);\n  box-shadow:\n    0 8px 16px rgba(0, 0, 0, 0.3),\n    0 24px 48px rgba(0, 0, 0, 0.2),\n    0 48px 80px rgba(0, 0, 0, 0.15),\n    inset 0 1px 0 rgba(255, 255, 255, 0.06),\n    inset 0 -1px 0 rgba(0, 0, 0, 0.1);\n  transform: perspective(1200px) rotateX(2deg);\n  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s ease;\n  animation: _ngcontent-%COMP%_cardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.login-card[_ngcontent-%COMP%]:hover {\n  transform: perspective(1200px) rotateX(0deg) translateY(-6px);\n  box-shadow:\n    0 12px 24px rgba(0, 0, 0, 0.35),\n    0 32px 64px rgba(0, 0, 0, 0.25),\n    0 56px 96px rgba(0, 0, 0, 0.18),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08),\n    0 0 80px rgba(59, 130, 246, 0.1);\n}\n.login-card[_ngcontent-%COMP%]:hover   .card-glow[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n@keyframes _ngcontent-%COMP%_cardEntry {\n  0% {\n    opacity: 0;\n    transform: perspective(1200px) rotateX(10deg) translateY(40px);\n  }\n  100% {\n    opacity: 1;\n    transform: perspective(1200px) rotateX(2deg) translateY(0);\n  }\n}\n.card-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: -1px;\n  border-radius: 24px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.15),\n      transparent,\n      rgba(168, 85, 247, 0.1));\n  opacity: 0;\n  transition: opacity 0.5s ease;\n  z-index: -1;\n  filter: blur(1px);\n}\n.logo-section[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 36px;\n}\n.logo-icon[_ngcontent-%COMP%] {\n  width: 88px;\n  height: 88px;\n  margin: 0 auto 18px;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.logo-inner[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow:\n    0 8px 24px rgba(245, 158, 11, 0.35),\n    0 16px 40px rgba(245, 158, 11, 0.15),\n    inset 0 1px 0 rgba(255, 255, 255, 0.2);\n  transform: perspective(500px) rotateX(5deg) rotateY(-5deg);\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  animation: _ngcontent-%COMP%_logoFloat 5s ease-in-out infinite;\n  position: relative;\n  z-index: 2;\n}\n.logo-inner[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 38px;\n  color: white;\n  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));\n}\n.logo-inner[_ngcontent-%COMP%]:hover {\n  transform: perspective(500px) rotateX(0deg) rotateY(0deg) scale(1.08);\n}\n.logo-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: -6px;\n  border-radius: 24px;\n  border: 2px solid rgba(245, 158, 11, 0.2);\n  animation: _ngcontent-%COMP%_ringPulse 3s ease-in-out infinite;\n  z-index: 1;\n}\n.ring-2[_ngcontent-%COMP%] {\n  inset: -14px;\n  border-radius: 28px;\n  border-color: rgba(245, 158, 11, 0.08);\n  animation-delay: 1.5s;\n}\n@keyframes _ngcontent-%COMP%_logoFloat {\n  0%, 100% {\n    transform: perspective(500px) rotateX(5deg) rotateY(-5deg) translateY(0);\n  }\n  50% {\n    transform: perspective(500px) rotateX(3deg) rotateY(-3deg) translateY(-8px);\n  }\n}\n@keyframes _ngcontent-%COMP%_ringPulse {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 0.5;\n  }\n  50% {\n    transform: scale(1.08);\n    opacity: 1;\n  }\n}\n.app-title[_ngcontent-%COMP%] {\n  font-size: 34px;\n  font-weight: 800;\n  background:\n    linear-gradient(\n      135deg,\n      #fbbf24,\n      #f59e0b,\n      #60a5fa,\n      #a78bfa);\n  background-size: 200% 200%;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  margin-bottom: 6px;\n  animation: _ngcontent-%COMP%_gradientShift 6s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_gradientShift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n.app-subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: rgba(203, 213, 225, 0.9);\n  font-weight: 500;\n}\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.field-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  color: rgba(226, 232, 240, 0.95);\n}\n.field-label[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: rgba(245, 158, 11, 0.7);\n}\n.input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.input-highlight[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  right: 50%;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      #f59e0b,\n      #3b82f6);\n  border-radius: 2px;\n  transition: all 0.3s ease;\n  opacity: 0;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within   .input-highlight[_ngcontent-%COMP%] {\n  left: 0;\n  right: 0;\n  opacity: 1;\n}\n.password-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.password-wrapper[_ngcontent-%COMP%]   .input-3d[_ngcontent-%COMP%] {\n  padding-left: 48px;\n}\n.toggle-password[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  color: rgba(148, 163, 184, 0.8);\n  transition: color 0.2s;\n}\n.toggle-password[_ngcontent-%COMP%]:hover {\n  color: rgba(245, 158, 11, 0.8);\n}\n.toggle-password[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.error-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n  border-radius: 12px;\n  color: #fca5a5;\n  font-size: 14px;\n  animation: _ngcontent-%COMP%_shakeError 0.4s ease;\n}\n.error-message[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #ef4444;\n}\n@keyframes _ngcontent-%COMP%_shakeError {\n  0%, 100% {\n    transform: translateX(0);\n  }\n  25% {\n    transform: translateX(-8px);\n  }\n  50% {\n    transform: translateX(8px);\n  }\n  75% {\n    transform: translateX(-4px);\n  }\n}\n.login-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  width: 100%;\n  padding: 14px 24px;\n  margin-top: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n  color: white;\n  border: none;\n  border-radius: 14px;\n  font-size: 16px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15);\n  transform: perspective(500px) rotateX(2deg);\n  position: relative;\n  overflow: hidden;\n}\n.login-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: perspective(500px) rotateX(0deg) translateY(-3px);\n  box-shadow: 0 8px 30px rgba(245, 158, 11, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n  background:\n    linear-gradient(\n      135deg,\n      #fbbf24,\n      #f59e0b);\n}\n.login-btn[_ngcontent-%COMP%]:hover:not(:disabled)   .btn-shine[_ngcontent-%COMP%] {\n  left: 120%;\n}\n.login-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: perspective(500px) rotateX(0deg) translateY(0);\n}\n.login-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.login-btn[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.btn-shine[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: -60%;\n  width: 40%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.15),\n      transparent);\n  transform: skewX(-25deg);\n  transition: left 0.6s ease;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.6s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.login-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 32px;\n}\n.login-footer[_ngcontent-%COMP%]   .footer-line[_ngcontent-%COMP%] {\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(148, 163, 184, 0.15),\n      transparent);\n  margin-bottom: 16px;\n}\n.login-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(148, 163, 184, 0.7);\n}\n.login-footer[_ngcontent-%COMP%]   .register-link[_ngcontent-%COMP%] {\n  color: #60a5fa;\n  font-weight: 700;\n  text-decoration: none;\n  margin-right: 4px;\n}\n.login-footer[_ngcontent-%COMP%]   .register-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n@media (max-width: 480px) {\n  .login-card[_ngcontent-%COMP%] {\n    padding: 32px 24px;\n    border-radius: 20px;\n  }\n  .logo-inner[_ngcontent-%COMP%] {\n    width: 60px;\n    height: 60px;\n    border-radius: 16px;\n  }\n  .logo-inner[_ngcontent-%COMP%]   .material-icons-round[_ngcontent-%COMP%] {\n    font-size: 30px;\n  }\n  .app-title[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n}\n/*# sourceMappingURL=login.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [FormsModule, RouterLink, ThreeBackgroundComponent], template: `<div class="login-container">\r
  <!-- Three.js 3D Background -->\r
  <app-three-background variant="login"></app-three-background>\r
\r
  <!-- Login Card -->\r
  <div class="login-card">\r
    <!-- Glow Effect -->\r
    <div class="card-glow"></div>\r
\r
    <!-- Logo Section -->\r
    <div class="logo-section">\r
      <div class="logo-icon">\r
        <div class="logo-inner">\r
          <span class="material-icons-round">bolt</span>\r
        </div>\r
        <div class="logo-ring"></div>\r
        <div class="logo-ring ring-2"></div>\r
      </div>\r
      <h1 class="app-title">\u062D\u0633\u0627\u0628\u0627\u062A\u064A</h1>\r
      <p class="app-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0645\u062D\u0637\u0627\u062A \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 \u0648\u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629</p>\r
    </div>\r
\r
    <!-- Form Section -->\r
    <form (ngSubmit)="onLogin()" class="login-form">\r
      <!-- Error Message -->\r
      @if (error()) {\r
        <div class="error-message">\r
          <span class="material-icons-round">error_outline</span>\r
          <span>{{ error() }}</span>\r
        </div>\r
      }\r
\r
      <!-- Username Field -->\r
      <div class="field-group">\r
        <label class="field-label">\r
          <span class="material-icons-round">person</span>\r
          \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\r
        </label>\r
        <div class="input-wrapper">\r
          <input\r
            type="text"\r
            class="input-3d"\r
            placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645"\r
            [ngModel]="username()"\r
            (ngModelChange)="username.set($event)"\r
            name="username"\r
            autocomplete="username"\r
          />\r
          <div class="input-highlight"></div>\r
        </div>\r
      </div>\r
\r
      <!-- Password Field -->\r
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
              placeholder="\u0623\u062F\u062E\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631"\r
              [ngModel]="password()"\r
              (ngModelChange)="password.set($event)"\r
              name="password"\r
              autocomplete="current-password"\r
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
      <!-- Login Button -->\r
      <button type="submit" class="login-btn" [disabled]="isLoading()">\r
        @if (isLoading()) {\r
          <div class="spinner"></div>\r
          <span>\u062C\u0627\u0631\u064A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644...</span>\r
        } @else {\r
          <span class="material-icons-round">login</span>\r
          <span>\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644</span>\r
        }\r
        <div class="btn-shine"></div>\r
      </button>\r
    </form>\r
\r
    <!-- Footer -->\r
    <div class="login-footer">\r
      <div class="footer-line"></div>\r
      <p>\r
        \u0644\u0627 \u062A\u0645\u0644\u0643 \u062D\u0633\u0627\u0628\u0627\u064B\u061F\r
        <a routerLink="/register" class="register-link">\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F</a>\r
      </p>\r
      <p>\u0646\u0638\u0627\u0645 \u062D\u0633\u0627\u0628\u0627\u062A\u064A &copy; 2026</p>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/login/login.scss */\n.login-container {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n  padding: 20px;\n}\n.login-card {\n  position: relative;\n  z-index: 10;\n  width: 100%;\n  max-width: 440px;\n  background:\n    linear-gradient(\n      165deg,\n      rgba(30, 41, 59, 0.85),\n      rgba(15, 23, 42, 0.95));\n  border: 1px solid rgba(148, 163, 184, 0.1);\n  border-radius: 24px;\n  padding: 48px 40px;\n  -webkit-backdrop-filter: blur(40px);\n  backdrop-filter: blur(40px);\n  box-shadow:\n    0 8px 16px rgba(0, 0, 0, 0.3),\n    0 24px 48px rgba(0, 0, 0, 0.2),\n    0 48px 80px rgba(0, 0, 0, 0.15),\n    inset 0 1px 0 rgba(255, 255, 255, 0.06),\n    inset 0 -1px 0 rgba(0, 0, 0, 0.1);\n  transform: perspective(1200px) rotateX(2deg);\n  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s ease;\n  animation: cardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.login-card:hover {\n  transform: perspective(1200px) rotateX(0deg) translateY(-6px);\n  box-shadow:\n    0 12px 24px rgba(0, 0, 0, 0.35),\n    0 32px 64px rgba(0, 0, 0, 0.25),\n    0 56px 96px rgba(0, 0, 0, 0.18),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08),\n    0 0 80px rgba(59, 130, 246, 0.1);\n}\n.login-card:hover .card-glow {\n  opacity: 1;\n}\n@keyframes cardEntry {\n  0% {\n    opacity: 0;\n    transform: perspective(1200px) rotateX(10deg) translateY(40px);\n  }\n  100% {\n    opacity: 1;\n    transform: perspective(1200px) rotateX(2deg) translateY(0);\n  }\n}\n.card-glow {\n  position: absolute;\n  inset: -1px;\n  border-radius: 24px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.15),\n      transparent,\n      rgba(168, 85, 247, 0.1));\n  opacity: 0;\n  transition: opacity 0.5s ease;\n  z-index: -1;\n  filter: blur(1px);\n}\n.logo-section {\n  text-align: center;\n  margin-bottom: 36px;\n}\n.logo-icon {\n  width: 88px;\n  height: 88px;\n  margin: 0 auto 18px;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.logo-inner {\n  width: 72px;\n  height: 72px;\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow:\n    0 8px 24px rgba(245, 158, 11, 0.35),\n    0 16px 40px rgba(245, 158, 11, 0.15),\n    inset 0 1px 0 rgba(255, 255, 255, 0.2);\n  transform: perspective(500px) rotateX(5deg) rotateY(-5deg);\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  animation: logoFloat 5s ease-in-out infinite;\n  position: relative;\n  z-index: 2;\n}\n.logo-inner .material-icons-round {\n  font-size: 38px;\n  color: white;\n  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));\n}\n.logo-inner:hover {\n  transform: perspective(500px) rotateX(0deg) rotateY(0deg) scale(1.08);\n}\n.logo-ring {\n  position: absolute;\n  inset: -6px;\n  border-radius: 24px;\n  border: 2px solid rgba(245, 158, 11, 0.2);\n  animation: ringPulse 3s ease-in-out infinite;\n  z-index: 1;\n}\n.ring-2 {\n  inset: -14px;\n  border-radius: 28px;\n  border-color: rgba(245, 158, 11, 0.08);\n  animation-delay: 1.5s;\n}\n@keyframes logoFloat {\n  0%, 100% {\n    transform: perspective(500px) rotateX(5deg) rotateY(-5deg) translateY(0);\n  }\n  50% {\n    transform: perspective(500px) rotateX(3deg) rotateY(-3deg) translateY(-8px);\n  }\n}\n@keyframes ringPulse {\n  0%, 100% {\n    transform: scale(1);\n    opacity: 0.5;\n  }\n  50% {\n    transform: scale(1.08);\n    opacity: 1;\n  }\n}\n.app-title {\n  font-size: 34px;\n  font-weight: 800;\n  background:\n    linear-gradient(\n      135deg,\n      #fbbf24,\n      #f59e0b,\n      #60a5fa,\n      #a78bfa);\n  background-size: 200% 200%;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  margin-bottom: 6px;\n  animation: gradientShift 6s ease-in-out infinite;\n}\n@keyframes gradientShift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n.app-subtitle {\n  font-size: 14px;\n  color: rgba(203, 213, 225, 0.9);\n  font-weight: 500;\n}\n.login-form {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.field-group {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.field-label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  color: rgba(226, 232, 240, 0.95);\n}\n.field-label .material-icons-round {\n  font-size: 18px;\n  color: rgba(245, 158, 11, 0.7);\n}\n.input-wrapper {\n  position: relative;\n}\n.input-highlight {\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  right: 50%;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      #f59e0b,\n      #3b82f6);\n  border-radius: 2px;\n  transition: all 0.3s ease;\n  opacity: 0;\n}\n.input-wrapper:focus-within .input-highlight {\n  left: 0;\n  right: 0;\n  opacity: 1;\n}\n.password-wrapper {\n  position: relative;\n}\n.password-wrapper .input-3d {\n  padding-left: 48px;\n}\n.toggle-password {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 4px;\n  color: rgba(148, 163, 184, 0.8);\n  transition: color 0.2s;\n}\n.toggle-password:hover {\n  color: rgba(245, 158, 11, 0.8);\n}\n.toggle-password .material-icons-round {\n  font-size: 20px;\n}\n.error-message {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n  border-radius: 12px;\n  color: #fca5a5;\n  font-size: 14px;\n  animation: shakeError 0.4s ease;\n}\n.error-message .material-icons-round {\n  font-size: 20px;\n  color: #ef4444;\n}\n@keyframes shakeError {\n  0%, 100% {\n    transform: translateX(0);\n  }\n  25% {\n    transform: translateX(-8px);\n  }\n  50% {\n    transform: translateX(8px);\n  }\n  75% {\n    transform: translateX(-4px);\n  }\n}\n.login-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  width: 100%;\n  padding: 14px 24px;\n  margin-top: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n  color: white;\n  border: none;\n  border-radius: 14px;\n  font-size: 16px;\n  font-weight: 700;\n  font-family: "Tajawal", sans-serif;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15);\n  transform: perspective(500px) rotateX(2deg);\n  position: relative;\n  overflow: hidden;\n}\n.login-btn:hover:not(:disabled) {\n  transform: perspective(500px) rotateX(0deg) translateY(-3px);\n  box-shadow: 0 8px 30px rgba(245, 158, 11, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n  background:\n    linear-gradient(\n      135deg,\n      #fbbf24,\n      #f59e0b);\n}\n.login-btn:hover:not(:disabled) .btn-shine {\n  left: 120%;\n}\n.login-btn:active:not(:disabled) {\n  transform: perspective(500px) rotateX(0deg) translateY(0);\n}\n.login-btn:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.login-btn .material-icons-round {\n  font-size: 22px;\n}\n.btn-shine {\n  position: absolute;\n  top: 0;\n  left: -60%;\n  width: 40%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.15),\n      transparent);\n  transform: skewX(-25deg);\n  transition: left 0.6s ease;\n}\n.spinner {\n  width: 20px;\n  height: 20px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: spin 0.6s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.login-footer {\n  text-align: center;\n  margin-top: 32px;\n}\n.login-footer .footer-line {\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(148, 163, 184, 0.15),\n      transparent);\n  margin-bottom: 16px;\n}\n.login-footer p {\n  font-size: 12px;\n  color: rgba(148, 163, 184, 0.7);\n}\n.login-footer .register-link {\n  color: #60a5fa;\n  font-weight: 700;\n  text-decoration: none;\n  margin-right: 4px;\n}\n.login-footer .register-link:hover {\n  text-decoration: underline;\n}\n@media (max-width: 480px) {\n  .login-card {\n    padding: 32px 24px;\n    border-radius: 20px;\n  }\n  .logo-inner {\n    width: 60px;\n    height: 60px;\n    border-radius: 16px;\n  }\n  .logo-inner .material-icons-round {\n    font-size: 30px;\n  }\n  .app-title {\n    font-size: 26px;\n  }\n}\n/*# sourceMappingURL=login.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/pages/login/login.ts", lineNumber: 14 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-UKJC2IEN.js.map
