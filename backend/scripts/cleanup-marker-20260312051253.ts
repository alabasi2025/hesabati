import 'dotenv/config';
import postgres from 'postgres';

async function run() {
  const sql = postgres(process.env.DATABASE_URL!);
  const marker = '%اختبار آلي 20260312051253%';

  await sql`delete from funds where name like ${marker}`;
  await sql`delete from accounts where name like ${marker}`;

  const [summary] = await sql<{ funds_left: number; accounts_left: number }[]>`
    select
      (select count(*)::int from funds where name like ${marker}) as funds_left,
      (select count(*)::int from accounts where name like ${marker}) as accounts_left
  `;

  console.log(JSON.stringify(summary, null, 2));
  await sql.end();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
