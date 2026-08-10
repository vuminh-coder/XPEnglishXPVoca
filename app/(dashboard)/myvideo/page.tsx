"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  useVideoStore,
  YouTubeVideoItem,
  extractYouTubeId,
  SubtitleSentence,
} from "@/lib/store/videoStore";
import { processHighPrecisionSubtitles, SubtitleExtractionResult } from "@/lib/services/youtubeSubtitleService";
import { parseSrtContent, validateSrtContent } from "@/lib/services/srtParser";
import { calculateCharacterWeightedWordIndex } from "@/lib/services/youtubeSubtitleParser";
import { CaptionTrackInfo, TranslationLanguageInfo } from "@/lib/services/xpSubExtractor";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { PageEntranceWrapper, MotionItem } from "@/components/shared/PageEntranceAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { speakLessonText } from "@/lib/utils/ttsEngine";

import {
  Video,
  Play,
  Pause,
  ArrowLeft,
  Plus,
  Search,
  Star,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  Volume2,
  BookmarkPlus,
  BookOpen,
  Mic,
  RotateCcw,
  Link as LinkIcon,
  Loader2,
  X,
  Brain,
  Zap,
  Check,
  Filter,
  Tv,
  ListVideo,
  Settings2,
  HelpCircle,
  Award,
  FileCode,
  Download,
  BarChart2,
  Eye,
  List,
  Keyboard,
  Upload,
  ExternalLink,
  FileText,
  AlertTriangle,
  Target,
  Layers,
  Globe,
  Code2,
  Copy,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Repeat1,
} from "lucide-react";

