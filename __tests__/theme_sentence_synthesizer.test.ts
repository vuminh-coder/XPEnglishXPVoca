import { describe, it, expect } from "vitest";
import { synthesizeThemeSentences } from "@/features/games/utils/themeSentenceSynthesizer";
import { BasicVocabularyItem } from "@/features/vocabulary/data/types";

describe("themeSentenceSynthesizer utility", () => {
  it("extracts sentences from valid vocabulary examples (Tier 1)", () => {
    const mockVocabs: BasicVocabularyItem[] = [
      {
        id: "v1",
        word: "morning",
        phonetic: "/m/",
        definition: "early part of day",
        definitionVn: "buổi sáng",
        pos: "noun",
        difficulty: 1,
        frequency: 5,
        themeId: "t_basic_greetings",
        themeNameVn: "Chào hỏi",
        themeNameEn: "Greetings",
        examples: ["Good morning to all my friends."],
        exampleTranslations: ["Chào buổi sáng tất cả các bạn."],
      },
      {
        id: "v2",
        word: "afternoon",
        phonetic: "/a/",
        definition: "middle part of day",
        definitionVn: "buổi chiều",
        pos: "noun",
        difficulty: 1,
        frequency: 5,
        themeId: "t_basic_greetings",
        themeNameVn: "Chào hỏi",
        themeNameEn: "Greetings",
        examples: ["Good afternoon and welcome here."],
        exampleTranslations: ["Chào buổi chiều và chào mừng bạn."],
      },
    ];

    const results = synthesizeThemeSentences(mockVocabs, {
      themeId: "t_basic_greetings",
      targetCount: 5,
    });

    expect(results.length).toBe(5);
    // Should include example sentences
    const sentences = results.map((r) => r.sentence);
    expect(sentences.some((s) => s.includes("morning") || s.includes("afternoon"))).toBe(true);
  });

  it("falls back to Tier 2 (keyPhrases) and Tier 3 (synthesized) when words have no examples", () => {
    // Vocabs with empty examples
    const emptyExampleVocabs: BasicVocabularyItem[] = [
      {
        id: "v1",
        word: "apple",
        phonetic: "/æ/",
        definition: "a fruit",
        definitionVn: "quả táo",
        pos: "noun",
        difficulty: 1,
        frequency: 5,
        themeId: "t_custom",
        themeNameVn: "Táo",
        themeNameEn: "Apples",
        examples: [],
      },
      {
        id: "v2",
        word: "eat",
        phonetic: "/iːt/",
        definition: "to consume food",
        definitionVn: "ăn",
        pos: "verb",
        difficulty: 1,
        frequency: 5,
        themeId: "t_custom",
        themeNameVn: "Táo",
        themeNameEn: "Apples",
        examples: [],
      },
    ];

    const results = synthesizeThemeSentences(emptyExampleVocabs, {
      themeId: "t_custom",
      targetCount: 5,
    });

    expect(results.length).toBeGreaterThanOrEqual(2);
    // Verify synthesized sentences contain the target words
    const joined = results.map((r) => r.sentence).join(" ");
    expect(joined.includes("apple") || joined.includes("eat")).toBe(true);
    // Verify each result has translationVn
    results.forEach((r) => {
      expect(r.translationVn.length).toBeGreaterThan(0);
      expect(r.sentence.split(/\s+/).length).toBeGreaterThanOrEqual(3);
    });
  });

  it("extracts Unit keyPhrases for known units like Unit 1 (t_basic_greetings)", () => {
    const results = synthesizeThemeSentences([], {
      themeId: "t_basic_greetings",
      unitNumber: 1,
      targetCount: 4,
    });

    expect(results.length).toBe(4);
    const sentences = results.map((r) => r.sentence);
    // Key phrases of Unit 1 include "Nice to meet you", "How are you doing?", etc.
    expect(sentences.some((s) => s.includes("Nice to meet you") || s.includes("How are you"))).toBe(true);
  });
});
