/**
 * partners-write.routes.ts — Phase 12
 * مسارات كتابة الشركاء: إنشاء + تعديل + حذف
 * نمط: Control Account (PRT-01) + Subledger (PRT-01/1, PRT-01/2)
 * الحساب يُنشأ أولاً من صفحة الحسابات، ثم يُنشأ الشريك مرتبطاً به
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and } from 'drizzle-orm';
import { accounts, businessPartners, partnerBalances, accountCurrencies } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, parseId } from '../../middleware/helpers.ts';
import { getNextBusinessPartnerSequence } from '../../middleware/sequencing.ts';
import { getBizId } from './_shared/context-helpers.ts';

const partnersWriteRoutes = new Hono();

partnersWriteRoutes.post(
  '/businesses/:bizId/partners',
  bizAuthMiddleware(),
  safeHandler('إضافة شريك', async (c) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    // الحساب المرتبط إلزامي — يُنشأ أولاً من صفحة الحسابات
    const accountId = body.accountId != null && Number(body.accountId) > 0 ? Number(body.accountId) : null;
    if (!accountId) return c.json({ error: 'يجب اختيار حساب مرتبط بالشريك من دليل الحسابات' }, 400);

    const partnerFullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    if (!partnerFullName) return c.json({ error: 'اسم الشريك مطلوب' }, 400);

    const partnerRole = typeof body.role === 'string' ? body.role.trim() : '';
    if (!partnerRole) return c.json({ error: 'تصنيف الشريك (الدور) مطلوب' }, 400);

    const [acc] = await db
      .select({ id: accounts.id, sequenceNumber: accounts.sequenceNumber, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'الحساب المحدد غير موجود' }, 400);

    // كود مركّب: كود الحساب/رقم فرعي (PRT-01/1, PRT-01/2)
    const existingPartners = await db
      .select({ id: businessPartners.id })
      .from(businessPartners)
      .where(and(eq(businessPartners.businessId, bizId), eq(businessPartners.accountId, accountId)));
    const subSeq = existingPartners.length + 1;
    const partnerCode = `${acc.code}/${subSeq}`;

    const partnerSharePercentage =
      typeof body.sharePercentage === 'number' || typeof body.sharePercentage === 'string'
        ? String(body.sharePercentage)
        : null;

    let defaultCurrencyId: number | null = null;
    if (body.defaultCurrencyId && Number(body.defaultCurrencyId) > 0) {
      defaultCurrencyId = Number(body.defaultCurrencyId);
    }

    const [created] = await db.transaction(async (tx) => {
      const partnerSeq = await getNextBusinessPartnerSequence(bizId, tx);
      const [newPartner] = await tx.insert(businessPartners).values({
        businessId: bizId,
        fullName: partnerFullName,
        role: partnerRole,
        phone: typeof body.phone === 'string' ? body.phone.trim() || null : null,
        notes: typeof body.notes === 'string' ? body.notes.trim() || null : null,
        isActive: body.isActive !== false,
        sequenceNumber: partnerSeq,
        code: partnerCode,
        accountId,
        sharePercentage: partnerSharePercentage,
        defaultCurrencyId,
      }).returning();

      // إنشاء أرصدة بالعملات المحددة أو عملات الحساب
      let currencyIdsToAdd: number[] = [];
      if (body.currencyIds && Array.isArray(body.currencyIds) && body.currencyIds.length > 0) {
        currencyIdsToAdd = body.currencyIds.map((id: any) => Number(id)).filter((id: number) => id > 0);
      } else {
        const accCurrRows = await tx
          .select({ currencyId: accountCurrencies.currencyId })
          .from(accountCurrencies)
          .where(eq(accountCurrencies.accountId, accountId));
        currencyIdsToAdd = accCurrRows.map((ac) => ac.currencyId);
      }
      if (currencyIdsToAdd.length > 0) {
        await tx.insert(partnerBalances).values(
          currencyIdsToAdd.map((currencyId) => ({
            partnerId: newPartner.id,
            currencyId,
            balance: '0',
            updatedAt: new Date(),
          }))
        );
      }

      return [newPartner];
    });
    return c.json(created, 201);
  }),
);

partnersWriteRoutes.put(
  '/businesses/:bizId/partners/:id',
  bizAuthMiddleware(),
  safeHandler('تعديل شريك', async (c) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف الشريك غير صالح' }, 400);
    const [existing] = await db
      .select()
      .from(businessPartners)
      .where(and(eq(businessPartners.id, id), eq(businessPartners.businessId, bizId)));
    if (!existing) return c.json({ error: 'شريك غير موجود أو لا ينتمي لهذا العمل' }, 404);
    const body = (await getBody(c)) as Record<string, unknown>;
    // حماية: لا يمكن تغيير الحساب أو الكود بعد الإنشاء
    delete body.accountId;
    delete body.code;
    const [updated] = await db
      .update(businessPartners)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(businessPartners.id, id))
      .returning();
    return c.json(updated);
  }),
);

partnersWriteRoutes.delete(
  '/businesses/:bizId/partners/:id',
  bizAuthMiddleware(),
  safeHandler('حذف شريك', async (c) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف الشريك غير صالح' }, 400);
    const [existing] = await db
      .select()
      .from(businessPartners)
      .where(and(eq(businessPartners.id, id), eq(businessPartners.businessId, bizId)));
    if (!existing) return c.json({ error: 'شريك غير موجود أو لا ينتمي لهذا العمل' }, 404);
    await db.delete(businessPartners).where(eq(businessPartners.id, id));
    return c.json({ success: true });
  }),
);

export { partnersWriteRoutes };
