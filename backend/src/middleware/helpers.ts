/**
 * ملف المساعدات العامة
 * يحتوي على دوال تحويل المسميات وتغليف الـ endpoints بـ try-catch
 */

/**
 * تحويل camelCase إلى snake_case
 */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * تحويل snake_case إلى camelCase
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * تحويل مفاتيح كائن من camelCase إلى snake_case (عميق)
 */
export function keysToSnake(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(keysToSnake);
  if (typeof obj === 'object' && !(obj instanceof Date)) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[camelToSnake(key)] = keysToSnake(value);
    }
    return result;
  }
  return obj;
}

/**
 * تحويل مفاتيح كائن من snake_case إلى camelCase (عميق)
 */
export function keysToCamel(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(keysToCamel);
  if (typeof obj === 'object' && !(obj instanceof Date)) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[snakeToCamel(key)] = keysToCamel(value);
    }
    return result;
  }
  return obj;
}

/**
 * تطبيع مفاتيح الكائن: يقبل camelCase و snake_case ويحولها لـ camelCase
 * هذا يحل مشكلة عدم تطابق المسميات بين الفرونت والباك
 */
export function normalizeBody(body: any): any {
  if (body === null || body === undefined) return body;
  if (Array.isArray(body)) return body.map(normalizeBody);
  if (typeof body === 'object' && !(body instanceof Date)) {
    const result: any = {};
    for (const [key, value] of Object.entries(body)) {
      // إذا كان المفتاح يحتوي على underscore، حوله لـ camelCase
      const normalizedKey = key.includes('_') ? snakeToCamel(key) : key;
      // أضف كلا الصيغتين لضمان التوافق
      result[normalizedKey] = normalizeBody(value);
      // إذا كان المفتاح الأصلي مختلف عن المحول، أضف الأصلي أيضاً
      if (normalizedKey !== key) {
        result[key] = normalizeBody(value);
      }
    }
    return result;
  }
  return body;
}

/**
 * تغليف handler بـ try-catch مع رسالة خطأ عربية
 * يمنع خطأ 500 غير المتوقع ويعطي رسالة واضحة
 */
export function safeHandler(
  operationName: string,
  handler: (c: any) => Promise<any>
) {
  return async (c: any) => {
    try {
      return await handler(c);
    } catch (error: any) {
      console.error(`خطأ في ${operationName}:`, error?.message || error);
      if (process.env.NODE_ENV === 'development' && error?.stack) {
        console.error(error.stack);
      }
      
      // التعامل مع أخطاء قاعدة البيانات المحددة
      const message = error?.message || '';
      
      if (message.includes('duplicate key') || message.includes('unique constraint')) {
        return c.json({ error: 'البيانات موجودة مسبقاً - يوجد تكرار في القيم الفريدة' }, 409);
      }
      if (message.includes('foreign key') || message.includes('violates foreign key')) {
        return c.json({ error: 'لا يمكن تنفيذ العملية - يوجد ارتباط مع بيانات أخرى' }, 409);
      }
      if (message.includes('not-null constraint') || message.includes('null value in column')) {
        // استخراج اسم العمود من رسالة الخطأ
        const colMatch = message.match(/column "([^"]+)"/);
        const colName = colMatch ? colMatch[1] : 'غير محدد';
        return c.json({ error: `حقل إلزامي مفقود: ${colName}` }, 400);
      }
      if (message.includes('invalid input syntax')) {
        return c.json({ error: 'صيغة البيانات غير صحيحة - تأكد من القيم المدخلة' }, 400);
      }
      if (message.includes('value too long')) {
        return c.json({ error: 'النص المدخل أطول من الحد المسموح' }, 400);
      }
      if (message.includes('invalid input value for enum')) {
        return c.json({ error: 'القيمة المدخلة غير مسموحة - تأكد من اختيار قيمة صحيحة' }, 400);
      }
      if (message.includes('Unexpected end of JSON') || message.includes('JSON')) {
        return c.json({ error: 'صيغة البيانات المرسلة غير صحيحة (JSON غير صالح)' }, 400);
      }
      
      return c.json({ 
        error: `حدث خطأ أثناء ${operationName} - حاول مرة أخرى`,
        details: message || (error?.message ?? String(error))
      }, 500);
    }
  };
}

/**
 * التحقق من أن الـ ID المرسل رقم صحيح
 */
export function parseId(value: string): number | null {
  const id = parseInt(value);
  if (isNaN(id) || id <= 0) return null;
  return id;
}

/**
 * التحقق من الحقول الإلزامية في body
 */
export function validateRequired(body: any, fields: { name: string; label: string }[]): string | null {
  for (const field of fields) {
    if (body[field.name] === undefined || body[field.name] === null || body[field.name] === '') {
      return `الحقل "${field.label}" مطلوب`;
    }
  }
  return null;
}
