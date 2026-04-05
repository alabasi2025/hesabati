-- فحص رموز الحسابات التحليلية (XXX-YYY-ZZZ)
SELECT 
  account_type,
  ledger_code,
  name,
  CASE 
    WHEN LENGTH(ledger_code) - LENGTH(REPLACE(ledger_code, '-', '')) = 2 THEN '✓ تحليلي'
    WHEN LENGTH(ledger_code) - LENGTH(REPLACE(ledger_code, '-', '')) = 1 THEN '✓ تحكم'
    ELSE '✗ خطأ'
  END as نوع_الحساب
FROM accounts
WHERE business_id = 1
  AND account_type IN ('fund', 'bank', 'wallet', 'exchanger', 'supplier')
ORDER BY account_type, ledger_code
LIMIT 20;

-- فحص حسابات التحكم (XXX-YYY)
SELECT 
  account_type,
  ledger_code,
  name,
  CASE 
    WHEN LENGTH(ledger_code) - LENGTH(REPLACE(ledger_code, '-', '')) = 1 THEN '✓ تحكم'
    ELSE '✗ خطأ'
  END as نوع_الحساب
FROM accounts
WHERE business_id = 1
  AND account_type IN ('partner', 'employee', 'warehouse', 'custody', 'budget')
ORDER BY account_type, ledger_code;

-- إحصائيات
SELECT 
  account_type,
  COUNT(*) as عدد_الحسابات,
  COUNT(CASE WHEN LENGTH(ledger_code) - LENGTH(REPLACE(ledger_code, '-', '')) = 2 THEN 1 END) as تحليلية,
  COUNT(CASE WHEN LENGTH(ledger_code) - LENGTH(REPLACE(ledger_code, '-', '')) = 1 THEN 1 END) as تحكم
FROM accounts
WHERE business_id = 1
GROUP BY account_type
ORDER BY account_type;
