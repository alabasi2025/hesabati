# Security Policy — سياسة الأمان

## Supported Versions / الإصدارات المدعومة

| Version | Supported |
|---------|-----------|
| 1.x     | ✅ |
| < 1.0   | ❌ |

## Reporting a Vulnerability / الإبلاغ عن ثغرة

### English
If you discover a security vulnerability in Hesabati, please **do NOT open a public GitHub issue**.

Instead, please report it via:
- **Email**: security@hesabati.com
- **GitHub Security Advisories**: https://github.com/alabasi2025/hesabati/security/advisories/new

We will respond within **72 hours** and provide a fix within **14 days** for critical vulnerabilities.

### العربية
إذا اكتشفت ثغرة أمنية في نظام حسابتي، يُرجى **عدم فتح issue عام على GitHub**.

بدلاً من ذلك، أرسل تقريرك عبر:
- **البريد الإلكتروني**: security@hesabati.com
- **GitHub Security Advisories**: https://github.com/alabasi2025/hesabati/security/advisories/new

سنرد خلال **72 ساعة** ونوفر إصلاحاً خلال **14 يوماً** للثغرات الحرجة.

## Security Features / ميزات الأمان المُطبَّقة

### Authentication & Authorization
- ✅ JWT with HS256 algorithm only (RS256/none rejected)
- ✅ Token expiry: 7 days
- ✅ Missing `JWT_SECRET` aborts process in production
- ✅ Role-based access control (RBAC) with `checkPermission` middleware

### IDOR Protection
- ✅ All resource endpoints protected via `requireResourceOwnership`
- ✅ `bizAuthMiddleware` validates business membership on every request
- ✅ Zero IDOR vulnerabilities (verified via CI/CD scan)

### Input Validation
- ✅ Zod schemas for all request bodies
- ✅ XSS sanitization via `xssSanitizeMiddleware`
- ✅ `parseId` validates integer IDs before DB queries

### HTTP Security Headers
- ✅ `Content-Security-Policy` blocks external scripts
- ✅ `X-Frame-Options: DENY`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `Strict-Transport-Security` with `includeSubDomains`
- ✅ `Permissions-Policy` disables camera/microphone/geolocation

### Dependency Security
- ✅ `path-to-regexp >=8.0.0` (ReDoS prevention)
- ✅ `micromatch >=4.0.8` (ReDoS prevention)
- ✅ `esbuild >=0.25.0`
- ✅ Regular Dependabot alerts reviewed
- ✅ `npm audit` runs on every CI push (blocks on high/critical)

### Infrastructure
- ✅ Docker: non-root user (`node:20-alpine`)
- ✅ Multi-stage build (no dev dependencies in production)
- ✅ `.env.example` with safe defaults
- ✅ Secrets never committed to repository

## Known Limitations / القيود المعروفة
- Rate limiting is applied per IP via `rateLimit.ts` but not yet per-role
- Refresh token rotation not yet implemented
