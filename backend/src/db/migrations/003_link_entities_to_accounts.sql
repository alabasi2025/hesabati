-- ربط الكيانات التشغيلية بحساب مالي مركزي
ALTER TABLE funds ADD COLUMN IF NOT EXISTS account_id INTEGER UNIQUE;
ALTER TABLE employee_billing_accounts ADD COLUMN IF NOT EXISTS account_id INTEGER UNIQUE;
ALTER TABLE warehouses ADD COLUMN IF NOT EXISTS account_id INTEGER UNIQUE;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'funds_account_id_fk') THEN
    ALTER TABLE funds ADD CONSTRAINT funds_account_id_fk FOREIGN KEY (account_id) REFERENCES accounts(id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'employee_billing_accounts_account_id_fk') THEN
    ALTER TABLE employee_billing_accounts ADD CONSTRAINT employee_billing_accounts_account_id_fk FOREIGN KEY (account_id) REFERENCES accounts(id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'warehouses_account_id_fk') THEN
    ALTER TABLE warehouses ADD CONSTRAINT warehouses_account_id_fk FOREIGN KEY (account_id) REFERENCES accounts(id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'suppliers_account_id_fk') THEN
    ALTER TABLE suppliers ADD CONSTRAINT suppliers_account_id_fk FOREIGN KEY (account_id) REFERENCES accounts(id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'business_partners_account_id_fk') THEN
    ALTER TABLE business_partners ADD CONSTRAINT business_partners_account_id_fk FOREIGN KEY (account_id) REFERENCES accounts(id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_funds_account_id ON funds (account_id);
CREATE INDEX IF NOT EXISTS idx_billing_account_id ON employee_billing_accounts (account_id);
CREATE INDEX IF NOT EXISTS idx_warehouses_account_id ON warehouses (account_id);
CREATE INDEX IF NOT EXISTS idx_suppliers_account_id ON suppliers (account_id);
CREATE INDEX IF NOT EXISTS idx_partners_account_id ON business_partners (account_id);
