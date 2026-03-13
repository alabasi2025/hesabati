import 'dotenv/config';
import postgres from 'postgres';

async function run() {
  const sql = postgres(process.env.DATABASE_URL!);
  const testName = 'صندوق اختبار آلي 20260312045451';

  const rows = await sql<
    {
      fund_id: number;
      name: string;
      fund_type: string | null;
      fund_seq: number | null;
      fund_code: string | null;
      account_id: number | null;
      account_code: string | null;
      account_sub_nature_id: number | null;
      nature_key: string | null;
    }[]
  >`
    select
      f.id as fund_id,
      f.name,
      f.fund_type,
      f.sequence_number as fund_seq,
      f.code as fund_code,
      f.account_id,
      a.code as account_code,
      a.account_sub_nature_id,
      sn.nature_key
    from funds f
    left join accounts a on a.id = f.account_id
    left join account_sub_natures sn on sn.id = a.account_sub_nature_id
    where f.name = ${testName}
    order by f.id desc
    limit 1
  `;

  console.log(JSON.stringify(rows[0] ?? null, null, 2));
  await sql.end();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
