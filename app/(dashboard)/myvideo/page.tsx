"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  useVideoStore,
  YouTubeVideoItem,
  extractYouTubeId,
  SubtitleSentence,
} from "@/stores/videoStore";
import {
  processHighPrecisionSubtitles,
  getLastFetchedVideoMeta,
} from "@/features/listening/services/youtubeSubtitleService";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { AppTopHeader } from "@/shared/components/layout/AppTopHeader";
import { Video, Layers, Play } from "lucide-react";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";

// Modular Feature Components & Hooks
import {
  VideoPlayerStudio,
  InteractiveStudyDock,
  VideoLibraryGrid,
  YouTubeImportDeck,
  SrtImportModal,
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
  const [isRescueSrtOpen, setIsRescueSrtOpen] = useState(false);
  const playerWorkspaceRef = useRef<HTMLDivElement>(null);

  // Master Video Player State with Frame 0 session probe
  const [activeVideo, setActiveVideoState] = useState<YouTubeVideoItem | null>(() => {
    const { session, savedVideos } = useVideoStore.getState();
    if (session.activeVideoId) {
      const found = savedVideos.find((v) => v.id === session.activeVideoId);
      if (found) return found;
    }
    return savedVideos.length > 0 ? savedVideos[0] : null;
  });

  const setActiveVideo = useCallback(
    (videoOrUpdater: YouTubeVideoItem | null | ((prev: YouTubeVideoItem | null) => YouTubeVideoItem | null)) => {
      setActiveVideoState((prev) => {
        const next = typeof videoOrUpdater === "function" ? videoOrUpdater(prev) : videoOrUpdater;
        useVideoStore.getState().setSession({ activeVideoId: next?.id || null });
        return next;
      });
    },
    []
  );

  const [rightPanelTab, setRightPanelTabState] = useState<"subtitles" | "dictation">(() => {
    const saved = useVideoStore.getState().session.rightPanelTab;
    return saved === "dictation" ? "dictation" : "subtitles";
  });

  const setRightPanelTab = useCallback((tab: "subtitles" | "dictation") => {
    setRightPanelTabState(tab);
    useVideoStore.getState().setSession({ rightPanelTab: tab });
  }, []);

  const [subViewMode, setSubViewModeState] = useState<"rolling" | "full">(() => {
    return useVideoStore.getState().session.subViewMode || "rolling";
  });

  const setSubViewMode = useCallback((mode: "rolling" | "full") => {
    setSubViewModeState(mode);
    useVideoStore.getState().setSession({ subViewMode: mode });
  }, []);

  // Search & Filter state with Frame 0 session probe
  const [searchQuery, setSearchQueryState] = useState<string>(() => {
    return useVideoStore.getState().session.searchQuery || "";
  });

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    useVideoStore.getState().setSession({ searchQuery: query });
  }, []);

  const [selectedCategory, setSelectedCategoryState] = useState<string>(() => {
    return useVideoStore.getState().session.selectedCategory || "Tất cả";
  });

  const setSelectedCategory = useCallback((category: string) => {
    setSelectedCategoryState(category);
    useVideoStore.getState().setSession({ selectedCategory: category });
  }, []);

  const [selectedFilter, setSelectedFilterState] = useState<"all" | "learning" | "done" | "favorite">(() => {
    return useVideoStore.getState().session.selectedFilter || "all";
  });

  const setSelectedFilter = useCallback((filter: "all" | "learning" | "done" | "favorite") => {
    setSelectedFilterState(filter);
    useVideoStore.getState().setSession({ selectedFilter: filter });
  }, []);

  // Mobile View Mode Switcher state: "player" (focus study) vs "library" (browse & manage)
  const [mobileViewMode, setMobileViewMode] = useState<"player" | "library">("player");

  // Track study time when a video is actively loaded
  useStudyTimeTracker("dictation", { activeCondition: activeVideo !== null });

  // Load saved videos on mount & sync initial activeVideo after hydration
  useEffect(() => {
    loadSavedVideos();
    const { session, savedVideos: loadedVideos } = useVideoStore.getState();
    if (loadedVideos.length > 0) {
      if (session.activeVideoId) {
        const found = loadedVideos.find((v) => v.id === session.activeVideoId);
        if (found) setActiveVideoState(found);
      } else {
        setActiveVideo(loadedVideos[0]);
      }
    }
  }, [loadSavedVideos, setActiveVideo]);

  // Sync activeVideo with store changes (BUG-02 fix: depend only on savedVideos)
  const activeVideoIdRef = useRef(activeVideo?.id);
  useEffect(() => {
    activeVideoIdRef.current = activeVideo?.id;
  });
  useEffect(() => {
    const currentId = activeVideoIdRef.current;
    if (currentId) {
      const updatedVideo = savedVideos.find((v) => v.id === currentId);
      if (updatedVideo) {
        setActiveVideo((prev) => {
          if (!prev || prev.id !== currentId) return prev;
          if (
            updatedVideo.isFavorite !== prev.isFavorite ||
            updatedVideo.progressPercent !== prev.progressPercent ||
            updatedVideo.subtitles !== prev.subtitles
          ) {
            return updatedVideo;
          }
          return prev; // No change → no re-render
        });
      }
    }
  }, [savedVideos, setActiveVideo]);

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
  }, [setActiveVideo]);

  // Hook 1: YouTube Player Synchronization Loop & Commands
  const setCurrentSubIndexRef = useRef<((index: number) => void) | null>(null);
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
    togglePlayPause,
    pauseVideo,
    jumpToSubtitleIndex,
    jumpToRandomSubtitle,
    resetPlayerSync,
  } = useYouTubePlayerSync({
    activeVideo,
    onSubIndexChange: (index) => setCurrentSubIndexRef.current?.(index),
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

  // Sync ref for onSubIndexChange callback without hoisting issue
  useEffect(() => {
    setCurrentSubIndexRef.current = setCurrentSubIndex;
  }, [setCurrentSubIndex]);

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
    [setActiveVideo, setRightPanelTab, resetPlayerSync, resetExercises, resetWordLookup]
  );

  const jumpToPrevSubtitle = useCallback(() => {
    const currentIdx = activeSubIndex >= 0 ? activeSubIndex : currentSubIndex;
    jumpToSubtitleIndex(Math.max(0, currentIdx - 1));
  }, [activeSubIndex, currentSubIndex, jumpToSubtitleIndex]);

  const jumpToNextSubtitle = useCallback(() => {
    if (!activeVideo) return;
    const currentIdx = activeSubIndex >= 0 ? activeSubIndex : currentSubIndex;
    jumpToSubtitleIndex(Math.min(activeVideo.subtitles.length - 1, currentIdx + 1));
  }, [activeVideo, activeSubIndex, currentSubIndex, jumpToSubtitleIndex]);

  const handleDeleteVideo = useCallback(
    (id: string) => {
      const nextVideos = savedVideos.filter((v) => v.id !== id);
      removeVideo(id);
      if (nextVideos.length > 0) {
        selectVideoAndOpenSubtitles(nextVideos[0]);
      } else {
        setActiveVideo(null);
      }
    },
    [savedVideos, removeVideo, selectVideoAndOpenSubtitles, setActiveVideo]
  );

  const handleSelectVideoWithScroll = useCallback(
    (video: YouTubeVideoItem) => {
      selectVideoAndOpenSubtitles(video);
      setMobileViewMode("player");
      setTimeout(() => {
        if (playerWorkspaceRef.current) {
          playerWorkspaceRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 40);
    },
    [selectVideoAndOpenSubtitles]
  );

  // Keyboard shortcuts listener — ref pattern to mount window listener once (HIGH-04 fix)
  const keyboardStateRef = useRef({
    activeVideo,
    activeSubIndex,
    currentSubIndex,
    dictationAnswered,
    dictationInput,
    rightPanelTab,
    wordLookupData,
    togglePlayPause,
    toggleLoopSentence,
    jumpToRandomSubtitle,
    jumpToSubtitleIndex,
    handleCheckDictation,
    handleNextDictation,
    resetWordLookup,
  });

  useEffect(() => {
    keyboardStateRef.current = {
      activeVideo,
      activeSubIndex,
      currentSubIndex,
      dictationAnswered,
      dictationInput,
      rightPanelTab,
      wordLookupData,
      togglePlayPause,
      toggleLoopSentence,
      jumpToRandomSubtitle,
      jumpToSubtitleIndex,
      handleCheckDictation,
      handleNextDictation,
      resetWordLookup,
    };
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = keyboardStateRef.current;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        return;
      }

      if (e.key === "Enter" && state.rightPanelTab === "dictation" && state.dictationAnswered) {
        e.preventDefault();
        state.handleNextDictation();
        return;
      }

      switch (e.key) {
        case " ":
          e.preventDefault();
          state.togglePlayPause();
          break;
        case "r":
        case "R":
          e.preventDefault();
          state.toggleLoopSentence();
          break;
        case "s":
        case "S":
          e.preventDefault();
          state.jumpToRandomSubtitle();
          break;
        case "ArrowLeft":
        case "j":
        case "J": {
          e.preventDefault();
          const cur = state.activeSubIndex >= 0 ? state.activeSubIndex : state.currentSubIndex;
          state.jumpToSubtitleIndex(Math.max(0, cur - 1));
          break;
        }
        case "ArrowRight":
        case "l":
        case "L": {
          e.preventDefault();
          if (state.activeVideo) {
            const cur = state.activeSubIndex >= 0 ? state.activeSubIndex : state.currentSubIndex;
            state.jumpToSubtitleIndex(Math.min(state.activeVideo.subtitles.length - 1, cur + 1));
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
        case "Escape":
          if (state.wordLookupData) state.resetWordLookup();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setRightPanelTab]);

  // Handle YouTube URL Import (memoized — MED-04 fix)
  const handleImportYouTube = useCallback(
    async (e: React.FormEvent) => {
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
            "Không tìm thấy dữ liệu phụ đề cho video YouTube này. Vui lòng thử video khác có sẵn phụ đề."
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
        resetPlayerSync();
        resetExercises();
        resetWordLookup();
        setRightPanelTab("subtitles");

        setTimeout(() => {
          playerWorkspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 40);

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
    },
    [
      youtubeInput,
      savedVideos,
      importCategory,
      importLevel,
      addVideo,
      setActiveVideo,
      setRightPanelTab,
      resetPlayerSync,
      resetExercises,
      resetWordLookup,
      addToast,
    ]
  );

  // Rescue fallback: add video shell with empty subtitles so learner can import .SRT / .VTT directly
  const handleRescueShellImport = useCallback(async () => {
    const videoId = extractYouTubeId(youtubeInput);
    if (!videoId) return;

    const existing = savedVideos.find((v) => v.id === videoId);
    if (existing) {
      setActiveVideo(existing);
      setImportError(null);
      setIsRescueSrtOpen(true);
      return;
    }

    let title = `Video YouTube (${videoId})`;
    let authorName = "YouTube Creator";
    try {
      const serverMeta = getLastFetchedVideoMeta();
      if (serverMeta?.title) title = serverMeta.title;
      if (serverMeta?.authorName) authorName = serverMeta.authorName;
    } catch {}

    const shellVideo: YouTubeVideoItem = {
      id: videoId,
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      title,
      authorName,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      duration: "03:00",
      category: importCategory,
      level: importLevel,
      savedAt: new Date().toISOString().split("T")[0],
      progressPercent: 0,
      isFavorite: false,
      subtitles: [],
    };

    addVideo(shellVideo);
    setActiveVideo(shellVideo);
    setYoutubeInput("");
    setImportError(null);
    setIsRescueSrtOpen(true);
  }, [
    youtubeInput,
    savedVideos,
    importCategory,
    importLevel,
    addVideo,
    setActiveVideo,
  ]);

  // Filtered Video List (memoized — MED-02 fix)
  const filteredVideos = useMemo(() => {
    return savedVideos.filter((v) => {
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
  }, [savedVideos, searchQuery, selectedCategory, selectedFilter]);

  return (
    <div className="w-full min-h-screen bg-[#fffefb] dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12">
      {/* 0. MOBILE-ONLY 56PX (h-14) TOP HEADER BAR (Hidden on Desktop lg:hidden) */}
      <AppTopHeader
        className="lg:hidden"
        showGamificationStats={false}
        hideMobileSearch={false}
        searchProps={{
          value: searchQuery,
          onChange: setSearchQuery,
          placeholder: "Tìm video hoặc kênh...",
          onClear: () => setSearchQuery(""),
          hideDesktopInput: true,
        }}
      />

      {/* MAIN DASHBOARD CANVAS */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-2.5 sm:py-3.5 pb-24 sm:pb-8 space-y-3 sm:space-y-4">
        {/* MOBILE VIEW MODE SEGMENTED CONTROL (lg:hidden - Rule 14 & 20) */}
        {activeVideo && (
          <div className="lg:hidden p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 grid grid-cols-2 gap-1 select-none shadow-2xs">
            <button
              type="button"
              onClick={() => setMobileViewMode("player")}
              className={`py-2 px-3 rounded-lg text-xs font-bold font-display transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileViewMode === "player"
                  ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Video className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
              <span>Phòng Học</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileViewMode("library")}
              className={`py-2 px-3 rounded-lg text-xs font-bold font-display transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileViewMode === "library"
                  ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Thư Viện</span>
            </button>
          </div>
        )}

        {/* 1. YOUTUBE IMPORT STUDIO DECK */}
        <div className={activeVideo && mobileViewMode === "player" ? "hidden lg:block" : ""}>
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
            onImport={handleImportYouTube}
            hasActiveVideo={Boolean(activeVideo)}
            onRescueShellImport={extractYouTubeId(youtubeInput) ? handleRescueShellImport : undefined}
          />
        </div>

        {/* 2. MASTER-DETAIL 2-COLUMN SPLIT WORKSPACE */}
        {activeVideo && (
          <div
            ref={playerWorkspaceRef}
            className={`${
              mobileViewMode === "library" ? "hidden lg:grid " : "grid "
            }grid-cols-1 lg:grid-cols-[1.62fr_1fr] gap-4 sm:gap-5 items-stretch scroll-mt-4`}
          >
            {/* CỘT TRÁI (1.62fr): VIDEO PLAYER STUDIO */}
            <VideoPlayerStudio
              activeVideo={activeVideo}
              iframeRef={iframeRef}
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
              jumpToRandomSubtitle={jumpToRandomSubtitle}
              jumpToPrevSubtitle={jumpToPrevSubtitle}
              jumpToNextSubtitle={jumpToNextSubtitle}
              isLoopingSentence={isLoopingSentence}
              toggleLoopSentence={toggleLoopSentence}
              playbackSpeed={playbackSpeed}
              changePlaybackSpeed={changePlaybackSpeed}
              toggleFavorite={toggleFavorite}
              onDeleteVideo={handleDeleteVideo}
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
            />
          </div>
        )}

        {/* 3. SEARCH & VIDEO LIBRARY GRID */}
        <div className={activeVideo && mobileViewMode === "player" ? "hidden lg:block" : "space-y-3"}>
          {activeVideo && mobileViewMode === "library" && (
            <div className="lg:hidden pb-1">
              <button
                type="button"
                onClick={() => {
                  setMobileViewMode("player");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#0059bb] dark:text-sky-400 text-xs font-bold flex items-center justify-between cursor-pointer active:scale-98 transition-all"
              >
                <div className="flex items-center gap-2 truncate">
                  <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span className="truncate">Đang học: {activeVideo.title}</span>
                </div>
                <span className="text-xs font-semibold shrink-0 ml-2">Quay lại phòng học →</span>
              </button>
            </div>
          )}
          <VideoLibraryGrid
            videos={filteredVideos}
            activeVideoId={activeVideo?.id}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectVideo={handleSelectVideoWithScroll}
            onToggleFavorite={toggleFavorite}
            onRemoveVideo={removeVideo}
          />
        </div>
      </div>

      {/* Rescue SRT Import Modal when YouTube auto-captions fail */}
      <SrtImportModal
        isOpen={isRescueSrtOpen}
        onClose={() => setIsRescueSrtOpen(false)}
        activeVideo={activeVideo}
        onImportSuccess={(subs: SubtitleSentence[]) => {
          if (!activeVideo) return;
          updateVideoSubtitles(activeVideo.id, subs);
          setActiveVideo({ ...activeVideo, subtitles: subs });
          setRightPanelTab("subtitles");
        }}
        addToast={addToast}
      />
    </div>
  );
}
