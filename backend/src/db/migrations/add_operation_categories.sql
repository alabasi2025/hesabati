-- جدول تصنيفات أنواع العمليات (لربط الترقيم بمحرك sequence_counters)
-- يُستخدم للحصول على معرّف رقمي ثابت لكل تصنيف (مثل "عام"، "تحصيلات") لترقيم القوالب داخل التصنيف.

CREATE TABLE IF NOT EXISTS operation_categories (
  id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  category_key VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (business_id, category_key)
);

CREATE INDEX IF NOT EXISTS idx_operation_categories_business_key
  ON operation_categories (business_id, category_key);

COMMENT ON TABLE operation_categories IS 'تصنيفات أنواع العمليات - معرّف رقمي لكل تصنيف لاستخدامه في محرك الترقيم (item_in_operation_category)';
