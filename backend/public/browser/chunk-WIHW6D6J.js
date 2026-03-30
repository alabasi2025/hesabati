import {
  Injectable,
  effect,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-VUZEB5JS.js";

// src/app/services/theme.service.ts
var ThemeService = class _ThemeService {
  STORAGE_KEY = "hesabati_theme";
  theme = signal(this.loadTheme(), ...ngDevMode ? [{ debugName: "theme" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor() {
    effect(() => {
      this.applyTheme(this.theme());
    });
  }
  loadTheme() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved === "dark" ? "dark" : "light";
  }
  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }
  toggle() {
    this.theme.set(this.theme() === "dark" ? "light" : "dark");
  }
  isDark() {
    return this.theme() === "dark";
  }
  static \u0275fac = function ThemeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThemeService, factory: _ThemeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  ThemeService
};
//# sourceMappingURL=chunk-WIHW6D6J.js.map
