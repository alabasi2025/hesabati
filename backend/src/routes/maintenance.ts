import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { sql } from 'drizzle-orm';

const maintenanceRoutes = new Hono();

// حذف الجداول الزائدة
maintenanceRoutes.post('/cleanup-extra-tables', async (c) => {
  try {
    const tablesToDrop = ['flow_types', 'screen_collection_style_config', 'template_types'];
    const results = [];

    for (const table of tablesToDrop) {
      try {
        await db.execute(sql.raw(`DROP TABLE IF EXISTS ${table} CASCADE`));
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
