import 'dotenv/config';
import postgres from 'postgres';

/**
 * فحص آلية الترقيم الجديدة
 * يعرض عينة من الحسابات المنشأة لتأكيد تطبيق الآلية الصحيحة
 */
async function checkNumbering() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:774424555@localhost:5432/hesabati';
  const sql = postgres(connectionString);

  console.log('🔍 فحص آلية الترقيم الجديدة...\n');

  try {
    // فحص الحسابات حسب النوع الفرعي
    const results = await sql`
      SELECT 
        asn.nature_key,
        asn.name as nature_name,
        a.code,
        a.name as account_name,
        a.sequence_number
      FROM accounts a
      JOIN account_sub_natures asn ON a.account_sub_nature_id = asn.id
      WHERE a.business_id = 1
      ORDER BY asn.sequence_number, a.sequence_number
      LIMIT 50
    `;

    // تجميع حسب النوع
    const byNature: Record<string, any[]> = {};
    for (const row of results) {
      const key = row.nature_key;
      if (!byNature[key]) byNature[key] = [];
      byNature[key].push(row);
    }

    // عرض النتائج
    for (const [natureKey, accounts] of Object.entries(byNature)) {
      const natureName = accounts[0]?.nature_name || natureKey;
      console.log(`\n📊 ${natureName} (${natureKey}):`);
      console.log('─'.repeat(80));
      
      for (const acc of accounts.slice(0, 5)) { // عرض أول 5 فقط
        console.log(`  ${acc.code.padEnd(10)} │ ${acc.account_name}`);
      }
      
      if (accounts.length > 5) {
        console.log(`  ... و${accounts.length - 5} حسابات أخرى`);
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ تم فحص الترقيم بنجاح!\n');

  } catch (error) {
    console.error('❌ خطأ في فحص الترقيم:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

checkNumbering()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ فشل الفحص:', error);
    process.exit(1);
  });
