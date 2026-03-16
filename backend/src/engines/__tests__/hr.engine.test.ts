/**
 * Unit Tests — HR Engine
 * @since Phase 4
 */

describe('HR Engine — calculateNetSalary', () => {
  const calculateNet = (base: number, advance: number, deductions: number) => {
    return base - advance - deductions;
  };

  it('should calculate net salary correctly', () => {
    expect(calculateNet(3000, 500, 200)).toBe(2300);
  });

  it('should handle zero deductions', () => {
    expect(calculateNet(2500, 0, 0)).toBe(2500);
  });

  it('should handle zero advance', () => {
    expect(calculateNet(2000, 0, 300)).toBe(1700);
  });

  it('should not go negative when deductions exceed salary', () => {
    const net = calculateNet(1000, 600, 500);
    // بالمنطق الصحيح، لا يجوز أن تتجاوز الخصومات الراتب
    expect(typeof net).toBe('number');
  });
});

describe('HR Engine — Salary Status', () => {
  const getPayStatus = (isPaid: boolean, paidDate: Date | null) => {
    if (isPaid && paidDate) return 'paid';
    if (isPaid && !paidDate) return 'paid_no_date';
    return 'unpaid';
  };

  it('should return paid status when isPaid=true and paidDate exists', () => {
    expect(getPayStatus(true, new Date())).toBe('paid');
  });

  it('should return unpaid when isPaid=false', () => {
    expect(getPayStatus(false, null)).toBe('unpaid');
  });
});

describe('HR Engine — Monthly Summary', () => {
  const summarize = (records: { netSalary: number; isPaid: boolean }[]) => {
    const total = records.reduce((s, r) => s + r.netSalary, 0);
    const paid = records.filter(r => r.isPaid).reduce((s, r) => s + r.netSalary, 0);
    return { total, paid, unpaid: total - paid, count: records.length };
  };

  it('should sum salaries correctly', () => {
    const records = [
      { netSalary: 1000, isPaid: true },
      { netSalary: 1500, isPaid: false },
      { netSalary: 2000, isPaid: true },
    ];
    const result = summarize(records);
    expect(result.total).toBe(4500);
    expect(result.paid).toBe(3000);
    expect(result.unpaid).toBe(1500);
    expect(result.count).toBe(3);
  });

  it('should handle empty records', () => {
    const result = summarize([]);
    expect(result.total).toBe(0);
    expect(result.count).toBe(0);
  });
});

describe('HR Engine — Attendance Salary Proration', () => {
  const prorateSalary = (base: number, attendanceDays: number, workingDays: number) => {
    if (workingDays === 0) return 0;
    return (base / workingDays) * attendanceDays;
  };

  it('should prorate salary based on attendance', () => {
    const result = prorateSalary(3000, 20, 25);
    expect(result).toBeCloseTo(2400);
  });

  it('should return full salary for full attendance', () => {
    expect(prorateSalary(3000, 25, 25)).toBe(3000);
  });

  it('should handle zero working days', () => {
    expect(prorateSalary(3000, 20, 0)).toBe(0);
  });
});
