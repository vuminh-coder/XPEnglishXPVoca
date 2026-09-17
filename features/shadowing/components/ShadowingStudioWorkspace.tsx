"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  RotateCcw,
  Volume2,
  Square,
  Clock,
  Eye,
  EyeOff,
  BookmarkPlus,
  Flag,
  ListOrdered,
  Info,
  Languages,
  Activity,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { StudioTopHeader } from "@/features/listening/components/StudioTopHeader";
import { StudioWaveformCard } from "@/features/listening/components/StudioWaveformCard";
import { InteractiveTranscriptSidebar } from "@/features/listening/components/InteractiveTranscriptSidebar";
import {
  TranscriptSentencesSkeleton,
  ShimmerBox,
} from "./LoadingSkeletons";
import { formatElapsedTime } from "./ShadowingCompletionScreen";

interface ShadowingStudioWorkspaceProps {
  currentLesson: any;
  rawIdParam: string | null;
  selectedLessonId: string | null;
  isInPlaceSwitchingLesson?: boolean;
  elapsedTime: number;
  currentSentenceIndex: number;
  totalSentencesCount: number;
  sentencePlaybackTime: number;
  setSentencePlaybackTime: React.Dispatch<React.SetStateAction<number>>;
  playingSentenceText: string | null;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  isRecording: boolean;
  recordingTime: number;
  userAudioUrl: string | null;
  isPlayingUserAudio: boolean;
  setIsPlayingUserAudio: (val: boolean) => void;
  userAudioPlayerRef: React.RefObject<HTMLAudioElement | null>;
  isAnalyzing: boolean;
  liveAudioEnergy?: number;
  sentenceScores?: { [idx: number]: number };
  aiAnalysisResult: any;
  liveRecognizedWords: { word: string; status: "perfect" | "needs_work" }[];
  activePlaybackWordIndex: number | null;
  wordTrackContainerRef: React.RefObject<HTMLDivElement | null>;
  wordTokenRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  mobileStudioTab: "practice" | "transcript";
  setMobileStudioTab: (tab: "practice" | "transcript") => void;
  isCurrentSentenceBookmarked: boolean;
  handleToggleBookmark: () => void;
  handleBackToListing: () => void;
  onOpenReportModal: () => void;
  fontSizeLevel: number;
  handleAdjustFontSize: (delta: number) => void;
  autoNextSentence: boolean;
  setAutoNextSentence: (val: boolean) => void;
  hideTranslation: boolean;
  setHideTranslation: React.Dispatch<React.SetStateAction<boolean>>;
  handleWordClick: (word: string) => void;
  handlePlaySampleAudio: () => void;
  handlePrevSentence: () => void;
  handleNextSentence: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  handleResetCurrentSentence: () => void;
  completedSentences: { [idx: number]: boolean };
  onSelectTranscriptSentence: (idx: number) => void;
  onReplayTranscriptSentence: (idx: number) => void;
  onResetProgress: () => void;
  recommendedLessons: any[];
  onSelectLesson: (id: string | number) => void;
  onShuffleRecommendations: () => void;
}

