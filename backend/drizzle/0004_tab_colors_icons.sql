-- إضافة لون وأيقونة اختيارية للتبويب الأول والثاني في الشاشة الثابتة
ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab1_color" varchar(20) DEFAULT '#0d9488';
ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab1_icon" varchar(80);
ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab2_color" varchar(20) DEFAULT '#3b82f6';
ALTER TABLE "screen_collection_style_config" ADD COLUMN IF NOT EXISTS "tab2_icon" varchar(80);
