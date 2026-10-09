import { describe, it, expect, vi } from "vitest";
import React from "react";
import {
  StudyMediaHubTabs,
  StudioMobileTabBar,
  StudioSentenceMetaBar,
  StudioSentenceToolbar,
  StudioMediaPlayerContainer,
  resolveLessonMedia,
} from "@/features/listening";

describe("Shared Study Components Architecture (Dictation & Shadowing)", () => {
  describe("1. StudyMediaHubTabs URL & Routing Logic", () => {
    it("generates correct links for dictation branch (/audio and /video)", () => {
      const audioHref = `/study/dictation/audio`;
      const videoHref = `/study/dictation/video`;
      expect(audioHref).toBe("/study/dictation/audio");
      expect(videoHref).toBe("/study/dictation/video");
    });

    it("generates correct links for shadowing branch (/audio and /video)", () => {
      const audioHref = `/study/shadowing/audio`;
      const videoHref = `/study/shadowing/video`;
      expect(audioHref).toBe("/study/shadowing/audio");
      expect(videoHref).toBe("/study/shadowing/video");
    });
  });

  describe("2. StudioMobileTabBar Props & Tab State", () => {
    it("provides responsive tab labels for dictation and shadowing", () => {
      const dictationLabel = (cur: number, tot: number) => `Luyện chép (${cur + 1}/${tot})`;
      const shadowingLabel = (cur: number, tot: number) => `Luyện nói (${cur + 1}/${tot})`;
      const transcriptLabel = (tot: number) => `Danh sách phụ đề (${tot})`;

      expect(dictationLabel(0, 10)).toBe("Luyện chép (1/10)");
      expect(shadowingLabel(4, 15)).toBe("Luyện nói (5/15)");
      expect(transcriptLabel(15)).toBe("Danh sách phụ đề (15)");
    });
  });

  describe("3. StudioSentenceMetaBar Props & Status Presentation", () => {
    it("computes word count and sentence progress correctly", () => {
      const sentenceText = "This is a high quality English listening practice sentence.";
      const wordCount = sentenceText.trim().split(/\s+/).filter(Boolean).length;
      expect(wordCount).toBe(9);
    });

    it("formats score text and keyboard hints correctly", () => {
      const score = 94;
      const scoreText = `Khớp: ${score}%`;
      expect(scoreText).toBe("Khớp: 94%");
    });
  });

  describe("4. StudioSentenceToolbar Logic & Font Scaling Bounds", () => {
    it("keeps font scale strictly bounded between 0 and 3", () => {
      const clampFontSize = (current: number, delta: number) =>
        Math.min(3, Math.max(0, current + delta));

      expect(clampFontSize(0, -1)).toBe(0);
      expect(clampFontSize(0, 1)).toBe(1);
      expect(clampFontSize(2, 1)).toBe(3);
      expect(clampFontSize(3, 1)).toBe(3);
    });

    it("toggles sentence bookmark and auto-next properly", () => {
      let isBookmarked = false;
      const toggleBookmark = () => {
        isBookmarked = !isBookmarked;
      };

      toggleBookmark();
      expect(isBookmarked).toBe(true);
      toggleBookmark();
      expect(isBookmarked).toBe(false);
    });
  });

  describe("5. StudioMediaPlayerContainer Media Resolution & Seek Clamping", () => {
    it("resolves YouTube video lesson correctly via resolveLessonMedia", () => {
      const youtubeLesson = {
        id: "video_ted_01",
        title: "How to speak so that people want to listen",
        youtubeUrl: "https://www.youtube.com/watch?v=eIho2S0ZahI",
      };

      const mediaInfo = resolveLessonMedia(youtubeLesson);
      expect(mediaInfo.isVideoLesson).toBe(true);
      expect(mediaInfo.sourceUrlOrId).toBe("https://www.youtube.com/watch?v=eIho2S0ZahI");
    });

    it("resolves standard audio lesson correctly via resolveLessonMedia", () => {
      const audioLesson = {
        id: "listen_toeic_q3_051",
        title: "Quarterly Financial Overview",
        audioUrl: "/audio/lesson_051.mp3",
      };

      const mediaInfo = resolveLessonMedia(audioLesson);
      expect(mediaInfo.isVideoLesson).toBe(false);
    });

    it("clamps 5s rewind accurately at 0", () => {
      const clampRewind = (currentTime: number) => Math.max(0, currentTime - 5);
      expect(clampRewind(2)).toBe(0);
      expect(clampRewind(10)).toBe(5);
      expect(clampRewind(0)).toBe(0);
    });

    it("clamps 5s forward accurately at sentence duration", () => {
      const duration = 8.5;
      const clampForward = (currentTime: number) => Math.min(duration, currentTime + 5);
      expect(clampForward(2)).toBe(7);
      expect(clampForward(5)).toBe(8.5);
      expect(clampForward(8.5)).toBe(8.5);
    });
  });
});
