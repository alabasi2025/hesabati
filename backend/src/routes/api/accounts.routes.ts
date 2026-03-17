import { Hono } from 'hono';
import { PostgresError } from 'postgres';
import { db } from '../../db/index.ts';
import { eq, and, isNotNull, desc } from 'drizzle-orm';
import {
  accounts,
  accountSubNatures,
  funds,
  fundTypes,
  suppliers,
  warehouses,
  employeeBillingAccounts,
  businessPartners,
  employees,
  billingSystemsConfig,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, parseId } from '../../middleware/helpers.ts';
import {
  generateItemCode,
  generateTreeAccountCode,
  generateLeafAccountCode,
  getNextChildAccountSequence,
  getNextItemInCategorySequence,
  getNextSupplierSequence,
  TYPE_PREFIXES,
} from '../../middleware/sequencing.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { auditCreate, auditUpdate, auditDelete, makeAuditCtx } from '../../engines/audit-middleware.engine.ts';

const accountsRoutes = new Hono();

const NATURE_TO_ACCOUNT_TYPE: Record<string, string> = {
  fund: 'fund', bank: 'bank', e_wallet: 'e_wallet', exchange: 'exchange',
  custody: 'custody', warehouse: 'warehouse', supplier: 'supplier',
  employee: 'employee', partner: 'partner', billing: 'billing',
  intermediary: 'intermediary', budget: 'budget', settlement: 'settlement', pending: 'pending',
};

function toAccountTypeFromNature(natureKey: string): string {
  return NATURE_TO_ACCOUNT_TYPE[natureKey] || 'accounting';
}

// ===================== Endpoints مخصصة للأداء =====================

accountsRoutes.get('/businesses/:bizId/custody-accounts', bizAuthMiddleware(), safeHandler('جلب حسابات العهد', async (c) => {
  const bizId = getBizId(c);
  const rows = await db
    .select()
    .from(accounts)
    .innerJoin(accountSubNatures, eq(accounts.accountSubNatureId, accountSubNatures.id))
    .where(and(
      eq(accounts.businessId, bizId),
      eq(accountSubNatures.natureKey, 'custody'),
      eq(accounts.isLeafAccount, true)
    ))
    .orderBy(accounts.code);
  return c.json(rows.map(r => r.accounts));
}));

accountsRoutes.get('/businesses/:bizId/intermediary-accounts', bizAuthMiddleware(), safeHandler('جلب الحسابات الوسيطة', async (c) => {
  const bizId = getBizId(c);
  const rows = await db
    .select()
    .from(accounts)
    .innerJoin(accountSubNatures, eq(accounts.accountSubNatureId, accountSubNatures.id))
    .where(and(
      eq(accounts.businessId, bizId),
      eq(accountSubNatures.natureKey, 'intermediary'),
      eq(accounts.isLeafAccount, true)
    ))
    .orderBy(accounts.code);
  return c.json(rows.map(r => r.accounts));
}));

accountsRoutes.get('/businesses/:bizId/pending-accounts-list', bizAuthMiddleware(), safeHandler('جلب الحسابات المعلقة', async (c) => {
  const bizId = getBizId(c);
  const rows = await db
    .select()
    .from(accounts)
    .innerJoin(accountSubNatures, eq(accounts.accountSubNatureId, accountSubNatures.id))
    .where(and(
      eq(accounts.businessId, bizId),
      eq(accountSubNatures.natureKey, 'pending'),
      eq(accounts.isLeafAccount, true)
    ))
    .orderBy(accounts.code);
  return c.json(rows.map(r => r.accounts));
}));

accountsRoutes.get('/businesses/:bizId/accounts', bizAuthMiddleware(), safeHandler('جلب الحسابات', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(accounts).where(eq(accounts.businessId, bizId)).orderBy(accounts.code, accounts.name);
  const allMode = c.req.query('all') === 'true';
  if (!allMode) return c.json(rows);

  const billingLinks = await db
    .select({
      accountId: employeeBillingAccounts.accountId,
      billingSystemKey: billingSystemsConfig.systemKey,
      billingSystemName: billingSystemsConfig.name,
    })
    .from(employeeBillingAccounts)
    .leftJoin(employees, eq(employeeBillingAccounts.employeeId, employees.id))
    .leftJoin(billingSystemsConfig, eq(employeeBillingAccounts.billingSystemId, billingSystemsConfig.id))
    .where(and(eq(employees.businessId, bizId), isNotNull(employeeBillingAccounts.accountId)));

  const billingByAccountId = new Map<number, { billingSystemKey: string | null; billingSystemName: string | null }>();
  for (const row of billingLinks) {
    if (!row.accountId) continue;
    if (!billingByAccountId.has(row.accountId)) {
      billingByAccountId.set(row.accountId, {
        billingSystemKey: row.billingSystemKey ?? null,
        billingSystemName: row.billingSystemName ?? null,
      });
    }
  }

  const normalizedAccounts = rows.map((acc) => {
    if (acc.accountType !== 'billing') return acc;
    const billing = billingByAccountId.get(acc.id);
    return {
      ...acc,
      subType: acc.subType ?? billing?.billingSystemName ?? null,
      billingSystemKey: billing?.billingSystemKey ?? null,
      _source: 'billing',
    };
  });

  return c.json({ accounts: normalizedAccounts, stations: [] });
}));

