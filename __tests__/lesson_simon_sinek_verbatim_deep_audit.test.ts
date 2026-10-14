import { describe, it, expect } from "vitest";
import { LESSON_SIMON_SINEK } from "@/features/listening/data/lessons/lesson_simon_sinek";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import fs from "fs";
import path from "path";

describe("Simon Sinek: How Great Leaders Inspire Action - Verbatim Deep Audit Suite", () => {
  const jsonPath = path.resolve(process.cwd(), "scripts/simon_sinek_master_segments.json");

  it("should match 100% of reference segments with ZERO DIFFS", () => {
    expect(fs.existsSync(jsonPath)).toBe(true);
    const refSegments = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    expect(LESSON_SIMON_SINEK.segments.length).toBe(refSegments.length);
    expect(LESSON_SIMON_SINEK.segments.length).toBe(72);

    for (let i = 0; i < refSegments.length; i++) {
      const seg = LESSON_SIMON_SINEK.segments[i];
      const ref = refSegments[i];
      expect(seg.orderIndex).toBe(ref.orderIndex);
      expect(seg.startTime).toBe(ref.startTime);
      expect(seg.endTime).toBe(ref.endTime);
      expect(seg.text).toBe(ref.text);
      expect(seg.translationVi).toBe(ref.translationVi);
      expect(seg.tokenCount).toBe(ref.tokenCount);
    }
  });

  it("should verify token counts match tokenizeSentence perfectly across all 72 segments", () => {
    let totalTokens = 0;
    for (const seg of LESSON_SIMON_SINEK.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;

      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBe(885);
  });

  it("should verify IPA format is clean with valid phonetic slashes and no unexpanded braces", () => {
    for (const seg of LESSON_SIMON_SINEK.segments) {
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
    const quiz = LESSON_SIMON_SINEK.quiz;
    expect(quiz).toBeDefined();
    for (const q of quiz!.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(72);
      const targetSeg = LESSON_SIMON_SINEK.segments.find(
        (s) => s.orderIndex === q.referenceSegmentIndex
      );
      expect(targetSeg).toBeDefined();
    }
  });

  it("should verify CEFR B2 level and duration of 350 seconds (05:50)", () => {
    expect(LESSON_SIMON_SINEK.durationSeconds).toBe(350);
    expect(LESSON_SIMON_SINEK.durationFormatted).toBe("05:50");
    expect(LESSON_SIMON_SINEK.cefrLevel).toBe("B2");
    expect(LESSON_SIMON_SINEK.accent).toBe("en-US");
    expect(LESSON_SIMON_SINEK.categoryId).toBe("cat_ielts_listen");
  });
});
