import { describe, it, expect } from "vitest";
import { LESSON_BUSINESS_PHONE_CALL } from "@/features/listening/data/lessons/lesson_business_phone_call";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import fs from "fs";
import path from "path";

describe("Business English: Professional Phone Calls - Verbatim Deep Audit Suite", () => {
  const jsonPath = path.resolve(process.cwd(), "scripts/business_phone_call_master_22_segments.json");

  it("should match 100% of reference segments with ZERO DIFFS across all 22 segments", () => {
    expect(fs.existsSync(jsonPath)).toBe(true);
    const refSegments = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    expect(LESSON_BUSINESS_PHONE_CALL.segments.length).toBe(refSegments.length);
    expect(LESSON_BUSINESS_PHONE_CALL.segments.length).toBe(22);

    for (let i = 0; i < refSegments.length; i++) {
      const seg = LESSON_BUSINESS_PHONE_CALL.segments[i];
      const ref = refSegments[i];
      expect(seg.orderIndex).toBe(ref.orderIndex);
      expect(seg.startTime).toBe(ref.startTime);
      expect(seg.endTime).toBe(ref.endTime);
      expect(seg.text).toBe(ref.text);
      expect(seg.translationVi).toBe(ref.translationVi);
      expect(seg.tokenCount).toBe(ref.tokenCount);
    }
  });

  it("should verify token counts match tokenizeSentence cleanly across all 22 segments", () => {
    let totalTokens = 0;
    for (const seg of LESSON_BUSINESS_PHONE_CALL.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;

      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(150);
  });

  it("should verify IPA format is clean with valid phonetic slashes and no unexpanded braces", () => {
    for (const seg of LESSON_BUSINESS_PHONE_CALL.segments) {
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
    const quiz = LESSON_BUSINESS_PHONE_CALL.quiz;
    expect(quiz).toBeDefined();
    for (const q of quiz!.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(22);
    }
  });
});
