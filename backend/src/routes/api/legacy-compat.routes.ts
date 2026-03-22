/**
 * legacy-compat.routes.ts â€” Phase 13 (thin wrapper)
 * ظٹظڈط¬ظ…ط¹ ظ…ط³ط§ط±ط§طھ ط§ظ„طھظˆط§ظپظ‚ ط§ظ„ظ‚ط¯ظٹظ…ط© ظ…ظ† ط§ظ„ظ…ظ„ظپط§طھ ط§ظ„ظ…ظ†ظپطµظ„ط©
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
api.get('/funds/:id', safeHandler('ط¬ظ„ط¨ طµظ†ط¯ظˆظ‚ ط¨ط§ظ„ظ…ط¹ط±ظ‘ظپ', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„طµظ†ط¯ظˆظ‚ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [fund] = await db.select().from(funds).where(eq(funds.id, id)).limit(1);
  if (!fund) return c.json({ error: 'ط§ظ„طµظ†ط¯ظˆظ‚ ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  return c.json(fund);
}));

api.route('/', legacyVouchersApi);
api.route('/', legacyMiscApi);

export { api as legacyCompatRoutes };

