import { describe, it, expect } from "vitest";
import { lookupWordDeep } from "@/features/vocabulary/data/deepDictionary";
import { READING_PASSAGES_DATA } from "@/features/reading/data/readingMockData";

describe("Reading Studio Deep Dictionary Engine Suite", () => {
  it("resolves deep lexical details for common English words in passages", () => {
    const attentionWord = lookupWordDeep("attention");
    expect(attentionWord.word.toLowerCase()).toBe("attention");
    expect(attentionWord.ipa).toBeTruthy();
    expect(attentionWord.pos).toContain("Danh từ");
    expect(attentionWord.meaning).toBeTruthy();
    expect(attentionWord.detailMeaning).toBeTruthy();
    expect(attentionWord.collocations).toBeDefined();
    expect(attentionWord.collocations?.length).toBeGreaterThan(0);
    expect(attentionWord.synonyms).toBeDefined();
    expect(attentionWord.synonyms?.length).toBeGreaterThan(0);
  });

  it("handles morphological inflections and stemming (plurals, past tense, adverbs)", () => {
    const pluralDef = lookupWordDeep("employees");
    expect(pluralDef.word.toLowerCase()).toBe("employees");
    expect(pluralDef.meaning).toBeTruthy();

    const adverbDef = lookupWordDeep("quickly");
    expect(adverbDef.pos).toContain("từ");
  });

  it("ensures all passage key vocabularies have rich definitions", () => {
    READING_PASSAGES_DATA.slice(0, 10).forEach((passage) => {
      if (passage.vocabularies) {
        passage.vocabularies.forEach((v) => {
          expect(v.word).toBeTruthy();
          expect(v.meaning).toBeTruthy();
          const deep = lookupWordDeep(v.word);
          expect(deep.word).toBeTruthy();
          expect(deep.ipa).toBeTruthy();
        });
      }
    });
  });
});
