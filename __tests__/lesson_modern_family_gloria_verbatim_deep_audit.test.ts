import { describe, it, expect } from "vitest";
import {
  LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES,
  QUIZ_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES_EXTENDED,
} from "../features/listening/data/lessons/movies/sitcoms/lesson_modern_family_gloria";

describe("Video #16 (mov_sit_04): Modern Family Gloria Verbatim Deep Audit & Pedagogical Rigor", () => {
  const segments = LESSON_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES.segments;

  it("1. Iconic Verbatim Quotations: Verified presence in transcript", () => {
    const fullTranscript = segments.map((s) => s.text).join(" ");

    expect(fullTranscript).toContain("doggy-dog world");
    expect(fullTranscript).toContain("dog-eat-dog");
    expect(fullTranscript).toContain("baby cheeses");
    expect(fullTranscript).toContain("Baby Jesus");
    expect(fullTranscript).toContain("gargle costume");
    expect(fullTranscript).toContain("gargoyles");
    expect(fullTranscript).toContain("bruja");
    expect(fullTranscript).toContain("blessings in disguise");
    expect(fullTranscript).toContain("Carpal Tunnel");
    expect(fullTranscript).toContain("carpool");
    expect(fullTranscript).toContain("voluptuous");
    expect(fullTranscript).toContain("how frustrating it is");
    expect(fullTranscript).toContain("translate everything in my head");
    expect(fullTranscript).toContain("talking in my shoes for one mile");
    expect(fullTranscript).toContain("how smart I am in Spanish");
    expect(fullTranscript).toContain("own language, in my own home");
  });

  it("2. Word Count Precision: tokenCount matches regex word count for all segments", () => {
    for (const seg of segments) {
      const actualWords = (seg.text.match(/\b\w+\b/g) || []).length;
      if (seg.tokenCount !== actualWords) {
        console.log(`MISMATCH at seg ${seg.orderIndex}: tokenCount=${seg.tokenCount}, actualWords=${actualWords}, text="${seg.text}"`);
      }
      expect(seg.tokenCount).toBe(actualWords);
    }
  });

  it("3. Vietnamese Translations Quality: Engaging and contextually accurate", () => {
    const doggySeg = segments.find((s) => s.text.includes("doggy-dog world"));
    expect(doggySeg).toBeDefined();
    expect(doggySeg?.translationVi).toContain("cún");

    const jesusSeg = segments.find((s) => s.text.includes("Baby Jesus or baby cheeses"));
    expect(jesusSeg).toBeDefined();
    expect(jesusSeg?.translationVi).toContain("Chúa Hài Đồng");
    expect(jesusSeg?.translationVi).toContain("phô mai");

    const spanishSeg = segments.find((s) => s.text.includes("how smart I am in Spanish"));
    expect(spanishSeg).toBeDefined();
    expect(spanishSeg?.translationVi).toContain("thông minh");
    expect(spanishSeg?.translationVi).toContain("tiếng Tây Ban Nha");
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
    for (const q of QUIZ_MODERN_FAMILY_GLORIA_LANGUAGE_STRUGGLES_EXTENDED.questions) {
      if (q.referenceSegmentIndex !== undefined) {
        expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
        expect(q.referenceSegmentIndex).toBeLessThan(segments.length);
      }
    }
  });

  it("7. Timing Continuity: Segments span smoothly across the entire 888s duration", () => {
    expect(segments[0].startTime).toBe(0.0);
    expect(segments[segments.length - 1].endTime).toBe(888.0);

    const midIndex = Math.floor(segments.length / 2);
    expect(segments[midIndex].startTime).toBeGreaterThan(250);
    expect(segments[midIndex].startTime).toBeLessThan(650);
  });
});
