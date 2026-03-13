import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env' });

async function resetAllData() {
  const db = postgres(process.env.DATABASE_URL!);
  try {
    const tables = await db.unsafe<{ tablename: string }[]>(
      "select tablename from pg_tables where schemaname = 'public' and tablename <> '__drizzle_migrations' order by tablename",
    );

    if (!tables.length) {
      console.log('no_tables_to_truncate');
      return;
    }

    const tableList = tables
      .map((t) => `"public"."${t.tablename}"`)
      .join(', ');

    await db.unsafe(`TRUNCATE TABLE ${tableList} RESTART IDENTITY CASCADE`);
    console.log(`truncated_tables=${tables.length}`);
  } finally {
    await db.end();
  }
}

resetAllData().catch((error) => {
  console.error('reset_failed', error);
  process.exit(1);
});
