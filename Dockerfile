# ============================================================
# Dockerfile — hesabati backend
# Multi-stage build for production
# ============================================================

# ── Stage 1: Dependencies ──────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Copy package files
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod

# ── Stage 2: Builder ───────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@9

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy source
COPY src/ ./src/
COPY tsconfig.json* ./

# Build TypeScript
RUN pnpm build 2>/dev/null || echo "No build script, using tsx"

# ── Stage 3: Production ────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

# Security: non-root user
RUN addgroup -g 1001 -S hesabati && \
    adduser -S -u 1001 -G hesabati hesabati

# Copy production dependencies
COPY --from=deps --chown=hesabati:hesabati /app/node_modules ./node_modules
COPY --from=builder --chown=hesabati:hesabati /app/src ./src
COPY --chown=hesabati:hesabati package.json ./
COPY --chown=hesabati:hesabati tsconfig.json* ./

USER hesabati

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-3000}/api/health || exit 1

EXPOSE 3000

# Use tsx for TypeScript execution
CMD ["node", "--import", "tsx/esm", "src/index.ts"]
