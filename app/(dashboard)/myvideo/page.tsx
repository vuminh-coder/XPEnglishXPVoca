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
import { calculateCharacterWeightedWordIndex } from "@/features/listening/services/youtubeSubtitleParser";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useUserStore } from "@/stores/userStore";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { backgroundWebSpeechTranscriber } from "@/features/shadowing/services/webSpeechTranscriber";

import {
  Video,
  Plus,
  Clock,
  Sparkles,
  Volume2,
  BookmarkPlus,
  BookOpen,
  Mic,
  Headphones,
  Link as LinkIcon,
  Loader2,
  X,
  Brain,
  Layers,
  FileCode,
  Upload,
  ListOrdered,
  Star,
  Keyboard,
  HelpCircle,
} from "lucide-react";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

// Modular sub-components
import { VideoPlayerStudio } from "@/features/myvideo/components/VideoPlayerStudio";
import { InteractiveStudyDock } from "@/features/myvideo/components/InteractiveStudyDock";
import { VideoLibraryGrid } from "@/features/myvideo/components/VideoLibraryGrid";
import { KeyboardShortcutsModal } from "@/features/myvideo/components/modals/KeyboardShortcutsModal";
import { SubtitleExportModal } from "@/features/myvideo/components/modals/SubtitleExportModal";
import { SrtImportModal } from "@/features/myvideo/components/modals/SrtImportModal";
import { XpSubExtractorModal } from "@/features/myvideo/components/modals/XpSubExtractorModal";

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

  // Ref to YouTube Player IFrame for PostMessage controls
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const ytPlayerTimeRef = useRef<number>(0);
  const ytPlayerStateRef = useRef<number>(-1);
  const ytTimeLastUpdatedRef = useRef<number>(0);
  const ytListenerRegisteredRef = useRef<boolean>(false);

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

  // Playback States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoopingSentence, setIsLoopingSentence] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeSubIndex, setActiveSubIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [isCueSpeaking, setIsCueSpeaking] = useState<boolean>(false);
  const [subViewMode, setSubViewMode] = useState<"rolling" | "full">("rolling");
  const [loadedChunkCount, setLoadedChunkCount] = useState<number>(1);
  const [subtitleSyncOffset, setSubtitleSyncOffset] = useState<number>(0.0);

  // Word Lookup Popup State
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wordLookupData, setWordLookupData] = useState<{
    word: string;
    phonetic: string;
    pos: string;
    definitionVn: string;
  } | null>(null);

  // Dictation Exercise State
  const [currentSubIndex, setCurrentSubIndex] = useState(0);
  const [dictationInput, setDictationInput] = useState("");
  const [dictationAnswered, setDictationAnswered] = useState(false);
  const [dictationCorrect, setDictationCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Shadowing Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [shadowingScore, setShadowingScore] = useState<number | null>(null);
  const [waveformBars, setWaveformBars] = useState<number[]>([40, 65, 30, 85, 50, 95, 70, 45, 60]);
  const speechRecognitionRef = useRef<any>(null);
  const recordedTranscriptRef = useRef<string>("");

  // Refs for real-time 35ms loop
  const subtitleSyncOffsetRef = useRef(subtitleSyncOffset);
  useEffect(() => {
    subtitleSyncOffsetRef.current = subtitleSyncOffset;
  }, [subtitleSyncOffset]);

  const activeSubIndexRef = useRef(activeSubIndex);
  useEffect(() => {
    activeSubIndexRef.current = activeSubIndex;
  }, [activeSubIndex]);

  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const playbackSpeedRef = useRef(playbackSpeed);
  useEffect(() => {
    playbackSpeedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  const loadedChunkCountRef = useRef(loadedChunkCount);
  useEffect(() => {
    loadedChunkCountRef.current = loadedChunkCount;
  }, [loadedChunkCount]);

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

  // YouTube PostMessage command helper
  const sendYtCommand = useCallback((func: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    }
  }, []);

  const jumpToSubtitleIndex = useCallback(
    (index: number) => {
      if (!activeVideo || !activeVideo.subtitles[index]) return;
      const targetSub = activeVideo.subtitles[index];

      setCurrentSubIndex(index);
      setActiveSubIndex(index);
      setActiveWordIndex(0);

      setCurrentTime(targetSub.startTime);
      ytPlayerTimeRef.current = targetSub.startTime;
      ytTimeLastUpdatedRef.current = Date.now();

      sendYtCommand("seekTo", [targetSub.startTime, true]);
      sendYtCommand("playVideo");
      ytPlayerStateRef.current = 1;
      setIsPlaying(true);
    },
    [activeVideo, sendYtCommand]
  );

  const jumpToRandomSubtitle = useCallback(() => {
    if (!activeVideo || activeVideo.subtitles.length === 0) return;
    const randomIndex = Math.floor(Math.random() * activeVideo.subtitles.length);
    jumpToSubtitleIndex(randomIndex);
    addToast({
      type: "info",
      title: "Tráo câu ngẫu nhiên!",
      message: `Đã nhảy sang câu #${randomIndex + 1}/${activeVideo.subtitles.length} để luyện tập.`,
    });
  }, [activeVideo, jumpToSubtitleIndex, addToast]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      sendYtCommand("pauseVideo");
      ytPlayerStateRef.current = 2;
      setIsPlaying(false);
      ytTimeLastUpdatedRef.current = Date.now();
    } else {
      sendYtCommand("playVideo");
      ytPlayerStateRef.current = 1;
      setIsPlaying(true);
      ytTimeLastUpdatedRef.current = Date.now();
    }
  }, [isPlaying, sendYtCommand]);

  const changePlaybackSpeed = useCallback(
    (speed: number) => {
      setPlaybackSpeed(speed);
      sendYtCommand("setPlaybackRate", [speed]);
      ytTimeLastUpdatedRef.current = Date.now();
      addToast({
        type: "info",
        title: `Tốc độ: ${speed}x`,
        message: `Tốc độ phát video đã điều chỉnh sang ${speed}x`,
      });
    },
    [sendYtCommand, addToast]
  );

  // Helper to select video and reset player states
  const selectVideoAndOpenSubtitles = useCallback((video: YouTubeVideoItem) => {
    setActiveVideo(video);
    setRightPanelTab("subtitles");
    setActiveSubIndex(0);
    setCurrentSubIndex(0);
    setCurrentTime(0);
    ytPlayerTimeRef.current = 0;
    ytPlayerStateRef.current = -1;
    ytTimeLastUpdatedRef.current = 0;
    setActiveWordIndex(0);
    setLoadedChunkCount(1);
    setDictationInput("");
    setDictationAnswered(false);
    setDictationCorrect(null);
    setShowHint(false);
    setShadowingScore(null);
    setIsPlaying(false);
    setWordLookupData(null);
    setSelectedWord(null);
  }, []);

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
          setIsLoopingSentence((prev) => {
            const next = !prev;
            addToast({
              type: "info",
              title: next ? "Đã bật lặp câu!" : "Tắt lặp câu",
              message: next ? "Video sẽ tự động phát lặp lại câu hiện tại." : "Phát video bình thường.",
            });
            return next;
          });
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
          if (wordLookupData) {
            setWordLookupData(null);
            setSelectedWord(null);
          }
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
    jumpToRandomSubtitle,
    jumpToSubtitleIndex,
    addToast,
  ]);

  // YouTube postMessage handshake & state listener
  useEffect(() => {
    const parseYtState = (val: any): number | null => {
      if (typeof val === "number") return val;
      if (typeof val === "string" && !isNaN(Number(val))) return Number(val);
      if (val && typeof val.playerState === "number") return val.playerState;
      if (val && typeof val.playerState === "string" && !isNaN(Number(val.playerState)))
        return Number(val.playerState);
      return null;
    };

    const handleYTMessage = (event: MessageEvent) => {
      if (event.origin && !event.origin.includes("youtube")) return;

      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        const state = parseYtState(data.info) ?? parseYtState(data);
        if (state !== null) {
          ytPlayerStateRef.current = state;
          const ytPlaying = state === 1;
          isPlayingRef.current = ytPlaying;
          setIsPlaying(ytPlaying);
          if (ytPlaying) {
            ytTimeLastUpdatedRef.current = Date.now();
          }
        }

        if (data?.event === "infoDelivery" && data?.info) {
          if (typeof data.info.currentTime === "number") {
            ytPlayerTimeRef.current = data.info.currentTime;
            ytTimeLastUpdatedRef.current = Date.now();
            ytListenerRegisteredRef.current = true;
          }
        }
      } catch (e) {}
    };

    window.addEventListener("message", handleYTMessage);
    return () => window.removeEventListener("message", handleYTMessage);
  }, []);

  // Register YouTube listener with retry
  useEffect(() => {
    if (!iframeRef.current || !activeVideo) return;
    ytListenerRegisteredRef.current = false;
    let attempts = 0;
    const maxAttempts = 15;
    const tryRegister = () => {
      if (ytListenerRegisteredRef.current || attempts >= maxAttempts) return;
      attempts++;
      try {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "listening", id: "yt-player" }),
          "*"
        );
      } catch (e) {}
    };
    tryRegister();
    const retryInterval = setInterval(tryRegister, 300);
    return () => clearInterval(retryInterval);
  }, [activeVideo?.id]);

  // Real-time 35ms synchronization loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeVideo && activeVideo.subtitles.length > 0) {
      timer = setInterval(() => {
        if (iframeRef.current?.contentWindow) {
          try {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "getCurrentTime", args: [] }),
              "*"
            );
          } catch (e) {}
        }

        const realTime = ytPlayerTimeRef.current;
        const timeSinceUpdate = Date.now() - ytTimeLastUpdatedRef.current;
        const currentSpeed = playbackSpeedRef.current;

        setCurrentTime((prevTime) => {
          let nextTime: number;

          if (realTime > 0) {
            const isPlayingActive =
              isPlayingRef.current && ytPlayerStateRef.current !== 2 && ytPlayerStateRef.current !== 0;
            if (isPlayingActive && timeSinceUpdate < 350) {
              const elapsed = (timeSinceUpdate / 1000) * currentSpeed;
              nextTime = parseFloat((realTime + elapsed).toFixed(3));
            } else {
              nextTime = realTime;
            }
          } else {
            nextTime = prevTime;
          }

          // Loop sentence
          if (isLoopingSentence && activeVideo.subtitles[currentSubIndex]) {
            const loopCue = activeVideo.subtitles[currentSubIndex];
            if (nextTime >= loopCue.endTime - 0.15) {
              sendYtCommand("seekTo", [loopCue.startTime, true]);
              return loopCue.startTime;
            }
          }

          const effectiveTime = Math.max(
            0,
            parseFloat((nextTime + subtitleSyncOffsetRef.current).toFixed(3))
          );

          // Binary search O(log n)
          const subs = activeVideo.subtitles;
          let matchedIdx = -1;
          let isSpeakingNow = false;
          let lo = 0,
            hi = subs.length - 1;

          while (lo <= hi) {
            const mid = (lo + hi) >>> 1;
            if (effectiveTime >= subs[mid].startTime && effectiveTime < subs[mid].endTime) {
              matchedIdx = mid;
              isSpeakingNow = true;
              break;
            }
            if (effectiveTime < subs[mid].startTime) {
              hi = mid - 1;
            } else {
              lo = mid + 1;
            }
          }

          // Gap handling
          if (matchedIdx === -1) {
            const prevCue = lo > 0 ? subs[lo - 1] : null;
            const nextCue = lo < subs.length ? subs[lo] : null;

            if (prevCue && effectiveTime - prevCue.endTime < 0.15) {
              matchedIdx = lo - 1;
              isSpeakingNow = true;
            } else if (nextCue && nextCue.startTime - effectiveTime < 0.08) {
              matchedIdx = lo;
              isSpeakingNow = false;
            } else if (subs.length > 0 && effectiveTime < subs[0].startTime) {
              matchedIdx = 0;
              isSpeakingNow = false;
            } else if (lo < subs.length && lo >= 0) {
              matchedIdx = lo;
              isSpeakingNow = false;
            }
          }

          setIsCueSpeaking(isSpeakingNow);

          const currentSubIdx = activeSubIndexRef.current;
          if (matchedIdx !== -1 && matchedIdx !== currentSubIdx) {
            setActiveSubIndex(matchedIdx);
          }

          // Word-level karaoke highlighting
          const targetSub = subs[matchedIdx !== -1 ? matchedIdx : currentSubIdx];
          if (targetSub && isSpeakingNow) {
            if (targetSub.wordTimings && targetSub.wordTimings.length > 0) {
              let wordIdx = -1;
              for (let w = 0; w < targetSub.wordTimings.length; w++) {
                const wt = targetSub.wordTimings[w];
                if (effectiveTime >= wt.start && effectiveTime <= wt.end) {
                  wordIdx = w;
                  break;
                }
                if (effectiveTime > wt.end) {
                  wordIdx = w;
                }
              }
              setActiveWordIndex(wordIdx >= 0 ? wordIdx : 0);
            } else if (effectiveTime >= targetSub.startTime && effectiveTime <= targetSub.endTime) {
              const duration = Math.max(0.4, targetSub.endTime - targetSub.startTime);
              const elapsed = Math.max(0, Math.min(duration, effectiveTime - targetSub.startTime));
              const currentWordIdx = calculateCharacterWeightedWordIndex(
                targetSub.textEn,
                elapsed,
                duration
              );
              setActiveWordIndex(currentWordIdx);
            } else {
              setActiveWordIndex(-1);
            }
          } else {
            setActiveWordIndex(-1);
          }

          // Progressive chunk streaming
          const chunkCount = loadedChunkCountRef.current;
          if (matchedIdx >= chunkCount * 3 - 1 && chunkCount * 3 < activeVideo.subtitles.length) {
            setLoadedChunkCount((c) => c + 1);
          }

          return nextTime;
        });
      }, 35);
    }
    return () => clearInterval(timer);
  }, [activeVideo?.id, isLoopingSentence, currentSubIndex, sendYtCommand]);

  // Background Web Speech AI Transcriber
  useEffect(() => {
    if (!activeVideo || !isPlaying) {
      backgroundWebSpeechTranscriber.stop();
      return;
    }

    if (activeVideo.subtitles.length === 0) {
      backgroundWebSpeechTranscriber.start({
        getCurrentTimeSec: () => ytPlayerTimeRef.current,
        isPlaying: () => isPlayingRef.current,
        onSentenceCaptured: (rawItem) => {
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
        },
      });
    }

    return () => {
      backgroundWebSpeechTranscriber.stop();
    };
  }, [activeVideo?.id, activeVideo?.subtitles.length, isPlaying]);

  // Waveform animation during recording
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setWaveformBars(
          Array.from({ length: 9 }, () => Math.floor(Math.random() * 70) + 30)
        );
      }, 120);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

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
      setRightPanelTab("subtitles");
      setActiveSubIndex(0);
      setCurrentTime(0);
      ytPlayerTimeRef.current = 0;
      ytPlayerStateRef.current = -1;
      ytTimeLastUpdatedRef.current = 0;
      setActiveWordIndex(0);
      setLoadedChunkCount(1);
      setCurrentSubIndex(0);
      setDictationInput("");
      setDictationAnswered(false);
      setIsPlaying(false);

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

  // 1-Click Word Lookup
  const handleWordClick = async (word: string) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (!cleanWord) return;

    if (isPlaying) {
      sendYtCommand("pauseVideo");
      setIsPlaying(false);
      ytTimeLastUpdatedRef.current = Date.now();
    }

    setSelectedWord(cleanWord);
    setWordLookupData({
      word: cleanWord.toUpperCase(),
      phonetic: `/${cleanWord}/`,
      pos: "loading...",
      definitionVn: "Đang tra từ điển...",
    });

    speakLessonText(cleanWord, { lessonId: "video_subtitle_word", rate: 1.0 });

    try {
      const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
      if (dictRes.ok) {
        const dictData = await dictRes.json();
        if (Array.isArray(dictData) && dictData.length > 0) {
          const entry = dictData[0];
          const phonetic =
            entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text || `/${cleanWord}/`;
          const firstMeaning = entry.meanings?.[0];
          const pos = firstMeaning?.partOfSpeech || "word";
          const definition = firstMeaning?.definitions?.[0]?.definition || "";
          setWordLookupData({
            word: cleanWord.toUpperCase(),
            phonetic,
            pos,
            definitionVn: definition || `Từ vựng quan trọng trong ngữ cảnh video`,
          });
          return;
        }
      }
    } catch (e) {}

    setWordLookupData({
      word: cleanWord.toUpperCase(),
      phonetic: `/${cleanWord}/`,
      pos: "vocabulary",
      definitionVn: `Từ vựng xuất hiện trong video — nhấn 🔊 để nghe phát âm`,
    });
  };

  // Save Word to Notebook with direct sync to vocabularyStore & user profile
  const handleSaveWordToNotebook = () => {
    if (!wordLookupData) return;
    const wordLower = wordLookupData.word.toLowerCase();

    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("xp_voca_custom_notebook") || "[]";
        const parsed = JSON.parse(stored);
        if (parsed.some((w: any) => w.word === wordLower)) {
          addToast({
            type: "info",
            title: "Từ đã có trong Notebook!",
            message: `Từ "${wordLookupData.word}" đã được lưu trước đó rồi.`,
          });
          return;
        }
        parsed.push({
          word: wordLower,
          phonetic: wordLookupData.phonetic,
          pos: wordLookupData.pos,
          definitionVn: wordLookupData.definitionVn,
          savedAt: new Date().toISOString(),
        });
        localStorage.setItem("xp_voca_custom_notebook", JSON.stringify(parsed));
      } catch (e) {}
    }

    // Direct Sync with useVocabularyStore
    const currentLearned = useVocabularyStore.getState().learned;
    const userId = user?.id || "local_user";
    const existingIndex = currentLearned.findIndex(
      (l) => (l.word && l.word.toLowerCase() === wordLower) || l.vocabId === wordLower
    );

    if (existingIndex === -1) {
      const newLearnedItem = {
        userId,
        vocabId: wordLower,
        word: wordLower,
        phonetic: wordLookupData.phonetic,
        pos: wordLookupData.pos,
        definitionVn: wordLookupData.definitionVn,
        proficiency: 1,
        isFavorite: true,
        lastPracticed: new Date().toISOString(),
        nextReview: new Date().toISOString(),
      };
      const updatedList = [newLearnedItem, ...currentLearned];
      useVocabularyStore.setState({ learned: updatedList });

      if (typeof window !== "undefined") {
        localStorage.setItem(`xp_voca_learned_${userId}`, JSON.stringify(updatedList));
      }

      // Increment words learned in userStore
      const currentCount = (useUserStore.getState().user?.wordsLearned || 0) + 1;
      useUserStore.setState({
        user: { ...useUserStore.getState().user!, wordsLearned: currentCount },
      });
    }

    awardXp(5);
    addToast({
      type: "success",
      title: "Đã lưu vào Sổ Từ! (+5 XP)",
      message: `Từ "${wordLookupData.word}" đã được đồng bộ vào sổ từ cá nhân (/myvocab).`,
    });
  };

  // Dictation Check Answer
  const handleCheckDictation = () => {
    if (!activeVideo || dictationAnswered) return;
    const currentSub = activeVideo.subtitles[currentSubIndex];
    if (!currentSub) return;

    const userClean = dictationInput.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetClean = currentSub.dictationWord.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const isRight = userClean === targetClean;

    setDictationAnswered(true);
    setDictationCorrect(isRight);

    if (isRight) {
      awardXp(20);
      const newProgress = Math.round(((currentSubIndex + 1) / activeVideo.subtitles.length) * 100);
      updateProgress(activeVideo.id, newProgress);
      addToast({
        type: "success",
        title: "Chính xác! +20 XP",
        message: `Bạn đã nghe đúng từ "${currentSub.dictationWord}"!`,
      });
    }
  };

  const handleNextDictation = () => {
    if (!activeVideo) return;
    const nextIdx = currentSubIndex + 1;
    if (nextIdx < activeVideo.subtitles.length) {
      setDictationInput("");
      setDictationAnswered(false);
      setDictationCorrect(null);
      setShowHint(false);
      jumpToSubtitleIndex(nextIdx);
    } else {
      updateProgress(activeVideo.id, 100);
      addToast({
        type: "success",
        title: "Hoàn thành Dictation!",
        message: "Bạn đã hoàn thành toàn bộ bài chép chính tả cho video này!",
      });
    }
  };

  // Shadowing Toggle
  const toggleShadowingRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch (e) {}
        speechRecognitionRef.current = null;
      }

      const targetSentence =
        activeVideo?.subtitles[activeSubIndex]?.textEn ||
        activeVideo?.subtitles[currentSubIndex]?.textEn ||
        "";

      const spoken = recordedTranscriptRef.current.trim();
      if (!spoken) {
        setShadowingScore(null);
        addToast({
          type: "warning",
          title: "Chưa ghi nhận giọng nói",
          message: "Hệ thống chưa nghe rõ giọng của bạn. Vui lòng đọc to hơn!",
        });
        return;
      }

      const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
      const cleanTarget = targetSentence.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
      const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);
      const targetWords = cleanTarget.split(/\s+/).filter(Boolean);

      let matchedCount = 0;
      for (const sw of spokenWords) {
        if (targetWords.includes(sw)) matchedCount++;
      }

      const wordAccuracy = targetWords.length > 0 ? matchedCount / targetWords.length : 0;
      const lengthRatio =
        targetWords.length > 0
          ? Math.max(0, 1 - Math.abs(spokenWords.length - targetWords.length) / targetWords.length)
          : 0;

      const calculatedScore = Math.min(
        100,
        Math.max(25, Math.round((wordAccuracy * 0.7 + lengthRatio * 0.3) * 100))
      );

      setShadowingScore(calculatedScore);
      const xpEarned = calculatedScore >= 70 ? 15 : 5;
      awardXp(xpEarned);
      addToast({
        type: calculatedScore >= 70 ? "success" : "info",
        title: `Phát âm đạt ${calculatedScore}%! (+${xpEarned} XP)`,
        message: `Bạn vừa đọc: "${spoken}". ${
          calculatedScore >= 70 ? "Rất chuẩn xác!" : "Hãy luyện tập thêm để đọc mượt hơn!"
        }`,
      });
    } else {
      recordedTranscriptRef.current = "";
      setShadowingScore(null);

      if (typeof window !== "undefined") {
        const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (SpeechRec) {
          try {
            const rec = new SpeechRec();
            rec.lang = "en-US";
            rec.continuous = true;
            rec.interimResults = true;
            rec.onresult = (event: any) => {
              let finalTranscript = "";
              for (let i = 0; i < event.results.length; i++) {
                finalTranscript += event.results[i][0].transcript + " ";
              }
              recordedTranscriptRef.current = finalTranscript.trim();
            };
            rec.start();
            speechRecognitionRef.current = rec;
          } catch (e) {}
        }
      }

      setIsRecording(true);
    }
  };

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

  return (
    <div className="w-full min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col font-sans select-none pb-24 md:pb-12">
      {/* 0. UNIVERSAL 56PX (h-14) TOP ACTION & NAVIGATION HEADER BAR */}
      <AppTopHeader
        hideThemeAndAvatarOnDesktop={true}
        rightDesktopContent={
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowShortcutsModal(true)}
              className="h-8 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Xem danh sách phím tắt học nhanh (Phím ?)"
            >
              <Keyboard className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Phím tắt</span>
              <kbd className="hidden sm:inline-block px-1 py-0.2 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-[9px]">
                ?
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setShowSrtImportModal(true)}
              className="h-8 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Nhập file phụ đề .SRT hoặc .VTT"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Nhập SRT</span>
            </button>

            {activeVideo && (
              <button
                type="button"
                onClick={() => setShowXpSubModal(true)}
                className="h-8 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/25 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Trích xuất phụ đề thông minh bằng XP-Sub AI Engine"
              >
                <Sparkles className="w-3.5 h-3.5 fill-purple-500/40 text-purple-600 dark:text-purple-400" />
                <span>XP-Sub AI Engine</span>
              </button>
            )}

            {activeSubtitleResult && (
              <button
                type="button"
                onClick={() => setShowExportModal(true)}
                className="h-8 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Xem báo cáo và tải file phụ đề song ngữ"
              >
                <FileCode className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Xuất Subtitles</span>
              </button>
            )}
          </div>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active
            icon={<Video className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
            label="Video của tôi"
          />
          <HeaderPillItem
            href="/study/listening"
            icon={<Headphones className="w-3.5 h-3.5 text-indigo-500" />}
            label="Dictation"
          />
          <HeaderPillItem
            href="/study/shadowing"
            icon={<Mic className="w-3.5 h-3.5 text-sky-500" />}
            label="Shadowing"
          />
          <HeaderPillItem
            href="/vocabulary"
            icon={<ListOrdered className="w-3.5 h-3.5 text-emerald-500" />}
            label="Danh sách từ"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* MAIN DASHBOARD CANVAS */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 sm:py-6 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        {!showExportModal ? (
          <>
            {/* 1. HERO SPOTLIGHT & 4 MICRO-METRIC DOUBLE-BEZEL CARDS */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 flex items-center gap-1.5 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>YOUTUBE VIDEO & AUDIO STUDIO</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold font-mono border border-slate-200/70 dark:border-slate-700/60">
                      Chuẩn 12 Tiêu Chí · Phụ đề 1-Click · Dictation AI
                    </span>
                  </div>
                  <h1 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
                    Thư Viện Video & Phòng Luyện Nghe Tương Tác
                  </h1>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Dán link YouTube bất kỳ để học tương tác với phụ đề song ngữ, tra từ 1-click và luyện nói Shadowing AI!
                  </p>
                </div>

                {/* Quick Action Buttons (Mobile fallback) */}
                <div className="lg:hidden flex items-center gap-2 shrink-0 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setShowShortcutsModal(true)}
                    className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 border border-slate-200/70 dark:border-slate-700/60"
                  >
                    <Keyboard className="w-3.5 h-3.5 text-slate-500" />
                    <span>Phím tắt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSrtImportModal(true)}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95 border border-slate-200/70 dark:border-slate-700/60"
                  >
                    <Upload className="w-4 h-4 text-slate-500" />
                    <span>Nhập SRT</span>
                  </button>
                </div>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

              {/* 4 Metric Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-amber-300 dark:hover:border-amber-800/60 shadow-2xs group">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Video className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                      {savedVideos.length}{" "}
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">video</span>
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      Bộ sưu tập bài học
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-sky-300 dark:hover:border-sky-800/60 shadow-2xs group">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Clock className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                      {totalMinutes}{" "}
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">phút</span>
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      Thời lượng video
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-emerald-300 dark:hover:border-emerald-800/60 shadow-2xs group">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Layers className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                      {totalSubtitlesCount}{" "}
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans">câu</span>
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      Phụ đề tương tác
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 transition-all hover:border-blue-300 dark:hover:border-blue-800/60 shadow-2xs group">
                  <div className="w-10 h-10 rounded-lg bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Star className="w-5 h-5 stroke-[2.2] fill-amber-400 text-amber-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <div className="text-base sm:text-lg font-black font-display text-slate-900 dark:text-white tabular-nums truncate">
                        {favoriteCount}{" "}
                        <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 font-sans">yêu thích</span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded-md bg-blue-100 dark:bg-blue-950 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-[9.5px] shrink-0">
                        {avgProgress}%
                      </span>
                    </div>
                    <div className="w-full mt-0.5">
                      <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#0059bb] via-indigo-600 to-sky-400 transition-all duration-500"
                          style={{ width: `${avgProgress}%` }}
                        />
                      </div>
                      <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        Tiến độ hoàn thành trung bình
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. YOUTUBE IMPORT STUDIO DECK (WITH UI/UX RULE 6 EXTERNAL LABEL & RULE 1 SKELETON PREVIEW) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40">
                    1-CLICK IMPORT
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-1.5">
                    <LinkIcon className="w-4 h-4 text-[#0059bb]" />
                    Trích xuất phụ đề YouTube tự động
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-slate-400 hidden sm:block">
                  Hỗ trợ phụ đề Song Ngữ Anh - Việt & Tra từ thông minh
                </span>
              </div>

              <form onSubmit={handleImportYouTube} className="space-y-3">
                {/* External Label (UI/UX Rule 6) */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="youtube-url-input"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display"
                  >
                    <span>Đường dẫn video YouTube cần học:</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <input
                        id="youtube-url-input"
                        type="url"
                        value={youtubeInput}
                        onChange={(e) => {
                          setYoutubeInput(e.target.value);
                          setImportError(null);
                        }}
                        placeholder="Dán link YouTube (VD: https://www.youtube.com/watch?v=gN78u1P3j9Y)..."
                        className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:border-[#0059bb] focus:ring-1 focus:ring-[#0059bb] focus:outline-hidden transition-all pr-8"
                      />
                      {youtubeInput && (
                        <button
                          type="button"
                          onClick={() => setYoutubeInput("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isImporting || !youtubeInput.trim()}
                      className="py-2.5 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004899] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-[#0059bb]/20 flex items-center justify-center gap-2 cursor-pointer font-sans shrink-0 active:scale-95"
                    >
                      {isImporting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Đang tải phụ đề...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                          <span>Nhập Video YouTube</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Category & Level Selectors */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-400">Phân loại:</span>
                    <select
                      value={importCategory}
                      onChange={(e) => setImportCategory(e.target.value as any)}
                      className="py-1 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-hidden"
                    >
                      <option value="Communication">Giao tiếp (Communication)</option>
                      <option value="Business">Kinh doanh (Business)</option>
                      <option value="TED Talks">TED Talks</option>
                      <option value="Movies">Phim ảnh (Movies)</option>
                      <option value="News">Tin tức (News)</option>
                      <option value="IELTS/TOEIC">IELTS/TOEIC</option>
                      <option value="General">Tổng hợp (General)</option>
                    </select>

                    <select
                      value={importLevel}
                      onChange={(e) => setImportLevel(e.target.value as any)}
                      className="py-1 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-hidden"
                    >
                      <option value="Easy">Dễ (Easy)</option>
                      <option value="Medium">Trung bình (Medium)</option>
                      <option value="Hard">Khó (Hard)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeVideo && (
                      <button
                        type="button"
                        onClick={() => setShowXpSubModal(true)}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/25 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs"
                        title="Mở bảng điều khiển trích xuất phụ đề thông minh"
                      >
                        <Sparkles className="w-3.5 h-3.5 fill-purple-500/40 text-purple-600 dark:text-purple-400" />
                        <span>XP-Sub AI Engine</span>
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Skeleton Loading Card Preview (UI/UX Rule 1) */}
              {isImporting && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-blue-200 dark:border-blue-900/50 space-y-3 animate-pulse">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Đang kết nối YouTube Server & Trích xuất phụ đề song ngữ chuẩn mili-giây...
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Vui lòng chờ giây lát</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-lg sm:col-span-1" />
                    <div className="space-y-2 sm:col-span-3">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                      <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-1/2" />
                      <div className="h-2 bg-slate-100 dark:bg-slate-800/60 rounded w-1/4" />
                    </div>
                  </div>
                </div>
              )}

              {importError && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}
            </div>

            {/* 3. MASTER-DETAIL 2-COLUMN SPLIT WORKSPACE (BENTO GRID TỶ LỆ VÀNG 1.62fr : 1fr) */}
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
                  toggleLoopSentence={() => {
                    setIsLoopingSentence(!isLoopingSentence);
                    addToast({
                      type: "info",
                      title: !isLoopingSentence ? "Đã bật lặp câu!" : "Tắt lặp câu",
                      message: !isLoopingSentence
                        ? "Video sẽ tự động phát lặp lại câu hiện tại."
                        : "Phát video bình thường.",
                    });
                  }}
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
                  handleSeekTo={(seconds, index) => jumpToSubtitleIndex(index)}
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
          setActiveSubIndex(0);
          setCurrentTime(0);
          setActiveWordIndex(0);
          setLoadedChunkCount(1);
          setCurrentSubIndex(0);
          setDictationInput("");
          setDictationAnswered(false);
          setDictationCorrect(null);
          setShowHint(false);
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
          setActiveSubIndex(0);
          setCurrentTime(0);
          setActiveWordIndex(0);
          setLoadedChunkCount(1);
          setCurrentSubIndex(0);
          setDictationInput("");
          setDictationAnswered(false);
          setDictationCorrect(null);
          setShowHint(false);
          setRightPanelTab("subtitles");
          window.scrollTo({ top: 220, behavior: "smooth" });
        }}
        addToast={addToast}
      />
    </div>
  );
}
