import 'dotenv/config';
import { and, eq } from 'drizzle-orm';
import { db } from '../src/db/index.ts';
import { accountSubNatures, businesses } from '../src/db/schema/index.ts';

const SYSTEM_NATURES = [
  { key: 'fund', name: 'صندوق', icon: 'savings', requiresStation: true },
  { key: 'bank', name: 'بنك', icon: 'account_balance', requiresProvider: true, requiresAccountNumber: true },
  { key: 'e_wallet', name: 'محفظة', icon: 'account_balance_wallet', requiresProvider: true },
  { key: 'exchange', name: 'صراف', icon: 'currency_exchange', requiresProvider: true },
  { key: 'warehouse', name: 'مخزن', icon: 'warehouse', requiresStation: true },
  { key: 'custody', name: 'عهدة', icon: 'lock' },
  { key: 'supplier', name: 'مورد', icon: 'local_shipping', requiresSupplierType: true },
  { key: 'employee', name: 'موظف', icon: 'person', requiresEmployee: true },
  { key: 'partner', name: 'شريك', icon: 'handshake' },
  { key: 'billing', name: 'نظام فوترة', icon: 'receipt', requiresStation: true, requiresEmployee: true },
  { key: 'budget', name: 'ميزانية', icon: 'account_balance_wallet' },
  { key: 'settlement', name: 'تصفية', icon: 'balance' },
  { key: 'pending', name: 'معلق', icon: 'pending_actions' },
] as const;

async function run() {
  const bizRows = await db.select({ id: businesses.id }).from(businesses);
  for (const biz of bizRows) {
    let seq = 1;
    for (const n of SYSTEM_NATURES) {
      const [existing] = await db.select({ id: accountSubNatures.id }).from(accountSubNatures).where(and(eq(accountSubNatures.businessId, biz.id), eq(accountSubNatures.natureKey, n.key))).limit(1);
      if (existing) { seq += 1; continue; }
      await db.insert(accountSubNatures).values({
        businessId: biz.id, name: n.name, natureKey: n.key, isSystem: true, icon: n.icon, color: '#64748b', sequenceNumber: seq,
        requiresStation: 'requiresStation' in n && n.requiresStation === true,
        requiresEmployee: 'requiresEmployee' in n && n.requiresEmployee === true,
        requiresProvider: 'requiresProvider' in n && n.requiresProvider === true,
        requiresAccountNumber: 'requiresAccountNumber' in n && n.requiresAccountNumber === true,
        requiresSupplierType: 'requiresSupplierType' in n && n.requiresSupplierType === true,
      });
      seq += 1;
    }
  }
  console.log('seed-account-sub-natures completed');
}

run().catch((err) => { console.error(err); process.exit(1); });
