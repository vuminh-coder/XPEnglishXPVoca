import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { checkEquivalenceMatch, stripDiacritics } from "@/features/listening/utils/dictationEngine";
import { LESSON_TED_BILINGUAL_BRAIN, QUIZ_TED_BILINGUAL_BRAIN } from "@/features/listening/data/lessons/lesson_ted_bilingual_brain";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("TED-Ed: The Benefits of a Bilingual Brain - 100% Verbatim Audit", () => {
  const calibratedPath = path.resolve(process.cwd(), "scripts/ted_bilingual_18_calibrated.json");
  const calibratedSegments = JSON.parse(fs.readFileSync(calibratedPath, "utf8"));

  it("should have exactly 18 calibrated segments covering 00:06 to 02:05", () => {
    expect(calibratedSegments.length).toBe(18);
    expect(calibratedSegments[0].startTime).toBe(6.55);
    expect(calibratedSegments[17].endTime).toBe(125.76);
  });

  it("should have strictly ordered, non-overlapping timestamps with positive durations", () => {
    for (let i = 0; i < calibratedSegments.length; i++) {
      const seg = calibratedSegments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      const dur = seg.endTime - seg.startTime;
      expect(dur).toBeGreaterThanOrEqual(3.0);
      expect(dur).toBeLessThanOrEqual(10.5);

      if (i > 0) {
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

  it("should tokenize all 18 segments with zero empty tokens", () => {
    let totalWordCount = 0;
    for (const seg of calibratedSegments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalWordCount += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalWordCount).toBe(288);
  });

  it("should support diacritic tolerance and foreign equivalences seamlessly", () => {
    expect(stripDiacritics("español")).toBe("espanol");
    expect(stripDiacritics("français")).toBe("francais");
    expect(stripDiacritics("sí")).toBe("si");

    expect(checkEquivalenceMatch("espanol", "español")).toBe(true);
    expect(checkEquivalenceMatch("francais", "français")).toBe(true);
    expect(checkEquivalenceMatch("si", "sí")).toBe(true);
    expect(checkEquivalenceMatch("yes", "sí")).toBe(true);
    expect(checkEquivalenceMatch("hui", "会")).toBe(true);
    expect(checkEquivalenceMatch("ni", "你")).toBe(true);
    expect(checkEquivalenceMatch("shuo", "说")).toBe(true);
  });

  it("should match mock data in videoCatalogMockData.ts exactly", () => {
    const tedMock = MOCK_VIDEO_LESSONS.find((v) => v.id === "vid_ted_bilingual_brain");
    expect(tedMock).toBeDefined();
    expect(tedMock?.externalId).toBe("MMmOLN5zBLY");
    expect(tedMock?.durationSeconds).toBe(126);
    expect(tedMock?.durationFormatted).toBe("02:05");
    expect(tedMock?.segments.length).toBe(18);

    for (let i = 0; i < 18; i++) {
      expect(tedMock?.segments[i].text).toBe(calibratedSegments[i].text);
      expect(tedMock?.segments[i].startTime).toBe(calibratedSegments[i].startTime);
      expect(tedMock?.segments[i].endTime).toBe(calibratedSegments[i].endTime);
    }
  });

  it("should match 100% word-for-word against official YouTube TED-Ed captions in json3 (0 diffs across 288 words)", () => {
    const subPath = path.resolve(process.cwd(), "scripts/ted_bilingual_raw.en.json3");
    if (!fs.existsSync(subPath)) return;

    const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));
    const eventsInRange = sub.events.slice(0, 36);

    function cleanWords(s: string): string[] {
      return s
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/--/g, " ")
        .replace(/—/g, " ")
        .replace(/['"]+/g, "")
        .replace(/[?¿!,.:;]+/g, " ")
        .split(/\s+/)
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean);
    }

    const offText = eventsInRange
      .map((e: any) => (e.segs || []).map((s: any) => s.utf8).join(""))
      .join(" ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const offWords = cleanWords(offText);
    const lessonWords: string[] = [];
    calibratedSegments.forEach((s: any) => lessonWords.push(...cleanWords(s.text)));

    expect(lessonWords.length).toBe(288);
    expect(offWords.length).toBe(288);
    expect(lessonWords).toEqual(offWords);
  });

  it("should have valid explanationAi and tokenCount across all 18 segments in lesson object", () => {
    expect(LESSON_TED_BILINGUAL_BRAIN.segments.length).toBe(18);
    for (const seg of LESSON_TED_BILINGUAL_BRAIN.segments) {
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBeDefined();
      expect(seg.tokenCount).toBeGreaterThan(0);
    }
  });

  it("should have comprehensive bilingual reading comprehension quiz attached", () => {
    const quiz = LESSON_TED_BILINGUAL_BRAIN.quiz;
    expect(quiz).toBeDefined();
    if (!quiz) return;

    expect(quiz.lessonId).toBe("vid_ted_bilingual_brain");
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
