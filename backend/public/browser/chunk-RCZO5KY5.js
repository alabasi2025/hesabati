// src/app/shared/helpers.ts
function formatAmount(amount, locale = "ar-YE") {
  if (amount === null || amount === void 0)
    return "\u2014";
  const n = typeof amount === "string" ? Number.parseFloat(amount) : Number(amount);
  if (Number.isNaN(n))
    return "\u2014";
  return n.toLocaleString(locale);
}
function formatAmountPrecise(amount, minFractions = 0, maxFractions = 2, locale = "ar-SA") {
  const n = typeof amount === "string" ? Number.parseFloat(amount) : amount;
  if (Number.isNaN(n))
    return "0";
  return n.toLocaleString(locale, { minimumFractionDigits: minFractions, maximumFractionDigits: maxFractions });
}
function formatDate(d, locale = "ar-YE") {
  if (!d)
    return "";
  return new Date(d).toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}
function formatDateTime(d, locale = "ar-YE") {
  if (!d)
    return "";
  return new Date(d).toLocaleString(locale, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function toSearchableString(value) {
  if (value === null || value === void 0)
    return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return "";
}
function normalizeSearchText(value) {
  return toSearchableString(value).toLowerCase().normalize("NFKC").replaceAll("\u0640", "").replaceAll(/[\u064B-\u065F]/g, "").replaceAll(/\s+/g, " ").trim();
}
function matchesSearchQuery(query, ...candidates) {
  const needle = normalizeSearchText(query);
  if (!needle)
    return true;
  return candidates.some((candidate) => normalizeSearchText(candidate).includes(needle));
}
function getSearchHighlightParts(text, query) {
  const value = toSearchableString(text);
  const rawNeedle = toSearchableString(query).trim();
  if (!rawNeedle)
    return { before: value, match: "", after: "" };
  const idx = value.toLocaleLowerCase().indexOf(rawNeedle.toLocaleLowerCase());
  if (idx < 0)
    return { before: value, match: "", after: "" };
  return {
    before: value.slice(0, idx),
    match: value.slice(idx, idx + rawNeedle.length),
    after: value.slice(idx + rawNeedle.length)
  };
}
function searchMatchByMode(value, query, mode = "contains") {
  const hay = normalizeSearchText(value);
  const needle = normalizeSearchText(query);
  if (!needle)
    return true;
  if (!hay)
    return false;
  if (mode === "equals")
    return hay === needle;
  if (mode === "startsWith")
    return hay.startsWith(needle);
  return hay.includes(needle);
}
function resolveSearchSelection(input, spec) {
  const normalizedInput = normalizeSearchText(input);
  if (!normalizedInput) {
    return { matchedItem: null, normalizedInput };
  }
  const mode = spec.matchMode || "contains";
  const source = typeof spec.candidates === "function" ? spec.candidates() : spec.candidates;
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

export {
  formatAmount,
  formatAmountPrecise,
  formatDate,
  formatDateTime,
  normalizeSearchText,
  matchesSearchQuery,
  getSearchHighlightParts,
  resolveSearchSelection
};
//# sourceMappingURL=chunk-RCZO5KY5.js.map
