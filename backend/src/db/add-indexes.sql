-- ===================== إصلاح #13: إضافة فهارس لتحسين الأداء =====================

-- فهارس على business_id (الأكثر استخداماً في الفلترة)
CREATE INDEX IF NOT EXISTS idx_stations_business_id ON stations(business_id);
CREATE INDEX IF NOT EXISTS idx_employees_business_id ON employees(business_id);
CREATE INDEX IF NOT EXISTS idx_accounts_business_id ON accounts(business_id);
CREATE INDEX IF NOT EXISTS idx_funds_business_id ON funds(business_id);
CREATE INDEX IF NOT EXISTS idx_vouchers_business_id ON vouchers(business_id);
CREATE INDEX IF NOT EXISTS idx_suppliers_business_id ON suppliers(business_id);
CREATE INDEX IF NOT EXISTS idx_pending_accounts_business_id ON pending_accounts(business_id);
CREATE INDEX IF NOT EXISTS idx_warehouses_business_id ON warehouses(business_id);
CREATE INDEX IF NOT EXISTS idx_daily_collections_business_id ON daily_collections(business_id);
CREATE INDEX IF NOT EXISTS idx_operation_types_business_id ON operation_types(business_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_business_id ON journal_entries(business_id);
CREATE INDEX IF NOT EXISTS idx_voucher_categories_business_id ON voucher_categories(business_id);
CREATE INDEX IF NOT EXISTS idx_business_partners_business_id ON business_partners(business_id);

-- فهارس على الحقول المستخدمة في JOIN
CREATE INDEX IF NOT EXISTS idx_employees_station_id ON employees(station_id);
CREATE INDEX IF NOT EXISTS idx_funds_station_id ON funds(station_id);
CREATE INDEX IF NOT EXISTS idx_account_balances_account_id ON account_balances(account_id);
CREATE INDEX IF NOT EXISTS idx_account_balances_currency_id ON account_balances(currency_id);
CREATE INDEX IF NOT EXISTS idx_fund_balances_fund_id ON fund_balances(fund_id);
CREATE INDEX IF NOT EXISTS idx_fund_balances_currency_id ON fund_balances(currency_id);
CREATE INDEX IF NOT EXISTS idx_account_allowed_links_from ON account_allowed_links(from_account_id);
CREATE INDEX IF NOT EXISTS idx_account_allowed_links_to ON account_allowed_links(to_account_id);
CREATE INDEX IF NOT EXISTS idx_operation_type_accounts_ot_id ON operation_type_accounts(operation_type_id);
CREATE INDEX IF NOT EXISTS idx_journal_entry_lines_entry_id ON journal_entry_lines(journal_entry_id);
CREATE INDEX IF NOT EXISTS idx_collection_details_collection_id ON collection_details(collection_id);
CREATE INDEX IF NOT EXISTS idx_delivery_records_collection_id ON delivery_records(collection_id);

-- فهارس على الحقول المستخدمة في الفلترة
CREATE INDEX IF NOT EXISTS idx_vouchers_type ON vouchers(voucher_type);
CREATE INDEX IF NOT EXISTS idx_vouchers_date ON vouchers(voucher_date DESC);
CREATE INDEX IF NOT EXISTS idx_vouchers_status ON vouchers(status);
CREATE INDEX IF NOT EXISTS idx_accounts_type ON accounts(account_type);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);
CREATE INDEX IF NOT EXISTS idx_funds_type ON funds(fund_type);
CREATE INDEX IF NOT EXISTS idx_daily_collections_station_date ON daily_collections(station_id, collection_date);

-- فهارس مركبة للاستعلامات الشائعة
CREATE INDEX IF NOT EXISTS idx_vouchers_biz_type ON vouchers(business_id, voucher_type);
CREATE INDEX IF NOT EXISTS idx_accounts_biz_type ON accounts(business_id, account_type);
CREATE INDEX IF NOT EXISTS idx_account_balances_acc_curr ON account_balances(account_id, currency_id);
CREATE INDEX IF NOT EXISTS idx_fund_balances_fund_curr ON fund_balances(fund_id, currency_id);

-- فهارس على sidebar
CREATE INDEX IF NOT EXISTS idx_sidebar_sections_business_id ON sidebar_sections(business_id);
CREATE INDEX IF NOT EXISTS idx_sidebar_items_section_id ON sidebar_items(section_id);
CREATE INDEX IF NOT EXISTS idx_user_sidebar_config_user_biz ON user_sidebar_config(user_id, business_id);

-- فهارس على أنواع الحسابات الفرعية
CREATE INDEX IF NOT EXISTS idx_fund_types_business_id ON fund_types(business_id);
CREATE INDEX IF NOT EXISTS idx_bank_types_business_id ON bank_types(business_id);
CREATE INDEX IF NOT EXISTS idx_exchange_types_business_id ON exchange_types(business_id);
CREATE INDEX IF NOT EXISTS idx_e_wallet_types_business_id ON e_wallet_types(business_id);
CREATE INDEX IF NOT EXISTS idx_billing_systems_config_business_id ON billing_systems_config(business_id);
CREATE INDEX IF NOT EXISTS idx_billing_account_types_business_id ON billing_account_types(business_id);

-- فهرس على employee_billing_accounts
CREATE INDEX IF NOT EXISTS idx_emp_billing_accounts_employee_id ON employee_billing_accounts(employee_id);
CREATE INDEX IF NOT EXISTS idx_emp_billing_accounts_station_id ON employee_billing_accounts(station_id);
