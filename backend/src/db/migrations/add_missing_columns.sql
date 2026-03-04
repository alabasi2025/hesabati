-- Migration: إضافة الأعمدة المفقودة للجداول الجديدة
-- Date: 2026-03-04

-- ui_pages: إضافة الأعمدة المفقودة
ALTER TABLE ui_pages ADD COLUMN IF NOT EXISTS color VARCHAR(20) DEFAULT '#3b82f6';
ALTER TABLE ui_pages ADD COLUMN IF NOT EXISTS config JSONB DEFAULT '{}';

-- ui_data_sources: إضافة الأعمدة المفقودة
ALTER TABLE ui_data_sources ADD COLUMN IF NOT EXISTS table_name VARCHAR(100);
ALTER TABLE ui_data_sources ADD COLUMN IF NOT EXISTS query_template TEXT;
ALTER TABLE ui_data_sources ADD COLUMN IF NOT EXISTS sorting JSONB DEFAULT '{}';

-- workflow_history: إضافة الأعمدة المفقودة
ALTER TABLE workflow_history ADD COLUMN IF NOT EXISTS business_id INTEGER REFERENCES businesses(id);
ALTER TABLE workflow_history ADD COLUMN IF NOT EXISTS action_name VARCHAR(100);
ALTER TABLE workflow_history ADD COLUMN IF NOT EXISTS executed_at TIMESTAMP DEFAULT NOW();

-- منح الصلاحيات للجداول الجديدة
GRANT ALL PRIVILEGES ON TABLE ui_pages TO hesabati_user;
GRANT ALL PRIVILEGES ON TABLE ui_components TO hesabati_user;
GRANT ALL PRIVILEGES ON TABLE ui_data_sources TO hesabati_user;
GRANT ALL PRIVILEGES ON TABLE workflow_transitions TO hesabati_user;
GRANT ALL PRIVILEGES ON TABLE workflow_history TO hesabati_user;
GRANT ALL PRIVILEGES ON TABLE analytics_snapshots TO hesabati_user;

GRANT USAGE, SELECT ON SEQUENCE ui_pages_id_seq TO hesabati_user;
GRANT USAGE, SELECT ON SEQUENCE ui_components_id_seq TO hesabati_user;
GRANT USAGE, SELECT ON SEQUENCE ui_data_sources_id_seq TO hesabati_user;
GRANT USAGE, SELECT ON SEQUENCE workflow_transitions_id_seq TO hesabati_user;
GRANT USAGE, SELECT ON SEQUENCE workflow_history_id_seq TO hesabati_user;
GRANT USAGE, SELECT ON SEQUENCE analytics_snapshots_id_seq TO hesabati_user;
