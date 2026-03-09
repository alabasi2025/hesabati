import postgres from 'postgres';
const sql = postgres('postgresql://postgres:774424555@localhost:5432/hesabati', { max: 1 });
const r = await sql`SELECT current_database() as db, count(*)::int as tables FROM information_schema.tables WHERE table_schema = 'public'`;
console.log('قاعدة البيانات:', r[0].db, '| عدد الجداول في public:', r[0].tables);
await sql.end();
