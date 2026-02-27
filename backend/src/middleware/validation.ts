import { Context, Next } from 'hono';
import { z } from 'zod';

/**
 * XSS Sanitizer: تنظيف المدخلات النصية من أكواد HTML/JS الخبيثة
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * تنظيف كائن كامل من XSS بشكل عميق (recursive)
 */
export function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') return sanitizeString(obj);
  if (Array.isArray(obj)) return obj.map(sanitizeObject);
  if (obj !== null && typeof obj === 'object') {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = sanitizeObject(value);
    }
    return cleaned;
  }
  return obj;
}

/**
 * Middleware: تنظيف جميع المدخلات من XSS
 */
export function xssSanitizeMiddleware() {
  return async (c: Context, next: Next) => {
    if (['POST', 'PUT', 'PATCH'].includes(c.req.method)) {
      try {
        const body = await c.req.json();
        const sanitized = sanitizeObject(body);
        // نخزن النسخة المنظفة في الـ context
        c.set('sanitizedBody', sanitized);
      } catch {
        // إذا لم يكن هناك body أو ليس JSON، نتجاهل
      }
    }
    await next();
  };
}

// ===================== Zod Schemas =====================

export const accountSchema = z.object({
  name: z.string().min(1, 'اسم الحساب مطلوب').max(200),
  accountType: z.enum(['fund', 'bank', 'e_wallet', 'exchange', 'accounting', 'intermediary', 'cash', 'custody', 'service']),
  accountNumber: z.string().max(100).optional().nullable(),
  provider: z.string().max(200).optional().nullable(),
  subType: z.string().max(100).optional().nullable(),
  responsiblePerson: z.string().max(200).optional().nullable(),
  parentAccountId: z.number().int().positive().optional().nullable(),
  supportedCurrencies: z.array(z.string()).optional(),
  notes: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  subTypeId: z.number().int().positive().optional().nullable(),
});

export const voucherSchema = z.object({
  voucherType: z.enum(['receipt', 'payment', 'transfer', 'collection', 'delivery']),
  amount: z.union([z.string(), z.number()]).refine(val => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return !isNaN(num) && num > 0;
  }, 'المبلغ يجب أن يكون رقماً موجباً'),
  description: z.string().optional().nullable(),
  fromAccountId: z.number().int().positive().optional().nullable(),
  toAccountId: z.number().int().positive().optional().nullable(),
  fromFundId: z.number().int().positive().optional().nullable(),
  toFundId: z.number().int().positive().optional().nullable(),
  currencyId: z.number().int().positive().optional(),
  operationTypeId: z.number().int().positive().optional().nullable(),
  voucherDate: z.string().optional(),
});

export const employeeSchema = z.object({
  fullName: z.string().min(1, 'اسم الموظف مطلوب').max(200),
  jobTitle: z.string().max(200).optional().nullable(),
  stationId: z.number().int().positive().optional().nullable(),
  department: z.string().max(100).optional().nullable(),
  salary: z.union([z.string(), z.number()]).optional(),
  salaryCurrency: z.string().max(10).optional(),
  phone: z.string().max(20).optional().nullable(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  hireDate: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const operationTypeSchema = z.object({
  name: z.string().min(1, 'اسم نوع العملية مطلوب').max(200),
  description: z.string().optional().nullable(),
  icon: z.string().max(50).optional(),
  color: z.string().max(20).optional(),
  category: z.enum(['voucher', 'journal', 'collection', 'delivery']).optional(),
  voucherType: z.enum(['payment', 'receipt', 'transfer', 'journal']).optional().nullable(),
  mainAccountId: z.number().int().positive().optional().nullable(),
  paymentMethod: z.enum(['cash', 'bank', 'exchange', 'e_wallet']).optional().nullable(),
  screens: z.string().optional(),
  mainFundId: z.number().int().positive().optional().nullable(),
  requiresAttachment: z.boolean().optional(),
  hasMultiLines: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
  notes: z.string().optional().nullable(),
});

export const journalEntrySchema = z.object({
  description: z.string().optional().nullable(),
  entryDate: z.string().min(1, 'تاريخ القيد مطلوب'),
  reference: z.string().max(100).optional().nullable(),
  operationTypeId: z.number().int().positive().optional().nullable(),
  lines: z.array(z.object({
    accountId: z.number().int().positive('معرّف الحساب مطلوب'),
    lineType: z.enum(['debit', 'credit']),
    amount: z.union([z.string(), z.number()]).refine(val => {
      const num = typeof val === 'string' ? parseFloat(val) : val;
      return !isNaN(num) && num > 0;
    }, 'المبلغ يجب أن يكون رقماً موجباً'),
    description: z.string().optional().nullable(),
  })).min(2, 'القيد يجب أن يحتوي على سطرين على الأقل'),
});

export const typeSchema = z.object({
  name: z.string().min(1, 'الاسم مطلوب').max(200),
  subTypeKey: z.string().min(1).max(100),
  description: z.string().optional().nullable(),
  icon: z.string().max(100).optional(),
  color: z.string().max(50).optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

/**
 * دالة مساعدة للتحقق من صحة البيانات
 */
export function validateBody<T>(schema: z.ZodSchema<T>, body: unknown): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(body);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
  return { success: false, error: errors };
}
