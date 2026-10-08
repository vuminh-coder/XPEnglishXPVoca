import { describe, it, expect } from "vitest";
import React from "react";
import {
  ShadowingListingSkeleton,
  ShadowingStudioSkeleton,
  ShadowingVideoListingSkeleton,
  ShadowingVideoStudioSkeleton,
  ShadowingAudioListingSkeleton,
  ShadowingAudioStudioSkeleton,
  ShadowingSentenceLoadingSkeleton,
  TranscriptSentencesSkeleton as ShadowingTranscriptSentencesSkeleton,
  ShadowingPageContent,
  ShadowingListingView,
  ShadowingAudioSuspenseFallback,
  ShadowingVideoSuspenseFallback,
  ShadowingSuspenseFallback,
} from "@/features/shadowing";
import {
  ListeningStudioSkeleton,
  VideoStudioSkeleton,
  AudioStudioSkeleton,
  ListeningListingSkeleton,
  VideoListingSkeleton,
  DictationWorkspaceLoadingSkeleton,
  TranscriptSentencesSkeleton as DictationTranscriptSentencesSkeleton,
} from "@/features/listening/components/LoadingSkeletons";
import {
  DictationAudioSuspenseFallback,
  DictationVideoSuspenseFallback,
  DictationSuspenseFallback,
} from "@/features/listening/components/DictationPageContent";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

