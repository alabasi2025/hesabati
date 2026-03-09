import "dotenv/config";
import postgres from "postgres";

const connectionString =
  process.env.DATABASE_URL || "postgresql://postgres:774424555@localhost:5432/hesabati";

const sql = postgres(connectionString);

async function run() {
  console.log("🔧 Ensuring missing classification tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS supplier_types (
      id SERIAL PRIMARY KEY,
      business_id INTEGER NOT NULL REFERENCES businesses(id),
      name VARCHAR(200) NOT NULL,
      sub_type_key VARCHAR(100) NOT NULL,
      sequence_number INTEGER,
      description TEXT,
      icon VARCHAR(100) DEFAULT 'local_shipping',
      color VARCHAR(50) DEFAULT '#f97316',
      sort_order INTEGER DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS inventory_item_types (
      id SERIAL PRIMARY KEY,
      business_id INTEGER NOT NULL REFERENCES businesses(id),
      name VARCHAR(200) NOT NULL,
      sub_type_key VARCHAR(100) NOT NULL,
      sequence_number INTEGER,
      description TEXT,
      icon VARCHAR(100) DEFAULT 'inventory_2',
      color VARCHAR(50) DEFAULT '#78716c',
      sort_order INTEGER DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS accounting_types (
      id SERIAL PRIMARY KEY,
      business_id INTEGER NOT NULL REFERENCES businesses(id),
      name VARCHAR(200) NOT NULL,
      sub_type_key VARCHAR(100) NOT NULL,
      sequence_number INTEGER,
      description TEXT,
      icon VARCHAR(100) DEFAULT 'book',
      color VARCHAR(50) DEFAULT '#14b8a6',
      sort_order INTEGER DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;

  await sql`CREATE UNIQUE INDEX IF NOT EXISTS supplier_types_biz_key_unique ON supplier_types (business_id, sub_type_key)`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS supplier_types_biz_seq_unique ON supplier_types (business_id, sequence_number)`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS item_types_biz_key_unique ON inventory_item_types (business_id, sub_type_key)`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS item_types_biz_seq_unique ON inventory_item_types (business_id, sequence_number)`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS accounting_types_biz_key_unique ON accounting_types (business_id, sub_type_key)`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS accounting_types_biz_seq_unique ON accounting_types (business_id, sequence_number)`;

  console.log("✅ Missing tables are ensured.");
}

run()
  .catch((err) => {
    console.error("❌ Failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await sql.end();
  });
