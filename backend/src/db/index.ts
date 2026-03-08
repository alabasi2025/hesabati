import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.ts';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:774424555@localhost:5432/hesabati';

// إعدادات Connection Pool للإنتاج
const client = postgres(connectionString, {
  max: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),           // أقصى عدد اتصالات متزامنة
  idle_timeout: parseInt(process.env.DB_IDLE_TIMEOUT || '20'),     // إغلاق الاتصال الخامل بعد 20 ثانية
  connect_timeout: parseInt(process.env.DB_CONNECT_TIMEOUT || '10'), // مهلة الاتصال 10 ثوانٍ
  max_lifetime: 60 * 30,                                            // أقصى عمر للاتصال: 30 دقيقة
  prepare: true,                                                    // تفعيل prepared statements للأداء
});

export const db = drizzle(client, { schema });
export const pgClient = client;

// دالة إغلاق الاتصالات بشكل آمن
export async function closeDatabase(): Promise<void> {
  await client.end({ timeout: 5 });
  console.log('✅ تم إغلاق اتصالات قاعدة البيانات بنجاح');
}

export type Database = typeof db;
