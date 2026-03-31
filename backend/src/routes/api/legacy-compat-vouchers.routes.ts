/**
 * legacy-compat-vouchers.routes.ts — Phase 13
 * مسارات توافق السندات القديمة (Legacy vouchers routes)
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc, and } from 'drizzle-orm';
import {
  vouchers, funds, fundBalances,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, parseId } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';

const legacyVouchersApi = new Hono();

// ===================== جلب سجل واحد (صندوق) =====================
legacyVouchersApi.get('/funds/:id', safeHandler('جلب صندوق بالمعرّف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصندوق غير صالح' }, 400);
  const [fund] = await db.select().from(funds).where(eq(funds.id, id));
  const err = await requireResourceOwnership(c, fund ?? null);
  if (err) return err;
  const balRows = await db.select().from(fundBalances).where(eq(fundBalances.fundId, id));
  return c.json({ ...fund!, balances: balRows });
}));

// ===================== السندات =====================
legacyVouchersApi.get('/businesses/:bizId/vouchers', bizAuthMiddleware(), safeHandler('جلب السندات', async (c) => {
  const bizId = getBizId(c);
  const typeFilter = c.req.query('type');
  const conditions = [eq(vouchers.businessId, bizId)];
  if (typeFilter) conditions.push(eq(vouchers.voucherType, typeFilter));
  const rows = await db.select().from(vouchers).where(and(...conditions)).orderBy(desc(vouchers.createdAt));
  return c.json(rows);
}));

export { legacyVouchersApi };
