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
  FormsModule,
  NgSelectOption,
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
  __spreadProps,
  __spreadValues,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VUZEB5JS.js";

// src/app/pages/attachments-archive/attachments-archive.ts
var _forTrack0 = ($index, $item) => $item.type;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.fullPath;
function AttachmentsArchiveComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd();
  }
}
function AttachmentsArchiveComponent_Conditional_18_For_113_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lvl_r3 = ctx.$implicit;
    \u0275\u0275property("value", lvl_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(lvl_r3);
  }
}
function AttachmentsArchiveComponent_Conditional_18_Conditional_131_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 60);
    \u0275\u0275text(2, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631.");
    \u0275\u0275elementEnd()();
  }
}
function AttachmentsArchiveComponent_Conditional_18_Conditional_132_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 61);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "button", 62);
    \u0275\u0275listener("click", function AttachmentsArchiveComponent_Conditional_18_Conditional_132_For_1_Template_button_click_12_listener() {
      const row_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.rebuildAttachmentPath(row_r5));
    });
    \u0275\u0275text(13, "\u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0645\u0633\u0627\u0631");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r5.fileName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", row_r5.voucherNumber || "-", " / ", row_r5.voucherType === "receipt" ? "\u0642\u0628\u0636" : "\u0635\u0631\u0641");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", row_r5.treasuryType, " / ", row_r5.treasuryName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r5.importance);
    \u0275\u0275advance();
    \u0275\u0275property("title", row_r5.filePath);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r5.filePath || "-");
  }
}
function AttachmentsArchiveComponent_Conditional_18_Conditional_132_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, AttachmentsArchiveComponent_Conditional_18_Conditional_132_For_1_Template, 14, 8, "tr", null, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.archiveItems());
  }
}
function AttachmentsArchiveComponent_Conditional_18_For_137_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u062E\u0632\u0627\u0626\u0646 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u062D\u0627\u0644\u064A\u0627\u064B.");
    \u0275\u0275elementEnd();
  }
}
function AttachmentsArchiveComponent_Conditional_18_For_137_Conditional_4_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "div", 66);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 67);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 67);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4C1} ", item_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4C2} ", item_r6.receiptFolder);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4C2} ", item_r6.paymentFolder);
  }
}
function AttachmentsArchiveComponent_Conditional_18_For_137_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, AttachmentsArchiveComponent_Conditional_18_For_137_Conditional_4_For_1_Template, 7, 3, "div", 65, _forTrack1);
  }
  if (rf & 2) {
    const section_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275repeater(section_r7.items);
  }
}
function AttachmentsArchiveComponent_Conditional_18_For_137_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "div", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, AttachmentsArchiveComponent_Conditional_18_For_137_Conditional_3_Template, 2, 0, "div", 64)(4, AttachmentsArchiveComponent_Conditional_18_For_137_Conditional_4_Template, 2, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const section_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4C1} ", section_r7.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(section_r7.items.length === 0 ? 3 : 4);
  }
}
function AttachmentsArchiveComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "section", 10)(2, "h3");
    \u0275\u0275text(3, "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062D\u0641\u0638");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "label", 11);
    \u0275\u0275text(5, "\u0645\u0633\u0627\u0631 \u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A (\u062E\u0627\u0631\u062C \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 12)(7, "input", 13);
    \u0275\u0275listener("input", function AttachmentsArchiveComponent_Conditional_18_Template_input_input_7_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setBasePath($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 14);
    \u0275\u0275listener("click", function AttachmentsArchiveComponent_Conditional_18_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPathPicker());
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 15);
    \u0275\u0275text(11, "\u062D\u062F\u062F \u0627\u0644\u0645\u0633\u0627\u0631 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 (\u0645\u062B\u0627\u0644: D:\\Archive\\Attachments) \u062B\u0645 \u0627\u0636\u063A\u0637 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A\u060C \u0648\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0634\u062C\u0631\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062F\u0627\u062E\u0644\u0647.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 16)(13, "div")(14, "label", 17);
    \u0275\u0275text(15, "\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629: \u0635\u0646\u062F\u0648\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 18);
    \u0275\u0275listener("input", function AttachmentsArchiveComponent_Conditional_18_Template_input_input_16_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFolderByType("fund", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div")(18, "label", 19);
    \u0275\u0275text(19, "\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629: \u0628\u0646\u0643");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 20);
    \u0275\u0275listener("input", function AttachmentsArchiveComponent_Conditional_18_Template_input_input_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFolderByType("bank", $event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 16)(22, "div")(23, "label", 21);
    \u0275\u0275text(24, "\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629: \u0635\u0631\u0627\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 22);
    \u0275\u0275listener("input", function AttachmentsArchiveComponent_Conditional_18_Template_input_input_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFolderByType("exchange", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div")(27, "label", 23);
    \u0275\u0275text(28, "\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629: \u0645\u062D\u0641\u0638\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 24);
    \u0275\u0275listener("input", function AttachmentsArchiveComponent_Conditional_18_Template_input_input_29_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFolderByType("e_wallet", $event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 16)(31, "div")(32, "label", 25);
    \u0275\u0275text(33, "\u0645\u062C\u0644\u062F \u0633\u0646\u062F \u0627\u0644\u0642\u0628\u0636");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 26);
    \u0275\u0275listener("input", function AttachmentsArchiveComponent_Conditional_18_Template_input_input_34_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setVoucherFolder("receipt", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div")(36, "label", 27);
    \u0275\u0275text(37, "\u0645\u062C\u0644\u062F \u0633\u0646\u062F \u0627\u0644\u0635\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 28);
    \u0275\u0275listener("input", function AttachmentsArchiveComponent_Conditional_18_Template_input_input_38_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setVoucherFolder("payment", $event.target.value));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "label", 29);
    \u0275\u0275text(40, "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0623\u0647\u0645\u064A\u0629 (\u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0641\u0627\u0635\u0644\u0629)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 30);
    \u0275\u0275listener("input", function AttachmentsArchiveComponent_Conditional_18_Template_input_input_41_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setImportanceLevels($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "p", 15);
    \u0275\u0275text(43, "\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u062A\u0628\u0642\u0649 \u062D\u0633\u0628 \u0627\u0644\u0634\u062C\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629: \u0646\u0648\u0639 \u062E\u0632\u064A\u0646\u0629 \u2192 \u062E\u0632\u064A\u0646\u0629 \u2192 \u0633\u0646\u062F \u0642\u0628\u0636/\u0635\u0631\u0641.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "section", 10)(45, "h3");
    \u0275\u0275text(46, "\u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 31)(48, "div", 32)(49, "div", 33)(50, "span", 2);
    \u0275\u0275text(51, "attach_file");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div", 34);
    \u0275\u0275text(53, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 35);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 36)(57, "div", 33)(58, "span", 2);
    \u0275\u0275text(59, "call_received");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 34);
    \u0275\u0275text(61, "\u0633\u0646\u062F\u0627\u062A \u0642\u0628\u0636");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 35);
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 37)(65, "div", 33)(66, "span", 2);
    \u0275\u0275text(67, "call_made");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 34);
    \u0275\u0275text(69, "\u0633\u0646\u062F\u0627\u062A \u0635\u0631\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div", 35);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div", 38)(73, "div", 33)(74, "span", 2);
    \u0275\u0275text(75, "priority_high");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 34);
    \u0275\u0275text(77, "\u0645\u0631\u0641\u0642\u0627\u062A \u0639\u0627\u062C\u0644\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "div", 35);
    \u0275\u0275text(79);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(80, "section", 39)(81, "div", 40)(82, "h3");
    \u0275\u0275text(83, "\u0645\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0623\u0631\u0634\u064A\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "div", 41)(85, "button", 42);
    \u0275\u0275listener("click", function AttachmentsArchiveComponent_Conditional_18_Template_button_click_85_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyFilters());
    });
    \u0275\u0275text(86);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "button", 43);
    \u0275\u0275listener("click", function AttachmentsArchiveComponent_Conditional_18_Template_button_click_87_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    });
    \u0275\u0275text(88, "\u062A\u0641\u0631\u064A\u063A \u0627\u0644\u0641\u0644\u0627\u062A\u0631");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(89, "div", 44)(90, "input", 45);
    \u0275\u0275listener("input", function AttachmentsArchiveComponent_Conditional_18_Template_input_input_90_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("search", $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "select", 46);
    \u0275\u0275listener("change", function AttachmentsArchiveComponent_Conditional_18_Template_select_change_91_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("voucherType", $event.target.value));
    });
    \u0275\u0275elementStart(92, "option", 47);
    \u0275\u0275text(93, "\u0643\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0633\u0646\u062F\u0627\u062A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "option", 48);
    \u0275\u0275text(95, "\u0633\u0646\u062F \u0642\u0628\u0636");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "option", 49);
    \u0275\u0275text(97, "\u0633\u0646\u062F \u0635\u0631\u0641");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(98, "select", 50);
    \u0275\u0275listener("change", function AttachmentsArchiveComponent_Conditional_18_Template_select_change_98_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("treasuryType", $event.target.value));
    });
    \u0275\u0275elementStart(99, "option", 47);
    \u0275\u0275text(100, "\u0643\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062E\u0632\u0627\u0626\u0646");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "option", 51);
    \u0275\u0275text(102, "\u0635\u0646\u062F\u0648\u0642");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "option", 52);
    \u0275\u0275text(104, "\u0628\u0646\u0643");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "option", 53);
    \u0275\u0275text(106, "\u0635\u0631\u0627\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "option", 54);
    \u0275\u0275text(108, "\u0645\u062D\u0641\u0638\u0629");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(109, "select", 55);
    \u0275\u0275listener("change", function AttachmentsArchiveComponent_Conditional_18_Template_select_change_109_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("importance", $event.target.value));
    });
    \u0275\u0275elementStart(110, "option", 47);
    \u0275\u0275text(111, "\u0643\u0644 \u062F\u0631\u062C\u0627\u062A \u0627\u0644\u0623\u0647\u0645\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(112, AttachmentsArchiveComponent_Conditional_18_For_113_Template, 2, 2, "option", 56, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(114, "div", 57)(115, "table", 58)(116, "thead")(117, "tr")(118, "th");
    \u0275\u0275text(119, "\u0627\u0644\u0645\u0644\u0641");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(120, "th");
    \u0275\u0275text(121, "\u0627\u0644\u0633\u0646\u062F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "th");
    \u0275\u0275text(123, "\u0646\u0648\u0639/\u0627\u0633\u0645 \u0627\u0644\u062E\u0632\u064A\u0646\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(124, "th");
    \u0275\u0275text(125, "\u0627\u0644\u0623\u0647\u0645\u064A\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(126, "th");
    \u0275\u0275text(127, "\u0627\u0644\u0645\u0633\u0627\u0631");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "th");
    \u0275\u0275text(129, "\u0625\u062C\u0631\u0627\u0621");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(130, "tbody");
    \u0275\u0275conditionalCreate(131, AttachmentsArchiveComponent_Conditional_18_Conditional_131_Template, 3, 0, "tr")(132, AttachmentsArchiveComponent_Conditional_18_Conditional_132_Template, 2, 0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(133, "section", 39)(134, "h3");
    \u0275\u0275text(135, "\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0634\u062C\u0631\u0629");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(136, AttachmentsArchiveComponent_Conditional_18_For_137_Template, 5, 2, "div", 59, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r1.form().basePath);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.choosingBasePath());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.choosingBasePath() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u0641\u062A\u062D..." : "\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u062C\u0644\u062F \u0645\u0646 \u0627\u0644\u062C\u0647\u0627\u0632", " ");
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r1.form().folderByType.fund);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.form().folderByType.bank);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.form().folderByType.exchange);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.form().folderByType.e_wallet);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.form().voucherFolders.receipt);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.form().voucherFolders.payment);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.form().importanceLevels.join(", "));
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate(ctx_r1.stats().total);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.stats().receipts);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.stats().payments);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.stats().urgent);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.refreshingItems());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.refreshingItems() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B..." : "\u062A\u062D\u062F\u064A\u062B", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.refreshingItems());
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.filters().search);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.filters().voucherType);
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r1.filters().treasuryType);
    \u0275\u0275advance(11);
    \u0275\u0275property("value", ctx_r1.filters().importance);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.form().importanceLevels);
    \u0275\u0275advance(19);
    \u0275\u0275conditional(ctx_r1.archiveItems().length === 0 ? 131 : 132);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.treePreview());
  }
}
function AttachmentsArchiveComponent_Conditional_19_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 78);
    \u0275\u0275text(1, "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...");
    \u0275\u0275elementEnd();
  }
}
function AttachmentsArchiveComponent_Conditional_19_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 78);
    \u0275\u0275text(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062C\u0644\u062F\u0627\u062A.");
    \u0275\u0275elementEnd();
  }
}
function AttachmentsArchiveComponent_Conditional_19_Conditional_21_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 80);
    \u0275\u0275listener("click", function AttachmentsArchiveComponent_Conditional_19_Conditional_21_For_1_Template_button_click_0_listener() {
      const entry_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openPathEntry(entry_r10));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4C1} ", entry_r10.name);
  }
}
function AttachmentsArchiveComponent_Conditional_19_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, AttachmentsArchiveComponent_Conditional_19_Conditional_21_For_1_Template, 2, 1, "button", 79, _forTrack2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.pathPickerEntries());
  }
}
function AttachmentsArchiveComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 68)(2, "div", 69)(3, "h3");
    \u0275\u0275text(4, "\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u062C\u0644\u062F \u0645\u0646 \u0627\u0644\u062C\u0647\u0627\u0632");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 70);
    \u0275\u0275listener("click", function AttachmentsArchiveComponent_Conditional_19_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePathPicker());
    });
    \u0275\u0275text(6, "\u0625\u063A\u0644\u0627\u0642");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 71);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 72)(10, "button", 73);
    \u0275\u0275listener("click", function AttachmentsArchiveComponent_Conditional_19_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToParentPath());
    });
    \u0275\u0275text(11, "\u2B06 \u0631\u062C\u0648\u0639");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 74);
    \u0275\u0275listener("click", function AttachmentsArchiveComponent_Conditional_19_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.chooseCurrentPathFromPicker());
    });
    \u0275\u0275text(13, "\u0627\u062E\u062A\u064A\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u062C\u0644\u062F");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 75)(15, "input", 76);
    \u0275\u0275listener("input", function AttachmentsArchiveComponent_Conditional_19_Template_input_input_15_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setNewFolderName($event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 74);
    \u0275\u0275listener("click", function AttachmentsArchiveComponent_Conditional_19_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.createFolderInPicker());
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 77);
    \u0275\u0275conditionalCreate(19, AttachmentsArchiveComponent_Conditional_19_Conditional_19_Template, 2, 0, "div", 78)(20, AttachmentsArchiveComponent_Conditional_19_Conditional_20_Template, 2, 0, "div", 78)(21, AttachmentsArchiveComponent_Conditional_19_Conditional_21_Template, 2, 0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.pathPickerCurrentPath() || "\u0627\u062E\u062A\u0631 \u0642\u0631\u0635\u064B\u0627");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.pathPickerParentPath() || ctx_r1.pathPickerLoading());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.pathPickerCurrentPath() || ctx_r1.pathPickerLoading());
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r1.newFolderName());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.creatingFolder() || ctx_r1.pathPickerLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.creatingFolder() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0646\u0634\u0627\u0621..." : "\u0625\u0646\u0634\u0627\u0621 \u0645\u062C\u0644\u062F \u062C\u062F\u064A\u062F", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.pathPickerLoading() ? 19 : ctx_r1.pathPickerEntries().length === 0 ? 20 : 21);
  }
}
var AttachmentsArchiveComponent = class _AttachmentsArchiveComponent extends BasePageComponent {
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
  creatingTree = signal(false, ...ngDevMode ? [{ debugName: "creatingTree" }] : (
    /* istanbul ignore next */
    []
  ));
  choosingBasePath = signal(false, ...ngDevMode ? [{ debugName: "choosingBasePath" }] : (
    /* istanbul ignore next */
    []
  ));
  showPathPicker = signal(false, ...ngDevMode ? [{ debugName: "showPathPicker" }] : (
    /* istanbul ignore next */
    []
  ));
  pathPickerLoading = signal(false, ...ngDevMode ? [{ debugName: "pathPickerLoading" }] : (
    /* istanbul ignore next */
    []
  ));
  pathPickerCurrentPath = signal("", ...ngDevMode ? [{ debugName: "pathPickerCurrentPath" }] : (
    /* istanbul ignore next */
    []
  ));
  pathPickerParentPath = signal(null, ...ngDevMode ? [{ debugName: "pathPickerParentPath" }] : (
    /* istanbul ignore next */
    []
  ));
  pathPickerEntries = signal([], ...ngDevMode ? [{ debugName: "pathPickerEntries" }] : (
    /* istanbul ignore next */
    []
  ));
  newFolderName = signal("", ...ngDevMode ? [{ debugName: "newFolderName" }] : (
    /* istanbul ignore next */
    []
  ));
  creatingFolder = signal(false, ...ngDevMode ? [{ debugName: "creatingFolder" }] : (
    /* istanbul ignore next */
    []
  ));
  funds = signal([], ...ngDevMode ? [{ debugName: "funds" }] : (
    /* istanbul ignore next */
    []
  ));
  accounts = signal([], ...ngDevMode ? [{ debugName: "accounts" }] : (
    /* istanbul ignore next */
    []
  ));
  archiveItems = signal([], ...ngDevMode ? [{ debugName: "archiveItems" }] : (
    /* istanbul ignore next */
    []
  ));
  refreshingItems = signal(false, ...ngDevMode ? [{ debugName: "refreshingItems" }] : (
    /* istanbul ignore next */
    []
  ));
  form = signal(this.getDefaultSettings(), ...ngDevMode ? [{ debugName: "form" }] : (
    /* istanbul ignore next */
    []
  ));
  filters = signal({
    search: "",
    voucherType: "",
    treasuryType: "",
    importance: ""
  }, ...ngDevMode ? [{ debugName: "filters" }] : (
    /* istanbul ignore next */
    []
  ));
  onBizIdChange() {
    void this.load();
  }
  getDefaultSettings() {
    return {
      basePath: String.raw`D:\Archive\Attachments`,
      folderByType: {
        fund: "\u0635\u0646\u062F\u0648\u0642",
        bank: "\u0628\u0646\u0643",
        exchange: "\u0635\u0631\u0627\u0641",
        e_wallet: "\u0645\u062D\u0641\u0638\u0629"
      },
      voucherFolders: {
        receipt: "\u0633\u0646\u062F \u0642\u0628\u0636",
        payment: "\u0633\u0646\u062F \u0635\u0631\u0641"
      },
      importanceLevels: ["\u0639\u0627\u062C\u0644", "\u0645\u0647\u0645", "\u0639\u0627\u062F\u064A"]
    };
  }
  normalizeSettings(raw) {
    const defaults = this.getDefaultSettings();
    const importance = Array.isArray(raw?.importanceLevels) ? raw.importanceLevels.map((v) => String(v || "").trim()).filter(Boolean) : [];
    return {
      basePath: String(raw?.basePath || defaults.basePath),
      folderByType: {
        fund: String(raw?.folderByType?.fund || defaults.folderByType.fund),
        bank: String(raw?.folderByType?.bank || defaults.folderByType.bank),
        exchange: String(raw?.folderByType?.exchange || defaults.folderByType.exchange),
        e_wallet: String(raw?.folderByType?.e_wallet || defaults.folderByType.e_wallet)
      },
      voucherFolders: {
        receipt: String(raw?.voucherFolders?.receipt || defaults.voucherFolders.receipt),
        payment: String(raw?.voucherFolders?.payment || defaults.voucherFolders.payment)
      },
      importanceLevels: importance.length ? importance : defaults.importanceLevels
    };
  }
  async load() {
    this.loading.set(true);
    try {
      const [settings, funds, accounts] = await Promise.all([
        this.api.getAttachmentsArchiveSettings(this.bizId),
        this.api.getFunds(this.bizId, true),
        this.api.getAccounts(this.bizId)
      ]);
      this.form.set(this.normalizeSettings(settings));
      this.funds.set(Array.isArray(funds) ? funds : []);
      this.accounts.set(Array.isArray(accounts) ? accounts : []);
      await this.loadArchiveItems();
    } catch (err) {
      this.toast.error(err instanceof Error ? err.message : "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0623\u0631\u0634\u0641\u0629");
    } finally {
      this.loading.set(false);
    }
  }
  setBasePath(value) {
    this.form.update((prev) => __spreadProps(__spreadValues({}, prev), { basePath: value }));
  }
  async openPathPicker() {
    this.showPathPicker.set(true);
    await this.loadPathPicker("");
  }
  closePathPicker() {
    this.showPathPicker.set(false);
  }
  async loadPathPicker(dirPath) {
    this.pathPickerLoading.set(true);
    this.choosingBasePath.set(true);
    try {
      const result = await this.api.browseAttachmentsArchiveFs(this.bizId, dirPath || void 0);
      this.pathPickerCurrentPath.set(String(result?.currentPath || ""));
      this.pathPickerParentPath.set(result?.parentPath ? String(result.parentPath) : null);
      this.pathPickerEntries.set(Array.isArray(result?.entries) ? result.entries : []);
    } catch (err) {
      this.toast.error(err instanceof Error ? err.message : "\u062A\u0639\u0630\u0631 \u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0645\u062C\u0644\u062F\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632");
    } finally {
      this.pathPickerLoading.set(false);
      this.choosingBasePath.set(false);
    }
  }
  async goToParentPath() {
    const parent = this.pathPickerParentPath();
    if (!parent)
      return;
    await this.loadPathPicker(parent);
  }
  async openPathEntry(entry) {
    await this.loadPathPicker(entry.fullPath);
  }
  chooseCurrentPathFromPicker() {
    const current = this.pathPickerCurrentPath();
    if (!current)
      return;
    this.setBasePath(current);
    this.showPathPicker.set(false);
    this.toast.success("\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u062C\u0644\u062F");
  }
  setNewFolderName(value) {
    this.newFolderName.set(String(value || ""));
  }
  async createFolderInPicker() {
    const currentPath = this.pathPickerCurrentPath();
    const folderName = this.newFolderName().trim();
    if (!currentPath) {
      this.toast.warning("\u0627\u062E\u062A\u0631 \u0645\u0633\u0627\u0631\u064B\u0627 \u0623\u0648\u0644\u0627\u064B \u062B\u0645 \u0623\u0646\u0634\u0626 \u0627\u0644\u0645\u062C\u0644\u062F");
      return;
    }
    if (!folderName) {
      this.toast.warning("\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0645\u062C\u0644\u062F \u0627\u0644\u062C\u062F\u064A\u062F");
      return;
    }
    this.creatingFolder.set(true);
    try {
      const response = await this.api.createAttachmentsArchiveFolder(this.bizId, currentPath, folderName);
      const createdPath = String(response?.createdPath || "").trim();
      this.newFolderName.set("");
      await this.loadPathPicker(currentPath);
      if (createdPath)
        await this.loadPathPicker(createdPath);
      this.toast.success("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u062C\u0644\u062F \u0648\u0627\u0644\u062F\u062E\u0648\u0644 \u0625\u0644\u064A\u0647");
    } catch (err) {
      this.toast.error(err instanceof Error ? err.message : "\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u062C\u0644\u062F");
    } finally {
      this.creatingFolder.set(false);
    }
  }
  setFolderByType(type, value) {
    this.form.update((prev) => __spreadProps(__spreadValues({}, prev), {
      folderByType: __spreadProps(__spreadValues({}, prev.folderByType), { [type]: value })
    }));
  }
  setVoucherFolder(kind, value) {
    this.form.update((prev) => __spreadProps(__spreadValues({}, prev), {
      voucherFolders: __spreadProps(__spreadValues({}, prev.voucherFolders), { [kind]: value })
    }));
  }
  setImportanceLevels(value) {
    const levels = value.split(",").map((v) => v.trim()).filter(Boolean);
    this.form.update((prev) => __spreadProps(__spreadValues({}, prev), { importanceLevels: levels }));
  }
  async saveSettings() {
    this.saving.set(true);
    try {
      const payload = this.form();
      const response = await this.api.saveAttachmentsArchiveSettings(this.bizId, payload);
      const dirs = Number(response?.treeResult?.directories || 0);
      this.toast.success(`\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0648\u0625\u0646\u0634\u0627\u0621 ${dirs} \u0645\u062C\u0644\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B`);
      await this.loadArchiveItems();
    } catch (err) {
      this.toast.error(err instanceof Error ? err.message : "\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0623\u0631\u0634\u0641\u0629");
    } finally {
      this.saving.set(false);
    }
  }
  filterAccountsByType(type) {
    return this.accounts().filter((acc) => {
      const accountType = String(acc?.accountType ?? acc?.account_type ?? "").toLowerCase();
      return accountType === type;
    });
  }
  treePreview = computed(() => {
    const cfg = this.form();
    const byType = [
      { type: "fund", label: cfg.folderByType.fund, rows: this.funds() },
      { type: "bank", label: cfg.folderByType.bank, rows: this.filterAccountsByType("bank") },
      { type: "exchange", label: cfg.folderByType.exchange, rows: this.filterAccountsByType("exchange") },
      { type: "e_wallet", label: cfg.folderByType.e_wallet, rows: this.filterAccountsByType("e_wallet") }
    ];
    return byType.map((section) => __spreadProps(__spreadValues({}, section), {
      items: section.rows.map((row) => ({
        id: row?.id,
        name: String(row?.name || row?.label || `\u0639\u0646\u0635\u0631 ${row?.id ?? ""}`),
        receiptFolder: cfg.voucherFolders.receipt,
        paymentFolder: cfg.voucherFolders.payment
      }))
    }));
  }, ...ngDevMode ? [{ debugName: "treePreview" }] : (
    /* istanbul ignore next */
    []
  ));
  async loadArchiveItems() {
    this.refreshingItems.set(true);
    try {
      const f = this.filters();
      const rows = await this.api.getAttachmentsArchiveItems(this.bizId, {
        search: f.search || void 0,
        voucherType: f.voucherType || void 0,
        treasuryType: f.treasuryType || void 0,
        importance: f.importance || void 0
      });
      this.archiveItems.set(Array.isArray(rows) ? rows : []);
    } catch (err) {
      this.toast.error(err instanceof Error ? err.message : "\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0623\u0631\u0634\u0641\u0629");
    } finally {
      this.refreshingItems.set(false);
    }
  }
  setFilter(key, value) {
    this.filters.update((prev) => __spreadProps(__spreadValues({}, prev), { [key]: String(value || "") }));
  }
  async applyFilters() {
    await this.loadArchiveItems();
  }
  async clearFilters() {
    this.filters.set({ search: "", voucherType: "", treasuryType: "", importance: "" });
    await this.loadArchiveItems();
  }
  async rebuildAttachmentPath(item) {
    const importance = String(item?.importance || this.form().importanceLevels[2] || "\u0639\u0627\u062F\u064A");
    try {
      await this.api.rebuildAttachmentArchivePath(this.bizId, Number(item.id), importance);
      this.toast.success("\u062A\u0645\u062A \u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0645\u0633\u0627\u0631");
      await this.loadArchiveItems();
    } catch (err) {
      this.toast.error(err instanceof Error ? err.message : "\u062A\u0639\u0630\u0631 \u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0645\u0633\u0627\u0631");
    }
  }
  stats = computed(() => {
    const rows = this.archiveItems();
    const total = rows.length;
    const receipts = rows.filter((r) => r.voucherType === "receipt").length;
    const payments = rows.filter((r) => r.voucherType === "payment").length;
    const urgent = rows.filter((r) => r.importance === "\u0639\u0627\u062C\u0644").length;
    return { total, receipts, payments, urgent };
  }, ...ngDevMode ? [{ debugName: "stats" }] : (
    /* istanbul ignore next */
    []
  ));
  async buildTreeNow() {
    this.creatingTree.set(true);
    try {
      const response = await this.api.buildAttachmentsArchiveTree(this.bizId);
      const dirs = Number(response?.treeResult?.directories || 0);
      this.toast.success(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 ${dirs} \u0645\u062C\u0644\u062F \u062F\u0627\u062E\u0644 \u0645\u0633\u0627\u0631 \u0627\u0644\u0623\u0631\u0634\u0641\u0629`);
    } catch (err) {
      this.toast.error(err instanceof Error ? err.message : "\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0645\u062C\u0644\u062F\u0627\u062A \u0627\u0644\u0623\u0631\u0634\u0641\u0629");
    } finally {
      this.creatingTree.set(false);
    }
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275AttachmentsArchiveComponent_BaseFactory;
    return function AttachmentsArchiveComponent_Factory(__ngFactoryType__) {
      return (\u0275AttachmentsArchiveComponent_BaseFactory || (\u0275AttachmentsArchiveComponent_BaseFactory = \u0275\u0275getInheritedFactory(_AttachmentsArchiveComponent)))(__ngFactoryType__ || _AttachmentsArchiveComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AttachmentsArchiveComponent, selectors: [["app-attachments-archive"]], features: [\u0275\u0275InheritDefinitionFeature], decls: 20, vars: 8, consts: [[1, "page-container"], [1, "page-header"], [1, "material-icons-round"], [1, "header-actions"], [1, "btn-success", 3, "click", "disabled"], [1, "btn-primary", 3, "click", "disabled"], [1, "header-subtitle"], [1, "loading-card"], [1, "content-grid"], [1, "modal-overlay", "path-picker-overlay"], [1, "card"], ["for", "archive-base-path", 1, "field-label"], [1, "base-path-row"], ["id", "archive-base-path", "type", "text", "title", "\u0645\u0633\u0627\u0631 \u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A", "placeholder", "D:\\Archive\\Attachments", 1, "field-input", 3, "input", "value"], ["type", "button", 1, "btn-primary", "btn-sm", "btn-folder", 3, "click", "disabled"], [1, "hint"], [1, "split-2"], ["for", "folder-type-fund", 1, "field-label"], ["id", "folder-type-fund", "title", "\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0635\u0646\u062F\u0648\u0642", "placeholder", "\u0635\u0646\u062F\u0648\u0642", "type", "text", 1, "field-input", 3, "input", "value"], ["for", "folder-type-bank", 1, "field-label"], ["id", "folder-type-bank", "title", "\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0628\u0646\u0643", "placeholder", "\u0628\u0646\u0643", "type", "text", 1, "field-input", 3, "input", "value"], ["for", "folder-type-exchange", 1, "field-label"], ["id", "folder-type-exchange", "title", "\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0635\u0631\u0627\u0641", "placeholder", "\u0635\u0631\u0627\u0641", "type", "text", 1, "field-input", 3, "input", "value"], ["for", "folder-type-wallet", 1, "field-label"], ["id", "folder-type-wallet", "title", "\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0645\u062D\u0641\u0638\u0629", "placeholder", "\u0645\u062D\u0641\u0638\u0629", "type", "text", 1, "field-input", 3, "input", "value"], ["for", "folder-voucher-receipt", 1, "field-label"], ["id", "folder-voucher-receipt", "title", "\u0645\u062C\u0644\u062F \u0633\u0646\u062F \u0627\u0644\u0642\u0628\u0636", "placeholder", "\u0633\u0646\u062F \u0642\u0628\u0636", "type", "text", 1, "field-input", 3, "input", "value"], ["for", "folder-voucher-payment", 1, "field-label"], ["id", "folder-voucher-payment", "title", "\u0645\u062C\u0644\u062F \u0633\u0646\u062F \u0627\u0644\u0635\u0631\u0641", "placeholder", "\u0633\u0646\u062F \u0635\u0631\u0641", "type", "text", 1, "field-input", 3, "input", "value"], ["for", "importance-levels", 1, "field-label"], ["id", "importance-levels", "type", "text", "title", "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0623\u0647\u0645\u064A\u0629", "placeholder", "\u0639\u0627\u062C\u0644, \u0645\u0647\u0645, \u0639\u0627\u062F\u064A", 1, "field-input", 3, "input", "value"], [1, "stats-grid"], [1, "stat-card", "blue"], [1, "stat-icon"], [1, "stat-label"], [1, "stat-value"], [1, "stat-card", "green"], [1, "stat-card", "amber"], [1, "stat-card", "red"], [1, "card", "card-wide"], [1, "card-head"], [1, "head-actions"], [1, "btn-primary", "btn-sm", 3, "click", "disabled"], [1, "btn-ghost", "btn-sm", 3, "click", "disabled"], [1, "filters-grid"], ["id", "archive-filter-search", "type", "text", "title", "\u0628\u062D\u062B \u0641\u064A \u0645\u0631\u0641\u0642\u0627\u062A \u0627\u0644\u0623\u0631\u0634\u064A\u0641", "placeholder", "\u0628\u062D\u062B: \u0627\u0633\u0645 \u0627\u0644\u0645\u0644\u0641 / \u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F / \u0627\u0644\u062E\u0632\u064A\u0646\u0629", 1, "field-input", 3, "input", "value"], ["id", "archive-filter-voucher-type", "title", "\u0641\u0644\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F", 1, "field-input", 3, "change", "value"], ["value", ""], ["value", "receipt"], ["value", "payment"], ["id", "archive-filter-treasury-type", "title", "\u0641\u0644\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629", 1, "field-input", 3, "change", "value"], ["value", "fund"], ["value", "bank"], ["value", "exchange"], ["value", "e_wallet"], ["id", "archive-filter-importance", "title", "\u0641\u0644\u062A\u0631 \u062F\u0631\u062C\u0629 \u0627\u0644\u0623\u0647\u0645\u064A\u0629", 1, "field-input", 3, "change", "value"], [3, "value"], [1, "table-wrap"], [1, "data-table", "archive-table"], [1, "tree-section"], ["colspan", "6", 1, "empty-row"], [1, "path-cell", 3, "title"], [1, "btn-primary", "btn-sm", 3, "click"], [1, "tree-type"], [1, "tree-empty"], [1, "tree-item"], [1, "tree-vault"], [1, "tree-doc"], [1, "modal-card", "path-picker-card"], [1, "path-picker-head"], ["type", "button", 1, "btn-ghost", "btn-sm", 3, "click"], [1, "path-picker-current"], [1, "path-picker-actions"], ["type", "button", 1, "btn-ghost", "btn-sm", 3, "click", "disabled"], ["type", "button", 1, "btn-primary", "btn-sm", 3, "click", "disabled"], [1, "path-picker-create"], ["type", "text", "title", "\u0627\u0633\u0645 \u0627\u0644\u0645\u062C\u0644\u062F \u0627\u0644\u062C\u062F\u064A\u062F", "placeholder", "\u0627\u0633\u0645 \u0645\u062C\u0644\u062F \u062C\u062F\u064A\u062F", 1, "field-input", 3, "input", "value"], [1, "path-picker-list"], [1, "picker-empty"], ["type", "button", 1, "path-entry", "btn-ghost", "btn-sm"], ["type", "button", 1, "path-entry", "btn-ghost", "btn-sm", 3, "click"]], template: function AttachmentsArchiveComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2")(3, "span", 2);
      \u0275\u0275text(4, "folder_open");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " \u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0644\u0644\u0645\u0631\u0641\u0642\u0627\u062A ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "button", 4);
      \u0275\u0275listener("click", function AttachmentsArchiveComponent_Template_button_click_7_listener() {
        return ctx.saveSettings();
      });
      \u0275\u0275elementStart(8, "span", 2);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 5);
      \u0275\u0275listener("click", function AttachmentsArchiveComponent_Template_button_click_11_listener() {
        return ctx.buildTreeNow();
      });
      \u0275\u0275elementStart(12, "span", 2);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "p", 6);
      \u0275\u0275text(16, "\u0625\u0639\u062F\u0627\u062F \u0645\u0633\u0627\u0631 \u0627\u0644\u062D\u0641\u0638 \u0648\u0628\u0646\u064A\u0629 \u0627\u0644\u0645\u062C\u0644\u062F\u0627\u062A \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0648\u0627\u0644\u062E\u0632\u064A\u0646\u0629");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(17, AttachmentsArchiveComponent_Conditional_17_Template, 2, 0, "div", 7)(18, AttachmentsArchiveComponent_Conditional_18_Template, 138, 22, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(19, AttachmentsArchiveComponent_Conditional_19_Template, 22, 7, "div", 9);
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", ctx.saving());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.saving() ? "sync" : "save");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.saving() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A", " ");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.creatingTree());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.creatingTree() ? "sync" : "create_new_folder");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.creatingTree() ? "\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0646\u0634\u0627\u0621..." : "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u062C\u0644\u062F\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B", " ");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.loading() ? 17 : 18);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showPathPicker() ? 19 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption], styles: ['\n\n.page-container[_ngcontent-%COMP%] {\n  max-width: 1300px;\n  direction: rtl;\n  font-family: "Tajawal", sans-serif;\n}\n.page-container[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]:not(.material-icons-round) {\n  font-family: inherit;\n}\n.header-subtitle[_ngcontent-%COMP%] {\n  margin: -12px 0 14px;\n  color: var(--text-secondary, #64748b);\n  font-size: 12px;\n  font-weight: 600;\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.1fr 1fr;\n  gap: 14px;\n}\n.card-wide[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.card-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n.stat-card[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-family: "Tajawal", sans-serif;\n}\n.head-actions[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.field-label[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 0 6px;\n  font-size: 12px;\n  color: var(--text-secondary, #475569);\n  font-weight: 700;\n}\n.field-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 9px 10px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #cbd5e1);\n  background: var(--bg-input, #fff);\n  color: var(--text-primary, #1e293b);\n  font-family: "Tajawal", sans-serif;\n  margin-bottom: 10px;\n}\n.field-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.split-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.filters-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.5fr 1fr 1fr 1fr;\n  gap: 10px;\n  margin-bottom: 8px;\n}\n.base-path-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 8px;\n  align-items: start;\n}\n.btn-folder[_ngcontent-%COMP%] {\n  min-height: 38px;\n}\n.path-picker-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(2, 6, 23, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1200;\n  padding: 16px;\n}\n.path-picker-card[_ngcontent-%COMP%] {\n  width: min(760px, 95vw);\n  max-height: min(80vh, 760px);\n  background: var(--bg-card, #fff);\n  border-radius: 12px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.path-picker-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 12px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.path-picker-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: var(--text-primary, #1e293b);\n}\n.path-picker-current[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  background: var(--bg-surface, #f8fafc);\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n  font-size: 12px;\n  color: var(--text-secondary, #334155);\n  direction: ltr;\n  text-align: left;\n}\n.path-picker-actions[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  display: flex;\n  gap: 8px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.path-picker-create[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 8px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.path-picker-create[_ngcontent-%COMP%]   .field-input[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.path-picker-list[_ngcontent-%COMP%] {\n  padding: 8px 12px 12px;\n  overflow: auto;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n}\n.path-entry[_ngcontent-%COMP%] {\n  width: 100%;\n  justify-content: flex-start;\n  text-align: right;\n  direction: ltr;\n}\n.picker-empty[_ngcontent-%COMP%] {\n  color: var(--text-secondary, #64748b);\n  padding: 10px 0;\n}\n.table-wrap[_ngcontent-%COMP%] {\n  overflow: auto;\n}\n.archive-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.archive-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.archive-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  text-align: right;\n  vertical-align: top;\n}\n.path-cell[_ngcontent-%COMP%] {\n  max-width: 380px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empty-row[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-secondary, #64748b);\n}\n.hint[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: var(--text-secondary, #64748b);\n  font-size: 12px;\n}\n.tree-section[_ngcontent-%COMP%] {\n  border: 1px solid var(--border-color, #e2e8f0);\n  border-radius: 10px;\n  padding: 10px;\n  margin-bottom: 10px;\n  background: var(--bg-surface, #f8fafc);\n}\n.tree-type[_ngcontent-%COMP%] {\n  font-weight: 800;\n  margin-bottom: 8px;\n  color: var(--text-primary, #1e293b);\n}\n.tree-item[_ngcontent-%COMP%] {\n  border-right: 2px solid var(--border-color, #cbd5e1);\n  padding-right: 10px;\n  margin-right: 6px;\n  margin-bottom: 8px;\n}\n.tree-vault[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.tree-doc[_ngcontent-%COMP%] {\n  color: var(--text-secondary, #475569);\n  font-size: 13px;\n  margin-top: 4px;\n}\n.tree-empty[_ngcontent-%COMP%] {\n  color: var(--text-muted, #94a3b8);\n  font-size: 12px;\n}\n@media (max-width: 900px) {\n  .content-grid[_ngcontent-%COMP%], \n   .split-2[_ngcontent-%COMP%], \n   .filters-grid[_ngcontent-%COMP%], \n   .stats-grid[_ngcontent-%COMP%], \n   .base-path-row[_ngcontent-%COMP%], \n   .path-picker-list[_ngcontent-%COMP%], \n   .path-picker-create[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=attachments-archive.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttachmentsArchiveComponent, [{
    type: Component,
    args: [{ selector: "app-attachments-archive", standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent], template: `<div class="page-container">\r
  <div class="page-header">\r
    <h2>\r
      <span class="material-icons-round">folder_open</span>\r
      \u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0644\u0644\u0645\u0631\u0641\u0642\u0627\u062A\r
    </h2>\r
    <div class="header-actions">\r
      <button class="btn-success" [disabled]="saving()" (click)="saveSettings()">\r
        <span class="material-icons-round">{{ saving() ? 'sync' : 'save' }}</span>\r
        {{ saving() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...' : '\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A' }}\r
      </button>\r
      <button class="btn-primary" [disabled]="creatingTree()" (click)="buildTreeNow()">\r
        <span class="material-icons-round">{{ creatingTree() ? 'sync' : 'create_new_folder' }}</span>\r
        {{ creatingTree() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0646\u0634\u0627\u0621...' : '\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u062C\u0644\u062F\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B' }}\r
      </button>\r
    </div>\r
  </div>\r
  <p class="header-subtitle">\u0625\u0639\u062F\u0627\u062F \u0645\u0633\u0627\u0631 \u0627\u0644\u062D\u0641\u0638 \u0648\u0628\u0646\u064A\u0629 \u0627\u0644\u0645\u062C\u0644\u062F\u0627\u062A \u062D\u0633\u0628 \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0648\u0627\u0644\u062E\u0632\u064A\u0646\u0629</p>\r
\r
  @if (loading()) {\r
    <div class="loading-card">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</div>\r
  } @else {\r
    <div class="content-grid">\r
      <section class="card">\r
        <h3>\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062D\u0641\u0638</h3>\r
\r
        <label class="field-label" for="archive-base-path">\u0645\u0633\u0627\u0631 \u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A (\u062E\u0627\u0631\u062C \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A)</label>\r
        <div class="base-path-row">\r
          <input\r
            id="archive-base-path"\r
            class="field-input"\r
            type="text"\r
            title="\u0645\u0633\u0627\u0631 \u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A"\r
            [value]="form().basePath"\r
            placeholder="D:\\Archive\\Attachments"\r
            (input)="setBasePath($any($event.target).value)"\r
          />\r
          <button class="btn-primary btn-sm btn-folder" type="button" [disabled]="choosingBasePath()" (click)="openPathPicker()">\r
            {{ choosingBasePath() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u0641\u062A\u062D...' : '\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u062C\u0644\u062F \u0645\u0646 \u0627\u0644\u062C\u0647\u0627\u0632' }}\r
          </button>\r
        </div>\r
        <p class="hint">\u062D\u062F\u062F \u0627\u0644\u0645\u0633\u0627\u0631 \u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 (\u0645\u062B\u0627\u0644: D:\\Archive\\Attachments) \u062B\u0645 \u0627\u0636\u063A\u0637 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A\u060C \u0648\u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0634\u062C\u0631\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062F\u0627\u062E\u0644\u0647.</p>\r
\r
        <div class="split-2">\r
          <div>\r
            <label class="field-label" for="folder-type-fund">\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629: \u0635\u0646\u062F\u0648\u0642</label>\r
            <input id="folder-type-fund" class="field-input" title="\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0635\u0646\u062F\u0648\u0642" placeholder="\u0635\u0646\u062F\u0648\u0642" type="text" [value]="form().folderByType.fund" (input)="setFolderByType('fund', $any($event.target).value)" />\r
          </div>\r
          <div>\r
            <label class="field-label" for="folder-type-bank">\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629: \u0628\u0646\u0643</label>\r
            <input id="folder-type-bank" class="field-input" title="\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0628\u0646\u0643" placeholder="\u0628\u0646\u0643" type="text" [value]="form().folderByType.bank" (input)="setFolderByType('bank', $any($event.target).value)" />\r
          </div>\r
        </div>\r
\r
        <div class="split-2">\r
          <div>\r
            <label class="field-label" for="folder-type-exchange">\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629: \u0635\u0631\u0627\u0641</label>\r
            <input id="folder-type-exchange" class="field-input" title="\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0635\u0631\u0627\u0641" placeholder="\u0635\u0631\u0627\u0641" type="text" [value]="form().folderByType.exchange" (input)="setFolderByType('exchange', $any($event.target).value)" />\r
          </div>\r
          <div>\r
            <label class="field-label" for="folder-type-wallet">\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629: \u0645\u062D\u0641\u0638\u0629</label>\r
            <input id="folder-type-wallet" class="field-input" title="\u0645\u062C\u0644\u062F \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629 \u0645\u062D\u0641\u0638\u0629" placeholder="\u0645\u062D\u0641\u0638\u0629" type="text" [value]="form().folderByType.e_wallet" (input)="setFolderByType('e_wallet', $any($event.target).value)" />\r
          </div>\r
        </div>\r
\r
        <div class="split-2">\r
          <div>\r
            <label class="field-label" for="folder-voucher-receipt">\u0645\u062C\u0644\u062F \u0633\u0646\u062F \u0627\u0644\u0642\u0628\u0636</label>\r
            <input id="folder-voucher-receipt" class="field-input" title="\u0645\u062C\u0644\u062F \u0633\u0646\u062F \u0627\u0644\u0642\u0628\u0636" placeholder="\u0633\u0646\u062F \u0642\u0628\u0636" type="text" [value]="form().voucherFolders.receipt" (input)="setVoucherFolder('receipt', $any($event.target).value)" />\r
          </div>\r
          <div>\r
            <label class="field-label" for="folder-voucher-payment">\u0645\u062C\u0644\u062F \u0633\u0646\u062F \u0627\u0644\u0635\u0631\u0641</label>\r
            <input id="folder-voucher-payment" class="field-input" title="\u0645\u062C\u0644\u062F \u0633\u0646\u062F \u0627\u0644\u0635\u0631\u0641" placeholder="\u0633\u0646\u062F \u0635\u0631\u0641" type="text" [value]="form().voucherFolders.payment" (input)="setVoucherFolder('payment', $any($event.target).value)" />\r
          </div>\r
        </div>\r
\r
        <label class="field-label" for="importance-levels">\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0623\u0647\u0645\u064A\u0629 (\u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0641\u0627\u0635\u0644\u0629)</label>\r
        <input\r
          id="importance-levels"\r
          class="field-input"\r
          type="text"\r
          title="\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0623\u0647\u0645\u064A\u0629"\r
          [value]="form().importanceLevels.join(', ')"\r
          placeholder="\u0639\u0627\u062C\u0644, \u0645\u0647\u0645, \u0639\u0627\u062F\u064A"\r
          (input)="setImportanceLevels($any($event.target).value)"\r
        />\r
        <p class="hint">\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u062A\u0628\u0642\u0649 \u062D\u0633\u0628 \u0627\u0644\u0634\u062C\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629: \u0646\u0648\u0639 \u062E\u0632\u064A\u0646\u0629 \u2192 \u062E\u0632\u064A\u0646\u0629 \u2192 \u0633\u0646\u062F \u0642\u0628\u0636/\u0635\u0631\u0641.</p>\r
      </section>\r
\r
      <section class="card">\r
        <h3>\u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</h3>\r
        <div class="stats-grid">\r
          <div class="stat-card blue">\r
            <div class="stat-icon"><span class="material-icons-round">attach_file</span></div>\r
            <div class="stat-label">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A</div>\r
            <div class="stat-value">{{ stats().total }}</div>\r
          </div>\r
          <div class="stat-card green">\r
            <div class="stat-icon"><span class="material-icons-round">call_received</span></div>\r
            <div class="stat-label">\u0633\u0646\u062F\u0627\u062A \u0642\u0628\u0636</div>\r
            <div class="stat-value">{{ stats().receipts }}</div>\r
          </div>\r
          <div class="stat-card amber">\r
            <div class="stat-icon"><span class="material-icons-round">call_made</span></div>\r
            <div class="stat-label">\u0633\u0646\u062F\u0627\u062A \u0635\u0631\u0641</div>\r
            <div class="stat-value">{{ stats().payments }}</div>\r
          </div>\r
          <div class="stat-card red">\r
            <div class="stat-icon"><span class="material-icons-round">priority_high</span></div>\r
            <div class="stat-label">\u0645\u0631\u0641\u0642\u0627\u062A \u0639\u0627\u062C\u0644\u0629</div>\r
            <div class="stat-value">{{ stats().urgent }}</div>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <section class="card card-wide">\r
        <div class="card-head">\r
          <h3>\u0645\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0623\u0631\u0634\u064A\u0641</h3>\r
          <div class="head-actions">\r
            <button class="btn-primary btn-sm" [disabled]="refreshingItems()" (click)="applyFilters()">\r
              {{ refreshingItems() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B...' : '\u062A\u062D\u062F\u064A\u062B' }}\r
            </button>\r
            <button class="btn-ghost btn-sm" [disabled]="refreshingItems()" (click)="clearFilters()">\u062A\u0641\u0631\u064A\u063A \u0627\u0644\u0641\u0644\u0627\u062A\u0631</button>\r
          </div>\r
        </div>\r
\r
        <div class="filters-grid">\r
          <input id="archive-filter-search" class="field-input" type="text" title="\u0628\u062D\u062B \u0641\u064A \u0645\u0631\u0641\u0642\u0627\u062A \u0627\u0644\u0623\u0631\u0634\u064A\u0641" placeholder="\u0628\u062D\u062B: \u0627\u0633\u0645 \u0627\u0644\u0645\u0644\u0641 / \u0631\u0642\u0645 \u0627\u0644\u0633\u0646\u062F / \u0627\u0644\u062E\u0632\u064A\u0646\u0629"\r
            [value]="filters().search" (input)="setFilter('search', $any($event.target).value)" />\r
          <select id="archive-filter-voucher-type" class="field-input" title="\u0641\u0644\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0633\u0646\u062F" [value]="filters().voucherType" (change)="setFilter('voucherType', $any($event.target).value)">\r
            <option value="">\u0643\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0633\u0646\u062F\u0627\u062A</option>\r
            <option value="receipt">\u0633\u0646\u062F \u0642\u0628\u0636</option>\r
            <option value="payment">\u0633\u0646\u062F \u0635\u0631\u0641</option>\r
          </select>\r
          <select id="archive-filter-treasury-type" class="field-input" title="\u0641\u0644\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062E\u0632\u064A\u0646\u0629" [value]="filters().treasuryType" (change)="setFilter('treasuryType', $any($event.target).value)">\r
            <option value="">\u0643\u0644 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062E\u0632\u0627\u0626\u0646</option>\r
            <option value="fund">\u0635\u0646\u062F\u0648\u0642</option>\r
            <option value="bank">\u0628\u0646\u0643</option>\r
            <option value="exchange">\u0635\u0631\u0627\u0641</option>\r
            <option value="e_wallet">\u0645\u062D\u0641\u0638\u0629</option>\r
          </select>\r
          <select id="archive-filter-importance" class="field-input" title="\u0641\u0644\u062A\u0631 \u062F\u0631\u062C\u0629 \u0627\u0644\u0623\u0647\u0645\u064A\u0629" [value]="filters().importance" (change)="setFilter('importance', $any($event.target).value)">\r
            <option value="">\u0643\u0644 \u062F\u0631\u062C\u0627\u062A \u0627\u0644\u0623\u0647\u0645\u064A\u0629</option>\r
            @for (lvl of form().importanceLevels; track lvl) {\r
              <option [value]="lvl">{{ lvl }}</option>\r
            }\r
          </select>\r
        </div>\r
\r
        <div class="table-wrap">\r
          <table class="data-table archive-table">\r
            <thead>\r
              <tr>\r
                <th>\u0627\u0644\u0645\u0644\u0641</th>\r
                <th>\u0627\u0644\u0633\u0646\u062F</th>\r
                <th>\u0646\u0648\u0639/\u0627\u0633\u0645 \u0627\u0644\u062E\u0632\u064A\u0646\u0629</th>\r
                <th>\u0627\u0644\u0623\u0647\u0645\u064A\u0629</th>\r
                <th>\u0627\u0644\u0645\u0633\u0627\u0631</th>\r
                <th>\u0625\u062C\u0631\u0627\u0621</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @if (archiveItems().length === 0) {\r
                <tr>\r
                  <td colspan="6" class="empty-row">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0631\u0641\u0642\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631.</td>\r
                </tr>\r
              } @else {\r
                @for (row of archiveItems(); track row.id) {\r
                  <tr>\r
                    <td>{{ row.fileName }}</td>\r
                    <td>{{ row.voucherNumber || '-' }} / {{ row.voucherType === 'receipt' ? '\u0642\u0628\u0636' : '\u0635\u0631\u0641' }}</td>\r
                    <td>{{ row.treasuryType }} / {{ row.treasuryName }}</td>\r
                    <td>{{ row.importance }}</td>\r
                    <td class="path-cell" [title]="row.filePath">{{ row.filePath || '-' }}</td>\r
                    <td>\r
                      <button class="btn-primary btn-sm" (click)="rebuildAttachmentPath(row)">\u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0645\u0633\u0627\u0631</button>\r
                    </td>\r
                  </tr>\r
                }\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
      </section>\r
\r
      <section class="card card-wide">\r
        <h3>\u0645\u0639\u0627\u064A\u0646\u0629 \u0627\u0644\u0634\u062C\u0631\u0629</h3>\r
        @for (section of treePreview(); track section.type) {\r
          <div class="tree-section">\r
            <div class="tree-type">\u{1F4C1} {{ section.label }}</div>\r
            @if (section.items.length === 0) {\r
              <div class="tree-empty">\u0644\u0627 \u062A\u0648\u062C\u062F \u062E\u0632\u0627\u0626\u0646 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u062D\u0627\u0644\u064A\u0627\u064B.</div>\r
            } @else {\r
              @for (item of section.items; track item.id) {\r
                <div class="tree-item">\r
                  <div class="tree-vault">\u{1F4C1} {{ item.name }}</div>\r
                  <div class="tree-doc">\u{1F4C2} {{ item.receiptFolder }}</div>\r
                  <div class="tree-doc">\u{1F4C2} {{ item.paymentFolder }}</div>\r
                </div>\r
              }\r
            }\r
          </div>\r
        }\r
      </section>\r
    </div>\r
  }\r
</div>\r
\r
@if (showPathPicker()) {\r
  <div class="modal-overlay path-picker-overlay">\r
    <div class="modal-card path-picker-card">\r
      <div class="path-picker-head">\r
        <h3>\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u062C\u0644\u062F \u0645\u0646 \u0627\u0644\u062C\u0647\u0627\u0632</h3>\r
        <button class="btn-ghost btn-sm" type="button" (click)="closePathPicker()">\u0625\u063A\u0644\u0627\u0642</button>\r
      </div>\r
      <div class="path-picker-current">{{ pathPickerCurrentPath() || '\u0627\u062E\u062A\u0631 \u0642\u0631\u0635\u064B\u0627' }}</div>\r
      <div class="path-picker-actions">\r
        <button class="btn-ghost btn-sm" type="button" [disabled]="!pathPickerParentPath() || pathPickerLoading()" (click)="goToParentPath()">\u2B06 \u0631\u062C\u0648\u0639</button>\r
        <button class="btn-primary btn-sm" type="button" [disabled]="!pathPickerCurrentPath() || pathPickerLoading()" (click)="chooseCurrentPathFromPicker()">\u0627\u062E\u062A\u064A\u0627\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u062C\u0644\u062F</button>\r
      </div>\r
      <div class="path-picker-create">\r
        <input\r
          class="field-input"\r
          type="text"\r
          title="\u0627\u0633\u0645 \u0627\u0644\u0645\u062C\u0644\u062F \u0627\u0644\u062C\u062F\u064A\u062F"\r
          placeholder="\u0627\u0633\u0645 \u0645\u062C\u0644\u062F \u062C\u062F\u064A\u062F"\r
          [value]="newFolderName()"\r
          (input)="setNewFolderName($any($event.target).value)"\r
        />\r
        <button class="btn-primary btn-sm" type="button" [disabled]="creatingFolder() || pathPickerLoading()" (click)="createFolderInPicker()">\r
          {{ creatingFolder() ? '\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0646\u0634\u0627\u0621...' : '\u0625\u0646\u0634\u0627\u0621 \u0645\u062C\u0644\u062F \u062C\u062F\u064A\u062F' }}\r
        </button>\r
      </div>\r
      <div class="path-picker-list">\r
        @if (pathPickerLoading()) {\r
          <div class="picker-empty">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</div>\r
        } @else if (pathPickerEntries().length === 0) {\r
          <div class="picker-empty">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062C\u0644\u062F\u0627\u062A.</div>\r
        } @else {\r
          @for (entry of pathPickerEntries(); track entry.fullPath) {\r
            <button class="path-entry btn-ghost btn-sm" type="button" (click)="openPathEntry(entry)">\u{1F4C1} {{ entry.name }}</button>\r
          }\r
        }\r
      </div>\r
    </div>\r
  </div>\r
}\r
`, styles: ['/* src/app/pages/attachments-archive/attachments-archive.scss */\n.page-container {\n  max-width: 1300px;\n  direction: rtl;\n  font-family: "Tajawal", sans-serif;\n}\n.page-container *:not(.material-icons-round) {\n  font-family: inherit;\n}\n.header-subtitle {\n  margin: -12px 0 14px;\n  color: var(--text-secondary, #64748b);\n  font-size: 12px;\n  font-weight: 600;\n}\n.content-grid {\n  display: grid;\n  grid-template-columns: 1.1fr 1fr;\n  gap: 14px;\n}\n.card-wide {\n  grid-column: 1/-1;\n}\n.card-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n.stat-card .stat-value {\n  font-family: "Tajawal", sans-serif;\n}\n.head-actions {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.field-label {\n  display: block;\n  margin: 0 0 6px;\n  font-size: 12px;\n  color: var(--text-secondary, #475569);\n  font-weight: 700;\n}\n.field-input {\n  width: 100%;\n  padding: 9px 10px;\n  border-radius: 9px;\n  border: 1.5px solid var(--border-color, #cbd5e1);\n  background: var(--bg-input, #fff);\n  color: var(--text-primary, #1e293b);\n  font-family: "Tajawal", sans-serif;\n  margin-bottom: 10px;\n}\n.field-input:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.split-2 {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.filters-grid {\n  display: grid;\n  grid-template-columns: 1.5fr 1fr 1fr 1fr;\n  gap: 10px;\n  margin-bottom: 8px;\n}\n.base-path-row {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 8px;\n  align-items: start;\n}\n.btn-folder {\n  min-height: 38px;\n}\n.path-picker-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(2, 6, 23, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1200;\n  padding: 16px;\n}\n.path-picker-card {\n  width: min(760px, 95vw);\n  max-height: min(80vh, 760px);\n  background: var(--bg-card, #fff);\n  border-radius: 12px;\n  border: 1px solid var(--border-color, #e2e8f0);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.path-picker-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 12px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.path-picker-head h3 {\n  margin: 0;\n  font-size: 16px;\n  color: var(--text-primary, #1e293b);\n}\n.path-picker-current {\n  padding: 10px 12px;\n  background: var(--bg-surface, #f8fafc);\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n  font-size: 12px;\n  color: var(--text-secondary, #334155);\n  direction: ltr;\n  text-align: left;\n}\n.path-picker-actions {\n  padding: 10px 12px;\n  display: flex;\n  gap: 8px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.path-picker-create {\n  padding: 10px 12px;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 8px;\n  border-bottom: 1px solid var(--border-color, #e2e8f0);\n}\n.path-picker-create .field-input {\n  margin-bottom: 0;\n}\n.path-picker-list {\n  padding: 8px 12px 12px;\n  overflow: auto;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n}\n.path-entry {\n  width: 100%;\n  justify-content: flex-start;\n  text-align: right;\n  direction: ltr;\n}\n.picker-empty {\n  color: var(--text-secondary, #64748b);\n  padding: 10px 0;\n}\n.table-wrap {\n  overflow: auto;\n}\n.archive-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.archive-table th,\n.archive-table td {\n  text-align: right;\n  vertical-align: top;\n}\n.path-cell {\n  max-width: 380px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.empty-row {\n  text-align: center;\n  color: var(--text-secondary, #64748b);\n}\n.hint {\n  margin: 4px 0 0;\n  color: var(--text-secondary, #64748b);\n  font-size: 12px;\n}\n.tree-section {\n  border: 1px solid var(--border-color, #e2e8f0);\n  border-radius: 10px;\n  padding: 10px;\n  margin-bottom: 10px;\n  background: var(--bg-surface, #f8fafc);\n}\n.tree-type {\n  font-weight: 800;\n  margin-bottom: 8px;\n  color: var(--text-primary, #1e293b);\n}\n.tree-item {\n  border-right: 2px solid var(--border-color, #cbd5e1);\n  padding-right: 10px;\n  margin-right: 6px;\n  margin-bottom: 8px;\n}\n.tree-vault {\n  font-weight: 700;\n  color: var(--text-primary, #1e293b);\n}\n.tree-doc {\n  color: var(--text-secondary, #475569);\n  font-size: 13px;\n  margin-top: 4px;\n}\n.tree-empty {\n  color: var(--text-muted, #94a3b8);\n  font-size: 12px;\n}\n@media (max-width: 900px) {\n  .content-grid,\n  .split-2,\n  .filters-grid,\n  .stats-grid,\n  .base-path-row,\n  .path-picker-list,\n  .path-picker-create {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=attachments-archive.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AttachmentsArchiveComponent, { className: "AttachmentsArchiveComponent", filePath: "src/app/pages/attachments-archive/attachments-archive.ts", lineNumber: 27 });
})();
export {
  AttachmentsArchiveComponent
};
//# sourceMappingURL=chunk-7K7ZY6WU.js.map
