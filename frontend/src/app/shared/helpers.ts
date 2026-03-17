/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║          HESABATI — Shared Helper Functions                 ║
 * ║  Replaces duplicated formatAmount/formatDate/trackById      ║
 * ║  across 10+ page components                                 ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════
// § 1. Number & Amount Formatting
// ═══════════════════════════════════════════════════════════════

/** Format amount with Arabic-Yemen locale (default) */
export function formatAmount(amount: unknown, locale: string = 'ar-YE'): string {
  if (amount === null || amount === undefined) return '—';
  const n = typeof amount === 'string' ? Number.parseFloat(amount) : Number(amount);
  if (Number.isNaN(n)) return '—';
  return n.toLocaleString(locale);
}

/** Format amount with fraction control */
export function formatAmountPrecise(amount: string | number, minFractions = 0, maxFractions = 2, locale = 'ar-SA'): string {
  const n = typeof amount === 'string' ? Number.parseFloat(amount) : amount;
  if (Number.isNaN(n)) return '0';
  return n.toLocaleString(locale, { minimumFractionDigits: minFractions, maximumFractionDigits: maxFractions });
}

/** Format number with compact notation for large numbers */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString('ar-SA');
}

// ═══════════════════════════════════════════════════════════════
// § 2. Date Formatting
// ═══════════════════════════════════════════════════════════════

/** Format date with full options (year, month short, day) */
export function formatDate(d: string, locale: string = 'ar-YE'): string {
  if (!d) return '';
  return new Date(d).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
}

/** Format date simple (no options) */
export function formatDateSimple(d: string, locale: string = 'ar-YE'): string {
  if (!d) return '';
  return new Date(d).toLocaleDateString(locale);
}

