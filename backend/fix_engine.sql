-- =====================================================
-- إصلاح المحرك التشغيلي - نظام حسابتي
-- =====================================================

-- 1. إنشاء Sequences للترقيم الآلي للسندات
CREATE SEQUENCE IF NOT EXISTS voucher_receipt_seq START 1;
CREATE SEQUENCE IF NOT EXISTS voucher_payment_seq START 1;
CREATE SEQUENCE IF NOT EXISTS voucher_transfer_seq START 1;

-- 2. إضافة UNIQUE constraint على account_balances (account_id, currency_id)
-- مطلوب لـ ON CONFLICT في كود تحديث الأرصدة
ALTER TABLE account_balances DROP CONSTRAINT IF EXISTS account_balances_account_currency_unique;
ALTER TABLE account_balances ADD CONSTRAINT account_balances_account_currency_unique UNIQUE (account_id, currency_id);

-- 3. إضافة UNIQUE constraint على fund_balances (fund_id, currency_id)
ALTER TABLE fund_balances DROP CONSTRAINT IF EXISTS fund_balances_fund_currency_unique;
ALTER TABLE fund_balances ADD CONSTRAINT fund_balances_fund_currency_unique UNIQUE (fund_id, currency_id);

-- 4. إنشاء أنواع العمليات (operation_types) لـ business_id = 1
-- تحصيل
INSERT INTO operation_types (business_id, name, description, icon, color, category, voucher_type, payment_method, source_account_id, source_fund_id, screens, sort_order, is_active)
VALUES
  (1, 'تحصيل نقدي - جوالي', 'تحصيل من المشتركين عبر جوالي', 'phone_android', '#10b981', 'تحصيل', 'receipt', 'e_wallet', 1, NULL, '["تحصيل"]', 1, true),
  (1, 'تحصيل نقدي - جيب', 'تحصيل من المشتركين عبر جيب', 'phone_android', '#22c55e', 'تحصيل', 'receipt', 'e_wallet', 4, NULL, '["تحصيل"]', 2, true),
  (1, 'تحصيل نقدي - ون كاش', 'تحصيل من المشتركين عبر ون كاش', 'phone_android', '#14b8a6', 'تحصيل', 'receipt', 'e_wallet', 5, NULL, '["تحصيل"]', 3, true),
  (1, 'تحصيل بنكي - كريمي', 'تحصيل عبر حساب الكريمي', 'account_balance', '#3b82f6', 'تحصيل', 'receipt', 'bank', 6, NULL, '["تحصيل"]', 4, true),
  (1, 'تحصيل حاسب', 'تحصيل عبر خدمة حاسب', 'computer', '#8b5cf6', 'تحصيل', 'receipt', 'cash', 10, NULL, '["تحصيل"]', 5, true),
  (1, 'تحصيل صراف - الحوشبي', 'تحصيل عبر صراف الحوشبي', 'currency_exchange', '#f59e0b', 'تحصيل', 'receipt', 'exchange', 18, NULL, '["تحصيل"]', 6, true),
  (1, 'تحصيل صراف - النجم', 'تحصيل عبر صراف النجم', 'currency_exchange', '#eab308', 'تحصيل', 'receipt', 'exchange', 20, NULL, '["تحصيل"]', 7, true),
  (1, 'تحصيل رسوم اشتراك', 'تحصيل رسوم اشتراك وتأمين', 'person_add', '#f97316', 'تحصيل', 'receipt', 'cash', NULL, 1, '["تحصيل"]', 8, true),
  (1, 'تحصيل صندوق الدعم', 'تحصيل مبلغ الدعم الشهري', 'support', '#06b6d4', 'تحصيل', 'receipt', 'bank', 6, NULL, '["تحصيل"]', 9, true),
  (1, 'تحصيل الدفع المسبق', 'تحصيل فواتير الدفع المسبق', 'credit_card', '#a855f7', 'تحصيل', 'receipt', 'cash', NULL, 1, '["تحصيل"]', 10, true),
