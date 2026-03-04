import { describe, it, expect, beforeEach } from 'vitest';

// ===================== اختبارات XSS Sanitizer =====================
describe('XSS Sanitizer', () => {
  let sanitizeString: (input: string) => string;
  let sanitizeObject: (obj: any) => any;

  beforeEach(async () => {
    const mod = await import('../middleware/validation.ts');
    sanitizeString = mod.sanitizeString;
    sanitizeObject = mod.sanitizeObject;
  });

  describe('sanitizeString', () => {
    it('يجب أن يُنظف علامات HTML', () => {
      const input = '<script>alert("xss")</script>';
      const result = sanitizeString(input);
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('</script>');
    });

    it('يجب أن يُنظف علامات الاقتباس', () => {
      const input = 'test"value\'other';
      const result = sanitizeString(input);
      expect(result).not.toContain('"');
      expect(result).not.toContain("'");
    });

    it('يجب أن يُنظف & إلى &amp;', () => {
      expect(sanitizeString('a&b')).toContain('&amp;');
    });

    it('يجب أن يتعامل مع النص العادي بدون تغيير جوهري', () => {
      const input = 'مرحبا بالعالم 123';
      const result = sanitizeString(input);
      expect(result).toBe('مرحبا بالعالم 123');
    });

    it('يجب أن يُنظف محاولات event handler', () => {
      const input = 'onload=alert(1)';
      const result = sanitizeString(input);
      // يبقى كما هو لأنه لا يحتوي على HTML tags
      expect(result).toBe('onload=alert(1)');
    });
  });

  describe('sanitizeObject', () => {
    it('يجب أن يُنظف كائن بشكل عميق', () => {
      const input = {
        name: '<script>alert("xss")</script>',
        nested: {
          value: '<img src=x onerror=alert(1)>',
        },
        array: ['<b>bold</b>', 'normal'],
        number: 42,
        bool: true,
      };

      const result = sanitizeObject(input);
      expect(result.name).not.toContain('<script>');
      expect(result.nested.value).not.toContain('<img');
      expect(result.array[0]).not.toContain('<b>');
      expect(result.array[1]).toBe('normal');
      expect(result.number).toBe(42);
      expect(result.bool).toBe(true);
    });

    it('يجب أن يتعامل مع null و undefined', () => {
      expect(sanitizeObject(null)).toBeNull();
      expect(sanitizeObject(undefined)).toBeUndefined();
    });

    it('يجب أن يتعامل مع المصفوفات', () => {
      const input = ['<script>x</script>', 'safe', 123];
      const result = sanitizeObject(input);
      expect(result[0]).not.toContain('<script>');
      expect(result[1]).toBe('safe');
      expect(result[2]).toBe(123);
    });
  });
});

// ===================== اختبارات normalizeBody =====================
describe('normalizeBody (helpers)', () => {
  let normalizeBody: (body: any) => any;

  beforeEach(async () => {
    const mod = await import('../middleware/helpers.ts');
    normalizeBody = mod.normalizeBody;
  });

  it('يجب أن يحافظ على القيم كما هي (لا يحول الأنواع)', () => {
    const result = normalizeBody({ amount: '1000', name: 'test' });
    expect(result.amount).toBe('1000');
    expect(result.name).toBe('test');
  });

  it('يجب أن يحافظ على النصوص كما هي', () => {
    const result = normalizeBody({ active: 'true', deleted: 'false' });
    expect(result.active).toBe('true');
    expect(result.deleted).toBe('false');
  });

  it('يجب أن يحول snake_case إلى camelCase', () => {
    const result = normalizeBody({
      user_name: 'test',
      account_id: 42,
    });
    expect(result.userName).toBe('test');
    expect(result.accountId).toBe(42);
    // يحافظ على الأصلي أيضاً
    expect(result.user_name).toBe('test');
  });

  it('يجب أن يتعامل مع الكائنات المتداخلة', () => {
    const result = normalizeBody({
      outer: {
        inner_value: '42',
        text: 'hello',
      },
    });
    expect(result.outer.innerValue).toBe('42');
    expect(result.outer.text).toBe('hello');
  });

  it('يجب أن يتعامل مع null و undefined', () => {
    expect(normalizeBody(null)).toBeNull();
    expect(normalizeBody(undefined)).toBeUndefined();
  });

  it('يجب أن لا يتعطل مع كائنات عميقة جداً', () => {
    let deep: any = { value: '42' };
    for (let i = 0; i < 25; i++) {
      deep = { nested: deep };
    }
    expect(() => normalizeBody(deep)).not.toThrow();
  });

  it('يجب أن يتعامل مع المصفوفات', () => {
    const result = normalizeBody([{ user_name: 'a' }, { user_name: 'b' }]);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].userName).toBe('a');
    expect(result[1].userName).toBe('b');
  });
});
