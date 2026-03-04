# مرجع الجداول والأعمدة (مستخرج من السكما core.ts)

المصدر: `backend/src/db/schema/core.ts` — أسماء الجداول والأعمدة كما في PostgreSQL.

---

## الجداول والأعمدة بالترتيب

| # | الجدول | الأعمدة |
|---|--------|---------|
| 1 | **users** | id, username, password, full_name, role, is_active, created_at, updated_at |
| 2 | **currencies** | id, code, name_ar, symbol, exchange_rate, is_default, created_at |
| 3 | **exchange_rates** | id, business_id, from_currency_id, to_currency_id, rate, effective_date, source, notes, created_by, created_at |
| 4 | **roles** | id, business_id, name, description, color, max_voucher_amount, max_daily_amount, is_system, is_active, created_at, updated_at |
| 5 | **role_permissions** | id, role_id, resource, action, constraints, created_at |
| 6 | **user_roles** | id, user_id, role_id, business_id, assigned_by, created_at |
| 7 | **businesses** | id, name, code, type, description, icon, color, sort_order, is_active, notes, created_at, updated_at |
| 8 | **business_partners** | id, business_id, full_name, share_percentage, phone, role, notes, is_active, created_at |
| 9 | **stations** | id, business_id, name, code, location, manager_id, billing_systems, has_employees, is_active, notes, created_at, updated_at |
| 10 | **employees** | id, business_id, full_name, job_title, station_id, department, salary, salary_currency, phone, status, hire_date, monthly_allowance, is_manager, notes, created_at, updated_at |
| 11 | **accounts** | id, business_id, name, account_type, account_number, provider, sub_type, sequence_number, code, responsible_person, parent_account_id, supported_currencies, can_initiate_receipt, can_initiate_payment, can_receive_payment, can_be_debited_by_receipt, can_create_voucher, can_approve_voucher, receives_from_stations, is_active, notes, created_at, updated_at |
| 12 | **account_allowed_links** | id, from_account_id, to_account_id, link_type, is_active, notes, created_at |
| 13 | **account_balances** | id, account_id, currency_id, balance, updated_at |
| 14 | **employee_billing_accounts** | id, employee_id, station_id, billing_system, collection_method, label, sort_order, is_active, notes, created_at |
| 15 | **billing_systems_config** | id, business_id, name, icon, color, station_mode, station_ids, supported_method_ids, sort_order, is_active, notes, created_at, updated_at |
| 16 | **billing_account_types** | id, business_id, name, description, icon, sort_order, is_active, created_at |
| 17 | **funds** | id, business_id, name, fund_type, sub_type, sequence_number, code, station_id, responsible_person, description, is_active, notes, created_at, updated_at |
| 18 | **fund_balances** | id, fund_id, currency_id, balance, updated_at |
| 19 | **suppliers** | id, business_id, name, category, phone, address, contact_person, notes, is_active, created_at, updated_at |
| 20 | **supplier_balances** | id, supplier_id, currency_id, balance, updated_at |
| 21 | **voucher_categories** | id, business_id, name, type, parent_id, icon, color, is_active, created_at |
| 22 | **vouchers** | id, business_id, voucher_number, voucher_type, status, amount, currency_id, exchange_rate, from_account_id, to_account_id, from_fund_id, to_fund_id, station_id, employee_id, supplier_id, category_id, operation_type_id, description, reference, voucher_date, account_sequence, template_sequence, created_by, approved_by, reversal_status, reversed_voucher_id, reversal_reason, reversed_at, reversed_by, created_at, updated_at |
| 23 | **attachments** | id, entity_type, entity_id, file_name, file_path, file_type, file_size, description, uploaded_by, created_at |
| 24 | **daily_collections** | id, business_id, station_id, collection_date, currency_id, total_amount, is_fully_delivered, notes, created_by, created_at, updated_at |
| 25 | **collection_details** | id, collection_id, employee_id, billing_account_id, amount, notes, created_at |
| 26 | **delivery_records** | id, collection_id, employee_id, to_account_id, amount, currency_id, delivery_date, reference, notes, created_by, created_at |
| 27 | **expense_budget** | id, business_id, name, station_id, amount, currency_id, expense_type, month, year, notes, created_at |
| 28 | **salary_records** | id, business_id, employee_id, month, year, base_salary, advance, advance_date, advance_paid_via, deductions, deduction_notes, net_salary, currency_id, is_paid, paid_date, paid_via, attendance_days, notes, created_at |
| 29 | **warehouses** | id, business_id, name, warehouse_type, sub_type, sequence_number, code, station_id, responsible_person, location, is_active, notes, created_at, updated_at |
| 30 | **inventory_items** | id, business_id, name, code, category, unit, min_quantity, notes, is_active, created_at |
| 31 | **inventory_stock** | id, item_id, warehouse_id, quantity, avg_cost, costing_method, cost_layers, currency_id, updated_at |
| 32 | **inventory_movements** | id, business_id, item_id, warehouse_id, movement_type, quantity, unit_cost, currency_id, to_warehouse_id, supplier_id, station_id, reference, description, movement_date, created_by, created_at |
| 33 | **reconciliations** | id, business_id, title, reconciliation_type, status, with_person, account_id, fund_id, station_id, employee_id, supplier_id, period_start, period_end, expected_amount, actual_amount, difference, currency_id, notes, created_by, created_at, updated_at |
| 34 | **pending_accounts** | id, business_id, person_or_entity, description, status, estimated_amount, currency_id, notes, created_at, updated_at |
| 35 | **billing_periods** | id, business_id, name, station_id, billing_system, start_date, end_date, total_billed, total_collected, total_remaining, currency_id, is_closed, closed_date, notes, created_at |
| 36 | **diesel_consumption** | id, business_id, station_id, quantity, unit, consumption_date, billing_period_id, meter_reading, notes, created_by, created_at |
| 37 | **audit_log** | id, user_id, business_id, action, table_name, record_id, old_data, new_data, ip_address, created_at |
| 38 | **expense_categories** | id, business_id, name, description, icon, color, sort_order, is_active, created_at, updated_at |
| 39 | **operation_types** | id, business_id, name, description, icon, color, category, sequence_number, code, voucher_type, payment_method, source_account_id, source_fund_id, source_warehouse_id, screens, requires_attachment, has_multi_lines, workflow_config, sort_order, is_active, notes, created_at, updated_at |
| 40 | **operation_type_accounts** | id, operation_type_id, account_id, employee_billing_account_id, label, permission, sort_order, is_active, notes, created_at |
| 41 | **journal_entries** | id, business_id, entry_number, description, entry_date, reference, operation_type_id, category, category_sequence, template_sequence, created_by, is_balanced, total_debit, total_credit, status, created_at, updated_at |
| 42 | **journal_entry_lines** | id, journal_entry_id, account_id, line_type, amount, description, sort_order, created_at |
| 43 | **sidebar_sections** | id, business_id, name, icon, sort_order, is_active, created_at, updated_at |
| 44 | **sidebar_items** | id, section_id, screen_key, label, icon, route, sort_order, is_active, badge, badge_color, created_at |
| 45 | **user_sidebar_config** | id, user_id, business_id, sidebar_item_id, is_visible, custom_sort_order, custom_section_name, permission, created_at, updated_at |
| 46 | **fund_types** | id, business_id, name, sub_type_key, description, icon, color, sort_order, is_active, created_at, updated_at |
| 47 | **bank_types** | id, business_id, name, sub_type_key, description, icon, color, sort_order, is_active, created_at, updated_at |
| 48 | **exchange_types** | id, business_id, name, sub_type_key, description, icon, color, sort_order, is_active, created_at, updated_at |
| 49 | **e_wallet_types** | id, business_id, name, sub_type_key, description, icon, color, sort_order, is_active, created_at, updated_at |
| 50 | **screen_templates** | id, business_id, name, description, icon, color, layout_config, template_key, is_system, is_active, created_by, created_at, updated_at |
| 51 | **screen_widgets** | id, screen_id, widget_type, title, config, position_x, position_y, width, height, sort_order, is_visible, created_at, updated_at |
| 52 | **screen_widget_templates** | id, widget_id, operation_type_id, sort_order, created_at |
| 53 | **screen_widget_accounts** | id, widget_id, account_id, sort_order, created_at |
| 54 | **screen_widget_warehouses** | id, widget_id, warehouse_id, sort_order, created_at |
| 55 | **screen_permissions** | id, screen_id, user_id, permission, sort_order, created_at, updated_at |
| 56 | **custom_screen_config** | id, screen_id, tab1_label, tab1_icon, tab1_color, tab1_operation_type_ids, tab2_label, tab2_icon, tab2_color, tab2_operation_type_ids, history_label, history_icon, history_color, accounts_section_label, accounts_icon, accounts_color, account_ids, created_at, updated_at |
| 57 | **sequence_counters** | id, business_id, counter_type, entity_id, year, last_number, prefix, created_at, updated_at |
| 58 | **warehouse_types** | id, business_id, name, sub_type_key, description, icon, color, sort_order, is_active, created_at, updated_at |
| 59 | **journal_entry_categories** | id, business_id, name, category_key, description, icon, color, sort_order, is_active, created_at, updated_at |
| 60 | **warehouse_operations** | id, business_id, operation_number, operation_type, operation_type_id, source_warehouse_id, destination_warehouse_id, related_operation_id, related_voucher_id, supplier_id, total_cost, total_items, currency_id, operation_date, description, reference, status, warehouse_sequence, template_sequence, created_by, created_at, updated_at |
| 61 | **warehouse_operation_items** | id, operation_id, item_name, item_code, quantity, unit_cost, total_cost, unit, currency_id, notes, sort_order, created_at |
| 62 | **analytics_snapshots** | id, business_id, report_key, filters_hash, data, generated_at, expires_at, created_by |
| 63 | **workflow_transitions** | id, business_id, operation_type_id, from_status, to_status, action_name, action_icon, action_color, required_role, requires_note, auto_execute, sort_order, is_active, created_at |
| 64 | **workflow_history** | id, business_id, voucher_id, transition_id, from_status, to_status, action_name, note, executed_by, executed_at |
| 65 | **ui_data_sources** | id, business_id, name, source_type, table_name, query_template, filters, sorting, config, is_active, created_at, updated_at |
| 65 | **ui_pages** | id, business_id, page_key, title, description, icon, color, layout, config, is_active, sort_order, created_by, created_at, updated_at |
| 66 | **ui_components** | id, business_id, page_id, component_type, title, config, data_source_id, position_x, position_y, width, height, sort_order, is_visible, created_at, updated_at |

---

**المجموع:** 66 جدولاً.

للمقارنة مع قاعدة البيانات محلياً شغّل:
```bash
cd backend && npm run db:check
```
(يتطلب `DATABASE_URL` صحيحاً.)
