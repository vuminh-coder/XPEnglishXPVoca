import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { READING_PASSAGES_DATA } from "@/features/reading/data/readingMockData";

describe("Modular Reading Passages Architecture", () => {
  it("verifies total passage count expanded to 40 passages", () => {
    expect(READING_PASSAGES_DATA.length).toBe(40);
  });

  it("verifies every passage exists in its own separate modular file", () => {
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

  it("verifies data integrity, unique IDs, and question schema across all 40 passages", () => {
    const idSet = new Set<string>();

    READING_PASSAGES_DATA.forEach((passage, idx) => {
      // 1. Unique ID
      expect(passage.id).toBe(`r${idx + 1}`);
      expect(idSet.has(passage.id)).toBe(false);
      idSet.add(passage.id);

      // 2. Metadata completeness
      expect(passage.title.trim().length).toBeGreaterThan(0);
      expect(passage.category.trim().length).toBeGreaterThan(0);
      expect(passage.level).toBeDefined();
      expect(passage.wordCount).toBeGreaterThan(0);
      expect(passage.passage.trim().length).toBeGreaterThan(50);
      expect(passage.translation?.trim().length).toBeGreaterThan(50);

      // 3. Questions schema (Each passage has at least 5 deep comprehension questions)
      expect(passage.questions.length).toBeGreaterThanOrEqual(5);
      passage.questions.forEach((q) => {
        expect(q.id.trim().length).toBeGreaterThan(0);
        expect(q.text.trim().length).toBeGreaterThan(0);
        expect(q.options.length).toBeGreaterThanOrEqual(4);
        expect(q.correct).toBeGreaterThanOrEqual(0);
        expect(q.correct).toBeLessThan(q.options.length);
        expect(q.explanation.trim().length).toBeGreaterThan(0);
      });

      // 4. Vocabularies
      expect(passage.vocabularies).toBeDefined();
      expect(passage.vocabularies?.length).toBeGreaterThanOrEqual(2);
      passage.vocabularies?.forEach((v) => {
        expect(v.word.trim().length).toBeGreaterThan(0);
        expect(v.meaning.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
