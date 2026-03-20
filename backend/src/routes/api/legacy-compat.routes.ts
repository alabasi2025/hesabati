/**
 * legacy-compat.routes.ts — Phase 13 (thin wrapper)
 * يُجمع مسارات التوافق القديمة من الملفات المنفصلة
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and } from 'drizzle-orm';
import { funds } from '../../db/schema/index.ts';
import { safeHandler, parseId } from '../../middleware/helpers.ts';
import { legacyVouchersApi } from './legacy-compat-vouchers.routes.ts';
import { legacyMiscApi } from './legacy-compat-misc.routes.ts';

const api = new Hono();

// Fund single record (kept here as it doesn't fit elsewhere cleanly)
api.get('/funds/:id', safeHandler('جلب صندوق بالمعرّف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصندوق غير صالح' }, 400);
  const [fund] = await db.select().from(funds).where(eq(funds.id, id)).limit(1);
  if (!fund) return c.json({ error: 'الصندوق غير موجود' }, 404);
  return c.json(fund);
}));

api.route('/', legacyVouchersApi);
api.route('/', legacyMiscApi);

export { api as legacyCompatRoutes };
