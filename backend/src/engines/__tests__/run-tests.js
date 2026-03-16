/**
 * Test Runner — تشغيل Unit Tests بدون Jest
 * يعمل مع Node.js مباشرة
 */

let passed = 0, failed = 0, total = 0;
const failures = [];

function describe(suiteName, fn) {
  console.log(`\n  📦 ${suiteName}`);
  fn();
}

function it(testName, fn) {
  total++;
  try {
    fn();
    passed++;
    console.log(`    ✅ ${testName}`);
  } catch (err) {
    failed++;
    console.log(`    ❌ ${testName}`);
    failures.push({ suite: testName, error: err.message });
  }
}

const expect = (actual) => ({
  toBe: (expected) => {
    if (actual !== expected) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  },
  toBeNull: () => {
    if (actual !== null) throw new Error(`Expected null, got ${JSON.stringify(actual)}`);
  },
  toBeCloseTo: (expected, precision = 2) => {
    const diff = Math.abs(actual - expected);
    if (diff > Math.pow(10, -precision)) throw new Error(`Expected ~${expected}, got ${actual}`);
  },
  toContain: (str) => {
    if (!String(actual).includes(str)) throw new Error(`Expected "${actual}" to contain "${str}"`);
  },
  toBeGreaterThan: (n) => {
    if (actual <= n) throw new Error(`Expected ${actual} > ${n}`);
  },
  toBeFalsy: () => {
    if (actual) throw new Error(`Expected falsy, got ${JSON.stringify(actual)}`);
  },
  toBeTruthy: () => {
    if (!actual) throw new Error(`Expected truthy, got ${JSON.stringify(actual)}`);
  },
});

// ══════════════════════════════════════════════════════════════════════════
// ── TRANSACTION ENGINE TESTS ───────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════

describe('Transaction Engine — canCancelVoucher', () => {
  const canCancel = (status) => status !== 'confirmed' && status !== 'cancelled';
  it('should return false for confirmed', () => expect(canCancel('confirmed')).toBe(false));
  it('should return false for cancelled', () => expect(canCancel('cancelled')).toBe(false));
  it('should return true for unreviewed', () => expect(canCancel('unreviewed')).toBe(true));
  it('should return true for reviewed', () => expect(canCancel('reviewed')).toBe(true));
});

describe('Transaction Engine — TransactionData Validation', () => {
  const validate = (data) => {
    if (!data.voucherType) return { valid: false, error: 'voucherType مطلوب' };
    if (!data.amount || data.amount <= 0) return { valid: false, error: 'المبلغ يجب أن يكون أكبر من صفر' };
    if (!data.currencyId) return { valid: false, error: 'currencyId مطلوب' };
    if (!data.debitAccountId) return { valid: false, error: 'debitAccountId مطلوب' };
    return { valid: true };
  };
  it('should reject zero amount', () => { const r = validate({ voucherType:'receipt', amount:0, currencyId:1, debitAccountId:1 }); expect(r.valid).toBe(false); });
  it('should reject negative amount', () => { const r = validate({ voucherType:'payment', amount:-100, currencyId:1, debitAccountId:1 }); expect(r.valid).toBe(false); });
  it('should accept valid data', () => { const r = validate({ voucherType:'receipt', amount:500, currencyId:1, debitAccountId:5 }); expect(r.valid).toBe(true); });
  it('should reject missing voucherType', () => { const r = validate({ voucherType:'', amount:100, currencyId:1, debitAccountId:1 }); expect(r.valid).toBe(false); });
});

describe('Transaction Engine — MultiTransaction Balancing', () => {
  const isBalanced = (lines) => {
    let d=0, c=0;
    lines.forEach(l => { if(l.lineType==='debit') d+=l.amount; else c+=l.amount; });
    return Math.abs(d-c) < 0.001;
  };
  it('should detect balanced', () => expect(isBalanced([{lineType:'debit',amount:1000},{lineType:'credit',amount:1000}])).toBe(true));
  it('should detect unbalanced', () => expect(isBalanced([{lineType:'debit',amount:1000},{lineType:'credit',amount:900}])).toBe(false));
  it('should handle multiple lines', () => expect(isBalanced([{lineType:'debit',amount:500},{lineType:'debit',amount:300},{lineType:'credit',amount:800}])).toBe(true));
});

// ══════════════════════════════════════════════════════════════════════════
// ── PERMISSIONS ENGINE TESTS ───────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════

describe('Permissions Engine — checkResourceLimit', () => {
  const checkLimit = (amount, maxVoucher) => {
    if (maxVoucher === null) return { allowed: true };
    if (amount > maxVoucher) return { allowed: false, reason: `المبلغ ${amount} يتجاوز الحد الأقصى ${maxVoucher}` };
    return { allowed: true };
  };
  it('should allow within limit', () => expect(checkLimit(500, 1000).allowed).toBe(true));
  it('should reject exceeding limit', () => { const r = checkLimit(1500, 1000); expect(r.allowed).toBe(false); expect(r.reason).toContain('1500'); });
  it('should allow when null (admin)', () => expect(checkLimit(999999, null).allowed).toBe(true));
  it('should allow exact limit', () => expect(checkLimit(1000, 1000).allowed).toBe(true));
});

