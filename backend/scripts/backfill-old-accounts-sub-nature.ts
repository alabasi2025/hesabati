import 'dotenv/config';
import { and, eq, isNull } from 'drizzle-orm';
import { db } from '../src/db/index.ts';
import { accountSubNatures, accounts } from '../src/db/schema/index.ts';

const ACCOUNT_TYPE_TO_NATURE: Record<string, string> = {
  fund: 'fund', bank: 'bank', e_wallet: 'e_wallet', exchange: 'exchange',
  custody: 'custody', warehouse: 'warehouse', supplier: 'supplier',
  employee: 'employee', partner: 'partner', billing: 'billing',
  budget: 'budget', settlement: 'settlement', pending: 'pending',
  accounting: 'pending',
};

async function run() {
  const oldAccounts = await db.select().from(accounts).where(isNull(accounts.accountSubNatureId));
  console.log(`Found ${oldAccounts.length} accounts without accountSubNatureId`);

  for (const acc of oldAccounts) {
    const accountType = String(acc.accountType || 'accounting');
    const natureKey = ACCOUNT_TYPE_TO_NATURE[accountType] || 'pending';
    
    const [nature] = await db
      .select({ id: accountSubNatures.id })
      .from(accountSubNatures)
      .where(and(eq(accountSubNatures.businessId, acc.businessId), eq(accountSubNatures.natureKey, natureKey)))
      .limit(1);

    if (nature) {
      await db
        .update(accounts)
        .set({ accountSubNatureId: nature.id, isLeafAccount: true, updatedAt: new Date() })
        .where(eq(accounts.id, acc.id));
      console.log(`✓ Account ${acc.id} (${acc.name}) -> nature: ${natureKey}`);
    }
  }

  console.log('backfill-old-accounts-sub-nature completed');
}

run().catch((err) => { console.error(err); process.exit(1); });
