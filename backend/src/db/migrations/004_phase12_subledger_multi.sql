-- Phase 12: نمط Control Account + Subledger المتعدد
-- كل نوع (موظفون، موردون، مخازن، شركاء) يدعم كيانات متعددة تحت حساب تحكم واحد

-- 1) إضافة account_id للموظفين (بدون UNIQUE — متعددون تحت نفس الحساب)
ALTER TABLE employees ADD COLUMN IF NOT EXISTS account_id INTEGER;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'employees_account_id_fk'
  ) THEN
    ALTER TABLE employees
      ADD CONSTRAINT employees_account_id_fk
      FOREIGN KEY (account_id) REFERENCES accounts(id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_employees_account_id ON employees (account_id);

-- 2) إزالة قيد UNIQUE من warehouses.account_id (لدعم مخازن متعددة تحت نفس الحساب)
DO $$
DECLARE
  v_constraint TEXT;
BEGIN
  SELECT constraint_name INTO v_constraint
  FROM information_schema.table_constraints
  WHERE table_name = 'warehouses'
    AND constraint_type = 'UNIQUE'
    AND constraint_name LIKE '%account_id%'
  LIMIT 1;

  IF v_constraint IS NOT NULL THEN
    EXECUTE 'ALTER TABLE warehouses DROP CONSTRAINT ' || quote_ident(v_constraint);
  END IF;
END $$;

-- 3) إزالة قيد UNIQUE من employee_billing_accounts.account_id (لدعم متعددين)
DO $$
DECLARE
  v_constraint TEXT;
BEGIN
  SELECT constraint_name INTO v_constraint
  FROM information_schema.table_constraints
  WHERE table_name = 'employee_billing_accounts'
    AND constraint_type = 'UNIQUE'
    AND constraint_name LIKE '%account_id%'
  LIMIT 1;

  IF v_constraint IS NOT NULL THEN
    EXECUTE 'ALTER TABLE employee_billing_accounts DROP CONSTRAINT ' || quote_ident(v_constraint);
  END IF;
END $$;

-- 4) إضافة account_id لجدول supplier_types (كل نوع مورد له حسابه)
ALTER TABLE supplier_types ADD COLUMN IF NOT EXISTS account_id INTEGER;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'supplier_types_account_id_fk'
  ) THEN
    ALTER TABLE supplier_types
      ADD CONSTRAINT supplier_types_account_id_fk
      FOREIGN KEY (account_id) REFERENCES accounts(id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_supplier_types_account_id ON supplier_types (account_id);

-- 5) إضافة code و sequence_number للموردين إن لم تكن موجودة
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS code VARCHAR(30);
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS sequence_number INTEGER;

-- 5) إضافة code و sequence_number للشركاء إن لم تكن موجودة
ALTER TABLE business_partners ADD COLUMN IF NOT EXISTS code VARCHAR(30);
ALTER TABLE business_partners ADD COLUMN IF NOT EXISTS sequence_number INTEGER;

-- 6) إضافة code و sequence_number للمخازن إن لم تكن موجودة
ALTER TABLE warehouses ADD COLUMN IF NOT EXISTS code VARCHAR(30);
ALTER TABLE warehouses ADD COLUMN IF NOT EXISTS sequence_number INTEGER;
