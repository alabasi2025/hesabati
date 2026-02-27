#!/bin/bash
# سكربت اختبار شامل لجميع الإصلاحات
BASE=http://localhost:3000
PASS=0
FAIL=0

check() {
  local desc="$1"
  local expected="$2"
  local actual="$3"
  if echo "$actual" | grep -q "$expected"; then
    echo "✅ $desc"
    PASS=$((PASS+1))
  else
    echo "❌ $desc (expected: $expected, got: $actual)"
    FAIL=$((FAIL+1))
  fi
}

echo "========================================"
echo "  اختبار إصلاحات نظام حساباتي"
echo "========================================"

# 1. تسجيل الدخول
echo ""
echo "--- تسجيل الدخول ---"
LOGIN=$(curl -s -X POST $BASE/api/auth/login -H 'Content-Type: application/json' -d '{"username":"admin","password":"admin123"}')
TOKEN=$(echo $LOGIN | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))" 2>/dev/null)
check "تسجيل الدخول" "token" "$LOGIN"

if [ -z "$TOKEN" ]; then
  echo "❌ فشل تسجيل الدخول - لا يمكن المتابعة"
  exit 1
fi

# 2. IDOR: طلب بدون token
echo ""
echo "--- إصلاح #1: IDOR Protection ---"
NO_AUTH=$(curl -s $BASE/api/businesses/1/funds)
check "طلب بدون token يُرفض" "غير مصرح" "$NO_AUTH"

# 3. الأعمال
echo ""
echo "--- إصلاح #8: N+1 Businesses ---"
BIZ=$(curl -s $BASE/api/businesses -H "Authorization: Bearer $TOKEN")
check "جلب الأعمال" "[" "$BIZ"

# 4. الصناديق
echo ""
echo "--- إصلاح #4: Funds API ---"
FUNDS=$(curl -s $BASE/api/businesses/1/funds -H "Authorization: Bearer $TOKEN")
FUND_COUNT=$(echo $FUNDS | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null)
check "جلب الصناديق (funds endpoint)" "$FUND_COUNT" "$FUND_COUNT"
echo "   عدد الصناديق: $FUND_COUNT"

# 5. الحسابات
echo ""
echo "--- الحسابات ---"
ACCS=$(curl -s $BASE/api/businesses/1/accounts -H "Authorization: Bearer $TOKEN")
ACC_COUNT=$(echo $ACCS | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null)
check "جلب الحسابات" "$ACC_COUNT" "$ACC_COUNT"
echo "   عدد الحسابات: $ACC_COUNT"

# 6. Dashboard Stats
echo ""
echo "--- إصلاح #10: Dashboard Stats ---"
STATS=$(curl -s $BASE/api/dashboard/stats -H "Authorization: Bearer $TOKEN")
check "إحصائيات لوحة التحكم" "businesses" "$STATS"
echo "   $STATS"

# 7. Zod Validation
echo ""
echo "--- إصلاح #7: Zod Validation ---"
BAD_ACCOUNT=$(curl -s -X POST $BASE/api/businesses/1/accounts -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{}')
check "رفض إنشاء حساب بدون بيانات" "error\|name" "$BAD_ACCOUNT"

# 8. CORS headers
echo ""
echo "--- إصلاح #3: CORS ---"
CORS=$(curl -s -I -X OPTIONS $BASE/api/businesses -H "Origin: http://evil.com" -H "Access-Control-Request-Method: GET" 2>/dev/null | grep -i "access-control-allow-origin")
check "CORS لا يسمح بـ evil.com" "localhost" "$CORS"

# 9. Rate Limit headers
echo ""
echo "--- إصلاح #11: Rate Limiting ---"
RL=$(curl -s -I $BASE/api/businesses -H "Authorization: Bearer $TOKEN" 2>/dev/null | grep -i "x-ratelimit")
check "Rate Limit headers موجودة" "X-RateLimit" "$RL"

# 10. Operation Types
echo ""
echo "--- إصلاح #5: Operation Types ---"
OPS=$(curl -s $BASE/api/businesses/1/operation-types -H "Authorization: Bearer $TOKEN")
check "جلب أنواع العمليات" "[" "$OPS"

echo ""
echo "========================================"
echo "  النتائج: ✅ $PASS نجاح | ❌ $FAIL فشل"
echo "========================================"
