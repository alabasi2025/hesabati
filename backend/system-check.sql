-- فحص شامل للنظام

-- 1. الحسابات التحليلية (XXX-YYY-ZZZ)
SELECT '=== الحسابات التحليلية ===' as section;
SELECT 
  account_type,
  ledger_code,
  name,
  CASE 
    WHEN ledger_code ~ '^[A-Z]{3}-[0-9]{2}-[0-9]{3}$' THEN '✓'
    ELSE '✗'
  END as format_ok
FROM accounts
WHERE business_id = 1
  AND account_type IN ('fund', 'bank', 'wallet', 'exchanger', 'supplier')
ORDER BY account_type, ledger_code
LIMIT 15;

-- 2. حسابات التحكم (XXX-YYY)
SELECT '=== حسابات التحكم ===' as section;
SELECT 
  account_type,
  ledger_code,
  name,
  CASE 
    WHEN ledger_code ~ '^[A-Z]{3}-[0-9]{2}$' THEN '✓'
    ELSE '✗'
  END as format_ok
FROM accounts
WHERE business_id = 1
  AND account_type IN ('partner', 'employee', 'warehouse', 'custody', 'budget')
ORDER BY account_type, ledger_code;

-- 3. القائمة الجانبية
SELECT '=== القائمة الجانبية ===' as section;
SELECT 
  ss.name as section_name,
  si.label,
  si.screen_key,
  si.route,
  si.icon,
  si.sort_order
FROM sidebar_items si
JOIN sidebar_sections ss ON ss.id = si.section_id
WHERE ss.business_id = 1
  AND ss.name = '3. الحسابات والأرصدة'
ORDER BY si.sort_order;

-- 4. إحصائيات الحسابات
SELECT '=== إحصائيات ===' as section;
SELECT 
  account_type,
  COUNT(*) as total,
  COUNT(CASE WHEN ledger_code ~ '^[A-Z]{3}-[0-9]{2}-[0-9]{3}$' THEN 1 END) as analytical_format,
  COUNT(CASE WHEN ledger_code ~ '^[A-Z]{3}-[0-9]{2}$' THEN 1 END) as control_format
FROM accounts
WHERE business_id = 1
GROUP BY account_type
ORDER BY account_type;

-- 5. التحقق من أرصدة العملات
SELECT '=== أرصدة العملات ===' as section;
SELECT 
  c.code as currency,
  COUNT(DISTINCT ab.account_id) as accounts_count
FROM account_balances ab
JOIN accounts a ON a.id = ab.account_id
JOIN currencies c ON c.id = ab.currency_id
WHERE a.business_id = 1
GROUP BY c.code
ORDER BY c.code;
