import { describe, it, expect } from "vitest";
import {
  parseTimedTextAny,
  parseVnTimedTextAny,
  parseTimedTextJson3,
  parseTimedTextXml,
  mergeFragmentedSubtitlesIntoSentences,
  alignBilingualSubtitles,
  decodeXmlEntities,
} from "@/features/listening/services/youtubeSubtitleParser";
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

  it("deduplicates ASR rolling cues with fuzzy word overlap (>= 80% word containment)", () => {
    const json3Data = {
      events: [
        {
          tStartMs: 1000,
          dDurationMs: 600,
          segs: [{ utf8: "practice listening skills" }],
        },
        {
          tStartMs: 1400, // timeDiff = 0.4s (< 0.8s)
          dDurationMs: 800,
          segs: [{ utf8: "practice listening skills daily" }], // extends previous with > 80% overlap
        },
      ],
    };

    const parsed = parseTimedTextJson3(json3Data);
    expect(parsed.length).toBe(1);
    expect(parsed[0].textEn).toBe("practice listening skills daily");
  });

  it("merges trailing 1-2 word fragments into sentences with up to 12 words", () => {
    const fragments = [
      {
        startTime: 0.0,
        endTime: 3.0,
        duration: 3.0,
        textEn: "This is a longer sentence with ten words describing the study technique",
      },
      {
        startTime: 3.1, // tight continuation (gap = 0.1s <= 0.45s)
        endTime: 3.8,
        duration: 0.7,
        textEn: "very well", // 2-word fragment
      },
    ];

    const merged = mergeFragmentedSubtitlesIntoSentences(fragments);
    expect(merged.length).toBe(1);
    expect(merged[0].textEn).toBe("This is a longer sentence with ten words describing the study technique very well");
    expect(merged[0].startTime).toBe(0.0);
    expect(merged[0].endTime).toBe(3.8);
  });

  it("correctly handles TTML millisecond timestamps vs second timestamps", () => {
    // Case 1: Milliseconds (both t and d > 100 or t > 500)
    const ttmlMs = `<tt><p t="3500" d="1200">Hello in milliseconds</p></tt>`;
    const parsedMs = parseTimedTextXml(ttmlMs);
    expect(parsedMs.length).toBe(1);
    expect(parsedMs[0].startTime).toBe(3.5);
    expect(parsedMs[0].duration).toBe(1.2);

    // Case 2: Seconds (< 100s video)
    const ttmlSec = `<tt><p t="12.5" d="3.0">Hello in seconds</p></tt>`;
    const parsedSec = parseTimedTextXml(ttmlSec);
    expect(parsedSec.length).toBe(1);
    expect(parsedSec[0].startTime).toBe(12.5);
    expect(parsedSec[0].duration).toBe(3.0);
  });

  it("normalizes Vietnamese Unicode NFD decomposed forms to NFC", () => {
    // "Tiếng Việt" in decomposed NFD format: Ti + ê + combining acute (\u0301), Vi + ê + combining dot below (\u0323)
    const nfdString = "Ti\u00ea\u0301ng Vi\u00ea\u0323t";
    const decoded = decodeXmlEntities(`<b>${nfdString}</b>`);
    // After decodeXmlEntities, should strip <b> tags and normalize to NFC
    expect(decoded).toBe("Tiếng Việt");
    expect(decoded.normalize("NFC")).toBe(decoded);
  });

  it("aligns Vietnamese cues with tolerance up to 6.0s", () => {
    const enItems = [
      {
        startTime: 10.0,
        endTime: 14.0,
        duration: 4.0,
        textEn: "Artificial intelligence is changing the way we learn languages.",
      },
    ];
    const vnItems = [
      {
        startTime: 15.0, // 5.0s offset from en.startTime (previously missed with 4.0s limit, now captured with 6.0s)
        textVn: "Trí tuệ nhân tạo đang thay đổi cách chúng ta học ngôn ngữ.",
      },
    ];

    const aligned = alignBilingualSubtitles(enItems, vnItems);
    expect(aligned.length).toBe(1);
    expect(aligned[0].textVn).toBe("Trí tuệ nhân tạo đang thay đổi cách chúng ta học ngôn ngữ.");
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

