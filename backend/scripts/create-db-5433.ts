import postgres from 'postgres';
const sql = postgres('postgresql://postgres:774424555@localhost:5433/postgres', { max: 1 });
try {
  await sql.unsafe('CREATE DATABASE hesabati');
  console.log('تم إنشاء قاعدة hesabati');
} catch (e: unknown) {
  if (e && typeof e === 'object' && 'code' in e && e.code === '42P04') console.log('قاعدة hesabati موجودة مسبقاً');
  else throw e;
} finally {
  await sql.end();
}
