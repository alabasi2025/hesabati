import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { eq, desc, sql, and, inArray, asc, count } from 'drizzle-orm';
import {
  businesses, vouchers, currencies, operationTypes, operationTypeAccounts,
  accounts, accountBalances, funds, fundBalances,
  fundTypes, bankTypes, exchangeTypes, eWalletTypes,
  journalEntries, journalEntryLines,
  sidebarSections, sidebarItems, userSidebarConfig,
  screenTemplates, screenWidgets, screenWidgetTemplates, screenWidgetAccounts, screenPermissions,
  users, auditLog,
} from '../db/schema/index.ts';
import { bizAuthMiddleware } from '../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, getBody, parseId, toErrorMessage } from '../middleware/helpers.ts';
import { validateBody, voucherMultiSchema } from '../middleware/validation.ts';
import { checkPermission } from '../middleware/permissions.ts';
import { getNextSequence, TYPE_PREFIXES } from '../middleware/sequencing.ts';
import { postMultiTransaction, postTransaction } from '../services/transaction.service.ts';
import { wsService } from '../services/websocket.service.ts';
import { normalizeDbResult, getFirstRow } from '../utils/db-result.ts';
import { getBizId, getUserId } from './api/_shared/context-helpers.ts';

const enhancements = new Hono();

interface PeriodStatsRow {
  receipts: string | number;
  payments: string | number;
  operations_count: string | number;
}

// ===================== تحسينات السندات (Vouchers) =====================

