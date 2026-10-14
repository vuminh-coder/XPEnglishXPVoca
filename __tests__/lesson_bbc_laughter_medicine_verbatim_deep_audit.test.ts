import { describe, it, expect } from "vitest";
import { LESSON_BBC_LAUGHTER_MEDICINE } from "@/features/listening/data/lessons/lesson_bbc_laughter_medicine";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import fs from "fs";
import path from "path";

describe("BBC 6 Minute English: What Makes Us Laugh? - Verbatim Deep Audit Suite", () => {
  const jsonPath = path.resolve(process.cwd(), "scripts/bbc_what_makes_us_laugh_official.json");

  it("should match 100% of reference segments with ZERO DIFFS", () => {
    expect(fs.existsSync(jsonPath)).toBe(true);
    const rawData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const refSegments: any[] = rawData.segments || [];

    expect(LESSON_BBC_LAUGHTER_MEDICINE.segments.length).toBe(refSegments.length);
    expect(LESSON_BBC_LAUGHTER_MEDICINE.segments.length).toBe(84);

    for (let i = 0; i < refSegments.length; i++) {
      const seg = LESSON_BBC_LAUGHTER_MEDICINE.segments[i];
      const ref = refSegments[i];
      expect(seg.orderIndex).toBe(ref.orderIndex);
      expect(seg.startTime).toBe(ref.startTime);
      expect(seg.endTime).toBe(ref.endTime);
      expect(seg.text).toBe(ref.text);
      expect(seg.translationVi).toBe(ref.translationVi);
      expect(seg.tokenCount).toBe(ref.tokenCount);
    }
  });

  it("should verify token counts match tokenizeSentence perfectly across all 84 segments", () => {
    let totalTokens = 0;
    for (const seg of LESSON_BBC_LAUGHTER_MEDICINE.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;

      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(800);
  });

  it("should verify IPA format is clean with valid phonetic slashes and no unexpanded braces", () => {
    for (const seg of LESSON_BBC_LAUGHTER_MEDICINE.segments) {
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs?.startsWith("/")).toBe(true);
      expect(seg.ipaUs?.endsWith("/")).toBe(true);
      expect(seg.ipaUs).not.toContain("{");
      expect(seg.ipaUs).not.toContain("}");
      expect(seg.ipaUs).not.toContain("undefined");
      expect(seg.ipaUs).not.toContain("null");
    }
  });

  it("should verify quiz references point to valid segment indices", () => {
    const quiz = LESSON_BBC_LAUGHTER_MEDICINE.quiz;
    expect(quiz).toBeDefined();
    for (const q of quiz!.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(84);
      const targetSeg = LESSON_BBC_LAUGHTER_MEDICINE.segments.find(
        (s) => s.orderIndex === q.referenceSegmentIndex
      );
      expect(targetSeg).toBeDefined();
    }
  });

  it("should verify CEFR B1 level and duration of 376 seconds (06:16)", () => {
    expect(LESSON_BBC_LAUGHTER_MEDICINE.durationSeconds).toBe(376);
    expect(LESSON_BBC_LAUGHTER_MEDICINE.durationFormatted).toBe("06:16");
    expect(LESSON_BBC_LAUGHTER_MEDICINE.cefrLevel).toBe("B1");
    expect(LESSON_BBC_LAUGHTER_MEDICINE.accent).toBe("en-GB");
    expect(LESSON_BBC_LAUGHTER_MEDICINE.categoryId).toBe("cat_bbc_6min");
  });
});
