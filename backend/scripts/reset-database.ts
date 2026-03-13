import 'dotenv/config';
import postgres from 'postgres';

/**
 * إعادة تهيئة قاعدة البيانات بالكامل
 * يحذف جميع الجداول ويعيد إنشائها من الصفر
 * 
 * تحذير: هذا السكريبت سيحذف جميع البيانات!
 */
async function resetDatabase() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:774424555@localhost:5432/hesabati';
  const sql = postgres(connectionString);

  console.log('⚠️  إعادة تهيئة قاعدة البيانات...');
  console.log('⚠️  سيتم حذف جميع البيانات!');

  try {
    // حذف جميع الجداول
    console.log('🗑️  حذف جميع الجداول...');
    await sql`DROP SCHEMA public CASCADE`;
    await sql`CREATE SCHEMA public`;
    await sql`GRANT ALL ON SCHEMA public TO postgres`;
    await sql`GRANT ALL ON SCHEMA public TO public`;
    
    console.log('✅ تم حذف جميع الجداول بنجاح');
    console.log('✅ قاعدة البيانات جاهزة لتنفيذ migrations و seed');
  } catch (error) {
    console.error('❌ خطأ في إعادة تهيئة قاعدة البيانات:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

resetDatabase()
  .then(() => {
    console.log('✅ تمت إعادة التهيئة بنجاح!');
    console.log('');
    console.log('الخطوات التالية:');
    console.log('1. npm run db:push   (لإنشاء الجداول)');
    console.log('2. npm run db:seed   (لتعبئة البيانات الأولية)');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ فشلت إعادة التهيئة:', error);
    process.exit(1);
  });