// 1. جلب السندات مع فلترة متقدمة + pagination
enhancements.get('/businesses/:bizId/vouchers-enhanced', bizAuthMiddleware(), safeHandler('جلب السندات المحسن', async (c) => {
  const bizId = getBizId(c);
  const typeFilter = c.req.query('type');
  const statusFilter = c.req.query('status');
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const search = c.req.query('search');
  const minAmount = c.req.query('minAmount');
  const maxAmount = c.req.query('maxAmount');
  const operationTypeId = c.req.query('operationTypeId');
  const limit = parseInt(c.req.query('limit') || '20');
  const offset = parseInt(c.req.query('offset') || '0');
  const sortBy = c.req.query('sortBy') || 'created_at';
  const sortDir = c.req.query('sortDir') || 'desc';

  let conditions = sql`v.business_id = ${bizId}`;
  if (typeFilter) conditions = sql`${conditions} AND v.voucher_type = ${typeFilter}`;
  if (statusFilter) conditions = sql`${conditions} AND v.status = ${statusFilter}`;
  if (dateFrom) conditions = sql`${conditions} AND v.voucher_date >= ${dateFrom}::date`;
  if (dateTo) conditions = sql`${conditions} AND v.voucher_date <= ${dateTo}::date`;
  if (search) conditions = sql`${conditions} AND (v.description ILIKE ${'%' + search + '%'} OR v.voucher_number ILIKE ${'%' + search + '%'} OR v.reference ILIKE ${'%' + search + '%'})`;
  if (minAmount) conditions = sql`${conditions} AND CAST(v.amount AS NUMERIC) >= ${parseFloat(minAmount)}`;
  if (maxAmount) conditions = sql`${conditions} AND CAST(v.amount AS NUMERIC) <= ${parseFloat(maxAmount)}`;
  if (operationTypeId) conditions = sql`${conditions} AND v.operation_type_id = ${parseInt(operationTypeId)}`;

  // جلب البيانات مع الحسابات وأنواع العمليات
  const rows = await db.execute(sql`
    SELECT v.*,
      ot.name as operation_type_name, ot.icon as operation_type_icon, ot.color as operation_type_color, ot.category_id as operation_category,
      fa.name as from_account_name, fa.account_type as from_account_type,
      ta.name as to_account_name, ta.account_type as to_account_type,
      c.code as currency_code, c.symbol as currency_symbol,
      u.full_name as created_by_name
    FROM vouchers v
    LEFT JOIN operation_types ot ON ot.id = v.operation_type_id
    LEFT JOIN accounts fa ON fa.id = v.from_account_id
    LEFT JOIN accounts ta ON ta.id = v.to_account_id
    LEFT JOIN currencies c ON c.id = v.currency_id
    LEFT JOIN users u ON u.id = v.created_by
    WHERE ${conditions}
    ORDER BY v.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `);

  // عدد النتائج الكلي
  const countResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM vouchers v WHERE ${conditions}
  `);
  const countRows = normalizeDbResult<{ total: string }>(countResult);
  const total = Number(getFirstRow<{ total: string }>(countResult)?.total ?? 0);

  // إحصائيات
  const statsResult = await db.execute(sql`
    SELECT
      COUNT(*) as total_count,
      COALESCE(SUM(CASE WHEN v.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as total_receipts,
      COALESCE(SUM(CASE WHEN v.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as total_payments,
      COUNT(CASE WHEN v.voucher_type = 'receipt' THEN 1 END) as receipt_count,
      COUNT(CASE WHEN v.voucher_type = 'payment' THEN 1 END) as payment_count,
      COUNT(CASE WHEN v.status = 'draft' THEN 1 END) as draft_count,
      COUNT(CASE WHEN v.status = 'confirmed' THEN 1 END) as confirmed_count,
      COUNT(CASE WHEN v.status = 'cancelled' THEN 1 END) as cancelled_count
    FROM vouchers v WHERE ${conditions}
  `);
  const statsRows = normalizeDbResult(statsResult);
  const stats = statsRows[0] || {};

  const resultRows = normalizeDbResult(rows);
  return c.json({ vouchers: resultRows, total, stats, limit, offset });
}));

// 1.5 إنشاء سند متعدد السطور (سند واحد بدل عدة سندات)
enhancements.post(
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

    const [opType] = await db.select().from(operationTypes)
      .where(and(eq(operationTypes.id, data.operationTypeId), eq(operationTypes.businessId, bizId)));
    if (!opType) return c.json({ error: 'نوع العملية غير موجود' }, 404);
    if (opType.isActive === false) return c.json({ error: 'نوع العملية غير مفعّل' }, 400);

    const currencyId = data.currencyId || 1;
    const vType = (opType.voucherType as any) || data.voucherType || 'receipt';

    let treasuryAccountId = data.fromAccountId ?? opType.sourceAccountId ?? null;
    // دعم القوالب النقدية: لو المصدر صندوق بدون حساب خزينة، استخدم حساب نقدي نظامي
    if (!treasuryAccountId && opType.paymentMethod === 'cash' && opType.sourceFundId) {
      const accRows = await db.execute(sql`
        SELECT id FROM accounts
        WHERE business_id = ${bizId}
          AND account_type = 'cash'
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
    if (!treasuryAccountId) return c.json({ error: 'حساب الخزينة مطلوب (fromAccountId أو sourceAccountId في القالب)' }, 400);

    const voucherDate = data.voucherDate ? new Date(data.voucherDate) : null;
    const baseDesc = (data.description || opType.name || '').trim();

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
      const extras: string[] = [];
      if (e.reference) extras.push(`إشعار: ${e.reference}`);
      if (e.notes) extras.push(String(e.notes));
      const desc = extras.length ? `${baseDesc} (${extras.join(' | ')})` : baseDesc;
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

    try {
      const result = await postMultiTransaction(bizId, userId, {
        voucherType: vType,
        currencyId,
        lines,
        operationTypeId: data.operationTypeId,
        operationTypeName: opType.name || null,
        description: baseDesc || opType.name || '',
        reference: data.reference || null,
        voucherDate,
        stationId: data.stationId || null,
        employeeId: data.employeeId || null,
        supplierId: data.supplierId || null,
        // ربط الخزينة بالصندوق/الحساب حسب نوع السند
        toFundId: vType === 'receipt' ? (data.toFundId || opType.sourceFundId || null) : (data.toFundId || null),
        fromFundId: vType === 'payment' ? (data.fromFundId || opType.sourceFundId || null) : (data.fromFundId || null),
        fromAccountId: vType === 'payment' ? treasuryAccountId : null,
        toAccountId: vType === 'receipt' ? treasuryAccountId : null,
      });
      try { wsService.notifyNewVoucher(bizId, result.voucher); } catch { /* optional */ }
      return c.json(result.voucher, 201);
    } catch (err: unknown) {
      return c.json({ error: toErrorMessage(err) || 'فشل في تنفيذ المعاملة' }, 400);
    }
  })
);

// 2. تعديل سند (قبل الاعتماد)
enhancements.put('/businesses/:bizId/vouchers/:id', bizAuthMiddleware(), safeHandler('تعديل سند', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);

  const [existing] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!existing) return c.json({ error: 'السند غير موجود' }, 404);
  if (existing.status === 'confirmed') return c.json({ error: 'لا يمكن تعديل سند معتمد. يمكنك عكسه فقط.' }, 400);
  if (existing.status === 'cancelled') return c.json({ error: 'لا يمكن تعديل سند ملغي' }, 400);

  const body = await getBody(c);
  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (body.description !== undefined) updateData.description = body.description;
  if (body.reference !== undefined) updateData.reference = body.reference;
  if (body.amount !== undefined) updateData.amount = String(body.amount);
  if (body.voucherDate !== undefined) updateData.voucherDate = new Date(body.voucherDate);

  const [updated] = await db.update(vouchers).set(updateData).where(eq(vouchers.id, id)).returning();

  // سجل التدقيق
  await db.insert(auditLog).values({
    userId, businessId: bizId, action: 'update_voucher',
    tableName: 'vouchers', recordId: id,
    oldData: { description: existing.description, amount: existing.amount },
    newData: updateData,
  });

  return c.json(updated);
}));

// 3. تغيير حالة السند (مسودة → معتمد → ملغي)
enhancements.post('/businesses/:bizId/vouchers/:id/status', bizAuthMiddleware(), safeHandler('تغيير حالة السند', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);

  const body = await getBody(c);
  const newStatus = body.status;
  if (!['draft', 'confirmed', 'cancelled'].includes(newStatus)) {
    return c.json({ error: 'الحالة غير صالحة. القيم المسموحة: draft, confirmed, cancelled' }, 400);
  }

  const [existing] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!existing) return c.json({ error: 'السند غير موجود' }, 404);

  // التحقق من صحة التحول
  if (existing.status === 'cancelled') return c.json({ error: 'لا يمكن تغيير حالة سند ملغي' }, 400);
  if (existing.status === 'confirmed' && newStatus === 'draft') return c.json({ error: 'لا يمكن إرجاع سند معتمد إلى مسودة' }, 400);

  try {
    // إذا تم اعتماد السند من مسودة → نستخدم محرك المعاملات لتنفيذ القيود المحاسبية
    if (existing.status === 'draft' && newStatus === 'confirmed') {
      const amount = parseFloat(String(existing.amount));
      const currencyId = existing.currencyId || 1;
      const debitAccountId = existing.toAccountId;
      const creditAccountId = existing.fromAccountId;

      // تنفيذ القيود عبر محرك المعاملات المركزي
      await db.transaction(async (tx) => {
        // تحديث حالة السند
        await tx.update(vouchers).set({ status: 'confirmed', updatedAt: new Date() }).where(eq(vouchers.id, id));

        // إنشاء القيد المحاسبي
        const entryDate = existing.voucherDate ? new Date(existing.voucherDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        const [entry] = await tx.insert(journalEntries).values({
          businessId: bizId, entryNumber: `JE-${existing.voucherNumber}`,
          entryDate, description: existing.description || '',
          reference: existing.voucherNumber, operationTypeId: existing.operationTypeId || null,
          totalDebit: String(amount), totalCredit: String(amount),
          isBalanced: true, createdBy: userId,
        }).returning();

        if (debitAccountId) {
          await tx.insert(journalEntryLines).values({
            journalEntryId: entry.id, accountId: debitAccountId,
            lineType: 'debit', amount: String(amount), description: existing.description || '', sortOrder: 0,
          });
          await tx.execute(sql`
            INSERT INTO account_balances (account_id, currency_id, balance)
            VALUES (${debitAccountId}, ${currencyId}, ${amount})
            ON CONFLICT (account_id, currency_id) DO UPDATE SET balance = account_balances.balance + ${amount}, updated_at = NOW()
          `);
        }
        if (creditAccountId) {
          await tx.insert(journalEntryLines).values({
            journalEntryId: entry.id, accountId: creditAccountId,
            lineType: 'credit', amount: String(amount), description: existing.description || '', sortOrder: 1,
          });
          await tx.execute(sql`
            INSERT INTO account_balances (account_id, currency_id, balance)
            VALUES (${creditAccountId}, ${currencyId}, ${-amount})
            ON CONFLICT (account_id, currency_id) DO UPDATE SET balance = account_balances.balance - ${amount}, updated_at = NOW()
          `);
        }

        // سجل التدقيق
        await tx.insert(auditLog).values({
          userId, businessId: bizId, action: 'change_voucher_status',
          tableName: 'vouchers', recordId: id,
          oldData: { status: 'draft' }, newData: { status: 'confirmed' },
        });
      });

      const [updated] = await db.select().from(vouchers).where(eq(vouchers.id, id));
      return c.json(updated);
    }

    // تغيير حالة عادي (ليس من draft إلى confirmed)
    const [updated] = await db.update(vouchers).set({
      status: newStatus, updatedAt: new Date(),
    }).where(eq(vouchers.id, id)).returning();

    await db.insert(auditLog).values({
      userId, businessId: bizId, action: 'change_voucher_status',
      tableName: 'vouchers', recordId: id,
      oldData: { status: existing.status }, newData: { status: newStatus },
    });

    return c.json(updated);
  } catch (err: unknown) {
    return c.json({ error: toErrorMessage(err) || 'فشل في تغيير حالة السند' }, 400);
  }
}));

