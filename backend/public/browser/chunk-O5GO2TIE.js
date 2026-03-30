import {
  Injectable,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-VUZEB5JS.js";

// src/app/services/toast.service.ts
var ToastService = class _ToastService {
  counter = 0;
  toasts = signal([], ...ngDevMode ? [{ debugName: "toasts" }] : (
    /* istanbul ignore next */
    []
  ));
  /* ── confirm modal state ── */
  showConfirm = signal(false, ...ngDevMode ? [{ debugName: "showConfirm" }] : (
    /* istanbul ignore next */
    []
  ));
  confirmOptions = signal({ message: "" }, ...ngDevMode ? [{ debugName: "confirmOptions" }] : (
    /* istanbul ignore next */
    []
  ));
  confirmResolver = null;
  /* ── toast helpers ── */
  success(message, title = "\u062A\u0645\u062A \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0628\u0646\u062C\u0627\u062D", duration = 4e3) {
    this.add("success", title, message, duration);
  }
  error(message, title = "\u062D\u062F\u062B \u062E\u0637\u0623", duration = 0) {
    this.add("error", title, message, duration);
  }
  warning(message, title = "\u062A\u0646\u0628\u064A\u0647", duration = 4500) {
    this.add("warning", title, message, duration);
  }
  info(message, title = "\u0645\u0639\u0644\u0648\u0645\u0629", duration = 4e3) {
    this.add("info", title, message, duration);
  }
  add(type, title, message, duration) {
    const id = ++this.counter;
    const toast = { id, type, title, message, duration };
    this.toasts.update((list) => [...list, toast]);
    if (duration > 0) {
      setTimeout(() => this.startRemove(id), duration);
    }
  }
  startRemove(id) {
    this.toasts.update((list) => list.map((t) => t.id === id ? __spreadProps(__spreadValues({}, t), { removing: true }) : t));
    setTimeout(() => this.remove(id), 350);
  }
  remove(id) {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
  /* ── confirm dialog ── */
  confirm(options) {
    const opts = typeof options === "string" ? { message: options } : options;
    if (!opts.title)
      opts.title = "\u062A\u0623\u0643\u064A\u062F";
    if (!opts.confirmText)
      opts.confirmText = "\u062A\u0623\u0643\u064A\u062F";
    if (!opts.cancelText)
      opts.cancelText = "\u0625\u0644\u063A\u0627\u0621";
    if (!opts.type)
      opts.type = "danger";
    this.confirmOptions.set(opts);
    this.showConfirm.set(true);
    return new Promise((resolve) => {
      this.confirmResolver = resolve;
    });
  }
  resolveConfirm(result) {
    this.showConfirm.set(false);
    if (this.confirmResolver) {
      this.confirmResolver(result);
      this.confirmResolver = null;
    }
  }
  static \u0275fac = function ToastService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ToastService
};
//# sourceMappingURL=chunk-O5GO2TIE.js.map