accountsRoutes.post('/businesses/:bizId/accounts', bizAuthMiddleware(), checkPermission('accounts', 'create'), safeHandler('إضافة حساب', async (c) => {
  const bizId = getBizId(c);
  const body = ((await getBody(c)) || {}) as Record<string, unknown>;
  const isLeafAccount = body.isLeafAccount !== false;
  const parentAccountId = body.parentAccountId == null ? null : Number(body.parentAccountId);
  const accountSubNatureId = body.accountSubNatureId == null ? null : Number(body.accountSubNatureId);
  const accountName = typeof body.name === 'string' ? body.name.trim() : '';

  if (!accountName) return c.json({ error: 'اسم الحساب مطلوب' }, 400);
  if (isLeafAccount && (!Number.isInteger(accountSubNatureId) || Number(accountSubNatureId) <= 0)) {
    return c.json({ error: 'النوع الفرعي للحساب مطلوب' }, 400);
  }

  const [parent] = parentAccountId
    ? await db.select().from(accounts).where(and(eq(accounts.id, parentAccountId), eq(accounts.businessId, bizId))).limit(1)
    : [null];
  if (parentAccountId && !parent) return c.json({ error: 'الحساب الأب غير موجود' }, 400);

  const [subNature] = accountSubNatureId
    ? await db.select({ id: accountSubNatures.id, natureKey: accountSubNatures.natureKey }).from(accountSubNatures).where(and(eq(accountSubNatures.id, accountSubNatureId), eq(accountSubNatures.businessId, bizId))).limit(1)
    : [null];
  if (accountSubNatureId && !subNature) return c.json({ error: 'نوع الحساب الفرعي غير موجود' }, 400);

  const accountType = subNature ? toAccountTypeFromNature(String(subNature.natureKey)) : (typeof body.accountType === 'string' ? body.accountType : 'accounting');
  const hasManualCode = typeof body.code === 'string' && body.code.trim().length > 0;

  let sequenceNumber: number;
  let generatedCode: string;

  // آلية الترقيم الصحيحة:
  // 1. الحسابات الفرعية (isLeafAccount = true): تأخذ كود حسب النوع الفرعي (FND-01, BNK-01, إلخ)
  // 2. الحسابات الرئيسية (isLeafAccount = false): تأخذ كود شجري للتنظيم (1, 1.1, 2.3, إلخ)
  if (isLeafAccount && subNature) {
    // حساب فرعي: استخدم آلية الكود حسب النوع الفرعي
    const result = await generateLeafAccountCode(bizId, subNature.natureKey, db);
    sequenceNumber = result.sequenceNumber;
    generatedCode = result.code;
  } else {
    // حساب رئيسي: استخدم آلية الترقيم الشجري
    sequenceNumber = await getNextChildAccountSequence(bizId, parentAccountId, db);
    generatedCode = generateTreeAccountCode(parent?.code ?? null, sequenceNumber);

    // التحقق من عدم تكرار الكود للحسابات الرئيسية
    const resolveAvailableTreeCode = async (startSequence: number): Promise<{ seq: number; code: string }> => {
      let seq = startSequence;
      for (let i = 0; i < 2000; i++) {
        const code = generateTreeAccountCode(parent?.code ?? null, seq);
        const [exists] = await db.select({ id: accounts.id }).from(accounts).where(and(eq(accounts.businessId, bizId), eq(accounts.code, code))).limit(1);
        if (!exists) return { seq, code };
        seq += 1;
      }
      throw new Error('تعذر إيجاد كود حساب متاح');
    };

    if (!hasManualCode) {
      const available = await resolveAvailableTreeCode(sequenceNumber);
      sequenceNumber = available.seq;
      generatedCode = available.code;
    }
  }
  
  let created: typeof accounts.$inferSelect | undefined;
  const payload: Record<string, unknown> = {
    ...body,
    businessId: bizId,
    name: accountName,
    accountType,
    parentAccountId,
    accountSubNatureId,
    isLeafAccount,
    sequenceNumber,
    code: hasManualCode ? String(body.code).trim() : generatedCode,
    updatedAt: new Date(),
  };
  delete payload.linkedEntityType;
  delete payload.linkedEntityId;

  try {
    [created] = await db.insert(accounts).values(payload as typeof accounts.$inferInsert).returning();
  } catch (error) {
    const pgError = error as PostgresError;
    const isCodeConflict = pgError?.code === '23505' && String(pgError?.constraint_name || '').includes('accounts_biz_code_unique');
    if (!isCodeConflict || hasManualCode) throw error;
    
    // في حالة التكرار (نادر جداً مع آلية التسلسل الجديدة)، ارجع خطأ واضح
    return c.json({ error: 'حدث تعارض في الكود، يرجى المحاولة مرة أخرى' }, 409);
  }
  if (!created) return c.json({ error: 'تعذر إنشاء الحساب' }, 500);

  // إنشاء صندوق تلقائي عند إنشاء حساب فرعي من طبيعة "fund" من صفحة الدليل مباشرة
  const hasLinkedEntityPayload = body.linkedEntityId != null && body.linkedEntityType != null;
  if (created && subNature?.natureKey === 'fund' && !hasLinkedEntityPayload) {
    let chosenFundType = '';
    let chosenFundTypeId: number | null = null;
    const requestedFundTypeId = Number(created.subTypeId);
    if (Number.isInteger(requestedFundTypeId) && requestedFundTypeId > 0) {
      const [requestedType] = await db
        .select({ id: fundTypes.id, subTypeKey: fundTypes.subTypeKey })
        .from(fundTypes)
        .where(and(eq(fundTypes.businessId, bizId), eq(fundTypes.id, requestedFundTypeId)))
        .limit(1);
      if (requestedType) {
        chosenFundType = String(requestedType.subTypeKey || '').trim();
        chosenFundTypeId = Number(requestedType.id);
      }
    }
    if (!chosenFundType && typeof created.subType === 'string' && created.subType.trim().length > 0) {
      const [requestedTypeByKey] = await db
        .select({ id: fundTypes.id, subTypeKey: fundTypes.subTypeKey })
        .from(fundTypes)
        .where(and(eq(fundTypes.businessId, bizId), eq(fundTypes.subTypeKey, created.subType.trim())))
        .limit(1);
      if (requestedTypeByKey) {
        chosenFundType = String(requestedTypeByKey.subTypeKey || '').trim();
        chosenFundTypeId = Number(requestedTypeByKey.id);
      }
    }

    let [preferredType] = await db
      .select({ subTypeKey: fundTypes.subTypeKey })
      .from(fundTypes)
      .where(and(eq(fundTypes.businessId, bizId), eq(fundTypes.isActive, true)))
      .orderBy(fundTypes.sequenceNumber, fundTypes.sortOrder, fundTypes.id)
      .limit(1);
    if (!preferredType) {
      [preferredType] = await db
        .select({ subTypeKey: fundTypes.subTypeKey })
        .from(fundTypes)
        .where(eq(fundTypes.businessId, bizId))
        .orderBy(fundTypes.sequenceNumber, fundTypes.sortOrder, fundTypes.id)
        .limit(1);
    }

    if (!chosenFundType) {
      chosenFundType = String(preferredType?.subTypeKey || '').trim();
    }
    if (!chosenFundType) {
      const [createdType] = await db
        .insert(fundTypes)
        .values({
          businessId: bizId,
          name: 'صندوق',
          subTypeKey: 'default_fund',
          sequenceNumber: 1,
          sortOrder: 1,
          icon: 'savings',
          color: '#4CAF50',
          isActive: true,
        })
        .returning({ id: fundTypes.id, subTypeKey: fundTypes.subTypeKey });
      chosenFundType = String(createdType?.subTypeKey || 'default_fund');
      chosenFundTypeId = Number(createdType?.id || 0) || null;
    }
    if (!chosenFundTypeId) {
      const [resolvedType] = await db
        .select({ id: fundTypes.id })
        .from(fundTypes)
        .where(and(eq(fundTypes.businessId, bizId), eq(fundTypes.subTypeKey, chosenFundType)))
        .limit(1);
      chosenFundTypeId = Number(resolvedType?.id || 0) || null;
    }

    const [lastInType] = await db
      .select({ seq: funds.sequenceNumber })
      .from(funds)
      .where(
        and(
          eq(funds.businessId, bizId),
          chosenFundTypeId ? eq(funds.subTypeId, chosenFundTypeId) : eq(funds.fundType, chosenFundType as any),
        ),
      )
      .orderBy(desc(funds.sequenceNumber), desc(funds.id))
      .limit(1);
    const nextFundSeq = (Number(lastInType?.seq) || 0) + 1;

    await db.insert(funds).values({
      businessId: bizId,
      name: created.name,
      fundType: chosenFundType,
      subType: chosenFundType,
      subTypeId: chosenFundTypeId,
      sequenceNumber: nextFundSeq,
      accountId: created.id,
      responsiblePerson: created.responsiblePerson,
      notes: created.notes,
      isActive: created.isActive,
    });

    await db.update(accounts).set({ subTypeId: chosenFundTypeId, subType: chosenFundType, updatedAt: new Date() }).where(eq(accounts.id, created.id));
  }
  if (created && subNature?.natureKey === 'supplier' && !hasLinkedEntityPayload) {
    const supplierTypeId = Number(created.subTypeId);
    const hasSupplierTypeId = Number.isInteger(supplierTypeId) && supplierTypeId > 0;
    const supplierSequence = hasSupplierTypeId ? await getNextSupplierSequence(bizId, supplierTypeId, db) : null;

    await db.insert(suppliers).values({
      businessId: bizId,
      name: created.name,
      supplierTypeId: hasSupplierTypeId ? supplierTypeId : null,
      category: typeof created.subType === 'string' && created.subType.trim().length > 0 ? created.subType.trim() : null,
      sequenceNumber: supplierSequence,
      code: supplierSequence ? generateItemCode(TYPE_PREFIXES.supplier || 'SUP', supplierSequence) : null,
      accountId: created.id,
      notes: created.notes,
      isActive: created.isActive,
    });

    if (hasSupplierTypeId) {
      await db.update(accounts).set({ subTypeId: supplierTypeId, updatedAt: new Date() }).where(eq(accounts.id, created.id));
    }
  }
  if (created && subNature?.natureKey === 'warehouse' && !hasLinkedEntityPayload) {
    const warehouseSubTypeId = Number(created.subTypeId);
    const hasWarehouseSubTypeId = Number.isInteger(warehouseSubTypeId) && warehouseSubTypeId > 0;
    const warehouseNumbering = hasWarehouseSubTypeId
      ? await getNextItemInCategorySequence(bizId, 'warehouse', warehouseSubTypeId, db)
      : null;

    await db.insert(warehouses).values({
      businessId: bizId,
      name: created.name,
      accountId: created.id,
      warehouseType: 'sub',
      subType: typeof created.subType === 'string' && created.subType.trim().length > 0 ? created.subType.trim() : null,
      subTypeId: hasWarehouseSubTypeId ? warehouseSubTypeId : null,
      sequenceNumber: warehouseNumbering?.sequenceNumber ?? null,
      code: warehouseNumbering?.code ?? null,
      responsiblePerson: created.responsiblePerson,
      notes: created.notes,
      isActive: created.isActive,
    });

    if (hasWarehouseSubTypeId) {
      await db.update(accounts).set({ subTypeId: warehouseSubTypeId, updatedAt: new Date() }).where(eq(accounts.id, created.id));
    }
  }

  if (created && body.linkedEntityId && body.linkedEntityType) {
    const linkedEntityId = Number(body.linkedEntityId);
    const linkedEntityType = typeof body.linkedEntityType === 'string' ? body.linkedEntityType : '';
    if (linkedEntityType === 'fund') {
      await db.update(funds).set({ accountId: created.id, updatedAt: new Date() }).where(and(eq(funds.id, linkedEntityId), eq(funds.businessId, bizId)));
    } else if (linkedEntityType === 'supplier') {
      await db.update(suppliers).set({ accountId: created.id, updatedAt: new Date() }).where(and(eq(suppliers.id, linkedEntityId), eq(suppliers.businessId, bizId)));
    } else if (linkedEntityType === 'billing') {
      await db.update(employeeBillingAccounts).set({ accountId: created.id }).where(eq(employeeBillingAccounts.id, linkedEntityId));
    } else if (linkedEntityType === 'warehouse') {
      await db.update(warehouses).set({ accountId: created.id, updatedAt: new Date() }).where(and(eq(warehouses.id, linkedEntityId), eq(warehouses.businessId, bizId)));
    } else if (linkedEntityType === 'partner') {
      await db.update(businessPartners).set({ accountId: created.id }).where(and(eq(businessPartners.id, linkedEntityId), eq(businessPartners.businessId, bizId)));
    }
  }

  return c.json(created, 201);
}));

accountsRoutes.put('/businesses/:bizId/accounts/:id', bizAuthMiddleware(), safeHandler('تعديل حساب', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [existing] = await db.select().from(accounts).where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
  if (!existing) return c.json({ error: 'حساب غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = ((await getBody(c)) || {}) as Record<string, unknown>;
  const [updated] = await db.update(accounts).set({ ...body, updatedAt: new Date() }).where(eq(accounts.id, id)).returning();
  return c.json(updated);
}));

accountsRoutes.delete('/businesses/:bizId/accounts/:id', bizAuthMiddleware(), checkPermission('accounts', 'delete'), safeHandler('حذف حساب', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [existing] = await db.select().from(accounts).where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
  if (!existing) return c.json({ error: 'حساب غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(accounts).where(eq(accounts.id, id));
  return c.json({ success: true });
}));

export default accountsRoutes;
