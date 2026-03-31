import { db } from '../src/db/index.ts';
import { sql } from 'drizzle-orm';

async function main() {
  // فحص جدول sequence_counters
  const counters = await db.execute(sql`
    SELECT * FROM sequence_counters 
    WHERE counter_type = 'station'
    ORDER BY business_id
  `);
  console.log('=== Sequence Counters for Stations ===');
  console.log(JSON.stringify(counters, null, 2));
  
  // فحص المحطات
  const stations = await db.execute(sql`
    SELECT id, name, code, sequence_number, business_id 
    FROM stations 
    ORDER BY id
  `);
  console.log('\n=== Stations Data ===');
  console.log(JSON.stringify(stations, null, 2));
  
  process.exit(0);
}

main();