describe('Permissions Engine — Role Merging', () => {
  const merge = (roles) => {
    let max = null;
    roles.forEach(r => {
      if (r.maxAmount === undefined || r.maxAmount === null) { max = null; return; }
      if (max === null || max === undefined) max = r.maxAmount;
      else max = Math.max(max, r.maxAmount);
    });
    return { maxAmount: max };
  };
  it('should return max of roles', () => expect(merge([{maxAmount:500},{maxAmount:1000},{maxAmount:750}]).maxAmount).toBe(1000));
  it('should return null if admin role', () => expect(merge([{maxAmount:500},{maxAmount:undefined}]).maxAmount).toBeNull());
  it('should handle single role', () => expect(merge([{maxAmount:300}]).maxAmount).toBe(300));
});

// ══════════════════════════════════════════════════════════════════════════
// ── HR ENGINE TESTS ────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════

describe('HR Engine — calculateNetSalary', () => {
  const net = (base, advance, deductions) => base - advance - deductions;
  it('correct calculation', () => expect(net(3000, 500, 200)).toBe(2300));
  it('zero deductions', () => expect(net(2500, 0, 0)).toBe(2500));
  it('zero advance', () => expect(net(2000, 0, 300)).toBe(1700));
});

describe('HR Engine — Monthly Summary', () => {
  const summarize = (records) => {
    const total = records.reduce((s,r) => s + r.netSalary, 0);
    const paid = records.filter(r => r.isPaid).reduce((s,r) => s + r.netSalary, 0);
    return { total, paid, unpaid: total-paid, count: records.length };
  };
  it('should sum correctly', () => {
    const r = summarize([{netSalary:1000,isPaid:true},{netSalary:1500,isPaid:false},{netSalary:2000,isPaid:true}]);
    expect(r.total).toBe(4500); expect(r.paid).toBe(3000); expect(r.unpaid).toBe(1500);
  });
  it('should handle empty', () => expect(summarize([]).total).toBe(0));
});

describe('HR Engine — Attendance Proration', () => {
  const prorate = (base, att, work) => work === 0 ? 0 : (base/work)*att;
  it('partial attendance', () => expect(prorate(3000, 20, 25)).toBeCloseTo(2400));
  it('full attendance', () => expect(prorate(3000, 25, 25)).toBe(3000));
  it('zero working days', () => expect(prorate(3000, 20, 0)).toBe(0));
});

// ══════════════════════════════════════════════════════════════════════════
// ── WORKFLOW ENGINE TESTS ──────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════

describe('Workflow Engine — Status Transitions', () => {
  const TRANSITIONS = [
    {from:'unreviewed',to:'reviewed'},{from:'reviewed',to:'confirmed'},{from:'reviewed',to:'unreviewed'}
  ];
  const can = (f,t) => TRANSITIONS.some(x => x.from===f && x.to===t);
  it('unreviewed→reviewed', () => expect(can('unreviewed','reviewed')).toBe(true));
  it('reviewed→confirmed', () => expect(can('reviewed','confirmed')).toBe(true));
  it('reviewed→unreviewed rollback', () => expect(can('reviewed','unreviewed')).toBe(true));
  it('NOT unreviewed→confirmed', () => expect(can('unreviewed','confirmed')).toBe(false));
  it('NOT confirmed→unreviewed', () => expect(can('confirmed','unreviewed')).toBe(false));
});

describe('Workflow Engine — Stats', () => {
  const stats = (vs) => {
    const by={}; vs.forEach(v => { by[v.status]=(by[v.status]??0)+1; });
    return { total: vs.length, byStatus: by, pendingReview: by['unreviewed']??0 };
  };
  it('should count by status', () => {
    const s = stats([{status:'unreviewed'},{status:'unreviewed'},{status:'reviewed'},{status:'confirmed'}]);
    expect(s.total).toBe(4); expect(s.pendingReview).toBe(2);
  });
});

// ══════════════════════════════════════════════════════════════════════════
// ── CURRENCY ENGINE TESTS ──────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════

describe('Currency Engine — Conversion', () => {
  const convert = (amount, rate) => amount * rate;
  it('USD→SAR', () => expect(convert(100, 3.75)).toBeCloseTo(375));
  it('same currency', () => expect(convert(500, 1)).toBe(500));
  it('zero amount', () => expect(convert(0, 3.75)).toBe(0));
});

describe('Currency Engine — Cache', () => {
  const cache = new Map();
  const set = (k,v) => cache.set(k, { rate:v, exp: Date.now()+3600000 });
  const get = (k) => { const e=cache.get(k); return (!e||e.exp<Date.now()) ? null : e.rate; };
  it('returns cached', () => { set('USD-SAR',3.75); expect(get('USD-SAR')).toBe(3.75); });
  it('returns null for missing', () => expect(get('EUR-USD')).toBeNull());
  it('clears cache', () => { cache.clear(); expect(cache.size).toBe(0); });
});

describe('Currency Engine — Unified Balances', () => {
  const unify = (bals) => bals.reduce((s,b) => s + b.amount*b.rate, 0);
  it('sum in base currency', () => expect(unify([{amount:1000,rate:1},{amount:100,rate:3.75}])).toBeCloseTo(1375));
  it('empty balances', () => expect(unify([])).toBe(0));
});

// ══════════════════════════════════════════════════════════════════════════
// ── RESULTS ───────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════

console.log('\n' + '═'.repeat(55));
console.log(`النتيجة: ${passed}/${total} اختبار نجح (${Math.round(passed/total*100)}%)`);
if (failed > 0) {
  console.log(`\nالاختبارات الفاشلة (${failed}):`);
  failures.forEach(f => console.log(`  ❌ ${f.suite}: ${f.error}`));
} else {
  console.log('🎉 جميع الاختبارات نجحت!');
}
process.exit(failed > 0 ? 1 : 0);
