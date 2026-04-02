import postgres from 'postgres';

async function createDatabase() {
  // الاتصال بقاعدة postgres الافتراضية لإنشاء قاعدة hesabati
  const sql = postgres('postgresql://postgres:774424555@localhost:5432/postgres');
  
  try {
    // التحقق هل قاعدة البيانات موجودة
    const result = await sql`SELECT 1 FROM pg_database WHERE datname = 'hesabati'`;
    
    if (result.length > 0) {
      console.log('✅ قاعدة البيانات hesabati موجودة بالفعل');
    } else {
      console.log('📦 جاري إنشاء قاعدة البيانات hesabati...');
      await sql.unsafe('CREATE DATABASE hesabati');
      console.log('✅ تم إنشاء قاعدة البيانات hesabati بنجاح');
    }
  } catch (error: any) {
    if (error.code === '42P04') {
      console.log('✅ قاعدة البيانات hesabati موجودة بالفعل');
    } else {
      console.error('❌ خطأ:', error.message);
      process.exit(1);
    }
  } finally {
    await sql.end();
  }
}

createDatabase().then(() => process.exit(0));
