-- تحويل الحسابات لشجرة حرة + نوع فرعي وظيفي
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS account_sub_nature_id INTEGER REFERENCES account_sub_natures(id);
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS is_leaf_account BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE accounts ALTER COLUMN account_type DROP NOT NULL;
ALTER TABLE accounts DROP CONSTRAINT IF EXISTS accounts_biz_type_subtype_seq_unique;

CREATE INDEX IF NOT EXISTS idx_accounts_parent_account_id ON accounts (parent_account_id);
CREATE INDEX IF NOT EXISTS idx_accounts_sub_nature_id ON accounts (account_sub_nature_id);
