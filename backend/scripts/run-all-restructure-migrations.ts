import 'dotenv/config';
import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join } from 'path';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:774424555@localhost:5432/hesabati';

async function run() {
  const sql = postgres(connectionString);
  const files = ['001_create_account_sub_natures.sql', '002_alter_accounts_for_tree.sql', '003_link_entities_to_accounts.sql'];

  for (const file of files) {
    const fullPath = join(process.cwd(), 'src/db/migrations', file);
    const content = readFileSync(fullPath, 'utf-8');
    try {
      await sql.unsafe(content);
      console.log(`✓ Applied: ${file}`);
    } catch (err: unknown) {
      const e = err as { message?: string; code?: string };
      if (e.code === '42P07' || e.message?.includes('already exists')) {
        console.log(`⏭ Skipped: ${file} (already exists)`);
      } else {
        console.error(`✗ Failed: ${file} -> ${e.message || String(err)}`);
        throw err;
      }
    }
  }

  await sql.end();
  console.log('All restructure migrations applied.');
}

run().catch((err) => { console.error(err); process.exit(1); });
