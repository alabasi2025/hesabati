import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:774424555@localhost:5432/hesabati';

// إعدادات Connection Pool للإنتاج
const client = postgres(connectionString, {
  max: parseInt(process.env.DB_MAX_CONNECTIONS || '10'),
  idle_timeout: 0,                    // لا تُغلق الاتصالات الخاملة أبداً
  connect_timeout: 30,                // مهلة أطول للاتصال
  max_lifetime: 0,                    // اتصالات دائمة بدون انتهاء صلاحية
  keep_alive: true,                   // إبقاء الاتصال حياً
  prepare: false,                     // إيقاف prepared statements لتجنب أخطاء reconnect
  onnotice: () => {},
});

export const db = drizzle(client, { schema });
export const pgClient = client;

// دالة إغلاق الاتصالات بشكل آمن
export async function closeDatabase(): Promise<void> {
  await client.end({ timeout: 5 });
  console.log('✅ تم إغلاق اتصالات قاعدة البيانات بنجاح');
}

export type Database = typeof db;
