import type { Context } from 'hono';

/**
 * متغيرات السياق التي يضعها auth و bizAuth middleware
 */
export interface AppVariables {
  user?: {
    userId: number;
    username: string;
    role: string;
  };
  bizId?: number;
  bizAccess?: string;
  verifiedBizId?: number;
}

/**
 * نوع سياق التطبيق لاستخدامه في الـ handlers
 */
export type AppContext = Context<{ Variables: AppVariables }>;

/**
 * استخراج بيانات التحقق من Zod بشكل آمن
 */
export function getValidatedData<T>(
  validation: { success: true; data: T } | { success: false; error: string }
): T | null {
  return validation.success ? validation.data : null;
}
