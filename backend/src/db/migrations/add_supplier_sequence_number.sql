-- Migration: إضافة حقل supplier_sequence_number لجدول purchase_invoices
-- الهدف: تخزين رقم الفاتورة الخاص بالمورد (منفصل عن الرقم العام)

ALTER TABLE purchase_invoices
  ADD COLUMN IF NOT EXISTS supplier_sequence_number VARCHAR(100);
