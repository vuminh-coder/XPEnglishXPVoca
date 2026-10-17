import { describe, it, expect } from "vitest";
import { stripParentheses } from "@/features/practice/utils/cleanText";

describe("stripParentheses Utility for Practice Studio", () => {
  it("should handle null and undefined gracefully", () => {
    expect(stripParentheses(null)).toBe("");
    expect(stripParentheses(undefined)).toBe("");
    expect(stripParentheses("")).toBe("");
  });

  it("should strip parenthetical annotations at the end of definitions", () => {
    expect(stripParentheses("xin chào (thông dụng và thân thiện nhất)")).toBe("xin chào");
    expect(stripParentheses("chào, xin chào (thân mật)")).toBe("chào, xin chào");
    expect(stripParentheses("chúc ngủ ngon (trước khi đi ngủ)")).toBe("chúc ngủ ngon");
    expect(stripParentheses("xin thứ lỗi, xin nhắc lại (khi chưa nghe rõ)")).toBe("xin thứ lỗi, xin nhắc lại");
  });

  it("should strip parenthetical annotations in the middle of sentences", () => {
    expect(stripParentheses("từ này (rất thông dụng) mang nghĩa là chào")).toBe("từ này mang nghĩa là chào");
  });

  it("should preserve text when wholly enclosed in parentheses by stripping only outer parentheses chars", () => {
    expect(stripParentheses("(noun)")).toBe("noun");
    expect(stripParentheses("(verb)")).toBe("verb");
    expect(stripParentheses("(adj.)")).toBe("adj.");
  });

  it("should handle strings without parentheses untouched", () => {
    expect(stripParentheses("chào buổi sáng")).toBe("chào buổi sáng");
    expect(stripParentheses("good morning")).toBe("good morning");
  });
});
