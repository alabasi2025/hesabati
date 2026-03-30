import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-VUZEB5JS.js";

// src/app/services/business.service.ts
var BusinessService = class _BusinessService {
  currentBusinessId = signal(null, ...ngDevMode ? [{ debugName: "currentBusinessId" }] : (
    /* istanbul ignore next */
    []
  ));
  currentBusinessName = signal("", ...ngDevMode ? [{ debugName: "currentBusinessName" }] : (
    /* istanbul ignore next */
    []
  ));
  currentBusinessColor = signal("#f59e0b", ...ngDevMode ? [{ debugName: "currentBusinessColor" }] : (
    /* istanbul ignore next */
    []
  ));
  currentBusinessIcon = signal("bolt", ...ngDevMode ? [{ debugName: "currentBusinessIcon" }] : (
    /* istanbul ignore next */
    []
  ));
  currentBusinessType = signal("stations", ...ngDevMode ? [{ debugName: "currentBusinessType" }] : (
    /* istanbul ignore next */
    []
  ));
  setBusiness(id, name, color, icon, type = "stations") {
    this.currentBusinessId.set(id);
    this.currentBusinessName.set(name);
    this.currentBusinessColor.set(color);
    this.currentBusinessIcon.set(icon);
    this.currentBusinessType.set(type);
    localStorage.setItem("hesabati_biz", JSON.stringify({ id, name, color, icon, type }));
  }
  /** تعيين معرف العمل فوراً من المسار حتى تبدأ الصفحات الفرعية التحميل دون انتظار تفاصيل العمل */
  setBusinessId(id) {
    this.currentBusinessId.set(id);
  }
  loadFromStorage() {
    const saved = localStorage.getItem("hesabati_biz");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const { id, name, color, icon, type } = parsed;
        this.currentBusinessId.set(id);
        this.currentBusinessName.set(name);
        this.currentBusinessColor.set(color);
        this.currentBusinessIcon.set(icon);
        this.currentBusinessType.set(type || "stations");
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
  current() {
    return {
      id: this.currentBusinessId(),
      name: this.currentBusinessName(),
      color: this.currentBusinessColor(),
      icon: this.currentBusinessIcon(),
      type: this.currentBusinessType()
    };
  }
  clear() {
    this.currentBusinessId.set(null);
    this.currentBusinessName.set("");
    this.currentBusinessType.set("stations");
    localStorage.removeItem("hesabati_biz");
  }
  static \u0275fac = function BusinessService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BusinessService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BusinessService, factory: _BusinessService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BusinessService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  BusinessService
};
//# sourceMappingURL=chunk-5SFBIGEU.js.map
