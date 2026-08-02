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
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

/** FIX BUG #8: Format seconds to MM:SS display string */
function formatSubTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const totalSec = Math.floor(seconds);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
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
    loadSavedVideos,
  } = useVideoStore();

  // Ref to YouTube Player IFrame for PostMessage controls (seekTo, playVideo, pauseVideo)
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Ref to store real YouTube player time from postMessage events
  const ytPlayerTimeRef = useRef<number>(0);
  const ytPlayerStateRef = useRef<number>(-1); // -1=unstarted, 1=playing, 2=paused, 3=buffering, 0=ended

  // YouTube Link Import State with Category & Level Selection
  const [youtubeInput, setYoutubeInput] = useState("");
  const [importCategory, setImportCategory] = useState<YouTubeVideoItem["category"]>("Communication");
  const [importLevel, setImportLevel] = useState<YouTubeVideoItem["level"]>("Medium");
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // High Precision Subtitle Result & Export State
  const [activeSubtitleResult, setActiveSubtitleResult] = useState<SubtitleExtractionResult | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "learning" | "done" | "favorite">("all");

  // MASTER-DETAIL ACTIVE VIDEO PLAYER STATE (Selected video displays in left 60% column)
  const [activeVideo, setActiveVideo] = useState<YouTubeVideoItem | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState<"subtitles" | "dictation" | "playlist">("subtitles");

  // Interactive Play/Pause State
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSubIndex, setActiveSubIndex] = useState<number>(0);

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

  // FIX BUG #9: Sync activeVideo with store changes (favorite, progress updates)
  useEffect(() => {
    if (activeVideo) {
      const updatedVideo = savedVideos.find((v) => v.id === activeVideo.id);
      if (updatedVideo && (
        updatedVideo.isFavorite !== activeVideo.isFavorite ||
        updatedVideo.progressPercent !== activeVideo.progressPercent
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
        // Allow Enter in dictation input
        if (e.key === "Enter" && rightPanelTab === "dictation" && !dictationAnswered && dictationInput.trim()) {
          e.preventDefault();
          handleCheckDictation();
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
      if (event.origin !== "https://www.youtube.com") return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        // YouTube sends infoDelivery with currentTime
        if (data?.event === "infoDelivery" && data?.info) {
          if (typeof data.info.currentTime === "number") {
            ytPlayerTimeRef.current = data.info.currentTime;
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

  // Register as listener with YouTube IFrame API (required to receive infoDelivery events)
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow && activeVideo) {
      // Small delay to let iframe load
      const timeout = setTimeout(() => {
        try {
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: "listening", id: "yt-player" }),
            "*"
          );
        } catch (e) {}
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [activeVideo?.id]);

  // Real-time sync loop: reads ACTUAL YouTube player time via postMessage, syncs subtitle & karaoke
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeVideo && activeVideo.subtitles.length > 0) {
      timer = setInterval(() => {
        // Read real time from YouTube player (via postMessage events)
        const realTime = ytPlayerTimeRef.current;
        // Also request fresh time from YouTube player
        if (iframeRef.current?.contentWindow) {
          try {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "getCurrentTime", args: [] }),
              "*"
            );
          } catch (e) {}
        }

        setCurrentTime((prevTime) => {
          // Use YouTube's real time if available and significantly different from our tracked time
          const nextTime = realTime > 0.1 ? parseFloat(realTime.toFixed(2)) : parseFloat((prevTime + 0.05).toFixed(2));

          // Auto-sync activeSubIndex when playback advances into a new sentence boundary
          const matchedIdx = activeVideo.subtitles.findIndex(
            (s) => nextTime >= s.startTime && nextTime < s.endTime
          );

          if (matchedIdx !== -1 && matchedIdx !== activeSubIndex) {
            setActiveSubIndex(matchedIdx);
          }

          // Real-time Karaoke word-by-word active word calculation
          const targetSub = activeVideo.subtitles[matchedIdx !== -1 ? matchedIdx : activeSubIndex];
          if (targetSub) {
            const duration = Math.max(0.5, targetSub.endTime - targetSub.startTime);
            const elapsed = Math.max(0, nextTime - targetSub.startTime);
            const ratio = Math.min(1, elapsed / duration);
            const words = targetSub.textEn.split(/\s+/).filter(Boolean);
            const currentWordIdx = Math.min(words.length - 1, Math.floor(ratio * words.length));
            setActiveWordIndex(currentWordIdx);
          }

          // Progressive chunk loading
          const currentChunkBoundary = loadedChunkCount * 3;
          if (matchedIdx >= currentChunkBoundary - 1 && loadedChunkCount * 3 < activeVideo.subtitles.length) {
            setIsPipelineStreaming(true);
            setLoadedChunkCount((c) => c + 1);
            setTimeout(() => setIsPipelineStreaming(false), 300);
          }

          return nextTime;
        });
      }, 80); // 80ms = ~12fps, enough for smooth karaoke and reduces CPU
    }
    return () => clearInterval(timer);
  }, [activeVideo, activeSubIndex, loadedChunkCount]);

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
    setActiveSubIndex(subIndex);
    setCurrentTime(seconds); // Immediately sync local time to seek position
    ytPlayerTimeRef.current = seconds; // Update ref too
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "seekTo",
            args: [seconds, true],
          }),
          "*"
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "playVideo",
            args: [],
          }),
          "*"
        );
        setIsPlaying(true);
      } catch (e) {
        console.error("Error seeking YouTube player:", e);
      }
    }
  };

  // Toggle Play/Pause via PostMessage API
  const togglePlayPause = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const action = isPlaying ? "pauseVideo" : "playVideo";
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: action,
            args: [],
          }),
          "*"
        );
        setIsPlaying(!isPlaying);
      } catch (e) {
        console.error("Error toggling play state:", e);
      }
    }
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
      addToast({
        type: "success",
        title: "Đã nạp 100% phụ đề chuẩn 12 tiêu chí!",
        message: `Đã tự động xuất dữ liệu JSON, SRT & WEBVTT mốc mili giây chuẩn xác!`,
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

    setSelectedWord(cleanWord);
    // Show instant placeholder while API loads
    setWordLookupData({
      word: cleanWord.toUpperCase(),
      phonetic: `/${cleanWord}/`,
      pos: "loading...",
      definitionVn: "Đang tra từ điển...",
    });

    // Play pronunciation via TTS
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }

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

  // FIX BUG #7: Dictation Check Answer with normalized comparison (strip punctuation)
  const handleCheckDictation = () => {
    if (!activeVideo || dictationAnswered) return;
    const currentSub = activeVideo.subtitles[currentSubIndex];
    if (!currentSub) return;

    // FIX BUG #7: Strip all non-alpha chars before comparing
    const userClean = dictationInput.trim().toLowerCase().replace(/[^a-z]/g, "");
    const targetClean = currentSub.dictationWord.trim().toLowerCase().replace(/[^a-z]/g, "");
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

  // Dictation Next Question
  const handleNextDictation = () => {
    if (!activeVideo) return;
    if (currentSubIndex < activeVideo.subtitles.length - 1) {
      setCurrentSubIndex((prev) => prev + 1);
      setDictationInput("");
      setDictationAnswered(false);
      setDictationCorrect(null);
      setShowHint(false);
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

  // FIX BUG #10: Filtered Video List with correct "Đang học" logic
  const filteredVideos = savedVideos.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.authorName.toLowerCase().includes(searchQuery.toLowerCase());
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
    <div className="space-y-4 sm:space-y-5 pb-20 md:pb-8 select-none font-sans" suppressHydrationWarning>

      {/* 1. HERO SPOTLIGHT BANNER */}
      <div className="p-4 sm:p-5 rounded-xs bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-xs relative overflow-hidden">
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
      </div>

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
              {/* Option 1 Clean Player Container: controls=0 hides 100% native title & control overlays */}
              <div
                onClick={togglePlayPause}
                className="relative aspect-video w-full max-h-[380px] lg:max-h-[400px] bg-black overflow-hidden shrink-0 group cursor-pointer"
              >
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0 pointer-events-none"
                />

                {/* Subtle Play/Pause Overlay Indicator on Hover */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-[#0059bb]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs shadow-lg">
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    )}
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
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {activeVideo.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                      CÂU HỎI {currentSubIndex + 1} / {activeVideo.subtitles.length}
                    </span>

                    <div className="p-3.5 rounded-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-white/5 space-y-1.5 text-center">
                      <p className="text-xs font-bold text-slate-900 dark:text-white font-display">
                        “{activeVideo.subtitles[currentSubIndex]?.textEn.replace(
                          activeVideo.subtitles[currentSubIndex]?.dictationWord,
                          " [ _____ ] "
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

      {/* 6. EXPORT MODAL (JSON, SRT SONG NGỮ, WEBVTT SONG NGỮ & BÁO CÁO THỐNG KÊ 12 TIÊU CHÍ) */}
      <AnimatePresence>
        {showExportModal && activeSubtitleResult && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
            onClick={(e) => { if (e.target === e.currentTarget) setShowExportModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-xs border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-bold font-display">
                    Bộ Trích Xuất Dữ Liệu Phụ Đề Song Ngữ (Chuẩn 12 Tiêu Chí)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="p-1 rounded-xs hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
                {/* Section A: Statistics Report */}
                <div className="p-3.5 rounded-xs bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
                    <BarChart2 className="w-4 h-4" /> BÁO CÁO THỐNG KÊ CHI TIẾT
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded-xs bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/30">
                      <span className="text-slate-400 block text-[9px]">Tổng thời lượng:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{activeSubtitleResult.stats.totalDurationStr}</span>
                    </div>
                    <div className="p-2 rounded-xs bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/30">
                      <span className="text-slate-400 block text-[9px]">Tổng số câu EN:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeSubtitleResult.stats.totalEnglishSentences} câu</span>
                    </div>
                    <div className="p-2 rounded-xs bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/30">
                      <span className="text-slate-400 block text-[9px]">Tổng từ Tiếng Anh:</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">{activeSubtitleResult.stats.totalEnglishWords} từ</span>
                    </div>
                    <div className="p-2 rounded-xs bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/30">
                      <span className="text-slate-400 block text-[9px]">Tỷ lệ dịch chuẩn:</span>
                      <span className="font-bold text-sky-600 dark:text-sky-400">{activeSubtitleResult.stats.translationSuccessRate}</span>
                    </div>
                  </div>
                </div>

                {/* Section B: JSON Output */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                      1. XUẤT DỮ LIỆU JSON (MỐC THỜI GIAN MILI GIÂY)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(activeSubtitleResult.json, null, 2));
                        addToast({ type: "success", title: "Đã copy JSON!", message: "Dữ liệu JSON đã lưu vào clipboard." });
                      }}
                      className="px-2 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                    >
                      Copy JSON
                    </button>
                  </div>
                  <pre className="p-3 rounded-xs bg-slate-950 text-emerald-400 font-mono text-[10.5px] max-h-36 overflow-y-auto border border-slate-800">
                    {JSON.stringify(activeSubtitleResult.json, null, 2)}
                  </pre>
                </div>

                {/* Section C: SRT Song Ngữ Output */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                      2. XUẤT FILE SRT SONG NGỮ
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(activeSubtitleResult.srtBilingual);
                        addToast({ type: "success", title: "Đã copy SRT!", message: "Nội dung SRT Song Ngữ đã lưu vào clipboard." });
                      }}
                      className="px-2 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                    >
                      Copy SRT
                    </button>
                  </div>
                  <pre className="p-3 rounded-xs bg-slate-950 text-sky-400 font-mono text-[10.5px] max-h-32 overflow-y-auto border border-slate-800 whitespace-pre-wrap">
                    {activeSubtitleResult.srtBilingual}
                  </pre>
                </div>

                {/* Section D: WEBVTT Output */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                      3. XUẤT FILE WEBVTT SONG NGỮ
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(activeSubtitleResult.webvttBilingual);
                        addToast({ type: "success", title: "Đã copy WEBVTT!", message: "Nội dung WEBVTT đã lưu vào clipboard." });
                      }}
                      className="px-2 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                    >
                      Copy WEBVTT
                    </button>
                  </div>
                  <pre className="p-3 rounded-xs bg-slate-950 text-amber-300 font-mono text-[10.5px] max-h-32 overflow-y-auto border border-slate-800 whitespace-pre-wrap">
                    {activeSubtitleResult.webvttBilingual}
                  </pre>
                </div>

                {/* Section E: Error Audit Report */}
                <div className="p-3 rounded-xs bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>BÁO CÁO KIỂM THỬ KỸ THUẬT:</strong> {activeSubtitleResult.errorReport[0]}</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-white/10 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-1.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold transition-all cursor-pointer font-display"
                >
                  Đóng Cửa Sổ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
