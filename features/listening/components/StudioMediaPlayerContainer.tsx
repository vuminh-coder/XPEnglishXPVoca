"use client";

import React, { useCallback } from "react";
import { VideoCinemaFrame } from "./VideoCinemaFrame";
import { StudioWaveformCard } from "./StudioWaveformCard";
import { resolveLessonMedia } from "../utils/lessonMedia";
import type { MediaDisplayMode } from "./MediaDisplayModeToggle";

export interface StudioMediaPlayerContainerProps {
  practiceMode: "dictation" | "shadowing";
  currentLesson: any;
  currentSentence: {
    startTime?: number;
    endTime?: number;
    text?: string;
  } | null;
  currentSentenceIndex: number;
  totalSentencesCount: number;
  sentencePlaybackTime: number;
  setSentencePlaybackTime: React.Dispatch<React.SetStateAction<number>> | ((sec: number) => void);
  sentenceDuration: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  volume?: number;
  onVolumeChange?: (vol: number) => void;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSentenceEnded?: () => void;
  // Optional audio rewind restart (e.g. For TTS speech playback in Dictation)
  onRewindAudioSpeech?: () => void;
  // Shadowing specific props
  isRecording?: boolean;
  liveAudioEnergy?: number;
  mediaDisplayMode?: MediaDisplayMode;
  onMediaDisplayModeChange?: (mode: MediaDisplayMode) => void;
  onToast?: (toast: { type: "info" | "success" | "error"; title: string; message?: string }) => void;
  className?: string;
}

/**
 * StudioMediaPlayerContainer: Unified media player component coordinating
 * YouTube Video Cinema (`VideoCinemaFrame`) and Audio Acoustic Waveform (`StudioWaveformCard`).
 * Guarantees 100% synchronized controls, 5s seek, speed scaling, volume, and playback state
 * across all 4 target URLs:
 * - /study/dictation/audio
 * - /study/dictation/video
 * - /study/shadowing/audio
 * - /study/shadowing/video
 */
export const StudioMediaPlayerContainer: React.FC<StudioMediaPlayerContainerProps> = React.memo(
  function StudioMediaPlayerContainer({
    practiceMode,
    currentLesson,
    currentSentence,
    currentSentenceIndex,
    totalSentencesCount,
    sentencePlaybackTime,
    setSentencePlaybackTime,
    sentenceDuration,
    isPlaying,
    playbackSpeed,
    onSpeedChange,
    volume,
    onVolumeChange,
    onTogglePlay,
    onPrev,
    onNext,
    onSentenceEnded,
    onRewindAudioSpeech,
    isRecording = false,
    liveAudioEnergy,
    mediaDisplayMode = "video",
    onMediaDisplayModeChange,
    onToast,
    className = "",
  }) {
    const mediaInfo = resolveLessonMedia(currentLesson);
    const isVideoLesson = mediaInfo.isVideoLesson;
    const shouldRenderVideo = isVideoLesson && mediaDisplayMode !== "audio";

    // Rewind 5 seconds
    const handleRewind5s = useCallback(() => {
      if (onRewindAudioSpeech && !shouldRenderVideo) {
        onRewindAudioSpeech();
        return;
      }
      const newTime = Math.max(0, sentencePlaybackTime - 5);
      setSentencePlaybackTime(newTime);
      onToast?.({ type: "info", title: "Tua lùi 5s" });
    }, [onRewindAudioSpeech, shouldRenderVideo, sentencePlaybackTime, setSentencePlaybackTime, onToast]);

    // Forward 5 seconds
    const handleForward5s = useCallback(() => {
      const newTime = Math.min(sentenceDuration, sentencePlaybackTime + 5);
      setSentencePlaybackTime(newTime);
      onToast?.({ type: "info", title: "Tua nhanh 5s" });
    }, [sentenceDuration, sentencePlaybackTime, setSentencePlaybackTime, onToast]);

    // Seek to specific timestamp
    const handleSeek = useCallback(
      (time: number) => {
        const clamped = Math.min(sentenceDuration, Math.max(0, time));
        setSentencePlaybackTime(clamped);
      },
      [sentenceDuration, setSentencePlaybackTime]
    );

    const isPrevDisabled = currentSentenceIndex === 0;
    const isNextDisabled = currentSentenceIndex >= totalSentencesCount - 1;

    return (
      <div className={`w-full ${className}`}>
        {shouldRenderVideo ? (
          <VideoCinemaFrame
            sourceUrlOrId={mediaInfo.sourceUrlOrId}
            title={currentLesson?.title}
            thumbnailUrl={
              currentLesson?.imageUrl ||
              (currentLesson as any)?.videoMetadata?.thumbnailUrl
            }
            currentSentence={currentSentence}
            practiceMode={practiceMode}
            isPlaying={isPlaying}
            playbackSpeed={playbackSpeed}
            volume={volume}
            onVolumeChange={onVolumeChange}
            onSentenceEnded={onSentenceEnded}
            onPlaybackTimeUpdate={(sec) => {
              setSentencePlaybackTime(sec);
            }}
            segmentIndex={currentSentenceIndex}
            totalSegments={totalSentencesCount}
            playbackTime={sentencePlaybackTime}
            duration={sentenceDuration}
            isRecording={isRecording}
            liveAudioEnergy={liveAudioEnergy}
            onTogglePlay={onTogglePlay}
            onPrev={onPrev}
            onNext={onNext}
            onRewind5s={handleRewind5s}
            onForward5s={handleForward5s}
            onSeek={handleSeek}
            onSpeedChange={onSpeedChange}
            isPrevDisabled={isPrevDisabled}
            isNextDisabled={isNextDisabled}
            onFallbackToAudio={
              onMediaDisplayModeChange
                ? () => onMediaDisplayModeChange("audio")
                : undefined
            }
          />
        ) : (
          <StudioWaveformCard
            segmentIndex={currentSentenceIndex}
            totalSegments={totalSentencesCount}
            playbackTime={sentencePlaybackTime}
            duration={sentenceDuration}
            isPlaying={isPlaying}
            playbackSpeed={playbackSpeed}
            volume={volume}
            onVolumeChange={onVolumeChange}
            isRecording={isRecording}
            liveAudioEnergy={liveAudioEnergy}
            onTogglePlay={onTogglePlay}
            onPrev={onPrev}
            onNext={onNext}
            onRewind5s={handleRewind5s}
            onForward5s={handleForward5s}
            onSeek={handleSeek}
            onSpeedChange={onSpeedChange}
            isPrevDisabled={isPrevDisabled}
            isNextDisabled={isNextDisabled}
          />
        )}
      </div>
    );
  }
);