-- توريد ومصروفات
  (1, 'توريد للحوشبي', 'توريد مبالغ لصراف الحوشبي', 'upload', '#0891b2', 'توريد', 'payment', 'exchange', 18, NULL, '["توريد"]', 11, true),
  (1, 'توريد للنجم', 'توريد مبالغ لصراف النجم', 'upload', '#0e7490', 'توريد', 'payment', 'exchange', 20, NULL, '["توريد"]', 12, true),
  (1, 'شراء ديزل', 'صرف لشراء ديزل', 'local_gas_station', '#ef4444', 'مصروفات', 'payment', 'cash', NULL, NULL, '["مصروفات"]', 13, true),
  (1, 'صرف رواتب', 'صرف رواتب الموظفين', 'payments', '#f97316', 'مصروفات', 'payment', 'bank', 6, NULL, '["مصروفات"]', 14, true),
  (1, 'صرف إيجارات', 'صرف إيجارات المحطات', 'home', '#a855f7', 'مصروفات', 'payment', 'cash', NULL, NULL, '["مصروفات"]', 15, true),
  (1, 'صرف عائد وزارة الكهرباء', 'دفع عائد وزارة الكهرباء', 'account_balance', '#6366f1', 'مصروفات', 'payment', 'bank', 6, NULL, '["مصروفات"]', 16, true),
  (1, 'صرف نت واتصالات', 'مصروفات نت واتصالات', 'wifi', '#0ea5e9', 'مصروفات', 'payment', 'cash', NULL, NULL, '["مصروفات"]', 17, true),
  (1, 'صرف بترول ومواصلات', 'مصروفات بترول ومواصلات', 'directions_car', '#f43f5e', 'مصروفات', 'payment', 'cash', NULL, NULL, '["مصروفات"]', 18, true),
  (1, 'شراء زيت مولدات', 'صرف لشراء زيت المولدات', 'oil_barrel', '#d946ef', 'مصروفات', 'payment', 'cash', NULL, NULL, '["مصروفات"]', 19, true),
  (1, 'صيانة شبكة ومواد كهربائية', 'مصروفات صيانة الشبكة', 'electrical_services', '#eab308', 'مصروفات', 'payment', 'cash', NULL, NULL, '["مصروفات"]', 20, true),
  (1, 'شراء بطاريات مولدات', 'صرف لشراء بطاريات', 'battery_charging_full', '#22c55e', 'مصروفات', 'payment', 'cash', NULL, NULL, '["مصروفات"]', 21, true),
  (1, 'صيانة مولدات', 'مصروفات صيانة المولدات', 'build', '#fb923c', 'مصروفات', 'payment', 'cash', NULL, NULL, '["مصروفات"]', 22, true),
  (1, 'سلف موظفين', 'صرف سلف للموظفين', 'request_quote', '#f472b6', 'مصروفات', 'payment', 'cash', NULL, NULL, '["مصروفات"]', 23, true),
  (1, 'عهدة مشتريات', 'صرف عهدة مشتريات', 'shopping_cart', '#c084fc', 'مصروفات', 'payment', 'cash', NULL, NULL, '["مصروفات"]', 24, true),
  (1, 'مصروفات شخصية', 'مصروفات شخصية للمالك', 'person', '#6b7280', 'مصروفات', 'payment', 'cash', NULL, NULL, '["مصروفات"]', 25, true),
-- تحويلات
  (1, 'تحويل بين حسابات', 'تحويل مبالغ بين الحسابات', 'sync_alt', '#7c3aed', 'تحويلات', 'transfer', 'cash', NULL, NULL, '["تحويلات"]', 26, true),
  (1, 'تحويل من جوالي للكريمي', 'تحويل من محفظة جوالي لحساب الكريمي', 'swap_horiz', '#2563eb', 'تحويلات', 'transfer', 'e_wallet', 1, NULL, '["تحويلات"]', 27, true),
-- قيود يدوية
  (1, 'قيد يدوي', 'قيد محاسبي يدوي', 'edit_note', '#64748b', 'قيود', 'journal', NULL, NULL, NULL, '["قيود"]', 28, true);

