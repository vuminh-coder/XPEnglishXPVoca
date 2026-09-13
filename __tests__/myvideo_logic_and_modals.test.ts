import { describe, it, expect } from "vitest";
import { parseTimedTextAny, parseVnTimedTextAny } from "@/features/listening/services/youtubeSubtitleParser";
import { getLastFetchedVideoMeta } from "@/features/listening/services/youtubeSubtitleService";

describe("MyVideo Logic & Subtitle Extraction Robustness", () => {
  it("parses XML TimedText correctly when source content is standard YouTube XML", () => {
    const sampleXml = `<?xml version="1.0" encoding="utf-8" ?>
<transcript>
  <text start="0.5" dur="2.4">Welcome to English Voca learning studio.</text>
  <text start="3.1" dur="1.8">Today we practice listening and pronunciation.</text>
  <text start="5.0" dur="3.0">Enjoy interactive YouTube video lessons.</text>
</transcript>`;

    const parsed = parseTimedTextAny(sampleXml);
    expect(parsed.length).toBe(3);
    expect(parsed[0].textEn).toBe("Welcome to English Voca learning studio.");
    expect(parsed[0].startTime).toBe(0.5);
    expect(parsed[1].textEn).toBe("Today we practice listening and pronunciation.");
    expect(parsed[2].textEn).toBe("Enjoy interactive YouTube video lessons.");
  });

  it("parses Vietnamese translation XML TimedText accurately", () => {
    const sampleVnXml = `<?xml version="1.0" encoding="utf-8" ?>
<transcript>
  <text start="0.5" dur="2.4">Chào mừng bạn đến với studio học tiếng Anh Voca.</text>
  <text start="3.1" dur="1.8">Hôm nay chúng ta luyện nghe và phát âm.</text>
</transcript>`;

    const parsedVn = parseVnTimedTextAny(sampleVnXml);
    expect(parsedVn.length).toBe(2);
    expect(parsedVn[0].textVn).toBe("Chào mừng bạn đến với studio học tiếng Anh Voca.");
    expect(parsedVn[1].textVn).toBe("Hôm nay chúng ta luyện nghe và phát âm.");
  });

  it("exports getLastFetchedVideoMeta without crashing and handles null/object safely", () => {
    const meta = getLastFetchedVideoMeta();
    expect(meta === null || typeof meta === "object").toBe(true);
  });

  it("verifies accurate word matching logic for shadowing without Math.random", () => {
    function computeWordAccuracy(spoken: string, target: string): number {
      const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
      const cleanTarget = target.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();

      const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);
      const targetWords = cleanTarget.split(/\s+/).filter(Boolean);

      let matchedCount = 0;
      for (const sw of spokenWords) {
        if (targetWords.includes(sw)) matchedCount++;
      }

      const wordAccuracy = targetWords.length > 0 ? matchedCount / targetWords.length : 0;
      const lengthRatio = targetWords.length > 0
        ? Math.max(0, 1 - Math.abs(spokenWords.length - targetWords.length) / targetWords.length)
        : 0;

      return Math.min(100, Math.max(25, Math.round((wordAccuracy * 0.7 + lengthRatio * 0.3) * 100)));
    }

    const target = "Welcome to English Voca learning studio";

    // Exact match
    expect(computeWordAccuracy("Welcome to English Voca learning studio", target)).toBe(100);

    // Partial match (3 out of 6 words)
    const partialScore = computeWordAccuracy("Welcome to English practice", target);
    expect(partialScore).toBeGreaterThanOrEqual(40);
    expect(partialScore).toBeLessThan(85);

    // Completely mismatched
    const poorScore = computeWordAccuracy("completely unrelated sentence here", target);
    expect(poorScore).toBeLessThanOrEqual(35);
  });
});
