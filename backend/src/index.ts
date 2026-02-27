import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import authRoutes from './routes/auth.ts';
import dashboardRoutes from './routes/dashboard.ts';
import apiRoutes from './routes/api.ts';
import { authMiddleware } from './middleware/auth.ts';
import { rateLimitMiddleware, loginRateLimitMiddleware } from './middleware/rateLimit.ts';
import { xssSanitizeMiddleware } from './middleware/validation.ts';

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
    // في بيئة التطوير، السماح بـ localhost
    if (origin.startsWith('http://localhost:')) return origin;
    // السماح بنطاقات sandbox
    if (origin.includes('.manus.computer')) return origin;
    return ALLOWED_ORIGINS[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use('*', logger());

// ===================== Rate Limiting =====================
app.use('/api/auth/login', loginRateLimitMiddleware());
app.use('/api/*', rateLimitMiddleware({ windowMs: 60000, maxRequests: 500 }));

// ===================== XSS Sanitization =====================
app.use('/api/*', xssSanitizeMiddleware());

// ===================== Public routes =====================
app.route('/api/auth', authRoutes);

// ===================== Protected routes =====================
app.use('/api/*', authMiddleware());
app.route('/api/dashboard', dashboardRoutes);
app.route('/api', apiRoutes);

// Health check
app.get('/health', (c) => c.json({ status: 'ok', message: 'حساباتي - النظام يعمل بنجاح' }));

// Root
app.get('/', (c) => c.json({
  name: 'حساباتي API',
  version: '1.1.0',
  description: 'نظام إدارة مالية شخصية شاملة',
}));

const port = parseInt(process.env.PORT || '3000');
console.log(`🚀 حساباتي API يعمل على المنفذ ${port}`);

serve({ fetch: app.fetch, port });

export default app;
