import { describe, it, expect } from "vitest";
import {
  parseTimedTextJson3,
  bridgeSubtitleGaps,
  mergeFragmentedSubtitlesIntoSentences,
  alignBilingualSubtitles,
  calculateCharacterWeightedWordIndex,
  decodeXmlEntities,
  WordTimingItem,
  ParsedXmlItem,
} from "@/features/listening/services/youtubeSubtitleParser";
import { PRESET_YOUTUBE_VIDEOS } from "@/stores/videoStore";

describe("MyVideo Subtitle Timeline Sync Precision Suite", () => {
  describe("1. Real Preset Videos Integrity", () => {
    it("verifies all 3 preset videos have valid IDs and authentic bilingual subtitles", () => {
      expect(PRESET_YOUTUBE_VIDEOS.length).toBe(3);

      for (const video of PRESET_YOUTUBE_VIDEOS) {
        expect(video.id).toBeTruthy();
        expect(video.title).toBeTruthy();
        expect(video.authorName).toBeTruthy();
        expect(video.subtitles.length).toBeGreaterThan(0);

        // Verify every subtitle sentence has valid, non-negative, ascending timestamps
        for (let i = 0; i < video.subtitles.length; i++) {
          const sub = video.subtitles[i];
          expect(sub.startTime).toBeGreaterThanOrEqual(0);
          expect(sub.endTime).toBeGreaterThan(sub.startTime);
          expect(sub.textEn.trim().length).toBeGreaterThan(0);
          expect(sub.textVn.trim().length).toBeGreaterThan(0);

          if (i > 0) {
            expect(sub.startTime).toBeGreaterThanOrEqual(video.subtitles[i - 1].startTime);
          }
        }
      }
    });

    it("verifies Steve Jobs commencement address preset starts with authentic cue", () => {
      const jobsVideo = PRESET_YOUTUBE_VIDEOS.find((v) => v.id === "UF8uR6Z6KLc");
      expect(jobsVideo).toBeDefined();
      expect(jobsVideo?.subtitles[0].textEn).toContain("honored to be with you today");
      expect(jobsVideo?.subtitles[0].startTime).toBe(0.0);
    });
  });

  describe("2. JSON3 Segment-Level Word Timing Extraction", () => {
    it("extracts sub-second wordTimings from YouTube JSON3 segs with tOffsetMs", () => {
      const mockJson3 = {
        wireMagic: "pb3",
        events: [
          {
            tStartMs: 1200,
            dDurationMs: 2500,
            segs: [
              { utf8: "Stay", tOffsetMs: 0 },
              { utf8: " hungry,", tOffsetMs: 450 },
              { utf8: " stay", tOffsetMs: 1100 },
              { utf8: " foolish.", tOffsetMs: 1600 },
            ],
          },
        ],
      };

      const result = parseTimedTextJson3(JSON.stringify(mockJson3));
      expect(result.length).toBe(1);
      expect(result[0].startTime).toBe(1.2);
      expect(result[0].endTime).toBe(3.7);
      expect(result[0].textEn).toBe("Stay hungry, stay foolish.");

      const timings = result[0].wordTimings;
      expect(timings).toBeDefined();
      expect(timings?.length).toBe(4);
      expect(timings?.[0].word).toBe("Stay");
      expect(timings?.[0].start).toBe(1.2);
      expect(timings?.[1].word).toBe("hungry,");
      expect(timings?.[1].start).toBe(1.65); // 1.2 + 0.45
      expect(timings?.[2].word).toBe("stay");
      expect(timings?.[2].start).toBe(2.3); // 1.2 + 1.1
      expect(timings?.[3].word).toBe("foolish.");
      expect(timings?.[3].start).toBe(2.8); // 1.2 + 1.6
    });

    it("preserves wordTimings when merging fragmented ASR cues into complete sentences", () => {
      const cue1: ParsedXmlItem = {
        startTime: 1.0,
        endTime: 2.0,
        duration: 1.0,
        textEn: "Stay",
        wordTimings: [{ word: "Stay", start: 1.0, end: 2.0 }],
      };
      const cue2: ParsedXmlItem = {
        startTime: 2.1,
        endTime: 3.5,
        duration: 1.4,
        textEn: "hungry",
        wordTimings: [{ word: "hungry", start: 2.1, end: 3.5 }],
      };

      const merged = mergeFragmentedSubtitlesIntoSentences([cue1, cue2]);
      expect(merged.length).toBe(1);
      expect(merged[0].textEn).toBe("Stay hungry");
      expect(merged[0].wordTimings?.length).toBe(2);
      expect(merged[0].wordTimings?.[0].word).toBe("Stay");
      expect(merged[0].wordTimings?.[1].word).toBe("hungry");
    });
  });

  describe("3. Karaoke Word Highlighting & Punctuation Cadence", () => {
    it("returns exact word index across speech duration with punctuation delay", () => {
      const sentence = "Thank you. I am honored to be here.";
      const duration = 4.0;

      // At start (0.1s): word 0 ("Thank")
      const wordStart = calculateCharacterWeightedWordIndex(sentence, 0.1, duration);
      expect(wordStart).toBe(0);

      // Past halfway (2.5s): should be on "honored" or "to"
      const wordMid = calculateCharacterWeightedWordIndex(sentence, 2.5, duration);
      expect(wordMid).toBeGreaterThan(1);

      // At end (3.9s): last word ("here.")
      const wordEnd = calculateCharacterWeightedWordIndex(sentence, 3.9, duration);
      const totalWords = sentence.split(/\s+/).length;
      expect(wordEnd).toBe(totalWords - 1);
    });
  });

  describe("4. Binary Search Gap Isolation Logic", () => {
    it("accurately detects speaking vs silence gaps", () => {
      const cues = [
        { startTime: 2.0, endTime: 5.0, textEn: "First sentence" },
        { startTime: 8.0, endTime: 12.0, textEn: "Second sentence" },
      ];

      function checkSpeakingAt(time: number): { matchedIdx: number; isSpeaking: boolean } {
        let lo = 0, hi = cues.length - 1;
        let matchedIdx = -1;
        let isSpeaking = false;

        while (lo <= hi) {
          const mid = (lo + hi) >>> 1;
          if (time >= cues[mid].startTime && time < cues[mid].endTime) {
            matchedIdx = mid;
            isSpeaking = true;
            break;
          }
          if (time < cues[mid].startTime) hi = mid - 1;
          else lo = mid + 1;
        }

        if (matchedIdx === -1) {
          const prev = lo > 0 ? cues[lo - 1] : null;
          if (prev && time - prev.endTime < 0.15) {
            matchedIdx = lo - 1;
            isSpeaking = true;
          } else if (lo < cues.length && lo >= 0) {
            matchedIdx = lo;
            isSpeaking = false;
          }
        }
        return { matchedIdx, isSpeaking };
      }

      // During speech (3.5s): should be actively speaking cue 0
      const inSpeech = checkSpeakingAt(3.5);
      expect(inSpeech.matchedIdx).toBe(0);
      expect(inSpeech.isSpeaking).toBe(true);

      // In silence break (6.5s): preview cue 1, but isSpeaking MUST BE FALSE
      const inSilence = checkSpeakingAt(6.5);
      expect(inSilence.matchedIdx).toBe(1);
      expect(inSilence.isSpeaking).toBe(false);

      // At voice decay boundary (5.08s, within 0.15s of cue 0 end): considered speaking
      const inDecay = checkSpeakingAt(5.08);
      expect(inDecay.matchedIdx).toBe(0);
      expect(inDecay.isSpeaking).toBe(true);

      // During second sentence (9.0s): actively speaking cue 1
      const inSpeech2 = checkSpeakingAt(9.0);
      expect(inSpeech2.matchedIdx).toBe(1);
      expect(inSpeech2.isSpeaking).toBe(true);
    });
  });
});
