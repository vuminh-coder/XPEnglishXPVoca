"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  ListOrdered,
  Clock,
  BookmarkPlus,
  Flag,
} from "lucide-react";
import { StudioTopHeader } from "./StudioTopHeader";
import { StudioWaveformCard } from "./StudioWaveformCard";
import { DictationWorkspace } from "./DictationWorkspace";
import { InteractiveTranscriptSidebar } from "./InteractiveTranscriptSidebar";
import { StudioTimerBadge } from "./StudioTimerBadge";
import type {
  ListeningLesson,
  TranscriptSentence,
} from "@/features/listening/utils/listeningParser";

export interface ListeningStudioWorkspaceProps {
  currentLesson: ListeningLesson;
  lessonsList: ListeningLesson[];
  selectedLessonId: string;
  rawIdParam?: string | null;
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
  onSentenceCompleted: () => void;
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

  const sentenceDuration = Math.max(
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
        isBookmarked={isCurrentSentenceBookmarked}
        accent={currentAccent}
        onAccentChange={onAccentChange}
        onToggleBookmark={onToggleBookmark}
        onBack={onBackToListing}
        rightExtraActions={
          <StudioTimerBadge
            isActive={true}
            initialSeconds={elapsedTime}
            onSecondsUpdate={onElapsedTimeTick}
          />
        }
      />

      {/* Mobile/Tablet View Switcher Tab (Displayed ONLY on < lg, completely hidden on Desktop) */}
      <div className="flex lg:hidden items-center border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 pt-2.5 gap-6 shrink-0 select-none sticky top-0 z-20 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setMobileStudioTab("dictation")}
          className={`pb-2.5 text-sm sm:text-[15px] flex items-center gap-2 cursor-pointer select-none transition-all relative ${
            mobileStudioTab === "dictation"
              ? "font-bold text-slate-900 dark:text-white"
              : "font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400"
          }`}
        >
          <Headphones className="w-4 h-4 shrink-0" />
          <span>Luyện chép ({currentSentenceIndex + 1}/{totalSentencesCount})</span>
          {mobileStudioTab === "dictation" && (
            <motion.div
              layoutId="listeningMobileStudioTabIndicator"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0059bb] dark:bg-sky-400 rounded-t-full"
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => setMobileStudioTab("transcript")}
          className={`pb-2.5 text-sm sm:text-[15px] flex items-center gap-2 cursor-pointer select-none transition-all relative ${
            mobileStudioTab === "transcript"
              ? "font-bold text-slate-900 dark:text-white"
              : "font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400"
          }`}
        >
          <ListOrdered className="w-4 h-4 shrink-0" />
          <span>Danh sách phụ đề ({totalSentencesCount})</span>
          {mobileStudioTab === "transcript" && (
            <motion.div
              layoutId="listeningMobileStudioTabIndicator"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0059bb] dark:bg-sky-400 rounded-t-full"
            />
          )}
        </button>
      </div>

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
              {/* 1. DEDICATED SENTENCE AUDIO STUDIO BLOCK WITH ACTIVE SPEECH ACOUSTIC WAVEFORM */}
              <StudioWaveformCard
                segmentIndex={currentSentenceIndex}
                totalSegments={totalSentencesCount}
                playbackTime={sentencePlaybackTime}
                duration={sentenceDuration}
                isPlaying={playingSentenceText === currentSentence.text}
                playbackSpeed={playbackSpeed}
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
                onRewind5s={() => {
                  setSentencePlaybackTime((prev) => Math.max(0, prev - 5));
                  onToast({ type: "info", title: "Tua lùi 5s" });
                }}
                onForward5s={() => {
                  setSentencePlaybackTime((prev) => Math.min(sentenceDuration, prev + 5));
                  onToast({ type: "info", title: "Tua nhanh 5s" });
                }}
                onSeek={(time) => {
                  setSentencePlaybackTime(Math.min(sentenceDuration, Math.max(0, time)));
                }}
                onSpeedChange={(spd) => {
                  setPlaybackSpeed(spd);
                  if (playingSentenceText === currentSentence.text) {
                    onSpeakSentence(currentSentence.text, currentSentenceIndex);
                  }
                }}
                isPrevDisabled={currentSentenceIndex === 0}
              />

