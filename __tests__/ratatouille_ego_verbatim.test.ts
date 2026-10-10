import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_RATATOUILLE_ANTON_EGO } from "@/features/listening/data/lessons/lesson_ratatouille_anton_ego";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Ratatouille: Anton Ego Review - 100% Verbatim Audit", () => {
  it("should have exactly 14 segments with valid duration and metadata", () => {
    expect(LESSON_RATATOUILLE_ANTON_EGO.segments.length).toBe(14);
    expect(LESSON_RATATOUILLE_ANTON_EGO.externalId).toBe("tAyQL1inris");
    expect(LESSON_RATATOUILLE_ANTON_EGO.durationSeconds).toBe(119);
    expect(LESSON_RATATOUILLE_ANTON_EGO.cefrLevel).toBe("C1");
  });

  it("should have chronological timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_RATATOUILLE_ANTON_EGO.segments.length; i++) {
      const seg = LESSON_RATATOUILLE_ANTON_EGO.segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, and valid IPA transcriptions", () => {
    for (const seg of LESSON_RATATOUILLE_ANTON_EGO.segments) {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toBeDefined();
      expect(seg.ipaUs!.length).toBeGreaterThan(0);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.keywords!.length).toBeGreaterThan(0);
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
    }
  });

  it("should tokenize all 14 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_RATATOUILLE_ANTON_EGO.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(150);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 14 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "tAyQL1inris");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(14);
    for (let i = 0; i < 14; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_RATATOUILLE_ANTON_EGO.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_RATATOUILLE_ANTON_EGO.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_RATATOUILLE_ANTON_EGO.segments[i].endTime);
    }
  });

  it("should match 100% word-for-word against official YouTube subtitle events in json3 (0 diffs)", () => {
    const jsonPath = path.resolve(process.cwd(), "scripts/ratatouille_ego.en.json3");
    if (!fs.existsSync(jsonPath)) return;

    const rawJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    function cleanWords(str: string): string[] {
      return str
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’]/g, " ")
        .split(/\s+/)
        .filter(Boolean);
    }

    let rawWords: string[] = [];
    if (rawJson.events) {
      for (const ev of rawJson.events) {
        if (ev.segs) {
          const segText = ev.segs.map((s: any) => s.utf8).join("").trim();
          if (segText) {
            rawWords = rawWords.concat(cleanWords(segText));
          }
        }
      }
    }

    const lessonWords = cleanWords(
      LESSON_RATATOUILLE_ANTON_EGO.segments.map((s) => s.text).join(" ")
    );

    expect(lessonWords.length).toBe(rawWords.length);
    expect(lessonWords).toEqual(rawWords);
  });

  it("should have comprehensive bilingual reading quiz attached", () => {
    expect(LESSON_RATATOUILLE_ANTON_EGO.quiz).toBeDefined();
    const quiz = LESSON_RATATOUILLE_ANTON_EGO.quiz!;
    expect(quiz.lessonId).toBe("vid_ratatouille_anton_ego");
    expect(quiz.totalQuestions).toBe(8);
    expect(quiz.xpReward).toBe(40);
    expect(quiz.questions.length).toBe(8);

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

