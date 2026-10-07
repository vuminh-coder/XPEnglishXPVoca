import { describe, it, expect } from "vitest";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Kurzgesagt: How to Win an Interstellar War 100% Verbatim Calibration Test Suite", () => {
  const kurzgesagtLesson = MOCK_VIDEO_LESSONS.find(
    (l) => l.id === "88c4fc17-4445-46f4-82d4-c51fbb56e859" || l.externalId === "tybKnGZRwcU"
  );

  it("should find the Kurzgesagt lesson in the catalog mock", () => {
    expect(kurzgesagtLesson).toBeDefined();
    expect(kurzgesagtLesson?.externalId).toBe("tybKnGZRwcU");
    expect(kurzgesagtLesson?.title).toContain("Interstellar War");
  });

  it("should have exactly 21 calibrated verbatim segments", () => {
    expect(kurzgesagtLesson?.segments).toBeDefined();
    expect(kurzgesagtLesson?.segments?.length).toBe(21);
  });

  it("should verify Sentence 1 starts with clean lead-in at 0.00s and correct text", () => {
    const firstSegment = kurzgesagtLesson?.segments?.[0];
    expect(firstSegment).toBeDefined();
    expect(firstSegment?.startTime).toBe(0.00);
    expect(firstSegment?.text).toBe("Could aliens destroy us from light years away?");
    expect(firstSegment?.tokenCount).toBe(8);
  });

  it("should verify scientific proper nouns and astronomical terms across segments", () => {
    const segments = kurzgesagtLesson?.segments || [];
    // Sentence 2: Kurzgesagt Labs
    expect(segments[1].text).toContain("Kurzgesagt Labs");
    expect(segments[1].properNouns).toContain("Kurzgesagt Labs");

    // Sentence 7: Humans
    expect(segments[6].text).toContain("Humans");

    // Sentence 10: Smorpians
    expect(segments[9].text).toContain("Smorpians");

    // Sentence 11: HD 40307
    expect(segments[10].text).toContain("HD 40307");
    expect(segments[10].properNouns).toContain("HD 40307");

    // Sentence 13: Dyson swarm
    expect(segments[12].text).toContain("Dyson swarm");
  });

  it("should verify all 21 segments possess complete pedagogical metadata and IPA", () => {
    const segments = kurzgesagtLesson?.segments || [];
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
    const segments = kurzgesagtLesson?.segments || [];
    for (let i = 0; i < segments.length - 1; i++) {
      const current = segments[i];
      const next = segments[i + 1];
      expect(current.endTime).toBeLessThanOrEqual(next.startTime + 0.05);
    }
  });
});
