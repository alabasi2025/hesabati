import { Context, Next } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import fs from "node:fs";

// إصلاح #14: إزالة مفتاح JWT الاحتياطي الثابت واستبداله بمفتاح عشوائي
const JWT_SECRET =
  process.env.JWT_SECRET ||
  (() => {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "❌ JWT_SECRET مطلوب في الإنتاج. أعد تشغيل الخادم بعد تعيين المتغير.",
      );
      process.exit(1);
    }
    const devSecretPath = new URL("../../.jwt-dev-secret", import.meta.url);
    try {
      if (fs.existsSync(devSecretPath)) {
        const existing = fs.readFileSync(devSecretPath, "utf8").trim();
        if (existing.length >= 32) {
          console.warn(
            "⚠️ JWT_SECRET غير موجود في البيئة. تم استخدام مفتاح تطوير محفوظ لضمان استمرار الجلسات.",
          );
          return existing;
        }
      }
      const generated = crypto.randomBytes(64).toString("hex");
      fs.writeFileSync(devSecretPath, generated, { encoding: "utf8" });
      console.warn(
        "⚠️ JWT_SECRET غير موجود في البيئة. تم إنشاء مفتاح تطوير محلي ثابت.",
      );
      console.warn("⚠️ لتجاوز ذلك، عيّن JWT_SECRET في ملف البيئة.");
      return generated;
    } catch {
      const generated = crypto.randomBytes(64).toString("hex");
      console.warn(
        "⚠️ تعذر حفظ مفتاح تطوير JWT. سيتم استخدام مفتاح مؤقت وقد تنتهي الجلسات بعد إعادة التشغيل.",
      );
      return generated;
    }
  })();

export interface JwtPayload {
  userId: number;
  username: string;
  role: string;
}

export function authMiddleware() {
  return async (c: Context, next: Next) => {
    // 1. حاول قراءة الـ token من httpOnly cookie أولاً
    let token = getCookie(c, "hesabati_token");
    // 2. fallback إلى Authorization header (لتوافق API clients)
    if (!token) {
      const authHeader = c.req.header("Authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }
    if (!token) {
      return c.json({ error: "غير مصرح - يرجى تسجيل الدخول" }, 401);
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET, {
        algorithms: ["HS256"],
      }) as JwtPayload;
      c.set("user", decoded);
      await next();
    } catch {
      return c.json({ error: "الجلسة منتهية - يرجى تسجيل الدخول مجدداً" }, 401);
    }
  };
}

/** يسمح فقط للمستخدمين بدور admin */
export function adminMiddleware() {
  return async (c: Context, next: Next) => {
    const user = c.get("user") as JwtPayload | undefined;
    if (!user || user.role !== "admin") {
      return c.json({ error: "غير مصرح - يتطلب دور مسؤول" }, 403);
    }
    await next();
  };
}

// === Access Token (15 دقيقة) ===
export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

// === Refresh Token (7 أيام) ===
export function generateRefreshToken(payload: JwtPayload): string {
  return jwt.sign({ ...payload, type: "refresh" }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// === التحقق من Refresh Token ===
export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    }) as JwtPayload & { type?: string };
    if (decoded.type !== "refresh") return null;
    return decoded;
  } catch {
    return null;
  }
}

// === تعيين httpOnly cookies ===
export function setAuthCookies(
  c: Context,
  accessToken: string,
  refreshToken: string,
): void {
  const isProduction = process.env.NODE_ENV === "production";
  setCookie(c, "hesabati_token", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "Strict" : "Lax",
    path: "/",
    maxAge: 15 * 60, // 15 دقيقة
  });
  setCookie(c, "hesabati_refresh", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "Strict" : "Lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 أيام
  });
}

// === حذف cookies عند الخروج ===
export function clearAuthCookies(c: Context): void {
  deleteCookie(c, "hesabati_token", { path: "/" });
  deleteCookie(c, "hesabati_refresh", { path: "/" });
}

/** التحقق من الـ token واستخراج البيانات (للاستخدام خارج HTTP مثل WebSocket). */
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    }) as JwtPayload;
  } catch {
    return null;
  }
}
