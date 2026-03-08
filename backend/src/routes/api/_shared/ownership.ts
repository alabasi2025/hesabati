import { and, eq } from 'drizzle-orm';
import type { Context } from 'hono';
import { db } from '../../../db/index.ts';
import { accounts } from '../../../db/schema/index.ts';
import { userCanAccessBusiness } from '../../../middleware/bizAuth.ts';
import { verifyAccountOwnership, verifyFundOwnership } from '../../../domain/ownership.ts';

export { verifyAccountOwnership, verifyFundOwnership };

/**
 * التحقق من ملكية السجل (ينتمي للعمل المحدد).
 * يقبل أي جدول له id وعمود ملكية (مثل businessId).
 */
export async function verifyOwnership(
  table: typeof accounts,
  recordId: number,
  bizId: number,
  bizColumn: typeof accounts.businessId
): Promise<boolean> {
  const t = table as typeof accounts;
  const col = bizColumn as typeof accounts.businessId;
  const [record] = await db.select({ id: t.id }).from(t).where(and(eq(t.id, recordId), eq(col, bizId)));
  return !!record;
}

/**
 * للـ legacy routes: يتحقق من أن المستخدم له صلاحية على عمل المورد، وإلا يرجع 403/404.
 * استدعِه بعد جلب السجل من DB؛ إن رجع غير null فاعرضه وأوقف المعالجة.
 */
export async function requireResourceOwnership(
  c: Context,
  resource: { businessId: number | null } | null
): Promise<Response | null> {
  if (!resource) return c.json({ error: 'غير موجود' }, 404);
  if (resource.businessId == null) return c.json({ error: 'غير مصرح - لا صلاحية على هذا العمل' }, 403);
  const user = c.get('user') as { userId: number; role: string } | undefined;
  if (!user) return c.json({ error: 'غير مصرح' }, 401);
  const allowed = await userCanAccessBusiness(user.userId, user.role, resource.businessId);
  if (!allowed) return c.json({ error: 'غير مصرح - لا صلاحية على هذا العمل' }, 403);
  c.set('bizId', resource.businessId);
  return null;
}
