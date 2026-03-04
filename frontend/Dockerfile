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

# بناء المشروع للإنتاج
RUN pnpm build

# ===================== مرحلة الإنتاج (Nginx) =====================
FROM nginx:alpine AS production

# نسخ ملفات البناء إلى Nginx
COPY --from=builder /app/dist/hesabati/browser /usr/share/nginx/html

# نسخ إعدادات Nginx المخصصة
COPY nginx.conf /etc/nginx/conf.d/default.conf

# كشف المنفذ
EXPOSE 80

# فحص صحة الحاوية
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