export function ShadowingStudioWorkspace({
  currentLesson,
  rawIdParam,
  selectedLessonId,
  isInPlaceSwitchingLesson = false,
  elapsedTime,
  currentSentenceIndex,
  totalSentencesCount,
  sentencePlaybackTime,
  setSentencePlaybackTime,
  playingSentenceText,
  playbackSpeed,
  setPlaybackSpeed,
  isRecording,
  recordingTime,
  userAudioUrl,
  isPlayingUserAudio,
  setIsPlayingUserAudio,
  userAudioPlayerRef,
  isAnalyzing,
  liveAudioEnergy = 0,
  sentenceScores,
  aiAnalysisResult,
  liveRecognizedWords,
  activePlaybackWordIndex,
  wordTrackContainerRef,
  wordTokenRefs,
  mobileStudioTab,
  setMobileStudioTab,
  isCurrentSentenceBookmarked,
  handleToggleBookmark,
  handleBackToListing,
  onOpenReportModal,
  fontSizeLevel,
  handleAdjustFontSize,
  autoNextSentence,
  setAutoNextSentence,
  hideTranslation,
  setHideTranslation,
  handleWordClick,
  handlePlaySampleAudio,
  handlePrevSentence,
  handleNextSentence,
  startRecording,
  stopRecording,
  handleResetCurrentSentence,
  completedSentences,
  onSelectTranscriptSentence,
  onReplayTranscriptSentence,
  onResetProgress,
  recommendedLessons,
  onSelectLesson,
  onShuffleRecommendations,
}: ShadowingStudioWorkspaceProps) {
  const currentSentence =
    currentLesson?.transcript?.[currentSentenceIndex] ||
    currentLesson?.transcript?.[0] ||
    null;

  return (
    <div
      id="active-shadowing-workspace"
      className="w-full h-full max-h-full flex flex-col overflow-hidden select-none font-sans"
    >
      {/* 1. Top Unified Studio Navigation Bar */}
      <StudioTopHeader
        title={currentLesson.title}
        level={currentLesson.level}
        currentMode="shadowing"
        lessonQueryId={rawIdParam || selectedLessonId || "1"}
        isBookmarked={isCurrentSentenceBookmarked}
        onToggleBookmark={handleToggleBookmark}
        onBack={handleBackToListing}
        rightExtraActions={
          <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-1 shadow-2xs shrink-0 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatElapsedTime(elapsedTime)}</span>
          </span>
        }
      />

      {/* 2. Mobile/Tablet View Switcher Tab with Apple-Grade Spring Sliding Pill */}
      <div className="flex lg:hidden items-center border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 pt-2.5 gap-2 shrink-0 select-none sticky top-0 z-20 backdrop-blur-md">
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 inline-flex items-center gap-1 relative w-full">
          <button
            type="button"
            onClick={() => setMobileStudioTab("practice")}
            className={`relative flex-1 py-1.5 text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer select-none transition-colors z-10 ${
              mobileStudioTab === "practice"
                ? "font-bold text-slate-900 dark:text-white"
                : "font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
            }`}
          >
            {mobileStudioTab === "practice" && (
              <motion.div
                layoutId="shadowingMobileStudioTabIndicator"
                className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <Mic className="w-3.5 h-3.5 shrink-0 relative z-10 text-[#0059bb] dark:text-sky-400" />
            <span className="relative z-10 truncate">
              Luyện nói ({currentSentenceIndex + 1}/{totalSentencesCount})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileStudioTab("transcript")}
            className={`relative flex-1 py-1.5 text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer select-none transition-colors z-10 ${
              mobileStudioTab === "transcript"
                ? "font-bold text-slate-900 dark:text-white"
                : "font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
            }`}
          >
            {mobileStudioTab === "transcript" && (
              <motion.div
                layoutId="shadowingMobileStudioTabIndicator"
                className="absolute inset-0 rounded-lg bg-white dark:bg-slate-900 shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <ListOrdered className="w-3.5 h-3.5 shrink-0 relative z-10 text-slate-500" />
            <span className="relative z-10 truncate">
              Danh sách phụ đề ({totalSentencesCount})
            </span>
          </button>
        </div>
      </div>

      {/* 3. 2-Column Responsive Workspace: Left Main Shadowing & Right Transcript Panel */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* CỘT TRÁI: SINGLE-SENTENCE FOCUS SHADOWING WORKSPACE */}
        <div
          className={`flex-1 min-w-0 p-2.5 sm:p-3 lg:p-3.5 space-y-2.5 overflow-y-auto hide-scrollbar pb-24 lg:pb-3.5 ${
            mobileStudioTab === "practice" ? "block" : "hidden lg:block"
          }`}
        >
          {currentSentence && (
            <div className="space-y-2.5 w-full">
              {/* 3.1 DEDICATED SENTENCE AUDIO STUDIO BLOCK WITH 95-BAR ACOUSTIC SOUNDWAVE */}
              <StudioWaveformCard
                segmentIndex={currentSentenceIndex}
                totalSegments={totalSentencesCount}
                playbackTime={sentencePlaybackTime}
                duration={Math.max(
                  3,
                  Math.ceil(currentSentence.text.trim().split(/\s+/).length / (2.2 * playbackSpeed))
                )}
                isPlaying={playingSentenceText === currentSentence.text}
                playbackSpeed={playbackSpeed}
                isRecording={isRecording}
                liveAudioEnergy={liveAudioEnergy}
                onTogglePlay={handlePlaySampleAudio}
                onPrev={handlePrevSentence}
                onNext={handleNextSentence}
                onRewind5s={() => {
                  setSentencePlaybackTime((prev) => Math.max(0, prev - 5));
                }}
                onForward5s={() => {
                  setSentencePlaybackTime((prev) => prev + 5);
                }}
                onSeek={(time) => setSentencePlaybackTime(time)}
                onSpeedChange={(spd) => setPlaybackSpeed(spd)}
                isPrevDisabled={currentSentenceIndex === 0}
              />

              {/* 3.2 META STATUS ROW */}
              <div className="flex items-center justify-between px-1 text-xs font-medium text-slate-600 dark:text-slate-400 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono font-bold border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
                    #{currentSentenceIndex + 1}
                  </span>
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    0/{currentSentence.text.trim().split(/\s+/).length} từ
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">
                    Khớp: {aiAnalysisResult?.overallScore ? `${aiAnalysisResult.overallScore}%` : "0%"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-sans">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                    <kbd className="font-mono font-bold text-slate-700 dark:text-slate-200">Enter</kbd> để sang câu tiếp theo
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                    <kbd className="font-mono font-bold text-slate-700 dark:text-slate-200">Space</kbd> để nghe lại
                  </span>
                </div>
              </div>

              {/* 3.3 SENTENCE UTILITY TOOLBAR */}
              <div className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs font-medium">
                {/* Left Group: Lưu câu & Báo cáo */}
                <div className="flex items-center gap-1.5 sm:gap-3">
                  {/* 1. Lưu câu */}
                  <button
                    type="button"
                    onClick={handleToggleBookmark}
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

                  {/* 2. Báo cáo */}
                  <button
                    type="button"
                    onClick={onOpenReportModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer select-none active:scale-95"
                    title="Báo cáo lỗi câu này"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Báo cáo</span>
                  </button>
                </div>

                {/* Right Group: Chỉnh cỡ chữ, Tự động tiếp, Ẩn dịch */}
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  {/* 3. Chỉnh cỡ chữ: -A / +A */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => handleAdjustFontSize(-1)}
                      disabled={fontSizeLevel <= 0}
                      className="px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-600 cursor-pointer rounded transition-colors"
                      title="Giảm cỡ chữ"
                    >
                      -A
                    </button>
                    <span className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
                    <button
                      type="button"
                      onClick={() => handleAdjustFontSize(1)}
                      disabled={fontSizeLevel >= 3}
                      className="px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-600 cursor-pointer rounded transition-colors"
                      title="Tăng cỡ chữ"
                    >
                      +A
                    </button>
                  </div>

                  {/* 4. Tự động chuyển câu */}
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

                  {/* 5. Ẩn bản dịch */}
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

              {/* 3.4 SHADOWING CORE SENTENCE CARD */}
              <div className="space-y-1.5 pt-0">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>Bấm vào từ để tra từ điển & phát âm</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setHideTranslation((prev) => !prev)}
                    className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer select-none group"
                    title="Ẩn hoặc hiện bản dịch nghĩa tiếng Việt"
                  >
                    {hideTranslation ? (
                      <>
                        <Eye className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                        <span className="font-semibold">Xem dịch</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                        <span className="font-semibold">Ẩn dịch</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Sentence Content Box */}
                <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1.5">
                  {/* Words Horizontal Track */}
                  <div
                    ref={wordTrackContainerRef}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    className="flex flex-nowrap overflow-x-auto py-1.5 sm:py-2 px-1 scroll-smooth hide-scrollbar [&::-webkit-scrollbar]:hidden gap-1.5 sm:gap-2 items-center"
                  >
                    {currentSentence.text.split(" ").map((word: string, wIdx: number) => {
                      const clean = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").toLowerCase();
                      const wordEval = aiAnalysisResult?.wordAccuracy?.find(
                        (item: any) =>
                          item.word.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").toLowerCase() === clean
                      );

                      const isCurrentlyBeingRead = activePlaybackWordIndex === wIdx;
                      const isCurrentlySpoken = isRecording && liveRecognizedWords.length > wIdx;

                      return (
                        <div
                          key={wIdx}
                          ref={(el) => {
                            wordTokenRefs.current[wIdx] = el;
                          }}
                          className="inline-flex items-center shrink-0"
                        >
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleWordClick(word)}
                            className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg font-sans transition-all cursor-pointer select-none font-bold tracking-tight shrink-0 ${
                              fontSizeLevel === 1
                                ? "text-base sm:text-[17px] min-h-[38px] sm:min-h-[40px]"
                                : fontSizeLevel === 2
                                ? "text-[17px] sm:text-lg min-h-[42px] sm:min-h-[44px]"
                                : fontSizeLevel === 3
                                ? "text-lg sm:text-xl min-h-[46px] sm:min-h-[48px]"
                                : "text-sm sm:text-base min-h-[34px] sm:min-h-[36px]"
                            } ${
                              wordEval?.status === "perfect"
                                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-500 shadow-xs"
                                : wordEval?.status === "good"
                                ? "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-2 border-amber-400 shadow-2xs"
                                : wordEval?.status === "needs_work"
                                ? "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-2 border-rose-400 shadow-2xs"
                                : isCurrentlyBeingRead
                                ? "bg-blue-100/90 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 font-extrabold border-2 border-[#0059bb] dark:border-sky-400 ring-3 ring-blue-500/25 dark:ring-sky-400/30 shadow-xs scale-105"
                                : isCurrentlySpoken
                                ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 border-2 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs scale-105"
                                : "bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400/80 dark:hover:border-sky-400/70 hover:text-[#0059bb] dark:hover:text-sky-300 hover:bg-blue-50/40 dark:hover:bg-slate-800 shadow-2xs"
                            }`}
                          >
                            {word}
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sentence IPA Pronunciation */}
                  {currentSentence.ipa && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs sm:text-sm font-medium">
                      <span className="font-sans font-bold text-sm text-[#0059bb] dark:text-sky-400 mr-2 shrink-0">
                        IPA:
                      </span>
                      <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 dark:text-slate-100 font-sans tracking-wide">
                        {currentSentence.ipa}
                      </span>
                    </div>
                  )}

                  {/* Vietnamese Translation Accordion */}
                  <AnimatePresence>
                    {!hideTranslation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2 border-t border-slate-100 dark:border-slate-800"
                      >
                        <div className="p-3 rounded-lg bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-[13px] font-medium text-slate-800 dark:text-slate-200 shadow-2xs leading-relaxed">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 font-sans">
                            <Languages className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                            <span>Bản dịch câu:</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                            {currentSentence.translation || currentSentence.vietnamese}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 3.5 ACTION SHORTCUT BUTTONS BAR */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 px-1 pt-0.5">
                <div className="flex items-center gap-2 sm:gap-2.5 flex-1 sm:flex-initial flex-wrap">
                  {/* Nút Thu Âm Mic */}
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer shadow-2xs active:scale-98 min-h-[38px] sm:min-h-[42px]"
                    >
                      <Mic className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Thu âm & Chấm điểm</span>
                      <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700">
                        Alt+S
                      </kbd>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-rose-600 hover:bg-rose-700 transition-all cursor-pointer shadow-md active:scale-98 min-h-[38px] sm:min-h-[42px] animate-pulse"
                    >
                      <Square className="w-4 h-4 fill-white text-white" />
                      <span>Dừng thu ({recordingTime}s)</span>
                    </button>
                  )}

                  {/* Nghe lại giọng bạn */}
                  {userAudioUrl && !isRecording && (
                    <button
                      type="button"
                      onClick={() => {
                        if (userAudioPlayerRef.current) {
                          userAudioPlayerRef.current.currentTime = 0;
                          userAudioPlayerRef.current.play();
                          setIsPlayingUserAudio(true);
                        }
                      }}
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200/80 dark:border-emerald-800/60 transition-all cursor-pointer shadow-2xs active:scale-98 min-h-[38px] sm:min-h-[42px]"
                    >
                      <Headphones className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Nghe lại giọng bạn</span>
                    </button>
                  )}

                  {/* Nghe câu mẫu */}
                  <button
                    type="button"
                    onClick={handlePlaySampleAudio}
                    className="inline-flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer shadow-2xs active:scale-98 min-h-[38px] sm:min-h-[42px]"
                  >
                    <Volume2 className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Nghe câu mẫu</span>
                    <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700">
                      Space
                    </kbd>
                  </button>
                </div>

                {/* Right utilities */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setHideTranslation((prev) => !prev)}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer min-h-[38px] sm:min-h-[42px]"
                  >
                    {hideTranslation ? (
                      <>
                        <Eye className="w-4 h-4 shrink-0" />
                        <span>Xem dịch</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4 shrink-0" />
                        <span>Ẩn dịch</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetCurrentSentence}
                    title="Làm lại câu này"
                    className="p-2 sm:p-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer min-h-[38px] sm:min-h-[42px] min-w-[38px] sm:min-w-[42px] flex items-center justify-center"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {userAudioUrl && (
                <audio
                  ref={userAudioPlayerRef}
                  src={userAudioUrl}
                  onEnded={() => setIsPlayingUserAudio(false)}
                  className="hidden"
                />
              )}

              {/* Live Speech Recognition Tokens */}
              {isRecording && liveRecognizedWords.length > 0 && (
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display uppercase tracking-wider">
                    <Activity className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Đang nhận diện giọng nói thời gian thực...
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {liveRecognizedWords.map((w, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                          w.status === "perfect"
                            ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200"
                            : "bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200"
                        }`}
                      >
                        {w.word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Analysis Breakdown Box */}
              {isAnalyzing && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    AI đang phân tích phát âm, ngữ điệu và độ trôi chảy...
                  </span>
                </div>
              )}

              {aiAnalysisResult && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3 font-sans"
                >
                  <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-black text-sm shadow-2xs">
                        {aiAnalysisResult.overallScore}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          Kết quả chấm điểm AI
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {aiAnalysisResult.feedback}
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] border border-emerald-200/60 dark:border-emerald-800/40">
                      {aiAnalysisResult.overallScore >= 80 ? "Đạt chuẩn ✓" : "Cần cải thiện"}
                    </span>
                  </div>

                  {/* 6 AI Criteria Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Phát âm</span>
                      <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {aiAnalysisResult.pronunciationScore}%
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Trôi chảy</span>
                      <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {aiAnalysisResult.fluencyScore}%
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Ngữ điệu</span>
                      <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {aiAnalysisResult.intonationScore}%
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Đầy đủ</span>
                      <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {aiAnalysisResult.completenessScore}%
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Tốc độ</span>
                      <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {aiAnalysisResult.speedWpm} WPM
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Trọng âm</span>
                      <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {aiAnalysisResult.stressScore}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* CỘT PHẢI: INTERACTIVE TRANSCRIPT SIDEBAR */}
        <div
          className={`w-full lg:w-[380px] xl:w-[400px] 2xl:w-[420px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200/90 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-900/90 h-full overflow-hidden ${
            mobileStudioTab === "transcript" ? "block" : "hidden lg:block"
          }`}
        >
          {isInPlaceSwitchingLesson ? (
            <div className="h-full flex flex-col p-2">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <ShimmerBox className="h-5 w-32 rounded-lg" />
                <ShimmerBox className="h-5 w-16 rounded-md" />
              </div>
              <div className="flex-1 overflow-hidden">
                <TranscriptSentencesSkeleton count={6} />
              </div>
            </div>
          ) : (
            <InteractiveTranscriptSidebar
              transcript={currentLesson.transcript || []}
              currentIndex={currentSentenceIndex}
              completedSentences={completedSentences}
              sentenceScores={sentenceScores}
              onSelectSentence={onSelectTranscriptSentence}
              onReplaySentence={onReplayTranscriptSentence}
              onResetProgress={onResetProgress}
              recommendedLessons={recommendedLessons}
              onSelectLesson={onSelectLesson}
              onShuffleRecommendations={onShuffleRecommendations}
              keyVocabularies={currentLesson.vocabulary || currentLesson.vocabList || []}
              onWordClick={handleWordClick}
              isPlaying={playingSentenceText !== null}
              className="h-full"
            />
          )}
        </div>
      </div>

      {/* 4. Mobile Sticky Audio Dock (Rule 13 Thumb-friendly Ergonomics) */}
      {mobileStudioTab === "practice" && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] lg:hidden flex items-center justify-between gap-3 max-w-lg mx-auto">
          {/* Previous Sentence */}
          <button
            type="button"
            onClick={handlePrevSentence}
            disabled={currentSentenceIndex === 0}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 border border-slate-200/80 dark:border-slate-700 shadow-2xs active:scale-95 transition-all"
            aria-label="Câu trước"
            title="Câu trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Sample Audio */}
          <button
            type="button"
            onClick={handlePlaySampleAudio}
            className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-950/50 text-[#0059bb] dark:text-sky-400 border border-blue-200/80 dark:border-blue-900/60 shadow-2xs active:scale-95 transition-all"
            title="Nghe câu mẫu"
            aria-label="Nghe câu mẫu"
          >
            <Volume2 className="w-5 h-5" />
          </button>

          {/* Primary Thumb Record CTA (Rule 13 & 18 & 20) */}
          <div className="flex-1 flex justify-center">
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="w-13 h-13 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30 flex items-center justify-center transition-all active:scale-90 cursor-pointer"
                aria-label="Bắt đầu thu âm"
                title="Bắt đầu thu âm"
              >
                <Mic className="w-6 h-6" />
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="w-13 h-13 rounded-full bg-rose-600 text-white shadow-lg shadow-rose-600/40 flex items-center justify-center transition-all active:scale-90 animate-pulse cursor-pointer"
                aria-label={`Dừng thu (${recordingTime}s)`}
                title={`Dừng thu (${recordingTime}s)`}
              >
                <Square className="w-5 h-5 fill-white" />
              </button>
            )}
          </div>

          {/* User Audio Replay or Reset */}
          {userAudioUrl ? (
            <button
              type="button"
              onClick={() => {
                if (userAudioPlayerRef.current) {
                  userAudioPlayerRef.current.currentTime = 0;
                  userAudioPlayerRef.current.play();
                  setIsPlayingUserAudio(true);
                }
              }}
              className="w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs active:scale-95 transition-all"
              title="Nghe lại giọng bạn"
              aria-label="Nghe lại giọng bạn"
            >
              <Headphones className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleResetCurrentSentence}
              className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700 shadow-2xs active:scale-95 transition-all"
              title="Làm lại câu này"
              aria-label="Làm lại câu này"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          )}

          {/* Next Sentence */}
          <button
            type="button"
            onClick={handleNextSentence}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-2xs active:scale-95 transition-all"
            aria-label="Câu tiếp theo"
            title="Câu tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
