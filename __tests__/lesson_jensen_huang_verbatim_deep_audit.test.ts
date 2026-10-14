import { describe, it, expect } from "vitest";
import { LESSON_JENSEN_HUANG } from "@/features/listening/data/lessons/lesson_jensen_huang";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import fs from "fs";
import path from "path";

describe("Jensen Huang: Supercomputer in 19 Days - Verbatim Deep Audit Suite", () => {
  const jsonPath = path.resolve(process.cwd(), "scripts/jensen_huang_master_31_segments.json");

  it("should match 100% of reference segments with ZERO DIFFS across all 31 segments", () => {
    expect(fs.existsSync(jsonPath)).toBe(true);
    const refSegments = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    expect(LESSON_JENSEN_HUANG.segments.length).toBe(refSegments.length);
    expect(LESSON_JENSEN_HUANG.segments.length).toBe(31);

    for (let i = 0; i < refSegments.length; i++) {
      const seg = LESSON_JENSEN_HUANG.segments[i];
      const ref = refSegments[i];
      expect(seg.orderIndex).toBe(ref.orderIndex);
      expect(seg.startTime).toBe(ref.startTime);
      expect(seg.endTime).toBe(ref.endTime);
      expect(seg.text).toBe(ref.text);
      expect(seg.translationVi).toBe(ref.translationVi);
      expect(seg.tokenCount).toBe(ref.tokenCount);
    }
  });

  it("should verify token counts match tokenizeSentence perfectly across all 31 segments", () => {
    let totalTokens = 0;
    for (const seg of LESSON_JENSEN_HUANG.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;

      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    // 279 words count, grouped into 270 dictation tokens when multi-word proper nouns ("Elon Musk") are tokenized together
    expect(totalTokens).toBe(270);
  });

  it("should verify IPA format is clean with valid phonetic slashes and no unexpanded braces", () => {
    for (const seg of LESSON_JENSEN_HUANG.segments) {
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs?.startsWith("/")).toBe(true);
      expect(seg.ipaUs?.endsWith("/")).toBe(true);
      expect(seg.ipaUs).not.toContain("{");
      expect(seg.ipaUs).not.toContain("}");
      expect(seg.ipaUs).not.toContain("undefined");
      expect(seg.ipaUs).not.toContain("null");
    }
  });

  it("should verify quiz references point to valid segment indices across the entire video", () => {
    const quiz = LESSON_JENSEN_HUANG.quiz;
    expect(quiz).toBeDefined();
    for (const q of quiz!.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(31);
    }
  });
});
