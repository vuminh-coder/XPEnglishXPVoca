import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { READING_PASSAGES_DATA } from "@/features/reading/data/readingMockData";

describe("Modular Reading Passages Architecture - Master Edition Compliance", () => {
  it("Test 1: verifies total passage count expanded to exactly 40 passages", () => {
    expect(READING_PASSAGES_DATA.length).toBe(40);
  });

  it("Test 2: verifies every passage exists in its own separate modular file", () => {
    const passagesDir = path.resolve(process.cwd(), "features/reading/data/passages");
    expect(fs.existsSync(passagesDir)).toBe(true);

    for (let i = 1; i <= 40; i++) {
      const filePath = path.join(passagesDir, `passage_r${i}.ts`);
      expect(fs.existsSync(filePath), `Missing file passage_r${i}.ts`).toBe(true);

      const content = fs.readFileSync(filePath, "utf8");
      expect(content).toContain(`export const passage_r${i}`);
      // Zero italics rule verification
      expect(content).not.toContain("italic");
    }
  });

  it("Test 3: verifies mathematical wordCount exactness & realistic duration alignment", () => {
    READING_PASSAGES_DATA.forEach((passage) => {
      const actualWords = passage.passage.trim().split(/\s+/).filter((w) => w.length > 0).length;
      expect(
        passage.wordCount,
        `Passage [${passage.id}] wordCount mismatch: declared ${passage.wordCount} vs actual ${actualWords}`
      ).toBe(actualWords);

      // Duration verification
      expect(passage.duration).toBeDefined();
      expect(passage.duration).toMatch(/^\d+\s+min$/);
      const minutes = parseInt(passage.duration!.split(" ")[0]);
      expect(minutes).toBeGreaterThanOrEqual(3);
      expect(minutes).toBeLessThanOrEqual(6);
    });
  });

  it("Test 4: verifies complete bilingual translation parity (paragraph-for-paragraph)", () => {
    READING_PASSAGES_DATA.forEach((passage) => {
      expect(passage.translation, `Passage [${passage.id}] is missing translation`).toBeDefined();
      expect(passage.translation!.trim().length).toBeGreaterThan(50);

      const passageParas = passage.passage.split("\n\n").filter((p) => p.trim().length > 0);
      const translationParas = passage.translation!.split("\n\n").filter((p) => p.trim().length > 0);

      expect(
        translationParas.length,
        `Passage [${passage.id}] "${passage.title}" paragraph mismatch: English has ${passageParas.length} paras, but Vietnamese translation has ${translationParas.length} paras`
      ).toBe(passageParas.length);

      // Translation length ratio should be reasonable (at least 70% of original English length)
      const ratio = passage.translation!.length / passage.passage.length;
      expect(
        ratio,
        `Passage [${passage.id}] translation length ratio (${ratio.toFixed(2)}) is unusually low!`
      ).toBeGreaterThanOrEqual(0.7);
    });
  });

  it("Test 5: verifies vocabulary richness (>= 4 high-yield items, IPA wrapped, valid POS)", () => {
    READING_PASSAGES_DATA.forEach((passage) => {
      expect(passage.vocabularies, `Passage [${passage.id}] is missing vocabularies`).toBeDefined();
      expect(
        passage.vocabularies!.length,
        `Passage [${passage.id}] has fewer than 4 vocabulary items (${passage.vocabularies!.length})`
      ).toBeGreaterThanOrEqual(4);

      passage.vocabularies!.forEach((v) => {
        expect(v.word.trim().length).toBeGreaterThan(0);
        expect(v.meaning.trim().length).toBeGreaterThan(0);

        // IPA verification
        expect(v.ipa, `Passage [${passage.id}] word "${v.word}" missing IPA`).toBeDefined();
        expect(v.ipa!.startsWith("/"), `Passage [${passage.id}] word "${v.word}" IPA must start with '/'`).toBe(true);
        expect(v.ipa!.endsWith("/"), `Passage [${passage.id}] word "${v.word}" IPA must end with '/'`).toBe(true);

        // POS verification
        expect(v.pos, `Passage [${passage.id}] word "${v.word}" missing POS`).toBeDefined();
        expect(v.pos!.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("Test 6: verifies deep comprehension questions schema (5 questions, 4 options each, rich explanations)", () => {
    const idSet = new Set<string>();
    let totalQuestions = 0;

    READING_PASSAGES_DATA.forEach((passage, idx) => {
      // Unique ID check
      expect(passage.id).toBe(`r${idx + 1}`);
      expect(idSet.has(passage.id)).toBe(false);
      idSet.add(passage.id);

      // Exactly 5 deep questions per passage
      expect(passage.questions.length).toBe(5);
      totalQuestions += passage.questions.length;

      passage.questions.forEach((q) => {
        expect(q.id.trim().length).toBeGreaterThan(0);
        expect(q.text.trim().length).toBeGreaterThan(15);
        expect(q.options.length).toBe(4);
        expect(q.correct).toBeGreaterThanOrEqual(0);
        expect(q.correct).toBeLessThan(4);
        expect(q.explanation.trim().length).toBeGreaterThan(20);
      });
    });

    expect(totalQuestions).toBe(200);
  });
});
