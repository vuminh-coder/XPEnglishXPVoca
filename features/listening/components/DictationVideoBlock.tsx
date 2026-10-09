"use client";

import React from "react";
import { StudioMediaPlayerContainer } from "./StudioMediaPlayerContainer";
import { StudioSentenceMetaBar } from "./StudioSentenceMetaBar";
import { StudioSentenceToolbar } from "./StudioSentenceToolbar";
import type { MediaDisplayMode } from "./MediaDisplayModeToggle";

export interface DictationVideoBlockProps {
  currentLesson: any;
  currentSentence: {
    startTime?: number;
    endTime?: number;
    text?: string;
    translation?: string;
    translationVi?: string;
    vietnamese?: string;
    ipa?: string;
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
  onRewindAudioSpeech?: () => void;
  onToast?: (toast: { type: "info" | "success" | "warning" | "error"; title: string; message?: string }) => void;
  // Meta status bar props
  showMetaBar?: boolean;
  scoreText?: string | null;
  repeatKey?: string;
  metaRightExtra?: React.ReactNode;
  // Sentence toolbar props
  showToolbar?: boolean;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onReportSentence?: () => void;
  fontSizeLevel?: number;
  onAdjustFontSize?: (delta: number) => void;
  autoNextSentence?: boolean;
  onToggleAutoNext?: (enabled: boolean) => void;
  hideTranslation?: boolean;
  onToggleHideTranslation?: (hidden: boolean) => void;
  canMergeNext?: boolean;
  isMergedWithNext?: boolean;
  onToggleMergeNext?: () => void;
  // Layout customization
  mediaDisplayMode?: MediaDisplayMode;
  onMediaDisplayModeChange?: (mode: MediaDisplayMode) => void;
  className?: string;
}

/**
 * DictationVideoBlock: 100% High-Fidelity Video Block extracted directly from
 * Dictation Studio (`ListeningStudioWorkspace`). Packages the Cinema YouTube Video
 * Player (`StudioMediaPlayerContainer`), the Sentence Metadata Bar (`StudioSentenceMetaBar`),
 * and the Utility Toolbar (`StudioSentenceToolbar`) into a unified, reusable studio unit.
 */
export const DictationVideoBlock: React.FC<DictationVideoBlockProps> = React.memo(
  function DictationVideoBlock({
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
    volume = 1,
    onVolumeChange,
    onTogglePlay,
    onPrev,
    onNext,
    onSentenceEnded,
    onRewindAudioSpeech,
    onToast,
    showMetaBar = true,
    scoreText,
    repeatKey = "Ctrl",
    metaRightExtra,
    showToolbar = true,
    isBookmarked = false,
    onToggleBookmark,
    onReportSentence,
    fontSizeLevel = 1,
    onAdjustFontSize,
    autoNextSentence = true,
    onToggleAutoNext,
    hideTranslation = false,
    onToggleHideTranslation,
    canMergeNext = false,
    isMergedWithNext = false,
    onToggleMergeNext,
    mediaDisplayMode = "video",
    onMediaDisplayModeChange,
    className = "",
  }) {
    const wordCount = currentSentence?.text
      ? currentSentence.text.trim().split(/\s+/).filter(Boolean).length
      : 0;

    return (
      <div className={`w-full space-y-2.5 sm:space-y-3 select-none ${className}`}>
        {/* 1. INTERACTIVE MEDIA PLAYER CONTAINER (VIDEO CINEMA FRAME) */}
        <StudioMediaPlayerContainer
          practiceMode="dictation"
          currentLesson={currentLesson}
          currentSentence={currentSentence}
          currentSentenceIndex={currentSentenceIndex}
          totalSentencesCount={totalSentencesCount}
          sentencePlaybackTime={sentencePlaybackTime}
          setSentencePlaybackTime={setSentencePlaybackTime}
          sentenceDuration={sentenceDuration}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          onSpeedChange={onSpeedChange}
          volume={volume}
          onVolumeChange={onVolumeChange}
          onTogglePlay={onTogglePlay}
          onPrev={onPrev}
          onNext={onNext}
          onSentenceEnded={onSentenceEnded}
          onRewindAudioSpeech={onRewindAudioSpeech}
          mediaDisplayMode={mediaDisplayMode}
          onMediaDisplayModeChange={onMediaDisplayModeChange}
          onToast={onToast}
          className="w-full"
        />

        {/* 2. META STATUS ROW (Matching Dictation 100%) */}
        {showMetaBar && currentSentence && (
          <StudioSentenceMetaBar
            currentSentenceIndex={currentSentenceIndex}
            totalSentencesCount={totalSentencesCount}
            wordCount={wordCount}
            scoreText={scoreText}
            repeatKey={repeatKey}
            rightExtra={metaRightExtra}
          />
        )}

        {/* 3. SENTENCE UTILITY TOOLBAR (Matching Dictation 100%) */}
        {showToolbar && currentSentence && (
          <StudioSentenceToolbar
            isBookmarked={isBookmarked}
            onToggleBookmark={onToggleBookmark || (() => {})}
            onReport={onReportSentence || (() => {})}
            fontSizeLevel={fontSizeLevel}
            onAdjustFontSize={onAdjustFontSize || (() => {})}
            autoNextSentence={autoNextSentence}
            onToggleAutoNext={onToggleAutoNext || (() => {})}
            hideTranslation={hideTranslation}
            onToggleHideTranslation={onToggleHideTranslation || (() => {})}
            canMergeNext={canMergeNext}
            isMergedWithNext={isMergedWithNext}
            onToggleMergeNext={onToggleMergeNext}
          />
        )}
      </div>
    );
  }
);

DictationVideoBlock.displayName = "DictationVideoBlock";
