import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { checkEquivalenceMatch, stripDiacritics } from "@/features/listening/utils/dictationEngine";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("English for Travel: Checking in at the Airport - 100% Verbatim Audit", () => {
  const calibratedPath = path.resolve(process.cwd(), "scripts/airport_checkin_16_calibrated.json");
  const calibratedSegments = JSON.parse(fs.readFileSync(calibratedPath, "utf8"));

  it("should have exactly 16 calibrated segments covering 00:03.00 to 00:56.00", () => {
    expect(calibratedSegments.length).toBe(16);
    expect(calibratedSegments[0].startTime).toBe(3.0);
    expect(calibratedSegments[15].endTime).toBe(56.0);
  });

  it("should have strictly contiguous, non-overlapping timestamps with positive durations", () => {
    for (let i = 0; i < calibratedSegments.length; i++) {
      const seg = calibratedSegments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      const dur = seg.endTime - seg.startTime;
      expect(dur).toBeGreaterThanOrEqual(2.0);
      expect(dur).toBeLessThanOrEqual(6.0);

      if (i > 0) {
        expect(seg.startTime).toBe(calibratedSegments[i - 1].endTime);
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

  it("should tokenize all 16 segments with zero empty tokens (106 words total)", () => {
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
    expect(totalTokens).toBe(106);
  });

  it("should support diacritic tolerance and airport term equivalences", () => {
    expect(stripDiacritics("17B")).toBe("17B");
    expect(checkEquivalenceMatch("17b", "17B")).toBe(true);
    expect(checkEquivalenceMatch("892", "892")).toBe(true);
  });

  it("should match mock data in videoCatalogMockData.ts exactly across all 16 segments", () => {
    const mock = MOCK_VIDEO_LESSONS.find((v) => v.id === "vid_airport_checkin");
    expect(mock).toBeDefined();
    expect(mock?.externalId).toBe("bIz2Gzu3DKE");
    expect(mock?.durationSeconds).toBe(60);
    expect(mock?.durationFormatted).toBe("01:00");
    expect(mock?.cefrLevel).toBe("A2");
    expect(mock?.accent).toBe("en-US");
    expect(mock?.segments.length).toBe(16);

    for (let i = 0; i < 16; i++) {
      expect(mock?.segments[i].text).toBe(calibratedSegments[i].text);
      expect(mock?.segments[i].startTime).toBe(calibratedSegments[i].startTime);
      expect(mock?.segments[i].endTime).toBe(calibratedSegments[i].endTime);
      expect(mock?.segments[i].ipaUs).toBe(calibratedSegments[i].ipaUs);
      expect(mock?.segments[i].translationVi).toBe(calibratedSegments[i].translationVi);
    }
  });

  it("should match 100% word-for-word against Whisper AI audio transcription in airport_audio.json (0 diffs across 106 words)", () => {
    const audioDataPath = path.resolve(process.cwd(), "scripts/airport_audio.json");
    if (!fs.existsSync(audioDataPath)) return;

    const audioData = JSON.parse(fs.readFileSync(audioDataPath, "utf8"));
    const whisperWords: string[] = [];
    audioData.segments.forEach((s: any) => {
      if (s.words) {
        s.words.forEach((w: any) => {
          const trimmed = w.word.trim();
          if (trimmed) whisperWords.push(trimmed);
        });
      }
    });

    const normalize = (w: string) => w.replace(/[.,!?:;\"\'\(\)\-]/g, "").toLowerCase();

    const lessonWords: string[] = [];
    calibratedSegments.forEach((s: any) => {
      const ws = s.text.trim().split(/\s+/);
      ws.forEach((w: string) => lessonWords.push(w));
    });

    expect(lessonWords.length).toBe(106);
    expect(whisperWords.length).toBe(106);

    const normLesson = lessonWords.map(normalize);
    const normWhisper = whisperWords.map(normalize);
    expect(normLesson).toEqual(normWhisper);
  });
});

