-- فحص البيانات الموجودة في قاعدة البيانات

-- 1. عدد الحسابات حسب نوع الرمز
SELECT 
  'حسابات تحكم (XXX-YYY)' as نوع,
  COUNT(*) as العدد
FROM accounts
WHERE business_id = 1
  AND ledger_code IS NOT NULL
  AND ledger_code ~ '^[A-Z]{3,4}-[0-9]{2}$'

UNION ALL

SELECT 
  'حسابات تحليلية (XXX-YYY-ZZZ)' as نوع,
  COUNT(*) as العدد
FROM accounts
WHERE business_id = 1
  AND ledger_code IS NOT NULL
  AND ledger_code ~ '^[A-Z]{3,4}-[0-9]{2}-[0-9]{3}$';

-- 2. عينة من الحسابات
SELECT 
  account_type,
  ledger_code,
  name,
  LENGTH(ledger_code) - LENGTH(REPLACE(ledger_code, '-', '')) as dash_count
FROM accounts
WHERE business_id = 1
  AND ledger_code IS NOT NULL
  AND account_type IN ('fund', 'bank', 'wallet', 'exchanger', 'partner', 'employee')
ORDER BY account_type, ledger_code
LIMIT 20;
