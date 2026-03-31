import { db } from '../src/db/index.ts';
import { sql } from 'drizzle-orm';

async function main() {
  console.log('🔄 تحديث sequence_number للمحطات القديمة...');
  
  try {
    // فحص المحطات الحالية
    const currentStations = await db.execute(sql`
      SELECT id, name, code, sequence_number, business_id 
      FROM stations 
      ORDER BY business_id, id
    `);
    
    console.log('📊 المحطات الحالية:');
    console.log(JSON.stringify(currentStations, null, 2));
    
    // تحديث المحطات لكل عمل على حدة
    const businessIds = [1, 2]; // يمكن جلبها ديناميكياً لو حبيت
    
    for (const bizId of businessIds) {
      console.log(`\n🏢 تحديث المحطات للعمل ${bizId}...`);
      
      // الحصول على أعلى sequence_number موجود لهذا العمل
      const maxSeqResult = await db.execute(sql`
        SELECT COALESCE(MAX(sequence_number), 0) as max_seq
        FROM stations 
        WHERE business_id = ${bizId} AND sequence_number IS NOT NULL
      `);
      
      const currentMax = Number(maxSeqResult[0]?.max_seq || 0);
      console.log(`📈 أعلى sequence_number حالي: ${currentMax}`);
      
      // جلب المحطات التي ليس لها sequence_number
      const stationsWithoutSeq = await db.execute(sql`
        SELECT id, name, code
        FROM stations 
        WHERE business_id = ${bizId} AND sequence_number IS NULL
        ORDER BY id
      `);
      
      console.log(`🔍 عدد المحطات بدون sequence_number: ${stationsWithoutSeq.length}`);
      
      // تحديث كل محطة
      for (let i = 0; i < stationsWithoutSeq.length; i++) {
        const station = stationsWithoutSeq[i];
        const newSeqNum = currentMax + i + 1;
        
        await db.execute(sql`
          UPDATE stations 
          SET sequence_number = ${newSeqNum}, updated_at = NOW()
          WHERE id = ${station.id}
        `);
        
        console.log(`✅ تم تحديث المحطة "${station.name}" (${station.code}) → sequence_number: ${newSeqNum}`);
      }
    }
    
    // فحص النتيجة النهائية
    const finalStations = await db.execute(sql`
      SELECT id, name, code, sequence_number, business_id 
      FROM stations 
      ORDER BY business_id, id
    `);
    
    console.log('\n🎉 النتيجة النهائية بعد التحديث:');
    console.log(JSON.stringify(finalStations, null, 2));
    
    // فحص sequence_counters
    const counters = await db.execute(sql`
      SELECT * FROM sequence_counters 
      WHERE counter_type = 'station'
      ORDER BY business_id
    `);
    
    console.log('\n📊 sequence_counters للمحطات:');
    console.log(JSON.stringify(counters, null, 2));
    
    console.log('\n✅ تم تحديث جميع المحطات بنجاح!');
    
  } catch (error) {
    console.error('❌ خطأ أثناء التحديث:', error);
  }
  
  process.exit(0);
}

main();
