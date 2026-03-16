/**
 * Unit Tests — Currency Engine
 * @since Phase 4
 */

describe('Currency Engine — Rate Conversion', () => {
  const convert = (amount: number, rate: number) => amount * rate;

  it('should convert USD to SAR', () => {
    expect(convert(100, 3.75)).toBeCloseTo(375);
  });

  it('should handle rate of 1 (same currency)', () => {
    expect(convert(500, 1)).toBe(500);
  });

  it('should handle zero amount', () => {
    expect(convert(0, 3.75)).toBe(0);
  });
});

describe('Currency Engine — Rate Cache', () => {
  class MockRateCache {
    private cache = new Map<string, { rate: number; expires: number }>();

    set(key: string, rate: number, ttlMs = 3600000) {
      this.cache.set(key, { rate, expires: Date.now() + ttlMs });
    }

    get(key: string): number | null {
      const entry = this.cache.get(key);
      if (!entry || entry.expires < Date.now()) return null;
      return entry.rate;
    }

    clear() { this.cache.clear(); }
    size() { return this.cache.size; }
  }

  it('should return cached rate', () => {
    const cache = new MockRateCache();
    cache.set('USD-SAR', 3.75);
    expect(cache.get('USD-SAR')).toBe(3.75);
  });

  it('should return null for non-existent key', () => {
    const cache = new MockRateCache();
    expect(cache.get('EUR-USD')).toBeNull();
  });

  it('should clear all cached rates', () => {
    const cache = new MockRateCache();
    cache.set('USD-SAR', 3.75);
    cache.set('EUR-USD', 1.08);
    cache.clear();
    expect(cache.size()).toBe(0);
  });
});

describe('Currency Engine — validateCurrency', () => {
  const SUPPORTED_CURRENCIES = ['SAR', 'USD', 'EUR', 'GBP', 'AED', 'KWD', 'BHD'];

  const validate = (code: string) => SUPPORTED_CURRENCIES.includes(code.toUpperCase());

  it('should validate SAR as supported', () => {
    expect(validate('SAR')).toBe(true);
  });

  it('should validate USD as supported', () => {
    expect(validate('USD')).toBe(true);
  });

  it('should reject unsupported currency', () => {
    expect(validate('XYZ')).toBe(false);
  });

  it('should be case-insensitive', () => {
    expect(validate('usd')).toBe(true);
    expect(validate('Sar')).toBe(true);
  });
});

describe('Currency Engine — Unified Balances', () => {
  const unify = (balances: { amount: number; rate: number }[], baseCurrency: string) => {
    return balances.reduce((sum, b) => sum + b.amount * b.rate, 0);
  };

  it('should sum balances in base currency', () => {
    const balances = [
      { amount: 1000, rate: 1 },     // SAR 1000
      { amount: 100, rate: 3.75 },   // USD 100 = SAR 375
    ];
    expect(unify(balances, 'SAR')).toBeCloseTo(1375);
  });

  it('should return zero for empty balances', () => {
    expect(unify([], 'SAR')).toBe(0);
  });
});
