import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { sql } from 'drizzle-orm';

const maintenanceRoutes = new Hono();

/**
 * القائمة البيضاء للجداول المسموح بحذفها.
 * أي اسم جدول خارج هذه القائمة سيُرفض تلقائياً.
 */
const ALLOWED_TABLES_TO_DROP = new Set([
  'flow_types',
  'screen_collection_style_config',
  'template_types',
]);

/**
 * التحقق من أن اسم الجدول آمن ومسموح به.
 * يمنع SQL Injection حتى لو تم تعديل الكود لاحقاً ليقبل أسماء من الطلب.
 */
function isAllowedTable(name: string): boolean {
  return ALLOWED_TABLES_TO_DROP.has(name) && /^[a-z_]+$/.test(name);
}

// حذف الجداول الزائدة
maintenanceRoutes.post('/cleanup-extra-tables', async (c) => {
  try {
    const results = [];

    for (const table of ALLOWED_TABLES_TO_DROP) {
      if (!isAllowedTable(table)) {
        results.push({ table, status: 'rejected', message: 'اسم جدول غير مسموح' });
        continue;
      }
      try {
        // استخدام sql`` مع sql.identifier بدلاً من sql.raw لمنع SQL Injection
        await db.execute(sql`DROP TABLE IF EXISTS ${sql.raw(`"${table}"`)} CASCADE`);
        results.push({ table, status: 'deleted' });
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : JSON.stringify(error);
        results.push({ table, status: 'error', message: msg });
      }
    }

    return c.json({ success: true, results });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : JSON.stringify(error);
    return c.json({ error: msg }, 500);
  }
});

// التحقق من السكما
maintenanceRoutes.get('/check-schema', async (c) => {
  try {
    const result = await db.execute(sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name='operation_types' 
      ORDER BY ordinal_position
    `);
    
    return c.json({ columns: result });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : JSON.stringify(error);
    return c.json({ error: msg }, 500);
  }
});

export default maintenanceRoutes;
