import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env' });

async function auditAccountPlan() {
  const db = postgres(process.env.DATABASE_URL!);
  try {
    const one = async (query: string) => (await db.unsafe<{ c: number }[]>(query))[0]?.c ?? 0;

    const metrics = {
      businesses: await one('select count(*)::int as c from businesses'),
      subNaturesTotal: await one('select count(*)::int as c from account_sub_natures'),
      subNaturesDistinctPerBiz: await one(`
        select count(*)::int as c
        from (
          select business_id, count(*) as n
          from account_sub_natures
          group by business_id
          having count(*) = 13
        ) t
      `),
      accountsLeafMissingSubNature: await one('select count(*)::int as c from accounts where is_leaf_account = true and account_sub_nature_id is null'),
      accountsLeafMissingCode: await one('select count(*)::int as c from accounts where is_leaf_account = true and (code is null or trim(code) = \'\')'),
      fundsMissingAccount: await one('select count(*)::int as c from funds where account_id is null'),
      fundsTypeMissingDefinition: await one(`
        select count(*)::int as c
        from funds f
        left join fund_types ft
          on ft.business_id = f.business_id
         and ft.sub_type_key = f.fund_type
        where coalesce(trim(f.fund_type), '') <> ''
          and ft.id is null
      `),
      suppliersMissingAccount: await one('select count(*)::int as c from suppliers where account_id is null'),
      warehousesMissingAccount: await one('select count(*)::int as c from warehouses where account_id is null'),
      employeeBillingMissingAccount: await one('select count(*)::int as c from employee_billing_accounts where account_id is null'),
      partnersMissingAccount: await one('select count(*)::int as c from business_partners where account_id is null'),
      bankAccountsTypeMissingDefinition: await one(`
        select count(*)::int as c
        from accounts a
        left join bank_types bt
          on bt.business_id = a.business_id
         and bt.sub_type_key = a.sub_type
        where a.account_type = 'bank'
          and coalesce(trim(a.sub_type), '') <> ''
          and bt.id is null
      `),
      exchangeAccountsTypeMissingDefinition: await one(`
        select count(*)::int as c
        from accounts a
        left join exchange_types et
          on et.business_id = a.business_id
         and et.sub_type_key = a.sub_type
        where a.account_type = 'exchange'
          and coalesce(trim(a.sub_type), '') <> ''
          and et.id is null
      `),
      walletAccountsTypeMissingDefinition: await one(`
        select count(*)::int as c
        from accounts a
        left join e_wallet_types wt
          on wt.business_id = a.business_id
         and wt.sub_type_key = a.sub_type
        where a.account_type = 'e_wallet'
          and coalesce(trim(a.sub_type), '') <> ''
          and wt.id is null
      `),
      sidebarOldAccountTypesRoute: await one("select count(*)::int as c from sidebar_items where route like '%/account-types%'"),
      sidebarOldAccountTypesKey: await one("select count(*)::int as c from sidebar_items where screen_key = 'account_types'"),
      sidebarSubNaturesItems: await one("select count(*)::int as c from sidebar_items where screen_key = 'account_sub_natures'"),
      userSidebarSubNaturesHidden: await one(`
        select count(*)::int as c
        from user_sidebar_config usc
        join sidebar_items si on si.id = usc.sidebar_item_id
        where si.screen_key = 'account_sub_natures'
          and usc.is_visible = false
      `),
    };

    console.log(JSON.stringify(metrics, null, 2));
  } finally {
    await db.end();
  }
}

auditAccountPlan().catch((error) => {
  console.error('audit_failed', error);
  process.exit(1);
});
