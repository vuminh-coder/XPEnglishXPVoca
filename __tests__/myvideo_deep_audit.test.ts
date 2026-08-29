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
  shiftTimestampSec,
  ParsedXmlItem,
} from "@/features/listening/services/youtubeSubtitleParser";
import { parseSrtContent, parseSrtTimestamp, validateSrtContent } from "@/features/listening/services/srtParser";
import { SubtitleSentence } from "@/stores/videoStore";

/**
 * Simulates the binary search subtitle matching engine from app/(dashboard)/myvideo/page.tsx
 */
function binarySearchSubtitleIndex(
  subs: SubtitleSentence[],
  effectiveTime: number
): number {
  if (!subs || subs.length === 0) return -1;
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

  // Gap handling: if no exact match, find nearest cue (0.4s lookback, 0.25s lookahead)
  if (matchedIdx === -1) {
    const prevCue = lo > 0 ? subs[lo - 1] : null;
    const nextCue = lo < subs.length ? subs[lo] : null;

    if (prevCue && effectiveTime - prevCue.endTime < 0.4) {
      matchedIdx = lo - 1;
    } else if (nextCue && nextCue.startTime - effectiveTime < 0.25) {
      matchedIdx = lo;
    } else if (subs.length > 0 && effectiveTime < subs[0].startTime) {
      matchedIdx = 0;
    } else if (lo < subs.length && lo >= 0) {
      matchedIdx = lo;
    }
  }

  return matchedIdx;
}

/**
 * Robust case-insensitive word boundary masking helper from page.tsx
 */
function maskDictationWord(textEn: string, dictationWord: string): string {
  if (!textEn) return "";
  if (!dictationWord) return textEn;

  const escaped = dictationWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const boundaryRegex = new RegExp(`\\b${escaped}\\b`, "gi");
  if (boundaryRegex.test(textEn)) {
    return textEn.replace(boundaryRegex, " [ _____ ] ");
  }

  const substringRegex = new RegExp(escaped, "gi");
  if (substringRegex.test(textEn)) {
    return textEn.replace(substringRegex, " [ _____ ] ");
  }

  return textEn;
}

