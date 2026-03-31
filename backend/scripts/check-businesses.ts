import { db } from '../src/db/index.ts';
import { sql } from 'drizzle-orm';

async function main() {
  const businesses = await db.execute(sql`
    SELECT id, name, code FROM businesses ORDER BY id
  `);
  console.log('📊 الأعمال الموجودة:');
  console.log(JSON.stringify(businesses, null, 2));
  process.exit(0);
}

main();
