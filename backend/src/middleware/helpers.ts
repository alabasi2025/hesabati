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
export function normalizeBody(body: any, depth: number = 0): any {
  if (body === null || body === undefined) return body;
  if (depth > 20) return body; // منع stack overflow
  if (Array.isArray(body)) return body.map(item => normalizeBody(item, depth + 1));
  if (typeof body === 'object' && !(body instanceof Date)) {
    const result: any = {};
    for (const [key, value] of Object.entries(body)) {
      // إذا كان المفتاح يحتوي على underscore، حوله لـ camelCase
      const normalizedKey = key.includes('_') ? snakeToCamel(key) : key;
      // أضف كلا الصيغتين لضمان التوافق
      result[normalizedKey] = normalizeBody(value, depth + 1);
      // إذا كان المفتاح الأصلي مختلف عن المحول، أضف الأصلي أيضاً
      if (normalizedKey !== key) {
        result[key] = normalizeBody(value, depth + 1);
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
      console.error(`خطأ في ${operationName}:`, error);
      
      const message = error?.message || '';
      const stack = error?.stack || '';
      
      // استخراج مكان الخطأ من الـ stack trace
      const locationMatch = stack.match(/at\s+.*?\((.*?):(\d+):(\d+)\)/);
      const errorLocation = locationMatch ? `${locationMatch[1]}:${locationMatch[2]}` : undefined;
      
      // التعامل مع أخطاء قاعدة البيانات المحددة
      if (message.includes('duplicate key') || message.includes('unique constraint')) {
        const tableMatch = message.match(/constraint "([^"]+)"/);
        const constraintName = tableMatch ? tableMatch[1] : '';
        return c.json({ 
          error: `فشل في ${operationName}: البيانات موجودة مسبقاً - يوجد تكرار في القيم الفريدة`,
          details: constraintName ? `القيد المكرر: ${constraintName}` : undefined,
          location: errorLocation
        }, 409);
      }
      if (message.includes('foreign key') || message.includes('violates foreign key')) {
        const refMatch = message.match(/constraint "([^"]+)"/);
        const refName = refMatch ? refMatch[1] : '';
        return c.json({ 
          error: `فشل في ${operationName}: لا يمكن تنفيذ العملية - يوجد ارتباط مع بيانات أخرى`,
          details: refName ? `الارتباط: ${refName}` : 'توجد بيانات مرتبطة تمنع الحذف أو التعديل',
          location: errorLocation
        }, 409);
      }
      if (message.includes('not-null constraint') || message.includes('null value in column')) {
        const colMatch = message.match(/column "([^"]+)"/);
        const colName = colMatch ? colMatch[1] : 'غير محدد';
        return c.json({ 
          error: `فشل في ${operationName}: حقل إلزامي مفقود`,
          details: `الحقل المفقود: ${colName}`,
          location: errorLocation
        }, 400);
      }
      if (message.includes('invalid input syntax')) {
        const typeMatch = message.match(/for type (\w+)/);
        const typeName = typeMatch ? typeMatch[1] : '';
        return c.json({ 
          error: `فشل في ${operationName}: صيغة البيانات غير صحيحة`,
          details: typeName ? `النوع المتوقع: ${typeName}` : 'تأكد من القيم المدخلة',
          location: errorLocation
        }, 400);
      }
      if (message.includes('value too long')) {
        const colMatch = message.match(/for type character varying\((\d+)\)/);
        const maxLen = colMatch ? colMatch[1] : 'غير محدد';
        return c.json({ 
          error: `فشل في ${operationName}: النص المدخل أطول من الحد المسموح`,
          details: `الحد الأقصى: ${maxLen} حرف`,
          location: errorLocation
        }, 400);
      }
      if (message.includes('invalid input value for enum')) {
        const enumMatch = message.match(/for enum (\w+)/);
        const enumName = enumMatch ? enumMatch[1] : '';
        return c.json({ 
          error: `فشل في ${operationName}: القيمة المدخلة غير مسموحة`,
          details: enumName ? `النوع: ${enumName}` : 'تأكد من اختيار قيمة صحيحة من القائمة',
          location: errorLocation
        }, 400);
      }
      if (message.includes('Unexpected end of JSON') || message.includes('JSON')) {
        return c.json({ 
          error: `فشل في ${operationName}: صيغة البيانات المرسلة غير صحيحة`,
          details: 'تأكد من أن البيانات بصيغة JSON صالحة',
          location: errorLocation
        }, 400);
      }
      if (message.includes('timeout') || message.includes('ETIMEDOUT')) {
        return c.json({ 
          error: `فشل في ${operationName}: انتهت مهلة الاتصال بقاعدة البيانات`,
          details: 'حاول مرة أخرى بعد قليل',
          location: errorLocation
        }, 504);
      }
      if (message.includes('ECONNREFUSED') || message.includes('connection')) {
        return c.json({ 
          error: `فشل في ${operationName}: تعذر الاتصال بقاعدة البيانات`,
          details: 'تحقق من حالة الخادم وقاعدة البيانات',
          location: errorLocation
        }, 503);
      }
      
      return c.json({ 
        error: `حدث خطأ أثناء ${operationName}`,
        details: message || 'خطأ غير معروف - حاول مرة أخرى',
        location: errorLocation,
        stack: process.env.NODE_ENV === 'development' ? stack : undefined
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
