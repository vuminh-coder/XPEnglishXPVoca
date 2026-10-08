import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("BBC 6 Minute English: Why Laughter is the Best Medicine - 100% Verbatim Audit", () => {
  const calibratedPath = path.resolve(process.cwd(), "scripts/bbc_laugh_18_calibrated.json");
  const calibratedSegments = JSON.parse(fs.readFileSync(calibratedPath, "utf8"));

  it("should have exactly 18 calibrated segments covering 00:02 to 01:45", () => {
    expect(calibratedSegments.length).toBe(18);
    expect(calibratedSegments[0].startTime).toBe(2.75);
    expect(calibratedSegments[17].endTime).toBe(105.5);
  });

  it("should have strictly ordered, non-overlapping timestamps with positive durations", () => {
    for (let i = 0; i < calibratedSegments.length; i++) {
      const seg = calibratedSegments[i];
      expect(seg.orderIndex).toBe(i);
      expect(seg.endTime).toBeGreaterThan(seg.startTime);
      const dur = seg.endTime - seg.startTime;
      expect(dur).toBeGreaterThanOrEqual(2.5);
      expect(dur).toBeLessThanOrEqual(11.0);

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
      expect(seg.explanation.length).toBeGreaterThan(0);
    }
  });

  it("should tokenize all 18 segments with zero empty tokens (254 words total)", () => {
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
    expect(totalWordCount).toBe(254);
  });

  it("should match mock data in videoCatalogMockData.ts exactly", () => {
    const bbcMock = MOCK_VIDEO_LESSONS.find((v) => v.id === "vid_bbc_why_we_laugh");
    expect(bbcMock).toBeDefined();
    expect(bbcMock?.externalId).toBe("Fez57g8jMNM");
    expect(bbcMock?.durationSeconds).toBe(106);
    expect(bbcMock?.durationFormatted).toBe("01:46");
    expect(bbcMock?.accent).toBe("en-GB");
    expect(bbcMock?.segments.length).toBe(18);

    for (let i = 0; i < 18; i++) {
      expect(bbcMock?.segments[i].text).toBe(calibratedSegments[i].text);
      expect(bbcMock?.segments[i].startTime).toBe(calibratedSegments[i].startTime);
      expect(bbcMock?.segments[i].endTime).toBe(calibratedSegments[i].endTime);
      expect(bbcMock?.segments[i].translationVi).toBe(calibratedSegments[i].translationVi);
    }
  });
});
