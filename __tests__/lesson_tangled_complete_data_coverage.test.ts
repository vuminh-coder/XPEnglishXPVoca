import { describe, it, expect } from "vitest";
import { LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT } from "../features/listening/data/lessons/movies/animation/lesson_tangled";

describe("Tangled Complete Data Coverage Test (100% Dialogue & Pedagogical Audit)", () => {
  const combinedText = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments
    .map((s) => s.text)
    .join(" ")
    .toLowerCase();

  const essentialAnchors = [
    "struggling is pointless",
    "i know not who you are",
    "the name's flynn rider",
    "how you doing",
    "gallivanting through the forest",
    "where is my satchel",
    "in the pot",
    "get out of it. literally",
    "why on earth would i want your hair",
    "offer you a deal",
    "lantern thing they do for the princess",
    "i knew they weren't stars",
    "act as my guide",
    "then, and only then",
    "no can do",
    "not exactly simpatico",
    "fate, destiny",
    "a horse",
    "brick by brick",
    "never, ever break that promise",
    "here comes... the smolder",
    "an off day for me",
    "you broke my smolder",
    "elision",
    "flap t",
  ];

  it("should contain all 25 essential narrative, dialogue, and linguistic anchors without any omission", () => {
    const missingAnchors = essentialAnchors.filter(
      (anchor) => !combinedText.includes(anchor.toLowerCase())
    );

    expect(
      missingAnchors,
      `Detected missing dialogue anchors in Tangled lesson: ${JSON.stringify(missingAnchors)}`
    ).toEqual([]);
  });

  it("should have total words across segments consistent with comprehensive pedagogical coverage", () => {
    const totalWords = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments.reduce(
      (acc, s) => acc + s.text.split(/\s+/).length,
      0
    );
    expect(totalWords).toBeGreaterThanOrEqual(550);
    expect(totalWords).toBeLessThanOrEqual(750);
  });

  it("should cover the complete timeline from video start to video conclusion across chapters", () => {
    const segments = LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments;
    const firstStart = segments[0].startTime;
    const lastEnd = segments[segments.length - 1].endTime;

    expect(firstStart).toBeLessThanOrEqual(15.0);
    expect(lastEnd).toBeGreaterThanOrEqual(1000.0);
  });

  it("should provide rich pedagogical translations and explanations for every segment", () => {
    LESSON_TANGLED_LANTERN_FESTIVAL_I_SEE_THE_LIGHT.segments.forEach((seg, idx) => {
      expect(seg.translationVi.length, `Segment ${idx} translationVi`).toBeGreaterThan(25);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length, `Segment ${idx} explanationAi`).toBeGreaterThan(30);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length, `Segment ${idx} keywords`).toBeGreaterThanOrEqual(3);
    });
  });
});
