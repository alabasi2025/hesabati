/**
 * Attachments Routes — مسارات المرفقات المحسنة
 * @module routes/api/attachments-enhanced.routes
 * @since Phase 3
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { attachments } from '../../db/schema/core.ts';
import { eq, and } from 'drizzle-orm';
import {
  getAttachments, saveAttachment, deleteAttachment,
  getAttachmentById, resolveStoragePath, validateFile
} from '../../engines/attachment.engine.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { logAction } from '../../engines/audit.engine.ts';

export const attachmentsEnhancedRoutes = new Hono();
const api = attachmentsEnhancedRoutes;

// ===================== المرفقات المحسنة =====================
api.post('/businesses/:bizId/attachments', bizAuthMiddleware(), safeHandler('رفع مرفق', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = normalizeBody(await c.req.json());
  if (!body.entityType || !body.entityId || !body.fileName) {
    return c.json({ error: 'entityType, entityId, fileName مطلوبة' }, 400);
  }

  const entityType = String(body.entityType || '').trim();
  const entityId = Number.parseInt(String(body.entityId || ''), 10);
  if (!entityType || !Number.isInteger(entityId) || entityId <= 0) {
    return c.json({ error: 'entityType أو entityId غير صالح' }, 400);
  }

  const providedPath = String(body.filePath || body.fileUrl || '').trim();
  let finalPath = providedPath;
  if (!finalPath && entityType === 'voucher') {
    finalPath = (await resolveVoucherArchivePath(bizId, entityId, body.importance)) || '';
  }
  if (finalPath) {
    await mkdir(finalPath, { recursive: true });
  }

  const [created] = await db.insert(attachments).values({
    entityType,
    entityId,
    fileName: body.fileName,
    filePath: finalPath,
    fileSize: body.fileSize || 0, fileType: body.fileType || body.mimeType || 'application/octet-stream',
    description: body.description || null,
    uploadedBy: userId,
  }).returning();
  // سجل التدقيق
  await logAction({ userId, businessId: bizId, action: 'create', tableName: 'attachments', recordId: created.id, newData: { entityType, entityId, fileName: body.fileName, filePath: finalPath, importance: body.importance || null } });
  return c.json(created, 201);
}));

api.delete('/businesses/:bizId/attachments/:id', bizAuthMiddleware(), safeHandler('حذف مرفق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المرفق غير صالح' }, 400);
  const [existing] = await db.select().from(attachments).where(eq(attachments.id, id));
  if (!existing) return c.json({ error: 'مرفق غير موجود' }, 404);
  await db.delete(attachments).where(eq(attachments.id, id));
  return c.json({ success: true });
}));

api.get('/businesses/:bizId/attachments-archive-settings', bizAuthMiddleware(), safeHandler('جلب إعدادات الأرشفة الإلكترونية', async (c) => {
  const bizId = getBizId(c);
  const filePath = getArchiveSettingsFilePath(bizId);
  try {
    const raw = await readFile(filePath, 'utf8');
    return c.json(normalizeArchiveSettings(JSON.parse(raw)));
  } catch {
    return c.json(getArchiveSettingsDefaults());
  }
}));

api.put('/businesses/:bizId/attachments-archive-settings', bizAuthMiddleware(), safeHandler('حفظ إعدادات الأرشفة الإلكترونية', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = normalizeBody(await c.req.json());
  const normalized = normalizeArchiveSettings(body);
  const filePath = getArchiveSettingsFilePath(bizId);
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true });
  await writeFile(filePath, JSON.stringify(normalized, null, 2), 'utf8');
  const treeResult = await ensureArchiveTreeForBusiness(bizId, normalized);
  await logAction({ userId, businessId: bizId, action: 'update', tableName: 'businesses', recordId: bizId, newData: { ...normalized, treeResult } as any });
  return c.json({ ...normalized, treeResult });
}));

api.post('/businesses/:bizId/attachments-archive-build', bizAuthMiddleware(), safeHandler('إنشاء شجرة الأرشفة تلقائياً', async (c) => {
  const bizId = getBizId(c);
  const settings = await readArchiveSettings(bizId);
  const treeResult = await ensureArchiveTreeForBusiness(bizId, settings);
  return c.json({ success: true, treeResult });
}));

api.post('/businesses/:bizId/attachments-archive-pick-folder', bizAuthMiddleware(), safeHandler('اختيار مجلد الأرشفة من الجهاز', async (c) => {
  const platform = process.platform;
  if (platform !== 'win32') {
    return c.json({ error: 'اختيار المجلد من النظام مدعوم حالياً على ويندوز فقط' }, 400);
  }

  const script = [
    "Add-Type -AssemblyName System.Windows.Forms",
    "$dialog = New-Object System.Windows.Forms.FolderBrowserDialog",
    "$dialog.Description = 'اختر مجلد الأرشفة'",
    "$dialog.UseDescriptionForTitle = $true",
    "$dialog.ShowNewFolderButton = $true",
    "if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {",
    "  [Console]::OutputEncoding = [System.Text.Encoding]::UTF8",
    "  Write-Output $dialog.SelectedPath",
    "}",
  ].join('; ');

  let stdout = '';
  let stderr = '';
  try {
    const out = await execFileAsync(
      'powershell.exe',
      [
        '-NoProfile',
        '-STA',
        '-ExecutionPolicy',
        'Bypass',
        '-Command',
        script,
      ],
      { windowsHide: false, timeout: 120000 }
    );
    stdout = out.stdout || '';
    stderr = out.stderr || '';
  } catch (err: any) {
    const msg = String(err?.stderr || err?.message || 'تعذر فتح نافذة اختيار المجلد');
    return c.json({ error: msg }, 500);
  }

  const selectedPath = String(stdout || '').trim();
  if (!selectedPath && String(stderr || '').trim()) {
    return c.json({ error: String(stderr).trim() }, 500);
  }
  return c.json({ selectedPath, cancelled: !selectedPath });
}));

api.get('/businesses/:bizId/attachments-archive-fs', bizAuthMiddleware(), safeHandler('استعراض مجلدات الجهاز للأرشفة', async (c) => {
  if (process.platform !== 'win32') {
    return c.json({ error: 'استعراض ملفات النظام مدعوم حالياً على ويندوز فقط' }, 400);
  }

  const requestedPath = String(c.req.query('path') || '').trim();
  if (!requestedPath) {
    const drives = await listWindowsDrives();
    return c.json({
      currentPath: '',
      parentPath: null,
      entries: drives.map((d) => ({ name: d, fullPath: d, isDirectory: true })),
    });
  }

  const currentPath = path.normalize(requestedPath);
  let s: Awaited<ReturnType<typeof stat>>;
  try {
    s = await stat(currentPath);
  } catch {
    return c.json({ error: 'المسار غير موجود' }, 404);
  }
  if (!s.isDirectory()) return c.json({ error: 'المسار ليس مجلدًا' }, 400);

  const rows = await readdir(currentPath, { withFileTypes: true });
  const entries = rows
    .filter((r) => r.isDirectory())
    .map((r) => ({
      name: r.name,
      fullPath: path.join(currentPath, r.name),
      isDirectory: true,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ar'));

  const parentPath = path.dirname(currentPath);
  const normalizedParent = parentPath === currentPath ? null : parentPath;
  return c.json({ currentPath, parentPath: normalizedParent, entries });
}));

api.post('/businesses/:bizId/attachments-archive-fs/mkdir', bizAuthMiddleware(), safeHandler('إنشاء مجلد داخل مستكشف الأرشفة', async (c) => {
  if (process.platform !== 'win32') {
    return c.json({ error: 'إنشاء المجلد مدعوم حالياً على ويندوز فقط' }, 400);
  }

  const body = normalizeBody(await c.req.json());
  const parentPath = String(body.path || '').trim();
  const folderName = String(body.name || '').trim();
  if (!parentPath || !folderName) {
    return c.json({ error: 'path و name مطلوبان' }, 400);
  }

  if (folderName.includes('\\') || folderName.includes('/') || folderName.includes('..')) {
    return c.json({ error: 'اسم المجلد غير صالح' }, 400);
  }

  const normalizedParent = path.normalize(parentPath);
  let parentStat: Awaited<ReturnType<typeof stat>>;
  try {
    parentStat = await stat(normalizedParent);
  } catch {
    return c.json({ error: 'المسار الأب غير موجود' }, 404);
  }
  if (!parentStat.isDirectory()) return c.json({ error: 'المسار الأب ليس مجلدًا' }, 400);

  const targetPath = path.join(normalizedParent, folderName);
  await mkdir(targetPath, { recursive: true });
  return c.json({ success: true, createdPath: targetPath });
}));

api.get('/businesses/:bizId/attachments-archive-items', bizAuthMiddleware(), safeHandler('جلب عناصر أرشفة المرفقات', async (c) => {
  const bizId = getBizId(c);
  const qSearch = String(c.req.query('search') || '').trim().toLowerCase();
  const qVoucherType = String(c.req.query('voucherType') || '').trim().toLowerCase();
  const qTreasuryType = String(c.req.query('treasuryType') || '').trim().toLowerCase();
  const qImportance = String(c.req.query('importance') || '').trim();
  const settings = await readArchiveSettings(bizId);

  const result = await db.execute(sql`
    SELECT
      a.id, a.entity_type, a.entity_id, a.file_name, a.file_path, a.file_type, a.description, a.created_at,
      v.voucher_number, v.voucher_type, v.from_fund_id, v.to_fund_id, v.from_account_id, v.to_account_id,
      ff.name AS from_fund_name, tf.name AS to_fund_name,
      fa.name AS from_account_name, fa.account_type AS from_account_type,
      ta.name AS to_account_name, ta.account_type AS to_account_type
    FROM attachments a
    LEFT JOIN vouchers v ON a.entity_type = 'voucher' AND v.id = a.entity_id
    LEFT JOIN funds ff ON ff.id = v.from_fund_id
    LEFT JOIN funds tf ON tf.id = v.to_fund_id
    LEFT JOIN accounts fa ON fa.id = v.from_account_id
    LEFT JOIN accounts ta ON ta.id = v.to_account_id
    WHERE a.entity_type = 'voucher' AND v.business_id = ${bizId}
    ORDER BY a.created_at DESC
  `);

  const rows = normalizeDbResult(result).map((row: any) => {
    const voucherType = String(row.voucher_type || '').toLowerCase();
    let treasuryType = String(row.to_account_type || row.from_account_type || '').toLowerCase();
    if (row.to_fund_id || row.from_fund_id) {
      treasuryType = 'fund';
    }
    const treasuryName = String(
      row.to_fund_name ||
      row.from_fund_name ||
      row.to_account_name ||
      row.from_account_name ||
      '-'
    );
    const importance = detectImportanceFromPath(row.file_path, settings.importanceLevels);
    return {
      id: row.id,
      fileName: row.file_name,
      filePath: row.file_path,
      fileType: row.file_type,
      description: row.description,
      createdAt: row.created_at,
      voucherNumber: row.voucher_number,
      voucherType,
      treasuryType,
      treasuryName,
      importance,
    };
  }).filter((row: any) => {
    if (qVoucherType && row.voucherType !== qVoucherType) return false;
    if (qTreasuryType && row.treasuryType !== qTreasuryType) return false;
    if (qImportance && row.importance !== qImportance) return false;
    if (!qSearch) return true;
    const hay = `${row.fileName} ${row.filePath} ${row.voucherNumber || ''} ${row.treasuryName || ''}`.toLowerCase();
    return hay.includes(qSearch);
  });

  return c.json(rows);
}));

api.post('/businesses/:bizId/attachments/:id/rebuild-path', bizAuthMiddleware(), safeHandler('إعادة توليد مسار المرفق', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المرفق غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [existing] = await db.select().from(attachments).where(eq(attachments.id, id));
  if (!existing) return c.json({ error: 'المرفق غير موجود' }, 404);
  if (String(existing.entityType) !== 'voucher') return c.json({ error: 'إعادة التوليد تدعم مرفقات السندات فقط حالياً' }, 400);

  const settings = await readArchiveSettings(bizId);
  const importance = String(body.importance || detectImportanceFromPath(existing.filePath, settings.importanceLevels));
  const nextPath = await resolveVoucherArchivePath(bizId, existing.entityId, importance);
  if (!nextPath) return c.json({ error: 'تعذر تحديد السند المرتبط بهذا المرفق' }, 400);
  await mkdir(nextPath, { recursive: true });

  const [updated] = await db
    .update(attachments)
    .set({ filePath: nextPath })
    .where(eq(attachments.id, id))
    .returning();

  return c.json({ ...updated, importance });
}));

