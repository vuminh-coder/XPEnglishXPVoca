import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";

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
      expect(seg.tokenCount).toBeDefined();
      expect(seg.tokenCount!).toBeGreaterThan(0);
    }
  });

  it("should cleanly tokenize all 11 segments with DictationWorkspace tokenizer (114 tokens total)", () => {
    let totalTokens = 0;
    const segments = petsLesson?.segments || [];
    for (const seg of segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBe(114);
  });

  it("should match 100% word-for-word against official YouTube captions in json3 (0 diffs across 114 words)", () => {
    const subPath = path.resolve(process.cwd(), "scripts/pets_official.en.json3");
    if (!fs.existsSync(subPath)) return;

    const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));
    const rawText = sub.events
      .filter((e: any) => e.segs)
      .map((e: any) => e.segs.map((s: any) => s.utf8).join(""))
      .join(" ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    function cleanWords(s: string): string[] {
      return s
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/--/g, " ")
        .replace(/—/g, " ")
        .replace(/['"]+/g, "")
        .replace(/[^a-zA-Z0-9\s]/g, " ")
        .split(/\s+/)
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean);
    }

    const officialWords = cleanWords(rawText);
    const lessonWords: string[] = [];
    const segments = petsLesson?.segments || [];
    segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

    expect(lessonWords.length).toBe(114);
    expect(officialWords.length).toBe(114);
    expect(lessonWords).toEqual(officialWords);
  });

  it("should have comprehensive bilingual reading comprehension quiz attached with 8 questions", () => {
    const quiz = petsLesson?.quiz;
    expect(quiz).toBeDefined();
    if (!quiz) return;

    expect(quiz.lessonId).toBe("575d216f-b275-468e-8a41-c3b26c0ac1ea");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.xpReward).toBe(40);
    expect(quiz.questions.length).toBe(8);

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      expect(q.id).toBe(`q_daily_pets_${i + 1}`);
      expect(q.questionEn).toBeDefined();
      expect(q.questionEn!.length).toBeGreaterThan(10);
      expect(q.questionVi).toBeDefined();
      expect(q.questionVi!.length).toBeGreaterThan(10);
      expect(q.options.length).toBe(4);
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi!.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationEn!.length).toBeGreaterThan(15);
      expect(q.explanationVi).toBeDefined();
      expect(q.explanationVi!.length).toBeGreaterThan(15);
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(q.referenceSegmentIndex).toBeDefined();
      expect(q.referenceSegmentIndex).toBeGreaterThanOrEqual(0);
      expect(q.referenceSegmentIndex).toBeLessThan(11);
    }

    const segments = petsLesson?.segments || [];
    // Verify specific segment matches
    expect(quiz.questions[0].referenceSegmentIndex).toBe(0);
    expect(segments[0].text).toContain("white coat");
    expect(quiz.questions[4].referenceSegmentIndex).toBe(6);
    expect(segments[6].text).toContain("giraffe");
    expect(quiz.questions[5].referenceSegmentIndex).toBe(7);
    expect(segments[7].text).toContain("elephants");
    expect(quiz.questions[6].referenceSegmentIndex).toBe(8);
    expect(segments[8].text).toContain("woods");
    expect(quiz.questions[7].referenceSegmentIndex).toBe(10);
    expect(segments[10].text).toContain("rabbits");
  });
});

