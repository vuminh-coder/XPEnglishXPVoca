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
  CheckCircle2,
  Languages,
  Speech,
  Copy,
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
  liveRecognizedWords: { word: string; status: "perfect" | "good" | "needs_work" | "active" | "unspoken" }[];
  liveWordStatuses?: { [wordIdx: number]: "perfect" | "good" | "needs_work" | "active" };
  activeSpeechWordIndex?: number | null;
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
  liveWordStatuses,
  activeSpeechWordIndex,
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

  // Auto-reset merge state & word track scroll position whenever active sentence changes
  React.useEffect(() => {
    setInternalMerged(false);
    wordTrackContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [currentSentenceIndex, currentLesson?.id, wordTrackContainerRef]);

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

  // Active Tab for Helper Card: "translation" | "ipa" (with persistent user preference)
  const [activeHelperTab, setActiveHelperTab] = React.useState<"translation" | "ipa">(() => {
    if (typeof window === "undefined") return "translation";
    try {
      const saved = localStorage.getItem("xp_shadowing_helper_tab");
      if (saved === "ipa" || saved === "translation") return saved;
    } catch {}
    return "translation";
  });
  const [copiedHelperText, setCopiedHelperText] = React.useState(false);

  const handleSelectHelperTab = React.useCallback((tab: "translation" | "ipa") => {
    setActiveHelperTab(tab);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("xp_shadowing_helper_tab", tab);
      } catch {}
    }
  }, []);

  const handleCopyHelperText = React.useCallback((text: string) => {
    if (!text) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedHelperText(true);
      setTimeout(() => setCopiedHelperText(false), 1500);
    }
  }, []);

  const tokenSizeClass = React.useMemo(() => {
    if (fontSizeLevel === 1) return "text-base sm:text-[17px] min-h-[38px] sm:min-h-[40px] px-3 sm:px-3.5 py-1 sm:py-1.5";
    if (fontSizeLevel === 2) return "text-[17px] sm:text-lg min-h-[42px] sm:min-h-[44px] px-3.5 sm:px-4 py-1.5 sm:py-2";
    if (fontSizeLevel === 3) return "text-lg sm:text-xl min-h-[46px] sm:min-h-[48px] px-4 sm:px-5 py-2 sm:py-2.5";
    return "text-sm sm:text-base min-h-[34px] sm:min-h-[36px] px-2.5 sm:px-3 py-1 sm:py-1.5";
  }, [fontSizeLevel]);

  // Auto-scroll ngang mượt mà theo từng từ phát âm thời gian thực hoặc playback mẫu (giống Dictation)
  React.useEffect(() => {
    const targetIdx = isRecording
      ? (activeSpeechWordIndex !== null && activeSpeechWordIndex !== undefined && activeSpeechWordIndex >= 0 ? activeSpeechWordIndex : null)
      : activePlaybackWordIndex;

    if (targetIdx !== null && targetIdx !== undefined && targetIdx >= 0) {
      if (targetIdx <= 1) {
        wordTrackContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const activeEl = wordTokenRefs.current?.[targetIdx];
        if (activeEl) {
          activeEl.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    }
  }, [isRecording, activeSpeechWordIndex, activePlaybackWordIndex, wordTokenRefs, wordTrackContainerRef]);

  return (
    <div
      id="active-shadowing-workspace"
      className="w-full h-full max-h-full flex flex-col overflow-hidden select-none font-sans min-h-0"
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
      <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-hidden">
        {/* CỘT TRÁI: SINGLE-SENTENCE FOCUS SHADOWING WORKSPACE (MATCHING DICTATION 100%) */}
        <div
          className={`flex-1 min-w-0 p-3 sm:p-3.5 space-y-2.5 sm:space-y-3 overflow-y-auto overscroll-contain pb-28 lg:pb-4 hide-scrollbar ${
            mobileStudioTab === "practice" ? "block" : "hidden lg:block"
          }`}
        >
          {currentSentence ? (
            <div className="space-y-2.5 sm:space-y-3 w-full">
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

              {/* 3.4 SHADOWING CORE SENTENCE CARD (PARITY WITH DICTATION WORKSPACE) */}
              {isInPlaceSwitchingLesson ? (
                <ShadowingSentenceLoadingSkeleton />
              ) : (
                <div className="w-full space-y-2 sm:space-y-2.5 font-sans select-none">
                  {/* Header Row: Trạng thái & Nút Dịch */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-0.5">
                    <div className="flex items-center gap-1.5 font-medium">
                      {isRecording ? (
                        <span className="inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold animate-pulse">
                          <Mic className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          Đang nhận diện giọng nói trực tiếp trên câu...
                        </span>
                      ) : (
                        <>
                          <Info className="w-3.5 h-3.5 text-slate-400" />
                          <span>Bấm vào từ để tra từ điển & phát âm</span>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setHideTranslation((prev) => !prev)}
                      className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer select-none group"
                      title="Ẩn hoặc hiện bản dịch nghĩa tiếng Việt và IPA"
                    >
                      {hideTranslation ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                          <span className="font-semibold">Xem dịch / IPA</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                          <span className="font-semibold">Ẩn gợi ý</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Words Container Card (Wrap Layout matching Dictation for flawless Mobile reading) */}
                  <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
                    <div
                      ref={wordTrackContainerRef}
                      className="flex flex-wrap gap-1.5 sm:gap-2 items-center py-1.5 sm:py-2 px-1"
                    >
                      {currentSentence.text.split(" ").map((word: string, wIdx: number) => {
                        const clean = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").toLowerCase();

                        // 1. Trạng thái sau khi AI phân tích xong (kết thúc thu âm)
                        const aiWordEval = aiAnalysisResult?.wordAccuracy?.[wIdx] || aiAnalysisResult?.wordAccuracy?.find(
                          (item: any) =>
                            item.word.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").toLowerCase() === clean
                        );

                        // 2. Trạng thái nhận diện giọng nói thời gian thực (Real-time Speech Cursor)
                        const liveStatus = liveWordStatuses?.[wIdx];
                        const isCurrentSpeechActive = isRecording && activeSpeechWordIndex === wIdx;

                        // 3. Highlight khi đang nghe câu mẫu
                        const isCurrentlyBeingRead = activePlaybackWordIndex === wIdx;

                        // Quyết định trạng thái hiển thị
                        let wordState: "perfect" | "good" | "needs_work" | "active" | "playback" | "unspoken" = "unspoken";

                        if (isCurrentlyBeingRead) {
                          wordState = "playback";
                        } else if (isRecording) {
                          if (isCurrentSpeechActive) {
                            wordState = "active";
                          } else if (liveStatus === "perfect") {
                            wordState = "perfect";
                          } else if (liveStatus === "good") {
                            wordState = "good";
                          } else if (liveStatus === "needs_work") {
                            wordState = "needs_work";
                          } else {
                            wordState = "unspoken";
                          }
                        } else if (aiWordEval) {
                          if (aiWordEval.status === "perfect") wordState = "perfect";
                          else if (aiWordEval.status === "good") wordState = "good";
                          else if (aiWordEval.status === "needs_work") wordState = "needs_work";
                        }

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
                              className={`${tokenSizeClass} rounded-lg font-sans transition-all cursor-pointer select-none font-bold tracking-tight shrink-0 flex items-center justify-center ${
                                wordState === "perfect"
                                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-500 shadow-xs ring-1 ring-emerald-500/20"
                                  : wordState === "good"
                                  ? "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-2 border-amber-400 shadow-2xs ring-1 ring-amber-400/20"
                                  : wordState === "needs_work"
                                  ? "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-2 border-rose-400 shadow-2xs ring-1 ring-rose-400/20"
                                  : wordState === "active"
                                  ? "bg-blue-100/90 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 font-extrabold border-2 border-[#0059bb] dark:border-sky-400 ring-4 ring-blue-500/25 dark:ring-sky-400/30 shadow-xs scale-105 animate-pulse"
                                  : wordState === "playback"
                                  ? "bg-blue-100/90 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 font-extrabold border-2 border-[#0059bb] dark:border-sky-400 ring-3 ring-blue-500/25 dark:ring-sky-400/30 shadow-xs scale-105"
                                  : "bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400/80 dark:hover:border-sky-400/70 hover:text-[#0059bb] dark:hover:text-sky-300 hover:bg-blue-50/40 dark:hover:bg-slate-800 shadow-2xs"
                              }`}
                            >
                              {word}
                            </motion.button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Shortcut Buttons Bar (Matching Dictation's exact sizing & responsive layout) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-0.5">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial flex-wrap">
                      {/* Nút Thu Âm & Chấm Điểm */}
                      {!isRecording ? (
                        <button
                          type="button"
                          onClick={startRecording}
                          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer shadow-2xs active:scale-98 min-h-[34px] sm:min-h-[36px]"
                        >
                          <Mic className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>Thu âm & Chấm điểm</span>
                          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700">
                            Alt+S
                          </kbd>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={stopRecording}
                          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-bold text-white bg-rose-600 hover:bg-rose-700 transition-all cursor-pointer shadow-md active:scale-98 min-h-[34px] sm:min-h-[36px] animate-pulse"
                        >
                          <Square className="w-3.5 h-3.5 fill-white text-white shrink-0" />
                          <span>Dừng thu ({recordingTime}s)</span>
                        </button>
                      )}

                      {/* Nút Nghe Câu Mẫu */}
                      <button
                        type="button"
                        onClick={handlePlaySampleAudio}
                        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer shadow-2xs active:scale-98 min-h-[34px] sm:min-h-[36px]"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>Nghe câu mẫu</span>
                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700">
                          Space
                        </kbd>
                      </button>

                      {/* Nút Nghe Lại Giọng Bạn (khi đã thu âm) */}
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
                          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200/80 dark:border-emerald-800/60 transition-all cursor-pointer shadow-2xs active:scale-98 min-h-[34px] sm:min-h-[36px]"
                        >
                          <Headphones className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>Nghe lại giọng bạn</span>
                        </button>
                      )}
                    </div>

                    {/* Nhóm nút bên phải: Dịch / IPA & Làm lại câu */}
                    <div className="flex items-center gap-1.5">
                      {(currentSentence.translation || currentSentence.vietnamese || currentSentence.ipa) && (
                        <button
                          type="button"
                          onClick={() => setHideTranslation((prev) => !prev)}
                          className={`inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-2xs min-h-[34px] sm:min-h-[36px] active:scale-95 ${
                            !hideTranslation
                              ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/60 font-bold"
                              : "text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800"
                          }`}
                        >
                          {!hideTranslation ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5 shrink-0 text-[#0059bb] dark:text-sky-400" />
                              <span>Ẩn gợi ý</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5 shrink-0" />
                              <span>Dịch / IPA</span>
                            </>
                          )}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={handleResetCurrentSentence}
                        title="Làm lại câu này"
                        className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer min-h-[34px] sm:min-h-[36px] min-w-[34px] sm:min-w-[36px] flex items-center justify-center"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 3.5 DUAL-TAB ACCORDION HELPER CARD (BẢN DỊCH & PHIÊN ÂM IPA - 100% PARITY VỚI DICTATION) */}
                  <AnimatePresence>
                    {!hideTranslation && (currentSentence.translation || currentSentence.vietnamese || currentSentence.ipa) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100/90 dark:border-slate-800 shadow-2xs space-y-2.5 overflow-hidden"
                      >
                        {/* TAB CHUYỂN BÊN DỊCH VÀ BÊN IPA (KHI CÓ CẢ 2) */}
                        {(currentSentence.translation || currentSentence.vietnamese) && currentSentence.ipa && (
                          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                            <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
                              <button
                                type="button"
                                onClick={() => handleSelectHelperTab("translation")}
                                className={`px-3 py-1.5 rounded-md text-xs sm:text-[12.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                  activeHelperTab === "translation"
                                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs font-extrabold"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                              >
                                <Languages className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
                                <span>Bản dịch</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleSelectHelperTab("ipa")}
                                className={`px-3 py-1.5 rounded-md text-xs sm:text-[12.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                  activeHelperTab === "ipa"
                                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs font-extrabold"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                              >
                                <Speech className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
                                <span>Phiên âm IPA</span>
                              </button>
                            </div>

                            {/* Nút sao chép nội dung đang xem */}
                            <button
                              type="button"
                              onClick={() => {
                                const textToCopy =
                                  activeHelperTab === "ipa"
                                    ? (currentSentence.ipa.startsWith("/") ? currentSentence.ipa : `/${currentSentence.ipa}/`)
                                    : (currentSentence.translation || currentSentence.vietnamese || "").replace(/^(?:Việt|viet|vi|vn|Vietnamese|tiếng việt)?\s*:\s*/i, "").trim();
                                handleCopyHelperText(textToCopy);
                              }}
                              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors text-xs flex items-center gap-1 cursor-pointer"
                              title="Sao chép nội dung"
                            >
                              {copiedHelperText ? (
                                <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                                  <Check className="w-3 h-3 stroke-[2.5]" /> Đã chép
                                </span>
                              ) : (
                                <span className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-[11px] font-medium flex items-center gap-1">
                                  <Copy className="w-3 h-3" /> Sao chép
                                </span>
                              )}
                            </button>
                          </div>
                        )}

                        {/* Tab 1: Bản dịch tiếng Việt */}
                        {((activeHelperTab === "translation" && (currentSentence.translation || currentSentence.vietnamese)) || (!currentSentence.ipa && (currentSentence.translation || currentSentence.vietnamese))) && (
                          <div className="pl-4 pr-3 py-2 border-l-[3px] border-[#0059bb]/70 dark:border-sky-400/70 bg-blue-50/40 dark:bg-blue-950/20 rounded-r-xl text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed my-1 break-words">
                            {(currentSentence.translation || currentSentence.vietnamese || "").replace(/^(?:Việt|viet|vi|vn|Vietnamese|tiếng việt)?\s*:\s*/i, "").trim()}
                          </div>
                        )}

                        {/* Tab 2: Phiên âm IPA */}
                        {((activeHelperTab === "ipa" && currentSentence.ipa) || (!(currentSentence.translation || currentSentence.vietnamese) && currentSentence.ipa)) && (
                          <div className="flex items-start gap-2.5 text-xs sm:text-sm py-0.5">
                            <div className="flex items-center gap-1 font-bold text-[#0059bb] dark:text-sky-400 shrink-0 mt-0.5">
                              <Speech className="w-4 h-4 shrink-0 text-[#0059bb] dark:text-sky-400" />
                              <span>IPA:</span>
                            </div>
                            <p className="font-mono font-bold tracking-wide text-slate-900 dark:text-white leading-relaxed text-xs sm:text-[14px] selection:bg-blue-100 dark:selection:bg-blue-900/40 select-all">
                              {currentSentence.ipa.startsWith("/") ? currentSentence.ipa : `/${currentSentence.ipa}/`}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* AI Analysis Loading Status */}
                  {isAnalyzing && (
                    <div className="py-2.5 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        AI đang phân tích và chấm điểm giọng nói...
                      </span>
                    </div>
                  )}

                  {/* Celebratory Completion & Evaluation Result Banner (Matching Dictation Style) */}
                  <AnimatePresence>
                    {sentenceScores?.[currentSentenceIndex] !== undefined && !isRecording && !isAnalyzing && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 3 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className={`p-4 rounded-xl border flex items-center justify-between gap-3 shadow-xs ${
                          sentenceScores[currentSentenceIndex] >= 80
                            ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-900 dark:text-emerald-200"
                            : "bg-rose-50 dark:bg-rose-950/30 border-rose-500/40 text-rose-900 dark:text-rose-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                              sentenceScores[currentSentenceIndex] >= 80
                                ? "bg-emerald-600 text-white"
                                : "bg-rose-600 text-white"
                            }`}
                          >
                            {sentenceScores[currentSentenceIndex] >= 80 ? (
                              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                            ) : (
                              <RotateCcw className="w-5 h-5 stroke-[2.2]" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-xs sm:text-sm font-bold">
                                {sentenceScores[currentSentenceIndex] >= 80
                                  ? `🎉 Xuất sắc! Phát âm đạt ${sentenceScores[currentSentenceIndex]} điểm!`
                                  : `Chưa đạt (${sentenceScores[currentSentenceIndex]} điểm)`}
                              </p>
                              {sentenceScores[currentSentenceIndex] >= 80 && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-bold text-[11px] border border-amber-300/80 dark:border-amber-700/60 font-sans shadow-2xs">
                                  +15 XP
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-semibold mt-0.5 opacity-90">
                              {sentenceScores[currentSentenceIndex] >= 80
                                ? "Phát âm chuẩn xác! Tự động chuyển câu tiếp theo..."
                                : "Cần từ 80 điểm trở lên để qua câu. Hãy thu âm lại nhé!"}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0">
                          {sentenceScores[currentSentenceIndex] >= 80 ? (
                            <Sparkles className="w-4 h-4 text-amber-500 animate-bounce" />
                          ) : (
                            <button
                              type="button"
                              onClick={startRecording}
                              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                            >
                              Thử lại
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {userAudioUrl && (
                <audio
                  ref={userAudioPlayerRef}
                  src={userAudioUrl}
                  onEnded={() => setIsPlayingUserAudio(false)}
                  className="hidden"
                />
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
          className={`w-full lg:w-[380px] xl:w-[400px] 2xl:w-[420px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200/90 dark:border-slate-800 bg-[#f8fafc] dark:bg-slate-900/90 flex flex-col min-h-0 overflow-y-auto pb-24 lg:pb-0 ${
            mobileStudioTab === "transcript" ? "flex flex-1" : "hidden lg:flex"
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
              transcript={currentLesson?.transcript || []}
              currentIndex={currentSentenceIndex}
              completedSentences={completedSentences}
              sentenceScores={sentenceScores}
              onSelectSentence={onSelectTranscriptSentence}
              onReplaySentence={onReplayTranscriptSentence}
              onResetProgress={onResetProgress}
              recommendedLessons={recommendedLessons}
              onSelectLesson={onSelectLesson}
              onShuffleRecommendations={onShuffleRecommendations}
              keyVocabularies={currentLesson?.vocabulary || currentLesson?.vocabList || []}
              onWordClick={handleWordClick}
              isPlaying={playingSentenceText !== null}
              className="h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const ShadowingStudioWorkspace = React.memo(ShadowingStudioWorkspaceComponent);
