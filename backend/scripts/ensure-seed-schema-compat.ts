import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env' });

async function ensureSeedSchemaCompat() {
  const db = postgres(process.env.DATABASE_URL!);
  try {
    await db.unsafe(
      'ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "item_type_id" integer',
    );
    await db.unsafe(
      'ALTER TABLE "inventory_items" ADD COLUMN IF NOT EXISTS "sequence_number" integer',
    );

    await db.unsafe(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'purchase_invoices'
            AND column_name = 'payment_method'
        ) AND EXISTS (
          SELECT 1
          FROM pg_type
          WHERE typname = 'payment_method'
        ) THEN
          BEGIN
            ALTER TABLE "purchase_invoices"
            ALTER COLUMN "payment_method"
            DROP DEFAULT;

            ALTER TABLE "purchase_invoices"
            ALTER COLUMN "payment_method"
            TYPE payment_method
            USING (
              CASE
                WHEN payment_method IN ('cash', 'credit', 'partial') THEN payment_method::payment_method
                ELSE 'credit'::payment_method
              END
            );

            ALTER TABLE "purchase_invoices"
            ALTER COLUMN "payment_method"
            SET DEFAULT 'credit'::payment_method;
          EXCEPTION WHEN others THEN
            NULL;
          END;
        END IF;
      END $$;
    `);

    console.log('schema_seed_compat_ready');
  } finally {
    await db.end();
  }
}

ensureSeedSchemaCompat().catch((error) => {
  console.error('schema_seed_compat_failed', error);
  process.exit(1);
});
