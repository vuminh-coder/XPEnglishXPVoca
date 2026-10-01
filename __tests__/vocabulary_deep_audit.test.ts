import { describe, it, expect } from "vitest";
import {
  BASIC_VOCABULARY_THEMES,
  BASIC_VOCABULARIES,
  getBasicVocabulariesByTheme,
} from "@/features/vocabulary/data/basicVocabularies";
import {
  ADVANCED_VOCABULARY_THEMES,
  getAdvancedVocabulariesByTheme,
} from "@/features/vocabulary/data/advancedVocabularies";

describe("Comprehensive Vocabulary Bank & Thematic Depth Audit Suite", () => {
  it("verifies all 10 priority advanced themes (t146-t155) have at least 35 words with academic depth", () => {
    const priorityThemes = [
      { id: "t146", nameEn: "AI & IT Engineering" },
      { id: "t147", nameEn: "Healthcare & Medical Sciences" },
      { id: "t148", nameEn: "Finance, Banking & Investment" },
      { id: "t149", nameEn: "Law, Jurisprudence & Legal Systems" },
      { id: "t150", nameEn: "Environment & Climate Change" },
      { id: "t151", nameEn: "Digital Marketing & Communications" },
      { id: "t152", nameEn: "Tourism, Hospitality & Aviation" },
      { id: "t153", nameEn: "Science & Scientific Research" },
      { id: "t154", nameEn: "Art, Aesthetics & Design" },
      { id: "t155", nameEn: "Professional Sports & Athletics" },
    ];

    for (const theme of priorityThemes) {
      const vocabs = getAdvancedVocabulariesByTheme(theme.id);
      expect(vocabs.length).toBeGreaterThanOrEqual(35);

      // Verify each word has genuine IPA phonetic, rigorous definitions, and real contextual examples
      for (const item of vocabs) {
        expect(item.id).toMatch(new RegExp(`^v_${theme.id}_`));
        expect(item.word.trim().length).toBeGreaterThan(1);
        expect(item.phonetic).toMatch(/^\/.*\/$/);
        // Ensure no dummy phonetic like /algorithm/ without IPA stress/vowel marks
        expect(item.phonetic).not.toBe(`/${item.word}/`);
        expect(item.definition.length).toBeGreaterThan(15);
        expect(item.definitionVn.length).toBeGreaterThan(3);
        expect(item.examples.length).toBeGreaterThanOrEqual(2);
        // Ensure no empty dummy sentences
        for (const ex of item.examples) {
          expect(ex).not.toContain("How do you use the word");
          expect(ex.length).toBeGreaterThan(20);
        }
        if (item.exampleTranslations) {
          expect(item.exampleTranslations.length).toBeGreaterThanOrEqual(2);
          for (const vn of item.exampleTranslations) {
            expect(vn.length).toBeGreaterThan(10);
          }
        }
        expect(Array.isArray(item.synonyms)).toBe(true);
      }
    }
  });

  it("verifies colors & shades theme (t11) has expanded depth of at least 30 words", () => {
    const vocabs = getAdvancedVocabulariesByTheme("t11");
    expect(vocabs.length).toBeGreaterThanOrEqual(30);

    const words = vocabs.map((v) => v.word.toLowerCase());
    expect(words).toContain("monochromatic");
    expect(words).toContain("iridescent");
    expect(words).toContain("luminescent");
    expect(words).toContain("translucent");
    expect(words).toContain("opaque");
  });

  it("verifies basic vocabulary bank reaches nearly 1,300+ items with rich bilingual context", () => {
    expect(BASIC_VOCABULARIES.length).toBeGreaterThanOrEqual(1280);

    // Verify key enriched themes now have at least 25 words
    const enrichedBasicThemes = [
      "t_basic_family",
      "t_basic_clothes",
      "t_basic_weather_nature",
      "t_basic_jobs_occupations",
      "t_basic_transportation",
      "t_basic_school_stationery",
      "t_basic_hobbies_sports",
      "t_basic_shopping_money",
      "t_basic_plants_fruits",
      "t_basic_kitchen_utensils",
    ];

    for (const themeId of enrichedBasicThemes) {
      const vocabs = getBasicVocabulariesByTheme(themeId);
      expect(vocabs.length).toBeGreaterThanOrEqual(25);
    }
  });

  it("verifies ZERO duplicate vocabulary IDs across both basic and advanced banks", () => {
    const basicIds = new Set<string>();
    for (const v of BASIC_VOCABULARIES) {
      expect(basicIds.has(v.id)).toBe(false);
      basicIds.add(v.id);
    }

    const advIds = new Set<string>();
    for (const v of ADVANCED_VOCABULARY_THEMES) {
      const themeVocabs = getAdvancedVocabulariesByTheme(v.id);
      for (const item of themeVocabs) {
        expect(advIds.has(item.id)).toBe(false);
        advIds.add(item.id);
      }
    }
  });

  it("verifies totalVocabs in theme metadata accurately reflects actual word counts", () => {
    for (const theme of ADVANCED_VOCABULARY_THEMES) {
      const actualCount = getAdvancedVocabulariesByTheme(theme.id).length;
      if (["t146", "t147", "t148", "t149", "t150", "t151", "t152", "t153", "t154", "t155"].includes(theme.id)) {
        expect(theme.totalVocabs).toBe(35);
        expect(actualCount).toBe(35);
      } else if (theme.id === "t11") {
        expect(theme.totalVocabs).toBe(30);
        expect(actualCount).toBe(30);
      }
    }

    for (const theme of BASIC_VOCABULARY_THEMES) {
      const actualCount = getBasicVocabulariesByTheme(theme.id).length;
      expect(actualCount).toBeGreaterThanOrEqual(theme.totalVocabs);
    }
  });
});
