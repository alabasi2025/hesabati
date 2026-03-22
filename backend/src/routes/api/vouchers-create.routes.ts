/**
 * vouchers-create.routes.ts — Phase 13
 * إنشاء السندات: POST /businesses/:bizId/vouchers-multi
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc, sql, and, inArray, asc, count } from 'drizzle-orm';
import {
  businesses, vouchers, currencies, operationTypes, operationTypeAccounts,
  accounts, accountBalances, funds, fundBalances,
  fundTypes, bankTypes, exchangeTypes, eWalletTypes,
  operationCategories,
  journalEntries, journalEntryLines,
  users, auditLog,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, getBody, parseId, toErrorMessage } from '../../middleware/helpers.ts';
import { validateBody, voucherMultiSchema } from '../../middleware/validation.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getNextSequence, getCurrentSequence, TYPE_PREFIXES, getNextItemInCategorySequence } from '../../middleware/sequencing.ts';
import { postMultiTransaction, postTransaction, confirmDraftTransaction, cancelTransaction } from '../../engines/transaction.engine.ts';
import { wsService } from '../../services/websocket.service.ts';
import { normalizeDbResult, getFirstRow } from '../../utils/db-result.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { logAction } from '../../engines/audit.engine.ts';
import type { AppContext } from './_shared/types.ts';
import { normalizeTreasuryCode, resolveVoucherTreasuryInfo } from './_vouchers-helpers.ts';

interface PeriodStatsRow {
  receipts: string | number;
  payments: string | number;
  operations_count: string | number;
}

const vouchersCreateRouter = new Hono();




vouchersCreateRouter.post(
  '/businesses/:bizId/vouchers-multi',
  bizAuthMiddleware(),
  checkPermission('vouchers', 'create'),
  safeHandler('إضافة سند متعدد', async (c) => {
    const bizId = getBizId(c);
    const userId = getUserId(c) ?? 0;
    const body = normalizeBody(await c.req.json());

    const validation = validateBody(voucherMultiSchema, body);
    if (!validation.success) return c.json({ error: validation.error }, 400);
    const data = validation.data as any;

    const [opType] = data.operationTypeId
      ? await db
          .select()
          .from(operationTypes)
          .where(and(eq(operationTypes.id, data.operationTypeId), eq(operationTypes.businessId, bizId)))
      : [null];
    if (data.operationTypeId && !opType) return c.json({ error: 'نوع العملية غير موجود' }, 404);
    if (opType?.isActive === false) return c.json({ error: 'نوع العملية غير مفعّل' }, 400);

    const currencyId = data.currencyId || 1;
    const vType = (opType?.voucherType as any) || data.voucherType || 'receipt';

    const treasuryFundId = vType === 'receipt'
      ? (data.toFundId ?? opType?.sourceFundId ?? null)
      : (data.fromFundId ?? opType?.sourceFundId ?? null);
    let treasuryAccountId = vType === 'receipt'
      ? (data.toAccountId ?? opType?.sourceAccountId ?? null)
      : (data.fromAccountId ?? opType?.sourceAccountId ?? null);

    // عند اختيار صندوق كخزينة، نستخدم حساب خزينة داخلي موحّد لمعالجة الأثر الداخلي
    if (!treasuryAccountId && treasuryFundId) {
      const accRows = await db.execute(sql`
        SELECT id FROM accounts
        WHERE business_id = ${bizId}
          AND account_type = 'fund'
          AND notes = 'system_cash_treasury'
        LIMIT 1
      `);
      const existing = getFirstRow<{ id: number }>(accRows);
      if (existing?.id) {
        treasuryAccountId = existing.id;
      } else {
        const [created] = await db.insert(accounts).values({
          businessId: bizId,
          name: 'حساب الصناديق (آلي)',
          accountType: 'fund',
          canCreateVoucher: false,
          canApproveVoucher: false,
          notes: 'system_cash_treasury',
        }).returning({ id: accounts.id });
        treasuryAccountId = created?.id ?? null;
      }
    }
    if (!treasuryAccountId) {
      return c.json({ error: 'الخزينة مطلوبة. اختر صندوقاً أو حساب خزينة صالحاً قبل الحفظ' }, 400);
    }

    const voucherDate = data.voucherDate ? new Date(data.voucherDate) : null;
    const baseDesc = (data.description || opType?.name || '').trim();

    const entries = (data.entries || [])
      .map((e: any) => {
        const accountId = e.accountId ?? e.toAccountId;
        const amount = typeof e.amount === 'string' ? Number.parseFloat(e.amount) : e.amount;
        return { accountId, amount, notes: e.notes ?? null, reference: e.reference ?? null };
      })
      .filter((e: any) => Number.isFinite(e.amount) && e.amount > 0);

    if (entries.length === 0) return c.json({ error: 'أدخل مبلغاً واحداً على الأقل' }, 400);

    const total = entries.reduce((s: number, e: any) => s + e.amount, 0);
    const entryLineType: 'debit' | 'credit' = vType === 'receipt' ? 'credit' : 'debit';
    const treasuryLineType: 'debit' | 'credit' = vType === 'receipt' ? 'debit' : 'credit';

    const lines = entries.map((e: any) => {
      const desc = [baseDesc, e.notes ? String(e.notes).trim() : ''].filter(Boolean).join(' - ');
      return {
        accountId: e.accountId,
        lineType: entryLineType,
        amount: e.amount,
        description: desc || null,
      };
    });

    lines.push({
      accountId: treasuryAccountId,
      lineType: treasuryLineType,
      amount: total,
      description: baseDesc || null,
    });

    const requestedStatus = 'unreviewed';

    try {
      if (requestedStatus === 'unreviewed') {
        const result = await postMultiTransaction(bizId, userId, {
          voucherType: vType,
          currencyId,
          lines,
          operationTypeId: data.operationTypeId,
          operationTypeName: opType?.name || null,
          description: baseDesc || opType?.name || '',
          reference: data.reference || null,
          voucherDate,
          stationId: data.stationId || null,
          employeeId: data.employeeId || null,
          supplierId: data.supplierId || null,
          // ربط الخزينة بالصندوق/الحساب حسب نوع السند
          toFundId: vType === 'receipt' ? treasuryFundId : null,
          fromFundId: vType === 'payment' ? treasuryFundId : null,
          fromAccountId: vType === 'payment' ? treasuryAccountId : null,
          toAccountId: vType === 'receipt' ? treasuryAccountId : null,
        });
        try { wsService.notifyNewVoucher(bizId, result.voucher); } catch { /* optional */ }
        return c.json(result.voucher, 201);
      }

      const seqYear = (voucherDate || new Date()).getFullYear();
      const treasury = await resolveVoucherTreasuryInfo(
        bizId,
        vType,
        vType === 'payment' ? treasuryFundId : null,
        vType === 'receipt' ? treasuryFundId : null,
        vType === 'payment' ? treasuryAccountId : null,
        vType === 'receipt' ? treasuryAccountId : null,
      );

      let voucherNumber = '';
      let accountSequence: string | null = null;
      if (treasury) {
        const seqVal = await getNextSequence(
          bizId,
          `treasury_${treasury.kind}_${vType}`,
          treasury.treasuryId,
          seqYear,
        );
        const voucherPrefix = TYPE_PREFIXES[vType] || 'VCH';
        voucherNumber = `${voucherPrefix}-${treasury.treasuryCode}-${seqYear}-${seqVal}`;
        accountSequence = `${treasury.treasuryCode}-${seqYear}-${seqVal}`;
      } else {
        const seqVal = await getNextSequence(bizId, `voucher_${vType}_fallback`, 0, seqYear);
        const voucherPrefix = TYPE_PREFIXES[vType] || 'VCH';
        voucherNumber = `${voucherPrefix}-${seqYear}-${String(seqVal).padStart(5, '0')}`;
      }

      const createdVoucher = await db.transaction(async (tx) => {
        const [created] = await tx.insert(vouchers).values({
          businessId: bizId,
          voucherNumber,
          voucherType: vType,
          status: 'unreviewed',
          amount: String(total),
          currencyId,
          fromAccountId: vType === 'payment' ? treasuryAccountId : null,
          toAccountId: vType === 'receipt' ? treasuryAccountId : null,
          fromFundId: vType === 'payment' ? treasuryFundId : null,
          toFundId: vType === 'receipt' ? treasuryFundId : null,
          stationId: data.stationId || null,
          employeeId: data.employeeId || null,
          supplierId: data.supplierId || null,
          operationTypeId: data.operationTypeId || null,
          description: baseDesc || opType?.name || '',
          reference: data.reference || null,
          voucherDate: voucherDate || new Date(),
          createdBy: userId,
          hasMultipleLines: true,
          accountSequence,
          fullSequenceNumber: voucherNumber,
        }).returning();

        const entryDate = created.voucherDate
          ? new Date(created.voucherDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];

        const [entry] = await tx.insert(journalEntries).values({
          businessId: bizId,
          entryNumber: `JE-${created.voucherNumber}`,
          entryDate,
          description: baseDesc || opType?.name || '',
          reference: created.voucherNumber,
          operationTypeId: data.operationTypeId || null,
          totalDebit: String(total),
          totalCredit: String(total),
          isBalanced: true,
          createdBy: userId,
        }).returning({ id: journalEntries.id });

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          await tx.insert(journalEntryLines).values({
            journalEntryId: entry.id,
            accountId: line.accountId,
            lineType: line.lineType,
            amount: String(line.amount),
            description: line.description,
            sortOrder: i,
          });
        }

        await tx.insert(auditLog).values({
          userId,
          businessId: bizId,
          action: 'create_voucher_draft',
          tableName: 'vouchers',
          recordId: created.id,
          oldData: null,
          newData: { status: 'unreviewed', voucherType: vType, linesCount: lines.length },
        });

        return created;
      });

      try { wsService.notifyNewVoucher(bizId, createdVoucher); } catch { /* optional */ }
      return c.json(createdVoucher, 201);
    } catch (err: unknown) {
      return c.json({ error: toErrorMessage(err) || 'فشل في تنفيذ المعاملة' }, 400);
    }
  })
);



export { vouchersCreateRouter };
