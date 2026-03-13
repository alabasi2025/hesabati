import 'dotenv/config';
import postgres from 'postgres';

async function run() {
  const sql = postgres(process.env.DATABASE_URL!);
  const marker = '%اختبار آلي 20260312051253%';

  const createdRows = await sql<
    {
      id: number;
      name: string;
      account_type: string | null;
      sub_type: string | null;
      code: string | null;
      nature_key: string | null;
    }[]
  >`
    select a.id, a.name, a.account_type, a.sub_type, a.code, sn.nature_key
    from accounts a
    left join account_sub_natures sn on sn.id = a.account_sub_nature_id
    where a.name like ${marker}
    order by a.id asc
  `;

  const [health] = await sql<
    {
      bank_missing_subnature: number;
      exchange_missing_subnature: number;
      wallet_missing_subnature: number;
    }[]
  >`
    select
      (select count(*)::int from accounts a
        left join account_sub_natures sn on sn.id = a.account_sub_nature_id
        where a.business_id = 1 and a.account_type = 'bank' and coalesce(sn.nature_key, '') <> 'bank'
      ) as bank_missing_subnature,
      (select count(*)::int from accounts a
        left join account_sub_natures sn on sn.id = a.account_sub_nature_id
        where a.business_id = 1 and a.account_type = 'exchange' and coalesce(sn.nature_key, '') <> 'exchange'
      ) as exchange_missing_subnature,
      (select count(*)::int from accounts a
        left join account_sub_natures sn on sn.id = a.account_sub_nature_id
        where a.business_id = 1 and a.account_type = 'e_wallet' and coalesce(sn.nature_key, '') <> 'e_wallet'
      ) as wallet_missing_subnature
  `;

  console.log(JSON.stringify({ createdRows, health }, null, 2));
  await sql.end();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
