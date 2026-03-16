/**
 * Engines Index – نقطة الدخول الموحدة لجميع محركات النظام
 * ==========================================================
 * استخدام: import { transactionEngine, currencyEngine } from '../engines';
 */

// ── محركات موجودة ومنقولة ────────────────────────────────────────────────────
export * as CrudEngine        from "./crud.engine.ts";
export * as CurrencyEngine    from "./currency.engine.ts";
export * as SequencingEngine  from "./sequencing.engine.ts";
export * as PermissionsEngine from "./permissions.engine.ts";

// ── محركات في services/ (سيتم نقلها لاحقاً) ──────────────────────────────────
export * as TransactionEngine from "../services/transaction.service.ts";
export * as WorkflowEngine    from "../services/workflow.service.ts";
export * as InventoryEngine   from "../services/inventory.service.ts";
export * as ReportingEngine   from "../services/reporting.service.ts";
export * as UIBuilderEngine   from "../services/ui-builder.service.ts";
export * as NotificationEngine from "../services/websocket.service.ts";
