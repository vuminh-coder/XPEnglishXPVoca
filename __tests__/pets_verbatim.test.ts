import { describe, it, expect } from "vitest";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Daily English Pets: 100% Verbatim Subtitles Calibration Test Suite", () => {
  const petsLesson = MOCK_VIDEO_LESSONS.find(
    (l) => l.id === "575d216f-b275-468e-8a41-c3b26c0ac1ea" || l.externalId === "AK42GhbTZ9w"
  );

  it("should find the Pets, Animals & Nature lesson in the catalog mock", () => {
    expect(petsLesson).toBeDefined();
    expect(petsLesson?.externalId).toBe("AK42GhbTZ9w");
    expect(petsLesson?.title).toContain("Pets, Animals & Nature");
  });

  it("should have exactly 11 calibrated verbatim segments", () => {
    expect(petsLesson?.segments).toBeDefined();
    expect(petsLesson?.segments?.length).toBe(11);
  });

  it("should eliminate the 0-13s musical intro and start speech strictly at >= 13.0s", () => {
    const firstSegment = petsLesson?.segments?.[0];
    expect(firstSegment).toBeDefined();
    expect(firstSegment?.startTime).toBeGreaterThanOrEqual(13.0);
    expect(firstSegment?.text).toBe("Our family has a small dog with a white coat and brown spots.");
  });

  it("should have strictly increasing start and end times with zero overlaps (gap >= 0.4s)", () => {
    const segments = petsLesson?.segments || [];
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.endTime).toBeGreaterThan(seg.startTime);

      if (i > 0) {
        const prev = segments[i - 1];
        expect(seg.startTime).toBeGreaterThan(prev.endTime);
        const gap = seg.startTime - prev.endTime;
        expect(gap).toBeGreaterThanOrEqual(0.4); // gaps strictly above 0.4s
      }
    }
  });

  it("should contain exact verbatim text matching spoken audio (no paraphrase)", () => {
    const segments = petsLesson?.segments || [];
    // Segment 1: "white coat", not "white fur"
    expect(segments[0].text).toContain("white coat");
    expect(segments[0].text).not.toContain("white fur");

    // Segment 3: "fun together playing", not "playing together"
    expect(segments[2].text).toContain("fun together playing");

    // Segment 4: "indoors, but most of the time they play outdoors", not "at home"
    expect(segments[3].text).toContain("play indoors, but most of the time they play outdoors");

    // Segment 5: "being outdoors as much as we can be"
    expect(segments[4].text).toBe("We love being outdoors as much as we can be.");

    // Segment 8: "watching the elephants", not "watching elephants"
    expect(segments[7].text).toBe("We also like watching the elephants.");

    // Segment 9: "take walks in the woods", not "walk in the forest"
    expect(segments[8].text).toContain("take walks in the woods");
    expect(segments[8].text).not.toContain("walk in the forest");

    // Segment 10: "kinds of trees, wild flowers and birds", not "species of trees"
    expect(segments[9].text).toContain("kinds of trees, wild flowers and birds");

    // Segment 11: ends with "rabbits too."
    expect(segments[10].text).toContain("rabbits too.");
  });

  it("should have valid pedagogical annotations for all 11 segments", () => {
    const segments = petsLesson?.segments || [];
    for (const seg of segments) {
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length).toBeGreaterThan(0);
    }
  });
});