// 4. جلب رصيد حساب (لعرضه أثناء إنشاء العملية)
enhancements.get('/businesses/:bizId/account-balance/:accountId', bizAuthMiddleware(), safeHandler('جلب رصيد حساب', async (c) => {
  const bizId = getBizId(c);
  const accountId = parseId(c.req.param('accountId'));
  if (!accountId) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);

  const [account] = await db.select().from(accounts).where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)));
  if (!account) return c.json({ error: 'الحساب غير موجود' }, 404);

  const balances = await db.execute(sql`
    SELECT ab.balance, c.code as currency_code, c.symbol as currency_symbol, c.name_ar as currency_name
    FROM account_balances ab
    LEFT JOIN currencies c ON c.id = ab.currency_id
    WHERE ab.account_id = ${accountId}
  `);
  const balanceRows = normalizeDbResult(balances);

  return c.json({
    accountId, accountName: account.name, accountType: account.accountType,
    balances: balanceRows,
  });
}));

// 5. جلب تفاصيل عملية (drill-down)
enhancements.get('/businesses/:bizId/vouchers/:id/details', bizAuthMiddleware(), safeHandler('تفاصيل السند', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);

  const [voucher] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!voucher) return c.json({ error: 'السند غير موجود' }, 404);

  // جلب القيد المحاسبي المرتبط
  const journalResult = await db.execute(sql`
    SELECT je.*, jel.id as line_id, jel.account_id, jel.line_type, jel.amount as line_amount, jel.description as line_description,
      a.name as account_name, a.account_type
    FROM journal_entries je
    LEFT JOIN journal_entry_lines jel ON jel.journal_entry_id = je.id
    LEFT JOIN accounts a ON a.id = jel.account_id
    WHERE je.reference = ${voucher.voucherNumber} AND je.business_id = ${bizId}
    ORDER BY jel.sort_order
  `);
  const journalRows = normalizeDbResult(journalResult);

  // جلب نوع العملية
  let opType = null;
  if (voucher.operationTypeId) {
    const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, voucher.operationTypeId));
    opType = ot;
  }

  // جلب الحسابات
  let fromAccount = null, toAccount = null;
  if (voucher.fromAccountId) {
    const [acc] = await db.select().from(accounts).where(eq(accounts.id, voucher.fromAccountId));
    fromAccount = acc;
  }
  if (voucher.toAccountId) {
    const [acc] = await db.select().from(accounts).where(eq(accounts.id, voucher.toAccountId));
    toAccount = acc;
  }

  // سجل التدقيق
  const auditResult = await db.execute(sql`
    SELECT * FROM audit_log WHERE table_name = 'vouchers' AND record_id = ${id} ORDER BY created_at DESC
  `);
  const auditRows = normalizeDbResult(auditResult);

  return c.json({
    voucher, operationType: opType, fromAccount, toAccount,
    journalEntries: journalRows, auditTrail: auditRows,
  });
}));

