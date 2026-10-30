/**
 * Utility functions for cleaning and formatting strings in Practice Studio.
 * Eliminates redundant parentheses and parenthetical annotations from vocabulary
 * definitions, hints, and UI badges.
 */

/**
 * Strips parentheses and parenthetical explanations from text.
 * E.g.:
 * - "xin chào (thông dụng và thân thiện nhất)" -> "xin chào"
 * - "chào, xin chào (thân mật)" -> "chào, xin chào"
 * - "chúc ngủ ngon (trước khi đi ngủ)" -> "chúc ngủ ngon"
 * - "xin thứ lỗi, xin nhắc lại (khi chưa nghe rõ)" -> "xin thứ lỗi, xin nhắc lại"
 * - "(noun)" -> "noun"
 */
export function stripParentheses(text?: string | null): string {
  if (!text) return "";
  const cleaned = text.replace(/\s*\([^)]*\)/g, "").trim();
  if (cleaned.length > 0) return cleaned;
  // If the entire text was enclosed in parentheses, simply strip the parentheses chars
  return text.replace(/[()]/g, "").trim();
}

/**
 * Extracts a concise single vocabulary meaning in Vietnamese by stripping parentheses
 * and taking the primary meaning before multi-clause separators (commas, slashes, question/exclamation marks).
 */
export function extractConciseMeaning(text?: string | null): string {
  const withoutParens = stripParentheses(text);
  if (!withoutParens) return "";
  const primaryClause = withoutParens
    .split(/[,;/?!—–]+/)[0]
    ?.trim()
    .replace(/[.!?]+$/g, "")
    .trim();
  return primaryClause || withoutParens;
}

/**
 * Ensures an item is a pure vocabulary word (not a conversational sentence or clause).
 * Allows single words and 2-word compound nouns (like "ice cream", "bus stop"),
 * while rejecting conversational sentences, contractions ("you're welcome"), or 3+ word clauses.
 */
export function isPureVocabularyWord(item: { word?: string | null; pos?: string | null }): boolean {
  const w = (item.word || "").trim();
  if (!w) return false;
  const pos = (item.pos || "").toLowerCase().trim();
  if (pos === "phrase") return false;
  if (w.includes("'") || w.includes("’") || /[?.!]/.test(w)) return false;
  const tokens = w.split(/\s+/);
  return tokens.length <= 2;
}
