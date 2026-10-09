import { describe, it, expect } from "vitest";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { LESSON_MATT_WALKER_SLEEP } from "@/features/listening/data/lessons/lesson_matt_walker_sleep";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Matt Walker: Sleep Is Your Superpower - 100% Verbatim & Segment Audit", () => {
  it("should have exactly 12 segments with valid duration and metadata", () => {
    expect(LESSON_MATT_WALKER_SLEEP.segments.length).toBe(12);
    expect(LESSON_MATT_WALKER_SLEEP.externalId).toBe("5MuIMqhT8DM");
    expect(LESSON_MATT_WALKER_SLEEP.durationSeconds).toBe(121);
    expect(LESSON_MATT_WALKER_SLEEP.cefrLevel).toBe("B2");
  });

  it("should have chronological timestamps with positive durations", () => {
    let prevStartTime = -1;
    for (let i = 0; i < LESSON_MATT_WALKER_SLEEP.segments.length; i++) {
      const seg = LESSON_MATT_WALKER_SLEEP.segments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.startTime).toBeGreaterThanOrEqual(0);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      expect(seg.startTime).toBeGreaterThanOrEqual(prevStartTime);
      prevStartTime = seg.startTime;
    }
  });

  it("should have non-empty text, Vietnamese translations, and valid IPA transcriptions", () => {
    for (const seg of LESSON_MATT_WALKER_SLEEP.segments) {
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

  it("should tokenize all 12 segments cleanly with zero empty tokens", () => {
    let totalTokens = 0;
    for (const seg of LESSON_MATT_WALKER_SLEEP.segments) {
      const tokens = tokenizeSentence(seg.text, seg.properNouns || []);
      expect(tokens.length).toBeGreaterThan(0);
      totalTokens += tokens.length;
      for (const token of tokens) {
        expect(token.clean.length).toBeGreaterThan(0);
        expect(token.dots.length).toBe(token.clean.length);
      }
    }
    expect(totalTokens).toBeGreaterThan(200);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 12 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.externalId === "5MuIMqhT8DM");
    expect(mock).toBeDefined();
    expect(mock?.segments.length).toBe(12);
    for (let i = 0; i < 12; i++) {
      expect(mock?.segments[i].text).toBe(LESSON_MATT_WALKER_SLEEP.segments[i].text);
      expect(mock?.segments[i].startTime).toBe(LESSON_MATT_WALKER_SLEEP.segments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(LESSON_MATT_WALKER_SLEEP.segments[i].endTime);
    }
  });

  it("should match 100% word-for-word against official YouTube captions in matt_walker.en.json3 (0 diffs across 270 words)", () => {
    const fs = require("fs");
    const path = require("path");
    const subPath = path.resolve(process.cwd(), "scripts/matt_walker.en.json3");
    if (!fs.existsSync(subPath)) return;

    const sub = JSON.parse(fs.readFileSync(subPath, "utf8"));
    const rawWords: string[] = [];
    sub.events.forEach((e: any) => {
      if (!e.segs) return;
      const baseT = e.tStartMs;
      if (baseT > 122000) return;
      e.segs.forEach((s: any) => {
        const text = s.utf8;
        if (!text || text === "\n") return;
        const offset = s.tOffsetMs || 0;
        const startMs = baseT + offset;
        const trimmed = text.trim();
        if (trimmed && !trimmed.startsWith("(") && !trimmed.startsWith("[")) {
          const parts = trimmed.split(/\s+/);
          parts.forEach((p: string) => {
            if (p) rawWords.push(p);
          });
        }
      });
    });

    const normalize = (w: string) => w.replace(/[.,!?:;\"\'\(\)\-]/g, "").toLowerCase();

    const lessonWords: string[] = [];
    LESSON_MATT_WALKER_SLEEP.segments.forEach((s) => {
      const ws = s.text.trim().split(/\s+/);
      ws.forEach((w) => lessonWords.push(w));
    });

    expect(lessonWords.length).toBe(270);
    expect(rawWords.length).toBe(270);

    const normLesson = lessonWords.map(normalize);
    const normRaw = rawWords.map(normalize);
    expect(normLesson).toEqual(normRaw);
  });
});

