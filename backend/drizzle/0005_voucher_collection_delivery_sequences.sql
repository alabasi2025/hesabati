-- تتابعات ترقيم سندات التحصيل والتوريد (لتفادي مشاركة الترقيم مع التحويل)
CREATE SEQUENCE IF NOT EXISTS voucher_collection_seq START 1;
CREATE SEQUENCE IF NOT EXISTS voucher_delivery_seq START 1;
