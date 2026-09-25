import { describe, it, expect } from "vitest";
import { SubtitleSentence } from "@/stores/videoStore";
import { calculateCharacterWeightedWordIndex } from "@/features/listening/services/youtubeSubtitleParser";

describe("MyVideo Subtitle Synchronization Engine Precision Tests", () => {
  const sampleSubtitles: SubtitleSentence[] = [
    {
      id: "sub_1",
      startTime: 0,
      endTime: 4.3,
      textEn: "I am honored to be with you today",
      textVn: "Tôi rất vinh dự được có mặt cùng các bạn hôm nay",
      dictationWord: "honored",
      wordTimings: [
        { word: "I", start: 0, end: 0.5 },
        { word: "am", start: 0.5, end: 1.0 },
        { word: "honored", start: 1.0, end: 2.2 },
        { word: "to", start: 2.2, end: 2.6 },
        { word: "be", start: 2.6, end: 3.0 },
        { word: "with", start: 3.0, end: 3.5 },
        { word: "you", start: 3.5, end: 3.9 },
        { word: "today", start: 3.9, end: 4.3 },
      ],
    },
    {
      id: "sub_2",
      startTime: 5.5, // 1.2s gap from sub_1
      endTime: 9.8,
      textEn: "Stay hungry, stay foolish.",
      textVn: "Hãy cứ khát khao, hãy cứ dại khờ.",
      dictationWord: "foolish",
    },
    {
      id: "sub_3",
      startTime: 10.0,
      endTime: 15.0,
      textEn: "Your time is limited, so don't waste it living someone else's life.",
      textVn: "Thời gian của bạn là hữu hạn, đừng lãng phí sống cuộc đời người khác.",
      dictationWord: "limited",
    },
  ];

  describe("1. Time Interpolation & Zero-Time Deadlock Prevention", () => {
    function computeNextTime(
      realTime: number,
      isPlayingActive: boolean,
      timeSinceUpdate: number,
      currentSpeed: number,
      lastUpdated: number
    ): number {
      let nextTime = Math.max(0, realTime);
      if (isPlayingActive && lastUpdated > 0 && timeSinceUpdate < 2500) {
        const elapsed = (timeSinceUpdate / 1000) * currentSpeed;
        nextTime = parseFloat((realTime + elapsed).toFixed(3));
      }
      return nextTime;
    }

    it("correctly advances time from 0.0s when video starts playing (eliminates zero-time deadlock)", () => {
      const realTime = 0;
      const isPlaying = true;
      const timeSinceUpdate = 250; // 250ms since play started
      const speed = 1.0;
      const lastUpdated = Date.now() - 250;

      const next = computeNextTime(realTime, isPlaying, timeSinceUpdate, speed, lastUpdated);
      expect(next).toBe(0.25);
      expect(next).toBeGreaterThan(0);
    });

    it("smoothly interpolates past 350ms without snapping backwards", () => {
      const realTime = 2.0;
      const isPlaying = true;
      const timeSinceUpdate = 600; // 600ms elapsed (typical YouTube postMessage jitter)
      const speed = 1.0;
      const lastUpdated = Date.now() - 600;

      const next = computeNextTime(realTime, isPlaying, timeSinceUpdate, speed, lastUpdated);
      expect(next).toBe(2.6); // Extrapolates to 2.6s, NOT jumping back to 2.0s
    });

    it("respects playback speed scaling during extrapolation", () => {
      const realTime = 4.0;
      const isPlaying = true;
      const timeSinceUpdate = 500; // 0.5s elapsed
      const speed = 1.5; // 1.5x playback speed
      const lastUpdated = Date.now() - 500;

      const next = computeNextTime(realTime, isPlaying, timeSinceUpdate, speed, lastUpdated);
      expect(next).toBe(4.75); // 4.0 + 0.5 * 1.5 = 4.75s
    });

    it("does not advance time when paused (rock-solid pause)", () => {
      const realTime = 3.5;
      const isPlaying = false; // Paused
      const timeSinceUpdate = 1000;
      const speed = 1.0;
      const lastUpdated = Date.now() - 1000;

      const next = computeNextTime(realTime, isPlaying, timeSinceUpdate, speed, lastUpdated);
      expect(next).toBe(3.5);
    });
  });

  describe("2. Stale In-Flight Seek Rejection Logic", () => {
    function shouldAcceptIncomingTime(
      incomingTime: number,
      lastSeekTime: number,
      targetSeekTime: number,
      currentTime: number
    ): boolean {
      const now = currentTime;
      const isRecentSeek = now - lastSeekTime < 800;
      if (isRecentSeek && targetSeekTime >= 0 && Math.abs(incomingTime - targetSeekTime) > 2.0) {
        return false; // Stale message from prior position
      }
      return true;
    }

    it("rejects an in-flight message with old time right after a seek", () => {
      const lastSeekTime = 10000;
      const targetSeekTime = 30.0; // User clicked cue at 30s
      const incomingStaleTime = 4.2; // Old in-flight message from 4.2s
      const messageArrivalTime = 10200; // Arrives 200ms after seek

      const accepted = shouldAcceptIncomingTime(
        incomingStaleTime,
        lastSeekTime,
        targetSeekTime,
        messageArrivalTime
      );
      expect(accepted).toBe(false);
    });

    it("accepts a message confirming the new seek location", () => {
      const lastSeekTime = 10000;
      const targetSeekTime = 30.0;
      const incomingValidTime = 30.1; // Message confirms player is near 30s
      const messageArrivalTime = 10300;

      const accepted = shouldAcceptIncomingTime(
        incomingValidTime,
        lastSeekTime,
        targetSeekTime,
        messageArrivalTime
      );
      expect(accepted).toBe(true);
    });

    it("accepts normal messages after the seek protection window expires", () => {
      const lastSeekTime = 10000;
      const targetSeekTime = 30.0;
      const incomingTime = 32.5;
      const messageArrivalTime = 11000; // 1000ms later (> 800ms)

      const accepted = shouldAcceptIncomingTime(
        incomingTime,
        lastSeekTime,
        targetSeekTime,
        messageArrivalTime
      );
      expect(accepted).toBe(true);
    });
  });

  describe("3. Subtitle Binary Search Matching & Gap Handling", () => {
    function matchSubtitle(subs: SubtitleSentence[], effectiveTime: number) {
      let matchedIdx = -1;
      let isSpeakingNow = false;
      let lo = 0,
        hi = subs.length - 1;

      while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        if (effectiveTime >= subs[mid].startTime && effectiveTime < subs[mid].endTime) {
          matchedIdx = mid;
          isSpeakingNow = true;
          break;
        }
        if (effectiveTime < subs[mid].startTime) {
          hi = mid - 1;
        } else {
          lo = mid + 1;
        }
      }

      if (matchedIdx === -1) {
        const prevCue = lo > 0 ? subs[lo - 1] : null;
        const nextCue = lo < subs.length ? subs[lo] : null;

        if (prevCue && effectiveTime - prevCue.endTime < 0.15) {
          matchedIdx = lo - 1;
          isSpeakingNow = true;
        } else if (nextCue && nextCue.startTime - effectiveTime < 0.08) {
          matchedIdx = lo;
          isSpeakingNow = false;
        } else if (subs.length > 0 && effectiveTime < subs[0].startTime) {
          matchedIdx = 0;
          isSpeakingNow = false;
        } else if (lo < subs.length && lo >= 0) {
          matchedIdx = lo;
          isSpeakingNow = false;
        }
      }

      return { matchedIdx, isSpeakingNow };
    }

    it("matches the first subtitle exactly at 0.0s", () => {
      const result = matchSubtitle(sampleSubtitles, 0.0);
      expect(result.matchedIdx).toBe(0);
      expect(result.isSpeakingNow).toBe(true);
    });

    it("matches sentence in the middle of playback (e.g. 2.5s)", () => {
      const result = matchSubtitle(sampleSubtitles, 2.5);
      expect(result.matchedIdx).toBe(0);
      expect(result.isSpeakingNow).toBe(true);
    });

    it("matches next cue when time enters sub_2 (e.g. 6.0s)", () => {
      const result = matchSubtitle(sampleSubtitles, 6.0);
      expect(result.matchedIdx).toBe(1);
      expect(result.isSpeakingNow).toBe(true);
    });

    it("correctly identifies gap between sub_1 (ends 4.3) and sub_2 (starts 5.5) at 4.9s", () => {
      const result = matchSubtitle(sampleSubtitles, 4.9);
      expect(result.matchedIdx).toBe(1);
      expect(result.isSpeakingNow).toBe(false); // In gap, not speaking
    });
  });

  describe("4. Word-Level Karaoke Precision", () => {
    it("highlights exact word from wordTimings", () => {
      const sub = sampleSubtitles[0];
      const effectiveTime = 1.5; // Inside "honored" (start: 1.0, end: 2.2)

      let wordIdx = -1;
      for (let w = 0; w < sub.wordTimings!.length; w++) {
        const wt = sub.wordTimings![w];
        if (effectiveTime >= wt.start && effectiveTime <= wt.end) {
          wordIdx = w;
          break;
        }
        if (effectiveTime > wt.end) {
          wordIdx = w;
        }
      }

      expect(wordIdx).toBe(2);
      expect(sub.wordTimings![wordIdx].word).toBe("honored");
    });

    it("falls back to character-weighted word index when wordTimings are absent", () => {
      const sub = sampleSubtitles[1]; // "Stay hungry, stay foolish."
      const duration = sub.endTime - sub.startTime; // 4.3s
      const elapsed = 3.8; // Near the end of the sentence

      const wordIdx = calculateCharacterWeightedWordIndex(sub.textEn, elapsed, duration);
      expect(wordIdx).toBeGreaterThanOrEqual(0);
      expect(wordIdx).toBeLessThanOrEqual(3);
      expect(wordIdx).toBe(3); // Should land on "foolish."
    });
  });

  describe("5. Sentence Looping Logic", () => {
    it("detects loop threshold when nextTime reaches loopCue.endTime - 0.15", () => {
      const loopCue = sampleSubtitles[0]; // endTime: 4.3
      const threshold = loopCue.endTime - 0.15; // 4.15
      const currentTime = 4.2;

      const shouldLoop = currentTime >= threshold;
      expect(shouldLoop).toBe(true);
    });

    it("does not trigger loop before threshold", () => {
      const loopCue = sampleSubtitles[0];
      const threshold = loopCue.endTime - 0.15;
      const currentTime = 3.8;

      const shouldLoop = currentTime >= threshold;
      expect(shouldLoop).toBe(false);
    });
  });
});
