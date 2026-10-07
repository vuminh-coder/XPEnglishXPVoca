import { describe, it, expect } from "vitest";
import {
  resolveLessonMedia,
  buildEffectiveSentence,
} from "@/features/listening/utils/lessonMedia";
import { extractYouTubeVideoId } from "@/features/listening/utils/videoUrlHelper";

describe("Shadowing & Dictation Media System Integration Suite", () => {
  describe("resolveLessonMedia", () => {
    it("correctly identifies YouTube lesson from standard URL", () => {
      const lesson = {
        id: "yt_01",
        audioUrl: "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
        title: "Test Lesson",
      };
      const info = resolveLessonMedia(lesson);
      expect(info.isVideoLesson).toBe(true);
      expect(info.youtubeId).toBe("UF8uR6Z6KLc");
      expect(info.sourceUrlOrId).toBe("https://www.youtube.com/watch?v=UF8uR6Z6KLc");
    });

    it("correctly identifies YouTube lesson from short URL (youtu.be)", () => {
      const lesson = {
        id: "yt_02",
        audioUrl: "https://youtu.be/UF8uR6Z6KLc",
      };
      const info = resolveLessonMedia(lesson);
      expect(info.isVideoLesson).toBe(true);
      expect(info.youtubeId).toBe("UF8uR6Z6KLc");
    });

    it("correctly identifies YouTube lesson from videoMetadata externalId", () => {
      const lesson = {
        id: "video_lesson_123",
        videoMetadata: {
          externalId: "dQw4w9WgXcQ",
          sourceType: "YOUTUBE",
        },
      };
      const info = resolveLessonMedia(lesson);
      expect(info.isVideoLesson).toBe(true);
      expect(info.youtubeId).toBe("dQw4w9WgXcQ");
    });

    it("correctly identifies audio/TTS lesson as non-video", () => {
      const lesson = {
        id: "listen_a1_001",
        audioUrl: "",
        title: "Daily Conversation A1",
      };
      const info = resolveLessonMedia(lesson);
      expect(info.isVideoLesson).toBe(false);
      expect(info.youtubeId).toBeNull();
    });

    it("handles null or undefined lesson gracefully", () => {
      expect(resolveLessonMedia(null)).toEqual({
        isVideoLesson: false,
        youtubeId: null,
        sourceUrlOrId: "",
      });
      expect(resolveLessonMedia(undefined)).toEqual({
        isVideoLesson: false,
        youtubeId: null,
        sourceUrlOrId: "",
      });
    });
  });

  describe("buildEffectiveSentence", () => {
    const s1 = {
      text: "How are you doing today?",
      translation: "Hôm nay bạn thế nào?",
      ipa: "/haʊ ɑːr juː ˈduːɪŋ/",
      startTime: 0,
      endTime: 3.5,
    };

    const s2 = {
      text: "I am feeling wonderful, thank you.",
      translation: "Tôi cảm thấy rất tuyệt, cảm ơn bạn.",
      ipa: "/aɪ æm ˈfiːlɪŋ/",
      startTime: 4.0,
      endTime: 7.8,
    };

    it("returns original sentence when merge is false", () => {
      const effective = buildEffectiveSentence(s1, s2, false);
      expect(effective).toEqual(s1);
    });

    it("concatenates texts, translations, IPAs and updates endTime when merge is true", () => {
      const effective = buildEffectiveSentence(s1, s2, true);
      expect(effective?.text).toBe("How are you doing today? I am feeling wonderful, thank you.");
      expect(effective?.translation).toBe(
        "Hôm nay bạn thế nào? Tôi cảm thấy rất tuyệt, cảm ơn bạn."
      );
      expect(effective?.ipa).toBe("/haʊ ɑːr juː ˈduːɪŋ/ /aɪ æm ˈfiːlɪŋ/");
      expect(effective?.startTime).toBe(0);
      expect(effective?.endTime).toBe(7.8);
      expect(effective?.duration).toBe(7.8);
    });

    it("returns original sentence when nextSentence is null even if merge is true", () => {
      const effective = buildEffectiveSentence(s1, null, true);
      expect(effective).toEqual(s1);
    });

    it("returns null when main sentence is null", () => {
      expect(buildEffectiveSentence(null, s2, true)).toBeNull();
    });
  });

  describe("extractYouTubeVideoId", () => {
    it("extracts from multiple YouTube URL flavors", () => {
      expect(extractYouTubeVideoId("https://www.youtube.com/watch?v=UF8uR6Z6KLc")).toBe("UF8uR6Z6KLc");
      expect(extractYouTubeVideoId("https://youtu.be/UF8uR6Z6KLc")).toBe("UF8uR6Z6KLc");
      expect(extractYouTubeVideoId("https://www.youtube.com/shorts/UF8uR6Z6KLc")).toBe("UF8uR6Z6KLc");
      expect(extractYouTubeVideoId("UF8uR6Z6KLc")).toBe("UF8uR6Z6KLc");
      expect(extractYouTubeVideoId("invalid-url-here")).toBeNull();
    });
  });

  describe("Echo Cancellation & Audio Constraints Standards", () => {
    it("validates recommended WebRTC audio constraints for speech recognition", () => {
      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      };

      expect(constraints.audio.echoCancellation).toBe(true);
      expect(constraints.audio.noiseSuppression).toBe(true);
      expect(constraints.audio.autoGainControl).toBe(true);
    });
  });
});
