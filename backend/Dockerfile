# ===================== مرحلة البناء =====================
FROM node:22-alpine AS builder

WORKDIR /app

# تثبيت pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# نسخ ملفات التبعيات أولاً (للاستفادة من cache)
COPY package.json pnpm-lock.yaml ./

# تثبيت التبعيات
RUN pnpm install --frozen-lockfile

# نسخ الكود المصدري
COPY . .

# بناء المشروع
RUN pnpm build

# ===================== مرحلة الإنتاج =====================
FROM node:22-alpine AS production

WORKDIR /app

# تثبيت pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# إنشاء مستخدم غير root للأمان
RUN addgroup -g 1001 -S hesabati && \
    adduser -S hesabati -u 1001 -G hesabati

# نسخ ملفات التبعيات
COPY package.json pnpm-lock.yaml ./

# تثبيت تبعيات الإنتاج فقط
RUN pnpm install --frozen-lockfile --prod

# نسخ الكود المبني من مرحلة البناء
COPY --from=builder /app/dist ./dist

# نسخ ملفات Drizzle (للـ migrations)
COPY drizzle.config.ts ./
COPY src/db ./src/db

# إنشاء مجلد السجلات
RUN mkdir -p /var/log/hesabati && chown hesabati:hesabati /var/log/hesabati

# تعيين متغيرات البيئة الافتراضية
ENV NODE_ENV=production
ENV PORT=3000

# تشغيل كمستخدم غير root
USER hesabati

# كشف المنفذ
EXPOSE 3000

# فحص صحة الحاوية
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# تشغيل التطبيق
CMD ["node", "dist/index.js"]
