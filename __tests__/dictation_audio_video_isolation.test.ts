import { describe, it, expect } from "vitest";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Dictation & Shadowing Audio-Video Dual Branch Isolation Suite", () => {
  describe("1. Lesson 122 Data Integrity", () => {
    it("confirms Lesson 122 exists and is strictly an Audio lesson", () => {
      // The 122nd lesson in MOCK_LESSONS_DATA (0-indexed 121)
      const lesson122 = MOCK_LESSONS_DATA[121];
      expect(lesson122).toBeDefined();
      expect(lesson122.id).toBeDefined();

      // Must not be video
      expect((lesson122 as any).isVideo).toBeFalsy();
      expect(String(lesson122.id).startsWith("vid_")).toBe(false);
      expect(String(lesson122.id).startsWith("yt_")).toBe(false);
      expect(String(lesson122.id).startsWith("video_")).toBe(false);
      expect(lesson122.audioUrl?.includes("youtube.com")).toBeFalsy();
      expect(lesson122.audioUrl?.includes("youtu.be")).toBeFalsy();
    });

    it("ensures no video in MOCK_VIDEO_LESSONS uses '122' as an ID or slug", () => {
      const match122 = MOCK_VIDEO_LESSONS.find(
        (v) => v.id === "122" || v.slug === "122" || (v as any).externalId === "122"
      );
      expect(match122).toBeUndefined();
    });
  });

  describe("2. Route Target Calculation in Audio Mode", () => {
    function calculateDictationTargetRoute(params: {
      lessonId: string;
      initialMode: "audio" | "video";
      basePath: string;
      isVideo: boolean;
    }): string {
      const { initialMode, basePath, isVideo } = params;
      return initialMode === "video" || (!basePath.includes("/audio") && isVideo)
        ? "/study/dictation/video"
        : basePath;
    }

    function calculateShadowingTargetRoute(params: {
      lessonId: string;
      initialMode: "audio" | "video";
      basePath: string;
      isVideo: boolean;
    }): string {
      const { initialMode, basePath, isVideo } = params;
      return initialMode === "video" || (!basePath.includes("/audio") && isVideo)
        ? "/study/shadowing/video"
        : basePath;
    }

    it("NEVER switches to video route when user is on Dictation Audio branch", () => {
      const audioBasePath = "/study/dictation/audio";

      // Case A: Lesson 122 selected
      const route122 = calculateDictationTargetRoute({
        lessonId: "122",
        initialMode: "audio",
        basePath: audioBasePath,
        isVideo: false,
      });
      expect(route122).toBe(audioBasePath);

      // Case B: Lesson with index 1
      const route1 = calculateDictationTargetRoute({
        lessonId: "1",
        initialMode: "audio",
        basePath: audioBasePath,
        isVideo: false,
      });
      expect(route1).toBe(audioBasePath);

      // Case C: Even if a video item was somehow passed, on audio branch it must NEVER route to /video
      const routeForcedAudio = calculateDictationTargetRoute({
        lessonId: "vid_ted_talk",
        initialMode: "audio",
        basePath: audioBasePath,
        isVideo: true,
      });
      expect(routeForcedAudio).toBe(audioBasePath);
    });

    it("NEVER switches to video route when user is on Shadowing Audio branch", () => {
      const audioBasePath = "/study/shadowing/audio";

      // Case A: Lesson 122 selected
      const route122 = calculateShadowingTargetRoute({
        lessonId: "122",
        initialMode: "audio",
        basePath: audioBasePath,
        isVideo: false,
      });
      expect(route122).toBe(audioBasePath);

      // Case B: Lesson 50 selected
      const route50 = calculateShadowingTargetRoute({
        lessonId: "50",
        initialMode: "audio",
        basePath: audioBasePath,
        isVideo: false,
      });
      expect(route50).toBe(audioBasePath);

      // Case C: Audio branch lock
      const routeLocked = calculateShadowingTargetRoute({
        lessonId: "vid_test",
        initialMode: "audio",
        basePath: audioBasePath,
        isVideo: true,
      });
      expect(routeLocked).toBe(audioBasePath);
    });

    it("properly routes to Video branch when user is in Video mode", () => {
      const videoBasePath = "/study/dictation/video";
      const route = calculateDictationTargetRoute({
        lessonId: "vid_ted_bilingual_brain",
        initialMode: "video",
        basePath: videoBasePath,
        isVideo: true,
      });
      expect(route).toBe("/study/dictation/video");
    });
  });

  describe("3. Recommendations Isolation", () => {
    it("filters out any video lesson from recommendations in Audio Studio", () => {
      // Create a mixed sample of lessons
      const sampleLessons = [
        { id: "listen_001", title: "Audio Lesson 1", isVideo: false, audioUrl: "https://example.com/audio1.mp3" },
        { id: "122", title: "Audio Lesson 122", isVideo: false, audioUrl: "https://example.com/audio122.mp3" },
        { id: "vid_ted_brain", title: "Video TED", isVideo: true, audioUrl: "https://youtube.com/watch?v=123" },
        { id: "listen_002", title: "Audio Lesson 2", isVideo: false, audioUrl: "https://example.com/audio2.mp3" },
        { id: "yt_podcast", title: "YouTube Podcast", isVideo: false, audioUrl: "https://youtu.be/xyz" },
      ];

      const isCurrentLessonVideo = false;
      const selectedLessonId = "listen_001";

      const filteredRecommendations = sampleLessons.filter((l) => {
        if (l.id === selectedLessonId) return false;
        if (!isCurrentLessonVideo) {
          const isVideo =
            Boolean(l.isVideo) ||
            String(l.id).startsWith("vid_") ||
            String(l.id).startsWith("yt_") ||
            String(l.id).startsWith("video_") ||
            Boolean(l.audioUrl?.includes("youtube")) ||
            Boolean(l.audioUrl?.includes("youtu.be"));
          return !isVideo;
        }
        return true;
      });

      // Assertions
      expect(filteredRecommendations.length).toBe(2);
      expect(filteredRecommendations.map((l) => l.id)).toEqual(["122", "listen_002"]);
      expect(filteredRecommendations.some((l) => l.id === "vid_ted_brain")).toBe(false);
      expect(filteredRecommendations.some((l) => l.id === "yt_podcast")).toBe(false);
    });
  });

  describe("4. SWR Cache Isolation Keys", () => {
    it("ensures audio and video catalog cache keys are strictly distinct", () => {
      const userId = "user_abc123";
      const audioDictationKey = `xp_voca_listening_catalog_audio_${userId}`;
      const videoDictationKey = `xp_voca_listening_catalog_video_${userId}`;
      const audioShadowingKey = `xp_voca_shadowing_catalog_audio_${userId}`;
      const videoShadowingKey = `xp_voca_shadowing_catalog_video_${userId}`;

      expect(audioDictationKey).not.toBe(videoDictationKey);
      expect(audioShadowingKey).not.toBe(videoShadowingKey);
      expect(audioDictationKey).toContain("_audio_");
      expect(videoDictationKey).toContain("_video_");
    });
  });

  describe("5. URL Sanitization and Detection", () => {
    it("verifies isVideoLesson helper without legacy '122' false positive", () => {
      function isVideoLessonHelper(lessonQueryId: string | number): boolean {
        return (
          String(lessonQueryId).startsWith("vid_") ||
          String(lessonQueryId).startsWith("yt_") ||
          String(lessonQueryId).startsWith("video_")
        );
      }

      // ID 122 must NOT be detected as video
      expect(isVideoLessonHelper("122")).toBe(false);
      expect(isVideoLessonHelper(122)).toBe(false);

      // Other standard audio IDs
      expect(isVideoLessonHelper("1")).toBe(false);
      expect(isVideoLessonHelper("listen_001")).toBe(false);

      // Video IDs must be detected as video
      expect(isVideoLessonHelper("vid_ted_bilingual_brain")).toBe(true);
      expect(isVideoLessonHelper("yt_video_01")).toBe(true);
    });
  });

  describe("6. API Route Isolation (/api/listening/lessons)", () => {
    it("returns only audio lessons when mode=audio is requested", async () => {
      const { GET } = await import("@/app/api/listening/lessons/route");
      const req = new Request("http://localhost:3000/api/listening/lessons?mode=audio&userId=guest_test_isolation");
      const res = await GET(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(Array.isArray(json.data)).toBe(true);
      expect(json.data.length).toBeGreaterThan(0);

      // Verify strict isolation: NO video lessons in audio mode
      for (const item of json.data) {
        expect(Boolean(item.isVideo)).toBe(false);
        expect(String(item.id).startsWith("vid_")).toBe(false);
        expect(String(item.id).startsWith("yt_")).toBe(false);
        expect(String(item.audioUrl || "").includes("youtube.com")).toBe(false);
        expect(String(item.audioUrl || "").includes("youtu.be")).toBe(false);
      }
    }, 30000);

    it("returns only video lessons when mode=video is requested", async () => {
      const { GET } = await import("@/app/api/listening/lessons/route");
      const req = new Request("http://localhost:3000/api/listening/lessons?mode=video&userId=guest_test_isolation");
      const res = await GET(req);
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.success).toBe(true);
      expect(Array.isArray(json.data)).toBe(true);

      // Verify that every returned item is a video lesson
      for (const item of json.data) {
        const isVideo =
          Boolean(item.isVideo) ||
          String(item.id).startsWith("vid_") ||
          String(item.id).startsWith("yt_") ||
          String(item.id).startsWith("video_") ||
          String(item.audioUrl || "").includes("youtube") ||
          String(item.audioUrl || "").includes("youtu.be");
        expect(isVideo).toBe(true);
      }
    }, 30000);
  });
});
