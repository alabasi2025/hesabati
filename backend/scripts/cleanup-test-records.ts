import 'dotenv/config';
import postgres from 'postgres';

async function run() {
  const sql = postgres(process.env.DATABASE_URL!);
  const marker = '%اختبار آلي 20260312045451%';

  const fundRows = await sql<{ id: number; account_id: number | null }[]>`
    select id, account_id
    from funds
    where name like ${marker}
  `;

  for (const row of fundRows) {
    await sql`delete from funds where id = ${row.id}`;
    if (row.account_id != null) {
      await sql`delete from accounts where id = ${row.account_id}`;
    }
  }

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
