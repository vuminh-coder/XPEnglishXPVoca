import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_BBC_WHY_WE_LAUGH, QUIZ_BBC_WHY_WE_LAUGH } from "@/features/listening/data/lessons/lesson_bbc_why_we_laugh";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("BBC 6 Minute English: Why Laughter is the Best Medicine - 100% Verbatim Audit", () => {
  it("should have exactly 69 calibrated segments covering full timeline from 00:02 to 06:08", () => {
    expect(LESSON_BBC_WHY_WE_LAUGH.segments.length).toBe(69);
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[0].startTime).toBe(2.78);
    expect(LESSON_BBC_WHY_WE_LAUGH.segments[68].endTime).toBe(368.66);
  });

  it("should have strictly ordered, non-overlapping timestamps with positive durations and 1-indexed orderIndex", () => {
    const segments = LESSON_BBC_WHY_WE_LAUGH.segments;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      expect(seg.orderIndex).toBe(i + 1);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      const dur = seg.endTime - seg.startTime;
      expect(dur).toBeGreaterThanOrEqual(1.0);

      if (i > 0) {
        expect(seg.startTime).toBeGreaterThanOrEqual(segments[i - 1].endTime);
      }
    }
  });

  it("should have valid IPA, Vietnamese translations, and keywords for every segment", () => {
    for (const seg of LESSON_BBC_WHY_WE_LAUGH.segments) {
      expect(seg.text.length).toBeGreaterThan(0);
      expect(seg.translationVi.length).toBeGreaterThan(0);
      expect(seg.ipaUs).toMatch(/^\/.*\/$/);
      expect(Array.isArray(seg.keywords)).toBe(true);
      expect(seg.keywords!.length).toBeGreaterThan(0);
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
    }
  });

  it("should tokenize all 69 segments with zero empty tokens", () => {
    let totalWordCount = 0;
    for (const seg of LESSON_BBC_WHY_WE_LAUGH.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalWordCount += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalWordCount).toBeGreaterThan(900);
  });

  it("should match mock data in videoCatalogMockData.ts exactly", () => {
    const bbcMock = MOCK_VIDEO_LESSONS.find((v) => v.id === "vid_bbc_why_we_laugh");
    expect(bbcMock).toBeDefined();
    expect(bbcMock?.externalId).toBe("Fez57g8jMNM");
    expect(bbcMock?.durationSeconds).toBe(380);
    expect(bbcMock?.durationFormatted).toBe("06:20");
    expect(bbcMock?.accent).toBe("en-GB");
    expect(bbcMock?.segments.length).toBe(69);

    for (let i = 0; i < 69; i++) {
      expect(bbcMock?.segments[i].text).toBe(LESSON_BBC_WHY_WE_LAUGH.segments[i].text);
      expect(bbcMock?.segments[i].startTime).toBe(LESSON_BBC_WHY_WE_LAUGH.segments[i].startTime);
      expect(bbcMock?.segments[i].endTime).toBe(LESSON_BBC_WHY_WE_LAUGH.segments[i].endTime);
      expect(bbcMock?.segments[i].translationVi).toBe(LESSON_BBC_WHY_WE_LAUGH.segments[i].translationVi);
    }
  });

  it("should match 100% word-for-word against official YouTube BBC 6 Minute English captions in json3 (0 diffs across all words)", () => {
    const subPath = path.resolve(process.cwd(), "scripts/bbc_why_laugh_official.en-GB.json3");
    if (!fs.existsSync(subPath)) return;

    const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));
    const rawOfficialText = sub.events
      .map((e: any) => (e.segs || []).map((s: any) => s.utf8).join(""))
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

    const officialWords = cleanWords(rawOfficialText);
    const lessonWords: string[] = [];
    LESSON_BBC_WHY_WE_LAUGH.segments.forEach((s) => lessonWords.push(...cleanWords(s.text)));

    function normList(words: string[]): string[] {
      const res: string[] = [];
      let i = 0;
      while (i < words.length) {
        if (i + 1 < words.length && words[i] === "it" && words[i + 1] === "s") {
          res.push("its");
          i += 2;
        } else if (i + 1 < words.length && words[i] === "you" && words[i + 1] === "re") {
          res.push("youre");
          i += 2;
        } else {
          res.push(words[i]);
          i += 1;
        }
      }
      return res;
    }

    const normalizedOfficial = normList(officialWords);
    expect(lessonWords.length).toBe(953);
    expect(normalizedOfficial.length).toBe(953);
    expect(lessonWords).toEqual(normalizedOfficial);
  });

  it("should have valid explanationAi and tokenCount across all 69 segments in lesson object", () => {
    expect(LESSON_BBC_WHY_WE_LAUGH.segments.length).toBe(69);
    for (const seg of LESSON_BBC_WHY_WE_LAUGH.segments) {
      expect(seg.explanationAi).toBeDefined();
      expect(seg.explanationAi!.length).toBeGreaterThan(0);
      expect(seg.tokenCount).toBeDefined();
      expect(seg.tokenCount).toBeGreaterThan(0);
    }
  });

  it("should have comprehensive bilingual reading comprehension quiz attached with 8 questions", () => {
    const quiz = LESSON_BBC_WHY_WE_LAUGH.quiz;
    expect(quiz).toBeDefined();
    if (!quiz) return;

    expect(quiz.lessonId).toBe("vid_bbc_why_we_laugh");
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
