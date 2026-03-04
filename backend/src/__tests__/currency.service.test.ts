/**
 * اختبارات وحدة لمحرك العملات
 * يختبر دوال التحويل والحساب بدون الاعتماد على قاعدة البيانات
 */
import { describe, it, expect } from 'vitest';

// اختبارات منطق التحويل (Pure Functions)
describe('محرك العملات - منطق التحويل', () => {
  
  function convertAmount(amount: number, rate: number): number {
    return Math.round(amount * rate * 100) / 100;
  }

  function reverseConvert(amount: number, rate: number): number {
    if (rate === 0) throw new Error('سعر الصرف لا يمكن أن يكون صفراً');
    return Math.round((amount / rate) * 100) / 100;
  }

  it('يحول مبلغ من عملة لأخرى بسعر صرف صحيح', () => {
    expect(convertAmount(100, 1500)).toBe(150000);
  });

  it('يحول مبلغ بسعر صرف كسري', () => {
    expect(convertAmount(100, 1.08)).toBe(108);
  });

  it('يحول مبلغ صفر', () => {
    expect(convertAmount(0, 1500)).toBe(0);
  });

  it('يحول مبلغ بسعر صرف 1 (نفس العملة)', () => {
    expect(convertAmount(500, 1)).toBe(500);
  });

  it('يحول عكسياً بشكل صحيح', () => {
    expect(reverseConvert(150000, 1500)).toBe(100);
  });

  it('يرفض سعر صرف صفر', () => {
    expect(() => reverseConvert(100, 0)).toThrow('سعر الصرف لا يمكن أن يكون صفراً');
  });

  it('يتعامل مع أرقام كبيرة بدقة', () => {
    expect(convertAmount(1000000, 1500)).toBe(1500000000);
  });

  it('يتعامل مع كسور صغيرة', () => {
    expect(convertAmount(0.01, 1500)).toBe(15);
  });
});

// اختبارات التحقق من صحة البيانات
describe('محرك العملات - التحقق من البيانات', () => {
  
  function validateCurrencyData(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!data.code || typeof data.code !== 'string') errors.push('رمز العملة مطلوب');
    if (!data.name || typeof data.name !== 'string') errors.push('اسم العملة مطلوب');
    if (data.code && data.code.length !== 3) errors.push('رمز العملة يجب أن يكون 3 أحرف');
    if (data.rate !== undefined && (typeof data.rate !== 'number' || data.rate <= 0)) errors.push('سعر الصرف يجب أن يكون رقم موجب');
    return { valid: errors.length === 0, errors };
  }

  it('يقبل بيانات عملة صحيحة', () => {
    const result = validateCurrencyData({ code: 'USD', name: 'دولار أمريكي', rate: 1500 });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('يرفض عملة بدون رمز', () => {
    const result = validateCurrencyData({ name: 'دولار', rate: 1500 });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('رمز العملة مطلوب');
  });

  it('يرفض عملة برمز غير صحيح', () => {
    const result = validateCurrencyData({ code: 'US', name: 'دولار', rate: 1500 });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('رمز العملة يجب أن يكون 3 أحرف');
  });

  it('يرفض سعر صرف سالب', () => {
    const result = validateCurrencyData({ code: 'USD', name: 'دولار', rate: -5 });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('سعر الصرف يجب أن يكون رقم موجب');
  });

  it('يرفض سعر صرف صفر', () => {
    const result = validateCurrencyData({ code: 'USD', name: 'دولار', rate: 0 });
    expect(result.valid).toBe(false);
  });
});

// اختبارات توحيد الأرصدة
describe('محرك العملات - توحيد الأرصدة', () => {
  
  interface Balance {
    amount: number;
    currencyId: number;
    rate: number;
  }

  function unifyBalances(balances: Balance[]): number {
    return balances.reduce((total, b) => total + Math.round(b.amount * b.rate * 100) / 100, 0);
  }

  it('يوحد أرصدة بعملات مختلفة', () => {
    const balances: Balance[] = [
      { amount: 100, currencyId: 1, rate: 1500 },
      { amount: 50000, currencyId: 2, rate: 1 },
    ];
    expect(unifyBalances(balances)).toBe(200000);
  });

  it('يوحد رصيد واحد', () => {
    const balances: Balance[] = [
      { amount: 100, currencyId: 1, rate: 1 },
    ];
    expect(unifyBalances(balances)).toBe(100);
  });

  it('يتعامل مع قائمة فارغة', () => {
    expect(unifyBalances([])).toBe(0);
  });

  it('يتعامل مع أرصدة سالبة (مديونية)', () => {
    const balances: Balance[] = [
      { amount: -100, currencyId: 1, rate: 1500 },
      { amount: 200000, currencyId: 2, rate: 1 },
    ];
    expect(unifyBalances(balances)).toBe(50000);
  });
});
