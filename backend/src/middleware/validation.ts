/**
 * validation.ts — Phase 11 (thin wrapper + validateBody)
 * تم التقسيم إلى:
 *  - validation-sanitize.ts (دوال التنظيف)
 *  - validation-schemas.ts  (مخططات Zod)
 */
export * from './validation-sanitize.ts';
export * from './validation-schemas.ts';

export function validateBody<T>(schema: z.ZodSchema<T>, body: unknown): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(body);
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors = result.error.issues.map(i => {
    const fieldPath = i.path.join('.');
    const lastField = i.path.length > 0 ? i.path[i.path.length - 1] : '';
    const fieldLabel = FIELD_LABELS[fieldPath] || FIELD_LABELS[lastField as string] || fieldPath || 'حقل';
    
    let message = i.message;
    if (message === 'Required') message = 'مطلوب';
    if (message === 'Invalid input') message = 'قيمة غير صالحة';
    if (message === 'Expected string, received undefined') message = 'مطلوب';
    if (message === 'Expected string, received null') message = 'مطلوب';
    if (message === 'Expected number, received undefined') message = 'مطلوب';
    if (message === 'Expected number, received null') message = 'مطلوب';
    
    if (i.message.includes(fieldPath)) return message;
    return `${fieldLabel}: ${message}`;
  }).join(' • ');
  
  return { success: false, error: errors };
}

