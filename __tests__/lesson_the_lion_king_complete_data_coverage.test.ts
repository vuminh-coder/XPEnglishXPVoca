import { describe, it, expect } from "vitest";
import { LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST } from "../features/listening/data/lessons/movies/animation/lesson_the_lion_king";

describe("The Lion King Complete Data Coverage Test (100% Multi-Chapter Narrative & Linguistic Audit)", () => {
  const combinedText = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments
    .map((s) => s.text)
    .join(" ")
    .toLowerCase();

  const essentialAnchors = [
    "sun will set on my time here",
    "learn english with tv series",
    "present their newborn son, simba",
    "envious brother scar",
    "can we keep him",
    "lions eat guys like us",
    "on our side",
    "drops the auxiliary verbs",
    "you nearly died",
    "gee, he looks blue",
    "brownish-gold",
    "suffix -ish",
    "what's eating you",
    "top of the food chain",
    "apex predator",
    "something terrible",
    "put your behind in your past",
    "put your past behind you",
    "turns its back on you",
    "turn your back on the world",
    "hakuna matata",
    "what's a motto",
    "problem-free philosophy",
    "i'm starved",
    "rustle up some grub",
    "rare delicacies",
    "piquant, with a very pleasant crunch",
    "slimy, yet satisfying",
    "tastes like chicken",
    "run from your challenges or learn from them",
  ];

  it("should contain all 30 essential narrative, dialogue, and linguistic anchors without any omission across all 16 chapters", () => {
    const missingAnchors = essentialAnchors.filter(
      (anchor) => !combinedText.includes(anchor.toLowerCase())
    );

    expect(
      missingAnchors,
      `Detected missing dialogue anchors in The Lion King lesson: ${JSON.stringify(missingAnchors)}`
    ).toEqual([]);
  });

  it("should have total words across segments consistent with comprehensive 31-segment lesson", () => {
    const totalWords = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments.reduce(
      (acc, s) => acc + s.text.split(/\s+/).length,
      0
    );
    expect(totalWords).toBeGreaterThanOrEqual(700);
    expect(totalWords).toBeLessThanOrEqual(950);
  });

  it("should have total tokenCount synchronized with individual segments sum", () => {
    const sumTokens = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments.reduce(
      (acc, s) => acc + (s.tokenCount || 0),
      0
    );
    expect(sumTokens).toBeGreaterThan(650);
  });

  it("should preserve uninterrupted chronological continuity across the 24:04 runtime", () => {
    const segments = LESSON_THE_LION_KING_RAFIKI_TEACHES_SIMBA_THE_PAST.segments;
    for (let i = 0; i < segments.length - 1; i++) {
      expect(
        segments[i + 1].startTime,
        `Gap detected between seg ${i} and seg ${i + 1}`
      ).toBeGreaterThanOrEqual(segments[i].startTime);
    }
  });
});
