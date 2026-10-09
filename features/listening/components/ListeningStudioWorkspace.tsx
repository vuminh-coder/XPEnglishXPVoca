"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  ListOrdered,
  Clock,
  BookmarkPlus,
  Flag,
} from "lucide-react";
import { StudioTopHeader } from "./StudioTopHeader";
import { DictationWorkspace } from "./DictationWorkspace";
import { InteractiveTranscriptSidebar } from "./InteractiveTranscriptSidebar";
import { StudioTimerBadge } from "./StudioTimerBadge";
import { StudioMobileTabBar } from "./StudioMobileTabBar";
import { StudioMediaPlayerContainer } from "./StudioMediaPlayerContainer";
import { StudioSentenceMetaBar } from "./StudioSentenceMetaBar";
import { StudioSentenceToolbar } from "./StudioSentenceToolbar";
import { DictationVideoBlock } from "./DictationVideoBlock";
import { DictationWorkspaceLoadingSkeleton } from "./LoadingSkeletons";
import { resolveLessonMedia } from "../utils/lessonMedia";
import { resolveCanonicalLessonId } from "../utils/lessonIdHelper";
import type {
  ListeningLesson,
  TranscriptSentence,
} from "@/features/listening/utils/listeningParser";

const EMPTY_PROPER_NOUNS: string[] = [];

export interface ListeningStudioWorkspaceProps {
  currentLesson: ListeningLesson;
  lessonsList: ListeningLesson[];
  selectedLessonId: string;
  rawIdParam?: string | null;
  isInPlaceSwitchingLesson?: boolean;
  currentSentenceIndex: number;
  setCurrentSentenceIndex: React.Dispatch<React.SetStateAction<number>>;
  totalSentencesCount: number;
  currentSentence: TranscriptSentence;
  playingSentenceText: string | null;
  setPlayingSentenceText: React.Dispatch<React.SetStateAction<string | null>>;
  sentencePlaybackTime: number;
  setSentencePlaybackTime: React.Dispatch<React.SetStateAction<number>>;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  currentVolume: number;
  setCurrentVolume: (volume: number) => void;
  currentAccent: string;
  onAccentChange: (accent: string) => void;
  isCurrentSentenceBookmarked: boolean;
  onToggleBookmark: () => void;
  onReportSentence: () => void;
  fontSizeLevel: number;
  onAdjustFontSize: (delta: number) => void;
  autoNextSentence: boolean;
  setAutoNextSentence: (v: boolean) => void;
  hideTranslation: boolean;
  setHideTranslation: (v: boolean) => void;
  completedSentences: Record<number, boolean>;
  completedLessonIds: string[];
  isLoadingLessonDetail: boolean;
  isShufflingRecommendations: boolean;
  onShuffleRecommendations: () => void;
  elapsedTime?: number;
  formatElapsedTime?: (sec: number) => string;
  onElapsedTimeTick?: (sec: number) => void;
  onBackToListing: () => void;
  onSelectLesson: (id: string) => void;
  onSentenceCompleted: (stats?: { matchedCount: number; totalCount: number }) => void;
  onWordMatched: (word: string) => void;
  onWordClick: (word: string) => void;
  onTogglePlayCurrentSentence: () => void;
  onSpeakSentence: (text: string, index: number) => void;
  onStopTTS: () => void;
  onNextSentenceInStudio: () => void;
  onResetProgress: () => void;
  onToast: (toast: { type: "info" | "success" | "warning" | "error"; title: string; message?: string }) => void;
}