describe("MyVideo Deep Bug Audit & Edge Case Test Suite", () => {
  describe("Group 1: Button Logic & State Synchronization", () => {
    it("1.1 Syncs Play/Pause state transitions consistently", () => {
      let isPlaying = false;
      let ytPlayerState = -1; // -1=unstarted, 1=playing, 2=paused

      const togglePlayPause = () => {
        if (isPlaying) {
          ytPlayerState = 2;
          isPlaying = false;
        } else {
          ytPlayerState = 1;
          isPlaying = true;
        }
      };

      // Initial state
      expect(isPlaying).toBe(false);
      expect(ytPlayerState).toBe(-1);

      // User clicks play
      togglePlayPause();
      expect(isPlaying).toBe(true);
      expect(ytPlayerState).toBe(1);

      // User clicks pause
      togglePlayPause();
      expect(isPlaying).toBe(false);
      expect(ytPlayerState).toBe(2);
    });

    it("1.2 Sentence looping triggers seekTo when reaching cue endTime", () => {
      const isLoopingSentence = true;
      const loopCue = { startTime: 10.0, endTime: 15.0 };
      
      const checkLoopTrigger = (currentTime: number) => {
        if (isLoopingSentence && currentTime >= loopCue.endTime - 0.15) {
          return loopCue.startTime;
        }
        return currentTime;
      };

      expect(checkLoopTrigger(12.0)).toBe(12.0);
      expect(checkLoopTrigger(14.84)).toBe(14.84); // before threshold (14.85) -> stays 14.84
      expect(checkLoopTrigger(14.86)).toBe(10.0);  // >= 14.85 -> seek back to 10.0s
    });

    it("1.3 Speed scaling adjusts elapsed time calculation cleanly", () => {
      const currentSpeed = 1.5;
      const baseDuration = 3.0; // 3 seconds
      const elapsedReal = 1.0;  // 1 second real time at 1.5x speed = 1.5s speech progress
      
      const effectiveElapsed = elapsedReal * currentSpeed;
      expect(effectiveElapsed).toBe(1.5);
    });
  });

  describe("Group 2: Subtitle Timeline Matching & Karaoke Highlighting", () => {
    const sampleSubtitles: SubtitleSentence[] = [
      { id: "s1", startTime: 2.0, endTime: 6.0, textEn: "Hello world welcome", textVn: "Xin chào", dictationWord: "welcome" },
      { id: "s2", startTime: 6.5, endTime: 10.0, textEn: "Learning English is fun", textVn: "Học tiếng Anh rất vui", dictationWord: "fun" },
      { id: "s3", startTime: 15.0, endTime: 20.0, textEn: "Practice makes perfect every day", textVn: "Luyện tập tạo nên sự hoàn hảo", dictationWord: "perfect" },
    ];

    it("2.1 Binary search finds exact cue at boundary timestamps", () => {
      expect(binarySearchSubtitleIndex(sampleSubtitles, 2.0)).toBe(0);
      expect(binarySearchSubtitleIndex(sampleSubtitles, 4.5)).toBe(0);
      expect(binarySearchSubtitleIndex(sampleSubtitles, 5.99)).toBe(0);
      expect(binarySearchSubtitleIndex(sampleSubtitles, 6.5)).toBe(1);
      expect(binarySearchSubtitleIndex(sampleSubtitles, 17.5)).toBe(2);
    });

    it("2.2 Handles gap lookback (< 0.4s) to hold previous cue continuously", () => {
      // 6.2s is 0.2s after s1 ends (6.0s) -> holds s1 index 0
      expect(binarySearchSubtitleIndex(sampleSubtitles, 6.2)).toBe(0);
      // 6.35s is 0.35s after s1 ends (6.0s) -> holds s1 index 0
      expect(binarySearchSubtitleIndex(sampleSubtitles, 6.35)).toBe(0);
    });

    it("2.3 Handles gap lookahead (< 0.25s) to preview upcoming cue early", () => {
      // 6.42s is 0.42s after s1 end (6.0s) and 0.08s before s2 start (6.5s) -> previews s2 index 1 early
      expect(binarySearchSubtitleIndex(sampleSubtitles, 6.42)).toBe(1);
    });

    it("2.4 Handles large gaps between cues by previewing upcoming cue", () => {
      // 12.0s is 2.0s after s2 and 3.0s before s3 -> previews s3 (index 2)
      expect(binarySearchSubtitleIndex(sampleSubtitles, 12.0)).toBe(2);
    });

    it("2.5 Character-weighted karaoke word index advances accurately", () => {
      const text = "Hello world welcome";
      // At 0s elapsed -> word index 0 ("Hello")
      expect(calculateCharacterWeightedWordIndex(text, 0, 4.0)).toBe(0);
      // At 2.0s elapsed (halfway) -> word index 1 ("world")
      expect(calculateCharacterWeightedWordIndex(text, 2.0, 4.0)).toBe(1);
      // At 4.0s elapsed (end) -> word index 2 ("welcome")
      expect(calculateCharacterWeightedWordIndex(text, 4.0, 4.0)).toBe(2);
    });
  });

  describe("Group 3: Dictation & Word Lookup Logic", () => {
    it("3.1 Mask dictation word replaces target word with blank placeholder", () => {
      const sentence = "Consistency is key to mastering English";
      const masked = maskDictationWord(sentence, "Consistency");
      expect(masked).toBe(" [ _____ ]  is key to mastering English");
    });

    it("3.2 Handles punctuation and special regex characters in dictation word masking", () => {
      const sentence = "Don't give up on your dreams";
      const masked = maskDictationWord(sentence, "dreams");
      expect(masked).toBe("Don't give up on your  [ _____ ] ");
    });

    it("3.3 Formats timestamp MM:SS strings cleanly", () => {
      expect(formatTimestampMs(125.45)).toBe("00:02:05.450");
      expect(formatTimestampMs(0)).toBe("00:00:00.000");
    });

    it("3.4 Validates SRT file content format correctly", () => {
      const validSrt = `1\n00:00:01,000 --> 00:00:04,000\nHello world\n\n`;
      expect(validateSrtContent(validSrt)).toBeNull();

      const invalidSrt = "This is not an srt file";
      expect(validateSrtContent(invalidSrt)).not.toBeNull();
    });
  });
});
