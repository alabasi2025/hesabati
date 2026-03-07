/**
 * إنشاء قاعدة البيانات hesabati (اسم النظام) وضبط كلمة مرور postgres إلى 774424555
 * يشغّل مرة واحدة ثم يمكنك تشغيل: pnpm run db:migrate && pnpm run db:seed
 */
import postgres from 'postgres';

const targetDb = 'hesabati';
const targetPassword = '774424555';

async function run() {
  // المحاولة الأولى: الاتصال بـ postgres الافتراضي (كلمة مرور شائعة)
  const tryConnect = async (url: string): Promise<postgres.Sql | null> => {
    try {
      const sql = postgres(url, { max: 1, connect_timeout: 5 });
      await sql`SELECT 1`;
      return sql;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes('password') && !msg.includes('28P01')) console.warn('اتصال:', msg.slice(0, 80));
      return null;
    }
  };

  const urls = [
    `postgresql://postgres:${targetPassword}@localhost:5432/postgres`,
    'postgresql://postgres:postgres@localhost:5432/postgres',
    // كلمة مرور تبدأ بـ @ ثم asdasdasd → @ يرمّز في الرابط كـ %40
    'postgresql://postgres:%40asdasdasd@localhost:5432/postgres',
    'postgresql://postgres:asdasdasd@localhost:5432/postgres',
    'postgresql://postgres:@localhost:5432/postgres',
    'postgresql://postgres@localhost:5432/postgres',
    'postgresql://postgres:774424555@127.0.0.1:5432/postgres',
    'postgresql://postgres:postgres@127.0.0.1:5432/postgres',
    'postgresql://postgres:%40asdasdasd@127.0.0.1:5432/postgres',
    'postgresql://postgres:asdasdasd@127.0.0.1:5432/postgres',
  ];

  let sql: postgres.Sql | null = null;
  for (const url of urls) {
    sql = await tryConnect(url);
    if (sql) {
      console.log('تم الاتصال بـ PostgreSQL.');
      break;
    }
  }

  if (!sql) {
    console.error('فشل الاتصال. تأكد أن PostgreSQL يعمل وضبط كلمة مرور المستخدم postgres إلى 774424555 ثم أنشئ القاعدة يدوياً:');
    console.error('  psql -U postgres -c "ALTER USER postgres PASSWORD \'774424555\'; CREATE DATABASE hesabati;"');
    process.exit(1);
  }

  try {
    const exists = await sql`
      SELECT 1 FROM pg_database WHERE datname = ${targetDb}
    `;
    if (exists.length === 0) {
      await sql.unsafe(`CREATE DATABASE ${targetDb}`);
      console.log('تم إنشاء قاعدة البيانات:', targetDb);
    } else {
      console.log('قاعدة البيانات موجودة مسبقاً:', targetDb);
    }
    await sql.unsafe(`ALTER USER postgres PASSWORD '${targetPassword}'`);
    console.log('تم ضبط كلمة مرور postgres إلى 774424555');
  } finally {
    await sql.end();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
