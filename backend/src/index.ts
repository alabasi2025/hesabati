import 'dotenv/config';
import { serve } from '@hono/node-server';
import { wsService } from './services/websocket.service.ts';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import authRoutes from './routes/auth.ts';
import dashboardRoutes from './routes/dashboard.ts';
import apiRoutes from './routes/api.ts';
import enhancementRoutes from './routes/enhancements.ts';
import { authMiddleware } from './middleware/auth.ts';
import { db, closeDatabase } from './db/index.ts';
import { sql } from 'drizzle-orm';
import { rateLimitMiddleware, loginRateLimitMiddleware } from './middleware/rateLimit.ts';
import { xssSanitizeMiddleware } from './middleware/validation.ts';

const isProduction = process.env.NODE_ENV === 'production';
const app = new Hono();

// ===================== CORS: قائمة بيضاء بالنطاقات المسموحة =====================
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:4200,http://localhost:3000')
  .split(',')
  .map(o => o.trim());

app.use('*', cors({
  origin: (origin) => {
    // السماح بالطلبات بدون origin (مثل curl أو mobile apps)
    if (!origin) return ALLOWED_ORIGINS[0];
    // التحقق من القائمة البيضاء
    if (ALLOWED_ORIGINS.includes(origin)) return origin;
    // في بيئة التطوير فقط، السماح بـ localhost
    if (!isProduction && origin.startsWith('http://localhost:')) return origin;
    // رفض النطاقات غير المسموحة
    return ALLOWED_ORIGINS[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use('*', logger());

// ===================== Rate Limiting =====================
// تسجيل الدخول: 20 محاولة / 15 دقيقة
app.use('/api/auth/login', loginRateLimitMiddleware());
// API عام: 1000 طلب / دقيقة
app.use('/api/*', rateLimitMiddleware({ windowMs: 60000, maxRequests: 1000 }));

// ===================== XSS Sanitization =====================
app.use('/api/*', xssSanitizeMiddleware());

// ===================== Security Headers =====================
app.use('*', async (c, next) => {
  await next();
  // منع تضمين الموقع في iframe (حماية من Clickjacking)
  c.header('X-Frame-Options', 'DENY');
  // منع sniffing لنوع المحتوى
  c.header('X-Content-Type-Options', 'nosniff');
  // تفعيل XSS Protection في المتصفح
  c.header('X-XSS-Protection', '1; mode=block');
  // منع تسريب referrer
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  // إزالة header الخادم
  c.header('X-Powered-By', '');
  // في الإنتاج: فرض HTTPS
  if (isProduction) {
    c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
});

// ===================== Public routes =====================
app.route('/api/auth', authRoutes);

// ===================== Protected routes =====================
app.use('/api/*', authMiddleware());
app.route('/api/dashboard', dashboardRoutes);
app.route('/api', apiRoutes);
app.route('/api', enhancementRoutes);

// ===================== Global Error Handler =====================
app.onError((err, c) => {
  console.error(`[${new Date().toISOString()}] خطأ غير متوقع:`, err);
  return c.json({ 
    error: 'حدث خطأ غير متوقع في الخادم - حاول مرة أخرى',
    details: !isProduction ? err.message : undefined
  }, 500);
});

// ===================== 404 Handler =====================
app.notFound((c) => {
  return c.json({ error: 'المسار المطلوب غير موجود' }, 404);
});

// Health check
app.get('/health', (c) => c.json({ 
  status: 'ok', 
  message: 'حساباتي - النظام يعمل بنجاح',
  environment: process.env.NODE_ENV || 'development',
  uptime: Math.floor(process.uptime()),
}));

// فحص اتصال قاعدة البيانات
app.get('/health/db', async (c) => {
  try {
    const start = Date.now();
    await db.execute(sql`SELECT 1`);
    const latency = Date.now() - start;
    return c.json({
      status: 'connected',
      message: 'قاعدة البيانات متصلة وتعمل بنجاح',
      latency: `${latency}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return c.json({
      status: 'disconnected',
      message: 'فشل الاتصال بقاعدة البيانات',
      error: err.message,
      timestamp: new Date().toISOString(),
    }, 503);
  }
});

// Root
app.get('/', (c) => c.json({
  name: 'حساباتي API',
  version: '1.3.0',
  description: 'نظام إدارة مالية شخصية شاملة',
}));

const port = parseInt(process.env.PORT || '3000');
console.log(`🚀 حساباتي API يعمل على المنفذ ${port} (${process.env.NODE_ENV || 'development'})`);

const server = serve({ fetch: app.fetch, port });
wsService.init(server as any);

// ===================== Graceful Shutdown =====================
let isShuttingDown = false;

async function gracefulShutdown(signal: string) {
  if (isShuttingDown) return;
  isShuttingDown = true;
  
  console.log(`\n⚠️ استلام إشارة ${signal} - بدء الإغلاق الآمن...`);
  
  // إيقاف قبول اتصالات جديدة
  server.close(() => {
    console.log('✅ تم إيقاف قبول الاتصالات الجديدة');
  });
  
  // إغلاق WebSocket
  wsService.shutdown();
  console.log('✅ تم إغلاق اتصالات WebSocket');
  
  // إغلاق قاعدة البيانات
  try {
    await closeDatabase();
  } catch (err) {
    console.error('❌ خطأ في إغلاق قاعدة البيانات:', err);
  }
  
  console.log('✅ تم الإغلاق الآمن بنجاح');
  process.exit(0);
}

// التقاط إشارات الإيقاف
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// التقاط الأخطاء غير المعالجة
process.on('uncaughtException', (err) => {
  console.error(`[${new Date().toISOString()}] ❌ خطأ غير ملتقط:`, err);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  console.error(`[${new Date().toISOString()}] ❌ وعد غير معالج:`, reason);
});

export default app;
