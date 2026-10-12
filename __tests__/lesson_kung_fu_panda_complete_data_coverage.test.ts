import { describe, it, expect } from "vitest";
import { LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE } from "../features/listening/data/lessons/movies/animation/lesson_kung_fu_panda";

describe("Kung Fu Panda Complete Data Coverage Test (100% Multi-Chapter Dialogue Audit)", () => {
  const combinedText = LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE.segments
    .map((s) => s.text)
    .join(" ")
    .toLowerCase();

  const essentialAnchors = [
    "learning english with kung fu panda",
    "angelina jolie, dustin hoffman, jack black",
    "acupuncture would make me feel better",
    "nerve points",
    "who am i to judge a warrior based on his size",
    "stuck with you... a big, fat panda",
    "accidentally tweaked his facial nerve",
    "stopped his heart",
    "make things right",
    "connected speech",
    "sacred peach tree of heavenly wisdom",
    "history of sucking",
    "yesterday is history, tomorrow is a mystery, but today is a gift",
    "that is why it is called the present",
    "broken out of prison",
    "dragon scroll",
    "illusion of control",
    "make it blossom when it suits me",
    "bear fruit before its time",
    "things we can control",
    "seed will grow to be a peach tree",
    "wish for an apple or an orange",
    "a peach cannot defeat tai lung",
    "guide it, to nurture it, to believe in it",
    "promise me you will believe",
    "my time has come",
    "suits me",
    "bear fruit",
    "let go of",
    "thumbs up down below",
  ];

  it("should contain all 30 essential narrative, dialogue, and philosophical anchors without any omission across all 5 chapters", () => {
    const missingAnchors = essentialAnchors.filter(
      (anchor) => !combinedText.includes(anchor.toLowerCase())
    );

    expect(
      missingAnchors,
      `Detected missing dialogue anchors in Kung Fu Panda lesson: ${JSON.stringify(missingAnchors)}`
    ).toEqual([]);
  });

  it("should have total words across segments consistent with comprehensive 30-segment lesson", () => {
    const totalWords = LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE.segments.reduce(
      (acc, s) => acc + s.text.split(/\s+/).length,
      0
    );
    expect(totalWords).toBeGreaterThanOrEqual(800);
    expect(totalWords).toBeLessThanOrEqual(1100);
  });

  it("should cover the complete timeline from video beginning (<= 45s) to video conclusion (>= 1600s)", () => {
    const segments = LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE.segments;
    const firstStart = segments[0].startTime;
    const lastEnd = segments[segments.length - 1].endTime;

    expect(firstStart).toBeLessThanOrEqual(45.0);
    expect(lastEnd).toBeGreaterThanOrEqual(1600.0);
  });

  it("should provide rich pedagogical translations and explanations for every segment", () => {
    LESSON_KUNG_FU_PANDA_MASTER_OOGWAY_WISDOM_PEACH_TREE.segments.forEach((seg, idx) => {
      expect(seg.translationVi.length, `Segment ${idx} translationVi`).toBeGreaterThan(25);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length, `Segment ${idx} explanationAi`).toBeGreaterThan(30);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length, `Segment ${idx} keywords`).toBeGreaterThanOrEqual(3);
    });
  });
});
