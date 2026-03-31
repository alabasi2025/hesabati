import { db } from '../src/db/index.ts';
import { sql } from 'drizzle-orm';
import { getNextStationSequence } from '../src/middleware/sequencing.ts';

async function main() {
  console.log('=== اختبار محرك الترقيم للمحطات ===');
  
  try {
    // اختبار getNextStationSequence
    const nextSeq = await getNextStationSequence(1);
    console.log('✅ getNextStationSequence(1) =', nextSeq);
    
    const nextSeq2 = await getNextStationSequence(2);
    console.log('✅ getNextStationSequence(2) =', nextSeq2);
    
    // فحص sequence_counters بعد الاستدعاء
    const counters = await db.execute(sql`
      SELECT * FROM sequence_counters 
      WHERE counter_type = 'station'
      ORDER BY business_id
    `);
    console.log('\n=== Sequence Counters After Test ===');
    console.log(JSON.stringify(counters, null, 2));
    
  } catch (error) {
    console.error('❌ خطأ:', error);
  }
  
  process.exit(0);
}

main();