export const ListeningStudioWorkspace: React.FC<ListeningStudioWorkspaceProps> = React.memo(({
  currentLesson,
  lessonsList,
  selectedLessonId,
  rawIdParam,
  isInPlaceSwitchingLesson = false,
  currentSentenceIndex,
  setCurrentSentenceIndex,
  totalSentencesCount,
  currentSentence,
  playingSentenceText,
  setPlayingSentenceText,
  sentencePlaybackTime,
  setSentencePlaybackTime,
  playbackSpeed,
  setPlaybackSpeed,
  currentVolume,
  setCurrentVolume,
  currentAccent,
  onAccentChange,
  isCurrentSentenceBookmarked,
  onToggleBookmark,
  onReportSentence,
  fontSizeLevel,
  onAdjustFontSize,
  autoNextSentence,
  setAutoNextSentence,
  hideTranslation,
  setHideTranslation,
  completedSentences,
  completedLessonIds,
  isLoadingLessonDetail,
  isShufflingRecommendations,
  onShuffleRecommendations,
  elapsedTime = 0,
  formatElapsedTime,
  onElapsedTimeTick,
  onBackToListing,
  onSelectLesson,
  onSentenceCompleted,
  onWordMatched,
  onWordClick,
  onTogglePlayCurrentSentence,
  onSpeakSentence,
  onStopTTS,
  onNextSentenceInStudio,
  onResetProgress,
  onToast,
}) => {
  // Mobile Studio Switcher Tab State: 'dictation' or 'transcript'
  const [mobileStudioTab, setMobileStudioTab] = useState<"dictation" | "transcript">("dictation");
  // Auto-detect media mode based on lesson type
  const mediaInfo = resolveLessonMedia(currentLesson);
  const isVideoLesson = mediaInfo.isVideoLesson;

  const sentenceDuration =
    currentSentence?.startTime !== undefined &&
    currentSentence?.endTime !== undefined &&
    currentSentence.endTime > currentSentence.startTime
      ? Number((currentSentence.endTime - currentSentence.startTime).toFixed(1))
      : Math.max(
          3,
          Math.ceil((currentSentence?.text || "").trim().split(/\s+/).filter(Boolean).length / (2.2 * playbackSpeed))
        );

  return (
    <div
      id="active-listening-workspace"
      className="w-full h-full max-h-full flex flex-col overflow-hidden select-none"
    >
      {/* Top Unified Studio Navigation Bar */}
      <StudioTopHeader
        title={currentLesson?.title || "Listening Practice"}
        level={currentLesson?.level || "All Levels"}
        currentMode="listening"
        lessonQueryId={rawIdParam || selectedLessonId || "36"}
        accent={currentAccent}
        onAccentChange={onAccentChange}
        showAccentSwitcher={!isVideoLesson}
        onBack={onBackToListing}
        rightExtraActions={
          <div className="flex items-center gap-1.5 sm:gap-2">
            <StudioTimerBadge
              isActive={true}
              initialSeconds={elapsedTime}
              onSecondsUpdate={onElapsedTimeTick}
            />
          </div>
        }
      />

      {/* Mobile/Tablet View Switcher Tab (Displayed ONLY on < lg, completely hidden on Desktop) */}
      <StudioMobileTabBar
        branch="dictation"
        activeTab={mobileStudioTab === "dictation" ? "practice" : "transcript"}
        onTabChange={(tab) =>
          setMobileStudioTab(tab === "practice" ? "dictation" : "transcript")
        }
        currentSentenceIndex={currentSentenceIndex}
        totalSentencesCount={totalSentencesCount}
      />

      {/* 2-Column Responsive Workspace: Left Main Dictation & Right Transcript Panel */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* CỘT TRÁI: SINGLE-SENTENCE FOCUS WORKSPACE */}
        <div
          className={`flex-1 min-w-0 p-3 sm:p-3.5 space-y-2.5 sm:space-y-3 overflow-y-auto hide-scrollbar ${
            mobileStudioTab === "dictation" ? "block" : "hidden lg:block"
          }`}
        >
          {currentSentence && (
            <div className="space-y-2.5 sm:space-y-3">
              {/* 1. INTERACTIVE MEDIA PLAYER CONTAINER (VIDEO CINEMA OR ACOUSTIC WAVEFORM) */}
              <StudioMediaPlayerContainer
                practiceMode="dictation"
                currentLesson={currentLesson}
                currentSentence={currentSentence}
                currentSentenceIndex={currentSentenceIndex}
                totalSentencesCount={totalSentencesCount}
                sentencePlaybackTime={sentencePlaybackTime}
                setSentencePlaybackTime={setSentencePlaybackTime}
                sentenceDuration={sentenceDuration}
                isPlaying={playingSentenceText === currentSentence?.text}
                playbackSpeed={playbackSpeed}
                onSpeedChange={(spd) => {
                  setPlaybackSpeed(spd);
                  if (playingSentenceText === currentSentence?.text) {
                    onSpeakSentence(currentSentence.text, currentSentenceIndex);
                  }
                }}
                volume={currentVolume}
                onVolumeChange={setCurrentVolume}
                onTogglePlay={onTogglePlayCurrentSentence}
                onPrev={() => {
                  if (currentSentenceIndex > 0) {
                    onStopTTS();
                    setPlayingSentenceText(null);
                    setCurrentSentenceIndex((prev) => prev - 1);
                    setSentencePlaybackTime(0);
                  }
                }}
                onNext={onNextSentenceInStudio}
                onSentenceEnded={() => {
                  setPlayingSentenceText(null);
                  setSentencePlaybackTime(0);
                }}
                onRewindAudioSpeech={() => {
                  onStopTTS();
                  setPlayingSentenceText(null);
                  setSentencePlaybackTime(0);
                  if (currentSentence?.text) {
                    setTimeout(() => {
                      setPlayingSentenceText(currentSentence.text);
                      onSpeakSentence(currentSentence.text, currentSentenceIndex);
                    }, 30);
                    onToast({ type: "info", title: "Phát lại câu từ đầu" });
                  }
                }}
                onToast={onToast}
              />

              {/* 1.2 META STATUS ROW */}
              <StudioSentenceMetaBar
                currentSentenceIndex={currentSentenceIndex}
                totalSentencesCount={totalSentencesCount}
                wordCount={
                  currentSentence.text.trim().split(/\s+/).filter(Boolean).length
                }
                repeatKey="Ctrl"
              />

              {/* 1.3 SENTENCE UTILITY TOOLBAR */}
              <StudioSentenceToolbar
                isBookmarked={isCurrentSentenceBookmarked}
                onToggleBookmark={onToggleBookmark}
                onReport={onReportSentence}
                fontSizeLevel={fontSizeLevel}
                onAdjustFontSize={onAdjustFontSize}
                autoNextSentence={autoNextSentence}
                onToggleAutoNext={setAutoNextSentence}
                hideTranslation={hideTranslation}
                onToggleHideTranslation={setHideTranslation}
              />

              {/* 2. MAIN DICTATION WORKSPACE (INPUT & WORD TOKENS) */}
              {isInPlaceSwitchingLesson ? (
                <DictationWorkspaceLoadingSkeleton />
              ) : (
                <DictationWorkspace
                  key={`dict-${resolveCanonicalLessonId(currentLesson.id) || currentLesson.id}-${currentSentenceIndex}`}
                  sentenceText={currentSentence.text}
                  sentenceId={currentSentenceIndex}
                  lessonId={resolveCanonicalLessonId(currentLesson.id) || currentLesson.id}
                  sentenceIndex={currentSentenceIndex}
                  translation={currentSentence.translation || (currentSentence as any).translationVi || (currentSentence as any).vietnamese}
                  ipa={currentSentence.ipa || (currentSentence as any).ipaUs || (currentSentence as any).ipaUk}
                  playbackSpeed={playbackSpeed}
                  fontSizeLevel={fontSizeLevel}
                  hideTranslation={hideTranslation}
                  onToggleTranslation={() => setHideTranslation(!hideTranslation)}
                  onWordClick={onWordClick}
                  onWordMatched={onWordMatched}
                  onSentenceCompleted={onSentenceCompleted}
                  onPlayAudio={onTogglePlayCurrentSentence}
                  customProperNouns={(currentSentence as any)?.properNouns || EMPTY_PROPER_NOUNS}
                />
              )}
            </div>
          )}
        </div>

        {/* CỘT PHẢI: INTERACTIVE TRANSCRIPT & PROGRESS PANEL */}
        <div
          className={`w-full lg:w-[380px] xl:w-[400px] 2xl:w-[420px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200/90 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-900/90 flex flex-col min-h-0 ${
            mobileStudioTab === "transcript" ? "flex flex-1" : "hidden lg:flex"
          }`}
        >
          <InteractiveTranscriptSidebar
            transcript={currentLesson.transcript || []}
            currentIndex={currentSentenceIndex}
            completedSentences={completedSentences}
            isPlaying={!!playingSentenceText}
            isLoadingSentences={isLoadingLessonDetail || isInPlaceSwitchingLesson}
            isLoadingRecommendations={isShufflingRecommendations}
            onSelectSentence={(idx) => {
              onStopTTS();
              setPlayingSentenceText(null);
              setCurrentSentenceIndex(idx);
              setSentencePlaybackTime(0);
              setMobileStudioTab("dictation");
            }}
            onReplaySentence={(idx) => {
              onStopTTS();
              setCurrentSentenceIndex(idx);
              setSentencePlaybackTime(0);
              const targetS = currentLesson.transcript?.[idx];
              if (targetS?.text) {
                setPlayingSentenceText(null);
                setTimeout(() => {
                  setPlayingSentenceText(targetS.text);
                  if (!isVideoLesson) {
                    onSpeakSentence(targetS.text, idx);
                  }
                }, 30);
              }
            }}
            onNextSentence={() => {
              if (currentSentenceIndex < totalSentencesCount - 1) {
                onStopTTS();
                setPlayingSentenceText(null);
                setCurrentSentenceIndex((prev) => prev + 1);
                setSentencePlaybackTime(0);
              }
            }}
            onResetProgress={onResetProgress}
            recommendedLessons={lessonsList
              .filter((l: any) => {
                if (l.id === selectedLessonId) return false;
                const isVideo =
                  Boolean(l.isVideo) ||
                  String(l.id).startsWith("vid_") ||
                  String(l.id).startsWith("yt_") ||
                  String(l.id).startsWith("video_") ||
                  Boolean(l.audioUrl?.includes("youtube")) ||
                  Boolean(l.audioUrl?.includes("youtu.be"));
                return !isVideo;
              })
              .slice(0, 6)}
            completedLessonIds={completedLessonIds}
            onSelectLesson={(lessonId) => onSelectLesson(String(lessonId))}
            onShuffleRecommendations={onShuffleRecommendations}
          />
        </div>
      </div>
    </div>
  );
});

ListeningStudioWorkspace.displayName = "ListeningStudioWorkspace";