              {/* 1.2 META STATUS ROW */}
              <div className="flex items-center justify-between px-1 text-xs font-semibold text-slate-600 dark:text-slate-400 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono font-bold border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
                    #{currentSentenceIndex + 1}
                  </span>
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    0/{currentSentence.text.split(" ").length} từ
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">
                    Khớp: 0%
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-sans">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200/80 dark:border-slate-700">
                    <kbd className="font-mono font-bold text-slate-700 dark:text-slate-300">Enter</kbd> để sang câu tiếp theo
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200/80 dark:border-slate-700">
                    <kbd className="font-mono font-bold text-slate-700 dark:text-slate-300">Ctrl</kbd> để nghe lại
                  </span>
                </div>
              </div>

              {/* 1.5 SENTENCE UTILITY TOOLBAR */}
              <div className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs font-medium">
                {/* Left Group: Lưu câu & Báo cáo */}
                <div className="flex items-center gap-1.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={onToggleBookmark}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                      isCurrentSentenceBookmarked
                        ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    title={
                      isCurrentSentenceBookmarked
                        ? "Đã lưu câu này vào sổ tay (Nhấp để hủy)"
                        : "Lưu câu này vào sổ tay luyện tập"
                    }
                  >
                    <BookmarkPlus
                      className={`w-3.5 h-3.5 ${
                        isCurrentSentenceBookmarked ? "fill-current" : ""
                      }`}
                    />
                    <span>Lưu câu</span>
                  </button>

                  <button
                    type="button"
                    onClick={onReportSentence}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer select-none active:scale-95"
                    title="Báo cáo lỗi câu này"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Báo cáo</span>
                  </button>
                </div>

                {/* Right Group: Chỉnh cỡ chữ, Tự động tiếp, Ẩn dịch */}
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  {/* Chỉnh cỡ chữ: -A / +A */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => onAdjustFontSize(-1)}
                      disabled={fontSizeLevel <= 0}
                      className="px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-600 cursor-pointer rounded transition-colors"
                      title="Giảm cỡ chữ"
                    >
                      -A
                    </button>
                    <span className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
                    <button
                      type="button"
                      onClick={() => onAdjustFontSize(1)}
                      disabled={fontSizeLevel >= 3}
                      className="px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-600 cursor-pointer rounded transition-colors"
                      title="Tăng cỡ chữ"
                    >
                      +A
                    </button>
                  </div>

                  {/* Tự động chuyển câu */}
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={autoNextSentence}
                      onChange={(e) => setAutoNextSentence(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-8 h-4 rounded-full transition-colors relative ${
                        autoNextSentence
                          ? "bg-slate-900 dark:bg-white"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full transition-transform absolute top-0.5 left-0.5 ${
                          autoNextSentence
                            ? "translate-x-4 bg-white dark:bg-slate-900 shadow-2xs"
                            : "bg-white dark:bg-slate-300"
                        }`}
                      />
                    </div>
                    <span className="hidden sm:inline">Tự động tiếp</span>
                  </label>

                  {/* Ẩn bản dịch */}
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={hideTranslation}
                      onChange={(e) => setHideTranslation(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-8 h-4 rounded-full transition-colors relative ${
                        hideTranslation
                          ? "bg-slate-900 dark:bg-white"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full transition-transform absolute top-0.5 left-0.5 ${
                          hideTranslation
                            ? "translate-x-4 bg-white dark:bg-slate-900 shadow-2xs"
                            : "bg-white dark:bg-slate-300"
                        }`}
                      />
                    </div>
                    <span className="hidden sm:inline">Ẩn dịch (i)</span>
                  </label>
                </div>
              </div>

              {/* 2. MAIN DICTATION WORKSPACE (INPUT & WORD TOKENS) */}
              <DictationWorkspace
                key={`dict-${currentLesson.id}-${currentSentenceIndex}`}
                sentenceText={currentSentence.text}
                sentenceId={currentSentenceIndex}
                lessonId={currentLesson.id}
                sentenceIndex={currentSentenceIndex}
                translation={currentSentence.translation || currentSentence.vietnamese}
                ipa={currentSentence.ipa}
                playbackSpeed={playbackSpeed}
                fontSizeLevel={fontSizeLevel}
                hideTranslation={hideTranslation}
                onWordClick={onWordClick}
                onWordMatched={onWordMatched}
                onSentenceCompleted={onSentenceCompleted}
              />
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
            isLoadingSentences={isLoadingLessonDetail}
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
              const targetS = currentLesson.transcript?.[idx];
              if (targetS) {
                setPlayingSentenceText(targetS.text);
                onSpeakSentence(targetS.text, idx);
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
              .filter((l) => l.id !== selectedLessonId)
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
