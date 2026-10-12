import { describe, it, expect } from "vitest";
import { LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING } from "../features/listening/data/lessons/movies/animation/lesson_finding_dory";

describe("Finding Dory Complete Data Coverage Test (100% Multi-Chapter Narrative & Linguistic Audit)", () => {
  const combinedText = LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments
    .map((s) => s.text)
    .join(" ")
    .toLowerCase();

  const essentialAnchors = [
    "short-term memory loss",
    "just keep swimming",
    "purple shells",
    "jewel of morro bay",
    "they have names",
    "on a whim",
    "riding the eac",
    "marine life institute",
    "quarantine tank",
    "septopus",
    "permanent aquarium in cleveland",
    "open ocean exhibit",
    "blending his skin texture",
    "destiny, a nearsighted whale shark",
    "bailey the beluga whale",
    "echolocation is broken",
    "territorial sea lions",
    "becky",
    "courtyard fountain",
    "labyrinth of dark pipes",
    "what would dory do",
    "kelp forest",
    "purple shells, neatly laid out",
    "carrying fresh shells in their mouths",
    "never stopped laying out shells",
    "transport truck heading to cleveland",
    "hank, hit the gas",
    "what a wonderful world",
    "continental drop-off",
    "unforgettable",
  ];

  it("should contain all 30 essential narrative, dialogue, and marine biology anchors without any omission across all 10 chapters", () => {
    const missingAnchors = essentialAnchors.filter(
      (anchor) => !combinedText.includes(anchor.toLowerCase())
    );

    expect(
      missingAnchors,
      `Detected missing dialogue anchors in Finding Dory lesson: ${JSON.stringify(missingAnchors)}`
    ).toEqual([]);
  });

  it("should have total words across segments consistent with comprehensive 30-segment lesson", () => {
    const totalWords = LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments.reduce(
      (acc, s) => acc + s.text.split(/\s+/).length,
      0
    );
    expect(totalWords).toBeGreaterThanOrEqual(800);
    expect(totalWords).toBeLessThanOrEqual(1050);
  });

  it("should cover the complete timeline from video beginning (<= 15s) to video conclusion (>= 1100s)", () => {
    const segments = LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments;
    const firstStart = segments[0].startTime;
    const lastEnd = segments[segments.length - 1].endTime;

    expect(firstStart).toBeLessThanOrEqual(15.0);
    expect(lastEnd).toBeGreaterThanOrEqual(1100.0);
  });

  it("should provide rich pedagogical translations and explanations for every segment", () => {
    LESSON_FINDING_NEMO_DORY_JUST_KEEP_SWIMMING.segments.forEach((seg, idx) => {
      expect(seg.translationVi.length, `Segment ${idx} translationVi`).toBeGreaterThan(25);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length, `Segment ${idx} explanationAi`).toBeGreaterThan(30);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length, `Segment ${idx} keywords`).toBeGreaterThanOrEqual(3);
    });
  });
});
