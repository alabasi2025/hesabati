import { db } from '../src/db/index.ts';
import { sql } from 'drizzle-orm';

async function main() {
  const r = await db.execute(sql`
    SELECT id, name, code, sequence_number, business_id 
    FROM stations 
    ORDER BY id
  `);
  console.log(JSON.stringify(r, null, 2));
  process.exit(0);
}

main();