// ===================== تحسينات أنواع العمليات =====================

// 6. نسخ/استنساخ نوع عملية
enhancements.post('/businesses/:bizId/operation-types/:id/clone', bizAuthMiddleware(), safeHandler('نسخ نوع عملية', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);

  const [original] = await db.select().from(operationTypes).where(and(eq(operationTypes.id, id), eq(operationTypes.businessId, bizId)));
  if (!original) return c.json({ error: 'نوع العملية غير موجود' }, 404);

  const body = await getBody(c);
  const newName = body.name || `${original.name} (نسخة)`;

  // إنشاء النسخة
  const [cloned] = await db.insert(operationTypes).values({
    businessId: bizId,
    name: newName,
    description: original.description,
    icon: original.icon,
    color: original.color,
    categoryId: original.categoryId,
    voucherType: original.voucherType,
    paymentMethod: original.paymentMethod,
    sourceAccountId: original.sourceAccountId,
    sourceFundId: original.sourceFundId,
    screens: original.screens,
    requiresAttachment: original.requiresAttachment,
    hasMultiLines: original.hasMultiLines,
    sortOrder: original.sortOrder,
    isActive: true,
    notes: `نسخة من: ${original.name}`,
  }).returning();

  // نسخ الحسابات المرتبطة
  const linkedAccounts = await db.select().from(operationTypeAccounts).where(eq(operationTypeAccounts.operationTypeId, id));
  if (linkedAccounts.length > 0) {
    await db.insert(operationTypeAccounts).values(
      linkedAccounts.map(la => ({
        operationTypeId: cloned.id,
        accountId: la.accountId,
        employeeBillingAccountId: la.employeeBillingAccountId,
        label: la.label,
        permission: la.permission,
        sortOrder: la.sortOrder,
        isActive: la.isActive,
      }))
    );
  }

  return c.json(cloned, 201);
}));

// 7. تفعيل/تعطيل نوع عملية
enhancements.post('/businesses/:bizId/operation-types/:id/toggle', bizAuthMiddleware(), safeHandler('تفعيل/تعطيل نوع عملية', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);

  const [existing] = await db.select().from(operationTypes).where(and(eq(operationTypes.id, id), eq(operationTypes.businessId, bizId)));
  if (!existing) return c.json({ error: 'نوع العملية غير موجود' }, 404);

  // منع تفعيل قالب غير مكتمل: يجب تحديد الخزينة والحسابات المرتبطة أولاً
  const nextIsActive = !existing.isActive;
  if (nextIsActive) {
    const vt = String(existing.voucherType ?? '').trim();
    if (vt === 'receipt' || vt === 'payment') {
      const pm = String(existing.paymentMethod ?? '').trim();
      if (!pm) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل تحديد وسيلة الدفع والخزينة' }, 400);
      if (pm === 'cash') {
        if (!existing.sourceFundId) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل تحديد الخزينة (الصندوق)' }, 400);
      } else {
        if (!existing.sourceAccountId) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل تحديد الخزينة (حساب بنك/صراف/محفظة)' }, 400);
      }
      const [cntRow] = await db.select({ cnt: count() }).from(operationTypeAccounts)
        .where(eq(operationTypeAccounts.operationTypeId, id));
      if (!cntRow?.cnt) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل إضافة حساب واحد على الأقل في الحسابات المرتبطة' }, 400);
    }
  }

  const [updated] = await db.update(operationTypes).set({
    isActive: !existing.isActive, updatedAt: new Date(),
  }).where(eq(operationTypes.id, id)).returning();

  return c.json(updated);
}));

// 8. إحصائيات استخدام أنواع العمليات
enhancements.get('/businesses/:bizId/operation-types-stats', bizAuthMiddleware(), safeHandler('إحصائيات أنواع العمليات', async (c) => {
  const bizId = getBizId(c);

  const result = await db.execute(sql`
    SELECT
      ot.id, ot.name, ot.icon, ot.color, ot.category_id, ot.voucher_type, ot.is_active,
      COUNT(v.id) as usage_count,
      COALESCE(SUM(CAST(v.amount AS NUMERIC)), 0) as total_amount,
      MAX(v.created_at) as last_used_at
    FROM operation_types ot
    LEFT JOIN vouchers v ON v.operation_type_id = ot.id AND v.status != 'cancelled'
    WHERE ot.business_id = ${bizId}
    GROUP BY ot.id, ot.name, ot.icon, ot.color, ot.category_id, ot.voucher_type, ot.is_active
    ORDER BY usage_count DESC
  `);
  const rows = normalizeDbResult(result);
  return c.json(rows);
}));

// 9. التحقق من تكرار اسم نوع العملية
enhancements.get('/businesses/:bizId/operation-types/check-name', bizAuthMiddleware(), safeHandler('التحقق من تكرار اسم', async (c) => {
  const bizId = getBizId(c);
  const name = c.req.query('name');
  const excludeId = c.req.query('excludeId');
  if (!name) return c.json({ error: 'الاسم مطلوب' }, 400);

  let conditions = sql`business_id = ${bizId} AND LOWER(name) = LOWER(${name})`;
  if (excludeId) conditions = sql`${conditions} AND id != ${parseInt(excludeId)}`;

  const result = await db.execute(sql`SELECT COUNT(*) as cnt FROM operation_types WHERE ${conditions}`);
  const first = getFirstRow<{ cnt: string }>(result);
  const exists = Number(first?.cnt ?? 0) > 0;

  return c.json({ exists, name });
}));

