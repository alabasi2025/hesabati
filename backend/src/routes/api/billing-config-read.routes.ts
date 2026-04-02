/**
 * billing-config-read.routes.ts — Phase 12
 * قراءة أنظمة الفوترة مع join لحساب التحكم في دليل الحسابات
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq } from 'drizzle-orm';
import { billingSystemsConfig, billingAccountTypes, accounts } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';

const billingConfigReadRoutes = new Hono();

function toSystemKey(name: string): string {
  const compact = name.trim().toLowerCase().split(/\s+/).join('_');
  return compact.split('').filter((ch) => /[a-z0-9_]/.test(ch)).join('');
}

billingConfigReadRoutes.get(
  '/businesses/:bizId/billing-systems-config',
  bizAuthMiddleware(),
  safeHandler('جلب أنظمة الفوترة مع الحسابات', async (c) => {
    const bizId = getBizId(c);

    const rows = await db
      .select({
        id: billingSystemsConfig.id,
        businessId: billingSystemsConfig.businessId,
        name: billingSystemsConfig.name,
        systemKey: billingSystemsConfig.systemKey,
        accountId: billingSystemsConfig.accountId,
        icon: billingSystemsConfig.icon,
        color: billingSystemsConfig.color,
        stationMode: billingSystemsConfig.stationMode,
        stationIds: billingSystemsConfig.stationIds,
        supportedMethodIds: billingSystemsConfig.supportedMethodIds,
        collectionMethod: billingSystemsConfig.collectionMethod,
        sortOrder: billingSystemsConfig.sortOrder,
        isActive: billingSystemsConfig.isActive,
        notes: billingSystemsConfig.notes,
        createdAt: billingSystemsConfig.createdAt,
        updatedAt: billingSystemsConfig.updatedAt,
        accountCode: accounts.code,
        accountName: accounts.name,
      })
      .from(billingSystemsConfig)
      .leftJoin(accounts, eq(accounts.id, billingSystemsConfig.accountId))
      .where(eq(billingSystemsConfig.businessId, bizId))
      .orderBy(billingSystemsConfig.sortOrder);

    const types = await db
      .select({ id: billingAccountTypes.id, name: billingAccountTypes.name })
      .from(billingAccountTypes)
      .where(eq(billingAccountTypes.businessId, bizId));

    const typeNameById = new Map(types.map((t) => [t.id, t.name]));

    return c.json(
      rows.map((row) => ({
        ...row,
        systemKey:
          typeof row.systemKey === 'string' && row.systemKey.trim().length > 0
            ? row.systemKey
            : toSystemKey(`${row.name || 'billing'}_${row.id}`),
        stationScope: row.stationMode,
        supportedTypes: (row.supportedMethodIds || [])
          .map((id) => typeNameById.get(id))
          .filter((name): name is string => Boolean(name)),
      })),
    );
  }),
);

billingConfigReadRoutes.get(
  '/businesses/:bizId/billing-account-types',
  bizAuthMiddleware(),
  safeHandler('جلب أنواع حسابات الفوترة', async (c) => {
    const bizId = getBizId(c);
    const rows = await db
      .select()
      .from(billingAccountTypes)
      .where(eq(billingAccountTypes.businessId, bizId))
      .orderBy(billingAccountTypes.sortOrder);
    return c.json(rows);
  }),
);

export { billingConfigReadRoutes };
