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
