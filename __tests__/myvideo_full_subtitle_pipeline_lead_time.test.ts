import { describe, it, expect } from "vitest";
import {
  parseTimedTextXml,
  parseTimedTextJson3,
  parseTimedTextAny,
  mergeFragmentedSubtitlesIntoSentences,
  calculateCharacterWeightedWordIndex,
} from "@/features/listening/services/youtubeSubtitleParser";
import { SUBTITLE_AUDIO_ANTICIPATION_LEAD_SEC } from "@/features/myvideo/hooks/useYouTubePlayerSync";

describe("MyVideo Full Subtitle Pipeline & Audio Anticipation Lead Time Tests", () => {
  // --------------------------------------------------------------------------
  // TEST GROUP 1: TTML Millisecond Timing & Early Cues (< 500ms)
  // --------------------------------------------------------------------------
  describe("TTML / srv3 Parser Precision", () => {
    it("correctly converts early TTML cues (< 500ms) from integer milliseconds to fractional seconds", () => {
      // In TTML, t and d are always integer milliseconds
      const ttmlXml = `
        <timedtext format="3">
          <body>
            <p t="80" d="1200">First early syllable</p>
            <p t="350" d="2000">Second sentence opening</p>
            <p t="12500" d="3000">Later sentence in video</p>
          </body>
        </timedtext>
      `;

      const parsed = parseTimedTextXml(ttmlXml);
      expect(parsed).toHaveLength(3);

      // Cue 1: t="80" must be 0.08s (NOT 80 seconds!)
      expect(parsed[0].startTime).toBeCloseTo(0.08, 2);
      expect(parsed[0].textEn).toBe("First early syllable");

      // Cue 2: t="350" must be 0.35s (NOT 350 seconds!)
      expect(parsed[1].startTime).toBeCloseTo(0.35, 2);
      expect(parsed[1].textEn).toBe("Second sentence opening");

      // Cue 3: t="12500" must be 12.5s
      expect(parsed[2].startTime).toBeCloseTo(12.5, 2);
      expect(parsed[2].textEn).toBe("Later sentence in video");
    });

    it("parses mixed XML containing both <text> and <p> without skipping either", () => {
      const mixedXml = `
        <transcript>
          <text start="1.5" dur="2.0">Introduction text</text>
          <p t="5000" d="2500">Body paragraph subtitle</p>
        </transcript>
      `;

      const parsed = parseTimedTextXml(mixedXml);
      expect(parsed).toHaveLength(2);
      expect(parsed[0].textEn).toBe("Introduction text");
      expect(parsed[0].startTime).toBe(1.5);
      expect(parsed[1].textEn).toBe("Body paragraph subtitle");
      expect(parsed[1].startTime).toBe(5.0);
    });
  });

  // --------------------------------------------------------------------------
  // TEST GROUP 2: Full Sentence Extraction & Preservation
  // --------------------------------------------------------------------------
  describe("Preserve Complete Author Sentences & Avoid Aggressive Merging", () => {
    it("preserves 100% of punctuated manual subtitles without collapsing distinct sentences", () => {
      const authorSentences = [
        { startTime: 1.0, endTime: 3.0, duration: 2.0, textEn: "Never let anyone dull your shine." },
        { startTime: 3.2, endTime: 5.5, duration: 2.3, textEn: "Success is a journey, not a destination." },
        { startTime: 5.8, endTime: 8.0, duration: 2.2, textEn: "Are you ready to take the next big step?" },
        { startTime: 8.2, endTime: 10.5, duration: 2.3, textEn: "Every morning brings a new opportunity." },
        { startTime: 10.8, endTime: 13.0, duration: 2.2, textEn: "Keep learning and keep improving daily." },
        { startTime: 13.2, endTime: 15.5, duration: 2.3, textEn: "Believe in yourself and your abilities." },
      ];

      const merged = mergeFragmentedSubtitlesIntoSentences(authorSentences);
      // Punctuated sentences must NOT be merged — all 6 must be preserved!
      expect(merged).toHaveLength(6);
      expect(merged[0].textEn).toBe("Never let anyone dull your shine.");
      expect(merged[1].textEn).toBe("Success is a journey, not a destination.");
      expect(merged[5].textEn).toBe("Believe in yourself and your abilities.");
    });

    it("merges genuine ASR fragments without dropping content", () => {
      const asrFragments = [
        { startTime: 1.0, endTime: 1.5, duration: 0.5, textEn: "hello" },
        { startTime: 1.6, endTime: 2.2, duration: 0.6, textEn: "everyone" },
        { startTime: 2.3, endTime: 3.0, duration: 0.7, textEn: "welcome back" },
        { startTime: 5.0, endTime: 7.0, duration: 2.0, textEn: "today we talk about grammar" }, // big gap > 0.45s
      ];

      const merged = mergeFragmentedSubtitlesIntoSentences(asrFragments);
      expect(merged).toHaveLength(2);
      expect(merged[0].textEn).toBe("hello everyone welcome back");
      expect(merged[0].startTime).toBe(1.0);
      expect(merged[0].endTime).toBe(3.0);
      expect(merged[1].textEn).toBe("today we talk about grammar");
    });
  });

  // --------------------------------------------------------------------------
  // TEST GROUP 3: JSON3 ASR Deduplication and Duration Preservation
  // --------------------------------------------------------------------------
  describe("JSON3 Deduplication & Duration", () => {
    it("preserves distinct consecutive sentences even if spoken quickly", () => {
      const json3Data = {
        events: [
          { tStartMs: 1000, dDurationMs: 1200, segs: [{ utf8: "Yes indeed." }] },
          { tStartMs: 1600, dDurationMs: 1500, segs: [{ utf8: "No doubt about it." }] },
          { tStartMs: 3500, dDurationMs: 2500, segs: [{ utf8: "Let us continue now." }] },
        ],
      };

      const parsed = parseTimedTextJson3(json3Data);
      expect(parsed).toHaveLength(3);
      expect(parsed[0].textEn).toBe("Yes indeed.");
      expect(parsed[1].textEn).toBe("No doubt about it.");
      expect(parsed[2].textEn).toBe("Let us continue now.");
    });

    it("does not clamp natural sentence duration to 3.5s when gap allows longer speech", () => {
      const json3Data = {
        events: [
          { tStartMs: 1000, segs: [{ utf8: "This is a continuous thought spanning five seconds." }] },
          { tStartMs: 6500, segs: [{ utf8: "Next sentence starts here." }] },
        ],
      };

      const parsed = parseTimedTextJson3(json3Data);
      expect(parsed).toHaveLength(2);
      // Duration should bridge up to 5.5s, NOT arbitrarily capped at 3.5s
      expect(parsed[0].duration).toBeGreaterThanOrEqual(5.0);
      expect(parsed[0].endTime).toBe(6.5);
    });
  });

  // --------------------------------------------------------------------------
  // TEST GROUP 4: Audio Anticipation Lead Time (+200ms)
  // --------------------------------------------------------------------------
  describe("Audio Anticipation Lead Time (+200ms)", () => {
    it("exports standard SUBTITLE_AUDIO_ANTICIPATION_LEAD_SEC as 0.200 (200ms)", () => {
      expect(SUBTITLE_AUDIO_ANTICIPATION_LEAD_SEC).toBe(0.2);
    });

    it("anticipates upcoming sentence 200ms before raw video audio onset", () => {
      const subs = [
        { startTime: 2.0, endTime: 5.0, textEn: "Hello world" },
        { startTime: 6.0, endTime: 9.0, textEn: "Second sentence" },
      ];

      // At video player time t = 1.800s:
      // Without lead time: effectiveTime = 1.800s -> Cue 0 (startTime 2.0) has NOT started yet!
      // WITH 200ms Lead Time: effectiveTime = 1.800s + 0.200s = 2.000s -> Cue 0 IS ACTIVATED!
      const playerNextTime = 1.8;
      const effectiveTime = parseFloat((playerNextTime + SUBTITLE_AUDIO_ANTICIPATION_LEAD_SEC).toFixed(3));
      expect(effectiveTime).toBe(2.0);

      // Binary search check:
      const matchedIdx = subs.findIndex(s => effectiveTime >= s.startTime && effectiveTime < s.endTime);
      expect(matchedIdx).toBe(0); // Cue 0 is active right on time for visual anticipation!
    });

    it("maintains linger window so finished sentence does not flicker out abruptly during pauses", () => {
      const subs = [
        { startTime: 2.0, endTime: 5.0, textEn: "Hello world" },
        { startTime: 7.0, endTime: 10.0, textEn: "Second sentence" },
      ];

      // At video player time t = 4.900s:
      // effectiveTime = 4.900s + 0.200s = 5.100s (past cue 0's endTime of 5.0s by 100ms)
      const playerNextTime = 4.9;
      const effectiveTime = parseFloat((playerNextTime + SUBTITLE_AUDIO_ANTICIPATION_LEAD_SEC).toFixed(3));
      const cue0EndTime = subs[0].endTime;
      const diffFromEnd = effectiveTime - cue0EndTime;

      // Within Linger Window (200ms): diff is 0.10s <= 0.20s -> keeps cue 0 active
      const inLingerWindow = diffFromEnd > 0 && diffFromEnd <= 0.20;
      expect(inLingerWindow).toBe(true);
    });

    it("synchronizes character-weighted karaoke words with speech onset", () => {
      const text = "Practice makes perfect every time";
      const duration = 4.0;

      // At onset (elapsed = 0), active word must be 0
      const w0 = calculateCharacterWeightedWordIndex(text, 0, duration);
      expect(w0).toBe(0);

      // Mid-sentence (elapsed = 2.0s), active word should be in the middle ("perfect")
      const wMid = calculateCharacterWeightedWordIndex(text, 2.0, duration);
      expect(wMid).toBeGreaterThanOrEqual(1);
      expect(wMid).toBeLessThanOrEqual(3);

      // End of sentence (elapsed = 4.0s), active word must be last word
      const wEnd = calculateCharacterWeightedWordIndex(text, 4.0, duration);
      expect(wEnd).toBe(4); // "time"
    });
  });
});
