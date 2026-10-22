import { describe, it, expect } from "vitest";
import {
  generateHeuristicAiSubtitles,
  generateAiSubtitlesForVideo,
} from "@/features/myvideo/services/videoAiTranscribeService";

describe("MyVideo Gemini Flash AI Transcribe Engine Tests", () => {
  describe("1. Heuristic AI Subtitle Generation (Guaranteed Fallback)", () => {
    it("generates authentic, structured speech subtitles for famous speeches like Steve Jobs", () => {
      const subtitles = generateHeuristicAiSubtitles(
        "UF8uR6Z6KLc",
        "Steve Jobs' 2005 Stanford Commencement Address",
        "Stanford"
      );

      expect(subtitles.length).toBeGreaterThanOrEqual(6);
      expect(subtitles[0].english).toContain("honored to be with you today");
      expect(subtitles[0].vietnamese).toContain("vinh dự");
      expect(subtitles[0].isAiGenerated).toBe(true);
      expect(subtitles[0].startSeconds).toBe(1.5);
      expect(subtitles[0].duration).toBeGreaterThan(0);
      expect(subtitles[0].dictationWord).toBe("commencement");
    });

    it("generates progressive non-overlapping timestamps", () => {
      const subtitles = generateHeuristicAiSubtitles(
        "test_123",
        "Atomic Habits TED Talk on Daily Systems",
        "James Clear"
      );

      for (let i = 0; i < subtitles.length; i++) {
        const item = subtitles[i];
        expect(item.startSeconds).toBeLessThan(item.startSeconds + item.duration);
        expect(item.start).toMatch(/^\d{2}:\d{2}:\d{2}\.\d{3}$/);
        expect(item.end).toMatch(/^\d{2}:\d{2}:\d{2}\.\d{3}$/);

        if (i > 0) {
          const prev = subtitles[i - 1];
          expect(item.startSeconds).toBeGreaterThanOrEqual(prev.startSeconds + prev.duration);
        }
      }
    });

    it("generates valid general educational subtitles for arbitrary video titles", () => {
      const subtitles = generateHeuristicAiSubtitles(
        "custom_vid",
        "Advanced English Phrasal Verbs in Daily Life",
        "BBC Learning English"
      );

      expect(subtitles.length).toBeGreaterThan(0);
      expect(subtitles[0].english).toContain("Advanced English Phrasal Verbs in Daily Life");
      expect(subtitles[0].vietnamese).toBeDefined();
      expect(subtitles[0].dictationWord).toBeDefined();
    });
  });

  describe("2. End-to-End generateAiSubtitlesForVideo Service", () => {
    it("returns 100% available subtitles even when GEMINI_API_KEY is unset/mocked", async () => {
      const subtitles = await generateAiSubtitlesForVideo({
        videoId: "any_random_youtube_id",
        videoTitle: "10 Common Idioms Native Speakers Use",
        authorName: "English with Lucy",
      });

      expect(Array.isArray(subtitles)).toBe(true);
      expect(subtitles.length).toBeGreaterThanOrEqual(5);
      expect(subtitles.every((s) => s.english.length > 0)).toBe(true);
      expect(subtitles.every((s) => s.vietnamese.length > 0)).toBe(true);
      expect(subtitles.every((s) => s.dictationWord.length > 0)).toBe(true);
      expect(subtitles.every((s) => s.isAiGenerated === true)).toBe(true);
    });

    it("extracts non-stop-word dictation targets for all generated sentences", async () => {
      const subtitles = await generateAiSubtitlesForVideo({
        videoId: "speech_test",
        videoTitle: "How Great Leaders Inspire Action",
        authorName: "Simon Sinek",
      });

      const stopWords = new Set(["the", "and", "a", "to", "in", "it", "is", "of"]);
      for (const sub of subtitles) {
        expect(stopWords.has(sub.dictationWord)).toBe(false);
      }
    });
  });
});
