import { Context, Next } from 'hono';
import { z } from 'zod';

/**
 * سياسة التحقق: كل مسار يعدّل بيانات (POST/PUT/PATCH) يجب أن يمرّر body عبر
 * validateBody(schema, body) قبل الاستخدام. الـ schemas المعرّفة أدناه تغطي
 * معظم الكيانات؛ للمسارات الجديدة أضف schema هنا واستخدمه في الـ handler.
 * انظر ARCHITECTURE.md — تحقق المدخلات.
 */

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
  accountType: z.enum(['fund', 'bank', 'e_wallet', 'exchange', 'accounting', 'custody', 'warehouse', 'billing', 'budget', 'supplier', 'employee', 'partner', 'settlement', 'pending']),
  accountNumber: z.string().max(100).optional().nullable(),
  provider: z.string().max(200).optional().nullable(),
  subType: z.string().max(100).optional().nullable(),
  responsiblePerson: z.string().max(200).optional().nullable(),
  parentAccountId: z.number().int().positive().optional().nullable(),
  supportedCurrencies: z.array(z.string()).optional(),
  notes: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  subTypeId: z.number().int().positive('التصنيف مطلوب'),
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
  operationTypeId: z.number().int().positive({ message: 'معرّف نوع العملية (القالب) مطلوب' }),
  voucherDate: z.string().optional(),
});

export const voucherMultiSchema = z.object({
  voucherType: z.enum(['receipt', 'payment', 'transfer', 'journal']).optional(),
  description: z.string().optional().nullable(),
  reference: z.string().max(200).optional().nullable(),
  fromAccountId: z.number().int().positive().optional().nullable(),
  fromFundId: z.number().int().positive().optional().nullable(),
  toFundId: z.number().int().positive().optional().nullable(),
  currencyId: z.number().int().positive().optional(),
  operationTypeId: z.number().int().positive({ message: 'معرّف نوع العملية (القالب) مطلوب' }),
  voucherDate: z.string().optional(),
  stationId: z.number().int().positive().optional().nullable(),
  employeeId: z.number().int().positive().optional().nullable(),
  supplierId: z.number().int().positive().optional().nullable(),
  entries: z.array(z.object({
    accountId: z.number().int().positive().optional(),
    toAccountId: z.number().int().positive().optional(),
    amount: z.union([z.string(), z.number()]).refine(val => {
      const num = typeof val === 'string' ? parseFloat(val) : val;
      return !isNaN(num) && num > 0;
    }, 'المبلغ يجب أن يكون رقماً موجباً'),
    notes: z.string().optional().nullable(),
    reference: z.string().max(200).optional().nullable(),
  }).refine(v => (v.accountId ?? v.toAccountId) != null, { message: 'معرّف الحساب (accountId) مطلوب' }))
    .min(1, 'أدخل سطراً واحداً على الأقل'),
});

export const employeeSchema = z.object({
  fullName: z.string().min(1, 'اسم الموظف مطلوب').max(200),
  departmentId: z.number().int().positive('تصنيف الموظف مطلوب'),
  jobTitleId: z.number().int().positive().optional().nullable(),
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
  category: z.string().max(50).optional(), // تصنيف ديناميكي ينشئه المستخدم
  voucherType: z.string().max(30).optional().nullable(),
  paymentMethod: z.string().max(30).optional().nullable(),
  screens: z.union([z.string(), z.array(z.string())]).optional(),
  mainFundId: z.number().int().positive().optional().nullable(),
  mainAccountId: z.number().int().positive().optional().nullable(),
  sourceAccountId: z.number().int().positive().optional().nullable(),
  sourceFundId: z.number().int().positive().optional().nullable(),
  sourceWarehouseId: z.number().int().positive().optional().nullable(),
  requiresAttachment: z.boolean().optional(),
  hasMultiLines: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  linkedAccounts: z.array(z.union([z.number(), z.object({
    accountId: z.number().optional(),
    id: z.number().optional(),
    label: z.string().optional().nullable(),
    permission: z.string().optional(),
    sortOrder: z.number().optional(),
  })])).optional(),
});

