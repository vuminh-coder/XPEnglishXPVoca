import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE } from "../features/listening/data/lessons/movies/animation/lesson_walle";

describe("WALL-E Complete Data Coverage Test (100% Verbatim Subtitle & Cue Audit)", () => {
  const cuesPath = path.resolve(__dirname, "../scripts/walle_cleaned_cues.json");
  const rawCues: Array<{
    index: number;
    timestamp: string;
    seconds: number;
    text: string;
  }> = JSON.parse(fs.readFileSync(cuesPath, "utf-8"));

  it("should have loaded all 40 dialogue cues from raw video transcript", () => {
    expect(rawCues.length).toBe(40);
  });

  it("should cover 100% of all 40 original dialogue cues inside lesson segments without missing any cue", () => {
    const combinedLessonText = LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments
      .map((s) => s.text)
      .join(" ")
      .replace(/[\s\r\n]+/g, " ");

    const missingCues: Array<{ index: number; timestamp: string; text: string }> = [];

    rawCues.forEach((cue) => {
      // Normalize comparison by stripping punctuation and lowercasing
      const cleanCue = cue.text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

      const cleanLesson = combinedLessonText
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

      if (!cleanLesson.includes(cleanCue)) {
        missingCues.push(cue);
      }
    });

    expect(
      missingCues,
      `Detected ${missingCues.length} missing cues in WALL-E lesson: ${JSON.stringify(missingCues, null, 2)}`
    ).toEqual([]);
  });

  it("should have total words across segments consistent with verbatim speech", () => {
    const totalWords = LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments.reduce(
      (acc, s) => acc + s.text.split(/\s+/).length,
      0
    );
    expect(totalWords).toBeGreaterThanOrEqual(900);
    expect(totalWords).toBeLessThanOrEqual(1100);
  });

  it("should cover the complete timeline from video start to video conclusion", () => {
    const segments = LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments;
    const firstStart = segments[0].startTime;
    const lastEnd = segments[segments.length - 1].endTime;

    expect(firstStart).toBeLessThanOrEqual(10.0);
    expect(lastEnd).toBeGreaterThanOrEqual(312.0); // Cue 39 finishes at 312s
  });

  it("should provide rich pedagogical translations and explanations for every segment", () => {
    LESSON_WALLE_I_DONT_WANT_TO_SURVIVE_I_WANT_TO_LIVE.segments.forEach((seg, idx) => {
      expect(seg.translationVi.length, `Segment ${idx} translationVi`).toBeGreaterThan(30);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length, `Segment ${idx} explanationAi`).toBeGreaterThan(40);
      expect(seg.keywords).toBeDefined();
      expect(seg.keywords!.length, `Segment ${idx} keywords`).toBeGreaterThanOrEqual(3);
    });
  });
});
