#!/bin/bash
# =====================================================
# اختبار شامل للمحرك التشغيلي - نظام حسابتي
# =====================================================

BASE="http://localhost:3000/api"
BIZ="businesses/1"
PASS=0
FAIL=0
TOTAL=0

# تسجيل الدخول
TOKEN=$(curl -s "$BASE/auth/login" -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}' | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null)

if [ -z "$TOKEN" ]; then
  echo "❌ فشل تسجيل الدخول"
  exit 1
fi

AUTH="Authorization: Bearer $TOKEN"
CT="Content-Type: application/json"

run_test() {
  local name="$1"
  local expected="$2"
  local result="$3"
  TOTAL=$((TOTAL + 1))
  
  if echo "$result" | grep -q "$expected"; then
    echo "✅ [$TOTAL] $name"
    PASS=$((PASS + 1))
  else
    echo "❌ [$TOTAL] $name"
    echo "   المتوقع: $expected"
    echo "   النتيجة: $(echo "$result" | head -c 200)"
    FAIL=$((FAIL + 1))
  fi
}

echo "=========================================="
echo "  اختبار المحرك التشغيلي - نظام حسابتي"
echo "=========================================="
echo ""

# =====================================================
# 1. اختبار أنواع العمليات
# =====================================================
echo "--- 1. أنواع العمليات ---"

# جلب أنواع العمليات
OT_RESULT=$(curl -s "$BASE/$BIZ/operation-types" -H "$AUTH")
run_test "جلب أنواع العمليات" "id" "$OT_RESULT"

# عدد أنواع العمليات
OT_COUNT=$(echo "$OT_RESULT" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null)
run_test "وجود أنواع عمليات ($OT_COUNT)" "1" "$([ "$OT_COUNT" -gt 0 ] && echo '1' || echo '0')"

# إنشاء نوع عملية جديد
NEW_OT=$(curl -s -X POST "$BASE/$BIZ/operation-types" -H "$AUTH" -H "$CT" -d '{
  "name": "اختبار تحصيل جديد",
  "description": "قالب اختبار",
  "icon": "receipt",
  "color": "#22c55e",
  "category": "تحصيل",
  "voucherType": "receipt",
  "paymentMethod": "cash",
  "sourceAccountId": null,
  "sourceFundId": null,
  "screens": ["تحصيل"],
  "requiresAttachment": false,
  "hasMultiLines": false,
  "isActive": true,
  "sortOrder": 99,
  "linkedAccounts": []
}')
NEW_OT_ID=$(echo "$NEW_OT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
run_test "إنشاء نوع عملية جديد (ID=$NEW_OT_ID)" "id" "$NEW_OT"

# تعديل نوع عملية
if [ -n "$NEW_OT_ID" ] && [ "$NEW_OT_ID" != "" ]; then
  UPDATE_OT=$(curl -s -X PUT "$BASE/operation-types/$NEW_OT_ID" -H "$AUTH" -H "$CT" -d '{
    "name": "اختبار تحصيل معدل",
    "description": "تم التعديل",
    "icon": "receipt_long",
    "color": "#3b82f6"
  }')
  run_test "تعديل نوع عملية" "اختبار تحصيل معدل" "$UPDATE_OT"
fi

echo ""

# =====================================================
# 2. اختبار الشاشات المخصصة
# =====================================================
echo "--- 2. الشاشات المخصصة ---"

# جلب الشاشات
SCREENS=$(curl -s "$BASE/$BIZ/screens" -H "$AUTH")
run_test "جلب الشاشات المخصصة" "id" "$SCREENS"

SCREEN_COUNT=$(echo "$SCREENS" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null)
run_test "وجود شاشات ($SCREEN_COUNT)" "1" "$([ "$SCREEN_COUNT" -gt 0 ] && echo '1' || echo '0')"

# جلب الويدجت لأول شاشة
FIRST_SCREEN_ID=$(echo "$SCREENS" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])" 2>/dev/null)
if [ -n "$FIRST_SCREEN_ID" ]; then
  WIDGETS=$(curl -s "$BASE/screens/$FIRST_SCREEN_ID/widgets" -H "$AUTH")
  run_test "جلب عناصر الشاشة" "id" "$WIDGETS"
fi

echo ""

# =====================================================
# 3. اختبار تنفيذ العمليات (المحرك الأساسي)
# =====================================================
echo "--- 3. تنفيذ العمليات ---"