/** Format date with time */
export function formatDateTime(d: string, locale: string = 'ar-YE'): string {
  if (!d) return '';
  return new Date(d).toLocaleString(locale, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/** Get today's date as ISO string (YYYY-MM-DD) */
export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

// ═══════════════════════════════════════════════════════════════
// § 3. Track Functions for @for loops
// ═══════════════════════════════════════════════════════════════

/** Track by item.id — use in @for trackBy */
export function trackById(_: number, item: any): any {
  return item.id;
}

// ═══════════════════════════════════════════════════════════════
// § 4. Status Helpers (context-specific maps)
// ═══════════════════════════════════════════════════════════════

/** Voucher status labels */
export const VOUCHER_STATUS: Record<string, { label: string; icon: string; color: string }> = {
  draft:     { label: 'مسودة',  icon: 'edit_note',     color: 'orange' },
  confirmed: { label: 'معتمد',  icon: 'check_circle',  color: 'green' },
  cancelled: { label: 'ملغي',   icon: 'cancel',        color: 'red' },
};

/** Journal entry status labels */
export const JOURNAL_STATUS: Record<string, { label: string; cls: string }> = {
  confirmed: { label: 'مؤكد',  cls: 'confirmed' },
  draft:     { label: 'مسودة', cls: 'draft' },
  cancelled: { label: 'ملغي',  cls: 'cancelled' },
};

/** Settlement status labels */
export const SETTLEMENT_STATUS: Record<string, { label: string; cls: string }> = {
  open:        { label: 'مفتوحة',          cls: 'open' },
  in_progress: { label: 'قيد التنفيذ',     cls: 'progress' },
  completed:   { label: 'مكتملة',          cls: 'completed' },
  disputed:    { label: 'متنازع عليها',    cls: 'disputed' },
};

/** Pending account status labels */
export const PENDING_STATUS: Record<string, { label: string; cls: string }> = {
  pending:     { label: 'معلق',       cls: 'pending' },
  in_progress: { label: 'قيد المعالجة', cls: 'progress' },
  resolved:    { label: 'تم الحل',     cls: 'resolved' },
  written_off: { label: 'شُطب',       cls: 'written-off' },
};

/** Employee status labels */
export const EMPLOYEE_STATUS: Record<string, string> = {
  active:    'نشط',
  suspended: 'موقوف',
  inactive:  'غير نشط',
};

/** Warehouse operation status labels */
export const WAREHOUSE_OP_STATUS: Record<string, { label: string; cls: string }> = {
  draft:     { label: 'مسودة',  cls: 'draft' },
  confirmed: { label: 'مؤكد',   cls: 'confirmed' },
  cancelled: { label: 'ملغي',   cls: 'cancelled' },
};

/** Generic status label getter */
export function getStatusLabel(statusMap: Record<string, any>, status: string): string {
  const entry = statusMap[status];
  if (!entry) return status;
  return typeof entry === 'string' ? entry : entry.label || status;
}

/** Generic status class getter */
export function getStatusClass(statusMap: Record<string, any>, status: string): string {
  const entry = statusMap[status];
  if (!entry) return status;
  return entry.cls || status;
}

// ═══════════════════════════════════════════════════════════════
// § 5. Unified Search/Filter Engine
// ═══════════════════════════════════════════════════════════════

export interface HighlightParts {
  before: string;
  match: string;
  after: string;
}

export type SearchMatchMode = 'contains' | 'startsWith' | 'equals';

export interface SearchFieldSpec<T> {
  candidates: readonly T[] | (() => readonly T[]);
  getPrimaryText: (item: T) => unknown;
  getAltTexts?: (item: T) => unknown[];
  matchMode?: SearchMatchMode;
}

export interface SearchSelectionResult<T> {
  matchedItem: T | null;
  normalizedInput: string;
}

function toSearchableString(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  return '';
}

/** Normalize user text for robust Arabic/Latin matching */
export function normalizeSearchText(value: unknown): string {
  return toSearchableString(value)
    .toLowerCase()
    .normalize('NFKC')
    .replaceAll('\u0640', '')
    .replaceAll(/[\u064B-\u065F]/g, '')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

/** Check if any candidate string matches the query */
export function matchesSearchQuery(query: unknown, ...candidates: unknown[]): boolean {
  const needle = normalizeSearchText(query);
  if (!needle) return true;
  return candidates.some((candidate) => normalizeSearchText(candidate).includes(needle));
}

/** Split text into 3 parts for highlighting matched substring */
export function getSearchHighlightParts(text: unknown, query: unknown): HighlightParts {
  const value = toSearchableString(text);
  const rawNeedle = toSearchableString(query).trim();
  if (!rawNeedle) return { before: value, match: '', after: '' };
  const idx = value.toLocaleLowerCase().indexOf(rawNeedle.toLocaleLowerCase());
  if (idx < 0) return { before: value, match: '', after: '' };
  return {
    before: value.slice(0, idx),
    match: value.slice(idx, idx + rawNeedle.length),
    after: value.slice(idx + rawNeedle.length),
  };
}

/** Generic field-level matching with configurable mode */
export function searchMatchByMode(value: unknown, query: unknown, mode: SearchMatchMode = 'contains'): boolean {
  const hay = normalizeSearchText(value);
  const needle = normalizeSearchText(query);
  if (!needle) return true;
  if (!hay) return false;
  if (mode === 'equals') return hay === needle;
  if (mode === 'startsWith') return hay.startsWith(needle);
  return hay.includes(needle);
}

/** Unified search resolver to pick an item from text input */
export function resolveSearchSelection<T>(
  input: unknown,
  spec: SearchFieldSpec<T>,
): SearchSelectionResult<T> {
  const normalizedInput = normalizeSearchText(input);
  if (!normalizedInput) {
    return { matchedItem: null, normalizedInput };
  }

  const mode = spec.matchMode || 'contains';
  const source = typeof spec.candidates === 'function' ? spec.candidates() : spec.candidates;

  for (const item of source) {
    const primary = spec.getPrimaryText(item);
    if (searchMatchByMode(primary, normalizedInput, mode)) {
      return { matchedItem: item, normalizedInput };
    }
    const altTexts = spec.getAltTexts ? spec.getAltTexts(item) : [];
    if (altTexts.some((alt) => searchMatchByMode(alt, normalizedInput, mode))) {
      return { matchedItem: item, normalizedInput };
    }
  }

  return { matchedItem: null, normalizedInput };
}
