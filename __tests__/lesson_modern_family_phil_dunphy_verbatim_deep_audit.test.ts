import { describe, it, expect } from "vitest";
import {
  LESSON_MODERN_FAMILY_PHIL_DUNPHY,
  QUIZ_MODERN_FAMILY_PHIL_DUNPHY_EXTENDED,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_modern_family_phil_dunphy";

describe("Video #15 (mov_sit_03): Modern Family Phil Dunphy Verbatim Deep Audit & Pedagogical Rigor", () => {
  const segments = LESSON_MODERN_FAMILY_PHIL_DUNPHY.segments;

  it("1. Iconic Verbatim Quotations: Verified presence in transcript", () => {
    const fullTranscript = segments.map((s) => s.text).join(" ");

    expect(fullTranscript).toContain("cool dad, that's my thing");
    expect(fullTranscript).toContain("WTF: Why The Face?");
    expect(fullTranscript).toContain("High School Musical");
    expect(fullTranscript).toContain("put it on the plastic");
    expect(fullTranscript).toContain("game of chicken");
    expect(fullTranscript).toContain("iPod");
    expect(fullTranscript).toContain("Pluto");
    expect(fullTranscript).toContain("king of the roller coasters");
    expect(fullTranscript).toContain("Dramamine");
    expect(fullTranscript).toContain("Dr. Stiglitz");
    expect(fullTranscript).toContain("Be persuasive! B-E persuasive!");
    expect(fullTranscript).toContain("Triangle Shirtwaist");
    expect(fullTranscript).toContain("relationship worth having");
    expect(fullTranscript).toContain("Phil's-osophy");
    expect(fullTranscript).toContain("Always look people in the eye");
    expect(fullTranscript).toContain("Unless it's a tiger");
    expect(fullTranscript).toContain("When life gives you lemonade, make lemons");
  });

  it("2. Word Count Precision: tokenCount matches regex word count for all segments", () => {
    for (const seg of segments) {
      const actualWords = (seg.text.match(/\b\w+\b/g) || []).length;
      expect(seg.tokenCount).toBe(actualWords);
    }
  });

  it("3. Vietnamese Translations Quality: Engaging and contextually accurate", () => {
    const philIntro = segments[0];
    expect(philIntro.translationVi).toContain("ông bố ngầu");

    const wtfSeg = segments.find((s) => s.text.includes("WTF: Why The Face?"));
    expect(wtfSeg).toBeDefined();
    expect(wtfSeg?.translationVi).toContain("Sao cái mặt lại xị ra thế kia");

    const lemonadeSeg = segments.find((s) => s.text.includes("When life gives you lemonade"));
    expect(lemonadeSeg).toBeDefined();
    expect(lemonadeSeg?.translationVi).toContain("nước chanh");
    expect(lemonadeSeg?.translationVi).toContain("quả chanh");
  });

  it("4. AI Explanations Depth: Substantive insights for every segment", () => {
    for (const seg of segments) {
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(20);
    }
  });

  it("5. Keywords Density: Each segment possesses 1 to 4 focused vocabulary items", () => {
    for (const seg of segments) {
      expect(seg.keywords?.length).toBeGreaterThanOrEqual(1);
      expect(seg.keywords?.length).toBeLessThanOrEqual(4);
    }
  });

  it("6. Quiz Reference Segments: All referenceSegmentIndices point to valid segments", () => {
    for (const q of QUIZ_MODERN_FAMILY_PHIL_DUNPHY_EXTENDED.questions) {
      if (q.referenceSegmentIndex !== undefined) {
        expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
        expect(q.referenceSegmentIndex).toBeLessThan(segments.length);
      }
    }
  });

  it("7. Timing Continuity: Segments span smoothly across the entire 710s duration", () => {
    expect(segments[0].startTime).toBe(0.0);
    expect(segments[segments.length - 1].endTime).toBe(710.0);
    
    // Check that timestamps span the video timeline
    const midIndex = Math.floor(segments.length / 2);
    expect(segments[midIndex].startTime).toBeGreaterThan(200);
    expect(segments[midIndex].startTime).toBeLessThan(500);
  });
});
