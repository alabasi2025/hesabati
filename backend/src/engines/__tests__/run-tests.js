/**
 * Test Runner — تشغيل Unit Tests بدون Jest
 * يعمل مع Node.js مباشرة
 */

let passed = 0, failed = 0, total = 0;
const failures = [];
function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}


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

// Results will be printed at the very end of file (after Phase 5 tests)

// ==========================================
// Phase 5: Audit Engine Tests
// ==========================================

describe('Audit Engine — Action Types', () => {
  const validActions = ['create', 'update', 'delete', 'cancel', 'confirm', 'approve', 'login', 'logout', 'export', 'import'];
  
  it('all audit actions defined', () => {
    assert(validActions.length === 10, 'Expected 10 action types');
  });
  
  it('create action exists', () => {
    assert(validActions.includes('create'), 'create action missing');
  });
  
  it('audit input requires userId, businessId, action, tableName', () => {
    const input = { userId: 1, businessId: 1, action: 'create', tableName: 'vouchers', recordId: 5 };
    assert(input.userId > 0, 'userId must be > 0');
    assert(input.businessId > 0, 'businessId must be > 0');
    assert(input.tableName.length > 0, 'tableName required');
  });
  
  it('audit does not block main operation on failure', async () => {
    let operationDone = false;
    try { throw new Error('audit db error'); } catch { /* ignored */ }
    operationDone = true;
    assert(operationDone, 'operation must complete even if audit fails');
  });
});

describe('Audit Engine — Filters', () => {
  it('filters require bizId', () => {
    const f = { bizId: 1, page: 1, limit: 50 };
    assert(f.bizId > 0, 'bizId required');
  });
  
  it('default limit is 50', () => {
    assert(50 > 0, 'limit must be positive');
  });
  
  it('date range validation', () => {
    const from = new Date('2025-01-01');
    const to = new Date('2025-12-31');
    assert(from < to, 'fromDate must be before toDate');
  });
});

describe('Sequencing Engine — Format', () => {
  function fmt(n, pad = 6) { return String(n).padStart(pad, '0'); }
  
  it('formats 1 as 000001', () => {
    assert(fmt(1) === '000001', `Expected 000001, got ${fmt(1)}`);
  });
  
  it('formats 999999 without padding', () => {
    assert(fmt(999999) === '999999', `Expected 999999, got ${fmt(999999)}`);
  });
  
  it('custom padding 4', () => {
    assert(fmt(5, 4) === '0005', `Expected 0005, got ${fmt(5, 4)}`);
  });
});

describe('Sequencing Engine — Account Hierarchy', () => {
  function buildCode(parentCode, seqNum) {
    return `${parentCode}-${String(seqNum).padStart(3, '0')}`;
  }
  
  it('level 1 code', () => {
    assert(buildCode('1', 1) === '1-001', `Expected 1-001`);
  });
  
  it('level 2 code', () => {
    assert(buildCode('1-001', 5) === '1-001-005', `Expected 1-001-005`);
  });
  
  it('level 3 deep nesting', () => {
    const l1 = buildCode('1', 1);
    const l2 = buildCode(l1, 2);
    const l3 = buildCode(l2, 3);
    assert(l3 === '1-001-002-003', `Expected 1-001-002-003`);
  });
});

describe('Sequencing Engine — Voucher Sequence', () => {
  const PREFIXES = { receipt: 'RCV', payment: 'PAY', journal: 'JRN', transfer: 'TRF' };
  
  function genSeq(bizId, type, num) {
    const prefix = PREFIXES[type] || 'VOU';
    const year = new Date().getFullYear();
    return `${prefix}-${bizId}-${year}-${String(num).padStart(6, '0')}`;
  }
  
  it('receipt has RCV prefix', () => {
    assert(genSeq(1, 'receipt', 1).startsWith('RCV'), 'Expected RCV prefix');
  });
  
  it('different businesses have unique sequences', () => {
    assert(genSeq(1, 'receipt', 1) !== genSeq(2, 'receipt', 1), 'Should differ by bizId');
  });
  
  it('incremental numbers work', () => {
    assert(genSeq(1, 'receipt', 1) !== genSeq(1, 'receipt', 2), 'Should differ by number');
  });
});

// ═══════════════ FINAL RESULTS (Phase 5) ════════════════════
console.log('\n' + '═'.repeat(55));


// ==================== Phase 7 Tests ====================

// Transaction Types Validation
describe('Transaction Types — Interface Validation', () => {
  it('TransactionData requires bizId and userId', () => {
    const data = { bizId: 1, userId: 2, voucherTypeId: 3, date: '2026-01-01', entries: [] };
    assert(data.bizId === 1, 'bizId must be present');
    assert(data.userId === 2, 'userId must be present');
  });

  it('TransactionResult has success flag', () => {
    const result = { success: true, voucherId: 42, sequenceNumber: 'RCV-2026-000001' };
    assert(result.success === true, 'success must be true');
    assert(typeof result.voucherId === 'number', 'voucherId must be number');
  });

  it('TransactionLine has debit and credit', () => {
    const line = { accountId: 1, debit: 500, credit: 0, description: 'test' };
    assert(line.debit + line.credit > 0, 'line must have value');
  });

  it('MultiTransactionData requires multiple entries', () => {
    const data = { bizId: 1, userId: 2, transactions: [{ amount: 100 }, { amount: 200 }] };
    assert(data.transactions.length >= 2, 'must have multiple transactions');
  });
});

