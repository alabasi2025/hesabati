import { db } from '../src/db/index.ts';
import { sql } from 'drizzle-orm';
import { getFirstRow, normalizeDbResult } from '../src/utils/db-result.ts';

async function main() {
  // حساب أعلى رقم biz موجود فعلياً
  const maxRow = getFirstRow<{ max_num: string }>(
    await db.execute(sql`
      SELECT COALESCE(MAX(CAST(NULLIF(REGEXP_REPLACE(code, '^biz-0*', ''), '') AS INTEGER)), 0)::text AS max_num
      FROM businesses WHERE code ~ '^biz-[0-9]+'
    `)
  );
  const correctMax = Number(maxRow?.max_num ?? 0);
  console.log('� أعلى رقم biz موجود:', correctMax);

  // تحديث العداد
  await db.execute(sql.raw(
    `INSERT INTO sequence_counters (business_id, counter_type, entity_id, year, last_number)
     VALUES (0, 'business', 0, 0, ${correctMax})
     ON CONFLICT (business_id, counter_type, entity_id, year)
     DO UPDATE SET last_number = ${correctMax}, updated_at = NOW()`
  ));
  console.log('✅ العداد = ' + correctMax + ' → التالي biz-' + String(correctMax + 1).padStart(2, '0'));

  process.exit(0);
}

main();
