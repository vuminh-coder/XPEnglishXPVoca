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
  Activity,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Combine,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { StudioTopHeader } from "@/features/listening/components/StudioTopHeader";
import { InteractiveTranscriptSidebar } from "@/features/listening/components/InteractiveTranscriptSidebar";
import { StudioTimerBadge } from "@/features/listening/components/StudioTimerBadge";
import { StudioMobileTabBar } from "@/features/listening/components/StudioMobileTabBar";
import { StudioMediaPlayerContainer } from "@/features/listening/components/StudioMediaPlayerContainer";
import { StudioSentenceMetaBar } from "@/features/listening/components/StudioSentenceMetaBar";
import { StudioSentenceToolbar } from "@/features/listening/components/StudioSentenceToolbar";
import {
  MediaDisplayModeToggle,
  type MediaDisplayMode,
} from "@/features/listening/components/MediaDisplayModeToggle";
import {
  resolveLessonMedia,
  buildEffectiveSentence,
} from "@/features/listening/utils/lessonMedia";
import {
  TranscriptSentencesSkeleton,
  ShadowingSentenceLoadingSkeleton,
  ShimmerBox,
} from "./LoadingSkeletons";
import { formatElapsedTime } from "./ShadowingCompletionScreen";

interface ShadowingStudioWorkspaceProps {
  currentLesson: any;
  rawIdParam: string | null;
  selectedLessonId: string | null;
  isInPlaceSwitchingLesson?: boolean;
  elapsedTime?: number;
  onElapsedTimeTick?: (sec: number) => void;
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
  setPlayingSentenceText?: React.Dispatch<React.SetStateAction<string | null>>;
  currentVolume?: number;
  setCurrentVolume?: (vol: number) => void;
  currentAccent?: string;
  onAccentChange?: (accent: string) => void;
  mediaDisplayMode?: MediaDisplayMode;
  onMediaDisplayModeChange?: (mode: MediaDisplayMode) => void;
  isMergedWithNext?: boolean;
  onToggleMergeNext?: () => void;
  onToast?: (toast: { type: "info" | "success" | "warning" | "error"; title: string; message?: string }) => void;
}

