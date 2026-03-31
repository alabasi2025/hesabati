import { db } from '../src/db/index.ts';
import { sql } from 'drizzle-orm';

async function main() {
  console.log('=== اختبار إنشاء محطة جديدة ===');
  
  try {
    // محاكاة إنشاء محطة جديدة باستخدام نفس منطق الـ API
    const bizId = 1;
    const payload = {
      name: 'محطة اختبار',
      code: 'TEST',
      location: 'موقع الاختبار',
      isActive: true,
      notes: null,
      billingSystems: []
    };
    
    // استدعاء getNextStationSequence
    const { getNextStationSequence } = await import('../src/middleware/sequencing.ts');
    const sequenceNumber = await getNextStationSequence(bizId);
    
    console.log('✅ Sequence Number:', sequenceNumber);
    
    // إدخال محطة جديدة
    const result = await db.execute(sql`
      INSERT INTO stations (business_id, name, code, sequence_number, location, is_active, notes, billing_systems, created_at, updated_at)
      VALUES (
        ${bizId}, 
        ${payload.name}, 
        ${payload.code}, 
        ${sequenceNumber},
        ${payload.location},
        ${payload.isActive},
        ${payload.notes},
        ${JSON.stringify(payload.billingSystems)},
        NOW(),
        NOW()
      )
      RETURNING id, name, code, sequence_number
    `);
    
    console.log('✅ تم إنشاء محطة جديدة:');
    console.log(JSON.stringify(result, null, 2));
    
    // فحص جميع المحطات
    const allStations = await db.execute(sql`
      SELECT id, name, code, sequence_number, business_id 
      FROM stations 
      ORDER BY id
    `);
    
    console.log('\n=== جميع المحطات بعد الإضافة ===');
    console.log(JSON.stringify(allStations, null, 2));
    
  } catch (error) {
    console.error('❌ خطأ:', error);
  }
  
  process.exit(0);
}

main();
