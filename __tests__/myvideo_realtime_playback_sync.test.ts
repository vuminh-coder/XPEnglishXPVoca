import { describe, it, expect } from "vitest";
import { SubtitleSentence } from "@/stores/videoStore";
import { calculateCharacterWeightedWordIndex } from "@/features/listening/services/youtubeSubtitleParser";

describe("MyVideo Real-Time Playback & Subtitle Synchronization Tests", () => {
  const videoSubtitles: SubtitleSentence[] = [
    {
      id: "cue_0",
      startTime: 0.0,
      endTime: 3.5,
      textEn: "Welcome to this lesson today.",
      textVn: "Chào mừng các bạn đến với bài học hôm nay.",
      dictationWord: "lesson",
      wordTimings: [
        { word: "Welcome", start: 0.0, end: 0.7 },
        { word: "to", start: 0.7, end: 1.1 },
        { word: "this", start: 1.1, end: 1.6 },
        { word: "lesson", start: 1.6, end: 2.5 },
        { word: "today.", start: 2.5, end: 3.5 },
      ],
    },
    {
      id: "cue_1",
      startTime: 4.5, // 1.0s gap from cue_0
      endTime: 8.0,
      textEn: "Practice English every single day.",
      textVn: "Hãy luyện tập tiếng Anh mỗi ngày.",
      dictationWord: "Practice",
    },
  ];

  // Engine model mimicking useYouTubePlayerSync
  class RealtimeSubtitleEngine {
    baseTime = 0;
    currentTime = 0;
    activeSubIndex = 0;
    activeWordIndex = 0;
    isCueSpeaking = false;
    isPlaying = false;
    playbackSpeed = 1.0;
    isLoopingSentence = false;
    lastUpdated = 0;
    lastSeekTimestamp = 0;
    targetSeekTime = -1;

    play(startTime = 0, now = Date.now()) {
      this.isPlaying = true;
      this.baseTime = startTime;
      this.currentTime = startTime;
      this.lastUpdated = now;
      this.tick(now);
    }

    pause(now = Date.now()) {
      this.isPlaying = false;
      this.baseTime = this.currentTime;
      this.lastUpdated = now;
    }

    seek(time: number, now = Date.now()) {
      this.baseTime = time;
      this.currentTime = time;
      this.lastUpdated = now;
      this.lastSeekTimestamp = now;
      this.targetSeekTime = time;
      this.tick(now);
    }

    handleIncomingYTTime(time: number, now = Date.now()) {
      const isRecentSeek = now - this.lastSeekTimestamp < 800;
      if (isRecentSeek && this.targetSeekTime >= 0 && Math.abs(time - this.targetSeekTime) > 2.0) {
        return; // Stale message rejected
      }
      this.baseTime = time;
      this.lastUpdated = now;
    }

    tick(now = Date.now()) {
      const timeSinceUpdate = now - this.lastUpdated;
      let nextTime = Math.max(0, this.baseTime);

      if (this.isPlaying && this.lastUpdated > 0 && timeSinceUpdate < 4000) {
        const elapsed = (timeSinceUpdate / 1000) * this.playbackSpeed;
        nextTime = parseFloat((this.baseTime + elapsed).toFixed(3));
      }

      // Looping sentence check
      if (this.isLoopingSentence && videoSubtitles[this.activeSubIndex]) {
        const loopCue = videoSubtitles[this.activeSubIndex];
        if (nextTime >= loopCue.endTime - 0.15) {
          nextTime = loopCue.startTime;
          this.baseTime = loopCue.startTime;
          this.lastUpdated = now;
          this.lastSeekTimestamp = now;
          this.targetSeekTime = loopCue.startTime;
        }
      }

      this.currentTime = nextTime;

      // Binary search cue matching
      let matchedIdx = -1;
      let isSpeaking = false;
      let lo = 0,
        hi = videoSubtitles.length - 1;

      while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        if (nextTime >= videoSubtitles[mid].startTime && nextTime < videoSubtitles[mid].endTime) {
          matchedIdx = mid;
          isSpeaking = true;
          break;
        }
        if (nextTime < videoSubtitles[mid].startTime) {
          hi = mid - 1;
        } else {
          lo = mid + 1;
        }
      }

      if (matchedIdx === -1) {
        const prevCue = lo > 0 ? videoSubtitles[lo - 1] : null;
        const nextCue = lo < videoSubtitles.length ? videoSubtitles[lo] : null;

        if (prevCue && nextTime - prevCue.endTime < 0.15) {
          matchedIdx = lo - 1;
          isSpeaking = true;
        } else if (nextCue && nextCue.startTime - nextTime < 0.08) {
          matchedIdx = lo;
          isSpeaking = false;
        } else if (lo < videoSubtitles.length && lo >= 0) {
          matchedIdx = lo;
          isSpeaking = false;
        }
      }

      if (matchedIdx !== -1) {
        this.activeSubIndex = matchedIdx;
      }
      this.isCueSpeaking = isSpeaking;

      // Word level karaoke
      const targetSub = videoSubtitles[this.activeSubIndex];
      let newWordIdx = -1;
      if (targetSub && isSpeaking) {
        if (targetSub.wordTimings && targetSub.wordTimings.length > 0) {
          for (let w = 0; w < targetSub.wordTimings.length; w++) {
            const wt = targetSub.wordTimings[w];
            if (nextTime >= wt.start && nextTime <= wt.end) {
              newWordIdx = w;
              break;
            }
            if (nextTime > wt.end) {
              newWordIdx = w;
            }
          }
          if (newWordIdx < 0) newWordIdx = 0;
        } else if (nextTime >= targetSub.startTime && nextTime <= targetSub.endTime) {
          const duration = Math.max(0.4, targetSub.endTime - targetSub.startTime);
          const elapsed = Math.max(0, Math.min(duration, nextTime - targetSub.startTime));
          newWordIdx = calculateCharacterWeightedWordIndex(targetSub.textEn, elapsed, duration);
        }
      }
      this.activeWordIndex = newWordIdx;
    }
  }

  describe("Live Playback Simulation over Continuous Timeline", () => {
    it("smoothly tracks cue 0, enters gap, and transitions into cue 1 in real time", () => {
      const engine = new RealtimeSubtitleEngine();
      let now = 10000;
      engine.play(0.0, now);

      expect(engine.activeSubIndex).toBe(0);
      expect(engine.isCueSpeaking).toBe(true);
      expect(engine.activeWordIndex).toBe(0); // "Welcome"

      // Advance by 1.2s -> inside word 2 ("this")
      now += 1200;
      engine.handleIncomingYTTime(1.2, now);
      engine.tick(now);
      expect(engine.currentTime).toBeCloseTo(1.2, 1);
      expect(engine.activeSubIndex).toBe(0);
      expect(engine.isCueSpeaking).toBe(true);
      expect(engine.activeWordIndex).toBe(2); // "this" (1.1 - 1.6)

      // Advance to 3.8s -> in gap between cue 0 (ends 3.5) and cue 1 (starts 4.5)
      now += 2600; // total 3.8s
      engine.handleIncomingYTTime(3.8, now);
      engine.tick(now);
      expect(engine.currentTime).toBeCloseTo(3.8, 1);
      expect(engine.isCueSpeaking).toBe(false); // In gap

      // Advance to 5.0s -> inside cue 1 (4.5 - 8.0)
      now += 1200; // total 5.0s
      engine.handleIncomingYTTime(5.0, now);
      engine.tick(now);
      expect(engine.currentTime).toBeCloseTo(5.0, 1);
      expect(engine.activeSubIndex).toBe(1);
      expect(engine.isCueSpeaking).toBe(true);
      expect(engine.activeWordIndex).toBeGreaterThanOrEqual(0);
    });

    it("monotonic time progression with simulated periodic YouTube updates (every 250ms)", () => {
      const engine = new RealtimeSubtitleEngine();
      let now = 10000;
      engine.play(0.0, now);

      let prevTime = -1;
      for (let step = 1; step <= 20; step++) {
        now += 100; // 100ms clock advance
        // YouTube delivers postMessage every 250ms
        if (step % 2 === 0) {
          engine.handleIncomingYTTime(step * 0.1, now);
        }
        engine.tick(now);

        expect(engine.currentTime).toBeGreaterThanOrEqual(prevTime); // Monotonic, never goes backward
        prevTime = engine.currentTime;
      }
    });

    it("correctly scales time progress at 1.5x speed", () => {
      const engine = new RealtimeSubtitleEngine();
      let now = 10000;
      engine.playbackSpeed = 1.5;
      engine.play(0.0, now);

      now += 1000; // 1.0s elapsed in wall clock
      engine.tick(now);

      expect(engine.currentTime).toBeCloseTo(1.5, 1); // 1.5s video time
    });

    it("handles live jumpToSubtitleIndex and immediately locks to target cue without jumping back", () => {
      const engine = new RealtimeSubtitleEngine();
      let now = 10000;
      engine.play(1.0, now);

      // User seeks to cue 1 (starts at 4.5s)
      now += 500;
      engine.seek(4.5, now);
      expect(engine.activeSubIndex).toBe(1);
      expect(engine.currentTime).toBe(4.5);

      // A stale postMessage arrives 100ms later from pre-seek (1.2s)
      now += 100;
      engine.handleIncomingYTTime(1.2, now); // Should be ignored
      engine.tick(now);

      expect(engine.activeSubIndex).toBe(1); // Stays on cue 1!
      expect(engine.currentTime).toBeGreaterThanOrEqual(4.5);
    });

    it("loops the sentence seamlessly when reaching end threshold", () => {
      const engine = new RealtimeSubtitleEngine();
      let now = 10000;
      engine.isLoopingSentence = true;
      engine.play(3.0, now); // Near end of cue 0 (ends at 3.5s)

      now += 400; // 3.4s reaches loop threshold (3.5 - 0.15 = 3.35)
      engine.tick(now);

      expect(engine.currentTime).toBe(0.0); // Reset to startTime of cue 0
      expect(engine.activeSubIndex).toBe(0);
    });
  });
});
