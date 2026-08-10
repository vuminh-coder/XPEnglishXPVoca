import { describe, it, expect } from "vitest";
import {
  parseTimedTextXml,
  parseTimedTextJson3,
  parseTimedTextAny,
  mergeFragmentedSubtitlesIntoSentences,
  bridgeSubtitleGaps,
  calculateCharacterWeightedWordIndex,
  extractDictationWord,
  formatTimestampMs,
  ParsedXmlItem,
} from "@/lib/services/youtubeSubtitleParser";

// Helper simulating binary search matching logic from app/(dashboard)/myvideo/page.tsx
function binarySearchSubtitleIndex(
  subs: { startTime: number; endTime: number }[],
  effectiveTime: number
): number {
  let matchedIdx = -1;
  let lo = 0, hi = subs.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (effectiveTime >= subs[mid].startTime && effectiveTime < subs[mid].endTime) {
      matchedIdx = mid;
      break;
    }
    if (effectiveTime < subs[mid].startTime) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  // Gap handling: if no exact match, find nearest cue
  if (matchedIdx === -1) {
    const prevCue = lo > 0 ? subs[lo - 1] : null;
    const nextCue = lo < subs.length ? subs[lo] : null;

    if (prevCue && effectiveTime - prevCue.endTime < 0.4) {
      matchedIdx = lo - 1;
    } else if (nextCue && nextCue.startTime - effectiveTime < 0.25) {
      matchedIdx = lo;
    } else if (subs.length > 0 && effectiveTime < subs[0].startTime) {
      matchedIdx = 0;
    }
  }

  return matchedIdx;
}

describe("MyVideo 100% Timeline Precision & Edge Case Suite", () => {
  describe("Binary Search Subtitle Matching with Gap Resilience", () => {
    const cues = [
      { startTime: 2.0, endTime: 5.0 },   // Cue 0
      { startTime: 5.8, endTime: 9.0 },   // Cue 1 (gap 0.8s from Cue 0)
      { startTime: 12.0, endTime: 15.0 }, // Cue 2 (gap 3.0s from Cue 1)
    ];

    it("matches exact cue timestamps accurately", () => {
      expect(binarySearchSubtitleIndex(cues, 2.0)).toBe(0);
      expect(binarySearchSubtitleIndex(cues, 3.5)).toBe(0);
      expect(binarySearchSubtitleIndex(cues, 4.99)).toBe(0);
      expect(binarySearchSubtitleIndex(cues, 5.8)).toBe(1);
      expect(binarySearchSubtitleIndex(cues, 13.0)).toBe(2);
    });

    it("handles small gap after cue (lookback < 0.4s) by holding previous cue", () => {
      // 5.2s is within 0.4s after Cue 0 ends at 5.0s -> holds Cue 0
      expect(binarySearchSubtitleIndex(cues, 5.2)).toBe(0);
    });

    it("handles upcoming gap before cue (lookahead < 0.25s) by showing next cue early", () => {
      // 5.65s is within 0.25s before Cue 1 start (5.8s) -> shows Cue 1 early
      expect(binarySearchSubtitleIndex(cues, 5.65)).toBe(1);
    });

    it("handles large gap (> 1.0s lookahead, > 0.5s lookback) cleanly", () => {
      // 10.0s is 1.0s past Cue 1 end (9.0) and 2.0s before Cue 2 start (12.0)
      expect(binarySearchSubtitleIndex(cues, 10.0)).toBe(-1);
    });

    it("handles before-first-cue timestamp by defaulting to first cue", () => {
      expect(binarySearchSubtitleIndex(cues, 0.5)).toBe(0);
    });
  });

  describe("Non-Overlapping Timeline Capping", () => {
    it("ensures XML cues with long durations never overlap into next cue start time", () => {
      const xmlStr = `
        <xml>
          <text start="10.0" dur="5.0">First sentence</text>
          <text start="12.0" dur="2.0">Second sentence</text>
        </xml>
      `;
      const parsed = parseTimedTextXml(xmlStr);
      expect(parsed).toHaveLength(2);
      expect(parsed[0].endTime).toBeLessThanOrEqual(parsed[1].startTime);
      expect(parsed[0].startTime).toBe(8.2); // 10.0 - 1.8 = 8.2s
      expect(parsed[0].endTime).toBe(10.2); // 12.0 - 1.8 = 10.2s
    });

    it("ensures JSON3 cues with tight gaps never overlap", () => {
      const jsonStr = JSON.stringify({
        events: [
          { tStartMs: 10000, dDurationMs: 3000, segs: [{ utf8: "Hello world" }] },
          { tStartMs: 11200, dDurationMs: 2000, segs: [{ utf8: "How are you" }] },
        ],
      });
      const parsed = parseTimedTextJson3(jsonStr);
      expect(parsed).toHaveLength(2);
      expect(parsed[0].endTime).toBeLessThanOrEqual(parsed[1].startTime);
      expect(parsed[0].startTime).toBe(8.2); // 10.0 - 1.8 = 8.2s
      expect(parsed[0].endTime).toBe(9.4);  // 11.2 - 1.8 = 9.4s
    });
  });

  describe("Adaptive Gap Bridging", () => {
    it("bridges gaps up to 0.8s when next cue starts with lowercase letter (continuation)", () => {
      const items: ParsedXmlItem[] = [
        { startTime: 1.0, endTime: 3.0, duration: 2.0, textEn: "I think that" },
        { startTime: 3.7, endTime: 5.0, duration: 1.3, textEn: "this is amazing" },
      ];
      const bridged = bridgeSubtitleGaps(items);
      expect(bridged[0].endTime).toBe(3.7);
      expect(bridged[0].duration).toBe(2.7);
    });

    it("does NOT bridge large gaps (> 0.8s) even with lowercase text", () => {
      const items: ParsedXmlItem[] = [
        { startTime: 1.0, endTime: 3.0, duration: 2.0, textEn: "First part" },
        { startTime: 4.5, endTime: 6.0, duration: 1.5, textEn: "second part" },
      ];
      const bridged = bridgeSubtitleGaps(items);
      expect(bridged[0].endTime).toBe(3.0);
    });
  });

  describe("Character-Weighted Word Indexing for Karaoke", () => {
    it("calculates correct active word index with punctuation pause weighting", () => {
      const text = "Hello, world! Welcome to English.";
      // 0 elapsed = first word
      expect(calculateCharacterWeightedWordIndex(text, 0, 4.0)).toBe(0);
      // Halfway = middle word
      const midWord = calculateCharacterWeightedWordIndex(text, 2.0, 4.0);
      expect(midWord).toBeGreaterThan(0);
      // End elapsed = last word
      expect(calculateCharacterWeightedWordIndex(text, 4.0, 4.0)).toBe(4);
    });
  });

  describe("Dictation Target Word Extraction Edge Cases", () => {
    it("preserves contractions and excludes stop words", () => {
      expect(extractDictationWord("Don't give up on your dreams")).toBe("dreams");
      expect(extractDictationWord("It's a beautiful afternoon")).toBe("beautiful");
    });
  });
});
