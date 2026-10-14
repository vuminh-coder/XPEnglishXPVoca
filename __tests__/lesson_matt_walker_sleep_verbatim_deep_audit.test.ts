import { describe, it, expect } from "vitest";
import {
  LESSON_MATT_WALKER_SLEEP,
  QUIZ_MATT_WALKER_SLEEP,
} from "../features/listening/data/lessons/lesson_matt_walker_sleep";

describe("Sleep Is Your Superpower - Matt Walker (vid_matt_walker_sleep) - Verbatim Deep Audit Suite", () => {
  it("Audit 1: Testicles & Reproductive Endocrinology (Segments 0-5)", () => {
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
    expect(segments[0].text).toBe("Thank you very much. Well, I would like to start with testicles.");
    expect(segments[1].text).toContain("Men who sleep five hours a night have significantly smaller testicles");
    expect(segments[2].text).toContain("will have a level of testosterone which is that of someone 10 years their senior.");
    expect(segments[3].text).toContain("So a lack of sleep will age a man by a decade");
    expect(segments[4].text).toContain("equivalent impairments in female reproductive health caused by a lack of sleep.");
    expect(segments[5].text).toBe("This is the best news that I have for you today.");
  });

  it("Audit 2: Brain Functions, Save Button & The Dry Sponge Metaphor (Segments 7-10)", () => {
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
    expect(segments[7].text).toContain("both for your brain and for your body.");
    expect(segments[8].text).toContain("hit the save button on those new memories so that you don't forget.");
    expect(segments[9].text).toContain("almost like a dry sponge ready to initially soak up new information.");
    expect(segments[10].text).toContain("the memory circuits of the brain essentially become waterlogged, as it were, and you can't absorb new memories.");
  });

  it("Audit 3: All-Nighter Experiment & 40% Deficit (Segments 11-21)", () => {
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
    expect(segments[12].text).toContain("pulling the all-nighter was a good idea.");
    expect(segments[13].text).toContain("a sleep group and a sleep deprivation group.");
    expect(segments[19].text).toContain("40-percent deficit in the ability of the brain to make new memories without sleep.");
    expect(segments[21].text).toContain("difference in a child acing an exam versus failing it miserably -- 40 percent.");
  });

  it("Audit 4: The Hippocampus & Deep Sleep Memory Transfer (Segments 19-35)", () => {
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
    const textAll = segments.map((s) => s.text).join(" ");
    expect(textAll).toContain("hippocampus");
    expect(textAll).toContain("informational inbox of your brain");
    expect(textAll).toContain("deep-sleep brainwaves");
    expect(textAll).toContain("sleep spindles");
    expect(textAll).toContain("file-transfer mechanism");
  });

  it("Audit 5: Aging, Dementia & Alzheimer's Disease (Segments 36-50)", () => {
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
    const textAll = segments.map((s) => s.text).join(" ");
    expect(textAll).toContain("Alzheimer's disease");
    expect(textAll).toContain("cognitive decline or memory decline in aging");
  });

  it("Audit 6: Immune System & Natural Killer Cells 70% Drop (Segments 55-65)", () => {
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
    const textAll = segments.map((s) => s.text).join(" ");
    expect(textAll).toContain("natural killer cells");
    expect(textAll).toContain("70-percent drop in natural killer cell activity");
    expect(textAll).toContain("World Health Organization");
  });

  it("Audit 7: Cardiovascular Health, Daylight Saving Time & Genetics (Segments 60-88)", () => {
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
    const textAll = segments.map((s) => s.text).join(" ");
    expect(textAll.toLowerCase()).toContain("daylight saving time");
    expect(textAll).toContain("24-percent increase in heart attacks");
    expect(textAll).toContain("21-percent reduction in heart attacks");
    expect(textAll).toContain("711 genes");
  });

  it("Audit 8: Sleep Hygiene Tips & Q&A Dialog with David Biello (Segments 90-139)", () => {
    const segments = LESSON_MATT_WALKER_SLEEP.segments;
    const textAll = segments.map((s) => s.text).join(" ");
    expect(textAll).toContain("regularity");
    expect(textAll).toContain("keep it cool");
    expect(textAll).toContain("around 65 degrees, or about 18 degrees Celsius");

    // Check last segments dialog
    const lastSeg = segments[segments.length - 1];
    expect(lastSeg.text).toBe("You're very welcome. Thank you very much.");
    expect(segments[segments.length - 2].text).toBe("Great job, Matt.");
    expect(segments[segments.length - 3].text).toBe("Well, thank you for that wake-up call.");
    expect(textAll).toContain("associate your bedroom with the place of wakefulness");
    expect(textAll).toContain("dinner table");
  });

  it("Audit 9: Quiz Pedagogical Coverage Across the Full Talk", () => {
    const quiz = QUIZ_MATT_WALKER_SLEEP;
    const refIndices = quiz.questions.map((q) => q.referenceSegmentIndex);
    expect(refIndices).toEqual([1, 2, 9, 21, 34, 74, 62, 133]);

    for (const q of quiz.questions) {
      const targetSeg = LESSON_MATT_WALKER_SLEEP.segments[q.referenceSegmentIndex!];
      expect(targetSeg).toBeDefined();
    }
  });
});
