"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  useVideoStore,
  YouTubeVideoItem,
  extractYouTubeId,
  SubtitleSentence,
} from "@/stores/videoStore";
import {
  processHighPrecisionSubtitles,
  SubtitleExtractionResult,
  getLastFetchedVideoMeta,
} from "@/features/listening/services/youtubeSubtitleService";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { VocabSuiteNavTabs } from "@/shared/components/layout/nav-tabs";

// Modular Feature Components & Hooks
import {
  VideoPlayerStudio,
  InteractiveStudyDock,
  VideoLibraryGrid,
  VideoHeroMetricsBanner,
  YouTubeImportDeck,
  VideoTopHeaderActions,
  KeyboardShortcutsModal,
  SubtitleExportModal,
  SrtImportModal,
  XpSubExtractorModal,
  useYouTubePlayerSync,
  useVideoExercises,
  useWordLookup,
} from "@/features/myvideo";

export default function MyVideoPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const {
    savedVideos,
    addVideo,
    removeVideo,
    toggleFavorite,
    updateProgress,
    updateVideoSubtitles,
    loadSavedVideos,
  } = useVideoStore();

  // YouTube Link Import State
  const [youtubeInput, setYoutubeInput] = useState("");
  const [importCategory, setImportCategory] = useState<YouTubeVideoItem["category"]>("Communication");
  const [importLevel, setImportLevel] = useState<YouTubeVideoItem["level"]>("Medium");
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Modals state
  const [activeSubtitleResult, setActiveSubtitleResult] = useState<SubtitleExtractionResult | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSrtImportModal, setShowSrtImportModal] = useState(false);
  const [showXpSubModal, setShowXpSubModal] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "learning" | "done" | "favorite">("all");

  // Master Video Player State
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState<"subtitles" | "dictation" | "playlist">("subtitles");
  const [subViewMode, setSubViewMode] = useState<"rolling" | "full">("rolling");

  // Load saved videos on mount
  useEffect(() => {
    loadSavedVideos();
  }, [loadSavedVideos]);

  // Initial video setup
  const hasSetInitialVideo = useRef(false);
  useEffect(() => {
    if (!hasSetInitialVideo.current && !activeVideo && savedVideos.length > 0) {
      setActiveVideo(savedVideos[0]);
      hasSetInitialVideo.current = true;
    }
  }, [savedVideos, activeVideo]);

  // Sync activeVideo with store changes
  useEffect(() => {
    if (activeVideo) {
      const updatedVideo = savedVideos.find((v) => v.id === activeVideo.id);
      if (
        updatedVideo &&
        (updatedVideo.isFavorite !== activeVideo.isFavorite ||
          updatedVideo.progressPercent !== activeVideo.progressPercent ||
          updatedVideo.subtitles !== activeVideo.subtitles)
      ) {
        setActiveVideo(updatedVideo);
      }
    }
  }, [savedVideos, activeVideo]);

  // Handler for AI Speech transcription when video has no subtitles
  const handleNewSubtitleCaptured = useCallback((rawItem: any) => {
    setActiveVideo((prev) => {
      if (!prev) return null;
      const exists = prev.subtitles.some(
        (s) =>
          Math.abs(s.startTime - rawItem.startTime) < 1.0 ||
          s.textEn.toLowerCase() === rawItem.textEn.toLowerCase()
      );
      if (exists) return prev;

      const newSub: SubtitleSentence = {
        id: `ai_${prev.id}_${prev.subtitles.length + 1}`,
        startTime: rawItem.startTime,
        endTime: rawItem.endTime,
        textEn: rawItem.textEn,
        textVn: rawItem.textVn,
        dictationWord: rawItem.dictationWord,
      };

      const updatedSubs = [...prev.subtitles, newSub].sort((a, b) => a.startTime - b.startTime);
      return {
        ...prev,
        subtitles: updatedSubs,
      };
    });
  }, []);

  // Hook 1: YouTube Player Synchronization Loop & Commands
  const {
    iframeRef,
    isPlaying,
    isLoopingSentence,
    toggleLoopSentence,
    playbackSpeed,
    changePlaybackSpeed,
    activeSubIndex,
    activeWordIndex,
    isCueSpeaking,
    subtitleSyncOffset,
    setSubtitleSyncOffset,
    togglePlayPause,
    pauseVideo,
    jumpToSubtitleIndex,
    jumpToRandomSubtitle,
    resetPlayerSync,
  } = useYouTubePlayerSync({
    activeVideo,
    currentSubIndex: 0,
    onSubIndexChange: (index) => setCurrentSubIndex(index),
    onNewSubtitleCaptured: handleNewSubtitleCaptured,
    addToast,
  });

  // Hook 2: Dictation & Shadowing Exercises
  const {
    currentSubIndex,
    setCurrentSubIndex,
    dictationInput,
    setDictationInput,
    dictationAnswered,
    dictationCorrect,
    showHint,
    setShowHint,
    handleCheckDictation,
    handleNextDictation,
    isRecording,
    shadowingScore,
    waveformBars,
    toggleShadowingRecord,
    resetExercises,
  } = useVideoExercises({
    activeVideo,
    activeSubIndex,
    jumpToSubtitleIndex,
    updateProgress,
    awardXp,
    addToast,
  });

  // Hook 3: 1-Click Word Lookup & Vocabulary Sync
  const {
    wordLookupData,
    setWordLookupData,
    handleWordClick,
    handleSaveWordToNotebook,
    resetWordLookup,
  } = useWordLookup({
    user,
    awardXp,
    addToast,
    onPauseVideo: pauseVideo,
  });

  // Select video & reset sub-states
  const selectVideoAndOpenSubtitles = useCallback(
    (video: YouTubeVideoItem) => {
      setActiveVideo(video);
      setRightPanelTab("subtitles");
      resetPlayerSync();
      resetExercises();
      resetWordLookup();
    },
    [resetPlayerSync, resetExercises, resetWordLookup]
  );

  // Keyboard shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        if (e.key === "Enter" && rightPanelTab === "dictation") {
          e.preventDefault();
          if (dictationAnswered) {
            handleNextDictation();
          } else if (dictationInput.trim()) {
            handleCheckDictation();
          }
        }
        return;
      }

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "r":
        case "R":
          e.preventDefault();
          toggleLoopSentence();
          break;
        case "s":
        case "S":
          e.preventDefault();
          jumpToRandomSubtitle();
          break;
        case "ArrowLeft":
        case "j":
        case "J": {
          e.preventDefault();
          const cur = activeSubIndex >= 0 ? activeSubIndex : currentSubIndex;
          jumpToSubtitleIndex(Math.max(0, cur - 1));
          break;
        }
        case "ArrowRight":
        case "l":
        case "L": {
          e.preventDefault();
          if (activeVideo) {
            const cur = activeSubIndex >= 0 ? activeSubIndex : currentSubIndex;
            jumpToSubtitleIndex(Math.min(activeVideo.subtitles.length - 1, cur + 1));
          }
          break;
        }
        case "1":
          e.preventDefault();
          setRightPanelTab("subtitles");
          break;
        case "2":
          e.preventDefault();
          setRightPanelTab("dictation");
          break;
        case "3":
          e.preventDefault();
          setRightPanelTab("playlist");
          break;
        case "?":
          e.preventDefault();
          setShowShortcutsModal((prev) => !prev);
          break;
        case "Escape":
          if (showExportModal) setShowExportModal(false);
          if (showSrtImportModal) setShowSrtImportModal(false);
          if (showXpSubModal) setShowXpSubModal(false);
          if (showShortcutsModal) setShowShortcutsModal(false);
          if (wordLookupData) resetWordLookup();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeVideo,
    activeSubIndex,
    currentSubIndex,
    dictationAnswered,
    dictationInput,
    rightPanelTab,
    showExportModal,
    showSrtImportModal,
    showXpSubModal,
    showShortcutsModal,
    wordLookupData,
    togglePlayPause,
    toggleLoopSentence,
    jumpToRandomSubtitle,
    jumpToSubtitleIndex,
    handleCheckDictation,
    handleNextDictation,
    resetWordLookup,
  ]);

  // Handle YouTube URL Import
  const handleImportYouTube = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeInput || !youtubeInput.trim()) {
      setImportError("Vui lòng dán đường dẫn video YouTube");
      return;
    }

    const videoId = extractYouTubeId(youtubeInput);
    if (!videoId) {
      setImportError(
        "Đường dẫn YouTube không hợp lệ. Vui lòng nhập link chuẩn (VD: https://www.youtube.com/watch?v=...)"
      );
      return;
    }

    if (savedVideos.some((v) => v.id === videoId)) {
      setImportError("Video này đã có trong danh sách của bạn rồi!");
      return;
    }

    setIsImporting(true);
    setImportError(null);

    try {
      let title = "Video Học Tiếng Anh YouTube";
      let authorName = "YouTube Creator";

      try {
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
        const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(2000) });
        if (res.ok) {
          const data = await res.json();
          if (data.title) title = data.title;
          if (data.author_name) authorName = data.author_name;
        }
      } catch (oembedErr) {}

      const { storeSubtitles, fullResult } = await processHighPrecisionSubtitles(videoId, title);

      const serverMeta = getLastFetchedVideoMeta();
      if (serverMeta?.title && title === "Video Học Tiếng Anh YouTube") {
        title = serverMeta.title;
      }
      if (serverMeta?.authorName && authorName === "YouTube Creator") {
        authorName = serverMeta.authorName;
      }

      if (!storeSubtitles || storeSubtitles.length === 0) {
        setImportError(
          "Không tìm thấy dữ liệu phụ đề cho video YouTube này. Vui lòng thử video khác có sẵn phụ đề hoặc dán file phụ đề .SRT."
        );
        return;
      }

      const newVideo: YouTubeVideoItem = {
        id: videoId,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        title,
        authorName,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        duration: fullResult.stats.totalDurationStr,
        category: importCategory,
        level: importLevel,
        savedAt: new Date().toISOString().split("T")[0],
        progressPercent: 0,
        isFavorite: false,
        subtitles: storeSubtitles,
      };

      addVideo(newVideo);
      setYoutubeInput("");
      setActiveVideo(newVideo);
      setActiveSubtitleResult(fullResult);
      resetPlayerSync();
      resetExercises();
      resetWordLookup();
      setRightPanelTab("subtitles");

      window.scrollTo({ top: 220, behavior: "smooth" });

      addToast({
        type: "success",
        title: `Đã trích xuất ${storeSubtitles.length} câu phụ đề chuẩn 100%!`,
        message: `Video và toàn bộ timeline mốc mili-giây đã tự động cập nhật trực tiếp vào bài học!`,
      });
    } catch (err: any) {
      setImportError(err?.message || "Không thể trích xuất phụ đề từ video YouTube này.");
    } finally {
      setIsImporting(false);
    }
  };

  // Metrics computation
  const totalMinutes = savedVideos.reduce(
    (acc, v) => acc + (parseInt(v.duration.split(":")[0]) || 3),
    0
  );
  const totalSubtitlesCount = savedVideos.reduce(
    (acc, v) => acc + (v.subtitles?.length || 0),
    0
  );
  const favoriteCount = savedVideos.filter((v) => v.isFavorite).length;
  const avgProgress =
    savedVideos.length > 0
      ? Math.round(
          savedVideos.reduce((acc, v) => acc + (v.progressPercent || 0), 0) / savedVideos.length
        )
      : 0;

  // Filtered Video List
  const filteredVideos = savedVideos.filter((v) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      v.title.toLowerCase().includes(query) ||
      v.authorName.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategory === "Tất cả" || v.category === selectedCategory;

    if (!matchesSearch || !matchesCategory) return false;

    if (selectedFilter === "learning") return v.progressPercent > 0 && v.progressPercent < 100;
    if (selectedFilter === "done") return v.progressPercent >= 100;
    if (selectedFilter === "favorite") return v.isFavorite;

    return true;
  });

  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12">
      {/* 0. UNIVERSAL 56PX (h-14) TOP ACTION & NAVIGATION HEADER BAR */}
      <AppTopHeader
        hideThemeAndAvatarOnDesktop={true}
        rightDesktopContent={
          <VideoTopHeaderActions
            onOpenShortcuts={() => setShowShortcutsModal(true)}
            onOpenSrtImport={() => setShowSrtImportModal(true)}
            onOpenXpSubModal={() => setShowXpSubModal(true)}
            onOpenExportModal={() => setShowExportModal(true)}
            hasActiveVideo={Boolean(activeVideo)}
            hasActiveSubtitleResult={Boolean(activeSubtitleResult)}
          />
        }
      >
        <VocabSuiteNavTabs />
      </AppTopHeader>

      {/* MAIN DASHBOARD CANVAS */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        {!showExportModal ? (
          <>
            {/* 1. HERO SPOTLIGHT & 4 MICRO-METRIC DOUBLE-BEZEL CARDS */}
            <VideoHeroMetricsBanner
              savedVideosCount={savedVideos.length}
              totalMinutes={totalMinutes}
              totalSubtitlesCount={totalSubtitlesCount}
              favoriteCount={favoriteCount}
              avgProgress={avgProgress}
              onOpenShortcuts={() => setShowShortcutsModal(true)}
              onOpenSrtImport={() => setShowSrtImportModal(true)}
            />

            {/* 2. YOUTUBE IMPORT STUDIO DECK */}
            <YouTubeImportDeck
              youtubeInput={youtubeInput}
              setYoutubeInput={setYoutubeInput}
              importCategory={importCategory}
              setImportCategory={setImportCategory}
              importLevel={importLevel}
              setImportLevel={setImportLevel}
              isImporting={isImporting}
              importError={importError}
              setImportError={setImportError}
              hasActiveVideo={Boolean(activeVideo)}
              onImport={handleImportYouTube}
              onOpenXpSubModal={() => setShowXpSubModal(true)}
            />

            {/* 3. MASTER-DETAIL 2-COLUMN SPLIT WORKSPACE */}
            {activeVideo && (
              <div className="grid grid-cols-1 lg:grid-cols-[1.62fr_1fr] gap-5 sm:gap-6 items-stretch">
                {/* CỘT TRÁI (1.62fr): VIDEO PLAYER STUDIO */}
                <VideoPlayerStudio
                  activeVideo={activeVideo}
                  iframeRef={iframeRef}
                  isPlaying={isPlaying}
                  togglePlayPause={togglePlayPause}
                  jumpToRandomSubtitle={jumpToRandomSubtitle}
                  jumpToPrevSubtitle={() => {
                    const currentIdx = activeSubIndex >= 0 ? activeSubIndex : currentSubIndex;
                    jumpToSubtitleIndex(Math.max(0, currentIdx - 1));
                  }}
                  jumpToNextSubtitle={() => {
                    const currentIdx = activeSubIndex >= 0 ? activeSubIndex : currentSubIndex;
                    jumpToSubtitleIndex(Math.min(activeVideo.subtitles.length - 1, currentIdx + 1));
                  }}
                  isLoopingSentence={isLoopingSentence}
                  toggleLoopSentence={toggleLoopSentence}
                  subtitleSyncOffset={subtitleSyncOffset}
                  setSubtitleSyncOffset={setSubtitleSyncOffset}
                  playbackSpeed={playbackSpeed}
                  changePlaybackSpeed={changePlaybackSpeed}
                  toggleFavorite={toggleFavorite}
                  onDeleteVideo={(id) => {
                    const nextVideos = savedVideos.filter((v) => v.id !== id);
                    removeVideo(id);
                    if (nextVideos.length > 0) {
                      selectVideoAndOpenSubtitles(nextVideos[0]);
                    } else {
                      setActiveVideo(null);
                    }
                  }}
                  addToast={addToast}
                />

                {/* CỘT PHẢI (1fr): INTERACTIVE MULTI-TAB DOCK */}
                <InteractiveStudyDock
                  activeVideo={activeVideo}
                  savedVideos={savedVideos}
                  rightPanelTab={rightPanelTab}
                  setRightPanelTab={setRightPanelTab}
                  wordLookupData={wordLookupData}
                  setWordLookupData={setWordLookupData}
                  handleWordClick={handleWordClick}
                  handleSaveWordToNotebook={handleSaveWordToNotebook}
                  subViewMode={subViewMode}
                  setSubViewMode={setSubViewMode}
                  activeSubIndex={activeSubIndex}
                  activeWordIndex={activeWordIndex}
                  isCueSpeaking={isCueSpeaking}
                  handleSeekTo={(_, index) => jumpToSubtitleIndex(index)}
                  currentSubIndex={currentSubIndex}
                  setCurrentSubIndex={setCurrentSubIndex}
                  dictationInput={dictationInput}
                  setDictationInput={setDictationInput}
                  dictationAnswered={dictationAnswered}
                  dictationCorrect={dictationCorrect}
                  showHint={showHint}
                  setShowHint={setShowHint}
                  handleCheckDictation={handleCheckDictation}
                  handleNextDictation={handleNextDictation}
                  isRecording={isRecording}
                  waveformBars={waveformBars}
                  shadowingScore={shadowingScore}
                  toggleShadowingRecord={toggleShadowingRecord}
                  onSelectVideo={(video) => {
                    selectVideoAndOpenSubtitles(video);
                    window.scrollTo({ top: 220, behavior: "smooth" });
                  }}
                />
              </div>
            )}

            {/* 4. SEARCH & VIDEO LIBRARY GRID */}
            <VideoLibraryGrid
              videos={filteredVideos}
              activeVideoId={activeVideo?.id}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onSelectVideo={(video) => {
                selectVideoAndOpenSubtitles(video);
                window.scrollTo({ top: 220, behavior: "smooth" });
              }}
              onToggleFavorite={toggleFavorite}
              onRemoveVideo={removeVideo}
            />
          </>
        ) : (
          <SubtitleExportModal
            isOpen={showExportModal}
            onClose={() => setShowExportModal(false)}
            activeSubtitleResult={activeSubtitleResult}
            videoTitle={activeVideo?.title || "subtitles"}
            addToast={addToast}
          />
        )}
      </div>

      {/* MODALS */}
      <KeyboardShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />

      <SrtImportModal
        isOpen={showSrtImportModal}
        onClose={() => setShowSrtImportModal(false)}
        activeVideo={activeVideo}
        onImportSuccess={(parsed) => {
          if (!activeVideo) return;
          updateVideoSubtitles(activeVideo.id, parsed);
          setActiveVideo({ ...activeVideo, subtitles: parsed });
          resetPlayerSync();
          resetExercises();
          resetWordLookup();
          setRightPanelTab("subtitles");
          window.scrollTo({ top: 220, behavior: "smooth" });
        }}
        addToast={addToast}
      />

      <XpSubExtractorModal
        isOpen={showXpSubModal}
        onClose={() => setShowXpSubModal(false)}
        activeVideo={activeVideo}
        onInjectSubtitles={(parsed) => {
          if (!activeVideo) return;
          updateVideoSubtitles(activeVideo.id, parsed);
          setActiveVideo({ ...activeVideo, subtitles: parsed });
          resetPlayerSync();
          resetExercises();
          resetWordLookup();
          setRightPanelTab("subtitles");
          window.scrollTo({ top: 220, behavior: "smooth" });
        }}
        addToast={addToast}
      />
    </div>
  );
}
