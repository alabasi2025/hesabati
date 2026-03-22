/**
 * schema-users.ts — Phase 12
 * المستخدمون + العملات + الأسعار + الأدوار
 * (مستخرجة من schema/core.ts)
 */
import { pgTable, serial, varchar, text, timestamp, boolean, integer, decimal, pgEnum, jsonb, date, unique, uniqueIndex } from 'drizzle-orm/pg-core';
import { userRoleEnum, currencyCodeEnum } from './schema-base.ts';
import { businesses } from './schema-business.ts';

// ===================== USERS =====================

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  fullName: varchar('full_name', { length: 200 }).notNull(),
  role: userRoleEnum('role').notNull().default('viewer'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ===================== CURRENCIES =====================

export const currencies = pgTable('currencies', {
  id: serial('id').primaryKey(),
  code: currencyCodeEnum('code').notNull().unique(),
  nameAr: varchar('name_ar', { length: 100 }).notNull(),
  symbol: varchar('symbol', { length: 10 }).notNull(),
  exchangeRate: decimal('exchange_rate', { precision: 15, scale: 4 }).notNull().default('1'),
  isDefault: boolean('is_default').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== EXCHANGE RATES (أسعار الصرف اليومية) =====================

export const exchangeRates = pgTable('exchange_rates', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  fromCurrencyId: integer('from_currency_id').notNull().references(() => currencies.id),
  toCurrencyId: integer('to_currency_id').notNull().references(() => currencies.id),
  rate: decimal('rate', { precision: 15, scale: 6 }).notNull(),
  effectiveDate: date('effective_date').notNull(),
  source: varchar('source', { length: 100 }).default('manual'), // manual | api
  notes: text('notes'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ===================== ROLES & PERMISSIONS (RBAC) =====================

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  color: varchar('color', { length: 20 }).default('#3b82f6'),
  maxVoucherAmount: decimal('max_voucher_amount', { precision: 20, scale: 2 }),
  maxDailyAmount: decimal('max_daily_amount', { precision: 20, scale: 2 }),
  isSystem: boolean('is_system').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const rolePermissions = pgTable('role_permissions', {
  id: serial('id').primaryKey(),
  roleId: integer('role_id').notNull().references(() => roles.id),
  resource: varchar('resource', { length: 100 }).notNull(), // vouchers | accounts | funds | reports | screens | settings | inventory | workflow | ui_builder
  action: varchar('action', { length: 50 }).notNull(), // create | read | update | delete | approve | execute
  constraints: jsonb('constraints').$type<any>().default({}), // قيود إضافية: {maxAmount, stationIds, operationTypeIds, accountIds}
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const userRoles = pgTable('user_roles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  roleId: integer('role_id').notNull().references(() => roles.id),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  assignedBy: integer('assigned_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

