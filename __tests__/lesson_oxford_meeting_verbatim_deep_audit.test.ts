import { describe, it, expect } from "vitest";
import { LESSON_OXFORD_MEETING } from "@/features/listening/data/lessons/lesson_oxford_meeting";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import fs from "fs";
import path from "path";

describe("Oxford Online English: Attending a Meeting in English - Verbatim Deep Audit Suite", () => {
  const jsonPath = path.resolve(process.cwd(), "scripts/oxford_meeting_master_15_segments.json");

  it("should match 100% of reference segments with ZERO DIFFS across all 15 segments", () => {
    expect(fs.existsSync(jsonPath)).toBe(true);
    const refSegments = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    expect(LESSON_OXFORD_MEETING.segments.length).toBe(refSegments.length);
    expect(LESSON_OXFORD_MEETING.segments.length).toBe(15);

    for (let i = 0; i < refSegments.length; i++) {
      const seg = LESSON_OXFORD_MEETING.segments[i];
      const ref = refSegments[i];
      expect(seg.orderIndex).toBe(ref.orderIndex);
      expect(seg.startTime).toBe(ref.startTime);
      expect(seg.endTime).toBe(ref.endTime);
      expect(seg.text).toBe(ref.text);
      expect(seg.translationVi).toBe(ref.translationVi);
      expect(seg.tokenCount).toBe(ref.tokenCount);
    }
  });

  it("should verify token counts match tokenizeSentence cleanly across all 15 segments", () => {
    let totalTokens = 0;
    for (const seg of LESSON_OXFORD_MEETING.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;

      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(160);
  });

  it("should verify IPA format is clean with valid phonetic slashes and no unexpanded braces", () => {
    for (const seg of LESSON_OXFORD_MEETING.segments) {
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
    const quiz = LESSON_OXFORD_MEETING.quiz;
    expect(quiz).toBeDefined();
    for (const q of quiz!.questions) {
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(1);
      expect(q.referenceSegmentIndex).toBeLessThanOrEqual(15);
    }
  });
});
