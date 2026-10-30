import { describe, it, expect } from "vitest";
import {
  stripParentheses,
  extractConciseMeaning,
  isPureVocabularyWord,
} from "@/features/practice/utils/cleanText";
import { VOCABS_CHAO_HOI_GIAO_TIEP } from "@/features/vocabulary/data/topics/ChuDeChaoHoiGiaoTiep";

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

  it("should filter out conversational sentences/phrases and keep only pure vocabulary words in Practice Studio", () => {
    expect(isPureVocabularyWord({ word: "hello", pos: "interjection" })).toBe(true);
    expect(isPureVocabularyWord({ word: "morning", pos: "noun" })).toBe(true);
    expect(isPureVocabularyWord({ word: "you're welcome", pos: "phrase" })).toBe(false);
    expect(isPureVocabularyWord({ word: "how are you", pos: "phrase" })).toBe(false);
    expect(isPureVocabularyWord({ word: "nice to meet you", pos: "phrase" })).toBe(false);
    expect(isPureVocabularyWord({ word: "have a nice day", pos: "phrase" })).toBe(false);

    expect(extractConciseMeaning("xin lỗi, tôi rất tiếc")).toBe("xin lỗi");
    expect(extractConciseMeaning("cạn ly! / cảm ơn nhé / tạm biệt nhé")).toBe("cạn ly");

    // Verify all 30 items in Topic 1 (Chào hỏi & Giao tiếp) are pure vocabulary words
    expect(VOCABS_CHAO_HOI_GIAO_TIEP.length).toBe(30);
    VOCABS_CHAO_HOI_GIAO_TIEP.forEach((item) => {
      expect(isPureVocabularyWord(item)).toBe(true);
    });
  });
});