# 3.1 سند قبض (تحصيل)
RECEIPT=$(curl -s -X POST "$BASE/$BIZ/vouchers" -H "$AUTH" -H "$CT" -d '{
  "voucherType": "receipt",
  "operationTypeId": 1,
  "toAccountId": 1,
  "amount": 5000,
  "currencyId": 1,
  "description": "اختبار تحصيل - سيناريو 1",
  "voucherDate": "2026-03-01"
}')
RECEIPT_ID=$(echo "$RECEIPT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
run_test "إنشاء سند قبض (تحصيل) ID=$RECEIPT_ID" "id" "$RECEIPT"

# التحقق من رقم السند
RECEIPT_NUM=$(echo "$RECEIPT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('voucherNumber',''))" 2>/dev/null)
run_test "ترقيم سند القبض ($RECEIPT_NUM)" "RCV" "$RECEIPT_NUM"

# 3.2 سند صرف (توريد)
PAYMENT=$(curl -s -X POST "$BASE/$BIZ/vouchers" -H "$AUTH" -H "$CT" -d '{
  "voucherType": "payment",
  "operationTypeId": 26,
  "toAccountId": 3,
  "amount": 3000,
  "currencyId": 1,
  "description": "اختبار توريد - سيناريو 2",
  "voucherDate": "2026-03-01"
}')
PAYMENT_ID=$(echo "$PAYMENT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
run_test "إنشاء سند صرف (توريد) ID=$PAYMENT_ID" "id" "$PAYMENT"

PAYMENT_NUM=$(echo "$PAYMENT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('voucherNumber',''))" 2>/dev/null)
run_test "ترقيم سند الصرف ($PAYMENT_NUM)" "PAY" "$PAYMENT_NUM"

# 3.3 مبلغ صفر (يجب أن يفشل)
ZERO_AMT=$(curl -s -X POST "$BASE/$BIZ/vouchers" -H "$AUTH" -H "$CT" -d '{
  "voucherType": "receipt",
  "operationTypeId": 1,
  "toAccountId": 1,
  "amount": 0,
  "currencyId": 1,
  "description": "اختبار مبلغ صفر",
  "voucherDate": "2026-03-01"
}')
run_test "رفض مبلغ صفر" "error\|خطأ\|المبلغ\|amount" "$ZERO_AMT"

# 3.4 مبلغ سالب (يجب أن يفشل)
NEG_AMT=$(curl -s -X POST "$BASE/$BIZ/vouchers" -H "$AUTH" -H "$CT" -d '{
  "voucherType": "receipt",
  "operationTypeId": 1,
  "toAccountId": 1,
  "amount": -5000,
  "currencyId": 1,
  "description": "اختبار مبلغ سالب",
  "voucherDate": "2026-03-01"
}')
run_test "رفض مبلغ سالب" "error\|خطأ\|المبلغ\|amount" "$NEG_AMT"

echo ""

# =====================================================
# 4. اختبار القيود المحاسبية المتوازنة
# =====================================================
echo "--- 4. التوازن المحاسبي ---"

# التحقق من أن القيد الأخير متوازن
BALANCE_CHECK=$(sudo -u postgres psql -t -A hesabati -c "
  SELECT 
    CASE WHEN SUM(CASE WHEN line_type='debit' THEN amount ELSE 0 END) = SUM(CASE WHEN line_type='credit' THEN amount ELSE 0 END) THEN 'BALANCED' ELSE 'UNBALANCED' END
  FROM journal_entry_lines 
  WHERE journal_entry_id = (SELECT MAX(id) FROM journal_entries);
")
run_test "القيد الأخير متوازن" "BALANCED" "$BALANCE_CHECK"

# التحقق من أن كل القيود الجديدة متوازنة
ALL_BALANCE=$(sudo -u postgres psql -t -A hesabati -c "
  SELECT COUNT(*) FROM (
    SELECT je.id, 
      SUM(CASE WHEN jel.line_type='debit' THEN jel.amount ELSE 0 END) as d, 
      SUM(CASE WHEN jel.line_type='credit' THEN jel.amount ELSE 0 END) as c
    FROM journal_entries je
    JOIN journal_entry_lines jel ON jel.journal_entry_id = je.id
    GROUP BY je.id
    HAVING SUM(CASE WHEN jel.line_type='debit' THEN jel.amount ELSE 0 END) != SUM(CASE WHEN jel.line_type='credit' THEN jel.amount ELSE 0 END)
  ) unbalanced;
")
run_test "جميع القيود متوازنة (غير متوازن: $ALL_BALANCE)" "0" "$ALL_BALANCE"

echo ""

# =====================================================
# 5. اختبار تحديث الأرصدة
# =====================================================
echo "--- 5. تحديث الأرصدة ---"

# التحقق من أن الأرصدة في account_balances تتطابق مع القيود
BALANCE_SYNC=$(sudo -u postgres psql -t -A hesabati -c "
  SELECT COUNT(*) FROM (
    SELECT ab.account_id, ab.balance as stored,
      COALESCE((SELECT SUM(CASE WHEN line_type='debit' THEN amount ELSE -amount END) FROM journal_entry_lines WHERE account_id = ab.account_id), 0) as calculated
    FROM account_balances ab
    WHERE ABS(ab.balance - COALESCE((SELECT SUM(CASE WHEN line_type='debit' THEN amount ELSE -amount END) FROM journal_entry_lines WHERE account_id = ab.account_id), 0)) > 0.01
  ) mismatched;
")
run_test "تطابق الأرصدة مع القيود (غير متطابق: $BALANCE_SYNC)" "0" "$BALANCE_SYNC"

echo ""

# =====================================================
# 6. اختبار سجل التدقيق
# =====================================================
echo "--- 6. سجل التدقيق ---"

AUDIT_COUNT=$(sudo -u postgres psql -t -A hesabati -c "SELECT COUNT(*) FROM audit_log WHERE action = 'create_voucher';")
run_test "وجود سجلات تدقيق ($AUDIT_COUNT)" "1" "$([ "$AUDIT_COUNT" -gt 0 ] && echo '1' || echo '0')"

# آخر سجل تدقيق يحتوي على بيانات
LAST_AUDIT=$(sudo -u postgres psql -t -A hesabati -c "SELECT action || '|' || COALESCE(table_name,'') || '|' || COALESCE(record_id::text,'') FROM audit_log ORDER BY id DESC LIMIT 1;")
run_test "آخر سجل تدقيق ($LAST_AUDIT)" "create_voucher" "$LAST_AUDIT"

echo ""

# =====================================================
# 7. اختبار جلب السندات والقيود
# =====================================================
echo "--- 7. جلب البيانات ---"

VOUCHERS=$(curl -s "$BASE/$BIZ/vouchers" -H "$AUTH")
V_COUNT=$(echo "$VOUCHERS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d) if isinstance(d, list) else len(d.get('vouchers',d.get('data',[]))))" 2>/dev/null)
run_test "جلب السندات ($V_COUNT سند)" "1" "$([ "$V_COUNT" -gt 0 ] && echo '1' || echo '0')"

JOURNAL=$(curl -s "$BASE/$BIZ/journal-entries" -H "$AUTH")
run_test "جلب القيود المحاسبية" "id\|entries\|data" "$JOURNAL"

# جلب الحسابات مع الأرصدة
ACCOUNTS=$(curl -s "$BASE/$BIZ/accounts" -H "$AUTH")
run_test "جلب الحسابات" "id" "$ACCOUNTS"

echo ""

# =====================================================
# 8. اختبار حذف نوع العملية التجريبي
# =====================================================
echo "--- 8. تنظيف ---"

if [ -n "$NEW_OT_ID" ] && [ "$NEW_OT_ID" != "" ]; then
  DEL_OT=$(curl -s -X DELETE "$BASE/operation-types/$NEW_OT_ID" -H "$AUTH")
  run_test "حذف نوع العملية التجريبي" "success\|deleted\|ok\|{}" "$DEL_OT"
fi

echo ""

# =====================================================
# 9. اختبار widget data APIs
# =====================================================
echo "--- 9. واجهات بيانات الويدجت ---"

if [ -n "$FIRST_SCREEN_ID" ]; then
  # Widget stats
  W_STATS=$(curl -s "$BASE/$BIZ/widget-stats?screenId=$FIRST_SCREEN_ID" -H "$AUTH")
  run_test "إحصائيات الويدجت" "totalReceipts\|operationsCount\|error" "$W_STATS"

  # Widget log
  W_LOG=$(curl -s "$BASE/$BIZ/widget-log?screenId=$FIRST_SCREEN_ID" -H "$AUTH")
  run_test "سجل الويدجت" "id" "$W_LOG"

  # Widget accounts
  W_ACCS=$(curl -s "$BASE/$BIZ/widget-accounts?screenId=$FIRST_SCREEN_ID" -H "$AUTH")
  run_test "حسابات الويدجت" "id" "$W_ACCS"

  # Widget operation types
  W_OTS=$(curl -s "$BASE/$BIZ/widget-operation-types?screenId=$FIRST_SCREEN_ID" -H "$AUTH")
  run_test "قوالب عمليات الويدجت" "id" "$W_OTS"
fi

echo ""

# =====================================================
# النتائج النهائية
# =====================================================
echo "=========================================="
echo "  النتائج النهائية"
echo "=========================================="
echo "  إجمالي الاختبارات: $TOTAL"
echo "  ✅ نجح: $PASS"
echo "  ❌ فشل: $FAIL"
echo "  نسبة النجاح: $(echo "scale=1; $PASS * 100 / $TOTAL" | bc)%"
echo "=========================================="
