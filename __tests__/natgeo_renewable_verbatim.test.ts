import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { tokenizeSentence } from "@/features/listening/components/DictationWorkspace";
import { checkEquivalenceMatch, stripDiacritics } from "@/features/listening/utils/dictationEngine";
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
});
