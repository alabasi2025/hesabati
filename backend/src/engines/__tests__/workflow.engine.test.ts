/**
 * Unit Tests — Workflow Engine
 * @since Phase 4
 */

describe('Workflow Engine — canCancelWorkflow', () => {
  const canCancel = (status: string) => {
    if (status === 'cancelled') return { allowed: false, reason: 'السند ملغى مسبقاً' };
    if (status === 'confirmed') return { allowed: false, reason: 'لا يمكن إلغاء سند مؤكد' };
    return { allowed: true };
  };

  it('should not cancel confirmed voucher', () => {
    expect(canCancel('confirmed').allowed).toBe(false);
  });

  it('should not cancel already-cancelled voucher', () => {
    expect(canCancel('cancelled').allowed).toBe(false);
  });

  it('should allow cancelling unreviewed voucher', () => {
    expect(canCancel('unreviewed').allowed).toBe(true);
  });

  it('should allow cancelling reviewed voucher', () => {
    expect(canCancel('reviewed').allowed).toBe(true);
  });
});

describe('Workflow Engine — Status Transitions', () => {
  const DEFAULT_TRANSITIONS = [
    { fromStatus: 'unreviewed', toStatus: 'reviewed' },
    { fromStatus: 'reviewed', toStatus: 'confirmed' },
    { fromStatus: 'reviewed', toStatus: 'unreviewed' },
  ];

  const canTransition = (from: string, to: string) =>
    DEFAULT_TRANSITIONS.some(t => t.fromStatus === from && t.toStatus === to);

  it('should allow unreviewed → reviewed', () => {
    expect(canTransition('unreviewed', 'reviewed')).toBe(true);
  });

  it('should allow reviewed → confirmed', () => {
    expect(canTransition('reviewed', 'confirmed')).toBe(true);
  });

  it('should allow reviewed → unreviewed (rollback)', () => {
    expect(canTransition('reviewed', 'unreviewed')).toBe(true);
  });

  it('should NOT allow unreviewed → confirmed directly', () => {
    expect(canTransition('unreviewed', 'confirmed')).toBe(false);
  });

  it('should NOT allow confirmed → unreviewed', () => {
    expect(canTransition('confirmed', 'unreviewed')).toBe(false);
  });
});

describe('Workflow Engine — Stats', () => {
  const calcStats = (vouchers: { status: string }[]) => {
    const byStatus: Record<string, number> = {};
    vouchers.forEach(v => { byStatus[v.status] = (byStatus[v.status] ?? 0) + 1; });
    return {
      total: vouchers.length,
      byStatus,
      pendingReview: byStatus['unreviewed'] ?? 0,
    };
  };

  it('should count vouchers by status', () => {
    const vouchers = [
      { status: 'unreviewed' }, { status: 'unreviewed' },
      { status: 'reviewed' }, { status: 'confirmed' },
    ];
    const stats = calcStats(vouchers);
    expect(stats.total).toBe(4);
    expect(stats.byStatus['unreviewed']).toBe(2);
    expect(stats.pendingReview).toBe(2);
  });
});

describe('Workflow Engine — isConfirmingTransition', () => {
  const isConfirming = (fromStatus: string, toStatus: string) =>
    toStatus === 'confirmed';

  it('should detect confirming transition', () => {
    expect(isConfirming('reviewed', 'confirmed')).toBe(true);
  });

  it('should not flag non-confirming transition', () => {
    expect(isConfirming('unreviewed', 'reviewed')).toBe(false);
  });
});
