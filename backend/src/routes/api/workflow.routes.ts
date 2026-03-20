/**
 * مسارات سير العمل (Workflow) والانتقالات — فصل عن api.rest
 */
import { Hono } from 'hono';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { safeHandler, parseId, toErrorMessage, getBody } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import {
  getAvailableTransitions,
  executeTransition,
  getWorkflowHistory,
  setupDefaultWorkflow,
  getOperationTypeTransitions,
  addTransition,
  deleteTransition,
} from '../../services/workflow.service.ts';
import { isConfirmingTransition, applyAccountingForConfirmedVoucher } from '../../engines/transaction.engine.ts';

const workflowRoutes = new Hono();

workflowRoutes.get('/businesses/:bizId/vouchers/:voucherId/transitions', bizAuthMiddleware(), safeHandler('جلب انتقالات سير العمل', async (c) => {
  const bizId = getBizId(c);
  const voucherId = parseId(c.req.param('voucherId'));
  if (!voucherId) return c.json({ error: 'معرّف السند غير صالح' }, 400);
  const transitions = await getAvailableTransitions(bizId, voucherId);
  return c.json(transitions);
}));

workflowRoutes.post('/businesses/:bizId/vouchers/:voucherId/transition', bizAuthMiddleware(), checkPermission('workflow', 'execute'), safeHandler('تنفيذ انتقال', async (c) => {
  const bizId = getBizId(c);
  const voucherId = parseId(c.req.param('voucherId'));
  if (!voucherId) return c.json({ error: 'معرّف السند غير صالح' }, 400);
  const body = await getBody(c);
  const { transitionId, note } = body;
  if (!transitionId) return c.json({ error: 'معرّف الانتقال مطلوب' }, 400);
  const userId = getUserId(c) || 1;
  const result = await executeTransition(bizId, voucherId, transitionId, userId, note);
  if (isConfirmingTransition(result.fromStatus, result.toStatus)) {
    try {
      await applyAccountingForConfirmedVoucher(bizId, userId, voucherId);
    } catch (err: unknown) {
      return c.json({ error: toErrorMessage(err) || 'فشل في تنفيذ القيد المحاسبي عند الاعتماد' }, 400);
    }
  }
  return c.json(result);
}));

workflowRoutes.get('/businesses/:bizId/vouchers/:voucherId/workflow-history', bizAuthMiddleware(), safeHandler('سجل سير العمل', async (c) => {
  const bizId = getBizId(c);
  const voucherId = parseId(c.req.param('voucherId'));
  if (!voucherId) return c.json({ error: 'معرّف السند غير صالح' }, 400);
  const history = await getWorkflowHistory(bizId, voucherId);
  return c.json(history);
}));

workflowRoutes.post('/businesses/:bizId/operation-types/:opTypeId/setup-workflow', bizAuthMiddleware(), safeHandler('إعداد سير عمل', async (c) => {
  const bizId = getBizId(c);
  const opTypeId = parseId(c.req.param('opTypeId'));
  if (!opTypeId) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  await setupDefaultWorkflow(bizId, opTypeId);
  return c.json({ success: true, message: 'تم إعداد سير العمل الافتراضي' });
}));

workflowRoutes.get('/businesses/:bizId/operation-types/:opTypeId/transitions', bizAuthMiddleware(), safeHandler('جلب انتقالات', async (c) => {
  const bizId = getBizId(c);
  const opTypeId = parseId(c.req.param('opTypeId'));
  if (!opTypeId) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const transitions = await getOperationTypeTransitions(bizId, opTypeId);
  return c.json(transitions);
}));

workflowRoutes.post('/businesses/:bizId/operation-types/:opTypeId/transitions', bizAuthMiddleware(), safeHandler('إضافة انتقال', async (c) => {
  const bizId = getBizId(c);
  const opTypeId = parseId(c.req.param('opTypeId'));
  if (!opTypeId) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const body = await getBody(c);
  const transition = await addTransition(bizId, opTypeId, body);
  return c.json(transition, 201);
}));

workflowRoutes.delete('/businesses/:bizId/transitions/:transitionId', bizAuthMiddleware(), safeHandler('حذف انتقال', async (c) => {
  const bizId = getBizId(c);
  const transitionId = parseId(c.req.param('transitionId'));
  if (!transitionId) return c.json({ error: 'معرّف الانتقال غير صالح' }, 400);
  await deleteTransition(bizId, transitionId);
  return c.json({ success: true });
}));

export default workflowRoutes;