// ===================== تحسينات إعدادات التبويب الجانبي =====================

// 10. نسخ إعدادات من مستخدم لآخر
enhancements.post('/businesses/:bizId/sidebar-config/copy', bizAuthMiddleware(), safeHandler('نسخ إعدادات السايدبار', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const { fromUserId, toUserId } = body;
  if (!fromUserId || !toUserId) return c.json({ error: 'fromUserId و toUserId مطلوبان' }, 400);
  if (fromUserId === toUserId) return c.json({ error: 'لا يمكن النسخ لنفس المستخدم' }, 400);

  // جلب إعدادات المصدر
  const sourceConfigs = await db.select().from(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, fromUserId)));

  if (sourceConfigs.length === 0) return c.json({ error: 'لا توجد إعدادات للمستخدم المصدر' }, 404);

  // حذف إعدادات المستهدف الحالية
  await db.delete(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, toUserId)));

  // نسخ الإعدادات
  for (const cfg of sourceConfigs) {
    await db.insert(userSidebarConfig).values({
      userId: toUserId,
      businessId: bizId,
      sidebarItemId: cfg.sidebarItemId,
      isVisible: cfg.isVisible,
      customSortOrder: cfg.customSortOrder,
      customSectionName: cfg.customSectionName,
      permission: cfg.permission,
    });
  }

  return c.json({ success: true, copiedCount: sourceConfigs.length });
}));

// 11. إعادة تعيين الإعدادات الافتراضية
enhancements.post('/businesses/:bizId/sidebar-config/reset/:userId', bizAuthMiddleware(), safeHandler('إعادة تعيين إعدادات السايدبار', async (c) => {
  const bizId = getBizId(c);
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'معرّف المستخدم غير صالح' }, 400);

  // حذف الإعدادات الحالية
  await db.delete(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, userId)));

  // جلب كل العناصر وإنشاء إعدادات افتراضية (كل شيء ظاهر)
  const allItems = await db.select({ id: sidebarItems.id, sortOrder: sidebarItems.sortOrder })
    .from(sidebarItems)
    .leftJoin(sidebarSections, eq(sidebarItems.sectionId, sidebarSections.id))
    .where(eq(sidebarSections.businessId, bizId));

  for (const item of allItems) {
    await db.insert(userSidebarConfig).values({
      userId, businessId: bizId, sidebarItemId: item.id,
      isVisible: true, customSortOrder: item.sortOrder || 0,
    });
  }

  return c.json({ success: true, itemCount: allItems.length });
}));

// ===================== تحسينات الشاشات المخصصة =====================

// 12. بحث متقدم في سجل العمليات
enhancements.get('/businesses/:bizId/widget-log-enhanced', bizAuthMiddleware(), safeHandler('سجل العمليات المحسن', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const opTypeId = c.req.query('operationTypeId');
  const search = c.req.query('search');
  const minAmount = c.req.query('minAmount');
  const maxAmount = c.req.query('maxAmount');
  const status = c.req.query('status');
  const limit = parseInt(c.req.query('limit') || '50');
  const offset = parseInt(c.req.query('offset') || '0');

  let conditions = sql`je.business_id = ${bizId}`;
  if (dateFrom) conditions = sql`${conditions} AND je.entry_date >= ${dateFrom}`;
  if (dateTo) conditions = sql`${conditions} AND je.entry_date <= ${dateTo}`;
  if (opTypeId) conditions = sql`${conditions} AND je.operation_type_id = ${parseInt(opTypeId)}`;
  if (search) conditions = sql`${conditions} AND (je.description ILIKE ${'%' + search + '%'} OR je.entry_number ILIKE ${'%' + search + '%'} OR je.reference ILIKE ${'%' + search + '%'})`;
  if (minAmount) conditions = sql`${conditions} AND CAST(je.total_debit AS NUMERIC) >= ${parseFloat(minAmount)}`;
  if (maxAmount) conditions = sql`${conditions} AND CAST(je.total_debit AS NUMERIC) <= ${parseFloat(maxAmount)}`;
  if (status) conditions = sql`${conditions} AND je.status = ${status}`;

  const rows = await db.execute(sql`
    SELECT
      je.id, je.entry_number, je.description, je.entry_date, je.reference,
      je.total_debit, je.total_credit, je.status, je.created_at,
      ot.name as operation_type_name, ot.icon as operation_type_icon,
      ot.color as operation_type_color, ot.voucher_type, ot.category_id as operation_category,
      u.full_name as created_by_name
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    LEFT JOIN users u ON u.id = je.created_by
    WHERE ${conditions}
    ORDER BY je.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `);

  const countResult = await db.execute(sql`SELECT COUNT(*) as total FROM journal_entries je WHERE ${conditions}`);
  const resultRows = normalizeDbResult(rows);
  return c.json({
    entries: resultRows,
    total: Number(getFirstRow<{ total: string }>(countResult)?.total ?? 0),
    limit, offset,
  });
}));

