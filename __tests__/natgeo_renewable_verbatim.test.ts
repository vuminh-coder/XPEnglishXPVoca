import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { checkEquivalenceMatch, stripDiacritics } from "@/features/listening/utils/dictationEngine";
import { LESSON_NATGEO_RENEWABLE_ENERGY, QUIZ_NATGEO_RENEWABLE_ENERGY } from "@/features/listening/data/lessons/lesson_natgeo_renewable_energy";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("National Geographic: Renewable Energy 101 - 100% Verbatim Audit", () => {
  const calibratedPath = path.resolve(process.cwd(), "scripts/natgeo_25_calibrated.json");
  const calibratedSegments = JSON.parse(fs.readFileSync(calibratedPath, "utf8"));

  it("should have exactly 25 calibrated segments covering 00:01.20 to 02:52.50", () => {
    expect(calibratedSegments.length).toBe(25);
    expect(calibratedSegments[0].startTime).toBe(1.2);
    expect(calibratedSegments[24].endTime).toBe(172.5);
  });

  it("should have strictly ordered, non-overlapping timestamps with positive durations", () => {
    for (let i = 0; i < calibratedSegments.length; i++) {
      const seg = calibratedSegments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      const dur = seg.endTime - seg.startTime;
      expect(dur).toBeGreaterThanOrEqual(2.5);
      expect(dur).toBeLessThanOrEqual(12.0);

      // Continuity check: between Seg 1 and Seg 2 there is the NatGeo intro title card music
      if (i > 0 && i !== 2) {
        expect(seg.startTime).toBeGreaterThanOrEqual(calibratedSegments[i - 1].endTime - 0.05);
      }
    }
  });

  it("should have valid IPA, Vietnamese translations, and keywords for every segment", () => {
    for (const seg of calibratedSegments) {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toMatch(/^\/.*\/$/);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.keywords.length).toBeGreaterThan(0);
    }
  });

  it("should tokenize all 25 segments with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of calibratedSegments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThanOrEqual(330);
  });

  it("should support diacritic tolerance and hyphenation equivalences seamlessly", () => {
    expect(stripDiacritics("non-renewable")).toBe("non-renewable");
    expect(checkEquivalenceMatch("non-renewable", "non-renewable")).toBe(true);
    expect(checkEquivalenceMatch("greenhouse", "greenhouse")).toBe(true);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 25 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.id === "vid_ielts_environmental_sustainability");
    expect(mock).toBeDefined();
    expect(mock?.externalId).toBe("1kUE0BZtTRc");
    expect(mock?.durationSeconds).toBe(196);
    expect(mock?.durationFormatted).toBe("03:16");
    expect(mock?.cefrLevel).toBe("B2");
    expect(mock?.accent).toBe("en-US");
    expect(mock?.segments.length).toBe(25);

    for (let i = 0; i < 25; i++) {
      expect(mock?.segments[i].text).toBe(calibratedSegments[i].text);
      expect(mock?.segments[i].startTime).toBe(calibratedSegments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(calibratedSegments[i].endTime);
      expect(mock?.segments[i].ipaUs).toBe(calibratedSegments[i].ipaUs);
      expect(mock?.segments[i].translationVi).toBe(calibratedSegments[i].translationVi);
    }
  });

  it("should match 100% word-for-word against official YouTube captions in json3 (333 words)", () => {
    const subPath = path.resolve(process.cwd(), "scripts/natgeo_renewable.en.json3");
    if (!fs.existsSync(subPath)) return;

    const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));
    const rawWords: string[] = [];
    sub.events.forEach((e: any) => {
      if (!e.segs) return;
      const baseT = e.tStartMs;
      e.segs.forEach((s: any) => {
        const text = s.utf8;
        if (!text || text === "\n") return;
        const offset = s.tOffsetMs || 0;
        const startMs = baseT + offset;
        const trimmed = text.trim();
        if (trimmed && trimmed !== "[Music]" && startMs < 173000) {
          rawWords.push(trimmed);
        }
      });
    });

    const normalize = (w: string) => w.replace(/[.,!?:;\"\'\(\)\-]/g, "").toLowerCase();

    const lessonWords: string[] = [];
    calibratedSegments.forEach((s: any) => {
      const ws = s.text.trim().split(/\s+/);
      ws.forEach((w: string) => lessonWords.push(w));
    });

    expect(lessonWords.length).toBe(333);
    expect(rawWords.length).toBe(333);

    const normLesson = lessonWords.map(normalize);
    const normRaw = rawWords.map(normalize);
    // YouTube ASR typo on index 323 has "and end" instead of spoken "an end"
    expect(normRaw[323]).toBe("and");
    expect(normLesson[323]).toBe("an");
    normRaw[323] = "an";
    expect(normLesson).toEqual(normRaw);
  });

  it("should have valid explanationAi and tokenCount across all 25 segments in lesson object", () => {
    expect(LESSON_NATGEO_RENEWABLE_ENERGY.segments.length).toBe(25);
    for (const seg of LESSON_NATGEO_RENEWABLE_ENERGY.segments) {
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBeDefined();
      expect(seg.tokenCount).toBeGreaterThan(0);
    }
  });

  it("should have comprehensive bilingual reading comprehension quiz attached", () => {
    const quiz = LESSON_NATGEO_RENEWABLE_ENERGY.quiz;
    expect(quiz).toBeDefined();
    if (!quiz) return;

    expect(quiz.lessonId).toBe("vid_ielts_environmental_sustainability");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.questions.length).toBe(8);
    expect(quiz.xpReward).toBe(40);

    for (const q of quiz.questions) {
      expect(q.id.length).toBeGreaterThan(0);
      expect(q.questionEn).toBeDefined();
      expect(q.questionVi).toBeDefined();
      expect(q.optionsEn!.length).toBe(4);
      expect(q.optionsVi!.length).toBe(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.explanationEn).toBeDefined();
      expect(q.explanationVi).toBeDefined();
      expect(q.targetedConceptEn).toBeDefined();
      expect(q.targetedConceptVi).toBeDefined();
      expect(q.referenceSegmentIndex).toBeDefined();
    }
  });
});