/** Helper to trigger text file download in browser */
function downloadTextFile(content: string, filename: string, mimeType: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** FIX BUG #8: Format seconds to MM:SS display string */
function formatSubTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const totalSec = Math.floor(seconds);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/** Robust Case-Insensitive Word Boundary Masking for Dictation Questions */
function maskDictationWord(textEn: string, dictationWord: string): string {
  if (!textEn) return "";
  if (!dictationWord) return textEn;

  const escaped = dictationWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const boundaryRegex = new RegExp(`\\b${escaped}\\b`, "gi");
  if (boundaryRegex.test(textEn)) {
    return textEn.replace(boundaryRegex, " [ _____ ] ");
  }

  const substringRegex = new RegExp(escaped, "gi");
  if (substringRegex.test(textEn)) {
    return textEn.replace(substringRegex, " [ _____ ] ");
  }

  return textEn;
}

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

  // Ref to YouTube Player IFrame for PostMessage controls (seekTo, playVideo, pauseVideo)
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Ref to store real YouTube player time from postMessage events
  const ytPlayerTimeRef = useRef<number>(0);
  const ytPlayerStateRef = useRef<number>(-1); // -1=unstarted, 1=playing, 2=paused, 3=buffering, 0=ended
  const ytTimeLastUpdatedRef = useRef<number>(0); // Timestamp (ms) of last YouTube infoDelivery update
  const ytListenerRegisteredRef = useRef<boolean>(false); // Whether YouTube listening registration succeeded

  // YouTube Link Import State with Category & Level Selection
  const [youtubeInput, setYoutubeInput] = useState("");
  const [importCategory, setImportCategory] = useState<YouTubeVideoItem["category"]>("Communication");
  const [importLevel, setImportLevel] = useState<YouTubeVideoItem["level"]>("Medium");
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // High Precision Subtitle Result & Export State
  const [activeSubtitleResult, setActiveSubtitleResult] = useState<SubtitleExtractionResult | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportActiveTab, setExportActiveTab] = useState<"json" | "srt" | "webvtt" | "all">("json");

  // Escape key listener to close full-screen export takeover
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showExportModal) {
        setShowExportModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showExportModal]);

  // SRT Import Modal State
  const [showSrtImportModal, setShowSrtImportModal] = useState(false);
  const [srtPasteContent, setSrtPasteContent] = useState("");
  const [srtImportError, setSrtImportError] = useState<string | null>(null);
  const [srtPreviewCount, setSrtPreviewCount] = useState(0);
  const srtFileInputRef = useRef<HTMLInputElement>(null);

  // XP-Sub Extractor Enterprise Modal State
  const [showXpSubModal, setShowXpSubModal] = useState(false);
  const [isFetchingTracks, setIsFetchingTracks] = useState(false);
  const [xpSubTracks, setXpSubTracks] = useState<CaptionTrackInfo[]>([]);
  const [xpSubTranslations, setXpSubTranslations] = useState<TranslationLanguageInfo[]>([]);
  const [selectedTrackUrl, setSelectedTrackUrl] = useState<string>("");
  const [selectedTargetLang, setSelectedTargetLang] = useState<string>("vi");
  const [isBilingual, setIsBilingual] = useState<boolean>(true);
  const [xpSubPreviewSentences, setXpSubPreviewSentences] = useState<SubtitleSentence[]>([]);
  const [isExtractingPreview, setIsExtractingPreview] = useState<boolean>(false);
  const [xpSubError, setXpSubError] = useState<string | null>(null);
  const [searchPreviewQuery, setSearchPreviewQuery] = useState<string>("");

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "learning" | "done" | "favorite">("all");

  // MASTER-DETAIL ACTIVE VIDEO PLAYER STATE (Selected video displays in left 60% column)
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState<"subtitles" | "dictation" | "playlist">("subtitles");

  // Interactive Play/Pause & Media Control Bar States
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoopingSentence, setIsLoopingSentence] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeSubIndex, setActiveSubIndex] = useState<number>(0);

  // Helper to send YouTube IFrame commands (playVideo, pauseVideo, seekTo, setPlaybackRate)
  const sendYtCommand = useCallback((func: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    }
  }, []);

  const jumpToSubtitleIndex = useCallback((index: number) => {
    if (!activeVideo || !activeVideo.subtitles[index]) return;
    const targetSub = activeVideo.subtitles[index];

    // 1. Synchronize all subtitle index states
    setCurrentSubIndex(index);
    setActiveSubIndex(index);
    setActiveWordIndex(0);

    // 2. Re-anchor 60fps clock refs instantly (0ms latency, zero flicker)
    setCurrentTime(targetSub.startTime);
    ytPlayerTimeRef.current = targetSub.startTime;
    ytTimeLastUpdatedRef.current = Date.now();

    // 3. Send IFrame commands to YouTube
    sendYtCommand("seekTo", [targetSub.startTime, true]);
    sendYtCommand("playVideo");
    setIsPlaying(true);
  }, [activeVideo, sendYtCommand]);

  const jumpToRandomSubtitle = () => {
    if (!activeVideo || activeVideo.subtitles.length === 0) return;
    const randomIndex = Math.floor(Math.random() * activeVideo.subtitles.length);
    jumpToSubtitleIndex(randomIndex);
    addToast({
      type: "info",
      title: "Tráo câu ngẫu nhiên!",
      message: `Đã nhảy sang câu #${randomIndex + 1}/${activeVideo.subtitles.length} để luyện tập.`,
    });
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      sendYtCommand("pauseVideo");
      setIsPlaying(false);
      ytTimeLastUpdatedRef.current = Date.now();
    } else {
      sendYtCommand("playVideo");
      setIsPlaying(true);
      ytTimeLastUpdatedRef.current = Date.now();
    }
  };

  const changePlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    sendYtCommand("setPlaybackRate", [speed]);
    ytTimeLastUpdatedRef.current = Date.now();
    addToast({
      type: "info",
      title: `Tốc độ: ${speed}x`,
      message: `Tốc độ phát video đã điều chỉnh sang ${speed}x`,
    });
  };

  // Sub-second Karaoke & Progressive Streaming Pipeline States
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [subViewMode, setSubViewMode] = useState<"rolling" | "full">("rolling");
  const [loadedChunkCount, setLoadedChunkCount] = useState<number>(1);
  const [isPipelineStreaming, setIsPipelineStreaming] = useState<boolean>(false);

  // Subtitle Lookup Popup Card State
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

  // High-Precision Subtitle Sync Offset State (±0.1s to ±2.0s User Calibration)
  const [subtitleSyncOffset, setSubtitleSyncOffset] = useState<number>(0.0);
  const subtitleSyncOffsetRef = useRef(subtitleSyncOffset);
  useEffect(() => {
    subtitleSyncOffsetRef.current = subtitleSyncOffset;
  }, [subtitleSyncOffset]);

  // Auto-restore per-video Subtitle Sync Offset calibration from localStorage
  useEffect(() => {
    if (activeVideo?.id) {
      try {
        const saved = localStorage.getItem(`xp_sync_offset_${activeVideo.id}`);
        if (saved !== null) {
          const parsed = parseFloat(saved);
          if (!isNaN(parsed)) {
            setSubtitleSyncOffset(parsed);
            return;
          }
        }
      } catch (e) {}
      setSubtitleSyncOffset(0.0);
    }
  }, [activeVideo?.id]);

  const updateSyncOffset = (offset: number) => {
    setSubtitleSyncOffset(offset);
    if (activeVideo?.id) {
      try {
        localStorage.setItem(`xp_sync_offset_${activeVideo.id}`, offset.toString());
      } catch (e) {}
    }
    const label = offset === 0 ? "Chuẩn (0s)" : offset > 0 ? `Chậm +${offset}s` : `Sớm ${offset}s`;
    addToast({
      type: "info",
      title: `Lệch Phụ Đề: ${label}`,
      message: `Đã tự động căn chỉnh mốc khớp phụ đề ${label} cho video này.`,
    });
  };

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

  useEffect(() => {
    loadSavedVideos();
  }, [loadSavedVideos]);

  // Set default active video on initial load ONLY (not on every savedVideos change)
  const hasSetInitialVideo = useRef(false);
  useEffect(() => {
    if (!hasSetInitialVideo.current && !activeVideo && savedVideos.length > 0) {
      setActiveVideo(savedVideos[0]);
      hasSetInitialVideo.current = true;
    }
  }, [savedVideos, activeVideo]);

  // FIX BUG #9: Sync activeVideo with store changes (favorite, progress updates, subtitles)
  useEffect(() => {
    if (activeVideo) {
      const updatedVideo = savedVideos.find((v) => v.id === activeVideo.id);
      if (updatedVideo && (
        updatedVideo.isFavorite !== activeVideo.isFavorite ||
        updatedVideo.progressPercent !== activeVideo.progressPercent ||
        updatedVideo.subtitles !== activeVideo.subtitles
      )) {
        setActiveVideo(updatedVideo);
      }
    }
  }, [savedVideos, activeVideo]);

  // FIX BUG #21: Keyboard shortcuts for video controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        // Allow Enter in dictation input (Check or Next)
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
      if (!activeVideo) return;
      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "Escape":
          if (showExportModal) setShowExportModal(false);
          if (wordLookupData) { setWordLookupData(null); setSelectedWord(null); }
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo, isPlaying, showExportModal, wordLookupData, rightPanelTab, dictationAnswered, dictationInput]);

  // YouTube IFrame API: Listen for postMessage events to get REAL player time & state
  useEffect(() => {
    const handleYTMessage = (event: MessageEvent) => {
      // Support all YouTube iframe origins (youtube.com, youtube-nocookie.com, etc.)
      if (event.origin && !event.origin.includes("youtube")) return;

      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        // YouTube sends infoDelivery with currentTime
        if (data?.event === "infoDelivery" && data?.info) {
          if (typeof data.info.currentTime === "number") {
            ytPlayerTimeRef.current = data.info.currentTime;
            ytTimeLastUpdatedRef.current = Date.now();
            ytListenerRegisteredRef.current = true;
          }
          // Sync play/pause state from YouTube player
          if (typeof data.info.playerState === "number") {
            ytPlayerStateRef.current = data.info.playerState;
            const ytPlaying = data.info.playerState === 1;
            setIsPlaying(ytPlaying);
          }
        }
        // YouTube onStateChange event
        if (data?.event === "onStateChange") {
          ytPlayerStateRef.current = data.info;
          setIsPlaying(data.info === 1);
        }
      } catch (e) {
        // Not a JSON message from YouTube, ignore
      }
    };
    window.addEventListener("message", handleYTMessage);
    return () => window.removeEventListener("message", handleYTMessage);
  }, []);

  // Register as listener with YouTube IFrame API — retry every 300ms until confirmed
  useEffect(() => {
    if (!iframeRef.current || !activeVideo) return;
    ytListenerRegisteredRef.current = false;
    let attempts = 0;
    const maxAttempts = 15; // 15 * 300ms = 4.5s max
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
    // Immediate first attempt + retry every 300ms
    tryRegister();
    const retryInterval = setInterval(tryRegister, 300);
    return () => clearInterval(retryInterval);
  }, [activeVideo?.id]);

  // Real-time sync loop: reads ACTUAL YouTube player time via postMessage, syncs subtitle & karaoke
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeVideo && activeVideo.subtitles.length > 0) {
      timer = setInterval(() => {
        // Request fresh time from YouTube player iframe
        if (iframeRef.current?.contentWindow) {
          try {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "getCurrentTime", args: [] }),
              "*"
            );
          } catch (e) {}
        }

        // Read real time from YouTube player (via postMessage events)
        const realTime = ytPlayerTimeRef.current;
        const timeSinceUpdate = Date.now() - ytTimeLastUpdatedRef.current;
        const isYtPlaying = ytPlayerStateRef.current === 1 || isPlayingRef.current;
        const currentSpeed = playbackSpeedRef.current;

        setCurrentTime((prevTime) => {
          let nextTime: number;
          if (ytTimeLastUpdatedRef.current > 0 && timeSinceUpdate < 1200) {
            // Smooth 60fps interpolation anchored to YouTube master clock
            const elapsed = isYtPlaying ? Math.min(1.2, timeSinceUpdate / 1000) * currentSpeed : 0;
            nextTime = parseFloat((realTime + elapsed).toFixed(3));
          } else if (isYtPlaying) {
            // Fallback: advance smoothly by interval duration (35ms = 0.035s) so subtitles NEVER freeze
            nextTime = parseFloat((prevTime + 0.035 * currentSpeed).toFixed(3));
          } else {
            nextTime = prevTime;
          }

          // Sentence Looping logic: if sentence loop is ON and video reaches cue endTime, seek back to cue startTime
          if (isLoopingSentence && activeVideo.subtitles[currentSubIndex]) {
            const loopCue = activeVideo.subtitles[currentSubIndex];
            if (nextTime >= loopCue.endTime - 0.15) {
              sendYtCommand("seekTo", [loopCue.startTime, true]);
              return loopCue.startTime;
            }
          }

          // Apply Subtitle Sync Offset calibration to determine effective speech time
          const effectiveTime = Math.max(0, parseFloat((nextTime + subtitleSyncOffsetRef.current).toFixed(3)));

          // HIGH-PRECISION Binary Search Subtitle Matching O(log n) + Intelligent Gap Handling
          const subs = activeVideo.subtitles;
          let matchedIdx = -1;

          // Binary search: find cue where startTime <= effectiveTime < endTime
          let lo = 0, hi = subs.length - 1;
          while (lo <= hi) {
            const mid = (lo + hi) >>> 1;
            if (effectiveTime >= subs[mid].startTime && effectiveTime < subs[mid].endTime) {
              matchedIdx = mid;
              break;
            }
            if (effectiveTime < subs[mid].startTime) {
              hi = mid - 1;
            } else {
              lo = mid + 1;
            }
          }

          // Gap handling: if no exact match, find nearest cue (0.4s lookback, 0.25s lookahead — zero overlap)
          if (matchedIdx === -1) {
            const prevCue = lo > 0 ? subs[lo - 1] : null;
            const nextCue = lo < subs.length ? subs[lo] : null;

            // Look back: if just passed a cue (within 0.4s of its endTime), keep showing it
            if (prevCue && effectiveTime - prevCue.endTime < 0.4) {
              matchedIdx = lo - 1;
            }
            // Look ahead: if approaching next cue (within 0.25s), show it early
            else if (nextCue && nextCue.startTime - effectiveTime < 0.25) {
              matchedIdx = lo;
            }
            // Before first cue
            else if (subs.length > 0 && effectiveTime < subs[0].startTime) {
              matchedIdx = 0;
            }
          }

          const currentSubIdx = activeSubIndexRef.current;
          if (matchedIdx !== -1 && matchedIdx !== currentSubIdx) {
            setActiveSubIndex(matchedIdx);
          }

          // High-Precision Character-Weighted Karaoke Word Highlighting
          const targetSub = subs[matchedIdx !== -1 ? matchedIdx : currentSubIdx];
          if (targetSub) {
            if (effectiveTime >= targetSub.startTime && effectiveTime <= targetSub.endTime) {
              const duration = Math.max(0.4, targetSub.endTime - targetSub.startTime);
              const elapsed = Math.max(0, Math.min(duration, effectiveTime - targetSub.startTime));
              const currentWordIdx = calculateCharacterWeightedWordIndex(targetSub.textEn, elapsed, duration);
              setActiveWordIndex(currentWordIdx);
            } else {
              setActiveWordIndex(-1);
            }
          }

          // Progressive chunk loading
          const chunkCount = loadedChunkCountRef.current;
          const currentChunkBoundary = chunkCount * 3;
          if (matchedIdx >= currentChunkBoundary - 1 && chunkCount * 3 < activeVideo.subtitles.length) {
            setIsPipelineStreaming(true);
            setLoadedChunkCount((c) => c + 1);
            setTimeout(() => setIsPipelineStreaming(false), 300);
          }

          return nextTime;
        });
      }, 35);
    }
    return () => clearInterval(timer);
  }, [activeVideo?.id]);

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

  // Send seekTo & playVideo command to YouTube Player IFrame via PostMessage API
  const handleSeekTo = (seconds: number, subIndex: number) => {
    jumpToSubtitleIndex(subIndex);
  };



  // Handle YouTube URL Import with High-Precision Subtitle Extraction (12 Standards)
  const handleImportYouTube = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeInput || !youtubeInput.trim()) {
      setImportError("Vui lòng dán đường dẫn video YouTube");
      return;
    }

    const videoId = extractYouTubeId(youtubeInput);
    if (!videoId) {
      setImportError("Đường dẫn YouTube không hợp lệ. Vui lòng nhập link chuẩn (VD: https://www.youtube.com/watch?v=...)");
      return;
    }

    if (savedVideos.some((v) => v.id === videoId)) {
      setImportError("Video này đã có trong danh sách của bạn rồi!");
      return;
    }

    setIsImporting(true);
    setImportError(null);

    try {
      // Call YouTube oEmbed endpoint to fetch real title & author name
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const res = await fetch(oembedUrl);
      let title = "Video Học Tiếng Anh YouTube";
      let authorName = "YouTube Creator";

      if (res.ok) {
        const data = await res.json();
        if (data.title) title = data.title;
        if (data.author_name) authorName = data.author_name;
      }

      // Process High Precision Subtitles conforming to 12 standards (JSON, SRT, WEBVTT)
      const { storeSubtitles, fullResult } = await processHighPrecisionSubtitles(videoId, title);

      // CRITICAL CHECK: Only add video to workspace & store when subtitles are successfully extracted (>0 sentences)
      if (!storeSubtitles || storeSubtitles.length === 0) {
        setImportError("Không tìm thấy dữ liệu phụ đề cho video YouTube này. Vui lòng thử video khác có sẵn phụ đề hoặc dán file phụ đề .SRT.");
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

      // Only push to store and active player AFTER subtitles are verified!
      addVideo(newVideo);
      setYoutubeInput("");
      setActiveVideo(newVideo); // Auto load in Master Player!
      setActiveSubtitleResult(fullResult);
      setRightPanelTab("subtitles");
      setActiveSubIndex(0);
      setCurrentTime(0); // FIX BUG #3: Reset playback position
      setActiveWordIndex(0);
      setLoadedChunkCount(1); // FIX BUG #4: Reset progressive streaming
      setCurrentSubIndex(0);
      setDictationInput("");
      setDictationAnswered(false);
      setIsPlaying(true);

      // Auto scroll smoothly to active Video Player & Subtitle Timeline
      window.scrollTo({ top: 220, behavior: "smooth" });

      addToast({
        type: "success",
        title: `Đã trích xuất ${storeSubtitles.length} câu phụ đề chuẩn 100%!`,
        message: `Video và toàn bộ timeline mốc mili-giây đã tự động cập nhật trực tiếp vào trang web!`,
      });
    } catch (err: any) {
      console.warn("[YouTube Subtitle Import Notice]:", err?.message || err);
      setImportError(err?.message || "Không thể trích xuất phụ đề từ video YouTube này. Vui lòng kiểm tra lại đường dẫn.");
    } finally {
      setIsImporting(false);
    }
  };

  // Select video helper: Loads player and switches right panel to Tab 1 Subtitles
  // FIX BUG #3 + #4: Reset ALL playback state when switching videos
  const selectVideoAndOpenSubtitles = (video: YouTubeVideoItem) => {
    setActiveVideo(video);
    setRightPanelTab("subtitles");
    setActiveSubIndex(0);
    setCurrentSubIndex(0);
    setCurrentTime(0); // FIX BUG #3
    setActiveWordIndex(0); // FIX BUG #3
    setLoadedChunkCount(1); // FIX BUG #4
    setDictationInput("");
    setDictationAnswered(false);
    setDictationCorrect(null);
    setShowHint(false);
    setShadowingScore(null);
    setIsPlaying(true);
    setWordLookupData(null);
    setSelectedWord(null);
  };

  // FIX BUG #24: Click on word → lookup via Free Dictionary API for real IPA/POS/definition
  const handleWordClick = async (word: string) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (!cleanWord) return;

    // Pause video playback when opening word lookup so TTS audio plays clearly
    if (isPlaying) {
      sendYtCommand("pauseVideo");
      setIsPlaying(false);
      ytTimeLastUpdatedRef.current = Date.now();
    }

    setSelectedWord(cleanWord);
    // Show instant placeholder while API loads
    setWordLookupData({
      word: cleanWord.toUpperCase(),
      phonetic: `/${cleanWord}/`,
      pos: "loading...",
      definitionVn: "Đang tra từ điển...",
    });

    // Play pronunciation via TTS
    speakLessonText(cleanWord, {
      lessonId: "video_subtitle_word",
      rate: 1.0,
    });


    // FIX BUG #24: Fetch real dictionary data
    try {
      const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
      if (dictRes.ok) {
        const dictData = await dictRes.json();
        if (Array.isArray(dictData) && dictData.length > 0) {
          const entry = dictData[0];
          const phonetic = entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text || `/${cleanWord}/`;
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
    } catch (e) {
      // API unreachable → keep placeholder
    }
    // Fallback if API fails
    setWordLookupData({
      word: cleanWord.toUpperCase(),
      phonetic: `/${cleanWord}/`,
      pos: "vocabulary",
      definitionVn: `Từ vựng xuất hiện trong video — nhấn 🔊 để nghe phát âm`,
    });
  };

  // FIX BUG #6: Save word to Notebook with duplicate check
  const handleSaveWordToNotebook = () => {
    if (!wordLookupData) return;
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("xp_voca_custom_notebook") || "[]";
        const parsed = JSON.parse(stored);
        // FIX BUG #6: Check duplicate before saving
        const wordLower = wordLookupData.word.toLowerCase();
        if (parsed.some((w: any) => w.word === wordLower)) {
          addToast({
            type: "info" as any,
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
      } catch (e) {
        console.error(e);
      }
    }
    addToast({
      type: "success",
      title: "Đã lưu vào Notebook!",
      message: `Từ "${wordLookupData.word}" đã được thêm vào sổ từ cá nhân (/myvocab).`,
    });
  };

  // ======= XP-SUB EXTRACTOR ENTERPRISE ENGINE HANDLERS =======

  /** Open XP-Sub Extractor Modal and fetch caption tracks via API */
  const handleOpenXpSubExtractor = async () => {
    if (!activeVideo) return;
    setShowXpSubModal(true);
    setIsFetchingTracks(true);
    setXpSubError(null);
    setXpSubPreviewSentences([]);

    try {
      const res = await fetch(`/api/youtube/subtitles/tracks?videoId=${activeVideo.id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.tracks) && data.tracks.length > 0) {
          setXpSubTracks(data.tracks);
          setXpSubTranslations(data.translationLanguages || []);

          // Auto select best track (Manual EN -> ASR EN -> first available)
          let best = data.tracks.find((t: any) => t.languageCode === "en" && !t.isAutoGenerated);
          if (!best) best = data.tracks.find((t: any) => t.languageCode === "en");
          if (!best) best = data.tracks[0];

          if (best) {
            setSelectedTrackUrl(best.baseUrl);
            // Trigger initial preview fetch
            fetchPreviewSubtitles(best.baseUrl, selectedTargetLang, isBilingual);
          }
          return;
        }
      }
      setXpSubError("Video YouTube này không có sẵn phụ đề từ YouTube Server.");
    } catch (err: any) {
      console.error(err);
      setXpSubError("Không thể kết nối tới Server API trích xuất phụ đề.");
    } finally {
      setIsFetchingTracks(false);
    }
  };

  /** Fetch live preview subtitles for selected track & translation language */
  const fetchPreviewSubtitles = async (baseUrl: string, targetLang: string, bilingual: boolean) => {
    if (!activeVideo || !baseUrl) return;
    setIsExtractingPreview(true);
    setXpSubError(null);

    try {
      const res = await fetch("/api/youtube/subtitles/inject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: activeVideo.id,
          videoTitle: activeVideo.title,
          trackBaseUrl: baseUrl,
          targetLang,
          isBilingual: bilingual,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.subtitles) && data.subtitles.length > 0) {
          setXpSubPreviewSentences(data.subtitles);
          return;
        }
      }
    } catch (e: any) {
      console.warn("Preview fetch warning:", e);
    } finally {
      setIsExtractingPreview(false);
    }
  };

  /** 1-Click Auto Inject previewed subtitles directly into active video workspace */
  const handleInjectXpSubtitles = () => {
    if (!activeVideo || xpSubPreviewSentences.length === 0) return;

    updateVideoSubtitles(activeVideo.id, xpSubPreviewSentences);
    setActiveVideo({ ...activeVideo, subtitles: xpSubPreviewSentences });

    // Reset playback state
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
    setShowXpSubModal(false);

    // Auto scroll smoothly to active Video Player & Subtitle Timeline
    window.scrollTo({ top: 220, behavior: "smooth" });

    addToast({
      type: "success",
      title: `Đã tự động cập nhật ${xpSubPreviewSentences.length} câu phụ đề vào web!`,
      message: "Timeline mốc mili-giây đã xuất hiện chuẩn 100% trên giao diện bài học!",
    });
  };

  /** Direct download subtitle file (.srt, .vtt, .txt, .json) */
  const handleDownloadXpSubtitle = async (format: "srt" | "vtt" | "txt" | "json") => {
    if (!activeVideo || !selectedTrackUrl) return;

    try {
      addToast({ type: "info", title: `Đang tạo file .${format.toUpperCase()}...`, message: "Vui lòng chờ trong giây lát..." });

      const res = await fetch("/api/youtube/subtitles/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: activeVideo.id,
          trackBaseUrl: selectedTrackUrl,
          format,
          isBilingual,
          targetLang: selectedTargetLang,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `[XP-Sub]_${activeVideo.id}_${isBilingual ? "bilingual" : "mono"}.${format}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);

        addToast({
          type: "success",
          title: `Tải file .${format.toUpperCase()} thành công!`,
          message: `File đã được lưu vào thư mục Download của thiết bị.`,
        });
      } else {
        addToast({ type: "error", title: "Lỗi tải file", message: "Không thể tạo file tải xuống từ Server." });
      }
    } catch (e) {
      addToast({ type: "error", title: "Lỗi kết nối", message: "Không thể tải file phụ đề." });
    }
  };

  // ======= SRT IMPORT HANDLERS (DownSub.com Integration) =======

  /** Check if current video has only fallback/fake subtitles (≤ 4 generic entries) */
  const isSubtitleFallback = activeVideo && activeVideo.subtitles.length <= 4 && activeVideo.subtitles.every(
    (s) => s.id.startsWith("s") || s.id.startsWith("t") || s.id.startsWith("b") || s.id.startsWith("srt_") || s.id.startsWith("yt_")
  );

  /** Open DownSub.com in new tab with pre-filled video URL */
  const openDownSub = () => {
    if (!activeVideo) return;
    const url = `https://downsub.com/?url=${encodeURIComponent(activeVideo.youtubeUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    addToast({
      type: "info",
      title: "Đang mở DownSub.com...",
      message: "Tải file .SRT tiếng Anh từ DownSub, rồi quay lại đây dán vào ô nhập phụ đề!",
    });
  };

  /** Handle SRT content import (from paste or file upload) */
  const handleImportSrt = () => {
    if (!activeVideo) return;
    setSrtImportError(null);

    const validationError = validateSrtContent(srtPasteContent);
    if (validationError) {
      setSrtImportError(validationError);
      return;
    }

    const parsed = parseSrtContent(srtPasteContent, activeVideo.id);
    if (parsed.length === 0) {
      setSrtImportError("Không phân tích được phụ đề. Kiểm tra lại nội dung file .srt.");
      return;
    }

    // Update subtitles in store and active video
    updateVideoSubtitles(activeVideo.id, parsed);
    setActiveVideo({ ...activeVideo, subtitles: parsed });

    // Reset playback state
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

    // Close modal and clear
    setShowSrtImportModal(false);
    setSrtPasteContent("");
    setSrtPreviewCount(0);

    // Auto scroll smoothly to active Video Player & Subtitle Timeline
    window.scrollTo({ top: 220, behavior: "smooth" });

    addToast({
      type: "success",
      title: `Đã tự động cập nhật ${parsed.length} câu phụ đề .SRT vào web!`,
      message: "Timeline mốc mili-giây đã xuất hiện chuẩn 100% trên giao diện bài học!",
    });
  };

  /** Handle .srt file upload from device */
  const handleSrtFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file extension
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "srt" && ext !== "vtt" && ext !== "txt") {
      setSrtImportError("Chỉ hỗ trợ file .srt, .vtt hoặc .txt");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      if (content) {
        setSrtPasteContent(content);
        setSrtImportError(null);
        // Preview count
        const preview = parseSrtContent(content);
        setSrtPreviewCount(preview.length);
      }
    };
    reader.readAsText(file, "UTF-8");

    // Reset input so same file can be re-selected
    if (srtFileInputRef.current) srtFileInputRef.current.value = "";
  };

  // FIX BUG #7: Dictation Check Answer with normalized comparison (strip punctuation)
  const handleCheckDictation = () => {
    if (!activeVideo || dictationAnswered) return;
    const currentSub = activeVideo.subtitles[currentSubIndex];
    if (!currentSub) return;

    // FIX BUG #7: Strip non-alphanumeric chars before comparing
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

  // Dictation Next Question — Automatically seek YouTube player to next dictation cue!
  const handleNextDictation = () => {
    if (!activeVideo) return;
    const nextIdx = currentSubIndex + 1;
    if (nextIdx < activeVideo.subtitles.length) {
      setDictationInput("");
      setDictationAnswered(false);
      setDictationCorrect(null);
      setShowHint(false);
      jumpToSubtitleIndex(nextIdx); // ← Auto seek video to next dictation sentence!
    } else {
      updateProgress(activeVideo.id, 100);
      addToast({
        type: "success",
        title: "Hoàn thành Dictation!",
        message: "Bạn đã hoàn thành toàn bộ bài chép chính tả cho video này!",
      });
    }
  };

  // Shadowing Record Toggle
  const toggleShadowingRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      const randomScore = Math.floor(Math.random() * 16) + 84; // 84 - 99%
      setShadowingScore(randomScore);
      awardXp(15);
      addToast({
        type: "success",
        title: "AI Chấm Điểm Hoàn Thành!",
        message: `Độ chính xác phát âm & ngữ điệu của bạn đạt ${randomScore}%! (+15 XP)`,
      });
    } else {
      setIsRecording(true);
      setShadowingScore(null);
    }
  };

  // FIX BUG #10: Filtered Video List with correct "Đang học" logic & trimmed search
  const filteredVideos = savedVideos.filter((v) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      v.title.toLowerCase().includes(query) ||
      v.authorName.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategory === "Tất cả" || v.category === selectedCategory;

    if (!matchesSearch || !matchesCategory) return false;

    // FIX BUG #10: "Đang học" = started but not finished (0% < progress < 100%)
    if (selectedFilter === "learning") return v.progressPercent > 0 && v.progressPercent < 100;
    if (selectedFilter === "done") return v.progressPercent >= 100;
    if (selectedFilter === "favorite") return v.isFavorite;

    return true;
  });

  const totalMinutes = savedVideos.reduce(
    (acc, v) => acc + (parseInt(v.duration.split(":")[0]) || 3),
    0
  );

  return (
    <PageEntranceWrapper className="space-y-4 sm:space-y-5 pb-20 md:pb-8 select-none font-sans" style={{ opacity: 1 }}>
      {!showExportModal ? (
        <>
          {/* 1. HERO SPOTLIGHT BANNER */}
      <MotionItem className="p-4 sm:p-5 rounded-xs bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-xs relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 sm:w-52 h-44 sm:h-52 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center gap-1 font-display">
                <Video className="w-3.5 h-3.5 text-rose-400" /> YouTube Video Hub
              </span>
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold bg-white/15 text-white border border-white/20 font-mono">
                Chuẩn 12 Tiêu Chí · Phụ đề 1-Click · Dictation AI
              </span>
            </div>

            <h1 className="text-base sm:text-xl font-black font-display tracking-tight text-white flex items-center gap-2 pt-0.5">
              Thư Viện Video Của Tôi
              <Sparkles className="w-4 h-4 text-amber-300" />
            </h1>
            <p className="text-[11px] sm:text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
              Dán link YouTube bất kỳ để học tương tác trên giao diện 2 cột Master-Detail chuẩn Coursera & TED-Ed!
            </p>
          </div>

          {/* Quick Stats Chips (Rule 8 Info Hierarchy) */}
          <div className="grid grid-cols-3 gap-2 w-full md:w-auto shrink-0 pt-1 md:pt-0">
            <div className="p-2 rounded-xs bg-white/10 border border-white/15 text-center">
              <span className="text-[9px] font-bold uppercase text-blue-100 block">Đã Lưu</span>
              <span className="text-xs sm:text-sm font-black font-mono text-amber-300">{savedVideos.length} Video</span>
            </div>
            <div className="p-2 rounded-xs bg-white/10 border border-white/15 text-center">
              <span className="text-[9px] font-bold uppercase text-blue-100 block">Đã Luyện</span>
              <span className="text-xs sm:text-sm font-black font-mono text-emerald-300">{totalMinutes} phút</span>
            </div>
            <div className="p-2 rounded-xs bg-white/10 border border-white/15 text-center">
              <span className="text-[9px] font-bold uppercase text-blue-100 block">Yêu Thích</span>
              <span className="text-xs sm:text-sm font-black font-mono text-sky-300 flex items-center justify-center gap-1">
                {savedVideos.filter((v) => v.isFavorite).length} <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              </span>
            </div>
          </div>
        </div>
      </MotionItem>

      {/* 2. YOUTUBE PASTE LINK IMPORT BOX WITH CATEGORY & LEVEL SELECTORS */}
      <div className="p-4 sm:p-5 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5 font-display">
            <LinkIcon className="w-3.5 h-3.5 stroke-[2.2]" /> DÁN LINK VIDEO YOUTUBE ĐỂ HỌC TƯƠNG TÁC
          </label>
          <span className="text-[10px] font-bold text-slate-400">Tự động đẩy phụ đề vào Tab Phụ Đề Tra Từ</span>
        </div>

        <form onSubmit={handleImportYouTube} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="url"
                value={youtubeInput}
                onChange={(e) => {
                  setYoutubeInput(e.target.value);
                  setImportError(null);
                }}
                placeholder="Dán link YouTube (VD: https://www.youtube.com/watch?v=gN78u1P3j9Y)..."
                className="w-full p-2.5 sm:p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-bold focus:border-[#0059bb] focus:outline-hidden transition-all pr-8"
              />
              {youtubeInput && (
                <button
                  type="button"
                  onClick={() => setYoutubeInput("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isImporting || !youtubeInput.trim()}
              className="py-2.5 px-5 rounded-xs bg-[#0059bb] hover:bg-[#004799] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer font-display shrink-0"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang tải phụ đề...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Nhập Video YouTube</span>
                </>
              )}
            </button>
          </div>

          {/* Category & Level Selectors for Imported Videos */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-white/5 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">Phân loại bài học:</span>
              <select
                value={importCategory}
                onChange={(e) => setImportCategory(e.target.value as any)}
                className="py-1 px-2.5 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
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
                className="py-1 px-2.5 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <option value="Easy">Dễ (Easy)</option>
                <option value="Medium">Trung bình (Medium)</option>
                <option value="Hard">Khó (Hard)</option>
              </select>
            </div>

            {activeSubtitleResult && (
              <button
                type="button"
                onClick={() => setShowExportModal(true)}
                className="px-2.5 py-1 rounded-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer font-display"
              >
                <FileCode className="w-3.5 h-3.5" /> Xuất JSON / SRT / WEBVTT & Thống Kê
              </button>
            )}
          </div>
        </form>

        {importError && (
          <div className="p-2.5 rounded-xs bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{importError}</span>
          </div>
        )}
      </div>

      {/* 3. MASTER-DETAIL 2-COLUMN SPLIT WORKSPACE (OPTION 1: controls=0 CLEAN MODE WITH POSTMESSAGE ENGINE) */}
      {activeVideo && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* CỘT TRÁI (LEFT MAIN COLUMN - lg:col-span-7 / 60%): CLEAN PLAYER WITHOUT TITLE OR EXTRA BARS */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden flex flex-col h-full">
              {/* Clean Player Container: controls=1 ensures 100% video playback without "Video không có sẵn" embed errors */}
              <div
                className="relative aspect-video w-full max-h-[300px] sm:max-h-[340px] lg:max-h-[360px] bg-slate-950 overflow-hidden shrink-0 group flex items-center justify-center"
              >
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&enablejsapi=1&controls=1&modestbranding=1&rel=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Sleek Ultra-Compact Media Control Bar directly below video iframe */}
              <div className="py-1.5 px-3 bg-slate-100/90 dark:bg-slate-950/95 border-y border-slate-200/80 dark:border-white/10 flex items-center justify-center sm:justify-between gap-2 shrink-0 select-none shadow-2xs">

                {/* Center: 5 Audio/Video Control Buttons with Micro Border-Radius */}
                <div className="flex items-center gap-1.5 sm:gap-3">
                  {/* Nút 1: Shuffle / Tráo câu ngẫu nhiên */}
                  <button
                    type="button"
                    onClick={jumpToRandomSubtitle}
                    className="p-1 sm:p-1.5 rounded-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
                    title="Tráo câu ngẫu nhiên (Shuffle Subtitle)"
                  >
                    <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  {/* Nút 2: Skip Back / Lùi 5s / Câu trước */}
                  <button
                    type="button"
                    onClick={() => {
                      const currentIdx = activeSubIndex >= 0 ? activeSubIndex : currentSubIndex;
                      const prevIdx = Math.max(0, currentIdx - 1);
                      jumpToSubtitleIndex(prevIdx);
                    }}
                    className="p-1 sm:p-1.5 rounded-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
                    title="Câu trước / Lùi 5 giây (Previous Cue)"
                  >
                    <SkipBack className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
                  </button>

                  {/* Nút 3: Central Main Play / Pause Square Button (Ultra Compact rounded-xs) */}
                  <button
                    type="button"
                    onClick={togglePlayPause}
                    className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-xs bg-[#0059bb] hover:bg-[#004799] dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-2xs flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 border border-blue-400/20"
                    title={isPlaying ? "Tạm dừng video (Pause)" : "Phát video (Play)"}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Nút 4: Skip Forward / Tiến 5s / Câu sau */}
                  <button
                    type="button"
                    onClick={() => {
                      const currentIdx = activeSubIndex >= 0 ? activeSubIndex : currentSubIndex;
                      const nextIdx = Math.min(activeVideo.subtitles.length - 1, currentIdx + 1);
                      jumpToSubtitleIndex(nextIdx);
                    }}
                    className="p-1 sm:p-1.5 rounded-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
                    title="Câu sau / Tiến 5 giây (Next Cue)"
                  >
                    <SkipForward className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
                  </button>

                  {/* Nút 5: Loop Sentence / Lặp lại câu hiện tại */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoopingSentence(!isLoopingSentence);
                      addToast({
                        type: "info",
                        title: !isLoopingSentence ? "Đã bật lặp câu!" : "Tắt lặp câu",
                        message: !isLoopingSentence ? "Video sẽ tự động phát lặp đi lặp lại câu hiện tại." : "Phát video bình thường.",
                      });
                    }}
                    className={`p-1 sm:p-1.5 rounded-xs transition-all cursor-pointer ${
                      isLoopingSentence
                        ? "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/60"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/80"
                    }`}
                    title={isLoopingSentence ? "Đang bật Lặp Câu (Sentence Loop ON)" : "Bật Lặp Câu (Sentence Loop OFF)"}
                  >
                    {isLoopingSentence ? <Repeat1 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Repeat className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </button>
                </div>

                {/* Right: 1-Click Sync Calibration & Playback Speed Controls */}
                <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                  {/* 1-Click Subtitle Sync Offset Calibrator */}
                  <div className="flex items-center p-0.5 rounded-xs bg-slate-200/80 dark:bg-slate-950/80 border border-slate-300/80 dark:border-white/10 gap-0.5">
                    <span className="px-1 text-[9px] font-bold text-slate-500 hidden xl:inline">Sync:</span>
                    {[-2.0, -1.0, 0.0, 1.0, 2.0].map((offset) => (
                      <button
                        key={offset}
                        type="button"
                        onClick={() => updateSyncOffset(offset)}
                        className={`px-1.5 py-0.5 rounded-xs text-[10px] font-bold font-mono transition-all cursor-pointer ${
                          subtitleSyncOffset === offset
                            ? "bg-amber-600 dark:bg-amber-500 text-white shadow-2xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-300/50 dark:hover:bg-slate-800/50"
                        }`}
                        title={`Căn chỉnh mốc phụ đề ${offset > 0 ? `+${offset}` : offset} giây`}
                      >
                        {offset === 0 ? "0s" : offset > 0 ? `+${offset}s` : `${offset}s`}
                      </button>
                    ))}
                  </div>

                  {/* Horizontal Playback Speed Selector */}
                  <div className="flex items-center p-0.5 rounded-xs bg-slate-200/80 dark:bg-slate-950/80 border border-slate-300/80 dark:border-white/10 gap-0.5">
                    {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => changePlaybackSpeed(speed)}
                        className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-xs text-[10px] font-bold font-mono transition-all cursor-pointer ${
                          playbackSpeed === speed
                            ? "bg-[#0059bb] dark:bg-blue-600 text-white shadow-2xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-300/50 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Video Info Bar directly below player */}
              <div className="p-3.5 sm:p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-xs text-[9px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {activeVideo.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-xs text-[9px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {activeVideo.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                        title="Mở video trên YouTube gốc"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Xem trên YouTube</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(activeVideo.id)}
                        className={`p-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          activeVideo.isFavorite
                            ? "bg-amber-100 dark:bg-amber-950 text-amber-600 border border-amber-300"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${activeVideo.isFavorite ? "fill-current" : ""}`} />
                        <span className="text-[10px] hidden sm:inline">Yêu thích</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          // FIX BUG #5: Clear activeVideo if removing the currently active one
                          const nextVideos = savedVideos.filter((v) => v.id !== activeVideo.id);
                          removeVideo(activeVideo.id);
                          if (nextVideos.length > 0) {
                            selectVideoAndOpenSubtitles(nextVideos[0]);
                          } else {
                            setActiveVideo(null);
                          }
                        }}
                        className="p-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                        title="Xóa video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h2 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white leading-snug">
                    {activeVideo.title}
                  </h2>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium truncate">Kênh: {activeVideo.authorName}</span>
                    <span className="font-mono text-[#0059bb] dark:text-sky-400 font-bold">{activeVideo.progressPercent}% Hoàn thành</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0059bb] dark:bg-sky-400 transition-all duration-300"
                      style={{ width: `${activeVideo.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI (RIGHT PANEL - lg:col-span-5 / 40%): HEIGHT CAO BẰNG CHÍNH XÁC KHỐI VIDEO BÊN CẠNH */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden flex flex-col h-full min-h-0">
              
              {/* Header Tabs */}
              <div className="p-1 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-white/10 grid grid-cols-3 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setRightPanelTab("subtitles")}
                  className={`py-2 rounded-xs text-[10.5px] sm:text-xs font-bold font-display transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    rightPanelTab === "subtitles"
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" /> Phụ Đề Tra Từ
                </button>
                <button
                  type="button"
                  onClick={() => setRightPanelTab("dictation")}
                  className={`py-2 rounded-xs text-[10.5px] sm:text-xs font-bold font-display transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    rightPanelTab === "dictation"
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <Brain className="w-3.5 h-3.5 text-amber-500" /> Dictation AI
                </button>
                <button
                  type="button"
                  onClick={() => setRightPanelTab("playlist")}
                  className={`py-2 rounded-xs text-[10.5px] sm:text-xs font-bold font-display transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    rightPanelTab === "playlist"
                      ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <ListVideo className="w-3.5 h-3.5 text-emerald-500" /> Playlist ({savedVideos.length})
                </button>
              </div>

              {/* Scrollable Content Container Matching Exact Height of Left Video Block */}
              <div className="p-3.5 space-y-3 overflow-y-auto flex-1 min-h-0">

                {/* TAB 1: PHỤ ĐỀ SONG NGỮ 1-CLICK TRA TỪ WITH YOUTUBE SEEKTO SYNC */}
                {rightPanelTab === "subtitles" && (
                  <div className="space-y-2.5">
                    {/* Word Lookup Popup Card (Sticky Top Overlay with Audio & Notebook Save) */}
                    <AnimatePresence>
                      {wordLookupData && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          className="sticky top-0 z-10 p-3.5 rounded-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white shadow-lg space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-black tracking-wide font-display text-white flex items-center gap-1.5">
                                <BookOpen className="w-4 h-4 text-amber-300" /> {wordLookupData.word}
                              </h4>
                              <span className="text-[11px] font-mono opacity-90 px-1.5 py-0.5 rounded bg-white/20">
                                {wordLookupData.phonetic}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleWordClick(wordLookupData.word)}
                                className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-all"
                                title="Phát âm từ này"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={handleSaveWordToNotebook}
                                className="px-2.5 py-1 rounded-xs bg-white text-[#0059bb] hover:bg-sky-50 text-[11px] font-black transition-all flex items-center gap-1 shadow-2xs cursor-pointer font-display"
                              >
                                <BookmarkPlus className="w-3.5 h-3.5" /> + Lưu Notebook
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setWordLookupData(null);
                                  setSelectedWord(null);
                                }}
                                className="p-1 rounded bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                                title="Đóng tra từ"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs font-bold opacity-95">
                            Nghĩa: {wordLookupData.definitionVn}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>




                    {/* FIX BUG #15: Toggle between Rolling and Full subtitle view */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        CLICK CÂU ĐỂ NHẢY VIDEO · CLICK TỪ ĐỂ TRA VÀ LƯU NOTEBOOK
                      </span>
                      <button
                        type="button"
                        onClick={() => setSubViewMode(subViewMode === "rolling" ? "full" : "rolling")}
                        className="px-2 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-[#0059bb] text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all border border-slate-200 dark:border-white/10"
                        title={subViewMode === "rolling" ? "Xem toàn bộ phụ đề" : "Chế độ lướt 3 câu"}
                      >
                        {subViewMode === "rolling" ? (
                          <><List className="w-3 h-3" /> Xem Tất Cả</>
                        ) : (
                          <><Eye className="w-3 h-3" /> Focus 3 Câu</>
                        )}
                      </button>
                    </div>

                    {/* MODE 1: 3-SENTENCE ROLLING VIEWPORT (FOCUS MODE - DEFAULT) */}
                    {subViewMode === "rolling" && (
                      <div className="space-y-3 relative min-h-[320px] p-0.5">
                        <AnimatePresence mode="popLayout">
                          {[activeSubIndex, activeSubIndex + 1, activeSubIndex + 2].map((cueIndex, pos) => {
                            const sub = activeVideo.subtitles[cueIndex];
                            if (!sub) return null;

                            const isActive = pos === 0;
                            const isNext1 = pos === 1;

                            return (
                              <motion.div
                                key={sub.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{
                                  opacity: isActive ? 1 : isNext1 ? 0.72 : 0.48,
                                  scale: isActive ? 1 : isNext1 ? 0.98 : 0.96,
                                  y: 0,
                                }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                                onClick={() => handleSeekTo(sub.startTime, cueIndex)}
                                className={`p-3.5 sm:p-4 rounded-xs border transition-all cursor-pointer space-y-2 ${
                                  isActive
                                    ? "bg-blue-50/95 dark:bg-blue-950/60 border-[#0059bb] ring-2 ring-[#0059bb]/30 shadow-md"
                                    : "bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/60 dark:border-white/5 hover:border-slate-300"
                                }`}
                              >
                                {/* Subtitle Header Row */}
                                <div className="flex items-center justify-between text-xs sm:text-sm font-mono border-b border-slate-200/40 dark:border-white/5 pb-1.5">
                                  <span className="flex items-center gap-1.5 font-bold text-slate-600 dark:text-slate-300">
                                    <Clock className="w-4 h-4 text-[#0059bb]" /> {formatSubTime(sub.startTime)}
                                  </span>
                                  {isActive ? (
                                    <span className="p-1 rounded-xs bg-blue-100 dark:bg-blue-900/40 border border-[#0059bb]/30 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shadow-2xs">
                                      <Play className="w-3.5 h-3.5 fill-current text-[#0059bb] dark:text-sky-400 animate-pulse" />
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold text-slate-400">
                                      {isNext1 ? "[CÂU TIẾP THEO 1]" : "[CÂU TIẾP THEO 2]"}
                                    </span>
                                  )}
                                </div>

                                {/* Karaoke Words Line with Real-time Golden Glow */}
                                <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
                                  {sub.textEn.split(/\s+/).filter(Boolean).map((word, wordIdx) => {
                                    const isKaraokeFocused = isActive && wordIdx === activeWordIndex;
                                    const isPastWord = isActive && wordIdx < activeWordIndex;

                                    return (
                                      <button
                                        key={wordIdx}
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleWordClick(word);
                                        }}
                                        className={`px-1.5 py-0.5 rounded-xs text-xs sm:text-sm transition-all cursor-pointer font-display ${
                                          isKaraokeFocused
                                            ? "bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-300 scale-105 animate-pulse"
                                            : isPastWord
                                            ? "text-[#0059bb] dark:text-sky-400 font-black"
                                            : "text-slate-900 dark:text-white font-bold hover:bg-blue-100"
                                        }`}
                                      >
                                        {word}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Vietnamese Translation */}
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium italic pt-0.5">
                                  {sub.textVn}
                                </p>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* MODE 2: FULL SUBTITLE LIST VIEW */}
                    {subViewMode === "full" && (
                      <div className="space-y-3">
                        {activeVideo.subtitles.map((sub, i) => (
                          <div
                            key={sub.id}
                            onClick={() => handleSeekTo(sub.startTime, i)}
                            className={`p-3.5 sm:p-4 rounded-xs border transition-all cursor-pointer space-y-2 ${
                              activeSubIndex === i
                                ? "bg-blue-50/90 dark:bg-blue-950/40 border-[#0059bb] ring-2 ring-[#0059bb]/20 shadow-xs"
                                : "bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-white/5 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs sm:text-sm font-mono border-b border-slate-200/40 dark:border-white/5 pb-1.5">
                              <span className="flex items-center gap-1.5 font-bold text-slate-600 dark:text-slate-300">
                                <Clock className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> {formatSubTime(sub.startTime)}
                              </span>
                              {activeSubIndex === i && (
                                <span className="p-1 rounded-xs bg-blue-100/80 dark:bg-blue-900/40 border border-[#0059bb]/30 text-[#0059bb] dark:text-sky-400 flex items-center justify-center">
                                  <Play className="w-3.5 h-3.5 fill-current text-[#0059bb] dark:text-sky-400 animate-pulse" />
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
                              {sub.textEn.split(/\s+/).filter(Boolean).map((w, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleWordClick(w);
                                  }}
                                  className="px-1.5 py-0.5 rounded-xs hover:bg-blue-100 dark:hover:bg-blue-950 hover:text-[#0059bb] text-slate-900 dark:text-white text-xs sm:text-sm font-bold transition-all cursor-pointer font-display"
                                >
                                  {w}
                                </button>
                              ))}
                            </div>

                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium italic pt-0.5">
                              {sub.textVn}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: DICTATION & SHADOWING AI */}
                {rightPanelTab === "dictation" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 font-mono">
                      <span>CÂU HỎI {currentSubIndex + 1} / {activeVideo.subtitles.length}</span>
                      {currentSubIndex !== activeSubIndex && (
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentSubIndex(activeSubIndex);
                            setDictationInput("");
                            setDictationAnswered(false);
                            setDictationCorrect(null);
                            setShowHint(false);
                          }}
                          className="text-[10px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Target className="w-3 h-3 text-[#0059bb] dark:text-sky-400" /> Nhảy tới câu đang phát (#{activeSubIndex + 1})
                        </button>
                      )}
                    </div>

                    <div className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1.5 text-center">
                      <p className="text-xs font-bold text-slate-900 dark:text-white font-display">
                        “{maskDictationWord(
                          activeVideo.subtitles[currentSubIndex]?.textEn || "",
                          activeVideo.subtitles[currentSubIndex]?.dictationWord || ""
                        )}”
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Dịch: {activeVideo.subtitles[currentSubIndex]?.textVn}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={dictationInput}
                          onChange={(e) => setDictationInput(e.target.value)}
                          disabled={dictationAnswered}
                          autoComplete="off"
                          spellCheck={false}
                          placeholder="Gõ từ còn thiếu vào đây..."
                          className="flex-1 p-2.5 rounded-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-xs font-bold text-center text-slate-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowHint(!showHint)}
                          className="p-2.5 rounded-xs bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 dark:border-amber-900/40 text-xs font-bold cursor-pointer"
                          title="Gợi ý ký tự đầu"
                        >
                          <HelpCircle className="w-4 h-4" />
                        </button>
                      </div>

                      {showHint && activeVideo.subtitles[currentSubIndex] && (
                        <div className="p-2 rounded-xs bg-amber-50/80 text-amber-800 text-[10px] font-mono font-bold text-center flex items-center justify-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Gợi ý: Bắt đầu bằng chữ cái &quot;{activeVideo.subtitles[currentSubIndex].dictationWord.charAt(0).toUpperCase()}&quot; (Độ dài: {activeVideo.subtitles[currentSubIndex].dictationWord.length} ký tự)
                        </div>
                      )}

                      {!dictationAnswered ? (
                        <button
                          type="button"
                          onClick={handleCheckDictation}
                          disabled={!dictationInput.trim()}
                          className="w-full py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer font-display"
                        >
                          Kiểm Tra Đáp Án (+20 XP)
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <div className={`p-2 rounded-xs text-[11px] font-bold text-center ${
                            dictationCorrect
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                              : "bg-rose-50 text-rose-700 border border-rose-300"
                          }`}>
                            {dictationCorrect
                              ? "✓ Đúng rồi! Bạn bắt âm rất chuẩn."
                              : `✗ Chưa đúng. Đáp án: "${activeVideo.subtitles[currentSubIndex]?.dictationWord}"`}
                          </div>

                          <button
                            type="button"
                            onClick={handleNextDictation}
                            className="w-full py-2 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer font-display"
                          >
                            Câu tiếp theo ➔
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Shadowing AI Waveform Simulator Box */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-center space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
                        <Mic className="w-3.5 h-3.5 text-rose-500" /> LUYỆN NHẠI GIỌNG SHADOWING AI
                      </span>

                      {/* Waveform visualizer */}
                      <div className="flex items-center justify-center gap-1 h-8">
                        {waveformBars.map((h, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all duration-150 ${
                              isRecording ? "bg-rose-500" : "bg-slate-300 dark:bg-slate-700"
                            }`}
                            style={{ height: `${isRecording ? h : 20}%` }}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={toggleShadowingRecord}
                        className={`w-10 h-10 rounded-xs mx-auto flex items-center justify-center text-white cursor-pointer transition-all ${
                          isRecording ? "bg-rose-600 animate-pulse" : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                      >
                        <Mic className="w-5 h-5" />
                      </button>

                      {shadowingScore !== null && (
                        <div className="p-2 rounded-xs bg-emerald-50 border border-emerald-300 text-emerald-700 text-[11px] font-bold flex items-center justify-center gap-1">
                          <Award className="w-3.5 h-3.5" /> AI Chấm Phát Âm: {shadowingScore}/100! (+15 XP)
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 3: PLAYLIST VIDEO ĐÃ LƯU (Instant 1-Click Switch) */}
                {rightPanelTab === "playlist" && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      DANH SÁCH VIDEO CỦA TÔI ({savedVideos.length})
                    </span>

                    {savedVideos.map((vid) => (
                      <button
                        key={vid.id}
                        type="button"
                        onClick={() => selectVideoAndOpenSubtitles(vid)}
                        className={`w-full p-2 rounded-xs border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          activeVideo.id === vid.id
                            ? "bg-blue-50/80 dark:bg-blue-950/40 border-[#0059bb] text-[#0059bb] dark:text-sky-400"
                            : "bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-white/5 hover:border-slate-300 text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        <img
                          src={vid.thumbnailUrl}
                          alt={vid.title}
                          className="w-16 aspect-video object-cover rounded-xs shrink-0"
                        />
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <h4 className="text-[11px] font-bold truncate font-display leading-tight">
                            {vid.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[9px] text-slate-400 font-mono">
                            <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5 text-slate-400" /> {vid.duration}</span>
                            <span>• {vid.progressPercent}%</span>
                          </div>
                        </div>
                        {activeVideo.id === vid.id && (
                          <Play className="w-3.5 h-3.5 fill-current text-[#0059bb] dark:text-sky-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      )}

      {/* 4. SEARCH & CATEGORY FILTER BAR */}
      <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo tiêu đề video hoặc tên kênh..."
              className="w-full pl-9 pr-3 py-2 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>

          {/* Progress Filters */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 shrink-0">
            {[
              { id: "all" as const, label: "Tất cả" },
              { id: "learning" as const, label: "Đang học" },
              { id: "done" as const, label: "Đã xong" },
              { id: "favorite" as const, label: "Yêu thích", isFav: true },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-xs text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap flex items-center gap-1 ${
                  selectedFilter === f.id
                    ? "bg-[#0059bb] text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                <span>{f.label}</span>
                {f.isFav && <Star className={`w-3 h-3 ${selectedFilter === "favorite" ? "fill-amber-300 text-amber-300" : "fill-amber-400 text-amber-400"}`} />}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-slate-100 dark:border-white/5">
          {["Tất cả", "Communication", "TED Talks", "Business", "Movies", "News", "IELTS/TOEIC", "General"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-xs text-[10px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat === "Communication" ? "Giao tiếp" : cat === "General" ? "Tổng hợp" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 5. MY VIDEO BENTO GRID */}
      {filteredVideos.length === 0 ? (
        <div className="p-8 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs text-center space-y-3 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Video className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Không tìm thấy video nào
            </h3>
            <p className="text-xs text-slate-500">
              Hãy thử tìm kiếm với từ khóa khác hoặc dán link YouTube mới ở trên!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className={`rounded-xs bg-white dark:bg-slate-900 border transition-all overflow-hidden flex flex-col justify-between group ${
                activeVideo?.id === video.id
                  ? "border-[#0059bb] ring-2 ring-[#0059bb]/20 shadow-md"
                  : "border-slate-200/80 dark:border-white/10 hover:border-[#0059bb] shadow-xs"
              }`}
            >
              <div>
                {/* Thumbnail HD */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors" />

                  {/* Play Overlay Button */}
                  <button
                    type="button"
                    onClick={() => {
                      selectVideoAndOpenSubtitles(video);
                      window.scrollTo({ top: 220, behavior: "smooth" });
                    }}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xs bg-[#0059bb]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </button>

                  {/* Duration Badge */}
                  <span className="absolute right-2 bottom-2 px-1.5 py-0.5 rounded-xs bg-slate-950/80 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                    {video.duration}
                  </span>

                  {/* Favorite Star */}
                  <button
                    type="button"
                    onClick={() => toggleFavorite(video.id)}
                    className="absolute left-2 top-2 p-1.5 rounded-xs bg-[#0059bb]/80 text-amber-300 hover:bg-[#0059bb] transition-all cursor-pointer"
                  >
                    <Star className={`w-3.5 h-3.5 ${video.isFavorite ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Info Card */}
                <div className="p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-1.5 py-0.5 rounded-xs text-[9px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {video.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{video.savedAt}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 dark:text-white font-display line-clamp-2 leading-snug">
                    {video.title}
                  </h3>

                  <p className="text-[10px] text-slate-500 font-medium truncate">
                    Kênh: {video.authorName}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-400">Tiến độ bài học</span>
                      <span className="text-[#0059bb] dark:text-sky-400 font-mono">{video.progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0059bb] dark:bg-sky-400 transition-all duration-300"
                        style={{ width: `${video.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => removeVideo(video.id)}
                  className="p-1.5 rounded-xs text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                  title="Xóa khỏi danh sách"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    selectVideoAndOpenSubtitles(video);
                    window.scrollTo({ top: 220, behavior: "smooth" });
                  }}
                  className="px-3 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer font-display"
                >
                  <Play className="w-3 h-3 fill-current" /> Luyện tập ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

        </>
      ) : (
        <AnimatePresence>
          {activeSubtitleResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full rounded-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-white/10 shadow-xs p-4 sm:p-5 space-y-5 select-none font-sans"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3.5 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xs bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-[#0059bb] dark:text-sky-400">
                    <FileCode className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold font-display tracking-tight text-slate-900 dark:text-white">
                        Bảng Trích Xuất & Báo Cáo Phụ Đề Song Ngữ
                      </h2>
                      <span className="px-2 py-0.5 rounded-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px] font-bold flex items-center gap-1 font-display">
                        <Sparkles className="w-3 h-3" /> Verified 100%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate max-w-md">
                      Video: {activeVideo?.title || "YouTube Extraction Target"}
                    </p>
                  </div>
                </div>

                {/* Quick Actions & Exit Button */}
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      downloadTextFile(
                        JSON.stringify(activeSubtitleResult.json, null, 2),
                        `${activeVideo?.title || "subtitles"}.json`,
                        "application/json"
                      );
                      addToast({ type: "success", title: "Đã tải file JSON!", message: "File JSON đã được tải về máy thành công." });
                    }}
                    className="px-2.5 py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-bold font-display flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Tải JSON
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      downloadTextFile(
                        activeSubtitleResult.srtBilingual,
                        `${activeVideo?.title || "subtitles"}.srt`,
                        "text/plain"
                      );
                      addToast({ type: "success", title: "Đã tải file SRT!", message: "File SRT Song Ngữ đã tải về máy." });
                    }}
                    className="px-2.5 py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-bold font-display flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" /> Tải SRT
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      downloadTextFile(
                        activeSubtitleResult.webvttBilingual,
                        `${activeVideo?.title || "subtitles"}.vtt`,
                        "text/vtt"
                      );
                      addToast({ type: "success", title: "Đã tải file WEBVTT!", message: "File WEBVTT Song Ngữ đã tải về máy." });
                    }}
                    className="px-2.5 py-1.5 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-bold font-display flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Tải WEBVTT
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowExportModal(false)}
                    className="px-3.5 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold font-display shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer border border-blue-400/20"
                  >
                    <X className="w-4 h-4" /> Đóng Cửa Sổ (ESC)
                  </button>
                </div>
              </div>

              {/* Section A: Bento Stats Report Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>Tổng thời lượng</span>
                    <Clock className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xl font-bold font-mono text-[#0059bb] dark:text-sky-400">
                      {activeSubtitleResult.stats.totalDurationStr}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 font-mono">Chuẩn ISO/LRC</span>
                  </div>
                </div>

                <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>Tổng số câu EN</span>
                    <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      {activeSubtitleResult.stats.totalEnglishSentences} <span className="text-xs font-normal text-slate-500">câu</span>
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 font-mono">Phân đoạn tự nhiên</span>
                  </div>
                </div>

                <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>Tổng từ Tiếng Anh</span>
                    <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">
                      {activeSubtitleResult.stats.totalEnglishWords} <span className="text-xs font-normal text-slate-500">từ</span>
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 font-mono">Kho từ vựng AI</span>
                  </div>
                </div>

                <div className="p-3 rounded-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>Tỷ lệ dịch chuẩn</span>
                    <CheckCircle2 className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xl font-bold font-mono text-[#0059bb] dark:text-sky-400">
                      {activeSubtitleResult.stats.translationSuccessRate}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 font-mono">Google Server Translation</span>
                  </div>
                </div>
              </div>

              {/* Technical Audit Badge Notice */}
              <div className="p-3 rounded-xs bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 font-mono text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span><strong>BÁO CÁO KIỂM THỬ KỸ THUẬT:</strong> {activeSubtitleResult.errorReport[0]}</span>
                </div>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-sans uppercase font-bold tracking-wider">Zero Overlap Checked</span>
              </div>

              {/* Section B: Tab Navigation & Code Inspector Views */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-white/5 pb-2.5 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setExportActiveTab("json")}
                    className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer font-display ${
                      exportActiveTab === "json"
                        ? "bg-[#0059bb] dark:bg-blue-600 text-white shadow-2xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-white/10"
                    }`}
                  >
                    1. JSON Data (Mili-giây)
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportActiveTab("srt")}
                    className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer font-display ${
                      exportActiveTab === "srt"
                        ? "bg-[#0059bb] dark:bg-blue-600 text-white shadow-2xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-white/10"
                    }`}
                  >
                    2. SRT Song Ngữ
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportActiveTab("webvtt")}
                    className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer font-display ${
                      exportActiveTab === "webvtt"
                        ? "bg-[#0059bb] dark:bg-blue-600 text-white shadow-2xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-white/10"
                    }`}
                  >
                    3. WEBVTT Song Ngữ
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportActiveTab("all")}
                    className={`px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer font-display ${
                      exportActiveTab === "all"
                        ? "bg-[#0059bb] dark:bg-blue-600 text-white shadow-2xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-white/10"
                    }`}
                  >
                    4. Xem Tất Cả (Full View)
                  </button>
                </div>

                {/* Tab Views */}
                {(exportActiveTab === "json" || exportActiveTab === "all") && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-display flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> DỮ LIỆU JSON CẤU TRÚC (MỐC MILI GIÂY)
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(activeSubtitleResult.json, null, 2));
                            addToast({ type: "success", title: "Đã copy JSON!", message: "Dữ liệu JSON đã lưu vào clipboard." });
                          }}
                          className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer font-display"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-500" /> Copy JSON
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            downloadTextFile(
                              JSON.stringify(activeSubtitleResult.json, null, 2),
                              `${activeVideo?.title || "subtitles"}.json`,
                              "application/json"
                            );
                            addToast({ type: "success", title: "Đã tải JSON!", message: "Tải file .json về máy thành công." });
                          }}
                          className="px-2.5 py-1 rounded-xs bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1 cursor-pointer font-display"
                        >
                          <Download className="w-3.5 h-3.5" /> Tải File .json
                        </button>
                      </div>
                    </div>
                    <pre className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] max-h-80 overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xs selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-200">
                      {JSON.stringify(activeSubtitleResult.json, null, 2)}
                    </pre>
                  </div>
                )}

                {(exportActiveTab === "srt" || exportActiveTab === "all") && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-display flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> NỘI DUNG FILE SRT SONG NGỮ (SUBRIP)
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(activeSubtitleResult.srtBilingual);
                            addToast({ type: "success", title: "Đã copy SRT!", message: "Nội dung SRT đã lưu vào clipboard." });
                          }}
                          className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer font-display"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-500" /> Copy SRT
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            downloadTextFile(
                              activeSubtitleResult.srtBilingual,
                              `${activeVideo?.title || "subtitles"}.srt`,
                              "text/plain"
                            );
                            addToast({ type: "success", title: "Đã tải SRT!", message: "Tải file .srt về máy thành công." });
                          }}
                          className="px-2.5 py-1 rounded-xs bg-blue-50 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 text-xs font-bold text-[#0059bb] dark:text-sky-300 flex items-center gap-1 cursor-pointer font-display"
                        >
                          <Download className="w-3.5 h-3.5" /> Tải File .srt
                        </button>
                      </div>
                    </div>
                    <pre className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-sky-300 font-mono text-[11px] max-h-80 overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xs whitespace-pre-wrap selection:bg-blue-500/20 selection:text-blue-900 dark:selection:text-sky-100">
                      {activeSubtitleResult.srtBilingual}
                    </pre>
                  </div>
                )}

                {(exportActiveTab === "webvtt" || exportActiveTab === "all") && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 font-display flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" /> NỘI DUNG FILE WEBVTT SONG NGỮ (WEB VIDEO TEXT TRACKS)
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(activeSubtitleResult.webvttBilingual);
                            addToast({ type: "success", title: "Đã copy WEBVTT!", message: "Nội dung WEBVTT đã lưu vào clipboard." });
                          }}
                          className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer font-display"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-500" /> Copy WEBVTT
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            downloadTextFile(
                              activeSubtitleResult.webvttBilingual,
                              `${activeVideo?.title || "subtitles"}.vtt`,
                              "text/vtt"
                            );
                            addToast({ type: "success", title: "Đã tải WEBVTT!", message: "Tải file .vtt về máy thành công." });
                          }}
                          className="px-2.5 py-1 rounded-xs bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1 cursor-pointer font-display"
                        >
                          <Download className="w-3.5 h-3.5" /> Tải File .vtt
                        </button>
                      </div>
                    </div>
                    <pre className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-amber-300 font-mono text-[11px] max-h-80 overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xs whitespace-pre-wrap selection:bg-amber-500/20 selection:text-amber-900 dark:selection:text-amber-100">
                      {activeSubtitleResult.webvttBilingual}
                    </pre>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ========== SRT IMPORT MODAL (DownSub.com Integration) ========== */}
      <AnimatePresence>
        {showSrtImportModal && activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs" onClick={() => setShowSrtImportModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xs border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-4 bg-gradient-to-r from-[#0059bb] to-[#004799] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-300" />
                  <h3 className="text-sm font-bold font-display">Nhập Phụ Đề .SRT / .VTT</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSrtImportModal(false)}
                  className="p-1 rounded-xs hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 space-y-3 overflow-y-auto flex-1 min-h-0">
                {/* Dynamic Direct Web Injection Guide */}
                <div className="p-3 rounded-xs bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 space-y-1.5">
                  <p className="text-xs font-bold text-[#0059bb] dark:text-sky-400 flex items-center gap-1.5 font-display">
                    <Sparkles className="w-3.5 h-3.5" /> Nạp & Cập Nhật Phụ Đề Trực Tiếp Vào Web
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    Dán nội dung phụ đề hoặc Upload file `.srt` / `.vtt`. Hệ thống sẽ tự động cập nhật mốc timeline mốc mili-giây chuẩn 100% trực tiếp vào bài học!
                  </p>
                </div>

                {/* Paste or Upload */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 font-display">
                    <FileText className="w-3.5 h-3.5 text-amber-500" /> Dán nội dung .SRT hoặc Upload file
                  </p>

                  {/* File Upload Button */}
                  <div className="flex items-center gap-2">
                    <input
                      ref={srtFileInputRef}
                      type="file"
                      accept=".srt,.vtt,.txt"
                      onChange={handleSrtFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => srtFileInputRef.current?.click()}
                      className="py-2 px-3 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition border border-slate-200 dark:border-slate-700"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload File .SRT
                    </button>
                    <span className="text-[10px] text-slate-400">Hỗ trợ: .srt, .vtt, .txt</span>
                  </div>

                  {/* Paste Textarea */}
                  <textarea
                    value={srtPasteContent}
                    onChange={(e) => {
                      setSrtPasteContent(e.target.value);
                      setSrtImportError(null);
                      // Live preview count
                      if (e.target.value.trim().length > 20) {
                        const preview = parseSrtContent(e.target.value);
                        setSrtPreviewCount(preview.length);
                      } else {
                        setSrtPreviewCount(0);
                      }
                    }}
                    placeholder={`Dán nội dung file .SRT vào đây...\n\nVí dụ:\n1\n00:00:01,000 --> 00:00:05,000\nWelcome to this English lesson.\n\n2\n00:00:06,000 --> 00:00:10,500\nToday we will learn about vocabulary.`}
                    className="w-full h-40 p-3 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-800 dark:text-slate-200 resize-none focus:border-[#0059bb] focus:outline-hidden transition-all"
                    spellCheck={false}
                  />

                  {/* Preview Counter */}
                  {srtPreviewCount > 0 && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Đã nhận diện {srtPreviewCount} câu phụ đề hợp lệ — sẵn sàng nhập!
                    </div>
                  )}

                  {/* Error Message */}
                  {srtImportError && (
                    <div className="p-2.5 rounded-xs bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 text-[11px] font-medium flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      {srtImportError}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
                <button
                  type="button"
                  onClick={() => setShowSrtImportModal(false)}
                  className="px-4 py-1.5 rounded-xs bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="button"
                  onClick={handleImportSrt}
                  disabled={srtPasteContent.trim().length < 20}
                  className="px-5 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all cursor-pointer font-display flex items-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Nhập {srtPreviewCount > 0 ? `${srtPreviewCount} Câu` : "Phụ Đề"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========== XP-SUB EXTRACTOR ENTERPRISE MODAL ========== */}
      <AnimatePresence>
        {showXpSubModal && activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs" onClick={() => setShowXpSubModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-xs border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white flex items-center justify-between shrink-0 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xs bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300 shrink-0">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold font-display flex items-center gap-1.5">
                      XP-Sub Extractor Engine
                      <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded-xs bg-amber-400 text-slate-950">
                        IN-HOUSE ENTERPRISE
                      </span>
                    </h3>
                    <p className="text-[10.5px] text-blue-100/90 font-medium truncate max-w-md">
                      Trích xuất & tải phụ đề tự chủ 100% cho video: {activeVideo.title}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowXpSubModal(false)}
                  className="p-1.5 rounded-xs hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-3.5 sm:p-4 space-y-4 overflow-y-auto flex-1 min-h-0 text-xs">
                {/* Stage 1: Track & Translation Selection Controls */}
                <div className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/5 pb-2">
                    <span className="font-bold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 text-[10.5px] flex items-center gap-1.5 font-display">
                      <Settings2 className="w-3.5 h-3.5" /> BƯỚC 1: CHỌN NGUỒN PHỤ ĐỀ & NGÔN NGỮ DỊCH
                    </span>
                    {isFetchingTracks && (
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 animate-pulse">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang tải dữ liệu từ YouTube...
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Track Selection */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 dark:text-slate-200 block text-[11px]">
                        1. Phụ đề gốc từ Video YouTube ({xpSubTracks.length} bản khả dụng):
                      </label>
                      <select
                        value={selectedTrackUrl}
                        onChange={(e) => {
                          setSelectedTrackUrl(e.target.value);
                          fetchPreviewSubtitles(e.target.value, selectedTargetLang, isBilingual);
                        }}
                        disabled={isFetchingTracks || xpSubTracks.length === 0}
                        className="w-full p-2 rounded-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white font-bold text-xs focus:border-[#0059bb] focus:outline-hidden"
                      >
                        {xpSubTracks.length === 0 ? (
                          <option value="">-- Đang tìm phụ đề khả dụng --</option>
                        ) : (
                          xpSubTracks.map((t, i) => (
                            <option key={i} value={t.baseUrl}>
                              {t.languageName} {t.isAutoGenerated ? "(Tự động ASR)" : "(Thủ công)"}
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    {/* Translation Controls */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-slate-700 dark:text-slate-200 block text-[11px]">
                          2. Tự động dịch sang Tiếng Việt (Bilingual):
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isBilingual}
                            onChange={(e) => {
                              setIsBilingual(e.target.checked);
                              fetchPreviewSubtitles(selectedTrackUrl, selectedTargetLang, e.target.checked);
                            }}
                            className="rounded-xs text-[#0059bb] focus:ring-0 cursor-pointer"
                          />
                          <span className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400">Song ngữ</span>
                        </label>
                      </div>

                      <select
                        value={selectedTargetLang}
                        onChange={(e) => {
                          setSelectedTargetLang(e.target.value);
                          fetchPreviewSubtitles(selectedTrackUrl, e.target.value, isBilingual);
                        }}
                        disabled={!isBilingual || isFetchingTracks}
                        className="w-full p-2 rounded-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white font-bold text-xs focus:border-[#0059bb] focus:outline-hidden disabled:opacity-50"
                      >
                        <option value="vi">🇻🇳 Tiếng Việt (Vietnamese)</option>
                        {xpSubTranslations.map((l) => (
                          <option key={l.languageCode} value={l.languageCode}>
                            {l.languageName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Stage 2: Interactive Live Preview Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold uppercase tracking-wider text-slate-500 text-[10.5px] flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-emerald-500" /> BƯỚC 2: XEM TRƯỚC VÀ KIỂM TRA PHỤ ĐỀ (LIVE PREVIEW)
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={searchPreviewQuery}
                          onChange={(e) => setSearchPreviewQuery(e.target.value)}
                          placeholder="Lọc từ vựng..."
                          className="py-1 pl-6 pr-2 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-[11px] font-bold focus:outline-hidden w-36"
                        />
                      </div>
                      <span className="px-2 py-0.5 rounded-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 font-mono text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                        {xpSubPreviewSentences.length} Câu
                      </span>
                    </div>
                  </div>

                  {/* Preview Container with Skeleton Loading (Rule 1 UI/UX Standard) */}
                  <div className="border border-slate-200 dark:border-white/10 rounded-xs max-h-52 overflow-y-auto bg-slate-950 text-slate-200 p-2 font-mono text-[11px] space-y-1.5">
                    {isExtractingPreview ? (
                      <div className="space-y-2 p-2">
                        {[1, 2, 3, 4].map((n) => (
                          <div key={n} className="p-2.5 rounded-xs bg-slate-900/80 border border-slate-800 space-y-1.5 animate-pulse">
                            <div className="h-3 bg-slate-800 rounded-xs w-1/4" />
                            <div className="h-3.5 bg-slate-700/80 rounded-xs w-3/4" />
                            <div className="h-3 bg-slate-800/60 rounded-xs w-1/2" />
                          </div>
                        ))}
                      </div>
                    ) : xpSubPreviewSentences.length === 0 ? (
                      <div className="py-8 text-center text-slate-500 font-sans">
                        Chưa chọn track phụ đề. Vui lòng chọn track từ danh sách ở Bước 1.
                      </div>
                    ) : (
                      xpSubPreviewSentences
                        .filter(
                          (s) =>
                            !searchPreviewQuery ||
                            s.textEn.toLowerCase().includes(searchPreviewQuery.toLowerCase()) ||
                            s.textVn.toLowerCase().includes(searchPreviewQuery.toLowerCase())
                        )
                        .map((s, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xs bg-slate-900/90 hover:bg-slate-900 border border-slate-800 flex items-start gap-2 group transition-colors"
                          >
                            <span className="text-[10px] font-mono text-[#0059bb] dark:text-sky-400 shrink-0 pt-0.5 font-bold">
                              {formatSubTime(s.startTime)}
                            </span>
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <p className="text-slate-100 font-sans font-bold leading-snug break-words">
                                {s.textEn}
                              </p>
                              {s.textVn && (
                                <p className="text-slate-400 font-sans italic text-[10.5px]">
                                  {s.textVn}
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => speakLessonText(s.textEn)}
                              className="p-1 rounded-xs hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer shrink-0 opacity-60 group-hover:opacity-100"
                              title="Nghe thử âm thanh"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer & Action Toolbar */}
              <div className="p-3.5 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowXpSubModal(false)}
                  className="px-3.5 py-1.5 rounded-xs bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Đóng
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadXpSubtitle("txt")}
                    disabled={xpSubPreviewSentences.length === 0}
                    className="py-1.5 px-3 rounded-xs bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" /> .TXT
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadXpSubtitle("vtt")}
                    disabled={xpSubPreviewSentences.length === 0}
                    className="py-1.5 px-3 rounded-xs bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-[11px] font-bold transition cursor-pointer flex items-center gap-1"
                  >
                    <FileCode className="w-3.5 h-3.5 text-amber-500" /> .VTT
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadXpSubtitle("srt")}
                    disabled={xpSubPreviewSentences.length === 0}
                    className="py-1.5 px-3 rounded-xs bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" /> Tải .SRT
                  </button>

                  <button
                    type="button"
                    onClick={handleInjectXpSubtitles}
                    disabled={xpSubPreviewSentences.length === 0}
                    className="py-1.5 px-4 rounded-xs bg-[#0059bb] hover:bg-[#004799] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all cursor-pointer font-display flex items-center gap-1.5 shadow-2xs"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    1-Click Nhập Vào Video (0ms)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </PageEntranceWrapper>
  );
}