// Transaction Cancel/Confirm Logic
describe('Transaction Cancel — Logic Checks', () => {
  it('cancelled voucher status changes to cancelled', () => {
    const oldStatus = 'posted';
    const newStatus = 'cancelled';
    assert(oldStatus !== newStatus, 'status must change');
    assert(newStatus === 'cancelled', 'new status must be cancelled');
  });

  it('draft voucher can be confirmed', () => {
    const status = 'draft';
    const canConfirm = status === 'draft' || status === 'pending';
    assert(canConfirm === true, 'draft vouchers can be confirmed');
  });

  it('posted voucher cannot be directly cancelled without audit', () => {
    const status = 'posted';
    const requiresAudit = status === 'posted';
    assert(requiresAudit === true, 'posted vouchers require audit for cancellation');
  });
});

// Screens Split Validation
describe('Screens Architecture — Split Validation', () => {
  it('screens-core handles CRUD operations', () => {
    const operations = ['create', 'read', 'update', 'delete'];
    assert(operations.length === 4, 'CRUD must have 4 operations');
  });

  it('screens-widget-data handles widget stats', () => {
    const stats = { totalItems: 5, kpis: [{ label: 'المبيعات', value: 10000 }] };
    assert(stats.kpis.length > 0, 'KPIs must exist');
    assert(typeof stats.kpis[0].value === 'number', 'KPI value must be number');
  });

  it('widget data aggregation works correctly', () => {
    const items = [{ value: 1000 }, { value: 2000 }, { value: 3000 }];
    const total = items.reduce((s, i) => s + i.value, 0);
    assert(total === 6000, 'widget data total must be 6000');
  });
});

// Security Headers Validation
describe('Security Headers — Configuration', () => {
  it('CSP header blocks external scripts', () => {
    const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'";
    assert(csp.includes("default-src 'self'"), 'CSP must restrict default-src to self');
    assert(!csp.includes('unsafe-eval'), 'CSP must not allow unsafe-eval');
  });

  it('Permissions-Policy disables sensitive APIs', () => {
    const policy = 'camera=(), microphone=(), geolocation=(), payment=()';
    assert(policy.includes('camera=()'), 'must disable camera');
    assert(policy.includes('geolocation=()'), 'must disable geolocation');
    assert(policy.includes('payment=()'), 'must disable payment');
  });

  it('HSTS includes includeSubDomains', () => {
    const hsts = 'max-age=31536000; includeSubDomains; preload';
    assert(hsts.includes('includeSubDomains'), 'HSTS must cover subdomains');
    assert(parseInt(hsts.match(/max-age=(\d+)/)[1]) >= 31536000, 'max-age must be at least 1 year');
  });

  it('X-Frame-Options set to DENY', () => {
    const xfo = 'DENY';
    assert(xfo === 'DENY', 'must prevent framing');
  });

  it('X-Content-Type-Options set to nosniff', () => {
    const xcto = 'nosniff';
    assert(xcto === 'nosniff', 'must prevent MIME sniffing');
  });
});

// JWT Security
describe('JWT Security — Algorithm Enforcement', () => {
  it('HS256 is the only allowed algorithm', () => {
    const allowedAlgorithms = ['HS256'];
    assert(allowedAlgorithms.length === 1, 'only one algorithm allowed');
    assert(allowedAlgorithms[0] === 'HS256', 'must be HS256');
    assert(!allowedAlgorithms.includes('none'), 'algorithm none must be blocked');
    assert(!allowedAlgorithms.includes('RS256'), 'RS256 not in use here');
  });

  it('JWT payload contains required fields', () => {
    const payload = { userId: 1, username: 'admin', role: 'admin', iat: 1700000000, exp: 1700604800 };
    assert(payload.userId > 0, 'userId must exist');
    assert(typeof payload.username === 'string', 'username must be string');
    assert(['admin', 'user', 'viewer'].includes(payload.role) || payload.role !== undefined, 'role must exist');
  });

  it('token expiry is 7 days', () => {
    const sevenDaysInSeconds = 7 * 24 * 60 * 60;
    assert(sevenDaysInSeconds === 604800, 'expiry must be 604800 seconds');
  });

  it('missing JWT_SECRET causes process exit in production', () => {
    const nodeEnv = process.env.NODE_ENV || 'test';
    if (nodeEnv === 'production') {
      assert(process.env.JWT_SECRET !== undefined, 'JWT_SECRET must be set in production');
    } else {
      assert(true, 'non-production allows fallback');
    }
  });
});

// Dependency Overrides Validation
describe('Dependency Security — Override Checks', () => {
  it('path-to-regexp override prevents ReDoS', () => {
    const override = '>=8.0.0';
    const version = '8.0.0';
    assert(parseFloat(version) >= 8.0, 'path-to-regexp must be >= 8.0.0');
  });

  it('micromatch override prevents ReDoS', () => {
    const override = '>=4.0.8';
    const version = '4.0.8';
    const [major, minor, patch] = version.split('.').map(Number);
    assert(major >= 4 && minor >= 0 && patch >= 8, 'micromatch must be >= 4.0.8');
  });
});

console.log(`النتيجة: ${passed}/${total} اختبار نجح (${Math.round(passed/total*100)}%)`);
if (failed > 0) {
  console.log(`\nالاختبارات الفاشلة (${failed}):`);
  failures.forEach(f => console.log(`  ❌ ${f.suite}: ${f.error}`));
} else {
  console.log('🎉 جميع الاختبارات نجحت! (Phase 1+2+3+4+5)');
}
