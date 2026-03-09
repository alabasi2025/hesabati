/**
 * إنشاء قاعدة البيانات hesabati (اتصال مؤقت بقاعدة postgres)
 * التشغيل: node scripts/create-db.mjs
 */
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL?.replace(/\/hesabati(\?|$)/, '/postgres$1')
  || 'postgresql://postgres:774424555@localhost:5432/postgres';

const sql = postgres(connectionString, { max: 1 });

try {
  await sql.unsafe('CREATE DATABASE hesabati');
  console.log('تم إنشاء قاعدة البيانات hesabati بنجاح.');
} catch (err) {
  if (err.code === '42P04') {
    console.log('قاعدة البيانات hesabati موجودة مسبقاً.');
  } else {
    console.error('خطأ:', err.message);
    process.exit(1);
  }
} finally {
  await sql.end();
}