export const journalEntrySchema = z.object({
  description: z.string().optional().nullable(),
  entryDate: z.union([z.string().min(1, 'تاريخ القيد مطلوب'), z.string().optional()]).optional(),
  date: z.string().optional(), // بديل لـ entryDate (الفرونت قد يرسل date)
  reference: z.string().max(100).optional().nullable(),
  operationTypeId: z.number().int().positive({ message: 'معرّف نوع العملية (القالب) مطلوب' }),
  lines: z.array(z.object({
    accountId: z.number().int().positive('معرّف الحساب مطلوب'),
    lineType: z.enum(['debit', 'credit']).optional(),
    type: z.enum(['debit', 'credit']).optional(), // بديل لـ lineType
    amount: z.union([z.string(), z.number()]).refine(val => {
      const num = typeof val === 'string' ? parseFloat(val) : val;
      return !isNaN(num) && num > 0;
    }, 'المبلغ يجب أن يكون رقماً موجباً'),
    description: z.string().optional().nullable(),
  })).min(2, 'القيد يجب أن يحتوي على سطرين على الأقل').optional(),
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

// ===================== Schemas إضافية =====================

export const stationSchema = z.object({
  name: z.string().min(1, 'اسم المحطة مطلوب').max(200),
  code: z.string().min(1, 'رمز المحطة مطلوب').max(50),
  location: z.string().max(300).optional().nullable(),
  managerId: z.number().int().positive().optional().nullable(),
  billingSystems: z.array(z.string()).optional(),
  hasEmployees: z.boolean().optional(),
  isActive: z.boolean().optional(),
  notes: z.string().optional().nullable(),
});

export const supplierSchema = z.object({
  name: z.string().min(1, 'اسم المورد مطلوب').max(200),
  supplierTypeId: z.number().int().positive('تصنيف المورد مطلوب'),
  category: z.string().max(100).optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  address: z.string().max(300).optional().nullable(),
  contactPerson: z.string().max(200).optional().nullable(),
  notes: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});

export const warehouseSchema = z.object({
  name: z.string().min(1, 'اسم المخزن مطلوب').max(200),
  warehouseType: z.enum(['main', 'station']),
  subType: z.string().max(100).optional().nullable(),
  subTypeId: z.number().int().positive().optional().nullable(),
  stationId: z.number().int().positive().optional().nullable(),
  responsiblePerson: z.string().max(200).optional().nullable(),
  location: z.string().max(300).optional().nullable(),
  isActive: z.boolean().optional(),
  notes: z.string().optional().nullable(),
});

export const sidebarSectionSchema = z.object({
  name: z.string().min(1, 'اسم القسم مطلوب').max(200),
  icon: z.string().max(50).optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const sidebarItemSchema = z.object({
  sectionId: z.number().int().positive('معرّف القسم مطلوب'),
  screenKey: z.string().min(1, 'مفتاح الشاشة مطلوب').max(100),
  label: z.string().min(1, 'التسمية مطلوبة').max(200),
  icon: z.string().min(1, 'الأيقونة مطلوبة').max(50),
  route: z.string().min(1, 'المسار مطلوب').max(300),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const screenSchema = z.object({
  name: z.string().min(1, 'اسم الشاشة مطلوب').max(200),
  description: z.string().optional().nullable(),
  icon: z.string().max(50).optional(),
  color: z.string().max(20).optional(),
  layoutConfig: z.any().optional(),
  templateKey: z.string().max(50).optional().nullable(),
  widgets: z.array(z.any()).optional(),
  addToSidebar: z.boolean().optional(),
});

export const widgetSchema = z.object({
  widgetType: z.string().min(1, 'نوع العنصر مطلوب').max(50),
  title: z.string().min(1, 'عنوان العنصر مطلوب').max(200),
  config: z.any().optional(),
  positionX: z.number().int().optional(),
  positionY: z.number().int().optional(),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  sortOrder: z.number().int().optional(),
  isVisible: z.boolean().optional(),
});

export const fundSchema = z.object({
  name: z.string().min(1, 'اسم الصندوق مطلوب').max(200),
  fundType: z.enum(['collection', 'salary_advance', 'custody', 'safe', 'expense', 'deposit']),
  stationId: z.number().int().positive().optional().nullable(),
  responsiblePerson: z.string().max(200).optional().nullable(),
  description: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  notes: z.string().optional().nullable(),
});

export const partnerSchema = z.object({
  fullName: z.string().min(1, 'اسم الشريك مطلوب').max(200),
  sharePercentage: z.union([z.string(), z.number()]).optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  role: z.string().min(1, 'تصنيف الشريك (الدور) مطلوب').max(100),
  notes: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});

export const settlementSchema = z.object({
  title: z.string().min(1, 'عنوان التصفية مطلوب').max(300),
  reconciliationType: z.string().optional(),
  type: z.string().optional(), // بديل لـ reconciliationType
  status: z.string().optional(),
  withPerson: z.string().max(200).optional().nullable(),
  accountId: z.number().int().positive().optional().nullable(),
  fundId: z.number().int().positive().optional().nullable(),
  stationId: z.number().int().positive().optional().nullable(),
  periodStart: z.string().optional().nullable(),
  periodEnd: z.string().optional().nullable(),
  expectedAmount: z.union([z.string(), z.number()]).optional().nullable(),
  actualAmount: z.union([z.string(), z.number()]).optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const pendingAccountSchema = z.object({
  personOrEntity: z.string().min(1, 'اسم الشخص أو الجهة مطلوب').max(200),
  description: z.string().min(1, 'الوصف مطلوب'),
  status: z.enum(['pending', 'in_progress', 'resolved', 'written_off']).optional(),
  estimatedAmount: z.union([z.string(), z.number()]).optional().nullable(),
  currencyId: z.number().int().positive().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const billingSystemConfigSchema = z.object({
  name: z.string().min(1, 'اسم نظام الفوترة مطلوب').max(200),
  systemKey: z.string().min(1).max(100).optional(),
  icon: z.string().max(50).optional(),
  color: z.string().max(20).optional(),
  stationMode: z.string().max(20).optional(),
  stationScope: z.string().max(20).optional(),
  stationIds: z.array(z.number()).optional(),
  supportedMethodIds: z.array(z.number()).optional(),
  supportedTypes: z.array(z.string()).optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
  notes: z.string().optional().nullable(),
});

export const employeeBillingAccountSchema = z.object({
  employeeId: z.number().int().positive('معرّف الموظف مطلوب'),
  stationId: z.number().int().positive('معرّف المحطة مطلوب'),
  billingSystemId: z.number().int().positive('نظام الفوترة مطلوب'),
  collectionMethod: z.string().min(1, 'طريقة التحصيل مطلوبة'),
  label: z.string().min(1, 'التسمية مطلوبة').max(200),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
  notes: z.string().optional().nullable(),
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
