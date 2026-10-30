import { describe, it, expect } from "vitest";
import { synthesizeThemeSentences, generateDistractorWords } from "@/features/games/utils/themeSentenceSynthesizer";
import {
  saveStageMatchedVocab,
  getStageMatchedVocab,
  resolveActiveRoadmapContext,
  getPureThemeVocabularyPool,
} from "@/features/roadmap/utils/roadmapVocabBridge";
import { UNIT_CURRICULUM_CONFIGS, CURATED_ROADMAP_STEPS } from "@/features/roadmap/data/curatedRoadmapPathway";
import { ALL_BASIC_VOCABULARY_THEMES, getBasicVocabulariesByTheme } from "@/features/vocabulary/data/topics";
import { partitionVocabularyPool } from "@/features/vocabulary/utils/vocabularyPartition";
import { isPureSingleWordItem, extractConciseMeaning } from "@/features/games/components/wordlink/WordLinkGame";
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

  it("never uses bare word definition as sentence translation when exampleTranslations is missing", () => {
    const vocabsWithoutTranslation: BasicVocabularyItem[] = [
      {
        id: "v1",
        word: "family",
        phonetic: "/ˈfæməli/",
        definition: "a group of people related",
        definitionVn: "gia đình",
        pos: "noun",
        difficulty: 1,
        frequency: 5,
        themeId: "t_basic_family",
        themeNameVn: "Gia đình",
        themeNameEn: "Family",
        examples: ["I love my family deeply."],
        // Note: exampleTranslations is omitted
      },
    ];

    const results = synthesizeThemeSentences(vocabsWithoutTranslation, {
      themeId: "t_basic_family",
      unitNumber: 5,
      targetCount: 3,
    });

    results.forEach((r) => {
      // Translation must never be the bare word definition "gia đình"
      expect(r.translationVn).not.toBe("gia đình");
      // All translations must be meaningful sentences (> 8 chars)
      expect(r.translationVn.length).toBeGreaterThan(8);
    });
  });

  it("generates natural grammatical sentences for various parts of speech (adverb, preposition, pronoun, vowel/plural noun)", () => {
    const diverseVocabs = [
      { word: "apple", pos: "noun", definitionVn: "quả táo" },
      { word: "clothes", pos: "noun", definitionVn: "quần áo" },
      { word: "quickly", pos: "adverb", definitionVn: "nhanh chóng" },
      { word: "under", pos: "preposition", definitionVn: "dưới" },
      { word: "them", pos: "pronoun", definitionVn: "họ" },
    ];

    const results = synthesizeThemeSentences(diverseVocabs as any, { targetCount: 5 });
    expect(results.length).toBe(5);

    // Verify noun vowel handling: if "This is ... apple" appears, it must be "an apple", never "a apple"
    const appleSentence = results.find((r) => r.word === "apple");
    if (appleSentence?.sentence.includes("apple")) {
      expect(appleSentence.sentence).not.toMatch(/\ba apple\b/i);
    }

    // Verify noun plural handling: "clothes" should not be "This is a clothes"
    const clothesSentence = results.find((r) => r.word === "clothes");
    if (clothesSentence?.sentence.includes("clothes")) {
      expect(clothesSentence.sentence).not.toMatch(/\bThis is a clothes\b/i);
    }

    // Verify all results have valid sentence translations
    results.forEach((r) => {
      expect(r.translationVn.length).toBeGreaterThan(0);
      expect(r.sentence.split(/\s+/).length).toBeGreaterThanOrEqual(3);
    });
  });

  it("partitions keyPhrases across Part 1 and Part 2 and generates natural templates for time/personal nouns", () => {
    const timeAndPersonalVocabs = [
      { id: "v_morning", word: "morning", pos: "noun", definitionVn: "buổi sáng" },
      { id: "v_name", word: "name", pos: "noun", definitionVn: "tên" },
    ];

    const resPart1 = synthesizeThemeSentences(timeAndPersonalVocabs as any, {
      themeId: "t_basic_greetings",
      unitNumber: 1,
      part: 1,
      totalParts: 2,
      targetCount: 4,
    });

    expect(resPart1.length).toBe(4);
    const morningSentence = resPart1.find((r) => r.word === "morning");
    if (morningSentence) {
      expect(morningSentence.sentence).not.toContain("I can see the morning");
      expect(morningSentence.vocabId).toBe("v_morning");
    }
  });

  it("bridges Stage 2 matched words 1-to-1 into Stage 3 sentences and generates 3-4 non-overlapping distractors", () => {
    const pool: any[] = [
      { id: "v_hello", word: "hello", pos: "interjection", definitionVn: "xin chào", examples: ["Hello, my friend, how are you?"], exampleTranslations: ["Xin chào bạn của tôi, bạn khỏe không?"] },
      { id: "v_goodbye", word: "goodbye", pos: "interjection", definitionVn: "tạm biệt", examples: ["She said goodbye to everyone today."], exampleTranslations: ["Cô ấy đã nói lời tạm biệt với mọi người hôm nay."] },
      { id: "v_sorry", word: "sorry", pos: "adjective", definitionVn: "xin lỗi, tôi rất tiếc", examples: ["I am very sorry for being late."], exampleTranslations: ["Tôi rất xin lỗi vì đã đến muộn."] },
      { id: "v_please", word: "please", pos: "adverb", definitionVn: "làm ơn", examples: ["Please sit down and relax here."], exampleTranslations: ["Làm ơn hãy ngồi xuống và thư giãn ở đây."] },
      { id: "v_thanks", word: "thanks", pos: "noun", definitionVn: "cảm ơn" },
      { id: "v_welcome", word: "welcome", pos: "adjective", definitionVn: "chào đón" },
    ];

    // Save Stage 2 matched words (with "v_sorry" as a mistake so it gets prioritized first)
    saveStageMatchedVocab({
      themeId: "t_basic_greetings",
      unitNumber: 1,
      part: 1,
      matchedIds: ["v_hello", "v_goodbye", "v_sorry", "v_please"],
      matchedWords: ["hello", "goodbye", "sorry", "please"],
      mistakeIds: ["v_sorry"],
    });

    const bridged = getStageMatchedVocab({
      themeId: "t_basic_greetings",
      unitNumber: 1,
      part: 1,
    });

    expect(bridged.priorityVocabIds[0]).toBe("v_sorry");
    expect(bridged.priorityVocabIds).toEqual(["v_sorry", "v_hello", "v_goodbye", "v_please"]);

    const results = synthesizeThemeSentences(pool, {
      themeId: "t_basic_greetings",
      unitNumber: 1,
      part: 1,
      totalParts: 2,
      targetCount: 5,
      priorityVocabIds: bridged.priorityVocabIds,
      priorityWords: bridged.priorityWords,
    });

    expect(results.length).toBe(5);
    // First 4 sentences must correspond 1-to-1 with the 4 Stage 2 words
    const resultVocabIds = results.slice(0, 4).map((r) => r.vocabId);
    expect(resultVocabIds).toEqual(["v_sorry", "v_hello", "v_goodbye", "v_please"]);

    // Every sentence must include 3-4 distractor tokens that do NOT appear in the target sentence
    results.forEach((item) => {
      const distractors = item.distractors || [];
      expect(distractors.length).toBeGreaterThanOrEqual(3);
      expect(distractors.length).toBeLessThanOrEqual(4);
      const sentenceTokens = new Set(
        item.sentence
          .replace(/[.?!,;:]/g, "")
          .split(/\s+/)
          .map((t) => t.toLowerCase())
      );
      distractors.forEach((d) => {
        expect(sentenceTokens.has(d.toLowerCase())).toBe(false);
      });
    });

    const directDistractors = generateDistractorWords("I am very sorry for being late.", pool, "sorry", 4);
    expect(directDistractors.length).toBe(4);
  });

  it("filters out multi-word sentences/phrases in WordLinkGame and extracts concise single Vietnamese meanings", () => {
    expect(isPureSingleWordItem({ word: "goodbye", pos: "interjection" })).toBe(true);
    expect(isPureSingleWordItem({ word: "sorry", pos: "adjective" })).toBe(true);
    expect(isPureSingleWordItem({ word: "you're welcome", pos: "phrase" })).toBe(false);
    expect(isPureSingleWordItem({ word: "how are you", pos: "phrase" })).toBe(false);
    expect(isPureSingleWordItem({ word: "good night", pos: "phrase" })).toBe(false);

    expect(extractConciseMeaning("xin lỗi, tôi rất tiếc")).toBe("Xin lỗi");
    expect(extractConciseMeaning("này, chào nhé (thân mật)")).toBe("Này");
    expect(extractConciseMeaning("cạn ly! / cảm ơn nhé / tạm biệt nhé")).toBe("Cạn ly");
    expect(extractConciseMeaning("sô-cô-la")).toBe("Sô-cô-la");
    expect(extractConciseMeaning("xe tắc-xi")).toBe("Xe tắc-xi");
    expect(extractConciseMeaning("vi-ta-min")).toBe("Vi-ta-min");
  });

  it("verifies zero duplicate words across 60 themes, zero duplicate meanings per Part, and valid 3-12 word examples across all 24 units", () => {
    for (const theme of ALL_BASIC_VOCABULARY_THEMES) {
      const vocabs = getBasicVocabulariesByTheme(theme.id);
      const seenWords = new Set<string>();
      for (const v of vocabs) {
        const w = v.word.toLowerCase().trim();
        expect(seenWords.has(w), `Duplicate word "${w}" in theme ${theme.id}`).toBe(false);
        seenWords.add(w);
      }
    }

    for (const unit of UNIT_CURRICULUM_CONFIGS) {
      const pool = getPureThemeVocabularyPool(unit.themeId);
      const vocabStep = CURATED_ROADMAP_STEPS.find(
        (s) => s.unitNumber === unit.unitNumber && s.skillType === "VOCAB"
      );
      expect(vocabStep?.totalTargetWords).toBe(pool.length);
      expect(unit.objectives[0]).toContain(`${pool.length}`);

      for (const part of [1, 2]) {
        const { items } = partitionVocabularyPool(pool, { part, totalParts: 2 });
        const seenMeanings = new Set<string>();
        for (const item of items) {
          const concise = extractConciseMeaning(item.definitionVn).toLowerCase();
          expect(
            seenMeanings.has(concise),
            `Duplicate concise meaning "${concise}" in Unit ${unit.unitNumber} Part ${part}`
          ).toBe(false);
          seenMeanings.add(concise);
          expect(concise.split(/\s+/).length, `Too verbose meaning "${concise}" for "${item.word}"`).toBeLessThanOrEqual(7);

          const hasValidExample = (item.examples || []).some((ex) => {
            const wc = ex.trim().split(/\s+/).length;
            return wc >= 3 && wc <= 12;
          });
          expect(hasValidExample, `Missing 3-12 word example for "${item.word}" in Unit ${unit.unitNumber}`).toBe(true);
        }
      }
    }
  });

  it("aligns data across all 4 pages (Roadmap, Practice, Word Link, Sentence Builder) with cumulative mistake bridging and identical partitions", () => {
    // 1. Verify all 24 Roadmap units return non-empty pure vocabulary pools with identical Part 1 & Part 2 partitions
    expect(UNIT_CURRICULUM_CONFIGS.length).toBe(24);
    for (const unit of UNIT_CURRICULUM_CONFIGS) {
      const pool = getPureThemeVocabularyPool(unit.themeId);
      expect(pool.length).toBeGreaterThanOrEqual(20);
      pool.forEach((v) => {
        expect(v.pos).not.toBe("phrase");
        expect(v.word.trim().split(/\s+/).length).toBeLessThanOrEqual(2);
      });

      const part1 = partitionVocabularyPool(pool, { part: 1, totalParts: 2 });
      const part2 = partitionVocabularyPool(pool, { part: 2, totalParts: 2 });
      expect(part1.items.length + part2.items.length).toBe(pool.length);
      expect(part1.items.length).toBeGreaterThanOrEqual(4);
      expect(part2.items.length).toBeGreaterThanOrEqual(4);
    }

    // 2. Verify resolveActiveRoadmapContext for both explicit URL params and direct Sidebar navigation
    const explicitCtx = resolveActiveRoadmapContext({
      themeId: "t_basic_numbers",
      unit: null,
      part: "2",
      totalParts: "2",
      skillType: "MATCH",
    });
    expect(explicitCtx).toEqual({
      themeId: "t_basic_numbers",
      unitNumber: 3,
      part: 2,
      totalParts: 2,
      isExplicitUrl: true,
    });

    const fallbackCtx = resolveActiveRoadmapContext({
      themeId: null,
      unit: null,
      part: null,
      totalParts: null,
      skillType: "SENTENCE",
    });
    expect(fallbackCtx.themeId).toBeDefined();
    expect(fallbackCtx.unitNumber).toBeGreaterThanOrEqual(1);
    expect(fallbackCtx.isExplicitUrl).toBe(false);

    // 3. Verify cumulative mistake bridging: Stage 1 (Practice) -> Stage 2 (Word Link) -> Stage 3 (Sentence Builder)
    saveStageMatchedVocab({
      themeId: "t_basic_numbers",
      unitNumber: 3,
      part: 1,
      matchedIds: ["n1", "n2", "n3", "n4", "n5", "n6"],
      matchedWords: ["one", "two", "three", "four", "five", "six"],
      mistakeIds: ["n2"],
    });

    // Stage 2 finishes with a new mistake "n4", merging with Stage 1 mistake "n2"
    saveStageMatchedVocab({
      themeId: "t_basic_numbers",
      unitNumber: 3,
      part: 1,
      matchedIds: ["n2", "n3", "n4", "n5"],
      matchedWords: ["two", "three", "four", "five"],
      mistakeIds: ["n4"],
      mergeExistingMistakes: true,
    });

    const afterStage2 = getStageMatchedVocab({
      themeId: "t_basic_numbers",
      unitNumber: 3,
      part: 1,
    });
    expect(afterStage2.mistakeIds).toEqual(["n4", "n2"]);
    expect(afterStage2.priorityVocabIds.slice(0, 2)).toEqual(["n4", "n2"]);
  });
});
