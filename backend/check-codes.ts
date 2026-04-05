import { db } from './src/db/index.ts';
import { accounts } from './src/db/schema/schema-business.ts';
import { asc, isNotNull } from 'drizzle-orm';

const r = await db
  .select({ name: accounts.name, code: accounts.code, ledgerCode: accounts.ledgerCode, type: accounts.accountType })
  .from(accounts)
  .where(isNotNull(accounts.ledgerCode))
  .orderBy(asc(accounts.ledgerCode));

console.table(r.map(x => ({
  name: (x.name || '').substring(0, 30),
  code: x.code,
  ledger: x.ledgerCode,
  parts: (x.ledgerCode as string).split('-').length === 2 ? 'تحكم' : 'تحليلي',
})));

const controls = r.filter(x => (x.ledgerCode as string).split('-').length === 2);
const analytics = r.filter(x => (x.ledgerCode as string).split('-').length === 3);
console.log(`\nتحكم: ${controls.length} | تحليلي: ${analytics.length} | المجموع: ${r.length}`);

process.exit(0);
