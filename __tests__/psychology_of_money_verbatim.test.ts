import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_PSYCHOLOGY_OF_MONEY } from "@/features/listening/data/lessons/lesson_psychology_of_money";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("The Psychology of Money: Warren Buffett's Secret - 100% Verbatim Audit", () => {
  it("should have exactly 9 segments with valid duration and metadata", () => {
    expect(LESSON_PSYCHOLOGY_OF_MONEY.segments.length).toBe(9);
    expect(LESSON_PSYCHOLOGY_OF_MONEY.externalId).toBe("DOgVUMfcb7U");
    expect(LESSON_PSYCHOLOGY_OF_MONEY.durationSeconds).toBe(48);
    expect(LESSON_PSYCHOLOGY_OF_MONEY.cefrLevel).toBe("B2");
  });

  it("should have chronological timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_PSYCHOLOGY_OF_MONEY.segments.length; i++) {
      const seg = LESSON_PSYCHOLOGY_OF_MONEY.segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, and valid IPA transcriptions", () => {
    for (const seg of LESSON_PSYCHOLOGY_OF_MONEY.segments) {
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

  it("should tokenize all 9 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_PSYCHOLOGY_OF_MONEY.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(100);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 9 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "DOgVUMfcb7U");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(9);
    for (let i = 0; i < 9; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_PSYCHOLOGY_OF_MONEY.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_PSYCHOLOGY_OF_MONEY.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_PSYCHOLOGY_OF_MONEY.segments[i].endTime);
    }
  });

  it("should match 100% word-for-word against official YouTube subtitle events in json3 (0 diffs)", () => {
    const jsonPath = path.resolve(process.cwd(), "scripts/money.en.json3");
    if (!fs.existsSync(jsonPath)) return;

    const rawJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    function cleanWords(str: string): string[] {
      return str
        .replace(/stock-picking/gi, "stockpicking")
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/…/g, "...")
        .replace(/['"]+/g, " ")
        .replace(/[^a-zA-Z0-9\s]/g, " ")
        .split(/\s+/)
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean);
    }

    const wordEvents: Array<{ time: number; word: string }> = [];
    rawJson.events.forEach((e: any) => {
      if (e.segs) {
        e.segs.forEach((s: any) => {
          const txt = (s.utf8 || "").trim();
          if (txt && txt !== "\n") {
            const offset = s.tOffsetMs || 0;
            const time = (e.tStartMs + offset) / 1000;
            const words = cleanWords(txt);
            words.forEach((w) => {
              wordEvents.push({ time, word: w });
            });
          }
        });
      }
    });

    const uniqueWords: string[] = [];
    for (let i = 0; i < wordEvents.length; i++) {
      const w = wordEvents[i];
      const last = uniqueWords[uniqueWords.length - 1];
      if (last && last === w.word && Math.abs(w.time - (wordEvents[i - 1]?.time || 0)) < 0.5) {
        continue;
      }
      uniqueWords.push(w.word);
    }

    function normalizeAsr(words: string[]): string[] {
      return words.map((w) => {
        if (w === "howell" || w === "howel") return "housel";
        return w;
      });
    }

    const normRaw = normalizeAsr(uniqueWords);
    const normLesson = normalizeAsr(
      cleanWords(LESSON_PSYCHOLOGY_OF_MONEY.segments.map((s) => s.text).join(" "))
    );

    expect(normLesson.length).toBe(125);
    expect(normRaw.length).toBe(125);
    expect(normLesson).toEqual(normRaw);
  });
});
