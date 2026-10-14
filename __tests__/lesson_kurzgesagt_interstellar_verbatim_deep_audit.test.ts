import { describe, it, expect } from "vitest";
import { LESSON_KURZGESAGT_INTERSTELLAR } from "@/features/listening/data/lessons/lesson_kurzgesagt_interstellar";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import fs from "fs";
import path from "path";

describe("Kurzgesagt: How to Win an Interstellar War - Verbatim Deep Audit Suite", () => {
  const jsonPath = path.resolve(process.cwd(), "scripts/kurzgesagt_master_58_segments.json");

  it("should match 100% of reference segments with ZERO DIFFS across all 58 segments", () => {
    expect(fs.existsSync(jsonPath)).toBe(true);
    const refSegments = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    expect(LESSON_KURZGESAGT_INTERSTELLAR.segments.length).toBe(refSegments.length);
    expect(LESSON_KURZGESAGT_INTERSTELLAR.segments.length).toBe(58);

    for (let i = 0; i < refSegments.length; i++) {
      const seg = LESSON_KURZGESAGT_INTERSTELLAR.segments[i];
      const ref = refSegments[i];
      expect(seg.orderIndex).toBe(ref.orderIndex);
      expect(seg.startTime).toBe(ref.startTime);
      expect(seg.endTime).toBe(ref.endTime);
      expect(seg.text).toBe(ref.text);
      expect(seg.translationVi).toBe(ref.translationVi);
      expect(seg.tokenCount).toBe(ref.tokenCount);
    }
  });

  it("should verify token counts match tokenizeSentence perfectly across all 58 segments", () => {
    let totalTokens = 0;
    for (const seg of LESSON_KURZGESAGT_INTERSTELLAR.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;

      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBe(765);
  });

  it("should verify IPA format is clean with valid phonetic slashes and no unexpanded braces", () => {
    for (const seg of LESSON_KURZGESAGT_INTERSTELLAR.segments) {
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
    const quiz = LESSON_KURZGESAGT_INTERSTELLAR.quiz;
    expect(quiz).toBeDefined();
    for (const q of quiz!.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(58);
      const targetSeg = LESSON_KURZGESAGT_INTERSTELLAR.segments.find(
        (s) => s.orderIndex === q.referenceSegmentIndex
      );
      expect(targetSeg).toBeDefined();
    }
  });

  it("should verify CEFR B2 level and duration of 286 seconds (04:46)", () => {
    expect(LESSON_KURZGESAGT_INTERSTELLAR.durationSeconds).toBe(286);
    expect(LESSON_KURZGESAGT_INTERSTELLAR.durationFormatted).toBe("04:46");
    expect(LESSON_KURZGESAGT_INTERSTELLAR.cefrLevel).toBe("B2");
    expect(LESSON_KURZGESAGT_INTERSTELLAR.accent).toBe("en-US");
    expect(LESSON_KURZGESAGT_INTERSTELLAR.categoryId).toBe("cat_science_tech");
  });
});
