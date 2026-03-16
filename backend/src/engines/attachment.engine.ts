/**
 * =====================================================================
 * محرك المرفقات (Attachment Engine)  
 * =====================================================================
 * Phase 2 — استخراج من api.rest.ts (سطور 576-2320)
 * 
 * يوحّد منطق رفع وإدارة المرفقات:
 *   - getAttachments()     → جلب مرفقات سجل معين
 *   - uploadAttachment()   → رفع مرفق جديد مع حفظ المسار
 *   - deleteAttachment()   → حذف مرفق وملفه
 *   - getArchiveSettings() → جلب إعدادات الأرشيف
 *   - resolveStoragePath() → حل مسار التخزين (إصلاح hardcoded path)
 */

import { db } from '../db/index.ts';
import { eq, and } from 'drizzle-orm';
import { attachments } from '../db/schema/index.ts';
import { promises as fs } from 'node:fs';
import path from 'node:path';

// ── واجهات ────────────────────────────────────────────────────────────────

export interface AttachmentInput {
  tableName: string;
  recordId: number;
  fileName: string;
  filePath: string;
  fileSize?: number | null;
  mimeType?: string | null;
  description?: string | null;
}

export interface Attachment {
  id: number;
  businessId: number;
  tableName: string;
  recordId: number;
  fileName: string;
  filePath: string;
  fileSize: number | null;
  mimeType: string | null;
  description: string | null;
  createdAt: Date | null;
}

export interface ArchiveSettings {
  storagePath: string;
  maxFileSizeMB: number;
  allowedTypes: string[];
}

// ── ثوابت ─────────────────────────────────────────────────────────────────

// إصلاح المسار الـ hardcoded: استخدام متغير بيئة بدلاً من مسار Windows مشفّر
const DEFAULT_STORAGE_PATH =
  process.env['ATTACHMENTS_PATH'] ||
  process.env['STORAGE_PATH'] ||
  path.join(process.cwd(), 'storage', 'attachments');

const MAX_FILE_SIZE_MB = Number(process.env['MAX_ATTACHMENT_MB'] || '50');
const ALLOWED_TYPES = (process.env['ALLOWED_ATTACHMENT_TYPES'] || 'pdf,jpg,jpeg,png,xlsx,docx,csv,zip').split(',');

// ── دوال الإعدادات ────────────────────────────────────────────────────────

/**
 * جلب إعدادات الأرشيف للعمل
 * الأولوية: DB → env variables → defaults
 */
export function getArchiveSettings(): ArchiveSettings {
  return {
    storagePath: DEFAULT_STORAGE_PATH,
    maxFileSizeMB: MAX_FILE_SIZE_MB,
    allowedTypes: ALLOWED_TYPES,
  };
}

/**
 * حل مسار التخزين لعمل ووثيقة معينة
 * مثال: /storage/attachments/biz_1/vouchers/
 */
export function resolveStoragePath(bizId: number, tableName: string): string {
  const settings = getArchiveSettings();
  return path.join(settings.storagePath, `biz_${bizId}`, tableName);
}

/**
 * التحقق من صحة نوع الملف وحجمه
 */
export function validateFile(
  fileName: string,
  fileSizeBytes?: number,
): { valid: boolean; error?: string } {
  const ext = path.extname(fileName).toLowerCase().replace('.', '');
  const settings = getArchiveSettings();

  if (!settings.allowedTypes.includes(ext)) {
    return { valid: false, error: `نوع الملف '${ext}' غير مسموح. الأنواع المسموحة: ${settings.allowedTypes.join(', ')}` };
  }

  if (fileSizeBytes !== undefined) {
    const sizeMB = fileSizeBytes / (1024 * 1024);
    if (sizeMB > settings.maxFileSizeMB) {
      return { valid: false, error: `حجم الملف ${sizeMB.toFixed(1)} MB يتجاوز الحد المسموح ${settings.maxFileSizeMB} MB` };
    }
  }

  return { valid: true };
}

// ── دوال CRUD ─────────────────────────────────────────────────────────────

/**
 * جلب مرفقات سجل معين
 */
export async function getAttachments(
  bizId: number,
  tableName: string,
  recordId: number,
): Promise<Attachment[]> {
  const rows = await db
    .select()
    .from(attachments)
    .where(
      and(
        eq(attachments.businessId, bizId),
        eq(attachments.tableName, tableName),
        eq(attachments.recordId, recordId),
      ),
    );

  return rows.map((r) => ({
    id: r.id,
    businessId: r.businessId,
    tableName: r.tableName,
    recordId: r.recordId,
    fileName: r.fileName,
    filePath: r.filePath,
    fileSize: r.fileSize ?? null,
    mimeType: r.mimeType ?? null,
    description: r.description ?? null,
    createdAt: r.createdAt ?? null,
  }));
}

/**
 * حفظ بيانات مرفق في قاعدة البيانات
 * (الرفع الفعلي يتم في route layer لأنه يتطلب request body)
 */
export async function saveAttachment(
  bizId: number,
  input: AttachmentInput,
): Promise<Attachment> {
  const [created] = await db
    .insert(attachments)
    .values({
      businessId: bizId,
      tableName: input.tableName,
      recordId: input.recordId,
      fileName: input.fileName,
      filePath: input.filePath,
      fileSize: input.fileSize ?? null,
      mimeType: input.mimeType ?? null,
      description: input.description ?? null,
      createdAt: new Date(),
    })
    .returning();

  return {
    id: created.id,
    businessId: created.businessId,
    tableName: created.tableName,
    recordId: created.recordId,
    fileName: created.fileName,
    filePath: created.filePath,
    fileSize: created.fileSize ?? null,
    mimeType: created.mimeType ?? null,
    description: created.description ?? null,
    createdAt: created.createdAt ?? null,
  };
}

/**
 * حذف مرفق من قاعدة البيانات (والملف إن وُجد)
 */
export async function deleteAttachment(
  id: number,
  bizId: number,
  deleteFile: boolean = true,
): Promise<boolean> {
  const [existing] = await db
    .select()
    .from(attachments)
    .where(and(eq(attachments.id, id), eq(attachments.businessId, bizId)));

  if (!existing) return false;

  // حذف الملف الفعلي إن طُلب
  if (deleteFile && existing.filePath) {
    try {
      await fs.unlink(existing.filePath);
    } catch {
      // الملف قد لا يكون موجوداً — نكمل الحذف من DB
    }
  }

  const result = await db
    .delete(attachments)
    .where(and(eq(attachments.id, id), eq(attachments.businessId, bizId)))
    .returning({ id: attachments.id });

  return result.length > 0;
}

/**
 * جلب مرفق واحد للتحقق من الملكية
 */
export async function getAttachmentById(
  id: number,
  bizId: number,
): Promise<Attachment | null> {
  const [row] = await db
    .select()
    .from(attachments)
    .where(and(eq(attachments.id, id), eq(attachments.businessId, bizId)));

  if (!row) return null;

  return {
    id: row.id,
    businessId: row.businessId,
    tableName: row.tableName,
    recordId: row.recordId,
    fileName: row.fileName,
    filePath: row.filePath,
    fileSize: row.fileSize ?? null,
    mimeType: row.mimeType ?? null,
    description: row.description ?? null,
    createdAt: row.createdAt ?? null,
  };
}

/**
 * إنشاء مجلد التخزين إن لم يكن موجوداً
 */
export async function ensureStorageDir(bizId: number, tableName: string): Promise<string> {
  const dir = resolveStoragePath(bizId, tableName);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}