function ShadowingStudioWorkspaceComponent({
  currentLesson,
  rawIdParam,
  selectedLessonId,
  isInPlaceSwitchingLesson = false,
  elapsedTime = 0,
  onElapsedTimeTick,
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
  setPlayingSentenceText,
  currentVolume = 1,
  setCurrentVolume,
  currentAccent = "en-US",
  onAccentChange,
  mediaDisplayMode = "video",
  onMediaDisplayModeChange,
  isMergedWithNext: controlledMerged,
  onToggleMergeNext,
  onToast,
}: ShadowingStudioWorkspaceProps) {
  const mediaInfo = resolveLessonMedia(currentLesson);
  const isVideoLesson = mediaInfo.isVideoLesson;

  const [internalMerged, setInternalMerged] = React.useState(false);
  const isMergedWithNext = controlledMerged !== undefined ? controlledMerged : internalMerged;
  const toggleMerge = onToggleMergeNext || (() => setInternalMerged((prev) => !prev));

  // Auto-reset merge state whenever active sentence changes
  React.useEffect(() => {
    setInternalMerged(false);
  }, [currentSentenceIndex, currentLesson?.id]);

  const rawSentence =
    currentLesson?.transcript?.[currentSentenceIndex] ||
    currentLesson?.transcript?.[0] ||
    null;

  const nextSentence =
    currentLesson?.transcript?.[currentSentenceIndex + 1] || null;

  const currentSentence = React.useMemo(() => {
    return buildEffectiveSentence(rawSentence, nextSentence, isMergedWithNext);
  }, [rawSentence, nextSentence, isMergedWithNext]);

  const sentenceDuration =
    currentSentence?.startTime !== undefined &&
    currentSentence?.endTime !== undefined &&
    currentSentence.endTime > currentSentence.startTime
      ? Number((currentSentence.endTime - currentSentence.startTime).toFixed(1))
      : Math.max(
          3,
          Math.ceil((currentSentence?.text || "").trim().split(/\s+/).filter(Boolean).length / (2.2 * playbackSpeed))
        );

  const handleRewind5s = React.useCallback(() => {
    setSentencePlaybackTime((prev) => Math.max(0, prev - 5));
    onToast?.({ type: "info", title: "Tua lùi 5s" });
  }, [setSentencePlaybackTime, onToast]);

  const handleForward5s = React.useCallback(() => {
    setSentencePlaybackTime((prev) => Math.min(sentenceDuration, prev + 5));
    onToast?.({ type: "info", title: "Tua nhanh 5s" });
  }, [sentenceDuration, setSentencePlaybackTime, onToast]);

  return (
    <div
      id="active-shadowing-workspace"
      className="w-full h-full max-h-full flex flex-col overflow-hidden select-none font-sans"
    >
      {/* 1. Top Unified Studio Navigation Bar */}
      <StudioTopHeader
        title={currentLesson?.title || "Shadowing Practice"}
        level={currentLesson?.level || "All Levels"}
        currentMode="shadowing"
        lessonQueryId={rawIdParam || selectedLessonId || "1"}
        accent={currentAccent}
        onAccentChange={onAccentChange}
        showAccentSwitcher={!isVideoLesson || mediaDisplayMode === "audio"}
        onBack={handleBackToListing}
        rightExtraActions={
          <div className="flex items-center gap-1.5 sm:gap-2">
            {isVideoLesson && onMediaDisplayModeChange && (
              <MediaDisplayModeToggle
                mode={mediaDisplayMode}
                onModeChange={onMediaDisplayModeChange}
              />
            )}
            <StudioTimerBadge
              isActive={true}
              initialSeconds={elapsedTime}
              onSecondsUpdate={onElapsedTimeTick}
            />
          </div>
        }
      />

      {/* 2. Mobile/Tablet View Switcher Tab with Apple-Grade Spring Sliding Pill */}
      <StudioMobileTabBar
        branch="shadowing"
        activeTab={mobileStudioTab}
        onTabChange={setMobileStudioTab}
        currentSentenceIndex={currentSentenceIndex}
        totalSentencesCount={totalSentencesCount}
      />

      {/* 3. 2-Column Responsive Workspace: Left Main Shadowing & Right Transcript Panel */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* CỘT TRÁI: SINGLE-SENTENCE FOCUS SHADOWING WORKSPACE */}
        <div
          className={`flex-1 min-w-0 p-2.5 sm:p-3 lg:p-3.5 space-y-2.5 overflow-y-auto hide-scrollbar pb-24 lg:pb-3.5 ${
            mobileStudioTab === "practice" ? "block" : "hidden lg:block"
          }`}
        >
          {currentSentence ? (
            <div className="space-y-2.5 w-full">
              {/* 3.1 INTERACTIVE MEDIA PLAYER CONTAINER (VIDEO CINEMA OR ACOUSTIC WAVEFORM) */}
              <StudioMediaPlayerContainer
                practiceMode="shadowing"
                currentLesson={currentLesson}
                currentSentence={currentSentence}
                currentSentenceIndex={currentSentenceIndex}
                totalSentencesCount={totalSentencesCount}
                sentencePlaybackTime={sentencePlaybackTime}
                setSentencePlaybackTime={setSentencePlaybackTime}
                sentenceDuration={sentenceDuration}
                isPlaying={playingSentenceText === currentSentence.text}
                playbackSpeed={playbackSpeed}
                onSpeedChange={(spd) => setPlaybackSpeed(spd)}
                volume={currentVolume}
                onVolumeChange={setCurrentVolume}
                onTogglePlay={handlePlaySampleAudio}
                onPrev={handlePrevSentence}
                onNext={handleNextSentence}
                onSentenceEnded={() => {
                  setPlayingSentenceText?.(null);
                  setSentencePlaybackTime(0);
                }}
                isRecording={isRecording}
                liveAudioEnergy={liveAudioEnergy}
                mediaDisplayMode={mediaDisplayMode}
                onMediaDisplayModeChange={onMediaDisplayModeChange}
                onToast={onToast}
              />

              {/* 3.2 META STATUS ROW */}
              <StudioSentenceMetaBar
                currentSentenceIndex={currentSentenceIndex}
                totalSentencesCount={totalSentencesCount}
                wordCount={
                  currentSentence.text.trim().split(/\s+/).filter(Boolean).length
                }
                scoreText={
                  sentenceScores?.[currentSentenceIndex] !== undefined
                    ? sentenceScores[currentSentenceIndex] >= 80
                      ? `Đã đạt - ${sentenceScores[currentSentenceIndex]} điểm`
                      : `Chưa đạt - ${sentenceScores[currentSentenceIndex]} điểm`
                    : aiAnalysisResult?.overallScore
                    ? aiAnalysisResult.overallScore >= 80
                      ? `Đã đạt - ${aiAnalysisResult.overallScore} điểm`
                      : `Chưa đạt - ${aiAnalysisResult.overallScore} điểm`
                    : null
                }
                repeatKey="Space"
              />

              {/* 3.3 SENTENCE UTILITY TOOLBAR */}
              <StudioSentenceToolbar
                isBookmarked={isCurrentSentenceBookmarked}
                onToggleBookmark={handleToggleBookmark}
                onReport={onOpenReportModal}
                fontSizeLevel={fontSizeLevel}
                onAdjustFontSize={handleAdjustFontSize}
                autoNextSentence={autoNextSentence}
                onToggleAutoNext={setAutoNextSentence}
                hideTranslation={hideTranslation}
                onToggleHideTranslation={setHideTranslation}
                canMergeNext={!!nextSentence}
                isMergedWithNext={isMergedWithNext}
                onToggleMergeNext={toggleMerge}
              />

              {/* 3.4 SHADOWING CORE SENTENCE CARD */}
              {isInPlaceSwitchingLesson ? (
                <ShadowingSentenceLoadingSkeleton />
              ) : (
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
                        <div className="pl-4 pr-3 py-2 border-l-[3px] border-[#0059bb]/70 dark:border-sky-400/70 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-xl text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed my-1 break-words">
                          {(currentSentence.translation || currentSentence.vietnamese || "").replace(/^(?:Việt|viet|vi|vn|Vietnamese|tiếng việt)?\s*:\s*/i, "").trim()}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

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
                    <Mic className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Đang nhận diện giọng nói thời gian thực...
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

              {/* AI Analysis Loading Status */}
              {isAnalyzing && (
                <div className="py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    AI đang phân tích và chấm điểm giọng nói...
                  </span>
                </div>
              )}

              {/* Inline Evaluation Result Pill Banner */}
              {sentenceScores?.[currentSentenceIndex] !== undefined && !isRecording && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl border transition-all ${
                    sentenceScores[currentSentenceIndex] >= 80
                      ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200/90 dark:border-emerald-800/60 shadow-2xs"
                      : "bg-rose-50/70 dark:bg-rose-950/40 border-rose-200/90 dark:border-rose-800/60 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                        sentenceScores[currentSentenceIndex] >= 80
                          ? "bg-emerald-600 text-white"
                          : "bg-rose-600 text-white"
                      }`}
                    >
                      {sentenceScores[currentSentenceIndex] >= 80 ? (
                        <Sparkles className="w-4 h-4 stroke-[2.2]" />
                      ) : (
                        <RotateCcw className="w-4 h-4 stroke-[2.2]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-sans shadow-xs ${
                            sentenceScores[currentSentenceIndex] >= 80
                              ? "bg-emerald-600 text-white"
                              : "bg-rose-600 text-white"
                          }`}
                        >
                          {sentenceScores[currentSentenceIndex] >= 80
                            ? `Đã đạt - ${sentenceScores[currentSentenceIndex]} điểm`
                            : `Chưa đạt - ${sentenceScores[currentSentenceIndex]} điểm`}
                        </span>
                        {sentenceScores[currentSentenceIndex] >= 80 && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-bold text-[11px] border border-amber-300/80 dark:border-amber-700/60 font-sans shadow-2xs">
                            +15 XP
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium font-sans mt-0.5">
                        {sentenceScores[currentSentenceIndex] >= 80
                          ? "Phát âm chuẩn xác! Hệ thống đang tự động chuyển sang câu tiếp theo..."
                          : "Cần từ 80 điểm trở lên để qua câu. Bạn hãy giữ nguyên câu và thu âm lại nhé!"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold font-sans tracking-tight shadow-xs ${
                      sentenceScores[currentSentenceIndex] >= 80
                        ? "bg-emerald-600 text-white"
                        : "bg-rose-600 text-white"
                    }`}
                  >
                    {sentenceScores[currentSentenceIndex] >= 80 ? "ĐÃ ĐẠT" : "CHƯA ĐẠT"}
                  </span>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="flex-1 min-h-[300px] flex items-center justify-center p-8 text-center text-slate-400">
              <span className="text-sm font-medium">Đang tải câu luyện nói...</span>
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
              practiceMode="shadowing"
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

export const ShadowingStudioWorkspace = React.memo(ShadowingStudioWorkspaceComponent);
