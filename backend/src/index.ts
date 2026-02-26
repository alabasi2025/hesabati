import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import authRoutes from './routes/auth.ts';
import dashboardRoutes from './routes/dashboard.ts';
import apiRoutes from './routes/api.ts';
import { authMiddleware } from './middleware/auth.ts';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));
app.use('*', logger());

// Public routes
app.route('/api/auth', authRoutes);

// Protected routes
app.use('/api/*', authMiddleware());
app.route('/api/dashboard', dashboardRoutes);
app.route('/api', apiRoutes);

// Health check
app.get('/health', (c) => c.json({ status: 'ok', message: 'حساباتي - النظام يعمل بنجاح' }));

// Root
app.get('/', (c) => c.json({
  name: 'حساباتي API',
  version: '1.0.0',
  description: 'نظام إدارة مالية شخصية شاملة',
}));

const port = parseInt(process.env.PORT || '3000');
console.log(`🚀 حساباتي API يعمل على المنفذ ${port}`);

serve({ fetch: app.fetch, port });

export default app;