// 13. إحصائيات متقدمة مع مقارنة فترات
enhancements.get('/businesses/:bizId/widget-stats-enhanced', bizAuthMiddleware(), safeHandler('إحصائيات متقدمة', async (c) => {
  const bizId = getBizId(c);
  const period = c.req.query('period') || 'month'; // day, week, month, year
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  let currentFrom: string, currentTo: string, prevFrom: string, prevTo: string;
  const now = new Date();

  if (dateFrom && dateTo) {
    currentFrom = dateFrom;
    currentTo = dateTo;
    const diff = new Date(dateTo).getTime() - new Date(dateFrom).getTime();
    prevFrom = new Date(new Date(dateFrom).getTime() - diff).toISOString().split('T')[0];
    prevTo = new Date(new Date(dateFrom).getTime() - 1).toISOString().split('T')[0];
  } else {
    switch (period) {
      case 'day':
        currentFrom = now.toISOString().split('T')[0];
        currentTo = currentFrom;
        const yesterday = new Date(now.getTime() - 86400000);
        prevFrom = yesterday.toISOString().split('T')[0];
        prevTo = prevFrom;
        break;
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        currentFrom = weekStart.toISOString().split('T')[0];
        currentTo = now.toISOString().split('T')[0];
        const prevWeekStart = new Date(weekStart.getTime() - 7 * 86400000);
        prevFrom = prevWeekStart.toISOString().split('T')[0];
        prevTo = new Date(weekStart.getTime() - 86400000).toISOString().split('T')[0];
        break;
      case 'year':
        currentFrom = `${now.getFullYear()}-01-01`;
        currentTo = now.toISOString().split('T')[0];
        prevFrom = `${now.getFullYear() - 1}-01-01`;
        prevTo = `${now.getFullYear() - 1}-12-31`;
        break;
      default: // month
        currentFrom = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
        currentTo = now.toISOString().split('T')[0];
        const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        prevFrom = prevMonth.toISOString().split('T')[0];
        const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        prevTo = prevMonthEnd.toISOString().split('T')[0];
    }
  }

  // الفترة الحالية
  const currentResult = await db.execute(sql`
    SELECT
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM vouchers v
    LEFT JOIN operation_types ot ON ot.id = v.operation_type_id
    WHERE v.business_id = ${bizId} AND v.status = 'confirmed'
    AND COALESCE(v.reversal_status, 'original') = 'original'
    AND v.voucher_date >= ${currentFrom}::date AND v.voucher_date <= ${currentTo}::date
  `);
  const currentRows = normalizeDbResult<PeriodStatsRow>(currentResult);

  // الفترة السابقة
  const prevResult = await db.execute(sql`
    SELECT
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM vouchers v
    LEFT JOIN operation_types ot ON ot.id = v.operation_type_id
    WHERE v.business_id = ${bizId} AND v.status = 'confirmed'
    AND COALESCE(v.reversal_status, 'original') = 'original'
    AND v.voucher_date >= ${prevFrom}::date AND v.voucher_date <= ${prevTo}::date
  `);
  const prevRows = normalizeDbResult<PeriodStatsRow>(prevResult);

  const current = currentRows[0] || { receipts: 0, payments: 0, operations_count: 0 };
  const prev = prevRows[0] || { receipts: 0, payments: 0, operations_count: 0 };

  // حساب نسب التغيير
  const calcChange = (cur: number, prv: number) => prv === 0 ? (cur > 0 ? 100 : 0) : ((cur - prv) / prv * 100);

  return c.json({
    period, currentFrom, currentTo, prevFrom, prevTo,
    current: {
      receipts: Number(current.receipts),
      payments: Number(current.payments),
      net: Number(current.receipts) - Number(current.payments),
      operationsCount: Number(current.operations_count),
    },
    previous: {
      receipts: Number(prev.receipts),
      payments: Number(prev.payments),
      net: Number(prev.receipts) - Number(prev.payments),
      operationsCount: Number(prev.operations_count),
    },
    changes: {
      receiptsChange: calcChange(Number(current.receipts), Number(prev.receipts)),
      paymentsChange: calcChange(Number(current.payments), Number(prev.payments)),
      netChange: calcChange(Number(current.receipts) - Number(current.payments), Number(prev.receipts) - Number(prev.payments)),
      operationsChange: calcChange(Number(current.operations_count), Number(prev.operations_count)),
    },
  });
}));

// 14. رسم بياني متقدم مع فلترة فترات
enhancements.get('/businesses/:bizId/widget-chart-enhanced', bizAuthMiddleware(), safeHandler('رسم بياني متقدم', async (c) => {
  const bizId = getBizId(c);
  const groupBy = c.req.query('groupBy') || 'month'; // day, week, month
  const months = parseInt(c.req.query('months') || '6');
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  let fromDate: string, toDate: string;
  if (dateFrom && dateTo) {
    fromDate = dateFrom;
    toDate = dateTo;
  } else {
    const now = new Date();
    toDate = now.toISOString().split('T')[0];
    const from = new Date(now);
    from.setMonth(from.getMonth() - months);
    fromDate = from.toISOString().split('T')[0];
  }

  let groupExpr: any;
  let labelExpr: any;
  if (groupBy === 'day') {
    groupExpr = sql`v.voucher_date::date`;
    labelExpr = sql`TO_CHAR(v.voucher_date::date, 'YYYY-MM-DD')`;
  } else if (groupBy === 'week') {
    groupExpr = sql`DATE_TRUNC('week', v.voucher_date::date)`;
    labelExpr = sql`TO_CHAR(DATE_TRUNC('week', v.voucher_date::date), 'YYYY-MM-DD')`;
  } else {
    groupExpr = sql`DATE_TRUNC('month', v.voucher_date::date)`;
    labelExpr = sql`TO_CHAR(DATE_TRUNC('month', v.voucher_date::date), 'YYYY-MM')`;
  }

  const result = await db.execute(sql`
    SELECT
      ${labelExpr} as label,
      ${groupExpr} as period,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' THEN CAST(v.amount AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM vouchers v
    LEFT JOIN operation_types ot ON ot.id = v.operation_type_id
    WHERE v.business_id = ${bizId}
    AND v.status = 'confirmed'
    AND COALESCE(v.reversal_status, 'original') = 'original'
    AND v.voucher_date >= ${fromDate}::date
    AND v.voucher_date <= ${toDate}::date
    GROUP BY ${groupExpr}, ${labelExpr}
    ORDER BY period ASC
  `);
  const rows = normalizeDbResult(result);

  return c.json({
    groupBy, fromDate, toDate,
    data: rows.map((r: any) => ({
      label: r.label,
      receipts: Number(r.receipts),
      payments: Number(r.payments),
      net: Number(r.receipts) - Number(r.payments),
      operationsCount: Number(r.operations_count),
    })),
  });
}));