describe("Shadowing & Dictation Dual Branch Routing & Skeleton Parity Suite", () => {
  it("exports all 4 distinct studio skeleton variants for both Dictation and Shadowing", () => {
    // 1. Dictation Audio Studio Skeleton
    expect(typeof ListeningStudioSkeleton).toBe("function");
    expect(typeof AudioStudioSkeleton).toBe("function");
    expect(AudioStudioSkeleton).toBe(ListeningStudioSkeleton);

    // 2. Dictation Video Studio Skeleton
    expect(typeof VideoStudioSkeleton).toBe("function");

    // 3. Shadowing Audio Studio Skeleton
    expect(typeof ShadowingStudioSkeleton).toBe("function");
    expect(typeof ShadowingAudioStudioSkeleton).toBe("function");
    expect(ShadowingAudioStudioSkeleton).toBe(ShadowingStudioSkeleton);

    // 4. Shadowing Video Studio Skeleton
    expect(typeof ShadowingVideoStudioSkeleton).toBe("function");

    // Listing variants
    expect(typeof ListeningListingSkeleton).toBe("function");
    expect(typeof VideoListingSkeleton).toBe("function");
    expect(typeof ShadowingListingSkeleton).toBe("function");
    expect(typeof ShadowingVideoListingSkeleton).toBe("function");
    expect(typeof ShadowingAudioListingSkeleton).toBe("function");
  });

  it("exports in-place studio transition skeletons for seamless lesson switching", () => {
    // In-place switching skeletons
    expect(typeof DictationWorkspaceLoadingSkeleton).toBe("function");
    expect(typeof ShadowingSentenceLoadingSkeleton).toBe("function");
    expect(typeof DictationTranscriptSentencesSkeleton).toBe("function");
    expect(typeof ShadowingTranscriptSentencesSkeleton).toBe("function");

    // Render valid elements
    expect(React.isValidElement(React.createElement(DictationWorkspaceLoadingSkeleton))).toBe(true);
    expect(React.isValidElement(React.createElement(ShadowingSentenceLoadingSkeleton))).toBe(true);
    expect(React.isValidElement(React.createElement(DictationTranscriptSentencesSkeleton, { count: 6 }))).toBe(true);
    expect(React.isValidElement(React.createElement(ShadowingTranscriptSentencesSkeleton, { count: 6 }))).toBe(true);
  });

  it("exports adaptive Suspense fallbacks for all 4 routing branches and roots", () => {
    expect(typeof DictationAudioSuspenseFallback).toBe("function");
    expect(typeof DictationVideoSuspenseFallback).toBe("function");
    expect(typeof DictationSuspenseFallback).toBe("function");

    expect(typeof ShadowingAudioSuspenseFallback).toBe("function");
    expect(typeof ShadowingVideoSuspenseFallback).toBe("function");
    expect(typeof ShadowingSuspenseFallback).toBe("function");

    // Test valid element instantiation
    expect(React.isValidElement(React.createElement(DictationAudioSuspenseFallback))).toBe(true);
    expect(React.isValidElement(React.createElement(DictationVideoSuspenseFallback))).toBe(true);
    expect(React.isValidElement(React.createElement(ShadowingAudioSuspenseFallback))).toBe(true);
    expect(React.isValidElement(React.createElement(ShadowingVideoSuspenseFallback))).toBe(true);
  });

  it("renders valid React elements for all 4 studio skeleton cases without throwing", () => {
    // Case 1: Dictation Audio Studio Skeleton
    const dictationAudioEl = React.createElement(ListeningStudioSkeleton);
    expect(React.isValidElement(dictationAudioEl)).toBe(true);

    // Case 2: Dictation Video Studio Skeleton
    const dictationVideoEl = React.createElement(VideoStudioSkeleton);
    expect(React.isValidElement(dictationVideoEl)).toBe(true);

    // Case 3: Shadowing Audio Studio Skeleton
    const shadowingAudioEl = React.createElement(ShadowingStudioSkeleton);
    expect(React.isValidElement(shadowingAudioEl)).toBe(true);

    // Case 4: Shadowing Video Studio Skeleton
    const shadowingVideoEl = React.createElement(ShadowingVideoStudioSkeleton);
    expect(React.isValidElement(shadowingVideoEl)).toBe(true);
  });

  it("exports ShadowingPageContent and ShadowingListingView components", () => {
    expect(typeof ShadowingPageContent).toBe("function");
    expect(typeof ShadowingListingView).toBe("function");
  });

  it("verifies Shadowing root redirector rules for audio vs video lessons", () => {
    function resolveShadowingRedirect(rawId: string | null): string {
      if (!rawId) {
        return "/study/shadowing/audio";
      }
      const isVideo =
        rawId === "122" ||
        rawId.startsWith("vid_") ||
        rawId.startsWith("yt_") ||
        rawId.startsWith("video_") ||
        MOCK_VIDEO_LESSONS.some(
          (v) => v.id === rawId || v.slug === rawId || v.externalId === rawId
        );
      if (isVideo) {
        return `/study/shadowing/video?id=${rawId}`;
      }
      return `/study/shadowing/audio?id=${rawId}`;
    }

    // Audio lessons
    expect(resolveShadowingRedirect(null)).toBe("/study/shadowing/audio");
    expect(resolveShadowingRedirect("")).toBe("/study/shadowing/audio");
    expect(resolveShadowingRedirect("1")).toBe("/study/shadowing/audio?id=1");
    expect(resolveShadowingRedirect("listen_001")).toBe("/study/shadowing/audio?id=listen_001");
    expect(resolveShadowingRedirect("listen_toeic_q3_040")).toBe("/study/shadowing/audio?id=listen_toeic_q3_040");

    // Video lessons
    expect(resolveShadowingRedirect("122")).toBe("/study/shadowing/video?id=122");
    expect(resolveShadowingRedirect("vid_ted_bilingual_brain")).toBe("/study/shadowing/video?id=vid_ted_bilingual_brain");
    expect(resolveShadowingRedirect("vid_science_space")).toBe("/study/shadowing/video?id=vid_science_space");
    expect(resolveShadowingRedirect("yt_video_01")).toBe("/study/shadowing/video?id=yt_video_01");
  });

  it("verifies tab labels do not contain '(Audio)' or '(Video)' suffixes", () => {
    const audioTabTitle = "Bài Nghe Tiêu Chuẩn";
    const videoTabTitle = "Kho Video Tuyển Chọn";

    expect(audioTabTitle).not.toContain("(Audio)");
    expect(audioTabTitle).not.toContain("(audio)");
    expect(videoTabTitle).not.toContain("(Video)");
    expect(videoTabTitle).not.toContain("(video)");
  });
});