-- 5. إنشاء شاشات مخصصة (screen_templates) لـ business_id = 1
INSERT INTO screen_templates (business_id, name, description, icon, color, layout_config, template_key, is_system, is_active)
VALUES
  (1, 'شاشة التحصيل', 'شاشة التحصيل اليومي من المحطات', 'receipt', '#10b981', '{}', 'collection', true, true),
  (1, 'شاشة التوريد', 'شاشة التوريد للصرافين والبنوك', 'upload', '#3b82f6', '{}', 'delivery', true, true),
  (1, 'شاشة المراقبة', 'مراقبة الأرصدة والحركات', 'monitoring', '#f59e0b', '{}', 'monitoring', true, true),
  (1, 'شاشة المصروفات', 'إدارة المصروفات اليومية', 'payments', '#ef4444', '{}', 'blank', false, true);

-- 6. إنشاء ويدجتس للشاشات
-- شاشة التحصيل
INSERT INTO screen_widgets (screen_id, widget_type, title, config, position_x, position_y, width, height, sort_order)
SELECT st.id, 'templates', 'قوالب التحصيل', '{}', 0, 0, 6, 4, 1
FROM screen_templates st WHERE st.name = 'شاشة التحصيل' AND st.business_id = 1;

INSERT INTO screen_widgets (screen_id, widget_type, title, config, position_x, position_y, width, height, sort_order)
SELECT st.id, 'log', 'سجل العمليات', '{}', 6, 0, 6, 4, 2
FROM screen_templates st WHERE st.name = 'شاشة التحصيل' AND st.business_id = 1;

INSERT INTO screen_widgets (screen_id, widget_type, title, config, position_x, position_y, width, height, sort_order)
SELECT st.id, 'accounts', 'مراقبة الأرصدة', '{}', 0, 4, 6, 3, 3
FROM screen_templates st WHERE st.name = 'شاشة التحصيل' AND st.business_id = 1;

INSERT INTO screen_widgets (screen_id, widget_type, title, config, position_x, position_y, width, height, sort_order)
SELECT st.id, 'stats', 'إحصائيات', '{}', 6, 4, 6, 3, 4
FROM screen_templates st WHERE st.name = 'شاشة التحصيل' AND st.business_id = 1;

-- شاشة المراقبة
INSERT INTO screen_widgets (screen_id, widget_type, title, config, position_x, position_y, width, height, sort_order)
SELECT st.id, 'accounts', 'أرصدة الحسابات', '{}', 0, 0, 12, 4, 1
FROM screen_templates st WHERE st.name = 'شاشة المراقبة' AND st.business_id = 1;

INSERT INTO screen_widgets (screen_id, widget_type, title, config, position_x, position_y, width, height, sort_order)
SELECT st.id, 'stats', 'إحصائيات عامة', '{}', 0, 4, 6, 3, 2
FROM screen_templates st WHERE st.name = 'شاشة المراقبة' AND st.business_id = 1;

INSERT INTO screen_widgets (screen_id, widget_type, title, config, position_x, position_y, width, height, sort_order)
SELECT st.id, 'log', 'آخر العمليات', '{}', 6, 4, 6, 3, 3
FROM screen_templates st WHERE st.name = 'شاشة المراقبة' AND st.business_id = 1;

-- شاشة المصروفات
INSERT INTO screen_widgets (screen_id, widget_type, title, config, position_x, position_y, width, height, sort_order)
SELECT st.id, 'templates', 'قوالب المصروفات', '{}', 0, 0, 6, 4, 1
FROM screen_templates st WHERE st.name = 'شاشة المصروفات' AND st.business_id = 1;

INSERT INTO screen_widgets (screen_id, widget_type, title, config, position_x, position_y, width, height, sort_order)
SELECT st.id, 'log', 'سجل المصروفات', '{}', 6, 0, 6, 4, 2
FROM screen_templates st WHERE st.name = 'شاشة المصروفات' AND st.business_id = 1;
