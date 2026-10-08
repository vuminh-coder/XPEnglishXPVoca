import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_JENSEN_HUANG } from "@/features/listening/data/lessons/lesson_jensen_huang";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Jensen Huang: Supercomputer in 19 Days - 100% Verbatim & Segment Audit", () => {
  it("should have exactly 10 segments with valid duration and metadata", () => {
    expect(LESSON_JENSEN_HUANG.segments.length).toBe(10);
    expect(LESSON_JENSEN_HUANG.externalId).toBe("lpLFjQ-bRv8");
    expect(LESSON_JENSEN_HUANG.durationSeconds).toBe(109);
    expect(LESSON_JENSEN_HUANG.cefrLevel).toBe("B2");
  });

  it("should have chronological timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_JENSEN_HUANG.segments.length; i++) {
      const seg = LESSON_JENSEN_HUANG.segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, and valid IPA transcriptions", () => {
    for (const seg of LESSON_JENSEN_HUANG.segments) {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.keywords!.length).toBeGreaterThan(0);
    }
  });

  it("should tokenize all 10 segments cleanly with zero empty tokens", () => {
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
    expect(totalTokens).toBeGreaterThan(150);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 10 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "lpLFjQ-bRv8");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(10);
    for (let i = 0; i < 10; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_JENSEN_HUANG.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_JENSEN_HUANG.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_JENSEN_HUANG.segments[i].endTime);
    }
  });
});
