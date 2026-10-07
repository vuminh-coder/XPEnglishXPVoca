import { describe, it, expect } from "vitest";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Anne-Marie & James Arthur: Rewrite The Stars 100% Verbatim Calibration Test Suite", () => {
  const rtsLesson = MOCK_VIDEO_LESSONS.find(
    (l) => l.id === "ff4c64b7-ea82-4963-a4f6-1ff808d929e6" || l.externalId === "pRfmrE0ToTo"
  );

  it("should find the Rewrite The Stars lesson in the catalog mock", () => {
    expect(rtsLesson).toBeDefined();
    expect(rtsLesson?.externalId).toBe("pRfmrE0ToTo");
    expect(rtsLesson?.title).toContain("Rewrite The Stars");
  });

  it("should have exactly 18 calibrated verbatim segments", () => {
    expect(rtsLesson?.segments).toBeDefined();
    expect(rtsLesson?.segments?.length).toBe(18);
  });

  it("should verify Sentence 1 starts with James Arthur vocals at 0.80s and exact lyrics", () => {
    const firstSegment = rtsLesson?.segments?.[0];
    expect(firstSegment).toBeDefined();
    expect(firstSegment?.startTime).toBe(0.80);
    expect(firstSegment?.text).toBe("You know I want you, it's not a secret I try to hide.");
    expect(firstSegment?.tokenCount).toBe(13);
  });

  it("should verify Chorus anthem and Anne-Marie verse transitions", () => {
    const segments = rtsLesson?.segments || [];
    // Sentence 7: Chorus hook
    expect(segments[6].text).toBe("What if we rewrite the stars?");
    expect(segments[6].tokenCount).toBe(6);

    // Sentence 15: Anne-Marie Verse 2 vocal entrance
    expect(segments[14].text).toBe("You think it's easy, you think I don't want to run to you.");
    expect(segments[14].tokenCount).toBe(13);
  });

  it("should verify all 18 segments possess complete pedagogical metadata and IPA", () => {
    const segments = rtsLesson?.segments || [];
    segments.forEach((seg, idx) => {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBeGreaterThan(0);
      expect(seg.orderIndex).toBe(idx + 1);
    });
  });

  it("should verify chronological sequence with zero overlapping segments", () => {
    const segments = rtsLesson?.segments || [];
    for (let i = 0; i < segments.length - 1; i++) {
      const current = segments[i];
      const next = segments[i + 1];
      expect(current.endTime).toBeLessThanOrEqual(next.startTime + 0.05);
    }
  });
});
