/**
 * تطبيع نتائج db.execute() التي قد تكون مصفوفة أو { rows: [] }
 * مستخدم في sequencing، workflow، enhancements، ui-builder، api.rest
 */

export function normalizeDbResult<T = unknown>(result: unknown): T[] {
  if (Array.isArray(result)) return result as T[];
  if (result && typeof result === 'object' && 'rows' in result) {
    return (result as { rows: T[] }).rows;
  }
  return [];
}

export function getFirstRow<T>(result: unknown): T | undefined {
  const rows = normalizeDbResult<T>(result);
  return rows[0];
}
