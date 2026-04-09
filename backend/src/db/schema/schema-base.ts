/**
 * schema-base.ts — Phase 12
 * الأنواع الأساسية (ENUMS)
 * (مستخرجة من schema/core.ts)
 */
import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal, pgEnum, jsonb, date, unique, uniqueIndex } from 'drizzle-orm/pg-core';

// ===================== ENUMS =====================

export const userRoleEnum = pgEnum('user_role', ['admin', 'accountant', 'manager', 'viewer']);
export const currencyCodeEnum = pgEnum('currency_code', ['YER', 'SAR', 'USD']);

export const accountTypeEnum = pgEnum('account_type', [
  'fund', 'bank', 'e_wallet', 'exchange', 'accounting', 'custody', 'warehouse', 'billing',
  'budget', 'supplier', 'employee', 'partner', 'intermediary', 'settlement', 'pending',
]);

export const voucherTypeEnum = pgEnum('voucher_type', [
  'receipt', 'payment', 'transfer', 'journal', 'collection', 'delivery',
  'supply_invoice', 'supply_order', 'dispatch', 'transfer_out', 'receive_transfer',
]);

export const voucherStatusEnum = pgEnum('voucher_status', ['draft', 'confirmed', 'cancelled']);
export const expenseTypeEnum = pgEnum('expense_type', ['fixed', 'variable', 'annual']);
export const warehouseTypeEnum = pgEnum('warehouse_type', ['main', 'station', 'sub', 'custody']);
export const movementTypeEnum = pgEnum('movement_type', ['in', 'out', 'transfer', 'adjustment', 'supply_invoice', 'supply_order', 'dispatch', 'transfer_out', 'receive_transfer']);
export const employeeStatusEnum = pgEnum('employee_status', ['active', 'inactive', 'suspended']);

export const billingSystemEnum = pgEnum('billing_system', [
  'moghrabi_v1', 'moghrabi_v2', 'moghrabi_v3',
  'support_fund', 'support_fund_west', 'prepaid',
]);

export const collectionMethodEnum = pgEnum('collection_method', [
  'cash_mobile', 'manual_assign', 'electronic', 'haseb_deposit',
]);

export const reconciliationTypeEnum = pgEnum('reconciliation_type', [
  'manager', 'exchange', 'accountant', 'supplier', 'custody',
]);
export const reconciliationStatusEnum = pgEnum('reconciliation_status', ['open', 'in_progress', 'completed', 'disputed']);
export const pendingStatusEnum = pgEnum('pending_status', ['pending', 'in_progress', 'resolved', 'written_off']);