// 15. إنشاء سند كمسودة
enhancements.post('/businesses/:bizId/vouchers-draft', bizAuthMiddleware(), safeHandler('إنشاء سند كمسودة', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = await getBody(c);

  const amount = parseFloat(body.amount);
  if (isNaN(amount) || amount <= 0) return c.json({ error: 'المبلغ يجب أن يكون رقماً موجباً' }, 400);

  const vType = body.voucherType || 'receipt';
  const voucherDate = body.voucherDate ? new Date(body.voucherDate) : new Date();
  const year = voucherDate.getFullYear();

  // توليد رقم السند حسب الخزينة: (نوع السند + نوع الخزينة + رقم التصنيف + رقم الخزينة + السنة + تسلسل يبدأ 1000)
  // ملاحظة: التصنيف = sortOrder في جدول النوع (fundTypes/bankTypes/...)
  let kind: 'fund' | 'bank' | 'exchange' | 'e_wallet' | null = null;
  let kindCode = '';
  let categoryNo = 0;
  let vaultNo = 0;
  let treasuryId = 0;

  if (vType === 'receipt') {
    if (body.toFundId) {
      kind = 'fund';
      treasuryId = Number(body.toFundId);
      const [f] = await db.select({ fundType: funds.fundType, sequenceNumber: funds.sequenceNumber })
        .from(funds).where(and(eq(funds.id, treasuryId), eq(funds.businessId, bizId))).limit(1);
      if (!f) return c.json({ error: 'صندوق الوارد غير موجود أو لا ينتمي لهذا العمل' }, 400);
      vaultNo = Number(f.sequenceNumber ?? 0);
      const [t] = await db.select({ sortOrder: fundTypes.sortOrder }).from(fundTypes)
        .where(and(eq(fundTypes.businessId, bizId), eq(fundTypes.subTypeKey, f.fundType))).limit(1);
      categoryNo = Number(t?.sortOrder ?? 0);
      kindCode = TYPE_PREFIXES.fund || 'FND';
    } else if (body.toAccountId) {
      treasuryId = Number(body.toAccountId);
      const [a] = await db.select({ accountType: accounts.accountType, subType: accounts.subType, sequenceNumber: accounts.sequenceNumber })
        .from(accounts).where(and(eq(accounts.id, treasuryId), eq(accounts.businessId, bizId))).limit(1);
      if (!a) return c.json({ error: 'حساب الوارد غير موجود أو لا ينتمي لهذا العمل' }, 400);
      if (!['bank', 'exchange', 'e_wallet'].includes(String(a.accountType))) {
        return c.json({ error: 'سند القبض يجب أن يكون مرتبطاً بخزينة: صندوق/بنك/صراف/محفظة' }, 400);
      }
      vaultNo = Number(a.sequenceNumber ?? 0);
      const subTypeKey = String(a.subType ?? '').trim();
      if (!subTypeKey) return c.json({ error: 'تصنيف الخزينة مطلوب (subType)' }, 400);
      if (a.accountType === 'bank') {
        kind = 'bank'; kindCode = TYPE_PREFIXES.bank || 'BNK';
        const [t] = await db.select({ sortOrder: bankTypes.sortOrder }).from(bankTypes)
          .where(and(eq(bankTypes.businessId, bizId), eq(bankTypes.subTypeKey, subTypeKey))).limit(1);
        categoryNo = Number(t?.sortOrder ?? 0);
      } else if (a.accountType === 'exchange') {
        kind = 'exchange'; kindCode = TYPE_PREFIXES.exchange || 'EXC';
        const [t] = await db.select({ sortOrder: exchangeTypes.sortOrder }).from(exchangeTypes)
          .where(and(eq(exchangeTypes.businessId, bizId), eq(exchangeTypes.subTypeKey, subTypeKey))).limit(1);
        categoryNo = Number(t?.sortOrder ?? 0);
      } else {
        kind = 'e_wallet'; kindCode = TYPE_PREFIXES.e_wallet || 'WLT';
        const [t] = await db.select({ sortOrder: eWalletTypes.sortOrder }).from(eWalletTypes)
          .where(and(eq(eWalletTypes.businessId, bizId), eq(eWalletTypes.subTypeKey, subTypeKey))).limit(1);
        categoryNo = Number(t?.sortOrder ?? 0);
      }
    } else {
      return c.json({ error: 'الخزينة المستلمة مطلوبة (toFundId أو toAccountId)' }, 400);
    }
  } else if (vType === 'payment') {
    if (body.fromFundId) {
      kind = 'fund';
      treasuryId = Number(body.fromFundId);
      const [f] = await db.select({ fundType: funds.fundType, sequenceNumber: funds.sequenceNumber })
        .from(funds).where(and(eq(funds.id, treasuryId), eq(funds.businessId, bizId))).limit(1);
      if (!f) return c.json({ error: 'صندوق الصادر غير موجود أو لا ينتمي لهذا العمل' }, 400);
      vaultNo = Number(f.sequenceNumber ?? 0);
      const [t] = await db.select({ sortOrder: fundTypes.sortOrder }).from(fundTypes)
        .where(and(eq(fundTypes.businessId, bizId), eq(fundTypes.subTypeKey, f.fundType))).limit(1);
      categoryNo = Number(t?.sortOrder ?? 0);
      kindCode = TYPE_PREFIXES.fund || 'FND';
    } else if (body.fromAccountId) {
      treasuryId = Number(body.fromAccountId);
      const [a] = await db.select({ accountType: accounts.accountType, subType: accounts.subType, sequenceNumber: accounts.sequenceNumber })
        .from(accounts).where(and(eq(accounts.id, treasuryId), eq(accounts.businessId, bizId))).limit(1);
      if (!a) return c.json({ error: 'حساب الصادر غير موجود أو لا ينتمي لهذا العمل' }, 400);
      if (!['bank', 'exchange', 'e_wallet'].includes(String(a.accountType))) {
        return c.json({ error: 'سند الصرف يجب أن يكون مرتبطاً بخزينة: صندوق/بنك/صراف/محفظة' }, 400);
      }
      vaultNo = Number(a.sequenceNumber ?? 0);
      const subTypeKey = String(a.subType ?? '').trim();
      if (!subTypeKey) return c.json({ error: 'تصنيف الخزينة مطلوب (subType)' }, 400);
      if (a.accountType === 'bank') {
        kind = 'bank'; kindCode = TYPE_PREFIXES.bank || 'BNK';
        const [t] = await db.select({ sortOrder: bankTypes.sortOrder }).from(bankTypes)
          .where(and(eq(bankTypes.businessId, bizId), eq(bankTypes.subTypeKey, subTypeKey))).limit(1);
        categoryNo = Number(t?.sortOrder ?? 0);
      } else if (a.accountType === 'exchange') {
        kind = 'exchange'; kindCode = TYPE_PREFIXES.exchange || 'EXC';
        const [t] = await db.select({ sortOrder: exchangeTypes.sortOrder }).from(exchangeTypes)
          .where(and(eq(exchangeTypes.businessId, bizId), eq(exchangeTypes.subTypeKey, subTypeKey))).limit(1);
        categoryNo = Number(t?.sortOrder ?? 0);
      } else {
        kind = 'e_wallet'; kindCode = TYPE_PREFIXES.e_wallet || 'WLT';
        const [t] = await db.select({ sortOrder: eWalletTypes.sortOrder }).from(eWalletTypes)
          .where(and(eq(eWalletTypes.businessId, bizId), eq(eWalletTypes.subTypeKey, subTypeKey))).limit(1);
        categoryNo = Number(t?.sortOrder ?? 0);
      }
    } else {
      return c.json({ error: 'الخزينة المصروف منها مطلوبة (fromFundId أو fromAccountId)' }, 400);
    }
  } else {
    // fallback legacy للأنواع الأخرى
    const seqName = vType === 'transfer' ? 'voucher_transfer_seq' : 'voucher_receipt_seq';
    const prefix = TYPE_PREFIXES[vType] || 'VCH';
    const seqResult = await db.execute(sql.raw(`SELECT nextval('${seqName}')`));
    const seqRow = getFirstRow<{ nextval: string }>(seqResult);
    const seqVal = parseInt(String(seqRow?.nextval ?? 1), 10);
    const voucherNumber = `${prefix}-${String(seqVal).padStart(5, '0')}`;
    const [created] = await db.insert(vouchers).values({
      businessId: bizId,
      voucherNumber,
      voucherType: vType,
      status: 'draft', // مسودة - لا تؤثر على الأرصدة
      amount: String(amount),
      currencyId: body.currencyId || 1,
      fromAccountId: body.fromAccountId || null,
      toAccountId: body.toAccountId || null,
      fromFundId: body.fromFundId || null,
      toFundId: body.toFundId || null,
      operationTypeId: body.operationTypeId || null,
      description: body.description || '',
      reference: body.reference || null,
      voucherDate,
      createdBy: userId,
    }).returning();
    return c.json(created, 201);
  }

  if (!kind || categoryNo <= 0 || vaultNo <= 0) {
    return c.json({ error: 'لا يمكن توليد رقم السند: تأكد من رقم التصنيف ورقم الخزينة' }, 400);
  }

  const counterType = `treasury_${kind}_${vType}`;
  const seq = await getNextSequence(bizId, counterType, treasuryId, year);
  const voucherSeq = seq; // يبدأ من 1
  const voucherPrefix = TYPE_PREFIXES[vType] || 'VCH';
  const voucherNumber = `${voucherPrefix}-${kindCode}-${categoryNo}-${vaultNo}-${year}-${voucherSeq}`;

  const [created] = await db.insert(vouchers).values({
    businessId: bizId,
    voucherNumber,
    voucherType: vType,
    status: 'draft', // مسودة - لا تؤثر على الأرصدة
    amount: String(amount),
    currencyId: body.currencyId || 1,
    fromAccountId: body.fromAccountId || null,
    toAccountId: body.toAccountId || null,
    fromFundId: body.fromFundId || null,
    toFundId: body.toFundId || null,
    operationTypeId: body.operationTypeId || null,
    description: body.description || '',
    reference: body.reference || null,
    voucherDate,
    createdBy: userId,
    fullSequenceNumber: voucherNumber,
  }).returning();

  return c.json(created, 201);
}));

export default enhancements;
